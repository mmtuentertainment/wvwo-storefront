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
  coordinates: Coordinates;
}

/**
 * Earth's radius in miles (mean radius)
 */
const EARTH_RADIUS_MILES = 3958.8;

/**
 * Calculate distance between two points using Haversine formula
 * @param point1 First coordinate pair
 * @param point2 Second coordinate pair
 * @returns Distance in miles
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
 * Find nearby destinations within a given radius
 * @param origin The reference point coordinates
 * @param destinations Array of destinations to search
 * @param radiusMiles Maximum distance in miles (default: 30)
 * @param limit Maximum results to return (default: 5)
 * @returns Sorted array of nearby destinations with distances
 */
export function findNearbyDestinations<T extends DestinationRef>(
  origin: Coordinates,
  destinations: T[],
  radiusMiles = 30,
  limit = 5
): Array<T & { distanceMiles: number }> {
  return destinations
    .map((dest) => ({
      ...dest,
      distanceMiles: haversineDistance(origin, dest.coordinates),
    }))
    .filter((dest) => dest.distanceMiles <= radiusMiles && dest.distanceMiles > 0)
    .sort((a, b) => a.distanceMiles - b.distanceMiles)
    .slice(0, limit);
}

/**
 * Find nearby destinations by type
 * @param origin The reference point coordinates
 * @param destinations Array of destinations to search
 * @param types Array of destination types to include
 * @param radiusMiles Maximum distance in miles
 * @param limit Maximum results to return
 */
export function findNearbyByType<T extends DestinationRef>(
  origin: Coordinates,
  destinations: T[],
  types: string[],
  radiusMiles = 30,
  limit = 5
): Array<T & { distanceMiles: number }> {
  const filtered = destinations.filter((d) => types.includes(d.type));
  return findNearbyDestinations(origin, filtered, radiusMiles, limit);
}

/**
 * Group nearby destinations by type for cross-link sections
 * @param origin The reference point coordinates
 * @param destinations Array of all destinations
 * @param radiusMiles Maximum distance in miles
 * @param limitPerType Maximum results per type
 */
export function groupNearbyByType<T extends DestinationRef>(
  origin: Coordinates,
  destinations: T[],
  radiusMiles = 30,
  limitPerType = 3
): Record<string, Array<T & { distanceMiles: number }>> {
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
    {} as Record<string, Array<T & { distanceMiles: number }>>
  );
}

/**
 * Format distance for display
 * @param miles Distance in miles
 * @returns Formatted string (e.g., "5 miles", "0.5 miles", "< 1 mile")
 */
export function formatDistance(miles: number): string {
  if (miles < 0.5) return '< 1 mile';
  if (miles < 1) return '< 1 mile';
  if (miles < 10) return `${miles.toFixed(1)} miles`;
  return `${Math.round(miles)} miles`;
}

/**
 * Generate cross-link URL for a destination
 * @param type Destination type
 * @param slug Destination slug
 * @returns URL path
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
