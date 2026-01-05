# SPEC-13 Test Data Fixtures Specification

**Purpose**: Comprehensive test data for validating Lake Template functionality

---

## Fixture Overview

| Fixture Name | Purpose | Size | Completeness |
|-------------|---------|------|--------------|
| `minimal-lake.ts` | Schema validation baseline | Minimal | Required fields only |
| `summersville-lake-data.ts` | Real production data | Full | 100% complete |
| `invalid-lake.ts` | Build failure testing | Partial | Intentionally broken |
| `max-species-lake.ts` | Array limit testing | Large | 20 species (limit) |
| `max-spots-lake.ts` | Array limit testing | Large | 15 spots (limit) |
| `empty-arrays-lake.ts` | Edge case testing | Minimal | Empty optional arrays |

---

## Fixture 1: Minimal Lake (Baseline)

**File**: `tests/fixtures/minimal-lake.ts`
**Purpose**: Smallest valid data set for quick schema validation
**Coverage**: All required fields, no optional fields

```typescript
// tests/fixtures/minimal-lake.ts
import type { LakeTemplateProps } from '../../src/types/adventure';

/**
 * Minimal valid lake data for schema validation tests.
 * Contains ONLY required fields - no optional data.
 */
export const minimalLakeData: LakeTemplateProps = {
  // Basic Information (Required)
  name: 'Test Lake',
  acreage: 500,
  maxDepth: 50,
  county: 'Test County',
  quickHighlights: ['Fishing', 'Boating'],

  // Fishing Content (Required)
  fishSpecies: [
    {
      title: 'Bass',
      description: 'Year-round',
      // No notes (optional Kim's tip)
    },
  ],
  fishingSpots: [
    {
      name: 'Main Cove',
      depth: '20 feet',
      structure: 'Rocky bottom',
      species: ['Bass'],
      access: 'Boat',
    },
  ],

  // Facilities (Required)
  campgrounds: [
    {
      name: 'Test Campground',
      sites: 20,
      amenities: ['Water', 'Restrooms'],
      season: 'May-October',
      // No reservationUrl (optional)
    },
  ],
  marina: {
    name: 'Test Marina',
    services: ['Fuel', 'Parking'],
    boatLaunch: {
      ramps: 1,
      // No fee (optional)
    },
    // No rentals (optional)
    hours: '9am-5pm',
    contact: '(555) 555-1234',
  },

  // Activities & Planning (Required)
  activities: [
    {
      name: 'Swimming',
      description: 'Designated beach area with lifeguards',
      season: 'Summer',
      // No difficulty (optional)
    },
  ],
  seasonalGuide: [
    {
      season: 'Spring',
      highlights: ['Fishing picks up', 'Water temps rise'],
      // No fishingFocus (optional)
    },
    {
      season: 'Summer',
      highlights: ['Peak tourism season', 'Swimming beach open'],
    },
    {
      season: 'Fall',
      highlights: ['Fall colors', 'Fewer crowds'],
    },
    {
      season: 'Winter',
      highlights: ['Quiet season', 'Limited access'],
    },
  ],

  // Safety & Regulations (Required)
  regulations: [
    {
      category: 'Fishing License',
      rules: ['Valid WV fishing license required (ages 15+)'],
    },
  ],

  // Media & Metadata (Required)
  heroImage: '/images/test-lake.jpg',
  // No mapUrl (optional)
};

/**
 * Usage: Quick schema validation
 *
 * const result = LakeTemplatePropsSchema.safeParse(minimalLakeData);
 * expect(result.success).toBe(true);
 */
```

---

## Fixture 2: Summersville Lake (Production Data)

**File**: `tests/fixtures/summersville-lake-data.ts`
**Purpose**: Complete real-world data from actual Summersville Lake page
**Coverage**: 100% - all fields including optionals

See TESTING-ARCHITECTURE.md for full implementation (603 lines).

**Key Characteristics**:

