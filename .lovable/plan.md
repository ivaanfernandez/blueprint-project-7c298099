

## Plan: Restructure BentoGrid to 4 Equal Columns

### Changes — `src/components/BentoGrid.tsx` only

**Grid container**: Change from `grid-cols-2 md:grid-cols-6` to `grid-cols-2 md:grid-cols-4`. Keep `gap-3`, `max-w-[900px]`, `mx-auto`.

**All 4 cells get uniform height**: Add `min-h-[180px]` to `.bento-cell` base style. Remove `md:aspect-square` from MapCell (uniform height via min-height instead).

**Cell classes** (all cells): Remove col-span overrides. On a 4-col grid each cell is naturally 1 column. On mobile (2-col), each cell is naturally 1 column too → giving the 2×2 layout requested.

**Move InstagramCell into the grid**: Remove the separate `<div>` wrapper below the grid. Place `<InstagramCell />` as the 4th child inside the grid div.

**Remove Instagram cell's forced `h-24 md:h-auto`** — it will match other cells via the shared `min-h-[180px]`.

**Desktop (4 cols, 1 row):**
```text
[HACK BAR] [RESET] [Map] [Instagram]
```

**Mobile (2 cols, 2 rows):**
```text
[HACK BAR] [RESET]
[Map]      [Instagram]
```

No changes to cell internals, styling, hover effects, or any other components.

