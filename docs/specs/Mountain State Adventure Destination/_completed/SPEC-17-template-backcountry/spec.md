# SPEC-17: Backcountry/Wilderness Template

```yaml
speckit:
  version: 1.0.0
  status: Draft
  created: 2025-12-31
  last_updated: 2025-12-31
  authors:
    - SPARC Specification Agent
  reviewers: []
  priority: P0
  estimated_effort: 8-12 hours
  dependencies:
    - SPEC-09 (adventure.ts shared types)
    - SPEC-16 (cave-types.ts pattern reference)
```

---

## 1. Executive Summary

### 1.1 Purpose

Create a comprehensive type system and reusable Astro template for West Virginia backcountry and wilderness areas. The template focuses on primitive camping, trail systems, wilderness regulations, Leave No Trace principles, and safety-first emphasis for self-sufficiency requirements.

### 1.2 Scope

- **In Scope:**
  - New `backcountry-types.ts` with complete Zod validation schemas
  - Extension of `content.config.ts` to include `'backcountry'` type
  - `BackcountryTemplate.astro` component (~500-550 lines)
  - WV-specific hazards including AMD (Acid Mine Drainage) water source warnings
  - Multi-tier emergency contact structure with SAR info
  - Industry-standard trail difficulty with color coding per CLAUDE.md
  - Navigation data (coordinates, USGS quads, cell coverage, compass declination)

- **Out of Scope:**
  - Interactive map components (future SPEC)
  - Real-time weather API integration (future SPEC)
  - Trip planning booking system

### 1.3 Gap Analysis Summary

| ID | Gap | Priority | Resolution |
|----|-----|----------|------------|
| G-001 | Water sources need `status: 'do-not-use'` for AMD | P0 | Add `WaterSourceStatusSchema` with AMD contamination flag |
| G-002 | Trail difficulty using free-form strings | P0 | Use shared `DifficultySchema` from adventure.ts with industry colors |
| G-003 | No `backcountry-types.ts` exists | P0 | Create comprehensive type file following cave-types.ts pattern |
| G-004 | No `'backcountry'` in content.config.ts enum | P0 | Extend type enum with 'backcountry' value |
| G-005 | Emergency contacts lack multi-tier structure | P1 | Add `EmergencyContactSchema` with SAR, ranger, hospital tiers |
| G-006 | Missing accessibility object | P1 | Add `BackcountryAccessibilitySchema` with physical requirements |
| G-007 | Missing navigation data | P1 | Add `NavigationSchema` with USGS quads, cell coverage, declination |
| G-008 | Weather hazards need quantified timing | P1 | Add `WeatherHazardSchema` with probability and seasonal windows |
| G-009 | Regulations need structured object | P2 | Add `RegulationsSchema` with permit, fire, camping rules |
| G-010 | Wildlife hazards enhancement | P2 | Add disease vectors (ticks, giardia) to wildlife schema |
| G-011 | WVWO shop integration missing | P2 | Add `relatedShop` array with gear category links |

---

## 2. Functional Requirements

### 2.1 Core Requirements

#### FR-001: Type System Creation

**Priority:** P0
**Description:** Create `backcountry-types.ts` following the pattern established by `cave-types.ts` and `ski-types.ts`.

**Acceptance Criteria:**

- [ ] File located at `wv-wild-web/src/types/backcountry-types.ts`
- [ ] All schemas use Zod from `astro/zod`
- [ ] Imports shared types from `adventure.ts` (GearItemSchema, CoordinatesSchema, etc.)
- [ ] Exports both Zod schemas and TypeScript types
- [ ] Includes JSDoc comments for all exports
- [ ] Includes helper functions for color/label mappings

#### FR-002: Content Config Extension

**Priority:** P0
**Description:** Extend `content.config.ts` to recognize `'backcountry'` adventure type.

**Acceptance Criteria:**

- [ ] Add `'backcountry'` to type enum: `z.enum(['adventure', 'wma', 'lake', 'river', 'ski', 'cave', 'backcountry'])`
- [ ] Import backcountry schemas from `./types/backcountry-types`
- [ ] Add optional backcountry-specific fields to adventures schema
- [ ] Zero breaking changes to existing content

#### FR-003: Water Source Safety (AMD Hazard)

**Priority:** P0 (CRITICAL)
**Description:** Water sources in WV backcountry may be contaminated by Acid Mine Drainage from coal mining legacy. System MUST flag unsafe water sources.

**Acceptance Criteria:**

- [ ] `WaterSourceSchema` includes `status` enum: `'potable' | 'treat-required' | 'do-not-use'`
- [ ] `contamination` field for specific hazards (AMD, agricultural runoff, etc.)
- [ ] Visual warning styling for `do-not-use` sources (brand-orange border, warning icon)
- [ ] Kim's voice warning: "That orange water ain't rust - it's acid mine drainage. Don't drink it, don't filter it, find another source."

#### FR-004: Trail Difficulty Industry Standards

**Priority:** P0
**Description:** Use industry-standard difficulty colors that OVERRIDE WVWO brand palette per CLAUDE.md.

**Acceptance Criteria:**

- [ ] Reuse `DifficultySchema` from `adventure.ts`: `['easy', 'moderate', 'challenging', 'rugged']`
- [ ] Apply `DIFFICULTY_COLORS` with industry-standard mapping:
  - easy: `bg-sign-green text-white` (Green circle)
  - moderate: `bg-blue-700 text-white` (Blue square)
  - challenging: `bg-red-900 text-white` (Red triangle)
  - rugged: `bg-black text-white` (Black diamond)
- [ ] Include `DIFFICULTY_SHAPES` for colorblind accessibility

#### FR-005: Multi-Tier Emergency Contacts

**Priority:** P1
**Description:** Backcountry emergencies require multi-tier response structure.

**Acceptance Criteria:**

- [ ] `EmergencyContactSchema` with tiers:
  - `tier`: `'911' | 'sar' | 'ranger' | 'hospital' | 'poison-control'`
  - `name`: Service name
  - `phone`: Phone number
  - `coverage`: Geographic/temporal coverage notes
  - `notes`: Additional context
