/**
 * Season Formatting Utility
 * Converts content collection season arrays to display strings
 *
 * @module lib/utils/season-formatter
 */

const SEASON_LABELS: Record<string, string> = {
  spring: 'Spring',
  summer: 'Summer',
  fall: 'Fall',
  winter: 'Winter',
};

const SEASON_ORDER = ['spring', 'summer', 'fall', 'winter'];

/**
 * Format season array for display.
 *
 * @param seasons - Array of season strings from content collection
 * @returns Human-readable season string
 *
 * @example
 * formatSeasonArray(['spring', 'fall']) // "Spring & Fall"
 * formatSeasonArray(['spring', 'summer']) // "Spring-Summer"
 * formatSeasonArray(['spring', 'summer', 'fall', 'winter']) // "Year-round"
 */
export function formatSeasonArray(seasons: string[]): string {
  if (!seasons || seasons.length === 0) return 'Year-round';
  if (seasons.length === 4) return 'Year-round';

  // Sort by natural season order
  const sorted = [...seasons].sort(
    (a, b) => SEASON_ORDER.indexOf(a) - SEASON_ORDER.indexOf(b)
  );

  // Check for consecutive seasons
  if (sorted.length === 2) {
    const [first, second] = sorted;
    const firstIdx = SEASON_ORDER.indexOf(first);
    const secondIdx = SEASON_ORDER.indexOf(second);

    // If consecutive, use hyphen (Spring-Summer)
    if (secondIdx - firstIdx === 1) {
      return `${SEASON_LABELS[first]}-${SEASON_LABELS[second]}`;
    }
    // If not consecutive, use ampersand (Spring & Fall)
    return `${SEASON_LABELS[first]} & ${SEASON_LABELS[second]}`;
  }

  // Three seasons
  if (sorted.length === 3) {
    const labels = sorted.map((s) => SEASON_LABELS[s]);
    return `${labels.slice(0, -1).join(', ')} & ${labels[labels.length - 1]}`;
  }

  return sorted.map((s) => SEASON_LABELS[s]).join(', ');
}
