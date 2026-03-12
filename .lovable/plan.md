

# Fix GradientDots Visibility

## Problem
The GradientDots component is rendering but the dots are hard to see. The dots are 1px circles at 0.45 opacity — very subtle against the black background. Two adjustments will make them clearly visible while keeping the aesthetic dark and moody:

## Changes

**File: `src/components/ui/gradient-dots.tsx`**
- Increase opacity from `0.45` to `0.7` — makes the dots more prominent
- Increase dot size in the radial gradient from `1px` to `1.5px` — slightly larger dots catch the eye better
- Reduce spacing from `24px` to `20px` — tighter grid fills the screen more

These are subtle but meaningful tweaks — the background will read as a refined blue dot matrix pattern without overwhelming the fingerprint animation.

