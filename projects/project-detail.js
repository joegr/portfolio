// Project Detail Data - All project information in one place
const projectDetails = {
    turny: {
        title: "Turny - Tournament Manager",
        category: "fullstack",
        categoryLabel: "Full Stack",
        backLink: "../index.html#fullstack",
        github: "https://github.com/joegr/turny",
        technologies: ["Flask", "Redis", "Docker", "JavaScript", "REST API"],
        screenshots: [
            "../assets/screenshots/Screenshot 2025-12-29 at 2.32.46 PM.png",
            "../assets/screenshots/Screenshot 2026-01-06 at 1.44.25 PM.png",
            "../assets/screenshots/Screenshot 2026-01-06 at 1.44.37 PM.png",
            "../assets/screenshots/Screenshot 2026-01-06 at 1.44.48 PM.png"
        ],
        overview: "",
        features: [],
        technicalDetails: ""
    },
    fold: {
        title: "Fold - Circuit Card Encryption Generator",
        category: "fullstack",
        categoryLabel: "Full Stack",
        backLink: "../index.html#fullstack",
        github: "https://github.com/joegr/fold",
        technologies: ["React", "Flask", "3D Visualization", "Cryptography", "Python"],
        screenshots: [],
        overview: "",
        features: [],
        technicalDetails: ""
    },
    owl: {
        title: "Owl - Email CRM",
        category: "fullstack",
        categoryLabel: "Full Stack",
        backLink: "../index.html#fullstack",
        github: "https://github.com/joegr/owl",
        technologies: ["Django", "JavaScript", "REST API", "BDD", "Gherkin", "SMTP"],
        screenshots: [],
        overview: "",
        features: [],
        technicalDetails: ""
    },
    "elo-garden": {
        title: "Elo Garden - LLM from Scratch",
        category: "datascience",
        categoryLabel: "Data Science",
        backLink: "../index.html#datascience",
        github: "https://github.com/joegr/elo-garden",
        technologies: ["Python", "PyTorch", "Transformers", "BPE Tokenizer", "TensorBoard", "CUDA"],
        screenshots: [],
        overview: "",
        features: [],
        technicalDetails: ""
    },
    phonemescape: {
        title: "Phonemescape - IPA Analysis Library",
        category: "datascience",
        categoryLabel: "Data Science",
        backLink: "../index.html#datascience",
        github: "https://github.com/joegr/ipaba",
        technologies: ["Python", "Plotly", "NetworkX", "IPA", "Linguistics", "Data Visualization"],
        screenshots: [],
        overview: "",
        features: [],
        technicalDetails: ""
    },
    "native-sparse-attention": {
        title: "Native Sparse Attention (NSA)",
        category: "datascience",
        categoryLabel: "Data Science",
        backLink: "../index.html#datascience",
        github: "https://github.com/joegr/native-sparse-attention",
        technologies: ["CUDA", "C++", "CMake", "Attention Mechanisms", "GPU Optimization"],
        screenshots: [],
        overview: "",
        features: [],
        technicalDetails: ""
    },
    docproc: {
        title: "DocProc - AI Document Processor",
        category: "datascience",
        categoryLabel: "Data Science",
        backLink: "../index.html#datascience",
        github: "https://github.com/joegr/docproc",
        technologies: ["Python", "Flask", "LangChain", "GPT-3.5", "MongoDB", "OpenAI"],
        screenshots: [],
        overview: "",
        features: [],
        technicalDetails: ""
    },
    "cloud-data-pipelines": {
        title: "Cloud Data Pipelines",
        category: "dataengineering",
        categoryLabel: "Data Engineering",
        backLink: "../index.html#dataengineering",
        github: "https://github.com/joegr",
        technologies: ["Databricks", "Azure Data Factory", "AWS Lambda", "Azure Functions", "PySpark", "ETL"],
        screenshots: [],
        overview: "",
        features: [],
        technicalDetails: ""
    },
    "vigenere-cipher": {
        title: "Vigenère Cipher",
        category: "dataengineering",
        categoryLabel: "Data Engineering",
        backLink: "../index.html#dataengineering",
        github: "https://gist.github.com/joegr/37724d7a3c6bf1ad8d1ae5fff67ff7ee",
        technologies: ["Python", "Cryptography", "Security", "Algorithms"],
        screenshots: [],
        overview: "",
        features: [],
        technicalDetails: ""
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
