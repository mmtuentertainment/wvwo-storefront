/**
 * State Park Types Unit Tests
 * SPEC-18 Phase 5: Comprehensive type system validation
 *
 * Tests:
 * - Schema validation (10 facility types, 22 amenities, 18 accessibility features)
 * - Helper functions (getFacilityTypeLabel, getTypeColor, getTypeShape)
 * - WVWO color compliance (no purple, pink, neon)
 * - Industry color exceptions (trail difficulty, water features)
 * - Edge cases (invalid enums, required fields, boundary conditions)
 */

import { describe, it, expect } from 'vitest';
import {
  // Schemas
  FacilityTypeSchema,
  AmenityTypeSchema,
  ProgramTypeSchema,
  ActivityTypeSchema,
  AccessibilityFeatureSchema,
  DayOfWeekSchema,
  TimeOfDaySchema,
  DailyHoursSchema,
  SeasonalHoursSchema,
  ParkOperatingHoursSchema,
  StateParkRegulationsSchema,
  CabinSchema,
  LodgeFacilitySchema,
  CampingFacilitySchema,
  PoolFacilitySchema,
  BoatLaunchSchema,
  VisitorCenterSchema,
  PicnicAreaSchema,
  PlaygroundSchema,
  AmphitheaterSchema,
  RangerProgramSchema,
  JuniorRangerProgramSchema,
  SpecialEventSchema,
  ActivitySchema,
  TrailAccessInfoSchema,
  ServiceAnimalPolicySchema,
  // Constants
  FACILITY_TYPE_LABELS,
  FACILITY_TYPE_COLORS,
  FACILITY_TYPE_SHAPES,
  AMENITY_TYPE_LABELS,
  AMENITY_TYPE_COLORS,
  PROGRAM_TYPE_LABELS,
  PROGRAM_TYPE_COLORS,
  ACTIVITY_TYPE_LABELS,
  ACTIVITY_TYPE_COLORS,
  ACCESSIBILITY_FEATURE_LABELS,
  ACCESSIBILITY_FEATURE_COLORS,
  ACCESSIBILITY_FEATURE_SHAPES,
  // Helper functions
  getFacilityTypeLabel,
  getFacilityTypeColor,
  getFacilityTypeShape,
  getAmenityTypeLabel,
  getAmenityTypeColor,
  getProgramTypeLabel,
  getProgramTypeColor,
  getActivityTypeLabel,
  getActivityTypeColor,
  getAccessibilityFeatureLabel,
  getAccessibilityFeatureColor,
  getAccessibilityFeatureShape,
  hasAccessibilityFeatures,
  formatOperatingHours,
  validateOperatingHours,
  type FacilityType,
  type AmenityType,
  type AccessibilityFeature,
} from '../state-park-types';

// ============================================================================
// SCHEMA VALIDATION TESTS
// ============================================================================

describe('FacilityTypeSchema', () => {
  it('accepts all valid facility types', () => {
    const types: FacilityType[] = [
      'lodge',
      'cabin',
      'campground',
      'pool',
      'visitor_center',
      'nature_center',
      'picnic_area',
      'boat_launch',
      'playground',
      'amphitheater',
    ];

    types.forEach((type) => {
      const result = FacilityTypeSchema.safeParse(type);
      expect(result.success).toBe(true);
    });
  });

  it('rejects invalid facility types', () => {
    const invalid = ['hotel', 'motel', 'restaurant', 'national-park'];

    invalid.forEach((type) => {
      const result = FacilityTypeSchema.safeParse(type);
      expect(result.success).toBe(false);
    });
  });
});

describe('AmenityTypeSchema', () => {
  it('accepts all 22+ amenity types', () => {
    const types: AmenityType[] = [
      'disc_golf',
      'tennis_court',
      'basketball_court',
      'volleyball_court',
      'golf_course',
      'miniature_golf',
      'stables',
      'horse_trails',
      'game_room',
      'exercise_room',
      'splash_park',
      'beach',
      'fishing_pier',
      'equipment_rental',
      'laundromat',
      'dump_station',
      'hot_showers',
      'zipline',
      'archery_range',
      'laser_tag',
      'axe_throwing',
      'gift_shop',
    ];

    expect(types.length).toBeGreaterThanOrEqual(22);

    types.forEach((type) => {
      const result = AmenityTypeSchema.safeParse(type);
      expect(result.success).toBe(true);
    });
  });

  it('rejects invalid amenity types', () => {
    const invalid = ['invalid_amenity', 'fake_feature'];

    invalid.forEach((type) => {
      const result = AmenityTypeSchema.safeParse(type);
      expect(result.success).toBe(false);
    });
  });
});

