

## Plan: About Features SVG Icons + Programs Title Change

Single file: `src/pages/Home.tsx`

### Change 1: Replace blue accent bars with SVG icon boxes (lines 322-348)

Replace the features grid (lines 322-348) with an updated version:
- Add SVG icon data to each feature object (dumbbell, leaf, moon, lightbulb paths as specified)
- Replace the 3×28px blue bar div with a 44×44px icon box containing the SVG and a glow div (`className="about-feat-glow"`)
- Increase feature card styles: gap 14→14, padding 10→14, borderRadius 10→12, gap between icon and text 10→14
- Feature title fontSize 14→15, marginBottom 4→5
- Grid gap 14→16
- Add `className="about-feat"` to each feature div

### Change 2: Rename programs title (line 407)

Change `"OUR PROGRAMS"` → `"CHOOSE YOUR FINGERPRINT"`

### Change 3: Add CSS hover rules (line ~79)

Add to the `<style>` block:
```css
.about-feat { transition: all 0.3s ease; }
.about-feat:hover { border-color: rgba(26,107,255,0.1) !important; background: rgba(26,107,255,0.02) !important; }
.about-feat:hover .about-feat-glow { opacity: 1 !important; }
```

### Technical notes
- No new imports or dependencies
- SVGs are inline JSX with camelCase attributes (strokeWidth, strokeLinecap, strokeLinejoin)
- Hover glow on icon uses CSS class targeting, no JS state needed
- Feature card hover border/background also via CSS class

