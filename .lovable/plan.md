

## Plan: Global Color Swap — Hack Bar → Red, Reset → Green

### Summary
Swap colors so Hack Bar uses Red (#FF3B3B) and Reset uses Green (#22C55E) everywhere they're currently reversed. Several places already have the correct mapping; only the mismatched ones need changes.

### File 1: `src/pages/Home.tsx`

**Radar Orbital Section (lines 685-747):**
- **Hack Bar node** (bottom-left, line 696): change `navigate("/huella-verde")` → `navigate("/huella-roja")`; swap all green colors to red (`#22C55E` → `#FF3B3B`, `rgba(34,197,94,...)` → `rgba(255,59,59,...)`)
- **Reset node** (bottom-right, line 728): change `navigate("/huella-roja")` → `navigate("/huella-verde")`; swap all red colors to green (`#FF3B3B` → `#22C55E`, `rgba(255,59,59,...)` → `rgba(34,197,94,...)`)
- **Connector lines** (lines 622-633): swap bottom-left connector from green gradient to red; swap bottom-right from red to green

No other changes in Home.tsx — the Dock (HUELLAS array), Programs section, About timeline, and Footer button glows are already correct.

### File 2: `src/components/BentoGrid.tsx`

**FINGERPRINT_CARDS array (lines 5-29):**
- First card (Hack Bar): swap `#22C55E` → `#FF3B3B` and all `rgba(34,197,94,...)` → `rgba(255,59,59,...)`
- Second card (Reset): swap `#FF3B3B` → `#22C55E` and all `rgba(255,59,59,...)` → `rgba(34,197,94,...)`
- The "LIVE" dot (line 113) uses `#22C55E` but it's a generic live indicator, not pillar-specific — leave unchanged.

### File 3: `src/components/PricingSection.tsx`

**PLANS array (lines 67-98):**
- BLUEPRINT+ (line 69): swap `color: "#22C55E"` → `"#FF3B3B"` (associated with Hack Bar nutrition)
- BLUEPRINT ELITE (line 85): swap `color: "#FF3B3B"` → `"#22C55E"` (associated with Reset recovery)

**Decorative fingerprint dots (lines 36-37, 250-253):** These are just decorative trio dots (blue/green/red). Leave unchanged — they're not pillar-specific.

**"Save 15%" badge (line 381):** Uses green — this is a generic UI indicator, not pillar-specific. Leave unchanged.

### File 4: `src/pages/HuellaRoja.tsx`
- Change display text from `"HUELLA ROJA"` → `"HACK BAR"`

### File 5: `src/pages/HuellaVerde.tsx`
- Change display text from `"HUELLA VERDE"` → `"RESET"`

### File 6: `src/components/Footer.tsx`
- Decorative dots (blue/green/red) — leave unchanged, not pillar-specific.

### Files NOT changed
- `src/App.tsx` — routes already correct (/huella-roja → HuellaRoja, /huella-verde → HuellaVerde)
- `src/pages/MainLanding.tsx` — HUELLAS array already has correct mapping (Red=Hack Bar, Green=Reset)
- `src/components/Footer.tsx` — decorative only
- No routing paths change

### Total: 5 files modified
- `src/pages/Home.tsx` — Radar nodes + connectors
- `src/components/BentoGrid.tsx` — FINGERPRINT_CARDS colors
- `src/components/PricingSection.tsx` — PLANS colors
- `src/pages/HuellaRoja.tsx` — display text
- `src/pages/HuellaVerde.tsx` — display text

