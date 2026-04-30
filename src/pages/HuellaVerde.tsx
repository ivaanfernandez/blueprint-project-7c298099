import { useState, useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";
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
    sizes: "(max-width: 768px) 100vw, (max-width: 1280px) 40vw, 460px",
  },
  { name: "ICE BATH THERAPY", img: "https://images.unsplash.com/photo-1682687220795-796d3f6f7000?w=800&auto=format&fit=crop" },
  { name: "MOBILITY & BREATHING", img: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&auto=format&fit=crop" },
  { name: "ADJUSTMENTS & MUSCLE REHAB", img: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&auto=format&fit=crop" },
  { name: "HYPERBARIC CHAMBER", img: "/hyperbaric-chamber.jpg" },
  { name: "COMPRESSION BOOTS", img: "/compression-boots.jpg" },
];
const SERVICIOS = [
  { num: "01", name: "PERSONALIZED RECOVERY PROTOCOLS", desc: "Designed by our expert team based on your goals: athletic performance, cellular longevity, deep relaxation or superior mental focus." },
  { num: "02", name: "RESET PASS", desc: "Unlimited access to all Wellness Days, special discounts on professional massages and exclusive HackBar products." },
  { num: "03", name: "RECOVERY PROGRAMS", desc: "Structured recovery protocols built to optimize how the body restores, adapts, and performs. Each program combines targeted modalities to deliver measurable results in performance, energy, and overall wellbeing." },
  { num: "04", name: "RESET RETREATS", desc: "Coming soon: 72-hour immersive experiences with guided detox, therapeutic fasting, extended sauna, deep meditation and full reconnection with nature." },
];

const scanDelays = [0, 1, 2, 0.5, 1.5, 2.5];

/* ── Component ── */
const HuellaVerde = ({ showDock = true }: HuellaVerdeProps) => {
  const [scanDone, setScanDone] = useState(false);
  const handleScanDone = useCallback(() => setScanDone(true), []);
  useLowPerfBackground(".verde-animated-bg");

  // Re-trigger del sweep "POPULAR" cada vez que la card MEDIUM entra al viewport.
  const mediumCardRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!scanDone) return;
    const node = mediumCardRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Reinicia las animaciones forzando reflow al togglear la clase.
          node.classList.remove("is-visible");
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          node.offsetWidth;
          node.classList.add("is-visible");
        } else {
          node.classList.remove("is-visible");
        }
      },
      { threshold: 0.35 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [scanDone]);

  if (!scanDone) return <BiometricScanGreen onComplete={handleScanDone} />;

  return (
    <>
      <SEO
        title="Reset — Recovery Protocols | Blueprint Project"
        description="Reset: sauna, cold therapy and mobility systems to restore at a higher level. Recovery protocols at Blueprint Project, Santurce PR."
        canonical="https://blueprintproject.com/huella-verde"
      />
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

        /* ── RECOVERY ARSENAL GRID (6 servicios) ── */
        .recovery-arsenal-grid {
          display: grid;
          gap: 12px;
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 6%;
        }
        .recovery-tile {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid rgba(34, 197, 94, 0.4);
          box-shadow: 0 0 20px rgba(34, 197, 94, 0.1);
          aspect-ratio: 4 / 3;
          cursor: pointer;
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 0.4s ease,
                      border-color 0.4s ease;
        }
        .recovery-tile img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .recovery-tile::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.85) 0%,
            rgba(0, 0, 0, 0.3) 50%,
            transparent 100%
          );
          pointer-events: none;
          z-index: 1;
        }
        .recovery-tile-label {
          position: absolute;
          bottom: 16px;
          left: 18px;
          right: 18px;
          font-family: "Michroma", sans-serif;
          font-size: 14px;
          font-weight: 400;
          color: #ffffff;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          line-height: 1.2;
          z-index: 2;
          margin: 0;
          text-shadow: 0 1px 4px rgba(0, 0, 0, 0.9);
        }
        @media (min-width: 768px) {
          .recovery-tile:hover {
            transform: translateY(-4px);
            border-color: rgba(34, 197, 94, 0.7);
            box-shadow: 0 8px 32px rgba(34, 197, 94, 0.2);
          }
          .recovery-tile:hover img {
            transform: scale(1.05);
          }
        }
        @media (min-width: 1024px) {
          .recovery-arsenal-grid {
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-rows: 1fr 1fr;
            gap: 16px;
          }
          .recovery-tile-hero {
            grid-column: auto;
            grid-row: auto;
          }
          .recovery-tile {
            aspect-ratio: 4 / 3;
          }
          .recovery-tile-label {
            font-size: 16px;
            bottom: 20px;
            left: 24px;
            right: 24px;
          }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .recovery-arsenal-grid {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 1fr 1fr 1fr;
            gap: 12px;
          }
          .recovery-tile {
            aspect-ratio: 4 / 3;
          }
        }
        @media (max-width: 767px) {
          .recovery-arsenal-grid {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 200px 1fr 1fr 1fr;
            gap: 10px;
            padding: 0 4%;
          }
          .recovery-tile-hero {
            grid-column: 1 / -1;
            grid-row: 1;
            aspect-ratio: auto;
            height: 200px;
          }
          .recovery-tile:not(.recovery-tile-hero) {
            aspect-ratio: 1 / 1;
          }
          .recovery-tile-label {
            font-size: 11px;
            bottom: 10px;
            left: 12px;
            right: 12px;
            letter-spacing: 0.04em;
          }
          .recovery-tile-hero .recovery-tile-label {
            font-size: 16px;
            bottom: 14px;
            left: 16px;
            right: 16px;
            letter-spacing: 0.05em;
          }
        }

        /* ── RESET HERO FLOATING CARD ── */
        .reset-hero-wrapper {
          width: 100%;
          padding: 0 16px;
          background: #050a05;
        }
        .reset-hero {
          border-radius: 24px;
          overflow: hidden;
          border: 0.5px solid rgba(74, 222, 128, 0.3);
          position: relative;
        }
        .reset-hero::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 24px;
          pointer-events: none;
          box-shadow: 0 0 40px rgba(74, 222, 128, 0.08) inset;
          z-index: 1;
        }
        @media (max-width: 1023px) and (min-width: 768px) {
          .reset-hero-wrapper { padding: 0 12px; }
          .reset-hero { border-radius: 20px; }
        }
        @media (max-width: 767px) {
          .reset-hero-wrapper { padding: 0 8px; }
          .reset-hero { border-radius: 16px; }
        }

        /* ═══ MEMBERSHIP TIERS ═══ */
        .reset-membership-section {
          width: 100%;
          background: #050a05;
          padding: 100px 6%;
          position: relative;
        }
        .reset-membership-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 30%, rgba(34,197,94,0.06), transparent 70%);
          pointer-events: none;
        }
        .reset-membership-header {
          max-width: 720px;
          margin: 0 auto 60px auto;
          text-align: center;
          position: relative;
          z-index: 1;
        }
        .reset-membership-eyebrow {
          font-family: 'Orbitron', monospace;
          font-size: 11px;
          letter-spacing: 0.3em;
          color: #4ade80;
          text-shadow: 0 0 12px rgba(74, 222, 128, 0.4);
          margin: 0 0 20px 0;
          font-weight: 500;
        }
        .reset-membership-title {
          font-family: 'Michroma', sans-serif;
          font-size: 48px;
          letter-spacing: -0.01em;
          color: #ffffff;
          line-height: 1.1;
          margin: 0 0 16px 0;
          font-weight: 400;
        }
        .reset-membership-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: 16px;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.5;
          margin: 0;
          font-weight: 400;
        }
        .reset-membership-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 24px;
          max-width: 1280px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
          align-items: stretch;
        }
        .reset-tier-card {
          position: relative;
          border-radius: 16px;
          padding: 36px 28px 32px 28px;
          display: flex;
          flex-direction: column;
          gap: 24px;
          overflow: hidden;
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 0.4s ease,
                      border-color 0.4s ease;
          cursor: default;
        }
        .reset-tier-corner-bracket {
          position: absolute;
          width: 16px;
          height: 16px;
          pointer-events: none;
          z-index: 2;
        }
        .reset-tier-corner-tl { top: 12px; left: 12px; border-top: 1px solid currentColor; border-left: 1px solid currentColor; }
        .reset-tier-corner-tr { top: 12px; right: 12px; border-top: 1px solid currentColor; border-right: 1px solid currentColor; }
        .reset-tier-corner-bl { bottom: 12px; left: 12px; border-bottom: 1px solid currentColor; border-left: 1px solid currentColor; }
        .reset-tier-corner-br { bottom: 12px; right: 12px; border-bottom: 1px solid currentColor; border-right: 1px solid currentColor; }
        .reset-tier-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding-bottom: 24px;
          border-bottom: 0.5px solid rgba(255, 255, 255, 0.1);
          position: relative;
          z-index: 1;
        }
        .reset-tier-name-block { display: flex; flex-direction: column; gap: 4px; }
        .reset-tier-num {
          font-family: 'Orbitron', monospace;
          font-size: 11px;
          letter-spacing: 0.2em;
          opacity: 0.5;
          font-weight: 500;
        }
        .reset-tier-name {
          font-family: 'Michroma', sans-serif;
          font-size: 18px;
          letter-spacing: 0.1em;
          margin: 0;
          font-weight: 400;
          line-height: 1;
        }
        .reset-tier-price-block { text-align: right; }
        .reset-tier-price {
          font-family: 'Orbitron', monospace;
          font-size: 36px;
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.01em;
        }
        .reset-tier-price-suffix {
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          letter-spacing: 0.15em;
          margin-top: 6px;
          opacity: 0.5;
          font-weight: 400;
        }
        .reset-tier-bullets {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 14px;
          flex: 1;
          position: relative;
          z-index: 1;
        }
        .reset-tier-bullet {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 12px;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          line-height: 1.4;
          position: relative;
          padding-left: 18px;
        }
        .reset-tier-bullet::before {
          content: '◆';
          position: absolute;
          left: 0;
          top: 4px;
          font-size: 8px;
          opacity: 0.7;
        }
        .reset-tier-bullet-text { color: rgba(255, 255, 255, 0.9); font-weight: 400; }
        .reset-tier-bullet-price {
          color: rgba(255, 255, 255, 0.4);
          font-family: 'Orbitron', monospace;
          font-size: 12px;
          letter-spacing: 0.05em;
          flex-shrink: 0;
        }
        .reset-tier-bonus {
          display: flex;
          align-items: center;
          gap: 8px;
          padding-top: 20px;
          border-top: 0.5px dashed rgba(255, 255, 255, 0.15);
          font-family: 'Orbitron', monospace;
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          position: relative;
          z-index: 1;
        }
        .reset-tier-bonus-icon { font-size: 14px; font-weight: 700; }
        .reset-tier-bonus-text { font-weight: 500; }
        .reset-tier-badge {
          position: absolute;
          top: 0;
          right: 24px;
          background: #4ade80;
          color: #052e16;
          font-family: 'Orbitron', monospace;
          font-size: 10px;
          font-weight: 700;
          padding: 6px 14px;
          border-radius: 0 0 8px 8px;
          letter-spacing: 0.15em;
          z-index: 3;
          box-shadow: 0 4px 12px rgba(74, 222, 128, 0.3);
        }
        .reset-tier-starter {
          background: linear-gradient(180deg, rgba(50, 55, 55, 0.5) 0%, rgba(20, 22, 22, 0.85) 100%);
          border: 0.5px solid rgba(255, 255, 255, 0.12);
          color: rgba(200, 200, 200, 0.9);
        }
        .reset-tier-starter .reset-tier-num,
        .reset-tier-starter .reset-tier-name,
        .reset-tier-starter .reset-tier-corner-bracket { color: rgba(200, 200, 200, 0.7); }
        .reset-tier-starter .reset-tier-price { color: #e5e7eb; }
        .reset-tier-starter .reset-tier-bullet::before { color: rgba(200, 200, 200, 0.5); }
        .reset-tier-starter .reset-tier-bonus { color: rgba(200, 200, 200, 0.7); }
        .reset-tier-starter:hover {
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-4px);
        }
        .reset-tier-medium {
          background: linear-gradient(180deg, rgba(15, 80, 40, 0.85) 0%, rgba(8, 30, 20, 0.95) 100%);
          border: 1px solid #4ade80;
          box-shadow: 0 0 24px rgba(74, 222, 128, 0.3),
                      inset 0 0 40px rgba(74, 222, 128, 0.05);
          transform: scale(1.03);
          color: #4ade80;
        }
        .reset-tier-medium .reset-tier-num,
        .reset-tier-medium .reset-tier-name,
        .reset-tier-medium .reset-tier-corner-bracket { color: #4ade80; }
        .reset-tier-medium .reset-tier-price {
          color: #4ade80;
          text-shadow: 0 0 16px rgba(74, 222, 128, 0.6);
        }
        .reset-tier-medium .reset-tier-bullet::before { color: #4ade80; }
        .reset-tier-medium .reset-tier-bonus {
          color: rgba(74, 222, 128, 0.85);
          border-color: rgba(74, 222, 128, 0.2);
        }
        .reset-tier-medium:hover {
          transform: scale(1.05);
          box-shadow: 0 0 32px rgba(74, 222, 128, 0.4),
                      inset 0 0 50px rgba(74, 222, 128, 0.08);
        }
        .reset-tier-medium::before {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: 16px;
          background: linear-gradient(135deg, transparent 30%, rgba(74, 222, 128, 0.15) 50%, transparent 70%);
          background-size: 300% 300%;
          animation: medium-shimmer 6s ease-in-out infinite;
          pointer-events: none;
          z-index: 0;
        }
        @keyframes medium-shimmer {
          0%, 100% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
        }
        /* Sweep diagonal re-disparable al entrar al viewport */
        .reset-tier-medium::after {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: 16px;
          background: linear-gradient(115deg,
            transparent 30%,
            rgba(74, 222, 128, 0.0) 42%,
            rgba(134, 239, 172, 0.55) 50%,
            rgba(74, 222, 128, 0.0) 58%,
            transparent 70%);
          background-size: 250% 250%;
          background-position: 150% 150%;
          mix-blend-mode: screen;
          pointer-events: none;
          z-index: 1;
          opacity: 0;
        }
        .reset-tier-medium.is-visible::after {
          animation: medium-sweep 1.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes medium-sweep {
          0%   { background-position: 150% 150%; opacity: 0; }
          15%  { opacity: 1; }
          85%  { opacity: 1; }
          100% { background-position: -50% -50%; opacity: 0; }
        }
        /* Pulse de borde sincronizado con el sweep */
        .reset-tier-medium.is-visible {
          animation: medium-border-pulse 1.6s ease-out;
        }
        @keyframes medium-border-pulse {
          0%   { box-shadow: 0 0 18px rgba(74, 222, 128, 0.25), inset 0 0 30px rgba(74, 222, 128, 0.05); }
          50%  { box-shadow: 0 0 38px rgba(74, 222, 128, 0.55), inset 0 0 50px rgba(74, 222, 128, 0.12); }
          100% { box-shadow: 0 0 18px rgba(74, 222, 128, 0.25), inset 0 0 30px rgba(74, 222, 128, 0.05); }
        }
        @media (prefers-reduced-motion: reduce) {
          .reset-tier-medium::before,
          .reset-tier-medium::after,
          .reset-tier-medium.is-visible { animation: none !important; }
        }
        .reset-tier-gold {
          background: linear-gradient(180deg, rgba(80, 55, 15, 0.85) 0%, rgba(30, 18, 5, 0.95) 100%);
          border: 1px solid rgba(212, 175, 55, 0.7);
          box-shadow: 0 0 18px rgba(212, 175, 55, 0.18);
          color: #fbbf24;
        }
        .reset-tier-gold .reset-tier-num,
        .reset-tier-gold .reset-tier-name,
        .reset-tier-gold .reset-tier-corner-bracket { color: #fbbf24; }
        .reset-tier-gold .reset-tier-price {
          color: #fbbf24;
          text-shadow: 0 0 12px rgba(251, 191, 36, 0.4);
        }
        .reset-tier-gold .reset-tier-bullet::before { color: #fbbf24; }
        .reset-tier-gold .reset-tier-bonus {
          color: rgba(251, 191, 36, 0.85);
          border-color: rgba(251, 191, 36, 0.2);
        }
        .reset-tier-gold:hover {
          transform: translateY(-4px);
          box-shadow: 0 0 28px rgba(212, 175, 55, 0.3);
          border-color: rgba(212, 175, 55, 0.9);
        }
        @media (max-width: 1023px) and (min-width: 768px) {
          .reset-membership-grid {
            grid-template-columns: 1fr 1fr;
            gap: 20px;
          }
          .reset-tier-medium { transform: scale(1); }
          .reset-tier-gold {
            grid-column: span 2;
            max-width: 600px;
            margin: 0 auto;
            width: 100%;
          }
        }
        @media (max-width: 767px) {
          .reset-membership-section { padding: 70px 5%; }
          .reset-membership-title { font-size: 32px; }
          .reset-membership-subtitle { font-size: 14px; }
          .reset-membership-header { margin-bottom: 40px; }
          .reset-membership-grid { grid-template-columns: 1fr; gap: 24px; }
          .reset-tier-card { padding: 32px 24px 28px 24px; }
          .reset-tier-medium { transform: scale(1); order: -1; }
          .reset-tier-medium:hover { transform: scale(1); }
          .reset-tier-name { font-size: 16px; }
          .reset-tier-price { font-size: 30px; }
          .reset-tier-bullet { font-size: 13px; }
          .reset-tier-bullet-price { font-size: 11px; }
          .reset-tier-bonus { font-size: 10px; }
          .reset-tier-card:hover { transform: none; }
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
        <div className="reset-hero-wrapper">
        <section className="reset-hero" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", background: "transparent" }}>
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
        </div>

        {/* ── RECOVERY ROOM ── */}
        <motion.section
          {...scrollReveal}
          style={{ background: "#050a05", padding: "72px 7%", position: "relative", zIndex: 1 }}
        >
          <motion.h2 {...scrollReveal} style={{ fontFamily: "'Michroma', sans-serif", fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 400, color: "#FFFFFF", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 12px 0", textAlign: "center" }}>
            RECOVERY ROOM
          </motion.h2>
          <motion.p {...scrollReveal} style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.45)", textAlign: "center", margin: "0 auto 40px", maxWidth: 600 }}>
            Your Reset zone. Available exclusively for Blueprint Lab members.
          </motion.p>

          {/* Grid 6 tiles — responsive */}
          <motion.div {...scrollStagger} className="recovery-arsenal-grid">
            {RECOVERY_CARDS.map((card, i) => (
              <motion.div
                variants={blurRevealItem}
                key={card.name}
                className={`recovery-tile${i === 0 ? " recovery-tile-hero" : ""}`}
              >
                <img
                  src={card.img}
                  srcSet={(card as { srcSet?: string }).srcSet}
                  sizes={(card as { sizes?: string }).sizes}
                  alt={card.name}
                  loading="lazy"
                  decoding="async"
                />
                {/* Scan line */}
                <div style={{ position: "absolute", left: 0, right: 0, height: 1, background: "linear-gradient(to right, transparent, rgba(34,197,94,0.4), transparent)", animation: `hvScanLine 5s ease-in-out ${scanDelays[i]}s infinite`, zIndex: 2, pointerEvents: "none" }} />
                <h3 className="recovery-tile-label">{card.name}</h3>
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

        {/* ── MEMBERSHIP TIERS ── */}
        <motion.section {...scrollReveal} className="reset-membership-section">
          <div className="reset-membership-header">
            <p className="reset-membership-eyebrow">[ MEMBERSHIP TIERS ]</p>
            <h2 className="reset-membership-title">Recovery Built for Every Level</h2>
            <p className="reset-membership-subtitle">
              Choose the protocol that matches your performance commitment.
            </p>
          </div>

          <motion.div {...scrollStagger} className="reset-membership-grid">
            {/* CARD 1 — STARTER */}
            <motion.div variants={blurRevealItem} className="reset-tier-card reset-tier-starter">
              <span className="reset-tier-corner-bracket reset-tier-corner-tl" />
              <span className="reset-tier-corner-bracket reset-tier-corner-tr" />
              <span className="reset-tier-corner-bracket reset-tier-corner-bl" />
              <span className="reset-tier-corner-bracket reset-tier-corner-br" />

              <div className="reset-tier-header">
                <div className="reset-tier-name-block">
                  <span className="reset-tier-num">01</span>
                  <h3 className="reset-tier-name">STARTER</h3>
                </div>
                <div className="reset-tier-price-block">
                  <div className="reset-tier-price">$300</div>
                  <div className="reset-tier-price-suffix">/ MONTH</div>
                </div>
              </div>

              <ul className="reset-tier-bullets">
                <li className="reset-tier-bullet"><span className="reset-tier-bullet-text">2× Infrared Sauna</span><span className="reset-tier-bullet-price">$60</span></li>
                <li className="reset-tier-bullet"><span className="reset-tier-bullet-text">2× Adjustments</span><span className="reset-tier-bullet-price">$140</span></li>
                <li className="reset-tier-bullet"><span className="reset-tier-bullet-text">2× Compression Boots</span><span className="reset-tier-bullet-price">$60</span></li>
                <li className="reset-tier-bullet"><span className="reset-tier-bullet-text">2× Muscle Therapy</span><span className="reset-tier-bullet-price">$70</span></li>
              </ul>

              <div className="reset-tier-bonus">
                <span className="reset-tier-bonus-icon">+</span>
                <span className="reset-tier-bonus-text">Online Mobility Modules</span>
              </div>
            </motion.div>

            {/* CARD 2 — MEDIUM */}
            <motion.div variants={blurRevealItem} className="reset-tier-card reset-tier-medium">
              <div className="reset-tier-badge">POPULAR</div>
              <span className="reset-tier-corner-bracket reset-tier-corner-tl" />
              <span className="reset-tier-corner-bracket reset-tier-corner-tr" />
              <span className="reset-tier-corner-bracket reset-tier-corner-bl" />
              <span className="reset-tier-corner-bracket reset-tier-corner-br" />

              <div className="reset-tier-header">
                <div className="reset-tier-name-block">
                  <span className="reset-tier-num">02</span>
                  <h3 className="reset-tier-name">MEDIUM</h3>
                </div>
                <div className="reset-tier-price-block">
                  <div className="reset-tier-price">$500</div>
                  <div className="reset-tier-price-suffix">/ MONTH</div>
                </div>
              </div>

              <ul className="reset-tier-bullets">
                <li className="reset-tier-bullet"><span className="reset-tier-bullet-text">4× Infrared Sauna</span><span className="reset-tier-bullet-price">$120</span></li>
                <li className="reset-tier-bullet"><span className="reset-tier-bullet-text">4× Adjustments</span><span className="reset-tier-bullet-price">$280</span></li>
                <li className="reset-tier-bullet"><span className="reset-tier-bullet-text">2× Compression Boots</span><span className="reset-tier-bullet-price">$60</span></li>
                <li className="reset-tier-bullet"><span className="reset-tier-bullet-text">2× Muscle Therapy</span><span className="reset-tier-bullet-price">$70</span></li>
              </ul>

              <div className="reset-tier-bonus">
                <span className="reset-tier-bonus-icon">+</span>
                <span className="reset-tier-bonus-text">Online Mobility Modules</span>
              </div>
            </motion.div>

            {/* CARD 3 — GOLD */}
            <motion.div variants={blurRevealItem} className="reset-tier-card reset-tier-gold">
              <span className="reset-tier-corner-bracket reset-tier-corner-tl" />
              <span className="reset-tier-corner-bracket reset-tier-corner-tr" />
              <span className="reset-tier-corner-bracket reset-tier-corner-bl" />
              <span className="reset-tier-corner-bracket reset-tier-corner-br" />

              <div className="reset-tier-header">
                <div className="reset-tier-name-block">
                  <span className="reset-tier-num">03</span>
                  <h3 className="reset-tier-name">GOLD</h3>
                </div>
                <div className="reset-tier-price-block">
                  <div className="reset-tier-price">$1,000</div>
                  <div className="reset-tier-price-suffix">/ MONTH</div>
                </div>
              </div>

              <ul className="reset-tier-bullets">
                <li className="reset-tier-bullet"><span className="reset-tier-bullet-text">Unlimited Sauna</span><span className="reset-tier-bullet-price">$240+</span></li>
                <li className="reset-tier-bullet"><span className="reset-tier-bullet-text">4× Adjustments</span><span className="reset-tier-bullet-price">$280</span></li>
                <li className="reset-tier-bullet"><span className="reset-tier-bullet-text">4× Compression Boots</span><span className="reset-tier-bullet-price">$60</span></li>
                <li className="reset-tier-bullet"><span className="reset-tier-bullet-text">4× Muscle Therapy</span><span className="reset-tier-bullet-price">$140</span></li>
                <li className="reset-tier-bullet"><span className="reset-tier-bullet-text">4× Hyperbaric Chamber</span><span className="reset-tier-bullet-price">$360</span></li>
              </ul>

              <div className="reset-tier-bonus">
                <span className="reset-tier-bonus-icon">+</span>
                <span className="reset-tier-bonus-text">Online Mobility Modules</span>
              </div>
            </motion.div>
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
