"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BeamPath {
  path: string;
  gradientConfig: {
    initial: { x1: string; x2: string; y1: string; y2: string };
    animate: { x1: any; x2: any; y1: any; y2: any };
    transition?: any;
  };
  connectionPoints?: Array<{ cx: number; cy: number; r: number }>;
}

interface PulseBeamsProps {
  children?: React.ReactNode;
  className?: string;
  beams: BeamPath[];
  width?: number;
  height?: number;
  baseColor?: string;
  accentColor?: string;
  gradientColors?: { start: string; middle: string; end: string };
}

export const PulseBeams = ({
  children,
  className,
  beams,
  width = 400,
  height = 160,
  baseColor = "rgba(26,107,255,0.15)",
  accentColor = "rgba(26,107,255,0.4)",
  gradientColors = {
    start: "#1A6BFF",
    middle: "#4A9FFF",
    end: "#1A6BFF",
  },
}: PulseBeamsProps) => {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center",
        className
      )}
      style={{ width, height }}
    >
      <div className="relative z-10 flex items-center justify-center">
        {children}
      </div>
      <div className="absolute inset-0 z-0">
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {beams.map((beam, index) => (
            <g key={`beam-${index}`}>
              <path d={beam.path} stroke={baseColor} strokeWidth="1" />
              <path d={beam.path} stroke={accentColor} strokeWidth="0.5" />
              {beam.connectionPoints?.map((point, pi) => (
                <circle
                  key={`point-${index}-${pi}`}
                  cx={point.cx}
                  cy={point.cy}
                  r={point.r}
                  fill={accentColor}
                />
              ))}
            </g>
          ))}
          <defs>
            {beams.map((beam, index) => (
              <motion.linearGradient
                key={`gradient-${index}`}
                id={`pulse-gradient-${index}`}
                initial={beam.gradientConfig.initial}
                animate={beam.gradientConfig.animate}
                transition={beam.gradientConfig.transition}
              >
                <stop stopColor={gradientColors.start} stopOpacity="0" />
                <stop stopColor={gradientColors.middle} />
                <stop offset="1" stopColor={gradientColors.end} stopOpacity="0" />
              </motion.linearGradient>
            ))}
          </defs>
          {beams.map((beam, index) => (
            <path
              key={`animated-beam-${index}`}
              d={beam.path}
              stroke={`url(#pulse-gradient-${index})`}
              strokeWidth="2"
            />
          ))}
        </svg>
      </div>
    </div>
  );
};
