/**
 * Intro Section Functionality
 * Handles animations and interactions for the intro section
 */

function initIntroSection() {
  // Check if required elements exist
  const introSection = document.querySelector('.intro-section');
  if (!introSection) return;

  // Setup intersection observer for animation triggers
  if ("IntersectionObserver" in window) {
    const animatedElements = introSection.querySelectorAll('.hq-text-anim, .hq-fade-effect');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Get animation effect from data attribute
          const effect = entry.target.dataset.effect || 'fade-in';
          const delay = entry.target.dataset.delay || '0';
          
          // Add animation classes
          entry.target.classList.add('animated', effect);
          entry.target.style.animationDelay = `${delay}s`;
          
          // Unobserve after animation is triggered
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -10% 0px'
    });

    // Start observing each element
    animatedElements.forEach(el => observer.observe(el));
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    introSection.querySelectorAll('.hq-text-anim, .hq-fade-effect').forEach(el => {
      el.classList.add('animated', 'fade-in');
    });
  }
}
