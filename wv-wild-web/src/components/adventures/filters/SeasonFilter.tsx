/**
 * SPEC-07: Season Filter Component
 * Multi-select checkboxes for season filtering (Spring, Summer, Fall, Winter)
 * WVWO Aesthetic: 44×44px touch targets, rounded-sm, brand colors
 */

import { useFilters } from '@/lib/adventures/FilterContext';
import { FILTER_CONFIG } from '@/lib/adventures/filters.config';

export function SeasonFilter() {
  const { state, dispatch } = useFilters();
  const config = FILTER_CONFIG.find((c) => c.id === 'season')!;

  const handleChange = (value: string, checked: boolean) => {
    const newValues = checked
      ? [...state.season, value]
      : state.season.filter((s) => s !== value);

    dispatch({
      type: 'SET_MULTI_SELECT',
      axis: 'season',
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
              checked={state.season.includes(option.value)}
              onChange={(e) => handleChange(option.value, e.target.checked)}
              className="w-5 h-5 text-sign-green bg-white border-2 border-brand-mud/40 rounded-sm focus:ring-2 focus:ring-sign-green focus:ring-offset-0"
              aria-label={`Filter by ${option.label}`}
            />
            <span className="font-body text-brand-brown group-hover:text-sign-green transition-colors">
              {option.label}
            </span>
            {option.description && (
              <span className="text-xs text-brand-mud/60 ml-auto">
                {option.description}
              </span>
            )}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
