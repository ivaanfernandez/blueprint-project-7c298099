

## Plan: Add Avatar Group to Blueprint Elite Card

### What Changes
Add an overlapping avatar row with "+12" counter and "Join the inner circle" text between the fingerprint icons and the plan name, only on the Blueprint Elite card.

### Technical Approach

**File**: `src/components/PricingSection.tsx`

1. Import `User` from `lucide-react` at the top.

2. After the fingerprint icon block (line 125) and before the plan name `<p>` (line 127), add a conditional block for `plan.name === "BLUEPRINT ELITE"`:

```tsx
{plan.name === "BLUEPRINT ELITE" && (
  <>
    <div className="flex justify-center items-center mt-3 mb-2">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{
            background: "rgba(255,255,255,0.1)",
            border: "2px solid rgba(0,0,0,0.8)",
            marginLeft: i > 0 ? -8 : 0,
          }}>
          <User size={14} style={{ color: "rgba(255,255,255,0.3)" }} />
        </div>
      ))}
      <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-semibold"
        style={{
          background: "rgba(255,255,255,0.08)",
          border: "2px solid rgba(0,0,0,0.8)",
          marginLeft: -8,
          color: "rgba(255,255,255,0.4)",
        }}>
        +12
      </div>
    </div>
    <p className="text-[10px] text-center tracking-[0.1em] mb-4"
      style={{ color: "rgba(255,255,255,0.3)" }}>
      Join the inner circle
    </p>
  </>
)}
```

Single file, ~25 lines added. No other changes.

