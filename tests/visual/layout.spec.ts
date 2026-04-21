import { test, expect } from "../../playwright-fixture";
import { prepPage } from "./helpers";
import { thresholdFor } from "./thresholds";

/**
 * Visual regression suite — catches aspect-ratio, spacing, and border-radius
 * issues across mobile (390px) and desktop (1280px) viewports.
 *
 * Snapshots live under tests/visual/__snapshots__/. Update intentional changes
 * with `--update-snapshots`.
 *
 * Determinism comes from `prepPage` (helpers.ts), which bypasses the biometric
 * intro via the in-app E2E switch and injects an animation-killing style tag.
 * Per-route diff tolerances are centralized in thresholds.ts.
 */

const ROUTES = [
  { name: "home", path: "/" },
  { name: "main-landing", path: "/blueprint-lab" },
  { name: "huella-roja", path: "/huella-roja" },
  { name: "huella-verde", path: "/huella-verde" },
];

const VIEWPORTS = [
  { name: "mobile-390", width: 390, height: 844 },
  { name: "desktop-1280", width: 1280, height: 800 },
];

for (const viewport of VIEWPORTS) {
  test.describe(`Visual @ ${viewport.name}`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    for (const route of ROUTES) {
      test(`${route.name} — full page`, async ({ page }) => {
        await prepPage(page, route.path);

        const t = thresholdFor(route.name, viewport.name);
        await expect(page).toHaveScreenshot(`${route.name}-${viewport.name}.png`, {
          fullPage: true,
          maxDiffPixelRatio: t.maxDiffPixelRatio,
          threshold: t.threshold,
          animations: "disabled",
        });
      });
    }
  });
}

test.describe("Visual @ critical regions (mobile 390)", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("home — about edge-to-edge image (16:9, rounded, spacing)", async ({ page }) => {
    await prepPage(page, "/");

    const target = page.locator('img[alt="Designed for the human machine"]').first();
    await target.scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);

    const wrapper = target.locator(
      "xpath=ancestor::div[contains(@class,'block') and contains(@class,'md:hidden')][1]"
    );
    const t = thresholdFor("home", "mobile-390");
    await expect(wrapper).toHaveScreenshot("home-about-edge-image-mobile.png", {
      maxDiffPixelRatio: t.maxDiffPixelRatio,
      threshold: t.threshold,
      animations: "disabled",
    });
  });
});

/**
 * Targeted Huella Verde mobile snapshots — focused on layout invariants:
 * card border-radius, grid gap, min-height, and section padding. These
 * scoped snapshots catch regressions full-page diffs would smear over.
 */
test.describe("Visual @ Huella Verde regions (mobile 390)", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("hv-grid-top — 3-card recovery grid (rounded 14, gap 20, min-h 320)", async ({ page }) => {
    await prepPage(page, "/huella-verde");

    const grid = page.locator(".hv-grid-top").first();
    await grid.scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);

    // Layout invariant assertions.
    const gap = await grid.evaluate((el) => getComputedStyle(el).gap);
    expect(gap.startsWith("20px")).toBe(true);

    const firstCard = grid.locator(".hv-card").first();
    const radius = await firstCard.evaluate((el) => getComputedStyle(el).borderRadius);
    expect(radius).toBe("14px");
    const minH = await firstCard.evaluate((el) => parseFloat(getComputedStyle(el).minHeight));
    expect(minH).toBeGreaterThanOrEqual(240); // mobile override clamps to 240+

    const t = thresholdFor("huella-verde", "mobile-390");
    await expect(grid).toHaveScreenshot("hv-grid-top-mobile-390.png", {
      maxDiffPixelRatio: t.maxDiffPixelRatio,
      threshold: t.threshold,
      animations: "disabled",
    });
  });

  test("hv-grid-bot — 2-card recovery grid (rounded 14, gap 20)", async ({ page }) => {
    await prepPage(page, "/huella-verde");

    const grid = page.locator(".hv-grid-bot").first();
    await grid.scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);

    const gap = await grid.evaluate((el) => getComputedStyle(el).gap);
    expect(gap.startsWith("20px")).toBe(true);

    const firstCard = grid.locator(".hv-card").first();
    const radius = await firstCard.evaluate((el) => getComputedStyle(el).borderRadius);
    expect(radius).toBe("14px");

    const t = thresholdFor("huella-verde", "mobile-390");
    await expect(grid).toHaveScreenshot("hv-grid-bot-mobile-390.png", {
      maxDiffPixelRatio: t.maxDiffPixelRatio,
      threshold: t.threshold,
      animations: "disabled",
    });
  });

  test("fingerprint-card — Blueprint Lab mobile bento", async ({ page }) => {
    await prepPage(page, "/blueprint-lab");

    // The fingerprint scan card lives inside the mobile-only bento column.
    const card = page
      .locator('[class*="bento-cell"], .bento-cell')
      .filter({ has: page.locator("text=/Security Level|Blueprint/i") })
      .first();

    // Fallback: target the BiometricScanCard root if the bento-cell class shifts.
    const target = (await card.count()) > 0 ? card : page.locator(".biometric-scan-card").first();

    await target.scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);

    const t = thresholdFor("main-landing", "mobile-390");
    await expect(target).toHaveScreenshot("fingerprint-card-mobile-390.png", {
      maxDiffPixelRatio: t.maxDiffPixelRatio,
      threshold: t.threshold,
      animations: "disabled",
    });
  });
});
