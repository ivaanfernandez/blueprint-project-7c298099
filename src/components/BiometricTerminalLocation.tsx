const BiometricTerminalLocation = () => {
  const phone = "+17870000000";
  const phoneDisplay = "(787) 000-0000";
  const address = "1951 Calle Loíza, Santurce, PR 00911";
  const mapsUrl =
    "https://www.google.com/maps/search/?api=1&query=1951+Calle+Loiza+Santurce+PR+00911";

  // Embed URL — placeholder pointing at San Juan, PR. Replace with the exact
  // Google Maps embed src when available.
  const embedUrl =
    "https://www.google.com/maps?q=1951+Calle+Loiza+Santurce+PR+00911&output=embed";

  return (
    <div className="bio-terminal-card">
      {/* Terminal bar header */}
      <div className="bio-terminal-bar">
        <div className="bio-terminal-left">
          <span className="bio-terminal-dot" />
          BLUEPRINT.LAB / LOCATION_DATA
        </div>
        <div className="bio-terminal-right">v2.0.4</div>
      </div>

      {/* Map area con crosshair y badge OPEN NOW */}
      <div className="bio-map-wrap">
        <iframe
          src={embedUrl}
          title="Blueprint Lab location map"
          loading="lazy"
          {...({ importance: "low" } as any)}
          referrerPolicy="no-referrer-when-downgrade"
          className="bio-map-iframe"
        />
        <div className="bio-map-crosshair" aria-hidden />
        <div className="bio-open-now">
          <span className="bio-open-now-dot" />
          OPEN NOW
        </div>
      </div>

      {/* Content rows */}
      <div className="bio-content">
        <div className="bio-row-name">Blueprint Lab</div>

        <div className="bio-row">
          <span className="bio-row-prefix">ADDR</span>
          <span className="bio-row-value">{address}</span>
        </div>

        <div className="bio-row">
          <span className="bio-row-prefix">STATUS</span>
          <span className="bio-row-value">
            <span className="bio-status-active">
              <span className="bio-status-dot" />
              ACTIVE
            </span>
          </span>
        </div>

        <div className="bio-row">
          <span className="bio-row-prefix">CLOSES</span>
          <span className="bio-row-value">
            <span className="bio-counter">0H 56M</span>
          </span>
        </div>

        <div className="bio-row">
          <span className="bio-row-prefix">SLOTS</span>
          <span className="bio-row-value">
            <span className="bio-counter">10</span> / 24
          </span>
        </div>

        <div className="bio-row">
          <span className="bio-row-prefix">PHONE</span>
          <span className="bio-row-value bio-phone-value">{phoneDisplay}</span>
        </div>
      </div>

      {/* Action buttons: CALL + OPEN IN MAPS */}
      <div className="bio-actions">
        <a href={`tel:${phone}`} className="bio-action" aria-label="Call Blueprint Lab">
          ◉ CALL
        </a>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bio-action bio-action-primary"
          aria-label="Open in Google Maps"
        >
          ▸ OPEN IN MAPS
        </a>
      </div>
    </div>
  );
};

export default BiometricTerminalLocation;
