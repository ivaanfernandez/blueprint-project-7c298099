import { useState, useEffect } from "react";

// Horario del gym (formato 24h)
const GYM_HOURS: Record<number, { open: number | null; close: number | null }> = {
  0: { open: null, close: null }, // Domingo: cerrado
  1: { open: 5, close: 22 },
  2: { open: 5, close: 22 },
  3: { open: 5, close: 22 },
  4: { open: 5, close: 22 },
  5: { open: 5, close: 22 },
  6: { open: 7, close: 20 }, // Sábado: 7am-8pm
};

// Hora actual en Puerto Rico (AST, UTC-4)
const getPRTime = () => {
  const now = new Date();
  const prTimeString = now.toLocaleString("en-US", {
    timeZone: "America/Puerto_Rico",
  });
  return new Date(prTimeString);
};

const getGymStatus = () => {
  const prTime = getPRTime();
  const day = prTime.getDay();
  const hour = prTime.getHours();
  const minutes = prTime.getMinutes();
  const todayHours = GYM_HOURS[day];

  if (todayHours.open === null || todayHours.close === null) {
    return { isOpen: false, label: "CLOSED", nextChange: "Opens Monday 5:00 AM" };
  }

  const currentTimeDecimal = hour + minutes / 60;

  if (currentTimeDecimal >= todayHours.open && currentTimeDecimal < todayHours.close) {
    const hoursUntilClose = todayHours.close - currentTimeDecimal;
    const h = Math.floor(hoursUntilClose);
    const m = Math.floor((hoursUntilClose - h) * 60);
    return {
      isOpen: true,
      label: "OPEN NOW",
      nextChange: `Closes in ${h}h ${m}m`,
    };
  }

  if (currentTimeDecimal < todayHours.open) {
    const hoursUntilOpen = todayHours.open - currentTimeDecimal;
    const h = Math.floor(hoursUntilOpen);
    const m = Math.floor((hoursUntilOpen - h) * 60);
    return {
      isOpen: false,
      label: "CLOSED",
      nextChange: `Opens in ${h}h ${m}m`,
    };
  }

  return { isOpen: false, label: "CLOSED", nextChange: "Opens tomorrow 5:00 AM" };
};

// Generar número de cupos/slots disponibles (gimmick de conversión)
const getSlotsOpen = () => {
  const prTime = getPRTime();
  const hour = prTime.getHours();

  // En horas pico hay MENOS slots (mayor urgencia). En horas bajas hay MÁS.
  let baseMin = 8;
  let baseMax = 18;

  if (hour >= 6 && hour < 9) { baseMin = 2; baseMax = 6; }
  else if (hour >= 9 && hour < 12) { baseMin = 5; baseMax = 12; }
  else if (hour >= 12 && hour < 16) { baseMin = 8; baseMax = 16; }
  else if (hour >= 16 && hour < 20) { baseMin = 2; baseMax = 5; }
  else if (hour >= 20 && hour < 22) { baseMin = 6; baseMax = 12; }

  return Math.floor(Math.random() * (baseMax - baseMin + 1)) + baseMin;
};

