# Cinco Doce — Arquitectura Website

![Cinco Doce Logo](images/logo_orange.webp)

Un sitio web moderno y elegante para **Cinco Doce**, firma de arquitectura y diseño contemporáneo en Colombia. El sitio combina diseño minimalista con animaciones sofisticadas para crear una experiencia inmersiva que refleja la filosofía de la empresa: "Arquitectura atemporal, impulsada por la visión".

## 🌟 Características Principales

### 🎨 **Diseño y Experiencia**
- **Interfaz Minimalista**: Diseño limpio que enfoca la atención en los proyectos
- **Totalmente Responsivo**: Experiencia optimizada para todos los dispositivos
- **Animaciones Cinematográficas**: Transiciones suaves y efectos visuales elegantes
- **Tipografía Personalizada**: Fuente custom `cincodoce-font.ttf` para identidad de marca
- **Tema Oscuro Elegante**: Paleta de colores sophisticated en tonos oscuros

### ⚡ **Rendimiento y Tecnología**
- **Carga Ultra Rápida**: Imágenes optimizadas en formato WebP con lazy loading
- **Scroll Suave Cinematográfico**: Implementado con Lenis.js para fluidez premium
- **Partículas 3D Interactivas**: Sistema de partículas Three.js que responde al scroll
- **Animaciones de Alto Rendimiento**: GSAP para animaciones fluidas y optimizadas
- **SEO Completamente Optimizado**: Meta tags, Open Graph, y estructura semántica

### 🏗️ **Arquitectura del Código**
- **Modular y Escalable**: Código organizado en módulos independientes
- **ES6+ JavaScript**: Sintaxis moderna y buenas prácticas
- **CSS Organizados**: Variables CSS, metodología component-based
- **Sin Dependencias CDN**: Todas las librerías servidas localmente

## 🚀 Demo en Vivo

