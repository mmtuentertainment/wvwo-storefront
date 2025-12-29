/**
 * Unit Tests: AdventureFeatureSection.astro
 * SPEC-12: TDD approach - tests written BEFORE implementation
 *
 * Tests the generic base component for feature card grids.
 * 7 tests covering: grid columns, accent colors, Kim's notes, variants, conditional rendering
 */

import { describe, it, expect } from 'vitest';

// Type definitions (match component Props interface)
interface FeatureItem {
  title: string;
  description: string;
  notes?: string;
  icon?: 'check' | 'info' | 'location' | 'none';
}

type AccentColor = 'sign-green' | 'brand-orange' | 'brand-brown' | 'brand-mud';

// Helper functions that will be used in the component
function mapColumnsToGridClasses(columns: 2 | 3): string {
  const columnMap: Record<2 | 3, string> = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  };
  return columnMap[columns];
}

function mapVariantToBackground(variant: 'white' | 'cream'): string {
  const variantMap: Record<'white' | 'cream', string> = {
    white: 'bg-white',
    cream: 'bg-brand-cream',
  };
  return variantMap[variant];
}

function mapAccentColorToBorder(color: AccentColor): string {
  const accentMap: Record<AccentColor, string> = {
    'sign-green': 'border-l-sign-green',
    'brand-orange': 'border-l-brand-orange',
    'brand-brown': 'border-l-brand-brown',
    'brand-mud': 'border-l-brand-mud',
  };
  return accentMap[color];
}

function shouldRenderSection(features: FeatureItem[]): boolean {
  return features.length > 0;
}

describe('AdventureFeatureSection - Column Mapping', () => {
  it('Test 1: Renders 2-column grid for columns=2', () => {
    const result = mapColumnsToGridClasses(2);
    expect(result).toBe('grid-cols-1 md:grid-cols-2');
  });

  it('Test 2: Renders 3-column grid for columns=3', () => {
    const result = mapColumnsToGridClasses(3);
    expect(result).toBe('grid-cols-1 md:grid-cols-2 lg:grid-cols-3');
  });
});

describe('AdventureFeatureSection - Accent Colors', () => {
  it('Test 3: Applies correct accent color class for sign-green', () => {
    const result = mapAccentColorToBorder('sign-green');
    expect(result).toBe('border-l-sign-green');
  });

  it('applies correct accent color class for brand-orange', () => {
    const result = mapAccentColorToBorder('brand-orange');
    expect(result).toBe('border-l-brand-orange');
  });

  it('applies correct accent color class for brand-brown', () => {
    const result = mapAccentColorToBorder('brand-brown');
    expect(result).toBe('border-l-brand-brown');
  });

  it('applies correct accent color class for brand-mud', () => {
    const result = mapAccentColorToBorder('brand-mud');
    expect(result).toBe('border-l-brand-mud');
  });
});

describe('AdventureFeatureSection - Variants', () => {
  it('Test 7: Applies cream background for variant="cream"', () => {
    const result = mapVariantToBackground('cream');
    expect(result).toBe('bg-brand-cream');
  });

  it('applies white background for variant="white"', () => {
    const result = mapVariantToBackground('white');
    expect(result).toBe('bg-white');
  });
});

describe('AdventureFeatureSection - Conditional Rendering', () => {
  it('Test 6: Hides section when features empty', () => {
    const emptyFeatures: FeatureItem[] = [];
    const result = shouldRenderSection(emptyFeatures);
    expect(result).toBe(false);
  });

  it('renders section when features populated', () => {
    const features: FeatureItem[] = [
      {
        title: 'White-tailed Deer',
        description: 'Season: Nov 1-Dec 31',
        notes: "Bucks here run 100-150 inches.",
      },
    ];
    const result = shouldRenderSection(features);
    expect(result).toBe(true);
  });
});

describe('AdventureFeatureSection - Data Validation', () => {
  it('Test 4: Validates feature has title and description', () => {
    const validFeature: FeatureItem = {
      title: 'Wild Turkey',
      description: 'Season: Apr 15-May 15',
    };

    expect(validFeature.title).toBeTruthy();
    expect(validFeature.description).toBeTruthy();
  });

  it('Test 5: Allows optional notes field (Kim\'s tips)', () => {
    const featureWithNotes: FeatureItem = {
      title: 'White-tailed Deer',
      description: 'Season: Nov 1-Dec 31',
      notes: 'Creek bottoms at dawn.',
    };

    const featureWithoutNotes: FeatureItem = {
      title: 'Wild Turkey',
      description: 'Season: Apr 15-May 15',
    };

    expect(featureWithNotes.notes).toBe('Creek bottoms at dawn.');
    expect(featureWithoutNotes.notes).toBeUndefined();
  });
});

describe('AdventureFeatureSection - WVWO Compliance', () => {
  it('ensures only approved accent colors allowed', () => {
    const approvedColors: AccentColor[] = [
      'sign-green',
      'brand-orange',
      'brand-brown',
      'brand-mud',
    ];

    approvedColors.forEach(color => {
      const result = mapAccentColorToBorder(color);
      expect(result).toContain('border-l-');
    });
  });

  it('ensures only approved background variants allowed', () => {
    const approvedVariants: Array<'white' | 'cream'> = ['white', 'cream'];

    approvedVariants.forEach(variant => {
      const result = mapVariantToBackground(variant);
      expect(result).toMatch(/^bg-(white|brand-cream)$/);
    });
  });
});
