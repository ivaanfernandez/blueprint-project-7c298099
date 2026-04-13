

## Plan: Force subtext to single-line per `<p>` with `white-space: nowrap`

Single file edit: `src/pages/Home.tsx`, lines 287-300.

### Change
- Add `overflow: "hidden"` to the parent `<div>` on line 287
- Add `whiteSpace: "nowrap"` to both `<p>` tags (lines 288-293 and 294-299)
- No other changes

