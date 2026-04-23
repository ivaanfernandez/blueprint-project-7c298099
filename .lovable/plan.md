## Huella Verde HUD Laboratory Footer

Replace the minimal Huella Verde footer (fingerprint + 2 text lines) with a cinematic wellness-lab HUD: rotating DNA helix, fingerprint + animated ECG line, and an animated 94% Recovery Index gauge — all over a topographic grid with floating molecular structures. The existing `← HOME` button stays untouched directly below.

### Current state

`src/pages/HuellaVerde.tsx` lines 247–253:
```text
<motion.footer> FingerprintSVG + "Reset — Blueprint Project" + "© 2025 Blueprint Project" </motion.footer>
<BackToHomeButton />
```

### Target

```text
┌──────────────── · SYSTEM LAB · BIOMETRIC OUTPUT ────────────────┐
│  ┌─ DNA ─┐    ┌── FINGERPRINT + ECG ──┐    ┌── GAUGE 94% ──┐  │
│  │ ╲╱╲╱  │    │   ▒▒▒▒▒    ∿∿∿∿∿     │    │     ◠ 94%     │  │
│  │ GENETIC│   │   RESET SYSTEM ●ACTIVE│    │ RECOVERY OPTIMAL│ │
│  └───────┘    └───────────────────────┘    └───────────────┘  │
│        Reset — Blueprint Project · © 2026 Blueprint Project    │
└─────────────── (topographic grid + floating molecules) ────────┘
        [ ← HOME ]   ← existing BackToHomeButton, unchanged
```

- Desktop ≥1024px: 3 panels in a row (1fr / 1.4fr / 1fr), max-width 1000px.
- Tablet 768–1023px: 3 compact columns.
- Mobile <768px: panels stacked.

### Plan

**1. Create `src/components/HuellaVerdeHUDFooter.tsx`**

- Animated `gaugeValue` from 0 → 94 over 2s (ease-out cubic) via `requestAnimationFrame` in `useEffect`.
- Inline SVG for: topographic grid layer, 3 background molecule SVGs (serotonin-like hexagon + chain, dopamine-like, small extra hexagon), DNA helix (8 rungs, sine-wave x-positions, green/cyan dot pairs connected by lines), fingerprint (concentric ellipses + central swirl), ECG zig-zag path with stroke-dash animation, and a 270° gauge arc with progress arc + needle rotated by `gaugeAngle = -90 + (gaugeValue/100)*270`.
- Each panel wrapped with 4 corner brackets (`.corner-tl/tr/bl/br`) and labels: "GENETIC BLUEPRINT / 23 CHR · ACTIVE", "RESET SYSTEM / ●ACTIVE", "RECOVERY INDEX / OPTIMAL".
- Top label "· SYSTEM LAB · BIOMETRIC OUTPUT" with pulsing dot.
- Bottom centered text: `Reset — Blueprint Project · © 2026 Blueprint Project`.

**2. Append CSS to `src/index.css`** — full `.hud-footer / .hud-topo-grid / .hud-molecules / .hud-label-top / .hud-panels / .hud-panel / .corner-* / .dna-* / .fingerprint-svg / .ecg-* / .gauge-* / .hud-panel-label / .hud-panel-value / .hud-active / .hud-footer-text` rules with keyframes `dot-pulse`, `dna-spin`, `ecg-pulse`, `molecule-rotate`. Includes mobile (<768px stacked) and tablet (768–1023px compact) breakpoints, topographic radial mask, glassmorphism panels, and green glow drop-shadows.

**3. Wire into `src/pages/HuellaVerde.tsx`**

- Add `import HuellaVerdeHUDFooter from "@/components/HuellaVerdeHUDFooter";`.
- Replace lines 247–252 (`<motion.footer>...</motion.footer>`) with `<HuellaVerdeHUDFooter />`.
- Keep `<BackToHomeButton />` on line 253 exactly as-is, immediately after.
- Leave the inline `FingerprintSVG` component definition in place (still used by the dock).

### Constraints (from spec)

- Colors locked: green `#22C55E`, accent cyan `#7DF9FF`, white needle.
- Gauge value locked at 94%.
- Animation durations locked: DNA 5s, ECG 2.5s, gauge 2s, dot-pulse 1.5–2s, molecules 15–28s.
- Copyright year: **2026** (not 2025).
- Pure CSS + SVG + `requestAnimationFrame`. No Framer Motion in this component, no audio, no extra libraries.

### Out of scope

- Recovery Room bento (Prompt 1/3 ✅).
- Premium Services accordion (Prompt 2/3 ✅).
- Hero RESET, animated green background, floating dock, `BackToHomeButton`.
- Other pages (`Home`, `MainLanding`, `HuellaRoja`).

### Files modified

- **New**: `src/components/HuellaVerdeHUDFooter.tsx`
- **Edit**: `src/index.css` — append HUD footer CSS block
- **Edit**: `src/pages/HuellaVerde.tsx` — add import + replace footer block with `<HuellaVerdeHUDFooter />`
