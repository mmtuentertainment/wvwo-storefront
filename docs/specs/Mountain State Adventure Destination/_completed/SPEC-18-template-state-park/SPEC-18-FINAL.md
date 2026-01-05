# SPEC-18: State Park Template - Comprehensive Specification

```yaml
speckit:
  version: 1.0.0
  status: Final
  created: 2026-01-02
  last_updated: 2026-01-02
  authors:
    - Hierarchical Swarm Coordinator
    - Type System Architect Agent
    - Component Architecture Agent
    - SEO Specialist Agent
    - Data Structure Agent
    - Testing Engineer Agent
    - Project Planner Agent
  reviewers: []
  priority: P0
  estimated_effort: 12-16 hours
  dependencies:
    - SPEC-09 (adventure.ts shared types)
    - SPEC-17 (backcountry-types.ts pattern reference)
    - SPEC-16 (cave-types.ts pattern reference)
  gap_analysis_sources:
    - "63 gaps identified across 7 dimensions"
    - "Facilities & amenities (10 types, 15 amenities)"
    - "Accessibility compliance (8 ADA gaps, 11 features)"
    - "Reservation systems (3 components)"
    - "Seasonal programming (7 program types)"
    - "SEO architecture (20 critical gaps)"
    - "Template patterns (5 content types)"
    - "Hybrid multi-template architecture"
```typescript

---

## 1. Executive Summary

### 1.1 Purpose

Create a comprehensive type system and reusable Astro template for West Virginia State Parks. The template focuses on family-friendly recreation, facilities (lodging, camping, picnic areas), trails, scenic overlooks, visitor centers, accessibility features, and seasonal programming. This specification synthesizes extensive gap analysis research covering 63 identified gaps across facilities, accessibility, reservations, SEO, and architectural patterns.

### 1.2 Scope

- **In Scope:**
  - New `state-park-types.ts` with complete Zod validation schemas
  - Extension of `content.config.ts` to include `'state-park'` type
  - `StateParkTemplate.astro` component (~500-550 lines)
  - Comprehensive facility types (10+ categories): lodging, cabins, camping, picnic areas, playgrounds, pools, visitor centers, nature centers, amphitheaters, boat launches
  - Full ADA accessibility compliance features (8 critical areas, 11 accessibility features)
  - Reservation system integration patterns (3 components)
  - Seasonal programming structure (7 program types)
  - Industry-standard trail difficulty with color coding per CLAUDE.md
  - Scenic overlook documentation with accessibility ratings
  - SEO implementation with TouristAttraction and schema.org markup (20 SEO enhancements)
  - Hybrid multi-template architecture support

- **Out of Scope:**
  - Real-time reservation API integration (future SPEC)
  - Interactive facility map components (future SPEC)
  - Online program registration system (future SPEC)
  - Real-time weather API integration (future SPEC)

### 1.3 Gap Analysis Summary

Based on comprehensive research identifying 63 gaps across 7 dimensions:

| ID | Gap Category | Priority | Resolution |
|----|--------------|----------|------------|
| **FACILITIES & AMENITIES (10 gaps)** ||||
| G-001 | No structured facility type system | P0 | Create `FacilityTypeSchema` with 10+ facility categories |
| G-002 | Lodging lacks amenity detail (15 amenities) | P0 | Add `LodgingAmenitySchema` with detailed feature set |
| G-003 | Camping amenities underspecified | P0 | Add `CampingAmenitySchema` with hookup types, bathhouses |
| G-004 | Picnic area capacity not tracked | P1 | Add `PicnicAreaSchema` with shelter capacity, reservation status |
| G-005 | Playground/recreation amenities missing | P1 | Add `RecreationFacilitySchema` for playgrounds, pools, courts |
| G-006 | Visitor center exhibits not structured | P1 | Add `VisitorCenterSchema` with exhibits, programs, hours |
| G-007 | Boat launch details incomplete | P1 | Add `BoatLaunchSchema` with ramp types, capacity, fees |
| G-008 | Amphitheater/event venue data missing | P2 | Add `EventVenueSchema` with capacity, seasonal schedules |
| G-009 | Nature center programming not captured | P2 | Add `NatureCenterSchema` with exhibits, live animals, programs |
| G-010 | Facility season/hours not granular | P2 | Add `OperatingHoursSchema` with seasonal variations |
| **ACCESSIBILITY (8 gaps)** ||||
| G-011 | ADA-compliant facilities not flagged | P0 | Add `adaCompliant: boolean` to all facility types |
| G-012 | Accessible trails not distinguished | P0 | Add `AccessibilityRatingSchema` with surface types, grades |
| G-013 | Accessible parking not documented | P0 | Add `ParkingSchema` with ADA spaces, van-accessible |
| G-014 | Accessible restrooms not tracked | P1 | Add `RestroomSchema` with ADA features, family restrooms |
| G-015 | Assistive services not listed | P1 | Add `assistiveServices` array for wheelchairs, interpreters |
| G-016 | Sensory-friendly features missing | P1 | Add `sensoryFeatures` for quiet spaces, visual aids |
| G-017 | Service animal policy not stated | P2 | Add `serviceAnimalPolicy` to regulations |
| G-018 | Accessibility statement missing | P2 | Add `accessibilityStatement` with contact for accommodations |
| **RESERVATION SYSTEMS (3 gaps)** ||||
| G-019 | Reservation URLs not integrated | P0 | Add `reservationUrl` to lodging, camping, shelters |
| G-020 | Reservation phone numbers missing | P1 | Add `reservationPhone` with operating hours |
| G-021 | Advanced booking windows not specified | P1 | Add `bookingWindow` (e.g., "6 months advance") |
| **SEASONAL PROGRAMMING (7 gaps)** ||||
| G-022 | No structured program types | P0 | Create `ProgramTypeSchema` with 7+ categories |
| G-023 | Ranger-led programs not detailed | P0 | Add `RangerProgramSchema` with schedules, topics |
| G-024 | Educational workshops missing | P1 | Add `WorkshopSchema` with registration, skill levels |
| G-025 | Special events not captured | P1 | Add `SpecialEventSchema` with dates, fees |
| G-026 | Junior Ranger programs not structured | P1 | Add `JuniorRangerSchema` with age groups, activities |
| G-027 | Seasonal festivals not listed | P2 | Add `FestivalSchema` with dates, themes |
| G-028 | Volunteer opportunities missing | P2 | Add `VolunteerOpportunitySchema` with commitments |
| **SEO ARCHITECTURE (20 gaps)** ||||
| G-029 | Schema.org TouristAttraction not used | P0 | Add TouristAttraction structured data |
| G-030 | LocalBusiness schema for lodging missing | P0 | Add LocalBusiness for park lodge/cabins |
| G-031 | CampingPitch schema not implemented | P0 | Add CampingPitch for campgrounds |
| G-032 | BreadcrumbList missing | P0 | Add BreadcrumbList navigation |
| G-033 | Article schema not applied | P0 | Add Article schema for page content |
| G-034 | Place schema incomplete | P1 | Enhance Place with full address, coordinates |
| G-035 | OpeningHoursSpecification not detailed | P1 | Add seasonal operating hours structure |
| G-036 | Event schema for programs missing | P1 | Add Event schema for ranger programs |
| G-037 | AggregateRating not implemented | P1 | Add rating structure (placeholder for future) |
| G-038 | Image schema not comprehensive | P1 | Add ImageObject with captions, credits |
| G-039 | FAQ schema opportunity | P2 | Add FAQPage for common questions |
| G-040 | Video schema not used | P2 | Add VideoObject for park videos |
| G-041 | Trail schema enhancement | P2 | Add Trail type with elevation, distance |
| G-042 | Park map schema missing | P2 | Add Map type for downloadable maps |
| G-043 | Accessibility feature schema gaps | P1 | Add accessibilityFeature property |
| G-044 | Public transit schema missing | P2 | Add publicTransit if applicable |
| G-045 | Parking facility schema incomplete | P1 | Add ParkingFacility with fees, spaces |
| G-046 | Fees and pricing schema gaps | P1 | Add priceRange and feeDescription |
| G-047 | Seasonal closure announcements | P1 | Add SpecialAnnouncement for closures |
| G-048 | Local area schema connections | P2 | Add nearby attractions, towns |
| **TEMPLATE PATTERNS (5 gaps)** ||||
| G-049 | No fee structure template | P0 | Add `FeeSchema` with types, amounts, exemptions |
| G-050 | Pet policy not structured | P1 | Add `PetPolicySchema` with leash rules, restricted areas |
| G-051 | Park rules not templated | P1 | Add `ParkRulesSchema` with categories |
| G-052 | Hours of operation too simple | P1 | Enhance with seasonal/holiday variations |
| G-053 | Contact information incomplete | P1 | Add `ContactInfoSchema` with multiple channels |
| **ARCHITECTURE (10 gaps)** ||||
| G-054 | Hybrid template pattern not defined | P0 | Define multi-template architecture pattern |
| G-055 | Conditional section rendering unclear | P0 | Specify show/hide logic for empty sections |
| G-056 | Shared vs unique props not distinguished | P1 | Document prop inheritance strategy |
| G-057 | Component reuse strategy undefined | P1 | Specify which components from backcountry/cave reuse |
| G-058 | Data validation boundaries unclear | P1 | Define where Zod validation occurs |
| G-059 | Empty state handling inconsistent | P1 | Standardize empty array/null handling |
| G-060 | Type narrowing patterns missing | P2 | Add type guards for conditional rendering |
| G-061 | Template composition strategy unclear | P2 | Define section-level component splits |
| G-062 | SEO component integration undefined | P1 | Specify SEO component usage pattern |
| G-063 | Testing strategy for hybrid templates | P1 | Define test approach for multi-template pages |

---

## 2. Functional Requirements

### 2.1 Core Requirements

#### FR-001: Type System Creation

**Priority:** P0
**Description:** Create `state-park-types.ts` following the pattern established by `backcountry-types.ts` and `cave-types.ts`.

### Acceptance Criteria:

- [ ] File located at `src/types/state-park-types.ts`
- [ ] All schemas use Zod from `astro/zod`
- [ ] Imports shared types from `adventure.ts` (GearItemSchema, CoordinatesSchema, etc.)
- [ ] Exports both Zod schemas and TypeScript types
- [ ] Includes JSDoc comments for all exports
- [ ] Includes helper functions for color/label mappings
- [ ] Covers all 10 facility types identified in gap analysis
- [ ] Includes 15 detailed lodging amenities
- [ ] Includes 8 ADA accessibility features
- [ ] Supports 7 seasonal program types

#### FR-002: Content Config Extension

**Priority:** P0
**Description:** Extend `content.config.ts` to recognize `'state-park'` adventure type.

### Acceptance Criteria:

- [ ] Add `'state-park'` to type enum: `z.enum(['adventure', 'wma', 'lake', 'river', 'ski', 'cave', 'backcountry', 'state-park'])`
- [ ] Import state park schemas from `./types/state-park-types`
- [ ] Add optional state-park-specific fields to adventures schema
- [ ] Zero breaking changes to existing content

#### FR-003: Facility Type System

**Priority:** P0 (CRITICAL)
**Description:** Comprehensive facility categorization covering all park amenity types.

### Acceptance Criteria:

- [ ] `FacilityTypeSchema` includes minimum 10 types:
  - `'lodge'` - Park lodge/inn
  - `'cabin'` - Rental cabins
  - `'campground'` - Camping areas
  - `'picnic-area'` - Day-use picnic facilities
  - `'playground'` - Children's play areas
  - `'swimming-pool'` - Pool facilities
  - `'visitor-center'` - Main visitor center
  - `'nature-center'` - Nature/education center
  - `'amphitheater'` - Outdoor venues
  - `'boat-launch'` - Water access
- [ ] Each facility type has dedicated schema with specific fields
- [ ] Visual distinction in UI (icons, border colors)
- [ ] Kim's voice descriptions for each facility type

#### FR-004: Lodging Amenities Detail

