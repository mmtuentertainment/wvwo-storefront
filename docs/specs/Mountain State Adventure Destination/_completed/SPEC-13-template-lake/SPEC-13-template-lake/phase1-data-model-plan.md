# SPEC-13 Implementation Plan: Phase 1 - Data Model Design

**Version**: 1.0.0
**Created**: 2025-12-29
**Phase**: Data Model Foundation
**Status**: Ready for Implementation

---

## Overview

Phase 1 establishes the **type-safe data model** for the Lake Template Component System (SPEC-13). This phase extends the existing `adventure.ts` type system with 5 new Zod schemas and 1 master interface to support comprehensive lake recreation content.

**Architecture Strategy**: Additive-only type system extensions (zero breaking changes) that integrate seamlessly with existing SPEC-11 adventure components while introducing lake-specific data structures for fishing spots, marinas, activities, seasonal guides, and regulations.

---

## Type System Architecture

### File Structure

```
wv-wild-web/src/types/
└── adventure.ts
    ├── [EXISTING] GearItem (SPEC-11)
    ├── [EXISTING] RelatedCategory (SPEC-11)
    ├── [EXISTING] CampingFacility (SPEC-12)
    ├── [EXISTING] FeatureItem (SPEC-12)
    ├── [EXISTING] StatItem (SPEC-10)
    │
    ├── [NEW] FishingSpot           # Lines ~300-330
    ├── [NEW] Marina                # Lines ~330-365
    ├── [NEW] Activity              # Lines ~365-385
    ├── [NEW] SeasonalGuide         # Lines ~385-405
    ├── [NEW] Regulation            # Lines ~405-425
    └── [NEW] LakeTemplateProps     # Lines ~425-500
```

**Current File Size**: 295 lines
**After Phase 1**: ~500 lines (+205 lines)
**Breaking Changes**: None (all changes are additive)

---

## Entity Definitions

### 1. FishingSpot (Lake-Specific Entity)

**Purpose**: Named fishing location within a lake with depth, structure, and target species information.

**Schema Design**:

```typescript
/**
 * Fishing spot schema for named locations within lakes
 * Used in "Where to Fish" section for spot-specific information
 */
export const FishingSpotSchema = z.object({
  /** Spot name (e.g., "Long Point Cliff", "Dam End", "Battle Run Cove") */
  name: z.string().min(1),

  /** Water depth range (e.g., "20-45 feet", "40+ feet", "15-30 feet") */
  depth: z.string(),

  /** Bottom structure description (e.g., "Rocky points with submerged ledges", "Sandy bottom with timber") */
  structure: z.string(),

  /** Array of target fish species for this spot */
  species: z.array(z.string().min(1)).min(1),

  /** Access method (e.g., "Boat only", "Shore accessible", "Kayak launch nearby") */
  access: z.string(),
});

export type FishingSpot = z.infer<typeof FishingSpotSchema>;
```

**Validation Rules**:

- `name`: Required, non-empty string
- `depth`: Required string (no numeric validation, allows descriptive ranges)
- `structure`: Required string (supports detailed descriptions)
- `species`: Required array with at least 1 species
- `access`: Required string (human-readable access method)

**Usage Example**:

```typescript
const summersvilleFishingSpots: FishingSpot[] = [
  {
    name: 'Long Point Cliff',
    depth: '40-60 feet',
    structure: 'Towering rock formation, submerged ledges, boulders',
    species: ['Smallmouth Bass', 'Walleye', 'Muskie'],
    access: 'Boat only, 2 miles from Battle Run launch'
  },
  {
    name: 'Dam End',
    depth: '100+ feet',
    structure: 'Deep water with rocky bottom, vertical drop-offs',
    species: ['Walleye', 'Muskie', 'Lake Trout'],
    access: 'Boat access from Battle Run or Salmon Run ramps'
  }
];
```

**Array Size Limit**: Maximum 15 fishing spots per lake (performance constraint)

---

### 2. Marina (Facility Entity)

**Purpose**: Boat access facility with services, launch details, rentals, and contact information.

**Schema Design**:

