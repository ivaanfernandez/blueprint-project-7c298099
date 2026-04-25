const FingerprintBigSVG = ({ color, size = 160 }: { color: string; size?: number }) => (
  <svg viewBox="0 0 140 140" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
    {[18, 26, 34, 42, 50].map((ry, i) => (
      <ellipse key={i} cx="70" cy="75" rx={ry * 0.7} ry={ry} stroke={color} strokeWidth="1.8" />
    ))}
    {[20, 30, 40].map((r, i) => (
      <path key={`a-${i}`} d={`M ${70 - r * 0.6} ${55 - i * 4} Q 70 ${20 - i * 6} ${70 + r * 0.6} ${55 - i * 4}`} stroke={color} strokeWidth="1.8" fill="none" />
    ))}
    <path d="M 62 70 Q 65 60 70 58 Q 75 60 78 70 Q 75 80 70 82 Q 65 80 62 70Z" stroke={color} strokeWidth="1.4" fill="none" />
  </svg>
);

const BiometricScanCard = () => (
  <div
    className="bento-cell"
    style={{
      background: "rgba(0,0,0,0.6)",
      border: "1px solid rgba(26,107,255,0.15)",
      borderRadius: 16,
      padding: "32px 24px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 24,
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      minHeight: "100%",
      position: "relative",
      overflow: "hidden",
    }}
  >
    {/* Header */}
    <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
      <p style={{ fontSize: 9, letterSpacing: "0.25em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", fontFamily: "'Inter', sans-serif", margin: 0 }}>
        Security Level
      </p>
      <p style={{ fontSize: 10, letterSpacing: "0.3em", color: "#1A6BFF", textTransform: "uppercase", fontFamily: "'Orbitron', sans-serif", fontWeight: 500, margin: 0 }}>
        Blueprint
      </p>
      <div style={{ display: "flex", gap: 4 }}>
        <span className="bento-fp-blink" style={{ width: 6, height: 6, borderRadius: "50%", background: "#1A6BFF", boxShadow: "0 0 6px #1A6BFF" }} />
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(26,107,255,0.3)" }} />
      </div>
    </div>

    {/* Fingerprint */}
    <div style={{ position: "relative", width: 160, height: 160, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(circle, rgba(26,107,255,0.25) 0%, transparent 70%)", filter: "blur(20px)", pointerEvents: "none" }} />
      <FingerprintBigSVG color="#1A6BFF" size={160} />
      <div
        aria-hidden
        className="bento-fp-scan"
        style={{
          position: "absolute",
          left: "8%",
          width: "84%",
          height: 2,
          background: "linear-gradient(90deg, transparent, #1A6BFF, transparent)",
          boxShadow: "0 0 12px #1A6BFF",
          pointerEvents: "none",
        }}
      />
    </div>

    {/* Divider */}
    <div style={{ width: "100%", height: 1, background: "linear-gradient(90deg, transparent, rgba(26,107,255,0.3), transparent)" }} />

    {/* Footer */}
    <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
      <p style={{ fontSize: 9, letterSpacing: "0.25em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", fontFamily: "'Inter', sans-serif", margin: 0 }}>
        Biometric Scan
      </p>
      <p style={{ fontSize: 10, letterSpacing: "0.3em", color: "#1A6BFF", textTransform: "uppercase", fontFamily: "'Orbitron', sans-serif", fontWeight: 500, margin: 0 }}>
        System Active
      </p>
      <span className="bento-fp-blink" style={{ width: 6, height: 6, borderRadius: "50%", background: "#1A6BFF", boxShadow: "0 0 6px #1A6BFF" }} />
    </div>
  </div>
);

const BentoGrid = () => (
  <section className="relative z-10 pb-8 md:pb-12" style={{ background: "transparent", paddingTop: 0, marginTop: 0 }}>
    <div
      className="mx-4 md:mx-auto"
      style={{
        maxWidth: 440,
      }}
    >
      <BiometricScanCard />
    </div>
    <style>{`
      .bento-cell {
        border-radius: 12px;
        padding: 16px;
        position: relative;
        overflow: hidden;
        transition: border-color 0.3s, background 0.3s;
        min-height: 320px;
      }
      .bento-fp-scan {
        animation: bentoFpScan 3s ease-in-out infinite;
      }
      .bento-fp-blink {
        animation: bentoFpBlink 1.4s ease-in-out infinite;
      }
      @keyframes bentoFpScan {
        0%, 100% { top: 10%; opacity: 0; }
        10% { opacity: 1; }
        50% { top: 85%; opacity: 1; }
        90% { opacity: 1; }
        95% { opacity: 0; }
      }
      @keyframes bentoFpBlink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.3; }
      }
    `}</style>
  </section>
);

export default BentoGrid;
