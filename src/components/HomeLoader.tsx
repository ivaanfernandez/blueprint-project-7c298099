import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

interface HomeLoaderProps {
  onComplete: () => void;
}

const NUM_PARTICLES = 24;
const TOTAL_DURATION = 2800;

const HomeLoader = ({ onComplete }: HomeLoaderProps) => {
  const [isExiting, setIsExiting] = useState(false);

  const particles = useMemo(() => {
    return Array.from({ length: NUM_PARTICLES }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 0.6,
    }));
  }, []);

  const neuralLines = useMemo(() => {
    const lines: Array<{ x1: number; y1: number; x2: number; y2: number; delay: number }> = [];
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const p1 = particles[i];
        const p2 = particles[j];
        const distance = Math.hypot(p1.x - p2.x, p1.y - p2.y);
        if (distance < 25) {
          lines.push({
            x1: p1.x,
            y1: p1.y,
            x2: p2.x,
            y2: p2.y,
            delay: 0.8 + Math.random() * 0.4,
          });
        }
      }
    }
    return lines;
  }, [particles]);

  // Keep latest onComplete in a ref so the timer effect runs exactly once
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);
  const hasCompletedRef = useRef(false);

  useEffect(() => {
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 2500);

    const completeTimer = setTimeout(() => {
      if (hasCompletedRef.current) return;
      hasCompletedRef.current = true;
      onCompleteRef.current();
    }, TOTAL_DURATION);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      aria-hidden={isExiting}
      style={{
        position: "fixed",
        inset: 0,
        background: "#000000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        overflow: "hidden",
        pointerEvents: isExiting ? "none" : "auto",
      }}
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        style={{
          width: "min(90vw, 90vh)",
          height: "min(90vw, 90vh)",
          maxWidth: 600,
          maxHeight: 600,
        }}
      >
        {/* ── PHASE 1: PARTICLES ── */}
        {particles.map((p) => (
          <motion.circle
            key={`particle-${p.id}`}
            cx={p.x}
            cy={p.y}
            r={0.3}
            fill="rgba(255, 255, 255, 0.6)"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0.4], scale: [0, 1, 1] }}
            transition={{
              duration: 1.5,
              delay: p.delay,
              times: [0, 0.4, 1],
              ease: "easeOut",
            }}
          />
        ))}

        {/* ── PHASE 2: NEURAL NETWORK LINES ── */}
        {neuralLines.map((line, i) => (
          <motion.line
            key={`line-${i}`}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="rgba(26, 107, 255, 0.35)"
            strokeWidth={0.12}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 0.7, 0.3] }}
            transition={{
              duration: 0.6,
              delay: line.delay,
              ease: "easeOut",
            }}
          />
        ))}

        {/* ── PHASE 3: VITRUVIAN MAN ── */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.5 }}
        >
          {/* Head */}
          <motion.circle
            cx={50}
            cy={35}
            r={3.5}
            fill="none"
            stroke="rgba(26, 107, 255, 0.9)"
            strokeWidth={0.4}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.5, ease: "easeOut" }}
          />

          {/* Torso */}
          <motion.line
            x1={50}
            y1={38.5}
            x2={50}
            y2={58}
            stroke="rgba(26, 107, 255, 0.9)"
            strokeWidth={0.4}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.4, delay: 1.7, ease: "easeOut" }}
          />

          {/* T-arms */}
          <motion.line
            x1={30}
            y1={45}
            x2={70}
            y2={45}
            stroke="rgba(26, 107, 255, 0.9)"
            strokeWidth={0.4}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 1.75, ease: "easeOut" }}
          />

          {/* Raised arms (diagonals) */}
          <motion.line
            x1={50}
            y1={42}
            x2={33}
            y2={32}
            stroke="rgba(26, 107, 255, 0.7)"
            strokeWidth={0.35}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 1.85, ease: "easeOut" }}
          />
          <motion.line
            x1={50}
            y1={42}
            x2={67}
            y2={32}
            stroke="rgba(26, 107, 255, 0.7)"
            strokeWidth={0.35}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 1.85, ease: "easeOut" }}
          />

          {/* A-legs */}
          <motion.line
            x1={50}
            y1={58}
            x2={40}
            y2={78}
            stroke="rgba(26, 107, 255, 0.9)"
            strokeWidth={0.4}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 1.8, ease: "easeOut" }}
          />
          <motion.line
            x1={50}
            y1={58}
            x2={60}
            y2={78}
            stroke="rgba(26, 107, 255, 0.9)"
            strokeWidth={0.4}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 1.8, ease: "easeOut" }}
          />

          {/* Straight legs */}
          <motion.line
            x1={50}
            y1={58}
            x2={50}
            y2={80}
            stroke="rgba(26, 107, 255, 0.7)"
            strokeWidth={0.35}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 1.9, ease: "easeOut" }}
          />
        </motion.g>

        {/* Vitruvian square */}
        <motion.rect
          x={22}
          y={22}
          width={56}
          height={56}
          fill="none"
          stroke="rgba(26, 107, 255, 0.4)"
          strokeWidth={0.2}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.7, ease: "easeOut" }}
        />

        {/* Vitruvian circle */}
        <motion.circle
          cx={50}
          cy={52}
          r={28}
          fill="none"
          stroke="rgba(26, 107, 255, 0.4)"
          strokeWidth={0.2}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 1.6, ease: "easeOut" }}
        />

        {/* ── PHASE 4: PILLAR RINGS ── */}
        <motion.circle
          cx={50}
          cy={52}
          r={0}
          fill="none"
          stroke="#1A6BFF"
          strokeWidth={0.3}
          initial={{ r: 0, opacity: 0 }}
          animate={{ r: 35, opacity: [0, 0.8, 0] }}
          transition={{ duration: 0.7, delay: 2.2, ease: "easeOut" }}
        />
        <motion.circle
          cx={50}
          cy={52}
          r={0}
          fill="none"
          stroke="#FF3B3B"
          strokeWidth={0.3}
          initial={{ r: 0, opacity: 0 }}
          animate={{ r: 40, opacity: [0, 0.8, 0] }}
          transition={{ duration: 0.7, delay: 2.35, ease: "easeOut" }}
        />
        <motion.circle
          cx={50}
          cy={52}
          r={0}
          fill="none"
          stroke="#22C55E"
          strokeWidth={0.3}
          initial={{ r: 0, opacity: 0 }}
          animate={{ r: 45, opacity: [0, 0.8, 0] }}
          transition={{ duration: 0.7, delay: 2.5, ease: "easeOut" }}
        />

        {/* Center pulse */}
        <motion.circle
          cx={50}
          cy={52}
          r={0.8}
          fill="#FFFFFF"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.6, 1] }}
          transition={{
            duration: 1.5,
            delay: 1.5,
            times: [0, 0.3, 0.6, 1],
          }}
          style={{
            filter: "drop-shadow(0 0 4px rgba(255, 255, 255, 0.9))",
          }}
        />
      </svg>
    </motion.div>
  );
};

export default HomeLoader;
