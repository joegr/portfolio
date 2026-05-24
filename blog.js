// ---------- Blog: pulls markdown posts from github.com/joegr/blogg ----------
const BLOG_OWNER = 'joegr';
const BLOG_REPO = 'blogg';
const BLOG_BRANCH = 'main';
// Folder inside the repo to look in. Empty string = repo root.
const BLOG_FOLDER = '';

const API_BASE = `https://api.github.com/repos/${BLOG_OWNER}/${BLOG_REPO}/contents/${BLOG_FOLDER}`;
const RAW_BASE = `https://raw.githubusercontent.com/${BLOG_OWNER}/${BLOG_REPO}/${BLOG_BRANCH}/`;

function sanitizeURL(url) {
    if (!url) return '#';
    if (url.startsWith('http://') || url.startsWith('https://')) {
        try {
            const parsed = new URL(url);
            if (['http:', 'https:'].includes(parsed.protocol)) return parsed.href;
        } catch (e) {}
        return '#';
    }
    return url;
}

function escapeHTML(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str ?? ''));
    return div.innerHTML;
}

// Convert "2024-05-12-my-cool-post.md" or "my-cool-post.md" into title + date
function parsePostMeta(filename) {
    const name = filename.replace(/\.md$/i, '');
    const dateMatch = name.match(/^(\d{4}-\d{2}-\d{2})[-_](.+)$/);
    let slug, date;
    if (dateMatch) {
        date = dateMatch[1];
        slug = dateMatch[2];
    } else {
        slug = name;
    }
    const title = slug
        .replace(/[-_]+/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase());
    return { title, date, slug: filename };
}

// ---------- Index view ----------
async function loadPostList() {
    const status = document.getElementById('blog-status');
    const grid = document.getElementById('blog-grid');

    try {
        const res = await fetch(API_BASE, {
            headers: { 'Accept': 'application/vnd.github.v3+json' }
        });
        if (!res.ok) throw new Error(`GitHub API returned ${res.status}`);
        const items = await res.json();

        const posts = items
            .filter(i => i.type === 'file' && /\.md$/i.test(i.name) && i.name.toLowerCase() !== 'readme.md')
            .map(i => ({ ...parsePostMeta(i.name), path: i.path, name: i.name }))
            .sort((a, b) => (b.date || '').localeCompare(a.date || ''));

        if (posts.length === 0) {
            status.textContent = 'No posts yet.';
            return;
        }

        grid.innerHTML = padToFour(posts.map(renderPostCard).join(''), posts.length);
        grid.hidden = false;
        status.hidden = true;
    } catch (err) {
        console.error(err);
        status.innerHTML = `Couldn't load posts. <a href="https://github.com/${BLOG_OWNER}/${BLOG_REPO}" target="_blank" rel="noopener noreferrer">View on GitHub &rarr;</a>`;
    }
}

function renderPostCard(p) {
    const dateHTML = p.date ? `<span class="blog-card-date">${p.date}</span>` : '';
    const url = `blog.html?post=${encodeURIComponent(p.name)}`;
    return `
        <article class="portfolio-card reveal">
            <h3 class="portfolio-title">${escapeHTML(p.title)}</h3>
            ${dateHTML ? `<div class="blog-card-meta">${dateHTML}</div>` : ''}
            <div class="portfolio-links">
                <a href="${sanitizeURL(url)}" class="portfolio-link detail-link">Read &rarr;</a>
            </div>
        </article>
    `;
}

function padToFour(html, count) {
    const remainder = count % 4;
    if (remainder === 0) return html;
    return html + Array(4 - remainder)
        .fill('<div class="portfolio-card empty" aria-hidden="true"></div>')
        .join('');
}

// ---------- Post view ----------
async function loadPost(filename) {
    const indexEl = document.getElementById('blog-index');
    const postEl = document.getElementById('blog-post');
    const titleEl = document.getElementById('blog-post-title');
    const metaEl = document.getElementById('blog-post-meta');
    const contentEl = document.getElementById('blog-post-content');

    indexEl.hidden = true;
    postEl.hidden = false;

    const meta = parsePostMeta(filename);
    titleEl.textContent = meta.title;
    metaEl.innerHTML = meta.date
        ? `<span class="blog-post-date">${meta.date}</span>`
        : '';
    contentEl.innerHTML = '<p class="blog-status">Loading&hellip;</p>';

    try {
        const res = await fetch(RAW_BASE + filename);
        if (!res.ok) throw new Error(`Could not fetch ${filename}`);
        const md = await res.text();

        // If the markdown begins with an H1, prefer that as the title
        const firstH1 = md.match(/^#\s+(.+)$/m);
        if (firstH1) {
            titleEl.textContent = firstH1[1].trim();
        }

        // Strip the first H1 from the body to avoid double titles
        const body = firstH1 ? md.replace(firstH1[0], '').trim() : md;

        let html;
        if (typeof marked !== 'undefined') {
            marked.setOptions({ breaks: true, gfm: true });
            html = marked.parse(body);
        } else {
            html = `<pre>${escapeHTML(body)}</pre>`;
        }

        // Sanitize before injecting. DOMPurify strips <script>, on*= handlers,
        // javascript: URLs, etc. Keep target/rel so external links still work.
        if (typeof DOMPurify !== 'undefined') {
            html = DOMPurify.sanitize(html, {
                ADD_ATTR: ['target', 'rel'],
                FORBID_TAGS: ['style'],
                FORBID_ATTR: ['style']
            });
        }
        contentEl.innerHTML = html;
    } catch (err) {
        console.error(err);
        contentEl.innerHTML = `<p class="blog-status">Could not load this post. <a href="https://github.com/${BLOG_OWNER}/${BLOG_REPO}/blob/${BLOG_BRANCH}/${encodeURIComponent(filename)}" target="_blank" rel="noopener noreferrer">View on GitHub &rarr;</a></p>`;
    }
}

// ---------- Mobile nav (mirrors index) ----------
function initNav() {
    const toggle = document.getElementById('mobile-menu');
    const menu = document.querySelector('.nav-menu');
    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            menu.classList.toggle('active');
            toggle.classList.toggle('active');
        });
    }
}

// ---------- Reveal ----------
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
    initNav();
    const params = new URLSearchParams(window.location.search);
    const post = params.get('post');
    if (post) {
        loadPost(post).then(initReveal);
    } else {
        loadPostList().then(initReveal);
    }
});
