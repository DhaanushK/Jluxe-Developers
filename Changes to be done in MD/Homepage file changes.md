# JLUXE HOMEPAGE — FILE-LEVEL CHANGE & QA INSTRUCTIONS

> Purpose: This document is intended to be given to GitHub Copilot to complete the remaining file-level changes and final technical QA for the JLUXE Developers homepage.
>
> Important: The homepage visual implementation has already been reviewed section-by-section on desktop and mobile. Do **not** redesign the approved sections. Make only the changes explicitly described below, preserve working functionality, and do not invent business information.

---

# 1. CURRENT STATUS

The following homepage sections have already been visually implemented and approved:

- Header / Navigation
- Hero Carousel
- Ecosystem Discovery
- Why JLUXE
- Integrated Business Solutions
- Testimonials
- Insights & Updates
- Final CTA
- Footer

The following sections intentionally remain hidden until verified business data is available:

- Impact Metrics
- How It Works
- Featured Opportunities

Do **not** populate those sections with placeholder business facts, fake numbers, fake properties, or invented process data.

The homepage is currently visually stable on desktop and mobile.

The remaining work is:

1. Small ecosystem-summary content cleanup.
2. Small mobile accessibility refinement.
3. Final build validation.
4. Route/link validation.
5. Accessibility QA.
6. SEO QA.
7. Performance QA.
8. Code cleanup.
9. Final verification.

---

# 2. IMPORTANT IMPLEMENTATION RULES

Before editing anything:

1. Inspect the existing implementation.
2. Preserve working functionality.
3. Modify only the files required by this document.
4. Do not redesign approved sections.
5. Do not introduce a new design system.
6. Do not introduce purple gradients.
7. Do not introduce pill-shaped button systems.
8. Do not introduce excessive rounded cards.
9. Do not introduce excessive glassmorphism.
10. Do not introduce excessive animation.
11. Do not invent JLUXE business claims.
12. Do not invent testimonials.
13. Do not invent metrics.
14. Do not invent property/project information.
15. Do not invent article content.
16. Do not replace the existing forest-green / warm-ivory design system.
17. Do not replace the existing typography system.
18. Do not convert the entire homepage into a Client Component.
19. Do not add unnecessary dependencies.
20. Do not rewrite unrelated files.

---

# 3. FILES TO REVIEW

Review these files first:

```text
src/
├── components/
│   ├── home/
│   │   ├── HeroCarousel.tsx
│   │   ├── HeroSlide.tsx
│   │   ├── HeroEcosystemNavigator.tsx
│   │   ├── EcosystemSection.tsx
│   │   ├── WhyJLuxe.tsx
│   │   ├── ImpactMetrics.tsx
│   │   ├── ProcessSection.tsx
│   │   ├── FeaturedOpportunities.tsx
│   │   ├── IntegratedSolutions.tsx
│   │   ├── Testimonials.tsx
│   │   ├── InsightsPreview.tsx
│   │   └── FinalCTA.tsx
│   │
│   └── layout/
│       ├── Layout.tsx
│       └── Footer.tsx
│
├── lib/
│   ├── site.ts
│   └── seo.ts
│
├── routes/
│   └── index.tsx
│
└── styles.css
```

Only change additional files if QA demonstrates that a change is necessary.

---

# 4. CHANGE #1 — ECOSYSTEM SUMMARY CONTENT

## File

```text
src/lib/site.ts
```

## Objective

The Ecosystem Discovery cards currently use longer summaries together with:

```tsx
line-clamp-3
```

This produces visible CSS-generated truncation such as:

```text
...
```

Example visual behavior:

```text
Property buying, selling, marketing, project
promotion and channel partnerships,
handled by one team from first enquiry to...
```

This should not look like unfinished content.

## Required change

Review the existing `ecosystems` data in `src/lib/site.ts`.

Shorten only the homepage-facing `summary` strings so that each summary is intentionally concise enough to display without CSS-generated truncation.

