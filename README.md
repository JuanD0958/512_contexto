# Cinco Doce — Arquitectura Website

Un sitio web moderno y elegante para Cinco Doce, firma de arquitectura y diseño contemporáneo en Colombia.

## 🚀 Características

- **Diseño Moderno**: Interfaz limpia y minimalista usando PicoCSS
- **Totalmente Responsivo**: Optimizado para todos los dispositivos
- **Multiidioma Avanzado**: Dos implementaciones disponibles (Custom + i18next)
- **Rendimiento Optimizado**: Carga rápida con imágenes .webp y lazy loading
- **Fuente Personalizada**: Soporte para tipografía custom de la marca
- **SEO Optimizado**: Meta tags y estructura semántica
- **Accesible**: Cumple con estándares de accesibilidad web

## 🌍 Sistemas de Internacionalización

### **Opción 1: Sistema Custom (Actual - `index.html`)**
✅ **Ventajas:**
- Ultra liviano (~3KB)
- Sin dependencias externas
- Carga instantánea
- Fácil de mantener
- Perfecto para sitios estáticos

❌ **Limitaciones:**
- Sin pluralización automática
- Sin formateo de fechas/números
- Sin interpolación de variables

### **Opción 2: i18next Professional (`index-i18n.html`)**
✅ **Ventajas Avanzadas:**
- **Pluralización inteligente** para todos los idiomas
- **Formateo automático** de fechas y números según locale
- **Interpolación de variables** (ej: "Mostrando {{count}} proyectos")
- **Lazy loading** de traducciones
- **Namespaces** para organizar traducciones
- **Fallbacks** automáticos si falta una traducción
- **Detección automática** de idioma del navegador
- **Transiciones suaves** entre idiomas

❌ **Consideraciones:**
- Mayor tamaño (~50KB adicionales)
- Más complejo de configurar

## 🌍 Comparación de Implementaciones

### Sistema Custom vs i18next

| Característica | Custom | i18next |
|---|---|---|
| **Tamaño del bundle** | ~3KB | ~50KB |
| **Velocidad de carga** | ⚡ Instantáneo | 🟡 Rápido |
| **Configuración** | ✅ Simple | 🟡 Intermedio |
| **Mantenimiento** | ✅ Fácil | 🟡 Moderado |
| **Pluralización** | ❌ Manual | ✅ Automática |
| **Formateo de fechas** | ❌ Manual | ✅ Automático |
| **Variables en texto** | ❌ No | ✅ Sí |
| **Detección de idioma** | ❌ No | ✅ Automática |
| **Namespaces** | ❌ No | ✅ Sí |
| **Lazy loading** | ❌ No | ✅ Sí |

### Ejemplos de Características Avanzadas i18next

#### Pluralización Inteligente
```javascript
// Español: "Mostrando 1 proyecto" vs "Mostrando 5 proyectos"
// Inglés: "Showing 1 project" vs "Showing 5 projects" 
// Árabe: Reglas de plural complejas automáticas
i18next.t('projects.count', { count: 5 })
```

#### Formateo de Fechas por Locale
```javascript
// Español: "15 de marzo de 2024"
// Inglés: "March 15, 2024"
// Árabe: "١٥ مارس ٢٠٢٤"
i18next.t('projects.completed', { date: '2024-03-15' })
```

#### Interpolación de Variables
```javascript
// "© 2025 Cinco Doce. Todos los derechos reservados."
i18next.t('footer.copyright', { year: 2025 })
```

## 🎯 Recomendación

**Para Cinco Doce recomendamos el sistema CUSTOM** porque:
- Su contenido es principalmente estático
- Prioriza velocidad de carga (crucial para arquitectura)
- Fácil mantenimiento
- Todas las funciones necesarias están cubiertas

**Usa i18next SI:**
- Planeas contenido dinámico frecuente
- Necesitas pluralización compleja
- Quieres formateo automático de fechas/números
- El sitio crecerá significativamente

## 📁 Estructura del Proyecto

```
cinco-doce-website/
├── index.html              # Implementación CUSTOM (recomendada)
├── index-i18n.html         # Implementación i18next (avanzada)
├── style.css               # Estilos + soporte multiidioma
├── script.js               # JavaScript custom
├── script-i18n.js          # JavaScript con i18next
├── translations.js         # Traducciones custom
├── i18n-config.js          # Configuración i18next
├── fonts/                  # Fuentes personalizadas
├── images/                 # Imágenes optimizadas
└── README.md               # Este archivo
```

## 🖼️ Imágenes Necesarias

Para completar el sitio, necesitarás agregar las siguientes imágenes en formato .webp (optimizadas para web):

1. `casa-madera.webp` - Casa de Madera Moderna
2. `fachada-luz.webp` - Fachada de Luz
3. `oficinas-minimalistas.webp` - Oficinas Minimalistas
4. `casa-patio.webp` - Casa del Patio
5. `loft-urbano.webp` - Loft Urbano
6. `hotel-boutique.webp` - Hotel Boutique

