interface PricingFeature {
  text: string;
}

interface PricingTier {
  systemNumber: string;
  tierLabel: string;
  pipsActive: number;
  name: string;
  priceMonthly: number;
  priceYearly: number;
  features: PricingFeature[];
  cta: string;
  isPopular?: boolean;
}

const TIERS: PricingTier[] = [
  {
    systemNumber: "SYSTEM 01",
    tierLabel: "FOUNDATION",
    pipsActive: 1,
    name: "BLUEPRINT",
    priceMonthly: 75,
    priceYearly: 64,
    features: [
      { text: "Access to gym floor & equipment" },
      { text: "Blueprint training methodology" },
      { text: "Community access" },
      { text: "Locker room & amenities" },
    ],
    cta: "INITIALIZE",
  },
  {
    systemNumber: "SYSTEM 02",
    tierLabel: "POPULAR",
    pipsActive: 2,
    name: "BLUEPRINT+",
    priceMonthly: 150,
    priceYearly: 128,
    features: [
      { text: "Everything in Blueprint" },
      { text: "Personalized training program" },
      { text: "Hack Bar nutrition guidance" },
      { text: "Monthly body composition analysis" },
      { text: "Priority class booking" },
    ],
    cta: "ACTIVATE",
    isPopular: true,
  },
  {
    systemNumber: "SYSTEM 03",
    tierLabel: "MAXIMUM",
    pipsActive: 3,
    name: "BLUEPRINT ELITE",
    priceMonthly: 250,
    priceYearly: 213,
    features: [
      { text: "Everything in Blueprint+" },
      { text: "1-on-1 coaching sessions (4x/month)" },
      { text: "Reset recovery protocols" },
      { text: "Custom meal planning" },
      { text: "VIP access & guest passes" },
      { text: "Direct founder access" },
    ],
    cta: "DEPLOY",
  },
];

interface Props {
  isYearly: boolean;
}

const PricingCardsHarshGlow = ({ isYearly }: Props) => {
  return (
    <div className="harsh-grid">
      {TIERS.map((tier) => {
        const price = isYearly ? tier.priceYearly : tier.priceMonthly;
        return (
          <div key={tier.name} className="harsh-card">
            {/* Corner brackets HUD */}
            <div className="harsh-corner harsh-corner-tl" />
            <div className="harsh-corner harsh-corner-tr" />
            <div className="harsh-corner harsh-corner-bl" />
            <div className="harsh-corner harsh-corner-br" />

            {/* Scan line */}
            <div className="harsh-scan" />

            {/* Tier label + pips */}
            <div className="harsh-tier">
              <div className="harsh-pips">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className={`harsh-pip ${i < tier.pipsActive ? "harsh-pip-on" : ""}`}
                  />
                ))}
              </div>
              {tier.tierLabel}
            </div>

            {/* Plan name */}
            <div className="harsh-name">{tier.name}</div>

            {/* System number */}
            <div className="harsh-system">{tier.systemNumber}</div>

            {/* Price */}
            <div className="harsh-price-area">
              <div className="harsh-price">${price}</div>
              <div className="harsh-permo">PER MONTH</div>
            </div>

            {/* Features (hidden until hover) */}
            <div className="harsh-features">
              {tier.features.map((feat) => (
                <div key={feat.text} className="harsh-feat">
                  <span className="harsh-feat-icon">✓</span>
                  {feat.text}
                </div>
              ))}
            </div>

            {/* CTA */}
            <button className="harsh-cta" type="button">
              {tier.cta}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default PricingCardsHarshGlow;
