

## Plan: Extend scroll animations to HuellaVerde + audit & polish across pages

Four targeted sub-tasks. No new dependencies.

### 1. HuellaVerde — apply blurReveal + stagger pattern
File: `src/pages/HuellaVerde.tsx`.

- Add imports: `scrollReveal`, `scrollStagger`, `blurRevealItem` from `@/lib/scrollAnimations`.
- **Hero photo strip** (line 168): leave as-is — it's above the fold and is an empty placeholder strip, no reveal needed.
- **RECOVERY ROOM section** (lines 182–230): keep the outer `motion.section` wrapper but replace its inline `initial/whileInView` with `{...scrollReveal}` (consistency). Convert the title `<h2>` and intro `<p>` into `motion.h2`/`motion.p` with `{...scrollReveal}`.
- **Top 3 + Bottom 2 cards grids**: wrap each grid in `motion.div {...scrollStagger}`; convert each card `<div>` to `motion.div variants={blurRevealItem}`. Remove the existing `animation: hvFadeUp ...` inline animation on each card to avoid double-animation (keep the `hvScanLine` keyframe — it's a perpetual scanner, not an entrance animation).
- **SERVICIOS PREMIUM section** (lines 233–265): swap inline section motion to `{...scrollReveal}`; wrap the list in `motion.div {...scrollStagger}`; replace each item's per-index `delay: i * 0.1` motion props with `variants={blurRevealItem}` so the parent stagger drives the timing.
- **Footer** (line 268): one `motion.footer {...scrollReveal}`.

No `ParallaxImage` here — recovery cards are empty colored backgrounds, not photos.

### 2. Audit — remove conflicts on existing pages
- **HuellaRoja.tsx** (lines 510, 539, 664): three `motion.section` blocks still use the legacy inline `initial={{ opacity: 0, y: 20 }} whileInView=...` props. Replace with `{...scrollReveal}` for consistency with the rest of the system. No structural changes — purely prop swap. Confirms parity of margin/easing/duration.
- **MainLanding.tsx**: `InteractiveImageAccordion` and `BentoGrid` are wrapped in `motion.div {...scrollReveal}`. The blur filter on a wrapper containing radix Accordion (which animates `height` via CSS variables) is fine — `filter` and `height` don't conflict — but to avoid any layout-shift jank during the 0.6s blur, switch the accordion wrapper from `scrollReveal` (which animates `y: 20`) to a no-translate variant. **Add a new variant** in `scrollAnimations.ts` called `scrollRevealNoShift` (same as `scrollReveal` but `y: 0` in hidden state) and use it on the two MainLanding wrappers and on the HuellaRoja `ElectricBorder` wrappers (lines 711, 806) — translating the ElectricBorder canvas during reveal can cause a 1-frame flicker on the SVG filter.
- **Home.tsx**: spot-check confirms `WordRotate`-equivalent (TextScramble) titles are wrapped only at the heading level, not the inner animated text. No changes.
- **Hero CTAs above-the-fold** on Home and MainLanding stay un-wrapped (already correct).

### 3. `prefers-reduced-motion` toggle that fully disables JS-driven motion
The existing `src/index.css` rule only neuters CSS animations/transitions — it does NOT stop Framer Motion's JS animations. Add a JS-side guard:

- In `src/lib/scrollAnimations.ts`:
  - Add a small helper `prefersReducedMotion()` that reads `window.matchMedia('(prefers-reduced-motion: reduce)').matches` (SSR-safe with `typeof window` check).
  - When true, export the variants with `hidden` collapsed to the same values as `visible` (opacity 1, no blur, y 0) and `transition.duration: 0`. This guarantees content is rendered in place, fully readable, with zero animation.
  - Concretely: build the variant objects via a function, e.g. `const reduce = prefersReducedMotion(); export const blurReveal = reduce ? STATIC : ANIMATED;`. Same for `blurRevealItem` and `staggerContainer`.
- In `src/components/ParallaxImage.tsx`: short-circuit when reduced motion is on — render a plain `<img>` with `scale: 1` and no `useTransform`. Image stays sharp, in place, fully visible.
- Keep the existing CSS `@media (prefers-reduced-motion: reduce)` block in `index.css` (covers third-party CSS animations like the dock and `hvScanLine`).

This is a static read at module load; users who toggle the OS preference need a refresh, which is the standard expectation.

### 4. Tune timing for 390px (mobile)
The current viewport margin `0px 0px -100px 0px` means reveals fire only after the element is 100px inside the viewport. On a 390×844 phone where each section nearly fills the screen, this delays reveals noticeably and creates inconsistent feel between Home's About features and the Choose Your Fingerprint cards.

- In `scrollAnimations.ts`, change the viewport prop on both `scrollReveal` and `scrollStagger` to `{ once: true, amount: 0.15, margin: "0px 0px -10% 0px" }`. Using `amount: 0.15` (fires when 15% of the element is visible) plus a percentage-based bottom margin scales naturally across viewport sizes — no separate mobile branch needed.
- Reduce `staggerChildren` from `0.1` to `0.08` and `delayChildren` from `0.1` to `0.05`. On mobile (390px) the four About features and the three fingerprint cards sit visually closer; the tighter cascade reads as one coherent motion instead of a long drip.
- Keep `duration: 0.6` and the easing `[0.22, 1, 0.36, 1]` — both feel right per memory.

### Files modified / created
- `src/lib/scrollAnimations.ts` — add `scrollRevealNoShift`, add reduced-motion branching, retune viewport + stagger timings.
- `src/components/ParallaxImage.tsx` — reduced-motion short-circuit.
- `src/pages/HuellaVerde.tsx` — full integration of motion variants.
- `src/pages/HuellaRoja.tsx` — swap legacy inline motion props on sections B/C/D for `{...scrollReveal}`; switch ElectricBorder wrappers to `scrollRevealNoShift`.
- `src/pages/MainLanding.tsx` — switch accordion + bento wrappers to `scrollRevealNoShift`.

### Untouched
- Hero videos, `WordRotate`, `TextScramble`, `ElectricBorder` internals, biometric scan components, dock, BackToHomeButton, ScrollToTop, `hvScanLine` perpetual scanner animation, all routing logic.

