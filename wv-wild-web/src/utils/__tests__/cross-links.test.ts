/**
 * Cross-Link Utilities Test Suite
 * SPEC-24: Comprehensive test coverage for geospatial utilities
 *
 * Target Coverage: 85%+ for all critical functions
 */

import { describe, test, expect } from 'vitest';
import {
  // Coordinate conversion
  toGeoJSON,
  fromGeoJSON,
  toPoint,
  // Validation
  hasCoordinates,
  hasGeoJson,
  getCoordinates,
  isValidGeoJSONPoint,
  // Distance calculations
  haversineDistance,
  distanceKilometers,
  // Nearby discovery
  findNearbyDestinations,
  findNearbyByType,
  groupNearbyByType,
  // Formatting
  formatDistance,
  formatCoordinatesGPS,
  formatCoordinatesDecimal,
  // URL generation
  getCrossLinkUrl,
  type Coordinates,
  type GeoJSONPosition,
  type DestinationRef,
} from '../cross-links';

// ============================================================================
// TEST DATA
// ============================================================================

const suttonLake: Coordinates = { lat: 38.66099900000000, lng: -80.69534700000000 };
const summersvilleLake: Coordinates = { lat: 38.2310, lng: -80.8521 };
const burnsvilleLake: Coordinates = { lat: 38.8454, lng: -80.6173 };

const testDestinations: DestinationRef[] = [
  { slug: 'sutton', name: 'Sutton Lake', type: 'lake', coordinates: suttonLake },
  { slug: 'summersville', name: 'Summersville Lake', type: 'lake', coordinates: summersvilleLake },
  { slug: 'burnsville', name: 'Burnsville Lake', type: 'lake', coordinates: burnsvilleLake },
  { slug: 'elk-river', name: 'Elk River WMA', type: 'wma', coordinates: { lat: 38.629, lng: -80.565 } },
  { slug: 'no-coords', name: 'No Coordinates', type: 'lake' }, // Missing coordinates
];

// ============================================================================
// COORDINATE CONVERSION TESTS
// ============================================================================

describe('Coordinate Conversions', () => {
  describe('toGeoJSON', () => {
    test('converts {lat, lng} to [lng, lat] format', () => {
      const result = toGeoJSON(suttonLake);
      expect(result).toEqual([-80.69534700000000, 38.66099900000000]);
      expect(result[0]).toBe(suttonLake.lng); // longitude first
      expect(result[1]).toBe(suttonLake.lat); // latitude second
    });

    test('handles negative coordinates', () => {
      const coords: Coordinates = { lat: -33.8688, lng: 151.2093 }; // Sydney
      const result = toGeoJSON(coords);
      expect(result).toEqual([151.2093, -33.8688]);
    });

    test('handles zero coordinates', () => {
      const coords: Coordinates = { lat: 0, lng: 0 }; // Null Island
      const result = toGeoJSON(coords);
      expect(result).toEqual([0, 0]);
    });
  });

  describe('fromGeoJSON', () => {
    test('converts [lng, lat] to {lat, lng} format', () => {
      const geoJson: GeoJSONPosition = [-80.69534700000000, 38.66099900000000];
      const result = fromGeoJSON(geoJson);
      expect(result).toEqual(suttonLake);
      expect(result.lat).toBe(geoJson[1]);
      expect(result.lng).toBe(geoJson[0]);
    });

    test('handles negative coordinates', () => {
      const geoJson: GeoJSONPosition = [151.2093, -33.8688]; // Sydney
      const result = fromGeoJSON(geoJson);
      expect(result).toEqual({ lat: -33.8688, lng: 151.2093 });
    });
  });

  describe('toPoint', () => {
    test('creates Turf.js Point from {lat, lng}', () => {
      const point = toPoint(suttonLake);
      expect(point.type).toBe('Feature');
      expect(point.geometry.type).toBe('Point');
      expect(point.geometry.coordinates).toEqual([-80.69534700000000, 38.66099900000000]);
    });

    test('creates Turf.js Point from [lng, lat]', () => {
      const geoJson: GeoJSONPosition = [-80.69534700000000, 38.66099900000000];
      const point = toPoint(geoJson);
      expect(point.type).toBe('Feature');
      expect(point.geometry.coordinates).toEqual(geoJson);
    });
  });
});

// ============================================================================
// COORDINATE VALIDATION TESTS
// ============================================================================

