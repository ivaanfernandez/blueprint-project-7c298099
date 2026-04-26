import { useEffect, useState } from "react";

interface BiometricScanRedProps {
  onComplete: () => void;
}

const BiometricScanRed = ({ onComplete }: BiometricScanRedProps) => {
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
        @keyframes bsr-fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes bsr-scan-line {
          0% { top: 0; }
          50% { top: calc(100% - 2px); }
          100% { top: 0; }
        }
        @keyframes bsr-glow-pulse {
          0%, 100% { filter: drop-shadow(0 0 8px #FF3B3B); }
          50% { filter: drop-shadow(0 0 20px #FF3B3B) drop-shadow(0 0 40px #FF3B3B); }
        }
        @keyframes bsr-ripple {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 0.6; }
          100% { transform: translate(-50%, -50%) scale(3); opacity: 0; }
        }
        @keyframes bsr-screen-fade {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
        @media (min-width: 768px) {
          .bsr-wordmark { font-size: 24px !important; }
          .bsr-fingerprint-container { width: 220px !important; height: 220px !important; }
          .bsr-fingerprint-svg { width: 220px !important; height: 220px !important; }
          .bsr-status-text { font-size: 13px !important; }
        }
      `}</style>
      <div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center"
        data-testid="biometric-scan"
        data-variant="red"
        data-phase={phase}
        style={{
          backgroundColor: "#000000",
          fontFamily: "'Space Grotesk', sans-serif",
          animation: phase >= 5 ? "bsr-screen-fade 0.8s ease-in forwards" : undefined,
        }}
      >
        <p
          className="bsr-wordmark"
          data-testid="biometric-scan-wordmark"
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
          ACCESSING HACK BAR
        </p>

        <div
          className="bsr-fingerprint-container"
          data-testid="biometric-scan-fingerprint"
          style={{
            position: "relative",
            width: "140px",
            height: "140px",
            opacity: phase >= 1 ? 1 : 0,
            transition: "opacity 0.6s ease",
            animation: phase === 3 ? "bsr-glow-pulse 2s ease-in-out infinite" : undefined,
            filter: phase >= 2 ? "drop-shadow(0 0 12px #FF3B3B)" : undefined,
          }}
        >
          <svg
            className="bsr-fingerprint-svg"
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
                stroke={phase >= 4 ? "#FF3B3B" : "#5C1111"}
                strokeWidth="1.5"
                style={{ transition: "stroke 0.8s ease" }}
              />
            ))}
            {[20, 30, 40].map((r, i) => (
              <path
                key={`arch-${i}`}
                d={`M ${70 - r * 0.6} ${55 - i * 4} Q 70 ${20 - i * 6} ${70 + r * 0.6} ${55 - i * 4}`}
                stroke={phase >= 4 ? "#FF3B3B" : "#5C1111"}
                strokeWidth="1.5"
                fill="none"
                style={{ transition: "stroke 0.8s ease" }}
              />
            ))}
            <path
              d="M 62 70 Q 65 60 70 58 Q 75 60 78 70 Q 75 80 70 82 Q 65 80 62 70Z"
              stroke={phase >= 4 ? "#FF3B3B" : "#5C1111"}
              strokeWidth="1.2"
              fill="none"
              style={{ transition: "stroke 0.8s ease" }}
            />
            {[1, 2, 3].map((n) => (
              <path
                key={`ridge-${n}`}
                d={`M ${46 + n * 2} ${30 + n * 3} Q 70 ${25 + n * 2} ${94 - n * 2} ${30 + n * 3}`}
                stroke={phase >= 4 ? "#FF3B3B" : "#5C1111"}
                strokeWidth="1.2"
                fill="none"
                style={{ transition: "stroke 0.8s ease" }}
              />
            ))}
          </svg>

          {phase === 3 && (
            <div
              data-testid="biometric-scan-line"
              style={{
                position: "absolute",
                left: 0,
                width: "100%",
                height: "2px",
                backgroundColor: "#FF3B3B",
                opacity: 0.9,
                animation: "bsr-scan-line 2s linear",
                boxShadow: "0 0 8px #FF3B3B",
              }}
            />
          )}

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
                    border: "1px solid #FF3B3B",
                    animation: `bsr-ripple 1s ease-out ${delay}s forwards`,
                    pointerEvents: "none",
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {phase === 3 && (
          <p
            className="bsr-status-text"
            data-testid="biometric-scan-status"
            data-status="scanning"
            style={{
              marginTop: "24px",
              fontSize: "10px",
              letterSpacing: "0.25em",
              color: "#BF4A4A",
              animation: "bsr-fade-in 0.5s ease forwards",
            }}
          >
            SCANNING PRINT...
          </p>
        )}

        {phase === 4 && (
          <p
            className="bsr-status-text"
            data-testid="biometric-scan-status"
            data-status="granted"
            style={{
              marginTop: "24px",
              fontSize: "10px",
              letterSpacing: "0.3em",
              color: "#FF3B3B",
              animation: "bsr-fade-in 0.5s ease forwards",
            }}
          >
            ACCESS GRANTED
          </p>
        )}
      </div>
    </>
  );
};

export default BiometricScanRed;
