# Integration Flow Architecture: Lake Template (SPEC-13)

**Version**: 1.0.0
**Date**: 2025-12-29
**Integration Architect**: System Architect Agent

---

## 1. Data Flow Overview

```
┌──────────────────────────────────────────────────────────────────┐
│  LAYER 1: Page Component (summersville-lake.astro)              │
│                                                                  │
│  • Define LakeTemplateProps data object                         │
│  • TypeScript type checking at author time                      │
│  • Pass props to LakeTemplate via spread operator               │
└──────────────────────────┬───────────────────────────────────────┘
                           │ Props: LakeTemplateProps
                           ▼
┌──────────────────────────────────────────────────────────────────┐
│  LAYER 2: Template Frontmatter (LakeTemplate.astro)             │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  Step 1: Props Reception & Type Validation                 │ │
│  │  • Receive props: LakeTemplateProps                        │ │
│  │  • TypeScript enforces interface compliance                │ │
│  └────────────────────────────────────────────────────────────┘ │
│                           │                                      │
│                           ▼                                      │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  Step 2: Zod Schema Validation (Build-Time)                │ │
│  │  • FishingSpotSchema.parse(each spot)                      │ │
│  │  • MarinaSchema.parse(marina)                              │ │
│  │  • ActivitySchema.parse(each activity)                     │ │
│  │  • SeasonalGuideSchema.parse(each season)                  │ │
│  │  • RegulationSchema.parse(each regulation)                 │ │
│  │                                                            │ │
│  │  ❌ Validation Fails → Build stops with error message      │ │
│  │  ✅ Validation Passes → Continue to Step 3                 │ │
│  └────────────────────────────────────────────────────────────┘ │
│                           │                                      │
│                           ▼                                      │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  Step 3: Data Transformation                               │ │
│  │  • transformQuickStats(props)                              │ │
│  │  • transformFishSpecies(props.fishSpecies)                 │ │
│  │  • transformActivities(props.activities)                   │ │
│  │  • buildBreadcrumbs(props.name, path)                      │ │
│  │  • formatDirections(props.county, props.name)              │ │
│  └────────────────────────────────────────────────────────────┘ │
└──────────────────────────┬───────────────────────────────────────┘
                           │ Transformed Props
                           ▼
┌──────────────────────────────────────────────────────────────────┐
│  LAYER 3: Template Body (LakeTemplate.astro HTML)               │
│                                                                  │
│  ┌──────────────────┐  ┌──────────────────┐  ┌───────────────┐ │
│  │ Custom Sections  │  │ Existing Comps   │  │ Transformed   │ │
│  │ (Inline HTML)    │  │ (Pass props)     │  │ Props         │ │
│  └────────┬─────────┘  └────────┬─────────┘  └───────┬───────┘ │
│           │                     │                     │         │
│           └──────────────┬──────┴─────────────────────┘         │
│                          ▼                                      │
│           Render all sections sequentially                      │
└──────────────────────────┬───────────────────────────────────────┘
                           │ HTML Output
                           ▼
┌──────────────────────────────────────────────────────────────────┐
│  LAYER 4: Build Output                                          │
│                                                                  │
│  • Static HTML file generated                                   │
│  • All validations passed at build time                         │
│  • No runtime validation overhead                               │
└──────────────────────────────────────────────────────────────────┘
```

---

## 2. Props Mapping Detailed Flow

### 2.1 Quick Stats Transformation

```
INPUT (LakeTemplateProps):
{
  acreage: 2790,
  maxDepth: 327,
  county: 'Nicholas'
}

TRANSFORMATION FUNCTION:
function transformQuickStats(props: LakeTemplateProps): StatItem[] {
  return [
    { value: props.acreage.toLocaleString(), label: 'Acres', icon: 'area' },
    { value: `${props.maxDepth} ft`, label: 'Max Depth', icon: 'info' },
    { value: props.county, label: 'County', icon: 'location' },
  ];
}

OUTPUT (StatItem[]):
[
  { value: '2,790', label: 'Acres', icon: 'area' },
  { value: '327 ft', label: 'Max Depth', icon: 'info' },
  { value: 'Nicholas', label: 'County', icon: 'location' }
]

COMPONENT INVOCATION:
<AdventureQuickStats stats={quickStats} columns={3} variant="white" />
```

### 2.2 Fish Species Transformation

