const FingerprintHUDCard = () => {
  return (
    <div className="fp-hud-card">
      {/* Header */}
      <div className="fp-hud-header">
        <span className="fp-hud-header-left">SECURITY LEVEL</span>
        <span className="fp-hud-header-center">BLUEPRINT</span>
        <div className="fp-hud-header-right">
          <span className="fp-hud-pagination-dot active" />
          <span className="fp-hud-pagination-dot" />
        </div>
      </div>

      {/* Body Triptych */}
      <div className="fp-hud-body">
        {/* Fingerprint side */}
        <div className="fp-hud-side">
          <span className="fp-hud-corner fp-hud-corner-tl" />
          <span className="fp-hud-corner fp-hud-corner-tr" />
          <span className="fp-hud-corner fp-hud-corner-bl" />
          <span className="fp-hud-corner fp-hud-corner-br" />

          <div className="fp-hud-svg-wrap">
            <svg
              className="fp-hud-svg"
              viewBox="0 0 140 140"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ filter: "drop-shadow(0 0 6px rgba(59,130,246,0.7))" }}
            >
              {[18, 26, 34, 42, 50].map((ry, i) => (
                <ellipse
                  key={i}
                  cx="70"
                  cy="75"
                  rx={ry * 0.7}
                  ry={ry}
                  stroke="#3b82f6"
                  strokeWidth="1.6"
                />
              ))}
              {[20, 30, 40].map((r, i) => (
                <path
                  key={`a-${i}`}
                  d={`M ${70 - r * 0.6} ${55 - i * 4} Q 70 ${20 - i * 6} ${70 + r * 0.6} ${55 - i * 4}`}
                  stroke="#3b82f6"
                  strokeWidth="1.6"
                  fill="none"
                />
              ))}
              <path
                d="M 62 70 Q 65 60 70 58 Q 75 60 78 70 Q 75 80 70 82 Q 65 80 62 70Z"
                stroke="#3b82f6"
                strokeWidth="1.4"
                fill="none"
              />
            </svg>
            <span className="fp-hud-scan-line" />
          </div>

          <div className="fp-hud-id">USER #284 · NODE 01</div>
          <div className="fp-hud-status">
            <span className="fp-hud-status-dot" />
            VERIFIED
          </div>
        </div>

        {/* 3 paneles métricos */}
        <div className="fp-hud-panels">
          <div className="fp-hud-panel">
            <div className="fp-hud-panel-head">
              <span className="fp-hud-panel-label">HEART RATE</span>
              <span className="fp-hud-panel-trend">▲ +2</span>
            </div>
            <div className="fp-hud-panel-value-row">
              <span className="fp-hud-panel-value">142</span>
              <span className="fp-hud-panel-unit">BPM</span>
            </div>
            <div className="fp-hud-panel-bar">
              <span className="fp-hud-panel-bar-fill fp-hud-bar-3" />
            </div>
          </div>

          <div className="fp-hud-panel">
            <div className="fp-hud-panel-head">
              <span className="fp-hud-panel-label">RECOVERY SCORE</span>
              <span className="fp-hud-panel-trend">OPTIMAL</span>
            </div>
            <div className="fp-hud-panel-value-row">
              <span className="fp-hud-panel-value">94</span>
              <span className="fp-hud-panel-unit">/ 100</span>
            </div>
            <div className="fp-hud-panel-bar">
              <span className="fp-hud-panel-bar-fill" />
            </div>
          </div>

          <div className="fp-hud-panel">
            <div className="fp-hud-panel-head">
              <span className="fp-hud-panel-label">VO2 MAX</span>
              <span className="fp-hud-panel-trend">▲ +1.2</span>
            </div>
            <div className="fp-hud-panel-value-row">
              <span className="fp-hud-panel-value">52.4</span>
              <span className="fp-hud-panel-unit">ML/KG/MIN</span>
            </div>
            <div className="fp-hud-panel-bar">
              <span className="fp-hud-panel-bar-fill fp-hud-bar-2" />
            </div>
          </div>
        </div>
      </div>

      {/* Cardiac Output Footer */}
      <div className="fp-hud-cardiac">
        <div className="fp-hud-cardiac-head">
          <span className="fp-hud-cardiac-label">
            <span className="fp-hud-cardiac-live-dot" />
            CARDIAC OUTPUT · LIVE
          </span>
          <span className="fp-hud-cardiac-bpm">
            142
            <span className="fp-hud-cardiac-bpm-unit">BPM</span>
          </span>
        </div>
        <svg
          className="fp-hud-cardiac-svg"
          viewBox="0 0 600 30"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="fp-hud-cardiac-path"
            d="M 0 15 L 40 15 L 50 15 L 60 12 L 70 18 L 80 5 L 90 25 L 100 15 L 140 15 L 150 15 L 160 12 L 170 18 L 180 5 L 190 25 L 200 15 L 240 15 L 250 15 L 260 12 L 270 18 L 280 5 L 290 25 L 300 15 L 340 15 L 350 15 L 360 12 L 370 18 L 380 5 L 390 25 L 400 15 L 440 15 L 450 15 L 460 12 L 470 18 L 480 5 L 490 25 L 500 15 L 540 15 L 550 15 L 560 12 L 570 18 L 580 5 L 590 25 L 600 15"
          />
        </svg>
      </div>
    </div>
  );
};

export default FingerprintHUDCard;
