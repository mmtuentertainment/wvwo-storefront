/**
 * State Park Template Props Type Definitions
 * SPEC-18: Complete composition schema for StateParkTemplate component
 *
 * Provides complete template props composition including:
 * - Hero section
 * - Park overview
 * - Facilities section
 * - Activities & programs
 * - Trail system
 * - Scenic overlooks
 * - Accessibility information
 * - Reservations & fees
 * - SEO metadata
 *
 * @module types/state-park-template-types
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
import {
  FacilityTypeSchema,
  AmenityTypeSchema,
  ProgramTypeSchema,
  ActivityTypeSchema,
  AccessibilityFeatureSchema,
  ParkOperatingHoursSchema,
  StateParkRegulationsSchema,
  CabinSchema,
  LodgeFacilitySchema,
  CampingFacilitySchema,
  PoolFacilitySchema,
  BoatLaunchSchema,
  VisitorCenterSchema,
  NatureCenterSchema,
  PicnicAreaSchema,
  PlaygroundSchema,
  AmphitheaterSchema,
  OtherFacilitySchema,
  RangerProgramSchema,
  WorkshopSchema,
  JuniorRangerProgramSchema,
  SpecialEventSchema,
  ActivitySchema,
  TrailAccessInfoSchema,
  ServiceAnimalPolicySchema,
  type FacilityType,
  type AmenityType,
  type ProgramType,
  type ActivityType,
  type AccessibilityFeature,
  type ParkOperatingHours,
  type StateParkRegulations,
  type Cabin,
  type LodgeFacility,
  type CampingFacility,
  type PoolFacility,
  type BoatLaunch,
  type VisitorCenter,
  type NatureCenter,
  type PicnicArea,
  type Playground,
  type Amphitheater,
  type OtherFacility,
  type RangerProgram,
  type Workshop,
  type JuniorRangerProgram,
  type SpecialEvent,
  type Activity,
  type TrailAccessInfo,
  type ServiceAnimalPolicy,
} from './state-park-types';
import {
  FAQItemSchema,
  ParkEventSchema,
  ImageGallerySchema,
  AggregateRatingSchema,
  type FAQItem,
  type ParkEvent,
  type ImageGallery,
  type AggregateRating,
} from './state-park-seo-types';

// Import backcountry types for trail reuse
import {
  BackcountryTrailSchema,
  type BackcountryTrail,
} from './backcountry-types';
import {
  TieredEmergencyContactSchema,
  type TieredEmergencyContact,
} from './backcountry-template-types';

// ============================================================================
// MANAGING AGENCY (State Parks Specific)
// ============================================================================

/**
 * Managing agency for state parks.
 * Extended from backcountry to include additional contact info.
 */
export const StateParkManagingAgencySchema = z.object({
  /** Agency name */
  name: z.string().min(1),
  /** Jurisdiction */
  jurisdiction: z.string().min(1),
  /** Contact phone */
  phone: z.string().optional(),
  /** Contact email */
  email: z.string().email().optional(),
  /** Website */
  website: z.string().url().optional(),
  /** Physical address */
  address: z.string().optional(),
});

export type StateParkManagingAgency = z.infer<typeof StateParkManagingAgencySchema>;

// ============================================================================
// HERO SECTION
// ============================================================================

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

  /** Year established */
  established: z.number().int().min(1800).max(2100).optional(),

  /** Signature feature (e.g., "60-foot waterfall") */
  signatureFeature: z.string().optional(),

  /** Quick highlights (3-5 items) */
  quickHighlights: z.array(z.string()).max(5).optional(),
});

export type StateParkHero = z.infer<typeof StateParkHeroSchema>;

// ============================================================================
// PARK OVERVIEW SECTION
// ============================================================================

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
  managingAgency: StateParkManagingAgencySchema,

  /** County */
  county: z.string().optional(),

  /** Region (e.g., "Mountain Lakes", "New River Gorge") */
  region: z.string().optional(),

  /** Coordinates */
  coordinates: CoordinatesSchema.optional(),

  /** Nearest town */
  nearestTown: z.string().optional(),

  /** Distance from major city */
  distanceFromCity: z.string().optional(),  // E.g., "2 hours from Charleston"
});