- 6 fish species (typical WV lake)
- 4 fishing spots (realistic coverage)
- 2 campgrounds (Battle Run + Salmon Run)
- Full marina details with rentals
- 4 activities (diving, cliff jumping, swimming, kayaking)
- Complete seasonal guide (all 4 seasons with fishing focus)
- 4 regulation categories (walleye, boating, diving, general)

**Usage**:

- Integration testing
- Visual regression testing
- Performance benchmarking
- Real-world edge case discovery

---

## Fixture 3: Invalid Lake (Build Failure)

**File**: `tests/fixtures/invalid-lake.ts`
**Purpose**: Intentionally broken data to test build-time validation
**Coverage**: Contains validation violations

```typescript
// tests/fixtures/invalid-lake.ts

/**
 * INVALID lake data for testing build-time validation.
 * This data SHOULD cause Zod validation to fail.
 */
export const invalidLakeData = {
  name: 'Invalid Lake',
  acreage: 1000,
  maxDepth: 100,
  county: 'Test',
  quickHighlights: ['Test'],

  // Valid fish species
  fishSpecies: [
    {
      title: 'Bass',
      description: 'Year-round',
    },
  ],

  // INVALID: Empty species array (violates min(1))
  fishingSpots: [
    {
      name: 'Bad Spot',
      depth: '20 feet',
      structure: 'Rocky',
      species: [], // ❌ VALIDATION ERROR: Array must have at least 1 item
      access: 'Boat',
    },
  ],

  // INVALID: Missing required campgrounds
  // campgrounds: [], // ❌ Field missing entirely

  // INVALID: Negative ramp count
  marina: {
    name: 'Bad Marina',
    services: ['Fuel'],
    boatLaunch: {
      ramps: -1, // ❌ VALIDATION ERROR: Must be positive integer
    },
    hours: '9-5',
    contact: '555-1234',
  },

  // INVALID: Empty highlights array (violates min(1))
  activities: [
    {
      name: 'Swimming',
      description: 'Beach',
      season: 'Summer',
      difficulty: 'impossible', // ❌ VALIDATION ERROR: Invalid enum value
    },
  ],

  // INVALID: Missing required season
  seasonalGuide: [
    {
      // season: 'Spring', // ❌ Required field missing
      highlights: ['Test'],
    },
  ],

  // INVALID: Empty rules array (violates min(1))
  regulations: [
    {
      category: 'Fishing',
      rules: [], // ❌ VALIDATION ERROR: Array must have at least 1 item
    },
  ],

  heroImage: '/test.jpg',
};

/**
 * Expected Behavior:
 *
 * const result = LakeTemplatePropsSchema.safeParse(invalidLakeData);
 * expect(result.success).toBe(false);
 * expect(result.error.issues.length).toBeGreaterThan(0);
 *
 * Build should FAIL with:
 * - "Array must contain at least 1 element(s)" (species, rules)
 * - "Number must be greater than 0" (ramps)
 * - "Required" (campgrounds, season)
 * - "Invalid enum value" (difficulty)
 */
```

---

## Fixture 4: Max Species Lake (Array Limit)

**File**: `tests/fixtures/max-species-lake.ts`
**Purpose**: Test array size limit (20 species per NFR-009)
**Coverage**: At maximum allowed species count

