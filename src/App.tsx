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

const App = () => {
  const [phase, setPhase] = useState<Phase>("scan");
  const [showDock, setShowDock] = useState(false);

  const handleScanComplete = useCallback(() => setPhase("landing"), []);

  useEffect(() => {
    if (phase === "landing") {
      const timer = setTimeout(() => setShowDock(true), 100);
      return () => clearTimeout(timer);
    }
  }, [phase]);

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
