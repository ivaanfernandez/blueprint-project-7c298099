
## Plan: Mobile-Only Stacked Photo Cards for "Designed for the Human Machine"

### File: `src/pages/Home.tsx`

In the About section (lines 257-350), wrap the existing desktop layout and add a new mobile-only layout. Desktop stays 100% untouched.

**Approach:**
1. Wrap the existing timeline `<div>` (lines 280-338) with `className="about-features-desktop"` so it can be hidden on mobile via CSS.
2. Add a new sibling `<div className="about-features-mobile">` rendering 4 stacked cards (Precision Training, Nutrition Engineering, Recovery Science, Mental Growth) with:
   - Per-card linear-gradient background (blue / red / green / white tints)
   - Dark overlay
   - Michroma uppercase name + Inter description
   - Bottom accent line in the brand color (blue / red / green / white)
3. Hide the right-side gym photo on mobile by adding a class to the `about-photo-col` wrapper (or use existing `about-photo-col` selector).
4. Keep title + subtitle visible above the cards (already centered-friendly via existing styles).

### File: `src/index.css`

Inside the existing `@media (max-width: 767px)` block:
- `.about-features-desktop { display: none !important; }`
- `.about-features-mobile { display: flex !important; flex-direction: column; gap: 12px; }`
- `.about-photo-col { display: none !important; }` (hides gym photo on mobile)
- Center-align title/subtitle on mobile and add `margin-bottom: 24px`.

Default (desktop) CSS:
- `.about-features-mobile { display: none; }`

### Card Content
1. **PRECISION TRAINING** — blue `#1A6BFF` — "Data-driven methodology built to forge strength, endurance, and resilience."
2. **NUTRITION ENGINEERING** — red `#FF3B3B` — "Every meal is a signal. Optimize input, transform output."
3. **RECOVERY SCIENCE** — green `#22C55E` — "Strategic rest, optimized sleep, and complete restoration protocols."
4. **MENTAL GROWTH** — white — "Build focus, discipline, and unshakable mental clarity."

Each card: `min-height: 140px`, `border-radius: 16px`, padding 20px, content bottom-aligned, accent line at bottom (left:15% / right:15% / height:2px).

### Files Modified
- `src/pages/Home.tsx` — wrap desktop timeline, add mobile cards block, add class to photo column
- `src/index.css` — add show/hide rules inside existing mobile media query
