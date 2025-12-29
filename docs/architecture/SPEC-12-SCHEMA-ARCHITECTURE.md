# SPEC-12: Content Collections Schema Extension Architecture

**Status**: Architecture Design
**Created**: 2025-12-27
**Author**: System Architecture Designer
**Related Specs**: SPEC-12 WMA Template System

---

## Executive Summary

This document defines the schema extension architecture for adding WMA-specific fields to the existing `adventures` collection. The design prioritizes **zero breaking changes**, **incremental content migration**, and **type-safe validation** while supporting future adventure type extensions (trails, campgrounds, etc.).

**Key Decisions**:
- All 8 WMA fields are optional (`.optional()`) - no forced migration
- Nested Zod schemas for complex types (species, fishing waters, facilities)
- TypeScript inference provides compile-time type safety
- Validation errors use descriptive messages for content editors
- `type` field enables future discriminated unions (`'wma' | 'trail' | 'campground'`)

---

## 1. Schema Composition Strategy

### 1.1 Design Principles

**Nested Schemas** - Complex WMA data types decomposed into reusable Zod schemas:
```typescript
// Nested schemas provide:
// 1. Reusability across multiple collections
// 2. Focused validation error messages
// 3. TypeScript autocompletion for nested properties
// 4. Schema evolution without breaking parent schema

const SpeciesSchema = z.object({
  name: z.string().min(1, "Species name required"),
  season: z.string().min(1, "Hunting season required"),
  notes: z.string().optional(),
});

// Reusable in adventures, locations, or future collections
wma_species: z.array(SpeciesSchema).optional();
```

**Benefits**:
- **Error clarity**: `wma_species[0].name` validation failure shows exact field
- **Refactoring safety**: Change `SpeciesSchema` definition propagates everywhere
- **Documentation**: Schema serves as API contract for content editors
- **Testability**: Validate nested schemas in isolation

### 1.2 Core Schema Modules

```typescript
// =============================================================================
// NESTED SCHEMAS (Reusable Components)
// =============================================================================

/** Huntable species with season and hunting notes */
const SpeciesSchema = z.object({
  /** Species common name (e.g., "White-tailed Deer") */
  name: z.string()
    .min(1, "Species name cannot be empty")
    .max(100, "Species name too long (max 100 chars)"),

  /** Hunting season (e.g., "Nov 13 - Dec 31 (firearms)") */
  season: z.string()
    .min(1, "Season dates required")
    .regex(
      /^[A-Za-z]{3}\s\d{1,2}\s?-\s?[A-Za-z]{3}\s\d{1,2}/,
      "Season format: 'Nov 13 - Dec 31' or 'Sep 1 - Jan 31'"
    ),

  /** Kim's hunting tips (optional) */
  notes: z.string()
    .max(500, "Hunting notes too long (max 500 chars)")
    .optional(),
});

/** Fishing water body with species and access info */
const FishingWaterSchema = z.object({
  /** Water body name (e.g., "Elk River", "Sutton Lake") */
  name: z.string()
    .min(1, "Water body name required")
    .max(100, "Water name too long"),

  /** Fishable species array (e.g., ["Smallmouth Bass", "Trout"]) */
  species: z.array(z.string().min(1))
    .min(1, "At least one fish species required")
    .max(20, "Too many species listed (max 20)"),

  /** Access description (e.g., "Boat ramps at north and south ends") */
  access: z.string()
    .min(10, "Access description too brief (min 10 chars)")
    .max(500, "Access description too long (max 500 chars)"),
});

/** WMA facility (parking, boat ramps, camping) */
const FacilitySchema = z.object({
  /** Facility type (e.g., "Parking Areas", "Boat Ramps") */
  type: z.string()
    .min(1, "Facility type required")
    .max(50, "Facility type too long"),

  /** Number of facilities (optional - use for countable items) */
  count: z.number()
    .int("Facility count must be whole number")
    .positive("Facility count must be positive")
    .max(99, "Facility count unrealistic (max 99)")
    .optional(),

  /** Facility description */
  description: z.string()
    .min(5, "Facility description too brief")
    .max(300, "Facility description too long"),
});

/** WMA access point with GPS coordinates */
const AccessPointSchema = z.object({
  /** Access point name (e.g., "Main Gate", "North Trailhead") */
  name: z.string()
    .min(1, "Access point name required")
    .max(100, "Access point name too long"),

  /** GPS coordinates string (optional - format: "38.8567, -80.5331") */
  coords: z.string()
    .regex(
      /^-?\d{1,2}\.\d+,\s*-?\d{1,3}\.\d+$/,
      "Coordinates format: 'lat, lng' (e.g., '38.8567, -80.5331')"
    )
    .optional(),

  /** Features at this access point (e.g., ["Parking", "Restrooms"]) */
  features: z.array(z.string().min(1))
    .min(1, "At least one feature required")
    .max(10, "Too many features (max 10)"),
});

/** WMA regulations and restrictions */
const RegulationsSchema = z.object({
  /** DNR zone designation (optional - e.g., "Zone 3") */
  zone: z.string()
    .regex(/^Zone\s\d{1,2}$/, "Zone format: 'Zone 3'")
    .optional(),

  /** Array of WMA-specific rules */
  restrictions: z.array(z.string().min(10).max(500))
    .min(1, "At least one regulation required")
    .max(20, "Too many restrictions (max 20)"),
});

/** Seasonal highlight with target species and tips */
const SeasonHighlightSchema = z.object({
  /** Season name (e.g., "Fall", "Spring") */
  season: z.enum(['spring', 'summer', 'fall', 'winter'], {
    errorMap: () => ({ message: "Season must be: spring, summer, fall, or winter" })
  }),

  /** Target species (e.g., "Turkey", "Deer") */
  target: z.string()
    .min(1, "Target species required")
    .max(50, "Target species name too long"),

  /** Kim's seasonal hunting tips */
  tips: z.string()
    .min(10, "Seasonal tips too brief (min 10 chars)")
    .max(500, "Seasonal tips too long (max 500 chars)"),
});
```

