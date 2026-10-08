import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const products = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/products' }),
  schema: z.object({
    slug: z.string(),
    name: z.string().min(3),
    brand: z.enum(['nutrilite', 'artistry', 'satinique', 'g-h', 'amway-home', 'glister', 'amway']),
    category: z.string(),
    price: z.number().positive(),
    currency: z.literal('COP').default('COP'),
    image: z.string(),
    description: z.string().min(40),
    benefits: z.array(z.string()).min(1).max(6),
    usage: z.string().optional(),
    sku: z.string().optional(),
    featured: z.boolean().default(false),
    /** Slug of the canonical product when this page is a duplicate */
    canonicalTo: z.string().optional(),
  }),
});

export const collections = { products };
