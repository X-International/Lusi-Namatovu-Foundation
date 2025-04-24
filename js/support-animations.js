// Support section card animations
document.addEventListener('DOMContentLoaded', function() {
    // Get all the get-involved-card elements
    const cards = document.querySelectorAll('.get-involved-card');
    
    // Create an intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add a delay based on the card's index for staggered animation
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 200); // Stagger by 0.2 seconds
                
                // Once the animation is applied, stop observing this card
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 }); // Trigger when 20% of the card is visible
    
    // Observe each card
    cards.forEach(card => observer.observe(card));
});