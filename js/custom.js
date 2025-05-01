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
    
    // Initialize About story section if it exists
    const aboutStorySection = document.querySelector('.about-story-container');
    if (aboutStorySection) {
        initAboutStorySection();
    }

    // Initialize modern timeline if it exists
    const modernTimeline = document.querySelector('.modern-timeline');
    if (modernTimeline) {
        initModernTimeline();
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
    // Initialize progress bars with improved accessibility
    initProgressBars();
    
    // Initialize vision counters with improved animation
    initVisionCounters();
    
    // Initialize timeline functionality with keyboard navigation
    initTimeline();
    
    // Setup scroll triggered animations with better performance
    setupScrollAnimations();
    
    // Initialize the pillar cards with interaction effects
    initVisionPillars();
    
    // Initialize the vision impact section
    initVisionImpact();
}

// Initialize progress bar animations with improved accessibility
function initProgressBars() {
    const progressBars = document.querySelectorAll('.animate-progress');
    
    if (progressBars.length === 0) return;
    
    // Create intersection observer to trigger progress animation when in view
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetValue = entry.target.getAttribute('data-target');
                const percentageDisplay = entry.target.closest('.pillar-progress').querySelector('.progress-percentage');
                
                // Add ARIA live region for screen readers
                if (percentageDisplay && !percentageDisplay.hasAttribute('aria-live')) {
                    percentageDisplay.setAttribute('aria-live', 'polite');
                }
                
                // Animate the progress bar
                entry.target.style.width = `${targetValue}%`;
                entry.target.setAttribute('aria-valuenow', targetValue);
                
                // Animate the percentage text with easing
                if (percentageDisplay) {
                    animateCounter(percentageDisplay, 0, targetValue, 1500, value => `${value}%`, 'easeOutQuart');
                }
                
                // Unobserve after triggering
                progressObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });
    
    // Observe each progress bar
    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
}

