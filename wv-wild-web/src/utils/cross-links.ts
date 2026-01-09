/**
 * Cross-Link Utilities for Adventure Hub
 * SPEC-24: Geographic proximity and related destination discovery
 *
 * Uses Turf.js (MIT License) for geospatial calculations.
 * Supports hybrid coordinate formats:
 * - Internal: GeoJSON standard [longitude, latitude] (satellite GPS format)
 * - External: {lat, lng} object format (backward compatible with existing data)
 *
 * STATUS: Foundation utility for SPEC-24+ cross-linking features.
 * Integration planned for lake/campground/WMA template "Nearby Destinations" sections.
 * See CLAUDE.md "Cross-Linking Philosophy" for usage patterns.
 *
 * @see https://turfjs.org/ - Turf.js geospatial library
 */

import { distance, point, booleanValid } from '@turf/turf';
import type { Feature, Point, Position } from 'geojson';

// ============================================================================
// COORDINATE TYPES - Hybrid GPS/Satellite Format
// ============================================================================

/**
 * Standard lat/lng coordinate format used in WVWO data files.
 * This is the external-facing format for backward compatibility.
 */
export interface Coordinates {
  lat: number;
  lng: number;
}

/**
 * GeoJSON Position format [longitude, latitude] - satellite GPS standard.
 * Used internally by Turf.js for calculations.
 */
export type GeoJSONPosition = Position;

/**
 * Destination reference with optional coordinates.
 * Coordinates can be provided in either format.
 */
export interface DestinationRef {
  slug: string;
  name: string;
  type: string;
  /** Standard {lat, lng} format */
  coordinates?: Coordinates;
  /** Alternative GeoJSON [lng, lat] format for satellite GPS compatibility */
  geoJson?: GeoJSONPosition;
}

// ============================================================================
// COORDINATE CONVERSION UTILITIES
// ============================================================================

/**
 * Convert {lat, lng} to GeoJSON [longitude, latitude] format.
 * GeoJSON uses [lng, lat] order (satellite GPS standard).
 */
export function toGeoJSON(coords: Coordinates): GeoJSONPosition {
  return [coords.lng, coords.lat];
}

/**
 * Convert GeoJSON [longitude, latitude] to {lat, lng} format.
 */
export function fromGeoJSON(position: GeoJSONPosition): Coordinates {
  return { lat: position[1], lng: position[0] };
}

/**
 * Create a Turf.js Point feature from coordinates.
 * Accepts either {lat, lng} or [lng, lat] format.
 */
export function toPoint(coords: Coordinates | GeoJSONPosition): Feature<Point> {
  if (Array.isArray(coords)) {
    return point(coords);
  }
  return point(toGeoJSON(coords));
}

// ============================================================================
// COORDINATE VALIDATION
// ============================================================================

/**
 * Validate a GeoJSON Point feature using Turf.js.
 */
export function isValidGeoJSONPoint(pt: Feature<Point>): boolean {
  return booleanValid(pt);
}

/**
 * Type guard for destinations with valid coordinates.
 * Validates presence, numeric types, and geographic ranges.
 * Pure function - does not mutate input.
 */
export function hasCoordinates<T extends DestinationRef>(
  dest: T
): dest is T & { coordinates: Coordinates } {
  // Check standard coordinates format
  if (dest.coordinates !== undefined) {
    const { lat, lng } = dest.coordinates;
    return (
      typeof lat === 'number' &&
      typeof lng === 'number' &&
      lat >= -90 && lat <= 90 &&
      lng >= -180 && lng <= 180
    );
  }
  return false;
}

/**
 * Type guard for destinations with valid GeoJSON coordinates.
 */
export function hasGeoJson<T extends DestinationRef>(
  dest: T
): dest is T & { geoJson: GeoJSONPosition } {
  if (dest.geoJson === undefined) return false;
  const [lng, lat] = dest.geoJson;
  return (
    typeof lat === 'number' &&
    typeof lng === 'number' &&
    lat >= -90 && lat <= 90 &&
    lng >= -180 && lng <= 180
  );
}

/**
 * Get coordinates from a destination, supporting both formats.
 * Returns null if no valid coordinates exist.
 */
export function getCoordinates(dest: DestinationRef): Coordinates | null {
  if (hasCoordinates(dest)) return dest.coordinates;
  if (hasGeoJson(dest)) return fromGeoJSON(dest.geoJson);
  return null;
}

// ============================================================================
// DISTANCE CALCULATIONS (Turf.js powered)
// ============================================================================

/**
 * Compute the great-circle distance between two coordinates using Turf.js.
 * Uses Haversine formula internally for accuracy.
 *
 * @param point1 - Origin coordinate ({lat, lng} or [lng, lat])
 * @param point2 - Destination coordinate ({lat, lng} or [lng, lat])
 * @returns Distance in miles
 */
export function haversineDistance(
  point1: Coordinates | GeoJSONPosition,
  point2: Coordinates | GeoJSONPosition
): number {
  const from = toPoint(point1);
  const to = toPoint(point2);
  return distance(from, to, { units: 'miles' });
}

/**
 * Calculate distance in kilometers (for international use).
 */
