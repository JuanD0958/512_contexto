/**
 * Smooth Scroll Module
 * Integrates Lenis.js for smooth scrolling and GSAP ScrollTrigger for animations
 */
class SmoothScroll {
    constructor() {
        this.lenis = null;
        this.init();
    }
    
    init() {
        this.initializeLenis();
        // Wait a bit before connecting ScrollTrigger to ensure Lenis is ready
        setTimeout(() => {
            this.connectScrollTrigger();
            this.setupScrollAnimations();
        }, 100);
        this.setupRAF();
    }
    
    initializeLenis() {
        try {
            // Initialize Lenis for smooth scrolling
            if (typeof Lenis !== 'undefined') {
                this.lenis = new Lenis({
                    duration: 1.2,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                    smoothWheel: true,
                    smoothTouch: false, // Disable on touch devices for better performance
                    touchMultiplier: 2,
                });
                
                // Make lenis globally available
                window.lenis = this.lenis;
                
                console.log('✅ Lenis smooth scroll initialized');
            } else {
                console.warn('⚠️ Lenis library not found, falling back to native scroll');
            }
        } catch (error) {
            console.error('❌ Error initializing Lenis:', error);
        }
    }
    
    connectScrollTrigger() {
        try {
            // Connect GSAP ScrollTrigger with Lenis after both are initialized
            if (this.lenis && typeof gsap !== 'undefined' && gsap.registerPlugin && typeof ScrollTrigger !== 'undefined') {
                gsap.registerPlugin(ScrollTrigger);
                
                this.lenis.on('scroll', (e) => {
                    ScrollTrigger.update();
                });
                
                // Update ScrollTrigger when Lenis scrolls
                const lenisInstance = this.lenis;
                ScrollTrigger.scrollerProxy(document.body, {
                    scrollTop(value) {
                        if (arguments.length) {
                            if (lenisInstance) {
                                lenisInstance.scrollTo(value, {immediate: true});
                            }
                        }
                        return lenisInstance ? lenisInstance.animatedScroll : window.scrollY;
                    },
                    getBoundingClientRect() {
                        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
                    },
                    pinType: document.body.style.transform ? 'transform' : 'fixed'
                });
                
                console.log('✅ ScrollTrigger connected to Lenis');
            }
        } catch (error) {
            console.error('❌ Error connecting ScrollTrigger:', error);
        }
    }
    
    setupScrollAnimations() {
        try {
            if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
                console.warn('⚠️ GSAP or ScrollTrigger not found, skipping scroll animations');
                return;
            }
            
            // Fade in animations for sections
            gsap.utils.toArray('section').forEach((section, i) => {
                if (section.id === 'home') return; // Skip hero section
                
                gsap.fromTo(section, 
                    {
                        opacity: 0,
                        y: 50
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: section,
                            start: 'top 80%',
                            end: 'bottom 20%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                );
            });
            
            // Parallax effect for hero section
            const hero = document.querySelector('#home');
            if (hero) {
                gsap.to(hero, {
                    yPercent: -50,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: hero,
                        start: 'top top',
                        end: 'bottom top',
                        scrub: 1
                    }
                });
            }
            
            // Project cards animation
            gsap.utils.toArray('.project-card').forEach((card, i) => {
                gsap.fromTo(card,
                    {
                        opacity: 0,
                        y: 60,
                        scale: 0.8
                    },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        delay: i * 0.1,
                        ease: 'back.out(1.7)',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                );
            });
            
            // Contact cards animation
            gsap.utils.toArray('.contact-card').forEach((card, i) => {
                gsap.fromTo(card,
                    {
                        opacity: 0,
                        y: 40,
                        rotationX: -15
                    },
                    {
                        opacity: 1,
                        y: 0,
                        rotationX: 0,
                        duration: 0.6,
                        delay: i * 0.15,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                );
            });
            
            console.log('✅ Scroll animations initialized');
        } catch (error) {
            console.error('❌ Error setting up scroll animations:', error);
        }
    }
    
    setupRAF() {
        // Request animation frame loop for Lenis
        const raf = (time) => {
            if (this.lenis) {
                this.lenis.raf(time);
            }
            requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);
    }
    
    // Public methods
    scrollTo(target, options = {}) {
        if (this.lenis) {
            this.lenis.scrollTo(target, options);
        } else {
            // Fallback
            const element = typeof target === 'string' ? document.querySelector(target) : target;
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
    
    destroy() {
        if (this.lenis) {
            this.lenis.destroy();
        }
    }
}

// Export for module usage, or create global if not using modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SmoothScroll;
} else {
    window.SmoothScroll = SmoothScroll;
}
