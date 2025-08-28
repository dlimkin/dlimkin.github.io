// Language switching functionality
class LanguageManager {
    constructor() {
        this.currentLang = 'en';
        this.languageElements = document.querySelectorAll('[data-en], [data-ru]');
        this.langButtons = {
            en: document.getElementById('en-btn'),
            ru: document.getElementById('ru-btn')
        };

        this.init();
    }

    init() {
        // Set initial language to current
        this.setActiveButton('en');

        // Add event listeners to language buttons
        if (this.langButtons.en) {
            this.langButtons.en.addEventListener('click', () => this.switchLanguage('en'));
        }
        if (this.langButtons.ru) {
            this.langButtons.ru.addEventListener('click', () => this.switchLanguage('ru'));
        }
    }

    switchLanguage(lang) {
        if (this.currentLang === lang) return;

        this.currentLang = lang;
        this.updateContent();
        this.setActiveButton(lang);
    }

    updateContent() {
        this.languageElements.forEach(element => {
            const text = element.getAttribute(`data-${this.currentLang}`);
            if (text !== null) {
                element.textContent = text;
            }

            // Special handling for title attribute if needed
            if (element.hasAttribute(`data-${this.currentLang}-title`)) {
                const title = element.getAttribute(`data-${this.currentLang}-title`);
                element.setAttribute('title', title);
            }
        });

        // Update document language attribute
        document.documentElement.lang = this.currentLang;
    }

    setActiveButton(lang) {
        // Remove active class from all buttons
        Object.values(this.langButtons).forEach(button => {
            if (button) button.classList.remove('active');
        });

        // Add active class to current language button
        if (this.langButtons[lang]) {
            this.langButtons[lang].classList.add('active');
        }
    }
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new LanguageManager();
    initSmoothScrolling();
});

// Add some interactive enhancements
function addInteractiveEnhancements() {
    // Add hover effects for skill items
    const skillItems = document.querySelectorAll('.skill-item');

    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Initialize enhancements after a brief delay to ensure DOM is ready
setTimeout(addInteractiveEnhancements, 100);