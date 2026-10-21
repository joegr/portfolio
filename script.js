// ---------- D3 GitHub Contributions Heatmap ----------
(function renderContributions() {
    const container = document.getElementById('github-contributions');
    if (!container || typeof d3 === 'undefined') return;

    fetch('contributions.json')
        .then(res => res.json())
        .then(data => {
            const contributions = data.contributions;
            if (!contributions || !contributions.length) return;

            const cellSize = 11;
            const cellPadding = 2;
            const totalSize = cellSize + cellPadding;
            const weeks = Math.ceil(contributions.length / 7);
            const width = weeks * totalSize + 40;
            const height = 7 * totalSize + 30;

            const colors = ['#f3f4f6', '#fed7aa', '#fb923c', '#c2410c', '#7c2d12'];

            const svg = d3.select(container)
                .append('svg')
                .attr('viewBox', `0 0 ${width} ${height}`)
                .attr('preserveAspectRatio', 'xMidYMid meet')
                .style('width', '100%')
                .style('height', 'auto')
                .style('display', 'block');

            const days = ['Mon', 'Wed', 'Fri'];
            const dayPositions = [1, 3, 5];
            svg.selectAll('.day-label')
                .data(days)
                .enter()
                .append('text')
                .attr('x', 0)
                .attr('y', (d, i) => dayPositions[i] * totalSize + 24 + cellSize / 2)
                .attr('fill', '#6b7280')
                .attr('font-size', '9px')
                .attr('font-family', 'ui-monospace, monospace')
                .attr('dominant-baseline', 'middle')
                .text(d => d);

            const months = [];
            contributions.forEach((c, i) => {
                const date = new Date(c.date);
                if (date.getDate() <= 7 && date.getDay() === 0) {
                    months.push({ name: date.toLocaleString('en', { month: 'short' }), week: Math.floor(i / 7) });
                }
            });
            svg.selectAll('.month-label')
                .data(months)
                .enter()
                .append('text')
                .attr('x', d => d.week * totalSize + 40)
                .attr('y', 12)
                .attr('fill', '#6b7280')
                .attr('font-size', '9px')
                .attr('font-family', 'ui-monospace, monospace')
                .text(d => d.name);

            const tooltip = d3.select(container)
                .append('div')
                .style('position', 'absolute')
                .style('background', '#0a0a0a')
                .style('color', '#fff')
                .style('padding', '5px 8px')
                .style('border-radius', '3px')
                .style('font-size', '11px')
                .style('font-family', 'ui-monospace, monospace')
                .style('pointer-events', 'none')
                .style('opacity', '0')
                .style('transition', 'opacity 0.15s')
                .style('white-space', 'nowrap')
                .style('z-index', '10');

            // Reveal column-by-column, left to right
            const totalDuration = 800;
            const delayPerWeek = totalDuration / weeks;

            svg.selectAll('.contrib-cell')
                .data(contributions)
                .enter()
                .append('rect')
                .attr('class', 'contrib-cell')
                .attr('x', (d, i) => Math.floor(i / 7) * totalSize + 40)
                .attr('y', (d, i) => (i % 7) * totalSize + 20)
                .attr('width', cellSize)
                .attr('height', cellSize)
                .attr('rx', 2)
                .attr('ry', 2)
                .attr('fill', d => colors[d.level] || colors[0])
                .attr('opacity', 0)
                .transition()
                .delay((d, i) => Math.floor(i / 7) * delayPerWeek)
                .duration(200)
                .attr('opacity', 1)
                .selection()
                .style('cursor', 'pointer')
                .on('mouseover', function(event, d) {
                    const count = d.count;
                    const dateStr = new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                    const label = count === 0 ? 'No contributions' : `${count} contribution${count > 1 ? 's' : ''}`;
                    tooltip.html(`${label} · ${dateStr}`).style('opacity', '1');
                    d3.select(this).attr('stroke', '#0a0a0a').attr('stroke-width', '1');
                })
                .on('mousemove', function(event) {
                    const rect = container.getBoundingClientRect();
                    tooltip
                        .style('left', (event.clientX - rect.left + 10) + 'px')
                        .style('top', (event.clientY - rect.top + 14) + 'px');
                })
                .on('mouseout', function() {
                    tooltip.style('opacity', '0');
                    d3.select(this).attr('stroke', 'none');
                });
        })
        .catch(err => console.error('Failed to load contributions:', err));
})();

