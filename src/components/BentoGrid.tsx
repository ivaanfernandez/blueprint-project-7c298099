import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Phone } from "lucide-react";

const FINGERPRINT_CARDS = [
  {
    color: "#22C55E",
    borderColor: "rgba(34,197,94,0.25)",
    bgColor: "rgba(34,197,94,0.04)",
    hoverBorder: "rgba(34,197,94,0.45)",
    hoverBg: "rgba(34,197,94,0.07)",
    bracketColor: "rgba(34,197,94,0.5)",
    bracketHover: "rgba(34,197,94,0.8)",
    delay: "0.8s",
    tag: "HACK BAR",
    title: "HACK BAR",
  },
  {
    color: "#FF3B3B",
    borderColor: "rgba(255,59,59,0.25)",
    bgColor: "rgba(255,59,59,0.04)",
    hoverBorder: "rgba(255,59,59,0.45)",
    hoverBg: "rgba(255,59,59,0.07)",
    bracketColor: "rgba(255,59,59,0.5)",
    bracketHover: "rgba(255,59,59,0.8)",
    delay: "1.6s",
    tag: "RESET",
    title: "RESET",
  },
];

const CornerBrackets = ({ color }: { color: string }) => (
  <>
    <div className="corner-bracket" style={{ position: "absolute", top: 6, left: 6, width: 14, height: 14, borderTop: `1.5px solid ${color}`, borderLeft: `1.5px solid ${color}` }} />
    <div className="corner-bracket" style={{ position: "absolute", top: 6, right: 6, width: 14, height: 14, borderTop: `1.5px solid ${color}`, borderRight: `1.5px solid ${color}` }} />
    <div className="corner-bracket" style={{ position: "absolute", bottom: 6, left: 6, width: 14, height: 14, borderBottom: `1.5px solid ${color}`, borderLeft: `1.5px solid ${color}` }} />
    <div className="corner-bracket" style={{ position: "absolute", bottom: 6, right: 6, width: 14, height: 14, borderBottom: `1.5px solid ${color}`, borderRight: `1.5px solid ${color}` }} />
  </>
);

const FingerprintScan = ({ color, delay }: { color: string; delay: string }) => (
  <div style={{ position: "relative", width: 56, height: 64, marginBottom: 12 }}>
    <div style={{
      position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
      width: 64, height: 64, borderRadius: "50%", border: `1px solid ${color}1a`,
    }} />
    <svg viewBox="0 0 56 56" width={40} height={40} fill="none" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", opacity: 0.45 }}>
      {[8, 12, 16, 20, 24].map((r, i) => (
        <ellipse key={i} cx="28" cy="30" rx={r * 0.7} ry={r} stroke={color} strokeWidth="1.2" />
      ))}
      {[9, 14, 19].map((r, i) => (
        <path key={`a-${i}`} d={`M ${28 - r * 0.6} ${22 - i * 2} Q 28 ${14 - i * 3} ${28 + r * 0.6} ${22 - i * 2}`} stroke={color} strokeWidth="1.2" fill="none" />
      ))}
    </svg>
    <div className="bento-scan-line" style={{ position: "absolute", left: "10%", right: "10%", height: 2, background: `linear-gradient(90deg, transparent, ${color}, transparent)`, animationDelay: delay }} />
    <div className="bento-scan-glow" style={{ position: "absolute", left: "10%", right: "10%", height: 16, background: `linear-gradient(180deg, transparent, ${color}14, transparent)`, animationDelay: delay }} />
  </div>
);

const FingerprintCard = ({ card }: { card: typeof FINGERPRINT_CARDS[0] }) => (
  <motion.div
    className="bento-cell group"
    style={{ background: card.bgColor, border: `0.5px solid ${card.borderColor}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%" }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = card.hoverBorder; e.currentTarget.style.background = card.hoverBg; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = card.borderColor; e.currentTarget.style.background = card.bgColor; }}
    whileHover={{ scale: 1.04, y: -4 }}
    whileTap={{ scale: 0.97 }}
    transition={{ type: "spring", stiffness: 400, damping: 20 }}
  >
    <CornerBrackets color={card.bracketColor} />
    <FingerprintScan color={card.color} delay={card.delay} />
    <p style={{ fontSize: 16, fontWeight: 700, color: card.color, textAlign: "center", fontFamily: "Bebas Neue, sans-serif", marginTop: 4 }}>{card.title}</p>
  </motion.div>
);


const MapCell = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="bento-cell group"
      style={{ background: "rgba(26,107,255,0.04)", border: "0.5px solid rgba(26,107,255,0.25)", padding: 0, position: "relative", cursor: "pointer" }}
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
          padding: 20,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          zIndex: 2,
        }}
      >
        <p style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 4 }}>Blueprint Project</p>
        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 16 }}>1951 Calle Loíza, Santurce, PR 00911</p>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
          <Clock size={13} color="#1A6BFF" />
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>Mon–Fri: 5:00 AM – 10:00 PM</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
          <Phone size={13} color="#1A6BFF" />
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>(787) 000-0000</span>
        </div>
        <a
          href="https://maps.google.com/?q=18.4488,-66.0614"
          target="_blank"
          rel="noopener noreferrer"
          onClick={e => e.stopPropagation()}
          className="bento-maps-link"
          style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#1A6BFF", textDecoration: "none", width: "fit-content" }}
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
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mx-4 md:mx-auto" style={{ maxWidth: 900 }}>
      {FINGERPRINT_CARDS.map(card => <FingerprintCard key={card.tag} card={card} />)}
      <div className="col-span-2 md:col-span-1">
        <MapCell />
      </div>
    </div>
    <style>{`
      .bento-cell {
        border-radius: 12px;
        padding: 16px;
        position: relative;
        overflow: hidden;
        transition: border-color 0.3s, background 0.3s;
        min-height: 180px;
      }
      .bento-scan-line, .bento-scan-glow {
        animation: bentoScanMove 2.5s ease-in-out infinite;
      }
      .bento-map-ping {
        animation: bentoMapPing 2s ease-out infinite;
      }
      .bento-live-dot {
        animation: bentoLivePulse 1.5s ease-in-out infinite;
      }
      @keyframes bentoScanMove {
        0% { top: 10%; opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { top: 88%; opacity: 0; }
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
    `}</style>
  </section>
);

export default BentoGrid;
