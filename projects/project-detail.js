// Project Detail Data - All project information in one place
const projectDetails = {
    turny: {
        title: "Turny - Tournament Manager",
        category: "fullstack",
        categoryLabel: "Full Stack",
        backLink: "../index.html#fullstack",
        github: "https://github.com/joegr/turny",
        technologies: ["Flask", "Redis", "Docker", "JavaScript", "HTML", "Gherkin/BDD", "REST API"],
        screenshots: [],
        overview: "A minimal, cryptographically secure tournament application for participation in any type of tournament. Features time-based deterministic round progression with real-time updates and complete containerized deployment.",
        features: [
            "Team Registration: Captains register teams with minimal data (username + team name)",
            "Tournament Automation: Time-based deterministic round progression",
            "Abandoned Match Handling: Timed-out matches result in losses for both teams",
            "Real-time Updates: Frontend polls for state changes every 5 seconds",
            "Redis Persistence: All tournament data stored in Redis",
            "Docker Wrapped: Complete containerized deployment"
        ],
        technicalDetails: "Backend built with Flask + Redis. Frontend uses vanilla JavaScript with no frameworks. Deployed via Docker + Docker Compose. Round duration is configurable (default 5 minutes per round)."
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
    docproc: {
        title: "DocProc - AI Document Processor",
        category: "datascience",
        categoryLabel: "Data Science",
        backLink: "../index.html#datascience",
        github: "https://github.com/joegr/docproc",
        technologies: ["Python", "Flask", "OpenAI GPT-3.5", "PyMongo", "MongoDB", "JavaScript", "HTML", "REST API"],
        screenshots: [],
        overview: "Conversational AI web application for extracting and processing information from call logs. Uses GPT-3.5 for document processing with time navigation and automatic fact extraction.",
        features: [
            "Question and Answer Screen: Displays questions and extracted answers with time navigation",
            "Document Addition Screen: Add new call logs and set questions for processing",
            "Automatic Fact Processing: Extracts relevant facts and handles contradictions",
            "REST API Endpoints: Submit questions/documents and retrieve processed facts",
            "Temporal Data Consistency: Prioritizes accuracy in time-based information"
        ],
        technicalDetails: "Built with Flask (Python web framework) and PyMongo for MongoDB interaction. Uses OpenAI GPT-3.5 for intelligent document processing. API endpoints: POST /submit_question_and_documents, GET /get_question_and_facts. Languages: 52.8% HTML, 31.4% Python, 15.8% JavaScript."
    },
    "tower-scraper": {
        title: "Tower Scraper",
        category: "dataengineering",
        categoryLabel: "Data Engineering",
        backLink: "../index.html#dataengineering",
        github: "https://gist.github.com/joegr/63bf28b0fdc9d6823063753e4aee2386",
        technologies: ["Python", "Web Scraping", "BeautifulSoup", "Requests", "Data Extraction"],
        screenshots: [],
        overview: "Python web scraper for extracting and processing tower/infrastructure data. Demonstrates clean scraping patterns with modern Python practices.",
        features: [
            "Efficient web scraping with Python",
            "Data extraction and parsing",
            "Clean, readable implementation",
            "Modern Python practices"
        ],
        technicalDetails: "Pure Python implementation (towerscraper.py) for web data extraction. Uses standard Python libraries for HTTP requests and HTML parsing."
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
                <img src="${src}" alt="${project.title} Screenshot" loading="lazy">
            </div>
        `).join('')
        : '<p class="placeholder-text">Screenshots coming soon</p>';

    const featuresHTML = project.features.length > 0
        ? `<ul>${project.features.map(f => `<li>${f}</li>`).join('')}</ul>`
        : '<ul><li>Features to be added</li></ul>';

    const content = `
        <div class="project-header">
            <a href="${project.backLink}" class="back-link"><i class="fas fa-arrow-left"></i> Back to Portfolio</a>
            <h1>${project.title}</h1>
            <div class="project-meta">
                <span class="category-badge ${project.category}">${project.categoryLabel}</span>
                <a href="${project.github}" class="github-link" target="_blank">
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
            <p>${project.overview || 'Project overview coming soon.'}</p>
        </section>

        <section class="project-tech">
            <h2>Technologies</h2>
            <div class="tech-tags">
                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
        </section>

        <section class="project-features">
            <h2>Key Features</h2>
            ${featuresHTML}
        </section>

        <section class="project-details">
            <h2>Technical Details</h2>
            <p>${project.technicalDetails || 'Technical details coming soon.'}</p>
        </section>
    `;

    document.getElementById('project-content').innerHTML = content;
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', renderProjectDetail);
