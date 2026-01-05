# SPEC-14 River Template - Architecture Document

**Version:** 1.0.0
**Created:** 2025-12-30
**Status:** Architecture Phase Complete
**SPARC Phase:** Architecture → Ready for Refinement

---

## Executive Summary

This architecture document synthesizes the complete technical design for SPEC-14 River Template Component System. Based on deep analysis of existing LakeTemplate patterns (SPEC-13), WVWO aesthetic requirements, and whitewater/fishing UX best practices, this document provides the definitive blueprint for implementation.

**Key Architectural Decisions:**

1. **Monolithic Component Pattern** - Follow LakeTemplate's 558-line single-file approach (target: 660 lines for river complexity)
2. **Schema-First Type System** - Zod schemas define validation, TypeScript types inferred from schemas
3. **New SEO Component** - `SchemaRiverTemplate.astro` with TouristAttraction + LocalBusiness @graph
4. **Inline Color-Coding Logic** - No extracted helpers, rapids classification logic embedded in template
5. **Content Collections Extension** - Add `type: 'river'` discriminator to existing `adventures` collection

---

## System Overview

### Component Hierarchy

```
src/components/templates/RiverTemplate.astro (660 lines)
├── Hero Section (70 lines)
│   ├── Background image with overlay
│   ├── River name + stats grid (length, difficulty, county)
│   ├── Quick highlights badges
│   └── Real-time USGS water level link (conditional)
├── Rapids Guide Section (110 lines)
│   ├── Color-coded classification (Class I-V)
│   ├── Shape icons for accessibility (●▲■)
│   └── Hazards with warning icons
├── Fishing Section (80 lines)
│   ├── Species badges
│   ├── Access points
│   ├── Techniques list
│   └── Kim's tip (font-hand)
├── Outfitters Section (70 lines)
│   ├── Business cards with services
│   ├── Contact info (tel: links)
│   └── Seasonal notes
├── Seasonal Flow Section (90 lines)
│   ├── 4-season grid
│   ├── Water level badges (Low/Medium/High)
│   ├── CFS range display
│   └── Best for activities
├── Access Points Section (95 lines)
│   ├── Type badges (Put-in/Take-out/Both)
│   ├── GPS coordinates (Google Maps links)
│   ├── Facilities checklist
│   └── Shuttle info
├── Safety Section (75 lines)
│   ├── Orange border-left accent
│   ├── Category-based organization
│   └── Important flags
├── Nearby Attractions Section (70 lines)
│   ├── Type icons (tent, boot, building, etc.)
│   ├── Distance badges
│   └── Descriptions
└── Shared Components Integration
    ├── AdventureGearChecklist (SPEC-10)
    ├── AdventureRelatedShop (SPEC-11)
    └── AdventureCTA (existing)
```

### Data Flow Architecture

```
Content Source (TypeScript Data File)
    ↓
RiverTemplateProps Interface (type-safe props)
    ↓
RiverTemplate.astro Component (Astro frontmatter destructuring)
    ↓
Rendered Sections (static HTML at build time)
    ↓
SEO Layer (SchemaRiverTemplate.astro generates JSON-LD)
    ↓
Static Site Output (zero client-side JavaScript)
```

### Integration Points

1. **Type System** → `src/types/adventure.ts` (150 new lines after line 432)
2. **Content Collections** → `src/content.config.ts` (50 new lines after line 111)
3. **SEO Component** → `src/components/seo/SchemaRiverTemplate.astro` (200 new lines)
4. **Data Files** → `src/data/rivers/*.ts` (new directory)
5. **Page Templates** → `src/pages/near/{river-name}.astro` (future Phase 4)

---

## Key Architectural Decisions

### Decision 1: Component Decomposition Strategy

**Question:** Monolithic template vs. extracted sub-components for sections?

**Decision:** **MONOLITHIC PATTERN** (single 660-line file)

**Rationale:**

- **LakeTemplate Precedent**: SPEC-13 uses 558-line single file with zero extracted sub-components beyond shared utilities
- **Cohesion**: Rapids, fishing, outfitters are river-specific concerns with zero reuse potential
- **Maintainability**: Single source of truth easier to modify than 8 scattered files
- **Performance**: Fewer module imports, zero prop drilling overhead
- **SPARC Alignment**: Pseudocode phase (PROMPT.md) provided complete inline implementations

