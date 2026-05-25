// ============================================================
// Repo Atlas — multi-repo gource event stream visualized in D3
//
// Pipeline:
//   gource/build-log.sh  ->  gource/gource.json
//
// Visualization:
//   - Each repo is a positioned anchor on a hex/grid layout
//   - File nodes belong to a repo and force-attract to that anchor
//   - Events drive a virtual clock; camera flies to the active repo
//   - Overview toggle: zoom out and watch all repos at once
// ============================================================

const DATA_URL = 'gource/gource.json';

// Editorial palette: 12 restrained hues that sit alongside the rust accent.
const REPO_COLORS = [
    '#c2410c', '#1e3a5f', '#166534', '#713f12', '#6b21a8', '#be123c',
    '#0f766e', '#1f2937', '#831843', '#92400e', '#3730a3', '#365314'
];

// One real second of playback = SIM_SECONDS_PER_REAL_SECOND of repo time
// at speed = 1. Adjust via the speed dropdown.
const SIM_SECONDS_PER_REAL_SECOND = 86400; // 1 day per second

const FILE_RADIUS = 2.2;
const FILE_RADIUS_FLASH = 6;
const FLASH_DECAY = 0.06;
const REPO_RADIUS = 14;
const CAMERA_EASE = 0.08;
const CAMERA_ZOOM_FOCUS = 2.4;
const CAMERA_ZOOM_OVERVIEW = 1;
const REPO_ATTRACTION = 0.06;
const NODE_DECAY_AFTER_DELETE = 0.04;

// ---------- State ----------
const state = {
    canvas: null,
    ctx: null,
    width: 0,
    height: 0,
    dpr: window.devicePixelRatio || 1,

    data: null,
    repos: [],                  // [{name, count, color, x, y}]
    repoIndex: new Map(),       // name -> repo obj
    nodes: [],                  // file nodes
    nodeIndex: new Map(),       // path -> node
    activeRepos: new Set(),     // names currently shown

    simulation: null,

    // Playback
    playing: false,
    speedMul: 1,
    currentTime: 0,
    eventIdx: 0,
    lastFrame: 0,

    // Camera (in world coords)
    camera: { x: 0, y: 0, k: 1 },
    cameraTarget: { x: 0, y: 0, k: 1 },
    overviewMode: false,
    focusRepo: null,
};

// ---------- Bootstrap ----------
async function init() {
    state.canvas = document.getElementById('atlas-canvas');
    state.ctx = state.canvas.getContext('2d');
    resize();
    window.addEventListener('resize', resize);

    try {
        const res = await fetch(DATA_URL);
        if (!res.ok) throw new Error(`gource.json missing (${res.status})`);
        state.data = await res.json();
    } catch (err) {
        showStatus(`<strong>No atlas data yet.</strong><br>
            Generate it locally with <code>./gource/build-log.sh</code>,<br>
            or trigger the <code>Update Gource Atlas</code> workflow in GitHub Actions.<br>
            <small>${err.message}</small>`);
        return;
    }

    if (!state.data.events || state.data.events.length === 0) {
        showStatus('gource.json contains no events.');
        return;
    }

    hideStatus();
    buildRepos();
    buildLegend();
    buildSimulation();
    bindControls();

    state.currentTime = state.data.start;
    state.cameraTarget = { x: 0, y: 0, k: CAMERA_ZOOM_OVERVIEW };
    state.camera = { ...state.cameraTarget };
    updateHUD();

    // Render loop
    state.lastFrame = performance.now();
    requestAnimationFrame(frame);
}

// ---------- Layout ----------
function buildRepos() {
    const repoData = state.data.repos;
    const n = repoData.length;

    // Honeycomb-ish grid: pick cols so we get a near-square layout.
    const cols = Math.max(1, Math.ceil(Math.sqrt(n)));
    const rows = Math.ceil(n / cols);
    const spacing = 260;

    state.repos = repoData.map((r, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = (col - (cols - 1) / 2) * spacing
            + (row % 2 === 1 ? spacing / 2 : 0); // hex offset
        const y = (row - (rows - 1) / 2) * spacing * 0.86;
        return {
            name: r.name,
            count: r.count,
            color: REPO_COLORS[i % REPO_COLORS.length],
            x, y,
            fx: x, fy: y, // pin in place
            isRepo: true,
            r: REPO_RADIUS,
            flash: 0,
        };
    });
    state.repos.forEach(r => state.repoIndex.set(r.name, r));
    state.repos.forEach(r => state.activeRepos.add(r.name));
}

