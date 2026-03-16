import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ProceduralBackground from "@/components/ProceduralBackground";
import { WordRotate } from "@/components/ui/word-rotate";
import { Dock, DockIcon } from "@/components/ui/dock";
import gymHero from '@/assets/blueprint-gym-hero.jpg';
import { ShinyButton } from '@/components/ui/shiny-button';
import { LocationMap } from '@/components/ui/expand-map';
import { FadeText } from '@/components/ui/fade-text';
import { ImageAutoSlider } from '@/components/ui/image-auto-slider';
import { InteractiveImageAccordion } from '@/components/ui/interactive-image-accordion';
import slider1 from '@/assets/slider/slider-1.jpg';
import slider2 from '@/assets/slider/slider-2.jpg';
import slider3 from '@/assets/slider/slider-3.jpg';
import slider4 from '@/assets/slider/slider-4.jpg';
import slider5 from '@/assets/slider/slider-5.jpg';
import slider6 from '@/assets/slider/slider-6.jpg';
import slider7 from '@/assets/slider/slider-7.jpg';

const GYM_SLIDER_IMAGES = [
  { src: slider1, alt: "Blueprint Project — Instalaciones 1" },
  { src: slider2, alt: "Blueprint Project — Instalaciones 2" },
  { src: slider3, alt: "Blueprint Project — Instalaciones 3" },
  { src: slider4, alt: "Blueprint Project — Instalaciones 4" },
  { src: slider5, alt: "Blueprint Project — Instalaciones 5" },
  { src: slider6, alt: "Blueprint Project — Instalaciones 6" },
  { src: slider7, alt: "Blueprint Project — Instalaciones 7" },
];

