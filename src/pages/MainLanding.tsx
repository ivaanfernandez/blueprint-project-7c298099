import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ProceduralBackground from "@/components/ProceduralBackground";
import { WordRotate } from "@/components/ui/word-rotate";
import { Dock, DockIcon } from "@/components/ui/dock";

const FingerprintSVG = ({ color, size = 48 }: { color: string; size?: number }) => (
  <svg viewBox="0 0 140 140" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
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
  {
    color: "#1A6BFF",
    glow: "rgba(26,107,255,0.8)",
    route: "/huella-azul",
    tooltip: "ENTRENAMIENTO",
    tag: "BLUEPRINT PROJECT",
    title: "ENTRENAMIENTO",
    body: "La huella azul es donde la acción sucede. El cuerpo se convierte en el primer punto de orden. Fuerza construida repetición a repetición.",
    borderBase: "rgba(26,107,255,0.3)",
    borderHover: "rgba(26,107,255,0.7)",
    bgBase: "rgba(26,107,255,0.04)",
    bgHover: "rgba(26,107,255,0.08)",
  },
  {
    color: "#FF3B3B",
    glow: "rgba(255,59,59,0.8)",
    route: "/huella-roja",
    tooltip: "NUTRICIÓN",
    tag: "HACK BAR",
    title: "NUTRICIÓN",
    body: "La huella roja alimenta el sistema. Cada comida es una señal que le envías a tu cuerpo. Precisión en lo que consumes, transformación en lo que produces.",
    borderBase: "rgba(255,59,59,0.3)",
    borderHover: "rgba(255,59,59,0.7)",
    bgBase: "rgba(255,59,59,0.04)",
    bgHover: "rgba(255,59,59,0.08)",
  },
  {
    color: "#22C55E",
    glow: "rgba(34,197,94,0.8)",
    route: "/huella-verde",
    tooltip: "RECUPERACIÓN",
    tag: "RESET",
    title: "RECUPERACIÓN",
    body: "La huella verde cierra el ciclo. Sin recuperación no hay progreso. Descanso estratégico, sueño optimizado, restauración completa.",
    borderBase: "rgba(34,197,94,0.3)",
    borderHover: "rgba(34,197,94,0.7)",
    bgBase: "rgba(34,197,94,0.04)",
    bgHover: "rgba(34,197,94,0.08)",
  },
];


const HuellaCard = ({ h }: { h: typeof HUELLAS[0] }) => (
  <div
    className="group"
    style={{
      border: `1px solid ${h.borderBase}`,
      background: h.bgBase,
      borderRadius: "16px",
      padding: "48px 36px",
      transition: "border-color 0.3s, background 0.3s",
    }}
    onMouseEnter={(e) => {
      (e.currentTarget as HTMLElement).style.borderColor = h.borderHover;
      (e.currentTarget as HTMLElement).style.background = h.bgHover;
    }}
    onMouseLeave={(e) => {
      (e.currentTarget as HTMLElement).style.borderColor = h.borderBase;
      (e.currentTarget as HTMLElement).style.background = h.bgBase;
    }}
  >
    <FingerprintSVG color={h.color} size={48} />
    <p style={{ fontSize: "10px", letterSpacing: "0.3em", color: h.color, marginTop: "24px" }}>{h.tag}</p>
    <p style={{ fontSize: "24px", fontWeight: 700, color: "#fff", marginTop: "8px" }}>{h.title}</p>
    <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.55)", marginTop: "16px", lineHeight: 1.7 }}>{h.body}</p>
  </div>
);

