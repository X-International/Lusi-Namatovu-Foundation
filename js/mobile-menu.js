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
    // Setup mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const offcanvasSidebar = document.getElementById('offcanvas-sidebar');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const hideOffcanvasBtn = document.getElementById('hide-offcanvas-sidemenu');
    
    if (mobileMenuToggle && offcanvasSidebar && mobileMenuOverlay) {
      mobileMenuToggle.addEventListener('click', function() {
        document.body.classList.toggle('mobile-menu-active');
        offcanvasSidebar.classList.toggle('active');
        mobileMenuOverlay.classList.toggle('active');
      });
      
      mobileMenuOverlay.addEventListener('click', function() {
        document.body.classList.remove('mobile-menu-active');
        offcanvasSidebar.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
      });
      
      if (hideOffcanvasBtn) {
        hideOffcanvasBtn.addEventListener('click', function() {
          document.body.classList.remove('mobile-menu-active');
          offcanvasSidebar.classList.remove('active');
          mobileMenuOverlay.classList.remove('active');
        });
      }
    }
    
    // Get all menu items with children
    const menuItems = document.querySelectorAll('.mobile-nav .menu-item-has-children');
    
    // Clear any existing toggles first to avoid duplicate icons
    menuItems.forEach(menuItem => {
      const existingToggle = menuItem.querySelector('.dropdown-toggle');
      if (existingToggle) {
        existingToggle.remove();
      }
    });
    
    // Initial setup - ensure all submenus start closed
    menuItems.forEach(menuItem => {
      const submenu = menuItem.querySelector('.sub-menu');
      const link = menuItem.querySelector('a');
      
      if (submenu) {
        submenu.style.display = 'none';
        
        // Create dropdown toggle indicator (only once)
        const toggleBtn = document.createElement('span');
        toggleBtn.className = 'dropdown-toggle';
        // toggleBtn.innerHTML = '<i></i>';
        link.appendChild(toggleBtn);
      }
    });
    
    // Attach click events to handle accordion behavior
    menuItems.forEach(menuItem => {
      const link = menuItem.querySelector('a');
      
      if (link) {
        // Remove any existing click event listeners
        const clonedLink = link.cloneNode(true);
        link.parentNode.replaceChild(clonedLink, link);
        
        // Add new click event listener
        clonedLink.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          
          const parent = this.parentNode;
          const submenu = parent.querySelector('.sub-menu');
          
          // Toggle the clicked submenu
          parent.classList.toggle('menu-open');
          
          if (submenu) {
            // Simple toggle display property (more reliable)
            if (submenu.style.display === 'none' || !submenu.style.display) {
              submenu.style.display = 'block';
            } else {
              submenu.style.display = 'none';
            }
          }
          
          return false;
        });
      }
    });
    
    // Make sure submenu links work properly and don't trigger parent toggle
    const submenuLinks = document.querySelectorAll('.mobile-nav .sub-menu a');
    submenuLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.stopPropagation();
        // Only prevent default if it's a # link
        if (this.getAttribute('href') === '#') {
          e.preventDefault();
        }
      });
    });
  }
  
})();
