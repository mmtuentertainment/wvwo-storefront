/**
 * SPEC-07: Filter Bar Component
 * Desktop sidebar with all filter controls + results count + clear button
 * WVWO Aesthetic: Sticky sidebar, 1/4 width, rounded-sm, brand colors
 */

import React from 'react';
import { useFilters } from '@/lib/adventures/FilterContext';
import { hasActiveFilters } from '@/lib/adventures/filter-utils';
import { SeasonFilter } from './filters/SeasonFilter';
import { DifficultyFilter } from './filters/DifficultyFilter';
import { GearFilter } from './filters/GearFilter';
import { ElevationSlider } from './filters/ElevationSlider';
import { SuitabilityFilter } from './filters/SuitabilityFilter';

export function FilterBar() {
  const { state, dispatch, filteredAdventures, totalCount } = useFilters();

  const handleClearAll = () => {
    dispatch({ type: 'RESET_ALL' });
  };

  return (
    <aside
      className="hidden md:block md:w-1/4 md:sticky md:top-4 md:self-start"
      role="complementary"
      aria-label="Adventure filters"
    >
      <div className="space-y-6">
        {/* Results Count with ARIA Live Region */}
        <div
          className="bg-white rounded-sm border-2 border-brand-mud/30 p-4"
          role="region"
          aria-live="polite"
          aria-atomic="true"
        >
          <p className="font-display font-bold text-brand-brown text-lg">
            {filteredAdventures.length} of {totalCount}
          </p>
          <p className="text-sm text-brand-mud/80">
            {filteredAdventures.length === 1 ? 'Adventure' : 'Adventures'}
          </p>
        </div>

        {/* Skip to Results Link (Accessibility) */}
        <a
          href="#adventure-results"
          className="sr-only focus:not-sr-only focus:block focus:bg-sign-green focus:text-white focus:px-4 focus:py-2 focus:rounded-sm"
        >
          Skip to Results
        </a>

        {/* Filter Components */}
        <SeasonFilter />
        <DifficultyFilter />
        <GearFilter />
        <ElevationSlider />
        <SuitabilityFilter />

        {/* Clear All Filters Button */}
        {hasActiveFilters(state) && (
          <button
            onClick={handleClearAll}
            className="w-full min-h-[44px] px-4 py-2 bg-white border-2 border-brand-brown text-brand-brown font-display font-bold rounded-sm hover:bg-brand-cream transition-colors focus:ring-2 focus:ring-sign-green focus:outline-none"
            type="button"
          >
            Clear All Filters
          </button>
        )}
      </div>
    </aside>
  );
}
