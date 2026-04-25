# Pricing Cards — Mobile Compact Row (<768px only)

Reduce mobile pricing card height from ~400px to ~110-130px using a 3-row CSS grid layout. Desktop (≥768px) Harsh Glow magnetic reveal stays byte-identical.

## Files touched

1. **Edit** — `src/index.css` (replace mobile media query block at lines 1406–1420)
2. **Edit** — `src/components/PricingCardsHarshGlow.tsx` (add conditional `harsh-popular` class to popular tier card)

## Changes

### 1. `src/index.css` — replace mobile block (lines 1406–1420)

Swap the current 14-line mobile block for the new Compact Row CSS (~110 lines). Tablet block at lines 1422–1439 and all desktop rules above untouched.

The new mobile block redefines `.harsh-card` as a CSS grid with three areas:
```text
[ tier   tier  ]   ← pips + label, full width
[ name   price ]   ← name+system left, $price right (flex row)
[ cta    cta   ]   ← full-width outline button
```

Plus mobile-specific tweaks:
- `.harsh-grid`: gap 8px, padding 0 4px
- `.harsh-card`: padding 14×16, hover transform disabled
- `.harsh-corner`: 8×8 (down from 12×12), positioned at 5px
- `.harsh-tier`: 9px font, gap 8px, margin-bottom 6px
- `.harsh-pip`: 4×4
- `.harsh-name`: 13px, hover text-shadow disabled
- `.harsh-system`: 8px, pushed below name via `margin-top: 14px` in column 1 row 2
- `.harsh-price-area`: right-aligned, center vertically
- `.harsh-price`: 26px (down from 42px), hover glow disabled
- `.harsh-permo`: 7px
- `.harsh-features`: `display: none`
- `.harsh-scan`: `display: none`
- `.harsh-cta`: padding 10px, font 9px, margin-top 12px

Plus `.harsh-popular` modifiers (mobile only):
- Border `rgba(255,255,255,0.4)`, bg `rgba(255,255,255,0.025)`
- CTA inverted: white bg, black text
- Tier label opacity 0.9

### 2. `src/components/PricingCardsHarshGlow.tsx`

Single-line change inside the `.map()` callback: change
```tsx
<div key={tier.name} className="harsh-card">
```
to
```tsx
<div key={tier.name} className={`harsh-card ${tier.isPopular ? "harsh-popular" : ""}`}>
```

No other component edits. `TIERS` data, toggle, JSX structure, CTAs all unchanged.

## Strict preservations

- Desktop ≥768px: Harsh Glow hover effects, scan line, triple glow, magnetic reveal, corner growth, CTA invert, features stagger reveal — all intact
- Tablet 768–1023px media query — unchanged
- Monthly/Yearly toggle and `isYearly` prop — unchanged
- Tier data (prices, names, system numbers, features, CTAs) — unchanged
- Fonts Orbitron/Michroma — unchanged
- No new markup elements; layout achieved purely via CSS grid

## Out of scope

- No edits to `HuellaAzul`, `HuellaRoja`, `HuellaVerde`, `Home`, or any other page
- No new media queries; only the existing `@media (max-width: 767px)` is replaced
- No new dependencies
