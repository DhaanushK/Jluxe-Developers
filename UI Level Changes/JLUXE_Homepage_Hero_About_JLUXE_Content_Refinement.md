# JLUXE Homepage Hero Content Refinement

## Objective

Update the existing JLUXE Homepage Hero so that the **first Hero slide introduces JLUXE itself**, while preserving the current Hero layout, visual hierarchy, ecosystem navigation, background treatment, CTA system, and responsive behavior.

The new About JLUXE content must fit into the **same visual/content format shown in the current Hero implementation**.

Do not redesign the entire Hero component.

The primary change is the content of the JLUXE introductory slide.

---

# 1. Existing Hero Format to Preserve

The Hero must continue using this structure:

```text
EYEBROW
       ↓
LARGE HERO HEADING
       ↓
DESCRIPTION
       ↓
PRIMARY CTA
       ↓
ECOSYSTEM NAVIGATOR
```

The content should remain left-aligned within the existing Hero content container.

Preserve the current:

- Hero height
- content positioning
- typography hierarchy
- background image
- image overlay
- CTA styling
- ecosystem navigator
- navigation arrows
- responsive behavior
- accessibility behavior
- keyboard controls
- touch/swipe behavior

Only modify the content required for the JLUXE introductory slide.

---

# 2. First Hero Slide: About JLUXE

The first Hero presentation should introduce JLUXE as the parent brand rather than immediately presenting one specific ecosystem.

## Eyebrow

Use:

```text
JLUXE
```

Keep the same eyebrow styling already used by the current Hero.

Do not add unnecessary text such as:

```text
ABOUT JLUXE
WELCOME TO JLUXE
OUR COMPANY
```

The eyebrow should simply be:

```text
JLUXE
```

---

# 3. Main Hero Heading

Use:

```text
Building Relationships.
Creating Opportunities.
Delivering Results.
```

The heading should use the existing JLUXE display serif typography.

Do not change the wording.

Do not use:

```text
Building relationships.
Creating possibilities.
```

Do not introduce additional slogans.

The heading should retain the same visual hierarchy and approximate scale as the current:

```text
JLuxe Real Estate
```

Hero heading.

Because this is a three-line statement, allow the heading to wrap naturally within the existing content width.

Desktop should visually resemble:

```text
Building Relationships.
Creating Opportunities.
Delivering Results.
```

The exact line wrapping may adapt to viewport width, but the text itself must remain unchanged.

---

# 4. Supporting Description

Use:

```text
Connecting people, properties, businesses and talent through real estate, business solutions, training and design.
```

This replaces the current ecosystem-specific description on the JLUXE introductory slide.

Keep the existing description typography and spacing.

Do not make the description excessively large.

Do not add another paragraph.

Do not invent additional company claims.

---

# 5. Primary CTA

The first Hero slide should contain:

```text
Explore JLUXE
```

with the existing Hero arrow icon.

The visual button should remain the same JLUXE Explore button style already implemented in the Hero.

The CTA should navigate to the appropriate JLUXE ecosystem discovery/overview route already used by the project.

Do not create a new button design.

Do not use:

```text
Let's Talk
```

as the secondary CTA on this slide.

The introductory JLUXE slide should have one primary CTA:

```text
Explore JLUXE →
```

---

# 6. Hero Visual Structure

The final introductory Hero should visually follow this composition:

```text
JLUXE


Building Relationships.
Creating Opportunities.
Delivering Results.


Connecting people, properties, businesses and talent
through real estate, business solutions, training and design.


[ Explore JLUXE → ]
```

The architectural background image should remain behind the entire composition.

The existing dark/forest overlay should ensure that the white/ivory typography remains readable.

Do not place a solid opaque panel behind the text unless the existing Hero already uses one.

---

# 7. Background Image

Preserve the existing Hero background image implementation.

The intended visual direction is the supplied luxury architectural background featuring:

- modern luxury architecture
- glass facades
- landscaped surroundings
- reflective pool/terrace
- distant city skyline
- warm sunset lighting
- premium architectural visualization
- dark green cinematic grading

