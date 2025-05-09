(function ($) {
  "use strict";

  // Register GSAP
  gsap.registerPlugin(ScrollTrigger);

  // GSAP Config
  gsap.config({
    nullTargetWarn: false,
  });

  // Preloader
  gsap.set("body", {
    overflow: "hidden",
  });

  window.addEventListener("load", function () {
    var loaderTl = gsap.timeline();

    loaderTl.to(".preloader-logo", {
      delay: 1.5,
      y: -70,
      opacity: 0,
    });

    loaderTl.to(".hq-preloader-bg span", {
      height: 0,
      duration: 1,
      stagger: {
        amount: 0.5,
      },
      ease: "power4.inOut",
    });

    loaderTl.set("body", {
      overflow: "visible",
    });

    loaderTl.to("#hq-preloader", {
      y: -1500,
    });

    setTimeout(function () {
      $("#hq-preloader").remove();
    }, 10000);
  });

  // Smooth Scroll
  const lenis = new Lenis({
    smooth: true,
    lerp: 0.1,
    gestureOrientation: "vertical",
    normalizeWheel: true,
    smoothTouch: true,
    touchMultiplier: 2,
  });

  lenis.on("scroll", (e) => { });
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Document Ready
  $(document).ready(function () {
    // Responsive Classes
    function responsiveClasses() {
      var body = $("body");
      if ($(window).width() < 992) {
        body.removeClass("viewport-lg");
        body.addClass("viewport-sm");
      } else {
        body.removeClass("viewport-sm");
        body.addClass("viewport-lg");
      }
    }

    // Window Resize
    $(window)
      .on("resize", function () {
        responsiveClasses();
      })
      .resize();

    // Mobile Menu
    $(".navigation-menu").meanmenu({
      meanMenuContainer: ".mobile-menu-wrap",
      meanScreenWidth: "992",
      meanMenuCloseSize: "22px",
      meanRemoveAttrs: true,
    });

    // REMOVED: Conflicting mobile menu dropdown handlers
    // The mobile-menu.js file now handles all mobile menu functionality

    // Offcanvas Sidemenu
    function offcanvasSidemenu() {
      $("body").removeClass("open-offcanvas-sidemenu");
      $(document).on("click", ".header-sidemenu-btn", function (e) {
        e.preventDefault();
        $("body").toggleClass("open-offcanvas-sidemenu");
      });
      $(document).on(
        "click",
        "#hide-offcanvas-sidemenu, #offcanvas-sidebar-overlay",
        function (e) {
          e.preventDefault();
          $("body.open-offcanvas-sidemenu").removeClass(
            "open-offcanvas-sidemenu"
          );
        }
      );
    }
    offcanvasSidemenu();

    // Popup Search Box
    function popupSearchBox() {
      $("body").removeClass("open-popup-search");
      $(document).on("click", ".header-search-btn", function (e) {
        e.preventDefault();
        $("body").toggleClass("open-popup-search");
        $('.popup-search-box-inner form input[type="text"]').focus();
      });

      $(document).on(
        "click",
        "#close-popup-search, #popup-search-overlay",
        function (e) {
          e.preventDefault();
          $("body.open-popup-search").removeClass("open-popup-search");
        }
      );
    }
    popupSearchBox();

    // Counter
    let counterItems = document.querySelectorAll(".counter-item .odometer");
    let observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            let countNumber = entry.target.getAttribute("data-count");
            entry.target.innerHTML = countNumber;
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    counterItems.forEach((item) => {
      observer.observe(item);
    });

    // Hover Effect
    function activateOnHover(selector, activeClass = "active") {
      const elements = document.querySelectorAll(selector);
      let lastActiveElement = null;
      elements.forEach((element) => {
        element.addEventListener("mouseenter", () => {
          elements.forEach((el) => el.classList.remove(activeClass));
          element.classList.add(activeClass);
          lastActiveElement = element;
        });
      });
      if (lastActiveElement) {
        lastActiveElement.classList.add(activeClass);
      }
    }

    // Card Hover
    activateOnHover(".promo-card", "promo-card-active");
    // Image Card List Hover
    activateOnHover(".image-card-list-item", "active");

    // Progress Bar
    function animateProgressBars(containerSelector, barItemSelector) {
      const progressContainers = document.querySelectorAll(containerSelector);
      progressContainers.forEach((container) => {
        container
          .querySelectorAll(barItemSelector)
          .forEach((progress, index) => {
            let percent = parseInt(
              progress
                .querySelector(".hq-progress")
                .getAttribute("data-percent"),
              10
            );
            let progressText = progress.querySelector(".hq-progress-text");
            let progressLine = progress.querySelector(".hq-progress-line");
            const baseDuration = 2;
            const duration = (percent / 100) * baseDuration;
            gsap.to(
              progressLine,
              {
                scrollTrigger: {
                  trigger: progress,
                  start: "top 80%",
                  toggleActions: "play none none none",
                },
                width: percent + "%",
                duration: duration,
                delay: index * 0.03,
                ease: "power2.out",
              },
              "start"
            );

            gsap.to(
              progressText,
              {
                scrollTrigger: {
                  trigger: progress,
                  start: "top 80%",
                  toggleActions: "play none none none",
                },
                innerHTML: percent,
                duration: duration,
                delay: index * 0.03,
                snap: { innerHTML: 1 },
                ease: "power2.out",
                onUpdate: function () {
                  progressText.innerHTML =
                    Math.round(progressText.innerHTML) + "%";
                },
              },
              "start"
            );
          });
      });
    }

    animateProgressBars(".hq-progress-bars", ".hq-progress-bar-item");
    animateProgressBars(
      ".donation-progress-bar-wrap",
      ".donation-progress-item"
    );

    // Background Image
    document.querySelectorAll("[data-img]").forEach((el) => {
      let imgUrl = el.getAttribute("data-img");
      if (imgUrl) {
        el.style.backgroundImage = `url(${imgUrl})`;
      }
    });

    // Venobox
    $(".venobox").venobox({
      bgcolor: "transparent",
      spinner: "spinner-pulse",
      numeration: true,
      infinigall: true,
    });

    // Testimonials Carousel
    var testimonialsWrap = $(".testimonial-carousel-wrap"),
      testimonialCarousel = testimonialsWrap.find(".testimonials-carousel");
    testimonialCarousel.slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      speed: 1500,
      autoplay: false,
      autoplaySpeed: 5000,
      infinite: true,
      arrows: true,
      dots: false,
      initialSlide: 0,
      centerMode: true,
      centerPadding: 0,
      appendArrows: testimonialsWrap.find(".hq-carousel-nav"),
      appendDots: testimonialsWrap.find(".hq-carousel-pagination"),
      prevArrow: testimonialsWrap.find(".slick-prev").clone().show().html(),
      nextArrow: testimonialsWrap.find(".slick-next").clone().show().html(),
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
            centerMode: false,
          },
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            centerMode: false,
          },
        },
      ],
    });

    // Image Carousel
    var imgCarouselWrap = $(".hq-image-carousel-wrap"),
      imgCarousel = imgCarouselWrap.find(".hq-image-carousel");
    imgCarousel.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      speed: 1500,
      autoplay: true,
      autoplaySpeed: 5000,
      infinite: true,
      arrows: false,
      dots: true,
      customPaging: function (slider, i) {
        return '<span data-index="' + i + '"></span>';
      },
      initialSlide: 1,
      appendDots: imgCarouselWrap.find(".hq-carousel-pagination"),
    });

    // Related Post Carousel
    var rpCarouselWrap = $(".related-post-carousel-wrap"),
      rpCarousel = rpCarouselWrap.find(".related-post-carousel");
    rpCarousel.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      speed: 1500,
      autoplay: true,
      autoplaySpeed: 5000,
      infinite: true,
      arrows: true,
      dots: false,
      initialSlide: 1,
      appendArrows: rpCarouselWrap.find(".related-post-carousel-nav"),
      prevArrow: rpCarouselWrap.find(".slick-prev").clone().show().html(),
      nextArrow: rpCarouselWrap.find(".slick-next").clone().show().html(),
    });

    // Services Carousel
    var servicesWrap = $(".services-carousel-wrap"),
      servicesCarousel = servicesWrap.find(".services-carousel");
    servicesCarousel.slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      speed: 1500,
      autoplay: false,
      autoplaySpeed: 5000,
      infinite: true,
      arrows: true,
      dots: false,
      initialSlide: 0,
      appendArrows: servicesWrap.find(".hq-carousel-nav"),
      prevArrow: servicesWrap.find(".slick-prev").clone().show().html(),
      nextArrow: servicesWrap.find(".slick-next").clone().show().html(),
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 3,
            centerMode: false,
          },
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            centerMode: false,
          },
        },
      ],
    });

    // Event Countdown
    $(".hq-countdown").hqCountdownTimer({
      endMessage: "Event is expired or completed.",
    });

    // Scroll to Top
    function scrollTop() {
      const scrollTop = () => {
        const scrollTopPos = document.documentElement.scrollTop;
        const scrollElementWrap = $("#hq-back-to-top");

        if (scrollTopPos > 100) {
          scrollElementWrap.addClass("active");
        } else {
          scrollElementWrap.removeClass("active");
        }
      };
      window.onscroll = scrollTop;
      window.onload = scrollTop;

      // Back to Top
      function scrollToTop() {
        document.documentElement.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }

      $("#hq-back-to-top").on("click", scrollToTop);
    }

    scrollTop();

    // Donation Amount
    const amountInput = document.querySelector(".text-input");
    const totalAmount = document.querySelector(".donation-total span");
    const buttons = document.querySelectorAll(".donation-levels-wrap button");

    if (amountInput && totalAmount && buttons.length) {
      buttons.forEach((button) => {
        button.addEventListener("click", function () {
          buttons.forEach((btn) => btn.classList.remove("active"));
          if (this.value === "custom") {
            amountInput.value = ""; // Clear input for custom entry
            amountInput.focus();
            amountInput.addEventListener("input", function () {
              totalAmount.textContent = `$${amountInput.value}`; // Update total amount
            });
          } else {
            amountInput.value = parseFloat(this.value).toFixed(2); // Set value from button
            totalAmount.textContent = `$${parseFloat(this.value).toFixed(2)}`; // Update total amount
            this.classList.add("active"); // Add active class to clicked button
          }
        });
      });

      // Detect when user types in the custom amount input
      amountInput.addEventListener("input", function () {
        // Remove active class from all buttons when typing in the custom input
        buttons.forEach((btn) => btn.classList.remove("active"));
      });

      // Set default active button based on active class in HTML, if any
      const defaultButton = document.querySelector(
        ".donation-levels-wrap button.active"
      );
      if (defaultButton) {
        amountInput.value = parseFloat(defaultButton.value).toFixed(2);
        totalAmount.textContent = `$${parseFloat(defaultButton.value).toFixed(
          2
        )}`;
      }
    }

    // Card Select
    const creditCards = document.querySelectorAll(".credit-cards div");
    if (creditCards.length > 0) {
      creditCards.forEach((creditCard, index) => {
        if (index === 0) {
          creditCard.classList.add("active");
        }
        creditCard.addEventListener("click", function () {
          // Remove the 'active' class from the previously active credit card
          const activeCard = document.querySelector(".credit-cards .active");
          if (activeCard) {
            activeCard.classList.remove("active");
          }
          creditCard.classList.add("active");
        });
      });
    }

    // Custom Cursor
    function customCursor() {
      $("body").append('<div class="hq-cursor"></div>');
      var cursor = $(".hq-cursor"),
        linksCursor = $(
          'a, .hq-carousel-nav i, .cursor-effect, button, .card-share-icon, input[type="submit"]'
        );

      $(window).on("mousemove", function (e) {
        cursor.css({
          transform:
            "translate(" + (e.clientX - 5) + "px," + (e.clientY - 5) + "px)",
          visibility: "inherit",
        });
      });

      $(window).on("mouseout", function () {
        cursor.css("visibility", "hidden");
      });

      linksCursor.each(function () {
        $(this).on("mouseleave", function () {
          cursor.removeClass("cursor-grow");
        });
        $(this).on("mouseover", function () {
          cursor.addClass("cursor-grow");
        });
      });
    }

    customCursor();
  });

  // Scrolling Animation
  var ANIMATION_CONFIG = {
    DEFAULTS: {
      EFFECT: "effect-3d",
      DURATION: 1,
      DELAY: 0.3,
      STAGGER: 0.3,
      SPLIT: "none",
      EASE: "power3.out",
      TRIGGER: function (textAnim) {
        return textAnim;
      },
      SCROLL: {
        START: "top 90%",
        TOGGLE_ACTIONS: "play none none none",
      },
    },
    MOBILE_BREAKPOINT: 1023,
  };

  // Helper Functions
  function getDataAttr(element, attr, defaultValue) {
    return element.getAttribute("data-" + attr) || defaultValue;
  }

  function createTimeline(trigger) {
    return gsap.timeline({
      scrollTrigger: {
        trigger: trigger,
        scrub: false,
        markers: false,
        toggleActions: ANIMATION_CONFIG.DEFAULTS.SCROLL.TOGGLE_ACTIONS,
        start: ANIMATION_CONFIG.DEFAULTS.SCROLL.START,
      },
    });
  }

  function handleHighlight(hlElements, timeline) {
    if (!hlElements.length) return;
    gsap.set(hlElements, { "--hq-border-clip": "100%" });
    timeline.to(
      hlElements,
      {
        "--hq-border-clip": "0%",
        ease: "power1.in",
        duration: 0.8,
        delay: 0.2,
        stagger: { each: 0.02 },
      },
      "-=1"
    );
  }

  // Effect Handlers
  var EFFECT_HANDLERS = {
    "effect-3d": function (target, timeline, config) {
      gsap.set(target.element, { perspective: 400 });
      timeline.from(target.splitElements, {
        duration: config.duration,
        delay: config.delay,
        opacity: 0,
        rotationX: -80,
        force3D: true,
        transformOrigin: "top center -50",
        stagger: 0.1,
      });
    },

    "clip-text": function (target, timeline, config) {
      gsap.set(target.element, { overflow: "hidden" });
      gsap.set(target.splitElements, { overflow: "hidden" });
      timeline.from(target.splitElements, {
        duration: config.duration,
        delay: config.delay,
        opacity: 0,
        rotationX: -80,
        force3D: true,
        transformOrigin: "top center -50",
        stagger: 0.1,
      });
    },

    "fade-in": function (target, timeline, config) {
      var isMobile = config.deviceWidth < ANIMATION_CONFIG.MOBILE_BREAKPOINT;
      var yPosition = isMobile ? 60 : 40;
      var staggerValue = isMobile ? 0 : 0.3;

      gsap.set(target.splitElements, { opacity: 0, y: yPosition });
      timeline.to(target.splitElements, {
        opacity: 1,
        y: 0,
        duration: config.duration,
        ease: config.ease,
        delay: config.delay * config.index,
        stagger: staggerValue,
      });
    },

    "fade-in-left": function (target, timeline, config) {
      gsap.set(target.splitElements, { x: -20, opacity: 0 });
      timeline.to(target.splitElements, {
        x: 0,
        opacity: 1,
        ease: config.ease,
        duration: config.duration,
        delay: config.delay * config.index,
        stagger: { each: 0.02 },
      });
    },

    "fade-in-right": function (target, timeline, config) {
      gsap.set(target.splitElements, { x: 50, opacity: 0 });
      timeline.to(target.splitElements, {
        x: 0,
        opacity: 1,
        ease: config.ease,
        duration: config.duration,
        delay: config.delay * config.index,
        stagger: { each: 0.02 },
      });
    },

    "fade-in-top": function (target, timeline, config) {
      gsap.set(target.splitElements, { y: -20, opacity: 0 });
      timeline.to(target.splitElements, {
        y: 0,
        opacity: 1,
        ease: config.ease,
        duration: config.duration,
        delay: config.delay * config.index,
        stagger: { each: 0.02 },
      });
    },

    "fade-in-bottom": function (target, timeline, config) {
      gsap.set(target.splitElements, { y: 20, opacity: 0 });
      timeline.to(target.splitElements, {
        y: 0,
        opacity: 1,
        ease: config.ease,
        duration: config.duration,
        delay: config.delay * config.index,
        stagger: { each: config.stagger },
      });
    },

    "zoom-in": function (target, timeline, config) {
      gsap.set(target.splitElements, { opacity: 0, scale: 0.5 });
      timeline.to(target.splitElements, {
        opacity: 1,
        scale: 1,
        x: 20,
        ease: config.ease,
        duration: config.duration,
        delay: config.delay * config.index,
        stagger: { each: 0.3 },
      });
    },
  };

  // Main Animation Function
  function textAnimation() {
    if (typeof gsap === "undefined") {
      console.warn("GSAP is not available. Animations will not run.");
      return;
    }

    var deviceWidth = window.innerWidth;
    var sections = document.querySelectorAll(".hq-text-animation-wrap");

    sections.forEach(function (section) {
      var textAnimElements = section.getElementsByClassName("hq-text-anim");

      Array.prototype.forEach.call(
        textAnimElements,
        function (textAnim, index) {
          // Get configuration from data attributes
          var config = {
            effect: getDataAttr(
              textAnim,
              "effect",
              ANIMATION_CONFIG.DEFAULTS.EFFECT
            ),
            duration: parseFloat(
              getDataAttr(
                textAnim,
                "duration",
                ANIMATION_CONFIG.DEFAULTS.DURATION
              )
            ),
            delay: parseFloat(
              getDataAttr(textAnim, "delay", ANIMATION_CONFIG.DEFAULTS.DELAY)
            ),
            stagger: parseFloat(
              getDataAttr(
                textAnim,
                "stagger",
                ANIMATION_CONFIG.DEFAULTS.STAGGER
              )
            ),
            split: getDataAttr(
              textAnim,
              "split",
              ANIMATION_CONFIG.DEFAULTS.SPLIT
            ),
            ease: getDataAttr(textAnim, "ease", ANIMATION_CONFIG.DEFAULTS.EASE),
            trigger: getDataAttr(textAnim, "scroll-trigger", textAnim),
            deviceWidth: deviceWidth,
            index: index,
          };

          // Setup split text if needed
          var splitElements = [];
          if (config.split !== "none" && typeof SplitType !== "undefined") {
            var splitType = new SplitType(textAnim, {
              types: "chars, words, lines",
            });
            splitElements = textAnim.getElementsByClassName(config.split);
          } else {
            splitElements = [textAnim];
          }

          // Create animation timeline
          var timeline = createTimeline(config.trigger);
          var target = {
            element: textAnim,
            splitElements: splitElements,
          };

          // Execute effect handler
          var handler = EFFECT_HANDLERS[config.effect];
          if (handler) {
            handler(target, timeline, config);
          }

          // Handle highlight elements
          var hlElements = textAnim.getElementsByClassName("hq-bd-anim");
          handleHighlight(hlElements, timeline);
        }
      );
    });
  }

  // Image Parallax Effect
  function imageParallaxEffect(options = {}) {
    const deviceWidth = window.innerWidth;
    const {
      containerSelector = ".hq-img-parallax",
      imageSelector = ".hq-img",
    } = options;

    const parallaxImgContainers = gsap.utils.toArray(containerSelector);

    if (!parallaxImgContainers.length) return;

    parallaxImgContainers.forEach((container) => {
      gsap.set(container, { overflow: "hidden" });
      const image = container.querySelector(imageSelector);

      if (!image) return;

      if (deviceWidth > 1023) {
        // Get values from data attributes with defaults using nullish coalescing
        const scaleStart = parseFloat(container.dataset.scaleStart ?? 1);
        const scaleEnd = parseFloat(container.dataset.scaleEnd ?? 1);
        const yStart = parseFloat(container.dataset.yStart ?? -30);
        const yEnd = parseFloat(container.dataset.yEnd ?? 30);

        // Create a GSAP timeline with ScrollTrigger
        gsap
          .timeline({
            scrollTrigger: {
              trigger: container,
              scrub: true,
            },
          })
          .fromTo(
            image,
            { scale: scaleStart, yPercent: yStart },
            { scale: scaleEnd, yPercent: yEnd, ease: "none" }
          );
      } else {
        // Reset image properties for smaller devices
        gsap.set(image, { scale: 1, yPercent: 0 });
      }
    });
  }

  // Fade Animation
  const fadeItems = document.querySelectorAll(".hq-fade-effect");
  fadeItems.forEach((item) => {
    const fadeOffset = parseFloat(item.dataset.fadeOffset ?? 50);
    const duration = parseFloat(item.dataset.duration ?? 1.15);
    const fadeFrom = item.dataset.fadeFrom ?? "bottom";
    const delay = parseFloat(item.dataset.delay ?? 0.15);
    const ease = item.dataset.ease ?? "power2.out";

    const animationSettings = {
      opacity: 0,
      ease,
      duration,
      delay,
    };

    // Set animation direction
    switch (fadeFrom) {
      case "top":
        animationSettings.y = -fadeOffset;
        break;
      case "left":
        animationSettings.x = -fadeOffset;
        break;
      case "bottom":
        animationSettings.y = fadeOffset;
        break;
      case "right":
        animationSettings.x = fadeOffset;
        break;
    }

    animationSettings.scrollTrigger = {
      trigger: item,
      start: "top 85%",
      toggleActions: "play none none none",
    };

    gsap.from(item, animationSettings);
  });

  // Call the functions when the DOM is ready
  document.addEventListener("DOMContentLoaded", () => {
    // Header Sticky
    const header = document.querySelector(".header-wrapper");
    const enableSticky = header.getAttribute("data-sticky") !== "true";

    if (enableSticky) {
      const headerPlaceholder = document.createElement("div");
      headerPlaceholder.style.display = "none";
      header.parentNode.insertBefore(headerPlaceholder, header);

      function updateHeaderHeight() {
        if (window.innerWidth > 993) {
          header.classList.add("sticky-header");
          document.body.classList.add("has-sticky");
          headerPlaceholder.style.height = `${header.offsetHeight}px`;
          headerPlaceholder.style.display = "block";
        } else {
          header.classList.remove("sticky-header");
          document.body.classList.remove("has-sticky");
          headerPlaceholder.style.display = "none";
        }
      }

      window.addEventListener("resize", updateHeaderHeight);
      window.addEventListener("scroll", function () {
        if (window.innerWidth > 993 && window.scrollY > header.offsetHeight) {
          header.classList.add("is-sticky");
        } else {
          header.classList.remove("is-sticky");
        }
      });

      updateHeaderHeight(); // Initialize on load
    }

    // Accordion
    document
      .querySelectorAll(".accordion-collapse.show")
      .forEach((activeCollapse) => {
        activeCollapse.closest(".accordion-item").classList.add("active");
      });
    document.querySelectorAll(".accordion-collapse").forEach((collapseEl) => {
      collapseEl.addEventListener("show.bs.collapse", () => {
        collapseEl.closest(".accordion-item").classList.add("active");
      });
      collapseEl.addEventListener("hide.bs.collapse", () => {
        collapseEl.closest(".accordion-item").classList.remove("active");
      });
    });

    // Image Parallax Effect
    imageParallaxEffect();

    // Text Animation
    textAnimation();

    // Resize Handling
    let resizeTimeout;
    function handleResize() {
      // Clear existing timeout to avoid multiple calls
      clearTimeout(resizeTimeout);

      // Debounce the resize event to improve performance
      resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh();

        // Reinitialize animations
        textAnimation();
        imageParallaxEffect();
      }, 200); // Adjust debounce time as needed
    }
    // Attach resize event listener
    window.addEventListener("resize", handleResize);

    // Timeline Animation
    const timelineElements = document.querySelectorAll(".timeline-animated");

    if (timelineElements.length > 0) {
      const timelineObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("animate-timeline");
              // Once animation played, no need to observe anymore
              timelineObserver.unobserve(entry.target);
            }
          });
        },
        {
          rootMargin: "0px 0px -100px 0px",
          threshold: 0.2,
        }
      );

      timelineElements.forEach((element) => {
        timelineObserver.observe(element);
      });
    }
  });

  // REMOVED: Conflicting vanilla JavaScript mobile menu implementation
  // This was duplicating functionality handled by mobile-menu.js

  // Timeline animation using Intersection Observer
  document.addEventListener("DOMContentLoaded", function () {
    const timelineElement = document.querySelector(".timeline-animated");

    if (timelineElement) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // When timeline enters viewport
            if (entry.isIntersecting) {
              // Add the animation trigger class
              timelineElement.classList.add("animate-timeline");
              // Once animated, no need to observe anymore
              observer.unobserve(timelineElement);
            }
          });
        },
        {
          threshold: 0.2, // Trigger when 20% of the element is visible
        }
      );

      // Start observing the timeline element
      observer.observe(timelineElement);
    }
  });

  // Impact Section Animations
  document.addEventListener("DOMContentLoaded", function () {
    // Intersection Observer for fade-in animations
    const fadeElements = document.querySelectorAll(".hq-section-fade");

    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    fadeElements.forEach((el) => {
      fadeObserver.observe(el);
    });

    // Timeline animation
    const timelineElements = document.querySelectorAll(".timeline-animated");

    const timelineObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-timeline");

            // Add the animated class to dots after timeline appears
            setTimeout(() => {
              const dots = entry.target.querySelectorAll(".timeline-dot");
              dots.forEach((dot) => {
                dot.classList.add("animated");
              });
            }, 1500);

            timelineObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    timelineElements.forEach((el) => {
      timelineObserver.observe(el);
    });

    // Number counter animation (works with odometer)
    const counterElements = document.querySelectorAll(".counter-item");

    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const odometerElement = entry.target.querySelector(".odometer");

            if (odometerElement) {
              const finalValue = odometerElement.getAttribute("data-count");

              setTimeout(() => {
                odometerElement.innerHTML = finalValue;
              }, 500);
            }

            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counterElements.forEach((el) => {
      counterObserver.observe(el);
    });
  });
})(jQuery);

