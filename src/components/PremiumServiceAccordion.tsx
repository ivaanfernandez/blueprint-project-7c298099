import { useState, useEffect } from "react";

interface HudStat {
  label: string;
  value: string;
  icon: string;
}

interface PremiumService {
  number: string;
  title: string;
  description: string;
  stats: HudStat[];
}

const SERVICES: PremiumService[] = [
  {
    number: "01",
    title: "PERSONALIZED RECOVERY PROTOCOLS",
    description:
      "Designed by our expert team based on your goals: athletic performance, cellular longevity, deep relaxation, or enhanced mental focus.",
    stats: [
      { label: "EFFICACY RATE", value: "94%", icon: "⚡" },
      { label: "SESSION DURATION", value: "60 MIN", icon: "⏱" },
      { label: "ACTIVE PROTOCOLS", value: "12", icon: "⚙" },
      { label: "MEMBER TIER", value: "ELITE", icon: "★" },
    ],
  },
  {
    number: "02",
    title: "RESET PASS",
    description:
      "Unlimited access to all Wellness Days, special discounts on professional massages, and exclusive Hack Bar products.",
    stats: [
      { label: "ACCESS LEVEL", value: "UNLIMITED", icon: "∞" },
      { label: "WELLNESS DAYS", value: "24/YR", icon: "◎" },
      { label: "MEMBER DISCOUNT", value: "30%", icon: "%" },
      { label: "PARTNER PRODUCTS", value: "50+", icon: "◇" },
    ],
  },
  {
    number: "03",
    title: "RECOVERY PROGRAMS",
    description:
      "Structured recovery protocols built to optimize how the body restores, adapts, and performs. Each program combines targeted modalities to deliver measurable results in performance, energy, and overall wellbeing.",
    stats: [
      { label: "RECOVERY TIME", value: "-47%", icon: "◈" },
      { label: "SLEEP QUALITY", value: "+62%", icon: "↑" },
      { label: "ENERGY INCREASE", value: "+84%", icon: "⌘" },
      { label: "STRESS REDUCTION", value: "-71%", icon: "✦" },
    ],
  },
  {
    number: "04",
    title: "RESET RETREATS",
    description:
      "Coming soon: 72-hour immersive experiences with guided detox, therapeutic fasting, extended sauna, deep meditation, and full reconnection with nature.",
    stats: [
      { label: "DURATION", value: "72 HOURS", icon: "⧗" },
      { label: "CAPACITY", value: "12 GUESTS", icon: "◯" },
      { label: "STATUS", value: "COMING 2026", icon: "⟳" },
      { label: "LOCATIONS", value: "CURATED", icon: "◐" },
    ],
  },
];

const PremiumServiceAccordion = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleMouseEnter = (index: number) => {
    if (isDesktop) setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    if (isDesktop) setActiveIndex(null);
  };

  const handleClick = (index: number) => {
    if (!isDesktop) {
      setActiveIndex(activeIndex === index ? null : index);
    }
  };

  return (
    <div className="premium-accordion">
      {SERVICES.map((service, index) => {
        const isActive = activeIndex === index;
        return (
          <div
            key={service.number}
            className={`premium-item ${isActive ? "is-active" : ""}`}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(index)}
          >
            <div className="premium-accent-line" />

            <div className="premium-header">
              <span className="premium-number">{service.number}</span>
              <h3 className="premium-title">{service.title}</h3>
              <span className="premium-chevron">{isActive ? "▾" : "▸"}</span>
            </div>

            <div className="premium-content">
              <p className="premium-description">{service.description}</p>

              <div className="premium-hud">
                {service.stats.map((stat, i) => (
                  <div
                    key={stat.label}
                    className="premium-stat"
                    style={{ ["--i" as never]: i } as React.CSSProperties}
                  >
                    <span className="premium-stat-icon">{stat.icon}</span>
                    <div className="premium-stat-text">
                      <span className="premium-stat-label">{stat.label}</span>
                      <span className="premium-stat-value">{stat.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PremiumServiceAccordion;
