import { AnimatePresence, motion } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "@/pages/Home";
import MainLanding from "@/pages/MainLanding";
import HuellaRoja from "@/pages/HuellaRoja";
import HuellaVerde from "@/pages/HuellaVerde";
import NotFound from "@/pages/NotFound";

interface AnimatedRoutesProps {
  showDock: boolean;
}

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const pageTransition = {
  duration: 0.4,
  ease: "easeInOut" as const,
};

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial="initial"
    animate="animate"
    exit="exit"
    variants={pageVariants}
    transition={pageTransition}
  >
    {children}
  </motion.div>
);

const AnimatedRoutes = ({ showDock }: AnimatedRoutesProps) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home showDock={showDock} /></PageWrapper>} />
        <Route path="/huella-azul" element={<PageWrapper><MainLanding showDock={showDock} /></PageWrapper>} />
        <Route path="/huella-roja" element={<PageWrapper><HuellaRoja showDock={showDock} /></PageWrapper>} />
        <Route path="/huella-verde" element={<PageWrapper><HuellaVerde showDock={showDock} /></PageWrapper>} />
        <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
