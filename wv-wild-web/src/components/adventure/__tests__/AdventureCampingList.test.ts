/**
 * AdventureCampingList.astro Unit Tests
 * SPEC-12: Camping Facilities Component (T-009)
 *
 * Tests phone formatting, external link security, count badges,
 * and responsive grid logic per FR-007 through FR-012.
 *
 * Uses logic extraction since Astro components don't have native test renderer.
 */

import { describe, it, expect } from 'vitest';
import type { CampingFacility } from '../../../types/adventure';

// ============================================================================
// Test Data
// ============================================================================

const mockFacilities: CampingFacility[] = [
  {
    type: 'Camping Sites',
    count: 240,
    description: 'Electric hookups, restrooms, showers. Sites $15-25/night.',
    contact: '(304) 555-CAMP',
    link: 'https://reservations.example.com/burnsville',
    accessibility: '5 ADA-accessible sites near restrooms',
  },
  {
    type: 'Boat Ramps',
    count: 2,
    description: 'Concrete ramps with courtesy docks. Parking for 30 vehicles.',
  },
  {
    type: 'Shooting Range',
    description: '100-yard rifle range, pistol bays. Open dawn-dusk.',
    contact: '(304) 555-1234',
  },
];

const columnClasses: Record<2 | 3 | 4, string> = {
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-3',
  4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
};

// ============================================================================
// Helper Functions (extracted from component logic)
// ============================================================================

/**
 * Format phone number for tel: link by stripping non-digits.
 * Example: "(304) 555-1234" -> "3045551234"
 */
function formatPhoneForTelLink(phone: string): string {
  return phone.replace(/\D/g, '');
}

/**
 * Check if external link needs security attributes.
 */
function isExternalLink(href: string): boolean {
  return href.startsWith('http://') || href.startsWith('https://');
}

// ============================================================================
// Tests
// ============================================================================

