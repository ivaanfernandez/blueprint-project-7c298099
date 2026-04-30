import { useRef, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { scrollReveal, scrollStagger, blurRevealItem } from "@/lib/scrollAnimations";
import ProceduralBackgroundWhite from "@/components/ProceduralBackgroundWhite";
import FooterBackground from "@/components/FooterBackground";
import FeatureCard from "@/components/FeatureCard";
import GradualBlur from "@/components/GradualBlur";
import HomeLoader from "@/components/HomeLoader";
import LazyMount from "@/components/LazyMount";

// ── Loader gate. Plays on every visit to the Home route.
//    Bypassed automatically when the existing E2E flags are present
//    (?e2e=1, localStorage.bp_skip_intro, window.__BP_E2E__) so visual
//    regression tests and Playwright runs skip the intro.


const shouldShowHomeLoader = (): boolean => {
  if (typeof window === "undefined") return false;
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get("e2e") === "1") return false;
    if (window.localStorage?.getItem("bp_skip_intro") === "1") return false;
    if ((window as unknown as { __BP_E2E__?: boolean }).__BP_E2E__ === true) return false;
    return true;
  } catch {
    return false;
  }
};


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

const aboutImages = [
  "/about/about-1.jpg",
  "/about/about-2.jpg",
  "/about/about-3.jpg",
  "/about/about-4.jpg",
  "/about/about-5.jpg",
  "/about/about-6.jpg",
];

const labImages = [
  "/blueprint-lab/lab-1.jpg",
  "/blueprint-lab/lab-2.jpg",
  "/blueprint-lab/lab-3.jpg",
  "/blueprint-lab/lab-4.jpg",
];

const hackbarImages = [
  "/hackbar-card/hackbar-1.jpg",
  "/hackbar-card/hackbar-2.jpg",
  "/hackbar-card/hackbar-3.jpg",
  "/hackbar-card/hackbar-4.jpg",
];

