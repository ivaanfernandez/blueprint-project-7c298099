import type { Variants } from "framer-motion";

// ── REDUCED-MOTION DETECTION (SSR-safe, read at module load).
//    Users who toggle the OS preference need a refresh.
//    Also honors the test-only `data-no-motion` attribute on <html>, set by
//    App.tsx when ?nomotion=1 / localStorage.bp_no_motion is present.
const prefersReducedMotion = (): boolean => {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  if (typeof document !== "undefined" && document.documentElement?.dataset?.noMotion === "true") {
    return true;
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

const REDUCE = prefersReducedMotion();

// ── Static (no-animation) variants for reduced-motion users.
//    Content stays fully visible, sharp, and in place.
const STATIC_VARIANT: Variants = {
  hidden: { opacity: 1, filter: "blur(0px)", y: 0 },
  visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0 } },
};

const STATIC_CONTAINER: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { duration: 0 } },
};

// ── BLUR REVEAL: element fades in from blurred + transparent + slightly down,
//    ending sharp, opaque, in place. Sci-fi / tech feel.
export const blurReveal: Variants = REDUCE ? STATIC_VARIANT : {
  hidden: {
    opacity: 0,
    filter: "blur(8px)",
    y: 20,
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1], // ease-out-quart — sharp, no bounce
    },
  },
};

// ── BLUR REVEAL NO-SHIFT: same as blurReveal but without y translation.
//    Use on wrappers around components that own their own layout (Accordion,
//    ElectricBorder SVG filters) where translating during reveal causes flicker.
export const blurRevealNoShift: Variants = REDUCE ? STATIC_VARIANT : {
  hidden: {
    opacity: 0,
    filter: "blur(8px)",
    y: 0,
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// ── SMALL-SCREEN DETECTION (read at module load).
//    On ≤480px screens (390px iPhone target), sections sit closer together so
//    we tighten the cascade and trigger reveals earlier.
const isSmallScreen = (): boolean => {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(max-width: 480px)").matches;
};

const SMALL = isSmallScreen();

// Stagger timings — tighter on mobile so the cascade reads as one motion.
const STAGGER_CHILDREN = SMALL ? 0.06 : 0.08;
const DELAY_CHILDREN = SMALL ? 0.03 : 0.05;

// ── STAGGER CONTAINER: applies progressive delay to direct children.
//    Use as a wrapper for lists/grids. Children should use `blurRevealItem`.
export const staggerContainer: Variants = REDUCE ? STATIC_CONTAINER : {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: STAGGER_CHILDREN,
      delayChildren: DELAY_CHILDREN,
    },
  },
};