```typescript
/**
 * Marina schema for boat access facilities
 * Includes services, boat launch details, rentals, hours, and contact
 */
export const MarinaSchema = z.object({
  /** Marina name (e.g., "Summersville Lake Marina", "Battle Run Marina") */
  name: z.string().min(1),

  /** Available services (e.g., "Fuel", "Bait & tackle", "Ice", "Snacks", "Boat repairs") */
  services: z.array(z.string().min(1)),

  /** Boat launch details */
  boatLaunch: z.object({
    /** Number of boat ramps */
    ramps: z.number().int().positive(),

    /** Launch fee (optional, e.g., "$5", "Free", "$10/day") */
    fee: z.string().optional(),
  }),

  /** Rental options (optional, e.g., "Kayaks", "Pontoon boats", "Fishing boats") */
  rentals: z.array(z.string()).optional(),

  /** Operating hours (e.g., "7am-8pm daily (May-Oct)", "Seasonal") */
  hours: z.string(),

  /** Contact phone number (e.g., "(304) 872-3773") */
  contact: z.string(),
});

export type Marina = z.infer<typeof MarinaSchema>;
```

**Validation Rules**:

- `name`: Required, non-empty string
- `services`: Required array (at least 1 service)
- `boatLaunch.ramps`: Required positive integer
- `boatLaunch.fee`: Optional string (allows "Free" or pricing)
- `rentals`: Optional array (empty or contains strings)
- `hours`: Required string (human-readable schedule)
- `contact`: Required string (no phone format validation)

**Usage Example**:

```typescript
const summersvilleMarina: Marina = {
  name: 'Summersville Lake Marina',
  services: [
    'Marine fuel (gas)',
    'Bait & tackle shop',
    'Ice and drinks',
    'Snacks and supplies',
    'Boat slip rentals'
  ],
  boatLaunch: {
    ramps: 3,
    fee: '$5'
  },
  rentals: ['Kayaks', 'Pontoon boats (seasonal)', 'Fishing boat charters'],
  hours: '7am-8pm daily (Memorial Day - Labor Day)',
  contact: '(304) 872-3773'
};
```

**Cardinality**: Each lake has exactly ONE marina (1:1 relationship)

---

### 3. Activity (Recreation Entity)

**Purpose**: Non-fishing recreation activity with seasonal availability and difficulty rating.

**Schema Design**:

```typescript
/**
 * Activity schema for non-fishing recreation options
 * Used in Activities section for diving, swimming, kayaking, etc.
 */
export const ActivitySchema = z.object({
  /** Activity name (e.g., "Scuba Diving", "Swimming", "Kayaking") */
  name: z.string().min(1),

  /** Activity description with details */
  description: z.string().min(1),

  /** Best season for activity (e.g., "May-October", "Year-round", "Summer only") */
  season: z.string(),

  /** Optional difficulty level */
  difficulty: z.enum(['easy', 'moderate', 'challenging']).optional(),
});

export type Activity = z.infer<typeof ActivitySchema>;
```

**Validation Rules**:

- `name`: Required, non-empty string
- `description`: Required, non-empty string (supports long-form content)
- `season`: Required string (descriptive, not date range)
- `difficulty`: Optional enum with 3 valid values

**Usage Example**:

```typescript
const summersvilleActivities: Activity[] = [
  {
    name: 'Scuba Diving',
    description: 'Long Point Cliff is the signature dive site with 40+ foot visibility. Towering rock formation plunges underwater. Sarge\'s Dive Shop offers rentals and certification.',
    season: 'May-October (water temps 68-80°F)',
    difficulty: 'moderate'
  },
  {
    name: 'Cliff Jumping',
    description: 'Pyramid-shaped rock formation at Long Point is popular for jumping. Several safe spots around the point. WARNING: Jumping from surrounding sandstone cliffs is prohibited.',
    season: 'Summer (June-August)',
    difficulty: 'challenging'
  },
  {
    name: 'Swimming',
    description: 'Battle Run Beach offers designated swimming area with lifeguards. Crystal clear water with excellent visibility.',
    season: 'Memorial Day - Labor Day',
    difficulty: 'easy'
  }
];
```

**Array Size Limit**: Maximum 20 activities per lake

---

