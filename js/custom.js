/**
 * Modern Page Header functionality
 * Controls animations and scroll behavior
 * With improved performance and accessibility
 */
document.addEventListener("DOMContentLoaded", function () {
  // Initialize modern page header if it exists
  const pageHeader = document.querySelector(".modern-page-header");
  if (pageHeader) {
    initModernPageHeader();
  }

  // Initialize vision section animations and interactions if it exists
  const visionSection = document.querySelector(".vision-section");
  if (visionSection) {
    initVisionSection();
  }

  // Initialize About story section if it exists
  const aboutStorySection = document.querySelector(".about-story-container");
  if (aboutStorySection) {
    initAboutStorySection();
  }

  // Initialize Our Story section if it exists
  const storySection = document.querySelector(".story-section");
  if (storySection) {
    initStorySection();
  }

  // Initialize modern timeline if it exists
  const modernTimeline = document.querySelector(".modern-timeline");
  if (modernTimeline) {
    initModernTimeline();
  }

  // Initialize values section if it exists
  const valuesSection = document.querySelector(".values-section");
  if (valuesSection) {
    initValuesSection();
  }

  // Initialize needs section if it exists
  const needsSection = document.querySelector(".needs-section");
  if (needsSection) {
    initNeedsSection();
  }

  // Initialize founding story section if it exists
  const foundingStorySection = document.querySelector(
    ".founding-story-section"
  );
  if (foundingStorySection) {
    initFoundingStory();
  }

  // Initialize story timeline section if it exists
  const storyTimelineSection = document.querySelector(
    ".story-timeline-section"
  );
  if (storyTimelineSection) {
    initStoryTimeline();
  }

  // Initialize registration recognition section if it exists
  const registrationSection = document.querySelector(
    ".registration-recognition-section"
  );
  if (registrationSection) {
    initRegistrationSection();
  }

  // Initialize growth and expansion section if it exists
  const growthSection = document.querySelector(".growth-expansion-section");
  if (growthSection) {
    initGrowthExpansion();
  }

  // Initialize current focus section if it exists
  const currentFocusSection = document.querySelector(".current-focus-section");
  if (currentFocusSection) {
    initCurrentFocus();
  }

  // Initialize clothing program page functionality if elements exist
  const clothingProgramElements = document.querySelector(
    ".program-goals-section"
  );
  if (clothingProgramElements) {
    initClothingProgramPage();
  }
});

function initModernPageHeader() {
  // Ensure background image is visible on all devices
  const bgImage = document.querySelector(".mph-background-image");
  const bgContainer = document.querySelector(".mph-background-container");

  if (bgImage) {
    // Force visibility of background image
    bgImage.style.opacity = "1";

    // Ensure container has fallback background color
    if (bgContainer) {
      bgContainer.style.backgroundColor = "#1a2526";
    }
  }

  // Animate elements with staggered timing
  setTimeout(function () {
    const animatedElements = document.querySelectorAll(
      '[data-animation="fade-up"]'
    );

    animatedElements.forEach((element) => {
      const delay = parseFloat(element.getAttribute("data-delay") || 0);
      setTimeout(() => {
        element.classList.add("animated");
      }, delay * 1000);
    });
  }, 300);

  // Simple overlay darkening effect when scrolling
  let ticking = false;
  const overlay = document.querySelector(".mph-overlay");

  window.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        const scrolled = window.scrollY;

        if (overlay && scrolled < 300) {
          // Smooth transition for overlay darkness
          const alpha = Math.min(0.75, 0.5 + scrolled * 0.001);
          overlay.style.backgroundColor = `rgba(0, 0, 0, ${alpha})`;
        }

        ticking = false;
      });

      ticking = true;
    }
  });

  // Dynamically adjust title size for better readability
  const title = document.querySelector(".mph-title");
  if (title) {
    const checkOverflow = function () {
      if (title.offsetHeight > title.offsetWidth * 0.4) {
        title.classList.add("mph-title-wrapped");
      } else {
        title.classList.remove("mph-title-wrapped");
      }
    };

    checkOverflow();

    let resizeTimeout;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(checkOverflow, 100);
    });

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(checkOverflow);
    }
  }
}

/**
 * Vision Section animations and interactions
 * Handles animated progress bars, counter animations, timeline navigation
 * and scroll-based animations in the vision section
 */
function initVisionSection() {
  // Initialize progress bars with improved accessibility
  initProgressBars();

  // Initialize vision counters with improved animation
  initVisionCounters();

  // Initialize timeline functionality with keyboard navigation
  initTimeline();

  // Setup scroll triggered animations with better performance
  setupScrollAnimations();

  // Initialize the pillar cards with interaction effects
  initVisionPillars();

  // Initialize the vision impact section
  initVisionImpact();
}

// Initialize progress bar animations with improved accessibility and time-based calculation
function initProgressBars() {
  const progressBars = document.querySelectorAll(".animate-progress");

  if (progressBars.length === 0) return;

  // Time-based progress calculation (2024-2030 range)
  const calculateTimeBasedProgress = (baseValue) => {
    // Define start and end years
    const startYear = 2024;
    const endYear = 2030;

    // Get current date and calculate progress percentage
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    // Calculate progress based on time elapsed since 2024
    let progress;

    if (currentYear < startYear) {
      // If we're before the start year, use the base value
      progress = baseValue;
    } else if (currentYear > endYear) {
      // If we're past the end year, we're at 100%
      progress = 100;
    } else {
      // Calculate progress based on current time position between start and end years
      const totalMonths = (endYear - startYear) * 12;
      const elapsedMonths = (currentYear - startYear) * 12 + currentMonth;
      const timeProgress = elapsedMonths / totalMonths;

      // Calculate actual progress based on base value and time progress
      progress = baseValue + (100 - baseValue) * timeProgress;

      // Round to one decimal place for cleaner display
      progress = Math.round(progress * 10) / 10;
    }

    return progress;
  };

  // Create intersection observer to trigger progress animation when in view
  const progressObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const progressBar = entry.target;
          const baseValue = parseInt(
            progressBar.getAttribute("data-base-value") ||
              progressBar.getAttribute("data-target"),
            10
          );
          // Calculate actual target value based on time progress
          const targetValue = calculateTimeBasedProgress(baseValue);

          const percentageDisplay = entry.target
            .closest(".pillar-progress")
            .querySelector(".progress-percentage");

          // Update the data attributes for the current calculated value
          progressBar.setAttribute("data-target", targetValue);

          // Add ARIA live region for screen readers
          if (
            percentageDisplay &&
            !percentageDisplay.hasAttribute("aria-live")
          ) {
            percentageDisplay.setAttribute("aria-live", "polite");
          }

          // Animate the progress bar
          progressBar.style.width = `${targetValue}%`;
          progressBar.setAttribute("aria-valuenow", targetValue);

          // Animate the percentage text with easing
          if (percentageDisplay) {
            animateCounter(
              percentageDisplay,
              0,
              targetValue,
              1500,
              (value) => `${value}%`,
              "easeOutQuart"
            );
          }

          // Unobserve after triggering
          progressObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
  );

  // Observe each progress bar
  progressBars.forEach((bar) => {
    // Get the original base value and store it as a data attribute
    const originalValue = parseInt(bar.getAttribute("data-target"), 10);
    // Set base value attribute for reference
    bar.setAttribute("data-base-value", originalValue);

    // Observe the progress bar
    progressObserver.observe(bar);
  });
}

