# JLUXE — Phase 5: Real Estate Projects & Properties
## GitHub Copilot / AI Coding Agent Implementation Specification

> **Project:** JLUXE Developers Website  
> **Phase:** 5 — Real Estate Projects & Properties  
> **Status:** NEXT IMPLEMENTATION PHASE  
> **Scope:** Real Estate project, property and plot discovery architecture  
> **Out of Scope:** CMS, database, CRM, lead management, site-visit scheduling, admin dashboard

---

# 1. PURPOSE

Phase 5 introduces the real-estate inventory layer of the JLUXE website.

The website must evolve from:

```text
JLUXE
├── Ecosystems
└── Services
```

into:

```text
JLUXE
├── Ecosystems
├── Services
└── Real Estate
    ├── Projects
    ├── Properties
    └── Plots
```

The implementation must provide a reusable architecture that can later connect to a CMS and database in Phase 6.

Do NOT implement the CMS/database yet.

---

# 2. IMPORTANT IMPLEMENTATION RULE

Before changing code:

1. Inspect the existing repository.
2. Reuse existing components, design tokens and layout primitives.
3. Do not rebuild the website from scratch.
4. Follow the existing JLUXE visual language.
5. Preserve completed Phase 1–4 work.
6. Do not introduce unrelated libraries unless genuinely required.
7. Do not invent real JLUXE project data.
8. Use clearly marked demo/placeholder inventory data only where necessary for UI development.
9. Keep data structures ready for future CMS/database integration.
10. Run the existing build after implementation.

---

# 3. CURRENT ECOSYSTEM SCOPE

JLUXE currently contains FOUR ecosystems:

1. JLUXE Real Estate
2. JLUXE Business Solutions
3. JLUXE Talent & Training
4. JLUXE Interiors & Design

Do not introduce JLUXE Boutique.

---

# 4. PHASE 5 OBJECTIVES

Implement:

- Real Estate landing experience
- Projects listing
- Project detail pages
- Properties listing
- Property detail pages
- Plots listing
- Plot detail pages
- Reusable inventory cards
- Reusable filtering foundation
- Project/property/plot data models
- Project → property → plot relationships
- Real-estate contextual CTAs
- Responsive layouts
- SEO-ready route structure
- Loading, empty and error-state foundations

Do NOT implement:

- CMS
- database persistence
- authentication
- admin dashboard
- lead CRM
- lead scoring
- automated email campaigns
- real-time inventory synchronization
- appointment calendar
- payment system
- property comparison
- favorites/accounts
- AI recommendations

Those belong to later phases.

---

# 5. REAL ESTATE INFORMATION ARCHITECTURE

Recommended structure:

```text
Real Estate
│
├── Projects
│   ├── Project Listing
│   └── Project Detail
│
├── Properties
│   ├── Property Listing
│   └── Property Detail
│
└── Plots
    ├── Plot Listing
    └── Plot Detail
```

Relationship:

```text
PROJECT
│
├── PROPERTIES
│   ├── Apartment
│   ├── Villa
│   └── Commercial Property
│
└── PLOTS
    ├── Plot 01
    ├── Plot 02
    └── Plot 03
```

A property or plot may belong to a project.

The data model must support that relationship without requiring database functionality yet.

---

# 6. ROUTE ARCHITECTURE

Create or adapt routes according to the existing TanStack Router structure.

Recommended routes:

```text
/real-estate
/real-estate/projects
/real-estate/projects/$slug
/real-estate/properties
/real-estate/properties/$slug
/real-estate/plots
/real-estate/plots/$slug
```

If the repository already has an equivalent route, reuse it rather than creating duplicates.

---

# 7. REAL ESTATE LANDING PAGE

Route:

```text
/real-estate
```

Purpose:

Introduce JLUXE Real Estate and guide visitors toward projects, properties and plots.

Recommended structure:

