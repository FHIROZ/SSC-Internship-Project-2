
// Global variables
let currentUser = null;
let eventRegistrations = [];
let volunteerSignups = [];
let enrollments = [];

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Initialize website functionality
function initializeWebsite() {
    setupScrollEffects();
    setupHeaderScroll();
    setupMobileMenu();
    setupSmoothScrolling();
    setupFormHandlers();
    loadUserData();
}

// Header scroll effect
function setupHeaderScroll() {
    window.addEventListener('scroll', function() {
        const header = document.getElementById('header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Mobile menu functionality
function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    navLinks.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            navLinks.classList.remove('active');
        }
    });
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Scroll animations
function setupScrollEffects() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Form handlers
function setupFormHandlers() {
    // Join form
    document.getElementById('joinForm').addEventListener('submit', handleJoinForm);
    
    // Contact form
    document.getElementById('contactForm').addEventListener('submit', handleContactForm);
    
    // Newsletter form
    document.getElementById('newsletterForm').addEventListener('submit', handleNewsletterForm);
}

// Modal functions
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modals when clicking outside
window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Form submission handlers
async function handleJoinForm(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    showLoading('joinMessage');
    
    // Simulate API call
    setTimeout(() => {
        currentUser = data;
        saveUserData();
        showSuccess('joinMessage', 'Welcome to SSC! Check your email for next steps.');
        setTimeout(() => closeModal('joinModal'), 2000);
    }, 1500);
}

async function handleContactForm(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    showLoading('contactMessage');
    
    // Simulate API call
    setTimeout(() => {
        showSuccess('contactMessage', 'Message sent successfully! We\'ll get back to you soon.');
        e.target.reset();
        setTimeout(() => closeModal('contactModal'), 2000);
    }, 1500);
}

async function handleNewsletterForm(e) {
    e.preventDefault();
    const email = document.getElementById('newsletterEmail').value;
    
    showLoading('newsletterMessage');
    
    // Simulate API call
    setTimeout(() => {
        showSuccess('newsletterMessage', 'Successfully subscribed to our newsletter!');
        document.getElementById('newsletterEmail').value = '';
    }, 1000);
}

// Event registration
function registerEvent(eventName) {
    if (!currentUser) {
        alert('Please join SSC first to register for events!');
        openModal('joinModal');
        return;
    }

    const registration = {
        event: eventName,
        user: currentUser.email,
        date: new Date().toISOString(),
        id: Date.now()
    };

    eventRegistrations.push(registration);
    saveUserData();
    
    alert(`Successfully registered for ${eventName}! Check your email for details.`);
}

// Volunteer signup
function volunteerSignup(initiative) {
    if (!currentUser) {
        alert('Please join SSC first to volunteer!');
        openModal('joinModal');
        return;
    }

    const signup = {
        initiative: initiative,
        user: currentUser.email,
        date: new Date().toISOString(),
        id: Date.now()
    };

    volunteerSignups.push(signup);
    saveUserData();
    
    alert(`Thank you for volunteering for ${initiative}! We'll contact you with details.`);
}

// Service enrollment
function enrollService(service) {
    if (!currentUser) {
        alert('Please join SSC first to enroll in services!');
        openModal('joinModal');
        return;
    }

    const enrollment = {
        service: service,
        user: currentUser.email,
        date: new Date().toISOString(),
        id: Date.now()
    };

    enrollments.push(enrollment);
    saveUserData();
    closeModal(service.toLowerCase().replace(' ', '') + 'Modal');
    
    alert(`Successfully enrolled in ${service}! Check your email for access details.`);
}

// Workshop registration
function registerWorkshop() {
    if (!currentUser) {
        alert('Please join SSC first to register for workshops!');
        openModal('joinModal');
        return;
    }

    alert('Workshop registration successful! You\'ll receive an email with all workshop details.');
    closeModal('workshopModal');
}

// Utility functions
function showLoading(elementId) {
    const element = document.getElementById(elementId);
    element.innerHTML = '<div class="loading"></div> Processing...';
    element.className = '';
}

function showSuccess(elementId, message) {
    const element = document.getElementById(elementId);
    element.innerHTML = message;
    element.className = 'success-message';
}

function showError(elementId, message) {
    const element = document.getElementById(elementId);
    element.innerHTML = message;
    element.className = 'error-message';
}

// Data persistence (using memory since localStorage is not available)
function saveUserData() {
    // In a real application, this would save to a backend
    console.log('User data saved:', {
        user: currentUser,
        registrations: eventRegistrations,
        volunteers: volunteerSignups,
        enrollments: enrollments
    });
}

function loadUserData() {
    // In a real application, this would load from a backend
    console.log('Loading user data...');
}

// Analytics and tracking
function trackUserAction(action, details) {
    console.log('User Action:', action, details);
    // In a real application, this would send to analytics service
}

// Dynamic content loading
function loadDynamicContent() {
    // Simulate loading latest events
    const events = [
        { name: 'Microsoft Visit', date: '2025-08-15', status: 'upcoming' },
        { name: 'GDG Event', date: '2025-08-22', status: 'upcoming' },
        { name: 'Tech Workshop', date: '2025-08-10', status: 'registration-open' }
    ];

    // Update event cards with real-time data
    console.log('Events loaded:', events);
}

// Search functionality
function searchContent(query) {
    const content = document.body.innerText.toLowerCase();
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionText = section.innerText.toLowerCase();
        if (sectionText.includes(query.toLowerCase())) {
            section.style.display = 'block';
            // Highlight matching content
            highlightText(section, query);
        } else {
            section.style.display = 'none';
        }
    });
}

