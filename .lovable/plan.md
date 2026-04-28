## Huella Verde — 3 changes

Scope: only `src/pages/HuellaVerde.tsx` and `src/components/PremiumServiceAccordion.tsx` (used exclusively by Huella Verde). Home, Huella Azul and Huella Roja are not touched.

### 1. Recovery grid: 4 tiles → 6 tiles with responsive layout

In `src/pages/HuellaVerde.tsx`:

- Update the `RECOVERY_CARDS` array to 6 entries, in fixed order:
  1. INFRARED SAUNA — keep `infraredSaunaImg` (responsive variants preserved)
  2. ICE BATH THERAPY — keep current Unsplash image
  3. MOBILITY & BREATHING — keep current Unsplash image
  4. ADJUSTMENTS & MUSCLE REHAB — reuse the current Massages Unsplash image, only update `name` and `alt`
  5. HYPERBARIC CHAMBER — `/hyperbaric-chamber.jpg` (image not yet uploaded; will 404 until user uploads it)
  6. COMPRESSION BOOTS — `/compression-boots.jpg` (image not yet uploaded)
- Extend `scanDelays` to 6 staggered values.
- Replace the existing `recovery-grid` markup (currently a 2×2 inline grid) with the new `recovery-arsenal-grid` structure. Tile 1 (Infrared Sauna) gets an extra `recovery-tile-hero` class so mobile can promote it to a full-width hero row.
- Preserve existing scroll-stagger / blur-reveal motion wrappers and the scan-line decorative element.

### 2. CSS for the 6-tile grid

In `src/pages/HuellaVerde.tsx` (inside the existing inline `<style>` block, where `.recovery-grid` already lives) or appended to `src/index.css` — using the inline block keeps it scoped with the rest of Huella Verde styles.

Add the rules per the spec:
- Base: `.recovery-arsenal-grid` (12px gap, max 1400px), `.recovery-tile` (1px green border, glow, 4/3 aspect, hover lift on desktop), `.recovery-tile img` (cover + zoom on hover), gradient overlay via `::before`, `.recovery-tile-label` (Michroma, white, bottom-left).
- Desktop (≥1024px): `grid-template-columns: 1fr 1fr 1fr`, 2 rows, hero tile behaves like the rest.
- Tablet (768–1023px): 2 columns × 3 rows.
- Mobile (<768px): hero tile spans both columns at the top (200px tall), the other 5 tiles flow as 1:1 squares in 2 columns; smaller label font on non-hero tiles.

### 3. Global rename: "Massages & Bodywork" → "Adjustments & Muscle Rehab"

A repo-wide grep already confirms the only occurrences are inside the recovery grid array (and a CSS comment line `Card 4 — Massages: bottom-right square` in `src/index.css`, which becomes obsolete). The original Unsplash URL is reused under the new label. No file renames are needed.

I will also update the obsolete CSS comment in `src/index.css` so the codebase stays clean (cosmetic only, no rule changes).

### 4. Premium Services card 03

In `src/components/PremiumServiceAccordion.tsx`, update the third entry of `SERVICES`:

- `title`: `"CORPORATE RECOVERY PROGRAMS"` → `"RECOVERY PROGRAMS"`
- `description`: → `"Structured recovery protocols built to optimize how the body restores, adapts, and performs. Each program combines targeted modalities to deliver measurable results in performance, energy, and overall wellbeing."`
- `stats` (keep the existing icons in the same order):
  - `RECOVERY TIME` / `-47%` (icon `◈`)
  - `SLEEP QUALITY` / `+62%` (icon `↑`)
  - `ENERGY INCREASE` / `+84%` (icon `⌘`)
  - `STRESS REDUCTION` / `-71%` (icon `✦`)

Cards 01, 02, 04, the `number` field, all styling, hover/expand behavior, and accordion logic remain untouched.

### Pending user actions after deploy

- Upload `/public/hyperbaric-chamber.jpg`
- Upload `/public/compression-boots.jpg`
- (Optional) replace tile 4's Unsplash image with a real Adjustments & Muscle Rehab photo at `/public/adjustments-muscle-rehab.jpg` and swap the URL.

### Files changed

- `src/pages/HuellaVerde.tsx` — RECOVERY_CARDS array, scanDelays, grid JSX, inline CSS additions
- `src/components/PremiumServiceAccordion.tsx` — SERVICES[2] title/description/stats
- `src/index.css` — update obsolete `Card 4 — Massages` comment