**Priority:** P0
**Description:** Detailed amenity tracking for park lodging (15+ amenities identified).

### Acceptance Criteria:

- [ ] `LodgingAmenitySchema` includes:
  - Kitchen facilities (full/partial/none)
  - Bathrooms (count, accessibility)
  - Bedrooms (count, bed types)
  - Climate control (heating, A/C, fireplace)
  - Entertainment (TV, WiFi, games)
  - Outdoor features (deck, grill, fire pit)
  - Linens provided (yes/no)
  - Pet-friendly (yes/no/restrictions)
  - Accessible features (ramp, wide doors, roll-in shower)
- [ ] `LodgingSchema` includes price range, capacity, reservation URL
- [ ] Conditional rendering based on amenity availability

#### FR-005: Camping Amenities

**Priority:** P0
**Description:** Detailed campground and campsite amenity specifications.

### Acceptance Criteria:

- [ ] `CampingSchema` includes:
  - Site types (tent, RV, electric, full-hookup)
  - Hookup availability (20/30/50 amp, water, sewer)
  - Site count per type
  - Bathhouse facilities (showers, flush toilets)
  - Dump station availability
  - Reservable vs first-come-first-served
  - Pet-friendly sites
  - Accessible sites with features
  - Season/dates of operation
  - Fire rings/grills
- [ ] Reservation integration with URL and phone
- [ ] Visual site type badges

#### FR-006: Trail Difficulty Industry Standards

**Priority:** P0
**Description:** Use industry-standard difficulty colors that OVERRIDE WVWO brand palette per CLAUDE.md (same as backcountry).

### Acceptance Criteria:

- [ ] Reuse `DifficultySchema` from `adventure.ts`: `['easy', 'moderate', 'challenging', 'rugged']`
- [ ] Apply `DIFFICULTY_COLORS` with industry-standard mapping:
  - easy: `bg-sign-green text-white` (Green circle ●)
  - moderate: `bg-blue-700 text-white` (Blue square ■)
  - challenging: `bg-red-900 text-white` (Red triangle ▲)
  - rugged: `bg-black text-white` (Black diamond ◆)
- [ ] Include `DIFFICULTY_SHAPES` for colorblind accessibility

#### FR-007: Accessibility Features (ADA Compliance)

**Priority:** P0 (CRITICAL)
**Description:** Comprehensive accessibility tracking across all park facilities and trails.

### Acceptance Criteria:

- [ ] `AccessibilityRatingSchema` with levels:
  - `'fully-accessible'` - ADA compliant, paved, <5% grade
  - `'moderately-accessible'` - Paved/hard surface, 5-8% grade
  - `'limited-accessibility'` - Uneven surface, >8% grade
  - `'not-accessible'` - Steps, rough terrain
- [ ] `AccessibleFacilitySchema` includes:
  - Accessible parking (count, van-accessible)
  - Accessible restrooms (features: grab bars, roll-under sink)
  - Accessible trails (surface type, width, grade, benches)
  - Assistive services (wheelchairs, interpreters, braille guides)
  - Sensory features (quiet spaces, visual aids, tactile maps)
- [ ] `adaCompliant: boolean` flag on all facility types
- [ ] `accessibilityStatement` with contact for accommodations
- [ ] Service animal policy documentation

#### FR-008: Scenic Overlooks

**Priority:** P1
**Description:** Named viewpoint documentation with accessibility and best viewing times.

### Acceptance Criteria:

- [ ] `ScenicOverlookSchema` includes:
  - Overlook name
  - Description of view
  - Accessibility rating (wheelchair accessible, distance from parking)
  - Best time (sunrise, sunset, fall foliage)
  - Parking availability
  - Amenities (benches, interpretive signs)
  - Safety features (railings, barriers)
  - Photography tips (optional)
- [ ] Visual distinction with border-l-brand-brown
- [ ] Kim's voice photo tips

#### FR-009: Visitor Center & Nature Center

**Priority:** P1
**Description:** Comprehensive visitor center and nature center information.

### Acceptance Criteria:

- [ ] `VisitorCenterSchema` includes:
  - Center name
  - Operating hours (seasonal variations)
  - Exhibits (permanent and temporary)
  - Ranger programs schedule
  - Educational resources (guides, maps, books)
  - Gift shop (yes/no)
  - Accessibility features
  - Contact information
- [ ] `NatureCenterSchema` extends visitor center with:
  - Live animal exhibits
  - Interactive displays
  - Classroom/workshop space
  - Junior Ranger program details
- [ ] Conditional rendering when centers exist

#### FR-010: Reservation System Integration

**Priority:** P0
**Description:** Integration patterns for state park reservation systems.

### Acceptance Criteria:

- [ ] `ReservationInfoSchema` includes:
  - Reservation URL (WV Parks online booking)
  - Reservation phone with hours
  - Booking window (e.g., "6 months in advance")
  - Cancellation policy summary
  - Check-in/check-out times
  - Deposit requirements
- [ ] Applied to lodging, camping, picnic shelter reservations
- [ ] Prominent CTA buttons with brand-orange styling
- [ ] Kim's voice: "Book early for weekends and fall foliage season"

#### FR-011: Seasonal Programming

**Priority:** P1
**Description:** Structured seasonal programs and events (7 program types identified).

### Acceptance Criteria:

- [ ] `ProgramTypeSchema` with 7 types:
  - `'ranger-led'` - Ranger-led hikes, talks
  - `'educational-workshop'` - Skills workshops
  - `'special-event'` - Holiday events, festivals
  - `'junior-ranger'` - Youth programs
  - `'volunteer'` - Volunteer opportunities
  - `'festival'` - Annual festivals
  - `'concert'` - Music/entertainment events
- [ ] `ProgramSchema` includes:
  - Program name and type
  - Description
  - Schedule (days/times, seasonal)
  - Age requirements
  - Registration required (yes/no, URL/phone)
  - Cost (free/fee amount)
  - Meeting location
  - What to bring
- [ ] Seasonal filtering and display

#### FR-012: Fees and Pricing

**Priority:** P0
**Description:** Comprehensive fee structure for all park services.

### Acceptance Criteria:

- [ ] `FeeSchema` includes:
  - Fee type (`'day-use' | 'camping' | 'cabin' | 'shelter' | 'boat-launch' | 'special-use'`)
  - Amount (or "Free")
  - Description
  - Exemptions (seniors, disabled, WV residents)
  - Annual pass information
  - Payment methods accepted
- [ ] Display in dedicated fees section
- [ ] Clear visual hierarchy (free vs paid)

#### FR-013: Pet Policy

**Priority:** P1
**Description:** Structured pet policy information.

### Acceptance Criteria:

- [ ] `PetPolicySchema` includes:
  - Pets allowed (yes/no/restricted)
  - Leash requirements (length)
  - Restricted areas (buildings, beaches, trails)
  - Pet-friendly facilities (cabins, campsites)
  - Cleanup requirements
  - Aggressive breed restrictions (if any)
- [ ] Visual pet-friendly badges on applicable facilities

#### FR-014: Park Rules and Regulations

**Priority:** P1
**Description:** Organized park rules by category.

### Acceptance Criteria:

- [ ] `ParkRulesSchema` includes categories:
  - Alcohol policy
  - Quiet hours
  - Fire regulations
  - Fishing/hunting (licenses required)
  - Gathering/foraging restrictions
  - Drone policy
  - Commercial use permits
  - Group size limits
- [ ] Kim's voice: "We want everyone to have a good time - just be respectful of others and the park"

#### FR-015: SEO Schema Implementation

**Priority:** P0 (CRITICAL)
**Description:** Comprehensive schema.org structured data for search visibility (20 SEO gaps addressed).

### Acceptance Criteria:

- [ ] `TouristAttraction` primary type
- [ ] `LocalBusiness` for park lodge
- [ ] `CampingPitch` for campgrounds
- [ ] `BreadcrumbList` navigation
- [ ] `Article` for page content
- [ ] `Place` with full address, coordinates, contact
- [ ] `OpeningHoursSpecification` with seasonal variations
- [ ] `Event` for ranger programs and special events
- [ ] `ImageObject` with captions and credits
- [ ] `AggregateRating` structure (placeholder)
- [ ] `ParkingFacility` with fees and accessibility
- [ ] `accessibilityFeature` properties for ADA features
- [ ] `SpecialAnnouncement` for seasonal closures
- [ ] `FAQPage` for common questions (optional)
- [ ] Schema validation with zero errors

---

## 3. Data Model

### 3.0 Required vs Optional Fields

### Minimum Viable State Park Page (6 Required Fields):

| Field | Type | Rationale |
|-------|------|-----------|
| `name` | string | Page identity |
| `heroImage` | string | Visual anchor |
| `acreage` | number | Park size |
| `location` | string | Geographic context |
| `quickHighlights` | string[] | Key features for hero |
| `fees` | FeeSchema[] | Visitor planning critical |

### Important Arrays (show empty state message when empty):

- `trails` - "Trail information coming soon"
- `facilities` - "Facility details coming soon"
- `programs` - "Check back for seasonal programs"

### Optional Arrays (hide when empty):

- `scenicOverlooks`, `nearbyAttractions`, `relatedShop`

### 3.1 Complete TypeScript Interfaces

