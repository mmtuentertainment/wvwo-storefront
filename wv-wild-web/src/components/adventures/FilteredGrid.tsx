/**
 * SPEC-07: Filtered Grid Component
 * Displays filtered adventures in responsive grid with results count
 * WVWO Aesthetic: responsive 1-3 col grid, ARIA live region
 */

// import React from 'react';
import { useFilters } from '@/lib/adventures/FilterContext';
import { AdventureCard } from './AdventureCard';
import { EmptyState } from './EmptyState';

/**
 * Render the main results region for filtered adventures with accessible status text.
 *
 * Displays an ARIA-live header that reports either that no adventures were found
 * or the number of shown results out of the total, followed by contextual subtext.
 * When there are no results, renders the EmptyState component. When results exist,
 * renders a responsive 1–3 column grid of AdventureCard components; each item is
 * assigned a staggered entrance delay and receives its list `index` as a prop.
 *
 * @returns The main results element containing either an empty state or a responsive grid of adventure cards
 */
export function FilteredGrid() {
  const { filteredAdventures, totalCount } = useFilters();

  return (
    <main className="flex-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sign-green focus-visible:ring-offset-2" role="main" id="adventure-results" tabIndex={-1}>
      {/* Results Header with ARIA Live Region */}
      <div
        className="mb-6"
        role="region"
        aria-live="polite"
        aria-atomic="true"
      >
        <h2 className="font-display font-bold text-2xl text-brand-brown">
          {filteredAdventures.length === 0 ? (
            'No Adventures Found'
          ) : (
            <>
              Showing {filteredAdventures.length} of {totalCount}{' '}
              {filteredAdventures.length === 1 ? 'Adventure' : 'Adventures'}
            </>
          )}
        </h2>
        <p className="text-sm text-brand-mud/60 mt-1">
          {filteredAdventures.length === 0
            ? 'Try adjusting your filters'
            : 'Filter to narrow your search'}
        </p>
      </div>

      {/* Grid or Empty State */}
      {filteredAdventures.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAdventures.map((adventure, index) => (
            <div
              key={adventure.id}
              className="motion-safe:animate-[gentle-reveal_0.8s_cubic-bezier(0.25,0.46,0.45,0.94)_both] motion-reduce:animate-none"
              style={{
                opacity: 0,
                animationDelay: `${index * 100}ms`,
              }}
            >
              <AdventureCard adventure={adventure} index={index} />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}