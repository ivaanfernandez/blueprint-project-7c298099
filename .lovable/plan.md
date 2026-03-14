

## Add PulseBeams CTA Button to Hero

### 1. Create new component: `src/components/ui/pulse-beams.tsx`
- Copy the exact TypeScript code provided by user
- Exports `PulseBeams` component with animated SVG beams
- Uses framer-motion for gradient animations

### 2. Update `src/pages/MainLanding.tsx`

**Add import** at top:
```tsx
import { PulseBeams } from '@/components/ui/pulse-beams';
```

**Add constant** after HUELLAS array (around line 61):
```tsx
const heroBeams = [
  {
    path: "M0 80 H160",
    gradientConfig: {
      initial: { x1: "0%", x2: "0%", y1: "0%", y2: "0%" },
      animate: { x1: ["0%","100%","100%"], x2: ["20%","120%","120%"], y1: ["0%","0%","0%"], y2: ["0%","0%","0%"] },
      transition: { duration: 2, repeat: Infinity, repeatType: "loop", ease: "linear", repeatDelay: 1 },
    },
    connectionPoints: [{ cx: 0, cy: 80, r: 3 }, { cx: 160, cy: 80, r: 3 }]
  },
  {
    path: "M400 80 H240",
    gradientConfig: {
      initial: { x1: "100%", x2: "100%", y1: "0%", y2: "0%" },
      animate: { x1: ["100%","0%","0%"], x2: ["80%","-20%","-20%"], y1: ["0%","0%","0%"], y2: ["0%","0%","0%"] },
      transition: { duration: 2, repeat: Infinity, repeatType: "loop", ease: "linear", repeatDelay: 1, delay: 0.5 },
    },
    connectionPoints: [{ cx: 400, cy: 80, r: 3 }, { cx: 240, cy: 80, r: 3 }]
  }
];
```

**Insert CTA button** after the `</div>` closing tag of `hero-headline-wrapper` (after line 181):
```tsx
{/* CTA Button with PulseBeams */}
<div style={{ marginTop: "48px", display: "flex", justifyContent: "center" }}>
  <PulseBeams beams={heroBeams} width={400} height={160}>
    <button
      style={{
        background: 'transparent',
        border: '1px solid rgba(26,107,255,0.7)',
        borderRadius: '4px',
        padding: '16px 40px',
        color: '#FFFFFF',
        fontSize: '11px',
        fontFamily: 'Space Grotesk, sans-serif',
        fontWeight: '600',
        letterSpacing: '0.3em',
        cursor: 'pointer',
        position: 'relative',
        zIndex: 10,
        transition: 'all 0.3s ease',
        boxShadow: '0 0 20px rgba(26,107,255,0.15)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'rgba(26,107,255,0.1)';
        e.currentTarget.style.boxShadow = '0 0 30px rgba(26,107,255,0.4)';
        e.currentTarget.style.borderColor = 'rgba(26,107,255,1)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.boxShadow = '0 0 20px rgba(26,107,255,0.15)';
        e.currentTarget.style.borderColor = 'rgba(26,107,255,0.7)';
      }}
    >
      OBTÉN TU HUELLA
    </button>
  </PulseBeams>
</div>
```

### Result
Animated CTA button with pulsing beam effects, centered below headline with 48px margin-top.

