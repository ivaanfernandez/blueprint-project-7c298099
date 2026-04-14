

## Plan: Reduce Hero Title Font Size for All WordRotate Phrases

### File: `src/pages/MainLanding.tsx`

**1. Inline styles (lines 243, 257):** Change both `fontSize` values:
- `'clamp(24px, 4vw, 52px)'` → `'clamp(20px, 3.2vw, 42px)'`

**2. Headline wrapper padding (lines 235-236):** Reduce padding:
- `paddingLeft: '7%'` → `'5%'`
- `paddingRight: '7%'` → `'5%'`

**3. Mobile CSS overrides (~lines 462-471):** Update both `.hero-headline-white` and `.hero-headline-blue`:
- `font-size: clamp(20px, 6vw, 36px)` → `font-size: clamp(18px, 5.5vw, 32px)`

**4. Mobile wrapper override (~line 456-460):** Update `.hero-headline-wrapper`:
- Add `padding-left: 4% !important; padding-right: 4% !important;`

### Files Modified
- `src/pages/MainLanding.tsx` only

