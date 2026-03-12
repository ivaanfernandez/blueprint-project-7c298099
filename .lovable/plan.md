

# Fix Scan Line Timing in BiometricScan

## Analysis

- Phase 1 starts at 200ms, with a 1.5s CSS transition → fingerprint reaches full opacity at ~1700ms
- Phase 3 (scan line) currently starts at 5000ms — a 3300ms perceived gap
- The scan line element already starts at `top: 0` via the keyframe, so no CSS fix needed there

## Change

**`src/components/BiometricScan.tsx`, line 14:**
- Change Phase 3 timer from `5000` to `1700` (200ms phase 1 start + 1500ms fade duration)
- This makes the scan line appear the instant the fingerprint reaches full opacity
- All other phase timings remain unchanged

That's the only change needed — one number.

