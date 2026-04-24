

## Huella Verde — Hero Image Swap (Desktop + Mobile)

Replace the current single hero background image (`@/assets/reset-hero-bg.jpg`) on `/huella-verde` with two new uploaded images — one tuned for desktop, one for mobile vertical viewport — using a responsive `<picture>` element. Nothing else changes.

### What changes

**Only one file:** `src/pages/HuellaVerde.tsx`

**Hero section (lines 152–164):**
- Replace the single `<img src={resetHeroBg}>` with a `<picture>` block:
  - `<source media="(max-width: 767px)" srcSet={heroResetMobile} />`
  - `<img src={heroResetDesktop} ... loading="eager" fetchPriority="high" />`
- Keep all current inline styles on the `<img>` (absolute inset 0, objectFit cover, opacity 0.85, zIndex 0, pointerEvents none)
- Wrap the `<picture>` itself with the same `position: absolute; inset: 0` so layout is identical
- The radial black fade overlay, ambient green glow, bottom green gradient line, and `GradualBlur` stay byte-identical

**Imports (top of file):**
- Remove: `import resetHeroBg from "@/assets/reset-hero-bg.jpg";`
- Add: `import heroResetDesktop from "@/assets/reset-hero-desktop.jpg";`
- Add: `import heroResetMobile from "@/assets/reset-hero-mobile.jpg";`

### Asset work (in default mode)

Copy the two uploaded images into the project as compressed JPGs (already pre-compressed per user):

- `user-uploads://94D4ADBD-D938-4280-B244-1D86B00A955A.jpg` → `src/assets/reset-hero-desktop.jpg` (vertical, full grid + figures — works as wide hero with center crop, also used as desktop default)
- `user-uploads://adam_and_god.jpg` → `src/assets/reset-hero-mobile.jpg` (tighter horizontal Adam-and-God-style figures crop, better fit for 390 px portrait viewport)

Note on mapping: the vertical-format image is the more cinematic, atmospheric "scene" → desktop. The square cropped figures image is tighter and reads better at narrow widths → mobile. Confirm this mapping in the question below if you'd prefer it inverted.

### What stays untouched

- "RESET" headline, subtext, font sizes, Michroma typography
- Black radial fade overlay (`rgba(0,0,0,0.75) → transparent`)
- Ambient green glow (`rgba(34,197,94,0.06)`)
- Bottom green gradient hairline
- `GradualBlur` cinematic fade at hero bottom
- Recovery Room bento, Premium Services accordion, HUD footer, green animated background, floating dock
- Old asset file `src/assets/reset-hero-bg.jpg` stays on disk (orphaned, safe — can be removed later if desired)
- Every other page (`Home`, `MainLanding`, `HuellaAzul`, `HuellaRoja`)
- Green fingerprint biometric loader on this page

### Technical notes

- `<picture>` + `<source media>` is the native, zero-JS way to serve different images per viewport — no `useState`/`useEffect`/resize listener needed, no flash of wrong image, no re-render on rotate.
- `loading="eager"` + `fetchPriority="high"` because hero is above-the-fold.
- `objectPosition: center` keeps both crops centered; if either image needs a vertical bias (e.g. `center 30%`), we can tune after first preview.
- Breakpoint `767px` matches the existing `@media (max-width: 767px)` rule already in the page's style block (line 134), so image swap and text padding swap happen at the same threshold.

### Out of scope (will not touch)

- No image processing/compression — files used as uploaded
- No lazy loading on the hero `<img>`
- No copy, color, gradient, layout, typography, or component change
- No edits to any other route or file

