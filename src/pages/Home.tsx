import { useState, useRef } from "react";
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

/* ── Section Divider (white sections) ── */
const SectionDivider = () => (
  <div style={{ padding: "0 7%", height: 36, display: "flex", alignItems: "center", justifyContent: "center" }}>
    <div style={{ height: 1, width: "100%", background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.06) 20%, rgba(0,0,0,0.08) 50%, rgba(0,0,0,0.06) 80%, transparent)" }} />
  </div>
);

/* ── Corner Brackets ── */
const CornerBrackets = ({ color = "rgba(26,107,255,0.3)", size = 18 }: { color?: string; size?: number }) => (
  <>
    <div style={{ position: "absolute", top: 0, left: 0, width: size, height: size, borderTop: `1.5px solid ${color}`, borderLeft: `1.5px solid ${color}` }} />
    <div style={{ position: "absolute", top: 0, right: 0, width: size, height: size, borderTop: `1.5px solid ${color}`, borderRight: `1.5px solid ${color}` }} />
    <div style={{ position: "absolute", bottom: 0, left: 0, width: size, height: size, borderBottom: `1.5px solid ${color}`, borderLeft: `1.5px solid ${color}` }} />
    <div style={{ position: "absolute", bottom: 0, right: 0, width: size, height: size, borderBottom: `1.5px solid ${color}`, borderRight: `1.5px solid ${color}` }} />
  </>
);

/* ── Constants ── */
const HUELLAS = [
  { color: "#1A6BFF", glow: "rgba(26,107,255,0.7)", route: "/huella-azul", tooltip: "ENTRENAMIENTO" },
  { color: "#FF3B3B", glow: "rgba(255,59,59,0.7)", route: "/huella-roja", tooltip: "NUTRICIÓN" },
  { color: "#22C55E", glow: "rgba(34,197,94,0.7)", route: "/huella-verde", tooltip: "RECUPERACIÓN" },
];

const PROTOCOLS = [
  { color: "#1A6BFF", name: "Entrenamiento", desc: "Precision training methodology designed to build strength, endurance, and resilience through data-driven programming.", route: "/huella-azul" },
  { color: "#FF3B3B", name: "Nutrición", desc: "Fuel your system with precision nutrition protocols. Every meal is a signal — optimize input, transform output.", route: "/huella-roja" },
  { color: "#22C55E", name: "Recuperación", desc: "Strategic rest, optimized sleep, and complete restoration. Without recovery there is no progress.", route: "/huella-verde" },
];

const GRID_IMAGES = [slider1, slider2, slider3, slider4, slider5, slider6];

const FEATURE_TABS = ["Training Methodology", "Recovery Science", "Nutrition Engineering"];

/* ══════════════════════════════════════════════════════════ */
/*  HOME PAGE                                                */
/* ══════════════════════════════════════════════════════════ */

