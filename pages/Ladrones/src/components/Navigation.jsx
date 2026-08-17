import React, { useState } from 'react';
import logo from '../assets/logo.png';
import './Navigation.css';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="nav-container">
      <div className="nav-logo">
        <a href="#inicio" aria-label="Ir a Inicio" onClick={() => setIsOpen(false)}>
          <img src={logo} alt="Ladrones Brand" style={{ height: '48px', width: 'auto' }} />
        </a>
      </div>
      
      <button 
        className={`nav-toggle ${isOpen ? 'open' : ''}`} 
        onClick={toggleMenu}
        aria-label="Abrir menú de navegación"
        aria-expanded={isOpen}
      >
        <span className="hamburger"></span>
      </button>

      <ul className={`nav-links ${isOpen ? 'nav-active' : ''}`}>
        <li><a href="#inicio" onClick={toggleMenu} aria-label="Ir a la sección de Inicio">Inicio</a></li>
        <li><a href="#bio" onClick={toggleMenu} aria-label="Ir a la biografía de la banda">La Banda</a></li>
        <li><a href="#tour" onClick={toggleMenu} aria-label="Ir a la sección de Tour">Tour</a></li>
        <li><a href="#discografia" onClick={toggleMenu} aria-label="Ir a la sección de Discografía">Discografía</a></li>
        <li><a href="#contacto" onClick={toggleMenu} aria-label="Ir a la sección de Contacto y Prensa">Contacto/Prensa</a></li>
        <li>
          <a href="https://tienda.ladrones.com" target="_blank" rel="noopener noreferrer" className="nav-store" aria-label="Abrir tienda oficial de Ladrones en una nueva pestaña">
            Tienda 
            <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '4px' }}>
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </a>
        </li>
      </ul>
    </nav>
  );
}
