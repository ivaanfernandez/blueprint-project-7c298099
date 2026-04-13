

## Plan: Glassmorphism Features + Eliminate White Space

Single file: `src/pages/Home.tsx`

### Change 1: Section container — alignItems stretch (line 332)
Replace `alignItems: "flex-start"` with `alignItems: "stretch"` to force both columns to the same height as the photo.

### Change 2: Features grid styles (line 351)
Replace current grid styles with:
```
display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, flexGrow: 1
```
Remove `gridTemplateRows`, `marginBottom`, `alignContent` — let `flexGrow: 1` + stretch handle it.

### Change 3: Feature cards — glassmorphism + hover state (lines 373-400)
Add `useState` for hovered card tracking. Replace each feature card with:
- `className="glass-feat"`
- Glassmorphism styles: `background: "rgba(255,255,255,0.4)"`, `backdropFilter: "blur(12px)"`, `border: "1px solid rgba(255,255,255,0.6)"`, `boxShadow` with inset highlight, `borderRadius: 16`, `padding: 20`, `alignSelf: "stretch"`
- `onMouseEnter`/`onMouseLeave` to swap to hover styles (increased opacity/shadow)

### Change 4: Icon box background update (line 379)
Change to `background: "rgba(26,107,255,0.06)"`, `border: "1px solid rgba(26,107,255,0.08)"`

### Change 5: Add CSS fallback class (in `<style>` block)
Add `.glass-feat` and `.glass-feat:hover` CSS rules with `!important` as fallback for the glassmorphism effect.

### Change 6: Mobile override
In the existing `@media (max-width: 767px)` block, add:
- `.about-section-new { align-items: flex-start !important; }`
- `.glass-feat` grid: `flex-grow: 0`

### Technical notes
- Add `useState<string|null>` for hover tracking
- No new dependencies
- No other sections affected

