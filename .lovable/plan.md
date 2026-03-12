

## BiometricScan Component Updates

### Overview
Three specific modifications to sync timing, update text, and fix mobile alignment.

### Changes Required

**1. SYNC TIMING (Wordmark + Fingerprint simultaneous fade-in)**
- Change fingerprint container opacity condition from `phase >= 2` to `phase >= 1`
- Change fingerprint transition duration from `0.8s` to `1.5s` to match wordmark
- Wordmark already uses `phase >= 1` with `transition: "opacity 1s ease"` — keeping this as the base timing

**2. TEXT CHANGE**
- Line 67: `"ACCESS TO BLUEPRINT PROJECT"` → `"ACCESSING BLUEPRINT PROJECT"`

**3. MOBILE ALIGNMENT**
- Add `textAlign: "center"` and `width: "100%"` to the wordmark `<p>` style (lines 57-65)

