# Floating Card Heroes — Home, Lab, HackBar

Reset (Huella Verde) is already converted and will not be touched. This plan covers the 3 remaining heroes and flags two issues found while exploring.

## Issues to confirm before building

### 1. Lab (Huella Azul) is currently a placeholder
`src/pages/HuellaAzul.tsx` is 14 lines and renders only a centered `HUELLA AZUL` text on black — there is no real hero (no video, no title block, no dock, no background image). Wrapping it in `.lab-hero-wrapper` with a blue glow border will produce a thin blue-bordered black box around centered text, which will look broken rather than premium.

**Recommendation:** still apply the wrapper so the styling is in place for when the real hero ships, but you should know the visual result on this page will be minimal until the real Lab hero is built.

### 2. Home hero overlaps with the white section below it
The hero (`Home.tsx` line 271) is immediately followed by `.home-white-section` (line 430) which uses `marginTop: -24px` (mobile) / `-32px` (desktop) plus rounded top corners to emerge over the hero's black bottom. If we add 16px lateral padding + 24px border-radius to the hero, the white section will still be full-bleed and 16px wider than the hero card on each side, breaking the "card emerges from card" illusion at the seam.

**Two options:**
- **A (recommended):** also constrain `.home-white-section` to the same wrapper width (`padding: 0 16px / 12px / 8px` on a parent, or apply matching side padding) so both cards share the same edge. Keep the negative margin so the overlap effect is preserved.
- **B:** drop the negative-margin overlap on Home only and let the floating hero card sit cleanly above a full-bleed white section with a hard seam.

I will assume **Option A** unless you say otherwise.

## Changes

### `src/pages/Home.tsx`
- Wrap the hero `<div>` (lines 271–425) in `<div className="home-hero-wrapper">`, and add `className="home-hero"` to the hero div itself (keeping all existing inline styles, video, overlays, title, fade, GradualBlur untouched).
- The fixed dock (lines 245–266) sits outside the hero `<div>` and uses `position: fixed` — it stays untouched and will continue to float over the card correctly.
- To preserve the white-section emergence (Option A above), wrap `.home-white-section` (line 430) in a sibling `<div className="home-white-wrapper">` that mirrors the hero's lateral padding so the white card aligns with the hero card edges. The negative margin and rounded top corners stay.
- Append CSS to the page's existing `<style>` block:

```css
.home-hero-wrapper { width: 100%; padding: 0 16px; background: #0a0a0a; }
.home-hero { border-radius: 24px; overflow: hidden; border: 0.5px solid rgba(255,255,255,0.15); position: relative; }
.home-hero::after { content:''; position:absolute; inset:0; border-radius:24px; pointer-events:none;
  box-shadow: 0 0 40px rgba(255,255,255,0.04) inset; z-index:1; }
.home-white-wrapper { width: 100%; padding: 0 16px; background: #0a0a0a; }
@media (max-width:1023px) and (min-width:768px) {
  .home-hero-wrapper, .home-white-wrapper { padding: 0 12px; }
  .home-hero { border-radius: 20px; }
}
@media (max-width:767px) {
  .home-hero-wrapper, .home-white-wrapper { padding: 0 8px; }
  .home-hero { border-radius: 16px; }
}
```

### `src/pages/HuellaRoja.tsx`
HackBar has **two hero sections** — mobile (`.flex md:hidden`, line 455) and desktop (`.hr-hero hidden md:flex`, line 491). Both need to be wrapped so the floating-card effect applies on every viewport.

- Wrap both hero `<section>` elements in a shared `<div className="hackbar-hero-wrapper">…</div>` (one wrapper that contains both, since only one is visible at a time per breakpoint). Add `className="hackbar-hero"` to each section (preserving existing classes: `hr-hero hidden md:flex hackbar-hero` and `flex md:hidden hackbar-hero`).
- The dock (line 440) is `position: fixed` and stays outside — untouched.
- The "About Blueprint HackBar" section (line 546) is **not** touched; its white background and the dramatic transition from the black hero card to the white About section is preserved as intentional.
- Append CSS to the page's existing `<style>` block:

```css
.hackbar-hero-wrapper { width: 100%; padding: 0 16px; background: #0a0405; }
.hackbar-hero { border-radius: 24px; overflow: hidden; border: 0.5px solid rgba(255,59,59,0.3); position: relative; }
.hackbar-hero::after { content:''; position:absolute; inset:0; border-radius:24px; pointer-events:none;
  box-shadow: 0 0 40px rgba(255,59,59,0.08) inset; z-index:1; }
@media (max-width:1023px) and (min-width:768px) {
  .hackbar-hero-wrapper { padding: 0 12px; }
  .hackbar-hero { border-radius: 20px; }
}
@media (max-width:767px) {
  .hackbar-hero-wrapper { padding: 0 8px; }
  .hackbar-hero { border-radius: 16px; }
}
```

### `src/pages/HuellaAzul.tsx`
Currently a 14-line placeholder. Will wrap the existing `<div>` in `<div className="lab-hero-wrapper"><section className="lab-hero">…</section></div>` and add a small inline `<style>` block scoped to the page:

```css
.lab-hero-wrapper { width: 100%; padding: 0 16px; background: #050610; min-height: 100vh; }
.lab-hero { min-height: 100vh; border-radius: 24px; overflow: hidden;
  border: 0.5px solid rgba(26,107,255,0.3); position: relative; background: #000; }
.lab-hero::after { content:''; position:absolute; inset:0; border-radius:24px; pointer-events:none;
  box-shadow: 0 0 40px rgba(26,107,255,0.08) inset; z-index:1; }
@media (max-width:1023px) and (min-width:768px) {
  .lab-hero-wrapper { padding: 0 12px; }
  .lab-hero { border-radius: 20px; }
}
@media (max-width:767px) {
  .lab-hero-wrapper { padding: 0 8px; }
  .lab-hero { border-radius: 16px; }
}
```

(See Issue #1 — visual will be a thin blue-bordered card with centered text until the real Lab hero is built.)

### Reset (Huella Verde)
Already converted. Verified the wrapper `.reset-hero-wrapper` and `.reset-hero` styles are in place with the green border `rgba(74,222,128,0.3)`. **No changes.**

## Out of scope / not touched

- Hero internal content (videos, images, titles, animations, dock icons, GradualBlur, fingerprint cards, HUD elements).
- Hero heights (`100vh` preserved everywhere).
- Fixed dock positioning on any page.
- HackBar About section, RecoveryRoom, white sections content, footers.
- Reset page.
- Other components or shared CSS files (`src/index.css`).
