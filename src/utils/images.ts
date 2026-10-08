import type { ImageMetadata } from 'astro';

const files = import.meta.glob<{ default: ImageMetadata }>('/src/assets/products/*.jpg', { eager: true });

/** Resolve a product image path (e.g. "/fibra-polvo-amway-nutrilite.jpg") to its imported asset. */
export function productImage(path: string): ImageMetadata | undefined {
  const name = path.replace(/^\//, '');
  return files[`/src/assets/products/${name}`]?.default;
}

const galleryFiles = import.meta.glob<{ default: ImageMetadata }>('/src/assets/products/gallery/*.{jpg,png,webp}', { eager: true });

/** Local gallery images for a slug (downloaded with `npm run images`), in order. */
export function localGallery(slug: string): ImageMetadata[] {
  return Object.entries(galleryFiles)
    .filter(([k]) => k.includes(`/gallery/${slug}-`))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, m]) => m.default);
}
