/**
 * Projects Infinite Slider
 * Creates a horizontally scrolling infinite loop slider using GSAP
 * Features: responsive design, hover pause, accessibility support, dynamic content loading
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
            dataService: options.dataService || window.projectsDataService,
            ...options
        };
        
        // State
        this.timeline = null;
        this.isInitialized = false;
        this.isPaused = false;
        this.resizeTimeout = null;
        this.projectsData = [];
        
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
    
    async init() {
        try {
            // Check for GSAP availability
            if (typeof gsap === 'undefined') {
                console.warn('⚠️ GSAP not found, Projects Slider disabled');
                return;
            }
            
            // Check for data service
            if (!this.config.dataService) {
                console.warn('⚠️ Projects data service not found, using static content');
                this.initWithStaticContent();
                return;
            }
            
            // Find container
            this.container = document.querySelector(this.config.selector);
            if (!this.container) {
                console.warn('⚠️ Projects container not found');
                return;
            }
            
            // Load projects data and render cards
            await this.loadAndRenderProjects();
            
            // Setup slider
            this.setupSlider();
            this.createAnimation();
            this.bindEvents();
            
            this.isInitialized = true;
            console.log('✅ Projects Slider initialized with dynamic content');
            
        } catch (error) {
            console.error('❌ Error initializing Projects Slider:', error);
            // Fallback to static content
            this.initWithStaticContent();
        }
    }

    /**
     * Load projects data from service and render HTML cards
     */
    async loadAndRenderProjects() {
        try {
            // Load projects data
            this.projectsData = await this.config.dataService.loadProjects();
            
            // Clear existing content
            this.container.innerHTML = '';
            
            // Render project cards
            this.renderProjectCards();
            
            console.log(`✅ Rendered ${this.projectsData.length} project cards`);
            
        } catch (error) {
            console.error('❌ Error loading projects:', error);
            throw error;
        }
    }

    /**
     * Render HTML cards from projects data
     */
    renderProjectCards() {
        const cardsHTML = this.projectsData.map(project => this.createProjectCardHTML(project)).join('');
        this.container.innerHTML = cardsHTML;
        
        // Update originalCards reference
        this.originalCards = Array.from(this.container.querySelectorAll(this.config.cardSelector));
    }

    /**
     * Create HTML for a single project card
     * @param {Object} project - Project data object
     * @returns {string} HTML string for the project card
     */
    createProjectCardHTML(project) {
        const cardContent = `
            <img 
                src="${project.image}" 
                alt="${project.alt || project.title}"
                loading="lazy"
                ${project.translateKeys?.title ? `data-translate-alt="${project.translateKeys.title}"` : ''}
            />
            <figcaption>
                <h3 ${project.translateKeys?.title ? `data-translate="${project.translateKeys.title}"` : ''}>
                    ${project.title}
                </h3>
                <p ${project.translateKeys?.description ? `data-translate="${project.translateKeys.description}"` : ''}>
                    ${project.description}
                </p>
            </figcaption>
        `;

        // If project has a URL, wrap the content in a clickable link
        if (project.url) {
            return `
                <figure class="project-card" data-project-id="${project.id}">
                    <a 
                        href="${project.url}" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        class="project-card-link"
                        aria-label="Ver proyecto: ${project.title}"
                        data-project-url="${project.url}"
                    >
                        ${cardContent}
                    </a>
                </figure>
            `;
        } else {
            // Fallback for projects without URL
            return `
                <figure class="project-card" data-project-id="${project.id}">
                    ${cardContent}
                </figure>
            `;
        }
    }

    /**
     * Fallback initialization with static content (for backwards compatibility)
     */
    initWithStaticContent() {
        try {
            this.container = document.querySelector(this.config.selector);
            if (!this.container) {
                console.warn('⚠️ Projects container not found');
                return;
            }
            
            // Get existing static cards
            this.originalCards = Array.from(this.container.querySelectorAll(this.config.cardSelector));
            if (this.originalCards.length === 0) {
                console.warn('⚠️ No project cards found');
                return;
            }
            
            // Setup slider with static content
            this.setupSlider();
            this.createAnimation();
            this.bindEvents();
            
            this.isInitialized = true;
            console.log('✅ Projects Slider initialized with static content');
            
        } catch (error) {
            console.error('❌ Error initializing with static content:', error);
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
        
        // Handle clicks on project links
        this.setupLinkClickHandlers();
    }

    /**
     * Setup click handlers for project links
     */
    setupLinkClickHandlers() {
        this.allCards.forEach(card => {
            const link = card.querySelector('.project-card-link');
            if (link) {
                // Prevent link navigation during drag
                link.addEventListener('click', this.handleLinkClick.bind(this), true);
                
                // Add keyboard support
                link.addEventListener('keydown', this.handleLinkKeydown.bind(this));
                
                // Add visual feedback
                link.addEventListener('mouseenter', this.handleLinkHover.bind(this));
                link.addEventListener('mouseleave', this.handleLinkLeave.bind(this));
            }
        });
    }

    /**
     * Handle clicks on project links
     * @param {Event} e - Click event
     */
    handleLinkClick(e) {
        if (this.preventClick || this.isDragging) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            return false;
        }
        
        // Allow normal link behavior
        const url = e.currentTarget.getAttribute('href');
        const projectId = e.currentTarget.closest('.project-card').getAttribute('data-project-id');
        
        console.log(`🔗 Opening project: ${projectId} -> ${url}`);
        
        // Optional: Add analytics tracking here
        // trackProjectClick(projectId, url);
    }

    /**
     * Handle keyboard navigation on links
     * @param {KeyboardEvent} e - Keyboard event
     */
    handleLinkKeydown(e) {
        // Allow Enter and Space to activate links
        if (e.key === 'Enter' || e.key === ' ') {
            if (!this.preventClick && !this.isDragging) {
                // Let the browser handle the navigation
                return;
            } else {
                e.preventDefault();
            }
        }
    }

    /**
     * Add hover effect to links
     * @param {Event} e - Mouse enter event
     */
    handleLinkHover(e) {
        if (!this.isDragging) {
            e.currentTarget.classList.add('project-card-hover');
        }
    }

    /**
     * Remove hover effect from links
     * @param {Event} e - Mouse leave event
     */
    handleLinkLeave(e) {
        e.currentTarget.classList.remove('project-card-hover');
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

    /**
     * Refresh slider with updated project data
     * @param {boolean} forceReload - Force reload data from service
     * @returns {Promise<void>}
     */
    async refresh(forceReload = false) {
        if (!this.config.dataService) {
            console.warn('⚠️ No data service available for refresh');
            return;
        }

        try {
            // Force reload data if requested
            if (forceReload) {
                this.config.dataService.isLoaded = false;
            }

            // Pause current animation
            if (this.timeline) {
                this.timeline.pause();
            }

            // Reload and render projects
            await this.loadAndRenderProjects();

            // Recreate slider components
            this.setupSlider();
            this.createAnimation();

            console.log('🔄 Projects Slider refreshed');

        } catch (error) {
            console.error('❌ Error refreshing slider:', error);
        }
    }

    /**
     * Add a new project and refresh the slider
     * @param {Object} project - Project data object
     * @returns {Promise<boolean>} Success status
     */
    async addProject(project) {
        if (!this.config.dataService) {
            console.warn('⚠️ No data service available for adding projects');
            return false;
        }

        const success = this.config.dataService.addProject(project);
        if (success) {
            await this.refresh();
        }
        return success;
    }

    /**
     * Remove a project and refresh the slider
     * @param {string} projectId - Project ID to remove
     * @returns {Promise<boolean>} Success status
     */
    async removeProject(projectId) {
        if (!this.config.dataService) {
            console.warn('⚠️ No data service available for removing projects');
            return false;
        }

        const success = this.config.dataService.removeProject(projectId);
        if (success) {
            await this.refresh();
        }
        return success;
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
