

## Plan: Video Section Full-Screen Edge-to-Edge

Single file change: `src/pages/Home.tsx`

### Changes

1. **Container (line 386-389)**: Remove `minHeight: 400`, change `height: "70vh"` → `"100vh"`, change `background: "#000"` → `"#0a0a0a"`.

2. **Video element (line 393)**: Change `objectFit: "contain"` → `"cover"`.

3. **Delete fade divs (lines 398-410)**: Remove both the left fade and right fade gradient overlay divs entirely.

4. **Mobile CSS (line 112-113)**: Change `height: 50vh` → `60vh`, remove `min-height: 280px`, remove the `.video-section-fades` rule (no longer needed since fades are deleted).

