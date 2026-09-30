# JLUXE Phase 4 — Services & Service Pages
## Implementation Specification for GitHub Copilot

> **Purpose:** Implement the JLUXE service architecture and reusable service pages after Phase 3 (Ecosystem Architecture) has been completed and verified.
>
> **Important:** This phase is based only on the approved JLUXE source material. Do not invent services, business claims, case studies, results, clients, metrics, testimonials, or process details.

---

# 1. Phase 4 Objective

Build a reusable, scalable service architecture that connects JLUXE's five ecosystems to their approved services.

The target relationship is:

```text
JLUXE
│
├── Ecosystems
│   ├── Real Estate
│   ├── Business Solutions
│   ├── Talent & Training
│   ├── Boutique
│   └── Interiors & Design
│
└── Services
    ├── Service listing
    └── Service detail pages
```

Services must not be implemented as unrelated hard-coded pages.

Use reusable data structures and reusable page components.

---

# 2. Source-of-Truth Rules

Use the existing approved JLUXE content in:

- `src/lib/site.ts`
- JLUXE Developers source/company material
- `JLUXE_Developers_Master_AI_Specification.md`
- `JLUXE_Homepage_Technical_Change_Implementation_Specification(1).md`

The JLUXE master specification explicitly identifies:

### Business Solutions

- Marketing
- Branding
- Lead Generation
- Sales & Business Development
- Channel Partner
- Banking
- Event Management

### Talent & Training

- Recruitment
- Staffing
- Corporate Training
- College Training
- Career Counselling
- Careers

### Interiors & Design

- Residential Architecture
- Commercial Architecture
- Interior Design
- Home Interiors
- Office Interiors
- Space Planning
- 2D/3D Design
- Elevations
- Project Coordination
- Renovation
- Space Transformation

### Real Estate

The approved architecture supports:

- Property discovery
- Property buying
- Property selling
- Project promotion
- Channel partner services
- Lead generation
- Site visits
- Project enquiries

The company source material also contains more detailed real-estate service material such as real estate sales, real estate marketing, channel partner services and banking/event support.

### Boutique

Do **not** invent the Boutique business model.

Keep it as `coming-soon` / TBD until official content is supplied.

---

# 3. Do Not Invent Content

Copilot must NOT create:

- fake case studies
- fake client names
- fake project names
- fake statistics
- fake conversion rates
- fake testimonials
- fake awards
- fake customer counts
- fake service results
- fake locations
- fake prices
- fake property inventory
- fake team members
- unsupported guarantees

If approved content is unavailable, use an empty state, neutral placeholder, or omit the section.

Do not fill content gaps with generic marketing claims.

---

# 4. Inspect Before Editing

Before changing code:

1. Inspect the current Phase 3 ecosystem implementation.
2. Inspect `src/lib/site.ts`.
3. Inspect existing routes.
4. Inspect existing shared layout components.
5. Inspect existing UI components.
6. Inspect `src/lib/seo.ts`.
7. Inspect existing ecosystem detail components.
8. Identify whether a service model already exists.
9. Classify planned changes as:
   - RETAIN
   - REFACTOR
   - ADD
   - REMOVE

Do not rewrite working Phase 3 architecture unnecessarily.

---

# 5. Target Service Data Model

Create a reusable service type.

Use the existing project's conventions where possible.

Suggested model:

```ts
export type Service = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description?: string;
  ecosystemSlugs: string[];
  audience?: string[];
  offerings?: string[];
  status: "active" | "coming-soon";
  order: number;
  isPublished: boolean;
};
```

If the existing codebase already has a compatible type, extend or reuse it rather than creating a duplicate.

Do not over-engineer the model for V1.

---

# 6. Service-to-Ecosystem Relationship

A service may belong to one or more ecosystems where the approved source material supports that relationship.

Example:

```text
Business Solutions
├── Marketing
├── Branding
├── Lead Generation
├── Sales & Business Development
├── Channel Partner
├── Banking
└── Event Management

Talent & Training
├── Recruitment
├── Staffing
├── Corporate Training
├── College Training
├── Career Counselling
└── Careers

Interiors & Design
├── Residential Architecture
├── Commercial Architecture
├── Interior Design
├── Home Interiors
├── Office Interiors
├── Space Planning
├── 2D/3D Design
├── Elevations
├── Project Coordination
├── Renovation
└── Space Transformation
```

Do not force unrelated services into an ecosystem.

---

