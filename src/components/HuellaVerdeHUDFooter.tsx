import { useEffect, useState } from "react";

const HuellaVerdeHUDFooter = () => {
  const [gaugeValue, setGaugeValue] = useState(0);

  useEffect(() => {
    const target = 94;
    const duration = 2000;
    const startTime = Date.now();
    let raf = 0;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setGaugeValue(Math.floor(eased * target));
      if (progress < 1) raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Gauge geometry: 270° arc from -135° (bottom-left) to +135° (bottom-right)
  // We rotate the SVG container -90° so 0% points at -135deg from top.
  // Simpler: needle angle directly: -135 (0%) → +135 (100%)
  const needleAngle = -135 + (gaugeValue / 100) * 270;

  // Arc path: 270° centered, starting bottom-left
  // Using radius 50, center (60,60). Start angle 135° (bottom-left), sweep 270° clockwise
  const polar = (cx: number, cy: number, r: number, deg: number) => {
    const rad = ((deg - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  };
  const arcPath = (startDeg: number, endDeg: number, r: number) => {
    const start = polar(60, 60, r, endDeg);
    const end = polar(60, 60, r, startDeg);
    const large = endDeg - startDeg <= 180 ? "0" : "1";
    return `M ${start.x} ${start.y} A ${r} ${r} 0 ${large} 0 ${end.x} ${end.y}`;
  };

  // Background arc spans -135 → +135 (i.e. 225° → 495°/135°). Use 225 → 495.
  const bgArc = arcPath(225, 495, 50);
  const progressEndDeg = 225 + (gaugeValue / 100) * 270;
  const progArc = arcPath(225, progressEndDeg, 50);

  return (
    <footer className="hud-footer">
      {/* Topographic grid background */}
      <div className="hud-topo-grid" aria-hidden="true" />

      {/* Floating molecular structures */}
      <svg
        className="hud-molecules"
        viewBox="0 0 1200 480"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        {/* Molecule 1 — serotonin-like */}
        <g
          className="molecule"
          style={{ transformOrigin: "180px 110px", transformBox: "fill-box" } as React.CSSProperties}
        >
          <polygon
            points="180,80 210,95 210,125 180,140 150,125 150,95"
            fill="none"
            stroke="rgba(34,197,94,0.35)"
            strokeWidth="1"
          />
          <line x1="210" y1="95" x2="240" y2="80" stroke="rgba(34,197,94,0.3)" strokeWidth="1" />
          <line x1="240" y1="80" x2="265" y2="95" stroke="rgba(34,197,94,0.3)" strokeWidth="1" />
          <circle cx="240" cy="80" r="3" fill="rgba(125,249,255,0.6)" />
          <circle cx="265" cy="95" r="3" fill="rgba(34,197,94,0.7)" />
        </g>

        {/* Molecule 2 — dopamine-like */}
        <g
          className="molecule molecule-2"
          style={{ transformOrigin: "1000px 360px", transformBox: "fill-box" } as React.CSSProperties}
        >
          <polygon
            points="1000,330 1028,344 1028,372 1000,386 972,372 972,344"
            fill="none"
            stroke="rgba(34,197,94,0.3)"
            strokeWidth="1"
          />
          <line x1="972" y1="344" x2="945" y2="330" stroke="rgba(34,197,94,0.3)" strokeWidth="1" />
          <line x1="945" y1="330" x2="945" y2="300" stroke="rgba(34,197,94,0.3)" strokeWidth="1" />
          <circle cx="945" cy="330" r="3" fill="rgba(34,197,94,0.6)" />
          <circle cx="945" cy="300" r="3" fill="rgba(125,249,255,0.5)" />
        </g>

        {/* Molecule 3 — small hexagon */}
        <g
          className="molecule molecule-3"
          style={{ transformOrigin: "950px 90px", transformBox: "fill-box" } as React.CSSProperties}
        >
          <polygon
            points="950,70 968,80 968,100 950,110 932,100 932,80"
            fill="none"
            stroke="rgba(125,249,255,0.3)"
            strokeWidth="1"
          />
          <circle cx="950" cy="70" r="2.5" fill="rgba(34,197,94,0.6)" />
        </g>

        {/* Extra small molecule bottom-left */}
        <g
          className="molecule molecule-2"
          style={{ transformOrigin: "120px 380px", transformBox: "fill-box" } as React.CSSProperties}
        >
          <polygon
            points="120,360 138,370 138,390 120,400 102,390 102,370"
            fill="none"
            stroke="rgba(34,197,94,0.25)"
            strokeWidth="1"
          />
        </g>
      </svg>

      {/* Top label */}
      <div className="hud-label-top">
        <span className="hud-label-dot" />
        <span>SYSTEM LAB · BIOMETRIC OUTPUT</span>
        <span className="hud-label-dot" />
      </div>

      {/* 3 main panels */}
      <div className="hud-panels">
        {/* Panel 1: DNA Helix */}
        <div className="hud-panel">
          <span className="corner corner-tl" />
          <span className="corner corner-tr" />
          <span className="corner corner-bl" />
          <span className="corner corner-br" />

          <svg className="dna-helix" viewBox="0 0 80 160" aria-hidden="true">
            <g className="dna-rotate">
              {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
                const y = i * 20 + 10;
                const phase = (i / 8) * Math.PI * 3;
                const x1 = 40 + Math.sin(phase) * 22;
                const x2 = 40 - Math.sin(phase) * 22;
                const isCyan = i % 2 === 0;
                return (
                  <g key={i}>
                    <line
                      x1={x1}
                      y1={y}
                      x2={x2}
                      y2={y}
                      stroke="rgba(34,197,94,0.4)"
                      strokeWidth="1"
                    />
                    <circle cx={x1} cy={y} r="3" fill={isCyan ? "#7DF9FF" : "#22C55E"} />
                    <circle cx={x2} cy={y} r="3" fill={isCyan ? "#22C55E" : "#7DF9FF"} />
                  </g>
                );
              })}
            </g>
          </svg>

          <p className="hud-panel-label">GENETIC BLUEPRINT</p>
          <p className="hud-panel-value">23 CHR · ACTIVE</p>
        </div>

        {/* Panel 2: Fingerprint + ECG */}
        <div className="hud-panel hud-panel-center">
          <span className="corner corner-tl" />
          <span className="corner corner-tr" />
          <span className="corner corner-bl" />
          <span className="corner corner-br" />

          <svg className="fingerprint-svg" viewBox="0 0 60 72" aria-hidden="true">
            <g>
              {[12, 18, 24, 30, 36].map((ry, i) => (
                <ellipse
                  key={i}
                  cx="30"
                  cy="38"
                  rx={ry * 0.7}
                  ry={ry}
                  stroke="#22C55E"
                  strokeWidth="1.5"
                  fill="none"
                />
              ))}
              <path
                d="M 25 36 Q 28 28 30 26 Q 32 28 35 36 Q 32 44 30 46 Q 28 44 25 36Z"
                stroke="#22C55E"
                strokeWidth="1.2"
                fill="none"
              />
            </g>
          </svg>

          {/* ECG line */}
          <svg className="ecg-line" viewBox="0 0 200 30" aria-hidden="true">
            <path
              className="ecg-path"
              d="M 0 15 L 30 15 L 40 15 L 50 5 L 60 25 L 70 0 L 80 30 L 90 15 L 120 15 L 130 15 L 140 8 L 150 22 L 160 15 L 200 15"
              stroke="#22C55E"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <p className="hud-panel-label">RESET SYSTEM</p>
          <div className="hud-active">
            <span className="hud-active-dot" />
            <span className="hud-panel-value">ACTIVE</span>
          </div>
        </div>

        {/* Panel 3: Wellness Gauge */}
        <div className="hud-panel">
          <span className="corner corner-tl" />
          <span className="corner corner-tr" />
          <span className="corner corner-bl" />
          <span className="corner corner-br" />

          <div className="gauge-wrapper">
            <svg className="gauge-svg" viewBox="0 0 120 120" aria-hidden="true">
              {/* Background arc */}
              <path
                d={bgArc}
                stroke="rgba(34,197,94,0.15)"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
              />
              {/* Progress arc */}
              <path
                d={progArc}
                stroke="#22C55E"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                style={{ filter: "drop-shadow(0 0 6px rgba(34,197,94,0.7))" }}
              />
              {/* Needle */}
              <line
                x1="60"
                y1="60"
                x2="60"
                y2="22"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
                style={{
                  transformOrigin: "60px 60px",
                  transform: `rotate(${needleAngle}deg)`,
                  transition: "transform 0.05s linear",
                }}
              />
              <circle cx="60" cy="60" r="4" fill="#22C55E" />
            </svg>
            <span className="gauge-value">{gaugeValue}%</span>
          </div>

          <p className="hud-panel-label">RECOVERY INDEX</p>
          <p className="hud-panel-value">OPTIMAL</p>
        </div>
      </div>

      {/* Footer text */}
      <div className="hud-footer-text">
        <span>Reset — Blueprint Project</span>
        <span className="hud-footer-divider">·</span>
        <span>© 2026 Blueprint Project</span>
      </div>
    </footer>
  );
};

export default HuellaVerdeHUDFooter;
