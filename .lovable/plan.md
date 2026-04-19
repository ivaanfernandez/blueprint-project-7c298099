

## Plan: Rename "ABOUT THE FOUNDER" → "ABOUT BLUEPRINT" + recolor Vision/Services to blue

All edits live in `src/components/ui/interactive-image-accordion.tsx` (the data drives both desktop and mobile). `MainLanding.tsx` only imports the component — no changes needed there.

### Edits

**1. ACCORDION_ITEMS array (lines ~19–40)** — rename + recolor in one place:

- Item 0 (Founder):
  - `stripLabel: "ABOUT THE FOUNDER"` → `"ABOUT BLUEPRINT"`
  - `title: "ABOUT THE FOUNDER"` → `"ABOUT BLUEPRINT"`
  - `accentColor: "#1A6BFF"` (already blue — unchanged)
- Item 1 (Vision):
  - `accentColor: "#22C55E"` → `"#1A6BFF"`
- Item 2 (Services):
  - `accentColor: "#FF3B3B"` → `"#1A6BFF"`

This single change automatically updates:
- Left-panel title (desktop)
- Rotated strip label and active strip label (desktop)
- Active glow shadow (`boxShadow: 0 0 30px ${accentColor}20`)
- Inactive left border (`borderLeft: 2px solid ${accentColor}4D`)
- Mobile tab text color, active tab border, and tab background (uses `accentColor` directly)

**2. ACCENT_RGB constant (line ~219)** — mobile tab uses precomputed RGB strings for the translucent active background:

- `["26,107,255", "34,197,94", "255,59,59"]` → `["26,107,255", "26,107,255", "26,107,255"]`

This makes the mobile active-tab background tint blue for Vision and Services to match the new accent.

**3. Image alt text** — `image: founderImage`'s `alt` is bound to `item.stripLabel`, which becomes "ABOUT BLUEPRINT" automatically. No separate alt edit required.

### Untouched
- Images (founder/vision/services jpgs)
- Descriptions, layout, animation timing, fade logic
- TAB_LABELS ("FOUNDER" / "VISION" / "SERVICES") — these are the short tab captions, distinct from the renamed title; spec only renames "ABOUT THE FOUNDER". I will leave TAB_LABELS as-is.
- `MainLanding.tsx` and every other section/page

### Files Modified
- `src/components/ui/interactive-image-accordion.tsx` (4 string changes in `ACCORDION_ITEMS` + 2 string changes in `ACCENT_RGB`)

