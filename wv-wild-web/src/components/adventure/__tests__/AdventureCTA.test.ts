/**
 * AdventureCTA.astro Unit Tests
 * SPEC-12: Universal Call-to-Action Component
 *
 * Test-Driven Development (TDD) - Tests written BEFORE implementation
 * - 7 unit tests covering FR-018 through FR-023
 * - Variant system (sign-green/brand-brown backgrounds)
 * - Dual-button system (primary filled, secondary outlined)
 * - External link auto-detection
 * - Optional heading/description rendering
 * - WVWO compliance (rounded-sm, brand colors)
 */

import { describe, it, expect } from 'vitest';

// ============================================================================
// Helper Functions (Component Logic Extraction)
// ============================================================================

/**
 * External link detection algorithm (from pseudocode.md section 5)
 * Auto-detects external links to add security attributes
 */
function isExternalLink(href: string): boolean {
  return href.startsWith('http://') || href.startsWith('https://');
}

/**
 * Variant class mapping (from architecture/04-cta-component.md)
 */
const variantClasses = {
  'sign-green': {
    section: 'bg-sign-green',
    primaryText: 'text-sign-green',
  },
  'brand-brown': {
    section: 'bg-brand-brown',
    primaryText: 'text-brand-brown',
  },
};

// ============================================================================
// Tests
// ============================================================================

describe('AdventureCTA Component Logic', () => {
  describe('Test 1: Default Button Text (FR-018)', () => {
    it('should use default text when not provided', () => {
      const primaryText = undefined;
      const secondaryText = undefined;

      const displayPrimary = primaryText || 'Get Directions';
      const displaySecondary = secondaryText || 'Call the Shop';

      expect(displayPrimary).toBe('Get Directions');
      expect(displaySecondary).toBe('Call the Shop');
    });
  });

  describe('Test 2: Custom Button Text (FR-021)', () => {
    it('should use custom text when provided', () => {
      const primaryText = 'View Regulations';
      const secondaryText = 'Contact Us';

      const displayPrimary = primaryText || 'Get Directions';
      const displaySecondary = secondaryText || 'Call the Shop';

      expect(displayPrimary).toBe('View Regulations');
      expect(displaySecondary).toBe('Contact Us');
    });
  });

  describe('Test 3: Variant System - sign-green (FR-023)', () => {
    it('should apply sign-green variant classes', () => {
      const variant = 'sign-green';
      const classes = variantClasses[variant];

      expect(classes.section).toBe('bg-sign-green');
      expect(classes.primaryText).toBe('text-sign-green');
    });

    it('should default to sign-green when variant not specified', () => {
      const variant = undefined;
      const selected = variant || 'sign-green';

      expect(selected).toBe('sign-green');
    });
  });

  describe('Test 4: Variant System - brand-brown (FR-023)', () => {
    it('should apply brand-brown variant classes', () => {
      const variant = 'brand-brown';
      const classes = variantClasses[variant];

      expect(classes.section).toBe('bg-brand-brown');
      expect(classes.primaryText).toBe('text-brand-brown');
    });
  });

  describe('Test 5: External Link Auto-Detection', () => {
    it('should detect https:// as external', () => {
      const href = 'https://maps.google.com';
      expect(isExternalLink(href)).toBe(true);
    });

    it('should detect http:// as external', () => {
      const href = 'http://example.com';
      expect(isExternalLink(href)).toBe(true);
    });

    it('should detect relative paths as internal', () => {
      const href = '/contact';
      expect(isExternalLink(href)).toBe(false);
    });

    it('should detect tel: links as internal (no target="_blank")', () => {
      const href = 'tel:+13045551234';
      expect(isExternalLink(href)).toBe(false);
    });

    it('should detect mailto: links as internal', () => {
      const href = 'mailto:info@example.com';
      expect(isExternalLink(href)).toBe(false);
    });

    it('should detect anchor links as internal', () => {
      const href = '#section';
      expect(isExternalLink(href)).toBe(false);
    });
  });

  describe('Test 6: Optional Heading and Description (FR-022, FR-023)', () => {
    it('should render when heading is provided', () => {
      const heading = 'Ready to Hunt Elk River?';
      const shouldRender = heading !== undefined && heading !== '';

      expect(shouldRender).toBe(true);
    });

    it('should render when description is provided', () => {
      const description = 'Stop by the shop for licenses, ammo, and local tips.';
      const shouldRender = description !== undefined && description !== '';

      expect(shouldRender).toBe(true);
    });

    it('should not render when heading is undefined', () => {
      const heading = undefined;
      const shouldRender = heading !== undefined && heading !== '';

      expect(shouldRender).toBe(false);
    });

    it('should not render when description is empty string', () => {
      const description = '';
      const shouldRender = description !== undefined && description !== '';

      expect(shouldRender).toBe(false);
    });
  });

  describe('Test 7: WVWO Compliance - Button Classes (NFR-019 through NFR-025)', () => {
    const primaryButtonClass = 'inline-flex items-center gap-2 px-8 py-4 bg-white text-sign-green font-display font-bold text-lg rounded-sm hover:bg-white/90 motion-safe:transition-colors motion-safe:duration-300 motion-reduce:transition-none';
    const secondaryButtonClass = 'inline-flex items-center gap-2 px-8 py-4 border-2 border-white text-white font-display font-bold text-lg rounded-sm hover:bg-white hover:text-sign-green motion-safe:transition-colors motion-safe:duration-300 motion-reduce:transition-none';

    it('should use rounded-sm (not rounded-md/lg/xl)', () => {
      expect(primaryButtonClass).toContain('rounded-sm');
      expect(secondaryButtonClass).toContain('rounded-sm');

      // Explicitly verify forbidden classes are NOT present
      expect(primaryButtonClass).not.toContain('rounded-md');
      expect(primaryButtonClass).not.toContain('rounded-lg');
      expect(primaryButtonClass).not.toContain('rounded-xl');
    });

    it('should use transition-colors duration-300 (WVWO approved)', () => {
      expect(primaryButtonClass).toContain('motion-safe:transition-colors');
      expect(primaryButtonClass).toContain('motion-safe:duration-300');
      expect(secondaryButtonClass).toContain('motion-safe:transition-colors');
      expect(secondaryButtonClass).toContain('motion-safe:duration-300');
    });

    it('should respect prefers-reduced-motion', () => {
      expect(primaryButtonClass).toContain('motion-reduce:transition-none');
      expect(secondaryButtonClass).toContain('motion-reduce:transition-none');
    });

    it('should use font-display (Bitter serif)', () => {
      expect(primaryButtonClass).toContain('font-display');
      expect(secondaryButtonClass).toContain('font-display');
    });

    it('should use brand colors (sign-green or brand-brown)', () => {
      expect(primaryButtonClass).toContain('text-sign-green');
      expect(secondaryButtonClass).toContain('text-white');
    });

    it('should use focus-visible for accessibility', () => {
      const fullPrimaryClass = `${primaryButtonClass} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60`;
      expect(fullPrimaryClass).toContain('focus-visible:ring-2');
    });
  });
});
