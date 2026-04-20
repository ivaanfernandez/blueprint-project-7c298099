import { useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import BiometricScanRed from "@/components/BiometricScanRed";
import { TextScramble } from "@/components/ui/text-scramble";
import { Dock, DockIcon } from "@/components/ui/dock";

/* ── Inline SVG ── */
const FingerprintSVG = ({ color, size = 48 }: { color: string; size?: number }) => (
  <svg viewBox="0 0 140 140" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", margin: "0 auto" }}>
    {[18, 26, 34, 42, 50].map((ry, i) => (
      <ellipse key={i} cx="70" cy="75" rx={ry * 0.7} ry={ry} stroke={color} strokeWidth="1.8" />
    ))}
    {[20, 30, 40].map((r, i) => (
      <path key={`a-${i}`} d={`M ${70 - r * 0.6} ${55 - i * 4} Q 70 ${20 - i * 6} ${70 + r * 0.6} ${55 - i * 4}`} stroke={color} strokeWidth="1.8" fill="none" />
    ))}
    <path d="M 62 70 Q 65 60 70 58 Q 75 60 78 70 Q 75 80 70 82 Q 65 80 62 70Z" stroke={color} strokeWidth="1.4" fill="none" />
  </svg>
);

const HUELLAS = [
  { color: "#1A6BFF", glow: "rgba(26,107,255,0.7)", route: "/huella-azul", tooltip: "TRAINING" },
  { color: "#FF3B3B", glow: "rgba(255,59,59,0.7)", route: "/huella-roja", tooltip: "NUTRITION" },
  { color: "#22C55E", glow: "rgba(34,197,94,0.7)", route: "/huella-verde", tooltip: "RECOVERY" },
];

/* ── Corner Brackets ── */
const CornerBrackets = () => (
  <>
    {[
      { top: 12, left: 12, borderTop: "2px solid", borderLeft: "2px solid" },
      { top: 12, right: 12, borderTop: "2px solid", borderRight: "2px solid" },
      { bottom: 12, left: 12, borderBottom: "2px solid", borderLeft: "2px solid" },
      { bottom: 12, right: 12, borderBottom: "2px solid", borderRight: "2px solid" },
    ].map((pos, i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          width: 20,
          height: 20,
          zIndex: 3,
          borderColor: "rgba(255,59,59,0.4)",
          ...pos,
        } as React.CSSProperties}
      />
    ))}
  </>
);

/* ── Fuel Card ── */
const FuelCard = ({ name, desc, items, index, image }: { name: string; desc: string; items: string[]; index: number; image?: string }) => (
  <div
    className="hr-fuel-card"
    style={{
      flex: 1,
      borderRadius: 16,
      minHeight: 400,
      position: "relative",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      padding: "28px 24px",
      cursor: "pointer",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      animation: `hrFadeUp 0.5s ease ${index * 0.15}s both`,
    }}
  >
    {/* Placeholder bg */}
    <div style={{ position: "absolute", inset: 0, backgroundColor: "#1a1a1a", zIndex: 0 }} />
    {/* Image bg */}
    {image && (
      <img
        src={image}
        alt={name}
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", zIndex: 0 }}
      />
    )}
    {/* Gradient overlay */}
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.9) 15%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)", zIndex: 1 }} />
    <CornerBrackets />
    {/* Scan line */}
    <div style={{ position: "absolute", left: 0, right: 0, height: 1, background: "linear-gradient(to right, transparent, rgba(255,59,59,0.3), transparent)", animation: "hrScanLine 4s ease-in-out infinite", zIndex: 2, pointerEvents: "none" }} />
    {/* Content */}
    <div style={{ position: "relative", zIndex: 2 }}>
      <p style={{ fontFamily: "'Michroma', sans-serif", fontSize: 18, color: "#fff", textTransform: "uppercase", marginBottom: 8 }}>{name}</p>
      {desc && <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.6, marginBottom: 12 }}>{desc}</p>}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {items.map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: "#FF3B3B", flexShrink: 0 }} />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.45)" }}>{item}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ── Station Card ── */
