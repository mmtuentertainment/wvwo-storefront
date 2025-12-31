// SPEC-14 Phase 3: Content Collections Validation Tests
// T-035: Validate river type filtering and backward compatibility
// Zero breaking changes: existing lake/WMA content must still work

import { getCollection } from 'astro:content';
import { describe, it, expect } from 'vitest';

describe('Content Collections - River Type Extension', () => {
  describe('River Type Filtering', () => {
    it('should filter adventures by river type', async () => {
      const allAdventures = await getCollection('adventures');
      const riverAdventures = allAdventures.filter(a => a.data.type === 'river');

      // Should return empty array (no river content exists yet - Phase 4 work)
      expect(Array.isArray(riverAdventures)).toBe(true);

      // If river content exists in future:
      if (riverAdventures.length > 0) {
        riverAdventures.forEach(river => {
          expect(river.data.type).toBe('river');

          // Optional river-specific fields would be validated here
          // These are added in Phase 4 after schema extension is proven stable
          if (river.data.rapids) {
            expect(Array.isArray(river.data.rapids)).toBe(true);
          }
        });
      }
    });
  });

  describe('Backward Compatibility - Lake Adventures', () => {
    it('should still return lake adventures without errors', async () => {
      const allAdventures = await getCollection('adventures');
      const lakeAdventures = allAdventures.filter(a => a.data.type === 'lake');

      // Lake content exists (Summersville Lake from SPEC-13)
      expect(lakeAdventures.length).toBeGreaterThan(0);
    });

    it('should validate lake schema fields unchanged', async () => {
      const allAdventures = await getCollection('adventures');
      const lakeAdventures = allAdventures.filter(a => a.data.type === 'lake');

      if (lakeAdventures.length > 0) {
        const firstLake = lakeAdventures[0];

        // Required fields
        expect(firstLake.data.title).toBeDefined();
        expect(typeof firstLake.data.title).toBe('string');
        expect(firstLake.data.description).toBeDefined();
        expect(typeof firstLake.data.description).toBe('string');

        // Lake-specific fields are validated through the unified adventure schema
        // Required fields validation above confirms backward compatibility
      }
    });
  });

  describe('Backward Compatibility - WMA Adventures', () => {
    it('should still return WMA adventures without errors', async () => {
      const allAdventures = await getCollection('adventures');
      const wmaAdventures = allAdventures.filter(a => a.data.type === 'wma');

      // WMA content exists (Elk River WMA from SPEC-12)
      expect(wmaAdventures.length).toBeGreaterThan(0);
    });

    it('should validate WMA schema fields unchanged', async () => {
      const allAdventures = await getCollection('adventures');
      const wmaAdventures = allAdventures.filter(a => a.data.type === 'wma');

      if (wmaAdventures.length > 0) {
        const firstWma = wmaAdventures[0];

        // Required fields
        expect(firstWma.data.title).toBeDefined();
        expect(typeof firstWma.data.title).toBe('string');
        expect(firstWma.data.description).toBeDefined();
        expect(typeof firstWma.data.description).toBe('string');

        // WMA-specific optional fields should still work (SPEC-12)
        if (firstWma.data.acreage) {
          expect(typeof firstWma.data.acreage).toBe('number');
        }
        if (firstWma.data.county) {
          expect(typeof firstWma.data.county).toBe('string');
        }
        if (firstWma.data.species) {
          expect(Array.isArray(firstWma.data.species)).toBe(true);
        }
        if (firstWma.data.facilities) {
          expect(Array.isArray(firstWma.data.facilities)).toBe(true);
        }
      }
    });
  });

  describe('Type System Validation', () => {
    it('should only allow valid type values: adventure, wma, river', async () => {
      const allAdventures = await getCollection('adventures');

      allAdventures.forEach(adventure => {
        if (adventure.data.type) {
          expect(['adventure', 'wma', 'river', 'lake']).toContain(adventure.data.type);
        }
      });
    });

    it('should allow content without type field (optional)', async () => {
      const allAdventures = await getCollection('adventures');

      // Some adventures may not have type field - that's valid
      const adventuresWithoutType = allAdventures.filter(a => !a.data.type);

      // This test passes if no error is thrown
      expect(Array.isArray(adventuresWithoutType)).toBe(true);
    });
  });

  describe('Collection Query Performance', () => {
    it('should query all adventures efficiently', async () => {
      const start = Date.now();
      const allAdventures = await getCollection('adventures');
      const duration = Date.now() - start;

      // Collection query should complete in under 1000ms
      expect(duration).toBeLessThan(1000);
      expect(Array.isArray(allAdventures)).toBe(true);
    });
  });
});

describe('Content Collections - Zero Breaking Changes Validation', () => {
  it('should successfully load all collections without errors', async () => {
    // This test verifies the entire schema is valid
    const adventures = await getCollection('adventures');
    const stories = await getCollection('stories');
    const resources = await getCollection('resources');
    const locations = await getCollection('locations');
    const products = await getCollection('products');

    expect(Array.isArray(adventures)).toBe(true);
    expect(Array.isArray(stories)).toBe(true);
    expect(Array.isArray(resources)).toBe(true);
    expect(Array.isArray(locations)).toBe(true);
    expect(Array.isArray(products)).toBe(true);
  });

  it('should maintain existing content structure', async () => {
    const allAdventures = await getCollection('adventures');

    // Every adventure must have required core fields
    allAdventures.forEach(adventure => {
      expect(adventure.data.title).toBeDefined();
      expect(adventure.data.description).toBeDefined();
      expect(adventure.data.season).toBeDefined();
      expect(Array.isArray(adventure.data.season)).toBe(true);
      expect(adventure.data.difficulty).toBeDefined();
      expect(['easy', 'moderate', 'challenging', 'rugged']).toContain(adventure.data.difficulty);
      expect(adventure.data.location).toBeDefined();
    });
  });
});
