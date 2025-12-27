# SPEC-11 Implementation Plan

**Version**: 1.0.0
**Created**: 2025-12-27
**Status**: Ready for Implementation
**Feature Branch**: `feature/spec-11-adventure-shared-components`

---

## Overview

This plan details the step-by-step implementation of 3 reusable Astro components:

1. **AdventureGettingThere** - Directions with drive stats and Google Maps link
2. **AdventureGearChecklist** - Required/optional gear grid with footer slot
3. **AdventureRelatedShop** - Category cards with hover effects and CTA

All components follow established patterns from AdventureQuickStats (SPEC-10) and integrate with the existing type system in `adventure.ts`.

---

## Prerequisites

Before starting implementation, verify:

- [ ] SPEC-10 AdventureQuickStats.astro is merged and working
- [ ] `wv-wild-web/src/types/adventure.ts` exists with StatIconSchema
- [ ] Feature branch created: `git checkout -b feature/spec-11-adventure-shared-components`
- [ ] Dev server runs without errors: `npm run dev`

---

## Implementation Phases

### Phase 1: Type System Foundation

**Objective**: Extend `adventure.ts` with schemas and types for SPEC-11 components.

**File**: `wv-wild-web/src/types/adventure.ts`

---

#### Task 1.1: Extend StatIconSchema with New Icons

Add `circle` icon for optional gear items to the existing StatIconSchema.

**Location**: After line 139 in `adventure.ts`

**Find this code**:
```typescript
export const StatIconSchema = z.enum([
  'distance',
  'time',
  'calendar',
  'check',
  'info',
  'location',
  'area',
  'none',
]);
```

**Replace with**:
```typescript
export const StatIconSchema = z.enum([
  'distance',
  'time',
  'calendar',
  'check',
  'info',
  'location',
  'area',
  'circle',  // SPEC-11: For optional gear items
  'none',
]);
```

---

#### Task 1.2: Extend STAT_ICON_PATHS with Circle Icon

Add the SVG path for the circle icon.

**Location**: After line 181 in `adventure.ts`

**Find this code**:
```typescript
export const STAT_ICON_PATHS: Record<StatIcon, string | null> = {
  distance:
    'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7',
  time: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
  calendar:
    'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
  check: 'M5 13l4 4L19 7',
  info: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  location:
    'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
  area: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6z',
  none: null,
};
```

**Replace with**:
```typescript
export const STAT_ICON_PATHS: Record<StatIcon, string | null> = {
  distance:
    'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7',
  time: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
  calendar:
    'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
  check: 'M5 13l4 4L19 7',
  info: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  location:
    'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
  area: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6z',
  circle: 'M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z',  // SPEC-11
  none: null,
};
```

---

#### Task 1.3: Add GearItemSchema and GearItem Type

Add the schema and type for gear checklist items.

**Location**: After the STAT_ICON_PATHS block (end of file, before any closing comments)

**Add this code**:
```typescript
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
```

---

#### Task 1.4: Add RelatedCategorySchema and RelatedCategory Type

Add the schema and type for related shop categories.

**Location**: Immediately after GearColumns type

**Add this code**:
```typescript
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
```

---

#### Task 1.5: Verify Type Exports

Ensure all new types are properly exported. The `export` keyword is already on each declaration, so no additional work needed. Verify by running:

```bash
npm run typecheck
```

**Expected result**: No TypeScript errors related to adventure.ts

---

### Phase 2: AdventureGettingThere Component

**Objective**: Create the directions component with drive stats and Google Maps integration.

**File**: `wv-wild-web/src/components/adventure/AdventureGettingThere.astro`

---

#### Task 2.1: Create Component File with Props Interface

Create the file with documentation header and Props interface.

