(function($) {
    "use strict";
    
    $(document).ready(function() {
        
        // Initialize Hero Slider
        const heroSlider = new Swiper('.hero-slider .slider-container', {
            speed: 1000,
            slidesPerView: 1,
            loop: true,
            autoplay: {
                delay: 6000, // Increased delay for better readability
                disableOnInteraction: false
            },
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            pagination: {
                el: '.slider-pagination',
                clickable: true,
                renderBullet: function (index, className) {
                    return '<span class="' + className + '" aria-label="Go to slide ' + (index + 1) + '"></span>';
                }
            },
            navigation: {
                nextEl: '.next-slide',
                prevEl: '.prev-slide'
            },
            keyboard: {
                enabled: true,
                onlyInViewport: true
            },
            a11y: {
                prevSlideMessage: 'Previous slide',
                nextSlideMessage: 'Next slide',
                firstSlideMessage: 'This is the first slide',
                lastSlideMessage: 'This is the last slide',
                paginationBulletMessage: 'Go to slide {{index}}'
            },
            on: {
                init: function() {
                    startSlideAnimations(this);
                    checkMobileView();
                },
                slideChangeTransitionStart: function() {
                    resetSlideAnimations(this);
                },
                slideChangeTransitionEnd: function() {
                    startSlideAnimations(this);
                },
                resize: function() {
                    // Check for mobile view on resize
                    checkMobileView();
                }
            }
        });
        
        // Handle Slide Animations
        function startSlideAnimations(slider) {
            const activeSlide = slider.slides[slider.activeIndex];
            
            // Trigger animations on active slide
            const elements = activeSlide.querySelectorAll('[data-animation]');
            elements.forEach(element => {
                const delay = element.getAttribute('data-delay') || 0;
                
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, delay * 1000);
            });
        }
        
        function resetSlideAnimations(slider) {
            const slides = slider.slides;
            
            slides.forEach(slide => {
                const elements = slide.querySelectorAll('[data-animation]');
                elements.forEach(element => {
                    element.style.opacity = '0';
                    element.style.transform = 'translateY(30px)';
                });
            });
        }
        
        // Check if we're in mobile view and adjust accordingly
        function checkMobileView() {
            const isMobile = window.matchMedia('(max-width: 991px)').matches;
            
            if (isMobile) {
                // Adjust for better mobile experience
                $('.slider-scroll-indicator').css('opacity', '0');
                
                // Ensure proper height for mobile
                adjustMobileSliderHeight();
            } else {
                // Reset for desktop/tablet view
                $('.slider-scroll-indicator').css('opacity', '1');
            }
        }
        
        // Adjust mobile slider height for better responsive behavior
        function adjustMobileSliderHeight() {
            // Make sure we calculate heights properly for mobile view
            const viewportHeight = window.innerHeight;
            const headerHeight = $('.header-wrapper').outerHeight() || 0;
            const imageHeight = $('.image-column').outerHeight() || 0;
            const contentHeight = $('.content-column').outerHeight() || 0;
            
            // Ensure minimum height but avoid excessive scrolling
            if (window.matchMedia('(max-width: 767px)').matches) {
                // For smallest mobile devices
                const calculatedHeight = Math.max(viewportHeight - headerHeight, imageHeight + contentHeight);
                $('.hero-slider').css('min-height', calculatedHeight + 'px');
            } else if (window.matchMedia('(max-width: 991px)').matches) {
                // For tablets and larger mobile
                $('.hero-slider').css('min-height', '100vh');
            }
        }
        
        // Re-adjust heights on orientation change for better mobile experience
        $(window).on('orientationchange', function() {
            setTimeout(function() {
                adjustMobileSliderHeight();
            }, 200); // Small delay to ensure correct calculation after orientation change
        });
        
        // Pause/Play Button Functionality
        const pausePlayButton = $('.pause-play-button');
        const pauseIcon = $('.pause-icon');
        const playIcon = $('.play-icon');
        
        pausePlayButton.on('click', function() {
            if (heroSlider.autoplay.running) {
                // Pause the slider
                heroSlider.autoplay.stop();
                pauseIcon.hide();
                playIcon.show();
                $(this).attr('aria-label', 'Play slideshow');
            } else {
                // Resume the slider
                heroSlider.autoplay.start();
                playIcon.hide();
                pauseIcon.show();
                $(this).attr('aria-label', 'Pause slideshow');
            }
        });
        
        // Enhanced touch swipe detection for better mobile experience
        let touchStartX, touchEndX;
        const sliderElement = $('.hero-slider .slider-container')[0];
        
        sliderElement.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, false);
        
        sliderElement.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);
        
        function handleSwipe() {
            const threshold = 50; // Minimum distance for swipe
            if (touchEndX + threshold < touchStartX) {
                heroSlider.slideNext();
            } else if (touchEndX > touchStartX + threshold) {
                heroSlider.slidePrev();
            }
        }
        
        // Enhanced keyboard navigation
        $(document).on('keydown', function(e) {
            if (!$('.hero-slider').is(':visible')) return;
            
            // Ensure slider is in viewport for better user experience
            const sliderElement = $('.hero-slider')[0];
            const rect = sliderElement.getBoundingClientRect();
            const isInViewport = (
                rect.top >= -200 && // Allow partial visibility
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight + 200) && // Allow partial visibility
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
            
            if (!isInViewport) return;
            
            // Handle keyboard navigation
            switch(e.keyCode) {
                case 37: // Left arrow key
                    heroSlider.slidePrev();
                    break;
                case 39: // Right arrow key
                    heroSlider.slideNext();
                    break;
                case 32: // Space bar for pause/play
                    e.preventDefault();
                    pausePlayButton.click();
                    break;
            }
        });
        
        // Scroll Indicator Functionality
        $('.slider-scroll-indicator').on('click', function() {
            const nextSection = $('.hero-slider').next();
            if (nextSection.length) {
                $('html, body').animate({
                    scrollTop: nextSection.offset().top - 20 // Add a small offset for better positioning
                }, 800);
            }
        });
        
        // Initial check to make sure everything is sized correctly
        setTimeout(function() {
            adjustMobileSliderHeight();
        }, 100);
        
        // Run adjustments again after images load for better accuracy
        $(window).on('load', function() {
            adjustMobileSliderHeight();
        });
        
    });
    
})(jQuery);