const Home = ({ showDock }: { showDock: boolean }) => {
  const navigate = useNavigate();
  const aboutRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);

  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: "smooth" });
  };


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      style={{ fontFamily: "'Inter', sans-serif", position: "relative", overflow: "hidden" }}
    >
      {/* ── KEYFRAMES ── */}
      <style>{`
        @keyframes subtlePulse { 0%,100%{opacity:0.15} 50%{opacity:0.35} }
        .home-dock .dock-container {
          background: rgba(255,255,255,0.82) !important;
          border: 1px solid rgba(0,0,0,0.08) !important;
          backdrop-filter: blur(16px) !important;
          box-shadow: 0 4px 24px rgba(0,0,0,0.05) !important;
        }
        .protocol-card-neo { transition: all 0.4s ease; }
        .protocol-card-neo:hover { border-color: rgba(0,0,0,0.1) !important; box-shadow: 0 8px 32px rgba(0,0,0,0.05) !important; transform: translateY(-2px); }
        .protocol-card-neo:hover .fp-icon-neo { transform: scale(1.1); }
        .protocol-card-neo:hover .learn-link { color: inherit; }
        .bento-item-neo { transition: transform 0.4s ease; }
        .bento-item-neo:hover { transform: scale(1.01); }
        .tag-pill { transition: all 0.3s ease; }
        .tag-pill:hover { background: #000 !important; color: #fff !important; }
        .feat-tab { transition: all 0.3s ease; position: relative; }
        .feat-tab::before { content: ''; position: absolute; left: 0; top: 50%; transform: translateY(-50%); width: 3px; height: 0; background: #1A6BFF; border-radius: 2px; transition: height 0.3s ease; }
        .feat-tab.active { color: #000 !important; font-weight: 500 !important; }
        .feat-tab.active::before { height: 20px; }
        .feat-tab:hover { color: #000 !important; }
        @keyframes labScanLine {
          0% { top: -50px; }
          100% { top: 100%; }
        }
        @keyframes labDotPulse {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 1; transform: scale(1); }
        }
        .program-card { transition: transform 0.4s ease, box-shadow 0.4s ease; }
        .program-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.1); }
        .program-card:hover .program-card-img { transform: scale(1.05); }
        @media (max-width: 767px) {
          .programs-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 10px !important; }
        }
        @media (max-width: 767px) {
          .hero-flex { flex-direction: column !important; text-align: center !important; }
          .hero-left { align-items: center !important; }
          .hero-right { max-width: 280px !important; margin: 0 auto; }
          .hero-title { font-size: clamp(24px, 7vw, 38px) !important; }
          .hero-buttons { justify-content: center !important; }
          .stats-row { justify-content: center !important; }
          .about-flex { flex-direction: column !important; text-align: center !important; }
          .about-img { max-width: 280px !important; margin: 0 auto !important; }
          .about-tags { justify-content: center !important; }
          .about-buttons { justify-content: center !important; }
          .protocols-grid-neo { grid-template-columns: 1fr !important; }
          .feature-flex { flex-direction: column !important; }
          .bento-grid-neo { grid-template-columns: repeat(2, 1fr) !important; grid-template-rows: repeat(3, 180px) !important; }
          .cta-flex { flex-direction: column !important; text-align: center !important; }
          .cta-left { align-items: center !important; }
          .cta-images { max-width: 300px !important; margin: 0 auto !important; }
        }
      `}</style>

      {/* ── A: DOCK ── */}
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

      {/* ══════════════════════════════════════════════════════ */}
      {/* ── B: HERO (DARK) ── */}
      {/* ══════════════════════════════════════════════════════ */}
      <div style={{
        background: "#F5F5F5", minHeight: "100vh", position: "relative", overflow: "hidden",
      }}>
        {/* Dot pattern */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(rgba(0,0,0,0.03) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }} />

        <div className="hero-flex" style={{
          display: "flex", alignItems: "center", padding: "80px 0 40px 7%", gap: 40,
          position: "relative", zIndex: 2, flexWrap: "wrap",
        }}>
          {/* Left */}
          <div className="hero-left" style={{ flex: 1, minWidth: 280, display: "flex", flexDirection: "column" }}>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
              style={{
                fontFamily: "'Orbitron', sans-serif", fontSize: 9, color: "rgba(0,0,0,0.35)",
                letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: 16,
              }}
            >
              B&nbsp;L&nbsp;U&nbsp;E&nbsp;P&nbsp;R&nbsp;I&nbsp;N&nbsp;T&nbsp; &nbsp;S&nbsp;Y&nbsp;S&nbsp;T&nbsp;E&nbsp;M
            </motion.p>
            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.4 }}
              style={{
                fontFamily: "'Michroma', sans-serif",
                fontSize: "clamp(28px, 4.5vw, 58px)", color: "#000000",
                lineHeight: 1.08, textTransform: "uppercase", margin: "0 0 20px 0",
              }}
            >
              BLUEPRINT<br />PROJECT
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.6 }}
              style={{
                fontFamily: "'Inter', sans-serif", fontWeight: 300,
                fontSize: 13, color: "#6B7280", lineHeight: 1.7,
                maxWidth: 400, marginBottom: 28,
              }}
            >
              Where human performance connects his mind, body and soul. Three protocols. One integrated system.
            </motion.p>

            {/* Buttons */}
            <motion.div
              className="hero-buttons"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.8 }}
              style={{ display: "flex", gap: 12, marginBottom: 0 }}
            >
              <button
                onClick={() => navigate("/huella-azul")}
                style={{
                  fontFamily: "'Orbitron', sans-serif", fontSize: 9, fontWeight: 500,
                  letterSpacing: "0.15em", color: "#fff", background: "#1A6BFF",
                  border: "none", borderRadius: 6, padding: "12px 24px", cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#1558d4"; e.currentTarget.style.boxShadow = "0 0 20px rgba(26,107,255,0.3)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#1A6BFF"; e.currentTarget.style.boxShadow = "none"; }}
              >
                GET STARTED
              </button>
              <button
                onClick={scrollToAbout}
                style={{
                  fontFamily: "'Orbitron', sans-serif", fontSize: 9, fontWeight: 500,
                  letterSpacing: "0.15em", color: "rgba(0,0,0,0.6)", background: "transparent",
                  border: "1px solid rgba(0,0,0,0.15)", borderRadius: 6, padding: "12px 24px", cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.4)"; e.currentTarget.style.color = "#000"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.15)"; e.currentTarget.style.color = "rgba(0,0,0,0.6)"; }}
              >
                EXPLORE
              </button>
            </motion.div>

          </div>

          {/* Right */}
            <motion.div
              className="hero-right"
              style={{ flex: 1, display: "flex", justifyContent: "flex-end", minWidth: 260 }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.5 }}
            >
            <div style={{
              maxWidth: 480, width: "100%", aspectRatio: "3/4", borderRadius: "20px 0 0 20px",
              background: "linear-gradient(160deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
              border: "1px solid rgba(255,255,255,0.06)",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14,
              position: "relative", overflow: "hidden",
            }}>
              {/* Radial glow */}
              <div style={{
                position: "absolute", top: -40, right: -40, width: 200, height: 200,
                background: "radial-gradient(circle, rgba(26,107,255,0.06) 0%, transparent 70%)",
                pointerEvents: "none",
              }} />
              <div style={{ animation: "subtlePulse 3s ease-in-out infinite", position: "relative", zIndex: 1 }}>
                <FingerprintSVG color="rgba(255,255,255,0.25)" size={80} />
              </div>
              <span style={{
                fontFamily: "'Orbitron', sans-serif", fontSize: 7, color: "rgba(255,255,255,0.2)",
                letterSpacing: "0.2em", textTransform: "uppercase", position: "relative", zIndex: 1,
              }}>
                HERO IMAGE
              </span>
            </div>
           </motion.div>
        </div>
      </div>

      {/* ── Transition Bar ── */}
      <div style={{
        height: 1,
        background: "linear-gradient(90deg, transparent, rgba(26,107,255,0.15) 30%, rgba(26,107,255,0.2) 50%, rgba(26,107,255,0.15) 70%, transparent)",
      }} />

      {/* ══════════════════════════════════════════════════════ */}
      {/* ── WHITE ZONE WRAPPER ── */}
      {/* ══════════════════════════════════════════════════════ */}
      <div style={{ position: "relative", background: "#FFFFFF" }}>
        {/* Lab Background */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0,
          backgroundImage: "linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}>
          {/* Scan line */}
          <div style={{
            position: "absolute", left: 0, right: 0, height: 1, zIndex: 1,
            background: "linear-gradient(90deg, transparent 0%, rgba(26,107,255,0.08) 20%, rgba(26,107,255,0.12) 50%, rgba(26,107,255,0.08) 80%, transparent 100%)",
            animation: "labScanLine 10s linear infinite",
          }}>
            <div style={{
              position: "absolute", left: 0, right: 0, top: -40, height: 40,
              background: "linear-gradient(to top, rgba(26,107,255,0.03), transparent)",
            }} />
          </div>
          {/* Pulsing dots */}
          {[
            { top: '5%', left: '10%', delay: '0s', duration: '4s', size: '3px', opacity: 0.15 },
            { top: '8%', left: '85%', delay: '1.2s', duration: '5s', size: '2px', opacity: 0.12 },
            { top: '14%', left: '45%', delay: '0.5s', duration: '3.5s', size: '3px', opacity: 0.1 },
            { top: '22%', left: '72%', delay: '2s', duration: '4.5s', size: '2px', opacity: 0.15 },
            { top: '28%', left: '4%', delay: '1.8s', duration: '3s', size: '3px', opacity: 0.12 },
            { top: '35%', left: '58%', delay: '0.3s', duration: '5.5s', size: '2px', opacity: 0.1 },
            { top: '42%', left: '25%', delay: '2.5s', duration: '4s', size: '3px', opacity: 0.15 },
            { top: '48%', left: '92%', delay: '1s', duration: '3.8s', size: '2px', opacity: 0.12 },
            { top: '55%', left: '38%', delay: '0.8s', duration: '4.2s', size: '3px', opacity: 0.1 },
            { top: '63%', left: '78%', delay: '1.5s', duration: '5s', size: '2px', opacity: 0.15 },
            { top: '70%', left: '15%', delay: '2.2s', duration: '3.5s', size: '3px', opacity: 0.12 },
            { top: '76%', left: '62%', delay: '0.7s', duration: '4.8s', size: '2px', opacity: 0.1 },
            { top: '83%', left: '8%', delay: '1.3s', duration: '4s', size: '3px', opacity: 0.15 },
            { top: '88%', left: '50%', delay: '0.2s', duration: '5.2s', size: '2px', opacity: 0.12 },
            { top: '94%', left: '88%', delay: '1.9s', duration: '3.5s', size: '3px', opacity: 0.1 },
          ].map((dot, i) => (
            <div key={i} style={{
              position: "absolute", width: dot.size, height: dot.size, borderRadius: "50%",
              background: `rgba(26,107,255,${dot.opacity})`,
              top: dot.top, left: dot.left,
              animation: `labDotPulse ${dot.duration} ease-in-out ${dot.delay} infinite`,
            }} />
          ))}
        </div>

      {/* ── C: ABOUT (WHITE) ── */}
      <div ref={aboutRef} style={{ position: "relative", zIndex: 1 }}>
        <div className="about-flex" style={{
          padding: "72px 7%", display: "flex", alignItems: "center", gap: 56, flexWrap: "wrap",
        }}>
          {/* Left — Image placeholder */}
          <div className="about-img" style={{
            maxWidth: 340, width: "100%", aspectRatio: "3/4", borderRadius: 20,
            background: "linear-gradient(160deg, #e8e8e8, #d0d0d0)",
            position: "relative", flex: "0 0 auto",
          }}>
            <span style={{
              position: "absolute", bottom: 12, left: 16,
              fontFamily: "'Orbitron', sans-serif", fontSize: 6, color: "rgba(0,0,0,0.2)",
              letterSpacing: "0.15em",
            }}>VITRUVIAN SCAN</span>
          </div>

          {/* Right — Text */}
          <div style={{ flex: 1, minWidth: 260 }}>
            <h2 style={{
              fontFamily: "'Michroma', sans-serif",
              fontSize: "clamp(20px, 2.8vw, 34px)", color: "#000",
              lineHeight: 1.15, textTransform: "uppercase", margin: 0,
            }}>
              DESIGNED FOR<br />THE HUMAN<br />MACHINE
            </h2>

            {/* Tag pills */}
            <div className="about-tags" style={{ display: "flex", gap: 8, margin: "20px 0 18px", flexWrap: "wrap" }}>
              {["Training", "Nutrition", "Recovery"].map((tag) => (
                <span key={tag} className="tag-pill" style={{
                  fontFamily: "'Orbitron', sans-serif", fontSize: 8, letterSpacing: "0.1em",
                  color: "#000", border: "1px solid rgba(0,0,0,0.15)", borderRadius: 20,
                  padding: "6px 14px", cursor: "pointer",
                }}>
                  {tag}
                </span>
              ))}
            </div>

            <p style={{
              fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: 13,
              color: "#6B7280", lineHeight: 1.8, maxWidth: 440, marginBottom: 24,
            }}>
              Blueprint Project is a precision-engineered system built around three core protocols. Training, nutrition, and recovery — synchronized to unlock your full potential. This is not a gym. This is your operating system.
            </p>

          </div>
        </div>
      </div>

      {/* ── Divider ── */}
      <SectionDivider />

      {/* ── D: PROTOCOLS (WHITE) ── */}
      <div style={{ padding: "56px 7%", position: "relative", zIndex: 1 }}>
        <h2 style={{
          fontFamily: "'Michroma', sans-serif",
          fontSize: "clamp(18px, 2.5vw, 32px)", color: "#000",
          textTransform: "uppercase", marginBottom: 40,
          textAlign: "center", width: "100%",
        }}>
          THE PROTOCOL
        </h2>

        <div className="protocols-grid-neo" style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16,
        }}>
          {PROTOCOLS.map((p) => (
            <div
              key={p.route}
              className="protocol-card-neo"
              onClick={() => navigate(p.route)}
              style={{
                background: "#FAFAFA", border: "1px solid rgba(0,0,0,0.05)",
                borderRadius: 16, padding: "32px 24px", textAlign: "center",
                cursor: "pointer", position: "relative", overflow: "hidden",
              }}
            >
              {/* Top accent bar */}
              <div style={{
                position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
                width: 40, height: 2, borderRadius: "0 0 2px 2px", background: p.color,
              }} />

              {/* Icon */}
              <div style={{
                width: 40, height: 40, borderRadius: 10, margin: "0 auto 16px",
                background: `${p.color}0F`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <div className="fp-icon-neo" style={{ transition: "transform 0.3s ease" }}>
                  <FingerprintSVG color={p.color} size={24} />
                </div>
              </div>

              <p style={{
                fontFamily: "'Michroma', sans-serif", fontSize: 11, color: "#000",
                textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10,
              }}>{p.name}</p>
              <p style={{
                fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 300,
                color: "#9CA3AF", lineHeight: 1.6, marginBottom: 16,
              }}>{p.desc}</p>
              <span className="learn-link" style={{
                fontFamily: "'Orbitron', sans-serif", fontSize: 8, color: "#9CA3AF",
                letterSpacing: "0.15em", transition: "color 0.3s ease",
              }}>LEARN MORE →</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Divider ── */}
      <SectionDivider />

      {/* ── PROGRAMS SECTION (WHITE) ── */}
      <div style={{ padding: "56px 7%", position: "relative", zIndex: 1 }}>
        <h2 style={{
          fontFamily: "'Michroma', sans-serif",
          fontSize: "clamp(20px, 2.5vw, 32px)", color: "#000",
          textTransform: "uppercase", textAlign: "center", marginBottom: 8,
        }}>
          OUR PROGRAMS
        </h2>
        <p style={{
          fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 300,
          color: "#9CA3AF", textAlign: "center", marginBottom: 40,
        }}>
          Discover the protocols designed to optimize every dimension of your performance.
        </p>

        <div className="programs-grid" style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14,
        }}>
          {[
            { title: "Training", desc: "Precision methodology built to forge strength, endurance, and resilience.", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80" },
            { title: "Nutrition", desc: "Fuel your system with precision. Every meal is a signal to your body.", img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80" },
            { title: "Recovery", desc: "Strategic rest, optimized sleep, and complete restoration protocols.", img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80" },
            { title: "Mental Growth", desc: "Build focus, discipline, and unshakable mental clarity.", img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80" },
          ].map((card) => (
            <div key={card.title} className="program-card" style={{
              position: "relative", borderRadius: 16, overflow: "hidden",
              aspectRatio: "3/4", cursor: "pointer",
            }}>
              <img className="program-card-img" src={card.img} alt={card.title} style={{
                position: "absolute", inset: 0, width: "100%", height: "100%",
                objectFit: "cover", transition: "transform 0.6s ease",
              }} />
              <div style={{
                position: "absolute", inset: 0, zIndex: 1,
                background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.05) 100%)",
              }} />
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 2,
                padding: 18,
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
                borderTop: "1px solid rgba(255,255,255,0.12)",
              }}>
                <h3 style={{
                  fontFamily: "'Michroma', sans-serif", fontSize: 11, color: "#FFFFFF",
                  textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6, marginTop: 0,
                }}>{card.title}</h3>
                <p style={{
                  fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 300,
                  color: "rgba(255,255,255,0.5)", lineHeight: 1.5, margin: 0,
                }}>{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Divider ── */}
      <SectionDivider />

      {/* ── E: FEATURE (WHITE) ── */}
      <div className="feature-flex" style={{
        padding: "56px 7%", display: "flex", alignItems: "center", gap: 48,
        position: "relative", zIndex: 1, flexWrap: "wrap",
      }}>
        {/* Left */}
        <div style={{ flex: 1, minWidth: 260 }}>
          <h2 style={{
            fontFamily: "'Michroma', sans-serif",
            fontSize: "clamp(18px, 2.5vw, 32px)", color: "#000",
            textTransform: "uppercase", lineHeight: 1.15, marginBottom: 28,
          }}>
            LIMITLESS<br />POTENTIAL WITH<br />BLUEPRINT
          </h2>

          <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
            {FEATURE_TABS.map((tab, i) => (
              <div
                key={tab}
                className={`feat-tab ${activeTab === i ? "active" : ""}`}
                onClick={() => setActiveTab(i)}
                style={{
                  padding: "14px 0 14px 16px",
                  borderBottom: "1px solid rgba(0,0,0,0.06)",
                  fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#9CA3AF",
                  cursor: "pointer",
                }}
              >
                {tab}
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div style={{ flex: 1, minWidth: 280 }}>
          <div style={{
            borderRadius: 16, aspectRatio: "4/3",
            background: "linear-gradient(160deg, #e8e8e8, #d0d0d0)",
            position: "relative",
          }}>
            <span style={{
              position: "absolute", bottom: 10, right: 14,
              fontFamily: "'Orbitron', sans-serif", fontSize: 6, color: "rgba(0,0,0,0.2)",
              letterSpacing: "0.15em",
            }}>FEATURE IMAGE</span>
          </div>
        </div>
      </div>

      {/* ── Divider ── */}
      <SectionDivider />

      {/* ── F: BENTO GRID (WHITE) ── */}
      <div style={{ padding: "40px 7%", position: "relative", zIndex: 1 }}>
        <div style={{ position: "relative", padding: 14 }}>
          <CornerBrackets />

          <div className="bento-grid-neo" style={{
            display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
            gridTemplateRows: "220px 220px", gap: 10,
          }}>
            {GRID_IMAGES.map((src, i) => (
              <div
                key={i}
                className="bento-item-neo"
                style={{
                  borderRadius: 12, overflow: "hidden",
                  background: "linear-gradient(135deg, #e8e8e8, #d0d0d0)",
                }}
              >
                <img src={src} alt={`Blueprint ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      </div>{/* END WHITE ZONE WRAPPER */}

      {/* ── G: CTA FINAL (DARK) ── */}
      {/* ══════════════════════════════════════════════════════ */}
      <div style={{
        background: "#0a0a0a", padding: "72px 7%", marginTop: 40,
        position: "relative", overflow: "hidden",
      }}>
        {/* Dot pattern */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }} />

        <div className="cta-flex" style={{
          display: "flex", alignItems: "center", gap: 48,
          position: "relative", zIndex: 2, flexWrap: "wrap",
        }}>
          {/* Left */}
          <div className="cta-left" style={{ flex: 1, minWidth: 260, display: "flex", flexDirection: "column" }}>
            <h2 style={{
              fontFamily: "'Michroma', sans-serif",
              fontSize: "clamp(20px, 3vw, 38px)", color: "#FFFFFF",
              textTransform: "uppercase", lineHeight: 1.12, marginBottom: 16, marginTop: 0,
            }}>
              ENTER THE<br />BLUEPRINT
            </h2>
            <p style={{
              fontFamily: "'Inter', sans-serif", fontWeight: 300,
              fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.7,
              maxWidth: 400, marginBottom: 24,
            }}>
              Your evolution begins with a single step. Three protocols, one system, infinite potential.
            </p>
            <button
              onClick={() => navigate("/huella-azul")}
              style={{
                fontFamily: "'Orbitron', sans-serif", fontSize: 9, fontWeight: 500,
                letterSpacing: "0.15em", color: "#fff", background: "#1A6BFF",
                border: "none", borderRadius: 6, padding: "12px 24px", cursor: "pointer",
                transition: "all 0.3s ease", alignSelf: "flex-start",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#1558d4"; e.currentTarget.style.boxShadow = "0 0 20px rgba(26,107,255,0.3)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#1A6BFF"; e.currentTarget.style.boxShadow = "none"; }}
            >
              JOIN NOW
            </button>
          </div>

          {/* Right — Staggered images */}
          <div className="cta-images" style={{ flex: 1, display: "flex", gap: 12, minWidth: 260 }}>
            <div style={{
              width: "48%", aspectRatio: "3/4", borderRadius: 14,
              background: "linear-gradient(160deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
              border: "1px solid rgba(255,255,255,0.06)",
            }} />
            <div style={{
              width: "48%", aspectRatio: "3/4", borderRadius: 14,
              background: "linear-gradient(160deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
              border: "1px solid rgba(255,255,255,0.06)",
              marginTop: 40,
            }} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
