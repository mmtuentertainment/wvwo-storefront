/**
 * State Park Test Utilities
 * SPEC-18 Phase 5: Helper functions and mock data generators for testing
 *
 * Provides:
 * - WVWO color validators
 * - Industry safety color exception handlers
 * - Mock data generators
 * - Accessibility helpers
 */

import type {
  Cabin,
  CampingFacility,
  RangerProgram,
} from '../../types/state-park-types';
import type { StateParkTemplateProps } from '../../types/state-park-template-types';

// ============================================================================
// WVWO COLOR VALIDATORS
// ============================================================================

/**
 * WVWO brand colors (approved palette)
 */
export const WVWO_BRAND_COLORS = {
  brown: '#3E2723', // Rifle stocks, weathered barn wood
  green: '#2E7D32', // Old metal signs, forest canopy
  cream: '#FFF8E1', // Aged paper, deer hide
  orange: '#FF6F00', // Blaze orange (CTAs only, <5% of screen)
};

/**
 * Forbidden colors (SaaS startup vibes - NEVER USE)
 */
export const FORBIDDEN_COLORS = [
  '#ec4899', // Hot pink
  '#8b5cf6', // Purple
  '#06b6d4', // Cyan/turquoise
  '#a78bfa', // Light purple
  '#f472b6', // Pink
];

/**
 * Check if color is WVWO compliant.
 * Returns true if color does NOT contain forbidden colors.
 *
 * @param color - Hex color string (e.g., '#ec4899')
 * @returns true if compliant, false if forbidden
 */
export function isWVWOCompliantColor(color: string): boolean {
  const normalized = color.toLowerCase().replace(/\s/g, '');
  return !FORBIDDEN_COLORS.some((forbidden) =>
    normalized.includes(forbidden.toLowerCase())
  );
}

/**
 * Check if all colors in array are WVWO compliant.
 *
 * @param colors - Array of color strings
 * @returns true if all compliant
 */
export function areAllColorsCompliant(colors: string[]): boolean {
  return colors.every((color) => isWVWOCompliantColor(color));
}

// ============================================================================
// INDUSTRY COLOR EXCEPTION HANDLERS
// ============================================================================

/**
 * Industry standard safety colors.
 * These colors OVERRIDE WVWO brand palette for safety-critical information.
 */
export const INDUSTRY_SAFETY_COLORS = {
  /** Trail difficulty (NSAA/International standard) */
  trailDifficulty: {
    easy: '#2E7D32', // Green
    moderate: '#1976D2', // Blue
    challenging: '#B71C1C', // Red
    expert: '#000000', // Black
  },
  /** Fire danger (USFS NFDRS) */
  fireDanger: {
    low: '#2E7D32', // Green
    moderate: '#1976D2', // Blue
    high: '#FBC02D', // Yellow
    veryHigh: '#F57C00', // Orange
    extreme: '#D32F2F', // Red
  },
  /** Avalanche danger (North American Public Scale) */
  avalancheDanger: {
    low: '#2E7D32', // Green
    moderate: '#FBC02D', // Yellow
    considerable: '#F57C00', // Orange
    high: '#D32F2F', // Red
    extreme: '#000000', // Black
  },
  /** Accessibility (ADA standard) */
  accessibility: '#1976D2', // Blue (universal accessibility symbol)
  /** Water features (industry standard) */
  water: '#1976D2', // Blue
};

/**
 * Check if color is an industry safety standard color.
 * These colors are ALLOWED even if they're outside WVWO brand palette.
 *
 * @param color - Color to check
 * @returns true if this is an industry safety color
 */