- [ ] SAR (Search and Rescue) contacts include county jurisdiction
- [ ] Display prominently with brand-orange border for visibility

#### FR-006: Accessibility/Physical Requirements

**Priority:** P1
**Description:** Backcountry requires clear physical requirement documentation for safety.

**Acceptance Criteria:**

- [ ] `BackcountryAccessibilitySchema` includes:
  - `physicalRequirements`: Array of required abilities
  - `fitnessLevel`: `'beginner' | 'intermediate' | 'advanced' | 'expert'`
  - `mobilityRating`: `'fully-accessible' | 'rough-terrain' | 'off-trail' | 'technical'`
  - `packWeight`: Expected pack weight range
  - `elevationGain`: Total elevation gain in feet
  - `terrainType`: Array of terrain descriptors
- [ ] ADA statement for developed trailheads vs. wilderness areas

#### FR-007: Navigation Data

**Priority:** P1
**Description:** Backcountry navigation requires detailed pre-trip planning data.

**Acceptance Criteria:**

- [ ] `NavigationSchema` includes:
  - `usgsQuads`: Array of USGS 7.5-minute quadrangle names
  - `coordinates`: `CoordinatesSchema` for trailhead/center point
  - `cellCoverage`: `'none' | 'spotty' | 'ridge-only' | 'moderate' | 'good'`
  - `compassDeclination`: Magnetic declination in degrees (e.g., "8.5 W")
  - `gpsRecommended`: Boolean flag
  - `offlineMapUrl`: Link to downloadable offline maps
- [ ] Display cell coverage prominently in hero/quick stats

#### FR-008: Weather Hazards with Timing

**Priority:** P1
**Description:** WV backcountry weather is unpredictable; hazards need quantified data.

**Acceptance Criteria:**

- [ ] `WeatherHazardSchema` includes:
  - `type`: Hazard type string
  - `description`: Detailed description
  - `probability`: `'rare' | 'occasional' | 'common' | 'frequent'`
  - `peakSeason`: Array of months when most likely
  - `mitigation`: How to prepare/respond
  - `warning`: Optional Kim's voice warning
- [ ] Common WV hazards: flash floods, rapid temperature drops, fog, ice storms, thunderstorms

#### FR-009: Structured Regulations

**Priority:** P2
**Description:** Backcountry regulations vary by managing agency and location.

**Acceptance Criteria:**

- [ ] `RegulationsSchema` includes:
  - `managingAgency`: `'usfs' | 'nps' | 'wvdnr' | 'blm' | 'private'`
  - `permitRequired`: Boolean
  - `permitUrl`: URL for permit acquisition
  - `groupSizeLimit`: Max group size
  - `campingRules`: Structured camping regulations
  - `fireRules`: Fire restriction details with seasonal notes
  - `huntingAllowed`: Boolean with seasonal/zone notes
  - `fishingAllowed`: Boolean with license requirements
  - `regulationsUrl`: Link to official regulations

#### FR-010: Wildlife Hazards with Disease Vectors

**Priority:** P2
**Description:** Enhance wildlife safety to include disease transmission risks.

**Acceptance Criteria:**

- [ ] `WildlifeHazardSchema` includes:
  - `animal`: Animal name
  - `dangerLevel`: `'low' | 'moderate' | 'high' | 'extreme'`
  - `behavior`: Behavioral notes
  - `diseaseRisk`: Array of disease vectors (Lyme, Giardia, Rabies, etc.)
  - `season`: When most active
  - `avoidance`: How to avoid encounters
  - `response`: What to do if encountered
- [ ] Tick-borne disease warnings prominent for WV

#### FR-011: WVWO Shop Integration

**Priority:** P2
**Description:** Connect backcountry content to shop product categories.

**Acceptance Criteria:**

- [ ] Include `relatedShop: RelatedCategorySchema[]` from adventure.ts
- [ ] Include `gearList: GearItemSchema[]` from adventure.ts
- [ ] Kim's voice CTA: "Stop by the shop before you head out - we'll make sure you're prepared."

---

## 3. Data Model

### 3.0 Required vs Optional Fields

**Minimum Viable Backcountry Page (5 Required Fields):**

| Field | Type | Rationale |
|-------|------|-----------|
| `name` | string | Page identity |
| `heroImage` | string | Visual anchor |
| `navigation` | NavigationSchema | Safety: cell coverage, coordinates |
| `emergencyContacts` | EmergencyContactSchema[] | Safety: who to call |
| `regulations` | RegulationsSchema | Legal: managing agency, permits |

**Safety-Critical Arrays (show warning when empty):**

- `waterSources` - AMD hazard warnings
- `weatherHazards` - Timing and mitigation
- `wildlifeHazards` - Disease vectors
- `trails` - Navigation requirements

**Optional Arrays (hide when empty):**

- `wildernessAreas`, `accessPoints`, `seasonalConditions`
- `requiredSkills`, `requiredGear`, `leaveNoTrace`
- `gearList`, `relatedShop`, `nearbyAttractions`

### 3.1 Complete TypeScript Interfaces