// ---------- Sanitization ----------
function sanitizeHTML(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str ?? ''));
    return div.innerHTML;
}

function sanitizeURL(url) {
    if (!url) return '#';
    if (url.startsWith('http://') || url.startsWith('https://')) {
        try {
            const parsed = new URL(url);
            if (['http:', 'https:'].includes(parsed.protocol)) return parsed.href;
        } catch (e) {}
        return '#';
    }
    if (url.startsWith('javascript:') || url.startsWith('data:')) return '#';
    return url;
}

// ---------- Data ----------
const portfolioData = {
    fullstack: [
        {
            title: "Scythe — debate card cutter",
            description: "A card cutter that doubles as a span-labeling tool. Each team runs its own server; a bare git repo is the record, every edit is a commit by its author, and saves are compare-and-swap.",
            technologies: ["TypeScript", "React", "Vite", "OpenAPI", "spaCy", "WebAuthn", "Gherkin"],
            github: "https://github.com/joegr/scythe-web",
            demo: "https://joegr.github.io/scythe-landing/",
            detailPage: "projects/scythe.html"
        },
        {
            title: "game-state — tournaments run from git",
            description: "A single-elimination tournament run entirely on GitHub: markdown files are the database, GitHub Actions the only backend, and nothing reaches the public record until the organizer confirms a stage change.",
            technologies: ["JavaScript", "GitHub Actions", "GitHub Pages", "Markdown", "Gherkin"],
            github: "https://github.com/joegr/game-state",
            demo: "https://joegr.github.io/game-state/",
            detailPage: "projects/game-state.html"
        },
        {
            title: "Predixion — prediction markets",
            description: "A Polymarket-style market with an LMSR market maker, vote or oracle resolution, and results minted into a hash-chained ledger with post-quantum signatures from a Rust service.",
            technologies: ["TypeScript", "React", "Rust", "Python", "FastAPI", "LMSR", "Kyber/Dilithium", "Docker"],
            github: "https://github.com/joegr/polymarket-app",
            detailPage: "projects/predixion.html"
        },
        {
            title: "Fold — circuit cards into ciphers",
            description: "Stack 3D circuit cards of logic gates and export a Python encryption class derived from the layout, wrapped around AES-256. A post-quantum mode binds ML-KEM-768 keys to the circuit topology.",
            technologies: ["React", "TypeScript", "Three.js", "Flask", "AES-256", "ML-KEM-768", "liboqs"],
            github: "https://github.com/joegr/fold",
            detailPage: "projects/fold.html"
        }
    ],
    datascience: [
        {
            title: "Isogloss — where is this accent from?",
            description: "Record speech, get back the phones, the language, fourteen sociophonetic measurements and a probability distribution over the map. The field is interpolated with the heat kernel of a gravity/barrier graph, built in PostGIS.",
            technologies: ["Python", "PostGIS", "Gaussian processes", "spaCy", "TypeScript", "Web Audio", "Docker"],
            github: "https://github.com/joegr/isogloss",
            demo: "https://joegr.github.io/isogloss/",
            detailPage: "projects/isogloss.html"
        },
        {
            title: "Phonemescape — the IPA as a library",
            description: "The full 2020 IPA chart, a real tokenizer for diacritics, ties and tones, 28 distinctive features in one space for vowels and consonants, natural-class queries, chart plots, and a Neo4j graph of samples.",
            technologies: ["Python", "Phonology", "Neo4j", "Matplotlib", "pip package"],
            github: "https://github.com/joegr/ipaba",
            detailPage: "projects/phonemescape.html"
        },
        {
            title: "Schemaz — 30 annotation schemas",
            description: "Label Studio labeling schemas as pure JSON: six ML annotation categories, five levels each, from the floor of the task to a production-shaped schema with quality gates. Each file carries its design notes and sample tasks.",
            technologies: ["Label Studio", "JSON", "Python", "Data annotation"],
            github: "https://github.com/joegr/schemaz",
            detailPage: "projects/schemaz.html"
        }
    ],
    dataengineering: [
        {
            title: "Soccer World Model",
            description: "Stochastic, world-model-based prediction of soccer events with a formal event ontology and validated JSON/CSV interchange. Top-k next events, beam search, Monte Carlo rollouts and full-match simulation. On PyPI.",
            technologies: ["Python", "Pydantic", "Markov models", "Monte Carlo", "Flask", "PyPI"],
            github: "https://github.com/joegr/futwm",
            detailPage: "projects/futwm.html"
        },
        {
            title: "Elo Garden — ModelOps by tournament",
            description: "Models enter arenas, play seasons and earn Elo ratings; experiments are tracked through an MLflow-compatible API. A React dashboard builds arenas and reads leaderboards.",
            technologies: ["Python", "MLflow", "Elo", "React", "TypeScript", "Docker"],
            github: "https://github.com/joegr/elo-garden",
            detailPage: "projects/elo-garden.html"
        },
        {
            title: "Forge — MetalNeuralKit for M4",
            description: "Neural network layers for Apple silicon in Swift and Metal: Float16 paths, Neural Engine acceleration, MPSGraph compilation, persistent shared buffers and custom compute kernels, specified in Gherkin.",
            technologies: ["Swift", "Metal", "MPSGraph", "Neural Engine", "Float16", "Gherkin"],
            github: "https://github.com/joegr/forge",
            detailPage: "projects/forge.html"
        },
        {
            title: "15 Lines of Code",
            description: "A daily sketch in fifteen lines of p5.js, one folder per day, built into a static gallery and posted to Instagram.",
            technologies: ["p5.js", "JavaScript", "Generative art", "GitHub Pages"],
            github: "https://github.com/joegr/15linesofcode",
            demo: "https://joegr.github.io/15linesofcode/",
            detailPage: "projects/15linesofcode.html"
        }
    ],
    writings: [
        {
            title: "Alignment Means You Already Messed Up: Ethics in ML",
            excerpt: "Some of our conscious heuristics and unconscious associations are rooted in faculties that have emerged from evolution. As infants grow they begin to build a model of the world informed by these emergent faculties—pure sense data, differences in light reflections of shaped objects, the arrangement of features like eyes and mouths become: faces of mom, dad, siblings.",
            url: "https://www.linkedin.com/pulse/alignment-means-you-already-messed-up-ethics-ml-joseph-gruenbaum-fosdc/",
            tags: ["AI Ethics", "Machine Learning", "Alignment"]
        },
        {
            title: "10 Turing Benchmarks",
            excerpt: "Many orders of magnitude by computational possibility more complex than Chess is Go—but machines are way better than us at this too. We thought this wouldn't fall after Chess; but the optimization core was there. All it took was changing some input parameters and adapting the problem space.",
            url: "https://www.linkedin.com/pulse/10-turing-benchmarks-joseph-gruenbaum/",
            tags: ["AI", "Turing Test", "Benchmarks"]
        },
        {
            title: "The Responsibility to Pretend in AI",
            excerpt: "Classical realists love to imbue anarchy with fatalism, and domestic political squabbles with prescribed apathy. New realists eliminate this fortune-based setup. As states become better at triggering the snap-reactions of the media, manufacturing information and discourse, democracies themselves stand to lose whatever theoretical footing IR theories build for justification.",
            url: "https://www.linkedin.com/pulse/responsibility-pretend-ir-ai-joseph-gruenbaum-82pyc/",
            tags: ["AI", "Philosophy", "Responsibility"]
        }
    ]
};

