# Phase 2: RiverTemplate Component - Detailed Task Breakdown

**Document ID**: PLAN-RIVER-002
**Version**: 1.0
**Created**: 2025-12-30
**Estimated Total Effort**: 4 hours
**Target Lines**: ~660 lines

---

## Executive Summary

This document provides granular task breakdown for Phase 2: implementing the RiverTemplate.astro component. The component follows LakeTemplate patterns (SPEC-13) while adding 3 new river-specific sections. All tasks include line-range estimates, time allocations, and code pattern references.

### Scope Overview

- **File**: `wv-wild-web/src/components/templates/RiverTemplate.astro` (NEW)
- **Architecture**: Monolithic component (NOT decomposed)
- **Pattern Source**: LakeTemplate.astro (lines 1-558)
- **New Sections**: Seasonal Flow, Access Points, Nearby Attractions
- **Shared Components**: AdventureGearChecklist, AdventureRelatedShop, AdventureCTA

---

## Task Categories

### Category A: Foundation (T001-T003)

**Total Time**: 25 minutes
**Lines**: 1-60

### Category B: Hero & Description (T004-T005)

**Total Time**: 30 minutes
**Lines**: 61-150

### Category C: Core River Sections (T006-T011)

**Total Time**: 120 minutes
**Lines**: 151-620

### Category D: Shared Components (T012-T014)

**Total Time**: 20 minutes
**Lines**: 621-650

### Category E: Styles & Polish (T015-T016)

**Total Time**: 25 minutes
**Lines**: 651-660

---

## Detailed Task List

### T001: Component Frontmatter Setup

**Priority**: Critical
**Estimated Time**: 10 minutes
**Line Range**: 1-40
**Dependencies**: None

**Description**:
Create component header with JSDoc documentation and imports.

**Pattern Reference**:

- LakeTemplate lines 1-34 (header structure)
- Type imports from `adventure.ts`

**Implementation**:

```astro
---
/**
 * RiverTemplate.astro
 * SPEC-14: River Adventure Template Component
 *
 * Comprehensive template for West Virginia river pages with whitewater rapids,
 * fishing information, outfitters, and seasonal flow guides.
 *
 * USER STORIES IMPLEMENTED:
 * - US1: Rapids Guide Display (color-coded by class)
 * - US2: Fishing Species & Techniques
 * - US3: Hero Section with River Stats
 * - US4: Outfitters & Guide Services
 * - US5: Access Points with GPS
 * - US6: Seasonal Flow Levels
 * - US7: Safety & Regulations Display
 *
 * WVWO COMPLIANCE:
 * - Fonts: font-display (headings), font-hand (Kim's tips ONLY), font-body (content)
 * - Colors: brand-brown, sign-green, brand-cream, brand-orange (<5% of screen)
 * - Borders: rounded-sm ONLY (no other border-radius values allowed)
 * - Accents: Green (low-medium rapids), Orange (high rapids/warnings)
 *
 * @module components/templates/RiverTemplate
 */

import Layout from '../../layouts/Layout.astro';
import AdventureGearChecklist from '../adventure/AdventureGearChecklist.astro';
import AdventureRelatedShop from '../adventure/AdventureRelatedShop.astro';
import AdventureCTA from '../adventure/AdventureCTA.astro';
import type { RiverTemplateProps, Rapid, RiverFishing, Outfitter, AccessPoint, SeasonalFlow, RiverAttraction } from '../../types/adventure';
```

**Validation Checkpoints**:

- [ ] All imports resolve correctly
- [ ] JSDoc matches SPEC-14 requirements
- [ ] WVWO compliance rules documented

---

### T002: Props Interface & Destructuring

**Priority**: Critical
**Estimated Time**: 10 minutes
**Line Range**: 41-60
**Dependencies**: T001

**Description**:
Define Props interface extending RiverTemplateProps and destructure all component props.

**Pattern Reference**:

- LakeTemplate lines 35-54 (props destructuring pattern)

**Implementation**:

```astro
interface Props extends RiverTemplateProps {}

const {
  name,
  image,
  imageAlt,
  tagline,
  description,
  stats,
  rapids,
  fishing,
  outfitters,
  accessPoints,
  flowLevels,
  attractions,
  gearList,
  relatedShop,
  difficulty,
  bestSeason,
  coordinates,
} = Astro.props;

// Build-time Zod validation would go here in production
// Example: RiverTemplatePropsSchema.parse(Astro.props);
---
```

**Validation Checkpoints**:

- [ ] All required props destructured
- [ ] Optional props handled correctly
- [ ] TypeScript validation passes

---

### T003: Layout Wrapper

**Priority**: Critical
**Estimated Time**: 5 minutes
**Line Range**: 60-62
**Dependencies**: T002

**Description**:
Wrap component in Layout with dynamic title.

**Implementation**:

```astro
<Layout title={`${name} | WV Wild Outdoors`}>
  <!-- Content sections here -->
</Layout>
```

---

### T004: Hero Section Implementation

**Priority**: High
**Estimated Time**: 20 minutes
**Line Range**: 62-124
**Dependencies**: T003

**Description**:
Create hero section with river image overlay, name, tagline, and stats grid.

**Pattern Reference**:

- LakeTemplate lines 61-124 (hero structure)
- Stats grid: 4-column desktop, 2-column mobile

**Implementation Details**:

- Relative container with h-[70vh] min-h-[500px]
- Dark overlay (bg-brand-brown/50) for text readability
- H1: font-display text-4xl md:text-5xl lg:text-6xl
- Stats grid: `grid grid-cols-2 md:grid-cols-4`
- Badge highlights (optional, can be dynamic based on props)

**Color Coding Logic**:

```astro
<!-- Difficulty badge example -->
<span class={`inline-block px-4 py-2 rounded-sm ${
  difficulty?.toLowerCase() === 'easy'
    ? 'bg-sign-green text-white'
    : difficulty?.toLowerCase() === 'moderate'
    ? 'bg-brand-orange text-white'
    : 'bg-brand-brown text-white'
}`}>
  {difficulty}
</span>
```

**Validation Checkpoints**:

- [ ] Hero image uses eager loading
- [ ] Stats grid responsive (2→4 columns)
- [ ] Tagline uses brand-cream color
- [ ] No forbidden rounded classes

---

### T005: Description Prose Section

**Priority**: Medium
**Estimated Time**: 10 minutes
**Line Range**: 127-150
**Dependencies**: T004

**Description**:
Render river description as prose with proper typography.

**Pattern Reference**:

- LakeTemplate lines 129-136

**Implementation**:

```astro
<main class="container mx-auto px-4 py-12 space-y-16">
  {description && (
    <div class="prose prose-lg max-w-3xl mx-auto">
      <p class="font-body text-lg leading-relaxed text-gray-800">
        {description}
      </p>
    </div>
  )}
```

---

### T006: Rapids Guide Section (Color-Coded)

**Priority**: High
**Estimated Time**: 30 minutes
**Line Range**: 154-208
**Dependencies**: T005

**Description**:
Implement rapids classification section with inline color-coding ternaries (3-line max).

**Pattern Reference**:

- Similar to LakeTemplate "Where to Fish" (lines 154-208)
- Full-width stacking, border-left accent

**Color Coding Requirements** (from river-type-system-architecture.md):

- class-i, class-ii: sign-green
- class-iii: brand-orange (warning level)
- class-iv, class-v, class-vi: brand-brown (advanced)

**Implementation Structure**:

```astro
{rapids && rapids.length > 0 && (
  <section class="rapids-guide bg-white py-12" aria-labelledby="rapids-heading">
    <div class="container mx-auto px-4">
      <h2 id="rapids-heading" class="font-display text-3xl md:text-4xl font-bold text-brand-brown mb-8">
        Rapids Classification
      </h2>

      <div class="space-y-6">
        {rapids.map((rapid: Rapid) => (
          <article class={`bg-white border-l-4 p-6 md:p-8 rounded-sm shadow-sm ${
            rapid.base === 'class-i' || rapid.base === 'class-ii'
              ? 'border-l-sign-green'
              : rapid.base === 'class-iii'
              ? 'border-l-brand-orange'
              : 'border-l-brand-brown'
          }`}>
            <!-- Rapid name with display format -->
            <h3 class="font-display text-2xl font-bold text-brand-brown mb-2">
              {rapid.displayName}: {rapid.name}
            </h3>

            <!-- Description -->
            <p class="font-body text-gray-700 mb-4">
              {rapid.description}
            </p>

            <!-- Hazards (if provided) -->
            {rapid.hazards && rapid.hazards.length > 0 && (
              <div class="mb-4">
                <p class="font-bold text-brand-orange mb-2 text-sm uppercase tracking-wide">
                  Hazards:
                </p>
                <ul class="space-y-1 font-body text-sm">
                  {rapid.hazards.map((hazard: string) => (
                    <li class="flex items-start">
                      <span class="text-brand-orange font-bold mr-2">⚠</span>
                      <span>{hazard}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <!-- Kim's Note (font-hand) -->
            {rapid.kimNote && (
              <div class="mt-4 pt-4 border-t border-gray-200">
                <p class="font-hand text-sm italic text-brand-brown bg-brand-cream p-3 rounded-sm">
                  {rapid.kimNote}
                </p>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  </section>
)}
```

**Validation Checkpoints**:

- [ ] Color logic matches 3-level system (green/orange/brown)
- [ ] Ternaries ≤3 lines each
- [ ] Hazards use brand-orange for warnings
- [ ] Kim's notes use font-hand

---

### T007: Fishing Section

**Priority**: High
**Estimated Time**: 25 minutes
**Line Range**: 211-293
**Dependencies**: T006

**Description**:
Render fishing species with season, techniques, and Kim's tips.

**Pattern Reference**:

- Similar to rapids structure
- 2-column grid for details

**Implementation Structure**:

```astro
{fishing && fishing.length > 0 && (
  <section class="fishing-section bg-brand-cream py-12" aria-labelledby="fishing-heading">
    <div class="container mx-auto px-4">
      <h2 id="fishing-heading" class="font-display text-3xl md:text-4xl font-bold text-brand-brown mb-8">
        Fishing Opportunities
      </h2>

      <div class="space-y-6">
        {fishing.map((fish: RiverFishing) => (
          <article class="bg-white border-l-4 border-l-sign-green p-6 md:p-8 rounded-sm shadow-sm">
            <!-- Species name -->
            <h3 class="font-display text-2xl font-bold text-brand-brown mb-2">
              {fish.species}
            </h3>

            <!-- 2-Column Grid -->
            <div class="grid md:grid-cols-2 gap-6">
              <!-- Left: Season & Techniques -->
              <div class="space-y-3 font-body text-gray-800">
                <p>
                  <span class="font-bold text-brand-brown">Best Season:</span> {fish.season}
                </p>
                <p>
                  <span class="font-bold text-brand-brown">Techniques:</span> {fish.techniques}
                </p>
                {fish.sizeRange && (
                  <p>
                    <span class="font-bold text-brand-brown">Size Range:</span> {fish.sizeRange}
                  </p>
                )}
              </div>

              <!-- Right: Regulations -->
              {fish.regulations && (
                <div class="bg-brand-cream p-4 rounded-sm">
                  <p class="font-bold text-brand-brown mb-2 text-sm uppercase tracking-wide">
                    Regulations:
                  </p>
                  <p class="font-body text-gray-800 text-sm">
                    {fish.regulations}
                  </p>
                </div>
              )}
            </div>

            <!-- Kim's Note -->
            {fish.kimNote && (
              <div class="mt-4 pt-4 border-t border-gray-200">
                <p class="font-hand text-sm italic text-brand-brown bg-brand-cream p-3 rounded-sm">
                  {fish.kimNote}
                </p>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  </section>
)}
```

**Validation Checkpoints**:

- [ ] Sign-green border for all fishing cards
- [ ] 2-column responsive grid
- [ ] Regulations styled with cream background
- [ ] Kim's notes use font-hand

---

### T008: Outfitters Section (Contact Validation)

