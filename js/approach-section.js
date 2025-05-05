/**
 * Interactive Approach Section Script
 * Adds interactive functionality to the approach section cards
 * with accessibility considerations
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize approach card interactions
    initApproachCards();
    
    // Initialize intersection observer for animation on scroll
    initScrollAnimation();
});

/**
 * Initialize approach card interactive elements
 */
function initApproachCards() {
    const cards = document.querySelectorAll('.approach-card');
    
    cards.forEach(card => {
        // Add keyboard accessibility
        card.setAttribute('tabindex', '0');
        
        // Handle card interactions for both mouse and keyboard
        card.addEventListener('mouseenter', function() {
            activateCard(this);
        });
        
        card.addEventListener('mouseleave', function() {
            deactivateCard(this);
        });
        
        card.addEventListener('focus', function() {
            activateCard(this);
        });
        
        card.addEventListener('blur', function() {
            deactivateCard(this);
        });
        
        // Add keyboard enter/space handling
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                
                // Find the learn more link in this card and click it
                const learnMoreLink = this.querySelector('.approach-learn-more');
                if (learnMoreLink) {
                    learnMoreLink.click();
                }
            }
        });
    });
}

/**
 * Activate a card when it receives focus or hover
 */
function activateCard(card) {
    card.classList.add('card-active');
    
    // Only animate if user hasn't requested reduced motion
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const icon = card.querySelector('.approach-card-icon');
        if (icon) {
            // Add a subtle animation to the icon
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        }
    }
}

/**
 * Deactivate a card when it loses focus or hover
 */
function deactivateCard(card) {
    card.classList.remove('card-active');
    
    // Only animate if user hasn't requested reduced motion
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const icon = card.querySelector('.approach-card-icon');
        if (icon) {
            // Reset the icon animation
            icon.style.transform = '';
        }
    }
}

/**
 * Initialize intersection observer for scroll-based animations
 */
function initScrollAnimation() {
    // Only proceed if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const cards = document.querySelectorAll('.approach-card');
        
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add animation class when card comes into view
                    setTimeout(() => {
                        entry.target.classList.add('show');
                    }, 100);
                    
                    // Once animation is done, unobserve the element
                    cardObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2, // Trigger when 20% of the card is visible
            rootMargin: '0px 0px -10% 0px' // Slightly adjust when the animation triggers
        });
        
        // Observe each card
        cards.forEach((card, index) => {
            // Add a base "hidden" class for the initial state
            card.classList.add('hidden');
            
            // Stagger the animation delay based on card position
            card.style.transitionDelay = `${index * 0.1}s`;
            
            // Start observing the card
            cardObserver.observe(card);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        document.querySelectorAll('.approach-card').forEach(card => {
            card.classList.add('show');
        });
    }
}

// Add CSS animations for the observer to use
document.addEventListener('DOMContentLoaded', function() {
    // Insert CSS for animations if not already in stylesheet
    if (!document.getElementById('approach-animations-css')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'approach-animations-css';
        styleSheet.textContent = `
            .approach-card.hidden {
                opacity: 0;
                transform: translateY(30px);
            }
            
            .approach-card.show {
                opacity: 1;
                transform: translateY(0);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            
            @media (prefers-reduced-motion: reduce) {
                .approach-card.hidden,
                .approach-card.show {
                    transition: none;
                    transform: none;
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(styleSheet);
    }
});