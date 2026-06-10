/* ==========================================================================
   ARTIZO STUDIOS - LUXURY BLACK & GOLD APP SCRIPTS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modules
  initHeaderScroll();
  initMobileMenu();
  initCustomCursor();
  initPortfolioFilter();
  initFaqAccordion();
  initModalManager();
  initScrollReveal();
  initContactForm();
});

/**
 * Header Scroll Effect
 */
function initHeaderScroll() {
  const header = document.querySelector('.header');
  
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Trigger once on load in case page starts scrolled
}

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
  const mobileToggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav-link');
  
  if (!mobileToggle || !nav) return;
  
  mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    nav.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  });
  
  // Close menu when clicking links
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileToggle.classList.remove('active');
      nav.classList.remove('active');
      document.body.classList.remove('no-scroll');
    });
  });
}

/**
 * Custom Luxury Gold Cursor
 */
function initCustomCursor() {
  const dot = document.querySelector('.custom-cursor-dot');
  const outline = document.querySelector('.custom-cursor-outline');
  
  if (!dot || !outline) return;
  
  let posX = 0, posY = 0;
  let mouseX = 0, mouseY = 0;
  
  // Update mouse positions
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Dot instantly follows mouse
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
    dot.style.opacity = '1';
    outline.style.opacity = '1';
  });
  
  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    outline.style.opacity = '0';
  });
  
  // Smoothly animate outline (lagging effect)
  const animateOutline = () => {
    // Linear interpolation
    posX += (mouseX - posX) * 0.15;
    posY += (mouseY - posY) * 0.15;
    
    outline.style.left = `${posX}px`;
    outline.style.top = `${posY}px`;
    
    requestAnimationFrame(animateOutline);
  };
  animateOutline();
  
  // Hover effects on links and interactive elements
  const hoverables = document.querySelectorAll('a, button, .filter-btn, .faq-header, .portfolio-item');
  
  hoverables.forEach(item => {
    item.addEventListener('mouseenter', () => {
      outline.style.transform = 'translate(-50%, -50%) scale(1.5)';
      outline.style.backgroundColor = 'rgba(212, 175, 55, 0.1)';
      outline.style.borderColor = 'var(--accent-gold)';
    });
    
    item.addEventListener('mouseleave', () => {
      outline.style.transform = 'translate(-50%, -50%) scale(1)';
      outline.style.backgroundColor = 'transparent';
      outline.style.borderColor = 'rgba(212, 175, 55, 0.5)';
    });
  });
}

/**
 * Portfolio Filter
 */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  if (filterBtns.length === 0 || portfolioItems.length === 0) return;
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Set active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filterValue = btn.getAttribute('data-filter');
      
      // Filter items
      portfolioItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        
        if (filterValue === 'all' || filterValue === itemCategory) {
          item.style.display = 'block';
          // Force reflow for animation
          void item.offsetWidth;
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          // Hide after animation finishes
          setTimeout(() => {
            if (item.style.opacity === '0') {
              item.style.display = 'none';
            }
          }, 400);
        }
      });
    });
  });
}

/**
 * FAQ Accordion
 */
function initFaqAccordion() {
  const faqHeaders = document.querySelectorAll('.faq-header');
  
  faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.faq-item');
      const content = item.querySelector('.faq-content');
      const isActive = item.classList.contains('active');
      
      // Close other FAQs
      document.querySelectorAll('.faq-item').forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-content').style.maxHeight = null;
        }
      });
      
      // Toggle current FAQ
      if (isActive) {
        item.classList.remove('active');
        content.style.maxHeight = null;
      } else {
        item.classList.add('active');
        content.style.maxHeight = `${content.scrollHeight}px`;
      }
    });
  });
}

/**
 * Modal Manager
 */
function initModalManager() {
  const modal = document.querySelector('.modal');
  const openBtns = document.querySelectorAll('.js-open-modal');
  const closeBtn = document.querySelector('.modal-close');
  const overlay = document.querySelector('.modal-overlay');
  
  if (!modal) return;
  
  const openModal = () => {
    modal.classList.add('active');
    document.body.classList.add('no-scroll');
  };
  
  const closeModal = () => {
    modal.classList.remove('active');
    document.body.classList.remove('no-scroll');
  };
  
  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });
  
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (overlay) overlay.addEventListener('click', closeModal);
  
  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/**
 * Scroll Reveal Animations
 */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  
  if (reveals.length === 0) return;
  
  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Stop observing once animated
        observer.unobserve(entry.target);
      }
    });
  };
  
  const revealObserver = new IntersectionObserver(revealCallback, {
    root: null,
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });
  
  reveals.forEach(element => {
    revealObserver.observe(element);
  });
}

/**
 * Contact and Booking Form Handlers
 */
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  const bookingForm = document.getElementById('bookingForm');
  const successAlert = document.querySelector('.alert-success');
  
  const showSuccess = (message) => {
    if (!successAlert) return;
    const textNode = successAlert.querySelector('span') || successAlert;
    textNode.textContent = message || "Form submitted successfully!";
    
    successAlert.classList.add('active');
    
    setTimeout(() => {
      successAlert.classList.remove('active');
    }, 4000);
  };
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Simple validation
      const name = contactForm.querySelector('#name').value.trim();
      const phone = contactForm.querySelector('#phone').value.trim();
      const service = contactForm.querySelector('#service').value;
      
      if (!name || !phone || !service) {
        alert("Please fill in all required fields.");
        return;
      }
      
      // Simulate submission
      showSuccess(`Thank you, ${name}! We have received your inquiry for ${service} and will call you back shortly.`);
      contactForm.reset();
    });
  }
  
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Simple validation
      const name = bookingForm.querySelector('#b-name').value.trim();
      const phone = bookingForm.querySelector('#b-phone').value.trim();
      const date = bookingForm.querySelector('#b-date').value;
      
      if (!name || !phone || !date) {
        alert("Please fill in all required fields.");
        return;
      }
      
      // Close modal
      const modal = document.querySelector('.modal');
      if (modal) {
        modal.classList.remove('active');
        document.body.classList.remove('no-scroll');
      }
      
      // Simulate submission
      showSuccess(`Booking request sent for ${date}! Our production team will contact you within 2 hours.`);
      bookingForm.reset();
    });
  }
}

/**
 * Testimonial Carousel Module
 */
document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.carousel-dot');
  const prevBtn = document.querySelector('.js-carousel-prev');
  const nextBtn = document.querySelector('.js-carousel-next');
  
  if (slides.length === 0) return;
  
  let currentSlide = 0;
  
  const showSlide = (n) => {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    currentSlide = (n + slides.length) % slides.length;
    
    slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) {
      dots[currentSlide].classList.add('active');
    }
  };
  
  if (prevBtn) {
    prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
  }
  
  if (prevBtn) {
    prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
  }
  
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index));
  });
  
  // Auto slide every 6 seconds
  let autoSlideInterval = setInterval(() => {
    showSlide(currentSlide + 1);
  }, 6000);
  
  // Pause auto slide on hover
  const carousel = document.querySelector('.testimonial-container');
  if (carousel) {
    carousel.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    carousel.addEventListener('mouseleave', () => {
      autoSlideInterval = setInterval(() => {
        showSlide(currentSlide + 1);
      }, 6000);
    });
  }
});
