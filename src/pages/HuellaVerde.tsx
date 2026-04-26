import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { scrollReveal, scrollStagger, blurRevealItem } from "@/lib/scrollAnimations";
import BiometricScanGreen from "@/components/BiometricScanGreen";
import { TextScramble } from "@/components/ui/text-scramble";
import BackToHomeButton from "@/components/BackToHomeButton";
import GradualBlur from "@/components/GradualBlur";
import { useLowPerfBackground } from "@/hooks/use-low-perf-background";
import heroResetDesktop from "@/assets/reset-hero-desktop.jpg?preset=responsive";
import heroResetMobile from "@/assets/reset-hero-mobile.jpg";
import infraredSaunaImg from "@/assets/infrared-sauna-green.png?preset=responsive";
import PremiumServiceAccordion from "@/components/PremiumServiceAccordion";
import HuellaVerdeHUDFooter from "@/components/HuellaVerdeHUDFooter";

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

/* ── Dock (top of page) ── */
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
        top: 24,
        left: "50%",
        transform: `translateX(-50%) translateY(${show ? 0 : -80}px)`,
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

/* ── Data (English) ── */
const RECOVERY_CARDS: Array<{ name: string; img: string; srcSet?: string; sizes?: string }> = [
  {
    name: "INFRARED SAUNA",
    img: infraredSaunaImg.img.src,
    // Picks WebP variants (universal modern support); the existing <img srcSet>
    // attribute below already accepts a comma-separated descriptor list.
    srcSet: infraredSaunaImg.sources.webp ?? infraredSaunaImg.sources.avif,
    sizes: "(max-width: 768px) 50vw, (max-width: 1280px) 40vw, 550px",
  },
  { name: "ICE BATH THERAPY", img: "https://images.unsplash.com/photo-1682687220795-796d3f6f7000?w=800&auto=format&fit=crop" },
  { name: "MOBILITY & BREATHING", img: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&auto=format&fit=crop" },
  { name: "MASSAGES & BODYWORK", img: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&auto=format&fit=crop" },
];
const SERVICIOS = [
  { num: "01", name: "PERSONALIZED RECOVERY PROTOCOLS", desc: "Designed by our expert team based on your goals: athletic performance, cellular longevity, deep relaxation or superior mental focus." },
  { num: "02", name: "RESET PASS", desc: "Unlimited access to all Wellness Days, special discounts on professional massages and exclusive HackBar products." },
  { num: "03", name: "CORPORATE RECOVERY PROGRAMS", desc: "Corporate packages designed to improve physical and mental health and the performance of your team. Invest in your team, invest in results." },
  { num: "04", name: "RESET RETREATS", desc: "Coming soon: 72-hour immersive experiences with guided detox, therapeutic fasting, extended sauna, deep meditation and full reconnection with nature." },
];

const scanDelays = [0, 1, 2, 0.5, 1.5];

/* ── Component ── */
const HuellaVerde = ({ showDock = true }: HuellaVerdeProps) => {
  const [scanDone, setScanDone] = useState(false);
  const handleScanDone = useCallback(() => setScanDone(true), []);
  useLowPerfBackground(".verde-animated-bg");

  if (!scanDone) return <BiometricScanGreen onComplete={handleScanDone} />;

  return (
    <>
      <Helmet>
        <title>Reset — Recovery Protocols | Blueprint Project</title>
        <meta
          name="description"
          content="Reset: sauna, cold therapy and mobility systems to restore at a higher level. Recovery protocols at Blueprint Project, Santurce PR."
        />
        <meta property="og:title" content="Reset — Recovery Protocols" />
        <meta
          property="og:description"
          content="Sauna, cold therapy and mobility systems to restore at a higher level."
        />
        <link rel="canonical" href="https://blueprintproject.com/huella-verde" />
      </Helmet>
      <div className="verde-animated-bg" aria-hidden="true" />
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
          .recovery-grid { gap: 12px !important; }
          .hv-servicios { padding: 0 6% 48px !important; }
          .hv-servicio-line { width: 100% !important; }
          .hv-footer { padding: 32px 6% !important; }
          .hv-hero-img { object-position: 50% 35% !important; }
        }
        @media (min-width: 768px) {
          .hv-hero-img { object-position: 50% 45% !important; }
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{ backgroundColor: "transparent", minHeight: "100vh", overflowX: "hidden", fontFamily: "'Space Grotesk', sans-serif", position: "relative", zIndex: 1, color: "#FFFFFF" }}
      >
        <Dock show={showDock} />

        {/* ── HERO ── */}
        <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", background: "transparent" }}>
          {/* Background image (responsive: mobile < 768px → tiny JPG, desktop ≥ 768px → AVIF/WebP/JPG pipeline) */}
          <picture style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
            <source media="(max-width: 767px)" srcSet={heroResetMobile} />
            {heroResetDesktop.sources.avif && (
              <source
                type="image/avif"
                srcSet={heroResetDesktop.sources.avif}
                sizes="(max-width: 1280px) 1280px, 1920px"
              />
            )}
            {heroResetDesktop.sources.webp && (
              <source
                type="image/webp"
                srcSet={heroResetDesktop.sources.webp}
                sizes="(max-width: 1280px) 1280px, 1920px"
              />
            )}
            <img
              src={heroResetDesktop.img.src}
              width={heroResetDesktop.img.w}
              height={heroResetDesktop.img.h}
              alt=""
              aria-hidden="true"
              loading="eager"
              decoding="async"
              className="hv-hero-img"
              {...({ fetchpriority: "high" } as Record<string, string>)}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", opacity: 0.85, zIndex: 0, pointerEvents: "none" }}
            />
          </picture>
          {/* Black radial fade overlay for title legibility */}
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0.15) 80%, transparent 100%)", zIndex: 1, pointerEvents: "none" }} />
          {/* Ambient glow */}
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 30%, rgba(34,197,94,0.06) 0%, transparent 60%)", pointerEvents: "none", zIndex: 1 }} />

          {/* Title */}
          <div className="hv-hero-text" style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 16, padding: "80px 7%", zIndex: 2 }}>
            <TextScramble
              className="hv-hero-title"
              style={{ fontFamily: "'Michroma', sans-serif", fontSize: "clamp(56px, 12vw, 120px)", color: "#FFFFFF", textTransform: "uppercase", letterSpacing: "0.02em", lineHeight: 1.08, textShadow: "0 0 40px rgba(34,197,94,0.3)" }}
            >
              RESET
            </TextScramble>
          </div>

          {/* Green accent line */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "linear-gradient(to right, transparent, rgba(34,197,94,0.3), transparent)", zIndex: 2 }} />

          {/* Cinematic blur fade-out at hero bottom */}
          <GradualBlur position="bottom" height="6rem" strength={2} divCount={5} opacity={0.9} curve="bezier" zIndex={3} />
        </section>

        {/* ── RECOVERY ROOM ── */}
        <motion.section
          {...scrollReveal}
          style={{ background: "transparent", padding: "72px 7%", position: "relative", zIndex: 1 }}
        >
          <motion.h2 {...scrollReveal} style={{ fontFamily: "'Michroma', sans-serif", fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 400, color: "#FFFFFF", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 12px 0", textAlign: "center" }}>
            RECOVERY ROOM
          </motion.h2>
          <motion.p {...scrollReveal} style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.45)", textAlign: "center", margin: "0 auto 40px", maxWidth: 600 }}>
            Your Reset zone. Available exclusively for Blueprint Lab members.
          </motion.p>

          {/* Grid 2x2 */}
          <motion.div {...scrollStagger} className="recovery-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, maxWidth: 1100, margin: "0 auto" }}>
            {RECOVERY_CARDS.map((card, i) => (
              <motion.div
                variants={blurRevealItem}
                key={card.name}
                className="recovery-card"
                style={{ position: "relative", aspectRatio: "1 / 1", borderRadius: 16, overflow: "hidden", cursor: "pointer", transition: "transform 0.4s ease, box-shadow 0.4s ease" }}
              >
                <img
                  src={card.img}
                  srcSet={(card as { srcSet?: string }).srcSet}
                  sizes={(card as { sizes?: string }).sizes}
                  alt={card.name}
                  loading="lazy"
                  decoding="async"
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease" }}
                />
                {/* Gradient overlay: transparent top → dark bottom */}
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.85) 100%)", zIndex: 1 }} />
                {/* Green accent glow bottom-left */}
                <div style={{ position: "absolute", bottom: -40, left: -40, width: 160, height: 160, background: "radial-gradient(circle, rgba(34,197,94,0.25) 0%, transparent 70%)", zIndex: 1, pointerEvents: "none" }} />
                {/* Scan line */}
                <div style={{ position: "absolute", left: 0, right: 0, height: 1, background: "linear-gradient(to right, transparent, rgba(34,197,94,0.4), transparent)", animation: `hvScanLine 5s ease-in-out ${scanDelays[i]}s infinite`, zIndex: 2, pointerEvents: "none" }} />
                {/* Title */}
                <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "20px 18px", zIndex: 2 }}>
                  <h3 style={{ fontFamily: "'Michroma', sans-serif", fontSize: "clamp(13px, 2.2vw, 18px)", color: "#fff", textTransform: "uppercase", letterSpacing: "0.04em", lineHeight: 1.2, margin: 0, textShadow: "0 2px 12px rgba(0,0,0,0.8)" }}>
                    {card.name}
                  </h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* ── PREMIUM SERVICES ── */}
        <motion.section
          {...scrollReveal}
          className="hv-servicios"
          style={{ background: "transparent", padding: "0 7% 72px", position: "relative", zIndex: 1 }}
        >
          <motion.h2 {...scrollReveal} style={{ fontFamily: "'Michroma', sans-serif", fontSize: "clamp(16px, 2vw, 24px)", color: "#FFFFFF", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 8, textAlign: "center" }}>
            PREMIUM SERVICES
          </motion.h2>
          <motion.p {...scrollReveal} style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.35)", margin: "0 auto 32px", textAlign: "center", maxWidth: 540 }}>
            Advanced protocols for members committed to their evolution.
          </motion.p>

          <motion.div {...scrollReveal}>
            <PremiumServiceAccordion />
          </motion.div>
        </motion.section>

        {/* ── HUD LAB FOOTER ── */}
        <HuellaVerdeHUDFooter />
        <BackToHomeButton />
      </motion.div>
    </>
  );
};

export default HuellaVerde;