### 4. SeasonalGuide (Temporal Entity)

**Purpose**: Season-specific activity highlights and fishing patterns to help visitors plan trips.

**Schema Design**:

```typescript
/**
 * Seasonal guide schema for season-by-season breakdown
 * Helps visitors plan trips based on time of year
 */
export const SeasonalGuideSchema = z.object({
  /** Season name */
  season: z.enum(['Spring', 'Summer', 'Fall', 'Winter']),

  /** Activity highlights for this season */
  highlights: z.array(z.string().min(1)).min(1),

  /** Optional fishing focus/notes for the season */
  fishingFocus: z.string().optional(),
});

export type SeasonalGuide = z.infer<typeof SeasonalGuideSchema>;
```

**Validation Rules**:

- `season`: Required enum (exactly 4 valid values)
- `highlights`: Required array with at least 1 highlight
- `fishingFocus`: Optional string (allows omitting for non-fishing seasons)

**Usage Example**:

```typescript
const summersvilleSeasonalGuide: SeasonalGuide[] = [
  {
    season: 'Spring',
    highlights: [
      'Smallmouth spawn in shallow rocky areas',
      'Walleye fishing peaks (pre-spawn)',
      'Crappie fishing excellent in coves',
      'Water temps rise from 50°F to 65°F',
      'Battle Run Campground opens mid-May'
    ],
    fishingFocus: 'Target shallow rocky areas 5-15 feet deep for pre-spawn smallmouth. Use jerkbaits and suspending crankbaits.'
  },
  {
    season: 'Summer',
    highlights: [
      'Peak tourism season',
      'Scuba diving with 30-45 ft visibility',
      'Swimming beach open with lifeguards',
      'All marinas and campgrounds fully operational',
      'Cliff jumping popular at Long Point'
    ],
    fishingFocus: 'Deep water fishing for smallmouth (25-40 ft). Early morning and late evening best. Use drop shot rigs and deep-diving crankbaits.'
  },
  {
    season: 'Fall',
    highlights: [
      'Smallmouth fishing peaks again',
      'Walleye active as water cools',
      'Fall foliage views from water',
      'Fewer crowds after Labor Day',
      'Water temps drop from 70°F to 50°F'
    ],
    fishingFocus: 'Smallmouth move back to shallower structure 15-30 ft. Topwater effective at dawn. Target rocky points and ledges.'
  },
  {
    season: 'Winter',
    highlights: [
      'Limited lake access (some ramps close)',
      'Walleye fishing for trophy fish',
      'Extremely clear water (lowest algae)',
      'Quiet season - solitude for anglers',
      'Battle Run Campground closed'
    ],
    fishingFocus: 'Deep water walleye near dam (40-60 ft). Vertical jigging with live bait. Night fishing permitted. Dress warm - air temps 20-40°F.'
  }
];
```

**Cardinality**: Each lake has exactly 4 seasonal guides (one per season)

---

### 5. Regulation (Compliance Entity)

**Purpose**: Safety or legal regulation organized by category for easy scanning.

**Schema Design**:

```typescript
/**
 * Regulation schema for safety rules and legal requirements
 * Organized by category for easier scanning
 */
export const RegulationSchema = z.object({
  /** Regulation category (e.g., "Walleye Regulations", "Boating Safety", "Lake Permits") */
  category: z.string().min(1),

  /** Array of specific rules for this category */
  rules: z.array(z.string().min(1)).min(1),
});

export type Regulation = z.infer<typeof RegulationSchema>;
```

**Validation Rules**:

- `category`: Required, non-empty string (user-defined categories)
- `rules`: Required array with at least 1 rule

**Usage Example**:

```typescript
const summersvilleRegulations: Regulation[] = [
  {
    category: 'Walleye Regulations',
    rules: [
      'All walleye 20-30 inches MUST be released immediately',
      'Daily creel limit: 8 walleye maximum',
      'Only 1 walleye over 30 inches may be kept per day',
      'Possession limit: 16 walleye (2 days worth)',
      'Night fishing permitted year-round'
    ]
  },
  {
    category: 'Boating Safety',
    rules: [
      'All boats must have USCG-approved life jackets for each person',
      'Children under 13 MUST wear life jacket when boat is underway',
      'No-wake zones within 50 feet of shore, docks, swimmers',
      'Navigation lights required after sunset',
      'Horsepower limits: No motors over 10 HP in certain coves (see map)'
    ]
  },
  {
    category: 'Scuba Diving',
    rules: [
      'Divers must display dive flag when submerged',
      'Boats must stay 100 feet from dive flags',
      'Buddy system required - never dive alone',
      'Register with marina before diving (emergency contacts)',
      'Maximum depth: 60 feet without advanced certification'
    ]
  }
];
```

**Array Size Limit**: Maximum 20 regulation categories per lake

---

## Master Props Interface

### LakeTemplateProps (16 Fields)

**Purpose**: Complete type-safe interface for all Lake Template props, combining existing SPEC-11 types with new lake-specific types.

**Interface Definition**:

```typescript
/**
 * Complete props interface for LakeTemplate.astro component
 * SPEC-13: Reusable template for WV lake recreation pages
 *
 * @example
 * ```astro
 * ---
 * import LakeTemplate from '../components/templates/LakeTemplate.astro';
 * import type { LakeTemplateProps } from '../types/adventure';
 *
 * const lakeData: LakeTemplateProps = {
 *   name: 'Summersville Lake',
 *   acreage: 2790,
 *   maxDepth: 327,
 *   county: 'Nicholas',
 *   // ... rest of data
 * };
 * ---
 *
 * <LakeTemplate {...lakeData} />
 * ```
 */
export interface LakeTemplateProps {
  // ============================================================================
  // BASIC INFORMATION (Required)
  // ============================================================================

  /** Lake name displayed in hero (e.g., "Summersville Lake") */
  name: string;

  /** Surface acreage for stats display */
  acreage: number;

  /** Maximum depth in feet for stats display */
  maxDepth: number;

  /** County name for location (e.g., "Nicholas") */
  county: string;

  /** Quick highlight badges shown in hero (3-5 recommended) */
  quickHighlights: string[];

  // ============================================================================
  // FISHING CONTENT (Primary Focus - Required)
  // ============================================================================

  /**
   * Fish species available in lake with techniques and tips
   * Uses existing FishingFeature type from SPEC-11
   * Display order: most popular/targeted species first
   */
  fishSpecies: Array<{
    title: string;           // Species name
    description: string;     // Season and availability
    notes?: string;          // Kim's fishing tips (font-hand)
  }>;

  /**
   * Named fishing spots with structure and target species
   * NEW type - see FishingSpot schema above
   */
  fishingSpots: FishingSpot[];

  // ============================================================================
  // FACILITIES (Required for trip planning)
  // ============================================================================

  /**
   * Campground facilities
   * Uses existing CampingFacility type from SPEC-12
   */
  campgrounds: CampingFacility[];

  /**
   * Marina and boat access information
   * NEW type - see Marina schema above
   */
  marina: Marina;

  // ============================================================================
  // ACTIVITIES & PLANNING (Optional but recommended)
  // ============================================================================

  /**
   * Recreation activities beyond fishing
   * NEW type - see Activity schema above
   */
  activities: Activity[];

  /**
   * Seasonal breakdown with highlights
   * NEW type - see SeasonalGuide schema above
   */
  seasonalGuide: SeasonalGuide[];

  // ============================================================================
  // SAFETY & REGULATIONS (Required for legal compliance)
  // ============================================================================

  /**
   * Safety rules and regulations by category
   * NEW type - see Regulation schema above
   */
  regulations: Regulation[];

  // ============================================================================
  // MEDIA & METADATA (Required)
  // ============================================================================

  /** Hero image path (relative to public/ or absolute URL) */
  heroImage: string;

  /** Optional Google Maps link for directions */
  mapUrl?: string;

  // ============================================================================
  // OVERRIDES (Optional - use with caution)
  // ============================================================================

  /** Override default page title (default: "{name} | WV Wild Outdoors") */
  title?: string;

  /** Override default intro text in hero section */
  intro?: string;
}
```

**Field Breakdown by Type**:

- **Primitives**: 4 fields (name, acreage, maxDepth, county)
- **Arrays**: 6 fields (quickHighlights, fishSpecies, fishingSpots, campgrounds, activities, seasonalGuide, regulations)
- **Objects**: 1 field (marina)
- **Media**: 1 field (heroImage)
- **Optional**: 4 fields (activities, mapUrl, title, intro)

---

## Data Relationships

### Entity Relationship Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         Lake (Core)                             │
│  • name: string                                                 │
│  • acreage: number                                              │
│  • maxDepth: number                                             │
│  • county: string                                               │
│  • quickHighlights: string[]                                    │
│  • heroImage: string                                            │
│  • mapUrl?: string                                              │
└──────────────────┬──────────────────────────────────────────────┘
                   │
       ┌───────────┼───────────┬───────────────┬──────────────┐
       │           │           │               │              │
       ▼           ▼           ▼               ▼              ▼
┌──────────┐ ┌──────────┐ ┌─────────┐ ┌──────────────┐ ┌──────────┐
│  Fish    │ │ Fishing  │ │ Marina  │ │  Campground  │ │ Activity │
│ Species  │ │  Spots   │ │         │ │  (SPEC-12)   │ │          │
│ (Reuse)  │ │  (NEW)   │ │  (NEW)  │ │              │ │  (NEW)   │
└──────────┘ └──────────┘ └─────────┘ └──────────────┘ └──────────┘
   1..20        1..15         1            0..10           0..20

       ┌───────────┴───────────┐
       ▼                       ▼
┌──────────────┐       ┌──────────────┐
│  Seasonal    │       │ Regulations  │
│   Guide      │       │              │
│   (NEW)      │       │    (NEW)     │
└──────────────┘       └──────────────┘
     4 (fixed)             1..20
```

**Relationship Definitions**:

1. **Lake HAS-MANY FishingSpots** (1:15)
   - Each lake can have up to 15 named fishing spots
   - FishingSpots are lake-specific (not shared across lakes)
   - Rendered in "Where to Fish" section

2. **Lake HAS-MANY Campgrounds** (1:10)
   - Each lake can have up to 10 campground facilities
   - Uses existing CampingFacility type from SPEC-12
   - Rendered in "Camping Facilities" section

3. **Lake HAS-ONE Marina** (1:1)
   - Each lake has exactly one marina facility
   - Required field (all WV lakes with boat access have a marina)
   - Rendered in "Marina & Boat Access" section

4. **Lake HAS-MANY Activities** (1:20)
   - Each lake can have up to 20 recreation activities
   - Activities are non-fishing (diving, swimming, kayaking, etc.)
   - Rendered in "Activities" section

5. **Lake HAS-MANY Regulations** (1:20)
   - Each lake can have up to 20 regulation categories
   - Regulations are grouped by category (boating, fishing, safety)
   - Rendered in "Safety & Regulations" section

6. **Lake HAS-FOUR SeasonalGuides** (1:4)
   - Each lake has exactly 4 seasonal guides (Spring, Summer, Fall, Winter)
   - Fixed cardinality enforced by enum
   - Rendered in "Seasonal Guide" section

---

## Validation Strategy

### Build-Time Validation Architecture

**Validation Flow**:

```
Page Build (summersville-lake.astro)
    │
    ├─► TypeScript: Check LakeTemplateProps interface
    │
    └─► Pass props to LakeTemplate.astro
            │
            ├─► Zod: Validate FishingSpot[] array
            ├─► Zod: Validate Marina object
            ├─► Zod: Validate Activity[] array
            ├─► Zod: Validate SeasonalGuide[] array
            └─► Zod: Validate Regulation[] array
                    │
                    ├─► ✅ All Valid → Render HTML
                    └─► ❌ Any Invalid → FAIL BUILD with error
```

**Implementation Pattern**:

```typescript
// In LakeTemplate.astro frontmatter
---
import {
  FishingSpotSchema,
  MarinaSchema,
  ActivitySchema,
  SeasonalGuideSchema,
  RegulationSchema
} from '../../types/adventure';
import type { LakeTemplateProps } from '../../types/adventure';

interface Props extends LakeTemplateProps {}

const props = Astro.props;

