// Central site configuration and ecosystem content.
// Values marked null are awaiting official information from JLUXE and must
// never be replaced with invented data.

export const siteSettings = {
  name: "JLuxe",
  tagline: "Building Relationships. Creating Opportunities. Delivering Results.",
  philosophy: ["Trust", "Transparency", "Professionalism", "Results"],
  phone: null as string | null,
  email: null as string | null,
  whatsapp: null as string | null, // digits only, with country code
  address: null as string | null,
  hours: null as string | null,
};

export function whatsappLink(message: string) {
  if (!siteSettings.whatsapp) return null;
  return `https://wa.me/${siteSettings.whatsapp}?text=${encodeURIComponent(message)}`;
}

export type EcosystemSlug =
  | "real-estate"
  | "business-solutions"
  | "talent-training"
  | "interiors-design";

export type EcosystemService = {
  name: string;
  note?: string;
};

export type Ecosystem = {
  slug: EcosystemSlug;
  index: string;
  name: string;
  short: string;
  summary: string;
  audience: string[];
  services: EcosystemService[];
  status: "active" | "coming-soon";
  cta: string;
};

export const ecosystems: Ecosystem[] = [
  {
    slug: "real-estate",
    index: "01",
    name: "JLuxe Real Estate",
    short: "Real Estate",
    summary:
      "Property buying, selling, project promotion and channel partnerships.",
    audience: ["Property buyers", "Property sellers", "Developers"],
    services: [
      { name: "Plot buying", note: "Guidance on plots that match your requirement and budget." },
      { name: "Plot selling", note: "Positioning and marketing your property to qualified buyers." },
      { name: "Project promotion", note: "Marketing and sales support for development projects." },
      { name: "Channel partnerships", note: "Structured sales partnerships for developers." },
      { name: "Site visits", note: "Arranged visits with a JLuxe representative." },
    ],
    status: "active",
    cta: "Explore Real Estate",
  },
  {
    slug: "business-solutions",
    index: "02",
    name: "JLuxe Business Solutions",
    short: "Business Solutions",
    summary:
      "Marketing, branding, lead generation, sales, banking and events.",
    audience: ["Businesses", "Corporates", "Developers"],
    services: [
      { name: "Marketing" },
      { name: "Branding" },
      { name: "Lead Generation" },
      { name: "Sales & Business Development" },
      { name: "Channel Partner" },
      { name: "Banking" },
      { name: "Event Management" },
    ],
    status: "active",
    cta: "Explore Business Solutions",
  },
  {
    slug: "talent-training",
    index: "03",
    name: "JLuxe Talent & Training",
    short: "Talent & Training",
    summary:
      "Recruitment, staffing, training and career counselling.",
    audience: ["Employers", "Educational institutions", "Professionals", "Students and job seekers"],
    services: [
      { name: "Recruitment" },
      { name: "Staffing" },
      { name: "Corporate Training" },
      { name: "College Training" },
      { name: "Career Counselling" },
      { name: "Careers" },
    ],
    status: "active",
    cta: "Explore Talent & Training",
  },
  {
    slug: "interiors-design",
    index: "04",
    name: "JLuxe Interiors and Design",
    short: "Interiors & Design",
    summary:
      "Architecture, interiors, space planning, design and renovation.",
    audience: ["Homeowners", "Businesses", "Developers"],
    services: [
      { name: "Residential architecture" },
      { name: "Commercial architecture" },
      { name: "Home interiors" },
      { name: "Office interiors" },
      { name: "Interior Design" },
      { name: "Space planning" },
      { name: "2D / 3D Design" },
      { name: "Elevations" },
      { name: "Project coordination" },
      { name: "Renovation" },
      { name: "Space transformation" },
    ],
    status: "active",
    cta: "Explore Interiors & Design",
  },
];

