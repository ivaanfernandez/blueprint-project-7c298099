
# Cinematic scroll-triggered animations — site-wide

## Important context first

The project **already has a full scroll-reveal system** built on Framer Motion in `src/lib/scrollAnimations.ts`:

- `scrollReveal`, `scrollRevealNoShift`, `scrollStagger`, `blurReveal`, `blurRevealItem`, `staggerContainer`
- Already honors `prefers-reduced-motion` AND the `data-no-motion` test flag
- Already tuned for mobile (≤480px) with tighter stagger + earlier viewport triggers
- Already in use on Home, HuellaVerde (with a stronger local `hvReveal` variant), HuellaRoja, MainLanding

`src/index.css` already has the global `@media (prefers-reduced-motion: reduce)` block.

Given this, **building a second parallel system with a vanilla `useScrollReveal` hook + `<ScrollReveal>` wrapper (as the prompt proposes) would**:
- Duplicate logic that already works
- Create two competing animation philosophies on the same pages
- Fight the existing `motion.section`/`motion.div` reveals (double-fade artifacts)
- Add bundle weight without removing Framer Motion (still needed for HuellaVerde's complex variants)

So the plan is to **extend the existing system** with cinematic presets and apply them consistently, rather than introduce a parallel API.

## What we'll do

### 1. Add cinematic variant presets to `src/lib/scrollAnimations.ts`

Add new exported variants alongside the existing ones (no breaking changes):

- `cinematicSlideUp` — `y: 60`, `scale: 0.96`, `blur(6px)` → settled, 800ms, `cubic-bezier(0.22,1,0.36,1)`
- `cinematicSlideLeft` — `x: -60`, `scale: 0.96`, `blur(6px)` → for accordions / lists
- `cinematicSlideRight` — `x: 60`, `scale: 0.96`, `blur(6px)` → for paired image/text rows
- `cinematicScaleFade` — `scale: 0.92`, `blur(8px)` → for pricing cards
- `cinematicGlowFade` — `y: 20`, `scale: 0.98`, `blur(4px)` + temporary `drop-shadow` glow on enter, color via CSS var `--reveal-glow` (defaults transparent; pages set per-pillar: blue / green / red)
- `cinematicStaggerContainer` — same as `staggerContainer` but with capped delay (≤600ms total, 100ms step)
- Matching `*Props` helpers (e.g. `scrollRevealCinematic`, `scrollRevealSlideLeft`, etc.) returning the `{ initial, whileInView, viewport, variants }` bundle so usage matches the existing pattern.

All variants collapse to the existing `STATIC_VARIANT` when `REDUCE` is true — accessibility preserved automatically.

### 2. Apply variants page-by-page (replace, don't duplicate)

For each page, the existing `motion.*` elements get their `{...scrollReveal}` swapped to the appropriate cinematic preset. No new wrapper components, no DOM changes, no layout shift risk.

**Home (`src/pages/Home.tsx`)**
- Hero: leave as-is (above the fold, no reveal).
- "BUILT FOR HUMAN EVOLUTION" title → `scrollRevealCinematic` (slide-up).
- About feature cards (desktop + mobile stacks) → keep `scrollStagger` container, swap item variant to `cinematicSlideUp` (FeatureCard already uses `blurRevealItem`; we'll point it at the new item variant via the existing prop pattern).
- "Programs" grid → `cinematicStaggerContainer` + `cinematicSlideUp` items.
- Pricing cards section → `cinematicScaleFade` per card with 100ms stagger.

**HuellaVerde (`src/pages/HuellaVerde.tsx`)** — `--reveal-glow: rgba(34,197,94,0.35)`
- Replace local `hvReveal` / `hvStagger` / `hvItemVariants` with the shared cinematic versions to unify behavior across pages (keep the strength the user already approved — that's now the baseline).
- Recovery Arsenal grid → `cinematicStaggerContainer` + `cinematicSlideUp` (6 items, 100ms step, capped 500ms).
- Premium Services accordions → `cinematicSlideLeft` with 120ms stagger.
- Membership Tiers cards → `cinematicScaleFade` with 150ms stagger; section title uses `cinematicGlowFade` (1 glow per page, as recommended).
- Background bridge divs untouched.

**HuellaRoja (`src/pages/HuellaRoja.tsx`)** — `--reveal-glow: rgba(255,59,59,0.4)`
- Section titles → `cinematicSlideUp` (one `cinematicGlowFade` for the main "About Blueprint HackBar" heading).
- About HackBar paired row: vertical 4:5 image → `cinematicSlideLeft`; text column → `cinematicSlideRight` (delay 100ms).
- Nutrition services grid → `cinematicStaggerContainer` + `cinematicSlideUp`.
- Existing `scrollRevealNoShift` wrappers around scan/HUD blocks are kept (translate would cause SVG-filter flicker — that's intentional).

**HuellaAzul (`src/pages/HuellaAzul.tsx`)** — `--reveal-glow: rgba(26,107,255,0.4)`
- Page is currently a 50-line stub with only a hero placeholder. No real sections to animate yet. Add the page-level glow CSS variable so future sections inherit the blue identity automatically. No further changes until real content lands.

**MainLanding (`src/pages/MainLanding.tsx`)**
- Two existing `scrollRevealNoShift` wrappers stay as-is (they wrap components with their own internal motion). No regressions.

### 3. Footer
- Wrap `Footer` content top-level in `cinematicSlideUp` (600ms, no stagger) — matches the prompt's spec.

### 4. What we explicitly will NOT do

- **Not** create `hooks/useScrollReveal.ts` or `components/ScrollReveal.tsx` — would duplicate the existing system.
- **Not** add the global `@media (prefers-reduced-motion)` CSS block — already present in `src/index.css` (line 324 and 592).
- **Not** animate heroes, the floating dock, the logo, or the home video.
- **Not** use `triggerOnce: false` (existing viewport config already uses `once: true`).
- **Not** exceed 1000ms duration or 600ms total stagger (caps enforced in the new presets).

## Technical details

- All new variants live in `src/lib/scrollAnimations.ts` as named exports — tree-shakeable, no runtime cost for unused ones.
- Glow effect uses `filter: drop-shadow(0 0 24px var(--reveal-glow, transparent))` animated to `drop-shadow(... transparent)` after settle, so by default (no var set) it's a no-op — safe to leave on any element.
- Per-page identity color set once on the page-root wrapper:
  ```css
  .huella-verde-root { --reveal-glow: rgba(34,197,94,0.35); }
  .huella-roja-root  { --reveal-glow: rgba(255,59,59,0.40); }
  .huella-azul-root  { --reveal-glow: rgba(26,107,255,0.40); }
  ```
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)` (out-quint) — matches existing convention.
- Mobile tuning reuses the existing `SMALL` flag (≤480px) — cinematic variants get `y: 40` / `x: 40` and 700ms duration on small screens to avoid feeling laggy.
- No new dependencies. Framer Motion is already in the bundle.

## Files touched

- `src/lib/scrollAnimations.ts` — add cinematic variants + helper props
- `src/pages/Home.tsx` — swap to cinematic presets
- `src/pages/HuellaVerde.tsx` — replace local `hvReveal*` with shared cinematic, set `--reveal-glow`
- `src/pages/HuellaRoja.tsx` — apply slide-left/right pairs + cinematic presets, set `--reveal-glow`
- `src/pages/HuellaAzul.tsx` — set `--reveal-glow` only
- `src/components/Footer.tsx` — wrap in cinematic slide-up
- `src/components/FeatureCard.tsx` — point item variant at the new `cinematicSlideUp` (single-line change)

No new files. No removed files.

## Verification checklist (post-implementation)

1. Scroll Home / Reset / HackBar — sections fade in with slight upward + scale + blur settle, never abrupt.
2. Recovery Arsenal grid cascades 6 cards within 600ms.
3. Premium Services accordions enter from the left, 120ms apart.
4. Pricing tiers pop in with scale-fade.
5. Heroes are visible immediately, no entrance animation.
6. About HackBar image and text enter from opposite sides as a pair.
7. OS "Reduce Motion" → all reveals collapse to static (existing guard).
8. `?nomotion=1` URL flag → same static behavior (existing test hook).
9. No layout shift / CLS regression — transforms only, no height changes.
10. No double-fade or competing animations on any element.
