// HTML Sanitization Utility
function sanitizeHTML(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}

function sanitizeURL(url) {
    try {
        const parsed = new URL(url, window.location.origin);
        if (['http:', 'https:'].includes(parsed.protocol)) {
            return parsed.href;
        }
    } catch (e) {}
    return '#';
}

// Project Detail Data - All project information in one place
const projectDetails = {
    futwm: {
        title: "Soccer World Model (futwm)",
        category: "fullstack",
        categoryLabel: "Full Stack / Data Engineering",
        backLink: "../index.html#fullstack",
        github: "https://github.com/joegr/futwm",
        technologies: ["Python", "Flask", "Pydantic", "JavaScript", "Monte Carlo", "JSON Schema", "CSV", "Stochastic Modeling"],
        screenshots: [],
        overview: "Stochastic, world-model-based prediction of soccer events with a formal event ontology and validated interchange formats (JSON / CSV). Includes a Flask dashboard, full-match simulation, and configurable pitch geometry.",
        features: [
            "Event Ontology: Versioned schema (v0.1.0) as single source of truth for all data",
            "Stochastic Transition Model: Phase-conditioned Markov weights with feature modifiers (pressure, distance to goal, goal angle)",
            "Prediction Engine: Top-k next events, beam search over event-type sequences, Monte Carlo rollouts",
            "Match Simulation: Full 90-minute match simulation with possession chains",
            "Pitch Geometry: FIFA-standard 105x68m with zones, areas, pressure index, and spatial helpers",
            "Interchange Formats: Lossless JSON and tabular CSV with strict Pydantic validation",
            "Flask Dashboard: Server-side visualization and analytics interface",
            "JSON Schema Export: Downstream tooling support via exported schema"
        ],
        technicalDetails: "Architecture: ontology.py (enum taxonomy, constraints), schema.py (Pydantic v2 models), interchange.py (JSON/CSV read/write with validation), pitch.py (spatial helpers), world_model.py (mutable PlayerState/BallState/GameState/WorldState), stochastic.py (parametric transition model P(e_{t+1} | world_state_t)), predictor.py (top-k, beam search, Monte Carlo), simulation.py (possession chains, full-match). Languages: Python 77%, JavaScript 16.1%, CSS 4.7%, HTML 2.2%. Uses AdamW-like fitting to observed data, bivariate Gaussian destinations conditioned on phase/zone, and per-event Bernoulli/categorical outcomes."
    },
    fold: {
        title: "Fold - Circuit Card Encryption Generator",
        category: "fullstack",
        categoryLabel: "Full Stack",
        backLink: "../index.html#fullstack",
        github: "https://github.com/joegr/fold",
        technologies: ["React", "Flask", "Three.js", "TypeScript", "Python", "AES Cryptography", "Cython"],
        screenshots: [],
        overview: "Interactive circuit card simulator that generates real, usable encryption algorithms based on your circuit design. Create custom logic elements, stack circuit layers, and export Python encryption code.",
        features: [
            "Create circuit cards with custom logic elements",
            "Stack cards on top of each other with mesh connections",
            "3D visualization of circuit interactions using Three.js",
            "Simulate signal propagation through stacked circuits",
            "Generate real encryption algorithms based on circuit design",
            "Export encryption code in Python format with AES base layer"
        ],
        technicalDetails: "Frontend uses React with Three.js for 3D visualization and TypeScript for type safety. Backend is a Flask REST API with custom encryption algorithm generator. Generated algorithms include key derivation based on circuit structure, data transformation, and permutation operations combined with standard AES."
    },
    owl: {
        title: "Owl - Email CRM",
        category: "fullstack",
        categoryLabel: "Full Stack",
        backLink: "../index.html#fullstack",
        github: "https://github.com/joegr/owl",
        technologies: ["Python", "Django", "JavaScript", "HTML", "CSS", "Gherkin/BDD", "SMTP", "REST API"],
        screenshots: [],
        overview: "Email-based CRM MVP system with contact management, template creation, bulk email sending, and analytics dashboard. Built with behavior-driven development using Gherkin/Cucumber specifications.",
        features: [
            "User authentication (login/logout)",
            "Contact management (add, view, edit, delete)",
            "Email template creation and management",
            "Individual and bulk email sending",
            "Basic email analytics and dashboard metrics",
            "BDD testing with Gherkin specifications",
            "Real email sending via SMTP with App Password support"
        ],
        technicalDetails: "Backend built with Python Django providing RESTful API endpoints. Frontend is simple JavaScript consuming the Django API with responsive design. Features comprehensive BDD testing using Gherkin/Cucumber for requirements documentation and acceptance criteria."
    },
    "elo-garden": {
        title: "Elo Garden - LLM from Scratch",
        category: "datascience",
        categoryLabel: "Data Science",
        backLink: "../index.html#datascience",
        github: "https://github.com/joegr/elo-garden",
        technologies: ["Python", "PyTorch", "Transformers", "BPE Tokenizer", "TensorBoard", "AdamW", "Docker"],
        screenshots: [],
        overview: "Complete LLM training infrastructure built from scratch with custom Transformer architecture, BPE tokenizer, and full training pipeline. Supports text generation with temperature, top-k, and top-p sampling.",
        features: [
            "Custom Transformer Architecture: Multi-head attention, feedforward layers, positional encoding",
            "BPE Tokenizer: Byte-pair encoding trained on custom documents",
            "Training Pipeline: Complete loop with validation, checkpointing, TensorBoard logging",
            "Text Generation: Temperature, top-k, and top-p (nucleus) sampling",
            "Configurable: Easy-to-modify model and training configurations"
        ],
        technicalDetails: "Transformer decoder with causal masking, 6 transformer blocks (configurable), 512 hidden dimensions, 8 attention heads, 2048 feedforward dimensions. Uses AdamW optimizer with learning rate warmup, cross-entropy loss with label smoothing, gradient clipping, and Xavier uniform weight initialization. Sinusoidal positional encodings with layer normalization and residual connections."
    },
    phonemescape: {
        title: "Phonemescape - IPA Analysis Library",
        category: "datascience",
        categoryLabel: "Data Science",
        backLink: "../index.html#datascience",
        github: "https://github.com/joegr/ipaba",
        technologies: ["Python", "Plotly", "NetworkX", "IPA", "Linguistics", "pip package"],
        screenshots: [],
        overview: "Comprehensive phoneme analysis library with IPA vowel/consonant visualization, mouth shape similarity calculation, and network graph generation. Installable via pip.",
        features: [
            "Complete IPA Data: Comprehensive dataset of vowels and consonants with articulatory features",
            "2D Visualization: Beautiful plots of vowel and consonant charts based on standard IPA positions",
            "Mouth Shape Similarity: Calculate similarity between phonemes based on articulatory features",
            "Similarity Networks: Visualize phoneme relationships as network graphs",
            "Word Phoneme Analysis: Analyze words and find similar phonemes",
            "Export Capabilities: Export data in multiple formats"
        ],
        technicalDetails: "Pure Python library (100%) installable via pip. Uses Plotly for interactive 2D visualizations and NetworkX for similarity network graphs. Similarity calculation based on articulatory features and chart proximity. Supports phoneme breakdown and advanced linguistic analysis."
    },
    "native-sparse-attention": {
        title: "Native Sparse Attention (NSA)",
        category: "datascience",
        categoryLabel: "Data Science",
        backLink: "../index.html#datascience",
        github: "https://github.com/joegr/native-sparse-attention",
        technologies: ["CUDA", "C", "CMake", "Sparse Attention", "GPU Kernels", "Shared Memory"],
        screenshots: [],
        overview: "CUDA implementation of sparse attention with three-branch architecture for efficient long-sequence processing. Designed for M3 compatibility with optimized memory access patterns.",
        features: [
            "Compressed Token Branch: Global context through block compression with learnable MLP",
            "Selected Token Branch: Fine-grained selection of important blocks via top-k scores",
            "Sliding Window Branch: Local context preservation with circular buffer",
            "Gating Mechanism: Learned gates combining all three branches",
            "Optimized CUDA Kernels: Efficient memory access, shared memory utilization, warp-level primitives"
        ],
        technicalDetails: "Three-branch attention architecture with configurable block length/stride for compression, selection block size/count, sliding window size, and head dimensions. Requires CUDA Toolkit 11.0+, CMake 3.18+, and C/C++ compiler with C11/C++14 support. Languages: 52.7% CUDA, 43.2% C, 4.1% CMake."
    },
    forge: {
        title: "Forge - MetalNeuralKit M4 Optimizer",
        category: "datascience",
        categoryLabel: "Data Science",
        backLink: "../index.html#datascience",
        github: "https://github.com/joegr/forge",
        technologies: ["Swift", "Metal", "Apple Neural Engine", "MPSGraph", "Float16", "Gherkin/BDD"],
        screenshots: [],
        overview: "Apple M4 Neural Engine optimization library for Metal-based neural networks. Provides custom compute kernels, half-precision Float16 acceleration, MPSGraph integration, and Neural Engine layer support with BDD testing via Gherkin specifications.",
        features: [
            "Half-Precision (Float16): Significant M4 performance gains with configurable precision per layer",
            "Neural Engine Acceleration: Native support for convolution and fully-connected layers via useNeuralEngine flag",
            "Batch Operations: Maximized throughput with batched GPU processing",
            "Persistent Buffers: Minimized CPU-GPU data transfers with shared storage mode",
            "MPSGraph Integration: Automatic operation optimization for M4 architecture",
            "Custom Compute Kernels: Metal shader-based custom operations",
            "Performance Monitoring: Built-in profiling and troubleshooting tools",
            "BDD Testing: Gherkin/Cucumber specifications for behavior-driven development"
        ],
        technicalDetails: "Built in Swift (89.5%) with Gherkin BDD specs (10.5%). Targets Apple M4 architecture with enhanced Neural Engine, optimized GPU cores, high-bandwidth unified memory, and advanced matrix multiplication units. Key classes: M4Optimizer (singleton configurator), ConvolutionLayer, FullyConnectedLayer. Supports storageModeShared persistent buffers and MPSGraph executable compilation for complex tensor operations."
    },
    poo: {
        title: "POO - DAO Governance System",
        category: "fullstack",
        categoryLabel: "Full Stack",
        backLink: "../index.html#fullstack",
        github: "https://github.com/joegr/poo",
        technologies: ["Django", "GraphQL", "Kubernetes", "Docker", "Terraform", "PostgreSQL", "MongoDB", "Neo4j", "InfluxDB", "Redis", "Gherkin/BDD"],
        screenshots: [],
        overview: "Enterprise-scale DAO governance system implementing proposal creation, quadratic voting, and secure treasury management. Features polyglot persistence across five databases with Kubernetes deployment and multi-signature wallet integration.",
        features: [
            "Proposal Lifecycle: Creation, voting, and automated execution",
            "Quadratic Voting: Supermajority requirements for governance decisions",
            "Treasury Management: Secure multi-signature wallet integration",
            "Member Identity Verification: Cryptographic identity layer",
            "Analytics Dashboard: D3.js visualizations with time-series metrics",
            "Polyglot Persistence: PostgreSQL, MongoDB, Neo4j, InfluxDB, Redis",
            "Dual API: GraphQL (Graphene) and REST (DRF) endpoints",
            "Infrastructure: Kubernetes manifests, Docker, Terraform IaC",
            "Security: JWT + MFA, rate limiting, circuit breakers"
        ],
        technicalDetails: "Backend: Django + Django REST Framework + Graphene Django. Frontend: Vanilla JavaScript with D3.js visualizations. Databases: PostgreSQL (relational), MongoDB (proposal content), Neo4j (relationship graphs), InfluxDB (time-series metrics), Redis (caching/message broker). Infrastructure: Kubernetes (k8s/ manifests), Docker, Terraform. Security: JWT authentication, multi-factor auth, rate limiting, circuit breakers for critical operations, multi-sig treasury approval. Languages: Python 71.6%, Gherkin 25.3%, Shell 1.7%, Dockerfile 1.4%."
    },
    span: {
        title: "Span - Blockchain ML Pipeline",
        category: "dataengineering",
        categoryLabel: "Data Engineering",
        backLink: "../index.html#dataengineering",
        github: "https://github.com/joegr/span",
        technologies: ["Python", "Rust", "Solana", "Flask", "Docker", "NLP", "BLIS/ATLAS"],
        screenshots: [],
        overview: "Multi-language blockchain + NLP application combining Python ML text processing with Rust-based Solana smart contract execution. Dockerized microservices architecture with Flask API server and concurrent request handling.",
        features: [
            "NLP Processing: State-of-the-art ML text processing pipeline",
            "Solana Smart Contracts: Rust-based blockchain transaction execution",
            "Flask API Server: RESTful interface on port 5000",
            "Docker Compose Deployment: Single-command multi-service orchestration",
            "Concurrent Request Handling: Async processing for high throughput",
            "Health Checks: Automated 30-second liveness probes with 10-second timeout",
            "Multi-Language: Python (ML/API) + Rust (blockchain/contracts)",
            "BLIS/ATLAS Integration: Optimized linear algebra for ML workloads"
        ],
        technicalDetails: "Languages: Python 67.9%, Rust 11%, PowerShell 10.6%, Shell 8.1%, Dockerfile 2.4%. Services run on ports 5000 (Flask API), 8899, 8900 (Solana). Dependencies: Python (ML/Flask), Rust (Solana smart contracts), BLIS/ATLAS (optimized math), Solana CLI (blockchain interface). Configuration via .env with Docker secrets management. Health checks every 30 seconds with 10-second timeout threshold."
    },
    "vigenere-cipher": {
        title: "Vigenère Cipher",
        category: "dataengineering",
        categoryLabel: "Data Engineering",
        backLink: "../index.html#dataengineering",
        github: "https://gist.github.com/joegr/37724d7a3c6bf1ad8d1ae5fff67ff7ee",
        technologies: ["Python", "Cryptography", "Classical Ciphers", "String Manipulation"],
        screenshots: [],
        overview: "Python implementation of the classical Vigenère cipher with random key generation from printable character sets. Demonstrates polyalphabetic substitution encryption.",
        features: [
            "Vigenère cipher encryption and decryption",
            "Random key generation from printable characters",
            "Clean Python implementation with modern practices",
            "Educational demonstration of classical cryptography"
        ],
        technicalDetails: "Pure Python implementation (vig.py) demonstrating the polyalphabetic substitution cipher invented by Blaise de Vigenère. Uses character shifting based on a repeating key, making it more secure than simple Caesar ciphers."
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
