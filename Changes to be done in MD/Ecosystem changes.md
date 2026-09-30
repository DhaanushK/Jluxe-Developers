# JLUXE — PHASE 3 ECOSYSTEM ARCHITECTURE & PAGES
## File-Level Implementation Specification for GitHub Copilot

> Purpose: Implement the next phase of the JLUXE Developers website after completion of the homepage visual system.
>
> This phase covers **Ecosystem Architecture + Ecosystems Landing Page + Reusable Ecosystem Detail Pages**.
>
> Do not redesign the approved homepage. Do not implement the database/CMS/lead system in this task. Build the frontend architecture so those systems can be added later.

---

# 1. OBJECTIVE

The homepage currently establishes five JLUXE ecosystems:

1. Real Estate
2. Business Solutions
3. Talent & Training
4. Boutique
5. Interiors & Design

The next phase is to turn that ecosystem structure into a reusable website architecture.

Target:

```text
JLUXE
│
├── Homepage
│
└── Ecosystems
    │
    ├── Real Estate
    ├── Business Solutions
    ├── Talent & Training
    ├── Boutique
    └── Interiors & Design
```

The homepage should continue using the same ecosystem data.

The `/ecosystems` page should provide an overview of all ecosystems.

Each ecosystem should have a reusable detail-page structure:

```text
/ecosystems/real-estate
/ecosystems/business-solutions
/ecosystems/talent-training
/ecosystems/boutique
/ecosystems/interiors-design
```

---

# 2. IMPORTANT IMPLEMENTATION RULES

Before editing:

1. Inspect the existing route structure.
2. Inspect the existing ecosystem data in `src/lib/site.ts`.
3. Inspect existing layout/page components.
4. Inspect existing ecosystem routes before creating new routes.
5. Preserve working routes and components.
6. Reuse the existing design system.
7. Reuse the existing `Layout`, `PageHeader`, and shared UI where appropriate.
8. Do not duplicate ecosystem data across route files.
9. Do not create five independent hard-coded ecosystem page implementations.
10. Do not introduce a new CSS/design system.
11. Do not add fake business claims.
12. Do not invent ecosystem statistics.
13. Do not invent client logos.
14. Do not invent testimonials.
15. Do not invent projects/properties.
16. Do not invent awards or achievements.
17. Do not invent contact information.
18. Do not implement CMS/database functionality in this phase.
19. Do not implement lead/CRM functionality in this phase.
20. Do not modify approved homepage visuals unless a shared component change is genuinely required.

---

# 3. CURRENT ECOSYSTEM DATA

The existing source of truth is:

```text
src/lib/site.ts
```

The ecosystem model currently contains information equivalent to:

```text
slug
index
name
short
summary
audience
services
status
cta
```

Preserve the existing fields unless a change is demonstrably necessary.

The five existing ecosystems are:

```text
real-estate
business-solutions
talent-training
boutique
interiors-design
```

Do not rename these slugs.

---

# 4. ECOSYSTEM DATA MODEL

The ecosystem data should remain centralized.

Preferred conceptual model:

```ts
export type Ecosystem = {
  id: string;
  slug: string;
  index: string;
  name: string;
  short: string;
  summary: string;
  audience: string;
  services: string[];
  status: "active" | "coming-soon";
  cta: string;
};
```

If the existing type already uses a slightly different structure, preserve compatibility rather than unnecessarily rewriting it.

The important requirement is:

```text
One source of truth
        ↓
Homepage
        ↓
Ecosystems landing page
        ↓
Ecosystem detail pages
```

Do not maintain separate ecosystem arrays in different components.

---

# 5. ECOSYSTEM LANDING PAGE

## Route

```text
/ecosystems
```

First inspect whether this route already exists.

If it exists:

```text
REFACTOR
```

only where necessary.

If it does not exist:

```text
ADD
```

the route.

---

# 6. ECOSYSTEM LANDING PAGE STRUCTURE

Target:

```text
Header
    ↓
Ecosystem Page Hero
    ↓
Five Ecosystems
    ↓
Connected Platform Statement
    ↓
CTA
    ↓
Footer
```

The page should feel like a natural extension of the approved homepage.

Do not create a completely different visual language.

---

# 7. ECOSYSTEM PAGE HERO

Create a reusable section if one does not already exist:

```text
src/components/ecosystem/EcosystemOverviewHero.tsx
```

Suggested structure:

```text
ECOSYSTEMS

Five capabilities.
One connected platform.

Explore the areas of JLUXE and find the ecosystem
that matches your requirement.
```

Do not introduce unsupported claims.

The hero should use:

- existing display typography
- existing forest-green / warm-ivory system
- existing eyebrow style
- existing spacing
- existing button/link treatment

---

# 8. ECOSYSTEM GRID

Create a reusable component if one does not already exist:

```text
src/components/ecosystem/EcosystemGrid.tsx
```

It should render the existing `ecosystems` data dynamically.

Conceptually:

```tsx
{ecosystems.map((ecosystem) => (
  <EcosystemCard
    key={ecosystem.slug}
    ecosystem={ecosystem}
  />
))}
```

Do not create:

```text
RealEstateCard
BusinessSolutionsCard
TalentTrainingCard
...
```

The component must work for all five ecosystems.

---

# 9. ECOSYSTEM CARD

If the project does not already have a suitable reusable card, create:

```text
src/components/ecosystem/EcosystemCard.tsx
```

Each card should contain:

```text
Index
Ecosystem name
Short/summary content
Status where relevant
Navigation affordance
```

The card should link to:

```text
/ecosystems/[slug]
```

Use the existing ecosystem data.

Example:

```text
01
Real Estate

Existing ecosystem summary

Explore →
```

For Boutique:

```text
Coming soon
```

must remain visible where appropriate.

Do not pretend Boutique is fully operational if its current status says `coming-soon`.

---

# 10. RESPONSIVE ECOSYSTEM GRID

Desktop:

```text
5-column or appropriate multi-column composition
```

Tablet:

```text
2-column / adaptive grid
```

Mobile:

```text
1-column
```

The grid must not cause horizontal page scrolling.

Cards should have comfortable touch targets.

Do not use excessive rounded cards or pill-shaped UI.

---

# 11. ECOSYSTEM DETAIL ROUTE

Create or refactor:

```text
/ecosystems/$slug
```

Use the existing TanStack Router conventions in the project.

Do not create five separate route components.

The route should:

1. Read the slug.
2. Find the matching ecosystem from `ecosystems`.
3. Render the reusable ecosystem detail page.
4. Handle an unknown slug appropriately.

Conceptual flow:

```text
URL
 ↓
slug
 ↓
ecosystems.find(...)
 ↓
EcosystemDetailPage
```

---

# 12. UNKNOWN ECOSYSTEM HANDLING

If the slug does not match an existing ecosystem:

Do not render a blank page.

Use the existing project's not-found/error route conventions.

Do not invent an ecosystem.

Do not silently fall back to Real Estate.

---

# 13. REUSABLE ECOSYSTEM DETAIL COMPONENT

Create:

```text
src/components/ecosystem/EcosystemDetailPage.tsx
```

or an equivalent reusable structure if the project already has an appropriate component.

Target structure:

```text
EcosystemDetailPage
│
├── EcosystemHero
├── EcosystemOverview
├── EcosystemServices
├── EcosystemAudience
├── EcosystemCTA
└── Footer
```

Keep the architecture reusable.

---

# 14. ECOSYSTEM HERO

Create if needed:

```text
src/components/ecosystem/EcosystemHero.tsx
```

Content should come from the selected ecosystem.

Example structure:

```text
01

REAL ESTATE

[summary]

[Primary CTA]
[Let's Talk]
```

Do not hard-code Real Estate-specific content into the component.

The same component must work for:

```text
Real Estate
Business Solutions
Talent & Training
Boutique
Interiors & Design
```

---

# 15. ECOSYSTEM OVERVIEW

Create if needed:

```text
src/components/ecosystem/EcosystemOverview.tsx
```

Use the selected ecosystem's existing:

```text
summary
audience
```

Do not create new claims.

Possible structure:

```text
ABOUT THIS ECOSYSTEM

[summary]

WHO IT'S FOR

[audience]
```

Keep the content concise and readable.

---

# 16. ECOSYSTEM SERVICES

Create if needed:

```text
src/components/ecosystem/EcosystemServices.tsx
```

Render:

```ts
ecosystem.services
```

dynamically.

Example:

```text
SERVICES

01 Service
02 Service
03 Service
04 Service
```

Do not create separate hard-coded service lists inside each route.

Do not add services that do not already exist in the approved JLUXE data/content.

---

# 17. ECOSYSTEM AUDIENCE

If audience content already exists in the data model, render it.

Do not invent:

```text
target customers
demographics
market segments
customer counts
```

Use the existing approved ecosystem audience content only.

---

# 18. ECOSYSTEM CTA

Create if needed:

```text
src/components/ecosystem/EcosystemCTA.tsx
```

The CTA should lead toward:

```text
/contact
```

or the existing appropriate enquiry route.

Use the ecosystem's existing CTA label where appropriate.

For example:

```text
Explore Real Estate
```

or:

```text
Get notified
```

for a coming-soon ecosystem.

Do not create fake booking functionality.

Do not create fake enquiry submission.

---

# 19. BOUTIQUE — COMING SOON

Boutique currently has:

```text
status: "coming-soon"
```

Preserve this state across the ecosystem architecture.

The detail page should not imply that Boutique has fully launched services if its status remains `coming-soon`.

Possible behavior:

```text
BOUTIQUE

Coming soon

[Get notified]
```

Do not invent launch dates.

Do not invent products.

Do not invent inventory.

---

# 20. BUSINESS SOLUTIONS

Use the existing approved service data.

Do not invent additional services.

The currently established business-solutions direction includes areas such as:

```text
Branding
Marketing
Lead Generation
Sales
Business Development
```

Only render values that are actually present in the existing JLUXE source data.

---

# 21. TALENT & TRAINING

Use existing approved JLUXE content.

Do not invent:

- course counts
- placement rates
- hiring rates
- student counts
- institutional partnerships
- salary claims

If detailed content is unavailable, keep the page concise rather than filling gaps with generic claims.

---

# 22. REAL ESTATE

Do not populate this phase with fake projects or properties.

The ecosystem detail page may establish the Real Estate ecosystem itself using existing approved content.

The actual project/property architecture belongs to the later real-estate phase.

Do not create fake listings.

---

# 23. INTERIORS & DESIGN

Use existing approved ecosystem content.

Do not invent:

- portfolio counts
- completed projects
- client names
- square footage
- project locations
- awards

Future portfolio/project content can be connected later.

---

# 24. NAVIGATION INTEGRATION

The homepage already contains links to:

```text
/ecosystems
/ecosystems/$slug
```

Verify that these links now resolve correctly.

Verify all five slugs:

```text
/ecosystems/real-estate
/ecosystems/business-solutions
/ecosystems/talent-training
/ecosystems/boutique
/ecosystems/interiors-design
```

Do not change existing homepage CTA behavior unless required for route correctness.

---

# 25. HEADER / FOOTER

Reuse the existing global:

```text
Layout.tsx
Footer.tsx
```

Do not create ecosystem-specific headers or footers.

The existing route-aware header behavior must remain:

Homepage:

```text
transparent / hero state
```

Inner pages:

```text
warm-ivory / foreground state
```

---

# 26. PAGE METADATA

Every ecosystem detail page should eventually have dynamic metadata.

For this frontend phase, implement using the project's existing SEO utility:

```text
src/lib/seo.ts
```

Metadata should derive from the actual ecosystem:

```text
title
description
canonical
```

Do not create unsupported claims.

Example conceptual behavior:

```text
Real Estate | JLUXE
Business Solutions | JLUXE
Talent & Training | JLUXE
...
```

Use the existing SEO conventions in the project.

Do not introduce a second SEO system.

---

# 27. ACCESSIBILITY

All ecosystem components must support:

- keyboard navigation
- visible focus states
- semantic headings
- accessible links
- appropriate navigation landmarks
- reduced motion
- touch interaction

Ecosystem cards should use semantic links rather than clickable non-semantic containers.

Do not make an entire card a button if navigation is the actual action.

---

# 28. RESPONSIVE BEHAVIOR

Test:

```text
390px
768px
1024px
1280px+
```

Check:

- hero heading
- cards
- services list
- CTA
- header
- footer
- no horizontal overflow
- no clipped text
- no broken links
- no excessive whitespace

Mobile should use a stacked layout.

Do not simply shrink desktop typography.

