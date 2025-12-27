/**
 * AdventureQuickStats.astro Unit Tests
 * SPEC-10: Quick Stats Component
 *
 * Tests type mappings, icon paths, and column configurations.
 * Uses logic extraction since Astro components don't have native test renderer.
 *
 * @note Uses centralized types from types/adventure.ts to ensure consistency.
 */

import { describe, it, expect } from 'vitest';
import type { StatItem, StatIcon, StatColumns } from '../../../types/adventure';
import { STAT_ICON_PATHS } from '../../../types/adventure';

// ============================================================================
// Test Data
// ============================================================================

const mockStats: StatItem[] = [
  { value: '2,790', label: 'Acres', icon: 'area' },
  { value: '30 min', label: 'From Shop', icon: 'time' },
  { value: 'Nicholas Co.', label: 'Location', icon: 'location' },
  { value: 'Year-Round', label: 'Access', icon: 'calendar' },
];

const columnClasses: Record<StatColumns, string> = {
  2: 'grid-cols-2',
  3: 'grid-cols-2 md:grid-cols-3',
  4: 'grid-cols-2 md:grid-cols-4',
};

// ============================================================================
// Tests
// ============================================================================

describe('AdventureQuickStats', () => {
  describe('STAT_ICON_PATHS mapping', () => {
    it('has all predefined icon paths', () => {
      expect(STAT_ICON_PATHS.distance).toBeDefined();
      expect(STAT_ICON_PATHS.time).toBeDefined();
      expect(STAT_ICON_PATHS.calendar).toBeDefined();
      expect(STAT_ICON_PATHS.check).toBeDefined();
      expect(STAT_ICON_PATHS.info).toBeDefined();
      expect(STAT_ICON_PATHS.location).toBeDefined();
      expect(STAT_ICON_PATHS.area).toBeDefined();
    });

    it('none returns null', () => {
      expect(STAT_ICON_PATHS.none).toBeNull();
    });

    it('all paths are valid SVG path strings or null', () => {
      Object.entries(STAT_ICON_PATHS).forEach(([key, value]) => {
        if (key !== 'none') {
          expect(typeof value).toBe('string');
          expect(value).toMatch(/^[MLHVCSQTAZmlhvcsqtaz0-9\s.,\-]+$/);
        }
      });
    });

    it('time icon is a clock path', () => {
      expect(STAT_ICON_PATHS.time).toContain('M12 8v4l3 3');
    });

    it('check icon is a checkmark path', () => {
      expect(STAT_ICON_PATHS.check).toBe('M5 13l4 4L19 7');
    });
  });

  describe('column configuration', () => {
    it('generates correct grid classes for 2 columns', () => {
      expect(columnClasses[2]).toBe('grid-cols-2');
    });

    it('generates correct grid classes for 3 columns', () => {
      expect(columnClasses[3]).toBe('grid-cols-2 md:grid-cols-3');
      expect(columnClasses[3]).toContain('md:grid-cols-3');
    });

    it('generates correct grid classes for 4 columns', () => {
      expect(columnClasses[4]).toBe('grid-cols-2 md:grid-cols-4');
      expect(columnClasses[4]).toContain('md:grid-cols-4');
    });

    it('all column configs have mobile-first grid-cols-2', () => {
      Object.values(columnClasses).forEach((classes) => {
        expect(classes).toContain('grid-cols-2');
      });
    });
  });

  describe('stat item structure', () => {
    it('valid stat item has required fields', () => {
      const stat: StatItem = {
        value: '2,790',
        label: 'Acres',
      };
      expect(stat.value).toBeDefined();
      expect(stat.label).toBeDefined();
    });

    it('accepts optional icon', () => {
      const stat: StatItem = {
        value: '30 min',
        label: 'From Shop',
        icon: 'time',
      };
      expect(stat.icon).toBe('time');
    });

    it('accepts custom icon path', () => {
      const customPath = 'M12 2L2 7l10 5 10-5-10-5z';
      const stat: StatItem = {
        value: 'Custom',
        label: 'Stat',
        customIconPath: customPath,
      };
      expect(stat.customIconPath).toBe(customPath);
    });

    it('icon is optional - undefined is valid', () => {
      const stat: StatItem = {
        value: 'Test',
        label: 'Test Label',
      };
      expect(stat.icon).toBeUndefined();
    });
  });

  describe('mock stats data', () => {
    it('has 4 stats items', () => {
      expect(mockStats).toHaveLength(4);
    });

    it('all items have value and label', () => {
      mockStats.forEach((stat) => {
        expect(stat.value).toBeTruthy();
        expect(stat.label).toBeTruthy();
      });
    });

    it('all items have valid icon types', () => {
      const validIcons: StatIcon[] = [
        'distance',
        'time',
        'calendar',
        'check',
        'info',
        'location',
        'area',
        'none',
      ];
      mockStats.forEach((stat) => {
        if (stat.icon) {
          expect(validIcons).toContain(stat.icon);
        }
      });
    });
  });

  describe('icon path resolution', () => {
    function getIconPath(stat: StatItem): string | null {
      if (stat.customIconPath) return stat.customIconPath;
      if (stat.icon && stat.icon !== 'none') return STAT_ICON_PATHS[stat.icon];
      return null;
    }

    it('returns predefined path for known icon', () => {
      const stat: StatItem = { value: 'Test', label: 'Test', icon: 'time' };
      expect(getIconPath(stat)).toBe(STAT_ICON_PATHS.time);
    });

    it('returns null for none icon', () => {
      const stat: StatItem = { value: 'Test', label: 'Test', icon: 'none' };
      expect(getIconPath(stat)).toBeNull();
    });

    it('returns null when no icon specified', () => {
      const stat: StatItem = { value: 'Test', label: 'Test' };
      expect(getIconPath(stat)).toBeNull();
    });

    it('prefers customIconPath over predefined icon', () => {
      const customPath = 'M0 0 L10 10';
      const stat: StatItem = {
        value: 'Test',
        label: 'Test',
        icon: 'time',
        customIconPath: customPath,
      };
      expect(getIconPath(stat)).toBe(customPath);
    });
  });

  describe('variant background classes', () => {
    const variantClasses: Record<'cream' | 'white', string> = {
      cream: 'bg-brand-cream',
      white: 'bg-white',
    };

    it('cream maps to bg-brand-cream', () => {
      expect(variantClasses.cream).toBe('bg-brand-cream');
    });

    it('white maps to bg-white', () => {
      expect(variantClasses.white).toBe('bg-white');
    });
  });
});
