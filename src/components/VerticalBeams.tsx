import React, { useEffect, useState } from 'react';

interface BeamData {
  id: number;
  style: React.CSSProperties;
}

interface VerticalBeamsProps {
  beamCount?: number;
}

const VerticalBeams: React.FC<VerticalBeamsProps> = ({ beamCount = 40 }) => {
  const [beams, setBeams] = useState<BeamData[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: beamCount }).map((_, i) => {
      const width = Math.random() * 30 + 8;
      const left = Math.random() * 100;
      const opacity = Math.random() * 0.07 + 0.02;
      const duration = Math.random() * 4 + 6;
      const delay = Math.random() * 8;

      return {
        id: i,
        style: {
          position: 'absolute' as const,
          left: `${left}%`,
          top: 0,
          width: `${width}px`,
          height: '100%',
          background: `linear-gradient(180deg, transparent 0%, rgba(255,255,255,${opacity}) 30%, rgba(255,255,255,${opacity * 1.5}) 50%, rgba(255,255,255,${opacity}) 70%, transparent 100%)`,
          filter: `blur(${Math.random() * 8 + 4}px)`,
          animation: `beamPulse ${duration}s ease-in-out ${delay}s infinite alternate`,
          pointerEvents: 'none' as const,
        },
      };
    });
    setBeams(generated);
  }, [beamCount]);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {/* Base gradient for depth */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 50% 40%, rgba(30,30,60,1) 0%, rgba(7,6,18,1) 70%)',
      }} />

      {/* Vertical beams */}
      {beams.map((beam) => (
        <div key={beam.id} style={beam.style} />
      ))}

      {/* Center highlight glow */}
      <div style={{
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60%',
        height: '50%',
        background: 'radial-gradient(ellipse, rgba(100,100,200,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Bottom fade to solid black */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '30%',
        background: 'linear-gradient(to top, #070612, transparent)',
        pointerEvents: 'none',
      }} />
    </div>
  );
};

export default VerticalBeams;