### Rules

- Preserve the original meaning.
- Do not invent new services.
- Do not remove important verified services merely to shorten the text.
- Do not change ecosystem names.
- Do not change ecosystem slugs.
- Do not change ecosystem status.
- Do not change CTA behavior.
- Do not change the five-ecosystem architecture.
- Keep Boutique as `coming-soon`.
- Prefer approximately 1–2 concise sentences.
- The text should read naturally without ending in `...`.

## Do NOT solve this by simply increasing or removing the line clamp.

The preferred solution is to improve the source content so the content itself is intentionally concise.

After updating the summaries, verify both:

```text
Desktop Ecosystem Discovery
Mobile Ecosystem Discovery
```

---

# 5. CHANGE #2 — MOBILE MENU TOUCH TARGET

## File

```text
src/components/layout/Layout.tsx
```

## Objective

Review the mobile menu button.

The hamburger/menu trigger should have a sufficiently large touch target.

## Required behavior

Ensure the interactive mobile menu button is approximately:

```text
44px × 44px
```

or larger.

If the current button uses a utility such as:

```text
size-10
```

consider increasing the button container to:

```text
size-11
```

while keeping the menu icon visually restrained.

Do not make the icon itself unnecessarily large.

## Preserve

The existing mobile menu behavior:

- `aria-expanded`
- `aria-controls`
- Escape key handling
- route-change close behavior
- body scroll locking
- visible focus state
- mobile navigation links

Do not rewrite the menu logic unless QA finds an actual defect.

---

# 6. CHANGE #3 — TESTIMONIAL EMPTY STATE

## File

```text
src/components/home/Testimonials.tsx
```

The current implementation intentionally renders a neutral state when:

```tsx
testimonials.length === 0
```

Preserve this behavior.

The component must NOT invent:

- names
- organizations
- roles
- quotes
- ratings
- photos

When real approved testimonial data is eventually supplied, the existing testimonial rendering should continue to work.

Do not add fake sample testimonials.

---

# 7. CHANGE #4 — INSIGHTS EMPTY STATE

## File

```text
src/components/home/InsightsPreview.tsx
```

Preserve the current empty state when:

```tsx
insights.length === 0
```

Do not add:

- fake article titles
- fake authors
- fake publication dates
- fake categories
- fake images
- fake excerpts

When real published insight data becomes available, the existing article grid should render it.

Only published content should eventually appear on the homepage.

---

# 8. CHANGE #5 — IMPACT METRICS MUST REMAIN DORMANT

## File

```text
src/components/home/ImpactMetrics.tsx
src/routes/index.tsx
```

Current homepage behavior intentionally passes:

```tsx
<ImpactMetrics metrics={[]} />
```

and the component returns `null` when there is no data.

KEEP THIS BEHAVIOR.

Do not add sample metrics.

Do not add:

```text
10+
50+
100+
500+
```

or any other invented company statistics.

The section can be connected to verified CMS/database data later.

---

# 9. CHANGE #6 — HOW IT WORKS MUST REMAIN DORMANT

## File

```text
src/components/home/ProcessSection.tsx
src/routes/index.tsx
```

Current homepage behavior intentionally passes:

```tsx
<ProcessSection steps={[]} />
```

and the component returns `null`.

KEEP THIS BEHAVIOR.

Do not invent a JLUXE process.

Do not populate it with generic steps simply to fill the page.

When approved JLUXE process content exists, it can be supplied through the `steps` prop or future CMS/service layer.

---

# 10. CHANGE #7 — FEATURED OPPORTUNITIES MUST REMAIN DORMANT

## File

```text
src/components/home/FeaturedOpportunities.tsx
src/routes/index.tsx
```

Current homepage behavior intentionally passes:

```tsx
<FeaturedOpportunities opportunities={[]} />
```

KEEP THIS BEHAVIOR.

Do not add fake:

- property names
- locations
- prices
- project names
- availability
- property images
- statuses

