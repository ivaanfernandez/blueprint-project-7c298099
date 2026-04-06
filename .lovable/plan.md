
Update only `src/pages/Home.tsx` to restore sticky behavior in the Feature Accordion section.

1. Remove the sticky blocker from ancestors
- Change the top-level `motion.div` wrapper from `overflow: "hidden"` to `overflowX: "hidden"` so vertical sticky can work.
- Audit the Feature Accordion section and its direct wrappers to ensure they do not set `overflow: hidden|auto|scroll`.
- Leave image/card-level `overflow: hidden` intact where it is only used for clipping content inside individual boxes.

2. Tighten the Feature Accordion container structure
- Keep the section as a flex row with `alignItems: "flex-start"`, `position: "relative"`, `paddingLeft: "7%"`, `paddingRight: 0`, `background: "#FFFFFF"`.
- Remove `minHeight: "100vh"` from the accordion section so the three right-side panels define the section’s natural total height.

3. Preserve the exact sticky left column requirements
- Keep the left column with:
  - `position: "sticky"`
  - `top: 0`
  - `height: "100vh"`
  - `flex: "0 0 42%"`
  - `display: "flex"`
  - `flexDirection: "column"`
  - `justifyContent: "center"`
  - `padding: "40px 28px 40px 0"`
  - `alignSelf: "flex-start"`
  - `zIndex: 2`

4. Preserve the right column height needed for sticky
- Keep the right column non-sticky with `flex: 1`, `display: "flex"`, `flexDirection: "column"`.
- Keep all three image panels at `minHeight: "80vh"` so the section remains tall enough for sticky scrolling to work.

5. Do not change anything else
- Do not alter the current accordion text sizes.
- Do not change images, badges, IntersectionObserver logic, or any other section.

Technical note
- Confirmed root issue from current code: the page-level `motion.div` uses `overflow: "hidden"`, which can prevent `position: sticky` from working vertically.
- The feature section layout is otherwise close to correct; the key implementation changes are:
  - `motion.div`: `overflowX: "hidden"` instead of `overflow: "hidden"`
  - Feature section: remove `minHeight: "100vh"`