```typescript
/**
 * Backcountry/Wilderness Type Definitions
 * SPEC-17: Backcountry Template types and Zod validation schemas
 *
 * Provides comprehensive type system for WV backcountry including:
 * - Trail difficulty with industry-standard color coding
 * - Water source safety with AMD contamination warnings
 * - Multi-tier emergency contacts with SAR info
 * - Navigation data (USGS quads, cell coverage, compass declination)
 * - Weather hazards with quantified timing
 * - Wildlife hazards with disease vectors
 *
 * @module types/backcountry-types
 */

import { z } from 'astro/zod';
import {
  GearItemSchema,
  RelatedCategorySchema,
  CoordinatesSchema,
  StatItemSchema,
  DifficultySchema,
  SeasonSchema,
  NearbyAttractionSchema,
  type GearItem,
  type RelatedCategory,
  type Coordinates,
  type StatItem,
  type Difficulty,
  type Season,
  type NearbyAttraction,
} from './adventure';

// ============================================================================
// WATER SOURCE STATUS (P0 - AMD HAZARD)
// ============================================================================

/**
 * Water source safety status.
 * CRITICAL: WV coal mining legacy means AMD contamination is common.
 */
export const WaterSourceStatusSchema = z.enum([
  'potable',        // Safe to drink without treatment (rare)
  'treat-required', // Safe after proper filtration/treatment
  'do-not-use',     // Contaminated - no treatment makes it safe
]);

export type WaterSourceStatus = z.infer<typeof WaterSourceStatusSchema>;

/**
 * Water source status colors for visual warnings.
 * do-not-use uses brand-orange for high visibility warning.
 */
export const WATER_SOURCE_STATUS_COLORS: Record<WaterSourceStatus, string> = {
  'potable': 'border-l-sign-green bg-sign-green/5',
  'treat-required': 'border-l-brand-brown bg-brand-cream',
  'do-not-use': 'border-l-brand-orange bg-brand-orange/10',
};

/**
 * Water source status labels.
 */
export const WATER_SOURCE_STATUS_LABELS: Record<WaterSourceStatus, string> = {
  'potable': 'Potable',
  'treat-required': 'Treat Before Drinking',
  'do-not-use': 'DO NOT USE',
};

/**
 * Water source contamination types.
 * Includes AMD and other WV-specific contamination sources.
 */
export const ContaminationTypeSchema = z.enum([
  'amd',              // Acid Mine Drainage - coal mining legacy
  'agricultural',     // Agricultural runoff
  'bacterial',        // Giardia, E. coli, etc.
  'industrial',       // Industrial contamination
  'sewage',           // Sewage contamination
  'unknown',          // Unknown contamination
]);

export type ContaminationType = z.infer<typeof ContaminationTypeSchema>;

/**
 * Water source information.
 * Includes safety status and contamination warnings.
 */
export const WaterSourceSchema = z.object({
  /** Water source name (e.g., "North Fork Stream", "Ridge Spring") */
  name: z.string().min(1),
  /** Water source type */
  type: z.enum(['stream', 'spring', 'lake', 'pond', 'river', 'seep']),
  /** Safety status - CRITICAL for user safety */
  status: WaterSourceStatusSchema,
  /** Reliability throughout the year */
  reliability: z.enum(['year-round', 'seasonal', 'unreliable', 'drought-sensitive']),
  /** Contamination type if status is 'do-not-use' */
  contamination: ContaminationTypeSchema.optional(),
  /** Treatment recommendation if status is 'treat-required' */
  treatment: z.string().optional(),
  /** Distance from trailhead/main route in miles */
  distance: z.number().nonnegative().optional(),
  /** GPS coordinates */
  coordinates: CoordinatesSchema.optional(),
  /** Source URL for contamination data verification (USFS/WVDEP) */
  sourceUrl: z.string().url().optional(),
  /** Kim's personal note about this water source */
  kimNote: z.string().optional(),
});

export type WaterSource = z.infer<typeof WaterSourceSchema>;

// ============================================================================
// EMERGENCY CONTACTS (P1 - Multi-tier)
// ============================================================================

/**
 * Emergency contact tier levels.
 * Multi-tier structure for backcountry emergencies.
 */
export const EmergencyTierSchema = z.enum([
  '911',            // General emergency
  'sar',            // Search and Rescue
  'ranger',         // Forest/Park Ranger
  'hospital',       // Nearest hospital
  'poison-control', // Poison control center
]);

export type EmergencyTier = z.infer<typeof EmergencyTierSchema>;

/**
 * Emergency contact tier colors for visual hierarchy.
 */
export const EMERGENCY_TIER_COLORS: Record<EmergencyTier, string> = {
  '911': 'border-l-red-700 bg-red-50',
  'sar': 'border-l-brand-orange bg-brand-orange/10',
  'ranger': 'border-l-sign-green bg-sign-green/5',
  'hospital': 'border-l-blue-700 bg-blue-50',
  'poison-control': 'border-l-purple-700 bg-purple-50',
};

/**
 * Emergency contact information.
 * Full contact details for backcountry emergencies.
 */
export const EmergencyContactSchema = z.object({
  /** Contact tier/type */
  tier: EmergencyTierSchema,
  /** Service/organization name */
  name: z.string().min(1),
  /** Phone number (e.g., "911", "304-636-1800") */
  phone: z.string().min(1),
  /** Geographic or temporal coverage notes */
  coverage: z.string().optional(),
  /** Additional context or instructions */
  notes: z.string().optional(),
  /** Response time estimate (e.g., "2-4 hours in remote areas") */
  responseTime: z.string().optional(),
});

export type EmergencyContact = z.infer<typeof EmergencyContactSchema>;

// ============================================================================
// ACCESSIBILITY & PHYSICAL REQUIREMENTS (P1)
// ============================================================================

/**
 * Fitness level requirements.
 */
export const FitnessLevelSchema = z.enum(['beginner', 'intermediate', 'advanced', 'expert']);

export type FitnessLevel = z.infer<typeof FitnessLevelSchema>;

/**
 * Mobility rating for trail/route accessibility.
 */
export const MobilityRatingSchema = z.enum([
  'fully-accessible',  // ADA accessible
  'rough-terrain',     // Uneven surfaces, roots, rocks
  'off-trail',         // No maintained trail
  'technical',         // Requires scrambling, exposure
]);

export type MobilityRating = z.infer<typeof MobilityRatingSchema>;

/**
 * Backcountry accessibility and physical requirements.
 */
export const BackcountryAccessibilitySchema = z.object({
  /** Required physical abilities (1-15 items) */
  physicalRequirements: z.array(z.string().min(1)).min(1).max(15),
  /** Overall fitness level required */
  fitnessLevel: FitnessLevelSchema,
  /** Mobility/accessibility rating */
  mobilityRating: MobilityRatingSchema,
  /** Expected pack weight range (e.g., "25-40 lbs") */
  packWeight: z.string().optional(),
  /** Total elevation gain in feet */
  elevationGain: z.number().int().nonnegative().optional(),
  /** Terrain type descriptors */
  terrainType: z.array(z.string().min(1)).max(10).optional(),
  /** ADA accessibility statement */
  adaStatement: z.string().optional(),
  /** Special considerations (e.g., altitude, exposure) */
  specialConsiderations: z.array(z.string().min(1)).max(10).optional(),
});

export type BackcountryAccessibility = z.infer<typeof BackcountryAccessibilitySchema>;

// ============================================================================
// NAVIGATION DATA (P1)
// ============================================================================

/**
 * Cell coverage levels.
 */
export const CellCoverageSchema = z.enum([
  'none',       // No cell service
  'spotty',     // Occasional signal
  'ridge-only', // Only on ridge tops
  'moderate',   // Intermittent service
  'good',       // Reliable service (rare in backcountry)
]);

export type CellCoverage = z.infer<typeof CellCoverageSchema>;

/**
 * Navigation information for backcountry planning.
 */
export const NavigationSchema = z.object({
  /** USGS 7.5-minute quadrangle names covering the area */
  usgsQuads: z.array(z.string().min(1)).min(1).max(10),
  /** Primary coordinates (trailhead or center point) */
  coordinates: CoordinatesSchema,
  /** Cell phone coverage level */
  cellCoverage: CellCoverageSchema,
  /** Magnetic compass declination (e.g., "8.5 W") */
  compassDeclination: z.string(),
  /** GPS device recommended */
  gpsRecommended: z.boolean().default(true),
  /** Link to downloadable offline maps */
  offlineMapUrl: z.string().url().optional(),
  /** Trail marking quality */
  trailMarking: z.enum(['well-marked', 'moderate', 'sparse', 'unmarked']).optional(),
  /** Recommended navigation tools */
  recommendedTools: z.array(z.string().min(1)).max(10).optional(),
});

export type Navigation = z.infer<typeof NavigationSchema>;

// ============================================================================
// WEATHER HAZARDS (P1)
// ============================================================================

/**
 * Weather hazard probability levels.
 */
export const HazardProbabilitySchema = z.enum(['rare', 'occasional', 'common', 'frequent']);

export type HazardProbability = z.infer<typeof HazardProbabilitySchema>;

/**
 * Weather hazard information with timing data.
 */
export const WeatherHazardSchema = z.object({
  /** Hazard type (e.g., "Flash Flood", "Hypothermia", "Lightning") */
  type: z.string().min(1),
  /** Detailed description */
  description: z.string().min(1),
  /** Probability of occurrence */
  probability: HazardProbabilitySchema,
  /** Peak months (1-12) */
  peakMonths: z.array(z.number().int().min(1).max(12)).min(1).max(12),
  /** Mitigation strategies */
  mitigation: z.string().min(1),
  /** Kim's voice warning (optional) */
  kimWarning: z.string().optional(),
});

export type WeatherHazard = z.infer<typeof WeatherHazardSchema>;

/**
 * Month names for display.
 */
export const MONTH_NAMES: Record<number, string> = {
  1: 'January', 2: 'February', 3: 'March', 4: 'April',
  5: 'May', 6: 'June', 7: 'July', 8: 'August',
  9: 'September', 10: 'October', 11: 'November', 12: 'December',
};

// ============================================================================
// REGULATIONS (P2)
// ============================================================================

/**
 * Managing agency types.
 */
export const ManagingAgencySchema = z.enum(['usfs', 'nps', 'wvdnr', 'blm', 'private', 'state-park']);

export type ManagingAgency = z.infer<typeof ManagingAgencySchema>;

/**
 * Managing agency labels.
 */
export const MANAGING_AGENCY_LABELS: Record<ManagingAgency, string> = {
  'usfs': 'U.S. Forest Service',
  'nps': 'National Park Service',
  'wvdnr': 'WV Division of Natural Resources',
  'blm': 'Bureau of Land Management',
  'private': 'Private Land',
  'state-park': 'WV State Parks',
};

/**
 * Camping regulations schema.
 */
export const CampingRulesSchema = z.object({
  /** Type of camping allowed */
  type: z.enum(['dispersed', 'designated-only', 'no-camping', 'permit-required']),
  /** Distance requirements (from water, trails, etc.) */
  distanceRequirements: z.array(z.string().min(1)).max(10).optional(),
  /** Stay limit in days */
  stayLimit: z.number().int().positive().optional(),
  /** Group size limits */
  groupSizeLimit: z.number().int().positive().optional(),
  /** Additional restrictions */
  restrictions: z.array(z.string().min(1)).max(20).optional(),
});

export type CampingRules = z.infer<typeof CampingRulesSchema>;

/**
 * Fire regulations schema.
 */
export const FireRulesSchema = z.object({
  /** Fire allowed status */
  status: z.enum(['allowed', 'restricted', 'prohibited', 'seasonal-ban']),
  /** Seasonal restriction notes */
  seasonalNotes: z.string().optional(),
  /** Fire ring requirements */
  fireRingRequired: z.boolean().optional(),
  /** Stove-only zones */
  stoveOnlyZones: z.array(z.string().min(1)).max(10).optional(),
  /** Current fire danger level URL */
  fireDangerUrl: z.string().url().optional(),
});

export type FireRules = z.infer<typeof FireRulesSchema>;

/**
 * Complete regulations schema.
 */
export const RegulationsSchema = z.object({
  /** Managing agency */
  managingAgency: ManagingAgencySchema,
  /** Permit required for entry/camping */
  permitRequired: z.boolean(),
  /** Permit acquisition URL */
  permitUrl: z.string().url().optional(),
  /** Maximum group size */
  groupSizeLimit: z.number().int().positive().optional(),
  /** Camping regulations */
  campingRules: CampingRulesSchema,
  /** Fire regulations */
  fireRules: FireRulesSchema,
  /** Hunting allowed with notes */
  huntingAllowed: z.boolean(),
  /** Hunting notes (zones, seasons) */
  huntingNotes: z.string().optional(),
  /** Fishing allowed */
  fishingAllowed: z.boolean(),
  /** Fishing license requirements */
  fishingNotes: z.string().optional(),
  /** Link to official regulations */
  regulationsUrl: z.string().url().optional(),
});

export type Regulations = z.infer<typeof RegulationsSchema>;

// ============================================================================
// WILDLIFE HAZARDS (P2)
// ============================================================================

/**
 * Wildlife danger levels.
 */
export const DangerLevelSchema = z.enum(['low', 'moderate', 'high', 'extreme']);

export type DangerLevel = z.infer<typeof DangerLevelSchema>;

/**
 * Danger level colors for display.
 */
export const DANGER_LEVEL_COLORS: Record<DangerLevel, string> = {
  'low': 'border-l-sign-green',
  'moderate': 'border-l-brand-brown',
  'high': 'border-l-brand-orange',
  'extreme': 'border-l-red-800',
};

/**
 * Wildlife hazard with disease vector information.
 */
export const WildlifeHazardSchema = z.object({
  /** Animal name */
  animal: z.string().min(1),
  /** Danger level to humans */
  dangerLevel: DangerLevelSchema,
  /** Behavioral notes */
  behavior: z.string().optional(),
  /** Disease risks (Lyme, Giardia, Rabies, etc.) */
  diseaseRisk: z.array(z.string().min(1)).max(10).optional(),
  /** Most active seasons */
  activeSeason: z.array(SeasonSchema).optional(),
  /** How to avoid encounters */
  avoidance: z.array(z.string().min(1)).min(1).max(10),
  /** What to do if encountered */
  response: z.array(z.string().min(1)).min(1).max(10),
});

export type WildlifeHazard = z.infer<typeof WildlifeHazardSchema>;

// ============================================================================
// WILDERNESS AREA (from PROMPT.md)
// ============================================================================

/**
 * Wilderness area information.
 * Named zones within the backcountry area.
 */
export const WildernessAreaSchema = z.object({
  /** Wilderness area name */
  name: z.string().min(1),
  /** Acreage of the area */
  acreage: z.number().int().positive(),
  /** Terrain description */
  terrain: z.string().min(1),
  /** Difficulty level using shared schema */
  difficulty: DifficultySchema,
  /** Access information */
  access: z.string().min(1),
  /** Notable highlights */
  highlights: z.array(z.string().min(1)).min(1).max(15),
  /** Special restrictions */
  restrictions: z.array(z.string().min(1)).max(10).optional(),
});

export type WildernessArea = z.infer<typeof WildernessAreaSchema>;

// ============================================================================
// TRAIL SCHEMA
// ============================================================================

/**
 * Trail information for backcountry areas.
 */
export const BackcountryTrailSchema = z.object({
  /** Trail name */
  name: z.string().min(1),
  /** Distance (e.g., "12 miles loop", "5.5 miles one-way") */
  distance: z.string().min(1),
  /** Elevation gain (e.g., "2,400 feet") */
  elevationGain: z.string().min(1),
  /** Difficulty using shared schema with industry colors */
  difficulty: DifficultySchema,
  /** Trail highlights */
  highlights: z.array(z.string().min(1)).min(1).max(10),
  /** Water availability notes */
  waterAvailability: z.string().optional(),
  /** Best seasons to hike */
  bestSeasons: z.array(SeasonSchema).optional(),
  /** Kim's personal tip */
  kimNote: z.string().optional(),
});

export type BackcountryTrail = z.infer<typeof BackcountryTrailSchema>;

// ============================================================================
// ACCESS POINT SCHEMA
// ============================================================================

/**
 * Access point (trailhead) information.
 */
export const AccessPointSchema = z.object({
  /** Access point name */
  name: z.string().min(1),
  /** GPS coordinates */
  coordinates: CoordinatesSchema.optional(),
  /** Available facilities (parking, restrooms, etc.) */
  facilities: z.array(z.string().min(1)).min(1).max(15),
  /** Permit required at this trailhead */
  permitRequired: z.boolean(),
  /** Seasonal access restrictions */
  seasonalAccess: z.string().optional(),
  /** Driving directions from major routes */
  directions: z.string().optional(),
  /** Cell coverage at trailhead */
  cellCoverage: CellCoverageSchema.optional(),
});

export type AccessPoint = z.infer<typeof AccessPointSchema>;

// ============================================================================
// REQUIRED SKILLS SCHEMA
// ============================================================================

/**
 * Required skills for backcountry travel.
 */
export const RequiredSkillsSchema = z.object({
  /** Navigation skills */
  navigation: z.array(z.string().min(1)).min(1).max(10),
  /** Survival skills */
  survival: z.array(z.string().min(1)).min(1).max(10),
  /** First aid skills */
  firstAid: z.array(z.string().min(1)).min(1).max(10),
  /** Optional specialized skills */
  specialized: z.array(z.string().min(1)).max(10).optional(),
});

export type RequiredSkills = z.infer<typeof RequiredSkillsSchema>;

// ============================================================================
// REQUIRED GEAR CATEGORY SCHEMA
// ============================================================================

/**
 * Gear category for backcountry checklists.
 */
export const GearCategorySchema = z.object({
  /** Category name (e.g., "Ten Essentials", "Overnight Gear") */
  category: z.string().min(1),
  /** Items in this category */
  items: z.array(z.string().min(1)).min(1).max(20),
});

export type GearCategory = z.infer<typeof GearCategorySchema>;

// ============================================================================
// LEAVE NO TRACE SCHEMA
// ============================================================================

/**
 * Leave No Trace principle with guidelines.
 */
export const LeaveNoTracePrincipleSchema = z.object({
  /** Principle name (e.g., "Plan Ahead and Prepare") */
  principle: z.string().min(1),
  /** Implementation guidelines */
  guidelines: z.array(z.string().min(1)).min(1).max(10),
});

export type LeaveNoTracePrinciple = z.infer<typeof LeaveNoTracePrincipleSchema>;

// ============================================================================
// SEASONAL CONDITIONS SCHEMA
// ============================================================================

/**
 * Seasonal conditions information.
 */
export const SeasonalConditionsSchema = z.object({
  /** Season name */
  season: z.string().min(1),
  /** General conditions description */
  conditions: z.string().min(1),
  /** Best activities for this season */
  bestFor: z.array(z.string().min(1)).min(1).max(10),
  /** Challenges during this season */
  challenges: z.array(z.string().min(1)).min(1).max(10),
  /** Average temperature range */
  temperatureRange: z.string().optional(),
});

export type SeasonalConditions = z.infer<typeof SeasonalConditionsSchema>;

// ============================================================================
// MAIN BACKCOUNTRY TEMPLATE PROPS SCHEMA
// ============================================================================

/**
 * Complete Backcountry Template Props Schema.
 * Validates all required and optional fields for backcountry destination pages.
 */
export const BackcountryTemplatePropsSchema = z.object({
  // Hero Section (Required)
  /** Area name */
  name: z.string().min(1),
  /** Hero image source */
  heroImage: z.string().min(1),
  /** Hero image alt text */
  imageAlt: z.string().min(1),
  /** Total acreage */
  acreage: z.number().int().positive(),
  /** Designation type (e.g., "National Forest", "Wilderness Area") */
  designation: z.string().min(1),
  /** Location description */
  location: z.string().min(1),
  /** WV county or counties */
  county: z.string().min(1),
  /** Remoteness description (e.g., "10+ miles from nearest road") */
  remoteness: z.string().min(1),
  /** Quick highlights for hero badges */
  quickHighlights: z.array(z.string().min(1)).min(1).max(10),
  /** Full description (rendered as prose) */
  description: z.string().min(1),
  /** Quick stat badges for hero */
  stats: z.array(StatItemSchema).min(1).max(6).optional(),

  // Navigation Data (P1 - Required)
  /** Navigation information */
  navigation: NavigationSchema,

  // Wilderness Areas
  /** Named wilderness/backcountry zones */
  wildernessAreas: z.array(WildernessAreaSchema).min(1).max(20),

  // Camping & Water
  /** Camping regulations */
  camping: z.object({
    regulations: z.array(z.string().min(1)).min(1).max(20),
    permittedSites: z.string().min(1),
    restrictions: z.array(z.string().min(1)).max(20),
  }),
  /** Water sources with safety status (P0 - AMD) */
  waterSources: z.array(WaterSourceSchema).min(0).max(30),

  // Trails
  /** Trail information */
  trails: z.array(BackcountryTrailSchema).min(0).max(50),

  // Skills & Gear
  /** Required skills for this area */
  requiredSkills: RequiredSkillsSchema,
  /** Required gear by category */
  requiredGear: z.array(GearCategorySchema).min(1).max(10),

  // Safety (P0/P1)
  /** Weather hazards with timing (P1) */
  weatherHazards: z.array(WeatherHazardSchema).min(1).max(20),
  /** Wildlife hazards with disease vectors (P2) */
  wildlifeHazards: z.array(WildlifeHazardSchema).min(1).max(20),
  /** Emergency contacts multi-tier (P1) */
  emergencyContacts: z.array(EmergencyContactSchema).min(1).max(15),

  // Leave No Trace
  /** Leave No Trace principles with guidelines */
  leaveNoTrace: z.array(LeaveNoTracePrincipleSchema).min(1).max(10),

  // Access & Regulations (P2)
  /** Access points/trailheads */
  accessPoints: z.array(AccessPointSchema).min(1).max(20),
  /** Regulations (P2) */
  regulations: RegulationsSchema,

  // Seasonal Conditions
  /** Seasonal conditions guide */
  seasonalConditions: z.array(SeasonalConditionsSchema).min(1).max(6),

  // Accessibility (P1)
  /** Physical requirements and accessibility */
  accessibility: BackcountryAccessibilitySchema,

  // Shared Components (Reused from adventure.ts)
  /** Recommended gear checklist (simple list) */
  gearList: z.array(GearItemSchema).min(1).max(50).optional(),
  /** Related shop categories (P2) */
  relatedShop: z.array(RelatedCategorySchema).min(0).max(10).optional(),
  /** Optional nearby attractions */
  nearbyAttractions: z.array(NearbyAttractionSchema).max(30).optional(),

  // Optional Metadata
  /** Map URL for external map viewer */
  mapUrl: z.string().url().optional(),
  /** Official website URL */
  websiteUrl: z.string().url().optional(),
});

/**
 * Backcountry Template Props interface.
 * Complete type definition for BackcountryTemplate component.
 */
export interface BackcountryTemplateProps {
  // Hero Section
  name: string;
  heroImage: string;
  imageAlt: string;
  acreage: number;
  designation: string;
  location: string;
  county: string;
  remoteness: string;
  quickHighlights: string[];
  description: string;
  stats?: StatItem[];

  // Navigation Data
  navigation: Navigation;

  // Wilderness Areas
  wildernessAreas: WildernessArea[];

  // Camping & Water
  camping: {
    regulations: string[];
    permittedSites: string;
    restrictions: string[];
  };
  waterSources: WaterSource[];

  // Trails
  trails: BackcountryTrail[];

  // Skills & Gear
  requiredSkills: RequiredSkills;
  requiredGear: GearCategory[];

  // Safety
  weatherHazards: WeatherHazard[];
  wildlifeHazards: WildlifeHazard[];
  emergencyContacts: EmergencyContact[];

  // Leave No Trace
  leaveNoTrace: LeaveNoTracePrinciple[];

  // Access & Regulations
  accessPoints: AccessPoint[];
  regulations: Regulations;

  // Seasonal Conditions
  seasonalConditions: SeasonalConditions[];

  // Accessibility
  accessibility: BackcountryAccessibility;

  // Shared Components
  gearList?: GearItem[];
  relatedShop?: RelatedCategory[];
  nearbyAttractions?: NearbyAttraction[];

  // Optional Metadata
  mapUrl?: string;
  websiteUrl?: string;
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Helper function to get water source status color class.
 * Returns Tailwind classes for card styling.
 *
 * @param status - Water source safety status
 * @returns Tailwind color classes string
 */
export function getWaterSourceStatusColor(status: WaterSourceStatus): string {
  return WATER_SOURCE_STATUS_COLORS[status];
}

/**
 * Helper function to get water source status label.
 * Returns human-readable status label.
 *
 * @param status - Water source safety status
 * @returns Human-readable label string
 */
export function getWaterSourceStatusLabel(status: WaterSourceStatus): string {
  return WATER_SOURCE_STATUS_LABELS[status];
}

/**
 * Helper function to get danger level color class.
 * Returns Tailwind border color class.
 *
 * @param level - Danger level
 * @returns Tailwind border color class string
 */
export function getDangerLevelColor(level: DangerLevel): string {
  return DANGER_LEVEL_COLORS[level];
}

/**
 * Helper function to get managing agency label.
 * Returns full agency name.
 *
 * @param agency - Managing agency code
 * @returns Full agency name string
 */
export function getManagingAgencyLabel(agency: ManagingAgency): string {
  return MANAGING_AGENCY_LABELS[agency];
}

/**
 * Helper function to format peak months for display.
 * Converts month numbers to readable range.
 *
 * @param months - Array of month numbers (1-12)
 * @returns Formatted month range string
 */
export function formatPeakMonths(months: number[]): string {
  if (months.length === 0) return '';
  if (months.length === 1) return MONTH_NAMES[months[0]];
  if (months.length === 12) return 'Year-round';

  // Sort and find contiguous ranges
  const sorted = [...months].sort((a, b) => a - b);
  const first = MONTH_NAMES[sorted[0]];
  const last = MONTH_NAMES[sorted[sorted.length - 1]];

  return `${first} - ${last}`;
}

/**
 * Type guard to check if an adventure is Backcountry.
 * Enables conditional rendering of backcountry-specific components.
 *
 * @param adventure - CollectionEntry from Astro Content Collections
 * @returns true if adventure.data.type === 'backcountry'
 */
export function isBackcountryAdventure(adventure: any): boolean {
  return adventure?.data?.type === 'backcountry';
}
```