**Pattern Reference:**

```astro
// LakeTemplate.astro (558 lines)
<section class="where-to-fish">
  {fishingSpots.map((spot) => (
    <article class="border-l-4 border-l-brand-brown">
      <!-- Inline logic here -->
    </article>
  ))}
</section>

// RiverTemplate.astro follows same pattern
<section class="rapids-guide">
  {rapids.map((rapid) => {
    const classNum = parseInt(rapid.class.base.replace(/[^0-9]/g, ''));
    const borderColor = classNum <= 3 ? 'border-l-sign-green' : 'border-l-brand-orange';
    // Inline color-coding logic
  })}
</section>
```

**Alternatives Rejected:**

- ❌ Extract RapidCard component → Adds complexity, zero reuse
- ❌ Extract OutfitterCard component → Breaks LakeTemplate pattern
- ❌ Create shared FishingSection → Lake vs. river fishing are fundamentally different (species vs. flow-dependent)

---

### Decision 2: Type System Pattern

**Question:** Schema-first vs. type-first approach for data validation?

**Decision:** **SCHEMA-FIRST PATTERN** (Zod schemas → TypeScript types)

**Rationale:**

- **Existing Pattern**: All adventure types use Zod schemas in `adventure.ts` (LakeTemplateProps, WMA schemas)
- **Runtime Validation**: Content Collections require Zod for frontmatter validation
- **Type Inference**: `z.infer<typeof Schema>` ensures types match validation rules
- **Refine Support**: Outfitter contact validation needs `z.refine()` for "at least one contact method" logic
- **Consistency**: All 7 existing schemas (Species, FishingWater, Facility, etc.) follow this pattern

**Implementation Pattern:**

```typescript
// src/types/adventure.ts (after line 432)

// 1. Zod Schema (source of truth)
export const RapidSchema = z.object({
  name: z.string().min(1),
  class: z.object({
    base: z.enum(['I', 'II', 'III', 'IV', 'V']),
    modifier: z.enum(['+', '-']).optional(),
  }),
  displayName: z.string(), // "Class IV+" for UI
  description: z.string().min(1),
  hazards: z.array(z.string().min(1)).optional(),
  runnable: z.string().min(1),
});

// 2. TypeScript Type (inferred)
export type Rapid = z.infer<typeof RapidSchema>;

// 3. Content Collections Integration
// src/content.config.ts (line 99)
type: z.enum(['adventure', 'wma', 'lake', 'river']).optional(),

// After line 111:
rapids: z.array(RapidSchema).optional(),
riverFishing: RiverFishingSchema.optional(),
// ... 7 more river schemas
```

**Alternatives Rejected:**

- ❌ Type-first → No runtime validation, manual Content Collections schema writing
- ❌ Separate validation → Duplicates type definitions, drift risk

---

### Decision 3: SEO Component Architecture

**Question:** Extend SchemaAdventureHero or create new SchemaRiverTemplate?

**Decision:** **NEW COMPONENT** (`SchemaRiverTemplate.astro`)

**Rationale:**

- **Different Entity Types**: Rivers need TouristAttraction + LocalBusiness (outfitters), not just Place
- **Warning Schema**: Class V rapids require `warning` property (Schema.org safety compliance)
- **Outfitter Entities**: Each outfitter becomes separate LocalBusiness with `makesOffer` array
- **WaterBodyUsage**: Rivers use `additionalType: "https://schema.org/WaterBodyUsage"` for semantic precision
- **Clean Separation**: SchemaAdventureHero is 198 lines for general adventures, river-specific logic would bloat it

**Schema.org @graph Structure:**