export type ParkOverview = z.infer<typeof ParkOverviewSchema>;

// ============================================================================
// FACILITIES SECTION
// ============================================================================

/**
 * Facilities section props.
 * Comprehensive facility listings by category.
 */
export const FacilitiesSectionSchema = z.object({
  /** Lodging (cabins and lodges) */
  lodging: z.object({
    cabins: z.array(CabinSchema).max(50).optional(),
    lodges: z.array(LodgeFacilitySchema).max(5).optional(),
  }).optional(),

  /** Camping facilities */
  camping: z.object({
    campgrounds: z.array(CampingFacilitySchema).max(10).optional(),
  }).optional(),

  /** Picnic areas */
  picnicAreas: z.array(PicnicAreaSchema).max(20).optional(),

  /** Visitor centers */
  visitorCenters: z.array(VisitorCenterSchema).max(5).optional(),

  /** Nature centers */
  natureCenters: z.array(NatureCenterSchema).max(5).optional(),

  /** Boat launches */
  boatLaunches: z.array(BoatLaunchSchema).max(10).optional(),

  /** Pools */
  pools: z.array(PoolFacilitySchema).max(5).optional(),

  /** Playgrounds */
  playgrounds: z.array(PlaygroundSchema).max(10).optional(),

  /** Amphitheaters */
  amphitheaters: z.array(AmphitheaterSchema).max(5).optional(),

  /** Other amenities */
  otherAmenities: z.array(OtherFacilitySchema).max(30).optional(),
});

export type FacilitiesSection = z.infer<typeof FacilitiesSectionSchema>;

// ============================================================================
// ACTIVITIES & PROGRAMS SECTION
// ============================================================================

/**
 * Activities and programs section props.
 */
export const ActivitiesProgramsSchema = z.object({
  /** Ranger-led programs */
  rangerPrograms: z.array(RangerProgramSchema).max(30).optional(),

  /** Educational programs */
  educationalPrograms: z.array(WorkshopSchema).max(30).optional(),

  /** Junior Ranger program */
  juniorRanger: JuniorRangerProgramSchema.optional(),

  /** Special events */
  specialEvents: z.array(SpecialEventSchema).max(30).optional(),

  /** Recreational activities */
  recreationalActivities: z.array(ActivitySchema).max(30).optional(),
});

export type ActivitiesPrograms = z.infer<typeof ActivitiesProgramsSchema>;

// ============================================================================
// TRAIL SYSTEM SECTION
// ============================================================================

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

      /** Accessibility features (FSTAG info) */
      accessibilityInfo: TrailAccessInfoSchema.optional(),

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

// ============================================================================
// SCENIC OVERLOOKS SECTION
// ============================================================================

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

    /** Elevation */
    elevation: z.string().optional(),
  })).max(20).optional(),
});

export type ScenicOverlooks = z.infer<typeof ScenicOverlooksSchema>;

// ============================================================================
// ACCESSIBILITY SECTION
// ============================================================================

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

  /** Service animal policy */
  serviceAnimalPolicy: ServiceAnimalPolicySchema.optional(),

  /** Advance notice requirements */
  advanceNoticeRequired: z.boolean().default(false),

  /** Advance notice details */
  advanceNoticeDetails: z.string().optional(),

  /** Contact for accommodations */
  accommodationsContact: z.string().optional(),
});

export type AccessibilitySection = z.infer<typeof AccessibilitySectionSchema>;

// ============================================================================
// RESERVATIONS SECTION
// ============================================================================

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

  /** General booking contact */
  generalContact: z.object({
    phone: z.string().optional(),  // E.g., "1-833-WV-PARKS"
    url: z.string().url().optional(),
  }).optional(),
});

export type ReservationsSection = z.infer<typeof ReservationsSectionSchema>;

// ============================================================================
// NEARBY ATTRACTION SCHEMA
// ============================================================================

