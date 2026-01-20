// Portfolio Data
const portfolioData = {
    fullstack: [
        {
            id: 1,
            title: "Turny - Tournament Manager",
            description: "Cryptographically secure tournament application with team registration, automated round progression, and real-time updates. Features abandoned match handling and Redis persistence with Docker deployment.",
            image: "https://opengraph.githubassets.com/1/joegr/turny",
            technologies: ["Flask", "Redis", "Docker", "JavaScript", "REST API"],
            github: "https://github.com/joegr/turny",
            demo: "https://github.com/joegr/turny"
        },
        {
            id: 2,
            title: "Fold - Circuit Card Encryption Generator",
            description: "Interactive circuit card simulator with 3D visualization and encryption algorithm generation. Create custom logic elements, stack circuit layers, and export real Python encryption code based on circuit design.",
            image: "https://opengraph.githubassets.com/1/joegr/fold",
            technologies: ["React", "Flask", "3D Visualization", "Cryptography", "Python"],
            github: "https://github.com/joegr/fold",
            demo: "https://github.com/joegr/fold"
        },
        {
            id: 3,
            title: "Owl - Email CRM",
            description: "Email-based CRM system with contact management, template creation, bulk email sending, and analytics dashboard. Built with Django backend and BDD testing using Gherkin/Cucumber specifications.",
            image: "https://opengraph.githubassets.com/1/joegr/owl",
            technologies: ["Django", "JavaScript", "REST API", "BDD", "Gherkin", "SMTP"],
            github: "https://github.com/joegr/owl",
            demo: "https://github.com/joegr/owl"
        }
    ],
    datascience: [
        {
            id: 1,
            title: "Elo Garden - LLM from Scratch",
            description: "Complete LLM training infrastructure with custom Transformer architecture, BPE tokenizer, and full training pipeline. Features TensorBoard monitoring, checkpointing, and configurable text generation with temperature/top-k/top-p sampling.",
            image: "https://opengraph.githubassets.com/1/joegr/elo-garden",
            technologies: ["Python", "PyTorch", "Transformers", "BPE Tokenizer", "TensorBoard", "CUDA"],
            github: "https://github.com/joegr/elo-garden/tree/main/services",
            demo: "https://github.com/joegr/elo-garden"
        },
        {
            id: 2,
            title: "Phonemescape - IPA Analysis Library",
            description: "Comprehensive phoneme analysis library with IPA vowel/consonant visualization, mouth shape similarity calculation, and network graph generation. Features articulatory feature analysis and word phoneme breakdown.",
            image: "https://opengraph.githubassets.com/1/joegr/ipaba",
            technologies: ["Python", "Plotly", "NetworkX", "IPA", "Linguistics", "Data Visualization"],
            github: "https://github.com/joegr/ipaba",
            demo: "https://github.com/joegr/ipaba"
        },
        {
            id: 3,
            title: "Native Sparse Attention (NSA)",
            description: "CUDA implementation of sparse attention with three-branch architecture: compressed token, selected token, and sliding window branches. Optimized kernels with shared memory utilization.",
            image: "https://opengraph.githubassets.com/1/joegr/native-sparse-attention",
            technologies: ["CUDA", "C++", "CMake", "Attention Mechanisms", "GPU Optimization"],
            github: "https://github.com/joegr/native-sparse-attention",
            demo: "https://github.com/joegr/native-sparse-attention"
        },
        {
            id: 4,
            title: "DocProc - AI Document Processor",
            description: "Conversational AI web application for extracting and processing information from call logs using GPT-3.5 and LangChain. Features time navigation and automatic fact processing.",
            image: "https://opengraph.githubassets.com/1/joegr/docproc",
            technologies: ["Python", "Flask", "LangChain", "GPT-3.5", "MongoDB", "OpenAI"],
            github: "https://github.com/joegr/docproc",
            demo: "https://github.com/joegr/docproc"
        }
    ],
    dataengineering: [
        {
            id: 1,
            title: "Cloud Data Pipelines",
            description: "Collection of production-ready data pipeline examples featuring Databricks notebooks, Azure Data Factory workflows, and AWS Lambda/Azure Functions for serverless ETL. Includes best practices for orchestration and monitoring.",
            image: "https://via.placeholder.com/400x200/667eea/ffffff?text=Data+Pipelines",
            technologies: ["Databricks", "Azure Data Factory", "AWS Lambda", "Azure Functions", "PySpark", "ETL"],
            github: "https://github.com/joegr",
            demo: "https://github.com/joegr"
        },
        {
            id: 2,
            title: "Vigenère Cipher",
            description: "Cryptographic cipher implementation with random key generation from printable character sets. Demonstrates classical encryption algorithms with modern Python practices.",
            image: "https://opengraph.githubassets.com/1/joegr/37724d7a3c6bf1ad8d1ae5fff67ff7ee",
            technologies: ["Python", "Cryptography", "Security", "Algorithms"],
            github: "https://gist.github.com/joegr/37724d7a3c6bf1ad8d1ae5fff67ff7ee",
            demo: "https://gist.github.com/joegr/37724d7a3c6bf1ad8d1ae5fff67ff7ee"
        }
    ]
};

