import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STYLES = `
@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
  100% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
}
@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
@keyframes pulseRing {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.02); }
}
@keyframes pulseGlow {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.7; }
}
`;

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

const MagneticButton = ({
  children,
  onClick,
  style,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
  className?: string;
}) => {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(el, { x: x * 0.3, y: y * 0.3, scale: 1.05, ease: "power2.out", duration: 0.4 });
    };
    const handleLeave = () => {
      gsap.to(el, { x: 0, y: 0, scale: 1, ease: "elastic.out(1,0.3)", duration: 1.2 });
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <button ref={ref} onClick={onClick} className={className} style={style}>
      {children}
    </button>
  );
};

const MARQUEE_ITEMS = "Precision Training ✦ Nutrition Engineering ✦ Recovery Science ✦ Mental Growth ✦ Blueprint Lab ✦ Hack Bar ✦ Reset ✦ ";

const MarqueeBand = () => {
  const text = MARQUEE_ITEMS.repeat(4);
  return (
    <div style={{
      overflow: "hidden",
      width: "100%",
      padding: "14px 0",
      borderTop: "1px solid rgba(255,255,255,0.06)",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
    }}>
      <div style={{
        display: "flex",
        whiteSpace: "nowrap",
        animation: "footer-scroll-marquee 30s linear infinite",
        width: "max-content",
      }}>
        <span style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: 10,
          letterSpacing: "0.2em",
          color: "rgba(255,255,255,0.15)",
          textTransform: "uppercase",
        }}>
          {text}
        </span>
        <span style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: 10,
          letterSpacing: "0.2em",
          color: "rgba(255,255,255,0.15)",
          textTransform: "uppercase",
        }}>
          {text}
        </span>
      </div>
    </div>
  );
};

export default function CinematicFooter() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!wrapperRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        giantTextRef.current,
        { y: "10vh", scale: 0.8, opacity: 0 },
        {
          y: "0vh", scale: 1, opacity: 1, ease: "power1.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 80%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );
      gsap.fromTo(
        [headingRef.current, buttonsRef.current],
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.15, ease: "power3.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 40%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{STYLES}</style>
      <div
        ref={wrapperRef}
        style={{
          background: "#0a0a0a",
          position: "relative",
          overflow: "hidden",
          paddingTop: 80,
        }}
      >
        {/* Dot pattern */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(rgba(255,255,255,0.015) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }} />

        {/* Giant BLUEPRINT text */}
        <div
          ref={giantTextRef}
          style={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            padding: "60px 7% 40px",
          }}
        >
          {/* Breathing fingerprint glow behind text */}
          <div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%) scale(1)",
            animation: "footer-breathe 4s ease-in-out infinite alternate",
            pointerEvents: "none",
            zIndex: 0,
            opacity: 0.6,
          }}>
            <FingerprintSVG color="rgba(26,107,255,0.12)" size={280} />
          </div>

          <h2 style={{
            fontFamily: "'Michroma', sans-serif",
            fontSize: "clamp(48px, 12vw, 140px)",
            color: "rgba(255,255,255,0.04)",
            textTransform: "uppercase",
            lineHeight: 0.9,
            margin: 0,
            position: "relative",
            zIndex: 1,
            letterSpacing: "0.05em",
          }}>
            BLUEPRINT
          </h2>
        </div>

        {/* Marquee band */}
        <MarqueeBand />

        {/* Heading + Buttons */}
        <div style={{ textAlign: "center", padding: "60px 7% 20px", position: "relative", zIndex: 2 }}>
          <div ref={headingRef}>
            <h3 style={{
              fontFamily: "'Michroma', sans-serif",
              fontSize: "clamp(18px, 3vw, 32px)",
              color: "#FFFFFF",
              textTransform: "uppercase",
              lineHeight: 1.2,
              marginBottom: 8,
              letterSpacing: "0.08em",
            }}>
              YOUR EVOLUTION<br />STARTS HERE
            </h3>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              fontWeight: 300,
              color: "rgba(255,255,255,0.35)",
              marginBottom: 40,
            }}>
              Your evolution begins with a single step.
            </p>
          </div>

          <div ref={buttonsRef} style={{
            display: "flex",
            gap: 16,
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: 60,
          }}>
            <MagneticButton
              onClick={() => navigate("/huella-azul")}
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: "0.2em",
                color: "#fff",
                background: "rgba(26,107,255,0.08)",
                border: "1px solid rgba(26,107,255,0.3)",
                borderRadius: 50,
                padding: "18px 48px",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              JOIN NOW
            </MagneticButton>

            <MagneticButton
              onClick={() => window.open("https://instagram.com/blueprintproject", "_blank")}
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: "0.2em",
                color: "rgba(255,255,255,0.5)",
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 50,
                padding: "18px 48px",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              INSTAGRAM
            </MagneticButton>
          </div>
        </div>

        {/* Footer bar */}
        <div style={{
          padding: "20px 7%",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
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
    </>
  );
}
