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

## Comandos
```
npm install
npm run dev
npm run build && npm run preview
firebase deploy
```
