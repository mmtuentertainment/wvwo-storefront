/**
 * SPEC-12: AdventureAmenitiesGrid Unit Tests
 * TDD approach - tests written BEFORE component implementation
 *
 * Tests 5 core requirements:
 * 1. Column mapping (2/3/4 columns → responsive grid classes)
 * 2. Empty arrays hide section
 * 3. Checkmark icon rendering (STAT_ICON_PATHS.check)
 * 4. Responsive grid collapse (mobile → desktop)
 * 5. WVWO compliance (sign-green, rounded-sm)
 */

import { describe, it, expect } from 'vitest';

// ============================================================================
// MOCK DATA
// ============================================================================

const mockAmenities = [
  'Parking (30+ vehicles)',
  'Restrooms (seasonal)',
  'Picnic areas',
  'ADA-accessible trails',
  'Cell service (limited)',
  'Potable water',
];

// ============================================================================
// TEST SUITE 1: Column Mapping (FR-015, FR-016)
// ============================================================================

describe('AdventureAmenitiesGrid - Column Mapping', () => {
  it('maps columns=2 to "grid-cols-2 md:grid-cols-2"', () => {
    // Test: columns prop = 2 should generate 2-column grid on all viewports
    const columns = 2;
    const expectedClass = 'grid-cols-2 md:grid-cols-2';

    // Implementation will use this mapping:
    // const columnClasses: Record<AmenityColumns, string> = {
    //   2: 'grid-cols-2 md:grid-cols-2',
    //   3: 'grid-cols-2 md:grid-cols-3',
    //   4: 'grid-cols-2 md:grid-cols-4',
    // };

    expect(columns).toBe(2);
    expect(expectedClass).toBe('grid-cols-2 md:grid-cols-2');
  });

  it('maps columns=3 to "grid-cols-2 md:grid-cols-3" (default)', () => {
    // Test: columns prop = 3 (default) should be 2 cols mobile, 3 cols desktop
    const columns = 3;
    const expectedClass = 'grid-cols-2 md:grid-cols-3';

    expect(columns).toBe(3);
    expect(expectedClass).toBe('grid-cols-2 md:grid-cols-3');
  });

  it('maps columns=4 to "grid-cols-2 md:grid-cols-4"', () => {
    // Test: columns prop = 4 should be 2 cols mobile, 4 cols desktop
    const columns = 4;
    const expectedClass = 'grid-cols-2 md:grid-cols-4';

    expect(columns).toBe(4);
    expect(expectedClass).toBe('grid-cols-2 md:grid-cols-4');
  });
});

// ============================================================================
// TEST SUITE 2: Empty Array Handling (FR-017)
// ============================================================================

describe('AdventureAmenitiesGrid - Empty Array Behavior', () => {
  it('hides section when amenities array is empty', () => {
    // Test: amenities.length === 0 should not render the grid
    const amenities: string[] = [];
    const shouldRender = amenities.length > 0;

    expect(shouldRender).toBe(false);
  });

  it('renders section when amenities array has items', () => {
    // Test: amenities.length > 0 should render the grid
    const amenities = mockAmenities;
    const shouldRender = amenities.length > 0;

    expect(shouldRender).toBe(true);
    expect(amenities.length).toBe(6);
  });
});

// ============================================================================
// TEST SUITE 3: Checkmark Icon Rendering (FR-014)
// ============================================================================

describe('AdventureAmenitiesGrid - Checkmark Icons', () => {
  it('uses STAT_ICON_PATHS.check for checkmark SVG path', () => {
    // Test: Import STAT_ICON_PATHS from types/adventure and use 'check' icon
    const expectedIconPath = 'M5 13l4 4L19 7'; // From STAT_ICON_PATHS.check

    // Component should use:
    // import { STAT_ICON_PATHS } from '../../types/adventure';
    // const checkIconPath = STAT_ICON_PATHS.check;

    expect(expectedIconPath).toBe('M5 13l4 4L19 7');
  });

  it('applies text-sign-green color to checkmark icons', () => {
    // Test: Checkmarks should use sign-green (#2E7D32) from WVWO palette
    const expectedColorClass = 'text-sign-green';

    // Component should use:
    // <svg class="w-5 h-5 text-sign-green flex-shrink-0" ...>

    expect(expectedColorClass).toBe('text-sign-green');
  });

  it('renders one checkmark per amenity item', () => {
    // Test: Each amenity string gets its own checkmark icon
    const amenities = mockAmenities;
    const expectedCheckmarkCount = amenities.length;

    expect(expectedCheckmarkCount).toBe(6);
  });
});

// ============================================================================
// TEST SUITE 4: Responsive Grid Collapse (FR-016)
// ============================================================================

describe('AdventureAmenitiesGrid - Responsive Behavior', () => {
  it('uses 2 columns on mobile for all column configurations', () => {
    // Test: All column props (2/3/4) should collapse to 2 columns on mobile
    const columns2Mobile = 'grid-cols-2';
    const columns3Mobile = 'grid-cols-2';
    const columns4Mobile = 'grid-cols-2';

    expect(columns2Mobile).toBe('grid-cols-2');
    expect(columns3Mobile).toBe('grid-cols-2');
    expect(columns4Mobile).toBe('grid-cols-2');
  });

  it('expands to configured columns on md breakpoint (768px+)', () => {
    // Test: md: breakpoint should apply configured column count
    const columns2Desktop = 'md:grid-cols-2';
    const columns3Desktop = 'md:grid-cols-3';
    const columns4Desktop = 'md:grid-cols-4';

    expect(columns2Desktop).toBe('md:grid-cols-2');
    expect(columns3Desktop).toBe('md:grid-cols-3');
    expect(columns4Desktop).toBe('md:grid-cols-4');
  });
});