**Validation Strategy**:
- **Min/Max Constraints**: Prevent empty strings and runaway content
- **Regex Patterns**: Enforce consistent date/coordinate formats for parsing
- **Custom Error Messages**: Guide content editors to fix validation issues
- **Array Bounds**: Prevent performance issues from overly large arrays

---

## 2. Type Field Strategy

### 2.1 Discriminated Union Design

```typescript
/**
 * Adventure type discriminator for future extensibility.
 * Enables TypeScript discriminated unions for type-safe component rendering.
 */
const AdventureTypeSchema = z.enum(['wma', 'trail', 'campground', 'lake'], {
  errorMap: () => ({
    message: "Adventure type must be: 'wma', 'trail', 'campground', or 'lake'"
  })
});

export type AdventureType = z.infer<typeof AdventureTypeSchema>;
```

**Current Scope (SPEC-12)**:
- `type: 'wma'` - Wildlife Management Area (8 new fields)

**Future Extensions** (Phase 2+):
- `type: 'trail'` - Hiking trails (trail_length, loop_type, surface_type)
- `type: 'campground'` - Camping areas (sites_count, electric_hookups, reservations)
- `type: 'lake'` - Lake recreation (boat_ramps, swimming_area, fishing_license)

### 2.2 Type-Safe Component Rendering

```typescript
// Type guards for conditional rendering
function isWMAAdventure(adventure: AdventureEntry): boolean {
  return adventure.data.type === 'wma';
}

function isTrailAdventure(adventure: AdventureEntry): boolean {
  return adventure.data.type === 'trail';
}

// Component usage
{isWMAAdventure(adventure) && (
  <WMASpeciesGrid species={adventure.data.wma_species} />
)}

{isTrailAdventure(adventure) && (
  <TrailMap route={adventure.data.trail_route} />
)}
```

**Benefits**:
- TypeScript narrows types based on discriminant field
- Components receive correctly typed data
- Prevents rendering WMA components on trail pages
- Enables future adventure type addition without refactoring

