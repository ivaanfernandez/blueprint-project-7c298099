
Goal: fix only the mobile hero headline in `MainLanding.tsx` for `< 768px`, without touching desktop behavior or other sections.

Implementation plan

1. Tighten the mobile overflow boundary
- In the mobile media query for `MainLanding.tsx`, set `.hero-content-wrapper` to `overflow: hidden !important;`.
- Keep overflow clipping scoped to mobile so no desktop layout changes.

2. Re-center the two headline lines properly
- In mobile styles, make both `.hero-headline-white` and `.hero-headline-blue` full-width block elements with:
  - `display: block`
  - `width: 100%`
  - `text-align: center`
- Explicitly override any desktop carryover causing split alignment:
  - remove/override `text-align: left`
  - ensure no `justify-content: flex-end`, auto margins, or fixed inline alignment remain active on mobile.
- Keep both lines on the same vertical center axis.

3. Prevent blue text cutoff on mobile
- Add `padding-left/right: 16px` to `.hero-headline-wrapper`.
- Reduce mobile headline size from the current `clamp(36px, 10vw, 56px)` to a smaller clamp so the longest rotating phrase, `IT'S A COMMUNITY`, fits within a 390px viewport with side padding.
- Change mobile headline text wrapping rules from rigid single-line behavior to safe wrapping:
  - `white-space: normal`
  - `word-break: normal`
  - `overflow-wrap: break-word` only if needed as a safety net
- This applies especially to the blue rotating line so it never renders off-screen.

4. Remove desktop width constraints from WordRotate on mobile
- The current `WordRotate` component measures the longest phrase and applies inline `width` and `minWidth`, which can lock the mobile line too wide.
- Update `src/components/ui/word-rotate.tsx` so the wrapper can be overridden responsively, using a dedicated class or mobile-safe styling approach.
- Then add a mobile-only override from `MainLanding.tsx` (or via the component class) so the rotating wrapper becomes:
  - `width: 100%`
  - `min-width: 0`
  - `max-width: 100%`
- Also center the animated inner span and allow it to wrap on mobile instead of staying `nowrap`.

5. Restore breathing room below the Dock
- The current mobile spacing (`.hero-content-wrapper` 40px + `.hero-headline-wrapper` 30px) is too tight.
- Increase mobile top spacing moderately so the visual gap between the Dock and `THIS ISN'T A GYM` lands around 60–80px.
- Only adjust mobile `padding-top`; leave desktop values untouched.

6. Keep all other requested mobile refinements intact
- Preserve the existing mobile CTA sizing, subtext sizing, and chevron spacing unless they conflict with the headline fix.
- Do not alter text content, Dock structure, hero image, desktop styles, or non-hero components.

Technical notes
- Root cause 1: `.hero-headline-blue` still inherits desktop-like sizing/alignment assumptions.
- Root cause 2: `WordRotate` currently sets inline `width`/`minWidth` from measured desktop text width, which mobile CSS cannot reliably fix unless the component itself becomes override-friendly.
- Root cause 3: `.word-rotate-inner` is currently `whiteSpace: "nowrap"` and absolutely positioned, which contributes to off-screen clipping when the phrase is longer than the viewport.

Files to update
- `src/pages/MainLanding.tsx`
- `src/components/ui/word-rotate.tsx`

Validation checklist
- On mobile 390px width, `IT'S A COMMUNITY` is fully visible.
- No horizontal overflow is visible in the hero.
- White and blue headline lines are centered to the same axis.
- Dock-to-headline spacing feels restored, not cramped.
- Desktop remains unchanged.
