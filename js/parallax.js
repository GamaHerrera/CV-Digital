// Función para crear elementos decorativos con parallax en toda la página
function createGlobalParallaxElements() {
    // Usar el contenedor existente en el HTML en lugar de crear uno nuevo
    const parallaxContainer = document.getElementById('parallax-container');
    if (!parallaxContainer) return;
    
    // Limpiar el contenedor antes de añadir nuevos elementos
    parallaxContainer.innerHTML = '';
    
    // Asegurar que el contenedor de parallax tenga z-index negativo
    parallaxContainer.style.zIndex = '-999'; // Valor extremadamente bajo para asegurar que esté detrás de todo
    
    // Determinar el número de elementos según el tamaño de la pantalla
    const isMobile = window.innerWidth < 768;
    const numElements = isMobile ? 10 : 20;
    
    // Tipos de elementos
    const elementTypes = [
        'element-circle',
        'element-square',
        'element-dots',
        'element-line',
        'element-icon'
    ];
    
    // Iconos para usar (Font Awesome)
    const icons = [
        'fa-star',
        'fa-circle',
        'fa-square',
        'fa-triangle',
        'fa-plus',
        'fa-diamond',
        'fa-code',
        'fa-palette'
    ];
    
    // Crear elementos aleatorios
    for (let i = 0; i < numElements; i++) {
        const element = document.createElement('div');
        
        // Seleccionar tipo de elemento
        const typeIndex = Math.floor(Math.random() * elementTypes.length);
        const elementType = elementTypes[typeIndex];
        
        // Añadir clase base de parallax y tipo específico
        element.className = `parallax-element ${elementType}`;
        
        // Añadir efecto blur a algunos elementos (aproximadamente 40%)
        if (Math.random() < 0.4) {
            // Aplicar blur fuerte o suave aleatoriamente
            if (Math.random() < 0.5) {
                element.classList.add('element-blur');
            } else {
                element.classList.add('element-blur-light');
            }
        }
        
        // Si es un icono, añadir el elemento i con un icono aleatorio
        if (elementType === 'element-icon') {
            const iconIndex = Math.floor(Math.random() * icons.length);
            const iconElement = document.createElement('i');
            iconElement.className = `fas ${icons[iconIndex]}`;
            element.appendChild(iconElement);
        }
        
        // Posición aleatoria (evitando el centro de la pantalla)
        let x, y;
        
        // Dividir la pantalla en cuadrantes y evitar el centro
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const centerRadius = Math.min(window.innerWidth, window.innerHeight) * 0.2; // 20% del tamaño mínimo
        
        do {
            x = Math.random() * window.innerWidth;
            y = Math.random() * window.innerHeight;
        } while (
            Math.abs(x - centerX) < centerRadius &&
            Math.abs(y - centerY) < centerRadius
        );
        
        // Aplicar posición
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;
        
        // Profundidad aleatoria para parallax (entre 5 y 30)
        const depth = 5 + Math.random() * 25;
        element.setAttribute('data-depth', depth);
        
        // Añadir al contenedor
        parallaxContainer.appendChild(element);
    }
}

// Función para mover elementos parallax al hacer scroll
function moveParallaxElements() {
    const elements = document.querySelectorAll('.parallax-element');
    const scrollY = window.scrollY;
    
    elements.forEach(element => {
        const depth = element.getAttribute('data-depth');
        const movement = scrollY * (0.1 / depth);
        element.style.transform = `translate3d(0, ${movement}px, 0)`;
    });
}

// Función para mover elementos parallax con el movimiento del ratón
function moveParallaxOnMouseMove(e) {
    const elements = document.querySelectorAll('.parallax-element');
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    // Calcular el centro de la pantalla
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    // Calcular la distancia desde el centro (normalizada entre -1 y 1)
    const normalizedX = (mouseX - centerX) / centerX;
    const normalizedY = (mouseY - centerY) / centerY;
    
    elements.forEach(element => {
        const depth = element.getAttribute('data-depth');
        const movementFactor = 15 / depth; // Ajustar según preferencia
        
        const moveX = normalizedX * movementFactor;
        const moveY = normalizedY * movementFactor;
        
        // Usar translate3d para mejor rendimiento
        element.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
    });
}

// Función throttle para limitar la frecuencia de ejecución de funciones
function throttle(func, delay) {
    let lastCall = 0;
    return function(...args) {
        const now = new Date().getTime();
        if (now - lastCall < delay) {
            return;
        }
        lastCall = now;
        return func(...args);
    };
}

// Función para inicializar los elementos parallax
function initParallaxElements() {
    createGlobalParallaxElements();
    window.addEventListener('scroll', throttle(moveParallaxElements, 10));
    window.addEventListener('mousemove', throttle(moveParallaxOnMouseMove, 10));
}

// Recrear elementos cuando cambia el tamaño de la ventana
window.addEventListener('resize', throttle(function() {
    createGlobalParallaxElements();
}, 200));

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initParallaxElements);
