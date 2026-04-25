## Pricing Cards — Harsh Glow Magnetic Reveal

Replace the 3 existing pricing cards inside `src/components/PricingSection.tsx` with a new HUD-style component. Title "YOUR SYSTEM STARTS HERE", the Monthly/Yearly toggle, and the section wrapper stay byte-identical. Only the cards block changes.

### Files touched

1. **New** — `src/components/PricingCardsHarshGlow.tsx`
2. **Edit** — `src/components/PricingSection.tsx` (swap card grid for new component, remove now-unused code)
3. **Edit** — `src/index.css` (append Harsh Glow styles)

### What changes

**`src/components/PricingCardsHarshGlow.tsx`** (new)
- Receives `isYearly: boolean` prop.
- Internal `TIERS` array with 3 tiers: Blueprint (SYSTEM 01 / FOUNDATION / 1 pip / $75 / INITIALIZE), Blueprint+ (SYSTEM 02 / POPULAR / 2 pips / $150 / ACTIVATE / `isPopular`), Blueprint Elite (SYSTEM 03 / MAXIMUM / 3 pips / $250 / DEPLOY).
- Renders a `.harsh-grid` containing 3 `.harsh-card` divs. Each card contains, in order:
  - 4 corner bracket divs (`.harsh-corner harsh-corner-tl/tr/bl/br`)
  - Scan line div (`.harsh-scan`)
  - Tier row: pips (`.harsh-pips` with 3 `.harsh-pip`, first N marked `.harsh-pip-on` based on `pipsActive`) + `tier.tierLabel`
  - Plan name (`.harsh-name`)
  - System number (`.harsh-system`)
  - Price area (`.harsh-price-area`): `${price}` in `.harsh-price`, `PER MONTH` in `.harsh-permo`
  - Features list (`.harsh-features`) — hidden until hover via CSS
  - CTA button (`.harsh-cta`) showing `tier.cta`
- The user's pasted JSX had blank gaps; I'll reconstruct it cleanly using the CSS class names defined below. No internal state, no Framer Motion — pure CSS hover.

**`src/components/PricingSection.tsx`** (edit)
- Add `import PricingCardsHarshGlow from "./PricingCardsHarshGlow";`
- Keep: section wrapper, title, Monthly/Yearly toggle + its `isYearly` state.
- Replace the entire `{isMobile ? (...) : (...)}` cards block (the mobile stack + desktop grid) with a single `<PricingCardsHarshGlow isYearly={isYearly} />`.
- Remove now-unused: `MobileCard`, `PricingCard`, `FingerprintSVG`, `CheckIcon`, `FingerprintDot`, `TripleDots`, `PLANS`, `Plan` interface, `expandedCard` state, `useIsMobile` hook, `motion` / `AnimatePresence` / `User` / `Check` imports. (Responsiveness now handled in CSS via media queries on `.harsh-grid`.)

**`src/index.css`** (append)
- Append the full Harsh Glow CSS block (~280 lines) from the spec, exactly as provided. Includes:
  - `.harsh-grid` (3-col desktop, 1-col mobile, tablet compact)
  - `.harsh-card` base + hover (translateY -8px, triple white box-shadow glow)
  - `.harsh-corner-*` (12px → 16px on hover with double glow)
  - `.harsh-scan` keyframes 2s linear infinite, only on hover
  - `.harsh-tier`, `.harsh-pips`, `.harsh-pip(-on)`
  - `.harsh-name`, `.harsh-system`
  - `.harsh-price-area`, `.harsh-price` (triple text-shadow on hover), `.harsh-permo`
  - `.harsh-features` (max-height/opacity reveal), `.harsh-feat`, `.harsh-feat-icon`
  - `.harsh-cta` (inverts to white bg + black text on hover with double glow)
  - `@media (max-width: 767px)` and `@media (768–1023px)` blocks

### Pricing values — needs your call

The prompt's placeholder yearly prices (`$60 / $120 / $200`) are 20% off and **don't match** the current site's yearly values (`$64 / $128 / $213`, ~15% off). I'll keep the current site's actual yearly prices in the new `TIERS` array so the toggle keeps showing the same numbers users already see. If you want the 20%-off placeholders instead, say so and I'll swap.

### Strict preservations

- Title "YOUR SYSTEM STARTS HERE" — unchanged
- Monthly/Yearly toggle UI + `isYearly` state — unchanged
- Section wrapper `<section className="relative z-10 py-8 md:py-12 px-4">` — unchanged
- Save 15% pill on yearly toggle — unchanged
- No other page or component touched
- No color other than white/gray; all glows are pure white
- All animation timings preserved exactly per spec (0.5s card, 0.4s hover details, 2s scan)
- Middle card (Blueprint+) marked POPULAR via `tierLabel` only — no scale, no extra border/shadow in base state
- 3 tiers exactly, in order: Blueprint, Blueprint+, Blueprint Elite
- Features hidden in base state, revealed on hover (mobile tap will trigger via `:hover` on touch)

### Out of scope

- No changes to fonts (Orbitron/Michroma already loaded in `index.html`)
- No new dependencies
- No edits to Home, HuellaAzul, HuellaRoja, HuellaVerde
- No changes to background, dock, footer, or any other section of MainLanding