The component should eventually become database-driven.

---

# 11. CHANGE #8 — HERO PHOTOGRAPHY

## File

```text
src/components/home/HeroCarousel.tsx
```

Do NOT replace the current placeholder visual system with random stock or AI-generated property imagery.

The current hero uses a restrained visual placeholder until authentic JLUXE photography is supplied.

Preserve the current:

- ecosystem carousel behavior
- keyboard controls
- touch swipe
- direct ecosystem selection
- previous/next controls
- reduced-motion behavior
- five ecosystem structure

Do not add aggressive autoplay.

Do not add scroll-jacking.

Do not add excessive parallax.

When authentic JLUXE photography becomes available, implement it separately with responsive image delivery.

---

# 12. CHANGE #9 — FINAL CTA

## File

```text
src/components/home/FinalCTA.tsx
```

The current Final CTA has already been visually approved.

Preserve:

```text
Let's create what's next
Have a question or a plan in mind?
Connect with JLUXE and find the ecosystem that fits your requirement.
Get in touch →
```

The CTA must continue to point to:

```text
/contact
```

Do not redesign this section.

---

# 13. CHANGE #10 — FOOTER

## File

```text
src/components/layout/Footer.tsx
```

The current Footer has been visually approved.

Preserve:

- JLUXE identity
- tagline
- philosophy
- ecosystem links
- company links
- dark forest-green surface
- restrained typography
- copyright area

Use centralized values from:

```text
src/lib/site.ts
```

Do not duplicate phone/email/WhatsApp/address values.

Do not invent missing contact information.

Do not add a fake newsletter form.

Do not add dead Privacy Policy / Terms links unless those routes actually exist.

---

# 14. CHANGE #11 — HEADER ROUTE STATE

## File

```text
src/components/layout/Layout.tsx
```

The header has already been made route-aware.

Preserve this behavior:

### Homepage

```text
transparent
white navigation
hero-overlay state
```

### Inner pages

```text
warm-ivory background
dark/foreground navigation
visible border
```

Do not revert the route-aware header.

Verify:

```text
/
 /about
 /ecosystems
 /services
 /portfolio
 /insights
 /careers
 /contact
```

---

# 15. ACCESSIBILITY QA

Review all homepage interactive components.

## Header

Verify:

- keyboard navigation
- visible focus
- mobile menu button accessible name
- `aria-expanded`
- `aria-controls`
- Escape closes menu
- focus remains understandable
- route change closes menu

## Hero Carousel

Verify:

- previous button has accessible label
- next button has accessible label
- ecosystem buttons have accessible labels
- selected ecosystem exposes current state
- arrow-key navigation works
- Home goes to first ecosystem
- End goes to last ecosystem
- touch swipe works
- reduced motion is respected

## Links

Verify:

- every link has meaningful visible text or accessible name
- no dead links
- no invalid route parameters

## Headings

Verify semantic order:

```text
h1
  ↓
h2
  ↓
h3
```

Do not introduce heading-level jumps simply for visual styling.

---

# 16. RESPONSIVE QA

Test at approximately:

```text
390px
768px
1024px
1280px+
```

Check for:

- horizontal overflow
- clipped text
- broken grids
- buttons exceeding viewport
- inaccessible touch targets
- excessive whitespace
- headings becoming too large
- footer overflow
- hero controls colliding
- ecosystem navigator overflow
- cards exceeding viewport width

The homepage must not rely on horizontal page scrolling.

---

# 17. ROUTE / LINK QA

Verify every homepage navigation target.

Header:

```text
/about
/ecosystems
/services
/portfolio
/insights
/careers
/contact
```

Ecosystems:

```text
/ecosystems/$slug
```

Verify all five ecosystem slugs resolve correctly:

```text
real-estate
business-solutions
talent-training
boutique
interiors-design
```

Hero CTA behavior must remain correct for active and coming-soon ecosystems.

