

## Plan: Replace About Section with Timeline Layout

Single file changed: `src/pages/Home.tsx`

### Change 1: Replace About section content (lines 292–408)

Delete the entire About section (the `<div ref={aboutRef}>` wrapper and its contents — title, subtitle, 2×2 glassmorphism grid, photo with badge). Replace with:

- **Section container**: `padding: "64px 7%"`, `display: "flex"`, `alignItems: "flex-start"`, `gap: 36`, `className="about-section-new"`
- **Left column** (`flex: 1`): Title (Michroma, clamp 18–28px), subtitle (Inter 14px/300), then a timeline container with:
  - Blue vertical gradient line (absolute, left 8, width 1.5px)
  - 4 steps, each with: blue dot (11px, white border, blue shadow), icon box (30×30) + title row, description (paddingLeft: 40)
- **Right column** (`flex: "0 0 34%"`, maxWidth 320): Image only (slider1), no badge, borderRadius 16, aspect-ratio 3/4

### Change 2: Clean up CSS (lines 81–95)

Remove `.glass-feat`, `.glass-feat:hover`, and `.glass-feat:hover .about-feat-glow` CSS rules — no longer used.

### Change 3: Update mobile CSS (line 111–113)

Replace the existing `.about-section-new` / `.about-photo-col` / `.about-stat-badge` mobile rules with:
- `.about-section-new { flex-direction: column; gap: 32px; padding: 48px 6%; }`
- `.about-photo-col { flex: none; width: 100%; max-width: 280px; margin: 0 auto; order: -1; }` (image above text on mobile)

Remove `.about-stat-badge` mobile rule (badge no longer exists).

### No other changes
- Hero, Video, Programs, Feature Rows, Footer, Dock all untouched
- No new imports or dependencies

