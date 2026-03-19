

## Plan: Fix hero headline centering and baseline alignment

### File 1: `src/pages/MainLanding.tsx`

**Fix 1 — Remove `paddingLeft: '3%'`** (line 231):
Change the headline wrapper to `paddingLeft: 0`.

**Fix 2 — Fix blue text wrapper** (lines 246-260):
Remove `top: '5px'`, set `lineHeight: 1`, `verticalAlign: 'baseline'`, `top: 0`. Remove `textAlign: 'left'` (set to `center` or remove). Keep `position: 'relative'`.

```
// Updated hero-headline-blue span style:
color: '#1A6BFF',
fontFamily: 'Bebas Neue, sans-serif',
fontWeight: 400,
fontSize: 'clamp(56px, 6vw, 88px)',
lineHeight: 1,
display: 'inline-block',
minWidth: '600px',
textAlign: 'left',
verticalAlign: 'baseline',
position: 'relative',
top: 0,          // was '5px'
padding: 0,
margin: 0
```

### File 2: `src/components/ui/word-rotate.tsx`

**Fix 3 — Update wrapper span** (line 25):
Change `height: "1em"` to `height: "1em"` (keep), set `lineHeight: "1"` (not `"inherit"`), `verticalAlign: "baseline"`, `top: 0`.

**Fix 4 — Update inner motion.span** (line 34):
Change from simple absolute positioning to flex-based bottom alignment:

```
style={{
  position: "absolute",
  left: 0,
  top: 0,
  bottom: 0,
  display: "flex",
  alignItems: "flex-end",
  whiteSpace: "nowrap",
  lineHeight: "1",
  transform: "none"
}}
```

This anchors the rotating blue text to the bottom of its container, matching the white text baseline. The `height: 1em` on the wrapper sized to the font creates the correct bounding box, and `alignItems: flex-end` pins the text to the baseline.

### Summary of changes
- **2 files** edited: `MainLanding.tsx` (remove padding-left, remove top offset) and `word-rotate.tsx` (flex-end alignment for baseline match)
- No content, font sizes, subtext, or other components changed

