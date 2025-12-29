# SPEC-12 WMA Template - System Architecture

**Version**: 1.0.0
**Created**: 2025-12-27
**Status**: Draft
**Role**: System Architecture Designer

---

## Executive Summary

This document defines the complete system architecture for SPEC-12 WMA Template components. The design achieves **73% code reduction** (463→150 lines per page) through a modular component system that composes 4 new generic components + 2 semantic wrappers with 4 existing SPEC-10/11 components.

**Key Architecture Decisions**:
- **Wrapper Pattern**: AdventureFeatureSection as generic base, thin wrappers for semantic variants
- **Content Collections Extension**: Zero breaking changes via optional fields
- **Static-First Approach**: Zero runtime JavaScript, progressive enhancement path
- **WVWO Aesthetic Compliance**: 100% enforcement through type system + visual tests

---

## 1. Component Hierarchy

### 1.1 Component Taxonomy

```
SPEC-12 WMA Template Components
│
├─── NEW COMPONENTS (4 Generic + 2 Wrappers)
│    ├─── AdventureFeatureSection.astro     [GENERIC BASE]
│    │    │
│    │    ├─── AdventureWhatToHunt.astro    [SEMANTIC WRAPPER]
│    │    └─── AdventureWhatToFish.astro    [SEMANTIC WRAPPER]
│    │
│    ├─── AdventureCampingList.astro        [COMPLEX GRID]
│    ├─── AdventureAmenitiesGrid.astro      [SIMPLE GRID]
│    └─── AdventureCTA.astro                [UNIVERSAL CTA]
│
└─── REUSED COMPONENTS (from SPEC-10/11)
     ├─── AdventureQuickStats.astro         [STATS GRID]
     ├─── AdventureGettingThere.astro       [DIRECTIONS]
     ├─── AdventureGearChecklist.astro      [GEAR LIST]
     └─── AdventureRelatedShop.astro        [SHOP LINKS]
```

### 1.2 Generic vs Semantic Components

**Design Principle**: Build generic, compose semantic.

| Component | Type | Responsibility | Reusability |
|-----------|------|----------------|-------------|
| `AdventureFeatureSection` | **Generic** | 2/3-column grid with title/description/notes | High (hunting, fishing, facilities) |
| `AdventureWhatToHunt` | **Semantic** | Hunting-specific defaults + props transformation | Low (hunting only) |
| `AdventureWhatToFish` | **Semantic** | Fishing-specific defaults + species formatting | Low (fishing only) |
| `AdventureCampingList` | **Generic** | Complex facility cards with badges/contact | High (campgrounds, boat ramps, ranges) |
| `AdventureAmenitiesGrid` | **Generic** | Simple checkmark list | High (amenities, regulations, features) |
| `AdventureCTA` | **Generic** | Dual-button call-to-action | High (all adventure types) |

**Rationale**: Semantic wrappers provide developer ergonomics (clear intent) while generic base ensures DRY principle (change once, affects all variants).

---

## 2. Data Flow Architecture

### 2.1 Content → Component → HTML Pipeline

