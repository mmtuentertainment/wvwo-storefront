# SPEC-12: Test-Driven Development Strategy

**Created**: 2025-12-27
**Purpose**: TDD execution plan with test-first sequencing for all 42 tasks
**Methodology**: Red-Green-Refactor with parallel execution
**Quality Target**: 94+ PR score (matching SPEC-10/11)

---

## Executive Summary

**TDD Philosophy**: Write tests BEFORE implementation to define expected behavior, catch regressions early, and ensure 100% coverage of critical paths.

**Parallel Execution Model**:

- 4 component developers write tests + components concurrently
- 2 test engineers write integration tests while components being built
- Continuous test execution (not batch at end)

**Quality Gates**:

- No component merged without unit tests
- No page created without E2E tests
- No PR submitted without accessibility tests
- Zero test failures at any phase

**Metrics Target**:

- 43+ unit tests (schema validation)
- 35+ E2E tests (component rendering)
- Zero axe-core violations (WCAG 2.1 AA)
- 20+ visual regression snapshots
- 94+ PR review score

---

## Phase Structure Overview

### Phase 1: Schema Foundation (Red-Green-Refactor)

**Duration**: 2 days
**Test-First Tasks**: T-004 → T-001, T-005 → T-002
**Quality Gate**: 15+ schema tests passing before any frontmatter written

### Phase 2: Component Development (Parallel TDD)

**Duration**: 4 days
**Test-First Tasks**: T-009/T-010/T-011/T-012 → T-006/T-007/T-008
**Quality Gate**: 28+ component unit tests passing before integration

### Phase 3: Integration Testing (E2E First)

**Duration**: 3 days
**Test-First Tasks**: T-015/T-016 → T-013/T-014
**Quality Gate**: 35+ E2E scenarios passing before page templates written

### Phase 4: Accessibility & Polish (Zero Violations)

**Duration**: 2 days
**Test-First Tasks**: T-019/T-020 → T-017/T-018
**Quality Gate**: 100% axe-core compliance before final QA

### Phase 5: Content & Deployment (Validation First)

**Duration**: 3 days
**Test-First Tasks**: T-022 → T-021, T-024 → T-023
**Quality Gate**: 5 WMA pages passing all tests before PR submission

---

## Detailed Task Breakdown (42 Tasks)

### Phase 1: Schema Foundation (T-001 to T-005)

#### T-004: SCHEMA TESTS (Red Phase) - **START HERE**

**Owner**: Test Engineer 1
**Duration**: 4 hours
**Depends On**: None (first task)

**Test File**: `wv-wild-web/src/content/adventures/adventures.test.ts`

**Test Coverage** (15 tests):

```typescript
import { describe, it, expect } from 'vitest';
import { z } from 'astro/zod';
import { SpeciesSchema, FishingWaterSchema, FacilitySchema } from '../content.config';

describe('WMA Schema Validation', () => {
  describe('SpeciesSchema', () => {
    it('should accept valid species object', () => {
      const valid = {
        name: 'White-tailed Deer',
        season: 'Nov 13 - Dec 31',
        notes: 'Prime ridge hunting',
      };
      expect(() => SpeciesSchema.parse(valid)).not.toThrow();
    });

    it('should reject species without name', () => {
      const invalid = { season: 'Nov 13 - Dec 31' };
      expect(() => SpeciesSchema.parse(invalid)).toThrow('name');
    });

    it('should reject species without season', () => {
      const invalid = { name: 'White-tailed Deer' };
      expect(() => SpeciesSchema.parse(invalid)).toThrow('season');
    });

    it('should accept species without notes (optional)', () => {
      const valid = {
        name: 'Wild Turkey',
        season: 'Apr 15 - May 15',
      };
      expect(() => SpeciesSchema.parse(valid)).not.toThrow();
    });
  });

  describe('FishingWaterSchema', () => {
    it('should accept valid fishing water object', () => {
      const valid = {
        name: 'Elk River',
        species: ['Smallmouth Bass', 'Muskie'],
        access: 'Multiple boat ramps',
      };
      expect(() => FishingWaterSchema.parse(valid)).not.toThrow();
    });

    it('should reject empty species array', () => {
      const invalid = {
        name: 'Elk River',
        species: [],
        access: 'Multiple boat ramps',
      };
      expect(() => FishingWaterSchema.parse(invalid)).toThrow('species');
    });

    it('should reject fishing water without access', () => {
      const invalid = {
        name: 'Elk River',
        species: ['Bass'],
      };
      expect(() => FishingWaterSchema.parse(invalid)).toThrow('access');
    });
  });

  describe('FacilitySchema', () => {
    it('should accept facility with count', () => {
      const valid = {
        type: 'Parking',
        count: 3,
        description: 'Main gate parking',
      };
      expect(() => FacilitySchema.parse(valid)).not.toThrow();
    });

    it('should accept facility without count (optional)', () => {
      const valid = {
        type: 'Restrooms',
        description: 'Seasonal restrooms',
      };
      expect(() => FacilitySchema.parse(valid)).not.toThrow();
    });

    it('should reject negative facility count', () => {
      const invalid = {
        type: 'Parking',
        count: -1,
        description: 'Invalid count',
      };
      expect(() => FacilitySchema.parse(invalid)).toThrow('positive');
    });
  });

  describe('Backward Compatibility', () => {
    it('should parse existing adventure without WMA fields', () => {
      const existingAdventure = {
        title: 'Seneca Rocks Trail',
        description: 'Climbing destination',
        season: ['spring', 'summer'],
        difficulty: 'moderate',
        location: 'Seneca Rocks',
      };
      // Should not throw when WMA fields are undefined
      expect(() => adventuresSchema.parse(existingAdventure)).not.toThrow();
    });

    it('should parse WMA adventure with all fields', () => {
      const wmaAdventure = {
        title: 'Elk River WMA',
        description: 'Hunting and fishing',
        season: ['fall'],
        difficulty: 'moderate',
        location: 'Elk River',
        wma_acreage: 104000,
        wma_county: 'Braxton',
        wma_species: [{ name: 'Deer', season: 'Nov 13 - Dec 31' }],
      };
      expect(() => adventuresSchema.parse(wmaAdventure)).not.toThrow();
    });
  });

  describe('Edge Cases', () => {
    it('should reject acreage as string', () => {
      const invalid = { wma_acreage: '104000' };
      expect(() => z.number().parse(invalid.wma_acreage)).toThrow('number');
    });

    it('should reject GPS coordinates outside WV bounds', () => {
      // WV bounds: 37.2-40.6°N, 77.7-82.6°W
      const invalidLat = { lat: 50.0, lng: -80.0 };
      expect(() => CoordinatesSchema.parse(invalidLat)).toThrow('latitude');
    });

    it('should sanitize HTML in species notes', () => {
      const xssAttempt = {
        name: 'Deer',
        season: 'Fall',
        notes: '<script>alert("xss")</script>',
      };
      const parsed = SpeciesSchema.parse(xssAttempt);
      // Astro auto-escapes, but test schema accepts raw string
      expect(parsed.notes).toBe('<script>alert("xss")</script>');
    });
  });
});
```

