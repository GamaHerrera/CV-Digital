// Profession Slider
class ProfessionSlider {
    constructor() {
        this.slides = document.querySelectorAll('.profession-slider .slide');
        this.indicators = document.querySelectorAll('.profession-slider .indicator');
        this.currentIndex = 0;
        this.slideDuration = 4000; // 4 seconds per slide
        this.animation = null;
        this.isPaused = false;
        
        this.init();
    }
    
    init() {
        // Verificar si hay indicadores
        if (this.indicators.length > 0) {
            this.indicators.forEach((indicator, index) => {
                if (indicator) {
                    indicator.addEventListener('click', () => this.goToSlide(index));
                }
            });
        }
        
        // Pause on hover
        const slider = document.querySelector('.profession-slider');
        if (slider) {
            slider.addEventListener('mouseenter', () => this.pause());
            slider.addEventListener('mouseleave', () => this.resume());
            
            // Touch events for mobile
            slider.addEventListener('touchstart', () => this.pause());
            slider.addEventListener('touchend', () => this.resume());
            
            // Start the slider
            this.start();
        } else {
            console.warn('No se encontró el elemento .profession-slider');
        }
    }
    
    start() {
        this.animation = setInterval(() => this.next(), this.slideDuration);
    }
    
    pause() {
        if (this.animation && !this.isPaused) {
            clearInterval(this.animation);
            this.isPaused = true;
            
            // Pause the progress animation
            const activeIndicator = document.querySelector('.indicator.active');
            if (activeIndicator) {
                activeIndicator.style.animationPlayState = 'paused';
            }
        }
    }
    
    resume() {
        if (this.isPaused) {
            this.start();
            this.isPaused = false;
            
            // Resume the progress animation
            const activeIndicator = document.querySelector('.indicator.active');
            if (activeIndicator) {
                activeIndicator.style.animationPlayState = 'running';
            }
        }
    }
    
    next() {
        this.goToSlide((this.currentIndex + 1) % this.slides.length);
    }
    
    goToSlide(index) {
        // Clear existing timeouts and intervals
        clearInterval(this.animation);
        
        // Update current index
        const prevIndex = this.currentIndex;
        this.currentIndex = index;
        
        // Update slide classes
        this.slides.forEach((slide, i) => {
            slide.classList.remove('active', 'next', 'prev');
            
            if (i === index) {
                slide.classList.add('active');
            } else if (i === (index + 1) % this.slides.length) {
                slide.classList.add('next');
            } else if (i === (index - 1 + this.slides.length) % this.slides.length) {
                slide.classList.add('prev');
            }
        });
        
        // Update indicators
        this.indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
            
            // Reset and restart the progress animation
            if (i === index) {
                indicator.style.animation = 'none';
                void indicator.offsetWidth; // Trigger reflow
                indicator.style.animation = `progress ${this.slideDuration / 1000}s linear`;
            }
        });
        
        // Restart the slider
        if (!this.isPaused) {
            this.animation = setInterval(() => this.next(), this.slideDuration);
        }
    }
}

// Initialize the slider when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new ProfessionSlider();
});
