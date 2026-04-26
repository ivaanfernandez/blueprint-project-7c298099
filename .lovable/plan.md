# Performance Optimization 1/4 — Asset Quick Wins

Apply non-visual, low-risk loading optimizations. No layout, styling, or logic changes.

## 1. `src/components/BiometricTerminalLocation.tsx` — Maps iframe

Iframe (line 26-32) already has `loading="lazy"`. Add `importance="low"` so the browser deprioritizes it vs critical resources.

```tsx
<iframe
  src={embedUrl}
  title="Blueprint Lab location map"
  loading="lazy"
  importance="low"
  referrerPolicy="no-referrer-when-downgrade"
  className="bio-map-iframe"
/>
```

## 2. `index.html` — Preconnect hints

Fonts preconnect already exists (lines 9-10). Add Google Maps preconnect + DNS-prefetch fallbacks right after them, before the fonts stylesheet:

```html
<link rel="preconnect" href="https://www.google.com" />
<link rel="preconnect" href="https://maps.gstatic.com" crossorigin />
<link rel="preconnect" href="https://maps.googleapis.com" crossorigin />
<link rel="dns-prefetch" href="https://www.google.com" />
<link rel="dns-prefetch" href="https://maps.gstatic.com" />
```

Fonts preconnect remains as-is (no duplication).

## 3. `src/pages/Home.tsx` — Image loading attributes

**Hero images (lines ~276 and ~322)**: already use `fetchPriority="high"` + `loading="eager"`. Add `decoding="sync"` for completeness. No other change.

**Below-the-fold images** — add `loading="lazy"` + `decoding="async"` to:
- `aboutImages` map (line 600) — gym rotator photos
- `labImages` map (line 660) — Blueprint Lab pillar card
- `hackbarImages` map (line 676) — Hack Bar pillar card
- Fallback pillar `<img>` (line 691) — generic pillar card image

The Reset card uses a `<video>` (line 652), not an `<img>` — leave untouched (video lazy-loading is a separate prompt).

**Width/height**: All these images are absolutely positioned with `width: 100%` / `height: 100%` driven by their container's `aspect-ratio` (e.g. `3/4` on pillar cards) or fixed container dimensions. Layout shift is already prevented by CSS — no `width`/`height` attributes needed. Will note this in the report.

**"Built for Human Evolution" feature cards**: those use lucide-react SVG icons, not `<img>` tags — nothing to change there.

## 4. Out of scope (per user)

- Huella Azul/Roja/Verde pages — untouched
- Silk WebGL background, GradualBlur, Service Workers, image compression, code splitting — handled in prompts 2-4
- No new dependencies, no visual changes, no removed elements

## 5. Chat report after applying

Will report status of each change (applied / already present / not found).
