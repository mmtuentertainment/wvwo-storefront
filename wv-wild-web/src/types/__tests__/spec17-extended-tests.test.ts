/**
 * SPEC-17 Extended Type Schema Tests (T-300 to T-321)
 *
 * Additional test coverage for Backcountry Template type schemas
 * focusing on edge cases and industry standard validations.
 *
 * Test Coverage:
 * - T-300-305: Emergency Contact Tier validation
 * - T-306-310: Cell Coverage Logic (already covered in navigation-types.test.ts)
 * - T-311-316: AMD Detection (already covered in water-safety.test.ts)
 * - T-317-321: Industry Colors and Shapes
 *
 * @module types/__tests__/spec17-extended-tests
 */

import { describe, it, expect } from 'vitest';
import {
  // Emergency Contact Schemas
  EmergencyContactSchema,
  TieredEmergencyContactSchema,
  // Navigation schemas
  NavigationSummarySchema,
} from '../backcountry-template-types';
import {
  // Difficulty constants and types
  DIFFICULTY_COLORS,
  DIFFICULTY_SHAPES,
  DifficultySchema,
  type Difficulty,
} from '../adventure';

// ============================================================================
// T-300-305: EMERGENCY CONTACT TIER TESTS
// ============================================================================

describe('Emergency Contact Tier Tests (T-300 to T-305)', () => {
  describe('T-300: Rejects missing phone field', () => {
    it('should reject emergency contact without phone', () => {
      const result = EmergencyContactSchema.safeParse({
        service: 'Tucker County 911',
        available: '24/7',
        // phone field missing
      });
      expect(result.success).toBe(false);
    });
  });

  describe('T-301: Rejects missing service field', () => {
    it('should reject emergency contact without service', () => {
      const result = EmergencyContactSchema.safeParse({
        phone: '911',
        available: '24/7',
        // service field missing
      });
      expect(result.success).toBe(false);
    });
  });

  describe('T-302: Validates phone formats', () => {
    it('should accept 911 format', () => {
      const result = EmergencyContactSchema.safeParse({
        service: 'Emergency',
        phone: '911',
        available: '24/7',
      });
      expect(result.success).toBe(true);
    });

    it('should accept 304-xxx-xxxx format (WV area code)', () => {
      const result = EmergencyContactSchema.safeParse({
        service: 'Ranger Station',
        phone: '304-636-1800',
        available: '8am-4:30pm',
      });
      expect(result.success).toBe(true);
    });

    it('should accept +1-800-xxx-xxxx format', () => {
      const result = EmergencyContactSchema.safeParse({
        service: 'Poison Control',
        phone: '+1-800-222-1222',
        available: '24/7',
      });
      expect(result.success).toBe(true);
    });

    it('should accept 1-800-xxx-xxxx format (without +)', () => {
      const result = EmergencyContactSchema.safeParse({
        service: 'National Helpline',
        phone: '1-800-555-0100',
        available: '24/7',
      });
      expect(result.success).toBe(true);
    });

    it('should accept (304) 478-2000 format with parentheses', () => {
      const result = EmergencyContactSchema.safeParse({
        service: 'Local SAR',
        phone: '(304) 478-2000',
        available: '24/7 via 911',
      });
      expect(result.success).toBe(true);
    });

    it('should reject invalid phone format', () => {
      const result = EmergencyContactSchema.safeParse({
        service: 'Bad Contact',
        phone: 'call-me-maybe',
        available: '24/7',
      });
      expect(result.success).toBe(false);
    });

    it('should reject phone with letters', () => {
      const result = EmergencyContactSchema.safeParse({
        service: 'Bad Contact',
        phone: '1-800-FLOWERS',
        available: '24/7',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('T-303: SAR tier validation', () => {
    it('should accept SAR tier with responseTime', () => {
      const result = TieredEmergencyContactSchema.safeParse({
        tier: 'sar',
        service: 'Tucker County SAR',
        phone: '304-478-2431',
        available: '24/7 via 911',
        responseTime: '4-8 hours typical',
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.responseTime).toBe('4-8 hours typical');
      }
    });

    it('should accept SAR tier without responseTime (optional field)', () => {
      const result = TieredEmergencyContactSchema.safeParse({
        tier: 'sar',
        service: 'County SAR',
        phone: '304-478-2431',
        available: '24/7',
      });
      expect(result.success).toBe(true);
    });

    it('should accept SAR tier with capabilities array', () => {
      const result = TieredEmergencyContactSchema.safeParse({
        tier: 'sar',
        service: 'Mountain Rescue',
        phone: '304-555-0100',
        available: '24/7 via 911',
        responseTime: '2-4 hours',
        capabilities: ['ground search', 'technical rescue', 'helicopter extraction'],
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.capabilities).toHaveLength(3);
        expect(result.data.capabilities).toContain('technical rescue');
      }
    });
  });

  describe('T-304: Satellite importance level validation', () => {
    it('should accept satellite with essential importance', () => {
      const result = NavigationSummarySchema.safeParse({
        coordinates: {
          decimal: { lat: 39.0453, lng: -79.3678 },
        },
        cellCoverage: {
          overall: 'none',
          carriers: [],
        },
        satellite: {
          importance: 'essential',
          devices: ['Garmin inReach'],
        },
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.satellite.importance).toBe('essential');
      }
    });

    it('should accept satellite with recommended importance', () => {
      const result = NavigationSummarySchema.safeParse({
        coordinates: {
          decimal: { lat: 39.0, lng: -79.5 },
        },
        cellCoverage: {
          overall: 'weak',
          carriers: ['Verizon'],
        },
        satellite: {
          importance: 'recommended',
          devices: ['Garmin inReach', 'SPOT'],
        },
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.satellite.importance).toBe('recommended');
      }
    });

    it('should accept satellite with optional importance', () => {
      const result = NavigationSummarySchema.safeParse({
        coordinates: {
          decimal: { lat: 38.9, lng: -79.6 },
        },
        cellCoverage: {
          overall: 'moderate',
          carriers: ['Verizon', 'AT&T'],
        },
        satellite: {
          importance: 'optional',
          devices: ['iPhone 14+'],
        },
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.satellite.importance).toBe('optional');
      }
    });

    it('should reject invalid importance level', () => {
      const result = NavigationSummarySchema.safeParse({
        coordinates: {
          decimal: { lat: 39.0, lng: -79.5 },
        },
        cellCoverage: {
          overall: 'none',
          carriers: [],
        },
        satellite: {
          importance: 'maybe', // Invalid
          devices: ['Garmin inReach'],
        },
      });
      expect(result.success).toBe(false);
    });

    it('should accept satellite with multiple devices', () => {
      const result = NavigationSummarySchema.safeParse({
        coordinates: {
          decimal: { lat: 39.0, lng: -79.5 },
        },
        cellCoverage: {
          overall: 'none',
          carriers: [],
        },
        satellite: {
          importance: 'essential',
          devices: ['Garmin inReach', 'SPOT', 'Zoleo'],
        },
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.satellite.devices).toHaveLength(3);
      }
    });
  });

  describe('T-305: Multiple emergency tier validation', () => {
    it('should accept primary tier with 911', () => {
      const result = TieredEmergencyContactSchema.safeParse({
        tier: 'primary',
        service: 'Tucker County 911',
        phone: '911',
        available: '24/7',
      });
      expect(result.success).toBe(true);
    });

    it('should accept medical tier', () => {
      const result = TieredEmergencyContactSchema.safeParse({
        tier: 'medical',
        service: 'Davis Memorial Hospital',
        phone: '304-636-3300',
        available: '24/7 ER',
      });
      expect(result.success).toBe(true);
    });

    it('should accept agency tier', () => {
      const result = TieredEmergencyContactSchema.safeParse({
        tier: 'agency',
        service: 'Monongahela NF Ranger',
        phone: '304-636-1800',
        available: '8am-4:30pm Mon-Fri',
      });
      expect(result.success).toBe(true);
    });

    it('should accept poison tier', () => {
      const result = TieredEmergencyContactSchema.safeParse({
        tier: 'poison',
        service: 'WV Poison Center',
        phone: '1-800-222-1222',
        available: '24/7',
      });
      expect(result.success).toBe(true);
    });
  });
});

// ============================================================================
// T-317-321: INDUSTRY COLORS AND SHAPES TESTS
// ============================================================================

describe('Industry Standard Difficulty Colors and Shapes (T-317 to T-321)', () => {
  describe('T-317: DIFFICULTY_COLORS map correctly', () => {
    it('should have color class for easy difficulty', () => {
      expect(DIFFICULTY_COLORS.easy).toBeDefined();
      expect(DIFFICULTY_COLORS.easy).toContain('green');
    });

    it('should have color class for moderate difficulty', () => {
      expect(DIFFICULTY_COLORS.moderate).toBeDefined();
      expect(DIFFICULTY_COLORS.moderate).toContain('blue');
    });

    it('should have color class for challenging difficulty', () => {
      expect(DIFFICULTY_COLORS.challenging).toBeDefined();
      expect(DIFFICULTY_COLORS.challenging).toContain('red');
    });

    it('should have color class for rugged difficulty', () => {
      expect(DIFFICULTY_COLORS.rugged).toBeDefined();
      expect(DIFFICULTY_COLORS.rugged).toContain('black');
    });

    it('should follow industry safety color standards', () => {
      // Green = Easy (industry standard)
      expect(DIFFICULTY_COLORS.easy).toBe('bg-sign-green text-white');
      // Blue = Moderate (industry standard)
      expect(DIFFICULTY_COLORS.moderate).toBe('bg-blue-700 text-white');
      // Red = Challenging (industry standard)
      expect(DIFFICULTY_COLORS.challenging).toBe('bg-red-900 text-white');
      // Black = Rugged/Expert (industry standard)
      expect(DIFFICULTY_COLORS.rugged).toBe('bg-black text-white');
    });

    it('should have all difficulty levels defined', () => {
      const difficulties: Difficulty[] = ['easy', 'moderate', 'challenging', 'rugged'];
      difficulties.forEach((difficulty) => {
        expect(DIFFICULTY_COLORS[difficulty]).toBeDefined();
        expect(typeof DIFFICULTY_COLORS[difficulty]).toBe('string');
        expect(DIFFICULTY_COLORS[difficulty].length).toBeGreaterThan(0);
      });
    });
  });

  describe('T-318: DIFFICULTY_SHAPES are unique per level', () => {
    it('should have shape for easy difficulty (circle)', () => {
      expect(DIFFICULTY_SHAPES.easy).toBeDefined();
      expect(DIFFICULTY_SHAPES.easy).toBe('\u25CF'); // ● circle
    });

    it('should have shape for moderate difficulty (square)', () => {
      expect(DIFFICULTY_SHAPES.moderate).toBeDefined();
      expect(DIFFICULTY_SHAPES.moderate).toBe('\u25A0'); // ■ square
    });

    it('should have shape for challenging difficulty (triangle)', () => {
      expect(DIFFICULTY_SHAPES.challenging).toBeDefined();
      expect(DIFFICULTY_SHAPES.challenging).toBe('\u25B2'); // ▲ triangle
    });

    it('should have shape for rugged difficulty (diamond)', () => {
      expect(DIFFICULTY_SHAPES.rugged).toBeDefined();
      expect(DIFFICULTY_SHAPES.rugged).toBe('\u25C6'); // ◆ diamond
    });
  });

  describe('T-319: Shapes are distinguishable (accessibility)', () => {
    it('should have unique shapes for each difficulty level', () => {
      const shapes = Object.values(DIFFICULTY_SHAPES);
      const uniqueShapes = new Set(shapes);
      expect(uniqueShapes.size).toBe(shapes.length);
    });

    it('should use Unicode geometric shapes', () => {
      // Verify all shapes are valid Unicode characters
      Object.values(DIFFICULTY_SHAPES).forEach((shape) => {
        expect(typeof shape).toBe('string');
        expect(shape.length).toBeGreaterThan(0);
        // Should be renderable Unicode
        expect(shape.charCodeAt(0)).toBeGreaterThan(0);
      });
    });

    it('should follow international hiking trail standards', () => {
      // International hiking difficulty standards use these shapes
      expect(DIFFICULTY_SHAPES.easy).toBe('\u25CF');      // Circle
      expect(DIFFICULTY_SHAPES.moderate).toBe('\u25A0');  // Square
      expect(DIFFICULTY_SHAPES.challenging).toBe('\u25B2'); // Triangle
      expect(DIFFICULTY_SHAPES.rugged).toBe('\u25C6');    // Diamond
    });
  });

  describe('T-320: Color-shape combination validation', () => {
    it('should pair easy with green and circle', () => {
      expect(DIFFICULTY_COLORS.easy).toContain('green');
      expect(DIFFICULTY_SHAPES.easy).toBe('\u25CF');
    });

    it('should pair moderate with blue and square', () => {
      expect(DIFFICULTY_COLORS.moderate).toContain('blue');
      expect(DIFFICULTY_SHAPES.moderate).toBe('\u25A0');
    });

    it('should pair challenging with red and triangle', () => {
      expect(DIFFICULTY_COLORS.challenging).toContain('red');
      expect(DIFFICULTY_SHAPES.challenging).toBe('\u25B2');
    });

    it('should pair rugged with black and diamond', () => {
      expect(DIFFICULTY_COLORS.rugged).toContain('black');
      expect(DIFFICULTY_SHAPES.rugged).toBe('\u25C6');
    });
  });

  describe('T-321: DifficultySchema validation', () => {
    it('should validate easy difficulty', () => {
      const result = DifficultySchema.safeParse('easy');
      expect(result.success).toBe(true);
    });

    it('should validate moderate difficulty', () => {
      const result = DifficultySchema.safeParse('moderate');
      expect(result.success).toBe(true);
    });

    it('should validate challenging difficulty', () => {
      const result = DifficultySchema.safeParse('challenging');
      expect(result.success).toBe(true);
    });

    it('should validate rugged difficulty', () => {
      const result = DifficultySchema.safeParse('rugged');
      expect(result.success).toBe(true);
    });

    it('should reject invalid difficulty level', () => {
      const result = DifficultySchema.safeParse('hard');
      expect(result.success).toBe(false);
    });

    it('should reject empty string', () => {
      const result = DifficultySchema.safeParse('');
      expect(result.success).toBe(false);
    });

    it('should have exactly 4 difficulty levels', () => {
      const difficulties = ['easy', 'moderate', 'challenging', 'rugged'];
      expect(Object.keys(DIFFICULTY_COLORS)).toHaveLength(4);
      expect(Object.keys(DIFFICULTY_SHAPES)).toHaveLength(4);

      difficulties.forEach((difficulty) => {
        const result = DifficultySchema.safeParse(difficulty);
        expect(result.success).toBe(true);
      });
    });
  });
});

// ============================================================================
// INTEGRATION TESTS: Color-Shape-Schema Consistency
// ============================================================================

describe('Integration: Difficulty System Consistency', () => {
  it('should have matching keys across COLORS, SHAPES, and Schema', () => {
    const difficulties: Difficulty[] = ['easy', 'moderate', 'challenging', 'rugged'];

    difficulties.forEach((difficulty) => {
      // Schema accepts it
      expect(DifficultySchema.safeParse(difficulty).success).toBe(true);
      // Has a color
      expect(DIFFICULTY_COLORS[difficulty]).toBeDefined();
      // Has a shape
      expect(DIFFICULTY_SHAPES[difficulty]).toBeDefined();
    });
  });

  it('should not have extra keys in COLORS or SHAPES', () => {
    const schemaKeys = ['easy', 'moderate', 'challenging', 'rugged'];
    const colorKeys = Object.keys(DIFFICULTY_COLORS);
    const shapeKeys = Object.keys(DIFFICULTY_SHAPES);

    expect(colorKeys.sort()).toEqual(schemaKeys.sort());
    expect(shapeKeys.sort()).toEqual(schemaKeys.sort());
  });

  it('should maintain accessibility standards (WCAG)', () => {
    // Each difficulty should have both color AND shape for color-blind accessibility
    const difficulties: Difficulty[] = ['easy', 'moderate', 'challenging', 'rugged'];

    difficulties.forEach((difficulty) => {
      const hasColor = DIFFICULTY_COLORS[difficulty] !== undefined;
      const hasShape = DIFFICULTY_SHAPES[difficulty] !== undefined;

      expect(hasColor).toBe(true);
      expect(hasShape).toBe(true);
    });
  });
});
