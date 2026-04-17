
## Plan: Remove "Limitless Potential" Radar Section from Home

### File: `src/pages/Home.tsx`

**What to delete:**
- The entire `<section>` (or wrapping element) marked `{/* ── E: LIMITLESS POTENTIAL — RADAR ORBITAL (WHITE) ── */}` containing:
  - Heading "LIMITLESS POTENTIAL WITH BLUEPRINT"
  - Subtitle "Three pillars. One integrated system."
  - Radar visualization (concentric rings, degree ticks 000°/090°/180°/270°, sweep line, center hub fingerprint, 3 pillar nodes)
  - Associated `<style>` tag with `radarSweep`, `pulseRing`, `fadeUp` keyframes
  - Any state/refs/variables used only by this section

**Verification before delete:**
1. Read `src/pages/Home.tsx` to locate exact line range of the section.
2. Search the file for `radarSweep`, `pulseRing`, `fadeUp` references — keep keyframes only if reused elsewhere on the page; otherwise remove.
3. Check imports at the top — remove any that become unused after deletion.

**What stays untouched:**
- Hero, About ("DESIGNED FOR THE HUMAN MACHINE"), Programs, "CHOOSE YOUR FINGERPRINT", Gallery, Footer, Dock
- Routing, other pages, mobile-specific styling for unrelated sections
- Section ordering — neighboring sections close the gap naturally without extra spacers

### Files Modified
- `src/pages/Home.tsx` only
