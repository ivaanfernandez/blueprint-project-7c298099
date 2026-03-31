import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Dock, DockIcon } from "@/components/ui/dock";
import slider1 from "@/assets/slider/slider-1.jpg";
import slider2 from "@/assets/slider/slider-2.jpg";
import slider3 from "@/assets/slider/slider-3.jpg";
import slider4 from "@/assets/slider/slider-4.jpg";
import slider5 from "@/assets/slider/slider-5.jpg";
import slider6 from "@/assets/slider/slider-6.jpg";

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

/* ── Animated Divider ── */
const AnimatedDivider = () => (
  <div style={{ padding: "0 8%", height: 40, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 2 }}>
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      style={{
        height: 1,
        width: "100%",
        background: "linear-gradient(90deg, transparent, rgba(26,107,255,0.15) 20%, rgba(26,107,255,0.25) 50%, rgba(26,107,255,0.15) 80%, transparent)",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(26,107,255,0.2)", position: "absolute", zIndex: 1 }} />
    </motion.div>
  </div>
);

/* ── Vitruvian SVG ── */
const VitruvianSVG = () => (
  <svg viewBox="0 0 240 240" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="120" cy="120" r="96" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
    <circle cx="120" cy="120" r="70" stroke="rgba(0,0,0,0.04)" strokeWidth="1" />
    {/* Head */}
    <circle cx="120" cy="62" r="18" stroke="#9CA3AF" strokeWidth="1.2" fill="none" />
    {/* Torso */}
    <line x1="120" y1="80" x2="120" y2="155" stroke="#9CA3AF" strokeWidth="1.2" />
    {/* Arms */}
    <line x1="120" y1="95" x2="76" y2="130" stroke="#9CA3AF" strokeWidth="1.2" />
    <line x1="120" y1="95" x2="164" y2="130" stroke="#9CA3AF" strokeWidth="1.2" />
    {/* Dashed alt arms */}
    <line x1="120" y1="95" x2="65" y2="105" stroke="#9CA3AF" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
    <line x1="120" y1="95" x2="175" y2="105" stroke="#9CA3AF" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
    {/* Legs */}
    <line x1="120" y1="155" x2="95" y2="210" stroke="#9CA3AF" strokeWidth="1.2" />
    <line x1="120" y1="155" x2="145" y2="210" stroke="#9CA3AF" strokeWidth="1.2" />
    {/* Joint dots */}
    <circle cx="76" cy="130" r="3" fill="#1A6BFF" opacity="0.5" />
    <circle cx="164" cy="130" r="3" fill="#1A6BFF" opacity="0.5" />
    <circle cx="95" cy="210" r="3" fill="#1A6BFF" opacity="0.5" />
    <circle cx="145" cy="210" r="3" fill="#1A6BFF" opacity="0.5" />
    {/* Core dots */}
    <circle cx="120" cy="110" r="2" fill="#1A6BFF" opacity="0.4" />
    <circle cx="120" cy="135" r="2" fill="#1A6BFF" opacity="0.4" />
  </svg>
);

/* ── Constants ── */
const HUELLAS = [
  { color: "#1A6BFF", glow: "rgba(26,107,255,0.7)", route: "/huella-azul", tooltip: "ENTRENAMIENTO" },
  { color: "#FF3B3B", glow: "rgba(255,59,59,0.7)", route: "/huella-roja", tooltip: "NUTRICIÓN" },
  { color: "#22C55E", glow: "rgba(34,197,94,0.7)", route: "/huella-verde", tooltip: "RECUPERACIÓN" },
];

const PROTOCOLS = [
  { color: "#1A6BFF", name: "ENTRENAMIENTO", desc: "Training protocol", route: "/huella-azul" },
  { color: "#FF3B3B", name: "NUTRICIÓN", desc: "Nutrition protocol", route: "/huella-roja" },
  { color: "#22C55E", name: "RECUPERACIÓN", desc: "Recovery protocol", route: "/huella-verde" },
];

const GRID_IMAGES = [slider1, slider2, slider3, slider4, slider5, slider6];

/* ── Corner Brackets ── */
const CornerBrackets = ({ color = "rgba(26,107,255,0.4)", size = 16 }: { color?: string; size?: number }) => (
  <>
    <div style={{ position: "absolute", top: 0, left: 0, width: size, height: size, borderTop: `1.5px solid ${color}`, borderLeft: `1.5px solid ${color}` }} />
    <div style={{ position: "absolute", top: 0, right: 0, width: size, height: size, borderTop: `1.5px solid ${color}`, borderRight: `1.5px solid ${color}` }} />
    <div style={{ position: "absolute", bottom: 0, left: 0, width: size, height: size, borderBottom: `1.5px solid ${color}`, borderLeft: `1.5px solid ${color}` }} />
    <div style={{ position: "absolute", bottom: 0, right: 0, width: size, height: size, borderBottom: `1.5px solid ${color}`, borderRight: `1.5px solid ${color}` }} />
  </>
);

/* ══════════════════════════════════════════════════════════ */
/*  HOME PAGE                                                */
/* ══════════════════════════════════════════════════════════ */

const Home = ({ showDock }: { showDock: boolean }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      style={{ backgroundColor: "#FFFFFF", fontFamily: "'Inter', sans-serif", position: "relative", overflow: "hidden" }}
    >
      {/* ── KEYFRAMES ── */}
      <style>{`
        @keyframes scanMove { 0%{transform:translateY(-100vh)} 100%{transform:translateY(100vh)} }
        @keyframes subtlePulse { 0%,100%{opacity:0.15} 50%{opacity:0.35} }
        @keyframes vitruvianScan { 0%,100%{top:10%} 50%{top:88%} }
        .home-dock .dock-container {
          background: rgba(255,255,255,0.82) !important;
          border: 1px solid rgba(0,0,0,0.08) !important;
          backdrop-filter: blur(16px) !important;
          box-shadow: 0 4px 24px rgba(0,0,0,0.05) !important;
        }
        .protocol-card { transition: all 0.4s ease; }
        .protocol-card .card-name,
        .protocol-card .card-desc {
          opacity: 0; transform: translateY(6px); transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .protocol-card .card-desc { transition-delay: 0.08s; }
        .protocol-card:hover .card-name,
        .protocol-card:hover .card-desc { opacity: 1; transform: translateY(0); }
        .bento-item { transition: transform 0.4s ease; }
        .bento-item:hover { transform: scale(1.015); }
        @media (max-width: 767px) {
          .protocol-card .card-name,
          .protocol-card .card-desc { opacity: 1 !important; transform: translateY(0) !important; }
        }
      `}</style>

      {/* ── A: LAB BACKGROUND ── */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(0,0,0,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.025) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }}>
        <div style={{
          position: "fixed", left: 0, right: 0, height: 2,
          background: "linear-gradient(90deg, transparent 0%, rgba(26,107,255,0.12) 30%, rgba(26,107,255,0.12) 70%, transparent 100%)",
          animation: "scanMove 8s linear infinite",
        }}>
          <div style={{
            position: "absolute", left: 0, right: 0, bottom: "100%", height: 50,
            background: "linear-gradient(to top, rgba(26,107,255,0.04), transparent)",
          }} />
        </div>
      </div>

      {/* ── B: DOCK ── */}
      <div style={{
        position: "fixed", top: 14, left: "50%", transform: "translateX(-50%)", zIndex: 50,
        pointerEvents: "none", display: "flex", justifyContent: "center",
        opacity: showDock ? 1 : 0, transition: "opacity 0.8s ease",
      }}>
        <div style={{ pointerEvents: showDock ? "all" : "none" }} className="home-dock">
          <Dock>
            {HUELLAS.map((h) => (
              <DockIcon key={h.route} tooltip={h.tooltip} onClick={() => navigate(h.route)}>
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  width: "100%", height: "100%",
                  filter: `drop-shadow(0 0 10px ${h.glow})`,
                  transition: "transform 0.3s ease, filter 0.3s ease",
                }}>
                  <FingerprintSVG color={h.color} size={30} />
                </div>
              </DockIcon>
            ))}
          </Dock>
        </div>
      </div>

      {/* ── C: HERO ── */}
      <div style={{
        minHeight: "80vh", display: "flex", alignItems: "center",
        padding: "60px 8% 0", gap: 40, position: "relative", zIndex: 2,
        flexWrap: "wrap",
      }}>
        {/* Left */}
        <div style={{ flex: 1, minWidth: 280 }}>
          <h1 style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800,
            fontSize: "clamp(28px, 4vw, 56px)", color: "#000",
            lineHeight: 1.1, textTransform: "uppercase", marginBottom: 14, margin: 0,
          }}>
            BLUEPRINT<br />PROJECT
          </h1>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontWeight: 300,
            fontSize: 14, color: "#6B7280", lineHeight: 1.65,
            maxWidth: 380, marginBottom: 20, marginTop: 14,
          }}>
            Where human performance connects his mind, body and soul.
          </p>
          <div style={{ width: 60, height: 1, background: "rgba(0,0,0,0.12)", marginBottom: 20 }} />
          <button
            onClick={() => navigate("/huella-azul")}
            style={{
              fontFamily: "'Orbitron', sans-serif", fontSize: 10, fontWeight: 500,
              letterSpacing: "0.2em", color: "#000", background: "transparent",
              border: "1px solid rgba(0,0,0,0.18)", borderRadius: 8,
              padding: "12px 28px", cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#1A6BFF";
              e.currentTarget.style.color = "#1A6BFF";
              e.currentTarget.style.boxShadow = "0 0 24px rgba(26,107,255,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(0,0,0,0.18)";
              e.currentTarget.style.color = "#000";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            ENTER THE LAB
          </button>
        </div>
        {/* Right */}
        <div style={{ flex: 1, display: "flex", justifyContent: "center", minWidth: 260 }}>
          <div style={{
            maxWidth: 360, width: "100%", aspectRatio: "4/3", borderRadius: 20,
            background: "rgba(0,0,0,0.018)", border: "1px dashed rgba(0,0,0,0.1)",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12,
          }}>
            <div style={{ animation: "subtlePulse 3s ease-in-out infinite" }}>
              <FingerprintSVG color="#D1D5DB" size={72} />
            </div>
            <span style={{
              fontFamily: "'Orbitron', sans-serif", fontSize: 8, color: "#D1D5DB",
              letterSpacing: "0.2em", textTransform: "uppercase",
            }}>
              VISUAL ELEMENT
            </span>
          </div>
        </div>
      </div>

      {/* ── Divider ── */}
      <AnimatedDivider />

      {/* ── D: ABOUT ── */}
      <div style={{
        padding: "40px 8%", display: "flex", alignItems: "center",
        gap: 48, position: "relative", zIndex: 2, flexWrap: "wrap",
      }}>
        {/* Left — Vitruvian */}
        <div style={{
          maxWidth: 300, width: "100%", aspectRatio: "1/1", borderRadius: 20,
          background: "rgba(0,0,0,0.02)", position: "relative", overflow: "hidden",
          flex: "0 0 auto",
        }}>
          <CornerBrackets color="#1A6BFF" size={16} />
          {/* Scan labels */}
          <span style={{
            position: "absolute", top: 8, left: 24,
            fontFamily: "'Orbitron', sans-serif", fontSize: 7, color: "#D1D5DB",
            letterSpacing: "0.1em",
          }}>SCAN_001</span>
          <span style={{
            position: "absolute", bottom: 8, right: 24,
            fontFamily: "'Orbitron', sans-serif", fontSize: 7, color: "#D1D5DB",
            letterSpacing: "0.1em",
          }}>STATUS: ACTIVE</span>
          {/* Scan line */}
          <div style={{
            position: "absolute", left: 0, right: 0, height: 2,
            background: "linear-gradient(90deg, transparent, rgba(26,107,255,0.18), transparent)",
            animation: "vitruvianScan 4s ease-in-out infinite",
          }}>
            <div style={{
              position: "absolute", left: 0, right: 0, bottom: "100%", height: 24,
              background: "linear-gradient(to top, rgba(26,107,255,0.04), transparent)",
            }} />
          </div>
          <VitruvianSVG />
        </div>
        {/* Right — Text */}
        <div style={{ flex: 1, minWidth: 260 }}>
          <p style={{
            fontFamily: "'Orbitron', sans-serif", fontSize: 9, fontWeight: 500,
            color: "#9CA3AF", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 10,
          }}>ABOUT THE SYSTEM</p>
          <h2 style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800,
            fontSize: "clamp(18px, 2.4vw, 30px)", color: "#000",
            lineHeight: 1.2, textTransform: "uppercase", margin: 0,
          }}>
            DESIGNED FOR<br />THE HUMAN<br />MACHINE
          </h2>
          <div style={{ width: 48, height: 1, background: "rgba(0,0,0,0.1)", margin: "14px 0" }} />
          <p style={{
            fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: 13,
            color: "#6B7280", lineHeight: 1.8, maxWidth: 440,
          }}>
            Blueprint Project is a precision-engineered system built around three core protocols. Training, nutrition, and recovery — synchronized to unlock your full potential. This is not a gym. This is your operating system.
          </p>
        </div>
      </div>

      {/* ── Divider ── */}
      <AnimatedDivider />

      {/* ── E: BENTO GRID ── */}
      <div style={{ padding: "8px 8%", position: "relative", zIndex: 2 }}>
        <div style={{ padding: 16, position: "relative" }}>
          {/* Corner brackets */}
          <CornerBrackets color="rgba(26,107,255,0.4)" size={20} />
          {/* Micro-labels */}
          <span style={{
            position: "absolute", top: 6, left: 28,
            fontFamily: "'Orbitron', sans-serif", fontSize: 6, color: "rgba(26,107,255,0.3)",
            letterSpacing: "0.12em",
          }}>IMG_ARRAY</span>
          <span style={{
            position: "absolute", bottom: 6, right: 28,
            fontFamily: "'Orbitron', sans-serif", fontSize: 6, color: "rgba(26,107,255,0.3)",
            letterSpacing: "0.12em",
          }}>6 FRAMES LOADED</span>
          {/* Edge accents */}
          <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 80, height: 1, background: "linear-gradient(90deg, transparent, rgba(26,107,255,0.2), transparent)" }} />
          <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: 80, height: 1, background: "linear-gradient(90deg, transparent, rgba(26,107,255,0.2), transparent)" }} />
          <div style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", width: 1, height: 60, background: "linear-gradient(180deg, transparent, rgba(26,107,255,0.2), transparent)" }} />
          <div style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", width: 1, height: 60, background: "linear-gradient(180deg, transparent, rgba(26,107,255,0.2), transparent)" }} />

          {/* Grid */}
          <div className="bento-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridTemplateRows: "130px 130px",
            gap: 8,
          }}>
            {GRID_IMAGES.map((src, i) => (
              <div
                key={i}
                className="bento-item"
                style={{
                  gridColumn: i === 0 || i === 4 ? "span 2" : undefined,
                  borderRadius: 12, overflow: "hidden",
                  background: "linear-gradient(135deg, #e8e8e8, #d4d4d4)",
                }}
              >
                <img src={src} alt={`Blueprint ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Divider ── */}
      <AnimatedDivider />

      {/* ── F: PROTOCOLS ── */}
      <div style={{ padding: "40px 8% 48px", position: "relative", zIndex: 2, textAlign: "center" }}>
        <p style={{
          fontFamily: "'Orbitron', sans-serif", fontSize: 9, fontWeight: 500,
          color: "#9CA3AF", letterSpacing: "0.3em",
        }}>PROTOCOLS</p>
        <h2 style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 800,
          fontSize: "clamp(18px, 2.4vw, 30px)", color: "#000",
          textTransform: "uppercase", marginTop: 8, marginBottom: 32,
        }}>
          THREE PILLARS. ONE SYSTEM.
        </h2>

        <div className="protocols-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
        }}>
          {PROTOCOLS.map((p) => (
            <div
              key={p.route}
              className="protocol-card"
              onClick={() => navigate(p.route)}
              style={{
                background: "rgba(255,255,255,0.55)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(0,0,0,0.06)",
                borderRadius: 18, padding: "28px 20px",
                textAlign: "center", cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = `${p.color}4D`;
                el.style.boxShadow = `0 0 40px ${p.color}1A`;
                el.style.background = `${p.color}05`;
                const svg = el.querySelector(".fp-icon") as HTMLElement;
                if (svg) {
                  svg.style.filter = `drop-shadow(0 0 14px ${p.color}80)`;
                  svg.style.transform = "scale(1.12)";
                }
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "rgba(0,0,0,0.06)";
                el.style.boxShadow = "none";
                el.style.background = "rgba(255,255,255,0.55)";
                const svg = el.querySelector(".fp-icon") as HTMLElement;
                if (svg) {
                  svg.style.filter = "none";
                  svg.style.transform = "scale(1)";
                }
              }}
            >
              <div className="fp-icon" style={{ transition: "filter 0.3s ease, transform 0.3s ease", marginBottom: 14 }}>
                <FingerprintSVG color={p.color} size={44} />
              </div>
              <p className="card-name" style={{
                fontFamily: "'Orbitron', sans-serif", fontSize: 11, fontWeight: 600,
                letterSpacing: "0.15em", color: p.color, marginBottom: 6,
              }}>{p.name}</p>
              <p className="card-desc" style={{
                fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 300,
                color: "#9CA3AF",
              }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Mobile responsive ── */}
      <style>{`
        @media (max-width: 767px) {
          .bento-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            grid-template-rows: repeat(3, 120px) !important;
          }
          .protocols-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default Home;
