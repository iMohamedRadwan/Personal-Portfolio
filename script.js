// Dark mode toggle
document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('dark-mode-toggle');
    const themeIcon = document.getElementById('theme-icon');

    // Function to update the icon
    function updateIcon() {
        if (document.body.classList.contains('dark-mode')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }

    // Load user preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        updateIcon();
    }

    toggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        updateIcon();
    });
});


// Enhanced Typing animation
function initTypeEffect() {
    const typingText = document.querySelector('.typing-text');
    const texts = ['Creating Digital Excellence', 'Building Modern Websites', 'Solving Problems'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    // Set fixed height to prevent layout shift
    typingText.style.height = '1.5em';
    typingText.style.display = 'block';
    typingText.style.position = 'relative';
    typingText.style.margin = '1rem 0';

    function typeText() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500; // Pause before next word
        }

        setTimeout(typeText, typeSpeed);
    }

    typeText();
}

// Initialize typing effect after DOM load
document.addEventListener('DOMContentLoaded', initTypeEffect);

// Mobile menu toggle
const menuButton = document.querySelector('.menu-btn');
const navigationLinks = document.querySelector('.nav-links');
const pageSections = document.querySelectorAll('section');
const navigationItems = document.querySelectorAll('.nav-link');

menuButton.addEventListener('click', () => {
    menuButton.classList.toggle('active');
    navigationLinks.classList.toggle('active');
});


// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px"
};

const appearOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        entry.target.style.transform = 'translateY(0)';
        entry.target.style.opacity = 1;
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.project-card, .skill-item, section').forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(20px)';
    appearOnScroll.observe(el);
});

// Enhance form interaction
const formInputs = document.querySelectorAll('input, textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
});

// Add particle background effect
function createParticles() {
    const particles = document.createElement('div');
    particles.className = 'particles';
    document.body.appendChild(particles);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.setProperty('--x', `${Math.random() * 100}vw`);
        particle.style.setProperty('--y', `${Math.random() * 100}vh`);
        particle.style.setProperty('--delay', `${Math.random() * 5}s`);
        particles.appendChild(particle);
    }
}

createParticles();

// Add scroll progress indicator
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.transform = `scaleX(${scrolled / 100})`;
});

// Parallax effect for hero section
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    document.querySelector('.glowing-circle').style.transform = 
        `translate(${mouseX * 50}px, ${mouseY * 50}px)`;
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Add scroll reveal animations
const revealElements = document.querySelectorAll('.reveal');

function reveal() {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', reveal);

// Add the reveal class to elements you want to animate
document.querySelectorAll('section, .project-card, .skill-item').forEach(el => {
    el.classList.add('reveal');
});

// Update project card hover effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 30;  // Reduced rotation for smoother effect
        const rotateY = (centerX - x) / 30;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        card.style.transition = 'all 0.6s var(--hover-timing)';
    });
});

// Add random delay to skill items
document.querySelectorAll('.skill-item').forEach((item, index) => {
    item.style.setProperty('--delay', index);
});

// Add initial page load animation
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('fade-in');
    
    // Add smooth transitions for theme changes
    const elements = document.querySelectorAll('*');
    elements.forEach(element => {
        element.style.transition = `
            background-color 0.3s ease,
            color 0.3s ease,
            border-color 0.3s ease,
            box-shadow 0.3s ease,
            transform 0.3s ease
        `;
    });
});

// Add animation for social links on scroll
const socialLinks = document.querySelectorAll('.social-link');
let delay = 0;

const socialObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `fadeInUp 0.8s ease forwards ${delay}s`;
            delay += 0.15;
        }
    });
});

socialLinks.forEach(link => {
    socialObserver.observe(link);
});

// Update the active link highlighting
window.addEventListener('scroll', () => {
    let current = '';
    
    pageSections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navigationItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add image loading handler
function handleImageLoading() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Add loading class
        img.classList.add('loading');
        
        // Add loading blur effect
        const loadingBlur = document.createElement('div');
        loadingBlur.className = 'loading-blur';
        img.parentElement.appendChild(loadingBlur);
        
        img.onload = () => {
            img.classList.remove('loading');
            loadingBlur.remove();
        };
        
        img.onerror = () => {
            // Replace with fallback image if loading fails
            img.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
            img.classList.remove('loading');
            loadingBlur.remove();
        };
    });
}

document.addEventListener('DOMContentLoaded', handleImageLoading);

// Simple form handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const name = this.querySelector('[name="from_name"]').value;
            const email = this.querySelector('[name="reply_to"]').value;
            const message = this.querySelector('[name="message"]').value;

            // Basic validation
            if (!name || !email || !message) {
                alert('Please fill all fields');
                return;
            }

            // Show success message
            alert('Message sent successfully!');
            
            // Clear form
            this.reset();
        });
    }
}); 