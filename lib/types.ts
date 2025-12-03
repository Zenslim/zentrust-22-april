export type PublishStatus = 'draft' | 'published';

export interface SeoFields {
  title: string;
  description: string;
  image?: string;
}

export interface PageContent {
  title: string;
  slug: string;
  heroImage?: string;
  body: string;
  seo: SeoFields;
  status: PublishStatus;
}

export interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  heroImage?: string;
  readTime: string;
  date: string;
  status: PublishStatus;
  seo: SeoFields;
}

export interface SuccessStory {
  title: string;
  slug: string;
  summary: string;
  image: string;
  link?: string;
  status: PublishStatus;
  body?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  photo: string;
  socials?: { platform: string; url: string }[];
  status: PublishStatus;
}

export interface Program {
  title: string;
  slug: string;
  description: string;
  icon: string;
  metric?: string;
  heroImage?: string;
  status: PublishStatus;
}

export interface ImpactMetrics {
  treesPlanted: number;
  householdsSupported: number;
  acresRestored: number;
  volunteersEngaged: number;
  researchProjects: number;
}

export interface NewsletterPayload {
  email: string;
  consent: boolean;
}
