

## Plan: 3 Major Home Page Changes

### Change 1: Delete Protocols Section
Remove lines 401-464 (divider + protocols section + divider after it).

### Change 2: Replace Feature Section with Scroll-Linked Accordion
Remove lines 524-575 (divider + feature section). Replace with a new section containing:

- **Left column (sticky)**: "LIMITLESS POTENTIAL WITH BLUEPRINT" title + 3-item accordion (Blueprint Lab / Hack Bar / Reset) with color-coded dots, expandable descriptions, and "LEARN MORE →" links routing to `/huella-azul`, `/huella-verde`, `/huella-roja`.
- **Right column (scrollable)**: 3 full-viewport image panels using slider-1/2/3.jpg with color-coded badges.
- **Scroll behavior**: `IntersectionObserver` (threshold 0.5) watches each image panel and updates `activeIndex` to control which accordion item is expanded. Clicking an accordion item scrolls to the corresponding panel.
- **Mobile (<768px)**: No sticky, fully expanded, stacked vertically. Add media query to existing `<style>` block.

New state: `activeIndex` (replaces `activeTab`). New ref: `panelRefs`. Remove `FEATURE_TABS` constant and `activeTab` state.

### Change 3: Replace CTA/Footer Section
Remove lines 607-670 (entire CTA section). Replace with a centered dark footer containing:

- Dot pattern background + animated SVG pulse beams converging to center
- "ENTER THE BLUEPRINT" title (Michroma, clamp 24px-40px)
- Subtitle + "JOIN NOW" pill button with 3 animated pulse rings and radial glow
- Instagram icon link
- Footer bar: brand name left, 3 links center, copyright right
- New keyframes (`pulseRing`, `pulseGlow`) added to `<style>` block
- Mobile: stacked footer bar, smaller title

### Technical Details

**File modified**: `src/pages/Home.tsx` only

**Removed**: `PROTOCOLS` constant, `FEATURE_TABS` constant, `activeTab` state, protocol card CSS classes, feature tab CSS classes, CTA CSS classes.

**Added**: `useEffect` import, `activeIndex` state, `panelRefs` ref, `IntersectionObserver` in `useEffect`, `scrollToPanel` function, accordion section JSX, footer section JSX, new keyframes CSS, new mobile media query rules for accordion section and footer.

**Final section order**: Hero → About → Divider → Programs → Divider → Accordion Scroll → Divider → Gallery → Footer (dark)