describe('AccessibilityFeatureSchema', () => {
  it('accepts all 18 accessibility features', () => {
    const features: AccessibilityFeature[] = [
      'all_terrain_wheelchair',
      'beach_wheelchair',
      'wheelchair_charging',
      'accessible_fishing_pier',
      'accessible_kayak_launch',
      'accessible_overlook',
      'accessible_trail',
      'accessible_picnic',
      'accessible_campsite',
      'accessible_restroom',
      'accessible_parking',
      'accessible_cabin',
      'accessible_playground',
      'sensory_garden',
      'audio_tour',
      'asl_interpreter',
      'braille_signage',
      'advance_notice_required',
    ];

    expect(features.length).toBe(18);

    features.forEach((feature) => {
      const result = AccessibilityFeatureSchema.safeParse(feature);
      expect(result.success).toBe(true);
    });
  });
});

describe('CabinSchema', () => {
  it('accepts valid cabin with all fields', () => {
    const cabin = {
      cabinNumber: 'Cabin 1',
      name: 'Deluxe Cabin',
      bedrooms: 2,
      bathrooms: 1.5,
      maxOccupancy: 6,
      kitchenType: 'full',
      hasFireplace: true,
      fireplaceType: 'stone',
      petFriendly: false,
      accessible: true,
      seasonalAvailability: 'Year-round',
      amenities: ['WiFi', 'TV', 'Grill'],
      hasPorch: true,
      hasGrill: true,
      priceRange: '$150-$250/night',
      bookingUrl: 'https://reservations.wvstateparks.com/cabin1',
      photoUrl: 'https://example.com/cabin.jpg',
      description: 'Beautiful cabin with modern amenities',
    };

    const result = CabinSchema.safeParse(cabin);
    expect(result.success).toBe(true);
  });

  it('requires minimum required fields', () => {
    const minimal = {
      cabinNumber: 'Cabin 1',
      bedrooms: 2,
      bathrooms: 1,
      maxOccupancy: 6,
      kitchenType: 'full',
    };

    const result = CabinSchema.safeParse(minimal);
    expect(result.success).toBe(true);
  });

  it('validates kitchen type enum', () => {
    const invalid = {
      cabinNumber: 'Cabin 1',
      bedrooms: 2,
      bathrooms: 1,
      maxOccupancy: 6,
      kitchenType: 'invalid',
    };

    const result = CabinSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });

  it('validates URL format for bookingUrl', () => {
    const invalidUrl = {
      cabinNumber: 'Cabin 1',
      bedrooms: 2,
      bathrooms: 1,
      maxOccupancy: 6,
      kitchenType: 'full',
      bookingUrl: 'not-a-url',
    };

    const result = CabinSchema.safeParse(invalidUrl);
    expect(result.success).toBe(false);
  });
});

describe('CampingFacilitySchema', () => {
  it('accepts valid campground', () => {
    const campground = {
      name: 'Main Campground',
      siteCount: 88,
      hookupTypes: ['electric', 'water'],
      bathhouse: true,
      dumpStation: true,
      maxRVLength: '40 feet',
      season: 'April-November',
      amenities: ['Laundry', 'Showers'],
      accessible: true,
      accessibleSiteCount: 4,
      fees: '$25-$35/night',
      bookingUrl: 'https://reservations.wvstateparks.com',
    };

    const result = CampingFacilitySchema.safeParse(campground);
    expect(result.success).toBe(true);
  });

  it('validates hookup types enum', () => {
    const invalid = {
      name: 'Test Campground',
      siteCount: 50,
      hookupTypes: ['invalid_hookup'],
    };

    const result = CampingFacilitySchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });
});

describe('RangerProgramSchema', () => {
  it('accepts valid ranger program', () => {
    const program = {
      name: 'Owl Prowl Night Hike',
      type: 'ranger_led',
      description: 'Join a ranger for an evening hike to listen for owls',
      schedule: 'Saturdays 7:00 PM (May-August)',
      duration: '2 hours',
      ageGroup: 'Ages 8+',
      reservationRequired: true,
      accessible: false,
      maxParticipants: 15,
    };

    const result = RangerProgramSchema.safeParse(program);
    expect(result.success).toBe(true);
  });

  it('requires name, type, and description', () => {
    const invalid = {
      name: 'Test Program',
      type: 'ranger_led',
      // Missing description
    };

    const result = RangerProgramSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });
});

