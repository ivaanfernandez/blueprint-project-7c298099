

## Plan: Replace Hero Background with Video + Dark Overlay

Single file: `src/pages/Home.tsx` + copy uploaded video

### Steps

1. **Copy uploaded video** to `public/videos/blueprint-hero.mp4`

2. **Remove VerticalBeams import** (line 4): Delete `import VerticalBeams from "@/components/VerticalBeams";`

3. **Replace `<VerticalBeams beamCount={40} />`** (line 161) with video element + dark overlay:

```jsx
<video
  autoPlay
  muted
  loop
  playsInline
  style={{
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: 0,
  }}
>
  <source src="/videos/blueprint-hero.mp4" type="video/mp4" />
</video>

<div style={{
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.65)",
  zIndex: 1,
}} />
```

4. **Verify z-index on text elements** — already confirmed: title has `zIndex: 2`, subtitle has `zIndex: 2`, SCROLL TO EXPLORE has `zIndex: 3`. No changes needed.

### Technical notes
- Hero container keeps `background: "#070612"` as video fallback
- No new dependencies
- No other sections or files affected

