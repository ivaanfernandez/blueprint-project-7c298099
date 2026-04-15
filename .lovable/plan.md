

## Plan: Fix Hack Bar Hero — Dock + Image Placeholder + Glow

### File: `src/pages/HuellaRoja.tsx`

**Fix 1 — Move Dock to fixed top position (line 172):**
Change `bottom: 24` to `top: 14` in the Dock wrapper div style.

**Fix 2 — Add visible image placeholder in right column (lines 212-216):**
Replace the plain `#1a1a1a` div with a styled placeholder box containing corner brackets, a camera icon (SVG), and "Image placeholder" label text. The placeholder box uses `border: 1px solid rgba(255,59,59,0.15)`, centered inside the right column with 80% width/60% height.

**Fix 3 — Intensify red ambient glow (line 190):**
- Change existing glow from `rgba(255,59,59,0.06)` to `rgba(255,59,59,0.12)` and reposition to `10% 70%`
- Add a second glow div on the right side: `radial-gradient(ellipse at 90% 40%, rgba(255,59,59,0.06) 0%, transparent 50%)`

**Mobile CSS updates (lines 155-167):**
- Add `.hr-hero-right` mobile rule for placeholder height: `height: 250px !important`
- Add `.hr-hero-placeholder` mobile rule: `width: 90% !important; height: 80% !important;`
- Existing `.hr-hero-fade` mobile rule already handles top fade

### Only file modified: `src/pages/HuellaRoja.tsx`