```astro
---
/**
 * AdventureGettingThere.astro
 * SPEC-11: Getting There Component
 *
 * Displays directions from the WVWO shop to an adventure destination with
 * drive time, distance, and optional Google Maps link.
 *
 * @accessibility
 * - Uses semantic section with aria-labelledby
 * - External links open in new tab with rel="noopener noreferrer"
 * - Icons are aria-hidden, info conveyed in text
 * - prefers-reduced-motion respected
 *
 * @example
 * ```astro
 * <AdventureGettingThere
 *   directions="<p>Head south on <strong>US-19</strong>...</p>"
 *   mapLink="https://maps.google.com/?q=destination"
 *   driveTime="25 minutes"
 *   distance="18 miles"
 * >
 *   <p class="text-brand-mud/80 italic">Pro tip: Get there early!</p>
 * </AdventureGettingThere>
 * ```
 */
import { STAT_ICON_PATHS, type StatIcon } from '../../types/adventure';

interface Props {
  /** Section heading (default: "Getting There") */
  title?: string;
  /** Starting location text (default: "From our shop (121 WV-82, Birch River)") */
  fromLocation?: string;
  /** HTML directions content (supports bold, lists) */
  directions: string;
  /** Google Maps URL (optional) */
  mapLink?: string;
  /** Drive time display (e.g., "25 minutes") */
  driveTime?: string;
  /** Distance display (e.g., "18 miles") */
  distance?: string;
  /** Background variant (default: 'white') */
  variant?: 'white' | 'cream';
  /** Enable gentle reveal animation (default: true) */
  animate?: boolean;
}

const {
  title = 'Getting There',
  fromLocation = 'From our shop (121 WV-82, Birch River)',
  directions,
  mapLink,
  driveTime,
  distance,
  variant = 'white',
  animate = true,
} = Astro.props;

// Generate unique ID for aria-labelledby
const sectionId = `adventure-getting-there-${Math.random().toString(36).substring(2, 9)}`;

// Background class based on variant
const bgClass = variant === 'white' ? 'bg-white' : 'bg-brand-cream';

/**
 * Get SVG path for an icon.
 */
function getIconPath(iconName: StatIcon): string | null {
  if (iconName === 'none') return null;
  return STAT_ICON_PATHS[iconName] ?? null;
}

const timeIconPath = getIconPath('time');
const distanceIconPath = getIconPath('distance');
---
```

---

#### Task 2.2: Build Template Structure

Add the HTML template after the frontmatter.

```astro
<section
  class:list={[
    'py-12 md:py-16',
    bgClass,
    animate && 'adventure-getting-there',
  ]}
  aria-labelledby={sectionId}
>
  <div class="container mx-auto px-4">
    <div class="max-w-3xl mx-auto">
      <h2
        id={sectionId}
        class="font-display font-bold text-2xl md:text-3xl text-brand-brown mb-8"
      >
        {title}
      </h2>

      <!-- Directions Card -->
      <div class="bg-brand-cream p-6 rounded-sm border-l-4 border-sign-green mb-6">
        <h3 class="font-bold text-brand-brown mb-2">{fromLocation}</h3>

        <!-- Drive Stats -->
        {(driveTime || distance) && (
          <div class="flex flex-wrap gap-4 mb-4 text-sm text-brand-mud">
            {driveTime && (
              <span class="flex items-center gap-1.5">
                {timeIconPath && (
                  <svg
                    aria-hidden="true"
                    class="w-4 h-4 text-sign-green"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d={timeIconPath} />
                  </svg>
                )}
                {driveTime}
              </span>
            )}
            {distance && (
              <span class="flex items-center gap-1.5">
                {distanceIconPath && (
                  <svg
                    aria-hidden="true"
                    class="w-4 h-4 text-sign-green"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d={distanceIconPath} />
                  </svg>
                )}
                {distance}
              </span>
            )}
          </div>
        )}

        <!-- Directions Content (HTML support) -->
        <div class="text-brand-brown/75 prose prose-sm max-w-none [&_ol]:list-decimal [&_ol]:list-inside [&_ol]:space-y-2 [&_ul]:list-disc [&_ul]:list-inside [&_ul]:space-y-2">
          <Fragment set:html={directions} />
        </div>
      </div>

      <!-- Google Maps Button -->
      {mapLink && (
        <a
          href={mapLink}
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 bg-sign-green text-white font-bold px-5 py-2.5 rounded-sm hover:bg-sign-green/90 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Open in Google Maps
          <span class="sr-only">(opens in new tab)</span>
        </a>
      )}

      <!-- Default Slot for Additional Notes -->
      {Astro.slots.has('default') && (
        <div class="mt-6 pt-4 border-t border-brand-brown/15">
          <slot />
        </div>
      )}
    </div>
  </div>
</section>
```

