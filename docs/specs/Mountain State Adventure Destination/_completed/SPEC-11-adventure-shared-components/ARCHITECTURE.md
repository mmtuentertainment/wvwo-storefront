# SPEC-11: Adventure Shared Components - Architecture Document

**Version**: 1.0.0
**Created**: 2025-12-27
**Status**: Approved
**Author**: Queen Architect

---

## Executive Summary

This document defines the unified architecture for 3 Astro components that share common patterns:

1. **AdventureGettingThere** - Directions with drive stats and map link
2. **AdventureGearChecklist** - Required/optional gear grid with footer slot
3. **AdventureRelatedShop** - Category cards with hover effects and CTA

All components follow established patterns from SPEC-09 (AdventureHero) and SPEC-10 (AdventureQuickStats).

---

## Component Hierarchy Diagram

```
wv-wild-web/src/
+-- types/
|   +-- adventure.ts              # EXTENDED: Add GearItem, RelatedCategory schemas
|
+-- components/adventure/
|   +-- AdventureHero.astro       # SPEC-09 (existing)
|   +-- AdventureHeroBadge.astro  # SPEC-09 (existing)
|   +-- AdventureQuickStats.astro # SPEC-10 (existing)
|   +-- AdventureGettingThere.astro    # NEW (SPEC-11)
|   +-- AdventureGearChecklist.astro   # NEW (SPEC-11)
|   +-- AdventureRelatedShop.astro     # NEW (SPEC-11)
|
+-- styles/
|   +-- adventure-hero.css        # EXISTING: Shared animation keyframes
|   +-- adventure-shared.css      # NEW: Shared styles for SPEC-11 components
|
+-- pages/near/
    +-- summersville-lake.astro   # REFACTOR: Replace hardcoded sections
```

### Component Relationships

```
                    +-------------------+
                    |   adventure.ts    |
                    |   (Type System)   |
                    +--------+----------+
                             |
         +-------------------+-------------------+
         |                   |                   |
+--------v--------+ +--------v--------+ +--------v--------+
| GettingThere    | | GearChecklist   | | RelatedShop     |
| - directions    | | - items[]       | | - categories[]  |
| - driveTime     | | - columns       | | - ctaText       |
| - mapLink       | | - footer slot   | | - hover effects |
+-----------------+ +-----------------+ +-----------------+
         |                   |                   |
         +-------------------+-------------------+
                             |
                    +--------v--------+
                    | Shared Patterns |
                    | - Icons (reuse) |
                    | - Animation     |
                    | - Accessibility |
                    +------------------+
```

---

## Data Flow

### 1. Type Definitions Flow

```
Zod Schema (adventure.ts)
         |
         v
TypeScript Type (inferred)
         |
         v
Component Props (interface)
         |
         v
Runtime Validation (optional)
```

### 2. Props Flow Per Component

**AdventureGettingThere:**
```
Props: { title?, fromLocation?, directions, mapLink?, driveTime?, distance? }
                                    |
                                    v
                    +---------------+---------------+
                    |                               |
              set:html(directions)           Icon Lookup (time, distance)
                    |                               |
                    v                               v
              Fragment render              STAT_ICON_PATHS reuse
```

**AdventureGearChecklist:**
```
Props: { title?, intro?, items[], columns? }
                    |
                    v
              items.map((item) =>
                    |
        +-----------+-----------+
        |                       |
   item.optional?          Icon Lookup
        |                       |
        v                       v
   Circle icon           Checkmark icon (sign-green)
   + "(optional)"        STAT_ICON_PATHS.check
```

**AdventureRelatedShop:**
```
Props: { title?, intro?, categories[], ctaText?, ctaHref? }
                    |
                    v
              categories.map((cat) =>
                    |
        +-----------+-----------+
        |                       |
   cat.description?        cat.href (internal)
        |                       |
        v                       v
   Optional render         startsWith('/') validation
```

---

## Shared Patterns to Extract

### 1. Icon System (Reuse from SPEC-10)

All 3 components reuse `STAT_ICON_PATHS` from `adventure.ts`. No new icon map needed.

