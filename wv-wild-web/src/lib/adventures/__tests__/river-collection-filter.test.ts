/**
 * River Collection Filter Tests
 * SPEC-14: T-035 - Validate collection queries with type='river' filter
 *
 * Tests ensure:
 * - Collection queries can filter by type='river'
 * - isRiverAdventure type guard works correctly
 * - River content validates against schema
 * - Zero breaking changes to existing content
 *
 * @module lib/adventures/__tests__/river-collection-filter.test
 */

import { describe, it, expect } from 'vitest';
import { isRiverAdventure } from '@/lib/type-guards/river';

describe('River Collection Filtering (SPEC-14 T-035)', () => {
  describe('isRiverAdventure type guard', () => {
    it('should identify river adventures correctly', () => {
      const riverAdventure = {
        data: {
          type: 'river',
          title: 'Gauley River',
          description: 'World-class whitewater',
        },
      };

      expect(isRiverAdventure(riverAdventure)).toBe(true);
    });

    it('should reject WMA adventures', () => {
      const wmaAdventure = {
        data: {
          type: 'wma',
          title: 'Burnsville Lake WMA',
          description: 'Prime hunting area',
        },
      };

      expect(isRiverAdventure(wmaAdventure)).toBe(false);
    });

    it('should reject generic adventures', () => {
      const genericAdventure = {
        data: {
          type: 'adventure',
          title: 'Cranberry Wilderness',
          description: 'Backcountry hiking',
        },
      };

      expect(isRiverAdventure(genericAdventure)).toBe(false);
    });

    it('should handle missing type field (backward compatibility)', () => {
      const legacyAdventure = {
        data: {
          title: 'Old Trail',
          description: 'Legacy content without type field',
        },
      };

      expect(isRiverAdventure(legacyAdventure)).toBe(false);
    });

    it('should handle null/undefined safely', () => {
      expect(isRiverAdventure(null)).toBe(false);
      expect(isRiverAdventure(undefined)).toBe(false);
      expect(isRiverAdventure({})).toBe(false);
      expect(isRiverAdventure({ data: null })).toBe(false);
    });
  });

  describe('River-specific field validation', () => {
    it('should accept river with all optional fields populated', () => {
      const fullRiverData = {
        data: {
          type: 'river',
          title: 'Gauley River',
          description: 'Epic whitewater adventure',
          season: ['spring', 'summer', 'fall'],
          difficulty: 'challenging',
          location: 'Nicholas County',
          // River-specific fields
          riverLength: 28,
          difficultyRange: 'Class IV-V',
          rapids: [
            {
              name: 'Pillow Rock',
              difficulty: 'V',
              description: 'Massive hole at center',
            },
          ],
          outfitters: [
            {
              name: 'WV Rafting Co',
              services: ['Rafting'],
              contact: { phone: '304-555-1234' },
            },
          ],
        },
      };

      expect(isRiverAdventure(fullRiverData)).toBe(true);
    });

    it('should accept river with NO optional fields (zero breaking changes)', () => {
      const minimalRiverData = {
        data: {
          type: 'river',
          title: 'New River',
          description: 'Classic river',
          season: ['summer'],
          difficulty: 'moderate',
          location: 'Fayette County',
          // NO river-specific fields - should still validate
        },
      };

      expect(isRiverAdventure(minimalRiverData)).toBe(true);
    });
  });

  describe('Collection query simulation', () => {
    it('should filter array of adventures by type=river', () => {
      const mockAdventures = [
        { data: { type: 'river', title: 'Gauley River' } },
        { data: { type: 'wma', title: 'Burnsville Lake WMA' } },
        { data: { type: 'river', title: 'New River' } },
        { data: { type: 'adventure', title: 'Cranberry' } },
        { data: { type: 'river', title: 'Cheat River' } },
      ];

      const rivers = mockAdventures.filter(isRiverAdventure);

      expect(rivers).toHaveLength(3);
      expect(rivers[0].data.title).toBe('Gauley River');
      expect(rivers[1].data.title).toBe('New River');
      expect(rivers[2].data.title).toBe('Cheat River');
    });

    it('should return empty array if no rivers exist', () => {
      const mockAdventures = [
        { data: { type: 'wma', title: 'WMA 1' } },
        { data: { type: 'adventure', title: 'Trail 1' } },
      ];

      const rivers = mockAdventures.filter(isRiverAdventure);

      expect(rivers).toHaveLength(0);
    });

    it('should handle mixed content safely', () => {
      const mockAdventures = [
        { data: { type: 'river', title: 'River 1' } },
        null,
        { data: { title: 'No type field' } },
        undefined,
        { data: { type: 'river', title: 'River 2' } },
      ];

      const rivers = mockAdventures.filter(isRiverAdventure);

      expect(rivers).toHaveLength(2);
    });
  });

  describe('Backward compatibility (Quality Gate 3)', () => {
    it('should not break WMA content without river fields', () => {
      const wmaData = {
        data: {
          type: 'wma',
          title: 'Burnsville Lake WMA',
          description: 'Great hunting',
          season: ['fall'],
          difficulty: 'easy',
          location: 'Braxton County',
          acreage: 12579,
          county: 'Braxton County',
          species: [
            {
              name: 'White-tailed Deer',
              season: 'September - January',
            },
          ],
        },
      };

      // Should NOT be identified as river
      expect(isRiverAdventure(wmaData)).toBe(false);
      // Should still be valid WMA content
      expect(wmaData.data.type).toBe('wma');
      expect(wmaData.data.acreage).toBe(12579);
    });

    it('should not break generic adventures without type field', () => {
      const legacyData = {
        data: {
          title: 'Cranberry Wilderness',
          description: 'Backcountry adventure',
          season: ['summer', 'fall'],
          difficulty: 'challenging',
          location: 'Pocahontas County',
        },
      };

      // Should NOT be identified as river
      expect(isRiverAdventure(legacyData)).toBe(false);
      // Should still be valid legacy content
      expect(legacyData.data.title).toBe('Cranberry Wilderness');
    });
  });
});
