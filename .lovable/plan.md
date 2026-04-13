

## Plan: Make Program Card Borders More Visible

Single file: `src/pages/Home.tsx`

### Change: Update border and boxShadow values (lines 422-426)

Since the cards already use `item.rgba` dynamically, just update the opacity/thickness values:

**Line 422** — default border: `1.5px solid ... 0.3` → `2px solid ... 0.5`

**Line 423** — default boxShadow: remove inset glow, update to `0 0 15px rgba(${item.rgba}, 0.1), 0 0 40px rgba(${item.rgba}, 0.05)`

**Line 425** — hover border: `1.5px solid ... 0.6` → `2px solid ... 0.85`, hover boxShadow: `0 0 25px rgba(${item.rgba}, 0.2), 0 0 60px rgba(${item.rgba}, 0.1)`

**Line 426** — mouseLeave: reset to same default values as lines 422-423

No other changes. Corner brackets, fingerprints, content all untouched.

