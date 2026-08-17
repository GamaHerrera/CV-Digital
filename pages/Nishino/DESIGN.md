---
name: Nishino Japan Dining
description: Japan Dining · Zapopan
colors:
  primary: "#7A4B56"
  primary-light: "#9D6270"
  secondary: "#C4A882"
  bg-primary: "#0A0A0A"
  bg-secondary: "#111111"
  bg-card: "#161616"
  bg-elevated: "#1C1C1C"
  text-primary: "#F3F4F6"
  text-secondary: "#BCC0CA"
  text-muted: "#9CA3AF"
  border: "rgba(255, 255, 255, 0.07)"
  brand-whatsapp: "#25D366"
  overlay: "rgba(0, 0, 0, 0.5)"
typography:
  display:
    fontFamily: "'Cormorant Garamond', Georgia, serif"
    fontSize: "clamp(3rem, 8vw, 6rem)"
    fontWeight: 300
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "'Cormorant Garamond', Georgia, serif"
    fontSize: "clamp(2.2rem, 5vw, 3.8rem)"
    fontWeight: 300
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  title:
    fontFamily: "'Cormorant Garamond', Georgia, serif"
    fontSize: "clamp(1.6rem, 3vw, 2.4rem)"
    fontWeight: 400
    lineHeight: 1.2
  heading-sm:
    fontFamily: "'Cormorant Garamond', Georgia, serif"
    fontSize: "clamp(1.2rem, 2vw, 1.6rem)"
    fontWeight: 400
  body:
    fontFamily: "'Outfit', system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "'Outfit', system-ui, sans-serif"
    fontSize: "0.7rem"
    fontWeight: 600
    letterSpacing: "0.22em"
rounded:
  sm: "3px"
  md: "6px"
  lg: "12px"
spacing:
  container-pad: "clamp(20px, 5vw, 60px)"
  section-padding: "clamp(80px, 10vw, 140px)"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.sm}"
    padding: "16px 36px"
  button-secondary:
    textColor: "{colors.text-primary}"
    rounded: "{rounded.sm}"
    padding: "15px 34px"
---

# Design System: Nishino Japan Dining

## Overview

**Creative North Star: "The Zen Artisan"**

Minimalist, precise, and understated. The design should recede and let the culinary craft and photography stand out. The dark, layered aesthetic conveys a sense of premium authenticity, reserving warmth for the photography and carefully chosen accents.

**Key Characteristics:**
- Deep, immersive dark mode aesthetic.
- Elegant serif typography for impact and display.
- Utilitarian sans-serif for legible interface elements.
- Precise, restrained component styling.

## Colors

A deep, almost pitch-black canvas with earthy accents that reflect natural materials and warmth.

### Primary
- **Deep Earthy Plum** (#7A4B56): Used for primary actions, subtle highlights, and underlines. Its rarity makes it effective.
- **Lighter Plum** (#9D6270): Used for hover states and active indicators.

### Secondary
- **Warm Wood** (#C4A882): Used selectively for secondary accents or borders to bring in natural warmth.

### Neutral
- **Primary Background** (#0A0A0A): The deep void canvas for the entire page.
- **Card Background** (#161616): Slightly lifted surface for grouping content.
- **Primary Text** (#F3F4F6): High-contrast text for critical reading and headings.
- **Secondary Text** (#BCC0CA): For supporting copy.
- **Muted Text** (#9CA3AF): For meta-information and labels.
- **Border** (rgba(255, 255, 255, 0.07)): Subtle dividers that structure the page without demanding attention.

**The Contrast Rule.** Text on `bg-primary` must always be `#F3F4F6` (Primary) or `#BCC0CA` (Secondary) for legibility. Muted text should only be used on labels or large text.

## Typography

**Display Font:** 'Cormorant Garamond' (with Georgia, serif fallback)
**Body Font:** 'Outfit' (with system-ui, sans-serif fallback)

**Character:** A classic, poetic serif paired with a highly functional sans-serif. The serif provides an authentic, high-end editorial feel, while the sans-serif ensures perfect readability for menus and interface elements.

### Hierarchy
- **Display** (300, clamp(3rem, 8vw, 6rem), 1.05): Used exclusively for hero section titles.
- **Headline** (300, clamp(2.2rem, 5vw, 3.8rem), 1.1): Used for major section headers.
- **Title** (400, clamp(1.6rem, 3vw, 2.4rem), 1.2): Used for subsections and large item titles.
- **Body** (400, 16px, 1.6): Used for paragraphs, descriptions, and general text.
- **Label** (600, 0.7rem, uppercase, 0.22em tracking): Used for tiny, highly structural metadata or overlines.

## Layout

The system uses a maximum container width (1200px) with fluid padding (`clamp(20px, 5vw, 60px)`) to ensure the content breathes on all devices. Sections are generously spaced (`clamp(80px, 10vw, 140px)`) to create a slow, deliberate scrolling rhythm.

## Elevation & Depth

Lifted for emphasis. Shadows are used structurally for floating elements (navbar, cards) and ambiently for accent glows, creating a sense of depth on a dark canvas.

### Shadow Vocabulary
- **Card Shadow** (`0 1px 3px rgba(0,0,0,0.5), 0 4px 20px rgba(0,0,0,0.3)`): Lifts cards slightly off the dark background.
- **Glow Shadow** (`0 0 40px rgba(122, 75, 86, 0.2)`): Ambient colored glow for emphasis.
- **FAB Shadow** (`0 4px 20px rgba(0,0,0,0.6), 0 0 0 1px rgba(122,75,86,0.3)`): High elevation for floating action buttons.

## Shapes

The form language is refined and purposeful. Elements feature very sharp, minimal rounding (`3px` for small components, `6px` for medium surfaces) that feels deliberate and premium, never playful or bubbly.

## Components

Refined and purposeful. Components have precise spacing, sharp edges, and subtle transitions that feel premium and deliberate.

### Buttons
- **Shape:** Sharp corners (3px radius).
- **Primary:** Deep Earthy Plum background, high-contrast text, generous padding (16px 36px), uppercase label.
- **Hover / Focus:** Background lightens, elevates slightly (-2px translateY), and casts an ambient colored glow.
- **Secondary:** Ghost style. Transparent background, subtle border, lighter on hover.

### Navigation
- **Style:** Fixed to the top. Transparent at rest, becoming a blurred, semi-transparent dark surface when scrolled to ensure legibility while maintaining context.

### Tabs
- **Style:** Minimal text labels with a 2px Deep Earthy Plum underline that expands on active state. No backgrounds.

## Do's and Don'ts

### Do:
- **Do** allow generous whitespace between sections to let the design breathe.
- **Do** use the display serif exclusively for large headers, never for body copy or small UI elements.
- **Do** rely on photography as the primary source of color on the page.

### Don't:
- **Don't** use large border radii. Keep corners sharp and deliberate (3px–6px max).
- **Don't** overuse the primary accent color. It should be reserved for actionable items or very subtle underlines.
- **Don't** use solid opaque backgrounds for floating headers; rely on the blur effect to show depth.