# 7. Service Listing Route

Implement or refine:

```text
/services
```

The page should introduce JLUXE services clearly.

Suggested structure:

```text
SERVICES

Services built around the JLUXE ecosystem.

[Service cards/grid]

[Talk to JLUXE CTA]
```

The exact copy must come from approved JLUXE content.

Do not copy fictional content from visual references.

---

# 8. Service Cards

Create a reusable:

```text
ServiceCard
```

Each card should support:

- service number/order
- service name
- short description
- ecosystem association where useful
- navigation affordance
- accessible link

Suggested route:

```text
/services/$slug
```

Do not create individual page components for every service unless there is a genuine structural reason.

---

# 9. Service Detail Route

Implement:

```text
/services/$slug
```

The route must be data-driven.

Examples:

```text
/services/marketing
/services/branding
/services/lead-generation
/services/sales-business-development
/services/channel-partner
/services/banking
/services/event-management
```

Additional approved services can use the same route architecture.

Invalid slugs must use the application's proper not-found behavior.

---

# 10. Reusable Service Detail Structure

A service detail page should support this structure:

```text
Service Hero
    ↓
What It Is
    ↓
Who It Is For
    ↓
What JLUXE Provides
    ↓
How Engagement Works
    ↓
Relevant Work
    ↓
CTA
```

The master specification requires service pages to explain:

1. What it is
2. Who it is for
3. What JLUXE provides
4. How engagement works
5. Relevant work
6. CTA

However:

**Do not create unsupported content just to fill these sections.**

If "How engagement works" or "Relevant work" is not officially supplied, omit it or show an appropriate empty state.

---

# 11. Service Hero

Reuse the JLUXE visual language established in Phase 3.

Recommended structure:

```text
SERVICE

Marketing

[Approved description]

Talk to JLUXE →
```

Keep:

- warm ivory background
- forest green
- serif display typography
- restrained borders
- generous spacing
- editorial layout

Do not introduce a new visual language.

---

# 12. What It Is

Use the approved service description.

Keep the copy factual.

Example source-supported direction:

For real-estate marketing, the company material describes strategic marketing support for real-estate projects and property businesses, including digital marketing, customer outreach, sales promotion, branding and market networking.

Do not expand this into unsupported performance claims.

---

# 13. Who It Is For

Where supported, show the relevant audience.

Approved audience categories include:

```text
Property Buyers
Property Sellers
Developers
Businesses
Corporates
Educational Institutions
Professionals / Job Seekers
```

Do not automatically show every audience on every service.

Only show audiences that logically and explicitly correspond to the approved service content.

---

# 14. What JLUXE Provides

Where the source provides a list, render it as structured content.

Examples from approved source material:

### Channel Partner

- Project promotion
- Lead generation
- Customer enquiry management
- Site visit coordination
- Sales support
- Follow-up & conversion support
- Property presentations
- Customer relationship management
- Project marketing support
- Sales performance support

### Real Estate Marketing

- Project branding
- Digital marketing
- Social media marketing
- Lead generation
- Property campaigns
- Promotional activities
- Customer engagement campaigns
- Sales collateral
- Event-based promotions
- Market outreach

### Banking

- Home loan assistance
- Property loan coordination
- Loan documentation guidance
- Customer-bank coordination
- Financial product awareness
- Loan follow-up support

### Event Management

- Corporate events
- Property launches
- Sales meets
- Dealer & channel partner meets
- Customer engagement events
- Training events
- Seminars & workshops
- College events
- Promotional events
- Employee engagement activities

### Recruitment & Staffing

- Permanent recruitment
- Contract staffing
- Executive search
- Sales recruitment
- Real estate recruitment
- HR & administration recruitment
- Customer relationship management recruitment
- Finance & accounts recruitment
- Engineering & project recruitment
- Support staff recruitment

Only use source-supported lists.

---

# 15. How Engagement Works

Do not invent a detailed workflow.

If the approved source does not define a formal process for a service:

- omit the section, or
- use a neutral CTA inviting the visitor to discuss the requirement.

Do not invent:

```text
Discovery → Strategy → Execution → Reporting
```

unless officially approved for that service.

---

# 16. Relevant Work

Do not invent case studies.

If there are no approved portfolio items for the service:

- omit the section, or
- render an empty state without fake examples.

Future portfolio data should be able to connect to services.

Target relationship:

```text
Service
   │
   └── Portfolio
```

---

# 17. CTA

