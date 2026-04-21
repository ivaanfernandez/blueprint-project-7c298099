

## Plan: Test-mode bypass + per-route diff thresholds + targeted Verde snapshots

Four sub-tasks, all isolated to test infrastructure and a tiny `App.tsx` guard. No production behavior changes for real users.

### 1. Global test-only bypass switch

**`src/App.tsx`** — read a one-time bypass signal at mount and skip the biometric scan entirely when present.

- Detect any of: `?e2e=1` query param, `localStorage.getItem("bp_skip_intro") === "1"`, or `window.__BP_E2E__ === true`.
- When detected, initial `phase` is `"landing"` and `showDock` is `true` immediately. The `<BiometricScan>` component never mounts.
- A second flag, `?nomotion=1` / `localStorage.bp_no_motion`, sets a `<html data-no-motion="true">` attribute that a CSS rule in `src/index.css` uses to neuter all CSS animations/transitions. Framer Motion already respects `prefers-reduced-motion` via the JS guard in `scrollAnimations.ts`; we'll extend that guard to also check `document.documentElement.dataset.noMotion === "true"` so JS-driven blur/parallax is skipped under the same flag.
- Same for `ParallaxImage.tsx` — short-circuit when the `data-no-motion` attribute is present.

These flags are opt-in — no production user ever sets them, so the live experience is unchanged.

### 2. Deterministic Playwright helper

**`tests/visual/helpers.ts`** (new) — shared utilities:

- `prepPage(page)` — sets `localStorage` flags **before** navigation via `page.addInitScript(...)`, runs `page.goto(path)`, waits for fonts + `networkidle`, injects an animation-killing `<style>` tag, scrolls to bottom and back to settle scroll-triggered reveals, returns. Replaces the per-test boilerplate in `layout.spec.ts`.
- `forceCompleteIntro(page)` — fallback for any future surprise gate: dispatches a `window` event `"bp:force-complete-intro"` and also calls `window.__BP_FORCE_COMPLETE__?.()` if present. `App.tsx` registers a listener that flips `phase` to `"landing"`. This means tests don't depend on `setTimeout(5500)` ever again — the helper resolves as soon as the landing root renders.
- The 5.5-second `skipBiometricIntro` is removed from the suite.

### 3. Configurable per-route/viewport pixel-diff thresholds

**`tests/visual/thresholds.ts`** (new) — single source of truth:

```ts
export const THRESHOLDS = {
  default: { maxDiffPixelRatio: 0.01, threshold: 0.2 },
  routes: {
    "home":          { "mobile-390": { maxDiffPixelRatio: 0.02 }, "desktop-1280": { maxDiffPixelRatio: 0.015 } },
    "main-landing":  { "mobile-390": { maxDiffPixelRatio: 0.02 } },
    "huella-roja":   { "mobile-390": { maxDiffPixelRatio: 0.025 } }, // ElectricBorder canvas noise
    "huella-verde":  { "mobile-390": { maxDiffPixelRatio: 0.02 } },
  },
} as const;

export function thresholdFor(route: string, viewport: string) { /* deep-merge default + override */ }
```

`layout.spec.ts` reads from this and spreads the result into `toHaveScreenshot(...)`. CI tweaks happen by editing one file; no test code touched. `threshold` (per-pixel color tolerance) absorbs font-rendering differences; `maxDiffPixelRatio` caps the overall diff.

### 4. Targeted Huella Verde mobile snapshots

In `layout.spec.ts`, add a new `describe("Visual @ Huella Verde regions (mobile 390)")` block with three focused snapshots:

- **`hv-grid-top`** — the 3-card recovery grid. Asserts `border-radius: 14px`, `gap: 20px`, `min-height: 320px`, and the section's `padding: 72px 7%`. Snapshot scoped to `.hv-grid-top` after `scrollIntoViewIfNeeded()`.
- **`hv-grid-bot`** — the 2-card grid. Same checks at `min-height: 220px`.
- **`fingerprint-card-mobile`** — Blueprint Lab's mobile bento `BiometricScanCard`. Scope to the `.bento-cell` ancestor; verifies `border-radius: 16px`, `padding: 32px 24px`, `max-width` of the bento mobile column.

Each region snapshot uses the `huella-verde` / `main-landing` thresholds from step 3. Region tests use `expect(locator).toHaveScreenshot(...)` to avoid full-page noise.

### Files modified / created

- `src/App.tsx` — add bypass-flag detection (production-safe, opt-in).
- `src/lib/scrollAnimations.ts` — extend reduced-motion guard to also check `data-no-motion`.
- `src/components/ParallaxImage.tsx` — same guard extension.
- `src/index.css` — add `html[data-no-motion="true"] *, *::before, *::after { animation: none !important; transition: none !important; }`.
- `tests/visual/helpers.ts` — new (`prepPage`, `forceCompleteIntro`).
- `tests/visual/thresholds.ts` — new (per-route/viewport overrides).
- `tests/visual/layout.spec.ts` — refactor to use helpers + thresholds; add Huella Verde region block; remove 5.5s wait.

### Untouched

- `BiometricScan.tsx` internals, `playwright.config.ts`, `playwright-fixture.ts`, all page content, navigation, dock, ScrollToTop, BackToHomeButton, snapshot baselines (will need a one-time `--update-snapshots` after merge).

