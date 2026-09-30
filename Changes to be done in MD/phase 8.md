# JLUXE — Phase 8: Testimonials & Insights
## GitHub Copilot / AI Coding Agent Implementation Specification

> **Project:** JLUXE Developers Website  
> **Phase:** 8 — Testimonials & Insights  
> **Status:** NEXT IMPLEMENTATION PHASE  
> **Previous Phase:** Phase 7 — Leads, Enquiries & Site Visits  
> **Scope:** Verified testimonials, editorial insights, public presentation, SEO and content relationships  
> **Out of Scope:** Admin/CMS editing UI, CRM dashboard, advanced analytics, automated editorial workflows

---

# 1. PURPOSE

Phase 8 introduces the **proof and knowledge layer** of the JLUXE website.

The website should evolve from:

```text
JLUXE
├── Ecosystems
├── Services
├── Real Estate
└── Customer Enquiries
```

to:

```text
JLUXE
├── Ecosystems
├── Services
├── Real Estate
├── Customer Enquiries
├── Testimonials
└── Insights
```

The goal is to present verified customer proof and useful editorial content through the database architecture established in Phase 6.

Phase 8 is a **public presentation and content-consumption phase**.

It is NOT the Admin/CMS editing phase.

---

# 2. CRITICAL IMPLEMENTATION RULE

Before changing anything:

1. Inspect the complete repository.
2. Inspect Phase 6 content models.
3. Inspect Phase 7 lead/enquiry architecture.
4. Inspect existing homepage testimonial/insight components.
5. Reuse existing database/repository conventions.
6. Reuse existing design tokens and components.
7. Do not rebuild the website.
8. Do not invent testimonials.
9. Do not invent client names, companies, roles, outcomes or statistics.
10. Do not publish fabricated articles as real JLUXE content.
11. Do not introduce JLUXE Boutique.
12. Preserve all completed Phase 1–7 work.
13. Run type checks and production build after implementation.

---

# 3. CURRENT ECOSYSTEM SCOPE

JLUXE currently contains FOUR ecosystems:

```text
1. JLUXE Real Estate
2. JLUXE Business Solutions
3. JLUXE Talent & Training
4. JLUXE Interiors & Design
```

Do NOT add JLUXE Boutique.

---

# 4. PHASE 8 OBJECTIVES

Implement:

- Public testimonials architecture
- Testimonial listing/presentation
- Featured testimonials
- Contextual testimonial relationships where supported
- Public insights listing
- Individual insight/article pages
- Insight metadata
- Author/date information
- Featured images
- Related insights
- Published/draft/archived behavior
- SEO metadata
- Open Graph metadata
- Breadcrumbs where appropriate
- Homepage integration
- Empty states
- Responsive layouts
- Accessibility
- Reading-friendly article presentation

Do NOT implement:

- Admin content editor
- CMS dashboard
- Editorial workflow UI
- Content approval dashboard
- CRM dashboard
- Analytics dashboard
- AI-generated articles
- Automated article generation

---

# 5. SOURCE-OF-TRUTH RULE

Testimonials and Insights are content.

They must come from:

```text
Verified JLUXE source material
```

or:

```text
Approved database records
```

If no approved content exists:

```text
Do not fabricate content.
```

The UI should support an intentional empty/dormant state.

---

# 6. TESTIMONIAL PRINCIPLE

A testimonial represents a real customer/client statement.

Potential information:

```text
Name
Role
Company
Quote
Image
Ecosystem
Service
Featured
```

Only display information that has been verified and approved.

---

# 7. TESTIMONIAL DATA MODEL

Reuse the Phase 6 model where possible.

Suggested structure:

```ts
export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  company?: string;
  quote: string;
  image?: string;

  ecosystemId?: string;
  serviceId?: string;

  featured?: boolean;

  status:
    | "DRAFT"
    | "PUBLISHED"
    | "ARCHIVED";

  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}
```

Do not add unnecessary fields.

---

# 8. TESTIMONIAL PUBLIC QUERY

Public pages should retrieve only:

```text
status = PUBLISHED
```

Featured homepage testimonials may additionally use:

```text
featured = true
```

Example conceptual repository function:

```ts
getPublishedTestimonials()
```

and:

```ts
getFeaturedTestimonials()
```

