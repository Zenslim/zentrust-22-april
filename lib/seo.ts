import { Metadata } from 'next';
import { SeoFields } from './types';

export function buildMetadata(defaults: SeoFields, overrides?: Partial<SeoFields>): Metadata {
  const seo = { ...defaults, ...overrides };
  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      title: seo.title,
      description: seo.description,
      images: seo.image ? [seo.image] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: seo.image ? [seo.image] : [],
    },
  };
}
