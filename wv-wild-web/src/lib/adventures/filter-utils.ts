/**
 * SPEC-07: Filter Utilities
 * Pure functions for filtering adventures (testable, no side effects)
 */

import type { Adventure, FilterState } from './filters.config';

/**
 * Filter adventures based on current filter state
 * Uses AND logic across axes, OR logic within multi-select axes
 *
 * @param adventures - Full adventure collection
 * @param filters - Current filter state
 * @returns Filtered adventures array
 */
export function filterAdventures(
  adventures: Adventure[],
  filters: FilterState
): Adventure[] {
  return adventures.filter((adventure) => {
    // ========================================================================
    // SEASON FILTER (multi-select, OR logic within axis)
    // ========================================================================
    if (filters.season.length > 0) {
      const hasMatchingSeason = adventure.data.season.some((s) =>
        filters.season.includes(s)
      );
      if (!hasMatchingSeason) return false;
    }

    // ========================================================================
    // DIFFICULTY FILTER (single-select, exact match)
    // ========================================================================
    if (filters.difficulty && adventure.data.difficulty !== filters.difficulty) {
      return false;
    }

    // ========================================================================
    // GEAR FILTER (multi-select, OR logic within axis)
    // Uses exact matching to prevent false positives (e.g., "bow" shouldn't match "rainbow")
    // ========================================================================
    if (filters.gear.length > 0 && adventure.data.gear) {
      const hasMatchingGear = adventure.data.gear.some((g) =>
        filters.gear.some((filterGear) =>
          g.toLowerCase() === filterGear.toLowerCase()
        )
      );
      if (!hasMatchingGear) return false;
    }

    // ========================================================================
    // ELEVATION FILTER (range, inclusive)
    // Only apply if adventure has elevation data
    // ========================================================================
    if (adventure.data.elevation_gain !== undefined) {
      const [min, max] = filters.elevation;
      // Only filter if NOT at full range (0-5000)
      if (min !== 0 || max !== 5000) {
        if (adventure.data.elevation_gain < min || adventure.data.elevation_gain > max) {
          return false;
        }
      }
    }

    // ========================================================================
    // SUITABILITY FILTER (multi-select, OR logic within axis)
    // Only apply if adventure has suitability data
    // ========================================================================
    if (filters.suitability.length > 0 && adventure.data.suitability) {
      const hasMatchingSuitability = adventure.data.suitability.some((s) =>
        filters.suitability.includes(s)
      );
      if (!hasMatchingSuitability) return false;
    }

    // ========================================================================
    // ALL FILTERS PASSED (AND intersection across axes)
    // ========================================================================
    return true;
  });
}

/**
 * Count active filters for mobile badge
 * Shows number next to "Filters" button
 *
 * @param filters - Current filter state
 * @returns Number of active filters
 */
export function countActiveFilters(filters: FilterState): number {
  let count = 0;

  if (filters.season.length > 0) count += filters.season.length;
  if (filters.difficulty) count += 1;
  if (filters.gear.length > 0) count += filters.gear.length;

  // Elevation counts as active if NOT at full range
  if (filters.elevation[0] !== 0 || filters.elevation[1] !== 5000) {
    count += 1;
  }

  if (filters.suitability.length > 0) count += filters.suitability.length;

  return count;
}

/**
 * Check if any filters are active
 * Used to show/hide "Clear All" button
 *
 * @param filters - Current filter state
 * @returns True if any filter is active
 */
export function hasActiveFilters(filters: FilterState): boolean {
  return countActiveFilters(filters) > 0;
}
