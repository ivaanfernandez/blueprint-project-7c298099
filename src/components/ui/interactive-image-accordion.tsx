import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import founderImage from "@/assets/accordion/accordion-founder.jpg";
import visionImage from "@/assets/accordion/accordion-vision.jpg";
import servicesImage from "@/assets/accordion/accordion-services.jpg";

interface AccordionItem {
  label: string;
  stripLabel: string;
  title: string;
  description: string;
  accentColor: string;
  image: string;
  objectPosition?: string;
}

const ACCORDION_ITEMS: AccordionItem[] = [
{
  label: "CHRISTIAN 'GOLDIE' LATORRE",
  stripLabel: "ABOUT THE FOUNDER",
  title: "ABOUT THE FOUNDER",
  description:
  "Christian 'Goldie' Latorre created Blueprint Project with one mission: build a system where training, nutrition, and recovery work as one. This isn't just a gym — it's his vision brought to life.",
  accentColor: "#1A6BFF",
  image: founderImage,
  objectPosition: "center 30%"
},
{
  label: "VISION",
  stripLabel: "VISION",
  title: "VISION",
  description:
  "Blueprint Project exists to redefine what a fitness space can be. Where science meets discipline, and every detail is designed to unlock your potential.",
  accentColor: "#22C55E",
  image: visionImage
},
{
  label: "SERVICES",
  stripLabel: "SERVICES",
  title: "SERVICES",
  description:
  "From personalized training programs to recovery protocols and nutrition guidance — every service at Blueprint is built to work together as a complete system.",
  accentColor: "#FF3B3B",
  image: servicesImage
}];


const DesktopAccordion: React.FC = () => {
  const [active, setActive] = useState(0);
  const [displayed, setDisplayed] = useState(0);
  const [fading, setFading] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (active === displayed) return;
    setFading(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setDisplayed(active);
      setFading(false);
    }, 150);
    return () => {if (timeoutRef.current) clearTimeout(timeoutRef.current);};
  }, [active, displayed]);

  const item = ACCORDION_ITEMS[displayed];

  return (
    <div className="hidden md:flex flex-row items-center gap-0" style={{ maxWidth: "92vw", margin: "0 auto", width: "95%", paddingLeft: 24, paddingRight: 24 }}>
      {/* Left text column */}
      <div style={{ width: "35%", paddingRight: 48, display: "flex", flexDirection: "column", justifyContent: "center", minHeight: 500 }}>
        <div
          style={{
            opacity: fading ? 0 : 1,
            transform: fading ? "translateY(6px)" : "translateY(0)",
            transition: "opacity 300ms ease, transform 300ms ease"
          }}>
          
          <p
            style={{
              fontSize: 13,
              letterSpacing: "0.2em",
              color: item.accentColor,
              fontFamily: "Space Grotesk, sans-serif",
              textTransform: "uppercase",
              fontWeight: 600,
              marginBottom: 12
            }}>
            
            {item.label}
          </p>
          <h3
            style={{
              fontFamily: "Bebas Neue, sans-serif",
              fontSize: "clamp(32px, 4vw, 40px)",
              color: "#fff",
              fontWeight: 400,
              lineHeight: 1.1,
              marginBottom: 16
            }}>
            
            {item.title}
          </h3>
          <p
            style={{
              fontSize: 16,
              color: "rgba(255,255,255,0.65)",
              fontFamily: "Space Grotesk, sans-serif",
              lineHeight: 1.8,
              maxWidth: 448
            }}>
            
            {item.description}
          </p>
        </div>
      </div>

      {/* Right accordion column */}
      <div style={{ width: "65%", display: "flex", flexDirection: "row", gap: 12, height: 500 }}>
        {ACCORDION_ITEMS.map((item, i) => {
          const isActive = i === active;
          return (
            <div
              key={item.label}
              onMouseEnter={() => setActive(i)}
              style={{
                width: isActive ? 550 : 60,
                height: "100%",
                borderRadius: 16,
                overflow: "hidden",
                cursor: "pointer",
                position: "relative",
                transition: "width 700ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 700ms cubic-bezier(0.4, 0, 0.2, 1)",
                background: "#111",
                boxShadow: isActive ? `0 0 30px ${item.accentColor}20` : "none",
                borderLeft: !isActive ? `2px solid ${item.accentColor}4D` : "none",
                flexShrink: 0
              }}>
              
              {/* Image element */}
              <img
                src={item.image}
                alt={item.stripLabel}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: item.objectPosition || "center center",
                  transition: "none",
                  willChange: "transform",
                  pointerEvents: "none",
                }}
              />

              {/* Overlay gradient */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)",
                  zIndex: 1
                }} />

              {/* Active label */}
              {isActive &&
              <span
                style={{
                  position: "absolute",
                  bottom: 24,
                  left: 0,
                  right: 0,
                  textAlign: "center",
                  color: "#fff",
                  fontSize: 18,
                  fontWeight: 600,
                  fontFamily: "Space Grotesk, sans-serif",
                  zIndex: 2,
                  letterSpacing: "0.05em"
                }}>
                
                  {item.stripLabel}
                </span>
              }

              {/* Inactive rotated label */}
              {!isActive &&
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                
                  <span
                  style={{
                    color: "#fff",
                    fontSize: 13,
                    fontWeight: 600,
                    fontFamily: "Space Grotesk, sans-serif",
                    whiteSpace: "nowrap",
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                    letterSpacing: "0.1em"
                  }}>
                  
                    {item.stripLabel}
                  </span>
                </div>
              }
            </div>);

        })}
      </div>
    </div>);

};

