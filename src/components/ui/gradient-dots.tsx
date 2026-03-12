'use client';
import React from 'react';
import { motion } from 'framer-motion';

type GradientDotsProps = React.ComponentProps<typeof motion.div> & {
  dotSize?: number;
  spacing?: number;
  duration?: number;
};

export function GradientDots({
  dotSize = 1.5,
  spacing = 24,
  duration = 0,
  className,
  ...props
}: GradientDotsProps) {
  return (
    <motion.div
      className={`absolute inset-0 ${className}`}
      style={{
        backgroundColor: '#000000',
        backgroundImage: `radial-gradient(circle, #1A6BFF 1.5px, transparent 1.5px)`,
        backgroundSize: `20px 20px`,
        opacity: 0.7,
      }}
      {...props}
    />
  );
}
