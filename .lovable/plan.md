

## Plan: Hero Text Removal + About Subtext Replace + Footer Button Glows

Three independent edits in `src/pages/Home.tsx`, plus one CSS addition in `src/index.css`.

---

### Change 1: Remove Hero Subtitle

Delete the `TextScramble` element at lines 202-223 that renders "Where human performance connects his mind, body and soul." Remove the entire block including the blank line after it.

### Change 2: Replace About Subtext

Replace lines 287-300 (the `div.about-subtext-container` with two `<p>` tags) with a single `<p>`:

```tsx
<p className="about-subtext-line" style={{
  fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 400,
  color: "#6B7280", lineHeight: 1.6, marginTop: 16, marginBottom: 32,
  whiteSpace: "nowrap",
}}>
  Where human performance connects his mind, body and soul.
</p>
```

The existing mobile CSS override in `index.css` for `.about-subtext-line` already sets `white-space: normal`, `font-size: 14px`, and `line-height: 1.5` at `max-width: 767px` — no CSS changes needed.

### Change 3: Add Glow to Footer Buttons

**JOIN NOW button (lines 693-718):** Add blue glow `boxShadow` to default style, and update hover/leave handlers to toggle enhanced glow:
- Default: `boxShadow: "0 0 15px rgba(26,107,255,0.5), 0 0 30px rgba(26,107,255,0.3), 0 0 60px rgba(26,107,255,0.15)"`
- Hover: `boxShadow: "0 0 20px rgba(26,107,255,0.7), 0 0 40px rgba(26,107,255,0.4), 0 0 80px rgba(26,107,255,0.2)"`
- Leave: restore default shadow

**Instagram button (lines 720-754):** Add red glow `boxShadow` to default style, and update hover/leave handlers:
- Default: `boxShadow: "0 0 15px rgba(255,59,59,0.5), 0 0 30px rgba(255,59,59,0.3), 0 0 60px rgba(255,59,59,0.15)"`
- Hover: `boxShadow: "0 0 20px rgba(255,59,59,0.7), 0 0 40px rgba(255,59,59,0.4), 0 0 80px rgba(255,59,59,0.2)"`
- Leave: restore default shadow

Both buttons already have `borderRadius: 50` which produces pill/circular shapes — the glow will follow naturally.

---

### Files Modified
- `src/pages/Home.tsx` — all three changes
- No other files touched

