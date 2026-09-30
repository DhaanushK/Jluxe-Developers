import type { DatabaseSync } from "node:sqlite";
import { openDatabase } from "@/server/db/database";
import type { Ecosystem, Service } from "@/lib/site";
import type { Insight, Testimonial } from "@/lib/editorial";
import type {
  InventoryStatus,
  ProjectStatus,
  RealEstatePlot,
  RealEstateProject,
  RealEstateProperty,
} from "@/lib/real-estate";

type Row = Record<string, unknown>;

function json<T>(value: unknown, fallback: T): T {
  if (typeof value !== "string") return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function mapEcosystem(row: Row): Ecosystem {
  return {
    slug: row.slug as Ecosystem["slug"],
    index: row.display_index as string,
    name: row.name as string,
    short: row.short as string,
    summary: row.summary as string,
    audience: json(row.audience_json, [] as string[]),
    services: [],
    status: "active",
    cta: row.cta as string,
  };
}

function mapService(row: Row): Service {
  return {
    id: row.id as string,
    slug: row.slug as string,
    name: row.name as string,
    shortDescription: (row.short_description as string | null) ?? undefined,
    ecosystemSlugs: [row.ecosystem_id as Ecosystem["slug"]],
    audience: json(row.audience_json, [] as string[]),
    offerings: json(row.offerings_json, [] as string[]),
    status: "active",
    order: row.display_order as number,
    isPublished: true,
  };
}

function mapProject(row: Row): RealEstateProject {
  return {
    id: row.id as string,
    slug: row.slug as string,
    name: row.name as string,
    shortDescription: row.short_description as string,
    description: (row.description as string | null) ?? undefined,
    status: row.project_status as ProjectStatus,
    location: {
      city: (row.city as string | null) ?? undefined,
      area: (row.area as string | null) ?? undefined,
      address: (row.address as string | null) ?? undefined,
      mapUrl: (row.map_url as string | null) ?? undefined,
    },
    priceFrom: (row.price_from as number | null) ?? undefined,
    priceLabel: (row.price_label as string | null) ?? undefined,
    areaLabel: (row.area_label as string | null) ?? undefined,
    propertyTypes: json(row.property_types_json, [] as string[]),
    amenities: json(row.amenities_json, [] as string[]),
    nearbyLocations: json(row.nearby_locations_json, [] as { name: string; distance?: string }[]),
    featured: Boolean(row.featured),
  };
}

function mapProperty(row: Row): RealEstateProperty {
  return {
    id: row.id as string,
    slug: row.slug as string,
    projectId: (row.project_id as string | null) ?? undefined,
    name: row.name as string,
    type: row.property_type as RealEstateProperty["type"],
    location: {
      city: (row.city as string | null) ?? undefined,
      area: (row.area_location as string | null) ?? undefined,
      address: (row.address as string | null) ?? undefined,
    },
    price: (row.price as number | null) ?? undefined,
    priceLabel: (row.price_label as string | null) ?? undefined,
    area: (row.area as number | null) ?? undefined,
    areaUnit: (row.area_unit as string | null) ?? undefined,
    dimensions: (row.dimensions as string | null) ?? undefined,
    facing: (row.facing as string | null) ?? undefined,
    status: row.inventory_status as InventoryStatus,
    description: (row.description as string | null) ?? undefined,
    amenities: json(row.amenities_json, [] as string[]),
  };
}

function mapPlot(row: Row): RealEstatePlot {
  return {
    id: row.id as string,
    slug: row.slug as string,
    projectId: row.project_id as string,
    plotNumber: row.plot_number as string,
    area: (row.area as number | null) ?? undefined,
    areaUnit: (row.area_unit as string | null) ?? undefined,
    price: (row.price as number | null) ?? undefined,
    priceLabel: (row.price_label as string | null) ?? undefined,
    facing: (row.facing as string | null) ?? undefined,
    dimensions: (row.dimensions as string | null) ?? undefined,
    status: row.inventory_status as InventoryStatus,
    notes: (row.notes as string | null) ?? undefined,
  };
}

function withDatabase<T>(callback: (database: DatabaseSync) => T) {
  const database = openDatabase();
  try {
    return callback(database);
  } finally {
    database.close();
  }
}

export function getPublishedEcosystems() {
  return withDatabase((database) => {
    const rows = database.prepare("SELECT * FROM ecosystems WHERE status = 'PUBLISHED' ORDER BY display_index").all() as Row[];
    return rows.map(mapEcosystem);
  });
}

export function getPublishedEcosystemBySlug(slug: string) {
  return withDatabase((database) => {
    const row = database.prepare("SELECT * FROM ecosystems WHERE slug = ? AND status = 'PUBLISHED'").get(slug) as Row | undefined;
    return row ? mapEcosystem(row) : undefined;
  });
}

export function getPublishedServices() {
  return withDatabase((database) => {
    const rows = database.prepare("SELECT * FROM services WHERE status = 'PUBLISHED' ORDER BY ecosystem_id, display_order").all() as Row[];
    return rows.map(mapService);
  });
}

export function getPublishedServiceBySlug(slug: string) {
  return withDatabase((database) => {
    const row = database.prepare("SELECT * FROM services WHERE slug = ? AND status = 'PUBLISHED'").get(slug) as Row | undefined;
    return row ? mapService(row) : undefined;
  });
}

export function getPublishedProjects() {
  return withDatabase((database) => {
    const rows = database.prepare("SELECT * FROM projects WHERE status = 'PUBLISHED' ORDER BY featured DESC, name").all() as Row[];
    return rows.map(mapProject);
  });
}

export function getPublishedProjectBySlug(slug: string) {
  return withDatabase((database) => {
    const row = database.prepare("SELECT * FROM projects WHERE slug = ? AND status = 'PUBLISHED'").get(slug) as Row | undefined;
    return row ? mapProject(row) : undefined;
  });
}

export function getPublishedProperties() {
  return withDatabase((database) => {
    const rows = database.prepare("SELECT * FROM properties WHERE published_at IS NOT NULL ORDER BY name").all() as Row[];
    return rows.map(mapProperty);
  });
}

export function getPublishedPropertyBySlug(slug: string) {
  return withDatabase((database) => {
    const row = database.prepare("SELECT * FROM properties WHERE slug = ? AND published_at IS NOT NULL").get(slug) as Row | undefined;
    return row ? mapProperty(row) : undefined;
  });
}

export function getPublishedPlots() {
  return withDatabase((database) => {
    const rows = database.prepare("SELECT * FROM plots WHERE published_at IS NOT NULL ORDER BY plot_number").all() as Row[];
    return rows.map(mapPlot);
  });
}

export function getPublishedPlotBySlug(slug: string) {
  return withDatabase((database) => {
    const row = database.prepare("SELECT * FROM plots WHERE slug = ? AND published_at IS NOT NULL").get(slug) as Row | undefined;
    return row ? mapPlot(row) : undefined;
  });
}

function mapTestimonial(row: Row): Testimonial {
  return {
    id: row.id as string,
    quote: row.quote as string,
    name: row.name as string,
    role: (row.role as string | null) ?? undefined,
    organization: (row.company as string | null) ?? undefined,
    ecosystemId: (row.ecosystem_id as string | null) ?? undefined,
    serviceId: (row.service_id as string | null) ?? undefined,
    featured: Boolean(row.featured),
    status: "PUBLISHED",
    publishedAt: (row.published_at as string | null) ?? undefined,
  };
}

function mapInsight(row: Row): Insight {
  return {
    id: row.id as string,
    slug: row.slug as string,
    title: row.title as string,
    excerpt: (row.excerpt as string | null) ?? undefined,
    content: row.content as string,
    author: (row.author as string | null) ?? undefined,
    category: (row.category as string | null) ?? undefined,
    tags: json(row.tags_json, [] as string[]),
    featured: Boolean(row.featured),
    status: "PUBLISHED",
    publishedAt: (row.published_at as string | null) ?? undefined,
    seoTitle: (row.seo_title as string | null) ?? undefined,
    seoDescription: (row.seo_description as string | null) ?? undefined,
  };
}

export function getPublishedTestimonials(featuredOnly = false) {
  return withDatabase((database) => {
    const query = featuredOnly
      ? "SELECT * FROM testimonials WHERE status = 'PUBLISHED' AND featured = 1 ORDER BY published_at DESC"
      : "SELECT * FROM testimonials WHERE status = 'PUBLISHED' ORDER BY published_at DESC";
    return (database.prepare(query).all() as Row[]).map(mapTestimonial);
  });
}

export function getPublishedInsights(limit?: number) {
  return withDatabase((database) => {
    const query = limit
      ? "SELECT * FROM insights WHERE status = 'PUBLISHED' ORDER BY featured DESC, published_at DESC LIMIT ?"
      : "SELECT * FROM insights WHERE status = 'PUBLISHED' ORDER BY featured DESC, published_at DESC";
    const rows = (limit ? database.prepare(query).all(limit) : database.prepare(query).all()) as Row[];
    return rows.map(mapInsight);
  });
}

export function getPublishedInsightBySlug(slug: string) {
  return withDatabase((database) => {
    const row = database.prepare("SELECT * FROM insights WHERE slug = ? AND status = 'PUBLISHED'").get(slug) as Row | undefined;
    return row ? mapInsight(row) : undefined;
  });
}

export function getRelatedPublishedInsights(insight: Insight, limit = 3) {
  return withDatabase((database) => {
    const query = insight.category
      ? "SELECT * FROM insights WHERE status = 'PUBLISHED' AND id != ? AND category = ? ORDER BY featured DESC, published_at DESC LIMIT ?"
      : "SELECT * FROM insights WHERE status = 'PUBLISHED' AND id != ? ORDER BY featured DESC, published_at DESC LIMIT ?";
    const rows = (insight.category
      ? database.prepare(query).all(insight.id, insight.category, limit)
      : database.prepare(query).all(insight.id, limit)) as Row[];
    return rows.map(mapInsight);
  });
}
