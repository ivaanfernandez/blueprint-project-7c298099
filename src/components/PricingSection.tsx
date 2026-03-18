import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User } from "lucide-react";

const FingerprintSVG = ({ color, size = 40 }: { color: string; size?: number }) => (
  <svg viewBox="0 0 140 140" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    {[18, 26, 34, 42, 50].map((ry, i) => (
      <ellipse key={i} cx="70" cy="75" rx={ry * 0.7} ry={ry} stroke={color} strokeWidth="1.8" />
    ))}
    {[20, 30, 40].map((r, i) => (
      <path key={`a-${i}`} d={`M ${70 - r * 0.6} ${55 - i * 4} Q 70 ${20 - i * 6} ${70 + r * 0.6} ${55 - i * 4}`} stroke={color} strokeWidth="1.8" fill="none" />
    ))}
    <path d="M 62 70 Q 65 60 70 58 Q 75 60 78 70 Q 75 80 70 82 Q 65 80 62 70Z" stroke={color} strokeWidth="1.4" fill="none" />
  </svg>
);

const CheckIcon = () => (
  <div style={{
    width: 20, height: 20, borderRadius: "50%",
    background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
  }}>
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M2.5 6L5 8.5L9.5 4" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

interface Plan {
  name: string;
  color: string;
  monthlyPrice: number;
  yearlyPrice: number;
  description: string;
  features: string[];
  featured?: boolean;
  ctaStyle: "outline" | "filled";
}

const PLANS: Plan[] = [
  {
    name: "BLUEPRINT",
    color: "#1A6BFF",
    monthlyPrice: 75,
    yearlyPrice: 64,
    description: "For individuals ready to start training with structure and intention.",
    features: [
      "Access to gym floor & equipment",
      "Blueprint training methodology",
      "Community access",
      "Locker room & amenities",
    ],
    ctaStyle: "outline",
  },
  {
    name: "BLUEPRINT+",
    color: "#22C55E",
    monthlyPrice: 150,
    yearlyPrice: 128,
    description: "For those who want the full system — training, nutrition, and recovery.",
    features: [
      "Everything in Blueprint",
      "Personalized training program",
      "Hack Bar nutrition guidance",
      "Monthly body composition analysis",
      "Priority class booking",
    ],
    featured: true,
    ctaStyle: "filled",
  },
  {
    name: "BLUEPRINT ELITE",
    color: "#FF3B3B",
    monthlyPrice: 250,
    yearlyPrice: 213,
    description: "The ultimate Blueprint experience — fully personalized, fully integrated.",
    features: [
      "Everything in Blueprint+",
      "1-on-1 coaching sessions (4x/month)",
      "Reset recovery protocols",
      "Custom meal planning",
      "VIP access & guest passes",
      "Direct founder access",
    ],
    ctaStyle: "outline",
  },
];

const PricingCard = ({ plan, isYearly }: { plan: Plan; isYearly: boolean }) => {
  const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;

  return (
    <div
      className={`relative rounded-2xl p-8 transition-all duration-300 ${plan.featured ? "md:scale-105 md:py-10" : ""}`}
      style={{
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: plan.featured
          ? "1px solid rgba(255,255,255,0.2)"
          : "0.5px solid rgba(255,255,255,0.1)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = plan.featured ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.1)";
      }}
    >
      {plan.featured && (
        <span className="absolute top-4 right-4 text-[10px] rounded-full px-3 py-1"
          style={{ background: "rgba(255,255,255,0.1)", color: "#fff" }}>
          POPULAR
        </span>
      )}

      {plan.name === "BLUEPRINT" ? (
        <div className="flex justify-center mb-4">
          <FingerprintSVG color={plan.color} size={64} />
        </div>
      ) : (
        <div className="flex justify-center items-center gap-3 mb-4">
          <FingerprintSVG color="#1A6BFF" size={40} />
          <FingerprintSVG color="#22C55E" size={40} />
          <FingerprintSVG color="#FF3B3B" size={40} />
        </div>
      )}

      <p className="text-center text-lg font-semibold tracking-wide text-white" style={{ fontFamily: "Rajdhani, sans-serif" }}>
        {plan.name}
      </p>

      <div className="mt-2 flex items-baseline gap-1">
        <AnimatePresence mode="wait">
          <motion.span
            key={price}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-4xl font-bold text-white"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            ${price}
          </motion.span>
        </AnimatePresence>
        <span className="text-base" style={{ color: "rgba(255,255,255,0.4)" }}>/mo</span>
      </div>

      <p className="mt-3 mb-6 text-sm" style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>
        {plan.description}
      </p>

      <div className="my-6" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }} />

      <ul className="flex flex-col gap-3 mb-8">
        {plan.features.map((f) => (
          <li key={f} className="flex items-center gap-3">
            <CheckIcon />
            <span className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>{f}</span>
          </li>
        ))}
      </ul>

      <button
        className="w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 text-white"
        style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.2)" }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
      >
        Choose Plan
      </button>
    </div>
  );
};

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
      <div className="pricing-scroll-container flex gap-4 px-4 md:grid md:grid-cols-3 md:gap-6 max-w-5xl md:mx-auto">
        {PLANS.map((plan) => (
          <div key={plan.name} className="pricing-card-wrapper flex-shrink-0 w-[85vw] md:w-auto md:flex-shrink-1">
            <PricingCard plan={plan} isYearly={isYearly} />
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 767px) {
          .pricing-scroll-container {
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }
          .pricing-scroll-container::-webkit-scrollbar {
            display: none;
          }
          .pricing-card-wrapper {
            scroll-snap-align: center;
          }
        }
      `}</style>
    </section>
  );
};

export default PricingSection;
