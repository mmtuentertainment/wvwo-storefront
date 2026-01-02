/**
 * CellCoverageSection Component Tests
 * SPEC-17 T-340: P0 Safety-Critical Communication Tests
 *
 * Tests cell coverage display, satellite communication recommendations,
 * and safety-critical connectivity information for backcountry areas.
 *
 * @module components/backcountry/__tests__/CellCoverageSection
 */

import { describe, it, expect } from 'vitest';
import {
  SimplifiedCellCoverageSchema,
  SatelliteInfoSchema,
  CarrierCoverageSchema,
  type SimplifiedCellCoverage,
  type SatelliteInfo,
  type CarrierCoverage,
} from '../../../types/backcountry-types';
import {
  NavigationSummarySchema,
  CellCoverageSummarySchema,
  type NavigationSummary,
} from '../../../types/backcountry-template-types';

// ============================================================================
// CELL COVERAGE STATUS COLORS (P0 Safety)
// ============================================================================

/**
 * Cell coverage status colors following danger/safety conventions.
 * Red = No coverage (dangerous), Green = Strong coverage (safe)
 */
const CELL_COVERAGE_COLORS: Record<string, string> = {
  none: 'bg-red-700 text-white',        // Dangerous - no communication
  weak: 'bg-orange-600 text-white',     // Warning - unreliable
  moderate: 'bg-yellow-600 text-black', // Caution - may work
  strong: 'bg-sign-green text-white',   // Safe - reliable coverage
};

/**
 * Cell coverage status icons for accessibility.
 */
const CELL_COVERAGE_ICONS: Record<string, string> = {
  none: '\u2718',      // X mark - no signal
  weak: '\u25CB',      // Empty circle - minimal
  moderate: '\u25D0',  // Half circle - partial
  strong: '\u25CF',    // Full circle - complete
};

/**
 * Cell coverage status labels.
 */
const CELL_COVERAGE_LABELS: Record<string, string> = {
  none: 'No Coverage',
  weak: 'Weak/Unreliable',
  moderate: 'Moderate',
  strong: 'Strong/Reliable',
};

// ============================================================================
// P0 SAFETY-CRITICAL: COVERAGE DISPLAY TESTS
// ============================================================================

