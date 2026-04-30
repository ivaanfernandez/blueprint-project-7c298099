## Reset (Huella Verde) Hero — Convert to Floating Card

Scope: only `src/pages/HuellaVerde.tsx`. No other pages touched.

### Context found

- The hero is the `<section>` at line 299 of `HuellaVerde.tsx`. It currently uses inline styles (`minHeight: 100vh`, full-bleed, `overflow: hidden`), with a `<picture>` background, two radial overlays, the `RESET` title, and a bottom green accent line + `GradualBlur`.
- The page sits on top of a fixed `.verde-animated-bg` layer (procedural background). The page wrapper (`motion.div` at line 294) uses `backgroundColor: "transparent"`.
- The RECOVERY ROOM section right after the hero already has `background: "transparent"`, so the procedural bg shows through. There is no solid color clash — but the spec asks the wrapper around the hero to use `#050a05` so the side gutters look continuous with the section below.

### Change 1 — Wrap hero in a floating card

In `HuellaVerde.tsx`:

1. Add a `className="reset-hero"` to the existing hero `<section>` (keep all current inline styles and inner content untouched — picture, overlays, title, accent line, GradualBlur all stay identical).
2. Wrap that `<section>` in a new `<div className="reset-hero-wrapper">…</div>`. No other JSX changes.

### Change 2 — Add CSS inside the existing inline `<style>` block

Append the floating-card rules to the existing `<style>{`…`}</style>` block in `HuellaVerde.tsx` (keeps styles scoped to this page, matches the current pattern):

```css
/* ── RESET HERO FLOATING CARD ── */
.reset-hero-wrapper {
  width: 100%;
  padding: 0 16px;
  background: #050a05;
}
.reset-hero {
  border-radius: 24px;
  overflow: hidden; /* already inline; reinforced here */
  border: 0.5px solid rgba(74, 222, 128, 0.3);
  position: relative;
}
.reset-hero::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 24px;
  pointer-events: none;
  box-shadow: 0 0 40px rgba(74, 222, 128, 0.08) inset;
  z-index: 1;
}
@media (max-width: 1023px) and (min-width: 768px) {
  .reset-hero-wrapper { padding: 0 12px; }
  .reset-hero { border-radius: 20px; }
}
@media (max-width: 767px) {
  .reset-hero-wrapper { padding: 0 8px; }
  .reset-hero { border-radius: 16px; }
}
```

Note: the hero's existing inline `minHeight: 100vh` + `overflow: hidden` are preserved, so video/picture clipping respects the rounded corners. The `position: relative` already exists inline.

### Change 3 — RECOVERY ROOM background continuity

The next section currently uses `background: "transparent"`, which lets the global `.verde-animated-bg` show through. To avoid a visible seam between the `#050a05` wrapper gutters and the section below, change that section's inline `background` from `"transparent"` to `"#050a05"` (line 355). Padding, layout, and content remain unchanged.

### Files changed

- `src/pages/HuellaVerde.tsx` — add wrapper div + `reset-hero` class on hero section, append CSS rules to the inline `<style>` block, change RECOVERY ROOM `background` to `#050a05`.

### Not changed

- `HuellaAzul.tsx`, `HuellaRoja.tsx`, `Home.tsx` — untouched.
- Hero inner content (picture, overlays, title, animations, GradualBlur, scan line).
- Hero height, animations, video/picture sources.
- Dock and any nav.