Business Solutions CTA:

```text
/ecosystems/business-solutions
```

Final CTA:

```text
/contact
```

Insights:

```text
/insights
```

---

# 18. BUILD VALIDATION

Run:

```bash
npm run build
```

The build must complete successfully.

If it fails:

1. Identify the actual source of the failure.
2. Fix only the relevant file.
3. Run the build again.
4. Do not hide TypeScript or build errors.

---

# 19. TYPE / CODE QUALITY QA

Check for:

- unused imports
- unused variables
- dead components
- unnecessary client-side state
- duplicate constants
- duplicate business information
- invalid route types
- incorrect React keys
- missing accessibility attributes
- unnecessary dependencies

Do not perform broad refactoring unrelated to the homepage.

---

# 20. SEO QA

Review:

```text
src/routes/index.tsx
src/lib/seo.ts
```

Verify homepage has:

- title
- description
- canonical support if configured
- Open Graph support if configured
- semantic heading structure

Do not add unsupported claims to metadata.

Current homepage description should accurately describe JLUXE's five ecosystems.

Do not claim:

- fake customer counts
- fake years of experience
- fake project counts
- fake awards
- fake geographic coverage
- fake achievements

---

# 21. PERFORMANCE QA

Check:

- unnecessary client components
- unnecessary dependencies
- image loading behavior
- lazy loading for non-hero images
- hero image strategy
- excessive animations
- unnecessary rerenders
- console errors
- broken network requests

Do not optimize prematurely by making the code harder to maintain.

---

# 22. MOTION QA

Preserve the global reduced-motion support in:

```text
src/styles.css
```

Verify:

```css
@media (prefers-reduced-motion: reduce)
```

continues to reduce animation and scrolling behavior.

Do not add aggressive animation to the homepage.

Preferred motion:

- subtle fade
- subtle hover movement
- restrained transitions

Avoid:

- rapid carousel autoplay
- large parallax effects
- scroll-jacking
- constant looping animation
- animated cursors
- excessive entrance animations

---

# 23. DESIGN SYSTEM QA

Preserve the current design system:

### Primary identity

Deep luxury forest.

### Supporting system

Muted sage / warm ivory.

### Typography

Display:

```text
Fraunces / Newsreader
```

Body:

```text
Inter / Public Sans
```

### UI characteristics

- thin borders
- restrained radius
- editorial spacing
- serif display headings
- clean sans-serif body
- restrained brass accent
- moderate button shapes

Do not introduce:

- purple gradients
- neon
- pill-button systems
- excessive glassmorphism
- random blobs
- excessive rounded cards
- excessive shadows
- emoji icons

---

# 24. HOMEPAGE DATA SAFETY

Never fabricate content for the following:

```text
Metrics
Testimonials
Properties
Projects
Insights
Achievements
Client logos
Customer counts
Reviews
Ratings
Team claims
```

If data is unavailable:

- hide the section
- or use an explicit neutral empty/coming-soon state

Never make unavailable business information look real.

---

# 25. EXPECTED FINAL HOMEPAGE STRUCTURE

The final homepage should remain:

```text
Header
    ↓
Hero Carousel
    ↓
Ecosystem Discovery
    ↓
Why JLUXE
    ↓
Impact Metrics
    ↓
How It Works
    ↓
Featured Opportunities
    ↓
Integrated Business Solutions
    ↓
Testimonials
    ↓
Insights & Updates
    ↓
Final CTA
    ↓
Footer
```

The first three currently data-dependent sections may remain visually absent when their arrays are empty:

```text
Impact Metrics
How It Works
Featured Opportunities
```

This is intentional.

---

# 26. FINAL ACCEPTANCE CHECKLIST

## Visual