### 2.3 Schema Extension Pattern

```typescript
// Base schema (all adventures)
const baseSchema = z.object({
  title: z.string(),
  description: z.string(),
  season: z.array(SeasonEnum),
  difficulty: DifficultyEnum,
  location: z.string(),
  // ... existing fields
});

// Type-specific extensions
const wmaExtension = z.object({
  type: z.literal('wma'),
  wma_acreage: z.number().positive().optional(),
  wma_county: z.string().optional(),
  wma_species: z.array(SpeciesSchema).optional(),
  // ... 5 more WMA fields
});

const trailExtension = z.object({
  type: z.literal('trail'),
  trail_length: z.number().positive().optional(),
  trail_surface: z.enum(['paved', 'gravel', 'dirt']).optional(),
  // ... future trail fields
});

// Union schema (future - not Phase 1)
const adventuresSchema = z.discriminatedUnion('type', [
  baseSchema.merge(wmaExtension),
  baseSchema.merge(trailExtension),
]);
```

**Phase 1 Implementation**:
- Add `type` field as optional enum (`z.enum(['wma', 'trail']).optional()`)
- All 8 WMA fields remain optional
- No discriminated union (allows gradual content migration)

**Phase 2 Migration**:
- Make `type` field required once all content migrated
- Convert to discriminated union for stricter type safety
- Add trail/campground extensions

---

## 3. Validation Rules & Constraints

### 3.1 Field-Level Validation

```typescript
const adventures = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/adventures' }),
  schema: z.object({
    // === EXISTING FIELDS (unchanged) ===
    title: z.string()
      .min(1, "Adventure title required")
      .max(100, "Title too long (max 100 characters)"),

    description: z.string()
      .min(50, "Description too brief - aim for 50+ chars for SEO")
      .max(500, "Description too long (max 500 chars)"),

    season: z.array(SeasonEnum)
      .min(1, "At least one season required")
      .max(4, "Cannot exceed 4 seasons"),

    difficulty: DifficultyEnum,

    location: z.string()
      .min(3, "Location name too brief")
      .max(100, "Location name too long"),

    coordinates: z.object({
      lat: z.number()
        .min(37.0, "Latitude below WV bounds (37°N minimum)")
        .max(41.0, "Latitude above WV bounds (41°N maximum)"),
      lng: z.number()
        .min(-83.0, "Longitude west of WV bounds (83°W maximum)")
        .max(-77.0, "Longitude east of WV bounds (77°W minimum)"),
    }).optional(),

    gear: z.array(z.string().min(1))
      .max(20, "Gear list too long (max 20 items)")
      .optional(),

    elevation_gain: z.number()
      .int("Elevation must be whole number (feet)")
      .nonnegative("Elevation cannot be negative")
      .max(10000, "Elevation unrealistic for WV (max 10,000 ft)")
      .optional(),

    drive_time: z.string()
      .regex(
        /^\d{1,3}\s?(min|hr|hours?)$/,
        "Drive time format: '25 min' or '2 hr'"
      )
      .optional(),

    kim_hook: z.string()
      .min(10, "Kim's hook too brief (min 10 chars)")
      .max(200, "Kim's hook too long (max 200 chars)")
      .optional(),

    suitability: z.array(SuitabilityEnum)
      .max(4, "Too many suitability flags (max 4)")
      .optional(),

    images: z.array(ImageSchema)
      .max(10, "Too many images (max 10 per adventure)")
      .optional(),

    // === NEW WMA-SPECIFIC FIELDS (SPEC-12) ===
    type: z.enum(['wma', 'trail', 'campground', 'lake'])
      .optional(), // Phase 1: optional for gradual migration

    wma_acreage: z.number()
      .positive("WMA acreage must be positive")
      .int("WMA acreage must be whole number")
      .min(100, "WMA acreage unrealistically small (min 100 acres)")
      .max(500000, "WMA acreage unrealistically large (max 500,000 acres)")
      .optional(),

    wma_county: z.string()
      .min(3, "County name too brief")
      .max(50, "County name too long")
      .regex(
        /^[A-Z][a-z]+(\s[A-Z][a-z]+)*$/,
        "County format: 'Braxton' or 'Pocahontas County' (capitalized)"
      )
      .optional(),

    wma_species: z.array(SpeciesSchema)
      .min(1, "WMA must list at least one huntable species")
      .max(20, "Too many species (max 20)")
      .optional(),

    wma_fishing_waters: z.array(FishingWaterSchema)
      .max(10, "Too many fishing waters (max 10)")
      .optional(),

    wma_facilities: z.array(FacilitySchema)
      .min(1, "WMA must list at least one facility (e.g., parking)")
      .max(20, "Too many facilities (max 20)")
      .optional(),

    wma_access_points: z.array(AccessPointSchema)
      .min(1, "WMA must list at least one access point")
      .max(15, "Too many access points (max 15)")
      .optional(),

    wma_regulations: RegulationsSchema.optional(),

    wma_season_highlights: z.array(SeasonHighlightSchema)
      .max(4, "Too many seasonal highlights (max 4 - one per season)")
      .optional(),
  }),
});
```