describe('Coordinate Validation', () => {
  describe('hasCoordinates', () => {
    test('returns true for valid coordinates', () => {
      const dest: DestinationRef = { slug: 'test', name: 'Test', type: 'lake', coordinates: suttonLake };
      expect(hasCoordinates(dest)).toBe(true);
    });

    test('returns false for missing coordinates', () => {
      const dest: DestinationRef = { slug: 'test', name: 'Test', type: 'lake' };
      expect(hasCoordinates(dest)).toBe(false);
    });

    test('returns false for out-of-range latitude', () => {
      const dest: DestinationRef = { slug: 'test', name: 'Test', type: 'lake', coordinates: { lat: 91, lng: 0 } };
      expect(hasCoordinates(dest)).toBe(false);
    });

    test('returns false for out-of-range longitude', () => {
      const dest: DestinationRef = { slug: 'test', name: 'Test', type: 'lake', coordinates: { lat: 0, lng: 181 } };
      expect(hasCoordinates(dest)).toBe(false);
    });

    test('returns false for NaN latitude', () => {
      const dest: DestinationRef = { slug: 'test', name: 'Test', type: 'lake', coordinates: { lat: NaN, lng: 0 } };
      expect(hasCoordinates(dest)).toBe(false);
    });

    test('returns false for Infinity longitude', () => {
      const dest: DestinationRef = { slug: 'test', name: 'Test', type: 'lake', coordinates: { lat: 0, lng: Infinity } };
      expect(hasCoordinates(dest)).toBe(false);
    });

    test('accepts boundary values (-90, -180)', () => {
      const dest: DestinationRef = { slug: 'test', name: 'Test', type: 'lake', coordinates: { lat: -90, lng: -180 } };
      expect(hasCoordinates(dest)).toBe(true);
    });

    test('accepts boundary values (90, 180)', () => {
      const dest: DestinationRef = { slug: 'test', name: 'Test', type: 'lake', coordinates: { lat: 90, lng: 180 } };
      expect(hasCoordinates(dest)).toBe(true);
    });
  });

  describe('hasGeoJson', () => {
    test('returns true for valid GeoJSON coordinates', () => {
      const dest: DestinationRef = { slug: 'test', name: 'Test', type: 'lake', geoJson: [-80.695, 38.661] };
      expect(hasGeoJson(dest)).toBe(true);
    });

    test('returns false for missing geoJson', () => {
      const dest: DestinationRef = { slug: 'test', name: 'Test', type: 'lake' };
      expect(hasGeoJson(dest)).toBe(false);
    });

    test('returns false for out-of-range values', () => {
      const dest: DestinationRef = { slug: 'test', name: 'Test', type: 'lake', geoJson: [181, 91] };
      expect(hasGeoJson(dest)).toBe(false);
    });

    test('returns false for NaN values', () => {
      const dest: DestinationRef = { slug: 'test', name: 'Test', type: 'lake', geoJson: [NaN, NaN] };
      expect(hasGeoJson(dest)).toBe(false);
    });
  });

  describe('getCoordinates', () => {
    test('returns coordinates when present', () => {
      const dest: DestinationRef = { slug: 'test', name: 'Test', type: 'lake', coordinates: suttonLake };
      expect(getCoordinates(dest)).toEqual(suttonLake);
    });

    test('converts geoJson to coordinates when coordinates missing', () => {
      const dest: DestinationRef = { slug: 'test', name: 'Test', type: 'lake', geoJson: [-80.695, 38.661] };
      const result = getCoordinates(dest);
      expect(result).toEqual({ lat: 38.661, lng: -80.695 });
    });

    test('returns null when both formats missing', () => {
      const dest: DestinationRef = { slug: 'test', name: 'Test', type: 'lake' };
      expect(getCoordinates(dest)).toBeNull();
    });

    test('prefers coordinates over geoJson when both present', () => {
      const dest: DestinationRef = {
        slug: 'test',
        name: 'Test',
        type: 'lake',
        coordinates: suttonLake,
        geoJson: [-80.0, 38.0],
      };
      expect(getCoordinates(dest)).toEqual(suttonLake);
    });
  });

  describe('isValidGeoJSONPoint', () => {
    test('validates correct GeoJSON Point', () => {
      const point = toPoint(suttonLake);
      expect(isValidGeoJSONPoint(point)).toBe(true);
    });
  });
});

// ============================================================================
// DISTANCE CALCULATION TESTS
// ============================================================================

