

## Plan: 4 Surgical Changes to Home Page

### Change 1: Remove Instagram Icon
Delete the `motion.div` at lines 257-282 in `Home.tsx` (the bottom-right social icons container with the Instagram link).

### Change 2: Add ShaderGrid Background to Hero
- **Create** `src/components/ShaderGrid.tsx` — WebGL2 full-screen canvas with animated grid lines in white/gray/black palette (fragment shader with scrolling grid, vignette, noise, dithering).
- **In `Home.tsx`**: Replace `CybercoreBackground` import with `ShaderGrid` import. Replace `<CybercoreBackground beamCount={50} />` with `<ShaderGrid />` inside the hero section. The shader canvas sits at z-index 0; all hero content stays at z-index 2+.
- Optionally remove the cyberRise/cyberFade/cyberFloorGlow/cyberMainGlow keyframes from `index.css` since CybercoreBackground is no longer used (or leave them as dead code).

### Change 3: Add TextScramble Effect to Title and Subtitle
- **Create** `src/components/ui/text-scramble.tsx` — a motion-wrapped component that scrambles text character-by-character before revealing the final string, using `setInterval` and configurable duration/speed/characterSet.
- **In `Home.tsx`**: Import `TextScramble`. Replace the `<motion.h1>` title (lines 172-194) with `<TextScramble as="h1">` keeping all existing inline styles. Replace the `<motion.p>` subtitle (lines 197-214) with `<TextScramble as="p">` keeping all existing inline styles. Title uses uppercase charset with 1.2s duration; subtitle uses lowercase charset with 1.0s duration.

### Change 4: Add Glow to Program Cards
In the programs `.map()` (line 481), add `boxShadow` to each card's default style:
```
boxShadow: "0 0 20px rgba(0,0,0,0.04), 0 0 60px rgba(255,255,255,0.3)"
```
Update the `.program-card:hover` CSS rule (line 113) to include the intensified glow:
```
box-shadow: 0 0 30px rgba(0,0,0,0.06), 0 0 80px rgba(255,255,255,0.5), 0 0 120px rgba(200,200,200,0.15);
```
Add `transition: all 0.4s ease` to `.program-card` CSS rule.

### Files to Create
1. `src/components/ShaderGrid.tsx`
2. `src/components/ui/text-scramble.tsx`

### Files to Edit
1. `src/pages/Home.tsx` — all 4 changes
2. `src/index.css` — optionally clean up unused cyber keyframes