### 3.2 Cross-Field Validation (Future Enhancement)

```typescript
// Phase 2: Add refine() for cross-field logic
.refine(
  (data) => {
    // If type is 'wma', at least one WMA field must be defined
    if (data.type === 'wma') {
      return data.wma_acreage !== undefined ||
             data.wma_species !== undefined ||
             data.wma_facilities !== undefined;
    }
    return true;
  },
  {
    message: "WMA adventures must define at least one WMA-specific field",
    path: ['type'], // Error displayed on 'type' field
  }
)
.refine(
  (data) => {
    // GPS coordinates must be within West Virginia bounds
    if (data.coordinates) {
      const { lat, lng } = data.coordinates;
      const inWV = lat >= 37.2 && lat <= 40.6 && lng >= -82.6 && lng <= -77.7;
      return inWV;
    }
    return true;
  },
  {
    message: "GPS coordinates outside West Virginia bounds",
    path: ['coordinates'],
  }
);
```

**Validation Hierarchy**:
1. **Field-level**: Min/max, regex, enum checks (Zod built-in)
2. **Schema-level**: Cross-field logic via `refine()` (Phase 2)
3. **Runtime**: TypeScript type guards in components
4. **Build-time**: Astro Content Collections validates all content during build

---

## 4. Error Messages Design

### 4.1 Content Editor Experience

**Bad Error (Generic)**:
```
Validation error in elk-river.md:
- Expected number, received string at wma_acreage
```

**Good Error (Descriptive)**:
```
Validation error in elk-river.md:
- wma_acreage: WMA acreage must be whole number (got "19,646" - remove commas)
- wma_species[0].season: Season format: 'Nov 13 - Dec 31' or 'Sep 1 - Jan 31' (got "November 13-31")
- wma_fishing_waters[1].access: Access description too brief (min 10 chars) - got "Boat ramps"
```

### 4.2 Error Message Patterns

```typescript
// Pattern 1: Expected Format
z.string().regex(
  /^Zone\s\d{1,2}$/,
  "Zone format: 'Zone 3'"
)

// Pattern 2: Constraint Violation
z.number().max(500000, "WMA acreage unrealistically large (max 500,000 acres)")

// Pattern 3: Enumeration
z.enum(['spring', 'summer', 'fall', 'winter'], {
  errorMap: () => ({ message: "Season must be: spring, summer, fall, or winter" })
})

// Pattern 4: Contextual Guidance
z.string().min(10, "Access description too brief (min 10 chars) - explain how to reach this water")
```

**Error Message Principles**:
1. **State the problem**: What's wrong with the value
2. **Show the constraint**: What the system expects
3. **Provide example**: What a valid value looks like
4. **Contextual help**: Why this matters (e.g., "for SEO", "for parsing")

### 4.3 Build-Time Validation Output

