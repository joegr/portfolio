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
            title: "Soccer World Model (futwm)",
            description: "Stochastic world-model-based prediction of soccer events with formal event ontology, Flask dashboard, and validated interchange formats. Features Monte Carlo rollouts, beam search prediction, and full-match simulation.",
            technologies: ["Python", "Flask", "Pydantic", "JavaScript", "Monte Carlo", "JSON Schema"],
            github: "https://github.com/joegr/futwm",
            detailPage: "projects/futwm.html"
        },
        {
            title: "Fold — Circuit Card Encryption Generator",
            description: "Interactive circuit card simulator with 3D visualization and encryption algorithm generation. Create custom logic elements, stack circuit layers, and export real Python encryption code based on circuit design.",
            technologies: ["React", "Flask", "Three.js", "TypeScript", "Python", "AES"],
            github: "https://github.com/joegr/fold",
            detailPage: "projects/fold.html"
        },
        {
            title: "Owl — Email CRM",
            description: "Email-based CRM system with contact management, template creation, bulk email sending, and analytics dashboard. Built with Django backend and BDD testing using Gherkin/Cucumber specifications.",
            technologies: ["Python", "Django", "JavaScript", "HTML", "Gherkin/BDD", "SMTP"],
            github: "https://github.com/joegr/owl",
            detailPage: "projects/owl.html"
        },
        {
            title: "POO — DAO Governance System",
            description: "Enterprise-scale DAO governance with quadratic voting, multi-signature treasury, and polyglot persistence across PostgreSQL, MongoDB, Neo4j, InfluxDB, and Redis. Kubernetes-deployed with GraphQL + REST APIs.",
            technologies: ["Django", "GraphQL", "Kubernetes", "Docker", "PostgreSQL", "Neo4j"],
            github: "https://github.com/joegr/poo",
            detailPage: "projects/poo.html"
        }
    ],
    datascience: [
        {
            title: "Elo Garden — LLM from Scratch",
            description: "Complete LLM training infrastructure with custom Transformer architecture, BPE tokenizer, and full training pipeline. Features TensorBoard monitoring, checkpointing, and configurable text generation with temperature/top-k/top-p sampling.",
            technologies: ["Python", "PyTorch", "Transformers", "BPE Tokenizer", "TensorBoard", "AdamW"],
            github: "https://github.com/joegr/elo-garden/tree/main/services",
            detailPage: "projects/elo-garden.html"
        },
        {
            title: "Phonemescape — IPA Analysis Library",
            description: "Comprehensive phoneme analysis library with IPA vowel/consonant visualization, mouth shape similarity calculation, and network graph generation. Features articulatory feature analysis and word phoneme breakdown.",
            technologies: ["Python", "Plotly", "NetworkX", "IPA", "Linguistics", "pip package"],
            github: "https://github.com/joegr/ipaba",
            detailPage: "projects/phonemescape.html"
        },
        {
            title: "Native Sparse Attention (NSA)",
            description: "CUDA implementation of sparse attention with three-branch architecture: compressed token, selected token, and sliding window branches. Optimized kernels with shared memory utilization.",
            technologies: ["CUDA", "C", "CMake", "Sparse Attention", "GPU Kernels"],
            github: "https://github.com/joegr/native-sparse-attention",
            detailPage: "projects/native-sparse-attention.html"
        },
        {
            title: "Forge — MetalNeuralKit M4 Optimizer",
            description: "Apple M4 Neural Engine optimization library for Metal-based neural networks. Custom compute kernels, half-precision Float16, MPSGraph integration, and Neural Engine acceleration with BDD testing.",
            technologies: ["Swift", "Metal", "Neural Engine", "MPSGraph", "Float16", "Gherkin/BDD"],
            github: "https://github.com/joegr/forge",
            detailPage: "projects/forge.html"
        }
    ],
    dataengineering: [
        {
            title: "Span — Blockchain ML Pipeline",
            description: "Multi-language blockchain + NLP application combining Python ML processing with Rust-based Solana smart contracts. Dockerized microservices with Flask API and concurrent request handling.",
            technologies: ["Python", "Rust", "Solana", "Flask", "Docker", "NLP"],
            github: "https://github.com/joegr/span",
            detailPage: "projects/span.html"
        },
        {
            title: "Vigenère Cipher",
            description: "Cryptographic cipher implementation with random key generation from printable character sets. Demonstrates classical encryption algorithms with modern Python practices.",
            technologies: ["Python", "Cryptography", "Classical Ciphers"],
            github: "https://gist.github.com/joegr/37724d7a3c6bf1ad8d1ae5fff67ff7ee",
            detailPage: "projects/vigenere-cipher.html"
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