// ---------- Render ----------
function createProjectCard(p) {
    const demoLink = p.demo
        ? `<a href="${sanitizeURL(p.demo)}" target="_blank" rel="noopener noreferrer" class="portfolio-link"><i class="fas fa-arrow-up-right-from-square"></i> Live</a>`
        : '';
    const detailLink = p.detailPage
        ? `<a href="${sanitizeURL(p.detailPage)}" class="portfolio-link detail-link">Details &rarr;</a>`
        : '';
    return `
        <article class="portfolio-card reveal">
            <h3 class="portfolio-title">${sanitizeHTML(p.title)}</h3>
            <div class="portfolio-tech">
                ${p.technologies.map(t => `<span class="tech-tag">${sanitizeHTML(t)}</span>`).join('')}
            </div>
            <div class="portfolio-links">
                <a href="${sanitizeURL(p.github)}" target="_blank" rel="noopener noreferrer" class="portfolio-link">
                    <i class="fab fa-github"></i> Code
                </a>
                ${demoLink}
                ${detailLink}
            </div>
        </article>
    `;
}

function createArticleCard(a) {
    const tagsHTML = (a.tags || [])
        .map(t => `<span class="article-tag">${sanitizeHTML(t)}</span>`)
        .join('');
    return `
        <article class="article-card reveal">
            <h3 class="article-title">${sanitizeHTML(a.title)}</h3>
            <div class="article-tags">${tagsHTML}</div>
            <div class="portfolio-links">
                <a href="${sanitizeURL(a.url)}" target="_blank" rel="noopener noreferrer" class="article-link portfolio-link">
                    <i class="fab fa-linkedin"></i> Read &rarr;
                </a>
            </div>
        </article>
    `;
}

