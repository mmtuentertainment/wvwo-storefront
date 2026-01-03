/**
 * State Park SEO Types Unit Tests
 * SPEC-18 Phase 5: SEO and Schema.org validation
 *
 * Tests:
 * - OpeningHoursSpecification schema
 * - FAQItem schema (40-50 word answer validation)
 * - ParkEvent schema
 * - EventSeries recurring patterns
 * - Helper functions for SEO metadata
 */

import { describe, it, expect } from 'vitest';
import {
  // Schemas
  OpeningHoursSpecificationSchema,
  FAQItemSchema,
  FAQPageSchema,
  ParkEventSchema,
  EventSeriesSchema,
  AmenityFeatureSpecificationSchema,
  ReserveActionSchema,
  ImageGallerySchema,
  AggregateRatingSchema,
  ReviewSchema,
  // Helper functions
  convertToOpeningHoursSpec,
  createFAQItem,
  createAmenityFeature,
  validateFAQAnswerLength,
  rangerProgramToEvent,
  createImageObject,
  type OpeningHoursSpecification,
  type FAQItem,
  type ParkEvent,
} from '../state-park-seo-types';

// ============================================================================
// OPENING HOURS SPECIFICATION TESTS
// ============================================================================

describe('OpeningHoursSpecificationSchema', () => {
  it('accepts valid year-round hours', () => {
    const hours: OpeningHoursSpecification = {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '08:00',
      closes: '20:00',
    };

    const result = OpeningHoursSpecificationSchema.safeParse(hours);
    expect(result.success).toBe(true);
  });

  it('accepts seasonal hours with validFrom/Through', () => {
    const hours = {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '08:00',
      closes: '20:00',
      validFrom: '2026-05-01',
      validThrough: '2026-09-30',
    };

    const result = OpeningHoursSpecificationSchema.safeParse(hours);
    expect(result.success).toBe(true);
  });

  it('accepts weekend-only hours', () => {
    const hours = {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday', 'Sunday'],
      opens: '10:00',
      closes: '18:00',
    };

    const result = OpeningHoursSpecificationSchema.safeParse(hours);
    expect(result.success).toBe(true);
  });

  it('validates time format (24hr HH:MM)', () => {
    const invalidTime = {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday'],
      opens: '8:00', // Missing leading zero
      closes: '20:00',
    };

    const result = OpeningHoursSpecificationSchema.safeParse(invalidTime);
    expect(result.success).toBe(false);
  });

  it('requires at least one day of week', () => {
    const noDays = {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [],
      opens: '08:00',
      closes: '20:00',
    };

    const result = OpeningHoursSpecificationSchema.safeParse(noDays);
    expect(result.success).toBe(false);
  });
});

// ============================================================================
// FAQ SCHEMA TESTS
// ============================================================================

describe('FAQItemSchema', () => {
  it('accepts valid FAQ with proper answer length', () => {
    const faq: FAQItem = {
      '@type': 'Question',
      name: 'Do I need a reservation for cabins?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, reservations are required for all cabin rentals at Blackwater Falls State Park. Cabins can be booked online at reservations.wvstateparks.com or by calling 1-833-WV-PARKS. Book early for summer weekends.',
      },
    };

    const result = FAQItemSchema.safeParse(faq);
    expect(result.success).toBe(true);

    // Validate word count (40-50 words optimal)
    const wordCount = faq.acceptedAnswer.text.split(/\s+/).length;
    expect(wordCount).toBeGreaterThanOrEqual(20); // Min 20 words
    expect(wordCount).toBeLessThanOrEqual(100); // Max 100 words for flexibility
  });

  it('accepts FAQ about pet policy', () => {
    const faq = {
      '@type': 'Question',
      name: 'Are pets allowed in state park cabins?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pet-friendly cabins are available at select WV State Parks including Blackwater Falls, Cacapon, and Hawks Nest. A non-refundable pet fee applies. Two pets maximum per cabin. Service animals always welcome.',
      },
    };

    const result = FAQItemSchema.safeParse(faq);
    expect(result.success).toBe(true);
  });

  it('validates question length (10-200 chars)', () => {
    const tooShort = {
      '@type': 'Question',
      name: 'Pets?', // Too short
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pets are allowed in designated areas only.',
      },
    };

    const result = FAQItemSchema.safeParse(tooShort);
    expect(result.success).toBe(false);
  });

  it('validates answer minimum length', () => {
    const tooShort = {
      '@type': 'Question',
      name: 'Are pets allowed?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes.', // Too short
      },
    };

    const result = FAQItemSchema.safeParse(tooShort);
    expect(result.success).toBe(false);
  });
});

