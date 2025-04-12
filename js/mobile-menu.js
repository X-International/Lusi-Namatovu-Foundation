/**
 * Mobile Menu Functionality
 * This script handles the custom mobile menu dropdown functionality
 */

(function() {
  'use strict';
  
  // Execute when DOM is fully loaded
  document.addEventListener('DOMContentLoaded', function() {
    initializeMobileMenu();
  });

  function initializeMobileMenu() {
    // Get all menu items with children
    const menuItems = document.querySelectorAll('.mobile-nav .menu-item-has-children');
    
    // Initial setup - ensure all submenus start closed
    menuItems.forEach(menuItem => {
      const submenu = menuItem.querySelector('.sub-menu');
      if (submenu) {
        submenu.style.display = 'none';
      }
    });
    
    // Attach click events directly to the menu items with children
    menuItems.forEach(menuItem => {
      const link = menuItem.querySelector('a');
      
      if (link) {
        // Remove any existing event listeners
        const newLink = link.cloneNode(true);
        link.parentNode.replaceChild(newLink, link);
        
        // Add new event listener
        newLink.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          
          const parent = this.parentNode;
          const submenu = parent.querySelector('.sub-menu');
          
          // Toggle menu-open class
          parent.classList.toggle('menu-open');
          
          // Show/hide submenu based on class
          if (parent.classList.contains('menu-open')) {
            if (submenu) {
              submenu.style.display = 'block';
            }
          } else {
            if (submenu) {
              submenu.style.display = 'none';
            }
          }
          
          return false;
        });
      }
    });
    
    // Ensure submenu links don't trigger parent toggle
    const submenuLinks = document.querySelectorAll('.mobile-nav .sub-menu a');
    submenuLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.stopPropagation();
      });
    });
  }
  
})();