/**
 * Nearby attraction for multi-day trip planning.
 */
export const NearbyAttractionSchema = z.object({
  /** Attraction name */
  name: z.string().min(1),

  /** Attraction type */
  type: z.string().optional(),  // E.g., "State Park", "Historic Site", "Restaurant"

  /** Distance from park */
  distance: z.string(),  // E.g., "5 miles", "30 min drive"

  /** Brief description */
  description: z.string().min(1),

  /** Optional website or contact info */
  link: z.string().url().optional(),
});

export type NearbyAttraction = z.infer<typeof NearbyAttractionSchema>;

// ============================================================================
// RELATED CATEGORY SCHEMA
// ============================================================================

/**
 * Related category for cross-linking.
 */
export const RelatedCategorySchema = z.object({
  /** Category name */
  name: z.string().min(1),

  /** Category slug */
  slug: z.string().min(1),

  /** Brief description */
  description: z.string().optional(),
});

export type RelatedCategory = z.infer<typeof RelatedCategorySchema>;

// ============================================================================
// COMPLETE TEMPLATE PROPS SCHEMA
// ============================================================================

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

    /** Keywords */
    keywords: z.array(z.string()).max(20).optional(),
  }).optional(),

  /** Emergency contacts */
  emergencyContacts: z.array(TieredEmergencyContactSchema).min(1).optional(),

  /** Nearby attractions */
  nearbyAttractions: z.array(NearbyAttractionSchema).max(10).optional(),

  /** Related categories */
  relatedCategories: z.array(RelatedCategorySchema).max(5).optional(),

  /** Show related shop products */
  showRelatedShop: z.boolean().default(true),
});

export type StateParkTemplateProps = z.infer<typeof StateParkTemplatePropsSchema>;

// ============================================================================
// TYPE GUARDS
// ============================================================================

/**
 * Determines whether a value conforms to the StateParkTemplateProps shape.
 *
 * @param adventure - The value to test for the StateParkTemplateProps structure
 * @returns `true` if `adventure` has the required `hero`, `overview`, and `regulations` fields, `false` otherwise
 */
export function isStateParkTemplate(adventure: any): adventure is StateParkTemplateProps {
  if (!adventure) return false;
  if (!adventure.hero) return false;
  if (!adventure.overview) return false;
  if (!adventure.regulations) return false;
  return true;
}

/**
 * Determine whether the park defines any accessibility features.
 *
 * @param park - The state park template props to inspect
 * @returns `true` if `park.accessibility.features` exists and has at least one item, `false` otherwise
 */
export function hasAccessibleFacilities(park: StateParkTemplateProps): boolean {
  return (
    park.accessibility?.features !== undefined &&
    park.accessibility.features.length > 0
  );
}

/**
 * Determine whether the park includes lodging.
 *
 * @returns `true` if the park defines cabins or lodges, `false` otherwise.
 */
export function hasLodging(park: StateParkTemplateProps): boolean {
  return (
    park.facilities?.lodging?.cabins !== undefined ||
    park.facilities?.lodging?.lodges !== undefined
  );
}

/**
 * Determines whether the park includes one or more campgrounds.
 *
 * @param park - State park template props to inspect
 * @returns `true` if the park has one or more campgrounds, `false` otherwise.
 */
export function hasCamping(park: StateParkTemplateProps): boolean {
  return (
    park.facilities?.camping?.campgrounds !== undefined &&
    park.facilities.camping.campgrounds.length > 0
  );
}

/**
 * Determines whether the park includes water-related facilities or activities.
 *
 * @returns `true` if the park has pools, boat launches, or recreational activities of type `'swimming'`, `'boating'`, or `'fishing'`, `false` otherwise.
 */
export function hasWaterActivities(park: StateParkTemplateProps): boolean {
  return (
    park.facilities?.pools !== undefined ||
    park.facilities?.boatLaunches !== undefined ||
    park.activitiesPrograms?.recreationalActivities?.some(
      (a) => a.type === 'swimming' || a.type === 'boating' || a.type === 'fishing'
    ) === true
  );
}