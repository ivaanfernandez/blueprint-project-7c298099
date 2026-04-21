import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface HomeLoaderProps {
  onComplete: () => void;
}

const TOTAL_DURATION = 4000;
const EXIT_START = 3700;

const HomeLoader = ({ onComplete }: HomeLoaderProps) => {
  const [isExiting, setIsExiting] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [currentPhase, setCurrentPhase] = useState<"scanning" | "ready">("scanning");

  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);
  const hasCompletedRef = useRef(false);

  // Typing effect: "SCANNING BIOMETRIC DATA" → "SYSTEMS READY"
  useEffect(() => {
    const scanningText = "SCANNING BIOMETRIC DATA";
    const readyText = "SYSTEMS READY";
    let charIndex = 0;
    let typeInterval: ReturnType<typeof setInterval>;
    let secondInterval: ReturnType<typeof setInterval>;

    const startTypingDelay = setTimeout(() => {
      typeInterval = setInterval(() => {
        if (charIndex <= scanningText.length) {
          setDisplayedText(scanningText.slice(0, charIndex));
          charIndex++;
        } else {
          clearInterval(typeInterval);
        }
      }, 60);
    }, 1600);

    const switchTextTimer = setTimeout(() => {
      clearInterval(typeInterval);
      setCurrentPhase("ready");
      let secondIndex = 0;
      setDisplayedText("");
      secondInterval = setInterval(() => {
        if (secondIndex <= readyText.length) {
          setDisplayedText(readyText.slice(0, secondIndex));
          secondIndex++;
        } else {
          clearInterval(secondInterval);
        }
      }, 60);
    }, 2500);

    return () => {
      clearTimeout(startTypingDelay);
      clearTimeout(switchTextTimer);
      if (typeInterval) clearInterval(typeInterval);
      if (secondInterval) clearInterval(secondInterval);
    };
  }, []);

  // Lifecycle: exit + complete
  useEffect(() => {
    const exitTimer = setTimeout(() => setIsExiting(true), EXIT_START);
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

  // DNA helix dots
  const dnaRows = Array.from({ length: 10 }, (_, i) => {
    const y = i * 20 + 5;
    const phase = (i / 10) * Math.PI * 4;
    const x1 = 30 + Math.sin(phase) * 15;
    const x2 = 30 - Math.sin(phase) * 15;
    return { y, x1, x2, i };
  });

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
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        overflow: "hidden",
        pointerEvents: isExiting ? "none" : "auto",
        gap: 24,
      }}
    >
      <div
        style={{
          position: "relative",
          width: "min(90vw, 90vh)",
          height: "min(90vw, 90vh)",
          maxWidth: 700,
          maxHeight: 700,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* ── ECG (Heart Rate) — LEFT ── */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          style={{
            position: "absolute",
            left: "4%",
            top: "50%",
            transform: "translateY(-50%)",
            width: "20%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 6,
          }}
        >
          <svg viewBox="0 0 100 60" style={{ width: "100%", height: "auto" }}>
            <line x1={0} y1={30} x2={100} y2={30} stroke="rgba(26,107,255,0.2)" strokeWidth={0.4} />
            <motion.path
              d="M0 30 L20 30 L25 30 L28 10 L32 50 L36 20 L40 30 L60 30 L65 30 L68 14 L72 46 L76 24 L80 30 L100 30"
              fill="none"
              stroke="#1A6BFF"
              strokeWidth={1}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 1] }}
              transition={{
                duration: 1.4,
                delay: 1.2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
              style={{ filter: "drop-shadow(0 0 3px rgba(26,107,255,0.8))" }}
            />
          </svg>
          <div
            style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: "min(10px, 1.8vw)",
              color: "rgba(26,107,255,0.85)",
              letterSpacing: "0.15em",
            }}
          >
            HR · 72 BPM
          </div>
        </motion.div>

        {/* ── DNA HELIX — RIGHT ── */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          style={{
            position: "absolute",
            right: "4%",
            top: "50%",
            transform: "translateY(-50%)",
            width: "16%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
          }}
        >
          <motion.svg
            viewBox="0 0 60 200"
            style={{ width: "100%", height: "auto" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          >
            {dnaRows.map((row) => (
              <g key={`dna-${row.i}`}>
                <line
                  x1={row.x1}
                  y1={row.y}
                  x2={row.x2}
                  y2={row.y}
                  stroke="rgba(26,107,255,0.3)"
                  strokeWidth={0.6}
                />
                <circle
                  cx={row.x1}
                  cy={row.y}
                  r={2}
                  fill="#7DF9FF"
                  style={{ filter: "drop-shadow(0 0 2px rgba(125,249,255,0.9))" }}
                />
                <circle
                  cx={row.x2}
                  cy={row.y}
                  r={2}
                  fill="#1A6BFF"
                  style={{ filter: "drop-shadow(0 0 2px rgba(26,107,255,0.9))" }}
                />
              </g>
            ))}
          </motion.svg>
          <div
            style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: "min(10px, 1.8vw)",
              color: "rgba(26,107,255,0.85)",
              letterSpacing: "0.15em",
            }}
          >
            DNA · 23 CHR
          </div>
        </motion.div>

        {/* ── HUMAN SILHOUETTE — CENTER ── */}
        <svg
          viewBox="0 0 100 220"
          preserveAspectRatio="xMidYMid meet"
          style={{
            width: "45%",
            height: "auto",
            maxHeight: "85%",
            position: "relative",
            zIndex: 2,
          }}
        >
          <defs>
            <clipPath id="silhouette-clip">
              {/* Same silhouette as drawn paths, used to mask scan line */}
              <circle cx={50} cy={20} r={12} />
              <rect x={47} y={32} width={6} height={6} />
              <path d="M30 42 Q50 38 70 42 L66 100 Q50 104 34 100 Z" />
              <path d="M30 42 L18 90 L22 92 L34 50 Z" />
              <path d="M70 42 L82 90 L78 92 L66 50 Z" />
              <path d="M38 100 L34 180 L40 182 L44 102 Z" />
              <path d="M62 100 L66 180 L60 182 L56 102 Z" />
            </clipPath>
          </defs>

          {/* Head */}
          <motion.circle
            cx={50}
            cy={20}
            r={12}
            fill="none"
            stroke="#1A6BFF"
            strokeWidth={1}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
            style={{ filter: "drop-shadow(0 0 3px rgba(26,107,255,0.7))" }}
          />

          {/* Neck */}
          <motion.line
            x1={50}
            y1={32}
            x2={50}
            y2={40}
            stroke="#1A6BFF"
            strokeWidth={1}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.2, delay: 0.35, ease: "easeOut" }}
          />

          {/* Torso (athletic V-shape) */}
          <motion.path
            d="M30 42 Q50 38 70 42 L66 100 Q50 104 34 100 Z"
            fill="none"
            stroke="#1A6BFF"
            strokeWidth={1}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.45, ease: "easeOut" }}
            style={{ filter: "drop-shadow(0 0 3px rgba(26,107,255,0.6))" }}
          />

          {/* Arms */}
          <motion.path
            d="M30 42 L18 90 L22 92 L34 50"
            fill="none"
            stroke="#1A6BFF"
            strokeWidth={1}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
          />
          <motion.path
            d="M70 42 L82 90 L78 92 L66 50"
            fill="none"
            stroke="#1A6BFF"
            strokeWidth={1}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
          />

          {/* Legs */}
          <motion.path
            d="M38 100 L34 180 L40 182 L44 102"
            fill="none"
            stroke="#1A6BFF"
            strokeWidth={1}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.75, ease: "easeOut" }}
          />
          <motion.path
            d="M62 100 L66 180 L60 182 L56 102"
            fill="none"
            stroke="#1A6BFF"
            strokeWidth={1}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.75, ease: "easeOut" }}
          />

          {/* Heart marker on chest */}
          <motion.circle
            cx={50}
            cy={60}
            r={2}
            fill="#FF3B3B"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0.6, 1, 0.6], scale: [0, 1.2, 1, 1.2, 1] }}
            transition={{
              duration: 1.2,
              delay: 1.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ filter: "drop-shadow(0 0 4px rgba(255,59,59,0.9))" }}
          />

          {/* Scan line — masked to silhouette via clipPath */}
          <g clipPath="url(#silhouette-clip)">
            <motion.rect
              x={0}
              width={100}
              height={1.5}
              fill="#7DF9FF"
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: [8, 184, 8], opacity: [0, 1, 1, 1, 0] }}
              transition={{
                duration: 1.6,
                delay: 0.9,
                ease: "easeInOut",
                times: [0, 0.05, 0.5, 0.95, 1],
              }}
              style={{ filter: "drop-shadow(0 0 4px rgba(125,249,255,1))" }}
            />
            {/* Glow trail (wider, softer) */}
            <motion.rect
              x={0}
              width={100}
              height={6}
              fill="rgba(125,249,255,0.25)"
              initial={{ y: 5, opacity: 0 }}
              animate={{ y: [5, 181, 5], opacity: [0, 0.6, 0.6, 0.6, 0] }}
              transition={{
                duration: 1.6,
                delay: 0.9,
                ease: "easeInOut",
                times: [0, 0.05, 0.5, 0.95, 1],
              }}
            />
          </g>

          {/* ── PILLAR PULSE — 3 colors expanding from chest ── */}
          <motion.circle
            cx={50}
            cy={70}
            r={0}
            fill="none"
            stroke="#1A6BFF"
            strokeWidth={0.8}
            initial={{ r: 0, opacity: 0 }}
            animate={{ r: 70, opacity: [0, 0.9, 0] }}
            transition={{ duration: 0.6, delay: 3.3, ease: "easeOut" }}
          />
          <motion.circle
            cx={50}
            cy={70}
            r={0}
            fill="none"
            stroke="#FF3B3B"
            strokeWidth={0.8}
            initial={{ r: 0, opacity: 0 }}
            animate={{ r: 80, opacity: [0, 0.9, 0] }}
            transition={{ duration: 0.6, delay: 3.45, ease: "easeOut" }}
          />
          <motion.circle
            cx={50}
            cy={70}
            r={0}
            fill="none"
            stroke="#22C55E"
            strokeWidth={0.8}
            initial={{ r: 0, opacity: 0 }}
            animate={{ r: 90, opacity: [0, 0.9, 0] }}
            transition={{ duration: 0.6, delay: 3.6, ease: "easeOut" }}
          />
        </svg>
      </div>

      {/* ── HUD TEXT — Typewriter ── */}
      <div
        style={{
          minHeight: 24,
          fontFamily: "'Orbitron', 'Courier New', monospace",
          fontSize: "min(14px, 2.8vw)",
          letterSpacing: "0.25em",
          color: currentPhase === "ready" ? "#22C55E" : "#7DF9FF",
          textShadow:
            currentPhase === "ready"
              ? "0 0 8px rgba(34,197,94,0.7)"
              : "0 0 8px rgba(125,249,255,0.7)",
          display: "flex",
          alignItems: "center",
          gap: 4,
          textAlign: "center",
          padding: "0 16px",
        }}
      >
        <span>{displayedText}</span>
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        >
          _
        </motion.span>
      </div>
    </motion.div>
  );
};

export default HomeLoader;
