

## Home Hero — Aggressive Preload + Cache Hardening

The Home hero already uses `preload="auto"` and a poster crossfade, but it's missing modern priority hints, the cache layer, and a defensive ready-state check. This plan adds those without changing behavior or visuals.

The user also mentioned a "lightweight loading indicator for asynchronous data sections in Home" — Home has no async data fetches (only static images, intervals, and the hero video). So no spinner is added; the work is purely hero preload.

### 1. `index.html` — verify `<head>` preload tags

Current `<head>` already has preload tags for poster + both videos. Add `fetchpriority="high"` to each so modern browsers prioritize them above CSS/JS:

```html
<link rel="preload" as="image" href="/poster_image.jpg" fetchpriority="high" />
<link rel="preload" as="video" href="/hero-bg.mp4" type="video/mp4" fetchpriority="high" media="(min-width: 768px)" />
<link rel="preload" as="video" href="/hero-bg-mobile.mp4" type="video/mp4" fetchpriority="high" media="(max-width: 767px)" />
```

### 2. `src/pages/Home.tsx` — harden hero markup

Two `<img>` poster tags (desktop + mobile blocks) and two `<video>` tags. Apply per element:

- Posters: add `fetchPriority="high"`, `loading="eager"`, `decoding="async"`.
- Videos: keep `preload="auto"`, `autoPlay muted loop playsInline`, `src`, and the existing crossfade. Replace the inline `onLoadedData` style mutation with a small `videoReady` state + `useEffect` that listens to `canplay` and also checks `videoRef.current.readyState >= 3` on mount (handles cached returns where the event already fired). Poster `opacity` becomes `videoReady ? 0 : 1`; video `opacity` becomes `videoReady ? 1 : 0`. One state per video (desktop + mobile) since both blocks render but only the matching one is visible.

No structural changes: the desktop/mobile split, Silk background, hero text, CTAs, dock, and all sections below stay identical.

### 3. `vercel.json` — long-lived cache for hero assets

Add (or extend) at project root:

```json
{
  "headers": [
    { "source": "/poster_image.jpg",   "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }] },
    { "source": "/hero-bg.mp4",        "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }] },
    { "source": "/hero-bg-mobile.mp4", "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }] }
  ]
}
```

If `vercel.json` already exists, merge into the existing `headers` array without removing other entries.

### Out of scope (unchanged)

- Pillar pages (Huella Azul / Roja / Verde) and their loaders.
- Silk background, dock, About slider, Lab slider, Hackbar slider intervals.
- Filenames `/poster_image.jpg`, `/hero-bg.mp4`, `/hero-bg-mobile.mp4`.
- Video attributes `muted`, `loop`, `playsInline`, no controls, no audio.
- No new spinner — Home has no async data sections that need one.

### Files modified

- `index.html` — add `fetchpriority="high"` to existing preload links.
- `src/pages/Home.tsx` — `videoReady` state + `canplay`/`readyState` effect; `fetchPriority`/`loading`/`decoding` on posters.
- `vercel.json` — create or extend with cache-control headers for hero assets.