```text
Hero
↓
Real Estate Introduction
↓
Projects
↓
Properties
↓
Plots
↓
Why Choose JLUXE Real Estate
↓
Real Estate CTA
```

Do not force unrelated business-services content into this page.

The page should feel like a natural extension of the JLUXE ecosystem architecture.

---

# 8. PROJECT DATA MODEL

Create a reusable TypeScript type/interface.

Suggested structure:

```ts
export interface RealEstateProject {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;

  status:
    | "UPCOMING"
    | "ACTIVE"
    | "LIMITED"
    | "SOLD_OUT"
    | "COMPLETED";

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

  nearbyLocations?: {
    name: string;
    distance?: string;
  }[];

  images?: string[];
  videos?: string[];

  documents?: {
    name: string;
    url: string;
  }[];

  featured?: boolean;
}
```

This is a frontend/domain model only.

Do not connect it to a database in Phase 5.

---

# 9. PROPERTY DATA MODEL

Suggested structure:

```ts
export interface RealEstateProperty {
  id: string;
  slug: string;
  projectId?: string;

  name: string;

  type:
    | "APARTMENT"
    | "VILLA"
    | "COMMERCIAL"
    | "PLOT"
    | "OTHER";

  location?: {
    city?: string;
    area?: string;
    address?: string;
  };

  price?: number;
  priceLabel?: string;

  area?: number;
  areaUnit?: string;

  dimensions?: string;
  facing?: string;

  status:
    | "AVAILABLE"
    | "RESERVED"
    | "SOLD";

  description?: string;

  images?: string[];

  documents?: {
    name: string;
    url: string;
  }[];

  amenities?: string[];
}
```

Do not display unsupported information.

For example, if dimensions are unavailable, do not invent dimensions.

---

# 10. PLOT DATA MODEL

Suggested structure:

```ts
export interface RealEstatePlot {
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

  status:
    | "AVAILABLE"
    | "RESERVED"
    | "SOLD";

  notes?: string;

  images?: string[];
}
```

Plot inventory should be project-aware.

Example relationship:

```text
Project: example-project
    │
    ├── Plot 01
    ├── Plot 02
    └── Plot 03
```

---

# 11. STATUS SYSTEM

Use consistent status values.

## Project statuses

```text
UPCOMING
ACTIVE
LIMITED
SOLD_OUT
COMPLETED
```

## Property / Plot statuses

```text
AVAILABLE
RESERVED
SOLD
```

Create a reusable status/badge component rather than duplicating styling.

Example:

```tsx
<InventoryStatus status="AVAILABLE" />
```

Do not use status colors arbitrarily.

Status must remain understandable with text, not color alone.

---

# 12. PROJECT LISTING PAGE

Route:

```text
/real-estate/projects
```

Recommended structure:

```text
Page Header
↓
Intro
↓
Filters / Sorting foundation
↓
Project Grid
↓
Empty State if needed
```

Project card should support:

- project image
- project name
- location
- short description
- status
- price label where available
- property type where available
- View Project CTA

Example component:

```text
ProjectCard
├── Image
├── Status
├── Project Name
├── Location
├── Description
├── Price
└── View Project
```

---

# 13. PROJECT DETAIL PAGE

Route:

```text
/real-estate/projects/$slug
```

Recommended structure:

```text
Project Hero
↓
Project Overview
↓
Project Details
↓
Property Types
↓
Amenities
↓
Nearby Locations
↓
Gallery
↓
Videos
↓
Documents
↓
Available Properties / Plots
↓
Enquiry CTA
```

Only render sections when corresponding data exists.

Do not show empty headings such as:

```text
Amenities
No amenities available
```

unless an intentional empty state is specifically designed.

Prefer conditional rendering.

---

# 14. PROJECT HERO

The project hero should communicate immediately:

- Project name
- Location
- Status
- Key price/area information where available
- Primary CTA

Suggested CTAs:

```text
Enquire About This Project
```

and, where appropriate:

```text
Request a Site Visit
```

The site-visit CTA should only prepare the user journey in Phase 5.

Do NOT implement appointment scheduling yet.

---

# 15. PROPERTY LISTING PAGE

Route:

```text
/real-estate/properties
```

Purpose:

Allow visitors to discover available property inventory.

Recommended filters:

```text
Location
Property Type
Budget
Area
Project
Status
```

Filters should be implemented as frontend state against the current data source.

Do not create a backend filtering API.

---

# 16. PROPERTY CARD

Create reusable:

```text
PropertyCard
```

Suggested information:

- image
- property name
- property type
- location
- area
- price
- status
- project
- View Property CTA

Example:

```text
┌─────────────────────────────┐
│           IMAGE             │
│       AVAILABLE             │
├─────────────────────────────┤
│ Property Name               │
│ Location                    │
│ 1200 sq.ft • East Facing    │
│ ₹ ...                       │
│                             │
│ View Property →             │
└─────────────────────────────┘
```

Do not fabricate prices or dimensions in production content.

---

# 17. PROPERTY DETAIL PAGE

Route:

```text
/real-estate/properties/$slug
```

Recommended structure:

```text
Property Hero
↓
Key Details
↓
Description
↓
Project Information
↓
Amenities
↓
Gallery
↓
Documents
↓
Enquiry CTA
```

Key details may include:

```text
Property Type
Location
Price
Area
Dimensions
Facing
Status
Project
```

Only show values that exist.

---

# 18. PLOTS LISTING PAGE

Route:

```text
/real-estate/plots
```

Purpose:

Provide a dedicated discovery path for plot inventory.

Recommended structure:

```text
Page Header
↓
Filters
↓
Plot Grid/Table
↓
Empty State
```

Useful filtering:

```text
Project
Location
Budget
Area
Facing
Status
```

Do not create a complex GIS/map system in this phase.

---

# 19. PLOT DETAIL PAGE

Route:

```text
/real-estate/plots/$slug
```

Recommended structure:

```text
Plot Hero
↓
Plot Details
↓
Project Information
↓
Location
↓
Images
↓
Notes
↓
Enquiry CTA
```

Important information:

```text
Plot Number
Area
Dimensions
Facing
Price
Status
Project
```

---

# 20. REUSABLE COMPONENT ARCHITECTURE

Prefer reusable components such as:

```text
src/components/real-estate/

RealEstateHero.tsx
ProjectCard.tsx
ProjectGrid.tsx
ProjectHero.tsx
ProjectDetails.tsx
PropertyCard.tsx
PropertyGrid.tsx
PropertyHero.tsx
PropertyDetails.tsx
PlotCard.tsx
PlotGrid.tsx
PlotHero.tsx
PlotDetails.tsx
InventoryStatus.tsx
InventoryFilters.tsx
InventoryEmptyState.tsx
InventoryGallery.tsx
RealEstateCTA.tsx
```

Do not create separate duplicated components for each individual project.

---

# 21. DATA ORGANIZATION

For Phase 5, keep inventory data separate from UI components.

Recommended:

```text
src/data/real-estate/
    projects.ts
    properties.ts
    plots.ts
```

or an equivalent structure consistent with the repository.

Example:

```ts
export const projects: RealEstateProject[] = [];
export const properties: RealEstateProperty[] = [];
export const plots: RealEstatePlot[] = [];
```

If demonstration data is needed for development, clearly mark it:

```ts
// DEMO DATA ONLY
// Replace with CMS/database data in Phase 6.
```

Never present invented demo projects as verified JLUXE inventory.

---

# 22. RELATIONSHIP HELPERS

Create lightweight helper functions where useful.

Example:

```ts
getProjectBySlug(slug)
getPropertiesByProject(projectId)
getPlotsByProject(projectId)
getPropertyBySlug(slug)
getPlotBySlug(slug)
```

These should operate against Phase 5 static data.

