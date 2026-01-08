/**
 * SPEC-07/08: Adventure Card Component
 * Grid item for adventures hub - displays adventure preview
 * WVWO Aesthetic: border-l-4 accent, rounded-sm, brand colors
 * SPEC-08: Added drive time badge, index prop for stagger animation
 */

import React from 'react';
import { Car } from 'lucide-react';
import type { Adventure } from '@/lib/adventures/filters.config';

interface AdventureCardProps {
  adventure: Adventure;
  // Note: index prop removed - stagger animation handled by FilteredGrid wrapper
}

/**
 * Generate the correct URL for an adventure based on its type.
 * SPEC-21: Routes to new /near/ dynamic routes instead of legacy /adventures/ paths.
 * SPEC-21-A: Extended to support campground type routes.
 *
 * @param id - The adventure ID (content collection filename without extension)
 * @param type - The adventure type (wma, lake, campground)
 * @returns The correct URL path for the adventure detail page
 */
function getAdventureUrl(id: string, type?: string): string {
  // Derive slug from id by stripping known suffixes:
  // - "burnsville-lake-wma" -> "burnsville" (for WMA/lake)
  // - "summersville-lake" -> "summersville" (for lake)
  // - "bulltown-campground" -> "bulltown" (for campground)
  // - Compound names like "holly-river-lake" -> "holly-river" (preserves compound prefix)
  let slug = id;

  // Strip known suffixes from the end (order matters: check compound suffixes first)
  if (id.endsWith('-lake-wma')) {
    slug = id.slice(0, -'-lake-wma'.length);
  } else if (id.endsWith('-wma')) {
    slug = id.slice(0, -'-wma'.length);
  } else if (id.endsWith('-lake')) {
    slug = id.slice(0, -'-lake'.length);
  } else if (id.endsWith('-campground')) {
    slug = id.slice(0, -'-campground'.length);
  }

  switch (type) {
    case 'wma':
      return `/near/wma/${slug}/`;
    case 'lake':
      return `/near/lake/${slug}/`;
    case 'campground':
      return `/near/campground/${slug}/`;
    default:
      // Fallback to legacy /adventures/ path for unmigrated content
      return `/adventures/${id}/`;
  }
}

/**
 * Render a clickable preview card for an adventure that links to the adventure's detail page.
 * Wrapped in React.memo to prevent unnecessary re-renders when filter state changes
 * but this card's adventure data hasn't changed.
 *
 * @param adventure - The Adventure data used to populate the card (title, image, metadata, tags, etc.)
 * @returns A JSX anchor element representing the adventure card populated with image (if present), location badge, title, description, difficulty and optional elevation, season tags, and optional suitability icons
 */
export const AdventureCard = React.memo(function AdventureCard({
  adventure,
}: AdventureCardProps) {
  const { title, description, season, difficulty, location, elevation_gain, suitability, drive_time, type } =
    adventure.data;

  const adventureUrl = getAdventureUrl(adventure.id, type);

  return (
    <a
      href={adventureUrl}
      aria-label={`View ${title} adventure at ${location}`}
      className="group block bg-white rounded-sm border-2 border-stone-200 border-l-4 border-l-sign-green overflow-hidden hover:border-l-brand-orange motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none focus:outline-none focus:ring-2 focus:ring-sign-green"
    >
      {/* Image */}
      {adventure.data.images?.[0] && (
        <div className="aspect-4/3 overflow-hidden bg-brand-mud/10">
          <img
            src={adventure.data.images[0].src}
            alt={adventure.data.images[0].alt}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-105 motion-safe:transition-transform motion-safe:duration-500 motion-reduce:transition-none"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        {/* SPEC-08: Drive Time Badge - Proximity anchor to shop */}
        {drive_time && (
          <span className="inline-flex items-center gap-1 bg-sign-green text-white text-xs font-bold px-2 py-1 rounded-sm mb-2 mr-2">
            <Car className="w-3 h-3" aria-hidden="true" />
            {drive_time} from shop
          </span>
        )}

        {/* Location Badge */}
        <span className="inline-block bg-sign-green/10 text-sign-green text-xs font-bold px-2 py-1 rounded-sm mb-2">
          {location}
        </span>

        {/* Title */}
        <h3 className="font-display font-bold text-lg text-brand-brown mb-2 line-clamp-2 group-hover:text-sign-green motion-safe:transition-colors motion-reduce:transition-none">
          {title}
        </h3>

        {/* Description */}
        <p className="font-body text-sm text-brand-mud/80 mb-3 line-clamp-2">
          {description}
        </p>

        {/* Metadata Row */}
        <div className="flex flex-wrap gap-3 text-xs text-brand-mud mb-3">
          {/* Difficulty */}
          <span className="inline-flex items-center gap-1">
            <span className="font-bold text-brand-brown">Difficulty:</span>
            <span className="capitalize">{difficulty}</span>
          </span>

          {/* Elevation (if present) */}
          {elevation_gain !== undefined && (
            <span className="inline-flex items-center gap-1">
              <span className="font-bold text-brand-brown">Elevation:</span>
              <span>{elevation_gain.toLocaleString()} ft</span>
            </span>
          )}
        </div>

        {/* Season Tags */}
        <div className="flex flex-wrap gap-1">
          {season.map((s) => (
            <span
              key={s}
              className="inline-block bg-brand-cream text-brand-brown text-xs font-medium px-2 py-1 rounded-sm border border-brand-mud/20"
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </span>
          ))}
        </div>

        {/* Suitability Icons (if present) */}
        {suitability && suitability.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-brand-mud/10">
            {suitability.map((item) => (
              <span
                key={item}
                className="text-xs text-sign-green font-medium"
                title={item.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                aria-label={item.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                role="img"
              >
                {item === 'dog-friendly' && '🐕'}
                {item === 'kid-friendly' && '👶'}
                {item === 'wheelchair-accessible' && '♿'}
                {item === 'paved' && '🛤️'}
              </span>
            ))}
          </div>
        )}
      </div>
    </a>
  );
});
