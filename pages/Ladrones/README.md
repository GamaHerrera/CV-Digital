# LADRONES | Sitio Oficial

![Ladrones Hero Section](https://images.unsplash.com/photo-1598387181032-a310322db565?q=80&w=2075&auto=format&fit=crop)

Sitio web oficial de la banda **Ladrones**. Una experiencia inmersiva construida con React y Vite, diseñada bajo un sistema visual de alto contraste (Streetwear / Metalcore) y principios de navegación **Zero UI**.

---

## 🖤 Sistema de Diseño (Design System)

El lenguaje visual de Ladrones está inspirado en la estética cruda de los fanzines callejeros y los pósters de conciertos subterráneos.

### 🎨 Paleta de Color (Regla 60-30-10)
- **60% Dominante:** Asfalto Profundo (`#111111`) - Aporta el peso y la oscuridad característica del metalcore.
- **30% Secundario:** Gris Concreto / Off-White (`#F4F4F0`) - Limpieza, minimalismo y alta legibilidad para tipografías y contenedores.
- **10% Acento:** Rojo Óxido (`#B22222`) - Color vibrante reservado estrictamente para los Llamados a la Acción (CTAs).

### 🔤 Tipografía Brutalista
- **Títulos (Headings):** `Syne` (Pesos 700/800) - Letra de gran carácter, extendida y agresiva para marcar jerarquía.
- **Cuerpo (Body):** `Inter` (Pesos 400/600) - Fuente geométrica limpia, diseñada para máximo rendimiento y legibilidad.

### 🖨️ Texturizado Digital Táctil
El proyecto hace uso de técnicas CSS avanzadas para evitar un diseño plano:
- **Noise / Grain:** Un filtro SVG `feTurbulence` inyectado mediante mix-blend-mode crea un ligero ruido estático sobre toda la página, emulando la textura del papel rasgado o la fotocopiadora.
- **Halftones:** Patrones de degradado radial emulando técnicas de impresión tradicionales en fondos específicos.

---

## 🏗️ Arquitectura de Información (UX / Zero UI)

El objetivo es eliminar la interfaz innecesaria, permitiendo que el contenido musical sea el protagonista.
- **El Hub (Inicio):** Reproducción de video inmersiva en *autoplay* (silenciado) que captura la atención de inmediato con un botón CTA directo al lanzamiento más reciente.
- **Theater Mode:** Integración directa de YouTube en el ecosistema de la página, reteniendo al usuario sin necesidad de sacarlo de la plataforma.
- **Navegación Sticky:** Minimalista, con enlaces clave e indicadores visuales de salida (ej. enlace externo a la Tienda).

---

## 🚀 Tecnologías y Configuración

El proyecto está estructurado como una Single Page Application (SPA).

- **Core:** Vite + React + Vanilla CSS (Asegurando control total sobre los texturizados visuales).
- **SEO & a11y:** Meta-etiquetas en español completas, atributos `aria-label` en CTAs, y HTML semántico auditado bajo estándares Lighthouse.

### Estructura de Componentes
```text
src/
├── App.jsx              # Ensamblaje global e inyección de capa de ruido.
├── index.css            # Tokens de diseño CSS globales (variables, tipografías, resets).
└── components/
    ├── Navigation.jsx   # Barra superior Zero UI con anclas de smooth-scroll.
    ├── Hero.jsx         # Video background auto-play + Call to Action.
    └── TheaterMode.jsx  # Incrustación embebida y escalable de videos de YouTube.
```

---

## 💻 Desarrollo Local

Para correr este proyecto en tu entorno local:

1. **Clonar e instalar dependencias:**
   ```bash
   npm install
   ```

2. **Levantar servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   *El servidor correrá en `http://localhost:5173/` (por defecto).*

3. **Construcción para Producción:**
   ```bash
   npm run build
   ```
   *El output minimizado se generará en la carpeta `/dist`.*
