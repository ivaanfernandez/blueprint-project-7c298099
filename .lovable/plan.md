

## Plan: Add fade transition between Hero and About

### File: `src/pages/Home.tsx`

**Change 1 — Add gradient fade overlay at bottom of Hero (inside the hero container, after the title around line 203, before closing `</div>` at line 206):**

Add a new absolutely-positioned div as the last child of the hero container:
```tsx
<div className="hero-fade-bottom" style={{
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  height: 140,
  background: "linear-gradient(to bottom, rgba(7,6,18,0) 0%, rgba(7,6,18,0.4) 40%, #FFFFFF 100%)",
  zIndex: 2,
  pointerEvents: "none",
}} />
```

The hero container already has `position: relative` and `overflow: hidden` (line 146), so no changes needed there.

**Change 2 — Remove the 1px transition bar (lines 208–212):**
That thin white line would sit right in the middle of the new gradient and look off. Delete the `{/* ── Transition Bar ── */}` div entirely.

**Change 3 — Mobile height override in the existing `<style>` block (inside the `@media (max-width: 767px)` at lines 82–115):**
```css
.hero-fade-bottom { height: 100px !important; }
```

### What stays untouched
- Hero video, dark overlay, title, animations
- About section content and layout
- All other sections and pages

### Files Modified
- `src/pages/Home.tsx` — add fade overlay, remove transition bar, add mobile height rule