The image should remain a background visual rather than becoming a separate foreground card.

Ensure the Hero text remains readable against the image through the existing overlay treatment.

Do not replace the image with a different visual unless explicitly requested.

---

# 8. Ecosystem Navigator

Keep the existing bottom ecosystem navigator in the same visual format shown in the current Hero.

The current ecosystem navigator should continue to display the four ecosystems:

```text
01  Real Estate
02  Business Solutions
03  Talent & Training
04  Interiors & Design
```

The navigator should remain positioned at the bottom of the Hero content area.

Preserve:

- numbering
- ecosystem names
- separators
- active indicator
- active underline/accent
- arrow indicator
- keyboard interaction
- click/tap interaction

Do not redesign the navigator as part of this change.

---

# 9. Ecosystem Slide Behavior

The existing ecosystem slides should continue working normally.

The content should remain:

## Real Estate

Eyebrow:

```text
REAL ESTATE
```

Title:

```text
JLuxe Real Estate
```

Description:

```text
Property buying, selling, project promotion and channel partnerships.
```

CTA:

```text
Explore Real Estate
```

## Business Solutions

Eyebrow:

```text
BUSINESS SOLUTIONS
```

Title:

```text
JLuxe Business Solutions
```

Use the existing approved Business Solutions description and CTA.

## Talent & Training

Eyebrow:

```text
TALENT & TRAINING
```

Title:

```text
JLuxe Talent & Training
```

Use the existing approved Talent & Training description and CTA.

## Interiors & Design

Eyebrow:

```text
INTERIORS & DESIGN
```

Title:

```text
JLuxe Interiors & Design
```

Use the existing approved Interiors & Design description and CTA.

Do not invent or rewrite the existing ecosystem-specific content unnecessarily.

---

# 10. Important Carousel Decision

Do NOT automatically add a fifth numbered ecosystem item merely because the JLUXE introductory slide exists.

The visible ecosystem navigator should continue representing the four actual ecosystems:

```text
01 Real Estate
02 Business Solutions
03 Talent & Training
04 Interiors & Design
```

The JLUXE introductory content should be treated as the parent-brand introduction within the existing Hero experience.

If the current carousel architecture requires the introductory slide to have an internal active index, keep that implementation detail internal.

Do not display:

```text
05 JLUXE
```

in the ecosystem navigator.

Do not introduce Boutique.

---

# 11. Hero Transition

The transition into the JLUXE introductory content should use the same smooth transition system already used by the Hero.

When switching between the JLUXE introduction and an ecosystem:

- eyebrow transitions smoothly
- heading transitions smoothly
- description transitions smoothly
- CTA transitions smoothly
- background image treatment remains stable unless the existing architecture supports slide-specific imagery
- ecosystem navigator active state updates correctly

Do not introduce aggressive animations.

Avoid:

- bouncing
- spinning
- excessive scaling
- flashy text effects
- character-by-character typing effects

The Hero should feel cinematic and premium.

---

# 12. Content Alignment

Keep the Hero content in the same left-side position shown in the current screenshot.

Do not center the text.

Do not move the content to the right side.

Do not vertically center it differently unless required by the existing responsive layout.

Maintain the existing relationship between:

```text
Eyebrow
Heading
Description
CTA
```

with the same approximate spacing.

---

# 13. Typography

Use the existing JLUXE typography system.

The Hero heading should use the project's existing display serif font.

Body copy should use the existing sans-serif/body typography where currently applicable.

Do not introduce another font just for this slide.

The heading should feel editorial and architectural.

The visual hierarchy should be:

```text
JLUXE
     small

Building Relationships.
Creating Opportunities.
Delivering Results.
     dominant

Connecting people, properties, businesses and talent...
     supporting

Explore JLUXE →
     CTA
```

---

# 14. Responsive Behavior

The new three-line heading must remain responsive.

Desktop:

```text
Building Relationships.
Creating Opportunities.
Delivering Results.
```

