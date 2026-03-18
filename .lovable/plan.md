

## Plan: Remove Blue Fingerprint Card, Redistribute Grid

### Changes — `src/components/BentoGrid.tsx` only

1. **Remove blue BLUEPRINT card from data**: Delete the first entry in `FINGERPRINT_CARDS` array (lines 6-17), keeping only HACK BAR and RESET.

2. **Update FingerprintCard col spans**: Change from `col-span-2 md:col-span-1` to `col-span-2 md:col-span-2` so each remaining card takes 2 columns on desktop.

3. **Move InstagramCell outside the grid**: Move `<InstagramCell />` below the grid `<div>`, keeping it as a standalone element (no longer a grid child).

4. **Desktop layout (6 cols)**:
```text
[HACK BAR 2col] [RESET 2col] [Map 2col]
[Instagram — standalone below grid]
```

5. **Mobile**: HACK BAR, RESET, and Map all `col-span-2` (full width, stacked). Instagram stays below.

No changes to map content, Instagram styling, or any other components.

