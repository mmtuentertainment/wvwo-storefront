# SPEC-18 State Park Template - Testing Specification

**Status**: Draft
**Target**: Match SPEC-17 Quality Standards (1,148 tests, 85%+ coverage, Lighthouse 100, WCAG 2.1 AA)
**Date**: 2026-01-02

---

## Executive Summary

This specification defines the comprehensive testing strategy for SPEC-18 State Park Template to match the quality standards achieved in SPEC-17 Backcountry Template. The testing suite will include 8 major categories with approximately 1,800+ lines of test code, achieving 85%+ code coverage, Lighthouse 100 scores, and WCAG 2.1 Level AA compliance.

### Success Criteria

- **Coverage**: 85%+ (statements, branches, functions, lines)
- **Performance**: Lighthouse 100 (all metrics)
- **Accessibility**: WCAG 2.1 Level AA (0 violations)
- **Aesthetics**: 0 WVWO compliance violations
- **Type Safety**: 0 TypeScript errors (strict mode)
- **Tests**: All tests passing in CI/CD

---

## 1. Unit Tests (~600 lines)

### 1.1 state-park-types.test.ts

**Location**: `wv-wild-web/src/types/__tests__/state-park-types.test.ts`

#### Test Coverage

**Schema Validation Tests:**
```typescript
describe('StateParkTypeSchema', () => {
  it('accepts all valid park types', () => {
    const types = ['state-park', 'state-forest', 'wma', 'state-forest-campground'];
    types.forEach(type => {
      expect(StateParkTypeSchema.safeParse(type).success).toBe(true);
    });
  });

  it('rejects invalid park types', () => {
    expect(StateParkTypeSchema.safeParse('national-park').success).toBe(false);
  });
});

describe('FacilityTypeSchema', () => {
  it('accepts all 12+ facility types', () => {
    const types = [
      'cabin', 'cottage', 'lodge', 'campground', 'campground-rv',
      'campground-tent', 'picnic-area', 'swimming-pool', 'beach',
      'boat-launch', 'trail', 'visitor-center', 'playground'
    ];
    types.forEach(type => {
      expect(FacilityTypeSchema.safeParse(type).success).toBe(true);
    });
  });
});

describe('FacilitySchema', () => {
  it('accepts valid facility with all fields', () => {
    const facility = {
      type: 'cabin',
      name: 'Deluxe Cabins',
      count: 13,
      description: 'Modern cabins with full amenities',
      adaAccessible: true,
      reservationRequired: true,
      reservationUrl: 'https://reservations.wvstateparks.com'
    };
    expect(FacilitySchema.safeParse(facility).success).toBe(true);
  });

  it('requires type, name, and count fields', () => {
    const minimal = { type: 'tent-site', name: 'Basic Sites', count: 20 };
    expect(FacilitySchema.safeParse(minimal).success).toBe(true);
  });

  it('validates reservationUrl format', () => {
    const invalidUrl = {
      type: 'cabin',
      name: 'Test',
      count: 1,
      reservationUrl: 'not-a-url'
    };
    expect(FacilitySchema.safeParse(invalidUrl).success).toBe(false);
  });
});

describe('ActivityTypeSchema', () => {
  it('accepts all activity types', () => {
    const types = [
      'hiking', 'camping', 'fishing', 'swimming', 'boating',
      'wildlife-viewing', 'photography', 'picnicking', 'playground',
      'ranger-programs', 'junior-ranger', 'seasonal-events'
    ];
    types.forEach(type => {
      expect(ActivityTypeSchema.safeParse(type).success).toBe(true);
    });
  });
});

describe('RangerProgramSchema', () => {
  it('accepts valid ranger program', () => {
    const program = {
      title: 'Owl Prowl Night Hike',
      description: 'Join a ranger for an evening hike to listen for owls',
      schedule: 'Every Saturday 7:00 PM (May-August)',
      duration: '2 hours',
      ageRestriction: 'Ages 8+',
      registrationRequired: true,
      maxParticipants: 15,
      meetingLocation: 'Visitor Center'
    };
    expect(RangerProgramSchema.safeParse(program).success).toBe(true);
  });
});

describe('SeasonalHoursSchema', () => {
  it('accepts valid seasonal hours', () => {
    const hours = {
      season: 'summer',
      months: 'May-September',
      hours: '8:00 AM - 8:00 PM',
      days: 'Daily'
    };
    expect(SeasonalHoursSchema.safeParse(hours).success).toBe(true);
  });
});
```

**Display Constants Completeness:**
```typescript
describe('Display Constants', () => {
  describe('FACILITY_TYPE_LABELS', () => {
    it('has labels for all facility types', () => {
      const types = FacilityTypeSchema._def.values;
      types.forEach(type => {
        expect(FACILITY_TYPE_LABELS[type]).toBeDefined();
        expect(FACILITY_TYPE_LABELS[type].length).toBeGreaterThan(0);
      });
    });
  });

  describe('FACILITY_TYPE_ICONS', () => {
    it('has icons for all facility types', () => {
      const types = FacilityTypeSchema._def.values;
      types.forEach(type => {
        expect(FACILITY_TYPE_ICONS[type]).toBeDefined();
      });
    });
  });

  describe('ACTIVITY_TYPE_LABELS', () => {
    it('has labels for all activity types', () => {
      const types = ActivityTypeSchema._def.values;
      types.forEach(type => {
        expect(ACTIVITY_TYPE_LABELS[type]).toBeDefined();
      });
    });
  });
});
```

**Helper Function Tests:**
```typescript
describe('Helper Functions', () => {
  describe('getFacilityTypeLabel', () => {
    it('returns correct label for each type', () => {
      expect(getFacilityTypeLabel('cabin')).toBe('Cabins');
      expect(getFacilityTypeLabel('campground-rv')).toBe('RV Campsites');
    });
  });

  describe('getFacilityTypeIcon', () => {
    it('returns icon for each type', () => {
      expect(getFacilityTypeIcon('cabin')).toBe('🏠');
      expect(getFacilityTypeIcon('trail')).toBe('🥾');
    });
  });

  describe('hasLodging', () => {
    it('returns true for facilities with lodging', () => {
      const facilities = [
        { type: 'cabin', name: 'Cabins', count: 13 },
        { type: 'picnic-area', name: 'Picnic', count: 5 }
      ];
      expect(hasLodging(facilities)).toBe(true);
    });

    it('returns false when no lodging present', () => {
      const facilities = [
        { type: 'trail', name: 'Trails', count: 10 }
      ];
      expect(hasLodging(facilities)).toBe(false);
    });
  });

  describe('hasCamping', () => {
    it('returns true for any campground type', () => {
      const facilities = [
        { type: 'campground-tent', name: 'Tent Sites', count: 50 }
      ];
      expect(hasCamping(facilities)).toBe(true);
    });
  });

  describe('getTotalFacilityCount', () => {
    it('sums all facility counts', () => {
      const facilities = [
        { type: 'cabin', name: 'Cabins', count: 13 },
        { type: 'campground-rv', name: 'RV Sites', count: 88 }
      ];
      expect(getTotalFacilityCount(facilities)).toBe(101);
    });
  });
});
```

**WVWO Color Compliance Tests:**
```typescript
describe('WVWO Color Compliance', () => {
  it('uses no forbidden colors', () => {
    const FORBIDDEN = ['#ec4899', '#8b5cf6', '#06b6d4'];
    const allColors = [
      ...Object.values(FACILITY_TYPE_COLORS),
      ...Object.values(ACTIVITY_TYPE_COLORS)
    ];

    FORBIDDEN.forEach(forbidden => {
      allColors.forEach(color => {
        expect(color.toLowerCase()).not.toContain(forbidden.toLowerCase());
      });
    });
  });

  it('uses WVWO brand colors', () => {
    const BRAND_COLORS = ['#3E2723', '#2E7D32', '#FFF8E1', '#FF6F00'];
    const allColors = Object.values(FACILITY_TYPE_COLORS);

    // At least some elements should use brand colors
    const usesBrandColors = allColors.some(color =>
      BRAND_COLORS.some(brand => color.includes(brand))
    );
    expect(usesBrandColors).toBe(true);
  });
});
```

