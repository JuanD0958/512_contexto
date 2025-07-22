/**
 * Advanced Particle System with Physics and Scroll Integration
 * Simulates floating dust particles with realistic physics and scroll-reactive behavior
 */
class ParticleSystem {
    constructor(options = {}) {
        // Configuration with sensible defaults
        this.config = {
            particleCount: this.getOptimalParticleCount(),
            containerSelector: 'body',
            canvasId: 'particle-canvas',
            colors: ['#ffffff', '#e85015', '#ff6b35'],
            size: { min: 0.5, max: 2.0 },
            speed: { min: 0.2, max: 0.8 },
            opacity: { min: 0.3, max: 0.8 },
            driftStrength: 0.5,
            scrollInfluence: 2.0,
            mouseInfluence: 1.5,
            enableGlow: true,
            enableDepth: true,
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
        this.currentFPS = 60;
        
        this.init();
    }
    
    getOptimalParticleCount() {
        // Dynamic particle count based on device capabilities
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const isLowPowerDevice = navigator.hardwareConcurrency <= 4;
        const hasReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (hasReducedMotion) return 50;
        if (isMobile) return isLowPowerDevice ? 100 : 200;
        return isLowPowerDevice ? 300 : 500;
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
            opacity: 0.8;
        `;
        
        const container = document.querySelector(this.config.containerSelector);
        container.appendChild(canvas);
        
        this.renderer = new THREE.WebGLRenderer({
            canvas,
            alpha: true,
            antialias: false, // Disabled for performance
            powerPreference: 'high-performance'
        });
        
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio for performance
        
        // Enable transparency blending for glow effects
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
            
            // Random positions in 3D space
            positions[i3] = (Math.random() - 0.5) * 2000;
            positions[i3 + 1] = (Math.random() - 0.5) * 2000;
            positions[i3 + 2] = (Math.random() - 0.5) * 1000;
            
            // Random colors
            const color = new THREE.Color(
                this.config.colors[Math.floor(Math.random() * this.config.colors.length)]
            );
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;
            
            // Random sizes
            sizes[i] = Math.random() * (this.config.size.max - this.config.size.min) + this.config.size.min;
            
            // Initial velocities
            velocities[i3] = (Math.random() - 0.5) * this.config.speed.max;
            velocities[i3 + 1] = (Math.random() - 0.5) * this.config.speed.max;
            velocities[i3 + 2] = (Math.random() - 0.5) * this.config.speed.max;
            
            // Random opacity
            opacities[i] = Math.random() * (this.config.opacity.max - this.config.opacity.min) + this.config.opacity.min;
            
            // Store additional particle data
            this.particles[i] = {
                originalX: positions[i3],
                originalY: positions[i3 + 1],
                originalZ: positions[i3 + 2],
                baseVelX: velocities[i3],
                baseVelY: velocities[i3 + 1],
                baseVelZ: velocities[i3 + 2],
                phase: Math.random() * Math.PI * 2,
                scrollOffset: Math.random() * 100
            };
        }
        
        // Set geometry attributes
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        geometry.setAttribute('opacity', new THREE.BufferAttribute(opacities, 1));
        geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
        
        // Create points material with additive blending
        const material = new THREE.PointsMaterial({
            size: 3,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            vertexColors: true
        });
        
        // Create points system
        this.particleSystem = new THREE.Points(geometry, material);
        this.scene.add(this.particleSystem);
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
        if (!this.particleSystem) return;
        
        this.time += 0.01;
        
        // Smooth scroll interpolation
        this.scrollY += (this.targetScrollY - this.scrollY) * 0.1;
        
        const positions = this.particleSystem.geometry.attributes.position.array;
        const velocities = this.particleSystem.geometry.attributes.velocity.array;
        
        for (let i = 0; i < this.config.particleCount; i++) {
            const i3 = i * 3;
            const particle = this.particles[i];
            
            // Base drift motion
            const drift = Math.sin(this.time + particle.phase) * this.config.driftStrength;
            
            // Scroll influence
            const scrollInfluence = (this.scrollY - this.targetScrollY) * this.config.scrollInfluence * 0.01;
            
            // Mouse influence
            const mouseDistX = this.mouseX * 100 - positions[i3];
            const mouseDistY = this.mouseY * 100 - positions[i3 + 1];
            const mouseDistance = Math.sqrt(mouseDistX * mouseDistX + mouseDistY * mouseDistY);
            const mouseInfluence = Math.max(0, (200 - mouseDistance) / 200) * this.config.mouseInfluence;
            
            // Update velocities with physics
            velocities[i3] += (drift + scrollInfluence * 0.5 + mouseDistX * mouseInfluence * 0.01) * 0.1;
            velocities[i3 + 1] += (drift * 0.7 + scrollInfluence + mouseDistY * mouseInfluence * 0.01) * 0.1;
            velocities[i3 + 2] += drift * 0.3;
            
            // Apply damping
            velocities[i3] *= 0.98;
            velocities[i3 + 1] *= 0.98;
            velocities[i3 + 2] *= 0.98;
            
            // Update positions
            positions[i3] += velocities[i3];
            positions[i3 + 1] += velocities[i3 + 1];
            positions[i3 + 2] += velocities[i3 + 2];
            
            // Boundary wrapping
            if (positions[i3] > 1000) positions[i3] = -1000;
            if (positions[i3] < -1000) positions[i3] = 1000;
            if (positions[i3 + 1] > 1000) positions[i3 + 1] = -1000;
            if (positions[i3 + 1] < -1000) positions[i3 + 1] = 1000;
            if (positions[i3 + 2] > 500) positions[i3 + 2] = -500;
            if (positions[i3 + 2] < -500) positions[i3 + 2] = 500;
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
