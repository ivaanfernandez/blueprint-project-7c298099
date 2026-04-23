

## Loading Spinner + Scroll Reveal — Conflict Check Before Building

The request describes a **minimalist white/gray gym** with a generic vanilla loading spinner and a vanilla scroll-reveal hook. Your project is the opposite of that and already ships both pieces in branded form. Building the prompt as-written would duplicate logic, conflict with brand memory, and break the established UX flow.

Flagging before any code changes so you can decide.

### Conflict 1 — Brand palette

Prompt asks for: white `#FFFFFF`, grays `#E5E5E5 / #808080 / #2D2D2D`, dark gray `#1F1F1F` background.
Project memory (`Core`): Dark Luxury for pillars, NeoVision for Home. Blue `#1A6BFF` (Training), Green `#22C55E` (Nutrition), Red `#FF3B3B` (Recovery). Typography Bebas Neue / Michroma / Orbitron — not minimalist.
A neutral white/gray loader + page wrapper would visually break every page on first paint.

### Conflict 2 — Loading spinner duplicates the Biometric Intro

You already have a 5-second cinematic intro at app load:
- `src/components/BiometricScan.tsx` (blue, Home) — 5000 ms, scan line, glow pulse, ripple, shimmer sweep, then `onComplete` → reveals dock
- `src/components/BiometricScanGreen.tsx`, `BiometricScanRed.tsx` (per-pillar)
- Wired in `App.tsx` via `showDock` state and the `bp:force-complete-intro` E2E hatch
- Memory: `features/biometric-intro-screen` documents this as the canonical entry animation

A second `LoadingSpinner` showing 0–100% would either run **before** the biometric intro (10 s total before content) or **replace** it (loses the brand moment). Both are bad.

### Conflict 3 — ScrollRevealWrapper duplicates `scrollAnimations.ts`

`src/lib/scrollAnimations.ts` already exports `scrollReveal`, `scrollRevealNoShift`, `scrollStagger`, `blurReveal`, `blurRevealItem` — used across `Home.tsx`, `HuellaVerde.tsx`, etc. It uses Framer Motion's `whileInView` (IntersectionObserver under the hood), supports stagger, honors `prefers-reduced-motion` AND the test-only `data-no-motion` flag, and has tuned viewport thresholds for the 390 px mobile target.

The proposed vanilla `useScrollReveal` + `ScrollRevealWrapper` would:
- Re-implement what already works
- Lose reduced-motion handling, the no-motion test flag, and per-breakpoint stagger tuning
- Mix two animation systems on the same page (the project's memory rule for animation libraries says: pure CSS for the intro, Framer Motion for complex UI — adding a third vanilla layer violates this)

### Recommended paths — pick one

**A. Skip — already covered.** Do nothing. Biometric intro = your loader. `scrollReveal` props = your reveal wrapper. This is my recommendation.

**B. Apply the white/gray loader + vanilla wrapper to a NEW page only** (e.g. a future `/lab` or admin page) so it doesn't fight the brand. Tell me which route.

**C. Build a thin `ScrollRevealWrapper` component that wraps the existing `scrollReveal` props** so JSX is shorter, but keep Framer Motion + reduced-motion guards underneath. No new loader. No palette change.

**D. Replace the biometric intro with the white/gray spinner globally.** This rewrites brand memory and removes the cinematic entry. Strongly not recommended — only choose if you've decided to pivot the whole identity.

### What I will NOT do without an explicit answer

- Add a second loader on top of `BiometricScan`
- Introduce white `#FFFFFF` / gray `#1F1F1F` as global page colors
- Replace `scrollAnimations.ts` usages with a vanilla hook
- Touch `App.tsx` intro flow, `Home.tsx`, the pillar pages, or the dock

Reply with **A**, **B (+route)**, **C**, or **D** and I'll write the precise plan.