Visita el sitio en producción: [cincodocestudio.com](https://cincodocestudio.com)

## 📁 Estructura del Proyecto

```
cinco-doce-website/
├── 📄 index.html              # Página principal
├── 📦 package.json            # Configuración del proyecto
├── ⚙️ start-dev.sh            # Script de desarrollo
│
├── 🎨 css/                    # Estilos organizados
│   ├── pico.min.css          # Framework CSS base (minimalista)
│   ├── base.css              # Variables, fuentes, estilos base
│   └── components.css        # Componentes específicos y animaciones
│
├── ⚡ js/                     # JavaScript modular
│   ├── 📚 libs/              # Librerías externas (locales)
│   │   ├── gsap.min.js       # Animaciones de alto rendimiento
│   │   ├── lenis.min.js      # Scroll suave cinematográfico
│   │   ├── ScrollTrigger.min.js # Animaciones basadas en scroll
│   │   ├── three.min.js      # Motor 3D para partículas
│   │   └── three.module.js   # Módulos Three.js
│   │
│   ├── 🔄 loader.js          # Sistema de carga de página
│   ├── 🎯 main.js            # Controlador principal de la app
│   ├── 🧭 navigation.js      # Lógica de navegación
│   ├── ✨ particles.js       # Sistema de partículas 3D
│   ├── 🖼️ projects-slider.js  # Carrusel de proyectos
│   └── 📜 scroll.js          # Configuración de scroll suave
│
├── 🔤 fonts/                 # Tipografía personalizada
│   └── cincodoce-font.ttf    # Fuente custom de la marca
│
├── 🖼️ images/                # Assets optimizados
│   ├── contexto_concrete.webp # Imagen principal proyectos
│   ├── favicon.ico           # Favicon del sitio
│   ├── instagram_logo.webp   # Icono Instagram
│   ├── logo_orange.webp      # Logo principal
│   └── whatsapp_logo.webp    # Icono WhatsApp
│
└── 📖 README.md              # Esta documentación
```

## 🛠️ Tecnologías Utilizadas

| Tecnología | Propósito | Versión |
|------------|-----------|---------|
| **HTML5** | Estructura semántica | Latest |
| **CSS3** | Estilos y animaciones | Latest |
| **JavaScript ES6+** | Lógica e interactividad | Latest |
| **Three.js** | Gráficos 3D y partículas | Latest |
| **GSAP** | Animaciones premium | Latest |
| **Lenis** | Scroll suave cinematográfico | Latest |
| **PicoCSS** | Framework CSS minimalista | v1.5+ |

## 🚀 Instalación y Desarrollo

### Requisitos Previos
- Node.js 14.0.0 o superior
- NPM (incluido con Node.js)
- Git

### Instalación Rápida

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/cinco-doce-website.git
cd cinco-doce-website

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

El sitio estará disponible en `http://localhost:3000`

### Opciones de Desarrollo

#### 🟢 **Método Recomendado (NPM)**
```bash
npm run dev          # Servidor con auto-apertura del navegador
npm start            # Servidor básico en puerto 3000
```

#### 🔧 **Script de Desarrollo Personalizado**
```bash
# Hacer ejecutable (solo primera vez)
chmod +x start-dev.sh

# Ejecutar
./start-dev.sh
```

#### 🐍 **Servidor Python (Alternativo)**
```bash
npm run serve        # Usa Python HTTP server
```

#### 🆚 **VS Code Live Server**
Instala la extensión "Live Server" y abre `index.html`

## 🎨 Personalización

### 🎨 **Colores y Tema**

Los colores se definen en `css/base.css`:

```css
:root {
  /* Colores principales */
  --color-background-primary: #121212;   /* Fondo principal */
  --color-background-secondary: #1C1C1C; /* Fondo secundario */
  --color-accent: #e85015;                /* Color de acento (naranja) */
  --color-text-primary: #FFFFFF;         /* Texto principal */
  --color-text-secondary: #B3B3B3;       /* Texto secundario */
}
```

### 🔤 **Tipografía**

Para cambiar la fuente personalizada:

1. Coloca la nueva fuente en `fonts/`
2. Actualiza en `css/base.css`:

```css
@font-face {
  font-family: 'CincoDoceFont';
  src: url('../fonts/tu-nueva-fuente.ttf') format('truetype');
  font-display: swap;
}
```

### 📝 **Contenido**

Edita directamente en `index.html`:
- Textos del hero section
- Información de proyectos
- Datos de contacto
- Meta tags SEO

### ✨ **Animaciones**

Las animaciones se configuran en `css/components.css`:
- Hero SVG animations
- Transiciones de componentes
- Efectos hover y estados

## 📞 Información de Contacto

Actualiza los enlaces de contacto en `index.html`:

```html
<!-- WhatsApp -->
<a href="https://wa.me/573001234567" target="_blank" rel="noopener">

<!-- Instagram -->
<a href="https://www.instagram.com/______cincodoce/" target="_blank" rel="noopener">

<!-- Email -->
<p>contexto512studio@gmail.com</p>
```

## 🌐 Despliegue en Producción

### 🔥 **Vercel (Recomendado)**
```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel

# Configuración:
# Framework: None (sitio estático)
# Build Command: [dejar vacío]
# Output Directory: [dejar vacío - usa raíz]
```

### 🚀 **Netlify**
1. Arrastra la carpeta del proyecto a [netlify.com](https://netlify.com)
2. O conecta con GitHub para despliegue automático
3. Build settings: deja todo en blanco (sitio estático)

### 📄 **GitHub Pages**
```bash
# En tu repositorio GitHub:
# Settings > Pages > Source: Deploy from branch > main
```

### 🐳 **Docker (Opcional)**
```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
```

## 🔧 Scripts Disponibles

```bash
npm run dev      # Servidor desarrollo con auto-apertura
npm start        # Servidor desarrollo básico
npm run build    # No se requiere build (archivos estáticos)
npm run serve    # Servidor Python alternativo
```

## 🎯 Características Técnicas Avanzadas

### ✨ **Sistema de Partículas**
- Renderizado WebGL con Three.js
- Partículas que responden al scroll
- Optimizado para 60fps en dispositivos móviles
- Efectos de profundidad y parallax

### 📜 **Scroll Cinematográfico**
- Lenis.js para suavidad premium
- Interpolación personalizada
- ScrollTrigger para animaciones basadas en posición
- Optimizado para rendimiento

### 🔄 **Sistema de Carga**
- Loader SVG personalizado con animación
- Carga progresiva de assets
- Transiciones suaves entre estados
- Fallbacks para compatibilidad

### 🎨 **Animaciones Hero**
- SVG animado con trazos progresivos
- Delays escalonados para efecto cinematográfico
- Tipografía animada palabra por palabra
- Responsive en todos los dispositivos

## 📊 Optimizaciones de Rendimiento

### 🖼️ **Imágenes**
- Formato WebP para 30-50% menos peso
- Lazy loading nativo para carga rápida
- Dimensiones optimizadas para diferentes viewports

### 💾 **Caching**
- Service Worker ready (futuro)
- Headers de cache optimizados
- Compresión gzip/brotli en servidor

### 📱 **Mobile First**
- Diseño responsive desde mobile
- Touch gestures optimizados
- Animaciones adaptadas para dispositivos táctiles

## 🔮 Roadmap y Futuras Características

### 🔐 **Fase 2: Backend**
- [ ] Sistema de login para admin
- [ ] CMS headless (Strapi/Contentful)
- [ ] API para gestión de proyectos

### 🤖 **Fase 3: IA y Automatización**
- [ ] Generador automático de cotizaciones
- [ ] Chatbot con IA para consultas
- [ ] Análisis automático de fotos de proyectos

### 💳 **Fase 4: E-commerce**
- [ ] Sistema de pagos (Stripe/MercadoPago)
- [ ] Productos digitales (planos, consultas)
- [ ] Subscripciones para servicios premium

### 📈 **Fase 5: Analytics**
- [ ] Dashboard de métricas avanzadas
- [ ] A/B testing automatizado
- [ ] Heatmaps y análisis de UX

## 🐛 Solución de Problemas

### ❌ **Problemas Comunes**

**El servidor no inicia:**
```bash
# Verificar Node.js
node --version  # Debe ser 14.0.0+

# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

**Las animaciones no funcionan:**
- Verifica que JavaScript esté habilitado
- Revisa la consola del navegador para errores
- Asegúrate de que los archivos JS se cargan correctamente

**Las imágenes no cargan:**
- Verifica que las rutas sean correctas
- Confirma que el servidor sirve archivos estáticos
- Revisa permisos de archivos

### 🔍 **Debug Mode**

Para desarrolladores, agrega esto a la consola:
```javascript
// Habilitar logs detallados
window.DEBUG_MODE = true;

// Ver estado de la aplicación
console.log(window.CincoDoce);
```

## 🤝 Contribución

Este es un proyecto privado para Cinco Doce. Para sugerencias o mejoras:

1. Crea un issue describiendo la mejora
2. Fork el proyecto (si tienes acceso)
3. Crea una rama para tu feature
4. Commit tus cambios
5. Crea un Pull Request

## 📜 Licencia

© 2025 Cinco Doce. Todos los derechos reservados.

Este proyecto es propiedad de Cinco Doce y está protegido por derechos de autor. No está permitido el uso, distribución o modificación sin autorización expresa.

## 👥 Créditos

**Diseño y Desarrollo:** Equipo Cinco Doce  
**Arquitectura Web:** Especialistas en desarrollo frontend  
**Consultoría UX:** Expertos en experiencia de usuario  

---

### 🏗️ **Cinco Doce** — *Arquitectura atemporal, impulsada por la visión*

**¿Tienes un proyecto en mente?**  
📞 [WhatsApp](https://wa.me/573001234567) | 📸 [Instagram](https://www.instagram.com/______cincodoce/) | ✉️ contexto512studio@gmail.com