Every active service should provide a clear next action.

Preferred pattern:

```text
Talk to JLUXE about [Service].
```

CTA should route to the existing contact route or approved enquiry mechanism.

Do not implement a full CRM/lead workflow in Phase 4.

Do not add payment or appointment systems.

---

# 18. Ecosystem Context

Service pages should make it clear which JLUXE ecosystem the service belongs to.

Example:

```text
02 / BUSINESS SOLUTIONS

Marketing
```

or:

```text
BUSINESS SOLUTIONS

Marketing
```

Where a service belongs to multiple approved contexts, display those relationships without creating duplicate service pages.

---

# 19. Breadcrumbs

If the existing application supports breadcrumbs, service pages may use:

```text
Home
→ Services
→ Marketing
```

or, where ecosystem context is primary:

```text
Home
→ Business Solutions
→ Marketing
```

Keep the breadcrumb hierarchy consistent with the actual route.

Do not create misleading breadcrumbs.

---

# 20. SEO

Each service page must have dynamic metadata using the existing SEO utility.

Support:

- title
- description
- canonical
- Open Graph where existing infrastructure supports it
- semantic headings

Do not use unsupported claims in metadata.

Example:

```text
/services/marketing
```

should have metadata derived from the approved Marketing content.

Do not hard-code identical metadata for every service.

---

# 21. Structured Data

Where the existing architecture supports it, service pages may provide appropriate `Service` structured data.

Only use verified values.

Do not fabricate:

- provider addresses
- ratings
- reviews
- aggregate ratings
- service areas
- prices

---

# 22. Responsive Design

Check:

```text
390px
768px
1024px
Desktop
```

The service architecture must work on:

- mobile
- tablet
- desktop

Avoid:

- horizontal overflow
- giant typography on mobile
- inaccessible grids
- tiny touch targets
- excessive animation

---

# 23. Accessibility

Every service card and CTA must support:

- keyboard navigation
- visible focus
- semantic links
- sufficient contrast
- screen-reader-friendly labels

Service grids should use semantic structure.

Do not make an entire card clickable using non-semantic elements.

---

# 24. Boutique Handling

Boutique remains:

```text
coming-soon
```

Do not create fake service pages for Boutique.

Possible future architecture:

```text
/ecosystems/boutique
```

with a controlled "Coming Soon" state.

The service architecture must allow Boutique services to be added later without redesigning the system.

---

# 25. Real Estate Scope Boundary

Phase 4 should NOT become the full real-estate platform.

Do not implement yet:

- property database
- plot inventory
- property search
- filters
- project management
- availability
- site-visit scheduling system
- property comparison
- favorites
- customer accounts
- mortgage calculator
- payment system

Those belong to later phases.

For now, service architecture should support the approved real-estate service content and prepare for Phase 5.

---

# 26. Talent & Training Scope Boundary

Implement reusable service architecture for approved areas:

- Recruitment
- Staffing
- Corporate Training
- College Training
- Career Counselling
- Careers

Support the distinct audiences:

```text
Employers
Educational Institutions
Professionals
Students / Job Seekers
```

Do not invent course catalogs, placement percentages, hiring numbers, training partners, or job openings.

---

# 27. Interiors & Design Scope Boundary

The approved architecture supports:

- Residential Architecture
- Commercial Architecture
- Interior Design
- Home Interiors
- Office Interiors
- Space Planning
- 2D/3D Design
- Elevations
- Project Coordination
- Renovation
- Space Transformation

Prioritize a future portfolio-driven model.

Do not invent completed projects.

Do not present placeholder imagery as actual JLUXE work.

---

# 28. Business Solutions Scope

Implement:

```text
Marketing
Branding
Lead Generation
Sales & Business Development
Channel Partner
Banking
Event Management
```

Each service should use the same reusable service-detail architecture.

---

# 29. Component Architecture

Suggested structure:

```text
src/
├── components/
│   ├── services/
│   │   ├── ServiceCard.tsx
│   │   ├── ServiceGrid.tsx
│   │   ├── ServiceHero.tsx
│   │   ├── ServiceOverview.tsx
│   │   ├── ServiceAudience.tsx
│   │   ├── ServiceOfferings.tsx
│   │   ├── ServicePortfolio.tsx
│   │   └── ServiceCTA.tsx
│   │
│   └── shared/
│
├── lib/
│   ├── site.ts
│   └── seo.ts
│
└── routes/
    ├── services.tsx
    └── services/
        └── $slug.tsx
```

