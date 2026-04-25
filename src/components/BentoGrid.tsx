import BiometricTerminalLocation from "./BiometricTerminalLocation";
import FingerprintHUDCard from "./FingerprintHUDCard";

const BentoGrid = () => (
  <section
    className="relative z-10 pb-8 md:pb-12"
    style={{ background: "transparent", paddingTop: 0, marginTop: 0 }}
  >
    <div className="bio-location-grid mx-4 md:mx-auto">
      <FingerprintHUDCard />
      <BiometricTerminalLocation />
    </div>
  </section>
);

export default BentoGrid;
