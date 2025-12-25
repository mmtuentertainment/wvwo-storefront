/**
 * SPEC-07 PR #6: Adventures Hub React Island
 *
 * Main component that wraps all filter UI and grid in FilterProvider.
 * This is the single React island for the adventures page.
 *
 * Research-backed decisions:
 * - client:only="react" directive (skip SSR - uses browser APIs)
 * - ViewTransitions cleanup handled by FilterProvider (avoids duplication)
 * - OfflineBanner with client:load (separate island)
 *
 * WVWO Aesthetic: Two-column layout on desktop, stacked on mobile
 */

import { FilterProvider } from '@/lib/adventures/FilterContext';
import { FilterBar } from './filters/FilterBar';
import { FilteredGrid } from './FilteredGrid';
import { MobileFiltersSheet } from './MobileFiltersSheet';
import type { Adventure } from '@/lib/adventures/filters.config';

interface AdventuresHubProps {
  adventures: Adventure[];
}

/**
 * Main adventures hub component with filter sidebar and results grid.
 *
 * Wraps all filter functionality in FilterProvider context.
 * Note: ViewTransitions cleanup is handled by FilterProvider to avoid duplication.
 */
export function AdventuresHub({ adventures }: AdventuresHubProps) {
  // ViewTransitions cleanup handled by FilterProvider (line 83-94)
  // No duplicate listeners needed here

  return (
    <FilterProvider adventures={adventures}>
      {/* Two-column layout: Sidebar + Grid */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Desktop Sidebar (hidden on mobile) */}
        <FilterBar />

        {/* Main Results Grid */}
        <FilteredGrid />
      </div>

      {/* Mobile Filter Sheet (fixed bottom button, hidden on desktop) */}
      <MobileFiltersSheet />
    </FilterProvider>
  );
}