**Exit Criteria**:

- All 15 tests FAIL (Red phase)
- Test file committed to Git
- CI/CD runs tests automatically

---

#### T-001: SCHEMA IMPLEMENTATION (Green Phase) - **AFTER T-004**

**Owner**: Backend Developer
**Duration**: 6 hours
**Depends On**: T-004 (tests must exist first)

**File**: `wv-wild-web/src/content.config.ts`

**Implementation Strategy**:

```typescript
import { defineCollection, z } from 'astro:content';

// ============================================================================
// SPEC-12: WMA SCHEMA EXTENSIONS
// ============================================================================

/**
 * Huntable species for WMA pages.
 * @see SPEC-12 FR-009
 */
export const SpeciesSchema = z.object({
  name: z.string().min(1, 'Species name required'),
  season: z.string().min(1, 'Season dates required'),
  notes: z.string().optional(),
  regulationUrl: z.string().url().optional(),
});

/**
 * Fishing water body for WMA pages.
 * @see SPEC-12 FR-010
 */
export const FishingWaterSchema = z.object({
  name: z.string().min(1, 'Water body name required'),
  species: z.array(z.string().min(1)).min(1, 'At least one species required'),
  access: z.string().min(1, 'Access description required'),
  notes: z.string().optional(),
});

/**
 * WMA facility (parking, boat ramps, camping).
 * @see SPEC-12 FR-011
 */
export const FacilitySchema = z.object({
  type: z.string().min(1, 'Facility type required'),
  count: z.number().int().positive().optional(),
  description: z.string().min(1, 'Description required'),
  contact: z.string().optional(),
  link: z.string().url().optional(),
  accessibility: z.string().optional(),
});

/**
 * WMA access point (gates, trailheads).
 * @see SPEC-12 FR-012
 */
export const AccessPointSchema = z.object({
  name: z.string().min(1, 'Access point name required'),
  coords: z.string().optional(), // GPS coordinates as string
  features: z.array(z.string().min(1)),
  mapLink: z.string().url().optional(),
});

/**
 * WMA regulations and restrictions.
 * @see SPEC-12 FR-013
 */
export const RegulationsSchema = z.object({
  zone: z.string().optional(),
  restrictions: z.array(z.string().min(1)),
  regulationsUrl: z.string().url().optional(),
});

/**
 * Seasonal hunting/fishing highlight.
 * @see SPEC-12 FR-014
 */
export const SeasonHighlightSchema = z.object({
  season: z.string().min(1, 'Season name required'),
  target: z.string().min(1, 'Target species required'),
  tips: z.string().min(1, 'Tips required'),
});

/**
 * GPS coordinates with WV bounds validation.
 */
const CoordinatesSchema = z.object({
  lat: z.number()
    .min(37.2, 'Latitude must be within West Virginia bounds (37.2°N minimum)')
    .max(40.6, 'Latitude must be within West Virginia bounds (40.6°N maximum)'),
  lng: z.number()
    .min(-82.6, 'Longitude must be within West Virginia bounds (82.6°W minimum)')
    .max(-77.7, 'Longitude must be within West Virginia bounds (77.7°W maximum)'),
}).optional();

// ============================================================================
// EXTEND ADVENTURES COLLECTION
// ============================================================================

const adventuresCollection = defineCollection({
  type: 'content',
  schema: z.object({
    // === EXISTING FIELDS (from SPEC-06) ===
    title: z.string(),
    description: z.string().max(500, 'SEO best practice: descriptions under 500 chars'),
    season: z.array(z.string()).optional(),
    difficulty: z.string().optional(),
    location: z.string().optional(),
    coordinates: CoordinatesSchema,
    gear: z.array(z.string()).optional(),
    elevation_gain: z.number().optional(),
    drive_time: z.string().optional(),
    kim_hook: z.string().optional(),
    suitability: z.array(z.string()).optional(),
    images: z.array(z.object({
      src: z.string(),
      alt: z.string().min(1, 'Alt text required for WCAG 2.1 AA'),
      caption: z.string().optional(),
    })).optional(),

    // === SPEC-12: WMA FIELDS (ALL OPTIONAL) ===
    type: z.enum(['adventure', 'wma']).optional(),
    wma_acreage: z.number().int().positive().optional(),
    wma_county: z.string().optional(),
    wma_species: z.array(SpeciesSchema).optional(),
    wma_fishing_waters: z.array(FishingWaterSchema).optional(),
    wma_facilities: z.array(FacilitySchema).optional(),
    wma_access_points: z.array(AccessPointSchema).optional(),
    wma_regulations: RegulationsSchema.optional(),
    wma_season_highlights: z.array(SeasonHighlightSchema).optional(),
    mapUrl: z.string().url().optional(),
  }),
});

export const collections = {
  adventures: adventuresCollection,
};
```

**Exit Criteria**:

- All 15 schema tests PASS (Green phase)
- TypeScript types infer correctly
- Existing adventures still build without errors
- Zero breaking changes

---

#### T-005: SCHEMA REFACTOR (Refactor Phase) - **AFTER T-001**

**Owner**: Backend Developer
**Duration**: 2 hours
**Depends On**: T-001 (tests must be green)

**Refactor Goals**:

1. Extract common validation patterns
2. Add JSDoc comments for better IDE autocomplete
3. Create type guards for WMA detection
4. Add schema migration helpers

**Refactored Code**:

```typescript
// Type guard for WMA adventures
export function isWMAAdventure(adventure: CollectionEntry<'adventures'>): boolean {
  return adventure.data.type === 'wma' || adventure.data.wma_acreage !== undefined;
}

// Migration helper for content authors
export function validateWMAFrontmatter(frontmatter: unknown): z.SafeParseReturnType<unknown, WMAData> {
  return adventuresCollection.schema.safeParse(frontmatter);
}

// Common string validation
const NonEmptyString = z.string().min(1);

// Reuse in schemas
export const SpeciesSchema = z.object({
  name: NonEmptyString,
  season: NonEmptyString,
  notes: z.string().optional(),
  regulationUrl: z.string().url().optional(),
});
```

**Exit Criteria**:

- All 15 schema tests STILL PASS (refactor doesn't break tests)
- Code coverage remains 100% for schema validation
- Type inference still works correctly

---

#### T-002: FRONTMATTER EXAMPLES (Documentation) - **AFTER T-005**

**Owner**: Content Designer
**Duration**: 3 hours
**Depends On**: T-005 (schema must be finalized)

**File**: `wv-wild-web/src/content/adventures/_examples/wma-template.md`

**Example WMA Frontmatter**:

```yaml
---
# === REQUIRED FIELDS ===
title: "Burnsville Lake WMA - Hunting & Fishing Guide"
description: "1,000 acres of premier hunting and fishing. 25 minutes from shop."

# === WMA TYPE (SPEC-12) ===
type: "wma"

# === WMA FIELDS (ALL OPTIONAL) ===
wma_acreage: 1000
wma_county: "Braxton"

wma_species:
  - name: "White-tailed Deer"
    season: "Nov 13 - Dec 31"
    notes: "Bucks here run 100-150 inches."
    regulationUrl: "https://wvdnr.gov/hunting/deer-regulations/"

wma_fishing_waters:
  - name: "Burnsville Lake"
    species: ["Smallmouth Bass", "Crappie"]
    access: "Boat ramps at Bulltown."

wma_facilities:
  - type: "Boat Ramps"
    count: 2
    description: "Concrete ramps at Bulltown and Riffle Run."

wma_regulations:
  zone: "Zone 3"
  restrictions:
    - "Blaze orange required (500 sq in)"
    - "No hunting within 100 yards of boat ramps"

coordinates:
  lat: 38.8419
  lng: -80.6561
---

# Burnsville Lake WMA Content...
```

**Exit Criteria**:

- Example file validates against schema
- Build succeeds with example frontmatter
- Kim can copy-paste example for new WMAs

---

#### T-003: TYPE SYSTEM INTEGRATION (TypeScript) - **PARALLEL WITH T-001**

**Owner**: TypeScript Specialist
**Duration**: 2 hours
**Depends On**: T-001 (schema implementation)

**File**: `wv-wild-web/src/types/adventure.ts`

**Type Definitions**:

```typescript
import type { z } from 'astro/zod';
import type { CollectionEntry } from 'astro:content';
import {
  SpeciesSchema,
  FishingWaterSchema,
  FacilitySchema,
  AccessPointSchema,
  RegulationsSchema,
  SeasonHighlightSchema
} from '../content.config';

// Infer types from Zod schemas
export type Species = z.infer<typeof SpeciesSchema>;
export type FishingWater = z.infer<typeof FishingWaterSchema>;
export type Facility = z.infer<typeof FacilitySchema>;
export type AccessPoint = z.infer<typeof AccessPointSchema>;
export type Regulations = z.infer<typeof RegulationsSchema>;
export type SeasonHighlight = z.infer<typeof SeasonHighlightSchema>;

// Full adventure type
export type AdventureEntry = CollectionEntry<'adventures'>;
export type AdventureData = AdventureEntry['data'];

// WMA-specific type (discriminated union)
export type WMAData = AdventureData & {
  type: 'wma';
  wma_acreage: number;
  wma_county: string;
};

// Type guard
export function isWMAData(data: AdventureData): data is WMAData {
  return data.type === 'wma' && typeof data.wma_acreage === 'number';
}
```

**Exit Criteria**:

- TypeScript autocomplete works for WMA fields
- No type errors in any file
- Type guards work correctly

---

### Phase 2: Component Development (T-006 to T-012)

**Parallel TDD Pattern**:

1. Write component tests first (Red)
2. Implement components to pass tests (Green)
3. Refactor components while keeping tests green

---

#### T-009: COMPONENT UNIT TESTS - AdventureFeatureSection (Red) - **START HERE**

**Owner**: Test Engineer 1
**Duration**: 3 hours
**Depends On**: None (parallel start)

**File**: `wv-wild-web/src/components/adventure/AdventureFeatureSection.test.ts`

**Test Coverage** (7 tests):

```typescript
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import AdventureFeatureSection from './AdventureFeatureSection.astro';

describe('AdventureFeatureSection', () => {
  it('should render 2-column grid on desktop', () => {
    const { container } = render(
      <AdventureFeatureSection
        title="What to Hunt"
        features={[
          { title: 'Deer', description: 'Nov 13 - Dec 31' },
          { title: 'Turkey', description: 'Apr 15 - May 15' },
        ]}
        columns={2}
      />
    );
    expect(container.querySelector('.md\\:grid-cols-2')).toBeTruthy();
  });

  it('should apply border-l-4 border-l-sign-green to cards', () => {
    const { container } = render(
      <AdventureFeatureSection
        title="Features"
        features={[{ title: 'Test', description: 'Test desc' }]}
      />
    );
    const card = container.querySelector('.border-l-4');
    expect(card).toBeTruthy();
    expect(card).toHaveClass('border-l-sign-green');
  });

  it('should display Kim notes in font-hand', () => {
    const { getByText } = render(
      <AdventureFeatureSection
        title="Features"
        features={[{
          title: 'Deer',
          description: 'Season info',
          notes: "Bucks here run 100-150 inches",
        }]}
      />
    );
    const notes = getByText("Bucks here run 100-150 inches");
    expect(notes).toHaveClass('font-hand');
  });

  it('should hide notes when not provided', () => {
    const { queryByClass } = render(
      <AdventureFeatureSection
        title="Features"
        features={[{ title: 'Deer', description: 'Season info' }]}
      />
    );
    expect(queryByClass('font-hand')).toBeNull();
  });

  it('should support 3-column variant', () => {
    const { container } = render(
      <AdventureFeatureSection
        title="Features"
        features={[]}
        columns={3}
      />
    );
    expect(container.querySelector('.md\\:grid-cols-3')).toBeTruthy();
  });

  it('should apply cream background variant', () => {
    const { container } = render(
      <AdventureFeatureSection
        title="Features"
        features={[]}
        variant="cream"
      />
    );
    expect(container.querySelector('.bg-brand-cream')).toBeTruthy();
  });

  it('should render default slot content', () => {
    const { getByText } = render(
      <AdventureFeatureSection title="Features" features={[]}>
        <p>Additional content</p>
      </AdventureFeatureSection>
    );
    expect(getByText('Additional content')).toBeTruthy();
  });
});
```

**Exit Criteria**:

- All 7 tests FAIL (component doesn't exist yet)
- Tests committed to Git
- CI/CD runs tests

---

#### T-006: COMPONENT IMPLEMENTATION - AdventureFeatureSection (Green) - **AFTER T-009**

**Owner**: Component Developer 1
**Duration**: 4 hours
**Depends On**: T-009 (tests must exist)

**File**: `wv-wild-web/src/components/adventure/AdventureFeatureSection.astro`

**Implementation**:

```astro
---
/**
 * AdventureFeatureSection.astro
 * SPEC-12: Generic feature display for WMA pages
 *
 * @accessibility
 * - Uses semantic section with aria-labelledby
 * - Icons are aria-hidden, info conveyed in text
 *
 * @example
 * ```astro
 * <AdventureFeatureSection
 *   title="What to Hunt"
 *   features={[{ title: 'Deer', description: 'Nov 13 - Dec 31' }]}
 * />
 * ```
 */

interface Feature {
  title: string;
  description: string;
  notes?: string;
  icon?: string;
}

interface Props {
  title: string;
  intro?: string;
  features: Feature[];
  variant?: 'white' | 'cream';
  columns?: 2 | 3;
  accentColor?: 'sign-green' | 'brand-orange' | 'brand-mud';
}

const {
  title,
  intro,
  features,
  variant = 'white',
  columns = 2,
  accentColor = 'sign-green',
} = Astro.props;

const sectionId = `feature-section-${Math.random().toString(36).substring(2, 9)}`;
const bgClass = variant === 'cream' ? 'bg-brand-cream' : 'bg-white';
const gridCols = columns === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2';
const borderClass = `border-l-${accentColor}`;
---

<section
  class:list={['py-12 md:py-16', bgClass]}
  aria-labelledby={sectionId}
>
  <div class="container-default">
    <h2
      id={sectionId}
      class="font-display text-2xl md:text-3xl font-bold text-brand-brown mb-6"
    >
      {title}
    </h2>

    {intro && (
      <p class="font-body text-lg text-brand-brown/80 mb-8">
        {intro}
      </p>
    )}

    <div class:list={['grid grid-cols-1 gap-6', gridCols]}>
      {features.map((feature) => (
        <div class:list={['border-l-4 pl-4', borderClass]}>
          <h3 class="font-display text-xl font-bold text-brand-brown mb-2">
            {feature.title}
          </h3>
          <p class="font-body text-brand-brown/90 mb-2">
            {feature.description}
          </p>
          {feature.notes && (
            <p class="font-hand text-brand-brown/70 italic">
              {feature.notes}
            </p>
          )}
        </div>
      ))}
    </div>

    <slot />
  </div>
</section>
```

**Exit Criteria**:

- All 7 unit tests PASS
- Component follows WVWO aesthetic (rounded-sm, brand colors)
- No TypeScript errors
- Props interface documented

---

#### T-010: COMPONENT UNIT TESTS - AdventureCampingList (Red) - **PARALLEL WITH T-009**

**Owner**: Test Engineer 2
**Duration**: 3 hours

**Test Coverage** (7 tests):

- 3-column grid on desktop
- Count badges display correctly
- Phone numbers as clickable tel: links
- External links open in new tab
- ADA notes display when provided
- Empty facilities array shows fallback
- Hides contact when not provided

---

#### T-007: COMPONENT IMPLEMENTATION - AdventureCampingList (Green) - **AFTER T-010**

**Owner**: Component Developer 2
**Duration**: 4 hours
**Depends On**: T-010 (tests must exist)

**Implementation Pattern**: Same Red-Green-Refactor as T-006

---

#### T-011: COMPONENT UNIT TESTS - Remaining 4 Components (Red) - **PARALLEL**

**Owners**: Test Engineers 1 & 2
**Duration**: 6 hours
**Components**:

- AdventureAmenitiesGrid (5 tests)
- AdventureCTA (5 tests)
- AdventureWhatToHunt (5 tests)
- AdventureWhatToFish (6 tests)

---

#### T-008: COMPONENT IMPLEMENTATIONS - Remaining 4 (Green) - **AFTER T-011**

**Owners**: Component Developers 3 & 4
**Duration**: 8 hours
**Depends On**: T-011 (all tests written)

---

#### T-012: COMPONENT REFACTOR (Refactor Phase) - **AFTER T-008**

**Owner**: All Component Developers
**Duration**: 4 hours
**Depends On**: All tests green

**Refactor Goals**:

1. Extract common Tailwind classes to constants
2. DRY up responsive grid patterns
3. Consolidate ARIA patterns
4. Optimize component slot usage

**Exit Criteria**:

- All 28+ component tests STILL PASS
- Code quality improved (no duplication)
- Performance optimized (fewer class strings)

---

### Phase 3: Integration Testing (T-013 to T-016)

#### T-015: E2E TESTS - Component Rendering (Red) - **START HERE**

**Owner**: Test Engineer 3
**Duration**: 6 hours
**Depends On**: T-012 (components exist)

**File**: `wv-wild-web/tests/e2e/wma-components.spec.ts`

**Test Coverage** (35+ scenarios):

```typescript
import { test, expect } from '@playwright/test';

test.describe('AdventureFeatureSection E2E', () => {
  test('renders 2-column grid on desktop viewport', async ({ page }) => {
    await page.goto('/adventures/elk-river');
    await page.setViewportSize({ width: 1280, height: 720 });

    const grid = page.locator('section[aria-labelledby^="feature-section"] > div > div');
    await expect(grid).toHaveClass(/md:grid-cols-2/);
  });

  test('renders 1-column on mobile viewport', async ({ page }) => {
    await page.goto('/adventures/elk-river');
    await page.setViewportSize({ width: 375, height: 667 });

    const grid = page.locator('section[aria-labelledby^="feature-section"] > div > div');
    await expect(grid).toHaveClass(/grid-cols-1/);
  });

  test('applies border-l-4 border-l-sign-green to feature cards', async ({ page }) => {
    await page.goto('/adventures/elk-river');

    const cards = page.locator('.border-l-4');
    await expect(cards.first()).toHaveClass(/border-l-sign-green/);
  });

  test('displays Kim notes in font-hand', async ({ page }) => {
    await page.goto('/adventures/elk-river');

    const notes = page.locator('.font-hand').first();
    await expect(notes).toBeVisible();
  });
});

test.describe('AdventureCampingList E2E', () => {
  test('renders 3-column grid on desktop', async ({ page }) => {
    await page.goto('/adventures/elk-river');
    await page.setViewportSize({ width: 1280, height: 720 });

    const grid = page.locator('.md\\:grid-cols-3');
    await expect(grid).toBeVisible();
  });

  test('displays count badges correctly', async ({ page }) => {
    await page.goto('/adventures/elk-river');

    const badge = page.locator('text=/\\(\\d+\\)/').first();
    await expect(badge).toBeVisible();
  });

  test('phone numbers are clickable tel: links', async ({ page }) => {
    await page.goto('/adventures/elk-river');

    const phoneLink = page.locator('a[href^="tel:"]').first();
    await expect(phoneLink).toBeVisible();
    await expect(phoneLink).toHaveAttribute('href', /^tel:/);
  });

  test('external links open in new tab', async ({ page }) => {
    await page.goto('/adventures/elk-river');

    const externalLink = page.locator('a[target="_blank"]').first();
    await expect(externalLink).toHaveAttribute('rel', 'noopener noreferrer');
  });
});

// ... 27 more E2E scenarios for remaining components
```

**Exit Criteria**:

- All 35+ E2E tests FAIL (pages not created yet)
- Tests run in CI/CD

---

#### T-013: WMA PAGE TEMPLATES (Green) - **AFTER T-015**

**Owner**: Frontend Developer
**Duration**: 8 hours
**Depends On**: T-015 (E2E tests written)

**Files**:

- `wv-wild-web/src/layouts/WMATemplate.astro`
- `wv-wild-web/src/pages/adventures/elk-river.astro` (refactored)
- `wv-wild-web/src/pages/adventures/burnsville-lake.astro` (new)

**WMATemplate.astro**:

```astro
---
import type { CollectionEntry } from 'astro:content';
import AdventureHero from '../components/adventure/AdventureHero.astro';
import AdventureQuickStats from '../components/adventure/AdventureQuickStats.astro';
import AdventureFeatureSection from '../components/adventure/AdventureFeatureSection.astro';
import AdventureWhatToHunt from '../components/adventure/AdventureWhatToHunt.astro';
import AdventureWhatToFish from '../components/adventure/AdventureWhatToFish.astro';
import AdventureCampingList from '../components/adventure/AdventureCampingList.astro';
import AdventureGettingThere from '../components/adventure/AdventureGettingThere.astro';
import AdventureGearChecklist from '../components/adventure/AdventureGearChecklist.astro';
import AdventureRelatedShop from '../components/adventure/AdventureRelatedShop.astro';
import AdventureCTA from '../components/adventure/AdventureCTA.astro';

interface Props {
  adventure: CollectionEntry<'adventures'>;
}

const { adventure } = Astro.props;
const { data } = adventure;
---

<AdventureHero
  title={data.title}
  description={data.description}
  difficulty={data.difficulty}
  season={data.season}
/>

<AdventureQuickStats
  acreage={data.wma_acreage}
  county={data.wma_county}
  driveTime={data.drive_time}
/>

{data.wma_species && data.wma_species.length > 0 && (
  <AdventureWhatToHunt species={data.wma_species} />
)}

{data.wma_fishing_waters && data.wma_fishing_waters.length > 0 && (
  <AdventureWhatToFish waters={data.wma_fishing_waters} />
)}

{data.wma_facilities && data.wma_facilities.length > 0 && (
  <AdventureCampingList facilities={data.wma_facilities} />
)}

<AdventureGettingThere
  location={data.location}
  coordinates={data.coordinates}
/>

<AdventureGearChecklist gear={data.gear} />

<AdventureRelatedShop />

<AdventureCTA
  primaryHref={`https://maps.google.com/?q=${data.coordinates?.lat},${data.coordinates?.lng}`}
  secondaryHref="tel:+13045551234"
/>
```

**Exit Criteria**:

- All 35+ E2E tests PASS
- WMA pages reduced from 533 → 150 lines
- All sections render correctly
- No TypeScript errors

---

#### T-016: E2E TESTS - Navigation & Links (Red) - **PARALLEL WITH T-015**

**Owner**: Test Engineer 4
**Duration**: 4 hours

**Test Coverage**:

- All internal links navigate correctly
- External links (DNR, Google Maps) open in new tab
- Breadcrumb navigation works
- Previous/Next WMA links functional

---

#### T-014: NAVIGATION INTEGRATION (Green) - **AFTER T-016**

**Owner**: Frontend Developer
**Duration**: 3 hours
**Depends On**: T-016 (navigation tests written)

---

### Phase 4: Accessibility & Polish (T-017 to T-020)

#### T-019: ACCESSIBILITY TESTS (Red) - **START HERE**

**Owner**: Accessibility Engineer
**Duration**: 6 hours
**Depends On**: T-013 (pages exist)

**File**: `wv-wild-web/tests/a11y/wma-accessibility.spec.ts`

**Test Coverage** (30+ tests):

```typescript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('WCAG 2.1 AA Compliance', () => {
  test('should have zero axe violations on elk-river page', async ({ page }) => {
    await page.goto('/adventures/elk-river');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('color contrast meets 4.5:1 minimum', async ({ page }) => {
    await page.goto('/adventures/elk-river');

    const results = await new AxeBuilder({ page })
      .withTags(['cat.color'])
      .analyze();

    expect(results.violations.filter(v => v.id === 'color-contrast')).toEqual([]);
  });

  test('heading hierarchy is valid', async ({ page }) => {
    await page.goto('/adventures/elk-river');

    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1); // Single h1

    // No skipped levels (h1 → h2 → h3)
    const results = await new AxeBuilder({ page })
      .withTags(['cat.semantics'])
      .analyze();

    const headingViolations = results.violations.filter(v =>
      v.id === 'heading-order'
    );
    expect(headingViolations).toEqual([]);
  });

  test('all images have alt text', async ({ page }) => {
    await page.goto('/adventures/elk-river');

    const results = await new AxeBuilder({ page })
      .withTags(['cat.text-alternatives'])
      .analyze();

    const altViolations = results.violations.filter(v =>
      v.id === 'image-alt'
    );
    expect(altViolations).toEqual([]);
  });

  test('keyboard navigation reaches all interactive elements', async ({ page }) => {
    await page.goto('/adventures/elk-river');

    const links = page.locator('a[href]');
    const linkCount = await links.count();

    for (let i = 0; i < linkCount; i++) {
      await page.keyboard.press('Tab');
    }

    // All links should be reachable via Tab
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedElement).toBe('A');
  });

  test('focus indicators are visible', async ({ page }) => {
    await page.goto('/adventures/elk-river');

    const results = await new AxeBuilder({ page })
      .withTags(['cat.keyboard'])
      .analyze();

    const focusViolations = results.violations.filter(v =>
      v.id === 'focus-visible'
    );
    expect(focusViolations).toEqual([]);
  });

  test('respects prefers-reduced-motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/adventures/elk-river');

    // Check that animations are disabled
    const animated = page.locator('.component-animated');
    const animationStyle = await animated.evaluate(el =>
      window.getComputedStyle(el).animation
    );
    expect(animationStyle).toBe('none');
  });

  // ... 23 more accessibility tests
});
```

**Exit Criteria**:

- All 30+ accessibility tests FAIL (violations exist)
- Test coverage includes WCAG 2.1 AA requirements

---

#### T-017: ACCESSIBILITY FIXES (Green) - **AFTER T-019**

**Owner**: Frontend Developer + Accessibility Engineer
**Duration**: 8 hours
**Depends On**: T-019 (tests identify violations)

**Common Fixes**:

1. Add aria-labelledby to sections
2. Fix heading hierarchy (no skips)
3. Add focus-visible styles
4. Ensure 4.5:1 color contrast
5. Add alt text to all images
6. Implement keyboard navigation
7. Add prefers-reduced-motion support

**Exit Criteria**:

- All 30+ accessibility tests PASS
- Zero axe-core violations
- Manual screen reader testing passes

---

#### T-020: VISUAL REGRESSION TESTS (Red) - **PARALLEL WITH T-019**

**Owner**: QA Engineer
**Duration**: 4 hours

**File**: `wv-wild-web/tests/visual/wma-snapshots.spec.ts`

**Test Coverage** (20+ snapshots):

```typescript
import { test, expect } from '@playwright/test';