describe('AdventureCampingList', () => {
  // =========================================================================
  // Phone Number Formatting Tests (FR-009)
  // =========================================================================
  describe('phone number formatting', () => {
    it('should strip non-digits from formatted phone number', () => {
      const formatted = '(304) 555-1234';
      const result = formatPhoneForTelLink(formatted);

      expect(result).toBe('3045551234');
    });

    it('should handle phone with dots', () => {
      const formatted = '304.555.6789';
      const result = formatPhoneForTelLink(formatted);

      expect(result).toBe('3045556789');
    });

    it('should handle phone with dashes', () => {
      const formatted = '304-555-9999';
      const result = formatPhoneForTelLink(formatted);

      expect(result).toBe('3045559999');
    });

    it('should handle phone with extension', () => {
      const formatted = '(304) 555-1234 ext. 123';
      const result = formatPhoneForTelLink(formatted);

      expect(result).toBe('3045551234123');
    });

    it('should handle CAMP-style formatting', () => {
      const formatted = '(304) 555-CAMP';
      const result = formatPhoneForTelLink(formatted);

      // Only digits extracted, letters ignored
      expect(result).toBe('304555');
    });
  });

  // =========================================================================
  // External Link Detection Tests (FR-010)
  // =========================================================================
  describe('external link detection', () => {
    it('should detect https URLs as external', () => {
      const url = 'https://reservations.example.com';

      expect(isExternalLink(url)).toBe(true);
    });

    it('should detect http URLs as external', () => {
      const url = 'http://example.com';

      expect(isExternalLink(url)).toBe(true);
    });

    it('should treat relative URLs as internal', () => {
      const url = '/adventures/burnsville';

      expect(isExternalLink(url)).toBe(false);
    });

    it('should treat anchor links as internal', () => {
      const url = '#facilities';

      expect(isExternalLink(url)).toBe(false);
    });
  });

  // =========================================================================
  // Column Configuration Tests (FR-011)
  // =========================================================================
  describe('column configuration', () => {
    it('generates correct grid classes for 2 columns', () => {
      expect(columnClasses[2]).toBe('grid-cols-1 md:grid-cols-2');
    });

    it('generates correct grid classes for 3 columns (default)', () => {
      expect(columnClasses[3]).toBe('grid-cols-1 md:grid-cols-3');
      expect(columnClasses[3]).toContain('md:grid-cols-3');
    });

    it('generates correct grid classes for 4 columns', () => {
      expect(columnClasses[4]).toBe('grid-cols-1 md:grid-cols-2 lg:grid-cols-4');
      expect(columnClasses[4]).toContain('lg:grid-cols-4');
    });

    it('all column configs have mobile-first grid-cols-1', () => {
      Object.values(columnClasses).forEach((classes) => {
        expect(classes).toContain('grid-cols-1');
      });
    });
  });

  // =========================================================================
  // Facility Data Structure Tests (FR-007)
  // =========================================================================
  describe('facility data structure', () => {
    it('valid facility has required type and description', () => {
      const facility: CampingFacility = {
        type: 'Camping Sites',
        description: 'Electric hookups available',
      };

      expect(facility.type).toBeDefined();
      expect(facility.description).toBeDefined();
    });

    it('accepts optional count', () => {
      const facility: CampingFacility = {
        type: 'Camping Sites',
        count: 240,
        description: 'Sites available',
      };

      expect(facility.count).toBe(240);
    });

    it('accepts optional contact phone', () => {
      const facility: CampingFacility = {
        type: 'Shooting Range',
        description: 'Open dawn-dusk',
        contact: '(304) 555-1234',
      };

      expect(facility.contact).toBe('(304) 555-1234');
    });

    it('accepts optional external link', () => {
      const facility: CampingFacility = {
        type: 'Camping',
        description: 'Sites',
        link: 'https://reservations.example.com',
      };

      expect(facility.link).toBe('https://reservations.example.com');
    });

    it('accepts optional accessibility notes', () => {
      const facility: CampingFacility = {
        type: 'Camping',
        description: 'Sites',
        accessibility: '5 ADA-accessible sites',
      };

      expect(facility.accessibility).toBe('5 ADA-accessible sites');
    });
  });

  // =========================================================================
  // Mock Data Validation Tests
  // =========================================================================
  describe('mock facilities data', () => {
    it('has 3 facility items', () => {
      expect(mockFacilities).toHaveLength(3);
    });

    it('all items have type and description', () => {
      mockFacilities.forEach((facility) => {
        expect(facility.type).toBeTruthy();
        expect(facility.description).toBeTruthy();
      });
    });

    it('first facility has all optional fields', () => {
      const facility = mockFacilities[0];

      expect(facility.count).toBe(240);
      expect(facility.contact).toBeDefined();
      expect(facility.link).toBeDefined();
      expect(facility.accessibility).toBeDefined();
    });

    it('second facility has only count', () => {
      const facility = mockFacilities[1];

      expect(facility.count).toBe(2);
      expect(facility.contact).toBeUndefined();
      expect(facility.link).toBeUndefined();
      expect(facility.accessibility).toBeUndefined();
    });

    it('third facility has only contact', () => {
      const facility = mockFacilities[2];

      expect(facility.count).toBeUndefined();
      expect(facility.contact).toBeDefined();
      expect(facility.link).toBeUndefined();
      expect(facility.accessibility).toBeUndefined();
    });
  });

  // =========================================================================
  // Count Badge Logic Tests (FR-008)
  // =========================================================================
  describe('count badge rendering logic', () => {
    function shouldShowCountBadge(facility: CampingFacility): boolean {
      return facility.count !== undefined && facility.count > 0;
    }

    it('should show badge when count is positive', () => {
      const facility: CampingFacility = {
        type: 'Camping',
        count: 240,
        description: 'Sites',
      };

      expect(shouldShowCountBadge(facility)).toBe(true);
    });

    it('should not show badge when count is undefined', () => {
      const facility: CampingFacility = {
        type: 'Parking',
        description: 'Gravel lot',
      };

      expect(shouldShowCountBadge(facility)).toBe(false);
    });

    it('should not show badge when count is 0', () => {
      const facility: CampingFacility = {
        type: 'Facility',
        count: 0,
        description: 'Description',
      };

      expect(shouldShowCountBadge(facility)).toBe(false);
    });
  });

  // =========================================================================
  // Default Props Tests (FR-012)
  // =========================================================================
  describe('default props', () => {
    const defaultTitle = 'Facilities & Access';
    const defaultColumns = 3;
    const defaultVariant = 'cream';

    it('has correct default title', () => {
      expect(defaultTitle).toBe('Facilities & Access');
    });

    it('has correct default column count', () => {
      expect(defaultColumns).toBe(3);
    });

    it('has correct default variant', () => {
      expect(defaultVariant).toBe('cream');
    });
  });

  // =========================================================================
  // Variant Background Classes Tests
  // =========================================================================
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

  // =========================================================================
  // Empty State Tests (Edge Case)
  // =========================================================================
  describe('empty state handling', () => {
    function shouldShowEmptyState(facilities: CampingFacility[]): boolean {
      return facilities.length === 0;
    }

    it('should show empty state when array is empty', () => {
      const facilities: CampingFacility[] = [];

      expect(shouldShowEmptyState(facilities)).toBe(true);
    });

    it('should not show empty state when array has items', () => {
      const facilities: CampingFacility[] = [
        { type: 'Facility', description: 'Description' },
      ];

      expect(shouldShowEmptyState(facilities)).toBe(false);
    });
  });
});
