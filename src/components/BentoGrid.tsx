import { lazy, Suspense } from "react";
import LazyMount from "./LazyMount";

// Lazy-loaded heavy components (below-the-fold)
const FingerprintHUDCard = lazy(() => import("./FingerprintHUDCard"));
const BiometricTerminalLocation = lazy(() => import("./BiometricTerminalLocation"));

const BentoGrid = () => (
  <section
    className="relative z-10 pb-8 md:pb-12"
    style={{ background: "transparent", paddingTop: 0, marginTop: 0 }}
  >
    <div className="bio-location-grid mx-4 md:mx-auto">
      <LazyMount rootMargin="300px" placeholderHeight="520px">
        <Suspense fallback={<div className="lazy-mount-skeleton" style={{ minHeight: "520px" }}><div className="lazy-mount-skeleton-pulse" /></div>}>
          <FingerprintHUDCard />
        </Suspense>
      </LazyMount>
      <LazyMount rootMargin="300px" placeholderHeight="520px">
        <Suspense fallback={<div className="lazy-mount-skeleton" style={{ minHeight: "520px" }}><div className="lazy-mount-skeleton-pulse" /></div>}>
          <BiometricTerminalLocation />
        </Suspense>
      </LazyMount>
    </div>
  </section>
);

export default BentoGrid;