// Initialize vision counter animations with improved easing
function initVisionCounters() {
    const counters = document.querySelectorAll('.vision-counter');
    
    if (counters.length === 0) return;
    
    // Create intersection observer with better threshold
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetValue = parseInt(entry.target.getAttribute('data-count'), 10);
                
                // Add ARIA live region for screen readers
                if (!entry.target.hasAttribute('aria-live')) {
                    entry.target.setAttribute('aria-live', 'polite');
                }
                
                // Animate the counter with improved easing
                animateCounter(entry.target, 0, targetValue, 2000, value => `${value}<span>+</span>`, 'easeOutQuart');
                
                // Unobserve after triggering
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });
    
    // Observe each counter
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Enhanced timeline functionality with keyboard navigation and mobile optimization
function initTimeline() {
    const timelineContainer = document.querySelector('.timeline-container');
    if (!timelineContainer) return;
    
    // Timeline progress animation with improved timing
    const timelineProgress = document.querySelector('.timeline-line-progress');
    if (timelineProgress) {
        const progressObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setTimeout(() => {
                    timelineProgress.style.width = '100%';
                }, 500);
                progressObserver.unobserve(entries[0].target);
            }
        }, { threshold: 0.3 });
        
        progressObserver.observe(timelineContainer);
    }
    
    // Timeline navigation enhancement - especially for mobile
    const timelineNav = document.querySelector('.timeline-nav');
    if (!timelineNav) return;
    
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineScroller = document.querySelector('.timeline-scroll-container');
    
    if (timelineItems.length === 0 || !timelineScroller) return;
    
    let currentIndex = 0;
    const totalItems = timelineItems.length;
    
    // Update timeline indicator text
    function updateIndicator() {
        const indicator = timelineNav.querySelector('.timeline-indicator');
        if (indicator) {
            indicator.textContent = `${currentIndex + 1} of ${totalItems}`;
            
            // Update ARIA attributes for screen readers
            indicator.setAttribute('aria-live', 'polite');
            timelineScroller.setAttribute('aria-activedescendant', `timeline-item-${currentIndex}`);
        }
    }
    
    // Scroll to specific timeline item with smooth animation
    function scrollToItem(index) {
        if (index < 0) index = 0;
        if (index >= totalItems) index = totalItems - 1;
        
        currentIndex = index;
        updateIndicator();
        
        // Get the target item's position for smoother scrolling
        const targetItem = timelineItems[index];
        const scrollPosition = targetItem.offsetLeft - (timelineScroller.offsetWidth / 2) + (targetItem.offsetWidth / 2);
        
        // Add active class for visual indication
        timelineItems.forEach((item, i) => {
            if (i === index) {
                item.classList.add('active');
                item.setAttribute('aria-current', 'true');
            } else {
                item.classList.remove('active');
                item.removeAttribute('aria-current');
            }
        });
        
        // Smooth scroll with better animation options
        timelineScroller.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    }
    
    // Set up navigation buttons with improved interaction
    const prevButton = timelineNav.querySelector('[data-direction="prev"]');
    const nextButton = timelineNav.querySelector('[data-direction="next"]');
    
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            scrollToItem(currentIndex - 1);
        });
        
        // Add extra keyboard accessibility
        prevButton.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                scrollToItem(currentIndex - 1);
            }
        });
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            scrollToItem(currentIndex + 1);
        });
        
        // Add extra keyboard accessibility
        nextButton.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                scrollToItem(currentIndex + 1);
            }
        });
    }
    
    // Initialize indicator
    timelineItems.forEach((item, i) => {
        // Assign IDs for ARIA relationships
        item.id = `timeline-item-${i}`;
        
        // Make items keyboard navigable
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'tabpanel');
        item.setAttribute('aria-label', `Timeline milestone: ${item.querySelector('.timeline-year').textContent}`);
        
        // Add keyboard navigation for each item
        item.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                scrollToItem(i + 1);
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                scrollToItem(i - 1);
            } else if (e.key === 'Home') {
                e.preventDefault();
                scrollToItem(0);
            } else if (e.key === 'End') {
                e.preventDefault();
                scrollToItem(totalItems - 1);
            }
        });
        
        // Add click events
        item.addEventListener('click', () => {
            scrollToItem(i);
        });
    });
    
    // Add scroll snap functionality for touch devices
    if ('ontouchstart' in window) {
        timelineScroller.addEventListener('scroll', debounce(() => {
            const scrollLeft = timelineScroller.scrollLeft;
            const containerWidth = timelineScroller.offsetWidth;
            
            // Find the closest timeline item to the center of the view
            let closestIndex = 0;
            let closestDistance = Number.MAX_VALUE;
            
            timelineItems.forEach((item, index) => {
                const itemLeft = item.offsetLeft;
                const itemCenter = itemLeft + (item.offsetWidth / 2);
                const screenCenter = scrollLeft + (containerWidth / 2);
                const distance = Math.abs(screenCenter - itemCenter);
                
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestIndex = index;
                }
            });
            
            // Update if the closest item has changed
            if (closestIndex !== currentIndex) {
                currentIndex = closestIndex;
                updateIndicator();
                
                // Update active class
                timelineItems.forEach((item, i) => {
                    if (i === currentIndex) {
                        item.classList.add('active');
                        item.setAttribute('aria-current', 'true');
                    } else {
                        item.classList.remove('active');
                        item.removeAttribute('aria-current');
                    }
                });
            }
        }, 100));
    }
    
    // Initialize the first item as active
    updateIndicator();
    scrollToItem(0);
    
    // Adjust timeline dots with animation
    animateTimelineDots();
}

// Animate timeline dots sequentially
function animateTimelineDots() {
    const timelineDots = document.querySelectorAll('.timeline-dot');
    
    if (timelineDots.length === 0) return;
    
    const dotObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            // Add pulse animation class to each dot with delay
            timelineDots.forEach((dot, index) => {
                setTimeout(() => {
                    dot.classList.add('pulse-animation');
                }, index * 300);
            });
            dotObserver.unobserve(entries[0].target);
        }
    }, { threshold: 0.5 });
    
    // Observe the first dot to trigger the sequence
    if (timelineDots[0]) {
        dotObserver.observe(timelineDots[0]);
    }
}

