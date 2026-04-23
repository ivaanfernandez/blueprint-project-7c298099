## Premium Services — Mobile HUD Stack + Centered Heading

Two small fixes on `/huella-verde` Premium Services section.

### Issues

1. **Mobile HUD truncation** — On viewports <768px, `.premium-hud` uses `grid-template-columns: 1fr 1fr` (2×2). The right column gets clipped: "SESSION DURATION" → "SESS...", "MEMBER TIER" → "MEMBE...", values like "60 MIN" / "ELITE" cut off (because `.premium-stat-label` and `.premium-stat-value` use `text-overflow: ellipsis` with `white-space: nowrap`).
2. **Heading alignment** — "PREMIUM SERVICES" `<h2>` and the "Advanced protocols…" `<p>` in `src/pages/HuellaVerde.tsx` (lines 236–241) are left-aligned. User wants them centered on both mobile and desktop.

### Changes

**1. `src/index.css` — replace mobile media query block (lines 806–817)**

Switch HUD to single-column stack with roomier stat cells so labels/values render in full:

```css
@media (max-width: 767px) {
  .premium-hud {
    grid-template-columns: 1fr;
    gap: 10px;
  }
  .premium-title {
    font-size: 14px;
  }
  .premium-item {
    padding: 20px;
  }
  .premium-stat {
    padding: 10px 14px;
  }
  .premium-stat-label {
    font-size: 10px;
  }
  .premium-stat-value {
    font-size: 15px;
  }
}
```

Desktop `repeat(4, 1fr)` rule is untouched.

**2. `src/pages/HuellaVerde.tsx` — center the heading + subtitle (lines 236–241)**

- Add `textAlign: "center"` to the `<motion.h2>` style.
- Add `textAlign: "center"` and `margin: "0 auto 32px"` (replacing the current `marginBottom: 32`) to the `<motion.p>` style, plus `maxWidth: 540` so the centered paragraph reads well.

No other props or content changes. The accordion items themselves (`PremiumServiceAccordion`) keep their internal left-aligned titles.

### Out of scope

Recovery bento, HUD lab footer, hero, dock, accordion interaction logic, desktop HUD grid, all other pages.

### Files modified

- `src/index.css` — mobile media query for `.premium-hud` and friends
- `src/pages/HuellaVerde.tsx` — inline styles on the section's `<h2>` and `<p>`
