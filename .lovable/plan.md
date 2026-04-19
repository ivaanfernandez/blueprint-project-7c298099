

## Plan: Add "MEET THE CHEF" section to HuellaRoja

Insert a new section between HackBar Station (ends ~line 277) and Footer (~line 280) in `src/pages/HuellaRoja.tsx`. Reuse the existing visual language (corner brackets, red accent lines, scan-line animation, `hrFadeUp`).

### Structure

```
SECTION D: MEET THE CHEF (NEW)
├── Row 1: flex (title 55% | photo placeholder 45%)
│   ├── Left: title "MEET THE CHEF" + subtitle + 60×2 red accent line
│   └── Right: bordered placeholder w/ corner brackets, image icon, "Chef photo" label
└── Row 2: grid 3 cols
    ├── MEAL PREPS
    ├── DETOX JUICE
    └── SUPPLEMENTS
```

### Edits to `src/pages/HuellaRoja.tsx`

**1. New `ChefCard` helper component** (above `HuellaRoja` component, near `StationCard`):
- Same minimal structure as `StationCard` but with `min-height: 220px`, custom red gradient background per card index, bottom red accent line. Uses `hrFadeUp` animation with staggered delay.

**2. Insert new `motion.section`** between current Section C (HackBar Station) and Section D (Footer), with `framer-motion` `whileInView` fade pattern matching sections B and C.
- Container: `backgroundColor: "#0a0a0a"`, `padding: "0 7% 72px"`, `position: relative`, `z-index: 1`.
- Row 1 wrapper: `className="hr-chef-row"`, `display: flex`, `gap: 40`, `alignItems: flex-start`, `marginBottom: 40`.
  - Left col: 55%, contains `<TextScramble as="p">MEET THE CHEF</TextScramble>` styled per spec, subtitle, and `60×2` red bar.
  - Right col: 45%, `min-height: 350`, the bordered red-tinted placeholder with 4 corner brackets, image SVG icon, "Chef photo" label in Orbitron.
- Row 2 wrapper: `className="hr-chef-grid"`, `display: grid`, `gridTemplateColumns: repeat(3, 1fr)`, `gap: 20`. Renders 3 `ChefCard`s.

**3. Append mobile CSS** to the existing `<style>` block inside the `@media (max-width: 767px)` rule:
```css
.hr-chef-row { flex-direction: column !important; gap: 24px !important; }
.hr-chef-left { flex: none !important; width: 100% !important; text-align: center !important; align-items: center !important; }
.hr-chef-right { flex: none !important; width: 100% !important; min-height: 250px !important; }
.hr-chef-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
.hr-chef-card { min-height: 180px !important; }
```

### Footer label note
Per spec the page order becomes: Hero → Fuel → Station → Meet the Chef → Footer. The existing footer remains unchanged.

### Untouched
- Hero, Fuel Your System, HackBar Station, Footer, Dock
- All other pages
- All existing animations and brackets

### Files Modified
- `src/pages/HuellaRoja.tsx` (one new helper component, one new section, ~5 mobile CSS lines)

