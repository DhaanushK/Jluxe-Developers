# JLUXE Homepage — Phase 1 UI & Interaction Changes
## Clear Implementation Specification for GitHub Copilot

### Document Purpose

This document defines the **first phase of visual and interaction changes** required for the JLUXE homepage.

The goal is to preserve the existing JLUXE visual identity and page structure while making the hero section:

- more visually immersive
- more interactive
- more premium
- more animated
- less static
- clearer in its CTA hierarchy

**Important:** These changes are limited to the homepage hero/navigation experience described below. Do not redesign unrelated sections or introduce new business functionality.

---

# 1. Reference Images

Two visual references were supplied with this request:

1. **Architectural background image**
   - Use the supplied luxury architectural image as the visual background of the homepage hero panel.
   - The image shows two premium contemporary architectural structures on the left and right, landscaped surroundings, a distant city skyline, mountains, and a warm sunset.
   - The center contains substantial visual breathing room and should remain suitable for hero content.

2. **Current JLUXE homepage screenshot**
   - Use the screenshot as the structural reference for the existing hero layout.
   - Preserve the current typography, ecosystem structure, navigation hierarchy, and general JLUXE branding unless specifically changed by this document.

Do not replace the existing JLUXE design system with the visual style of the reference websites.

---

# 2. Hero Background Image

## Requirement

The supplied architectural image must become the **background image of the homepage hero panel**.

### Desired composition

The image should fill the hero area rather than appear as a separate image/card.

Use a full-bleed background treatment equivalent to:

```css
background-image: url(...);
background-size: cover;
background-position: center;
background-repeat: no-repeat;
```

However, adapt the positioning responsively so the important architectural elements remain visible on desktop, tablet, and mobile.

### Visual treatment

The background should remain cinematic and premium.

Add a subtle dark/forest-green overlay where necessary so that the existing white/ivory hero typography remains readable.

Do NOT apply an excessive dark overlay that completely hides the architectural image.

Recommended approach:

```css
background:
  linear-gradient(
    90deg,
    rgba(...),
    rgba(...),
    rgba(...)
  ),
  url(...);
```

The exact opacity should be determined visually.

### Important

The image should be treated as a **background layer**, not as a normal `<img>` sitting inside the layout.

The hero content must remain above the image.

Suggested layer structure:

```text
Hero
├── Background image
├── Optional readability overlay
├── Existing hero content
└── Ecosystem navigator
```

Use appropriate stacking contexts / `z-index` values.

---

# 3. Remove the Long Horizontal Line Below JLuxe

## Current issue

The current homepage screenshot contains a long horizontal white/light line immediately below the JLuxe logo/navigation area.

This line should be removed completely.

### Requirement

Remove the entire visible separator line beneath the header.

Do not replace it with another prominent horizontal border.

The header should visually transition into the hero background.

### Expected result

Instead of:

```text
JLuxe       About   Ecosystems   Services   ...
────────────────────────────────────────────────
```

It should become:

```text
JLuxe       About   Ecosystems   Services   ...
```

with the architectural hero continuing naturally underneath.

### Important

Do not remove unrelated borders elsewhere on the website.

Only remove the header separator associated with this homepage hero/header treatment.

---

# 4. Replace the Header "Let's Talk" Button

## Existing element

The current top-right header contains:

```text
Let's Talk
```

inside the existing rectangular button.

Replace this button's visual treatment with the interaction style demonstrated by the supplied Uiverse reference:

https://uiverse.io/adamgiebl/quiet-duck-78

The Uiverse reference is being used only as a **visual/interaction reference**.

Do not copy unnecessary global CSS such as generic `button { ... }` selectors.

Use a JLUXE-specific scoped class/component.

---

## 4.1 Header Button Content

The button should contain:

```text
[Phone Call Icon] Let's Talk
```

Change:

- `Launch` → `Let's Talk`
- Rocket icon → Phone Call icon

Use an existing icon library already available in the project if possible.

Prefer a suitable phone-call icon such as:

```text
PhoneCall
```

