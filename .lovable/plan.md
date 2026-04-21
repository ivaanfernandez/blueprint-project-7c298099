
## Plan: Rename "PRECISION TRAINING" → "PROFESSIONAL TRAINING" in Home

Single-string change in `src/pages/Home.tsx`, scoped to the first feature of the "DESIGNED FOR THE HUMAN MACHINE" About section.

### Change
- Locate every visible occurrence of the literal `PRECISION TRAINING` in `src/pages/Home.tsx` (data array feeding the features list and/or hardcoded JSX, both desktop and mobile renders).
- Replace each with `PROFESSIONAL TRAINING` (preserving uppercase to match the other three feature labels).

### Untouched
- Icon for the feature (blue layered-squares).
- Description copy ("Data-driven methodology built to forge strength, endurance, and resilience.").
- Other features: `NUTRITION ENGINEERING`, `RECOVERY SCIENCE`, `MENTAL GROWTH`.
- All styling, animations, scroll-reveal wrappers, and every other file in the project.

### Files modified
- `src/pages/Home.tsx` — text-only edit.
