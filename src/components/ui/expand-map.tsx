"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LocationMapProps {
  location: string;
  coordinates: string;
}

export function LocationMap({ location, coordinates }: LocationMapProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div
      className="group relative w-full max-w-[600px] mx-auto cursor-pointer"
      onClick={toggleExpand}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          toggleExpand();
        }
      }}
      aria-expanded={isExpanded}
    >
      {/* Card Container */}
      <div
        className="relative overflow-hidden rounded-2xl transition-all duration-500 ease-out"
        style={{
          background: "#000814",
          border: "1px solid rgba(26,107,255,0.3)",
          boxShadow: isExpanded
            ? "0 0 40px rgba(26,107,255,0.15), 0 25px 50px -12px rgba(0,0,0,0.5)"
            : "0 0 20px rgba(26,107,255,0.05), 0 10px 30px -10px rgba(0,0,0,0.3)",
        }}
      >
        {/* Animated gradient border effect */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(135deg, rgba(26,107,255,0.2) 0%, transparent 50%, rgba(26,107,255,0.1) 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Content Container */}
        <div className="relative p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-3">
              {/* Location Label */}
              <div className="flex items-center gap-2">
                <motion.div
                  className="relative flex h-2 w-2"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span
                    className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                    style={{ backgroundColor: "#1A6BFF" }}
                  />
                  <span
                    className="relative inline-flex h-2 w-2 rounded-full"
                    style={{ backgroundColor: "#1A6BFF" }}
                  />
                </motion.div>
                <span
                  className="text-[10px] font-semibold tracking-[0.2em] uppercase"
                  style={{ color: "rgba(255,255,255,0.5)", fontFamily: "Space Grotesk, sans-serif" }}
                >
                  Location
                </span>
              </div>

              {/* Main Location Text */}
              <h3
                className="text-xl sm:text-2xl font-bold tracking-tight transition-colors duration-300"
                style={{ color: "#FFFFFF", fontFamily: "Rajdhani, sans-serif" }}
              >
                {location}
              </h3>

              {/* Coordinates / Address */}
              <p
                className="text-sm transition-colors duration-300"
                style={{ color: "rgba(255,255,255,0.5)", fontFamily: "Space Grotesk, sans-serif" }}
              >
                {coordinates}
              </p>
            </div>

            {/* Expand Icon */}
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="flex-shrink-0"
            >
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110"
                style={{ backgroundColor: "rgba(26,107,255,0.15)" }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(26,107,255,0.4)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </motion.div>
          </div>

          {/* Expandable Content */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                className="overflow-hidden"
              >
                <div className="pt-6">
                  {/* Divider */}
                  <div
                    className="mb-6 h-px w-full"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent 0%, rgba(26,107,255,0.3) 50%, transparent 100%)",
                    }}
                  />

                  {/* Info Grid */}
                  <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {/* Hours */}
                    <div
                      className="rounded-xl border p-4 transition-all duration-300 hover:border-opacity-50"
                      style={{
                        backgroundColor: "#000D1F",
                        borderColor: "rgba(26,107,255,0.3)",
                      }}
                    >
                      <div className="mb-2 flex items-center gap-2">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#1A6BFF"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        <span
                          className="text-xs font-medium"
                          style={{ color: "rgba(255,255,255,0.5)", fontFamily: "Space Grotesk, sans-serif" }}
                        >
                          Hours
                        </span>
                      </div>
                      <p
                        className="text-sm font-medium"
                        style={{ color: "#FFFFFF", fontFamily: "Space Grotesk, sans-serif" }}
                      >
                        Mon–Fri: 5AM–10PM
                        <br />
                        Sat–Sun: 7AM–6PM
                      </p>
                    </div>

                    {/* Contact */}
                    <div
                      className="rounded-xl border p-4 transition-all duration-300 hover:border-opacity-50"
                      style={{
                        backgroundColor: "#000D1F",
                        borderColor: "rgba(26,107,255,0.3)",
                      }}
                    >
                      <div className="mb-2 flex items-center gap-2">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#1A6BFF"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                        <span
                          className="text-xs font-medium"
                          style={{ color: "rgba(255,255,255,0.5)", fontFamily: "Space Grotesk, sans-serif" }}
                        >
                          Contact
                        </span>
                      </div>
                      <p
                        className="text-sm font-medium"
                        style={{ color: "#FFFFFF", fontFamily: "Space Grotesk, sans-serif" }}
                      >
                        +1 (787) 123-4567
                      </p>
                    </div>
                  </div>

                  {/* Map Visualization */}
                  <div
                    className="group/map relative h-[200px] w-full overflow-hidden rounded-xl sm:h-[250px]"
                    style={{
                      background: "linear-gradient(135deg, #000D1F 0%, #000814 100%)",
                      border: "1px solid rgba(26,107,255,0.3)",
                    }}
                  >
                    {/* Grid Pattern */}
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage: `
                          linear-gradient(rgba(26,107,255,0.15) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(26,107,255,0.15) 1px, transparent 1px)
                        `,
                        backgroundSize: "40px 40px",
                      }}
                    />

                    {/* Radial gradient overlay */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(circle at center, rgba(26,107,255,0.05) 0%, transparent 70%)",
                      }}
                    />

                    {/* Animated pulse rings */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="absolute h-32 w-32 rounded-full border-2"
                        style={{ borderColor: "rgba(26,107,255,0.15)" }}
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      />
                      <motion.div
                        className="absolute h-24 w-24 rounded-full border-2"
                        style={{ borderColor: "rgba(26,107,255,0.3)" }}
                        animate={{ scale: [1, 1.3, 1], opacity: [0.7, 0.3, 0.7] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                      />
                    </div>

                    {/* Map Pin */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="relative"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      >
                        {/* Pin shadow */}
                        <div
                          className="absolute -bottom-2 left-1/2 h-3 w-8 -translate-x-1/2 rounded-full blur-md"
                          style={{ backgroundColor: "rgba(26,107,255,0.4)" }}
                        />

                        {/* Pin icon */}
                        <svg
                          width="36"
                          height="44"
                          viewBox="0 0 36 44"
                          fill="none"
                          style={{ filter: "drop-shadow(0 4px 12px rgba(26,107,255,0.6))" }}
                        >
                          {/* Pin body */}
                          <path
                            d="M18 0C8.059 0 0 8.059 0 18c0 13.5 18 26 18 26s18-12.5 18-26C36 8.059 27.941 0 18 0z"
                            fill="#1A6BFF"
                          />
                          {/* Inner circle */}
                          <circle cx="18" cy="18" r="8" fill="#000814" />
                          {/* Center dot */}
                          <circle cx="18" cy="18" r="4" fill="#1A6BFF" />
                        </svg>
                      </motion.div>
                    </div>

                    {/* Corner decorations */}
                    <div
                      className="absolute left-3 top-3 h-6 w-6 border-l-2 border-t-2 opacity-50"
                      style={{ borderColor: "rgba(26,107,255,0.3)" }}
                    />
                    <div
                      className="absolute right-3 top-3 h-6 w-6 border-r-2 border-t-2 opacity-50"
                      style={{ borderColor: "rgba(26,107,255,0.3)" }}
                    />
                    <div
                      className="absolute bottom-3 left-3 h-6 w-6 border-b-2 border-l-2 opacity-50"
                      style={{ borderColor: "rgba(26,107,255,0.3)" }}
                    />
                    <div
                      className="absolute bottom-3 right-3 h-6 w-6 border-b-2 border-r-2 opacity-50"
                      style={{ borderColor: "rgba(26,107,255,0.3)" }}
                    />

                    {/* Map label */}
                    <div
                      className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1"
                      style={{ backgroundColor: "rgba(26,107,255,0.15)" }}
                    >
                      <span
                        className="text-[10px] font-semibold tracking-wider"
                        style={{ color: "#1A6BFF", fontFamily: "Space Grotesk, sans-serif" }}
                      >
                        SANTURCE, PR
                      </span>
                    </div>

                    {/* Hover overlay */}
                    <div
                      className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover/map:opacity-100"
                      style={{
                        background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)",
                      }}
                    >
                      <span
                        className="mt-20 text-sm font-medium"
                        style={{ color: "rgba(255,255,255,0.5)", fontFamily: "Space Grotesk, sans-serif" }}
                      >
                        Click for directions
                      </span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <motion.button
                    className="mt-4 w-full rounded-xl py-4 text-sm font-semibold tracking-wider transition-all duration-300"
                    style={{
                      backgroundColor: "rgba(26,107,255,0.08)",
                      color: "#FFFFFF",
                      border: "1px solid rgba(26,107,255,0.3)",
                      fontFamily: "Space Grotesk, sans-serif",
                    }}
                    whileHover={{
                      backgroundColor: "rgba(26,107,255,0.15)",
                      borderColor: "rgba(26,107,255,0.5)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(
                        `https://maps.google.com/?q=${encodeURIComponent(coordinates)}`,
                        "_blank"
                      );
                    }}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#1A6BFF"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      GET DIRECTIONS
                    </span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom animated line */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px]"
          style={{
            background: isExpanded
              ? "linear-gradient(90deg, rgba(26,107,255,0.5) 0%, rgba(26,107,255,0.3) 50%, transparent 100%)"
              : "linear-gradient(90deg, rgba(26,107,255,0.3) 0%, rgba(26,107,255,0.1) 50%, transparent 100%)",
          }}
          initial={{ width: "30%" }}
          animate={{ width: isExpanded ? "100%" : "30%" }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>
    </div>
  );
}