document.addEventListener("DOMContentLoaded", function () {
  // Initialize Masonry layout for desktop gallery
  var masonryGrid = document.querySelector(".gallery-grid");
  if (masonryGrid) {
    var masonry = new Masonry(masonryGrid, {
      itemSelector: ".gallery-item",
      columnWidth: ".gallery-item",
      percentPosition: true,
      gutter: 20,
    });
  }

  // Initialize mobile gallery carousel with keyboard navigation
  var mobileGallerySwiper = new Swiper(".mobile-gallery-carousel", {
    slidesPerView: 1.2,
    spaceBetween: 15,
    centeredSlides: true,
    loop: true,
    a11y: {
      enabled: true,
      prevSlideMessage: "Previous slide",
      nextSlideMessage: "Next slide",
      firstSlideMessage: "This is the first slide",
      lastSlideMessage: "This is the last slide",
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    pagination: {
      el: ".mobile-gallery-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".mobile-gallery-next",
      prevEl: ".mobile-gallery-prev",
    },
    breakpoints: {
      480: {
        slidesPerView: 1.5,
        spaceBetween: 20,
      },
    },
  });

  // Add keyboard navigation event listener for mobile gallery
  document.addEventListener("keydown", function (e) {
    // Only apply keyboard navigation when carousel is in viewport
    var carousel = document.querySelector(".mobile-gallery-carousel");
    if (!carousel) return;

    var rect = carousel.getBoundingClientRect();
    var isInViewport =
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth);

    if (isInViewport && mobileGallerySwiper) {
      if (e.key === "ArrowLeft") {
        mobileGallerySwiper.slidePrev();
        e.preventDefault();
      } else if (e.key === "ArrowRight") {
        mobileGallerySwiper.slideNext();
        e.preventDefault();
      }
    }
  });

  // Initialize VenoBox with keyboard navigation
  if (typeof VenoBox !== "undefined") {
    new VenoBox({
      selector: ".venobox",
      numeration: true,
      infinigall: true,
      spinner: "rotating-plane",
      spinColor: "#0e98f1",
      navigation: true,
      navKeyboard: true, // Enable keyboard navigation in lightbox
      navTouch: true, // Enable touch navigation in lightbox
      share: false, // Disable share buttons
      titlePosition: "bottom", // Place titles at the bottom
      titleattr: "data-title", // Use data-title for image titles
      focusable: true, // Improve keyboard focus support
    });
  }

  // Category filtering functionality with dynamic counter update
  var filterButtons = document.querySelectorAll(".filter-btn");

  // Initial counter setup
  function updateGalleryCounter() {
    // Get total number of gallery items
    var totalItems = document.querySelectorAll(".gallery-item").length;
    var totalCountElement = document.querySelector(".total-count");
    if (totalCountElement) {
      // Update total count (keep the "+" if it exists)
      var currentText = totalCountElement.textContent;
      var hasPlus = currentText.includes("+");
      totalCountElement.textContent = totalItems + (hasPlus ? "+" : "");
    }

    // Count visible items and update shown count
    var visibleItems = document.querySelectorAll(
      '.gallery-item[style="display: block"]'
    ).length;
    // If no items have style attribute yet, count all items
    if (visibleItems === 0) {
      visibleItems = totalItems;
    }

    var shownCountElement = document.querySelector(".shown-count");
    if (shownCountElement) {
      shownCountElement.textContent = visibleItems;
    }
  }

  // Run counter update on page load
  updateGalleryCounter();

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach(function (btn) {
        btn.classList.remove("active");
      });

      // Add active class to clicked button
      this.classList.add("active");

      var filterValue = this.getAttribute("data-filter");

      // Filter desktop gallery items
      var galleryItems = document.querySelectorAll(".gallery-item");
      var visibleCount = 0;

      galleryItems.forEach(function (item) {
        var itemCategory = item.getAttribute("data-category");

        if (filterValue === "all" || filterValue === itemCategory) {
          item.style.display = "block";
          visibleCount++;
        } else {
          item.style.display = "none";
        }
      });

      // Update counter with new visible count
      var shownCountElement = document.querySelector(".shown-count");
      if (shownCountElement) {
        shownCountElement.textContent = visibleCount;
      }

      // Relayout masonry after filtering
      if (typeof Masonry !== "undefined" && masonry) {
        setTimeout(function () {
          masonry.layout();
        }, 100);
      }

      // MOBILE CAROUSEL FILTERING - IMPROVED VERSION
      // First, get the swiper container and all slides
      var swiperContainer = document.querySelector(".mobile-gallery-carousel");
      if (!swiperContainer) return;

      var allSlides = swiperContainer.querySelectorAll(
        ".swiper-slide:not(.swiper-slide-duplicate)"
      );

      // Step 1: Hide/show slides based on filter and track which ones are visible
      var visibleSlides = [];
      allSlides.forEach(function (slide) {
        var slideCategory = slide.getAttribute("data-category");

        if (filterValue === "all" || filterValue === slideCategory) {
          // Make the slide visible
          slide.classList.remove("filtered-out");
          visibleSlides.push(slide);
        } else {
          // Hide the slide
          slide.classList.add("filtered-out");
        }
      });

      // Count visible slides - used to create exact number of pagination dots
      var visibleSlideCount = visibleSlides.length;

      // Step 2: Destroy the current Swiper instance
      if (mobileGallerySwiper) {
        mobileGallerySwiper.destroy(true, true);
      }

      // Step 3: Re-initialize the Swiper instance with custom pagination
      setTimeout(function () {
        // Remove Swiper's own duplicate slides if they exist
        document
          .querySelectorAll(".swiper-wrapper .swiper-slide-duplicate")
          .forEach(function (el) {
            el.remove();
          });

        // Hide filtered slides completely
        document.querySelectorAll(".filtered-out").forEach(function (slide) {
          slide.style.display = "none";
        });

        // Re-initialize Swiper with exact pagination bullet count
        mobileGallerySwiper = new Swiper(".mobile-gallery-carousel", {
          slidesPerView: 1.2,
          spaceBetween: 15,
          centeredSlides: true,
          loop: visibleSlideCount > 1, // Only enable loop if more than one slide
          a11y: {
            enabled: true,
            prevSlideMessage: "Previous slide",
            nextSlideMessage: "Next slide",
            firstSlideMessage: "This is the first slide",
            lastSlideMessage: "This is the last slide",
          },
          keyboard: {
            enabled: true,
            onlyInViewport: true,
          },
          pagination: {
            el: ".mobile-gallery-pagination",
            clickable: true,
            // Set exact number of bullets based on visible slides
            dynamicBullets: false,
            renderBullet: function (index, className) {
              // Only render bullets for visible slides
              if (index < visibleSlideCount) {
                return '<span class="' + className + '"></span>';
              }
              return "";
            },
          },
          navigation: {
            nextEl: ".mobile-gallery-next",
            prevEl: ".mobile-gallery-prev",
          },
          breakpoints: {
            480: {
              slidesPerView: 1.5,
              spaceBetween: 20,
            },
          },
          on: {
            init: function () {
              // Update the pagination to show only bullets for visible slides
              var paginationEl = document.querySelector(
                ".mobile-gallery-pagination"
              );
              if (paginationEl) {
                // Ensure we only have the exact number of bullets
                var bullets = paginationEl.querySelectorAll(
                  ".swiper-pagination-bullet"
                );

                // Hide any extra bullets
                for (var i = visibleSlideCount; i < bullets.length; i++) {
                  bullets[i].style.display = "none";
                }
              }

              // Update Swiper to reflect new state
              this.update();
            },
          },
        });

        // Go to first slide and update
        mobileGallerySwiper.slideTo(0, 0);
        mobileGallerySwiper.update();
      }, 50);
    });

    // Add keyboard support for filter buttons
    button.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        button.click();
      }
    });
  });

  // Add focus styles to enhance keyboard navigation
  document
    .querySelectorAll(".venobox, .filter-btn")
    .forEach(function (element) {
      element.addEventListener("focus", function () {
        this.classList.add("keyboard-focus");
      });

      element.addEventListener("blur", function () {
        this.classList.remove("keyboard-focus");
      });
    });

  // Handle window resize events to update the counter
  window.addEventListener("resize", function () {
    setTimeout(updateGalleryCounter, 200);
  });
});
