import { useEffect, useState } from "react";

interface BiometricScanProps {
  onComplete: () => void;
}

const BiometricScan = ({ onComplete }: BiometricScanProps) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 0),
      setTimeout(() => setPhase(2), 600),
      setTimeout(() => setPhase(3), 1200),
      setTimeout(() => setPhase(4), 3200),
      setTimeout(() => setPhase(5), 4200),
      setTimeout(() => onComplete(), 5000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <>
      <style>{`
        @keyframes bs-fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes bs-fade-out { from { opacity: 1; } to { opacity: 0; } }
        @keyframes bs-scan-line {
          0%   { top: 0; opacity: 0.4; }
          25%  { opacity: 1; }
          50%  { top: calc(100% - 2px); opacity: 1; }
          75%  { opacity: 1; }
          100% { top: 0; opacity: 0.4; }
        }
        @keyframes bs-scan-breathe {
          0%, 100% { box-shadow: 0 0 6px #1A6BFF, 0 0 12px rgba(26,107,255,0.5); }
          50%      { box-shadow: 0 0 14px #1A6BFF, 0 0 28px rgba(26,107,255,0.8); }
        }
        @keyframes bs-glow-pulse {
          0%, 100% { filter: drop-shadow(0 0 8px #1A6BFF); }
          50%      { filter: drop-shadow(0 0 22px #1A6BFF) drop-shadow(0 0 44px rgba(26,107,255,0.7)); }
        }
        @keyframes bs-ripple {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 0.6; }
          100% { transform: translate(-50%, -50%) scale(3); opacity: 0; }
        }
        @keyframes bs-screen-fade {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes bs-shimmer-sweep {
          0% { transform: translateX(-120%) skewX(-15deg); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateX(120%) skewX(-15deg); opacity: 0; }
        }
        @keyframes bs-shimmer-pulse {
          0%, 100% { opacity: 0.15; transform: scale(0.95); }
          50% { opacity: 0.45; transform: scale(1.05); }
        }
        @media (min-width: 768px) {
          .bs-wordmark { font-size: 24px !important; }
          .bs-fingerprint-container { width: 220px !important; height: 220px !important; }
          .bs-fingerprint-svg { width: 220px !important; height: 220px !important; }
          .bs-status-text { font-size: 13px !important; }
        }
      `}</style>
      <div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center"
        data-testid="biometric-scan"
        data-variant="blue"
        data-phase={phase}
        style={{
          backgroundColor: "#000000",
          fontFamily: "'Space Grotesk', sans-serif",
          animation: phase >= 5 ? "bs-screen-fade 0.8s ease-in forwards" : undefined,
        }}
      >
        {/* Wordmark */}
        <p
          className="bs-wordmark"
          data-testid="biometric-scan-wordmark"
          style={{
            fontSize: "clamp(14px, 4vw, 18px)",
            letterSpacing: "0.3em",
            color: "#FFFFFF",
            textTransform: "uppercase" as const,
            opacity: phase >= 1 ? 1 : 0,
            transition: "opacity 0.6s ease",
            marginBottom: "32px",
            textAlign: "center",
            width: "100%",
          }}
        >
          ACCESSING BLUEPRINT PROJECT
        </p>

        {/* Fingerprint container */}
        <div
          className="bs-fingerprint-container"
          data-testid="biometric-scan-fingerprint"
          style={{
            position: "relative",
            width: "140px",
            height: "140px",
            opacity: phase >= 1 ? 1 : 0,
            transition: "opacity 0.6s ease",
            animation: phase === 3 ? "bs-glow-pulse 2s ease-in-out infinite" : undefined,
            filter: phase >= 2 ? "drop-shadow(0 0 12px #1A6BFF)" : undefined,
          }}
        >
          <svg
            className="bs-fingerprint-svg"
            viewBox="0 0 140 140"
            width="140"
            height="140"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Fingerprint ridges - concentric oval loops */}
            {[18, 26, 34, 42, 50, 58].map((ry, i) => (
              <ellipse
                key={`outer-${i}`}
                cx="70"
                cy="75"
                rx={ry * 0.7}
                ry={ry}
                stroke={phase >= 4 ? "#1A6BFF" : "#0A3D8F"}
                strokeWidth="1.5"
                style={{ transition: "stroke 0.8s ease" }}
              />
            ))}
            {/* Arch patterns at top */}
            {[20, 30, 40].map((r, i) => (
              <path
                key={`arch-${i}`}
                d={`M ${70 - r * 0.6} ${55 - i * 4} Q 70 ${20 - i * 6} ${70 + r * 0.6} ${55 - i * 4}`}
                stroke={phase >= 4 ? "#1A6BFF" : "#0A3D8F"}
                strokeWidth="1.5"
                fill="none"
                style={{ transition: "stroke 0.8s ease" }}
              />
            ))}
            {/* Whorl center detail */}
            <path
              d="M 62 70 Q 65 60 70 58 Q 75 60 78 70 Q 75 80 70 82 Q 65 80 62 70Z"
              stroke={phase >= 4 ? "#1A6BFF" : "#0A3D8F"}
              strokeWidth="1.2"
              fill="none"
              style={{ transition: "stroke 0.8s ease" }}
            />
            {/* Additional ridge lines */}
            {[1, 2, 3].map((n) => (
              <path
                key={`ridge-${n}`}
                d={`M ${46 + n * 2} ${30 + n * 3} Q 70 ${25 + n * 2} ${94 - n * 2} ${30 + n * 3}`}
                stroke={phase >= 4 ? "#1A6BFF" : "#0A3D8F"}
                strokeWidth="1.2"
                fill="none"
                style={{ transition: "stroke 0.8s ease" }}
              />
            ))}
          </svg>

          {/* Soft "scan starting" pulse — bridges phase 2 → phase 3 */}
          {(phase === 2 || phase === 3) && (
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: "-10%",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(26,107,255,0.35) 0%, rgba(26,107,255,0) 65%)",
                animation: "bs-shimmer-pulse 1.6s ease-in-out infinite",
                pointerEvents: "none",
              }}
            />
          )}

          {/* Diagonal shimmer sweep — runs once just before the scan line */}
          {phase === 2 && (
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                overflow: "hidden",
                borderRadius: "50%",
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "60%",
                  height: "100%",
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(125,211,252,0.0) 20%, rgba(125,211,252,0.55) 50%, rgba(125,211,252,0.0) 80%, transparent 100%)",
                  filter: "blur(6px)",
                  animation: "bs-shimmer-sweep 1.2s ease-out forwards",
                }}
              />
            </div>
          )}

          {/* Scan line */}
          {phase === 3 && (
            <div
              data-testid="biometric-scan-line"
              style={{
                position: "absolute",
                left: 0,
                width: "100%",
                height: "2px",
                backgroundColor: "#1A6BFF",
                opacity: 0.9,
                animation: "bs-scan-line 2s linear",
                boxShadow: "0 0 8px #1A6BFF",
              }}
            />
          )}

          {/* Ripple effect */}
          {phase === 4 && (
            <div data-testid="biometric-scan-ripple" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
              {[0, 0.2, 0.4].map((delay, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    border: "1px solid #1A6BFF",
                    animation: `bs-ripple 1s ease-out ${delay}s forwards`,
                    pointerEvents: "none",
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Scanning text */}
        {phase === 3 && (
          <p
            className="bs-status-text"
            data-testid="biometric-scan-status"
            data-status="scanning"
            style={{
              marginTop: "24px",
              fontSize: "10px",
              letterSpacing: "0.25em",
              color: "#4A7FBF",
              animation: "bs-fade-in 0.5s ease forwards",
            }}
          >
            SCANNING PRINT...
          </p>
        )}

        {/* Access granted text */}
        {phase === 4 && (
          <p
            className="bs-status-text"
            data-testid="biometric-scan-status"
            data-status="granted"
            style={{
              marginTop: "24px",
              fontSize: "10px",
              letterSpacing: "0.3em",
              color: "#1A6BFF",
              animation: "bs-fade-in 0.5s ease forwards",
            }}
          >
            ACCESS GRANTED
          </p>
        )}
      </div>
    </>
  );
};

export default BiometricScan;
