
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
        
        // Profile page animations
        function animateProfileSection() {
            $('.profile-image').addClass('animated-in');
            $('.profile-content').addClass('animated-in');
        }
          // Initialize GSAP animations if available
        if (typeof gsap !== 'undefined') {
            // Animate the heading section immediately
            gsap.from('.team-members-section .sub-heading', {
                opacity: 0,
                y: 20,
                duration: 0.8
            });
            
            // Team profile page animations
            gsap.from('.profile-image', {
                opacity: 0,
                x: -30,
                duration: 0.8,
                ease: 'power2.out'
            });
            
            gsap.from('.profile-heading', {
                opacity: 0,
                y: 20,
                duration: 0.8,
                delay: 0.2,
                ease: 'power2.out'
            });
            
            gsap.from('.profile-subsection', {
                opacity: 0,
                y: 30,
                duration: 0.8,
                stagger: 0.2,
                delay: 0.4,
                ease: 'power2.out'
            });
            
            gsap.from('.profile-cta', {
                opacity: 0,
                y: 20,
                duration: 0.8,
                delay: 0.8,
                ease: 'power2.out'
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