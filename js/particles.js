/**
 * Advanced Particle System with Physics and Scroll Integration
 * Simulates floating dust particles with realistic physics and scroll-reactive behavior
 */

/**
 * Easing Functions - JavaScript implementations of cubic-bezier curves
 * These create natural, sophisticated movement patterns
 */
class EasingFunctions {
    // Cubic-bezier easing curves adapted from CSS
    static easeInQuad(t) {
        return t * t;
    }
    
    static easeOutQuad(t) {
        return t * (2 - t);
    }
    
    static easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }
    
    static easeInCubic(t) {
        return t * t * t;
    }
    
    static easeOutCubic(t) {
        return (--t) * t * t + 1;
    }
    
    static easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }
    
    static easeInQuart(t) {
        return t * t * t * t;
    }
    
    static easeOutQuart(t) {
        return 1 - (--t) * t * t * t;
    }
    
    static easeInOutQuart(t) {
        return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
    }
    
    static easeOutExpo(t) {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }
    
    static easeInOutSine(t) {
        return -(Math.cos(Math.PI * t) - 1) / 2;
    }
    
    static easeOutCirc(t) {
        return Math.sqrt(1 - Math.pow(t - 1, 2));
    }
}

class ParticleSystem {
    constructor(options = {}) {
        // Configuration following the design specifications with enhanced luminosity
        this.config = {
            particleCount: this.getOptimalParticleCount(),
            containerSelector: 'body',
            canvasId: 'particle-canvas',
            colors: ['#ffffff', '#f8f8f8', '#f0f0f0', '#e8e8e8'], // Brighter whites for better light emission
            size: { min: 1.2, max: 2.6 },
            speed: { min: 1.5, max: 3.5 },
            opacity: { min: 0.4, max: 0.8 },
            driftStrength: 4.5,
            scrollInfluence: 9.5, // Enhanced scroll acceleration
            mouseInfluence: 800,
            enableGlow: true,
            enableDepth: true,
            size: { min: 3, max: 4 },
            opacity: { min: 0.2, max: 0.6 },        
            glowIntensity: 2,
            ...options
        };
        
        // Core components
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particleSystem = null;
        this.particles = [];
        
        // Animation state
        this.scrollY = window.scrollY || 0;
        this.targetScrollY = this.scrollY;
        this.mouseX = 0;
        this.mouseY = 0;
        this.time = 0;
        this.isVisible = true;
        this.isDestroyed = false;
        
        // Performance tracking
        this.frameCount = 0;
        this.lastFPSCheck = Date.now();
        this.currentFPS = 120;
        
        this.init();
    }
    
    getOptimalParticleCount() {
        return 100;
    }
    
    init() {
        try {
            if (typeof THREE === 'undefined') {
                console.warn('⚠️ Three.js not found, particles disabled');
                return;
            }
            
            this.createRenderer();
            this.createScene();
            this.createCamera();
            this.createParticles();
            this.bindEvents();
            this.startAnimation();
            
            console.log(`✅ Particle system initialized with ${this.config.particleCount} particles`);
            
        } catch (error) {
            console.error('❌ Error initializing particle system:', error);
            this.fallbackMode();
        }
    }
    
