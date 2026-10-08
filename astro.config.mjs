// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { readdirSync, readFileSync } from 'node:fs';

const SITE = 'https://productosbogota.com';
// Pages that canonicalise to another product are kept out of the sitemap.
const duplicates = readdirSync('./src/content/products')
  .map((f) => JSON.parse(readFileSync(`./src/content/products/${f}`, 'utf8')))
  .filter((p) => p.canonicalTo)
  .map((p) => `${SITE}/${p.slug}/`);

export default defineConfig({
  site: SITE,
  output: 'static',
  trailingSlash: 'always',
  compressHTML: true,
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      filter: (page) => !page.includes('/politica-privacidad/') && !duplicates.includes(page),
      serialize(item) {
        const path = item.url.replace(SITE, '');
        if (path === '/' ) item.priority = 1.0;
        else if (/^\/(nutrilite|artistry|satinique|g-h|amway-home|glister)\/$/.test(path)) item.priority = 0.9;
        else item.priority = 0.8;
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    build: { cssMinify: true },
  },
});
