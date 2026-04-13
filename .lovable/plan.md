

## Plan: Fix TextScramble Component + Hero Title

Two files: `src/components/ui/text-scramble.tsx` and `src/pages/Home.tsx`

### Fix 1: TextScramble — move motion.create outside render (text-scramble.tsx)

The root cause: `motion.create()` is called inside the component body, creating a new MotionComponent on every render. During the scramble animation, `setDisplayText` triggers re-renders, each creating a new component type, causing React to unmount/remount the DOM element — producing visual distortion.

**Solution**: Use a cache (Map or module-level memoization) so `motion.create` is only called once per element type:

```tsx
const motionCache = new Map();
function getMotionComponent(component: React.ElementType) {
  if (!motionCache.has(component)) {
    motionCache.set(component, motion.create(component as keyof JSX.IntrinsicElements));
  }
  return motionCache.get(component);
}
```

Then inside the component: `const MotionComponent = getMotionComponent(Component);`

### Fix 2: Hero title — remove overflow hidden (Home.tsx, line 210)

Remove `overflow: "hidden"` from the hero title style to prevent clipping during the scramble animation. The title text "BLUEPRINT PROJECT" is already correct on line 214 — no text change needed.

### Technical notes
- No new dependencies
- No other sections affected
- The scramble animation will now be smooth because React won't remount the element on each frame