```typescript
// tests/fixtures/max-species-lake.ts
import type { LakeTemplateProps } from '../../src/types/adventure';

/**
 * Lake data with 20 fish species (maximum per NFR-009).
 * Tests performance with array size at upper limit.
 */
export const maxSpeciesLakeData: LakeTemplateProps = {
  name: 'Max Species Test Lake',
  acreage: 5000,
  maxDepth: 200,
  county: 'Test',
  quickHighlights: ['Diverse fishery', 'Multiple species'],

  // 20 species (at limit)
  fishSpecies: [
    { title: 'Smallmouth Bass', description: 'Year-round' },
    { title: 'Largemouth Bass', description: 'Spring-Fall' },
    { title: 'Walleye', description: 'Year-round' },
    { title: 'Muskie', description: 'Fall peak' },
    { title: 'Northern Pike', description: 'Spring-Fall' },
    { title: 'Crappie (Black)', description: 'Spring spawn' },
    { title: 'Crappie (White)', description: 'Spring spawn' },
    { title: 'Bluegill', description: 'Summer' },
    { title: 'Pumpkinseed Sunfish', description: 'Summer' },
    { title: 'Rock Bass', description: 'Year-round' },
    { title: 'Yellow Perch', description: 'Year-round' },
    { title: 'Lake Trout', description: 'Winter-Spring' },
    { title: 'Rainbow Trout', description: 'Stocked seasonally' },
    { title: 'Brown Trout', description: 'Fall-Spring' },
    { title: 'Channel Catfish', description: 'Summer nights' },
    { title: 'Flathead Catfish', description: 'Summer' },
    { title: 'White Bass', description: 'Spring run' },
    { title: 'Striped Bass Hybrid', description: 'Year-round' },
    { title: 'Sauger', description: 'Winter' },
    { title: 'Chain Pickerel', description: 'Spring-Fall' },
  ],

  // Minimal other sections for focus on species
  fishingSpots: [
    {
      name: 'Main Basin',
      depth: '30-60 feet',
      structure: 'Varied',
      species: ['Smallmouth Bass', 'Walleye', 'Muskie'],
      access: 'Boat',
    },
  ],
  campgrounds: [
    {
      name: 'Test Campground',
      sites: 30,
      amenities: ['Water'],
      season: 'May-Oct',
    },
  ],
  marina: {
    name: 'Test Marina',
    services: ['Fuel'],
    boatLaunch: { ramps: 2 },
    hours: '8-6',
    contact: '555-1234',
  },
  activities: [
    {
      name: 'Fishing',
      description: 'Diverse species available',
      season: 'Year-round',
    },
  ],
  seasonalGuide: [
    { season: 'Spring', highlights: ['Multiple spawns'] },
    { season: 'Summer', highlights: ['Peak season'] },
    { season: 'Fall', highlights: ['Fall bite'] },
    { season: 'Winter', highlights: ['Ice fishing'] },
  ],
  regulations: [
    {
      category: 'Fishing License',
      rules: ['Valid license required'],
    },
  ],
  heroImage: '/test.jpg',
};

/**
 * Performance Target (NFR-009):
 * - Lighthouse score remains 90+ with 20 species
 * - First Contentful Paint < 1.5s
 * - Largest Contentful Paint < 2.5s
 * - No layout shift (CLS < 0.1)
 */
```

---

## Fixture 5: Max Spots Lake (Array Limit)

**File**: `tests/fixtures/max-spots-lake.ts`
**Purpose**: Test array size limit (15 fishing spots per NFR-009)