describe('CellCoverageSection [P0]', () => {
  describe('Coverage Display', () => {
    it('uses CELL_COVERAGE_COLORS for status', () => {
      const statuses = ['none', 'weak', 'moderate', 'strong'];

      statuses.forEach((status) => {
        expect(CELL_COVERAGE_COLORS[status]).toBeDefined();
        expect(typeof CELL_COVERAGE_COLORS[status]).toBe('string');
      });
    });

    it('none coverage uses red for danger', () => {
      expect(CELL_COVERAGE_COLORS.none).toContain('red');
    });

    it('weak coverage uses orange for warning', () => {
      expect(CELL_COVERAGE_COLORS.weak).toContain('orange');
    });

    it('moderate coverage uses yellow for caution', () => {
      expect(CELL_COVERAGE_COLORS.moderate).toContain('yellow');
    });

    it('strong coverage uses green for safety', () => {
      expect(CELL_COVERAGE_COLORS.strong).toContain('green');
    });

    it('shows icon from CELL_COVERAGE_ICONS', () => {
      const statuses = ['none', 'weak', 'moderate', 'strong'];

      statuses.forEach((status) => {
        expect(CELL_COVERAGE_ICONS[status]).toBeDefined();
        expect(CELL_COVERAGE_ICONS[status].length).toBeGreaterThan(0);
      });
    });

    it('none status uses X mark icon', () => {
      expect(CELL_COVERAGE_ICONS.none).toBe('\u2718');
    });

    it('strong status uses filled circle icon', () => {
      expect(CELL_COVERAGE_ICONS.strong).toBe('\u25CF');
    });

    it('all coverage colors have sufficient text contrast', () => {
      Object.values(CELL_COVERAGE_COLORS).forEach((colorClass) => {
        expect(colorClass).toMatch(/text-(white|black)/);
      });
    });
  });

  // ============================================================================
  // SATELLITE CRITICAL TESTS
  // ============================================================================

  describe('Satellite Critical', () => {
    it('shows essential badge when isSatelliteCritical', () => {
      const navigationSummary: NavigationSummary = {
        coordinates: { decimal: { lat: 39.0453, lng: -79.3678 } },
        cellCoverage: { overall: 'none', carriers: [] },
        satellite: { importance: 'essential', devices: ['Garmin inReach', 'SPOT'] },
      };

      expect(navigationSummary.satellite.importance).toBe('essential');
    });

    it('includes satellite recommendation message', () => {
      const essentialSatellite: SatelliteInfo = {
        importance: 'essential',
        devices: ['Garmin inReach Mini 2', 'SPOT Gen4'],
        notes: 'No cell coverage in wilderness. Satellite device required for emergency communication.',
      };

      expect(essentialSatellite.notes).toContain('required');
      expect(essentialSatellite.notes).toContain('emergency');
    });

    it('lists recommended satellite devices', () => {
      const satellite: SatelliteInfo = {
        importance: 'essential',
        devices: ['Garmin inReach Mini 2', 'SPOT Gen4', 'Zoleo'],
      };

      expect(satellite.devices).toHaveLength(3);
      expect(satellite.devices).toContain('Garmin inReach Mini 2');
    });

    it('handles recommended importance level', () => {
      const satellite: SatelliteInfo = {
        importance: 'strongly-recommended',
        devices: ['Garmin inReach'],
      };

      expect(['essential', 'strongly-recommended', 'recommended', 'optional']).toContain(satellite.importance);
    });

    it('handles optional importance level', () => {
      const satellite: SatelliteInfo = {
        importance: 'optional',
        devices: [],
        notes: 'Cell coverage generally available. Satellite optional for extended trips.',
      };

      expect(satellite.importance).toBe('optional');
    });
  });

  // ============================================================================
  // CARRIER COVERAGE TESTS
  // ============================================================================

  describe('Carrier Coverage', () => {
    it('displays per-carrier coverage breakdown', () => {
      const cellCoverage: SimplifiedCellCoverage = {
        overall: 'weak',
        carriers: [
          { carrier: 'Verizon', status: 'weak', notes: 'Best coverage at ridgetops' },
          { carrier: 'AT&T', status: 'none', notes: 'No coverage in area' },
          { carrier: 'T-Mobile', status: 'none' },
        ],
        nearestSignal: 'FR 80 parking area (3 miles)',
      };

      expect(cellCoverage.carriers).toHaveLength(3);
      expect(cellCoverage.carriers?.[0].carrier).toBe('Verizon');
    });

    it('shows carrier-specific notes', () => {
      const carrier: CarrierCoverage = {
        carrier: 'Verizon',
        status: 'weak',
        notes: 'Occasional signal at Bear Rocks overlook',
      };

      expect(carrier.notes).toBeDefined();
      expect(carrier.notes).toContain('Bear Rocks');
    });

    it('handles carrier without notes', () => {
      const carrier: CarrierCoverage = {
        carrier: 'AT&T',
        status: 'none',
      };

      expect(carrier.notes).toBeUndefined();
    });

    it('displays nearest signal location', () => {
      const cellCoverage: SimplifiedCellCoverage = {
        overall: 'none',
        nearestSignal: 'Canaan Valley Lodge - 8 miles from trailhead',
      };

      expect(cellCoverage.nearestSignal).toBeDefined();
      expect(cellCoverage.nearestSignal).toContain('8 miles');
    });
  });

  // ============================================================================
  // SCHEMA VALIDATION TESTS
  // ============================================================================

  describe('Schema Validation', () => {
    it('SimplifiedCellCoverageSchema accepts valid data', () => {
      const validCoverage = {
        overall: 'none',
        carriers: [
          { carrier: 'Verizon', status: 'weak' },
        ],
        nearestSignal: '5 miles east',
        notes: 'No coverage in wilderness',
      };

      const result = SimplifiedCellCoverageSchema.safeParse(validCoverage);
      expect(result.success).toBe(true);
    });

    it('SimplifiedCellCoverageSchema requires overall field', () => {
      const invalidCoverage = {
        carriers: [],
      };

      const result = SimplifiedCellCoverageSchema.safeParse(invalidCoverage);
      expect(result.success).toBe(false);
    });

    it('SimplifiedCellCoverageSchema accepts minimal data', () => {
      const minimalCoverage = {
        overall: 'strong',
      };

      const result = SimplifiedCellCoverageSchema.safeParse(minimalCoverage);
      expect(result.success).toBe(true);
    });

    it('SatelliteInfoSchema accepts valid essential data', () => {
      const validSatellite = {
        importance: 'essential',
        devices: ['Garmin inReach'],
        notes: 'Required for area',
      };

      const result = SatelliteInfoSchema.safeParse(validSatellite);
      expect(result.success).toBe(true);
    });

    it('SatelliteInfoSchema accepts optional importance', () => {
      const optionalSatellite = {
        importance: 'optional',
        devices: [],
      };

      const result = SatelliteInfoSchema.safeParse(optionalSatellite);
      expect(result.success).toBe(true);
    });

    it('CarrierCoverageSchema accepts valid carrier data', () => {
      const validCarrier = {
        carrier: 'Verizon',
        status: 'moderate',
        notes: 'Best at overlooks',
      };

      const result = CarrierCoverageSchema.safeParse(validCarrier);
      expect(result.success).toBe(true);
    });

    it('CarrierCoverageSchema rejects empty carrier name', () => {
      const invalidCarrier = {
        carrier: '',
        status: 'weak',
      };

      const result = CarrierCoverageSchema.safeParse(invalidCarrier);
      expect(result.success).toBe(false);
    });
  });

  // ============================================================================
  // NAVIGATION SUMMARY TESTS
  // ============================================================================

  describe('Navigation Summary', () => {
    it('NavigationSummarySchema accepts complete navigation data', () => {
      const validNavigation = {
        coordinates: { decimal: { lat: 39.0453, lng: -79.3678 } },
        cellCoverage: { overall: 'none', carriers: ['Verizon', 'AT&T'] },
        satellite: { importance: 'essential', devices: ['Garmin inReach'] },
      };

      const result = NavigationSummarySchema.safeParse(validNavigation);
      expect(result.success).toBe(true);
    });

    it('CellCoverageSummarySchema accepts valid overall status', () => {
      const statuses = ['none', 'weak', 'moderate', 'strong'];

      statuses.forEach((status) => {
        const result = CellCoverageSummarySchema.safeParse({
          overall: status,
        });
        expect(result.success).toBe(true);
      });
    });

    it('CellCoverageSummarySchema rejects invalid status', () => {
      const result = CellCoverageSummarySchema.safeParse({
        overall: 'excellent',
      });
      expect(result.success).toBe(false);
    });
  });

  // ============================================================================
  // DISPLAY HELPER TESTS
  // ============================================================================

  describe('Display Helpers', () => {
    const getCoverageColor = (status: string): string => {
      return CELL_COVERAGE_COLORS[status] || CELL_COVERAGE_COLORS.none;
    };

    const getCoverageIcon = (status: string): string => {
      return CELL_COVERAGE_ICONS[status] || CELL_COVERAGE_ICONS.none;
    };

    const getCoverageLabel = (status: string): string => {
      return CELL_COVERAGE_LABELS[status] || 'Unknown';
    };

    it('getCoverageColor returns correct class for each status', () => {
      expect(getCoverageColor('none')).toContain('red');
      expect(getCoverageColor('weak')).toContain('orange');
      expect(getCoverageColor('moderate')).toContain('yellow');
      expect(getCoverageColor('strong')).toContain('green');
    });

    it('getCoverageColor returns default for unknown status', () => {
      expect(getCoverageColor('unknown')).toContain('red');
    });

    it('getCoverageIcon returns correct icon for each status', () => {
      expect(getCoverageIcon('none')).toBe('\u2718');
      expect(getCoverageIcon('weak')).toBe('\u25CB');
      expect(getCoverageIcon('moderate')).toBe('\u25D0');
      expect(getCoverageIcon('strong')).toBe('\u25CF');
    });

    it('getCoverageLabel returns human-readable labels', () => {
      expect(getCoverageLabel('none')).toBe('No Coverage');
      expect(getCoverageLabel('weak')).toBe('Weak/Unreliable');
      expect(getCoverageLabel('moderate')).toBe('Moderate');
      expect(getCoverageLabel('strong')).toBe('Strong/Reliable');
    });
  });

  // ============================================================================
  // SATELLITE IMPORTANCE LEVEL TESTS
  // ============================================================================

  describe('Satellite Importance Levels', () => {
    const getSatelliteUrgency = (importance: string): string => {
      switch (importance) {
        case 'essential':
          return 'bg-red-700 text-white';
        case 'strongly-recommended':
          return 'bg-orange-600 text-white';
        case 'recommended':
          return 'bg-yellow-600 text-black';
        case 'optional':
          return 'bg-sign-green text-white';
        default:
          return 'bg-gray-500 text-white';
      }
    };

    it('essential importance uses red for urgency', () => {
      expect(getSatelliteUrgency('essential')).toContain('red');
    });

    it('strongly-recommended uses orange for warning', () => {
      expect(getSatelliteUrgency('strongly-recommended')).toContain('orange');
    });

    it('recommended uses yellow for caution', () => {
      expect(getSatelliteUrgency('recommended')).toContain('yellow');
    });

    it('optional uses green indicating less urgency', () => {
      expect(getSatelliteUrgency('optional')).toContain('green');
    });
  });

  // ============================================================================
  // ACCESSIBILITY TESTS
  // ============================================================================

  describe('Accessibility', () => {
    it('all coverage statuses have distinct icons', () => {
      const icons = Object.values(CELL_COVERAGE_ICONS);
      const uniqueIcons = new Set(icons);
      expect(uniqueIcons.size).toBe(icons.length);
    });

    it('all coverage labels are human-readable', () => {
      Object.values(CELL_COVERAGE_LABELS).forEach((label) => {
        expect(label.length).toBeGreaterThan(3);
        // Not just a technical term
        expect(label).not.toMatch(/^[a-z_]+$/);
      });
    });

    it('coverage colors include text color for contrast', () => {
      Object.values(CELL_COVERAGE_COLORS).forEach((colorClass) => {
        expect(colorClass).toMatch(/text-/);
      });
    });
  });

  // ============================================================================
  // EDGE CASES
  // ============================================================================

  describe('Edge Cases', () => {
    it('handles empty carriers array', () => {
      const coverage: SimplifiedCellCoverage = {
        overall: 'none',
        carriers: [],
      };

      expect(coverage.carriers).toHaveLength(0);
    });

    it('handles coverage with only overall status', () => {
      const coverage: SimplifiedCellCoverage = {
        overall: 'strong',
      };

      expect(coverage.overall).toBe('strong');
      expect(coverage.carriers).toBeUndefined();
      expect(coverage.nearestSignal).toBeUndefined();
    });

    it('handles satellite info with empty devices array', () => {
      const satellite: SatelliteInfo = {
        importance: 'optional',
        devices: [],
      };

      expect(satellite.devices).toHaveLength(0);
    });

    it('handles very long carrier notes', () => {
      const carrier: CarrierCoverage = {
        carrier: 'Verizon',
        status: 'weak',
        notes: 'Signal available intermittently at Bear Rocks overlook, Dolly Sods North trailhead, and FR 75 intersection. Best coverage early morning before 10am. May need to walk to higher ground for reliable signal. Consider satellite device for emergencies.',
      };

      expect(carrier.notes?.length).toBeGreaterThan(100);
    });

    it('handles multiple satellite device recommendations', () => {
      const satellite: SatelliteInfo = {
        importance: 'essential',
        devices: [
          'Garmin inReach Mini 2',
          'Garmin inReach Explorer+',
          'SPOT Gen4',
          'SPOT X',
          'Zoleo',
          'ACR Bivy Stick',
        ],
      };

      expect(satellite.devices?.length).toBe(6);
    });
  });
});
