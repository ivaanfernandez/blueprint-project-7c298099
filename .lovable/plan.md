

## Home Loader: Vitruvian + Neural Network

A cinematic 2.8s full-screen loader plays only on the **first visit** to the Home page during a session, then fades into the existing content.

### Visual Sequence (no text, pure SVG + Framer Motion)

```text
0.0s ─── 0.8s ─── 1.5s ─── 2.2s ─── 2.8s
  │        │        │        │        │
  ▼        ▼        ▼        ▼        ▼
Particles  Neural   Vitruvian  Color    Fade
appear     net      figure     rings    out
                    draws      pulse
```

1. **Phase 1 (0–0.8s)** — 24 white floating particles fade in at random positions
2. **Phase 2 (0.8–1.5s)** — Blue lines stroke between nearby particles, forming a neural mesh
3. **Phase 3 (1.5–2.2s)** — Vitruvian Man draws itself stroke-by-stroke in blue (head, torso, T-arms, raised arms, A-legs, straight legs) inside a circle + square
4. **Phase 4 (2.2–2.8s)** — Three concentric rings expand from center in pillar colors: blue `#1A6BFF` → red `#FF3B3B` → green `#22C55E`, then full overlay fades to black and unmounts

### First-Visit Logic

- On Home mount, check `sessionStorage.getItem("home-loader-seen")`
- If unset → show loader; on completion, write `"true"` to sessionStorage
- Navigating to other pillars and returning → loader does NOT replay
- Closing the browser tab clears sessionStorage → next session shows it again

### Files

**Create `src/components/HomeLoader.tsx`**
- Props: `{ onComplete: () => void }`
- Fixed full-screen overlay, `zIndex: 9999`, black background
- Single SVG with `viewBox="0 0 100 100"`, `preserveAspectRatio="xMidYMid meet"`, sized `min(90vw, 90vh)` capped at 600px
- All elements (particles, lines, Vitruvian parts, rings, center pulse) use `motion.*` with calibrated `delay`/`duration`
- Two timers: exit fade at 2500ms, `onComplete()` callback at 2800ms

**Edit `src/pages/Home.tsx`**
- Import `HomeLoader` (reuse existing `useState`/`useEffect` already imported)
- Add state `showLoader` + `useEffect` reading `sessionStorage`
- Add `handleLoaderComplete` that writes the flag and hides loader
- Wrap the existing return in a fragment, render `{showLoader && <HomeLoader onComplete={handleLoaderComplete} />}` as the first child so it overlays everything

### Constraints respected

- Framer Motion only (matches `mem://constraints/animation-libraries` for "complex UI")
- No external assets or HTTP requests — Vitruvian is pure SVG primitives
- No text, no skip button, no audio
- Exclusive to `Home.tsx`; no other pages, no dock/scroll/back-button changes
- Pillar colors match canonical brand tokens