```
INPUT (LakeTemplateProps):
fishSpecies: [
  {
    title: 'Smallmouth Bass',
    description: 'Year-round fishery with 14-18" fish common...',
    notes: 'Downsize to 6-8 lb test in gin-clear water.'
  },
  // ... more species
]

TRANSFORMATION FUNCTION:
function transformFishSpecies(
  species: LakeTemplateProps['fishSpecies']
): FeatureItem[] {
  return species.map(fish => ({
    name: fish.title,
    description: fish.description,
    kimNote: fish.notes, // Optional
  }));
}

OUTPUT (FeatureItem[]):
[
  {
    name: 'Smallmouth Bass',
    description: 'Year-round fishery with 14-18" fish common...',
    kimNote: 'Downsize to 6-8 lb test in gin-clear water.'
  },
  // ... more features
]

COMPONENT INVOCATION:
<AdventureWhatToFish
  features={fishFeatures}
  variant="cream"
  accentColor="green"
/>
```

### 2.3 Campgrounds (No Transformation)

```
INPUT (LakeTemplateProps):
campgrounds: [
  {
    type: 'Battle Run Campground',
    count: 117,
    description: 'Peninsula campground with water on three sides...',
    contact: '(304) 555-CAMP',
    link: 'https://www.recreation.gov/camping/...',
    accessibility: '5 ADA-accessible sites'
  }
]

TRANSFORMATION: NONE (already CampingFacility[] type)

COMPONENT INVOCATION:
<AdventureCampingList
  facilities={props.campgrounds}
  columns={2}
  variant="white"
/>
```

---

## 3. Custom Section Integration Patterns

### 3.1 Hero Section (No Component)

```astro
<!-- Direct prop usage, no transformation -->
<section class="relative h-[70vh] min-h-[500px]">
  <div
    class="absolute inset-0 bg-cover bg-center"
    style={`background-image: url('${props.heroImage}');`}
  >
    <div class="absolute inset-0 bg-black/40"></div>
  </div>

  <div class="relative z-10 container mx-auto px-4 h-full flex flex-col justify-end pb-12">
    <h1 class="font-display font-black text-4xl md:text-6xl text-white mb-6">
      {props.name}  <!-- Direct prop usage -->
    </h1>

    <!-- Stats overlay using props directly -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div class="bg-white/90 p-4 rounded-sm border-l-4 border-l-sign-green">
        <div class="font-display text-2xl font-bold text-brand-brown">
          {props.acreage.toLocaleString()}  <!-- Direct prop usage -->
        </div>
        <div class="text-brand-brown/75 text-sm uppercase">Acres</div>
      </div>
      <!-- ... more stat cards -->
    </div>

    <!-- Quick highlights using array map -->
    <div class="flex flex-wrap gap-2">
      {props.quickHighlights.map(highlight => (
        <span class="bg-sign-green text-white px-4 py-2 rounded-sm font-bold text-sm">
          {highlight}
        </span>
      ))}
    </div>
  </div>
</section>
```

**Integration Complexity**: Medium
**Props Used**: `name`, `heroImage`, `acreage`, `maxDepth`, `county`, `quickHighlights`
**Transformation**: None (direct usage)

### 3.2 Where to Fish Section (No Component)

