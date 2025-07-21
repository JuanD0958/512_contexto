# Cinco Doce — Architecture Website

This repository contains the full codebase for the official website of **Cinco Doce**, a modern architecture and design firm based in Colombia. The site is designed to be elegant, minimal, fast, responsive, and scalable — serving as a foundation for future expansion into AI-powered interactive services.

---

## 🎯 GOALS (for GitHub Copilot)

Copilot should help build a clean, static website with the following goals:

- Create a **static website** using semantic HTML5 and CSS3 (using [PicoCSS](https://picocss.com/))
- Display **completed architecture projects** in a responsive grid layout
- Add **contact options via WhatsApp and Instagram**
- Use a **custom font** (`.ttf` or `.otf`) hosted locally
- Prioritize **very fast loading** with `.webp` images and lazy loading
- Keep the **code modular and semantic** to support future integrations (AI tools, login, CMS, payments, etc.)

---

## 📁 PROJECT STRUCTURE

/cinco-doce-website
├── index.html # Main landing page
├── style.css # Global styling & font loading
├── script.js # Optional interactivity (menu toggle, etc.)
├── /fonts # Custom fonts
│ └── CincoDoce-Regular.ttf
├── /images # Optimized images in .webp format
│ ├── casa-madera.webp
│ ├── fachada-luz.webp
│ └── ...
└── README.md # Copilot instructions and documentation

---

## 🧱 PAGE SECTIONS

### 1. **Navigation Bar**
- Use semantic `<nav>`
- Logo or name: "Cinco Doce"
- Menu links: `Home`, `Projects`, `Contact`
- Mobile responsive toggle (JS optional)

### 2. **Hero Section**
- Large bold headline, clean layout
- Subheading: e.g. _“Timeless architecture, powered by vision”_
- CTA buttons: “View Projects” and “Contact Us”

### 3. **Projects Section**
- Use `<section>` and `<figure>` with `<img>` and `<figcaption>`
- Responsive grid with:
  - Optimized `.webp` image
  - Project title
  - Short description

### 4. **Contact Section**
- WhatsApp link: `https://wa.me/YOUR_PHONE_NUMBER`
- Instagram: `https://www.instagram.com/______cincodoce/`
- Optional: SVG icons or emojis 📞 📸

### 5. **Footer**
- Small legal/ownership text
- Repeat contact/social links if needed

---

## 🖋️ CUSTOM FONT SETUP

Place font files in `/fonts` and load them in `style.css`:

```css
@font-face {
  font-family: 'CincoDoceFont';
  src: url('./fonts/CincoDoce-Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

body {
  font-family: 'CincoDoceFont', sans-serif;
}


🎨 DESIGN SYSTEM
Use PicoCSS via CDN:

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@1/css/pico.min.css">
<meta name="viewport" content="width=device-width, initial-scale=1">


Neutral color palette: white, black, soft gray

Generous whitespace and padding

Minimalist animations for links/buttons

Accessible and semantic markup

Use HTML5 <section>, <nav>, <figure>, <footer>, etc.


⚡ PERFORMANCE BEST PRACTICES
All images must be .webp (use Squoosh or TinyPNG)

Use loading="lazy" on <img> elements

Avoid unnecessary JavaScript — minimal and purposeful only

Host fonts locally (no external font CDNs)

Add <meta charset="UTF-8"> and SEO meta tags

🔗 CONTACT LINKS
WhatsApp: https://wa.me/YOUR_PHONE_NUMBER

Instagram: @______cincodoce

🚀 CI/CD — Deployment with Vercel
To deploy this static site:

Push your project to GitHub.

Go to https://vercel.com and sign in.

Connect your GitHub account.

Import your repo.

Set Framework = None (Static Site).

Set output directory to / (root).

Enable automatic redeploys on push to main.

🔮 FUTURE-READY ARCHITECTURE (Copilot should account for these)
While not implemented yet, structure the site clearly to support the following:

🔐 Login system (admin panel or client access)

💳 Payment integration (e.g. Stripe, MercadoPago)

🧠 AI tools (e.g. smart quote generators, auto-layout preview)

📰 Blog or case studies (markdown or CMS)

📦 Headless CMS options: Netlify CMS, Contentful

Use clear ids and class names to support modular expansion.

🛠 TECHNOLOGIES USED
Technology	Purpose
HTML5	Semantic structure
CSS3 + PicoCSS	Responsive, elegant styles
JavaScript	Interactivity (optional)
.webp	Optimized image format
.ttf / .otf	Custom branding fonts
Vercel	CI/CD and static deployment

CONSIDERATIONS:


    You are an expert in Bootstrap and modern web application development.

    Key Principles
    - Write clear, concise, and technical responses with precise Bootstrap examples.
    - Utilize Bootstrap's components and utilities to streamline development and ensure responsiveness.
    - Prioritize maintainability and readability; adhere to clean coding practices throughout your HTML and CSS.
    - Use descriptive class names and structure to promote clarity and collaboration among developers.

    Bootstrap Usage
    - Leverage Bootstrap's grid system for responsive layouts; use container, row, and column classes to structure content.
    - Utilize Bootstrap components (e.g., buttons, modals, alerts) to enhance user experience without extensive custom CSS.
    - Apply Bootstrap's utility classes for quick styling adjustments, such as spacing, typography, and visibility.
    - Ensure all components are accessible; use ARIA attributes and semantic HTML where applicable.

    Error Handling and Validation
    - Implement form validation using Bootstrap's built-in styles and classes to enhance user feedback.
    - Use Bootstrap's alert component to display error messages clearly and informatively.
    - Structure forms with appropriate labels, placeholders, and error messages for a better user experience.

    Dependencies
    - Bootstrap (latest version, CSS and JS)
    - Any JavaScript framework (like jQuery, if required) for interactive components.

    Bootstrap-Specific Guidelines
    - Customize Bootstrap's Sass variables and mixins to create a unique theme without overriding default styles.
    - Utilize Bootstrap's responsive utilities to control visibility and layout on different screen sizes.
    - Keep custom styles to a minimum; use Bootstrap's classes wherever possible for consistency.
    - Use the Bootstrap documentation to understand component behavior and customization options.

    Performance Optimization
    - Minimize file sizes by including only the necessary Bootstrap components in your build process.
    - Use a CDN for Bootstrap resources to improve load times and leverage caching.
    - Optimize images and other assets to enhance overall performance, especially for mobile users.

    Key Conventions
    1. Follow Bootstrap's naming conventions and class structures to ensure consistency across your project.
    2. Prioritize responsiveness and accessibility in every stage of development.
    3. Maintain a clear and organized file structure to enhance maintainability and collaboration.

    Refer to the Bootstrap documentation for best practices and detailed examples of usage patterns.
    

## Branding
- the colors we should consider for our page are: 