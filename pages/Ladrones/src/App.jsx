import { useEffect } from 'react'
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

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Conectar el scroll de Lenis a los anchors de navegación
    const navLinks = document.querySelectorAll('a[href^="#"]');
    const handlers = new Map();
    navLinks.forEach((link) => {
      const handler = (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        lenis.scrollTo(targetId);
      };
      handlers.set(link, handler);
      link.addEventListener('click', handler);
    });

    return () => {
      cancelAnimationFrame(rafId);
      navLinks.forEach((link) => {
        const handler = handlers.get(link);
        if (handler) link.removeEventListener('click', handler);
      });
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <a className="skip-to-content" href="#main-content">Saltar al contenido</a>
      <div className="noise-overlay"></div>
      <Navigation />
      <main className="main-content" id="main-content">
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