describe('ParkOperatingHoursSchema', () => {
  it('accepts year-round hours', () => {
    const hours = {
      general: 'Dawn to Dusk',
      overnightCamping: true,
    };

    const result = ParkOperatingHoursSchema.safeParse(hours);
    expect(result.success).toBe(true);
  });

  it('accepts seasonal variations', () => {
    const hours = {
      general: 'Dawn to Dusk',
      overnightCamping: true,
      seasonalHours: [
        {
          season: 'Summer Hours',
          startDate: '2026-05-01',
          endDate: '2026-09-30',
          hours: [
            {
              day: 'monday',
              open: '08:00',
              close: '20:00',
            },
          ],
        },
      ],
    };

    const result = ParkOperatingHoursSchema.safeParse(hours);
    expect(result.success).toBe(true);
  });
});

describe('StateParkRegulationsSchema', () => {
  it('accepts complete regulations', () => {
    const regulations = {
      pets: {
        allowed: true,
        leashRequired: true,
        petFriendlyAreas: ['Trails', 'Campground'],
        restrictions: ['Not allowed in cabins'],
      },
      dayUseFees: {
        required: false,
        amount: 'Free',
      },
      parking: {
        available: true,
        capacity: 100,
      },
      fires: {
        allowed: true,
        restrictions: ['Fire pits only', 'No ground fires'],
        firePits: true,
      },
      quietHours: {
        enforced: true,
        start: '22:00',
        end: '08:00',
      },
    };

    const result = StateParkRegulationsSchema.safeParse(regulations);
    expect(result.success).toBe(true);
  });

  it('requires pets and fires sections', () => {
    const minimal = {
      pets: {
        allowed: true,
        leashRequired: true,
      },
      fires: {
        allowed: true,
        restrictions: ['Fire pits only'],
      },
    };

    const result = StateParkRegulationsSchema.safeParse(minimal);
    expect(result.success).toBe(true);
  });
});

// ============================================================================
// DISPLAY CONSTANTS COMPLETENESS TESTS
// ============================================================================

describe('Display Constants', () => {
  describe('FACILITY_TYPE_LABELS', () => {
    it('has labels for all facility types', () => {
      const types = FacilityTypeSchema._def.values;

      types.forEach((type) => {
        expect(FACILITY_TYPE_LABELS[type]).toBeDefined();
        expect(FACILITY_TYPE_LABELS[type].length).toBeGreaterThan(0);
      });
    });

    it('has no extra labels', () => {
      const types = FacilityTypeSchema._def.values;
      const labelKeys = Object.keys(FACILITY_TYPE_LABELS);

      expect(labelKeys.length).toBe(types.length);
    });
  });

  describe('FACILITY_TYPE_COLORS', () => {
    it('has colors for all facility types', () => {
      const types = FacilityTypeSchema._def.values;

      types.forEach((type) => {
        expect(FACILITY_TYPE_COLORS[type]).toBeDefined();
        expect(FACILITY_TYPE_COLORS[type].length).toBeGreaterThan(0);
      });
    });
  });

  describe('FACILITY_TYPE_SHAPES', () => {
    it('has shapes/icons for all facility types', () => {
      const types = FacilityTypeSchema._def.values;

      types.forEach((type) => {
        expect(FACILITY_TYPE_SHAPES[type]).toBeDefined();
      });
    });
  });

  describe('AMENITY_TYPE_LABELS', () => {
    it('has labels for all amenity types', () => {
      const types = AmenityTypeSchema._def.values;

      types.forEach((type) => {
        expect(AMENITY_TYPE_LABELS[type]).toBeDefined();
        expect(AMENITY_TYPE_LABELS[type].length).toBeGreaterThan(0);
      });
    });
  });

  describe('ACCESSIBILITY_FEATURE_LABELS', () => {
    it('has labels for all accessibility features', () => {
      const features = AccessibilityFeatureSchema._def.values;

      features.forEach((feature) => {
        expect(ACCESSIBILITY_FEATURE_LABELS[feature]).toBeDefined();
        expect(ACCESSIBILITY_FEATURE_LABELS[feature].length).toBeGreaterThan(0);
      });
    });
  });
});

// ============================================================================
// HELPER FUNCTION TESTS
// ============================================================================