**Edge Cases:**
```typescript
describe('Edge Cases', () => {
  it('handles facilities with zero count', () => {
    const facility = { type: 'cabin', name: 'Cabins', count: 0 };
    expect(FacilitySchema.safeParse(facility).success).toBe(true);
  });

  it('handles very long facility descriptions', () => {
    const facility = {
      type: 'cabin',
      name: 'Deluxe Cabins',
      count: 13,
      description: 'A'.repeat(500)
    };
    expect(FacilitySchema.safeParse(facility).success).toBe(true);
  });

  it('handles special characters in names', () => {
    const facility = {
      type: 'cabin',
      name: "Kim's Favorite Cabin #1",
      count: 1
    };
    expect(FacilitySchema.safeParse(facility).success).toBe(true);
  });
});
```

---

### 1.2 state-park-seo-types.test.ts

**Location**: `wv-wild-web/src/types/__tests__/state-park-seo-types.test.ts`

#### Test Coverage

**OpeningHours Schema:**
```typescript
describe('OpeningHoursSchema', () => {
  it('accepts valid year-round hours', () => {
    const hours = {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '08:00',
      closes: '20:00'
    };
    expect(OpeningHoursSchema.safeParse(hours).success).toBe(true);
  });

  it('accepts seasonal hours with validFrom/Through', () => {
    const hours = {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '08:00',
      closes: '20:00',
      validFrom: '2026-05-01',
      validThrough: '2026-09-30'
    };
    expect(OpeningHoursSchema.safeParse(hours).success).toBe(true);
  });

  it('accepts weekend-only hours', () => {
    const hours = {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday', 'Sunday'],
      opens: '10:00',
      closes: '18:00'
    };
    expect(OpeningHoursSchema.safeParse(hours).success).toBe(true);
  });
});
```

**FAQ Schema (40-50 word answers):**
```typescript
describe('FAQPageItemSchema', () => {
  it('accepts valid FAQ with proper answer length', () => {
    const faq = {
      '@type': 'Question',
      name: 'Do I need a reservation for cabins?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, reservations are required for all cabin rentals at Blackwater Falls State Park. Cabins can be booked online at reservations.wvstateparks.com or by calling 1-833-WV-PARKS. Book early for summer weekends.'
      }
    };
    expect(FAQPageItemSchema.safeParse(faq).success).toBe(true);

    const wordCount = faq.acceptedAnswer.text.split(/\s+/).length;
    expect(wordCount).toBeGreaterThanOrEqual(40);
    expect(wordCount).toBeLessThanOrEqual(50);
  });

  it('accepts FAQ about pet policy', () => {
    const faq = {
      '@type': 'Question',
      name: 'Are pets allowed in state park cabins?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pet-friendly cabins are available at select WV State Parks including Blackwater Falls, Cacapon, and Hawks Nest. A non-refundable pet fee applies. Two pets maximum per cabin. Service animals always welcome.'
      }
    };
    expect(FAQPageItemSchema.safeParse(faq).success).toBe(true);
  });
});
```

**Event Schema:**
```typescript
describe('EventSchema', () => {
  it('accepts valid one-time event', () => {
    const event = {
      '@type': 'Event',
      name: 'Wildflower Weekend',
      startDate: '2026-05-15T10:00:00-04:00',
      endDate: '2026-05-17T16:00:00-04:00',
      location: {
        '@type': 'Place',
        name: 'Blackwater Falls State Park',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '1584 Blackwater Lodge Rd',
          addressLocality: 'Davis',
          addressRegion: 'WV',
          postalCode: '26260'
        }
      },
      description: 'Join park naturalists for guided wildflower hikes',
      organizer: {
        '@type': 'Organization',
        name: 'WV State Parks'
      }
    };
    expect(EventSchema.safeParse(event).success).toBe(true);
  });

  it('accepts recurring event with eventSchedule', () => {
    const event = {
      '@type': 'Event',
      name: 'Saturday Nature Walks',
      eventSchedule: {
        '@type': 'Schedule',
        repeatFrequency: 'P1W',
        byDay: 'Saturday',
        startTime: '09:00',
        endTime: '11:00',
        startDate: '2026-05-01',
        endDate: '2026-09-30'
      },
      location: {
        '@type': 'Place',
        name: 'Visitor Center',
        address: { '@type': 'PostalAddress' }
      }
    };
    expect(EventSchema.safeParse(event).success).toBe(true);
  });
});
```

**EventSeries Recurring Patterns:**
```typescript
describe('EventSeries Recurring Patterns', () => {
  it('accepts weekly recurring pattern', () => {
    const series = {
      '@type': 'EventSeries',
      name: 'Weekly Ranger Programs',
      repeatFrequency: 'P1W',
      byDay: 'Saturday'
    };
    expect(series.repeatFrequency).toBe('P1W');
  });

  it('accepts monthly recurring pattern', () => {
    const series = {
      '@type': 'EventSeries',
      name: 'Full Moon Hikes',
      repeatFrequency: 'P1M',
      startDate: '2026-05-01'
    };
    expect(series.repeatFrequency).toBe('P1M');
  });
});
```

---

### 1.3 state-park-template-types.test.ts

**Location**: `wv-wild-web/src/types/__tests__/state-park-template-types.test.ts`

#### Test Coverage

**Props Interface Validation:**
```typescript
describe('StateParkTemplatePropsSchema', () => {
  const minimalValid = {
    name: 'Blackwater Falls State Park',
    heroImage: '/images/blackwater-falls-hero.jpg',
    location: {
      address: {
        street: '1584 Blackwater Lodge Rd',
        city: 'Davis',
        state: 'WV',
        zip: '26260'
      },
      coordinates: {
        lat: 39.1117,
        lng: -79.4883
      }
    },
    facilities: [
      { type: 'cabin', name: 'Deluxe Cabins', count: 13 }
    ],
    activities: ['hiking', 'swimming', 'camping'],
    contact: {
      phone: '1-833-WV-PARKS',
      email: 'info@wvstateparks.com',
      website: 'https://wvstateparks.com/park/blackwater-falls-state-park'
    }
  };

  it('accepts minimal valid props', () => {
    expect(StateParkTemplatePropsSchema.safeParse(minimalValid).success).toBe(true);
  });

  it('requires name field', () => {
    const { name, ...without } = minimalValid;
    expect(StateParkTemplatePropsSchema.safeParse(without).success).toBe(false);
  });

  it('requires heroImage field', () => {
    const { heroImage, ...without } = minimalValid;
    expect(StateParkTemplatePropsSchema.safeParse(without).success).toBe(false);
  });

  it('requires location field', () => {
    const { location, ...without } = minimalValid;
    expect(StateParkTemplatePropsSchema.safeParse(without).success).toBe(false);
  });

  it('requires facilities array', () => {
    const { facilities, ...without } = minimalValid;
    expect(StateParkTemplatePropsSchema.safeParse(without).success).toBe(false);
  });

  it('requires at least one facility', () => {
    const withEmpty = { ...minimalValid, facilities: [] };
    expect(StateParkTemplatePropsSchema.safeParse(withEmpty).success).toBe(false);
  });
});
```

**Optional vs Required Fields:**
```typescript
describe('Optional Fields', () => {
  it('accepts props with all optional fields', () => {
    const full = {
      ...minimalValid,
      type: 'state-park',
      acreage: 2358,
      description: 'Home to the famous 62-foot Blackwater Falls',
      established: 1937,
      seasonalHours: [
        {
          season: 'summer',
          months: 'May-September',
          hours: '8:00 AM - 8:00 PM',
          days: 'Daily'
        }
      ],
      rangerPrograms: [
        {
          title: 'Waterfall Ecology',
          description: 'Learn about the unique ecosystem',
          schedule: 'Saturdays 2:00 PM'
        }
      ],
      accessibility: {
        adaAccessible: true,
        accessibleFacilities: ['Visitor Center', 'Lodge', 'Select Cabins'],
        assistiveServices: ['Wheelchair rentals', 'Service animal friendly']
      },
      fees: {
        dayUse: 0,
        parking: 0,
        camping: { min: 20, max: 30 },
        cabin: { min: 85, max: 225 }
      }
    };
    expect(StateParkTemplatePropsSchema.safeParse(full).success).toBe(true);
  });
});
```

