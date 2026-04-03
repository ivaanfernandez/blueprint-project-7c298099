import React, { useState, useEffect, CSSProperties } from 'react';

interface BeamData {
  id: number;
  type: 'primary' | 'secondary';
  style: CSSProperties;
}

interface CybercoreBackgroundProps {
  beamCount?: number;
}

const CybercoreBackground: React.FC<CybercoreBackgroundProps> = ({ beamCount = 50 }) => {
  const [beams, setBeams] = useState<BeamData[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: beamCount }).map((_, i) => {
      const riseDur = Math.random() * 3 + 5;
      const fadeDur = riseDur;
      const type: 'primary' | 'secondary' = Math.random() < 0.15 ? 'secondary' : 'primary';
      return {
        id: i,
        type,
        style: {
          left: `${Math.random() * 100}%`,
          width: `${Math.floor(Math.random() * 2) + 1}px`,
          animationDelay: `${Math.random() * 6}s`,
          animationDuration: `${riseDur}s, ${fadeDur}s`,
        } as CSSProperties,
      };
    });
    setBeams(generated);
  }, [beamCount]);

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: 0,
    }}>
      {/* Main ambient glow */}
      <div style={{
        position: 'absolute',
        bottom: '-20%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80%',
        height: '60%',
        background: 'radial-gradient(ellipse at center, rgba(26,107,255,0.08) 0%, transparent 70%)',
        animation: 'cyberMainGlow 4s ease-in-out infinite alternate',
      }} />

      {/* Floor glow */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '60%',
        height: '2px',
        background: 'linear-gradient(90deg, transparent, rgba(26,107,255,0.3), transparent)',
        boxShadow: '0 0 20px 5px rgba(26,107,255,0.1)',
        animation: 'cyberFloorGlow 3s ease-in-out infinite',
      }} />

      {/* Beams container */}
      <div style={{
        position: 'absolute',
        inset: 0,
      }}>
        {beams.map((beam) => (
          <div
            key={beam.id}
            style={{
              position: 'absolute',
              bottom: 0,
              height: '100%',
              background: beam.type === 'secondary'
                ? 'linear-gradient(to top, rgba(26,107,255,0.4), rgba(26,107,255,0.1) 30%, transparent 80%)'
                : 'linear-gradient(to top, rgba(26,107,255,0.2), rgba(26,107,255,0.05) 40%, transparent 70%)',
              animationName: 'cyberRise, cyberFade',
              animationTimingFunction: 'linear, ease-in-out',
              animationIterationCount: 'infinite',
              ...beam.style,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default CybercoreBackground;
