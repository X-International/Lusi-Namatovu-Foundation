// Our Work Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations for the intro section
    initIntroSectionAnimations();
    
    // Add hover effects to stats bar
    initStatsBarEffects();
    
    // Check viewport size and adjust elements
    handleResponsiveLayouts();
    
    // Listen for window resize to adjust layouts
    window.addEventListener('resize', debounce(handleResponsiveLayouts, 250));
});

function initIntroSectionAnimations() {
    // Animate elements when they come into view
    const animatedElements = document.querySelectorAll('.intro-animation-trigger');
    
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add appropriate animation class
                    entry.target.classList.add('intro-animation');
                    
                    // Add delay classes if specified
                    const delay = entry.target.dataset.delay;
                    if (delay) {
                        if (delay === "0.1") entry.target.classList.add('intro-animation-delay-1');
                        if (delay === "0.2") entry.target.classList.add('intro-animation-delay-2');
                        if (delay === "0.3") entry.target.classList.add('intro-animation-delay-3');
                    }
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.2,
            rootMargin: '0px 0px -10% 0px'
        });
        
        animatedElements.forEach(el => observer.observe(el));
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        animatedElements.forEach(el => {
            el.classList.add('intro-animation');
            
            // Add delay classes if specified
            const delay = el.dataset.delay;
            if (delay) {
                if (delay === "0.1") el.classList.add('intro-animation-delay-1');
                if (delay === "0.2") el.classList.add('intro-animation-delay-2');
                if (delay === "0.3") el.classList.add('intro-animation-delay-3');
            }
        });
    }
    
    // Add decorative shapes to the intro section
    addDecorativeShapes();
}

function addDecorativeShapes() {
    const introSection = document.querySelector('.intro-section');
    if (!introSection) return;
    
    // Create and append decorative shapes only if they don't already exist
    if (!introSection.querySelector('.intro-shape-1')) {
        const shape1 = document.createElement('div');
        shape1.className = 'intro-decorative-shape intro-shape-1';
        introSection.appendChild(shape1);
    }
    
    if (!introSection.querySelector('.intro-shape-2')) {
        const shape2 = document.createElement('div');
        shape2.className = 'intro-decorative-shape intro-shape-2';
        introSection.appendChild(shape2);
    }
}

function initStatsBarEffects() {
    const statsBar = document.querySelector('.stats-bar');
    if (!statsBar) return;
    
    // Add hover effects and transitions
    statsBar.addEventListener('mouseenter', function() {
        const statItems = this.querySelectorAll('.stat-item');
        statItems.forEach((item, index) => {
            // Stagger animation for each stat item
            setTimeout(() => {
                item.style.transform = 'translateY(-3px)';
                item.style.color = '#0e98f1';
            }, index * 100);
        });
    });
    
    statsBar.addEventListener('mouseleave', function() {
        const statItems = this.querySelectorAll('.stat-item');
        statItems.forEach(item => {
            item.style.transform = '';
            item.style.color = '';
        });
    });
}

function handleResponsiveLayouts() {
    // Adjust stats bar depending on screen size
    const statsBar = document.querySelector('.stats-bar');
    const statsContent = document.querySelector('.stats-content');
    
    if (!statsBar || !statsContent) return;
    
    // For very small screens, ensure the stats are vertically stacked
    if (window.innerWidth <= 360) {
        statsContent.style.flexDirection = 'column';
        
        // Hide dividers on small screens
        const statDividers = document.querySelectorAll('.stat-divider');
        statDividers.forEach(divider => {
            divider.style.display = 'none';
        });
    } else {
        statsContent.style.flexDirection = '';
        
        // Show dividers on larger screens
        const statDividers = document.querySelectorAll('.stat-divider');
        if (window.innerWidth >= 768) {
            statDividers.forEach(divider => {
                divider.style.display = 'inline';
            });
        } else {
            statDividers.forEach(divider => {
                divider.style.display = 'none';
            });
        }
    }
}

// Utility function to debounce resize events
function debounce(func, delay) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), delay);
    };
}