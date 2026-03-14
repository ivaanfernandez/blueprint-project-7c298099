import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ProceduralBackground from "@/components/ProceduralBackground";
import { WordRotate } from "@/components/ui/word-rotate";
import { Dock, DockIcon } from "@/components/ui/dock";
import gymHero from '@/assets/blueprint-gym.jpg';
import { ShinyButton } from '@/components/ui/shiny-button';
import { LocationMap } from '@/components/ui/expand-map';
import { FadeText } from '@/components/ui/fade-text';

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
      {/* FIXED DOCK NAV */}
      <div className="fixed z-50" style={{ top: 0, left: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "center", paddingTop: "20px", opacity: showDock ? 1 : 0, pointerEvents: showDock ? "auto" : "none", transition: "opacity 0.8s ease" }}>
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
      <section className="hero-section flex flex-col items-center md:items-center" style={{ position: "relative", height: "100vh", overflow: "hidden", zIndex: 2 }}>
        {/* Hero background image */}
        <img
          src={gymHero}
          alt="Blueprint Project"
          className="hero-bg-image"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", zIndex: 0 }}
        />
        {/* Dark gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.75) 100%)",
          }}
        />
        {/* Hero content - on top of image */}
        <div className="hero-content-wrapper" style={{ position: "relative", zIndex: 10, width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
<div className="hero-headline-wrapper" style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          width: '100%',
          paddingLeft: '80px',
          paddingRight: '40px',
          boxSizing: 'border-box',
          position: 'relative',
          zIndex: 10,
          paddingTop: '140px'
        }}>
          <span className="hero-headline-white" style={{
            color: '#FFFFFF',
            fontFamily: 'Rajdhani, sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(44px, 5.5vw, 76px)',
            whiteSpace: 'nowrap',
            flexShrink: 0,
            lineHeight: 1
          }}>
            <span className="hero-comma">THIS ISN'T A GYM,&nbsp;</span>
            <span className="hero-no-comma">THIS ISN'T A GYM&nbsp;</span>
          </span>
          <span className="hero-headline-blue" style={{
            color: '#1A6BFF',
            fontFamily: 'Rajdhani, sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(44px, 5.5vw, 76px)',
            whiteSpace: 'nowrap',
            lineHeight: 1,
            flexShrink: 0
          }}>
            <WordRotate
              words={[
                "IT'S A SYSTEM",
                "IT'S A COMMUNITY",
                "IT'S A MINDSET",
                "THIS IS BLUEPRINT"
              ]}
              duration={2500}
              className=""
              framerProps={{
                initial: { opacity: 0, y: -30 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: 30 },
                transition: { duration: 0.25, ease: "easeOut" }
              }}
            />
          </span>
        </div>

        <div className="hero-subtext-container" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          margin: '20px auto 0',
          position: 'relative',
          zIndex: 10,
          textAlign: 'center'
        }}>
          <div className="hero-subtext-line hero-subtext-line1" style={{
            color: 'rgba(255,255,255,0.6)',
            fontSize: 'clamp(10px, 1vw, 15px)',
            fontFamily: 'Space Grotesk, sans-serif',
            whiteSpace: 'nowrap',
            letterSpacing: '0.04em',
            lineHeight: '2'
          }}>
            <span className="hero-subtext-desktop">
              <FadeText
                direction="up"
                text="Every detail, from the space to the mindset, is engineered for performance, recovery and mental clarity."
                framerProps={{ show: { transition: { delay: 0.1, type: 'spring' } } }}
                className=""
              />
            </span>
            <span className="hero-subtext-mobile">
              <FadeText
                direction="up"
                text="Mindset. Performance. Recovery"
                framerProps={{ show: { transition: { delay: 0.1, type: 'spring' } } }}
                className=""
              />
            </span>
          </div>
          {[
            { text: "We're here to reprogram you physically, mentally, and energetically.", delay: 0.25, mobileClass: "hero-subtext-hide-mobile" },
            { text: "This is where discipline meets design.", delay: 0.4 },
            { text: "Welcome to the future of self mastery.", delay: 0.55 },
          ].map((item) => (
            <div key={item.text} className={`hero-subtext-line ${item.mobileClass || ''}`} style={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: 'clamp(10px, 1vw, 15px)',
              fontFamily: 'Space Grotesk, sans-serif',
              whiteSpace: 'nowrap',
              letterSpacing: '0.04em',
              lineHeight: '2'
            }}>
              <FadeText
                direction="up"
                text={item.text}
                framerProps={{ show: { transition: { delay: item.delay, type: 'spring' } } }}
                className=""
              />
            </div>
          ))}
          <div className="hero-subtext-line" style={{
            color: '#1A6BFF',
            fontSize: 'clamp(10px, 1vw, 15px)',
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: '600',
            whiteSpace: 'nowrap',
            letterSpacing: '0.04em',
            lineHeight: '2'
          }}>
            <FadeText
              direction="up"
              text="Follow the BLUEPRINT."
              framerProps={{ show: { transition: { delay: 0.7, type: 'spring' } } }}
              className=""
            />
          </div>
        </div>

        {/* CTA Button */}
        <div className="hero-cta-button" style={{ marginTop: "48px", display: "flex", justifyContent: "center", width: "auto", maxWidth: "280px" }}>
          <ShinyButton fontSize="13px" className="hero-shiny-btn">HAVE YOUR BLUEPRINT</ShinyButton>
        </div>

        </div>

      </section>

      <ProceduralBackground />

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

      {/* LOCATION */}
      <section className="relative z-10" style={{ padding: "120px 24px" }}>
        <div className="text-center">
          <p style={{ fontSize: "11px", letterSpacing: "0.35em", color: "#1A6BFF" }}>ENCUÉNTRANOS</p>
          <h2 style={{ fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 800, color: "#fff", marginTop: "16px" }}>
            LOCATION
          </h2>
          <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.5)", marginTop: "16px" }}>
            Santurce, Puerto Rico
          </p>
        </div>

        <div className="mx-auto mt-16 flex flex-col gap-4" style={{ maxWidth: "700px" }}>
          <LocationMap
            title="BLUEPRINT PROJECT"
            address="1951 Calle Loíza, Santurce, PR 00911"
            hours="Lun–Vie 5:00 AM – 10:00 PM · Sáb–Dom 7:00 AM – 6:00 PM"
            mapUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3785.5!2d-66.05!3d18.45!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sSanturce%2C+PR!5e0!3m2!1sen!2sus!4v1"
          />
          <LocationMap
            title="HACK BAR"
            address="1953 Calle Loíza, Santurce, PR 00911"
            hours="Lun–Sáb 6:00 AM – 8:00 PM · Dom 8:00 AM – 4:00 PM"
            mapUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3785.5!2d-66.05!3d18.45!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sSanturce%2C+PR!5e0!3m2!1sen!2sus!4v1"
          />
          <LocationMap
            title="RESET"
            address="1955 Calle Loíza, Santurce, PR 00911"
            hours="Lun–Dom 8:00 AM – 9:00 PM"
            mapUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3785.5!2d-66.05!3d18.45!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sSanturce%2C+PR!5e0!3m2!1sen!2sus!4v1"
          />
        </div>

        <p className="text-center" style={{ fontSize: "10px", letterSpacing: "0.3em", color: "rgba(255,255,255,0.3)", marginTop: "32px" }}>
          CLICK ON EACH LOCATION TO EXPAND
        </p>
      </section>

      <style>{`
        @keyframes pulse-line {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
        }
        .hero-shiny-btn {
          white-space: nowrap !important;
          padding: 1rem 2rem !important;
        }
        .hero-no-comma {
          display: none;
        }
        .hero-subtext-mobile {
          display: none;
        }
        .hero-subtext-desktop {
          display: inline;
        }
        @media (max-width: 767px) {
          .hero-headline-wrapper {
            flex-wrap: wrap !important;
            text-align: center !important;
            justify-content: center !important;
            padding-left: 20px !important;
            padding-right: 20px !important;
          }
          .hero-headline-white {
            width: 100% !important;
            font-size: clamp(36px, 9vw, 48px) !important;
          }
          .hero-headline-blue {
            font-size: clamp(36px, 9vw, 48px) !important;
          }
          .hero-comma {
            display: none !important;
          }
          .hero-no-comma {
            display: inline !important;
          }
          /* Subtext container mobile */
          .hero-subtext-container {
            text-align: center !important;
            align-items: center !important;
            padding: 0 20px !important;
            width: 100% !important;
          }
          /* Line 1 mobile: wrap into 2 lines */
          .hero-subtext-line1 {
            white-space: normal !important;
            max-width: 320px !important;
          }
          /* Lines 2-5 mobile: smaller font, keep nowrap, center */
          .hero-subtext-line {
            white-space: nowrap !important;
            font-size: clamp(9px, 2.8vw, 12px) !important;
            text-align: center !important;
            display: flex !important;
            justify-content: center !important;
            width: 100% !important;
          }
          /* Show mobile text, hide desktop on mobile */
          .hero-subtext-mobile {
            display: inline !important;
          }
          .hero-subtext-desktop {
            display: none !important;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default MainLanding;
