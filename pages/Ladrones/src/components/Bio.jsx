import React from 'react';
import { useReveal } from '../hooks/useReveal';
import './Bio.css';

export default function Bio() {
  const headerRef = useReveal();
  const p1Ref = useReveal({ threshold: 0.2 });
  const p2Ref = useReveal({ threshold: 0.2 });
  const p3Ref = useReveal({ threshold: 0.2 });
  const p4Ref = useReveal({ threshold: 0.2 });

  return (
    <section className="bio-container" id="bio">
      <div className="bio-content">
        <div ref={headerRef} className="bio-header reveal">
          <h2>FLOW PESADO</h2>
          <p className="bio-subtitle">LA HISTORIA</p>
        </div>

        <div className="bio-text-grid">
          <p ref={p1Ref} className="bio-paragraph highlight reveal delay-100">
            Ladrones is a band from Guadalajara, Jalisco, Mexico, that blends rock/metal, hip hop, and regional Mexican music into a unique style they call "Flow Pesado". Since 2021, their music has broken down barriers and celebrated the musical diversity of new generations: free, inclusive, and without prejudice.
          </p>
          
          <p ref={p2Ref} className="bio-paragraph reveal delay-200">
            With two albums (LPs) under their belt ("Flow Pesado" and "Mexican Pesado"), Ladrones has quickly gained recognition. This solid project features the renowned Mexican rapper Zxmyr on lead vocals; acclaimed producer and guitarist José Macario; Diego Zornoza on drums; Cirujano Resendez on backing vocals; and Alan Ledesma as producer.
          </p>
          
          <p ref={p3Ref} className="bio-paragraph reveal delay-300">
            With their most recent album, "Mexican Pesado" (2025), they have taken their music to stages across Mexico, the United States, and South America, including venues such as the Lunario at the National Auditorium in Mexico City, Los Angeles, São Paulo, Santiago, Lima, Buenos Aires, Bogotá, and Medellín. In addition, Ladrones has been part of the lineup for Nu Metal Revolution, a festival that brought together major exponents of the genre in Mexico, and is currently part of the official lineup for the Welcome to Rockville festival in Daytona Beach, Florida, as well as the "System of a Brown" Tour with Bloodywood in various cities across the United States.
          </p>
          
          <p ref={p4Ref} className="bio-paragraph reveal delay-300">
            With a growing audience on digital platforms, Ladrones is establishing itself as an emerging voice and a promising act within the music scene.
          </p>
        </div>
      </div>
    </section>
  );
}
