// ===== GLOBAL VARIABLES =====
let isMenuOpen = false;

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// ===== INITIALIZE APPLICATION =====
function initializeApp() {
    setupNavigationListeners();
    setupScrollEffects();
    setupFormListeners();
    setupAnimations();
    setupNotifications();
}

// ===== NAVIGATION FUNCTIONS =====
function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
        navMenu.classList.add('active');
        hamburger.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    } else {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function setupNavigationListeners() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }

    // Close mobile menu when clicking on navigation links
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) {
                toggleMenu();
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        
        if (isMenuOpen && !navMenu.contains(event.target) && !hamburger.contains(event.target)) {
            toggleMenu();
        }
    });

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== SCROLL EFFECTS =====
function setupScrollEffects() {
    let lastScrollTop = 0;
    const header = document.querySelector('.header');

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Header background change on scroll
        if (scrollTop > 100) {
            header.style.background = 'rgba(102, 126, 234, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            header.style.backdropFilter = 'none';
        }

        // Hide/show header on scroll
        if (scrollTop > lastScrollTop && scrollTop > header.offsetHeight) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.feature-card, .spec-item, .event-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ===== FORM HANDLING =====
function setupFormListeners() {
    // Contact form submission
    const contactForms = document.querySelectorAll('form');
    contactForms.forEach(form => {
        form.addEventListener('submit', handleFormSubmission);
    });

    // Newsletter signup
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSignup);
    }

    // CTA button clicks
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.getAttribute('href') && this.getAttribute('href').startsWith('#')) {
                return; // Let smooth scroll handle it
            }
            
            if (this.getAttribute('href') === 'services.html') {
                return; // Let normal navigation happen
            }
            
            e.preventDefault();
            showNotification('Welcome to Planova! Let\'s plan your perfect event.', 'success');
        });
    });
}

function handleFormSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const formObject = {};
    
    // Convert FormData to object
    for (let [key, value] of formData.entries()) {
        formObject[key] = value;
    }
    
    // Validate form
    if (validateForm(formObject)) {
        // Simulate form submission
        simulateFormSubmission(formObject);
    } else {
        showNotification('Please fill in all required fields.', 'error');
    }
}

function validateForm(formData) {
    const requiredFields = ['name', 'email'];
    
    for (let field of requiredFields) {
        if (!formData[field] || formData[field].trim() === '') {
            return false;
        }
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return false;
    }
    
    return true;
}