---

## 4. Non-Functional Requirements

### NFR-001: Performance

- Template renders in <100ms server-side
- Total component bundle <50KB gzipped
- Images lazy-loaded below the fold

### NFR-002: Accessibility

- WCAG 2.1 AA compliance
- Industry-standard difficulty colors with shape icons for colorblind users
- Screen reader labels for all interactive elements
- Keyboard navigation support

### NFR-003: Responsiveness

- Mobile-first design
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Grid layouts collapse appropriately

### NFR-004: SEO

- Schema.org Place structured data
- Semantic HTML5 elements
- Proper heading hierarchy (h1 > h2 > h3)
- Meta description from `description` field

---

## 5. UI/UX Specifications

### 5.1 WVWO Aesthetic Compliance (per CLAUDE.md)

| Element | Specification |
|---------|---------------|
| Fonts | `font-display` (Bitter), `font-hand` (Permanent Marker), `font-body` (Noto Sans) |
| Colors | `brand-brown`, `sign-green`, `brand-cream`, `brand-orange` (<5% CTAs only) |
| Corners | `rounded-sm` ONLY - no rounded-md/lg/xl |
| Borders | `border-l-4` accents (green for wilderness, orange for safety/hazards) |
| Voice | Kim's authentic rural WV - direct, humble, faith-forward |