- [ ] Header matches approved design
- [ ] Hero matches approved design
- [ ] Ecosystem Discovery matches approved design
- [ ] Why JLUXE matches approved design
- [ ] Integrated Business Solutions matches approved design
- [ ] Testimonials matches approved design
- [ ] Insights matches approved design
- [ ] Final CTA matches approved design
- [ ] Footer matches approved design
- [ ] No purple gradients
- [ ] No pill-button system
- [ ] No excessive rounding
- [ ] No excessive glassmorphism
- [ ] No excessive animation

## Content

- [ ] No fake metrics
- [ ] No fake testimonials
- [ ] No fake properties
- [ ] No fake projects
- [ ] No fake achievements
- [ ] No fake client logos
- [ ] No unsupported claims
- [ ] Boutique remains Coming Soon
- [ ] Ecosystem summaries do not end in CSS truncation
- [ ] All displayed business information is sourced from existing JLUXE configuration/content

## Responsive

- [ ] 390px checked
- [ ] 768px checked
- [ ] 1024px checked
- [ ] Desktop checked
- [ ] No horizontal overflow
- [ ] No clipped content
- [ ] Touch targets are usable
- [ ] Mobile menu works
- [ ] Footer stacks correctly
- [ ] Hero controls remain usable

## Accessibility

- [ ] Keyboard navigation works
- [ ] Focus states work
- [ ] Mobile menu is accessible
- [ ] Carousel is accessible
- [ ] Buttons have accessible names
- [ ] Links have meaningful names
- [ ] Heading hierarchy is valid
- [ ] Reduced motion works
- [ ] Images have appropriate alt handling

## Functionality

- [ ] Header links work
- [ ] Ecosystem links work
- [ ] Hero ecosystem selection works
- [ ] Hero previous/next works
- [ ] Hero keyboard controls work
- [ ] Hero touch swipe works
- [ ] Business Solutions CTA works
- [ ] Insights CTA works
- [ ] Final CTA works
- [ ] Footer links work
- [ ] Mobile menu works

## Build

- [ ] `npm run build` passes
- [ ] No TypeScript errors
- [ ] No console errors
- [ ] No broken routes
- [ ] No unnecessary dependency changes

## SEO

- [ ] Homepage title verified
- [ ] Homepage description verified
- [ ] Heading hierarchy verified
- [ ] Canonical support verified if configured
- [ ] Open Graph support verified if configured
- [ ] No unsupported claims in metadata

---

# 27. COPILOT EXECUTION RULE

GitHub Copilot should execute this document as a controlled maintenance task.

Before changing a file:

```text
Inspect → Identify required change → Edit only that file → Validate
```

Do not rewrite the entire project.

Do not replace working components unnecessarily.

Do not add fake content.

Do not change approved visual sections unless a QA issue is found.

After all changes:

```bash
npm run build
```

Then report:

```text
Files changed:
- ...

Files intentionally unchanged:
- ...

Build:
PASS / FAIL

Accessibility checks:
PASS / ISSUES

Responsive checks:
PASS / ISSUES

Route/link checks:
PASS / ISSUES

Remaining known limitations:
- ...
```

Be honest about incomplete requirements.

---

# 28. IMPORTANT FUTURE WORK — DO NOT IMPLEMENT IN THIS TASK

Do not implement the following now:

- CMS
- PostgreSQL integration
- Admin dashboard
- Lead management
- CRM automation
- Property comparison
- Favorites
- Customer accounts
- AI recommendations
- Mortgage calculator
- Payment system
- Advanced appointment scheduling
- Multilingual support
- External property portals
- Newsletter backend
- Testimonial management backend
- Insight CMS
- Property management backend

The current task is only:

```text
Homepage refinement
+
Responsive QA
+
Accessibility QA
+
SEO QA
+
Performance QA
+
Build validation
```

Future backend/CMS architecture should remain possible without implementing it now.

---

# 29. FINAL PRINCIPLE

The objective is not to make the homepage look artificially complete.

The objective is:

**A polished, responsive, accessible, maintainable JLUXE homepage that displays only verified business information and is ready to evolve into the future CMS/backend platform.**
