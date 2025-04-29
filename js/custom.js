/**
 * Modern Page Header functionality
 * Controls animations and scroll behavior
 * With improved performance and accessibility
 */
document.addEventListener('DOMContentLoaded', function() {
    // Initialize modern page header if it exists
    const pageHeader = document.querySelector('.modern-page-header');
    if (pageHeader) {
        initModernPageHeader();
    }
});

function initModernPageHeader() {
    // Ensure background image is visible on all devices
    const bgImage = document.querySelector('.mph-background-image');
    const bgContainer = document.querySelector('.mph-background-container');
    
    if (bgImage) {
        // Force visibility of background image
        bgImage.style.opacity = '1';
        
        // Ensure container has fallback background color
        if (bgContainer) {
            bgContainer.style.backgroundColor = '#1a2526';
        }
    }
    
    // Animate elements with staggered timing
    setTimeout(function() {
        const animatedElements = document.querySelectorAll('[data-animation="fade-up"]');
        
        animatedElements.forEach(element => {
            const delay = parseFloat(element.getAttribute('data-delay') || 0);
            setTimeout(() => {
                element.classList.add('animated');
            }, delay * 1000);
        });
    }, 300);
    
    // Simple overlay darkening effect when scrolling
    let ticking = false;
    const overlay = document.querySelector('.mph-overlay');

    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const scrolled = window.scrollY;
                
                if (overlay && scrolled < 300) {
                    // Smooth transition for overlay darkness
                    const alpha = Math.min(0.75, 0.5 + scrolled * 0.001);
                    overlay.style.backgroundColor = `rgba(0, 0, 0, ${alpha})`;
                }
                
                ticking = false;
            });
            
            ticking = true;
        }
    });
    
    // Dynamically adjust title size for better readability
    const title = document.querySelector('.mph-title');
    if (title) {
        const checkOverflow = function() {
            if (title.offsetHeight > title.offsetWidth * 0.4) {
                title.classList.add('mph-title-wrapped');
            } else {
                title.classList.remove('mph-title-wrapped');
            }
        };
        
        checkOverflow();
        
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(checkOverflow, 100);
        });
        
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(checkOverflow);
        }
    }
}