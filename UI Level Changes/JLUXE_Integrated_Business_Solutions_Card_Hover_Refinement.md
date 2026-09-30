# JLUXE Homepage — Integrated Business Solutions Card Hover Refinement

## Objective

Update the existing **JLUXE Homepage — Integrated Business Solutions** section.

The current section contains five solution cards:

1. Build — Brand
2. Reach — Marketing
3. Generate — Leads
4. Convert — Sales
5. Grow — Business Development

The requested change is to make each individual card visually **pop up/elevate when the mouse hovers over it**.

The interaction should feel premium, subtle, architectural, and consistent with the existing JLUXE design system.

Do not redesign the entire section. Only refine the individual card interaction.

---

## 1. Existing Cards

Preserve the existing five cards and their content exactly:

### 01 — Build

Brand

### 02 — Reach

Marketing

### 03 — Generate

Leads

### 04 — Convert

Sales

### 05 — Grow

Business Development

Do not change the wording or order.

---

## 2. Hover Interaction

When the mouse pointer hovers over an individual card:

- That specific card should visually pop up from the row.
- The card should move slightly upward.
- Add a subtle elevation/shadow effect.
- Slightly emphasize the card border/accent.
- The card content should remain readable and stable.
- The other four cards must remain in their original positions.
- Do not expand the hovered card horizontally.
- Do not change the width of the card.
- Do not cause neighboring cards to move.
- When the pointer leaves, the card should smoothly return to its original position.

The effect should resemble a physical card lifting slightly from the surface.

---

## 3. Visual Behavior

### Default

```text
┌──────────┬──────────┬──────────┬──────────┬──────────┐
│          │          │          │          │          │
│   Build  │  Reach   │ Generate │  Convert │   Grow   │
│   Brand  │ Marketing│  Leads   │  Sales   │ Business │
│          │          │          │          │          │
└──────────┴──────────┴──────────┴──────────┴──────────┘
```

### Hovering Generate

```text
┌──────────┬──────────┬──────────────┬──────────┬──────────┐
│          │          │              │          │          │
│   Build  │  Reach   │   Generate   │  Convert │   Grow   │
│          │          │     Leads    │          │          │
│          │          │              │          │          │
└──────────┴──────────┴──────────────┴──────────┴──────────┘
                         ↑
                   subtle elevation
```

The Generate card should visually lift upward while the other four cards remain stationary.

---

## 4. Suggested Motion

Use a subtle upward movement.

Recommended starting point:

```css
transform: translateY(-8px);
```

A very subtle scale can be used if it improves the visual result:

```css
transform: translateY(-8px) scale(1.015);
```

Do not use excessive scaling.

The animation should be smooth and premium.

Suggested transition:

```css
transition:
  transform 350ms cubic-bezier(0.22, 1, 0.36, 1),
  box-shadow 350ms ease,
  border-color 350ms ease,
  background-color 350ms ease;
```

Adjust the values after visual testing if necessary.

---

## 5. Important Layout Requirement

The hover effect must **not affect the dimensions of the overall five-card grid**.

Do not use:

- flex expansion
- width changes
- height changes
- grid-column changes
- margin changes
- padding changes that alter layout
- layout-changing positioning

Use `transform` for the elevation effect so the surrounding layout remains stable.

The neighboring cards must not move when one card is hovered.

---

## 6. JLUXE Visual Style

Maintain the existing dark forest-green section.

Use the established JLUXE palette:

```text
Forest Green:
#17382F

Warm Ivory:
#F3EBDD

Muted Brass:
#C6A15B
```

Do not introduce bright or unrelated colors.

On hover, the card may receive:

- subtle brass border/accent
- slightly stronger forest-green background
- soft shadow
- slightly stronger warm-ivory text emphasis

Avoid excessive glow.

The final effect should remain sophisticated rather than flashy.

---

## 7. Suggested Hover Styling

Use a scoped component class.

Example:

```css
.jluxe-solution-card {
  transition:
    transform 350ms cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 350ms ease,
    border-color 350ms ease,
    background-color 350ms ease;
}

.jluxe-solution-card:hover {
  transform: translateY(-8px) scale(1.015);
  border-color: #C6A15B;
  box-shadow: 0 16px 30px rgba(0, 0, 0, 0.18);
}
```