// Initialize vision counter animations with improved easing
function initVisionCounters() {
  const counters = document.querySelectorAll(".vision-counter");

  if (counters.length === 0) return;

  // Create intersection observer with better threshold
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const targetValue = parseInt(
            entry.target.getAttribute("data-count"),
            10
          );

          // Add ARIA live region for screen readers
          if (!entry.target.hasAttribute("aria-live")) {
            entry.target.setAttribute("aria-live", "polite");
          }

          // Animate the counter with improved easing
          animateCounter(
            entry.target,
            0,
            targetValue,
            2000,
            (value) => `${value}<span>+</span>`,
            "easeOutQuart"
          );

          // Unobserve after triggering
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
  );

  // Observe each counter
  counters.forEach((counter) => {
    counterObserver.observe(counter);
  });
}

// Enhanced timeline functionality with keyboard navigation and mobile optimization
function initTimeline() {
  const timelineContainer = document.querySelector(".timeline-container");
  if (!timelineContainer) return;

  // Timeline progress animation with improved timing
  const timelineProgress = document.querySelector(".timeline-line-progress");
  if (timelineProgress) {
    const progressObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => {
            timelineProgress.style.width = "100%";
          }, 500);
          progressObserver.unobserve(entries[0].target);
        }
      },
      { threshold: 0.3 }
    );

    progressObserver.observe(timelineContainer);
  }

  // Timeline navigation enhancement - especially for mobile
  const timelineNav = document.querySelector(".timeline-nav");
  if (!timelineNav) return;

  const timelineItems = document.querySelectorAll(".timeline-item");
  const timelineScroller = document.querySelector(".timeline-scroll-container");

  if (timelineItems.length === 0 || !timelineScroller) return;

  let currentIndex = 0;
  const totalItems = timelineItems.length;

  // Update timeline indicator text
  function updateIndicator() {
    const indicator = timelineNav.querySelector(".timeline-indicator");
    if (indicator) {
      indicator.textContent = `${currentIndex + 1} of ${totalItems}`;

      // Update ARIA attributes for screen readers
      indicator.setAttribute("aria-live", "polite");
      timelineScroller.setAttribute(
        "aria-activedescendant",
        `timeline-item-${currentIndex}`
      );
    }
  }

  // Scroll to specific timeline item with smooth animation
  function scrollToItem(index) {
    if (index < 0) index = 0;
    if (index >= totalItems) index = totalItems - 1;

    currentIndex = index;
    updateIndicator();

    // Get the target item's position for smoother scrolling
    const targetItem = timelineItems[index];
    const scrollPosition =
      targetItem.offsetLeft -
      timelineScroller.offsetWidth / 2 +
      targetItem.offsetWidth / 2;

    // Add active class for visual indication
    timelineItems.forEach((item, i) => {
      if (i === index) {
        item.classList.add("active");
        item.setAttribute("aria-current", "true");
      } else {
        item.classList.remove("active");
        item.removeAttribute("aria-current");
      }
    });

    // Smooth scroll with better animation options
    timelineScroller.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });
  }

  // Set up navigation buttons with improved interaction
  const prevButton = timelineNav.querySelector('[data-direction="prev"]');
  const nextButton = timelineNav.querySelector('[data-direction="next"]');

  if (prevButton) {
    prevButton.addEventListener("click", () => {
      scrollToItem(currentIndex - 1);
    });

    // Add extra keyboard accessibility
    prevButton.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        scrollToItem(currentIndex - 1);
      }
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      scrollToItem(currentIndex + 1);
    });

    // Add extra keyboard accessibility
    nextButton.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        scrollToItem(currentIndex + 1);
      }
    });
  }

  // Initialize indicator
  timelineItems.forEach((item, i) => {
    // Assign IDs for ARIA relationships
    item.id = `timeline-item-${i}`;

    // Make items keyboard navigable
    item.setAttribute("tabindex", "0");
    item.setAttribute("role", "tabpanel");
    item.setAttribute(
      "aria-label",
      `Timeline milestone: ${item.querySelector(".timeline-year").textContent}`
    );

    // Add keyboard navigation for each item
    item.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        scrollToItem(i + 1);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        scrollToItem(i - 1);
      } else if (e.key === "Home") {
        e.preventDefault();
        scrollToItem(0);
      } else if (e.key === "End") {
        e.preventDefault();
        scrollToItem(totalItems - 1);
      }
    });

    // Add click events
    item.addEventListener("click", () => {
      scrollToItem(i);
    });
  });

  // Add scroll snap functionality for touch devices
  if ("ontouchstart" in window) {
    timelineScroller.addEventListener(
      "scroll",
      debounce(() => {
        const scrollLeft = timelineScroller.scrollLeft;
        const containerWidth = timelineScroller.offsetWidth;

        // Find the closest timeline item to the center of the view
        let closestIndex = 0;
        let closestDistance = Number.MAX_VALUE;

        timelineItems.forEach((item, index) => {
          const itemLeft = item.offsetLeft;
          const itemCenter = itemLeft + item.offsetWidth / 2;
          const screenCenter = scrollLeft + containerWidth / 2;
          const distance = Math.abs(screenCenter - itemCenter);

          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        });

        // Update if the closest item has changed
        if (closestIndex !== currentIndex) {
          currentIndex = closestIndex;
          updateIndicator();

          // Update active class
          timelineItems.forEach((item, i) => {
            if (i === currentIndex) {
              item.classList.add("active");
              item.setAttribute("aria-current", "true");
            } else {
              item.classList.remove("active");
              item.removeAttribute("aria-current");
            }
          });
        }
      }, 100)
    );
  }

  // Initialize the first item as active
  updateIndicator();
  scrollToItem(0);

  // Adjust timeline dots with animation
  animateTimelineDots();
}