```typescript
// tests/fixtures/max-spots-lake.ts
import type { LakeTemplateProps } from '../../src/types/adventure';

/**
 * Lake data with 15 fishing spots (maximum per NFR-009).
 * Tests layout and performance with maximum spot count.
 */
export const maxSpotsLakeData: LakeTemplateProps = {
  name: 'Max Spots Test Lake',
  acreage: 3000,
  maxDepth: 150,
  county: 'Test',
  quickHighlights: ['Extensive structure', 'Multiple access points'],

  fishSpecies: [
    { title: 'Bass', description: 'Year-round' },
    { title: 'Walleye', description: 'Year-round' },
  ],

  // 15 fishing spots (at limit)
  fishingSpots: [
    {
      name: 'North Cliff',
      depth: '40-60 feet',
      structure: 'Vertical rock walls',
      species: ['Smallmouth Bass'],
      access: 'Boat only',
    },
    {
      name: 'South Point',
      depth: '30-50 feet',
      structure: 'Rocky point',
      species: ['Walleye', 'Bass'],
      access: 'Boat',
    },
    {
      name: 'East Cove',
      depth: '15-25 feet',
      structure: 'Protected cove',
      species: ['Bass'],
      access: 'Shore or kayak',
    },
    {
      name: 'West Bay',
      depth: '20-40 feet',
      structure: 'Submerged timber',
      species: ['Crappie', 'Bass'],
      access: 'Boat',
    },
    {
      name: 'Dam Area',
      depth: '80-100 feet',
      structure: 'Deep water',
      species: ['Walleye', 'Lake Trout'],
      access: 'Boat only',
    },
    {
      name: 'Creek Arm 1',
      depth: '10-20 feet',
      structure: 'Creek channel',
      species: ['Bass', 'Crappie'],
      access: 'Kayak',
    },
    {
      name: 'Creek Arm 2',
      depth: '15-30 feet',
      structure: 'Timber and brush',
      species: ['Crappie'],
      access: 'Boat',
    },
    {
      name: 'Main Basin',
      depth: '40-70 feet',
      structure: 'Open water',
      species: ['Walleye'],
      access: 'Boat',
    },
    {
      name: 'Rocky Shoal',
      depth: '8-15 feet',
      structure: 'Shallow rocks',
      species: ['Smallmouth Bass'],
      access: 'Boat or kayak',
    },
    {
      name: 'Island Point',
      depth: '25-45 feet',
      structure: 'Island shoreline',
      species: ['Bass', 'Walleye'],
      access: 'Boat',
    },
    {
      name: 'Sunken Bridge',
      depth: '20-35 feet',
      structure: 'Old bridge structure',
      species: ['Bass', 'Crappie'],
      access: 'Boat',
    },
    {
      name: 'Boat Launch Cove',
      depth: '10-20 feet',
      structure: 'Near launch',
      species: ['Bass'],
      access: 'Shore accessible',
    },
    {
      name: 'Deep Hole',
      depth: '60-90 feet',
      structure: 'Deep depression',
      species: ['Walleye', 'Lake Trout'],
      access: 'Boat only',
    },
    {
      name: 'Shallow Flats',
      depth: '5-12 feet',
      structure: 'Sandy bottom',
      species: ['Bass', 'Sunfish'],
      access: 'Wade or kayak',
    },
    {
      name: 'Outlet Area',
      depth: '15-25 feet',
      structure: 'Current flow',
      species: ['Walleye', 'Bass'],
      access: 'Boat',
    },
  ],

  // Minimal other sections
  campgrounds: [
    {
      name: 'Test Campground',
      sites: 25,
      amenities: ['Water'],
      season: 'May-Oct',
    },
  ],
  marina: {
    name: 'Test Marina',
    services: ['Fuel', 'Launch'],
    boatLaunch: { ramps: 3 },
    hours: '7-7',
    contact: '555-5678',
  },
  activities: [
    {
      name: 'Fishing',
      description: 'Extensive spots available',
      season: 'Year-round',
    },
  ],
  seasonalGuide: [
    { season: 'Spring', highlights: ['Spawn activity'] },
    { season: 'Summer', highlights: ['Deep water'] },
    { season: 'Fall', highlights: ['Fall bite'] },
    { season: 'Winter', highlights: ['Trophy fish'] },
  ],
  regulations: [
    { category: 'License', rules: ['Valid license required'] },
  ],
  heroImage: '/test.jpg',
};

/**
 * Layout Test Focus:
 * - 15 full-width spot cards render without scroll issues
 * - Mobile: All cards stack properly
 * - Desktop: Cards display with proper spacing
 * - No layout shift during load (CLS < 0.1)
 */
```

---

## Fixture 6: Empty Arrays Lake (Edge Case)

**File**: `tests/fixtures/empty-arrays-lake.ts`
**Purpose**: Test graceful handling of empty optional arrays

