// HTML Sanitization Utility
function sanitizeHTML(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}

function sanitizeURL(url) {
    if (!url) return '#';
    if (url.startsWith('http://') || url.startsWith('https://')) {
        try {
            const parsed = new URL(url);
            if (['http:', 'https:'].includes(parsed.protocol)) {
                return parsed.href;
            }
        } catch (e) {}
        return '#';
    }
    if (url.startsWith('javascript:') || url.startsWith('data:')) {
        return '#';
    }
    return url;
}

// Project Detail Data - All project information in one place
const projectDetails = {
    scythe: {
        title: "Scythe — debate card cutter",
        category: "fullstack",
        categoryLabel: "Apps",
        backLink: "../index.html#fullstack",
        github: "https://github.com/joegr/scythe-web",
        demo: "https://joegr.github.io/scythe-landing/",
        technologies: ["TypeScript", "React", "Vite", "OpenAPI", "spaCy", "WebAuthn passkeys", "Sign in with Apple", "Gherkin", "Git"],
        screenshots: [],
        overview: "Scythe is a debate card cutter that doubles as a span-labeling tool: spaCy, but cleaner. Each team gets its own server, and its accounts, cards and history live there and never leave it. This repo is the open half: the web app, the API contract every client builds against, and the feature specs. The server and the iOS app are private. The landing page lets a visitor try cutting a card in the browser.",
        features: [
            "Git is the record: each card, source and case is a Markdown file in a bare repository, and every edit is a commit authored by the person who made it",
            "Saves are compare-and-swap: a save is pinned to the version you opened; if someone committed first the server answers 409 with their version and the app offers rebase, keep theirs or force mine",
            "The index is derived: search, the knowledge graph, tokens, entities and model suggestions are rebuilt from the files and never committed",
            "Spans are token-aligned to spaCy's tokens, so labels line up across every client",
            "Cases quote cards by exact words, checked when added, and open the card with those words marked",
            "Accounts are Scythe's own: passkeys, email + password, or Sign in with Apple once a passkey exists; invites from a team admin; minimal PII because many users are minors",
            "The API contract is generated from the server and CI fails if the two drift",
            "18 Gherkin features, each scenario tagged built, partly or missing, run in a real browser in CI",
            "No LLMs anywhere: the NLP is spaCy and nothing else"
        ],
        technicalDetails: "Frontend: React + Vite in TypeScript, served by each team's server from its own domain. Contract: openapi.json for the HTTP API, format.md for the card, source and settings files, and the NSDA topic list refreshed monthly by a workflow that opens a PR. Auth stores only credential ids and public keys for passkeys, HMAC digests for emails and Apple ids, Argon2 password hashes, and SHA-256 of bearer tokens. Commits carry the handle at users.noreply.scythe and never a real email."
    },
    "game-state": {
        title: "game-state — tournaments run from git",
        category: "fullstack",
        categoryLabel: "Apps",
        backLink: "../index.html#fullstack",
        github: "https://github.com/joegr/game-state",
        demo: "https://joegr.github.io/game-state/",
        technologies: ["JavaScript", "GitHub Actions", "GitHub Pages", "Markdown", "Node", "Gherkin"],
        screenshots: [],
        overview: "A single-elimination tournament run entirely on GitHub, with markdown files as the database and GitHub Actions as the only backend. There is no server and no JSON store: the spine, the roster and the results are markdown files, and the pages rebuild the bracket from them on every visit with the same code the workflows use.",
        features: [
            "Captains need no account: they register with a public team code and a secret PIN and submit scores from the captain view",
            "Nothing reaches the public record without the organizer: submissions queue privately, the organizer accepts them, and they publish only at a stage change the organizer has seen and confirmed",
            "Hard, deterministic stage gates: the stage is derived from the published files and one table decides what each stage allows",
            "A record that does not replay cleanly freezes everything",
            "Concurrent submissions cannot collide: intake only creates new files and the batch is the only writer of the queue",
            "Teams and scores travel the same road: intake, batch, accept, publish, each with its own checks",
            "Three repos split the trust: the public engine and site, the public record, and a private queue"
        ],
        technicalDetails: "engine.js is the pure engine (bracket, invariants, stage, gates) and pipeline.js the pure intake, batch and stage-change decisions; both run unchanged in the browser, the organizer CLI (advance.mjs) and the workflows. stage.yml is the only writer of the public record and refuses to run unless the plan fingerprint is the one the organizer confirmed. CI runs the tests and requires the live record to replay cleanly. The public record lives in joegr/game-state-roster: team codes and token hashes only."
    },
    predixion: {
        title: "Predixion — prediction markets",
        category: "fullstack",
        categoryLabel: "Apps",
        backLink: "../index.html#fullstack",
        github: "https://github.com/joegr/polymarket-app",
        technologies: ["TypeScript", "React", "Rust", "Python", "FastAPI", "LMSR", "SHA3-256", "Kyber768", "Dilithium3", "Docker", "Kubernetes"],
        screenshots: [],
        overview: "A Polymarket-style prediction market with dynamic event submission, a mocked Square checkout, fees on top, and dashboards for participants and operators. Pricing comes from an LMSR automated market maker, and finalized results are minted into an append-only, hash-chained ledger.",
        features: [
            "LMSR market maker: always-liquid YES/NO prices that move with every trade, numerically stable cost and price functions, binary-search share sizing",
            "Two resolution modes: a share-weighted vote that resolves at a 60% supermajority, or a deterministic oracle verified against Apple Sports / FIFA and confirmed by an admin",
            "Post-quantum minting: each result is hashed with SHA3-256, encrypted with Kyber768 + AES-GCM, signed with Dilithium3 and appended to the ledger at /chain",
            "Anyone can propose a market; it waits in a pending queue until an admin approves it",
            "Fees modeled explicitly: 2% on trades, 1% on winnings, Square processing fees separate",
            "Participant dashboard with balance, P&L, allocation and trade history; operator view with volume, revenue and net AMM exposure"
        ],
        technicalDetails: "The web app is TypeScript and runs standalone with a clearly labelled simulated crypto fallback. The full stack adds a Rust service for the post-quantum crypto and ledger and a Python FastAPI service for oracle verification and minting coordination, orchestrated with Docker Compose (make up / make health) or Kubernetes."
    },
    fold: {
        title: "Fold — circuit cards into ciphers",
        category: "fullstack",
        categoryLabel: "Apps",
        backLink: "../index.html#fullstack",
        github: "https://github.com/joegr/fold",
        technologies: ["React", "TypeScript", "Three.js", "Python", "Flask", "AES-256", "ML-KEM-768", "SHAKE-256", "liboqs", "Docker"],
        screenshots: [],
        overview: "A web simulator for stackable circuit cards with matrix logic and mesh-layer interactions. Each unique layout produces its own encryption algorithm, exported as a self-contained Python class wrapped around AES-256-CBC. Educational: the circuit-derived layer has not been through cryptanalysis, and the README says so.",
        features: [
            "Interactive 3D canvas: drag-and-drop stackable cards with orbit controls",
            "Card generator: node counts, connection matrices, mesh interaction points and gates (AND, OR, XOR, NOT, NAND, NOR, BUFFER)",
            "Card library of prebuilt cards plus anything you make",
            "FINALIZE exports a Python encryption class derived from the layout, with an encrypt/decrypt round trip",
            "Post-quantum mode: ML-KEM-768 (FIPS 203) keypairs bound to the circuit topology, AES-256-GCM, SHAKE-256 circuit binding",
            "A PQC sidecar container on the Open Quantum Safe stack provides key encapsulation, encrypt and decrypt endpoints"
        ],
        technicalDetails: "Frontend in React + TypeScript + Three.js; backend a Flask REST API that generates the algorithms; the post-quantum operations run in a separate liboqs-based Docker service. Ships with Docker Compose, tests and CI."
    },
    isogloss: {
        title: "Isogloss — where is this accent from?",
        category: "datascience",
        categoryLabel: "Language & Speech",
        backLink: "../index.html#datascience",
        github: "https://github.com/joegr/isogloss",
        demo: "https://joegr.github.io/isogloss/",
        technologies: ["Python", "PostGIS", "PostgreSQL", "Gaussian processes", "Graph heat kernels", "spaCy", "TypeScript", "Web Audio", "Docker Compose"],
        screenshots: [],
        overview: "Record speech. Get back the phones, the language, fourteen sociophonetic measurements, and where the accent is from as a probability distribution drawn on a map. The browser synthesiser runs the other way: an accent is fourteen numbers, move a slider and hear what changes. The speaker map puts one dot per speaker at their birthplace.",
        features: [
            "The geography is the model: the covariance used to interpolate the accent field is the heat kernel of a gravity/barrier interaction graph, not a distance kernel over lat/lon, so barriers, settlement hierarchy and migration are inherited rather than bolted on",
            "The output is a MULTIPOLYGON, not a coordinate pair",
            "PostGIS builds the whole field on first boot: phone inventory, twenty languages, the geographic substrate, a hundred reference varieties and every derived layer",
            "Seeded with the Speech Accent Archive's 3,031 speakers reading the same paragraph, with geocoded birthplaces",
            "Creating a speaker is one transaction: record, place, NER over the free text with spaCy's multilingual model, then audio converted to 16 kHz WAV in the browser and featurised",
            "A graph-kernel Gaussian process over recordings answers two questions: where a recording was produced, and how likely a sound is at each place",
            "Synthesiser runs entirely in the tab; the analyser and speaker map run on the backend"
        ],
        technicalDetails: "Backend in Python over PostGIS, frontend in TypeScript, orchestrated with make up. docs/DIFFUSION.md gives the argument for the diffusion propagator, docs/AUDIO_FIELD.md derives the learned field, docs/PRIMER.md has the background math with worked examples. The globe comes from joegr/demogi."
    },
    phonemescape: {
        title: "Phonemescape — the IPA as a library",
        category: "datascience",
        categoryLabel: "Language & Speech",
        backLink: "../index.html#datascience",
        github: "https://github.com/joegr/ipaba",
        technologies: ["Python", "Phonology", "Distinctive features", "Neo4j", "Matplotlib", "pip package"],
        screenshots: [],
        overview: "A Python library for the International Phonetic Alphabet: tokenizing transcriptions, distinctive features and natural classes, articulatory similarity, IPA chart plots, and a local Neo4j graph of phoneme samples.",
        features: [
            "The full 2020 IPA chart: 28 vowels, 59 pulmonic consonants, the other symbols, clicks and implosives, every diacritic, suprasegmental and tone mark",
            "Real tokenization: aspiration, nasalization, tie bars, syllabic marks, length, prenasalization, stress, tone letters, delimiters, and aliases for common look-alikes",
            "28 binary distinctive features (Hayes 2009 plus velaric and long), derived by rule from each symbol's chart description, in one space shared by vowels and consonants",
            "Articulatory similarity from features, refined by chart proximity",
            "Natural-class queries such as natural_class(sonorant='-', continuant='+')",
            "Chart plots in the official orientation and geometry",
            "A local Neo4j graph linking every sample to its segments, features, language and phonetically similar samples"
        ],
        technicalDetails: "Pure Python, installable with pip. Features are computed rather than hand-tabulated, so the same rules cover every symbol and diacritic combination."
    },
    schemaz: {
        title: "Schemaz — 30 annotation schemas",
        category: "datascience",
        categoryLabel: "Language & Speech",
        backLink: "../index.html#datascience",
        github: "https://github.com/joegr/schemaz",
        technologies: ["Label Studio", "JSON", "Python", "Data annotation", "Schema design"],
        screenshots: [],
        overview: "Thirty Label Studio labeling schemas as pure JSON, across six ML annotation categories, five per category, escalating from the floor of the task to a production-shaped, maximal-entropy schema. Each file holds the config, sample tasks and the design rationale together.",
        features: [
            "Six categories: object detection, image classification, multipage document annotation, OCR, visual question answering, and ASR / speech transcription",
            "Five levels per category, L1 to L5, from binary forced choice up to pipelines with reading order, cross-page relations, quality gates and routing",
            "Label Studio's config is XML-only, so each schema stores a lossless JSON tree mirror of it that renders straight back to XML",
            "Ready-to-import sample tasks whose data matches the config's variables",
            "Design notes on every schema: abstention split into 'cannot tell' vs 'none of these', soft labels via sliders, automation-bias-aware pre-label review, and more"
        ],
        technicalDetails: "schemas/ contains exactly the thirty JSON files and nothing else. Every file shares one top-level shape: schema_id, category, level, entropy, title, design_notes, label_config and sample_tasks."
    },
    futwm: {
        title: "Soccer World Model",
        category: "dataengineering",
        categoryLabel: "Models & Experiments",
        backLink: "../index.html#dataengineering",
        github: "https://github.com/joegr/futwm",
        demo: "https://pypi.org/project/soccer-world-model/",
        technologies: ["Python", "Pydantic", "Markov models", "Beam search", "Monte Carlo", "JSON Schema", "Flask", "PyPI"],
        screenshots: [],
        overview: "Stochastic, world-model-based prediction of soccer events with a formal event ontology and validated interchange formats. Published on PyPI as soccer-world-model; pip install it and load the bundled sample match.",
        features: [
            "Versioned event ontology as the single source of truth",
            "Phase-conditioned Markov transitions with feature modifiers: pressure, distance to goal, goal angle",
            "Prediction engine: top-k next events, beam search over event sequences, Monte Carlo rollouts",
            "Full 90-minute match simulation with possession chains",
            "FIFA-standard 105x68m pitch geometry with zones, areas and a pressure index",
            "Lossless JSON and tabular CSV with strict Pydantic validation, plus JSON Schema export",
            "Optional Flask dashboard (pip install soccer-world-model[server])"
        ],
        technicalDetails: "ontology.py, schema.py, interchange.py, pitch.py, world_model.py, stochastic.py, predictor.py and simulation.py. Destinations are bivariate Gaussians conditioned on phase and zone; event outcomes are Bernoulli or categorical."
    },
    "elo-garden": {
        title: "Elo Garden — ModelOps by tournament",
        category: "dataengineering",
        categoryLabel: "Models & Experiments",
        backLink: "../index.html#dataengineering",
        github: "https://github.com/joegr/elo-garden",
        technologies: ["Python", "MLflow", "Elo", "React", "TypeScript", "Tailwind", "Docker Compose"],
        screenshots: [],
        overview: "Garden is a model operations framework that evaluates models by having them compete: arenas, seasons, leaderboards and Elo ratings, with an MLflow-compatible tracking API so familiar experiment patterns carry over.",
        features: [
            "Elo as the index: K-factor 32, initial rating 1500, multi-player tournaments, matchmaking and suggestions by rating",
            "MLflow-style set_experiment / start_run / log_params / log_metrics, plus registered custom metrics such as elo_rating and accuracy",
            "Arenas, seasons and leaderboards for ongoing comparison",
            "React + TypeScript frontend: arena builder, experiment dashboard, model library",
            "Docker Compose for the whole garden; HuggingFace integration example"
        ],
        technicalDetails: "Python framework and API, with a React frontend served by nginx. The repo also carries a small from-scratch Transformer and dataset pipeline used as a sample contestant."
    },
    forge: {
        title: "Forge — MetalNeuralKit for M4",
        category: "dataengineering",
        categoryLabel: "Models & Experiments",
        backLink: "../index.html#dataengineering",
        github: "https://github.com/joegr/forge",
        technologies: ["Swift", "Metal", "MPSGraph", "Apple Neural Engine", "Float16", "Gherkin"],
        screenshots: [],
        overview: "Neural network layers for Apple silicon, written in Swift on Metal, with a guide to tuning them for the M4's Neural Engine, GPU and unified memory.",
        features: [
            "Half-precision Float16 paths with configurable precision per layer",
            "Neural Engine acceleration for convolution and fully-connected layers",
            "Batched GPU processing and persistent shared-storage buffers to minimise CPU-GPU transfers",
            "MPSGraph integration and executable compilation for complex tensor operations",
            "Custom Metal compute kernels",
            "Performance monitoring and troubleshooting, behaviour specified in Gherkin"
        ],
        technicalDetails: "Swift with Gherkin specs. Key types: M4Optimizer (singleton configurator), ConvolutionLayer, FullyConnectedLayer."
    },
    "15linesofcode": {
        title: "15 Lines of Code",
        category: "dataengineering",
        categoryLabel: "Models & Experiments",
        backLink: "../index.html#dataengineering",
        github: "https://github.com/joegr/15linesofcode",
        demo: "https://joegr.github.io/15linesofcode/",
        technologies: ["p5.js", "JavaScript", "Generative art", "GitHub Pages"],
        screenshots: [],
        overview: "A daily code/art project: one p5.js sketch in fifteen lines, one folder per day, posted to Instagram. The repo builds itself into a gallery.",
        features: [
            "One folder per day holding an index.html and a sketch.js",
            "build.js writes a static site with a page per sketch and an index, sorted by date",
            "Deployed to GitHub Pages on push",
            "Sketches reach back to 2017 and pick up again in 2026"
        ],
        technicalDetails: "Plain p5.js, no framework. The build copies p5 from node_modules and generates the pages with a template string."
    }
};