// Validate all arrays and objects at build time
try {
  // Validate fishing spots
  props.fishingSpots.forEach(spot => FishingSpotSchema.parse(spot));

  // Validate marina
  MarinaSchema.parse(props.marina);

  // Validate activities
  props.activities.forEach(activity => ActivitySchema.parse(activity));

  // Validate seasonal guide
  props.seasonalGuide.forEach(season => SeasonalGuideSchema.parse(season));

  // Validate regulations
  props.regulations.forEach(regulation => RegulationSchema.parse(regulation));
} catch (error) {
  throw new Error(`Lake Template validation failed: ${error.message}`);
}
---
```

**Error Handling**:

- **Invalid data**: Build fails with descriptive Zod error message
- **Missing required fields**: TypeScript error at compilation
- **Type mismatches**: TypeScript error at compilation
- **Array size violations**: No automatic enforcement (documented limits only)

---

## Validation Rules Summary

### Field-Level Constraints

| Field | Type | Required | Min | Max | Format |
|-------|------|----------|-----|-----|--------|
| `name` | string | ✅ | 1 char | none | Any |
| `acreage` | number | ✅ | 0 | none | Positive |
| `maxDepth` | number | ✅ | 0 | none | Positive |
| `county` | string | ✅ | 1 char | none | Any |
| `quickHighlights` | string[] | ✅ | 1 item | none | Non-empty strings |
| `fishSpecies` | object[] | ✅ | 1 item | 20 | FeatureItem format |
| `fishingSpots` | FishingSpot[] | ✅ | 1 item | 15 | Zod validation |
| `campgrounds` | CampingFacility[] | ✅ | 0 items | 10 | SPEC-12 schema |
| `marina` | Marina | ✅ | - | - | Zod validation |
| `activities` | Activity[] | ❌ | 0 items | 20 | Zod validation |
| `seasonalGuide` | SeasonalGuide[] | ✅ | 4 items | 4 | Enum validation |
| `regulations` | Regulation[] | ✅ | 1 item | 20 | Zod validation |
| `heroImage` | string | ✅ | 1 char | none | Path or URL |
| `mapUrl` | string | ❌ | - | - | URL format |
| `title` | string | ❌ | - | - | Any |
| `intro` | string | ❌ | - | - | Any |

### Array Size Enforcement

**Performance Limits** (documented, not enforced by schema):

- `fishSpecies`: 20 maximum (typical: 6-12)
- `fishingSpots`: 15 maximum (typical: 5-10)
- `campgrounds`: 10 maximum (typical: 3-6)
- `activities`: 20 maximum (typical: 8-15)
- `seasonalGuide`: 4 fixed (Spring, Summer, Fall, Winter)
- `regulations`: 20 maximum (typical: 5-10 categories)

**Rationale**: Array limits ensure Lighthouse performance score remains 90+ on mobile devices. Limits provide 2-3x headroom over typical WV lake data.

---

## Integration with Existing Types

### SPEC-11 Type Reuse

**Existing types used as-is**:

1. **GearItem** (SPEC-11)

   ```typescript
   export type GearItem = z.infer<typeof GearItemSchema>;
   // Used in gear checklist section
   ```

2. **RelatedCategory** (SPEC-11)

   ```typescript
   export type RelatedCategory = z.infer<typeof RelatedCategorySchema>;
   // Used in shop categories section
   ```

3. **CampingFacility** (SPEC-12)

   ```typescript
   export type CampingFacility = z.infer<typeof CampingFacilitySchema>;
   // Used directly for campgrounds array
   ```

4. **StatItem** (SPEC-10)

   ```typescript
   export type StatItem = z.infer<typeof StatItemSchema>;
   // Used for quick stats bar (acreage, depth, location)
   ```

**Integration Pattern**:

```typescript
// In LakeTemplate.astro
import type {
  LakeTemplateProps,
  GearItem,           // SPEC-11
  RelatedCategory,    // SPEC-11
  CampingFacility,    // SPEC-12
  StatItem            // SPEC-10
} from '../../types/adventure';

