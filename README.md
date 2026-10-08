# Productos Bogotá — productosbogota.com

Catálogo Astro 5 de productos Amway (Nutrilite, Artistry, Satinique, G&H, Glister, Amway Home) para Bogotá.

## Stack
- Astro 5 (static, `trailingSlash: always`) · Tailwind CSS 4 (`@tailwindcss/vite`) · `@astrojs/sitemap` · `sharp`
- Hosting: Firebase Hosting (`firebase.json` con cache headers)

## Estructura
```
src/
├── content/products/*.json   ← 1 archivo por producto (fuente única de verdad)
├── content.config.ts         ← schema zod de la colección
├── data/site.ts              ← datos del negocio, WhatsApp, formato COP
├── data/brands.ts            ← marcas, categorías, FAQs por marca
├── pages/[slug].astro        ← ruta única: hubs de marca (/nutrilite/) y fichas (/producto/)
├── components/pages/         ← ProductPage.astro, BrandPage.astro
├── components/seo/           ← SEO.astro (meta/OG), Schema.astro (JSON-LD)
├── utils/schema.ts           ← Organization, Product+Offer, BreadcrumbList, FAQPage, ItemList
└── assets/products/*.jpg     ← imágenes optimizadas por Astro (webp)
```

## Añadir o editar un producto
1. Crea/edita `src/content/products/<slug>.json` (ver un ejemplo existente). Campos: `slug, name, brand, category, price, image, description, benefits[]`, opcionales `usage, sku, featured, canonicalTo`.
2. Añade la imagen 1200×1200 en `src/assets/products/<slug>.jpg`.
3. `npm run build`. La URL será `/<slug>/`; el sitemap, breadcrumbs, schema y enlazado interno se generan solos.

## Datos de Amway (precios, SKU, galería)
- `scripts/data/amway-map.json`: slug → id de producto en amway.com.co (67 mapeados; los 21 sin equivalente quedan `status: "consultar"`).
- `scripts/data/amway-catalog.json`: snapshot de la API de Amway Colombia (precio, SKU, presentación, descripción, modo de uso, imágenes).
- `node scripts/import-amway.mjs`: aplica el snapshot a los JSON de productos.
- `npm run images`: descarga la galería remota a `src/assets/products/gallery/` (hazlo una vez desde tu PC; el build las optimiza y deja de depender del CDN de Amway).

## Publicar con un solo comando
```
npm run ship                 # build → commit → push → firebase deploy
npm run ship -- "mensaje"    # con mensaje de commit propio
```
Requisito único la primera vez: `npm i -g firebase-tools && firebase login`.

## Comandos
```
npm install
npm run dev
npm run build && npm run preview
firebase deploy
```