from the project's existing icon system.

Do not introduce a new icon package if an existing dependency already provides the required icon.

---

## 4.2 Header Button Interaction

Replicate the core behavior of the Uiverse reference:

### Default state

- Icon positioned before the text.
- Compact premium button.
- White/light text.
- Dark/forest-green compatible background.
- Rounded corners.
- Pointer cursor.
- Comfortable padding.
- Button should visually belong to the JLUXE design system.

### Hover state

The reference behavior is:

- icon moves/rotates
- text shifts horizontally
- transition is smooth

Implement the same interaction concept:

```text
Normal:
[☎] Let's Talk

Hover:
     [☎] → Let's Talk
```

The actual movement should remain subtle enough for a premium corporate website.

### Transition

Use a smooth easing curve similar to the supplied reference.

Do not make the movement exaggerated.

Suggested duration:

```text
400–500ms
```

### Accessibility

The button must remain:

- keyboard accessible
- focus-visible
- readable
- usable on touch devices

Do not rely only on hover to expose essential information.

---

# 5. Automatic Ecosystem Slide Animation

## Requirement

The ecosystem overview in the homepage hero should no longer feel completely static.

The hero should automatically transition through the four JLUXE ecosystems:

```text
01 → 02 → 03 → 04 → 01 → ...
```

### Current ecosystem order

The sequence must be:

```text
01 — Real Estate
02 — Business Solutions
03 — Talent & Training
04 — Interiors & Design
```

Do not reintroduce Boutique.

---

# 5.1 Animation Behavior

The active ecosystem should transition smoothly between slides.

The transition should feel like a **premium editorial/architectural website**, not a basic carousel.

Recommended behavior:

```text
Current ecosystem
      ↓
smooth outgoing transition
      ↓
next ecosystem enters
      ↓
content settles
```

Use a combination of:

- horizontal translation
- opacity
- subtle scale if appropriate

Avoid aggressive zooming.

### Suggested timing

Transition duration:

```text
700–1000ms
```

Autoplay interval:

```text
approximately 5–7 seconds per ecosystem
```

The exact timing should be tuned visually.

---

# 5.2 Ecosystem Content Animation

When the active ecosystem changes, animate the hero content as a coordinated group.

Animate:

1. Eyebrow
2. Ecosystem heading
3. Description
4. Primary CTA

The content should not simply disappear and immediately reappear.

Use a staggered sequence such as:

```text
Eyebrow       → slight fade/slide
Heading       → slight fade/slide
Description   → slight fade/slide
CTA           → slight fade/slide
```

Keep the movement restrained.

---

# 5.3 Ecosystem Navigator Animation

The bottom ecosystem navigation:

```text
01  Real Estate
02  Business Solutions
03  Talent & Training
04  Interiors & Design
```

should visually indicate the active ecosystem.

The active state should transition smoothly instead of instantly switching.

Possible effects:

- active text color transition
- subtle underline/indicator movement
- opacity transition
- active segment highlight

Do not turn the navigator into large pill-shaped UI.

Maintain the current refined JLUXE editorial style.

---

# 5.4 Manual Navigation Must Continue Working

Automatic animation must NOT remove manual control.

Users should still be able to:

- click an ecosystem
- use keyboard navigation
- use existing arrow controls if already present
- swipe on touch devices if already supported

When a user manually changes the ecosystem:

1. immediately switch to the selected ecosystem
2. reset/restart the autoplay timer
3. continue the normal cycle afterward

---

# 5.5 Pause Conditions

Autoplay should pause when appropriate.

At minimum:

- pause while the user is hovering/focusing the hero
- pause while the browser tab is not visible, if practical
- resume when the user returns

Do not allow autoplay to become distracting.

---

# 5.6 Reduced Motion

Respect:

```css
prefers-reduced-motion: reduce
```

For users who prefer reduced motion:

- disable automatic animated transitions
- use instant or very subtle state changes
- preserve full functionality

This requirement is mandatory.

---

# 6. Replace "Explore Ecosystem" Button