describe('Distance Calculations', () => {
  describe('haversineDistance', () => {
    test('calculates distance between Sutton and Summersville lakes', () => {
      const distance = haversineDistance(suttonLake, summersvilleLake);
      // Known distance: ~30 miles
      expect(distance).toBeGreaterThan(29);
      expect(distance).toBeLessThan(32);
    });

    test('returns 0 for same location', () => {
      const distance = haversineDistance(suttonLake, suttonLake);
      expect(distance).toBe(0);
    });

    test('accepts GeoJSON format', () => {
      const geoJson1: GeoJSONPosition = [-80.695, 38.661];
      const geoJson2: GeoJSONPosition = [-80.852, 38.231];
      const distance = haversineDistance(geoJson1, geoJson2);
      expect(distance).toBeGreaterThan(29);
    });

    test('handles mixed formats', () => {
      const geoJson: GeoJSONPosition = [-80.852, 38.231];
      const distance = haversineDistance(suttonLake, geoJson);
      expect(distance).toBeGreaterThan(29);
    });
  });

  describe('distanceKilometers', () => {
    test('calculates distance in kilometers', () => {
      const distanceMiles = haversineDistance(suttonLake, summersvilleLake);
      const distanceKm = distanceKilometers(suttonLake, summersvilleLake);
      // 1 mile ≈ 1.609 km
      expect(distanceKm).toBeCloseTo(distanceMiles * 1.609, 1);
    });
  });
});

// ============================================================================
// NEARBY DESTINATION DISCOVERY TESTS
// ============================================================================

describe('Nearby Destination Discovery', () => {
  describe('findNearbyDestinations', () => {
    test('finds destinations within radius', () => {
      const results = findNearbyDestinations(suttonLake, testDestinations, 50, 5);
      expect(results.length).toBeGreaterThan(0);
      expect(results.length).toBeLessThanOrEqual(5);
      results.forEach((dest) => {
        expect(dest.distanceMiles).toBeLessThanOrEqual(50);
        expect(dest.distanceMiles).toBeGreaterThan(0);
      });
    });

    test('sorts results by distance (nearest first)', () => {
      const results = findNearbyDestinations(suttonLake, testDestinations, 100, 10);
      for (let i = 0; i < results.length - 1; i++) {
        expect(results[i].distanceMiles).toBeLessThanOrEqual(results[i + 1].distanceMiles);
      }
    });

    test('respects limit parameter', () => {
      const results = findNearbyDestinations(suttonLake, testDestinations, 100, 2);
      expect(results.length).toBeLessThanOrEqual(2);
    });

    test('excludes destinations at distance=0 (same location)', () => {
      const results = findNearbyDestinations(suttonLake, testDestinations, 100, 10);
      const selfReference = results.find((d) => d.slug === 'sutton');
      expect(selfReference).toBeUndefined();
    });

    test('excludes destinations without valid coordinates', () => {
      const results = findNearbyDestinations(suttonLake, testDestinations, 100, 10);
      const noCoords = results.find((d) => d.slug === 'no-coords');
      expect(noCoords).toBeUndefined();
    });

    test('throws on non-finite radiusMiles', () => {
      expect(() => findNearbyDestinations(suttonLake, testDestinations, NaN, 5)).toThrow('radiusMiles must be a finite number');
      expect(() => findNearbyDestinations(suttonLake, testDestinations, Infinity, 5)).toThrow('radiusMiles must be a finite number');
    });

    test('throws on non-finite limit', () => {
      expect(() => findNearbyDestinations(suttonLake, testDestinations, 30, NaN)).toThrow('limit must be a finite number');
      expect(() => findNearbyDestinations(suttonLake, testDestinations, 30, Infinity)).toThrow('limit must be a finite number');
    });

    test('coerces negative radiusMiles to 0', () => {
      const results = findNearbyDestinations(suttonLake, testDestinations, -10, 5);
      expect(results).toHaveLength(0);
    });

    test('coerces negative limit to 0', () => {
      const results = findNearbyDestinations(suttonLake, testDestinations, 100, -5);
      expect(results).toHaveLength(0);
    });

    test('floors limit to integer', () => {
      const results = findNearbyDestinations(suttonLake, testDestinations, 100, 2.7);
      expect(results.length).toBeLessThanOrEqual(2);
    });
  });

  describe('findNearbyByType', () => {
    test('filters by single type', () => {
      const results = findNearbyByType(suttonLake, testDestinations, ['wma'], 100, 5);
      results.forEach((dest) => {
        expect(dest.type).toBe('wma');
      });
    });

    test('filters by multiple types', () => {
      const results = findNearbyByType(suttonLake, testDestinations, ['lake', 'wma'], 100, 5);
      results.forEach((dest) => {
        expect(['lake', 'wma']).toContain(dest.type);
      });
    });

    test('returns empty array when no types match', () => {
      const results = findNearbyByType(suttonLake, testDestinations, ['campground'], 100, 5);
      expect(results).toHaveLength(0);
    });
  });

  describe('groupNearbyByType', () => {
    test('groups results by destination type', () => {
      const results = groupNearbyByType(suttonLake, testDestinations, 100, 2, 10);
      expect(results).toHaveProperty('lake');
      expect(results).toHaveProperty('wma');
    });

    test('respects limitPerType', () => {
      const results = groupNearbyByType(suttonLake, testDestinations, 100, 2, 10);
      if (results.lake) {
        expect(results.lake.length).toBeLessThanOrEqual(2);
      }
    });

    test('returns empty record when no destinations found', () => {
      const results = groupNearbyByType(suttonLake, testDestinations, 1, 2, 10);
      expect(Object.keys(results)).toHaveLength(0);
    });
  });
});