const MainLanding = ({ showDock }: { showDock: boolean }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{ backgroundColor: "#000", fontFamily: "'Space Grotesk', sans-serif" }}
    >
      <ProceduralBackground />

      {/* FIXED DOCK NAV */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center" style={{ paddingTop: "20px", opacity: showDock ? 1 : 0, pointerEvents: showDock ? "auto" : "none", transition: "opacity 0.8s ease" }}>
        <Dock>
          {HUELLAS.map((h) => (
            <DockIcon key={h.route} tooltip={h.tooltip} onClick={() => navigate(h.route)}>
              <div className="flex items-center justify-center w-full h-full" style={{ filter: `drop-shadow(0 0 8px ${h.glow})` }}>
                <FingerprintSVG color={h.color} size={40} />
              </div>
            </DockIcon>
          ))}
        </Dock>
      </div>

      {/* HERO */}
      <section className="relative z-10 flex min-h-screen flex-col items-center md:items-center" style={{ paddingBottom: "80px" }}>
        {/* Headline */}
        <div
          className="hero-headline-wrapper"
          style={{ lineHeight: 0.95, paddingTop: "120px", position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexWrap: "nowrap", width: "100%", boxSizing: "border-box" as const, overflow: "visible" }}
        >
          <style>{`
            @media (min-width: 768px) {
              .hero-headline-wrapper { padding-top: 140px !important; flex-direction: row !important; padding-left: 40px !important; padding-right: 40px !important; }
              .hero-line { font-size: clamp(28px, 3.5vw, 52px) !important; }
            }
            @media (max-width: 767px) {
              .hero-line { font-size: clamp(44px, 11vw, 64px) !important; }
              .hero-spacer { display: none !important; }
              .hero-rotate-wrapper { width: auto !important; text-align: center !important; }
            }
          `}</style>
          <span
            className="hero-line"
            style={{
              whiteSpace: "nowrap",
              fontWeight: 800,
              color: "#FFFFFF",
              flexShrink: 0,
            }}
          >
            THIS ISN'T A GYM,
          </span>
          <span className="hero-spacer" style={{ flexShrink: 0 }}>&nbsp;</span>
          <div
            className="hero-rotate-wrapper"
            style={{ display: "inline-block", width: "auto", flexShrink: 0, overflow: "visible", textAlign: "left" }}
          >
            <WordRotate
              words={["IT'S A SYSTEM", "IT'S A COMMUNITY", "IT'S A MINDSET", "THIS IS BLUEPRINT"]}
              duration={2500}
              framerProps={{
                initial: { opacity: 0, y: 50 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: -50 },
                transition: { duration: 0.4, ease: "easeOut" },
                style: {
                  whiteSpace: "nowrap",
                  position: "relative",
                  fontWeight: 800,
                  color: "#1A6BFF",
                  lineHeight: 0.95,
                },
              }}
              className="hero-line"
            />
          </div>
        </div>


        {/* Scroll indicator */}
        <div className="flex flex-col items-center gap-2" style={{ position: "absolute", bottom: "40px", left: "50%", transform: "translateX(-50%)" }}>
          <div
            style={{
              width: "1px",
              height: "40px",
              backgroundColor: "#1A6BFF",
              animation: "pulse-line 2s ease-in-out infinite",
            }}
          />
          <p style={{ fontSize: "9px", letterSpacing: "0.3em", color: "rgba(255,255,255,0.4)" }}>SCROLL</p>
        </div>
      </section>

      {/* TRES HUELLAS */}
      <section className="relative z-10" style={{ padding: "120px 24px" }}>
        <div className="text-center">
          <p style={{ fontSize: "11px", letterSpacing: "0.35em", color: "#1A6BFF" }}>EL SISTEMA</p>
          <h2 style={{ fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 800, color: "#fff", marginTop: "16px" }}>
            TRES HUELLAS.
          </h2>
          <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.5)", marginTop: "16px" }}>
            No son servicios separados. Es un sistema operativo.
          </p>
        </div>

        <div
          className="mx-auto mt-16 grid gap-6"
          style={{ maxWidth: "1100px", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}
        >
          {HUELLAS.map((h) => (
            <HuellaCard key={h.tag} h={h} />
          ))}
        </div>
      </section>

      <style>{`
        @keyframes pulse-line {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
        }
      `}</style>
    </motion.div>
  );
};

export default MainLanding;