## Existing button

The current hero contains a primary button similar to:

```text
Explore Real Estate →
```

The button should be redesigned using the interaction style from the supplied Uiverse reference:

https://uiverse.io/adamgiebl/new-bird-34

Again, this is a **visual/interaction reference**, not a request to globally import the Uiverse stylesheet.

---

# 6.1 Button Text

The text must dynamically reflect the active ecosystem.

Examples:

```text
Explore Real Estate
Explore Business Solutions
Explore Talent & Training
Explore Interiors & Design
```

The ecosystem name must come from the existing ecosystem data.

Do not hard-code four separate buttons if the existing component already uses dynamic ecosystem data.

---

# 6.2 Button Structure

The reference button has:

```text
Text                         [Arrow Icon]
```

The JLUXE implementation should retain the same conceptual structure.

Example:

```text
Explore Real Estate       [→]
```

The arrow sits inside the button's dedicated icon area.

---

# 6.3 Button Visual Behavior

Replicate the important interaction behavior from the supplied Uiverse button:

### Normal

```text
┌───────────────────────────────────┐
│ Explore Real Estate          →   │
└───────────────────────────────────┘
```

### Hover

The arrow/icon area should respond with the same general motion/expansion concept demonstrated by the reference.

The interaction should include:

- smooth arrow movement
- icon area animation
- subtle button response
- smooth transition
- active/pressed feedback

Do not blindly copy every visual value from the purple Uiverse example.

Adapt it to JLUXE:

- forest green
- warm ivory
- brass/gold accent where appropriate
- minimal border treatment
- premium typography
- existing JLUXE spacing

---

# 6.4 Button Transition

Use smooth transitions approximately in the range of:

```text
300–500ms
```

Use a polished easing curve.

Avoid:

- bouncing
- excessive scaling
- neon effects
- strong shadows
- cartoon-like motion

---

# 7. Remove the Secondary "Let's Talk" Button from Hero

## Current state

The hero currently has two actions:

```text
[Explore Real Estate →]    Let's Talk →
```

The secondary:

```text
Let's Talk →
```

must be removed.

### Final hero CTA arrangement

There should be only one primary hero action:

```text
[ Explore <Ecosystem Name> → ]
```

The header still retains its own:

```text
Let's Talk
```

button.

Therefore:

### Header

```text
... navigation ...       [☎ Let's Talk]
```

### Hero

```text
[ Explore Real Estate → ]
```

No second `Let's Talk` action beside it.

---

# 8. Final Hero Structure

After all changes, the homepage hero should conceptually look like:

```text
┌────────────────────────────────────────────────────────────────────┐
│                                                                    │
│  JLuxe       About   Ecosystems   Services   Our Work   Insights  │
│                                                   Careers [☎ Let's Talk]
│                                                                    │
│                                                                    │
│                  CINEMATIC ARCHITECTURAL IMAGE                     │
│                                                                    │
│      REAL ESTATE                                                    │
│                                                                    │
│      JLuxe Real Estate                                             │
│                                                                    │
│      Property buying, selling, project promotion and               │
│      channel partnerships.                                         │
│                                                                    │
│      [ Explore Real Estate → ]                                     │
│                                                                    │
│                                                                    │
│  ──────────────────────────────────────────────────────────────    │
│                                                                    │
│  01 Real Estate   02 Business Solutions   03 Talent & Training    │
│                                    04 Interiors & Design            │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

The architectural image should be clearly visible behind this content.

The exact positioning can remain consistent with the current JLUXE layout.

---

# 9. Visual Direction

The resulting experience should communicate:

```text
Premium
Architectural
Corporate
Modern
Elegant
Interactive
Controlled
Confident
```

The website should NOT feel like:

```text
A generic real-estate website
A template website
A gaming UI
A neon SaaS dashboard
An animation showcase
```

The interaction should support the content instead of becoming the content.

---

# 10. Animation Philosophy

Use this hierarchy:

```text
Static
  ↓
Responsive
  ↓
Interactive
  ↓
