import * as React from "react";
import { useState } from "react";

interface AccordionItem {
  label: string;
  title: string;
  description: string;
  accentColor: string;
}

const ACCORDION_ITEMS: AccordionItem[] = [
  {
    label: "EL FUNDADOR",
    title: "ABOUT THE FOUNDER",
    description:
      "Christian 'Goldie' Latorre created Blueprint Project with one mission: build a system where training, nutrition, and recovery work as one. This isn't just a gym — it's his vision brought to life.",
    accentColor: "#1A6BFF",
  },
  {
    label: "LA VISIÓN",
    title: "OUR VISION",
    description:
      "Blueprint Project exists to redefine what a fitness space can be. Where science meets discipline, and every detail is designed to unlock your potential.",
    accentColor: "#22C55E",
  },
  {
    label: "SERVICIOS",
    title: "OUR SERVICES",
    description:
      "From personalized training programs to recovery protocols and nutrition guidance — every service at Blueprint is built to work together as a complete system.",
    accentColor: "#FF3B3B",
  },
];

const DesktopAccordion: React.FC = () => {
  const [active, setActive] = useState(0);

  return (
    <div className="hidden md:flex flex-row items-center gap-0" style={{ maxWidth: 1100, margin: "0 auto", width: "100%" }}>
      {/* Left text column */}
      <div style={{ width: "40%", paddingRight: 48, display: "flex", flexDirection: "column", justifyContent: "center", minHeight: 450 }}>
        <div key={active} className="animate-fade-in">
          <p
            style={{
              fontSize: 12,
              letterSpacing: "0.2em",
              color: ACCORDION_ITEMS[active].accentColor,
              fontFamily: "Space Grotesk, sans-serif",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            {ACCORDION_ITEMS[active].label}
          </p>
          <p
            style={{
              fontSize: 16,
              color: "rgba(255,255,255,0.7)",
              fontFamily: "Space Grotesk, sans-serif",
              lineHeight: 1.8,
            }}
          >
            {ACCORDION_ITEMS[active].description}
          </p>
        </div>
      </div>

      {/* Right accordion column */}
      <div style={{ width: "60%", display: "flex", flexDirection: "row", gap: 12, height: 450 }}>
        {ACCORDION_ITEMS.map((item, i) => {
          const isActive = i === active;
          return (
            <div
              key={item.label}
              onMouseEnter={() => setActive(i)}
              style={{
                width: isActive ? 400 : 60,
                height: "100%",
                borderRadius: 16,
                overflow: "hidden",
                cursor: "pointer",
                position: "relative",
                transition: "all 700ms cubic-bezier(0.4, 0, 0.2, 1)",
                background: isActive
                  ? `linear-gradient(135deg, #0a0a0a 0%, ${item.accentColor}26 100%)`
                  : "#111",
                boxShadow: isActive ? `0 0 30px ${item.accentColor}20` : "none",
                borderLeft: !isActive ? `2px solid ${item.accentColor}4D` : "none",
                flexShrink: 0,
              }}
            >
              {/* Active overlay gradient */}
              {isActive && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)",
                    zIndex: 1,
                  }}
                />
              )}

              {/* Active label */}
              {isActive && (
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
                    letterSpacing: "0.05em",
                  }}
                >
                  {item.label}
                </span>
              )}

              {/* Inactive rotated label */}
              {!isActive && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      color: "#fff",
                      fontSize: 13,
                      fontWeight: 600,
                      fontFamily: "Space Grotesk, sans-serif",
                      whiteSpace: "nowrap",
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {item.label}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const MobileAccordion: React.FC = () => (
  <div className="flex md:hidden flex-col gap-4 px-6">
    {ACCORDION_ITEMS.map((item) => (
      <div
        key={item.label}
        style={{
          width: "100%",
          height: 192,
          borderRadius: 12,
          position: "relative",
          overflow: "hidden",
          background: `linear-gradient(135deg, #0a0a0a 0%, ${item.accentColor}26 100%)`,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)",
            zIndex: 1,
          }}
        />
        <div style={{ position: "relative", zIndex: 2, padding: 24, display: "flex", flexDirection: "column", justifyContent: "flex-end", height: "100%" }}>
          <p
            style={{
              fontSize: 12,
              letterSpacing: "0.2em",
              color: item.accentColor,
              fontFamily: "Space Grotesk, sans-serif",
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            {item.label}
          </p>
          <p
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.7)",
              fontFamily: "Space Grotesk, sans-serif",
              lineHeight: 1.6,
            }}
          >
            {item.description}
          </p>
        </div>
      </div>
    ))}
  </div>
);

export const InteractiveImageAccordion: React.FC = () => (
  <section style={{ backgroundColor: "#000", paddingTop: 64, paddingBottom: 64 }} className="md:py-24">
    <p
      style={{
        fontSize: 12,
        letterSpacing: "0.2em",
        color: "#1A6BFF",
        fontFamily: "Space Grotesk, sans-serif",
        textAlign: "center",
        textTransform: "uppercase",
        marginBottom: 16,
      }}
    >
      CONÓCENOS
    </p>
    <h2
      style={{
        fontFamily: "Bebas Neue, sans-serif",
        color: "#fff",
        textAlign: "center",
        fontSize: "clamp(36px, 5vw, 48px)",
        fontWeight: 400,
        marginBottom: 48,
      }}
    >
      THE BLUEPRINT SYSTEM
    </h2>
    <DesktopAccordion />
    <MobileAccordion />
  </section>
);