```typescript
// tests/fixtures/empty-arrays-lake.ts
import type { LakeTemplateProps } from '../../src/types/adventure';

/**
 * Lake data with empty optional arrays.
 * Tests that sections hide gracefully when no data provided.
 */
export const emptyArraysLakeData: LakeTemplateProps = {
  name: 'Minimal Content Lake',
  acreage: 200,
  maxDepth: 30,
  county: 'Test',
  quickHighlights: ['Small lake', 'Limited facilities'],

  // Minimal required arrays (1 item each)
  fishSpecies: [
    {
      title: 'Bass',
      description: 'Present in lake',
    },
  ],
  fishingSpots: [
    {
      name: 'Main Area',
      depth: '10-20 feet',
      structure: 'General',
      species: ['Bass'],
      access: 'Shore',
    },
  ],

  // Empty campgrounds (optional - should hide section)
  campgrounds: [],

  // Minimal marina
  marina: {
    name: 'Launch Only',
    services: [],
    boatLaunch: { ramps: 1 },
    hours: 'Daylight',
    contact: 'Self-serve',
  },

  // Empty activities (optional - should hide section)
  activities: [],

  // Minimal seasonal guide (required 4 seasons but minimal highlights)
  seasonalGuide: [
    { season: 'Spring', highlights: ['Spring fishing'] },
    { season: 'Summer', highlights: ['Summer fishing'] },
    { season: 'Fall', highlights: ['Fall fishing'] },
    { season: 'Winter', highlights: ['Limited access'] },
  ],

  // Single regulation
  regulations: [
    {
      category: 'License Required',
      rules: ['WV fishing license required'],
    },
  ],

  heroImage: '/minimal-lake.jpg',
};

/**
 * Expected Behavior:
 * - Camping section should NOT render (empty array)
 * - Activities section should NOT render (empty array)
 * - Marina section renders but shows "No services listed"
 * - Seasonal guide renders with minimal content
 * - No broken UI or empty containers
 */
```

---

## Fixture Usage Matrix

| Fixture | Unit Tests | E2E Tests | Integration | Performance |
|---------|-----------|-----------|-------------|-------------|
| `minimal-lake` | ✅ Schema validation | ❌ | ✅ Baseline | ❌ |
| `summersville-lake` | ✅ Real data | ✅ Visual | ✅ Primary | ✅ Realistic |
| `invalid-lake` | ✅ Negative tests | ❌ | ❌ | ❌ |
| `max-species-lake` | ❌ | ✅ Rendering | ❌ | ✅ Array limit |
| `max-spots-lake` | ❌ | ✅ Layout | ❌ | ✅ Array limit |
| `empty-arrays-lake` | ✅ Edge cases | ✅ Empty states | ✅ Edge case | ❌ |

---

## Fixture Validation Checklist

Before committing fixture files:

- [ ] TypeScript compiles without errors
- [ ] All required fields present
- [ ] Arrays contain expected item counts
- [ ] Strings use proper quotes (escape as needed)
- [ ] Phone numbers formatted consistently: `(###) ###-####`
- [ ] URLs are absolute paths or external links
- [ ] Image paths exist or are placeholders
- [ ] Season enum values match: Spring/Summer/Fall/Winter (capitalized)
- [ ] Difficulty enum values match: easy/moderate/challenging (lowercase)
- [ ] Comments explain purpose and expected behavior

---

## Fixture Maintenance

### When to Update

1. **Type definitions change** (`adventure.ts` modified)
   - Update all fixtures to include new required fields
   - Add optional fields to full fixtures (summersville-lake)

2. **Validation rules change** (Zod schemas updated)
   - Verify fixtures still pass/fail as expected
   - Update invalid-lake with new violation patterns

3. **Content updates** (Summersville Lake page changes)
   - Sync summersville-lake-data with production content
   - Keep fish species, spots, facilities current

4. **Array limits change** (NFR-009 updated)
   - Adjust max-species-lake and max-spots-lake counts
   - Update performance test expectations

### Version Control

Fixtures are version-controlled with tests:

- Track changes in git
- Include fixture updates in PRs
- Document breaking changes in commit messages
- Tag major fixture versions matching SPEC releases

---

**Next**: Proceed to CI-CD-PIPELINE.md for GitHub Actions configuration.
