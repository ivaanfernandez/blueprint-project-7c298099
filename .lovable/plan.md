

## Rebuild Home Page — Full Futuristic Lab Design

### Overview
Replace the current placeholder `src/pages/Home.tsx` with a fully designed page containing 6 major sections: animated lab background, floating dock, hero with split layout, about section with Vitruvian wireframe SVG, photo bento grid using existing slider images, and protocol cards. Also add Syne + Inter + Orbitron fonts to `index.html`.

### Files to modify
1. **`index.html`** — Update Google Fonts link to include Syne, Inter, and Orbitron
2. **`src/pages/Home.tsx`** — Complete rewrite with all 6 sections

### Files NOT changed
- `src/App.tsx` — Already has correct routing (`/` → Home, `/huella-azul` → MainLanding)
- `src/pages/MainLanding.tsx` — Blue dock already navigates to `/`
- All other files remain untouched

---

### Technical Plan

#### 1. `index.html` — Add fonts
Update the Google Fonts `<link>` to add `Syne:wght@400;500;600;700;800`, `Inter:wght@300;400;500;600`, and `Orbitron:wght@400;500;600;700`.

#### 2. `src/pages/Home.tsx` — Full rebuild

**Structure (top to bottom):**

**A. Animated Lab Background** (fixed, z-0, pointer-events none)
- CSS grid pattern: 60×60px grid via two `linear-gradient` layers, line color `rgba(0,0,0,0.025)`
- Scan line div: 2px height, blue gradient, animated top-to-bottom over 8s infinite via `@keyframes scanMove`

**B. Floating Dock** (fixed, z-50)
- Reuse existing `Dock`/`DockIcon` components and `FingerprintSVG`
- Light-mode container: `rgba(255,255,255,0.82)`, `blur(16px)`, `border: 1px solid rgba(0,0,0,0.08)`, `box-shadow: 0 4px 24px rgba(0,0,0,0.05)`
- 3 fingerprints (30px): blue→`/huella-azul`, red→`/huella-roja`, green→`/huella-verde`
- Controlled by `showDock` prop

**C. Hero Section** (min-height 80vh, two-column flex)
- Left: "BLUEPRINT PROJECT" in Syne 800, subtitle in Inter 300, 60px divider, "ENTER THE LAB" button (Orbitron) → navigates to `/huella-azul`
- Right: Placeholder frame (aspect-ratio 4/3, dashed border, rounded) with pulsing FingerprintSVG in `#D1D5DB` + "VISUAL ELEMENT" label
- Mobile: stack vertically, center text

**Animated Divider** (reusable inline component)
- Gradient line with center dot, Framer Motion `whileInView` expand animation
- Placed between Hero↔About, About↔Gallery, Gallery↔Protocols

**D. About Section** (two-column flex)
- Left: Vitruvian wireframe SVG container with corner brackets, scan labels, animated scan line, and SVG figure (circles, head, torso, arms with dashed alternates, legs, joint dots in blue)
- Right: Eyebrow "ABOUT THE SYSTEM" (Orbitron), title "DESIGNED FOR THE HUMAN MACHINE" (Syne 800), divider, body text (Inter 300)
- Mobile: stack vertically, graphic on top

**E. Photo Bento Grid**
- Futuristic frame wrapper with 4 corner brackets (`border: 1.5px solid rgba(26,107,255,0.4)`), micro-labels (Orbitron 6px), edge accent gradients
- 4-column grid, 2 rows of 130px, 6 items total (items 1 and 5 span 2 columns)
- Use existing `slider-1.jpg` through `slider-6.jpg` as image sources with `object-fit: cover`
- Subtle scale(1.015) on hover, no overlays
- Mobile: 2-column, 3 rows of 120px

**F. Protocols Section** (3 cards)
- Header: "PROTOCOLS" eyebrow + "THREE PILLARS. ONE SYSTEM." title
- 3 glassmorphism cards with fingerprint SVGs, pillar names + descriptions hidden by default, revealed on hover with color-coded glow effects
- Click navigates to respective routes
- Mobile: single column, text always visible

**CSS Keyframes** (embedded `<style>` block):
- `scanMove`: translateY -100vh → 100vh, 8s linear infinite
- `subtlePulse`: opacity 0.15→0.35, 3s ease-in-out infinite
- `vitruvianScan`: top 10%→88%→10%, 4s ease-in-out infinite

**No footer** — page ends after Protocols.

