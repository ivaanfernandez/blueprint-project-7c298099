

## Plan: Hack Bar Page — Cleanup + English Translation

All edits in `src/pages/HuellaRoja.tsx`.

### 1. Hero — remove eyebrow + subtitle, fix "glitch"
- Delete the `BLUEPRINT SYSTEM` eyebrow `<p>` (lines 234–236).
- Delete the subtitle `<p className="hr-hero-subtitle">…</p>` (lines 248–250).
- The "glitch" behind the title is caused by TWO stacked red `radial-gradient` overlays positioned on the left column (lines 231–232) — they create a hard-edged red blob that looks static. Replace them with a single, softer, animated ambient glow (slow opacity pulse via a new `@keyframes hrAmbient` so it visibly breathes instead of looking broken). Keep the section background `#0a0a0a`.
- Also update the related mobile CSS (`.hr-hero-subtitle` rule at line 196) — harmless to keep, but no longer needed; leave or remove. Will remove for cleanliness.

### 2. "FUEL YOUR SYSTEM" — center title, remove subtitle, remove card descriptions
- Add `textAlign: "center", width: "100%"` to the title `<p>` (line 283).
- Delete the subtitle `<p>` (lines 286–288).
- In `<FuelCard>` component (line 80): conditionally render the `desc` line only when `desc` is non-empty (so we can pass `desc=""` for both cards without removing the prop signature). Cleaner: keep the prop, render `{desc && <p>…</p>}`.
- Pass empty `desc=""` to both FuelCard instances (lines 290–301). Translate names/items as below.

### 3. "HACKBAR STATION" — center title, remove subtitle
- Add `textAlign: "center", width: "100%"` to title (line 313).
- Delete the subtitle `<p>` (lines 316–318).

### 4. Translate all Spanish → English
- `SUPLEMENTOS` → `SUPPLEMENTS`
- Items: `Planes semanales` → `Weekly Plans`; `Trazabilidad QR` → `QR Traceability`
- Station card 1: `BATIDOS PERSONALIZADOS` → `CUSTOM SHAKES`; desc → `Tailored to your training type or goal: energy, recovery, lean mass, or detox.`
- Station card 2: `CAFÉ FUNCIONAL` → `FUNCTIONAL COFFEE`; desc → `Infused with adaptogens and nootropics for sustained mental clarity without the crash.`
- Station card 3: `SNACKS BLUEPRINT` → `BLUEPRINT SNACKS`; desc → `No preservatives or refined sugar. Only functional ingredients that fuel your system.`
- HUELLAS dock tooltips (lines 22–24): `ENTRENAMIENTO` → `TRAINING`, `NUTRICIÓN` → `NUTRITION`, `RECUPERACIÓN` → `RECOVERY`.
- Hero placeholder label "Image placeholder" — already English, leave.
- Meet the Chef section + ChefCards + footer — already English, leave.

### Mobile
- Centered titles use `textAlign: center` which applies to both viewports. No extra mobile rules needed.

### Untouched
- "HACK BAR" title text/font/size, TextScramble animation
- Hero placeholder box (image area), corner brackets
- Card layouts, scan line animations, grid structures
- Meet the Chef section, footer layout
- BiometricScanRed intro
- Any other page

### Files Modified
- `src/pages/HuellaRoja.tsx`

