import { useEffect, useRef, useState } from "react";

/**
 * HomeLoader — first-visit-only lab/scan loader for the / route.
 *
 * • Pure SVG + CSS keyframes (no external animation libs).
 * • White / gray palette per spec: bg #1F1F1F, text #B0B0B0, ring #FFFFFF.
 * • Lab-scan decorations: corner brackets, scan line, faint grid, status tag.
 * • Honors prefers-reduced-motion (skips immediately).
 * • Honors window event "bp:force-complete-intro" + window.__BP_FORCE_COMPLETE__
 *   so existing E2E hooks still skip it.
 */

interface HomeLoaderProps {
  onComplete: () => void;
  /** Total fill duration in ms (default 4000). Fade-out is +500ms after. */
  duration?: number;
}

const SIZE = 220;
const STROKE = 3;
const RADIUS = (SIZE - STROKE * 2) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const HomeLoader = ({ onComplete, duration = 4000 }: HomeLoaderProps) => {
  const [progress, setProgress] = useState(0); // 0..100
  const [fading, setFading] = useState(false);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  // ── Skip immediately if user prefers reduced motion or E2E force flag
  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      onComplete();
      return;
    }
  }, [onComplete]);

  // ── E2E escape hatch
  useEffect(() => {
    if (typeof window === "undefined") return;
    const force = () => {
      setProgress(100);
      setFading(true);
      window.setTimeout(onComplete, 100);
    };
    window.addEventListener("bp:force-complete-intro", force);
    return () => window.removeEventListener("bp:force-complete-intro", force);
  }, [onComplete]);

  // ── Drive 0→100 fill with rAF for smoothness
  useEffect(() => {
    const tick = (ts: number) => {
      if (startRef.current === null) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const pct = Math.min(100, (elapsed / duration) * 100);
      setProgress(pct);
      if (pct < 100) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setFading(true);
        window.setTimeout(onComplete, 500); // matches CSS fade-out
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [duration, onComplete]);

  const dashOffset = CIRCUMFERENCE * (1 - progress / 100);
  const pctLabel = Math.floor(progress);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={`Initializing system, ${pctLabel} percent`}
      data-testid="home-loader"
      data-phase={fading ? "fading" : progress >= 100 ? "complete" : "loading"}
      data-progress={pctLabel}
      className={`bp-home-loader${fading ? " bp-home-loader--fading" : ""}`}
    >
      {/* Faint grid backdrop */}
      <div className="bp-loader-grid" aria-hidden="true" />

      {/* Vertical scan line sweep */}
      <div className="bp-loader-scanline" aria-hidden="true" />

      {/* Corner brackets */}
      <span className="bp-loader-bracket bp-loader-bracket--tl" aria-hidden="true" />
      <span className="bp-loader-bracket bp-loader-bracket--tr" aria-hidden="true" />
      <span className="bp-loader-bracket bp-loader-bracket--bl" aria-hidden="true" />
      <span className="bp-loader-bracket bp-loader-bracket--br" aria-hidden="true" />

      {/* Top status tag */}
      <div className="bp-loader-tag bp-loader-tag--top" aria-hidden="true">
        <span className="bp-loader-dot" />
        BLUEPRINT // SYSTEM INIT
      </div>

      {/* Center: ring + percentage */}
      <div className="bp-loader-center">
        <svg
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="bp-loader-ring"
          aria-hidden="true"
        >
          {/* Track */}
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={STROKE}
          />
          {/* Progress */}
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="#FFFFFF"
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
            transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
            style={{ filter: "drop-shadow(0 0 6px rgba(255,255,255,0.35))" }}
          />
          {/* Tick marks every 30deg */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const inner = RADIUS - 8;
            const outer = RADIUS - 2;
            const cx = SIZE / 2;
            const cy = SIZE / 2;
            const x1 = cx + Math.cos(angle) * inner;
            const y1 = cy + Math.sin(angle) * inner;
            const x2 = cx + Math.cos(angle) * outer;
            const y2 = cy + Math.sin(angle) * outer;
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="rgba(255,255,255,0.25)"
                strokeWidth={1}
              />
            );
          })}
        </svg>

        <div className="bp-loader-readout">
          <div className="bp-loader-pct">
            {pctLabel.toString().padStart(2, "0")}
            <span className="bp-loader-pct-symbol">%</span>
          </div>
          <div className="bp-loader-sublabel">CALIBRATING</div>
        </div>
      </div>

      {/* Bottom status tag */}
      <div className="bp-loader-tag bp-loader-tag--bottom" aria-hidden="true">
        SCAN ID · 0x{(progress * 1024).toString(16).padStart(4, "0").toUpperCase().slice(0, 4)}
      </div>

      <style>{`
        .bp-home-loader {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: #1F1F1F;
          color: #B0B0B0;
          font-family: 'Orbitron', 'Space Grotesk', system-ui, sans-serif;
          letter-spacing: 0.12em;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          opacity: 1;
          transition: opacity 0.5s ease-out;
        }
        .bp-home-loader--fading {
          opacity: 0;
          pointer-events: none;
        }

        /* Faint grid */
        .bp-loader-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: radial-gradient(circle at center, black 30%, transparent 75%);
          -webkit-mask-image: radial-gradient(circle at center, black 30%, transparent 75%);
        }

        /* Scan line */
        .bp-loader-scanline {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
          box-shadow: 0 0 12px rgba(255,255,255,0.4);
          animation: bp-loader-scan 3.2s linear infinite;
        }
        @keyframes bp-loader-scan {
          0%   { transform: translateY(0); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }

        /* Corner brackets */
        .bp-loader-bracket {
          position: absolute;
          width: 22px;
          height: 22px;
          border: 1px solid rgba(255,255,255,0.55);
          opacity: 0.8;
        }
        .bp-loader-bracket--tl { top: 24px; left: 24px; border-right: 0; border-bottom: 0; }
        .bp-loader-bracket--tr { top: 24px; right: 24px; border-left: 0; border-bottom: 0; }
        .bp-loader-bracket--bl { bottom: 24px; left: 24px; border-right: 0; border-top: 0; }
        .bp-loader-bracket--br { bottom: 24px; right: 24px; border-left: 0; border-top: 0; }

        /* Status tags */
        .bp-loader-tag {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          font-size: 10px;
          color: #B0B0B0;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          border: 1px solid rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.02);
        }
        .bp-loader-tag--top { top: 60px; }
        .bp-loader-tag--bottom { bottom: 60px; color: #808080; }
        .bp-loader-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #FFFFFF;
          box-shadow: 0 0 6px #FFFFFF;
          animation: bp-loader-blink 1.2s ease-in-out infinite;
        }
        @keyframes bp-loader-blink {
          0%, 100% { opacity: 0.3; }
          50%      { opacity: 1; }
        }

        /* Center stack */
        .bp-loader-center {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .bp-loader-ring {
          display: block;
        }
        .bp-loader-readout {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
        .bp-loader-pct {
          font-size: 52px;
          font-weight: 500;
          color: #B0B0B0;
          line-height: 1;
          font-variant-numeric: tabular-nums;
          letter-spacing: 0.04em;
        }
        .bp-loader-pct-symbol {
          font-size: 24px;
          margin-left: 4px;
          color: #808080;
        }
        .bp-loader-sublabel {
          font-size: 10px;
          color: #808080;
          letter-spacing: 0.32em;
        }

        @media (max-width: 480px) {
          .bp-loader-tag--top { top: 40px; font-size: 9px; }
          .bp-loader-tag--bottom { bottom: 40px; font-size: 9px; }
          .bp-loader-bracket { width: 18px; height: 18px; }
          .bp-loader-bracket--tl, .bp-loader-bracket--tr { top: 16px; }
          .bp-loader-bracket--bl, .bp-loader-bracket--br { bottom: 16px; }
          .bp-loader-bracket--tl, .bp-loader-bracket--bl { left: 16px; }
          .bp-loader-bracket--tr, .bp-loader-bracket--br { right: 16px; }
          .bp-loader-pct { font-size: 40px; }
          .bp-loader-pct-symbol { font-size: 18px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .bp-loader-scanline,
          .bp-loader-dot { animation: none; }
        }
      `}</style>
    </div>
  );
};

export default HomeLoader;