// Animate timeline dots sequentially
function animateTimelineDots() {
  const timelineDots = document.querySelectorAll(".timeline-dot");

  if (timelineDots.length === 0) return;

  const dotObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        // Add pulse animation class to each dot with delay
        timelineDots.forEach((dot, index) => {
          setTimeout(() => {
            dot.classList.add("pulse-animation");
          }, index * 300);
        });
        dotObserver.unobserve(entries[0].target);
      }
    },
    { threshold: 0.5 }
  );

  // Observe the first dot to trigger the sequence
  if (timelineDots[0]) {
    dotObserver.observe(timelineDots[0]);
  }
}

// Setup scroll-triggered animations with improved performance
function setupScrollAnimations() {
  const elementsToAnimate = document.querySelectorAll(
    ".vision-section .hq-fade-effect, .vision-section [data-fade-from]"
  );

  if (elementsToAnimate.length === 0) return;

  const animationObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = parseFloat(
            entry.target.getAttribute("data-delay") || 0
          );
          const fadeDirection = entry.target.getAttribute("data-fade-from");

          // Apply initial transform based on fade direction
          if (fadeDirection) {
            let initialTransform = "";

            switch (fadeDirection) {
              case "left":
                initialTransform = "translateX(-30px)";
                break;
              case "right":
                initialTransform = "translateX(30px)";
                break;
              case "top":
                initialTransform = "translateY(-30px)";
                break;
              case "bottom":
                initialTransform = "translateY(30px)";
                break;
            }

            entry.target.style.transform = initialTransform;
            entry.target.style.opacity = "0";
            entry.target.style.transition =
              "transform 0.8s ease, opacity 0.8s ease";
          }

          setTimeout(() => {
            if (fadeDirection) {
              entry.target.style.transform = "translate(0)";
              entry.target.style.opacity = "1";
            } else {
              entry.target.classList.add("animated");
            }
          }, delay * 1000);

          animationObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );

  elementsToAnimate.forEach((element) => {
    animationObserver.observe(element);
  });
}

// Initialize vision pillars with enhanced interactions
function initVisionPillars() {
  const visionPillars = document.querySelectorAll(".vision-pillar-card");

  if (visionPillars.length === 0) return;

  visionPillars.forEach((pillar, index) => {
    // Add ARIA attributes for accessibility
    pillar.setAttribute("role", "region");
    pillar.setAttribute(
      "aria-label",
      `Vision Pillar: ${pillar.querySelector("h4").textContent}`
    );

    // Add focus handling for keyboard navigation
    pillar.addEventListener("focus", () => {
      pillar.classList.add("pillar-focused");
    });

    pillar.addEventListener("blur", () => {
      pillar.classList.remove("pillar-focused");
    });

    // Add hover effects for the icons
    const pillarIcon = pillar.querySelector(".vision-pillar-icon");
    if (pillarIcon) {
      pillar.addEventListener("mouseenter", () => {
        pillarIcon.classList.add("icon-animated");
      });

      pillar.addEventListener("mouseleave", () => {
        pillarIcon.classList.remove("icon-animated");
      });
    }

    // Add click/tap interaction to show more details
    pillar.addEventListener("click", () => {
      // Toggle active state
      const isActive = pillar.classList.contains("active-pillar");

      // Reset all pillars
      document.querySelectorAll(".vision-pillar-card").forEach((p) => {
        p.classList.remove("active-pillar");
      });

      // If this wasn't the active one before, make it active now
      if (!isActive) {
        pillar.classList.add("active-pillar");

        // Focus on the progress bar for better UX
        const progressBar = pillar.querySelector(".progress-bar");
        if (progressBar) {
          // Add a subtle pulse effect
          progressBar.classList.add("pulse-progress");
          setTimeout(() => {
            progressBar.classList.remove("pulse-progress");
          }, 1500);
        }
      }
    });
  });
}

// Initialize vision impact section with enhanced animations
function initVisionImpact() {
  const impactSection = document.querySelector(".vision-impact");
  if (!impactSection) return;

  // Animate impact list items sequentially
  const impactItems = impactSection.querySelectorAll(".vision-impact-list li");

  if (impactItems.length > 0) {
    const impactObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          impactItems.forEach((item, index) => {
            setTimeout(() => {
              item.classList.add("impact-item-animated");
            }, index * 200);
          });
          impactObserver.unobserve(entries[0].target);
        }
      },
      { threshold: 0.3 }
    );

    impactObserver.observe(impactSection);
  }

  // Add hover effects to testimonial cards
  const testimonialCards = impactSection.querySelectorAll(
    ".vision-testimonial-card"
  );

  testimonialCards.forEach((card) => {
    // Add accessible hover state
    card.addEventListener("mouseenter", () => {
      card.setAttribute("data-hover", "true");
    });

    card.addEventListener("mouseleave", () => {
      card.removeAttribute("data-hover");
    });

    // Make cards keyboard focusable
    card.setAttribute("tabindex", "0");

    // Add focus styles
    card.addEventListener("focus", () => {
      card.classList.add("card-focused");
    });

    card.addEventListener("blur", () => {
      card.classList.remove("card-focused");
    });
  });
}

