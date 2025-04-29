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
    
    // Initialize vision section animations and interactions if it exists
    const visionSection = document.querySelector('.vision-section');
    if (visionSection) {
        initVisionSection();
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

/**
 * Vision Section animations and interactions
 * Handles animated progress bars, counter animations, timeline navigation
 * and scroll-based animations in the vision section
 */
function initVisionSection() {
    // Initialize progress bars
    initProgressBars();
    
    // Initialize vision counters
    initVisionCounters();
    
    // Initialize timeline functionality
    initTimeline();
    
    // Setup scroll triggered animations
    setupScrollAnimations();
}

// Initialize progress bar animations
function initProgressBars() {
    const progressBars = document.querySelectorAll('.animate-progress');
    
    if (progressBars.length === 0) return;
    
    // Create intersection observer to trigger progress animation when in view
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetValue = entry.target.getAttribute('data-target');
                const percentageDisplay = entry.target.closest('.pillar-progress').querySelector('.progress-percentage');
                
                // Animate the progress bar
                entry.target.style.width = `${targetValue}%`;
                entry.target.setAttribute('aria-valuenow', targetValue);
                
                // Animate the percentage text
                if (percentageDisplay) {
                    animateCounter(percentageDisplay, 0, targetValue, 1500, value => `${value}%`);
                }
                
                // Unobserve after triggering
                progressObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // Observe each progress bar
    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
}

// Initialize vision counter animations
function initVisionCounters() {
    const counters = document.querySelectorAll('.vision-counter');
    
    if (counters.length === 0) return;
    
    // Create intersection observer to trigger counter animation when in view
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetValue = parseInt(entry.target.getAttribute('data-count'), 10);
                
                // Animate the counter
                animateCounter(entry.target, 0, targetValue, 2000, value => `${value}<span>+</span>`);
                
                // Unobserve after triggering
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // Observe each counter
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Timeline functionality
function initTimeline() {
    const timelineContainer = document.querySelector('.timeline-container');
    if (!timelineContainer) return;
    
    // Timeline progress animation
    const timelineProgress = document.querySelector('.timeline-line-progress');
    if (timelineProgress) {
        const progressObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setTimeout(() => {
                    timelineProgress.style.width = '100%';
                }, 500);
                progressObserver.unobserve(entries[0].target);
            }
        }, { threshold: 0.2 });
        
        progressObserver.observe(timelineContainer);
    }
    
    // Mobile timeline navigation
    const timelineNav = document.querySelector('.timeline-nav');
    if (!timelineNav) return;
    
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems.length === 0) return;
    
    let currentIndex = 0;
    const totalItems = timelineItems.length;
    
    // Update timeline indicator
    function updateIndicator() {
        const indicator = timelineNav.querySelector('.timeline-indicator');
        if (indicator) {
            indicator.textContent = `${currentIndex + 1} of ${totalItems}`;
        }
    }
    
    // Scroll to specific timeline item
    function scrollToItem(index) {
        if (index < 0) index = 0;
        if (index >= totalItems) index = totalItems - 1;
        
        currentIndex = index;
        updateIndicator();
        
        timelineItems[index].scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
        });
    }
    
    // Set up navigation buttons
    const prevButton = timelineNav.querySelector('[data-direction="prev"]');
    const nextButton = timelineNav.querySelector('[data-direction="next"]');
    
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            scrollToItem(currentIndex - 1);
        });
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            scrollToItem(currentIndex + 1);
        });
    }
    
    // Initialize indicator
    updateIndicator();
    
    // Make timeline items keyboard navigable
    timelineItems.forEach((item, index) => {
        item.setAttribute('tabindex', '0');
        item.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                scrollToItem(index + 1);
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                scrollToItem(index - 1);
            }
        });
    });
}

// Setup scroll-triggered animations
function setupScrollAnimations() {
    const elementsToAnimate = document.querySelectorAll('.vision-section .hq-fade-effect');
    
    if (elementsToAnimate.length === 0) return;
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseFloat(entry.target.getAttribute('data-delay') || 0);
                
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, delay * 1000);
                
                animationObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    elementsToAnimate.forEach(element => {
        animationObserver.observe(element);
    });
}

// Utility function for animating counters with custom formatting
function animateCounter(element, start, end, duration, formatter) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        
        element.innerHTML = formatter ? formatter(value) : value;
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}