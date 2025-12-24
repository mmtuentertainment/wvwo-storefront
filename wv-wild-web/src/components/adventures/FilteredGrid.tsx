/**
 * SPEC-07: Filtered Grid Component
 * Displays filtered adventures in responsive grid with results count
 * WVWO Aesthetic: responsive 1-3 col grid, ARIA live region
 */

// import React from 'react';
import { useFilters } from '@/lib/adventures/FilterContext';
import { AdventureCard } from './AdventureCard';
import { EmptyState } from './EmptyState';

export function FilteredGrid() {
  const { filteredAdventures, totalCount } = useFilters();

  return (
    <main className="flex-1" role="main" id="adventure-results">
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
              className="motion-safe:animate-[fadeIn_0.5s_ease-out_forwards] motion-reduce:animate-none"
              style={{
                animationDelay: `${index * 60}ms`, // Stagger entrance (60ms per card)
                opacity: 0,
              }}
            >
              <AdventureCard adventure={adventure} />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