// Transform lake data to existing component formats
const statsData: StatItem[] = [
  { value: props.acreage.toLocaleString(), label: 'Acres', icon: 'area' },
  { value: `${props.maxDepth} ft`, label: 'Max Depth', icon: 'info' },
  { value: props.county, label: 'County', icon: 'location' },
];
```

---

## Implementation Steps

### Step 1: Add Schemas to adventure.ts

**File**: `wv-wild-web/src/types/adventure.ts`
**Location**: After line 295 (after existing SPEC-12 types)

**Code Block**:

```typescript
// ============================================================================
// SPEC-13: LAKE TEMPLATE SCHEMAS
// ============================================================================

/**
 * Fishing spot schema for named locations within lakes
 * Used in "Where to Fish" section for spot-specific information
 */
export const FishingSpotSchema = z.object({
  name: z.string().min(1),
  depth: z.string(),
  structure: z.string(),
  species: z.array(z.string().min(1)).min(1),
  access: z.string(),
});

export type FishingSpot = z.infer<typeof FishingSpotSchema>;

/**
 * Marina schema for boat access facilities
 * Includes services, boat launch details, rentals, hours, and contact
 */
export const MarinaSchema = z.object({
  name: z.string().min(1),
  services: z.array(z.string().min(1)),
  boatLaunch: z.object({
    ramps: z.number().int().positive(),
    fee: z.string().optional(),
  }),
  rentals: z.array(z.string()).optional(),
  hours: z.string(),
  contact: z.string(),
});

export type Marina = z.infer<typeof MarinaSchema>;

/**
 * Activity schema for non-fishing recreation options
 * Used in Activities section for diving, swimming, kayaking, etc.
 */
export const ActivitySchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  season: z.string(),
  difficulty: z.enum(['easy', 'moderate', 'challenging']).optional(),
});

export type Activity = z.infer<typeof ActivitySchema>;

/**
 * Seasonal guide schema for season-by-season breakdown
 * Helps visitors plan trips based on time of year
 */
export const SeasonalGuideSchema = z.object({
  season: z.enum(['Spring', 'Summer', 'Fall', 'Winter']),
  highlights: z.array(z.string().min(1)).min(1),
  fishingFocus: z.string().optional(),
});

export type SeasonalGuide = z.infer<typeof SeasonalGuideSchema>;

/**
 * Regulation schema for safety rules and legal requirements
 * Organized by category for easier scanning
 */
export const RegulationSchema = z.object({
  category: z.string().min(1),
  rules: z.array(z.string().min(1)).min(1),
});

export type Regulation = z.infer<typeof RegulationSchema>;
```

**Estimated Lines**: +115 lines

---

### Step 2: Define Complete Interface

**Location**: Immediately after Regulation schema

**Code Block**:

```typescript
/**
 * Complete props interface for LakeTemplate.astro component
 * SPEC-13: Reusable template for WV lake recreation pages
 *
 * @example
 * ```astro
 * ---
 * import LakeTemplate from '../components/templates/LakeTemplate.astro';
 * import type { LakeTemplateProps } from '../types/adventure';
 *
 * const lakeData: LakeTemplateProps = {
 *   name: 'Summersville Lake',
 *   acreage: 2790,
 *   maxDepth: 327,
 *   county: 'Nicholas',
 *   // ... rest of data
 * };
 * ---
 *
 * <LakeTemplate {...lakeData} />
 * ```
 */
export interface LakeTemplateProps {
  // BASIC INFORMATION (Required)
  name: string;
  acreage: number;
  maxDepth: number;
  county: string;
  quickHighlights: string[];

  // FISHING CONTENT (Primary Focus - Required)
  fishSpecies: Array<{
    title: string;
    description: string;
    notes?: string;
  }>;
  fishingSpots: FishingSpot[];

  // FACILITIES (Required for trip planning)
  campgrounds: CampingFacility[];
  marina: Marina;

  // ACTIVITIES & PLANNING (Optional but recommended)
  activities: Activity[];
  seasonalGuide: SeasonalGuide[];

  // SAFETY & REGULATIONS (Required for legal compliance)
  regulations: Regulation[];

  // MEDIA & METADATA (Required)
  heroImage: string;
  mapUrl?: string;

