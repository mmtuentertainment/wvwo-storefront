/**
 * State Park Template Type Definitions
 * SPEC-18: State Park Template types and Zod validation schemas
 *
 * Provides comprehensive type system for WV State Parks including:
 * - 10 facility types (lodges, cabins, campgrounds, pools, visitor centers, etc.)
 * - 20+ amenity types (disc golf, tennis, stables, equipment rentals)
 * - 7 program types (ranger-led, educational, Junior Ranger, volunteer)
 * - 18 accessibility features (all-terrain wheelchairs, accessible fishing piers)
 * - Operating hours with seasonal variations
 * - Regulations and reservations
 *
 * Follows BackcountryTemplateTypes pattern from backcountry-types.ts
 * Extends existing schemas from adventure.ts, ski-types.ts for reusability
 *
 * @module types/state-park-types
 */

import { z } from 'astro/zod';
import {
  CoordinatesSchema,
  DifficultySchema,
  SeasonSchema,
  type Coordinates,
  type Difficulty,
  type Season,
} from './adventure';

// ============================================================================
// FACILITY TYPE ENUMS (10 Types)
// ============================================================================

/**
 * State park facility types.
 * Covers all major visitor-facing facilities identified in gap analysis.
 *
 * P0 (Essential): Cabins, campgrounds, visitor centers, boat launches
 * P1 (High Value): Lodges, pools, picnic areas, playgrounds
 * P2 (Nice to Have): Nature centers, amphitheaters
 */
export const FacilityTypeSchema = z.enum([
  'lodge',              // Multi-room resort lodge buildings
  'cabin',              // Individual rental cabins (1-4 bedroom)
  'campground',         // RV/tent camping sites
  'pool',               // Indoor/outdoor swimming facilities
  'visitor_center',     // Information and exhibits
  'nature_center',      // Environmental education facility
  'picnic_area',        // Pavilions, shelters, day-use areas
  'boat_launch',        // Water access ramps
  'playground',         // Children's play equipment
  'amphitheater',       // Event venues and programs
]);

export type FacilityType = z.infer<typeof FacilityTypeSchema>;

/**
 * Human-readable labels for facility types.
 * Used in navigation, headings, and UI components.
 */
export const FACILITY_TYPE_LABELS: Record<FacilityType, string> = {
  lodge: 'Lodge',
  cabin: 'Cabins',
  campground: 'Campground',
  pool: 'Swimming Pool',
  visitor_center: 'Visitor Center',
  nature_center: 'Nature Center',
  picnic_area: 'Picnic Areas',
  boat_launch: 'Boat Launch',
  playground: 'Playground',
  amphitheater: 'Amphitheater',
};

/**
 * WVWO brand colors for facility type badges.
 * Follows approved color palette from CLAUDE.md.
 *
 * Brown: Primary facilities (lodging, camping)
 * Green: Nature/outdoor facilities
 * Orange: Accent for events/recreation (used sparingly)
 * Cream: Background for informational facilities
 * Blue: Water features (industry standard)
 */
export const FACILITY_TYPE_COLORS: Record<FacilityType, string> = {
  lodge: 'bg-brand-brown text-brand-cream',
  cabin: 'bg-brand-brown text-brand-cream',
  campground: 'bg-sign-green text-white',
  pool: 'bg-blue-700 text-white',  // Industry standard for water features
  visitor_center: 'bg-brand-cream text-brand-brown border border-brand-brown',
  nature_center: 'bg-sign-green text-white',
  picnic_area: 'bg-brand-cream text-brand-brown border border-brand-brown',
  boat_launch: 'bg-blue-700 text-white',  // Industry standard for water features
  playground: 'bg-sign-green text-white',
  amphitheater: 'bg-brand-orange text-white',
};

/**
 * Icon shapes for facility types (accessibility).
 * Provides visual differentiation beyond color.
 */