Do not create unnecessary components.

If an existing component already handles the same responsibility, reuse it.

---

# 30. Data Architecture

Target:

```text
Route
  ↓
Service Data
  ↓
Reusable Service Components
```

Future target:

```text
Route
  ↓
Service Layer
  ↓
Repository
  ↓
Database / CMS
```

Do NOT implement the database or CMS in Phase 4.

The current config-driven data should be structured so that migration later is straightforward.

---

# 31. Homepage Integration

Do not redesign the homepage.

Where homepage sections link to services, update links to the new service routes.

Examples:

```text
Marketing → /services/marketing
Branding → /services/branding
Lead Generation → /services/lead-generation
```

Existing approved homepage sections must remain visually unchanged.

---

# 32. Navigation

If the header currently contains:

```text
Services
```

make sure it points to:

```text
/services
```

Maintain the existing header/footer behavior.

Do not add excessive navigation items.

---

# 33. Loading / Empty / Error States

For the current static/config-driven Phase 4 implementation, normal route rendering should not need database loading states.

However, architecture should be compatible with future dynamic content.

If a service slug is invalid:

```text
Not Found
```

Use the application's existing not-found behavior.

Do not silently fall back to another service.

---

# 34. Performance

Keep service pages lightweight.

Do not:

- load unnecessary client JavaScript
- add heavy animation libraries
- load unused images
- create large client-side data stores

Prefer server-rendered/static route content where supported.

Client components should only be used where browser interaction requires them.

---

# 35. Animation

Use the existing JLUXE motion language.

Keep animations restrained.

Avoid:

- aggressive scroll effects
- scroll-jacking
- excessive parallax
- animated counters
- large card rotations
- excessive hover movement

Respect:

```text
prefers-reduced-motion
```

---

# 36. Phase 4 Acceptance Checklist

Before completing Phase 4:

### Routes

```text
/services
/services/marketing
/services/branding
/services/lead-generation
/services/sales-business-development
/services/channel-partner
/services/banking
/services/event-management
```

Also verify the approved Talent & Training and Interiors & Design service routes that are implemented from the source data.

### Functionality

- Service listing works.
- Service cards link correctly.
- Dynamic service route works.
- Invalid slug returns not-found.
- Ecosystem context is correct.
- CTAs work.
- Existing header/footer work.
- Existing homepage links remain valid.

### Content

- No invented claims.
- No invented case studies.
- No fake metrics.
- No fake testimonials.
- No fake projects.
- Boutique remains coming-soon/TBD.
- Source terminology is preserved.

### Responsive

Test:

```text
390px
768px
1024px
Desktop
```

### Accessibility

Check:

- keyboard navigation
- visible focus
- semantic headings
- semantic links
- accessible names
- reduced motion

### SEO

Check:

- unique service titles
- unique descriptions
- canonical
- Open Graph where supported
- semantic heading structure

### Build

Run:

```bash
npm run build
```

The build must pass.

---

# 37. Regression Protection

Do NOT break:

- homepage
- `/ecosystems`
- `/ecosystems/real-estate`
- `/ecosystems/business-solutions`
- `/ecosystems/talent-training`
- `/ecosystems/boutique`
- `/ecosystems/interiors-design`
- header
- footer
- responsive navigation
- existing SEO utility

After implementation, report:

1. Files changed
2. Files added
3. Routes added
4. Data model changes
5. Components added
6. Any assumptions
7. Build result
8. Accessibility checks
9. SEO checks
10. Regression checks

---

# 38. Explicitly Do NOT Implement in Phase 4

Do not implement:

- CMS
- database
- admin dashboard
- authentication
- CRM
- lead scoring
- email campaigns
- payments
- advanced appointment scheduling
- property search
- property inventory
- plot layouts
- favorites
- customer accounts
- AI recommendations
- multilingual support
- advanced analytics

These belong to later phases.

---

# 39. Final Implementation Principle

The Phase 4 result should feel like:

```text
JLUXE
   ↓
Ecosystem
   ↓
Service
   ↓
Understand
   ↓
Trust
   ↓
Talk to JLUXE
```

It should be a clean extension of the Phase 3 architecture, not a separate mini-website.

**Preserve the approved JLUXE visual system.  
Reuse existing architecture.  
Use only verified content.  
Keep the implementation scalable.  
Do not build Phase 5, 6 or 7 early.**
