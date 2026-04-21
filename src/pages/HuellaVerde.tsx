import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { scrollReveal, scrollStagger, blurRevealItem } from "@/lib/scrollAnimations";
import BiometricScanGreen from "@/components/BiometricScanGreen";
import { TextScramble } from "@/components/ui/text-scramble";
import BackToHomeButton from "@/components/BackToHomeButton";

interface HuellaVerdeProps {
  showDock?: boolean;
}

/* ── Fingerprint SVG (inline) ── */
const FingerprintSVG = ({ color = "#22C55E", size = 20 }: { color?: string; size?: number }) => (
  <svg viewBox="0 0 60 72" width={size} height={size * 1.2} fill="none" xmlns="http://www.w3.org/2000/svg">
    {[12, 18, 24, 30, 36].map((ry, i) => (
      <ellipse key={i} cx="30" cy="38" rx={ry * 0.7} ry={ry} stroke={color} strokeWidth="1.5" />
    ))}
    <path d="M 25 36 Q 28 28 30 26 Q 32 28 35 36 Q 32 44 30 46 Q 28 44 25 36Z" stroke={color} strokeWidth="1.2" fill="none" />
  </svg>
);

/* ── Dock (same pattern as other pages) ── */
const HUELLAS = [
  { label: "Training", color: "#1A6BFF", path: "/huella-azul" },
  { label: "Hack Bar", color: "#FF3B3B", path: "/huella-roja" },
  { label: "Reset", color: "#22C55E", path: "/huella-verde" },
];

const Dock = ({ show }: { show: boolean }) => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        left: "50%",
        transform: `translateX(-50%) translateY(${show ? 0 : 80}px)`,
        opacity: show ? 1 : 0,
        transition: "transform 0.6s cubic-bezier(.4,0,.2,1), opacity 0.6s ease",
        zIndex: 50,
        display: "flex",
        gap: 16,
        padding: "12px 28px",
        borderRadius: 999,
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.06)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
      }}
    >
      {HUELLAS.map((h) => (
        <button
          key={h.path}
          onClick={() => {
            if (h.path === "/huella-verde") {
              window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
              navigate(h.path);
            }
          }}
          title={h.label}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 4,
            opacity: h.path === "/huella-verde" ? 1 : 0.5,
            transition: "opacity 0.3s ease, transform 0.3s ease",
            transform: h.path === "/huella-verde" ? "scale(1.15)" : "scale(1)",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1.15)"; }}
          onMouseLeave={(e) => {
            if (h.path !== "/huella-verde") { e.currentTarget.style.opacity = "0.5"; e.currentTarget.style.transform = "scale(1)"; }
          }}
        >
          <FingerprintSVG color={h.color} size={22} />
        </button>
      ))}
    </div>
  );
};

/* ── Data ── */
const RECOVERY_TOP = [
  { name: "INFRARED SAUNA", desc: "Eliminación profunda de toxinas, mejora del sueño reparador y estimulación natural de colágeno." },
  { name: "ICE BATH THERAPY", desc: "Control del sistema nervioso, reducción de inflamación y optimización de claridad mental." },
  { name: "COMPRESSION THERAPY", desc: "Drenaje linfático avanzado, mejora de circulación y recuperación acelerada." },
];
const RECOVERY_BOT = [
  { name: "MOBILITY & BREATHING", desc: "Respiración consciente y movilidad funcional para restaurar rango de movimiento." },
  { name: "MASSAGES & BODYWORK", desc: "Masaje deportivo, relajante profundo o tejidos profundos adaptados a tus necesidades." },
];
const SERVICIOS = [
  { num: "01", name: "RECOVERY PROTOCOLS PERSONALIZADOS", desc: "Diseñados específicamente por nuestro equipo de expertos según tus objetivos: rendimiento deportivo, longevidad celular, relajación profunda o enfoque mental superior." },
  { num: "02", name: "RESET PASS", desc: "Acceso ilimitado a todos los Wellness Days, descuentos especiales en masajes profesionales y productos exclusivos del HackBar." },
  { num: "03", name: "CORPORATE RECOVERY PROGRAMS", desc: "Paquetes empresariales diseñados para mejorar la salud física, mental y el rendimiento de tus empleados. Invierte en tu equipo, invierte en resultados." },
  { num: "04", name: "RESET RETREATS", desc: "Próximamente: experiencias inmersivas de 72 horas con detox guiado, ayuno terapéutico, sauna prolongada, meditación profunda y reconexión total con la naturaleza." },
];

const scanDelays = [0, 1, 2, 0.5, 1.5];

