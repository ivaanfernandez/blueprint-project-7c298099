

## Plan: Enlarge Chef Image + Remove 3D Carousel Section

Single-file edit in `src/pages/HuellaRoja.tsx`.

### Change 1 — Enlarge chef image so the full image is visible

Update the chef image container (lines 732-733):

- Outer wrapper: change `flex: "0 0 45%"` block → use `minHeight: 450`, add `aspectRatio: "16 / 10"`, `height: "auto"`.
- Inner wrapper: drop fixed `minHeight: 350`, let it fill 100%.
- `<img>` (line 734): change `objectPosition: "center"` → `"center top"` so the head/face stays anchored.

Mobile override in the existing `@media (max-width: 767px)` block (lines 446-447):
```css
.hr-chef-right { flex: none !important; width: 100% !important; min-height: 300px !important; height: auto !important; aspect-ratio: 4 / 3 !important; }
.hr-chef-right > div { min-height: 300px !important; }
```

### Change 2 — Delete the 3 cards section (3D carousel + mobile auto-rotate)

- Remove `<Carousel3D />` invocation at line 746 and the `{/* 3D Carousel */}` comment at 745.
- Delete the entire `Carousel3D` component definition (lines 174 → its closing brace, ~line 367) along with the `CAROUSEL_CARDS` constant (lines 168-172).
- Delete now-orphan CSS rules in the mobile media query: `.carousel-3d-container`, `.carousel-3d-card`, `.carousel-3d-card.is-active`, `.carousel-3d-card.is-left`, `.carousel-3d-card.is-right`, `.carousel-3d-card .carousel-3d-title`, `.carousel-3d-card.is-active .carousel-3d-title`, `.carousel-3d-card .carousel-3d-desc` (lines 451-458).
- The `useEffect`, `useRef`, `activeCard`, and `autoRotateCard` state live entirely inside `Carousel3D`, so removing the component cleans them up automatically. No usages elsewhere.

### Untouched
- "MEET THE CHEF" title, subtitle, accent line, corner brackets on the chef image
- Hero, Fuel Your System, HackBar Station, Lab Footer (desktop + mobile)
- Dock and all other pages

### Files Modified
- `src/pages/HuellaRoja.tsx`

