
import './Marquee.css';

export default function Marquee() {
  return (
    <div className="marquee-container" aria-hidden="true">
      <div className="marquee-track">
        <span className="marquee-text">
          LADRONES • FLOW PESADO • STREETWEAR • MEXICAN PESADO • 
        </span>
        {/* Duplicamos el texto para que la animación sea infinita sin cortes */}
        <span className="marquee-text">
          LADRONES • FLOW PESADO • STREETWEAR • MEXICAN PESADO • 
        </span>
      </div>
    </div>
  );
}
