// Translation system for Sombono website
class TranslationManager {
    constructor() {
        this.currentLanguage = 'en';
        this.translations = {};
        this.init();
    }

    init() {
        this.loadTranslations();
        this.setupLanguageSwitcher();
        this.setLanguageFromStorage();
    }

    loadTranslations() {
        this.translations = {
            en: {
                // Navigation
                'home': 'Home',
                'about': 'About',
                'services': 'Services',
                'portfolio': 'Portfolio',
                'contact-us': 'Contact Us',
                'language': 'English',

                // Hero Section
                'hero-subtitle': 'Software Development & Digital Solutions',
                'hero-title-1': 'Building',
                'hero-title-2': 'Tomorrow\'s',
                'hero-title-3': 'Technology',
                'hero-title-4': 'Today',
                'hero-description': 'We create cutting-edge software solutions that transform businesses and drive innovation. From custom applications to digital transformation, we deliver excellence.',
                'start-project': 'Start a Project',
                'our-services': 'Our Services',

                // About Section
                'about-title': 'Technology Partners for Growth',
                'about-description': 'From strategy and design to development, testing and deployment, we challenge conventional thinking to understand your business and engineer solutions that deliver measurable returns. We specialize in custom software development, digital transformation, and innovative technology solutions that help businesses achieve their full potential in the digital age.',

                // Services Section
                'services-title': 'Our Services',
                'services-description': 'From strategy and design to development, testing and deployment, we deliver solutions that drive real returns.',
                'service-custom-software': 'Custom Software',
                'service-custom-software-desc': 'Enterprise applications, digital platforms, and mobile apps tailored to your business requirements and built with modern technologies.',
                'service-data-analytics': 'Data & Analytics',
                'service-data-analytics-desc': 'Business intelligence, data science, and data engineering solutions that transform raw data into actionable insights for better decision-making.',
                'service-product-design': 'Product Design',
                'service-product-design-desc': 'Product strategy, design thinking, and user experience solutions that create intuitive and engaging digital experiences.',
                'service-digital-transformation': 'Digital Transformation',
                'service-digital-transformation-desc': 'Culture, products, and channels transformation to help businesses adapt and thrive in the digital economy.',
                'service-strategy-advisory': 'Strategy & Advisory',
                'service-strategy-advisory-desc': 'Better software, better teams, and better technology investments through strategic guidance and expert consultation.',
                'enquire-now': 'Enquire Now',

                // Join Section
                'join-title': 'Join Our Team',
                'join-description': 'Ready to make an impact? We\'re looking for passionate innovators, creative problem-solvers, and tech enthusiasts to join our growing team across South Africa and the Netherlands.',
                'join-email': 'Ready to grow with us? Send your CV to careers@sombono.co.za',

                // Urgency CTA
                'urgency-title': 'Ready to Dominate Your Market?',
                'urgency-description': 'Don\'t let competitors get ahead. Join 50+ successful businesses who chose Sombono',
                'urgency-consultation': 'Limited Time: Free Consultation',
                'urgency-slots': 'Only 3 Slots Left This Month',
                'claim-consultation': 'Claim Your Free Consultation',

                // Contact Section
                'contact-title': 'Get in Touch',
                'contact-description': 'Ready to transform your ideas into reality? Let\'s start a conversation.',
                'contact-phone': 'Phone',
                'contact-email': 'Email',
                'contact-location': 'Location',
                'contact-response': 'Response Time',
                'contact-response-time': 'Within 24 hours',

                // Cookie Consent
                'cookie-title': 'We use cookies',
                'cookie-description': 'We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.',
                'cookie-settings': 'Settings',
                'cookie-accept': 'Accept All',
                'cookie-required-title': 'Cookie Consent Required',
                'cookie-required-desc': 'To ensure compliance with privacy regulations and provide you with the best experience, please accept our cookie policy to continue using this website.',
                'cookie-preferences': 'Cookie Preferences',
                'cookie-modal-description': 'Manage your cookie preferences. You can enable or disable different types of cookies below.',
                'cookie-essential': 'Essential Cookies',
                'cookie-essential-desc': 'These cookies are necessary for the website to function and cannot be switched off.',
                'cookie-analytics': 'Analytics Cookies',
                'cookie-analytics-desc': 'These cookies help us understand how visitors interact with our website.',
                'cookie-marketing': 'Marketing Cookies',
                'cookie-marketing-desc': 'These cookies are used to deliver relevant advertisements to you.',
                'cookie-reject': 'Reject All',
                'cookie-save': 'Save Preferences'
            },
            nl: {
                // Navigation
                'home': 'Home',
                'about': 'Over Ons',
                'services': 'Diensten',
                'portfolio': 'Portfolio',
                'contact-us': 'Contact',
                'language': 'Nederlands',

                // Hero Section
                'hero-subtitle': 'Software Ontwikkeling & Digitale Oplossingen',
                'hero-title-1': 'Bouwen',
                'hero-title-2': 'Van Morgen\'s',
                'hero-title-3': 'Technologie',
                'hero-title-4': 'Vandaag',
                'hero-description': 'Wij creëren geavanceerde software-oplossingen die bedrijven transformeren en innovatie stimuleren. Van maatwerk applicaties tot digitale transformatie, wij leveren excellentie.',
                'start-project': 'Start een Project',
                'our-services': 'Onze Diensten',

                // About Section
                'about-title': 'Technologie Partners voor Groei',
                'about-description': 'Van strategie en ontwerp tot ontwikkeling, testen en implementatie, dagen wij conventioneel denken uit om uw bedrijf te begrijpen en oplossingen te ontwikkelen die meetbare resultaten opleveren. Wij specialiseren ons in maatwerk software-ontwikkeling, digitale transformatie en innovatieve technologie-oplossingen die bedrijven helpen hun volledige potentieel te bereiken in het digitale tijdperk.',

                // Services Section
                'services-title': 'Onze Diensten',
                'services-description': 'Van strategie en ontwerp tot ontwikkeling, testen en implementatie, wij leveren oplossingen die echte resultaten opleveren.',
                'service-custom-software': 'Maatwerk Software',
                'service-custom-software-desc': 'Bedrijfsapplicaties, digitale platforms en mobiele apps op maat van uw bedrijfsvereisten en gebouwd met moderne technologieën.',
                'service-data-analytics': 'Data & Analytics',
                'service-data-analytics-desc': 'Business intelligence, data science en data engineering oplossingen die ruwe data transformeren in bruikbare inzichten voor betere besluitvorming.',
                'service-product-design': 'Product Ontwerp',
                'service-product-design-desc': 'Productstrategie, design thinking en gebruikerservaring oplossingen die intuïtieve en boeiende digitale ervaringen creëren.',
                'service-digital-transformation': 'Digitale Transformatie',
                'service-digital-transformation-desc': 'Cultuur-, product- en kanaaltransformatie om bedrijven te helpen zich aan te passen en te gedijen in de digitale economie.',
                'service-strategy-advisory': 'Strategie & Advies',
                'service-strategy-advisory-desc': 'Betere software, betere teams en betere technologie-investeringen door strategische begeleiding en expert consultatie.',
                'enquire-now': 'Informeer Nu',

                // Join Section
                'join-title': 'Word Lid van Ons Team',
                'join-description': 'Klaar om impact te maken? We zoeken gepassioneerde innovators, creatieve probleemoplossers en tech-enthousiastelingen om ons groeiende team in Zuid-Afrika en Nederland te versterken.',
                'join-email': 'Klaar om met ons te groeien? Stuur je CV naar careers@sombono.co.za',

                // Urgency CTA
                'urgency-title': 'Klaar om Je Markt te Domineren?',
                'urgency-description': 'Laat concurrenten niet voorop lopen. Sluit je aan bij 50+ succesvolle bedrijven die voor Sombono kozen',
                'urgency-consultation': 'Beperkte Tijd: Gratis Consultatie',
                'urgency-slots': 'Slechts 3 Plekken Over Deze Maand',
                'claim-consultation': 'Claim Je Gratis Consultatie',

                // Contact Section
                'contact-title': 'Neem Contact Op',
                'contact-description': 'Klaar om je ideeën om te zetten in realiteit? Laten we een gesprek starten.',
                'contact-phone': 'Telefoon',
                'contact-email': 'E-mail',
                'contact-location': 'Locatie',
                'contact-response': 'Reactietijd',
                'contact-response-time': 'Binnen 24 uur',

                // Cookie Consent
                'cookie-title': 'Wij gebruiken cookies',
                'cookie-description': 'Wij gebruiken cookies om uw browse-ervaring te verbeteren, gepersonaliseerde content te leveren en ons verkeer te analyseren. Door op "Alles Accepteren" te klikken, stemt u in met ons gebruik van cookies.',
                'cookie-settings': 'Instellingen',
                'cookie-accept': 'Alles Accepteren',
                'cookie-required-title': 'Cookie Toestemming Vereist',
                'cookie-required-desc': 'Om naleving van privacyregels te waarborgen en u de beste ervaring te bieden, accepteer alstublieft ons cookiebeleid om deze website te blijven gebruiken.',
                'cookie-preferences': 'Cookie Voorkeuren',
                'cookie-modal-description': 'Beheer uw cookie voorkeuren. U kunt verschillende soorten cookies hieronder in- of uitschakelen.',
                'cookie-essential': 'Essentiële Cookies',
                'cookie-essential-desc': 'Deze cookies zijn noodzakelijk voor het functioneren van de website en kunnen niet worden uitgeschakeld.',
                'cookie-analytics': 'Analytics Cookies',
                'cookie-analytics-desc': 'Deze cookies helpen ons begrijpen hoe bezoekers interacteren met onze website.',
                'cookie-marketing': 'Marketing Cookies',
                'cookie-marketing-desc': 'Deze cookies worden gebruikt om relevante advertenties aan u te leveren.',
                'cookie-reject': 'Alles Weigeren',
                'cookie-save': 'Voorkeuren Opslaan'
            }
        };
    }

