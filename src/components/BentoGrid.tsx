import { useState } from "react";
import { Clock, Phone } from "lucide-react";

const CornerBrackets = ({ color }: { color: string }) => (
  <>
    <div className="corner-bracket" style={{ position: "absolute", top: 6, left: 6, width: 14, height: 14, borderTop: `1.5px solid ${color}`, borderLeft: `1.5px solid ${color}` }} />
    <div className="corner-bracket" style={{ position: "absolute", top: 6, right: 6, width: 14, height: 14, borderTop: `1.5px solid ${color}`, borderRight: `1.5px solid ${color}` }} />
    <div className="corner-bracket" style={{ position: "absolute", bottom: 6, left: 6, width: 14, height: 14, borderBottom: `1.5px solid ${color}`, borderLeft: `1.5px solid ${color}` }} />
    <div className="corner-bracket" style={{ position: "absolute", bottom: 6, right: 6, width: 14, height: 14, borderBottom: `1.5px solid ${color}`, borderRight: `1.5px solid ${color}` }} />
  </>
);

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

const MapCell = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="bento-cell group"
      style={{ background: "rgba(26,107,255,0.04)", border: "0.5px solid rgba(26,107,255,0.25)", padding: 0, position: "relative", cursor: "pointer", minHeight: "100%" }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(26,107,255,0.45)"; e.currentTarget.style.background = "rgba(26,107,255,0.07)"; setExpanded(true); }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(26,107,255,0.25)"; e.currentTarget.style.background = "rgba(26,107,255,0.04)"; setExpanded(false); }}
      onClick={() => setExpanded(prev => !prev)}
    >
      <CornerBrackets color="rgba(26,107,255,0.5)" />
      {[20, 40, 60, 80].map(p => (
        <div key={`h-${p}`} style={{ position: "absolute", top: `${p}%`, left: 0, right: 0, height: 1, background: "rgba(255,255,255,0.06)" }} />
      ))}
      {[20, 40, 60, 80].map(p => (
        <div key={`v-${p}`} style={{ position: "absolute", left: `${p}%`, top: 0, bottom: 0, width: 1, background: "rgba(255,255,255,0.06)" }} />
      ))}
      {[
        { w: 45, h: 35, t: "25%", l: "15%" }, { w: 55, h: 40, t: "55%", l: "70%" },
        { w: 38, h: 50, t: "35%", l: "60%" }, { w: 60, h: 35, t: "65%", l: "20%" },
        { w: 40, h: 45, t: "15%", l: "75%" }, { w: 50, h: 38, t: "50%", l: "35%" },
        { w: 35, h: 55, t: "20%", l: "45%" },
      ].map((b, i) => (
        <div key={i} style={{ position: "absolute", top: b.t, left: b.l, width: b.w, height: b.h, borderRadius: 6, background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.06)" }} />
      ))}
      <div style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%,-100%)" }}>
        <svg width="20" height="28" viewBox="0 0 20 28" fill="none">
          <path d="M10 0C4.5 0 0 4.5 0 10c0 7.5 10 18 10 18s10-10.5 10-18C20 4.5 15.5 0 10 0z" fill="#1A6BFF" />
          <circle cx="10" cy="10" r="5" fill="#0a0a0a" />
          <circle cx="10" cy="10" r="2.5" fill="#1A6BFF" />
        </svg>
      </div>
      <div className="bento-map-ping" style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%,-50%)", borderRadius: "50%", border: "1.5px solid rgba(26,107,255,0.5)" }} />
      <div className="bento-map-ping" style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%,-50%)", borderRadius: "50%", border: "1.5px solid rgba(26,107,255,0.5)", animationDelay: "0.7s" }} />
      <div style={{ position: "absolute", top: 12, right: 12, display: "flex", alignItems: "center", gap: 6, background: "rgba(0,0,0,0.6)", border: "0.5px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: "4px 10px" }}>
        <div className="bento-live-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#22C55E" }} />
        <span style={{ fontSize: 10, letterSpacing: "0.1em", color: "rgba(255,255,255,0.7)", fontFamily: "Space Grotesk, sans-serif" }}>LIVE</span>
      </div>
      <div style={{ position: "absolute", bottom: 16, left: 16, zIndex: 1 }}>
        <p style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>Santurce, PR</p>
        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>1951 Calle Loíza</p>
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.85)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          borderTop: "0.5px solid rgba(26,107,255,0.2)",
          borderRadius: 12,
          transform: expanded ? "translateY(0)" : "translateY(100%)",
          transition: "transform 300ms ease",
          padding: "40px 32px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          zIndex: 2,
        }}
      >
        <p style={{ fontSize: 28, fontWeight: 700, color: "#fff", marginBottom: 8 }}>Blueprint Project</p>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", marginBottom: 24 }}>1951 Calle Loíza, Santurce, PR 00911</p>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <Clock size={20} color="#1A6BFF" />
          <span style={{ fontSize: 16, color: "rgba(255,255,255,0.6)" }}>Mon–Fri: 5:00 AM – 10:00 PM</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
          <Phone size={20} color="#1A6BFF" />
          <span style={{ fontSize: 16, color: "rgba(255,255,255,0.6)" }}>(787) 000-0000</span>
        </div>
        <a
          href="https://maps.google.com/?q=18.4488,-66.0614"
          target="_blank"
          rel="noopener noreferrer"
          onClick={e => e.stopPropagation()}
          className="bento-maps-link"
          style={{ fontSize: 14, letterSpacing: "0.1em", textTransform: "uppercase", color: "#1A6BFF", textDecoration: "none", width: "fit-content" }}
        >
          Open in Maps →
        </a>
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #1A6BFF, rgba(26,107,255,0.2))", borderRadius: "0 0 12px 12px" }} />
    </div>
  );
};


const BentoGrid = () => (
  <section className="relative z-10 pb-8 md:pb-12" style={{ background: "transparent", paddingTop: 0, marginTop: 0 }}>
    <div
      className="bento-grid-2col mx-4 md:mx-auto"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: 20,
        alignItems: "stretch",
        maxWidth: 900,
      }}
    >
      <BiometricScanCard />
      <MapCell />
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
      .bento-map-ping {
        animation: bentoMapPing 2s ease-out infinite;
      }
      .bento-live-dot {
        animation: bentoLivePulse 1.5s ease-in-out infinite;
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
      @keyframes bentoMapPing {
        0% { width: 10px; height: 10px; opacity: 1; }
        100% { width: 60px; height: 60px; opacity: 0; }
      }
      @keyframes bentoLivePulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.4; }
      }
      .bento-maps-link:hover {
        text-decoration: underline;
      }
      @media (max-width: 767px) {
        .bento-grid-2col {
          grid-template-columns: 1fr !important;
          gap: 16px !important;
        }
      }
    `}</style>
  </section>
);

export default BentoGrid;
