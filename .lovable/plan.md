

## Plan: Swap Fingerprint Colors + Hover Large Fingerprint

Single file: `src/pages/Home.tsx`

### Change 1: Swap colors on Hack Bar and Reset (line 411-412)

Swap the `color` and `rgba` values between Hack Bar and Reset:

- **Hack Bar**: `color: "#FF3B3B"`, `rgba: "255,59,59"` (was green)
- **Reset**: `color: "#22C55E"`, `rgba: "34,197,94"` (was red)

All color references (corners, overlay, glow, accent line, fingerprint) already use `item.color` and `item.rgba` dynamically, so changing the data is sufficient.

### Change 2: Add hover large fingerprint (after line 473, before glassmorphism panel)

Insert a new div inside each card:

```tsx
{/* Hover center fingerprint */}
<div className="pillar-card-hover-fp" style={{
  position: "absolute", top: "50%", left: "50%",
  transform: "translate(-50%, -50%) scale(0.85)",
  zIndex: 3, opacity: 0,
  transition: "opacity 0.4s ease, transform 0.4s ease",
  pointerEvents: "none",
  filter: "drop-shadow(0 0 30px currentColor)",
  color: item.color,
}}>
  <FingerprintSVG color={item.color} size={140} />
</div>
```

### Change 3: Add hover CSS rule to `<style>` block

Add to existing styles:

```css
.pillar-card:hover .pillar-card-hover-fp {
  opacity: 0.15 !important;
  transform: translate(-50%, -50%) scale(1) !important;
}
```

### No other changes
- Card layout, images, video, glassmorphism panels, section title all untouched
- No new dependencies

