

## Huella Verde Premium Services — Interactive Accordion with HUD Stats

Replace the static stack of 4 numbered service items with an interactive accordion that expands on hover (desktop) or tap (mobile), revealing a description plus a 4-stat HUD panel per service.

### Current state

`src/pages/HuellaVerde.tsx` (lines 234–263) renders a `SERVICIOS.map(...)` block. Each row shows number + green underline + title + description, all visible at once. No interactivity, no stats, ~50% of desktop width unused.

### Target

```text
┌─ accent line (40px → 100% on active) ───────────────┐
│ 01  PERSONALIZED RECOVERY PROTOCOLS            ▸/▾ │
│  ─ description (hidden until active) ─             │
│  ┌──────────┬──────────┬──────────┬──────────┐    │
│  │ ⚡ 94%   │ ⏱ 60MIN  │ ⚙ 12     │ ★ ELITE  │    │
│  └──────────┴──────────┴──────────┴──────────┘    │
└─────────────────────────────────────────────────────┘
```

- Desktop ≥1024px: hover expands, mouseleave collapses; HUD stats in 1×4 row.
- Mobile <1024px: tap toggles; HUD stats in 2×2 grid.

### Plan

**1. Create `src/components/PremiumServiceAccordion.tsx`**

- Local `SERVICES` array with 4 items. Each item: `{ number, title, description, stats: HudStat[4] }`. Content as specified by the user (Personalized Recovery / Reset Pass / Corporate / Reset Retreats), each with 4 unique HUD stats (label, value, unicode icon).
- State: `activeIndex: number | null`, `isDesktop: boolean` (from `window.innerWidth >= 1024`, updated on resize).
- Behavior: `onMouseEnter`/`onMouseLeave` set/clear `activeIndex` only when desktop; `onClick` toggles `activeIndex` only when not desktop.
- Render: `.premium-accordion` wrapper → 4 `.premium-item` children, each with `.premium-accent-line`, `.premium-header` (number + title + chevron `▸`/`▾`), and `.premium-content` containing description + `.premium-hud` grid of 4 `.premium-stat` cells (icon + label + value). Toggle `is-active` class on the item when `activeIndex === index`.

**2. Append CSS to `src/index.css`** (Premium Services Accordion block)

- `.premium-accordion`: max-width 1100px, centered, vertical flex, gap 2px.
- `.premium-item`: rounded card, dark bg, faint green border, `cursor: pointer`, transitions on bg/border/transform. `.is-active` and `:hover` lift bg to `rgba(34,197,94,0.06)` and border to `rgba(34,197,94,0.35)`.
- `.premium-accent-line`: 2px green bar top-left, width 40px → 100% with green glow when `.is-active`, easing `cubic-bezier(0.22, 1, 0.36, 1)`.
- `.premium-header`: flex row, number (Orbitron 14px green), title (Michroma 18px), chevron (mono).
- `.premium-content`: collapsed by default via `max-height: 0; opacity: 0` → expanded `max-height: 600px; opacity: 1` when `.is-active`, transition 0.5s.
- `.premium-hud`: 4-col grid, dark bg, green corner brackets via `::before`/`::after`.
- `.premium-stat`: hidden until `.is-active`, then fades in with `translateY(10px) → 0`. Stagger via `transition-delay: calc(var(--i) * 80ms)` set inline through `style={{ ['--i' as any]: i }}` on each stat.
- Breakpoints:
  - `@media (max-width: 767px)`: HUD becomes 2×2; title 14px; padding tightened.
  - `@media (min-width: 1024px)`: padding 28px 36px; title 20px; description 15px.

**3. Wire into `src/pages/HuellaVerde.tsx`**

- Add `import PremiumServiceAccordion from "@/components/PremiumServiceAccordion";`.
- Replace lines 247–262 (the `SERVICIOS.map` block) with `<PremiumServiceAccordion />`. Keep the section heading "PREMIUM SERVICES" and subtitle untouched.
- Leave the existing `SERVICIOS` data array in place if it is used elsewhere; otherwise it can stay unused (no removal required for this scope).

### Out of scope

- Recovery Room bento (Prompt 1/3 — already shipped).
- Footer fingerprint (Prompt 3/3).
- Hero RESET, animated green background, floating dock, BackToHomeButton.
- Other pages (`Home.tsx`, `MainLanding.tsx`, `HuellaRoja.tsx`).

### Files modified

- **New**: `src/components/PremiumServiceAccordion.tsx`
- **Edit**: `src/index.css` — append accordion CSS block
- **Edit**: `src/pages/HuellaVerde.tsx` — add import + replace 4-item map with `<PremiumServiceAccordion />`