**Icons to Add to STAT_ICON_PATHS:**
```typescript
// Add to existing STAT_ICON_PATHS in adventure.ts
circle: 'M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z',
car: 'M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99z',
externalLink: 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3',
```

**Icon Rendering Helper:**
```typescript
// Shared helper function in each component
function getIconPath(iconName: StatIcon | undefined): string | null {
  if (!iconName || iconName === 'none') return null;
  return STAT_ICON_PATHS[iconName] ?? null;
}
```

### 2. Animation Pattern (Reuse from SPEC-09)

**Shared CSS Class:**
```css
/* adventure-shared.css - import adventure-hero.css keyframes */
@import './adventure-hero.css';

.adventure-section {
  animation: morning-mist-lift 0.6s ease-out both;
}

@media (prefers-reduced-motion: reduce) {
  .adventure-section {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
```

**Alternative: Reuse gentle-reveal from AdventureQuickStats**

Each component uses its own scoped `<style>` block with `gentle-reveal` keyframes:
```css
.adventure-getting-there {
  animation: gentle-reveal 0.6s ease-out both;
}

@keyframes gentle-reveal {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (prefers-reduced-motion: reduce) {
  .adventure-getting-there { animation: none; }
}
```

**Decision**: Use scoped styles per component (matches AdventureQuickStats pattern) rather than shared CSS file. Keeps components self-contained.

### 3. Section Container Pattern

All 3 components follow the same container structure:
```astro
<section
  class:list={[
    'py-12 md:py-16',
    bgClass,
    animate && 'adventure-[component-name]'
  ]}
  aria-labelledby={sectionId}
>
  <div class="container mx-auto px-4">
    <div class="max-w-3xl mx-auto">
      <!-- Content -->
    </div>
  </div>
</section>
```

### 4. Accessibility Pattern

All components implement:
- `aria-labelledby` pointing to h2 heading
- `sr-only` text for icon-only elements
- External links: `target="_blank" rel="noopener noreferrer"`
- `aria-hidden="true"` on decorative icons
- Focus-visible states on interactive elements

### 5. WVWO Styling Compliance

Enforced across all components:
```
Allowed:
- rounded-sm ONLY
- border-l-4 (left accent pattern)
- brand-brown, sign-green, brand-cream, brand-mud, brand-orange
- font-display for headings
- font-body for content
- transition-colors duration-300

Forbidden:
- rounded-md, rounded-lg, rounded-xl
- backdrop-blur, glassmorphism
- Purple, pink, neon colors
- Inter, Poppins, DM Sans fonts
```

---

## Integration Points with adventure.ts

### Types to Add

```typescript
// ============================================================================
// SPEC-11: SHARED COMPONENT SCHEMAS
// ============================================================================

/**
 * Gear item for AdventureGearChecklist component.
 */
export const GearItemSchema = z.object({
  name: z.string().min(1),
  optional: z.boolean().default(false),
  icon: StatIconSchema.optional(),
});

export type GearItem = z.infer<typeof GearItemSchema>;

/** Column count for gear grid */
export type GearColumns = 1 | 2 | 3;

/**
 * Related shop category for AdventureRelatedShop component.
 */
export const RelatedCategorySchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  href: z.string().startsWith('/'),
  icon: StatIconSchema.optional(),
});

export type RelatedCategory = z.infer<typeof RelatedCategorySchema>;
```

### Extended StatIcon Enum

```typescript
// Add new icons to existing StatIconSchema
export const StatIconSchema = z.enum([
  'distance',
  'time',
  'calendar',
  'check',
  'info',
  'location',
  'area',
  'circle',    // NEW: Optional items
  'car',       // NEW: Drive time (already in Badge, add to map)
  'none',
]);
```

### Extended STAT_ICON_PATHS

```typescript
export const STAT_ICON_PATHS: Record<StatIcon, string | null> = {
  // ... existing paths ...
  circle: 'M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z',
  car: 'M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z',
  none: null,
};
```

---

## Slot Composition Strategy

### AdventureGettingThere

```astro
<!-- Single default slot for pro-tips/notes -->
<AdventureGettingThere directions="..." driveTime="25 min" distance="18 miles">
  <p class="text-brand-mud/80 mt-4 italic">
    <strong>Pro tip:</strong> Get there early on summer weekends.
  </p>
</AdventureGettingThere>
```