**Priority**: High
**Estimated Time**: 20 minutes
**Line Range**: 296-353
**Dependencies**: T007

**Description**:
Display outfitters with services, pricing, contact methods.

**Pattern Reference**:

- Similar to LakeTemplate Marina section (lines 211-293)

**Contact Handling** (from architecture.md):

- At least one contact method required (validated by Zod)
- Phone: format as click-to-call link
- Website: external link with noopener
- Email: mailto: link

**Implementation**:

```astro
{outfitters && outfitters.length > 0 && (
  <section class="outfitters-section bg-white py-12" aria-labelledby="outfitters-heading">
    <div class="container mx-auto px-4">
      <h2 id="outfitters-heading" class="font-display text-3xl md:text-4xl font-bold text-brand-brown mb-8">
        Outfitters & Guide Services
      </h2>

      <div class="space-y-6">
        {outfitters.map((outfitter: Outfitter) => (
          <article class="bg-white border-l-4 border-l-brand-brown p-8 rounded-sm shadow-sm">
            <h3 class="font-display text-2xl font-bold text-brand-brown mb-2">
              {outfitter.name}
            </h3>

            {outfitter.pricing && (
              <p class="font-body text-brand-orange font-bold mb-4">
                {outfitter.pricing}
              </p>
            )}

            <!-- Services List -->
            <div class="mb-6">
              <h4 class="font-bold text-brand-brown mb-3 uppercase tracking-wide text-sm">
                Services:
              </h4>
              <ul class="space-y-2 font-body">
                {outfitter.services.map((service: string) => (
                  <li class="flex items-start">
                    <span class="text-sign-green font-bold mr-2">•</span>
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            <!-- Contact Footer -->
            <div class="border-t border-gray-200 pt-4 flex flex-wrap gap-x-6 gap-y-2 font-body text-sm">
              {outfitter.contact.phone && (
                <a
                  href={`tel:${outfitter.contact.phone.replace(/\D/g, '')}`}
                  class="text-sign-green hover:underline"
                >
                  📞 {outfitter.contact.phone}
                </a>
              )}
              {outfitter.contact.website && (
                <a
                  href={outfitter.contact.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-sign-green hover:underline"
                >
                  🌐 Website
                </a>
              )}
              {outfitter.contact.email && (
                <a
                  href={`mailto:${outfitter.contact.email}`}
                  class="text-sign-green hover:underline"
                >
                  ✉️ {outfitter.contact.email}
                </a>
              )}
            </div>

            <!-- Certifications -->
            {outfitter.certifications && outfitter.certifications.length > 0 && (
              <div class="mt-4 flex flex-wrap gap-2">
                {outfitter.certifications.map((cert: string) => (
                  <span class="inline-block bg-sign-green text-white px-3 py-1 rounded-sm font-body text-xs font-medium">
                    {cert}
                  </span>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  </section>
)}
```

**Validation Checkpoints**:

- [ ] Phone numbers formatted for tel: links
- [ ] External links use target="_blank" + rel="noopener"
- [ ] At least one contact method displayed
- [ ] Pricing uses brand-orange

---

### T009: Seasonal Flow Section (NEW)

**Priority**: High
**Estimated Time**: 25 minutes
**Line Range**: 356-445
**Dependencies**: T008

**Description**:
NEW SECTION: Display seasonal flow levels with CFS ranges and color-coded levels.

**Pattern Reference**:

- Similar to LakeTemplate Seasonal Guide (lines 356-426)
- 4-column responsive grid

**Color Coding by Flow Level**:

- low: sign-green
- medium: sign-green
- high: brand-orange
- flood: brand-brown

**Implementation**:

```astro
{flowLevels && flowLevels.length > 0 && (
  <section class="seasonal-flow bg-brand-cream py-12" aria-labelledby="flow-heading">
    <div class="container mx-auto px-4">
      <h2 id="flow-heading" class="font-display text-3xl md:text-4xl font-bold text-brand-brown mb-8">
        Seasonal Flow Levels
      </h2>

      <!-- 4-Column Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {flowLevels.map((flow: SeasonalFlow) => (
          <article class="bg-white p-6 rounded-sm shadow-sm">
            <!-- Season Name -->
            <h3 class="font-display text-xl font-bold text-brand-brown mb-4 border-b-2 border-b-sign-green pb-2">
              {flow.season}
            </h3>

            <!-- Flow Level Badge -->
            <div class="mb-4">
              <span class={`inline-block px-3 py-1 rounded-sm font-body text-xs font-bold text-white ${
                flow.level === 'low' || flow.level === 'medium'
                  ? 'bg-sign-green'
                  : flow.level === 'high'
                  ? 'bg-brand-orange'
                  : 'bg-brand-brown'
              }`}>
                {flow.level.toUpperCase()}
              </span>
            </div>

            <!-- CFS Range (if provided) -->
            {flow.cfsRange && (
              <div class="mb-3">
                <p class="font-bold text-sm uppercase tracking-wide text-brand-brown mb-1">
                  CFS Range:
                </p>
                <p class="font-body text-sm text-gray-700">
                  {flow.cfsRange.min.toLocaleString()} - {flow.cfsRange.max.toLocaleString()} CFS
                </p>
              </div>
            )}

            <!-- Description -->
            <p class="font-body text-sm text-gray-700 mb-4">
              {flow.description}
            </p>

            <!-- Kim's Note -->
            {flow.kimNote && (
              <div class="mt-4 pt-4 border-t border-gray-200">
                <p class="font-hand text-xs italic text-brand-brown bg-brand-cream p-2 rounded-sm">
                  {flow.kimNote}
                </p>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  </section>
)}
```

**Validation Checkpoints**:

- [ ] 4-column grid on desktop (lg:grid-cols-4)
- [ ] Color badges match flow level logic
- [ ] CFS ranges use toLocaleString() for commas
- [ ] Kim's notes smaller (text-xs) to fit cards

---

### T010: Access Points Section (NEW)

**Priority**: High
**Estimated Time**: 25 minutes
**Line Range**: 448-542
**Dependencies**: T009

**Description**:
NEW SECTION: Display access points with GPS links, shuttle info, features.

**Pattern Reference**:

- 2-column grid like LakeTemplate Marina

**GPS Link Pattern** (from best-practices research):

