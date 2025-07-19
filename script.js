// Cinco Doce Website JavaScript
// Minimal and purposeful interactivity

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // Language Selector Functionality
    const langBtn = document.getElementById('lang-btn');
    const langDropdown = document.getElementById('lang-dropdown');
    const langOptions = document.querySelectorAll('.lang-option');

    if (langBtn && langDropdown) {
        // Toggle dropdown on button click
        langBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const isActive = langBtn.classList.contains('active');
            langBtn.classList.toggle('active', !isActive);
            langDropdown.classList.toggle('active', !isActive);
        });

        // Handle language selection
        langOptions.forEach(option => {
            option.addEventListener('click', function(e) {
                e.stopPropagation();
                const selectedLang = this.getAttribute('data-lang');
                
                // Update button display
                const flag = this.querySelector('.lang-flag').textContent;
                const code = selectedLang.toUpperCase();
                
                langBtn.querySelector('.lang-flag').textContent = flag;
                langBtn.querySelector('.lang-code').textContent = code;
                
                // Update active state
                langOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
                
                // Close dropdown
                langBtn.classList.remove('active');
                langDropdown.classList.remove('active');
                
                // Store selection in localStorage
                localStorage.setItem('selectedLanguage', selectedLang);
                
                // Update document language attribute
                document.documentElement.lang = selectedLang;
                
                console.log(`Language changed to: ${selectedLang}`);
                
                // Future: Implement actual translation functionality
                // This is where you would call translation functions
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(event) {
            if (!langBtn.contains(event.target) && !langDropdown.contains(event.target)) {
                langBtn.classList.remove('active');
                langDropdown.classList.remove('active');
            }
        });

        // Initialize with saved language
        const savedLang = localStorage.getItem('selectedLanguage') || 'es';
        const savedOption = document.querySelector(`[data-lang="${savedLang}"]`);
        if (savedOption) {
            savedOption.click();
        }
    }

    // Smooth scrolling for internal links (fallback for older browsers)
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        function updateNavbar() {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        }

        window.addEventListener('scroll', updateNavbar);
        updateNavbar(); // Initial call
    }

    // Lazy loading fallback for older browsers
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // Simple fade-in animation for project cards
    if ('IntersectionObserver' in window) {
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Initialize cards with hidden state
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            cardObserver.observe(card);
        });
    }

    // Contact button analytics (placeholder for future implementation)
    const contactButtons = document.querySelectorAll('.contact-card[href]');
    contactButtons.forEach(button => {
        button.addEventListener('click', function() {
            const contactType = this.classList.contains('whatsapp') ? 'WhatsApp' : 'Instagram';
            console.log(`Contact clicked: ${contactType}`);
            
            // Future: Add analytics tracking here
            // Example: gtag('event', 'contact_click', { method: contactType });
        });
    });

    // Performance: Preload critical resources
    function preloadCriticalResources() {
        const criticalImages = [
            'images/casa-madera.webp',
            'images/fachada-luz.webp'
        ];

        criticalImages.forEach(imageSrc => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = imageSrc;
            document.head.appendChild(link);
        });
    }

    // Call preload after page load
    window.addEventListener('load', preloadCriticalResources);

    // Error handling for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.warn(`Failed to load image: ${this.src}`);
            // Future: Add fallback image or placeholder
        });
    });

    // Simple form validation (for future contact forms)
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Export functions for potential future use
    window.CincoDoce = {
        validateEmail,
        // Future functions can be added here
    };
});

// Service Worker registration (for future PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Future: Register service worker for offline capabilities
        console.log('Service Worker support detected - ready for future PWA implementation');
    });
}

// Performance monitoring (basic)
window.addEventListener('load', function() {
    if ('performance' in window) {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log(`Page load time: ${perfData.loadEventEnd - perfData.loadEventStart}ms`);
            
            // Future: Send performance data to analytics
        }, 0);
    }
});
