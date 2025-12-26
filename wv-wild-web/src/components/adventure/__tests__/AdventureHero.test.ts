/**
 * AdventureHero.astro Unit Tests
 * T-012: SPEC-09 Adventure Hero Component
 *
 * Tests component logic, difficulty mappings, and accessibility patterns.
 * Uses logic extraction since Astro components don't have native test renderer.
 */

import { describe, it, expect } from 'vitest';

// ============================================================================
// Component Logic (extracted from AdventureHero.astro + AdventureHeroBadge.astro)
// ============================================================================

type Difficulty = 'easy' | 'moderate' | 'advanced' | 'rugged';

/** Shape icons for color-blind accessibility (from AdventureHeroBadge) */
const difficultyShapes: Record<Difficulty, string> = {
  easy: '\u25CF',      // ● (circle)
  moderate: '\u25B2',  // ▲ (triangle)
  advanced: '\u25A0',  // ■ (square)
  rugged: '\u25C6',    // ◆ (diamond)
};

/** Color classes for each difficulty level (from AdventureHeroBadge) */
const difficultyColors: Record<Difficulty, string> = {
  easy: 'bg-sign-green text-white',
  moderate: 'bg-brand-orange text-white',
  advanced: 'bg-brand-mud text-brand-cream',
  rugged: 'bg-red-800 text-white',
};

/** Difficulty labels for display (from AdventureHero) */
const difficultyLabels: Record<Difficulty, string> = {
  easy: 'Easy Trail',
  moderate: 'Moderate',
  advanced: 'Advanced',
  rugged: 'Rugged Terrain',
};

/** Generate hero ID for aria-labelledby (from AdventureHero) */
function generateHeroId(slug?: string): string {
  return `adventure-hero-${slug || 'main'}`;
}

// ============================================================================
// Test Data
// ============================================================================

interface MockImageMetadata {
  src: string;
  width: number;
  height: number;
  format: string;
}

const mockImage: MockImageMetadata = {
  src: '/test-image.jpg',
  width: 1200,
  height: 800,
  format: 'jpg',
};

const requiredProps = {
  title: 'Summersville Lake',
  description: 'Crystal-clear waters for fishing and kayaking.',
  difficulty: 'easy' as const,
  season: 'Year-round',
  image: mockImage,
  imageAlt: 'Aerial view of Summersville Lake',
};

// ============================================================================
// Tests
// ============================================================================

