# JLUXE Homepage — Ecosystem Interactive Panel Redesign

## Objective

Redesign the existing **JLUXE Ecosystem section** on the homepage into a row of four tall, narrow, interactive vertical panels inspired by the supplied Uiverse flex-expansion interaction.

The Uiverse reference is an interaction reference only. Do not blindly copy its colors, dimensions, typography, or generic CSS selectors.

The final component must look native to the existing JLUXE design system.

The interaction should work as follows:

- Four narrow panels appear side-by-side on desktop.
- Each panel represents one JLUXE ecosystem.
- Each collapsed panel displays an appropriate ecosystem icon.
- The ecosystem name is vertically oriented in the collapsed state.
- Hovering a panel smoothly expands that panel horizontally.
- The other three panels remain narrow and visible.
- The expanded panel reveals its complete ecosystem content.
- The ecosystem icon performs one smooth rotation when its panel becomes active.
- Moving from one panel to another transfers the expanded state smoothly.
- Existing ecosystem data and routing must be preserved.

Do not add Boutique.

---

# 1. Ecosystems

Use exactly these four ecosystems, in this order:

1. Real Estate
2. Business Solutions
3. Talent & Training
4. Interiors & Design

Reuse the existing ecosystem data source wherever possible.

Do not create duplicate ecosystem data if the current implementation already provides it.

---

# 2. Existing Section Heading

Keep the existing section heading unchanged:

> Four ecosystems, one platform.

Keep the existing supporting text unchanged:

> Each ecosystem has its own specialists. Together they cover the full path from property to people, and from branding to business growth.

Only redesign the four ecosystem cards/panels underneath this heading.

---

# 3. Desktop Layout

The four ecosystems should appear as four tall, narrow panels arranged horizontally across the available JLUXE content width.

Conceptually:

```text
┌────────┬────────┬────────┬────────┐
│        │        │        │        │
│   🏢   │   💼   │   🎓   │   📐   │
│        │        │        │        │
│ REAL   │ BUS.   │ TALENT │ INTER- │
│ ESTATE │ SOL.   │ &      │ IORS   │
│        │        │ TRAIN. │ &      │
│        │        │        │ DESIGN │
│        │        │        │        │
└────────┴────────┴────────┴────────┘
```

The exact dimensions must be responsive to the existing JLUXE content container.

Do NOT use the original Uiverse fixed dimensions:

```css
width: 210px;
height: 254px;
```

The panels should naturally fill the available width.

Suggested starting point:

```css
.ecosystem-panels {
  display: flex;
  width: 100%;
  min-height: 360px;
  gap: 4px;
}

.ecosystem-panel {
  flex: 1;
  min-width: 0;
}
```

Adjust the height and spacing after visual testing so the section fits naturally into the existing JLUXE page.

---

# 4. Collapsed Panel State

The default state should be visually minimal.

Each panel should primarily show:

- ecosystem icon
- vertically oriented ecosystem name

The full description and Explore CTA should remain hidden while collapsed.

The ecosystem name must be rotated as a complete text element.

Example:

```text
        🏢

        REAL
        ESTATE
```

The actual text should behave like a rotated text block, equivalent to:

```css
transform: rotate(-90deg);
```

Do NOT display the title letter-by-letter like:

```text
R
E
A
L
```

The complete ecosystem name must rotate as one element.

---

# 5. Replace Numbers with Ecosystem Icons

Do NOT use:

```text
01
02
03
04
```

Instead, use appropriate icons from the existing project icon library.

Use this mapping:

### Real Estate

```text
Building2
```

### Business Solutions

```text
Briefcase
```

### Talent & Training

```text
GraduationCap
```

### Interiors & Design

```text
Ruler
```

Reuse the icon dependency already present in the project.

Do NOT install another icon library if the project already has suitable icons available.

The icons should remain visually consistent with the existing JLUXE icon style.

---

# 6. Icon Appearance

Collapsed state:

- icon is visible
- icon is stationary
- icon is subtle
- icon uses JLUXE colors
- suggested size: 24–32px

Expanded state:

- icon remains visible
- icon uses the appropriate contrasting JLUXE color
- icon has already completed its activation rotation

The icon must not continuously spin while the cursor remains over the panel.

---

# 7. Icon Rotation Animation

When a panel becomes active/expanded, its icon should perform one smooth rotation.

Desired behavior:

```text
Inactive
    ↓
Icon stationary

Hover / active
    ↓
Icon rotates once
    ↓
Icon stops

Panel remains hovered
    ↓
Icon stays stationary
```

Do NOT create an infinite rotation animation.

