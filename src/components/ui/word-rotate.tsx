"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface WordRotateProps {
  words: string[];
  duration?: number;
  className?: string;
  wrapperClassName?: string;
}

export function WordRotate({
  words,
  duration = 2500,
  className,
  wrapperClassName,
}: WordRotateProps) {
  const [index, setIndex] = useState(0);
  const measureRef = useRef<HTMLSpanElement>(null);
  const [measuredWidth, setMeasuredWidth] = useState<number | null>(null);
  const longestWord = useMemo(
    () => words.reduce((longest, word) => (word.length > longest.length ? word : longest), words[0] ?? ""),
    [words]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);
    return () => clearInterval(interval);
  }, [words, duration]);

  useEffect(() => {
    if (measureRef.current) {
      setMeasuredWidth(measureRef.current.getBoundingClientRect().width);
    }
  }, [longestWord, className]);

  return (
    <>
      <span
        ref={measureRef}
        aria-hidden="true"
        className={cn("invisible pointer-events-none fixed left-[-9999px] top-[-9999px] whitespace-nowrap", className)}
      >
        {longestWord}
      </span>
      <span
        className={cn("word-rotate-wrapper", wrapperClassName, className)}
        style={{
          position: "relative",
          display: "inline-block",
          width: measuredWidth ? `${measuredWidth}px` : "auto",
          minWidth: measuredWidth ? `${measuredWidth}px` : undefined,
          height: "1.1em",
          verticalAlign: "baseline",
          lineHeight: "1",
          padding: 0,
          margin: 0,
        }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={words[index]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="word-rotate-inner"
            style={{
              position: "absolute",
              left: 0,
              bottom: 0,
              display: "block",
              whiteSpace: "nowrap",
              lineHeight: "1",
              transform: "none",
            }}
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </>
  );
}
