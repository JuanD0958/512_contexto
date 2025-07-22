/**
 * Navigation Module
 * Handles mobile navigation toggle and smooth scrolling
 */
class Navigation {
    constructor() {
        this.navToggle = document.getElementById('nav-toggle');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.navbar = document.querySelector('.navbar');
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.setupScrollSpy();
    }
    
    bindEvents() {
        // Mobile navigation toggle
        if (this.navToggle) {
            this.navToggle.addEventListener('click', () => this.toggleMobileMenu());
        }
        
        // Close mobile menu when clicking on links
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
                this.handleSmoothScroll(link);
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navbar.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
        
        // Handle scroll for navbar styling
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
    
    toggleMobileMenu() {
        if (!this.navMenu || !this.navToggle) return;
        
        const isActive = this.navMenu.classList.contains('active');
        
        if (isActive) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }
    
    openMobileMenu() {
        this.navMenu?.classList.add('active');
        this.navToggle?.classList.add('active');
        this.navToggle?.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }
    
    closeMobileMenu() {
        this.navMenu?.classList.remove('active');
        this.navToggle?.classList.remove('active');
        this.navToggle?.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
    
    handleSmoothScroll(link) {
        const href = link.getAttribute('href');
        if (!href || !href.startsWith('#')) return;
        
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            // Use Lenis smooth scroll if available, otherwise fallback
            if (window.lenis) {
                window.lenis.scrollTo(targetElement, {
                    offset: -80, // Account for fixed navbar
                    duration: 1.5
                });
            } else {
                // Fallback smooth scroll
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    }
    
    handleScroll() {
        if (!this.navbar) return;
        
        const scrolled = window.scrollY > 50;
        this.navbar.classList.toggle('scrolled', scrolled);
    }
    
    setupScrollSpy() {
        // Simple scroll spy for active nav links
        const sections = document.querySelectorAll('section[id]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.updateActiveNavLink(entry.target.id);
                }
            });
        }, {
            rootMargin: '-80px 0px -60% 0px'
        });
        
        sections.forEach(section => observer.observe(section));
    }
    
    updateActiveNavLink(activeId) {
        this.navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${activeId}`) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
}

// Export for module usage, or create global if not using modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Navigation;
} else {
    window.Navigation = Navigation;
}
