

## Plan: Redesign BentoGrid Layout — Single Row with Smaller Cards + Instagram Cell

### Changes Overview

All changes in **`src/components/BentoGrid.tsx`** only. No changes to `MainLanding.tsx` needed (it just renders `<BentoGrid />`).

### 1. Shrink Fingerprint Cards
- Change `FingerprintCard` from `col-span-1 md:col-span-2` → `col-span-2 md:col-span-1`
- Reduce `FingerprintScan`: SVG from 56→40px, ring from 88→64px, container from 80×90 → 56×64
- Title font size from 20→16px
- Base `.bento-cell` padding from 24→16px

### 2. Map Cell — Square, Same Row
- Change from `col-span-2 md:col-span-6` → `col-span-2 md:col-span-2`
- Add `aspect-square` class on desktop, remove `minHeight: 140`
- Keep all existing map internals (grid lines, buildings, pin, LIVE badge, address, hover overlay)

### 3. Instagram Cell — Replace Old Link
- Remove the old Instagram `<a>` link + `<div>` wrapper below the grid
- Remove `Instagram` lucide import
- Add new `InstagramCell` component as last grid item: `col-span-2 md:col-span-1`
- Contains the 3D Instagram image (`/src/assets/instagram-3d.png`) at 48×48, centered
- On hover: fade in `"@BLUEPRINTPR"` text below icon (opacity transition 200ms)
- Entire cell is an `<a>` tag linking to Instagram
- Mobile: `h-24` fixed height

### 4. Desktop Grid Layout (single row, 6 cols)
```text
[Blue 1col] [Green 1col] [Red 1col] [Map 2col] [IG 1col]
```

### 5. Mobile Layout (2-col grid)
All cells `col-span-2` (full width), stacked. Instagram cell gets `h-24`.

### File Changes
- **`src/components/BentoGrid.tsx`**: Rewrite `FingerprintScan` sizes, `FingerprintCard` col spans, `MapCell` col span + aspect-square, add `InstagramCell`, remove old IG link, update CSS padding
- **`src/assets/instagram-3d.png`**: Save the user's uploaded image here