Delightful
  ↓
STOP
```

Do not cross into:

```text
Distracting
```

Every animation should have a purpose.

### Good animation

```text
Hero changes ecosystem
→ content transitions
→ user understands that the hero is interactive
```

### Bad animation

```text
Text constantly bouncing
Images constantly zooming
Buttons constantly moving
Background constantly shifting
```

Avoid the second approach.

---

# 11. Responsive Requirements

All changes must work on:

- desktop
- laptop
- tablet
- mobile

### Desktop

The supplied architectural background should be clearly visible.

### Tablet

Adjust background positioning so the primary architecture and sunset remain visually useful.

### Mobile

The hero may use a different `background-position` or crop strategy.

Do not force the desktop composition onto mobile if it causes the important subject to disappear.

The CTA should remain easy to tap.

Recommended minimum interactive touch target:

```text
44 × 44px
```

---

# 12. Component-Level Implementation Guidance

Before modifying anything:

1. Inspect the existing hero components.
2. Identify the current carousel/state implementation.
3. Identify the existing ecosystem data source.
4. Identify the current header CTA.
5. Identify the current hero CTA.
6. Identify the current ecosystem navigator.
7. Reuse existing components where possible.

Do NOT create duplicate carousel systems.

The existing `HeroCarousel`, `HeroSlide`, and `HeroEcosystemNavigator` architecture should be enhanced rather than replaced unless the existing implementation genuinely prevents the required behavior.

---

# 13. CSS Safety Rules

The Uiverse references use global selectors such as:

```css
button { ... }
button svg { ... }
button span { ... }
```

DO NOT copy those selectors globally into the JLUXE stylesheet.

Instead use component-specific classes.

For example:

```css
.jluxe-header-talk-button { ... }

.jluxe-header-talk-button svg { ... }

.jluxe-header-talk-button span { ... }

.jluxe-explore-button { ... }

.jluxe-explore-button .icon { ... }
```

This prevents the new button styling from breaking:

- navigation buttons
- forms
- dialogs
- cards
- admin UI
- future components

---

# 14. Existing Design System Must Be Preserved

Do not replace the existing JLUXE design system.

Preserve:

- forest green primary color
- warm ivory background
- brass accent
- editorial serif display typography
- clean sans-serif body typography
- restrained borders
- minimal rounded corners
- premium spacing
- existing responsive grid
- existing accessibility behavior

The Uiverse buttons should be **adapted into JLUXE**, not pasted into JLUXE.

---

# 15. Accessibility Requirements

All new interactions must remain accessible.

### Buttons

Use real `<button>` or `<Link>` elements according to their purpose.

### Keyboard

Users must be able to:

- tab to buttons
- activate buttons with keyboard
- navigate ecosystem controls
- see visible focus states

### Screen readers

Do not hide meaningful ecosystem content from screen readers.

The active ecosystem should be communicated appropriately.

### Reduced motion

Respect:

```css
@media (prefers-reduced-motion: reduce)
```

Disable or significantly reduce:

- autoplay
- slide transitions
- hover movement
- entrance animations

---

# 16. Performance Requirements

Do not sacrifice page performance for animation.

The architectural image is large and visually important, so:

- optimize the image for web delivery
- use an appropriate modern image format where practical
- avoid unnecessarily loading multiple copies
- prioritize the hero image
- avoid JavaScript-heavy animation libraries unless already required
- prefer CSS transitions for simple button interactions
- use lightweight React state for carousel behavior

Do not introduce a large animation dependency solely for these changes.

---

# 17. Do Not Change

For this phase, do NOT change:

- ecosystem names
- ecosystem business descriptions
- navigation structure
- footer structure
- other homepage sections
- services architecture
- database
- CMS
- admin
- lead management
- forms
- SEO architecture
- real-estate data model
- business logic

This phase is strictly focused on:

```text
Hero Background
+
Header CTA
+
Hero CTA
+
Ecosystem Animation
+
Hero Interaction
```

---

# 18. Acceptance Criteria

The implementation is considered complete only when all of the following are true:

### Background

- [ ] Supplied architectural image is used as the homepage hero background.
- [ ] Image covers the hero area.
- [ ] Text remains readable.
- [ ] Image remains visually recognizable.
- [ ] Responsive crop works on mobile.

### Header

- [ ] Long separator line below JLuxe is removed.
- [ ] Header `Let's Talk` uses the new Uiverse-inspired interaction.
- [ ] Phone-call icon replaces rocket icon.
- [ ] Hover animation works.
- [ ] Keyboard focus works.
- [ ] Button does not affect unrelated buttons.

