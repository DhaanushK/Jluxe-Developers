PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS schema_migrations (
  id TEXT PRIMARY KEY,
  applied_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ecosystems (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  short TEXT NOT NULL,
  summary TEXT NOT NULL,
  audience_json TEXT NOT NULL DEFAULT '[]',
  cta TEXT NOT NULL,
  display_index TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('DRAFT', 'PUBLISHED', 'ARCHIVED')),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  published_at TEXT
);

CREATE TABLE IF NOT EXISTS services (
  id TEXT PRIMARY KEY,
  ecosystem_id TEXT NOT NULL REFERENCES ecosystems(id),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  short_description TEXT,
  description TEXT,
  audience_json TEXT NOT NULL DEFAULT '[]',
  offerings_json TEXT NOT NULL DEFAULT '[]',
  engagement_process_json TEXT NOT NULL DEFAULT '[]',
  featured INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL CHECK (status IN ('DRAFT', 'PUBLISHED', 'ARCHIVED')),
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  published_at TEXT
);

CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  ecosystem_id TEXT NOT NULL REFERENCES ecosystems(id),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  short_description TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL CHECK (status IN ('DRAFT', 'PUBLISHED', 'ARCHIVED')),
  project_status TEXT NOT NULL CHECK (project_status IN ('UPCOMING', 'ACTIVE', 'LIMITED', 'SOLD_OUT', 'COMPLETED')),
  city TEXT,
  area TEXT,
  address TEXT,
  map_url TEXT,
  price_from REAL,
  price_label TEXT,
  area_label TEXT,
  property_types_json TEXT NOT NULL DEFAULT '[]',
  amenities_json TEXT NOT NULL DEFAULT '[]',
  nearby_locations_json TEXT NOT NULL DEFAULT '[]',
  featured INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  published_at TEXT
);

CREATE TABLE IF NOT EXISTS properties (
  id TEXT PRIMARY KEY,
  project_id TEXT REFERENCES projects(id),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  property_type TEXT NOT NULL CHECK (property_type IN ('APARTMENT', 'VILLA', 'COMMERCIAL', 'PLOT', 'OTHER')),
  city TEXT,
  area_location TEXT,
  address TEXT,
  price REAL,
  price_label TEXT,
  area REAL,
  area_unit TEXT,
  dimensions TEXT,
  facing TEXT,
  inventory_status TEXT NOT NULL CHECK (inventory_status IN ('AVAILABLE', 'RESERVED', 'SOLD')),
  description TEXT,
  amenities_json TEXT NOT NULL DEFAULT '[]',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  published_at TEXT
);

CREATE TABLE IF NOT EXISTS plots (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL REFERENCES projects(id),
  slug TEXT NOT NULL UNIQUE,
  plot_number TEXT NOT NULL,
  area REAL,
  area_unit TEXT,
  price REAL,
  price_label TEXT,
  facing TEXT,
  dimensions TEXT,
  inventory_status TEXT NOT NULL CHECK (inventory_status IN ('AVAILABLE', 'RESERVED', 'SOLD')),
  notes TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  published_at TEXT
);

CREATE TABLE IF NOT EXISTS media (
  id TEXT PRIMARY KEY,
  url TEXT NOT NULL,
  alt TEXT NOT NULL,
  title TEXT,
  media_type TEXT NOT NULL CHECK (media_type IN ('IMAGE', 'VIDEO', 'DOCUMENT')),
  width INTEGER,
  height INTEGER,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS media_links (
  media_id TEXT NOT NULL REFERENCES media(id),
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (media_id, entity_type, entity_id)
);

CREATE TABLE IF NOT EXISTS testimonials (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT,
  company TEXT,
  quote TEXT NOT NULL,
  image_media_id TEXT REFERENCES media(id),
  ecosystem_id TEXT REFERENCES ecosystems(id),
  service_id TEXT REFERENCES services(id),
  featured INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL CHECK (status IN ('DRAFT', 'PUBLISHED', 'ARCHIVED')),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  published_at TEXT
);

CREATE TABLE IF NOT EXISTS insights (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image_media_id TEXT REFERENCES media(id),
  author TEXT,
  category TEXT,
  tags_json TEXT NOT NULL DEFAULT '[]',
  featured INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL CHECK (status IN ('DRAFT', 'PUBLISHED', 'ARCHIVED')),
  seo_title TEXT,
  seo_description TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  published_at TEXT
);

CREATE TABLE IF NOT EXISTS faqs (
  id TEXT PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL CHECK (status IN ('DRAFT', 'PUBLISHED', 'ARCHIVED')),
  ecosystem_id TEXT REFERENCES ecosystems(id),
  service_id TEXT REFERENCES services(id),
  project_id TEXT REFERENCES projects(id),
  page_id TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  published_at TEXT
);

CREATE TABLE IF NOT EXISTS careers (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  department TEXT,
  location TEXT,
  employment_type TEXT,
  description TEXT NOT NULL,
  requirements_json TEXT NOT NULL DEFAULT '[]',
  responsibilities_json TEXT NOT NULL DEFAULT '[]',
  status TEXT NOT NULL CHECK (status IN ('DRAFT', 'PUBLISHED', 'ARCHIVED')),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  published_at TEXT
);

CREATE TABLE IF NOT EXISTS pages (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('DRAFT', 'PUBLISHED', 'ARCHIVED')),
  seo_title TEXT,
  seo_description TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  published_at TEXT
);

