/**
 * Main Application Controller
 * Clean, modern JavaScript implementation with professional naming
 */

class ArchitectureApp {
    constructor() {
        this.initialized = false;
        this.activeSlideIndex = 0;
        this.sliderInstances = [];
        this.scrollThrottled = false;
    }

    // Initialize the application
    init() {
        if (this.initialized) return;

        console.log('🏗️ Initializing Architecture App...');

        // Feature detection
        this.detectBrowserFeatures();

        // Initialize navigation system
        this.initNavigationSystem();

        // Initialize slider components
        this.initSliderComponents();

        // Initialize scroll effects
        this.initScrollEffects();

        // Initialize interactive elements
        this.initInteractiveElements();

        // Initialize form handlers
        this.initFormHandlers();

        // Initialize mobile navigation
        this.initMobileNavigation();

        // Initialize particles system
        this.initParticleSystem();

        // Initialize dynamic projects
        this.initProjectsSection();

        // Initialize process section
        this.initProcessSection();

        this.initialized = true;
        console.log('✅ Architecture app initialized successfully');
    }

    // Detect browser capabilities
    detectBrowserFeatures() {
        const capabilities = {
            touchSupport: 'ontouchstart' in window,
            isMobileDevice: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
            prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
            supportsIntersectionObserver: 'IntersectionObserver' in window,
            supportsCSSSGrid: CSS.supports('display', 'grid')
        };

        Object.keys(capabilities).forEach(capability => {
            if (capabilities[capability]) {
                document.body.classList.add(`supports-${capability.replace(/([A-Z])/g, '-$1').toLowerCase()}`);
            }
        });

        console.log('🔍 Browser capabilities detected:', capabilities);
    }

