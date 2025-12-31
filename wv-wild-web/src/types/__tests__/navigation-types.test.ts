/**
 * Navigation Types Test Suite
 * SPEC-17: Backcountry Navigation Schema Validation
 *
 * Tests Zod schemas for:
 * - Coordinate formats (Lat/Long, UTM, DMS)
 * - USGS quad map references
 * - Compass declination
 * - Trail blazing systems
 * - Cell coverage status
 * - Satellite communication
 * - Offline map apps
 * - Complete backcountry navigation data
 *
 * @module types/__tests__/navigation-types
 */

import { describe, it, expect } from 'vitest';
import {
  LatLongSchema,
  UTMCoordinateSchema,
  CoordinateFormatSchema,
  USGSQuadSchema,
  CompassDeclinationSchema,
  BlazingReliabilitySchema,
  TrailBlazingSchema,
  CellSignalStrengthSchema,
  CellCoverageSchema,
  SatelliteDeviceSchema,
  SatelliteRecommendationSchema,
  OfflineMapAppSchema,
  OfflineMapRecommendationSchema,
  BackcountryAccessPointSchema,
  BackcountryNavigationSchema,
  formatDecimalToDMS,
  formatUTMDisplay,
  getCellCoverageColor,
  getCellCoverageLabel,
  getBlazingReliabilityColor,
  getBlazingReliabilityLabel,
  isSatelliteCritical,
  getWorstCellCoverage,
  type BackcountryAccessPoint,
} from '../navigation-types';

// ============================================================================
// COORDINATE SCHEMAS
// ============================================================================

describe('LatLongSchema', () => {
  it('accepts valid WV coordinates', () => {
    const result = LatLongSchema.safeParse({
      lat: 38.9234,
      lng: -79.5432,
    });
    expect(result.success).toBe(true);
  });

  it('accepts Spruce Knob coordinates (highest point in WV)', () => {
    const result = LatLongSchema.safeParse({
      lat: 38.7006,
      lng: -79.5322,
    });
    expect(result.success).toBe(true);
  });

  it('rejects latitude out of range', () => {
    const result = LatLongSchema.safeParse({
      lat: 100,
      lng: -79.5432,
    });
    expect(result.success).toBe(false);
  });

  it('rejects longitude out of range', () => {
    const result = LatLongSchema.safeParse({
      lat: 38.9234,
      lng: -200,
    });
    expect(result.success).toBe(false);
  });
});

describe('UTMCoordinateSchema', () => {
  it('accepts valid WV UTM Zone 17S coordinates', () => {
    const result = UTMCoordinateSchema.safeParse({
      zone: 17,
      band: 'S',
      easting: 612345,
      northing: 4312345,
    });
    expect(result.success).toBe(true);
  });

  it('accepts valid WV UTM Zone 18S coordinates', () => {
    const result = UTMCoordinateSchema.safeParse({
      zone: 18,
      band: 'S',
      easting: 234567,
      northing: 4298765,
    });
    expect(result.success).toBe(true);
  });

  it('rejects invalid zone band letter', () => {
    const result = UTMCoordinateSchema.safeParse({
      zone: 17,
      band: 'A', // A and B are not valid
      easting: 612345,
      northing: 4312345,
    });
    expect(result.success).toBe(false);
  });

  it('rejects easting out of range', () => {
    const result = UTMCoordinateSchema.safeParse({
      zone: 17,
      band: 'S',
      easting: 50000, // Too low
      northing: 4312345,
    });
    expect(result.success).toBe(false);
  });
});