```bash
# Successful build
✓ adventures collection: 9 entries validated
  - 1 WMA adventure (elk-river.md)
  - 8 trail adventures

# Failed build with clear errors
✖ adventures collection: Validation failed

elk-river.md:
  ✖ wma_acreage: WMA acreage must be whole number (got "19,646")
     Fix: Change to 19646 (no commas)

  ✖ wma_species[0].season: Season format invalid
     Got: "November 13-31"
     Expected: "Nov 13 - Dec 31" (abbreviated month, space around dash)

  ✖ wma_fishing_waters[1].species: At least one fish species required
     Fix: Add species array like ["Smallmouth Bass", "Trout"]

Build failed with 3 validation errors
```

---

## 5. Migration Path

### 5.1 Phase 1: Schema Extension (This SPEC)

**Goal**: Add WMA fields without breaking existing content

```typescript
// content.config.ts (Phase 1)
const adventures = defineCollection({
  schema: z.object({
    // All existing fields unchanged
    title: z.string(),
    description: z.string(),
    // ...

    // NEW: All optional (no forced migration)
    type: z.enum(['wma', 'trail']).optional(),
    wma_acreage: z.number().optional(),
    wma_county: z.string().optional(),
    // ... 6 more optional WMA fields
  }),
});
```

**Outcome**:
- Existing adventures validate without changes
- New WMA fields available for gradual population
- Build passes with 0 migration effort

### 5.2 Phase 2: Content Population (SPEC-21+)

**Goal**: Migrate elk-river.md to use new WMA fields

**Before** (existing frontmatter):
```yaml
---
title: "Elk River Wildlife Management Area"
description: "West Virginia's oldest wildlife management area..."
season: [fall, spring]
difficulty: moderate
location: "Elk River WMA"
coordinates:
  lat: 38.8567
  lng: -80.5331
elevation_gain: 1450
drive_time: "15 min"
---
```

**After** (WMA fields populated):
```yaml
---
title: "Elk River Wildlife Management Area"
description: "West Virginia's oldest wildlife management area..."
season: [fall, spring]
difficulty: moderate
location: "Elk River WMA"
coordinates:
  lat: 38.8567
  lng: -80.5331
elevation_gain: 1450
drive_time: "15 min"

# NEW SPEC-12 FIELDS
type: wma
wma_acreage: 104000
wma_county: "Braxton"
wma_species:
  - name: "White-tailed Deer"
    season: "Nov 13 - Dec 31"
    notes: "Prime ridge hunting along the lake overlook"
  - name: "Wild Turkey"
    season: "Apr 15 - May 15"
    notes: "Gobblers roost in the hardwood hollows"
  - name: "Ruffed Grouse"
    season: "Oct 1 - Feb 28"
    notes: "Thick laurel patches near upper ridges"
wma_fishing_waters:
  - name: "Elk River"
    species: ["Smallmouth Bass", "Rock Bass", "Muskie"]
    access: "Multiple boat ramps along Airport Rd with wade-friendly banks"
wma_facilities:
  - type: "Parking Areas"
    count: 3
    description: "Gravel lots at main gate, north access, south trailhead"
  - type: "Boat Ramps"
    count: 2
    description: "Concrete ramps on Sutton Lake with trailer parking"
wma_access_points:
  - name: "Main Entrance"
    coords: "38.8567, -80.5331"
    features: ["Parking", "Restrooms", "Information Kiosk"]
  - name: "North Trailhead"
    coords: "38.8612, -80.5289"
    features: ["Parking", "Trail Access"]
wma_regulations:
  zone: "Zone 3"
  restrictions:
    - "No hunting within 200 yards of boat ramps"
    - "Check daily harvest limits before field dressing"
    - "Blaze orange required during firearms seasons"
wma_season_highlights:
  - season: spring
    target: "Turkey"
    tips: "Gobblers love the oak ridges. Set up before sunrise and don't overcall."
  - season: fall
    target: "Deer"
    tips: "Rut kicks in mid-November. Watch the creek bottoms and oak stands."
---
```