const TAB_LABELS = ["FOUNDER", "VISION", "SERVICES"];
const ACCENT_RGB = ["26,107,255", "34,197,94", "255,59,59"];

const MobileAccordion: React.FC = () => {
  const [active, setActive] = useState(0);
  const [displayed, setDisplayed] = useState(0);
  const [fading, setFading] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (active === displayed) return;
    setFading(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setDisplayed(active);
      setFading(false);
    }, 150);
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [active, displayed]);

  const item = ACCORDION_ITEMS[displayed];

  return (
    <motion.div
      ref={containerRef}
      className="flex md:hidden flex-col mx-4"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div style={{ background: "#0a0a0a", borderRadius: 24, border: "0.5px solid rgba(255,255,255,0.1)", overflow: "hidden" }}>
        {/* Tab bar */}
        <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          {ACCORDION_ITEMS.map((tabItem, i) => {
            const isActive = i === active;
            return (
              <button
                key={tabItem.label}
                onClick={() => setActive(i)}
                style={{
                  flex: 1,
                  padding: "14px 0",
                  fontSize: 10,
                  letterSpacing: "0.15em",
                  fontWeight: 600,
                  textTransform: "uppercase" as const,
                  fontFamily: "Space Grotesk, sans-serif",
                  color: tabItem.accentColor,
                  opacity: isActive ? 1 : 0.45,
                  background: isActive ? `rgba(${ACCENT_RGB[i]}, 0.15)` : "transparent",
                  border: "none",
                  borderBottom: isActive ? `2px solid ${tabItem.accentColor}` : "2px solid transparent",
                  cursor: "pointer",
                  transition: "all 300ms ease",
                }}
              >
                {TAB_LABELS[i]}
              </button>
            );
          })}
        </div>

        {/* Image area */}
        <div style={{ position: "relative", width: "100%", height: 300, overflow: "hidden" }}>
          <img
            src={item.image}
            alt={item.stripLabel}
            style={{
              position: "absolute", inset: 0, width: "100%", height: "100%",
              objectFit: "cover", objectPosition: item.objectPosition || "center center",
              opacity: fading ? 0 : 1, transition: "opacity 300ms ease",
            }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 40%, transparent 100%)", zIndex: 1 }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 20px 20px", zIndex: 2, opacity: fading ? 0 : 1, transition: "opacity 300ms ease" }}>
            <h3 style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: 24, color: "#fff", fontWeight: 700, lineHeight: 1.1, marginBottom: 8 }}>
              {item.title}
            </h3>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", fontFamily: "Space Grotesk, sans-serif", lineHeight: 1.6 }}>
              {item.description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};


export const InteractiveImageAccordion: React.FC = () =>
<section style={{ backgroundColor: "transparent", paddingTop: 0, paddingBottom: 64, position: "relative", zIndex: 10 }} className="md:pb-24">
    











  
    










  
    <DesktopAccordion />
    <MobileAccordion />
  </section>;