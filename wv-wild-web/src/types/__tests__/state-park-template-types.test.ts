/**
 * State Park Template Types Unit Tests
 * SPEC-18 Phase 5: Template composition validation
 *
 * Tests:
 * - StateParkTemplateProps optional/required fields
 * - Nested object validation
 * - Default values
 * - Array validation
 * - Type guards
 */

import { describe, it, expect } from 'vitest';
import {
  StateParkTemplatePropsSchema,
  StateParkHeroSchema,
  ParkOverviewSchema,
  FacilitiesSectionSchema,
  ActivitiesProgramsSchema,
  TrailSystemSchema,
  AccessibilitySectionSchema,
  ReservationsSectionSchema,
  isStateParkTemplate,
  hasAccessibleFacilities,
  hasLodging,
  hasCamping,
  hasWaterActivities,
  type StateParkTemplateProps,
} from '../state-park-template-types';

// ============================================================================
// MINIMAL VALID TEMPLATE
// ============================================================================

const minimalValidTemplate = {
  hero: {
    name: 'Test State Park',
    heroImage: '/images/test-park.jpg',
    imagePosition: 'center' as const,
  },
  overview: {
    operatingHours: {
      general: 'Dawn to Dusk',
      overnightCamping: true,
    },
    contact: {
      phone: '1-833-WV-PARKS',
      email: 'info@wvstateparks.com',
    },
    managingAgency: {
      name: 'WV State Parks',
      jurisdiction: 'West Virginia',
    },
  },
  regulations: {
    pets: {
      allowed: true,
      leashRequired: true,
    },
    fires: {
      allowed: true,
      restrictions: ['Fire pits only'],
    },
  },
};

// ============================================================================
// TEMPLATE PROPS VALIDATION TESTS
// ============================================================================

describe('StateParkTemplatePropsSchema', () => {
  it('accepts minimal valid props', () => {
    const result = StateParkTemplatePropsSchema.safeParse(minimalValidTemplate);
    expect(result.success).toBe(true);
  });

  it('requires hero section', () => {
    const { hero, ...without } = minimalValidTemplate;
    const result = StateParkTemplatePropsSchema.safeParse(without);
    expect(result.success).toBe(false);
  });

  it('requires overview section', () => {
    const { overview, ...without } = minimalValidTemplate;
    const result = StateParkTemplatePropsSchema.safeParse(without);
    expect(result.success).toBe(false);
  });

  it('requires regulations section', () => {
    const { regulations, ...without } = minimalValidTemplate;
    const result = StateParkTemplatePropsSchema.safeParse(without);
    expect(result.success).toBe(false);
  });
});

// ============================================================================
// OPTIONAL FIELDS TESTS
// ============================================================================

describe('Optional Fields', () => {
  it('accepts template with all optional sections', () => {
    const fullTemplate = {
      ...minimalValidTemplate,
      facilities: {
        lodging: {
          cabins: [
            {
              cabinNumber: 'Cabin 1',
              bedrooms: 2,
              bathrooms: 1,
              maxOccupancy: 6,
              kitchenType: 'full' as const,
            },
          ],
        },
      },
      activitiesPrograms: {
        rangerPrograms: [
          {
            name: 'Nature Walk',
            type: 'ranger_led' as const,
            description: 'Guided nature walk',
          },
        ],
      },
      trails: {
        totalMileage: 10,
        trails: [
          {
            name: 'Test Trail',
            length: 2.5,
            difficulty: 'moderate' as const,
            trailType: 'loop' as const,
          },
        ],
      },
      accessibility: {
        features: ['accessible_trail' as const],
      },
      reservations: {
        cabins: {
          bookingUrl: 'https://reservations.wvstateparks.com',
        },
      },
      seo: {
        title: 'Test State Park - Beautiful West Virginia Nature',
        description:
          'Discover Test State Park in West Virginia. Enjoy camping, hiking, and family-friendly outdoor recreation in the Mountain State. Book your adventure today!',
      },
    };

    const result = StateParkTemplatePropsSchema.safeParse(fullTemplate);
    expect(result.success).toBe(true);
  });

  it('accepts template without optional sections', () => {
    const result = StateParkTemplatePropsSchema.safeParse(minimalValidTemplate);
    expect(result.success).toBe(true);
  });
});

// ============================================================================
// HERO SECTION TESTS
// ============================================================================