    setupLanguageSwitcher() {
        const languageBtn = document.getElementById('languageBtn');
        const languageOptions = document.getElementById('languageOptions');
        const optionElements = document.querySelectorAll('.language-option');

        if (languageBtn && languageOptions) {
            // Toggle dropdown
            languageBtn.addEventListener('click', (e) => {
                e.preventDefault();
                languageOptions.classList.toggle('active');
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!languageBtn.contains(e.target) && !languageOptions.contains(e.target)) {
                    languageOptions.classList.remove('active');
                }
            });

            // Handle language selection
            optionElements.forEach(option => {
                option.addEventListener('click', (e) => {
                    e.preventDefault();
                    const lang = option.getAttribute('data-lang');
                    this.setLanguage(lang);
                    languageOptions.classList.remove('active');
                });
            });
        }
    }

    setLanguage(lang) {
        this.currentLanguage = lang;
        this.updateContent();
        this.updateDropdownState();
        this.saveLanguageToStorage();
    }

    updateContent() {
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = this.translations[this.currentLanguage][key];
            
            if (translation) {
                // Handle elements with HTML content (like links with icons)
                if (element.innerHTML.includes('<i class=')) {
                    // Preserve icon HTML
                    const iconMatch = element.innerHTML.match(/<i[^>]*><\/i>/);
                    if (iconMatch) {
                        element.innerHTML = translation + ' ' + iconMatch[0];
                    } else {
                        element.textContent = translation;
                    }
                } else {
                    element.textContent = translation;
                }
            }
        });
    }

    updateDropdownState() {
        const currentFlag = document.querySelector('.current-flag');
        const optionElements = document.querySelectorAll('.language-option');
        
        // Update current flag display
        if (currentFlag) {
            const flagUrls = {
                'en': 'https://flagcdn.com/w20/za.png',
                'nl': 'https://flagcdn.com/w20/nl.png'
            };
            currentFlag.src = flagUrls[this.currentLanguage];
            currentFlag.alt = this.currentLanguage === 'en' ? 'South Africa' : 'Netherlands';
        }
        
        // Update active state in dropdown
        optionElements.forEach(option => {
            option.classList.remove('active');
            if (option.getAttribute('data-lang') === this.currentLanguage) {
                option.classList.add('active');
            }
        });
    }

    saveLanguageToStorage() {
        localStorage.setItem('sombono-language', this.currentLanguage);
    }

    setLanguageFromStorage() {
        const savedLanguage = localStorage.getItem('sombono-language');
        if (savedLanguage && this.translations[savedLanguage]) {
            this.setLanguage(savedLanguage);
        }
    }
}