export function distanceKilometers(
  point1: Coordinates | GeoJSONPosition,
  point2: Coordinates | GeoJSONPosition
): number {
  const from = toPoint(point1);
  const to = toPoint(point2);
  return distance(from, to, { units: 'kilometers' });
}

// ============================================================================
// NEARBY DESTINATION DISCOVERY
// ============================================================================

/**
 * Locate nearby destinations from an origin within a maximum radius.
 * Supports both {lat, lng} and GeoJSON coordinate formats.
 *
 * NOTE: Excludes destinations at distance=0 (same location as origin).
 * This prevents self-referencing when finding nearby destinations.
 *
 * @param origin - Reference coordinates to measure distances from
 * @param destinations - Candidate destinations to search
 * @param radiusMiles - Maximum distance in miles to include (default: 30)
 * @param limit - Maximum number of results to return (default: 5)
 * @returns An array of destinations augmented with `distanceMiles`, sorted by nearest first
 */
export function findNearbyDestinations<T extends DestinationRef>(
  origin: Coordinates | GeoJSONPosition,
  destinations: T[],
  radiusMiles = 30,
  limit = 5
): Array<T & { coordinates: Coordinates; distanceMiles: number }> {
  const originPoint = toPoint(origin);

  return destinations
    .map((dest) => {
      const coords = getCoordinates(dest);
      if (!coords) return null;
      return {
        ...dest,
        coordinates: coords,
        distanceMiles: distance(originPoint, toPoint(coords), { units: 'miles' }),
      };
    })
    .filter((dest): dest is NonNullable<typeof dest> =>
      dest !== null && dest.distanceMiles <= radiusMiles && dest.distanceMiles > 0
    )
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
  origin: Coordinates | GeoJSONPosition,
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
 * Considers destinations within `radiusMiles` of `origin` and returns up to
 * `limitPerType` items for each destination `type`. Each returned item
 * includes a `distanceMiles` property.
 *
 * @param origin - Reference coordinates used to measure distance
 * @param destinations - Candidate destinations to consider
 * @param radiusMiles - Maximum distance in miles to include a destination
 * @param limitPerType - Maximum number of destinations to include per type
 * @param maxSearchResults - Cap on total destinations searched before grouping.
 *   Defaults to 100 to balance coverage with performance. Increase if you have
 *   many destination types and need more results per type.
 * @returns A record mapping each destination `type` to an array of destinations augmented with `distanceMiles`
 */
export function groupNearbyByType<T extends DestinationRef>(
  origin: Coordinates | GeoJSONPosition,
  destinations: T[],
  radiusMiles = 30,
  limitPerType = 3,
  maxSearchResults = 100
): Record<string, Array<T & { coordinates: Coordinates; distanceMiles: number }>> {
  const nearby = findNearbyDestinations(origin, destinations, radiusMiles, maxSearchResults);

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

// ============================================================================
// DISPLAY FORMATTING
// ============================================================================

/**
 * Convert a numeric distance in miles into a human-friendly display string.
 * Handles singular/plural correctly (e.g., "1 mile" not "1.0 miles").
 *
 * @param miles - Distance in miles (must be non-negative finite number)
 * @returns Formatted string, or throws for invalid input
 * @throws Error if miles is negative, NaN, or Infinity
 */
export function formatDistance(miles: number): string {
  if (!Number.isFinite(miles)) {
    throw new Error('Distance must be a finite number');
  }
  if (miles < 0) {
    throw new Error('Distance cannot be negative');
  }
  if (miles === 0) return 'same location';
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
 * Format coordinates for display in satellite GPS format.
 * @example "38.6620°N, 80.6932°W"
 */
export function formatCoordinatesGPS(coords: Coordinates): string {
  const latDir = coords.lat >= 0 ? 'N' : 'S';
  const lngDir = coords.lng >= 0 ? 'E' : 'W';
  return `${Math.abs(coords.lat).toFixed(4)}°${latDir}, ${Math.abs(coords.lng).toFixed(4)}°${lngDir}`;
}

/**
 * Format coordinates for display in decimal format.
 * @example "38.6620, -80.6932"
 */
export function formatCoordinatesDecimal(coords: Coordinates): string {
  return `${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}`;
}

// ============================================================================
// URL GENERATION
// ============================================================================

/**
 * Types with schema entries but no route files yet.
 * Returns null instead of generating broken links.
 */
const PENDING_ROUTE_TYPES = new Set([
  'mountain-biking',
  'scenic-byway',
  'outfitter',
]);

/**
 * Generates a cross-link URL path for a destination.
 *
 * Returns null for types without implemented routes to prevent broken links.
 *
 * @param type - Destination type used to select the route (e.g., `historic`, `backcountry`, or a generic type)
 * @param slug - Destination slug to append to the route
 * @returns The URL path for the destination, or null if route doesn't exist yet
 */
export function getCrossLinkUrl(type: string, slug: string): string | null {
  // Guard against types without routes yet
  if (PENDING_ROUTE_TYPES.has(type)) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[cross-links] Route pending for type "${type}" - no link generated`);
    }
    return null;
  }

  // Special cases for non-standard routes
  const specialRoutes: Record<string, string> = {
    historic: '/historic/',
    backcountry: '/backcountry/',
  };

  const base = specialRoutes[type] || `/near/${type}/`;
  return `${base}${slug}/`;
}