// Utility function for animating counters with custom formatting and easing
function animateCounter(
  element,
  start,
  end,
  duration,
  formatter,
  easingName = "linear"
) {
  let startTimestamp = null;

  // Easing functions
  const easings = {
    linear: (t) => t,
    easeInQuad: (t) => t * t,
    easeOutQuad: (t) => t * (2 - t),
    easeInOutQuad: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
    easeOutQuart: (t) => 1 - --t * t * t * t,
    easeInOutQuart: (t) =>
      t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t,
  };

  // Default to linear if the requested easing doesn't exist
  const easing = easings[easingName] || easings.linear;

  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const easedProgress = easing(progress);
    const value = Math.floor(easedProgress * (end - start) + start);

    element.innerHTML = formatter ? formatter(value) : value;

    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// Utility function for debouncing events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * About Story Section animations and interactions
 * Handles story card animations, quote highlighting, and
 * scroll-based sequential animations for the "Who We Are" section
 */
function initAboutStorySection() {
  // Animate story cards and their elements with a staggered effect
  animateStoryCards();

  // Add click interactions on story cards for engagement
  setupStoryCardInteractions();

  // Setup badge animations to pulse on hover/focus
  setupBadgeAnimations();

  // Set up automatic date updates for the timeline
  setupAutomaticDateUpdates();
}

// Animate story cards and their elements with a staggered effect
function animateStoryCards() {
  const storyCards = document.querySelectorAll(".about-story-card");

  if (storyCards.length === 0) return;

  // Create intersection observer for story cards to trigger animations when visible
  const storyObserver = new IntersectionObserver(
    (entries, index) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Apply staggered animations to the story card and its elements
          entry.target.classList.add("animated");

          // Animate each element within the story card sequentially
          const elementsToAnimate = entry.target.querySelectorAll(
            ".hq-text-anim, .hq-fade-effect"
          );
          elementsToAnimate.forEach((element, i) => {
            const baseDelay = index * 0.2; // Delay based on card order
            const elementDelay = parseFloat(
              element.getAttribute("data-delay") || 0
            );
            const totalDelay = baseDelay + i * 0.1 + elementDelay;

            setTimeout(() => {
              if (element.getAttribute("data-effect") === "fade-in") {
                element.style.opacity = "1";
                element.style.transform = "translateY(0)";
              } else if (
                element.getAttribute("data-effect") === "fade-in-bottom"
              ) {
                element.style.opacity = "1";
                element.style.transform = "translateY(0)";
              } else {
                element.classList.add("animated");
              }
            }, totalDelay * 1000);
          });

          // Unobserve after triggering
          storyObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  // Observe each story card
  storyCards.forEach((card) => {
    // Set initial state
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "opacity 0.8s ease, transform 0.8s ease";

    // Start observing
    storyObserver.observe(card);
  });

  // Animate the timeline connector with a delayed start
  const timelineConnector = document.querySelector(".story-timeline-connector");
  if (timelineConnector) {
    setTimeout(() => {
      timelineConnector.classList.add("animated");
    }, 800);
  }
}

// Add interactive features to story cards to enhance engagement
function setupStoryCardInteractions() {
  const storyCards = document.querySelectorAll(".about-story-card");

  storyCards.forEach((card) => {
    // Add focus state management for accessibility
    card.setAttribute("tabindex", "0");

    // Add event listeners for highlighting quotes when card is interacted with
    const quoteBlock = card.querySelector(".story-highlight blockquote");

    if (quoteBlock) {
      // Create animation for quotes on interaction
      const highlightQuote = () => {
        quoteBlock.classList.add("highlight-quote");
        quoteBlock.style.transform = "scale(1.05)";
        quoteBlock.style.color = "#0c7bc9";
      };

      const unhighlightQuote = () => {
        quoteBlock.classList.remove("highlight-quote");
        quoteBlock.style.transform = "";
        quoteBlock.style.color = "";
      };

      // Add transitions for smooth animations
      quoteBlock.style.transition = "transform 0.3s ease, color 0.3s ease";

      // Apply event listeners
      card.addEventListener("mouseenter", highlightQuote);
      card.addEventListener("focus", highlightQuote);
      card.addEventListener("mouseleave", unhighlightQuote);
      card.addEventListener("blur", unhighlightQuote);
    }

    // Add ARIA roles for better screen reader interaction
    card.setAttribute("role", "article");
    card.setAttribute("aria-roledescription", "Story card");
  });

  // Make the read more link act as a proper call-to-action
  const readMoreBtn = document.querySelector(".btn-story-more");

  if (readMoreBtn) {
    readMoreBtn.setAttribute("role", "button");

    readMoreBtn.addEventListener("mouseenter", () => {
      // Create a pulsing effect on the button icon
      const icon = readMoreBtn.querySelector("i");
      if (icon) {
        icon.style.animation = "pulse-icon 1s infinite";
      }
    });

    readMoreBtn.addEventListener("mouseleave", () => {
      const icon = readMoreBtn.querySelector("i");
      if (icon) {
        icon.style.animation = "";
      }
    });
  }
}

// Setup badge animations to pulse on hover/focus
function setupBadgeAnimations() {
  const storyBadges = document.querySelectorAll(".story-badge");

  storyBadges.forEach((badge) => {
    // Initial animation
    setTimeout(() => {
      badge.classList.add("badge-animate");
    }, 1500);

    // Add pulse effect on parent card hover
    const parentCard = badge.closest(".about-story-card");

    if (parentCard) {
      parentCard.addEventListener("mouseenter", () => {
        badge.classList.add("badge-pulse");
      });

      parentCard.addEventListener("mouseleave", () => {
        badge.classList.remove("badge-pulse");
      });
    }
  });
}

// Set up automatic date updates for the timeline
function setupAutomaticDateUpdates() {
  // Update the current year in the timeline
  const currentYearElements = document.querySelectorAll(
    ".timeline-current-date"
  );
  const currentYear = new Date().getFullYear();

  currentYearElements.forEach((element) => {
    element.textContent = currentYear;
  });

  // Calculate years of service dynamically
  const yearsCounter = document.querySelector(".years-counter");
  if (yearsCounter) {
    const foundingYear = 2016; // The year the foundation was established
    const yearsOfService = currentYear - foundingYear;
    yearsCounter.textContent = yearsOfService;
  }
}

// Initialize modern timeline visualization
function initModernTimeline() {
  const timelineElem = document.querySelector(".modern-timeline");
  if (!timelineElem) return;

  // Animate timeline dots
  const timelineDots = timelineElem.querySelectorAll(".timeline-dot");

  if (timelineDots.length > 0) {
    // Create intersection observer to trigger dot animations
    const dotObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          timelineDots.forEach((dot, index) => {
            setTimeout(() => {
              dot.classList.add("pulse-animation");
            }, index * 500);
          });

          // Animate the timeline line after dots start pulsing
          const timelineLine = timelineElem.querySelector(".timeline-line");
          if (timelineLine) {
            setTimeout(() => {
              timelineLine.classList.add("line-animation");
            }, 500);
          }

          dotObserver.unobserve(entries[0].target);
        }
      },
      { threshold: 0.5 }
    );

    dotObserver.observe(timelineElem);
  }

  // Update the timeline dates with the current year
  const currentDateElement = timelineElem.querySelector(
    ".timeline-current-date"
  );
  if (currentDateElement) {
    currentDateElement.textContent = new Date().getFullYear();
  }
}

/**
 * Values Section Initialization
 * Handles animations and interactions for the Values section
 */
function initValuesSection() {
  // Initialize value cards with enhanced interactivity
  initValueCards();

  // Initialize the values progress indicator
  initValuesProgress();

  // Add ARIA accessibility enhancements
  enhanceValuesAccessibility();
}

/**
 * Initialize value cards with interactive features
 * Adds hover/focus effects and animated interactions
 */