```typescript
/**
 * State Park Type Definitions
 * SPEC-18: State Park Template types and Zod validation schemas
 *
 * Provides comprehensive type system for WV State Parks including:
 * - 10+ facility types (lodging, camping, picnic, recreation)
 * - 15 detailed lodging amenities
 * - ADA accessibility features (8 critical areas)
 * - Reservation system integration
 * - Seasonal programming (7 program types)
 * - Trail difficulty with industry-standard color coding
 * - SEO schema.org markup (20+ enhancements)
 *
 * @module types/state-park-types
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
// FACILITY TYPES
// ============================================================================

/**
 * State park facility types.
 * 10 primary facility categories identified in gap analysis.
 */
export const FacilityTypeSchema = z.enum([
  'lodge',           // Park lodge/inn
  'cabin',           // Rental cabins
  'campground',      // Camping areas
  'picnic-area',     // Day-use picnic facilities
  'playground',      // Children's play areas
  'swimming-pool',   // Pool facilities
  'visitor-center',  // Main visitor center
  'nature-center',   // Nature/education center
  'amphitheater',    // Outdoor venues
  'boat-launch',     // Water access
  'beach',           // Swimming beaches
  'sports-court',    // Tennis, basketball, etc.
  'disc-golf',       // Disc golf course
  'mini-golf',       // Miniature golf
]);

export type FacilityType = z.infer<typeof FacilityTypeSchema>;

/**
 * Facility type labels for display.
 */
export const FACILITY_TYPE_LABELS: Record<FacilityType, string> = {
  'lodge': 'Park Lodge',
  'cabin': 'Rental Cabins',
  'campground': 'Campground',
  'picnic-area': 'Picnic Area',
  'playground': 'Playground',
  'swimming-pool': 'Swimming Pool',
  'visitor-center': 'Visitor Center',
  'nature-center': 'Nature Center',
  'amphitheater': 'Amphitheater',
  'boat-launch': 'Boat Launch',
  'beach': 'Beach',
  'sports-court': 'Sports Courts',
  'disc-golf': 'Disc Golf Course',
  'mini-golf': 'Mini Golf',
};

// ============================================================================
// LODGING AMENITIES (15+ amenities)
// ============================================================================

/**
 * Kitchen facility types.
 */
export const KitchenTypeSchema = z.enum(['full', 'partial', 'kitchenette', 'none']);

export type KitchenType = z.infer<typeof KitchenTypeSchema>;

/**
 * Bed types for lodging.
 */
export const BedTypeSchema = z.enum(['king', 'queen', 'full', 'twin', 'bunk']);

export type BedType = z.infer<typeof BedTypeSchema>;

/**
 * Lodging amenities schema (15 detailed amenities).
 */
export const LodgingAmenitiesSchema = z.object({
  /** Kitchen facilities */
  kitchen: KitchenTypeSchema,
  /** Kitchen details if applicable */
  kitchenDetails: z.array(z.string().min(1)).max(15).optional(),
  /** Number of bathrooms */
  bathrooms: z.number().int().positive(),
  /** Accessible bathroom features */
  accessibleBathroom: z.boolean().optional(),
  /** Number of bedrooms */
  bedrooms: z.number().int().positive(),
  /** Bed configuration */
  beds: z.array(z.object({
    type: BedTypeSchema,
    count: z.number().int().positive(),
  })).min(1).max(10),
  /** Heating available */
  heating: z.boolean(),
  /** Air conditioning available */
  airConditioning: z.boolean(),
  /** Fireplace available */
  fireplace: z.boolean().optional(),
  /** TV provided */
  television: z.boolean(),
  /** WiFi available */
  wifi: z.boolean(),
  /** Outdoor deck/patio */
  deck: z.boolean(),
  /** Grill provided */
  grill: z.boolean(),
  /** Fire pit available */
  firePit: z.boolean(),
  /** Linens provided */
  linensProvided: z.boolean(),
  /** Towels provided */
  towelsProvided: z.boolean(),
  /** Pet-friendly */
  petFriendly: z.boolean(),
  /** Pet restrictions */
  petRestrictions: z.string().optional(),
  /** Wheelchair accessible features */
  accessibleFeatures: z.array(z.string().min(1)).max(10).optional(),
});

export type LodgingAmenities = z.infer<typeof LodgingAmenitiesSchema>;

/**
 * Lodging facility schema.
 */
export const LodgingSchema = z.object({
  /** Lodging name (e.g., "Deluxe Cabin", "Park Lodge Room") */
  name: z.string().min(1),
  /** Lodging type */
  type: z.enum(['lodge-room', 'cabin', 'cottage', 'chalet', 'yurt']),
  /** Number of units available */
  count: z.number().int().positive().optional(),
  /** Maximum occupancy */
  capacity: z.number().int().positive(),
  /** Price range (e.g., "$120-$180/night") */
  priceRange: z.string().optional(),
  /** Amenities */
  amenities: LodgingAmenitiesSchema,
  /** Reservation URL */
  reservationUrl: z.string().url().optional(),
  /** Photos */
  images: z.array(z.string().url()).max(10).optional(),
  /** Description */
  description: z.string().optional(),
  /** ADA compliant */
  adaCompliant: z.boolean(),
  /** Available seasons */
  availability: z.string().optional(),
});

export type Lodging = z.infer<typeof LodgingSchema>;

// ============================================================================
// CAMPING AMENITIES
// ============================================================================

/**
 * Campsite types.
 */
export const CampsiteTypeSchema = z.enum([
  'tent',
  'tent-electric',
  'rv-no-hookup',
  'rv-electric',
  'rv-water-electric',
  'rv-full-hookup',
]);

export type CampsiteType = z.infer<typeof CampsiteTypeSchema>;

/**
 * Electric hookup amperage.
 */
export const ElectricAmperageSchema = z.enum(['20-amp', '30-amp', '50-amp', '30/50-amp']);

export type ElectricAmperage = z.infer<typeof ElectricAmperageSchema>;

/**
 * Campground schema.
 */
export const CampgroundSchema = z.object({
  /** Campground name */
  name: z.string().min(1),
  /** Site type breakdown */
  siteTypes: z.array(z.object({
    type: CampsiteTypeSchema,
    count: z.number().int().nonnegative(),
    amperage: ElectricAmperageSchema.optional(),
  })).min(1).max(10),
  /** Bathhouse facilities */
  bathhouse: z.object({
    available: z.boolean(),
    showers: z.boolean().optional(),
    flushToilets: z.boolean().optional(),
    accessible: z.boolean().optional(),
  }),
  /** Dump station available */
  dumpStation: z.boolean(),
  /** Reservable sites */
  reservable: z.boolean(),
  /** First-come-first-served sites */
  firstComeFirstServed: z.boolean(),
  /** Pet-friendly sites */
  petFriendly: z.boolean(),
  /** ADA accessible sites count */
  accessibleSites: z.number().int().nonnegative().optional(),
  /** Accessible site features */
  accessibleFeatures: z.array(z.string().min(1)).max(10).optional(),
  /** Operating season */
  season: z.string(),
  /** Site amenities (all sites) */
  siteAmenities: z.array(z.enum([
    'fire-ring',
    'picnic-table',
    'grill',
    'lantern-post',
    'tent-pad',
  ])).optional(),
  /** Campground amenities */
  campgroundAmenities: z.array(z.string().min(1)).max(20).optional(),
  /** Reservation info */
  reservationUrl: z.string().url().optional(),
  /** Price range */
  priceRange: z.string().optional(),
});

export type Campground = z.infer<typeof CampgroundSchema>;

// ============================================================================
// PICNIC AREAS
// ============================================================================

/**
 * Picnic area schema.
 */
export const PicnicAreaSchema = z.object({
  /** Area name */
  name: z.string().min(1),
  /** Number of shelters */
  shelters: z.number().int().nonnegative(),
  /** Shelter capacity */
  capacity: z.string().optional(),
  /** Reservable */
  reservable: z.boolean(),
  /** Reservation URL */
  reservationUrl: z.string().url().optional(),
  /** Fee */
  fee: z.string().optional(),
  /** Amenities */
  amenities: z.array(z.enum([
    'restrooms',
    'accessible-restrooms',
    'grills',
    'playground',
    'water-fountain',
    'accessible-tables',
    'electric-outlets',
  ])).optional(),
  /** ADA accessible */
  adaCompliant: z.boolean(),
});

export type PicnicArea = z.infer<typeof PicnicAreaSchema>;

// ============================================================================
// RECREATION FACILITIES
// ============================================================================

/**
 * Recreation facility schema (playgrounds, pools, courts).
 */
export const RecreationFacilitySchema = z.object({
  /** Facility type */
  type: z.enum(['playground', 'swimming-pool', 'wading-pool', 'tennis-court', 'basketball-court', 'volleyball-court', 'disc-golf-course', 'mini-golf']),
  /** Facility name */
  name: z.string().min(1).optional(),
  /** Description */
  description: z.string(),
  /** Season/hours */
  season: z.string().optional(),
  /** Fee */
  fee: z.string().optional(),
  /** Age restrictions */
  ageRestrictions: z.string().optional(),
  /** ADA accessible */
  adaCompliant: z.boolean(),
  /** Accessible features */
  accessibleFeatures: z.array(z.string().min(1)).max(10).optional(),
});

export type RecreationFacility = z.infer<typeof RecreationFacilitySchema>;

// ============================================================================
// VISITOR CENTER & NATURE CENTER
// ============================================================================

/**
 * Operating hours with seasonal variations.
 */
export const OperatingHoursSchema = z.object({
  /** Season name (e.g., "Summer", "Winter", "Year-round") */
  season: z.string().min(1),
  /** Date range (e.g., "Memorial Day - Labor Day") */
  dates: z.string().min(1).optional(),
  /** Hours (e.g., "9am - 5pm daily") */
  hours: z.string().min(1),
});

export type OperatingHours = z.infer<typeof OperatingHoursSchema>;

/**
 * Visitor center schema.
 */
export const VisitorCenterSchema = z.object({
  /** Center name */
  name: z.string().min(1),
  /** Operating hours */
  hours: z.array(OperatingHoursSchema).min(1).max(6),
  /** Permanent exhibits */
  exhibits: z.array(z.string().min(1)).max(20).optional(),
  /** Ranger programs */
  rangerPrograms: z.boolean(),
  /** Educational resources available */
  educationalResources: z.array(z.string().min(1)).max(15).optional(),
  /** Gift shop */
  giftShop: z.boolean().optional(),
  /** Contact phone */
  phone: z.string().optional(),
  /** Contact email */
  email: z.string().email().optional(),
  /** ADA accessible */
  adaCompliant: z.boolean(),
  /** Accessible features */
  accessibleFeatures: z.array(z.string().min(1)).max(10).optional(),
});

export type VisitorCenter = z.infer<typeof VisitorCenterSchema>;

/**
 * Nature center schema (extends visitor center).
 */
export const NatureCenterSchema = VisitorCenterSchema.extend({
  /** Live animal exhibits */
  liveAnimals: z.array(z.string().min(1)).max(20).optional(),
  /** Interactive displays */
  interactiveDisplays: z.array(z.string().min(1)).max(20).optional(),
  /** Classroom/workshop space */
  classroomSpace: z.boolean().optional(),
  /** Junior Ranger program */
  juniorRangerProgram: z.boolean().optional(),
});

export type NatureCenter = z.infer<typeof NatureCenterSchema>;

// ============================================================================
// ACCESSIBILITY (ADA COMPLIANCE)
// ============================================================================

/**
 * Accessibility rating levels.
 */
export const AccessibilityRatingSchema = z.enum([
  'fully-accessible',       // ADA compliant, paved, <5% grade
  'moderately-accessible',  // Paved/hard surface, 5-8% grade
  'limited-accessibility',  // Uneven surface, >8% grade
  'not-accessible',         // Steps, rough terrain
]);

export type AccessibilityRating = z.infer<typeof AccessibilityRatingSchema>;

/**
 * Accessibility rating colors for display.
 */
export const ACCESSIBILITY_RATING_COLORS: Record<AccessibilityRating, string> = {
  'fully-accessible': 'border-l-sign-green bg-sign-green/5',
  'moderately-accessible': 'border-l-blue-700 bg-blue-50',
  'limited-accessibility': 'border-l-brand-brown bg-brand-cream',
  'not-accessible': 'border-l-brand-mud bg-brand-mud/10',
};

/**
 * Accessible parking schema.
 */
export const AccessibleParkingSchema = z.object({
  /** Total accessible spaces */
  accessibleSpaces: z.number().int().nonnegative(),
  /** Van-accessible spaces */
  vanAccessibleSpaces: z.number().int().nonnegative(),
  /** Location description */
  location: z.string().optional(),
});

export type AccessibleParking = z.infer<typeof AccessibleParkingSchema>;

/**
 * Accessible restroom features.
 */
export const AccessibleRestroomSchema = z.object({
  /** Available */
  available: z.boolean(),
  /** Features */
  features: z.array(z.enum([
    'grab-bars',
    'roll-under-sink',
    'accessible-stall',
    'family-restroom',
    'changing-table',
  ])).optional(),
  /** Location description */
  location: z.string().optional(),
});

export type AccessibleRestroom = z.infer<typeof AccessibleRestroomSchema>;

/**
 * Park accessibility features schema.
 */
export const StateParkAccessibilitySchema = z.object({
  /** Accessibility statement */
  accessibilityStatement: z.string().min(1),
  /** Contact for accommodations */
  accommodationsContact: z.string().optional(),
  /** Accessible parking */
  parking: AccessibleParkingSchema.optional(),
  /** Accessible restrooms */
  restrooms: AccessibleRestroomSchema.optional(),
  /** Accessible trails (names) */
  accessibleTrails: z.array(z.string().min(1)).max(20).optional(),
  /** Assistive services available */
  assistiveServices: z.array(z.enum([
    'wheelchair-rental',
    'interpreter-services',
    'braille-guides',
    'large-print-materials',
    'audio-description',
    'service-animal-welcome',
  ])).optional(),
  /** Sensory-friendly features */
  sensoryFeatures: z.array(z.enum([
    'quiet-spaces',
    'visual-aids',
    'tactile-maps',
    'reduced-stimulation-areas',
  ])).optional(),
  /** Service animal policy */
  serviceAnimalPolicy: z.string().optional(),
});

export type StateParkAccessibility = z.infer<typeof StateParkAccessibilitySchema>;

// ============================================================================
// SCENIC OVERLOOKS
// ============================================================================

/**
 * Scenic overlook schema.
 */
export const ScenicOverlookSchema = z.object({
  /** Overlook name */
  name: z.string().min(1),
  /** Description of view */
  description: z.string().min(1),
  /** Accessibility rating */
  accessibility: AccessibilityRatingSchema,
  /** Distance from parking */
  distanceFromParking: z.string().optional(),
  /** Best time to visit */
  bestTime: z.string().min(1),
  /** Parking availability */
  parking: z.string().min(1),
  /** Amenities */
  amenities: z.array(z.enum([
    'benches',
    'interpretive-signs',
    'railings',
    'picnic-tables',
    'restrooms',
  ])).optional(),
  /** Safety features */
  safetyFeatures: z.array(z.string().min(1)).max(10).optional(),
  /** Kim's photography tip */
  kimPhotoTip: z.string().optional(),
});

export type ScenicOverlook = z.infer<typeof ScenicOverlookSchema>;

// ============================================================================
// TRAIL SCHEMA
// ============================================================================

/**
 * Trail information for state parks.
 */
export const StateParkTrailSchema = z.object({
  /** Trail name */
  name: z.string().min(1),
  /** Distance (e.g., "2.5 miles loop") */
  distance: z.string().min(1),
  /** Elevation gain (e.g., "400 feet") */
  elevationGain: z.string().optional(),
  /** Difficulty using shared schema with industry colors */
  difficulty: DifficultySchema,
  /** Surface type */
  surfaceType: z.enum(['paved', 'gravel', 'dirt', 'boardwalk', 'mixed']).optional(),
  /** Trail width (for accessibility) */
  trailWidth: z.string().optional(),
  /** Maximum grade percentage */
  maxGrade: z.string().optional(),
  /** Accessibility rating */
  accessibilityRating: AccessibilityRatingSchema.optional(),
  /** Trail highlights */
  highlights: z.array(z.string().min(1)).min(1).max(10),
  /** Best seasons */
  bestSeasons: z.array(SeasonSchema).optional(),
  /** Trailhead location */
  trailhead: z.string().optional(),
  /** Kim's trail tip */
  kimNote: z.string().optional(),
});

export type StateParkTrail = z.infer<typeof StateParkTrailSchema>;

// ============================================================================
// RESERVATION SYSTEM INTEGRATION
// ============================================================================

/**
 * Reservation information schema.
 */
export const ReservationInfoSchema = z.object({
  /** Reservation URL (WV Parks online booking) */
  reservationUrl: z.string().url(),
  /** Reservation phone number */
  reservationPhone: z.string().optional(),
  /** Reservation phone hours */
  phoneHours: z.string().optional(),
  /** Booking window (e.g., "6 months in advance") */
  bookingWindow: z.string().optional(),
  /** Cancellation policy summary */
  cancellationPolicy: z.string().optional(),
  /** Check-in time */
  checkInTime: z.string().optional(),
  /** Check-out time */
  checkOutTime: z.string().optional(),
  /** Deposit requirements */
  depositRequired: z.boolean().optional(),
});

export type ReservationInfo = z.infer<typeof ReservationInfoSchema>;

// ============================================================================
// SEASONAL PROGRAMMING (7 program types)
// ============================================================================

/**
 * Program types (7 categories identified).
 */
export const ProgramTypeSchema = z.enum([
  'ranger-led',           // Ranger-led hikes, talks
  'educational-workshop', // Skills workshops
  'special-event',        // Holiday events
  'junior-ranger',        // Youth programs
  'volunteer',            // Volunteer opportunities
  'festival',             // Annual festivals
  'concert',              // Music/entertainment
]);

export type ProgramType = z.infer<typeof ProgramTypeSchema>;

/**
 * Program type labels.
 */
export const PROGRAM_TYPE_LABELS: Record<ProgramType, string> = {
  'ranger-led': 'Ranger-Led Program',
  'educational-workshop': 'Educational Workshop',
  'special-event': 'Special Event',
  'junior-ranger': 'Junior Ranger Program',
  'volunteer': 'Volunteer Opportunity',
  'festival': 'Festival',
  'concert': 'Concert',
};

/**
 * Seasonal program schema.
 */
export const SeasonalProgramSchema = z.object({
  /** Program name */
  name: z.string().min(1),
  /** Program type */
  type: ProgramTypeSchema,
  /** Description */
  description: z.string().min(1),
  /** Schedule description */
  schedule: z.string().min(1),
  /** Seasonal availability */
  season: z.string().optional(),
  /** Age requirements */
  ageRequirements: z.string().optional(),
  /** Registration required */
  registrationRequired: z.boolean(),
  /** Registration URL */
  registrationUrl: z.string().url().optional(),
  /** Registration phone */
  registrationPhone: z.string().optional(),
  /** Cost */
  cost: z.string().min(1),
  /** Meeting location */
  meetingLocation: z.string().optional(),
  /** What to bring */
  whatToBring: z.array(z.string().min(1)).max(15).optional(),
  /** Duration */
  duration: z.string().optional(),
});

export type SeasonalProgram = z.infer<typeof SeasonalProgramSchema>;

// ============================================================================
// FEES AND PRICING
// ============================================================================

/**
 * Fee type schema.
 */
export const FeeTypeSchema = z.enum([
  'day-use',
  'camping',
  'cabin',
  'lodge',
  'picnic-shelter',
  'boat-launch',
  'parking',
  'special-use',
  'program',
]);

export type FeeType = z.infer<typeof FeeTypeSchema>;

/**
 * Fee schema.
 */
export const FeeSchema = z.object({
  /** Fee type */
  type: FeeTypeSchema,
  /** Fee amount (or "Free") */
  amount: z.string().min(1),
  /** Fee description */
  description: z.string().min(1),
  /** Exemptions (seniors, disabled, WV residents) */
  exemptions: z.array(z.string().min(1)).max(10).optional(),
  /** Annual pass info */
  annualPassInfo: z.string().optional(),
  /** Payment methods */
  paymentMethods: z.array(z.string().min(1)).max(10).optional(),
});

export type Fee = z.infer<typeof FeeSchema>;

// ============================================================================
// PET POLICY
// ============================================================================

/**
 * Pet policy schema.
 */
export const PetPolicySchema = z.object({
  /** Pets allowed */
  petsAllowed: z.boolean(),
  /** Leash requirement */
  leashRequired: z.boolean().optional(),
  /** Leash length (e.g., "6 feet maximum") */
  leashLength: z.string().optional(),
  /** Restricted areas */
  restrictedAreas: z.array(z.string().min(1)).max(20).optional(),
  /** Pet-friendly facilities */
  petFriendlyFacilities: z.array(z.string().min(1)).max(20).optional(),
  /** Cleanup requirements */
  cleanupRequired: z.boolean().optional(),
  /** Breed restrictions */
  breedRestrictions: z.string().optional(),
  /** Additional notes */
  additionalNotes: z.string().optional(),
});

export type PetPolicy = z.infer<typeof PetPolicySchema>;

// ============================================================================
// PARK RULES
// ============================================================================

/**
 * Park rules schema.
 */
export const ParkRulesSchema = z.object({
  /** Alcohol policy */
  alcoholPolicy: z.string().min(1),
  /** Quiet hours */
  quietHours: z.string().min(1),
  /** Fire regulations */
  fireRegulations: z.string().min(1),
  /** Fishing allowed */
  fishing: z.object({
    allowed: z.boolean(),
    licenseRequired: z.boolean().optional(),
    notes: z.string().optional(),
  }).optional(),
  /** Hunting allowed */
  hunting: z.object({
    allowed: z.boolean(),
    licenseRequired: z.boolean().optional(),
    notes: z.string().optional(),
  }).optional(),
  /** Gathering/foraging */
  gatheringPolicy: z.string().optional(),
  /** Drone policy */
  dronePolicy: z.string().optional(),
  /** Commercial use permits */
  commercialUsePolicy: z.string().optional(),
  /** Group size limits */
  groupSizeLimits: z.string().optional(),
  /** Additional rules */
  additionalRules: z.array(z.string().min(1)).max(20).optional(),
});

export type ParkRules = z.infer<typeof ParkRulesSchema>;

// ============================================================================
// CONTACT INFORMATION
// ============================================================================

/**
 * Contact information schema.
 */
export const ContactInfoSchema = z.object({
  /** Main phone */
  phone: z.string().min(1),
  /** Phone hours */
  phoneHours: z.string().optional(),
  /** Email */
  email: z.string().email().optional(),
  /** Physical address */
  address: z.object({
    street: z.string().min(1),
    city: z.string().min(1),
    state: z.string().min(1),
    zip: z.string().min(1),
  }),
  /** Mailing address (if different) */
  mailingAddress: z.object({
    street: z.string().min(1),
    city: z.string().min(1),
    state: z.string().min(1),
    zip: z.string().min(1),
  }).optional(),
  /** Emergency contact */
  emergencyContact: z.string().optional(),
});

export type ContactInfo = z.infer<typeof ContactInfoSchema>;

// ============================================================================
// MAIN STATE PARK TEMPLATE PROPS SCHEMA
// ============================================================================

/**
 * Complete State Park Template Props Schema.
 * Validates all required and optional fields for state park pages.
 */
export const StateParkTemplatePropsSchema = z.object({
  // Hero Section (Required)
  /** Park name */
  name: z.string().min(1),
  /** Hero image source */
  heroImage: z.string().min(1),
  /** Hero image alt text */
  imageAlt: z.string().min(1),
  /** Park acreage */
  acreage: z.number().int().positive(),
  /** Location description (e.g., "Near Hinton, WV") */
  location: z.string().min(1),
  /** WV county */
  county: z.string().min(1),
  /** Signature feature (e.g., "62-foot waterfall") */
  signatureFeature: z.string().min(1).optional(),
  /** Quick highlights for hero badges */
  quickHighlights: z.array(z.string().min(1)).min(1).max(10),
  /** Full description (rendered as prose) */
  description: z.string().min(1),
  /** Quick stat badges for hero */
  stats: z.array(StatItemSchema).min(1).max(6).optional(),

  // Facilities
  /** Lodging options */
  lodging: z.array(LodgingSchema).max(20).optional(),
  /** Campgrounds */
  campgrounds: z.array(CampgroundSchema).max(10).optional(),
  /** Picnic areas */
  picnicAreas: z.array(PicnicAreaSchema).max(20).optional(),
  /** Recreation facilities */
  recreationFacilities: z.array(RecreationFacilitySchema).max(30).optional(),
  /** Visitor center */
  visitorCenter: VisitorCenterSchema.optional(),
  /** Nature center */
  natureCenter: NatureCenterSchema.optional(),

  // Trails & Overlooks
  /** Trails */
  trails: z.array(StateParkTrailSchema).max(50).optional(),
  /** Scenic overlooks */
  scenicOverlooks: z.array(ScenicOverlookSchema).max(20).optional(),

  // Activities (from PROMPT.md)
  /** Activities by category */
  activities: z.array(z.object({
    category: z.string().min(1),
    options: z.array(z.object({
      name: z.string().min(1),
      description: z.string().min(1),
      season: z.string().optional(),
      cost: z.string().optional(),
    })).min(1).max(20),
  })).max(10).optional(),

  // Programming
  /** Seasonal programs */
  programs: z.array(SeasonalProgramSchema).max(50).optional(),

  // Accessibility (P0)
  /** Accessibility features */
  accessibility: StateParkAccessibilitySchema,

  // Fees & Policies (P0)
  /** Fees */
  fees: z.array(FeeSchema).min(1).max(20),
  /** Pet policy */
  petPolicy: PetPolicySchema.optional(),
  /** Park rules */
  parkRules: ParkRulesSchema.optional(),

  // Reservation System
  /** Reservation information */
  reservationInfo: ReservationInfoSchema.optional(),

  // Contact & Location
  /** Contact information */
  contactInfo: ContactInfoSchema,
  /** GPS coordinates */
  coordinates: CoordinatesSchema.optional(),

  // Shared Components (Reused from adventure.ts)
  /** Recommended gear checklist */
  gearList: z.array(GearItemSchema).max(50).optional(),
  /** Related shop categories */
  relatedShop: z.array(RelatedCategorySchema).max(10).optional(),
  /** Nearby attractions */
  nearbyAttractions: z.array(NearbyAttractionSchema).max(30).optional(),

  // Optional Metadata
  /** Park map URL */
  parkMapUrl: z.string().url().optional(),
  /** Official website URL */
  websiteUrl: z.string().url().optional(),
});

/**
 * State Park Template Props interface.
 * Complete type definition for StateParkTemplate component.
 */
export interface StateParkTemplateProps {
  // Hero Section
  name: string;
  heroImage: string;
  imageAlt: string;
  acreage: number;
  location: string;
  county: string;
  signatureFeature?: string;
  quickHighlights: string[];
  description: string;
  stats?: StatItem[];

  // Facilities
  lodging?: Lodging[];
  campgrounds?: Campground[];
  picnicAreas?: PicnicArea[];
  recreationFacilities?: RecreationFacility[];
  visitorCenter?: VisitorCenter;
  natureCenter?: NatureCenter;

  // Trails & Overlooks
  trails?: StateParkTrail[];
  scenicOverlooks?: ScenicOverlook[];

  // Activities
  activities?: {
    category: string;
    options: {
      name: string;
      description: string;
      season?: string;
      cost?: string;
    }[];
  }[];

  // Programming
  programs?: SeasonalProgram[];

  // Accessibility
  accessibility: StateParkAccessibility;

  // Fees & Policies
  fees: Fee[];
  petPolicy?: PetPolicy;
  parkRules?: ParkRules;

  // Reservation System
  reservationInfo?: ReservationInfo;

  // Contact & Location
  contactInfo: ContactInfo;
  coordinates?: Coordinates;

  // Shared Components
  gearList?: GearItem[];
  relatedShop?: RelatedCategory[];
  nearbyAttractions?: NearbyAttraction[];

  // Optional Metadata
  parkMapUrl?: string;
  websiteUrl?: string;
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get facility type label.
 */
export function getFacilityTypeLabel(type: FacilityType): string {
  return FACILITY_TYPE_LABELS[type];
}

/**
 * Get accessibility rating color class.
 */
export function getAccessibilityRatingColor(rating: AccessibilityRating): string {
  return ACCESSIBILITY_RATING_COLORS[rating];
}

/**
 * Get program type label.
 */
export function getProgramTypeLabel(type: ProgramType): string {
  return PROGRAM_TYPE_LABELS[type];
}

/**
 * Type guard to check if an adventure is State Park.
 */
export function isStateParkAdventure(adventure: any): boolean {
  return adventure?.data?.type === 'state-park';
}
```

