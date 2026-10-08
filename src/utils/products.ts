import { getCollection, type CollectionEntry } from 'astro:content';
import { BRANDS, type BrandSlug } from '../data/brands';

export type Product = CollectionEntry<'products'>;

export async function allProducts(): Promise<Product[]> {
  const items = await getCollection('products');
  return items.sort((a, b) => a.data.name.localeCompare(b.data.name, 'es'));
}

export const productUrl = (p: Product) => `/${p.data.slug}/`;

export function brandName(slug: BrandSlug) {
  return slug === 'amway' ? 'Amway' : BRANDS[slug].name;
}

/** Related products: same brand & category first, then same brand. Deterministic (no Math.random). */
export function related(p: Product, all: Product[], n = 4): Product[] {
  const same = all.filter((x) => x.id !== p.id && !x.data.canonicalTo && x.data.brand === p.data.brand);
  const sameCat = same.filter((x) => x.data.category === p.data.category);
  const rest = same.filter((x) => x.data.category !== p.data.category);
  const pool = [...sameCat, ...rest];
  // rotate by a stable hash of the slug so neighbours differ from page to page
  const h = [...p.data.slug].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
  const start = pool.length ? h % pool.length : 0;
  return [...pool.slice(start), ...pool.slice(0, start)].slice(0, n);
}

export function priceRange(items: Product[]) {
  const prices = items.map((p) => p.data.price);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}

/** Short meta description with price intent, ≤155 chars */
export function productMeta(p: Product, brand: string, priceStr: string) {
  const first = p.data.description.split(/(?<=\.)\s/)[0].replace(/\.$/, '');
  const base = `${p.data.name} en Bogotá: ${priceStr}. ${first}. Pídelo por WhatsApp, entrega a domicilio.`;
  if (base.length <= 155) return base;
  const who = p.data.name.toLowerCase().includes(brand.toLowerCase()) ? '' : ` de ${brand}`;
  return `${p.data.name}${who} en Bogotá: ${priceStr}. Original Amway, pedido por WhatsApp, entrega a domicilio.`;
}