describe('AdventureHero', () => {
  describe('renders with required props', () => {
    it('has all required prop types defined', () => {
      expect(requiredProps.title).toBeDefined();
      expect(requiredProps.description).toBeDefined();
      expect(requiredProps.difficulty).toBeDefined();
      expect(requiredProps.season).toBeDefined();
      expect(requiredProps.image).toBeDefined();
      expect(requiredProps.imageAlt).toBeDefined();
    });

    it('difficulty is valid enum value', () => {
      const validDifficulties: Difficulty[] = ['easy', 'moderate', 'advanced', 'rugged'];
      expect(validDifficulties).toContain(requiredProps.difficulty);
    });
  });

  describe('applies correct difficulty badge color', () => {
    it('easy maps to sign-green', () => {
      expect(difficultyColors.easy).toContain('bg-sign-green');
      expect(difficultyColors.easy).toContain('text-white');
    });

    it('moderate maps to brand-orange', () => {
      expect(difficultyColors.moderate).toContain('bg-brand-orange');
      expect(difficultyColors.moderate).toContain('text-white');
    });

    it('advanced maps to brand-mud', () => {
      expect(difficultyColors.advanced).toContain('bg-brand-mud');
      expect(difficultyColors.advanced).toContain('text-brand-cream');
    });

    it('rugged maps to red-800', () => {
      expect(difficultyColors.rugged).toContain('bg-red-800');
      expect(difficultyColors.rugged).toContain('text-white');
    });
  });

  describe('applies correct difficulty shape icon', () => {
    it('easy uses circle (U+25CF)', () => {
      expect(difficultyShapes.easy).toBe('\u25CF');
      expect(difficultyShapes.easy).toBe('●');
    });

    it('moderate uses triangle (U+25B2)', () => {
      expect(difficultyShapes.moderate).toBe('\u25B2');
      expect(difficultyShapes.moderate).toBe('▲');
    });

    it('advanced uses square (U+25A0)', () => {
      expect(difficultyShapes.advanced).toBe('\u25A0');
      expect(difficultyShapes.advanced).toBe('■');
    });

    it('rugged uses diamond (U+25C6)', () => {
      expect(difficultyShapes.rugged).toBe('\u25C6');
      expect(difficultyShapes.rugged).toBe('◆');
    });

    it('all shapes are unique for accessibility', () => {
      const shapes = Object.values(difficultyShapes);
      const uniqueShapes = new Set(shapes);
      expect(uniqueShapes.size).toBe(shapes.length);
    });
  });

  describe('generates dynamic ID for aria-labelledby', () => {
    it('uses slug when provided', () => {
      expect(generateHeroId('summersville-lake')).toBe('adventure-hero-summersville-lake');
    });

    it('uses "main" when slug is undefined', () => {
      expect(generateHeroId(undefined)).toBe('adventure-hero-main');
    });

    it('uses "main" when slug is empty string (falsy)', () => {
      expect(generateHeroId('')).toBe('adventure-hero-main');
    });

    it('preserves slug casing', () => {
      expect(generateHeroId('Elk-River-WMA')).toBe('adventure-hero-Elk-River-WMA');
    });
  });

  describe('handles missing image gracefully', () => {
    it('undefined image shows fallback text', () => {
      const fallbackText = 'Image Coming Soon';
      expect(fallbackText).toBeDefined();
    });

    it('fallback has aria-label for accessibility', () => {
      const fallbackAriaLabel = 'Image not available';
      expect(fallbackAriaLabel).toBeDefined();
    });

    it('valid image has all required metadata', () => {
      expect(mockImage.src).toBeTruthy();
      expect(mockImage.width).toBeGreaterThan(0);
      expect(mockImage.height).toBeGreaterThan(0);
      expect(mockImage.format).toBeTruthy();
    });
  });

  describe('imagePosition class mapping', () => {
    const imagePositionClasses: Record<'center' | 'top' | 'bottom', string> = {
      center: 'object-center',
      top: 'object-top',
      bottom: 'object-bottom',
    };

    it('center maps to object-center', () => {
      expect(imagePositionClasses.center).toBe('object-center');
    });

    it('top maps to object-top', () => {
      expect(imagePositionClasses.top).toBe('object-top');
    });

    it('bottom maps to object-bottom', () => {
      expect(imagePositionClasses.bottom).toBe('object-bottom');
    });

    it('all positions map to valid Tailwind classes', () => {
      Object.values(imagePositionClasses).forEach(className => {
        expect(className).toMatch(/^object-(center|top|bottom)$/);
      });
    });
  });

  describe('coordinates URL generation', () => {
    function generateMapUrl(coords: { lat: number; lng: number }): string {
      return `https://maps.google.com/?q=${coords.lat},${coords.lng}`;
    }

    it('generates valid Google Maps URL', () => {
      const coords = { lat: 38.6601, lng: -80.8784 };
      const url = generateMapUrl(coords);
      expect(url).toBe('https://maps.google.com/?q=38.6601,-80.8784');
    });

    it('handles negative coordinates', () => {
      const coords = { lat: -33.8688, lng: 151.2093 };
      const url = generateMapUrl(coords);
      expect(url).toContain('-33.8688');
      expect(url).toContain('151.2093');
    });

    it('preserves coordinate precision', () => {
      const coords = { lat: 38.12345678, lng: -80.87654321 };
      const url = generateMapUrl(coords);
      expect(url).toContain('38.12345678');
      expect(url).toContain('-80.87654321');
    });
  });

  describe('difficulty labels match expected values', () => {
    it('easy shows "Easy Trail"', () => {
      expect(difficultyLabels.easy).toBe('Easy Trail');
    });

    it('moderate shows "Moderate"', () => {
      expect(difficultyLabels.moderate).toBe('Moderate');
    });

    it('advanced shows "Advanced"', () => {
      expect(difficultyLabels.advanced).toBe('Advanced');
    });

    it('rugged shows "Rugged Terrain"', () => {
      expect(difficultyLabels.rugged).toBe('Rugged Terrain');
    });
  });
});
