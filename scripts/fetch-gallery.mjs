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
  // Imagen principal remota → se descarga a src/assets/products/<slug>.<ext> y se reescribe el JSON
  if (typeof p.image === 'string' && p.image.startsWith('http')) {
    const ext = (p.image.match(/\.(jpg|jpeg|png|webp)(?:$|\?)/i)?.[1] ?? 'jpg').toLowerCase().replace('jpeg', 'jpg');
    const dest = join('src/assets/products', `${p.slug}.${ext}`);
    try {
      if (!existsSync(dest)) {
        const res = await fetch(p.image, { headers: { 'User-Agent': 'Mozilla/5.0' } });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
        console.log('✓ principal', dest);
      }
      p.image = `/${p.slug}.${ext}`;
      writeFileSync(join(DIR, f), JSON.stringify(p, null, 2) + '\n');
      ok++;
    } catch (e) { fail++; console.warn('✗ principal', p.image, e.message); }
  }
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
