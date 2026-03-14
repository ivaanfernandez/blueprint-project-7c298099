

## Fix Hero Background Image

**Issue**: The Hero section references `/gym-interior.jpg` in the public folder, but the asset may not exist there or is not loading properly. The solution is to move the image to `src/assets/` and import it properly as a React module.

**Changes to `src/pages/MainLanding.tsx`**:

1. **Add import** at top (after other imports):
   ```tsx
   import gymHero from '@/assets/blueprint-gym.jpg';
   ```

2. **Update Hero `<img>` element** (line 114-118):
   - Change `src="/gym-interior.jpg"` to `src={gymHero}`
   - Add `zIndex: 0` to inline styles
   - Update alt text to "Blueprint Project"

3. **Update overlay div** (line 120-126):
   - Add `zIndex: 1` to inline styles

4. **Hero wrapper** (line 112):
   - Already has `position: "relative"` and `overflow: "hidden"` ✓

5. **Hero content wrapper** (line 128):
   - Already has `position: "relative", zIndex: 10` ✓

**Asset handling**:
- Copy `user-uploads://IMG_4513-3.jpg` → `src/assets/blueprint-gym.jpg`

**Result**: The Hero background image will display correctly using the Vite asset bundler, which handles optimization and proper URL resolution.

