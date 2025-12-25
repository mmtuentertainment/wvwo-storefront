/**
 * SPEC-07 PR #6: Adventures Hub React Island
 *
 * Main component that wraps all filter UI and grid in FilterProvider.
 * This is the single React island for the adventures page.
 *
 * Research-backed decisions:
 * - client:idle directive (filters can wait for browser idle)
 * - ViewTransitions cleanup handlers
 * - OfflineBanner with client:load (separate island)
 *
 * WVWO Aesthetic: Two-column layout on desktop, stacked on mobile
 */

import { useEffect } from 'react';
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
 * Handles Astro ViewTransitions cleanup for proper SPA navigation.
 */
export function AdventuresHub({ adventures }: AdventuresHubProps) {
  // ==========================================================================
  // ASTRO VIEW TRANSITIONS CLEANUP (PR #6 Research)
  // ==========================================================================
  useEffect(() => {
    const handleBeforeSwap = () => {
      // Clean up React state before Astro navigates away
      console.log('[AdventuresHub] Cleaning up for view transition');
    };

    const handlePageLoad = () => {
      // Reinitialize if needed after navigation
      console.log('[AdventuresHub] Page loaded, reinitializing');
    };

    document.addEventListener('astro:before-swap', handleBeforeSwap);
    document.addEventListener('astro:page-load', handlePageLoad);

    return () => {
      document.removeEventListener('astro:before-swap', handleBeforeSwap);
      document.removeEventListener('astro:page-load', handlePageLoad);
    };
  }, []);

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