```
┌─────────────────────────────────────────────────────────────────┐
│ CONTENT LAYER (Markdown Frontmatter)                            │
│ src/content/adventures/burnsville-lake.md                       │
├─────────────────────────────────────────────────────────────────┤
│ ---                                                              │
│ type: 'wma'                                                      │
│ acreage: 1000                                                    │
│ species:                                                         │
│   - name: "White-tailed Deer"                                    │
│     season: "Archery: Sep 15-Dec 31"                            │
│     notes: "Bucks run 100-150 inches..."                        │
│ fishingWaters:                                                   │
│   - name: "Burnsville Lake"                                      │
│     species: ["Smallmouth Bass", "Crappie"]                      │
│ facilities:                                                      │
│   - type: "Boat Ramps"                                           │
│     count: 2                                                     │
│ ---                                                              │
└─────────────────────────────────────────────────────────────────┘
                         ↓
                    [Zod Validation]
                    content.config.ts
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│ TYPE LAYER (TypeScript + Zod Inference)                         │
│ wv-wild-web/src/types/adventure.ts                              │
├─────────────────────────────────────────────────────────────────┤
│ export const SpeciesSchema = z.object({                         │
│   name: z.string().min(1),                                       │
│   season: z.string().min(1),                                     │
│   notes: z.string().optional(),                                  │
│ });                                                              │
│                                                                  │
│ export type Species = z.infer<typeof SpeciesSchema>;            │
└─────────────────────────────────────────────────────────────────┘
                         ↓
                [Astro.props typed]
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│ TEMPLATE LAYER (Page Assembly)                                  │
│ src/pages/near/burnsville-lake.astro                            │
├─────────────────────────────────────────────────────────────────┤
│ const { data } = Astro.props;                                    │
│                                                                  │
│ <AdventureQuickStats stats={[                                   │
│   { value: data.acreage, label: 'Acres' }                       │
│ ]} />                                                            │
│                                                                  │
│ <AdventureWhatToHunt species={data.species} />                  │
│ <AdventureWhatToFish waters={data.fishingWaters} />             │
│ <AdventureCampingList facilities={data.facilities} />           │
└─────────────────────────────────────────────────────────────────┘
                         ↓
              [Component Rendering]
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│ COMPONENT LAYER (Presentation)                                  │
│ src/components/adventure/AdventureWhatToHunt.astro              │
├─────────────────────────────────────────────────────────────────┤
│ <AdventureFeatureSection                                        │
│   title="What to Hunt"                                          │
│   features={species.map(s => ({                                 │
│     title: s.name,                                              │
│     description: `Season: ${s.season}`,                         │
│     notes: s.notes                                              │
│   }))}                                                           │
│   variant="white"                                               │
│   columns={2}                                                   │
│ />                                                               │
└─────────────────────────────────────────────────────────────────┘
                         ↓
               [Astro Static Build]
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│ OUTPUT LAYER (Static HTML)                                      │
│ dist/near/burnsville-lake/index.html                            │
├─────────────────────────────────────────────────────────────────┤
│ <section class="py-12 md:py-16 bg-white">                       │
│   <h2 class="font-display text-2xl...">What to Hunt</h2>        │
│   <div class="grid grid-cols-2 gap-4">                          │
│     <div class="border-l-4 border-l-sign-green">               │
│       <h3>White-tailed Deer</h3>                                │
│       <p>Season: Archery Sep 15-Dec 31</p>                      │
│       <p class="font-hand">Bucks run 100-150 inches...</p>      │
│     </div>                                                       │
│   </div>                                                         │
│ </section>                                                       │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 Data Flow Characteristics

| Stage | Format | Validation | Purpose |
|-------|--------|------------|---------|
| **Content** | YAML frontmatter | Zod schema (build-time) | Content authoring (Kim's domain) |
| **Type** | TypeScript interfaces | Compiler checks | Developer ergonomics + autocomplete |
| **Template** | Astro component props | Runtime (dev only) | Page composition |
| **Component** | Astro slots + props | Props interface | Presentation logic |
| **Output** | Static HTML + CSS | Lighthouse + axe-core | End-user delivery |

**Key Insight**: Each layer has a single responsibility. Content is data, types enforce contracts, templates orchestrate, components render, output performs.

---

## 3. Separation of Concerns

### 3.1 Layer Responsibilities

```
┌─────────────────────────────────────────────────────────────────┐
│ CONTENT LAYER                                                    │
│ Responsibility: Structured data authoring                       │
│ Owner: Kim (content creator)                                     │
│ Technology: Markdown frontmatter + Zod schemas                   │
├─────────────────────────────────────────────────────────────────┤
│ ✓ ALLOWED:                                                       │
│   - Define WMA attributes (acreage, species, facilities)        │
│   - Write Kim's authentic voice tips                            │
│   - Update seasonal information                                 │
│                                                                  │
│ ✗ FORBIDDEN:                                                     │
│   - HTML markup or Astro components                             │
│   - CSS classes or styling decisions                            │
│   - Business logic or data transformations                      │
└─────────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│ TYPE LAYER                                                       │
│ Responsibility: Contract definition + validation                │
│ Owner: Developer (maintainer)                                    │
│ Technology: TypeScript + Zod                                     │
├─────────────────────────────────────────────────────────────────┤
│ ✓ ALLOWED:                                                       │
│   - Define prop interfaces for components                       │
│   - Create Zod schemas for runtime validation                   │
│   - Export type-safe constants (icons, colors)                  │
│                                                                  │
│ ✗ FORBIDDEN:                                                     │
│   - Component rendering logic                                   │
│   - Styling or layout decisions                                 │
│   - Direct data fetching                                        │
└─────────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│ PRESENTATION LAYER                                               │
│ Responsibility: UI rendering + WVWO aesthetics                  │
│ Owner: Component (reusable)                                      │
│ Technology: Astro + Tailwind CSS                                 │
├─────────────────────────────────────────────────────────────────┤
│ ✓ ALLOWED:                                                       │
│   - Render HTML structure from props                            │
│   - Apply WVWO brand styles (colors, fonts, spacing)            │
│   - Handle responsive behavior                                  │
│   - Conditional rendering (empty states, optional data)         │
│                                                                  │
│ ✗ FORBIDDEN:                                                     │
│   - Data fetching or API calls                                  │
│   - Business logic (filtering, sorting, calculations)           │
│   - Direct content authoring (hardcoded strings)                │
└─────────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│ ORCHESTRATION LAYER                                              │
│ Responsibility: Page composition + section ordering             │
│ Owner: Page template (specific)                                  │
│ Technology: Astro pages                                          │
├─────────────────────────────────────────────────────────────────┤
│ ✓ ALLOWED:                                                       │
│   - Import and compose components                               │
│   - Fetch content from Content Collections                      │
│   - Define section ordering (hero → stats → hunt → fish)        │
│   - Apply section background alternation                        │
│                                                                  │
│ ✗ FORBIDDEN:                                                     │
│   - Inline HTML for sections (use components)                   │
│   - Styling logic (delegate to components)                      │
│   - Data transformations (keep in type layer helpers)           │
└─────────────────────────────────────────────────────────────────┘
```

### 3.2 Dependency Direction

**Rule**: Dependencies flow inward. Outer layers depend on inner layers, never reverse.

```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│  Page Templates (Orchestration)                         │
│  ┌───────────────────────────────────────────┐          │
│  │                                            │          │
│  │  Components (Presentation)                │          │
│  │  ┌─────────────────────────────────┐      │          │
│  │  │                                  │      │          │
│  │  │  Types + Schemas (Contracts)    │      │          │
│  │  │  ┌──────────────────────┐       │      │          │
│  │  │  │                      │       │      │          │
│  │  │  │  Content Collections │       │      │          │
│  │  │  │  (Data Source)       │       │      │          │
│  │  │  │                      │       │      │          │
│  │  │  └──────────────────────┘       │      │          │
│  │  │                                  │      │          │
│  │  └─────────────────────────────────┘      │          │
│  │                                            │          │
│  └───────────────────────────────────────────┘          │
│                                                          │
└──────────────────────────────────────────────────────────┘