// Setup scroll-triggered animations with improved performance
function setupScrollAnimations() {
    const elementsToAnimate = document.querySelectorAll('.vision-section .hq-fade-effect, .vision-section [data-fade-from]');
    
    if (elementsToAnimate.length === 0) return;
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseFloat(entry.target.getAttribute('data-delay') || 0);
                const fadeDirection = entry.target.getAttribute('data-fade-from');
                
                // Apply initial transform based on fade direction
                if (fadeDirection) {
                    let initialTransform = '';
                    
                    switch(fadeDirection) {
                        case 'left':
                            initialTransform = 'translateX(-30px)';
                            break;
                        case 'right':
                            initialTransform = 'translateX(30px)';
                            break;
                        case 'top':
                            initialTransform = 'translateY(-30px)';
                            break;
                        case 'bottom':
                            initialTransform = 'translateY(30px)';
                            break;
                    }
                    
                    entry.target.style.transform = initialTransform;
                    entry.target.style.opacity = '0';
                    entry.target.style.transition = 'transform 0.8s ease, opacity 0.8s ease';
                }
                
                setTimeout(() => {
                    if (fadeDirection) {
                        entry.target.style.transform = 'translate(0)';
                        entry.target.style.opacity = '1';
                    } else {
                        entry.target.classList.add('animated');
                    }
                }, delay * 1000);
                
                animationObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    elementsToAnimate.forEach(element => {
        animationObserver.observe(element);
    });
}

// Initialize vision pillars with enhanced interactions
function initVisionPillars() {
    const visionPillars = document.querySelectorAll('.vision-pillar-card');
    
    if (visionPillars.length === 0) return;
    
    visionPillars.forEach((pillar, index) => {
        // Add ARIA attributes for accessibility
        pillar.setAttribute('role', 'region');
        pillar.setAttribute('aria-label', `Vision Pillar: ${pillar.querySelector('h4').textContent}`);
        
        // Add focus handling for keyboard navigation
        pillar.addEventListener('focus', () => {
            pillar.classList.add('pillar-focused');
        });
        
        pillar.addEventListener('blur', () => {
            pillar.classList.remove('pillar-focused');
        });
        
        // Add hover effects for the icons
        const pillarIcon = pillar.querySelector('.vision-pillar-icon');
        if (pillarIcon) {
            pillar.addEventListener('mouseenter', () => {
                pillarIcon.classList.add('icon-animated');
            });
            
            pillar.addEventListener('mouseleave', () => {
                pillarIcon.classList.remove('icon-animated');
            });
        }
        
        // Add click/tap interaction to show more details
        pillar.addEventListener('click', () => {
            // Toggle active state
            const isActive = pillar.classList.contains('active-pillar');
            
            // Reset all pillars
            document.querySelectorAll('.vision-pillar-card').forEach(p => {
                p.classList.remove('active-pillar');
            });
            
            // If this wasn't the active one before, make it active now
            if (!isActive) {
                pillar.classList.add('active-pillar');
                
                // Focus on the progress bar for better UX
                const progressBar = pillar.querySelector('.progress-bar');
                if (progressBar) {
                    // Add a subtle pulse effect
                    progressBar.classList.add('pulse-progress');
                    setTimeout(() => {
                        progressBar.classList.remove('pulse-progress');
                    }, 1500);
                }
            }
        });
    });
}

// Initialize vision impact section with enhanced animations
function initVisionImpact() {
    const impactSection = document.querySelector('.vision-impact');
    if (!impactSection) return;
    
    // Animate impact list items sequentially
    const impactItems = impactSection.querySelectorAll('.vision-impact-list li');
    
    if (impactItems.length > 0) {
        const impactObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                impactItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('impact-item-animated');
                    }, index * 200);
                });
                impactObserver.unobserve(entries[0].target);
            }
        }, { threshold: 0.3 });
        
        impactObserver.observe(impactSection);
    }
    
    // Add hover effects to testimonial cards
    const testimonialCards = impactSection.querySelectorAll('.vision-testimonial-card');
    
    testimonialCards.forEach(card => {
        // Add accessible hover state
        card.addEventListener('mouseenter', () => {
            card.setAttribute('data-hover', 'true');
        });
        
        card.addEventListener('mouseleave', () => {
            card.removeAttribute('data-hover');
        });
        
        // Make cards keyboard focusable
        card.setAttribute('tabindex', '0');
        
        // Add focus styles
        card.addEventListener('focus', () => {
            card.classList.add('card-focused');
        });
        
        card.addEventListener('blur', () => {
            card.classList.remove('card-focused');
        });
    });
}

