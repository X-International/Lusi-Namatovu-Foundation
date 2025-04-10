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