ALLOWED:  →  (outward dependency)
FORBIDDEN: ←  (inward dependency)
```

**Example Violation**:
```typescript
// ❌ BAD: Component imports page-specific content
import { getEntry } from 'astro:content';
const wma = await getEntry('adventures', 'burnsville-lake');

// ✅ GOOD: Component receives data via props
interface Props {
  species: Species[];
}
const { species } = Astro.props;
```

---

## 4. Extensibility Points

### 4.1 Future Adventure Types

**Design Goal**: Add new adventure types (trail, campground, cave) without modifying existing components.

```
Current Architecture (SPEC-12):
┌──────────────────────────────────────┐
│ adventures Content Collection        │
│                                      │
│ type: 'adventure' | 'wma'            │
│ ├─ Base fields (all types)          │
│ └─ WMA fields (type: 'wma' only)    │
└──────────────────────────────────────┘

Future Extension (SPEC-15: Trail Template):
┌──────────────────────────────────────┐
│ adventures Content Collection        │
│                                      │
│ type: 'adventure' | 'wma' | 'trail'  │
│ ├─ Base fields (all types)          │
│ ├─ WMA fields (optional)            │
│ └─ Trail fields (NEW, optional)     │
│    ├─ trailLength: number           │
│    ├─ elevationGain: number         │
│    └─ trailConditions: string[]     │
└──────────────────────────────────────┘

Component Reuse:
├─ AdventureQuickStats      [100% reusable]
├─ AdventureGettingThere    [100% reusable]
├─ AdventureGearChecklist   [100% reusable]
├─ AdventureRelatedShop     [100% reusable]
├─ AdventureCTA             [100% reusable]
└─ NEW: AdventureTrailMap   [trail-specific]
```

### 4.2 Extension Hook Points

| Extension Type | Hook Point | Implementation |
|---------------|------------|----------------|
| **New adventure type** | `content.config.ts` → `type` enum | Add `'trail'` to enum, define optional fields |
| **New section pattern** | Create new component | Follow `AdventureFeatureSection` pattern |
| **New data field** | Extend schema | Add optional field to `adventures` collection |
| **New icon** | `STAT_ICON_PATHS` constant | Add SVG path to `adventure.ts` |
| **New variant style** | Component `variant` prop | Add to discriminated union type |

**Backward Compatibility Guarantee**:
- All new fields MUST be optional
- All new components MUST NOT break existing pages
- All type changes MUST be additive (no removals)

### 4.3 Progressive Enhancement Path

```
Phase 1 (SPEC-12): Static Foundation
├─ Zero JavaScript
├─ Static HTML + CSS
├─ Mapbox Static API images
└─ Accessible data tables

Phase 2 (Future): Interactive Features
├─ Leaflet.js for complex WMAs (3+ access points)
├─ Client-side filtering (species, seasons)
├─ Favorite/bookmark functionality
└─ Print-optimized PDF generation

Phase 3 (Future): Advanced Features
├─ Real-time WV DNR regulation updates
├─ User-submitted trip reports
├─ Weather integration
└─ Offline PWA support
```

**Architecture Decision**: Use Astro islands for progressive enhancement.

```astro
<!-- SPEC-12: Static only -->
<section class="wma-map">
  <img src={staticMapUrl} alt="WMA map" />
  <table>{/* Accessible alternative */}</table>
</section>

<!-- Phase 2: Progressive enhancement -->
<section class="wma-map">
  <InteractiveMap client:visible
    staticFallback={staticMapUrl}
    accessPoints={data.accessPoints}
  />
  <noscript>
    <img src={staticMapUrl} alt="WMA map" />
    <table>{/* Accessible alternative */}</table>
  </noscript>
