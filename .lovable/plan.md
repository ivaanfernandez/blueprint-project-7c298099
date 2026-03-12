

## WordRotate Component + New Hero Headline

### Files to Create
1. **`/src/components/ui/word-rotate.tsx`** — Create with exact content provided by user

### Files to Modify
2. **`/src/pages/MainLanding.tsx`** — Replace Hero headline structure:
   - Remove eyebrow label "EL SISTEMA OPERATIVO" (lines 119-122)
   - Remove old HEADLINE_WORDS animation block (lines 124-143)
   - Add new structure: static Line 1 "THIS ISN'T A GYM," + WordRotate Line 2 with words ["IT'S A SYSTEM.", "IT'S A COMMUNITY.", "IT'S A MINDSET."]
   - Keep subheadline, dock, scroll indicator, TRES HUELLAS section untouched

### Technical Details
- New headline uses `clamp(48px, 8vw, 100px)` font-size (smaller than old 120px max)
- WordRotate: duration 2500ms, color #1A6BFF
- Static line: color #FFFFFF
- Both lines in single centered div, flush (no margin between)
- Import WordRotate at top of file