function buildLegend() {
    const el = document.getElementById('atlas-legend');
    el.innerHTML = state.repos.map(r => `
        <button class="legend-row" data-repo="${r.name}" style="--repo-color:${r.color}">
            <span class="legend-dot"></span>
            <span class="legend-name">${escapeHTML(r.name)}</span>
            <span class="legend-count">${r.count.toLocaleString()}</span>
        </button>
    `).join('');

    el.addEventListener('click', (e) => {
        const btn = e.target.closest('.legend-row');
        if (!btn) return;
        const name = btn.dataset.repo;
        // Single-click: focus camera on this repo
        const repo = state.repoIndex.get(name);
        if (!repo) return;
        if (e.shiftKey) {
            // Shift-click: toggle visibility
            if (state.activeRepos.has(name)) state.activeRepos.delete(name);
            else state.activeRepos.add(name);
            btn.classList.toggle('dimmed', !state.activeRepos.has(name));
        } else {
            state.overviewMode = false;
            document.getElementById('btn-overview').classList.remove('active');
            state.focusRepo = name;
            state.cameraTarget = { x: repo.x, y: repo.y, k: CAMERA_ZOOM_FOCUS };
        }
    });
}

// ---------- Force simulation ----------
function buildSimulation() {
    // Include repo anchors so they participate in collision but stay pinned.
    state.nodes = [...state.repos];

    state.simulation = d3.forceSimulation(state.nodes)
        .alphaDecay(0.01)
        .velocityDecay(0.35)
        .force('charge', d3.forceManyBody().strength(d => d.isRepo ? -200 : -4))
        .force('collide', d3.forceCollide(d => (d.isRepo ? d.r + 4 : FILE_RADIUS + 0.5)))
        .force('x', d3.forceX(d => {
            const r = state.repoIndex.get(d.repo);
            return r ? r.x : 0;
        }).strength(d => d.isRepo ? 0 : REPO_ATTRACTION))
        .force('y', d3.forceY(d => {
            const r = state.repoIndex.get(d.repo);
            return r ? r.y : 0;
        }).strength(d => d.isRepo ? 0 : REPO_ATTRACTION))
        .on('tick', () => {}); // we render in our own RAF loop
}

// ---------- Event application ----------
function applyEvent(e) {
    const repo = state.repoIndex.get(e.r);
    if (!repo) return;

    if (e.a === 'A') {
        addNode(e, repo);
    } else if (e.a === 'M') {
        const n = state.nodeIndex.get(e.p);
        if (n) {
            n.flash = 1;
        } else {
            addNode(e, repo);
        }
    } else if (e.a === 'D') {
        const n = state.nodeIndex.get(e.p);
        if (n) n.dying = 1;
    }

    repo.flash = Math.min(1, repo.flash + 0.4);
    repo.recentTouch = state.currentTime;

    // Camera fly-to (unless user has explicitly enabled overview)
    if (!state.overviewMode) {
        state.focusRepo = e.r;
        state.cameraTarget.x = repo.x;
        state.cameraTarget.y = repo.y;
        state.cameraTarget.k = CAMERA_ZOOM_FOCUS;
    }
}

function addNode(e, repo) {
    if (state.nodeIndex.has(e.p)) return;
    // Start at repo center with random offset so they spread out.
    const angle = Math.random() * Math.PI * 2;
    const dist = REPO_RADIUS + 2 + Math.random() * 4;
    const node = {
        id: e.p,
        repo: e.r,
        path: e.p,
        x: repo.x + Math.cos(angle) * dist,
        y: repo.y + Math.sin(angle) * dist,
        flash: 1,
        color: repo.color,
        isRepo: false,
        r: FILE_RADIUS,
    };
    state.nodes.push(node);
    state.nodeIndex.set(e.p, node);
    state.simulation.nodes(state.nodes);
    state.simulation.alpha(0.3).restart();
}

function removeNode(node) {
    const i = state.nodes.indexOf(node);
    if (i >= 0) state.nodes.splice(i, 1);
    state.nodeIndex.delete(node.id);
    state.simulation.nodes(state.nodes);
}