// DOM Elements
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contact-form');

// Mobile Menu Toggle
mobileMenu.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Render Portfolio Projects
function renderPortfolioProjects() {
    const fullstackGrid = document.getElementById('fullstack-grid');
    const datascienceGrid = document.getElementById('datascience-grid');
    const dataengineeringGrid = document.getElementById('dataengineering-grid');

    // Render Full Stack projects
    if (fullstackGrid) {
        fullstackGrid.innerHTML = portfolioData.fullstack.map(project => createProjectCard(project)).join('');
    }

    // Render Data Science projects
    if (datascienceGrid) {
        datascienceGrid.innerHTML = portfolioData.datascience.map(project => createProjectCard(project)).join('');
    }

    // Render Data Engineering projects
    if (dataengineeringGrid) {
        dataengineeringGrid.innerHTML = portfolioData.dataengineering.map(project => createProjectCard(project)).join('');
    }
}

// Create Project Card HTML
function createProjectCard(project) {
    return `
        <div class="portfolio-card reveal">
            <img src="${project.image}" alt="${project.title}" class="portfolio-image">
            <div class="portfolio-content">
                <h3 class="portfolio-title">${project.title}</h3>
                <p class="portfolio-description">${project.description}</p>
                <div class="portfolio-tech">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="portfolio-links">
                    <a href="${project.github}" target="_blank" class="portfolio-link">
                        <i class="fab fa-github"></i> Code
                    </a>
                    <a href="${project.demo}" target="_blank" class="portfolio-link">
                        <i class="fas fa-external-link-alt"></i> Demo
                    </a>
                </div>
            </div>
        </div>
    `;
}

// Contact Form Handler
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Here you would typically send the data to a server
        // For now, we'll just show a success message
        alert(`Thank you for your message, ${name}! I'll get back to you soon.`);
        contactForm.reset();
    });
}

// Scroll Reveal Animation
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// Navbar scroll effect
function navbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    }
}

// Active navigation link highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    renderPortfolioProjects();
    revealOnScroll();
    navbarScroll();
    updateActiveNavLink();
});

// Event listeners for scroll
window.addEventListener('scroll', () => {
    revealOnScroll();
    navbarScroll();
    updateActiveNavLink();
});

// Add active class styling for navigation
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color) !important;
    }
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// Add typing animation to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 50);
    }
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add hover effect to portfolio cards
document.addEventListener('mouseover', (e) => {
    if (e.target.closest('.portfolio-card')) {
        const card = e.target.closest('.portfolio-card');
        card.style.transform = 'translateY(-10px) scale(1.02)';
    }
});

document.addEventListener('mouseout', (e) => {
    if (e.target.closest('.portfolio-card')) {
        const card = e.target.closest('.portfolio-card');
        card.style.transform = 'translateY(0) scale(1)';
    }
});

// Console welcome message
console.log("Le neant est la vérité !");
