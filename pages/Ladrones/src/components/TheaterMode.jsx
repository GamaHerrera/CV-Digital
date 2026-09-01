
import { useReveal } from '../hooks/useReveal';
import './TheaterMode.css';

export default function TheaterMode() {
  const headerRef = useReveal();
  const videoRef = useReveal({ threshold: 0.1 });

  return (
    <section className="theater-container" id="discografia">
      <div ref={headerRef} className="theater-header reveal">
        <h2>AY AY AY</h2>
        <p className="theater-description">OFFICIAL MUSIC VIDEO</p>
      </div>
      
      <div ref={videoRef} className="video-responsive reveal delay-200">
        <iframe 
          width="560" 
          height="315" 
          src="https://www.youtube.com/embed/oe4wKWoEkIs" 
          title="Ladrones - Ay Ay Ay" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </section>
  );
}