// ── BLUR REVEAL ITEM: child variant for use inside staggerContainer.
export const blurRevealItem: Variants = REDUCE ? STATIC_VARIANT : {
  hidden: {
    opacity: 0,
    filter: "blur(8px)",
    y: 20,
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// ── Shared viewport config — fires when 15% (desktop) or 10% (≤480px mobile)
//    of the element is visible. Mobile uses a deeper bottom margin to fire
//    earlier, since each section nearly fills the viewport on a 390px screen.
const VIEWPORT_CONFIG = SMALL
  ? { once: true, amount: 0.1, margin: "0px 0px -15% 0px" }
  : { once: true, amount: 0.15, margin: "0px 0px -10% 0px" };

// ── DEFAULT PROPS for scroll-triggered reveal motion elements.
//    Usage: <motion.div {...scrollReveal} />
export const scrollReveal = {
  initial: "hidden" as const,
  whileInView: "visible" as const,
  viewport: VIEWPORT_CONFIG,
  variants: blurReveal,
};

// ── DEFAULT PROPS for reveals that should NOT translate vertically.
//    Use on wrappers around Accordions, ElectricBorder, etc.
export const scrollRevealNoShift = {
  initial: "hidden" as const,
  whileInView: "visible" as const,
  viewport: VIEWPORT_CONFIG,
  variants: blurRevealNoShift,
};

// ── DEFAULT PROPS for stagger containers.
export const scrollStagger = {
  initial: "hidden" as const,
  whileInView: "visible" as const,
  viewport: VIEWPORT_CONFIG,
  variants: staggerContainer,
};

/* ═══════════════════════════════════════════════════════════════════════
   CINEMATIC PRESETS — lab-tech / Blade Runner / Tron feel.
   Slide + scale + blur settle, out-quint easing, mobile-tuned distances.
   All collapse to STATIC_VARIANT under prefers-reduced-motion.
   ═══════════════════════════════════════════════════════════════════════ */

const CINE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const CINE_DURATION = SMALL ? 0.7 : 0.8;
const CINE_DURATION_LONG = SMALL ? 0.85 : 1.0;
const CINE_OFFSET = SMALL ? 40 : 60;
const CINE_BLUR = "blur(6px)";
const CINE_BLUR_HEAVY = "blur(8px)";
const CINE_BLUR_LIGHT = "blur(4px)";

export const cinematicSlideUp: Variants = REDUCE ? STATIC_VARIANT : {
  hidden: { opacity: 0, y: CINE_OFFSET, scale: 0.96, filter: CINE_BLUR },
  visible: {
    opacity: 1, y: 0, scale: 1, filter: "blur(0px)",
    transition: { duration: CINE_DURATION, ease: CINE_EASE },
  },
};

export const cinematicSlideLeft: Variants = REDUCE ? STATIC_VARIANT : {
  hidden: { opacity: 0, x: -CINE_OFFSET, scale: 0.96, filter: CINE_BLUR },
  visible: {
    opacity: 1, x: 0, scale: 1, filter: "blur(0px)",
    transition: { duration: CINE_DURATION * 0.875, ease: CINE_EASE },
  },
};

export const cinematicSlideRight: Variants = REDUCE ? STATIC_VARIANT : {
  hidden: { opacity: 0, x: CINE_OFFSET, scale: 0.96, filter: CINE_BLUR },
  visible: {
    opacity: 1, x: 0, scale: 1, filter: "blur(0px)",
    transition: { duration: CINE_DURATION * 0.875, ease: CINE_EASE },
  },
};

export const cinematicScaleFade: Variants = REDUCE ? STATIC_VARIANT : {
  hidden: { opacity: 0, scale: 0.92, filter: CINE_BLUR_HEAVY },
  visible: {
    opacity: 1, scale: 1, filter: "blur(0px)",
    transition: { duration: CINE_DURATION, ease: CINE_EASE },
  },
};

/* Glow color comes from CSS var --reveal-glow on a parent (per-pillar tint).
   Defaults to transparent → safe to apply anywhere even without a tint. */
export const cinematicGlowFade: Variants = REDUCE ? STATIC_VARIANT : {
  hidden: {
    opacity: 0, y: 20, scale: 0.98,
    filter: `${CINE_BLUR_LIGHT} drop-shadow(0 0 0 var(--reveal-glow, transparent))`,
  },
  visible: {
    opacity: 1, y: 0, scale: 1,
    filter: [
      `blur(0px) drop-shadow(0 0 24px var(--reveal-glow, transparent))`,
      `blur(0px) drop-shadow(0 0 0 transparent)`,
    ],
    transition: {
      duration: CINE_DURATION_LONG,
      ease: CINE_EASE,
      filter: { duration: CINE_DURATION_LONG * 1.6, ease: "easeOut" },
    },
  },
};

/* Capped-step stagger container: 100ms step, max ~600ms total cascade. */
const CINE_STAGGER_STEP = SMALL ? 0.08 : 0.1;
const CINE_DELAY_CHILDREN = SMALL ? 0.04 : 0.06;

export const cinematicStaggerContainer: Variants = REDUCE ? STATIC_CONTAINER : {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: CINE_STAGGER_STEP,
      delayChildren: CINE_DELAY_CHILDREN,
    },
  },
};

/* ── Helper props bundles (match the existing scrollReveal/scrollStagger pattern) ── */
export const scrollRevealCinematic = {
  initial: "hidden" as const,
  whileInView: "visible" as const,
  viewport: VIEWPORT_CONFIG,
  variants: cinematicSlideUp,
};

export const scrollRevealSlideLeft = {
  initial: "hidden" as const,
  whileInView: "visible" as const,
  viewport: VIEWPORT_CONFIG,
  variants: cinematicSlideLeft,
};

export const scrollRevealSlideRight = {
  initial: "hidden" as const,
  whileInView: "visible" as const,
  viewport: VIEWPORT_CONFIG,
  variants: cinematicSlideRight,
};

export const scrollRevealScaleFade = {
  initial: "hidden" as const,
  whileInView: "visible" as const,
  viewport: VIEWPORT_CONFIG,
  variants: cinematicScaleFade,
};

export const scrollRevealGlow = {
  initial: "hidden" as const,
  whileInView: "visible" as const,
  viewport: VIEWPORT_CONFIG,
  variants: cinematicGlowFade,
};

export const scrollStaggerCinematic = {
  initial: "hidden" as const,
  whileInView: "visible" as const,
  viewport: VIEWPORT_CONFIG,
  variants: cinematicStaggerContainer,
};
