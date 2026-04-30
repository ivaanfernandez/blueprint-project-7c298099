# Membership Tiers Section — Huella Verde (Reset)

Add a new informational `Membership Tiers` section at the end of the Reset page, after the Premium Services block. Three cards with distinct visual treatments: gray Starter, green-highlighted Medium (with POPULAR badge + shimmer), gold luxury Gold. No CTAs — display-only.

## Scope
- Edit only `src/pages/HuellaVerde.tsx`.
- Do not modify Home, Huella Azul (Lab), Huella Roja (HackBar), or any other section of Huella Verde.

## Implementation

### 1. Insert JSX after the `PREMIUM SERVICES` `motion.section` (and before `<HuellaVerdeHUDFooter />`)

A new `<motion.section className="reset-membership-section">` containing:
- Header: eyebrow `[ MEMBERSHIP TIERS ]`, title `Recovery Built for Every Level`, subtitle.
- Grid `.reset-membership-grid` with 3 `.reset-tier-card` elements:
  - **STARTER** (`.reset-tier-starter`) — $300/mo, 4 bullets + bonus.
  - **MEDIUM** (`.reset-tier-medium`) — $500/mo, badge `POPULAR`, 4 bullets + bonus.
  - **GOLD** (`.reset-tier-gold`) — $1,000/mo, 5 bullets + bonus.
- Each card has 4 HUD corner-brackets (`.reset-tier-corner-bracket` × tl/tr/bl/br), header (num + name + price block), bullet list (`◆` + label + per-item price on right), and bonus footer with `+ Online Mobility Modules`.
- Use `scrollReveal` / `scrollStagger` (already imported) for entrance animation, consistent with rest of page.

Exact bullet data (per spec):

```text
STARTER  $300/mo
  2× Infrared Sauna       $60
  2× Adjustments          $140
  2× Compression Boots    $60
  2× Muscle Therapy       $70
  + Online Mobility Modules

MEDIUM   $500/mo  [POPULAR]
  4× Infrared Sauna       $120
  4× Adjustments          $280
  2× Compression Boots    $60
  2× Muscle Therapy       $70
  + Online Mobility Modules

GOLD     $1,000/mo
  Unlimited Sauna         $240+
  4× Adjustments          $280
  4× Compression Boots    $60
  4× Muscle Therapy       $140
  4× Hyperbaric Chamber   $360
  + Online Mobility Modules
```

### 2. Append CSS to the existing `<style>{`...`}</style>` block in HuellaVerde.tsx

To keep the change page-scoped (matching the existing pattern where all Reset CSS lives inside the page), append the membership styles to the same inline `<style>` already in the file, instead of touching `index.css`.

CSS additions (summary):
- `.reset-membership-section` — `#050a05` bg, padding `100px 6%`, radial green glow `::before`.
- `.reset-membership-header` + eyebrow (Orbitron green), title (Michroma 48px), subtitle (Inter).
- `.reset-membership-grid` — `grid-template-columns: 1fr 1fr 1fr`, gap 24, max-width 1280, `align-items: stretch`.
- `.reset-tier-card` base — radius 16, padding `36 28 32`, flex column gap 24, transition for hover lift.
- `.reset-tier-corner-bracket` (tl/tr/bl/br) — 16×16 absolute, `currentColor` borders.
- `.reset-tier-header` with bottom border, `.reset-tier-name-block`, `.reset-tier-num` (Orbitron 11px), `.reset-tier-name` (Michroma 18px), `.reset-tier-price-block`, `.reset-tier-price` (Orbitron 36px bold), `.reset-tier-price-suffix`.
- `.reset-tier-bullets` list (no markers), `.reset-tier-bullet` (justify-between, baseline, padding-left 18, `::before` `◆`), `.reset-tier-bullet-text`, `.reset-tier-bullet-price` (Orbitron 12).
- `.reset-tier-bonus` with dashed top border, `.reset-tier-bonus-icon`, `.reset-tier-bonus-text`.
- `.reset-tier-badge` — green `#4ade80` on dark green text `#052e16`, top-right of card.
- Variant: `.reset-tier-starter` — neutral gray gradient + border, hover lift.
- Variant: `.reset-tier-medium` — green gradient + `#4ade80` border, glow box-shadow, `transform: scale(1.03)`, animated shimmer via `::before` + `@keyframes medium-shimmer`.
- Variant: `.reset-tier-gold` — gold gradient + `rgba(212,175,55,0.7)` border, `#fbbf24` accents.
- Responsive:
  - Tablet `768–1023px`: grid 2 cols, Medium scale reset to 1, Gold spans 2 cols centered max-width 600.
  - Mobile `<768px`: stack, section padding `70px 5%`, title 32, Medium `order: -1`, all hover transforms disabled.

### 3. Verification
- Run typecheck.
- Confirm no other files are touched (Home, Lab, HackBar, index.css, index.html unchanged).
- Visually verify section renders below Premium Services and above the HUD footer.

## Files changed
- `src/pages/HuellaVerde.tsx` (JSX insert + appended CSS in existing `<style>` block)
