# SPEC-14 River Template - Implementation Plan

**Version:** 1.0.0
**Created:** 2025-12-30
**Status:** Planning Phase Complete
**SPARC Phase:** Plan → Ready for Refinement
**Total Effort:** 10 hours
**Critical Files:** 7

---

## Executive Summary

This implementation plan breaks down SPEC-14 River Template Component System into 42 actionable tasks across 5 phases. Based on architecture decisions from the 3-agent swarm (Architecture Phase), this plan ensures systematic TDD implementation following the LakeTemplate pattern (SPEC-13).

**Key Dependencies:**

- **SPEC-13** (Lake Template) - Pattern reference for component structure
- **SPEC-10** (Gear Checklist) - Shared component integration
- **SPEC-11** (Shop Categories) - Shared component integration

**Architecture Decisions:**

1. Monolithic 660-line component (not decomposed sub-components)
2. Schema-first type system (Zod schemas → TypeScript types)
3. New SEO component (`SchemaRiverTemplate.astro`)
4. Inline color-coding logic (no extracted helpers)
5. Content Collections extension with `type: 'river'` discriminator

---

## Overview

### Project Metrics

| Metric | Value |
|--------|-------|
| **Total Phases** | 5 |
| **Total Tasks** | 42 |
| **Estimated Effort** | 10 hours |
| **New Files Created** | 7 |
| **Existing Files Modified** | 2 |
| **Lines of Code** | 1,690 new lines |
| **Zod Schemas** | 7 new schemas |
| **Component Sections** | 8 primary + 3 shared |

### Critical Path

```
Phase 1: Type System (2h)
    ↓
Phase 2a: Component Core Sections (2h)
    ↓
Phase 2b: Component New Sections (2h)
    ↓
Phase 3: Content Collections (1h)
    ↓
Phase 4: SEO Component (2h)
    ↓
Phase 5: Example Data Files (1h)
```

**Critical Path Tasks:** T-001 → T-008 → T-009 → T-010 → T-027 → T-034 → T-040

---

## Phase 1: Type System Foundation (2 hours)

**Goal:** Create type-safe data model with 7 Zod schemas and primary interface.

**File:** `wv-wild-web/src/types/adventure.ts`
**Location:** After line 432 (after Lake schemas)
**Output:** +150 lines

### Task Breakdown

#### T-001: Create RapidSchema (30 min)

**Priority:** CRITICAL (blocks component implementation)
**Effort:** 30 minutes
**Dependencies:** None

**Implementation:**

```typescript
/**
 * Individual rapid with classification.
 * Color-coded: I-III (green), IV (orange), V (red).
 */
export const RapidSchema = z.object({
  name: z.string().min(1),
  class: z.object({
    base: z.enum(['I', 'II', 'III', 'IV', 'V']),
    modifier: z.enum(['+', '-']).optional(),
  }),
  displayName: z.string().min(1), // "Class IV+" (full precision for UI)
  description: z.string().min(1),
  hazards: z.array(z.string().min(1)).optional(),
  runnable: z.string().min(1), // "All water levels" | "1000-3000 CFS"
});
export type Rapid = z.infer<typeof RapidSchema>;
```

**Validation:**

- [ ] Schema compiles without errors
- [ ] Enum values match spec (I, II, III, IV, V exactly)
- [ ] `displayName` separate from `class.base` for UI flexibility

---

#### T-002: Create SeasonalFlowSchema (20 min)

**Priority:** HIGH
**Effort:** 20 minutes
**Dependencies:** None

**Implementation:**

```typescript
/**
 * Seasonal water flow pattern.
 * Badge colors: Low (green), Medium (orange), High (red).
 */
export const SeasonalFlowSchema = z.object({
  season: z.string().min(1), // "Spring (March-May)"
  level: z.enum(['Low', 'Medium', 'High']), // Water level for color-coding
  cfsRange: z.string().optional(), // "1000-3000 CFS" (expert precision)
  bestFor: z.array(z.string().min(1)).min(1).max(10), // ["Beginner Rafting", "Trophy Fishing"]
  notes: z.string().min(1), // Flow patterns, dam schedules
});
export type SeasonalFlow = z.infer<typeof SeasonalFlowSchema>;
```

**Validation:**

- [ ] Level enum matches color-coding logic (Low/Medium/High exactly)
- [ ] `cfsRange` optional (not all rivers have gauges)
- [ ] `bestFor` array validates 1-10 items

---

#### T-003: Create RiverAccessPointSchema (25 min)

**Priority:** HIGH
**Effort:** 25 minutes
**Dependencies:** None

**Implementation:**

```typescript
/**
 * River access point (put-in, take-out, both).
 * Badge colors: Put-in (green), Take-out (brown), Both (orange).
 */
export const RiverAccessPointSchema = z.object({
  name: z.string().min(1), // "Summersville Dam Put-In"
  type: z.enum(['Put-in', 'Take-out', 'Both']), // Badge color mapping
  typeNotes: z.string().optional(), // "Emergency use only", "Seasonal (Apr-Oct)"
  facilities: z.array(z.string().min(1)).min(1).max(15), // ["Parking (50 spaces)", "Vault toilets"]
  coords: z.string().optional(), // "38.2345, -80.1234" (Google Maps format)
  shuttleInfo: z.string().optional(), // "15 miles, 25 min drive. Shuttle services available."
});
export type RiverAccessPoint = z.infer<typeof RiverAccessPointSchema>;
```

**Validation:**

- [ ] Type enum matches badge logic (Put-in/Take-out/Both exactly)
- [ ] `coords` format documented in JSDoc
- [ ] `typeNotes` optional for edge cases

---

#### T-004: Create RiverFishingSchema (20 min)

**Priority:** HIGH
**Effort:** 20 minutes
**Dependencies:** None

**Implementation:**

```typescript
/**
 * River fishing (flow-dependent).
 * Differs from lake fishing due to current and dam releases.
 */
export const RiverFishingSchema = z.object({
  species: z.array(z.string().min(1)).min(1).max(15),
  seasons: z.string().min(1), // "Spring (April-May), Fall (September-October)"
  accessPoints: z.array(z.object({
    name: z.string().min(1),
    description: z.string().min(1),
  })).min(1).max(10),
  techniques: z.array(z.string().min(1)).min(1).max(15), // ["Crankbaits", "Fly fishing"]
  kimsTip: z.string().optional(), // Renders in font-hand
});
export type RiverFishing = z.infer<typeof RiverFishingSchema>;
```

**Validation:**

