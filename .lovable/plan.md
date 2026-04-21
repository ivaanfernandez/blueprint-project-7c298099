

## Plan: Home Hero → About card transition + remove subtitle

Single-file edit in `src/pages/Home.tsx`.

### Change 1 — Remove the About subtitle
Delete lines 299–305 (the entire `<p className="about-subtext-line">…Where human performance connects his mind, body and soul.…</p>`). Nothing references that classname elsewhere, so no orphaned styles to clean up.

The first feature card already has `marginTop: 0` via the flex column, but the title currently has `marginBottom: 10`. After removing the subtitle, bump the `<h2>`'s `marginBottom` from `10` to `48` on desktop / `32` on mobile so the title-to-features gap stays balanced.

### Change 2 — Remove the gray gradient transition strip
Delete the `<div>` at lines 268–276 (`background: "linear-gradient(to bottom, #000000, #FFFFFF)"`). The hero already ends in solid black via `hero-fade-bottom` (line 255–264), so removing this strip leaves a clean black edge.

### Change 3 — Card effect on the About white zone
Modify the white-zone wrapper at line 281 (`<div style={{ position: "relative", background: "#FFFFFF" }}>`) to apply the card emergence effect.

Desktop styles:
```
background: #FFFFFF;
borderTopLeftRadius: 32;
borderTopRightRadius: 32;
marginTop: -32;
position: relative;
zIndex: 2;
```

Mobile (`window.innerWidth < 768`): swap to `borderTopLeftRadius: 24`, `borderTopRightRadius: 24`, `marginTop: -24`.

No `overflow: hidden` on this wrapper (would clip the rounded corners' shadow / inner ProceduralBackgroundWhite). The inner `about-section-new` already provides the `64px 7%` padding — we are NOT adding the prompt's `padding: 80px 7% 96px` because it would double the inner padding and stretch the section. The white-zone wrapper stays a pure positioning/clipping shell; the existing `about-section-new` handles padding.

The hero block above (the `<div>` ending at line 265) stays at its current `z-index: 1` implicitly. The white wrapper now sits on top with `z-index: 2` and the negative margin, producing the card-emerging-over-black effect.

### Untouched
- Hero video, `hero-fade-bottom`, TextScramble title
- 3-fingerprint dock (separate fixed/sticky element, no overlap)
- `about-section-new` flex layout, slideshow crossfade, all 4 feature cards with animated glow borders
- "Choose Your Fingerprint" cards, "ENTER THE BLUEPRINT" footer
- All other pages

### Files modified
- `src/pages/Home.tsx` (only)

