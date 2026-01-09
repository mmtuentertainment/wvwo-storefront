/**
 * Cross-Link Utilities for Adventure Hub
 * SPEC-24: Geographic proximity and related destination discovery
 *
 * Uses Haversine formula for accurate great-circle distance calculation.
 * Designed for cross-linking destinations within ~50 mile radius.
 */

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface DestinationRef {
  slug: string;
  name: string;
  type: string;
  coordinates?: Coordinates;
}

/** Type guard for destinations with valid coordinates */
export function hasCoordinates<T extends DestinationRef>(
  dest: T
): dest is T & { coordinates: Coordinates } {
  return dest.coordinates !== undefined &&
         typeof dest.coordinates.lat === 'number' &&
         typeof dest.coordinates.lng === 'number';
}

/**
 * Earth's radius in miles (mean radius)
 */
const EARTH_RADIUS_MILES = 3958.8;

/**
 * Compute the great-circle distance between two geographic coordinates.
 *
 * @param point1 - Origin coordinate (latitude/longitude).
 * @param point2 - Destination coordinate (latitude/longitude).
 * @returns The distance between the two coordinates in miles.
 */
export function haversineDistance(point1: Coordinates, point2: Coordinates): number {
  const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

  const dLat = toRadians(point2.lat - point1.lat);
  const dLng = toRadians(point2.lng - point1.lng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(point1.lat)) *
      Math.cos(toRadians(point2.lat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return EARTH_RADIUS_MILES * c;
}

/**
 * Locate nearby destinations from an origin within a maximum radius.
 * Filters out destinations without coordinates using type guard.
 *
 * @param origin - Reference coordinates to measure distances from
 * @param destinations - Candidate destinations to search
 * @param radiusMiles - Maximum distance in miles to include (default: 30)
 * @param limit - Maximum number of results to return (default: 5)
 * @returns An array of destinations augmented with `distanceMiles` (in miles), sorted by nearest first
 */
export function findNearbyDestinations<T extends DestinationRef>(
  origin: Coordinates,
  destinations: T[],
  radiusMiles = 30,
  limit = 5
): Array<T & { coordinates: Coordinates; distanceMiles: number }> {
  return destinations
    .filter(hasCoordinates)
    .map((dest) => ({
      ...dest,
      distanceMiles: haversineDistance(origin, dest.coordinates),
    }))
    .filter((dest) => dest.distanceMiles <= radiusMiles && dest.distanceMiles > 0)
    .sort((a, b) => a.distanceMiles - b.distanceMiles)
    .slice(0, limit);
}

/**
 * Locate nearby destinations of the specified types around an origin coordinate.
 * Uses Set for O(1) type membership check.
 *
 * @param origin - Reference coordinates to measure distances from
 * @param destinations - Array of destination objects to search
 * @param types - Destination types to include (matching `destination.type`)
 * @param radiusMiles - Maximum distance in miles to include
 * @param limit - Maximum number of results to return
 * @returns An array of destinations augmented with `distanceMiles`, sorted by ascending distance
 */
export function findNearbyByType<T extends DestinationRef>(
  origin: Coordinates,
  destinations: T[],
  types: string[],
  radiusMiles = 30,
  limit = 5
): Array<T & { coordinates: Coordinates; distanceMiles: number }> {
  const typeSet = new Set(types);
  const filtered = destinations.filter((d) => typeSet.has(d.type));
  return findNearbyDestinations(origin, filtered, radiusMiles, limit);
}

/**
 * Group nearby destinations by type, with a per-type result limit.
 *
 * Considers destinations within `radiusMiles` of `origin` and returns up to `limitPerType` items for each destination `type`. Each returned item includes a `distanceMiles` property.
 *
 * @param origin - Reference coordinates used to measure distance
 * @param destinations - Candidate destinations to consider
 * @param radiusMiles - Maximum distance in miles to include a destination
 * @param limitPerType - Maximum number of destinations to include per type
 * @returns A record mapping each destination `type` to an array of destinations augmented with `distanceMiles`
 */
export function groupNearbyByType<T extends DestinationRef>(
  origin: Coordinates,
  destinations: T[],
  radiusMiles = 30,
  limitPerType = 3
): Record<string, Array<T & { coordinates: Coordinates; distanceMiles: number }>> {
  const nearby = findNearbyDestinations(origin, destinations, radiusMiles, 100);

  return nearby.reduce(
    (groups, dest) => {
      if (!groups[dest.type]) {
        groups[dest.type] = [];
      }
      if (groups[dest.type].length < limitPerType) {
        groups[dest.type].push(dest);
      }
      return groups;
    },
    {} as Record<string, Array<T & { coordinates: Coordinates; distanceMiles: number }>>
  );
}

/**
 * Convert a numeric distance in miles into a human-friendly display string.
 * Handles singular/plural correctly (e.g., "1 mile" not "1.0 miles").
 *
 * @param miles - Distance in miles
 * @returns `"< 1 mile"` for distances less than 1, proper singular/plural for others
 */
export function formatDistance(miles: number): string {
  if (miles < 1) return '< 1 mile';
  if (miles < 10) {
    const formatted = miles.toFixed(1);
    // Handle "1.0" -> "1 mile" (singular)
    if (formatted === '1.0') return '1 mile';
    return `${formatted} miles`;
  }
  const rounded = Math.round(miles);
  return rounded === 1 ? '1 mile' : `${rounded} miles`;
}

/**
 * Generates a cross-link URL path for a destination.
 *
 * @param type - Destination type used to select the route (e.g., `historic`, `backcountry`, or a generic type)
 * @param slug - Destination slug to append to the route
 * @returns The URL path for the destination, including the route and trailing slash
 */
export function getCrossLinkUrl(type: string, slug: string): string {
  // Special cases for non-standard routes
  const specialRoutes: Record<string, string> = {
    historic: '/historic/',
    backcountry: '/backcountry/',
  };

  const base = specialRoutes[type] || `/near/${type}/`;
  return `${base}${slug}/`;
}

