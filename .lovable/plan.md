

## Plan: Hack Bar Mobile Optimization (5 changes, mobile only)

All edits in `src/pages/HuellaRoja.tsx`. Desktop layout untouched — every change is gated behind `@media (max-width: 767px)` or `hidden md:*` classes.

### 1. HERO — Hide image placeholder, center title (mobile only)

In the existing `@media (max-width: 767px)` block, update `.hr-hero-right` to `display: none !important;` and `.hr-hero-left` to `min-height: 60vh; padding: 0 6%; justify-content: center;`. Also reduce hero `.hr-hero` to `min-height: 60vh` on mobile.

Result on mobile: dark background + ambient red glow + centered "HACK BAR" title only.

### 2. FUEL YOUR SYSTEM — Compact 120px cards (mobile only)

- Add `className="hr-fuel-grid hidden md:flex"` to the existing desktop `<FuelCard>` grid (line 455) so it's hidden on mobile.
- Add a new mobile-only block right after it: `<div className="flex md:hidden flex-col gap-3">` containing two compact cards (120px height each):
  - SUPPLEMENTS — bg image `/hackbar/supplements.jpg`, dark overlay, title + items joined by ` · ` on one line, red accent line bottom
  - MEAL PREPS — bg image `/hackbar/mealprep.jpg`, same structure

Each compact card: `min-height: 120px`, padding `16px 18px`, `border-radius: 12px`, image absolute bg with `objectFit: cover`, gradient overlay, content z-index 2.

### 3. HACKBAR STATION — Horizontal swipe carousel (mobile only)

- Add `hidden md:grid` to the existing `.hr-station-grid` (line 484) so the desktop 3-col grid hides on mobile.
- Add a new mobile-only block: `<div className="hackbar-scroll flex md:hidden">` with `overflow-x: auto`, `scroll-snap-type: x mandatory`, `gap: 14px`, horizontal padding for edge insets.
- Render 3 mini cards (Custom Shakes / Functional Coffee / Blueprint Snacks) at fixed width `260px`, `scroll-snap-align: start`, dark bg + red accent line + title + desc.
- Inject `.hackbar-scroll::-webkit-scrollbar { display: none; }` and `scrollbar-width: none` into the `<style>` block.

### 4. MEET THE CHEF — Reduce placeholder to 150px (mobile only)

In the existing media query update `.hr-chef-right` from `min-height: 250px` → `min-height: 150px !important; height: 150px;`. Inner placeholder `min-height` also reduced. `.hr-chef-left` already centered — keep as is.

### 5. 3D CAROUSEL — Reduce card sizes (mobile only)

Add CSS classes `carousel-3d-container`, `carousel-3d-card` to the existing `Carousel3D` elements (lines 196 and 202) so we can size them via media query without disturbing inline styles on desktop. In the mobile media query:

```css
.carousel-3d-container { min-height: 320px !important; padding: 32px 4% !important; }
.carousel-3d-card { width: 170px !important; min-height: 240px !important; padding: 20px 16px !important; }
.carousel-3d-card.is-active { width: 220px !important; min-height: 280px !important; }
.carousel-3d-card h3 { font-size: 11px !important; }
.carousel-3d-card.is-active h3 { font-size: 14px !important; }
.carousel-3d-card p { font-size: 11px !important; }
```

The inline `transform` (translateX/rotateY/scale) stays on desktop values — acceptable because the perspective container scales the look naturally. Optionally tighten translate/rotate via `transform: translateX(±15px) rotateY(±10deg) scale(0.8) !important;` on `.carousel-3d-card:not(.is-active).is-left` / `.is-right`.

### Technical Notes

- All changes additive: existing desktop inline styles & media queries remain intact.
- Mobile breakpoint `<768px` aligns with Tailwind `md:` (768px+).
- New CSS injected inside the existing `<style>{`…`}</style>` block (line 317).
- No new imports, no new dependencies.
- Image paths (`/hackbar/supplements.jpg`, `/hackbar/mealprep.jpg`) already exist.

### Files Modified
- `src/pages/HuellaRoja.tsx` (single file)

### Untouched
- All desktop layouts (≥768px)
- Lab monitor footer
- All other pages
- All section text/content (only layout changes on mobile)
- Biometric intro, dock, animations

