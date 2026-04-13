'use client';
import { useEffect, useState } from 'react';
import { motion, MotionProps } from 'framer-motion';
import type { JSX } from 'react';

type TextScrambleProps = {
  children: string;
  duration?: number;
  speed?: number;
  characterSet?: string;
  as?: React.ElementType;
  className?: string;
  trigger?: boolean;
  onScrambleComplete?: () => void;
} & MotionProps;

const defaultChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const motionCache = new Map();
function getMotionComponent(component: React.ElementType) {
  if (!motionCache.has(component)) {
    motionCache.set(component, motion.create(component as keyof JSX.IntrinsicElements));
  }
  return motionCache.get(component);
}

export function TextScramble({
  children,
  duration = 0.8,
  speed = 0.04,
  characterSet = defaultChars,
  className,
  as: Component = 'p',
  trigger = true,
  onScrambleComplete,
  ...props
}: TextScrambleProps) {
  const MotionComponent = getMotionComponent(Component);
  const [displayText, setDisplayText] = useState(children);
  const [isAnimating, setIsAnimating] = useState(false);
  const text = children;

  const scramble = async () => {
    if (isAnimating) return;
    setIsAnimating(true);
    const steps = duration / speed;
    let step = 0;
    const interval = setInterval(() => {
      let scrambled = '';
      const progress = step / steps;
      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') { scrambled += ' '; continue; }
        if (progress * text.length > i) { scrambled += text[i]; }
        else { scrambled += characterSet[Math.floor(Math.random() * characterSet.length)]; }
      }
      setDisplayText(scrambled);
      step++;
      if (step > steps) {
        clearInterval(interval);
        setDisplayText(text);
        setIsAnimating(false);
        onScrambleComplete?.();
      }
    }, speed * 1000);
  };

  useEffect(() => {
    if (!trigger) return;
    scramble();
  }, [trigger]);

  return (
    <MotionComponent className={className} {...props}>
      {displayText}
    </MotionComponent>
  );
}
