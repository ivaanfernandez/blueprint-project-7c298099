

## Plan: Update Fingerprint Icons for Blueprint+ and Elite Cards

### What Changes
- **Blueprint ($75)**: No changes — keeps single blue fingerprint at 64px
- **Blueprint+ ($150)**: Replace single green fingerprint with three fingerprints (blue, green, red) side by side at 40px each
- **Blueprint Elite ($250)**: Same — replace single red fingerprint with three fingerprints (blue, green, red) side by side at 40px each

### Technical Approach

In `PricingSection.tsx`, modify the fingerprint rendering block (lines 115-117) inside `PricingCard`:

Replace the current single `<FingerprintSVG>` with conditional logic based on `plan.name`:
- If `"BLUEPRINT"`: render single `<FingerprintSVG color={plan.color} size={64} />`
- If `"BLUEPRINT+"` or `"BLUEPRINT ELITE"`: render three fingerprints in a flex row:
  ```tsx
  <div className="flex justify-center items-center gap-3 mb-4">
    <FingerprintSVG color="#1A6BFF" size={40} />
    <FingerprintSVG color="#22C55E" size={40} />
    <FingerprintSVG color="#FF3B3B" size={40} />
  </div>
  ```

Single file edit, ~5 lines changed.