// ============================================================================
// FORMATTING TESTS
// ============================================================================

describe('Distance Formatting', () => {
  describe('formatDistance', () => {
    test('formats zero distance', () => {
      expect(formatDistance(0)).toBe('same location');
    });

    test('formats distance < 1 mile', () => {
      expect(formatDistance(0.5)).toBe('< 1 mile');
      expect(formatDistance(0.9)).toBe('< 1 mile');
    });

    test('formats exact 1 mile (singular)', () => {
      expect(formatDistance(1.0)).toBe('1 mile');
    });

    test('formats distance 1-10 miles with one decimal', () => {
      expect(formatDistance(2.5)).toBe('2.5 miles');
      expect(formatDistance(9.7)).toBe('9.7 miles');
    });

    test('formats distance >= 10 miles as integer', () => {
      expect(formatDistance(10.4)).toBe('10 miles');
      expect(formatDistance(30.8)).toBe('31 miles');
    });

    test('throws on negative distance', () => {
      expect(() => formatDistance(-1)).toThrow('Distance cannot be negative');
    });

    test('throws on NaN', () => {
      expect(() => formatDistance(NaN)).toThrow('Distance must be a finite number');
    });

    test('throws on Infinity', () => {
      expect(() => formatDistance(Infinity)).toThrow('Distance must be a finite number');
    });
  });

  describe('formatCoordinatesGPS', () => {
    test('formats positive latitude/longitude', () => {
      const coords: Coordinates = { lat: 38.6610, lng: -80.6953 };
      const result = formatCoordinatesGPS(coords);
      expect(result).toContain('N');
      expect(result).toContain('W');
      expect(result).toBe('38.6610°N, 80.6953°W');
    });

    test('formats southern hemisphere', () => {
      const coords: Coordinates = { lat: -33.8688, lng: 151.2093 };
      const result = formatCoordinatesGPS(coords);
      expect(result).toContain('S');
      expect(result).toContain('E');
      expect(result).toBe('33.8688°S, 151.2093°E');
    });

    test('formats zero coordinates', () => {
      const coords: Coordinates = { lat: 0, lng: 0 };
      const result = formatCoordinatesGPS(coords);
      expect(result).toBe('0.0000°N, 0.0000°E');
    });
  });

  describe('formatCoordinatesDecimal', () => {
    test('formats decimal coordinates', () => {
      const result = formatCoordinatesDecimal(suttonLake);
      expect(result).toBe('38.6610, -80.6953');
    });

    test('shows negative sign for west/south', () => {
      const coords: Coordinates = { lat: -33.8688, lng: 151.2093 };
      const result = formatCoordinatesDecimal(coords);
      expect(result).toBe('-33.8688, 151.2093');
    });
  });
});

// ============================================================================
// URL GENERATION TESTS
// ============================================================================

describe('URL Generation', () => {
  describe('getCrossLinkUrl', () => {
    test('generates URL for lake type', () => {
      const url = getCrossLinkUrl('lake', 'sutton');
      expect(url).toBe('/near/lake/sutton/');
    });

    test('generates URL for wma type', () => {
      const url = getCrossLinkUrl('wma', 'elk-river');
      expect(url).toBe('/near/wma/elk-river/');
    });

    test('handles special route: historic', () => {
      const url = getCrossLinkUrl('historic', 'gad');
      expect(url).toBe('/historic/gad/');
    });

    test('handles special route: backcountry', () => {
      const url = getCrossLinkUrl('backcountry', 'otter-creek');
      expect(url).toBe('/backcountry/otter-creek/');
    });

    test('returns null for pending route types', () => {
      expect(getCrossLinkUrl('mountain-biking', 'test')).toBeNull();
      expect(getCrossLinkUrl('scenic-byway', 'test')).toBeNull();
      expect(getCrossLinkUrl('outfitter', 'test')).toBeNull();
    });

    test('generates generic route for unknown types', () => {
      const url = getCrossLinkUrl('campground', 'gerald-r-freeman');
      expect(url).toBe('/near/campground/gerald-r-freeman/');
    });
  });
});
