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
            dragEnabled: options.dragEnabled !== false,
            momentumDuration: options.momentumDuration || 1.2,
            dragThreshold: options.dragThreshold || 5, // minimum pixels to consider it a drag vs click
            ...options
        };
        
        // State
        this.timeline = null;
        this.isInitialized = false;
        this.isPaused = false;
        this.resizeTimeout = null;
        
        // Drag state
        this.isDragging = false;
        this.isPointerDown = false;
        this.startX = 0;
        this.startY = 0;
        this.currentX = 0;
        this.dragOffset = 0;
        this.lastDragTime = 0;
        this.dragVelocity = 0;
        this.preventClick = false;
        this.resumeTimeout = null;
        
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
        
        // Setup drag functionality
        if (this.config.dragEnabled) {
            this.setupDragHandlers();
        }
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
    
    setupDragHandlers() {
        // Prevent default dragging behavior on images
        this.allCards.forEach(card => {
            const img = card.querySelector('img');
            if (img) {
                img.addEventListener('dragstart', e => e.preventDefault());
            }
        });
        
        // Mouse events
        this.container.addEventListener('mousedown', this.handlePointerStart.bind(this));
        document.addEventListener('mousemove', this.handlePointerMove.bind(this));
        document.addEventListener('mouseup', this.handlePointerEnd.bind(this));
        
        // Touch events
        this.container.addEventListener('touchstart', this.handlePointerStart.bind(this), { passive: false });
        document.addEventListener('touchmove', this.handlePointerMove.bind(this), { passive: false });
        document.addEventListener('touchend', this.handlePointerEnd.bind(this));
        
        // Prevent context menu on long press
        this.container.addEventListener('contextmenu', e => {
            if (this.isDragging) {
                e.preventDefault();
            }
        });
        
        // Prevent click events during/after dragging
        this.allCards.forEach(card => {
            card.addEventListener('click', this.handleCardClick.bind(this), true);
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
    
    // Drag handling methods
    handlePointerStart(e) {
        // Only handle left mouse button or touch
        if (e.type === 'mousedown' && e.button !== 0) return;
        
        const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
        const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
        
        this.isPointerDown = true;
        this.startX = clientX;
        this.startY = clientY;
        this.currentX = clientX;
        this.dragOffset = 0;
        this.lastDragTime = Date.now();
        this.dragVelocity = 0;
        this.preventClick = false;
        
        // Clear any pending resume timeout
        if (this.resumeTimeout) {
            clearTimeout(this.resumeTimeout);
            this.resumeTimeout = null;
        }
        
        // Add dragging class for CSS styling
        this.container.classList.add('is-dragging');
        
        // Prevent text selection
        document.body.style.userSelect = 'none';
        
        e.preventDefault();
    }
    
    handlePointerMove(e) {
        if (!this.isPointerDown) return;
        
        const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
        const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
        
        const deltaX = clientX - this.startX;
        const deltaY = clientY - this.startY;
        
        // Check if this is a drag gesture (moved beyond threshold)
        if (!this.isDragging && (Math.abs(deltaX) > this.config.dragThreshold || Math.abs(deltaY) > this.config.dragThreshold)) {
            // For horizontal dragging, require more horizontal than vertical movement
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                this.isDragging = true;
                this.preventClick = true;
                
                // Pause the timeline
                if (this.timeline) {
                    this.timeline.pause();
                }
                
                console.log('🖱️ Drag started');
            } else {
                // Vertical movement, cancel drag
                this.handlePointerEnd(e);
                return;
            }
        }
        
        if (this.isDragging) {
            const previousX = this.currentX;
            this.currentX = clientX;
            this.dragOffset = deltaX;
            
            // Calculate velocity for momentum
            const now = Date.now();
            const timeDelta = now - this.lastDragTime;
            if (timeDelta > 0) {
                this.dragVelocity = (clientX - previousX) / timeDelta;
            }
            this.lastDragTime = now;
            
            // Apply the drag transform
            this.applyDragTransform();
            
            e.preventDefault();
        }
    }
    
    handlePointerEnd(e) {
        if (!this.isPointerDown) return;
        
        this.isPointerDown = false;
        
        // Remove dragging class
        this.container.classList.remove('is-dragging');
        
        // Restore text selection
        document.body.style.userSelect = '';
        
        if (this.isDragging) {
            this.isDragging = false;
            
            // Apply momentum if there's significant velocity
            this.applyMomentum();
            
            // Resume auto-scroll after a delay
            this.resumeTimeout = setTimeout(() => {
                this.resumeAutoScroll();
            }, 500);
            
            console.log('🖱️ Drag ended');
        }
        
        // Reset prevent click after a short delay
        setTimeout(() => {
            this.preventClick = false;
        }, 10);
    }
    
    handleCardClick(e) {
        if (this.preventClick) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
        }
    }
    
    applyDragTransform() {
        if (!this.container || !this.timeline) return;
        
        // Get current timeline progress and calculate base transform
        const progress = this.timeline.progress();
        const { totalWidth } = this.calculateDimensions();
        const baseOffset = -totalWidth / 2 * progress;
        
        // Apply both auto-scroll offset and manual drag offset
        const totalOffset = baseOffset + this.dragOffset;
        
        gsap.set(this.container, { x: totalOffset });
    }
    
    applyMomentum() {
        if (!this.container || Math.abs(this.dragVelocity) < 0.1) return;
        
        // Apply momentum using GSAP
        const momentumDistance = this.dragVelocity * 200; // Adjust multiplier as needed
        const currentTransform = gsap.getProperty(this.container, 'x');
        
        gsap.to(this.container, {
            x: currentTransform + momentumDistance,
            duration: this.config.momentumDuration,
            ease: 'power2.out'
        });
    }
    
    resumeAutoScroll() {
        if (!this.timeline) return;
        
        // Get current position and calculate where we should be in the timeline
        const currentX = gsap.getProperty(this.container, 'x');
        const { totalWidth } = this.calculateDimensions();
        
        // Calculate progress based on current position
        const progress = Math.abs(currentX) / (totalWidth / 2);
        const normalizedProgress = progress % 1; // Keep within 0-1 range
        
        // Set timeline to correct position and resume
        this.timeline.progress(normalizedProgress);
        this.timeline.resume();
        
        console.log('▶️ Auto-scroll resumed');
    }
    
    pause() {
        if (this.timeline && !this.isPaused && !this.isDragging) {
            this.timeline.pause();
            this.isPaused = true;
        }
    }
    
    resume() {
        if (this.timeline && this.isPaused && !this.isDragging) {
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
        
        // Clear timeouts
        if (this.resumeTimeout) {
            clearTimeout(this.resumeTimeout);
        }
        
        // Remove drag event listeners
        if (this.config.dragEnabled) {
            this.container.removeEventListener('mousedown', this.handlePointerStart);
            document.removeEventListener('mousemove', this.handlePointerMove);
            document.removeEventListener('mouseup', this.handlePointerEnd);
            this.container.removeEventListener('touchstart', this.handlePointerStart);
            document.removeEventListener('touchmove', this.handlePointerMove);
            document.removeEventListener('touchend', this.handlePointerEnd);
            this.container.removeEventListener('contextmenu', this.handlePointerEnd);
        }
        
        // Remove cloned cards
        const clonedCards = this.container.querySelectorAll(this.config.cardSelector + '[aria-hidden="true"]');
        clonedCards.forEach(card => card.remove());
        
        // Reset container
        this.container.style.transform = '';
        this.container.classList.remove('is-dragging');
        
        // Clear event listeners
        window.removeEventListener('resize', this.handleResize);
        
        // Restore text selection
        document.body.style.userSelect = '';
        
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