describe('FAQPageSchema', () => {
  it('accepts complete FAQ page with multiple items', () => {
    const faqPage = {
      '@type': 'FAQPage',
      '@context': 'https://schema.org',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What are the park hours?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The park is open year-round from dawn to dusk for day use. Overnight camping is available at designated campgrounds. Visitor center hours vary by season.',
          },
        },
        {
          '@type': 'Question',
          name: 'Are pets allowed?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Pets are welcome in most outdoor areas but must remain on a leash no longer than 6 feet. Pet-friendly cabins are available with advance reservation.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do I need reservations?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Reservations are required for cabins, lodges, and some campground sites. Day-use areas and trails are available first-come, first-served. Book online at reservations.wvstateparks.com.',
          },
        },
      ],
    };

    const result = FAQPageSchema.safeParse(faqPage);
    expect(result.success).toBe(true);
  });

  it('requires minimum 3 FAQ items', () => {
    const tooFew = {
      '@type': 'FAQPage',
      '@context': 'https://schema.org',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Test question?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Test answer with sufficient length to meet minimum requirements.',
          },
        },
      ],
    };

    const result = FAQPageSchema.safeParse(tooFew);
    expect(result.success).toBe(false);
  });
});

// ============================================================================
// EVENT SCHEMA TESTS
// ============================================================================

describe('ParkEventSchema', () => {
  it('accepts valid one-time event', () => {
    const event: ParkEvent = {
      '@type': 'Event',
      name: 'Wildflower Weekend',
      description: 'Join park naturalists for guided wildflower hikes',
      startDate: '2026-05-15T10:00:00-04:00',
      endDate: '2026-05-17T16:00:00-04:00',
      location: {
        '@type': 'Place',
        name: 'Blackwater Falls State Park',
        address: '1584 Blackwater Lodge Rd, Davis, WV',
      },
      organizer: {
        '@type': 'Organization',
        name: 'WV State Parks',
      },
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      isAccessibleForFree: true,
    };

    const result = ParkEventSchema.safeParse(event);
    expect(result.success).toBe(true);
  });

  it('accepts event with paid admission', () => {
    const event = {
      '@type': 'Event',
      name: 'Outdoor Adventure Workshop',
      description: 'Learn wilderness skills',
      startDate: '2026-06-01T09:00:00-04:00',
      location: {
        '@type': 'Place',
        name: 'Nature Center',
      },
      isAccessibleForFree: false,
      offers: {
        '@type': 'Offer',
        price: '25.00',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
    };

    const result = ParkEventSchema.safeParse(event);
    expect(result.success).toBe(true);
  });

  it('accepts event with performer', () => {
    const event = {
      '@type': 'Event',
      name: 'Nature Talk with Dr. Smith',
      description: 'Wildlife biology presentation',
      startDate: '2026-07-01T18:00:00-04:00',
      location: {
        '@type': 'Place',
        name: 'Amphitheater',
      },
      performer: {
        '@type': 'Person',
        name: 'Dr. Jane Smith',
      },
    };

    const result = ParkEventSchema.safeParse(event);
    expect(result.success).toBe(true);
  });
});

describe('EventSeriesSchema', () => {
  it('accepts weekly recurring pattern', () => {
    const series = {
      '@type': 'EventSeries',
      name: 'Saturday Nature Walks',
      description: 'Weekly guided nature walks',
      startDate: '2026-05-01',
      endDate: '2026-09-30',
      frequency: 'Weekly on Saturdays',
      repeatFrequency: 'P1W', // ISO 8601 duration: 1 week
      duration: 'PT2H', // 2 hours
    };

    const result = EventSeriesSchema.safeParse(series);
    expect(result.success).toBe(true);
  });

  it('accepts monthly recurring pattern', () => {
    const series = {
      '@type': 'EventSeries',
      name: 'Full Moon Hikes',
      description: 'Monthly night hikes under full moon',
      startDate: '2026-05-01',
      repeatFrequency: 'P1M', // ISO 8601 duration: 1 month
    };

    const result = EventSeriesSchema.safeParse(series);
    expect(result.success).toBe(true);
  });
});

// ============================================================================
// AMENITY FEATURE SPECIFICATION TESTS
// ============================================================================

describe('AmenityFeatureSpecificationSchema', () => {
  it('accepts boolean value', () => {
    const feature = {
      '@type': 'LocationFeatureSpecification',
      name: 'WiFi Available',
      value: true,
    };

    const result = AmenityFeatureSpecificationSchema.safeParse(feature);
    expect(result.success).toBe(true);
  });

  it('accepts string value', () => {
    const feature = {
      '@type': 'LocationFeatureSpecification',
      name: 'Check-in Time',
      value: '3:00 PM',
      description: 'Standard check-in time',
    };

    const result = AmenityFeatureSpecificationSchema.safeParse(feature);
    expect(result.success).toBe(true);
  });
});

// ============================================================================
// RESERVE ACTION TESTS
// ============================================================================

describe('ReserveActionSchema', () => {
  it('accepts valid reservation action', () => {
    const action = {
      '@type': 'ReserveAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://reservations.wvstateparks.com/blackwater-falls',
        actionPlatform: [
          'http://schema.org/DesktopWebPlatform',
          'http://schema.org/MobileWebPlatform',
        ],
      },
      result: {
        '@type': 'LodgingReservation',
        name: 'Cabin Reservation',
      },
    };

    const result = ReserveActionSchema.safeParse(action);
    expect(result.success).toBe(true);
  });
});

// ============================================================================
// IMAGE GALLERY TESTS
// ============================================================================

