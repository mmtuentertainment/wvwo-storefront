/**
 * River Adventure Type Definitions
 * SPEC-14 Implementation: T-001 through T-007 (7 Zod schemas)
 *
 * Zod schemas for river adventure content types including rapids,
 * fishing, outfitters, seasonal flows, access points, safety, and attractions.
 *
 * @module types/river-types
 */

import { z } from 'zod';

/**
 * T-003: Outfitter contact and service information.
 * Commercial outfitters offering river services (rafting, kayaking, fishing guides).
 */
export const OutfitterSchema = z.object({
  /** Outfitter business name */
  name: z.string().min(1, "Outfitter name required"),
  /** Services offered (e.g., "Rafting", "Kayaking", "Fishing Guides") */
  services: z.array(
    z.enum([
      'Rafting',
      'Kayaking',
      'Fishing Guides',
      'Equipment Rental',
      'Shuttle Service',
      'Camping',
      'Lodging',
      'Ziplining'
    ])
  ).min(1, "At least one service required"),
  /** Contact information */
  contact: z.object({
    phone: z.string().regex(/^\d{3}-\d{3}-\d{4}$/, "Phone must be format: 304-555-1234").optional(),
    website: z.string().url("Invalid URL format").optional(),
    email: z.string().email("Invalid email format").optional(),
  }),
  /** Price range indicator (e.g., "$", "$$", "$$$") */
  priceRange: z.string().optional(),
  /** Seasonal availability notes */
  seasonalNotes: z.string().optional(),
}).refine(
  (data) => data.contact.phone || data.contact.website || data.contact.email,
  { message: "At least one contact method required" }
);

export type Outfitter = z.infer<typeof OutfitterSchema>;

/**
 * T-001: Rapid classification system.
 * Supports Class I-VI with optional modifiers (+) and ranges (III-IV).
 */
export const RapidClassSchema = z.union([
  z.enum(['I', 'II', 'III', 'IV', 'V', 'VI']),
  z.literal('II+'),
  z.literal('III+'),
  z.literal('IV+'),
  z.literal('V+'),
  z.literal('II-III'),
  z.literal('III-IV'),
  z.literal('IV-V'),
  z.literal('V-VI'),
]);

export type RapidClass = z.infer<typeof RapidClassSchema>;

/**
 * T-001: Individual rapid information.
 * Details for specific rapids including classification and hazards.
 */
export const RapidSchema = z.object({
  /** Rapid name (e.g., "Pillow Rock", "Lost Paddle") */
  name: z.string().min(1, "Rapid name required"),
  /** Rapid difficulty class */
  difficulty: RapidClassSchema,
  /** Description of the rapid */
  description: z.string().optional(),
  /** Known hazards (e.g., "undercut rocks", "strainer") */
  hazards: z.array(z.string().min(1)).max(10).optional(),
  /** When the rapid is runnable (e.g., "All water levels", "High water only") */
  runnable: z.string().optional(),
});

export type Rapid = z.infer<typeof RapidSchema>;

/**
 * T-002: River fishing information.
 * Fishing opportunities, species, seasons, and access points.
 */
export const RiverFishingSchema = z.object({
  /** Fish species available (e.g., "Smallmouth Bass", "Rainbow Trout") */
  species: z.array(z.string().min(1)).min(1, "At least one species required").max(15),
  /** Overall fishing quality rating (1-5 stars) */
  rating: z.number().min(0).max(5).optional(),
  /** Best fishing seasons */
  seasons: z.string().optional(),
  /** Fishing access points */
  accessPoints: z.array(z.object({
    name: z.string().min(1),
    description: z.string().min(1)
  })).optional(),
  /** Recommended fishing techniques */
  techniques: z.array(z.string()).optional(),
  /** Kim's personal fishing tip (renders in font-hand) */
  kimsTip: z.string().optional(),
});

export type RiverFishing = z.infer<typeof RiverFishingSchema>;

/**
 * T-004: Seasonal flow levels.
 * Water flow levels and conditions by season.
 */
export const SeasonalFlowSchema = z.enum(['Low', 'Medium', 'High', 'Flood']);

export type SeasonalFlow = z.infer<typeof SeasonalFlowSchema>;

/**
 * T-004: Seasonal flow details.
 * Extended seasonal flow information with CFS ranges and notes.
 */