describe('StateParkHeroSchema', () => {
  it('requires name and heroImage', () => {
    const minimal = {
      name: 'Blackwater Falls State Park',
      heroImage: '/images/blackwater-hero.jpg',
    };

    const result = StateParkHeroSchema.safeParse(minimal);
    expect(result.success).toBe(true);
  });

  it('accepts optional fields', () => {
    const full = {
      name: 'Blackwater Falls State Park',
      heroImage: '/images/blackwater-hero.jpg',
      imagePosition: 'top' as const,
      tagline: 'Home of the 62-foot Blackwater Falls',
      acreage: 2358,
      established: 1937,
      signatureFeature: '62-foot waterfall',
      quickHighlights: ['Cabins', 'Camping', 'Swimming Pool'],
    };

    const result = StateParkHeroSchema.safeParse(full);
    expect(result.success).toBe(true);
  });

  it('validates imagePosition enum', () => {
    const invalid = {
      name: 'Test Park',
      heroImage: '/test.jpg',
      imagePosition: 'left', // Invalid value
    };

    const result = StateParkHeroSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });

  it('limits quick highlights to 5 items', () => {
    const tooMany = {
      name: 'Test Park',
      heroImage: '/test.jpg',
      quickHighlights: ['1', '2', '3', '4', '5', '6'], // Exceeds max 5
    };

    const result = StateParkHeroSchema.safeParse(tooMany);
    expect(result.success).toBe(false);
  });
});

// ============================================================================
// PARK OVERVIEW TESTS
// ============================================================================

describe('ParkOverviewSchema', () => {
  it('requires operating hours, contact, and managing agency', () => {
    const minimal = {
      operatingHours: {
        general: 'Dawn to Dusk',
      },
      contact: {
        phone: '1-833-WV-PARKS',
      },
      managingAgency: {
        name: 'WV State Parks',
        jurisdiction: 'West Virginia',
      },
    };

    const result = ParkOverviewSchema.safeParse(minimal);
    expect(result.success).toBe(true);
  });

  it('accepts optional fields', () => {
    const full = {
      operatingHours: {
        general: 'Dawn to Dusk',
        overnightCamping: true,
      },
      contact: {
        phone: '1-833-WV-PARKS',
        email: 'info@wvstateparks.com',
        address: '1584 Blackwater Lodge Rd, Davis, WV 26260',
      },
      managingAgency: {
        name: 'WV State Parks',
        jurisdiction: 'West Virginia',
        phone: '1-833-WV-PARKS',
        email: 'parks@wv.gov',
        website: 'https://wvstateparks.com',
      },
      county: 'Tucker County',
      region: 'Mountain Lakes',
      coordinates: {
        lat: 39.1117,
        lng: -79.4883,
      },
      nearestTown: 'Davis, WV',
      distanceFromCity: '2 hours from Morgantown',
    };

    const result = ParkOverviewSchema.safeParse(full);
    expect(result.success).toBe(true);
  });

  it('validates email format', () => {
    const invalid = {
      operatingHours: {
        general: 'Dawn to Dusk',
      },
      contact: {
        phone: '1-833-WV-PARKS',
        email: 'not-an-email', // Invalid email
      },
      managingAgency: {
        name: 'WV State Parks',
        jurisdiction: 'West Virginia',
      },
    };

    const result = ParkOverviewSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });
});

// ============================================================================
// FACILITIES SECTION TESTS
// ============================================================================

describe('FacilitiesSectionSchema', () => {
  it('accepts empty facilities section', () => {
    const empty = {};

    const result = FacilitiesSectionSchema.safeParse(empty);
    expect(result.success).toBe(true);
  });

  it('accepts lodging facilities', () => {
    const lodging = {
      lodging: {
        cabins: [
          {
            cabinNumber: 'Cabin 1',
            bedrooms: 2,
            bathrooms: 1,
            maxOccupancy: 6,
            kitchenType: 'full' as const,
          },
        ],
        lodges: [
          {
            name: 'Main Lodge',
            rooms: 54,
            amenities: ['Restaurant', 'Pool', 'WiFi'],
          },
        ],
      },
    };

    const result = FacilitiesSectionSchema.safeParse(lodging);
    expect(result.success).toBe(true);
  });

  it('accepts camping facilities', () => {
    const camping = {
      camping: {
        campgrounds: [
          {
            name: 'Main Campground',
            siteCount: 88,
            hookupTypes: ['electric' as const, 'water' as const],
          },
        ],
      },
    };

    const result = FacilitiesSectionSchema.safeParse(camping);
    expect(result.success).toBe(true);
  });

  it('limits cabin array to 50 items', () => {
    const tooMany = {
      lodging: {
        cabins: Array(51)
          .fill(null)
          .map((_, i) => ({
            cabinNumber: `Cabin ${i}`,
            bedrooms: 2,
            bathrooms: 1,
            maxOccupancy: 6,
            kitchenType: 'full' as const,
          })),
      },
    };

    const result = FacilitiesSectionSchema.safeParse(tooMany);
    expect(result.success).toBe(false);
  });
});

