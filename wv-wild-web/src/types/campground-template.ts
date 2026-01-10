/**
 * Campground Template Type System
 * Complete type definitions for CampgroundTemplate component
 *
 * This module contains all types specific to campground adventure pages:
 * - Campsite categories with hookups and fees
 * - Campground amenities and facilities
 * - Nearby activities accessible from campground
 * - Reservation policies and seasonal dates
 * - Contact information
 *
 * Part of adventure.ts modular split (SPEC-24 compliance)
 * @module types/campground-template
 */

import { z } from 'astro/zod';
import {
  DifficultySchema,
  SeasonSchema,
  CoordinatesSchema,
  StatItemSchema,
  type Difficulty,
  type Season,
  type Coordinates,
  type StatItem,
} from './adventure-core';
import { GearItemSchema, RelatedCategorySchema, type GearItem, type RelatedCategory } from './adventure-shared';

// ============================================================================
// SPEC-21-A: Campground Template Type System
// ============================================================================

/**
 * Campsite category with count and amenities.
 * Represents a type of campsite (full hookup, electric, primitive).
 */
export const CampsiteCategorySchema = z.object({
  /** Category name (e.g., "Full Hookup", "Electric Only", "Primitive") */
  name: z.string().min(1),
  /** Number of sites in this category */
  count: z.number().int().nonnegative(),
  /** Hookup/amenity details (e.g., "Water, electric (50 amp), sewer") */
  amenities: z.string().min(1),
  /** Nightly fee or fee range (e.g., "$34-$46/night") */
  fee: z.string().optional(),
});

export type CampsiteCategory = z.infer<typeof CampsiteCategorySchema>;

/**
 * Campground amenity with availability status.
 * Represents facilities like restrooms, showers, laundry, etc.
 */
export const CampgroundAmenitySchema = z.object({
  /** Amenity name (e.g., "Restrooms", "Hot Showers", "Dump Station") */
  name: z.string().min(1),
  /** Description or details */
  description: z.string().min(1),
  /** Availability status */
  available: z.boolean().default(true),
  /** Accessibility features (optional) */
  accessibility: z.string().optional(),
});

export type CampgroundAmenity = z.infer<typeof CampgroundAmenitySchema>;

/**
 * Nearby activity accessible from campground.
 * Includes distance, description, and optional link.
 */
export const NearbyActivitySchema = z.object({
  /** Activity name (e.g., "Bulltown Historic Area", "Boat Ramp", "Swimming Beach") */
  name: z.string().min(1),
  /** Distance from campground (e.g., "Adjacent", "1 mile", "Walking distance") */
  distance: z.string(),
  /** Activity description */
  description: z.string().min(1),
  /** Best season or hours (optional) */
  season: z.string().optional(),
  /** External link (optional) */
  link: z.string().url().optional(),
});

export type NearbyActivity = z.infer<typeof NearbyActivitySchema>;

/**
 * Reservation policy details.
 * Covers reservation system, check-in/out, stay limits, pets, etc.
 */
export const ReservationPolicySchema = z.object({
  /** Policy category (e.g., "Reservations", "Check-In", "Pets", "Stay Limit") */
  category: z.string().min(1),
  /** Policy details */
  details: z.string().min(1),
  /** Whether this is a critical rule to highlight */
  important: z.boolean().optional().default(false),
});

export type ReservationPolicy = z.infer<typeof ReservationPolicySchema>;

/**
 * Contact information for campground.
 * Includes phone, address, and booking URLs.
 */
export const CampgroundContactSchema = z.object({
  /** Contact type (e.g., "Campground Direct", "Reservations", "Lake Office") */
  type: z.string().min(1),
  /** Phone number */
  phone: z.string().optional(),
  /** Physical address (optional) */
  address: z.string().optional(),
  /** Website or booking URL (optional) */
  url: z.string().url().optional(),
});

export type CampgroundContact = z.infer<typeof CampgroundContactSchema>;

/**
 * Seasonal operating dates.
 * Defines when campground is open and peak vs off-peak periods.
 */
export const SeasonalDatesSchema = z.object({
  /** Season period (e.g., "Peak Season", "Off-Peak Spring", "Winter Closure") */
  period: z.string().min(1),
  /** Date range (e.g., "May 25 - September 3", "April 14 - May 24") */
  dates: z.string().min(1),
  /** Booking status (e.g., "Reservations via Recreation.gov", "First-come, first-served", "CLOSED") */
  bookingStatus: z.string().min(1),
});

export type SeasonalDates = z.infer<typeof SeasonalDatesSchema>;

/**
 * Campground template props interface.
 * Complete type definition for CampgroundTemplate component.
 */
export interface CampgroundTemplateProps {
  // Hero section (required)
  /** Campground name (e.g., "Bulltown Campground") */
  name: string;
  /** Hero image src */
  image: string;
  /** Hero image alt text */
  imageAlt: string;
  /** Brief tagline or subtitle */
  tagline: string;
  /** Full campground description (rendered as prose) */
  description: string;
  /** Quick stats for hero section */
  stats: StatItem[];

  // Campground metadata
  /** Total number of campsites */
  totalSites: number;
  /** Managing agency (e.g., "U.S. Army Corps of Engineers") */
  managingAgency: string;
  /** Recreation.gov ID for booking link */
  recreationGovId: string;
  /** County location */
  county: string;
  /** Nearby lake name for cross-linking */
  nearbyLake: string;
  /** Quick highlights for badges */
  quickHighlights: string[];

  // Content sections
  /** Campsite categories with counts and fees */
  campsites: CampsiteCategory[];
  /** Available amenities */
  amenities: CampgroundAmenity[];
  /** Nearby activities and attractions */
  nearbyActivities: NearbyActivity[];
  /** Reservation policies and rules */
  policies: ReservationPolicy[];
  /** Contact information */
  contacts: CampgroundContact[];
  /** Seasonal operating dates */
  seasonalDates: SeasonalDates[];
  /** Recommended gear checklist */
  gearList: GearItem[];
  /** Related shop categories */
  relatedShop: RelatedCategory[];

  // Optional metadata
  /** Difficulty level for accessibility */
  difficulty?: Difficulty;
  /** Best season to visit */
  bestSeason?: Season;
  /** GPS coordinates for campground entrance */
  coordinates?: Coordinates;
  /** Directions from I-79 or major highway */
  directions?: string;
  /** Cell service availability note */
  cellService?: string;
  /** Maximum RV length (if applicable) */
  maxRvLength?: string;
}

/**
 * Type guard to check if an adventure is a Campground.
 * Enables conditional rendering of Campground-specific components.
 *
 * @param adventure - CollectionEntry from Astro Content Collections
 * @returns true if adventure.data.type === 'campground'
 */
export function isCampgroundAdventure(adventure: unknown): boolean {
  return (
    typeof adventure === 'object' &&
    adventure !== null &&
    'data' in adventure &&
    typeof (adventure as { data: unknown }).data === 'object' &&
    (adventure as { data: unknown }).data !== null &&
    'type' in (adventure as { data: object }).data &&
    (adventure as { data: { type: unknown } }).data.type === 'campground'
  );
}
