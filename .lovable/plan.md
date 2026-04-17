

## Plan: Replace mobile feature cards with flowchart layout

### File: `src/pages/Home.tsx`

Replace the content of the mobile `<div className="about-features-mobile">` block (lines 305–326) with a flowchart:

- **Container**: flex column, centered, `padding: 0 16px`, gap 0.
- **4 Cards** (name only, no description):
  - Full width, `padding: 14px 16px`, `border-radius: 14px`, white background (inherit page bg), `border: 0.5px solid rgba(0,0,0,0.06)`, plus per-card inset colored box-shadow (blue / red / green / gray).
  - Flex row, `gap: 14px`, items centered.
  - **Icon circle** (36×36, 50% radius) with tinted background and absolutely-positioned dashed ring (`inset: -3px`). Icons: SVG 16×16 with stroke colors `#1A6BFF`, `#FF3B3B`, `#22C55E`, `#9CA3AF` (paths from prompt).
  - **Name**: Michroma 11px, uppercase, letter-spacing 0.02em, color `#000`. Titles: "PRECISION TRAINING", "NUTRITION ENGINEERING", "RECOVERY SCIENCE", "MENTAL GROWTH". No description.
- **3 Connectors** between cards: flex column centered, height 20px.
  - 1px vertical gradient line (blue→red, red→green, green→gray).
  - Arrow tip at bottom using CSS triangle (`border-top` in the next card's color).

### What stays the same
- `about-features-mobile` container keeps `className` so the existing `@media (max-width: 767px)` rule in `src/index.css` continues to toggle visibility (desktop hidden / mobile shown).
- Section title `DESIGNED FOR THE HUMAN MACHINE` and subtitle already centered on mobile via existing CSS — untouched.
- Desktop timeline (`about-features-desktop`, lines 243–302) untouched.
- `about-photo-col` untouched (already hidden on mobile).

### Files Modified
- `src/pages/Home.tsx` — replace lines 305–326 with flowchart markup.

