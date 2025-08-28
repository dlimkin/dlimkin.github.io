// Configuration for funding addresses
const fundingConfig = {
    btc: {
        name: 'BTC',
        address: 'bc1qsrl63vcuqnmp6drl3f6uhcvnky2t5vqlg2r2jq',
        link: 'https://link.trustwallet.com/send?asset=c0&address=bc1qsrl63vcuqnmp6drl3f6uhcvnky2t5vqlg2r2jq',
    },
    eth: {
        name: 'ETH (ERC-20)',
        address: '0xd1ce59aD3615cdbFCc8cc2C496E9CB0E10CD543B',
        link: 'https://link.trustwallet.com/send?asset=c60&address=0xd1ce59aD3615cdbFCc8cc2C496E9CB0E10CD543B',
    },
    trx: {
        name: 'TRON (TRC-20)',
        address: 'TZ84vr4XcuKcQZAsEJUdyvq5FT6LG66NjX',
        link: 'https://link.trustwallet.com/send?asset=c195&address=TZ84vr4XcuKcQZAsEJUdyvq5FT6LG66NjX',
    },
    sol: {
        name: 'SOLANA',
        address: 'BE3hxHZfbk7qpgPtG7hARXJrGJjpwbd1eu9geYtUZNob',
        link: 'https://link.trustwallet.com/send?address=BE3hxHZfbk7qpgPtG7hARXJrGJjpwbd1eu9geYtUZNob&asset=c501',
    }
};

// Funding Management functionality
class FundingManager {
    constructor() {
        this.init();
    }

    init() {
        this.renderFundingItems();
        this.initCopyHandlers();
    }

    renderFundingItems() {
        const fundingContainer = document.querySelector('.funding-info');
        if (!fundingContainer) return;

        let html = '';

        Object.keys(fundingConfig).forEach(cryptoKey => {
            const crypto = fundingConfig[cryptoKey];
            html += `
                <div class="funding-item">
                    <strong>${crypto.name}</strong>
                    <div class="address-container">
                     <a href="${crypto.link}" target="_blank" class="qr-link" title="Показать QR код">
                            <img src="img/qr_${cryptoKey}_address.jpg" alt="QR код для ${crypto.name}" class="qr-code-thumb">
                        </a>
                        <code class="address-text" data-address="${crypto.address}">${crypto.address}</code>
                        <button class="copy-btn" data-address="${crypto.address}" title="Копировать адрес">
                            ⧉
                        </button>
                       
                    </div>
                </div>
            `;
        });

        fundingContainer.innerHTML = html;
    }

    initCopyHandlers() {
        document.querySelectorAll('.copy-btn').forEach(btn => {
            btn.addEventListener('click', () => this.copyToClipboard(btn.dataset.address, btn));
        });
    }

    async copyToClipboard(text, button) {
        try {
            await navigator.clipboard.writeText(text);
            this.showCopySuccess(button);
        } catch (err) {
            console.error('Failed to copy text: ', err);
            this.fallbackCopyTextToClipboard(text, button);
        }
    }

    fallbackCopyTextToClipboard(text, button) {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            this.showCopySuccess(button);
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
        }
        document.body.removeChild(textArea);
    }

    showCopySuccess(button) {
        const originalText = button.textContent;
        button.textContent = '✓';
        button.style.color = 'var(--success-color)';
        button.title = 'Скопировано!';

        setTimeout(() => {
            button.textContent = originalText;
            button.style.color = '';
            button.title = 'Копировать адрес';
        }, 2000);
    }
}

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
    new FundingManager();
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