**Slot Implementation:**
```astro
{Astro.slots.has('default') && (
  <div class="mt-6 pt-4 border-t border-brand-brown/15">
    <slot />
  </div>
)}
```

### AdventureGearChecklist

```astro
<!-- Named "footer" slot for CTA -->
<AdventureGearChecklist items={gearList} columns={2}>
  <a slot="footer" href="/shop/fishing" class="btn-primary">
    Shop Fishing Gear
  </a>
</AdventureGearChecklist>
```

**Slot Implementation:**
```astro
{Astro.slots.has('footer') && (
  <div class="mt-8 text-center">
    <slot name="footer" />
  </div>
)}
```

### AdventureRelatedShop

No slots - fully prop-driven with default CTA.

---

## Animation/Transition Patterns

### Entry Animation (Per Component)

Each component uses scoped CSS matching AdventureQuickStats:

```css
/* Scoped to component */
.adventure-getting-there,
.adventure-gear-checklist,
.adventure-related-shop {
  animation: gentle-reveal 0.6s ease-out both;
}

@keyframes gentle-reveal {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .adventure-getting-there,
  .adventure-gear-checklist,
  .adventure-related-shop {
    animation: none;
  }
}
```

### Hover Transitions

**AdventureRelatedShop Cards:**
```css
.related-category-card {
  transition: border-color 0.3s ease, transform 0.3s ease;
}

.related-category-card:hover {
  border-left-color: var(--brand-orange);
  transform: translateY(-2px);
}

@media (prefers-reduced-motion: reduce) {
  .related-category-card {
    transition: none;
  }
  .related-category-card:hover {
    transform: none;
  }
}
```

### Focus States

All interactive elements use:
```css
.interactive-element:focus-visible {
  outline: 2px solid var(--brand-orange);
  outline-offset: 2px;
}
```

---

## Grid Layout Patterns

### Responsive Column Mapping

**AdventureGearChecklist:**
```typescript
const columnClasses: Record<GearColumns, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
};
```

**AdventureRelatedShop:**
```astro
<!-- Auto-responsive based on category count -->
<div class:list={[
  'grid gap-4',
  categories.length === 1 && 'grid-cols-1',
  categories.length === 2 && 'grid-cols-1 md:grid-cols-2',
  categories.length >= 3 && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
]}>
```

---

## Component Implementation Guidelines

### File Structure per Component

```astro
---
/**
 * Component Name
 * SPEC-11: Description
 *
 * @accessibility
 * - List accessibility features
 *
 * @example
 * Usage example
 */
import type { TypeName } from '../../types/adventure';
import { STAT_ICON_PATHS } from '../../types/adventure';

interface Props {
  // Props definition
}

const {
  propName = 'default',
} = Astro.props;

// Helper functions
function getIconPath(/* ... */) { /* ... */ }

// Derived values
const sectionId = `adventure-component-${/* unique id */}`;
---

<section
  class:list={[/* classes */]}
  aria-labelledby={sectionId}
>
  <!-- Content -->
</section>

<style>
  /* Scoped styles with animation and reduced-motion */
</style>
```

### Prop Defaults

| Component | Prop | Default Value |
|-----------|------|---------------|
| GettingThere | title | "Getting There" |
| GettingThere | fromLocation | "From our shop (121 WV-82, Birch River)" |
| GearChecklist | title | "Gear Checklist" |
| GearChecklist | columns | 2 |
| RelatedShop | title | "Shop Related Items" |
| RelatedShop | intro | "Planning a trip? We've got you covered." |
| RelatedShop | ctaText | "Visit Our Shop" |
| RelatedShop | ctaHref | "/shop" |

---

## Testing Strategy

### Unit Test Coverage

Each component requires tests for:
1. Renders with required props only
2. Renders with all optional props
3. Slot content appears correctly
4. Icons render for items with icon prop
5. External links have correct attributes
6. Empty states handled gracefully

### Visual Regression Points

