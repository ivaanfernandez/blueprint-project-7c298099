# Diagnóstico — Loader & Scroll Reveal en el Home

Antes de cambiar nada, esto es lo que encontré en el repo. **Tu prompt parte de una premisa incorrecta**: los dos sistemas ya existen y están integrados al Home. Solo tienen otros nombres.

## Reporte de archivos

```
✗ src/components/LoadingSpinner.tsx        — MISSING
✗ src/components/ScrollRevealWrapper.tsx   — MISSING
✗ src/hooks/useScrollReveal.ts             — MISSING
✗ src/styles/animations.css                — MISSING (no existe carpeta src/styles)

✓ src/components/HomeLoader.tsx            — EXISTS  (equivalente al LoadingSpinner pedido)
✓ src/lib/scrollAnimations.ts              — EXISTS  (equivalente al useScrollReveal/Wrapper pedido)
✓ HomeLoader integrado en Home.tsx         — YES (línea 9 import, línea 176 render)
✓ scrollReveal/scrollStagger usados en Home.tsx — YES (16 usos: about, programs, pricing)
```

## Lo que ya está funcionando (no es bug, es feature)

**1. El loader sí existe — es `HomeLoader.tsx`:**
- Pantalla full-screen con ring SVG circular (220px), porcentaje 0→100%, fade-out 500ms
- Header "BLUEPRINT // SYSTEM INIT", scan line vertical, corner brackets, grid
- Paleta white/gray (`#1F1F1F` bg, `#FFFFFF` ring) — no negro puro
- 4 segundos por defecto, drive con `requestAnimationFrame`
- Honra `prefers-reduced-motion` y los E2E flags

**2. Por qué no lo ves:** está gateado por `localStorage.bp_home_loader_seen` — **solo aparece la primera visita por navegador** (línea 15-28 de Home.tsx). Tu prompt dice "Do NOT use localStorage" pero el código actual sí lo usa intencionalmente. Tras tu primera carga, la flag quedó set y nunca lo volverás a ver hasta limpiar localStorage.

**3. El scroll reveal sí existe — es `lib/scrollAnimations.ts` + Framer Motion:**
- `scrollReveal` / `scrollStagger` / `blurRevealItem` exports
- Effect: opacity 0→1 + blur 8px→0 + y 20px→0, ease-out-quart, fires once
- Honra `prefers-reduced-motion` y `data-no-motion` (E2E)
- Usa Framer Motion (ya instalado, no es lib externa nueva)
- Aplicado a 3 secciones del Home: about features, programs grid, pricing CTAs

## Conflicto con tu prompt

Tu prompt explícitamente dice "Do NOT añadir librerías externas (Framer Motion...)". El proyecto **ya usa Framer Motion** como dependencia central — está en todo Home.tsx, AnimatedRoutes.tsx, etc. Crear un sistema paralelo basado en IntersectionObserver vanilla duplicaría funcionalidad y crearía dos APIs para hacer lo mismo.

## Recomendación: 3 opciones

**Opción A — No tocar nada (recomendada).** Para verificar que el loader funciona, abre DevTools → Application → Local Storage → borra `bp_home_loader_seen` y recarga. Para ver más scroll reveal, podemos envolver más secciones con los wrappers ya existentes.

**Opción B — Quitar el gate de "first visit only" del loader.** Una línea: cambiar `useState(() => shouldShowHomeLoader())` por `useState(true)`. Loader aparece en cada carga del Home.

**Opción C — Aplicar más scroll reveal a las secciones que aún no tienen.** Identificar qué secciones del Home (fingerprint card, location card, hero pillars) aún no usan `motion.div {...scrollReveal}` y envolverlas con los helpers que ya existen en `scrollAnimations.ts` — sin crear ningún archivo nuevo.

**Opción D (NO recomendada) — Crear los 4 archivos del prompt en paralelo a los existentes.** Resultado: dos loaders, dos sistemas de scroll reveal, deuda técnica.

## Pregunta para ti

¿Qué quieres hacer? Lo más probable, dada la queja "no veo el loader", es **B + C combinados**:
- B: loader aparece siempre (no solo primera visita)
- C: aplicar `scrollReveal` a las secciones del Home que aún no lo tienen (fingerprint card, location card, biometric terminal, sección de pillars)

Si lo apruebas, esto se hace **sin crear archivos nuevos**, solo editando `src/pages/Home.tsx` (1 línea para el loader + envolver 3-4 secciones con `<motion.div {...scrollReveal}>`).

Confírmame cuál opción quieres antes de implementar.