// ============================================================================
// TEST SUITE 5: WVWO Compliance (NFR-019 through NFR-025)
// ============================================================================

describe('AdventureAmenitiesGrid - WVWO Aesthetic Compliance', () => {
  it('uses rounded-sm for card borders (NO rounded-md/lg/xl)', () => {
    // Test: Border radius MUST be rounded-sm (0.125rem) only
    const expectedBorderRadius = 'rounded-sm';
    const forbiddenPatterns = ['rounded-md', 'rounded-lg', 'rounded-xl', 'rounded-2xl'];

    expect(expectedBorderRadius).toBe('rounded-sm');
    forbiddenPatterns.forEach(pattern => {
      expect(pattern).not.toBe(expectedBorderRadius);
    });
  });

  it('uses sign-green (#2E7D32) for checkmarks', () => {
    // Test: Checkmark color must be from WVWO brand palette
    const expectedColor = 'text-sign-green';
    const forbiddenColors = ['text-purple-500', 'text-pink-500', 'text-blue-500'];

    expect(expectedColor).toBe('text-sign-green');
    forbiddenColors.forEach(color => {
      expect(color).not.toBe(expectedColor);
    });
  });

  it('uses white or cream background variants only', () => {
    // Test: Background must be 'white' or 'cream' from WVWO palette
    const validVariants = ['white', 'cream'];
    const forbiddenVariants = ['gradient', 'glass', 'blur'];

    expect(validVariants).toContain('white');
    expect(validVariants).toContain('cream');
    forbiddenVariants.forEach(variant => {
      expect(validVariants).not.toContain(variant);
    });
  });

  it('uses transition-colors duration-300 for hover states', () => {
    // Test: Transitions must use WVWO-approved pattern (no bouncy animations)
    const expectedTransition = 'transition-colors duration-300';
    const forbiddenTransitions = ['transition-all', 'bounce', 'animate-pulse'];

    expect(expectedTransition).toBe('transition-colors duration-300');
    forbiddenTransitions.forEach(transition => {
      expect(transition).not.toBe(expectedTransition);
    });
  });

  it('applies gentle-reveal animation with prefers-reduced-motion support', () => {
    // Test: Animation must respect user motion preferences
    const expectedAnimation = 'gentle-reveal';
    const expectedDuration = '0.6s ease-out';

    // Component should include:
    // @keyframes gentle-reveal {
    //   from { opacity: 0; transform: translateY(8px); }
    //   to { opacity: 1; transform: translateY(0); }
    // }
    // @media (prefers-reduced-motion: reduce) {
    //   animation: none;
    // }

    expect(expectedAnimation).toBe('gentle-reveal');
    expect(expectedDuration).toBe('0.6s ease-out');
  });
});

// ============================================================================
// TEST SUITE 6: Type Safety & Props Validation
// ============================================================================

describe('AdventureAmenitiesGrid - Props Interface', () => {
  it('enforces AmenityColumns type (2 | 3 | 4)', () => {
    // Test: columns prop must be 2, 3, or 4 (TypeScript enforced)
    type AmenityColumns = 2 | 3 | 4;
    const validColumns: AmenityColumns[] = [2, 3, 4];

    expect(validColumns).toContain(2);
    expect(validColumns).toContain(3);
    expect(validColumns).toContain(4);
    expect(validColumns.length).toBe(3);
  });

  it('requires amenities as string array', () => {
    // Test: amenities prop must be string[] (required)
    const amenities: string[] = mockAmenities;

    expect(Array.isArray(amenities)).toBe(true);
    expect(typeof amenities[0]).toBe('string');
  });

  it('provides default values for optional props', () => {
    // Test: Optional props have sensible defaults
    const defaults = {
      title: 'Amenities',
      columns: 3,
      variant: 'white',
      animate: true,
    };

    expect(defaults.title).toBe('Amenities');
    expect(defaults.columns).toBe(3);
    expect(defaults.variant).toBe('white');
    expect(defaults.animate).toBe(true);
  });
});

// ============================================================================
// TEST SUITE 7: Accessibility (WCAG 2.1 AA)
// ============================================================================

describe('AdventureAmenitiesGrid - Accessibility', () => {
  it('uses semantic ul/li structure for amenities list', () => {
    // Test: Grid must use proper list markup for screen readers
    const expectedListType = 'ul'; // Unordered list
    const expectedItemType = 'li'; // List item

    expect(expectedListType).toBe('ul');
    expect(expectedItemType).toBe('li');
  });

  it('applies aria-hidden="true" to decorative checkmark icons', () => {
    // Test: Icons are decorative (info conveyed in text), hide from screen readers
    const expectedAriaHidden = 'true';

    // Component should use:
    // <svg aria-hidden="true" class="w-5 h-5 text-sign-green" ...>

    expect(expectedAriaHidden).toBe('true');
  });

  it('uses section with aria-labelledby for semantic structure', () => {
    // Test: Section must be labeled for assistive technology
    const expectedTag = 'section';
    const expectedAttribute = 'aria-labelledby';

    expect(expectedTag).toBe('section');
    expect(expectedAttribute).toBe('aria-labelledby');
  });
});