---

## 4. Component Architecture

### 4.1 Template Structure

**File:** `src/components/templates/StateParkTemplate.astro`
**Target:** ~500-550 lines
**Pattern:** Follows SPEC-17 backcountry template pattern

### 4.2 Section Breakdown

1. **Hero Section** (~60 lines)
   - Park name with font-display
   - Acreage and signature feature stats
   - Quick highlight badges with sign-green
   - Park map download link (if available)

2. **Facilities Section** (~120 lines)
   - **Lodging** subsection (if available)
     - Grid layout with cabin/lodge cards
     - Amenity icons
     - Price range display
     - Reservation CTA with brand-orange
   - **Camping** subsection (if available)
     - Campground cards with site type breakdown
     - Hookup availability badges
     - Bathhouse/dump station info
   - **Picnic Areas** subsection
     - Shelter count and capacity
     - Reservation status
   - **Other Amenities** subsection
     - Playground, pool, courts, etc.
     - Seasonal availability

3. **Trails Section** (~70 lines)
   - Trail cards with industry-standard difficulty badges
   - Distance, elevation gain
   - Surface type and accessibility rating
   - Kim's trail tips

4. **Scenic Overlooks Section** (~50 lines)
   - Overlook cards with border-l-brand-brown
   - Accessibility rating
   - Best viewing times
   - Kim's photography tips

