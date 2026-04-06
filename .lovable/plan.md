

## Plan: Fix Feature Accordion Section + Hero Text

**File**: `src/pages/Home.tsx`

### FIX 1: Hero — Remove bottom-left paragraph
Delete lines 307-312 (the `<p>` tag containing "Three protocols. One integrated system..."). Keep the `<div>` with scroll button starting at line 314.

### FIX 2: Feature Section Title — Bigger, 2 lines
Lines 558-568: Change the accordion section title styles:
- `fontSize`: `"clamp(28px, 3.5vw, 44px)"` (was `clamp(18px, 2.5vw, 28px)`)
- `lineHeight`: `1.1` (was `1.12`)
- Add `maxWidth: 500` to force "LIMITLESS POTENTIAL" / "WITH BLUEPRINT" as two lines

### FIX 3: Accordion items — Bigger text
Lines 590-653: Update accordion item styles:
- Title row padding: `"20px 0 20px 16px"` (was `16px 0 16px 16px`)
- Color dot: `width: 9, height: 9` (was 7)
- Name font-size: `20` (was 14)
- Description font-size: `15` (was 13), `lineHeight: 1.7` (was 1.65), `maxWidth: 400` (was 340)
- Link font-size: `10` (was 8)

### FIX 4: Images flush to right edge
- Section container (line 538): Change `padding: "0 7%"` to `paddingLeft: "7%", paddingRight: 0`
- Right column (line 662): Already `flex: 1`, no changes needed
- Each image panel (line 672-678): Change to `minHeight: "80vh"`, `justifyContent: "flex-end"`, `padding: "20px 0 20px 20px"`
- Each image box (line 680-687): Change `width: "95%"`, `borderRadius: "14px 0 0 14px"`, `marginRight: 0`
- Mobile media query: Update `.accordion-panel .accordion-img-box` to keep `border-radius: 12px` on mobile