describe('Helper Functions', () => {
  describe('getFacilityTypeLabel', () => {
    it('returns correct label for each type', () => {
      expect(getFacilityTypeLabel('cabin')).toBe('Cabins');
      expect(getFacilityTypeLabel('lodge')).toBe('Lodge');
      expect(getFacilityTypeLabel('campground')).toBe('Campground');
      expect(getFacilityTypeLabel('pool')).toBe('Swimming Pool');
      expect(getFacilityTypeLabel('visitor_center')).toBe('Visitor Center');
    });
  });

  describe('getFacilityTypeColor', () => {
    it('returns color classes for each type', () => {
      expect(getFacilityTypeColor('cabin')).toContain('bg-brand-brown');
      expect(getFacilityTypeColor('campground')).toContain('bg-sign-green');
      expect(getFacilityTypeColor('pool')).toContain('bg-blue-700');
    });
  });

  describe('getFacilityTypeShape', () => {
    it('returns icon for each type', () => {
      expect(getFacilityTypeShape('cabin')).toBe('🏠');
      expect(getFacilityTypeShape('campground')).toBe('⛺');
      expect(getFacilityTypeShape('pool')).toBe('🏊');
    });
  });

  describe('hasAccessibilityFeatures', () => {
    it('returns true when features exist', () => {
      const features: AccessibilityFeature[] = ['accessible_trail', 'accessible_parking'];
      expect(hasAccessibilityFeatures(features)).toBe(true);
    });

    it('returns false when features array is empty', () => {
      expect(hasAccessibilityFeatures([])).toBe(false);
    });

    it('returns false when features is undefined', () => {
      expect(hasAccessibilityFeatures(undefined)).toBe(false);
    });
  });

  describe('formatOperatingHours', () => {
    it('formats 24hr time to 12hr format', () => {
      const hours = {
        day: 'monday' as const,
        open: '08:00',
        close: '20:00',
      };

      const formatted = formatOperatingHours(hours);
      expect(formatted).toBe('8:00 AM - 8:00 PM');
    });

    it('handles closed days', () => {
      const hours = {
        day: 'monday' as const,
        open: 'closed' as const,
        close: 'closed' as const,
      };

      const formatted = formatOperatingHours(hours);
      expect(formatted).toBe('Closed');
    });

    it('formats noon correctly', () => {
      const hours = {
        day: 'monday' as const,
        open: '12:00',
        close: '18:00',
      };

      const formatted = formatOperatingHours(hours);
      expect(formatted).toBe('12:00 PM - 6:00 PM');
    });
  });

  describe('validateOperatingHours', () => {
    it('validates correct hours', () => {
      const hours = {
        day: 'monday' as const,
        open: '08:00',
        close: '20:00',
      };

      expect(validateOperatingHours(hours)).toBe(true);
    });

    it('rejects hours where close is before open', () => {
      const hours = {
        day: 'monday' as const,
        open: '20:00',
        close: '08:00',
      };

      expect(validateOperatingHours(hours)).toBe(false);
    });

    it('validates closed days', () => {
      const hours = {
        day: 'monday' as const,
        open: 'closed' as const,
        close: 'closed' as const,
      };

      expect(validateOperatingHours(hours)).toBe(true);
    });
  });
});

// ============================================================================
// WVWO COLOR COMPLIANCE TESTS
// ============================================================================

describe('WVWO Color Compliance', () => {
  const FORBIDDEN_COLORS = ['ec4899', '8b5cf6', '06b6d4', 'purple', 'pink', 'cyan'];

  it('facility colors use no forbidden colors', () => {
    const allColors = Object.values(FACILITY_TYPE_COLORS);

    FORBIDDEN_COLORS.forEach((forbidden) => {
      allColors.forEach((color) => {
        expect(color.toLowerCase()).not.toContain(forbidden.toLowerCase());
      });
    });
  });

  it('amenity colors use no forbidden colors', () => {
    const allColors = Object.values(AMENITY_TYPE_COLORS);

    FORBIDDEN_COLORS.forEach((forbidden) => {
      allColors.forEach((color) => {
        expect(color.toLowerCase()).not.toContain(forbidden.toLowerCase());
      });
    });
  });

  it('uses WVWO brand colors for primary elements', () => {
    const BRAND_COLORS = ['brand-brown', 'sign-green', 'brand-cream', 'brand-orange'];
    const allColors = Object.values(FACILITY_TYPE_COLORS);

    const usesBrandColors = allColors.some((color) =>
      BRAND_COLORS.some((brand) => color.includes(brand))
    );

    expect(usesBrandColors).toBe(true);
  });

  it('uses rounded-sm border radius only (no rounded-md/lg/xl)', () => {
    // This is enforced at component level, but validate no constants suggest otherwise
    const allColors = Object.values(FACILITY_TYPE_COLORS);

    allColors.forEach((color) => {
      expect(color).not.toContain('rounded-md');
      expect(color).not.toContain('rounded-lg');
      expect(color).not.toContain('rounded-xl');
    });
  });
});

