document.addEventListener('DOMContentLoaded', () => {

    /* ============================================================
       1. CUSTOM CURSOR
       ============================================================ */
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    if (cursor && cursorFollower && window.innerWidth > 768) {
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
       2. SCROLL PROGRESS BAR
       ============================================================ */
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            progressBar.style.width = progress + '%';
        }, { passive: true });
    }

    /* ============================================================
       3. HEADER: scrolled state
       ============================================================ */
    const header = document.querySelector('.header');
    if (header) {
        const onScroll = () => {
            if (window.scrollY > 60) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
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
        requestAnimationFrame(() => {
            setTimeout(() => {
                document.querySelectorAll('.hero-title .char').forEach(ch => {
                    ch.classList.add('visible');
                });
            }, 200);
        });
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
            const top = targetEl.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });

    /* ============================================================
       7. ACTIVE NAV LINK on scroll
       ============================================================ */
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-link[href^="#"]');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            if (window.pageYOffset >= section.offsetTop - 200) {
                current = section.getAttribute('id');
            }
        });
        navItems.forEach(li => {
            li.classList.remove('active');
            if (li.getAttribute('href').includes(current)) li.classList.add('active');
        });
    }, { passive: true });

    /* ============================================================
       8. SCROLL REVEAL (IntersectionObserver)
       ============================================================ */
    const revealEls = document.querySelectorAll('.reveal, .reveal-left');
    if (revealEls.length > 0) {
        const revealObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    obs.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.08,
            rootMargin: '0px 0px -60px 0px'
        });

        revealEls.forEach(el => revealObserver.observe(el));
    }

    /* ============================================================
       9. FILTER BUTTONS (projects & certifications)
       ============================================================ */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card[data-category], .certification-card[data-category]');

    if (filterBtns.length > 0 && projectCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.getAttribute('data-filter');

                projectCards.forEach(card => {
                    const cats = card.getAttribute('data-category') || '';
                    const show = filter === 'all' || cats.includes(filter);
                    if (show) {
                        card.style.display = '';
                        // Micro-animation
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(16px)';
                        requestAnimationFrame(() => {
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                                card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                            }, 50);
                        });
                    } else {
                        card.style.display = 'none';
                    }
                });
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

});
