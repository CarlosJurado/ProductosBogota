export const SITE = {
  url: 'https://productosbogota.com',
  name: 'Productos Bogotá',
  legalName: 'Productos Amway Bogotá',
  tagline: 'Empresario Independiente Amway en Bogotá',
  description:
    'Catálogo Amway en Bogotá con precios actualizados: Nutrilite, Artistry, Satinique, G&H, Glister y Amway Home. Pide por WhatsApp y recibe a domicilio.',
  phoneDisplay: '322 346 1713',
  phoneE164: '+573223461713',
  whatsapp: 'https://wa.me/573223461713',
  whatsappCatalog: 'https://linkeo.click/TiendaAmwayCatalogo',
  registerClient: 'https://linkeo.click/ClienteAmway',
  registerBusiness: 'https://linkeo.click/NegocioPropioAmway',
  address: {
    street: 'Cra 62 #164 - 40',
    city: 'Bogotá',
    region: 'Cundinamarca',
    postalCode: '111156',
    country: 'CO',
    lat: 4.7479476,
    lng: -74.0642513,
  },
  hours: { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '08:00', closes: '18:00' },
  social: {
    facebook: 'https://facebook.com/ProductosAmwayBogota',
    instagram: 'https://instagram.com/ProductosAmwayBogota',
  },
  ogImage: '/ProductosAmwayBogota.jpg',
  locale: 'es_CO',
} as const;

export function waLink(message: string) {
  return `${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function formatCOP(value: number) {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value).replace(/\u00a0/g, ' ');
}

/** Price validity: last day of the next quarter, recomputed on every build */
export function priceValidUntil() {
  const d = new Date();
  const q = Math.floor(d.getMonth() / 3) + 1; // next quarter end
  return new Date(d.getFullYear(), q * 3 + 3, 0).toISOString().slice(0, 10);
}
