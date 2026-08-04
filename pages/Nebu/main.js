/* =====================================================
   main.js — Nebú Social Club
   Glitch, Navbar, Gallery, Form, Scroll Effects
   ===================================================== */

'use strict';

// ─── UTILS ──────────────────────────────────────────────────
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ─── LENIS SMOOTH SCROLL ──────────────────────────────────── 
let lenis;

if (!prefersReducedMotion && typeof Lenis !== 'undefined') {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.8,
    infinite: false,
  });

  function lenisRaf(time) {
    lenis.raf(time);
    requestAnimationFrame(lenisRaf);
  }
  requestAnimationFrame(lenisRaf);
}

// ─── NAVBAR SCROLL ────────────────────────────────────────── 
const navbar = document.getElementById('navbar');

function handleNavbarScroll(scrollY) {
  if (scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

// Use Lenis scroll event when available, fallback to native scroll
if (lenis) {
  lenis.on('scroll', ({ scroll }) => handleNavbarScroll(scroll));
} else {
  window.addEventListener('scroll', () => handleNavbarScroll(window.scrollY), { passive: true });
}
handleNavbarScroll(window.scrollY);

// ─── HAMBURGER MENU ───────────────────────────────────────── 
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('active', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close mobile menu when clicking a link
['mobileClose1', 'mobileClose2', 'mobileClose3'].forEach(id => {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('active');
      document.body.style.overflow = '';
    });
  }
});

// ─── SMOOTH SCROLL (Lenis-aware) ──────────────────────────── 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();

    if (lenis) {
      // Lenis handles offset and easing natively
      lenis.scrollTo(target, {
        offset: -navbar.offsetHeight,
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navbar.offsetHeight;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    }
  });
});

// ─── SWIPER GALLERY ───────────────────────────────────────── 
if (typeof Swiper !== 'undefined') {
  new Swiper('#gallerySwiper', {
    slidesPerView: 'auto',
    spaceBetween: 20,
    centeredSlides: false,
    loop: true,
    grabCursor: true,
    pagination: {
      el: '#galleryPagination',
      clickable: true,
    },
    autoplay: prefersReducedMotion ? false : {
      delay: 3500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    speed: 600,
  });
}

// ─── GLITCH EFFECT ────────────────────────────────────────── 
function triggerGlitch(el) {
  if (prefersReducedMotion) return;
  el.classList.add('is-glitching');
  el.addEventListener('animationend', () => {
    el.classList.remove('is-glitching');
  }, { once: true });
}

function scheduleRandomGlitch(el) {
  if (prefersReducedMotion) return;
  const delay = (Math.random() * 3000) + 5000; // 5–8 sec
  setTimeout(() => {
    triggerGlitch(el);
    scheduleRandomGlitch(el);
  }, delay);
}

// Initialize glitch on all glitch elements
document.querySelectorAll('.glitch, .glitch-sm').forEach(el => {
  scheduleRandomGlitch(el);
});

// ─── SCROLL REVEAL ────────────────────────────────────────── 
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

function initReveal() {
  const targets = [
    ...document.querySelectorAll('.event-card'),
    ...document.querySelectorAll('.section-header'),
    ...document.querySelectorAll('.contact-info'),
    ...document.querySelectorAll('.contact-form'),
  ];

  targets.forEach((el, i) => {
    el.classList.add('reveal');
    if (i % 3 === 1) el.classList.add('reveal-delay-1');
    if (i % 3 === 2) el.classList.add('reveal-delay-2');
    revealObserver.observe(el);
  });
}

initReveal();

// ─── CONTACT FORM ─────────────────────────────────────────── 
const form = document.getElementById('reservaForm');
const formSuccess = document.getElementById('formSuccess');

if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name    = document.getElementById('form-name').value.trim();
    const email   = document.getElementById('form-email').value.trim();
    const event   = document.getElementById('form-event').value;
    const guests  = document.getElementById('form-guests').value;

    if (!name || !email || !event || !guests) {
      // Shake invalid fields
      this.querySelectorAll(':invalid').forEach(field => {
        field.style.borderColor = 'var(--brand-accent)';
        field.style.animation = 'none';
        requestAnimationFrame(() => {
          field.style.animation = 'shakeField 0.35s ease';
        });
      });
      return;
    }

    // Simulate submission (replace with actual API/WhatsApp redirect)
    const submitBtn = this.querySelector('#submit-reserva');
    submitBtn.disabled = true;
    submitBtn.querySelector('.btn-text').textContent = 'ENVIANDO…';

    setTimeout(() => {
      form.reset();
      submitBtn.disabled = false;
      submitBtn.querySelector('.btn-text').textContent = 'ENVIAR RESERVA';
      formSuccess.classList.add('visible');

      // Optionally open WhatsApp with form data
      const waText = encodeURIComponent(
        `Hola Nebú! Me llamo ${name} y quiero reservar para el evento ${event} con ${guests} persona(s). Email: ${email}`
      );
      // Uncomment to auto-open WhatsApp:
      // window.open(`https://wa.me/521XXXXXXXXXX?text=${waText}`, '_blank');

      setTimeout(() => formSuccess.classList.remove('visible'), 6000);
    }, 1200);
  });

  // Clear red border on input focus
  form.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('focus', () => {
      input.style.borderColor = '';
      input.style.animation = '';
    });
  });
}

// ─── CURSOR GLOW (desktop only) ───────────────────────────── 
if (window.matchMedia('(pointer: fine)').matches && !prefersReducedMotion) {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed;
    width: 320px;
    height: 320px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(229,9,20,0.06) 0%, transparent 70%);
    pointer-events: none;
    z-index: 9998;
    transform: translate(-50%, -50%);
    transition: left 0.12s ease, top 0.12s ease;
    will-change: left, top;
  `;
  document.body.appendChild(glow);

  let mouseX = 0, mouseY = 0;
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    glow.style.left = mouseX + 'px';
    glow.style.top  = mouseY + 'px';
  }, { passive: true });
}

// ─── HERO VIDEO FALLBACK ───────────────────────────────────── 
const heroVideo = document.querySelector('.hero-video');
if (heroVideo) {
  heroVideo.addEventListener('error', () => {
    heroVideo.style.display = 'none';
  });

  // If video src is empty, hide video container
  if (!heroVideo.querySelector('source[src]') || heroVideo.querySelector('source[src=""]')) {
    const wrap = heroVideo.closest('.hero-video-wrap');
    if (wrap) wrap.style.display = 'none';
  }
}

// ─── SHAKE ANIMATION (inline CSS) ─────────────────────────── 
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes shakeField {
    0%, 100% { transform: translateX(0); }
    20%       { transform: translateX(-5px); }
    40%       { transform: translateX(5px); }
    60%       { transform: translateX(-4px); }
    80%       { transform: translateX(4px); }
  }
`;
document.head.appendChild(shakeStyle);
