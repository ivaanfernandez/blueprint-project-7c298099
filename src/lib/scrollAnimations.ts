import type { Variants } from "framer-motion";

// ── REDUCED-MOTION DETECTION (SSR-safe, read at module load).
//    Users who toggle the OS preference need a refresh.
const prefersReducedMotion = (): boolean => {
  if (typeof window === "undefined" || !window.matchMedia) return false;
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

// ── STAGGER CONTAINER: applies progressive delay to direct children.
//    Use as a wrapper for lists/grids. Children should use `blurRevealItem`.
export const staggerContainer: Variants = REDUCE ? STATIC_CONTAINER : {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
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

// ── Shared viewport config — fires when 15% of element is visible, with a
//    10% bottom margin. Scales naturally from 390px mobile to desktop.
const VIEWPORT_CONFIG = { once: true, amount: 0.15, margin: "0px 0px -10% 0px" } as const;

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