---

#### Task 2.3: Add Scoped Styles with Animation

Add the style block at the end of the file.

```astro
<style>
  .adventure-getting-there {
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
    .adventure-getting-there {
      animation: none;
    }
  }
</style>
```

---

### Phase 3: AdventureGearChecklist Component

**Objective**: Create the gear checklist component with required/optional distinction and responsive grid.

**File**: `wv-wild-web/src/components/adventure/AdventureGearChecklist.astro`

---

#### Task 3.1: Create Component File with Props Interface

```astro
---
/**
 * AdventureGearChecklist.astro
 * SPEC-11: Gear Checklist Component
 *
 * Displays a responsive grid of gear items with visual distinction between
 * required (checkmark) and optional (circle) items.
 *
 * @accessibility
 * - Uses semantic section with aria-labelledby
 * - ul/li structure for screen readers
 * - Icons are aria-hidden, info conveyed in text
 * - "(optional)" text provides context without relying on color
 * - prefers-reduced-motion respected
 *
 * @example
 * ```astro
 * <AdventureGearChecklist
 *   intro="Don't forget these essentials."
 *   items={[
 *     { name: 'Fishing rod', optional: false },
 *     { name: 'Cooler', optional: true },
 *   ]}
 *   columns={2}
 * >
 *   <a slot="footer" href="/shop" class="btn-primary">Shop Gear</a>
 * </AdventureGearChecklist>
 * ```
 */
import type { GearItem, GearColumns, StatIcon } from '../../types/adventure';
import { STAT_ICON_PATHS } from '../../types/adventure';

interface Props {
  /** Section heading (default: "Gear Checklist") */
  title?: string;
  /** Intro text in Kim's voice (optional) */
  intro?: string;
  /** Array of gear items to display */
  items: GearItem[];
  /** Grid columns on desktop (default: 2) */
  columns?: GearColumns;
  /** Background variant (default: 'cream') */
  variant?: 'white' | 'cream';
  /** Enable gentle reveal animation (default: true) */
  animate?: boolean;
}

const {
  title = 'Gear Checklist',
  intro,
  items,
  columns = 2,
  variant = 'cream',
  animate = true,
} = Astro.props;

// Generate unique ID for aria-labelledby
const sectionId = `adventure-gear-checklist-${Math.random().toString(36).substring(2, 9)}`;

// Background class based on variant
const bgClass = variant === 'white' ? 'bg-white' : 'bg-brand-cream';

// Map columns to Tailwind grid classes
const columnClasses: Record<GearColumns, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
};

/**
 * Get SVG path for an icon.
 */
function getIconPath(iconName: StatIcon): string | null {
  if (iconName === 'none') return null;
  return STAT_ICON_PATHS[iconName] ?? null;
}

const checkIconPath = getIconPath('check');
const circleIconPath = getIconPath('circle');
---
```

---

#### Task 3.2: Build Template Structure