function initValueCards() {
  const valueCards = document.querySelectorAll(".value-card");

  if (valueCards.length === 0) return;

  valueCards.forEach((card, index) => {
    // Add staggered animations when cards come into view
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Add a small delay based on card index for staggered effect
          setTimeout(() => {
            card.classList.add("value-card-visible");

            // Animate the icon with a slight delay
            const icon = card.querySelector(".value-icon");
            if (icon) {
              setTimeout(() => {
                icon.classList.add("value-icon-animated");
              }, 300);
            }
          }, index * 150);

          observer.unobserve(card);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(card);

    // Add keyboard navigation between cards
    card.addEventListener("keydown", (e) => {
      let targetCard = null;

      // Handle arrow key navigation between cards
      switch (e.key) {
        case "ArrowRight":
          targetCard = findNextCard(card, "next");
          break;
        case "ArrowLeft":
          targetCard = findNextCard(card, "prev");
          break;
        case "ArrowDown":
          targetCard = findNextCard(card, "below");
          break;
        case "ArrowUp":
          targetCard = findNextCard(card, "above");
          break;
      }

      if (targetCard) {
        e.preventDefault();
        targetCard.focus();
      }
    });

    // Add touch/click interaction to show overlay
    card.addEventListener("click", () => {
      // Toggle the overlay to be permanently visible
      const overlay = card.querySelector(".value-card-overlay");
      if (overlay) {
        // Remove active class from all other cards
        document
          .querySelectorAll(".value-card-overlay-active")
          .forEach((el) => {
            if (el !== overlay) {
              el.classList.remove("value-card-overlay-active");
            }
          });

        // Toggle for this card
        overlay.classList.toggle("value-card-overlay-active");

        // Make the card's icon pulse when overlay is active
        const icon = card.querySelector(".value-icon");
        if (icon) {
          if (overlay.classList.contains("value-card-overlay-active")) {
            icon.classList.add("value-icon-pulse");
          } else {
            icon.classList.remove("value-icon-pulse");
          }
        }
      }
    });
  });

  // Add CSS for dynamic classes created here
  addValueCardStyles();
}

/**
 * Find the next value card in a specified direction
 * Enables keyboard navigation between cards in a grid
 */
function findNextCard(currentCard, direction) {
  const cards = Array.from(document.querySelectorAll(".value-card"));
  const currentIndex = cards.indexOf(currentCard);

  // Get the cards per row (depends on responsive layout)
  const cardsPerRow =
    window.innerWidth >= 992 ? 3 : window.innerWidth >= 768 ? 2 : 1;

  let targetIndex = currentIndex;

  switch (direction) {
    case "next":
      targetIndex = (currentIndex + 1) % cards.length;
      break;
    case "prev":
      targetIndex = (currentIndex - 1 + cards.length) % cards.length;
      break;
    case "below":
      targetIndex = currentIndex + cardsPerRow;
      if (targetIndex >= cards.length) targetIndex = currentIndex;
      break;
    case "above":
      targetIndex = currentIndex - cardsPerRow;
      if (targetIndex < 0) targetIndex = currentIndex;
      break;
  }

  return cards[targetIndex] || null;
}

/**
 * Add dynamic CSS styles for value cards
 * These styles are added at runtime to avoid modifying the CSS file
 */
function addValueCardStyles() {
  // Create style element if it doesn't exist
  let styleEl = document.getElementById("value-card-dynamic-styles");
  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.id = "value-card-dynamic-styles";
    document.head.appendChild(styleEl);
  }

  // Add CSS rules for dynamic classes
  styleEl.textContent = `
        .value-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .value-card-visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .value-icon-animated {
            animation: value-icon-entrance 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .value-icon-pulse {
            animation: value-icon-pulse 1.5s infinite !important;
        }
        
        .value-card-overlay-active {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        @keyframes value-icon-entrance {
            0% { transform: scale(0.5); opacity: 0; }
            40% { transform: scale(1.2); }
            100% { transform: scale(1); opacity: 1; }
        }
        
        @media (prefers-reduced-motion: reduce) {
            .value-card {
                transition: none;
            }
            
            .value-card-visible {
                opacity: 1;
                transform: none;
            }
            
            .value-icon-animated,
            .value-icon-pulse {
                animation: none !important;
            }
        }
    `;
}

/**
 * Initialize the values progress indicator
 * Creates an animated progress bar with step indicators
 */
function initValuesProgress() {
  const progressIndicator = document.querySelector(
    ".values-progress-indicator"
  );
  if (!progressIndicator) return;

  const steps = document.querySelectorAll(".values-steps span");
  if (steps.length === 0) return;

  // Set up click/touch interactions for the steps
  steps.forEach((step, index) => {
    step.addEventListener("click", () => {
      // Update steps active state
      steps.forEach((s) => s.classList.remove("active"));
      step.classList.add("active");

      // Update progress bar width
      const progressPercent = (index / (steps.length - 1)) * 100;
      progressIndicator.style.width = `${progressPercent}%`;

      // Save the current step to session storage
      if (window.sessionStorage) {
        sessionStorage.setItem("valuesStep", index.toString());
      }
    });

    // Make steps keyboard navigable
    step.setAttribute("tabindex", "0");
    step.setAttribute("role", "button");
    step.setAttribute("aria-label", `Select step: ${step.textContent}`);

    // Add keyboard support
    step.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        step.click();
      }
    });
  });

  // Check for saved step in session storage
  if (window.sessionStorage) {
    const savedStep = sessionStorage.getItem("valuesStep");
    if (savedStep !== null) {
      const stepIndex = parseInt(savedStep, 10);
      if (stepIndex >= 0 && stepIndex < steps.length) {
        steps[stepIndex].click();
      }
    }
  }

  // Add intersection observer to animate the progress on scroll
  const progressContainer = document.querySelector(".values-cta-container");
  if (progressContainer) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // If no step is active, activate the first one
          if (!document.querySelector(".values-steps span.active")) {
            steps[0].classList.add("active");
            progressIndicator.style.width = "33%";
          }

          observer.unobserve(progressContainer);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(progressContainer);
  }
}

/**
 * Enhance accessibility for the Values section
 * Adds ARIA attributes and improves keyboard navigation
 */
