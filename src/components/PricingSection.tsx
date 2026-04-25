import { useState } from "react";
import PricingCardsHarshGlow from "./PricingCardsHarshGlow";

const PricingSection = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="relative z-10 py-8 md:py-12 px-4">
      <h2 className="text-center text-4xl md:text-5xl mb-10"
        style={{ fontFamily: "Bebas Neue, sans-serif", color: "#fff", fontWeight: 400 }}>
        YOUR SYSTEM STARTS HERE
      </h2>

      {/* Toggle */}
      <div className="flex items-center justify-center gap-3 mb-10">
        <span className="text-sm" style={{
          fontFamily: "Space Grotesk, sans-serif",
          color: !isYearly ? "#fff" : "rgba(255,255,255,0.4)",
          transition: "color 200ms"
        }}>Monthly</span>

        <button
          onClick={() => setIsYearly(!isYearly)}
          className="relative rounded-full"
          style={{
            width: 56, height: 28,
            background: "rgba(255,255,255,0.1)",
            border: "0.5px solid rgba(255,255,255,0.15)",
          }}
          aria-label="Toggle yearly pricing"
        >
          <div className="absolute top-[2px] rounded-full transition-all duration-300"
            style={{
              width: 24, height: 24, background: "#1A6BFF",
              left: isYearly ? 30 : 2,
            }}
          />
        </button>

        <span className="text-sm flex items-center gap-1.5" style={{
          fontFamily: "Space Grotesk, sans-serif",
          color: isYearly ? "#fff" : "rgba(255,255,255,0.4)",
          transition: "color 200ms"
        }}>
          Yearly
          {isYearly && (
            <span className="text-[10px] rounded-full px-2 py-0.5"
              style={{ background: "rgba(34,197,94,0.2)", color: "#22C55E" }}>
              Save 15%
            </span>
          )}
        </span>
      </div>

      {/* Cards */}
      <PricingCardsHarshGlow isYearly={isYearly} />
    </section>
  );
};

export default PricingSection;