test.describe('Visual Regression', () => {
  test('elk-river mobile full page', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/adventures/elk-river');
    await expect(page).toHaveScreenshot('elk-river-mobile.png', {
      fullPage: true,
    });
  });

  test('elk-river desktop above fold', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/adventures/elk-river');
    await expect(page).toHaveScreenshot('elk-river-desktop-hero.png');
  });

  test('AdventureFeatureSection 2-column', async ({ page }) => {
    await page.goto('/adventures/elk-river');
    const section = page.locator('section[aria-labelledby^="feature-section"]').first();
    await expect(section).toHaveScreenshot('feature-section-2col.png');
  });

  // ... 17 more visual snapshots
});
```

**Exit Criteria**:

- All 20+ snapshots FAIL (no baseline images yet)
- Snapshots cover mobile + desktop viewports

---

#### T-018: VISUAL BASELINE CREATION (Green) - **AFTER T-020**

**Owner**: QA Engineer
**Duration**: 3 hours
**Depends On**: T-020 (tests written), T-017 (accessibility fixes done)

**Process**:

1. Run visual tests to generate baseline images
2. Manually review each snapshot for quality
3. Approve baselines and commit to Git
4. Re-run tests to verify they pass

**Exit Criteria**:

- All 20+ visual tests PASS
- Baseline images committed to Git
- Future changes trigger visual regression alerts

---

### Phase 5: Content & Deployment (T-021 to T-024)

#### T-022: CONTENT VALIDATION TESTS (Red) - **START HERE**

**Owner**: Content Engineer
**Duration**: 3 hours
**Depends On**: T-002 (frontmatter examples)

**File**: `wv-wild-web/tests/content/wma-content.test.ts`

**Test Coverage**:

```typescript
import { describe, it, expect } from 'vitest';
import { getCollection } from 'astro:content';
import { isWMAAdventure } from '../src/types/adventure';

