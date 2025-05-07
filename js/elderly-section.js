/**
 * Elderly Support Programs JS - Interactive elements and animations
 */

document.addEventListener("DOMContentLoaded", function() {
    // Initialize animations for program cards
    initProgramCards();
    
    // Set up scroll animations
    initScrollAnimations();
    
    // Initialize any interactive elements
    initInteractiveElements();
});

/**
 * Initialize hover effects and animations for program cards
 */
function initProgramCards() {
    const programCards = document.querySelectorAll('.elderly-program-card');
    
    if (programCards.length) {
        programCards.forEach(card => {
            // Add hover class for touch devices
            card.addEventListener('touchstart', function() {
                this.classList.add('hover-active');
            }, {passive: true});
            
            // Remove hover class
            card.addEventListener('mouseleave', function() {
                this.classList.remove('hover-active');
            });
        });
    }
}

/**
 * Initialize scroll-based animations and transitions
 */
function initScrollAnimations() {
    // Using existing GSAP ScrollTrigger setup
    if (typeof ScrollTrigger !== 'undefined' && typeof gsap !== 'undefined') {
        // Animate in elderly needs image when scrolled into view
        gsap.to('.elderly-needs-image-wrap', {
            scrollTrigger: {
                trigger: '.elderly-needs-image-wrap',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out'
        });

        // Staggered animation for program cards
        gsap.to('.elderly-program-card', {
            scrollTrigger: {
                trigger: '.elderly-programs-section',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            },
            opacity: 1,
            y: 0,
            stagger: 0.2,
            duration: 0.8,
            ease: 'power1.out'
        });

        // Impact story animation
        gsap.to('.impact-story-image', {
            scrollTrigger: {
                trigger: '.elderly-impact-section',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            },
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power2.out'
        });

        gsap.to('.impact-story-content', {
            scrollTrigger: {
                trigger: '.elderly-impact-section',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            },
            opacity: 1,
            x: 0,
            duration: 0.8,
            delay: 0.2,
            ease: 'power2.out'
        });
    }
}

/**
 * Initialize any interactive elements like accordions or tabs
 */
function initInteractiveElements() {
    // Program card click handlers for mobile
    const programCards = document.querySelectorAll('.elderly-program-card');
    
    if (programCards.length && window.innerWidth < 768) {
        programCards.forEach(card => {
            card.addEventListener('click', function() {
                // Toggle active class
                const isActive = this.classList.contains('mobile-active');
                
                // Remove active class from all cards
                document.querySelectorAll('.elderly-program-card.mobile-active')
                    .forEach(activeCard => activeCard.classList.remove('mobile-active'));
                
                // If this wasn't active before, make it active
                if (!isActive) {
                    this.classList.add('mobile-active');
                }
            });
        });
    }
    
    // Initialize counter animations for impact numbers
    if (typeof Odometer !== 'undefined') {
        const counterElements = document.querySelectorAll('.elderly-counter');
        
        if (counterElements.length) {
            const initializeCounter = function(element) {
                const target = parseInt(element.getAttribute('data-count') || '0', 10);
                const od = new Odometer({
                    el: element,
                    value: 0,
                    format: '(,ddd)',
                    theme: 'minimal'
                });
                
                // Set up ScrollTrigger for the counter
                ScrollTrigger.create({
                    trigger: element,
                    start: 'top 80%',
                    onEnter: () => { od.update(target); }
                });
            };
            
            counterElements.forEach(initializeCounter);
        }
    }
}

/**
 * Window resize handler for responsive adjustments
 */
window.addEventListener('resize', function() {
    // Re-initialize any size-dependent interactions
    if (window.innerWidth >= 768) {
        document.querySelectorAll('.elderly-program-card.mobile-active')
            .forEach(card => card.classList.remove('mobile-active'));
    }
});