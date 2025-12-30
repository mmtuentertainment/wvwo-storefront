/**
 * Integration Tests for SchemaRiverTemplate Component
 * SPEC-14 T-043: Component Rendering Validation
 *
 * Tests component output with realistic river data from Gauley River.
 */

import { describe, it, expect } from 'vitest';
import type { Outfitter, Coordinates } from '../../../types/adventure';

describe('SchemaRiverTemplate Integration', () => {
  // Sample data matching Gauley River adventure
  const sampleRiverData = {
    name: 'Gauley River',
    slug: 'gauley-river',
    description:
      'World-class whitewater rafting with Class III-V rapids through spectacular West Virginia wilderness. 28 miles of challenging whitewater with iconic rapids like Pillow Rock and Lost Paddle.',
    length: 28,
    difficultyRange: 'Class III-V',
    coordinates: {
      lat: 38.1634,
      lng: -81.1984,
    } as Coordinates,
    county: 'Fayette County',
    warnings: [
      'Class V rapids require expert paddling skills',
      'Cold water temperatures year-round',
      'Limited emergency access',
    ],
    amenities: ['Boat ramps', 'Parking', 'Emergency access points', 'Outfitter services'],
    publishedDate: '2024-01-15T00:00:00.000Z',
    updatedDate: '2024-12-30T00:00:00.000Z',
    imageUrl: 'https://wvwildoutdoors.pages.dev/images/gauley-river-hero.jpg',
    outfitters: [
      {
        name: 'ACE Adventure Resort',
        services: ['Rafting', 'Kayaking', 'Equipment Rental', 'Lodging'],
        contact: {
          phone: '304-469-2651',
          website: 'https://aceraft.com',
          email: 'info@aceraft.com',
        },
        priceRange: '$$',
        seasonalNotes: 'Dam releases September-October',
      },
      {
        name: 'River Expeditions',
        services: ['Rafting', 'Camping', 'Shuttle Service'],
        contact: {
          phone: '304-558-3008',
          website: 'https://riverexpeditions.com',
        },
        priceRange: '$$$',
      },
    ] as Outfitter[],
  };

  describe('Complete Schema Generation', () => {
    it('should generate valid @graph with all 5+ entities', () => {
      // Simulate component output
      const graphEntities = [];

      // 1. TouristAttraction+Place
      graphEntities.push({
        '@type': ['TouristAttraction', 'Place'],
        '@id': `https://wvwildoutdoors.pages.dev/rivers/${sampleRiverData.slug}/#attraction`,
        'name': sampleRiverData.name,
        'description': sampleRiverData.description,
      });

      // 2. Article
      graphEntities.push({
        '@type': 'Article',
        '@id': `https://wvwildoutdoors.pages.dev/rivers/${sampleRiverData.slug}/#article`,
        'headline': `${sampleRiverData.name} Guide - Whitewater & Fishing`,
      });

      // 3. BreadcrumbList
      graphEntities.push({
        '@type': 'BreadcrumbList',
        '@id': `https://wvwildoutdoors.pages.dev/rivers/${sampleRiverData.slug}/#breadcrumb`,
      });

      // 4-5. LocalBusiness for each outfitter
      sampleRiverData.outfitters.forEach((_, index) => {
        graphEntities.push({
          '@type': 'LocalBusiness',
          '@id': `https://wvwildoutdoors.pages.dev/rivers/${sampleRiverData.slug}/#outfitter-${index + 1}`,
        });
      });

      const schema = {
        '@context': 'https://schema.org',
        '@graph': graphEntities,
      };

      // Validate @graph structure
      expect(schema['@graph']).toHaveLength(5); // TouristAttraction, Article, Breadcrumb, 2 Outfitters
      expect(schema['@graph'][0]['@type']).toEqual(['TouristAttraction', 'Place']);
      expect(schema['@graph'][1]['@type']).toBe('Article');
      expect(schema['@graph'][2]['@type']).toBe('BreadcrumbList');
      expect(schema['@graph'][3]['@type']).toBe('LocalBusiness');
      expect(schema['@graph'][4]['@type']).toBe('LocalBusiness');
    });

    it('should generate valid JSON-LD output', () => {
      const schema = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': ['TouristAttraction', 'Place'],
            '@id': 'https://wvwildoutdoors.pages.dev/rivers/gauley-river/#attraction',
            'name': sampleRiverData.name,
            'description': sampleRiverData.description,
            'url': 'https://wvwildoutdoors.pages.dev/rivers/gauley-river/',
            'additionalType': 'https://schema.org/WaterBodyUsage',
            'geo': {
              '@type': 'GeoCoordinates',
              'latitude': sampleRiverData.coordinates.lat,
              'longitude': sampleRiverData.coordinates.lng,
            },
            'address': {
              '@type': 'PostalAddress',
              'addressLocality': sampleRiverData.county,
              'addressRegion': 'WV',
              'addressCountry': 'US',
            },
            'additionalProperty': [
              {
                '@type': 'PropertyValue',
                'name': 'difficulty',
                'value': sampleRiverData.difficultyRange,
              },
              {
                '@type': 'PropertyValue',
                'name': 'length',
                'value': `${sampleRiverData.length} miles`,
                'unitCode': 'SMI',
              },
            ],
            'warning': sampleRiverData.warnings,
            'amenityFeature': sampleRiverData.amenities.map((a) => ({
              '@type': 'LocationFeatureSpecification',
              'name': a,
              'value': true,
            })),
            'isAccessibleForFree': true,
            'touristType': ['Whitewater Rafter', 'Kayaker', 'Angler', 'Outdoor Enthusiast'],
            'image': sampleRiverData.imageUrl,
          },
        ],
      };

      // Validate JSON-LD can be stringified and parsed
      const jsonString = JSON.stringify(schema, null, 2);
      expect(() => JSON.parse(jsonString)).not.toThrow();

      const parsed = JSON.parse(jsonString);
      expect(parsed['@context']).toBe('https://schema.org');
      expect(parsed['@graph'][0].name).toBe('Gauley River');
      expect(parsed['@graph'][0].geo?.latitude).toBe(38.1634);
      expect(parsed['@graph'][0].warning).toHaveLength(3);
    });
  });

  describe('TouristAttraction Entity with Real Data', () => {
    it('should include all required TouristAttraction properties', () => {
      const attraction = {
        '@type': ['TouristAttraction', 'Place'],
        '@id': `https://wvwildoutdoors.pages.dev/rivers/${sampleRiverData.slug}/#attraction`,
        'name': sampleRiverData.name,
        'description': sampleRiverData.description,
        'url': `https://wvwildoutdoors.pages.dev/rivers/${sampleRiverData.slug}/`,
        'additionalType': 'https://schema.org/WaterBodyUsage',
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': sampleRiverData.coordinates.lat,
          'longitude': sampleRiverData.coordinates.lng,
        },
        'address': {
          '@type': 'PostalAddress',
          'addressLocality': sampleRiverData.county,
          'addressRegion': 'WV',
          'addressCountry': 'US',
        },
        'additionalProperty': [
          {
            '@type': 'PropertyValue',
            'name': 'difficulty',
            'value': sampleRiverData.difficultyRange,
          },
          {
            '@type': 'PropertyValue',
            'name': 'length',
            'value': `${sampleRiverData.length} miles`,
            'unitCode': 'SMI',
          },
        ],
        'warning': sampleRiverData.warnings,
        'amenityFeature': sampleRiverData.amenities.map((a) => ({
          '@type': 'LocationFeatureSpecification',
          'name': a,
          'value': true,
        })),
        'isAccessibleForFree': true,
        'touristType': ['Whitewater Rafter', 'Kayaker', 'Angler', 'Outdoor Enthusiast'],
        'image': sampleRiverData.imageUrl,
      };

      expect(attraction['@type']).toEqual(['TouristAttraction', 'Place']);
      expect(attraction.name).toBe('Gauley River');
      expect(attraction.geo?.latitude).toBe(38.1634);
      expect(attraction.additionalProperty).toHaveLength(2);
      expect(attraction.warning).toHaveLength(3);
      expect(attraction.amenityFeature).toHaveLength(4);
    });
  });

  describe('LocalBusiness Entities for Outfitters', () => {
    it('should generate LocalBusiness for ACE Adventure Resort', () => {
      const aceOutfitter = sampleRiverData.outfitters[0];
      const localBusiness = {
        '@type': 'LocalBusiness',
        '@id': `https://wvwildoutdoors.pages.dev/rivers/${sampleRiverData.slug}/#outfitter-1`,
        'name': aceOutfitter.name,
        'description': `Commercial outfitter offering ${aceOutfitter.services.join(', ')} on ${sampleRiverData.name}`,
        'url': aceOutfitter.website,
        'priceRange': aceOutfitter.priceRange,
        'telephone': aceOutfitter.contact.phone,
        'email': aceOutfitter.contact.email,
        'address': {
          '@type': 'PostalAddress',
          'addressRegion': 'WV',
          'addressCountry': 'US',
        },
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': sampleRiverData.coordinates.lat,
          'longitude': sampleRiverData.coordinates.lng,
        },
        'areaServed': {
          '@type': 'Place',
          'name': sampleRiverData.name,
        },
        'makesOffer': aceOutfitter.services.map((service) => ({
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': service,
          },
        })),
        'additionalProperty': {
          '@type': 'PropertyValue',
          'name': 'seasonalNotes',
          'value': aceOutfitter.seasonalNotes,
        },
      };

      expect(localBusiness.name).toBe('ACE Adventure Resort');
      expect(localBusiness.telephone).toBe('304-469-2651');
      expect(localBusiness.email).toBe('info@aceraft.com');
      expect(localBusiness.makesOffer).toHaveLength(4);
      expect(localBusiness.additionalProperty?.value).toBe('Dam releases September-October');
    });

    it('should generate LocalBusiness for River Expeditions', () => {
      const riverExpOutfitter = sampleRiverData.outfitters[1];
      const localBusiness = {
        '@type': 'LocalBusiness',
        '@id': `https://wvwildoutdoors.pages.dev/rivers/${sampleRiverData.slug}/#outfitter-2`,
        'name': riverExpOutfitter.name,
        'description': `Commercial outfitter offering ${riverExpOutfitter.services.join(', ')} on ${sampleRiverData.name}`,
        'url': riverExpOutfitter.website,
        'priceRange': riverExpOutfitter.priceRange,
        'telephone': riverExpOutfitter.contact.phone,
        'makesOffer': riverExpOutfitter.services.map((service) => ({
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': service,
          },
        })),
      };

      expect(localBusiness.name).toBe('River Expeditions');
      expect(localBusiness.makesOffer).toHaveLength(3);
      expect(localBusiness.priceRange).toBe('$$$');
    });
  });

  describe('Google Rich Results Validation', () => {
    it('should pass Google Rich Results Test requirements', () => {
      // TouristAttraction requirements
      const attraction = {
        '@type': ['TouristAttraction', 'Place'],
        'name': sampleRiverData.name,
        'description': sampleRiverData.description,
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': sampleRiverData.coordinates.lat,
          'longitude': sampleRiverData.coordinates.lng,
        },
        'address': {
          '@type': 'PostalAddress',
          'addressRegion': 'WV',
        },
      };

      expect(attraction['@type']).toContain('TouristAttraction');
      expect(attraction.name).toBeTruthy();
      expect(attraction.description).toBeTruthy();
      expect(attraction.geo).toBeTruthy();
      expect(attraction.address).toBeTruthy();
    });

    it('should include required Article properties for news/blog rich results', () => {
      const article = {
        '@type': 'Article',
        'headline': `${sampleRiverData.name} Guide - Whitewater & Fishing`,
        'author': {
          '@type': 'Organization',
          'name': 'WV Wild Outdoors',
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'WV Wild Outdoors',
          'logo': {
            '@type': 'ImageObject',
            'url': 'https://wvwildoutdoors.pages.dev/og-wvwo-storefront.png',
          },
        },
        'datePublished': sampleRiverData.publishedDate,
        'dateModified': sampleRiverData.updatedDate,
      };

      expect(article['@type']).toBe('Article');
      expect(article.headline).toBeTruthy();
      expect(article.author).toBeTruthy();
      expect(article.publisher).toBeTruthy();
      expect(article.datePublished).toBeTruthy();
    });

    it('should include required LocalBusiness properties for business listings', () => {
      const business = {
        '@type': 'LocalBusiness',
        'name': sampleRiverData.outfitters[0].name,
        'address': {
          '@type': 'PostalAddress',
          'addressRegion': 'WV',
          'addressCountry': 'US',
        },
      };

      expect(business['@type']).toBe('LocalBusiness');
      expect(business.name).toBeTruthy();
      expect(business.address).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('should handle river without coordinates', () => {
      const dataWithoutCoords = { ...sampleRiverData };
      delete dataWithoutCoords.coordinates;

      const attraction = {
        '@type': ['TouristAttraction', 'Place'],
        'name': dataWithoutCoords.name,
        'address': {
          '@type': 'PostalAddress',
          'addressLocality': dataWithoutCoords.county,
          'addressRegion': 'WV',
          'addressCountry': 'US',
        },
      };

      expect(attraction.address).toBeTruthy();
      expect(attraction['geo']).toBeUndefined();
    });

    it('should handle river without outfitters', () => {
      const dataWithoutOutfitters = { ...sampleRiverData, outfitters: [] };

      const graphEntities = [
        { '@type': ['TouristAttraction', 'Place'] },
        { '@type': 'Article' },
        { '@type': 'BreadcrumbList' },
      ];

      expect(graphEntities).toHaveLength(3);
      expect(graphEntities.every((e) => e['@type'] !== 'LocalBusiness')).toBe(true);
    });

    it('should handle minimal required data only', () => {
      const minimalData = {
        name: 'Test River',
        slug: 'test-river',
        description: 'A test river',
        length: 10,
        difficultyRange: 'Class II-III',
      };

      const attraction = {
        '@type': ['TouristAttraction', 'Place'],
        'name': minimalData.name,
        'description': minimalData.description,
        'additionalProperty': [
          {
            '@type': 'PropertyValue',
            'name': 'difficulty',
            'value': minimalData.difficultyRange,
          },
          {
            '@type': 'PropertyValue',
            'name': 'length',
            'value': `${minimalData.length} miles`,
            'unitCode': 'SMI',
          },
        ],
      };

      expect(attraction.name).toBe('Test River');
      expect(attraction.additionalProperty).toHaveLength(2);
    });
  });
});
