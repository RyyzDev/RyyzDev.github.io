
!(function($) {
  "use strict";

  // Variables untuk tracking
  let isNavigating = false;
  let currentSection = '#header';

  // Fungsi untuk pindah ke section (MANUAL CLICK)
  function navigateToSection(href, $clickedLink) {
    const $target = $(href);
    
    if (!$target.length) return;
    
    // Set flags
    isNavigating = true;
    currentSection = href;
    
    // Update active state navbar
    $('.nav-menu .active, .mobile-nav .active').removeClass('active');
    if ($clickedLink) {
      $clickedLink.closest('li').addClass('active');
    }

    if (href === '#header') {
      // Kembali ke header
      $("section").removeClass('section-show');
      $('#header').removeClass('header-top');
      
      $('html, body').stop().animate({
        scrollTop: 0
      }, 1000, 'easeInOutExpo', function() {
        setTimeout(function() {
          isNavigating = false;
        }, 300);
      });
    } else {
      // Pindah ke section lain
      if (!$('#header').hasClass('header-top')) {
        $('#header').addClass('header-top');
      }
      
      $("section").removeClass('section-show');
      $target.addClass('section-show');
      
      const targetOffset = $target.offset().top - 100;
      
      $('html, body').stop().animate({
        scrollTop: targetOffset
      }, 1000, 'easeInOutExpo', function() {
        setTimeout(function() {
          isNavigating = false;
        }, 300);
      });
    }
  }

  // Event handler untuk klik navbar
  $(document).on('click', '.nav-menu a, .mobile-nav a', function(e) {
    const href = $(this).attr('href');
    
    if (href && href.startsWith('#')) {
      e.preventDefault();
      
      // Tutup mobile nav
      if ($('body').hasClass('mobile-nav-active')) {
        $('body').removeClass('mobile-nav-active');
        $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
        $('.mobile-nav-overly').fadeOut();
      }
      
      // Navigate
      navigateToSection(href, $(this));
      
      return false;
    }
  });

  // Scroll event DIHILANGKAN - User tidak akan auto-reset ke header
  // Biarkan user tetap di section yang dipilih via navbar

  // Activate sections on load dengan hash
  if (window.location.hash) {
    const initialHash = window.location.hash;
    if ($(initialHash).length) {
      setTimeout(function() {
        navigateToSection(initialHash, null);
      }, 350);
    }
  }

  // Mobile Navigation Toggle
  if ($('.nav-menu').length) {
    const $mobileNav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-lg-none'
    });
    $('body').append($mobileNav);
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
    $('body').append('<div class="mobile-nav-overly"></div>');

    $(document).on('click', '.mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      $('.mobile-nav-overly').toggle();
    });

    $(document).click(function(e) {
      const $container = $(".mobile-nav, .mobile-nav-toggle");
      if (!$container.is(e.target) && $container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });
  }

  // jQuery counterUp
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });

  // Skills section
  $('.skills-content').waypoint(function() {
    $('.progress .progress-bar').each(function() {
      $(this).css("width", $(this).attr("aria-valuenow") + '%');
    });
  }, {
    offset: '80%'
  });

  // Testimonials slider
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  // Portfolio isotope and filter
  $(window).on('load', function() {
    const portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item',
      layoutMode: 'fitRows'
    });

    $('#portfolio-flters li').on('click', function() {
      $("#portfolio-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');

      portfolioIsotope.isotope({
        filter: $(this).data('filter')
      });
    });
  });

  // Portfolio lightbox
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  // Portfolio details lightbox
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  // Portfolio details slider
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  // Venobox lightbox
  $(document).ready(function() {
    $('.venobox').venobox();
  });

  // Pure Counter
  new PureCounter();

  // Copy to Clipboard
  $('.clipboard').on('click', function(event) {
    event.preventDefault();
    navigator.clipboard.writeText($(this).attr("href")).then(() => {
      alert("Link copied!");
    });
  });

  // Certifications Interactive Features