describe('CoordinateFormatSchema', () => {
  it('accepts complete coordinate format with all fields', () => {
    const result = CoordinateFormatSchema.safeParse({
      decimal: { lat: 38.9234, lng: -79.5432 },
      dms: "38°55'24.2\"N 79°32'35.5\"W",
      utm: { zone: 17, band: 'S', easting: 612345, northing: 4312345 },
      displayLatLong: '38.9234, -79.5432',
      displayUTM: '17S 0612345 4312345',
      datum: 'WGS84',
      accuracyNote: 'Trailhead parking lot',
    });
    expect(result.success).toBe(true);
  });

  it('accepts minimal coordinate format', () => {
    const result = CoordinateFormatSchema.safeParse({
      decimal: { lat: 38.9234, lng: -79.5432 },
      displayLatLong: '38.9234, -79.5432',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.datum).toBe('WGS84'); // Default value
    }
  });

  it('rejects missing required displayLatLong', () => {
    const result = CoordinateFormatSchema.safeParse({
      decimal: { lat: 38.9234, lng: -79.5432 },
    });
    expect(result.success).toBe(false);
  });
});

// ============================================================================
// USGS QUAD MAP SCHEMA
// ============================================================================

describe('USGSQuadSchema', () => {
  it('accepts valid USGS quad for Spruce Knob', () => {
    const result = USGSQuadSchema.safeParse({
      name: 'Spruce Knob',
      scale: '1:24000',
      coverage: 'primary',
      revisionYear: 2019,
    });
    expect(result.success).toBe(true);
  });

  it('accepts quad with purchase URL', () => {
    const result = USGSQuadSchema.safeParse({
      name: 'Whitmer',
      quadId: '38079-G8-TF-024',
      scale: '1:24000',
      coverage: 'partial',
      purchaseUrl: 'https://store.usgs.gov/maps/whitmer',
    });
    expect(result.success).toBe(true);
  });

  it('defaults to 1:24000 scale', () => {
    const result = USGSQuadSchema.safeParse({
      name: 'Snyder Knob',
      coverage: 'edge',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.scale).toBe('1:24000');
    }
  });

  it('rejects empty quad name', () => {
    const result = USGSQuadSchema.safeParse({
      name: '',
      coverage: 'primary',
    });
    expect(result.success).toBe(false);
  });
});

// ============================================================================
// COMPASS DECLINATION SCHEMA
// ============================================================================

describe('CompassDeclinationSchema', () => {
  it('accepts valid WV declination (8.5 degrees West)', () => {
    const result = CompassDeclinationSchema.safeParse({
      degrees: -8.5,
      direction: 'W',
      display: '8.5° W',
      referenceYear: 2024,
      annualChange: -0.1,
      source: 'NOAA',
    });
    expect(result.success).toBe(true);
  });

  it('accepts minimal declination with defaults', () => {
    const result = CompassDeclinationSchema.safeParse({
      degrees: -8.5,
      direction: 'W',
      display: '8.5° W',
      referenceYear: 2024,
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.source).toBe('NOAA'); // Default
    }
  });

  it('rejects extreme declination values', () => {
    const result = CompassDeclinationSchema.safeParse({
      degrees: 45, // Too extreme
      direction: 'E',
      display: '45° E',
      referenceYear: 2024,
    });
    expect(result.success).toBe(false);
  });
});

// ============================================================================
// TRAIL BLAZING SCHEMA
// ============================================================================

describe('BlazingReliabilitySchema', () => {
  it.each([
    'well-maintained',
    'moderate',
    'faded',
    'intermittent',
    'unmarked',
  ])('accepts valid reliability level: %s', (level) => {
    const result = BlazingReliabilitySchema.safeParse(level);
    expect(result.success).toBe(true);
  });

  it('rejects invalid reliability level', () => {
    const result = BlazingReliabilitySchema.safeParse('excellent');
    expect(result.success).toBe(false);
  });
});

describe('TrailBlazingSchema', () => {
  it('accepts complete trail blazing info', () => {
    const result = TrailBlazingSchema.safeParse({
      system: 'Blue blaze',
      color: 'blue',
      shape: 'rectangle',
      reliability: 'well-maintained',
      notes: 'Reflective markers at night',
      lastMaintenance: 'October 2024',
      maintainedBy: 'Monongahela Trail Maintainers',
    });
    expect(result.success).toBe(true);
  });

  it('accepts minimal blazing info', () => {
    const result = TrailBlazingSchema.safeParse({
      system: 'White diamond',
      reliability: 'faded',
    });
    expect(result.success).toBe(true);
  });
});

