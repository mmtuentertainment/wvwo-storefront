/**
 * SPEC-07: Difficulty Filter Component
 * Single-select radio group for difficulty (Easy, Moderate, Challenging, Rugged)
 * WVWO Aesthetic: 44×44px touch targets, rounded-sm, brand colors
 */

import React from 'react';
import { useFilters } from '@/lib/adventures/FilterContext';
import { FILTER_CONFIG } from '@/lib/adventures/filters.config';

export function DifficultyFilter() {
  const { state, dispatch } = useFilters();
  const config = FILTER_CONFIG.find((c) => c.id === 'difficulty')!;

  const handleChange = (value: string) => {
    dispatch({
      type: 'SET_SINGLE_SELECT',
      axis: 'difficulty',
      value: value === state.difficulty ? null : value, // Toggle off if already selected
    });
  };

  return (
    <fieldset className="border-2 border-brand-mud/30 rounded-sm p-4 bg-brand-cream">
      <legend className="font-display font-bold text-brand-brown px-2">
        {config.label}
      </legend>

      <div className="space-y-3">
        {config.options.map((option) => (
          <label
            key={option.value}
            className="flex items-start gap-3 cursor-pointer group min-h-[44px]"
          >
            <input
              type="radio"
              name="difficulty"
              value={option.value}
              checked={state.difficulty === option.value}
              onChange={() => handleChange(option.value)}
              className="mt-1 w-5 h-5 text-sign-green bg-white border-2 border-brand-mud/40 rounded-sm focus:ring-2 focus:ring-sign-green focus:ring-offset-0"
              aria-label={`Filter by ${option.label} difficulty`}
            />
            <div className="flex-1">
              <span className="font-body text-brand-brown font-medium group-hover:text-sign-green transition-colors block">
                {option.label}
              </span>
              {option.description && (
                <span className="text-xs text-brand-mud/60 block mt-0.5">
                  {option.description}
                </span>
              )}
            </div>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