// Get project ID from URL or filename
function getProjectId() {
    const path = window.location.pathname;
    const filename = path.split('/').pop().replace('.html', '');
    return filename;
}

// Render project detail page
function renderProjectDetail() {
    const projectId = getProjectId();
    const project = projectDetails[projectId];
    
    if (!project) {
        document.getElementById('project-content').innerHTML = '<p>Project not found.</p>';
        return;
    }

    document.title = `${project.title} | Joe Gruenbaum`;

    const screenshotsHTML = project.screenshots.length > 0 
        ? project.screenshots.map(src => `
            <div class="screenshot-item">
                <img src="${sanitizeURL(src)}" alt="${sanitizeHTML(project.title)} Screenshot" loading="lazy">
            </div>
        `).join('')
        : '<p class="placeholder-text">Screenshots coming soon</p>';

    const featuresHTML = project.features.length > 0
        ? `<ul>${project.features.map(f => `<li>${sanitizeHTML(f)}</li>`).join('')}</ul>`
        : '<ul><li>Features to be added</li></ul>';

    const content = `
        <div class="project-header">
            <a href="${sanitizeURL(project.backLink)}" class="back-link"><i class="fas fa-arrow-left"></i> Back to Portfolio</a>
            <h1>${sanitizeHTML(project.title)}</h1>
            <div class="project-meta">
                <span class="category-badge ${sanitizeHTML(project.category)}">${sanitizeHTML(project.categoryLabel)}</span>
                <a href="${sanitizeURL(project.github)}" class="github-link" target="_blank" rel="noopener noreferrer">
                    <i class="fab fa-github"></i> View on GitHub
                </a>
                ${project.demo ? `<a href="${sanitizeURL(project.demo)}" class="github-link" target="_blank" rel="noopener noreferrer"><i class="fas fa-arrow-up-right-from-square"></i> Live</a>` : ''}
            </div>
        </div>

        <section class="project-screenshots">
            <h2>Screenshots</h2>
            <div class="screenshot-gallery">
                ${screenshotsHTML}
            </div>
        </section>

        <section class="project-overview">
            <h2>Overview</h2>
            <p>${sanitizeHTML(project.overview || 'Project overview coming soon.')}</p>
        </section>

        <section class="project-tech">
            <h2>Technologies</h2>
            <div class="tech-tags">
                ${project.technologies.map(tech => `<span class="tech-tag">${sanitizeHTML(tech)}</span>`).join('')}
            </div>
        </section>

        <section class="project-features">
            <h2>Key Features</h2>
            ${featuresHTML}
        </section>

        <section class="project-details">
            <h2>Technical Details</h2>
            <p>${sanitizeHTML(project.technicalDetails || 'Technical details coming soon.')}</p>
        </section>
    `;

    document.getElementById('project-content').innerHTML = content;
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', renderProjectDetail);
