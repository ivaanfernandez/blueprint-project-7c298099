

## Mobile Hero Spacing Fixes

Three CSS-only changes in the mobile media query of `src/pages/MainLanding.tsx`:

### 1. Push hero content lower
Change `.hero-content-wrapper` `padding-top` from `50px` to `90px` (line 444). This adds ~40px more breathing room after the Dock.

### 2. Add space after button, before chevron
Change `.hero-cta-button` `margin-bottom` from `0px` to `40px` (line 488). This creates a generous gap between the ShinyButton and the chevron.

### 3. Add space after chevron, before slider
Add `margin-bottom: 60px` to `.hero-section` in the mobile media query (around line 437, where `height: 95vh` is set). This adds dark breathing space between the hero's end and the image slider.

### Files
- `src/pages/MainLanding.tsx` — 3 line changes in the mobile `@media (max-width: 767px)` block only.

