import { test, expect } from "../../playwright-fixture";

/**
 * Visual regression suite — catches aspect-ratio, spacing, and border-radius
 * issues across mobile (390px) and desktop (1280px) viewports.
 *
 * Snapshots are stored under tests/visual/__snapshots__/. To update after an
 * intentional change: run with `--update-snapshots`.
 *
 * Animations are disabled per-screenshot to keep snapshots deterministic.
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

// Bypass biometric intro screens that gate the pillar pages.
async function skipBiometricIntro(page: import("@playwright/test").Page) {
  // The intro components call onComplete after ~5s. Wait it out OR fast-forward.
  // Easiest: just wait for the intro to finish naturally on first navigation.
  await page.waitForTimeout(5500);
}

for (const viewport of VIEWPORTS) {
  test.describe(`Visual @ ${viewport.name}`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    for (const route of ROUTES) {
      test(`${route.name} — full page`, async ({ page }) => {
        await page.goto(route.path);

        // Pillar pages have a 5s biometric intro screen.
        if (route.path !== "/" && route.path !== "/blueprint-lab") {
          await skipBiometricIntro(page);
        }

        // Wait for fonts + lazy assets.
        await page.waitForLoadState("networkidle").catch(() => {});
        await page.evaluate(() => document.fonts?.ready);

        // Disable all CSS animations/transitions for stable snapshots.
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

        // Force any scroll-triggered Framer Motion reveals to settle by
        // scrolling once to the bottom and back to the top.
        await page.evaluate(async () => {
          window.scrollTo(0, document.body.scrollHeight);
          await new Promise((r) => setTimeout(r, 300));
          window.scrollTo(0, 0);
          await new Promise((r) => setTimeout(r, 300));
        });

        await expect(page).toHaveScreenshot(`${route.name}-${viewport.name}.png`, {
          fullPage: true,
          // Allow 1% pixel diff to absorb font hinting / canvas noise.
          maxDiffPixelRatio: 0.01,
          animations: "disabled",
        });
      });
    }
  });
}

test.describe("Visual @ critical regions (mobile 390)", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("home — about edge-to-edge image (16:9, rounded, spacing)", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle").catch(() => {});

    // Scroll to the About mobile image. It sits in the .about-section-new
    // flex column, after the 4 feature cards.
    const target = page.locator('img[alt="Designed for the human machine"]').first();
    await target.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);

    await page.addStyleTag({
      content: `*, *::before, *::after { animation-duration: 0s !important; transition-duration: 0s !important; }`,
    });

    // Snapshot the wrapper (includes border-radius + margins above/below).
    const wrapper = target.locator("xpath=ancestor::div[contains(@class,'block') and contains(@class,'md:hidden')][1]");
    await expect(wrapper).toHaveScreenshot("home-about-edge-image-mobile.png", {
      maxDiffPixelRatio: 0.01,
      animations: "disabled",
    });
  });
});
