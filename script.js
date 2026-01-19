// Portfolio Data
const portfolioData = {
    fullstack: [
        {
            id: 1,
            title: "E-Commerce Platform",
            description: "Full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, payment processing, and admin dashboard.",
            image: "https://via.placeholder.com/400x200/667eea/ffffff?text=E-Commerce",
            technologies: ["React", "Node.js", "MongoDB", "Stripe", "JWT"],
            github: "https://github.com/yourusername/ecommerce-platform",
            demo: "https://ecommerce-demo.com"
        },
        {
            id: 2,
            title: "Task Management App",
            description: "Collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
            image: "https://via.placeholder.com/400x200/764ba2/ffffff?text=Task+Manager",
            technologies: ["Vue.js", "Express", "PostgreSQL", "Socket.io"],
            github: "https://github.com/yourusername/task-manager",
            demo: "https://task-manager-demo.com"
        },
        {
            id: 3,
            title: "Social Media Dashboard",
            description: "Analytics dashboard for social media management with data visualization, scheduling, and multi-platform integration.",
            image: "https://via.placeholder.com/400x200/f093fb/ffffff?text=Analytics",
            technologies: ["Angular", "Python", "Redis", "D3.js"],
            github: "https://github.com/yourusername/social-dashboard",
            demo: "https://social-dashboard-demo.com"
        }
    ],
    datascience: [
        {
            id: 1,
            title: "Customer Churn Prediction",
            description: "Machine learning model to predict customer churn with 85% accuracy. Includes data preprocessing, feature engineering, and model deployment.",
            image: "https://via.placeholder.com/400x200/667eea/ffffff?text=Churn+Prediction",
            technologies: ["Python", "Scikit-learn", "Pandas", "Flask", "Docker"],
            github: "https://github.com/yourusername/churn-prediction",
            demo: "https://churn-prediction-demo.com"
        },
        {
            id: 2,
            title: "Sentiment Analysis Tool",
            description: "Real-time sentiment analysis for social media data using NLP techniques and deep learning models.",
            image: "https://via.placeholder.com/400x200/764ba2/ffffff?text=Sentiment+Analysis",
            technologies: ["Python", "NLTK", "TensorFlow", "React", "FastAPI"],
            github: "https://github.com/yourusername/sentiment-analysis",
            demo: "https://sentiment-analysis-demo.com"
        },
        {
            id: 3,
            title: "Sales Forecasting System",
            description: "Time series forecasting system for sales prediction using ARIMA, LSTM, and ensemble methods.",
            image: "https://via.placeholder.com/400x200/f093fb/ffffff?text=Sales+Forecast",
            technologies: ["Python", "Prophet", "LSTM", "Plotly", "Streamlit"],
            github: "https://github.com/yourusername/sales-forecasting",
            demo: "https://sales-forecasting-demo.com"
        }
    ],
    dataengineering: [
        {
            id: 1,
            title: "Real-time Data Pipeline",
            description: "Apache Kafka-based real-time data pipeline for processing streaming data with Spark and Elasticsearch.",
            image: "https://via.placeholder.com/400x200/667eea/ffffff?text=Data+Pipeline",
            technologies: ["Apache Kafka", "Spark", "Elasticsearch", "Docker", "Kubernetes"],
            github: "https://github.com/yourusername/realtime-pipeline",
            demo: "https://pipeline-demo.com"
        },
        {
            id: 2,
            title: "ETL Automation Framework",
            description: "Scalable ETL framework for data warehouse automation with Airflow and dbt for data transformation.",
            image: "https://via.placeholder.com/400x200/764ba2/ffffff?text=ETL+Framework",
            technologies: ["Airflow", "dbt", "Snowflake", "Python", "Docker"],
            github: "https://github.com/yourusername/etl-framework",
            demo: "https://etl-framework-demo.com"
        },
        {
            id: 3,
            title: "Data Lake Architecture",
            description: "Enterprise data lake solution with AWS S3, Glue, and Athena for big data analytics and reporting.",
            image: "https://via.placeholder.com/400x200/f093fb/ffffff?text=Data+Lake",
            technologies: ["AWS S3", "Glue", "Athena", "Lambda", "Terraform"],
            github: "https://github.com/yourusername/data-lake",
            demo: "https://data-lake-demo.com"
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
console.log('%c🚀 Welcome to my portfolio!', 'font-size: 20px; color: #667eea; font-weight: bold;');
console.log('%cFeel free to explore my projects and get in touch!', 'font-size: 14px; color: #764ba2;');
