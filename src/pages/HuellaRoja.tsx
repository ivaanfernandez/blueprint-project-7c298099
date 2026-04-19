import { useState, useCallback } from "react";
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
  { color: "#1A6BFF", glow: "rgba(26,107,255,0.7)", route: "/huella-azul", tooltip: "ENTRENAMIENTO" },
  { color: "#FF3B3B", glow: "rgba(255,59,59,0.7)", route: "/huella-roja", tooltip: "NUTRICIÓN" },
  { color: "#22C55E", glow: "rgba(34,197,94,0.7)", route: "/huella-verde", tooltip: "RECUPERACIÓN" },
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
const FuelCard = ({ name, desc, items, index }: { name: string; desc: string; items: string[]; index: number }) => (
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
    <div style={{ position: "absolute", inset: 0, backgroundColor: "#1a1a1a" }} />
    {/* Gradient overlay */}
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.9) 15%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)", zIndex: 1 }} />
    <CornerBrackets />
    {/* Scan line */}
    <div style={{ position: "absolute", left: 0, right: 0, height: 1, background: "linear-gradient(to right, transparent, rgba(255,59,59,0.3), transparent)", animation: "hrScanLine 4s ease-in-out infinite", zIndex: 2, pointerEvents: "none" }} />
    {/* Content */}
    <div style={{ position: "relative", zIndex: 2 }}>
      <p style={{ fontFamily: "'Michroma', sans-serif", fontSize: 18, color: "#fff", textTransform: "uppercase", marginBottom: 8 }}>{name}</p>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.6, marginBottom: 12 }}>{desc}</p>
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
        .hr-fuel-card:hover { transform: translateY(-4px); box-shadow: 0 8px 32px rgba(255,59,59,0.15); }
        .hr-station-card:hover { transform: translateY(-4px); }
        @media (max-width: 767px) {
          .hr-hero { flex-direction: column !important; }
          .hr-hero-left { flex: none !important; width: 100% !important; padding: 100px 6% 40px !important; text-align: center !important; align-items: center !important; }
          .hr-hero-right { flex: none !important; width: 100% !important; height: 250px !important; }
          .hr-hero-fade { width: 100% !important; height: 60px !important; background: linear-gradient(to bottom, #0a0a0a, transparent) !important; top: 0 !important; left: 0 !important; }
          .hr-hero-title { font-size: clamp(28px, 8vw, 42px) !important; }
          .hr-hero-subtitle { text-align: center !important; max-width: 100% !important; }
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
          {/* Ambient glow */}
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 10% 70%, rgba(255,59,59,0.12) 0%, transparent 55%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 90% 40%, rgba(255,59,59,0.06) 0%, transparent 50%)", pointerEvents: "none" }} />

          <p style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,59,59,0.5)", animation: "hrFadeUp 0.8s ease 0.3s both" }}>
            BLUEPRINT SYSTEM
          </p>

          <TextScramble
            className="hr-hero-title"
            as="h1"
            style={{ fontFamily: "'Michroma', sans-serif", fontSize: "clamp(36px, 5vw, 64px)", color: "#FFFFFF", textTransform: "uppercase", letterSpacing: "0.04em", lineHeight: 1.08 }}
            duration={1.2}
            speed={0.04}
          >
            HACK BAR
          </TextScramble>

          <p className="hr-hero-subtitle" style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 300, color: "rgba(255,255,255,0.4)", lineHeight: 1.7, maxWidth: 480, animation: "hrFadeUp 0.8s ease 0.5s both" }}>
            La rama roja de Blueprint Lab. Energía funcional, nutrición inteligente y optimización metabólica al servicio de tu rendimiento diario.
          </p>
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
        <p style={{ fontFamily: "'Michroma', sans-serif", fontSize: "clamp(16px, 2vw, 24px)", color: "#FFFFFF", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 8 }}>
          FUEL YOUR SYSTEM
        </p>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.35)", marginBottom: 32 }}>
          Tu cuerpo merece combustible de calidad. Elige tu protocolo nutricional.
        </p>
        <div className="hr-fuel-grid" style={{ display: "flex", gap: 20 }}>
          <FuelCard
            index={0}
            name="SUPLEMENTOS"
            desc="Línea Blueprint x AFTER. Ciencia deportiva + nutrición funcional avanzada."
            items={["Hydration Boost", "Focus Stack", "Recovery Mix"]}
          />
          <FuelCard
            index={1}
            name="MEAL PREP"
            desc="Comidas con balance perfecto de macros, sabor limpio y alimentos funcionales."
            items={["Planes semanales", "Performance / Shred / Gain", "Trazabilidad QR"]}
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
        <p style={{ fontFamily: "'Michroma', sans-serif", fontSize: "clamp(16px, 2vw, 24px)", color: "#FFFFFF", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 8 }}>
          HACKBAR STATION
        </p>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.35)", marginBottom: 32 }}>
          Tu laboratorio nutricional dentro de BlueprintLab.
        </p>
        <div className="hr-station-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          <StationCard index={0} name="BATIDOS PERSONALIZADOS" desc="Según tu tipo de entrenamiento o meta: energía, recuperación, masa magra o detox." />
          <StationCard index={1} name="CAFÉ FUNCIONAL" desc="Infusionado con adaptógenos y nootrópicos para claridad mental sostenida sin el crash." />
          <StationCard index={2} name="SNACKS BLUEPRINT" desc="Sin conservantes ni azúcar refinada. Solo ingredientes funcionales que alimentan tu sistema." />
        </div>
      </motion.section>

      {/* ═══ SECTION D: FOOTER ═══ */}
      <footer className="hr-footer" style={{ padding: "40px 7%", borderTop: "1px solid rgba(255,59,59,0.08)", display: "flex", flexDirection: "column", alignItems: "center", gap: 16, backgroundColor: "#0a0a0a" }}>
        <FingerprintSVG color="#FF3B3B" size={32} />
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.25)" }}>Hack Bar — Blueprint Project</p>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: "rgba(255,255,255,0.15)" }}>© 2025 Blueprint Project</p>
      </footer>

      {/* Bottom spacer for dock */}
      <div style={{ height: 120 }} />
    </motion.div>
  );
};

export default HuellaRoja;
