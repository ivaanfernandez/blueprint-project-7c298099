import { useEffect, useRef, useState, ReactNode, CSSProperties } from "react";
import { motion } from "framer-motion";
import { blurRevealItem } from "@/lib/scrollAnimations";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  variant: "desktop" | "mobile";
  /** Tint color for the icon container background (rgba "r,g,b" string). Desktop only. */
  rgba?: string;
}

/**
 * About-section feature card with viewport-driven sustained hover.
 * Uses IntersectionObserver to activate the hover state when the card
 * is ≥60% visible, deactivating again when it leaves the viewport.
 */
const FeatureCard = ({ icon, title, description, variant, rgba }: FeatureCardProps) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setIsInView(entry.isIntersecting));
      },
      {
        threshold: 0.6,
        rootMargin: "-10% 0px -10% 0px",
      }
    );

    observer.observe(card);
    return () => observer.unobserve(card);
  }, []);

  const baseShadow =
    "0 1px 2px rgba(0, 0, 0, 0.04), 0 4px 12px rgba(0, 0, 0, 0.06), 0 12px 32px rgba(0, 0, 0, 0.05)";
  const activeShadow =
    "0 2px 4px rgba(0, 0, 0, 0.05), 0 8px 20px rgba(0, 0, 0, 0.08), 0 20px 48px rgba(0, 0, 0, 0.06)";

  const sharedStyle: CSSProperties = {
    position: "relative",
    background: "rgba(255, 255, 255, 0.65)",
    backdropFilter: "blur(20px) saturate(180%)",
    WebkitBackdropFilter: "blur(20px) saturate(180%)",
    border: `1px solid ${isInView ? "rgba(0, 0, 0, 0.1)" : "rgba(0, 0, 0, 0.06)"}`,
    borderRadius: 16,
    boxShadow: isInView ? activeShadow : baseShadow,
    transform: isInView ? "translateY(-2px)" : "translateY(0)",
    transition:
      "box-shadow 0.4s ease, transform 0.4s ease, border-color 0.4s ease",
    cursor: "default",
  };

  if (variant === "desktop") {
    return (
      <motion.div
        ref={cardRef}
        variants={blurRevealItem}
        style={{ ...sharedStyle, padding: "24px" }}
      >
        {/* Title row */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 9,
              background: `rgba(${rgba}, 0.06)`,
              border: `1px solid rgba(${rgba}, 0.1)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {icon}
          </div>
          <div
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: 18,
              fontWeight: 600,
              color: "#000",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
            }}
          >
            {title}
          </div>
        </div>
        {/* Description */}
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 15,
            fontWeight: 300,
            color: "#6B7280",
            lineHeight: 1.6,
            paddingLeft: 44,
          }}
        >
          {description}
        </div>
      </motion.div>
    );
  }

  // Mobile variant
  return (
    <motion.div
      ref={cardRef}
      variants={blurRevealItem}
      style={{
        ...sharedStyle,
        padding: "16px 18px",
        display: "flex",
        alignItems: "flex-start",
        gap: 14,
      }}
    >
      <div
        style={{
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
        }}
      >
        {icon}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 0, flex: 1 }}>
        <span
          style={{
            fontFamily: "'Michroma', sans-serif",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.02em",
            color: "#000",
            lineHeight: 1.3,
          }}
        >
          {title}
        </span>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 13,
            fontWeight: 400,
            lineHeight: 1.5,
            color: "rgba(0,0,0,0.6)",
            margin: "4px 0 0 0",
          }}
        >
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default FeatureCard;
