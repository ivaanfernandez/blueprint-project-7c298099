import { useEffect, useState } from "react";

interface BiometricScanProps {
  onComplete: () => void;
}

const BiometricScan = ({ onComplete }: BiometricScanProps) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 200),
      setTimeout(() => setPhase(2), 3000),
      setTimeout(() => setPhase(3), 5000),
      setTimeout(() => setPhase(4), 9000),
      setTimeout(() => setPhase(5), 12000),
      setTimeout(() => onComplete(), 14000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <>
      <style>{`
        @keyframes bs-fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes bs-fade-out { from { opacity: 1; } to { opacity: 0; } }
        @keyframes bs-scan-line {
          0% { top: 0; }
          50% { top: calc(100% - 2px); }
          100% { top: 0; }
        }

        @keyframes bs-glow-pulse {
          0%, 100% { filter: drop-shadow(0 0 8px #1A6BFF); }
          50% { filter: drop-shadow(0 0 20px #1A6BFF) drop-shadow(0 0 40px #1A6BFF); }

        }
        @keyframes bs-ripple {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 0.6; }
          100% { transform: translate(-50%, -50%) scale(3); opacity: 0; }
        }
        @keyframes bs-screen-fade {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
      <div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center"
        style={{
          backgroundColor: "#000000",
          fontFamily: "'Space Grotesk', sans-serif",
          animation: phase >= 5 ? "bs-screen-fade 1s ease-in forwards" : undefined,
        }}
      >
        {/* Wordmark */}
        <p
          style={{
            fontSize: "13px",
            letterSpacing: "0.3em",
            color: "#FFFFFF",
            textTransform: "uppercase" as const,
            opacity: phase >= 1 ? 1 : 0,
            transition: "opacity 1s ease",
            marginBottom: "32px",
          }}
        >
          BLUEPRINT PROJECT
        </p>

        {/* Fingerprint container */}
        <div
          style={{
            position: "relative",
            width: "140px",
            height: "140px",
            opacity: phase >= 2 ? 1 : 0,
            transition: "opacity 0.8s ease",
            animation: phase === 3 ? "bs-glow-pulse 1.5s ease-in-out infinite" : undefined,
            filter: phase >= 2 ? "drop-shadow(0 0 12px #1A6BFF)" : undefined,
          }}
        >
          <svg
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

          {/* Scan line */}
          {phase === 3 && (
            <div
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
                    border: "1px solid #1A6BFF",
                    animation: `bs-ripple 1.2s ease-out ${delay}s forwards`,
                    pointerEvents: "none",
                  }}
                />
              ))}
            </>
          )}
        </div>

        {/* Scanning text */}
        {phase === 3 && (
          <p
            style={{
              marginTop: "24px",
              fontSize: "10px",
              letterSpacing: "0.25em",
              color: "#4A7FBF",
              animation: "bs-fade-in 0.5s ease forwards",
            }}
          >
            ESCANEANDO HUELLA...
          </p>
        )}

        {/* Access granted text */}
        {phase === 4 && (
          <p
            style={{
              marginTop: "24px",
              fontSize: "10px",
              letterSpacing: "0.3em",
              color: "#1A6BFF",
              animation: "bs-fade-in 0.5s ease forwards",
            }}
          >
            ACCESO CONCEDIDO
          </p>
        )}
      </div>
    </>
  );
};

export default BiometricScan;