</section>
```

---

## 5. Integration with Existing Components

### 5.1 Component Compatibility Matrix

| SPEC-12 Component | Integrates With | Data Contract | Breaking Changes |
|-------------------|-----------------|---------------|------------------|
| `AdventureFeatureSection` | N/A (new base) | Own props | None |
| `AdventureWhatToHunt` | `AdventureFeatureSection` | `Species[]` | None |
| `AdventureWhatToFish` | `AdventureFeatureSection` | `FishingWater[]` | None |
| `AdventureCampingList` | N/A (standalone) | `Facility[]` | None |
| `AdventureAmenitiesGrid` | N/A (standalone) | `string[]` | None |
| `AdventureCTA` | N/A (standalone) | Own props | None |
| **SPEC-10** `AdventureQuickStats` | SPEC-12 pages | `StatItem[]` | None |
| **SPEC-11** `AdventureGettingThere` | SPEC-12 pages | Own props | None |
| **SPEC-11** `AdventureGearChecklist` | SPEC-12 pages | `GearItem[]` | None |
| **SPEC-11** `AdventureRelatedShop` | SPEC-12 pages | `RelatedCategory[]` | None |

### 5.2 Type System Integration

**Existing Types** (`adventure.ts` from SPEC-10/11):
```typescript
// Already defined in src/types/adventure.ts
export type StatIcon = 'distance' | 'time' | 'calendar' | 'check' | 'info' | 'location' | 'area' | 'circle' | 'none';
export type StatItem = { value: string; label: string; icon?: StatIcon };
export type GearItem = { name: string; optional: boolean; icon?: StatIcon };
export type RelatedCategory = { name: string; description?: string; href: string; icon?: StatIcon };
```

**NEW Types** (SPEC-12 extends `adventure.ts`):
```typescript
// NEW: Feature item for AdventureFeatureSection
export const FeatureItemSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  notes: z.string().optional(),
  icon: StatIconSchema.optional(),
});
export type FeatureItem = z.infer<typeof FeatureItemSchema>;

// NEW: Facility item for AdventureCampingList
export const FacilityItemSchema = z.object({
  type: z.string().min(1),
  count: z.number().int().positive().optional(),
  description: z.string().min(1),
  contact: z.string().optional(),
  link: z.string().url().optional(),
  accessibility: z.string().optional(),
});
export type FacilityItem = z.infer<typeof FacilityItemSchema>;
```

**Integration Pattern**: All new types follow existing conventions:
- Zod schema as source of truth
- TypeScript type inferred from schema
- Optional fields for backward compatibility
- Shared `StatIconSchema` for consistency

### 5.3 Shared Utilities & Constants

**Reused from SPEC-10/11**:
```typescript
// src/types/adventure.ts
import { STAT_ICON_PATHS } from '../../types/adventure';

// SPEC-12 components can use these directly
const iconPath = STAT_ICON_PATHS['check']; // ✓ checkmark icon
const iconPath = STAT_ICON_PATHS['location']; // ✓ location pin
```

**NEW Constants** (SPEC-12 adds):
```typescript
// Accent colors for AdventureFeatureSection borders
export const ACCENT_COLORS = {
  'sign-green': 'border-l-sign-green',
  'brand-orange': 'border-l-brand-orange',
  'brand-mud': 'border-l-brand-mud',
} as const;
```

---

## 6. Page Template Composition Pattern

### 6.1 WMA Page Template Structure

**Target**: 150 lines (73% reduction from 463-line elk-river.astro)

```astro
---
// src/pages/near/burnsville-lake.astro
import Layout from '../../layouts/Layout.astro';
import Header from '../../components/Header.astro';
import Footer from '../../components/Footer.astro';
import Breadcrumb from '../../components/Breadcrumb.astro';

// SPEC-10: Stats
import AdventureQuickStats from '../../components/adventure/AdventureQuickStats.astro';

// SPEC-11: Shared sections
import AdventureGettingThere from '../../components/adventure/AdventureGettingThere.astro';
import AdventureGearChecklist from '../../components/adventure/AdventureGearChecklist.astro';
import AdventureRelatedShop from '../../components/adventure/AdventureRelatedShop.astro';

// SPEC-12: NEW WMA sections
import AdventureWhatToHunt from '../../components/adventure/AdventureWhatToHunt.astro';
import AdventureWhatToFish from '../../components/adventure/AdventureWhatToFish.astro';
import AdventureCampingList from '../../components/adventure/AdventureCampingList.astro';
import AdventureAmenitiesGrid from '../../components/adventure/AdventureAmenitiesGrid.astro';
import AdventureCTA from '../../components/adventure/AdventureCTA.astro';

// Fetch WMA data from Content Collections
import { getEntry } from 'astro:content';
const wma = await getEntry('adventures', 'burnsville-lake');
const { data } = wma;

