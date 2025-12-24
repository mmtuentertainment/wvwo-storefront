/**
 * SPEC-07: Gear Filter Component
 * Multi-select checkboxes for gear/activity types
 * Collapsible: Show 5 by default, "Show More" expands to all
 * WVWO Aesthetic: 44×44px touch targets, rounded-sm, brand colors
 */

import React, { useState } from 'react';
import { useFilters } from '@/lib/adventures/FilterContext';
import { FILTER_CONFIG } from '@/lib/adventures/filters.config';

export function GearFilter() {
  const { state, dispatch } = useFilters();
  const config = FILTER_CONFIG.find((c) => c.id === 'gear')!;

  const [showAll, setShowAll] = useState(false);
  const visibleOptions = showAll ? config.options : config.options.slice(0, 5);

  const handleChange = (value: string, checked: boolean) => {
    const newValues = checked
      ? [...state.gear, value]
      : state.gear.filter((g) => g !== value);

    dispatch({
      type: 'SET_MULTI_SELECT',
      axis: 'gear',
      values: newValues,
    });
  };

  return (
    <fieldset className="border-2 border-brand-mud/30 rounded-sm p-4 bg-brand-cream">
      <legend className="font-display font-bold text-brand-brown px-2">
        {config.label}
      </legend>

      <div className="space-y-3">
        {visibleOptions.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-3 cursor-pointer group min-h-[44px]"
          >
            <input
              type="checkbox"
              value={option.value}
              checked={state.gear.includes(option.value)}
              onChange={(e) => handleChange(option.value, e.target.checked)}
              className="w-5 h-5 text-sign-green bg-white border-2 border-brand-mud/40 rounded-sm focus:ring-2 focus:ring-sign-green focus:ring-offset-0"
              aria-label={`Filter by ${option.label}`}
            />
            <span className="font-body text-brand-brown group-hover:text-sign-green transition-colors">
              {option.label}
            </span>
          </label>
        ))}

        {/* Show More/Less Button */}
        {config.options.length > 5 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-sm text-sign-green font-medium hover:underline mt-2 min-h-[44px] px-2"
            type="button"
          >
            {showAll ? 'Show Less' : `Show ${config.options.length - 5} More`}
          </button>
        )}
      </div>
    </fieldset>
  );
}