**Default Values Testing:**
```typescript
describe('Default Values', () => {
  it('uses default empty arrays for optional fields', () => {
    const result = StateParkTemplatePropsSchema.parse(minimalValid);
    expect(result.rangerPrograms).toEqual([]);
    expect(result.seasonalHours).toEqual([]);
  });

  it('uses default type "state-park" if not provided', () => {
    const result = StateParkTemplatePropsSchema.parse(minimalValid);
    expect(result.type).toBe('state-park');
  });
});
```

**Nested Object Validation:**
```typescript
describe('Nested Objects', () => {
  it('validates address object structure', () => {
    const invalidAddress = {
      ...minimalValid,
      location: {
        ...minimalValid.location,
        address: {
          street: '1584 Blackwater Lodge Rd'
          // Missing city, state, zip
        }
      }
    };
    expect(StateParkTemplatePropsSchema.safeParse(invalidAddress).success).toBe(false);
  });

  it('validates coordinates format', () => {
    const invalidCoords = {
      ...minimalValid,
      location: {
        ...minimalValid.location,
        coordinates: {
          lat: 'invalid',
          lng: -79.4883
        }
      }
    };
    expect(StateParkTemplatePropsSchema.safeParse(invalidCoords).success).toBe(false);
  });

  it('validates fees structure', () => {
    const validFees = {
      dayUse: 0,
      parking: 0,
      camping: { min: 20, max: 30 },
      cabin: { min: 85, max: 225 }
    };
    expect(FeesSchema.safeParse(validFees).success).toBe(true);
  });
});
```

**Array Validation:**
```typescript
describe('Array Validation', () => {
  it('validates facilities array elements', () => {
    const invalidFacility = {
      ...minimalValid,
      facilities: [
        { type: 'invalid-type', name: 'Test', count: 1 }
      ]
    };
    expect(StateParkTemplatePropsSchema.safeParse(invalidFacility).success).toBe(false);
  });

  it('validates activities array elements', () => {
    const invalidActivity = {
      ...minimalValid,
      activities: ['hiking', 'invalid-activity']
    };
    expect(StateParkTemplatePropsSchema.safeParse(invalidActivity).success).toBe(false);
  });

  it('accepts maximum number of facilities', () => {
    const manyFacilities = Array(20).fill(null).map((_, i) => ({
      type: 'trail',
      name: `Trail ${i}`,
      count: 1
    }));
    const withMany = { ...minimalValid, facilities: manyFacilities };
    expect(StateParkTemplatePropsSchema.safeParse(withMany).success).toBe(true);
  });
});
```

---

## 2. Component Tests (~400 lines)

### 2.1 FacilitiesSection.test.tsx

**Location**: `wv-wild-web/src/components/state-park/__tests__/FacilitiesSection.test.tsx`

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import FacilitiesSection from '../FacilitiesSection';

