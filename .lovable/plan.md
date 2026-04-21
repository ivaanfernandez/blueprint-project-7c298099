
## Plan: Hero — poster + preload + fade-in, mobile = image only

Two files touched: `src/pages/Home.tsx` (hero block lines ~195–266) and `index.html` (preload links). Plus copy the uploaded poster into `public/`.

### 1. Add poster asset
Copy the uploaded fingerprint poster to `public/poster_image.jpg` so `/poster_image.jpg` resolves at runtime. Filename kept exactly as specified.

### 2. Rewrite hero background block (`src/pages/Home.tsx`, ~195–266)
Keep the outer hero `<div>` (background `#070612`/black, `minHeight: 100vh`, flex centering, `overflow: hidden`) — only the background media layer changes. Inside it, before the existing dark overlay + `TextScramble` + bottom fade, render two breakpoint-scoped layers:

- **Desktop (`hidden md:block`, `position: absolute, inset: 0`)**:
  - `<img src="/poster_image.jpg">` — `objectFit: cover`, `objectPosition: center center`, `zIndex: 1`, `aria-hidden`.
  - `<video src="/hero-bg.mp4" poster="/poster_image.jpg" autoPlay muted loop playsInline preload="auto">` — starts `opacity: 0`, `transition: opacity 0.8s ease-in-out`, `zIndex: 2`. `onLoadedData` sets `opacity: 1` on the element to crossfade in. Replaces the current `<source>`-based markup so we can attach `onLoadedData` and `poster` directly.
- **Mobile (`block md:hidden`, `position: absolute, inset: 0`)**:
  - Single `<img src="/poster_image.jpg">` — same cover/center styles, `zIndex: 1`. No `<video>` mounted on mobile, saving the 1.24 MB download.

The existing dark `rgba(0,0,0,0.65)` overlay stays but is bumped to `zIndex: 3` so it sits over both poster and video. The existing `hero-fade-bottom` gradient stays at `zIndex: 3` (now functions over either media). The `TextScramble` BLUEPRINT title is bumped from `zIndex: 2` to `zIndex: 4` so it stays above the new layering pile (poster 1 → video 2 → overlays 3 → content 4).

The floating dock above the hero (`position: fixed`, `zIndex: 50`) is untouched — its z-index already sits well above everything.

### 3. Preload links (`index.html`)
Inside `<head>`, after the existing Google Fonts `<link>` and before `</head>`, add:
```html
<link rel="preload" as="image" href="/poster_image.jpg" />
<link rel="preload" as="video" href="/hero-bg.mp4" type="video/mp4" media="(min-width: 768px)" />
```
The `media` attribute on the video preload prevents mobile browsers from prefetching the 1.24 MB video.

### Layering summary
```text
zIndex 1  → poster <img>
zIndex 2  → <video> (desktop only, fades 0→1 on loadeddata)
zIndex 3  → dark overlay + bottom black fade
zIndex 4  → TextScramble BLUEPRINT PROJECT title
zIndex 50 → floating Dock (already fixed, untouched)
```

### Untouched
- `<source>` → direct `src` swap on `<video>` is intentional (needed for `onLoadedData` + `poster`); all other video props (`autoPlay`, `muted`, `loop`, `playsInline`) preserved.
- Dock, BLUEPRINT title content/animation, bottom fade height/colors, white-card About wrapper (`borderTopLeftRadius`, `marginTop` negative), every section after the hero.
- `HuellaAzul.tsx`, `HuellaRoja.tsx`, `HuellaVerde.tsx`, `MainLanding.tsx`, all other files.

### Files modified / created
- `public/poster_image.jpg` — new (copied from upload).
- `src/pages/Home.tsx` — hero background block only.
- `index.html` — two preload `<link>` tags in `<head>`.
