

## Plan: Center WordRotate phrases on mobile hero (MainLanding)

### Root cause
The mobile hero (lines 343–464) renders `WordRotate` inside a plain `<span>` (line 377) with no class to hook into. Internally, `WordRotate` measures the longest word's width and positions each word with `position: absolute; left: 0; display: flex; justify-content: flex-start` (default). Result: shorter phrases like "IT'S A SYSTEM" stick to the left of the wider "THIS IS BLUEPRINT" measurement box.

The existing override `.hero-headline-blue .word-rotate-inner { justify-content: center !important; ... }` only applies to the desktop layout (which uses that class). The mobile span has no such class, so nothing overrides the inner positioning.

### Fix
Add a class to the mobile WordRotate wrapper span and add a matching mobile CSS rule that centers the inner rotating element — mirroring what already works for desktop.

### File: `src/pages/MainLanding.tsx`

**Edit 1 — Mobile WordRotate wrapper span (line 377)**
Add `className="mobile-wordrotate"` to the blue `<span>` wrapping `<WordRotate>`. Keep all inline styles unchanged.

**Edit 2 — Mobile CSS block (inside `@media (max-width: 767px)`, around lines 563–667)**
Append a new rule:

```css
.mobile-wordrotate {
  display: block !important;
  width: 100% !important;
  text-align: center !important;
}
.mobile-wordrotate .word-rotate-wrapper {
  width: 100% !important;
  min-width: 0 !important;
  max-width: 100% !important;
  height: auto !important;
  min-height: 1.2em !important;
  display: block !important;
  text-align: center !important;
}
.mobile-wordrotate .word-rotate-inner {
  position: relative !important;
  left: auto !important;
  right: auto !important;
  transform: none !important;
  display: flex !important;
  justify-content: center !important;
  width: 100% !important;
  text-align: center !important;
  white-space: normal !important;
}
```

This neutralizes the absolute positioning and measured-width container, then centers each phrase across full container width — exactly the proven pattern used for `.hero-headline-blue` on desktop.

### Untouched
- Desktop hero (`hidden md:flex`) and its `.hero-headline-blue` rules
- WordRotate component itself (no edits)
- Mobile hero structure, button, chevron, subtitles, "THIS ISN'T A GYM" line (already centered)
- All other pages (HuellaAzul/Roja/Verde) and sections

### Files Modified
- `src/pages/MainLanding.tsx` — add one className + one CSS block