function enhanceValuesAccessibility() {
  // Add region role to the values section
  const valuesSection = document.querySelector(".values-section");
  if (!valuesSection) return;

  valuesSection.setAttribute("role", "region");

  // Add announcement for screen readers when a card is focused
  const valueCards = document.querySelectorAll(".value-card");
  valueCards.forEach((card) => {
    card.addEventListener("focus", () => {
      // Find the title of the card to announce it
      const title = card.querySelector('[id^="value-title-"]');
      if (title) {
        // Create or update the live region
        let liveRegion = document.getElementById("values-a11y-announce");
        if (!liveRegion) {
          liveRegion = document.createElement("div");
          liveRegion.id = "values-a11y-announce";
          liveRegion.setAttribute("aria-live", "polite");
          liveRegion.className = "visually-hidden";
          document.body.appendChild(liveRegion);
        }

        // Announce the card title
        liveRegion.textContent = `Selected value: ${title.textContent}`;

        // Clear after announcement
        setTimeout(() => {
          liveRegion.textContent = "";
        }, 3000);
      }
    });
  });

  // Add CSS for visually hidden elements
  let styleEl = document.getElementById("values-a11y-styles");
  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.id = "values-a11y-styles";
    styleEl.textContent = `
            .visually-hidden {
                position: absolute;
                width: 1px;
                height: 1px;
                margin: -1px;
                padding: 0;
                overflow: hidden;
                clip: rect(0, 0, 0, 0);
                border: 0;
            }
        `;
    document.head.appendChild(styleEl);
  }
}

/**
 * Initialize Needs Section
 * Handles animations and interactions for "The Need in Rakai" section
 */
function initNeedsSection() {
  const section = document.querySelector(".needs-section");
  if (!section) return;

  // Initialize card animations with intersection observer
  const cards = section.querySelectorAll(".promo-card");
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Get any delay attribute
          const delay = parseFloat(entry.target.getAttribute("data-wow-delay") || 0);
          
          // Add a staggered animation effect
          setTimeout(() => {
            entry.target.classList.add("animated");
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }, delay * 1000);
          
          // Unobserve once animated
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );
  
  // Set initial state for cards and observe them
  cards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    observer.observe(card);
  });
  
  // Add interaction effects
  cards.forEach((card) => {
    // Add hover effects for image overlay
    card.addEventListener("mouseenter", () => {
      const image = card.querySelector(".promo-card-image");
      if (image) {
        image.style.opacity = "1";
      }
    });
    
    card.addEventListener("mouseleave", () => {
      // Don't reset opacity for cards that have the active class
      if (!card.classList.contains("promo-card-active")) {
        const image = card.querySelector(".promo-card-image");
        if (image) {
          image.style.opacity = "";
        }
      }
    });
    
    // Add keyboard accessibility
    card.setAttribute("tabindex", "0");
    
    card.addEventListener("focus", () => {
      const image = card.querySelector(".promo-card-image");
      if (image) {
        image.style.opacity = "1";
      }
    });
    
    card.addEventListener("blur", () => {
      // Don't reset opacity for cards that have the active class
      if (!card.classList.contains("promo-card-active")) {
        const image = card.querySelector(".promo-card-image");
        if (image) {
          image.style.opacity = "";
        }
      }
    });
  });
  
  // Support for reduced motion preferences
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    cards.forEach(card => {
      card.style.transition = "none";
    });
  }
}

/**
 * Enhanced Founding Story Section
 * Handles animations, interactions, and accessibility features
 */
function initFoundingStory() {
  const section = document.querySelector(".founding-story-section");
  if (!section) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target
            .querySelectorAll("[data-animation]")
            .forEach((element) => {
              const delay = parseFloat(element.dataset.delay || 0);
              setTimeout(() => element.classList.add("animated"), delay * 1000);
            });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
  );

  observer.observe(section);

  // Initialize image hover effects
  section.querySelectorAll(".founding-story-image-wrapper").forEach((image) => {
    image.setAttribute("tabindex", "0");
    ["mouseenter", "focus"].forEach((event) => {
      image.addEventListener(event, () =>
        image.setAttribute("data-hover", "true")
      );
    });
    ["mouseleave", "blur"].forEach((event) => {
      image.addEventListener(event, () => image.removeAttribute("data-hover"));
    });
  });

  // Smooth scroll for CTA
  const ctaButton = section.querySelector(".story-cta .btn");
  if (ctaButton) {
    ctaButton.addEventListener("click", (e) => {
      e.preventDefault();
      document
        .querySelector(ctaButton.getAttribute("href"))
        ?.scrollIntoView({ behavior: "smooth" });
    });
  }
}

/**
 * Initialize timeline section with improved mobile handling
 */
function initStoryTimeline() {
  const section = document.querySelector(".story-timeline-section");
  if (!section) return;

  const timeline = section.querySelector(".story-timeline");
  const markers = timeline.querySelectorAll(".timeline-marker");
  const track = timeline.querySelector(".timeline-track");
  const prevBtn = section.querySelector('[data-direction="prev"]');
  const nextBtn = section.querySelector('[data-direction="next"]');
  const indicator = section.querySelector(".timeline-indicator");

  let currentIndex = 0;
  let touchStartX = 0;
  let scrollLeft = 0;
  const totalMarkers = markers.length;

  // Smooth scroll to active marker
  function scrollToMarker(marker) {
    if (window.innerWidth >= 992) return;

    const timelineRect = timeline.getBoundingClientRect();
    const markerRect = marker.getBoundingClientRect();
    const scrollTo =
      timeline.scrollLeft +
      (markerRect.left - timelineRect.left) - 
      timelineRect.width / 2 +
      markerRect.width / 2;

    timeline.scrollTo({
      left: scrollTo,
      behavior: "smooth",
    });
  }

  // Handle touch events for smooth mobile scrolling
  timeline.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.touches[0].clientX;
      scrollLeft = timeline.scrollLeft;
      timeline.style.scrollBehavior = "auto";
    },
    { passive: true }
  );

  timeline.addEventListener(
    "touchmove",
    (e) => {
      if (!touchStartX) return;
      const touchDiff = touchStartX - e.touches[0].clientX;
      timeline.scrollLeft = scrollLeft + touchDiff;
    },
    { passive: true }
  );

  timeline.addEventListener("touchend", () => {
    touchStartX = null;
    timeline.style.scrollBehavior = "smooth";

    // Snap to nearest marker
    const timelineRect = timeline.getBoundingClientRect();
    let closestMarker = markers[0];
    let minDistance = Infinity;

    markers.forEach((marker) => {
      const markerRect = marker.getBoundingClientRect();
      const distance = Math.abs(
        markerRect.left - timelineRect.left - timelineRect.width / 2
      );
      if (distance < minDistance) {
        minDistance = distance;
        closestMarker = marker;
      }
    });

    const markerIndex = Array.from(markers).indexOf(closestMarker);
    activateMarker(markerIndex);
  });

  function activateMarker(index) {
    markers.forEach((m, i) => {
      if (i === index) {
        m.classList.add("active");
        m.setAttribute("aria-current", "true");
        scrollToMarker(m);
      } else {
        m.classList.remove("active");
        m.removeAttribute("aria-current");
      }
    });

    currentIndex = index;
    indicator.textContent = `${currentIndex + 1} of ${totalMarkers}`;

    if (prevBtn) prevBtn.disabled = currentIndex === 0;
    if (nextBtn) nextBtn.disabled = currentIndex === totalMarkers - 1;
  }

  // Navigation buttons
  prevBtn?.addEventListener("click", () => {
    if (currentIndex > 0) {
      activateMarker(currentIndex - 1);
    }
  });

  nextBtn?.addEventListener("click", () => {
    if (currentIndex < totalMarkers - 1) {
      activateMarker(currentIndex + 1);
    }
  });

  // Initialize with first marker active
  activateMarker(0);

  // Handle resize events
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      scrollToMarker(markers[currentIndex]);
    }, 100);
  });
}

