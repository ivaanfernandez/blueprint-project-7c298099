
## Plan: Replace mobile flowchart with glassmorphism cards

### File: `src/pages/Home.tsx`

Replace the mobile-only `about-features-mobile` block (currently a flowchart with connectors/arrows from the previous iteration) with 4 stacked glassmorphism cards.

### Changes

**1. Replace the contents of `<div className="about-features-mobile">`** with:
- Container: flex column, `gap: 12px`, `padding: 0 16px`
- 4 cards (Precision Training, Nutrition Engineering, Recovery Science, Mental Growth) — each:
  - `padding: 16px 18px`, `borderRadius: 16px`, flex row with `gap: 14px`, `alignItems: center`
  - Glass surface: `rgba(255,255,255,0.45)` bg, `1px solid rgba(255,255,255,0.6)` border, `backdropFilter: blur(12px)` (+ `WebkitBackdropFilter`), soft outer + inset highlight box-shadow
  - Icon tile: 40×40, `borderRadius: 12px`, nested glass surface, holds a 18×18 stroke SVG
  - SVG stroke colors: Blue `#1A6BFF`, Red `#FF3B3B`, Green `#22C55E`, Gray `#9CA3AF`
  - Label: Michroma 11px, uppercase, `letterSpacing: 0.02em`, color `#000`
- No connectors, no arrows, no descriptions

**2. Keep the wrapper class `about-features-mobile`** so the existing media query in `src/index.css` continues to handle mobile-only visibility (no need to switch to `flex md:hidden`).

### What stays untouched
- Desktop timeline `about-features-desktop` (lines 243–302)
- Section title `DESIGNED FOR THE HUMAN MACHINE` and subtitle (already centered on mobile via existing `.about-title-line` / `.about-subtext-line` rules in `src/index.css`)
- Gym photo, hero, all other sections, all other pages

### Files Modified
- `src/pages/Home.tsx` — swap mobile flowchart markup for 4 glassmorphism cards