---

# 29. DESIGN SYSTEM

Use the existing JLUXE system:

```text
Primary:
Deep Luxury Forest

Supporting:
Muted Sage

Surface:
Warm Ivory

Display:
Fraunces / Newsreader

Body:
Inter / Public Sans
```

Use existing utilities such as:

```text
eyebrow
```

and existing design tokens.

Do not introduce:

- purple gradients
- neon
- excessive glassmorphism
- pill buttons
- giant text everywhere
- excessive rounded cards
- excessive shadows
- emoji icons

---

# 30. ANIMATION

Keep ecosystem pages restrained.

Allowed:

- subtle fade
- subtle hover
- restrained image reveal
- small arrow movement

Avoid:

- aggressive page transitions
- scroll-jacking
- excessive parallax
- constant looping animation

Respect:

```text
prefers-reduced-motion
```

---

# 31. DATA ARCHITECTURE

Do not add a database in this phase.

However, structure the components so the future architecture can become:

```text
Route
 ↓
Ecosystem Service
 ↓
Repository
 ↓
Database
```

without requiring the visual components to be rewritten.

For now:

```text
Route
 ↓
ecosystems config
 ↓
Reusable components
```

This is intentional.

---

# 32. CMS READINESS

Do not implement CMS functionality yet.

But avoid component designs that assume content is hard-coded forever.

The future CMS should be able to manage:

```text
Ecosystem
 ├── name
 ├── slug
 ├── summary
 ├── audience
 ├── services
 ├── status
 ├── image
 ├── SEO metadata
 └── publication state
```

Do not over-engineer this now.

---

# 33. FILE CHANGE STRATEGY

Before editing each file classify the change:

```text
RETAIN
REFACTOR
ADD
REMOVE
```

Likely changes:

```text
src/lib/site.ts
    REFACTOR only if required

src/routes/ecosystems.tsx
    ADD or REFACTOR

src/routes/ecosystems.$slug.tsx
    ADD or REFACTOR depending on current routing

src/components/ecosystem/EcosystemOverviewHero.tsx
    ADD

src/components/ecosystem/EcosystemGrid.tsx
    ADD

src/components/ecosystem/EcosystemCard.tsx
    ADD if no reusable equivalent exists

src/components/ecosystem/EcosystemDetailPage.tsx
    ADD

src/components/ecosystem/EcosystemHero.tsx
    ADD if needed

src/components/ecosystem/EcosystemOverview.tsx
    ADD if needed

src/components/ecosystem/EcosystemServices.tsx
    ADD if needed

src/components/ecosystem/EcosystemAudience.tsx
    ADD if needed

src/components/ecosystem/EcosystemCTA.tsx
    ADD if needed
```

Do not create every file automatically if an existing component already performs the same responsibility.

---

# 34. DO NOT DUPLICATE COMPONENTS

Before creating:

```text
EcosystemCard
PageHeader
CTA
Button
SectionHeading
```

search the repository.

If an existing shared component already satisfies the requirement:

```text
REUSE
```

Do not create a duplicate component.

---

# 35. BUILD VALIDATION

After implementation:

```bash
npm run build
```

Build must pass.

If it fails:

1. Identify the actual error.
2. Fix the smallest relevant change.
3. Re-run the build.
4. Do not suppress errors.

---

# 36. ROUTE VALIDATION

Verify:

```text
/ecosystems
```

works.

Verify:

```text
/ecosystems/real-estate
/ecosystems/business-solutions
/ecosystems/talent-training
/ecosystems/boutique
/ecosystems/interiors-design
```

all resolve.

Test an invalid slug as well.

It should use the project's proper not-found behavior.

---

# 37. HOMEPAGE REGRESSION TEST

After ecosystem implementation, verify the homepage has not changed unexpectedly.

Check:

```text
/
```

Specifically:

- Hero
- Ecosystem Discovery
- Why JLUXE
- Integrated Solutions
- Testimonials
- Insights
- Final CTA
- Footer

The homepage should look the same as the approved version except where route behavior naturally changes.

---

# 38. RESPONSIVE QA

Verify both:

## Ecosystems landing page

```text
390px
768px
1024px
1280px+
```

## Ecosystem detail page

```text
390px
768px
1024px
1280px+
```

Check:

- no horizontal overflow
- readable headings
- usable CTA
- cards stack correctly
- services remain readable
- footer works
- navigation works

---

# 39. FINAL ACCEPTANCE CHECKLIST

## Architecture

- [ ] Ecosystem data has one source of truth
- [ ] Homepage still uses the same ecosystem data
- [ ] `/ecosystems` uses the same ecosystem data
- [ ] Detail pages use the same ecosystem data
- [ ] No duplicated ecosystem arrays
- [ ] No five separate hard-coded page implementations

## Ecosystems

- [ ] Real Estate works
- [ ] Business Solutions works
- [ ] Talent & Training works
- [ ] Boutique works
- [ ] Interiors & Design works
- [ ] Boutique remains Coming Soon
- [ ] Existing ecosystem slugs are preserved

## Routing

- [ ] `/ecosystems` works
- [ ] All five detail routes work
- [ ] Invalid slug uses proper not-found behavior
- [ ] Homepage ecosystem links work

## Content

- [ ] No fake metrics
- [ ] No fake properties
- [ ] No fake testimonials
- [ ] No fake projects
- [ ] No fake awards
- [ ] No fake client logos
- [ ] No unsupported claims
- [ ] Existing JLUXE content is preserved

## Accessibility

- [ ] Keyboard navigation works
- [ ] Focus states work
- [ ] Semantic headings work
- [ ] Links are accessible
- [ ] Touch targets are usable
- [ ] Reduced motion is respected

## Responsive

- [ ] 390px passes
- [ ] 768px passes
- [ ] 1024px passes
- [ ] Desktop passes
- [ ] No horizontal overflow

## SEO

- [ ] Ecosystem landing metadata works
- [ ] Detail metadata is dynamic
- [ ] No unsupported claims in metadata
- [ ] Canonical handling follows existing SEO utility

## Regression

- [ ] Homepage visual design unchanged
- [ ] Header still works
- [ ] Footer still works
- [ ] Hero still works
- [ ] Existing homepage links still work

## Build

- [ ] `npm run build` passes
- [ ] No TypeScript errors
- [ ] No console errors
- [ ] No unnecessary dependencies added

---

# 40. DO NOT IMPLEMENT IN THIS PHASE

Do NOT implement:

- PostgreSQL
- CMS
- Admin dashboard
- Lead management
- CRM
- Property listings
- Property comparison
- Favorites
- Customer accounts
- AI recommendations
- Mortgage calculator
- Payments
- Advanced appointment scheduling
- Newsletter backend
- Testimonial backend
- Insight CMS
- External property portals

Those belong to later phases.

---

# 41. COPILOT EXECUTION INSTRUCTION

Execute this specification carefully.

For every file:

```text
Inspect
↓
Determine whether to RETAIN / REFACTOR / ADD
↓
Make the smallest necessary change
↓
Validate
```

Do not perform broad refactoring.

Do not redesign the homepage.

Do not invent business content.

Do not introduce unnecessary dependencies.

After implementation, report:

```text
Files changed:
- ...

Files added:
- ...

Files intentionally unchanged:
- ...

Routes verified:
- ...

Build:
PASS / FAIL

Responsive:
PASS / ISSUES

Accessibility:
PASS / ISSUES

SEO:
PASS / ISSUES

Homepage regression:
PASS / ISSUES

Remaining limitations:
- ...
```

---

# 42. FINAL ARCHITECTURAL TARGET

After this phase:

```text
JLUXE
│
├── Homepage
│
├── Ecosystems
│   │
│   ├── Real Estate
│   ├── Business Solutions
│   ├── Talent & Training
│   ├── Boutique
│   └── Interiors & Design
│
└── Shared Layout / Design System
```

The architecture should be ready for the next phase:

```text
Ecosystems
      ↓
Services
      ↓
Real Estate Projects / Properties
      ↓
CMS / Database
      ↓
Leads / Enquiries
      ↓
Admin
```

Do not implement those later phases during this task.

---

# FINAL PRINCIPLE

The purpose of Phase 3 is to turn the five JLUXE ecosystems from homepage navigation items into a **reusable, coherent website architecture**.

Build the structure now.

Keep the content truthful.

Keep the design consistent.

Keep the architecture ready for the future CMS and database.

Do not over-engineer the current phase.