export function isIndustrySafetyColor(color: string): boolean {
  const safetyColors = Object.values(INDUSTRY_SAFETY_COLORS)
    .flatMap((cat) => (typeof cat === 'object' ? Object.values(cat) : [cat]))
    .map((c) => c.toLowerCase());

  const normalized = color.toLowerCase().replace(/#/g, '');
  return safetyColors.some((safe) => normalized.includes(safe.toLowerCase().replace(/#/g, '')));
}

// ============================================================================
// MOCK DATA GENERATORS
// ============================================================================

/**
 * Create mock state park template props.
 *
 * @param overrides - Optional field overrides
 * @returns Complete StateParkTemplateProps
 */
export function createMockStatePark(
  overrides?: Partial<StateParkTemplateProps>
): StateParkTemplateProps {
  const { hero, overview, regulations, ...rest } = overrides ?? {};

  return {
    hero: {
      name: 'Test State Park',
      heroImage: '/images/test-park-hero.jpg',
      imagePosition: 'center',
      tagline: 'Family Adventure Awaits',
      acreage: 1500,
      established: 1950,
      ...hero,
    },
    overview: {
      operatingHours: {
        general: 'Dawn to Dusk',
        overnightCamping: true,
      },
      contact: {
        phone: '1-833-WV-PARKS',
        email: 'info@wvstateparks.com',
        address: '123 Park Road, TestCity, WV 26000',
      },
      managingAgency: {
        name: 'WV State Parks',
        jurisdiction: 'West Virginia',
        website: 'https://wvstateparks.com',
      },
      county: 'Test County',
      ...overview,
    },
    regulations: {
      pets: {
        allowed: true,
        leashRequired: true,
      },
      fires: {
        allowed: true,
        restrictions: ['Fire pits only', 'No ground fires'],
        firePits: true,
      },
      specialRestrictions: [],
      ...regulations,
    },
    ...rest,
  };
}

/**
 * Create mock cabin facility.
 *
 * @param overrides - Optional field overrides
 * @returns Cabin
 */
export function createMockCabin(overrides?: Partial<Cabin>): Cabin {
  return {
    cabinNumber: 'Test Cabin 1',
    name: 'Deluxe Cabin',
    bedrooms: 2,
    bathrooms: 1,
    maxOccupancy: 6,
    kitchenType: 'full',
    hasFireplace: true,
    fireplaceType: 'stone',
    petFriendly: false,
    accessible: false,
    amenities: ['WiFi', 'TV', 'Deck'],
    hasPorch: true,
    hasGrill: true,
    ...overrides,
  };
}

/**
 * Create mock campground facility.
 *
 * @param overrides - Optional field overrides
 * @returns CampingFacility
 */
export function createMockCampground(overrides?: Partial<CampingFacility>): CampingFacility {
  return {
    name: 'Main Campground',
    siteCount: 50,
    hookupTypes: ['electric', 'water'],
    bathhouse: true,
    dumpStation: true,
    accessible: true,
    accessibleSiteCount: 3,
    amenities: [],
    ...overrides,
  };
}

/**
 * Create mock ranger program.
 *
 * @param overrides - Optional field overrides
 * @returns RangerProgram
 */
export function createMockRangerProgram(overrides?: Partial<RangerProgram>): RangerProgram {
  return {
    name: 'Test Nature Walk',
    type: 'ranger_led',
    description: 'Join a park ranger for a guided nature walk',
    schedule: 'Saturdays 10:00 AM',
    duration: '2 hours',
    ageGroup: 'All ages',
    reservationRequired: false,
    accessible: true,
    ...overrides,
  };
}

// ============================================================================
// ACCESSIBILITY HELPERS
// ============================================================================

/**
 * Calculate color contrast ratio between two colors.
 * Follows WCAG 2.1 guidelines.
 *
 * @param bgColor - Background color (hex)
 * @param fgColor - Foreground color (hex)
 * @returns Contrast ratio (1-21)
 */
export function calculateContrastRatio(bgColor: string, fgColor: string): number {
  const getLuminance = (hex: string): number => {
    // Remove # if present
    hex = hex.replace('#', '');

    // Expand shorthand hex (e.g., 'FFF' -> 'FFFFFF')
    if (hex.length === 3) {
      hex = hex.split('').map((c) => c + c).join('');
    }

    // Convert to RGB
    const rgb = parseInt(hex, 16);
    const r = ((rgb >> 16) & 0xff) / 255;
    const g = ((rgb >> 8) & 0xff) / 255;
    const b = (rgb & 0xff) / 255;

    // Apply sRGB gamma correction
    const [rs, gs, bs] = [r, g, b].map((c) =>
      c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    );

    // Calculate relative luminance
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const l1 = getLuminance(bgColor);
  const l2 = getLuminance(fgColor);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if contrast ratio meets WCAG 2.1 Level AA (4.5:1).
 *
 * @param contrastRatio - Contrast ratio from calculateContrastRatio
 * @returns true if meets WCAG AA
 */
export function meetsWCAG_AA(contrastRatio: number): boolean {
  return contrastRatio >= 4.5;
}

/**
 * Check if contrast ratio meets WCAG 2.1 Level AAA (7:1).
 *
 * @param contrastRatio - Contrast ratio from calculateContrastRatio
 * @returns true if meets WCAG AAA
 */
export function meetsWCAG_AAA(contrastRatio: number): boolean {
  return contrastRatio >= 7.0;
}

/**
 * Check if contrast ratio meets WCAG large text requirements (3:1).
 * Large text = 18pt+ or 14pt+ bold.
 *
 * @param contrastRatio - Contrast ratio from calculateContrastRatio
 * @returns true if meets large text requirement
 */
export function meetsWCAG_LargeText(contrastRatio: number): boolean {
  return contrastRatio >= 3.0;
}

/**
 * Validate that all WVWO brand color combinations meet WCAG AA.
 * Tests common combinations used in the design system.
 *
 * @returns Array of all tested combinations with pass/fail status
 */
export function validateWVWOColorContrasts(): Array<{
  bg: string;
  fg: string;
  ratio: number;
  passes: boolean;
}> {
  const combinations = [
    { bg: WVWO_BRAND_COLORS.brown, fg: WVWO_BRAND_COLORS.cream }, // Dark bg, light text
    { bg: WVWO_BRAND_COLORS.green, fg: '#FFFFFF' }, // Green bg, white text
    { bg: WVWO_BRAND_COLORS.cream, fg: WVWO_BRAND_COLORS.brown }, // Light bg, dark text
    { bg: WVWO_BRAND_COLORS.orange, fg: '#FFFFFF' }, // Orange CTA, white text
  ];

  return combinations.map(({ bg, fg }) => {
    const ratio = calculateContrastRatio(bg, fg);
    const passes = meetsWCAG_AA(ratio);
    return { bg, fg, ratio, passes };
  });
}

// ============================================================================
// VALIDATION HELPERS
// ============================================================================

/**
 * Check if HTML contains forbidden CSS classes.
 * Validates WVWO compliance for rounded corners, forbidden colors, etc.
 *
 * @param html - HTML string
 * @returns Array of violations
 */
export function checkWVWOCompliance(html: string): string[] {
  const violations: string[] = [];

  // Check for forbidden border radius classes
  const forbiddenRounded = ['rounded-md', 'rounded-lg', 'rounded-xl', 'rounded-2xl', 'rounded-3xl'];
  forbiddenRounded.forEach((className) => {
    if (html.includes(className)) {
      violations.push(`FORBIDDEN: ${className} (use rounded-sm only)`);
    }
  });

  // Check for forbidden fonts
  const forbiddenFonts = ['Inter', 'Poppins', 'DM Sans', 'Space Grotesk', 'Outfit', 'Montserrat'];
  forbiddenFonts.forEach((font) => {
    if (html.includes(font)) {
      violations.push(`FORBIDDEN: ${font} font (use Bitter, Permanent Marker, or Noto Sans)`);
    }
  });

  // Check for backdrop-blur (glassmorphism)
  if (html.includes('backdrop-blur')) {
    violations.push('FORBIDDEN: backdrop-blur (glassmorphism)');
  }

  return violations;
}

/**
 * Extract all Tailwind color classes from HTML.
 *
 * @param html - HTML string
 * @returns Array of color classes found
 */
export function extractColorClasses(html: string): string[] {
  const colorPattern =
    /(?:bg|text|border)-(?:brand-brown|brand-cream|sign-green|brand-orange|blue-\d+|red-\d+|green-\d+|gray-\d+|yellow-\d+|orange-\d+|black|white)/g;
  return html.match(colorPattern) || [];
}

/**
 * Count word frequency in text.
 * Useful for validating FAQ answer lengths, descriptions, etc.
 *
 * @param text - Text to analyze
 * @returns Word count
 */
export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter((word) => word.length > 0).length;
}

/**
 * Validate FAQ answer length is acceptable (20-100 words).
 * Answers in the 40-50 word range are flagged as optimal for featured snippets.
 *
 * @param answer - FAQ answer text
 * @returns Validation result
 */
export function validateFAQAnswerLength(answer: string): {
  valid: boolean;
  wordCount: number;
  message: string;
} {
  const wordCount = countWords(answer);

  if (wordCount < 20) {
    return {
      valid: false,
      wordCount,
      message: 'Answer too short (min 20 words)',
    };
  }

  if (wordCount > 100) {
    return {
      valid: false,
      wordCount,
      message: 'Answer too long (max 100 words)',
    };
  }

  if (wordCount >= 40 && wordCount <= 50) {
    return {
      valid: true,
      wordCount,
      message: 'Optimal length for featured snippets',
    };
  }

  return {
    valid: true,
    wordCount,
    message: 'Acceptable length',
  };
}
