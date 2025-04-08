(function ($) {
    "use strict";

    // Animation Function
    function doAnimations(elements) {
        const animationEndEvents = [
            'webkitAnimationEnd',
            'mozAnimationEnd',
            'MSAnimationEnd',
            'oanimationend',
            'animationend'
        ].join(' ');

        elements.each(function () {
            const $element = $(this);
            const animationDelay = $element.data('delay') || '0s';
            const animationDuration = $element.data('duration') || '1s';
            const animationName = $element.data('animation');

            if (!animationName) {
                console.warn('Element missing data-animation attribute', $element);
                return;
            }

            const animationClass = `animated ${animationName}`;

            $element.css({
                'animation-delay': animationDelay,
                '-webkit-animation-delay': animationDelay,
                'animation-duration': animationDuration,
                '-webkit-animation-duration': animationDuration
            });

            $element.addClass(animationClass).one(animationEndEvents, () => {
                $element.removeClass(animationClass);
            });
        });
    }

    // Ken Burns Effect Implementation
    function applyKenBurns(swiper) {
        // Clear previous Ken Burns effects
        swiper.slides.forEach(slide => {
            const kbElements = $(slide).find('[data-kb]');
            kbElements.each(function() {
                const element = this;
                if (element.kbAnimation) {
                    cancelAnimationFrame(element.kbAnimation);
                    element.style.transform = '';
                }
            });
        });
    
        // Apply to active slide
        const activeSlide = swiper.slides[swiper.activeIndex];
        const kbElements = $(activeSlide).find('[data-kb]');
        
        kbElements.each(function() {
            const element = this;
            const options = {
                scaleStart: parseFloat(element.dataset.kbScaleStart) || 1,
                scaleEnd: parseFloat(element.dataset.kbScaleEnd) || 1.05,
                direction: element.dataset.kbDirection || 'none',
                duration: parseInt(element.dataset.kbDuration) || 7000,
                easing: element.dataset.kbEase || 'linear'
            };
    
            // Set initial styles
            element.style.transformOrigin = 'center center';
            element.style.willChange = 'transform';
            
            // Start animation
            animateKenBurns(element, options);
        });
    }
    
    // Ken Burns Animation Function
    function animateKenBurns(element, options) {
        const startTime = Date.now();
        const directions = {
            none: { x: 0, y: 0 },
            left: { x: -0.1, y: 0 },
            right: { x: 0.1, y: 0 },
            up: { x: 0, y: -0.1 },
            down: { x: 0, y: 0.1 },
            'left-up': { x: -0.1, y: -0.1 },
            'left-down': { x: -0.1, y: 0.1 },
            'right-up': { x: 0.1, y: -0.1 },
            'right-down': { x: 0.1, y: 0.1 },
            random: { 
                x: (Math.random() * 0.2 - 0.1), 
                y: (Math.random() * 0.2 - 0.1) 
            }
        };
        
        const direction = directions[options.direction] || directions.random;
    
        function update() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / options.duration, 1);
            
            // Calculate current transformation
            const scale = options.scaleStart + (options.scaleEnd - options.scaleStart) * progress;
            const translateX = direction.x * 100 * progress;
            const translateY = direction.y * 100 * progress;
            
            // Apply transformation
            element.style.transform = `
                scale(${scale})
                translate(${translateX}%, ${translateY}%)
            `;
    
            if (progress < 1) {
                element.kbAnimation = requestAnimationFrame(update);
            }
        }
        
        element.kbAnimation = requestAnimationFrame(update);
    }

    // Main Slider Configuration
    const sliderOptions = {
        speed: 1000,
        autoplay: {
            delay: 7000,
            disableOnInteraction: false
        },
        parallax: false,
        mousewheel: false,
        loop: true,
        effect: 'fade',
        a11y: false,
        pagination: {
            el: '.hq-slider-pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.main-slider .slider-button-next',
            prevEl: '.main-slider .slider-button-prev'
        },
        on: {
            init: function () {
                const swiper = this;
                requestAnimationFrame(() => {
                    const activeSlide = swiper.slides[swiper.activeIndex];
                    const animatingElements = $(activeSlide).find('[data-animation]');
                    doAnimations(animatingElements);
                    applyKenBurns(swiper);
                });
            },
            slideChangeTransitionStart: function () {
                const swiper = this;
                requestAnimationFrame(() => {
                    const activeSlide = swiper.slides[swiper.activeIndex];
                    const animatingElements = $(activeSlide).find('[data-animation]');
                    doAnimations(animatingElements);
                    applyKenBurns(swiper);
                });
            },
            resize: function () {
                requestAnimationFrame(() => this.update());
            }
        }
    };

    // Initialize Swiper with fallback check
    if (window.Swiper) {
        const mainSlider = new Swiper('.main-slider', sliderOptions);
    } else {
        console.error("Swiper.js is not loaded. Ensure it's included before this script.");
    }

})(jQuery);