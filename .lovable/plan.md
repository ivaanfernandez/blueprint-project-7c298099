

## Plan: Force vertical centering on mobile hero (MainLanding)

The mobile wrapper at lines 343–461 already has the two-group structure but text still appears stuck near the top on the 390px viewport. Root cause: the inner Group 1 div is missing `min-height: 0`, which (in a flex column parent) prevents proper shrinking/centering when the children's natural height plus Group 2 exceeds available space. Apply the user's exact fix.

### File: `src/pages/MainLanding.tsx`

**Edit 1 — Outer mobile wrapper (lines 343–351)**
Add explicit centering properties to the `flex md:hidden` div. Add `justifyContent: "center"`, `textAlign: "center"`. Keep existing `minHeight: 100vh`, `flexDirection: column`, `alignItems: center`, `padding: "80px 6% 24px"`.

**Edit 2 — Inner Group 1 wrapper (lines 353–361)**
Add `minHeight: 0` to the text group so it can shrink/grow correctly inside the flex column parent. Keep all other props (`flex: 1`, `display: flex`, `flexDirection: column`, `alignItems: center`, `justifyContent: center`, `textAlign: center`, `width: 100%`).

**Edit 3 — No changes to Group 2** (button + chevron) — already pinned correctly with `flexShrink: 0`.

### Untouched
- Desktop wrapper (`hidden md:flex`, lines before 342)
- All text content, WordRotate, FadeText, ShinyButton, ChevronDown
- Section background, gradients, video, dock
- `.hero-section` CSS rules (height: 100vh on mobile is needed so the wrapper's `100vh` matches the section)
- All other pages and sections

### Files Modified
- `src/pages/MainLanding.tsx` — two small style-object additions

