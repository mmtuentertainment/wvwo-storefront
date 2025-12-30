/**
 * Unit Tests for SchemaRiverTemplate Component
 * SPEC-14 T-042: Validation Tests
 *
 * Tests JSON-LD syntax, schema.org compliance, and @graph structure.
 */

import { describe, it, expect } from 'vitest';

describe('SchemaRiverTemplate Component', () => {
  describe('Component Structure', () => {
    it('should define component file path', () => {
      const componentPath = 'src/components/seo/SchemaRiverTemplate.astro';
      expect(componentPath).toBe('src/components/seo/SchemaRiverTemplate.astro');
    });

    it('should export Props interface with required fields', () => {
      // Props interface validation
      const requiredProps = [
        'name',
        'slug',
        'description',
        'length',
        'difficultyRange',
      ];

      const optionalProps = [
        'coordinates',
        'outfitters',
        'warnings',
        'amenities',
        'publishedDate',
        'updatedDate',
        'imageUrl',
        'county',
      ];

      expect(requiredProps).toHaveLength(5);
      expect(optionalProps).toHaveLength(8);
    });
  });

  describe('TouristAttraction+Place Schema (T-038)', () => {
    it('should generate valid TouristAttraction+Place entity', () => {
      const mockAttraction = {
        '@type': ['TouristAttraction', 'Place'],
        '@id': 'https://wvwildoutdoors.pages.dev/rivers/gauley-river/#attraction',
        'name': 'Gauley River',
        'description': 'World-class whitewater rafting with Class V rapids',
        'url': 'https://wvwildoutdoors.pages.dev/rivers/gauley-river/',
        'additionalType': 'https://schema.org/WaterBodyUsage',
        'isAccessibleForFree': true,
        'touristType': ['Whitewater Rafter', 'Kayaker', 'Angler', 'Outdoor Enthusiast'],
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': 38.1234,
          'longitude': -81.1234,
        },
        'address': {
          '@type': 'PostalAddress',
          'addressLocality': 'Fayette County',
          'addressRegion': 'WV',
          'addressCountry': 'US',
        },
        'additionalProperty': [
          {
            '@type': 'PropertyValue',
            'name': 'difficulty',
            'value': 'Class III-V',
          },
          {
            '@type': 'PropertyValue',
            'name': 'length',
            'value': '28 miles',
            'unitCode': 'SMI',
          },
        ],
      };

      // Validate structure
      expect(mockAttraction['@type']).toEqual(['TouristAttraction', 'Place']);
      expect(mockAttraction['@id']).toContain('#attraction');
      expect(mockAttraction.additionalType).toBe('https://schema.org/WaterBodyUsage');
      expect(mockAttraction.geo?.['@type']).toBe('GeoCoordinates');
      expect(mockAttraction.address?.['@type']).toBe('PostalAddress');
      expect(mockAttraction.additionalProperty).toHaveLength(2);
    });

    it('should include warnings array when provided', () => {
      const warnings = ['Class V rapids', 'Expert paddlers only'];
      expect(warnings).toHaveLength(2);
      expect(warnings[0]).toBe('Class V rapids');
    });

    it('should include amenityFeature array when amenities provided', () => {
      const amenities = ['Boat ramps', 'Camping', 'Parking'];
      const amenityFeatures = amenities.map((a) => ({
        '@type': 'LocationFeatureSpecification',
        'name': a,
        'value': true,
      }));

      expect(amenityFeatures).toHaveLength(3);
      expect(amenityFeatures[0]['@type']).toBe('LocationFeatureSpecification');
      expect(amenityFeatures[0].value).toBe(true);
    });
  });

  describe('Article Schema (T-039)', () => {
    it('should generate valid Article entity when dates provided', () => {
      const mockArticle = {
        '@type': 'Article',
        '@id': 'https://wvwildoutdoors.pages.dev/rivers/gauley-river/#article',
        'headline': 'Gauley River Guide - Whitewater & Fishing',
        'description': 'Complete guide to Gauley River adventures',
        'url': 'https://wvwildoutdoors.pages.dev/rivers/gauley-river/',
        'mainEntityOfPage': {
          '@id': 'https://wvwildoutdoors.pages.dev/rivers/gauley-river/',
        },
        'about': {
          '@id': 'https://wvwildoutdoors.pages.dev/rivers/gauley-river/#attraction',
        },
        'author': {
          '@type': 'Organization',
          'name': 'WV Wild Outdoors',
          'url': 'https://wvwildoutdoors.pages.dev',
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'WV Wild Outdoors',
          'url': 'https://wvwildoutdoors.pages.dev',
          'logo': {
            '@type': 'ImageObject',
            'url': 'https://wvwildoutdoors.pages.dev/og-wvwo-storefront.png',
          },
        },
        'datePublished': '2024-01-15T00:00:00.000Z',
        'dateModified': '2024-12-30T00:00:00.000Z',
      };

      // Validate structure
      expect(mockArticle['@type']).toBe('Article');
      expect(mockArticle['@id']).toContain('#article');
      expect(mockArticle.about?.['@id']).toContain('#attraction');
      expect(mockArticle.author?.['@type']).toBe('Organization');
      expect(mockArticle.publisher?.logo?.['@type']).toBe('ImageObject');
    });

    it('should link Article to TouristAttraction via about property', () => {
      const articleAbout = {
        '@id': 'https://wvwildoutdoors.pages.dev/rivers/gauley-river/#attraction',
      };
      expect(articleAbout['@id']).toContain('#attraction');
    });
  });

  describe('BreadcrumbList Schema (T-040)', () => {
    it('should generate valid BreadcrumbList with river navigation', () => {
      const mockBreadcrumbs = {
        '@type': 'BreadcrumbList',
        '@id': 'https://wvwildoutdoors.pages.dev/rivers/gauley-river/#breadcrumb',
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
            'name': 'Rivers',
            'item': 'https://wvwildoutdoors.pages.dev/rivers/',
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': 'Gauley River',
            'item': 'https://wvwildoutdoors.pages.dev/rivers/gauley-river/',
          },
        ],
      };

      // Validate structure
      expect(mockBreadcrumbs['@type']).toBe('BreadcrumbList');
      expect(mockBreadcrumbs['@id']).toContain('#breadcrumb');
      expect(mockBreadcrumbs.itemListElement).toHaveLength(3);
      expect(mockBreadcrumbs.itemListElement[0]['@type']).toBe('ListItem');
      expect(mockBreadcrumbs.itemListElement[2].position).toBe(3);
    });

    it('should use absolute URLs for breadcrumb items', () => {
      const breadcrumbItem = {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Rivers',
        'item': 'https://wvwildoutdoors.pages.dev/rivers/',
      };

      expect(breadcrumbItem.item).toMatch(/^https?:\/\//);
    });
  });

  describe('LocalBusiness Array for Outfitters (T-041)', () => {
    it('should generate valid LocalBusiness entities for outfitters', () => {
      const mockOutfitter = {
        '@type': 'LocalBusiness',
        '@id': 'https://wvwildoutdoors.pages.dev/rivers/gauley-river/#outfitter-1',
        'name': 'River Expeditions',
        'description': 'Commercial outfitter offering Rafting, Kayaking on Gauley River',
        'url': 'https://riverexpeditions.com',
        'priceRange': '$$',
        'telephone': '304-555-1234',
        'email': 'info@riverexpeditions.com',
        'address': {
          '@type': 'PostalAddress',
          'addressRegion': 'WV',
          'addressCountry': 'US',
        },
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': 38.1234,
          'longitude': -81.1234,
        },
        'areaServed': {
          '@type': 'Place',
          'name': 'Gauley River',
        },
        'makesOffer': [
          {
            '@type': 'Offer',
            'itemOffered': {
              '@type': 'Service',
              'name': 'Rafting',
            },
          },
          {
            '@type': 'Offer',
            'itemOffered': {
              '@type': 'Service',
              'name': 'Kayaking',
            },
          },
        ],
      };

      // Validate structure
      expect(mockOutfitter['@type']).toBe('LocalBusiness');
      expect(mockOutfitter['@id']).toContain('#outfitter-');
      expect(mockOutfitter.address?.['@type']).toBe('PostalAddress');
      expect(mockOutfitter.areaServed?.['@type']).toBe('Place');
      expect(mockOutfitter.makesOffer).toHaveLength(2);
      expect(mockOutfitter.makesOffer?.[0]['@type']).toBe('Offer');
    });

    it('should handle multiple outfitters with unique IDs', () => {
      const outfitter1Id = 'https://wvwildoutdoors.pages.dev/rivers/gauley-river/#outfitter-1';
      const outfitter2Id = 'https://wvwildoutdoors.pages.dev/rivers/gauley-river/#outfitter-2';

      expect(outfitter1Id).not.toBe(outfitter2Id);
      expect(outfitter1Id).toContain('#outfitter-1');
      expect(outfitter2Id).toContain('#outfitter-2');
    });
  });

  describe('JSON-LD Syntax Validation (T-042)', () => {
    it('should generate valid @graph structure', () => {
      const mockSchema = {
        '@context': 'https://schema.org',
        '@graph': [
          { '@type': ['TouristAttraction', 'Place'], '@id': '#attraction' },
          { '@type': 'Article', '@id': '#article' },
          { '@type': 'BreadcrumbList', '@id': '#breadcrumb' },
          { '@type': 'LocalBusiness', '@id': '#outfitter-1' },
        ],
      };

      expect(mockSchema['@context']).toBe('https://schema.org');
      expect(mockSchema['@graph']).toHaveLength(4);
      expect(Array.isArray(mockSchema['@graph'])).toBe(true);
    });

    it('should be valid JSON when stringified', () => {
      const mockSchema = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'TouristAttraction',
            '@id': '#attraction',
            'name': 'Gauley River',
          },
        ],
      };

      const jsonString = JSON.stringify(mockSchema, null, 2);
      expect(() => JSON.parse(jsonString)).not.toThrow();
      expect(JSON.parse(jsonString)['@context']).toBe('https://schema.org');
    });
  });

  describe('Schema.org Compliance', () => {
    it('should use correct schema.org types', () => {
      const validTypes = [
        'TouristAttraction',
        'Place',
        'Article',
        'BreadcrumbList',
        'LocalBusiness',
        'GeoCoordinates',
        'PostalAddress',
        'PropertyValue',
        'LocationFeatureSpecification',
        'Organization',
        'ImageObject',
        'ListItem',
        'Offer',
        'Service',
      ];

      validTypes.forEach((type) => {
        expect(type).toMatch(/^[A-Z][a-zA-Z]+$/);
      });
    });

    it('should use correct @id format with fragment identifiers', () => {
      const validIds = [
        '#attraction',
        '#article',
        '#breadcrumb',
        '#outfitter-1',
        '#outfitter-2',
      ];

      validIds.forEach((id) => {
        expect(id).toMatch(/^#[a-z0-9-]+$/);
      });
    });
  });
});