export const SeasonalFlowDetailsSchema = z.object({
  /** Season name (e.g., "Spring", "Summer") */
  season: z.string().min(1),
  /** Flow level category */
  level: SeasonalFlowSchema,
  /** CFS range (e.g., "1000-2000 CFS") */
  cfsRange: z.string().optional(),
  /** Activities best suited for this flow level */
  bestFor: z.array(z.string()).optional(),
  /** Additional notes about this flow level */
  notes: z.string().optional(),
});

export type SeasonalFlowDetails = z.infer<typeof SeasonalFlowDetailsSchema>;

/**
 * T-005: River access point.
 * Put-in, take-out, and access point information.
 */
export const RiverAccessPointSchema = z.object({
  /** Access type */
  type: z.enum(['Public', 'Private', 'Commercial']),
  /** Location description */
  location: z.string().min(1, "Location required"),
  /** Distance from put-in (miles) */
  distance: z.number().min(0, "Distance must be non-negative"),
  /** Access point name (optional) */
  name: z.string().optional(),
  /** Available facilities (e.g., "Parking", "Restrooms", "Boat Ramp") */
  facilities: z.array(z.string()).optional(),
  /** GPS coordinates (optional) */
  coords: z.string().optional(),
  /** Shuttle service information */
  shuttleInfo: z.string().optional(),
});

export type RiverAccessPoint = z.infer<typeof RiverAccessPointSchema>;

/**
 * T-006: River safety information.
 * Safety guidelines and requirements categorized by topic.
 */
export const RiverSafetySchema = z.object({
  /** Safety category (e.g., "Required Equipment", "Hazards", "Emergency Contacts") */
  category: z.string().min(1, "Category required"),
  /** Safety items or guidelines for this category */
  items: z.array(z.string().min(1)).min(1, "At least one item required"),
});

export type RiverSafety = z.infer<typeof RiverSafetySchema>;

/**
 * T-007: Nearby attraction.
 * Points of interest near the river (campgrounds, restaurants, attractions).
 */
export const NearbyAttractionSchema = z.object({
  /** Attraction name */
  name: z.string().min(1, "Name required"),
  /** Attraction type (e.g., "Campground", "Restaurant", "State Park") */
  type: z.string().min(1, "Type required"),
  /** Distance from river (e.g., "2 miles", "15 minutes") */
  distance: z.string().min(1, "Distance required"),
  /** Attraction description */
  description: z.string().min(1, "Description required"),
});

export type NearbyAttraction = z.infer<typeof NearbyAttractionSchema>;

/**
 * Complete river adventure schema.
 * Full type definition for river adventure pages including all components.
 */
export const RiverAdventureSchema = z.object({
  /** River name */
  name: z.string().min(1, "River name required"),
  /** URL-safe slug */
  slug: z.string().min(1, "Slug required"),
  /** Location information */
  location: z.object({
    county: z.string().min(1),
    region: z.string().min(1),
  }),
  /** Adventure type (always "River" for river adventures) */
  type: z.literal('River'),
  /** Overall difficulty level */
  difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced', 'Expert']),
  /** Best seasons to visit */
  bestSeasons: z.array(z.enum(['Spring', 'Summer', 'Fall', 'Winter'])).min(1),
  /** Seasonal water levels */
  waterLevels: z.object({
    spring: SeasonalFlowSchema,
    summer: SeasonalFlowSchema,
    fall: SeasonalFlowSchema,
    winter: SeasonalFlowSchema,
  }),
  /** River description */
  description: z.string().min(10, "Description must be at least 10 characters"),
  /** Featured on homepage */
  featured: z.boolean().default(false),
  /** Notable rapids */
  rapids: z.array(RapidSchema).default([]),
  /** Commercial outfitters */
  outfitters: z.array(OutfitterSchema).default([]),
  /** Access points */
  access: z.array(RiverAccessPointSchema).default([]),
  /** Fishing information (optional) */
  fishing: RiverFishingSchema.optional(),
  /** Kim's personal tip (renders in font-hand) */
  kimsTip: z.string().optional(),
  /** Additional type notes (e.g., "Dam-controlled releases") */
  typeNotes: z.string().optional(),
  /** CFS range information */
  cfsRange: z.object({
    min: z.number().min(0),
    max: z.number().min(0),
    optimal: z.number().min(0),
  }).optional(),
  /** Safety information */
  safety: z.array(RiverSafetySchema).optional(),
  /** Nearby attractions */
  nearbyAttractions: z.array(NearbyAttractionSchema).optional(),
});

export type RiverAdventure = z.infer<typeof RiverAdventureSchema>;
