import React from 'react';
import { useReveal } from '../hooks/useReveal';
import './Contact.css';

export default function Contact() {
  const contacts = [
    { 
      role: 'MANAGEMENT', 
      lines: ['CULTURE WAVE', 'JOSE MANGIN'],
      email: null
    },
    { 
      role: 'BOOKING', 
      lines: ['IAG', 'ALZADA (Just Mexico)'],
      email: null
    },
    { 
      role: 'LABEL', 
      lines: ['ALZADA'],
      email: 'contacto@alzada.mx'
    },
  ];

  const headerRef = useReveal();
  const gridRef = useReveal({ threshold: 0.2 });

  return (
    <section className="contact-container" id="contacto">
      <div ref={headerRef} className="contact-header reveal">
        <h2>CONTACTO</h2>
        <p className="contact-subtitle">MANAGEMENT & PRENSA</p>
      </div>

      <div ref={gridRef} className="contact-grid reveal delay-200">
        {contacts.map((contact, index) => (
          <div key={index} className="contact-item">
            <h3 className="contact-role">{contact.role}</h3>
            {contact.lines.map((line, i) => (
              <p key={i} className="contact-line">{line}</p>
            ))}
            {contact.email && (
              <a href={`mailto:${contact.email}`} className="contact-email">
                {contact.email}
              </a>
            )}
          </div>
        ))}
        
        <div className="contact-item press-kit-item">
          <h3 className="contact-role">RECURSOS</h3>
          <a href="#" className="btn-press-kit" aria-label="Descargar Press Kit Oficial">
            DESCARGAR PRESS KIT
          </a>
        </div>
      </div>
    </section>
  );
}