- [ ] `species` array max 15 (reasonable limit)
- [ ] `kimsTip` optional (not all rivers have Kim's input)
- [ ] Nested `accessPoints` schema validates

---

#### T-005: Create OutfitterSchema with Contact Validation (30 min)

**Priority:** HIGH
**Effort:** 30 minutes
**Dependencies:** None

**Implementation:**

```typescript
/**
 * Outfitter / guide service.
 * Contact validation: at least one method (phone/website/email) required.
 */
export const OutfitterSchema = z.object({
  name: z.string().min(1),
  services: z.array(z.string().min(1)).min(1).max(20), // ["Guided rafting", "Kayak rentals"]
  contact: z.object({
    phone: z.string().optional(),
    website: z.string().url().optional(),
    email: z.string().email().optional(),
  }).refine(
    (c) => c.phone || c.website || c.email,
    { message: 'At least one contact method (phone, website, or email) is required' }
  ),
  priceRange: z.string().optional(), // "$75-$150 per person" | "$$-$$$"
  seasonalNotes: z.string().optional(), // "Upper Gauley runs September-October only"
});
export type Outfitter = z.infer<typeof OutfitterSchema>;
```

**Validation:**

- [ ] `refine()` correctly validates at least one contact method
- [ ] Error message clear for content editors
- [ ] URL validation for website field

---

#### T-006: Create RiverSafetySchema (15 min)

**Priority:** MEDIUM
**Effort:** 15 minutes
**Dependencies:** None

**Implementation:**

```typescript
/**
 * Safety category checklist.
 * Orange border for prominence.
 */
export const RiverSafetySchema = z.object({
  category: z.string().min(1), // "Rescue Equipment", "First Aid", "Required Skills"
  items: z.array(z.string().min(1)).min(1).max(20),
  important: z.boolean().optional(), // Adds bg-brand-orange badge
});
export type RiverSafety = z.infer<typeof RiverSafetySchema>;
```

**Validation:**

- [ ] `important` flag optional (defaults to false)
- [ ] Items array validates 1-20 entries

---

#### T-007: Create NearbyAttractionSchema (15 min)

**Priority:** MEDIUM
**Effort:** 15 minutes
**Dependencies:** None

**Implementation:**

```typescript
/**
 * Nearby point of interest.
 * Standard types: Camping, Hiking, Town, State Park, Restaurant, Historic Site.
 * Custom types supported with fallback icon.
 */
export const NearbyAttractionSchema = z.object({
  name: z.string().min(1), // "Summersville Lake"
  type: z.string().min(1), // Free-form string (standard + custom types)
  distance: z.string().min(1), // "5 miles" | "15 min drive"
  description: z.string().min(1),
});
export type NearbyAttraction = z.infer<typeof NearbyAttractionSchema>;
```

**Validation:**

- [ ] `type` free-form (not enum) for extensibility
- [ ] JSDoc documents standard types

---

#### T-008: Create RiverTemplateProps Interface (30 min)

**Priority:** CRITICAL (blocks component implementation)
**Effort:** 30 minutes
**Dependencies:** T-001 through T-007 (all schemas)

**Implementation:**

```typescript
/**
 * River template props interface.
 * Complete type definition for RiverTemplate component used for river adventure pages.
 * Target: ~660 lines (558 LakeTemplate + 102 new sections).
 */
export interface RiverTemplateProps {
  // Hero section (required)
  name: string;
  image: string;
  imageAlt: string;
  tagline: string;
  description: string;
  stats: StatItem[];

  // River metadata
  length: number;              // miles
  county: string;
  difficultyRange: string;     // "Class II-V"
  quickHighlights: string[];

  // Content sections
  rapids: Rapid[];
  fishing: RiverFishing;
  outfitters: Outfitter[];
  seasonalFlow: SeasonalFlow[];
  accessPoints: RiverAccessPoint[];
  safety: RiverSafety[];
  nearbyAttractions: NearbyAttraction[];
  gearList: GearItem[];           // Existing SPEC-10 type
  relatedShop: RelatedCategory[]; // Existing SPEC-11 type

  // Optional metadata
  difficulty?: Difficulty;         // Existing enum: 'easy' | 'moderate' | 'challenging' | 'rugged'
  bestSeason?: Season;            // Existing enum: 'spring' | 'summer' | 'fall' | 'winter'
  coordinates?: Coordinates;      // Existing type: { lat: number, lng: number }
  mapUrl?: string;
  waterLevelUrl?: string;         // Real-time USGS gauge
}
```

**Validation:**

- [ ] All nested types imported correctly
- [ ] Reuses existing types (GearItem, RelatedCategory, Difficulty, Season, Coordinates)
- [ ] JSDoc comments complete
- [ ] Interface compiles without errors

**Acceptance Criteria:**

- [ ] `npm run typecheck` passes
- [ ] All 7 schemas export types correctly
- [ ] RiverTemplateProps interface complete
- [ ] No breaking changes to existing adventure.ts exports

---

## Phase 2: Component Implementation (4 hours)

**Goal:** Create 660-line RiverTemplate.astro with 8 primary sections.

**File:** `wv-wild-web/src/components/templates/RiverTemplate.astro` (NEW)
**Output:** 660 lines

### Phase 2a: Core Sections (2 hours)

#### T-009: Component Scaffolding & Hero Section (45 min)

**Priority:** CRITICAL
**Effort:** 45 minutes
**Dependencies:** T-008 (RiverTemplateProps)

**Implementation Pattern (from LakeTemplate lines 1-124):**

```astro
---
import type { RiverTemplateProps } from '../../types/adventure';
import AdventureGearChecklist from '../adventure/AdventureGearChecklist.astro';
import AdventureRelatedShop from '../adventure/AdventureRelatedShop.astro';
import AdventureCTA from '../adventure/AdventureCTA.astro';

interface Props extends RiverTemplateProps {}

const {
  name, image, imageAlt, tagline, description, stats,
  length, county, difficultyRange, quickHighlights,
  rapids, fishing, outfitters, seasonalFlow, accessPoints, safety,
  nearbyAttractions, gearList, relatedShop,
  difficulty, bestSeason, coordinates, mapUrl, waterLevelUrl
} = Astro.props;
---

<div class="river-template">
  <!-- Hero Section -->
  <section
    class="relative h-[70vh] min-h-[500px] overflow-hidden"
    aria-label={`${name} hero section`}
  >
    <img
      src={image}
      alt={imageAlt}
      class="absolute inset-0 w-full h-full object-cover"
      loading="eager"
    />
    <div class="absolute inset-0 bg-brand-brown/50"></div>

    <div class="relative h-full container mx-auto px-4">
      <div class="h-full flex flex-col justify-end pb-16">
        <h1 class="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          {name}
        </h1>
        <p class="font-body text-xl md:text-2xl text-white mb-8 max-w-2xl">
          {tagline}
        </p>

        <!-- Stats Grid -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {stats.map((stat) => (
            <div class="bg-white/90 backdrop-blur-sm p-4 rounded-sm">
              <p class="font-display text-2xl font-bold text-brand-brown">{stat.value}</p>
              <p class="font-body text-sm text-brand-mud">{stat.label}</p>
            </div>
          ))}
        </div>

        <!-- Quick Highlights -->
        <div class="flex flex-wrap gap-2">
          {quickHighlights.map((highlight) => (
            <span class="bg-brand-orange text-white px-3 py-1 rounded-sm font-body text-sm font-medium">
              {highlight}
            </span>
          ))}
        </div>

        <!-- Real-Time USGS Link (Conditional) -->
        {waterLevelUrl && (
          <a
            href={waterLevelUrl}
            target="_blank"
            rel="noopener noreferrer"
            class="mt-4 inline-flex items-center gap-2 bg-sign-green text-white px-4 py-2 rounded-sm font-body font-medium hover:bg-sign-green/90 transition-colors"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
            </svg>
            Check Real-Time USGS Water Levels
          </a>
        )}
      </div>
    </div>
  </section>

  <!-- Description Prose -->
  <section class="bg-brand-cream py-12">
    <div class="container mx-auto px-4">
      <p class="font-body text-lg text-brand-mud leading-relaxed max-w-4xl mx-auto text-center">
        {description}
      </p>
    </div>
  </section>
```

**Validation:**

- [ ] Hero height matches LakeTemplate (`h-[70vh] min-h-[500px]`)
- [ ] Overlay color correct (`bg-brand-brown/50`)
- [ ] Stats grid responsive (2-col mobile, 4-col desktop)
- [ ] Quick highlights use brand-orange (<5% screen)
- [ ] Real-time link conditional rendering works
- [ ] Font classes correct (font-display, font-body)

---

#### T-010: Rapids Guide Section (60 min)

**Priority:** CRITICAL
**Effort:** 60 minutes
**Dependencies:** T-009 (component scaffolding)

**Implementation:**

```astro
  <!-- Rapids Guide Section -->
  {rapids.length > 0 && (
    <section class="bg-white py-12" aria-labelledby="rapids-guide">
      <div class="container mx-auto px-4">
        <h2
          id="rapids-guide"
          class="font-display text-3xl md:text-4xl font-bold text-brand-brown mb-8"
        >
          Rapids Guide
        </h2>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rapids.map((rapid) => {
            // Inline color-coding logic (no helpers)
            const classNum = parseInt(rapid.class.base.replace(/[^0-9]/g, ''));
            const borderColor = classNum <= 3 ? 'border-l-sign-green' :
                               classNum === 4 ? 'border-l-brand-orange' :
                               'border-l-red-600';
            const badgeColor = classNum <= 3 ? 'bg-sign-green' :
                              classNum === 4 ? 'bg-brand-orange' :
                              'bg-red-600';
            const shapeIcon = classNum <= 3 ? '●' :
                             classNum === 4 ? '▲' :
                             '■';

            return (
              <article class={`border-l-4 ${borderColor} pl-6 py-4 bg-brand-cream rounded-sm shadow-sm`}>
                <div class="flex items-start justify-between mb-3">
                  <h3 class="font-display text-xl font-bold text-brand-brown">
                    {rapid.name}
                  </h3>
                  <span class={`${badgeColor} text-white px-3 py-1 rounded-sm font-body text-sm font-medium flex items-center gap-1`}>
                    <span aria-hidden="true">{shapeIcon}</span>
                    {rapid.displayName}
                  </span>
                </div>

                <p class="font-body text-brand-mud leading-relaxed mb-4">
                  {rapid.description}
                </p>

                {rapid.hazards && rapid.hazards.length > 0 && (
                  <div class="mb-4">
                    <p class="font-body text-sm font-bold text-red-600 mb-2 flex items-center gap-2">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                      </svg>
                      Hazards:
                    </p>
                    <ul class="list-disc list-inside font-body text-sm text-brand-mud space-y-1">
                      {rapid.hazards.map((hazard) => (
                        <li>{hazard}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <p class="font-body text-xs text-brand-mud/70 italic">
                  Runnable: {rapid.runnable}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  )}
```

**Validation:**

- [ ] Conditional section rendering (`rapids.length > 0`)
- [ ] Inline color-coding logic correct (I-III green, IV orange, V red)
- [ ] Shape icons for accessibility (●▲■)
- [ ] Hazards warning icon displays
- [ ] Grid responsive (2-col tablet, 3-col desktop)
- [ ] Border-left accent matches color-coding
- [ ] WCAG AA contrast ratios verified

---

#### T-011: Fishing Section (45 min)

**Priority:** HIGH
**Effort:** 45 minutes
**Dependencies:** T-009

**Implementation Pattern (from LakeTemplate lines 155-207):**

```astro
  <!-- Fishing Section -->
  <section class="bg-brand-cream py-12" aria-labelledby="fishing">
    <div class="container mx-auto px-4">
      <h2
        id="fishing"
        class="font-display text-3xl md:text-4xl font-bold text-brand-brown mb-8"
      >
        Fishing
      </h2>

      <div class="max-w-4xl mx-auto space-y-8">
        <!-- Species -->
        <div>
          <h3 class="font-display text-xl font-bold text-brand-brown mb-3">
            Target Species
          </h3>
          <div class="flex flex-wrap gap-2">
            {fishing.species.map((species) => (
              <span class="bg-sign-green text-white px-3 py-1 rounded-sm font-body text-sm font-medium">
                {species}
              </span>
            ))}
          </div>
        </div>

        <!-- Best Seasons -->
        <div>
          <h3 class="font-display text-xl font-bold text-brand-brown mb-3">
            Best Fishing Seasons
          </h3>
          <p class="font-body text-brand-mud leading-relaxed">
            {fishing.seasons}
          </p>
        </div>

        <!-- Access Points -->
        <div>
          <h3 class="font-display text-xl font-bold text-brand-brown mb-3">
            Access Points
          </h3>
          <div class="grid md:grid-cols-2 gap-4">
            {fishing.accessPoints.map((point) => (
              <div class="border-l-4 border-l-sign-green pl-4 py-2 bg-white rounded-sm shadow-sm">
                <p class="font-body font-bold text-brand-brown mb-1">
                  {point.name}
                </p>
                <p class="font-body text-sm text-brand-mud">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <!-- Techniques -->
        <div>
          <h3 class="font-display text-xl font-bold text-brand-brown mb-3">
            Recommended Techniques
          </h3>
          <ul class="list-disc list-inside font-body text-brand-mud space-y-2 pl-4">
            {fishing.techniques.map((technique) => (
              <li>{technique}</li>
            ))}
          </ul>
        </div>

        <!-- Kim's Tip (Conditional) -->
        {fishing.kimsTip && (
          <div class="mt-6 pt-6 border-t border-gray-200">
            <p class="font-hand text-sm italic text-brand-brown bg-brand-cream p-4 rounded-sm border-l-4 border-l-sign-green">
              Kim says: "{fishing.kimsTip}"
            </p>
          </div>
        )}
      </div>
    </div>
  </section>
```

**Validation:**

- [ ] Species badges use sign-green
- [ ] Access points 2-column grid responsive
- [ ] Kim's tip conditional rendering
- [ ] Kim's tip uses font-hand ONLY
- [ ] Border-left accent on access points

---

#### T-012: Outfitters Section (45 min)

**Priority:** HIGH
**Effort:** 45 minutes
**Dependencies:** T-009

**Implementation:**

```astro
  <!-- Outfitters Section -->
  {outfitters.length > 0 && (
    <section class="bg-white py-12" aria-labelledby="outfitters">
      <div class="container mx-auto px-4">
        <h2
          id="outfitters"
          class="font-display text-3xl md:text-4xl font-bold text-brand-brown mb-8"
        >
          Outfitters & Guide Services
        </h2>

        <div class="grid md:grid-cols-2 gap-6">
          {outfitters.map((outfitter) => (
            <article class="border-l-4 border-l-brand-brown p-6 md:p-8 bg-brand-cream rounded-sm shadow-sm">
              <h3 class="font-display text-xl font-bold text-brand-brown mb-4">
                {outfitter.name}
              </h3>

              <!-- Services -->
              <div class="mb-4">
                <p class="font-body text-sm font-bold text-brand-mud mb-2">
                  Services:
                </p>
                <ul class="list-disc list-inside font-body text-sm text-brand-mud space-y-1">
                  {outfitter.services.map((service) => (
                    <li>{service}</li>
                  ))}
                </ul>
              </div>

              <!-- Contact -->
              <div class="mb-4">
                <p class="font-body text-sm font-bold text-brand-mud mb-2">
                  Contact:
                </p>
                <div class="space-y-1">
                  {outfitter.contact.phone && (
                    <p class="font-body text-sm text-brand-mud">
                      <a href={`tel:${outfitter.contact.phone.replace(/[^0-9]/g, '')}`} class="hover:text-sign-green transition-colors">
                        {outfitter.contact.phone}
                      </a>
                    </p>
                  )}
                  {outfitter.contact.website && (
                    <p class="font-body text-sm">
                      <a
                        href={outfitter.contact.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-sign-green hover:underline"
                      >
                        Visit Website
                      </a>
                    </p>
                  )}
                  {outfitter.contact.email && (
                    <p class="font-body text-sm">
                      <a
                        href={`mailto:${outfitter.contact.email}`}
                        class="text-sign-green hover:underline"
                      >
                        {outfitter.contact.email}
                      </a>
                    </p>
                  )}
                </div>
              </div>

              <!-- Price Range (Conditional) -->
              {outfitter.priceRange && (
                <div class="mb-4">
                  <p class="font-body text-sm font-bold text-brand-mud mb-1">
                    Price Range:
                  </p>
                  <p class="font-body text-sm text-brand-mud">
                    {outfitter.priceRange}
                  </p>
                </div>
              )}

              <!-- Seasonal Notes (Conditional) -->
              {outfitter.seasonalNotes && (
                <p class="font-body text-xs italic text-brand-mud/70 mt-4 pt-4 border-t border-gray-200">
                  {outfitter.seasonalNotes}
                </p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )}
```

**Validation:**

- [ ] Conditional section rendering
- [ ] Phone numbers format as tel: links
- [ ] Website opens in new tab with rel="noopener noreferrer"
- [ ] Email formats as mailto: links
- [ ] Price range conditional
- [ ] Seasonal notes conditional
- [ ] 2-column grid responsive

---

### Phase 2b: New Sections (2 hours)

#### T-013: Seasonal Flow Section (60 min)

**Priority:** HIGH
**Effort:** 60 minutes
**Dependencies:** T-009

**Implementation:**

```astro
  <!-- Seasonal Flow Section -->
  {seasonalFlow.length > 0 && (
    <section class="bg-brand-cream py-12" aria-labelledby="seasonal-flow">
      <div class="container mx-auto px-4">
        <!-- Real-Time USGS Link (Above Grid) -->
        {waterLevelUrl && (
          <div class="mb-8 text-center">
            <a
              href={waterLevelUrl}
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 bg-sign-green text-white px-4 py-2 rounded-sm font-body font-medium hover:bg-sign-green/90 transition-colors"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
              </svg>
              Check Real-Time Water Levels
            </a>
          </div>
        )}

        <h2
          id="seasonal-flow"
          class="font-display text-3xl md:text-4xl font-bold text-brand-brown mb-8"
        >
          Seasonal Flow Patterns
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {seasonalFlow.map((season) => {
            // Inline color-coding logic for water level
            const levelColor = season.level === 'Low' ? 'bg-sign-green' :
                              season.level === 'Medium' ? 'bg-brand-orange' :
                              'bg-red-600';

            return (
              <article class="bg-white p-6 rounded-sm shadow-sm border-b-4 border-b-sign-green">
                <h3 class="font-display text-xl font-bold text-brand-brown mb-3 pb-2 border-b-2 border-b-sign-green">
                  {season.season}
                </h3>

                <div class="mb-4">
                  <span class={`${levelColor} text-white px-3 py-1 rounded-sm font-body text-sm font-medium`}>
                    {season.level} Water
                  </span>
                  {season.cfsRange && (
                    <p class="font-body text-xs text-brand-mud/70 mt-2">
                      {season.cfsRange}
                    </p>
                  )}
                </div>

                <div class="mb-4">
                  <p class="font-body text-sm font-bold text-brand-mud mb-2">
                    Best For:
                  </p>
                  <div class="flex flex-wrap gap-2">
                    {season.bestFor.map((activity) => (
                      <span class="bg-brand-cream text-brand-brown px-2 py-1 rounded-sm font-body text-xs font-medium border border-brand-brown">
                        {activity}
                      </span>
                    ))}
                  </div>
                </div>

                <p class="font-body text-sm text-brand-mud leading-relaxed">
                  {season.notes}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  )}
```

**Validation:**

- [ ] Real-time link conditional (above grid)
- [ ] 4-column grid responsive (1-col mobile, 2-col tablet, 4-col desktop)
- [ ] Water level badge color-coded (Low green, Medium orange, High red)
- [ ] CFS range conditional display
- [ ] Best For badges display correctly
- [ ] Season name underline with sign-green

---

#### T-014: Access Points Section (60 min)

**Priority:** HIGH
**Effort:** 60 minutes
**Dependencies:** T-009

**Implementation:**

```astro
  <!-- Access Points Section -->
  {accessPoints.length > 0 && (
    <section class="bg-white py-12" aria-labelledby="access-points">
      <div class="container mx-auto px-4">
        <h2
          id="access-points"
          class="font-display text-3xl md:text-4xl font-bold text-brand-brown mb-8"
        >
          Access Points
        </h2>

        <div class="grid md:grid-cols-2 gap-6">
          {accessPoints.map((point) => {
            // Inline color-coding logic for type badge
            const typeBadgeColor = point.type === 'Put-in' ? 'bg-sign-green' :
                                  point.type === 'Take-out' ? 'bg-brand-brown' :
                                  'bg-brand-orange';

            return (
              <article class="border-l-4 border-l-sign-green p-6 md:p-8 bg-brand-cream rounded-sm shadow-sm">
                <div class="flex items-start justify-between mb-4">
                  <h3 class="font-display text-xl font-bold text-brand-brown">
                    {point.name}
                  </h3>
                  <div class="flex flex-col items-end gap-1">
                    <span class={`${typeBadgeColor} text-white px-3 py-1 rounded-sm font-body text-xs font-medium`}>
                      {point.type}
                    </span>
                    {point.typeNotes && (
                      <p class="font-body text-xs italic text-brand-mud/70 text-right">
                        {point.typeNotes}
                      </p>
                    )}
                  </div>
                </div>

                <!-- Facilities -->
                <div class="mb-4">
                  <p class="font-body text-sm font-bold text-brand-mud mb-2">
                    Facilities:
                  </p>
                  <ul class="space-y-1">
                    {point.facilities.map((facility) => (
                      <li class="flex items-start gap-2">
                        <svg class="w-4 h-4 text-sign-green mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                        <span class="font-body text-sm text-brand-mud">
                          {facility}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <!-- GPS Coordinates (Conditional) -->
                {point.coords && (
                  <div class="mb-4">
                    <a
                      href={`https://www.google.com/maps?q=${point.coords}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="inline-flex items-center gap-2 text-sign-green hover:underline font-body text-sm font-medium"
                    >
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                      </svg>
                      Open in Google Maps
                    </a>
                    <p class="font-body text-xs text-brand-mud/70 mt-1">
                      {point.coords}
                    </p>
                  </div>
                )}

                <!-- Shuttle Info (Conditional) -->
                {point.shuttleInfo && (
                  <p class="font-body text-sm italic text-brand-mud/80 mt-4 pt-4 border-t border-gray-200">
                    {point.shuttleInfo}
                  </p>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  )}