export type Service = {
  id: string;
  slug: string;
  name: string;
  shortDescription?: string;
  ecosystemSlugs: EcosystemSlug[];
  audience?: string[];
  offerings?: string[];
  status: "active" | "coming-soon";
  order: number;
  isPublished: boolean;
};

const serviceSlugOverrides: Record<string, string> = {
  "business-solutions:Sales & Business Development":
    "sales-business-development",
  "business-solutions:Channel Partner": "channel-partner",
};

const serviceAudiences: Record<string, string[]> = {
  "real-estate:Plot buying": ["Property buyers"],
  "real-estate:Plot selling": ["Property sellers"],
  "real-estate:Project promotion": ["Developers"],
  "real-estate:Channel partnerships": ["Developers"],
  "real-estate:Site visits": ["Property buyers"],
  "business-solutions:Marketing": ["Businesses", "Corporates"],
  "business-solutions:Branding": ["Businesses", "Corporates"],
  "business-solutions:Lead Generation": ["Businesses", "Corporates"],
  "business-solutions:Sales & Business Development": [
    "Businesses",
    "Corporates",
  ],
  "business-solutions:Channel Partner": ["Developers"],
  "business-solutions:Banking": ["Property buyers"],
  "business-solutions:Event Management": ["Businesses", "Corporates"],
  "talent-training:Recruitment": ["Employers"],
  "talent-training:Staffing": ["Employers"],
  "talent-training:Corporate Training": ["Employers"],
  "talent-training:College Training": ["Educational institutions"],
  "talent-training:Career Counselling": [
    "Professionals",
    "Students and job seekers",
  ],
};

const serviceOfferings: Record<string, string[]> = {
  "business-solutions:Channel Partner": [
    "Project promotion",
    "Lead generation",
    "Customer enquiry management",
    "Site visit coordination",
    "Sales support",
    "Follow-up & conversion support",
    "Property presentations",
    "Customer relationship management",
    "Project marketing support",
    "Sales performance support",
  ],
  "business-solutions:Banking": [
    "Home loan assistance",
    "Property loan coordination",
    "Loan documentation guidance",
    "Customer-bank coordination",
    "Financial product awareness",
    "Loan follow-up support",
  ],
  "business-solutions:Event Management": [
    "Corporate events",
    "Property launches",
    "Sales meets",
    "Dealer & channel partner meets",
    "Customer engagement events",
    "Training events",
    "Seminars & workshops",
    "College events",
    "Promotional events",
    "Employee engagement activities",
  ],
  "talent-training:Recruitment": [
    "Permanent recruitment",
    "Contract staffing",
    "Executive search",
    "Sales recruitment",
    "Real estate recruitment",
    "HR & administration recruitment",
    "Customer relationship management recruitment",
    "Finance & accounts recruitment",
    "Engineering & project recruitment",
    "Support staff recruitment",
  ],
  "talent-training:Staffing": [
    "Permanent recruitment",
    "Contract staffing",
    "Executive search",
    "Sales recruitment",
    "Real estate recruitment",
    "HR & administration recruitment",
    "Customer relationship management recruitment",
    "Finance & accounts recruitment",
    "Engineering & project recruitment",
    "Support staff recruitment",
  ],
};

function serviceSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/&/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const services: Service[] = ecosystems.flatMap((ecosystem) =>
  ecosystem.services.map((service, index) => {
    const key = `${ecosystem.slug}:${service.name}`;

    return {
      id: key,
      slug: serviceSlugOverrides[key] ?? serviceSlug(service.name),
      name: service.name,
      shortDescription: service.note,
      ecosystemSlugs: [ecosystem.slug],
      audience: serviceAudiences[key],
      offerings: serviceOfferings[key],
      status: ecosystem.status,
      order: index + 1,
      isPublished: ecosystem.status === "active",
    };
  }),
);

export const getEcosystem = (slug: string) => ecosystems.find((e) => e.slug === slug);

export const getService = (slug: string) => services.find((service) => service.slug === slug);
