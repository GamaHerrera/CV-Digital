/* ============================================================
   script.js — Nishino Japan Dining
   ============================================================ */

(function () {
  'use strict';

  // ─── Custom Preloader Handler ──────────────────────────────
  const preloader = document.getElementById('preloader');
  const startTime = Date.now();
  const MIN_DISPLAY_TIME = 450; // Prevents harsh flicker on instant cache loads
  const MAX_SAFETY_TIMEOUT = 2500; // Safeguard if external assets delay

  function dismissPreloader() {
    if (!preloader || preloader.classList.contains('loaded')) return;
    const elapsed = Date.now() - startTime;
    const remaining = Math.max(0, MIN_DISPLAY_TIME - elapsed);

    setTimeout(() => {
      preloader.classList.add('loaded');
      
      // Synchronize hero choreography with the veil dropping
      const hero = document.getElementById('hero');
      if (hero) {
        hero.classList.add('hero-is-loaded');
      }

      setTimeout(() => {
        preloader.setAttribute('aria-hidden', 'true');
        if (typeof ScrollTrigger !== 'undefined') {
          ScrollTrigger.refresh();
        }
      }, 700);
    }, remaining);
  }

  window.addEventListener('load', dismissPreloader);
  // Failsafe timeout to prevent indefinite blocking
  setTimeout(dismissPreloader, MAX_SAFETY_TIMEOUT);

  // ─── Lenis Smooth Scroll & GSAP ScrollTrigger ───────────────
  let lenis;

  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo ease-out
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.6,
      infinite: false,
    });

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      // Synchronize Lenis scroll position with ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update);

      // Drive Lenis via GSAP's internal ticker for synchronized frame updates
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    } else {
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }
  }

  // ─── Scrollytelling: Filosofía (GSAP + ScrollTrigger) ───────
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && document.getElementById('filosofia')) {
    const mm = gsap.matchMedia();

    // Desktop & Tablet (Pinned scrollytelling with explicit 3-step choreography)
    mm.add("(min-width: 769px)", () => {
      // Set initial states to ensure clean progressive disclosure
      gsap.set('.chef-image', { scale: 1.0, transformOrigin: 'center center' });
      gsap.set('.filosofia-quote', { opacity: 0, y: 40, filter: 'blur(10px)' });
      gsap.set('.stats-item', { opacity: 0, y: 30, filter: 'blur(8px)' });
      gsap.set('#filosofia-reservar-btn', { opacity: 0, y: 15 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#filosofia',
          pin: true,
          pinSpacing: true,
          scrub: 0.9, // Responsive & organic scroll feel without lag fighting the pin
          start: 'top top',
          end: '+=220%', // Balanced duration for natural unhurried reading
          invalidateOnRefresh: true,
        }
      });

      // ─── PASO 1: Zoom lento y continuo a la foto del Chef ─────────
      tl.to('.chef-image', {
        scale: 1.08,
        duration: 5.0,
        ease: 'none',
      }, 0)

      // ─── PASO 2: "Practicar, repetir y cuidar" emerge suavemente de la oscuridad ───
      .to('.filosofia-quote', {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1.6,
        ease: 'power1.inOut',
      }, 0.6)

      // ─── PASO 3: Los 3 pilares se encienden UNO POR UNO (Izquierda a Derecha) ───
      // 1° Pilar: "100% Ingredientes frescos"
      .to('.stats-item:nth-child(1)', {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1.1,
        ease: 'power1.inOut',
      }, 2.0)
      // 2° Pilar: "+5 Años de experiencia"
      .to('.stats-item:nth-child(2)', {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1.1,
        ease: 'power1.inOut',
      }, 2.7)
      // 3° Pilar: "Omakase Experiencia del chef"
      .to('.stats-item:nth-child(3)', {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1.1,
        ease: 'power1.inOut',
      }, 3.4)

      // Botón de reserva final
      .to('#filosofia-reservar-btn', {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power1.inOut',
      }, 4.2);
    });

    // Mobile (<= 768px): Progressive ScrollTrigger with blur & sequential step lighting
    mm.add("(max-width: 768px)", () => {
      // Paso 1: Zoom en imagen
      gsap.fromTo('.chef-image',
        { scale: 1.0 },
        {
          scale: 1.08,
          ease: 'none',
          scrollTrigger: {
            trigger: '.filosofia-image',
            start: 'top 85%',
            end: 'bottom 20%',
            scrub: 1,
          }
        }
      );

      // Paso 2: Quote emerge de la oscuridad con difuminado y elevación
      gsap.fromTo('.filosofia-quote',
        { opacity: 0, y: 40, filter: 'blur(10px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.filosofia-quote',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Paso 3: Los 3 pilares se encienden en secuencia de izquierda a derecha
      gsap.fromTo('.stats-item',
        { opacity: 0, y: 30, filter: 'blur(8px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.8,
          stagger: 0.25,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.filosofia-stats',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    });
  }

  // ─── Sticky Navbar ──────────────────────────────────────────
  const navbar = document.getElementById('navbar');

  function handleScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ─── Mobile Menu ────────────────────────────────────────────
  const hamburger   = document.getElementById('hamburger');
  const mobileMenu  = document.getElementById('mobile-menu');
  const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];

  function openMenu() {
    hamburger.classList.add('open');
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (lenis) lenis.stop();
  }

  function closeMenu() {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
    if (lenis) lenis.start();
  }

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.contains('open') ? closeMenu() : openMenu();
    });
  }

  mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

  // ─── Menu Tabs ──────────────────────────────────────────────
  const tabBtns   = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const panel = document.getElementById('tab-' + target);
      if (panel) panel.classList.add('active');
    });
  });

  // ─── Scroll Reveal (Intersection Observer) ──────────────────
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  // ─── Delight: Hanko Stamp Reveal ────────────────────────────────
  const hankoStamp = document.querySelector('.hanko-stamp');
  if (hankoStamp && 'IntersectionObserver' in window) {
    const hankoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          hankoStamp.classList.add('stamped');
          hankoObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    hankoObserver.observe(document.querySelector('.footer-logo-name'));
  }

  // ─── Smooth Scroll for anchor links (via Lenis) ──────────────
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();

      const offset = navbar ? navbar.offsetHeight + 8 : 0;

      if (lenis) {
        lenis.scrollTo(target, { offset: -offset, duration: 1.4 });
      } else {
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ─── Mobile Sticky CTA Bar ──────────────────────────────
  const mobileCtaBar = document.getElementById('mobile-cta-bar');
  const heroCta      = document.getElementById('hero-reservar-btn');

  if (mobileCtaBar && heroCta) {
    // Show bar when hero CTA scrolls out of view
    const ctaObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          mobileCtaBar.classList.add('hidden');
        } else {
          mobileCtaBar.classList.remove('hidden');
        }
      },
      { threshold: 0, rootMargin: '0px' }
    );
    ctaObserver.observe(heroCta);
  }

  // ─── Native Deep Link Handling ──────────────────────────────
  const wazeBtn = document.getElementById('open-waze-btn');
  if (wazeBtn) {
    wazeBtn.addEventListener('click', (e) => {
      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      if (isMobile) {
        e.preventDefault();
        // Invocación directa del esquema nativo de la app Waze
        window.location.href = 'waze://?ll=20.7088,-103.3919&navigate=yes';
        // Fallback a versión web si no está instalada la app
        setTimeout(() => {
          window.open('https://waze.com/ul?ll=20.7088,-103.3919&navigate=yes', '_blank');
        }, 1200);
      }
    });
  }

  // ─── Lazy loading fallback ───────────────────────────────────
  if (!('loading' in HTMLImageElement.prototype)) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          imageObserver.unobserve(img);
        }
      });
    });
    lazyImages.forEach(img => imageObserver.observe(img));
  }

})();