Suggested CSS:

```css
.jluxe-ecosystem-panel__icon {
  transition:
    transform 600ms cubic-bezier(0.76, 0, 0.24, 1);
}

.jluxe-ecosystem-panel:hover
.jluxe-ecosystem-panel__icon {
  transform: rotate(360deg);
}
```

If the implementation uses React state for the active panel, prefer triggering the animation based on the active ecosystem changing rather than causing repeated rotations on every render.

The animation should feel elegant and controlled.

---

# 8. Icon Colors

Use the existing JLUXE visual palette.

Recommended colors:

```text
Warm Ivory
#F3EBDD

Forest Green
#17382F

Muted Brass
#C6A15B

Soft Border
#D8D0C2
```

Suggested collapsed state:

- warm ivory panel
- forest-green or brass icon
- forest-green text
- soft neutral border

Suggested expanded state:

- forest-green panel
- warm ivory text
- warm ivory or brass icon
- subtle brass border/accent

Do not use the pink/black Uiverse palette.

Do not use:

```text
#212121
#ff5a91
#ff568e
```

---

# 9. Hover Expansion

When a panel is hovered, it should expand horizontally while the other three panels compress.

Conceptually:

### Default

```text
┌──────┬──────┬──────┬──────┐
│  🏢  │  💼  │  🎓  │  📐  │
│ REAL │ BUS. │ TAL. │ INT. │
│ EST. │ SOL. │ &    │ &    │
│      │      │ TRAIN│ DESIGN
└──────┴──────┴──────┴──────┘
```

### Hover Real Estate

```text
┌──────────────────────────────┬──────┬──────┬──────┐
│                              │      │      │      │
│  🏢                          │ 💼   │ 🎓   │ 📐   │
│                              │      │      │      │
│  JLuxe Real Estate           │      │      │      │
│                              │      │      │      │
│  Property buying, selling,   │      │      │      │
│  project promotion and       │      │      │      │
│  channel partnerships.       │      │      │      │
│                              │      │      │      │
│  Explore →                   │      │      │      │
└──────────────────────────────┴──────┴──────┴──────┘
```

Use the flex-expansion concept from the supplied reference.

Suggested starting point:

```css
.jluxe-ecosystem-panel {
  flex: 1;
  min-width: 0;
  transition:
    flex 600ms cubic-bezier(0.76, 0, 0.24, 1);
}

.jluxe-ecosystem-panel:hover {
  flex: 4;
}
```

The exact ratio may be adjusted after visual testing.

The important requirement is:

> One active panel becomes substantially wider while the other three remain narrow and visible.

---

# 10. Expanded Content

When a panel expands, reveal the complete ecosystem content.

## Real Estate

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
Explore →
```

## Business Solutions

Title:

```text
JLuxe Business Solutions
```

Description:

```text
Marketing, branding, lead generation, sales, banking and events.
```

CTA:

```text
Explore →
```

## Talent & Training

Title:

```text
JLuxe Talent & Training
```

Description:

```text
Recruitment, staffing, training and career counselling.
```

CTA:

```text
Explore →
```

## Interiors & Design

Title:

```text
JLuxe Interiors & Design
```

Description:

```text
Architecture, interiors, space planning, design and renovation.
```

CTA:

```text
Explore →
```

Do not invent or modify business content.

---

# 11. Expanded Content Animation

When the panel expands:

1. Panel width expands.
2. Vertical ecosystem name transitions toward horizontal orientation.
3. Ecosystem title appears.
4. Description appears.
5. Explore CTA appears.
6. Content settles into position.

Use subtle animation such as:

```css
opacity: 0 → 1;
transform: translateY(8px) → translateY(0);
```

Do not use:

- bouncing
- excessive scaling
- spinning content
- aggressive zooming
- elastic/cartoon-like animation

The animation should feel premium and editorial.

---

# 12. Vertical Title Transition

Collapsed:

```text
transform: rotate(-90deg);
```

Expanded:

```text
transform: rotate(0deg);
```

Use a smooth transition:

```css
transition:
  transform 600ms cubic-bezier(0.76, 0, 0.24, 1);
```

The vertical title should transition into the expanded horizontal title rather than instantly disappearing.

---

# 13. Expanded Panel Interaction

When the user moves the pointer from one panel to another:

```text
Real Estate active
        ↓
Business Solutions active
        ↓
Talent & Training active
        ↓