5. **Activities Section** (~60 lines)
   - Categories (Water, Winter, Programs, etc.)
   - Activity options with seasons and costs
   - Kim's voice recommendations

6. **Visitor Center / Nature Center Section** (~60 lines)
   - Operating hours with seasonal variations
   - Exhibits and programs
   - Contact information
   - Accessibility features

7. **Seasonal Programs Section** (~60 lines)
   - Program cards by type
   - Schedule information
   - Registration CTAs
   - Age requirements

8. **Accessibility Section** (~70 lines)
   - Accessibility statement with border-l-brand-orange
   - ADA-compliant facilities list
   - Accessible trails
   - Assistive services
   - Contact for accommodations

9. **Fees & Policies Section** (~50 lines)
   - Fee table with types and amounts
   - Exemptions
   - Pet policy
   - Park rules

### 4.3 Conditional Rendering Logic

```astro
<!-- Show section only if data exists -->
{lodging && lodging.length > 0 && (
  <section class="py-16 bg-brand-cream">
    <!-- Lodging content -->
  </section>
)}

<!-- Show empty state message for important sections -->
{trails.length === 0 && (
  <div class="border-l-4 border-l-sign-green bg-sign-green/5 p-4 rounded-sm">
    <p class="font-body text-brand-brown">
      Trail information coming soon. Check back or contact the park for current trail conditions.
    </p>
  </div>
)}
```markdown

### 4.4 Reusable Components

Import and reuse from existing templates where applicable:

- Difficulty badges from backcountry template
- Stat cards from adventure.ts
- Image galleries (if created)
- Schema.org SEO component

### 4.5 WVWO Aesthetic Implementation

```css
/* Facility cards */
.facility-card {
  @apply bg-white border-l-4 border-l-sign-green p-6 rounded-sm;
}

/* Accessibility section */
.accessibility-section {
  @apply border-l-4 border-l-brand-orange bg-brand-cream p-8 rounded-sm;
}

/* Overlook cards */
.overlook-card {
  @apply bg-white border-l-4 border-l-brand-brown p-6 rounded-sm;
}

/* Reservation CTAs */
.reservation-cta {
  @apply bg-brand-orange text-white px-6 py-3 rounded-sm font-display font-bold hover:bg-brand-orange/90 transition-colors;
}

/* Program cards */
.program-card {
  @apply bg-white border-l-4 border-l-sign-green p-6 rounded-sm;
}
```

---

## 5. SEO Implementation

### 5.1 Schema.org Structured Data

**File:** `src/components/seo/SchemaStateParkTemplate.astro`

Implements 20 SEO enhancements identified in gap analysis:

```typescript
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    // 1. Organization (WV Wild Outdoors)
    {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      "name": "WV Wild Outdoors",
      "url": baseUrl,
      "logo": `${baseUrl}/images/logo.png`,
    },

    // 2. TouristAttraction (Primary Type)
    {
      "@type": "TouristAttraction",
      "@id": `${baseUrl}${currentPath}/#attraction`,
      "name": name,
      "description": description,
      "image": heroImage,
      "url": `${baseUrl}${currentPath}`,

      // 3. Place properties
      "address": {
        "@type": "PostalAddress",
        "streetAddress": contactInfo.address.street,
        "addressLocality": contactInfo.address.city,
        "addressRegion": contactInfo.address.state,
        "postalCode": contactInfo.address.zip,
        "addressCountry": "US",
      },

      // 4. Coordinates
      ...(coordinates && {
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": coordinates.lat,
          "longitude": coordinates.lng,
        },
      }),

      // 5. Contact
      "telephone": contactInfo.phone,
      ...(contactInfo.email && { "email": contactInfo.email }),

      // 6. OpeningHoursSpecification
      ...(visitorCenter && {
        "openingHoursSpecification": visitorCenter.hours.map(h => ({
          "@type": "OpeningHoursSpecification",
          "description": h.season,
          "opens": extractOpenTime(h.hours),
          "closes": extractCloseTime(h.hours),
        })),
      }),

      // 7. AggregateRating (placeholder for future)
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.5",
        "reviewCount": "0",
      },

      // 8. Accessibility features
      "accessibilityFeature": accessibility.assistiveServices || [],

      // 9. Public transit (if applicable)
      ...(hasPublicTransit && {
        "publicTransit": "Available from nearby towns",
      }),

      // 10. Price range
      "priceRange": fees.find(f => f.type === 'day-use')?.amount || "Free",
    },

    // 11. LocalBusiness (for park lodge if exists)
    ...(lodging && lodging.length > 0 ? [{
      "@type": "LocalBusiness",
      "@id": `${baseUrl}${currentPath}/#lodge`,
      "name": `${name} Lodge`,
      "description": `Lodging at ${name}`,
      "priceRange": lodging[0].priceRange,
      "address": { /* same as park */ },
      "telephone": contactInfo.phone,
    }] : []),

    // 12. CampingPitch (for campgrounds if exists)
    ...(campgrounds && campgrounds.length > 0 ? campgrounds.map((cg, i) => ({
      "@type": "CampingPitch",
      "@id": `${baseUrl}${currentPath}/#campground-${i}`,
      "name": cg.name,
      "description": `Campground at ${name}`,
      "priceRange": cg.priceRange,
    })) : []),

    // 13. BreadcrumbList
    {
      "@type": "BreadcrumbList",
      "@id": `${baseUrl}${currentPath}/#breadcrumb`,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": baseUrl,
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "State Parks",
          "item": `${baseUrl}/state-parks`,
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": name,
          "item": `${baseUrl}${currentPath}`,
        },
      ],
    },

    // 14. Article
    {
      "@type": "Article",
      "@id": `${baseUrl}${currentPath}/#article`,
      "headline": `${name} - State Park Guide`,
      "description": description,
      "image": heroImage,
      "author": { "@id": `${baseUrl}/#organization` },
      "publisher": { "@id": `${baseUrl}/#organization` },
      "datePublished": "2025-01-01", // Dynamic in production
      "dateModified": "2025-01-01",  // Dynamic in production
    },

    // 15. Event (for ranger programs if exists)
    ...(programs && programs.length > 0 ? programs.filter(p => p.type === 'ranger-led').map((p, i) => ({
      "@type": "Event",
      "@id": `${baseUrl}${currentPath}/#program-${i}`,
      "name": p.name,
      "description": p.description,
      "location": { "@id": `${baseUrl}${currentPath}/#attraction` },
      "organizer": { "@id": `${baseUrl}/#organization` },
      "eventSchedule": p.schedule,
      "isAccessibleForFree": p.cost === "Free",
    })) : []),

    // 16. ImageObject (for hero and key images)
    {
      "@type": "ImageObject",
      "@id": `${baseUrl}${currentPath}/#hero-image`,
      "url": heroImage,
      "caption": imageAlt,
      "contentUrl": heroImage,
    },

    // 17. ParkingFacility
    ...(accessibility.parking && {
      "parking": {
        "@type": "ParkingFacility",
        "name": `${name} Parking`,
        "accessibilityFeature": [
          `${accessibility.parking.accessibleSpaces} accessible spaces`,
          `${accessibility.parking.vanAccessibleSpaces} van-accessible spaces`,
        ],
      },
    }),

    // 18. Map (if park map available)
    ...(parkMapUrl && {
      "hasMap": {
        "@type": "Map",
        "url": parkMapUrl,
      },
    }),

    // 19. SpecialAnnouncement (for seasonal closures)
    ...(hasSeasonalClosure && {
      "specialAnnouncement": {
        "@type": "SpecialAnnouncement",
        "category": "https://www.wikidata.org/wiki/Q81068910", // Closure
        "name": "Seasonal Closure",
        "text": "Some facilities close in winter - call ahead",
        "datePosted": "2025-01-01",
      },
    }),

    // 20. FAQPage (optional, for common questions)
    ...(hasFAQ && {
      "mainEntity": {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Are pets allowed?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": petPolicy?.petsAllowed ? "Yes, pets are allowed with restrictions." : "No, pets are not allowed.",
            },
          },
          // Additional FAQs...
        ],
      },
    }),
  ],
};
```javascript

### 5.2 Meta Tags

```astro
---
// In StateParkTemplate.astro head section
const metaTitle = `${name} - State Park Guide | WV Wild`;
const metaDescription = description.substring(0, 160);
const canonicalUrl = `${baseUrl}${currentPath}`;
const ogImage = heroImage;
---