```astro
<!-- Array iteration over fishingSpots -->
<section class="py-12 md:py-16 bg-white">
  <div class="container mx-auto px-4">
    <h2 class="font-display text-4xl md:text-5xl font-bold text-brand-brown mb-8">
      Where to Fish
    </h2>

    <div class="space-y-6">
      {props.fishingSpots.map(spot => (  <!-- Array iteration -->
        <div class="bg-white border-l-4 border-l-brand-brown p-6 rounded-sm">
          <h3 class="font-display text-2xl font-bold text-brand-brown mb-4">
            {spot.name}  <!-- Direct spot property usage -->
          </h3>

          <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <div><strong>Depth:</strong> {spot.depth}</div>
              <div><strong>Structure:</strong> {spot.structure}</div>
              <div><strong>Access:</strong> {spot.access}</div>
            </div>

            <div>
              <p class="font-bold text-brand-brown mb-2">Target Species:</p>
              <div class="flex flex-wrap gap-2">
                {spot.species.map(species => (  <!-- Nested array iteration -->
                  <span class="bg-sign-green text-white px-3 py-1 rounded-sm text-sm">
                    {species}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

**Integration Complexity**: Medium
**Props Used**: `fishingSpots` (array of FishingSpot)
**Transformation**: None (direct iteration)

### 3.3 Marina Section (No Component)

```astro
<!-- Single marina object with nested arrays -->
<section class="py-12 md:py-16 bg-brand-cream">
  <div class="container mx-auto px-4">
    <h2 class="font-display text-4xl md:text-5xl font-bold text-brand-brown mb-8">
      Marina & Boat Access
    </h2>

    <div class="bg-white border-l-4 border-l-brand-brown p-8 rounded-sm">
      <h3 class="font-display text-2xl font-bold text-brand-brown mb-6">
        {props.marina.name}  <!-- Direct marina property -->
      </h3>

      <div class="grid md:grid-cols-2 gap-8 mb-6">
        <!-- Services Array -->
        <div>
          <h4 class="font-bold text-brand-brown mb-3">Services</h4>
          <ul class="space-y-2">
            {props.marina.services.map(service => (  <!-- Array iteration -->
              <li class="flex items-start gap-2">
                <span class="text-sign-green">✓</span>
                <span>{service}</span>
              </li>
            ))}
          </ul>
        </div>

        <!-- Boat Launch (nested object) -->
        <div>
          <h4 class="font-bold text-brand-brown mb-3">Boat Launch</h4>
          <p><strong>Ramps:</strong> {props.marina.boatLaunch.ramps}</p>
          {props.marina.boatLaunch.fee && (  <!-- Conditional rendering -->
            <p><strong>Fee:</strong> {props.marina.boatLaunch.fee}</p>
          )}
        </div>
      </div>

      <!-- Contact (formatted as tel: link) -->
      <div class="pt-6 border-t border-brand-brown/20">
        <a
          href={`tel:${props.marina.contact.replace(/\D/g, '')}`}  <!-- Phone formatting -->
          class="text-sign-green hover:underline font-bold"
        >
          {props.marina.contact}
        </a>
      </div>
    </div>
  </div>
</section>
```

**Integration Complexity**: High
**Props Used**: `marina` (Marina object with nested arrays/objects)
**Transformation**: Phone number formatting (`replace(/\D/g, '')`)

---

## 4. Error Handling Flow

### 4.1 Build-Time Validation Errors

```
SCENARIO: Invalid fishing spot data (missing species array)

INPUT DATA (summersville-lake.astro):
const summersvilleData: LakeTemplateProps = {
  // ... other props
  fishingSpots: [
    {
      name: 'Long Point Cliff',
      depth: '40-60 feet',
      structure: 'Rocky ledges',
      species: [],  // ❌ INVALID: Empty array (min 1 required)
      access: 'Boat only'
    }
  ],
  // ...
};

VALIDATION (LakeTemplate.astro frontmatter):
try {
  props.fishingSpots.forEach((spot, index) => {
    FishingSpotSchema.parse(spot);
  });
} catch (error) {
  if (error instanceof z.ZodError) {
    throw new Error(`
❌ Lake Template Validation Failed for "${props.name}"

Invalid fishing spot at index 0:
  • species: Array must contain at least 1 element(s)

Fix the data in summersville-lake.astro and rebuild.
    `);
  }
}

BUILD OUTPUT (Terminal):
[ERROR] Lake Template Validation Failed for "Summersville Lake"

Invalid fishing spot at index 0:
  • species: Array must contain at least 1 element(s)

Fix the data in summersville-lake.astro and rebuild.

    at LakeTemplate.astro:45:11
    at summersville-lake.astro:18:5

BUILD FAILED - Fix validation errors and retry
```

### 4.2 TypeScript Type Errors

```
SCENARIO: Wrong type for acreage (string instead of number)

INPUT DATA (summersville-lake.astro):
const summersvilleData: LakeTemplateProps = {
  name: 'Summersville Lake',
  acreage: '2790',  // ❌ ERROR: Type 'string' is not assignable to type 'number'
  maxDepth: 327,
  // ...
};

TYPESCRIPT ERROR (VS Code / Build):
Type 'string' is not assignable to type 'number'.ts(2322)
adventure.ts(380, 3): The expected type comes from property 'acreage'
which is declared here on type 'LakeTemplateProps'

