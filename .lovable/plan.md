

## Plan: Replace Lab Background with Animated WebGL Shader

Two files changed. No new dependencies.

### File 1: Create `src/components/ProceduralBackground.tsx`

New WebGL component with a white-themed procedural shader (topographic lines on white). Uses `position: absolute` to fill its parent container, auto-sizes via `parentElement.clientWidth/Height`. The shader uses white base colors with subtle gray topographic lines subtracted from the surface.

### File 2: `src/pages/Home.tsx`

**2a. Add import** (line 1 area):
```tsx
import ProceduralBackground from "@/components/ProceduralBackground";
```

**2b. Delete lab background** (lines 297–339):
Remove the entire `{/* Lab Background */}` div containing the grid pattern, scan line, and 15 pulsing dots.

**2c. Add replacement** in same position (first child of White Zone Wrapper):
```tsx
<ProceduralBackground />
```

**2d. Delete unused CSS keyframes** (lines 95–102):
Remove `@keyframes labScanLine` and `@keyframes labDotPulse` from the `<style>` block.

### No other changes
- Hero, About content, Programs, Feature Rows, Footer all untouched
- Mobile: no changes needed — canvas auto-sizes to parent

