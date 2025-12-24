/**
 * SPEC-07: URL State Synchronization
 * Bidirectional sync between URL params and filter state
 * Enables shareable filter URLs (e.g., /adventures/?season=fall&difficulty=moderate)
 */

import type { FilterState } from './filters.config';

/**
 * Parse URL search params into filter state
 * Called on page load to hydrate filters from URL
 *
 * @returns Partial filter state from URL (merged with initial state)
 */
export function parseUrlParams(): Partial<FilterState> {
  // Server-side: URL not available
  if (typeof window === 'undefined') {
    return {};
  }

  const params = new URLSearchParams(window.location.search);
  const state: Partial<FilterState> = {};

  // ==========================================================================
  // SEASON (multi-select): ?season=fall,winter
  // ==========================================================================
  const seasonParam = params.get('season');
  if (seasonParam) {
    const validSeasons = ['spring', 'summer', 'fall', 'winter'];
    const seasons = seasonParam.split(',').filter(Boolean);
    const validatedSeasons = seasons.filter(s => validSeasons.includes(s));

    if (validatedSeasons.length !== seasons.length) {
      console.warn(`[url-sync] Invalid season param values filtered: ${seasonParam}`);
    }

    if (validatedSeasons.length > 0) {
      state.season = validatedSeasons;
    }
  }

  // ==========================================================================
  // DIFFICULTY (single-select): ?difficulty=moderate
  // ==========================================================================
  const difficultyParam = params.get('difficulty');
  if (difficultyParam) {
    // Validate against schema enums
    const validDifficulties = ['easy', 'moderate', 'challenging', 'rugged'];
    if (validDifficulties.includes(difficultyParam)) {
      state.difficulty = difficultyParam;
    } else {
      console.warn(`[url-sync] Invalid difficulty param: ${difficultyParam}`);
    }
  }

  // ==========================================================================
  // GEAR (multi-select): ?gear=turkey%20vest,fishing%20rod
  // ==========================================================================
  const gearParam = params.get('gear');
  if (gearParam) {
    // Accept any gear values (adventures can have custom gear)
    // No strict validation - gear is free-form in schema
    state.gear = gearParam.split(',').filter(Boolean);
  }

  // ==========================================================================
  // ELEVATION (range): ?elevation=500-2000
  // ==========================================================================
  const elevationParam = params.get('elevation');
  if (elevationParam) {
    const parts = elevationParam.split('-');
    if (parts.length === 2) {
      const min = parseInt(parts[0], 10);
      const max = parseInt(parts[1], 10);

      // Validate range
      if (!isNaN(min) && !isNaN(max) && min <= max && min >= 0 && max <= 5000) {
        state.elevation = [min, max];
      } else {
        console.warn(`[url-sync] Invalid elevation param: ${elevationParam}`);
      }
    }
  }

  // ==========================================================================
  // SUITABILITY (multi-select): ?suitability=dog-friendly,kid-friendly
  // ==========================================================================
  const suitabilityParam = params.get('suitability');
  if (suitabilityParam) {
    const validSuitability = ['dog-friendly', 'kid-friendly', 'wheelchair-accessible', 'paved'];
    const items = suitabilityParam.split(',').filter(Boolean);
    const validatedItems = items.filter(s => validSuitability.includes(s));

    if (validatedItems.length !== items.length) {
      console.warn(`[url-sync] Invalid suitability param values filtered: ${suitabilityParam}`);
    }

    if (validatedItems.length > 0) {
      state.suitability = validatedItems;
    }
  }

  return state;
}

/**
 * Sync filter state to URL
 * Uses replaceState to avoid history spam (intermediate filter changes)
 * Called on every state change
 *
 * @param filters - Current filter state
 */
export function syncStateToUrl(filters: FilterState): void {
  // Server-side: URL not available
  if (typeof window === 'undefined') {
    return;
  }

  const params = new URLSearchParams();

  // ==========================================================================
  // SEASON
  // ==========================================================================
  if (filters.season.length > 0) {
    params.set('season', filters.season.join(','));
  }

  // ==========================================================================
  // DIFFICULTY
  // ==========================================================================
  if (filters.difficulty) {
    params.set('difficulty', filters.difficulty);
  }

  // ==========================================================================
  // GEAR
  // ==========================================================================
  if (filters.gear.length > 0) {
    params.set('gear', filters.gear.join(','));
  }

  // ==========================================================================
  // ELEVATION (only if not full range)
  // ==========================================================================
  if (filters.elevation[0] !== 0 || filters.elevation[1] !== 5000) {
    params.set('elevation', `${filters.elevation[0]}-${filters.elevation[1]}`);
  }

  // ==========================================================================
  // SUITABILITY
  // ==========================================================================
  if (filters.suitability.length > 0) {
    params.set('suitability', filters.suitability.join(','));
  }

  // ==========================================================================
  // UPDATE URL (replaceState to avoid history spam)
  // Using replaceState prevents "back button hell" where users must click
  // back 5+ times to undo multiple filter changes. Shareable URLs still work.
  // ==========================================================================
  const newUrl = params.toString()
    ? `${window.location.pathname}?${params.toString()}`
    : window.location.pathname;

  // Use replaceState (NOT pushState) to avoid spamming browser history
  window.history.replaceState({}, '', newUrl);
}
