/**
 * Page Loader Module
 * Handles the animated loader with minimum and maximum display times
 */
class PageLoader {
    constructor() {
        this.loaderElement = document.getElementById('page-loader');
        this.mainContent = document.getElementById('main-website');
        this.minLoadTime = 2000; // Minimum 2 seconds to show the loader
        this.maxLoadTime = 5000; // Maximum 5 seconds before forcing show
        this.loadStartTime = Date.now();
        
        this.init();
    }
    
    init() {
        // Ensure loader is visible initially
        if (this.loaderElement) {
            this.loaderElement.style.display = 'flex';
        }
        
        // Wait for page to load
        if (document.readyState === 'loading') {
            window.addEventListener('load', () => this.handlePageLoad());
        } else {
            // Page already loaded
            this.handlePageLoad();
        }
        
        // Fallback timeout to ensure loader doesn't stay forever
        setTimeout(() => {
            this.hideLoader();
        }, this.maxLoadTime);
    }
    
    handlePageLoad() {
        const loadTime = Date.now() - this.loadStartTime;
        const remainingTime = Math.max(0, this.minLoadTime - loadTime);
        
        // Wait for minimum load time if needed
        setTimeout(() => {
            this.hideLoader();
        }, remainingTime);
    }
    
    hideLoader() {
        if (!this.loaderElement) {
            console.warn('⚠️ Loader element not found, showing main content directly');
            this.showMainContent();
            return;
        }
        
        // Add fade-out class to loader
        this.loaderElement.classList.add('fade-out');
        
        // Show main content
        this.showMainContent();
        
        // Remove loader from DOM after animation
        setTimeout(() => {
            if (this.loaderElement) {
                this.loaderElement.remove();
            }
        }, 1000);
    }
    
    showMainContent() {
        if (this.mainContent) {
            this.mainContent.classList.add('fade-in');
            // Ensure opacity is set for fallback
            this.mainContent.style.opacity = '1';
            this.mainContent.style.visibility = 'visible';
        } else {
            console.warn('⚠️ Main content element not found');
        }
    }
}

// Export for module usage, or create global if not using modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PageLoader;
} else {
    window.PageLoader = PageLoader;
}