Adjust the values after visual testing.

Do not make the shadow excessively dark or large.

---

## 8. Content Interaction

When the card is hovered:

- The title may shift upward very slightly if visually beneficial.
- The supporting label may become slightly brighter.
- The existing brass indicator/dot may become more prominent.
- Do not introduce large text movement.
- Do not make every content element animate independently.
- Do not create distracting motion.

The primary visual effect should remain the **card elevation**.

---

## 9. Existing CTA

Keep the existing CTA:

```text
See Business Solutions →
```

Do not remove it.

Do not redesign the CTA as part of this change.

The CTA should remain positioned exactly as it is unless a very small spacing adjustment is required to accommodate the hover effect.

---

## 10. Accessibility

The hover interaction must have an equivalent keyboard focus state.

Use `:focus-visible`.

Example:

```css
.jluxe-solution-card:focus-visible {
  transform: translateY(-8px) scale(1.015);
  border-color: #C6A15B;
}
```

Provide a clear visible focus indicator.

Do not make any important information accessible only through mouse hover.

---

## 11. Reduced Motion

Respect:

```css
@media (prefers-reduced-motion: reduce)
```

When reduced motion is enabled:

- remove or significantly reduce the transform animation
- avoid scale/elevation animation
- preserve readability
- preserve the card's functionality

For example:

```css
@media (prefers-reduced-motion: reduce) {
  .jluxe-solution-card {
    transition: none;
  }

  .jluxe-solution-card:hover,
  .jluxe-solution-card:focus-visible {
    transform: none;
  }
}
```

---

## 12. CSS Safety

Do not use generic selectors such as:

```css
.card {}
button {}
p {}
span {}
```

Use scoped JLUXE classes, for example:

```text
.jluxe-solution-card
.jluxe-solution-card__number
.jluxe-solution-card__title
.jluxe-solution-card__label
```

Do not allow this interaction styling to affect unrelated cards elsewhere on the website.

---

## 13. Component Architecture

Before modifying the implementation:

1. Inspect the existing `IntegratedSolutions` component.
2. Inspect the existing solution-card markup.
3. Reuse the existing data.
4. Preserve the existing five-card structure.
5. Add only the required hover/focus interaction.
6. Do not rebuild the section unnecessarily.
7. Do not modify unrelated homepage sections.

---

## 14. Responsive Behavior

The hover effect should work naturally on desktop.

On touch devices where hover is unavailable:

- Do not force a fake hover state.
- Preserve the existing card layout.
- Ensure the cards remain readable and usable.
- Do not create layout shifts.

The mobile experience should remain clean and stable.

---

## 15. Performance

Prefer lightweight CSS transitions.

Do not introduce a new animation library for this interaction.

Prefer:

- CSS `transform`
- CSS transitions
- CSS box-shadow
- existing React/component structure

Avoid JavaScript-driven animation when CSS can achieve the desired effect.

---

## 16. Do Not Change

Do not modify:

- Section heading
- Section description
- Five solution names
- Supporting labels
- Existing CTA
- Section background
- Overall five-column layout
- Existing JLUXE typography
- Existing navigation
- Other homepage sections
- Ecosystem cards
- Hero section
- Footer

Only add the individual card hover/elevation interaction.

---

## 17. Final Goal

Make the five Integrated Business Solutions cards feel interactive rather than static.

The intended interaction is:

```text
Static card
    ↓
Mouse enters
    ↓
Card subtly lifts upward
    ↓
Border/accent becomes slightly stronger
    ↓
Soft elevation shadow appears
    ↓
Content receives subtle emphasis
    ↓
Mouse leaves
    ↓
Card smoothly settles back
```

The final effect should feel:

- premium
- restrained
- architectural
- editorial
- smooth
- intentional

Avoid:

- bouncing
- excessive scaling
- excessive shadows
- neon colors
- glowing effects
- large content movement
- layout shifts
- distracting animations
- generic template styling

The result should look like a refined JLUXE interaction rather than a copied animation component.