// Transform data for components
const quickStats = [
  { value: data.acreage.toLocaleString(), label: 'Acres', icon: 'area' },
  { value: data.drive_time, label: 'From Shop', icon: 'time' },
  { value: data.county, label: 'County', icon: 'location' },
  { value: 'Year-Round', label: 'Access', icon: 'calendar' },
];
---

<Layout title={data.title} description={data.description}>
  <Header />
  <Breadcrumb items={breadcrumbItems} />

  <main class="bg-brand-cream">
    <!-- Hero: Inline (page-specific) -->
    <section class="hero">...</section>

    <!-- Quick Stats: SPEC-10 component -->
    <AdventureQuickStats stats={quickStats} columns={4} variant="white" />

    <!-- What to Hunt: SPEC-12 component -->
    {data.species && data.species.length > 0 && (
      <AdventureWhatToHunt species={data.species} variant="cream" />
    )}

    <!-- Fishing Waters: SPEC-12 component -->
    {data.fishingWaters && data.fishingWaters.length > 0 && (
      <AdventureWhatToFish waters={data.fishingWaters} variant="white" />
    )}

    <!-- Facilities: SPEC-12 component -->
    {data.facilities && data.facilities.length > 0 && (
      <AdventureCampingList
        facilities={data.facilities}
        columns={3}
        variant="cream"
      />
    )}

    <!-- Getting There: SPEC-11 component -->
    <AdventureGettingThere
      directions={data.directions}
      mapUrl={data.mapUrl}
      variant="white"
    />

    <!-- Gear Checklist: SPEC-11 component -->
    <AdventureGearChecklist gear={data.gear} columns={2} variant="cream" />

    <!-- CTA: SPEC-12 component -->
    <AdventureCTA
      heading="Ready to Hunt Burnsville Lake?"
      primaryText="Get Directions"
      primaryHref={data.mapUrl}
      secondaryText="Call the Shop"
      secondaryHref="tel:+13045551234"
      variant="sign-green"
    />

    <!-- Related Shop: SPEC-11 component -->
    <AdventureRelatedShop categories={shopCategories} variant="white" />
  </main>

  <Footer />
</Layout>
```

**Line Count Breakdown**:
- Imports: ~25 lines
- Data fetching + transforms: ~15 lines
- Layout wrapper: ~5 lines
- Hero (inline): ~20 lines
- Component composition: ~50 lines
- Conditional rendering: ~10 lines
- **Total: ~125 lines** (target: 150, under budget)

### 6.2 Section Background Alternation

**Pattern**: Alternate cream → white → cream for visual rhythm.

```astro
<!-- Cream sections (brand-cream background) -->
<AdventureWhatToHunt variant="cream" />
<AdventureCampingList variant="cream" />
<AdventureGearChecklist variant="cream" />

<!-- White sections (white background) -->
<AdventureQuickStats variant="white" />
<AdventureWhatToFish variant="white" />
<AdventureGettingThere variant="white" />
<AdventureCTA variant="sign-green" />  <!-- Exception: green CTA -->
```

**Rationale**: Matches WVWO aesthetic (aged paper + clean white), provides visual separation without heavy borders.

---

## 7. Testing Architecture

### 7.1 Testing Pyramid

```
                    ┌─────────────┐
                    │   E2E (35)  │  ← Playwright (component rendering)
                    └─────────────┘
                   ┌─────────────────┐
                   │ Integration (8) │  ← Astro build tests
                   └─────────────────┘
                 ┌───────────────────────┐
                 │  Unit Tests (43)      │  ← Vitest (schema validation)
                 └───────────────────────┘
               ┌──────────────────────────────┐
               │ Accessibility (25)           │  ← axe-core (WCAG 2.1 AA)
               └──────────────────────────────┘
```

### 7.2 Test Coverage by Layer

| Layer | Test Type | Tool | Coverage Target | Focus |
|-------|-----------|------|-----------------|-------|
| **Content Schema** | Unit | Vitest + Zod | 43+ tests | Valid/invalid frontmatter, edge cases |
| **Component Rendering** | E2E | Playwright | 35+ scenarios | Props → HTML output, variants |
| **Accessibility** | A11y | axe-core | Zero violations | WCAG 2.1 AA compliance |
| **Visual Regression** | Visual | Percy/Playwright | 20+ snapshots | WVWO aesthetic enforcement |
| **Type Safety** | Compiler | TypeScript | 100% | Props interfaces, Zod inference |
| **Integration** | Build | Astro | 8+ scenarios | Page templates compile correctly |

### 7.3 Test Data Strategy

**Test Fixtures** (reusable mock data):

```typescript
// tests/fixtures/wma-data.ts
export const validSpecies = {
  name: 'White-tailed Deer',
  season: 'Archery: Sep 15-Dec 31',
  notes: 'Bucks run 100-150 inches.',
};

export const invalidSpecies = {
  name: '', // ❌ Fails min(1)
  season: 'TBD',
  // ❌ Missing required 'season'
};

