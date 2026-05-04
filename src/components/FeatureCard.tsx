import { memo, useEffect, useMemo, useRef, useState, ReactNode, CSSProperties } from "react";
import { motion } from "framer-motion";
import { cinematicSlideUp } from "@/lib/scrollAnimations";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  variant: "desktop" | "mobile";
  /** Tint color for the icon container background (rgba "r,g,b" string). Desktop only. */
  rgba?: string;
  /** Index in the cascade sequence (0..n). When provided, card receives a one-shot scroll-in glow at index*200ms. */
  cascadeIndex?: number;
}

/* ── Static styles (module-scope, never re-created) ── */
const BASE_SHADOW =
  "0 1px 2px rgba(0, 0, 0, 0.04), 0 4px 12px rgba(0, 0, 0, 0.06), 0 12px 32px rgba(0, 0, 0, 0.05)";
const ACTIVE_SHADOW =
  "0 2px 4px rgba(0, 0, 0, 0.05), 0 8px 20px rgba(0, 0, 0, 0.08), 0 20px 48px rgba(0, 0, 0, 0.06)";
const GLOW_SHADOW =
  "0 0 0 1px #9CA3AF, 0 0 24px rgba(156, 163, 175, 0.45), 0 0 48px rgba(156, 163, 175, 0.15)";
const GLOW_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
const PREFERS_REDUCED_MOTION =
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const TITLE_DESKTOP_STYLE: CSSProperties = {
  fontFamily: "'Rajdhani', sans-serif",
  fontSize: 18,
  fontWeight: 600,
  color: "#000",
  letterSpacing: "1.5px",
  textTransform: "uppercase",
};

const TITLE_ROW_STYLE: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  marginBottom: 6,
};

const DESC_DESKTOP_STYLE: CSSProperties = {
  fontFamily: "'Inter', sans-serif",
  fontSize: 15,
  fontWeight: 300,
  color: "#6B7280",
  lineHeight: 1.6,
  paddingLeft: 44,
};

const ICON_BOX_MOBILE_STYLE: CSSProperties = {
  width: 40,
  height: 40,
  borderRadius: 12,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  background: "rgba(255, 255, 255, 0.5)",
  border: "1px solid rgba(0, 0, 0, 0.06)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.8)",
};

const TEXT_COL_MOBILE_STYLE: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 4,
  minWidth: 0,
  flex: 1,
};

const TITLE_MOBILE_STYLE: CSSProperties = {
  fontFamily: "'Michroma', sans-serif",
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: "0.02em",
  color: "#000",
  lineHeight: 1.3,
};

const DESC_MOBILE_STYLE: CSSProperties = {
  fontFamily: "'Inter', sans-serif",
  fontSize: 13,
  fontWeight: 400,
  lineHeight: 1.5,
  color: "rgba(0,0,0,0.6)",
  margin: "4px 0 0 0",
};

/**
 * About-section feature card with viewport-driven sustained hover.
 * Uses IntersectionObserver to activate the hover state when the card
 * is ≥60% visible, deactivating again when it leaves the viewport.
 *
 * Wrapped in React.memo so a parent re-render does not re-render every
 * sibling card. Styles and observer are memoized / created once per mount.
 */
const FeatureCard = memo(function FeatureCard({
  icon,
  title,
  description,
  variant,
  rgba,
}: FeatureCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  // Observer is created exactly once per mount (empty deps).
  useEffect(() => {
    const card = cardRef.current;
    if (!card || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Functional setter avoids re-subscribing to state and skips no-op updates.
        setIsInView((prev) => (prev === entry.isIntersecting ? prev : entry.isIntersecting));
      },
      {
        threshold: 0.6,
        rootMargin: "-10% 0px -10% 0px",
      }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  // Style only changes when isInView flips — memoized to keep referential equality otherwise.
  const containerStyle = useMemo<CSSProperties>(() => {
    const shared: CSSProperties = {
      position: "relative",
      background: "rgba(255, 255, 255, 0.65)",
      backdropFilter: "blur(20px) saturate(180%)",
      WebkitBackdropFilter: "blur(20px) saturate(180%)",
      border: `1px solid ${isInView ? "rgba(0, 0, 0, 0.1)" : "rgba(0, 0, 0, 0.06)"}`,
      borderRadius: 16,
      boxShadow: isInView ? ACTIVE_SHADOW : BASE_SHADOW,
      transform: isInView ? "translateY(-2px)" : "translateY(0)",
      transition: "box-shadow 0.4s ease, transform 0.4s ease, border-color 0.4s ease",
      cursor: "default",
    };
    return variant === "desktop"
      ? {
          ...shared,
          padding: "20px 26px",
          height: "100%",
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }
      : { ...shared, padding: "16px 18px", display: "flex", alignItems: "flex-start", gap: 14 };
  }, [isInView, variant]);

  // Desktop icon-tint box depends only on rgba — memoized so it doesn't recreate on every render.
  const desktopIconBoxStyle = useMemo<CSSProperties>(
    () => ({
      width: 34,
      height: 34,
      borderRadius: 9,
      background: `rgba(${rgba}, 0.06)`,
      border: `1px solid rgba(${rgba}, 0.1)`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    }),
    [rgba]
  );

  if (variant === "desktop") {
    return (
      <motion.div ref={cardRef} variants={cinematicSlideUp} style={containerStyle}>
        <div style={TITLE_ROW_STYLE}>
          <div style={desktopIconBoxStyle}>{icon}</div>
          <div style={TITLE_DESKTOP_STYLE}>{title}</div>
        </div>
        <div style={DESC_DESKTOP_STYLE}>{description}</div>
      </motion.div>
    );
  }

  return (
    <motion.div ref={cardRef} variants={cinematicSlideUp} style={containerStyle}>
      <div style={ICON_BOX_MOBILE_STYLE}>{icon}</div>
      <div style={TEXT_COL_MOBILE_STYLE}>
        <span style={TITLE_MOBILE_STYLE}>{title}</span>
        <p style={DESC_MOBILE_STYLE}>{description}</p>
      </div>
    </motion.div>
  );
});

export default FeatureCard;
