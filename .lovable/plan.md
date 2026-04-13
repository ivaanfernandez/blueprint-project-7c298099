

## Plan: About Section — Bigger Image, Tighter Gap, Bigger Features

Single file: `src/pages/Home.tsx`

### Changes

1. **Section container gap** (line 306): `gap: 40` → `gap: 32`

2. **Photo column** (line 381): `flex: "0 0 38%", maxWidth: 360` → `flex: "0 0 44%", maxWidth: 460`

3. **Features grid** (line 325): `gap: 16` → `gap: 20`, add `marginBottom: 0`

4. **Feature cards** (lines 349-350): `padding: 14, borderRadius: 12` → `padding: 18, borderRadius: 14`

5. **Icon boxes** (line 353): `width: 44, height: 44, borderRadius: 12` → `width: 48, height: 48, borderRadius: 14`

6. **SVG icons** (lines 328-329, 333-334, 338-339, 343-344): `width="22" height="22"` → `width="24" height="24"` (4 occurrences)

7. **Feature titles** (line 366): `fontSize: 15, marginBottom: 5` → `fontSize: 16, marginBottom: 6`

8. **Feature descriptions** (line 370): `fontSize: 12, lineHeight: 1.5` → `fontSize: 13, lineHeight: 1.6`

### Technical notes
- No mobile CSS changes needed
- No other sections affected
- 8 small inline style tweaks, all within lines 305-376