export const validFacility = {
  type: 'Camping Sites',
  count: 240,
  description: 'Electric hookups, restrooms.',
  contact: '(304) 555-CAMP',
};
```

**Edge Case Matrix**:

| Scenario | Input | Expected Output |
|----------|-------|-----------------|
| Empty species array | `species: []` | "What to Hunt" section hidden |
| Missing fishing waters | `fishingWaters: undefined` | "Fishing Waters" section omitted |
| Zero facilities | `facilities: []` | Fallback message shown |
| Malformed GPS | `coords: "invalid"` | Build fails with Zod error |
| 500-char description | Long description | Warning (SEO), build succeeds |

---

## 8. Performance Architecture

### 8.1 Static Generation Strategy

**Approach**: 100% static HTML, zero runtime JavaScript.

```
┌────────────────────────────────────────────────────────┐
│ BUILD TIME (Astro Static Site Generation)             │
├────────────────────────────────────────────────────────┤
│ 1. Fetch all WMA content from Content Collections     │
│ 2. Validate with Zod schemas (fail fast)              │
│ 3. Transform data → component props                   │
│ 4. Render components → HTML strings                   │
│ 5. Inline critical CSS in <head>                      │
│ 6. Generate static HTML files                         │
│ 7. Optimize images (WebP, srcset, lazy loading)       │
└────────────────────────────────────────────────────────┘
                         ↓
