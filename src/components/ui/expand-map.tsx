import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LocationMapProps {
  title: string;
  address: string;
  hours: string;
  mapUrl: string;
}

export function LocationMap({ title, address, hours, mapUrl }: LocationMapProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      onClick={() => setExpanded(!expanded)}
      style={{
        background: "rgba(0,10,30,0.95)",
        border: "1px solid rgba(26,107,255,0.25)",
        borderRadius: "16px",
        padding: "24px",
        cursor: "pointer",
        overflow: "hidden",
      }}
      whileHover={{ borderColor: "rgba(26,107,255,0.5)" }}
      transition={{ layout: { duration: 0.35, ease: "easeInOut" } }}
    >
      {/* Header row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <p style={{ color: "#1A6BFF", fontSize: "10px", letterSpacing: "0.3em", marginBottom: "6px" }}>
            {title}
          </p>
          <p style={{ color: "#fff", fontSize: "16px", fontWeight: 600 }}>{address}</p>
        </div>
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M5 8L10 13L15 8" stroke="rgba(26,107,255,0.6)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </motion.div>
      </div>

      {/* Expandable content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ marginTop: "16px", borderTop: "1px solid rgba(26,107,255,0.15)", paddingTop: "16px" }}>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", marginBottom: "12px" }}>{hours}</p>
              <div
                style={{
                  borderRadius: "12px",
                  overflow: "hidden",
                  border: "1px solid rgba(26,107,255,0.2)",
                  height: "200px",
                }}
              >
                <iframe
                  src={mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(0.9) contrast(1.1)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={title}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
