/**
 * SPEC-07: Empty State Component
 * Shown when no adventures match current filters
 * WVWO Voice: Kim's authentic tone, "Grand love ya!"
 */

// import React from 'react';
import { useFilters } from '@/lib/adventures/FilterContext';

export function EmptyState() {
  const { dispatch } = useFilters();

  const handleClearFilters = () => {
    dispatch({ type: 'RESET_ALL' });
  };

  return (
    <div className="col-span-full text-center py-16 bg-brand-cream rounded-sm border-2 border-brand-mud/30">
      <div className="max-w-md mx-auto px-4">
        {/* Icon */}
        <div className="text-brand-mud/40 mb-4">
          <svg
            aria-hidden="true"
            className="w-16 h-16 mx-auto"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
        </div>

        {/* Kim's Voice */}
        <h3 className="font-display font-bold text-xl text-brand-brown mb-2">
          Hmm, nothing matches those filters
        </h3>
        <p className="font-body text-brand-mud/80 mb-6">
          Try widening your search - or give us a call. We know spots that aren't on any list.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleClearFilters}
            className="min-h-[44px] px-6 py-2 bg-sign-green text-white font-display font-bold rounded-sm hover:bg-sign-green/90 motion-safe:transition-colors motion-reduce:transition-none focus:outline-none focus:ring-2 focus:ring-sign-green"
            type="button"
          >
            Clear Filters
          </button>
          <a
            href="tel:+13046495765"
            className="min-h-[44px] px-6 py-2 bg-white border-2 border-brand-brown text-brand-brown font-display font-bold rounded-sm hover:bg-brand-cream motion-safe:transition-colors motion-reduce:transition-none focus:outline-none focus:ring-2 focus:ring-sign-green inline-flex items-center justify-center"
          >
            Call Us: (304) 649-5765
          </a>
        </div>

        {/* Kim's Signature */}
        <p className="font-hand text-brand-orange mt-6 text-lg">
          Grand love ya!
        </p>
      </div>
    </div>
  );
}
