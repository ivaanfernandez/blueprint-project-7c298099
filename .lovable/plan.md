

## Plan: Fix About Title + Features Alignment

Single file: `src/pages/Home.tsx`

### Change 1: Title fontSize (line 313)
`fontSize: "clamp(18px, 2.2vw, 30px)"` → `fontSize: "clamp(16px, 1.8vw, 24px)"`
Add `whiteSpace: "nowrap"` to the same style object.

### Change 2: Left column flex layout (line 310)
`{ flex: 1, paddingTop: 12 }` → `{ flex: 1, paddingTop: 12, display: "flex", flexDirection: "column" as const }`

### Change 3: Features grid flex-grow (line 325)
Add `flexGrow: 1, alignContent: "stretch"` to the grid style:
`{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 0, flexGrow: 1, alignContent: "stretch" }`

### Technical notes
- 3 inline style tweaks, lines 310-325
- No mobile or CSS block changes needed

