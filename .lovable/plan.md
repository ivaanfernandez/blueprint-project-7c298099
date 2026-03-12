
# Biometric Scan Intro Screen — BLUEPRINT PROJECT

## Overview
A full-screen animated biometric scan intro that auto-plays on load with a 7-second sequence before revealing the main landing page.

## Components to Create

### 1. BiometricScan Component
- Full-viewport black screen with Space Grotesk font (Google Fonts)
- 5-phase animation sequence (all CSS-driven, no libraries):
  - **Phase 1 (0–1.5s):** "BLUEPRINT PROJECT" wordmark fades in — white, 13px, 0.3em letter-spacing
  - **Phase 2 (1.5–2.5s):** SVG fingerprint (140×140px) fades in with navy blue (#0A3D8F) color and electric blue glow
  - **Phase 3 (2.5–4.5s):** Horizontal scan line sweeps over fingerprint (top→bottom→top), "ESCANEANDO HUELLA..." text appears, glow pulses
  - **Phase 4 (4.5–6s):** Scanning text fades out, fingerprint brightens to #1A6BFF, "ACCESO CONCEDIDO" fades in, ripple effect from center
  - **Phase 5 (6–7s):** Entire screen fades to black, calls `onComplete()`
- Inline SVG fingerprint with realistic concentric ridge pattern
- All animations via CSS keyframes in a `<style>` tag
- Mobile-first, centered layout

### 2. MainLanding Placeholder
- Dark background, centered white text: "MAIN LANDING — COMING SOON"

### 3. App.tsx Updates
- State toggle: show BiometricScan first, switch to MainLanding on complete
- Load Space Grotesk font in index.html
