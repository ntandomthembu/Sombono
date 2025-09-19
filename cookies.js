// Cookie Consent Manager for Sombono
class CookieManager {
    constructor() {
        this.cookieSettings = {
            essential: true, // Always true, cannot be disabled
            analytics: false,
            marketing: false
        };
        this.init();
    }

    init() {
        this.loadCookieSettings();
        this.setupEventListeners();
        this.checkCookieConsent();
    }

    loadCookieSettings() {
        const saved = localStorage.getItem('sombono_cookie_settings');
        if (saved) {
            try {
                this.cookieSettings = { ...this.cookieSettings, ...JSON.parse(saved) };
            } catch (e) {
                console.warn('Failed to parse saved cookie settings');
            }
        }
    }

    saveCookieSettings() {
        localStorage.setItem('sombono_cookie_settings', JSON.stringify(this.cookieSettings));
        localStorage.setItem('sombono_cookie_consent_given', 'true');
        localStorage.setItem('sombono_cookie_consent_date', new Date().toISOString());
    }

    checkCookieConsent() {
        const consentGiven = localStorage.getItem('sombono_cookie_consent_given');
        const consentDate = localStorage.getItem('sombono_cookie_consent_date');
        
        // Show overlay and block page if no consent given or consent is older than 365 days
        if (!consentGiven || this.isConsentExpired(consentDate)) {
            this.showCookieOverlay();
            this.blockPageInteraction();
        } else {
            this.hideCookieOverlay();
            this.unblockPageInteraction();
            this.applyCookieSettings();
        }
    }

    isConsentExpired(dateString) {
        if (!dateString) return true;
        
        const consentDate = new Date(dateString);
        const now = new Date();
        const daysDiff = (now - consentDate) / (1000 * 60 * 60 * 24);
        
        return daysDiff > 365; // Consent expires after 1 year
    }

    showCookieBanner() {
        const banner = document.getElementById('cookieBanner');
        if (banner) {
            // Small delay to ensure page is loaded
            setTimeout(() => {
                banner.classList.add('show');
            }, 1000);
        }
    }

    hideCookieBanner() {
        const banner = document.getElementById('cookieBanner');
        if (banner) {
            banner.classList.remove('show');
        }
    }

    showCookieOverlay() {
        const overlay = document.getElementById('cookieOverlay');
        if (overlay) {
            // Remove any 'hidden' state and add the display classes the stylesheet expects
            overlay.classList.remove('hidden');
            overlay.classList.add('active', 'show');
            // Ensure pointer events are enabled via class; do not rely on inline styles so !important in CSS works
            overlay.style.display = '';
            // Start blocking interactions outside the overlay (but do not disable scrolling)
            this.blockPageInteraction();
        }
    }

    hideCookieOverlay() {
        const overlay = document.getElementById('cookieOverlay');
        if (overlay) {
            // Remove the visible classes and restore hidden state after animations
            overlay.classList.remove('active', 'show');
            overlay.classList.add('hidden');
            // Give CSS time to animate out before fully hiding
            setTimeout(() => {
                overlay.style.display = 'none';
            }, 500);
        }
    }

    blockPageInteraction() {
        // Do not forcibly disable scrolling (prevents published site being unscrollable).
        // Instead only block interactions outside the overlay while still allowing the page to scroll.
        this.blockEvents = ['click', 'mousedown', 'mouseup', 'touchstart', 'touchend', 'keydown', 'keyup'];
        this.blockHandler = (e) => {
            const overlay = document.getElementById('cookieOverlay');
            const overlayContent = document.querySelector('.cookie-overlay-content');

            // Only block interactions when overlay is actively shown (not .hidden)
            if (overlay && !overlay.classList.contains('hidden')) {
                if (overlayContent && !overlayContent.contains(e.target)) {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }
            }
            return true;
        };

        // Add event listeners to document (non-passive for touch to allow preventDefault)
        this.blockEvents.forEach(event => {
            document.addEventListener(event, this.blockHandler, { capture: true, passive: false });
        });
    }

    unblockPageInteraction() {
        // Re-enable scrolling
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        
        // Remove event listeners
        if (this.blockHandler && this.blockEvents) {
            this.blockEvents.forEach(event => {
                document.removeEventListener(event, this.blockHandler, { capture: true });
            });
        }
    }

    showCookieModal() {
        const modal = document.getElementById('cookieModal');
        if (modal) {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
            this.updateModalToggles();
        }
    }