const StationCard = ({ name, desc, index }: { name: string; desc: string; index: number }) => (
  <div
    className="hr-station-card"
    style={{
      borderRadius: 14,
      minHeight: 300,
      position: "relative",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      padding: "24px 20px",
      cursor: "pointer",
      transition: "transform 0.3s ease",
      animation: `hrFadeUp 0.5s ease ${index * 0.15}s both`,
    }}
  >
    <div style={{ position: "absolute", inset: 0, backgroundColor: "#1a1a1a" }} />
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 10%, rgba(0,0,0,0.3) 60%, transparent)", zIndex: 1 }} />
    {/* Red accent line */}
    <div style={{ position: "absolute", bottom: 0, left: "20%", right: "20%", height: 2, background: "linear-gradient(to right, transparent, #FF3B3B, transparent)", zIndex: 2 }} />
    <div style={{ position: "relative", zIndex: 2 }}>
      <p style={{ fontFamily: "'Michroma', sans-serif", fontSize: 14, color: "#fff", textTransform: "uppercase", marginBottom: 8 }}>{name}</p>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{desc}</p>
    </div>
  </div>
);

/* ── Chef Card ── */
const ChefCard = ({ name, desc, index }: { name: string; desc: string; index: number }) => {
  const bgGradients = [
    "linear-gradient(135deg, rgba(255,59,59,0.1), rgba(255,59,59,0.03))",
    "linear-gradient(135deg, rgba(255,59,59,0.08), rgba(255,59,59,0.02))",
    "linear-gradient(135deg, rgba(255,59,59,0.06), rgba(255,59,59,0.01))",
  ];
  return (
    <div
      className="hr-chef-card"
      style={{
        borderRadius: 14,
        minHeight: 220,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "20px 16px",
        cursor: "pointer",
        transition: "transform 0.3s ease",
        animation: `hrFadeUp 0.5s ease ${index * 0.15}s both`,
      }}
    >
      <div style={{ position: "absolute", inset: 0, borderRadius: 14, background: bgGradients[index] ?? bgGradients[0], border: "1px solid rgba(255,59,59,0.1)" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.8) 10%, rgba(0,0,0,0.2) 60%, transparent)", zIndex: 1 }} />
      <div style={{ position: "absolute", bottom: 0, left: "20%", right: "20%", height: 2, background: "linear-gradient(to right, transparent, #FF3B3B, transparent)", zIndex: 2 }} />
      <div style={{ position: "relative", zIndex: 2 }}>
        <p style={{ fontFamily: "'Michroma', sans-serif", fontSize: 14, color: "#FFFFFF", textTransform: "uppercase", letterSpacing: "0.02em", marginBottom: 6 }}>{name}</p>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{desc}</p>
      </div>
    </div>
  );
};