// ============================================================================
// CELL COVERAGE SCHEMA
// ============================================================================

describe('CellSignalStrengthSchema', () => {
  it.each(['none', 'weak', 'moderate', 'strong'])('accepts valid signal: %s', (signal) => {
    const result = CellSignalStrengthSchema.safeParse(signal);
    expect(result.success).toBe(true);
  });
});

describe('CellCoverageSchema [P0]', () => {
  it('accepts complete cell coverage info', () => {
    const result = CellCoverageSchema.safeParse({
      status: 'none',
      carriers: [],
      nearestSignal: '2.5 miles east at Rt. 33',
      bestSpot: 'Top of ridge 0.5 miles north',
      notes: 'No coverage in valley',
      verifiedDate: 'December 2024',
    });
    expect(result.success).toBe(true);
  });

  it('accepts coverage with specific carriers', () => {
    const result = CellCoverageSchema.safeParse({
      status: 'weak',
      carriers: ['Verizon', 'US Cellular'],
      nearestSignal: '1 mile north on fire tower road',
    });
    expect(result.success).toBe(true);
  });

  it('accepts minimal coverage info', () => {
    const result = CellCoverageSchema.safeParse({
      status: 'strong',
    });
    expect(result.success).toBe(true);
  });
});

// ============================================================================
// SATELLITE COMMUNICATION SCHEMA
// ============================================================================

describe('SatelliteDeviceSchema', () => {
  it.each([
    'Garmin inReach',
    'SPOT',
    'Zoleo',
    'Apple Watch Ultra',
    'iPhone 14+',
    'Thuraya',
    'Iridium',
    'Starlink',
    'other',
  ])('accepts valid satellite device: %s', (device) => {
    const result = SatelliteDeviceSchema.safeParse(device);
    expect(result.success).toBe(true);
  });
});

describe('SatelliteRecommendationSchema', () => {
  it('accepts required satellite recommendation', () => {
    const result = SatelliteRecommendationSchema.safeParse({
      required: true,
      level: 'required',
      compatibleDevices: ['Garmin inReach', 'SPOT', 'Zoleo'],
      coverageNotes: 'May need clear sky view in valleys',
      emergencyNotes: 'SAR response time 4-6 hours in remote areas',
    });
    expect(result.success).toBe(true);
  });

  it('accepts optional satellite recommendation', () => {
    const result = SatelliteRecommendationSchema.safeParse({
      required: false,
      level: 'recommended',
    });
    expect(result.success).toBe(true);
  });
});

// ============================================================================
// OFFLINE MAP APPS SCHEMA
// ============================================================================

describe('OfflineMapAppSchema', () => {
  it.each([
    'Gaia GPS',
    'CalTopo',
    'Avenza Maps',
    'OnX Hunt',
    'AllTrails',
    'Hiking Project',
    'USGS Topo',
    'Google Maps Offline',
    'Apple Maps Offline',
    'Locus Map',
    'OsmAnd',
    'other',
  ])('accepts valid offline map app: %s', (app) => {
    const result = OfflineMapAppSchema.safeParse(app);
    expect(result.success).toBe(true);
  });
});

describe('OfflineMapRecommendationSchema', () => {
  it('accepts complete map recommendation', () => {
    const result = OfflineMapRecommendationSchema.safeParse({
      app: 'Gaia GPS',
      tier: 'paid',
      recommendedLayers: ['USGS Topo', 'Satellite hybrid'],
      downloadSize: '250 MB',
      features: ['Offline waypoints', 'Track recording', 'Weather overlay'],
    });
    expect(result.success).toBe(true);
  });

  it('accepts minimal map recommendation', () => {
    const result = OfflineMapRecommendationSchema.safeParse({
      app: 'AllTrails',
      tier: 'freemium',
    });
    expect(result.success).toBe(true);
  });
});