    hideCookieModal() {
        const modal = document.getElementById('cookieModal');
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = ''; // Restore scrolling
        }
    }

    updateModalToggles() {
        document.getElementById('essential').checked = true; // Always checked
        document.getElementById('analytics').checked = this.cookieSettings.analytics;
        document.getElementById('marketing').checked = this.cookieSettings.marketing;
    }

    getModalSettings() {
        return {
            essential: true, // Always true
            analytics: document.getElementById('analytics').checked,
            marketing: document.getElementById('marketing').checked
        };
    }

    acceptAllCookies() {
        this.cookieSettings = {
            essential: true,
            analytics: true,
            marketing: true
        };
        this.saveCookieSettings();
        this.applyCookieSettings();
        this.hideCookieBanner();
        this.showConsentToast('All cookies accepted');
    }

    acceptAllCookiesFromOverlay() {
        this.cookieSettings = {
            essential: true,
            analytics: true,
            marketing: true
        };
        this.saveCookieSettings();
        this.applyCookieSettings();
        this.hideCookieOverlay();
        this.unblockPageInteraction();
        this.showConsentToast('All cookies accepted - Welcome to Sombono!');
    }

    showCookieModalFromOverlay() {
        this.hideCookieOverlay();
        this.showCookieModal();
        // Don't unblock page interaction yet - wait for modal completion
    }

    rejectAllCookies() {
        this.cookieSettings = {
            essential: true,
            analytics: false,
            marketing: false
        };
        this.saveCookieSettings();
        this.applyCookieSettings();
        this.hideCookieBanner();
        this.hideCookieModal();
        this.hideCookieOverlay();
        this.unblockPageInteraction();
        this.showConsentToast('Only essential cookies enabled');
    }

    saveCustomPreferences() {
        this.cookieSettings = this.getModalSettings();
        this.saveCookieSettings();
        this.applyCookieSettings();
        this.hideCookieBanner();
        this.hideCookieModal();
        this.hideCookieOverlay();
        this.unblockPageInteraction();
        this.showConsentToast('Cookie preferences saved');
    }

    applyCookieSettings() {
        // Essential cookies are always active (session management, security, etc.)
        this.setEssentialCookies();

        // Analytics cookies (Google Analytics, etc.)
        if (this.cookieSettings.analytics) {
            this.enableAnalytics();
        } else {
            this.disableAnalytics();
        }

        // Marketing cookies (tracking pixels, retargeting, etc.)
        if (this.cookieSettings.marketing) {
            this.enableMarketing();
        } else {
            this.disableMarketing();
        }
    }

    setEssentialCookies() {
        // Set essential cookies that are required for the website to function
        // These include language preferences, theme settings, etc.
        console.log('Essential cookies enabled');
    }

    enableAnalytics() {
        // Initialize Google Analytics or other analytics tools
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'analytics_storage': 'granted'
            });
        }
        console.log('Analytics cookies enabled');
    }

    disableAnalytics() {
        // Disable analytics tracking
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'analytics_storage': 'denied'
            });
        }
        console.log('Analytics cookies disabled');
    }

    enableMarketing() {
        // Enable marketing/advertising cookies
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'ad_storage': 'granted',
                'ad_user_data': 'granted',
                'ad_personalization': 'granted'
            });
        }
        console.log('Marketing cookies enabled');
    }

    disableMarketing() {
        // Disable marketing/advertising cookies
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied'
            });
        }
        console.log('Marketing cookies disabled');
    }

    showConsentToast(message) {
        // Optimized toast with mobile-first design and performance
        const toast = document.createElement('div');
        toast.className = 'cookie-toast';
        toast.innerHTML = `
            <div class="cookie-toast-content">
                <i class="ri-check-line" aria-hidden="true"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Optimized styles - mobile-first, reduced animations
        if (!document.querySelector('.cookie-toast-styles')) {
            const style = document.createElement('style');
            style.className = 'cookie-toast-styles';
            style.textContent = `
                .cookie-toast {
                    position: fixed;
                    top: 20px;
                    right: 10px;
                    left: 10px;
                    max-width: 360px;
                    margin: 0 auto;
                    background: var(--main-color);
                    color: white;
                    padding: 12px 16px;
                    border-radius: 8px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
                    z-index: 10002;
                    opacity: 0;
                    transform: translateY(-20px);
                    transition: all 0.2s ease;
                    will-change: transform, opacity;
                }
                .cookie-toast.show {
                    opacity: 1;
                    transform: translateY(0);
                }
                .cookie-toast-content {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-weight: 500;
                    font-size: 14px;
                }
                .cookie-toast-content span {
                    color: white !important;
                    line-height: 1.3;
                }
                @media (min-width: 768px) {
                    .cookie-toast {
                        right: 20px;
                        left: auto;
                        max-width: 400px;
                        margin: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(toast);
        // Optimized animation timing
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });
        
        // Auto-remove with cleanup
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                if (toast.parentNode) {
                    document.body.removeChild(toast);
                }
            }, 200);
        }, 3000);
    }

    setupEventListeners() {
        // Accept all cookies button
        const acceptBtn = document.getElementById('acceptCookies');
        if (acceptBtn) {
            acceptBtn.addEventListener('click', () => this.acceptAllCookies());
        }

        // Cookie settings button
        const settingsBtn = document.getElementById('cookieSettings');
        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => this.showCookieModal());
        }

        // Overlay accept button
        const overlayAcceptBtn = document.getElementById('cookieOverlayAccept');
        if (overlayAcceptBtn) {
            overlayAcceptBtn.addEventListener('click', () => this.acceptAllCookiesFromOverlay());
        }

        // Overlay settings button
        const overlaySettingsBtn = document.getElementById('cookieOverlaySettings');
        if (overlaySettingsBtn) {
            overlaySettingsBtn.addEventListener('click', () => this.showCookieModalFromOverlay());
        }

        // Close modal button
        const closeBtn = document.getElementById('closeCookieModal');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.hideCookieModal());
        }

        // Reject all button
        const rejectBtn = document.getElementById('rejectAll');
        if (rejectBtn) {
            rejectBtn.addEventListener('click', () => this.rejectAllCookies());
        }

        // Save preferences button
        const saveBtn = document.getElementById('savePreferences');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => this.saveCustomPreferences());
        }

        // Close modal when clicking outside
        const modal = document.getElementById('cookieModal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.hideCookieModal();
                }
            });
        }

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal && modal.classList.contains('show')) {
                this.hideCookieModal();
            }
        });
    }

    // Public method to check if a specific cookie type is enabled
    isCookieEnabled(type) {
        return this.cookieSettings[type] || false;
    }

    // Public method to get all cookie settings
    getCookieSettings() {
        return { ...this.cookieSettings };
    }

    // Practical usage methods for your website
    trackFormSubmission(formType) {
        if (this.isCookieEnabled('analytics')) {
            // Track form submissions for business intelligence
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submit', {
                    'event_category': 'engagement',
                    'event_label': formType,
                    'value': 1
                });
            }
            
            // Custom tracking for government reporting
            this.logBusinessEvent('form_submission', {
                type: formType,
                timestamp: new Date().toISOString(),
                page: window.location.pathname
            });
        }
    }

    trackServiceInquiry(serviceType, estimatedValue) {
        if (this.isCookieEnabled('analytics')) {
            // Track potential leads
            if (typeof gtag !== 'undefined') {
                gtag('event', 'generate_lead', {
                    'event_category': 'lead_generation',
                    'event_label': serviceType,
                    'value': estimatedValue,
                    'currency': 'ZAR'
                });
            }
        }

        if (this.isCookieEnabled('marketing')) {
            // Marketing retargeting
            if (typeof fbq !== 'undefined') {
                fbq('track', 'Lead', {
                    content_name: serviceType,
                    value: estimatedValue,
                    currency: 'ZAR'
                });
            }
        }
    }

    logBusinessEvent(eventType, data) {
        // Always allowed - essential for business operations
        const event = {
            type: eventType,
            data: data,
            timestamp: new Date().toISOString(),
            sessionId: this.getSessionId()
        };
        
        // Store locally and send to server
        const events = JSON.parse(localStorage.getItem('business_events') || '[]');
        events.push(event);
        localStorage.setItem('business_events', JSON.stringify(events.slice(-50))); // Keep last 50
        
        // Send to server for government compliance logging
        fetch('/api/business-events', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(event)
        }).catch(err => console.log('Event logging failed:', err));
    }

    getSessionId() {
        let sessionId = sessionStorage.getItem('sombono_session_id');
        if (!sessionId) {
            sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            sessionStorage.setItem('sombono_session_id', sessionId);
        }
        return sessionId;
    }

    // Initialize Google Analytics with consent
    initializeAnalytics(trackingId) {
        if (this.isCookieEnabled('analytics')) {
            // Load Google Analytics
            const script = document.createElement('script');
            script.async = true;
            script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
            document.head.appendChild(script);

            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            
            gtag('js', new Date());
            gtag('config', trackingId, {
                'anonymize_ip': true, // GDPR compliance
                'cookie_flags': 'SameSite=Strict;Secure'
            });
            
            console.log('Analytics initialized');
        }
    }

    // Initialize marketing pixels
    initializeMarketing() {
        if (this.isCookieEnabled('marketing')) {
            // Facebook Pixel example
            if (window.FB_PIXEL_ID) {
                !function(f,b,e,v,n,t,s) {
                    if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                    n.queue=[];t=b.createElement(e);t.async=!0;
                    t.src=v;s=b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t,s)}(window,document,'script',
                    'https://connect.facebook.net/en_US/fbevents.js');
                
                fbq('init', window.FB_PIXEL_ID);
                fbq('track', 'PageView');
            }
            
            console.log('Marketing pixels initialized');
        }
    }
}