// Tambahkan ini di main.js sebelum closing })(jQuery);

$(document).ready(function() {
  
  // Certificate Preview Modal
  $('.btn-preview').on('click', function() {
    const imageUrl = $(this).data('image');
    
    // Create modal
    const modal = `
      <div class="certificate-modal" style="
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.95);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        animation: fadeIn 0.3s ease;
      ">
        <button class="modal-close" style="
          position: absolute;
          top: 20px;
          right: 20px;
          width: 50px;
          height: 50px;
          background: rgba(18, 214, 64, 0.2);
          border: 2px solid #12d640;
          border-radius: 50%;
          color: #fff;
          font-size: 24px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        ">
          <i class="ri-close-line"></i>
        </button>
        <img src="${imageUrl}" style="
          max-width: 90%;
          max-height: 90vh;
          border-radius: 12px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
          animation: zoomIn 0.4s ease;
        " alt="Certificate Preview">
      </div>
    `;
    
    $('body').append(modal);
    $('body').css('overflow', 'hidden');
    
    // Close modal
    $('.modal-close, .certificate-modal').on('click', function(e) {
      if (e.target === this) {
        $('.certificate-modal').fadeOut(300, function() {
          $(this).remove();
          $('body').css('overflow', 'auto');
        });
      }
    });
    
    // ESC key to close
    $(document).on('keydown', function(e) {
      if (e.key === 'Escape') {
        $('.certificate-modal').fadeOut(300, function() {
          $(this).remove();
          $('body').css('overflow', 'auto');
        });
      }
    });
  });
  
  // Copy Certificate Link
  $('.btn-copy').on('click', function() {
    const url = $(this).data('url');
    const $btn = $(this);
    
    // Copy to clipboard
    navigator.clipboard.writeText(url).then(function() {
      // Success feedback
      const originalHTML = $btn.html();
      $btn.html('<i class="ri-check-line"></i> Copied!');
      $btn.css('background', 'linear-gradient(135deg, #10b981 0%, #059669 100%)');
      
      setTimeout(function() {
        $btn.html(originalHTML);
        $btn.css('background', '');
      }, 2000);
      
      // Show toast notification
      showToast('Certificate link copied to clipboard!', 'success');
    }).catch(function() {
      showToast('Failed to copy link', 'error');
    });
  });
  
  // Toast Notification Function
  function showToast(message, type) {
    const toast = $(`
      <div class="toast-notification" style="
        position: fixed;
        bottom: 30px;
        right: 30px;
        padding: 15px 25px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'};
        color: #fff;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 14px;
        font-weight: 600;
        animation: slideInRight 0.3s ease;
      ">
        <i class="ri-${type === 'success' ? 'check-line' : 'error-warning-line'}" style="font-size: 20px;"></i>
        ${message}
      </div>
    `);
    
    $('body').append(toast);
    
    setTimeout(function() {
      toast.fadeOut(300, function() {
        $(this).remove();
      });
    }, 3000);
  }
  
  // Certificate Card Hover Effect - Add shimmer
  $('.certificate-card').on('mouseenter', function() {
    $(this).find('.certificate-image').addClass('shimmer-effect');
  }).on('mouseleave', function() {
    $(this).find('.certificate-image').removeClass('shimmer-effect');
  });
  
});