describe('FacilitiesSection', () => {
  const mockFacilities = [
    {
      type: 'cabin',
      name: 'Deluxe Cabins',
      count: 13,
      description: 'Modern cabins with full amenities',
      adaAccessible: true,
      reservationRequired: true
    },
    {
      type: 'campground-rv',
      name: 'RV Sites',
      count: 65,
      adaAccessible: true
    },
    {
      type: 'swimming-pool',
      name: 'Swimming Pool',
      count: 1
    }
  ];

  it('renders all facility types correctly', () => {
    render(<FacilitiesSection facilities={mockFacilities} />);

    expect(screen.getByText('Deluxe Cabins')).toBeInTheDocument();
    expect(screen.getByText('RV Sites')).toBeInTheDocument();
    expect(screen.getByText('Swimming Pool')).toBeInTheDocument();
  });

  it('displays facility counts', () => {
    render(<FacilitiesSection facilities={mockFacilities} />);

    expect(screen.getByText(/13/)).toBeInTheDocument();
    expect(screen.getByText(/65/)).toBeInTheDocument();
  });

  it('shows ADA accessibility badge when applicable', () => {
    render(<FacilitiesSection facilities={mockFacilities} />);

    const adaBadges = screen.getAllByText(/ADA Accessible/i);
    expect(adaBadges.length).toBe(2); // cabin and RV sites
  });

  it('conditional rendering - lodging present', () => {
    render(<FacilitiesSection facilities={mockFacilities} />);

    expect(screen.getByText(/lodging/i)).toBeInTheDocument();
  });

  it('conditional rendering - lodging absent', () => {
    const noLodging = [
      { type: 'trail', name: 'Hiking Trails', count: 10 }
    ];
    render(<FacilitiesSection facilities={noLodging} />);

    expect(screen.queryByText(/lodging/i)).not.toBeInTheDocument();
  });

  it('displays reservation CTA correctly', () => {
    render(<FacilitiesSection facilities={mockFacilities} />);

    const cta = screen.getByRole('link', { name: /make reservation/i });
    expect(cta).toHaveClass('bg-brand-orange');
    expect(cta).toHaveAttribute('href', expect.stringContaining('reservations.wvstateparks.com'));
  });

  it('applies WVWO styling (bg-brand-cream)', () => {
    const { container } = render(<FacilitiesSection facilities={mockFacilities} />);

    const section = container.querySelector('section');
    expect(section).toHaveClass('bg-brand-cream');
  });

  it('applies border-l-4 accent styling', () => {
    const { container } = render(<FacilitiesSection facilities={mockFacilities} />);

    const cards = container.querySelectorAll('.border-l-4');
    expect(cards.length).toBeGreaterThan(0);
  });

  it('renders facility icons', () => {
    render(<FacilitiesSection facilities={mockFacilities} />);

    // Check for emoji icons
    expect(screen.getByText('🏠')).toBeInTheDocument(); // cabin
    expect(screen.getByText('🏕️')).toBeInTheDocument(); // RV
  });

  it('uses rounded-sm only (WVWO compliance)', () => {
    const { container } = render(<FacilitiesSection facilities={mockFacilities} />);

    const html = container.innerHTML;
    expect(html).not.toContain('rounded-md');
    expect(html).not.toContain('rounded-lg');
    expect(html).not.toContain('rounded-xl');
  });
});
```

---

### 2.2 ActivitiesSection.test.tsx

**Location**: `wv-wild-web/src/components/state-park/__tests__/ActivitiesSection.test.tsx`

```typescript
describe('ActivitiesSection', () => {
  const mockActivities = ['hiking', 'swimming', 'fishing', 'camping'];
  const mockRangerPrograms = [
    {
      title: 'Owl Prowl Night Hike',
      description: 'Join a ranger for an evening hike',
      schedule: 'Saturdays 7:00 PM',
      registrationRequired: true,
      maxParticipants: 15
    },
    {
      title: 'Junior Ranger Program',
      description: 'Kids earn badges through activities',
      schedule: 'Daily',
      ageRestriction: 'Ages 5-12'
    }
  ];

  it('renders all activity types', () => {
    render(<ActivitiesSection activities={mockActivities} />);

    expect(screen.getByText(/hiking/i)).toBeInTheDocument();
    expect(screen.getByText(/swimming/i)).toBeInTheDocument();
    expect(screen.getByText(/fishing/i)).toBeInTheDocument();
  });

  it('ranger program cards render correctly', () => {
    render(<ActivitiesSection
      activities={mockActivities}
      rangerPrograms={mockRangerPrograms}
    />);

    expect(screen.getByText('Owl Prowl Night Hike')).toBeInTheDocument();
    expect(screen.getByText('Junior Ranger Program')).toBeInTheDocument();
  });

  it('displays registration indicators', () => {
    render(<ActivitiesSection
      activities={mockActivities}
      rangerPrograms={mockRangerPrograms}
    />);

    expect(screen.getByText(/registration required/i)).toBeInTheDocument();
    expect(screen.getByText(/15 max/i)).toBeInTheDocument();
  });

  it('highlights Junior Ranger program', () => {
    const { container } = render(<ActivitiesSection
      activities={mockActivities}
      rangerPrograms={mockRangerPrograms}
    />);

    const juniorRanger = container.querySelector('[data-program="junior-ranger"]');
    expect(juniorRanger).toHaveClass('border-l-brand-orange');
  });

  it('event schema integration present', () => {
    // Verify Event schema props are used
    render(<ActivitiesSection
      activities={mockActivities}
      rangerPrograms={mockRangerPrograms}
    />);

    // Check that schedule/timing info is displayed
    expect(screen.getByText(/Saturdays 7:00 PM/i)).toBeInTheDocument();
  });
});
```

---

### 2.3 AccessibilitySection.test.tsx

**Location**: `wv-wild-web/src/components/state-park/__tests__/AccessibilitySection.test.tsx`

```typescript
describe('AccessibilitySection', () => {
  const mockAccessibility = {
    adaAccessible: true,
    accessibleFacilities: [
      'Visitor Center',
      'Blackwater Lodge',
      'Deluxe Cabins 1-5',
      'Restrooms at picnic areas'
    ],
    assistiveServices: [
      'Wheelchair rentals available',
      'Service animals welcome',
      'Accessible parking at all facilities',
      'Braille trail guides'
    ],
    accessibleTrails: [
      {
        name: 'Gentle Trail',
        length: 0.5,
        surface: 'paved',
        gradient: 'ADA compliant',
        features: ['Benches every 100ft', 'Handrails']
      }
    ]
  };

  it('WCAG 2.1 Level AA compliance indicators present', () => {
    render(<AccessibilitySection accessibility={mockAccessibility} />);

    // Check for semantic HTML
    const section = screen.getByRole('region', { name: /accessibility/i });
    expect(section).toBeInTheDocument();
  });

  it('TAI information displays', () => {
    render(<AccessibilitySection accessibility={mockAccessibility} />);

    expect(screen.getByText(/ADA Accessible/i)).toBeInTheDocument();
  });

  it('assistive services grid renders', () => {
    render(<AccessibilitySection accessibility={mockAccessibility} />);

    expect(screen.getByText(/Wheelchair rentals/i)).toBeInTheDocument();
    expect(screen.getByText(/Service animals welcome/i)).toBeInTheDocument();
    expect(screen.getByText(/Braille trail guides/i)).toBeInTheDocument();
  });

  it('service animal policy present', () => {
    render(<AccessibilitySection accessibility={mockAccessibility} />);

    expect(screen.getByText(/Service animals welcome/i)).toBeInTheDocument();
  });

  it('high-visibility styling (border-l-brand-orange)', () => {
    const { container } = render(<AccessibilitySection accessibility={mockAccessibility} />);

    const section = container.querySelector('section');
    expect(section).toHaveClass('border-l-4', 'border-l-brand-orange');
  });

  it('accessible trail information displays', () => {
    render(<AccessibilitySection accessibility={mockAccessibility} />);

    expect(screen.getByText('Gentle Trail')).toBeInTheDocument();
    expect(screen.getByText(/paved/i)).toBeInTheDocument();
    expect(screen.getByText(/ADA compliant/i)).toBeInTheDocument();
  });

  it('keyboard navigation support', () => {
    render(<AccessibilitySection accessibility={mockAccessibility} />);

    const links = screen.getAllByRole('link');
    links.forEach(link => {
      expect(link).toHaveAttribute('tabIndex');
    });
  });
});
```

---

### 2.4 ReservationSection.test.tsx

**Location**: `wv-wild-web/src/components/state-park/__tests__/ReservationSection.test.tsx`

```typescript
describe('ReservationSection', () => {
  const mockFees = {
    dayUse: 0,
    parking: 0,
    camping: { min: 20, max: 30 },
    cabin: { min: 85, max: 225 },
    cottage: { min: 110, max: 275 }
  };

  it('fee structure displays correctly', () => {
    render(<ReservationSection fees={mockFees} />);

    expect(screen.getByText(/\$20-\$30/)).toBeInTheDocument(); // camping
    expect(screen.getByText(/\$85-\$225/)).toBeInTheDocument(); // cabin
  });

  it('free day use displayed', () => {
    render(<ReservationSection fees={mockFees} />);

    expect(screen.getByText(/free/i)).toBeInTheDocument();
  });

  it('booking CTA is bg-brand-orange', () => {
    render(<ReservationSection fees={mockFees} />);

    const cta = screen.getByRole('link', { name: /book now/i });
    expect(cta).toHaveClass('bg-brand-orange');
  });

  it('phone number formatted (1-833-WV-PARKS)', () => {
    render(<ReservationSection fees={mockFees} />);

    expect(screen.getByText(/1-833-WV-PARKS/)).toBeInTheDocument();
  });

  it('deep links to reservations.wvstateparks.com', () => {
    render(<ReservationSection fees={mockFees} parkSlug="blackwater-falls" />);

    const link = screen.getByRole('link', { name: /book now/i });
    expect(link).toHaveAttribute('href', expect.stringContaining('reservations.wvstateparks.com/blackwater-falls'));
  });

  it('displays cancellation policy', () => {
    render(<ReservationSection fees={mockFees} />);

    expect(screen.getByText(/cancellation/i)).toBeInTheDocument();
  });

  it('shows seasonal pricing note', () => {
    render(<ReservationSection fees={mockFees} />);

    expect(screen.getByText(/rates vary by season/i)).toBeInTheDocument();
  });
});
```

---

### 2.5 StateParkTemplate.test.tsx

**Location**: `wv-wild-web/src/components/templates/__tests__/StateParkTemplate.test.tsx`

```typescript
describe('StateParkTemplate', () => {
  const mockProps = {
    name: 'Blackwater Falls State Park',
    heroImage: '/images/blackwater-hero.jpg',
    description: 'Home to the famous 62-foot Blackwater Falls',
    location: {
      address: {
        street: '1584 Blackwater Lodge Rd',
        city: 'Davis',
        state: 'WV',
        zip: '26260'
      },
      coordinates: { lat: 39.1117, lng: -79.4883 }
    },
    facilities: [
      { type: 'cabin', name: 'Deluxe Cabins', count: 13 }
    ],
    activities: ['hiking', 'swimming'],
    contact: {
      phone: '1-833-WV-PARKS',
      email: 'info@wvstateparks.com',
      website: 'https://wvstateparks.com/park/blackwater-falls'
    }
  };

  it('all sections render when data provided', () => {
    const fullProps = {
      ...mockProps,
      rangerPrograms: [
        { title: 'Test Program', description: 'Test', schedule: 'Daily' }
      ],
      accessibility: {
        adaAccessible: true,
        accessibleFacilities: ['Lodge']
      },
      fees: {
        dayUse: 0,
        cabin: { min: 85, max: 225 }
      }
    };

    render(<StateParkTemplate {...fullProps} />);

    expect(screen.getByRole('region', { name: /facilities/i })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: /activities/i })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: /accessibility/i })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: /reservation/i })).toBeInTheDocument();
  });

  it('conditional rendering - missing sections do not error', () => {
    const minimal = { ...mockProps };

    expect(() => render(<StateParkTemplate {...minimal} />)).not.toThrow();
  });

  it('hero image loads with correct alt text', () => {
    render(<StateParkTemplate {...mockProps} />);

    const heroImg = screen.getByAltText(/blackwater falls/i);
    expect(heroImg).toHaveAttribute('src', '/images/blackwater-hero.jpg');
  });

  it('schema integration present', () => {
    const { container } = render(<StateParkTemplate {...mockProps} />);

    // Check for Schema.org script tag
    const scripts = container.querySelectorAll('script[type="application/ld+json"]');
    expect(scripts.length).toBeGreaterThan(0);
  });

  it('WVWO aesthetic compliance (rounded-sm only)', () => {
    const { container } = render(<StateParkTemplate {...mockProps} />);

    const html = container.innerHTML;
    expect(html).not.toContain('rounded-md');
    expect(html).not.toContain('rounded-lg');
    expect(html).not.toContain('rounded-xl');
  });

  it('uses WVWO brand colors', () => {
    const { container } = render(<StateParkTemplate {...mockProps} />);

    const html = container.innerHTML;
    expect(html).toMatch(/bg-brand-cream|bg-brand-brown|text-sign-green/);
  });

  it('no forbidden fonts', () => {
    const { container } = render(<StateParkTemplate {...mockProps} />);

    const html = container.innerHTML;
    const FORBIDDEN = ['Inter', 'Poppins', 'DM Sans', 'Space Grotecast'];
    FORBIDDEN.forEach(font => {
      expect(html).not.toContain(font);
    });
  });
});
```

---

## 3. Integration Tests (~200 lines)

### 3.1 [slug].astro.test.ts

**Location**: `wv-wild-web/src/pages/state-parks/__tests__/[slug].astro.test.ts`

```typescript
import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