**Recomendaciones para las imágenes:**
- Formato: .webp para mejor compresión
- Dimensiones: 800x600px mínimo
- Calidad: 85-90% para balance entre calidad y tamaño
- Herramientas recomendadas: [Squoosh](https://squoosh.app/) o [TinyPNG](https://tinypng.com/)

## 🔤 Fuente Personalizada

Agrega tu fuente personalizada en la carpeta `fonts/`:
- Nombre sugerido: `CincoDoce-Regular.ttf`
- El CSS ya está configurado para cargar automáticamente
- Formatos soportados: .ttf, .otf, .woff, .woff2

## 📱 Información de Contacto

Actualiza los siguientes enlaces en `index.html`:

```html
<!-- WhatsApp -->
<a href="https://wa.me/573001234567" target="_blank">

<!-- Instagram -->
<a href="https://www.instagram.com/______cincodoce/" target="_blank">

<!-- Email -->
<p>hola@cincodoce.com</p>
```

## 🌐 Despliegue

### Vercel (Recomendado)
1. Sube el proyecto a GitHub
2. Conecta tu cuenta de GitHub con [Vercel](https://vercel.com)
3. Importa tu repositorio
4. Framework: None (sitio estático)
5. Directorio de salida: `/` (raíz)
6. Configura despliegue automático

### Netlify
1. Arrastra la carpeta del proyecto a [Netlify](https://netlify.com)
2. O conecta con GitHub para despliegue automático

### GitHub Pages
1. Sube a GitHub
2. Ve a Settings > Pages
3. Selecciona la rama `main` como fuente

## 🎨 Personalización

### Colores
Los colores principales se definen en las variables CSS al inicio de `style.css`:

```css
:root {
  --primary-color: #2c2c2c;    /* Color principal */
  --accent-color: #007bff;     /* Color de acento */
  --text-color: #333;          /* Color de texto */
}
```

### Tipografía
Para cambiar la fuente, modifica la regla `@font-face` en `style.css` y actualiza el nombre del archivo.

### Contenido
Edita directamente el contenido en `index.html`:
- Títulos y descripciones de proyectos
- Información de contacto
- Textos del hero y secciones

## 🔧 Desarrollo Local

Simplemente abre `index.html` en tu navegador o usa un servidor local:

```bash
# Con Python
python -m http.server 8000

# Con Node.js (npx)
npx serve .

# Con VS Code Live Server extension
```

## 📈 Métricas y Análisis

El sitio está preparado para futuras integraciones:
- Google Analytics (agregar tracking ID)
- Google Tag Manager
- Facebook Pixel
- Métricas de rendimiento

## 🔮 Funcionalidades Futuras

La arquitectura está diseñada para soportar:
- Sistema de login/admin
- CMS headless (Contentful, Strapi)
- Blog de proyectos
- Herramientas de IA
- Pagos online
- Progressive Web App (PWA)

## 📞 Soporte

Para preguntas sobre el desarrollo o personalizaciones, contacta al equipo de desarrollo.

---

**Cinco Doce** — Arquitectura atemporal, impulsada por la visión

## 🔧 Configuración de Idiomas

### Agregar Nuevos Idiomas

Para agregar un nuevo idioma:

1. Abre `translations.js`
2. Agrega el nuevo código de idioma al objeto `translations`
3. Agrega la configuración del idioma al objeto `languageConfig`
4. Traduce todos los textos necesarios

Ejemplo para agregar Italiano:

```javascript
// En translations.js
it: {
    'nav-home': 'Home',
    'nav-projects': 'Progetti',
    'nav-contact': 'Contatti',
    // ... más traducciones
}

// En languageConfig
it: { name: 'Italiano', flag: '🇮🇹', code: 'IT' }
```

### Modificar Traducciones

Todas las traducciones están centralizadas en `translations.js`. Simplemente modifica los valores para el idioma correspondiente.

### API JavaScript

El sistema de idiomas expone las siguientes funciones:

```javascript
// Cambiar idioma programáticamente
CincoDoce.changeLanguage('en');

// Obtener idioma actual
const current = CincoDoce.getCurrentLanguage();

// Obtener lista de idiomas soportados
const languages = CincoDoce.getSupportedLanguages();
```

## 🎨 Personalización de Idiomas

### Soporte RTL

Para idiomas que se escriben de derecha a izquierda (como el árabe), el sistema automáticamente:
- Cambia la dirección del texto a RTL
- Ajusta el layout de navegación
- Reorganiza elementos de interfaz
- Aplica estilos específicos para RTL

### Fuentes Personalizadas por Idioma

Puedes agregar fuentes específicas para ciertos idiomas modificando el CSS:

```css
/* Ejemplo para idiomas asiáticos */
[lang="zh"], [lang="ja"], [lang="ko"] {
    font-family: 'Noto Sans CJK', 'CincoDoceFont', sans-serif;
}

/* Ejemplo para árabe */
[lang="ar"] {
    font-family: 'Noto Sans Arabic', 'CincoDoceFont', sans-serif;
}
```

## 🔄 Cómo Cambiar Entre Implementaciones

### Para usar el sistema CUSTOM (actual):
1. Usa `index.html` como página principal
2. Incluye `script.js` y `translations.js`
3. Mantiene el máximo rendimiento

### Para cambiar a i18next:
1. Renombra `index.html` a `index-custom.html`
2. Renombra `index-i18n.html` a `index.html` 
3. Verifica que `i18n-config.js` y `script-i18n.js` estén incluidos
4. La configuración está lista para usar

## 🛠️ Configuración i18next (Solo si eliges la opción avanzada)

### Agregar Nuevos Idiomas en i18next
```javascript
// En i18n-config.js, agrega al objeto i18nResources:
pt: {
    translation: {
        nav: {
            home: "Início",
            projects: "Projetos", 
            contact: "Contato"
        },
        // ... más traducciones
    }
}
```

### API JavaScript i18next
```javascript
// Cambiar idioma
await CincoDoce.changeLanguage('en');

// Obtener traducción con variables
const text = CincoDoce.translate('projects.count', { count: 6 });

// Formatear fecha según idioma actual
const formattedDate = CincoDoce.formatDate('2024-03-15', 'es');
```