// Add animations CSS
const animationStyles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes zoomIn {
    from { transform: scale(0.9); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
  
  @keyframes slideInRight {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  .modal-close:hover {
    background: #12d640 !important;
    transform: rotate(90deg);
  }
  
  .certificate-image.shimmer-effect::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    animation: shimmer-slide 1.5s ease-in-out;
  }
  
  @keyframes shimmer-slide {
    0% { left: -100%; }
    100% { left: 100%; }
  }
`;

$('<style>').text(animationStyles).appendTo('head');

})(jQuery);

// Stats Counter Animation for About Section
// Tambahkan ini di bagian bawah main.js atau sebelum closing })(jQuery);

// Counter animation untuk stats
function animateCounter() {
  const counters = document.querySelectorAll('.stat-number');
  
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const updateCounter = () => {
      current += increment;
      
      if (current < target) {
        counter.textContent = Math.ceil(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };
    
    updateCounter();
  });
}

// Trigger animation saat About section visible
$(document).ready(function() {
  let hasAnimated = false;
  
  // Check if in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  
  // Animate when scrolling
  $(window).on('scroll', function() {
    const aboutSection = document.querySelector('.about-stats');
    
    if (aboutSection && isInViewport(aboutSection) && !hasAnimated) {
      hasAnimated = true;
      animateCounter();
    }
  });
  
  // Animate immediately if already in viewport on load
  const aboutSection = document.querySelector('.about-stats');
  if (aboutSection && isInViewport(aboutSection)) {
    hasAnimated = true;
    animateCounter();
  }
  
  // Trigger when clicking About navbar
  $(document).on('click', '.nav-menu a[href="#about"], .mobile-nav a[href="#about"]', function() {
    setTimeout(function() {
      if (!hasAnimated) {
        hasAnimated = true;
        animateCounter();
      }
    }, 1200); // After navigation animation
  });
});


// Skills Filter & Animation
// Tambahkan ini di main.js sebelum closing })(jQuery);

$(document).ready(function() {
  
  // Skills Tab Filter
  $('.tab-btn').on('click', function() {
    const targetCategory = $(this).data('tab');
    
    // Update active tab
    $('.tab-btn').removeClass('active');
    $(this).addClass('active');
    
    // Filter cards
    if (targetCategory === 'all') {
      $('.skill-card').removeClass('hidden').fadeIn(300);
    } else {
      $('.skill-card').each(function() {
        const cardCategory = $(this).data('category');
        
        if (cardCategory === targetCategory) {
          $(this).removeClass('hidden').fadeIn(300);
        } else {
          $(this).addClass('hidden').fadeOut(300);
        }
      });
    }
  });
  
  // Animate skill level bars when visible
  function animateSkillBars() {
    $('.level-fill').each(function() {
      const $bar = $(this);
      const level = $bar.data('level');
      
      // Check if in viewport
      const elementTop = $bar.offset().top;
      const elementBottom = elementTop + $bar.outerHeight();
      const viewportTop = $(window).scrollTop();
      const viewportBottom = viewportTop + $(window).height();
      
      if (elementBottom > viewportTop && elementTop < viewportBottom) {
        if (!$bar.hasClass('animated')) {
          $bar.addClass('animated');
          $bar.css('width', level + '%');
        }
      }
    });
  }
  
  // Trigger on scroll
  $(window).on('scroll', function() {
    animateSkillBars();
  });
  
  // Trigger immediately if already in viewport
  animateSkillBars();
  
  // Trigger when navigating to About section
  $(document).on('click', '.nav-menu a[href="#about"], .mobile-nav a[href="#about"]', function() {
    setTimeout(function() {
      animateSkillBars();
    }, 1200);
  });
  
  // Add hover sound effect (optional)
  $('.skill-card').on('mouseenter', function() {
    $(this).find('.skill-icon-wrapper').addClass('bounce');
    setTimeout(() => {
      $(this).find('.skill-icon-wrapper').removeClass('bounce');
    }, 400);
  });
  
});

// Add bounce animation class
const style = document.createElement('style');
style.textContent = `
  @keyframes bounce {
    0%, 100% { transform: scale(1) rotate(0deg); }
    25% { transform: scale(1.1) rotate(-5deg); }
    75% { transform: scale(1.1) rotate(5deg); }
  }
  
  .skill-icon-wrapper.bounce {
    animation: bounce 0.4s ease;
  }
`;
document.head.appendChild(style);