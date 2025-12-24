/**
 * SPEC-07: Filter Reducer
 * Generic axis-agnostic reducer (works for any filter config)
 */

import type { FilterState, FilterAction } from './filters.config';
import { INITIAL_FILTER_STATE } from './filters.config';

/**
 * Filter state reducer
 * Generic implementation - consumes filter config, not hardcoded axes
 *
 * Extensibility: Adding axis 6+ requires ZERO changes to this reducer
 */
export function filterReducer(
  state: FilterState,
  action: FilterAction
): FilterState {
  switch (action.type) {
    // ========================================================================
    // SET_MULTI_SELECT (season, gear, suitability)
    // ========================================================================
    case 'SET_MULTI_SELECT': {
      // Type guard: Ensure axis is valid key of FilterState
      const validMultiSelectAxes = ['season', 'gear', 'suitability'] as const;
      if (!validMultiSelectAxes.includes(action.axis as any)) {
        console.warn(`[filter-reducer] Invalid multi-select axis: ${action.axis}`);
        return state;
      }

      return {
        ...state,
        [action.axis]: action.values,
      };
    }

    // ========================================================================
    // SET_SINGLE_SELECT (difficulty)
    // ========================================================================
    case 'SET_SINGLE_SELECT': {
      // Type guard: Ensure axis is valid key of FilterState
      if (action.axis !== 'difficulty') {
        console.warn(`[filter-reducer] Invalid single-select axis: ${action.axis}`);
        return state;
      }

      return {
        ...state,
        [action.axis]: action.value,
      };
    }

    // ========================================================================
    // SET_RANGE (elevation)
    // ========================================================================
    case 'SET_RANGE': {
      // Type guard: Ensure axis is valid key of FilterState
      const validRangeAxes = ['elevation'] as const;
      if (!validRangeAxes.includes(action.axis as any)) {
        console.warn(`[filter-reducer] Invalid range axis: ${action.axis}`);
        return state;
      }

      return {
        ...state,
        [action.axis]: action.value,
      };
    }

    // ========================================================================
    // RESET_ALL (clear all filters, return to initial state)
    // ========================================================================
    case 'RESET_ALL': {
      return INITIAL_FILTER_STATE;
    }

    // ========================================================================
    // LOAD_FROM_URL (page load with URL params)
    // ========================================================================
    case 'LOAD_FROM_URL': {
      return {
        ...INITIAL_FILTER_STATE,
        ...action.state,
      };
    }

    default:
      return state;
  }
}