Do not expose draft or archived testimonials publicly.

---

# 9. TESTIMONIAL RELATIONSHIPS

Where verified data supports it:

```text
Testimonial
   │
   ├── Ecosystem
   └── Service
```

Example:

```text
Business Solutions
      ↓
Marketing Service
      ↓
Verified Testimonial
```

Do not infer a service association simply because the testimonial sounds related.

---

# 10. TESTIMONIAL CARD

Create/reuse:

```text
TestimonialCard
```

Potential presentation:

```text
┌──────────────────────────────┐
│ “Verified customer quote...” │
│                              │
│ Name                         │
│ Role / Company               │
│ Service / Ecosystem          │
└──────────────────────────────┘
```

The design should match the established JLUXE editorial style.

Avoid generic SaaS testimonial carousels.

---

# 11. TESTIMONIAL HOMEPAGE SECTION

The homepage already contains a dormant testimonial section.

Its intended behavior:

```text
No published testimonials
        ↓
Remain hidden/dormant

Published testimonials
        ↓
Render approved testimonial section
```

Do not populate the homepage merely to make the section visible.

---

# 12. TESTIMONIAL LISTING

If sufficient verified content exists, create a public testimonials page.

Suggested route:

```text
/testimonials
```

Before adding a new route, inspect the existing routing architecture.

Do not create duplicate testimonial routes.

Recommended structure:

```text
Page Header
↓
Introduction
↓
Testimonial Grid/List
↓
CTA
```

---

# 13. TESTIMONIAL FILTERING

Filtering is optional.

Do not build complex filtering unless the volume of verified testimonials justifies it.

If contextual filtering is needed later:

```text
Ecosystem
Service
```

are the appropriate dimensions.

---

# 14. TESTIMONIAL EMPTY STATE

If `/testimonials` exists but no published records are available:

```text
Testimonials are currently being updated.

Please check back soon or speak with JLUXE directly.
```

Use a designed empty state.

Do not display fake testimonials.

---

# 15. TESTIMONIAL IMAGES

If a verified customer image exists:

- display it appropriately
- provide alt text
- optimize it
- use responsive sizing

If no image exists:

Do not create an AI-generated or stock face and present it as the customer.

Simply render the testimonial without an image.

---

# 16. TESTIMONIAL PRIVACY

Only publish customer identity information that JLUXE is authorized to publish.

Do not expose:

- phone numbers
- email addresses
- private contact information
- internal notes
- lead data
- enquiry data

Testimonials are public content, not CRM records.

---

# 17. INSIGHTS PURPOSE

Insights provide useful editorial content around JLUXE's business domains.

Potential themes may include:

```text
Real Estate
Business Growth
Marketing
Branding
Lead Generation
Sales
Talent
Training
Interiors
Architecture
Career
Industry Knowledge
```

Only publish topics supported by approved JLUXE content.

Do not invent claims or present generic generated content as official JLUXE insight.

---

# 18. INSIGHT DATA MODEL

Reuse the Phase 6 model.

Suggested:

```ts
export interface Insight {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  content: string;

  featuredImage?: string;

  author?: string;

  category?: string;
  tags?: string[];

  status:
    | "DRAFT"
    | "PUBLISHED"
    | "ARCHIVED";

  publishedAt?: string;

  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;
  ogImage?: string;

  createdAt: string;
  updatedAt: string;
}
```

Do not overcomplicate the taxonomy.

---

# 19. INSIGHT ROUTES

Recommended:

```text
/insights
/insights/$slug
```

Before adding routes, inspect the existing router.

If equivalent routes already exist, extend them instead of creating duplicates.

---

# 20. INSIGHTS LISTING PAGE

Route:

```text
/insights
```

Recommended:

```text
Hero / Page Header
↓
Introduction
↓
Featured Insight
↓
Insight Grid
↓
CTA
```

Only published insights should appear.

---

# 21. INSIGHT CARD

Create/reuse:

```text
InsightCard
```

Display:

- featured image where available
- category
- title
- excerpt
- publication date
- author where available
- Read Article CTA

Do not display empty metadata labels.

---

# 22. FEATURED INSIGHT

The model may support:

```text
featured
```

if justified by the existing schema.

If implemented:

```text
Featured Insight
```

should appear once.

Do not create a complicated editorial ranking algorithm.

---

# 23. INSIGHT DETAIL PAGE

Route:

```text
/insights/$slug
```

Recommended structure:

```text
Breadcrumb
↓
Category
↓
Title
↓
Author / Date
↓
Featured Image
↓
Article Content
↓
Related Insights
↓
CTA
```

The page should be optimized for reading.

---

# 24. ARTICLE TYPOGRAPHY

Use the existing JLUXE typography system.

Article content should have:

- comfortable line length
- readable font size
- adequate paragraph spacing
- clear H2/H3 hierarchy
- accessible links
- readable lists
- responsive media

Do not make articles excessively narrow or excessively wide.

---

# 25. ARTICLE CONTENT SAFETY

Do not render raw arbitrary HTML without sanitization.

If article content is stored as rich HTML/Markdown:

```text
Validate
↓
Sanitize
↓
Render
```

Do not allow arbitrary scripts.

---

# 26. MARKDOWN VS HTML

Inspect the existing project architecture.

If the project already has a content format, reuse it.

If introducing a new format is necessary, choose one consistent approach.

Do not support multiple article rendering systems without a real requirement.

---

# 27. ARTICLE IMAGES

Featured and inline images must support:

- responsive sizing
- alt text
- lazy loading where appropriate
- priority loading for the main featured image
- optimized dimensions

Do not use stock images to imply JLUXE-owned project work.

---

# 28. AUTHOR INFORMATION

If author information is available:

```text
By Author Name
```

If not available:

Do not invent an author.

The article can display:

```text
Published <date>
```

without an author.

---

# 29. PUBLICATION DATE

Only display `publishedAt` for published content.

Do not expose:

```text
createdAt
```

as the publication date unless that is explicitly how the content system defines publication.

---

# 30. RELATED INSIGHTS

At the end of an article, optionally show related insights.

Relationship can use:

```text
category
tags
```

or another simple approved relationship.

Do not build a complex recommendation engine.

Suggested:

```text
Related Insights
├── Article A
├── Article B
└── Article C
```

Limit the number shown.

---

# 31. RELATED CONTENT SAFETY

Related articles must also be:

```text
PUBLISHED
```

Never recommend:

```text
DRAFT
ARCHIVED
```

content publicly.

---

# 32. CATEGORIES

Categories may be used if they add genuine navigational value.

Possible categories based on JLUXE domains:

```text
Real Estate
Business Solutions
Talent & Training
Interiors & Design
```

Additional categories should only be introduced when supported by actual content.

Do not create dozens of empty categories.

---

# 33. TAGS

Tags are optional.

If used:

- keep them normalized
- avoid duplicates
- avoid unnecessary tag proliferation

Do not make tags more important than the article content.

---

# 34. INSIGHT SEARCH

Do not implement a full search engine in Phase 8.

If the number of published insights is small, a normal listing is sufficient.

Search can be considered in a later enhancement phase.

---

# 35. INSIGHT PAGINATION

If the number of published insights becomes large, pagination may be introduced.

For the initial implementation:

- use a reasonable page size
- avoid loading unlimited content
- keep the architecture pagination-ready

Do not build infinite scrolling unless there is a clear requirement.

---

# 36. SEO

Every published insight should support:

```text
SEO title
SEO description
Canonical URL
Open Graph image
```

Fallback behavior may use:

```text
title
excerpt
featured image
```

when dedicated SEO fields are not populated.

Do not create misleading SEO descriptions.

---

# 37. INSIGHT STRUCTURED DATA

Where technically appropriate, prepare for:

```text
Article
BreadcrumbList
Organization
```

Only generate structured data using actual content.

Do not invent:

- author identities
- publication dates
- organization information

---

# 38. TESTIMONIAL SEO

A testimonials page may have:

```text
title
description
canonical
```

Do not add unsupported review/rating structured data.

A testimonial quote is not automatically a public rating.

Do not manufacture star ratings.

---

# 39. BREADCRUMBS

For insight detail pages:

```text
Home
→ Insights
→ Article
```

For testimonial detail pages, if no individual testimonial route exists, no breadcrumb is necessary.

Use the existing breadcrumb component if one exists.

---

# 40. OPEN GRAPH

