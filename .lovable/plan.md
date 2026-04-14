

## Plan: Replace Feature Rows with Radar Orbital Layout

### Summary
Replace the "LIMITLESS POTENTIAL WITH BLUEPRINT" horizontal-rows section (lines 507-638) with a radar/orbital visualization: white background, concentric rings, rotating sweep line, and 3 pillar nodes with fingerprint icons.

### File: `src/pages/Home.tsx`

**1. Replace lines 507-638** (the entire `E: FEATURE — HORIZONTAL ROWS` section) with:
- White container (`#FFFFFF`, `padding: 80px 7%`, centered)
- Section title "LIMITLESS POTENTIAL WITH BLUEPRINT" (Michroma, centered) + subtitle "Three pillars. One integrated system." (Inter, gray)
- Radar container (520×520px, centered, `position: relative`):
  - Inline `<style>` with `@keyframes radarSweep`, `pulseRing`, `fadeUp`
  - 6 concentric ring `<div>`s (120, 200, 290, 370, 440, 510px) — rounded borders, `rgba(0,0,0,0.06)`
  - Crosshair center lines (vertical + horizontal)
  - 4 degree tick labels (000°, 090°, 180°, 270°) — Orbitron font
  - Rotating sweep line (5s linear infinite) with gradient
  - 3 connector lines from center to each node position
  - Center hub (80×80px) with the existing `FingerprintSVG` in black
  - 3 nodes positioned absolutely:
    - **Blueprint Lab** (top center, blue `#1A6BFF`) → navigates to `/huella-azul`
    - **Hack Bar** (bottom-left, green `#22C55E`) → navigates to `/huella-verde`
    - **Reset** (bottom-right, red `#FF3B3B`) → navigates to `/huella-roja`
  - Each node: colored icon box (52×52px), name (Michroma 11px), description (Inter 9px gray)
  - Nodes use `navigate()` from React Router on click

**2. Mobile wrapper** — wrap the radar in a `<div>` with class `radar-scale-wrapper` that applies `transform: scale(0.62)` + `transform-origin: top center` on mobile via CSS.

**3. Update mobile CSS block** (~lines 85-120):
- Remove `.feature-row-mobile`, `.feature-row-photo`, `.feature-row-arrow` rules (no longer needed)
- Keep `.feature-title-centered` rule (still used)
- Add:
```css
.radar-scale-wrapper {
  transform: scale(0.62);
  transform-origin: top center;
  margin-bottom: -120px;
}
```

**4. No import changes** — slider imports remain used by Programs and About sections. `navigate` already imported.

### Technical Details
- All animations via pure CSS keyframes (no new dependencies)
- Node clicks use existing `navigate()` from `useNavigate()`
- Inline SVG fingerprints inside each node (self-contained, colored per pillar)
- Center hub uses existing `FingerprintSVG` component in black

