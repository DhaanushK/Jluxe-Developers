export type EditorialStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role?: string;
  organization?: string;
  ecosystemId?: string;
  serviceId?: string;
  featured: boolean;
  status: EditorialStatus;
  publishedAt?: string;
};

export type Insight = {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  content: string;
  author?: string;
  category?: string;
  tags: string[];
  featured: boolean;
  status: EditorialStatus;
  publishedAt?: string;
  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;
  imageUrl?: string;
  imageAlt?: string;
};
