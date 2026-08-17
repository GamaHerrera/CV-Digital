import React from 'react';
import logo from '../assets/logo.png';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-container">
      <div className="footer-top">
        <img src={logo} alt="Ladrones Brand" className="footer-logo-img" />
        <div className="footer-social">
          <p className="footer-social-title">FOLLOW THE L:</p>
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook">FACEBOOK</a>
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram">INSTAGRAM</a>
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="YouTube">YOUTUBE</a>
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Spotify">SPOTIFY</a>
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="TikTok">TIKTOK</a>
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Apple Music">APPLE MUSIC</a>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p className="footer-copy">© {currentYear} LADRONES. TODOS LOS DERECHOS RESERVADOS.</p>
        <p className="footer-credits">DISEÑADO POR GAMA HERRERA STUDIO</p>
      </div>
    </footer>
  );
}
