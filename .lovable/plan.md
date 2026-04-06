

## Plan: Redesign About Section

### What changes
Replace the entire About section (lines 322-372 in `Home.tsx`) with a new two-column layout featuring a real photo with a floating stat badge on the left, and title + body text + 4-feature grid on the right.

### Implementation

**File: `src/pages/Home.tsx`**

1. **Replace lines 322-372** (the `aboutRef` div containing the old About section) with new JSX:
   - Left side: `<img>` using `slider1` (already imported) in a 3/4 aspect-ratio container with `borderRadius: 18px`. Floating stat badge at bottom-right showing "7+ Years Experience" with blue dot.
   - Right side: Title "DESIGNED FOR THE HUMAN MACHINE" in Michroma, body paragraph in Inter, and a 2×2 CSS grid of 4 feature items (Precision Training, Nutrition Engineering, Recovery Science, Mental Growth) each with a blue left accent bar.

2. **Mobile responsive**: Add CSS class `about-section-new` and a media query in `src/index.css` for `<768px`:
   - Stack vertically (flex-direction: column)
   - Photo wrapper: full width, badge stays inside with `right: 16px`
   - Section padding: `48px 6%`

**File: `src/index.css`**
- Add responsive media query for the new about layout.

### What gets removed
- Gray placeholder image with "VITRUVIAN SCAN" label
- Training/Nutrition/Recovery tag pills
- No "LEARN MORE" button or "Watch video" link exists currently, so nothing else to remove

### What stays unchanged
- `SectionDivider` components above and below
- `aboutRef` ref attachment
- All other sections, dock, routing

