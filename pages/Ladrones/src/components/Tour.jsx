import React from 'react';
import { useReveal } from '../hooks/useReveal';
import './Tour.css';

export default function Tour() {
  const tourDates = [
    { id: 1, date: 'OCT 31', city: 'GUADALAJARA, JAL', venue: 'C3 STAGE', status: 'TICKETS', link: '#' },
    { id: 2, date: 'NOV 02', city: 'MONTERREY, NL', venue: 'CAFE IGUANA', status: 'SOLD OUT', link: null },
    { id: 3, date: 'NOV 15', city: 'CDMX', venue: 'FORO INDIE ROCKS', status: 'TICKETS', link: '#' },
    { id: 4, date: 'NOV 28', city: 'TIJUANA, BC', venue: 'BLACK BOX', status: 'TICKETS', link: '#' },
    { id: 5, date: 'DIC 05', city: 'BOGOTÁ, COL', venue: 'ACE OF SPADES', status: 'TICKETS', link: '#' },
  ];

  const headerRef = useReveal();
  const listRef = useReveal({ threshold: 0.2 });

  return (
    <section className="tour-container" id="tour">
      <div ref={headerRef} className="tour-header reveal">
        <h2>TOUR</h2>
        <p className="tour-subtitle">ARRIBA LA L - LATAM 2026</p>
      </div>

      <div ref={listRef} className="tour-list reveal delay-100">
        {tourDates.map((show) => (
          <div key={show.id} className="tour-row">
            <div className="tour-date">{show.date}</div>
            <div className="tour-info">
              <span className="tour-city">{show.city}</span>
              <span className="tour-venue">{show.venue}</span>
            </div>
            <div className="tour-action">
              {show.status === 'SOLD OUT' ? (
                <span className="tour-sold-out">SOLD OUT</span>
              ) : (
                <a href={show.link} className="btn-tour-tickets" aria-label={`Comprar boletos para el show en ${show.city}`}>
                  TICKETS
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