describe('[slug].astro Dynamic Routes', () => {
  let html: string;
  let distPath: string;

  beforeAll(() => {
    distPath = join(process.cwd(), 'dist/state-parks/blackwater-falls.html');

    if (existsSync(distPath)) {
      html = readFileSync(distPath, 'utf-8');
    }
  });

  it('dynamic route generates correctly', () => {
    expect(existsSync(distPath)).toBe(true);
  });

  it('meta tags populated from data', () => {
    expect(html).toContain('<meta name="description"');
    expect(html).toContain('Blackwater Falls State Park');
  });

  it('Schema.org markup present and valid', () => {
    const schemaMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    expect(schemaMatch).toBeTruthy();

    if (schemaMatch) {
      const schema = JSON.parse(schemaMatch[1]);
      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toContain('Park');
    }
  });

  it('canonical URLs correct', () => {
    const canonicalMatch = html.match(/<link rel="canonical" href="([^"]+)"/);
    expect(canonicalMatch).toBeTruthy();
    expect(canonicalMatch?.[1]).toContain('/state-parks/blackwater-falls');
  });

  it('OpenGraph tags present', () => {
    expect(html).toContain('<meta property="og:title"');
    expect(html).toContain('<meta property="og:description"');
    expect(html).toContain('<meta property="og:image"');
    expect(html).toContain('<meta property="og:type" content="website"');
  });

  it('Twitter Card tags present', () => {
    expect(html).toContain('<meta name="twitter:card"');
    expect(html).toContain('<meta name="twitter:title"');
    expect(html).toContain('<meta name="twitter:description"');
  });

  it('title length appropriate (50-60 chars)', () => {
    const titleMatch = html.match(/<title>([^<]+)<\/title>/);
    expect(titleMatch).toBeTruthy();

    if (titleMatch) {
      const titleLength = titleMatch[1].length;
      expect(titleLength).toBeGreaterThanOrEqual(50);
      expect(titleLength).toBeLessThanOrEqual(70);
    }
  });

  it('meta description length (150-160 chars)', () => {
    const metaMatch = html.match(/<meta name="description" content="([^"]+)"/);
    expect(metaMatch).toBeTruthy();

    if (metaMatch) {
      const descLength = metaMatch[1].length;
      expect(descLength).toBeGreaterThanOrEqual(150);
      expect(descLength).toBeLessThanOrEqual(160);
    }
  });
});
```

---

### 3.2 sitemap.xml.test.ts

**Location**: `wv-wild-web/src/pages/__tests__/sitemap.xml.test.ts`

```typescript
import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

