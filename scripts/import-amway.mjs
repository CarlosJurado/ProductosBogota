#!/usr/bin/env node
/**
 * Aplica a src/content/products/*.json los datos tomados de amway.com.co
 * (scripts/data/amway-catalog.json + amway-map.json): precio, sku, presentación,
 * modo de uso, descripción oficial y galería. Los no mapeados quedan con status "consultar".
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const DIR = 'src/content/products';
const CDN = 'https://www.amway.com.co/assets/amshop/v3/assets/blt61e661dff490fa0d/';
const map = JSON.parse(readFileSync('scripts/data/amway-map.json', 'utf8'));
const cat = JSON.parse(readFileSync('scripts/data/amway-catalog.json', 'utf8'));
const clean = (s) => String(s || '').replace(/\s*\|\s*/g, ' | ').replace(/Descarga aqu[ií] la hoja de producto\.?/g, '').replace(/\|\s*NSO[A-Z]\d+[^|]*/g, '').replace(/\s+/g, ' ').replace(/^\s*\|\s*|\s*\|\s*$/g, '').trim();

let updated = 0, consultar = 0;
for (const f of readdirSync(DIR)) {
  const path = join(DIR, f);
  const p = JSON.parse(readFileSync(path, 'utf8'));
  const id = map[p.slug];
  const a = id && cat[id];
  if (!a) {
    p.status = 'consultar';
    consultar++;
  } else {
    p.status = 'disponible';
    p.sku = a.sku;
    p.amwayId = id;
    if (a.price) p.price = a.price;
    if (a.size) p.presentation = a.size.split(' - ')[0].trim();
    const det = clean(a.det);
    if (det) {
      const [tagline, ...rest] = det.split(' | ');
      p.tagline = tagline;
      if (rest.join(' ').length > 60) p.officialDescription = rest.join(' ');
    }
    const uso = clean(a.uso).replace(/^(Uso Sugerido:|Consulta(?:r|e)? (?:la )?etiqueta del producto\.?)\s*\|?\s*/i, '');
    if (uso) p.usage = uso.split(' | ').filter(Boolean).join('. ').replace(/\.\./g, '.');
    if (a.imgs?.length) p.gallery = a.imgs.map((x) => CDN + x);
    p.lastPriceCheck = '2026-10-08';
    updated++;
  }
  writeFileSync(path, JSON.stringify(p, null, 2) + '\n');
}
console.log(`actualizados ${updated}, consultar ${consultar}`);
