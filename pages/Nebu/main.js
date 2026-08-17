/* =====================================================
   main.js — Nebú Social Club
   Glitch, Navbar, Gallery, Form, Scroll Effects
   ===================================================== */

'use strict';

// ─── UTILS ──────────────────────────────────────────────────
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ─── SYSTEM BOOT PRELOADER ──────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const preloader = document.getElementById('preloader');
  const counter = document.querySelector('.preloader-counter');
  const log = document.querySelector('.preloader-log');
  
  if (preloader && counter && log && !prefersReducedMotion) {
    let progress = 0;
    const logs = [
      "INITIALIZING VOID PROTOCOL...",
      "ESTABLISHING SECURE CONNECTION...",
      "BYPASSING REALITY FILTERS...",
      "DECRYPTING AUDIO SIGNATURES...",
      "ACCESS GRANTED."
    ];
    
    // Animate progress to 100
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 10) + 1;
      if (progress >= 100) progress = 100;
      
      const pctString = progress.toString().padStart(2, '0') + '%';
      counter.textContent = pctString;
      counter.dataset.text = pctString;
      
      // Update log messages based on progress
      const logIndex = Math.floor((progress / 100) * (logs.length - 1));
      log.textContent = logs[logIndex];
      
      if (progress === 100) {
        clearInterval(interval);
        setTimeout(() => {
          preloader.classList.add('done');
          document.body.classList.remove('is-loading');
        }, 300); // short delay after 100% before slide up
      }
    }, 40); // fast loop for snappy hacker vibe
  } else if (preloader) {
    // Reduced motion fallback
    preloader.style.display = 'none';
    document.body.classList.remove('is-loading');
  }
});

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

  // Marquee elements
  const manifestoBand = document.querySelector('.manifesto-band');
  const manifestoTrack = document.querySelector('.manifesto-track');
  let marqueeBase = 0;

  function lenisRaf(time) {
    lenis.raf(time);
    
    // Marquee logic based on scroll velocity
    if (manifestoTrack) {
      let velocity = lenis.velocity || 0;
      let speed = 0.15 + Math.abs(velocity) * 0.03; // More subtle base speed + scroll boost
      
      marqueeBase -= speed;
      if (marqueeBase <= -50) marqueeBase = 0; // Reset loop (assuming 50% width duplication)
      
      // Apply subtle skew based on velocity
      let skew = velocity * 0.05;
      manifestoTrack.style.transform = `translateX(${marqueeBase}%) skewX(${skew}deg)`;
    }

    requestAnimationFrame(lenisRaf);
  }
  requestAnimationFrame(lenisRaf);
}

// ─── NAVBAR SCROLL ────────────────────────────────────────── 
const navbar = document.getElementById('navbar');

/**
 * Updates the navbar visual state (glassmorphism) based on scroll position.
 * @param {number} scrollY - Current vertical scroll position in pixels.
 */
function handleNavbarScroll(scrollY) {
  if (!navbar) return;
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

if (hamburger && mobileMenu) {
  // Focus Trap Logic
  const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen.toString());
    document.body.style.overflow = isOpen ? 'hidden' : '';

    if (isOpen) {
      const focusableContent = mobileMenu.querySelectorAll(focusableElements);
      if (focusableContent.length === 0) return;
      const firstElement = focusableContent[0];
      const lastElement = focusableContent[focusableContent.length - 1];

      document.addEventListener('keydown', function trapFocus(e) {
        if (!mobileMenu.classList.contains('open')) {
          document.removeEventListener('keydown', trapFocus);
          return;
        }
        let isTabPressed = e.key === 'Tab' || e.keyCode === 9;
        if (!isTabPressed) return;

        if (e.shiftKey) { 
          if (document.activeElement === firstElement) {
            hamburger.focus();
            e.preventDefault();
          } else if (document.activeElement === hamburger) {
            lastElement.focus();
            e.preventDefault();
          }
        } else { 
          if (document.activeElement === lastElement) {
            hamburger.focus();
            e.preventDefault();
          }
        }
      });
    }
  });
}

// Close mobile menu when clicking a link
['mobileClose1', 'mobileClose2', 'mobileClose3'].forEach(id => {
  const el = document.getElementById(id);
  if (el && mobileMenu && hamburger) {
    el.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
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

// ─── SWIPER GALLERY (REMOVED) ─────────────────────────────────
// Gallery is now a CSS Masonry grid based on DESIGN.md


// ─── GLITCH EFFECT ────────────────────────────────────────── 
/**
 * Triggers a CSS glitch animation on a given element.
 * @param {HTMLElement} el - The DOM element to glitch.
 */
function triggerGlitch(el) {
  if (prefersReducedMotion || !el) return;
  el.classList.add('is-glitching');
  el.addEventListener('animationend', () => {
    el.classList.remove('is-glitching');
  }, { once: true });
}

/**
 * Recursively schedules a random glitch effect interval for an element.
 * @param {HTMLElement} el - The DOM element to schedule glitches on.
 */
function scheduleRandomGlitch(el) {
  if (prefersReducedMotion || !el) return;
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
  glow.id = 'cursor-glow';
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

// --- SCROLL REVEALS ----------------------------------------- 
if (!prefersReducedMotion && 'IntersectionObserver' in window) {
  const revealOptions = {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.1
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
  });
}

// ─── IMPECCABLE DELIGHT: MAGNETIC BUTTONS ────────────────────
if (window.matchMedia('(pointer: fine)').matches && !prefersReducedMotion) {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
    });
  });
}

// ─── IMPECCABLE DELIGHT: TEXT SCRAMBLE ON HOVER ──────────────
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
document.querySelectorAll('.nav-link').forEach(link => {
  let interval = null;
  link.addEventListener('mouseenter', (e) => {
    let iteration = 0;
    const target = e.target;
    if (!target.dataset.original) target.dataset.original = target.innerText;
    
    clearInterval(interval);
    
    interval = setInterval(() => {
      target.innerText = target.dataset.original
        .split('')
        .map((letter, index) => {
          if (index < iteration) {
            return target.dataset.original[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');
      
      if (iteration >= target.dataset.original.length) {
        clearInterval(interval);
      }
      
      iteration += 1 / 3;
    }, 30);
  });
});

// ─── IMPECCABLE DELIGHT: CLICK FLASH ─────────────────────────
if (window.matchMedia('(pointer: fine)').matches && !prefersReducedMotion) {
  window.addEventListener('mousedown', () => {
    const glow = document.getElementById('cursor-glow');
    if (glow) {
      glow.style.background = 'radial-gradient(circle, rgba(229,9,20,0.5) 0%, transparent 80%)';
      glow.style.transform = 'translate(-50%, -50%) scale(0.8)';
      setTimeout(() => {
        glow.style.background = 'radial-gradient(circle, rgba(229,9,20,0.06) 0%, transparent 70%)';
        glow.style.transform = 'translate(-50%, -50%) scale(1)';
      }, 100);
    }
  });
}