Insight pages should support:

```text
og:title
og:description
og:image
og:url
```

Use the article's verified featured image where available.

Do not generate fake social preview information.

---

# 41. SOCIAL SHARING

A share button is optional.

Do not add multiple third-party social SDKs.

If implemented, use simple URL-based sharing mechanisms where practical.

Do not track personal sharing behavior unnecessarily.

---

# 42. HOMEPAGE INSIGHTS SECTION

The existing homepage contains a dormant insights preview.

Behavior:

```text
No published insights
        ↓
Remain dormant

Published insights
        ↓
Show a small curated preview
```

Do not render a large blog section on the homepage.

Recommended:

```text
2–3 insights
```

if sufficient content exists.

---

# 43. HOMEPAGE TESTIMONIAL SECTION

Use the same dormant-content pattern:

```text
No verified testimonials
        ↓
Hidden

Verified published testimonials
        ↓
Visible
```

Never use placeholder testimonials on production.

---

# 44. ECOSYSTEM CONTEXT

Where the content model supports ecosystem association, public pages may surface contextual content.

Example:

```text
Business Solutions
↓
Relevant Insights
```

Only show relationships explicitly stored in the database.

Do not infer relationships from keywords at runtime.

---

# 45. SERVICE CONTEXT

Where supported:

```text
Service
 ↓
Related Testimonials
 ↓
Related Insights
```

Only use verified database relationships.

---

# 46. PROJECT CONTEXT

Real-estate projects may eventually have related insights.

Do not force articles onto project pages unless there is actual relevant content.

Do not create project-specific editorial claims without source material.

---

# 47. DATA ACCESS LAYER

Reuse Phase 6 repositories.

Possible functions:

```ts
getPublishedTestimonials()
getFeaturedTestimonials()

getPublishedInsights()
getFeaturedInsights()
getInsightBySlug(slug)
getRelatedInsights(insight)
```

Do not write database queries directly inside UI components.

---

# 48. PUBLIC QUERY RULE

All public content queries must enforce:

```text
status = PUBLISHED
```

This must be enforced at the repository/data-access layer.

Do not rely only on frontend filtering.

---

# 49. DRAFT PROTECTION

Test explicitly:

```text
Draft testimonial → not visible
Draft insight → not visible
Archived testimonial → not visible
Archived insight → not visible
Published content → visible
```

This is mandatory.

---

# 50. EMPTY STATES

If no content exists:

Testimonials:

```text
No testimonials are currently available.
```

Insights:

```text
Insights are currently being updated.
```

Use polished JLUXE empty-state styling.

Do not fill empty states with fake content.

---

# 51. ERROR STATES

If content retrieval fails:

```text
We couldn't load this content right now.
Please try again later.
```

For an invalid insight slug:

```text
Insight not found.
```

Provide navigation back to:

```text
Insights
```

Do not expose database/server errors.

---

# 52. LOADING STATES

Use reusable skeletons where route/data loading is asynchronous.

Possible:

```text
InsightCardSkeleton
InsightDetailSkeleton
TestimonialCardSkeleton
```

Reuse existing skeleton infrastructure if present.

---

# 53. ACCESSIBILITY

Testimonials:

- semantic quotation presentation
- accessible images
- readable contrast

Insights:

- semantic article
- proper headings
- accessible links
- keyboard navigation
- visible focus
- readable line length
- alt text
- no color-only meaning

Do not rely solely on typography or color to communicate hierarchy.

---

# 54. RESPONSIVE DESIGN

Test:

```text
Mobile
Tablet
Desktop
Wide Desktop
```

Pay particular attention to:

- article typography
- featured images
- testimonial cards
- insight cards
- metadata wrapping
- long titles
- navigation
- CTA sections

Avoid horizontal overflow.

---

# 55. DESIGN SYSTEM

Continue the established JLUXE visual language:

- warm ivory
- forest green
- brass
- dark ink
- editorial serif typography
- clean sans-serif body
- restrained borders
- minimal radius
- generous whitespace
- premium editorial feel

Do not introduce:

- generic blog templates
- excessive rounded cards
- SaaS dashboard styling
- loud gradients
- excessive shadows
- pill-heavy UI

---

# 56. PERFORMANCE

