# SPEC-18 State Park Template - Type System Specification

**Document Status:** DRAFT - Architecture Design Phase
**Created:** 2026-01-02
**Last Updated:** 2026-01-02
**Author:** System Architecture Designer
**Related:** SPEC-18-FINAL.md, state-park-facility-gaps.md, state-park-seo-research.md

---

## Executive Summary

This document specifies the complete TypeScript/Zod type system for the State Park Template (SPEC-18), addressing 63 identified gaps including 12 facility types, 9 activity types, 8 ADA features, and 8 SEO requirements. The type system follows SPEC-17 Backcountry Template patterns while expanding to accommodate state park-specific commercial operations, family-friendly amenities, and comprehensive accessibility features.

**Key Architecture Decisions:**

1. **Three-File Structure**: Domain types, SEO types, and template props separated for maintainability
2. **Zod-First Validation**: All schemas use Zod with TypeScript inference for runtime safety
3. **Industry Color Compliance**: Trail/activity difficulty follows international safety standards
4. **WVWO Brand Integration**: Non-safety colors use approved brand palette
5. **Reusability Pattern**: Extends existing schemas from Backcountry, Ski, and Adventure templates

**Estimated File Sizes:**
- `state-park-types.ts`: ~1,300 lines (12 facility types + amenities + activities)
- `state-park-seo-types.ts`: ~400 lines (8 SEO schema types)
- `state-park-template-types.ts`: ~600 lines (complete template props composition)

---

## Table of Contents