function padToFour(html, count) {
    const remainder = count % 4;
    if (remainder === 0) return html;
    const empties = Array(4 - remainder).fill('<div class="portfolio-card empty" aria-hidden="true"></div>').join('');
    return html + empties;
}

function renderPortfolio() {
    const map = {
        'fullstack-grid': portfolioData.fullstack,
        'datascience-grid': portfolioData.datascience,
        'dataengineering-grid': portfolioData.dataengineering
    };
    for (const [id, list] of Object.entries(map)) {
        const el = document.getElementById(id);
        if (el) el.innerHTML = padToFour(list.map(createProjectCard).join(''), list.length);
    }
    const writings = document.getElementById('writings-grid');
    if (writings) {
        const list = portfolioData.writings.filter(w => w.title);
        writings.innerHTML = padToFour(list.map(createArticleCard).join(''), list.length);
    }
}

// ---------- Navigation ----------
function initNav() {
    const toggle = document.getElementById('mobile-menu');
    const menu = document.querySelector('.nav-menu');
    const links = document.querySelectorAll('.nav-link');

    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            menu.classList.toggle('active');
            toggle.classList.toggle('active');
        });
    }

    links.forEach(link => {
        link.addEventListener('click', () => {
            if (menu) menu.classList.remove('active');
            if (toggle) toggle.classList.remove('active');
        });
    });

    // Active section highlight via IntersectionObserver
    const sections = document.querySelectorAll('section[id]');
    if (!sections.length) return;
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                links.forEach(l => {
                    l.classList.toggle('active', l.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(s => obs.observe(s));
}

// ---------- Reveal on scroll ----------
function initReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
        els.forEach(e => e.classList.add('active'));
        return;
    }
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    els.forEach(e => obs.observe(e));
}

// ---------- Init ----------
document.addEventListener('DOMContentLoaded', () => {
    renderPortfolio();
    initNav();
    initReveal();
});
