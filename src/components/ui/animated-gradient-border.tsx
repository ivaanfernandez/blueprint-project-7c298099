import * as React from "react";
import { useId } from "react";

interface BorderRotateProps {
  children: React.ReactNode;
  className?: string;
  animationSpeed?: number;
  gradientColors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  backgroundColor?: string;
  borderWidth?: number;
  borderRadius?: number;
}

export const BorderRotate: React.FC<BorderRotateProps> = ({
  children,
  className = "",
  animationSpeed = 4,
  gradientColors,
  backgroundColor = "#0a0a0a",
  borderWidth = 2,
  borderRadius = 20,
}) => {
  const id = useId().replace(/:/g, "");

  return (
    <>
      <div
        className={`border-rotate-${id} ${className}`}
        style={{
          borderRadius,
          padding: borderWidth,
          position: "relative",
          background: `linear-gradient(${backgroundColor}, ${backgroundColor}) padding-box, conic-gradient(from var(--gradient-angle-${id}, 0deg), ${gradientColors.primary}, ${gradientColors.secondary}, ${gradientColors.accent}, ${gradientColors.secondary}, ${gradientColors.primary}) border-box`,
        }}
      >
        {children}
      </div>
      <style>{`
        @property --gradient-angle-${id} {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes gradient-rotate-${id} {
          from { --gradient-angle-${id}: 0deg; }
          to { --gradient-angle-${id}: 360deg; }
        }
        .border-rotate-${id} {
          animation: gradient-rotate-${id} ${animationSpeed}s linear infinite;
        }
      `}</style>
    </>
  );
};
