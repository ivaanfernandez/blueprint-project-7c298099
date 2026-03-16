import * as React from "react";

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
  animationSpeed = 5,
  gradientColors,
  backgroundColor = "#0a0a0a",
  borderWidth = 2,
  borderRadius = 20,
}) => {
  return (
    <div
      className={`gradient-border-auto ${className}`}
      style={{
        borderRadius,
        padding: borderWidth,
        backgroundImage: `linear-gradient(${backgroundColor}, ${backgroundColor}), conic-gradient(from var(--gradient-angle), ${gradientColors.primary}, ${gradientColors.secondary}, ${gradientColors.accent}, ${gradientColors.secondary}, ${gradientColors.primary})`,
        backgroundOrigin: "padding-box, border-box",
        backgroundClip: "padding-box, border-box",
        animationDuration: `${animationSpeed}s`,
      }}
    >
      {children}
    </div>
  );
};
