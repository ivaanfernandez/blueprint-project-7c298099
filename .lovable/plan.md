

## Plan: Animated Conic-Gradient Border Around HackBar Station List

Single-file edit in `src/pages/HuellaRoja.tsx`.

### What changes
Wrap the existing `maxWidth: 760` list container (line 580) in a new outer wrapper that paints 3 rotating red conic-gradient layers behind a solid dark inner box. The list items, hover states, expand/collapse, corner brackets, and copy stay 100% untouched.

### Structure (replaces the single `<div>` at line 580)

```tsx
<div className="hr-station-shell" style={{
  position: "relative",
  maxWidth: 760,
  margin: "0 auto",
  padding: 1,
  borderRadius: 14,
  overflow: "hidden",
  boxShadow: "0 0 30px rgba(255, 59, 59, 0.06)",
}}>
  {/* Layer 1 — primary red glow, 6s */}
  <div style={{
    position: "absolute", inset: -40, zIndex: 0,
    background: "conic-gradient(from 0deg, transparent 0%, #FF3B3B 15%, transparent 35%, transparent 65%, #FF3B3B 85%, transparent 100%)",
    animation: "stationBorderSpin 6s linear infinite",
  }} />
  {/* Layer 2 — soft blurred reverse, 9s */}
  <div style={{
    position: "absolute", inset: -40, zIndex: 0,
    background: "conic-gradient(from 180deg, transparent, rgba(255,59,59,0.5), transparent 50%, rgba(255,59,59,0.4), transparent)",
    filter: "blur(14px)", opacity: 0.7,
    animation: "stationBorderSpin 9s linear infinite reverse",
  }} />
  {/* Layer 3 — sharp shimmer accent, 4s */}
  <div style={{
    position: "absolute", inset: -40, zIndex: 0,
    background: "conic-gradient(from 90deg, transparent 0%, transparent 80%, #FF6B6B 90%, transparent 100%)",
    animation: "stationBorderSpin 4s linear infinite",
  }} />
  {/* Inner dark container — sits on top, holds the existing list items */}
  <div style={{
    position: "relative", zIndex: 1,
    borderRadius: 13,
    overflow: "hidden",
    backgroundColor: "#0a0a0a",
  }}>
    {stationItems.map(...)} {/* unchanged */}
  </div>
</div>
```

### Keyframe injection
Add a small `<style>` tag inside the section (next to other inline keyframes already in the file) with:
```css
@keyframes stationBorderSpin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
```
Each rotating layer needs `transform-origin: center` (default for absolute-inset square), so a single keyframe drives all three.

### Mobile (<768px)
The wrapper already uses `maxWidth: 760` with `margin: 0 auto`, which collapses naturally to full width inside the `padding: 0 7%` parent. No extra mobile rule needed — visual effect is identical, just narrower.

### Untouched
- `stationItems` array (Custom Shakes / Functional Coffee / Blueprint Snacks)
- All row markup: hover/click handlers, `activeStation` state, corner brackets, expand animation, icons, fonts
- HACKBAR STATION title, surrounding section, every other section and page
- No blue colors anywhere — all glow tones use `#FF3B3B` / `#FF6B6B` / `rgba(255,59,59,*)`

### Files modified
- `src/pages/HuellaRoja.tsx` (only)