function highlightText(element, query) {
    // Simple text highlighting
    const walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );

    const textNodes = [];
    let node;
    while (node = walker.nextNode()) {
        textNodes.push(node);
    }

    textNodes.forEach(textNode => {
        const text = textNode.textContent;
        const regex = new RegExp(`(${query})`, 'gi');
        if (regex.test(text)) {
            const highlightedText = text.replace(regex, '<mark>$1</mark>');
            const span = document.createElement('span');
            span.innerHTML = highlightedText;
            textNode.parentNode.replaceChild(span, textNode);
        }
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
        border-radius: 5px;
        z-index: 3000;
        animation: slideInRight 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Auto-save form data
function autoSaveForm(formId) {
    const form = document.getElementById(formId);
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            // Save to memory (in real app, would use localStorage or backend)
            console.log(`Auto-saving ${formId}:`, data);
        });
    });
}

// Initialize auto-save for forms
document.addEventListener('DOMContentLoaded', function() {
    autoSaveForm('joinForm');
    autoSaveForm('contactForm');
});

// Accessibility improvements
function setupAccessibility() {
    // Add keyboard navigation for modals
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openModals = document.querySelectorAll('.modal[style*="block"]');
            openModals.forEach(modal => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }
    });

    // Focus management for modals
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('show', function() {
            const firstInput = modal.querySelector('input, button, textarea, select');
            if (firstInput) firstInput.focus();
        });
    });
}

// Call setup functions
setupAccessibility();
loadDynamicContent();

// Performance monitoring
function monitorPerformance() {
    // Monitor page load time
    window.addEventListener('load', function() {
        const loadTime = performance.now();
        console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
        trackUserAction('page_load', { loadTime: loadTime });
    });

    // Monitor user interactions
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn')) {
            trackUserAction('button_click', { button: e.target.textContent });
        }
    });
}

monitorPerformance();

// Progressive Web App features
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // In a real app, you would register a service worker here
        console.log('Service Worker support detected');
    });
}

// Add some interactive animations
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Dynamic year update
document.querySelector('footer p').innerHTML = 
    `&copy; ${new Date().getFullYear()} Student Service Community. All rights reserved.`;

console.log('SSC Website fully initialized and ready!');

//----------------------------

function filterMentors(field) {
    const cards = document.querySelectorAll('.mentor-card');
    cards.forEach(card => {
      const category = card.getAttribute('data-field');
      card.style.display = (field === 'all' || category === field) ? 'block' : 'none';
    });
  }
