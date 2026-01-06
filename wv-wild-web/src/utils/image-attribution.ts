/**
 * Image Attribution Utilities for SPEC-19 Historic Site Template
 *
 * Handles formatting, validation, and placement of public domain image credits
 * from Library of Congress, National Archives, and WV State Archives.
 */

/**
 * Format attribution credit string for display
 * @param source - Archive source (e.g., "Library of Congress", "National Archives")
 * @param catalogNumber - Catalog/reference number
 * @returns Formatted attribution string
 *
 * @example
 * formatAttributionCredit("Library of Congress", "LC-DIG-highsm-12345")
 * // Returns: "Photo: Library of Congress, LC-DIG-highsm-12345"
 */
export function formatAttributionCredit(source: string, catalogNumber: string): string {
  return `Photo: ${source}, ${catalogNumber}`;
}

/**
 * Determine optimal attribution placement based on image type
 * @param imageType - Type of image context
 * @returns Placement strategy
 *
 * @example
 * getAttributionPlacement("hero") // Returns: "overlay"
 * getAttributionPlacement("structure") // Returns: "caption"
 */
export function getAttributionPlacement(
  imageType: 'hero' | 'structure' | 'inline'
): 'overlay' | 'caption' {
  // Hero images use overlay (bottom-right corner)
  // Structure and inline images use caption (below image) for more space
  return imageType === 'hero' ? 'overlay' : 'caption';
}

/**
 * Generate accessible ARIA label for attribution text
 * @param credit - Full attribution credit string
 * @returns ARIA label text
 */
export function generateAttributionAria(credit: string): string {
  return `Image credit: ${credit}`;
}

/**
 * Validate attribution format matches expected pattern
 * @param credit - Attribution string to validate
 * @returns True if format is valid
 *
 * @example
 * validateAttributionFormat("Photo: Library of Congress, LC-DIG-highsm-12345") // true
 * validateAttributionFormat("Random text") // false
 */
export function validateAttributionFormat(credit: string): boolean {
  // Expected format: "Photo: {source}, {catalogNumber}"
  const pattern = /^Photo:\s+[^,]+,\s+[A-Za-z0-9\-]+$/;
  return pattern.test(credit);
}

/**
 * Common archive source examples for reference
 */
export const ARCHIVE_SOURCES = {
  LOC: 'Library of Congress',
  NARA: 'National Archives',
  WVSA: 'WV State Archives',
  WVU: 'West Virginia & Regional History Center'
} as const;

/**
 * Example catalog number patterns by source
 */
export const CATALOG_PATTERNS = {
  LOC: 'LC-DIG-highsm-XXXXX or LC-USZ62-XXXXX',
  NARA: 'NARA-XXXXXX or RG-XXX-XXXX',
  WVSA: 'WVSA-XXXX or AR-XXXX',
  WVU: 'A&M-XXXX or WVRHC-XXXX'
} as const;
