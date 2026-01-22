// Portfolio Data
const portfolioData = {
    fullstack: [
        {
            id: 1,
            title: "Turny - Tournament Manager",
            description: "Cryptographically secure tournament application with team registration, automated round progression, and real-time updates. Features abandoned match handling and Redis persistence with Docker deployment.",
            image: "https://opengraph.githubassets.com/1/joegr/turny",
            technologies: ["Flask", "Redis", "Docker", "JavaScript", "HTML", "Gherkin/BDD"],
            github: "https://github.com/joegr/turny",
            demo: "https://github.com/joegr/turny",
            detailPage: "projects/turny.html"
        },
        {
            id: 2,
            title: "Fold - Circuit Card Encryption Generator",
            description: "Interactive circuit card simulator with 3D visualization and encryption algorithm generation. Create custom logic elements, stack circuit layers, and export real Python encryption code based on circuit design.",
            image: "https://opengraph.githubassets.com/1/joegr/fold",
            technologies: ["React", "Flask", "Three.js", "TypeScript", "Python", "AES"],
            github: "https://github.com/joegr/fold",
            demo: "https://github.com/joegr/fold",
            detailPage: "projects/fold.html"
        },
        {
            id: 3,
            title: "Owl - Email CRM",
            description: "Email-based CRM system with contact management, template creation, bulk email sending, and analytics dashboard. Built with Django backend and BDD testing using Gherkin/Cucumber specifications.",
            image: "https://opengraph.githubassets.com/1/joegr/owl",
            technologies: ["Python", "Django", "JavaScript", "HTML", "Gherkin/BDD", "SMTP"],
            github: "https://github.com/joegr/owl",
            demo: "https://github.com/joegr/owl",
            detailPage: "projects/owl.html"
        }
    ],
    datascience: [
        {
            id: 1,
            title: "Elo Garden - LLM from Scratch",
            description: "Complete LLM training infrastructure with custom Transformer architecture, BPE tokenizer, and full training pipeline. Features TensorBoard monitoring, checkpointing, and configurable text generation with temperature/top-k/top-p sampling.",
            image: "https://opengraph.githubassets.com/1/joegr/elo-garden",
            technologies: ["Python", "PyTorch", "Transformers", "BPE Tokenizer", "TensorBoard", "AdamW"],
            github: "https://github.com/joegr/elo-garden/tree/main/services",
            demo: "https://github.com/joegr/elo-garden",
            detailPage: "projects/elo-garden.html"
        },
        {
            id: 2,
            title: "Phonemescape - IPA Analysis Library",
            description: "Comprehensive phoneme analysis library with IPA vowel/consonant visualization, mouth shape similarity calculation, and network graph generation. Features articulatory feature analysis and word phoneme breakdown.",
            image: "https://opengraph.githubassets.com/1/joegr/ipaba",
            technologies: ["Python", "Plotly", "NetworkX", "IPA", "Linguistics", "pip package"],
            github: "https://github.com/joegr/ipaba",
            demo: "https://github.com/joegr/ipaba",
            detailPage: "projects/phonemescape.html"
        },
        {
            id: 3,
            title: "Native Sparse Attention (NSA)",
            description: "CUDA implementation of sparse attention with three-branch architecture: compressed token, selected token, and sliding window branches. Optimized kernels with shared memory utilization.",
            image: "https://opengraph.githubassets.com/1/joegr/native-sparse-attention",
            technologies: ["CUDA", "C", "CMake", "Sparse Attention", "GPU Kernels"],
            github: "https://github.com/joegr/native-sparse-attention",
            demo: "https://github.com/joegr/native-sparse-attention",
            detailPage: "projects/native-sparse-attention.html"
        }
    ],
    dataengineering: [
        {
            id: 1,
            title: "Tower Scraper",
            description: "Python web scraper for extracting and processing tower/infrastructure data. Clean, efficient scraping with modern Python practices.",
            image: "https://opengraph.githubassets.com/1/joegr/63bf28b0fdc9d6823063753e4aee2386",
            technologies: ["Python", "Web Scraping", "BeautifulSoup", "Requests"],
            github: "https://gist.github.com/joegr/63bf28b0fdc9d6823063753e4aee2386",
            demo: "https://gist.github.com/joegr/63bf28b0fdc9d6823063753e4aee2386",
            detailPage: "projects/tower-scraper.html"
        },
        {
            id: 2,
            title: "Vigenère Cipher",
            description: "Cryptographic cipher implementation with random key generation from printable character sets. Demonstrates classical encryption algorithms with modern Python practices.",
            image: "https://opengraph.githubassets.com/1/joegr/37724d7a3c6bf1ad8d1ae5fff67ff7ee",
            technologies: ["Python", "Cryptography", "Classical Ciphers"],
            github: "https://gist.github.com/joegr/37724d7a3c6bf1ad8d1ae5fff67ff7ee",
            demo: "https://gist.github.com/joegr/37724d7a3c6bf1ad8d1ae5fff67ff7ee",
            detailPage: "projects/vigenere-cipher.html"
        }
    ],
    writings: [
        {
            id: 1,
            title: "Alignment Means You Already Messed Up: Ethics in ML",
            excerpt: "And some of our conscious heuristics and unconscious associations are rooted in faculties that have emerged from evolution. For example, as infants grow they begin to build a model of the world informed by these emergent faculties. Pure sense data, differences in light reflections of shaped objects, the arrangement of features like eyes and mouths become: faces of mom, dad, siblings. Before we recognize, our meta-mammal faculty computes: is this a related species? We intuit faces—seeing them where they are not, fashioning our designs of cars and household objects appropriating the recognizable, right-side-up structure of a face. Likewise, objects that grow rapidly in the field of vision, babies react to with fear, without any association to the object itself.",
            date: "",
            url: "https://www.linkedin.com/pulse/alignment-means-you-already-messed-up-ethics-ml-joseph-gruenbaum-fosdc/",
            tags: ["AI Ethics", "Machine Learning", "Alignment"]
        },
        {
            id: 2,
            title: "10 Turing Benchmarks",
            excerpt: "Many orders of magnitude by computational possibility more complex than Chess is Go—but machines are way better than us at this too, both the open source engines and especially reinforcement learning through self-play have resulted in skewed losses that embarrass shaking human hands. We thought this wouldn't fall after Chess; but the optimization core was there. All it took was changing some input parameters and adapting the problem space - see the paper above for details.",
            date: "",
            url: "https://www.linkedin.com/pulse/10-turing-benchmarks-joseph-gruenbaum/",
            tags: ["AI", "Turing Test", "Benchmarks"]
        },
        {
            id: 3,
            title: "The Responsibility to Pretend in AI",
            excerpt: "Classical realists love to imbue anarchy with fatalism, and domestic political squabbles with prescribed apathy. New realists eliminate this fortune-based setup, positing anarchy as a zero-sum vacuum without the proclivities of hubris. This critique is anti-Kantian, and counter to the way many have conceived of international organization post-Fukuyama, but this critique does not explain or predict well the behavior of states in the TikTok era. As states become better at triggering the snap-reactions of the media, manufacturing information and discourse, democracies themselves stand to lose whatever theoretical footing IR theories build for justification, be them institutionalist or normative or both. Why? How would Carr evaluate state behavior and domestic political influence on IR today, in the wild world we live in?",
            date: "",
            url: "https://www.linkedin.com/pulse/responsibility-pretend-ir-ai-joseph-gruenbaum-82pyc/",
            tags: ["AI", "Philosophy", "Responsibility"]
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

    // Render Writings
    const writingsGrid = document.getElementById('writings-grid');
    if (writingsGrid) {
        const validWritings = portfolioData.writings.filter(w => w.title);
        writingsGrid.innerHTML = validWritings.map(article => createArticleCard(article)).join('');
    }
}

// Create Article Card HTML
function createArticleCard(article) {
    const tagsHTML = article.tags.length > 0 
        ? article.tags.map(tag => `<span class="article-tag">${tag}</span>`).join('') 
        : '';
    return `
        <article class="article-card reveal">
            <div class="article-content">
                <div class="article-date">${article.date}</div>
                <h3 class="article-title">${article.title}</h3>
                <p class="article-excerpt">${article.excerpt}</p>
                <div class="article-tags">${tagsHTML}</div>
                <a href="${article.url}" target="_blank" class="article-link">
                    <i class="fab fa-linkedin"></i> Read on LinkedIn
                </a>
            </div>
        </article>
    `;
}

// Create Project Card HTML
function createProjectCard(project) {
    const detailLink = project.detailPage ? `<a href="${project.detailPage}" class="portfolio-link detail-link"><i class="fas fa-info-circle"></i> Details</a>` : '';
    return `
        <div class="portfolio-card reveal">
            <a href="${project.detailPage || project.github}" class="portfolio-image-link">
                <img src="${project.image}" alt="${project.title}" class="portfolio-image">
            </a>
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
                    ${detailLink}
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