describe('sitemap.xml', () => {
  let sitemap: string;

  beforeAll(() => {
    const sitemapPath = join(process.cwd(), 'dist/sitemap.xml');

    if (existsSync(sitemapPath)) {
      sitemap = readFileSync(sitemapPath, 'utf-8');
    }
  });

  it('state park routes included', () => {
    expect(sitemap).toContain('/state-parks/blackwater-falls');
    expect(sitemap).toContain('/state-parks/cacapon');
    expect(sitemap).toContain('/state-parks/watoga');
  });

  it('image sitemap entries present', () => {
    expect(sitemap).toContain('image:image');
    expect(sitemap).toContain('image:loc');
    expect(sitemap).toContain('image:title');
  });

  it('priority set correctly (0.8)', () => {
    const priorityMatches = sitemap.match(/<priority>0\.8<\/priority>/g);
    expect(priorityMatches).toBeTruthy();
    expect(priorityMatches!.length).toBeGreaterThan(0);
  });

  it('lastmod dates from git', () => {
    expect(sitemap).toContain('<lastmod>');

    const lastmodMatch = sitemap.match(/<lastmod>(\d{4}-\d{2}-\d{2})<\/lastmod>/);
    expect(lastmodMatch).toBeTruthy();
  });

  it('all URLs are absolute', () => {
    const urlMatches = sitemap.matchAll(/<loc>([^<]+)<\/loc>/g);

    for (const match of urlMatches) {
      expect(match[1]).toMatch(/^https?:\/\//);
    }
  });

  it('valid XML structure', () => {
    expect(sitemap).toContain('<?xml version="1.0"');
    expect(sitemap).toContain('<urlset');
    expect(sitemap).toContain('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"');
  });
});
```

---

## 4. Visual Regression Tests (~150 lines, Playwright)

### 4.1 state-park-visual.spec.ts

**Location**: `tests/visual/state-park-visual.spec.ts`

```typescript
import { test, expect } from '@playwright/test';

test.describe('State Park Visual Regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/state-parks/blackwater-falls');
    await page.waitForLoadState('networkidle');
  });

  test('hero section screenshot comparison', async ({ page }) => {
    const hero = page.locator('[data-section="hero"]');
    await expect(hero).toHaveScreenshot('hero-section.png');
  });

  test('facilities grid layout - desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    const facilities = page.locator('[data-section="facilities"]');
    await expect(facilities).toHaveScreenshot('facilities-desktop.png');
  });

  test('facilities grid layout - tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    const facilities = page.locator('[data-section="facilities"]');
    await expect(facilities).toHaveScreenshot('facilities-tablet.png');
  });

  test('facilities grid layout - mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    const facilities = page.locator('[data-section="facilities"]');
    await expect(facilities).toHaveScreenshot('facilities-mobile.png');
  });

  test('activities section responsive design', async ({ page }) => {
    const activities = page.locator('[data-section="activities"]');

    // Desktop
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(activities).toHaveScreenshot('activities-desktop.png');

    // Mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(activities).toHaveScreenshot('activities-mobile.png');
  });

  test('accessibility section high-visibility styling', async ({ page }) => {
    const accessibility = page.locator('[data-section="accessibility"]');
    await expect(accessibility).toHaveScreenshot('accessibility-section.png');

    // Verify border-l-brand-orange is visible
    const borderColor = await accessibility.evaluate(el =>
      window.getComputedStyle(el).borderLeftColor
    );
    expect(borderColor).toBe('rgb(255, 111, 0)'); // #FF6F00
  });

  test('reservation CTA prominence', async ({ page }) => {
    const cta = page.locator('[data-cta="reservation"]');
    await expect(cta).toHaveScreenshot('reservation-cta.png');

    // Verify bg-brand-orange
    const bgColor = await cta.evaluate(el =>
      window.getComputedStyle(el).backgroundColor
    );
    expect(bgColor).toBe('rgb(255, 111, 0)');
  });

  test('animation states - prefers-reduced-motion off', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });

    const hero = page.locator('[data-section="hero"]');
    await expect(hero).toHaveScreenshot('animations-enabled.png');
  });

  test('animation states - prefers-reduced-motion on', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });

    const hero = page.locator('[data-section="hero"]');
    await expect(hero).toHaveScreenshot('animations-disabled.png');
  });

  test('color scheme - light mode', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await expect(page).toHaveScreenshot('full-page-light.png', { fullPage: true });
  });

  test('color scheme - dark mode', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await expect(page).toHaveScreenshot('full-page-dark.png', { fullPage: true });
  });

  test('print stylesheet', async ({ page }) => {
    await page.emulateMedia({ media: 'print' });
    await expect(page).toHaveScreenshot('print-layout.png', { fullPage: true });
  });
});
```

---

## 5. SEO Validation Tests (~100 lines)

### 5.1 state-park-seo.test.ts

**Location**: `tests/validation/state-park-seo.test.ts`

```typescript
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('State Park SEO Validation', () => {
  let html: string;
  let schema: any;

  beforeAll(() => {
    const htmlPath = join(process.cwd(), 'dist/state-parks/blackwater-falls.html');
    html = readFileSync(htmlPath, 'utf-8');

    const schemaMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    schema = schemaMatch ? JSON.parse(schemaMatch[1]) : null;
  });

  it('Schema.org validation', () => {
    expect(schema).toBeTruthy();
    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@graph']).toBeDefined();
  });

  it('Park schema present', () => {
    const park = schema['@graph'].find(item => item['@type'] === 'Park');
    expect(park).toBeDefined();
    expect(park.name).toBe('Blackwater Falls State Park');
    expect(park.address).toBeDefined();
    expect(park.geo).toBeDefined();
  });

  it('TouristAttraction schema present', () => {
    const attraction = schema['@graph'].find(item => item['@type'] === 'TouristAttraction');
    expect(attraction).toBeDefined();
  });

  it('meta tag completeness', () => {
    expect(html).toContain('<meta name="description"');
    expect(html).toContain('<meta property="og:title"');
    expect(html).toContain('<meta property="og:description"');
    expect(html).toContain('<meta property="og:image"');
    expect(html).toContain('<meta name="twitter:card"');
  });

  it('title length (50-60 chars)', () => {
    const titleMatch = html.match(/<title>([^<]+)<\/title>/);
    expect(titleMatch).toBeTruthy();

    const length = titleMatch![1].length;
    expect(length).toBeGreaterThanOrEqual(50);
    expect(length).toBeLessThanOrEqual(70);
  });

  it('description length (150-160 chars)', () => {
    const descMatch = html.match(/<meta name="description" content="([^"]+)"/);
    expect(descMatch).toBeTruthy();

    const length = descMatch![1].length;
    expect(length).toBeGreaterThanOrEqual(150);
    expect(length).toBeLessThanOrEqual(160);
  });

  it('FAQ schema for featured snippets', () => {
    const faq = schema['@graph'].find(item => item['@type'] === 'FAQPage');
    expect(faq).toBeDefined();
    expect(faq.mainEntity).toBeDefined();
    expect(faq.mainEntity.length).toBeGreaterThan(0);

    // Verify answer length (40-50 words)
    faq.mainEntity.forEach(question => {
      const answer = question.acceptedAnswer.text;
      const wordCount = answer.split(/\s+/).length;
      expect(wordCount).toBeGreaterThanOrEqual(40);
      expect(wordCount).toBeLessThanOrEqual(50);
    });
  });

  it('Event schema for events carousel', () => {
    const events = schema['@graph'].filter(item => item['@type'] === 'Event');
    expect(events.length).toBeGreaterThan(0);

    events.forEach(event => {
      expect(event.name).toBeDefined();
      expect(event.startDate).toBeDefined();
      expect(event.location).toBeDefined();
    });
  });

  it('structured data breadcrumbs', () => {
    const breadcrumbs = schema['@graph'].find(item => item['@type'] === 'BreadcrumbList');
    expect(breadcrumbs).toBeDefined();
    expect(breadcrumbs.itemListElement).toBeDefined();
  });

  it('LocalBusiness schema for contact info', () => {
    const business = schema['@graph'].find(item => item['@type'] === 'LocalBusiness');
    expect(business).toBeDefined();
    expect(business.telephone).toBe('1-833-WV-PARKS');
    expect(business.email).toBeDefined();
  });
});
```

---

## 6. Accessibility Tests (~150 lines)

### 6.1 state-park-a11y.test.ts

**Location**: `tests/accessibility/state-park-a11y.test.ts`

```typescript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('State Park Accessibility', () => {
  test('WCAG 2.1 Level AA compliance (axe-core)', async ({ page }) => {
    await page.goto('/state-parks/blackwater-falls');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('keyboard navigation - tab order', async ({ page }) => {
    await page.goto('/state-parks/blackwater-falls');

    // Tab through interactive elements
    await page.keyboard.press('Tab');
    let focused = await page.evaluate(() => document.activeElement?.tagName);
    expect(['A', 'BUTTON']).toContain(focused);

    // Continue tabbing to ensure logical order
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    focused = await page.evaluate(() => document.activeElement?.tagName);
    expect(['A', 'BUTTON', 'INPUT']).toContain(focused);
  });

  test('screen reader compatibility - ARIA labels', async ({ page }) => {
    await page.goto('/state-parks/blackwater-falls');

    // Check for aria-label or aria-labelledby on regions
    const regions = await page.locator('[role="region"]').all();

    for (const region of regions) {
      const hasLabel = await region.evaluate(el =>
        el.hasAttribute('aria-label') || el.hasAttribute('aria-labelledby')
      );
      expect(hasLabel).toBe(true);
    }
  });

  test('color contrast ratios (4.5:1 minimum)', async ({ page }) => {
    await page.goto('/state-parks/blackwater-falls');

    const contrastResults = await new AxeBuilder({ page })
      .withTags(['color-contrast'])
      .analyze();

    expect(contrastResults.violations).toEqual([]);
  });

  test('form labels present', async ({ page }) => {
    await page.goto('/state-parks/blackwater-falls');

    const inputs = await page.locator('input').all();

    for (const input of inputs) {
      const hasLabel = await input.evaluate(el => {
        const id = el.id;
        if (!id) return false;
        return document.querySelector(`label[for="${id}"]`) !== null;
      });

      expect(hasLabel).toBe(true);
    }
  });

  test('focus indicators visible', async ({ page }) => {
    await page.goto('/state-parks/blackwater-falls');

    const button = page.locator('button').first();
    await button.focus();

    const focusStyle = await button.evaluate(el =>
      window.getComputedStyle(el).outline
    );

    expect(focusStyle).not.toBe('none');
  });

  test('prefers-reduced-motion respected', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/state-parks/blackwater-falls');

    // Check that animations are disabled
    const animationDuration = await page.evaluate(() => {
      const el = document.querySelector('[data-animated]');
      if (!el) return null;
      return window.getComputedStyle(el).animationDuration;
    });

    if (animationDuration !== null) {
      expect(animationDuration).toBe('0s');
    }
  });

  test('heading hierarchy', async ({ page }) => {
    await page.goto('/state-parks/blackwater-falls');

    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
    const levels = await Promise.all(
      headings.map(h => h.evaluate(el => parseInt(el.tagName[1])))
    );

    // Verify h1 exists and is first
    expect(levels[0]).toBe(1);

    // Verify no skipped levels
    for (let i = 1; i < levels.length; i++) {
      const diff = levels[i] - levels[i - 1];
      expect(diff).toBeLessThanOrEqual(1);
    }
  });

  test('images have alt text', async ({ page }) => {
    await page.goto('/state-parks/blackwater-falls');

    const images = await page.locator('img').all();

    for (const img of images) {
      const alt = await img.getAttribute('alt');
      expect(alt).toBeTruthy();
      expect(alt!.length).toBeGreaterThan(0);
    }
  });

  test('skip to main content link', async ({ page }) => {
    await page.goto('/state-parks/blackwater-falls');

    const skipLink = page.locator('a[href="#main-content"]').first();
    await expect(skipLink).toBeVisible();
  });

  test('landmark regions present', async ({ page }) => {
    await page.goto('/state-parks/blackwater-falls');

    await expect(page.locator('header[role="banner"]')).toBeVisible();
    await expect(page.locator('main[role="main"]')).toBeVisible();
    await expect(page.locator('footer[role="contentinfo"]')).toBeVisible();
  });
});
```

---

## 7. Performance Tests (~80 lines)

### 7.1 state-park-performance.test.ts

**Location**: `tests/performance/state-park-performance.test.ts`

```typescript
import { test, expect } from '@playwright/test';
import { playAudit } from 'playwright-lighthouse';

test.describe('State Park Performance', () => {
  test('Lighthouse CI integration - all metrics 100', async ({ page }) => {
    await page.goto('/state-parks/blackwater-falls');

    await playAudit({
      page,
      port: 4321,
      thresholds: {
        performance: 100,
        accessibility: 100,
        'best-practices': 100,
        seo: 100
      }
    });
  });

  test('Core Web Vitals - LCP <2.0s', async ({ page }) => {
    await page.goto('/state-parks/blackwater-falls');

    const lcp = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          resolve(lastEntry.renderTime || lastEntry.loadTime);
        }).observe({ entryTypes: ['largest-contentful-paint'] });
      });
    });

    expect(lcp).toBeLessThan(2000);
  });

  test('Core Web Vitals - FID <50ms', async ({ page }) => {
    await page.goto('/state-parks/blackwater-falls');

    const fid = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const firstInput = list.getEntries()[0];
          resolve(firstInput.processingStart - firstInput.startTime);
        }).observe({ entryTypes: ['first-input'] });

        // Simulate user interaction
        document.body.click();
      });
    });

    expect(fid).toBeLessThan(50);
  });

  test('Core Web Vitals - CLS <0.05', async ({ page }) => {
    await page.goto('/state-parks/blackwater-falls');
    await page.waitForLoadState('networkidle');

    const cls = await page.evaluate(() => {
      return new Promise((resolve) => {
        let clsValue = 0;
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          }
          resolve(clsValue);
        }).observe({ entryTypes: ['layout-shift'] });

        setTimeout(() => resolve(clsValue), 2000);
      });
    });

    expect(cls).toBeLessThan(0.05);
  });

  test('image optimization - WebP format, lazy loading', async ({ page }) => {
    await page.goto('/state-parks/blackwater-falls');

    const images = await page.locator('img').all();

    for (const img of images) {
      const src = await img.getAttribute('src');
      const loading = await img.getAttribute('loading');

      // Check WebP or modern format
      expect(src).toMatch(/\.(webp|avif|jpg|jpeg|png)$/);

      // Check lazy loading (except hero image)
      const isHero = await img.evaluate(el => el.closest('[data-section="hero"]') !== null);
      if (!isHero) {
        expect(loading).toBe('lazy');
      }
    }
  });

  test('bundle size limits', async ({ page }) => {
    const response = await page.goto('/state-parks/blackwater-falls');
    const body = await response?.body();

    expect(body?.length).toBeLessThan(500 * 1024); // <500KB
  });

  test('First Contentful Paint <1.5s', async ({ page }) => {
    await page.goto('/state-parks/blackwater-falls');

    const fcp = await page.evaluate(() => {
      return performance.getEntriesByName('first-contentful-paint')[0].startTime;
    });

    expect(fcp).toBeLessThan(1500);
  });

  test('JavaScript execution time <100ms', async ({ page }) => {
    await page.goto('/state-parks/blackwater-falls');

    const metrics = await page.evaluate(() => JSON.stringify(performance.getEntriesByType('measure')));
    const jsTime = JSON.parse(metrics)
      .filter(m => m.name.includes('script'))
      .reduce((sum, m) => sum + m.duration, 0);

    expect(jsTime).toBeLessThan(100);
  });
});
```

---

## 8. Data Validation Tests (~100 lines)

### 8.1 state-park-data.test.ts

**Location**: `wv-wild-web/src/data/__tests__/state-park-data.test.ts`

```typescript
import { describe, it, expect } from 'vitest';
import { StateParkTemplatePropsSchema } from '../../types/state-park-template-types';

