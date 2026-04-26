## Diagnosis

The current `index.html` `<head>` is already 95% aligned with the requested target. All previously requested fixes (full title, full description, OG tags, Twitter cards, geo tags, canonical, JSON-LD HealthClub schema, preconnects, font preloads, hero preloads) are already in place from prior prompts.

The "Lovable default" content described in the prompt (TODO comments, `author=Lovable`, `storage.googleapis.com` image, `twitter:site=@Lovable`) is **not present** in the current file.

The public files (`robots.txt`, `sitemap.xml`, `manifest.webmanifest`) already exist with correct content.

## What actually needs to change

Only the favicon/icon block differs from the prompt's spec:

**Current (line 49-51):**
```html
<link rel="icon" type="image/x-icon" href="/favicon.ico" />
<link rel="manifest" href="/manifest.webmanifest" />
```

**Target:**
```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<link rel="manifest" href="/manifest.webmanifest" />
```

## Plan

1. **Update favicon block in `index.html`** (lines 49-51) to reference SVG + PNG variants + Apple touch icon, matching the requested spec. Keep everything else unchanged.

2. **No other changes** — title, description, OG, Twitter, schema, geo tags, canonical, preconnects, fonts, hero preloads, and public files are all already correct.

## Caveats user should know

- The new favicon links point to files that **do not yet exist** in `/public/` (`favicon.svg`, `favicon-32x32.png`, `favicon-16x16.png`, `apple-touch-icon.png`). Browsers will 404 on these requests until the user uploads them. This matches the user's existing pending TODO ("subir favicons").
- Removing `favicon.ico` means until the new icons are uploaded, the tab will show no favicon. If preferred, we can keep the existing `favicon.ico` line as a fallback alongside the new ones.
- The `og-image.jpg` reference at `https://blueprintproject.com/og-image.jpg` will only resolve once the user uploads the image to `/public/` and redeploys to the production domain.

## Verification after change

- `<title>` = 88 chars ✓ (already)
- `<meta name="description">` > 200 chars ✓ (already, 232 chars)
- `og:image` points to `blueprintproject.com/og-image.jpg` ✓ (already)
- JSON-LD HealthClub schema present ✓ (already)
- No TODO comments ✓ (already)
- No `storage.googleapis.com` references ✓ (already)
- `author` = "Blueprint Project" ✓ (already)
- Favicon block updated ← only new change