1. [Type System Architecture](#type-system-architecture)
2. [File 1: state-park-types.ts](#file-1-state-park-typests)
3. [File 2: state-park-seo-types.ts](#file-2-state-park-seo-typests)
4. [File 3: state-park-template-types.ts](#file-3-state-park-template-typests)
5. [Color System Specification](#color-system-specification)
6. [Helper Functions](#helper-functions)
7. [Testing Requirements](#testing-requirements)
8. [Integration Points](#integration-points)

---

## Type System Architecture

### Design Principles

**1. Separation of Concerns**
- **Domain Types** (`state-park-types.ts`): Business logic types (facilities, amenities, activities)
- **SEO Types** (`state-park-seo-types.ts`): Schema.org and meta tag types
- **Template Props** (`state-park-template-types.ts`): Component interface composition

**2. Type Safety Levels**
- **Runtime Validation**: All inputs validated with Zod schemas
- **Compile-Time Safety**: TypeScript types inferred from Zod
- **Default Values**: Sensible defaults for optional fields

**3. Reusability Strategy**
```typescript
// Import and extend existing patterns
import { DifficultySchema, DIFFICULTY_COLORS } from './adventure';
import { LodgingSchema, DiningSchema } from './ski-types';
import { ManagingAgencySchema, RegulationsSchema } from './backcountry-template-types';

// Extend for state park specifics
export const StateParkLodgingSchema = LodgingSchema.extend({
  cabinNumber: z.string().optional(),
  bedrooms: z.number().int().positive().optional(),
  // ...state park cabin fields
});
```

**4. Industry Standards Compliance**
- Trail difficulty colors follow NSAA/international hiking standards
- ADA accessibility features align with federal requirements
- SEO schemas match Schema.org specifications

### File Dependencies

```
adventure.ts (base types)
    ↓
backcountry-template-types.ts (regulations, agency)
    ↓
ski-types.ts (lodging, dining, pricing)
    ↓
state-park-types.ts (facility types, amenities, activities)
    ↓
state-park-seo-types.ts (schema.org types)
    ↓
state-park-template-types.ts (complete composition)
```

---

## File 1: state-park-types.ts

**Purpose:** Domain model types for state park facilities, amenities, activities, and operations
**Estimated Lines:** ~1,300
**Dependencies:** `adventure.ts`, `ski-types.ts`, `backcountry-template-types.ts`

### 1.1 Facility Type Enums

#### FacilityType (12 Types)

```typescript
/**
 * State park facility types.
 * Covers all major visitor-facing facilities identified in gap analysis.
 *
 * P0 (Essential): Cabins, campgrounds, visitor centers, boat launches
 * P1 (High Value): Lodges, restaurants, pools, gift shops
 * P2 (Nice to Have): Conference centers, nature centers, playgrounds, group facilities
 */
export const FacilityTypeSchema = z.enum([
  'cabin',              // Individual rental cabins (1-4 bedroom)
  'lodge',              // Multi-room resort lodge buildings
  'campground',         // RV/tent camping sites
  'conference_center',  // Meeting rooms, event halls
  'restaurant',         // Full-service dining, cafes
  'pool',               // Indoor/outdoor swimming facilities
  'boat_launch',        // Water access ramps
  'visitor_center',     // Information and exhibits
  'gift_shop',          // Retail and local crafts
  'playground',         // Children's play equipment
  'nature_center',      // Environmental education facility
  'group_facility',     // Pavilions, shelters, picnic areas
]);

export type FacilityType = z.infer<typeof FacilityTypeSchema>;

/**
 * Human-readable labels for facility types.
 * Used in navigation, headings, and UI components.
 */
export const FACILITY_TYPE_LABELS: Record<FacilityType, string> = {
  cabin: 'Cabins',
  lodge: 'Lodge',
  campground: 'Campground',
  conference_center: 'Conference Center',
  restaurant: 'Restaurant',
  pool: 'Swimming Pool',
  boat_launch: 'Boat Launch',
  visitor_center: 'Visitor Center',
  gift_shop: 'Gift Shop',
  playground: 'Playground',
  nature_center: 'Nature Center',
  group_facility: 'Group Facilities',
};

/**
 * WVWO brand colors for facility type badges.
 * Follows approved color palette from CLAUDE.md.
 *
 * Brown: Primary facilities (lodging, camping)
 * Green: Nature/outdoor facilities
 * Orange: Accent for dining/recreation (used sparingly)
 * Cream: Background for informational facilities
 */
export const FACILITY_TYPE_COLORS: Record<FacilityType, string> = {
  cabin: 'bg-brand-brown text-brand-cream',
  lodge: 'bg-brand-brown text-brand-cream',
  campground: 'bg-sign-green text-white',
  conference_center: 'bg-brand-cream text-brand-brown border border-brand-brown',
  restaurant: 'bg-brand-orange text-white',
  pool: 'bg-blue-700 text-white',  // Industry standard for water features
  boat_launch: 'bg-blue-700 text-white',  // Industry standard for water features
  visitor_center: 'bg-brand-cream text-brand-brown border border-brand-brown',
  gift_shop: 'bg-brand-cream text-brand-brown border border-brand-brown',
  playground: 'bg-sign-green text-white',
  nature_center: 'bg-sign-green text-white',
  group_facility: 'bg-brand-brown text-brand-cream',
};

/**
 * Icon shapes for facility types (accessibility).
 * Provides visual differentiation beyond color.
 */
export const FACILITY_TYPE_SHAPES: Record<FacilityType, string> = {
  cabin: '🏠',
  lodge: '🏨',
  campground: '⛺',
  conference_center: '🏢',
  restaurant: '🍴',
  pool: '🏊',
  boat_launch: '🚤',
  visitor_center: 'ℹ️',
  gift_shop: '🛍️',
  playground: '🎡',
  nature_center: '🌲',
  group_facility: '👥',
};
```

### 1.2 Amenity Type Enums

#### AmenityType (20+ Types)

```typescript
/**
 * State park amenity types.
 * Represents recreational and service amenities beyond core facilities.
 *
 * Based on gap analysis findings from WV State Parks research.
 */
export const AmenityTypeSchema = z.enum([
  // Sports & Recreation
  'disc_golf',          // 18+ hole disc golf courses
  'tennis_court',       // Tennis facilities
  'basketball_court',   // Basketball facilities
  'volleyball_court',   // Sand/grass volleyball
  'golf_course',        // Championship/par-3 golf
  'miniature_golf',     // Family mini golf

  // Equestrian
  'stables',            // Horse stables and riding programs
  'horse_trails',       // Designated equestrian trails

  // Events & Entertainment
  'amphitheater',       // Concert and event venue
  'game_room',          // Indoor recreation room
  'exercise_room',      // Fitness facilities

  // Water Recreation
  'splash_park',        // Water play area
  'beach',              // Swimming beach
  'fishing_pier',       // Fishing access pier

  // Services
  'equipment_rental',   // Kayaks, bikes, paddleboards
  'laundromat',         // Laundry facilities
  'dump_station',       // RV waste disposal
  'hot_showers',        // Bathhouse facilities

  // Adventure Activities
  'zipline',            // Aerial zipline course
  'archery_range',      // 3D archery targets
  'laser_tag',          // Indoor laser tag
  'axe_throwing',       // Axe throwing lanes
]);

export type AmenityType = z.infer<typeof AmenityTypeSchema>;

/**
 * Human-readable labels for amenity types.
 */
export const AMENITY_TYPE_LABELS: Record<AmenityType, string> = {
  disc_golf: 'Disc Golf Course',
  tennis_court: 'Tennis Courts',
  basketball_court: 'Basketball Court',
  volleyball_court: 'Volleyball Court',
  golf_course: 'Golf Course',
  miniature_golf: 'Miniature Golf',
  stables: 'Horse Stables',
  horse_trails: 'Horse Trails',
  amphitheater: 'Amphitheater',
  game_room: 'Game Room',
  exercise_room: 'Exercise Room',
  splash_park: 'Splash Park',
  beach: 'Swimming Beach',
  fishing_pier: 'Fishing Pier',
  equipment_rental: 'Equipment Rentals',
  laundromat: 'Laundromat',
  dump_station: 'RV Dump Station',
  hot_showers: 'Hot Showers',
  zipline: 'Zipline Course',
  archery_range: 'Archery Range',
  laser_tag: 'Laser Tag',
  axe_throwing: 'Axe Throwing',
};

/**
 * WVWO brand colors for amenity type badges.
 */
export const AMENITY_TYPE_COLORS: Record<AmenityType, string> = {
  disc_golf: 'bg-sign-green text-white',
  tennis_court: 'bg-sign-green text-white',
  basketball_court: 'bg-sign-green text-white',
  volleyball_court: 'bg-sign-green text-white',
  golf_course: 'bg-sign-green text-white',
  miniature_golf: 'bg-sign-green text-white',
  stables: 'bg-brand-brown text-brand-cream',
  horse_trails: 'bg-brand-brown text-brand-cream',
  amphitheater: 'bg-brand-orange text-white',
  game_room: 'bg-brand-cream text-brand-brown border border-brand-brown',
  exercise_room: 'bg-brand-cream text-brand-brown border border-brand-brown',
  splash_park: 'bg-blue-700 text-white',
  beach: 'bg-blue-700 text-white',
  fishing_pier: 'bg-blue-700 text-white',
  equipment_rental: 'bg-brand-brown text-brand-cream',
  laundromat: 'bg-brand-cream text-brand-brown border border-brand-brown',
  dump_station: 'bg-brand-cream text-brand-brown border border-brand-brown',
  hot_showers: 'bg-brand-cream text-brand-brown border border-brand-brown',
  zipline: 'bg-brand-orange text-white',
  archery_range: 'bg-brand-brown text-brand-cream',
  laser_tag: 'bg-brand-orange text-white',
  axe_throwing: 'bg-brand-orange text-white',
};
```

### 1.3 Program Type Enums

```typescript
/**
 * Educational and recreational program types.
 * Represents ranger-led programs, workshops, and visitor activities.
 */
export const ProgramTypeSchema = z.enum([
  'ranger_led',         // Ranger-led hikes and talks
  'educational',        // Educational workshops
  'junior_ranger',      // Children's Junior Ranger program
  'volunteer',          // Volunteer opportunities
  'nature_exhibit',     // Nature center exhibits
  'guided_tour',        // Guided facility tours
  'seasonal_event',     // Seasonal festivals and programs
]);

export type ProgramType = z.infer<typeof ProgramTypeSchema>;

export const PROGRAM_TYPE_LABELS: Record<ProgramType, string> = {
  ranger_led: 'Ranger-Led Programs',
  educational: 'Educational Workshops',
  junior_ranger: 'Junior Ranger Program',
  volunteer: 'Volunteer Programs',
  nature_exhibit: 'Nature Center Exhibits',
  guided_tour: 'Guided Tours',
  seasonal_event: 'Seasonal Events',
};

export const PROGRAM_TYPE_COLORS: Record<ProgramType, string> = {
  ranger_led: 'bg-sign-green text-white',
  educational: 'bg-brand-brown text-brand-cream',
  junior_ranger: 'bg-brand-orange text-white',
  volunteer: 'bg-brand-cream text-brand-brown border border-brand-brown',
  nature_exhibit: 'bg-sign-green text-white',
  guided_tour: 'bg-brand-brown text-brand-cream',
  seasonal_event: 'bg-brand-orange text-white',
};
```

### 1.4 Activity Type Enums

```typescript
/**
 * Recreational activity types available at state parks.
 * Covers both summer and winter activities.
 */
export const ActivityTypeSchema = z.enum([
  'swimming',           // Pool or lake swimming
  'boating',            // Motorized/non-motorized boating
  'fishing',            // Fishing access
  'hiking',             // Hiking trails
  'biking',             // Mountain biking trails
  'golf',               // Golf courses
  'skiing',             // Downhill skiing (resort parks)
  'snowboarding',       // Snowboarding (resort parks)
  'cross_country_ski',  // Cross-country skiing
  'horseback_riding',   // Equestrian trails
  'rock_climbing',      // Climbing areas
  'wildlife_viewing',   // Wildlife observation
  'photography',        // Scenic photography
  'picnicking',         // Picnic areas
  'playground',         // Children's play areas
]);

export type ActivityType = z.infer<typeof ActivityTypeSchema>;

export const ACTIVITY_TYPE_LABELS: Record<ActivityType, string> = {
  swimming: 'Swimming',
  boating: 'Boating',
  fishing: 'Fishing',
  hiking: 'Hiking',
  biking: 'Mountain Biking',
  golf: 'Golf',
  skiing: 'Skiing',
  snowboarding: 'Snowboarding',
  cross_country_ski: 'Cross-Country Skiing',
  horseback_riding: 'Horseback Riding',
  rock_climbing: 'Rock Climbing',
  wildlife_viewing: 'Wildlife Viewing',
  photography: 'Photography',
  picnicking: 'Picnicking',
  playground: 'Playground',
};

/**
 * Activity type colors following WVWO brand palette.
 * Water activities use industry blue, winter sports use appropriate colors.
 */
export const ACTIVITY_TYPE_COLORS: Record<ActivityType, string> = {
  swimming: 'bg-blue-700 text-white',
  boating: 'bg-blue-700 text-white',
  fishing: 'bg-blue-700 text-white',
  hiking: 'bg-sign-green text-white',
  biking: 'bg-sign-green text-white',
  golf: 'bg-sign-green text-white',
  skiing: 'bg-blue-700 text-white',
  snowboarding: 'bg-blue-700 text-white',
  cross_country_ski: 'bg-blue-700 text-white',
  horseback_riding: 'bg-brand-brown text-brand-cream',
  rock_climbing: 'bg-brand-brown text-brand-cream',
  wildlife_viewing: 'bg-sign-green text-white',
  photography: 'bg-brand-cream text-brand-brown border border-brand-brown',
  picnicking: 'bg-brand-cream text-brand-brown border border-brand-brown',
  playground: 'bg-brand-orange text-white',
};
```

### 1.5 Accessibility Feature Types

```typescript
/**
 * ADA accessibility feature types.
 * Based on industry standards and WV State Parks accessibility offerings.
 *
 * Covers 8 identified gaps plus additional standard features.
 */
export const AccessibilityFeatureSchema = z.enum([
  // Mobility Equipment (P0)
  'all_terrain_wheelchair',     // Electric all-terrain wheelchairs
  'beach_wheelchair',            // Beach/sand mobility aids
  'wheelchair_charging',         // Charging stations for electric wheelchairs

  // Physical Access (P0)
  'accessible_fishing_pier',    // ADA-compliant fishing piers
  'accessible_kayak_launch',    // Wheelchair-accessible kayak launches
  'accessible_overlook',        // Accessible scenic viewpoints
  'accessible_trail',           // Paved/accessible trail sections
  'accessible_picnic',          // Height-appropriate picnic tables
  'accessible_campsite',        // ADA-compliant campsites

  // Facilities (P0)
  'accessible_restroom',        // ADA-compliant restrooms
  'accessible_parking',         // Designated accessible parking
  'accessible_cabin',           // ADA-compliant cabin rentals
  'accessible_playground',      // Inclusive playground equipment

  // Sensory & Communication (P1)
  'sensory_garden',             // Tactile and aromatic gardens
  'audio_tour',                 // Audio descriptions for vision-impaired
  'asl_interpreter',            // ASL interpretation services (72hr notice)
  'braille_signage',            // Braille wayfinding

  // Advance Notice Services (P1)
  'advance_notice_required',    // 72-hour advance notice for accommodations
]);

export type AccessibilityFeature = z.infer<typeof AccessibilityFeatureSchema>;

/**
 * Human-readable labels for accessibility features.
 */
export const ACCESSIBILITY_FEATURE_LABELS: Record<AccessibilityFeature, string> = {
  all_terrain_wheelchair: 'All-Terrain Wheelchairs Available',
  beach_wheelchair: 'Beach Wheelchairs Available',
  wheelchair_charging: 'Wheelchair Charging Stations',
  accessible_fishing_pier: 'Accessible Fishing Pier',
  accessible_kayak_launch: 'Accessible Kayak Launch',
  accessible_overlook: 'Accessible Scenic Overlooks',
  accessible_trail: 'Accessible Trails',
  accessible_picnic: 'Accessible Picnic Tables',
  accessible_campsite: 'ADA-Compliant Campsites',
  accessible_restroom: 'Accessible Restrooms',
  accessible_parking: 'Accessible Parking',
  accessible_cabin: 'ADA-Compliant Cabins',
  accessible_playground: 'Accessible Playground',
  sensory_garden: 'Sensory Garden',
  audio_tour: 'Audio Tours Available',
  asl_interpreter: 'ASL Interpretation (72hr notice)',
  braille_signage: 'Braille Signage',
  advance_notice_required: 'Advance Notice Required for Some Services',
};

/**
 * Accessibility feature colors - use blue for ADA compliance per industry standard.
 * Blue signifies accessibility in international signage systems.
 */
export const ACCESSIBILITY_FEATURE_COLORS: Record<AccessibilityFeature, string> = {
  all_terrain_wheelchair: 'bg-blue-700 text-white',
  beach_wheelchair: 'bg-blue-700 text-white',
  wheelchair_charging: 'bg-blue-700 text-white',
  accessible_fishing_pier: 'bg-blue-700 text-white',
  accessible_kayak_launch: 'bg-blue-700 text-white',
  accessible_overlook: 'bg-blue-700 text-white',
  accessible_trail: 'bg-blue-700 text-white',
  accessible_picnic: 'bg-blue-700 text-white',
  accessible_campsite: 'bg-blue-700 text-white',
  accessible_restroom: 'bg-blue-700 text-white',
  accessible_parking: 'bg-blue-700 text-white',
  accessible_cabin: 'bg-blue-700 text-white',
  accessible_playground: 'bg-blue-700 text-white',
  sensory_garden: 'bg-blue-700 text-white',
  audio_tour: 'bg-blue-700 text-white',
  asl_interpreter: 'bg-blue-700 text-white',
  braille_signage: 'bg-blue-700 text-white',
  advance_notice_required: 'bg-blue-700 text-white',
};

/**
 * Icon shapes for accessibility features.
 * Uses universal accessibility symbol ♿ or relevant icons.
 */
export const ACCESSIBILITY_FEATURE_SHAPES: Record<AccessibilityFeature, string> = {
  all_terrain_wheelchair: '♿',
  beach_wheelchair: '♿',
  wheelchair_charging: '⚡',
  accessible_fishing_pier: '🎣',
  accessible_kayak_launch: '🛶',
  accessible_overlook: '👁️',
  accessible_trail: '🥾',
  accessible_picnic: '🍽️',
  accessible_campsite: '⛺',
  accessible_restroom: '🚻',
  accessible_parking: '🅿️',
  accessible_cabin: '🏠',
  accessible_playground: '🎡',
  sensory_garden: '🌸',
  audio_tour: '🔊',
  asl_interpreter: '🤟',
  braille_signage: '⠃',
  advance_notice_required: 'ℹ️',
};
```

### 1.6 Park Operations Schemas

```typescript
/**
 * Day of week enum for operating hours.
 */
export const DayOfWeekSchema = z.enum([
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
]);

export type DayOfWeek = z.infer<typeof DayOfWeekSchema>;

/**
 * Time of day in 24-hour format (HH:MM).
 */
export const TimeOfDaySchema = z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/);

/**
 * Operating hours for a single day.
 */
export const DailyHoursSchema = z.object({
  /** Day of week */
  day: DayOfWeekSchema,
  /** Opening time (24hr format) or 'closed' */
  open: z.union([TimeOfDaySchema, z.literal('closed')]),
  /** Closing time (24hr format) or 'closed' */
  close: z.union([TimeOfDaySchema, z.literal('closed')]),
  /** Notes (e.g., "Seasonal - May through October") */
  notes: z.string().optional(),
});

export type DailyHours = z.infer<typeof DailyHoursSchema>;

/**
 * Seasonal operating hours schema.
 * Represents hours that change by season (summer vs winter).
 */
export const SeasonalHoursSchema = z.object({
  /** Season name (e.g., "Summer Season", "Winter Hours") */
  season: z.string().min(1),
  /** Start date (ISO format or descriptive like "Memorial Day") */
  startDate: z.string().min(1),
  /** End date (ISO format or descriptive like "Labor Day") */
  endDate: z.string().min(1),
  /** Hours by day of week */
  hours: z.array(DailyHoursSchema).min(1).max(7),
});

export type SeasonalHours = z.infer<typeof SeasonalHoursSchema>;

/**
 * Park-wide operating hours.
 * Covers day-use hours, overnight camping, seasonal variations.
 */
export const ParkOperatingHoursSchema = z.object({
  /** General park hours (e.g., "Dawn to Dusk", "Year-round 24/7") */
  general: z.string().min(1),
  /** Day-use hours if different from general */
  dayUse: z.string().optional(),
  /** Overnight camping allowed */
  overnightCamping: z.boolean().default(true),
  /** Seasonal variations */
  seasonalHours: z.array(SeasonalHoursSchema).max(4).optional(),
  /** Facility-specific hours (visitor center, restaurant, pool) */
  facilityHours: z.record(z.string(), z.string()).optional(),
});

export type ParkOperatingHours = z.infer<typeof ParkOperatingHoursSchema>;
```

### 1.7 Regulations Schema

```typescript
/**
 * State park regulations schema.
 * Extends backcountry regulations with park-specific policies.
 */
export const StateParkRegulationsSchema = z.object({
  /** Pet policies */
  pets: z.object({
    allowed: z.boolean().default(true),
    restrictions: z.array(z.string()).optional(),
    leashRequired: z.boolean().default(true),
    petFriendlyAreas: z.array(z.string()).optional(),
    restrictions: z.array(z.string()).optional(), // E.g., "Not allowed in cabins", "Leash required"
  }),

  /** Day-use fees */
  dayUseFees: z.object({
    required: z.boolean().default(false),
    amount: z.string().optional(),  // E.g., "$5 per vehicle", "Free"
    details: z.string().optional(),
  }).optional(),

  /** Parking regulations */
  parking: z.object({
    available: z.boolean().default(true),
    capacity: z.number().int().positive().optional(),
    fees: z.string().optional(),
    restrictions: z.array(z.string()).optional(),
  }).optional(),

  /** Alcohol policies */
  alcohol: z.object({
    allowed: z.boolean().default(false),
    restrictions: z.array(z.string()).optional(),
  }).optional(),

  /** Smoking policies */
  smoking: z.object({
    allowed: z.boolean().default(false),
    designatedAreas: z.boolean().default(false),
    restrictions: z.array(z.string()).optional(),
  }).optional(),

  /** Fire policies */
  fires: z.object({
    allowed: z.boolean().default(true),
    restrictions: z.array(z.string()).min(1),  // At least one restriction for safety
    firePits: z.boolean().default(false),
    seasonalBans: z.string().optional(),
  }),

  /** Special restrictions */
  specialRestrictions: z.array(z.string()).default([]),

  /** Quiet hours */
  quietHours: z.object({
    enforced: z.boolean().default(true),
    start: TimeOfDaySchema.optional(),
    end: TimeOfDaySchema.optional(),
  }).optional(),
});

export type StateParkRegulations = z.infer<typeof StateParkRegulationsSchema>;
```

### 1.8 Detailed Facility Schemas

#### Cabin Schema

```typescript
/**
 * State park cabin schema.
 * Extends ski resort lodging schema with cabin-specific fields.
 */
export const CabinSchema = z.object({
  /** Cabin identifier (e.g., "Cabin 1-9", "Deluxe Cabin A") */
  cabinNumber: z.string().min(1),

  /** Cabin name (optional, e.g., "Sunset View Cabin") */
  name: z.string().optional(),

  /** Number of bedrooms */
  bedrooms: z.number().int().positive(),

  /** Number of bathrooms */
  bathrooms: z.number().positive(),  // Allow 1.5, 2.5 bathrooms

  /** Maximum occupancy */
  maxOccupancy: z.number().int().positive(),

  /** Kitchen type */
  kitchenType: z.enum(['full', 'partial', 'kitchenette', 'none']),

  /** Has fireplace */
  hasFireplace: z.boolean().default(false),

  /** Fireplace type if applicable */
  fireplaceType: z.enum(['stone', 'gas', 'electric', 'wood']).optional(),

  /** Pet friendly */
  petFriendly: z.boolean().default(false),

  /** ADA accessible */
  accessible: z.boolean().default(false),

  /** Seasonal availability */
  seasonalAvailability: z.string().optional(),  // E.g., "April-November", "Year-round"

  /** Amenities list */
  amenities: z.array(z.string()).max(30).default([]),

  /** Has porch/deck */
  hasPorch: z.boolean().default(false),

  /** Has outdoor grill */
  hasGrill: z.boolean().default(false),

  /** Nightly rate range */
  priceRange: z.string().optional(),  // E.g., "$150-$250/night"

  /** Booking URL */
  bookingUrl: z.string().url().optional(),

  /** Photo URL */
  photoUrl: z.string().url().optional(),

  /** Description */
  description: z.string().optional(),
});

export type Cabin = z.infer<typeof CabinSchema>;
```

#### Pool Facility Schema

```typescript
/**
 * Swimming pool facility schema.
 * Covers indoor/outdoor pools, splash parks, and water recreation.
 */
export const PoolFacilitySchema = z.object({
  /** Pool type */
  type: z.enum(['indoor', 'outdoor', 'splash_pad', 'lazy_river']),

  /** Pool name */
  name: z.string().optional(),

  /** Depth range */
  depth: z.string().optional(),  // E.g., "3-8 feet", "Zero-entry to 5 feet"

  /** Features list */
  features: z.array(z.string()).max(20).default([]),  // Water slides, Diving board, Lap lanes

  /** Lifeguard on duty */
  lifeguard: z.boolean().default(true),

  /** Operating hours (seasonal) */
  hours: z.array(SeasonalHoursSchema).max(4).optional(),

  /** Seasonal operation description */
  seasonalOperation: z.string().optional(),  // E.g., "Memorial Day - Labor Day"

  /** Age restrictions */
  ageRestrictions: z.string().optional(),

  /** Admission fees */
  fees: z.string().optional(),

  /** Accessible */
  accessible: z.boolean().default(false),

  /** Accessibility features */
  accessibilityFeatures: z.array(z.string()).optional(),
});

export type PoolFacility = z.infer<typeof PoolFacilitySchema>;
```

#### Boat Launch Schema

```typescript
/**
 * Boat launch facility schema.
 * Extends marina patterns for state park boat ramps.
 */
export const BoatLaunchSchema = z.object({
  /** Launch name/identifier */
  name: z.string().min(1),

  /** Ramp surface type */
  rampType: z.enum(['concrete', 'gravel', 'natural']),

  /** Number of launch lanes */
  lanes: z.number().int().positive(),

  /** Courtesy dock available */
  dockAvailable: z.boolean().default(false),

  /** Dock length in feet */
  dockLength: z.number().int().positive().optional(),

  /** Trailer parking spaces */
  trailerParkingSpaces: z.number().int().nonnegative(),

  /** Vehicle parking spaces */
  vehicleParkingSpaces: z.number().int().nonnegative(),

  /** Launch fee */
  launchFee: z.string(),  // E.g., "Free", "$5/day", "$10/day"

  /** Water depth at launch */
  depthAtLaunch: z.string().optional(),  // E.g., "Adequate at normal pool", "6-10 feet"

  /** Restrictions */
  restrictions: z.array(z.string()).default([]),  // E.g., "No gas motors", "10 HP limit"

  /** Accessible */
  accessible: z.boolean().default(false),

  /** Operating season */
  operatingSeason: z.string().optional(),

  /** Hours */
  hours: z.string().optional(),
});

export type BoatLaunch = z.infer<typeof BoatLaunchSchema>;
```

#### Visitor Center Schema

```typescript
/**
 * Visitor center / nature center schema.
 * Educational facilities with exhibits and programs.
 */
export const VisitorCenterSchema = z.object({
  /** Center name */
  name: z.string().min(1),

  /** Center type */
  type: z.enum(['visitor_center', 'nature_center', 'interpretive_center']),

  /** Exhibits list */
  exhibits: z.array(z.string()).max(30).default([]),

  /** Programs offered */
  programs: z.array(z.string()).max(30).default([]),

  /** Operating hours */
  hours: z.array(SeasonalHoursSchema).max(4).optional(),

  /** Staffed by rangers */
  staffed: z.boolean().default(true),

  /** Has gift shop */
  giftShop: z.boolean().default(false),

  /** Has restrooms */
  restrooms: z.boolean().default(true),

  /** Accessibility features */
  accessibility: z.string().optional(),

  /** Contact phone */
  contact: z.string().optional(),

  /** Admission fee */
  admissionFee: z.string().optional(),
});

export type VisitorCenter = z.infer<typeof VisitorCenterSchema>;
```

#### Group Facility Schema

```typescript
/**
 * Group facilities schema (pavilions, shelters, picnic areas).
 * For group gatherings, events, and reservations.
 */
export const GroupFacilitySchema = z.object({
  /** Facility type */
  type: z.enum(['pavilion', 'group_camp', 'shelter', 'picnic_area']),

  /** Facility name/identifier */
  name: z.string().min(1),

  /** Maximum capacity (people) */
  capacity: z.number().int().positive(),

  /** Amenities list */
  amenities: z.array(z.string()).max(20).default([]),  // Grills, Tables, Electric, Water

  /** ADA accessible */
  accessible: z.boolean().default(false),

  /** Reservation required */
  reservationRequired: z.boolean().default(false),

  /** Reservation URL */
  reservationUrl: z.string().url().optional(),

  /** Rental fee */
  rentalFee: z.string().optional(),

  /** Seasonal availability */
  seasonal: z.boolean().default(false),

  /** Near parking */
  nearParking: z.boolean().default(true),

  /** Description */
  description: z.string().optional(),
});

export type GroupFacility = z.infer<typeof GroupFacilitySchema>;
```

#### Equipment Rental Schema

```typescript
/**
 * Recreation equipment rental schema.
 * Covers kayaks, canoes, bikes, paddleboards, fishing gear.
 */
export const EquipmentRentalSchema = z.object({
  /** Equipment type */
  equipment: z.string().min(1),  // E.g., "Kayak", "Canoe", "Mountain Bike"

  /** Pricing structure */
  price: z.string().min(1),  // E.g., "$15/hour", "$40/day", "$200/week"

  /** Security deposit required */
  deposit: z.string().optional(),

  /** Reservation required */
  reservationRequired: z.boolean().default(false),

  /** Seasonal availability */
  seasonalAvailability: z.string().optional(),

  /** Age restrictions */
  ageRestrictions: z.string().optional(),

  /** Included items */
  includes: z.array(z.string()).default([]),  // E.g., ["Life jacket", "Paddle", "Helmet"]

  /** Contact for reservations */
  contact: z.string().optional(),
});

export type EquipmentRental = z.infer<typeof EquipmentRentalSchema>;
```

### 1.9 Helper Functions

```typescript
/**
 * Get facility type label.
 */
export function getFacilityTypeLabel(type: FacilityType): string {
  return FACILITY_TYPE_LABELS[type];
}

/**
 * Get facility type color classes.
 */
export function getFacilityTypeColor(type: FacilityType): string {
  return FACILITY_TYPE_COLORS[type];
}

/**
 * Get facility type icon shape.
 */
export function getFacilityTypeShape(type: FacilityType): string {
  return FACILITY_TYPE_SHAPES[type];
}

/**
 * Get amenity type label.
 */
export function getAmenityTypeLabel(type: AmenityType): string {
  return AMENITY_TYPE_LABELS[type];
}

/**
 * Get amenity type color classes.
 */
export function getAmenityTypeColor(type: AmenityType): string {
  return AMENITY_TYPE_COLORS[type];
}

/**
 * Get accessibility feature label.
 */
export function getAccessibilityFeatureLabel(feature: AccessibilityFeature): string {
  return ACCESSIBILITY_FEATURE_LABELS[feature];
}

/**
 * Get accessibility feature color classes.
 */
export function getAccessibilityFeatureColor(feature: AccessibilityFeature): string {
  return ACCESSIBILITY_FEATURE_COLORS[feature];
}

/**
 * Get accessibility feature icon shape.
 */
export function getAccessibilityFeatureShape(feature: AccessibilityFeature): string {
  return ACCESSIBILITY_FEATURE_SHAPES[feature];
}

/**
 * Get activity type label.
 */
export function getActivityTypeLabel(type: ActivityType): string {
  return ACTIVITY_TYPE_LABELS[type];
}

/**
 * Get activity type color classes.
 */
export function getActivityTypeColor(type: ActivityType): string {
  return ACTIVITY_TYPE_COLORS[type];
}

/**
 * Check if park has specific facility type.
 */
export function hasFacilityType(
  facilities: Array<{ type: FacilityType }>,
  type: FacilityType
): boolean {
  return facilities.some((f) => f.type === type);
}

/**
 * Filter facilities by type.
 */
export function filterFacilitiesByType<T extends { type: FacilityType }>(
  facilities: T[],
  type: FacilityType
): T[] {
  return facilities.filter((f) => f.type === type);
}

/**
 * Check if park is ADA accessible.
 * Returns true if at least one accessibility feature is available.
 */
export function hasAccessibilityFeatures(
  features: AccessibilityFeature[] | undefined
): boolean {
  return features !== undefined && features.length > 0;
}

/**
 * Format operating hours for display.
 * Converts 24hr time to 12hr format.
 */
export function formatOperatingHours(hours: DailyHours): string {
  if (hours.open === 'closed' || hours.close === 'closed') {
    return 'Closed';
  }

  const formatTime = (time: string): string => {
    const [hour, minute] = time.split(':').map(Number);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minute.toString().padStart(2, '0')} ${ampm}`;
  };

  return `${formatTime(hours.open)} - ${formatTime(hours.close)}`;
}
```

---

## File 2: state-park-seo-types.ts

**Purpose:** SEO-specific types for Schema.org structured data and meta tags
**Estimated Lines:** ~400
**Dependencies:** `state-park-types.ts`, `adventure.ts`

### 2.1 Opening Hours Specification

```typescript
/**
 * OpeningHoursSpecification for Schema.org LocalBusiness.
 * Represents operating hours with seasonal variations.
 *
 * @see https://schema.org/OpeningHoursSpecification
 */
export const OpeningHoursSpecificationSchema = z.object({
  /** Day of week (schema.org format) */
  '@type': z.literal('OpeningHoursSpecification').default('OpeningHoursSpecification'),

  /** Day of week using Schema.org DayOfWeek enum */
  dayOfWeek: z.array(
    z.enum([
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ])
  ).min(1),

  /** Opening time in 24hr format (HH:MM) */
  opens: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),

  /** Closing time in 24hr format (HH:MM) */
  closes: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),

  /** Valid from date (ISO 8601) */
  validFrom: z.string().optional(),

  /** Valid through date (ISO 8601) */
  validThrough: z.string().optional(),
});

export type OpeningHoursSpecification = z.infer<typeof OpeningHoursSpecificationSchema>;
```

### 2.2 FAQ Item Schema

```typescript
/**
 * FAQ item for Schema.org FAQPage.
 * Used for featured snippet optimization.
 *
 * @see https://schema.org/FAQPage
 */
export const FAQItemSchema = z.object({
  /** Schema.org type */
  '@type': z.literal('Question').default('Question'),

  /** Question text (optimized for voice search) */
  name: z.string().min(10).max(200),

  /** Accepted answer */
  acceptedAnswer: z.object({
    '@type': z.literal('Answer').default('Answer'),
    /** Answer text (40-50 words optimal for featured snippets) */
    text: z.string().min(20).max(500),
  }),
});

export type FAQItem = z.infer<typeof FAQItemSchema>;

/**
 * Complete FAQPage schema for state park pages.
 * Includes multiple questions optimized for featured snippets.
 */
export const FAQPageSchema = z.object({
  '@type': z.literal('FAQPage').default('FAQPage'),
  '@context': z.literal('https://schema.org').default('https://schema.org'),

  /** FAQ items */
  mainEntity: z.array(FAQItemSchema).min(3).max(15),
});

export type FAQPage = z.infer<typeof FAQPageSchema>;
```

### 2.3 Event Schema

```typescript
/**
 * Park event schema for Schema.org Event markup.
 * Covers ranger programs, festivals, seasonal events.
 *
 * @see https://schema.org/Event
 */
export const ParkEventSchema = z.object({
  /** Schema.org type */
  '@type': z.enum(['Event', 'EducationEvent', 'SocialEvent']).default('Event'),

  /** Event name */
  name: z.string().min(1),

  /** Event description */
  description: z.string().min(1),

  /** Start date/time (ISO 8601) */
  startDate: z.string(),

  /** End date/time (ISO 8601) */
  endDate: z.string().optional(),

  /** Event location */
  location: z.object({
    '@type': z.literal('Place').default('Place'),
    name: z.string(),
    address: z.string().optional(),
  }),

  /** Performer/presenter */
  performer: z.object({
    '@type': z.enum(['Person', 'Organization']).default('Person'),
    name: z.string(),
  }).optional(),

  /** Organizer */
  organizer: z.object({
    '@type': z.literal('Organization').default('Organization'),
    name: z.string(),
  }).optional(),

  /** Event status */
  eventStatus: z.enum([
    'https://schema.org/EventScheduled',
    'https://schema.org/EventCancelled',
    'https://schema.org/EventPostponed',
  ]).default('https://schema.org/EventScheduled'),

  /** Attendance mode */
  eventAttendanceMode: z.enum([
    'https://schema.org/OfflineEventAttendanceMode',
    'https://schema.org/OnlineEventAttendanceMode',
    'https://schema.org/MixedEventAttendanceMode',
  ]).default('https://schema.org/OfflineEventAttendanceMode'),

  /** Free admission */
  isAccessibleForFree: z.boolean().default(true),

  /** Offers (if paid) */
  offers: z.object({
    '@type': z.literal('Offer').default('Offer'),
    price: z.string(),
    priceCurrency: z.literal('USD').default('USD'),
    availability: z.string().default('https://schema.org/InStock'),
  }).optional(),
});

export type ParkEvent = z.infer<typeof ParkEventSchema>;
```

### 2.4 Event Series Schema

```typescript
/**
 * Recurring event series schema.
 * For weekly/monthly ranger programs.
 */
export const EventSeriesSchema = z.object({
  '@type': z.literal('EventSeries').default('EventSeries'),

  /** Series name */
  name: z.string().min(1),

  /** Series description */
  description: z.string().min(1),

  /** Start date */
  startDate: z.string(),

  /** End date */
  endDate: z.string().optional(),

  /** Frequency (e.g., "Weekly on Saturdays") */
  frequency: z.string().optional(),

  /** Sub events */
  subEvent: z.array(ParkEventSchema).max(30).optional(),
});

export type EventSeries = z.infer<typeof EventSeriesSchema>;
```

### 2.5 Amenity Feature Schema

```typescript
/**
 * LocationFeatureSpecification for Schema.org amenityFeature.
 * Represents park facilities and services.
 *
 * @see https://schema.org/LocationFeatureSpecification
 */
export const AmenityFeatureSpecificationSchema = z.object({
  '@type': z.literal('LocationFeatureSpecification').default('LocationFeatureSpecification'),

  /** Feature name */
  name: z.string().min(1),

  /** Feature value (boolean or string) */
  value: z.union([z.boolean(), z.string()]),

  /** Additional info */
  description: z.string().optional(),
});

export type AmenityFeatureSpecification = z.infer<typeof AmenityFeatureSpecificationSchema>;
```

### 2.6 Reserve Action Schema

```typescript
/**
 * ReserveAction for Schema.org potentialAction.
 * Enables "Book Now" rich results in search.
 *
 * @see https://schema.org/ReserveAction
 */
export const ReserveActionSchema = z.object({
  '@type': z.literal('ReserveAction').default('ReserveAction'),

  /** Target URL */
  target: z.object({
    '@type': z.literal('EntryPoint').default('EntryPoint'),
    urlTemplate: z.string().url(),
    actionPlatform: z.array(z.string()).default([
      'http://schema.org/DesktopWebPlatform',
      'http://schema.org/MobileWebPlatform',
    ]),
  }),

  /** Result type */
  result: z.object({
    '@type': z.enum(['LodgingReservation', 'CampingPitchReservation']).default('LodgingReservation'),
    name: z.string(),
  }),
});

export type ReserveAction = z.infer<typeof ReserveActionSchema>;
```

### 2.7 Image Gallery Schema

```typescript
/**
 * ImageGallery schema for photo galleries.
 *
 * @see https://schema.org/ImageGallery
 */
export const ImageGallerySchema = z.object({
  '@type': z.literal('ImageGallery').default('ImageGallery'),

  /** Gallery name */
  name: z.string().min(1),

  /** Description */
  description: z.string().optional(),

  /** Images */
  image: z.array(
    z.object({
      '@type': z.literal('ImageObject').default('ImageObject'),
      url: z.string().url(),
      caption: z.string().optional(),
      description: z.string().optional(),
      width: z.number().int().positive().optional(),
      height: z.number().int().positive().optional(),
    })
  ).min(1).max(50),
});

export type ImageGallery = z.infer<typeof ImageGallerySchema>;
```

### 2.8 Review/Rating Schema

```typescript
/**
 * AggregateRating schema for park ratings.
 *
 * @see https://schema.org/AggregateRating
 */
export const AggregateRatingSchema = z.object({
  '@type': z.literal('AggregateRating').default('AggregateRating'),

  /** Average rating value (1-5 scale) */
  ratingValue: z.number().min(1).max(5),

  /** Best possible rating */
  bestRating: z.literal(5).default(5),

  /** Worst possible rating */
  worstRating: z.literal(1).default(1),

  /** Total review count */
  ratingCount: z.number().int().nonnegative(),

  /** Total reviews */
  reviewCount: z.number().int().nonnegative().optional(),
});

export type AggregateRating = z.infer<typeof AggregateRatingSchema>;

/**
 * Individual review schema.
 *
 * @see https://schema.org/Review
 */
export const ReviewSchema = z.object({
  '@type': z.literal('Review').default('Review'),

  /** Review author */
  author: z.object({
    '@type': z.literal('Person').default('Person'),
    name: z.string(),
  }),

  /** Review date */
  datePublished: z.string(),  // ISO 8601

  /** Review text */
  reviewBody: z.string().min(1),

  /** Rating */
  reviewRating: z.object({
    '@type': z.literal('Rating').default('Rating'),
    ratingValue: z.number().min(1).max(5),
  }),
});

export type Review = z.infer<typeof ReviewSchema>;
```

### 2.9 Helper Functions

```typescript
/**
 * Convert seasonal hours to OpeningHoursSpecification array.
 */
export function convertToOpeningHoursSpec(
  seasonalHours: SeasonalHours
): OpeningHoursSpecification[] {
  return seasonalHours.hours.map((dailyHours) => ({
    '@type': 'OpeningHoursSpecification' as const,
    dayOfWeek: [capitalizeFirst(dailyHours.day)],
    opens: dailyHours.open === 'closed' ? '00:00' : dailyHours.open,
    closes: dailyHours.close === 'closed' ? '00:00' : dailyHours.close,
    validFrom: seasonalHours.startDate,
    validThrough: seasonalHours.endDate,
  }));
}

/**
 * Create FAQ item from question and answer.
 */
export function createFAQItem(question: string, answer: string): FAQItem {
  return {
    '@type': 'Question',
    name: question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: answer,
    },
  };
}

/**
 * Create amenity feature specification.
 */
export function createAmenityFeature(
  name: string,
  value: boolean | string,
  description?: string
): AmenityFeatureSpecification {
  return {
    '@type': 'LocationFeatureSpecification',
    name,
    value,
    description,
  };
}

/**
 * Capitalize first letter of string.
 */
function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
```

---

## File 3: state-park-template-types.ts

**Purpose:** Complete StateParkTemplateProps composition schema
**Estimated Lines:** ~600
**Dependencies:** `state-park-types.ts`, `state-park-seo-types.ts`, `backcountry-template-types.ts`

### 3.1 Hero Section Schema

```typescript
/**
 * State park hero section props.
 * Similar to backcountry but with family-friendly emphasis.
 */
export const StateParkHeroSchema = z.object({
  /** Park name */
  name: z.string().min(1),

  /** Hero image path */
  heroImage: z.string().min(1),

  /** Image position */
  imagePosition: z.enum(['center', 'top', 'bottom']).default('center'),

  /** Tagline (e.g., "Family Adventure Awaits") */
  tagline: z.string().optional(),

  /** Acreage */
  acreage: z.number().positive().optional(),

  /** Signature feature (e.g., "60-foot waterfall") */
  signatureFeature: z.string().optional(),

  /** Quick highlights (3-5 items) */
  quickHighlights: z.array(z.string()).max(5).optional(),
});

export type StateParkHero = z.infer<typeof StateParkHeroSchema>;
```

### 3.2 Park Overview Schema

```typescript
/**
 * Park overview section props.
 * Essential information visible at page top.
 */
export const ParkOverviewSchema = z.object({
  /** Operating hours */
  operatingHours: ParkOperatingHoursSchema,

  /** Day-use fees */
  dayUseFees: z.object({
    required: z.boolean().default(false),
    amount: z.string().optional(),
    details: z.string().optional(),
  }).optional(),

  /** Park contact info */
  contact: z.object({
    phone: z.string().optional(),
    email: z.string().email().optional(),
    address: z.string().optional(),
  }),

  /** Managing agency */
  managingAgency: ManagingAgencySchema,

  /** County */
  county: z.string().optional(),

  /** Coordinates */
  coordinates: CoordinatesSchema.optional(),
});

export type ParkOverview = z.infer<typeof ParkOverviewSchema>;
```

### 3.3 Facilities Section Schema

```typescript
/**
 * Facilities section props.
 * Comprehensive facility listings by category.
 */
export const FacilitiesSectionSchema = z.object({
  /** Lodging (cabins and lodges) */
  lodging: z.object({
    cabins: z.array(CabinSchema).max(50).optional(),
    lodges: z.array(z.object({
      name: z.string(),
      rooms: z.number().int().positive(),
      amenities: z.array(z.string()).max(30),
      description: z.string().optional(),
      bookingUrl: z.string().url().optional(),
    })).max(5).optional(),
  }).optional(),

  /** Camping facilities */
  camping: z.object({
    campgrounds: z.array(z.object({
      name: z.string(),
      sites: z.number().int().positive(),
      hookups: z.array(z.enum(['electric', 'water', 'sewer'])).optional(),
      amenities: z.array(z.string()).max(30),
      accessible: z.boolean().default(false),
      fees: z.string().optional(),
      bookingUrl: z.string().url().optional(),
    })).max(10).optional(),
  }).optional(),

  /** Picnic areas */
  picnicAreas: z.array(GroupFacilitySchema).max(20).optional(),

  /** Visitor centers */
  visitorCenters: z.array(VisitorCenterSchema).max(5).optional(),

  /** Boat launches */
  boatLaunches: z.array(BoatLaunchSchema).max(10).optional(),

  /** Pools */
  pools: z.array(PoolFacilitySchema).max(5).optional(),

  /** Other amenities */
  otherAmenities: z.array(z.object({
    type: AmenityTypeSchema,
    name: z.string().optional(),
    description: z.string().optional(),
    fees: z.string().optional(),
    seasonal: z.boolean().default(false),
  })).max(30).optional(),
});

export type FacilitiesSection = z.infer<typeof FacilitiesSectionSchema>;
```

### 3.4 Activities & Programs Schema

```typescript
/**
 * Activities and programs section props.
 */
export const ActivitiesProgramsSchema = z.object({
  /** Ranger-led programs */
  rangerPrograms: z.array(z.object({
    name: z.string(),
    description: z.string(),
    schedule: z.string().optional(),  // E.g., "Saturdays at 10am, June-August"
    duration: z.string().optional(),  // E.g., "2 hours"
    ageGroup: z.string().optional(),  // E.g., "All ages", "8+"
    reservationRequired: z.boolean().default(false),
  })).max(30).optional(),

  /** Educational programs */
  educationalPrograms: z.array(z.object({
    name: z.string(),
    type: ProgramTypeSchema,
    description: z.string(),
    schedule: z.string().optional(),
  })).max(30).optional(),

  /** Recreational activities */
  recreationalActivities: z.array(z.object({
    activity: ActivityTypeSchema,
    description: z.string().optional(),
    difficulty: DifficultySchema.optional(),
    season: z.array(z.string()).optional(),
    equipment: z.string().optional(),  // E.g., "Provided", "Bring your own", "Rentals available"
  })).max(30).optional(),

  /** Equipment rentals */
  equipmentRentals: z.array(EquipmentRentalSchema).max(20).optional(),
});

export type ActivitiesPrograms = z.infer<typeof ActivitiesProgramsSchema>;
```

### 3.5 Trail System Schema

```typescript
/**
 * Trail system section props.
 * Reuses backcountry trail patterns with accessibility indicators.
 */
export const TrailSystemSchema = z.object({
  /** Total trail mileage */
  totalMileage: z.number().positive().optional(),

  /** Trail list */
  trails: z.array(
    BackcountryTrailSchema.extend({
      /** ADA accessible */
      accessible: z.boolean().default(false),

      /** Accessibility features */
      accessibilityFeatures: z.array(z.string()).optional(),

      /** Trail surface */
      surface: z.enum(['paved', 'gravel', 'natural', 'boardwalk']).optional(),

      /** Dogs allowed */
      dogsAllowed: z.boolean().default(true),

      /** Leash required */
      leashRequired: z.boolean().default(true),
    })
  ).max(50).optional(),

  /** Trail map URL */
  trailMapUrl: z.string().url().optional(),
});

export type TrailSystem = z.infer<typeof TrailSystemSchema>;
```

### 3.6 Scenic Overlooks Schema

```typescript
/**
 * Scenic overlooks section props.
 */
export const ScenicOverlooksSchema = z.object({
  overlooks: z.array(z.object({
    /** Overlook name */
    name: z.string(),

    /** Description */
    description: z.string().optional(),

    /** ADA accessible */
    accessible: z.boolean().default(false),

    /** Best times to visit */
    bestTimes: z.array(z.string()).optional(),  // E.g., ["Sunrise", "Fall foliage"]

    /** Parking available */
    parkingAvailable: z.boolean().default(true),

    /** Distance from parking */
    distanceFromParking: z.string().optional(),  // E.g., "100 feet", "0.5 mile hike"

    /** Coordinates */
    coordinates: CoordinatesSchema.optional(),
  })).max(20).optional(),
});

export type ScenicOverlooks = z.infer<typeof ScenicOverlooksSchema>;
```

### 3.7 Accessibility Section Schema

```typescript
/**
 * Accessibility section props.
 * Comprehensive ADA compliance information.
 */
export const AccessibilitySectionSchema = z.object({
  /** Accessibility statement */
  statement: z.string().optional(),

  /** Available features */
  features: z.array(AccessibilityFeatureSchema).max(30).optional(),

  /** Accessible trails */
  accessibleTrails: z.array(z.string()).optional(),

  /** Accessible facilities */
  accessibleFacilities: z.array(z.string()).optional(),

  /** Assistive equipment available */
  assistiveEquipment: z.array(z.object({
    equipment: z.string(),
    description: z.string().optional(),
    reservationRequired: z.boolean().default(false),
    advanceNotice: z.string().optional(),  // E.g., "72 hours"
  })).max(20).optional(),

  /** Advance notice requirements */
  advanceNoticeRequired: z.boolean().default(false),

  /** Advance notice details */
  advanceNoticeDetails: z.string().optional(),

  /** Contact for accommodations */
  accommodationsContact: z.string().optional(),
});

export type AccessibilitySection = z.infer<typeof AccessibilitySectionSchema>;
```

### 3.8 Reservations Section Schema

```typescript
/**
 * Reservations and fees section props.
 */
export const ReservationsSectionSchema = z.object({
  /** Cabin reservations */
  cabins: z.object({
    bookingUrl: z.string().url(),
    bookingWindow: z.string().optional(),  // E.g., "Up to 12 months in advance"
    cancellationPolicy: z.string().optional(),
    fees: z.array(z.object({
      cabinType: z.string(),
      priceRange: z.string(),
      season: z.string().optional(),
    })).max(20).optional(),
  }).optional(),

  /** Campground reservations */
  camping: z.object({
    bookingUrl: z.string().url(),
    bookingWindow: z.string().optional(),
    cancellationPolicy: z.string().optional(),
    fees: z.array(z.object({
      siteType: z.string(),
      price: z.string(),
      season: z.string().optional(),
    })).max(20).optional(),
  }).optional(),

  /** Group facility reservations */
  groupFacilities: z.object({
    bookingUrl: z.string().url().optional(),
    bookingContact: z.string().optional(),
    fees: z.array(z.object({
      facilityType: z.string(),
      price: z.string(),
    })).max(10).optional(),
  }).optional(),
});

export type ReservationsSection = z.infer<typeof ReservationsSectionSchema>;
```

### 3.9 Complete Template Props Schema

```typescript
/**
 * Complete State Park Template Props Schema.
 * Composition of all section schemas with sensible defaults.
 *
 * REQUIRED FIELDS (P0):
 * - hero: Park name, hero image
 * - overview: Operating hours, contact, managing agency
 * - regulations: Park rules and policies
 *
 * OPTIONAL FIELDS (Progressive Enhancement):
 * - facilities: Lodging, camping, amenities
 * - activities: Programs and recreation
 * - trails: Trail system
 * - overlooks: Scenic viewpoints
 * - accessibility: ADA features
 * - reservations: Booking information
 * - seo: Schema.org and meta tags
 */
export const StateParkTemplatePropsSchema = z.object({
  // ---- Required Fields (P0) ----

  /** Hero section */
  hero: StateParkHeroSchema,

  /** Park overview */
  overview: ParkOverviewSchema,

  /** Park regulations */
  regulations: StateParkRegulationsSchema,

  // ---- Optional Fields (Progressive Enhancement) ----

  /** Facilities section */
  facilities: FacilitiesSectionSchema.optional(),

  /** Activities and programs */
  activitiesPrograms: ActivitiesProgramsSchema.optional(),

  /** Trail system */
  trails: TrailSystemSchema.optional(),

  /** Scenic overlooks */
  overlooks: ScenicOverlooksSchema.optional(),

  /** Accessibility information */
  accessibility: AccessibilitySectionSchema.optional(),

  /** Reservations and fees */
  reservations: ReservationsSectionSchema.optional(),

  /** SEO metadata */
  seo: z.object({
    /** Meta title (50-60 chars) */
    title: z.string().min(10).max(60).optional(),

    /** Meta description (150-160 chars) */
    description: z.string().min(50).max(160).optional(),

    /** FAQ items for featured snippets */
    faqItems: z.array(FAQItemSchema).max(15).optional(),

    /** Events for Schema.org Event markup */
    events: z.array(ParkEventSchema).max(30).optional(),

    /** Image gallery */
    imageGallery: ImageGallerySchema.optional(),

    /** Aggregate rating */
    rating: AggregateRatingSchema.optional(),
  }).optional(),

  /** Emergency contacts (inherited from backcountry) */
  emergencyContacts: z.array(TieredEmergencyContactSchema).min(1).optional(),

  /** Nearby attractions */
  nearbyAttractions: z.array(NearbyAttractionSchema).max(10).optional(),

  /** Related categories */
  relatedCategories: z.array(RelatedCategorySchema).max(5).optional(),
});

export type StateParkTemplateProps = z.infer<typeof StateParkTemplatePropsSchema>;
```

---

## Color System Specification

### WVWO Brand Colors (Primary Palette)

```typescript
/**
 * WVWO approved color palette from CLAUDE.md.
 * These are the ONLY non-industry-standard colors allowed.
 */
export const WVWO_COLORS = {
  /** Primary brand brown - rifle stocks, weathered barn wood */
  brandBrown: '#3E2723',

  /** Accent green - old metal signs, forest canopy */
  signGreen: '#2E7D32',

  /** Background cream - aged paper, deer hide */
  brandCream: '#FFF8E1',

  /** Call-to-action orange - blaze orange (use sparingly <5% of screen) */
  brandOrange: '#FF6F00',
} as const;
```

### Industry Safety Colors (Exceptions)

```typescript
/**
 * Industry-standard safety colors that OVERRIDE brand palette.
 * These colors are REQUIRED for safety-critical information.
 *
 * Per CLAUDE.md: "Industry safety/danger colors OVERRIDE WVWO brand palette
 * in adventure contexts."
 */
export const INDUSTRY_SAFETY_COLORS = {
  // Trail Difficulty (NSAA/International Hiking Standards)
  trailGreen: '#2E7D32',      // Beginner/Easy
  trailBlue: '#1976D2',       // Intermediate/Moderate
  trailRed: '#B71C1C',        // Challenging
  trailBlack: '#000000',      // Advanced/Expert/Rugged

  // Water Features (Industry Standard)
  waterBlue: '#1976D2',       // Pools, boat launches, lakes

  // Danger Levels (Fire/Avalanche/Emergency)
  dangerGreen: '#2E7D32',     // Low
  dangerYellow: '#FBC02D',    // Moderate
  dangerOrange: '#F57C00',    // Considerable/High
  dangerRed: '#D32F2F',       // High/Extreme
  dangerBlack: '#000000',     // Extreme

  // ADA Accessibility (International Standard)
  accessibilityBlue: '#1976D2',  // Accessibility features

  // Poison Control (Industry Standard Exception)
  poisonPurple: '#7B1FA2',    // Poison control only
} as const;
```

### Tailwind Color Classes

```typescript
/**
 * Tailwind CSS color classes mapped to WVWO brand colors.
 */
export const WVWO_TAILWIND_CLASSES = {
  // Brand colors
  'bg-brand-brown': 'bg-[#3E2723]',
  'text-brand-brown': 'text-[#3E2723]',
  'bg-sign-green': 'bg-[#2E7D32]',
  'text-sign-green': 'text-[#2E7D32]',
  'bg-brand-cream': 'bg-[#FFF8E1]',
  'text-brand-cream': 'text-[#FFF8E1]',
  'bg-brand-orange': 'bg-[#FF6F00]',
  'text-brand-orange': 'text-[#FF6F00]',

  // Industry standard colors
  'bg-blue-700': 'bg-blue-700',      // Water, intermediate trails, accessibility
  'bg-red-900': 'bg-red-900',        // Challenging trails
  'bg-black': 'bg-black',            // Expert/rugged trails
  'bg-yellow-600': 'bg-yellow-600',  // Moderate danger
  'bg-orange-600': 'bg-orange-600',  // High danger
  'bg-red-700': 'bg-red-700',        // Extreme danger
} as const;
```

### Color Usage Guidelines

**DO:**
- Use `bg-brand-brown` for lodging, cabins, group facilities
- Use `bg-sign-green` for nature/outdoor facilities, playgrounds
- Use `bg-brand-orange` sparingly (<5% screen) for CTAs only
- Use `bg-blue-700` for water features, intermediate trails, accessibility
- Use trail difficulty colors (green/blue/red/black) for trail markers

**DON'T:**
- Use purple (except poison control)
- Use pink/neon colors
- Use brand orange for backgrounds
- Use glassmorphic effects
- Use rounded-md/lg/xl (use rounded-sm only)

---

## Helper Functions

### Type Guards

```typescript
/**
 * Type guard to check if adventure is state park template.
 */
export function isStateParkTemplate(adventure: any): adventure is StateParkTemplateProps {
  if (!adventure) return false;
  if (!adventure.hero) return false;
  if (!adventure.overview) return false;
  if (!adventure.regulations) return false;
  return true;
}

/**
 * Type guard to check if facility has accessibility features.
 */
export function hasAccessibleFacilities(park: StateParkTemplateProps): boolean {
  return (
    park.accessibility?.features !== undefined &&
    park.accessibility.features.length > 0
  );
}

/**
 * Type guard to check if park has lodging.
 */
export function hasLodging(park: StateParkTemplateProps): boolean {
  return (
    park.facilities?.lodging?.cabins !== undefined ||
    park.facilities?.lodging?.lodges !== undefined
  );
}
```

### Data Transformation

```typescript
/**
 * Convert cabin schema to Schema.org LodgingBusiness.
 */
export function cabinToSchemaOrg(cabin: Cabin) {
  return {
    '@type': 'LodgingBusiness',
    name: cabin.name || `Cabin ${cabin.cabinNumber}`,
    address: 'State Park (full address from park data)',
    numberOfRooms: cabin.bedrooms,
    petsAllowed: cabin.petFriendly,
    amenityFeature: cabin.amenities.map((amenity) =>
      createAmenityFeature(amenity, true)
    ),
    priceRange: cabin.priceRange || '$$',
  };
}

/**
 * Convert park events to Schema.org Event array.
 */
export function eventsToSchemaOrg(events: ParkEvent[]) {
  return events.map((event) => ({
    ...event,
    '@context': 'https://schema.org',
  }));
}
```

### Validation Helpers

```typescript
/**
 * Validate that total trail count matches difficulty breakdown.
 */
export function validateTrailCounts(trails: BackcountryTrail[]): boolean {
  const total = trails.length;
  const byDifficulty = {
    easy: trails.filter((t) => t.difficulty === 'easy').length,
    moderate: trails.filter((t) => t.difficulty === 'moderate').length,
    challenging: trails.filter((t) => t.difficulty === 'challenging').length,
    rugged: trails.filter((t) => t.difficulty === 'rugged').length,
  };

  return total === Object.values(byDifficulty).reduce((sum, count) => sum + count, 0);
}

/**
 * Validate operating hours don't have invalid time ranges.
 */
export function validateOperatingHours(hours: DailyHours): boolean {
  if (hours.open === 'closed' || hours.close === 'closed') {
    return hours.open === 'closed' && hours.close === 'closed';
  }

  const [openHour, openMin] = hours.open.split(':').map(Number);
  const [closeHour, closeMin] = hours.close.split(':').map(Number);

  const openTime = openHour * 60 + openMin;
  const closeTime = closeHour * 60 + closeMin;

  return closeTime > openTime;
}
```

---

## Testing Requirements

### Unit Tests

**File: `__tests__/state-park-types.test.ts`**

```typescript
describe('FacilityTypeSchema', () => {
  it('should validate all 12 facility types', () => {
    const validTypes = [
      'cabin', 'lodge', 'campground', 'conference_center',
      'restaurant', 'pool', 'boat_launch', 'visitor_center',
      'gift_shop', 'playground', 'nature_center', 'group_facility',
    ];

    validTypes.forEach((type) => {
      expect(() => FacilityTypeSchema.parse(type)).not.toThrow();
    });
  });

  it('should reject invalid facility types', () => {
    expect(() => FacilityTypeSchema.parse('invalid')).toThrow();
  });
});

describe('CabinSchema', () => {
  it('should validate complete cabin object', () => {
    const cabin = {
      cabinNumber: 'Cabin 1',
      bedrooms: 2,
      bathrooms: 1,
      maxOccupancy: 6,
      kitchenType: 'full',
      hasFireplace: true,
      petFriendly: false,
      accessible: false,
    };

    expect(() => CabinSchema.parse(cabin)).not.toThrow();
  });

  it('should reject cabin with invalid kitchen type', () => {
    const cabin = {
      cabinNumber: 'Cabin 1',
      bedrooms: 2,
      bathrooms: 1,
      maxOccupancy: 6,
      kitchenType: 'invalid',
    };

    expect(() => CabinSchema.parse(cabin)).toThrow();
  });
});

describe('Color System', () => {
  it('should use industry colors for trail difficulty', () => {
    expect(ACTIVITY_TYPE_COLORS.hiking).toBe('bg-sign-green text-white');
    expect(DIFFICULTY_COLORS.moderate).toBe('bg-blue-700 text-white');
    expect(DIFFICULTY_COLORS.rugged).toBe('bg-black text-white');
  });

  it('should use WVWO brand colors for facilities', () => {
    expect(FACILITY_TYPE_COLORS.cabin).toBe('bg-brand-brown text-brand-cream');
    expect(FACILITY_TYPE_COLORS.playground).toBe('bg-sign-green text-white');
  });

  it('should use blue for accessibility features', () => {
    expect(ACCESSIBILITY_FEATURE_COLORS.all_terrain_wheelchair).toBe('bg-blue-700 text-white');
  });
});
```

### Integration Tests

**File: `__tests__/state-park-template-types.test.ts`**

```typescript
describe('StateParkTemplatePropsSchema', () => {
  it('should validate complete state park template', () => {
    const park: StateParkTemplateProps = {
      hero: {
        name: 'Blackwater Falls State Park',
        heroImage: '/images/blackwater-hero.jpg',
        acreage: 2358,
        signatureFeature: '62-foot waterfall',
      },
      overview: {
        operatingHours: {
          general: 'Year-round, 24/7',
          dayUse: 'Dawn to Dusk',
        },
        contact: {
          phone: '304-259-5216',
          email: 'blackwater@wvstateparks.com',
        },
        managingAgency: {
          name: 'WV State Parks',
          jurisdiction: 'West Virginia Division of Natural Resources',
        },
      },
      regulations: {
        pets: {
          allowed: true,
          leashRequired: true,
        },
        fires: {
          allowed: true,
          restrictions: ['Fire pits only', 'No fires during drought warnings'],
        },
      },
    };

    expect(() => StateParkTemplatePropsSchema.parse(park)).not.toThrow();
  });
});
```

---

## Integration Points

### Astro Content Collections

```typescript
// wv-wild-web/src/content/config.ts

import { defineCollection, z } from 'astro:content';
import { StateParkTemplatePropsSchema } from '../types/state-park-template-types';

const stateParkCollection = defineCollection({
  type: 'content',
  schema: StateParkTemplatePropsSchema,
});

export const collections = {
  'state-parks': stateParkCollection,
  // ... other collections
};
```

### Component Props

```typescript
// wv-wild-web/src/components/StateParkTemplate.astro

---
import type { StateParkTemplateProps } from '../types/state-park-template-types';

interface Props {
  park: StateParkTemplateProps;
}

const { park } = Astro.props;
---

<article class="state-park-template">
  <StateParkHero {...park.hero} />
  <ParkOverview {...park.overview} />
  {park.facilities && <FacilitiesSection {...park.facilities} />}
  {park.trails && <TrailSystem {...park.trails} />}
  {park.accessibility && <AccessibilitySection {...park.accessibility} />}
</article>
```

### Schema.org Generation

```typescript
// wv-wild-web/src/components/schema/StateParkSchema.astro

---
import type { StateParkTemplateProps } from '../../types/state-park-template-types';
import { cabinToSchemaOrg, eventsToSchemaOrg } from '../../types/state-park-seo-types';

interface Props {
  park: StateParkTemplateProps;
}

const { park } = Astro.props;

const schemaOrg = {
  '@context': 'https://schema.org',
  '@type': ['TouristAttraction', 'Park', 'LocalBusiness'],
  name: park.hero.name,
  description: park.overview.description,
  // ... complete schema.org markup
};
---

<script type="application/ld+json" set:html={JSON.stringify(schemaOrg)} />
```

---

## Architecture Decision Records

### ADR-001: Three-File Type System

**Status:** Proposed
**Date:** 2026-01-02

**Context:**
State park types are complex with 63+ identified gaps. Need maintainable structure.

**Decision:**
Split into three files:
1. Domain types (facilities, amenities)
2. SEO types (Schema.org)
3. Template composition

**Consequences:**
- ✅ Easier to maintain and test
- ✅ Clear separation of concerns
- ✅ Reusable SEO types across templates
- ⚠️ More import statements
- ⚠️ Need careful dependency management

### ADR-002: Industry Color Overrides

**Status:** Approved (per CLAUDE.md)
**Date:** 2026-01-02

**Context:**
Trail difficulty and safety information require industry-standard colors that conflict with WVWO brand palette.

**Decision:**
Industry safety colors OVERRIDE brand palette for:
- Trail difficulty (green/blue/red/black)
- Water features (blue)
- Accessibility (blue)
- Danger levels (green/yellow/orange/red/black)

**Consequences:**
- ✅ Follows user expectations
- ✅ Enhances safety communication
- ✅ Aligns with international standards
- ⚠️ Mixed color palette on pages

### ADR-003: Zod-First Validation

**Status:** Approved
**Date:** 2026-01-02

**Context:**
Need runtime validation for content collection data and type safety.

**Decision:**
All schemas defined with Zod first, TypeScript types inferred.

**Consequences:**
- ✅ Runtime validation
- ✅ Single source of truth
- ✅ Automatic type inference
- ⚠️ Larger bundle size
- ⚠️ Learning curve for Zod

---

## Next Steps

### Implementation Priority

**Phase 1: Core Types (Week 1)**
1. Create `state-park-types.ts` with P0 facility types
2. Implement accessibility feature types
3. Add operating hours schemas
4. Write unit tests

**Phase 2: SEO Types (Week 1)**
1. Create `state-park-seo-types.ts`
2. Implement FAQPage schema
3. Add Event schemas
4. Write SEO helper functions

**Phase 3: Template Composition (Week 2)**
1. Create `state-park-template-types.ts`
2. Implement all section schemas
3. Write integration tests
4. Update content collection config

**Phase 4: Component Integration (Week 2)**
1. Create Astro components using new types
2. Implement Schema.org generation
3. Build example state park data file
4. E2E testing

### Success Metrics

- [ ] All 63 identified gaps covered by types
- [ ] 100% type coverage in template
- [ ] All tests passing (unit + integration)
- [ ] Lighthouse SEO score ≥ 95
- [ ] Google Rich Results validation passing
- [ ] Zero TypeScript errors
- [ ] Documentation complete

---

**Document Metadata:**
- Lines of Code: ~2,400 (across 3 files)
- Schemas Defined: 45+
- Helper Functions: 25+
- Test Cases Required: 60+
- Estimated Implementation: 2 weeks

**Related Documents:**
- SPEC-18-FINAL.md
- state-park-facility-gaps.md
- state-park-seo-research.md
- CLAUDE.md (color palette reference)