// ---------- Frame loop ----------
function frame(now) {
    const dt = (now - state.lastFrame) / 1000;
    state.lastFrame = now;

    if (state.playing && state.data) {
        advanceTime(dt);
    }

    // Ease camera
    state.camera.x += (state.cameraTarget.x - state.camera.x) * CAMERA_EASE;
    state.camera.y += (state.cameraTarget.y - state.camera.y) * CAMERA_EASE;
    state.camera.k += (state.cameraTarget.k - state.camera.k) * CAMERA_EASE;

    // Decay flashes and dying nodes
    for (let i = state.nodes.length - 1; i >= 0; i--) {
        const n = state.nodes[i];
        if (n.flash > 0) n.flash = Math.max(0, n.flash - FLASH_DECAY);
        if (n.dying !== undefined) {
            n.dying -= NODE_DECAY_AFTER_DELETE;
            if (n.dying <= 0) {
                removeNode(n);
            }
        }
    }
    state.repos.forEach(r => { if (r.flash > 0) r.flash = Math.max(0, r.flash - FLASH_DECAY * 0.7); });

    render();
    requestAnimationFrame(frame);
}

function advanceTime(dt) {
    const simAdvance = dt * SIM_SECONDS_PER_REAL_SECOND * state.speedMul;
    state.currentTime += simAdvance;

    while (
        state.eventIdx < state.data.events.length
        && state.data.events[state.eventIdx].t <= state.currentTime
    ) {
        const e = state.data.events[state.eventIdx];
        if (state.activeRepos.has(e.r)) applyEvent(e);
        state.eventIdx++;
    }

    if (state.eventIdx >= state.data.events.length) {
        state.playing = false;
        updatePlayButton();
    }
    updateHUD();
}

// ---------- Rendering ----------
function render() {
    const { ctx, width, height, dpr, camera } = state;
    ctx.save();
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = '#fafafa';
    ctx.fillRect(0, 0, width, height);

    // World -> screen transform
    ctx.translate(width / 2, height / 2);
    ctx.scale(camera.k, camera.k);
    ctx.translate(-camera.x, -camera.y);

    // Repo halos
    state.repos.forEach(r => {
        if (!state.activeRepos.has(r.name)) return;
        const halo = REPO_RADIUS + 30 + r.flash * 40;
        const grad = ctx.createRadialGradient(r.x, r.y, REPO_RADIUS, r.x, r.y, halo);
        grad.addColorStop(0, hexToRgba(r.color, 0.18 + r.flash * 0.25));
        grad.addColorStop(1, hexToRgba(r.color, 0));
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(r.x, r.y, halo, 0, Math.PI * 2);
        ctx.fill();
    });

    // File nodes
    state.nodes.forEach(n => {
        if (n.isRepo) return;
        if (!state.activeRepos.has(n.repo)) return;
        const flash = n.flash;
        const r = FILE_RADIUS + flash * (FILE_RADIUS_FLASH - FILE_RADIUS);
        const alpha = n.dying !== undefined ? Math.max(0, n.dying) : 1;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = flash > 0.05 ? blend(n.color, '#ffffff', flash * 0.6) : n.color;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
    });

    // Repo anchors + labels
    ctx.font = '600 12px "SF Mono", ui-monospace, Menlo, monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    state.repos.forEach(r => {
        if (!state.activeRepos.has(r.name)) {
            ctx.globalAlpha = 0.25;
        }
        // Anchor dot
        ctx.fillStyle = r.color;
        ctx.beginPath();
        ctx.arc(r.x, r.y, REPO_RADIUS, 0, Math.PI * 2);
        ctx.fill();
        // Inner ring
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2 / camera.k;
        ctx.stroke();
        // Label
        ctx.fillStyle = '#0a0a0a';
        ctx.fillText(r.name, r.x, r.y + REPO_RADIUS + 12);
        ctx.globalAlpha = 1;
    });

    ctx.restore();
}

// ---------- HUD ----------
function updateHUD() {
    document.getElementById('atlas-current-date').textContent = formatDate(state.currentTime);
    document.getElementById('stat-events').textContent = state.eventIdx.toLocaleString();
    document.getElementById('stat-files').textContent = state.nodes.filter(n => !n.isRepo).length.toLocaleString();
    document.getElementById('stat-focus').textContent = state.overviewMode ? 'OVERVIEW' : (state.focusRepo || '—');

    // Seek bar
    const seek = document.getElementById('seek');
    if (!seek.matches(':active')) {
        const span = state.data.end - state.data.start;
        const pos = span > 0 ? (state.currentTime - state.data.start) / span : 0;
        seek.value = Math.round(pos * 1000);
    }

    // Legend highlight
    document.querySelectorAll('.legend-row').forEach(el => {
        el.classList.toggle('focused', el.dataset.repo === state.focusRepo);
    });
}