describe('WMA Content Validation', () => {
  it('should have 5 WMA pages in Phase 1', async () => {
    const adventures = await getCollection('adventures');
    const wmas = adventures.filter(isWMAAdventure);
    expect(wmas.length).toBeGreaterThanOrEqual(5);
  });

  it('should have all required frontmatter fields', async () => {
    const adventures = await getCollection('adventures');
    const elkRiver = adventures.find(a => a.slug === 'elk-river');

    expect(elkRiver).toBeDefined();
    expect(elkRiver.data.title).toBeDefined();
    expect(elkRiver.data.description).toBeDefined();
    expect(elkRiver.data.wma_acreage).toBeDefined();
    expect(elkRiver.data.wma_county).toBeDefined();
  });

  it('should have Kim tips in at least 50% of species', async () => {
    const adventures = await getCollection('adventures');
    const wmas = adventures.filter(isWMAAdventure);

    let totalSpecies = 0;
    let speciesWithTips = 0;

    wmas.forEach(wma => {
      wma.data.wma_species?.forEach(species => {
        totalSpecies++;
        if (species.notes) speciesWithTips++;
      });
    });

    const tipsCoverage = speciesWithTips / totalSpecies;
    expect(tipsCoverage).toBeGreaterThanOrEqual(0.5); // 50% coverage
  });

  it('should have optimized hero images', async () => {
    const adventures = await getCollection('adventures');
    const wmas = adventures.filter(isWMAAdventure);

    for (const wma of wmas) {
      const heroImage = wma.data.images?.[0];
      expect(heroImage).toBeDefined();
      expect(heroImage.src).toMatch(/\.webp$/); // WebP format
      expect(heroImage.alt).toBeDefined();
      expect(heroImage.alt.length).toBeGreaterThan(0);
    }
  });
});
```

**Exit Criteria**:

- All content validation tests FAIL (content not created yet)
- Tests enforce quality standards

---

#### T-021: CONTENT POPULATION (Green) - **AFTER T-022**

**Owner**: Content Team (Kim + Editor)
**Duration**: 12 hours (2-3 hours per WMA)
**Depends On**: T-022 (validation tests), T-002 (frontmatter examples)

**WMAs to Populate**:

1. Elk River (already exists, refactor to new schema)
2. Burnsville Lake (new)
3. Summersville Lake (new)
4. Holly River (new)
5. Cranberry (new)

**Checklist per WMA**:

- [ ] 15+ frontmatter fields populated
- [ ] 3-5 huntable species with seasons
- [ ] 1-3 fishing waters (if applicable)
- [ ] Kim's tips in 50%+ of species cards
- [ ] Hero image optimized (WebP, <500KB, 1920×1080)
- [ ] All external links functional (DNR, Google Maps)
- [ ] GPS coordinates validated (WV bounds)
- [ ] Regulations list complete

**Exit Criteria**:

- All 5 WMA pages validate against schema
- All content validation tests PASS
- Kim approves all tips and descriptions

---

#### T-024: PERFORMANCE TESTS (Red) - **PARALLEL WITH T-022**

**Owner**: Performance Engineer
**Duration**: 3 hours

**File**: `wv-wild-web/tests/performance/lighthouse.spec.ts`

**Test Coverage**:

```typescript
import { test, expect } from '@playwright/test';
import { playAudit } from 'playwright-lighthouse';

