/**
 * SPEC-19: Image Attribution Utilities
 * Helpers for formatting and placing image credits
 */

/**
 * Format attribution credit line
 * @param source - Image source (e.g., "Library of Congress", "National Archives")
 * @param catalogNumber - Catalog/collection number (e.g., "LC-DIG-cwpb-12345")
 * @returns Formatted credit string
 */
export function formatAttributionCredit(source: string, catalogNumber: string): string {
  return `Photo: ${source}, ${catalogNumber}`;
}

/**
 * Determine attribution placement strategy
 * @param imageType - Type of image ("hero", "structure", "exhibit", "thumbnail")
 * @returns Placement strategy ("overlay" or "caption")
 */
export function getAttributionPlacement(imageType: 'hero' | 'structure' | 'exhibit' | 'thumbnail'): 'overlay' | 'caption' {
  switch (imageType) {
    case 'hero':
    case 'thumbnail':
      return 'overlay'; // Bottom-right overlay for space efficiency
    case 'structure':
    case 'exhibit':
      return 'caption'; // Caption below for longer credit lines
    default:
      return 'caption';
  }
}

/**
 * Generate ARIA label for attribution
 * @param credit - Full credit string
 * @returns ARIA label for screen readers
 */
export function generateAttributionAria(credit: string): string {
  return `Image credit: ${credit}`;
}

/**
 * Validate attribution credit format
 * @param credit - Credit string to validate
 * @returns True if valid format (includes source and catalog number)
 */
export function validateAttribution(credit: string): boolean {
  // Check for "Photo: [Source], [Catalog]" pattern
  const pattern = /^Photo:\s+.+,\s+.+$/;
  return pattern.test(credit);
}

/**
 * Parse attribution into components
 * @param credit - Full credit string
 * @returns Object with source and catalogNumber
 */
export function parseAttribution(credit: string): { source: string; catalogNumber: string } | null {
  const match = credit.match(/^Photo:\s+(.+),\s+(.+)$/);
  if (!match) return null;

  return {
    source: match[1].trim(),
    catalogNumber: match[2].trim(),
  };
}