// Initialize translation system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.translationManager = new TranslationManager();
    
    // Wait a bit for all elements to load, then initialize mobile language dropdown
    setTimeout(initializeMobileLanguageDropdown, 500);
});

// Enhanced mobile language switching
function initializeMobileLanguageDropdown() {
    const languageBtn = document.getElementById('languageBtn');
    const languageOptions = document.getElementById('languageOptions');
    const languageContainer = document.querySelector('.language-dropdown-container');
    
    console.log('Language elements:', { languageBtn, languageOptions, languageContainer });
    
    if (!languageBtn || !languageOptions || !languageContainer) {
        console.error('Language dropdown elements not found!');
        return;
    }
    
    let isDropdownOpen = false;
    
    // Force show language button on mobile
    function ensureMobileVisibility() {
        if (window.innerWidth <= 768) {
            languageContainer.style.display = 'flex';
            languageContainer.style.visibility = 'visible';
            languageContainer.style.opacity = '1';
            languageBtn.style.display = 'flex';
            languageBtn.style.visibility = 'visible';
            languageBtn.style.opacity = '1';
        }
    }
    
    // Call on load and resize
    ensureMobileVisibility();
    window.addEventListener('resize', ensureMobileVisibility);
    
    function toggleLanguageDropdown(e) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('Toggle dropdown clicked, current state:', isDropdownOpen);
        
        isDropdownOpen = !isDropdownOpen;
        
        if (isDropdownOpen) {
            languageOptions.classList.add('active');
            languageContainer.classList.add('active');
            languageBtn.setAttribute('aria-expanded', 'true');
            
            // Prevent body scroll on mobile
            if (window.innerWidth <= 768) {
                document.body.style.overflow = 'hidden';
            }
            
            console.log('Dropdown opened');
        } else {
            closeLanguageDropdown();
        }
    }
    
    function closeLanguageDropdown() {
        isDropdownOpen = false;
        languageOptions.classList.remove('active');
        languageContainer.classList.remove('active');
        languageBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        
        console.log('Dropdown closed');
    }
    
    function selectLanguage(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const option = e.target.closest('.language-option');
        if (!option) return;
        
        const selectedLang = option.getAttribute('data-lang');
        console.log('Language selected:', selectedLang);
        
        // Update flag
        const selectedFlag = option.querySelector('.flag-icon');
        const currentFlag = document.querySelector('.current-flag');
        
        if (selectedFlag && currentFlag) {
            currentFlag.src = selectedFlag.src;
            currentFlag.alt = selectedFlag.alt;
        }
        
        // Update active state
        document.querySelectorAll('.language-option').forEach(opt => {
            opt.classList.remove('active');
        });
        option.classList.add('active');
        
        // Change language
        if (window.translationManager && typeof window.translationManager.setLanguage === 'function') {
            window.translationManager.setLanguage(selectedLang);
        }
        
        // Close dropdown
        closeLanguageDropdown();
        
        // Mobile feedback
        if ('vibrate' in navigator && window.innerWidth <= 768) {
            navigator.vibrate(50);
        }
        
        // Show toast
        showMobileToast(selectedLang === 'en' ? 'English Selected' : 'Nederlands Geselecteerd');
    }
    
    function showMobileToast(message) {
        // Remove existing toast
        const existingToast = document.querySelector('.mobile-language-toast');
        if (existingToast) {
            existingToast.remove();
        }
        
        const toast = document.createElement('div');
        toast.className = 'mobile-language-toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => toast.classList.add('show'), 100);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    }
    
    // Remove existing event listeners to prevent duplicates
    const newLanguageBtn = languageBtn.cloneNode(true);
    languageBtn.parentNode.replaceChild(newLanguageBtn, languageBtn);
    
    // Add event listeners
    newLanguageBtn.addEventListener('click', toggleLanguageDropdown);
    newLanguageBtn.addEventListener('touchstart', function(e) {
        e.preventDefault();
        toggleLanguageDropdown(e);
    }, { passive: false });
    
    // Language selection
    languageOptions.addEventListener('click', selectLanguage);
    languageOptions.addEventListener('touchstart', function(e) {
        selectLanguage(e);
    }, { passive: false });
    
    // Close on outside click
    document.addEventListener('click', function(e) {
        if (!languageContainer.contains(e.target) && isDropdownOpen) {
            closeLanguageDropdown();
        }
    });
    
    document.addEventListener('touchstart', function(e) {
        if (!languageContainer.contains(e.target) && isDropdownOpen) {
            closeLanguageDropdown();
        }
    });
    
    // Close on escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isDropdownOpen) {
            closeLanguageDropdown();
        }
    });
    
    // Handle mobile menu integration
    const menuIcon = document.getElementById('menu-icon');
    if (menuIcon) {
        menuIcon.addEventListener('click', function() {
            closeLanguageDropdown();
            // Ensure language button stays visible even when mobile menu is open
            setTimeout(ensureMobileVisibility, 100);
        });
    }
    
    console.log('Mobile language dropdown initialized successfully');
    
    // Initialize mobile fallback button
    initializeMobileFallback();
}

