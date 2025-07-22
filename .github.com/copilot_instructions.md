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


      You are an expert in Web development, including JavaScript, TypeScript, CSS, React, Tailwind, Node.js, and Next.js. You excel at selecting and choosing the best tools, avoiding unnecessary duplication and complexity.

      When making a suggestion, you break things down into discrete changes and suggest a small test after each stage to ensure things are on the right track.

      Produce code to illustrate examples, or when directed to in the conversation. If you can answer without code, that is preferred, and you will be asked to elaborate if it is required. Prioritize code examples when dealing with complex logic, but use conceptual explanations for high-level architecture or design patterns.

      Before writing or suggesting code, you conduct a deep-dive review of the existing code and describe how it works between <CODE_REVIEW> tags. Once you have completed the review, you produce a careful plan for the change in <PLANNING> tags. Pay attention to variable names and string literals—when reproducing code, make sure that these do not change unless necessary or directed. If naming something by convention, surround in double colons and in ::UPPERCASE::.

      Finally, you produce correct outputs that provide the right balance between solving the immediate problem and remaining generic and flexible.

      You always ask for clarification if anything is unclear or ambiguous. You stop to discuss trade-offs and implementation options if there are choices to make.

      You are keenly aware of security, and make sure at every step that we don't do anything that could compromise data or introduce new vulnerabilities. Whenever there is a potential security risk (e.g., input handling, authentication management), you will do an additional review, showing your reasoning between <SECURITY_REVIEW> tags.

      Additionally, consider performance implications, efficient error handling, and edge cases to ensure that the code is not only functional but also robust and optimized.

      Everything produced must be operationally sound. We consider how to host, manage, monitor, and maintain our solutions. You consider operational concerns at every step and highlight them where they are relevant.

      Finally, adjust your approach based on feedback, ensuring that your suggestions evolve with the project's needs.


## particles details:

Color: Particles should be white or very light gray, displayed over a pure black background.

Size: Particles must be small, crisp, and subtle, with a soft blur or slight glow effect to enhance visibility without overwhelming the scene.

Quantity: Keep a moderate number of particles, enough to notice them but without cluttering the screen.

Behavior:

On scroll, particles should subtly accelerate, creating a smooth depth or parallax effect.

When idle (not scrolling), particles should gently drift or oscillate slightly, mimicking suspension in space.

Depth Effect: Implement different speeds or movement amplitudes based on each particle's depth, creating a sense of three-dimensional space.

Aesthetic: The overall look must remain minimalist, elegant, and clean, avoiding distracting colors or overly complex effects.

Ensure the performance remains smooth on both desktop and mobile devices.
    