### 5.2 Section Layout

1. **Hero** (~60 lines): Area name, acreage, designation, remoteness, cell coverage warning
2. **Wilderness Areas** (~80 lines): Named zones with difficulty badges, terrain, access
3. **Backcountry Camping** (~60 lines): Regulations, permitted sites, water sources with AMD warnings
4. **Trail System** (~70 lines): Trails with difficulty badges, distance, elevation
5. **Required Skills & Gear** (~80 lines): Navigation, survival, first aid skills; gear categories
6. **Safety & Hazards** (~100 lines): Weather hazards, wildlife with disease vectors, emergency contacts
7. **Leave No Trace** (~50 lines): 7 principles with implementation guidelines
8. **Access Points** (~50 lines): Trailheads with facilities, seasonal access, cell coverage
9. **Seasonal Considerations** (~50 lines): Best times, conditions, challenges

**Total Target:** ~500-550 lines

### 5.3 Safety Emphasis Styling

```css
/* Water source warnings */
.water-do-not-use {
  @apply border-l-4 border-l-brand-orange bg-brand-orange/10 p-4;
}

/* Emergency contacts */
.emergency-section {
  @apply border-l-4 border-l-brand-orange bg-brand-cream p-8;
}

/* Weather hazards */
.hazard-card {
  @apply border-l-4 border-l-brand-orange bg-brand-cream p-6;
}

/* Wildlife danger high/extreme */
.danger-high {
  @apply border-l-brand-orange;
}
.danger-extreme {
  @apply border-l-red-800;
}
```