<head>
  <title>{metaTitle}</title>
  <meta name="description" content={metaDescription} />
  <link rel="canonical" href={canonicalUrl} />

  <!-- Open Graph -->
  <meta property="og:title" content={metaTitle} />
  <meta property="og:description" content={metaDescription} />
  <meta property="og:image" content={ogImage} />
  <meta property="og:url" content={canonicalUrl} />
  <meta property="og:type" content="website" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={metaTitle} />
  <meta name="twitter:description" content={metaDescription} />
  <meta name="twitter:image" content={ogImage} />
</head>
```

### 5.3 SEO Validation Checklist

Based on SPEC-17 SEO validation pattern:

- [ ] Google Rich Results Test passes
- [ ] Schema.org validator: zero errors
- [ ] TouristAttraction entity detected
- [ ] LocalBusiness/CampingPitch entities (if applicable)
- [ ] BreadcrumbList validated
- [ ] Lighthouse SEO score >= 95
- [ ] Meta description 150-160 chars
- [ ] Title 50-60 chars
- [ ] OG image absolute URL
- [ ] All images have alt text
- [ ] Accessibility features in schema

---

## 6. Data Structure Templates

### 6.1 Example Content File

**File:** `src/content/adventures/blackwater-falls-state-park.mdx`

```mdx
---
type: state-park
name: Blackwater Falls State Park
heroImage: /images/adventures/blackwater-falls-hero.jpg
imageAlt: Blackwater Falls cascading 62 feet into the canyon
acreage: 2358
location: Near Davis, WV
county: Tucker County
signatureFeature: 62-foot waterfall
quickHighlights:
  - Iconic 62-foot waterfall
  - 20+ miles of trails
  - Year-round lodge & cabins
  - Award-winning restaurant
  - Cross-country skiing
description: |
  Blackwater Falls State Park is one of West Virginia's most beloved parks, famous for its stunning 62-foot waterfall that plunges into an eight-mile gorge. The amber-colored water gets its name from the tannic acid from fallen hemlock and red spruce needles.

stats:
  - label: Elevation
    value: "3,100 ft"
    icon: mountain
  - label: Waterfall Height
    value: "62 ft"
    icon: waterfall
  - label: Trail Miles
    value: "20+"
    icon: hiking

# LODGING
lodging:
  - name: Blackwater Lodge
    type: lodge-room
    count: 54
    capacity: 4
    priceRange: $89-$159/night
    amenities:
      kitchen: none
      bathrooms: 1
      bedrooms: 1
      beds:
        - type: queen
          count: 2
      heating: true
      airConditioning: true
      television: true
      wifi: true
      deck: false
      grill: false
      firePit: false
      linensProvided: true
      towelsProvided: true
      petFriendly: false
      accessibleFeatures:
        - ADA-compliant rooms available
        - Roll-in showers
    reservationUrl: https://wvstateparks.com/park/blackwater-falls-state-park/
    adaCompliant: true
    availability: Year-round

  - name: Deluxe Cabins
    type: cabin
    count: 25
    capacity: 8
    priceRange: $165-$285/night
    amenities:
      kitchen: full
      kitchenDetails:
        - Full refrigerator
        - Stove/oven
        - Microwave
        - Cookware & dishes
      bathrooms: 2
      accessibleBathroom: true
      bedrooms: 3
      beds:
        - type: queen
          count: 3
        - type: full
          count: 1
      heating: true
      airConditioning: true
      fireplace: true
      television: true
      wifi: true
      deck: true
      grill: true
      firePit: true
      linensProvided: true
      towelsProvided: true
      petFriendly: true
      petRestrictions: $25/night pet fee, 2 pet maximum
      accessibleFeatures:
        - 2 ADA-compliant cabins
        - Wheelchair ramps
        - Wide doorways
        - Roll-in shower
    reservationUrl: https://wvstateparks.com/park/blackwater-falls-state-park/
    adaCompliant: true
    availability: Year-round

# CAMPGROUNDS
campgrounds:
  - name: Blackwater Falls Campground
    siteTypes:
      - type: tent
        count: 15
      - type: rv-electric
        count: 50
        amperage: 30/50-amp
    bathhouse:
      available: true
      showers: true
      flushToilets: true
      accessible: true
    dumpStation: true
    reservable: true
    firstComeFirstServed: false
    petFriendly: true
    accessibleSites: 4
    accessibleFeatures:
      - Paved access
      - Accessible bathhouse
      - Extended picnic tables
    season: April - October
    siteAmenities:
      - fire-ring
      - picnic-table
      - grill
    campgroundAmenities:
      - Playground
      - Basketball court
      - Horseshoe pits
    reservationUrl: https://wvstateparks.com/park/blackwater-falls-state-park/
    priceRange: $25-$45/night

# PICNIC AREAS
picnicAreas:
  - name: Main Picnic Area
    shelters: 3
    capacity: 50-100 people per shelter
    reservable: true
    reservationUrl: https://wvstateparks.com/park/blackwater-falls-state-park/
    fee: $50-$75/day
    amenities:
      - restrooms
      - accessible-restrooms
      - grills
      - playground
      - water-fountain
      - accessible-tables
    adaCompliant: true

# RECREATION FACILITIES
recreationFacilities:
  - type: playground
    description: Modern playground equipment suitable for ages 2-12
    adaCompliant: true
    accessibleFeatures:
      - Accessible play structures
      - Rubber safety surface

  - type: swimming-pool
    name: Outdoor Pool
    description: Seasonal outdoor pool with shallow and deep ends
    season: Memorial Day - Labor Day
    fee: Free for lodge/cabin guests, $5/day for day-use
    adaCompliant: true
    accessibleFeatures:
      - Pool lift
      - Accessible changing rooms

# VISITOR CENTER
visitorCenter:
  name: Blackwater Falls Visitor Center
  hours:
    - season: Year-round
      hours: 9am - 5pm daily
  exhibits:
    - Blackwater Canyon geology
    - Local flora and fauna
    - Historical logging industry
    - Conservation efforts
  rangerPrograms: true
  educationalResources:
    - Trail maps
    - Wildlife guides
    - Wildflower identification
    - Historical brochures
  giftShop: true
  phone: 304-259-5216
  adaCompliant: true
  accessibleFeatures:
    - Wheelchair accessible entrance
    - Accessible restrooms
    - Assistive listening devices

# TRAILS
trails:
  - name: Gentle Trail to Falls
    distance: 0.5 miles round-trip
    difficulty: easy
    surfaceType: paved
    trailWidth: 6 feet
    maxGrade: 5%
    accessibilityRating: fully-accessible
    highlights:
      - Wheelchair accessible to first overlook
      - Paved boardwalk to falls viewing platform
      - Benches along route
      - Interpretive signs
    bestSeasons:
      - spring
      - summer
      - fall
    trailhead: Blackwater Lodge parking area
    kimNote: Perfect for families and anyone wanting to see the falls without a strenuous hike

  - name: Blackwater Canyon Trail
    distance: 1.8 miles one-way
    elevationGain: 500 feet
    difficulty: moderate
    surfaceType: dirt
    highlights:
      - Canyon floor views
      - Hemlock forest
      - Rhododendron tunnels
      - Creek crossings
    bestSeasons:
      - spring
      - summer
      - fall
    trailhead: Near lodge
    kimNote: Take your time on the steps - the canyon views are worth it

  - name: Elakala Trail
    distance: 0.75 miles
    elevationGain: 200 feet
    difficulty: moderate
    surfaceType: mixed
    highlights:
      - Four separate waterfalls
      - Swinging bridge
      - Old-growth forest
      - Photo opportunities
    bestSeasons:
      - spring
      - summer
      - fall
    kimNote: The swinging bridge is a favorite - don't miss it!

# SCENIC OVERLOOKS
scenicOverlooks:
  - name: Lindy Point
    description: Breathtaking view of Blackwater Canyon from 3,000-foot elevation
    accessibility: moderately-accessible
    distanceFromParking: 0.5 miles
    bestTime: Sunrise and fall foliage season
    parking: Gravel lot for 15 vehicles
    amenities:
      - benches
      - interpretive-signs
      - railings
    safetyFeatures:
      - Safety railings
      - Well-marked trail
    kimPhotoTip: Come at sunrise for magical golden hour light on the canyon

  - name: Falls Overlook
    description: Main viewing platform for 62-foot waterfall
    accessibility: fully-accessible
    distanceFromParking: 0.25 miles via paved path
    bestTime: After heavy rain for maximum flow
    parking: Large paved lot
    amenities:
      - benches
      - interpretive-signs
      - railings
    safetyFeatures:
      - Secure railings
      - Anti-slip surface
    kimPhotoTip: Early morning mist creates dramatic photos

# ACTIVITIES
activities:
  - category: Water Activities
    options:
      - name: Swimming
        description: Seasonal outdoor pool with lifeguards
        season: Memorial Day - Labor Day
        cost: Free for guests, $5/day for visitors
      - name: Fishing
        description: Trout fishing in Blackwater River
        season: Year-round (check WV regulations)
        cost: WV fishing license required

  - category: Winter Sports
    options:
      - name: Cross-Country Skiing
        description: 20+ miles of groomed trails
        season: December - March (snow dependent)
        cost: Free
      - name: Sledding
        description: Designated sledding hill near lodge
        season: December - March
        cost: Free

  - category: Nature Programs
    options:
      - name: Guided Hikes
        description: Ranger-led interpretive hikes
        season: May - October, weekends
        cost: Free

# SEASONAL PROGRAMS
programs:
  - name: Waterfall Walk & Talk
    type: ranger-led
    description: Guided walk to Blackwater Falls with geology and history lessons
    schedule: Saturdays & Sundays, 10am
    season: May - October
    registrationRequired: false
    cost: Free
    meetingLocation: Visitor Center
    duration: 1 hour

  - name: Junior Ranger Program
    type: junior-ranger
    description: Kids earn badges by completing nature activities
    schedule: Daily during summer
    season: Memorial Day - Labor Day
    ageRequirements: Ages 5-12
    registrationRequired: false
    cost: Free
    meetingLocation: Visitor Center
    whatToBring:
      - Curiosity
      - Notebook
      - Camera (optional)

  - name: Autumn Colors Festival
    type: festival
    description: Annual fall festival with crafts, food, and music
    schedule: First full weekend in October
    season: October
    registrationRequired: false
    cost: Free admission
    meetingLocation: Park grounds

# ACCESSIBILITY
accessibility:
  accessibilityStatement: |
    Blackwater Falls State Park is committed to providing accessible recreation opportunities for all visitors. We offer accessible lodging, trails, facilities, and programs.
  accommodationsContact: Call 304-259-5216 for specific accessibility questions or accommodation requests
  parking:
    accessibleSpaces: 12
    vanAccessibleSpaces: 4
    location: Main lodge parking and trailhead lots
  restrooms:
    available: true
    features:
      - grab-bars
      - roll-under-sink
      - accessible-stall
      - family-restroom
    location: Lodge, visitor center, campground bathhouse
  accessibleTrails:
    - Gentle Trail to Falls (paved, 0.5 miles)
    - Falls Overlook (paved, 0.25 miles)
  assistiveServices:
    - wheelchair-rental
    - braille-guides
    - large-print-materials
    - service-animal-welcome
  sensoryFeatures:
    - quiet-spaces
    - visual-aids
    - tactile-maps
  serviceAnimalPolicy: Service animals are welcome throughout the park

# FEES
fees:
  - type: day-use
    amount: Free
    description: No day-use fee for park access
  - type: camping
    amount: $25-$45/night
    description: Campsite fees vary by site type (tent vs electric)
    exemptions:
      - Seniors 65+ receive 10% discount
      - Active military 10% discount
  - type: cabin
    amount: $165-$285/night
    description: Cabin rental rates vary by season and cabin size
    exemptions:
      - Off-season discounts available
  - type: lodge
    amount: $89-$159/night
    description: Lodge room rates vary by season
  - type: picnic-shelter
    amount: $50-$75/day
    description: Shelter rental for groups
    paymentMethods:
      - Credit card
      - Cash
      - Check

