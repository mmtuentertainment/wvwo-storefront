/**
 * Historic site slug normalization utilities.
 * Used by [slug].astro to map content slugs to data file slugs.
 */

/**
 * Normalize content slug to data file slug.
 * Strips "-battlefield" suffix used in content collection entries
 * to match data file naming (e.g., "carnifex-ferry-battlefield" → "carnifex-ferry").
 */
export function toDataSlug(contentSlug: string): string {
  return contentSlug.replace(/-battlefield$/, '');
}