test.describe('Lighthouse Performance', () => {
  test('elk-river should score ≥95 performance', async ({ page }) => {
    await page.goto('/adventures/elk-river');

    const results = await playAudit({
      page,
      thresholds: {
        performance: 95,
        accessibility: 100,
        'best-practices': 100,
        seo: 100,
      },
    });

    expect(results.lhr.categories.performance.score * 100).toBeGreaterThanOrEqual(95);
  });

  test('page load time <2s on 3G', async ({ page }) => {
    await page.route('**/*', route => {
      route.continue({ throttling: '3G' });
    });

    const startTime = Date.now();
    await page.goto('/adventures/elk-river');
    const loadTime = Date.now() - startTime;

    expect(loadTime).toBeLessThan(2000); // 2 seconds
  });

  test('total page weight <500KB', async ({ page }) => {
    const response = await page.goto('/adventures/elk-river');
    const buffer = await response.body();
    const sizeKB = buffer.length / 1024;

    expect(sizeKB).toBeLessThan(500);
  });
});
```

**Exit Criteria**:

- Performance tests FAIL (optimizations not done yet)
- Baseline metrics captured

---

#### T-023: PERFORMANCE OPTIMIZATION (Green) - **AFTER T-024**

**Owner**: Performance Engineer
**Duration**: 6 hours
**Depends On**: T-024 (performance tests), T-021 (content exists)

**Optimizations**:

1. Inline critical CSS in <head>
2. Lazy-load images below fold
3. Optimize hero images (WebP, srcset)
4. Minify HTML/CSS/JS
5. Enable Gzip compression
6. Add cache headers
7. Preconnect to external domains

**Exit Criteria**:

- All performance tests PASS
- Lighthouse scores: 95+/100/100/100
- Page load <2s on 3G

---

### Phase 6: PR Quality & Final QA (T-025 to T-030)

#### T-025: WVWO AESTHETIC AUDIT (Automated)

**Owner**: QA Engineer
**Duration**: 2 hours
**Depends On**: All phases complete

**Automated Checks**:

- `grep -r "rounded-md" src/` → Zero results
- `grep -r "rounded-lg" src/` → Zero results
- `grep -r "Inter" src/` → Zero results (except imports)
- `grep -r "backdrop-blur" src/` → Zero results
- Color contrast validation (automated tool)

**Exit Criteria**:

- Zero forbidden patterns found
- All brand colors validated
- Orange usage <5% of screen area

---

#### T-026: CROSS-BROWSER TESTING

**Owner**: QA Engineer
**Duration**: 4 hours
**Browsers**: Chrome, Firefox, Safari, Edge

**Exit Criteria**:

- All browsers render identically
- Zero layout bugs
- All interactions work

---

#### T-027: PR DOCUMENTATION

**Owner**: Technical Writer
**Duration**: 3 hours

**Files to Create**:

- `CHANGELOG.md` (SPEC-12 changes)
- `MIGRATION.md` (how to convert WMA pages)
- Component API docs (all 6 new components)
- Content authoring guide (for Kim)

**Exit Criteria**:

- All docs complete
- Examples tested and working
- Kim can follow migration guide

---

#### T-028: CODE REVIEW PREPARATION

**Owner**: Lead Developer
**Duration**: 2 hours

**Checklist**:

- [ ] All 43+ unit tests passing
- [ ] All 35+ E2E tests passing
- [ ] Zero axe-core violations
- [ ] All 20+ visual snapshots approved
- [ ] Performance tests passing
- [ ] WVWO aesthetic audit clean
- [ ] Cross-browser testing complete
- [ ] Documentation complete
- [ ] Zero TypeScript errors
- [ ] ESLint passing
- [ ] Prettier formatting applied

---

#### T-029: PR SUBMISSION

**Owner**: Lead Developer
**Duration**: 1 hour
**Depends On**: T-028 (all checks green)

**PR Template**:

```markdown
## SPEC-12: WMA Template System

