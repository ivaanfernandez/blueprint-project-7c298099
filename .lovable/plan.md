

## Plan: Heavy Overlap Fingerprint Icons in Blueprint+ and Elite Cards

### File: `src/components/PricingSection.tsx`

**Single change** — lines 120-125, replace the triple fingerprint `div`:

```tsx
// FROM:
<div className="flex justify-center items-center gap-3 mb-4">
  <FingerprintSVG color="#1A6BFF" size={40} />
  <FingerprintSVG color="#22C55E" size={40} />
  <FingerprintSVG color="#FF3B3B" size={40} />
</div>

// TO:
<div className="flex justify-center items-center mb-4" style={{ gap: 0 }}>
  <div style={{ zIndex: 3, border: "2px solid rgba(0,0,0,0.6)", borderRadius: "50%" }}>
    <FingerprintSVG color="#1A6BFF" size={44} />
  </div>
  <div style={{ zIndex: 2, marginLeft: -14, border: "2px solid rgba(0,0,0,0.6)", borderRadius: "50%" }}>
    <FingerprintSVG color="#22C55E" size={44} />
  </div>
  <div style={{ zIndex: 1, marginLeft: -14, border: "2px solid rgba(0,0,0,0.6)", borderRadius: "50%" }}>
    <FingerprintSVG color="#FF3B3B" size={44} />
  </div>
</div>
```

No other changes. Blueprint card's single 64px icon untouched.

