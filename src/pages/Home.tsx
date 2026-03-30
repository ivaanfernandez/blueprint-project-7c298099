import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Dock, DockIcon } from "@/components/ui/dock";

const FingerprintSVG = ({ color, size = 48 }: { color: string; size?: number }) => (
  <svg
    viewBox="0 0 140 140"
    width={size}
    height={size}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'block', margin: '0 auto', position: 'relative', left: 0, transform: 'none' }}
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
  { color: "#1A6BFF", glow: "rgba(26,107,255,0.8)", route: "/huella-azul", tooltip: "ENTRENAMIENTO" },
  { color: "#FF3B3B", glow: "rgba(255,59,59,0.8)", route: "/huella-roja", tooltip: "NUTRICIÓN" },
  { color: "#22C55E", glow: "rgba(34,197,94,0.8)", route: "/huella-verde", tooltip: "RECUPERACIÓN" },
];

const Home = ({ showDock }: { showDock: boolean }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      style={{ backgroundColor: "#FFFFFF", fontFamily: "'Space Grotesk', sans-serif", minHeight: "100vh" }}
    >
      {/* FIXED DOCK NAV — light background variant */}
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
        transition: 'opacity 0.8s ease',
      }}>
        <div style={{ pointerEvents: showDock ? 'all' : 'none' }}>
          <style>{`
            .home-dock .dock-container {
              background: rgba(0, 0, 0, 0.06) !important;
              border: 1px solid rgba(0, 0, 0, 0.1) !important;
              backdrop-filter: blur(12px) !important;
            }
          `}</style>
          <div className="home-dock">
            <Dock>
              {HUELLAS.map((h) => (
                <DockIcon key={h.route} tooltip={h.tooltip} onClick={() => navigate(h.route)}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%',
                      height: '100%',
                      filter: `drop-shadow(0 0 8px ${h.glow})`,
                    }}
                  >
                    <FingerprintSVG color={h.color} size={44} />
                  </div>
                </DockIcon>
              ))}
            </Dock>
          </div>
        </div>
      </div>

      {/* CENTERED CONTENT */}
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', padding: '24px' }}>
          <p style={{
            fontSize: '12px',
            letterSpacing: '0.3em',
            color: '#6B7280',
            textTransform: 'uppercase',
            fontFamily: "'Space Grotesk', sans-serif",
            marginBottom: '12px',
          }}>
            WELCOME TO
          </p>
          <h1 style={{
            fontSize: 'clamp(48px, 8vw, 96px)',
            fontFamily: "'Bebas Neue', sans-serif",
            fontWeight: 400,
            color: '#000000',
            lineHeight: 1,
            margin: 0,
          }}>
            BLUEPRINT PROJECT
          </h1>
          <div style={{
            width: '120px',
            height: '1px',
            backgroundColor: '#D1D5DB',
            margin: '24px auto',
          }} />
          <p style={{
            fontSize: '16px',
            color: '#6B7280',
            fontFamily: "'Space Grotesk', sans-serif",
          }}>
            The system is loading. Your blueprint awaits.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
