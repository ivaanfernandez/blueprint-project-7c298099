import { useEffect } from "react";

/**
 * Watches frame rate using requestAnimationFrame for ~2 seconds.
 * If sustained FPS < 30, OR navigator.deviceMemory <= 2,
 * OR navigator.hardwareConcurrency <= 2, OR prefers-reduced-motion,
 * adds `verde-bg-lite` class to the element matching `selector`,
 * which switches the gradient to a slower, simpler animation.
 *
 * Runs once on mount. Cheap: ~120 rAF callbacks then disconnects.
 */
export function useLowPerfBackground(selector: string) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const apply = () => {
      const el = document.querySelector(selector);
      if (el && !el.classList.contains("verde-bg-lite")) {
        el.classList.add("verde-bg-lite");
      }
    };

    // Hard hints — apply immediately, skip FPS measurement
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const lowMemory =
      typeof (navigator as Navigator & { deviceMemory?: number }).deviceMemory === "number" &&
      (navigator as Navigator & { deviceMemory?: number }).deviceMemory! <= 2;
    const lowCores =
      typeof navigator.hardwareConcurrency === "number" && navigator.hardwareConcurrency <= 2;

    if (reducedMotion || lowMemory || lowCores) {
      apply();
      return;
    }

    // FPS sampling — measure for 2 seconds
    let frames = 0;
    let start = 0;
    let rafId = 0;
    let cancelled = false;

    const tick = (ts: number) => {
      if (cancelled) return;
      if (start === 0) start = ts;
      frames++;
      const elapsed = ts - start;
      if (elapsed < 2000) {
        rafId = requestAnimationFrame(tick);
      } else {
        const fps = (frames * 1000) / elapsed;
        if (fps < 30) apply();
      }
    };

    // Defer to idle to avoid competing with initial paint
    const startMeasure = () => {
      rafId = requestAnimationFrame(tick);
    };
    if ("requestIdleCallback" in window) {
      (window as Window & typeof globalThis).requestIdleCallback(startMeasure, { timeout: 1500 });
    } else {
      setTimeout(startMeasure, 800);
    }

    return () => {
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [selector]);
}
