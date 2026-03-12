

# MainLanding Page Build

## Note
The prompt for Card 2 and Card 3 was cut off. I will mirror the Card 1 pattern using the colors and titles already specified (Roja/#FF3B3B/NUTRICIÓN, Verde/#22C55E/RECUPERACIÓN) and matching placeholder body text in Spanish. If you have specific body text for those cards, share it after and I will update.

## Files to Create

1. **`src/components/ProceduralBackground.tsx`** — WebGL canvas component (fixed, inset-0, z-0) with the exact shader logic provided, using the three specified colors (baseColor deep black-navy, accentColor electric blue, neonColor bright blue). Uniforms: `u_time`, `u_resolution`. Canvas styled with `filter: contrast(1.1) brightness(0.85)`.

2. **`src/components/ui/dock.tsx`** — Dock + DockIcon components using framer-motion `useMotionValue`, `useSpring`, `useTransform` for magnification effect. Default magnification 72, distance 120. Styled with glass morphism (rgba bg, blur, blue border).

3. **`src/pages/HuellaAzul.tsx`**, **`src/pages/HuellaRoja.tsx`**, **`src/pages/HuellaVerde.tsx`** — Simple placeholder pages (black bg, centered white text with huella name).

## Files to Modify

4. **`src/pages/MainLanding.tsx`** — Complete rewrite with:
   - Page wrapper: fade-in animation (opacity 0→1 over 1s on mount), black bg, Space Grotesk font
   - `<ProceduralBackground />` rendered first
   - **Hero section** (100vh, z-10, centered): eyebrow label, two-line headline with staggered word animations (framer-motion), subheadline, Dock with 3 fingerprint SVG icons (blue/red/green with glows, tooltips, navigation), scroll indicator with pulsing line
   - **Tres Huellas section** (py 120px, z-10): section label, title, subtitle, 3-column CSS grid (1-col mobile) with glass cards for each huella — fingerprint icon, tag, title, body text, hover border/bg transitions

5. **`src/App.tsx`** — Add routes for `/huella-azul`, `/huella-roja`, `/huella-verde` with lazy imports of the placeholder pages.

## Key Implementation Details

- Fingerprint SVGs in the dock will reuse the same ridge pattern from BiometricScan (ellipses + arches + whorl) but simplified to 48px size for cards and 64px for dock icons, colored per huella
- WebGL: create canvas, get webgl context, compile vertex + fragment shaders, animate with requestAnimationFrame, handle resize
- Dock tooltips: simple absolutely-positioned labels (no border/bg, white text, 9px) shown on hover state
- All animations use framer-motion except the WebGL and CSS pulse on scroll indicator
- The three cards use CSS `transition: border-color 0.3s, background 0.3s` for hover effects

