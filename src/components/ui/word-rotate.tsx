"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface WordRotateProps {
  words: string[];
  duration?: number;
  className?: string;
}

export function WordRotate({
  words,
  duration = 2500,
  className,
}: WordRotateProps) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);
    return () => clearInterval(interval);
  }, [words, duration]);
  return (
    <span className={cn("", className)} style={{ position: "relative", display: "inline-block", width: "100%", height: "1em", verticalAlign: "baseline", lineHeight: "inherit", padding: 0, margin: 0 }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="word-rotate-inner"
          style={{ position: "absolute", left: 0, top: 0, whiteSpace: "nowrap", lineHeight: "inherit" }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
