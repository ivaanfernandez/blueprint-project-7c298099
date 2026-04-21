import type { Page } from "@playwright/test";

/**
 * Visual regression helpers. Centralizes the test-mode bypass + animation
 * neutering so individual specs stay tiny and deterministic.
 *
 * Bypass mechanics (see src/App.tsx):
 *   - localStorage.bp_skip_intro = "1"  → skip biometric scan
 *   - localStorage.bp_no_motion  = "1"  → set <html data-no-motion="true">
 *   - window.__BP_FORCE_COMPLETE__()    → force-complete intro at runtime
 *   - dispatchEvent("bp:force-complete-intro")
 */

/**
 * Prepares a page for visual snapshotting:
 *   1. Injects bypass flags into localStorage BEFORE first navigation.
 *   2. Navigates to `path`.
 *   3. Waits for fonts + idle network.
 *   4. Force-completes the biometric intro just in case the bypass flag missed.
 *   5. Injects an animation-killing <style> tag.
 *   6. Settles scroll-triggered reveals by scrolling end-to-end.
 */
export async function prepPage(page: Page, path: string): Promise<void> {
  await page.addInitScript(() => {
    try {
      window.localStorage.setItem("bp_skip_intro", "1");
      window.localStorage.setItem("bp_no_motion", "1");
      (window as unknown as { __BP_E2E__: boolean }).__BP_E2E__ = true;
    } catch {
      // ignore (private mode etc.)
    }
  });

  await page.goto(path);

  // Belt-and-suspenders: if the page mounted before our flag took effect,
  // force-complete the intro now. This resolves immediately on success.
  await forceCompleteIntro(page);

  await page.waitForLoadState("networkidle").catch(() => {});
  await page.evaluate(() => document.fonts?.ready).catch(() => {});

  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        transition-duration: 0s !important;
        transition-delay: 0s !important;
      }
    `,
  });

  // Settle scroll-triggered Framer Motion reveals.
  await page.evaluate(async () => {
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise((r) => setTimeout(r, 200));
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 200));
  });
}

/**
 * Force-completes the biometric intro by dispatching the custom event AND
 * calling the global escape hatch. No-op if the intro already completed.
 */
export async function forceCompleteIntro(page: Page): Promise<void> {
  await page
    .evaluate(() => {
      const w = window as unknown as { __BP_FORCE_COMPLETE__?: () => void };
      w.__BP_FORCE_COMPLETE__?.();
      window.dispatchEvent(new Event("bp:force-complete-intro"));
    })
    .catch(() => {});
}