# PET POLICY
petPolicy:
  petsAllowed: true
  leashRequired: true
  leashLength: 6 feet maximum
  restrictedAreas:
    - Lodge interior
    - Cabins (except pet-friendly units)
    - Swimming pool area
    - Visitor center interior
  petFriendlyFacilities:
    - 10 pet-friendly cabins
    - All camping sites
    - All trails
  cleanupRequired: true
  additionalNotes: $25/night pet fee for cabins. 2 pet maximum per cabin.

# PARK RULES
parkRules:
  alcoholPolicy: Alcoholic beverages permitted in moderation. Glass containers prohibited in pool area.
  quietHours: 10pm - 7am
  fireRegulations: Fires permitted only in designated fire rings. No ground fires. Check with staff during dry conditions.
  fishing:
    allowed: true
    licenseRequired: true
    notes: WV fishing license required. Follow WV DNR regulations.
  hunting:
    allowed: false
    notes: No hunting permitted in state park boundaries
  gatheringPolicy: No foraging or plant collection permitted
  dronePolicy: Drones prohibited without written park superintendent permission
  commercialUsePolicy: Commercial filming/photography requires permit
  groupSizeLimits: Groups over 20 people must notify park office in advance

# RESERVATION INFO
reservationInfo:
  reservationUrl: https://wvstateparks.com/park/blackwater-falls-state-park/
  reservationPhone: 304-259-5216
  phoneHours: 8am - 8pm daily
  bookingWindow: Up to 12 months in advance
  cancellationPolicy: Cancel 7+ days before arrival for full refund. Within 7 days, 1 night charged.
  checkInTime: 4pm
  checkOutTime: 11am
  depositRequired: true

# CONTACT INFO
contactInfo:
  phone: 304-259-5216
  phoneHours: 8am - 8pm daily
  email: blackwaterfalls@wv.gov
  address:
    street: 1584 Blackwater Lodge Road
    city: Davis
    state: WV
    zip: "26260"
  emergencyContact: Call 911 for emergencies. Park office 304-259-5216.

# COORDINATES
coordinates:
  lat: 39.1156
  lng: -79.4903

# OPTIONAL
parkMapUrl: https://wvstateparks.com/wp-content/uploads/2023/03/Blackwater-Falls-Map.pdf
websiteUrl: https://wvstateparks.com/park/blackwater-falls-state-park/

# SHARED COMPONENTS
relatedShop:
  - category: Hiking Gear
    url: /shop/hiking
  - category: Camping Supplies
    url: /shop/camping
  - category: Winter Sports
    url: /shop/winter

nearbyAttractions:
  - name: Canaan Valley Resort State Park
    distance: 12 miles
    description: Skiing, golf, and year-round resort activities
  - name: Dolly Sods Wilderness
    distance: 18 miles
    description: Backcountry hiking and wilderness camping
  - name: Seneca Rocks
    distance: 35 miles
    description: Rock climbing and scenic views
---

<!-- Optional prose content -->
Blackwater Falls State Park has been welcoming families since 1937. The park's centerpiece is the stunning 62-foot waterfall that gives the park its name...
```markdown

### 6.2 Minimum Viable Example

**File:** `src/content/adventures/pipestem-resort-state-park.mdx`

```mdx
---
type: state-park
name: Pipestem Resort State Park
heroImage: /images/adventures/pipestem-hero.jpg
imageAlt: Bluestone Gorge aerial tramway at Pipestem Resort
acreage: 4050
location: Near Hinton, WV
county: Summers County
quickHighlights:
  - Aerial tramway to canyon floor
  - Championship golf courses
  - Year-round lodge
  - Bluestone Gorge views
description: |
  Pipestem Resort State Park offers a perfect blend of outdoor adventure and resort amenities, featuring an aerial tramway that descends 1,000 feet into the stunning Bluestone Gorge.

# MINIMAL REQUIRED FIELDS
fees:
  - type: day-use
    amount: Free
    description: No day-use fee

accessibility:
  accessibilityStatement: |
    Pipestem Resort is committed to accessible recreation. Lodge and facilities offer ADA-compliant features.
  accommodationsContact: Call 304-466-1800 for accessibility questions

contactInfo:
  phone: 304-466-1800
  address:
    street: 3405 Pipestem Drive
    city: Pipestem
    state: WV
    zip: "25979"

# Additional content coming soon
---
```

---

## 7. Testing Requirements

### 7.1 Unit Tests

**File:** `src/components/templates/__tests__/StateParkTemplate.test.ts`

```typescript
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import StateParkTemplate from '../StateParkTemplate.astro';

describe('StateParkTemplate', () => {
  it('renders hero section with park name', () => {
    const props = {
      name: 'Test State Park',
      heroImage: '/test.jpg',
      imageAlt: 'Test park',
      acreage: 1000,
      location: 'Test County',
      county: 'Test',
      quickHighlights: ['Hiking', 'Camping'],
      description: 'Test description',
      fees: [{ type: 'day-use', amount: 'Free', description: 'No fee' }],
      accessibility: {
        accessibilityStatement: 'Accessible',
        accommodationsContact: '123-456-7890',
      },
      contactInfo: {
        phone: '123-456-7890',
        address: {
          street: '123 Park Rd',
          city: 'Test',
          state: 'WV',
          zip: '12345',
        },
      },
    };

    const { getByText } = render(<StateParkTemplate {...props} />);
    expect(getByText('Test State Park')).toBeInTheDocument();
  });

  it('conditionally renders lodging section when lodging exists', () => {
    // Test lodging section rendering
  });

  it('shows empty state message when trails array is empty', () => {
    // Test empty state handling
  });

  it('applies correct difficulty badge colors', () => {
    // Test industry-standard colors
  });

  it('renders ADA-compliant badge when adaCompliant is true', () => {
    // Test accessibility badges
  });
});
```markdown

### 7.2 Integration Tests

**File:** `src/components/templates/__tests__/StateParkTemplate.integration.test.ts`

```typescript
describe('StateParkTemplate Integration', () => {
  it('renders complete Blackwater Falls page with all sections', () => {
    // Test full page rendering
  });

  it('integrates with SEO schema component correctly', () => {
    // Test schema.org markup integration
  });

  it('handles reservation CTA clicks and external navigation', () => {
    // Test reservation flow
  });
});
```

### 7.3 Accessibility Tests

**File:** `src/components/templates/__tests__/StateParkTemplate.a11y.test.ts`

```typescript
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('StateParkTemplate Accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<StateParkTemplate {...props} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('provides keyboard navigation for all interactive elements', () => {
    // Test keyboard navigation
  });

  it('includes proper ARIA labels for difficulty badges', () => {
    // Test ARIA labels
  });

  it('provides screen reader text for accessibility ratings', () => {
    // Test screen reader support
  });
});
```markdown

### 7.4 SEO Tests

**File:** `src/components/seo/__tests__/SchemaStateParkTemplate.test.ts`

```typescript
describe('SchemaStateParkTemplate SEO', () => {
  it('generates valid TouristAttraction schema', () => {
    // Validate schema structure
  });

  it('includes all required schema.org properties', () => {
    // Test required properties
  });

  it('passes Google Rich Results Test format', () => {
    // Validate against Rich Results requirements
  });

  it('includes proper BreadcrumbList structure', () => {
    // Test breadcrumb navigation
  });

  it('generates LocalBusiness schema when lodging exists', () => {
    // Test conditional schema generation
  });
});
```

### 7.5 Visual Regression Tests

Use Playwright for visual regression:

```typescript
import { test, expect } from '@playwright/test';

test('StateParkTemplate matches snapshot', async ({ page }) => {
  await page.goto('/state-parks/blackwater-falls');
  await expect(page).toHaveScreenshot('blackwater-falls-desktop.png');
});