/**
 * Initialize Registration and Recognition Section
 * Handles animations and accessibility features for the registration milestone section
 */
function initRegistrationSection() {
  const section = document.querySelector(".registration-recognition-section");
  const wrapper = section.querySelector(".recognition-wrapper");

  // Create intersection observer for section elements
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        // Animate each element with proper timing
        const icon = wrapper.querySelector(".doc-icon");
        const title = wrapper.querySelector(".recognition-title");
        const content = wrapper.querySelector(".recognition-content");

        // Staggered animations
        setTimeout(() => icon.classList.add("animated"), 100);
        setTimeout(() => title.classList.add("animated"), 300);
        setTimeout(() => content.classList.add("animated"), 500);

        // Unobserve after animation
        observer.unobserve(section);
      }
    },
    { threshold: 0.2 }
  );

  observer.observe(section);

  // Add ARIA labels for accessibility
  const docIcon = section.querySelector(".doc-icon");
  if (docIcon) {
    docIcon.setAttribute("role", "img");
    docIcon.setAttribute(
      "aria-label",
      "Document icon representing CBO registration"
    );
  }
}

/**
 * Growth and Expansion Section Initialization
 * Handles animations, counters, and accessibility for the Growth and Expansion section
 */
function initGrowthExpansion() {
  const section = document.querySelector(".growth-expansion-section");
  if (!section) return;

  // Initialize timeline animations
  const timelineEntries = document.querySelectorAll(".timeline-entry");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";

          // Animate the timeline dot after the entry appears
          const dot = entry.target.querySelector(".timeline-dot");
          if (dot) {
            setTimeout(() => {
              dot.style.transform = "translate(-50%, 0) scale(1)";
              dot.style.opacity = "1";
            }, 300);
          }

          // Remove observer after animation
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  // Set initial styles and observe timeline entries
  timelineEntries.forEach((entry) => {
    entry.style.opacity = "0";
    entry.style.transform = "translateY(30px)";
    entry.style.transition = "opacity 0.6s ease, transform 0.6s ease";

    const dot = entry.querySelector(".timeline-dot");
    if (dot) {
      dot.style.opacity = "0";
      dot.style.transform = "translate(-50%, 0) scale(0.5)";
      dot.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    }

    observer.observe(entry);
  });

  // Initialize impact counters
  const impactCards = document.querySelectorAll(".impact-card");
  const impactObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target.querySelector(".impact-number");
          const targetValue = parseInt(counter.getAttribute("data-count"), 10);

          // Animate counter with easing
          animateCounter(
            counter,
            0,
            targetValue,
            2000,
            (value) => (value === targetValue ? `${value}+` : value),
            "easeOutQuart"
          );

          // Add appear animation
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";

          // Remove observer after animation
          impactObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  // Set initial styles and observe impact cards
  impactCards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    card.style.transitionDelay = `${index * 0.2}s`;
    impactObserver.observe(card);
  });

  // Add keyboard navigation for timeline entries
  timelineEntries.forEach((entry) => {
    entry.setAttribute("tabindex", "0");
    entry.setAttribute("role", "article");

    entry.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        entry.click();
      }
    });

    // Add hover state management
    entry.addEventListener("mouseenter", () => {
      entry.setAttribute("data-hover", "true");
      const content = entry.querySelector(".timeline-content");
      if (content) content.style.transform = "translateY(-5px)";
    });

    entry.addEventListener("mouseleave", () => {
      entry.removeAttribute("data-hover");
      const content = entry.querySelector(".timeline-content");
      if (content) content.style.transform = "";
    });
  });

  // Handle reduced motion preference
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    timelineEntries.forEach((entry) => {
      entry.style.transition = "none";
      const dot = entry.querySelector(".timeline-dot");
      if (dot) dot.style.transition = "none";
    });

    impactCards.forEach((card) => {
      card.style.transition = "none";
    });
  }
}

/**
 * Initialize Current Focus Section
 * Handles animations and accessibility features for the current focus section
 */
function initCurrentFocus() {
  const section = document.querySelector(".current-focus-section");
  if (!section) return;

  // Create intersection observer for section elements
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        // Animate content with proper timing
        const content = section.querySelector(".current-focus-content");
        const title = section.querySelector(".section-title");
        const cta = section.querySelector(".cta-wrapper");

        // Add animations with staggered timing
        if (title) title.classList.add("animated");

        if (content) {
          setTimeout(() => {
            content.classList.add("animated");
          }, 200);
        }

        if (cta) {
          setTimeout(() => {
            cta.classList.add("animated");
          }, 400);
        }

        // Unobserve after animation
        observer.unobserve(section);
      }
    },
    { threshold: 0.2 }
  );

  // Start observing the section
  observer.observe(section);

  // Add ARIA labels for accessibility
  const button = section.querySelector(".btn-primary");
  if (button) {
    button.setAttribute("role", "button");

    // Add keyboard interaction
    button.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        button.click();
      }
    });
  }

  // Handle reduced motion preference
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const animatedElements = section.querySelectorAll(
      ".animated, [data-animation]"
    );
    animatedElements.forEach((element) => {
      element.style.transition = "none";
    });
  }
}

/**
 * Initialize animations and interactions for the clothing program page
 */
function initClothingProgramPage() {
  // Initialize goal counter animations
  initializeCounters();

  // Initialize scroll-based animations
  setupScrollAnimations();

  // Initialize responsive image handling
  setupResponsiveImages();

  // Initialize testimonial interactions
  initializeTestimonials();
}