```astro
<section
  class:list={[
    'py-12 md:py-16',
    bgClass,
    animate && 'adventure-gear-checklist',
  ]}
  aria-labelledby={sectionId}
>
  <div class="container mx-auto px-4">
    <div class="max-w-3xl mx-auto">
      <h2
        id={sectionId}
        class="font-display font-bold text-2xl md:text-3xl text-brand-brown mb-4"
      >
        {title}
      </h2>

      {intro && (
        <p class="text-brand-brown/75 mb-8">{intro}</p>
      )}

      {items.length > 0 && (
        <ul class:list={['grid gap-3', columnClasses[columns]]}>
          {items.map((item) => (
            <li class="flex items-center gap-3 bg-white p-4 rounded-sm border border-brand-brown/15">
              {item.optional ? (
                <>
                  {/* Optional item - circle icon */}
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5 text-brand-mud/50 flex-shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d={circleIconPath} />
                  </svg>
                  <span class="text-brand-brown/75">
                    {item.name}
                    <span class="text-brand-mud/60 text-sm ml-1">(optional)</span>
                  </span>
                </>
              ) : (
                <>
                  {/* Required item - checkmark icon */}
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5 text-sign-green flex-shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d={checkIconPath} />
                  </svg>
                  <span class="text-brand-brown">{item.name}</span>
                </>
              )}
            </li>
          ))}
        </ul>
      )}

      {/* Footer Slot for CTA */}
      {Astro.slots.has('footer') && (
        <div class="mt-8 text-center">
          <slot name="footer" />
        </div>
      )}
    </div>
  </div>
</section>
```

---

#### Task 3.3: Add Scoped Styles with Animation

```astro
<style>
  .adventure-gear-checklist {
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
    .adventure-gear-checklist {
      animation: none;
    }
  }
</style>
```

---

### Phase 4: AdventureRelatedShop Component

**Objective**: Create the related shop categories component with hover effects and CTA.

**File**: `wv-wild-web/src/components/adventure/AdventureRelatedShop.astro`

---

#### Task 4.1: Create Component File with Props Interface

```astro
---
/**
 * AdventureRelatedShop.astro
 * SPEC-11: Related Shop Component
 *
 * Displays a grid of shop category cards with hover effects and a main CTA
 * button linking to the shop.
 *
 * @accessibility
 * - Uses semantic section with aria-labelledby
 * - Cards are links with focus-visible states
 * - Hover effects respect prefers-reduced-motion
 * - Internal links only (no external link handling needed)
 *
 * @example
 * ```astro
 * <AdventureRelatedShop
 *   intro="Everything you need for your adventure."
 *   categories={[
 *     { name: 'Fishing Gear', description: 'Rods, reels, tackle', href: '/shop/fishing' },
 *     { name: 'Camping', description: 'Tents, coolers', href: '/shop/camping' },
 *   ]}
 *   ctaText="Browse All Gear"
 * />
 * ```
 */
import type { RelatedCategory } from '../../types/adventure';

interface Props {
  /** Section heading (default: "Shop Related Items") */
  title?: string;
  /** Intro text (default: "Planning a trip? We've got you covered.") */
  intro?: string;
  /** Array of shop categories to display */
  categories: RelatedCategory[];
  /** CTA button text (default: "Visit Our Shop") */
  ctaText?: string;
  /** CTA button href (default: "/shop") */
  ctaHref?: string;
  /** Background variant (default: 'white') */
  variant?: 'white' | 'cream';
  /** Enable gentle reveal animation (default: true) */
  animate?: boolean;
}

const {
  title = 'Shop Related Items',
  intro = "Planning a trip? We've got you covered.",
  categories,
  ctaText = 'Visit Our Shop',
  ctaHref = '/shop',
  variant = 'white',
  animate = true,
} = Astro.props;

// Generate unique ID for aria-labelledby
const sectionId = `adventure-related-shop-${Math.random().toString(36).substring(2, 9)}`;

// Background class based on variant
const bgClass = variant === 'white' ? 'bg-white' : 'bg-brand-cream';

// Determine grid columns based on category count
function getGridClass(count: number): string {
  if (count === 1) return 'grid-cols-1';
  if (count === 2) return 'grid-cols-1 md:grid-cols-2';
  return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
}

const gridClass = getGridClass(categories.length);
---
```

---

#### Task 4.2: Build Template Structure

