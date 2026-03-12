

# Headline + Dock Visibility Changes

## 1. `src/pages/MainLanding.tsx`

**Headline changes (lines 116-143):**
- Line 1: Remove comma, add `whiteSpace: "nowrap"`, reduce font-size to `clamp(28px, 7vw, 100px)` so it fits on one line at 390px
- WordRotate: Update words to remove periods, add "THIS IS BLUEPRINT", add `display: "block"` to className or style
- Remove comma after "GYM", remove periods from rotating words

**Dock visibility (lines 100-111):**
- Accept `showDock` prop
- Apply `opacity: showDock ? 1 : 0`, `pointerEvents: showDock ? "auto" : "none"`, `transition: "opacity 0.8s ease"` to the fixed dock wrapper

**Component signature:** Change to accept `{ showDock }: { showDock: boolean }` prop.

## 2. `src/App.tsx`

- Add `showDock` state, initially `false`
- Add `useEffect` that sets `showDock = true` after 100ms delay, only when `introComplete` is true (or when MainLanding mounts — but simpler: trigger after introComplete)
- Pass `showDock` to `<MainLanding showDock={showDock} />`

Actually, re-reading the spec: "Set showDock to false initially. Set it to true inside a useEffect with a 100ms delay after MainLanding mounts." So the delay is after MainLanding mounts, meaning it should be in MainLanding itself or triggered by mount. But the prop comes from App. Simplest: in App, when `introComplete` becomes true, start a 100ms timer to set `showDock` to true.

