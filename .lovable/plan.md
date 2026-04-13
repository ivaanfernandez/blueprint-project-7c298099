

## Plan: Redesign About + Programs + Fix Video

Three changes to `src/pages/Home.tsx` only.

### Change 1: Redesign About Section (lines 301-385)

Replace the 3-column layout with a 2-column layout:
- **Left column** (flex: 1): Title ("DESIGNED FOR THE HUMAN MACHINE") wrapping naturally, body paragraph (marginBottom: 20), then a 2x2 features grid (gridTemplateColumns: "1fr 1fr", gap: 14). Each feature has a blue accent bar (3×28px) instead of numbered badges, with title (14px) and description (12px) in a bordered card.
- **Right column** (flex: "0 0 38%", maxWidth: 360): Photo with slider1, badge moved to bottom-right (right: -16) instead of bottom-center.
- Remove all `about-center-photo`, `about-left-text`, `about-right-features` class references — simplify to just `about-section-new`.
- Update mobile CSS (line 102-105): remove old 3-column mobile rules, add rules for 2-column stacking (photo full-width centered, features keep 1fr 1fr).

### Change 2: Replace Programs Section (lines 422-478)

Replace 4-card grid with 3 pillar cards (Blueprint Lab, Hack Bar, Reset):
- Subtitle changed to "Three pillars. One integrated system."
- Grid: `repeat(3, 1fr)`, gap: 16
- Each card: 3/4 aspect ratio, background image (slider1/2/3), dark gradient overlay with pillar color tint, corner brackets, top accent line, fingerprint icon (top-right), glassmorphism content panel at bottom.
- Cards navigate to `/huella-azul`, `/huella-verde`, `/huella-roja` on click.
- Hover effects via CSS classes: `pillar-card`, `pillar-card-img`, `pillar-card-fp` for scale/shadow/opacity transitions.
- Add hover CSS to the `<style>` block, plus mobile rule: `programs-grid` becomes 1fr, max-width 400px centered.

### Change 3: Fix Video (lines 396-401)

Change `<video>` styles from `objectFit: "cover"` to:
```
position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "contain"
```

### Technical details

- All changes in `src/pages/Home.tsx` only
- No new imports or dependencies
- CSS additions go in the existing `<style>` block (lines 66-126)
- Hover state for pillar cards managed via `onMouseEnter`/`onMouseLeave` for box-shadow + inline CSS classes for img scale and fingerprint opacity
- Mobile breakpoint updates in existing `@media (max-width: 767px)` block

