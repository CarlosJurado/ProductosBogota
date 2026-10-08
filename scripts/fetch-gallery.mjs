#!/usr/bin/env node
/**
 * Descarga las imágenes de galería (campo `gallery` de cada JSON) a
 * src/assets/products/gallery/<slug>-<n>.jpg para servirlas optimizadas desde el sitio.
 * Se ejecuta con `npm run images`. Es idempotente: salta las que ya existen.
 * Las URLs remotas se conservan en el JSON como respaldo.
 */
import { readdirSync, readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const DIR = 'src/content/products';
const OUT = 'src/assets/products/gallery';
mkdirSync(OUT, { recursive: true });

let ok = 0, skip = 0, fail = 0;
for (const f of readdirSync(DIR)) {
  const p = JSON.parse(readFileSync(join(DIR, f), 'utf8'));
  const urls = p.gallery ?? [];
  for (let i = 0; i < urls.length; i++) {
    const ext = (urls[i].match(/\.(jpg|jpeg|png|webp)(?:$|\?)/i)?.[1] ?? 'jpg').toLowerCase().replace('jpeg', 'jpg');
    const dest = join(OUT, `${p.slug}-${i + 1}.${ext}`);
    if (existsSync(dest)) { skip++; continue; }
    try {
      const res = await fetch(urls[i], { headers: { 'User-Agent': 'Mozilla/5.0' } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
      ok++;
      console.log('✓', dest);
    } catch (e) {
      fail++;
      console.warn('✗', urls[i], e.message);
    }
  }
}
console.log(`\nDescargadas ${ok}, existentes ${skip}, fallidas ${fail}.`);
