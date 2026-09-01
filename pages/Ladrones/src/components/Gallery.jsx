
import { useReveal } from '../hooks/useReveal';
import './Gallery.css';

// Importando las 7 imágenes
import gal1 from '../assets/gallery/gallery-1.jpg';
import gal2 from '../assets/gallery/gallery-2.jpg';
import gal3 from '../assets/gallery/gallery-3.jpg';
import gal4 from '../assets/gallery/gallery-4.jpg';
import gal5 from '../assets/gallery/gallery-5.jpg';
import gal6 from '../assets/gallery/gallery-6.jpg';
import gal7 from '../assets/gallery/gallery-7.jpg';

const images = [
  { src: gal1, alt: "Ladrones Live 1", className: "span-2" },
  { src: gal2, alt: "Ladrones Live 2", className: "" },
  { src: gal3, alt: "Ladrones Live 3", className: "span-2-row" },
  { src: gal4, alt: "Ladrones Live 4", className: "" },
  { src: gal5, alt: "Ladrones Live 5", className: "span-2" },
  { src: gal6, alt: "Ladrones Live 6", className: "" },
  { src: gal7, alt: "Ladrones Live 7", className: "" },
];

function GalleryItem({ img, index }) {
  const imgRef = useReveal({ threshold: 0.1 });
  const delayClass = `delay-${(index % 3) * 100}`;
  
  return (
    <div 
      ref={imgRef}
      className={`gallery-item ${img.className} reveal ${delayClass}`}
    >
      <img src={img.src} alt={img.alt} loading="lazy" />
      <div className="gallery-item-overlay"></div>
    </div>
  );
}

export default function Gallery() {
  const headerRef = useReveal();

  return (
    <section className="gallery-container" id="galeria">
      <div ref={headerRef} className="gallery-header reveal">
        <h2>ARCHIVO</h2>
        <p className="gallery-subtitle">STREETWEAR & LIVE</p>
      </div>

      <div className="gallery-grid">
        {images.map((img, index) => (
          <GalleryItem key={index} img={img} index={index} />
        ))}
      </div>
    </section>
  );
}
