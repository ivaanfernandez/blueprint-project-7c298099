

## BiometricScan Component Updates

### Overview
Three specific modifications to the existing `BiometricScan` component: extending total animation duration from 7s to 14s, updating the wordmark text, and increasing the wordmark font size.

### Changes Required

**1. Extend Animation Duration (7s → 14s)**
Scale all phase timers proportionally (×2 multiplier):
- Phase 1 trigger: 100ms → 200ms
- Phase 2 trigger: 1500ms → 3000ms  
- Phase 3 trigger: 2500ms → 5000ms
- Phase 4 trigger: 4500ms → 9000ms
- Phase 5 trigger: 6000ms → 12000ms
- onComplete trigger: 7000ms → 14000ms

Scale animation durations (×2 multiplier):
- bs-glow-pulse: 1.5s → 3s
- bs-scan-line: 2s → 4s  
- bs-screen-fade: 1s → 2s
- bs-ripple: 1.2s → 2.4s

**2. Update Wordmark Text**
Change from `"BLUEPRINT PROJECT"` to `"ACCESS TO BLUEPRINT PROJECT"`

**3. Increase Wordmark Font Size**
Change from `13px` to `18px` (letter-spacing 0.3em and other styles remain unchanged)

