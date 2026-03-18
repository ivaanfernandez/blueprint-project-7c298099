

## Plan: Remove circles/borders from overlapping fingerprint icons

### File: `src/components/PricingSection.tsx`

Remove `border`, `borderRadius` from each fingerprint wrapper div, keeping only `zIndex` and `marginLeft` for overlap positioning.

**Lines ~119-130** — replace the three wrapper divs:

```tsx
// FROM:
<div style={{ zIndex: 3, border: "2px solid rgba(0,0,0,0.6)", borderRadius: "50%" }}>
  <FingerprintSVG color="#1A6BFF" size={44} />
</div>
<div style={{ zIndex: 2, marginLeft: -14, border: "2px solid rgba(0,0,0,0.6)", borderRadius: "50%" }}>
  <FingerprintSVG color="#22C55E" size={44} />
</div>
<div style={{ zIndex: 1, marginLeft: -14, border: "2px solid rgba(0,0,0,0.6)", borderRadius: "50%" }}>
  <FingerprintSVG color="#FF3B3B" size={44} />
</div>

// TO:
<div style={{ zIndex: 3 }}>
  <FingerprintSVG color="#1A6BFF" size={44} />
</div>
<div style={{ zIndex: 2, marginLeft: -14 }}>
  <FingerprintSVG color="#22C55E" size={44} />
</div>
<div style={{ zIndex: 1, marginLeft: -14 }}>
  <FingerprintSVG color="#FF3B3B" size={44} />
</div>
```

No other changes.

