// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar el carrusel de frases
    function initQuoteCarousel() {
        const track = document.querySelector('.quote-carousel-track');
        if (!track) return;

        // Clonar los slides para el efecto infinito
        const slides = document.querySelectorAll('.quote-carousel-slide');
        const totalSlides = slides.length / 2; // Dividimos entre 2 porque están duplicados
        
        // Ajustar el ancho del track para que quepan todos los slides
        track.style.width = `${totalSlides * 100}%`;
        
        // Asegurarse de que los slides tengan el ancho correcto
        document.querySelectorAll('.quote-carousel-slide').forEach(slide => {
            slide.style.width = `${100 / totalSlides}%`;
        });
        
        // Reiniciar la animación cuando termine
        track.addEventListener('animationiteration', () => {
            // Forzar un reflow para reiniciar la animación sin parpadeo
            track.style.animation = 'none';
            track.offsetHeight; // Trigger reflow
            track.style.animation = 'scroll 40s linear infinite';
        });
        
        // Pausar animación al hacer hover
        track.addEventListener('mouseenter', () => {
            track.style.animationPlayState = 'paused';
        });
        
        track.addEventListener('mouseleave', () => {
            track.style.animationPlayState = 'running';
        });
    }
    
    // Inicializar el carrusel cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initQuoteCarousel);
    } else {
        initQuoteCarousel();
    }
    // Variables
    const header = document.querySelector('header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const themeToggle = document.querySelector('.theme-toggle');
    const sections = document.querySelectorAll('section');
    const navLinksItems = document.querySelectorAll('.nav-link');
    const skillBars = document.querySelectorAll('.skill-progress');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const statNumbers = document.querySelectorAll('.stat-number');
    const contactForm = document.getElementById('contactForm');
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    const languageLevels = document.querySelectorAll('.level-fill');
    
    // Efecto de cursor personalizado
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // El follower sigue al cursor con un pequeño retraso
        setTimeout(function() {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });
    
    // Efecto hover para enlaces y botones con el cursor personalizado
    const hoverElements = document.querySelectorAll('a, button, .btn, .social-link, .filter-btn');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorFollower.style.borderColor = 'rgba(108, 99, 255, 0.5)';
        });
        
        element.addEventListener('mouseleave', function() {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.borderColor = 'var(--primary-color)';
        });
    });
    
    // Cambio de tema claro/oscuro
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggle.innerHTML = '<i class="ri-sun-fill"></i>';
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            themeToggle.innerHTML = '<i class="ri-moon-fill"></i>';
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Verificar si hay un tema guardado en localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="ri-sun-fill"></i>';
    }
    
    // Menú móvil
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Cerrar menú móvil al hacer clic en un enlace
    navLinksItems.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Header con efecto de scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Activar sección actual en el menú
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinksItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
        
        // Animar barras de habilidades cuando son visibles
        skillBars.forEach(bar => {
            const barPosition = bar.getBoundingClientRect().top;
            if (barPosition < window.innerHeight - 100) {
                const progress = bar.getAttribute('data-progress') + '%';
                bar.style.width = progress;
            }
        });
        
        // Animar barras de nivel de idiomas cuando son visibles
        languageLevels.forEach(level => {
            const levelPosition = level.getBoundingClientRect().top;
            if (levelPosition < window.innerHeight - 100) {
                if (!level.classList.contains('animated')) {
                    level.classList.add('animated');
                    const width = level.style.width;
                    level.style.width = '0';
                    setTimeout(() => {
                        level.style.transition = 'width 1.5s ease-in-out';
                        level.style.width = width;
                    }, 200);
                }
            }
        });
        
        // Animar estadísticas cuando son visibles
        statNumbers.forEach(stat => {
            const statPosition = stat.getBoundingClientRect().top;
            if (statPosition < window.innerHeight - 100) {
                animateCounter(stat);
            }
        });
    });
    
    // Función para animar contadores
    function animateCounter(element) {
        if (element.classList.contains('counted')) return;
        
        element.classList.add('counted');
        const target = parseInt(element.getAttribute('data-count'));
        let count = 0;
        const duration = 2000; // 2 segundos
        const interval = Math.floor(duration / target);
        
        const counter = setInterval(function() {
            count++;
            element.textContent = count;
            
            if (count >= target) {
                clearInterval(counter);
            }
        }, interval);
    }
    
    // Filtro de proyectos
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remover clase active de todos los botones
            filterBtns.forEach(btn => btn.classList.remove('active'));
            // Añadir clase active al botón clickeado
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                } else {
                    const categories = card.getAttribute('data-category').split(' ');
                    if (categories.includes(filter)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
                
                // Pequeña animación al mostrar las tarjetas
                setTimeout(function() {
                    if (card.style.display === 'block') {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }
                }, 100);
            });
        });
    });
    
    // Manejar envío del formulario
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aquí se podría implementar el envío real del formulario
            // Por ahora, solo mostramos un mensaje de éxito
            const formData = new FormData(contactForm);
            const formValues = {};
            
            formData.forEach((value, key) => {
                formValues[key] = value;
            });
            
            console.log('Formulario enviado:', formValues);
            
            // Mostrar mensaje de éxito
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <p>¡Mensaje enviado con éxito! Te responderé lo antes posible.</p>
            `;
            
            contactForm.innerHTML = '';
            contactForm.appendChild(successMessage);
        });
    }
    
    // Botón para ir arriba
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', throttle(function() {
            if (window.scrollY > 500) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        }, 100));
        
        scrollToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // Header sticky
    window.addEventListener('scroll', throttle(function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            header.classList.add('sticky');
            document.body.classList.add('has-sticky-header');
        } else {
            header.classList.remove('scrolled');
            header.classList.remove('sticky');
            document.body.classList.remove('has-sticky-header');
        }
    }, 100));
    
    // Efecto de parallax en la sección hero
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        const heroSection = document.querySelector('.hero');
        
        if (heroSection) {
            const heroContent = heroSection.querySelector('.hero-content');
            const heroImage = heroSection.querySelector('.hero-image');
            
            heroContent.style.transform = `translateY(${scrollY * 0.2}px)`;
            heroImage.style.transform = `translateY(${scrollY * 0.1}px)`;
        }
    });
    
    // Efecto de revelación para secciones
    const revealElements = document.querySelectorAll('.section-header, .about-content, .skills-content, .projects-grid, .contact-content');
    
    // Configuración de las habilidades blandas
    const setupSoftSkills = () => {
        const skillWords = document.querySelectorAll('.skill-word');
        
        if (skillWords.length > 0) {
            // Asignar orden para la animación escalonada
            skillWords.forEach((word, index) => {
                // Asignar variable CSS para el orden de animación
                word.style.setProperty('--order', index % 4); // Reiniciar contador cada 4 para que la animación sea por grupos
                
                // Asignar colores aleatorios sutiles
                const hue = Math.floor(Math.random() * 30) - 15; // Variación de tono
                word.style.backgroundColor = `hsl(${240 + hue}, 80%, 95%)`;
                
                // Añadir evento para destacar al hacer hover
                word.addEventListener('mouseenter', function() {
                    this.style.transform = 'scale(1.1)';
                    this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
                });
                
                word.addEventListener('mouseleave', function() {
                    this.style.transform = 'scale(1)';
                    this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
                });
                
                // Añadir animación de flotación suave y continua
                const floatKeyframes = [
                    { transform: 'translateY(0px)' },
                    { transform: 'translateY(-5px)' },
                    { transform: 'translateY(0px)' }
                ];
                
                const floatTiming = {
                    duration: 2000 + Math.random() * 1000, // Entre 2 y 3 segundos
                    iterations: Infinity,
                    easing: 'ease-in-out',
                    delay: Math.random() * 1000 // Retraso aleatorio para que no todas floten al mismo tiempo
                };
                
                word.animate(floatKeyframes, floatTiming);
            });
            
            // Añadir efecto de aparición para las categorías
            const skillCategories = document.querySelectorAll('.soft-skills-category');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        // Añadir un retraso escalonado para cada categoría
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, index * 200);
                    }
                });
            }, { threshold: 0.1 });
            
            skillCategories.forEach(category => {
                // Configurar estado inicial
                category.style.opacity = '0';
                category.style.transform = 'translateY(20px)';
                category.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                
                observer.observe(category);
            });
        }
    };
    
    // Inicializar las habilidades blandas
    setupSoftSkills();
    
    function revealOnScroll() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', revealOnScroll);
    
    // Inicializar la animación de las secciones
    revealOnScroll();
    
    // Inicializar el efecto de glitch en el título
    const glitchElement = document.querySelector('.glitch');
    if (glitchElement) {
        setInterval(() => {
            glitchElement.classList.add('glitching');
            setTimeout(() => {
                glitchElement.classList.remove('glitching');
            }, 200);
        }, 3000);
    }
});

// Función para limitar la velocidad de ejecución de una función
function throttle(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        if (!timeout) {
            timeout = setTimeout(function() {
                timeout = null;
                func.apply(context, args);
            }, wait);
        }
    };
}
