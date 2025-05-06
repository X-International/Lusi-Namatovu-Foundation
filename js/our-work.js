// Our Work Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations for the intro section
    initIntroSectionAnimations();
    
    // Add hover effects to stats bar
    initStatsBarEffects();
});

function initIntroSectionAnimations() {
    // Animate elements when they come into view
    const animatedElements = document.querySelectorAll('.intro-animation-trigger');
    
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('intro-animation');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        animatedElements.forEach(el => observer.observe(el));
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        animatedElements.forEach(el => el.classList.add('intro-animation'));
    }
    
    // Add decorative shapes to the intro section
    addDecorativeShapes();
}

function addDecorativeShapes() {
    const introSection = document.querySelector('.intro-section');
    if (!introSection) return;
    
    // Create and append decorative shapes
    const shape1 = document.createElement('div');
    shape1.className = 'intro-decorative-shape intro-shape-1';
    
    const shape2 = document.createElement('div');
    shape2.className = 'intro-decorative-shape intro-shape-2';
    
    introSection.appendChild(shape1);
    introSection.appendChild(shape2);
}

function initStatsBarEffects() {
    const statsBar = document.querySelector('.stats-bar');
    if (!statsBar) return;
    
    // Add hover effects and transitions
    statsBar.addEventListener('mouseenter', function() {
        const statItems = this.querySelectorAll('.stat-item');
        statItems.forEach((item, index) => {
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