Interiors & Design active
```

The active state should transfer smoothly.

The previous panel should:

- contract
- return its title to the vertical state
- return its icon to its inactive state

The new panel should:

- expand
- rotate its icon once
- transition its title to horizontal
- reveal its content

Do not create overlapping active panels.

---

# 14. Ecosystem CTA

Each expanded panel should retain an Explore CTA.

The CTA must use the existing ecosystem routing.

Expected routes:

```text
Real Estate
→ /ecosystems/real-estate

Business Solutions
→ /ecosystems/business-solutions

Talent & Training
→ /ecosystems/talent-training

Interiors & Design
→ /ecosystems/interiors-design
```

If the current ecosystem data already contains the route/slug, reuse it instead of duplicating route strings.

---

# 15. Existing Design System

Preserve the current JLUXE design language:

- warm ivory backgrounds
- forest green primary color
- muted brass accent
- editorial serif headings
- clean sans-serif body text
- subtle borders
- minimal corner radius
- generous spacing
- restrained shadows
- premium architectural feel

The Uiverse interaction is inspiration only.

The final component should look as though it was designed specifically for JLUXE.

---

# 16. Panel Borders and Shape

Use subtle borders.

Suggested:

```css
border: 1px solid #D8D0C2;
```

Active state:

```css
border-color: #C6A15B;
```

Avoid:

- thick borders
- large rounded cards
- pill shapes
- excessive shadows

A very small radius such as:

```css
border-radius: 2px;
```

is acceptable if it matches the existing design system.

---

# 17. Desktop Behavior

Desktop should use the hover interaction.

Default:

```text
01 equivalent icon | 02 equivalent icon | 03 equivalent icon | 04 equivalent icon
```

Hover Real Estate:

```text
Real Estate expanded | Business | Talent | Interiors
```

Hover Business:

```text
Real Estate | Business expanded | Talent | Interiors
```

Hover Talent:

```text
Real Estate | Business | Talent expanded | Interiors
```

Hover Interiors:

```text
Real Estate | Business | Talent | Interiors expanded
```

Only one panel should be expanded at a time.

---

# 18. Mobile Behavior

Do not rely on hover for mobile.

On mobile, convert the component into a stacked/tap-based accordion.

Example:

```text
┌──────────────────────────────┐
│ 🏢  Real Estate              │
└──────────────────────────────┘

┌──────────────────────────────┐
│ 💼  Business Solutions       │
└──────────────────────────────┘

┌──────────────────────────────┐
│ 🎓  Talent & Training        │
└──────────────────────────────┘

