import type { Variants } from "framer-motion";

// ── BLUR REVEAL: element fades in from blurred + transparent + slightly down,
//    ending sharp, opaque, in place. Sci-fi / tech feel.
export const blurReveal: Variants = {
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

// ── STAGGER CONTAINER: applies progressive delay to direct children.
//    Use as a wrapper for lists/grids. Children should use `blurRevealItem`.
export const staggerContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// ── BLUR REVEAL ITEM: child variant for use inside staggerContainer.
export const blurRevealItem: Variants = {
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

// ── DEFAULT PROPS for scroll-triggered reveal motion elements.
//    Usage: <motion.div {...scrollReveal} />
export const scrollReveal = {
  initial: "hidden" as const,
  whileInView: "visible" as const,
  viewport: { once: true, margin: "0px 0px -100px 0px" },
  variants: blurReveal,
};

// ── DEFAULT PROPS for stagger containers.
export const scrollStagger = {
  initial: "hidden" as const,
  whileInView: "visible" as const,
  viewport: { once: true, margin: "0px 0px -100px 0px" },
  variants: staggerContainer,
};
