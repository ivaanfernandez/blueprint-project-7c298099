

## Plan: Create Full Hack Bar Page (HuellaRoja)

### Summary
Replace the HuellaRoja placeholder with a complete page featuring a red BiometricScan, Dock navigation, hero section, two content sections, and a footer. Also update App.tsx to pass `showDock` and handle the red scan independently.

### File 1: `src/components/BiometricScanRed.tsx` (NEW)

Clone `BiometricScan.tsx` with all `#1A6BFF` replaced by `#FF3B3B`, all `#0A3D8F` → `#5C1111`, all `#4A7FBF` → `#BF4A4A`, and the wordmark text changed to "ACCESSING HACK BAR". Same phase timing (5 seconds total). This avoids modifying the shared BiometricScan component.

### File 2: `src/pages/HuellaRoja.tsx` (REWRITE)

Complete page with these sections, all using `#FF3B3B` as accent color and `#0a0a0a` background:

**State management:**
- `useState` for scan phase (`"scan" | "ready"`)
- `useState` for showDock (delayed after scan)
- `useNavigate` from react-router-dom

**BiometricScanRed:** Shown during scan phase, triggers transition to ready.

**Dock:** Same HUELLAS array pattern as Home/MainLanding (3 fingerprints: blue→`/`, red→current page scroll, green→`/huella-verde`). Inline, same glassmorphism styling.

**Section A — Hero (split layout):**
- Flex row: left 55% (text), right 45% (placeholder image div)
- Left: Orbitron eyebrow "BLUEPRINT SYSTEM", Michroma title "HACK BAR" with TextScramble, Inter subtitle (Spanish text), red ambient glow
- Right: dark gray placeholder div with left-fade gradient overlay
- Mobile: stacks vertically, centered text

**Section B — "FUEL YOUR SYSTEM" (2 cards):**
- Michroma section title, Inter subtitle
- 2 flex cards with dark placeholder backgrounds, gradient overlays, corner brackets in red, scan line animation
- Card 1: "SUPLEMENTOS" with 3 bullet items
- Card 2: "MEAL PREP" with 3 bullet items
- Hover: translateY(-4px) + red box-shadow

**Section C — "HACKBAR STATION" (3-column grid):**
- 3 cards with dark placeholders, gradient overlays, red accent line at bottom
- Cards: "BATIDOS PERSONALIZADOS", "CAFÉ FUNCIONAL", "SNACKS BLUEPRINT"
- Hover: translateY(-4px)

**Section D — Footer:**
- Red fingerprint SVG (32px), "Hack Bar — Blueprint Project", copyright
- Border-top with red tint

**Animations:**
- CSS keyframes: `scanLine`, `fadeUp` (inline `<style>` tag)
- Framer Motion `motion.div` with `whileInView` for fade-up on sections
- Card stagger via animation-delay

**Mobile (<768px):**
- Hero: column layout, centered text, image section 300px height
- Fuel cards: column layout
- HackBar Station: single column grid
- All via inline `<style>` media queries

### File 3: `src/App.tsx` (MINOR UPDATE)

Update the HuellaRoja route to pass `showDock`:
```tsx
<Route path="/huella-roja" element={<HuellaRoja showDock={showDock} />} />
```

No other changes needed — the red scan is self-contained within HuellaRoja (it manages its own scan state independently of the global blue scan).

**Wait — actually**, looking at App.tsx, the global BiometricScan already runs on app load. HuellaRoja should have its own red scan that runs when navigating to `/huella-roja`. So HuellaRoja will manage its own internal scan state, and simply accept `showDock` for the Dock visibility (which is already true by the time users navigate there).

### Files Modified
- `src/components/BiometricScanRed.tsx` — NEW (red variant of BiometricScan)
- `src/pages/HuellaRoja.tsx` — REWRITE (full page)
- `src/App.tsx` — pass `showDock` to HuellaRoja route

### Technical Notes
- No new npm dependencies
- TextScramble component already exists at `@/components/ui/text-scramble`
- FingerprintSVG defined inline (same pattern as Home/MainLanding)
- Placeholder images use dark `#1a1a1a` background divs (no actual image files needed)
- All colors are RED (`#FF3B3B`) — no blue or green accents

