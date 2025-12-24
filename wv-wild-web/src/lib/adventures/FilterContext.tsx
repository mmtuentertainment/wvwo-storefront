/**
 * SPEC-07: Filter Context Provider
 * React Context for managing adventure filter state
 */

import React, { createContext, useContext, useReducer, useEffect, useMemo, useRef, type ReactNode } from 'react';
import { filterReducer } from './filter-reducer';
import { filterAdventures, countActiveFilters } from './filter-utils';
import { syncStateToUrl, parseUrlParams } from './url-sync';
import type { FilterState, FilterAction, Adventure } from './filters.config';
import { INITIAL_FILTER_STATE } from './filters.config';

// ============================================================================
// CONTEXT TYPES
// ============================================================================

interface FilterContextValue {
  state: FilterState;
  dispatch: React.Dispatch<FilterAction>;
  filteredAdventures: Adventure[];
  totalCount: number;
  activeFilterCount: number;
}

// ============================================================================
// CONTEXT CREATION
// ============================================================================

const FilterContext = createContext<FilterContextValue | undefined>(undefined);

// ============================================================================
// PROVIDER COMPONENT
// ============================================================================

interface FilterProviderProps {
  children: ReactNode;
  adventures: Adventure[];
}

export function FilterProvider({ children, adventures }: FilterProviderProps) {
  // ==========================================================================
  // INITIALIZE STATE FROM URL ON MOUNT
  // ==========================================================================
  const [state, dispatch] = useReducer(filterReducer, INITIAL_FILTER_STATE, () => {
    // Lazy initializer: Load filters from URL params if present
    const urlState = parseUrlParams();
    return { ...INITIAL_FILTER_STATE, ...urlState };
  });

  // ==========================================================================
  // SYNC STATE TO URL ON EVERY CHANGE (skip initial mount)
  // ==========================================================================
  const isInitialMount = useRef(true);

  useEffect(() => {
    // Skip URL sync on initial mount to avoid unnecessary history entry
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    syncStateToUrl(state);
  }, [state]);

  // ==========================================================================
  // FILTER ADVENTURES (MEMOIZED - prevent re-compute on every render)
  // ==========================================================================
  const filteredAdventures = useMemo(() => {
    return filterAdventures(adventures, state);
  }, [adventures, state]);

  // ==========================================================================
  // COUNT ACTIVE FILTERS (for mobile badge)
  // ==========================================================================
  const activeFilterCount = useMemo(() => {
    return countActiveFilters(state);
  }, [state]);

  // ==========================================================================
  // ASTRO VIEW TRANSITIONS CLEANUP
  // Pattern from shop/index.astro - prevent duplicate listeners
  // ==========================================================================
  useEffect(() => {
    const handleBeforeSwap = () => {
      // Clean up before Astro navigates away
      console.log('[FilterContext] Cleaning up for view transition');
    };

    document.addEventListener('astro:before-swap', handleBeforeSwap, { once: true });

    return () => {
      document.removeEventListener('astro:before-swap', handleBeforeSwap);
    };
  }, []);

  // ==========================================================================
  // CONTEXT VALUE
  // ==========================================================================
  const value: FilterContextValue = {
    state,
    dispatch,
    filteredAdventures,
    totalCount: adventures.length,
    activeFilterCount,
  };

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
}

// ============================================================================
// CONTEXT HOOK (safe access with error handling)
// ============================================================================

export function useFilters(): FilterContextValue {
  const context = useContext(FilterContext);

  if (!context) {
    throw new Error('useFilters must be used within FilterProvider');
  }

  return context;
}
