

## Plan: Rotating image slideshow in "DESIGNED FOR THE HUMAN MACHINE"

### Target
`src/pages/Home.tsx`, lines 451–458 — the right-side `<img src={slider1}>` inside `.about-photo-col`.

### Steps

**1. Save uploaded images to `public/about/`**
Copy the 5 attached images via `lov-copy`:
- `user-uploads://IMG_5149.jpg` → `public/about/about-1.jpg`
- `user-uploads://AI_Door_Lock_Scheduler_Smart_Guest_Access_Home_Automation.jpeg` → `public/about/about-2.jpg`
- `user-uploads://12.jpeg` → `public/about/about-3.jpg`
- `user-uploads://Interactive_Wall_Home_Gym.jpeg` → `public/about/about-4.jpg`
- `user-uploads://Holographic_Kitchen_Assistant_-_Cook_with_Your_Own_AI_Chef.jpeg` → `public/about/about-5.jpg`

**2. Update imports (line 1)**
Change `import { useRef } from "react"` → `import { useRef, useState, useEffect } from "react"`.

**3. Add state + interval inside the Home component** (near top of component, alongside the existing `aboutRef`/`navigate`):
```tsx
const aboutImages = [
  "/about/about-1.jpg",
  "/about/about-2.jpg",
  "/about/about-3.jpg",
  "/about/about-4.jpg",
  "/about/about-5.jpg",
];
const [currentAboutImage, setCurrentAboutImage] = useState(0);
useEffect(() => {
  const id = setInterval(
    () => setCurrentAboutImage((p) => (p + 1) % aboutImages.length),
    4000
  );
  return () => clearInterval(id);
}, []);
```

**4. Replace lines 452–458** — keep wrapper `.about-photo-col` (preserves flex sizing, max-width, aspect ratio, border-radius, overflow). Replace the inner single `<img>` with the stacked-images crossfade:
```tsx
<div className="about-photo-col" style={{
  flex: "0 0 34%", maxWidth: 320, borderRadius: 16, overflow: "hidden", aspectRatio: "3/4",
  position: "relative",
}}>
  {aboutImages.map((src, index) => (
    <img
      key={src}
      src={src}
      alt={`Blueprint gym ${index + 1}`}
      style={{
        position: "absolute", top: 0, left: 0,
        width: "100%", height: "100%",
        objectFit: "cover", objectPosition: "center",
        transition: "opacity 1s ease-in-out",
        opacity: index === currentAboutImage ? 1 : 0,
      }}
    />
  ))}
</div>
```

### Notes
- No "7+ Years Experience" badge exists in this section — nothing extra to preserve.
- The `slider1` import stays (still used by the Programs section at line 501).
- Mobile behavior unchanged — wrapper visibility is governed by existing `.about-photo-col` CSS rules; the rotating layer inherits them.
- No new dependencies, no library — pure React state + CSS opacity transition.

### Files touched
- `public/about/about-1.jpg` … `about-5.jpg` (new, copied from uploads)
- `src/pages/Home.tsx` (import line, state/effect, lines 452–458)