const Home = ({ showDock }: { showDock: boolean }) => {
  const navigate = useNavigate();
  const aboutRef = useRef<HTMLDivElement>(null);
  const [currentAboutImage, setCurrentAboutImage] = useState(0);
  const [currentLabImage, setCurrentLabImage] = useState(0);
  const [currentHackbarImage, setCurrentHackbarImage] = useState(0);

  // ── Loader (white/gray lab scan). Plays on every load of the Home route.
  //    The previous "first-visit-only" localStorage gate was removed per user request
  //    so the loader is always visible. E2E flags (?e2e=1, bp_skip_intro, __BP_E2E__)
  //    still bypass it via shouldShowHomeLoader.
  const [loaderActive, setLoaderActive] = useState<boolean>(() => shouldShowHomeLoader());
  const handleLoaderComplete = useCallback(() => {
    setLoaderActive(false);
  }, []);
  // Mount hero <video> only on viewports ≥768px to avoid downloading on mobile
  const [isDesktop, setIsDesktop] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.matchMedia("(min-width: 768px)").matches : false
  );
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Hero video readiness — crossfade poster→video once enough data is buffered.
  // Defensive: also check readyState on mount in case the video is already cached
  // and the `canplay` event already fired before the listener attached.
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const [desktopVideoReady, setDesktopVideoReady] = useState(false);
  const [mobileVideoReady, setMobileVideoReady] = useState(false);

  useEffect(() => {
    const v = desktopVideoRef.current;
    if (!v) return;
    const onReady = () => setDesktopVideoReady(true);
    v.addEventListener("canplay", onReady);
    if (v.readyState >= 3) setDesktopVideoReady(true);
    return () => v.removeEventListener("canplay", onReady);
  }, [isDesktop]);

  useEffect(() => {
    const v = mobileVideoRef.current;
    if (!v) return;
    const onReady = () => setMobileVideoReady(true);
    v.addEventListener("canplay", onReady);
    if (v.readyState >= 3) setMobileVideoReady(true);
    return () => v.removeEventListener("canplay", onReady);
  }, []);
  useEffect(() => {
    const id = setInterval(
      () => setCurrentAboutImage((p) => (p + 1) % aboutImages.length),
      4000
    );
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    const id = setInterval(
      () => setCurrentLabImage((p) => (p + 1) % labImages.length),
      4000
    );
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    const id = setInterval(
      () => setCurrentHackbarImage((p) => (p + 1) % hackbarImages.length),
      4000
    );
    return () => clearInterval(id);
  }, []);

  // First-visit loader: render full-screen and bail out of the rest of Home
  // until it completes. We deliberately don't mount Home content underneath
  // — it stays unmounted so heavy children (videos, WebGL bg) don't compete
  // for the main thread during the loader.
  if (loaderActive) {
    return <HomeLoader onComplete={handleLoaderComplete} />;
  }

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
          .about-section-new { padding: 48px 6% 24px !important; flex-direction: column !important; gap: 32px !important; align-items: flex-start !important; }
          .programs-section { padding: 24px 7% 56px !important; }
          .about-photo-col:not(.rotativo-container) { flex: none !important; width: 100% !important; max-width: 280px !important; margin: 0 auto !important; order: -1 !important; }
          .bento-grid-neo { grid-template-columns: repeat(2, 1fr) !important; grid-template-rows: repeat(3, 180px) !important; }
          .feature-title-centered {
            white-space: normal !important;
            font-size: clamp(12px, 4vw, 16px) !important;
            text-align: center !important;
            margin-bottom: 32px !important;
          }
          .radar-scale-wrapper {
            transform: scale(0.62);
            transform-origin: top center;
            margin-bottom: -120px;
          }
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
          .hero-fade-bottom { height: 100px !important; }
          /* About feature cards container mobile */
          .about-features-mobile {
            display: flex !important;
          }
        }

        /* ── HOME HERO FLOATING CARD ── */
        .home-hero-wrapper { width: 100%; padding: 0 16px; background: #0a0a0a; }
        .home-hero { border-radius: 24px; overflow: hidden; border: 0.5px solid rgba(255,255,255,0.15); position: relative; }
        .home-hero::after { content: ''; position: absolute; inset: 0; border-radius: 24px; pointer-events: none; box-shadow: 0 0 40px rgba(255,255,255,0.04) inset; z-index: 1; }
        .home-white-wrapper { width: 100%; padding: 0 16px; background: #0a0a0a; }
        @media (max-width: 1023px) and (min-width: 768px) {
          .home-hero-wrapper, .home-white-wrapper { padding: 0 12px; }
          .home-hero { border-radius: 20px; }
          .home-hero::after { border-radius: 20px; }
        }
        @media (max-width: 767px) {
          .home-hero-wrapper, .home-white-wrapper { padding: 0 8px; }
          .home-hero { border-radius: 16px; }
          .home-hero::after { border-radius: 16px; }
        }
      `}</style>

      {/* ── A: DOCK ── */}
      <div style={{
        position: "fixed", top: 24, left: "50%", transform: "translateX(-50%)", zIndex: 50,
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
      <div className="home-hero-wrapper">
      <div className="home-hero" style={{
        background: "#070612", minHeight: "100vh", position: "relative", overflow: "hidden",
        display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
      }}>
        {/* Desktop: poster image + video crossfade */}
        <div className="hidden md:block" style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <img
            src="/poster_image.jpg"
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            loading="eager"
            decoding="async"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center center",
              zIndex: 1,
              opacity: desktopVideoReady ? 0 : 1,
              transition: "opacity 0.8s ease-in-out",
            }}
          />
          {isDesktop && (
            <video
              ref={desktopVideoRef}
              src="/hero-bg.mp4"
              poster="/poster_image.jpg"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center center",
                opacity: desktopVideoReady ? 1 : 0,
                transition: "opacity 0.8s ease-in-out",
                zIndex: 2,
              }}
            />
          )}
        </div>

        {/* Mobile: poster image + lightweight video crossfade */}
        <div className="block md:hidden" style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <img
            src="/poster_image.jpg"
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            loading="eager"
            decoding="async"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center center",
              zIndex: 1,
              opacity: mobileVideoReady ? 0 : 1,
              transition: "opacity 0.8s ease-in-out",
            }}
          />
          <video
            ref={mobileVideoRef}
            src="/hero-bg-mobile.mp4"
            poster="/poster_image.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center center",
              opacity: mobileVideoReady ? 1 : 0,
              transition: "opacity 0.8s ease-in-out",
              zIndex: 2,
            }}
          />
        </div>

        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.65)",
          zIndex: 3,
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
            zIndex: 4,
            whiteSpace: "nowrap" as const,
            
            padding: "0 7%",
          }}
        >
          BLUEPRINT PROJECT
        </TextScramble>


        <div className="hero-fade-bottom" style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 140,
          background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 40%, #000000 100%)",
          zIndex: 3,
          pointerEvents: "none",
        }} />

        {/* Cinematic blur fade-out at hero bottom (subtle — Silk WebGL co-exists) */}
        <GradualBlur
          position="bottom"
          height="5rem"
          strength={1.5}
          divCount={4}
          opacity={0.85}
          curve="bezier"
          zIndex={4}
        />
      </div>
      </div>{/* END home-hero-wrapper */}

{/* ══════════════════════════════════════════════════════ */}
      {/* ── WHITE ZONE WRAPPER (card emergence over hero black) ── */}
      {/* ══════════════════════════════════════════════════════ */}
      <div className="home-white-wrapper">
      <div className="home-white-section" style={{
        position: "relative",
        borderTopLeftRadius: window.innerWidth < 768 ? 24 : 32,
        borderTopRightRadius: window.innerWidth < 768 ? 24 : 32,
        marginTop: window.innerWidth < 768 ? -24 : -32,
        zIndex: 2,
      }}>
      <div ref={aboutRef} style={{ position: "relative", zIndex: 1 }}>
        <div className="about-section-new about-grid-desktop" style={{
          padding: "64px 7%",
          position: "relative", zIndex: 1,
        }}>
          {/* Left — Title + Subtitle + Timeline */}
          <div style={{ display: "flex", flexDirection: "column" as const, minHeight: 0 }}>
            <motion.h2 {...scrollReveal} className="about-title-line" style={{
              fontFamily: "'Michroma', sans-serif",
              fontSize: "clamp(18px, 2.2vw, 28px)", color: "#000",
              textTransform: "uppercase", lineHeight: 1.12,
              marginBottom: window.innerWidth < 768 ? 32 : 48, marginTop: 0,
            }}>
              BUILT FOR HUMAN EVOLUTION
            </motion.h2>

            {/* Features (DESKTOP) — Apple-style frosted white cards */}
            <motion.div {...scrollStagger} className="about-features-desktop features-stack" style={{ position: "relative", flexGrow: 1, minHeight: 0 }}>
              {[
                {
                  title: "Elite Training System",
                  desc: "Strength, physique, mobility and real progression through structured coaching.",
                  rgba: "26,107,255",
                  icon: (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#1A6BFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {/* Dumbbell */}
                      <rect x="2" y="8" width="2.5" height="8" rx="0.6" />
                      <rect x="4.5" y="10" width="1.8" height="4" rx="0.4" />
                      <line x1="6.3" y1="12" x2="17.7" y2="12" />
                      <rect x="17.7" y="10" width="1.8" height="4" rx="0.4" />
                      <rect x="19.5" y="8" width="2.5" height="8" rx="0.6" />
                    </svg>
                  ),
                },
                {
                  title: "Nutrition Engineering",
                  desc: "Meals designed to fuel performance, recovery and body composition with real ingredients.",
                  rgba: "255,59,59",
                  icon: (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#FF3B3B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {/* Plate with fork & knife */}
                      <circle cx="12" cy="12" r="9" />
                      <circle cx="12" cy="12" r="6" />
                      <line x1="8" y1="3" x2="8" y2="7" />
                      <line x1="10" y1="3" x2="10" y2="7" />
                      <line x1="9" y1="7" x2="9" y2="11" />
                      <line x1="15" y1="3" x2="15" y2="11" />
                    </svg>
                  ),
                },
                {
                  title: "Recovery Reset",
                  desc: "Sauna, cold therapy and mobility systems to restore at a higher level.",
                  rgba: "34,197,94",
                  icon: (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  ),
                },
                {
                  title: "Mindset Upgrade",
                  desc: "Discipline, confidence and focus built through education, pressure and consistency.",
                  rgba: "156,163,175",
                  icon: (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {/* Brain */}
                      <path d="M9.5 4a3 3 0 0 0-3 3v0a2.5 2.5 0 0 0-1.5 4.5A2.5 2.5 0 0 0 6.5 16 3 3 0 0 0 9.5 19a2.5 2.5 0 0 0 2.5-2.5V5.5A1.5 1.5 0 0 0 10.5 4Z" />
                      <path d="M14.5 4a3 3 0 0 1 3 3v0a2.5 2.5 0 0 1 1.5 4.5A2.5 2.5 0 0 1 17.5 16a3 3 0 0 1-3 3 2.5 2.5 0 0 1-2.5-2.5V5.5A1.5 1.5 0 0 1 13.5 4Z" />
                      <path d="M9 9h2" />
                      <path d="M9 13h2" />
                      <path d="M13 9h2" />
                      <path d="M13 13h2" />
                    </svg>
                  ),
                },
              ].map((step) => (
                <FeatureCard
                  key={step.title}
                  variant="desktop"
                  icon={step.icon}
                  title={step.title}
                  description={step.desc}
                  rgba={step.rgba}
                />
              ))}
            </motion.div>

            {/* Mobile features — Apple-style frosted white cards */}
            <motion.div {...scrollStagger} className="about-features-mobile" style={{ display: "none", flexDirection: "column", padding: "0 16px", gap: 14 }}>
              {[
                {
                  title: "ELITE TRAINING SYSTEM",
                  desc: "Strength, physique, mobility and real progression through structured coaching.",
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A6BFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {/* Dumbbell */}
                      <rect x="2" y="8" width="2.5" height="8" rx="0.6" />
                      <rect x="4.5" y="10" width="1.8" height="4" rx="0.4" />
                      <line x1="6.3" y1="12" x2="17.7" y2="12" />
                      <rect x="17.7" y="10" width="1.8" height="4" rx="0.4" />
                      <rect x="19.5" y="8" width="2.5" height="8" rx="0.6" />
                    </svg>
                  ),
                },
                {
                  title: "NUTRITION ENGINEERING",
                  desc: "Meals designed to fuel performance, recovery and body composition with real ingredients.",
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF3B3B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {/* Plate with fork & knife */}
                      <circle cx="12" cy="12" r="9" />
                      <circle cx="12" cy="12" r="6" />
                      <line x1="8" y1="3" x2="8" y2="7" />
                      <line x1="10" y1="3" x2="10" y2="7" />
                      <line x1="9" y1="7" x2="9" y2="11" />
                      <line x1="15" y1="3" x2="15" y2="11" />
                    </svg>
                  ),
                },
                {
                  title: "RECOVERY RESET",
                  desc: "Sauna, cold therapy and mobility systems to restore at a higher level.",
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  ),
                },
                {
                  title: "MINDSET UPGRADE",
                  desc: "Discipline, confidence and focus built through education, pressure and consistency.",
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {/* Brain */}
                      <path d="M9.5 4a3 3 0 0 0-3 3v0a2.5 2.5 0 0 0-1.5 4.5A2.5 2.5 0 0 0 6.5 16 3 3 0 0 0 9.5 19a2.5 2.5 0 0 0 2.5-2.5V5.5A1.5 1.5 0 0 0 10.5 4Z" />
                      <path d="M14.5 4a3 3 0 0 1 3 3v0a2.5 2.5 0 0 1 1.5 4.5A2.5 2.5 0 0 1 17.5 16a3 3 0 0 1-3 3 2.5 2.5 0 0 1-2.5-2.5V5.5A1.5 1.5 0 0 1 13.5 4Z" />
                      <path d="M9 9h2" />
                      <path d="M9 13h2" />
                      <path d="M13 9h2" />
                      <path d="M13 13h2" />
                    </svg>
                  ),
                },
              ].map((c) => (
                <FeatureCard
                  key={c.title}
                  variant="mobile"
                  icon={c.icon}
                  title={c.title}
                  description={c.desc}
                />
              ))}
            </motion.div>

            {/* ── ABOUT MOBILE EDGE-TO-EDGE IMAGE — REMOVED (replaced by RotativoAssets below) ── */}
          </div>

          {/* Right — Rotating Image Slideshow */}
          <div className="about-photo-col rotativo-container" style={{
            borderRadius: 16, overflow: "hidden",
            position: "relative",
          }}>
            {aboutImages.map((src, index) => (
              <img
                key={src}
                src={src}
                alt={`Blueprint gym ${index + 1}`}
                loading="lazy"
                decoding="async"
                style={{
                  position: "absolute", top: 0, left: 0,
                  width: "100%", height: "100%",
                  objectFit: "cover", objectPosition: "center",
                  transition: "opacity 1s ease-in-out",
                  opacity: index === currentAboutImage ? 1 : 0,
                }}
              />
            ))}
          </div>
        </div>
      </div>


      {/* ── PROGRAMS SECTION (WHITE) — lazy-mounted: defers 3 pillar cards (image rotators + autoplay video) until user scrolls near ── */}
      <LazyMount rootMargin="400px" placeholderHeight="640px">
      <div className="programs-section" style={{ padding: "56px 7%", position: "relative", zIndex: 1 }}>
        <motion.h2 {...scrollReveal} style={{
          fontFamily: "'Michroma', sans-serif",
          fontSize: "clamp(20px, 2.5vw, 32px)", color: "#000",
          textTransform: "uppercase", textAlign: "center", marginBottom: 40,
        }}>
          CHOOSE YOUR FINGERPRINT
        </motion.h2>

        <motion.div {...scrollStagger} className="programs-grid" style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16,
        }}>
          {[
            { name: "Blueprint Lab", color: "#1A6BFF", rgba: "26,107,255", img: slider1, route: "/huella-azul", desc: "Precision training methodology. Data-driven programming built to forge strength." },
            { name: "Hack Bar", color: "#FF3B3B", rgba: "255,59,59", img: slider2, route: "/huella-roja", desc: "Nutrition engineered for performance. Every meal is a signal to your body." },
            { name: "Reset", color: "#22C55E", rgba: "34,197,94", img: slider3, video: "/videos/reset-card.mp4", route: "/huella-verde", desc: "Strategic recovery. Optimized sleep, restoration, and rebuilding protocols." },
          ].map((item) => (
            <motion.div
              variants={blurRevealItem}
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
              ) : item.name === "Blueprint Lab" ? (
                labImages.map((src, index) => (
                  <img
                    key={src}
                    className="pillar-card-img"
                    src={src}
                    alt={`Blueprint Lab ${index + 1}`}
                    loading="lazy"
                    decoding="async"
                    style={{
                      position: "absolute", top: 0, left: 0,
                      width: "100%", height: "100%",
                      objectFit: "cover", objectPosition: "center",
                      transition: "opacity 1s ease-in-out",
                      opacity: index === currentLabImage ? 1 : 0,
                    }}
                  />
                ))
              ) : item.name === "Hack Bar" ? (
                hackbarImages.map((src, index) => (
                  <img
                    key={src}
                    className="pillar-card-img"
                    src={src}
                    alt={`Hack Bar ${index + 1}`}
                    loading="lazy"
                    decoding="async"
                    style={{
                      position: "absolute", top: 0, left: 0,
                      width: "100%", height: "100%",
                      objectFit: "cover", objectPosition: "center",
                      transition: "opacity 1s ease-in-out",
                      opacity: index === currentHackbarImage ? 1 : 0,
                    }}
                  />
                ))
              ) : (
                <img className="pillar-card-img" src={item.img} alt={item.name} loading="lazy" decoding="async" style={{
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
            </motion.div>
          ))}
        </motion.div>
      </div>
      </LazyMount>

      {/* ── Divider ── */}
      <SectionDivider />



      </div>{/* END WHITE ZONE WRAPPER */}
      </div>{/* END home-white-wrapper */}

      {/* ── FOOTER (DARK with hands background) — lazy-mounted: defers ~1MB bg image + dock subtree until user scrolls near bottom ── */}
      <LazyMount rootMargin="500px" placeholderHeight="560px">
      <div className="footer-bg-wrapper" style={{
        position: "relative" as const,
        backgroundImage: "url('/footer-bg.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",
        minHeight: 560,
        padding: "96px 7% 48px",
        display: "flex",
        flexDirection: "column" as const,
        justifyContent: "center" as const,
        alignItems: "center" as const,
        textAlign: "center" as const,
      }}>
        <style>{`
          @media (max-width: 767px) {
            .footer-bg-wrapper { min-height: 480px !important; padding: 72px 6% 32px !important; }
            .footer-bg-overlay { background: rgba(0, 0, 0, 0.65) !important; }
          }
        `}</style>
        <div className="footer-bg-overlay" style={{
          position: "absolute" as const,
          inset: 0,
          background: "rgba(0, 0, 0, 0.55)",
          pointerEvents: "none" as const,
          zIndex: 1,
        }} />
        <div style={{ position: "relative", zIndex: 2, width: "100%", display: "flex", flexDirection: "column" as const, alignItems: "center" as const, gap: 0 }}>
        {/* Blue accent line */}
        <div style={{
          width: 40,
          height: 1,
          background: "#1A6BFF",
          margin: "0 auto 32px",
        }} />

        {/* Title */}
        <motion.h2 {...scrollReveal} style={{
          fontFamily: "'Michroma', sans-serif",
          fontSize: "clamp(24px, 4vw, 36px)",
          color: "#FFFFFF",
          textTransform: "uppercase" as const,
          letterSpacing: "0.04em",
          marginBottom: 10,
          marginTop: 0,
          textShadow: "0 2px 16px rgba(0, 0, 0, 0.85)",
        }}>
          Enter the Blueprint
        </motion.h2>

        {/* Subtitle */}
        <motion.p {...scrollReveal} style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 13,
          fontWeight: 300,
          color: "rgba(255,255,255,0.75)",
          marginBottom: 32,
          textShadow: "0 1px 8px rgba(0, 0, 0, 0.75)",
        }}>
          Your evolution begins with a single step.
        </motion.p>

        {/* Buttons */}
        <motion.div {...scrollStagger} style={{
          display: "flex",
          justifyContent: "center",
          gap: 14,
          marginBottom: 48,
          ...(window.innerWidth < 768 ? { flexDirection: "column" as const, gap: 10, alignItems: "stretch" as const } : {}),
        }}>
          <motion.a
            variants={blurRevealItem}
            href="https://wa.me/19392735708?text=Hola%20Blueprint!%20Vi%20su%20p%C3%A1gina%20web%20y%20estoy%20interesado%20en%20conocer%20m%C3%A1s%20sobre%20los%20planes%20y%20la%20membres%C3%ADa.%20%C2%BFMe%20pueden%20dar%20m%C3%A1s%20informaci%C3%B3n%3F"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contactar a Blueprint por WhatsApp"
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
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center" as const,
              justifyContent: "center" as const,
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
          </motion.a>

          <motion.a
            variants={blurRevealItem}
            href="https://instagram.com/proyectoblueprint"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Síguenos en Instagram @proyectoblueprint"
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
              boxShadow: "0 0 15px rgba(255,59,59,0.5), 0 0 30px rgba(255,59,59,0.3), 0 0 60px rgba(255,59,59,0.15)",
              display: "inline-flex",
              alignItems: "center" as const,
              justifyContent: "center" as const,
              gap: 8,
              textDecoration: "none",
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
          </motion.a>
        </motion.div>

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
            color: "rgba(255,255,255,0.55)",
            letterSpacing: "0.2em",
            textShadow: "0 1px 4px rgba(0, 0, 0, 0.7)",
          }}>
            BLUEPRINT PROJECT
          </span>
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 8,
            color: "rgba(255,255,255,0.4)",
            textShadow: "0 1px 4px rgba(0, 0, 0, 0.7)",
          }}>
            © 2025 Blueprint Project
          </span>
        </div>
        </div>{/* end z-index wrapper */}
      </div>
      </LazyMount>
    </motion.div>
  );
};

export default Home;