**Migration Checklist**:
1. Add `type: wma` discriminant
2. Populate `wma_acreage` and `wma_county` (basic fields)
3. Extract species from body text to `wma_species` array
4. Document fishing waters in `wma_fishing_waters`
5. List facilities in `wma_facilities`
6. Map access points with GPS coords
7. Extract regulations to `wma_regulations`
8. Add seasonal highlights to `wma_season_highlights`

### 5.3 Phase 3: Template Integration

**Goal**: WMATemplate.astro consumes new fields

```astro
---
// wma/[slug].astro
import { getEntry } from 'astro:content';
import WMATemplate from '@layouts/WMATemplate.astro';

const { slug } = Astro.params;
const adventure = await getEntry('adventures', slug);

// Type guard ensures WMA-specific fields exist
if (!adventure || adventure.data.type !== 'wma') {
  return Astro.redirect('/404');
}
---

<WMATemplate adventure={adventure}>
  <!-- Template handles all WMA field rendering -->
</WMATemplate>
```

**Template Rendering Logic**:
```astro
---
// WMATemplate.astro
const { adventure } = Astro.props;

// Conditional rendering based on field presence
const showSpecies = adventure.data.wma_species?.length > 0;
const showFishing = adventure.data.wma_fishing_waters?.length > 0;
const showRegulations = adventure.data.wma_regulations !== undefined;
---

{showSpecies && (
  <WMASpeciesGrid species={adventure.data.wma_species} />
)}

{showFishing && (
  <WMAFishingWaters waters={adventure.data.wma_fishing_waters} />
)}

{showRegulations && (
  <WMARegulations {...adventure.data.wma_regulations} />
)}
```

### 5.4 Phase 4: Strictness Enforcement (Future)

**Goal**: Make `type` field required once all content migrated

```typescript
// content.config.ts (Phase 4 - future)
const adventures = defineCollection({
  schema: z.discriminatedUnion('type', [
    // WMA adventure (all WMA fields available)
    z.object({
      type: z.literal('wma'),
      // ... base fields
      wma_acreage: z.number().optional(),
      wma_species: z.array(SpeciesSchema).optional(),
      // ... 6 more WMA fields
    }),

    // Trail adventure (trail fields available)
    z.object({
      type: z.literal('trail'),
      // ... base fields
      trail_length: z.number().optional(),
      trail_surface: z.enum(['paved', 'gravel', 'dirt']).optional(),
      // ... future trail fields
    }),
  ]),
});
```

**Benefits of Discriminated Union**:
- TypeScript narrows types based on `type` discriminant
- WMA pages cannot access `trail_*` fields (compile error)
- Trail pages cannot access `wma_*` fields (compile error)
- Impossible to create hybrid adventures with mixed field types

---

## 6. Type Safety Benefits

### 6.1 TypeScript Inference

```typescript
import type { CollectionEntry } from 'astro:content';

// Inferred from Zod schema automatically
type AdventureEntry = CollectionEntry<'adventures'>;

// Access WMA fields with full type safety
const adventure: AdventureEntry = await getEntry('adventures', 'elk-river');

// TypeScript knows these are optional
adventure.data.wma_acreage;  // number | undefined
adventure.data.wma_species;  // SpeciesItem[] | undefined

// Nested type inference works
if (adventure.data.wma_species) {
  adventure.data.wma_species[0].name;    // string
  adventure.data.wma_species[0].season;  // string
  adventure.data.wma_species[0].notes;   // string | undefined
}
```

### 6.2 Component Props Type Safety

```typescript
// WMASpeciesGrid.astro
interface Props {
  species: Array<{
    name: string;
    season: string;
    notes?: string;
  }>;
}

// TypeScript enforces correct prop types
<WMASpeciesGrid species={adventure.data.wma_species} /> // ✅ Valid
<WMASpeciesGrid species={adventure.data.gear} />        // ❌ Type error
```

### 6.3 Build-Time Error Catching

**Scenario**: Content editor misspells field name

```yaml
# elk-river.md (WRONG - typo in field name)
wma_accreage: 104000  # Typo: "accreage" instead of "acreage"
```