---

## 6. Validation Checklist

### 6.1 Completeness

- [ ] `backcountry-types.ts` created at `wv-wild-web/src/types/backcountry-types.ts`
- [ ] All Zod schemas exported with JSDoc comments
- [ ] TypeScript interfaces match Zod schemas
- [ ] Helper functions for color/label mappings
- [ ] `content.config.ts` extended with 'backcountry' type
- [ ] `BackcountryTemplate.astro` ~500-550 lines
- [ ] All 9 sections implemented

### 6.2 Gap Closure

- [ ] G-001: Water sources have `status` with AMD support
- [ ] G-002: Trail difficulty uses shared `DifficultySchema` with industry colors
- [ ] G-003: `backcountry-types.ts` exists
- [ ] G-004: 'backcountry' added to content.config.ts enum
- [ ] G-005: Emergency contacts have multi-tier structure
- [ ] G-006: Accessibility object with physical requirements
- [ ] G-007: Navigation data with USGS quads, cell coverage, declination
- [ ] G-008: Weather hazards have probability and peak months
- [ ] G-009: Regulations structured with camping/fire rules
- [ ] G-010: Wildlife hazards include disease vectors
- [ ] G-011: WVWO shop integration via `relatedShop`

### 6.3 WVWO Aesthetic

- [ ] `rounded-sm` enforced (no rounded-md/lg/xl)
- [ ] Border-left accents (green for wilderness, orange for safety)
- [ ] Industry-standard difficulty colors with shape icons
- [ ] Kim's voice for practical advice and warnings
- [ ] Zero forbidden fonts (Inter, Poppins, etc.)
- [ ] Zero purple/pink/neon colors