/* ── 3D Perspective Carousel ── */
const CAROUSEL_CARDS = [
  { title: "MEAL PREPS", desc: "High-performance meals with perfect macro balance.", icon: "M3 3h18v18H3zM3 9h18M9 3v18", image: "" },
  { title: "DETOX JUICE", desc: "Cold-pressed functional blends for cleansing and energy.", icon: "M12 2a10 10 0 100 20 10 10 0 000-20zM12 6v6l4 2", image: "" },
  { title: "SUPPLEMENTS", desc: "Blueprint Approved stack for recovery and focus.", icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5", image: "/hackbar/supplements-stack.jpg" },
];

const Carousel3D = () => {
  const [activeCard, setActiveCard] = useState(1);
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const threshold = 40;
    if (dx <= -threshold && activeCard < CAROUSEL_CARDS.length - 1) {
      setActiveCard(activeCard + 1);
    } else if (dx >= threshold && activeCard > 0) {
      setActiveCard(activeCard - 1);
    }
    touchStartX.current = null;
  };

  return (
    <>
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "60px 7%", perspective: "1000px", position: "relative", minHeight: 400, touchAction: "pan-y" }}
      >
        {CAROUSEL_CARDS.map((card, index) => {
          const isActive = index === activeCard;
          const isLeft = index < activeCard;
          return (
            <div
              key={card.title}
              onClick={() => setActiveCard(index)}
              style={{
                width: isActive ? 320 : 260,
                minHeight: isActive ? 380 : 340,
                borderRadius: 20,
                background: "rgba(255,255,255,0.03)",
                border: `1px solid rgba(255,59,59,${isActive ? 0.3 : 0.1})`,
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                padding: "32px 24px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 20,
                textAlign: "center",
                cursor: isActive ? "default" : "pointer",
                transition: "all 0.5s cubic-bezier(0.4,0,0.2,1)",
                transform: isActive
                  ? "translateX(0) rotateY(0deg) scale(1)"
                  : isLeft
                  ? "translateX(-40px) rotateY(15deg) scale(0.85)"
                  : "translateX(40px) rotateY(-15deg) scale(0.85)",
                opacity: isActive ? 1 : 0.4,
                zIndex: isActive ? 10 : 5,
                position: "relative",
                boxShadow: isActive ? "0 0 40px rgba(255,59,59,0.1), inset 0 1px 0 rgba(255,255,255,0.05)" : "none",
                flexShrink: 0,
              }}
            >
              {isActive && (
                <div style={{ position: "absolute", inset: -1, borderRadius: 21, background: "linear-gradient(135deg, rgba(255,59,59,0.25), transparent 50%, rgba(255,59,59,0.15))", zIndex: -1, pointerEvents: "none" }} />
              )}
              {card.image && (
                <>
                  <img
                    src={card.image}
                    alt={card.title}
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", borderRadius: 20, opacity: isActive ? 0.55 : 0.35, transition: "opacity 0.5s ease", zIndex: 0, pointerEvents: "none" }}
                  />
                  <div style={{ position: "absolute", inset: 0, borderRadius: 20, background: "linear-gradient(to top, rgba(0,0,0,0.85) 10%, rgba(0,0,0,0.45) 60%, rgba(0,0,0,0.25) 100%)", zIndex: 1, pointerEvents: "none" }} />
                </>
              )}
              <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
              <div style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: 8,
                letterSpacing: "0.15em",
                color: isActive ? "#FF3B3B" : "rgba(255,255,255,0.3)",
                textTransform: "uppercase",
                padding: "4px 12px",
                borderRadius: 6,
                background: isActive ? "rgba(255,59,59,0.1)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${isActive ? "rgba(255,59,59,0.2)" : "rgba(255,255,255,0.05)"}`,
                transition: "all 0.5s ease",
              }}>{`Feature ${index + 1}`}</div>
              <div style={{
                width: 60, height: 60, borderRadius: 16,
                background: isActive ? "rgba(255,59,59,0.08)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${isActive ? "rgba(255,59,59,0.2)" : "rgba(255,255,255,0.05)"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.5s ease",
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={isActive ? "#FF3B3B" : "rgba(255,255,255,0.2)"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.5s ease" }}>
                  {card.icon.split(/(?=M)/).map((d, i) => (<path key={i} d={d} />))}
                </svg>
              </div>
              <h3 style={{ fontFamily: "'Michroma', sans-serif", fontSize: isActive ? 18 : 14, color: "#FFFFFF", textTransform: "uppercase", letterSpacing: "0.03em", transition: "font-size 0.5s ease", margin: 0 }}>{card.title}</h3>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                color: "rgba(255,255,255,0.45)",
                lineHeight: 1.6,
                maxWidth: 260,
                opacity: isActive ? 1 : 0,
                maxHeight: isActive ? 80 : 0,
                overflow: "hidden",
                transition: "opacity 0.5s ease, max-height 0.5s ease",
                margin: 0,
              }}>{card.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 8, paddingBottom: 40 }}>
        {CAROUSEL_CARDS.map((_, index) => (
          <div
            key={index}
            onClick={() => setActiveCard(index)}
            style={{
              width: index === activeCard ? 24 : 8,
              height: 8,
              borderRadius: 4,
              background: index === activeCard ? "#FF3B3B" : "rgba(255,255,255,0.15)",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>
    </>
  );
};

/* ══════════════════════════════════════════════════════════ */
/*  HUELLA ROJA — HACK BAR PAGE                              */
/* ══════════════════════════════════════════════════════════ */

const HuellaRoja = ({ showDock }: { showDock: boolean }) => {
  const navigate = useNavigate();
  const [scanDone, setScanDone] = useState(false);
  const handleScanComplete = useCallback(() => setScanDone(true), []);

  if (!scanDone) {
    return <BiometricScanRed onComplete={handleScanComplete} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      style={{ fontFamily: "'Inter', sans-serif", position: "relative", overflowX: "hidden", backgroundColor: "#0a0a0a" }}
    >
      <style>{`
        @keyframes hrScanLine {
          0% { top: 0; opacity: 0; }
          10% { opacity: 0.3; }
          90% { opacity: 0.3; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes hrFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes hrAmbient {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.06); }
        }
        @keyframes labScanLine {
          0%, 100% { top: 5%; opacity: 0; }
          10% { opacity: 0.6; }
          50% { top: 90%; opacity: 0.6; }
          90% { opacity: 0; }
        }
        @keyframes labPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        @keyframes labDataFlicker {
          0%, 90%, 100% { opacity: 1; }
          92% { opacity: 0.3; }
          94% { opacity: 0.8; }
          96% { opacity: 0.2; }
        }
        @keyframes labRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes labHeartPulse {
          0%, 100% { opacity: 0.4; transform: scaleY(1); }
          50% { opacity: 0.9; transform: scaleY(1.15); }
        }
        .hr-fuel-card:hover { transform: translateY(-4px); box-shadow: 0 8px 32px rgba(255,59,59,0.15); }
        .hr-station-card:hover { transform: translateY(-4px); }
        @media (max-width: 767px) {
          .hr-hero { flex-direction: column !important; }
          .hr-hero-left { flex: none !important; width: 100% !important; padding: 100px 6% 40px !important; text-align: center !important; align-items: center !important; }
          .hr-hero-right { flex: none !important; width: 100% !important; height: 250px !important; }
          .hr-hero-fade { width: 100% !important; height: 60px !important; background: linear-gradient(to bottom, #0a0a0a, transparent) !important; top: 0 !important; left: 0 !important; }
          .hr-hero-title { font-size: clamp(28px, 8vw, 42px) !important; }
          .hr-hero-placeholder { width: 90% !important; height: 80% !important; }
          .hr-fuel-grid { flex-direction: column !important; gap: 16px !important; }
          .hr-fuel-card { min-height: 320px !important; }
          .hr-station-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
          .hr-station-card { min-height: 260px !important; }
          .hr-chef-row { flex-direction: column !important; gap: 24px !important; }
          .hr-chef-left { flex: none !important; width: 100% !important; text-align: center !important; align-items: center !important; }
          .hr-chef-right { flex: none !important; width: 100% !important; min-height: 250px !important; }
          .hr-chef-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
          .hr-chef-card { min-height: 180px !important; }
          .hr-footer { padding: 32px 6% !important; }
          .lab-footer { height: auto !important; min-height: 500px !important; padding: 32px 24px !important; }
          .lab-footer-row { flex-direction: column !important; gap: 40px !important; padding: 32px 24px !important; height: auto !important; }
          .lab-col-left, .lab-col-center, .lab-col-right { flex: none !important; width: 100% !important; align-items: center !important; text-align: center !important; }
          .lab-col-left .lab-data-item, .lab-col-right .lab-data-item { text-align: center !important; }
          .lab-data-label { font-size: 6px !important; }
          .lab-data-value { font-size: 13px !important; }
          .lab-corner { width: 28px !important; height: 28px !important; }
          .lab-corner.tl, .lab-corner.tr { top: 12px !important; }
          .lab-corner.bl, .lab-corner.br { bottom: 12px !important; }
          .lab-corner.tl, .lab-corner.bl { left: 12px !important; }
          .lab-corner.tr, .lab-corner.br { right: 12px !important; }
        }
      `}</style>

      {/* ── DOCK ── */}
      {showDock && (
        <div style={{ position: "fixed", top: 14, left: "50%", transform: "translateX(-50%)", zIndex: 50 }}>
          <Dock magnification={64} distance={100}>
            {HUELLAS.map((h) => (
              <DockIcon key={h.route} tooltip={h.tooltip} onClick={() => navigate(h.route)}>
                <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 12, background: `radial-gradient(circle, ${h.glow} 0%, transparent 70%)` }}>
                  <FingerprintSVG color={h.color} size={32} />
                </div>
              </DockIcon>
            ))}
          </Dock>
        </div>
      )}

      {/* ═══ SECTION A: HERO ═══ */}
      <section className="hr-hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", backgroundColor: "#0a0a0a" }}>
        {/* Left column */}
        <div className="hr-hero-left" style={{ flex: "0 0 55%", padding: "80px 0 80px 7%", display: "flex", flexDirection: "column", justifyContent: "center", gap: 16, position: "relative", zIndex: 2 }}>
          {/* Ambient glow — single soft pulsing layer */}
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 20% 60%, rgba(255,59,59,0.10) 0%, transparent 60%)", pointerEvents: "none", animation: "hrAmbient 6s ease-in-out infinite" }} />

          <TextScramble
            className="hr-hero-title"
            as="h1"
            style={{ fontFamily: "'Michroma', sans-serif", fontSize: "clamp(36px, 5vw, 64px)", color: "#FFFFFF", textTransform: "uppercase", letterSpacing: "0.04em", lineHeight: 1.08 }}
            duration={1.2}
            speed={0.04}
          >
            HACK BAR
          </TextScramble>
        </div>

        {/* Right column */}
        <div className="hr-hero-right" style={{ flex: "0 0 45%", position: "relative", height: "100vh", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ position: "absolute", inset: 0, backgroundColor: "#1a1a1a" }} />
          {/* Left fade */}
          <div className="hr-hero-fade" style={{ position: "absolute", top: 0, left: 0, width: 80, height: "100%", background: "linear-gradient(to right, #0a0a0a, transparent)", zIndex: 3, pointerEvents: "none" }} />
          {/* Placeholder box */}
          <div className="hr-hero-placeholder" style={{ position: "relative", zIndex: 2, width: "80%", height: "60%", border: "1px solid rgba(255,59,59,0.15)", borderRadius: 12, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, background: "rgba(255,59,59,0.02)" }}>
            {/* Corner brackets */}
            <div style={{ position: "absolute", top: 8, left: 8, width: 16, height: 16, borderTop: "2px solid rgba(255,59,59,0.3)", borderLeft: "2px solid rgba(255,59,59,0.3)" }} />
            <div style={{ position: "absolute", top: 8, right: 8, width: 16, height: 16, borderTop: "2px solid rgba(255,59,59,0.3)", borderRight: "2px solid rgba(255,59,59,0.3)" }} />
            <div style={{ position: "absolute", bottom: 8, left: 8, width: 16, height: 16, borderBottom: "2px solid rgba(255,59,59,0.3)", borderLeft: "2px solid rgba(255,59,59,0.3)" }} />
            <div style={{ position: "absolute", bottom: 8, right: 8, width: 16, height: 16, borderBottom: "2px solid rgba(255,59,59,0.3)", borderRight: "2px solid rgba(255,59,59,0.3)" }} />
            {/* Camera icon */}
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(255,59,59,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "rgba(255,59,59,0.25)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Image placeholder</span>
          </div>
        </div>
      </section>

      {/* ═══ SECTION B: FUEL YOUR SYSTEM ═══ */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ backgroundColor: "#0a0a0a", padding: "72px 7%", position: "relative", zIndex: 1 }}
      >
        <p style={{ fontFamily: "'Michroma', sans-serif", fontSize: "clamp(16px, 2vw, 24px)", color: "#FFFFFF", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 32, textAlign: "center", width: "100%" }}>
          FUEL YOUR SYSTEM
        </p>
        <div className="hr-fuel-grid" style={{ display: "flex", gap: 20 }}>
          <FuelCard
            index={0}
            name="SUPPLEMENTS"
            desc=""
            items={["Hydration Boost", "Focus Stack", "Recovery Mix"]}
            image="/hackbar/supplements.jpg"
          />
          <FuelCard
            index={1}
            name="MEAL PREPS"
            desc=""
            items={["Weekly Plans", "Performance / Shred / Gain", "QR Traceability"]}
            image="/hackbar/mealprep.jpg"
          />
        </div>
      </motion.section>

      {/* ═══ SECTION C: HACKBAR STATION ═══ */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ backgroundColor: "#0a0a0a", padding: "0 7% 72px", position: "relative", zIndex: 1 }}
      >
        <p style={{ fontFamily: "'Michroma', sans-serif", fontSize: "clamp(16px, 2vw, 24px)", color: "#FFFFFF", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 32, textAlign: "center", width: "100%" }}>
          HACKBAR STATION
        </p>
        <div className="hr-station-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          <StationCard index={0} name="CUSTOM SHAKES" desc="Tailored to your training type or goal: energy, recovery, lean mass, or detox." />
          <StationCard index={1} name="FUNCTIONAL COFFEE" desc="Infused with adaptogens and nootropics for sustained mental clarity without the crash." />
          <StationCard index={2} name="BLUEPRINT SNACKS" desc="No preservatives or refined sugar. Only functional ingredients that fuel your system." />
        </div>
      </motion.section>

      {/* ═══ SECTION D: MEET THE CHEF ═══ */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ backgroundColor: "#0a0a0a", padding: "0 7% 72px", position: "relative", zIndex: 1 }}
      >
        <div className="hr-chef-row" style={{ display: "flex", alignItems: "flex-start", gap: 40, marginBottom: 40 }}>
          {/* Left: title + subtitle */}
          <div className="hr-chef-left" style={{ flex: "0 0 55%", display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: 20 }}>
            <TextScramble
              as="p"
              style={{ fontFamily: "'Michroma', sans-serif", fontSize: "clamp(20px, 3vw, 36px)", color: "#FFFFFF", textTransform: "uppercase", letterSpacing: "0.04em", lineHeight: 1.1, marginBottom: 16 }}
              duration={1.2}
              speed={0.04}
            >
              MEET THE CHEF
            </TextScramble>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 300, color: "rgba(255,255,255,0.4)", lineHeight: 1.7, maxWidth: 480 }}>
              The mind behind every recipe. Precision nutrition crafted with science and passion.
            </p>
            <div style={{ width: 60, height: 2, background: "#FF3B3B", marginTop: 20, borderRadius: 1 }} />
          </div>
          {/* Right: photo placeholder */}
          <div className="hr-chef-right" style={{ flex: "0 0 45%", minHeight: 350, borderRadius: 16, overflow: "hidden", position: "relative" }}>
            <div style={{ width: "100%", height: "100%", minHeight: 350, borderRadius: 16, border: "1px solid rgba(255,59,59,0.15)", background: "linear-gradient(135deg, rgba(255,59,59,0.06), rgba(255,59,59,0.02))", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, position: "relative" }}>
              {/* Corner brackets */}
              <div style={{ position: "absolute", top: 12, left: 12, width: 20, height: 20, borderTop: "2px solid rgba(255,59,59,0.3)", borderLeft: "2px solid rgba(255,59,59,0.3)" }} />
              <div style={{ position: "absolute", top: 12, right: 12, width: 20, height: 20, borderTop: "2px solid rgba(255,59,59,0.3)", borderRight: "2px solid rgba(255,59,59,0.3)" }} />
              <div style={{ position: "absolute", bottom: 12, left: 12, width: 20, height: 20, borderBottom: "2px solid rgba(255,59,59,0.3)", borderLeft: "2px solid rgba(255,59,59,0.3)" }} />
              <div style={{ position: "absolute", bottom: 12, right: 12, width: 20, height: 20, borderBottom: "2px solid rgba(255,59,59,0.3)", borderRight: "2px solid rgba(255,59,59,0.3)" }} />
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(255,59,59,0.25)" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
              <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 8, letterSpacing: "0.15em", color: "rgba(255,59,59,0.2)", textTransform: "uppercase" }}>Chef photo</span>
            </div>
          </div>
        </div>
        {/* 3D Carousel */}
        <Carousel3D />
      </motion.section>

      {/* ═══ SECTION E: LAB MONITOR FOOTER ═══ */}
      <footer className="lab-footer" style={{ background: "#050505", padding: 0, position: "relative", overflow: "hidden", height: 500, borderTop: "1px solid rgba(255,59,59,0.1)" }}>
        {/* LAYER 1 — Grid */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,59,59,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,59,59,0.03) 1px, transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none", zIndex: 0 }} />

        {/* LAYER 2 — Corner brackets */}
        <div className="lab-corner tl" style={{ position: "absolute", top: 20, left: 20, width: 40, height: 40, borderTop: "2px solid rgba(255,59,59,0.25)", borderLeft: "2px solid rgba(255,59,59,0.25)", zIndex: 5 }} />
        <div className="lab-corner tr" style={{ position: "absolute", top: 20, right: 20, width: 40, height: 40, borderTop: "2px solid rgba(255,59,59,0.25)", borderRight: "2px solid rgba(255,59,59,0.25)", zIndex: 5 }} />
        <div className="lab-corner bl" style={{ position: "absolute", bottom: 20, left: 20, width: 40, height: 40, borderBottom: "2px solid rgba(255,59,59,0.25)", borderLeft: "2px solid rgba(255,59,59,0.25)", zIndex: 5 }} />
        <div className="lab-corner br" style={{ position: "absolute", bottom: 20, right: 20, width: 40, height: 40, borderBottom: "2px solid rgba(255,59,59,0.25)", borderRight: "2px solid rgba(255,59,59,0.25)", zIndex: 5 }} />

        {/* LAYER 3 — Content row */}
        <div className="lab-footer-row" style={{ position: "relative", zIndex: 2, display: "flex", height: "100%", padding: 40, gap: 32 }}>
          {/* LEFT COLUMN — System monitor */}
          <div className="lab-col-left" style={{ flex: "0 0 30%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <p style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 8, letterSpacing: "0.2em", color: "rgba(255,59,59,0.4)", textTransform: "uppercase", margin: 0 }}>SYSTEM MONITOR</p>
              <div style={{ marginTop: 16, display: "flex", flexDirection: "column" }}>
                {[
                  { label: "METABOLIC RATE", value: "1,847 kcal", flicker: true },
                  { label: "PROTEIN INTAKE", value: "142g" },
                  { label: "HYDRATION LVL", value: "94.2%" },
                ].map((item) => (
                  <div key={item.label} className="lab-data-item" style={{ padding: "12px 0", borderBottom: "1px solid rgba(255,59,59,0.06)" }}>
                    <p className="lab-data-label" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 7, letterSpacing: "0.15em", color: "rgba(255,255,255,0.2)", margin: 0, textTransform: "uppercase" }}>{item.label}</p>
                    <p className="lab-data-value" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 16, color: "#FF3B3B", margin: "4px 0 0", animation: item.flicker ? "labDataFlicker 3s infinite" : undefined }}>{item.value}</p>
                  </div>
                ))}
                <div className="lab-data-item" style={{ padding: "12px 0", borderBottom: "1px solid rgba(255,59,59,0.06)" }}>
                  <p className="lab-data-label" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 7, letterSpacing: "0.15em", color: "rgba(255,255,255,0.2)", margin: 0, textTransform: "uppercase" }}>SYSTEM STATUS</p>
                  <p className="lab-data-value" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 16, color: "#FF3B3B", margin: "4px 0 0", display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#FF3B3B", animation: "labPulse 2s infinite", display: "inline-block" }} />
                    ACTIVE
                  </p>
                </div>
              </div>
            </div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, color: "rgba(255,255,255,0.1)", margin: 0 }}>© 2025 Blueprint Project</p>
          </div>

          {/* CENTER COLUMN — Fingerprint + heartbeat */}
          <div className="lab-col-center" style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative" }}>
            {/* Glow */}
            <div style={{ position: "absolute", width: 200, height: 200, background: "rgba(255,59,59,0.06)", filter: "blur(60px)", borderRadius: "50%", zIndex: 0, top: "50%", left: "50%", transform: "translate(-50%, -80%)" }} />
            {/* Fingerprint + scan line wrapper */}
            <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="140" height="140" viewBox="0 0 140 140" fill="none" style={{ position: "relative", zIndex: 2 }}>
                <ellipse cx="70" cy="75" rx="12" ry="18" stroke="#FF3B3B" strokeWidth="1" opacity="0.9" />
                <ellipse cx="70" cy="75" rx="18" ry="26" stroke="#FF3B3B" strokeWidth="1" opacity="0.7" />
                <ellipse cx="70" cy="75" rx="24" ry="34" stroke="#FF3B3B" strokeWidth="1" opacity="0.55" />
                <ellipse cx="70" cy="75" rx="30" ry="42" stroke="#FF3B3B" strokeWidth="1" opacity="0.4" />
                <ellipse cx="70" cy="75" rx="36" ry="50" stroke="#FF3B3B" strokeWidth="1" opacity="0.25" />
                <path d="M50 51Q70 14 90 51" stroke="#FF3B3B" strokeWidth="1" fill="none" opacity="0.45" />
                <path d="M44 47Q70 2 96 47" stroke="#FF3B3B" strokeWidth="1" fill="none" opacity="0.3" />
                <path d="M56 55Q70 26 84 55" stroke="#FF3B3B" strokeWidth="1" fill="none" opacity="0.6" />
              </svg>
              <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", width: 160, height: 2, background: "linear-gradient(to right, transparent, #FF3B3B, transparent)", boxShadow: "0 0 15px rgba(255,59,59,0.5)", animation: "labScanLine 3s ease-in-out infinite", zIndex: 3 }} />
            </div>
            <p style={{ fontFamily: "'Michroma', sans-serif", fontSize: 20, color: "#FFFFFF", textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 24, marginBottom: 0 }}>HACK BAR</p>
            <svg width="200" height="50" viewBox="0 0 100 50" style={{ marginTop: 16, overflow: "visible", animation: "labHeartPulse 1.5s ease-in-out infinite", transformOrigin: "center" }}>
              <path
                d="M0 25 L15 25 L20 10 L25 40 L30 20 L35 30 L40 25 L55 25 L60 25 L65 15 L70 35 L75 22 L80 28 L85 25 L100 25"
                stroke="#FF3B3B"
                strokeWidth="1.5"
                fill="none"
                opacity="0.7"
              />
            </svg>
          </div>

          {/* RIGHT COLUMN — Nutrition lab */}
          <div className="lab-col-right" style={{ flex: "0 0 30%", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-end", textAlign: "right" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", width: "100%" }}>
              <p style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 8, letterSpacing: "0.2em", color: "rgba(255,59,59,0.4)", textTransform: "uppercase", margin: 0 }}>NUTRITION LAB</p>
              <div style={{ width: 60, height: 60, border: "1px solid rgba(255,59,59,0.15)", borderTop: "1px solid rgba(255,59,59,0.5)", borderRadius: "50%", animation: "labRotate 8s linear infinite", margin: "16px 0" }} />
              <div style={{ width: "100%" }}>
                {[
                  { label: "MACROS BALANCED", value: "P 35 / C 40 / F 25" },
                  { label: "SUPPLEMENT STACK", value: "3 ACTIVE" },
                  { label: "MEAL PREP QUEUE", value: "12 READY" },
                ].map((item) => (
                  <div key={item.label} className="lab-data-item" style={{ padding: "12px 0", borderBottom: "1px solid rgba(255,59,59,0.06)", textAlign: "right" }}>
                    <p className="lab-data-label" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 7, letterSpacing: "0.15em", color: "rgba(255,255,255,0.2)", margin: 0, textTransform: "uppercase" }}>{item.label}</p>
                    <p className="lab-data-value" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 16, color: "#FF3B3B", margin: "4px 0 0" }}>{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, color: "rgba(255,255,255,0.1)", margin: 0 }}>HACK BAR — BLUEPRINT PROJECT</p>
          </div>
        </div>
      </footer>

      {/* Bottom spacer for dock */}
      <div style={{ height: 120 }} />
    </motion.div>
  );
};

export default HuellaRoja;
