/**
 * Tests for River Template Validation Helpers
 * SPEC-14: T-011 - Validation utilities with clear error messages
 */

import { describe, it, expect } from 'vitest';
import { validateRiverTemplate, ValidationError } from '../river';
import type { RiverTemplateProps } from '@/types/adventure';

describe('validateRiverTemplate', () => {
  const validRiverData: RiverTemplateProps = {
    // Hero section (required)
    name: 'Gauley River',
    image: '/images/gauley.jpg',
    imageAlt: 'Gauley River rapids',
    tagline: 'World-Class Whitewater Adventure',
    description: 'The Gauley River offers some of the most challenging whitewater in the East.',
    stats: [
      { value: '28 miles', label: 'Length', icon: 'distance' },
      { value: 'Class III-V+', label: 'Difficulty', icon: 'info' },
    ],

    // River metadata
    length: 28,
    county: 'Nicholas County',
    difficultyRange: 'Class III-V+',
    quickHighlights: [
      'Over 100 rapids',
      'Dam-controlled releases',
      'Fall whitewater season',
    ],

    // Content sections
    rapids: [
      {
        name: 'Pillow Rock',
        class: { base: 'V+' },
        displayName: 'Class V+',
        description: 'Iconic Gauley rapid with massive hole',
        runnable: 'Expert only',
      },
    ],
    fishing: {
      species: ['Smallmouth Bass', 'Rock Bass'],
      techniques: 'Fly fishing, spinning',
      seasons: 'Spring and Fall',
      regulations: 'WV fishing license required',
    },
    outfitters: [
      {
        name: 'Gauley River Expeditions',
        services: ['Full-day trips', 'Equipment rental'],
        contact: '304-555-0100',
        website: 'https://example.com',
      },
    ],
    seasonalFlow: [
      {
        season: 'Fall (Sept-Oct)',
        flowRate: '2,800 CFS',
        conditions: 'Peak whitewater season',
        accessibility: 'Expert paddlers only',
      },
    ],
    accessPoints: [
      {
        name: 'Summersville Dam',
        type: 'Put-in',
        facilities: ['Parking', 'Restrooms'],
        coordinates: { lat: 38.2345, lng: -80.8567 },
      },
    ],
    safety: [
      {
        category: 'Required Equipment',
        items: ['PFD', 'Helmet', 'Wetsuit', 'Throw rope'],
        importance: 'critical',
      },
    ],
    nearbyAttractions: [
      {
        name: 'Summersville Lake',
        distance: '5 miles',
        description: 'Crystal-clear lake for swimming and fishing',
      },
    ],
    gearList: [
      { name: 'Whitewater kayak', optional: false },
      { name: 'Dry bag', optional: true },
    ],
    relatedShop: [
      {
        name: 'Water Sports',
        description: 'Kayaks, paddles, and safety gear',
        href: '/shop/water-sports',
      },
    ],

    // Optional metadata
    difficulty: 'challenging',
    bestSeason: 'fall',
    coordinates: { lat: 38.2345, lng: -80.8567 },
    mapUrl: 'https://maps.example.com/gauley',
    waterLevelUrl: 'https://waterdata.usgs.gov/gauley',
  };

  describe('valid data', () => {
    it('should validate complete river template data', () => {
      const result = validateRiverTemplate(validRiverData);
      expect(result).toEqual(validRiverData);
    });

    it('should validate river data with optional fields omitted', () => {
      const minimalData = {
        ...validRiverData,
        difficulty: undefined,
        bestSeason: undefined,
        coordinates: undefined,
        mapUrl: undefined,
        waterLevelUrl: undefined,
      };
      const result = validateRiverTemplate(minimalData);
      expect(result).toBeDefined();
      expect(result.name).toBe('Gauley River');
    });
  });

  describe('invalid data', () => {
    it('should throw ValidationError for missing required fields', () => {
      const invalidData = { ...validRiverData, name: undefined };
      expect(() => validateRiverTemplate(invalidData)).toThrow(ValidationError);
    });

    it('should throw ValidationError for invalid hero section', () => {
      const invalidData = { ...validRiverData, image: '' };
      expect(() => validateRiverTemplate(invalidData)).toThrow(ValidationError);
    });

    it('should provide detailed error messages with field paths', () => {
      const invalidData = { ...validRiverData, length: 'not a number' };
      try {
        validateRiverTemplate(invalidData);
        expect.fail('Should have thrown ValidationError');
      } catch (error) {
        expect(error).toBeInstanceOf(ValidationError);
        const validationError = error as ValidationError;
        expect(validationError.errors).toBeDefined();
        expect(validationError.errors.length).toBeGreaterThan(0);
        expect(validationError.errors[0]).toHaveProperty('path');
        expect(validationError.errors[0]).toHaveProperty('message');
      }
    });

    it('should validate rapids array structure', () => {
      const invalidData = {
        ...validRiverData,
        rapids: [{ name: 'Test', class: { base: 'invalid' } }],
      };
      expect(() => validateRiverTemplate(invalidData)).toThrow(ValidationError);
    });

    it('should validate fishing object structure', () => {
      const invalidData = {
        ...validRiverData,
        fishing: { species: [] }, // Missing required fields
      };
      expect(() => validateRiverTemplate(invalidData)).toThrow(ValidationError);
    });

    it('should validate outfitters array', () => {
      const invalidData = {
        ...validRiverData,
        outfitters: [{ name: 'Test' }], // Missing required services
      };
      expect(() => validateRiverTemplate(invalidData)).toThrow(ValidationError);
    });
  });

  describe('ValidationError class', () => {
    it('should format multiple errors correctly', () => {
      const invalidData = {
        ...validRiverData,
        name: '',
        length: -1,
        rapids: [],
      };
      try {
        validateRiverTemplate(invalidData);
        expect.fail('Should have thrown ValidationError');
      } catch (error) {
        expect(error).toBeInstanceOf(ValidationError);
        const validationError = error as ValidationError;
        expect(validationError.message).toBe('River template validation failed');
        expect(validationError.errors.length).toBeGreaterThan(0);
      }
    });
  });
});