```astro
{coordinates && (
  <a
    href={`https://www.google.com/maps/?q=${coordinates}`}
    target="_blank"
    rel="noopener noreferrer"
    class="text-sign-green hover:underline"
  >
    📍 Open in Maps
  </a>
)}
```

**Implementation**:

```astro
{accessPoints && accessPoints.length > 0 && (
  <section class="access-points bg-white py-12" aria-labelledby="access-heading">
    <div class="container mx-auto px-4">
      <h2 id="access-heading" class="font-display text-3xl md:text-4xl font-bold text-brand-brown mb-8">
        Access Points
      </h2>

      <!-- 2-Column Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        {accessPoints.map((point: AccessPoint) => (
          <article class="bg-white border-l-4 border-l-sign-green p-6 rounded-sm shadow-sm">
            <h3 class="font-display text-xl font-bold text-brand-brown mb-2">
              {point.name}
            </h3>

            <!-- Type Badge -->
            <p class="text-sm text-gray-600 mb-4">
              <span class="inline-block bg-brand-cream px-2 py-1 rounded-sm font-body text-xs font-medium">
                {point.type.replace(/-/g, ' ').toUpperCase()}
              </span>
              {point.typeNotes && (
                <span class="ml-2 italic">({point.typeNotes})</span>
              )}
            </p>

            <!-- Features List -->
            <div class="mb-4">
              <p class="font-bold text-brand-brown mb-2 text-sm uppercase tracking-wide">
                Features:
              </p>
              <ul class="space-y-1 font-body text-sm">
                {point.features.map((feature: string) => (
                  <li class="flex items-start">
                    <span class="text-sign-green font-bold mr-2">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <!-- GPS & Fees -->
            <div class="flex flex-wrap gap-x-4 gap-y-2 font-body text-sm">
              {point.coordinates && (
                <a
                  href={`https://www.google.com/maps/?q=${point.coordinates}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-sign-green hover:underline"
                >
                  📍 GPS: {point.coordinates}
                </a>
              )}
              {point.fees && (
                <span class="text-gray-700">
                  <span class="font-bold">Fee:</span> {point.fees}
                </span>
              )}
            </div>

            <!-- External Map Link -->
            {point.mapLink && (
              <div class="mt-3">
                <a
                  href={point.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-sign-green hover:underline font-body text-sm font-medium"
                >
                  View Detailed Map →
                </a>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  </section>
)}
```

**Validation Checkpoints**:

- [ ] GPS links format correctly
- [ ] Type badges replace hyphens with spaces
- [ ] Features use checkmark bullets (✓)
- [ ] External links use noopener

---

### T011: Safety & Nearby Attractions

**Priority**: Medium
**Estimated Time**: 20 minutes
**Line Range**: 545-697
**Dependencies**: T010

**Description**:
Implement safety warnings (orange borders) and nearby attractions grid.

**Safety Section** (from LakeTemplate lines 429-479):

```astro
{/* Placeholder for safety section - similar to regulations */}
<section class="safety-section bg-brand-cream py-12">
  <div class="container mx-auto px-4">
    <h2 class="font-display text-3xl md:text-4xl font-bold text-brand-brown mb-8">
      Safety & Regulations
    </h2>
    <div class="space-y-6">
      <!-- Safety cards with border-l-brand-orange -->
    </div>
  </div>
</section>
```

**Nearby Attractions** (NEW):

```astro
{attractions && attractions.length > 0 && (
  <section class="attractions bg-white py-12" aria-labelledby="attractions-heading">
    <div class="container mx-auto px-4">
      <h2 id="attractions-heading" class="font-display text-3xl md:text-4xl font-bold text-brand-brown mb-8">
        Nearby Attractions
      </h2>

      <!-- 3-Column Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {attractions.map((attraction: RiverAttraction) => (
          <article class="bg-white border-l-4 border-l-sign-green p-6 rounded-sm shadow-sm">
            <h3 class="font-display text-lg font-bold text-brand-brown mb-2">
              {attraction.name}
            </h3>
            <p class="text-sm text-gray-600 mb-3 uppercase tracking-wide">
              {attraction.type}
            </p>
            <p class="font-body text-sm text-gray-700 mb-3">
              {attraction.description}
            </p>
            {attraction.distance && (
              <p class="font-body text-xs text-gray-600 mb-2">
                📍 {attraction.distance}
              </p>
            )}
            {attraction.link && (
              <a
                href={attraction.link}
                target="_blank"
                rel="noopener noreferrer"
                class="text-sign-green hover:underline font-body text-sm"
              >
                Learn More →
              </a>
            )}
          </article>
        ))}
      </div>
    </div>
  </section>
)}
```

**Validation Checkpoints**:

- [ ] Safety uses border-l-brand-orange
- [ ] Attractions use 3-column grid
- [ ] Distance indicator with emoji
- [ ] External links validated

---

### T012: Gear Checklist Integration

**Priority**: Medium
**Estimated Time**: 8 minutes
**Line Range**: 621-632
**Dependencies**: T011

**Description**:
Integrate AdventureGearChecklist shared component.

**Pattern Reference**:

- LakeTemplate lines 484-492

**Implementation**:

```astro
{gearList && gearList.length > 0 && (
  <AdventureGearChecklist
    title="What to Bring"
    intro="Make sure you have everything you need for a safe day on the river!"
    items={gearList}
    columns={3}
    variant="white"
  />
)}
```

---

### T013: Shop Categories Integration

**Priority**: Medium
**Estimated Time**: 8 minutes
**Line Range**: 633-645
**Dependencies**: T012

**Description**:
Integrate AdventureRelatedShop shared component.

**Pattern Reference**:

- LakeTemplate lines 495-523

**Implementation**:

```astro
{relatedShop && relatedShop.length > 0 && (
  <AdventureRelatedShop
    title="Shop Before You Go"
    description="Stock up on everything you need at WV Wild Outdoors!"
    categories={relatedShop}
    columns={3}
    variant="cream"
  />
)}
```

---

### T014: CTA Integration

**Priority**: Medium
**Estimated Time**: 4 minutes
**Line Range**: 646-650
**Dependencies**: T013

**Description**:
Integrate AdventureCTA shared component.

**Implementation**:

```astro
<AdventureCTA
  heading="Stop By Before You Head Out"
  description="Get the latest river conditions, pick up your permit, and grab everything you need for a successful day on the water."
  primaryText="Visit Our Shop"
  primaryHref="/shop/paddling"
  secondaryText="Call Us"
  secondaryHref="tel:+13046134570"
/>
```

---

### T015: Scoped Styles

**Priority**: Low
**Estimated Time**: 20 minutes
**Line Range**: 653-660
**Dependencies**: T014

**Description**:
Add scoped styles enforcing rounded-sm and motion preferences.

**Pattern Reference**:

- LakeTemplate lines 538-557

**Implementation**:

```astro
<style>
  /* WVWO Compliance: Only rounded-sm allowed */
  .rounded-sm {
    border-radius: 0.125rem;
  }

  /* WVWO Compliance: Scoped to river-template class */
  .river-template .rounded-sm {
    border-radius: 0.125rem !important;
  }

  /* Motion preferences */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
</style>
```

---

### T016: WVWO Compliance Validation

**Priority**: Critical
**Estimated Time**: 5 minutes
**Line Range**: All
**Dependencies**: T015

**Description**:
Final validation pass for WVWO compliance.

**Validation Checklist**:

```markdown
### Fonts
- [ ] Headings use font-display (Bitter)
- [ ] Kim's notes use font-hand (Permanent Marker)
- [ ] Body text uses font-body (Noto Sans)
- [ ] NO Inter, Poppins, DM Sans, etc.

### Colors
- [ ] Primary: brand-brown (#3E2723)
- [ ] Accent: sign-green (#2E7D32)
- [ ] Background: brand-cream (#FFF8E1)
- [ ] CTA: brand-orange (#FF6F00) <5% of screen
- [ ] NO purple, pink, neon

### Borders
- [ ] ONLY rounded-sm used
- [ ] NO rounded-md, rounded-lg, rounded-xl

### Voice
- [ ] No "revolutionize", "seamless", "unlock"
- [ ] Kim's authentic rural WV voice
- [ ] Direct, humble, faith-forward tone

### Accessibility
- [ ] All sections have aria-labelledby
- [ ] Images have alt text
- [ ] Links have descriptive text
- [ ] Color contrast ≥4.5:1
```

---

## Phase 2 Summary

### Total Effort Breakdown

| Category | Tasks | Time | Lines |
|----------|-------|------|-------|
| Foundation | T001-T003 | 25 min | 1-60 |
| Hero & Description | T004-T005 | 30 min | 61-150 |
| Core Sections | T006-T011 | 145 min | 151-620 |
| Shared Components | T012-T014 | 20 min | 621-650 |
| Styles & Validation | T015-T016 | 25 min | 651-660 |
| **TOTAL** | **16 tasks** | **245 min (4h 5m)** | **660 lines** |

### Critical Path

```
T001 → T002 → T003 → T004 → T005 → T006 → T007 → T008 → T009 → T010 → T011 → T012 → T013 → T014 → T015 → T016
```

### Parallel Work Opportunities

None - all tasks are sequential due to monolithic component structure.

### Risk Mitigation

1. **Complex ternaries**: Keep color logic ≤3 lines
2. **Type mismatches**: Reference architecture.md for prop shapes
3. **Missing patterns**: Use LakeTemplate as reference for unknown structures

---

## References

**Architecture Documents**:

- `river-type-system-architecture.md` - Type definitions and validation
- `river-guide-website-best-practices.md` - UX patterns and accessibility

**Pattern Sources**:

- `LakeTemplate.astro` - Component structure patterns
- `CLAUDE.md` - WVWO compliance rules

**Type Definitions**:

- `src/types/adventure.ts` - RiverTemplateProps interface
- Import locations documented in T001

---

**End of Phase 2 Task Breakdown**
*Ready for implementation by coder agent with 4-hour effort estimate*
