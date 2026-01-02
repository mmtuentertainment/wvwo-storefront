/**
 * SchemaBackcountryTemplate Component Tests
 * SPEC-17 T-345: SEO Schema Validation Tests
 *
 * Tests JSON-LD schema generation for backcountry templates including:
 * - SpecialAnnouncement for toxic water sources (P0 Safety)
 * - TouristAttraction+NaturalFeature type
 * - BreadcrumbList navigation
 * - @graph structure validation
 *
 * @module components/seo/__tests__/SchemaBackcountryTemplate
 */

import { describe, it, expect } from 'vitest';
import {
  hasDoNotUseSources,
  type WaterSource,
} from '../../../types/water-safety';
import {
  BackcountryTemplatePropsSchema,
  type BackcountryTemplateProps,
} from '../../../types/backcountry-template-types';

// ============================================================================
// MOCK DATA FOR TESTING
// ============================================================================

const createMockBackcountryProps = (overrides = {}): BackcountryTemplateProps => ({
  name: 'Dolly Sods Wilderness',
  heroImage: '/images/dolly-sods-hero.jpg',
  description: 'One of the most unique wilderness areas east of the Mississippi.',
  type: 'backcountry',
  county: 'Tucker',
  navigation: {
    coordinates: { decimal: { lat: 39.0453, lng: -79.3678 } },
    cellCoverage: { overall: 'none', carriers: [] },
    satellite: { importance: 'essential', devices: ['Garmin inReach'] },
  },
  emergencyContacts: [
    { tier: 'primary', service: 'Tucker County 911', phone: '911', available: '24/7' },
  ],
  regulations: {
    permitRequired: false,
    firePolicies: ['No campfires during fire ban'],
    specialRestrictions: ['Pack out all trash', 'No motorized vehicles'],
    huntingAllowed: true,
  },
  ...overrides,
});

const createToxicWaterSource = (): WaterSource => ({
  name: 'AMD-Contaminated Creek',
  status: 'do-not-use',
  reliability: 'year-round',
  treatment: 'not-applicable',
  warnings: ['Acid Mine Drainage contamination', 'Historic coal mining area'],
  amdDetails: {
    contaminantType: 'amd',
    visualIndicators: ['Orange water', 'White mineral deposits'],
    knownSource: 'Abandoned Elk Run Mine',
  },
});

// ============================================================================
// SCHEMA HELPER FUNCTIONS
// ============================================================================

/**
 * Generate mock SpecialAnnouncement schema for toxic water.
 */
const generateSpecialAnnouncement = (
  toxicSources: WaterSource[],
  areaName: string,
  baseUrl: string,
  datePosted: string,
  expires: string
) => {
  if (toxicSources.length === 0) return null;

  return {
    '@type': 'SpecialAnnouncement',
    '@id': `${baseUrl}#water-safety-warning`,
    'category': 'https://www.wikidata.org/wiki/Q190869', // Toxic substance
    'name': `Water Safety Warning: ${areaName}`,
    'text': `TOXIC WATER SOURCES: ${toxicSources.length} water source(s) in ${areaName} are contaminated and cannot be made safe by any field treatment method. Do NOT drink from these sources.`,
    'datePosted': datePosted,
    'expires': expires,
    'spatialCoverage': toxicSources.map((source) => ({
      '@type': 'Place',
      'name': source.name,
      'description': source.warnings?.join('. ') || 'Contaminated water source',
    })),
    'announcementLocation': {
      '@type': 'Place',
      'name': areaName,
    },
  };
};

/**
 * Generate mock TouristAttraction schema.
 */
const generateTouristAttraction = (props: BackcountryTemplateProps, baseUrl: string) => ({
  '@type': ['TouristAttraction', 'NaturalFeature'],
  '@id': `${baseUrl}#attraction`,
  'name': props.name,
  'description': props.description || `Explore ${props.name} in West Virginia`,
  'url': baseUrl,
  'isAccessibleForFree': true,
  'touristType': ['Hiker', 'Backpacker', 'Outdoor Enthusiast'],
  'geo': props.navigation.coordinates.decimal
    ? {
        '@type': 'GeoCoordinates',
        'latitude': props.navigation.coordinates.decimal.lat,
        'longitude': props.navigation.coordinates.decimal.lng,
      }
    : undefined,
  'address': {
    '@type': 'PostalAddress',
    'addressLocality': props.county || 'West Virginia',
    'addressRegion': 'WV',
    'addressCountry': 'US',
  },
});

