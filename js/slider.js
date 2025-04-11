(function($) {
    "use strict";
    
    $(document).ready(function() {
        
        // Initialize Hero Slider
        const heroSlider = new Swiper('.hero-slider .slider-container', {
            speed: 1000,
            slidesPerView: 1,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false
            },
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            pagination: {
                el: '.slider-pagination',
                clickable: true
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
                lastSlideMessage: 'This is the last slide'
            },
            on: {
                init: function() {
                    startSlideAnimations(this);
                },
                slideChangeTransitionStart: function() {
                    resetSlideAnimations(this);
                },
                slideChangeTransitionEnd: function() {
                    startSlideAnimations(this);
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
        
        // Enhanced keyboard navigation
        $(document).on('keydown', function(e) {
            if (!$('.hero-slider').is(':visible')) return;
            
            // Ensure slider is in viewport for better user experience
            const sliderElement = $('.hero-slider')[0];
            const rect = sliderElement.getBoundingClientRect();
            const isInViewport = (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
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
                    scrollTop: nextSection.offset().top
                }, 800);
            }
        });
        
    });
    
})(jQuery);