export const FACILITY_TYPE_SHAPES: Record<FacilityType, string> = {
  lodge: '🏨',
  cabin: '🏠',
  campground: '⛺',
  pool: '🏊',
  visitor_center: 'ℹ️',
  nature_center: '🌲',
  picnic_area: '👥',
  boat_launch: '🚤',
  playground: '🎡',
  amphitheater: '🎭',
};

// ============================================================================
// AMENITY TYPE ENUMS (22 Types)
// ============================================================================

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
  'gift_shop',          // Retail and local crafts
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
  gift_shop: 'Gift Shop',
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
  gift_shop: 'bg-brand-cream text-brand-brown border border-brand-brown',
};

// ============================================================================
// PROGRAM TYPE ENUMS (7 Types)
// ============================================================================

/**
 * Educational and recreational program types.
 * Represents ranger-led programs, workshops, and visitor activities.
 */
export const ProgramTypeSchema = z.enum([
  'ranger_led',         // Ranger-led hikes and talks
  'educational',        // Educational workshops
  'junior_ranger',      // Children's Junior Ranger program
  'volunteer',          // Volunteer opportunities
  'exhibits',           // Nature center exhibits
  'guided_tours',       // Guided facility tours
  'seasonal_events',    // Seasonal festivals and programs
]);

export type ProgramType = z.infer<typeof ProgramTypeSchema>;

/**
 * Human-readable labels for program types.
 */
export const PROGRAM_TYPE_LABELS: Record<ProgramType, string> = {
  ranger_led: 'Ranger-Led Programs',
  educational: 'Educational Workshops',
  junior_ranger: 'Junior Ranger Program',
  volunteer: 'Volunteer Programs',
  exhibits: 'Nature Center Exhibits',
  guided_tours: 'Guided Tours',
  seasonal_events: 'Seasonal Events',
};

/**
 * WVWO brand colors for program type badges.
 */
export const PROGRAM_TYPE_COLORS: Record<ProgramType, string> = {
  ranger_led: 'bg-sign-green text-white',
  educational: 'bg-brand-brown text-brand-cream',
  junior_ranger: 'bg-brand-orange text-white',
  volunteer: 'bg-brand-cream text-brand-brown border border-brand-brown',
  exhibits: 'bg-sign-green text-white',
  guided_tours: 'bg-brand-brown text-brand-cream',
  seasonal_events: 'bg-brand-orange text-white',
};

// ============================================================================
// ACTIVITY TYPE ENUMS (15 Types)
// ============================================================================

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

/**
 * Human-readable labels for activity types.
 */
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

// ============================================================================
// ACCESSIBILITY FEATURE TYPES (18 Features)
// ============================================================================

/**
 * ADA accessibility feature types.
 * Based on industry standards and WV State Parks accessibility offerings.
 *
 * Covers 18 identified features from gap analysis.
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

// ============================================================================
// PARK OPERATIONS SCHEMAS
// ============================================================================

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

// ============================================================================
// REGULATIONS SCHEMA
// ============================================================================

/**
 * State park regulations schema.
 * Covers park-specific policies for family-friendly recreation.
 */
