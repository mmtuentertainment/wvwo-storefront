/**
 * SPEC-07: Filter Utilities Unit Tests
 * Tests for filterAdventures() and countActiveFilters()
 */

import { describe, it, expect } from 'vitest';
import { filterAdventures, countActiveFilters, hasActiveFilters } from '../../src/lib/adventures/filter-utils';
import type { Adventure, FilterState } from '../../src/lib/adventures/filters.config';
import { INITIAL_FILTER_STATE } from '../../src/lib/adventures/filters.config';

// ============================================================================
// MOCK DATA
// ============================================================================

const mockAdventures: Adventure[] = [
  {
    id: 'spring-turkey-burnsville',
    slug: 'spring-turkey-burnsville',
    data: {
      title: 'Spring Turkey at Burnsville',
      description: 'Prime gobbler ground',
      season: ['spring'],
      difficulty: 'moderate',
      location: 'Burnsville Lake WMA',
      gear: ['turkey vest', 'box call'],
      elevation_gain: 1450,
      suitability: ['dog-friendly'],
    },
  } as Adventure,
  {
    id: 'fall-deer-elk-river',
    slug: 'fall-deer-elk-river',
    data: {
      title: 'Fall Deer at Elk River',
      description: 'Mature hardwoods',
      season: ['fall'],
      difficulty: 'challenging',
      location: 'Elk River WMA',
      gear: ['compound bow', 'tree stand'],
      elevation_gain: 2100,
      suitability: [],
    },
  } as Adventure,
  {
    id: 'summer-fishing-sutton',
    slug: 'summer-fishing-sutton',
    data: {
      title: 'Summer Fishing at Sutton Lake',
      description: 'Bass and catfish',
      season: ['summer'],
      difficulty: 'easy',
      location: 'Sutton Lake',
      gear: ['fishing rod', 'tackle box'],
      elevation_gain: 200,
      suitability: ['kid-friendly', 'wheelchair-accessible', 'paved'],
    },
  } as Adventure,
  {
    id: 'year-round-blackwater',
    slug: 'year-round-blackwater',
    data: {
      title: 'Blackwater Falls Overlook',
      description: 'Iconic waterfall',
      season: ['spring', 'summer', 'fall', 'winter'],
      difficulty: 'easy',
      location: 'Blackwater Falls State Park',
      gear: ['camera', 'binoculars'],
      elevation_gain: 50,
      suitability: ['kid-friendly', 'wheelchair-accessible', 'paved'],
    },
  } as Adventure,
];

// ============================================================================
// FILTER ADVENTURES TESTS
// ============================================================================

