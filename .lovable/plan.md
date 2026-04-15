

## Plan: Create Full Reset Page (HuellaVerde)

### Summary
Replace the HuellaVerde placeholder with a complete green-themed page featuring a green BiometricScan, cinematic centered hero, 3+2 recovery cards grid, numbered premium services list, and footer. Also create the green BiometricScan variant and update App.tsx to pass `showDock`.

### File 1: `src/components/BiometricScanGreen.tsx` (NEW)

Clone `BiometricScanRed.tsx` with color replacements:
- `#FF3B3B` → `#22C55E`
- `#5C1111` → `#0A3D1F`
- `rgba(255,59,59,...)` → `rgba(34,197,94,...)`
- `#BF4A4A` → `#4ABF6A`
- Prefix keyframes with `bsg-` instead of `bsr-`
- Wordmark: "ACCESSING RESET"

### File 2: `src/pages/HuellaVerde.tsx` (REWRITE)

Follow exact same architectural pattern as HuellaRoja (scan phase, Dock, motion wrapper, inline styles + CSS keyframes) but with these differences:

**Colors:** All accents use `#22C55E` / `rgba(34,197,94,...)` instead of red. CSS class prefix `hv-` instead of `hr-`.

**Section A — Hero (CINEMATIC, not split):**
- Vertically stacked centered layout (different from HuellaRoja's 55/45 split)
- Centered text block: Orbitron eyebrow "BLUEPRINT SYSTEM", TextScramble title "RESET" at `clamp(40px, 6vw, 72px)`, Inter subtitle centered, max-width 520px
- Below text: panoramic photo strip (35vh, min 250px, max 400px) with top/bottom/left/right fade overlays
- Green accent line at bottom of hero (1px)
- Ambient glow: `radial-gradient(ellipse at 50% 30%, rgba(34,197,94,0.06)...)`

**Section B — "RECOVERY ROOM" (3+2 grid):**
- Top row: 3-column grid (3 cards, min-height 320px)
- Bottom row: 2-column grid (2 cards, min-height 220px)
- Cards: infrared sauna, ice bath, compression, mobility/breathing, massages
- Each card: placeholder bg, gradient overlay, green accent line at bottom, scan line animation (staggered delays)
- Hover: translateY(-4px) + green box-shadow

**Section C — "SERVICIOS PREMIUM" (numbered list):**
- 4 vertical items with Orbitron numbers in green, green accent line, Michroma name, Inter description
- Items: Recovery Protocols, Reset Pass, Corporate Recovery, Reset Retreats
- Border-bottom separators (last item none)

**Section D — Footer:**
- Green fingerprint, "Reset — Blueprint Project", copyright
- Border-top with green tint

**Mobile (<768px):**
- Hero: smaller title `clamp(32px, 10vw, 48px)`, photo strip 200px
- Recovery Room: both grids become single column, cards min-height 240px
- Servicios: padding adjusted, accent line full width
- Footer: padding 32px 6%

### File 3: `src/App.tsx` (MINOR)

Update line 43 to pass `showDock`:
```tsx
<Route path="/huella-verde" element={<HuellaVerde showDock={showDock} />} />
```

### Files Modified
- `src/components/BiometricScanGreen.tsx` — NEW
- `src/pages/HuellaVerde.tsx` — REWRITE
- `src/App.tsx` — pass showDock prop

