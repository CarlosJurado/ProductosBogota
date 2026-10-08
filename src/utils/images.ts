import type { ImageMetadata } from 'astro';

const files = import.meta.glob<{ default: ImageMetadata }>('/src/assets/products/*.jpg', { eager: true });

/** Resolve a product image path (e.g. "/fibra-polvo-amway-nutrilite.jpg") to its imported asset. */
export function productImage(path: string): ImageMetadata | undefined {
  const name = path.replace(/^\//, '');
  return files[`/src/assets/products/${name}`]?.default;
}
