
## Plan: Center About title/subtitle on mobile + Remove "SCROLL TO EXPLORE"

### File: `src/pages/Home.tsx`

**Change 1 — Add class to the h2 title (line 264):**
Add `className="about-title-line"` to the `<h2>` so it can be targeted by mobile CSS. Inline styles stay unchanged.

**Change 2 — Delete the "SCROLL TO EXPLORE" element (lines 209-240):**
Remove the entire `<motion.div>` block (the bottom-left scroll indicator: arrow circle + "SCROLL TO EXPLORE" label). Removed for both desktop and mobile, as the user prompt says "remove the entire element (arrow + text)".

Note: `scrollToAbout` may become unused after removal — I'll check and remove it only if no other references exist.

### File: `src/index.css`

Inside the existing `@media (max-width: 767px)` block, add:
```css
.about-title-line { text-align: center !important; }
.about-subtext-line { text-align: center !important; }
```
(The `.about-section-new` already switches to `flex-direction: column` on mobile, so centering text-align is sufficient.)

### Files Modified
- `src/pages/Home.tsx` — add class to h2, delete scroll-to-explore motion.div
- `src/index.css` — add mobile text-align rules
