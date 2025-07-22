// Page Loader Controller
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
        if (!this.loaderElement || !this.mainContent) return;
        
        // Add fade-out class to loader
        this.loaderElement.classList.add('fade-out');
        
        // Show main content
        this.mainContent.classList.add('fade-in');
        
        // Remove loader from DOM after transition
        setTimeout(() => {
            if (this.loaderElement && this.loaderElement.parentNode) {
                this.loaderElement.parentNode.removeChild(this.loaderElement);
            }
        }, 1000); // Match the CSS transition duration
    }
}

// Initialize loader when script loads
const pageLoader = new PageLoader();

// Cinco Doce Website JavaScript
// Minimal and purposeful interactivity

// Translation System
const translations = {
    es: {
        'nav-home': 'Inicio',
        'nav-projects': 'Proyectos',
        'nav-contact': 'Contacto',
        'hero-title': 'Arquitectura atemporal, impulsada por la visión',
        'hero-subtitle': 'Creamos espacios únicos que transforman la forma de vivir y trabajar, combinando diseño innovador con funcionalidad excepcional.',
        'btn-view-projects': 'Ver Proyectos',
        'btn-contact': 'Contáctanos',
        'projects-title': 'Nuestros Proyectos',
        'projects-subtitle': 'Una selección de nuestros trabajos más representativos',
        'project1-title': 'Casa de Madera Moderna',
        'project1-desc': 'Residencia unifamiliar que combina materiales naturales con líneas contemporáneas, creando un espacio cálido y sofisticado.',
        'project2-title': 'Fachada de Luz',
        'project2-desc': 'Edificio comercial con fachada dinámica que juega con la luz natural y artificial para crear una experiencia visual única.',
        'project3-title': 'Oficinas Minimalistas',
        'project3-desc': 'Espacio de trabajo que maximiza la productividad a través del diseño limpio y la optimización de la luz natural.',
        'project4-title': 'Casa del Patio',
        'project4-desc': 'Vivienda que reinterpreta el concepto tradicional del patio colonial con un enfoque contemporáneo y sostenible.',
        'project5-title': 'Loft Urbano',
        'project5-desc': 'Transformación de un espacio industrial en un hogar moderno que celebra la historia del edificio.',
        'project6-title': 'Hotel Boutique',
        'project6-desc': 'Proyecto hotelero que fusiona la arquitectura local con amenidades de lujo para una experiencia única.',
        'contact-title': 'Contáctanos',
        'contact-subtitle': 'Hablemos sobre tu próximo proyecto',
        'footer-tagline': 'Arquitectura moderna para un mundo en evolución',
        'footer-copyright': '© 2025 Cinco Doce. Todos los derechos reservados.'
    },
    en: {
        'nav-home': 'Home',
        'nav-projects': 'Projects',
        'nav-contact': 'Contact',
        'hero-title': 'Timeless architecture, driven by vision',
        'hero-subtitle': 'We create unique spaces that transform the way we live and work, combining innovative design with exceptional functionality.',
        'btn-view-projects': 'View Projects',
        'btn-contact': 'Contact Us',
        'projects-title': 'Our Projects',
        'projects-subtitle': 'A selection of our most representative work',
        'project1-title': 'Modern Wood House',
        'project1-desc': 'Single-family residence that combines natural materials with contemporary lines, creating a warm and sophisticated space.',
        'project2-title': 'Light Facade',
        'project2-desc': 'Commercial building with dynamic facade that plays with natural and artificial light to create a unique visual experience.',
        'project3-title': 'Minimalist Offices',
        'project3-desc': 'Workspace that maximizes productivity through clean design and natural light optimization.',
        'project4-title': 'Courtyard House',
        'project4-desc': 'Housing that reinterprets the traditional concept of the colonial courtyard with a contemporary and sustainable approach.',
        'project5-title': 'Urban Loft',
        'project5-desc': 'Transformation of an industrial space into a modern home that celebrates the building\'s history.',
        'project6-title': 'Boutique Hotel',
        'project6-desc': 'Hotel project that merges local architecture with luxury amenities for a unique experience.',
        'contact-title': 'Contact Us',
        'contact-subtitle': 'Let\'s talk about your next project',
        'footer-tagline': 'Modern architecture for an evolving world',
        'footer-copyright': '© 2025 Cinco Doce. All rights reserved.'
    },
    fr: {
        'nav-home': 'Accueil',
        'nav-projects': 'Projets',
        'nav-contact': 'Contact',
        'hero-title': 'Architecture intemporelle, guidée par la vision',
        'hero-subtitle': 'Nous créons des espaces uniques qui transforment notre façon de vivre et de travailler, combinant design innovant et fonctionnalité exceptionnelle.',
        'btn-view-projects': 'Voir les Projets',
        'btn-contact': 'Contactez-nous',
        'projects-title': 'Nos Projets',
        'projects-subtitle': 'Une sélection de nos travaux les plus représentatifs',
        'project1-title': 'Maison en Bois Moderne',
        'project1-desc': 'Résidence unifamiliale qui combine matériaux naturels et lignes contemporaines, créant un espace chaleureux et sophistiqué.',
        'project2-title': 'Façade de Lumière',
        'project2-desc': 'Bâtiment commercial avec façade dynamique qui joue avec la lumière naturelle et artificielle pour créer une expérience visuelle unique.',
        'project3-title': 'Bureaux Minimalistes',
        'project3-desc': 'Espace de travail qui maximise la productivité grâce à un design épuré et l\'optimisation de la lumière naturelle.',
        'project4-title': 'Maison à Cour',
        'project4-desc': 'Logement qui réinterprète le concept traditionnel de la cour coloniale avec une approche contemporaine et durable.',
        'project5-title': 'Loft Urbain',
        'project5-desc': 'Transformation d\'un espace industriel en maison moderne qui célèbre l\'histoire du bâtiment.',
        'project6-title': 'Hôtel Boutique',
        'project6-desc': 'Projet hôtelier qui fusionne l\'architecture locale avec des équipements de luxe pour une expérience unique.',
        'contact-title': 'Contactez-nous',
        'contact-subtitle': 'Parlons de votre prochain projet',
        'footer-tagline': 'Architecture moderne pour un monde en évolution',
        'footer-copyright': '© 2025 Cinco Doce. Tous droits réservés.'
    },
    pt: {
        'nav-home': 'Início',
        'nav-projects': 'Projetos',
        'nav-contact': 'Contato',
        'hero-title': 'Arquitetura atemporal, impulsionada pela visão',
        'hero-subtitle': 'Criamos espaços únicos que transformam a forma de viver e trabalhar, combinando design inovador com funcionalidade excepcional.',
        'btn-view-projects': 'Ver Projetos',
        'btn-contact': 'Contate-nos',
        'projects-title': 'Nossos Projetos',
        'projects-subtitle': 'Uma seleção de nossos trabalhos mais representativos',
        'project1-title': 'Casa de Madeira Moderna',
        'project1-desc': 'Residência unifamiliar que combina materiais naturais com linhas contemporâneas, criando um espaço acolhedor e sofisticado.',
        'project2-title': 'Fachada de Luz',
        'project2-desc': 'Edifício comercial com fachada dinâmica que brinca com luz natural e artificial para criar uma experiência visual única.',
        'project3-title': 'Escritórios Minimalistas',
        'project3-desc': 'Espaço de trabalho que maximiza a produtividade através do design limpo e otimização da luz natural.',
        'project4-title': 'Casa do Pátio',
        'project4-desc': 'Habitação que reinterpreta o conceito tradicional do pátio colonial com uma abordagem contemporânea e sustentável.',
        'project5-title': 'Loft Urbano',
        'project5-desc': 'Transformação de um espaço industrial em uma casa moderna que celebra a história do edifício.',
        'project6-title': 'Hotel Boutique',
        'project6-desc': 'Projeto hoteleiro que funde a arquitetura local com amenidades de luxo para uma experiência única.',
        'contact-title': 'Contate-nos',
        'contact-subtitle': 'Vamos falar sobre seu próximo projeto',
        'footer-tagline': 'Arquitetura moderna para um mundo em evolução',
        'footer-copyright': '© 2025 Cinco Doce. Todos os direitos reservados.'
    },
    it: {
        'nav-home': 'Home',
        'nav-projects': 'Progetti',
        'nav-contact': 'Contatto',
        'hero-title': 'Architettura senza tempo, guidata dalla visione',
        'hero-subtitle': 'Creiamo spazi unici che trasformano il modo di vivere e lavorare, combinando design innovativo con funzionalità eccezionale.',
        'btn-view-projects': 'Vedi Progetti',
        'btn-contact': 'Contattaci',
        'projects-title': 'I Nostri Progetti',
        'projects-subtitle': 'Una selezione dei nostri lavori più rappresentativi',
        'project1-title': 'Casa in Legno Moderna',
        'project1-desc': 'Residenza unifamiliare che combina materiali naturali con linee contemporanee, creando uno spazio accogliente e sofisticato.',
        'project2-title': 'Facciata di Luce',
        'project2-desc': 'Edificio commerciale con facciata dinamica che gioca con luce naturale e artificiale per creare un\'esperienza visiva unica.',
        'project3-title': 'Uffici Minimalisti',
        'project3-desc': 'Spazio di lavoro che massimizza la produttività attraverso design pulito e ottimizzazione della luce naturale.',
        'project4-title': 'Casa del Cortile',
        'project4-desc': 'Abitazione che reinterpreta il concetto tradizionale del cortile coloniale con un approccio contemporaneo e sostenibile.',
        'project5-title': 'Loft Urbano',
        'project5-desc': 'Trasformazione di uno spazio industriale in una casa moderna che celebra la storia dell\'edificio.',
        'project6-title': 'Hotel Boutique',
        'project6-desc': 'Progetto alberghiero che fonde l\'architettura locale con servizi di lusso per un\'esperienza unica.',
        'contact-title': 'Contattaci',
        'contact-subtitle': 'Parliamo del tuo prossimo progetto',
        'footer-tagline': 'Architettura moderna per un mondo in evoluzione',
        'footer-copyright': '© 2025 Cinco Doce. Tutti i diritti riservati.'
    },
    de: {
        'nav-home': 'Startseite',
        'nav-projects': 'Projekte',
        'nav-contact': 'Kontakt',
        'hero-title': 'Zeitlose Architektur, von Vision getrieben',
        'hero-subtitle': 'Wir schaffen einzigartige Räume, die die Art zu leben und arbeiten transformieren, innovative Gestaltung mit außergewöhnlicher Funktionalität verbindend.',
        'btn-view-projects': 'Projekte Ansehen',
        'btn-contact': 'Kontaktieren Sie Uns',
        'projects-title': 'Unsere Projekte',
        'projects-subtitle': 'Eine Auswahl unserer repräsentativsten Arbeiten',
        'project1-title': 'Modernes Holzhaus',
        'project1-desc': 'Einfamilienresidenz, die natürliche Materialien mit zeitgenössischen Linien verbindet und einen warmen und raffinierten Raum schafft.',
        'project2-title': 'Lichtfassade',
        'project2-desc': 'Kommerzgebäude mit dynamischer Fassade, die mit natürlichem und künstlichem Licht spielt, um eine einzigartige visuelle Erfahrung zu schaffen.',
        'project3-title': 'Minimalistische Büros',
        'project3-desc': 'Arbeitsraum, der Produktivität durch sauberes Design und Optimierung des natürlichen Lichts maximiert.',
        'project4-title': 'Hofhaus',
        'project4-desc': 'Wohnraum, der das traditionelle Konzept des kolonialen Hofes mit einem zeitgenössischen und nachhaltigen Ansatz neu interpretiert.',
        'project5-title': 'Urbanes Loft',
        'project5-desc': 'Transformation eines Industrieraums in ein modernes Zuhause, das die Geschichte des Gebäudes feiert.',
        'project6-title': 'Boutique-Hotel',
        'project6-desc': 'Hotelprojekt, das lokale Architektur mit Luxusannehmlichkeiten für eine einzigartige Erfahrung verschmilzt.',
        'contact-title': 'Kontaktieren Sie Uns',
        'contact-subtitle': 'Sprechen wir über Ihr nächstes Projekt',
        'footer-tagline': 'Moderne Architektur für eine sich entwickelnde Welt',
        'footer-copyright': '© 2025 Cinco Doce. Alle Rechte vorbehalten.'
    }
};

