# Cinco Doce — Smooth Scrolling Architecture Website

A modern, performant website featuring smooth scrolling with Lenis.js, Three.js particle effects, and GSAP animations. All dependencies are hosted locally to avoid CORS issues and ensure offline functionality.

## 🌟 Features

- **Smooth Scrolling**: Lenis.js integration for buttery smooth scroll experience
- **3D Particle System**: Three.js-powered floating dust particles that react to scroll
- **Scroll Animations**: GSAP + ScrollTrigger for section-based animations  
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Performance Optimized**: Dynamic particle count adjustment based on device capabilities
- **Local Assets**: All libraries hosted locally to prevent CORS/connectivity issues
- **Modular Architecture**: Clean, organized codebase with separated concerns
- **Accessibility**: Full keyboard navigation and screen reader support
- **Fallback Modes**: Graceful degradation when libraries fail to load

## 🏗️ Project Structure

```
512/
├── index.html              # Main HTML file
├── style.css              # Legacy styles (kept for compatibility)
├── script.js              # Legacy script (kept for compatibility)
├── css/                   # Modular CSS files
│   ├── pico.min.css      # PicoCSS framework (local)
│   ├── base.css          # Base styles and CSS variables
│   └── components.css    # Component-specific styles
├── js/                   # Modular JavaScript files
│   ├── libs/             # Local library files
│   │   ├── three.min.js  # Three.js v0.160.0
│   │   ├── lenis.min.js  # Lenis v1.0.42
│   │   ├── gsap.min.js   # GSAP v3.12.5
│   │   └── ScrollTrigger.min.js
│   ├── loader.js         # Page loader functionality
│   ├── navigation.js     # Navigation and menu handling
│   ├── scroll.js         # Lenis smooth scroll integration
│   ├── particles.js      # Three.js particle system
│   └── main.js           # Main application controller
├── fonts/                # Custom fonts
│   └── cincodoce-font.ttf
└── images/               # Optimized images (.webp format)
```

## 🚀 Running Locally

Since all assets are local, you need to serve the files through a local server to avoid CORS restrictions.

### Option 1: Using Node.js http-server (Recommended)

```bash
# Install http-server globally
npm install -g http-server

# Navigate to project directory
cd /path/to/512

# Start local server
http-server -p 3000 -c-1

# Open in browser
open http://localhost:3000
```

### Option 2: Using Python HTTP Server

```bash
# Navigate to project directory
cd /path/to/512

# Python 3
python -m http.server 3000

# Python 2 (if needed)
python -m SimpleHTTPServer 3000

# Open in browser
open http://localhost:3000
```

### Option 3: Using PHP Built-in Server

```bash
# Navigate to project directory
cd /path/to/512

# Start PHP server
php -S localhost:3000

# Open in browser
open http://localhost:3000
```

### Option 4: Using Live Server (VS Code Extension)

1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## 🎯 Key Components

### Page Loader (`js/loader.js`)
- Animated SVG loader with minimum 2-second display time
- Smooth fade transition to main content
- Fallback handling for missing elements

### Navigation (`js/navigation.js`)
- Mobile-responsive hamburger menu
- Smooth scroll to sections
- Active link highlighting with scroll spy
- Lenis integration for navigation

### Smooth Scrolling (`js/scroll.js`)
- Lenis.js initialization with optimized settings
- GSAP ScrollTrigger integration
- Section fade-in animations
- Parallax effects for hero section
- Performance-optimized with requestAnimationFrame

### Particle System (`js/particles.js`)
- Physics-based particle simulation
- Scroll-reactive particle movement with inertia
- Dynamic particle count based on device performance
- Gentle drift animation when idle
- Additive blending for glow effects
- Fallback CSS animation when Three.js unavailable

### Main Controller (`js/main.js`)
- Coordinates all modules
- Error handling and fallback mechanisms
- Performance monitoring
- Initialization sequence management

## 🎨 Customization

### Particle System Configuration

```javascript
const particles = new ParticleSystem({
    particleCount: 300,           // Override auto-detection
    colors: ['#ffffff', '#e85015'], // Custom color palette
    scrollInfluence: 2.0,         // Scroll sensitivity
    driftStrength: 0.5,          // Idle drift amount
    mouseInfluence: 1.5          // Mouse interaction strength
});
```

### Smooth Scroll Settings

```javascript
const lenis = new Lenis({
    duration: 1.2,               // Scroll duration
    easing: (t) => ...,          // Custom easing function
    smoothWheel: true,           // Desktop smooth wheel
    smoothTouch: false           // Disable on mobile for performance
});
```

## 📱 Performance Features

- **Adaptive Quality**: Particle count adjusts based on FPS
- **Mobile Optimization**: Reduced particle count on mobile devices
- **Reduced Motion Support**: Minimal animations for accessibility
- **Visibility API**: Pauses animations when tab is not visible
- **Hardware Detection**: Adjusts quality based on device capabilities

## 🛠️ Development

### Adding New Sections

1. Add HTML section with unique `id`
2. Update navigation links in `index.html`
3. Add scroll animations in `js/scroll.js`
4. Style in `css/components.css`

### Adding New Animations

```javascript
// In scroll.js setupScrollAnimations()
gsap.fromTo('.new-element',
    { opacity: 0, y: 50 },
    {
        opacity: 1,
        y: 0,
        scrollTrigger: {
            trigger: '.new-element',
            start: 'top 80%'
        }
    }
);
```

## 🔧 Troubleshooting

### Common Issues

1. **Blank screen on file:// protocol**
   - Solution: Use local server (see Running Locally)

2. **Particles not showing**
   - Check browser console for Three.js errors
   - Verify WebGL support: `chrome://gpu/`
   - Fallback CSS animation should still work

3. **Smooth scroll not working**
   - Check Lenis.js loading in console
   - Native smooth scroll fallback is available

4. **Performance issues**
   - Particle count auto-adjusts based on FPS
   - Disable motion in system preferences for minimal animations

### Browser Support

- **Modern Browsers**: Full feature set with Three.js particles
- **Older Browsers**: CSS fallback animations
- **Mobile Devices**: Optimized particle count and performance

## 📄 License

This project is part of the Cinco Doce architecture firm website. All rights reserved.

## 🤝 Contributing

1. Follow existing code organization patterns
2. Test across different devices and browsers
3. Ensure performance optimizations are maintained
4. Update documentation for new features

---

**Happy coding!** 🚀
