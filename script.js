// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced navbar background and scroll effects
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrollY = window.scrollY;
    
    if (scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 5px 25px rgba(139, 69, 19, 0.1)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
        navbar.style.backdropFilter = 'blur(20px)';
    }
});

// Active navigation link highlighting with proper section detection
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNavLink() {
    let current = '';
    const scrollPosition = window.scrollY + 100; // Offset for better detection
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Enhanced Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.skill-item, .project-card, .about-text, .about-image, .stat');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });

    // Initialize scroll to top button
    createScrollToTop();
    
    // Initialize typing animation
    initTypingAnimation();
    
    // Initialize floating elements animation
    initFloatingElements();
    
    // Initialize parallax effects
    initParallaxEffects();
});

// Typing animation for hero title
function initTypingAnimation() {
    const titleName = document.querySelector('.title-name');
    if (titleName) {
        const originalText = titleName.textContent;
        titleName.textContent = '';
        
        let i = 0;
        const typeSpeed = 150;
        
        function type() {
            if (i < originalText.length) {
                titleName.textContent += originalText.charAt(i);
                i++;
                setTimeout(type, typeSpeed);
            }
        }
        
        // Start typing after a short delay
        setTimeout(type, 1000);
    }
}

// Enhanced floating elements animation
function initFloatingElements() {
    const floatingShapes = document.querySelectorAll('.floating-shape');
    
    floatingShapes.forEach((shape, index) => {
        // Add random movement
        setInterval(() => {
            const randomX = (Math.random() - 0.5) * 20;
            const randomY = (Math.random() - 0.5) * 20;
            const randomRotation = (Math.random() - 0.5) * 20;
            
            shape.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotation}deg)`;
        }, 3000 + index * 1000);
    });
}

// Parallax effects for different sections
function initParallaxEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero::before, .about::before, .skills::before');
        
        parallaxElements.forEach((element, index) => {
            const speed = scrolled * (0.3 + index * 0.1);
            element.style.transform = `translateY(${speed}px)`;
        });
    });
}

// Form submission handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const subject = contactForm.querySelectorAll('input[type="text"]')[1].value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        
        setTimeout(() => {
            showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
        }, 2000);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Enhanced skill items hover effect
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-10px) scale(1.05)';
        item.style.boxShadow = '0 15px 30px rgba(139, 69, 19, 0.2)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) scale(1)';
        item.style.boxShadow = 'none';
    });
});

// Enhanced project cards 3D tilt effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// Scroll to top functionality
function createScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add smooth reveal animation for sections
function revealOnScroll() {
    const reveals = document.querySelectorAll('.section-header, .about-content, .skills-grid, .projects-grid, .contact-content');
    
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('reveal');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Add reveal class styles
const style = document.createElement('style');
style.textContent = `
    .reveal {
        opacity: 1 !important;
        transform: translateY(0) !important;
        transition: all 0.8s ease !important;
    }
    
    .section-header,
    .about-content,
    .skills-grid,
    .projects-grid,
    .contact-content {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.8s ease;
    }
`;
document.head.appendChild(style);

// Enhanced button hover effects
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translateY(0) scale(1)';
    });
});

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    updateActiveNavLink();
    revealOnScroll();
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Add focus management for accessibility
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('focus', () => {
        link.style.outline = '2px solid #d2691e';
        link.style.outlineOffset = '2px';
    });
    
    link.addEventListener('blur', () => {
        link.style.outline = 'none';
    });
});

// Project Modal Functionality
const projectData = {
    'multilingual-chatbot': {
        title: 'Multilingual RAG-Powered ChatBot',
        description: 'Developed an advanced Retrieval-Augmented Generation (RAG) system that enables intelligent document querying across multiple languages (English, Hindi, Bengali, Chinese). The system combines state-of-the-art NLP techniques to deliver accurate, context-aware responses from large document repositories.\n\nKey Features:\n~ Implemented hybrid search architecture combining vector similarity (FAISS) with keyword matching for optimal retrieval accuracy\n~ Integrated Google Gemma-2B for LLM-powered reranking and answer generation\n~ Utilized BAAI/bge-m3 multilingual embeddings for cross-language document understanding\n~ Designed efficient resource management system with automatic cleanup and memory optimization\n~ Built complete training pipeline for document indexing and processing with Tessaract OCR\n\nTechnical Pipeline:\nQuery → Embedding Generation → Vector Search (MMR) → Keyword Search → Deduplication → LLM Reranking → Answer Generation\n\nPerformance Optimizations:\n~ Reduced memory footprint through batch processing and singleton pattern implementation\n~ Achieved 30-second query response time with CPU-based inference\n~ Implemented efficient tensor operations and model caching for scalability',
        tech: ['RAG', 'NLP', 'FAISS', 'Python', 'LangChain', 'TensorFlow'],
        icon: 'fas fa-robot',
        github: 'https://github.com/riwadesai/Multilingual_ChatBot',
        demo: null,
        images: [
            {
                src: 'images/bengali-extracted-data.png',
                caption: 'Bengali extracted data'
            },
            {
                src: 'images/hindi-extracted-data.png',
                caption: 'Hindi extracted data'
            },
            {
                src: 'images/chinese-extracted-data.png',
                caption: 'Chinese extracted data'
            },
            {
                src: 'images/qna-example.png',
                caption: 'QnA example'
            }
        ]
    },
    'pacman': {
        title: 'Deep Convolutional Q-Learning for Pac-Man',
        description: 'Implemented a DQN approach combining reinforcement learning with deep learning to teach an agent to play Pac-Man. The model uses CNNs to process visual input, Q-learning for strategic decision-making, experience replay for learning stability, and target networks to avoid Q-value oscillations. The agent learns optimal strategies to maximize cumulative rewards.',
        tech: ['Deep Q-Networks', 'CNN', 'Reinforcement Learning', 'TensorFlow', 'Python'],
        icon: 'fas fa-gamepad',
        github: 'https://github.com/riwadesai/Deep-Convolutional-Q-Learning-for-Pac-Man',
        demo: null,
        video: {
            src: 'images/video (3).mp4',
            caption: 'Pac-Man DQN Demo'
        }
    },
    'lunar-lander': {
        title: 'Lunar Lander using Deep Q-Learning',
        description: 'Developed an AI agent that learns to land a spacecraft safely on the moon by interacting with a simulated environment. Implemented Deep Q-Network (DQN) with epsilon-greedy policy for exploration-exploitation balance and experience replay for efficient learning. After training over thousands of episodes, the agent consistently achieves smooth landings with scores well above target.',
        tech: ['Deep Q-Learning', 'DQN', 'Reinforcement Learning', 'Python', 'OpenAI Gym'],
        icon: 'fas fa-rocket',
        github: 'https://github.com/riwadesai/Lunar-Lander-using-DQN',
        demo: null,
        video: {
            src: 'images/video.mp4',
            caption: 'Lunar Lander DQN Demo'
        }
    },
    'fraud-detection': {
        title: 'Credit Card Fraud Detection',
        description: 'Developed and implemented a machine learning model to identify fraudulent credit card transactions using a dataset of transaction records. Successfully improved model accuracy and minimized false positives, enhancing the reliability of fraud detection. Demonstrated strong ability to handle and analyze large datasets using TensorFlow, Keras, and PySpark.',
        tech: ['Machine Learning', 'TensorFlow', 'Keras', 'PySpark', 'Data Analysis'],
        icon: 'fas fa-shield-alt',
        github: 'https://github.com/riwadesai/Credit-card-fraud-detection',
        demo: null
    },
    'securities': {
        title: 'Study of Undervalued Securities',
        description: 'Comprehensively analyzed Aarti Industries Ltd. using quantitative methods, regression analysis, and machine learning for stock predictions. Performed detailed financial analysis using P/E ratio, P/B ratio, and other valuation metrics. Developed ML models to predict stock price movements and formulated investment strategies to identify undervalued securities.',
        tech: ['Machine Learning', 'Financial Analysis', 'Quantitative Analytics', 'Python', 'Regression Analysis'],
        icon: 'fas fa-chart-line',
        github: null,
        demo: null
    },
    'cognitive-distortions': {
        title: 'Data Analysis on Cognitive Distortions',
        description: 'Explored connection between cognitive distortions and social media using machine learning. Gathered social media data from Twitter, Facebook, and Instagram using APIs. Implemented classification models (SVM, Random Forests, Neural Networks) and sentiment analysis to identify and categorize cognitive distortions. Developed predictive models to identify users at risk based on social media activity.',
        tech: ['Machine Learning', 'NLP', 'Sentiment Analysis', 'Scikit-learn', 'TensorFlow'],
        icon: 'fas fa-brain',
        github: null,
        demo: null
    },
    'galois-aes': {
        title: 'Galois Fields in AES Encryption',
        description: 'Demonstrated how Galois theory is used in the arithmetic of finite fields, which is fundamental to the Advanced Encryption Standard (AES). Implemented finite field arithmetic operations (addition, multiplication, inversion) used in AES. Showed how these operations are derived and supported by the properties of Galois fields, particularly GF(2^8) for AES. Used Galois theory to simulate and defend against algebraic attacks on block ciphers. Implemented algebraic attacks that exploit the structure of the Galois field used in the cipher. Proposed modifications or defences based on the theoretical insights from Galois theory.',
        tech: ['Computer Security', 'Cryptography', 'Galois Theory', 'AES', 'Finite Fields'],
        icon: 'fas fa-shield-alt',
        github: null,
        demo: null
    }
};

const modal = document.getElementById('projectModal');
const modalTitle = document.querySelector('.modal-title');
const modalDescription = document.querySelector('.modal-description');
const modalTech = document.querySelector('.modal-tech');
const modalLinks = document.querySelector('.modal-links');
const modalImagesGallery = document.querySelector('.modal-images-gallery');
const modalClose = document.querySelector('.modal-close');
const modalOverlay = document.querySelector('.modal-overlay');

// Lightbox elements
const lightbox = document.getElementById('imageLightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const lightboxCaption = document.querySelector('.lightbox-caption');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxOverlay = document.querySelector('.lightbox-overlay');

// Open modal function
function openModal(projectId) {
    const project = projectData[projectId];
    if (!project) return;

    // Update modal content
    modalTitle.textContent = project.title;
    
    // Format description with line breaks
    modalDescription.innerHTML = project.description.replace(/\n/g, '<br>');
    
    // Update images gallery
    modalImagesGallery.innerHTML = '';
    
    // Handle video first
    if (project.video) {
        const videoContainer = document.createElement('div');
        videoContainer.className = 'modal-video-item';
        videoContainer.innerHTML = `
            <div class="modal-video-wrapper">
                <video controls>
                    <source src="${project.video.src}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </div>
            <p class="modal-video-caption">${project.video.caption}</p>
        `;
        modalImagesGallery.appendChild(videoContainer);
    }
    
    // Handle images
    if (project.images && project.images.length > 0) {
        project.images.forEach(image => {
            const imageContainer = document.createElement('div');
            imageContainer.className = 'modal-image-item';
            imageContainer.innerHTML = `
                <div class="modal-image-wrapper">
                    <img src="${image.src}" alt="${image.caption}" onerror="this.style.display='none'" data-src="${image.src}" data-caption="${image.caption}">
                </div>
                <p class="modal-image-caption">${image.caption}</p>
            `;
            // Add click handler to expand image
            const img = imageContainer.querySelector('img');
            img.style.cursor = 'pointer';
            img.addEventListener('click', () => {
                openLightbox(image.src, image.caption);
            });
            modalImagesGallery.appendChild(imageContainer);
        });
    }
    
    // Fallback to icon if no video and no images
    if (!project.video && (!project.images || project.images.length === 0)) {
        modalImagesGallery.innerHTML = `
            <div class="project-placeholder">
                <i class="${project.icon}"></i>
            </div>
        `;
    }
    
    // Update tech tags
    modalTech.innerHTML = project.tech.map(tech => 
        `<span class="tech-tag">${tech}</span>`
    ).join('');
    
    // Update links
    modalLinks.innerHTML = '';
    if (project.github) {
        const githubLink = document.createElement('a');
        githubLink.href = project.github;
        githubLink.target = '_blank';
        githubLink.innerHTML = '<i class="fab fa-github"></i>';
        modalLinks.appendChild(githubLink);
    }
    if (project.demo) {
        const demoLink = document.createElement('a');
        demoLink.href = project.demo;
        demoLink.target = '_blank';
        demoLink.innerHTML = '<i class="fas fa-external-link-alt"></i>';
        modalLinks.appendChild(demoLink);
    }
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close modal function
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Open lightbox function
function openLightbox(imageSrc, caption) {
    lightboxImage.src = imageSrc;
    lightboxCaption.textContent = caption;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close lightbox function
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

// Lightbox event handlers
lightboxClose.addEventListener('click', closeLightbox);
lightboxOverlay.addEventListener('click', closeLightbox);

// Close lightbox on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
    }
});

// Add click handlers to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', (e) => {
        // Don't open modal if clicking on links
        if (e.target.closest('.project-link')) {
            return;
        }
        const projectId = card.getAttribute('data-project');
        if (projectId) {
            openModal(projectId);
        }
    });
    
    // Add cursor pointer style
    card.style.cursor = 'pointer';
});

// Close modal handlers
modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

console.log('Portfolio website loaded successfully! 🚀');