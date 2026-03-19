

## Plan: Add vertical breathing space between hero and slider

### File: `src/pages/MainLanding.tsx`

**Single change** — line 339, update the ImageAutoSlider wrapper's `marginTop` from `-40px` to `80px` and ensure `background: '#000'` remains to keep the gap pure black:

```tsx
// FROM (line 339):
<div style={{ marginTop: '-40px', position: 'relative', zIndex: 10, background: '#000', marginBottom: '48px', paddingBottom: 0 }}>

// TO:
<div style={{ marginTop: '80px', position: 'relative', zIndex: 10, background: '#000', marginBottom: '48px', paddingBottom: 0 }}>
```

The `background: '#000'` on this wrapper plus the page's `backgroundColor: "#000"` ensures the gap is pure black with no procedural background bleeding through. Works on both desktop and mobile. No other changes.