const LocationCardInteractive = () => {
  const [gymStatus, setGymStatus] = useState(getGymStatus());
  const [slotsOpen, setSlotsOpen] = useState(getSlotsOpen());

  useEffect(() => {
    const statusInterval = setInterval(() => {
      setGymStatus(getGymStatus());
    }, 60000);

    const slotsInterval = setInterval(() => {
      setSlotsOpen(getSlotsOpen());
    }, 30000);

    return () => {
      clearInterval(statusInterval);
      clearInterval(slotsInterval);
    };
  }, []);

  const statusColor = gymStatus.isOpen ? "#22C55E" : "rgba(255, 255, 255, 0.5)";
  const statusGlow = gymStatus.isOpen
    ? "0 0 8px rgba(34, 197, 94, 0.8)"
    : "0 0 6px rgba(255, 255, 255, 0.3)";

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        background: "#000000",
        border: "1px solid rgba(26, 107, 255, 0.25)",
        borderRadius: 16,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Corner brackets */}
      <div style={{ position: "absolute", top: 10, left: 10, width: 16, height: 16, borderTop: "2px solid rgba(26, 107, 255, 0.6)", borderLeft: "2px solid rgba(26, 107, 255, 0.6)", pointerEvents: "none", zIndex: 5 }} />
      <div style={{ position: "absolute", top: 10, right: 10, width: 16, height: 16, borderTop: "2px solid rgba(26, 107, 255, 0.6)", borderRight: "2px solid rgba(26, 107, 255, 0.6)", pointerEvents: "none", zIndex: 5 }} />
      <div style={{ position: "absolute", bottom: 10, left: 10, width: 16, height: 16, borderBottom: "2px solid rgba(26, 107, 255, 0.6)", borderLeft: "2px solid rgba(26, 107, 255, 0.6)", pointerEvents: "none", zIndex: 5 }} />
      <div style={{ position: "absolute", bottom: 10, right: 10, width: 16, height: 16, borderBottom: "2px solid rgba(26, 107, 255, 0.6)", borderRight: "2px solid rgba(26, 107, 255, 0.6)", pointerEvents: "none", zIndex: 5 }} />

      {/* Status badge arriba-derecha */}
      <div
        style={{
          position: "absolute",
          top: 16,
          right: 16,
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "4px 10px",
          background: "rgba(0, 0, 0, 0.75)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          borderRadius: 999,
          fontFamily: "'Orbitron', sans-serif",
          fontSize: 10,
          letterSpacing: "0.15em",
          color: "rgba(255, 255, 255, 0.9)",
          textTransform: "uppercase",
          zIndex: 6,
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: statusColor,
            boxShadow: statusGlow,
            animation: gymStatus.isOpen ? "pulse-dot 2s ease-in-out infinite" : "none",
          }}
        />
        {gymStatus.label}
      </div>

      {/* Google Maps embed */}
      <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 10", overflow: "hidden", background: "#0a0a0a" }}>
        <iframe
          title="Blueprint Project Location"
          src="https://www.google.com/maps?q=18.4488,-66.0614&z=16&output=embed"
          width="100%"
          height="100%"
          style={{
            border: 0,
            position: "absolute",
            inset: 0,
            filter: "invert(90%) hue-rotate(180deg) brightness(0.9) contrast(1.1)",
            zIndex: 1,
          }}
          loading="lazy"
          allowFullScreen={false}
          referrerPolicy="no-referrer-when-downgrade"
        />

        {/* Pin animado azul con pulse y onda expandiéndose */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            zIndex: 4,
          }}
        >
          {/* Onda 1 */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: "2px solid rgba(26, 107, 255, 0.8)",
              animation: "wave-expand 2.5s ease-out infinite",
            }}
          />
          {/* Onda 2 */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: "2px solid rgba(26, 107, 255, 0.8)",
              animation: "wave-expand 2.5s ease-out infinite",
              animationDelay: "1.25s",
            }}
          />
          {/* Pin central */}
          <div
            style={{
              position: "relative",
              width: 20,
              height: 20,
              borderRadius: "50%",
              background: "#1A6BFF",
              boxShadow: "0 0 12px rgba(26, 107, 255, 0.9), 0 0 24px rgba(26, 107, 255, 0.5)",
              animation: "pulse-pin 2s ease-in-out infinite",
            }}
          />
        </div>

        {/* Overlay sutil */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 100%)",
            pointerEvents: "none",
            zIndex: 2,
          }}
        />
      </div>

      {/* Info block */}
      <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: 16 }}>
        <h3 style={{ fontFamily: "'Michroma', sans-serif", fontSize: 22, fontWeight: 500, color: "#FFFFFF", margin: 0, lineHeight: 1.2 }}>
          Blueprint Lab
        </h3>

        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 400, color: "rgba(255, 255, 255, 0.75)", margin: 0, lineHeight: 1.5 }}>
          1951 Calle Loíza, Santurce, PR 00911
        </p>

        {/* Status next change */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "'Inter', sans-serif", fontSize: 14, color: "rgba(255, 255, 255, 0.85)" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A6BFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          {gymStatus.nextChange}
        </div>

        {/* Slots open now (gimmick de urgencia / conversión) */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "'Inter', sans-serif", fontSize: 14, color: "rgba(255, 255, 255, 0.85)" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A6BFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-4" />
            <polyline points="9 6 12 3 15 6" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          <span>
            <span style={{ color: "#1A6BFF", fontWeight: 600 }}>{slotsOpen}</span>{" "}
            slots open
          </span>
        </div>

        {/* Teléfono */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "'Inter', sans-serif", fontSize: 14, color: "rgba(255, 255, 255, 0.85)" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A6BFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          (787) 000-0000
        </div>

        {/* CTA OPEN IN MAPS */}
        <a
          href="https://www.google.com/maps/search/?api=1&query=1951+Calle+Loíza,+Santurce,+PR+00911"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: "0.15em",
            color: "#1A6BFF",
            textTransform: "uppercase",
            textDecoration: "none",
            marginTop: 4,
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            cursor: "pointer",
          }}
        >
          OPEN IN MAPS →
        </a>
      </div>
    </div>
  );
};

export default LocationCardInteractive;
