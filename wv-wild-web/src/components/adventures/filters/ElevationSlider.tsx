/**
 * SPEC-07: Elevation Slider Component
 * Dual-thumb range slider for elevation gain filtering (0-5000 ft)
 * Clarification Q2: Dual-thumb, 100 ft increments, "1,200 ft" format
 * WVWO Aesthetic: 44×44px thumbs, rounded-sm, sign-green accent
 */

import React from 'react';
import ReactSlider from 'react-slider';
import { useFilters } from '@/lib/adventures/FilterContext';
import { FILTER_CONFIG } from '@/lib/adventures/filters.config';

/**
 * Render a dual-thumb elevation-gain slider with current min/max readout and accessible controls.
 *
 * Displays the configured label and the current minimum and maximum elevation values (formatted in feet),
 * and dispatches a `SET_RANGE` action to update the elevation filter when the slider range changes.
 *
 * @returns The React element for the elevation range slider control.
 */
export function ElevationSlider() {
  const { state, dispatch } = useFilters();
  const config = FILTER_CONFIG.find((c) => c.id === 'elevation')!;

  const handleChange = (value: number | readonly number[]) => {
    // react-slider returns [min, max] tuple for dual-thumb
    const range: [number, number] = Array.isArray(value)
      ? [value[0], value[1]]
      : [value, value];

    dispatch({
      type: 'SET_RANGE',
      axis: 'elevation',
      value: range,
    });
  };

  const formatElevation = (feet: number): string => {
    return `${feet.toLocaleString()} ft`;
  };

  return (
    <fieldset className="border-2 border-brand-mud/30 rounded-sm p-4 bg-brand-cream">
      <legend className="font-display font-bold text-brand-brown px-2">
        {config.label}
      </legend>

      {/* Current Values Display */}
      <div className="flex justify-between text-sm font-medium text-brand-brown mb-6">
        <span>{formatElevation(state.elevation[0])}</span>
        <span>{formatElevation(state.elevation[1])}</span>
      </div>

      {/* Dual-Thumb Range Slider */}
      <ReactSlider
        className="h-2 bg-brand-mud/20 rounded-sm relative"
        thumbClassName="absolute w-11 h-11 bg-sign-green border-2 border-white rounded-sm cursor-pointer shadow-md focus:ring-2 focus:ring-sign-green focus:outline-none -mt-[18px] flex items-center justify-center"
        trackClassName="bg-sign-green h-2 rounded-sm"
        value={state.elevation}
        onChange={handleChange}
        min={0}
        max={5000}
        step={100}
        minDistance={100}  // Prevent thumbs from crossing
        pearling               // Thumbs push each other when dragged
        ariaLabel={['Minimum elevation gain in feet', 'Maximum elevation gain in feet']}
        ariaValuetext={(state) => `${state.valueNow} feet`}
        renderThumb={(props, state) => (
          <div {...props} key={state.index}>
            <span className="sr-only">
              {state.index === 0 ? 'Minimum elevation' : 'Maximum elevation'}: {state.valueNow} feet
            </span>
          </div>
        )}
      />

      {/* Helper Text */}
      <p className="text-xs text-brand-mud/60 mt-4">
        Filter by how much elevation you'll climb
      </p>
    </fieldset>
  );
}