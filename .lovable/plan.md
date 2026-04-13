

## Plan: Fix Build Error + Add Video to Reset Card

Two changes to `src/pages/Home.tsx`, plus copying the uploaded video file.

### Fix 1: Remove extra closing `</div>` (line 370)

Line 370 has a stray `</div>` that prematurely closes the White Zone Wrapper. This causes the actual `</div>` at line 616 to try closing `<motion.div>`, triggering the build error.

**Action**: Delete line 370 entirely. The correct nesting is:
- Line 278: `<div ref={aboutRef}>` → closes at line 369
- Line 279: `<div className="about-section-new">` → closes at line 368
- Line 274: White Zone Wrapper → closes at line 616

### Fix 2: Copy uploaded video to `public/videos/blueprint-reset.mp4`

Copy the user's uploaded MP4 to `public/videos/blueprint-reset.mp4`.

### Fix 3: Replace Reset card image with video

In the Programs section (line 410-413), the three cards are rendered from an array. The Reset card (3rd item) currently uses `img: slider3`. 

**Approach**: Instead of modifying the shared `.map()` render logic, add a `video` field to only the Reset item (`video: "/videos/blueprint-reset.mp4"`). Then in the card render (line 428), conditionally render a `<video>` instead of `<img>` when `item.video` exists:

```tsx
{item.video ? (
  <video className="pillar-card-img" autoPlay muted loop playsInline style={{
    position: "absolute", inset: 0, width: "100%", height: "100%",
    objectFit: "cover", transition: "transform 0.6s ease",
  }}>
    <source src={item.video} type="video/mp4" />
  </video>
) : (
  <img className="pillar-card-img" src={item.img} alt={item.name} style={{
    position: "absolute", inset: 0, width: "100%", height: "100%",
    objectFit: "cover", transition: "transform 0.6s ease",
  }} />
)}
```

### Files
- `src/pages/Home.tsx` — remove extra `</div>` at line 370 + add video conditional in programs cards
- `public/videos/blueprint-reset.mp4` — copy uploaded file

### No other changes
Hero, Video section, Feature Rows, Footer, Dock all untouched. No new dependencies.

