

## Plan: Hack Bar Mobile Hero — Background Image + Large Centered Title

Single-file edit in `src/pages/HuellaRoja.tsx`. Mobile-only (<768px). Desktop hero untouched.

### 1. Save the uploaded image
- Copy `user-uploads://HERO_MOBILE.jpg` → `public/hackbar/hero-mobile.jpg`.

### 2. Hide existing hero on mobile
- The current `<section className="hr-hero">` (line 416) becomes desktop-only by adding `hidden md:flex` to its className. The existing media query rules for `.hr-hero*` become unnecessary for layout (kept harmlessly, since the section is hidden).

### 3. Add a new mobile-only hero block (just before the existing hero `<section>`)

```tsx
{/* Mobile Hero — full-screen image + large centered HACK BAR */}
<section className="flex md:hidden" style={{
  position: "relative", minHeight: "100vh", width: "100%",
  overflow: "hidden", alignItems: "center", justifyContent: "center",
  backgroundColor: "#0a0a0a",
}}>
  <img src="/hackbar/hero-mobile.jpg" alt="Hack Bar" style={{
    position: "absolute", inset: 0, width: "100%", height: "100%",
    objectFit: "cover", objectPosition: "center", zIndex: 0,
  }} />
  {/* dark overlay 0.45 */}
  {/* red ambient radial glow */}
  {/* bottom fade to #0a0a0a */}
  <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
    <h1 style={{
      fontFamily: "'Michroma', sans-serif",
      fontSize: "clamp(60px, 18vw, 100px)",
      color: "#FFFFFF", textTransform: "uppercase",
      letterSpacing: "0.06em", lineHeight: 1.05,
      textShadow: "0 0 40px rgba(255,59,59,0.2)",
    }}>HACK<br />BAR</h1>
  </div>
</section>
```

### Notes
- Title is plain `<h1>` (no TextScramble) per spec — only "HACK BAR" in two stacked lines, no subtitle, no CTA.
- Desktop hero (`hr-hero` section) keeps TextScramble title, BLUEPRINT meta strip, image placeholder column.
- No changes to Dock, Fuel, Station, Chef, 3D Carousel, Footer, or any other page.

### Files Modified
- `src/pages/HuellaRoja.tsx`
- `public/hackbar/hero-mobile.jpg` (new)