### 6.4 Safety Emphasis

- [ ] AMD water source warnings prominently displayed
- [ ] Cell coverage displayed in hero/quick stats
- [ ] Emergency contacts with multi-tier structure visible
- [ ] Weather hazards with timing data
- [ ] Wildlife disease vectors documented
- [ ] Leave No Trace principles integrated
- [ ] Required skills clearly detailed

---

## 7. Implementation Notes

### 7.1 File Locations

| File | Path |
|------|------|
| Type definitions | `wv-wild-web/src/types/backcountry-types.ts` |
| Content config | `wv-wild-web/src/content.config.ts` |
| Template | `wv-wild-web/src/components/templates/BackcountryTemplate.astro` |
| Tests | `wv-wild-web/src/components/templates/__tests__/BackcountryTemplate.test.ts` |

### 7.2 Import Pattern

```typescript
// backcountry-types.ts imports shared types from adventure.ts
import {
  GearItemSchema,
  RelatedCategorySchema,
  CoordinatesSchema,
  StatItemSchema,
  DifficultySchema,
  SeasonSchema,
  NearbyAttractionSchema,
  // ... types
} from './adventure';
```

### 7.3 Content Config Extension

```typescript
// In content.config.ts, add to adventures schema:
type: z.enum(['adventure', 'wma', 'lake', 'river', 'ski', 'cave', 'backcountry']).optional(),

// Add backcountry-specific optional fields following ski-types pattern
```

