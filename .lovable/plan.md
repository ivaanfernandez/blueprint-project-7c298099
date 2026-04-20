

## Plan: Remove Duplicate Fuel Cards + Replace HackBar Station with Expandable List

Single-file edit in `src/pages/HuellaRoja.tsx`.

### Change 1 — Fuel Your System: drop the compact mobile duplicates

- Delete the entire mobile-only block (lines 508-525): `<div className="flex md:hidden flex-col gap-3"> … </div>`.
- Remove `hidden md:flex` from line 491 so the desktop `<FuelCard>` grid renders on every viewport.
- The existing media query at line 367-368 already handles mobile stacking:
  ```css
  .hr-fuel-grid { flex-direction: column !important; gap: 16px !important; }
  .hr-fuel-card { min-height: 320px !important; }
  ```
  Adjust `min-height` from 320 → 280 to match spec.

### Change 2 — HackBar Station: expandable list (desktop + mobile)

Delete both the desktop grid (lines 539-543) and the mobile horizontal scroll (lines 545-561). Replace with a single expandable list driven by an `activeStation` state.

**State** (added to `HuellaRoja` component near the top with the other hooks):
```tsx
const [activeStation, setActiveStation] = useState<number | null>(null);
```

**Data array** (`stationItems`) with title, desc, and a white-stroke SVG icon (rgba(255,255,255,0.7)) for each:
- CUSTOM SHAKES — shaker / cup outline icon
- FUNCTIONAL COFFEE — coffee cup with steam icon
- BLUEPRINT SNACKS — bar / package icon

**JSX** (replaces lines 539-561):
```tsx
<div style={{ maxWidth: 760, margin: "0 auto", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, overflow: "hidden", backgroundColor: "rgba(255,255,255,0.015)" }}>
  {stationItems.map((item, index) => {
    const isActive = activeStation === index;
    return (
      <div
        key={item.title}
        onMouseEnter={() => setActiveStation(index)}
        onMouseLeave={() => setActiveStation(null)}
        onClick={() => setActiveStation(isActive ? null : index)}
        className="hr-station-row"
        style={{
          position: "relative",
          overflow: "hidden",
          borderBottom: index < stationItems.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
          padding: isActive ? "28px 24px" : "20px 24px",
          cursor: "pointer",
          transition: "all 0.3s ease",
          background: isActive ? "rgba(255,59,59,0.03)" : "transparent",
        }}
      >
        {isActive && (
          <>
            {/* 4 corner brackets in #FF3B3B, 12×12, 1px stroke, absolute at each corner */}
          </>
        )}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, position: "relative", zIndex: 1 }}>
          <div style={{ flex: 1 }}>
            <p className="hr-station-title" style={{ fontFamily: "'Michroma', sans-serif", fontSize: isActive ? 16 : 14, color: "#fff", textTransform: "uppercase", letterSpacing: "0.04em", margin: 0, transition: "font-size 0.3s ease" }}>
              {item.title}
            </p>
            {isActive && (
              <p className="hr-station-desc" style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.6, marginTop: 10, margin: "10px 0 0" }}>
                {item.desc}
              </p>
            )}
          </div>
          {isActive && (
            <div style={{ flex: "0 0 auto", color: "rgba(255,255,255,0.7)" }}>{item.icon}</div>
          )}
        </div>
      </div>
    );
  })}
</div>
```

**Mobile CSS** (added inside the existing `@media (max-width: 767px)` block; remove now-unused `.hr-station-grid` / `.hr-station-card` / `.hackbar-scroll` rules):
```css
.hr-station-row { padding: 18px 16px !important; }
.hr-station-row .hr-station-title { font-size: 13px !important; }
.hr-station-row .hr-station-title.is-active { font-size: 15px !important; }
.hr-station-row .hr-station-desc { font-size: 12px !important; }
```
(Apply `is-active` className conditionally on the title element.)

**Behavior**: Desktop uses hover; mobile uses tap. `onClick` toggles the same state, so both interactions naturally work — hover sets active, click toggles. Tapping another row sets it active (mouseleave doesn't fire on touch, so tap-to-toggle handles collapse).

### Cleanup
- The unused `StationCard` component definition (around line 100-110) can stay (harmless) or be removed — leaving it untouched to minimize diff risk.
- Drop now-orphan CSS rules: `.hr-station-card:hover`, `.hackbar-scroll`, `.hackbar-scroll::-webkit-scrollbar`, `.hr-station-grid` / `.hr-station-card` mobile overrides.

### Files Modified
- `src/pages/HuellaRoja.tsx`

### Untouched
- Hero (mobile + desktop), Meet the Chef, 3D Carousel, Lab footer, Dock, all other pages.