FIX:
acreage: 2790,  // ✅ Correct: number type
```

---

## 5. Performance Considerations

### 5.1 Build-Time vs Runtime

| Operation | When | Cost | Optimization |
|-----------|------|------|--------------|
| TypeScript type checking | Build | Low (~50ms) | Cached by TS server |
| Zod validation | Build | Low (~10ms) | Only runs once per build |
| Props transformation | Build | Negligible (~1ms) | Simple array maps |
| HTML generation | Build | Medium (~100ms) | Astro SSG default |
| **Total per page** | **Build** | **~161ms** | **Acceptable** |

### 5.2 Array Size Impact

| Array | Typical Size | Max Size | DOM Nodes | Performance Impact |
|-------|--------------|----------|-----------|-------------------|
| fishSpecies | 6-12 | 20 | ~15 per item | Low (300 nodes max) |
| fishingSpots | 5-10 | 15 | ~20 per item | Low (300 nodes max) |
| campgrounds | 3-6 | 10 | ~25 per item | Low (250 nodes max) |
| activities | 5-10 | 20 | ~10 per item | Low (200 nodes max) |
| **TOTAL WORST CASE** | - | - | **~1050 nodes** | **Acceptable (<1500)** |

### 5.3 Lighthouse Score Projections

**With Max Array Sizes**:

- Performance: 92+ (LCP <2.5s, FCP <1.5s)
- Accessibility: 98+ (semantic HTML, ARIA labels)
- SEO: 100 (structured data, meta tags)

---

## 6. Integration Checklist

### 6.1 Pre-Implementation

- [ ] Existing component APIs documented (see 02-component-composition.md)
- [ ] Zod schemas defined in adventure.ts
- [ ] LakeTemplateProps interface complete
- [ ] Transformation functions designed

### 6.2 Implementation

- [ ] LakeTemplate.astro created in components/templates/
- [ ] Props validation logic implemented (Zod)
- [ ] Transformation functions implemented (inline in frontmatter)
- [ ] All 16 sections implemented (10 existing + 6 custom)
- [ ] WVWO compliance enforced (rounded-sm, fonts, colors)

### 6.3 Integration Testing

- [ ] summersville-lake.astro refactored to use LakeTemplate
- [ ] Visual regression test passes (before/after screenshots match)
- [ ] Build succeeds with valid data
- [ ] Build fails with invalid data (test with empty species array)
- [ ] TypeScript errors caught for wrong types
- [ ] Lighthouse scores meet targets (90+/95+/100)

### 6.4 Responsive Testing

- [ ] Mobile (320px): All grids stack to 1 column
- [ ] Tablet (768px): Grids use 2 columns
- [ ] Desktop (1024px): Grids use 3-4 columns
- [ ] No horizontal scroll at any breakpoint
- [ ] Text remains readable at all sizes

---

## 7. Migration Path

### 7.1 Existing Lake Pages

**Current Lake Pages** (as of 2025-12-29):

- `wv-wild-web/src/pages/near/summersville-lake.astro` (364 lines)
- `wv-wild-web/src/pages/near/stonewall-jackson-lake.astro`
- `wv-wild-web/src/pages/near/burnsville-lake.astro`

**Migration Steps**:

1. **Extract Data**: Convert inline HTML to LakeTemplateProps object
2. **Validate Data**: Ensure all required fields present
3. **Refactor Import**: Import LakeTemplate component
4. **Replace Template**: Replace inline HTML with `<LakeTemplate {...data} />`
5. **Test**: Visual regression, build validation, Lighthouse

**Example Migration** (summersville-lake.astro):

```astro
---
// BEFORE (364 lines - inline template)
const huntingFeatures = [/* ... */];
const fishingFeatures = [/* ... */];
const campgrounds = [/* ... */];
// ... 200+ lines of data

// ... 180+ lines of inline HTML
---

<Layout title="Summersville Lake">
  <section class="hero"><!-- ... --></section>
  <AdventureQuickStats stats={stats} />
  <!-- ... 150+ lines of template HTML -->
</Layout>
```

```astro
---
// AFTER (~150 lines - data only)
import LakeTemplate from '../../components/templates/LakeTemplate.astro';
import type { LakeTemplateProps } from '../../types/adventure';

const summersvilleData: LakeTemplateProps = {
  name: 'Summersville Lake',
  acreage: 2790,
  maxDepth: 327,
  county: 'Nicholas',
  quickHighlights: [
    'Crystal clear water (30-45 ft visibility)',
    'Premier smallmouth fishing',
    'Scuba diving destination',
  ],
  fishSpecies: [/* ... */],
  fishingSpots: [/* ... */],
  campgrounds: [/* ... */],
  marina: {/* ... */},
  activities: [/* ... */],
  seasonalGuide: [/* ... */],
  regulations: [/* ... */],
  heroImage: '/images/summersville-lake-hero.jpg',
  mapUrl: 'https://maps.google.com/?q=Summersville+Lake+WV',
};
---

<!-- Single line template invocation -->
<LakeTemplate {...summersvilleData} />
```

**Reduction**: 364 lines → 150 lines (58% reduction)

---

**Document End** - Integration Flow Architecture