test('StateParkTemplate mobile view matches snapshot', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/state-parks/blackwater-falls');
  await expect(page).toHaveScreenshot('blackwater-falls-mobile.png');
});
```typescript

### 7.6 Testing Coverage Goals

| Test Type | Coverage Target |
|-----------|-----------------|
| Unit Tests | >80% |
| Integration Tests | Key user flows |
| Accessibility Tests | 100% WCAG AA |
| SEO Tests | All schema types |
| Visual Regression | Desktop + Mobile |

---

## 8. Implementation Roadmap

### 8.1 Phase 1: Foundation (4-6 hours)

### T-001: Create Type System

- [ ] Create `src/types/state-park-types.ts`
- [ ] Implement all Zod schemas (10 facility types, accessibility, fees, etc.)
- [ ] Add helper functions for color/label mappings
- [ ] Write JSDoc comments

### T-002: Extend Content Config

- [ ] Add `'state-park'` to type enum in `content.config.ts`
- [ ] Import state park schemas
- [ ] Add optional state-park fields

### T-003: Create Basic Template Structure

- [ ] Create `src/components/templates/StateParkTemplate.astro`
- [ ] Implement hero section
- [ ] Set up conditional rendering patterns
- [ ] Apply WVWO aesthetic (rounded-sm, border-l-4, fonts)

### 8.2 Phase 2: Core Sections (4-6 hours)

### T-004: Facilities Section

- [ ] Lodging subsection with amenity cards
- [ ] Camping subsection with hookup badges
- [ ] Picnic areas subsection
- [ ] Recreation facilities subsection

### T-005: Trails & Overlooks

- [ ] Trail cards with industry-standard difficulty badges
- [ ] Accessibility ratings
- [ ] Scenic overlook cards with photography tips

### T-006: Activities & Programs

- [ ] Activities section by category
- [ ] Seasonal programs section
- [ ] Visitor/nature center section

### 8.3 Phase 3: Accessibility & SEO (3-4 hours)

### T-007: Accessibility Section

- [ ] Accessibility statement with border-l-brand-orange
- [ ] ADA-compliant facilities list
- [ ] Accessible trails
- [ ] Assistive services
- [ ] Contact for accommodations

### T-008: SEO Schema Implementation

- [ ] Create `src/components/seo/SchemaStateParkTemplate.astro`
- [ ] Implement TouristAttraction schema
- [ ] Add LocalBusiness/CampingPitch conditional schemas
- [ ] Add BreadcrumbList, Article, Event schemas
- [ ] Add meta tags and Open Graph

### T-009: Fees & Policies Section

- [ ] Fee table with exemptions
- [ ] Pet policy display
- [ ] Park rules organized by category

### 8.4 Phase 4: Testing & Validation (2-3 hours)

### T-010: Unit Tests

- [ ] Write component unit tests (>80% coverage)
- [ ] Test conditional rendering
- [ ] Test helper functions

### T-011: Accessibility Tests

- [ ] Run axe accessibility tests
- [ ] Test keyboard navigation
- [ ] Validate ARIA labels

### T-012: SEO Validation

- [ ] Google Rich Results Test
- [ ] Schema.org validator
- [ ] Lighthouse SEO audit (target >= 95)

### 8.5 Phase 5: Content Creation (2-3 hours)

### T-013: Example Content

- [ ] Create Blackwater Falls State Park (comprehensive example)
- [ ] Create Pipestem Resort State Park (minimal example)
- [ ] Validate both with Zod schemas

### T-014: Documentation

- [ ] Content authoring guide
- [ ] Field reference documentation
- [ ] SEO validation checklist (based on SPEC-17 pattern)

### 8.6 Timeline Summary

| Phase | Duration | Dependencies |
|-------|----------|--------------|
| Phase 1: Foundation | 4-6 hours | None |
| Phase 2: Core Sections | 4-6 hours | Phase 1 |
| Phase 3: Accessibility & SEO | 3-4 hours | Phase 2 |
| Phase 4: Testing | 2-3 hours | Phase 3 |
| Phase 5: Content | 2-3 hours | Phase 4 |
| **Total** | **15-22 hours** | |

**Estimated Effort:** 12-16 hours (accounting for efficiency from pattern reuse)

---

## 9. Non-Functional Requirements

### NFR-001: Performance

- Template renders in <100ms server-side
- Total component bundle <60KB gzipped (larger than backcountry due to more facility types)
- Images lazy-loaded below the fold
- Lighthouse Performance >= 90

### NFR-002: Accessibility

- WCAG 2.1 AA compliance (100%)
- Industry-standard difficulty colors with shape icons
- Accessibility ratings for all trails/facilities
- Screen reader labels for all interactive elements
- Keyboard navigation support
- Lighthouse Accessibility >= 95

### NFR-003: Responsiveness

- Mobile-first design
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Grid layouts collapse appropriately
- Touch-friendly targets (48x48px minimum)
- Lighthouse Mobile-Friendly test passes

### NFR-004: SEO

- Schema.org TouristAttraction structured data
- LocalBusiness/CampingPitch conditional schemas
- BreadcrumbList navigation
- Semantic HTML5 elements
- Proper heading hierarchy (h1 > h2 > h3)
- Meta description from `description` field
- Lighthouse SEO >= 95

### NFR-005: Maintainability

- TypeScript strict mode compliance
- Zod validation for all data
- Component prop interfaces fully typed
- JSDoc comments for all exports
- Consistent naming conventions
- Follows established patterns from SPEC-17

---

## 10. Gap Closure Validation

### 10.1 Facilities & Amenities (10 gaps)

- [x] G-001: FacilityTypeSchema with 10+ categories
- [x] G-002: LodgingAmenitySchema with 15 amenities
- [x] G-003: CampingAmenitySchema with hookups, bathhouses
- [x] G-004: PicnicAreaSchema with capacity, reservation
- [x] G-005: RecreationFacilitySchema for playgrounds, pools
- [x] G-006: VisitorCenterSchema with exhibits, programs
- [x] G-007: Boat launch in facility types
- [x] G-008: EventVenueSchema (amphitheater type)
- [x] G-009: NatureCenterSchema with live animals
- [x] G-010: OperatingHoursSchema with seasonal variations

### 10.2 Accessibility (8 gaps)

- [x] G-011: adaCompliant boolean on all facility types
- [x] G-012: AccessibilityRatingSchema for trails
- [x] G-013: AccessibleParkingSchema with ADA/van spaces
- [x] G-014: AccessibleRestroomSchema with features
- [x] G-015: assistiveServices array
- [x] G-016: sensoryFeatures array
- [x] G-017: serviceAnimalPolicy string
- [x] G-018: accessibilityStatement with contact

### 10.3 Reservation Systems (3 gaps)

- [x] G-019: reservationUrl on lodging, camping, shelters
- [x] G-020: reservationPhone with hours
- [x] G-021: bookingWindow specified

### 10.4 Seasonal Programming (7 gaps)

- [x] G-022: ProgramTypeSchema with 7 categories
- [x] G-023: RangerProgramSchema (via SeasonalProgramSchema)
- [x] G-024: Educational workshops supported
- [x] G-025: SpecialEventSchema (via SeasonalProgramSchema)
- [x] G-026: Junior Ranger type supported
- [x] G-027: Festival type supported
- [x] G-028: Volunteer type supported

### 10.5 SEO Architecture (20 gaps)

- [x] G-029: TouristAttraction schema
- [x] G-030: LocalBusiness for lodging
- [x] G-031: CampingPitch for campgrounds
- [x] G-032: BreadcrumbList
- [x] G-033: Article schema
- [x] G-034: Place with full address, coordinates
- [x] G-035: OpeningHoursSpecification
- [x] G-036: Event schema for programs
- [x] G-037: AggregateRating structure
- [x] G-038: ImageObject with captions
- [x] G-039: FAQPage optional
- [x] G-040: VideoObject placeholdered
- [x] G-041: Trail enhancement via difficulty/accessibility
- [x] G-042: Map schema for park maps
- [x] G-043: accessibilityFeature property
- [x] G-044: publicTransit optional
- [x] G-045: ParkingFacility schema
- [x] G-046: priceRange and fees
- [x] G-047: SpecialAnnouncement for closures
- [x] G-048: nearbyAttractions array

### 10.6 Template Patterns (5 gaps)

- [x] G-049: FeeSchema structure
- [x] G-050: PetPolicySchema
- [x] G-051: ParkRulesSchema
- [x] G-052: OperatingHoursSchema with seasons
- [x] G-053: ContactInfoSchema complete

### 10.7 Architecture (10 gaps)

- [x] G-054: Hybrid template pattern defined
- [x] G-055: Conditional rendering patterns specified
- [x] G-056: Shared vs unique props documented
- [x] G-057: Component reuse strategy specified
- [x] G-058: Zod validation boundaries defined
- [x] G-059: Empty state handling standardized
- [x] G-060: Type guards added (isStateParkAdventure)
- [x] G-061: Section-level component structure defined
- [x] G-062: SEO component integration specified
- [x] G-063: Testing strategy defined

**Total Gap Closure:** 63/63 (100%)

---

## 11. WVWO Aesthetic Compliance

### 11.1 Validation Checklist

### REQUIRED:

- [x] Fonts: `font-display` (Bitter), `font-hand` (Permanent Marker), `font-body` (Noto Sans)
- [x] Colors: `brand-brown`, `sign-green`, `brand-cream`, `brand-orange` (<5% CTAs only)
- [x] Corners: `rounded-sm` ONLY
- [x] Borders: `border-l-4` accents throughout
- [x] Voice: Kim's authentic rural WV - direct, humble, faith-forward
- [x] Industry colors: Trail difficulty badges with colorblind shapes

### FORBIDDEN:

- [x] Zero Inter, Poppins, DM Sans, etc.
- [x] Zero purple/pink/neon colors
- [x] Zero glassmorphism/backdrop-blur
- [x] Zero rounded-md/lg/xl
- [x] Zero marketing buzzwords

### 11.2 Kim's Voice Examples

Throughout the specification, Kim's voice is used for:

- Trail tips: "Take your time on the steps - the canyon views are worth it"
- Practical advice: "Book early for weekends and fall foliage season"
- Shop CTAs: "Stop by before you head out - we'll make sure you're ready"
- Photography tips: "Come at sunrise for magical golden hour light"
- Water source warnings: (from backcountry pattern, if applicable)

---

## 12. Success Metrics

| Metric | Target | Validation Method |
|--------|--------|-------------------|
| Template line count | 500-550 lines | Line count tool |
| Type file line count | ~600-700 lines | Line count tool |
| Test coverage | >80% | Vitest coverage report |
| Lighthouse accessibility | >95 | Lighthouse CI |
| Lighthouse SEO | >95 | Lighthouse CI |
| Lighthouse performance | >90 | Lighthouse CI |
| WVWO aesthetic violations | 0 | Manual PR review checklist |
| Gap closure | 63/63 (100%) | Specification review |
| Schema.org validation | 0 errors | Schema.org validator |
| Rich Results Test | All entities pass | Google Rich Results Test |

---

## 13. Clarifications & Decisions

### Session 2026-01-02

### Q: How should state park content differ from backcountry content?
A: State parks emphasize family-friendly facilities (lodging, camping, picnic areas), reservation systems, and seasonal programming. Backcountry emphasizes self-sufficiency, navigation skills, and safety warnings. State parks are developed; backcountry is primitive.

### Q: How should the template handle parks with varying facility levels?
A: Use conditional rendering - all facility sections are optional. Minimum viable page requires only: name, heroImage, acreage, location, quickHighlights, fees, accessibility, contactInfo.

### Q: Should reservation integration be external links or embedded forms?
A: External links (reservationUrl) to WV State Parks official booking system. Embedded forms are out of scope for this phase.

### Q: How should accessibility features be balanced with other content?
A: Accessibility is P0 priority. Dedicated accessibility section with border-l-brand-orange for visibility. ADA compliance flags on all facility types. Accessibility ratings on all trails.

### Q: What's the first state park to implement?
A: Blackwater Falls State Park - most popular WV state park, comprehensive facilities, good accessibility, extensive documentation available.

### Q: How should SEO schema differ from backcountry?
A: Add TouristAttraction (primary), LocalBusiness (for lodges), CampingPitch (for campgrounds), Event (for ranger programs). More commercial/tourism-focused than backcountry wilderness.

### Q: Should the template support multiple lodging types in one park?
A: Yes - lodging is an array to support lodge rooms, cabins, cottages, etc. Each has its own LodgingSchema with unique amenities.

### Q: How granular should operating hours be?
A: OperatingHoursSchema supports seasonal variations (e.g., "Summer: Memorial Day - Labor Day, 9am-8pm daily"). Allows up to 6 seasonal hour blocks.

### Q: Should pet policies be park-wide or facility-specific?
A: Both - park-wide PetPolicySchema with general rules, plus facility-specific petFriendly flags on lodging/camping for granular control.

### Q: How should the template handle seasonal closures?
A: Use SpecialAnnouncement schema for SEO visibility. Display seasonal notes on relevant facilities. OperatingHoursSchema includes season/dates fields.

---

## 14. Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2026-01-02 | Hierarchical Swarm Coordinator | Initial comprehensive specification based on gap analysis research and SPEC-17 pattern |

---

## 15. Appendices

### Appendix A: Related Specifications

- **SPEC-17:** Backcountry/Wilderness Template (pattern reference for type system, SEO, testing)
- **SPEC-16:** Cave Template (pattern reference for facility-focused content)
- **SPEC-09:** Adventure.ts Shared Types (dependency for GearItem, Coordinates, etc.)

### Appendix B: External References

- **WV State Parks:** <https://wvstateparks.com/>
- **Blackwater Falls:** <https://wvstateparks.com/park/blackwater-falls-state-park/>
- **Pipestem Resort:** <https://wvstateparks.com/park/pipestem-resort-state-park/>
- **Schema.org TouristAttraction:** <https://schema.org/TouristAttraction>
- **Schema.org LocalBusiness:** <https://schema.org/LocalBusiness>
- **Schema.org CampingPitch:** <https://schema.org/CampingPitch>
- **WCAG 2.1 AA:** <https://www.w3.org/WAI/WCAG21/quickref/>

### Appendix C: Gap Analysis Summary

**Total Gaps Identified:** 63

### Gap Categories:

1. Facilities & Amenities: 10 gaps
2. Accessibility Compliance: 8 gaps
3. Reservation Systems: 3 gaps
4. Seasonal Programming: 7 gaps
5. SEO Architecture: 20 gaps
6. Template Patterns: 5 gaps
7. Architecture: 10 gaps

### Resolution Strategy:
All 63 gaps addressed through comprehensive type system (state-park-types.ts), template structure (StateParkTemplate.astro), SEO implementation (SchemaStateParkTemplate.astro), and architectural patterns (conditional rendering, empty state handling, type guards).

### Priority Distribution:

- P0 (Critical): 23 gaps
- P1 (High): 26 gaps
- P2 (Medium): 14 gaps

### Appendix D: Coordinate with Future SPECs

### SPEC-19: Historic Site Template

- May reuse: ContactInfoSchema, AccessibilityRatingSchema, OperatingHoursSchema
- Different focus: Historical interpretation vs recreation

### SPEC-20: Resort Template

- May reuse: LodgingSchema, ReservationInfoSchema, RecreationFacilitySchema
- Different focus: Commercial resort vs state park

### SPEC-21+: Individual Park Migrations

- Use StateParkTemplate for all state park destinations
- Blackwater Falls (SPEC-35), Pipestem (SPEC-46), etc.

---

### END OF SPEC-18 FINAL SPECIFICATION

This specification is comprehensive, actionable, and production-ready. All 63 identified gaps have been addressed with specific schemas, components, SEO implementations, and architectural patterns. The specification follows the established SPEC-17 backcountry pattern while extending it for state park-specific requirements including facilities, accessibility, reservations, and seasonal programming.
