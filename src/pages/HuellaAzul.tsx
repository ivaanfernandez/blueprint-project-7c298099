import SEO from "@/components/SEO";

const HuellaAzul = () => (
  <>
    <SEO
      title="Blueprint Lab — Elite Training System | Blueprint Project"
      description="Blueprint Lab: data-driven elite training system. Strength, physique, mobility and real progression through structured coaching at our premium gym in Santurce, Puerto Rico."
      canonical="https://blueprintproject.com/huella-azul"
    />
    <style>{`
      .lab-hero-wrapper { --reveal-glow: rgba(26,107,255,0.4); width: 100%; padding: 0 16px; background: #050610; min-height: 100vh; }
      .lab-hero {
        min-height: 100vh;
        border-radius: 24px;
        overflow: hidden;
        border: 0.5px solid rgba(26, 107, 255, 0.3);
        position: relative;
        background: #000;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .lab-hero::after {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: 24px;
        pointer-events: none;
        box-shadow: 0 0 40px rgba(26, 107, 255, 0.08) inset;
        z-index: 1;
      }
      @media (max-width: 1023px) and (min-width: 768px) {
        .lab-hero-wrapper { padding: 0 12px; }
        .lab-hero { border-radius: 20px; }
        .lab-hero::after { border-radius: 20px; }
      }
      @media (max-width: 767px) {
        .lab-hero-wrapper { padding: 0 8px; }
        .lab-hero { border-radius: 16px; }
        .lab-hero::after { border-radius: 16px; }
      }
    `}</style>
    <div className="lab-hero-wrapper">
      <section className="lab-hero" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        <p style={{ color: "#fff", fontSize: "18px", letterSpacing: "0.2em" }}>HUELLA AZUL</p>
      </section>
    </div>
  </>
);
export default HuellaAzul;
