
/* =====================================================
   WEBNEST STUDIO — WEBSITE JAVASCRIPT
   Premium interactions • Responsive • Lightweight
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  /* ================= CONFIGURATION ================= */

  // Replace this with your actual business email.
  const BUSINESS_EMAIL = "YOUR_EMAIL@example.com";


  /* ================= ELEMENTS ================= */

  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector("#menu-toggle");
  const mobileNavigation = document.querySelector("#mobile-navigation");
  const backToTop = document.querySelector("#back-to-top");
  const contactForm = document.querySelector("#contact-form");
  const currentYear = document.querySelector("#current-year");


  /* ================= FOOTER YEAR ================= */

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }


  /* ================= HEADER SCROLL EFFECT ================= */

  function handleScroll() {
    const scrollPosition = window.scrollY;

    if (header) {
      header.classList.toggle("is-scrolled", scrollPosition > 30);
    }

    if (backToTop) {
      backToTop.classList.toggle("visible", scrollPosition > 500);
    }
  }

  window.addEventListener("scroll", handleScroll, {
    passive: true
  });

  handleScroll();


  /* ================= MOBILE NAVIGATION ================= */

  function closeMobileMenu() {
    if (!menuToggle || !mobileNavigation) return;

    menuToggle.classList.remove("active");
    mobileNavigation.classList.remove("is-open");

    menuToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  }

  function openMobileMenu() {
    if (!menuToggle || !mobileNavigation) return;

    menuToggle.classList.add("active");
    mobileNavigation.classList.add("is-open");

    menuToggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("menu-open");
  }

  if (menuToggle && mobileNavigation) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mobileNavigation.classList.contains("is-open");

      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    // Close menu after clicking a navigation link.
    mobileNavigation.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", closeMobileMenu);
    });

    // Close menu when clicking outside.
    document.addEventListener("click", event => {
      const clickedInsideMenu = mobileNavigation.contains(event.target);
      const clickedToggle = menuToggle.contains(event.target);

      if (!clickedInsideMenu && !clickedToggle) {
        closeMobileMenu();
      }
    });

    // Close menu with Escape.
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        closeMobileMenu();
      }
    });

    // Close mobile navigation when returning to desktop.
    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) {
        closeMobileMenu();
      }
    });
  }


  /* ================= SMOOTH SCROLLING ================= */

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      const headerHeight = header
        ? header.offsetHeight
        : 0;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });

      closeMobileMenu();
    });
  });


  /* ================= SCROLL REVEAL ANIMATIONS ================= */

  const revealSelectors = [
    ".service-card",
    ".why-card",
    ".process-step",
    ".work-card",
    ".pricing-card",
    ".faq-item",
    ".about-content",
    ".about-visual",
    ".contact-content",
    ".contact-form-wrapper",
    ".section-heading",
    ".intro-content"
  ];

  const revealElements = document.querySelectorAll(
    revealSelectors.join(", ")
  );

  revealElements.forEach((element, index) => {
    element.classList.add("js-reveal");

    if (index % 3 === 1) {
      element.classList.add("js-reveal-delay-1");
    }

    if (index % 3 === 2) {
      element.classList.add("js-reveal-delay-2");
    }
  });

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px"
      }
    );

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach(element => {
      element.classList.add("is-visible");
    });
  }


  /* ================= ACTIVE NAVIGATION ================= */

  const sections = document.querySelectorAll(
    "#home, #services, #about, #work, #pricing, #contact"
  );

  const navigationLinks = document.querySelectorAll(
    ".main-navigation a, .mobile-navigation a"
  );

  if ("IntersectionObserver" in window && sections.length) {
    const sectionObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;

          const activeId = entry.target.id;

          navigationLinks.forEach(link => {
            const linkTarget = link.getAttribute("href");

            link.classList.toggle(
              "active",
              linkTarget === `#${activeId}`
            );
          });
        });
      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: 0
      }
    );

    sections.forEach(section => {
      sectionObserver.observe(section);
    });
  }


  /* ================= FAQ ACCORDION ================= */

  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;

      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.open) {
          otherItem.open = false;
        }
      });
    });
  });

});
