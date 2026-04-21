/**
 * Per-route / per-viewport pixel-diff thresholds for visual regression.
 *
 * `maxDiffPixelRatio` — fraction of total pixels that may differ before fail.
 * `threshold`         — per-pixel YIQ color tolerance (0..1). Higher absorbs
 *                       font hinting / antialiasing noise without ignoring
 *                       structural changes.
 *
 * Tweak this file (no test code edits needed) when CI is too strict/loose.
 */

export interface Threshold {
  maxDiffPixelRatio: number;
  threshold: number;
}

type ViewportName = "mobile-390" | "desktop-1280";

const DEFAULT: Threshold = { maxDiffPixelRatio: 0.01, threshold: 0.2 };

const ROUTE_OVERRIDES: Record<string, Partial<Record<ViewportName, Partial<Threshold>>>> = {
  home: {
    "mobile-390": { maxDiffPixelRatio: 0.02 },
    "desktop-1280": { maxDiffPixelRatio: 0.015 },
  },
  "main-landing": {
    "mobile-390": { maxDiffPixelRatio: 0.02 },
  },
  // ElectricBorder canvas noise + animated gradient borders → looser ceiling.
  "huella-roja": {
    "mobile-390": { maxDiffPixelRatio: 0.025 },
  },
  "huella-verde": {
    "mobile-390": { maxDiffPixelRatio: 0.02 },
  },
};

export function thresholdFor(route: string, viewport: string): Threshold {
  const override = ROUTE_OVERRIDES[route]?.[viewport as ViewportName] ?? {};
  return { ...DEFAULT, ...override };
}
