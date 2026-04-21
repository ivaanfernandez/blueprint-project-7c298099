

## Status: Already implemented — minor cleanup only

All four requested changes from your prompt are **already live** in the codebase from the previous turn. Verified line-by-line:

| Item | Status |
|---|---|
| Title rename "Precision" → "Professional Training" | ✅ Done (Home.tsx line 391, mobile line 463) |
| Dumbbell icon (blue #1A6BFF) | ✅ Done |
| Plate icon (red #FF3B3B) | ✅ Done |
| Pulse wave (green #22C55E) Recovery — unchanged | ✅ Done |
| Brain icon (gray #9CA3AF) | ✅ Done |
| Desktop CSS Grid `1fr 1fr` + `align-items: stretch` | ✅ Done (index.css line 240-278) |
| `features-stack` with `flex: 1` per card | ✅ Done |
| `rotativo-container` with `height: 100%` + `aspect-ratio: auto !important` | ✅ Done |
| FeatureCard desktop variant: `height: 100%`, centered content | ✅ Done |
| Mobile stack vertical preserved | ✅ Done |
| IntersectionObserver hover preserved | ✅ Done |

## Proposed cleanup (one small change)

The rotativo container has stale inline styles tied to `window.innerWidth`:

```tsx
<div className="about-photo-col rotativo-container" style={{
  borderRadius: 16, overflow: "hidden",
  position: "relative",
  aspectRatio: window.innerWidth < 1024 ? "3/4" : "auto",  // ← dead, overridden by CSS !important
  maxWidth: window.innerWidth < 1024 ? 320 : "none",        // ← dead, overridden by CSS !important
}}>
```

These two inline values are already neutralized by the desktop media query's `!important` rules, and on mobile the column is hidden with `display: none !important`. They serve no purpose and rely on `window.innerWidth` evaluated only at first render (no resize listener), which makes them brittle.

**Single edit:** remove `aspectRatio` and `maxWidth` from the inline style. The remaining inline style becomes:

```tsx
<div className="about-photo-col rotativo-container" style={{
  borderRadius: 16, overflow: "hidden",
  position: "relative",
}}>
```

No visual change — the CSS already handled everything. Just removes dead code.

## Files touched

- `src/pages/Home.tsx` — strip two unused inline style properties from the rotativo container

Nothing else needs changing. Approve and I'll apply the cleanup; or skip if you'd rather leave it as-is.

