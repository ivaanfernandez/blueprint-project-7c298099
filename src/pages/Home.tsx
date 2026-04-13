import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ProceduralBackgroundWhite from "@/components/ProceduralBackgroundWhite";

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
        
        @keyframes pulseRing {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.02); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
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

        <TextScramble
          as="p"
          duration={1.0}
          speed={0.02}
          characterSet="abcdefghijklmnopqrstuvwxyz., "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.8 }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 14,
            fontWeight: 300,
            color: "rgba(255,255,255,0.7)",
            textAlign: "center" as const,
            marginTop: 20,
            position: "relative" as const,
            zIndex: 2,
            letterSpacing: "0.02em",
          }}
        >
          Where human performance connects his mind, body and soul.
        </TextScramble>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 1.0 }}
          style={{
            position: "absolute",
            bottom: 48,
            left: 48,
            zIndex: 3,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}
            onClick={scrollToAbout}
          >
            <div style={{
              width: 32, height: 32, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.3s ease",
            }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 2v8M6 10l3-3M6 10L3 7" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <span style={{
              fontFamily: "'Orbitron', sans-serif", fontSize: 8, color: "rgba(255,255,255,0.4)",
              letterSpacing: "0.2em", textTransform: "uppercase",
            }}>
              SCROLL TO EXPLORE
            </span>
          </div>
        </motion.div>

      </div>

      {/* ── Transition Bar ── */}
      <div style={{
        height: 1,
        background: "rgba(255,255,255,0.06)",
      }} />

      {/* ══════════════════════════════════════════════════════ */}
      {/* ── WHITE ZONE WRAPPER ── */}
      {/* ══════════════════════════════════════════════════════ */}
      <div style={{ position: "relative", background: "#FFFFFF" }}>
        <ProceduralBackgroundWhite />

      {/* ── C: ABOUT (WHITE) ── */}
      <div ref={aboutRef} style={{ position: "relative", zIndex: 1 }}>
        <div className="about-section-new" style={{
          padding: "64px 7%", display: "flex", alignItems: "flex-start", gap: 36,
          position: "relative", zIndex: 1, background: "#FFFFFF",
        }}>
          {/* Left — Title + Subtitle + Timeline */}
          <div style={{ flex: 1 }}>
            <h2 style={{
              fontFamily: "'Michroma', sans-serif",
              fontSize: "clamp(18px, 2.2vw, 28px)", color: "#000",
              textTransform: "uppercase", lineHeight: 1.12, marginBottom: 10, marginTop: 0,
            }}>
              DESIGNED FOR THE HUMAN MACHINE
            </h2>
            <p style={{
              fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 300,
              color: "#6B7280", lineHeight: 1.75, marginBottom: 24, maxWidth: 480,
            }}>
              A precision-engineered system. Training, nutrition, and recovery — synchronized to unlock your full potential. This is not a gym. This is your operating system.
            </p>

            {/* Timeline */}
            <div style={{ position: "relative", paddingLeft: 28 }}>
              {/* Blue vertical line */}
              <div style={{
                position: "absolute", left: 8, top: 10, bottom: 10,
                width: 1.5, background: "linear-gradient(to bottom, #1A6BFF, rgba(26,107,255,0.1))",
              }} />

              {[
                { title: "Precision Training", desc: "Data-driven methodology built to forge strength, endurance, and resilience.", icon: (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1A6BFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6.5 6.5h-2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h2"/><path d="M17.5 6.5h2a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-2"/><path d="M6.5 4v16"/><path d="M17.5 4v16"/><path d="M6.5 12h11"/>
                  </svg>
                )},
                { title: "Nutrition Engineering", desc: "Every meal is a signal. Optimize input, transform output.", icon: (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1A6BFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
                  </svg>
                )},
                { title: "Recovery Science", desc: "Strategic rest, optimized sleep, and complete restoration protocols.", icon: (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1A6BFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
                  </svg>
                )},
                { title: "Mental Growth", desc: "Build focus, discipline, and unshakable mental clarity.", icon: (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1A6BFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>
                  </svg>
                )},
              ].map((step, i, arr) => (
                <div key={step.title} style={{ position: "relative", paddingBottom: i === arr.length - 1 ? 0 : 24 }}>
                  {/* Blue dot */}
                  <div style={{
                    position: "absolute", left: -24, top: 7,
                    width: 11, height: 11, borderRadius: "50%",
                    background: "#1A6BFF", border: "2.5px solid #FFFFFF",
                    boxShadow: "0 0 0 2.5px rgba(26,107,255,0.2)",
                  }} />
                  {/* Title row */}
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                    <div style={{
                      width: 30, height: 30, borderRadius: 8,
                      background: "rgba(26,107,255,0.05)",
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    }}>
                      {step.icon}
                    </div>
                    <div style={{
                      fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 700, color: "#000",
                    }}>{step.title}</div>
                  </div>
                  {/* Description */}
                  <div style={{
                    fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 300,
                    color: "#9CA3AF", lineHeight: 1.55, paddingLeft: 40,
                  }}>{step.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Image */}
          <div className="about-photo-col" style={{
            flex: "0 0 34%", maxWidth: 320, borderRadius: 16, overflow: "hidden", aspectRatio: "3/4",
          }}>
            <img src={slider1} alt="Blueprint Project" style={{
              width: "100%", height: "100%", objectFit: "cover", display: "block",
            }} />
          </div>
        </div>
      </div>

      {/* ── Divider ── */}
      <SectionDivider />

      {/* ── VIDEO SECTION — CINEMATIC FULL-WIDTH ── */}
      <div className="video-cinematic-section" style={{
        position: "relative", width: "100%", height: "100vh",
        overflow: "hidden", background: "#0a0a0a",
      }}>
        <video
          autoPlay muted loop playsInline
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }}
        >
          <source src="/videos/blueprint-gym.mp4" type="video/mp4" />
        </video>
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
          CHOOSE YOUR FINGERPRINT
        </h2>
        <p style={{
          fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 300,
          color: "#9CA3AF", textAlign: "center", marginBottom: 40,
        }}>
          Three pillars. One integrated system.
        </p>

        <div className="programs-grid" style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16,
        }}>
          {[
            { name: "Blueprint Lab", color: "#1A6BFF", rgba: "26,107,255", img: slider1, route: "/huella-azul", desc: "Precision training methodology. Data-driven programming built to forge strength." },
            { name: "Hack Bar", color: "#FF3B3B", rgba: "255,59,59", img: slider2, route: "/huella-roja", desc: "Nutrition engineered for performance. Every meal is a signal to your body." },
            { name: "Reset", color: "#22C55E", rgba: "34,197,94", img: slider3, video: "/videos/blueprint-reset.mp4", route: "/huella-verde", desc: "Strategic recovery. Optimized sleep, restoration, and rebuilding protocols." },
          ].map((item) => (
            <div
              key={item.name}
              className="pillar-card"
              onClick={() => navigate(item.route)}
              style={{
                position: "relative", borderRadius: 16, overflow: "hidden",
                aspectRatio: "3/4", cursor: "pointer",
                border: `2px solid rgba(${item.rgba}, 0.5)`,
                boxShadow: `0 0 15px rgba(${item.rgba}, 0.1), 0 0 40px rgba(${item.rgba}, 0.05)`,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.border = `2px solid rgba(${item.rgba}, 0.85)`; e.currentTarget.style.boxShadow = `0 0 25px rgba(${item.rgba}, 0.2), 0 0 60px rgba(${item.rgba}, 0.1)`; }}
              onMouseLeave={(e) => { e.currentTarget.style.border = `2px solid rgba(${item.rgba}, 0.5)`; e.currentTarget.style.boxShadow = `0 0 15px rgba(${item.rgba}, 0.1), 0 0 40px rgba(${item.rgba}, 0.05)`; }}
            >
              {/* Background image/video */}
              {item.video ? (
                <video className="pillar-card-img" autoPlay muted loop playsInline style={{
                  position: "absolute", inset: 0, width: "100%", height: "100%",
                  objectFit: "cover", transition: "transform 0.6s ease",
                }}>
                  <source src={item.video} type="video/mp4" />
                </video>
              ) : (
                <img className="pillar-card-img" src={item.img} alt={item.name} style={{
                  position: "absolute", inset: 0, width: "100%", height: "100%",
                  objectFit: "cover", transition: "transform 0.6s ease",
                }} />
              )}

              {/* Dark overlay */}
              <div style={{
                position: "absolute", inset: 0, zIndex: 1,
                background: `linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 40%, rgba(${item.rgba}, 0.05) 100%)`,
              }} />

              {/* Top accent line */}
              <div style={{
                position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
                width: 40, height: 2, borderRadius: "0 0 2px 2px", zIndex: 4,
                background: item.color,
              }} />

              {/* Corner brackets */}
              {[
                { top: 8, left: 8, borderTop: `1.5px solid rgba(${item.rgba}, 0.25)`, borderLeft: `1.5px solid rgba(${item.rgba}, 0.25)` },
                { top: 8, right: 8, borderTop: `1.5px solid rgba(${item.rgba}, 0.25)`, borderRight: `1.5px solid rgba(${item.rgba}, 0.25)` },
                { bottom: 8, left: 8, borderBottom: `1.5px solid rgba(${item.rgba}, 0.25)`, borderLeft: `1.5px solid rgba(${item.rgba}, 0.25)` },
                { bottom: 8, right: 8, borderBottom: `1.5px solid rgba(${item.rgba}, 0.25)`, borderRight: `1.5px solid rgba(${item.rgba}, 0.25)` },
              ].map((corner, ci) => (
                <div key={ci} style={{
                  position: "absolute", width: 16, height: 16, zIndex: 4, pointerEvents: "none",
                  ...corner,
                }} />
              ))}

              {/* Fingerprint icon */}
              <div className="pillar-card-fp" style={{
                position: "absolute", top: 14, right: 14, zIndex: 4,
                opacity: 0.5, transition: "opacity 0.4s ease",
              }}>
                <FingerprintSVG color={item.color} size={32} />
              </div>

              {/* Hover center fingerprint */}
              <div className="pillar-card-hover-fp" style={{
                position: "absolute", top: "50%", left: "50%",
                transform: "translate(-50%, -50%) scale(0.85)",
                zIndex: 3, opacity: 0,
                transition: "opacity 0.4s ease, transform 0.4s ease",
                pointerEvents: "none",
                filter: "drop-shadow(0 0 30px currentColor)",
                color: item.color,
              }}>
                <FingerprintSVG color={item.color} size={140} />
              </div>

              {/* Glassmorphism content panel */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 4,
                padding: 18,
                background: "rgba(0,0,0,0.3)",
                backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
                borderTop: "1px solid rgba(255,255,255,0.08)",
              }}>
                <h3 style={{
                  fontFamily: "'Michroma', sans-serif", fontSize: 12, color: "#FFFFFF",
                  textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 5, marginTop: 0,
                  textAlign: "left",
                }}>{item.name}</h3>
                <p style={{
                  fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 300,
                  color: "rgba(255,255,255,0.5)", lineHeight: 1.5, textAlign: "left", margin: 0,
                }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Divider ── */}
      <SectionDivider />

      {/* ── E: FEATURE — HORIZONTAL ROWS (WHITE) ── */}
      <div style={{
        position: "relative", zIndex: 1, padding: "64px 7%", background: "#FFFFFF",
      }}>
        <h2 style={{
          fontFamily: "'Michroma', sans-serif",
          fontSize: "clamp(28px, 3.5vw, 44px)",
          color: "#000",
          textTransform: "uppercase",
          lineHeight: 1.1,
          marginBottom: 48,
          marginTop: 0,
          maxWidth: 600,
        }}>
          LIMITLESS POTENTIAL WITH BLUEPRINT
        </h2>

        {[
          {
            color: "#1A6BFF",
            name: "Blueprint Lab",
            desc: "Precision training methodology. Data-driven programming built to forge strength, endurance, and resilience.",
            linkColor: "#1A6BFF",
            route: "/huella-azul",
            img: slider1,
          },
          {
            color: "#22C55E",
            name: "Hack Bar",
            desc: "Nutrition engineered for performance. Every meal is a signal. Optimize input, transform output.",
            linkColor: "#22C55E",
            route: "/huella-verde",
            img: slider2,
          },
          {
            color: "#FF3B3B",
            name: "Reset",
            desc: "Strategic recovery protocols. Optimized sleep, restoration, and rebuilding for continuous evolution.",
            linkColor: "#FF3B3B",
            route: "/huella-roja",
            img: slider3,
          },
        ].map((item, i, arr) => (
          <div
            key={item.name}
            className="feature-row-mobile"
            onClick={() => navigate(item.route)}
            style={{
              display: "flex",
              gap: 28,
              alignItems: "center",
              padding: "32px 0",
              borderBottom: i < arr.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none",
              cursor: "pointer",
              transition: "background 0.3s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(0,0,0,0.01)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
          >
            {/* Thumbnail image */}
            <div style={{
              flex: "0 0 120px", height: 80, borderRadius: 10, overflow: "hidden",
            }}>
              <img src={item.img} alt={item.name} style={{
                width: "100%", height: "100%", objectFit: "cover", display: "block",
              }} />
            </div>

            {/* Fingerprint icon */}
            <div style={{ flex: "0 0 48px" }}>
              <FingerprintSVG color={item.color} size={40} />
            </div>

            {/* Text content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontFamily: "'Michroma', sans-serif",
                fontSize: 18,
                textTransform: "uppercase",
                letterSpacing: "0.02em",
                color: "#000",
                marginBottom: 6,
              }}>
                {item.name}
              </div>
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                fontWeight: 300,
                color: "#6B7280",
                lineHeight: 1.6,
                marginBottom: 8,
              }}>
                {item.desc}
              </div>
              <span style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: 11,
                letterSpacing: "0.1em",
                color: item.linkColor,
              }}>
                LEARN MORE →
              </span>
            </div>

            {/* Arrow */}
            <div style={{
              flex: "0 0 32px",
              fontFamily: "'Inter', sans-serif",
              fontSize: 20,
              color: "#D1D5DB",
              textAlign: "center",
            }}>
              →
            </div>
          </div>
        ))}
      </div>

      {/* ── Divider ── */}
      <SectionDivider />


      </div>{/* END WHITE ZONE WRAPPER */}

      {/* ── FOOTER (NEW) ── */}
      <div className="footer-section" style={{
        background: "#0a0a0a",
        padding: "80px 7% 40px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Dot pattern */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(rgba(255,255,255,0.015) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }} />

        {/* Pulse Beams SVG */}
        <svg style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", overflow: "visible" }} viewBox="0 0 800 400" preserveAspectRatio="xMidYMid meet">
          <path d="M400 200 L80 380" stroke="rgba(26,107,255,0.06)" strokeWidth="1" fill="none"/>
          <path d="M400 200 L720 380" stroke="rgba(26,107,255,0.06)" strokeWidth="1" fill="none"/>
          <path d="M400 200 L150 40" stroke="rgba(26,107,255,0.06)" strokeWidth="1" fill="none"/>
          <path d="M400 200 L650 40" stroke="rgba(26,107,255,0.06)" strokeWidth="1" fill="none"/>
          <path d="M400 200 L20 200" stroke="rgba(26,107,255,0.04)" strokeWidth="1" fill="none"/>
          <path d="M400 200 L780 200" stroke="rgba(26,107,255,0.04)" strokeWidth="1" fill="none"/>

          <circle cx="80" cy="380" r="3" fill="rgba(26,107,255,0.3)"/>
          <circle cx="720" cy="380" r="3" fill="rgba(26,107,255,0.3)"/>
          <circle cx="150" cy="40" r="3" fill="rgba(26,107,255,0.3)"/>
          <circle cx="650" cy="40" r="3" fill="rgba(26,107,255,0.3)"/>
          <circle cx="20" cy="200" r="3" fill="rgba(26,107,255,0.3)"/>
          <circle cx="780" cy="200" r="3" fill="rgba(26,107,255,0.3)"/>
          <circle cx="400" cy="200" r="4" fill="rgba(26,107,255,0.2)" stroke="rgba(26,107,255,0.3)" strokeWidth="1"/>

          <line x1="80" y1="380" x2="400" y2="200" stroke="url(#beamGrad1)" strokeWidth="1.5" opacity="0">
            <animate attributeName="opacity" values="0;0.6;0" dur="3s" repeatCount="indefinite"/>
          </line>
          <line x1="720" y1="380" x2="400" y2="200" stroke="url(#beamGrad2)" strokeWidth="1.5" opacity="0">
            <animate attributeName="opacity" values="0;0.6;0" dur="3s" begin="0.8s" repeatCount="indefinite"/>
          </line>
          <line x1="150" y1="40" x2="400" y2="200" stroke="url(#beamGrad3)" strokeWidth="1.5" opacity="0">
            <animate attributeName="opacity" values="0;0.6;0" dur="3s" begin="1.5s" repeatCount="indefinite"/>
          </line>
          <line x1="650" y1="40" x2="400" y2="200" stroke="url(#beamGrad4)" strokeWidth="1.5" opacity="0">
            <animate attributeName="opacity" values="0;0.6;0" dur="3s" begin="0.4s" repeatCount="indefinite"/>
          </line>

          <defs>
            <linearGradient id="beamGrad1" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stopColor="#1A6BFF" stopOpacity="0"/><stop offset="50%" stopColor="#1A6BFF" stopOpacity="0.4"/><stop offset="100%" stopColor="#1A6BFF" stopOpacity="0"/></linearGradient>
            <linearGradient id="beamGrad2" x1="100%" y1="100%" x2="0%" y2="0%"><stop offset="0%" stopColor="#1A6BFF" stopOpacity="0"/><stop offset="50%" stopColor="#1A6BFF" stopOpacity="0.4"/><stop offset="100%" stopColor="#1A6BFF" stopOpacity="0"/></linearGradient>
            <linearGradient id="beamGrad3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#1A6BFF" stopOpacity="0"/><stop offset="50%" stopColor="#1A6BFF" stopOpacity="0.4"/><stop offset="100%" stopColor="#1A6BFF" stopOpacity="0"/></linearGradient>
            <linearGradient id="beamGrad4" x1="100%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#1A6BFF" stopOpacity="0"/><stop offset="50%" stopColor="#1A6BFF" stopOpacity="0.4"/><stop offset="100%" stopColor="#1A6BFF" stopOpacity="0"/></linearGradient>
          </defs>
        </svg>

        {/* Title */}
        <h2 className="footer-title" style={{
          fontFamily: "'Michroma', sans-serif",
          fontSize: "clamp(24px, 4vw, 40px)",
          color: "#FFFFFF",
          textTransform: "uppercase",
          lineHeight: 1.1,
          marginBottom: 12,
          marginTop: 0,
          position: "relative",
          zIndex: 2,
        }}>
          ENTER THE<br />BLUEPRINT
        </h2>

        {/* Subtitle */}
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 13,
          fontWeight: 300,
          color: "rgba(255,255,255,0.4)",
          marginBottom: 36,
          marginTop: 0,
          position: "relative",
          zIndex: 2,
        }}>
          Your evolution begins with a single step.
        </p>

        {/* Pulse Button */}
        <div style={{ position: "relative", display: "inline-block", zIndex: 2, marginBottom: 24 }}>
          {/* Glow */}
          <div style={{
            position: "absolute",
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: "120%", height: "200%",
            background: "radial-gradient(ellipse, rgba(26,107,255,0.08) 0%, transparent 70%)",
            animation: "pulseGlow 3s ease-in-out infinite",
            pointerEvents: "none",
          }} />

          {/* Rings */}
          <div style={{
            position: "absolute", inset: -4, borderRadius: 54,
            border: "1px solid rgba(26,107,255,0.15)",
            animation: "pulseRing 3s ease-in-out infinite",
            pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute", inset: -12, borderRadius: 62,
            border: "1px solid rgba(26,107,255,0.08)",
            animation: "pulseRing 3s ease-in-out 0.5s infinite",
            pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute", inset: -22, borderRadius: 72,
            border: "1px solid rgba(26,107,255,0.04)",
            animation: "pulseRing 3s ease-in-out 1s infinite",
            pointerEvents: "none",
          }} />

          <button
            onClick={() => navigate("/huella-azul")}
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: "0.2em",
              color: "#fff",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 50,
              padding: "18px 48px",
              cursor: "pointer",
              position: "relative",
              zIndex: 3,
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(26,107,255,0.5)";
              e.currentTarget.style.background = "rgba(26,107,255,0.08)";
              e.currentTarget.style.boxShadow = "0 0 40px rgba(26,107,255,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
              e.currentTarget.style.background = "rgba(255,255,255,0.03)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            JOIN NOW
          </button>
        </div>

        {/* Instagram Icon */}
        <div style={{ marginBottom: 48, position: "relative", zIndex: 2 }}>
          <a
            href="https://instagram.com/blueprintproject"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-block", transition: "all 0.3s ease" }}
            onMouseEnter={(e) => {
              const svg = e.currentTarget.querySelector("svg");
              if (svg) { svg.style.color = "#fff"; svg.style.filter = "drop-shadow(0 0 8px rgba(255,255,255,0.3))"; }
            }}
            onMouseLeave={(e) => {
              const svg = e.currentTarget.querySelector("svg");
              if (svg) { svg.style.color = "rgba(255,255,255,0.3)"; svg.style.filter = "none"; }
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "rgba(255,255,255,0.3)", transition: "all 0.3s ease" }}>
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="5"/>
              <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
            </svg>
          </a>
        </div>

        {/* Footer Bar */}
        <div className="footer-bar" style={{
          paddingTop: 20,
          borderTop: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
          zIndex: 2,
        }}>
          <span style={{
            fontFamily: "'Michroma', sans-serif",
            fontSize: 9,
            color: "rgba(255,255,255,0.4)",
            letterSpacing: "0.15em",
          }}>
            BLUEPRINT PROJECT
          </span>

          <div style={{ display: "flex", gap: 24 }}>
            {[
              { label: "INSTAGRAM", href: "https://instagram.com/blueprintproject" },
              { label: "LOCATION", href: "#" },
              { label: "CONTACT", href: "#" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: 7,
                  color: "rgba(255,255,255,0.25)",
                  letterSpacing: "0.12em",
                  textDecoration: "none",
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.25)"; }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 9,
            color: "rgba(255,255,255,0.15)",
          }}>
            © 2025 Blueprint Project
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