// ---------- Controls ----------
function bindControls() {
    document.getElementById('btn-play').addEventListener('click', togglePlay);
    document.getElementById('btn-reset').addEventListener('click', reset);
    document.getElementById('btn-overview').addEventListener('click', toggleOverview);

    document.getElementById('speed').addEventListener('change', (e) => {
        state.speedMul = parseFloat(e.target.value);
    });

    const seek = document.getElementById('seek');
    seek.addEventListener('input', () => {
        const pos = parseInt(seek.value, 10) / 1000;
        seekToFraction(pos);
    });

    // Keyboard
    window.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;
        if (e.code === 'Space') { e.preventDefault(); togglePlay(); }
        if (e.key === 'r') reset();
        if (e.key === 'o') toggleOverview();
    });

    // Wheel zoom on canvas
    state.canvas.addEventListener('wheel', (e) => {
        e.preventDefault();
        const dz = -e.deltaY * 0.001;
        state.cameraTarget.k = Math.max(0.4, Math.min(6, state.cameraTarget.k * (1 + dz)));
    }, { passive: false });
}

function togglePlay() {
    if (!state.data) return;
    if (state.eventIdx >= state.data.events.length) reset();
    state.playing = !state.playing;
    updatePlayButton();
}

function updatePlayButton() {
    const btn = document.getElementById('btn-play');
    btn.innerHTML = state.playing
        ? '<i class="fas fa-pause"></i>'
        : '<i class="fas fa-play"></i>';
}

function reset() {
    state.eventIdx = 0;
    state.currentTime = state.data.start;
    state.nodes = [...state.repos];
    state.nodeIndex.clear();
    state.repos.forEach(r => { r.flash = 0; });
    state.simulation.nodes(state.nodes);
    state.simulation.alpha(0.3).restart();
    updateHUD();
}

function toggleOverview() {
    state.overviewMode = !state.overviewMode;
    const btn = document.getElementById('btn-overview');
    btn.classList.toggle('active', state.overviewMode);
    if (state.overviewMode) {
        state.cameraTarget = { x: 0, y: 0, k: CAMERA_ZOOM_OVERVIEW };
        state.focusRepo = null;
    }
}

function seekToFraction(f) {
    const span = state.data.end - state.data.start;
    const target = state.data.start + span * f;
    if (target < state.currentTime) {
        // Rewind: rebuild from scratch up to target
        reset();
    }
    // Fast-forward without animation
    while (
        state.eventIdx < state.data.events.length
        && state.data.events[state.eventIdx].t <= target
    ) {
        const e = state.data.events[state.eventIdx];
        if (state.activeRepos.has(e.r)) applyEvent(e);
        state.eventIdx++;
    }
    state.currentTime = target;
    updateHUD();
}

// ---------- Resize ----------
function resize() {
    const c = state.canvas;
    state.width = c.clientWidth = window.innerWidth;
    state.height = c.clientHeight = window.innerHeight;
    state.dpr = window.devicePixelRatio || 1;
    c.width = state.width * state.dpr;
    c.height = state.height * state.dpr;
    c.style.width = state.width + 'px';
    c.style.height = state.height + 'px';
}

// ---------- Utilities ----------
function showStatus(html) {
    const el = document.getElementById('atlas-status');
    el.innerHTML = html;
    el.hidden = false;
}
function hideStatus() {
    document.getElementById('atlas-status').hidden = true;
}

function escapeHTML(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str ?? ''));
    return div.innerHTML;
}

function formatDate(unix) {
    if (!unix) return '—';
    const d = new Date(unix * 1000);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function hexToRgba(hex, a) {
    const h = hex.replace('#', '');
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    return `rgba(${r},${g},${b},${a})`;
}

function blend(c1, c2, t) {
    const p = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
    const [r1, g1, b1] = p(c1);
    const [r2, g2, b2] = p(c2);
    const mix = (a, b) => Math.round(a + (b - a) * t);
    return `rgb(${mix(r1, r2)},${mix(g1, g2)},${mix(b1, b2)})`;
}

// ---------- Boot ----------
document.addEventListener('DOMContentLoaded', init);
