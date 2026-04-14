

## Plan: Home Title + Features Layout + Huella Azul Hero Font

Four changes across `src/pages/Home.tsx` and `src/pages/MainLanding.tsx`.

---

### Change 1: Center "LIMITLESS POTENTIAL WITH BLUEPRINT" title (Home.tsx, lines 494-505)

Replace the `<h2>` styles:
- `fontSize: "clamp(14px, 1.6vw, 20px)"`
- `textAlign: "center"`
- `letterSpacing: "0.04em"`
- `whiteSpace: "nowrap"`
- `lineHeight: 1`
- Remove `maxWidth: 600`

Add mobile override in the `<style>` block (~line 85):
```css
.feature-title-centered {
  white-space: normal !important;
  font-size: clamp(12px, 4vw, 16px) !important;
  text-align: center !important;
  margin-bottom: 32px !important;
}
```

### Change 2: Update feature rows to match spec (Home.tsx, lines 507-606)

The horizontal row layout already exists. Update to match spec:
- **Thumbnail**: Change `flex: "0 0 120px"` → `flex: "0 0 200px"`, `height: 80` → `height: 140`, `borderRadius: 10` → `14`
- **Fingerprint**: `flex: "0 0 48px"` → `flex: "0 0 56px"`, size `40` → `56`
- **Name**: `fontSize: 18` → `clamp(18px, 2vw, 28px)`, add `marginBottom: 8`
- **Description**: `fontSize: 14` → `clamp(14px, 1.2vw, 17px)`, `lineHeight: 1.6` → `1.7`, add `maxWidth: 500`
- **Link**: add `marginTop: 12`, `display: "inline-block"`, `transition: "color 0.3s ease"`
- **Arrow**: `fontSize: 20` → `28`, add `transition: "all 0.3s ease"`, add hover handlers for `translateX(4px)` and `color: #000`
- **Row padding**: already `32px 0` — correct

Update mobile CSS for `.feature-row-mobile`:
```css
.feature-row-mobile {
  flex-direction: column !important;
  gap: 16px !important;
  text-align: center !important;
  align-items: center !important;
  padding: 24px 16px !important;
}
```
Add classes for mobile photo override (100% width, 180px height, 12px radius) and hide arrow on mobile.

### Change 3: Huella Azul hero font → Michroma (MainLanding.tsx, lines 237-274)

Change both `hero-headline-white` and `hero-headline-blue` spans:
- `fontFamily: 'Bebas Neue, sans-serif'` → `fontFamily: "'Michroma', sans-serif"`
- `fontSize: 'clamp(56px, 6vw, 88px)'` → `fontSize: "clamp(28px, 4.5vw, 58px)"`
- `fontWeight: 400`
- `letterSpacing: "0.02em"`
- `lineHeight: 1.08`

Update mobile overrides for `.hero-headline-white` and `.hero-headline-blue`:
- `font-size: clamp(22px, 6vw, 40px) !important`

Michroma is already imported globally (used in Home.tsx) — no new font import needed.

---

### Files Modified
- `src/pages/Home.tsx` — Changes 1 and 2
- `src/pages/MainLanding.tsx` — Change 3

