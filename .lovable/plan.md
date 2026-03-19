
Problema encontrado: sí, está mal alineado, y no es por `word-rotate.tsx` solamente. El componente `WordRotate` ya tiene la base correcta, pero `MainLanding.tsx` todavía le está metiendo overrides que rompen el alineado.

Qué está causando el problema ahora:
1. En mobile, `.hero-headline-wrapper` sigue teniendo `padding-left: 16px !important`, así que el headline no queda realmente centrado.
2. En desktop, el span azul `.hero-headline-blue` sigue con `textAlign: 'left'` y `minWidth: '600px'`, lo que hace que el bloque azul se comporte como una caja fija alineada internamente a la izquierda en vez de alinearse naturalmente con el texto blanco.
3. En mobile, `.hero-headline-blue .word-rotate-inner` todavía fuerza `left: 50% !important` y `transform: translateX(-50%) !important`; eso pisa el `transform: none` del `WordRotate` y vuelve a desalinear visualmente el texto.
4. El screenshot confirma exactamente eso: el azul está más alto y además visualmente “flota” como bloque separado del blanco.

Plan de corrección:
1. En `src/pages/MainLanding.tsx`, limpiar por completo los offsets residuales del headline:
   - dejar `paddingLeft: 0`, `marginLeft: 0`, `marginRight: 0` en el wrapper inline
   - en CSS mobile, cambiar `.hero-headline-wrapper` para que no tenga `padding-left: 16px`
2. En `src/pages/MainLanding.tsx`, ajustar `.hero-headline-blue` para que no use alineación interna a la izquierda:
   - quitar `textAlign: 'left'`
   - mantener misma `fontFamily`, `fontSize`, `lineHeight: 1`, `verticalAlign: 'baseline'`
   - revisar si `minWidth: '600px'` debe mantenerse o pasar a una solución centrada sin sesgo horizontal
3. En `src/pages/MainLanding.tsx`, eliminar el override mobile que hoy rompe el trabajo de `WordRotate`:
   - quitar `.hero-headline-blue .word-rotate-inner { left: 50%; transform: translateX(-50%) }`
4. En `src/components/ui/word-rotate.tsx`, conservar la estructura base ya correcta:
   - wrapper con `position: relative`, `verticalAlign: baseline`, `lineHeight: 1`, `top: 0`
   - inner con `position: absolute`, `left: 0`, `top: 0`, `bottom: 0`, `display: flex`, `alignItems: flex-end`, `transform: none`
5. Si después de limpiar esos overrides todavía queda una diferencia óptica mínima por métricas tipográficas de Bebas Neue, aplicar como último ajuste un `transform: translateY(2px)` o `3px` en el wrapper de `WordRotate`, pero solo si sigue siendo necesario después de quitar los estilos conflictivos.

Archivos a tocar:
- `src/pages/MainLanding.tsx`
- `src/components/ui/word-rotate.tsx`

Resultado esperado:
- headline realmente centrado en desktop y mobile
- texto azul apoyado en la misma base visual que el blanco
- sin tocar copy, tamaños, subtext, botón ni otros componentes

Detalle técnico:
```text
Causa real = no es falta de flex-end en WordRotate;
es que MainLanding todavía lo contradice con:
- mobile padding-left: 16px
- textAlign: left en el bloque azul
- left: 50% + translateX(-50%) en .word-rotate-inner mobile
```
