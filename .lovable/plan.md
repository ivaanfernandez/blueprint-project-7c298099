

## Plan: Reduce Hero Title Size on Huella Azul

Single file edit: `src/pages/MainLanding.tsx`.

### Changes

**1. Hero headline wrapper (line 229-236):** Add horizontal padding and overflow hidden:
- `paddingLeft: '7%'`
- `paddingRight: '7%'`
- `overflow: 'hidden'`

**2. Both headline spans (lines 241 and 255):** Reduce font-size:
- `fontSize: 'clamp(28px, 4.5vw, 58px)'` → `fontSize: 'clamp(24px, 4vw, 52px)'`

**3. Mobile CSS overrides (~line 460+ in the `<style>` block):** Update the existing `.hero-headline-white` and `.hero-headline-blue` mobile rules:
- `font-size: clamp(20px, 6vw, 36px) !important`

Add mobile override for `.hero-headline-wrapper`:
- `padding-left: 6% !important; padding-right: 6% !important;`

### Files Modified
- `src/pages/MainLanding.tsx` only