Later, Phase 6 can replace the data layer without requiring a complete UI rewrite.

---

# 23. FILTERING ARCHITECTURE

Create a reusable frontend filter model.

Example:

```ts
interface PropertyFilters {
  location?: string;
  type?: string;
  project?: string;
  minPrice?: number;
  maxPrice?: number;
  minArea?: number;
  maxArea?: number;
  status?: string;
}
```

Filtering should:

1. read the current filter state
2. apply it to available data
3. update visible cards
4. show an empty state when no records match
5. allow filters to be cleared

Avoid excessive filter complexity.

---

# 24. URL FILTERS

If practical within the existing routing architecture, filters may be represented through query parameters:

```text
/real-estate/properties?location=Chennai&type=VILLA
```

However, do not introduce a complex query-state library solely for this phase.

Use the simplest maintainable approach.

---

# 25. EMPTY STATES

Every inventory listing needs an intentional empty state.

Example:

```text
No properties match your current filters.

Try adjusting your filters or explore our other
real estate opportunities.
```

The empty state must provide a clear reset/exploration action.

Never leave a blank page.

---

# 26. ERROR STATES

Prepare reusable error UI for:

- invalid project slug
- invalid property slug
- invalid plot slug
- unavailable inventory data

Example:

```text
Project not found.

The project you are looking for may no longer
be available or the link may be incorrect.

Back to Real Estate
```

Do not expose technical stack traces to users.

---

# 27. LOADING STATES

If route/data loading requires asynchronous behavior later, provide reusable skeleton structures.

Examples:

```text
ProjectCardSkeleton
PropertyCardSkeleton
PlotCardSkeleton
ProjectDetailSkeleton
PropertyDetailSkeleton
```

Do not over-engineer loading behavior while data remains static.

---

# 28. IMAGE HANDLING

Inventory images should support:

- responsive dimensions
- appropriate aspect ratio
- lazy loading where appropriate
- meaningful alt text
- priority loading for the primary hero image

Do not use unrelated stock imagery and present it as actual JLUXE projects.

If authentic project photography is unavailable:

- use neutral placeholders
- clearly isolate demo assets
- make the asset replacement straightforward

---

# 29. GALLERY

Create a reusable gallery foundation.

Requirements:

- responsive grid
- accessible image alt text
- keyboard-accessible interaction if a lightbox is implemented
- no unnecessary animation
- mobile-friendly layout

A complex gallery/lightbox library is optional.

Do not add a dependency unless necessary.

---

# 30. DOCUMENTS

Project/property documents may eventually include:

```text
Brochure
Floor Plan
Project Document
Other Supporting Document
```

For Phase 5:

- display document links only when actual URLs exist
- do not create fake PDFs
- do not upload fabricated legal/project documents

Database/CMS document management belongs to Phase 6.

---

# 31. CONTEXTUAL CTA DESIGN

Real-estate pages should guide users toward relevant actions.

Examples:

Project:

```text
Enquire About This Project
```

Property:

```text
Enquire About This Property
```

Plot:

```text
Enquire About This Plot
```

General:

```text
Talk to JLUXE
```

The CTA can route to `/contact` in Phase 5.

Do not build the lead-processing backend yet.

---

# 32. WHATSAPP

If the existing project has a verified JLUXE WhatsApp number configured, contextual WhatsApp links may be prepared.

Example message:

```text
Hello JLUXE, I am interested in [Project Name].
```

Do not hard-code an unverified phone number.

If the number is not configured, omit the WhatsApp CTA.

---

# 33. SITE VISIT CTA

The project specification anticipates site visits.

Phase 5 may expose:

```text
Request a Site Visit
```

but should route to an appropriate enquiry/contact journey.

Do NOT implement:

- calendar availability
- appointment slots
- automated confirmations
- reminders
- scheduling backend

Those belong to Phase 7.

---

# 34. SEO

Every real-estate route must be SEO-ready.

