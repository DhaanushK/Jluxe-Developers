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
  | "boutique"
  | "interiors-design";

export type Ecosystem = {
  slug: EcosystemSlug;
  index: string;
  name: string;
  short: string;
  summary: string;
  audience: string[];
  services: { name: string; note?: string }[];
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
      "Property buying, selling, marketing, project promotion and channel partnerships, handled by one team from first enquiry to site visit.",
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
      "Marketing, branding, lead generation, sales, business development, banking and events for businesses that want one accountable growth partner.",
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
      "Recruitment, staffing, corporate training, college training and career counselling for employers, institutions and people building careers.",
    audience: ["Employers", "Educational institutions", "Professionals", "Students and job seekers"],
    services: [
      { name: "Recruitment" },
      { name: "Staffing" },
      { name: "Corporate Training" },
      { name: "College Training" },
      { name: "Career Counselling" },
    ],
    status: "active",
    cta: "Explore Talent & Training",
  },
  {
    slug: "boutique",
    index: "04",
    name: "JLuxe Boutique",
    short: "Boutique",
    summary:
      "The Boutique is being prepared. Details will be shared here directly by JLuxe when it launches.",
    audience: [],
    services: [],
    status: "coming-soon",
    cta: "Get notified when this launches",
  },
  {
    slug: "interiors-design",
    index: "05",
    name: "JLuxe Interiors and Design",
    short: "Interiors & Design",
    summary:
      "Architecture, interior design, space planning, 2D and 3D design, project coordination and renovation for homes and workplaces.",
    audience: ["Homeowners", "Businesses", "Developers"],
    services: [
      { name: "Residential architecture" },
      { name: "Commercial architecture" },
      { name: "Home interiors" },
      { name: "Office interiors" },
      { name: "Space planning" },
      { name: "2D / 3D design and elevations" },
      { name: "Project coordination" },
      { name: "Renovation and space transformation" },
    ],
    status: "active",
    cta: "Explore Interiors & Design",
  },
];

export const getEcosystem = (slug: string) => ecosystems.find((e) => e.slug === slug);