```astro
<section
  class:list={[
    'py-12 md:py-16',
    bgClass,
    animate && 'adventure-related-shop',
  ]}
  aria-labelledby={sectionId}
>
  <div class="container mx-auto px-4">
    <div class="max-w-3xl mx-auto">
      <h2
        id={sectionId}
        class="font-display font-bold text-2xl md:text-3xl text-brand-brown mb-4"
      >
        {title}
      </h2>

      {intro && (
        <p class="text-brand-brown/75 mb-8">{intro}</p>
      )}

      {categories.length > 0 && (
        <div class:list={['grid gap-4 mb-8', gridClass]}>
          {categories.map((category) => (
            <a
              href={category.href}
              class="related-category-card block bg-brand-cream p-5 rounded-sm border-l-4 border-sign-green hover:border-brand-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"
            >
              <h3 class="font-display font-bold text-lg text-brand-brown mb-1">
                {category.name}
              </h3>
              {category.description && (
                <p class="text-sm text-brand-mud">{category.description}</p>
              )}
            </a>
          ))}
        </div>
      )}

      {/* Main CTA Button */}
      <div class="text-center">
        <a
          href={ctaHref}
          class="inline-flex items-center gap-2 bg-brand-orange text-white font-bold px-6 py-3 rounded-sm hover:bg-brand-orange/90 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"
        >
          {ctaText}
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  </div>
</section>
```

---

#### Task 4.3: Add Scoped Styles with Animation and Hover Effects

```astro
<style>
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

  .related-category-card {
    transition: border-color 0.3s ease, transform 0.3s ease;
  }

  .related-category-card:hover {
    transform: translateY(-2px);
  }

  @media (prefers-reduced-motion: reduce) {
    .adventure-related-shop {
      animation: none;
    }

    .related-category-card {
      transition: none;
    }

    .related-category-card:hover {
      transform: none;
    }
  }
</style>
```

---

### Phase 5: Integration Testing

**Objective**: Verify components work correctly in summersville-lake.astro and prepare for PR.

---

#### Task 5.1: Create Test Integration in summersville-lake.astro

Add imports and test data to verify components work before full migration.

**Add to imports** (around line 8):
```astro
import AdventureGettingThere from '../../components/adventure/AdventureGettingThere.astro';
import AdventureGearChecklist from '../../components/adventure/AdventureGearChecklist.astro';
import AdventureRelatedShop from '../../components/adventure/AdventureRelatedShop.astro';
import type { GearItem, RelatedCategory } from '../../types/adventure';
```

**Add test data** (after existing data, around line 55):
```astro
// SPEC-11: Gear checklist data
const summersvilleGear: GearItem[] = [
  { name: 'WV fishing license', optional: false },
  { name: 'Light line (clear water needs finesse)', optional: false },
  { name: 'Tube jigs, soft plastics', optional: false },
  { name: 'Drop shot rigs', optional: false },
  { name: 'Snorkel gear', optional: true },
  { name: 'Water shoes', optional: true },
  { name: 'Sunscreen and towels', optional: false },
  { name: 'Cooler and drinks', optional: true },
];

// SPEC-11: Related shop categories
const summersvilleCategories: RelatedCategory[] = [
  { name: 'Fishing Gear', description: 'Rods, reels, line, and tackle', href: '/shop/fishing' },
  { name: 'Camping Supplies', description: 'Tents, coolers, and camp gear', href: '/shop/camping' },
  { name: 'Water Sports', description: 'Snorkels, water shoes, floats', href: '/shop/water-sports' },
];
```

---

#### Task 5.2: Replace Hardcoded Sections

Replace the hardcoded "Getting There" section (lines 421-454) with the component:

```astro
<!-- Getting There (SPEC-11) -->
<AdventureGettingThere
  directions="<ol class='list-decimal list-inside space-y-2'><li>Head south on US-19 from Birch River</li><li>Continue through Summersville (~40 miles)</li><li>Turn right on WV-129 toward the lake</li><li>Follow signs to Battle Run or your destination</li></ol>"
  mapLink="https://maps.google.com/?q=Summersville+Lake+Battle+Run+WV"
  driveTime="30 minutes"
  distance="40 miles"
>
  <p class="text-brand-mud/80 italic">
    <strong>Pro tip:</strong> Stop by our shop on US-19 before heading to the lake. We'll get you set up with tackle, bait, and local tips.
  </p>
</AdventureGettingThere>
```

Replace the hardcoded "What to Bring" section (lines 456-539) with the component:

