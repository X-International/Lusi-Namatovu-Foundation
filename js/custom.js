/**
 * Modern Page Header functionality
 * Controls animations, parallax effects, and scroll behavior
 */
document.addEventListener('DOMContentLoaded', function() {
    // Initialize modern page header if it exists
    const pageHeader = document.querySelector('.modern-page-header');
    if (pageHeader) {
        initModernPageHeader();
    }
});

function initModernPageHeader() {
    // Set background image from data attribute
    const bgImage = document.querySelector('.mph-background-image');
    if (bgImage && bgImage.getAttribute('data-img')) {
        bgImage.style.backgroundImage = `url(${bgImage.getAttribute('data-img')})`;
    }
    
    // Animate elements on page load with improved timing
    setTimeout(function() {
        const animatedElements = document.querySelectorAll('[data-animation="fade-up"]');
        animatedElements.forEach(element => {
            const delay = element.getAttribute('data-delay') || 0;
            setTimeout(() => {
                element.classList.add('animated');
            }, delay * 1000);
        });
    }, 300);
    
    // Add parallax scrolling effect with improved performance
    window.addEventListener('scroll', function() {
        if (window.innerWidth > 768) { // Only apply parallax on larger screens
            const scrolled = window.scrollY;
            const bgImage = document.querySelector('.mph-background-image');
            const overlay = document.querySelector('.mph-overlay');
            if (bgImage) {
                bgImage.style.transform = `scale(1.02) translateY(${scrolled * 0.15}px)`;
                
                // Subtle opacity changes for better text visibility as user scrolls
                if (scrolled < 300) {
                    bgImage.style.opacity = 1 - scrolled * 0.0015;
                    if (overlay) {
                        // Make overlay slightly darker on scroll for better text contrast
                        const alpha = Math.min(0.75, 0.6 + scrolled * 0.0005);
                        overlay.style.backgroundColor = `rgba(0, 0, 0, ${alpha})`;
                    }
                }
            }
        }
    });
    
    // Enhanced scroll down functionality
    const scrollIndicator = document.querySelector('.mph-scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const headerHeight = document.querySelector('.modern-page-header').offsetHeight;
            window.scrollTo({
                top: headerHeight - 50,
                behavior: 'smooth'
            });
        });
        
        // Fade out scroll indicator when scrolling down
        window.addEventListener('scroll', function() {
            const scrolled = window.scrollY;
            if (scrolled > 100) {
                scrollIndicator.style.opacity = Math.max(0, 1 - (scrolled - 100) / 200);
            } else {
                scrollIndicator.style.opacity = 1;
            }
        });
    }
    
    // Check if any text is overflowing in the title (especially on mobile)
    const title = document.querySelector('.mph-title');
    if (title) {
        const checkOverflow = function() {
            // Add a class if the title appears to be wrapping too much
            if (title.offsetHeight > title.offsetWidth * 0.4) {
                title.classList.add('mph-title-wrapped');
            } else {
                title.classList.remove('mph-title-wrapped');
            }
        };
        
        // Check on load and resize
        checkOverflow();
        window.addEventListener('resize', checkOverflow);
    }
}