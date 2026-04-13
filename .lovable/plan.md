

## Plan: Add Animated WebGL Background to Footer

Two changes: create a new component, update the footer in `src/pages/Home.tsx`.

### Step 1: Create `src/components/FooterBackground.tsx`

A WebGL canvas component that renders subtle white topographic lines on a near-black background (`#0a0a0a`). Uses the same noise/topo pattern as `ProceduralBackground.tsx` but with muted grayscale colors. Canvas auto-sizes to parent element. No dependencies needed.

### Step 2: Update footer in `src/pages/Home.tsx` (lines 635–770)

**2a.** Add import: `import FooterBackground from "@/components/FooterBackground";`

**2b.** Inside the footer div (line 640, after the opening tag), add `<FooterBackground />` as the first child.

**2c.** Wrap all existing footer content (lines 641–770, from the blue accent line through the bottom bar) in a `<div style={{ position: "relative", zIndex: 1 }}>` so text sits above the canvas.

The footer div already has `position: "relative"` — the canvas positions itself absolutely behind all content. The `background: "#0a0a0a"` stays as WebGL fallback.

### No other changes
No new dependencies. No changes to layout, text, buttons, or any other section.