### 7.4 Content Authoring Format

Content authors create backcountry areas using **MDX files with YAML frontmatter**, consistent with existing Content Collections pattern:

```
wv-wild-web/src/content/adventures/
├── monongahela-backcountry.mdx
├── dolly-sods-wilderness.mdx
└── cranberry-wilderness.mdx
```

Each MDX file uses YAML frontmatter validated against `BackcountryTemplatePropsSchema`:

```mdx
---
type: backcountry
name: Dolly Sods Wilderness
heroImage: /images/adventures/dolly-sods-hero.jpg
# ... remaining fields per schema
---

{/* Optional prose content rendered below template */}
```

### 7.5 First Example Content

**Dolly Sods Wilderness** - First backcountry content to implement:

- File: `wv-wild-web/src/content/adventures/dolly-sods-wilderness.mdx`
- Location: Monongahela National Forest, Tucker/Randolph Counties
- Key features: 17,371 acres, subalpine plateau, AMD concerns in some drainages
- Documentation: Extensive USFS and hiking community resources available

### 7.6 Reference Files

- Pattern reference: `wv-wild-web/src/types/cave-types.ts`
- Pattern reference: `wv-wild-web/src/types/ski-types.ts`
- Shared types: `wv-wild-web/src/types/adventure.ts`
- Content reference: `wv-wild-web/src/pages/near/monongahela.astro`

---

## 8. Edge Cases & Empty States

### 8.1 Safety-Critical Empty Data Handling

When safety-critical arrays are empty, display a warning instead of hiding the section:

```astro
{waterSources.length === 0 && (
  <div class="border-l-4 border-l-brand-orange bg-brand-orange/10 p-4 rounded-sm">
    <p class="font-bold text-brand-brown">Water Source Data Unavailable</p>
    <p class="text-sm text-brand-brown/80 mt-2">
      "We don't have documented water sources for this area yet.
      Before you head out, check with the Forest Service or pack in all the water you'll need.
      Better to carry extra than come up short." — Kim
    </p>
  </div>
)}
```

**Safety-critical sections requiring warnings when empty:**

- `waterSources` - "Pack all water needed"
- `emergencyContacts` - "Contact local ranger district before trip"
- `weatherHazards` - "Check current conditions with NOAA"
- `trails` - "No documented trails - navigate with map/compass"

**Non-critical sections (hide when empty):**

- `nearbyAttractions`
- `relatedShop`
- `gearList` (optional enhancement)

---

## 9. Success Metrics

| Metric | Target |
|--------|--------|
| Template line count | 500-550 lines |
| Type file line count | ~500-600 lines |
| Test coverage | >80% |
| Lighthouse accessibility | >95 |
| WVWO aesthetic violations | 0 |
| Gap closure | 11/11 (100%) |

---

## 10. Clarifications

### Session 2025-12-31

- Q: How should content authors create backcountry area content? → A: MDX files with YAML frontmatter (consistent with existing Content Collections pattern)
- Q: How should the template handle empty arrays for safety-critical data? → A: Show "No data available" warning with Kim's voice explaining why to research elsewhere
- Q: What is the minimum viable backcountry page? → A: Strict minimum of 5 required fields: name, heroImage, navigation, emergencyContacts, regulations
- Q: Which backcountry area should be the first example content? → A: Dolly Sods Wilderness (most iconic WV backcountry, extensive documentation available)
- Q: How should AMD contamination data be sourced? → A: Both manual status entry + optional sourceUrl for verification (USFS/WVDEP published data)

---

## 11. Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2025-12-31 | SPARC Specification Agent | Initial specification |
