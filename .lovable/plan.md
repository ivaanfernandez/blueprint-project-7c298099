

## Create New Home Page + Restructure Routing

### Files to create
**`src/pages/Home.tsx`** — New white-background home page with:
- `showDock` prop, same pattern as MainLanding
- `motion.div` wrapper with fade-in (0.8s), background `#FFFFFF`
- Fixed dock at top center (z-50), adapted for light background:
  - Container: `rgba(0,0,0,0.06)`, `backdrop-filter: blur(12px)`, `border: 1px solid rgba(0,0,0,0.1)`, `borderRadius: 20px`
  - Same `Dock`/`DockIcon` components, same `FingerprintSVG` (copied from MainLanding)
  - Blue → `/huella-azul`, Red → `/huella-roja`, Green → `/huella-verde` (all use `navigate()`)
  - Same glow/drop-shadow, same tooltips
- Centered content block (`min-h-screen flex items-center justify-center`):
  - Eyebrow: "WELCOME TO" — gray `#6B7280`, uppercase, `letter-spacing: 0.3em`, Space Grotesk
  - Headline: "BLUEPRINT PROJECT" — black `#000`, Bebas Neue, `clamp(48px, 8vw, 96px)`
  - Divider: 1px line, `#D1D5DB`, `max-width: 120px`, centered, `margin: 24px auto`
  - Body: "The system is loading. Your blueprint awaits." — `#6B7280`, Space Grotesk, 16px

### Files to modify

**`src/App.tsx`**
- Import `Home` from `./pages/Home`
- Route `/` → `<Home showDock={showDock} />`
- Route `/huella-azul` → `<MainLanding showDock={showDock} />`
- Keep `/huella-roja`, `/huella-verde`, `*` unchanged

**`src/pages/MainLanding.tsx`**
- In the dock `onClick` handler: for the blue fingerprint (`#1A6BFF`), change behavior to `navigate("/")` instead of scrolling to section. Red and green keep current scroll-or-navigate logic.
- Simplest approach: check `h.color === "#1A6BFF"` in the onClick, and if so, `navigate("/")` directly.

### No changes to
- `BiometricScan`, `HuellaRoja`, `HuellaVerde`, `NotFound`
- Any styles/layout in MainLanding beyond the blue dock icon click handler
- Desktop or mobile styles

