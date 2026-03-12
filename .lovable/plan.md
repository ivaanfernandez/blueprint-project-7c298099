

# Move Dock to Fixed Top Navigation

## Changes (single file: `src/pages/MainLanding.tsx`)

1. **Add fixed Dock nav** — Insert a new `<div>` right after `<ProceduralBackground />` with:
   - `position: fixed`, `top: 0`, `left: 0`, `right: 0`, `z-index: 50`
   - `display: flex`, `justify-content: center`, `padding-top: 20px`
   - No background — transparent, floats over WebGL
   - Contains the `<Dock>` with all three `<DockIcon>` items (same as current)

2. **Remove Dock from Hero** — Delete lines 137–148 (the `{/* Dock */}` wrapper and its contents)

3. **No other changes** — Hero content stays centered via `min-h-screen flex items-center justify-center`. The existing `paddingBottom: 80px` on the hero section is sufficient spacing; no additional top padding needed since the dock is only ~92px tall and the hero uses flexbox centering.