    createRenderer() {
        const canvas = document.createElement('canvas');
        canvas.id = this.config.canvasId;
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: -1;
            pointer-events: none;
            background-color: transparent;
            opacity: 1.0;
        `;
        
        const container = document.querySelector(this.config.containerSelector);
        if (!container) {
            console.error('❌ Container not found:', this.config.containerSelector);
            return;
        }
        
        container.appendChild(canvas);
        
        this.renderer = new THREE.WebGLRenderer({
            canvas,
            alpha: true,
            antialias: true, // Disabled for performance
            powerPreference: 'high-performance'
        });
        
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio for performance
        
        // Enable transparent background so particles show behind content
        this.renderer.setClearColor(0x000000, 0);
    }
    
    createScene() {
        this.scene = new THREE.Scene();
    }
    
    createCamera() {
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            2000
        );
        this.camera.position.z = 1000;
    }
    
    createParticles() {
        // Ensure particles array is initialized
        this.particles = [];
        
        // Create geometry
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(this.config.particleCount * 3);
        const colors = new Float32Array(this.config.particleCount * 3);
        const sizes = new Float32Array(this.config.particleCount);
        const velocities = new Float32Array(this.config.particleCount * 3);
        const opacities = new Float32Array(this.config.particleCount);
        
        // Initialize particle properties
        for (let i = 0; i < this.config.particleCount; i++) {
            const i3 = i * 3;
            
            // Random positions with depth-based distribution
            positions[i3] = (Math.random() - 0.5) * 2000;
            positions[i3 + 1] = (Math.random() - 0.5) * 2000;
            positions[i3 + 2] = (Math.random() - 0.5) * 1200; // Extended depth range
            
            // Random colors (white to very light gray)
            const color = new THREE.Color(
                this.config.colors[Math.floor(Math.random() * this.config.colors.length)]
            );
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;
            
            // Size based on depth for better 3D effect
            const depthFactor = (positions[i3 + 2] + 600) / 1200; // 0 to 1
            sizes[i] = (Math.random() * (this.config.size.max - this.config.size.min) + this.config.size.min) * (0.5 + depthFactor);
            
            // Initial velocities
            velocities[i3] = (Math.random() - 0.5) * this.config.speed.max;
            velocities[i3 + 1] = (Math.random() - 0.5) * this.config.speed.max;
            velocities[i3 + 2] = (Math.random() - 0.5) * this.config.speed.max;
            
            // Random opacity
            opacities[i] = Math.random() * (this.config.opacity.max - this.config.opacity.min) + this.config.opacity.min;
            
            // Store additional particle data with depth information
            const depth = (positions[i3 + 2] + 600) / 1200; // Normalized depth 0-1
            this.particles[i] = {
                originalX: positions[i3],
                originalY: positions[i3 + 1],
                originalZ: positions[i3 + 2],
                baseVelX: velocities[i3],
                baseVelY: velocities[i3 + 1],
                baseVelZ: velocities[i3 + 2],
                phase: Math.random() * Math.PI * 2,
                scrollOffset: Math.random() * 100,
                depth: depth, // Store depth for movement calculations
                depthSpeed: 0.5 + depth * 1.5 // Different speeds based on depth
            };
        }
        
        // Set geometry attributes
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        geometry.setAttribute('opacity', new THREE.BufferAttribute(opacities, 1));
        geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
        
        // Create the glowing particle texture
        const particleTexture = this.createGlowingParticleTexture();
        
        // Create enhanced points material with circular, glowing texture
        const material = new THREE.PointsMaterial({
            size: 12, // Increased size to show the glow effect better
            map: particleTexture, // Apply the custom circular texture
            transparent: true,
            opacity: 0.9,
            blending: THREE.AdditiveBlending, // Creates beautiful light emission effect
            depthWrite: false,
            vertexColors: true,
            sizeAttenuation: true,
            alphaTest: 0.01 // Very low threshold for smooth circular edges
        });
        
        // Create points system
        this.particleSystem = new THREE.Points(geometry, material);
        this.scene.add(this.particleSystem);
    }
    
    createGlowingParticleTexture() {
        // Create a high-resolution canvas for the glowing particle texture
        const canvas = document.createElement('canvas');
        canvas.width = 128;
        canvas.height = 128;
        const context = canvas.getContext('2d');
        
        const centerX = 64;
        const centerY = 64;
        const maxRadius = 64;
        
        // Clear the canvas with transparency
        context.clearRect(0, 0, 128, 128);
        
        // Create the outer glow (white, very diffuse)
        const outerGlow = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, maxRadius);
        outerGlow.addColorStop(0, 'rgba(255, 100, 100, 0.0)'); // Transparent at center (will be overridden)
        outerGlow.addColorStop(0.1, 'rgba(255, 200, 200, 0.4)'); // Soft red-white transition
        outerGlow.addColorStop(0.3, 'rgba(255, 255, 255, 0.3)'); // White glow
        outerGlow.addColorStop(0.6, 'rgba(255, 255, 255, 0.1)'); // Fading white
        outerGlow.addColorStop(1, 'rgba(255, 255, 255, 0.0)'); // Transparent edge
        
        context.fillStyle = outerGlow;
        context.fillRect(0, 0, 128, 128);
        
        // Create the bright red core
        const coreGlow = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, 20);
        coreGlow.addColorStop(0, 'rgba(255, 50, 50, 1.0)'); // Bright red center
        coreGlow.addColorStop(0.3, 'rgba(255, 100, 100, 0.8)'); // Red fade
        coreGlow.addColorStop(0.6, 'rgba(255, 150, 150, 0.4)'); // Red to white transition
        coreGlow.addColorStop(1, 'rgba(255, 200, 200, 0.0)'); // Transparent
        
        // Use screen blend mode for the core to create bright effect
        context.globalCompositeOperation = 'screen';
        context.fillStyle = coreGlow;
        context.fillRect(0, 0, 128, 128);
        
        // Reset composite operation
        context.globalCompositeOperation = 'source-over';
        
        // Create and return the texture
        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        
        return texture;
    }
    
    bindEvents() {
        // Scroll event with throttling
        let scrollTicking = false;
        window.addEventListener('scroll', () => {
            this.targetScrollY = window.scrollY || 0;
            
            if (!scrollTicking) {
                requestAnimationFrame(() => {
                    scrollTicking = false;
                });
                scrollTicking = true;
            }
        }, { passive: true });
        
        // Mouse move with throttling
        let mouseTicking = false;
        window.addEventListener('mousemove', (event) => {
            this.mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
            
            if (!mouseTicking) {
                requestAnimationFrame(() => {
                    mouseTicking = false;
                });
                mouseTicking = true;
            }
        }, { passive: true });
        
        // Window resize
        window.addEventListener('resize', () => this.handleResize(), { passive: true });
        
        // Page visibility
        document.addEventListener('visibilitychange', () => {
            this.isVisible = !document.hidden;
        });
        
        // Scroll integration with Lenis
        if (window.lenis) {
            window.lenis.on('scroll', (e) => {
                this.targetScrollY = e.scroll;
            });
        }
    }
    
    startAnimation() {
        const animate = () => {
            if (this.isDestroyed) return;
            
            requestAnimationFrame(animate);
            
            if (this.isVisible) {
                this.updateParticles();
                this.render();
                this.updatePerformanceMetrics();
            }
        };
        
        animate();
    }
    
    updateParticles() {
        if (!this.particleSystem || !this.particles || this.particles.length === 0) {
            return;
        }
        
        this.time += 0.02; // Slower time increment for gentler movement
        
        // Smooth scroll interpolation with controlled easing
        const scrollDiff = Math.abs(this.targetScrollY - this.scrollY);
        const scrollEase = Math.min(scrollDiff / 100, 1) * 0.08;
        this.scrollY += (this.targetScrollY - this.scrollY) * (0.5 + scrollEase);
        
        const positions = this.particleSystem.geometry.attributes.position.array;
        const velocities = this.particleSystem.geometry.attributes.velocity.array;
        
        for (let i = 0; i < this.config.particleCount; i++) {
            const i3 = i * 3;
            const particle = this.particles[i];
            
            // Safety check for particle data
            if (!particle) {
                continue;
            }
            
            // Enhanced organic drift with increased amplitude for more visible movement
            const timeOffset = this.time * particle.depthSpeed * 0.2 + particle.phase;
            
            // Significantly increased drift multipliers for 200% more dynamic idle movement
            const driftX = Math.sin(timeOffset) * this.config.driftStrength * 2.7;
            const driftY = Math.cos(timeOffset * 0.2) * this.config.driftStrength * 3.0;
            const driftZ = Math.sin(timeOffset * 0.5) * this.config.driftStrength * 1.55;
            
            // Very subtle scroll influence
            const scrollDelta = this.scrollY - this.targetScrollY;
            const scrollAcceleration = scrollDelta * 1.1 * particle.depthSpeed;
            
            // Gentle mouse interaction
            const mouseDistX = this.mouseX * 50 - positions[i3];
            const mouseDistY = this.mouseY * 50 - positions[i3 + 1];
            const mouseDistance = Math.sqrt(mouseDistX * mouseDistX + mouseDistY * mouseDistY);
            const mouseInfluence = Math.max(0, (100 - mouseDistance) / 100) * 0.1;
            
            velocities[i3] += driftX * 0.4 + mouseDistX * mouseInfluence * 0.0005;
            velocities[i3 + 1] += driftY * 0.13 + scrollAcceleration + mouseDistY * mouseInfluence * 0.0005;
            velocities[i3 + 2] += driftZ * 0.045;
            
            // Further reduced damping for much more persistent movement
            velocities[i3] *= 0.15;
            velocities[i3 + 1] *= 0.16;
            velocities[i3 + 2] *= 0.12;
            
            // Significantly increased velocity limits for much faster particles
            const maxVel = 6.0;
            velocities[i3] = Math.max(-maxVel, Math.min(maxVel, velocities[i3]));
            velocities[i3 + 1] = Math.max(-maxVel, Math.min(maxVel, velocities[i3 + 1]));
            velocities[i3 + 2] = Math.max(-maxVel, Math.min(maxVel, velocities[i3 + 2]));
            
            // Update positions
            positions[i3] += velocities[i3];
            positions[i3 + 1] += velocities[i3 + 1];
            positions[i3 + 2] += velocities[i3 + 2];
            
            // Proper boundary wrapping without disappearing
            if (positions[i3] > 1000) positions[i3] = -999;
            if (positions[i3] < -1000) positions[i3] = 999;
            if (positions[i3 + 1] > 1000) positions[i3 + 1] = -999;
            if (positions[i3 + 1] < -1000) positions[i3 + 1] = 999;
            if (positions[i3 + 2] > 600) positions[i3 + 2] = -599;
            if (positions[i3 + 2] < -600) positions[i3 + 2] = 599;
        }
        
        // Mark for update
        this.particleSystem.geometry.attributes.position.needsUpdate = true;
        this.particleSystem.geometry.attributes.velocity.needsUpdate = true;
    }
    
    render() {
        if (this.renderer && this.scene && this.camera) {
            this.renderer.render(this.scene, this.camera);
        }
    }
    
    updatePerformanceMetrics() {
        this.frameCount++;
        const now = Date.now();
        
        if (now - this.lastFPSCheck > 1000) {
            this.currentFPS = this.frameCount;
            this.frameCount = 0;
            this.lastFPSCheck = now;
            
            // Dynamic quality adjustment
            if (this.currentFPS < 30 && this.config.particleCount > 100) {
                this.adjustQuality('down');
            } else if (this.currentFPS > 55 && this.config.particleCount < 500) {
                this.adjustQuality('up');
            }
        }
    }
    
    adjustQuality(direction) {
        if (direction === 'down' && this.config.particleCount > 50) {
            this.config.particleCount = Math.max(50, this.config.particleCount * 0.8);
            console.log(`📉 Reduced particle count to ${this.config.particleCount} for better performance`);
        } else if (direction === 'up' && this.config.particleCount < 500) {
            this.config.particleCount = Math.min(500, this.config.particleCount * 1.2);
            console.log(`📈 Increased particle count to ${this.config.particleCount}`);
        }
    }
    
    handleResize() {
        if (!this.renderer || !this.camera) return;
        
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        
        this.renderer.setSize(width, height);
    }
    
    fallbackMode() {
        console.warn('🔄 Particle system running in fallback mode');
        
        // Create simple CSS-based particle effect as fallback
        const fallbackContainer = document.createElement('div');
        fallbackContainer.id = 'particle-fallback';
        fallbackContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: -1;
            pointer-events: none;
            opacity: 0.3;
        `;
        
        // Create simple floating elements
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 1}px;
                height: ${Math.random() * 4 + 1}px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${Math.random() * 10 + 10}s linear infinite;
            `;
            fallbackContainer.appendChild(particle);
        }
        
        // Add CSS animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0% { transform: translateY(0px) rotate(0deg); }
                50% { transform: translateY(-20px) rotate(180deg); }
                100% { transform: translateY(0px) rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(fallbackContainer);
    }
    
    // Public methods
    setScrollInfluence(value) {
        this.config.scrollInfluence = value;
    }
    
    setParticleCount(count) {
        this.config.particleCount = Math.max(10, Math.min(1000, count));
    }
    
    getPerformanceStats() {
        return {
            fps: this.currentFPS,
            particleCount: this.config.particleCount,
            isVisible: this.isVisible,
            scrollY: this.scrollY
        };
    }
    
    destroy() {
        this.isDestroyed = true;
        
        // Clean up Three.js resources
        if (this.particleSystem) {
            this.scene.remove(this.particleSystem);
            this.particleSystem.geometry.dispose();
            this.particleSystem.material.dispose();
        }
        
        if (this.renderer) {
            this.renderer.dispose();
            const canvas = document.getElementById(this.config.canvasId);
            if (canvas) canvas.remove();
        }
        
        // Remove fallback elements
        const fallback = document.getElementById('particle-fallback');
        if (fallback) fallback.remove();
        
        console.log('🧹 Particle system cleaned up');
    }
}

// Export for module usage, or create global if not using modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ParticleSystem;
} else {
    window.ParticleSystem = ParticleSystem;
}