1. Mobile viewport (375px)
2. Tablet viewport (768px)
3. Desktop viewport (1280px)
4. Reduced motion enabled
5. High contrast mode
6. Print preview

### Accessibility Audit

- axe-core integration tests
- Keyboard navigation verification
- Screen reader testing (VoiceOver, NVDA)

---

## Migration Path

### summersville-lake.astro Refactor

**Before (hardcoded):**
```astro
<!-- Getting There -->
<section class="py-12 md:py-16 bg-white">
  <div class="container mx-auto px-4">
    <div class="max-w-3xl mx-auto">
      <h2 class="font-display font-bold text-2xl md:text-3xl text-brand-brown mb-8">
        Getting There
      </h2>
      <div class="bg-brand-cream p-6 rounded-sm border-l-4 border-sign-green mb-6">
        ...
      </div>
    </div>
  </div>
</section>
```

**After (component):**
```astro
<AdventureGettingThere
  directions="<p>Head south on <strong>US-19 South</strong>...</p>"
  mapLink="https://maps.google.com/?q=Summersville+Lake+WV"
  driveTime="30 minutes"
  distance="40 miles"
>
  <p class="text-brand-mud/80 italic">
    <strong>Pro tip:</strong> Stop by the shop on US-19 before heading to the lake.
  </p>
</AdventureGettingThere>
```

---

## Decision Log

| Decision | Rationale | Date |
|----------|-----------|------|
| Scoped styles per component | Matches AdventureQuickStats pattern, keeps components self-contained | 2025-12-27 |
| Reuse STAT_ICON_PATHS | Avoid duplication, consistent icon system | 2025-12-27 |
| No shared CSS file | Component isolation preferred for Astro islands | 2025-12-27 |
| Named slot for GearChecklist footer | More explicit than default, supports multiple CTAs | 2025-12-27 |
| Default slot for GettingThere notes | Simple pattern for single content block | 2025-12-27 |
| No slots for RelatedShop | Fully prop-driven, simpler API | 2025-12-27 |

---

## Appendix: Full Type Additions

```typescript
// Add to wv-wild-web/src/types/adventure.ts

// ============================================================================
// SPEC-11: SHARED COMPONENT SCHEMAS
// ============================================================================

/**
 * Gear item for AdventureGearChecklist component.
 * Represents a single piece of recommended gear.
 */
export const GearItemSchema = z.object({
  /** Gear item name (e.g., "Fishing rod & tackle") */
  name: z.string().min(1),
  /** True if item is optional (default: false = required) */
  optional: z.boolean().default(false),
  /** Optional predefined icon name */
  icon: StatIconSchema.optional(),
});

export type GearItem = z.infer<typeof GearItemSchema>;

/** Column count options for AdventureGearChecklist grid */
export type GearColumns = 1 | 2 | 3;

/**
 * Related shop category for AdventureRelatedShop component.
 * Links to shop category pages.
 */
export const RelatedCategorySchema = z.object({
  /** Category name (e.g., "Fishing Gear") */
  name: z.string().min(1),
  /** Brief description (optional) */
  description: z.string().optional(),
  /** Link to category page (e.g., "/shop/fishing") */
  href: z.string().startsWith('/'),
  /** Optional predefined icon name */
  icon: StatIconSchema.optional(),
});

export type RelatedCategory = z.infer<typeof RelatedCategorySchema>;

// Update StatIconSchema to include new icons
export const StatIconSchema = z.enum([
  'distance',
  'time',
  'calendar',
  'check',
  'info',
  'location',
  'area',
  'circle',  // NEW: For optional gear items
  'none',
]);

// Add to STAT_ICON_PATHS
export const STAT_ICON_PATHS: Record<StatIcon, string | null> = {
  // ... existing entries ...
  circle: 'M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z',
  none: null,
};
```

---

## References

- [SPEC-09: AdventureHero](../../../wv-wild-web/src/components/adventure/AdventureHero.astro)
- [SPEC-10: AdventureQuickStats](../../../wv-wild-web/src/components/adventure/AdventureQuickStats.astro)
- [adventure.ts types](../../../wv-wild-web/src/types/adventure.ts)
- [spec.md](./spec.md) - Full requirements specification