// Utility function for animating counters with custom formatting and easing
function animateCounter(element, start, end, duration, formatter, easingName = 'linear') {
    let startTimestamp = null;
    
    // Easing functions
    const easings = {
        linear: t => t,
        easeInQuad: t => t * t,
        easeOutQuad: t => t * (2 - t),
        easeInOutQuad: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
        easeOutQuart: t => 1 - --t * t * t * t,
        easeInOutQuart: t => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t
    };
    
    // Default to linear if the requested easing doesn't exist
    const easing = easings[easingName] || easings.linear;
    
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const easedProgress = easing(progress);
        const value = Math.floor(easedProgress * (end - start) + start);
        
        element.innerHTML = formatter ? formatter(value) : value;
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Utility function for debouncing events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * About Story Section animations and interactions
 * Handles story card animations, quote highlighting, and 
 * scroll-based sequential animations for the "Who We Are" section
 */
function initAboutStorySection() {
    // Animate story cards and their elements with a staggered effect
    animateStoryCards();
    
    // Add click interactions on story cards for engagement
    setupStoryCardInteractions();
    
    // Setup badge animations to pulse on hover/focus
    setupBadgeAnimations();
    
    // Set up automatic date updates for the timeline
    setupAutomaticDateUpdates();
}

// Animate story cards and their elements with a staggered effect
function animateStoryCards() {
    const storyCards = document.querySelectorAll('.about-story-card');
    
    if (storyCards.length === 0) return;
    
    // Create intersection observer for story cards to trigger animations when visible
    const storyObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Apply staggered animations to the story card and its elements
                entry.target.classList.add('animated');
                
                // Animate each element within the story card sequentially
                const elementsToAnimate = entry.target.querySelectorAll('.hq-text-anim, .hq-fade-effect');
                elementsToAnimate.forEach((element, i) => {
                    const baseDelay = index * 0.2; // Delay based on card order
                    const elementDelay = parseFloat(element.getAttribute('data-delay') || 0);
                    const totalDelay = baseDelay + (i * 0.1) + elementDelay;
                    
                    setTimeout(() => {
                        if (element.getAttribute('data-effect') === 'fade-in') {
                            element.style.opacity = '1';
                            element.style.transform = 'translateY(0)';
                        } else if (element.getAttribute('data-effect') === 'fade-in-bottom') {
                            element.style.opacity = '1';
                            element.style.transform = 'translateY(0)';
                        } else {
                            element.classList.add('animated');
                        }
                    }, totalDelay * 1000);
                });
                
                // Unobserve after triggering
                storyObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    // Observe each story card
    storyCards.forEach(card => {
        // Set initial state
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        // Start observing
        storyObserver.observe(card);
    });
    
    // Animate the timeline connector with a delayed start
    const timelineConnector = document.querySelector('.story-timeline-connector');
    if (timelineConnector) {
        setTimeout(() => {
            timelineConnector.classList.add('animated');
        }, 800);
    }
}

// Add interactive features to story cards to enhance engagement
function setupStoryCardInteractions() {
    const storyCards = document.querySelectorAll('.about-story-card');
    
    storyCards.forEach(card => {
        // Add focus state management for accessibility
        card.setAttribute('tabindex', '0');
        
        // Add event listeners for highlighting quotes when card is interacted with
        const quoteBlock = card.querySelector('.story-highlight blockquote');
        
        if (quoteBlock) {
            // Create animation for quotes on interaction
            const highlightQuote = () => {
                quoteBlock.classList.add('highlight-quote');
                quoteBlock.style.transform = 'scale(1.05)';
                quoteBlock.style.color = '#0c7bc9';
            };
            
            const unhighlightQuote = () => {
                quoteBlock.classList.remove('highlight-quote');
                quoteBlock.style.transform = '';
                quoteBlock.style.color = '';
            };
            
            // Add transitions for smooth animations
            quoteBlock.style.transition = 'transform 0.3s ease, color 0.3s ease';
            
            // Apply event listeners
            card.addEventListener('mouseenter', highlightQuote);
            card.addEventListener('focus', highlightQuote);
            card.addEventListener('mouseleave', unhighlightQuote);
            card.addEventListener('blur', unhighlightQuote);
        }
        
        // Add ARIA roles for better screen reader interaction
        card.setAttribute('role', 'article');
        card.setAttribute('aria-roledescription', 'Story card');
    });
    
    // Make the read more link act as a proper call-to-action
    const readMoreBtn = document.querySelector('.btn-story-more');
    
    if (readMoreBtn) {
        readMoreBtn.setAttribute('role', 'button');
        
        readMoreBtn.addEventListener('mouseenter', () => {
            // Create a pulsing effect on the button icon
            const icon = readMoreBtn.querySelector('i');
            if (icon) {
                icon.style.animation = 'pulse-icon 1s infinite';
            }
        });
        
        readMoreBtn.addEventListener('mouseleave', () => {
            const icon = readMoreBtn.querySelector('i');
            if (icon) {
                icon.style.animation = '';
            }
        });
    }
}

// Setup badge animations to pulse on hover/focus
function setupBadgeAnimations() {
    const storyBadges = document.querySelectorAll('.story-badge');
    
    storyBadges.forEach(badge => {
        // Initial animation
        setTimeout(() => {
            badge.classList.add('badge-animate');
        }, 1500);
        
        // Add pulse effect on parent card hover
        const parentCard = badge.closest('.about-story-card');
        
        if (parentCard) {
            parentCard.addEventListener('mouseenter', () => {
                badge.classList.add('badge-pulse');
            });
            
            parentCard.addEventListener('mouseleave', () => {
                badge.classList.remove('badge-pulse');
            });
        }
    });
}

// Set up automatic date updates for the timeline
function setupAutomaticDateUpdates() {
    // Update the current year in the timeline
    const currentYearElements = document.querySelectorAll('.timeline-current-date');
    const currentYear = new Date().getFullYear();
    
    currentYearElements.forEach(element => {
        element.textContent = currentYear;
    });
    
    // Calculate years of service dynamically
    const yearsCounter = document.querySelector('.years-counter');
    if (yearsCounter) {
        const foundingYear = 2016; // The year the foundation was established
        const yearsOfService = currentYear - foundingYear;
        yearsCounter.textContent = yearsOfService;
    }
}

// Initialize modern timeline visualization
function initModernTimeline() {
    const timelineElem = document.querySelector('.modern-timeline');
    if (!timelineElem) return;
    
    // Animate timeline dots
    const timelineDots = timelineElem.querySelectorAll('.timeline-dot');
    
    if (timelineDots.length > 0) {
        // Create intersection observer to trigger dot animations
        const dotObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                timelineDots.forEach((dot, index) => {
                    setTimeout(() => {
                        dot.classList.add('pulse-animation');
                    }, index * 500);
                });
                
                // Animate the timeline line after dots start pulsing
                const timelineLine = timelineElem.querySelector('.timeline-line');
                if (timelineLine) {
                    setTimeout(() => {
                        timelineLine.classList.add('line-animation');
                    }, 500);
                }
                
                dotObserver.unobserve(entries[0].target);
            }
        }, { threshold: 0.5 });
        
        dotObserver.observe(timelineElem);
    }
    
    // Update the timeline dates with the current year
    const currentDateElement = timelineElem.querySelector('.timeline-current-date');
    if (currentDateElement) {
        currentDateElement.textContent = new Date().getFullYear();
    }
}