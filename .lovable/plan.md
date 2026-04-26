# Performance Optimization 4/4 — Lighthouse Audit + Targeted Fixes

This phase has two halves:
1. **You** run Lighthouse against the deployed URL (I cannot run a real Chrome audit from inside the sandbox).
2. **I** apply only the fixes that the audit actually flags, picking from a pre-scoped menu I've already mapped to your codebase.

---

## Step 1 — You run the audit

Use Chrome on the published URL (`https://blueprint-auth-glow.lovable.app`) — not the preview, not localhost.

1. Open the site in Chrome → DevTools (`Cmd/Ctrl + Shift + I`) → **Lighthouse** tab
2. Mode: **Navigation** · Device: **Mobile** · Categories: Performance, Accessibility, Best Practices, SEO
3. Click **Analyze page load**, wait ~30–60s
4. Send me back:
   - The 4 scores (Performance / A11y / Best Practices / SEO)
   - The list of **Opportunities** and **Diagnostics** that show in red or orange (just the title is enough — e.g. "Reduce unused JavaScript — 1.2s")

Optional: repeat with Device: Desktop for comparison.

---

## Step 2 — I apply the matching fixes

Once you send the report, I'll execute only the relevant fixes below. Each one is already scoped to the real files in your repo, so there's no exploration cost.

### Pre-flight fixes (I can do these now without waiting, low risk, almost certainly flagged)

These are issues I confirmed exist in the codebase by scanning it:

- **F-A — Strip stray `console.error` calls** in `NotFound.tsx` and `ShaderGrid.tsx` (Best Practices win, 3 lines).
- **F-B — Move 4 remaining heavy assets onto the responsive pipeline** (`?preset=responsive` + `<picture>`):
  - `reset-hero-desktop.jpg` (272 KB) and `reset-hero-mobile.jpg` (31 KB) in `HuellaVerde.tsx`
  - `meet-the-chef.jpg` (67 KB) in `HuellaRoja.tsx`
  - `/hackbar/hero-mobile.jpg` raw `<img>` in `HuellaRoja.tsx` line 453
  - Home slider images (`slider-1/2/3.jpg`) in `Home.tsx`
  - Accordion images in `interactive-image-accordion.tsx`
- **F-C — Add explicit `width`/`height` to all `<img>` in Home and Huella pages** (CLS prevention).

I'll do A+B+C as the baseline regardless of audit results because the codebase scan already proves they apply.

### Conditional fixes (I'll only run these if Lighthouse flags them)

| Lighthouse flag | What I'll do |
|---|---|
| LCP > 2.5s | Verify hero `<video>` poster preload + `fetchpriority="high"`; ensure `Michroma`/`Orbitron` use `font-display: swap` |
| Render-blocking resources | Convert non-critical CSS/JS to preload+swap pattern in `index.html` |
| Unused JavaScript | Add `rollup-plugin-visualizer`, identify top 3 offenders, lazy-import or tree-shake them |
| Properly size images | Audit `sizes` attribute on each `<picture>` |
| Next-gen formats | Catch any remaining raw `<img>` to JPG/PNG and route through pipeline |
| CLS > 0.1 | Tune `placeholderHeight` on each `LazyMount`, add `aspect-ratio` to hero video |
| Long main-thread tasks | Add `IntersectionObserver` pause to `ProceduralBackground`, `ProceduralBackgroundWhite`, `FooterBackground`, and `ShaderGrid` WebGL render loops when off-screen; pause infinite CSS animations via `animation-play-state` |
| A11y < 90 | Fix specific items the report names (alt text, aria-label, contrast, heading order) |
| SEO < 90 | Add missing OG/Twitter/description tags, confirm `robots.txt` |
| Best Practices < 90 | Clear console errors, fix any 404s the report names |

### Expected runtime cost

- Pre-flight (A+B+C): ~1 round, no risk to layout.
- Conditional fixes: 1 round per group of related flags.

---

## Step 3 — Re-audit and close

After fixes ship to the published URL, you re-run Lighthouse and send the new scores. If everything is ≥80 across the board (or whatever target you want), this closes the 4-prompt performance series.

---

## Technical notes (for reference)

- Codebase scan confirmed only 2 files (`HuellaRoja.tsx`, `HuellaVerde.tsx`) have any imports on the `?preset=responsive` pipeline today; everything else still ships the original-resolution asset.
- The two largest unprocessed assets (`hero-hackbar-desktop.jpg` 2.1 MB, `infrared-sauna-green.png` 1.9 MB) are already on the pipeline.
- Only 3 `console.*` calls exist in the source — trivial cleanup.
- All WebGL backgrounds (`ProceduralBackground`, `ProceduralBackgroundWhite`, `FooterBackground`, `ShaderGrid`) currently run their `requestAnimationFrame` loop unconditionally; pausing them off-screen is the single biggest "long task" win available if Lighthouse flags it.
- I cannot run Lighthouse myself — it requires a real Chrome instance against the deployed origin. The browser tool inside Lovable can profile the preview but those numbers don't reflect the production bundle, so they'd be misleading.