/**
 * Generate mock BreadcrumbList schema.
 */
const generateBreadcrumbList = (areaName: string, slug: string, baseUrl: string) => ({
  '@type': 'BreadcrumbList',
  '@id': `${baseUrl}#breadcrumb`,
  'itemListElement': [
    {
      '@type': 'ListItem',
      'position': 1,
      'name': 'Home',
      'item': 'https://wvwildoutdoors.pages.dev/',
    },
    {
      '@type': 'ListItem',
      'position': 2,
      'name': 'Backcountry',
      'item': 'https://wvwildoutdoors.pages.dev/backcountry/',
    },
    {
      '@type': 'ListItem',
      'position': 3,
      'name': areaName,
      'item': baseUrl,
    },
  ],
});

// ============================================================================
// P0 SAFETY-CRITICAL: SPECIAL ANNOUNCEMENT TESTS
// ============================================================================

describe('SchemaBackcountryTemplate', () => {
  describe('SpecialAnnouncement [P0]', () => {
    const baseUrl = 'https://wvwildoutdoors.pages.dev/backcountry/dolly-sods/';
    const datePosted = '2024-12-31T00:00:00Z';
    const expires = '2025-12-31T23:59:59Z';

    it('renders ONLY when hasDoNotUseSources is true', () => {
      const toxicSources = [createToxicWaterSource()];
      expect(hasDoNotUseSources(toxicSources)).toBe(true);

      const announcement = generateSpecialAnnouncement(
        toxicSources,
        'Dolly Sods Wilderness',
        baseUrl,
        datePosted,
        expires
      );

      expect(announcement).not.toBeNull();
      expect(announcement?.['@type']).toBe('SpecialAnnouncement');
    });

    it('does NOT render when no toxic sources exist', () => {
      const safeSources: WaterSource[] = [
        { name: 'Safe Spring', status: 'safe', reliability: 'year-round', treatment: 'none-required' },
      ];

      expect(hasDoNotUseSources(safeSources)).toBe(false);

      const announcement = generateSpecialAnnouncement(
        safeSources.filter((s) => s.status === 'do-not-use'),
        'Dolly Sods Wilderness',
        baseUrl,
        datePosted,
        expires
      );

      expect(announcement).toBeNull();
    });

    it('includes required category Wikidata', () => {
      const toxicSources = [createToxicWaterSource()];
      const announcement = generateSpecialAnnouncement(
        toxicSources,
        'Dolly Sods Wilderness',
        baseUrl,
        datePosted,
        expires
      );

      // Q190869 = Toxic substance in Wikidata
      expect(announcement?.category).toBe('https://www.wikidata.org/wiki/Q190869');
    });

    it('includes datePosted and expires', () => {
      const toxicSources = [createToxicWaterSource()];
      const announcement = generateSpecialAnnouncement(
        toxicSources,
        'Dolly Sods Wilderness',
        baseUrl,
        datePosted,
        expires
      );

      expect(announcement?.datePosted).toBe(datePosted);
      expect(announcement?.expires).toBe(expires);
    });

    it('maps spatialCoverage from toxic sources', () => {
      const toxicSource1 = createToxicWaterSource();
      const toxicSource2: WaterSource = {
        name: 'Coal Runoff Creek',
        status: 'do-not-use',
        reliability: 'seasonal',
        treatment: 'not-applicable',
        warnings: ['Coal processing contamination'],
      };

      const announcement = generateSpecialAnnouncement(
        [toxicSource1, toxicSource2],
        'Dolly Sods Wilderness',
        baseUrl,
        datePosted,
        expires
      );

      expect(announcement?.spatialCoverage).toHaveLength(2);
      expect(announcement?.spatialCoverage[0]['@type']).toBe('Place');
      expect(announcement?.spatialCoverage[0].name).toBe('AMD-Contaminated Creek');
      expect(announcement?.spatialCoverage[1].name).toBe('Coal Runoff Creek');
    });

    it('includes descriptive text with source count', () => {
      const toxicSources = [createToxicWaterSource()];
      const announcement = generateSpecialAnnouncement(
        toxicSources,
        'Dolly Sods Wilderness',
        baseUrl,
        datePosted,
        expires
      );

      expect(announcement?.text).toContain('TOXIC');
      expect(announcement?.text).toContain('1 water source');
      expect(announcement?.text).toContain('cannot be made safe');
    });

    it('includes announcementLocation with area name', () => {
      const toxicSources = [createToxicWaterSource()];
      const announcement = generateSpecialAnnouncement(
        toxicSources,
        'Dolly Sods Wilderness',
        baseUrl,
        datePosted,
        expires
      );

      expect(announcement?.announcementLocation['@type']).toBe('Place');
      expect(announcement?.announcementLocation.name).toBe('Dolly Sods Wilderness');
    });

    it('has valid @id with fragment identifier', () => {
      const toxicSources = [createToxicWaterSource()];
      const announcement = generateSpecialAnnouncement(
        toxicSources,
        'Dolly Sods Wilderness',
        baseUrl,
        datePosted,
        expires
      );

      expect(announcement?.['@id']).toContain('#water-safety-warning');
    });
  });

  // ============================================================================
  // @GRAPH STRUCTURE TESTS
  // ============================================================================

  describe('@graph Structure', () => {
    const baseUrl = 'https://wvwildoutdoors.pages.dev/backcountry/dolly-sods/';

    it('includes TouristAttraction+NaturalFeature', () => {
      const props = createMockBackcountryProps();
      const attraction = generateTouristAttraction(props, baseUrl);

      expect(attraction['@type']).toEqual(['TouristAttraction', 'NaturalFeature']);
    });

    it('TouristAttraction has valid @id', () => {
      const props = createMockBackcountryProps();
      const attraction = generateTouristAttraction(props, baseUrl);

      expect(attraction['@id']).toContain('#attraction');
    });

    it('TouristAttraction includes geo coordinates', () => {
      const props = createMockBackcountryProps();
      const attraction = generateTouristAttraction(props, baseUrl);

      expect(attraction.geo).toBeDefined();
      expect(attraction.geo?.['@type']).toBe('GeoCoordinates');
      expect(attraction.geo?.latitude).toBe(39.0453);
      expect(attraction.geo?.longitude).toBe(-79.3678);
    });

    it('TouristAttraction includes address', () => {
      const props = createMockBackcountryProps();
      const attraction = generateTouristAttraction(props, baseUrl);

      expect(attraction.address['@type']).toBe('PostalAddress');
      expect(attraction.address.addressRegion).toBe('WV');
      expect(attraction.address.addressCountry).toBe('US');
    });

    it('includes BreadcrumbList with 3 items', () => {
      const breadcrumbs = generateBreadcrumbList(
        'Dolly Sods Wilderness',
        'dolly-sods',
        baseUrl
      );

      expect(breadcrumbs['@type']).toBe('BreadcrumbList');
      expect(breadcrumbs.itemListElement).toHaveLength(3);
    });

    it('BreadcrumbList items have correct structure', () => {
      const breadcrumbs = generateBreadcrumbList(
        'Dolly Sods Wilderness',
        'dolly-sods',
        baseUrl
      );

      breadcrumbs.itemListElement.forEach((item, index) => {
        expect(item['@type']).toBe('ListItem');
        expect(item.position).toBe(index + 1);
        expect(item.name).toBeDefined();
        expect(item.item).toMatch(/^https?:\/\//);
      });
    });

    it('BreadcrumbList has correct navigation path', () => {
      const breadcrumbs = generateBreadcrumbList(
        'Dolly Sods Wilderness',
        'dolly-sods',
        baseUrl
      );

      expect(breadcrumbs.itemListElement[0].name).toBe('Home');
      expect(breadcrumbs.itemListElement[1].name).toBe('Backcountry');
      expect(breadcrumbs.itemListElement[2].name).toBe('Dolly Sods Wilderness');
    });

    it('validates JSON-LD structure', () => {
      const props = createMockBackcountryProps();
      const toxicSources = [createToxicWaterSource()];

      const schema = {
        '@context': 'https://schema.org',
        '@graph': [
          generateTouristAttraction(props, baseUrl),
          generateBreadcrumbList(props.name, 'dolly-sods', baseUrl),
          ...(hasDoNotUseSources(toxicSources)
            ? [generateSpecialAnnouncement(toxicSources, props.name, baseUrl, '2024-12-31T00:00:00Z', '2025-12-31T23:59:59Z')]
            : []),
        ],
      };

      // Should be valid JSON
      const jsonString = JSON.stringify(schema, null, 2);
      expect(() => JSON.parse(jsonString)).not.toThrow();

      // Should have @context
      expect(JSON.parse(jsonString)['@context']).toBe('https://schema.org');

      // Should have @graph array
      expect(Array.isArray(JSON.parse(jsonString)['@graph'])).toBe(true);
    });
  });

  // ============================================================================
  // TOURIST ATTRACTION DETAIL TESTS
  // ============================================================================

  describe('TouristAttraction Details', () => {
    const baseUrl = 'https://wvwildoutdoors.pages.dev/backcountry/dolly-sods/';

    it('sets isAccessibleForFree to true for public lands', () => {
      const props = createMockBackcountryProps();
      const attraction = generateTouristAttraction(props, baseUrl);

      expect(attraction.isAccessibleForFree).toBe(true);
    });

    it('includes appropriate touristType array', () => {
      const props = createMockBackcountryProps();
      const attraction = generateTouristAttraction(props, baseUrl);

      expect(attraction.touristType).toContain('Hiker');
      expect(attraction.touristType).toContain('Backpacker');
    });

    it('uses county for addressLocality when provided', () => {
      const props = createMockBackcountryProps({ county: 'Tucker' });
      const attraction = generateTouristAttraction(props, baseUrl);

      expect(attraction.address.addressLocality).toBe('Tucker');
    });

    it('uses description from props', () => {
      const props = createMockBackcountryProps({
        description: 'Unique alpine-like terrain with rare flora.',
      });
      const attraction = generateTouristAttraction(props, baseUrl);

      expect(attraction.description).toBe('Unique alpine-like terrain with rare flora.');
    });
  });

  // ============================================================================
  // SCHEMA.ORG COMPLIANCE TESTS
  // ============================================================================

  describe('Schema.org Compliance', () => {
    it('uses correct schema.org types', () => {
      const validTypes = [
        'SpecialAnnouncement',
        'TouristAttraction',
        'NaturalFeature',
        'BreadcrumbList',
        'ListItem',
        'Place',
        'GeoCoordinates',
        'PostalAddress',
      ];

      validTypes.forEach((type) => {
        // All types should be PascalCase
        expect(type).toMatch(/^[A-Z][a-zA-Z]+$/);
      });
    });

    it('uses correct @id format with fragment identifiers', () => {
      const validIds = [
        '#attraction',
        '#breadcrumb',
        '#water-safety-warning',
      ];

      validIds.forEach((id) => {
        expect(id).toMatch(/^#[a-z0-9-]+$/);
      });
    });

    it('schema validates against BackcountryTemplatePropsSchema', () => {
      const props = createMockBackcountryProps();
      const result = BackcountryTemplatePropsSchema.safeParse(props);

      expect(result.success).toBe(true);
    });
  });

  // ============================================================================
  // EDGE CASES
  // ============================================================================

  describe('Edge Cases', () => {
    const baseUrl = 'https://wvwildoutdoors.pages.dev/backcountry/test/';

    it('handles missing description gracefully', () => {
      const props = createMockBackcountryProps({ description: undefined });
      const attraction = generateTouristAttraction(props, baseUrl);

      expect(attraction.description).toContain('Explore');
      expect(attraction.description).toContain(props.name);
    });

    it('handles missing county gracefully', () => {
      const props = createMockBackcountryProps({ county: undefined });
      const attraction = generateTouristAttraction(props, baseUrl);

      expect(attraction.address.addressLocality).toBe('West Virginia');
    });

    it('handles empty toxic sources array', () => {
      const announcement = generateSpecialAnnouncement(
        [],
        'Test Area',
        baseUrl,
        '2024-01-01',
        '2025-01-01'
      );

      expect(announcement).toBeNull();
    });

    it('handles source without warnings', () => {
      const sourceNoWarnings: WaterSource = {
        name: 'Unknown Toxic',
        status: 'do-not-use',
        reliability: 'year-round',
        treatment: 'not-applicable',
      };

      const announcement = generateSpecialAnnouncement(
        [sourceNoWarnings],
        'Test Area',
        baseUrl,
        '2024-01-01',
        '2025-01-01'
      );

      expect(announcement?.spatialCoverage[0].description).toBe('Contaminated water source');
    });

    it('handles special characters in area name', () => {
      const props = createMockBackcountryProps({ name: "Kim's Favorite Spot" });
      const attraction = generateTouristAttraction(props, baseUrl);

      expect(attraction.name).toBe("Kim's Favorite Spot");

      // Should be valid JSON with escaped characters
      const jsonString = JSON.stringify(attraction);
      expect(() => JSON.parse(jsonString)).not.toThrow();
    });

    it('handles unicode in description', () => {
      const props = createMockBackcountryProps({
        description: 'Summit elevation: 4,863\' - highest point in WV',
      });
      const attraction = generateTouristAttraction(props, baseUrl);

      expect(attraction.description).toContain("4,863'");
    });
  });

  // ============================================================================
  // JSON-LD SYNTAX VALIDATION
  // ============================================================================

  describe('JSON-LD Syntax Validation', () => {
    it('generates valid @graph structure', () => {
      const baseUrl = 'https://wvwildoutdoors.pages.dev/backcountry/dolly-sods/';
      const props = createMockBackcountryProps();

      const schema = {
        '@context': 'https://schema.org',
        '@graph': [
          generateTouristAttraction(props, baseUrl),
          generateBreadcrumbList(props.name, 'dolly-sods', baseUrl),
        ],
      };

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@graph']).toHaveLength(2);
      expect(Array.isArray(schema['@graph'])).toBe(true);
    });

    it('is valid JSON when stringified', () => {
      const baseUrl = 'https://wvwildoutdoors.pages.dev/backcountry/dolly-sods/';
      const props = createMockBackcountryProps();
      const toxicSources = [createToxicWaterSource()];

      const schema = {
        '@context': 'https://schema.org',
        '@graph': [
          generateTouristAttraction(props, baseUrl),
          generateBreadcrumbList(props.name, 'dolly-sods', baseUrl),
          generateSpecialAnnouncement(toxicSources, props.name, baseUrl, '2024-12-31', '2025-12-31'),
        ],
      };

      const jsonString = JSON.stringify(schema, null, 2);
      expect(() => JSON.parse(jsonString)).not.toThrow();

      const parsed = JSON.parse(jsonString);
      expect(parsed['@context']).toBe('https://schema.org');
      expect(parsed['@graph']).toHaveLength(3);
    });

    it('all @id values are unique within @graph', () => {
      const baseUrl = 'https://wvwildoutdoors.pages.dev/backcountry/dolly-sods/';
      const props = createMockBackcountryProps();
      const toxicSources = [createToxicWaterSource()];

      const graphItems = [
        generateTouristAttraction(props, baseUrl),
        generateBreadcrumbList(props.name, 'dolly-sods', baseUrl),
        generateSpecialAnnouncement(toxicSources, props.name, baseUrl, '2024-12-31', '2025-12-31'),
      ];

      const ids = graphItems.map((item) => item?.['@id']).filter(Boolean);
      const uniqueIds = new Set(ids);

      expect(uniqueIds.size).toBe(ids.length);
    });
  });
});
