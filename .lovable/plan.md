

## Implementation Plan

Three specific changes to the BiometricScan component:

1. **Install framer-motion** dependency
2. **Create gradient-dots.tsx** at /src/components/ui/gradient-dots.tsx with exact provided content
3. **Modify BiometricScan component**:
   - Wrap outermost div with a relative container
   - Add `<GradientDots />` as first child with z-index: 0
   - Import GradientDots from '@/components/ui/gradient-dots'
   - Add `className="relative z-10"` to all existing content elements (wordmark, fingerprint container, scanning text, access granted text) to keep them above the dots
   - Preserve all existing animations, timing, text, and styles

