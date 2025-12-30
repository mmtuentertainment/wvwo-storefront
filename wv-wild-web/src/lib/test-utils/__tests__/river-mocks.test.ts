/**
 * Tests for River Mock Factories
 * SPEC-14: T-013 - Mock data generation for testing
 */

import { describe, it, expect } from 'vitest';
import {
  createMockRapid,
  createMockFishing,
  createMockOutfitter,
  createMockSeasonalFlow,
  createMockAccessPoint,
  createMockSafety,
  createMockNearbyAttraction,
  createMockRiverTemplate,
} from '../river-mocks';

describe('River Mock Factories', () => {
  describe('createMockRapid', () => {
    it('should create a valid rapid with default values', () => {
      const rapid = createMockRapid();
      expect(rapid).toHaveProperty('name');
      expect(rapid).toHaveProperty('class');
      expect(rapid).toHaveProperty('displayName');
      expect(rapid.class).toHaveProperty('base');
      expect(typeof rapid.name).toBe('string');
      expect(rapid.name.length).toBeGreaterThan(0);
    });

    it('should override properties when provided', () => {
      const rapid = createMockRapid({
        name: 'Custom Rapid',
        class: { base: 'VI' },
      });
      expect(rapid.name).toBe('Custom Rapid');
      expect(rapid.class.base).toBe('VI');
    });

    it('should maintain non-overridden default values', () => {
      const rapid = createMockRapid({ name: 'Custom' });
      expect(rapid.displayName).toBeDefined();
      expect(rapid.class).toBeDefined();
    });
  });

  describe('createMockFishing', () => {
    it('should create valid fishing object with all required fields', () => {
      const fishing = createMockFishing();
      expect(fishing).toHaveProperty('species');
      expect(fishing).toHaveProperty('techniques');
      expect(fishing).toHaveProperty('seasons');
      expect(fishing).toHaveProperty('regulations');
      expect(Array.isArray(fishing.species)).toBe(true);
      expect(fishing.species.length).toBeGreaterThan(0);
    });

    it('should override properties when provided', () => {
      const fishing = createMockFishing({
        species: ['Trout'],
        techniques: 'Fly fishing only',
      });
      expect(fishing.species).toEqual(['Trout']);
      expect(fishing.techniques).toBe('Fly fishing only');
    });
  });

  describe('createMockOutfitter', () => {
    it('should create valid outfitter with required fields', () => {
      const outfitter = createMockOutfitter();
      expect(outfitter).toHaveProperty('name');
      expect(outfitter).toHaveProperty('services');
      expect(Array.isArray(outfitter.services)).toBe(true);
      expect(outfitter.services.length).toBeGreaterThan(0);
    });

    it('should include optional fields when provided', () => {
      const outfitter = createMockOutfitter({
        contact: '304-555-0100',
        website: 'https://example.com',
      });
      expect(outfitter.contact).toBe('304-555-0100');
      expect(outfitter.website).toBe('https://example.com');
    });
  });

  describe('createMockSeasonalFlow', () => {
    it('should create valid seasonal flow entry', () => {
      const flow = createMockSeasonalFlow();
      expect(flow).toHaveProperty('season');
      expect(flow).toHaveProperty('flowRate');
      expect(flow).toHaveProperty('conditions');
      expect(flow).toHaveProperty('accessibility');
      expect(typeof flow.season).toBe('string');
    });

    it('should override properties when provided', () => {
      const flow = createMockSeasonalFlow({
        season: 'Winter',
        flowRate: '500 CFS',
      });
      expect(flow.season).toBe('Winter');
      expect(flow.flowRate).toBe('500 CFS');
    });
  });

  describe('createMockAccessPoint', () => {
    it('should create valid access point with coordinates', () => {
      const access = createMockAccessPoint();
      expect(access).toHaveProperty('name');
      expect(access).toHaveProperty('type');
      expect(access).toHaveProperty('facilities');
      expect(access).toHaveProperty('coordinates');
      expect(Array.isArray(access.facilities)).toBe(true);
      expect(access.coordinates).toBeDefined();
      if (access.coordinates) {
        expect(access.coordinates).toHaveProperty('lat');
        expect(access.coordinates).toHaveProperty('lng');
        expect(typeof access.coordinates.lat).toBe('number');
        expect(typeof access.coordinates.lng).toBe('number');
      }
    });
  });

  describe('createMockSafety', () => {
    it('should create valid safety category', () => {
      const safety = createMockSafety();
      expect(safety).toHaveProperty('category');
      expect(safety).toHaveProperty('items');
      expect(safety).toHaveProperty('importance');
      expect(Array.isArray(safety.items)).toBe(true);
      expect(safety.items.length).toBeGreaterThan(0);
    });

    it('should support all importance levels', () => {
      const critical = createMockSafety({ importance: 'critical' });
      const high = createMockSafety({ importance: 'high' });
      const medium = createMockSafety({ importance: 'medium' });
      expect(critical.importance).toBe('critical');
      expect(high.importance).toBe('high');
      expect(medium.importance).toBe('medium');
    });
  });

  describe('createMockNearbyAttraction', () => {
    it('should create valid nearby attraction', () => {
      const attraction = createMockNearbyAttraction();
      expect(attraction).toHaveProperty('name');
      expect(attraction).toHaveProperty('distance');
      expect(attraction).toHaveProperty('description');
      expect(typeof attraction.name).toBe('string');
    });
  });

  describe('createMockRiverTemplate', () => {
    it('should create complete valid RiverTemplateProps', () => {
      const template = createMockRiverTemplate();

      // Hero section
      expect(template).toHaveProperty('name');
      expect(template).toHaveProperty('image');
      expect(template).toHaveProperty('imageAlt');
      expect(template).toHaveProperty('tagline');
      expect(template).toHaveProperty('description');
      expect(template).toHaveProperty('stats');

      // River metadata
      expect(template).toHaveProperty('length');
      expect(template).toHaveProperty('county');
      expect(template).toHaveProperty('difficultyRange');
      expect(template).toHaveProperty('quickHighlights');

      // Content sections
      expect(template).toHaveProperty('rapids');
      expect(template).toHaveProperty('fishing');
      expect(template).toHaveProperty('outfitters');
      expect(template).toHaveProperty('seasonalFlow');
      expect(template).toHaveProperty('accessPoints');
      expect(template).toHaveProperty('safety');
      expect(template).toHaveProperty('nearbyAttractions');
      expect(template).toHaveProperty('gearList');
      expect(template).toHaveProperty('relatedShop');

      // Validate types
      expect(typeof template.name).toBe('string');
      expect(typeof template.length).toBe('number');
      expect(Array.isArray(template.stats)).toBe(true);
      expect(Array.isArray(template.rapids)).toBe(true);
      expect(Array.isArray(template.quickHighlights)).toBe(true);
    });

    it('should override properties when provided', () => {
      const template = createMockRiverTemplate({
        name: 'Custom River',
        length: 50,
        county: 'Custom County',
      });
      expect(template.name).toBe('Custom River');
      expect(template.length).toBe(50);
      expect(template.county).toBe('Custom County');
    });

    it('should include optional metadata when provided', () => {
      const template = createMockRiverTemplate({
        difficulty: 'challenging',
        bestSeason: 'fall',
        mapUrl: 'https://maps.example.com',
      });
      expect(template.difficulty).toBe('challenging');
      expect(template.bestSeason).toBe('fall');
      expect(template.mapUrl).toBe('https://maps.example.com');
    });

    it('should generate valid data that passes type guards', () => {
      const template = createMockRiverTemplate();
      expect(Array.isArray(template.rapids)).toBe(true);
      expect(template.rapids.length).toBeGreaterThan(0);
      expect(template.fishing).toBeDefined();
      expect(typeof template.fishing).toBe('object');
    });
  });
});