### Summary
- 6 new WMA-specific components
- 8 optional WMA fields added to adventures schema
- 5 WMA pages migrated to template (73% line reduction)
- Zero breaking changes to existing adventures

### Test Coverage
- ✅ 43 unit tests (schema + components)
- ✅ 35 E2E tests (rendering + navigation)
- ✅ 30 accessibility tests (WCAG 2.1 AA)
- ✅ 20 visual regression snapshots
- ✅ 5 performance tests (Lighthouse)

### WVWO Aesthetic Compliance
- ✅ Zero rounded-md/lg/xl (rounded-sm only)
- ✅ Zero forbidden fonts (Inter, Poppins, etc.)
- ✅ Zero purple/pink/neon colors
- ✅ Brand palette compliance 100%
- ✅ Orange usage <5% (CTAs only)

### Migration Impact
- **Before**: 533 lines per WMA page
- **After**: 150 lines per WMA page
- **Reduction**: 73% fewer lines
- **Benefit**: Change template once → updates 8 pages

### Files Changed
- Added: 6 components, 1 layout, 4 WMA pages
- Modified: content.config.ts (schema extension)
- Tests: 128 total (all passing)

### Screenshots
[Attach mobile + desktop screenshots]

### Checklist
- [x] All tests passing
- [x] Documentation complete
- [x] Migration guide tested
- [x] Kim approved content
```

---

#### T-030: 10-AGENT PR REVIEW

**Owner**: Queen Coordinator Agent
**Duration**: 4 hours
**Depends On**: T-029 (PR submitted)

**Review Agents**:

1. TypeScript Validator
2. Accessibility Auditor
3. WVWO Aesthetic Enforcer
4. Performance Analyzer
5. Schema Validator
6. Component Reviewer
7. Test Coverage Analyst
8. Documentation Reviewer
9. Security Scanner
10. Final QA Inspector

**Exit Criteria**:

- PR score ≥90/100
- Zero must-fix issues
- All agents approve
- Merge approved

---

## Execution Timeline

**Total Duration**: 14 days (2 weeks + 4 days buffer)

| Phase | Days | Tasks | Tests | Exit Criteria |
|-------|------|-------|-------|---------------|
| 1. Schema Foundation | 2 | T-001 to T-005 | 15 unit | Schema tests pass |
| 2. Component Development | 4 | T-006 to T-012 | 28 unit | Component tests pass |
| 3. Integration Testing | 3 | T-013 to T-016 | 35 E2E | E2E tests pass |
| 4. Accessibility & Polish | 2 | T-017 to T-020 | 30 a11y, 20 visual | Zero violations |
| 5. Content & Deployment | 3 | T-021 to T-024 | 5 perf | 5 WMAs published |
| 6. PR Quality & Final QA | 2 | T-025 to T-030 | All | PR approved |
| **Buffer** | 4 | Contingency | - | Risk mitigation |
| **Total** | **18** | **30 tasks** | **128 tests** | **PR merged** |

---

## Parallel Execution Plan

### Week 1 (Schema + Components)

**Day 1-2: Schema Foundation**

```
08:00 - Test Engineer 1: T-004 (Schema tests - Red)
12:00 - Backend Developer: T-001 (Schema implementation - Green)
14:00 - TypeScript Specialist: T-003 (Type system)
16:00 - Backend Developer: T-005 (Schema refactor)
18:00 - Content Designer: T-002 (Frontmatter examples)
```

**Day 3-6: Component Development**

```
Day 3:
  - Test Engineer 1: T-009 (AdventureFeatureSection tests - Red)
  - Test Engineer 2: T-010 (AdventureCampingList tests - Red)

Day 4:
  - Component Dev 1: T-006 (AdventureFeatureSection - Green)
  - Component Dev 2: T-007 (AdventureCampingList - Green)

Day 5:
  - Test Engineers 1 & 2: T-011 (Remaining 4 component tests - Red)

Day 6:
  - Component Devs 3 & 4: T-008 (Remaining 4 components - Green)
  - All Developers: T-012 (Component refactor)
