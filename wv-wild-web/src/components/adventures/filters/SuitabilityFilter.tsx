/**
 * SPEC-07: Suitability Filter Component
 * Multi-select checkboxes for accessibility/family-friendliness
 * (Dog-friendly, Kid-friendly, Wheelchair-accessible, Paved)
 * WVWO Aesthetic: 44×44px touch targets, rounded-sm, brand colors
 */

import React from 'react';
import { useFilters } from '@/lib/adventures/FilterContext';
import { FILTER_CONFIG } from '@/lib/adventures/filters.config';

export function SuitabilityFilter() {
  const { state, dispatch } = useFilters();
  const config = FILTER_CONFIG.find((c) => c.id === 'suitability')!;

  const handleChange = (value: string, checked: boolean) => {
    const newValues = checked
      ? [...state.suitability, value]
      : state.suitability.filter((s) => s !== value);

    dispatch({
      type: 'SET_MULTI_SELECT',
      axis: 'suitability',
      values: newValues,
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
            className="flex items-center gap-3 cursor-pointer group min-h-[44px]"
          >
            <input
              type="checkbox"
              value={option.value}
              checked={state.suitability.includes(option.value)}
              onChange={(e) => handleChange(option.value, e.target.checked)}
              className="w-5 h-5 text-sign-green bg-white border-2 border-brand-mud/40 rounded-sm focus:ring-2 focus:ring-sign-green focus:ring-offset-0"
              aria-label={`Filter by ${option.label}`}
            />
            <span className="font-body text-brand-brown group-hover:text-sign-green transition-colors">
              {option.label}
            </span>
          </label>
        ))}
      </div>

      <p className="text-xs text-brand-mud/60 mt-3">
        Filter for family-friendly and accessible adventures
      </p>
    </fieldset>
  );
}
