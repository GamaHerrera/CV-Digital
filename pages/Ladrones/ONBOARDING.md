# 🛹 Onboarding: Proyecto Ladrones (Web Oficial)

¡Bienvenido al equipo de desarrollo de la web oficial de **Ladrones**! 

Este documento es tu guía definitiva para entender no solo *cómo* está construido el código, sino el **por qué** detrás de cada decisión de diseño. Nuestro objetivo es mantener una calidad de nivel mundial (*Impeccable*).

---

## 🎸 1. La Visión y Estética (Streetwear / Metalcore)

La marca Ladrones se sitúa en la intersección del metalcore, el rap-metal y la cultura callejera. La web no es un catálogo corporativo; es un **fanzine digital, un póster de concierto subterráneo y un hub inmersivo**.

### Principios Fundamentales
1. **Zero UI:** Las interfaces gráficas tradicionales (tarjetas con sombras, bordes redondeados amigables, menús complejos) son el enemigo. Queremos contenido crudo. 
2. **Brutalismo Funcional:** Tipografías masivas que actúan como arquitectura, no solo como texto.
3. **Textura Táctil:** Nada de colores planos y perfectos. Usamos ruido digital (grain) y semitonos (halftones) para darle "suciedad" controlada a la pantalla.

> [!IMPORTANT]
> **Regla de Color (60-30-10)**
> Toda nueva interfaz debe respetar esta distribución matemática:
> - **60% Asfalto Profundo (`#111111`)**: El fondo principal.
> - **30% Gris Concreto (`#F4F4F0`)**: Para texto, bordes divisorios y elementos secundarios.
> - **10% Rojo Óxido (`#B22222`)**: Estrictamente para CTAs, estados *hover* o elementos críticos (como la palabra *SOLD OUT*).

---

## 🛠️ 2. Entorno de Trabajo Local

Estamos utilizando **Vite + React** sin frameworks CSS pesados (como Bootstrap o Tailwind) para garantizar el control de píxel perfecto sobre las texturas y animaciones nativas.

### Instalación
```bash
# 1. Clona el repositorio
git clone <url-del-repo>

# 2. Instala dependencias
npm install

# 3. Levanta el servidor local con Hot Module Replacement (HMR)
npm run dev
```

> [!TIP]
> **Buenas Prácticas:**
> Siempre revisa que la consola no arroje advertencias de accesibilidad (a11y) ni de dependencias deprecadas antes de hacer un commit.

---

## 📁 3. Arquitectura del Código

Hemos modularizado los componentes para mantener `App.jsx` lo más limpio posible.

- `src/index.css`: Contiene el reseteo global, las variables CSS (`--color-...`), la importación de fuentes de Google (`Inter` y `Syne`), y clases de utilidad cruciales como `.noise-overlay`.
- `src/components/Navigation.jsx`: Barra superior con smooth-scrolling nativo vía CSS.
- `src/components/Hero.jsx`: Contenedor principal con soporte para video de fondo en bucle.
- `src/components/Tour.jsx`: Grilla brutalista responsiva para las fechas de conciertos.
- `src/components/TheaterMode.jsx`: Componente oscuro (`#000000`) incrustado para consumir contenido de YouTube de forma inmersiva.
- `src/components/Contact.jsx`: Retícula espaciosa para información de prensa y booking.

---

## 🔍 4. Reglas de Contribución (The "Impeccable" Standard)

Si vas a crear un nuevo componente o modificar uno existente, debes adherirte a las siguientes normas:

> [!WARNING]
> **Accesibilidad (a11y) Obligatoria**
> - Todo enlace (`<a>`) que no tenga texto descriptivo (como iconos SVG) **debe** llevar un `aria-label`.
> - Las imágenes deben tener el atributo `alt` siempre.
> - El HTML debe ser semántico (`<section>`, `<article>`, `<nav>`, `<header>`, `<footer>`).

> [!CAUTION]
> **Prohibido el uso de Frameworks CSS Externos**
> Para mantener la visión intacta y las texturas SVG funcionando con `mix-blend-mode`, está estrictamente prohibido instalar librerías como TailwindCSS o Material UI sin previa autorización técnica.

### ¿Listo para programar?
Lee los componentes actuales, siente la agresividad del diseño, y asegúrate de que cada línea de código que escribas sirva para elevar la marca de la banda. ¡Manos a la obra!
