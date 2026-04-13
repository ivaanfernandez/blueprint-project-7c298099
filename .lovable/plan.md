

## Plan: Number Watermark + Bold Title in Feature Cards

Single file: `src/pages/Home.tsx`

### What changes

Replace the inner content of each feature card (lines 364-421). The card container (`<div className="glass-feat" ...>`) stays identical. Only the children change.

### Data array update (lines 364-384)

Add a `num` field to each item: `"01"`, `"02"`, `"03"`, `"04"`. Keep existing `title`, `desc`, `icon` fields unchanged.

### New card inner structure (lines 396-419)

Replace the current horizontal icon+text layout with a vertical layout:

1. **Top row** — flex row with number watermark + icon box:
   - Large transparent number: Michroma font, 36px, `rgba(26,107,255,0.1)`
   - Icon box: 40×40, borderRadius 10, same blue-tinted background. Keep glow effect div inside.

2. **Title** — Inter 18px, fontWeight 700, color `#000`, marginBottom 6

3. **Description** — Inter 13px, fontWeight 300, color `#6B7280`, lineHeight 1.6

### Card container — no changes

The `glass-feat` div with glassmorphism styles, `alignSelf: "stretch"`, hover effects all remain exactly as-is. Only the `display: "flex", alignItems: "flex-start", gap: 14` on the container changes to `flexDirection: "column"` since the layout is now vertical (number+icon row, then title, then desc).

### Files
- `src/pages/Home.tsx` — lines ~364-421