// Initialize cookie manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.cookieManager = new CookieManager();
    
    // Initialize smooth section transitions
    initSectionTransitions();
});

// Optimized section transitions with reduced performance impact
function initSectionTransitions() {
    const hero = document.querySelector('.hero');
    const about = document.querySelector('.about');
    const transitionElement = document.querySelector('.section-transition');
    
    if (!hero || !about || !transitionElement) return;
    
    // Reduced thresholds for better performance
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: [0, 0.25, 0.5, 0.75, 1.0] // Reduced from 11 to 5 thresholds
    };
    
    // Debounced scroll handler for better performance
    let isScrolling = false;
    
    const heroObserver = new IntersectionObserver((entries) => {
        if (isScrolling) return;
        isScrolling = true;
        
        requestAnimationFrame(() => {
            entries.forEach(entry => {
                const ratio = entry.intersectionRatio;
                
                if (entry.target === hero) {
                    // Simplified animations for mobile
                    if (window.innerWidth <= 768) {
                        hero.style.opacity = ratio > 0.5 ? '1' : '0.8';
                    } else {
                        const opacity = Math.max(0.3, ratio);
                        const translateY = (1 - ratio) * 15; // Reduced movement
                        
                        hero.style.opacity = opacity;
                        hero.style.transform = `translateY(${translateY}px)`;
                    }
                    
                    // Simplified transition element
                    if (ratio < 0.8 && ratio > 0.2) {
                        transitionElement.style.opacity = '1';
                    } else {
                        transitionElement.style.opacity = '0';
                    }
                }
            });
            isScrolling = false;
        });
    }, observerOptions);
    
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.target === about && entry.isIntersecting) {
                // Simplified about animation
                about.style.opacity = '1';
                about.style.transform = 'translateY(0)';
                
                // Staggered animations only on desktop
                if (window.innerWidth > 768) {
                    const aboutImg = about.querySelector('.about-img');
                    const aboutText = about.querySelector('.about-text');
                    
                    if (aboutImg) {
                        setTimeout(() => {
                            aboutImg.style.opacity = '1';
                            aboutImg.style.transform = 'translateX(0) scale(1)';
                        }, 100);
                    }
                    
                    if (aboutText) {
                        setTimeout(() => {
                            aboutText.style.opacity = '1';
                            aboutText.style.transform = 'translateX(0)';
                        }, 200);
                    }
                }
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    });
    
    // Initial setup for about section
    about.style.opacity = '0';
    about.style.transform = 'translateY(30px)';
    about.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    
    // Only add complex animations on desktop
    if (window.innerWidth > 768) {
        const aboutImg = about.querySelector('.about-img');
        const aboutText = about.querySelector('.about-text');
        
        if (aboutImg) {
            aboutImg.style.opacity = '0';
            aboutImg.style.transform = 'translateX(-30px) scale(0.95)';
            aboutImg.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        }
        
        if (aboutText) {
            aboutText.style.opacity = '0';
            aboutText.style.transform = 'translateX(30px)';
            aboutText.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        }
    }
    
    // Setup transition element
    transitionElement.style.opacity = '0';
    transitionElement.style.transition = 'opacity 0.3s ease-out';
    
    // Start observing
    heroObserver.observe(hero);
    aboutObserver.observe(about);
    
    // Optimized scroll effects with throttling
    let ticking = false;
    let lastScrollY = 0;
    
    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        
        // Only update if scroll changed significantly
        if (Math.abs(scrolled - lastScrollY) < 5) {
            ticking = false;
            return;
        }
        
        lastScrollY = scrolled;
        
        // Parallax effect only on desktop and when hero is visible
        if (window.innerWidth > 768 && hero && scrolled < window.innerHeight) {
            const rate = scrolled * -0.3; // Reduced intensity
            hero.style.backgroundPosition = `center ${rate}px`;
        }
        
        ticking = false;
    }
    
    function requestScrollUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    // Only add scroll listener if not on mobile
    if (window.innerWidth > 768) {
        window.addEventListener('scroll', requestScrollUpdate, { passive: true });
    }
    
    // Cleanup on resize
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            window.removeEventListener('scroll', requestScrollUpdate);
        }
    });
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CookieManager;
}
