document.addEventListener('DOMContentLoaded', () => {

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ============================================================
       0. LENIS SMOOTH SCROLL INIT & HEADER STATE
       ============================================================ */
    let lenis;
    const scrollProgress = document.querySelector('.scroll-progress');
    const header = document.querySelector('.header');
    
    const handleScrollState = (scrollY) => {
        if (header) {
            if (scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    };
    
    if (typeof Lenis !== 'undefined' && !prefersReducedMotion) {
        lenis = new Lenis({
            autoRaf: true,
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });
        
        // Update scroll progress bar and header state efficiently using Lenis event
        lenis.on('scroll', (e) => {
            if (scrollProgress) {
                scrollProgress.style.transform = `scaleX(${e.progress})`;
            }
            handleScrollState(e.animatedScroll);
        });
    } else {
        // Fallback for native scroll if reduced motion
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            if (scrollProgress) {
                const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrolled = winScroll / height;
                scrollProgress.style.transform = `scaleX(${scrolled})`;
            }
            handleScrollState(winScroll);
        }, { passive: true });
    }

    /* ============================================================
       1. CUSTOM CURSOR
       ============================================================ */
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    if (cursor && cursorFollower && window.innerWidth > 768 && !prefersReducedMotion) {
        let mouseX = -100, mouseY = -100;
        let followerX = -100, followerY = -100;

        // Track raw mouse position for dot cursor
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        });

        // Smooth follower using lerp
        function lerpFollower() {
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;
            cursorFollower.style.left = followerX + 'px';
            cursorFollower.style.top = followerY + 'px';
            requestAnimationFrame(lerpFollower);
        }
        lerpFollower();

        // Hover state on interactive elements
        const interactives = document.querySelectorAll(
            'a, button, .project-card, .about-card, .filter-btn, .skill-chip, .soft-skill-badge, .gallery-item, .certification-card'
        );

        interactives.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hovering');
                cursorFollower.classList.add('hovering');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hovering');
                cursorFollower.classList.remove('hovering');
            });
        });

        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
            cursorFollower.style.opacity = '0';
        });
        document.addEventListener('mouseenter', () => {
            cursor.style.opacity = '1';
            cursorFollower.style.opacity = '1';
        });
    }

    /* ============================================================
       4. SPLIT TEXT HERO ANIMATION
       ============================================================ */
    const heroTitle = document.querySelector('.hero-title[data-split]');
    if (heroTitle) {
        const text = heroTitle.innerHTML;
        // Split into chars preserving <em> tags
        const parts = [];
        let inTag = false;
        let tagBuffer = '';
        let charBuffer = '';

        for (let i = 0; i < text.length; i++) {
            const ch = text[i];
            if (ch === '<') { inTag = true; tagBuffer = ch; continue; }
            if (inTag) {
                tagBuffer += ch;
                if (ch === '>') {
                    inTag = false;
                    parts.push({ type: 'tag', content: tagBuffer });
                    tagBuffer = '';
                }
                continue;
            }
            if (ch === ' ') {
                parts.push({ type: 'space' });
            } else {
                parts.push({ type: 'char', content: ch });
            }
        }

        let html = '';
        let delay = 0;
        for (const part of parts) {
            if (part.type === 'char') {
                html += `<span class="char" style="transition-delay:${delay}ms">${part.content}</span>`;
                delay += 35;
            } else if (part.type === 'space') {
                html += ' ';
            } else {
                html += part.content;
            }
        }
        heroTitle.innerHTML = html;

        // Trigger animation after a short delay
        if (prefersReducedMotion) {
            document.querySelectorAll('.hero-title .char').forEach(ch => {
                ch.style.transitionDelay = '0ms';
                ch.classList.add('visible');
            });
        } else {
            requestAnimationFrame(() => {
                setTimeout(() => {
                    document.querySelectorAll('.hero-title .char').forEach(ch => {
                        ch.classList.add('visible');
                    });
                }, 200);
            });
        }
    }

    /* ============================================================
       5. MOBILE MENU
       ============================================================ */
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('mobile-open');
            const icon = mobileMenuBtn.querySelector('i');
            if (isOpen) {
                icon.className = 'ri-close-line';
                navLinks.style.cssText = `
                    display: flex;
                    flex-direction: column;
                    position: fixed;
                    top: 64px;
                    left: 0;
                    right: 0;
                    background-color: var(--bg-color);
                    padding: 2rem 1.5rem 2.5rem;
                    gap: 1.5rem;
                    border-top: 1px solid var(--border-color);
                    z-index: 999;
                    box-shadow: 0 12px 40px rgba(0,0,0,0.08);
                `;
            } else {
                icon.className = 'ri-menu-line';
                navLinks.removeAttribute('style');
            }
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('mobile-open');
                mobileMenuBtn.querySelector('i').className = 'ri-menu-line';
                navLinks.removeAttribute('style');
            });
        });
    }

    /* ============================================================
       6. SMOOTH SCROLL
       ============================================================ */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;
            const targetEl = document.querySelector(targetId);
            if (!targetEl) return;
            e.preventDefault();
            const offset = 80;
            
            if (lenis) {
                lenis.scrollTo(targetEl, { offset: -offset });
            } else {
                const top = targetEl.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    /* ============================================================
       7. ACTIVE NAV LINK (IntersectionObserver)
       ============================================================ */
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-link[href^="#"]');

    if (sections.length > 0 && navItems.length > 0) {
        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const currentId = entry.target.getAttribute('id');
                    navItems.forEach(li => {
                        li.classList.remove('active');
                        if (li.getAttribute('href').includes(currentId)) {
                            li.classList.add('active');
                        }
                    });
                }
            });
        }, {
            rootMargin: '-20% 0px -79% 0px' // Adjust thresholds to detect which section is mostly in view
        });

        sections.forEach(section => {
            navObserver.observe(section);
        });
    }





    /* ============================================================
       9. IMPECCABLE OVERDRIVE: 3D TILT EFFECT
       ============================================================ */
    const projectCards = document.querySelectorAll('.project-card');
    if (!prefersReducedMotion && window.innerWidth > 768 && projectCards.length > 0) {
        projectCards.forEach(card => {
            const img = card.querySelector('.project-image img');
            
            // Setup smooth return transition
            card.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            if(img) img.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.6s ease';

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const maxTilt = 8;
                
                const tiltX = ((y - centerY) / centerY) * -maxTilt;
                const tiltY = ((x - centerX) / centerX) * maxTilt;
                
                card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
                
                // Enhance Parallax on inner image
                if(img) {
                    const imgX = ((x - centerX) / centerX) * -15;
                    const imgY = ((y - centerY) / centerY) * -15;
                    img.style.transform = `scale(1.1) translate(${imgX}px, ${imgY}px) translateZ(-20px)`;
                }
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
                if(img) {
                    img.style.transform = '';
                }
            });
        });
    }

    /* ============================================================
       10. MAGNETIC BUTTONS effect
       ============================================================ */
    document.querySelectorAll('.btn-primary, .btn-outline').forEach(btn => {
        btn.addEventListener('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
            const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
            this.style.transform = `translate(${x}px, ${y}px)`;
        });
        btn.addEventListener('mouseleave', function () {
            this.style.transform = '';
        });
    });

    /* ============================================================
       11. MARQUEE duplicate for seamless loop
       ============================================================ */
    const marqueeTrack = document.querySelector('.marquee-track');
    if (marqueeTrack) {
        // Clone items to ensure seamless looping
        const originalContent = marqueeTrack.innerHTML;
        marqueeTrack.innerHTML = originalContent + originalContent;
    }

    /* ============================================================
       13. LIVE LOCAL TIME (Guadalajara, MX)
       ============================================================ */
    const timeEl = document.getElementById('local-time');
    if (timeEl) {
        const updateTime = () => {
            try {
                const formatter = new Intl.DateTimeFormat('es-MX', {
                    timeZone: 'America/Mexico_City',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                });
                timeEl.textContent = formatter.format(new Date()) + ' CST';
            } catch (e) {
                // Fallback for browsers without proper Intl timeZone support
                const d = new Date();
                timeEl.textContent = `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')} Local`;
            }
        };
        updateTime();
        setInterval(updateTime, 10000); // Update every 10 seconds
    }

    /* ============================================================
       14. CLICK-TO-COPY EMAIL (Delight Interaction)
       ============================================================ */
    const emailContactCard = document.getElementById('email-contact-card');
    const copyEmailBtn = document.querySelector('.copy-email-btn');
    const emailText = document.getElementById('email-text');

    if (emailContactCard && copyEmailBtn && emailText) {
        copyEmailBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent mailto: default action
            e.stopPropagation();

            const email = 'hola@gamaherrera.com';
            
            // Modern Clipboard API
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(email).then(() => {
                    const originalText = emailText.textContent;
                    const originalIcon = copyEmailBtn.innerHTML;

                    // Success state
                    emailText.textContent = '¡Correo copiado!';
                    emailText.style.color = 'var(--accent-warm)';
                    copyEmailBtn.innerHTML = '<i class="ri-check-line"></i>';
                    copyEmailBtn.style.color = 'var(--accent-warm)';
                    copyEmailBtn.style.transform = 'scale(1.1)';

                    // Revert after 2 seconds
                    setTimeout(() => {
                        emailText.textContent = originalText;
                        emailText.style.color = '';
                        copyEmailBtn.innerHTML = originalIcon;
                        copyEmailBtn.style.color = '';
                        copyEmailBtn.style.transform = '';
                    }, 2000);
                }).catch(err => {
                    console.error('Failed to copy: ', err);
                    window.location.href = `mailto:${email}`; // Fallback
                });
            } else {
                // Fallback if API not available
                window.location.href = `mailto:${email}`;
            }
        });
    }

    /* ============================================================
       15. ONBOARDING: CONTEXTUAL TOOLTIP
       ============================================================ */
    const tooltip = document.getElementById('copy-onboard-tooltip');
    const tooltipClose = document.querySelector('.onboard-tooltip-close');
    const contactContainer = document.querySelector('.contact-cards-container');

    if (tooltip && contactContainer) {
        // Check if user has already seen this onboarding
        const hasSeenOnboarding = localStorage.getItem('onboarding-copy-email');

        if (!hasSeenOnboarding) {
            // Use IntersectionObserver to show tooltip when contact section is in view
            const tooltipObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Show tooltip after a small delay
                        setTimeout(() => {
                            tooltip.classList.add('show');
                        }, 1000);
                        tooltipObserver.disconnect();
                    }
                });
            }, { threshold: 0.5 });

            tooltipObserver.observe(contactContainer);

            // Handle dismiss
            if (tooltipClose) {
                tooltipClose.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    tooltip.classList.remove('show');
                    localStorage.setItem('onboarding-copy-email', 'true');
                });
            }

            // Also dismiss if they actually click the email button
            if (copyEmailBtn) {
                copyEmailBtn.addEventListener('click', () => {
                    if (tooltip.classList.contains('show')) {
                        tooltip.classList.remove('show');
                        localStorage.setItem('onboarding-copy-email', 'true');
                    }
                });
            }
        }
    }

});