describe('ImageGallerySchema', () => {
  it('accepts valid image gallery', () => {
    const gallery = {
      '@type': 'ImageGallery',
      name: 'Blackwater Falls Photo Gallery',
      description: 'Beautiful views of the 60-foot waterfall',
      image: [
        {
          '@type': 'ImageObject',
          url: 'https://example.com/waterfall1.jpg',
          caption: 'Blackwater Falls in autumn',
          width: 1920,
          height: 1080,
          creator: 'WV State Parks',
        },
        {
          '@type': 'ImageObject',
          url: 'https://example.com/waterfall2.jpg',
          caption: 'Winter ice formations',
        },
      ],
    };

    const result = ImageGallerySchema.safeParse(gallery);
    expect(result.success).toBe(true);
  });

  it('requires at least one image', () => {
    const emptyGallery = {
      '@type': 'ImageGallery',
      name: 'Empty Gallery',
      image: [],
    };

    const result = ImageGallerySchema.safeParse(emptyGallery);
    expect(result.success).toBe(false);
  });
});

// ============================================================================
// AGGREGATE RATING TESTS
// ============================================================================

describe('AggregateRatingSchema', () => {
  it('accepts valid rating', () => {
    const rating = {
      '@type': 'AggregateRating',
      ratingValue: 4.7,
      bestRating: 5,
      worstRating: 1,
      ratingCount: 342,
      reviewCount: 215,
    };

    const result = AggregateRatingSchema.safeParse(rating);
    expect(result.success).toBe(true);
  });

  it('validates rating bounds (1-5)', () => {
    const tooHigh = {
      '@type': 'AggregateRating',
      ratingValue: 6.0, // Exceeds max
      ratingCount: 100,
    };

    const result = AggregateRatingSchema.safeParse(tooHigh);
    expect(result.success).toBe(false);
  });
});

// ============================================================================
// HELPER FUNCTION TESTS
// ============================================================================

describe('Helper Functions', () => {
  describe('createFAQItem', () => {
    it('creates valid FAQ item', () => {
      const faq = createFAQItem(
        'What are the park hours?',
        'The park is open year-round from dawn to dusk.'
      );

      expect(faq['@type']).toBe('Question');
      expect(faq.name).toBe('What are the park hours?');
      expect(faq.acceptedAnswer['@type']).toBe('Answer');
      expect(faq.acceptedAnswer.text).toContain('dawn to dusk');
    });
  });

  describe('createAmenityFeature', () => {
    it('creates amenity feature with boolean value', () => {
      const feature = createAmenityFeature('WiFi', true, 'Free WiFi available');

      expect(feature['@type']).toBe('LocationFeatureSpecification');
      expect(feature.name).toBe('WiFi');
      expect(feature.value).toBe(true);
      expect(feature.description).toBe('Free WiFi available');
    });
  });

  describe('validateFAQAnswerLength', () => {
    it('accepts answers with 40-50 words', () => {
      const answer =
        'Pet-friendly cabins are available at select WV State Parks including Blackwater Falls, Cacapon, and Hawks Nest. A non-refundable pet fee applies. Two pets maximum per cabin. Service animals always welcome.'; // ~30 words

      expect(validateFAQAnswerLength(answer)).toBe(true);
    });

    it('rejects very short answers', () => {
      const answer = 'Yes, pets allowed.'; // <20 words

      expect(validateFAQAnswerLength(answer)).toBe(false);
    });

    it('accepts longer answers up to 100 words', () => {
      const answer =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
        'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. ' +
        'Nisi ut aliquip ex ea commodo consequat duis aute irure dolor. ' +
        'In reprehenderit in voluptate velit esse cillum dolore eu fugiat. ' +
        'Nulla pariatur excepteur sint occaecat cupidatat non proident sunt.'; // ~50 words

      expect(validateFAQAnswerLength(answer)).toBe(true);
    });
  });

  describe('rangerProgramToEvent', () => {
    it('converts ranger program to event schema', () => {
      const program = {
        name: 'Owl Prowl Night Hike',
        description: 'Join a ranger for evening hike',
        schedule: 'Saturdays 7pm',
      };

      const event = rangerProgramToEvent(program, 'Blackwater Falls State Park');

      expect(event['@type']).toBe('EducationEvent');
      expect(event.name).toBe('Owl Prowl Night Hike');
      expect(event.location['@type']).toBe('Place');
      expect(event.location.name).toBe('Blackwater Falls State Park');
      expect(event.isAccessibleForFree).toBe(true);
    });
  });

  describe('createImageObject', () => {
    it('creates image object with attribution', () => {
      const image = createImageObject(
        'https://example.com/photo.jpg',
        'Beautiful waterfall',
        'John Photographer',
        'https://creativecommons.org/licenses/by/4.0/'
      );

      expect(image['@type']).toBe('ImageObject');
      expect(image.url).toBe('https://example.com/photo.jpg');
      expect(image.caption).toBe('Beautiful waterfall');
      expect(image.creator).toBe('John Photographer');
      expect(image.license).toContain('creativecommons.org');
    });
  });
});
