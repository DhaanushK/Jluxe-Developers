export type ProjectStatus =
  | "UPCOMING"
  | "ACTIVE"
  | "LIMITED"
  | "SOLD_OUT"
  | "COMPLETED";

export type InventoryStatus = "AVAILABLE" | "RESERVED" | "SOLD";

export type RealEstateProject = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description?: string;
  status: ProjectStatus;
  location: {
    city?: string;
    area?: string;
    address?: string;
    mapUrl?: string;
  };
  priceFrom?: number;
  priceLabel?: string;
  areaLabel?: string;
  propertyTypes?: string[];
  amenities?: string[];
  nearbyLocations?: { name: string; distance?: string }[];
  images?: string[];
  videos?: string[];
  documents?: { name: string; url: string }[];
  featured?: boolean;
};

export type RealEstateProperty = {
  id: string;
  slug: string;
  projectId?: string;
  name: string;
  type: "APARTMENT" | "VILLA" | "COMMERCIAL" | "PLOT" | "OTHER";
  location?: { city?: string; area?: string; address?: string };
  price?: number;
  priceLabel?: string;
  area?: number;
  areaUnit?: string;
  dimensions?: string;
  facing?: string;
  status: InventoryStatus;
  description?: string;
  images?: string[];
  documents?: { name: string; url: string }[];
  amenities?: string[];
};

export type RealEstatePlot = {
  id: string;
  slug: string;
  projectId: string;
  plotNumber: string;
  area?: number;
  areaUnit?: string;
  price?: number;
  priceLabel?: string;
  facing?: string;
  dimensions?: string;
  status: InventoryStatus;
  notes?: string;
  images?: string[];
};

// Inventory remains empty until JLUXE provides approved project data.
export const projects: RealEstateProject[] = [];
export const properties: RealEstateProperty[] = [];
export const plots: RealEstatePlot[] = [];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getPropertyBySlug(slug: string) {
  return properties.find((property) => property.slug === slug);
}

export function getPlotBySlug(slug: string) {
  return plots.find((plot) => plot.slug === slug);
}

export function getPropertiesByProject(projectId: string) {
  return properties.filter((property) => property.projectId === projectId);
}

export function getPlotsByProject(projectId: string) {
  return plots.filter((plot) => plot.projectId === projectId);
}
