/**
 * State Park SEO Type Definitions
 * SPEC-18: Schema.org and SEO types for State Park Template
 *
 * Provides SEO-specific types for:
 * - OpeningHoursSpecification (seasonal hours)
 * - FAQPage schema (featured snippets)
 * - Event schema (ranger programs, festivals)
 * - AmenityFeature (LocationFeatureSpecification)
 * - ReserveAction (booking integration)
 * - ImageGallery and AggregateRating
 *
 * @module types/state-park-seo-types
 */

import { z } from 'astro/zod';
import { SeasonalHoursSchema, DailyHoursSchema, type SeasonalHours } from './state-park-types';

// ============================================================================
// OPENING HOURS SPECIFICATION
// ============================================================================

/**
 * OpeningHoursSpecification for Schema.org LocalBusiness.
 * Represents operating hours with seasonal variations.
 *
 * @see https://schema.org/OpeningHoursSpecification
 */
export const OpeningHoursSpecificationSchema = z.object({
  /** Schema.org type */
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

// ============================================================================
// FAQ ITEM SCHEMA
// ============================================================================

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

// ============================================================================
// EVENT SCHEMA
// ============================================================================

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

  /** Event schedule (for recurring events) */
  eventSchedule: z.string().optional(),

  /** Audience type */
  audience: z.object({
    '@type': z.literal('Audience').default('Audience'),
    audienceType: z.string(),
  }).optional(),
});

export type ParkEvent = z.infer<typeof ParkEventSchema>;

// ============================================================================
// EVENT SERIES SCHEMA
// ============================================================================

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

  /** Repeat frequency (Schema.org duration format) */
  repeatFrequency: z.string().optional(),  // E.g., "P1W" for weekly

  /** Duration */
  duration: z.string().optional(),  // E.g., "PT2H" for 2 hours

  /** Sub events */
  subEvent: z.array(ParkEventSchema).max(30).optional(),
});

export type EventSeries = z.infer<typeof EventSeriesSchema>;

// ============================================================================
// AMENITY FEATURE SCHEMA
// ============================================================================

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

// ============================================================================
// RESERVE ACTION SCHEMA
// ============================================================================

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

// ============================================================================
// IMAGE GALLERY SCHEMA
// ============================================================================

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
      /** Photo credit */
      creator: z.string().optional(),
      /** License info */
      license: z.string().url().optional(),
    })
  ).min(1).max(50),
});

export type ImageGallery = z.infer<typeof ImageGallerySchema>;

// ============================================================================
// REVIEW/RATING SCHEMA
// ============================================================================

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

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Convert seasonal park hours into Schema.org OpeningHoursSpecification entries.
 *
 * @param seasonalHours - Seasonal hours whose startDate and endDate are applied to each entry as validFrom and validThrough; day names are normalized to Schema.org dayOfWeek and any `'closed'` open/close value is converted to `'00:00'`.
 * @returns An array of OpeningHoursSpecification objects representing each day's normalized opening hours with validFrom/validThrough set from `seasonalHours`
 */
export function convertToOpeningHoursSpec(
  seasonalHours: SeasonalHours
): OpeningHoursSpecification[] {
  return seasonalHours.hours.map((dailyHours) => ({
    '@type': 'OpeningHoursSpecification' as const,
    dayOfWeek: [capitalizeFirst(dailyHours.day) as 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'],
    opens: dailyHours.open === 'closed' ? '00:00' : dailyHours.open,
    closes: dailyHours.close === 'closed' ? '00:00' : dailyHours.close,
    validFrom: seasonalHours.startDate,
    validThrough: seasonalHours.endDate,
  }));
}

/**
 * Builds a Schema.org FAQ `Question` item from a question and its answer.
 *
 * @param question - The question text.
 * @param answer - The answer text; 40–50 words is recommended for featured-snippet optimization.
 * @returns An `FAQItem` object with `@type: "Question"` and an `acceptedAnswer` containing the provided text.
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
 * Builds a LocationFeatureSpecification object representing an amenity or facility.
 *
 * @param name - Feature name (e.g., "Restrooms", "Picnic Areas")
 * @param value - Feature value; `true`/`false` for availability or a string for descriptive values
 * @param description - Optional human-readable description of the feature
 * @returns An AmenityFeatureSpecification object with `@type` set to `LocationFeatureSpecification`
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
 * Capitalizes the first character of a string.
 *
 * @returns The input string with its first character converted to uppercase; returns the original string if it is empty.
 */
function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Determine whether an FAQ answer's word count is suitable for featured-snippet consideration.
 *
 * @param answer - The answer text to evaluate
 * @returns `true` if the answer contains between 20 and 100 words inclusive, `false` otherwise.
 */
export function validateFAQAnswerLength(answer: string): boolean {
  const wordCount = answer.trim().split(/\s+/).length;
  return wordCount >= 20 && wordCount <= 100;  // Allow 20-100 words for flexibility
}

/**
 * Build a Schema.org EducationEvent representing a ranger program.
 *
 * The returned event uses `EducationEvent` as its `@type`, sets `name` and `description`
 * from the provided program, sets `location.name` to the given park name, and includes
 * default organizer, attendance mode, accessibility, and status values. The `startDate`
 * is set to the current time as a placeholder.
 *
 * @param program - Object containing `name`, `description`, and optional `schedule` (not used in the event fields)
 * @param parkName - Name of the park to use for the event location
 * @returns A `ParkEvent` object representing the ranger program with a placeholder `startDate` and default metadata
 */
export function rangerProgramToEvent(
  program: { name: string; description: string; schedule?: string },
  parkName: string
): ParkEvent {
  return {
    '@type': 'EducationEvent',
    name: program.name,
    description: program.description,
    startDate: new Date().toISOString(),  // Placeholder - should be actual date
    location: {
      '@type': 'Place',
      name: parkName,
    },
    organizer: {
      '@type': 'Organization',
      name: 'WV State Parks',
    },
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    isAccessibleForFree: true,
  };
}

/**
 * Build an ImageObject-like structure with optional caption, creator, and license metadata.
 *
 * @param url - URL of the image
 * @param caption - Optional caption or description for the image
 * @param creator - Optional name of the photographer or creator
 * @param license - Optional URL to the image license or usage terms
 * @returns An object representing an `ImageObject` with the provided fields
 */
export function createImageObject(
  url: string,
  caption?: string,
  creator?: string,
  license?: string
) {
  return {
    '@type': 'ImageObject' as const,
    url,
    caption,
    creator,
    license,
  };
}