**Build Output**:
```bash
✖ Validation error in elk-river.md:
  Unrecognized key "wma_accreage" in frontmatter

  Did you mean: "wma_acreage"?

Build failed - fix validation errors and retry
```

**Scenario**: Content editor uses wrong data type

```yaml
# elk-river.md (WRONG - acreage as string with commas)
wma_acreage: "104,000"
```

**Build Output**:
```bash
✖ Validation error in elk-river.md:
  wma_acreage: Expected number, received string

  Fix: Remove quotes and commas → wma_acreage: 104000

Build failed - fix validation errors and retry
```

---

## 7. Future Extensions

### 7.1 Trail Adventure Type (Phase 2)

```typescript
const trailExtension = z.object({
  type: z.literal('trail'),
  trail_length: z.number()
    .positive("Trail length must be positive")
    .max(100, "Trail length unrealistic (max 100 miles)")
    .optional(),
  trail_surface: z.enum(['paved', 'gravel', 'dirt', 'mixed'])
    .optional(),
  trail_loop_type: z.enum(['loop', 'out-and-back', 'point-to-point'])
    .optional(),
  trail_markers: z.enum(['blazed', 'cairns', 'none'])
    .optional(),
  trail_dogs_allowed: z.boolean().default(true),
});
```

### 7.2 Campground Adventure Type (Phase 3)

```typescript
const campgroundExtension = z.object({
  type: z.literal('campground'),
  camp_sites_count: z.number().int().positive().optional(),
  camp_electric_hookups: z.boolean().default(false),
  camp_water_access: z.boolean().default(false),
  camp_reservations_required: z.boolean().default(false),
  camp_reservation_url: z.string().url().optional(),
  camp_pet_friendly: z.boolean().default(true),
});
```

### 7.3 Extensibility Pattern

```typescript
// Future: Plugin-based schema extensions
// Allows third-party modules to extend schema without modifying core

import { extendAdventuresSchema } from '@wvwo/content-extensions';

const adventures = defineCollection({
  schema: extendAdventuresSchema([
    wmaExtension,
    trailExtension,
    campgroundExtension,
    // Future: caveExtension, waterfallExtension, etc.
  ]),
});
```

---

## 8. Summary & Acceptance Criteria

### 8.1 Architecture Decisions

| Decision | Rationale |
|----------|-----------|
| **All WMA fields optional** | Zero breaking changes - gradual migration |
| **Nested Zod schemas** | Reusability, focused errors, TypeScript inference |
| **`type` field discriminant** | Future-proof for trail/campground extensions |
| **Descriptive error messages** | Guide content editors to fix validation issues |
| **GPS bounds validation** | Catch data entry errors (coordinates outside WV) |
| **Min/max constraints** | Prevent empty content and performance issues |

### 8.2 Acceptance Criteria

**Schema Extension**:
- [ ] 8 WMA fields added to `adventures` collection schema
- [ ] All WMA fields are `.optional()` (no forced migration)
- [ ] Nested schemas: SpeciesSchema, FishingWaterSchema, FacilitySchema, AccessPointSchema, RegulationsSchema, SeasonHighlightSchema
- [ ] `type` field added as optional enum (`'wma' | 'trail' | 'campground' | 'lake'`)

**Validation**:
- [ ] Field-level validation with min/max constraints
- [ ] Regex patterns for season dates, GPS coords, drive time, county names
- [ ] Custom error messages for all validation rules
- [ ] GPS coordinates bounded to West Virginia (37-41°N, -83 to -77°W)
- [ ] Build fails with descriptive errors on invalid content

**Type Safety**:
- [ ] TypeScript infers all field types from Zod schemas
- [ ] Component props correctly typed for WMA fields
- [ ] Build-time errors catch field name typos
- [ ] Build-time errors catch wrong data types (string vs number)

**Migration**:
- [ ] Existing adventures validate without changes
- [ ] No breaking changes to existing content
- [ ] elk-river.md migrated to use all 8 WMA fields
- [ ] WMATemplate conditionally renders based on field presence