function simulateFormSubmission(formData) {
    // Show loading state
    showNotification('Submitting your request...', 'info');
    
    // Simulate API call delay
    setTimeout(() => {
        console.log('Form submitted:', formData);

// main.js - Header and Footer Components for Planova
(function() {
    'use strict';

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initComponents);
    } else {
        initComponents();
    }

    function initComponents() {
        // Create header
        createHeader();
        
        // Create footer
        createFooter();
        
        // Initialize functionality
        initializeEvents();
    }

    function createHeader() {
        const header = document.createElement('header');
        header.className = 'planova-header';
        header.innerHTML = `
            <div class="planova-header-container">
                <a href="index.html" class="planova-logo">
                    <div class="planova-logo-icon">🎉</div>
                    <span>PLANOVA</span>
                </a>
                
                <nav>
                    <ul class="planova-nav-menu">
                        <li><a href="index.html">Home</a></li>
                        <li><a href="services.html">Services</a></li>
                        <li><a href="gallery.html">Gallery</a></li>
                        <li><a href="customer-packages.html">Packages</a></li>
                        <li><a href="about.html">About</a></li>
                        <li><a href="contact.html">Contact</a></li>
                    </ul>
                </nav>
                
                <div class="planova-auth-buttons">
                    <a href="login.html" class="planova-btn planova-btn-outline">Login</a>
                    <a href="register.html" class="planova-btn planova-btn-primary">Register</a>
                </div>
                
                <button class="planova-mobile-toggle" onclick="window.planovaToggleMobileMenu()">
                    ☰
                </button>
            </div>
            
            <div class="planova-mobile-menu" id="planovaMobileMenu">
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="services.html">Services</a></li>
                    <li><a href="gallery.html">Gallery</a></li>
                    <li><a href="customer-packages.html">Packages</a></li>
                    <li><a href="about.html">About</a></li>
                    <li><a href="contact.html">Contact</a></li>
                </ul>
                <div class="planova-mobile-auth">
                    <a href="login.html" class="planova-btn planova-btn-outline">Login</a>
                    <a href="register.html" class="planova-btn planova-btn-primary">Register</a>
                </div>
            </div>
        `;

        // Insert at the beginning of body
        document.body.insertBefore(header, document.body.firstChild);
    }

    function createFooter() {
        const footer = document.createElement('footer');
        footer.className = 'planova-footer';
        footer.innerHTML = `
            <div class="planova-footer-container">
                <div class="planova-footer-content">
                    <div class="planova-footer-section">
                        <h3>Planova</h3>
                        <p>Your trusted partner in creating unforgettable events. We specialize in wedding planning, corporate events, and celebrations of all kinds.</p>
                        <div class="planova-social-links">
                            <a href="#" class="planova-social-link">📘</a>
                            <a href="#" class="planova-social-link">📷</a>
                            <a href="#" class="planova-social-link">🐦</a>
                            <a href="#" class="planova-social-link">💼</a>
                        </div>
                    </div>
                    
                    <div class="planova-footer-section">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><a href="index.html">Home</a></li>
                            <li><a href="about.html">About Us</a></li>
                            <li><a href="services.html">Services</a></li>
                            <li><a href="gallery.html">Gallery</a></li>
                            <li><a href="contact.html">Contact</a></li>
                        </ul>
                    </div>
                    
                    <div class="planova-footer-section">
                        <h3>Services</h3>
                        <ul>
                            <li><a href="services.html#wedding">Wedding Planning</a></li>
                            <li><a href="services.html#corporate">Corporate Events</a></li>
                            <li><a href="services.html#birthday">Birthday Parties</a></li>
                            <li><a href="customer-packages.html">Custom Packages</a></li>
                            <li><a href="services.html#decoration">Event Decoration</a></li>
                        </ul>
                    </div>
                    
                    <div class="planova-footer-section">
                        <h3>Contact Info</h3>
                        <ul>
                            <li>📍 123 Event Street, City, Country</li>
                            <li>📞 +1 (555) 123-4567</li>
                            <li>✉️ info@planova.com</li>
                            <li>🕒 Mon - Fri: 9AM - 6PM</li>
                        </ul>
                    </div>
                </div>
                
                <div class="planova-footer-divider"></div>
                
                <div class="planova-footer-bottom">
                    <div>
                        <p>&copy; 2025 Planova Event Planning. All rights reserved.</p>
                    </div>
                    <div class="planova-footer-links">
                        <a href="privacy.html">Privacy Policy</a>
                        <a href="terms.html">Terms of Service</a>
                        <a href="cookies.html">Cookie Policy</a>
                    </div>
                </div>
            </div>
        `;

        // Append to body
        document.body.appendChild(footer);
    }

    function initializeEvents() {
        // Mobile Menu Toggle Function (Global)
        window.planovaToggleMobileMenu = function() {
            const mobileMenu = document.getElementById('planovaMobileMenu');
            if (mobileMenu) {
                mobileMenu.classList.toggle('active');
            }
        };

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const mobileMenu = document.getElementById('planovaMobileMenu');
            const toggle = document.querySelector('.planova-mobile-toggle');
            
            if (mobileMenu && toggle && 
                !mobileMenu.contains(event.target) && 
                !toggle.contains(event.target)) {
                mobileMenu.classList.remove('active');
            }
        });

        // Active menu highlighting based on current page
        setTimeout(() => {
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            const menuItems = document.querySelectorAll('.planova-nav-menu a, .planova-mobile-menu a');
            
            menuItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === currentPage) {
                    item.classList.add('active');
                }
            });
        }, 100);

        // Smooth scrolling for anchor links
        document.addEventListener('click', function(e) {
            if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = e.target.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    }

})();