describe('filterAdventures', () => {
  // ==========================================================================
  // NO FILTERS (baseline)
  // ==========================================================================
  it('returns all adventures when no filters applied', () => {
    const result = filterAdventures(mockAdventures, INITIAL_FILTER_STATE);
    expect(result).toHaveLength(4);
  });

  // ==========================================================================
  // SEASON FILTER (multi-select, OR logic)
  // ==========================================================================
  it('filters by single season', () => {
    const filters: FilterState = {
      ...INITIAL_FILTER_STATE,
      season: ['fall'],
    };
    const result = filterAdventures(mockAdventures, filters);
    expect(result).toHaveLength(2); // fall-deer + year-round
    expect(result.every((a) => a.data.season.includes('fall'))).toBe(true);
  });

  it('filters by multiple seasons (OR logic)', () => {
    const filters: FilterState = {
      ...INITIAL_FILTER_STATE,
      season: ['spring', 'summer'],
    };
    const result = filterAdventures(mockAdventures, filters);
    expect(result).toHaveLength(3); // spring-turkey + summer-fishing + year-round
  });

  // ==========================================================================
  // DIFFICULTY FILTER (single-select, exact match)
  // ==========================================================================
  it('filters by difficulty (exact match)', () => {
    const filters: FilterState = {
      ...INITIAL_FILTER_STATE,
      difficulty: 'easy',
    };
    const result = filterAdventures(mockAdventures, filters);
    expect(result).toHaveLength(2); // summer-fishing + blackwater
    expect(result.every((a) => a.data.difficulty === 'easy')).toBe(true);
  });

  // ==========================================================================
  // GEAR FILTER (multi-select, OR logic)
  // ==========================================================================
  it('filters by single gear type', () => {
    const filters: FilterState = {
      ...INITIAL_FILTER_STATE,
      gear: ['fishing rod'],
    };
    const result = filterAdventures(mockAdventures, filters);
    expect(result).toHaveLength(1); // summer-fishing
  });

  it('filters by multiple gear types (OR logic)', () => {
    const filters: FilterState = {
      ...INITIAL_FILTER_STATE,
      gear: ['turkey vest', 'compound bow'],
    };
    const result = filterAdventures(mockAdventures, filters);
    expect(result).toHaveLength(2); // spring-turkey + fall-deer
  });

  // ==========================================================================
  // ELEVATION FILTER (range, min-max inclusive)
  // ==========================================================================
  it('filters by elevation range', () => {
    const filters: FilterState = {
      ...INITIAL_FILTER_STATE,
      elevation: [500, 2000],
    };
    const result = filterAdventures(mockAdventures, filters);
    expect(result).toHaveLength(1); // Only spring-turkey (1450 ft)
    expect(result[0].data.elevation_gain).toBeGreaterThanOrEqual(500);
    expect(result[0].data.elevation_gain!).toBeLessThanOrEqual(2000);
  });

  it('elevation at full range returns all (no filter applied)', () => {
    const filters: FilterState = {
      ...INITIAL_FILTER_STATE,
      elevation: [0, 5000],
    };
    const result = filterAdventures(mockAdventures, filters);
    expect(result).toHaveLength(4); // All adventures (full range = no filter)
  });

  // ==========================================================================
  // SUITABILITY FILTER (multi-select, OR logic)
  // ==========================================================================
  it('filters by single suitability flag', () => {
    const filters: FilterState = {
      ...INITIAL_FILTER_STATE,
      suitability: ['wheelchair-accessible'],
    };
    const result = filterAdventures(mockAdventures, filters);
    expect(result).toHaveLength(2); // summer-fishing + blackwater
  });

  it('filters by multiple suitability flags (OR logic)', () => {
    const filters: FilterState = {
      ...INITIAL_FILTER_STATE,
      suitability: ['dog-friendly', 'kid-friendly'],
    };
    const result = filterAdventures(mockAdventures, filters);
    expect(result).toHaveLength(3); // spring-turkey (dog) + summer-fishing (kid) + blackwater (kid)
  });

  // ==========================================================================
  // COMBINED FILTERS (AND intersection across axes)
  // ==========================================================================
  it('combines multiple filters with AND logic', () => {
    const filters: FilterState = {
      ...INITIAL_FILTER_STATE,
      season: ['spring', 'summer'],
      difficulty: 'easy',
    };
    const result = filterAdventures(mockAdventures, filters);
    expect(result).toHaveLength(2); // summer-fishing + blackwater (both easy + summer/year-round)
  });

  it('filters with strict AND logic across axes', () => {
    const filters: FilterState = {
      ...INITIAL_FILTER_STATE,
      season: ['winter'],
      difficulty: 'rugged',
    };
    const result = filterAdventures(mockAdventures, filters);
    expect(result).toHaveLength(1); // Only blackwater (year-round + easy, but no rugged adventures exist)
  });

  // ==========================================================================
  // EDGE CASES
  // ==========================================================================
  it('handles adventures missing elevation data', () => {
    const adventureNoElevation: Adventure = {
      ...mockAdventures[0],
      data: { ...mockAdventures[0].data, elevation_gain: undefined },
    };
    const filters: FilterState = {
      ...INITIAL_FILTER_STATE,
      elevation: [500, 2000],
    };
    const result = filterAdventures([adventureNoElevation], filters);
    // Adventures without elevation_gain are excluded when elevation filter active
    expect(result).toHaveLength(0);
  });

  it('handles adventures missing suitability data', () => {
    const filters: FilterState = {
      ...INITIAL_FILTER_STATE,
      suitability: ['dog-friendly'],
    };
    const result = filterAdventures(mockAdventures, filters);
    // Only adventures WITH suitability data that matches
    expect(result).toHaveLength(1); // spring-turkey
  });
});

// ============================================================================
// COUNT ACTIVE FILTERS TESTS
// ============================================================================

describe('countActiveFilters', () => {
  it('returns 0 when no filters active', () => {
    const count = countActiveFilters(INITIAL_FILTER_STATE);
    expect(count).toBe(0);
  });

  it('counts season filters', () => {
    const filters: FilterState = {
      ...INITIAL_FILTER_STATE,
      season: ['spring', 'fall'],
    };
    const count = countActiveFilters(filters);
    expect(count).toBe(2); // 2 seasons selected
  });

  it('counts difficulty filter', () => {
    const filters: FilterState = {
      ...INITIAL_FILTER_STATE,
      difficulty: 'moderate',
    };
    const count = countActiveFilters(filters);
    expect(count).toBe(1);
  });

  it('counts elevation filter only if not full range', () => {
    const filtersFullRange: FilterState = {
      ...INITIAL_FILTER_STATE,
      elevation: [0, 5000],
    };
    expect(countActiveFilters(filtersFullRange)).toBe(0);

    const filtersPartialRange: FilterState = {
      ...INITIAL_FILTER_STATE,
      elevation: [500, 2000],
    };
    expect(countActiveFilters(filtersPartialRange)).toBe(1);
  });

  it('counts all active filters combined', () => {
    const filters: FilterState = {
      season: ['spring', 'fall'],              // +2
      difficulty: 'moderate',                   // +1
      gear: ['hunting', 'fishing'],             // +2
      elevation: [500, 2000],                   // +1
      suitability: ['dog-friendly'],            // +1
    };
    const count = countActiveFilters(filters);
    expect(count).toBe(7); // 2 + 1 + 2 + 1 + 1
  });
});

// ============================================================================
// HAS ACTIVE FILTERS TESTS
// ============================================================================

describe('hasActiveFilters', () => {
  it('returns false when no filters active', () => {
    expect(hasActiveFilters(INITIAL_FILTER_STATE)).toBe(false);
  });

  it('returns true when any filter active', () => {
    const filters: FilterState = {
      ...INITIAL_FILTER_STATE,
      season: ['fall'],
    };
    expect(hasActiveFilters(filters)).toBe(true);
  });
});
