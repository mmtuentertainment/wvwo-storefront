# Data Model: Lake Template Component

**Feature**: SPEC-13 Lake Template
**File**: `wv-wild-web/src/types/adventure.ts` (extensions)
**Purpose**: TypeScript type definitions for LakeTemplate.astro props interface

## Overview

The Lake Template uses a combination of **existing SPEC-11 types** and **new lake-specific types** to support comprehensive lake recreation content. All types follow Zod schema validation pattern for runtime type safety.

---

## NEW Types (to be added to adventure.ts)

### FishingSpot

Named fishing location within a lake with depth, structure, and target species information.

```typescript
import { z } from 'astro/zod';

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

---

### Marina

Boat access facility with services, launch details, and contact information.

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

---

### Activity

Recreation activity beyond fishing with seasonal availability and difficulty.

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

---

### SeasonalGuide

Season-specific activity highlights and fishing focus.

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

---

### Regulation

Safety or legal regulation organized by category.

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

---

## REUSED Types (from existing adventure.ts)

These types are already defined in SPEC-11 and will be used as-is:

### GearItem

```typescript
// Already exists - from SPEC-11
export type GearItem = z.infer<typeof GearItemSchema>;
// Used in gear checklist section
```

### RelatedCategory

```typescript
// Already exists - from SPEC-11
export type RelatedCategory = z.infer<typeof RelatedCategorySchema>;
// Used in shop categories section
```

### CampingFacility

```typescript
// Already exists - from SPEC-12
export type CampingFacility = z.infer<typeof CampingFacilitySchema>;
// Used directly for campgrounds array
```

### StatItem

```typescript
// Already exists - from SPEC-10
export type StatItem = z.infer<typeof StatItemSchema>;
// Used for quick stats bar (acreage, depth, location)
```

---

## Complete Props Interface

### LakeTemplateProps

Master interface combining all types for the Lake Template component.

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

---

## Type System Integration

### File Organization

```
wv-wild-web/src/types/
├── adventure.ts          # ADD new lake types here
│   ├── FishingSpotSchema
│   ├── MarinaSchema
│   ├── ActivitySchema
│   ├── SeasonalGuideSchema
│   ├── RegulationSchema
│   └── LakeTemplateProps interface
│
└── index.ts              # Re-export LakeTemplateProps
```

### Implementation Steps

1. **Add Schemas to adventure.ts** (lines ~300-450):

   ```typescript
   // After existing SPEC-12 types, add SPEC-13 types:
   export const FishingSpotSchema = z.object({...});
   export const MarinaSchema = z.object({...});
   export const ActivitySchema = z.object({...});
   export const SeasonalGuideSchema = z.object({...});
   export const RegulationSchema = z.object({...});
   ```

2. **Export Type Inferences**:

   ```typescript
   export type FishingSpot = z.infer<typeof FishingSpotSchema>;
   export type Marina = z.infer<typeof MarinaSchema>;
   export type Activity = z.infer<typeof ActivitySchema>;
   export type SeasonalGuide = z.infer<typeof SeasonalGuideSchema>;
   export type Regulation = z.infer<typeof RegulationSchema>;
   ```

3. **Define Complete Interface**:

   ```typescript
   export interface LakeTemplateProps {
     // Full interface as shown above
   }
   ```

4. **Re-export in index.ts**:

   ```typescript
   export type { LakeTemplateProps } from './adventure';
   ```

---

## Validation Examples

### Runtime Validation

```typescript
import { FishingSpotSchema, MarinaSchema } from '../types/adventure';

// Validate fishing spot data at runtime
const spotData = {
  name: 'Long Point Cliff',
  depth: '40-60 feet',
  structure: 'Rocky ledges',
  species: ['Smallmouth Bass', 'Walleye'],
  access: 'Boat only'
};

const validatedSpot = FishingSpotSchema.parse(spotData);
// ✅ Returns typed FishingSpot if valid
// ❌ Throws ZodError if invalid
```

### Build-Time Type Checking

```typescript
import type { LakeTemplateProps } from '../types/adventure';

// TypeScript will enforce type correctness
const summersvilleData: LakeTemplateProps = {
  name: 'Summersville Lake',
  acreage: 2790,
  maxDepth: 327,
  county: 'Nicholas',
  quickHighlights: ['Crystal clear water', 'Premier smallmouth fishing'],
  fishSpecies: [/* ... */],
  fishingSpots: [/* ... */],
  campgrounds: [/* ... */],
  marina: {/* ... */},
  activities: [/* ... */],
  seasonalGuide: [/* ... */],
  regulations: [/* ... */],
  heroImage: '/images/summersville-hero.jpg'
};
```

---

## Testing Patterns

### Unit Tests for Type Validation

```typescript
// src/types/__tests__/adventure-lake.test.ts
import { describe, it, expect } from 'vitest';
import { FishingSpotSchema, MarinaSchema } from '../adventure';

describe('Lake Template Types', () => {
  describe('FishingSpotSchema', () => {
    it('validates correct fishing spot data', () => {
      const spot = {
        name: 'Test Spot',
        depth: '20 feet',
        structure: 'Rocky',
        species: ['Bass'],
        access: 'Boat'
      };

      expect(() => FishingSpotSchema.parse(spot)).not.toThrow();
    });

    it('rejects empty species array', () => {
      const spot = {
        name: 'Test',
        depth: '20',
        structure: 'Rocky',
        species: [], // Invalid - must have at least 1
        access: 'Boat'
      };

      expect(() => FishingSpotSchema.parse(spot)).toThrow();
    });
  });

  describe('MarinaSchema', () => {
    it('validates marina with all optional fields', () => {
      const marina = {
        name: 'Test Marina',
        services: ['Fuel'],
        boatLaunch: { ramps: 2, fee: '$5' },
        rentals: ['Kayaks'],
        hours: '9-5',
        contact: '555-1234'
      };

      expect(() => MarinaSchema.parse(marina)).not.toThrow();
    });

    it('validates marina without optional rentals', () => {
      const marina = {
        name: 'Test Marina',
        services: ['Fuel'],
        boatLaunch: { ramps: 1 }, // No fee
        hours: '9-5',
        contact: '555-1234'
        // No rentals - should be fine
      };

      expect(() => MarinaSchema.parse(marina)).not.toThrow();
    });
  });
});
```

---

## Migration Notes

**Existing Code Impact**: NONE - all changes are additive

- No breaking changes to existing types
- All new types are opt-in (only used by Lake Template)
- Existing SPEC-11/12 components continue working unchanged

**Type System Size**: adventure.ts will grow from ~295 lines to ~500 lines (+205 lines)