### Ecosystem Carousel

- [ ] Four ecosystems are used.
- [ ] Order is 01 → 02 → 03 → 04.
- [ ] Carousel automatically advances.
- [ ] Transition is smooth.
- [ ] Content transitions with the ecosystem.
- [ ] Manual ecosystem selection still works.
- [ ] Autoplay resets after manual selection.
- [ ] Hover/focus pause behavior works.
- [ ] Reduced-motion behavior works.

### Hero CTA

- [ ] Hero `Explore <Ecosystem Name>` button uses the new Uiverse-inspired design.
- [ ] Text changes dynamically with the active ecosystem.
- [ ] Arrow animation works.
- [ ] Button remains accessible.
- [ ] JLUXE colors/design are preserved.

### Hero Actions

- [ ] Secondary hero `Let's Talk` is completely removed.
- [ ] Only the Explore CTA remains in the hero.
- [ ] Header still contains `Let's Talk`.

### Code Quality

- [ ] No global `button` CSS overrides are introduced.
- [ ] Existing components are reused where possible.
- [ ] No duplicate carousel implementation is created.
- [ ] No unnecessary animation library is added.
- [ ] TypeScript/build checks pass.
- [ ] Existing routes remain functional.

---

# 19. Expected User Experience

The final experience should feel like this:

### Initial load

The visitor sees the JLUXE navigation over a cinematic architectural environment.

The architectural background immediately establishes the premium nature of the company.

### Hero

The active ecosystem is presented clearly.

For example:

```text
REAL ESTATE

JLuxe Real Estate

Property buying, selling, project promotion
and channel partnerships.

[ Explore Real Estate → ]
```

### After several seconds

The hero smoothly transitions:

```text
01 Real Estate
        ↓
02 Business Solutions
```

The heading, description, CTA, and active ecosystem indicator transition together.

Then:

```text
02 → 03 → 04 → 01
```

continues as a controlled loop.

### Interaction

When the visitor hovers over:

```text
[☎ Let's Talk]
```

the icon and text perform the subtle Uiverse-inspired movement.

When the visitor hovers over:

```text
[ Explore Real Estate → ]
```

the arrow/icon area responds with the adapted Uiverse-inspired interaction.

The result should feel **alive without feeling noisy**.

---

# 20. Implementation Priority

Implement in this exact order:

```text
1. Hero background
        ↓
2. Remove header separator
        ↓
3. Header Let's Talk button
        ↓
4. Remove hero Let's Talk
        ↓
5. Explore Ecosystem button
        ↓
6. Ecosystem autoplay
        ↓
7. Ecosystem transition animation
        ↓
8. Navigator transition refinement
        ↓
9. Responsive testing
        ↓
10. Accessibility / reduced-motion testing
        ↓
11. Build / type / route verification
```

Do not move to unrelated UI improvements until this checklist is complete.

---

# 21. Final Design Principle

The target is not simply to "add animations."

The target is to transform the current static hero into a **premium interactive JLUXE introduction**.

The architectural image establishes the visual identity.

The ecosystem carousel communicates that JLUXE is a multi-business ecosystem.

The CTA interactions provide subtle delight.

The animations establish continuity between the four ecosystems.

Everything should remain restrained, elegant, responsive, accessible, and consistent with the existing JLUXE design system.

**Desired result:**

> **A cinematic, premium, interactive hero that makes the JLUXE ecosystem feel alive while remaining professional and business-focused.**