┌──────────────────────────────┐
│ 📐  Interiors & Design       │
└──────────────────────────────┘
```

Tapping a panel should expand it and reveal:

- icon
- title
- description
- Explore CTA

Only one panel needs to be expanded at a time.

Do not force vertical text onto narrow mobile screens if it negatively affects readability.

---

# 19. Tablet Behavior

Test the horizontal panel interaction at tablet widths.

If the panels become too narrow:

- adjust the panel height and typography
- reduce spacing appropriately
- or transition to the mobile/accordion layout at a suitable breakpoint

Never allow text to overlap or become unreadable.

---

# 20. Accessibility

The ecosystem panels and Explore links must remain accessible.

Users must be able to:

- tab through ecosystem panels
- focus an ecosystem
- activate the corresponding ecosystem
- see visible focus states

Do not make essential information available only through mouse hover.

Provide an equivalent keyboard/focus behavior for the expanded state where appropriate.

For decorative SVG icons, use:

```html
aria-hidden="true"
```

Do not rely on the icon alone to identify the ecosystem.

The ecosystem name must remain available as accessible text.

---

# 21. Reduced Motion

Respect:

```css
@media (prefers-reduced-motion: reduce)
```

When reduced motion is enabled:

- remove or significantly reduce flex transitions
- remove icon rotation
- remove content slide/fade animations
- preserve the expanded/collapsed functionality
- keep all ecosystem content accessible

---

# 22. CSS Safety

Do NOT copy the original Uiverse selectors:

```css
.card {}
.card p {}
.card span {}
```

Do not use generic selectors that could affect other JLUXE components.

Use scoped classes such as:

```text
.jluxe-ecosystem-panels
.jluxe-ecosystem-panel
.jluxe-ecosystem-panel__icon
.jluxe-ecosystem-panel__collapsed-title
.jluxe-ecosystem-panel__content
.jluxe-ecosystem-panel__title
.jluxe-ecosystem-panel__description
.jluxe-ecosystem-panel__link
```

Do not introduce global button, paragraph, span, or SVG styles.

---

# 23. Component Architecture

Before modifying code:

1. Inspect the existing EcosystemSection.
2. Inspect the existing ecosystem card component.
3. Inspect the existing ecosystem data source.
4. Reuse the existing ecosystem data.
5. Reuse the existing routing.
6. Replace the current card presentation with the new interactive panel presentation.
7. Do not create duplicate ecosystem data.
8. Do not modify unrelated homepage sections.

Enhance the existing architecture rather than rebuilding the entire homepage.

---

# 24. Performance

Keep the implementation lightweight.

Prefer:

- CSS transitions
- existing React state
- existing icon library
- existing components

Do not add a large animation library just for this interaction.

Avoid JavaScript-driven animation when CSS can achieve the same result.

---

# 25. Final Visual Target

The final collapsed state should resemble:

```text
┌──────────┬──────────┬──────────┬──────────┐
│          │          │          │          │
│    🏢    │    💼    │    🎓    │    📐    │
│          │          │          │          │
│  REAL    │ BUSINESS │  TALENT  │ INTERIORS│
│  ESTATE  │ SOLUTIONS│    &     │    &     │
│          │          │ TRAINING │  DESIGN  │
│          │          │          │          │
└──────────┴──────────┴──────────┴──────────┘
```

When Real Estate is hovered:

```text
┌──────────────────────────────┬──────┬──────┬──────┐
│                              │      │      │      │
│  🏢 →                       │  💼  │  🎓  │  📐  │
│                              │      │      │      │
│  JLuxe Real Estate           │      │      │      │
│                              │      │      │      │
│  Property buying, selling,   │      │      │      │
│  project promotion and       │      │      │      │
│  channel partnerships.       │      │      │      │
│                              │      │      │      │
│  Explore →                   │      │      │      │
└──────────────────────────────┴──────┴──────┴──────┘
```

The icon performs one smooth rotation when the panel becomes active, then remains stationary.

The interaction should feel:

- premium
- architectural
- editorial
- smooth
- minimal
- intentional
- responsive

Avoid:

- neon colors
- pink/purple Uiverse styling
- continuous icon spinning
- bouncing
- excessive shadows
- excessive rounded corners
- unnecessary animation
- generic template styling

---

# 26. Acceptance Criteria

The implementation is complete only when:

- [ ] Exactly four ecosystem panels exist.
- [ ] Boutique is not present.
- [ ] Panels appear horizontally on desktop.
- [ ] Panels fill the available JLUXE content width.
- [ ] Panels are tall and narrow in the collapsed state.
- [ ] Numbers 01–04 are removed.
- [ ] Appropriate ecosystem icons replace the numbers.
- [ ] Real Estate uses Building2.
- [ ] Business Solutions uses Briefcase.
- [ ] Talent & Training uses GraduationCap.
- [ ] Interiors & Design uses Ruler.
- [ ] Icons are stationary when inactive.
- [ ] Active icon performs one smooth rotation.
- [ ] Icon does not continuously spin.
- [ ] Ecosystem names are vertically rotated as complete text blocks.
- [ ] Text is not displayed letter-by-letter.
- [ ] Hovering a panel expands it.
- [ ] Other three panels remain visible.
- [ ] Expanded panel reveals the full ecosystem content.
- [ ] Vertical title transitions smoothly to horizontal.
- [ ] Description appears smoothly.
- [ ] Explore CTA appears smoothly.
- [ ] Moving between panels transfers the active state smoothly.
- [ ] Existing ecosystem routes continue working.
- [ ] JLUXE forest/ivory/brass palette is used.
- [ ] Uiverse pink/black colors are not used.
- [ ] Fixed 210px × 254px dimensions are not used.
- [ ] No global `.card`, `p`, `span`, `button`, or SVG styles are introduced.
- [ ] Mobile uses a tap-based interaction.
- [ ] Tablet layout remains usable.
- [ ] Keyboard navigation works.
- [ ] Focus states are visible.
- [ ] Reduced-motion preferences are respected.
- [ ] Existing heading and supporting text remain unchanged.
- [ ] Existing ecosystem business content remains unchanged.
- [ ] No unrelated sections are modified.
- [ ] TypeScript/build checks pass.

---

# Final Goal

Transform the current static four-card Ecosystem section into a premium interactive vertical-panel experience.

The visitor should immediately see four distinct JLUXE ecosystems through their respective icons.

The collapsed state should be visually intriguing through the vertical ecosystem names.

Hovering an ecosystem should smoothly expand it, rotate its icon once, transition the title into horizontal orientation, and reveal the complete ecosystem information and Explore CTA.

The result should feel like a refined, premium architectural/editorial interaction designed specifically for JLUXE — not like a copied Uiverse component.