/* ── Component ── */
const HuellaVerde = ({ showDock = true }: HuellaVerdeProps) => {
  const [scanDone, setScanDone] = useState(false);
  const handleScanDone = useCallback(() => setScanDone(true), []);

  if (!scanDone) return <BiometricScanGreen onComplete={handleScanDone} />;

  return (
    <>
      <style>{`
        @keyframes hvScanLine {
          0% { top: 0; opacity: 0; }
          10% { opacity: 0.2; }
          90% { opacity: 0.2; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes hvFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hv-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .hv-card:hover { transform: translateY(-4px); box-shadow: 0 8px 32px rgba(34,197,94,0.12); }
        @media (max-width: 767px) {
          .hv-hero-text { padding: 60px 6% 20px !important; }
          .hv-hero-title { font-size: clamp(32px, 10vw, 48px) !important; }
          .hv-hero-subtitle { font-size: 13px !important; padding: 0 4%; }
          .hv-photo-strip { height: 200px !important; min-height: 180px !important; }
          .hv-grid-top, .hv-grid-bot { grid-template-columns: 1fr !important; }
          .hv-grid-top .hv-card, .hv-grid-bot .hv-card { min-height: 240px !important; }
          .hv-servicios { padding: 0 6% 48px !important; }
          .hv-servicio-line { width: 100% !important; }
          .hv-footer { padding: 32px 6% !important; }
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{ backgroundColor: "#0a0a0a", minHeight: "100vh", overflowX: "hidden", fontFamily: "'Space Grotesk', sans-serif" }}
      >
        <Dock show={showDock} />

        {/* ── HERO ── */}
        <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
          {/* Ambient glow */}
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 30%, rgba(34,197,94,0.06) 0%, transparent 60%)", pointerEvents: "none" }} />

          {/* Text */}
          <div className="hv-hero-text" style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 16, padding: "80px 7% 32px", zIndex: 2 }}>
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 10, letterSpacing: "0.25em", color: "rgba(34,197,94,0.5)", textTransform: "uppercase" }}>
              BLUEPRINT SYSTEM
            </span>
            <TextScramble
              className="hv-hero-title"
              style={{ fontFamily: "'Michroma', sans-serif", fontSize: "clamp(40px, 6vw, 72px)", color: "#FFFFFF", textTransform: "uppercase", letterSpacing: "0.04em", lineHeight: 1.08 }}
            >
              RESET
            </TextScramble>
            <p className="hv-hero-subtitle" style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 300, color: "rgba(255,255,255,0.4)", lineHeight: 1.7, maxWidth: 520, textAlign: "center" }}>
              Donde el cuerpo se restaura, la mente se recalibra y la energía se regenera desde lo más profundo.
            </p>
          </div>

          {/* Photo strip */}
          <div className="hv-photo-strip" style={{ width: "100%", height: "35vh", minHeight: 250, maxHeight: 400, position: "relative", overflow: "hidden", marginTop: 20 }}>
            <div style={{ width: "100%", height: "100%", backgroundColor: "#1a1a1a" }} />
            {/* Fades */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 80, background: "linear-gradient(to bottom, #0a0a0a, transparent)", zIndex: 1 }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 60, background: "linear-gradient(to bottom, transparent, #0a0a0a)", zIndex: 1 }} />
            <div style={{ position: "absolute", top: 0, left: 0, width: 60, height: "100%", background: "linear-gradient(to right, #0a0a0a, transparent)", zIndex: 1 }} />
            <div style={{ position: "absolute", top: 0, right: 0, width: 60, height: "100%", background: "linear-gradient(to left, #0a0a0a, transparent)", zIndex: 1 }} />
          </div>

          {/* Green accent line */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "linear-gradient(to right, transparent, rgba(34,197,94,0.3), transparent)", zIndex: 2 }} />
        </section>

        {/* ── RECOVERY ROOM ── */}
        <motion.section
          {...scrollReveal}
          style={{ background: "#0a0a0a", padding: "72px 7%", position: "relative", zIndex: 1 }}
        >
          <motion.h2 {...scrollReveal} style={{ fontFamily: "'Michroma', sans-serif", fontSize: "clamp(16px, 2vw, 24px)", color: "#FFFFFF", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 8 }}>
            RECOVERY ROOM
          </motion.h2>
          <motion.p {...scrollReveal} style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.35)", marginBottom: 32 }}>
            Tu zona de Reset. Disponible exclusivamente para miembros de BlueprintLab.
          </motion.p>

          {/* Top 3 */}
          <motion.div {...scrollStagger} className="hv-grid-top" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 20 }}>
            {RECOVERY_TOP.map((card, i) => (
              <motion.div variants={blurRevealItem} key={card.name} className="hv-card" style={{ borderRadius: 14, minHeight: 320, position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "24px 20px", cursor: "pointer" }}>
                <div style={{ position: "absolute", inset: 0, backgroundColor: "#1a1a1a" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 10%, rgba(0,0,0,0.3) 55%, rgba(0,0,0,0.05) 100%)", zIndex: 1 }} />
                {/* Scan line */}
                <div style={{ position: "absolute", left: 0, right: 0, height: 1, background: "linear-gradient(to right, transparent, rgba(34,197,94,0.25), transparent)", animation: `hvScanLine 5s ease-in-out ${scanDelays[i]}s infinite`, zIndex: 2, pointerEvents: "none" }} />
                {/* Accent line */}
                <div style={{ position: "absolute", bottom: 0, left: "20%", right: "20%", height: 2, background: "linear-gradient(to right, transparent, #22C55E, transparent)", zIndex: 2 }} />
                {/* Content */}
                <div style={{ position: "relative", zIndex: 2 }}>
                  <h3 style={{ fontFamily: "'Michroma', sans-serif", fontSize: 14, color: "#fff", textTransform: "uppercase", letterSpacing: "0.02em", marginBottom: 6 }}>{card.name}</h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>{card.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom 2 */}
          <motion.div {...scrollStagger} className="hv-grid-bot" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
            {RECOVERY_BOT.map((card, i) => (
              <motion.div variants={blurRevealItem} key={card.name} className="hv-card" style={{ borderRadius: 14, minHeight: 220, position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "24px 20px", cursor: "pointer" }}>
                <div style={{ position: "absolute", inset: 0, backgroundColor: "#1a1a1a" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 10%, rgba(0,0,0,0.3) 55%, rgba(0,0,0,0.05) 100%)", zIndex: 1 }} />
                <div style={{ position: "absolute", left: 0, right: 0, height: 1, background: "linear-gradient(to right, transparent, rgba(34,197,94,0.25), transparent)", animation: `hvScanLine 5s ease-in-out ${scanDelays[i + 3]}s infinite`, zIndex: 2, pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: 0, left: "20%", right: "20%", height: 2, background: "linear-gradient(to right, transparent, #22C55E, transparent)", zIndex: 2 }} />
                <div style={{ position: "relative", zIndex: 2 }}>
                  <h3 style={{ fontFamily: "'Michroma', sans-serif", fontSize: 14, color: "#fff", textTransform: "uppercase", letterSpacing: "0.02em", marginBottom: 6 }}>{card.name}</h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>{card.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* ── SERVICIOS PREMIUM ── */}
        <motion.section
          {...scrollReveal}
          className="hv-servicios"
          style={{ background: "#0a0a0a", padding: "0 7% 72px", position: "relative", zIndex: 1 }}
        >
          <motion.h2 {...scrollReveal} style={{ fontFamily: "'Michroma', sans-serif", fontSize: "clamp(16px, 2vw, 24px)", color: "#FFFFFF", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 8 }}>
            SERVICIOS PREMIUM
          </motion.h2>
          <motion.p {...scrollReveal} style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.35)", marginBottom: 32 }}>
            Protocolos avanzados para miembros comprometidos con su evolución.
          </motion.p>

          <motion.div {...scrollStagger}>
            {SERVICIOS.map((s, i) => (
              <motion.div
                variants={blurRevealItem}
                key={s.num}
                style={{ display: "flex", alignItems: "flex-start", gap: 20, padding: "24px 0", borderBottom: i < SERVICIOS.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}
              >
                <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 14, fontWeight: 500, color: "#22C55E", flexShrink: 0, width: 32 }}>{s.num}</span>
                <div>
                  <div className="hv-servicio-line" style={{ height: 1, background: "linear-gradient(to right, #22C55E, transparent)", width: 200, marginBottom: 8 }} />
                  <h3 style={{ fontFamily: "'Michroma', sans-serif", fontSize: 14, color: "#FFFFFF", textTransform: "uppercase", letterSpacing: "0.02em", marginBottom: 8 }}>{s.name}</h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.35)", lineHeight: 1.6, maxWidth: 600 }}>{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* ── FOOTER ── */}
        <motion.footer {...scrollReveal} className="hv-footer" style={{ padding: "40px 7%", borderTop: "1px solid rgba(34,197,94,0.08)", display: "flex", flexDirection: "column", alignItems: "center", gap: 16, background: "#0a0a0a" }}>
          <FingerprintSVG color="#22C55E" size={32} />
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.25)" }}>Reset — Blueprint Project</p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: "rgba(255,255,255,0.15)" }}>© 2025 Blueprint Project</p>
        </motion.footer>
        <BackToHomeButton />
      </motion.div>
    </>
  );
};

export default HuellaVerde;
