/**
 * Main Application Controller
 * Coordinates all modules and handles initialization
 */
class App {
    constructor() {
        this.loader = null;
        this.navigation = null;
        this.smoothScroll = null;
        this.particles = null;
        this.isInitialized = false;
        
        this.init();
    }
    
    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeApp());
        } else {
            this.initializeApp();
        }
    }
    
    initializeApp() {
        console.log('🚀 Initializing Cinco Doce website...');
        
        try {
            // Initialize loader first
            this.initializeLoader();
            
            // Initialize navigation and scroll immediately
            this.initializeNavigation();
            this.initializeSmoothScroll();
            
            // Initialize particles after a short delay to ensure DOM is ready
            setTimeout(() => {
                this.initializeParticles();
                this.setupErrorHandling();
                
                // Ensure main content is visible after everything is loaded
                this.showMainContent();
                
                this.isInitialized = true;
                console.log('✅ App initialization complete');
            }, 1000);
            
        } catch (error) {
            console.error('❌ Error during app initialization:', error);
            this.handleInitializationError(error);
        }
    }
    
    showMainContent() {
        // Ensure the main website content is visible
        const mainWebsite = document.getElementById('main-website');
        if (mainWebsite) {
            mainWebsite.style.opacity = '1';
            mainWebsite.style.visibility = 'visible';
        }
    }
    
    initializeLoader() {
        try {
            if (typeof PageLoader !== 'undefined') {
                this.loader = new PageLoader();
                console.log('✅ Page loader initialized');
            } else {
                console.warn('⚠️ PageLoader not available');
                this.fallbackLoader();
            }
        } catch (error) {
            console.error('❌ Error initializing loader:', error);
            this.fallbackLoader();
        }
    }
    
    initializeNavigation() {
        try {
            if (typeof Navigation !== 'undefined') {
                this.navigation = new Navigation();
                console.log('✅ Navigation initialized');
            } else {
                console.warn('⚠️ Navigation module not available, using fallback');
                this.fallbackNavigation();
            }
        } catch (error) {
            console.error('❌ Error initializing navigation:', error);
            this.fallbackNavigation();
        }
    }
    
    initializeSmoothScroll() {
        try {
            if (typeof SmoothScroll !== 'undefined') {
                this.smoothScroll = new SmoothScroll();
                console.log('✅ Smooth scroll initialized');
            } else {
                console.warn('⚠️ SmoothScroll module not available');
            }
        } catch (error) {
            console.error('❌ Error initializing smooth scroll:', error);
        }
    }
    
    initializeParticles() {
        try {
            if (typeof ParticleSystem !== 'undefined') {
                this.particles = new ParticleSystem();
                console.log('✅ Particle system initialized');
            } else {
                console.warn('⚠️ ParticleSystem not available');
            }
        } catch (error) {
            console.error('❌ Error initializing particles:', error);
        }
    }
    
    setupErrorHandling() {
        // Global error handler
        window.addEventListener('error', (event) => {
            console.error('Global error:', event.error);
        });
        
        // Unhandled promise rejection handler
        window.addEventListener('unhandledrejection', (event) => {
            console.error('Unhandled promise rejection:', event.reason);
        });
    }
    
    // Fallback methods
    fallbackLoader() {
        const loader = document.getElementById('page-loader');
        const mainContent = document.getElementById('main-website');
        
        setTimeout(() => {
            if (loader) loader.style.display = 'none';
            if (mainContent) {
                mainContent.style.opacity = '1';
                mainContent.style.visibility = 'visible';
            }
        }, 2000);
    }
    
    fallbackNavigation() {
        // Basic navigation fallback
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });
        }
        
        // Basic smooth scroll fallback
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
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
    
    handleInitializationError(error) {
        // Show a user-friendly error message
        const errorDiv = document.createElement('div');
        errorDiv.innerHTML = `
            <div style="
                position: fixed; 
                top: 20px; 
                right: 20px; 
                background: #ff4444; 
                color: white; 
                padding: 15px; 
                border-radius: 5px; 
                z-index: 10000;
                font-family: monospace;
                max-width: 300px;
            ">
                <strong>Initialization Error</strong><br>
                Some features may not work properly.<br>
                <small>${error.message}</small>
            </div>
        `;
        document.body.appendChild(errorDiv);
        
        // Remove error message after 10 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 10000);
    }
    
    // Public methods
    destroy() {
        if (this.smoothScroll) {
            this.smoothScroll.destroy();
        }
        if (this.particles) {
            this.particles.destroy();
        }
    }
    
    getStatus() {
        return {
            initialized: this.isInitialized,
            loader: !!this.loader,
            navigation: !!this.navigation,
            smoothScroll: !!this.smoothScroll,
            particles: !!this.particles
        };
    }
}

// Initialize app when script loads
let app;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        app = new App();
    });
} else {
    app = new App();
}

// Make app globally available for debugging
window.app = app;

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = App;
}