Insights can contain media and long content.

Use:

- optimized images
- lazy loading for below-the-fold media
- priority loading for hero/featured image
- reasonable content payloads
- efficient queries
- limited related-content queries

Avoid:

```text
N+1 queries
```

Do not fetch every article merely to display three related articles.

---

# 57. CACHING

Do not introduce complicated caching prematurely.

Start with:

```text
Correct data
↓
Correct rendering
↓
Query efficiency
↓
Caching if justified
```

If caching is added, ensure published/draft changes cannot produce stale public exposure longer than intended.

---

# 58. SECURITY

Ensure:

- no draft exposure
- sanitized article content
- safe image URLs
- no script injection
- no raw database errors
- no private testimonial data
- no CRM data leakage

---

# 59. CONTENT OWNERSHIP

Phase 8 should consume content.

It should not become an unofficial content-generation system.

No AI-generated testimonial.

No fabricated customer story.

No invented performance result.

No invented client.

No invented article presented as approved JLUXE content.

---

# 60. TESTING — TESTIMONIALS

Verify:

- [ ] Published testimonial appears.
- [ ] Draft testimonial does not appear.
- [ ] Archived testimonial does not appear.
- [ ] Featured testimonial query works.
- [ ] Missing image works.
- [ ] Missing role/company works.
- [ ] Ecosystem relationship works where supplied.
- [ ] Service relationship works where supplied.
- [ ] No private fields are exposed.

---

# 61. TESTING — INSIGHTS

Verify:

- [ ] Published insight appears.
- [ ] Draft insight does not appear.
- [ ] Archived insight does not appear.
- [ ] Slug route works.
- [ ] Invalid slug returns useful not-found state.
- [ ] Featured image works.
- [ ] Missing author works.
- [ ] Missing category works.
- [ ] Related insights exclude unpublished content.
- [ ] SEO metadata works.
- [ ] Article content is safely rendered.

---

# 62. TESTING — HOMEPAGE

Verify:

```text
No published testimonials
→ testimonial section dormant

Published testimonials
→ testimonial section appears

No published insights
→ insights section dormant

Published insights
→ insights preview appears
```

Do not break existing homepage sections.

---

# 63. TESTING — REGRESSION

Verify all major routes:

```text
/
 /ecosystems
 /ecosystems/$slug
 /services
 /services/$slug
 /real-estate
 /real-estate/projects
 /real-estate/projects/$slug
 /real-estate/properties
 /real-estate/properties/$slug
 /real-estate/plots
 /real-estate/plots/$slug
 /contact
 /insights
 /insights/$slug
 /testimonials
```

Use the actual route structure if equivalent routes already exist.

---

# 64. DATABASE BOUNDARY

Phase 8 should reuse the Phase 6 database models.

Do not redesign the entire database.

Only make schema changes if they are genuinely required for:

- testimonials
- insights
- relationships
- SEO
- public presentation

Any migration must be documented.

---

# 65. PHASE 7 REGRESSION

Do not modify or break:

```text
Lead
Enquiry
Site Visit
```

systems.

Verify contextual enquiry CTAs still work from:

```text
Service
Project
Property
Plot
Contact
```

pages.

---

# 66. DO NOT IMPLEMENT PHASE 9

Do NOT build:

- Admin Dashboard
- CMS editor
- testimonial editor
- insight editor
- article publishing UI
- drag-and-drop content ordering
- media management dashboard
- admin authentication
- staff management
- CRM dashboard
- lead Kanban
- admin analytics

Phase 9 will consume the database models created in earlier phases.

---

# 67. DO NOT IMPLEMENT PHASE 10

Do not perform the complete final:

- accessibility audit
- performance audit
- security audit
- SEO audit
- production hardening

Only implement the requirements necessary for Phase 8.

The comprehensive final pass belongs to Phase 10.

---

# 68. ACCEPTANCE CHECKLIST

Phase 8 is complete when:

## Testimonials

- [ ] Testimonial model is usable.
- [ ] Published testimonials display correctly.
- [ ] Draft testimonials remain hidden.
- [ ] Archived testimonials remain hidden.
- [ ] Featured testimonials work.
- [ ] Missing optional fields do not create broken UI.
- [ ] No fabricated testimonials exist.
- [ ] Homepage testimonial section behaves correctly.

