

## Plan: Remove Instagram Cell, 3-Column Grid, Center Fingerprint Content

### File: `src/components/BentoGrid.tsx`

**1. Remove Instagram cell**
- Delete `InstagramCell` component (lines 164-202)
- Remove `instagram3d` import (line 4)
- Remove `<InstagramCell />` from grid (line 210)

**2. Grid layout**
- Change grid from `grid-cols-2 md:grid-cols-4` to `grid-cols-2 md:grid-cols-3`
- MapCell gets `col-span-2 md:col-span-1` so it spans full width on mobile

**3. Center fingerprint card content**
- Add flex centering to `FingerprintCard`: `display: flex, flex-direction: column, align-items: center, justify-content: center, height: 100%`
- Remove `margin: "0 auto 12px"` from `FingerprintScan` wrapper, use `margin-bottom: 12px` only
- These changes ensure the fingerprint + title group is vertically and horizontally centered

