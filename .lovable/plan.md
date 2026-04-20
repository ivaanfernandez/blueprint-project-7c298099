
## Plan: Desktop Hero Centering + Button Enlargement

### Overview
Center the hero content vertically on desktop and enlarge the "HAVE YOUR BLUEPRINT" button with appropriate spacing adjustments. Mobile remains unchanged.

### Changes

**1. Center Hero Content Vertically (Desktop)**
- Update `.hero-content-wrapper` CSS (line ~538-541):
  - Change `justify-content: flex-start` → `justify-content: center`
  - Add `min-height: 100vh` to ensure vertical centering
- Remove excessive top padding from `hero-headline-wrapper` inline style (line ~234): Change `paddingTop: '140px'` → `paddingTop: '40px'` or remove entirely
- Remove `paddingTop: "110px"` from hero-content-wrapper inline style (line ~229)

**2. Increase Gap Between Subtitle and Button**
- Change hero-cta-button `marginTop` inline style (line ~331): `"24px"` → `"48px"`
- Update CSS `.hero-cta-button` (line ~558-561): `margin-top: 64px` → `margin-top: 80px`

**3. Enlarge the "HAVE YOUR BLUEPRINT" Button**
- Update `.hero-shiny-btn` CSS (line ~498-504):
  - `padding: 1.25rem 3rem` → `padding: 18px 48px`
  - `font-size: 15px` → `font-size: 14px`
  - `min-width: 280px` (keep)
  - `letter-spacing: 0.15em` (keep)
  - Add explicit `height: auto` to support larger padding

**4. Push Chevron Down**
- Change hero-scroll-indicator `marginTop` inline style (line ~336): `24` → `40`
- Update CSS `.hero-scroll-indicator` desktop rule to have `margin-top: 40px`

### Untouched
- All mobile styles (`@media (max-width: 767px)` rules remain unchanged)
- Button text, border, glow, and hover effects
- Hero background, overlay, or any imagery
- Title text, WordRotate, or subtitle text
- Dock component or any other section
- Any other pages

### Files Modified
- `src/pages/MainLanding.tsx` (CSS in `<style>` block and inline styles on hero content wrapper, headline wrapper, CTA button, and scroll indicator)
