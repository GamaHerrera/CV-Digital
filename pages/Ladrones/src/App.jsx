import React, { useEffect } from 'react'
import Lenis from 'lenis'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Bio from './components/Bio'
import Tour from './components/Tour'
import Gallery from './components/Gallery'
import TheaterMode from './components/TheaterMode'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Conectar el scroll de Lenis a los anchors de navegación
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        lenis.scrollTo(targetId);
      });
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <div className="noise-overlay"></div>
      <Navigation />
      <main className="main-content">
      <Hero />
      <Marquee />
      <Bio />
      <Tour />
      <Gallery />
      <TheaterMode />
      <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
