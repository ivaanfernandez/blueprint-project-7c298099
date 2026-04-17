
Both requested changes were already implemented in the previous turn:

1. **Centering on mobile** — `.about-title-line` and `.about-subtext-line` already have `text-align: center !important` inside the `@media (max-width: 767px)` block in `src/index.css`, and the `<h2>` already carries the `about-title-line` class.
2. **"SCROLL TO EXPLORE" removed** — the `<motion.div>` containing the arrow + label was deleted from `src/pages/Home.tsx`, and the unused `scrollToAbout` helper was cleaned up.

No further changes are needed. Please verify in the mobile preview (<768px) that the title and subtitle are centered and the scroll indicator no longer appears. If anything still looks off, share a screenshot and I'll dig in.