// ============================================================================
// BACKCOUNTRY ACCESS POINT SCHEMA
// ============================================================================

describe('BackcountryAccessPointSchema', () => {
  it('accepts complete access point for Spruce Knob trailhead', () => {
    const result = BackcountryAccessPointSchema.safeParse({
      name: 'Spruce Knob Trailhead',
      type: 'trailhead',
      coordinates: {
        decimal: { lat: 38.7006, lng: -79.5322 },
        displayLatLong: '38.7006, -79.5322',
        displayUTM: '17S 0612345 4312345',
        utm: { zone: 17, band: 'S', easting: 612345, northing: 4287000 },
      },
      cellCoverage: {
        status: 'none',
        nearestSignal: '3 miles east at Rt. 33',
      },
      satelliteRequired: true,
      satelliteRecommendation: {
        required: true,
        level: 'required',
        compatibleDevices: ['Garmin inReach', 'SPOT'],
      },
      facilities: ['Parking', 'Vault toilet', 'Picnic area'],
      roadConditions: 'Gravel road, maintained year-round',
      vehicleRequirements: 'gravel',
      distanceFromServices: '25 miles to Elkins',
      emergencyContact: 'Monongahela NF Ranger: 304-636-1800',
    });
    expect(result.success).toBe(true);
  });

  it('accepts minimal access point', () => {
    const result = BackcountryAccessPointSchema.safeParse({
      name: 'Forest Road 112 Gate',
      type: 'gate',
      coordinates: {
        decimal: { lat: 38.75, lng: -79.60 },
        displayLatLong: '38.75, -79.60',
      },
      cellCoverage: {
        status: 'weak',
      },
      satelliteRequired: false,
    });
    expect(result.success).toBe(true);
  });
});

// ============================================================================
// COMPLETE NAVIGATION SCHEMA
// ============================================================================