// ============================================================================
// ACTIVITIES & PROGRAMS TESTS
// ============================================================================

describe('ActivitiesProgramsSchema', () => {
  it('accepts ranger programs', () => {
    const programs = {
      rangerPrograms: [
        {
          name: 'Owl Prowl',
          type: 'ranger_led' as const,
          description: 'Evening owl listening hike',
        },
      ],
    };

    const result = ActivitiesProgramsSchema.safeParse(programs);
    expect(result.success).toBe(true);
  });

  it('accepts Junior Ranger program', () => {
    const jr = {
      juniorRanger: {
        name: 'Junior Ranger Program',
        ageRange: '5-12 years',
        activities: ['Nature scavenger hunt', 'Wildlife bingo'],
        badgeEligibility: true,
      },
    };

    const result = ActivitiesProgramsSchema.safeParse(jr);
    expect(result.success).toBe(true);
  });

  it('limits ranger programs to 30 items', () => {
    const tooMany = {
      rangerPrograms: Array(31)
        .fill(null)
        .map((_, i) => ({
          name: `Program ${i}`,
          type: 'ranger_led' as const,
          description: 'Test description',
        })),
    };

    const result = ActivitiesProgramsSchema.safeParse(tooMany);
    expect(result.success).toBe(false);
  });
});

// ============================================================================
// ACCESSIBILITY SECTION TESTS
// ============================================================================

describe('AccessibilitySectionSchema', () => {
  it('accepts accessibility features', () => {
    const accessibility = {
      statement: 'Our park strives to be accessible to all visitors',
      features: ['accessible_trail' as const, 'accessible_parking' as const],
      accessibleFacilities: ['Visitor Center', 'Lodge', 'Cabins 1-5'],
      serviceAnimalPolicy: {
        allowed: true,
        adaCompliance: 'Service animals welcome per ADA guidelines',
      },
    };

    const result = AccessibilitySectionSchema.safeParse(accessibility);
    expect(result.success).toBe(true);
  });

  it('accepts assistive equipment information', () => {
    const accessibility = {
      assistiveEquipment: [
        {
          equipment: 'All-terrain wheelchair',
          description: 'Electric wheelchair for trail access',
          reservationRequired: true,
          advanceNotice: '72 hours',
        },
      ],
    };

    const result = AccessibilitySectionSchema.safeParse(accessibility);
    expect(result.success).toBe(true);
  });

  it('limits features to 30 items', () => {
    const tooMany = {
      features: Array(31).fill('accessible_trail' as const),
    };

    const result = AccessibilitySectionSchema.safeParse(tooMany);
    expect(result.success).toBe(false);
  });
});

// ============================================================================
// SEO METADATA TESTS
// ============================================================================

describe('SEO Metadata', () => {
  it('validates title length (10-60 chars)', () => {
    const validTitle = {
      title: 'Blackwater Falls State Park - West Virginia Adventure',
      description:
        'Explore Blackwater Falls State Park in Tucker County, WV. Features include the famous 62-foot waterfall, cabins, camping, and miles of hiking trails.',
    };

    const result = StateParkTemplatePropsSchema.shape.seo.safeParse(validTitle);
    expect(result.success).toBe(true);
  });

  it('rejects title that is too short', () => {
    const tooShort = {
      title: 'Park', // <10 chars
    };

    const result = StateParkTemplatePropsSchema.shape.seo.safeParse(tooShort);
    expect(result.success).toBe(false);
  });

  it('rejects title that is too long', () => {
    const tooLong = {
      title:
        'This is an extremely long title that exceeds the maximum character limit of 60 characters',
    };

    const result = StateParkTemplatePropsSchema.shape.seo.safeParse(tooLong);
    expect(result.success).toBe(false);
  });

  it('validates description length (50-160 chars)', () => {
    const valid = {
      description:
        'Explore Blackwater Falls State Park in Tucker County, WV. Features include the famous 62-foot waterfall, cabins, camping, and miles of scenic hiking trails.',
    };

    const result = StateParkTemplatePropsSchema.shape.seo.safeParse(valid);
    expect(result.success).toBe(true);

    expect(valid.description.length).toBeGreaterThanOrEqual(50);
    expect(valid.description.length).toBeLessThanOrEqual(160);
  });

  it('limits FAQ items to 15', () => {
    const tooManyFAQs = {
      faqItems: Array(16)
        .fill(null)
        .map((_, i) => ({
          '@type': 'Question' as const,
          name: `Question ${i}?`,
          acceptedAnswer: {
            '@type': 'Answer' as const,
            text: 'This is a test answer with sufficient length to meet the minimum requirements.',
          },
        })),
    };

    const result = StateParkTemplatePropsSchema.shape.seo.safeParse(tooManyFAQs);
    expect(result.success).toBe(false);
  });
});

