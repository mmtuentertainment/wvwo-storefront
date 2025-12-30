/**
 * Tests for River Type Guards
 * SPEC-14: T-012 - Type narrowing utilities for River adventures
 */

import { describe, it, expect } from 'vitest';
import { isRiverAdventure, hasRapids, hasOutfitters, hasFishing } from '../river';

describe('River Type Guards', () => {
  describe('isRiverAdventure', () => {
    it('should return true for river adventure', () => {
      const riverAdventure = {
        data: { type: 'river', name: 'Gauley River' },
      };
      expect(isRiverAdventure(riverAdventure)).toBe(true);
    });

    it('should return false for non-river adventure', () => {
      const wmaAdventure = {
        data: { type: 'wma', name: 'Beech Fork WMA' },
      };
      expect(isRiverAdventure(wmaAdventure)).toBe(false);
    });

    it('should return false for lake adventure', () => {
      const lakeAdventure = {
        data: { type: 'lake', name: 'Summersville Lake' },
      };
      expect(isRiverAdventure(lakeAdventure)).toBe(false);
    });

    it('should handle missing data property', () => {
      const invalidAdventure = {};
      expect(isRiverAdventure(invalidAdventure)).toBe(false);
    });

    it('should handle null data', () => {
      const nullData = { data: null };
      expect(isRiverAdventure(nullData)).toBe(false);
    });
  });

  describe('hasRapids', () => {
    it('should return true when rapids array exists and has items', () => {
      const props = {
        rapids: [
          { name: 'Pillow Rock', class: { base: 'V+' }, displayName: 'Class V+' },
        ],
      };
      expect(hasRapids(props)).toBe(true);
    });

    it('should return false when rapids array is empty', () => {
      const props = { rapids: [] };
      expect(hasRapids(props)).toBe(false);
    });

    it('should return false when rapids property is missing', () => {
      const props = {};
      expect(hasRapids(props)).toBe(false);
    });

    it('should return false when rapids is not an array', () => {
      const props = { rapids: 'not an array' };
      expect(hasRapids(props)).toBe(false);
    });

    it('should narrow type correctly in TypeScript', () => {
      const props: any = {
        rapids: [{ name: 'Test Rapid', class: { base: 'IV' } }],
      };
      if (hasRapids(props)) {
        // TypeScript should know props.rapids exists and is an array
        expect(props.rapids[0].name).toBe('Test Rapid');
      }
    });
  });

  describe('hasOutfitters', () => {
    it('should return true when outfitters array exists and has items', () => {
      const props = {
        outfitters: [
          { name: 'Test Outfitter', services: ['Guided trips'] },
        ],
      };
      expect(hasOutfitters(props)).toBe(true);
    });

    it('should return false when outfitters array is empty', () => {
      const props = { outfitters: [] };
      expect(hasOutfitters(props)).toBe(false);
    });

    it('should return false when outfitters property is missing', () => {
      const props = {};
      expect(hasOutfitters(props)).toBe(false);
    });
  });

  describe('hasFishing', () => {
    it('should return true when fishing object exists', () => {
      const props = {
        fishing: {
          species: ['Bass'],
          techniques: 'Fly fishing',
          seasons: 'Spring',
          regulations: 'License required',
        },
      };
      expect(hasFishing(props)).toBe(true);
    });

    it('should return false when fishing property is missing', () => {
      const props = {};
      expect(hasFishing(props)).toBe(false);
    });

    it('should return false when fishing is null', () => {
      const props = { fishing: null };
      expect(hasFishing(props)).toBe(false);
    });

    it('should return false when fishing is not an object', () => {
      const props = { fishing: 'not an object' };
      expect(hasFishing(props)).toBe(false);
    });
  });
});
