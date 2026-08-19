import React from 'react';
import iconL from '../assets/icon-l.png';
import './Hero.css';

export default function Hero() {
  return (
    <header className="hero-container" id="inicio">
      {/* Background Video (Placeholder) */}
      <div className="video-wrapper">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="hero-video"
          poster="https://images.unsplash.com/photo-1598387181032-a310322db565?q=80&w=2075&auto=format&fit=crop"
        >
          {/* Local Ay Ay Ay video */}
          <source src="./video.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay halftone-bg"></div>
      </div>

      {/* Content */}
      <div className="hero-content">
        <div className="hero-l-container">
          <img src={iconL} alt="Arriba La L" className="hero-l-icon" />
        </div>
        <p className="hero-subtitle">NUEVO ÁLBUM "ARRIBA LA L" DISPONIBLE AHORA</p>
        <button className="btn-primary hero-cta" aria-label="Pre-guardar o escuchar el nuevo álbum Arriba la L">PRE-GUARDAR / ESCUCHAR</button>
      </div>
    </header>
  );
}