Project detail:

```text
<title>
<Project Name> | JLUXE Real Estate
</title>
```

Property detail:

```text
<title>
<Property Name> | JLUXE Real Estate
</title>
```

Use:

- unique title
- meta description
- canonical URL
- Open Graph metadata
- meaningful headings
- image alt text
- breadcrumb structure where appropriate

Do not create SEO claims that are unsupported by actual project data.

---

# 35. STRUCTURED DATA

Where supported by actual data, prepare for:

```text
Organization
WebSite
BreadcrumbList
Service
```

Real-estate-specific structured data should only be introduced where the implementation and available data genuinely support it.

Do not invent structured-data values merely for SEO.

---

# 36. ACCESSIBILITY

Requirements:

- semantic headings
- keyboard navigation
- visible focus states
- accessible filter controls
- labels for form-like controls
- status not communicated by color alone
- meaningful image alt text
- accessible CTA labels
- sufficient contrast
- mobile touch targets around 44px where practical

Interactive cards must not create nested inaccessible links.

---

# 37. RESPONSIVE DESIGN

Test:

```text
Mobile
Tablet
Desktop
Wide Desktop
```

Pay special attention to:

- project grids
- property cards
- filter controls
- galleries
- project hero
- CTA sections
- long project names
- status badges
- mobile navigation

Avoid horizontal overflow.

---

# 38. DESIGN SYSTEM RULES

Continue the established JLUXE design system:

- warm ivory backgrounds
- forest green primary
- brass accent
- dark ink sections
- serif display typography
- clean sans-serif body typography
- restrained borders
- minimal radius
- editorial spacing
- premium but understated visual language

Do not introduce:

- excessive rounded cards
- generic SaaS dashboard styling
- random gradients
- excessive shadows
- inconsistent button styles
- excessive pill UI
- unrelated color systems

---

# 39. HEADER / NAVIGATION

If Real Estate becomes a major navigation destination, integrate it into the existing header without breaking Phase 1–4 navigation.

Do not redesign the entire global navigation.

Desktop and mobile navigation must remain functional.

---

# 40. FOOTER

Ensure the existing footer can expose appropriate Real Estate navigation:

```text
Real Estate
├── Projects
├── Properties
└── Plots
```

Do not duplicate navigation unnecessarily.

---

# 41. DATA SAFETY

Never invent:

- project names
- project locations
- prices
- approvals
- RERA information
- possession dates
- unit counts
- developer claims
- appreciation claims
- customer results
- testimonials
- legal documents

If information is unavailable, omit it or mark the data as demo content internally.

---

# 42. PERFORMANCE

Follow existing performance principles:

- optimize images
- lazy-load non-critical media
- prioritize primary hero image
- avoid unnecessary client-side JavaScript
- reuse components
- avoid large new dependencies
- avoid rendering unused sections
- keep filtering efficient

---

# 43. WHAT PHASE 5 MUST NOT CHANGE

Do not regress:

- homepage
- ecosystem pages
- service pages
- global header
- global footer
- existing design tokens
- existing routing
- existing SEO infrastructure
- completed Phase 1–4 components

If a shared component must change, verify all affected routes.

---

# 44. PHASE 5 IMPLEMENTATION ORDER

Implement in this sequence:

### Step 1
Inspect current Real Estate ecosystem route.

### Step 2
Create the real-estate data/domain types.

### Step 3
Create static/demo inventory data structure.

### Step 4
Create reusable inventory components.

### Step 5
Build `/real-estate`.

### Step 6
Build `/real-estate/projects`.

### Step 7
Build `/real-estate/projects/$slug`.

### Step 8
Build `/real-estate/properties`.

### Step 9
Build `/real-estate/properties/$slug`.

### Step 10
Build `/real-estate/plots`.

### Step 11
Build `/real-estate/plots/$slug`.

### Step 12
Add filtering foundation.

### Step 13
Add loading/empty/error states.