## Insights

- [ ] `/insights` works.
- [ ] `/insights/$slug` works.
- [ ] Published insights display.
- [ ] Draft insights remain hidden.
- [ ] Archived insights remain hidden.
- [ ] Featured content works if enabled.
- [ ] Related insights work.
- [ ] Invalid slugs show a useful not-found state.
- [ ] Article content is safely rendered.
- [ ] SEO metadata works.
- [ ] Open Graph metadata works.

## Integration

- [ ] Homepage integration works.
- [ ] Ecosystem/service relationships work where supported.
- [ ] Existing Phase 7 enquiry flows remain functional.
- [ ] Existing Phase 5 real-estate routes remain functional.

## UX

- [ ] Loading states.
- [ ] Empty states.
- [ ] Error states.
- [ ] Responsive layouts.
- [ ] Accessibility basics.
- [ ] Existing JLUXE design system preserved.

## Technical

- [ ] Repository/data-access layer reused.
- [ ] No database queries directly inside components.
- [ ] No private data leakage.
- [ ] No fabricated content.
- [ ] Type checks pass.
- [ ] Production build succeeds.

---

# 69. IMPLEMENTATION ORDER

Implement in this sequence:

### Step 1
Inspect Phase 6 testimonial/insight database models.

### Step 2
Inspect existing homepage dormant sections.

### Step 3
Create/update repository functions.

### Step 4
Implement testimonial public presentation.

### Step 5
Connect homepage testimonial section.

### Step 6
Implement `/testimonials` only if justified by the current architecture/content volume.

### Step 7
Implement insight repository functions.

### Step 8
Implement `/insights`.

### Step 9
Implement `/insights/$slug`.

### Step 10
Implement related insights.

### Step 11
Implement SEO/Open Graph metadata.

### Step 12
Connect homepage insights preview.

### Step 13
Add loading/empty/error states.

### Step 14
Run accessibility/responsive checks.

### Step 15
Run production build and regression testing.

---

# 70. FINAL AGENT INSTRUCTION

Implement **ONLY Phase 8 — Testimonials & Insights**.

Before editing:

1. inspect the repository
2. inspect Phase 6 database models
3. inspect Phase 7 repositories
4. inspect current homepage components
5. inspect existing SEO utilities
6. reuse existing components
7. preserve existing routes
8. implement public testimonial/insight presentation
9. enforce published-only public content
10. preserve all existing enquiry functionality

Do not:

- introduce JLUXE Boutique
- fabricate testimonials
- fabricate customer identities
- fabricate performance results
- fabricate articles as official JLUXE content
- build Admin/CMS UI
- build CRM UI
- build editorial dashboards
- build advanced analytics
- rebuild completed phases

After implementation:

1. run migrations only if necessary
2. verify published/draft/archived behavior
3. verify testimonial rendering
4. verify insight listing
5. verify insight detail route
6. verify related insights
7. verify SEO metadata
8. verify homepage dormant/active behavior
9. verify Phase 7 enquiry flows
10. run type checks
11. run production build
12. check mobile and desktop
13. check accessibility basics
14. summarize changes
15. list assumptions
16. list any seed/demo content separately
17. explicitly confirm that Phase 9 Admin/CMS UI was not implemented

---

# 71. PHASE 8 END STATE

The desired architecture is:

```text
                    JLUXE WEBSITE
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
   Ecosystems         Services         Real Estate
        │                 │                 │
        └─────────────────┼─────────────────┘
                          │
                     Public Content
                          │
              ┌───────────┴───────────┐
              │                       │
        Testimonials               Insights
              │                       │
              └───────────┬───────────┘
                          ▼
                    Repository Layer
                          │
                          ▼
                       Database
                          │
                          ▼
                   Future Phase 9
                    Admin / CMS UI
```

The important separation is:

```text
PHASE 8
Content Presentation
        ↓
Database
        ↑
Phase 9
Content Management
```

Phase 8 consumes approved content.

Phase 9 will eventually provide the interface for creating and managing that content.

**Phase 8 goal:**

> Build a polished, trustworthy public layer for verified JLUXE testimonials and useful insights while preserving strict content authenticity, published-content safety, SEO readiness and the existing JLUXE design system.
