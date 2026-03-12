import { useState, useCallback } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import BiometricScan from "./components/BiometricScan";
import MainLanding from "./pages/MainLanding";
import HuellaAzul from "./pages/HuellaAzul";
import HuellaRoja from "./pages/HuellaRoja";
import HuellaVerde from "./pages/HuellaVerde";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => {
  const [introComplete, setIntroComplete] = useState(false);
  const handleComplete = useCallback(() => setIntroComplete(true), []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {!introComplete && <BiometricScan onComplete={handleComplete} />}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLanding />} />
            <Route path="/huella-azul" element={<HuellaAzul />} />
            <Route path="/huella-roja" element={<HuellaRoja />} />
            <Route path="/huella-verde" element={<HuellaVerde />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