**Documentation**:
- [ ] Schema architecture documented in this file
- [ ] Validation rules documented with examples
- [ ] Migration path documented for content editors
- [ ] Error message patterns documented

---

## 9. Implementation Checklist

### 9.1 Schema Extension (content.config.ts)

```typescript
// File: wv-wild-web/src/content.config.ts

// 1. Define nested schemas
const SpeciesSchema = z.object({ ... });
const FishingWaterSchema = z.object({ ... });
const FacilitySchema = z.object({ ... });
const AccessPointSchema = z.object({ ... });
const RegulationsSchema = z.object({ ... });
const SeasonHighlightSchema = z.object({ ... });

// 2. Add type discriminant
const AdventureTypeSchema = z.enum(['wma', 'trail', 'campground', 'lake']);

// 3. Extend adventures schema
const adventures = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/adventures' }),
  schema: z.object({
    // Existing fields (lines 38-53)
    // ...

    // NEW: Type discriminant
    type: AdventureTypeSchema.optional(),

    // NEW: WMA fields (all optional)
    wma_acreage: z.number().positive().int().optional(),
    wma_county: z.string().min(3).max(50).optional(),
    wma_species: z.array(SpeciesSchema).optional(),
    wma_fishing_waters: z.array(FishingWaterSchema).optional(),
    wma_facilities: z.array(FacilitySchema).optional(),
    wma_access_points: z.array(AccessPointSchema).optional(),
    wma_regulations: RegulationsSchema.optional(),
    wma_season_highlights: z.array(SeasonHighlightSchema).optional(),
  }),
});
```

### 9.2 Type Exports (types/adventure.ts)

```typescript
// File: wv-wild-web/src/types/adventure.ts

// Export Zod schemas for runtime validation
export {
  SpeciesSchema,
  FishingWaterSchema,
  FacilitySchema,
  AccessPointSchema,
  RegulationsSchema,
  SeasonHighlightSchema,
  AdventureTypeSchema,
};

// Export TypeScript types
export type AdventureType = z.infer<typeof AdventureTypeSchema>;
export type Species = z.infer<typeof SpeciesSchema>;
export type FishingWater = z.infer<typeof FishingWaterSchema>;
export type Facility = z.infer<typeof FacilitySchema>;
export type AccessPoint = z.infer<typeof AccessPointSchema>;
export type Regulations = z.infer<typeof RegulationsSchema>;
export type SeasonHighlight = z.infer<typeof SeasonHighlightSchema>;

// Type guards
export function isWMAAdventure(adventure: CollectionEntry<'adventures'>): boolean {
  return adventure.data.type === 'wma';
}
```

### 9.3 Content Migration (elk-river.md)

```yaml
# File: wv-wild-web/src/content/adventures/elk-river.md

---
# Existing fields (keep as-is)
title: "Elk River Wildlife Management Area"
description: "West Virginia's oldest wildlife management area..."
season: [fall, spring]
difficulty: moderate
location: "Elk River WMA"

# NEW: Add type discriminant
type: wma

# NEW: Populate WMA fields
wma_acreage: 104000
wma_county: "Braxton"
wma_species:
  - name: "White-tailed Deer"
    season: "Nov 13 - Dec 31"
    notes: "Prime ridge hunting"
# ... (full migration in SPEC-21)
---
```

### 9.4 Build Validation Test

```bash
# Test schema validates existing content
npm run build

# Expected output:
# ✓ adventures collection: 9 entries validated
#   - 1 WMA adventure (elk-river.md)
#   - 8 trail adventures
# Build succeeded

# Test schema rejects invalid content
# (Add test case with invalid wma_acreage: "104,000")
npm run build

# Expected output:
# ✖ Validation error in elk-river.md:
#   wma_acreage: Expected number, received string
# Build failed
```

---

**End of Schema Architecture Design**

This architecture provides a robust, type-safe foundation for WMA content while maintaining full backward compatibility and enabling future adventure type extensions.
