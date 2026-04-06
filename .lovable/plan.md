

## Plan: Add Cinematic Video Section Before Programs

### What changes
Only `src/pages/Home.tsx` is modified. The uploaded video file is copied into the project.

### Steps

1. **Copy video file** — Copy `user-uploads://body-scan-screen-female-2026-01-28-05-04-48-utc.mp4` to `public/videos/blueprint-gym.mp4` (create `public/videos/` directory).

2. **Replace the `<SectionDivider />` at line 378-379** (between About and Programs) with:
   - `<SectionDivider />`
   - A new full-width video section with black background, autoplay/muted/loop/playsInline video, and four gradient fade overlays (left, right, top, bottom)
   - Another `<SectionDivider />`

   The video section will be a `<div>` with `position: relative`, `width: 100%`, `height: 70vh`, `minHeight: 400px`, `overflow: hidden`, `background: #000`. The video uses `objectFit: "cover"` to fill the container. Four absolutely-positioned gradient divs create edge fades blending into the white sections above and below.

3. **Add mobile styles** to the existing `@media (max-width: 767px)` block (around line 95):
   ```css
   .video-cinematic-section { height: 50vh !important; min-height: 280px !important; }
   .video-section-fades { width: 40px !important; }
   ```

### No other changes
- No new dependencies
- No changes to any other section, routing, or components

