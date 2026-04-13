

## Plan: Fix About Title Overflow + Features Vertical Alignment

Single file: `src/pages/Home.tsx`

### Fix 1: Title overflow (line 313)

Remove `whiteSpace: "nowrap"` — at 936px viewport the title can't fit on one line. Let it wrap naturally. The `clamp(16px, 1.8vw, 24px)` sizing already keeps it on one line at larger viewports (~1100px+).

### Fix 2: Features grid stretching (line 325)

Add `gridTemplateRows: "1fr 1fr"` to force equal row distribution across the full grid height:

```
{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: 20, marginBottom: 0, flexGrow: 1, alignContent: "stretch" }
```

### Fix 3: Feature cards fill their grid cells (line 348)

Add `height: "100%"` to each feature card so they stretch to fill the 1fr rows, aligning the bottom row with the bottom of the photo.

### Technical notes
- 3 inline style tweaks, lines 313, 325, 348
- No other sections or files affected

