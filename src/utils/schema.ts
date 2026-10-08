import { SITE, priceValidUntil } from '../data/site';
import type { CollectionEntry } from 'astro:content';

const ORG_ID = `${SITE.url}/#organization`;
const SITE_ID = `${SITE.url}/#website`;

export function organizationSchema() {
  return {
    '@type': ['Organization', 'LocalBusiness'],
    '@id': ORG_ID,
    name: SITE.legalName,
    alternateName: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/images/favicons/android-chrome-512x512.png`,
    image: `${SITE.url}${SITE.ogImage}`,
    description: SITE.description,
    telephone: SITE.phoneE164,
    priceRange: '$$',
    currenciesAccepted: 'COP',
    paymentAccepted: 'Efectivo, Transferencia, Nequi, Daviplata',
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: SITE.address.lat, longitude: SITE.address.lng },
    areaServed: [{ '@type': 'City', name: 'Bogotá' }, { '@type': 'Country', name: 'Colombia' }],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: SITE.hours.days,
      opens: SITE.hours.opens,
      closes: SITE.hours.closes,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: SITE.phoneE164,
      contactType: 'sales',
      areaServed: 'CO',
      availableLanguage: 'es',
    },
    sameAs: [SITE.social.facebook, SITE.social.instagram],
  };
}

export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': SITE_ID,
    url: SITE.url,
    name: SITE.legalName,
    inLanguage: 'es-CO',
    publisher: { '@id': ORG_ID },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url.startsWith('http') ? it.url : `${SITE.url}${it.url}`,
    })),
  };
}

export function faqSchema(faq: { q: string; a: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function productSchema(p: CollectionEntry<'products'>['data'], brandName: string, url: string) {
  return {
    '@type': 'Product',
    '@id': `${url}#product`,
    name: p.name,
    image: [p.image.startsWith('http') ? p.image : `${SITE.url}${p.image}`],
    description: p.description,
    brand: { '@type': 'Brand', name: brandName },
    manufacturer: { '@type': 'Organization', name: 'Amway' },
    ...(p.sku ? { sku: p.sku, mpn: p.sku } : {}),
    ...(p.gallery?.length ? { image: [...new Set([p.image.startsWith('http') ? p.image : `${SITE.url}${p.image}`, ...p.gallery])] } : {}),
    category: p.category,
    offers: {
      '@type': 'Offer',
      url,
      priceCurrency: 'COP',
      price: p.price,
      priceValidUntil: priceValidUntil(),
      availability: p.status === 'consultar' ? 'https://schema.org/LimitedAvailability' : 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: { '@id': ORG_ID },
      areaServed: { '@type': 'Country', name: 'Colombia' },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'CO' },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: { '@type': 'QuantitativeValue', minValue: 0, maxValue: 1, unitCode: 'DAY' },
          transitTime: { '@type': 'QuantitativeValue', minValue: 1, maxValue: 3, unitCode: 'DAY' },
        },
      },
    },
  };
}

export function itemListSchema(name: string, items: { name: string; url: string }[]) {
  return {
    '@type': 'ItemList',
    name,
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, url: `${SITE.url}${it.url}` })),
  };
}
