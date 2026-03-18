import * as React from "react";
import { useState, useRef, useEffect } from "react";
import founderImage from "@/assets/accordion/accordion-founder.jpg";
import visionImage from "@/assets/accordion/accordion-vision.jpg";
import servicesImage from "@/assets/accordion/accordion-services.jpg";
import { BorderRotate } from "@/components/ui/animated-gradient-border";

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

const MOBILE_BORDER_COLORS = [
  { primary: '#0a1628', secondary: '#1A6BFF', accent: '#5a9fff' },
  { primary: '#0a2816', secondary: '#22C55E', accent: '#5aea8a' },
  { primary: '#280a0a', secondary: '#FF3B3B', accent: '#ff7a7a' },
];

const MobileAccordion: React.FC = () =>
<div className="flex md:hidden flex-col gap-4 px-6">
    {ACCORDION_ITEMS.map((item, index) =>
  <BorderRotate
    key={item.label}
    gradientColors={MOBILE_BORDER_COLORS[index]}
    backgroundColor="#0a0a0a"
    borderWidth={2}
    borderRadius={16}
    animationSpeed={4}
  >
    <div
      style={{
        width: "100%",
        height: 192,
        borderRadius: 14,
        position: "relative",
        overflow: "hidden",
        backgroundImage: `url(${item.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}>
    
        <div
      style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)",
        zIndex: 1
      }} />
    
        <div style={{ position: "relative", zIndex: 2, padding: 24, display: "flex", flexDirection: "column", justifyContent: "flex-end", height: "100%" }}>
          <p
        style={{
          fontSize: 12,
          letterSpacing: "0.2em",
          color: item.accentColor,
          fontFamily: "Space Grotesk, sans-serif",
          textTransform: "uppercase",
          marginBottom: 8
        }}>
        
            {item.label}
          </p>
          <p
        style={{
          fontSize: 13,
          color: "rgba(255,255,255,0.7)",
          fontFamily: "Space Grotesk, sans-serif",
          lineHeight: 1.6
        }}>
        
            {item.description}
          </p>
        </div>
      </div>
  </BorderRotate>
  )}
  </div>;


export const InteractiveImageAccordion: React.FC = () =>
<section style={{ backgroundColor: "transparent", paddingTop: 0, paddingBottom: 64, position: "relative", zIndex: 10 }} className="md:pb-24">
    











  
    










  
    <DesktopAccordion />
    <MobileAccordion />
  </section>;