
## Plan: Home About — descriptions, intensified glows, futuristic frame

All three changes target only `src/pages/Home.tsx` (mobile features map at lines ~390–485 and edge-to-edge image at lines ~488–519). Keyframe additions go to `src/index.css`. No other files touched.

### 1. Mobile feature descriptions
Inside the mobile features array (lines ~390–420), add a `desc` field to each of the 4 entries:
- `PROFESSIONAL TRAINING` → "Data-driven methodology built to forge strength, endurance, and resilience."
- `NUTRITION ENGINEERING` → "Every meal is a signal. Optimize input, transform output."
- `RECOVERY SCIENCE` → "Strategic rest, optimized sleep, and complete restoration protocols."
- `MENTAL GROWTH` → "Build focus, discipline, and unshakable mental clarity."

Restructure the card inner (line ~447) so the text region (currently a single `<span>` with the title) becomes a flex column `<div>` containing:
- The existing title `<span>` (Michroma, 11px, uppercase) — unchanged.
- A new `<p>` description: `font-family: 'Inter'`, `font-size: 13px`, `font-weight: 400`, `line-height: 1.5`, `color: rgba(0,0,0,0.6)`, `margin: 4px 0 0 0`.

The icon stays at left (flex-row of icon + text-column with `gap: 14`, `alignItems: flex-start` so icon aligns with the title line).

### 2. Intensified cyan glows on the 4 mobile feature cards
Replace the two existing white/sky `conic-gradient` divs (lines ~430–445) with a single rotating cyan/white conic ring per card and update the static styling:

- Outer wrapper: keep `padding: 1`, `borderRadius: 17`, `position: relative`, `overflow: hidden`, `isolation: isolate`. Add `border: 1px solid rgba(125,249,255,0.35)` and `boxShadow` stack:
  - `0 0 0 1px rgba(125,249,255,0.15), 0 0 20px rgba(125,249,255,0.25), 0 0 40px rgba(125,249,255,0.15), inset 0 0 20px rgba(125,249,255,0.05)`.
- Rotating ring `<div>` (`inset: -2px`): `background: conic-gradient(from 0deg, transparent 0%, rgba(125,249,255,0.8) 25%, rgba(255,255,255,1) 50%, rgba(125,249,255,0.8) 75%, transparent 100%)`, `borderRadius: 18`, `animation: glowSpin <speed> linear infinite`, `zIndex: 0`. The white card inner already covers the center, leaving only a bright rotating perimeter.
- Per-card durations via inline animation override (passed in the array): 4s / 5s / 4.5s / 5.5s (Professional / Nutrition / Recovery / Mental).
- Reuse the existing `@keyframes glowSpin` already injected at line ~385 — no CSS file edit needed for the spin.

Card inner background stays solid white `#FFFFFF` (replace the current `rgba(255,255,255,0.82)`/backdropFilter so the cyan ring reads cleanly against pure white).

### 3. Futuristic frame on the mobile edge-to-edge image
Rebuild the inner image container (lines ~499–518) as a `position: relative` block keeping `aspectRatio: 16/9`, `borderRadius: 16`, `overflow: hidden`. Inside it:

- The existing `<img>` (unchanged src `aboutImages[0]`, unchanged styles).
- Vertical scan line: 100% width × 2px tall, absolutely positioned `left: 0`, `top: 0`, `background: linear-gradient(90deg, transparent, rgba(125,249,255,0.9), transparent)`, `boxShadow: 0 0 12px rgba(125,249,255,0.7)`, `animation: scan-vertical 4s linear infinite`, `pointerEvents: none`.
- 4 corner brackets, each a 24×24 absolute div with `borderColor: rgba(125,249,255,0.85)`, `borderWidth: 2px`, offset 12px from the matching edges, with the appropriate `borderTop/Left/Right/Bottom` enabled per corner, `pointerEvents: none`.

Add to `src/index.css` (positional keyframe — variant works inside `overflow: hidden`):
```css
@keyframes scan-vertical {
  0%   { top: 0;             opacity: 0; }
  5%   {                     opacity: 1; }
  95%  {                     opacity: 1; }
  100% { top: calc(100% - 2px); opacity: 0; }
}
```

### Untouched
- Desktop features array (line ~300) and rendering — keeps `Precision Training` casing it already has there only if not flagged; per prompt, the change is in the mobile/PROFESSIONAL block, which is already correct.
- About slideshow column, "DESIGNED FOR THE HUMAN MACHINE" title, outer About card wrapper, "Choose Your Fingerprint" section, dock, footer.
- All other pages and `scrollAnimations.ts`.

### Files modified
- `src/pages/Home.tsx`
- `src/index.css` (single new keyframe)