```astro
<!-- Gear Checklist (SPEC-11) -->
<AdventureGearChecklist
  title="What to Bring"
  intro="We've got most of this in stock. Stop by before you head out."
  items={summersvilleGear}
  columns={2}
  variant="cream"
>
  <a
    slot="footer"
    href="/shop"
    class="inline-flex items-center gap-2 bg-sign-green text-white font-bold px-6 py-3 rounded-sm hover:bg-sign-green/90 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
  >
    Browse Our Gear
  </a>
</AdventureGearChecklist>
```

Add the Related Shop component (new section after Gear Checklist):

```astro
<!-- Related Shop (SPEC-11) -->
<AdventureRelatedShop
  title="Shop for Your Trip"
  intro="Everything you need for a great day at Summersville Lake."
  categories={summersvilleCategories}
  ctaText="Visit Our Shop"
  ctaHref="/shop"
  variant="white"
/>
```

---

#### Task 5.3: Visual Testing Checklist

Test each viewport and scenario:

**Viewports:**
- [ ] Mobile (375px width)
- [ ] Tablet (768px width)
- [ ] Desktop (1280px width)

**Components:**
- [ ] AdventureGettingThere renders correctly
  - [ ] Directions HTML renders (bold, lists)
  - [ ] Drive time and distance show with icons
  - [ ] Google Maps button works (opens new tab)
  - [ ] Slot content appears below directions
- [ ] AdventureGearChecklist renders correctly
  - [ ] Required items show green checkmark
  - [ ] Optional items show gray circle + "(optional)" text
  - [ ] Grid responds to viewport (1 col mobile, 2 col desktop)
  - [ ] Footer slot renders CTA button
- [ ] AdventureRelatedShop renders correctly
  - [ ] Category cards display with border-left accent
  - [ ] Hover effect changes border color to orange
  - [ ] Hover effect adds subtle lift (translateY)
  - [ ] Main CTA button renders at bottom

**Accessibility:**
- [ ] Tab navigation works through all interactive elements
- [ ] Focus states visible on buttons and links
- [ ] Screen reader testing (check aria-labelledby works)

**Reduced Motion:**
- [ ] Enable reduced motion in OS settings
- [ ] Verify animations are disabled
- [ ] Verify hover transforms are disabled

---

#### Task 5.4: Accessibility Audit

Run axe-core or similar tool. Verify:

- [ ] No WCAG 2.1 AA violations
- [ ] Color contrast passes (4.5:1 for text)
- [ ] All interactive elements are keyboard accessible
- [ ] No empty buttons or links

---

## PR Checkpoints

### PR #1: Type System Update (Optional - can merge with components)

**Scope**: Phase 1 only (adventure.ts changes)

**Files Changed**:
- `wv-wild-web/src/types/adventure.ts`

**Checklist**:
- [ ] StatIconSchema extended with 'circle'
- [ ] STAT_ICON_PATHS extended with circle path
- [ ] GearItemSchema + GearItem type added
- [ ] GearColumns type added
- [ ] RelatedCategorySchema + RelatedCategory type added
- [ ] `npm run typecheck` passes
- [ ] `npm run build` passes

---

### PR #2: SPEC-11 Components (Main PR)

**Scope**: Phases 1-5 (all changes)

**Files Changed**:
- `wv-wild-web/src/types/adventure.ts`
- `wv-wild-web/src/components/adventure/AdventureGettingThere.astro` (NEW)
- `wv-wild-web/src/components/adventure/AdventureGearChecklist.astro` (NEW)
- `wv-wild-web/src/components/adventure/AdventureRelatedShop.astro` (NEW)
- `wv-wild-web/src/pages/near/summersville-lake.astro` (integration example)

**Checklist**:
- [ ] All type additions complete
- [ ] All 3 components created
- [ ] Components follow AdventureQuickStats patterns
- [ ] WVWO aesthetic compliance (rounded-sm only, brand colors, correct fonts)
- [ ] Slots working (default for GettingThere, footer for GearChecklist)
- [ ] prefers-reduced-motion respected
- [ ] Accessibility audit passed
- [ ] Integration example in summersville-lake.astro
- [ ] `npm run build` passes
- [ ] Visual regression tests pass

