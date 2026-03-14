import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ScaleRevealProps {
  onComplete: () => void;
}

const ScaleReveal = ({ onComplete }: ScaleRevealProps) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 0),
      setTimeout(() => setPhase(2), 200),
      setTimeout(() => setPhase(3), 1600),
      setTimeout(() => onComplete(), 2200),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "#000" }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.12, borderRadius: 20, width: 280, height: 180 }}
        animate={
          phase >= 2
            ? {
                opacity: 1,
                scale: 1,
                borderRadius: 0,
                width: "100vw",
                height: "100vh",
              }
            : phase >= 1
            ? { opacity: 1, scale: 0.12, borderRadius: 20, width: 280, height: 180 }
            : { opacity: 0, scale: 0.12, borderRadius: 20, width: 280, height: 180 }
        }
        transition={
          phase >= 2
            ? { duration: 1.4, ease: [0.76, 0, 0.24, 1] }
            : { duration: 0.2, ease: "easeOut" }
        }
        style={{ overflow: "hidden", position: "relative" }}
      >
        <img
          src="/gym-interior.jpg"
          alt="Premium gym interior"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />

        {/* Dark overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={phase >= 3 ? { opacity: 0.55 } : { opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "#000",
          }}
        />

        {/* Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={phase >= 3 ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "#FFFFFF",
            fontSize: 11,
            letterSpacing: "0.35em",
            fontFamily: "'Space Grotesk', sans-serif",
            whiteSpace: "nowrap",
          }}
        >
          BLUEPRINT PROJECT
        </motion.p>
      </motion.div>
    </div>
  );
};

export default ScaleReveal;
