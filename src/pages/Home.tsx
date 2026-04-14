import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ProceduralBackgroundWhite from "@/components/ProceduralBackgroundWhite";
import FooterBackground from "@/components/FooterBackground";


import { TextScramble } from "@/components/ui/text-scramble";
import { Dock, DockIcon } from "@/components/ui/dock";
import slider1 from "@/assets/slider/slider-1.jpg";
import slider2 from "@/assets/slider/slider-2.jpg";
import slider3 from "@/assets/slider/slider-3.jpg";


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



/* ── Constants ── */
const HUELLAS = [
  { color: "#1A6BFF", glow: "rgba(26,107,255,0.7)", route: "/huella-azul", tooltip: "ENTRENAMIENTO" },
  { color: "#FF3B3B", glow: "rgba(255,59,59,0.7)", route: "/huella-roja", tooltip: "NUTRICIÓN" },
  { color: "#22C55E", glow: "rgba(34,197,94,0.7)", route: "/huella-verde", tooltip: "RECUPERACIÓN" },
];




/* ══════════════════════════════════════════════════════════ */
/*  HOME PAGE                                                */
/* ══════════════════════════════════════════════════════════ */

const Home = ({ showDock }: { showDock: boolean }) => {
  const navigate = useNavigate();
  const aboutRef = useRef<HTMLDivElement>(null);

  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: "smooth" });
  };



  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      style={{ fontFamily: "'Inter', sans-serif", position: "relative", overflowX: "hidden" }}
    >
      {/* ── KEYFRAMES ── */}
      <style>{`
        @keyframes subtlePulse { 0%,100%{opacity:0.15} 50%{opacity:0.35} }
        .home-dock .dock-container {
          background: rgba(255,255,255,0.06) !important;
          border: 1px solid rgba(255,255,255,0.1) !important;
          backdrop-filter: blur(16px) !important;
          box-shadow: 0 4px 24px rgba(0,0,0,0.3) !important;
        }
        .bento-item-neo { transition: transform 0.4s ease; }
        .bento-item-neo:hover { transform: scale(1.01); }
        .pillar-card { transition: all 0.4s ease; }
        .pillar-card:hover { transform: translateY(-4px); }
        .pillar-card:hover .pillar-card-img { transform: scale(1.05); }
        .pillar-card:hover .pillar-card-fp { opacity: 1 !important; }
        .pillar-card:hover .pillar-card-hover-fp { opacity: 0.15 !important; transform: translate(-50%, -50%) scale(1) !important; }
        
        @media (max-width: 767px) {
          .programs-grid { grid-template-columns: 1fr !important; max-width: 400px !important; margin: 0 auto !important; }
          .hero-main-title {
            font-size: clamp(28px, 8vw, 44px) !important;
            white-space: normal !important;
            padding: 0 24px !important;
          }
          .about-section-new { padding: 48px 6% !important; flex-direction: column !important; gap: 32px !important; align-items: flex-start !important; }
          .about-photo-col { flex: none !important; width: 100% !important; max-width: 280px !important; margin: 0 auto !important; order: -1 !important; }
          .bento-grid-neo { grid-template-columns: repeat(2, 1fr) !important; grid-template-rows: repeat(3, 180px) !important; }
          .feature-row-mobile {
            flex-direction: column !important;
            gap: 16px !important;
            text-align: center !important;
          }
          .video-cinematic-section { height: 60vh !important; }
          .footer-section {
            padding: 60px 6% 32px !important;
          }
          .footer-section .footer-title {
            font-size: clamp(22px, 7vw, 32px) !important;
          }
          .footer-section .footer-bar {
            flex-direction: column !important;
            text-align: center !important;
            gap: 12px !important;
          }
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
      {/* ── B: HERO (DEVIALET-INSPIRED) ── */}
      {/* ══════════════════════════════════════════════════════ */}
      <div style={{
        background: "#070612", minHeight: "100vh", position: "relative", overflow: "hidden",
        display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
      }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
          }}
        >
          <source src="/videos/blueprint-hero.mp4" type="video/mp4" />
        </video>

        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.65)",
          zIndex: 1,
        }} />

        <TextScramble
          as="h1"
          className="hero-main-title"
          duration={1.2}
          speed={0.03}
          characterSet="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          style={{
            fontFamily: "'Michroma', sans-serif",
            fontSize: "clamp(32px, 5.5vw, 80px)",
            color: "#FFFFFF",
            textTransform: "uppercase" as const,
            letterSpacing: "0.05em",
            lineHeight: 1.0,
            textAlign: "center" as const,
            margin: 0,
            position: "relative" as const,
            zIndex: 2,
            whiteSpace: "nowrap" as const,
            
            padding: "0 7%",
          }}
        >
          BLUEPRINT PROJECT
        </TextScramble>



      </div>{/* END WHITE ZONE WRAPPER */}

      {/* ── FOOTER (DARK) ── */}
      <div style={{
        background: "#0a0a0a",
        padding: "60px 7% 32px",
        textAlign: "center" as const,
        position: "relative" as const,
      }}>
        <FooterBackground />
        <div style={{ position: "relative", zIndex: 1 }}>
        {/* Blue accent line */}
        <div style={{
          width: 40,
          height: 1,
          background: "#1A6BFF",
          margin: "0 auto 32px",
        }} />

        {/* Title */}
        <h2 style={{
          fontFamily: "'Michroma', sans-serif",
          fontSize: "clamp(24px, 4vw, 36px)",
          color: "#FFFFFF",
          textTransform: "uppercase" as const,
          letterSpacing: "0.04em",
          marginBottom: 10,
          marginTop: 0,
        }}>
          Enter the Blueprint
        </h2>

        {/* Subtitle */}
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 13,
          fontWeight: 300,
          color: "rgba(255,255,255,0.3)",
          marginBottom: 32,
        }}>
          Your evolution begins with a single step.
        </p>

        {/* Buttons */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: 14,
          marginBottom: 48,
          ...(window.innerWidth < 768 ? { flexDirection: "column" as const, gap: 10, alignItems: "stretch" as const } : {}),
        }}>
          <button
            onClick={() => navigate("/huella-azul")}
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: "0.15em",
              color: "#FFFFFF",
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 50,
              padding: "14px 36px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 0 15px rgba(26,107,255,0.5), 0 0 30px rgba(26,107,255,0.3), 0 0 60px rgba(26,107,255,0.15)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(26,107,255,0.5)";
              e.currentTarget.style.background = "rgba(26,107,255,0.05)";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(26,107,255,0.7), 0 0 40px rgba(26,107,255,0.4), 0 0 80px rgba(26,107,255,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.boxShadow = "0 0 15px rgba(26,107,255,0.5), 0 0 30px rgba(26,107,255,0.3), 0 0 60px rgba(26,107,255,0.15)";
            }}
          >
            JOIN NOW
          </button>

          <button
            onClick={() => window.open("https://instagram.com/blueprintproject", "_blank")}
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: "0.15em",
              color: "rgba(255,255,255,0.35)",
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 50,
              padding: "14px 28px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center" as const,
              justifyContent: "center" as const,
              gap: 8,
              boxShadow: "0 0 15px rgba(255,59,59,0.5), 0 0 30px rgba(255,59,59,0.3), 0 0 60px rgba(255,59,59,0.15)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#FFFFFF";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(255,59,59,0.7), 0 0 40px rgba(255,59,59,0.4), 0 0 80px rgba(255,59,59,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(255,255,255,0.35)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
              e.currentTarget.style.boxShadow = "0 0 15px rgba(255,59,59,0.5), 0 0 30px rgba(255,59,59,0.3), 0 0 60px rgba(255,59,59,0.15)";
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
            INSTAGRAM
          </button>
        </div>

        {/* Divider */}
        <div style={{
          width: "100%",
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
          marginBottom: 20,
        }} />

        {/* Bottom bar */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center" as const,
          ...(window.innerWidth < 768 ? { flexDirection: "column" as const, gap: 8, textAlign: "center" as const } : {}),
        }}>
          <span style={{
            fontFamily: "'Michroma', sans-serif",
            fontSize: 8,
            color: "rgba(255,255,255,0.25)",
            letterSpacing: "0.2em",
          }}>
            BLUEPRINT PROJECT
          </span>
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 8,
            color: "rgba(255,255,255,0.1)",
          }}>
            © 2025 Blueprint Project
          </span>
        </div>
        </div>{/* end z-index wrapper */}
      </div>
    </motion.div>
  );
};

export default Home;
