

## Huella Verde Recovery Room — Asymmetric Bento Desktop

Restructure the Recovery Room grid on desktop (≥1024px) into an asymmetric bento layout while preserving the existing 2×2 mobile grid.

### Current state

`src/pages/HuellaVerde.tsx` renders 4 recovery cards in a `.recovery-grid` wrapper. All cards currently render as 1:1 squares on every breakpoint. Card order in JSX: Infrared Sauna → Ice Bath → Mobility → Massages.

### Target desktop layout

```text
┌─────────────┬──────────────────┐
│             │   Ice Bath       │
│  Infrared   │   (top, wide)    │
│  Sauna      ├────────┬─────────┤
│  (tall)     │Mobility│Massages │
│             │(square)│(square) │
└─────────────┴────────┴─────────┘
   1.4fr           1fr      1fr
```

3 columns × 2 rows, gap 16px, max-width 1280px, min-height 640px on the large card.

### Plan

**1. `src/index.css` — append `.recovery-grid` bento rules**

- Mobile fallback `@media (max-width: 1023px)`: keep `grid-template-columns: 1fr 1fr`, gap 12px, all cards `aspect-ratio: 1/1`.
- Desktop `@media (min-width: 1024px)`: 
  - Grid: `1.4fr 1fr 1fr` × `1fr 1fr`, gap 16px, max-width 1280px, centered.
  - `:nth-child(1)` (Infrared) → `grid-column: 1`, `grid-row: 1 / span 2`, `min-height: 640px`, override aspect-ratio to `auto`.
  - `:nth-child(2)` (Ice Bath) → `grid-column: 2 / span 2`, `grid-row: 1`, aspect-ratio `auto`, full height.
  - `:nth-child(3)` (Mobility) → `grid-column: 2`, `grid-row: 2`, aspect-ratio 1/1.
  - `:nth-child(4)` (Massages) → `grid-column: 3`, `grid-row: 2`, aspect-ratio 1/1.
  - Title scaling: card 1 → 28px, card 2 → 24px, others → 18px.
  - Hover: `translateY(-6px)` + green shadow `rgba(34,197,94,0.4)` + image `scale(1.12)`.
  - Use `!important` to override existing inline aspect-ratio/height styles on the cards.

**2. `src/pages/HuellaVerde.tsx` — verify className + bump Infrared image resolution**

- Confirm the `.recovery-grid` wrapper exists and the 4 `.recovery-card` children render in order: Infrared → Ice Bath → Mobility → Massages. The CSS targets via `:nth-child`, so JSX order stays untouched.
- Update Infrared Sauna `src` to `https://images.unsplash.com/photo-1685948670617-0f26cb4997bb?w=1200&auto=format&fit=crop` (bump from `w=800` → `w=1200` for the larger desktop slot). Keep existing `srcSet`/`sizes` and update the largest `srcSet` entry to 1600w if needed; otherwise leave the responsive set as-is.

### Out of scope

- Mobile layout (untouched).
- Card titles, copy, gradient overlays, green accent glows.
- Other 3 image URLs (Ice Bath, Mobility, Massages).
- Premium Services section, footer fingerprint, hero RESET, floating dock, animated green background.
- Any other page or component.

### Files modified

- `src/index.css` — append Recovery Room bento CSS block.
- `src/pages/HuellaVerde.tsx` — update Infrared Sauna image URL only; verify class names already match.