### Step 14
Integrate navigation.

### Step 15
Add SEO metadata.

### Step 16
Run responsive and accessibility checks.

### Step 17
Run production build.

---

# 45. ACCEPTANCE CHECKLIST

Phase 5 is complete only when:

## Architecture

- [ ] Real Estate has a dedicated content architecture.
- [ ] Projects, Properties and Plots are separate concepts.
- [ ] Project → Property relationship works.
- [ ] Project → Plot relationship works.
- [ ] Data is separated from presentation.

## Pages

- [ ] `/real-estate` works.
- [ ] `/real-estate/projects` works.
- [ ] `/real-estate/projects/$slug` works.
- [ ] `/real-estate/properties` works.
- [ ] `/real-estate/properties/$slug` works.
- [ ] `/real-estate/plots` works.
- [ ] `/real-estate/plots/$slug` works.

## UI

- [ ] Cards are reusable.
- [ ] Status badges are reusable.
- [ ] Filters work against available data.
- [ ] Empty states work.
- [ ] Invalid routes have useful states.
- [ ] Responsive layouts work.
- [ ] CTAs are contextual.

## Content

- [ ] No fabricated JLUXE inventory is presented as real.
- [ ] No unsupported claims were added.
- [ ] No fake documents were added.
- [ ] No fake prices or project details were added.

## Technical

- [ ] Existing routes still work.
- [ ] Existing homepage still works.
- [ ] Ecosystem pages still work.
- [ ] Service pages still work.
- [ ] SEO metadata works.
- [ ] Accessibility basics pass.
- [ ] Production build succeeds.

---

# 46. PHASE 5 → PHASE 6 BOUNDARY

Phase 5 ends with a clean frontend/domain architecture.

Phase 6 will later replace:

```text
Static Data
    ↓
Frontend
```

with:

```text
CMS / Database
      ↓
Data Access Layer
      ↓
Frontend
```

Therefore Phase 5 code should avoid tightly coupling components directly to hard-coded arrays.

Prefer:

```text
UI
 ↓
Data Helpers / Repository
 ↓
Static Data
```

Later:

```text
UI
 ↓
Data Helpers / Repository
 ↓
CMS / Database
```

This separation is important.

---

# 47. DO NOT IMPLEMENT PHASE 6 EARLY

Do not add:

- MongoDB schema
- Prisma
- CMS dashboard
- content editor
- admin authentication
- CRUD APIs
- media management
- database migrations

Those belong to Phase 6.

---

# 48. DO NOT IMPLEMENT PHASE 7 EARLY

Do not add:

- lead database
- enquiry persistence
- lead status pipeline
- email automation
- site-visit scheduling
- CRM
- lead assignment
- notifications

Those belong to Phase 7.

---

# 49. DO NOT IMPLEMENT PHASE 9 EARLY

Do not add:

- admin dashboard
- role management
- content management interface
- admin analytics
- admin user management

Those belong to Phase 9.

---

# 50. FINAL AGENT INSTRUCTION

Implement **ONLY Phase 5**.

Before editing, inspect the existing JLUXE repository and identify what is already implemented.

Reuse existing architecture wherever possible.

Do not rebuild completed work.

Do not invent JLUXE business data.

Do not introduce JLUXE Boutique.

Do not implement CMS, database, CRM, lead management, scheduling or admin functionality.

Keep the implementation production-oriented, reusable, accessible, responsive and ready for the Phase 6 data layer.

After implementation:

1. run the production build
2. fix all build/type errors
3. verify all Phase 5 routes
4. verify existing Phase 1–4 routes
5. check responsive behavior
6. check accessibility basics
7. summarize exactly what was changed
8. list any assumptions or demo data used
9. do not silently implement future phases

**Phase 5 goal:**

> Build a clean, reusable Real Estate Projects, Properties and Plots discovery system that can later connect to the JLUXE CMS/database without requiring a frontend rewrite.
