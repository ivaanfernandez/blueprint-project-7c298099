## Fix: Corregir handle de Instagram

Cambio quirúrgico de typo: `projectoblueprint` → `proyectoblueprint` (con "y" en "proyecto"). Solo 1 letra cambia. Cero impacto visual, cero impacto funcional excepto que ahora los enlaces apuntan al perfil real de Instagram.

### Diagnóstico

4 instancias encontradas en 2 archivos:

| Archivo | Línea | Tipo | Contenido actual |
|---|---|---|---|
| `src/pages/Home.tsx` | 896 | `href` del botón Instagram | `https://instagram.com/projectoblueprint` |
| `src/pages/Home.tsx` | 899 | `aria-label` del botón | `Síguenos en Instagram @projectoblueprint` |
| `src/components/Footer.tsx` | 48 | `href` del enlace | `https://instagram.com/projectoblueprint` |
| `src/components/Footer.tsx` | 57 | Texto visible | `@projectoblueprint` |

### Cambios a aplicar

En las 4 instancias, reemplazar la palabra completa `projectoblueprint` por `proyectoblueprint`. Resultado:

- URLs finales: `https://instagram.com/proyectoblueprint`
- Aria-label: `Síguenos en Instagram @proyectoblueprint`
- Texto visible footer: `@proyectoblueprint`

### Lo que NO cambia

- Estilos CSS, clases Tailwind, animaciones Framer Motion del botón
- Atributos `target="_blank"` y `rel="noopener noreferrer"`
- Ícono de Instagram
- Botón JOIN NOW (WhatsApp) — sin tocar
- Páginas Huella Azul/Roja/Verde — no contienen referencia al handle, no se modifican
- URLs no relacionadas con Instagram

### Verificación post-fix

Después del fix se confirmará: 0 instancias de `projectoblueprint`, 4 instancias de `proyectoblueprint`.