// Counter animation function for goal and impact numbers
function initializeCounters() {
  const counters = document.querySelectorAll(".counter-wrapper");

  // Setup intersection observer for counter animations
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.getAttribute("data-count")) || 0;
          let count = 0;
          const duration = 2000; // 2 seconds
          const increment = target / (duration / 16); // 60fps

          const updateCounter = () => {
            count += increment;
            if (count < target) {
              counter.textContent = Math.ceil(count);
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target;
            }
          };

          updateCounter();
          counterObserver.unobserve(counter);
        }
      });
    },
    { threshold: 0.5 }
  );

  // Observe each counter element
  counters.forEach((counter) => counterObserver.observe(counter));
}

// Setup scroll-based animations for various sections
function setupScrollAnimations() {
  // Elements to animate on scroll
  const elements = document.querySelectorAll(".hq-fade-effect");

  const scrollObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.getAttribute("data-delay") || 0;
          setTimeout(() => {
            entry.target.classList.add("animated");
          }, delay * 1000);
          scrollObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  elements.forEach((element) => scrollObserver.observe(element));
}

// Handle responsive images loading and transitions
function setupResponsiveImages() {
  const images = document.querySelectorAll(
    ".story-image img, .program-image img"
  );

  images.forEach((img) => {
    // Add loading animation
    img.addEventListener("load", () => {
      img.classList.add("loaded");
    });

    // Handle error cases
    img.addEventListener("error", () => {
      img.src = "images/fallback-image.jpg"; // Fallback image
    });
  });
}

// Initialize testimonial interactions
function initializeTestimonials() {
  const testimonials = document.querySelectorAll(".impact-testimonial-card");

  testimonials.forEach((testimonial) => {
    testimonial.addEventListener("mouseenter", () => {
      testimonial.classList.add("active");
    });

    testimonial.addEventListener("mouseleave", () => {
      testimonial.classList.remove("active");
    });

    // Ensure accessibility
    testimonial.addEventListener("focus", () => {
      testimonial.classList.add("active");
    });

    testimonial.addEventListener("blur", () => {
      testimonial.classList.remove("active");
    });
  });
}

/**
 * Initialize Our Story section functionality
 * Handles animations, image hover effects, and stat card interactions
 */
function initStorySection() {
  // Animate elements when they come into view
  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  // Create intersection observer for text content animation
  const textObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Get any explicit delay attribute or use default delays
        const paragraphs = entry.target.querySelectorAll('.story-text');
        
        paragraphs.forEach((paragraph, index) => {
          const delay = paragraph.getAttribute('data-delay') || (index * 0.1 + 0.1);
          
          setTimeout(() => {
            paragraph.style.opacity = '1';
            paragraph.style.transform = 'translateY(0)';
          }, delay * 1000);
        });
        
        // Handle quote animations if present
        const quoteElement = entry.target.querySelector('.story-quote');
        if (quoteElement) {
          setTimeout(() => {
            quoteElement.style.opacity = '1';
            quoteElement.style.transform = 'translateY(0)';
          }, 0.4 * 1000);
        }
        
        // Unobserve once animated
        textObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Create intersection observer for image and stat cards animation
  const mediaObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Handle founder image container animation
        const imageContainer = entry.target.querySelector('.founder-image-container');
        if (imageContainer) {
          setTimeout(() => {
            imageContainer.style.opacity = '1';
            imageContainer.style.transform = 'translateY(0)';
          }, 200);
        }
        
        // Handle year badge animation
        const yearBadge = entry.target.querySelector('.year-badge');
        if (yearBadge) {
          setTimeout(() => {
            yearBadge.style.opacity = '1';
            yearBadge.style.transform = 'translateY(0)';
          }, 400);
        }
        
        // Handle impact stat cards animation
        const statCards = entry.target.querySelectorAll('.impact-stat-card');
        statCards.forEach((card, index) => {
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, (index * 150 + 600));
        });
        
        // Unobserve once animated
        mediaObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Set initial states and observe elements
  const storyContentWrap = document.querySelector('.story-content-wrap');
  if (storyContentWrap) {
    // Set initial state for text elements
    const textElements = storyContentWrap.querySelectorAll('.story-text');
    textElements.forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Set initial state for quote
    const quoteElement = storyContentWrap.querySelector('.story-quote');
    if (quoteElement) {
      quoteElement.style.opacity = '0';
      quoteElement.style.transform = 'translateY(20px)';
      quoteElement.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    }
    
    // Start observing
    textObserver.observe(storyContentWrap);
  }
  
  const founderImageWrapper = document.querySelector('.founder-image-wrapper');
  if (founderImageWrapper) {
    // Set initial state for image container
    const imageContainer = founderImageWrapper.querySelector('.founder-image-container');
    if (imageContainer) {
      imageContainer.style.opacity = '0';
      imageContainer.style.transform = 'translateY(20px)';
      imageContainer.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    }
    
    // Set initial state for year badge
    const yearBadge = founderImageWrapper.querySelector('.year-badge');
    if (yearBadge) {
      yearBadge.style.opacity = '0';
      yearBadge.style.transform = 'translateY(20px)';
      yearBadge.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    }
    
    // Set initial state for stat cards
    const statCards = founderImageWrapper.querySelectorAll('.impact-stat-card');
    statCards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Start observing
    mediaObserver.observe(founderImageWrapper);
  }

  // Add hover effects for impact stat cards with improved performance
  const statCards = document.querySelectorAll('.impact-stat-card');
  if (statCards.length > 0) {
    statCards.forEach(card => {
      // Add hover effect only if not using reduced motion
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        card.addEventListener('mouseenter', () => {
          card.style.transform = 'translateY(-5px)';
          card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', () => {
          card.style.transform = 'translateY(0)';
          card.style.boxShadow = '';
        });
      }
      
      // Add focus accessibility
      card.addEventListener('focus', () => {
        card.style.outline = '2px solid var(--color-primary, #1e90ff)';
        card.style.outlineOffset = '2px';
      });
      
      card.addEventListener('blur', () => {
        card.style.outline = '';
        card.style.outlineOffset = '';
      });
    });
  }

  // Enhanced image hover effect with improved performance
  const founderImage = document.querySelector('.founder-image-container img');
  if (founderImage && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const imageContainer = founderImage.parentElement;
    
    imageContainer.addEventListener('mouseenter', () => {
      founderImage.style.transform = 'scale(1.03)';
    });
    
    imageContainer.addEventListener('mouseleave', () => {
      founderImage.style.transform = 'scale(1)';
    });
  }
}
