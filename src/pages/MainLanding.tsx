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
import { ChevronDown } from 'lucide-react';
import { InteractiveImageAccordion } from '@/components/ui/interactive-image-accordion';
import PricingSection from '@/components/PricingSection';
import BentoGrid from '@/components/BentoGrid';
import Footer from '@/components/Footer';
import slider1 from '@/assets/slider/slider-1.jpg';
import slider2 from '@/assets/slider/slider-2.jpg';
import slider3 from '@/assets/slider/slider-3.jpg';
import slider4 from '@/assets/slider/slider-4.jpg';
import slider5 from '@/assets/slider/slider-5.jpg';
import slider6 from '@/assets/slider/slider-6.jpg';

const GYM_SLIDER_IMAGES = [
  { src: slider1, alt: "Blueprint Project — Instalaciones 1" },
  { src: slider2, alt: "Blueprint Project — Instalaciones 2" },
  { src: slider3, alt: "Blueprint Project — Instalaciones 3" },
  { src: slider4, alt: "Blueprint Project — Instalaciones 4" },
  { src: slider5, alt: "Blueprint Project — Instalaciones 5" },
  { src: slider6, alt: "Blueprint Project — Instalaciones 6" },
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
                if (h.color === "#1A6BFF") {
                  navigate("/");
                  return;
                }
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
        {/* DESKTOP content — unchanged */}
        <div className="hero-content-wrapper hidden md:flex" style={{ position: "relative", zIndex: 10, width: "100%", flexDirection: "column", paddingTop: "110px" }}>
        <div className="hero-headline-wrapper" style={{
          width: '100%',
          position: 'relative',
          zIndex: 10,
          paddingTop: '140px',
          textAlign: 'center',
          paddingLeft: '5%',
          paddingRight: '5%',
          overflow: 'hidden'
        }}>
          <span className="hero-headline-white" style={{
            color: '#FFFFFF',
            fontFamily: "'Michroma', sans-serif",
            fontWeight: 400,
            fontSize: 'clamp(20px, 3.2vw, 42px)',
            whiteSpace: 'nowrap',
            lineHeight: 1.08,
            letterSpacing: '0.02em',
            display: 'inline',
            verticalAlign: 'baseline'
          }}>
            <span className="hero-comma">THIS ISN'T A GYM,&nbsp;</span>
            <span className="hero-no-comma">THIS ISN'T A GYM</span>
          </span>
          <span className="hero-headline-blue" style={{
            color: '#1A6BFF',
            fontFamily: "'Michroma', sans-serif",
            fontWeight: 400,
            fontSize: 'clamp(20px, 3.2vw, 42px)',
            lineHeight: 1.08,
            letterSpacing: '0.02em',
            display: 'inline-block',
            textAlign: 'left',
            verticalAlign: 'baseline',
            position: 'relative',
            top: '0.14em',
            padding: 0,
            margin: 0
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
          {[
            { text: "This is where discipline meets design.", delay: 0.1 },
            { text: "Welcome to the future of self mastery.", delay: 0.25 },
          ].map((item) => (
            <div key={item.text} className="hero-subtext-line" style={{
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
              framerProps={{ show: { transition: { delay: 0.4, type: 'spring' } } }}
              className=""
            />
          </div>
        </div>

        {/* CTA Button */}
        <div className="hero-cta-button" style={{ marginTop: "24px", display: "flex", justifyContent: "center", width: "100%" }}>
          <ShinyButton fontSize="15px" className="hero-shiny-btn">HAVE YOUR BLUEPRINT</ShinyButton>
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll-indicator" style={{ marginTop: 24, display: 'flex', justifyContent: 'center', width: '100%', pointerEvents: 'none' }}>
          <ChevronDown size={24} style={{ color: 'rgba(255,255,255,0.3)', animation: 'hero-bounce 2s ease-in-out infinite' }} />
        </div>

        </div>

        {/* MOBILE content — text centered absolutely, button pinned to bottom */}
        <div className="flex md:hidden" style={{
          position: "relative",
          zIndex: 10,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100vh",
          minHeight: "100vh",
          padding: "80px 6% 100px",
          boxSizing: "border-box",
        }}>
          {/* Centered text block */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
            width: '100%',
            textAlign: 'center',
          }}>
            <div style={{ width: '100%', textAlign: 'center', overflow: 'hidden' }}>
              <span style={{
                display: 'block',
                color: '#FFFFFF',
                fontFamily: "'Michroma', sans-serif",
                fontWeight: 400,
                fontSize: 'clamp(18px, 5.5vw, 32px)',
                lineHeight: 1.15,
                letterSpacing: '0.02em',
                textAlign: 'center',
              }}>
                THIS ISN'T A GYM
              </span>
              <span className="mobile-wordrotate" style={{
                display: 'block',
                color: '#1A6BFF',
                fontFamily: "'Michroma', sans-serif",
                fontWeight: 400,
                fontSize: 'clamp(18px, 5.5vw, 32px)',
                lineHeight: 1.15,
                letterSpacing: '0.02em',
                textAlign: 'center',
                marginTop: '4px',
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
                />
              </span>
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2px',
              textAlign: 'center',
              width: '100%',
            }}>
              {[
                { text: "This is where discipline meets design.", delay: 0.1 },
                { text: "Welcome to the future of self mastery.", delay: 0.25 },
              ].map((item) => (
                <div key={item.text} style={{
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: 'clamp(12px, 3.5vw, 16px)',
                  fontFamily: 'Space Grotesk, sans-serif',
                  whiteSpace: 'nowrap',
                  letterSpacing: '0.04em',
                  lineHeight: 2,
                  textAlign: 'center',
                }}>
                  <FadeText
                    direction="up"
                    text={item.text}
                    framerProps={{ show: { transition: { delay: item.delay, type: 'spring' } } }}
                    className=""
                  />
                </div>
              ))}
              <div style={{
                color: '#1A6BFF',
                fontSize: 'clamp(12px, 3.5vw, 16px)',
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                letterSpacing: '0.04em',
                lineHeight: 2,
                textAlign: 'center',
              }}>
                <FadeText
                  direction="up"
                  text="Follow the BLUEPRINT."
                  framerProps={{ show: { transition: { delay: 0.4, type: 'spring' } } }}
                  className=""
                />
              </div>
            </div>
          </div>

          {/* Button + Chevron pinned to bottom via absolute positioning */}
          <div style={{
            position: "absolute",
            bottom: "20px",
            left: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
          }}>
            <ShinyButton fontSize="15px" className="hero-shiny-btn">HAVE YOUR BLUEPRINT</ShinyButton>
            <ChevronDown size={24} style={{ color: 'rgba(255,255,255,0.3)', animation: 'hero-bounce 2s ease-in-out infinite' }} />
          </div>
        </div>

      </section>

      <ProceduralBackground />

      {/* IMAGE AUTO-SLIDER */}
      <div style={{ marginTop: '80px', position: 'relative', zIndex: 10, background: '#000', marginBottom: '48px', paddingBottom: 0 }}>
        <ImageAutoSlider images={GYM_SLIDER_IMAGES} />
      </div>

      <div style={{ position: 'relative', zIndex: 10 }}>
        <InteractiveImageAccordion />
      </div>


      {/* PRICING */}
      <PricingSection />

      {/* BENTO GRID */}
      <BentoGrid />

      {/* FOOTER */}
      <Footer />

      <style>{`
        @keyframes pulse-line {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
        }
        @keyframes hero-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
        .hero-shiny-btn {
          white-space: nowrap !important;
          padding: 1.25rem 3rem !important;
          font-size: 15px !important;
          min-width: 280px !important;
          letter-spacing: 0.15em !important;
        }
        @media (max-width: 767px) {
          .hero-shiny-btn {
            font-size: 12px !important;
            padding: 1.1rem 2.5rem !important;
            min-width: 280px !important;
            letter-spacing: 0.15em !important;
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
            text-align: center !important;
            padding-top: 80px !important;
          }
          .hero-headline-blue {
            top: 0.14em !important;
          }
          .hero-subtext-container {
            margin-top: 16px !important;
          }
          .hero-subtext-line {
            font-size: clamp(14px, 1.5vw, 20px) !important;
          }
          .hero-cta-button {
            margin-top: 64px !important;
            margin-bottom: 40px !important;
          }
        }
        @media (max-width: 767px) {
          .hero-bottom-fade {
            display: block !important;
          }
          .hero-section {
            height: 100vh !important;
            min-height: 100vh !important;
            margin-bottom: 60px !important;
          }
          .hero-bg-desktop {
            display: none !important;
          }
          .hero-bg-mobile {
            display: block !important;
          }
          .hero-content-wrapper.hidden {
            display: none !important;
          }
          .hero-headline-wrapper {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            padding: 0 4% !important;
            padding-top: 0 !important;
          }
          .hero-headline-white {
            display: block !important;
            font-size: clamp(18px, 5.5vw, 32px) !important;
            white-space: normal !important;
            text-align: center !important;
            width: 100% !important;
          }
          .hero-headline-blue {
            display: block !important;
            font-size: clamp(18px, 5.5vw, 32px) !important;
            width: 100% !important;
            text-align: center !important;
            top: 0 !important;
            white-space: normal !important;
          }
          .hero-headline-blue .word-rotate-wrapper {
            width: 100% !important;
            min-width: 0 !important;
            max-width: 100% !important;
            height: auto !important;
            min-height: 1.2em !important;
          }
          .hero-headline-blue .word-rotate-inner {
            position: relative !important;
            left: auto !important;
            right: auto !important;
            transform: none !important;
            justify-content: center !important;
            white-space: normal !important;
            width: 100% !important;
            text-align: center !important;
            display: flex !important;
          }
          .hero-cta-button {
            margin-top: auto !important;
            margin-bottom: 20px !important;
            align-self: center !important;
          }
          .hero-scroll-indicator {
            margin-top: 0 !important;
            margin-bottom: 16px !important;
          }
          .hero-shiny-btn {
            font-size: 11px !important;
            padding: 0.63rem 1.6rem !important;
            min-width: unset !important;
            max-width: 70% !important;
            letter-spacing: 0.15em !important;
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
            display: block !important;
          }
          .hero-subtext-container {
            text-align: center !important;
            align-items: center !important;
            padding: 0 20px !important;
            width: 100% !important;
          }
          .hero-subtext-line {
            white-space: nowrap !important;
            font-size: clamp(12px, 3.5vw, 16px) !important;
            text-align: center !important;
            display: flex !important;
            justify-content: center !important;
            width: 100% !important;
          }
          .mobile-wordrotate {
            display: block !important;
            width: 100% !important;
            text-align: center !important;
          }
          .mobile-wordrotate .word-rotate-wrapper {
            width: 100% !important;
            min-width: 0 !important;
            max-width: 100% !important;
            height: auto !important;
            min-height: 1.2em !important;
            display: block !important;
            text-align: center !important;
          }
          .mobile-wordrotate .word-rotate-inner {
            position: relative !important;
            left: auto !important;
            right: auto !important;
            transform: none !important;
            display: flex !important;
            justify-content: center !important;
            width: 100% !important;
            text-align: center !important;
            white-space: normal !important;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default MainLanding;
