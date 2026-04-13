

## Plan: Fix Vertical Line/Dots Color + Subtext Line Break

Single file edit: `src/pages/Home.tsx`.

### Fix 1: Vertical line + dots → solid black

**Line 299**: Change `background: "linear-gradient(to bottom, #ffffff, #999999, #333333)"` to `background: "#000000"`.

**Lines 303, 308, 313, 318**: Change all `dotColor` values from `"#ffffff"`, `"#aaaaaa"`, `"#666666"`, `"#333333"` to `"#000000"`.

**Line 330**: Remove the `boxShadow` with colored rgba, replace with no shadow or a neutral one: `boxShadow: "none"`.

### Fix 2: Subtext line break

**Lines 287-292**: The `<p>` already has a `<br />` between the two sentences. To force exactly 2 visual lines, reduce `maxWidth` from `480` to `420` so the first sentence wraps naturally before "potential.", and keep the `<br />` to separate the two sentences. The text and `<br />` placement stays the same.

No other changes.

