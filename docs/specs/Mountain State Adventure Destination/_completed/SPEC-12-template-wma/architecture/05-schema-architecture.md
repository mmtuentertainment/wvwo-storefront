# Schema Architecture - Content Collections Extension

**Architect**: Schema Architect
**Domain**: Content Collections schema extension with type field
**Date**: 2025-12-27

---

## Schema Design Overview

The WMA Template schema extends the existing `adventures` Content Collection with **8 optional WMA-specific fields** plus **1 explicit type discriminator field**. This approach ensures zero breaking changes while enabling rich WMA content.

### Design Principles

1. **Backward Compatibility**: All new fields are optional
2. **Type Safety**: Zod schema validation at build time
3. **Self-Documenting**: Type discriminator makes intent explicit
4. **Future-Proof**: Can add more adventure types (trails, campgrounds, etc.)
5. **Zero Breaking Changes**: Existing adventures continue working

---

## Schema Extension Strategy

### Existing adventures Collection (SPEC-06)

```typescript
const adventuresCollection = defineCollection({
  type: 'content',
  schema: z.object({
    // Core fields (required)
    title: z.string(),
    description: z.string(),
    heroImage: z.string(),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number(),
    }),

    // Optional fields (existing)
    season: z.array(z.string()).optional(),
    difficulty: z.string().optional(),
    location: z.string().optional(),
    gear: z.array(z.string()).optional(),
    elevation_gain: z.number().optional(),
    drive_time: z.string().optional(),
    kim_hook: z.string().optional(),
    suitability: z.array(z.string()).optional(),
    images: z.array(ImageSchema).optional(),
  }),
});
```

### Extended Schema (SPEC-12)

```typescript
const adventuresCollection = defineCollection({
  type: 'content',
  schema: z.object({
    // === EXISTING FIELDS (unchanged) ===
    title: z.string(),
    description: z.string(),
    heroImage: z.string(),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number(),
    }),
    // ... all existing optional fields ...

    // === NEW: TYPE DISCRIMINATOR ===
    type: z.enum(['adventure', 'wma']).optional(),

    // === NEW: WMA-SPECIFIC FIELDS (all optional) ===
    acreage: z.number().int().positive().optional(),
    county: z.string().optional(),
    species: z.array(SpeciesSchema).optional(),
    fishingWaters: z.array(FishingWaterSchema).optional(),
    facilities: z.array(FacilitySchema).optional(),
    accessPoints: z.array(AccessPointSchema).optional(),
    regulations: RegulationsSchema.optional(),
    seasonHighlights: z.array(SeasonHighlightSchema).optional(),
    mapUrl: z.string().url().optional(),
  }),
});
```

---

## Nested Schema Definitions

### SpeciesSchema (Hunting)

```typescript
/**
 * Huntable species for WMA pages.
 * Represents game animals/birds with seasonal info.
 */
const SpeciesSchema = z.object({
  /** Species name (e.g., "White-tailed Deer") */
  name: z.string().min(1, "Species name is required"),

  /** Hunting season dates (e.g., "Archery: Sep 15-Dec 31, Firearms: Nov 20-Dec 2") */
  season: z.string().min(1, "Season dates are required"),

  /** Optional Kim's tips or habitat notes */
  notes: z.string().optional(),

  /** Optional link to WV DNR regulations for this species */
  regulationUrl: z.string().url("Invalid regulation URL").optional(),
});
```

**Validation Rules**:

- `name`: Required, min 1 character
- `season`: Required, min 1 character (free-form text, not date validation)
- `notes`: Optional (Kim's tips)
- `regulationUrl`: Optional, must be valid URL if provided

**Error Messages**:

- Clear, actionable: "Species name is required"
- Includes field path: `adventures/burnsville-lake.md: species[0].name is required`

---

### FishingWaterSchema (Fishing)

```typescript
/**
 * Fishing water body for WMA pages.
 * Represents streams, ponds, lakes within WMA.
 */
const FishingWaterSchema = z.object({
  /** Water body name (e.g., "Little Kanawha River") */
  name: z.string().min(1, "Water body name is required"),

  /** Fish species available (e.g., ["Smallmouth Bass", "Rainbow Trout"]) */
  species: z.array(z.string().min(1)).min(1, "At least one fish species required"),

  /** Access description (e.g., "Gravel road from Route 5, bring waders") */
  access: z.string().min(1, "Access information is required"),

  /** Optional stocking info or seasonal notes */
  notes: z.string().optional(),
});
```

**Validation Rules**:

- `name`: Required, min 1 character
- `species`: Required array, min 1 species, each species min 1 character
- `access`: Required, min 1 character (how to reach the water)
- `notes`: Optional (seasonal tips, stocking info)

**Error Messages**:

- "Water body name is required"
- "At least one fish species required"
- "Access information is required"

---

### FacilitySchema (Complex Facilities)

```typescript
/**
 * WMA facility (parking, boat ramps, camping, ranges).
 */
const FacilitySchema = z.object({
  /** Facility type (e.g., "Camping Sites", "Boat Ramp") */
  type: z.string().min(1, "Facility type is required"),

  /** Optional count (e.g., 240 campsites) */
  count: z.number().int().positive("Count must be positive integer").optional(),

  /** Description/amenities (e.g., "Electric hookups, restrooms, showers") */
  description: z.string().min(1, "Facility description is required"),

  /** Optional contact phone (e.g., "(304) 555-1234") */
  contact: z.string().optional(),

  /** Optional external link (e.g., reservation system) */
  link: z.string().url("Invalid facility link").optional(),

  /** Optional ADA accessibility notes */
  accessibility: z.string().optional(),
});
```

**Validation Rules**:

- `type`: Required (e.g., "Camping Sites", "Boat Ramp")
- `count`: Optional, must be positive integer if provided
- `description`: Required (what amenities exist)
- `contact`: Optional (phone number, no format validation yet)
- `link`: Optional, must be valid URL if provided
- `accessibility`: Optional (ADA notes)

**Error Messages**:

- "Facility type is required"
- "Count must be positive integer"
- "Facility description is required"
- "Invalid facility link"

---

### AccessPointSchema (WMA Entrances)

```typescript
/**
 * WMA access point (gates, trailheads, parking areas).
 */
const AccessPointSchema = z.object({
  /** Access point name (e.g., "Main Gate", "North Trailhead") */
  name: z.string().min(1, "Access point name is required"),

  /** Optional GPS coordinates (e.g., "39.6419° N, 79.9561° W") */
  coords: z.string().optional(),

  /** Features (e.g., ["Paved parking (20 vehicles)", "Restrooms", "Boat launch"]) */
  features: z.array(z.string().min(1)),

  /** Optional Google Maps link */
  mapLink: z.string().url("Invalid map link").optional(),
});
```

**Validation Rules**:

- `name`: Required (e.g., "Main Gate")
- `coords`: Optional (free-form string, not validated as GPS yet)
- `features`: Array of strings (can be empty array)
- `mapLink`: Optional, must be valid URL if provided

**Future Enhancement**: Add GPS coordinate validation (regex for DMS or decimal degrees)

---

### RegulationsSchema (Hunting/Fishing Rules)

```typescript
/**
 * WMA regulations and restrictions.
 */
const RegulationsSchema = z.object({
  /** Optional hunting zone designation (e.g., "Zone 3") */
  zone: z.string().optional(),

  /** List of restrictions (e.g., ["Blaze orange required", "No baiting"]) */
  restrictions: z.array(z.string().min(1)),

  /** Optional link to full WV DNR regulations PDF */
  regulationsUrl: z.string().url("Invalid regulations URL").optional(),
});
```

**Validation Rules**:

- `zone`: Optional (e.g., "Zone 3", "Zone 1A")
- `restrictions`: Array of strings (can be empty array)
- `regulationsUrl`: Optional, must be valid URL if provided

---

### SeasonHighlightSchema (Seasonal Tips)

```typescript
/**
 * Seasonal hunting/fishing highlight.
 */
const SeasonHighlightSchema = z.object({
  /** Season name (e.g., "Spring Gobbler", "Fall Deer") */
  season: z.string().min(1, "Season name is required"),

  /** Target species (e.g., "White-tailed Deer (Bucks)") */
  target: z.string().min(1, "Target species is required"),

  /** Kim's tips for this season (e.g., "Ridge tops at dawn for gobbler calls") */
  tips: z.string().min(1, "Season tips are required"),
});
```

**Validation Rules**:

- `season`: Required (e.g., "Spring Gobbler")
- `target`: Required (what species to hunt/fish)
- `tips`: Required (Kim's advice for this season)

---

## Type Discriminator Design

### Type Field

```typescript
type: z.enum(['adventure', 'wma']).optional()
```

**Purpose**: Explicit differentiation between adventure types

**Values**:

- `'adventure'`: General outdoor adventures (trails, trips, events)
- `'wma'`: Wildlife Management Areas

**Optional**: Yes (backward compatible)

- Existing adventures: No `type` field (default behavior: treat as 'adventure')
- New WMAs: `type: 'wma'` (explicit)

**Future Extensions**:

```typescript
type: z.enum(['adventure', 'wma', 'trail', 'campground', 'lake', 'park']).optional()
```

---

## Migration Strategy

### Phase 1: Add Optional Fields (Zero Breaking Changes)

**Before**:

```yaml
# elk-river.md
---
title: "Elk River WMA"
description: "16,000 acres of hunting and fishing..."
heroImage: "/images/elk-river-hero.jpg"
coordinates: { lat: 39.6419, lng: -79.9561 }
---
```

**After** (manually add type field):

```yaml
# elk-river.md
---
title: "Elk River WMA"
description: "16,000 acres of hunting and fishing..."
heroImage: "/images/elk-river-hero.jpg"
coordinates: { lat: 39.6419, lng: -79.9561 }
type: "wma"  # ← Add explicit type

# WMA-specific fields (populate incrementally)
acreage: 16000
county: "Braxton"
species: [...]
---
```

**Build Behavior**:

- ✅ Existing adventures (no `type` field): Build succeeds
- ✅ Elk River (with `type: 'wma'`): Build succeeds
- ✅ New WMAs (with `type: 'wma'` + WMA fields): Build succeeds

### Phase 2: Populate WMA Fields (Incremental)

**Minimal WMA** (only type + core fields):

```yaml
---
type: "wma"
title: "Burnsville Lake WMA"
description: "1,000 acres..."
heroImage: "/images/burnsville-lake.jpg"
coordinates: { lat: 38.8419, lng: -80.6561 }
---
```

**Full WMA** (all optional fields):

```yaml
---
type: "wma"
title: "Burnsville Lake WMA"
# ... core fields ...
acreage: 1000
county: "Braxton"
species: [...]
fishingWaters: [...]
facilities: [...]
accessPoints: [...]
regulations: {...}
seasonHighlights: [...]
mapUrl: "https://..."
---
```

### Phase 3: Bulk Import (96 WMAs)

**CSV → Frontmatter Converter**:

```typescript
// Script: scripts/import-wmas.ts
import { parse } from 'csv-parse/sync';
import fs from 'fs';

const csv = fs.readFileSync('data/wv-wmas.csv', 'utf-8');
const wmas = parse(csv, { columns: true });

wmas.forEach(wma => {
  const frontmatter = `---
type: "wma"
title: "${wma.name} WMA"
description: "${wma.description}"
heroImage: "/images/wma/${wma.slug}.jpg"
coordinates:
  lat: ${wma.latitude}
  lng: ${wma.longitude}
acreage: ${wma.acreage}
county: "${wma.county}"
---
`;

  fs.writeFileSync(`src/content/adventures/${wma.slug}.md`, frontmatter);
});
```

---

## Error Handling & Validation

### Build-Time Errors

**Example 1: Missing Required Field**

```yaml
# burnsville-lake.md
---
type: "wma"
title: "Burnsville Lake WMA"
# description: MISSING
heroImage: "/images/burnsville.jpg"
coordinates: { lat: 38.8419, lng: -80.6561 }
---
```

**Error Output**:

```
[ERROR] adventures/burnsville-lake.md: description is required

Expected: string
Received: undefined

Fix: Add description field to frontmatter
```

**Example 2: Invalid Type**

```yaml
---
acreage: "1000"  # String instead of number
---
```

**Error Output**:

```
[ERROR] adventures/burnsville-lake.md: acreage must be a number

Expected: number
Received: "1000" (string)

Fix: Remove quotes from acreage value
```

**Example 3: Negative Count**

```yaml
---
facilities:
  - type: "Camping"
    count: -240  # Negative number
    description: "Sites"
---
```

**Error Output**:

```
[ERROR] adventures/burnsville-lake.md: facilities[0].count must be positive integer

Expected: positive integer
Received: -240

Fix: Use positive number for facility count
```

### Runtime Graceful Degradation

**Empty Arrays** (no error, section hidden):

```astro
{fishingWaters && fishingWaters.length > 0 && (
  <AdventureWhatToFish waters={fishingWaters} />
)}
```

**Undefined Fields** (no error, field hidden):

```astro
{mapUrl && (
  <a href={mapUrl}>View Map</a>
)}
```

---

## Type Inference & IntelliSense

### Automatic Type Inference

```typescript
import { getEntry } from 'astro:content';

const wma = await getEntry('adventures', 'burnsville-lake');

// TypeScript infers:
// wma.data.type: 'adventure' | 'wma' | undefined
// wma.data.species: { name: string; season: string; notes?: string }[] | undefined
// wma.data.acreage: number | undefined
```

### Type Guards

```typescript
function isWMA(adventure: CollectionEntry<'adventures'>): boolean {
  return adventure.data.type === 'wma';
}

const adventures = await getCollection('adventures');
const wmas = adventures.filter(isWMA);

// wmas is now typed as WMA entries
wmas.forEach(wma => {
  console.log(wma.data.acreage); // TypeScript knows this exists
});
```

---

## Future Schema Enhancements

### Phase 2 Candidates

**GPS Coordinate Validation**:

```typescript
coords: z.string().regex(
  /^\d{1,2}\.\d+°?\s*[NS],\s*\d{1,3}\.\d+°?\s*[EW]$/,
  "Invalid GPS format. Use: '39.6419° N, 79.9561° W'"
).optional()
```

**Phone Number Validation**:

```typescript
contact: z.string().regex(
  /^\(\d{3}\)\s\d{3}-\d{4}$/,
  "Invalid phone format. Use: '(304) 555-1234'"
).optional()
```

**SEO Description Length**:

```typescript
description: z.string()
  .min(50, "Description too short for SEO (min 50 chars)")
  .max(160, "Description too long for SEO (max 160 chars)")
```

**Image Optimization Check**:

```typescript
heroImage: z.string()
  .refine(path => path.endsWith('.webp'), "Use WebP format for images")
  .refine(async path => {
    const size = await getFileSize(path);
    return size < 500 * 1024; // 500KB
  }, "Image must be <500KB")
```

---

**Schema Architect**: Schema architecture complete
**Backward Compatibility**: 100% (all new fields optional)
**Type Safety**: Build-time validation via Zod
**Migration Path**: Phase 1 (manual) → Phase 2 (incremental) → Phase 3 (bulk import)
**Next**: Type System Architect defines TypeScript interfaces