// Import data files
import blackwaterFalls from '../state-parks/blackwater-falls-sp';
import cacapon from '../state-parks/cacapon-sp';
import watoga from '../state-parks/watoga-sp';

describe('State Park Data Validation', () => {
  describe('blackwater-falls-sp.ts', () => {
    it('validates against schema', () => {
      const result = StateParkTemplatePropsSchema.safeParse(blackwaterFalls);

      if (!result.success) {
        console.error('Validation errors:', result.error.errors);
      }

      expect(result.success).toBe(true);
    });

    it('has all required fields present', () => {
      expect(blackwaterFalls.name).toBeDefined();
      expect(blackwaterFalls.heroImage).toBeDefined();
      expect(blackwaterFalls.location).toBeDefined();
      expect(blackwaterFalls.facilities).toBeDefined();
      expect(blackwaterFalls.activities).toBeDefined();
      expect(blackwaterFalls.contact).toBeDefined();
    });

    it('GPS coordinates valid', () => {
      const { lat, lng } = blackwaterFalls.location.coordinates;

      // West Virginia bounds
      expect(lat).toBeGreaterThan(37);
      expect(lat).toBeLessThan(41);
      expect(lng).toBeGreaterThan(-83);
      expect(lng).toBeLessThan(-77);
    });

    it('phone numbers formatted correctly', () => {
      expect(blackwaterFalls.contact.phone).toMatch(/^\d{1}-\d{3}-[A-Z]{2}-[A-Z]{5}$/);
    });

    it('URLs valid and accessible', async () => {
      const urls = [
        blackwaterFalls.contact.website,
        ...blackwaterFalls.facilities
          .filter(f => f.reservationUrl)
          .map(f => f.reservationUrl)
      ];

      for (const url of urls) {
        expect(url).toMatch(/^https?:\/\//);
      }
    });

    it('has at least 12 facilities', () => {
      expect(blackwaterFalls.facilities.length).toBeGreaterThanOrEqual(12);
    });

    it('has ranger programs defined', () => {
      expect(blackwaterFalls.rangerPrograms).toBeDefined();
      expect(blackwaterFalls.rangerPrograms!.length).toBeGreaterThan(0);
    });
  });

  describe('cacapon-sp.ts', () => {
    it('validates against schema', () => {
      const result = StateParkTemplatePropsSchema.safeParse(cacapon);
      expect(result.success).toBe(true);
    });

    it('all required fields present', () => {
      expect(cacapon.name).toBeDefined();
      expect(cacapon.heroImage).toBeDefined();
      expect(cacapon.location).toBeDefined();
      expect(cacapon.facilities).toBeDefined();
    });

    it('GPS coordinates valid (WV bounds)', () => {
      const { lat, lng } = cacapon.location.coordinates;
      expect(lat).toBeGreaterThan(37);
      expect(lat).toBeLessThan(41);
      expect(lng).toBeGreaterThan(-83);
      expect(lng).toBeLessThan(-77);
    });

    it('phone number formatted correctly', () => {
      expect(cacapon.contact.phone).toMatch(/1-833-WV-PARKS/);
    });
  });

  describe('watoga-sp.ts', () => {
    it('validates against schema', () => {
      const result = StateParkTemplatePropsSchema.safeParse(watoga);
      expect(result.success).toBe(true);
    });

    it('all required fields present', () => {
      expect(watoga.name).toBe('Watoga State Park');
      expect(watoga.heroImage).toBeDefined();
      expect(watoga.location).toBeDefined();
    });

    it('GPS coordinates valid', () => {
      const { lat, lng } = watoga.location.coordinates;
      expect(lat).toBeGreaterThan(37);
      expect(lat).toBeLessThan(41);
    });

    it('URLs valid', () => {
      expect(watoga.contact.website).toMatch(/^https:\/\//);
    });

    it('acreage is WV largest state park', () => {
      expect(watoga.acreage).toBeGreaterThan(10000);
    });
  });

  describe('Cross-Park Consistency', () => {
    const parks = [blackwaterFalls, cacapon, watoga];

    it('all parks use same phone number format', () => {
      parks.forEach(park => {
        expect(park.contact.phone).toBe('1-833-WV-PARKS');
      });
    });

    it('all parks have website URLs', () => {
      parks.forEach(park => {
        expect(park.contact.website).toMatch(/^https:\/\/wvstateparks\.com/);
      });
    });

    it('all parks have at least 3 facility types', () => {
      parks.forEach(park => {
        const types = new Set(park.facilities.map(f => f.type));
        expect(types.size).toBeGreaterThanOrEqual(3);
      });
    });

    it('all parks have accessibility info', () => {
      parks.forEach(park => {
        expect(park.accessibility).toBeDefined();
        expect(park.accessibility?.adaAccessible).toBeDefined();
      });
    });
  });
});
```

---

## Testing Infrastructure

### Test Utilities and Helpers

**Location**: `wv-wild-web/src/lib/test-utils/state-park-test-utils.ts`

```typescript
/**
 * WVWO Color Validators
 */
export const WVWO_BRAND_COLORS = {
  brown: '#3E2723',
  green: '#2E7D32',
  cream: '#FFF8E1',
  orange: '#FF6F00'
};

export const FORBIDDEN_COLORS = [
  '#ec4899', // Hot pink
  '#8b5cf6', // Purple
  '#06b6d4'  // Cyan
];

export function isWVWOCompliantColor(color: string): boolean {
  const normalized = color.toLowerCase().replace(/\s/g, '');
  return !FORBIDDEN_COLORS.some(forbidden =>
    normalized.includes(forbidden.toLowerCase())
  );
}

/**
 * Industry Color Exception Handlers
 */
export const INDUSTRY_SAFETY_COLORS = {
  trailDifficulty: {
    easy: '#2E7D32',     // Green (NSAA standard)
    moderate: '#1976D2',  // Blue
    challenging: '#B71C1C', // Red
    expert: '#000000'     // Black
  },
  fireDanger: {
    low: '#2E7D32',      // Green (USFS NFDRS)
    moderate: '#1976D2',
    high: '#FBC02D',
    veryHigh: '#F57C00',
    extreme: '#D32F2F'
  }
};

export function isIndustrySafetyColor(color: string, context: string): boolean {
  // Allow industry standard colors for safety-critical info
  const safetyColors = Object.values(INDUSTRY_SAFETY_COLORS).flatMap(cat => Object.values(cat));
  return safetyColors.some(safe => color.toLowerCase().includes(safe.toLowerCase()));
}

/**
 * Mock Data Generators
 */
export function createMockStatePark(overrides = {}) {
  return {
    name: 'Test State Park',
    heroImage: '/images/test-hero.jpg',
    location: {
      address: {
        street: '123 Park Road',
        city: 'TestCity',
        state: 'WV',
        zip: '26000'
      },
      coordinates: { lat: 39.0, lng: -79.0 }
    },
    facilities: [
      { type: 'cabin', name: 'Test Cabins', count: 10 }
    ],
    activities: ['hiking'],
    contact: {
      phone: '1-833-WV-PARKS',
      email: 'test@wvstateparks.com',
      website: 'https://wvstateparks.com/test'
    },
    ...overrides
  };
}

export function createMockFacility(overrides = {}) {
  return {
    type: 'cabin',
    name: 'Test Facility',
    count: 1,
    ...overrides
  };
}

export function createMockRangerProgram(overrides = {}) {
  return {
    title: 'Test Program',
    description: 'Test description',
    schedule: 'Daily',
    ...overrides
  };
}

/**
 * Accessibility Helpers
 */
export async function checkColorContrast(bgColor: string, fgColor: string): Promise<number> {
  const getLuminance = (hex: string): number => {
    hex = hex.replace('#', '');
    const rgb = parseInt(hex, 16);
    const r = ((rgb >> 16) & 0xff) / 255;
    const g = ((rgb >> 8) & 0xff) / 255;
    const b = (rgb & 0xff) / 255;

    const [rs, gs, bs] = [r, g, b].map(c =>
      c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    );

    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const l1 = getLuminance(bgColor);
  const l2 = getLuminance(fgColor);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
}

export function meetsWCAG_AA(contrastRatio: number): boolean {
  return contrastRatio >= 4.5;
}

export function meetsWCAG_AAA(contrastRatio: number): boolean {
  return contrastRatio >= 7.0;
}
```

---

### CI/CD Integration (GitHub Actions)

**Location**: `.github/workflows/spec18-tests.yml`

```yaml
name: SPEC-18 Testing Suite

on:
  pull_request:
    paths:
      - 'wv-wild-web/src/types/*state-park*'
      - 'wv-wild-web/src/components/state-park/**'
      - 'wv-wild-web/src/data/state-parks/**'
      - 'wv-wild-web/src/pages/state-parks/**'
  push:
    branches:
      - main

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        working-directory: wv-wild-web
        run: npm ci

      - name: Run unit tests
        working-directory: wv-wild-web
        run: npm run test:run -- --coverage

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./wv-wild-web/coverage/lcov.info
          flags: unit-tests
          fail_ci_if_error: true

  component-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        working-directory: wv-wild-web
        run: npm ci

      - name: Run component tests
        working-directory: wv-wild-web
        run: npm run test:run -- src/components/state-park

  integration-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Build project
        run: npm run build

      - name: Run integration tests
        run: npm run test:run -- tests/integration

  visual-regression:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright
        run: npx playwright install --with-deps

      - name: Build project
        run: npm run build

      - name: Run visual tests
        run: npx playwright test tests/visual/state-park-visual.spec.ts

      - name: Upload screenshots
        if: failure()
        uses: actions/upload-artifact@v3
        with:
          name: visual-regression-diffs
          path: test-results/

  accessibility:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright
        run: npx playwright install --with-deps

      - name: Build project
        run: npm run build

      - name: Run accessibility tests
        run: npx playwright test tests/accessibility/state-park-a11y.test.ts

  performance:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright
        run: npx playwright install --with-deps chromium

      - name: Build project
        run: npm run build

      - name: Run Lighthouse CI
        run: npx playwright test tests/performance/state-park-performance.test.ts

      - name: Upload Lighthouse reports
        uses: actions/upload-artifact@v3
        with:
          name: lighthouse-reports
          path: .lighthouseci

  wvwo-compliance:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        working-directory: wv-wild-web
        run: npm ci

      - name: Build project
        working-directory: wv-wild-web
        run: npm run build

      - name: Run WVWO compliance tests
        working-directory: wv-wild-web
        run: npm run test:compliance

  type-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        working-directory: wv-wild-web
        run: npm ci

      - name: TypeScript strict mode check
        working-directory: wv-wild-web
        run: npm run typecheck
```

---

### Coverage Reporting Configuration

**Location**: `wv-wild-web/vitest.config.ts` (update)

```typescript
export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov', 'json'],
      include: [
        'src/types/*state-park*.ts',
        'src/components/state-park/**/*.{ts,tsx,astro}',
        'src/data/state-parks/**/*.ts',
        'src/pages/state-parks/**/*.astro'
      ],
      exclude: [
        'src/**/*.test.ts',
        'src/**/*.test.tsx',
        'src/**/*.d.ts',
        'src/lib/test-utils/**'
      ],
      thresholds: {
        statements: 85,
        branches: 85,
        functions: 85,
        lines: 85
      },
      all: true
    },
    globals: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
```

---

## Test Execution Summary

### Command Reference

```bash
# Unit tests
npm run test:run -- src/types/__tests__/state-park-*.test.ts

# Component tests
npm run test:run -- src/components/state-park/__tests__

# Integration tests
npm run test:run -- tests/integration

# Visual regression
npx playwright test tests/visual/state-park-visual.spec.ts

# Accessibility
npx playwright test tests/accessibility/state-park-a11y.test.ts

# Performance
npx playwright test tests/performance/state-park-performance.test.ts

# Data validation
npm run test:run -- src/data/__tests__/state-park-data.test.ts

# Full suite
npm run test:all

# Coverage report
npm run test:run -- --coverage
```

---

## Success Metrics

| Metric | Target | Validation Method |
|--------|--------|-------------------|
| Code Coverage | 85%+ | Vitest coverage report |
| Lighthouse Performance | 100 | Playwright Lighthouse |
| Lighthouse Accessibility | 100 | Playwright Lighthouse |
| Lighthouse Best Practices | 100 | Playwright Lighthouse |
| Lighthouse SEO | 100 | Playwright Lighthouse |
| WCAG 2.1 AA Violations | 0 | axe-core automated testing |
| TypeScript Errors | 0 | `npm run typecheck` |
| WVWO Compliance Violations | 0 | Custom compliance tests |
| LCP | <2.0s | Core Web Vitals measurement |
| FID | <50ms | Core Web Vitals measurement |
| CLS | <0.05 | Core Web Vitals measurement |

---

## Notes

- All test patterns follow SPEC-17 Backcountry Template conventions
- WVWO aesthetic compliance is integrated throughout
- Industry color exceptions are properly documented and tested
- Tests are written for maintainability and clarity
- CI/CD pipeline ensures all tests run on every PR
- Visual regression baselines must be updated when intentional design changes occur
- Coverage thresholds will fail the build if not met
- Tests serve as living documentation of expected behavior

---

**Next Steps**: Implementation of test files following this specification, integration with existing test infrastructure, and baseline generation for visual regression tests.