const FingerprintSVG = ({ color, size = 48 }: { color: string; size?: number }) => (
  <svg 
    viewBox="0 0 140 140" 
    width={size} 
    height={size} 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    style={{
      display: 'block',
      margin: '0 auto',
      position: 'relative',
      left: 0,
      transform: 'none'
    }}
  >
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
    sectionId: "huella-azul",
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
    sectionId: "huella-roja",
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
    sectionId: "huella-verde",
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
      <div style={{
        position: 'fixed',
        top: '16px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 50,
        pointerEvents: 'none',
        display: 'flex',
        justifyContent: 'center',
        opacity: showDock ? 1 : 0,
        transition: 'opacity 0.8s ease'
      }}>
        <div style={{ pointerEvents: showDock ? 'all' : 'none' }}>
          <Dock>
            {HUELLAS.map((h) => (
              <DockIcon key={h.route} tooltip={h.tooltip} onClick={() => {
                const el = document.getElementById(h.sectionId);
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                } else {
                  navigate(h.route);
                }
              }}>
                <div 
                  className="dock-fingerprint-wrapper"
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    width: '100%', 
                    height: '100%', 
                    filter: `drop-shadow(0 0 8px ${h.glow})` 
                  }}
                >
                  <FingerprintSVG color={h.color} size={44} />
                </div>
              </DockIcon>
            ))}
          </Dock>
        </div>
      </div>

      {/* HERO */}
      <section className="hero-section flex flex-col items-center md:items-center" style={{ position: "relative", overflow: "hidden", zIndex: 2 }}>
        {/* Mobile background image */}
        <img
          src={gymHero}
          alt="Blueprint Project"
          className="hero-bg-image hero-bg-mobile"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center", zIndex: 0 }}
        />
        {/* Desktop background image */}
        <img
          src={gymHero}
          alt="Blueprint Project"
          className="hero-bg-image hero-bg-desktop"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center", zIndex: 0 }}
        />
        {/* Dark gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0.85) 100%)",
          }}
        />
        {/* Bottom fade gradient - mobile only */}
        <div
          className="hero-bottom-fade"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "160px",
            background: "linear-gradient(to bottom, transparent 0%, #000000 100%)",
            pointerEvents: "none",
            zIndex: 5,
            display: "none",
          }}
        />
        {/* Hero content - on top of image */}
        <div className="hero-content-wrapper" style={{ position: "relative", zIndex: 10, width: "100%", display: "flex", flexDirection: "column", paddingTop: "110px" }}>
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
            fontFamily: 'Bebas Neue, sans-serif',
            fontWeight: 400,
            fontSize: 'clamp(56px, 7vw, 100px)',
            whiteSpace: 'nowrap',
            flexShrink: 0,
            lineHeight: 1
          }}>
            <span className="hero-comma">THIS ISN'T A GYM,&nbsp;</span>
            <span className="hero-no-comma">THIS ISN'T A GYM&nbsp;</span>
          </span>
          <span className="hero-headline-blue" style={{
            color: '#1A6BFF',
            fontFamily: 'Bebas Neue, sans-serif',
            fontWeight: 400,
            fontSize: 'clamp(56px, 7vw, 100px)',
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
          gap: '2px',
          margin: '12px auto 0',
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
        <div className="hero-cta-button" style={{ marginTop: "24px", display: "flex", justifyContent: "center", width: "100%" }}>
          <ShinyButton fontSize="13px" className="hero-shiny-btn">HAVE YOUR BLUEPRINT</ShinyButton>
        </div>

        </div>

      </section>

      <ProceduralBackground />

      {/* IMAGE AUTO-SLIDER */}
      <div style={{ marginTop: '-40px', position: 'relative', zIndex: 10, background: '#000', marginBottom: 0, paddingBottom: 0 }}>
        <ImageAutoSlider images={GYM_SLIDER_IMAGES} />
      </div>

      <div style={{ position: 'relative', zIndex: 10, marginTop: '-2px', background: '#000' }}>
        <InteractiveImageAccordion />
      </div>

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
            <div key={h.tag} id={h.sectionId}>
              <HuellaCard h={h} />
            </div>
          ))}
        </div>
      </section>

      {/* LOCATION */}
      <section style={{
        width: '100%',
        padding: '120px 0',
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '64px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{
            fontSize: '11px',
            letterSpacing: '0.35em',
            color: '#1A6BFF',
            fontFamily: 'Space Grotesk, sans-serif',
            marginBottom: '16px'
          }}>
            ENCUÉNTRANOS
          </p>
          <h2 style={{
            fontSize: 'clamp(36px, 5vw, 64px)',
            fontWeight: 800,
            color: '#FFFFFF',
            fontFamily: 'Rajdhani, sans-serif',
            lineHeight: 1,
            margin: 0
          }}>
            LOCATION
          </h2>
          <p style={{
            fontSize: '15px',
            color: 'rgba(255,255,255,0.5)',
            fontFamily: 'Space Grotesk, sans-serif',
            marginTop: '16px'
          }}>
            Santurce, Puerto Rico
          </p>
        </div>

        <LocationMap
          location="Blueprint Project — Santurce, PR"
          coordinates="1951 Calle Loíza, Santurce, PR 00911"
        />

        <p style={{
          fontSize: '11px',
          letterSpacing: '0.25em',
          color: 'rgba(255,255,255,0.3)',
          fontFamily: 'Space Grotesk, sans-serif',
          textAlign: 'center'
        }}>
          CLICK TO EXPAND
        </p>
      </section>

      <style>{`
        @keyframes pulse-line {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
        }
        .hero-shiny-btn {
          white-space: nowrap !important;
          padding: 0.7rem 1.8rem !important;
          font-size: 12px !important;
        }
        @media (max-width: 767px) {
          .hero-shiny-btn {
            font-size: 10px !important;
            padding: 0.7rem 1.5rem !important;
            width: auto !important;
            display: inline-block !important;
          }
        }
        .hero-no-comma {
          display: none;
        }
        /* Desktop hero styles */
        @media (min-width: 768px) {
          .hero-section {
            height: 100vh !important;
            width: 100vw !important;
            overflow: hidden !important;
          }
          .hero-bg-mobile {
            display: none !important;
          }
          .hero-bg-desktop {
            display: block !important;
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
            object-position: center 40% !important;
          }
          .hero-bg-image {
            object-position: center 40% !important;
          }
          .hero-content-wrapper {
            align-items: center !important;
            justify-content: flex-start !important;
          }
          .hero-headline-wrapper {
            justify-content: center !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
            text-align: left !important;
            padding-top: 80px !important;
          }
          .hero-subtext-container {
            margin-top: 16px !important;
          }
          .hero-subtext-line {
            font-size: clamp(14px, 1.5vw, 20px) !important;
          }
          .hero-cta-button {
            margin-top: 64px !important;
          }
        }
        .hero-subtext-mobile {
          display: none;
        }
        .hero-subtext-desktop {
          display: inline;
        }
        @media (max-width: 767px) {
          .hero-bottom-fade {
            display: block !important;
          }
          .hero-section {
            height: 95vh !important;
          }
          .hero-bg-desktop {
            display: none !important;
          }
          .hero-bg-mobile {
            display: block !important;
          }
          .hero-content-wrapper {
            padding-top: 80px !important;
          }
          .hero-headline-wrapper {
            flex-wrap: wrap !important;
            text-align: center !important;
            justify-content: center !important;
            padding-left: 20px !important;
            padding-right: 20px !important;
            padding-top: 55px !important;
          }
          .hero-headline-white {
            width: 100% !important;
            font-size: clamp(56px, 14.5vw, 76px) !important;
          }
          .hero-headline-blue {
            font-size: clamp(56px, 14.5vw, 76px) !important;
          }
          .hero-cta-button {
            margin-top: 48px !important;
            margin-bottom: 28px !important;
          }
          .hero-shiny-btn {
            font-size: 12px !important;
            padding: 0.9rem 2.2rem !important;
          }
          .dock-container {
            height: 52px !important;
            padding: 8px 12px !important;
            border-radius: 14px !important;
            gap: 12px !important;
          }
          .dock-fingerprint-wrapper {
            transform: scale(0.85) !important;
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
          /* Lines 2-5 mobile: larger font, keep nowrap, center */
          .hero-subtext-line {
            white-space: nowrap !important;
            font-size: clamp(10.5px, 3.2vw, 14px) !important;
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
          /* Hide second phrase on mobile */
          .hero-subtext-hide-mobile {
            display: none !important;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default MainLanding;