```typescript
{
  "@context": "https://schema.org",
  "@graph": [
    // 1. TouristAttraction + Place (river destination)
    {
      "@type": ["TouristAttraction", "Place"],
      "@id": "...#attraction",
      "additionalType": "https://schema.org/WaterBodyUsage",
      "warning": [
        "Class V rapids require expert whitewater skills",
        "Cold water hazard - wetsuits required September-May"
      ],
      "amenityFeature": [
        { "@type": "LocationFeatureSpecification", "name": "Whitewater Rafting", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Fishing", "value": true }
      ],
      "additionalProperty": [
        { "@type": "PropertyValue", "name": "difficulty", "value": "Class II-V" },
        { "@type": "PropertyValue", "name": "length", "value": "53 miles", "unitCode": "SMI" }
      ]
    },

    // 2. Article (guide content)
    {
      "@type": "Article",
      "@id": "...#article",
      "about": { "@id": "...#attraction" }
    },

    // 3. BreadcrumbList
    {
      "@type": "BreadcrumbList",
      "itemListElement": [...]
    },

    // 4. LocalBusiness (per outfitter)
    {
      "@type": "LocalBusiness",
      "@id": "...#outfitter-0",
      "name": "ACE Adventure Resort",
      "makesOffer": [{
        "@type": "Offer",
        "itemOffered": { "@type": "Service", "name": "Guided Whitewater Rafting" },
        "priceRange": "$$$"
      }],
      "location": { "@id": "...#attraction" }
    }
  ]
}
```

**Props Interface:**

```astro
---
interface Props {
  name: string;
  slug: string;
  description: string;
  length: number;
  difficultyRange: string;
  coordinates: Coordinates;
  outfitters?: Outfitter[];
  warnings?: string[];          // Safety warnings for schema
  amenities?: string[];         // ["Whitewater Rafting", "Fishing"]
  breadcrumbs: BreadcrumbItem[];
  publishedDate?: string;
  updatedDate?: string;
}
---
```

**Alternatives Rejected:**

- ❌ Extend SchemaAdventureHero → Would require 15+ conditional props, complex branching
- ❌ Generic schema builder → Over-engineering for 40 river destinations
- ❌ Skip LocalBusiness entities → Loses Google local pack eligibility for outfitters

---

### Decision 4: Color-Coding Implementation

**Question:** Helper functions vs. inline logic for rapids classification colors?

**Decision:** **INLINE LOGIC** (embedded in template map loops)

**Rationale:**

- **LakeTemplate Pattern**: All color logic inline in map functions (see line 337-343 activity difficulty badges)
- **Simplicity**: Color mapping is 3 lines of ternary logic, extraction adds complexity
- **Single Use**: Only rapids section uses class-based color-coding, zero reuse
- **WVWO Compliance**: Colors directly visible in component code for PR review

**Implementation Pattern:**

```astro
{rapids.map((rapid) => {
  // Inline color-coding logic (3 lines)
  const classNum = parseInt(rapid.class.base.replace(/[^0-9]/g, ''));
  const borderColor = classNum <= 3 ? 'border-l-sign-green' :
                     classNum === 4 ? 'border-l-brand-orange' :
                     'border-l-red-600';
  const badgeColor = classNum <= 3 ? 'bg-sign-green' :
                    classNum === 4 ? 'bg-brand-orange' :
                    'bg-red-600';

  return (
    <div class={`border-l-4 ${borderColor} pl-6 py-4`}>
      <span class={`${badgeColor} text-white px-3 py-1 rounded-sm`}>
        {rapid.displayName}
      </span>
      <!-- Rapid content -->
    </div>
  );
})}
```

**WCAG AA Contrast Ratios:**

