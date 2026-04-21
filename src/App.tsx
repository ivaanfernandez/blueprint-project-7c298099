import { useState, useCallback, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import BiometricScan from "./components/BiometricScan";
import ScrollToTop from "@/components/ScrollToTop";
import AnimatedRoutes from "@/components/AnimatedRoutes";

const queryClient = new QueryClient();

type Phase = "scan" | "landing";

// ── TEST-MODE BYPASS DETECTION (opt-in, runs once at module load).
//    Real users never set these flags, so production behavior is unchanged.
//    Triggers:
//      - ?e2e=1 query param
//      - localStorage.bp_skip_intro === "1"
//      - window.__BP_E2E__ === true
const detectBypass = (): boolean => {
  if (typeof window === "undefined") return false;
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get("e2e") === "1") return true;
    if (window.localStorage?.getItem("bp_skip_intro") === "1") return true;
    if ((window as unknown as { __BP_E2E__?: boolean }).__BP_E2E__ === true) return true;
  } catch {
    // localStorage may throw in private mode — ignore.
  }
  return false;
};

// ── NO-MOTION FLAG: sets data-no-motion on <html> so CSS + JS guards
//    can short-circuit all animations/transitions for visual regression tests.
const detectNoMotion = (): boolean => {
  if (typeof window === "undefined") return false;
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get("nomotion") === "1") return true;
    if (window.localStorage?.getItem("bp_no_motion") === "1") return true;
  } catch {
    // ignore
  }
  return false;
};

const BYPASS = detectBypass();

if (typeof document !== "undefined" && detectNoMotion()) {
  document.documentElement.dataset.noMotion = "true";
}

const App = () => {
  const [phase, setPhase] = useState<Phase>(BYPASS ? "landing" : "scan");
  const [showDock, setShowDock] = useState(BYPASS);

  const handleScanComplete = useCallback(() => setPhase("landing"), []);

  useEffect(() => {
    if (phase === "landing" && !showDock) {
      const timer = setTimeout(() => setShowDock(true), 100);
      return () => clearTimeout(timer);
    }
  }, [phase, showDock]);

  // ── E2E ESCAPE HATCH: Playwright can dispatch `bp:force-complete-intro`
  //    or call window.__BP_FORCE_COMPLETE__() to skip the biometric scan
  //    instantly without depending on its 5-second timer.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const force = () => {
      setPhase("landing");
      setShowDock(true);
    };
    (window as unknown as { __BP_FORCE_COMPLETE__?: () => void }).__BP_FORCE_COMPLETE__ = force;
    window.addEventListener("bp:force-complete-intro", force);
    return () => {
      window.removeEventListener("bp:force-complete-intro", force);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {phase === "scan" && <BiometricScan onComplete={handleScanComplete} />}
        {phase === "landing" && (
          <BrowserRouter>
            <ScrollToTop />
            <AnimatedRoutes showDock={showDock} />
          </BrowserRouter>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