// ============================================================================
// INDUSTRY COLOR EXCEPTION TESTS
// ============================================================================

describe('Industry Color Exceptions', () => {
  it('uses blue for water features (industry standard)', () => {
    expect(FACILITY_TYPE_COLORS['pool']).toContain('bg-blue-700');
    expect(FACILITY_TYPE_COLORS['boat_launch']).toContain('bg-blue-700');
    expect(AMENITY_TYPE_COLORS['beach']).toContain('bg-blue-700');
    expect(AMENITY_TYPE_COLORS['splash_park']).toContain('bg-blue-700');
  });

  it('uses blue for accessibility features (ADA standard)', () => {
    const accessibilityColors = Object.values(ACCESSIBILITY_FEATURE_COLORS);

    accessibilityColors.forEach((color) => {
      expect(color).toContain('bg-blue-700');
    });
  });

  it('activity types use appropriate industry colors', () => {
    expect(ACTIVITY_TYPE_COLORS['swimming']).toContain('bg-blue-700');
    expect(ACTIVITY_TYPE_COLORS['boating']).toContain('bg-blue-700');
    expect(ACTIVITY_TYPE_COLORS['fishing']).toContain('bg-blue-700');
  });
});

// ============================================================================
// EDGE CASE TESTS
// ============================================================================

describe('Edge Cases', () => {
  it('handles facilities with zero count', () => {
    // Zero count might be used for "out of service" facilities
    const cabin = {
      cabinNumber: 'Cabin 1',
      bedrooms: 2,
      bathrooms: 1,
      maxOccupancy: 0, // Edge case: no occupancy
      kitchenType: 'full',
    };

    const result = CabinSchema.safeParse(cabin);
    expect(result.success).toBe(false); // Should fail - maxOccupancy must be positive
  });

  it('handles very long facility descriptions', () => {
    const cabin = {
      cabinNumber: 'Cabin 1',
      bedrooms: 2,
      bathrooms: 1,
      maxOccupancy: 6,
      kitchenType: 'full',
      description: 'A'.repeat(1000), // Very long description
    };

    const result = CabinSchema.safeParse(cabin);
    expect(result.success).toBe(true); // Should accept long descriptions
  });

  it('handles special characters in names', () => {
    const cabin = {
      cabinNumber: "Kim's Favorite Cabin #1",
      bedrooms: 2,
      bathrooms: 1,
      maxOccupancy: 6,
      kitchenType: 'full',
    };

    const result = CabinSchema.safeParse(cabin);
    expect(result.success).toBe(true);
  });

  it('validates time format strictly', () => {
    const validTimes = ['00:00', '12:30', '23:59'];
    const invalidTimes = ['24:00', '12:60', '1:30', '12:5'];

    validTimes.forEach((time) => {
      expect(TimeOfDaySchema.safeParse(time).success).toBe(true);
    });

    invalidTimes.forEach((time) => {
      expect(TimeOfDaySchema.safeParse(time).success).toBe(false);
    });
  });

  it('handles maximum array lengths', () => {
    const amenities = Array(30).fill('WiFi'); // Max 30 amenities
    const cabin = {
      cabinNumber: 'Cabin 1',
      bedrooms: 2,
      bathrooms: 1,
      maxOccupancy: 6,
      kitchenType: 'full',
      amenities,
    };

    const result = CabinSchema.safeParse(cabin);
    expect(result.success).toBe(true);
  });

  it('rejects exceeding maximum array lengths', () => {
    const amenities = Array(31).fill('WiFi'); // Exceeds max 30
    const cabin = {
      cabinNumber: 'Cabin 1',
      bedrooms: 2,
      bathrooms: 1,
      maxOccupancy: 6,
      kitchenType: 'full',
      amenities,
    };

    const result = CabinSchema.safeParse(cabin);
    expect(result.success).toBe(false);
  });

  it('handles fractional bathroom counts', () => {
    const cabin = {
      cabinNumber: 'Cabin 1',
      bedrooms: 2,
      bathrooms: 1.5, // Half bathroom
      maxOccupancy: 6,
      kitchenType: 'full',
    };

    const result = CabinSchema.safeParse(cabin);
    expect(result.success).toBe(true);
  });
});
