// Our Work Page JavaScript
document.addEventListener('DOMContentLoaded', function () {
    // Initialize animations for the intro section
    initIntroSectionAnimations();

    // Add observation for statistics items
    initStatisticsAnimation();

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
                        if (delay === "0.35") entry.target.classList.add('intro-animation-delay-3');
                        if (delay === "0.15") entry.target.classList.add('intro-animation-delay-1');
                        if (delay === "0.25") entry.target.classList.add('intro-animation-delay-2');
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
                if (delay === "0.35") el.classList.add('intro-animation-delay-3');
                if (delay === "0.15") el.classList.add('intro-animation-delay-1');
                if (delay === "0.25") el.classList.add('intro-animation-delay-2');
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

// New function to handle statistics animations
function initStatisticsAnimation() {
    const statItems = document.querySelectorAll('.stat-item');

    if ("IntersectionObserver" in window && statItems.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5,
            rootMargin: '0px 0px -10% 0px'
        });

        statItems.forEach(item => observer.observe(item));
    } else {
        // Fallback - add the class immediately
        statItems.forEach(item => item.classList.add('in-view'));
    }
}

function handleResponsiveLayouts() {
    // Adjust stats grid layout depending on screen size
    const statsGrid = document.querySelector('.stats-grid');

    if (!statsGrid) return;

    // Adjust grid columns based on screen width
    if (window.innerWidth <= 575) {
        // For very small screens
        statsGrid.style.gridTemplateColumns = 'repeat(1, 1fr)';
    } else if (window.innerWidth <= 767) {
        // For small screens
        statsGrid.style.gridTemplateColumns = 'repeat(1, 1fr)';
    } else {
        // For larger screens
        statsGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
    }
}

// Utility function to debounce resize events
function debounce(func, delay) {
    let timeout;
    return function () {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), delay);
    };
}