  // OVERRIDES (Optional - use with caution)
  title?: string;
  intro?: string;
}
```

**Estimated Lines**: +45 lines

---

### Step 3: Re-export in index.ts

**File**: `wv-wild-web/src/types/index.ts`
**Location**: Add to existing exports

**Code Block**:

```typescript
export type {
  LakeTemplateProps,
  FishingSpot,
  Marina,
  Activity,
  SeasonalGuide,
  Regulation
} from './adventure';
```

**Estimated Lines**: +8 lines

---

## Testing Strategy

### Unit Tests for Type Validation

**File**: `wv-wild-web/src/types/__tests__/adventure-lake.test.ts`

**Test Coverage**:

1. **FishingSpotSchema Tests** (5 tests)
   - ✅ Valid spot with all required fields
   - ❌ Empty species array (should fail)
   - ❌ Missing required field (should fail)
   - ❌ Empty string in species array (should fail)
   - ✅ Valid spot with multiple species

2. **MarinaSchema Tests** (6 tests)
   - ✅ Valid marina with all fields
   - ✅ Valid marina without optional rentals
   - ✅ Valid marina with fee omitted in boatLaunch
   - ❌ Negative ramps count (should fail)
   - ❌ Empty services array (should fail)
   - ❌ Missing required contact field (should fail)

3. **ActivitySchema Tests** (5 tests)
   - ✅ Valid activity with difficulty
   - ✅ Valid activity without difficulty
   - ❌ Invalid difficulty value (should fail)
   - ❌ Empty description (should fail)
   - ✅ Activity with long description (200+ chars)

4. **SeasonalGuideSchema Tests** (4 tests)
   - ✅ Valid seasonal guide for each season
   - ❌ Invalid season name (should fail)
   - ❌ Empty highlights array (should fail)
   - ✅ Seasonal guide without optional fishingFocus

5. **RegulationSchema Tests** (3 tests)
   - ✅ Valid regulation with multiple rules
   - ❌ Empty rules array (should fail)
   - ❌ Empty category string (should fail)

6. **LakeTemplateProps Interface Tests** (4 tests)
   - ✅ Complete valid lake data object
   - ✅ Lake data with minimal required fields
   - ✅ Lake data with optional fields omitted
   - ❌ Lake data missing required marina field (TypeScript compilation test)

**Total Test Count**: 27 unit tests

---

## Migration Notes

### Impact on Existing Code

**Breaking Changes**: **NONE**

All changes are additive:

- New types are opt-in (only used by Lake Template)
- Existing SPEC-11/12 components continue working unchanged
- No modifications to existing type definitions

**Type System Growth**:

- **Before**: adventure.ts = 295 lines
- **After**: adventure.ts = ~500 lines (+205 lines, +69%)
- **File Organization**: All adventure-related types remain in single file

**Bundle Size Impact**: Negligible (types are compile-time only, zero runtime overhead)

---

## Memory Coordination

### Store Phase 1 Completion

**Memory Key**: `swarm/planner/phase1-data-model`

**Storage Pattern**:

```javascript
mcp__claude-flow__memory_usage {
  action: "store",
  key: "swarm/planner/phase1-data-model",
  namespace: "coordination",
  value: JSON.stringify({
    phase: "1",
    status: "complete",
    schemas_added: 5,
    interface_created: "LakeTemplateProps",
    total_lines: 205,
    file_modified: "wv-wild-web/src/types/adventure.ts",
    breaking_changes: false,
    test_coverage: 27,
    timestamp: Date.now()
  })
}
```

---

## Next Steps

### Phase 2: Template Component Structure

- Create LakeTemplate.astro component (~600 lines)
- Implement 6 custom sections (hero, fishing spots, marina, activities, seasonal, regulations)
- Integrate 10 existing SPEC-11 components
- Apply data transformation layer

### Phase 3: WVWO Compliance & Testing

- Enforce rounded-sm only (no rounded-md/lg/xl)
- Apply border-left color accents (green/brown/orange)
- Implement Kim's voice (font-hand for tips)
- Run Lighthouse audits (target 90+ score)
- Test responsive layouts (mobile/tablet/desktop)

---

**Document End** - Phase 1 Data Model Design for SPEC-13 Lake Template
