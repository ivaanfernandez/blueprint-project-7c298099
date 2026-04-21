

## Add Neon Green Glitch Halftone Background to RESET Hero

The uploaded image will become the hero background, with a black radial fade ensuring the centered "RESET" word remains crisp and readable.

### What changes

**`src/pages/HuellaVerde.tsx` — HERO section only**

1. Copy the uploaded image to `src/assets/reset-hero-bg.jpg` and import it.
2. Inside the `<section>` for the hero (currently line 144), add a background image layer behind the title:
   - Full-bleed `<img>` absolutely positioned at `inset: 0`, `objectFit: cover`, `objectPosition: center`, `opacity: 0.85`.
   - Above it, a dark overlay using a radial gradient: transparent at the edges fading to near-black at the center, plus a subtle bottom-to-top linear darken — guarantees the white "RESET" stays legible regardless of where the green halftone falls.
3. Keep the existing ambient green glow and the green accent bottom line.
4. Title block stays exactly as-is: centered via the section's flex `alignItems: center` + `justifyContent: center`. "RESET" remains in Michroma, white, with its current green text-shadow — no copy or font changes.

### Layer stack (back → front)

```text
[ProceduralGroundBackground]   ← page-wide, untouched
  └─ <section> hero
       ├─ <img reset-hero-bg>          opacity 0.85, cover
       ├─ radial black fade overlay    center darkest → edges transparent
       ├─ existing green ambient glow  (kept)
       ├─ "RESET" title                centered, z-index 2
       └─ green accent bottom line     (kept)
```

### Black fade formula

```text
background:
  radial-gradient(ellipse at center,
    rgba(0,0,0,0.75) 0%,
    rgba(0,0,0,0.45) 40%,
    rgba(0,0,0,0.15) 80%,
    transparent 100%);
```

This darkens the area directly behind the word while letting the green glitch texture breathe at the edges.

### Scope guardrails

- Only the hero `<section>` is touched.
- No changes to Recovery Room grid, Premium Services, dock, footer, or background component.
- Mobile (390px): image uses `objectFit: cover` so the vertical glitch composition fills naturally; "RESET" title sizing untouched.

### Files modified

- `src/assets/reset-hero-bg.jpg` (new — copied from upload)
- `src/pages/HuellaVerde.tsx` (hero `<section>` only)