export const StateParkRegulationsSchema = z.object({
  /** Pet policies */
  pets: z.object({
    allowed: z.boolean().default(true),
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

// ============================================================================
// DETAILED FACILITY SCHEMAS (10 Types)
// ============================================================================

/**
 * State park cabin schema.
 * Individual rental cabins with balanced detail (10-12 fields).
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

/**
 * Lodge facility schema.
 * Multi-room resort lodge buildings.
 */
export const LodgeFacilitySchema = z.object({
  /** Lodge name */
  name: z.string().min(1),

  /** Total number of rooms */
  rooms: z.number().int().positive(),

  /** Room types available */
  roomTypes: z.array(z.string()).max(10).optional(),

  /** Amenities list */
  amenities: z.array(z.string()).max(30),

  /** Has restaurant */
  hasRestaurant: z.boolean().default(false),

  /** Has conference facilities */
  hasConferenceFacilities: z.boolean().default(false),

  /** Description */
  description: z.string().optional(),

  /** Booking URL */
  bookingUrl: z.string().url().optional(),

  /** Price range */
  priceRange: z.string().optional(),

  /** Seasonal operation */
  seasonalOperation: z.string().optional(),
});

export type LodgeFacility = z.infer<typeof LodgeFacilitySchema>;

/**
 * Campground facility schema.
 * RV/tent camping sites with hookups and amenities.
 */
export const CampingFacilitySchema = z.object({
  /** Campground name */
  name: z.string().min(1),

  /** Total number of sites */
  siteCount: z.number().int().positive(),

  /** Hookup types available */
  hookupTypes: z.array(z.enum(['electric', 'water', 'sewer', 'none'])).min(1),

  /** Has bathhouse */
  bathhouse: z.boolean().default(false),

  /** Has dump station */
  dumpStation: z.boolean().default(false),

  /** Maximum RV length */
  maxRVLength: z.string().optional(),  // E.g., "40 feet"

  /** Operating season */
  season: z.string().optional(),  // E.g., "April-November"

  /** Amenities */
  amenities: z.array(z.string()).max(20).default([]),

  /** ADA accessible sites */
  accessible: z.boolean().default(false),

  /** Number of accessible sites */
  accessibleSiteCount: z.number().int().nonnegative().optional(),

  /** Fees */
  fees: z.string().optional(),

  /** Booking URL */
  bookingUrl: z.string().url().optional(),
});

export type CampingFacility = z.infer<typeof CampingFacilitySchema>;

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

/**
 * Boat launch facility schema.
 * Water access ramps for boating recreation.
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

/**
 * Nature center schema (same as visitor center with live animals).
 * Environmental education facility.
 */
export const NatureCenterSchema = VisitorCenterSchema.extend({
  /** Has live animals */
  liveAnimals: z.boolean().default(false),

  /** Interactive displays */
  interactiveDisplays: z.array(z.string()).max(20).optional(),

  /** Connected trails */
  trails: z.array(z.string()).max(10).optional(),
});

export type NatureCenter = z.infer<typeof NatureCenterSchema>;

/**
 * Picnic area / group facility schema.
 * Pavilions, shelters, and day-use areas.
 */
export const PicnicAreaSchema = z.object({
  /** Facility type */
  type: z.enum(['pavilion', 'group_camp', 'shelter', 'picnic_area']),

  /** Facility name/identifier */
  name: z.string().min(1),

  /** Number of shelters/pavilions */
  shelterCount: z.number().int().positive(),

  /** Maximum capacity (people) */
  capacity: z.number().int().positive(),

  /** Reservation required */
  reservable: z.boolean().default(false),

  /** Has grills */
  grills: z.boolean().default(true),

  /** Has electricity */
  electricity: z.boolean().default(false),

  /** Amenities list */
  amenities: z.array(z.string()).max(20).default([]),

  /** ADA accessible */
  accessible: z.boolean().default(false),

  /** Reservation URL */
  reservationUrl: z.string().url().optional(),

  /** Rental fee */
  rentalFee: z.string().optional(),

  /** Near parking */
  nearParking: z.boolean().default(true),

  /** Description */
  description: z.string().optional(),
});

export type PicnicArea = z.infer<typeof PicnicAreaSchema>;

/**
 * Playground facility schema.
 * Children's play equipment areas.
 */
export const PlaygroundSchema = z.object({
  /** Playground name */
  name: z.string().optional(),

  /** Age groups served */
  ageGroups: z.array(z.string()).min(1).max(5),  // E.g., ["2-5 years", "5-12 years"]

  /** Equipment types */
  equipment: z.array(z.string()).max(20),  // Slides, swings, climbing structures

  /** Surface type */
  surfaceType: z.enum(['rubber', 'wood_chips', 'sand', 'grass', 'other']),

  /** Has shade */
  shade: z.boolean().default(false),

  /** ADA accessible */
  accessibility: z.boolean().default(false),

  /** Accessibility features */
  accessibilityFeatures: z.array(z.string()).optional(),

  /** Near restrooms */
  nearRestrooms: z.boolean().default(true),

  /** Near parking */
  nearParking: z.boolean().default(true),
});

export type Playground = z.infer<typeof PlaygroundSchema>;

/**
 * Amphitheater facility schema.
 * Event venues and program spaces.
 */
export const AmphitheaterSchema = z.object({
  /** Amphitheater name */
  name: z.string().min(1),

  /** Seating capacity */
  capacity: z.number().int().positive(),

  /** Operating season */
  season: z.string().optional(),  // E.g., "May-September"

  /** Acoustics quality */
  acoustics: z.enum(['excellent', 'good', 'fair', 'outdoor']).optional(),

  /** ADA accessible */
  accessibility: z.boolean().default(false),

  /** Regular programs */
  programs: z.array(z.string()).max(20).optional(),

  /** Features */
  features: z.array(z.string()).max(15).default([]),

  /** Rental available */
  rentalAvailable: z.boolean().default(false),

  /** Rental contact */
  rentalContact: z.string().optional(),
});

export type Amphitheater = z.infer<typeof AmphitheaterSchema>;

/**
 * Other facility schema.
 * Disc golf, tennis courts, stables, and specialized amenities.
 */
export const OtherFacilitySchema = z.object({
  /** Facility type */
  type: AmenityTypeSchema,

  /** Facility name */
  name: z.string().optional(),

  /** Description */
  description: z.string().optional(),

  /** Fees */
  fees: z.string().optional(),

  /** Seasonal availability */
  seasonal: z.boolean().default(false),

  /** Season if seasonal */
  season: z.string().optional(),

  /** Type-specific details (e.g., "18 holes" for disc golf) */
  details: z.record(z.string(), z.string()).optional(),
});

export type OtherFacility = z.infer<typeof OtherFacilitySchema>;

// ============================================================================
// PROGRAM & ACTIVITY SCHEMAS
// ============================================================================

/**
 * Ranger-led program schema.
 * Ranger-led hikes, talks, and interpretive programs.
 */
export const RangerProgramSchema = z.object({
  /** Program name */
  name: z.string().min(1),

  /** Program type */
  type: ProgramTypeSchema,

  /** Description */
  description: z.string().min(1),

  /** Schedule (e.g., "Saturdays at 10am, June-August") */
  schedule: z.string().optional(),

  /** Duration (e.g., "2 hours") */
  duration: z.string().optional(),

  /** Age group (e.g., "All ages", "8+") */
  ageGroup: z.string().optional(),

  /** Reservation required */
  reservationRequired: z.boolean().default(false),

  /** Accessibility */
  accessible: z.boolean().default(false),

  /** Max participants */
  maxParticipants: z.number().int().positive().optional(),
});

export type RangerProgram = z.infer<typeof RangerProgramSchema>;

/**
 * Educational workshop schema.
 */
export const WorkshopSchema = z.object({
  /** Workshop name */
  name: z.string().min(1),

  /** Topic/subject */
  topic: z.string().min(1),

  /** Description */
  description: z.string().min(1),

  /** Instructor */
  instructor: z.string().optional(),

  /** Materials provided */
  materialsProvided: z.boolean().default(true),

  /** Skill level */
  skillLevel: z.enum(['beginner', 'intermediate', 'advanced', 'all']).default('all'),

  /** Cost */
  cost: z.string().optional(),

  /** Schedule */
  schedule: z.string().optional(),
});

export type Workshop = z.infer<typeof WorkshopSchema>;

/**
 * Junior Ranger program schema.
 * Children's educational program.
 */
export const JuniorRangerProgramSchema = z.object({
  /** Program name */
  name: z.string().min(1).default('Junior Ranger Program'),

  /** Age range */
  ageRange: z.string().min(1),  // E.g., "5-12 years"

  /** Activities */
  activities: z.array(z.string()).min(1).max(20),

  /** Badge eligibility */
  badgeEligibility: z.boolean().default(true),

  /** Duration */
  duration: z.string().optional(),

  /** Cost */
  cost: z.string().default('Free'),

  /** Description */
  description: z.string().optional(),
});

export type JuniorRangerProgram = z.infer<typeof JuniorRangerProgramSchema>;

/**
 * Special event schema.
 * Seasonal festivals and special programs.
 */
export const SpecialEventSchema = z.object({
  /** Event name */
  name: z.string().min(1),

  /** Event date or date range */
  date: z.string().min(1),

  /** Description */
  description: z.string().min(1),

  /** Fees */
  fees: z.string().optional(),

  /** Registration required */
  registrationRequired: z.boolean().default(false),

  /** Registration URL */
  registrationUrl: z.string().url().optional(),

  /** Event type */
  eventType: z.string().optional(),  // E.g., "Festival", "Concert", "Workshop"
});

export type SpecialEvent = z.infer<typeof SpecialEventSchema>;

/**
 * Recreational activity schema.
 */
export const ActivitySchema = z.object({
  /** Activity type */
  type: ActivityTypeSchema,

  /** Activity name */
  name: z.string().optional(),

  /** Description */
  description: z.string().optional(),

  /** Difficulty level */
  difficulty: DifficultySchema.optional(),

  /** Best seasons */
  season: z.array(SeasonSchema).optional(),

  /** Equipment provided/required */
  equipment: z.string().optional(),  // E.g., "Provided", "Bring your own", "Rentals available"

  /** Location within park */
  location: z.string().optional(),

  /** Fees */
  fees: z.string().optional(),
});

export type Activity = z.infer<typeof ActivitySchema>;

// ============================================================================
// TRAIL ACCESS INFORMATION (FSTAG)
// ============================================================================

/**
 * Trail Access Information (TAI) schema following FSTAG specifications.
 * Forest Service Trail Accessibility Guidelines.
 */
export const TrailAccessInfoSchema = z.object({
  /** Trail name */
  name: z.string().min(1),

  /** Wheelchair accessible */
  wheelchairAccessible: z.boolean(),

  /** Surface type */
  surface: z.enum(['paved', 'hardened', 'gravel', 'natural', 'boardwalk']),

  /** Trail width (minimum in inches) */
  width: z.number().int().positive().optional(),

  /** Maximum grade percentage */
  grade: z.string().optional(),  // E.g., "5%", "8.33%"

  /** Cross slope */
  crossSlope: z.string().optional(),

  /** Obstacles */
  obstacles: z.array(z.string()).optional(),

  /** Resting intervals */
  restingIntervals: z.string().optional(),

  /** Additional details */
  details: z.string().optional(),
});

export type TrailAccessInfo = z.infer<typeof TrailAccessInfoSchema>;

/**
 * Service animal policy schema for state parks.
 */
export const ServiceAnimalPolicySchema = z.object({
  /** Are service animals allowed */
  allowed: z.boolean().default(true),

  /** Restrictions */
  restrictions: z.array(z.string()).optional(),

  /** Designated relief areas */
  reliefAreas: z.array(z.string()).optional(),

  /** Handler responsibilities */
  handlerResponsibilities: z.array(z.string()).optional(),

  /** ADA compliance statement */
  adaCompliance: z.string().optional(),
});

export type ServiceAnimalPolicy = z.infer<typeof ServiceAnimalPolicySchema>;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get the human-readable label for a facility type.
 *
 * @returns The human-readable label for the provided facility type.
 */
export function getFacilityTypeLabel(type: FacilityType): string {
  return FACILITY_TYPE_LABELS[type];
}

/**
 * Get the Tailwind CSS color classes associated with a facility type.
 *
 * @returns The Tailwind CSS classes to use for a badge for the given facility type
 */
export function getFacilityTypeColor(type: FacilityType): string {
  return FACILITY_TYPE_COLORS[type];
}

/**
 * Get the icon string for a facility type.
 *
 * @returns The icon or shape string associated with the given facility type.
 */
export function getFacilityTypeShape(type: FacilityType): string {
  return FACILITY_TYPE_SHAPES[type];
}

/**
 * Get the human-readable label for an amenity type.
 *
 * @param type - The amenity type to look up
 * @returns The human-readable label corresponding to `type`
 */
export function getAmenityTypeLabel(type: AmenityType): string {
  return AMENITY_TYPE_LABELS[type];
}

/**
 * Get the Tailwind color classes associated with an amenity type.
 *
 * @param type - The amenity type to look up
 * @returns The Tailwind CSS class string for the given amenity type
 */
export function getAmenityTypeColor(type: AmenityType): string {
  return AMENITY_TYPE_COLORS[type];
}

/**
 * Get the human-readable label for a program type.
 *
 * @returns The human-readable label corresponding to `type`.
 */
export function getProgramTypeLabel(type: ProgramType): string {
  return PROGRAM_TYPE_LABELS[type];
}

/**
 * Retrieve Tailwind color classes for a program type badge.
 *
 * @param type - The program type key
 * @returns Tailwind utility class string for the program type badge
 */
export function getProgramTypeColor(type: ProgramType): string {
  return PROGRAM_TYPE_COLORS[type];
}

/**
 * Get the human-readable label for an activity type.
 *
 * @returns The human-readable label corresponding to `type`.
 */
export function getActivityTypeLabel(type: ActivityType): string {
  return ACTIVITY_TYPE_LABELS[type];
}

/**
 * Get Tailwind CSS color classes for an activity type badge.
 *
 * @param type - The activity type to look up
 * @returns The Tailwind CSS class string for the given activity type badge
 */
export function getActivityTypeColor(type: ActivityType): string {
  return ACTIVITY_TYPE_COLORS[type];
}

/**
 * Get the human-readable label for an accessibility feature.
 *
 * @param feature - The accessibility feature to label
 * @returns The human-readable label for `feature`
 */
export function getAccessibilityFeatureLabel(feature: AccessibilityFeature): string {
  return ACCESSIBILITY_FEATURE_LABELS[feature];
}

/**
 * Get accessibility feature color classes.
 * Returns Tailwind classes for badge styling.
 *
 * @param feature - Accessibility feature
 * @returns Tailwind color classes string
 */
export function getAccessibilityFeatureColor(feature: AccessibilityFeature): string {
  return ACCESSIBILITY_FEATURE_COLORS[feature];
}

/**
 * Retrieve the icon shape associated with an accessibility feature.
 *
 * @param feature - The accessibility feature to look up
 * @returns The icon string mapped to `feature`
 */
export function getAccessibilityFeatureShape(feature: AccessibilityFeature): string {
  return ACCESSIBILITY_FEATURE_SHAPES[feature];
}

/**
 * Determines whether an accessibility features list contains at least one feature.
 *
 * @param features - The accessibility features array, or `undefined`
 * @returns `true` if at least one accessibility feature is present, `false` otherwise
 */
export function hasAccessibilityFeatures(
  features: AccessibilityFeature[] | undefined
): boolean {
  return features !== undefined && features.length > 0;
}

/**
 * Format a DailyHours record into a human-readable time range.
 *
 * @param hours - Daily hours object to format
 * @returns `"Closed"` if either `open` or `close` is `'closed'`, otherwise a time range like `"9:00 AM - 5:30 PM"` with times rendered in 12-hour format including minutes and AM/PM
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

/**
 * Check whether a day's opening and closing times form a valid range.
 *
 * Accepts "closed" for `open`/`close`. Returns `true` only if both are `"closed"`
 * or if `close` is strictly later than `open` (times are expected in "HH:MM" 24-hour format).
 *
 * @param hours - Daily hours object with `open` and `close` values
 * @returns `true` if the hours are valid, `false` otherwise
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