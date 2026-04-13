

## Plan: About Section Multi-Color Icons, Dots, Line + Image Fix

Single file edit: `src/pages/Home.tsx`, lines 296–361.

### Change 1: Add color data to step array (lines 302-322)
Add a `color` and `rgba` property to each step object, then use them for icon stroke, icon box background/border, and dot styling.

- Precision Training: `color: "#1A6BFF"`, `rgba: "26,107,255"`
- Nutrition Engineering: `color: "#FF3B3B"`, `rgba: "255,59,59"`
- Recovery Science: `color: "#22C55E"`, `rgba: "34,197,94"`
- Mental Growth: `color: "#F59E0B"`, `rgba: "245,158,11"`

Each SVG `stroke` changes from hardcoded `#1A6BFF` to `step.color`.

### Change 2: Icon box uses step color (line 336)
- `background` → `rgba(${step.rgba}, 0.06)`
- Add `border: 1px solid rgba(${step.rgba}, 0.1)`

### Change 3: Timeline dots use step color (lines 327-331)
- `background` → `step.color`
- `boxShadow` → `0 0 0 2.5px rgba(${step.rgba}, 0.2)`

### Change 4: Timeline line gradient (line 299)
Replace `linear-gradient(to bottom, #1A6BFF, rgba(26,107,255,0.1))` with:
`linear-gradient(to bottom, #1A6BFF 0%, #FF3B3B 33%, #22C55E 66%, #F59E0B 100%)`

### Change 5: Image objectPosition (line 360)
Add `objectPosition: "center center"` to the img style.

### Change 6: Description fontSize (line 347)
Change from `14` to `15`.

No other sections touched. No new dependencies.