CREATE TABLE IF NOT EXISTS seo_metadata (
  id TEXT PRIMARY KEY,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  seo_title TEXT,
  seo_description TEXT,
  canonical_url TEXT,
  og_image_media_id TEXT REFERENCES media(id),
  no_index INTEGER NOT NULL DEFAULT 0,
  UNIQUE (entity_type, entity_id)
);

CREATE TABLE IF NOT EXISTS site_settings (
  id TEXT PRIMARY KEY,
  site_name TEXT NOT NULL,
  tagline TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  whatsapp TEXT,
  address TEXT,
  hours TEXT,
  social_links_json TEXT NOT NULL DEFAULT '{}',
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  company TEXT,
  requirement TEXT,
  ecosystem_id TEXT REFERENCES ecosystems(id),
  service_id TEXT REFERENCES services(id),
  project_id TEXT REFERENCES projects(id),
  property_id TEXT REFERENCES properties(id),
  plot_id TEXT REFERENCES plots(id),
  preferred_location TEXT,
  budget REAL,
  source TEXT NOT NULL CHECK (source IN ('CONTACT', 'ECOSYSTEM', 'SERVICE', 'PROJECT', 'PROPERTY', 'PLOT', 'CAREER', 'OTHER')),
  status TEXT NOT NULL DEFAULT 'NEW' CHECK (status IN ('NEW', 'CONTACTED', 'INTERESTED', 'SITE_VISIT', 'MEETING', 'NEGOTIATION', 'BOOKED', 'CLOSED')),
  assigned_to TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS enquiries (
  id TEXT PRIMARY KEY,
  lead_id TEXT NOT NULL REFERENCES leads(id),
  ecosystem_id TEXT REFERENCES ecosystems(id),
  service_id TEXT REFERENCES services(id),
  project_id TEXT REFERENCES projects(id),
  property_id TEXT REFERENCES properties(id),
  plot_id TEXT REFERENCES plots(id),
  subject TEXT,
  message TEXT NOT NULL,
  source TEXT NOT NULL CHECK (source IN ('CONTACT', 'ECOSYSTEM', 'SERVICE', 'PROJECT', 'PROPERTY', 'PLOT', 'CAREER', 'OTHER')),
  page_url TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  status TEXT NOT NULL DEFAULT 'NEW' CHECK (status IN ('NEW', 'PROCESSED', 'CLOSED')),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS site_visits (
  id TEXT PRIMARY KEY,
  lead_id TEXT NOT NULL REFERENCES leads(id),
  project_id TEXT REFERENCES projects(id),
  property_id TEXT REFERENCES properties(id),
  plot_id TEXT REFERENCES plots(id),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  preferred_date TEXT NOT NULL,
  preferred_time TEXT NOT NULL,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'REQUESTED' CHECK (status IN ('REQUESTED', 'CONTACTED', 'CONFIRMED', 'COMPLETED', 'CANCELLED')),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_ecosystems_status ON ecosystems(status);
CREATE INDEX IF NOT EXISTS idx_services_ecosystem_status ON services(ecosystem_id, status);
CREATE INDEX IF NOT EXISTS idx_projects_ecosystem_status ON projects(ecosystem_id, status);
CREATE INDEX IF NOT EXISTS idx_properties_project ON properties(project_id);
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(inventory_status);
CREATE INDEX IF NOT EXISTS idx_plots_project ON plots(project_id);
CREATE INDEX IF NOT EXISTS idx_plots_status ON plots(inventory_status);
CREATE INDEX IF NOT EXISTS idx_published_at ON insights(status, published_at);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_phone ON leads(phone);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_enquiries_lead ON enquiries(lead_id);
CREATE INDEX IF NOT EXISTS idx_enquiries_source ON enquiries(source);
CREATE INDEX IF NOT EXISTS idx_site_visits_status ON site_visits(status);