// Mobile fallback language button
function initializeMobileFallback() {
    const mobileLangBtn = document.getElementById('mobileLangBtn');
    const mobileCurrentFlag = document.getElementById('mobileCurrentFlag');
    
    if (!mobileLangBtn || !mobileCurrentFlag) {
        console.log('Mobile fallback elements not found');
        return;
    }
    
    let currentLang = 'en';
    
    function toggleMobileLanguage() {
        // Switch between languages
        currentLang = currentLang === 'en' ? 'nl' : 'en';
        
        // Update flag
        const newFlag = currentLang === 'en' ? 
            'https://flagcdn.com/24x18/za.png' : 
            'https://flagcdn.com/24x18/nl.png';
        
        mobileCurrentFlag.src = newFlag;
        mobileCurrentFlag.alt = currentLang === 'en' ? 'South Africa' : 'Netherlands';
        
        // Update main dropdown flag too
        const mainCurrentFlag = document.querySelector('.current-flag');
        if (mainCurrentFlag) {
            mainCurrentFlag.src = newFlag;
            mainCurrentFlag.alt = mobileCurrentFlag.alt;
        }
        
        // Change language
        if (window.translationManager && typeof window.translationManager.setLanguage === 'function') {
            window.translationManager.setLanguage(currentLang);
        }
        
        // Mobile feedback
        if ('vibrate' in navigator) {
            navigator.vibrate(100);
        }
        
        // Show toast
        showMobileToast(currentLang === 'en' ? 'English Selected' : 'Nederlands Geselecteerd');
        
        console.log('Mobile fallback: Language changed to', currentLang);
    }
    
    mobileLangBtn.addEventListener('click', toggleMobileLanguage);
    mobileLangBtn.addEventListener('touchstart', function(e) {
        e.preventDefault();
        toggleMobileLanguage();
    }, { passive: false });
    
    console.log('Mobile fallback button initialized');
}
