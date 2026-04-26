## Diagnóstico

Reviewed the current `index.html`. Casi todos los meta tags ya están en su versión larga (probablemente quedaron así desde el Prompt B original). El único tag que sigue corto es `twitter:description`.

### Estado actual de cada tag

| Tag | Caracteres actuales | Estado |
|---|---|---|
| `<title>` | 88 | ✅ Ya completo |
| `<meta name="title">` | 88 | ✅ Ya completo |
| `<meta name="description">` | 232 | ✅ Ya completo |
| `<meta name="keywords">` | 244 | ✅ Ya completo |
| `og:title` | 46 | ✅ Ya completo (versión corta intencional para social) |
| `og:description` | 152 | ✅ Ya completo |
| `twitter:title` | 46 | ✅ Ya completo |
| `twitter:description` | **73** | ⚠️ Corto — necesita reemplazo |

## Cambio único a aplicar

**Archivo:** `index.html` — línea 45

Reemplazar:
```html
<meta name="twitter:description" content="Premium fitness club in Santurce, San Juan PR. Built for human evolution." />
```

Por:
```html
<meta name="twitter:description" content="Premium fitness club in Santurce, San Juan PR. Elite training, nutrition engineering, and recovery protocols. Built for human evolution." />
```

(73 → 137 chars)

## Lo que NO se toca

- Canonical, geo, OG image dimensions, Schema.org JSON-LD, preconnect/preload — todo se preserva.
- URLs (`blueprintproject.com`) sin cambios.
- No se modifican `HuellaAzul/Roja/Verde`, robots.txt, sitemap.xml ni manifest.
- Sin cambios visuales en el site.

## Resultado esperado

Tras este cambio, los 6 tags pedidos por el prompt estarán en su versión larga correcta. El warning "Description is short" en opengraph.xyz para la Twitter Card desaparecerá. El warning restante será solo el de la imagen (`og-image.jpg` de 1200x630) que se resuelve subiendo el archivo a `/public/`.