Tablet and mobile may wrap naturally according to viewport width.

Do not allow:

- horizontal overflow
- text clipping
- CTA overlap
- navigator overlap
- background image distortion

On mobile, preserve readability first.

The ecosystem navigator should remain usable through the existing mobile interaction.

---

# 15. Accessibility

Preserve all existing Hero accessibility features.

The introductory slide must have:

- one clear primary heading
- meaningful button/link text
- keyboard accessibility
- visible focus states
- accessible carousel labeling
- accessible active ecosystem state
- support for keyboard navigation
- support for touch/swipe where already implemented

Do not hide important content from assistive technologies.

---

# 16. Reduced Motion

Continue respecting:

```css
@media (prefers-reduced-motion: reduce)
```

When reduced motion is enabled:

- minimize Hero transitions
- remove unnecessary content movement
- avoid aggressive background animation
- preserve full navigation functionality

---

# 17. Do Not Change

Do not modify unrelated sections.

Do not change:

- Ecosystem section
- Why JLUXE section
- Integrated Business Solutions section
- Final CTA
- Footer
- Header navigation
- Services
- Real Estate pages
- CMS
- Database
- Forms
- Leads
- Testimonials
- Insights

This change is specifically for the Homepage Hero introductory content.

---

# 18. Final Expected Result

The first Hero view should feel like a clear introduction to the JLUXE parent brand.

Conceptually:

```text
┌───────────────────────────────────────────────────────────────┐
│                                                               │
│  JLUXE                                                        │
│                                                               │
│  Building Relationships.                                     │
│  Creating Opportunities.                                     │
│  Delivering Results.                                         │
│                                                               │
│  Connecting people, properties, businesses and talent         │
│  through real estate, business solutions, training            │
│  and design.                                                  │
│                                                               │
│  [ Explore JLUXE  → ]                                        │
│                                                               │
│  ───────────────────────────────────────────────────────────  │
│                                                               │
│  01                 02                    03             04   │
│  Real Estate       Business Solutions    Talent &      Interiors │
│                                           Training       & Design │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

The architectural background remains visible behind the composition.

The result should feel like a **premium brand introduction followed by ecosystem discovery**, while preserving the current JLUXE Hero's visual structure.

---

# 19. Acceptance Criteria

The implementation is complete when:

- [ ] First Hero slide introduces JLUXE.
- [ ] Eyebrow reads `JLUXE`.
- [ ] Heading reads `Building Relationships. Creating Opportunities. Delivering Results.`
- [ ] Supporting text reads `Connecting people, properties, businesses and talent through real estate, business solutions, training and design.`
- [ ] Primary CTA reads `Explore JLUXE`.
- [ ] CTA uses the existing Hero Explore button styling.
- [ ] No secondary Let's Talk CTA appears on this introductory slide.
- [ ] Existing Hero background remains intact.
- [ ] Existing dark overlay/readability treatment remains intact.
- [ ] Existing Hero content remains left-aligned.
- [ ] Existing ecosystem navigator remains visually consistent.
- [ ] Navigator contains only the four ecosystems.
- [ ] Boutique is not present.
- [ ] Ecosystem-specific slides continue to work.
- [ ] Existing ecosystem routes continue working.
- [ ] Carousel transitions remain smooth.
- [ ] Keyboard navigation remains functional.
- [ ] Touch/swipe behavior remains functional.
- [ ] Responsive layout works on desktop, tablet and mobile.
- [ ] Reduced-motion behavior is respected.
- [ ] No unrelated homepage sections are modified.
- [ ] TypeScript/build checks pass.

---

# Final Design Intent

The Hero should now communicate:

> **This is JLUXE.**

before asking the visitor:

> **Which JLUXE ecosystem are you looking for?**

The first impression should therefore move from a purely ecosystem-specific introduction to a **parent-brand introduction**, while preserving the existing cinematic Hero layout and ecosystem navigation.

The final experience should feel:

- premium
- cinematic
- editorial
- architectural
- confident
- minimal
- brand-focused
- consistent with JLUXE