    // Navigation system management
    initNavigationSystem() {
        // Smooth scrolling for internal links
        const navigationLinks = document.querySelectorAll('a[href^="#"]');
        navigationLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href');
                
                // Special handling for process link - let browser handle it natively if JavaScript fails
                if (targetId === '#process') {
                    console.log('Process link clicked, attempting smooth scroll...');
                    
                    // Try JavaScript smooth scroll first
                    try {
                        e.preventDefault();
                        this.smoothScrollToSection(targetId);
                    } catch (error) {
                        console.warn('JavaScript smooth scroll failed, using native navigation:', error);
                        // Don't prevent default, let browser handle it natively
                        return true;
                    }
                } else {
                    // Standard smooth scroll for other links
                    e.preventDefault();
                    this.smoothScrollToSection(targetId);
                }
            });
        });

        // Initialize scroll spy navigation
        this.initScrollSpyNavigation();

        // Initialize sticky navigation behavior
        this.initStickyNavigationBehavior();
    }

    // Smooth scroll implementation
    smoothScrollToSection(targetSelector) {
        const targetElement = document.querySelector(targetSelector);
        if (!targetElement) return;

        // Special handling for the process section due to ScrollTrigger pinning
        if (targetSelector === '#process') {
            console.log('Navigating to process section...');
            
            // Simple, reliable scroll to process section
            const processSection = document.querySelector('#process');
            if (processSection) {
                // Get the actual position of the element
                const rect = processSection.getBoundingClientRect();
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const targetPosition = scrollTop + rect.top - 80; // Header offset
                
                console.log('Process section position:', targetPosition);
                
                // Use the most reliable scroll method
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                return;
            }
        }

        // Standard smooth scroll for other sections
        const offsetPosition = targetElement.offsetTop - 80; // Header offset
        
        console.log(`Navigating to ${targetSelector}, position:`, offsetPosition);
        
        // Use native smooth scrolling first (modern browsers)
        if ('scrollBehavior' in document.documentElement.style) {
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        } else if (window.gsap && window.gsap.plugins && window.gsap.plugins.ScrollToPlugin) {
            // Use GSAP ScrollTo plugin if available
            window.gsap.to(window, {
                duration: 1,
                scrollTo: {y: offsetPosition, autoKill: false},
                ease: "power2.inOut"
            });
        } else if (window.gsap) {
            // Fallback with GSAP animation
            const startPosition = window.pageYOffset;
            window.gsap.to({}, {
                duration: 1,
                ease: "power2.inOut",
                onUpdate: function() {
                    const progress = this.progress();
                    const currentPosition = startPosition + (offsetPosition - startPosition) * progress;
                    window.scrollTo(0, currentPosition);
                }
            });
        } else {
            // Fallback for browsers without GSAP
            this.animateScrollPosition(window.pageYOffset, offsetPosition, 800);
        }
    }

    // Custom scroll animation fallback
    animateScrollPosition(startPosition, endPosition, duration) {
        const startTime = performance.now();
        const positionChange = endPosition - startPosition;

        const animateFrame = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Smooth easing function
            const easeInOut = progress < 0.5 
                ? 2 * progress * progress 
                : -1 + (4 - 2 * progress) * progress;
            
            window.scrollTo(0, startPosition + positionChange * easeInOut);
            
            if (progress < 1) {
                requestAnimationFrame(animateFrame);
            }
        };

        requestAnimationFrame(animateFrame);
    }

    // Scroll spy for active navigation states
    initScrollSpyNavigation() {
        const sections = document.querySelectorAll('[id]');
        const navigationLinks = document.querySelectorAll('a[href^="#"]');

        if (sections.length === 0) return;

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    
                    navigationLinks.forEach(link => {
                        link.classList.remove('navigation-active', 'current-page');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('navigation-active', 'current-page');
                        }
                    });
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '-80px 0px -80px 0px'
        });

        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }

    // Sticky navigation behavior
    initStickyNavigationBehavior() {
        const navigationBar = document.querySelector('.site-navigation');
        if (!navigationBar) return;

        let previousScrollPosition = window.pageYOffset;

        window.addEventListener('scroll', () => {
            const currentScrollPosition = window.pageYOffset;
            
            // Add scrolled class for styling
            if (currentScrollPosition > 100) {
                navigationBar.classList.add('navigation-scrolled');
            } else {
                navigationBar.classList.remove('navigation-scrolled');
            }

            // Hide/show navigation on scroll direction
            if (currentScrollPosition > previousScrollPosition && currentScrollPosition > 200) {
                navigationBar.classList.add('navigation-hidden');
            } else {
                navigationBar.classList.remove('navigation-hidden');
            }
            
            previousScrollPosition = currentScrollPosition;
        });
    }

    // Custom slider components
    initSliderComponents() {
        const sliderElements = document.querySelectorAll('.hero-carousel, .testimonial-carousel');
        
        sliderElements.forEach((sliderElement, index) => {
            this.setupSliderInstance(sliderElement, index);
        });
    }

    setupSliderInstance(sliderElement, instanceIndex) {
        const slideElements = sliderElement.querySelectorAll('.carousel-slide');
        const previousButton = sliderElement.querySelector('.carousel-previous');
        const nextButton = sliderElement.querySelector('.carousel-next');
        const indicatorContainer = sliderElement.querySelector('.carousel-indicators');
        
        if (slideElements.length === 0) return;

        let currentSlideIndex = 0;
        let autoplayTimer;

        // Create indicator dots
        if (indicatorContainer) {
            indicatorContainer.innerHTML = '';
            slideElements.forEach((_, slideIndex) => {
                const indicator = document.createElement('div');
                indicator.className = 'carousel-indicator';
                if (slideIndex === 0) indicator.classList.add('indicator-active');
                indicator.addEventListener('click', () => navigateToSlide(slideIndex));
                indicatorContainer.appendChild(indicator);
            });
        }

        // Navigate to specific slide
        const navigateToSlide = (slideIndex) => {
            if (slideIndex < 0) slideIndex = slideElements.length - 1;
            if (slideIndex >= slideElements.length) slideIndex = 0;

            console.log(`Navigating to slide ${slideIndex} of ${slideElements.length}`);

            // Update slide visibility using opacity (matching CSS transitions)
            slideElements.forEach((slide, index) => {
                slide.classList.toggle('slide-current', index === slideIndex);
            });

            // Update indicators
            if (indicatorContainer) {
                indicatorContainer.querySelectorAll('.carousel-indicator').forEach((indicator, index) => {
                    indicator.classList.toggle('indicator-active', index === slideIndex);
                });
            }

            currentSlideIndex = slideIndex;
        };

        // Previous/Next button handlers
        if (previousButton) {
            previousButton.addEventListener('click', (e) => {
                e.preventDefault();
                navigateToSlide(currentSlideIndex - 1);
                resetAutoplayTimer();
            });
        }

        if (nextButton) {
            nextButton.addEventListener('click', (e) => {
                e.preventDefault();
                navigateToSlide(currentSlideIndex + 1);
                resetAutoplayTimer();
            });
        }

        // Keyboard navigation support
        sliderElement.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                navigateToSlide(currentSlideIndex - 1);
                resetAutoplayTimer();
            } else if (e.key === 'ArrowRight') {
                navigateToSlide(currentSlideIndex + 1);
                resetAutoplayTimer();
            }
        });

        // Touch/swipe support
        this.addSwipeGestureSupport(sliderElement, navigateToSlide, () => currentSlideIndex);

        // Autoplay functionality
        const startAutoplay = () => {
            autoplayTimer = setInterval(() => {
                navigateToSlide(currentSlideIndex + 1);
            }, 6000);
        };

        const resetAutoplayTimer = () => {
            clearInterval(autoplayTimer);
            startAutoplay();
        };

        // Initialize and start autoplay
        navigateToSlide(0);
        startAutoplay();

        // Pause autoplay on hover
        sliderElement.addEventListener('mouseenter', () => clearInterval(autoplayTimer));
        sliderElement.addEventListener('mouseleave', startAutoplay);

        // Store slider instance
        this.sliderInstances.push({
            element: sliderElement,
            getCurrentSlide: () => currentSlideIndex,
            navigateToSlide,
            totalSlides: slideElements.length
        });
    }

    // Touch/swipe gesture support
    addSwipeGestureSupport(element, navigateCallback, getCurrentSlideCallback) {
        let touchStartX = 0;
        let touchStartY = 0;
        let isSwipeGesture = false;

        element.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            isSwipeGesture = true;
        });

        element.addEventListener('touchmove', (e) => {
            if (!isSwipeGesture) return;
            
            const touchMoveX = Math.abs(e.touches[0].clientX - touchStartX);
            const touchMoveY = Math.abs(e.touches[0].clientY - touchStartY);
            
            // Prefer vertical scrolling over horizontal swipe
            if (touchMoveY > touchMoveX) {
                isSwipeGesture = false;
            }
        });

        element.addEventListener('touchend', (e) => {
            if (!isSwipeGesture) return;
            
            const touchEndX = e.changedTouches[0].clientX;
            const swipeDistance = touchStartX - touchEndX;
            
            if (Math.abs(swipeDistance) > 50) { // Minimum swipe threshold
                const currentSlide = getCurrentSlideCallback();
                if (swipeDistance > 0) {
                    // Swipe left - next slide
                    navigateCallback(currentSlide + 1);
                } else {
                    // Swipe right - previous slide
                    navigateCallback(currentSlide - 1);
                }
            }
            
            isSwipeGesture = false;
        });
    }

    // Mobile navigation menu
    initMobileNavigation() {
        const menuToggleButton = document.querySelector('.mobile-menu-toggle');
        const navigationMenu = document.querySelector('.navigation-menu');
        
        if (!menuToggleButton || !navigationMenu) return;

        menuToggleButton.addEventListener('click', () => {
            const isMenuOpen = navigationMenu.classList.contains('menu-open');
            
            if (isMenuOpen) {
                navigationMenu.classList.remove('menu-open');
                menuToggleButton.classList.remove('toggle-active');
                document.body.classList.remove('mobile-menu-active');
            } else {
                navigationMenu.classList.add('menu-open');
                menuToggleButton.classList.add('toggle-active');
                document.body.classList.add('mobile-menu-active');
            }
        });

        // Close menu when clicking navigation links
        const menuLinks = navigationMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                navigationMenu.classList.remove('menu-open');
                menuToggleButton.classList.remove('toggle-active');
                document.body.classList.remove('mobile-menu-active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuToggleButton.contains(e.target) && !navigationMenu.contains(e.target)) {
                navigationMenu.classList.remove('menu-open');
                menuToggleButton.classList.remove('toggle-active');
                document.body.classList.remove('mobile-menu-active');
            }
        });
    }

    // Scroll effects and animations
    initScrollEffects() {
        // Background parallax effects
        this.initParallaxBackgrounds();
        
        // Element scroll animations
        this.initScrollAnimations();
        
        // Scroll progress indicators
        this.initScrollProgressIndicators();
    }

    // Parallax background effects
    initParallaxBackgrounds() {
        const parallaxElements = document.querySelectorAll('.hero-background, .section-background');
        
        if (parallaxElements.length === 0) return;

        const updateParallaxPositions = () => {
            const scrollPosition = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const parallaxSpeed = scrollPosition * -0.3;
                
                if (window.gsap) {
                    window.gsap.set(element, {
                        transform: `translateY(${parallaxSpeed}px)`
                    });
                } else {
                    element.style.transform = `translateY(${parallaxSpeed}px)`;
                }
            });
            
            this.scrollThrottled = false;
        };

        window.addEventListener('scroll', () => {
            if (!this.scrollThrottled) {
                requestAnimationFrame(updateParallaxPositions);
                this.scrollThrottled = true;
            }
        });
    }

    // Scroll-triggered animations
    initScrollAnimations() {
        const animatedElements = document.querySelectorAll(
            '.feature-card, .hero-content, .section-heading, .project-card, .testimonial-content'
        );
        
        if (!window.IntersectionObserver) return;

        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-visible');
                    
                    if (window.gsap) {
                        window.gsap.fromTo(entry.target, 
                            {
                                opacity: 0,
                                y: 30
                            },
                            {
                                duration: 0.8,
                                opacity: 1,
                                y: 0,
                                ease: "power2.out"
                            }
                        );
                    } else {
                        // CSS-only animation fallback
                        entry.target.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Set initial animation state
        animatedElements.forEach(element => {
            if (!window.gsap) {
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
            }
            animationObserver.observe(element);
        });
    }

    // Scroll progress indicators
    initScrollProgressIndicators() {
        const progressIndicator = document.querySelector('.scroll-progress-bar');
        if (!progressIndicator) return;

        window.addEventListener('scroll', () => {
            const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollProgress = (window.pageYOffset / documentHeight) * 100;
            progressIndicator.style.width = `${scrollProgress}%`;
        });
    }

    // Interactive element effects
    initInteractiveElements() {
        // Feature card interactions
        this.initFeatureCardEffects();
        
        // Button interaction effects
        this.initButtonEffects();
        
        // Project card interactions
        this.initProjectCardEffects();
    }

    // Feature card hover effects
    initFeatureCardEffects() {
        const featureCards = document.querySelectorAll('.feature-card');
        
        featureCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                if (window.gsap) {
                    window.gsap.to(card, {
                        duration: 0.3,
                        y: -10,
                        boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                        ease: "power2.out"
                    });
                } else {
                    card.style.transform = 'translateY(-10px)';
                    card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
                    card.style.transition = 'all 0.3s ease';
                }
            });

            card.addEventListener('mouseleave', () => {
                if (window.gsap) {
                    window.gsap.to(card, {
                        duration: 0.3,
                        y: 0,
                        boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                        ease: "power2.out"
                    });
                } else {
                    card.style.transform = 'translateY(0)';
                    card.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
                }
            });
        });
    }

    // Button interaction effects
    initButtonEffects() {
        const interactiveButtons = document.querySelectorAll('.primary-button, .secondary-button, .cta-button');
        
        interactiveButtons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                if (window.gsap) {
                    window.gsap.to(button, {
                        duration: 0.3,
                        scale: 1.05,
                        ease: "power2.out"
                    });
                }
            });

            button.addEventListener('mouseleave', () => {
                if (window.gsap) {
                    window.gsap.to(button, {
                        duration: 0.3,
                        scale: 1,
                        ease: "power2.out"
                    });
                }
            });
        });
    }

    // Project card hover effects
    initProjectCardEffects() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            const cardImage = card.querySelector('.project-image, .card-background');
            const imageOverlay = card.querySelector('.image-overlay');
            
            card.addEventListener('mouseenter', () => {
                if (cardImage && window.gsap) {
                    window.gsap.to(cardImage, {
                        duration: 0.5,
                        scale: 1.1,
                        ease: "power2.out"
                    });
                }
                
                if (imageOverlay && window.gsap) {
                    window.gsap.to(imageOverlay, {
                        duration: 0.3,
                        opacity: 0.3,
                        ease: "power2.out"
                    });
                }
            });

            card.addEventListener('mouseleave', () => {
                if (cardImage && window.gsap) {
                    window.gsap.to(cardImage, {
                        duration: 0.5,
                        scale: 1,
                        ease: "power2.out"
                    });
                }
                
                if (imageOverlay && window.gsap) {
                    window.gsap.to(imageOverlay, {
                        duration: 0.3,
                        opacity: 0.5,
                        ease: "power2.out"
                    });
                }
            });
        });
    }

    // Form handling and validation
    initFormHandlers() {
        const contactForms = document.querySelectorAll('form');
        
        contactForms.forEach(form => {
            const formInputs = form.querySelectorAll('input, textarea, select');
            
            formInputs.forEach(input => {
                // Focus state effects
                input.addEventListener('focus', () => {
                    input.parentElement.classList.add('input-focused');
                });

                input.addEventListener('blur', () => {
                    input.parentElement.classList.remove('input-focused');
                    this.validateFormField(input);
                });

                // Real-time validation
                input.addEventListener('input', () => {
                    this.validateFormField(input);
                });
            });

            // Form submission handling
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                let isFormValid = true;
                formInputs.forEach(input => {
                    if (!this.validateFormField(input)) {
                        isFormValid = false;
                    }
                });

                if (isFormValid) {
                    this.handleFormSubmission(form);
                }
            });
        });
    }

    // Individual field validation
    validateFormField(fieldElement) {
        const fieldValue = fieldElement.value.trim();
        const fieldType = fieldElement.type;
        const isRequired = fieldElement.hasAttribute('required');
        
        let isFieldValid = true;
        let validationMessage = '';
        
        // Remove existing error messages
        const existingError = fieldElement.parentElement.querySelector('.field-error-message');
        if (existingError) {
            existingError.remove();
        }
        
        fieldElement.parentElement.classList.remove('field-error', 'field-valid');
        
        // Required field validation
        if (isRequired && !fieldValue) {
            isFieldValid = false;
            validationMessage = 'This field is required';
        }
        
        // Type-specific validation
        if (fieldValue && isFieldValid) {
            switch (fieldType) {
                case 'email':
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(fieldValue)) {
                        isFieldValid = false;
                        validationMessage = 'Please enter a valid email address';
                    }
                    break;
                    
                case 'tel':
                    const phonePattern = /^[\+]?[1-9][\d]{0,15}$/;
                    if (!phonePattern.test(fieldValue.replace(/\s/g, ''))) {
                        isFieldValid = false;
                        validationMessage = 'Please enter a valid phone number';
                    }
                    break;
            }
        }
        
        // Update field validation state
        if (isFieldValid && fieldValue) {
            fieldElement.parentElement.classList.add('field-valid');
        } else if (!isFieldValid) {
            fieldElement.parentElement.classList.add('field-error');
            
            // Display error message
            const errorElement = document.createElement('div');
            errorElement.className = 'field-error-message';
            errorElement.textContent = validationMessage;
            fieldElement.parentElement.appendChild(errorElement);
        }
        
        return isFieldValid;
    }

    // Form submission handler
    handleFormSubmission(formElement) {
        // Show loading state
        const submitButton = formElement.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate form submission (replace with actual implementation)
        setTimeout(() => {
            // Show success notification
            this.displayNotification('Message sent successfully!', 'success');
            
            // Reset form
            formElement.reset();
            
            // Reset submit button
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
            
            // Clear validation states
            formElement.querySelectorAll('.input-focused, .field-valid, .field-error').forEach(element => {
                element.classList.remove('input-focused', 'field-valid', 'field-error');
            });
        }, 2000);
    }

    // Notification system
    displayNotification(message, type = 'info') {
        const notificationElement = document.createElement('div');
        notificationElement.className = `user-notification notification-${type}`;
        notificationElement.innerHTML = `
            <div class="notification-content">${message}</div>
            <button class="notification-close">&times;</button>
        `;
        
        // Add to document
        document.body.appendChild(notificationElement);
        
        // Show notification with animation
        setTimeout(() => {
            notificationElement.classList.add('notification-visible');
        }, 100);
        
        // Close button functionality
        const closeButton = notificationElement.querySelector('.notification-close');
        closeButton.addEventListener('click', () => {
            this.removeNotification(notificationElement);
        });
        
        // Auto-remove notification
        setTimeout(() => {
            this.removeNotification(notificationElement);
        }, 5000);
    }

    removeNotification(notificationElement) {
        notificationElement.classList.remove('notification-visible');
        setTimeout(() => {
            if (notificationElement.parentNode) {
                notificationElement.parentNode.removeChild(notificationElement);
            }
        }, 300);
    }

    // Initialize particle system overlay
    initParticleSystem() {
        try {
            if (typeof ParticleSystem !== 'undefined') {
                this.particleSystem = new ParticleSystem({
                    particleCount: this.isMobile() ? 40 : 75, // Reduced for subtlety
                    colors: ['rgba(255,255,255,0.8)', 'rgba(248,248,248,0.6)', 'rgba(240,240,240,0.4)'],
                    size: { min: 1.0, max: 2.5 }, // Smaller, more subtle
                    opacity: { min: 0.2, max: 0.5 }, // Lower opacity
                    scrollInfluence: 6.0, // Moderate scroll response
                    driftStrength: 2.5, // Gentle drift
                    enableGlow: true,
                    glowIntensity: 1.5
                });
                console.log('✨ Particle system initialized successfully');
            } else {
                console.log('⚠️ ParticleSystem not available, skipping...');
            }
        } catch (error) {
            console.error('❌ Error initializing particle system:', error);
        }
    }

    // Initialize dynamic projects section
    async initProjectsSection() {
        try {
            console.log('🎨 Loading projects data...');
            const response = await fetch('data/projects.json');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            this.renderProjects(data.projects.slice(0, 6)); // Show first 6 projects
            console.log('✅ Projects loaded successfully');
        } catch (error) {
            console.error('❌ Error loading projects:', error);
            // Fallback to existing static content if JSON fails
        }
    }

    // Render projects dynamically
    renderProjects(projects) {
        const projectsGrid = document.querySelector('.projects-grid');
        if (!projectsGrid || !projects || projects.length === 0) {
            console.warn('⚠️ Projects grid not found or no projects to display');
            return;
        }

        // Clear existing content including loading placeholder
        projectsGrid.innerHTML = '';

        // Generate project cards
        projects.forEach(project => {
            const projectCard = this.createProjectCard(project);
            projectsGrid.appendChild(projectCard);
        });

        // Re-initialize any animations or effects for new content
        setTimeout(() => {
            this.initScrollEffects();
        }, 100);
    }

    // Create individual project card
    createProjectCard(project) {
        const card = document.createElement('article');
        card.className = 'project-card';
        card.innerHTML = `
            <div class="card-background" style="background-image: url('${project.image}')"></div>
            <div class="image-overlay"></div>
            <div class="project-content">
                <div class="project-category">${project.category || 'Proyecto'}</div>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <a href="${project.url}" class="project-link" target="_blank" rel="noopener noreferrer">
                    Ver Detalles del Proyecto →
                </a>
            </div>
        `;

        // Add image loading optimization
        const bgElement = card.querySelector('.card-background');
        if (bgElement) {
            // Preload the image for better performance
            const img = new Image();
            img.onload = () => {
                bgElement.classList.add('image-loaded');
            };
            img.onerror = () => {
                console.warn(`⚠️ Failed to load image: ${project.image}`);
                // Use fallback image
                bgElement.style.backgroundImage = `url('images/contexto_concrete.webp')`;
                bgElement.classList.add('image-loaded');
            };
            img.src = project.image;
        }

        return card;
    }

    // Initialize modern process section with stunning GSAP animations
    initProcessSection() {
        try {
            const processSection = document.querySelector('.modern-process-section');
            const processSteps = document.querySelectorAll('.process-step');
            const processTitle = document.querySelector('.process-title');
            const processSubtitle = document.querySelector('.process-subtitle');

            if (!processSection || !processSteps.length) {
                console.log('⚠️ Modern process section not found');
                return;
            }

            console.log('✅ Initializing stunning process section with GSAP...');

            // Register GSAP plugins
            if (window.gsap && window.ScrollTrigger) {
                gsap.registerPlugin(ScrollTrigger);

                // Create a master timeline for the entire section
                const masterTimeline = gsap.timeline({
                    scrollTrigger: {
                        trigger: processSection,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse",
                        onEnter: () => console.log("Process section entered"),
                    }
                });

                // Animate section header
                masterTimeline
                    .from(processTitle, {
                        y: 80,
                        opacity: 0,
                        duration: 1.2,
                        ease: "power3.out"
                    })
                    .from(processSubtitle, {
                        y: 40,
                        opacity: 0,
                        duration: 0.8,
                        ease: "power2.out"
                    }, "-=0.6");

                // Create individual scroll triggers for each step with staggered animations
                processSteps.forEach((step, index) => {
                    const stepNumber = step.querySelector('.step-number');
                    const stepContent = step.querySelector('.step-content');
                    const stepTitle = step.querySelector('.step-title');
                    const stepDescription = step.querySelector('.step-description');
                    const stepIcon = step.querySelector('.step-icon');

                    // Create a timeline for each step
                    const stepTimeline = gsap.timeline({
                        scrollTrigger: {
                            trigger: step,
                            start: "top 85%",
                            end: "bottom 15%",
                            toggleActions: "play none none reverse",
                            onEnter: () => {
                                step.classList.add('animate-in');
                            },
                            onLeave: () => {
                                // Optional: remove class when scrolling past
                                // step.classList.remove('animate-in');
                            }
                        }
                    });

                    // Determine animation direction based on step position
                    const isEven = index % 2 === 0;
                    const xDirection = isEven ? -100 : 100;

                    // Animate step elements with sophisticated timing
                    stepTimeline
                        .fromTo(step, 
                            {
                                opacity: 0,
                                y: 100
                            },
                            {
                                opacity: 1,
                                y: 0,
                                duration: 1,
                                ease: "power3.out"
                            }
                        )
                        .fromTo(stepNumber,
                            {
                                scale: 0,
                                rotation: -180
                            },
                            {
                                scale: 1,
                                rotation: 0,
                                duration: 0.8,
                                ease: "back.out(2)"
                            }, "-=0.6"
                        )
                        .fromTo(stepContent,
                            {
                                x: xDirection,
                                opacity: 0
                            },
                            {
                                x: 0,
                                opacity: 1,
                                duration: 0.8,
                                ease: "power2.out"
                            }, "-=0.5"
                        )
                        .fromTo(stepTitle,
                            {
                                y: 30,
                                opacity: 0
                            },
                            {
                                y: 0,
                                opacity: 1,
                                duration: 0.6,
                                ease: "power2.out"
                            }, "-=0.4"
                        )
                        .fromTo(stepDescription,
                            {
                                y: 20,
                                opacity: 0
                            },
                            {
                                y: 0,
                                opacity: 1,
                                duration: 0.6,
                                ease: "power1.out"
                            }, "-=0.3"
                        )
                        .fromTo(stepIcon,
                            {
                                scale: 0,
                                rotation: 90
                            },
                            {
                                scale: 1,
                                rotation: 0,
                                duration: 0.5,
                                ease: "back.out(1.7)"
                            }, "-=0.2");

                    // Add hover effects for desktop
                    if (!this.isMobile()) {
                        step.addEventListener('mouseenter', () => {
                            gsap.to(stepNumber, {
                                scale: 1.15,
                                boxShadow: "0 25px 50px rgba(255, 107, 53, 0.6)",
                                duration: 0.3,
                                ease: "power2.out"
                            });
                            
                            gsap.to(stepIcon, {
                                scale: 1.2,
                                rotation: 5,
                                duration: 0.3,
                                ease: "power2.out"
                            });
                        });

                        step.addEventListener('mouseleave', () => {
                            gsap.to(stepNumber, {
                                scale: 1.05,
                                boxShadow: "0 20px 40px rgba(255, 107, 53, 0.5)",
                                duration: 0.3,
                                ease: "power2.out"
                            });
                            
                            gsap.to(stepIcon, {
                                scale: 1.1,
                                rotation: 0,
                                duration: 0.3,
                                ease: "power2.out"
                            });
                        });
                    }
                });

                // Add parallax effect to the entire section
                gsap.to(processSection, {
                    backgroundPosition: "50% 100%",
                    ease: "none",
                    scrollTrigger: {
                        trigger: processSection,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1
                    }
                });

                // Create floating particles effect
                this.createProcessParticles();

                // Add section progress indicator
                this.createProcessProgress();

            } else {
                // Fallback for when GSAP is not available
                console.log('GSAP not available, using fallback animations');
                this.initProcessSectionFallback();
            }

            console.log('✅ Stunning process section initialized successfully');
        } catch (error) {
            console.error('❌ Error initializing process section:', error);
            this.initProcessSectionFallback();
        }
    }

    // Create floating particles effect for process section
    createProcessParticles() {
        const processSection = document.querySelector('.modern-process-section');
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'process-particles';
        particlesContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 2;
            overflow: hidden;
        `;

        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: rgba(255, 107, 53, ${Math.random() * 0.5 + 0.1});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
            `;

            gsap.to(particle, {
                y: "random(-50, 50)",
                x: "random(-30, 30)",
                duration: "random(3, 6)",
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: Math.random() * 2
            });

            particlesContainer.appendChild(particle);
        }

        processSection.appendChild(particlesContainer);
    }

    // Create progress indicator for process section
    createProcessProgress() {
        const processSection = document.querySelector('.modern-process-section');
        const progressBar = document.createElement('div');
        progressBar.className = 'process-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 50%;
            right: 30px;
            width: 4px;
            height: 200px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 2px;
            transform: translateY(-50%);
            z-index: 1000;
            opacity: 0;
        `;

        const progressFill = document.createElement('div');
        progressFill.style.cssText = `
            width: 100%;
            height: 0%;
            background: linear-gradient(to bottom, #ff6b35, #ff8555);
            border-radius: 2px;
            transition: height 0.3s ease;
        `;

        progressBar.appendChild(progressFill);
        document.body.appendChild(progressBar);

        // Animate progress bar based on scroll
        gsap.to(progressFill, {
            height: "100%",
            ease: "none",
            scrollTrigger: {
                trigger: processSection,
                start: "top center",
                end: "bottom center",
                scrub: 1,
                onEnter: () => gsap.to(progressBar, { opacity: 1, duration: 0.3 }),
                onLeave: () => gsap.to(progressBar, { opacity: 0, duration: 0.3 }),
                onEnterBack: () => gsap.to(progressBar, { opacity: 1, duration: 0.3 }),
                onLeaveBack: () => gsap.to(progressBar, { opacity: 0, duration: 0.3 })
            }
        });
    }

    // Fallback for when GSAP is not available
    initProcessSectionFallback() {
        const processSteps = document.querySelectorAll('.process-step');
        
        const stepObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                    }, index * 200);
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '0px 0px -100px 0px'
        });

        processSteps.forEach(step => {
            stepObserver.observe(step);
        });
    }

    // Helper method to detect mobile devices
    isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
            || window.innerWidth < 768;
    }
}

// Initialize the application
const architectureApp = new ArchitectureApp();

// Initialize loader first, then the app
let pageLoader;

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        pageLoader = new PageLoader();
        architectureApp.init();
    });
} else {
    pageLoader = new PageLoader();
    architectureApp.init();
}

// Export for global access
window.ArchitectureApp = architectureApp;
window.PageLoader = pageLoader;