// ============================================================================
// TYPE GUARD TESTS
// ============================================================================

describe('Type Guards', () => {
  describe('isStateParkTemplate', () => {
    it('returns true for valid template', () => {
      const result = isStateParkTemplate(minimalValidTemplate);
      expect(result).toBe(true);
    });

    it('returns false for null', () => {
      const result = isStateParkTemplate(null);
      expect(result).toBe(false);
    });

    it('returns false when hero is missing', () => {
      const { hero, ...without } = minimalValidTemplate;
      const result = isStateParkTemplate(without);
      expect(result).toBe(false);
    });
  });

  describe('hasAccessibleFacilities', () => {
    it('returns true when accessibility features exist', () => {
      const template: StateParkTemplateProps = {
        ...minimalValidTemplate,
        accessibility: {
          features: ['accessible_trail', 'accessible_parking'],
        },
      };

      const result = hasAccessibleFacilities(template);
      expect(result).toBe(true);
    });

    it('returns false when accessibility section is undefined', () => {
      const template: StateParkTemplateProps = minimalValidTemplate;

      const result = hasAccessibleFacilities(template);
      expect(result).toBe(false);
    });
  });

  describe('hasLodging', () => {
    it('returns true when cabins exist', () => {
      const template: StateParkTemplateProps = {
        ...minimalValidTemplate,
        facilities: {
          lodging: {
            cabins: [
              {
                cabinNumber: 'Cabin 1',
                bedrooms: 2,
                bathrooms: 1,
                maxOccupancy: 6,
                kitchenType: 'full',
              },
            ],
          },
        },
      };

      const result = hasLodging(template);
      expect(result).toBe(true);
    });

    it('returns true when lodges exist', () => {
      const template: StateParkTemplateProps = {
        ...minimalValidTemplate,
        facilities: {
          lodging: {
            lodges: [
              {
                name: 'Main Lodge',
                rooms: 54,
                amenities: ['Restaurant'],
              },
            ],
          },
        },
      };

      const result = hasLodging(template);
      expect(result).toBe(true);
    });

    it('returns false when no lodging exists', () => {
      const template: StateParkTemplateProps = minimalValidTemplate;

      const result = hasLodging(template);
      expect(result).toBe(false);
    });
  });

  describe('hasCamping', () => {
    it('returns true when campgrounds exist', () => {
      const template: StateParkTemplateProps = {
        ...minimalValidTemplate,
        facilities: {
          camping: {
            campgrounds: [
              {
                name: 'Main Campground',
                siteCount: 88,
                hookupTypes: ['electric'],
              },
            ],
          },
        },
      };

      const result = hasCamping(template);
      expect(result).toBe(true);
    });

    it('returns false when no camping exists', () => {
      const template: StateParkTemplateProps = minimalValidTemplate;

      const result = hasCamping(template);
      expect(result).toBe(false);
    });
  });

  describe('hasWaterActivities', () => {
    it('returns true when pools exist', () => {
      const template: StateParkTemplateProps = {
        ...minimalValidTemplate,
        facilities: {
          pools: [
            {
              type: 'outdoor',
              lifeguard: true,
            },
          ],
        },
      };

      const result = hasWaterActivities(template);
      expect(result).toBe(true);
    });

    it('returns true when boat launches exist', () => {
      const template: StateParkTemplateProps = {
        ...minimalValidTemplate,
        facilities: {
          boatLaunches: [
            {
              name: 'Main Launch',
              rampType: 'concrete',
              lanes: 2,
              trailerParkingSpaces: 20,
              vehicleParkingSpaces: 40,
              launchFee: 'Free',
            },
          ],
        },
      };

      const result = hasWaterActivities(template);
      expect(result).toBe(true);
    });

    it('returns false when no water activities exist', () => {
      const template: StateParkTemplateProps = minimalValidTemplate;

      const result = hasWaterActivities(template);
      expect(result).toBe(false);
    });
  });
});
