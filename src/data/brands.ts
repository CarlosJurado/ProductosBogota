export type BrandSlug = 'nutrilite' | 'artistry' | 'satinique' | 'g-h' | 'amway-home' | 'glister' | 'amway';

export interface Brand {
  slug: BrandSlug;
  name: string;
  short: string;
  title: string;
  description: string;
  intro: string;
  color: string; // accent token
  categories: Record<string, string>;
  faq: { q: string; a: string }[];
}

export const BRANDS: Record<Exclude<BrandSlug, 'amway'>, Brand> = {
  nutrilite: {
    slug: 'nutrilite',
    name: 'Nutrilite',
    short: 'Nutrición',
    title: 'Productos Nutrilite en Bogotá: precios y catálogo 2026',
    description:
      'Suplementos Nutrilite de Amway en Bogotá: Daily Plus, Omega 3, Fibra, Proteína y más. Precios actualizados, pedido por WhatsApp y entrega a domicilio.',
    intro:
      'Nutrilite es la marca de vitaminas y suplementos más vendida del mundo, con más de 85 años cultivando sus propios ingredientes en granjas orgánicas certificadas. Aquí encuentras el catálogo completo disponible en Bogotá con precio de lista.',
    color: 'nutrilite',
    categories: { suplementos: 'Suplementos dietarios', 'alimentos-y-bebidas': 'Alimentos y bebidas' },
    faq: [
      { q: '¿Cuánto cuestan los productos Nutrilite en Colombia?', a: 'Cada ficha muestra el precio de lista vigente en pesos colombianos. Si te registras como Cliente Amway obtienes descuentos adicionales en cada compra.' },
      { q: '¿Dónde comprar Nutrilite en Bogotá?', a: 'Pides directamente por WhatsApp al 322 346 1713 a un Empresario Independiente Amway y recibes el producto a domicilio en Bogotá, o lo enviamos a cualquier ciudad de Colombia.' },
      { q: '¿Los productos Nutrilite son originales?', a: 'Sí. Todos los productos salen del inventario oficial de Amway Colombia, sellados y con registro sanitario INVIMA.' },
      { q: '¿Necesito registrarme en Amway para comprar?', a: 'No. Puedes comprar directamente sin registro. El registro como cliente es opcional y sirve para obtener descuentos y promociones.' },
    ],
  },
  artistry: {
    slug: 'artistry',
    name: 'Artistry',
    short: 'Belleza',
    title: 'Productos Artistry en Bogotá: cuidado de la piel y maquillaje',
    description:
      'Catálogo Artistry de Amway en Bogotá: sueros, cremas, limpiadores, protector solar y maquillaje. Precios actualizados y pedido por WhatsApp a domicilio.',
    intro:
      'Artistry combina ciencia dermatológica con extractos botánicos de las granjas Nutrilite. Encuentra aquí las líneas Skin Nutrition, Signature Select, Studio, Intensive Skincare y el maquillaje Exact Fit disponibles en Bogotá.',
    color: 'artistry',
    categories: { 'cuidado-de-la-piel': 'Cuidado de la piel', maquillaje: 'Maquillaje', 'proteccion-solar': 'Protección solar' },
    faq: [
      { q: '¿Qué línea Artistry es para mi tipo de piel?', a: 'Skin Nutrition es la línea base para piel normal, seca, mixta o grasa; Intensive Skincare y Reactivación Renovadora son antiedad; Studio es para piel joven. Escríbenos por WhatsApp y te ayudamos a elegir.' },
      { q: '¿Los productos Artistry están probados dermatológicamente?', a: 'Sí, toda la línea Artistry es dermatológicamente probada, hipoalergénica y no comedogénica.' },
      { q: '¿Hacen envíos fuera de Bogotá?', a: 'Sí, enviamos a toda Colombia. Dentro de Bogotá la entrega es a domicilio.' },
    ],
  },
  satinique: {
    slug: 'satinique',
    name: 'Satinique',
    short: 'Cabello',
    title: 'Shampoo y productos Satinique en Bogotá: precios 2026',
    description:
      'Shampoo, acondicionador y tratamientos Satinique de Amway en Bogotá: anticaída, cuidado del color, hidratación. Precio actualizado y pedido por WhatsApp.',
    intro:
      'Satinique es la línea de cuidado capilar de Amway con tecnología Enerjuve, un complejo que fortalece la fibra capilar desde el interior. Shampoos, acondicionadores, mascarillas y tratamientos para cada necesidad.',
    color: 'satinique',
    categories: { cabello: 'Cuidado del cabello' },
    faq: [
      { q: '¿Cuánto cuesta el shampoo Satinique en Colombia?', a: 'Los shampoos y acondicionadores Satinique tienen un precio de lista de $52.850 COP (280 ml). Los tratamientos y mascarillas van de $77.550 a $83.250 COP.' },
      { q: '¿Dónde venden shampoo Satinique en Bogotá?', a: 'Satinique se vende únicamente a través de Empresarios Independientes Amway. Pídelo por WhatsApp al 322 346 1713 y lo recibes a domicilio.' },
      { q: '¿Cuál es el mejor Satinique para la caída del cabello?', a: 'La combinación recomendada es Shampoo Anti Caída + Acondicionador Anti Caída, ambos con tecnología Enerjuve y extracto de ginseng.' },
    ],
  },
  'g-h': {
    slug: 'g-h',
    name: 'G&H',
    short: 'Cuerpo',
    title: 'Productos G&H de Amway en Bogotá: jabones, cremas y cuidado oral',
    description:
      'Línea G&H de Amway en Bogotá: jabón, gel de baño, crema de manos, desodorante, pasta dental y enjuague bucal. Precios actualizados y pedido por WhatsApp.',
    intro:
      'G&H es la línea de cuidado personal de Amway: fórmulas con ingredientes botánicos, sin parabenos, para toda la familia. Incluye cuidado corporal e higiene bucal.',
    color: 'gh',
    categories: { cuerpo: 'Cuidado del cuerpo', 'higiene-bucal': 'Higiene bucal' },
    faq: [
      { q: '¿Los productos G&H sirven para piel sensible?', a: 'Sí. La línea G&H es dermatológicamente probada y libre de parabenos; el Gel de Baño y Shampoo para Bebé es apto incluso para recién nacidos.' },
      { q: '¿Cómo compro productos G&H en Bogotá?', a: 'Escríbenos por WhatsApp al 322 346 1713 con el producto que necesitas y coordinamos la entrega a domicilio.' },
    ],
  },
  'amway-home': {
    slug: 'amway-home',
    name: 'Amway Home',
    short: 'Hogar',
    title: 'Amway Home en Bogotá: L.O.C., SA8, Dish Drops y Pursue',
    description:
      'Limpieza Amway Home en Bogotá: L.O.C. multiusos, detergentes SA8, Dish Drops y Pursue. Concentrados y biodegradables, precio actualizado, pedido por WhatsApp.',
    intro:
      'Amway Home ofrece limpiadores concentrados y biodegradables para el hogar. Un solo envase rinde hasta 10 veces más que un limpiador convencional, lo que reduce costo por uso y residuos plásticos.',
    color: 'home',
    categories: { superficies: 'Limpieza de superficies', lavanderia: 'Lavandería', lavaplatos: 'Lavaplatos' },
    faq: [
      { q: '¿Cuánto rinde el L.O.C. de Amway?', a: 'El L.O.C. Multiusos de 1 litro rinde hasta 200 litros de solución limpiadora, porque se usa diluido.' },
      { q: '¿Cuál es el precio del L.O.C. en Colombia?', a: 'El L.O.C. Limpiador Concentrado Multiusos tiene precio de lista de $61.050 COP. Revisa cada ficha para la presentación exacta.' },
      { q: '¿Los productos Amway Home son biodegradables?', a: 'Sí. Las fórmulas de Amway Home son biodegradables y están certificadas por el programa Safer Choice de la EPA.' },
    ],
  },
  glister: {
    slug: 'glister',
    name: 'Glister',
    short: 'Oral',
    title: 'Productos Glister en Bogotá: cuidado bucal Amway',
    description: 'Cepillos y cuidado bucal Glister de Amway en Bogotá. Precio actualizado y pedido por WhatsApp con entrega a domicilio.',
    intro: 'Glister es la marca de cuidado bucal de Amway, con más de 40 años en el mercado.',
    color: 'glister',
    categories: { 'higiene-bucal': 'Higiene bucal' },
    faq: [
      { q: '¿Cómo compro Glister en Bogotá?', a: 'Pídelo por WhatsApp al 322 346 1713 y lo recibes a domicilio en Bogotá o por envío nacional.' },
    ],
  },
};

export const CATEGORY_NAMES: Record<string, string> = Object.assign({}, ...Object.values(BRANDS).map((b) => b.categories));

export function brandOf(slug: BrandSlug): Brand {
  return BRANDS[slug as Exclude<BrandSlug, 'amway'>] ?? BRANDS.nutrilite;
}