```

### Week 2 (Integration + Accessibility)

**Day 7-9: Integration Testing**

```
Day 7:
  - Test Engineer 3: T-015 (E2E component tests - Red)
  - Test Engineer 4: T-016 (E2E navigation tests - Red)

Day 8-9:
  - Frontend Developer: T-013 (WMA page templates - Green)
  - Frontend Developer: T-014 (Navigation integration - Green)
```

**Day 10-11: Accessibility & Polish**

```
Day 10:
  - Accessibility Engineer: T-019 (Accessibility tests - Red)
  - QA Engineer: T-020 (Visual regression tests - Red)

Day 11:
  - Frontend + A11y: T-017 (Accessibility fixes - Green)
  - QA Engineer: T-018 (Visual baseline creation - Green)
```

### Week 3 (Content + Deployment)

**Day 12-14: Content & Performance**

```
Day 12:
  - Content Engineer: T-022 (Content validation tests - Red)
  - Performance Engineer: T-024 (Performance tests - Red)

Day 13-14:
  - Content Team: T-021 (Populate 5 WMAs - Green)
  - Performance Engineer: T-023 (Performance optimization - Green)
```

**Day 15-16: PR Quality & Review**

```
Day 15:
  - QA Engineer: T-025 (Aesthetic audit)
  - QA Engineer: T-026 (Cross-browser testing)
  - Technical Writer: T-027 (PR documentation)

Day 16:
  - Lead Developer: T-028 (Code review prep)
  - Lead Developer: T-029 (PR submission)
  - Queen Coordinator: T-030 (10-agent PR review)
```

---

## Quality Gates (No Bypass)

### Gate 1: Schema Foundation

**Criteria**:

- ✅ 15 schema tests passing
- ✅ Zero TypeScript errors
- ✅ Existing adventures still build
- ✅ Migration guide validated

**Blocks**: Component development cannot start until schema is stable

---

### Gate 2: Component Development

**Criteria**:

- ✅ 28 component unit tests passing
- ✅ All 6 components < 100 lines
- ✅ Props interfaces documented
- ✅ WVWO aesthetic compliance verified

**Blocks**: Integration testing cannot start without working components

---

### Gate 3: Integration Testing

**Criteria**:

- ✅ 35 E2E tests passing
- ✅ All navigation links functional
- ✅ WMA pages < 150 lines
- ✅ Template reuse validated

**Blocks**: Accessibility testing cannot start with broken pages

---

### Gate 4: Accessibility & Polish

**Criteria**:

- ✅ Zero axe-core violations
- ✅ Manual screen reader testing passed
- ✅ All visual snapshots approved
- ✅ Keyboard navigation working

**Blocks**: Content population cannot start without accessible templates

---

### Gate 5: Content & Deployment

**Criteria**:

- ✅ 5 WMA pages published
- ✅ All content validation tests passing
- ✅ Performance tests passing (95+/100/100/100)
- ✅ Kim approved all content

**Blocks**: PR cannot be submitted without complete content

---

### Gate 6: PR Quality

**Criteria**:

- ✅ All 128 tests passing
- ✅ Documentation complete
- ✅ Cross-browser tested
- ✅ 10-agent review score ≥90/100

**Blocks**: PR cannot merge without quality approval

---

## Risk Mitigation

### Risk 1: Schema Breaking Changes

**Mitigation**:

- T-004 includes backward compatibility tests
- All WMA fields are optional
- Gate 1 blocks progress until validation passes

### Risk 2: Component Test Failures

**Mitigation**:

- Parallel TDD ensures tests written before implementation
- Gate 2 blocks integration until all unit tests pass
- Continuous test execution catches regressions early

### Risk 3: Accessibility Violations

**Mitigation**:

- T-019 runs comprehensive axe-core tests
- Manual screen reader testing required
- Gate 4 blocks content work until violations fixed

### Risk 4: Performance Regression

**Mitigation**:

- T-024 tests Lighthouse scores in CI/CD
- 3G throttling simulates rural WV conditions
- Gate 5 blocks PR until performance targets met

### Risk 5: WVWO Aesthetic Drift

**Mitigation**:

- T-025 automated aesthetic audit
- Visual regression tests catch styling changes
- Queen coordinator enforces brand compliance

---

## Success Metrics

### Test Coverage

- **Unit Tests**: 43+ (target: 100% schema + component coverage)
- **E2E Tests**: 35+ (target: all user flows covered)
- **Accessibility Tests**: 30+ (target: zero WCAG violations)
- **Visual Tests**: 20+ (target: mobile + desktop viewports)
- **Performance Tests**: 5+ (target: Lighthouse 95+)

### Code Quality

- **Line Reduction**: 73% (533 → 150 lines per WMA)
- **Component Reuse**: 80%+ of page is composed components
- **PR Review Score**: 94+ (matching SPEC-10/11 quality)
- **TypeScript Errors**: 0
- **ESLint Violations**: 0

### Content Quality

- **WMAs Published**: 5 (Phase 1 target)
- **Kim's Tips Coverage**: 50%+ of species cards
- **External Links**: 100% functional
- **Image Optimization**: 100% WebP, <500KB

### Performance

- **Lighthouse Performance**: 95+/100
- **Page Load Time**: <2s on 3G
- **Total Page Weight**: <500KB
- **Time to Interactive**: <3s

---

## Appendix: Test Execution Commands

### Run All Tests

```bash
# Unit tests (Vitest)
npm run test:unit

# E2E tests (Playwright)
npm run test:e2e

# Accessibility tests (axe-core)
npm run test:a11y

# Visual regression (Playwright)
npm run test:visual

# Performance tests (Lighthouse)
npm run test:perf

# All tests
npm run test:all
```

### Run Specific Test Suites

```bash
# Schema validation only
npm run test:unit -- adventures.test.ts

# Component tests only
npm run test:unit -- components/

# Single E2E test
npm run test:e2e -- wma-components.spec.ts
```

### Watch Mode (Development)

```bash
# Unit tests with file watching
npm run test:unit:watch

# E2E tests with UI
npm run test:e2e:ui
```

### CI/CD Integration

```bash
# Pre-commit hook
npm run test:pre-commit

# PR validation
npm run test:pr

# Deployment validation
npm run test:deploy
```

---

**END OF TDD STRATEGY**

**Next Steps**:

1. Review and approve this TDD plan
2. Execute T-004 (Schema tests - Red phase)
3. Follow Red-Green-Refactor cycle for each task
4. Enforce quality gates (no bypass)
5. Achieve 94+ PR review score

**Estimated Effort**: 18 days (14 working + 4 buffer)
**Success Probability**: HIGH (proven SPEC-10/11 patterns, comprehensive testing)
**Risk Level**: MEDIUM (mitigated by quality gates + parallel execution)
