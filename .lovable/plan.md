

## Plan: Scale Reveal Transition

### New file: `src/components/ScaleReveal.tsx`
- Full-screen black div with fixed positioning, z-50
- Inner image container animated with framer-motion `animate` using a phased approach:
  - Phase 1 (0→0.2s): fade in from opacity 0→1
  - Phase 2 (0.2→1.6s): scale 0.12→1, border-radius 20→0, width 280px→100vw, height 180px→100vh, cubic-bezier [0.76,0,0.24,1]
  - Phase 3 (1.6→2.2s): dark overlay fades to 0.55, "BLUEPRINT PROJECT" text fades in
- Image: Unsplash URL, object-fit cover
- Calls `onComplete()` at 2.2s via setTimeout

Implementation: Use framer-motion `motion.div` with `animate` sequences via `useEffect` + state phases, or use keyframe arrays in the `animate` prop. Simplest approach: track a `phase` state (0→1→2→3) with timeouts, and use framer-motion to animate between states.

### Modified file: `src/App.tsx`
- Change state from `introComplete` boolean to `phase: 'scan' | 'reveal' | 'landing'`
- `scan` → renders BiometricScan; onComplete sets phase to `'reveal'`
- `reveal` → renders ScaleReveal; onComplete sets phase to `'landing'`
- `landing` → renders router with MainLanding (showDock delayed 100ms after entering landing phase)
- Black background on root div persists throughout all phases