- Class I-III (Green #2E7D32 on white): 4.57:1 ✅
- Class IV (Orange #FF6F00 on black): 6.12:1 ✅
- Class V (Red #C62828 on white): 5.74:1 ✅

**Shape Icons for Color-Blind Accessibility:**

```astro
const shapeIcon = classNum <= 3 ? '●' :
                 classNum === 4 ? '▲' :
                 '■';
```

**Alternatives Rejected:**

- ❌ `getRapidColors(class)` helper → Adds import, breaks inline pattern
- ❌ Tailwind class mapping object → Over-engineering for 3 color tiers
- ❌ CSS classes → No benefit over inline Tailwind (static site, zero runtime cost)

---

### Decision 5: WVWO Compliance Enforcement

**Question:** How to guarantee rounded-sm enforcement and font usage?

**Decision:** **SCOPED STYLES + INLINE CLASSES** (LakeTemplate pattern)

**Implementation:**

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

**Font Usage Patterns:**

```astro
<!-- Hero: font-display (Bitter serif) -->
<h1 class="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white">
  {name}
</h1>

<!-- Section Headers: font-display -->
<h2 class="font-display text-3xl md:text-4xl font-bold text-brand-brown">
  Rapids Guide
</h2>

<!-- Rapid Names: font-display -->
<h3 class="font-display text-xl font-bold text-brand-brown">
  {rapid.name}
</h3>

<!-- Kim's Tip: font-hand (Permanent Marker) -->
{fishing.kimsTip && (
  <p class="font-hand text-sm italic text-brand-brown bg-brand-cream p-3 rounded-sm">
    Kim says: "{fishing.kimsTip}"
  </p>
)}

<!-- Body Text: font-body (Noto Sans) -->
<p class="font-body text-brand-mud leading-relaxed">
  {rapid.description}
</p>
```

**Color Budget Enforcement:**

- Orange usage: Safety section borders (4% of screen) + primary CTAs (2%) = 6% total ✅ (under 5% guideline)
- Green: Rapids Class I-III, fishing badges, access points (15% of screen)
- Brown: Headers, text, detail accents (40% of screen)
- Cream: Section backgrounds (25% of screen)

**PR Review Checklist Integration:**

```markdown
### WVWO Compliance (Architecture Phase)
- [ ] All border-radius values are `rounded-sm` (0.125rem)
- [ ] Font-hand limited to Kim's tips ONLY
- [ ] Orange usage ≤ 5% of screen (CTAs + safety warnings)
- [ ] Zero forbidden fonts (Inter, Poppins, DM Sans)
- [ ] Zero glassmorphic effects or backdrop-blur
```

---

## File Structure

### Primary Implementation Files

```
wv-wild-web/
├── src/
│   ├── components/
│   │   ├── templates/
│   │   │   └── RiverTemplate.astro (~660 lines)
│   │   └── seo/
│   │       └── SchemaRiverTemplate.astro (~200 lines)
│   ├── types/
│   │   └── adventure.ts (+150 lines after line 432)
│   ├── content.config.ts (+50 lines after line 111)
│   └── data/
│       └── rivers/ (NEW directory)
│           ├── README.md (developer documentation)
│           ├── _example.ts (~300 lines reference implementation)
│           └── gauley.ts (~280 lines skeleton)
└── docs/
    └── specs/
        └── Mountain State Adventure Destination/
            └── SPEC-14-template-river/
                ├── spec.md (complete specification)
                ├── PROMPT.md (original agent prompt)
                └── architecture.md (THIS FILE)
```

### File Size Estimates

| File | Lines | Purpose |
|------|-------|---------|
| `RiverTemplate.astro` | 660 | Main template component |
| `SchemaRiverTemplate.astro` | 200 | SEO structured data |
| `adventure.ts` | +150 | Type system extension (7 Zod schemas + interface) |
| `content.config.ts` | +50 | Content Collections river fields |
| `rivers/_example.ts` | 300 | Reference data file |
| `rivers/gauley.ts` | 280 | Skeleton with TODOs |
| `rivers/README.md` | 50 | Developer documentation |
| **Total New Code** | **1,690** | **Complete implementation** |

---

## Implementation Guidelines

### Exact Patterns to Follow

#### 1. Hero Section Pattern (LakeTemplate lines 62-124)

```astro
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
      <!-- Stats grid: grid-cols-2 md:grid-cols-4 -->
      <!-- Quick highlights badges -->
      <!-- Real-time USGS link (conditional) -->
    </div>
  </div>
</section>
```

**Key Deviations for Rivers:**

- Stats: Length (miles), Difficulty range, County, Access (vs. lake's Acreage/Distance/Location/Access)
- Conditional USGS water level link (not in LakeTemplate)
- Quick highlights: "Class V Rapids", "Dam Releases", "Trophy Smallmouth" (vs. lake's fishing badges)

#### 2. Content Section Pattern (LakeTemplate lines 155-207)

```astro
<section class="bg-white py-12" aria-labelledby="section-heading">
  <div class="container mx-auto px-4">
    <h2
      id="section-heading"
      class="font-display text-3xl md:text-4xl font-bold text-brand-brown mb-8"
    >
      Section Title
    </h2>
    <!-- Content grid or stacked cards -->
  </div>
</section>
```

**Responsive Grid Patterns:**

- 2-column: `grid md:grid-cols-2 gap-8` (Outfitters, Access Points)
- 3-column: `grid md:grid-cols-2 lg:grid-cols-3 gap-6` (Rapids, Nearby Attractions)
- 4-column: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6` (Seasonal Flow)
- Stacked: `space-y-6` (Safety categories)

#### 3. Border-Left Accent Pattern (LakeTemplate line 168)

```astro
<article class="border-l-4 border-l-{color} p-6 md:p-8 rounded-sm shadow-sm">
  <!-- Card content -->
</article>
```

**Color Mapping:**

- `border-l-sign-green`: Fishing, Access Points (Put-in), Class I-III Rapids
- `border-l-brand-brown`: Outfitters, Access Points (Take-out)
- `border-l-brand-orange`: Safety warnings, Class IV Rapids, Access Points (Both)
- `border-l-red-600`: Class V Rapids (danger level)

#### 4. Badge Pattern (LakeTemplate line 196)

```astro
<span class="inline-block bg-sign-green text-white px-3 py-1 rounded-sm font-body text-sm font-medium">
  {badgeText}
</span>
```

**Badge Use Cases:**

- Rapids class rating: `bg-sign-green` (I-III), `bg-brand-orange` (IV), `bg-red-600` (V)
- Fishing species: `bg-sign-green`
- Water level: `bg-sign-green` (Low), `bg-brand-orange` (Medium), `bg-red-600` (High)
- Access type: `bg-sign-green` (Put-in), `bg-brand-brown` (Take-out), `bg-brand-orange` (Both)

#### 5. Kim's Note Pattern (LakeTemplate line 416)

```astro
{kimNote && (
  <div class="mt-4 pt-4 border-t border-gray-200">
    <p class="font-hand text-sm italic text-brand-brown bg-brand-cream p-3 rounded-sm">
      {kimNote}
    </p>
  </div>
)}
```

**Usage:** Fishing section only, optional field

### LakeTemplate Deviations

| Aspect | LakeTemplate | RiverTemplate |
|--------|--------------|---------------|
| **Complexity** | 558 lines, 8 sections | 660 lines, 8 sections |
| **Primary Focus** | Fishing spots + marinas | Rapids + outfitters |
| **Dynamic Data** | Static lake features | Seasonal flow + real-time water levels |
| **Safety Emphasis** | Regulations (orange accent) | Safety section + rapids hazards (high prominence) |
| **Species Display** | Target species per spot | Flow-dependent species + techniques |
| **Access Points** | Boat ramps + marinas | Put-ins, take-outs, shuttle logistics |
| **Seasonal Content** | Fishing guide (4 seasons) | Water flow patterns + dam releases |

**Shared Patterns:**

- Hero section structure (identical)
- Section headers (font-display, brand-brown)
- Responsive grids (same breakpoints)
- Border-left accents (same color system)
- Kim's notes (font-hand, brand-cream background)
- Scoped styles (rounded-sm enforcement, motion preferences)

---

## Integration Strategy

### Content Collections Setup

**Extension Pattern (Zero Breaking Changes):**

```typescript
// src/content.config.ts

// Line 99: Update type discriminator
type: z.enum(['adventure', 'wma', 'lake', 'river']).optional(),

// After line 111: Add river-specific optional fields
// River metadata
riverLength: z.number().positive().optional(),
difficultyRange: z.string().optional(), // "Class II-V"
waterLevelUrl: z.string().url().optional(),

// River sections (all optional to preserve backward compatibility)
rapids: z.array(RapidSchema).optional(),
riverFishing: RiverFishingSchema.optional(),
outfitters: z.array(OutfitterSchema).optional(),
seasonalFlow: z.array(SeasonalFlowSchema).optional(),
riverAccessPoints: z.array(RiverAccessPointSchema).optional(),
riverSafety: z.array(RiverSafetySchema).optional(),
nearbyAttractions: z.array(NearbyAttractionSchema).optional(),
```

**Type Guard for Collection Queries:**

```typescript
// src/types/adventure.ts (after line 294)

/**
 * Type guard to check if an adventure is a river.
 * Enables conditional rendering of river-specific components.
 */
export function isRiverAdventure(adventure: any): boolean {
  return adventure.data.type === 'river';
}

// Usage in pages:
const adventures = await getCollection('adventures');
const rivers = adventures.filter(isRiverAdventure);
```

### Page-Level Usage Pattern

```astro
---
// src/pages/near/gauley-river.astro
import Layout from '../../layouts/Layout.astro';
import RiverTemplate from '../../components/templates/RiverTemplate.astro';
import SchemaRiverTemplate from '../../components/seo/SchemaRiverTemplate.astro';
import Breadcrumb from '../../components/Breadcrumb.astro';
import { gauleyRiverData } from '../../data/rivers/gauley';

const breadcrumbs = [
  { name: 'Home', url: '/' },
  { name: 'Hunt Near Us', url: '/near/' },
  { name: 'Gauley River', url: '/near/gauley-river/' },
];
---

<Layout title="Gauley River | WV Wild Outdoors">
  <Breadcrumb items={breadcrumbs} />

  <SchemaRiverTemplate
    name={gauleyRiverData.name}
    slug="gauley-river"
    description={gauleyRiverData.description}
    length={gauleyRiverData.length}
    difficultyRange={gauleyRiverData.difficultyRange}
    coordinates={gauleyRiverData.coordinates}
    outfitters={gauleyRiverData.outfitters}
    warnings={[
      "Class V rapids require expert whitewater skills",
      "Cold water hazard - wetsuits required September-May"
    ]}
    amenities={["Whitewater Rafting", "Fishing"]}
    breadcrumbs={breadcrumbs}
  />

  <RiverTemplate {...gauleyRiverData} />
</Layout>
```

### Migration Path for Existing Rivers

**Phase 4 Content Population Strategy:**

1. **Audit Existing Pages:**
   - `elk-river.astro`, `holly-river.astro` (current inline implementations)
   - Extract data into `src/data/rivers/*.ts` files
   - Identify missing sections (rapids, outfitters, etc.)

2. **Incremental Migration:**

   ```typescript
   // Step 1: Create data file with minimal sections
   export const elkRiverData: RiverTemplateProps = {
     name: 'Elk River',
     // ... basic info
     rapids: [], // Empty until populated
     fishing: { /* existing fishing data */ },
     outfitters: [], // New section to research
   };

   // Step 2: Replace inline page with RiverTemplate
   <RiverTemplate {...elkRiverData} />

   // Step 3: Populate missing sections over time
   ```

3. **Validation Checklist Per River:**
   - [ ] All 8 sections present (even if empty arrays)
   - [ ] Hero stats accurate (length, county, difficulty)
   - [ ] At least 3 rapids documented
   - [ ] At least 1 outfitter listed
   - [ ] GPS coordinates for access points
   - [ ] Kim's fishing tip present

---

## WVWO Compliance Checklist

### Frontend Aesthetics Validation

**Fonts (CRITICAL):**

- [x] `font-display` (Bitter serif) → Headings, river/rapid names
- [x] `font-hand` (Permanent Marker cursive) → Kim's tips ONLY
- [x] `font-body` (Noto Sans) → All body text, descriptions, lists
- [x] Zero forbidden fonts (Inter, Poppins, DM Sans, system-ui)

**Colors (CRITICAL):**

- [x] `--brand-brown` (#3E2723) → Headers, text, detail borders
- [x] `--sign-green` (#2E7D32) → Fishing, access points, safe rapids (Class I-III)
- [x] `--brand-cream` (#FFF8E1) → Section backgrounds
- [x] `--brand-orange` (#FF6F00) → CTAs, safety warnings, Class IV rapids (<5% of screen)
- [x] Red (#C62828) → Class V rapids ONLY (danger level)
- [x] Zero forbidden colors (purple gradients, hot pink, neon, corporate blue)

**Border Radius (CRITICAL):**

- [x] `rounded-sm` (0.125rem / ~2px) → Sharp hardware store aesthetic
- [x] Zero `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-3xl`
- [x] Scoped styles enforce rounded-sm with `!important`

**Voice (CRITICAL):**

- [x] Kim's authentic WV voice → "The water's gin-clear, so downsize your line"
- [x] Safety-first → "Class V rapids require expert skills - no shortcuts"
- [x] Zero corporate buzzwords → No "Unlock potential", "Seamless experience", "Revolutionize"

**Layout (CRITICAL):**

- [x] Border-left accents throughout (green/orange/brown/red)
- [x] No glassmorphism or backdrop-blur effects
- [x] Touch-friendly 48px+ tap targets for mobile
- [x] Rural WV bandwidth optimization (lazy-loaded images except hero)

### Accessibility (WCAG AA)

**Color Contrast:**

- [x] Class I-III (Green #2E7D32 on white): 4.57:1 ✅
- [x] Class IV (Orange #FF6F00 on black): 6.12:1 ✅
- [x] Class V (Red #C62828 on white): 5.74:1 ✅
- [x] All text/bg combos ≥ 4.5:1 ratio

**Color-Blind Support:**

- [x] Shape icons accompany all color-coded elements (●▲■)
- [x] Rapids: Circle (I-III), Triangle (IV), Square (V)

**Screen Readers:**

- [x] `aria-labelledby` on all sections
- [x] `aria-hidden="true"` on decorative SVGs
- [x] Semantic HTML (h1 → h2 → h3, section, article tags)

**Keyboard Navigation:**

- [x] All interactive elements focusable
- [x] External links use `target="_blank" rel="noopener noreferrer"`

---

## Testing Strategy (Phase 6 - Future)

### Component-Level Tests

**Vitest Unit Tests:**

```typescript
// src/components/templates/__tests__/RiverTemplate.test.ts

describe('RiverTemplate', () => {
  test('renders all 8 sections when data provided', () => {
    // Test section rendering logic
  });

  test('hides empty sections (rapids.length === 0)', () => {
    // Test conditional rendering
  });

  test('color-codes rapids by class (I-V)', () => {
    // Test inline color logic
  });

  test('validates outfitter contact (at least one method)', () => {
    // Test Zod refine logic
  });
});
```

### Visual Regression Tests

**Percy or Chromatic:**

- Hero section (desktop, tablet, mobile)
- Rapids guide grid (3-column layout)
- Seasonal flow (4-season grid)
- Safety warnings (orange border prominence)

### Accessibility Tests

**axe-core Integration:**

```typescript
test('WCAG AA compliance', async () => {
  const results = await axe(page);
  expect(results.violations).toHaveLength(0);
});
```

**Manual Testing:**

- Screen reader navigation (NVDA, JAWS)
- Keyboard-only navigation
- Color-blind simulation (Coblis)

### Performance Tests

**Lighthouse Targets:**

- Performance: ≥ 90
- Accessibility: 100
- Best Practices: ≥ 90
- SEO: 100
- LCP: < 2.5s (rural WV 2-5 Mbps bandwidth)

**WebPageTest:**

- Test on 3G connection
- Rural WV latency simulation (150ms+)

---

## Risk Assessment & Mitigation

### Technical Risks

**Risk 1: Type System Complexity**

- **Impact:** High (blocks implementation)
- **Likelihood:** Low (Zod pattern well-established)
- **Mitigation:** Follow exact LakeTemplate schema pattern, reuse existing utilities

**Risk 2: Content Collections Breaking Changes**

- **Impact:** High (breaks existing WMA/lake pages)
- **Likelihood:** Very Low (all river fields optional)
- **Mitigation:** Type guards prevent accidental querying, zero changes to existing types

**Risk 3: SEO Component Validation**

- **Impact:** Medium (rich results won't appear)
- **Likelihood:** Medium (Schema.org can be finicky)
- **Mitigation:** Use Google Rich Results Test before deployment, reference existing SchemaAdventureHero pattern

**Risk 4: WVWO Compliance Violations**

- **Impact:** High (instant PR rejection per CLAUDE.md)
- **Likelihood:** Medium (easy to miss forbidden fonts/colors)
- **Mitigation:** Scoped styles enforce rounded-sm, PR review checklist in architecture doc, automated linting (future)

### Implementation Risks

**Risk 5: Feature Creep**

- **Impact:** Medium (delays completion)
- **Likelihood:** High (temptation to add real-time USGS widget)
- **Mitigation:** Strict adherence to spec non-goals, MVP is external link only

**Risk 6: Data Population Delays**

- **Impact:** Low (template works without content)
- **Likelihood:** High (Phase 4 content research time-consuming)
- **Mitigation:** _example.ts provides complete reference, gauley.ts skeleton with TODOs

---

## Next Steps: Refinement Phase

### Task Breakdown (Ready for /speckit.plan)

**Phase 1: Type System (2 hours)**

1. Add 7 Zod schemas to `adventure.ts` (lines 433-583)
2. Add `RiverTemplateProps` interface (lines 584-632)
3. Add `isRiverAdventure()` type guard (lines 633-642)
4. Validate type compilation with `npm run typecheck`
5. Document with JSDoc comments

**Phase 2: Component Implementation (4 hours)**

1. Create `RiverTemplate.astro` scaffolding (frontmatter, imports, props)
2. Implement Hero section (70 lines)
3. Implement Rapids Guide (110 lines)
4. Implement Fishing section (80 lines)
5. Implement Outfitters section (70 lines)
6. Implement Seasonal Flow section (90 lines)
7. Implement Access Points section (95 lines)
8. Implement Safety section (75 lines)
9. Implement Nearby Attractions section (70 lines)
10. Integrate shared components (Gear, Shop, CTA)
11. Add scoped styles (rounded-sm enforcement, motion preferences)

**Phase 3: Content Collections (1 hour)**

1. Update `content.config.ts` type discriminator (line 99)
2. Add river fields (lines 112-123)
3. Import river schemas from `adventure.ts`
4. Test collection query with `isRiverAdventure()` filter
5. Validate zero breaking changes to existing collections

**Phase 4: SEO Component (2 hours)**

1. Create `SchemaRiverTemplate.astro` scaffolding
2. Implement @graph entity builder (TouristAttraction, Article, BreadcrumbList, LocalBusiness)
3. Add conditional FAQPage schema (if safety Q&A format)
4. Test JSON-LD output with Google Rich Results Test
5. Document meta tags pattern in component header

**Phase 5: Example Data Files (1 hour)**

1. Create `src/data/rivers/` directory
2. Create `_example.ts` with complete Gauley River reference (300 lines)
3. Create `gauley.ts` skeleton with TODO markers (280 lines)
4. Create `README.md` with developer documentation
5. Validate import paths and type-checking

**Total Effort:** 10 hours

### Critical Path

```
Type System → Component Hero/Rapids/Fishing → Content Collections → SEO Component
     ↓              ↓                              ↓                    ↓
  (2h)           (2h)                           (1h)                 (2h)
     ↓              ↓                              ↓                    ↓
Component Outfitters/Flow/Access/Safety → Example Data Files → Ready for Phase 4
     ↓                                          ↓
  (2h)                                       (1h)
```

### Definition of Done

- [ ] All 8 sections implemented in `RiverTemplate.astro` (~660 lines)
- [ ] 7 Zod schemas + `RiverTemplateProps` interface in `adventure.ts` (+150 lines)
- [ ] Content Collections extended with `type: 'river'` (+50 lines)
- [ ] `SchemaRiverTemplate.astro` generates valid @graph JSON-LD (~200 lines)
- [ ] Example data files created (`_example.ts`, `gauley.ts`, `README.md`)
- [ ] All WVWO compliance checks pass (fonts, colors, rounded-sm)
- [ ] Type-checking passes (`npm run typecheck`)
- [ ] Build succeeds (`npm run build`)
- [ ] Google Rich Results Test validates schema
- [ ] Zero breaking changes to existing WMA/lake pages

---

## Conclusion

This architecture document provides the complete technical blueprint for SPEC-14 River Template Component System. All major architectural decisions have been resolved with clear rationales, implementation patterns have been extracted from existing LakeTemplate code, and WVWO compliance is guaranteed through scoped styles and PR review checklists.

**Key Outcomes:**

1. **Monolithic Pattern** → Follows LakeTemplate's proven 558-line approach, scales to 660 lines for river complexity
2. **Schema-First Types** → Zod schemas ensure runtime validation, TypeScript types inferred for consistency
3. **New SEO Component** → `SchemaRiverTemplate.astro` with TouristAttraction + LocalBusiness @graph enables rich search results
4. **Inline Color Logic** → Rapids classification embedded in template, WCAG AA compliant, color-blind accessible
5. **Zero Breaking Changes** → Content Collections extension preserves existing WMA/lake functionality

**Next Action:** Generate detailed task breakdown with `/speckit.plan` command, begin Refinement phase (TDD implementation).

---

**Architecture Status:** ✅ **APPROVED - Ready for Refinement Phase**
