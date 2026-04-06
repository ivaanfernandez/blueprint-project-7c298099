

## Analysis: Current State vs. Requested Changes

### Already Done (no changes needed)
- `useEffect` with `IntersectionObserver` + `panelRefs` — exists at lines 92, 98-120
- `scrollToPanel` function — exists at line 98
- `useEffect` imported from React — line 1
- `FEATURE_TABS` constant — already removed
- `PROTOCOLS` constant — already removed
- Protocols section (Section D) — already removed
- Feature accordion scroll section with sticky left column — exists at lines 528-708
- Footer with pulse beams, pulse button, Instagram icon, footer bar — exists at lines 740-965
- `pulseRing` and `pulseGlow` keyframes — exist at lines 152-158
- No unused `activeTab` state or `.feat-tab` CSS classes remain

### Minor Differences to Reconcile

**1. State variable naming**: Current code uses `activeIndex` / `setActiveIndex` (line 91). Your prompt specifies `activeAccordion` / `setActiveAccordion`. This is purely cosmetic — both work identically.

**2. Constant naming and fields**: Current code uses `ACCORDION_DATA` with a `badgeLabel` field. Your prompt specifies `ACCORDION_ITEMS` with `badge`, `badgeBg`, `badgeBorder` fields. The current implementation computes badge colors inline from `item.color` (line 698-700), which achieves the same visual result.

### Proposed Plan

Rename state and constant to match requested names exactly:

- **Line 54**: Rename `ACCORDION_DATA` → `ACCORDION_ITEMS`, add `badge`, `badgeBg`, `badgeBorder` fields per item (keeping `badgeLabel` as alias or replacing it)
- **Line 91**: Rename `activeIndex` → `activeAccordion`, `setActiveIndex` → `setActiveAccordion`
- **Lines 107, 568, 574, 603**: Update all references from `activeIndex` → `activeAccordion` and `setActiveIndex` → `setActiveAccordion`
- **Lines 567, 569, 662**: Update all references from `ACCORDION_DATA` → `ACCORDION_ITEMS`
- **Lines 698-700**: Use `item.badgeBg` and `item.badgeBorder` instead of inline-computed colors
- **Line 702**: Use `item.badge` instead of `item.badgeLabel`

No structural, layout, or styling changes needed — the accordion section, sticky behavior, footer, and all other sections are already correct.

### Note
Since the JSX in your prompt was stripped (HTML tags were consumed), I cannot verify the exact markup structure you intended. If there are specific structural differences beyond the naming changes above, please re-share the JSX inside a fenced code block (triple backticks with `tsx` language tag) so the tags are preserved.

