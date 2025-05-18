
// Team Members Animation - Immediate Load without Lazy Loading
(function($) {
    'use strict';

    // Initialize animations when document is ready
    $(document).ready(function() {
        // Animation for team member cards - immediately apply animation class
        function animateTeamMembers() {
            const teamCards = $('.team-member-card');
            teamCards.addClass('animated');
        }
          // Profile page animations with enhanced interactions
        function animateProfileSection() {
            $('.profile-image').addClass('animated-in');
            $('.profile-content').addClass('animated-in');
            
            // Add subtle hover effect for image frame
            $('.image-frame').hover(
                function() {
                    $(this).find('.image-decoration').css({
                        'height': '8px',
                        'transition': 'height 0.3s ease'
                    });
                },
                function() {
                    $(this).find('.image-decoration').css({
                        'height': '5px',
                        'transition': 'height 0.3s ease'
                    });
                }
            );
        }
          // Initialize GSAP animations if available
        if (typeof gsap !== 'undefined') {
            // Animate the heading section immediately
            gsap.from('.team-members-section .sub-heading', {
                opacity: 0,
                y: 20,
                duration: 0.8
            });
              // Team profile page animations with enhanced effects
            gsap.from('.team-profile-container', {
                opacity: 0,
                y: 20,
                duration: 1,
                ease: 'power3.out'
            });
            
            gsap.from('.image-frame', {
                opacity: 0,
                y: 30,
                scale: 0.95,
                duration: 1,
                delay: 0.3,
                ease: 'back.out(1.5)'
            });
            
            gsap.from('.profile-heading', {
                opacity: 0,
                y: 20,
                duration: 0.8,
                delay: 0.4,
                ease: 'power2.out'
            });
            
            gsap.from('.profile-subsection', {
                opacity: 0,
                y: 30,
                duration: 0.8,
                stagger: 0.2,
                delay: 0.5,
                ease: 'power2.out'
            });
            
            gsap.from('.profile-cta', {
                opacity: 0,
                y: 20,
                scale: 0.95,
                duration: 0.8,
                delay: 0.9,
                ease: 'back.out(1.7)'
            });
            
            // Add subtle background animation
            gsap.from('.team-profile-section::before, .team-profile-section::after', {
                opacity: 0,
                duration: 1.5,
                delay: 0.2
            });
            
            gsap.from('.team-members-section .heading', {
                opacity: 0,
                y: 20,
                duration: 0.8,
                delay: 0.2
            });
            
            gsap.from('.team-members-section .lead', {
                opacity: 0,
                y: 20,
                duration: 0.8,
                delay: 0.4
            });
            
            // Staggered animation for cards - no scroll trigger
            gsap.from('.team-member-card', {
                opacity: 0,
                y: 30,
                duration: 0.8,
                stagger: 0.2
            });
        } else {
            // Fallback for browsers without GSAP
            animateTeamMembers();
        }        // Apply animated class immediately to all team cards
        animateTeamMembers();
        
        // Initialize profile section animation if it exists
        if ($('.team-profile-section').length) {
            animateProfileSection();
        }
        
        // Enhanced hover effects for social icons
        $('.team-member-card').hover(function() {
            $(this).find('.social-icon').each(function(index) {
                $(this).css('transition-delay', (index * 0.05) + 's');
            });
        }, function() {
            $(this).find('.social-icon').css('transition-delay', '0s');
        });
        
        // Initialize animation on page load
        setTimeout(function() {
            animateTeamMembers();
            if ($('.team-profile-section').length) {
                animateProfileSection();
            }
        }, 300);
    });

})(jQuery);