---

## Risk Mitigation

### Risk 1: Type Import Errors

**Symptoms**: TypeScript errors when importing GearItem or RelatedCategory

**Mitigation**:
1. Verify exports in adventure.ts
2. Check import path is correct (`../../types/adventure`)
3. Run `npm run typecheck` to catch errors early

### Risk 2: Icon Not Rendering

**Symptoms**: Icons don't appear in components

**Mitigation**:
1. Verify 'circle' is added to StatIconSchema
2. Verify STAT_ICON_PATHS has the circle path
3. Check SVG viewBox matches (24x24)
4. Verify stroke/fill settings match icon type

### Risk 3: Animation Jank

**Symptoms**: Animation stutters or causes layout shift

**Mitigation**:
1. Use `transform` and `opacity` only (GPU-accelerated)
2. Add `will-change: transform, opacity` if needed
3. Test with Performance tab in DevTools

### Risk 4: Slot Content Not Appearing

**Symptoms**: Slot content passed but not rendered

**Mitigation**:
1. Verify `Astro.slots.has()` check is correct
2. Verify slot name matches (e.g., `slot="footer"`)
3. Check for typos in slot name

### Risk 5: WVWO Aesthetic Violations

**Symptoms**: PR rejected for styling issues

**Mitigation**:
1. Self-review against checklist before PR
2. Search file for forbidden patterns (rounded-md, Inter, purple, etc.)
3. Verify fonts: font-display for headings, font-body for content

---

## Acceptance Checklist

### Components Created
- [ ] `wv-wild-web/src/components/adventure/AdventureGettingThere.astro`
- [ ] `wv-wild-web/src/components/adventure/AdventureGearChecklist.astro`
- [ ] `wv-wild-web/src/components/adventure/AdventureRelatedShop.astro`

### Types Added
- [ ] `GearItemSchema` + `GearItem` type
- [ ] `RelatedCategorySchema` + `RelatedCategory` type
- [ ] `GearColumns` type (1 | 2 | 3)
- [ ] `circle` added to StatIconSchema
- [ ] Circle path added to STAT_ICON_PATHS

### Slot Composition
- [ ] GettingThere: default slot renders notes/pro-tips
- [ ] GearChecklist: "footer" named slot renders CTA

### WVWO Styling
- [ ] `rounded-sm` ONLY (no rounded-md/lg)
- [ ] Brand colors only (brand-brown, sign-green, brand-cream, brand-mud, brand-orange)
- [ ] font-display for headings
- [ ] font-body for content
- [ ] transition-colors duration-300

### Accessibility
- [ ] aria-labelledby on all sections
- [ ] aria-hidden="true" on decorative icons
- [ ] External links: target="_blank" rel="noopener noreferrer"
- [ ] Focus-visible states on interactive elements
- [ ] prefers-reduced-motion respected

### Integration
- [ ] Components work in summersville-lake.astro
- [ ] Build passes without errors
- [ ] Visual testing across breakpoints complete

---

## Quick Reference: File Locations

| File | Purpose |
|------|---------|
| `wv-wild-web/src/types/adventure.ts` | Type definitions (extend) |
| `wv-wild-web/src/components/adventure/AdventureGettingThere.astro` | New component |
| `wv-wild-web/src/components/adventure/AdventureGearChecklist.astro` | New component |
| `wv-wild-web/src/components/adventure/AdventureRelatedShop.astro` | New component |
| `wv-wild-web/src/components/adventure/AdventureQuickStats.astro` | Pattern reference |
| `wv-wild-web/src/pages/near/summersville-lake.astro` | Integration target |

---

## References

- [spec.md](./spec.md) - Full requirements specification
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Architecture decisions
- [AdventureQuickStats.astro](../../../../wv-wild-web/src/components/adventure/AdventureQuickStats.astro) - Pattern reference
- [adventure.ts](../../../../wv-wild-web/src/types/adventure.ts) - Type definitions