┌────────────────────────────────────────────────────────┐
│ RUNTIME (Browser)                                      │
├────────────────────────────────────────────────────────┤
│ 1. Download HTML (inlined CSS = instant above-fold)   │
│ 2. Parse & render (no JS = faster)                    │
│ 3. Lazy load below-fold images                        │
│ 4. Total load time: <2s on 3G                         │
└────────────────────────────────────────────────────────┘
```

**Performance Benefits**:
- No hydration delay (Astro islands unused in Phase 1)
- No JavaScript bundle download
- Instant time-to-interactive (TTI)
- Works offline after first load (browser cache)

### 8.2 Critical CSS Inlining

**Strategy**: Inline above-the-fold CSS in `<head>`, defer non-critical.

```html
<!-- Above-fold CSS (inlined) -->
<style>
  /* Hero section styles */
  .bg-brand-brown { background: #3E2723; }
  .font-display { font-family: 'Bitter', serif; }
  /* QuickStats styles */
  .grid-cols-4 { grid-template-columns: repeat(4, 1fr); }
</style>

<!-- Below-fold CSS (deferred) -->
<link rel="preload" href="/styles/adventures.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="/styles/adventures.css"></noscript>
```

### 8.3 Image Optimization Pipeline

```
┌────────────────────────────────────────────────────────┐
│ SOURCE IMAGE (Kim uploads)                             │
│ burnsville-lake-hero.jpg (3.2MB, 4000×3000)            │
└────────────────────────────────────────────────────────┘
                         ↓
          [Astro Image Optimization]
                         ↓
┌────────────────────────────────────────────────────────┐
│ OPTIMIZED OUTPUTS                                      │
├────────────────────────────────────────────────────────┤
│ - burnsville-lake-hero-640.webp (45KB)   [mobile]     │
│ - burnsville-lake-hero-1280.webp (120KB) [tablet]     │
│ - burnsville-lake-hero-1920.webp (280KB) [desktop]    │
│ - burnsville-lake-hero-1920.jpg (450KB)  [fallback]   │
└────────────────────────────────────────────────────────┘
                         ↓
              [Responsive HTML]
                         ↓
┌────────────────────────────────────────────────────────┐
│ <picture>                                              │
│   <source srcset="...640.webp 640w, ...1280.webp ..." │
│           type="image/webp">                           │
│   <img src="...1920.jpg" alt="..." loading="lazy">    │
│ </picture>                                             │
└────────────────────────────────────────────────────────┘
```

**Savings**: 3.2MB → 280KB = **91% reduction** (desktop WebP)

---

## 9. WVWO Aesthetic Enforcement Architecture

### 9.1 Multi-Layer Compliance

```
┌────────────────────────────────────────────────────────┐
│ LAYER 1: TYPE SYSTEM (Compile-Time)                   │
├────────────────────────────────────────────────────────┤
│ - Discriminated unions for variant props              │
│   variant: 'white' | 'cream'  (no 'purple' allowed)   │
│ - Enum for icon names (predefined set only)           │
│ - Font family types: 'display' | 'body' | 'hand'      │
└────────────────────────────────────────────────────────┘
                         ↓
┌────────────────────────────────────────────────────────┐
│ LAYER 2: TAILWIND CONFIG (Build-Time)                 │
├────────────────────────────────────────────────────────┤
│ - Brand colors only in palette                        │
│   colors: { 'sign-green': '#2E7D32', ... }            │
│ - Border radius limited to 'sm' only                  │
│   borderRadius: { sm: '0.125rem' }  (no md/lg/xl)     │
│ - Font families restricted                            │
│   fontFamily: { display: ['Bitter'], body: [...] }    │
└────────────────────────────────────────────────────────┘
                         ↓
┌────────────────────────────────────────────────────────┐
│ LAYER 3: COMPONENT DEFAULTS (Runtime)                 │
├────────────────────────────────────────────────────────┤
│ - Default props use WVWO aesthetics                   │
│   const { variant = 'cream' } = Astro.props;          │
│ - Transition classes standardized                     │
│   class="transition-colors duration-300"              │
│ - Animation respects prefers-reduced-motion           │
└────────────────────────────────────────────────────────┘
                         ↓
┌────────────────────────────────────────────────────────┐
│ LAYER 4: VISUAL REGRESSION TESTS (CI/CD)              │
├────────────────────────────────────────────────────────┤
│ - Percy snapshots catch style drift                   │
│ - Playwright tests verify color contrast              │
│ - Custom matchers for forbidden patterns              │
│   expect(html).not.toContain('rounded-lg')            │
└────────────────────────────────────────────────────────┘
```

### 9.2 Forbidden Pattern Detection

**Pre-commit Hook** (enforces rules before code review):

```bash
# .husky/pre-commit
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# Check for forbidden Tailwind classes
if grep -r "rounded-\(md\|lg\|xl\|2xl\|3xl\)" src/components/; then
  echo "❌ ERROR: Only rounded-sm allowed (WVWO aesthetic)"
  exit 1
fi

# Check for forbidden colors
if grep -r "purple\|pink\|#ec4899" src/; then
  echo "❌ ERROR: Purple/pink colors forbidden (WVWO aesthetic)"
  exit 1
fi

# Check for glassmorphism
if grep -r "backdrop-blur" src/; then
  echo "❌ ERROR: No glassmorphism allowed (WVWO aesthetic)"
  exit 1
fi
```

---

## 10. Deployment Architecture

### 10.1 Build Pipeline

```
┌────────────────────────────────────────────────────────┐
│ DEVELOPER WORKFLOW                                     │
├────────────────────────────────────────────────────────┤
│ 1. git commit -m "feat(SPEC-12): Add component"       │
│ 2. Pre-commit hooks run (linting, forbidden checks)   │
│ 3. git push origin feature/spec-12-wma-template       │
└────────────────────────────────────────────────────────┘
                         ↓
┌────────────────────────────────────────────────────────┐
│ CI/CD PIPELINE (GitHub Actions)                        │
├────────────────────────────────────────────────────────┤
│ 1. npm ci                        (install deps)        │
│ 2. npm run typecheck             (TypeScript)          │
│ 3. npm run lint                  (ESLint + Prettier)   │
│ 4. npm run test:unit             (Vitest 43+ tests)    │
│ 5. npm run build                 (Astro static build)  │
│ 6. npm run test:e2e              (Playwright 35+)      │
│ 7. npm run test:a11y             (axe-core)            │
│ 8. npm run test:visual           (Percy snapshots)     │
│ 9. Lighthouse CI                 (95+ score required)  │
└────────────────────────────────────────────────────────┘
                         ↓
                   [All Checks Pass]
                         ↓
┌────────────────────────────────────────────────────────┐
│ CODE REVIEW (Greptile AI + Human)                     │
├────────────────────────────────────────────────────────┤
│ - Greptile: Custom context checks WMA patterns        │
│ - CodeRabbit: Aesthetic violations flagged            │
│ - Human: Final review for Kim's voice authenticity    │
└────────────────────────────────────────────────────────┘
                         ↓
                  [PR Approved & Merged]
                         ↓
┌────────────────────────────────────────────────────────┐
│ PRODUCTION DEPLOYMENT                                  │
├────────────────────────────────────────────────────────┤
│ 1. Build static site (npm run build)                  │
│ 2. Output: dist/ directory (HTML + optimized assets)  │
│ 3. Deploy to CDN (Netlify/Vercel/Cloudflare Pages)    │
│ 4. Atomic deployment (zero downtime)                  │
└────────────────────────────────────────────────────────┘
```

---

## 11. Risk Mitigation Architecture

### 11.1 Rollback Strategy

**Problem**: What if SPEC-12 components have critical bugs in production?

**Solution**: Feature flag pattern + graceful degradation.

```astro
---
// Feature flag (environment variable)
const ENABLE_SPEC12_COMPONENTS = import.meta.env.PUBLIC_ENABLE_SPEC12 === 'true';
---

{ENABLE_SPEC12_COMPONENTS ? (
  <!-- New SPEC-12 component -->
  <AdventureWhatToHunt species={data.species} />
) : (
  <!-- Fallback: Inline elk-river.astro pattern -->
  <section class="py-12">
    {data.species.map(s => (
      <div class="bg-white p-6">
        <h3>{s.name}</h3>
        <p>{s.season}</p>
      </div>
    ))}
  </section>
)}
```

**Rollback Process**:
1. Detect production issue
2. Set `PUBLIC_ENABLE_SPEC12=false` in environment
3. Trigger rebuild (30s build time)
4. Verify fallback works correctly
5. Investigate + fix issue offline

### 11.2 Schema Migration Safety

**Problem**: Extending Content Collections schema might break existing pages.

**Solution**: Three-stage validation.

```typescript
// Stage 1: Optional fields (zero breaking changes)
acreage: z.number().int().positive().optional(),

// Stage 2: Gradual rollout (1 WMA → 5 WMAs → 96 WMAs)
// Verify each stage builds correctly before proceeding

// Stage 3: Backward compatibility tests
describe('Content Collections Migration', () => {
  it('should build existing elk-river.md without WMA fields', async () => {
    const result = await buildPage('elk-river');
    expect(result.errors).toHaveLength(0);
  });

  it('should build new burnsville-lake.md with WMA fields', async () => {
    const result = await buildPage('burnsville-lake');
    expect(result.errors).toHaveLength(0);
  });
});
```

---

## 12. Success Metrics & Monitoring

### 12.1 Architecture Quality Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Component Reusability** | ≥80% code shared | Count component imports vs inline code |
| **Line Reduction** | 73% (463→150) | Compare elk-river.astro vs new templates |
| **Type Coverage** | 100% | TypeScript strict mode, zero `any` |
| **Build Time** | <30s for 5 WMAs | CI/CD pipeline duration |
| **Bundle Size** | <500KB total | Lighthouse audit |
| **Accessibility Score** | 100/100 | axe-core zero violations |

### 12.2 Developer Experience Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Time to Add WMA** | <30 min (Kim) | Timed user study |
| **Onboarding Time** | <2 hours (new dev) | Documentation + first PR |
| **Component Discovery** | <5 min | Storybook/docs search |
| **Error Recovery** | <10 min | Zod error → fix → rebuild |

---

## 13. Architectural Decision Records (ADRs)

### ADR-001: Wrapper Pattern for Semantic Components

**Decision**: Use thin wrappers (AdventureWhatToHunt) around generic base (AdventureFeatureSection).

**Rationale**:
- DRY principle: Change once affects all variants
- Developer ergonomics: Clear semantic intent
- Maintenance: 50 fewer lines of duplicated code

**Alternatives Considered**:
- Standalone components (rejected: code duplication)
- Single component with mode prop (rejected: less semantic clarity)

**Status**: APPROVED (Session 2025-12-27)

---

### ADR-002: Static-First Map Strategy

**Decision**: Use Mapbox Static API for maps, defer Leaflet.js to Phase 2.

**Rationale**:
- <1s load on 3G (vs 3-5s interactive)
- Works offline + print
- 50-70% battery savings
- Free tier: 50k requests/month (sufficient)

**Alternatives Considered**:
- Leaflet.js from day 1 (rejected: poor rural performance)
- No maps (rejected: critical for WMA navigation)

**Status**: APPROVED (Session 2025-12-27)

---

### ADR-003: Explicit `type` Field for WMA Differentiation

**Decision**: Add `type: 'wma' | 'adventure'` field to Content Collections.

**Rationale**:
- Self-documenting (clear intent)
- Future-proof (can add 'trail', 'campground')
- Excellent type safety (discriminated unions)
- Enables type-specific validation

**Alternatives Considered**:
- Infer from fields (rejected: fragile)
- Separate collections (rejected: breaking change)

**Status**: APPROVED (Session 2025-12-27)

---

## 14. Open Architecture Questions

### Q1: Should AdventureFeatureSection support 4-column grid?

**Current**: 2 or 3 columns only
**Proposal**: Add `columns: 2 | 3 | 4`
**Impact**: More flexibility, but 4 columns may be too narrow on mobile
**Decision Needed By**: Before Phase 2

---

### Q2: How to handle seasonal content updates?

**Current**: Manual frontmatter edits
**Proposal**: YAML includes or external data source
**Impact**: Easier bulk updates, but more complex architecture
**Decision Needed By**: Before 96 WMA expansion

---

## 15. Conclusion

The SPEC-12 architecture achieves its core goals through:

1. **Modularity**: 6 new components compose into 150-line page templates
2. **Reusability**: 4 SPEC-10/11 components integrate seamlessly
3. **Type Safety**: Zod schemas catch errors at build time
4. **Performance**: Static HTML, <2s load on 3G
5. **Aesthetics**: WVWO compliance enforced at every layer
6. **Extensibility**: Clear hooks for future adventure types

**Next Steps**:
1. User approval of architecture
2. Implementation (6 components + schema)
3. Testing (43 unit + 35 E2E + accessibility)
4. Content population (5 WMAs)
5. PR review + merge

**Estimated Timeline**: 5 weeks (1 week per phase)

---

**Document Version**: 1.0.0
**Last Updated**: 2025-12-27
**Author**: System Architecture Designer (Claude Code)
**Status**: Ready for Review