describe('BackcountryNavigationSchema', () => {
  const validNavigationData = {
    coordinates: {
      decimal: { lat: 38.7006, lng: -79.5322 },
      displayLatLong: '38.7006, -79.5322',
      displayUTM: '17S 0612345 4287000',
      utm: { zone: 17, band: 'S', easting: 612345, northing: 4287000 },
      datum: 'WGS84',
    },
    usgsQuads: [
      { name: 'Spruce Knob', coverage: 'primary', scale: '1:24000' },
      { name: 'Whitmer', coverage: 'partial', scale: '1:24000' },
    ],
    compassDeclination: {
      degrees: -8.5,
      direction: 'W',
      display: '8.5° W (2024)',
      referenceYear: 2024,
      annualChange: -0.1,
      source: 'NOAA',
    },
    trailBlazing: {
      system: 'Blue blaze',
      color: 'blue',
      reliability: 'well-maintained',
      maintainedBy: 'Allegheny Trail Alliance',
    },
    offlineMapApps: [
      { app: 'Gaia GPS', tier: 'paid', recommendedLayers: ['USGS Topo'] },
      { app: 'CalTopo', tier: 'freemium' },
      { app: 'Avenza Maps', tier: 'free' },
    ],
    navigationDifficulty: 'moderate',
    gpsReliability: 'reliable',
    gpsNotes: 'Reliable on ridges, intermittent in deep hollows',
    paperMapRequired: true,
    navigationTips: [
      'Download offline maps before leaving cell coverage',
      'Carry paper USGS quad as primary backup',
      'Compass declination is 8.5° West',
    ],
    satelliteRecommendation: {
      required: true,
      level: 'strongly-recommended',
      compatibleDevices: ['Garmin inReach', 'SPOT', 'Zoleo'],
      coverageNotes: 'Clear sky view needed, satellite check-in recommended',
      emergencyNotes: 'SAR response 2-4 hours from Elkins base',
    },
    nearestEmergencyServices: 'Davis Memorial Hospital, Elkins (25 miles)',
    sarJurisdiction: 'Randolph County Sheriff / Monongahela NF Rangers',
    emergencyFrequency: 'WV DNR Law Enforcement: 304-558-2784',
  };

  it('accepts complete navigation data', () => {
    const result = BackcountryNavigationSchema.safeParse(validNavigationData);
    expect(result.success).toBe(true);
  });

  it('requires at least one USGS quad', () => {
    const invalidData = { ...validNavigationData, usgsQuads: [] };
    const result = BackcountryNavigationSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('requires at least one offline map app', () => {
    const invalidData = { ...validNavigationData, offlineMapApps: [] };
    const result = BackcountryNavigationSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('defaults paperMapRequired to true', () => {
    const dataWithoutPaperMap = { ...validNavigationData };
    delete (dataWithoutPaperMap as any).paperMapRequired;
    const result = BackcountryNavigationSchema.safeParse(dataWithoutPaperMap);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.paperMapRequired).toBe(true);
    }
  });
});

// ============================================================================
// HELPER FUNCTION TESTS
// ============================================================================

describe('formatDecimalToDMS', () => {
  it('formats Spruce Knob coordinates correctly', () => {
    const result = formatDecimalToDMS(38.7006, -79.5322);
    expect(result).toMatch(/38°42'.*N 79°31'.*W/);
  });

  it('handles southern hemisphere coordinates', () => {
    const result = formatDecimalToDMS(-38.7006, -79.5322);
    expect(result).toMatch(/38°42'.*S 79°31'.*W/);
  });

  it('handles eastern hemisphere coordinates', () => {
    const result = formatDecimalToDMS(38.7006, 79.5322);
    expect(result).toMatch(/38°42'.*N 79°31'.*E/);
  });
});

describe('formatUTMDisplay', () => {
  it('formats UTM coordinates with proper padding', () => {
    const result = formatUTMDisplay({
      zone: 17,
      band: 'S',
      easting: 612345,
      northing: 4287000,
    });
    expect(result).toBe('17S 0612345 4287000');
  });

  it('handles zone 18', () => {
    const result = formatUTMDisplay({
      zone: 18,
      band: 'S',
      easting: 234567,
      northing: 4312345,
    });
    expect(result).toBe('18S 0234567 4312345');
  });
});

describe('getCellCoverageColor', () => {
  it('returns correct color for no coverage', () => {
    expect(getCellCoverageColor('none')).toBe('bg-red-800 text-white');
  });

  it('returns correct color for weak coverage', () => {
    expect(getCellCoverageColor('weak')).toBe('bg-brand-orange text-brand-brown');
  });

  it('returns correct color for strong coverage', () => {
    expect(getCellCoverageColor('strong')).toBe('bg-sign-green text-white');
  });
});

describe('getCellCoverageLabel', () => {
  it('returns correct label for no coverage', () => {
    expect(getCellCoverageLabel('none')).toBe('No Coverage');
  });

  it('returns correct label for strong coverage', () => {
    expect(getCellCoverageLabel('strong')).toBe('Strong Signal');
  });
});

describe('getBlazingReliabilityColor', () => {
  it('returns correct color for well-maintained', () => {
    expect(getBlazingReliabilityColor('well-maintained')).toBe('bg-sign-green text-white');
  });

  it('returns correct color for unmarked', () => {
    expect(getBlazingReliabilityColor('unmarked')).toBe('bg-red-900 text-white');
  });
});

describe('getBlazingReliabilityLabel', () => {
  it('returns correct label for well-maintained', () => {
    expect(getBlazingReliabilityLabel('well-maintained')).toBe('Well Maintained');
  });

  it('returns correct label for unmarked', () => {
    expect(getBlazingReliabilityLabel('unmarked')).toBe('Unmarked Trail');
  });
});

describe('isSatelliteCritical [P0]', () => {
  it('returns true if any access point has no cell coverage', () => {
    const accessPoints: BackcountryAccessPoint[] = [
      {
        name: 'Point A',
        type: 'trailhead',
        coordinates: { decimal: { lat: 38.7, lng: -79.5 }, displayLatLong: '38.7, -79.5', datum: 'WGS84' },
        cellCoverage: { status: 'strong' },
        satelliteRequired: false,
      },
      {
        name: 'Point B',
        type: 'trailhead',
        coordinates: { decimal: { lat: 38.8, lng: -79.6 }, displayLatLong: '38.8, -79.6', datum: 'WGS84' },
        cellCoverage: { status: 'none' },
        satelliteRequired: false,
      },
    ];
    expect(isSatelliteCritical(accessPoints)).toBe(true);
  });

  it('returns true if any access point requires satellite', () => {
    const accessPoints: BackcountryAccessPoint[] = [
      {
        name: 'Point A',
        type: 'trailhead',
        coordinates: { decimal: { lat: 38.7, lng: -79.5 }, displayLatLong: '38.7, -79.5', datum: 'WGS84' },
        cellCoverage: { status: 'moderate' },
        satelliteRequired: true,
      },
    ];
    expect(isSatelliteCritical(accessPoints)).toBe(true);
  });

  it('returns false if all points have coverage and no satellite required', () => {
    const accessPoints: BackcountryAccessPoint[] = [
      {
        name: 'Point A',
        type: 'trailhead',
        coordinates: { decimal: { lat: 38.7, lng: -79.5 }, displayLatLong: '38.7, -79.5', datum: 'WGS84' },
        cellCoverage: { status: 'strong' },
        satelliteRequired: false,
      },
      {
        name: 'Point B',
        type: 'parking',
        coordinates: { decimal: { lat: 38.8, lng: -79.6 }, displayLatLong: '38.8, -79.6', datum: 'WGS84' },
        cellCoverage: { status: 'moderate' },
        satelliteRequired: false,
      },
    ];
    expect(isSatelliteCritical(accessPoints)).toBe(false);
  });
});

describe('getWorstCellCoverage', () => {
  it('returns none if any point has no coverage', () => {
    const accessPoints: BackcountryAccessPoint[] = [
      {
        name: 'Point A',
        type: 'trailhead',
        coordinates: { decimal: { lat: 38.7, lng: -79.5 }, displayLatLong: '38.7, -79.5', datum: 'WGS84' },
        cellCoverage: { status: 'strong' },
        satelliteRequired: false,
      },
      {
        name: 'Point B',
        type: 'trailhead',
        coordinates: { decimal: { lat: 38.8, lng: -79.6 }, displayLatLong: '38.8, -79.6', datum: 'WGS84' },
        cellCoverage: { status: 'none' },
        satelliteRequired: false,
      },
    ];
    expect(getWorstCellCoverage(accessPoints)).toBe('none');
  });

  it('returns weak if worst is weak', () => {
    const accessPoints: BackcountryAccessPoint[] = [
      {
        name: 'Point A',
        type: 'trailhead',
        coordinates: { decimal: { lat: 38.7, lng: -79.5 }, displayLatLong: '38.7, -79.5', datum: 'WGS84' },
        cellCoverage: { status: 'strong' },
        satelliteRequired: false,
      },
      {
        name: 'Point B',
        type: 'trailhead',
        coordinates: { decimal: { lat: 38.8, lng: -79.6 }, displayLatLong: '38.8, -79.6', datum: 'WGS84' },
        cellCoverage: { status: 'weak' },
        satelliteRequired: false,
      },
    ];
    expect(getWorstCellCoverage(accessPoints)).toBe('weak');
  });

  it('returns strong if all points have strong coverage', () => {
    const accessPoints: BackcountryAccessPoint[] = [
      {
        name: 'Point A',
        type: 'trailhead',
        coordinates: { decimal: { lat: 38.7, lng: -79.5 }, displayLatLong: '38.7, -79.5', datum: 'WGS84' },
        cellCoverage: { status: 'strong' },
        satelliteRequired: false,
      },
    ];
    expect(getWorstCellCoverage(accessPoints)).toBe('strong');
  });
});
