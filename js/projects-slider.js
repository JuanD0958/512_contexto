/**
 * Projects Infinite Slider
 * Creates a horizontally scrolling infinite loop slider using GSAP
 * Features: responsive design, hover pause, accessibility support
 */
class ProjectsSlider {
    constructor(options = {}) {
        // Configuration
        this.config = {
            selector: '.projects-grid',
            cardSelector: '.project-card',
            speed: options.speed || 30, // seconds for one complete loop
            pauseOnHover: options.pauseOnHover !== false,
            pauseOnFocus: options.pauseOnFocus !== false,
            ...options
        };
        
        // State
        this.timeline = null;
        this.isInitialized = false;
        this.isPaused = false;
        this.resizeTimeout = null;
        
        // Elements
        this.container = null;
        this.originalCards = [];
        this.allCards = [];
        
        this.init();
    }
    
    init() {
        try {
            // Check for GSAP availability
            if (typeof gsap === 'undefined') {
                console.warn('⚠️ GSAP not found, Projects Slider disabled');
                return;
            }
            
            // Find container
            this.container = document.querySelector(this.config.selector);
            if (!this.container) {
                console.warn('⚠️ Projects container not found');
                return;
            }
            
            // Get original cards
            this.originalCards = Array.from(this.container.querySelectorAll(this.config.cardSelector));
            if (this.originalCards.length === 0) {
                console.warn('⚠️ No project cards found');
                return;
            }
            
            // Setup slider
            this.setupSlider();
            this.createAnimation();
            this.bindEvents();
            
            this.isInitialized = true;
            console.log('✅ Projects Slider initialized');
            
        } catch (error) {
            console.error('❌ Error initializing Projects Slider:', error);
        }
    }
    
    setupSlider() {
        // Clone cards for infinite effect
        this.cloneCards();
        
        // Set initial positioning
        this.container.style.transform = 'translateX(0)';
        
        // Ensure accessibility
        this.setupAccessibility();
    }
    
    cloneCards() {
        // Clone original cards and append them
        this.originalCards.forEach(card => {
            const clone = card.cloneNode(true);
            clone.setAttribute('aria-hidden', 'true'); // Hide from screen readers
            this.container.appendChild(clone);
        });
        
        // Update all cards reference
        this.allCards = Array.from(this.container.querySelectorAll(this.config.cardSelector));
    }
    
    setupAccessibility() {
        // Add proper ARIA labels
        this.container.setAttribute('role', 'region');
        this.container.setAttribute('aria-label', 'Projects gallery');
        
        // Ensure images have proper alt text
        this.allCards.forEach(card => {
            const img = card.querySelector('img');
            if (img && !img.getAttribute('alt')) {
                const title = card.querySelector('h3');
                if (title) {
                    img.setAttribute('alt', title.textContent);
                }
            }
        });
    }
    
    createAnimation() {
        // Calculate dimensions
        const { totalWidth, duration } = this.calculateDimensions();
        
        // Kill existing timeline
        if (this.timeline) {
            this.timeline.kill();
        }
        
        // Create GSAP timeline for infinite loop
        this.timeline = gsap.timeline({ 
            repeat: -1, 
            ease: 'none'
        });
        
        // Animate container to move left by half the total width
        // This creates the seamless loop effect
        this.timeline.to(this.container, {
            x: -totalWidth / 2,
            duration: duration,
            ease: 'none'
        });
        
        console.log(`🎬 Animation created - Width: ${totalWidth}px, Duration: ${duration}s`);
    }
    
    calculateDimensions() {
        // Get container and card dimensions
        const containerRect = this.container.getBoundingClientRect();
        const cardWidth = this.originalCards[0]?.getBoundingClientRect().width || 300;
        const gap = parseFloat(getComputedStyle(this.container).gap) || 32;
        
        // Calculate total width of original cards + gaps
        const originalWidth = (cardWidth * this.originalCards.length) + (gap * (this.originalCards.length - 1));
        
        // Total width is double (original + cloned)
        const totalWidth = originalWidth * 2;
        
        // Calculate duration based on speed setting
        const duration = this.config.speed;
        
        return { totalWidth, duration, originalWidth };
    }
    
    bindEvents() {
        // Hover pause/resume
        if (this.config.pauseOnHover) {
            this.allCards.forEach(card => {
                card.addEventListener('mouseenter', () => this.pause());
                card.addEventListener('mouseleave', () => this.resume());
            });
        }
        
        // Focus pause/resume for accessibility
        if (this.config.pauseOnFocus) {
            this.allCards.forEach(card => {
                const focusableElements = card.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
                focusableElements.forEach(element => {
                    element.addEventListener('focus', () => this.pause());
                    element.addEventListener('blur', () => this.resume());
                });
            });
        }
        
        // Window resize handling with debouncing
        window.addEventListener('resize', () => {
            clearTimeout(this.resizeTimeout);
            this.resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 250);
        });
        
        // Reduced motion support
        this.handleReducedMotion();
    }
    
    handleResize() {
        if (!this.isInitialized) return;
        
        try {
            // Recreate animation with new dimensions
            this.createAnimation();
            console.log('📐 Slider resized and animation updated');
        } catch (error) {
            console.error('❌ Error handling resize:', error);
        }
    }
    
    handleReducedMotion() {
        // Respect user's motion preferences
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion && this.timeline) {
            this.timeline.pause();
            console.log('⏸️ Animation paused due to reduced motion preference');
        }
    }
    
    pause() {
        if (this.timeline && !this.isPaused) {
            this.timeline.pause();
            this.isPaused = true;
        }
    }
    
    resume() {
        if (this.timeline && this.isPaused) {
            this.timeline.resume();
            this.isPaused = false;
        }
    }
    
    // Public methods for external control
    setSpeed(speed) {
        this.config.speed = speed;
        this.createAnimation();
    }
    
    destroy() {
        if (this.timeline) {
            this.timeline.kill();
        }
        
        // Remove cloned cards
        const clonedCards = this.container.querySelectorAll(this.config.cardSelector + '[aria-hidden="true"]');
        clonedCards.forEach(card => card.remove());
        
        // Reset container
        this.container.style.transform = '';
        
        // Clear event listeners
        window.removeEventListener('resize', this.handleResize);
        
        this.isInitialized = false;
        console.log('🗑️ Projects Slider destroyed');
    }
    
    // Static method for easy initialization
    static init(options = {}) {
        return new ProjectsSlider(options);
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProjectsSlider;
} else {
    window.ProjectsSlider = ProjectsSlider;
}
