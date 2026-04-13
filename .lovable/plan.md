

## Plan: Replace Footer with Cinematic Scroll-Reveal Footer

Three changes: install GSAP, create new component, update Home.tsx.

### Step 1: Install GSAP

Run `npm install gsap`

### Step 2: Create `src/components/CinematicFooter.tsx`

The provided component code was truncated, so I will reconstruct the full component based on the partial code and intent:

- **GSAP + ScrollTrigger** for scroll-driven animations
- **MagneticButton** — a button that subtly follows the cursor with elastic return (using GSAP)
- **MarqueeItem** — infinite horizontal scrolling text band with pillar keywords ("Precision Training ✦ Nutrition Engineering ✦ Recovery Science ✦ Mental Growth ✦ Blueprint Lab ✦ Hack Bar ✦ Reset ✦")
- **Main layout** (dark bg `#0a0a0a`):
  - Giant "BLUEPRINT" text that parallax-scrolls in (y: 10vh → 0, scale 0.8 → 1, scrubbed)
  - Breathing fingerprint glow behind the text (`footer-breathe` keyframe)
  - Marquee band with `footer-scroll-marquee` animation
  - Heading: "YOUR EVOLUTION STARTS HERE" fades in on scroll
  - Two MagneticButtons: "JOIN NOW" (navigates `/huella-azul`) and "INSTAGRAM" (external link)
  - Footer bar: "BLUEPRINT PROJECT" left, links center, "© 2025" right
- All keyframes defined in the component's `STYLES` constant (pulseRing, pulseGlow, footer-breathe, footer-scroll-marquee)
- `useNavigate` for internal routing

### Step 3: Update `src/pages/Home.tsx`

**3a. Add import** at top:
```tsx
import CinematicFooter from "@/components/CinematicFooter";
```

**3b. Delete old footer** (lines 641–866) — the entire `<div className="footer-section">` block containing "ENTER THE BLUEPRINT", pulse beams SVG, JOIN NOW button, Instagram icon, and footer bar.

**3c. Replace with:**
```tsx
<CinematicFooter />
```
Placed as last element before closing `</motion.div>`.

**3d. Remove keyframes from `<style>` block** — delete `@keyframes pulseRing` (lines 83–86) and `@keyframes pulseGlow` (lines 87–90), since they now live inside the CinematicFooter component.

### No other changes
Hero, About, Video, Programs, Feature Rows, Dock all untouched. No routing changes.

