import { useEffect, useState } from "react";

interface BiometricScanGreenProps {
  onComplete: () => void;
}

const BiometricScanGreen = ({ onComplete }: BiometricScanGreenProps) => {
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
        @keyframes bsg-fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes bsg-scan-line {
          0% { top: 0; }
          50% { top: calc(100% - 2px); }
          100% { top: 0; }
        }
        @keyframes bsg-glow-pulse {
          0%, 100% { filter: drop-shadow(0 0 8px #22C55E); }
          50% { filter: drop-shadow(0 0 20px #22C55E) drop-shadow(0 0 40px #22C55E); }
        }
        @keyframes bsg-ripple {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 0.6; }
          100% { transform: translate(-50%, -50%) scale(3); opacity: 0; }
        }
        @keyframes bsg-screen-fade {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
        @media (min-width: 768px) {
          .bsg-wordmark { font-size: 24px !important; }
          .bsg-fingerprint-container { width: 220px !important; height: 220px !important; }
          .bsg-fingerprint-svg { width: 220px !important; height: 220px !important; }
          .bsg-status-text { font-size: 13px !important; }
        }
      `}</style>
      <div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center"
        style={{
          backgroundColor: "#000000",
          fontFamily: "'Space Grotesk', sans-serif",
          animation: phase >= 5 ? "bsg-screen-fade 0.8s ease-in forwards" : undefined,
        }}
      >
        <p
          className="bsg-wordmark"
          style={{
            fontSize: "clamp(14px, 4vw, 18px)",
            letterSpacing: "0.3em",
            color: "#FFFFFF",
            textTransform: "uppercase",
            opacity: phase >= 1 ? 1 : 0,
            transition: "opacity 0.6s ease",
            marginBottom: "32px",
            textAlign: "center",
            width: "100%",
          }}
        >
          ACCESSING RESET
        </p>

        <div
          className="bsg-fingerprint-container"
          style={{
            position: "relative",
            width: "140px",
            height: "140px",
            opacity: phase >= 1 ? 1 : 0,
            transition: "opacity 0.6s ease",
            animation: phase === 3 ? "bsg-glow-pulse 2s ease-in-out infinite" : undefined,
            filter: phase >= 2 ? "drop-shadow(0 0 12px #22C55E)" : undefined,
          }}
        >
          <svg
            className="bsg-fingerprint-svg"
            viewBox="0 0 140 140"
            width="140"
            height="140"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {[18, 26, 34, 42, 50, 58].map((ry, i) => (
              <ellipse
                key={`outer-${i}`}
                cx="70"
                cy="75"
                rx={ry * 0.7}
                ry={ry}
                stroke={phase >= 4 ? "#22C55E" : "#0A3D1F"}
                strokeWidth="1.5"
                style={{ transition: "stroke 0.8s ease" }}
              />
            ))}
            {[20, 30, 40].map((r, i) => (
              <path
                key={`arch-${i}`}
                d={`M ${70 - r * 0.6} ${55 - i * 4} Q 70 ${20 - i * 6} ${70 + r * 0.6} ${55 - i * 4}`}
                stroke={phase >= 4 ? "#22C55E" : "#0A3D1F"}
                strokeWidth="1.5"
                fill="none"
                style={{ transition: "stroke 0.8s ease" }}
              />
            ))}
            <path
              d="M 62 70 Q 65 60 70 58 Q 75 60 78 70 Q 75 80 70 82 Q 65 80 62 70Z"
              stroke={phase >= 4 ? "#22C55E" : "#0A3D1F"}
              strokeWidth="1.2"
              fill="none"
              style={{ transition: "stroke 0.8s ease" }}
            />
            {[1, 2, 3].map((n) => (
              <path
                key={`ridge-${n}`}
                d={`M ${46 + n * 2} ${30 + n * 3} Q 70 ${25 + n * 2} ${94 - n * 2} ${30 + n * 3}`}
                stroke={phase >= 4 ? "#22C55E" : "#0A3D1F"}
                strokeWidth="1.2"
                fill="none"
                style={{ transition: "stroke 0.8s ease" }}
              />
            ))}
          </svg>

          {phase === 3 && (
            <div
              style={{
                position: "absolute",
                left: 0,
                width: "100%",
                height: "2px",
                backgroundColor: "#22C55E",
                opacity: 0.9,
                animation: "bsg-scan-line 2s linear",
                boxShadow: "0 0 8px #22C55E",
              }}
            />
          )}

          {phase === 4 && (
            <>
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
                    border: "1px solid #22C55E",
                    animation: `bsg-ripple 1s ease-out ${delay}s forwards`,
                    pointerEvents: "none",
                  }}
                />
              ))}
            </>
          )}
        </div>

        {phase === 3 && (
          <p
            className="bsg-status-text"
            style={{
              marginTop: "24px",
              fontSize: "10px",
              letterSpacing: "0.25em",
              color: "#4ABF6A",
              animation: "bsg-fade-in 0.5s ease forwards",
            }}
          >
            SCANNING PRINT...
          </p>
        )}

        {phase === 4 && (
          <p
            className="bsg-status-text"
            style={{
              marginTop: "24px",
              fontSize: "10px",
              letterSpacing: "0.3em",
              color: "#22C55E",
              animation: "bsg-fade-in 0.5s ease forwards",
            }}
          >
            ACCESS GRANTED
          </p>
        )}
      </div>
    </>
  );
};

export default BiometricScanGreen;