```

**Validation:**

- [ ] Type badge color-coded (Put-in green, Take-out brown, Both orange)
- [ ] Type notes conditional display
- [ ] Facilities checkmarks display
- [ ] GPS coords link to Google Maps
- [ ] GPS coords conditional rendering
- [ ] Shuttle info conditional rendering
- [ ] 2-column grid responsive

---

#### T-015: Safety Section (45 min)

**Priority:** HIGH
**Effort:** 45 minutes
**Dependencies:** T-009

**Implementation:**

```astro
  <!-- Safety Section -->
  {safety.length > 0 && (
    <section class="bg-brand-cream py-12" aria-labelledby="safety">
      <div class="container mx-auto px-4">
        <h2
          id="safety"
          class="font-display text-3xl md:text-4xl font-bold text-brand-brown mb-8"
        >
          Safety First
        </h2>

        <div class="max-w-4xl mx-auto space-y-6">
          {safety.map((category) => (
            <article class="border-l-4 border-l-brand-orange p-6 md:p-8 bg-white rounded-sm shadow-sm">
              <div class="flex items-start justify-between mb-4">
                <h3 class="font-display text-xl font-bold text-brand-brown">
                  {category.category}
                </h3>
                {category.important && (
                  <span class="bg-brand-orange text-white px-3 py-1 rounded-sm font-body text-xs font-bold">
                    IMPORTANT
                  </span>
                )}
              </div>

              <ul class="list-disc list-inside font-body text-brand-mud space-y-2 pl-4">
                {category.items.map((item) => (
                  <li>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )}
```

**Validation:**

- [ ] Orange border-left for prominence
- [ ] Important badge conditional
- [ ] Full-width stacking layout
- [ ] Items bulleted list displays

---

#### T-016: Nearby Attractions Section (45 min)

**Priority:** MEDIUM
**Effort:** 45 minutes
**Dependencies:** T-009

**Implementation:**

```astro
  <!-- Nearby Attractions Section -->
  {nearbyAttractions.length > 0 && (
    <section class="bg-white py-12" aria-labelledby="nearby-attractions">
      <div class="container mx-auto px-4">
        <h2
          id="nearby-attractions"
          class="font-display text-3xl md:text-4xl font-bold text-brand-brown mb-8"
        >
          Nearby Attractions
        </h2>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nearbyAttractions.map((attraction) => {
            // Icon mapping for standard types
            const iconPath = attraction.type === 'Camping' ?
              'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' :
              attraction.type === 'Hiking' ?
              'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' :
              attraction.type === 'Town' ?
              'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' :
              attraction.type === 'State Park' ?
              'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' :
              attraction.type === 'Restaurant' ?
              'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z' :
              attraction.type === 'Historic Site' ?
              'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' :
              'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'; // Fallback

            return (
              <article class="bg-brand-cream p-6 rounded-sm shadow-sm">
                <div class="flex items-start gap-4 mb-4">
                  <div class="flex-shrink-0 w-12 h-12 bg-sign-green rounded-sm flex items-center justify-center">
                    <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d={iconPath} />
                    </svg>
                  </div>
                  <div class="flex-1">
                    <h3 class="font-display text-xl font-bold text-brand-brown mb-1">
                      {attraction.name}
                    </h3>
                    <div class="flex items-center gap-2">
                      <span class="bg-sign-green text-white px-2 py-0.5 rounded-sm font-body text-xs font-medium">
                        {attraction.distance}
                      </span>
                      <span class="font-body text-xs text-brand-mud/70 uppercase tracking-wide">
                        {attraction.type}
                      </span>
                    </div>
                  </div>
                </div>

                <p class="font-body text-sm text-brand-mud leading-relaxed">
                  {attraction.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  )}
```

**Validation:**

- [ ] Type icons display correctly (6 standard types)
- [ ] Fallback icon for custom types
- [ ] Distance badge sign-green
- [ ] Type label uppercase small text
- [ ] 3-column grid responsive (1-col mobile, 2-col tablet, 3-col desktop)

---

#### T-017: Shared Components Integration (30 min)

**Priority:** HIGH
**Effort:** 30 minutes
**Dependencies:** T-009

**Implementation:**

```astro
  <!-- Gear Checklist -->
  {gearList.length > 0 && (
    <AdventureGearChecklist
      title="Essential Gear Checklist"
      intro="Make sure you have these items before hitting the water."
      items={gearList}
      columns={3}
      variant="river"
    />
  )}

  <!-- Related Shop -->
  {relatedShop.length > 0 && (
    <AdventureRelatedShop
      categories={relatedShop}
    />
  )}

  <!-- Call to Action -->
  <AdventureCTA
    heading="Plan Your River Adventure"
    description="Visit our shop for gear, guides, and local expertise. We're here to help you make the most of West Virginia's wild rivers."
    primaryText="Get Directions"
    primaryHref="/contact#directions"
    secondaryText="Call Shop"
    secondaryHref="tel:+13045551234"
  />
</div>
```

**Validation:**

- [ ] AdventureGearChecklist props correct
- [ ] AdventureRelatedShop props correct
- [ ] AdventureCTA props correct
- [ ] Conditional rendering for gear/shop

---

#### T-018: Scoped Styles (15 min)

**Priority:** HIGH
**Effort:** 15 minutes
**Dependencies:** T-017 (component complete)

**Implementation (from LakeTemplate lines 652-660):**

```astro
<style>
  /* WVWO Compliance: Only rounded-sm allowed */
  .river-template .rounded-sm {
    border-radius: 0.125rem !important;
  }

  /* Motion preferences */
  @media (prefers-reduced-motion: reduce) {
    .river-template * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
</style>
```

**Validation:**

- [ ] Scoped to .river-template class
- [ ] rounded-sm enforcement with !important
- [ ] prefers-reduced-motion media query

**Acceptance Criteria for Phase 2:**

- [ ] All 8 primary sections implemented
- [ ] Component file exactly ~660 lines
- [ ] All conditional rendering works
- [ ] Inline color-coding logic correct
- [ ] Shared components integrated
- [ ] Scoped styles added
- [ ] WVWO compliance verified (fonts, colors, rounded-sm)
- [ ] `npm run build` succeeds

---

## Phase 3: Content Collections Integration (1 hour)

**Goal:** Extend Content Collections with river-specific fields.

**File:** `wv-wild-web/src/content.config.ts`
**Location:** Lines 99 and 112-123
**Output:** +50 lines

### Task Breakdown

#### T-027: Update Type Discriminator (15 min)

**Priority:** CRITICAL
**Effort:** 15 minutes
**Dependencies:** T-008 (RiverTemplateProps)

**Implementation:**

```typescript
// Line 99: Update type discriminator
type: z.enum(['adventure', 'wma', 'lake', 'river']).optional(),
```

**Validation:**

- [ ] Enum includes 'river'
- [ ] Preserves existing types (adventure, wma, lake)

---

#### T-028: Import River Schemas (10 min)

**Priority:** HIGH
**Effort:** 10 minutes
**Dependencies:** T-001 through T-007 (all schemas)

**Implementation:**

```typescript
// Add to imports section (after line 5)
import {
  RapidSchema,
  RiverFishingSchema,
  OutfitterSchema,
  SeasonalFlowSchema,
  RiverAccessPointSchema,
  RiverSafetySchema,
  NearbyAttractionSchema
} from './types/adventure';
```

**Validation:**

- [ ] All 7 schemas imported
- [ ] Import path correct

---

#### T-029: Add River Fields to Adventures Collection (30 min)

**Priority:** HIGH
**Effort:** 30 minutes
**Dependencies:** T-027, T-028

**Implementation:**

```typescript
// After line 111: Add river-specific optional fields

// River metadata (basic info)
riverLength: z.number().positive().optional(),
difficultyRange: z.string().optional(), // "Class II-V"
waterLevelUrl: z.string().url().optional(), // Real-time USGS gauge

// River sections (all optional to preserve backward compatibility)
rapids: z.array(RapidSchema).optional(),
riverFishing: RiverFishingSchema.optional(),
outfitters: z.array(OutfitterSchema).optional(),
seasonalFlow: z.array(SeasonalFlowSchema).optional(),
riverAccessPoints: z.array(RiverAccessPointSchema).optional(),
riverSafety: z.array(RiverSafetySchema).optional(),
nearbyAttractions: z.array(NearbyAttractionSchema).optional(),
```

**Validation:**

- [ ] All fields optional (zero breaking changes)
- [ ] Schemas reference imported types
- [ ] Field names match spec exactly

---

#### T-030: Test Collection Query (15 min)

**Priority:** HIGH
**Effort:** 15 minutes
**Dependencies:** T-029

**Test Script:**

```typescript
// test/content-collections.test.ts
import { getCollection } from 'astro:content';
import { isRiverAdventure } from '../src/types/adventure';

const adventures = await getCollection('adventures');
const rivers = adventures.filter(isRiverAdventure);

console.log(`Total adventures: ${adventures.length}`);
console.log(`Rivers: ${rivers.length}`);
console.log(`Lakes: ${adventures.filter(a => a.data.type === 'lake').length}`);
console.log(`WMAs: ${adventures.filter(a => a.data.type === 'wma').length}`);
```

**Validation:**

- [ ] Collection query succeeds
- [ ] Type guard works correctly
- [ ] Zero errors on existing lake/WMA entries

**Acceptance Criteria for Phase 3:**

- [ ] Type discriminator updated
- [ ] All 7 schemas imported
- [ ] River fields added (optional)
- [ ] Collection query test passes
- [ ] Zero breaking changes to existing content
- [ ] `npm run typecheck` passes

---

## Phase 4: SEO Component (2 hours)

**Goal:** Create SchemaRiverTemplate.astro for structured data.

**File:** `wv-wild-web/src/components/seo/SchemaRiverTemplate.astro` (NEW)
**Output:** ~200 lines

### Task Breakdown

#### T-034: Component Scaffolding & Props Interface (30 min)

**Priority:** HIGH
**Effort:** 30 minutes
**Dependencies:** T-008 (RiverTemplateProps)

**Implementation:**

```astro
---
import type { Coordinates, Outfitter } from '../../types/adventure';

export interface Props {
  name: string;
  slug: string;
  description: string;
  length: number;
  difficultyRange: string;
  coordinates: Coordinates;
  outfitters?: Outfitter[];
  warnings?: string[];          // Safety warnings for schema
  amenities?: string[];         // ["Whitewater Rafting", "Fishing"]
  breadcrumbs: { name: string; url: string }[];
  publishedDate?: string;
  updatedDate?: string;
}

const {
  name,
  slug,
  description,
  length,
  difficultyRange,
  coordinates,
  outfitters = [],
  warnings = [],
  amenities = [],
  breadcrumbs,
  publishedDate,
  updatedDate
} = Astro.props;

const baseUrl = 'https://wvwildoutdoors.pages.dev';
const pageUrl = `${baseUrl}/near/${slug}/`;
---
```

**Validation:**

- [ ] Props interface complete
- [ ] All props destructured
- [ ] baseUrl matches production

---

#### T-035: TouristAttraction + Place Schema (40 min)

**Priority:** HIGH
**Effort:** 40 minutes
**Dependencies:** T-034

**Implementation:**

```astro
<script type="application/ld+json" set:html={JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    // 1. TouristAttraction + Place (river destination)
    {
      "@type": ["TouristAttraction", "Place"],
      "@id": `${pageUrl}#attraction`,
      "name": name,
      "description": description,
      "additionalType": "https://schema.org/WaterBodyUsage",
      "url": pageUrl,
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": coordinates.lat,
        "longitude": coordinates.lng
      },
      "warning": warnings,
      "amenityFeature": amenities.map(amenity => ({
        "@type": "LocationFeatureSpecification",
        "name": amenity,
        "value": true
      })),
      "additionalProperty": [
        {
          "@type": "PropertyValue",
          "name": "difficulty",
          "value": difficultyRange
        },
        {
          "@type": "PropertyValue",
          "name": "length",
          "value": `${length} miles`,
          "unitCode": "SMI"
        }
      ]
    },
    // ... (remaining entities in next tasks)
  ]
})} />
```

**Validation:**

- [ ] @type array includes both TouristAttraction and Place
- [ ] additionalType set to WaterBodyUsage
- [ ] warnings array populated
- [ ] amenityFeature mapped correctly
- [ ] additionalProperty includes difficulty and length

---

#### T-036: Article Schema (20 min)

**Priority:** MEDIUM
**Effort:** 20 minutes
**Dependencies:** T-035

**Implementation:**

```astro
// 2. Article (guide content)
{
  "@type": "Article",
  "@id": `${pageUrl}#article`,
  "headline": `${name} - Complete Whitewater & Fishing Guide`,
  "description": description,
  "author": {
    "@type": "Organization",
    "name": "WV Wild Outdoors",
    "url": baseUrl
  },
  "publisher": {
    "@type": "Organization",
    "name": "WV Wild Outdoors",
    "logo": {
      "@type": "ImageObject",
      "url": `${baseUrl}/images/logo.png`
    }
  },
  "about": { "@id": `${pageUrl}#attraction` },
  ...(publishedDate && { "datePublished": publishedDate }),
  ...(updatedDate && { "dateModified": updatedDate }),
  "inLanguage": "en-US"
},
```

**Validation:**

- [ ] @id references attraction
- [ ] Publisher logo URL correct
- [ ] Conditional date fields work

---

#### T-037: BreadcrumbList Schema (15 min)

**Priority:** MEDIUM
**Effort:** 15 minutes
**Dependencies:** T-035

**Implementation:**

```astro
// 3. BreadcrumbList
{
  "@type": "BreadcrumbList",
  "@id": `${pageUrl}#breadcrumb`,
  "itemListElement": breadcrumbs.map((crumb, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": crumb.name,
    ...(crumb.url && { "item": `${baseUrl}${crumb.url}` })
  }))
},
```

**Validation:**

- [ ] Position 1-indexed
- [ ] Last item (current page) has no item URL

---

#### T-038: LocalBusiness Schema for Outfitters (30 min)

**Priority:** MEDIUM
**Effort:** 30 minutes
**Dependencies:** T-035

**Implementation:**

```astro
// 4. LocalBusiness (per outfitter)
...outfitters.map((outfitter, index) => ({
  "@type": "LocalBusiness",
  "@id": `${pageUrl}#outfitter-${index}`,
  "name": outfitter.name,
  "makesOffer": outfitter.services.map(service => ({
    "@type": "Offer",
    "itemOffered": {
      "@type": "Service",
      "name": service
    },
    ...(outfitter.priceRange && { "priceRange": outfitter.priceRange })
  })),
  "location": { "@id": `${pageUrl}#attraction` },
  ...(outfitter.contact.phone && { "telephone": outfitter.contact.phone }),
  ...(outfitter.contact.website && { "url": outfitter.contact.website }),
  ...(outfitter.contact.email && { "email": outfitter.contact.email })
}))
```

**Validation:**

- [ ] Each outfitter separate entity
- [ ] makesOffer array per service
- [ ] location references attraction
- [ ] Conditional contact fields work

---

#### T-039: Test with Google Rich Results (15 min)

**Priority:** HIGH
**Effort:** 15 minutes
**Dependencies:** T-034 through T-038

**Test Steps:**

1. Build component with example data
2. Copy JSON-LD output
3. Validate at <https://search.google.com/test/rich-results>
4. Check for errors/warnings

**Validation:**

- [ ] Zero errors in Rich Results Test
- [ ] TouristAttraction detected
- [ ] LocalBusiness entities detected
- [ ] BreadcrumbList valid

**Acceptance Criteria for Phase 4:**

- [ ] SchemaRiverTemplate.astro created (~200 lines)
- [ ] All 4 schema entities implemented
- [ ] Google Rich Results Test passes
- [ ] Props interface documented
- [ ] Conditional fields work correctly

---

## Phase 5: Example Data Files (1 hour)

**Goal:** Create reference data files in `src/data/rivers/` directory.

**Files:** 3 new files
**Output:** ~630 lines

### Task Breakdown

#### T-040: Create rivers/ Directory & README (15 min)

**Priority:** HIGH
**Effort:** 15 minutes
**Dependencies:** T-008 (RiverTemplateProps)

**Implementation:**

```bash
mkdir -p wv-wild-web/src/data/rivers
```

**README.md Content:**

```markdown
# River Data Files

This directory contains data files for river destination pages using the RiverTemplate component.

## File Pattern

Each river gets its own TypeScript file exporting a `RiverTemplateProps` object:

```typescript
// src/data/rivers/gauley.ts
import type { RiverTemplateProps } from '../../types/adventure';

export const gauleyRiverData: RiverTemplateProps = {
  // ... complete data
};
```

## Usage in Pages

```astro
---
// src/pages/near/gauley-river.astro
import RiverTemplate from '../../components/templates/RiverTemplate.astro';
import { gauleyRiverData } from '../../data/rivers/gauley';
---

<RiverTemplate {...gauleyRiverData} />
```

## Reference Files

- **_example.ts** - Complete reference implementation (Gauley River)
- **gauley.ts** - Skeleton with TODO markers for content population

## Required Sections

All river data files MUST include:

1. Hero section (name, image, tagline, description, stats)
2. River metadata (length, county, difficultyRange, quickHighlights)
3. At least 3 rapids
4. Fishing info
5. At least 1 outfitter
6. Safety section
7. Gear list
8. Related shop categories

## Optional Sections

- Seasonal flow patterns (4 seasons)
- Access points (put-ins, take-outs)
- Nearby attractions

## Type Safety

All data files are type-checked at build time. Run `npm run typecheck` to validate.

```

**Validation:**
- [ ] Directory created
- [ ] README documents pattern
- [ ] Usage examples clear

---

#### T-041: Create _example.ts Reference Implementation (30 min)
**Priority:** HIGH
**Effort:** 30 minutes
**Dependencies:** T-040

**Implementation:**
Copy complete Gauley River data from MASTER-ARCHITECTURE.md lines 1450-1646 (example data file pattern).

**Validation:**
- [ ] All 8 sections populated
- [ ] Type-checks without errors
- [ ] Comments document each section
- [ ] Serves as complete reference

---

#### T-042: Create gauley.ts Skeleton (15 min)
**Priority:** MEDIUM
**Effort:** 15 minutes
**Dependencies:** T-040

**Implementation:**
```typescript
import type { RiverTemplateProps } from '../../types/adventure';

/**
 * Gauley River data file.
 * TODO: Phase 4 content population.
 */
export const gauleyRiverData: RiverTemplateProps = {
  // Hero section
  name: 'Gauley River',
  image: '/images/gauley-river-hero.jpg', // TODO: Add hero image
  imageAlt: 'Class V rapids on Upper Gauley River during fall dam releases',
  tagline: 'They call it the Beast of the East for good reason',
  description: 'TODO: 150-200 word description of Gauley River...',
  stats: [
    { value: '53 miles', label: 'Total Length', icon: 'distance' },
    { value: 'Class II-V', label: 'Difficulty Range', icon: 'difficulty' },
    { value: 'Nicholas County', label: 'Location', icon: 'location' },
    { value: '6 access points', label: 'Access', icon: 'access' }
  ],

  // River metadata
  length: 53,
  county: 'Nicholas County',
  difficultyRange: 'Class II-V',
  quickHighlights: [
    'Class V Rapids',
    'Fall Dam Releases',
    'Expert Kayaking'
  ],

  // Rapids (TODO: Research and populate)
  rapids: [
    // TODO: Add 15+ rapids with classifications
  ],

  // Fishing
  fishing: {
    species: ['Smallmouth Bass', 'Rainbow Trout', 'Brown Trout'], // TODO: Verify species
    seasons: 'TODO: Research best fishing seasons',
    accessPoints: [
      // TODO: Add fishing access points
    ],
    techniques: ['TODO: Research techniques'],
    kimsTip: 'TODO: Get Kim\'s fishing tip'
  },

  // Outfitters (TODO: Research local outfitters)
  outfitters: [
    // TODO: Contact ACE Adventure Resort, Adventures on the Gorge
  ],

  // Seasonal flow (TODO: Research flow patterns)
  seasonalFlow: [
    // TODO: Add 4 seasons with water level data
  ],

  // Access points (TODO: Research put-ins/take-outs)
  accessPoints: [
    // TODO: Add access points with GPS coords
  ],

  // Safety
  safety: [
    {
      category: 'Rescue Equipment',
      items: [
        'Throw rope (minimum 70 feet)',
        'River knife',
        'Whistle',
        'First aid kit'
      ]
    },
    // TODO: Add more safety categories
  ],

  // Nearby attractions (TODO: Research)
  nearbyAttractions: [
    // TODO: Add Summersville Lake, Carnifex Ferry, etc.
  ],

  // Gear list
  gearList: [
    { name: 'USCG-approved PFD', optional: false },
    { name: 'Whitewater helmet', optional: false },
    { name: 'Wetsuit or drysuit', optional: false },
    // TODO: Complete gear list
  ],

  // Related shop
  relatedShop: [
    {
      name: 'Fishing Gear',
      description: 'Rods, reels, tackle, and apparel for river fishing',
      href: '/shop/fishing'
    },
    // TODO: Add more categories
  ],

  // Optional metadata
  difficulty: 'rugged',
  bestSeason: 'fall',
  coordinates: { lat: 38.1642, lng: -80.9147 },
  waterLevelUrl: 'https://waterdata.usgs.gov/nwis/uv?site_no=03189100'
};
```

**Validation:**

- [ ] All required sections present
- [ ] TODO markers clear
- [ ] Basic data complete (stats, metadata)
- [ ] Type-checks without errors

**Acceptance Criteria for Phase 5:**

- [ ] rivers/ directory created
- [ ] README.md documents pattern
- [ ] _example.ts complete (300 lines)
- [ ] gauley.ts skeleton with TODOs (280 lines)
- [ ] All files type-check successfully
- [ ] Import paths resolve correctly

---

## Dependencies Graph

```
Phase 1: Type System
  T-001 (RapidSchema) ─────────────────┐
  T-002 (SeasonalFlowSchema) ──────────┤
  T-003 (RiverAccessPointSchema) ──────┤
  T-004 (RiverFishingSchema) ──────────┤
  T-005 (OutfitterSchema) ─────────────┼──→ T-008 (RiverTemplateProps)
  T-006 (RiverSafetySchema) ───────────┤
  T-007 (NearbyAttractionSchema) ──────┘
                                        ↓
Phase 2: Component                      ↓
  T-009 (Scaffolding + Hero) ←──────────┘
      ↓
      ├──→ T-010 (Rapids) ──────────┐
      ├──→ T-011 (Fishing) ─────────┤
      ├──→ T-012 (Outfitters) ──────┤
      ├──→ T-013 (Seasonal Flow) ───┼──→ T-017 (Shared Components)
      ├──→ T-014 (Access Points) ───┤         ↓
      ├──→ T-015 (Safety) ──────────┤    T-018 (Scoped Styles)
      └──→ T-016 (Nearby) ──────────┘

Phase 3: Content Collections
  T-008 ──→ T-027 (Type Discriminator)
            T-028 (Import Schemas) ──→ T-029 (Add River Fields) ──→ T-030 (Test Query)

Phase 4: SEO Component
  T-008 ──→ T-034 (Scaffolding) ──→ T-035 (TouristAttraction)
                                     T-036 (Article)
                                     T-037 (BreadcrumbList)
                                     T-038 (LocalBusiness)
                                         ↓
                                    T-039 (Rich Results Test)

Phase 5: Example Data
  T-008 ──→ T-040 (Directory + README) ──→ T-041 (_example.ts)
                                           T-042 (gauley.ts skeleton)
```

### Critical Path Tasks

**Path:** T-001 → T-008 → T-009 → T-010 → T-027 → T-034 → T-040

**Rationale:**

1. T-001 through T-007 create foundation schemas (parallel)
2. T-008 combines schemas into primary interface (sequential)
3. T-009 creates component scaffolding (sequential)
4. T-010 implements first major section (sequential)
5. T-027 enables Content Collections queries (sequential)
6. T-034 creates SEO component (sequential)
7. T-040 provides implementation reference (sequential)

**Estimated Critical Path Time:** 3 hours 45 minutes

---

## Validation Checklist

### Phase 1 Validation

- [ ] All 7 Zod schemas compile without errors
- [ ] RiverTemplateProps interface complete
- [ ] Type guard function works correctly
- [ ] `npm run typecheck` passes
- [ ] JSDoc comments complete
- [ ] No breaking changes to existing adventure.ts exports

### Phase 2 Validation

- [ ] Component file exactly ~660 lines
- [ ] All 8 primary sections implemented
- [ ] Conditional rendering works for all sections
- [ ] Inline color-coding logic correct (rapids, flow, access)
- [ ] Shared components integrated (Gear, Shop, CTA)
- [ ] Scoped styles enforce rounded-sm
- [ ] WVWO compliance verified:
  - [ ] Fonts: font-display, font-hand (Kim's tips only), font-body
  - [ ] Colors: brand-brown, sign-green, brand-cream, brand-orange (<5%)
  - [ ] Border radius: rounded-sm ONLY
  - [ ] No forbidden fonts (Inter, Poppins, etc.)
  - [ ] No glassmorphic effects
- [ ] `npm run build` succeeds

### Phase 3 Validation

- [ ] Type discriminator updated with 'river'
- [ ] All 7 schemas imported correctly
- [ ] River fields added (all optional)
- [ ] Collection query test passes
- [ ] Zero breaking changes to existing lake/WMA content
- [ ] Type guard filters rivers correctly
- [ ] `npm run typecheck` passes

### Phase 4 Validation

- [ ] SchemaRiverTemplate.astro created (~200 lines)
- [ ] All 4 schema entities implemented:
  - [ ] TouristAttraction + Place
  - [ ] Article
  - [ ] BreadcrumbList
  - [ ] LocalBusiness (per outfitter)
- [ ] Google Rich Results Test passes (zero errors)
- [ ] Props interface documented
- [ ] Conditional fields work correctly
- [ ] JSON-LD validates

### Phase 5 Validation

- [ ] rivers/ directory created
- [ ] README.md documents pattern clearly
- [ ] _example.ts complete (300 lines)
- [ ] gauley.ts skeleton with TODO markers (280 lines)
- [ ] All files type-check successfully
- [ ] Import paths resolve correctly
- [ ] Example data matches spec requirements

### Overall Acceptance Criteria

- [ ] All 42 tasks complete
- [ ] Total new code: 1,690 lines
- [ ] Zero breaking changes to existing codebase
- [ ] `npm run typecheck` passes
- [ ] `npm run build` succeeds
- [ ] `npm run test` passes (if tests exist)
- [ ] Google Rich Results Test validates schema
- [ ] PR review checklist complete:
  - [ ] WVWO compliance verified
  - [ ] Accessibility (WCAG AA) verified
  - [ ] Performance targets met
  - [ ] SEO meta tags complete
  - [ ] Documentation updated

---

## TDD Test Cases for Refinement Phase

### Type System Tests

```typescript
// src/types/__tests__/adventure.test.ts

describe('RapidSchema', () => {
  test('validates correct rapid data', () => {
    const rapid = {
      name: 'Pillow Rock',
      class: { base: 'V', modifier: '+' },
      displayName: 'Class V+',
      description: 'Technical rapid with undercut rocks',
      hazards: ['Undercut rocks', 'Keeper hydraulic'],
      runnable: 'High water only (3000+ CFS)'
    };
    expect(() => RapidSchema.parse(rapid)).not.toThrow();
  });

  test('rejects invalid class base', () => {
    const rapid = { name: 'Test', class: { base: 'VI' }, displayName: 'Class VI', description: 'Test', runnable: 'Test' };
    expect(() => RapidSchema.parse(rapid)).toThrow();
  });
});

describe('OutfitterSchema', () => {
  test('requires at least one contact method', () => {
    const outfitter = {
      name: 'Test Outfitter',
      services: ['Rafting'],
      contact: {} // No contact methods
    };
    expect(() => OutfitterSchema.parse(outfitter)).toThrow(/at least one contact method/);
  });

  test('validates with only phone', () => {
    const outfitter = {
      name: 'Test Outfitter',
      services: ['Rafting'],
      contact: { phone: '304-555-1234' }
    };
    expect(() => OutfitterSchema.parse(outfitter)).not.toThrow();
  });
});

describe('RiverTemplateProps', () => {
  test('type guard identifies river adventures', () => {
    const river = { data: { type: 'river', name: 'Test River' } };
    expect(isRiverAdventure(river)).toBe(true);
  });

  test('type guard rejects non-river adventures', () => {
    const lake = { data: { type: 'lake', name: 'Test Lake' } };
    expect(isRiverAdventure(lake)).toBe(false);
  });
});
```

### Component Tests

```typescript
// src/components/templates/__tests__/RiverTemplate.test.ts

describe('RiverTemplate', () => {
  test('renders hero section with correct data', () => {
    // Test hero rendering
  });

  test('hides rapids section when rapids array empty', () => {
    const props = { ...baseProps, rapids: [] };
    // Test conditional rendering
  });

  test('color-codes rapids correctly by class', () => {
    const classIIIRapid = { class: { base: 'III' }, /* ... */ };
    const classIVRapid = { class: { base: 'IV' }, /* ... */ };
    const classVRapid = { class: { base: 'V' }, /* ... */ };
    // Test border-color and badge-color logic
  });

  test('displays real-time USGS link when waterLevelUrl provided', () => {
    const propsWithGauge = { ...baseProps, waterLevelUrl: 'https://waterdata.usgs.gov/...' };
    // Test conditional link rendering
  });

  test('hides real-time link when waterLevelUrl undefined', () => {
    const propsWithoutGauge = { ...baseProps, waterLevelUrl: undefined };
    // Test conditional link hidden
  });

  test('renders Kim\'s tip in font-hand', () => {
    const fishingWithTip = { ...baseFishing, kimsTip: 'Test tip' };
    // Test font-hand class applied
  });

  test('integrates shared components correctly', () => {
    // Test AdventureGearChecklist, AdventureRelatedShop, AdventureCTA
  });
});
```

### SEO Tests

```typescript
// src/components/seo/__tests__/SchemaRiverTemplate.test.ts

describe('SchemaRiverTemplate', () => {
  test('generates valid JSON-LD @graph', () => {
    // Parse JSON-LD, validate structure
  });

  test('includes TouristAttraction + Place hybrid entity', () => {
    // Check @type array
  });

  test('creates LocalBusiness entity per outfitter', () => {
    const props = { ...baseProps, outfitters: [outfitter1, outfitter2] };
    // Test 2 LocalBusiness entities
  });

  test('includes warning property for safety', () => {
    const props = { ...baseProps, warnings: ['Class V rapids require expert skills'] };
    // Test warning array in schema
  });

  test('generates correct BreadcrumbList', () => {
    // Test breadcrumb itemListElement
  });
});
```

### Content Collections Tests

```typescript
// src/content/__tests__/collections.test.ts

describe('Content Collections - River Extension', () => {
  test('accepts river type in adventures collection', () => {
    const riverEntry = {
      type: 'river',
      name: 'Test River',
      rapids: [/* ... */],
      // ... other river fields
    };
    // Test schema validation passes
  });

  test('preserves backward compatibility with lake entries', () => {
    const lakeEntry = {
      type: 'lake',
      name: 'Test Lake',
      // ... lake fields (no river fields)
    };
    // Test schema validation passes
  });

  test('filters rivers using isRiverAdventure guard', () => {
    const adventures = await getCollection('adventures');
    const rivers = adventures.filter(isRiverAdventure);
    // Test filter works correctly
  });
});
```

---

## Risk Mitigation

### Technical Risks

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Type system complexity blocks implementation | HIGH | LOW | Follow exact LakeTemplate schema pattern, reuse existing utilities |
| Content Collections breaking changes | HIGH | VERY LOW | All river fields optional, type guards prevent accidental querying |
| SEO component validation fails | MEDIUM | MEDIUM | Use Google Rich Results Test before deployment, reference SchemaAdventureHero pattern |
| WVWO compliance violations (fonts, colors) | HIGH | MEDIUM | Scoped styles enforce rounded-sm, PR review checklist mandatory |
| Feature creep (real-time USGS widget) | MEDIUM | HIGH | Strict adherence to spec non-goals, MVP is external link only |
| Data population delays | LOW | HIGH | _example.ts provides complete reference, gauley.ts skeleton with TODOs |

### Schedule Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Phase 1 overruns (type system) | HIGH | T-001 through T-007 can run in parallel, allocate +30 min buffer |
| Phase 2 overruns (component) | HIGH | Section tasks (T-010 through T-016) can run in parallel after T-009 |
| Phase 4 delays (SEO testing) | MEDIUM | Allocate +15 min buffer for Rich Results Test iterations |

---

## Implementation Order

### Parallel Execution Opportunities

**Phase 1 (All Parallel):**

- T-001 through T-007 can all run in parallel (7 schemas independent)
- T-008 waits for all schemas to complete

**Phase 2 (Parallel after T-009):**

- T-009 must complete first (component scaffolding)
- T-010 through T-016 can run in parallel (8 sections independent)
- T-017 and T-018 sequential after all sections

**Phase 3 (Sequential):**

- T-027 → T-028 → T-029 → T-030 (dependencies on type system)

**Phase 4 (Parallel after T-034):**

- T-034 must complete first (scaffolding)
- T-035, T-036, T-037, T-038 can run in parallel (4 schema entities independent)
- T-039 waits for all entities

**Phase 5 (Parallel after T-040):**

- T-040 must complete first (directory setup)
- T-041 and T-042 can run in parallel

### Optimal Execution Strategy

**Day 1 (4 hours):**

- Morning: Phase 1 (2h) - All schemas in parallel
- Afternoon: Phase 2a (2h) - Scaffolding + core sections (T-009 → T-010, T-011, T-012)

**Day 2 (4 hours):**

- Morning: Phase 2b (2h) - New sections (T-013, T-014, T-015, T-016, T-017, T-018)
- Afternoon: Phase 3 (1h) + Phase 4 start (1h) - Content Collections + SEO scaffolding

**Day 3 (2 hours):**

- Morning: Phase 4 completion (1h) + Phase 5 (1h) - SEO entities + Example data

---

## Next Steps After Plan Completion

1. **Review Plan with Stakeholders**
   - Architecture decisions rationale
   - Effort estimates validation
   - Dependencies confirmation

2. **Prepare Development Environment**
   - Create feature branch: `feature/SPEC-14-river-template`
   - Set up IDE with TypeScript/Astro extensions
   - Install dependencies: `npm install`

3. **Begin Refinement Phase (TDD)**
   - Start with T-001 (RapidSchema)
   - Write test first, then implementation
   - Run `npm run typecheck` after each schema

4. **Track Progress**
   - Update task status in this plan.md
   - Document any deviations from plan
   - Escalate blockers immediately

5. **Quality Gates**
   - Phase 1 gate: All types compile, typecheck passes
   - Phase 2 gate: Component builds, WVWO compliance verified
   - Phase 3 gate: Collection query works, zero breaking changes
   - Phase 4 gate: Rich Results Test passes
   - Phase 5 gate: Example data type-checks

---

## Conclusion

This plan provides a complete roadmap for SPEC-14 River Template implementation with 42 actionable tasks across 5 phases. Based on architecture decisions from the 3-agent swarm, this plan ensures:

1. **Type Safety:** Schema-first approach with 7 Zod schemas
2. **Component Reusability:** Monolithic pattern following LakeTemplate
3. **SEO Excellence:** Structured data with TouristAttraction + LocalBusiness
4. **WVWO Compliance:** Fonts, colors, and border-radius enforced
5. **Zero Breaking Changes:** Optional river fields preserve existing content

**Total Effort:** 10 hours
**Critical Path:** 3.75 hours
**Parallel Opportunities:** Phases 1, 2, 4, 5

**Ready for Refinement Phase:** All tasks defined, dependencies mapped, validation criteria clear.

---

**Plan Status:** ✅ **COMPLETE - Ready for Refinement Phase**