// Translation function
function translatePage(language) {
    const elements = document.querySelectorAll('[data-translate]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[language] && translations[language][key]) {
            element.textContent = translations[language][key];
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // Language Selector Functionality
    const langBtn = document.getElementById('lang-btn');
    const langDropdown = document.getElementById('lang-dropdown');
    const langOptions = document.querySelectorAll('.lang-option');

    if (langBtn && langDropdown) {
        // Toggle dropdown on button click
        langBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const isActive = langBtn.classList.contains('active');
            langBtn.classList.toggle('active', !isActive);
            langDropdown.classList.toggle('active', !isActive);
        });

        // Handle language selection
        langOptions.forEach(option => {
            option.addEventListener('click', function(e) {
                e.stopPropagation();
                const selectedLang = this.getAttribute('data-lang');
                
                // Update button display
                const flag = this.querySelector('.lang-flag').textContent;
                const code = selectedLang.toUpperCase();
                
                langBtn.querySelector('.lang-flag').textContent = flag;
                langBtn.querySelector('.lang-code').textContent = code;
                
                // Update active state
                langOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
                
                // Close dropdown
                langBtn.classList.remove('active');
                langDropdown.classList.remove('active');
                
                // Store selection in localStorage
                localStorage.setItem('selectedLanguage', selectedLang);
                
                // Update document language attribute
                document.documentElement.lang = selectedLang;
                
                // Translate the page content
                translatePage(selectedLang);
                
                console.log(`Language changed to: ${selectedLang}`);
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(event) {
            if (!langBtn.contains(event.target) && !langDropdown.contains(event.target)) {
                langBtn.classList.remove('active');
                langDropdown.classList.remove('active');
            }
        });

        // Initialize with saved language
        const savedLang = localStorage.getItem('selectedLanguage') || 'es';
        const savedOption = document.querySelector(`[data-lang="${savedLang}"]`);
        if (savedOption) {
            // Update UI without triggering click event
            const flag = savedOption.querySelector('.lang-flag').textContent;
            const code = savedLang.toUpperCase();
            
            langBtn.querySelector('.lang-flag').textContent = flag;
            langBtn.querySelector('.lang-code').textContent = code;
            
            savedOption.classList.add('active');
            document.documentElement.lang = savedLang;
        }
        
        // Translate page on load
        translatePage(savedLang);
    }

    // Smooth scrolling for internal links (fallback for older browsers)
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        function updateNavbar() {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(18, 18, 18, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
            } else {
                navbar.style.background = 'rgba(18, 18, 18, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        }

        window.addEventListener('scroll', updateNavbar);
        updateNavbar(); // Initial call
    }

    // Lazy loading fallback for older browsers
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // Simple fade-in animation for project cards
    if ('IntersectionObserver' in window) {
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Initialize cards with hidden state
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            cardObserver.observe(card);
        });
    }

    // Contact button analytics (placeholder for future implementation)
    const contactButtons = document.querySelectorAll('.contact-card[href]');
    contactButtons.forEach(button => {
        button.addEventListener('click', function() {
            const contactType = this.classList.contains('whatsapp') ? 'WhatsApp' : 'Instagram';
            console.log(`Contact clicked: ${contactType}`);
            
            // Future: Add analytics tracking here
            // Example: gtag('event', 'contact_click', { method: contactType });
        });
    });

    // Performance: Preload critical resources
    function preloadCriticalResources() {
        const criticalImages = [
            'images/casa-madera.webp',
            'images/fachada-luz.webp'
        ];

        criticalImages.forEach(imageSrc => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = imageSrc;
            document.head.appendChild(link);
        });
    }

    // Call preload after page load
    window.addEventListener('load', preloadCriticalResources);

    // Error handling for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.warn(`Failed to load image: ${this.src}`);
            // Future: Add fallback image or placeholder
        });
    });

    // Simple form validation (for future contact forms)
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Export functions for potential future use
    window.CincoDoce = {
        validateEmail,
        // Future functions can be added here
    };
});

// Service Worker registration (for future PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Future: Register service worker for offline capabilities
        console.log('Service Worker support detected - ready for future PWA implementation');
    });
}

// Performance monitoring (basic)
window.addEventListener('load', function() {
    if ('performance' in window) {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log(`Page load time: ${perfData.loadEventEnd - perfData.loadEventStart}ms`);
            
            // Future: Send performance data to analytics
        }, 0);
    }
});
