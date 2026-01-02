/**
 * Backcountry Navigation Type Definitions
 * SPEC-17: Comprehensive navigation data for WV wilderness areas
 *
 * CRITICAL CONTEXT:
 * West Virginia backcountry often lacks reliable GPS/cell coverage.
 * These schemas provide the data structures necessary for:
 * - Multi-format coordinate display (Lat/Long + UTM)
 * - USGS quad map references for paper navigation
 * - Compass declination for magnetic navigation
 * - Trail blazing/marker systems
 * - Cell coverage status per access point
 * - Satellite communication recommendations
 * - Offline map app compatibility
 *
 * SAFETY NOTE:
 * This data is safety-critical. Hikers and hunters in remote WV areas
 * MUST have access to paper maps, compass skills, and offline navigation
 * when electronic devices fail.
 *
 * @module types/navigation-types
 */

import { z } from 'astro/zod';

// ============================================================================
// COORDINATE FORMAT SCHEMAS
// ============================================================================

/**
 * Latitude/Longitude coordinate format.
 * Supports multiple display formats for maximum compatibility.
 */
export const LatLongSchema = z.object({
  /** Latitude in decimal degrees (e.g., 38.9234) */
  lat: z.number().min(-90).max(90),
  /** Longitude in decimal degrees (e.g., -79.5432) */
  lng: z.number().min(-180).max(180),
});

export type LatLong = z.infer<typeof LatLongSchema>;

/**
 * UTM (Universal Transverse Mercator) coordinate format.
 * Essential for USGS topographic maps and military grid reference.
 *
 * WV spans UTM zones 17S and 18S.
 */
export const UTMCoordinateSchema = z.object({
  /** UTM zone number (WV is typically 17 or 18) */
  zone: z.number().int().min(1).max(60),
  /** UTM zone letter (WV is typically S or T) */
  band: z.string().length(1).regex(/[C-X]/),
  /** Easting in meters (6-7 digits) */
  easting: z.number().int().min(100000).max(999999),
  /** Northing in meters (7 digits) */
  northing: z.number().int().min(0).max(9999999),
});

export type UTMCoordinate = z.infer<typeof UTMCoordinateSchema>;

/**
 * Complete coordinate format supporting multiple standards.
 * Provides both lat/long and UTM for maximum usability.
 */
export const CoordinateFormatSchema = z.object({
  /** Decimal degrees format (primary for GPS devices) */
  decimal: LatLongSchema,
  /** Degrees, minutes, seconds format string (e.g., "38°55'24.2\"N 79°32'35.5\"W") */
  dms: z.string().optional(),
  /** UTM format for topographic map navigation */
  utm: UTMCoordinateSchema.optional(),
  /** Formatted display string for lat/long (e.g., "38.9234, -79.5432") */
  displayLatLong: z.string(),
  /** Formatted display string for UTM (e.g., "17S 0612345 4312345") */
  displayUTM: z.string().optional(),
  /** Datum reference (almost always WGS84 for modern use) */
  datum: z.enum(['WGS84', 'NAD83', 'NAD27']).default('WGS84'),
  /** Accuracy/precision note (e.g., "Trailhead parking lot", "Approximate") */
  accuracyNote: z.string().optional(),
});

export type CoordinateFormat = z.infer<typeof CoordinateFormatSchema>;

// ============================================================================
// USGS QUAD MAP SCHEMA
// ============================================================================

/**
 * USGS 7.5-minute quadrangle map reference.
 * Essential for paper map navigation in backcountry.
 *
 * Each quad covers approximately 49-70 square miles depending on latitude.
 */
export const USGSQuadSchema = z.object({
  /** Quad name (e.g., "Spruce Knob", "Whitmer", "Snyder Knob") */
  name: z.string().min(1),
  /** USGS quad ID if known (e.g., "38079-G8-TF-024") */
  quadId: z.string().optional(),
  /** Map scale (almost always 1:24,000 for 7.5-minute quads) */
  scale: z.enum(['1:24000', '1:62500', '1:100000']).default('1:24000'),
  /** Coverage type for this adventure */
  coverage: z.enum(['primary', 'partial', 'edge']),
  /** Year of most recent revision if known */
  revisionYear: z.number().int().min(1900).max(2100).optional(),
  /** Where to purchase or download */
  purchaseUrl: z.string().url().optional(),
});

export type USGSQuad = z.infer<typeof USGSQuadSchema>;

// ============================================================================
// COMPASS & MAGNETIC DECLINATION SCHEMA
// ============================================================================

/**
 * Magnetic declination data for compass navigation.
 * CRITICAL: Declination changes over time and must include reference date.
 *
 * WV declination is approximately 8-10 degrees West (varies by location and year).
 */
export const CompassDeclinationSchema = z.object({
  /** Declination in degrees (negative = West, positive = East) */
  degrees: z.number().min(-30).max(30),
  /** Direction for display purposes */
  direction: z.enum(['W', 'E']),
  /** Formatted display string (e.g., "8.5° W") */
  display: z.string(),
  /** Reference year for this declination value */
  referenceYear: z.number().int().min(2000).max(2100),
  /** Annual change rate in degrees/year (typically ~0.1° for WV) */
  annualChange: z.number().optional(),
  /** Source of declination data */
  source: z.enum(['NOAA', 'USGS', 'estimated']).default('NOAA'),
});

export type CompassDeclination = z.infer<typeof CompassDeclinationSchema>;

// ============================================================================
// TRAIL BLAZING & MARKER SCHEMA
// ============================================================================

/**
 * Trail marking/blazing system reliability levels.
 */
export const BlazingReliabilitySchema = z.enum([
  'well-maintained',  // Clear, recent blazes; easy to follow
  'moderate',         // Visible but may require attention
  'faded',            // Old blazes, may be hard to spot
  'intermittent',     // Blazes present but inconsistent
  'unmarked',         // No official trail markers
]);

export type BlazingReliability = z.infer<typeof BlazingReliabilitySchema>;

/**
 * Trail blazing/marking system information.
 * Describes how trails are marked in the field.
 */
export const TrailBlazingSchema = z.object({
  /** Primary blaze system (e.g., "Blue blaze", "White diamond", "Orange rectangle") */
  system: z.string().min(1),
  /** Blaze color (e.g., "blue", "white", "orange") */
  color: z.string().optional(),
  /** Blaze shape if applicable (e.g., "rectangle", "diamond", "circle") */
  shape: z.string().optional(),
  /** Current reliability of trail markers */
  reliability: BlazingReliabilitySchema,
  /** Additional marking notes (e.g., "Cairns above treeline", "Reflective markers at night") */
  notes: z.string().optional(),
  /** Last known trail maintenance date */
  lastMaintenance: z.string().optional(),
  /** Trail organization responsible for maintenance */
  maintainedBy: z.string().optional(),
});

export type TrailBlazing = z.infer<typeof TrailBlazingSchema>;

// ============================================================================
// CELL COVERAGE SCHEMA
// ============================================================================

/**
 * Cell signal strength levels.
 */
export const CellSignalStrengthSchema = z.enum([
  'none',      // No signal available
  'weak',      // Intermittent, unreliable (1 bar)
  'moderate',  // Usable for calls/texts, slow data (2-3 bars)
  'strong',    // Reliable voice and data (4-5 bars)
]);

export type CellSignalStrength = z.infer<typeof CellSignalStrengthSchema>;

/**
 * Cell coverage information for a specific location.
 * CRITICAL for emergency planning in remote areas.
 */
export const CellCoverageSchema = z.object({
  /** Overall signal status at this location */
  status: CellSignalStrengthSchema,
  /** Carriers known to have service (if any) */
  carriers: z.array(z.string()).optional(),
  /** Direction/distance to nearest reliable signal (e.g., "2.5 miles east at Rt. 33") */
  nearestSignal: z.string().optional(),
  /** Best spot nearby for signal (e.g., "Top of ridge 0.5 miles north") */
  bestSpot: z.string().optional(),
  /** Notes about coverage reliability */
  notes: z.string().optional(),
  /** Last verified date */
  verifiedDate: z.string().optional(),
});

export type CellCoverage = z.infer<typeof CellCoverageSchema>;

// ============================================================================
// SATELLITE COMMUNICATION SCHEMA
// ============================================================================

/**
 * Satellite communication device compatibility.
 */
export const SatelliteDeviceSchema = z.enum([
  'Garmin inReach',
  'SPOT',
  'Zoleo',
  'Apple Watch Ultra',
  'iPhone 14+',
  'Thuraya',
  'Iridium',
  'Starlink',
  'other',
]);

export type SatelliteDevice = z.infer<typeof SatelliteDeviceSchema>;

/**
 * Satellite communication recommendation for backcountry areas.
 */
export const SatelliteRecommendationSchema = z.object({
  /** Whether satellite communication is required for this area */
  required: z.boolean(),
  /** Recommendation level */
  level: z.enum(['required', 'strongly-recommended', 'recommended', 'optional']),
  /** Compatible satellite devices */
  compatibleDevices: z.array(SatelliteDeviceSchema).optional(),
  /** Notes about satellite coverage (e.g., "May need clear sky view in valleys") */
  coverageNotes: z.string().optional(),
  /** Emergency SOS capability notes */
  emergencyNotes: z.string().optional(),
});

export type SatelliteRecommendation = z.infer<typeof SatelliteRecommendationSchema>;

// ============================================================================
// OFFLINE MAP APPS SCHEMA
// ============================================================================

/**
 * Offline map application compatibility.
 */
export const OfflineMapAppSchema = z.enum([
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
]);

export type OfflineMapApp = z.infer<typeof OfflineMapAppSchema>;

/**
 * Offline map recommendation.
 */
export const OfflineMapRecommendationSchema = z.object({
  /** App name */
  app: OfflineMapAppSchema,
  /** Whether free or paid version needed */
  tier: z.enum(['free', 'paid', 'freemium']),
  /** Map layer recommendations (e.g., "USGS Topo + Satellite hybrid") */
  recommendedLayers: z.array(z.string()).optional(),
  /** Download size estimate for area coverage */
  downloadSize: z.string().optional(),
  /** Specific features useful for this area */
  features: z.array(z.string()).optional(),
});

export type OfflineMapRecommendation = z.infer<typeof OfflineMapRecommendationSchema>;

// ============================================================================
// BACKCOUNTRY ACCESS POINT SCHEMA (Extended)
// ============================================================================

/**
 * Extended access point with full navigation and communication data.
 * Builds on basic access point with backcountry-specific fields.
 */
export const BackcountryAccessPointSchema = z.object({
  /** Access point name (e.g., "Spruce Knob Trailhead") */
  name: z.string().min(1),
  /** Access type */
  type: z.enum([
    'trailhead',
    'parking',
    'put-in',
    'take-out',
    'campground',
    'emergency-exit',
    'road-crossing',
    'gate',
  ]),
  /** Multi-format coordinates */
  coordinates: CoordinateFormatSchema,
  /** Cell coverage at this specific point */
  cellCoverage: CellCoverageSchema,
  /** Whether satellite communication is required/recommended from this point */
  satelliteRequired: z.boolean(),
  /** Satellite communication details */
  satelliteRecommendation: SatelliteRecommendationSchema.optional(),
  /** Available facilities (parking, restrooms, water, etc.) */
  facilities: z.array(z.string()).optional(),
  /** Access restrictions or seasonal closures */
  restrictions: z.string().optional(),
  /** Road conditions to reach this point */
  roadConditions: z.string().optional(),
  /** Whether high-clearance/4WD vehicle needed */
  vehicleRequirements: z.enum(['paved', 'gravel', 'high-clearance', '4wd-required']).optional(),
  /** Distance from nearest town/services */
  distanceFromServices: z.string().optional(),
  /** Emergency contact or ranger station nearby */
  emergencyContact: z.string().optional(),
});

export type BackcountryAccessPoint = z.infer<typeof BackcountryAccessPointSchema>;

// ============================================================================
// MAIN NAVIGATION SCHEMA
// ============================================================================

/**
 * Complete backcountry navigation data.
 * This schema provides all navigation information needed for safe travel
 * in WV wilderness areas where electronic navigation may fail.
 */
export const BackcountryNavigationSchema = z.object({
  // ---- Coordinate Information ----
  /** Primary coordinates in multiple formats */
  coordinates: CoordinateFormatSchema,

  // ---- Paper Map References ----
  /** USGS 7.5-minute quad maps covering this area */
  usgsQuads: z.array(USGSQuadSchema).min(1).max(10),

  // ---- Compass Navigation ----
  /** Current magnetic declination for compass use */
  compassDeclination: CompassDeclinationSchema,

  // ---- Trail Marking ----
  /** Primary trail blazing system */
  trailBlazing: TrailBlazingSchema.optional(),
  /** Additional trail systems if multiple exist */
  additionalBlazingSystems: z.array(TrailBlazingSchema).optional(),

  // ---- Offline Maps ----
  /** Recommended offline map applications */
  offlineMapApps: z.array(OfflineMapRecommendationSchema).min(1).max(10),

  // ---- GPS/Navigation Notes ----
  /** General navigation difficulty */
  navigationDifficulty: z.enum(['easy', 'moderate', 'challenging', 'expert']),
  /** GPS reliability in this area */
  gpsReliability: z.enum(['reliable', 'intermittent', 'unreliable', 'blocked']),
  /** Notes about GPS issues (e.g., "Canyon walls block signal in lower sections") */
  gpsNotes: z.string().optional(),
  /** Whether paper map/compass skills are required */
  paperMapRequired: z.boolean().default(true),
  /** Navigation tips from experience */
  navigationTips: z.array(z.string()).optional(),

  // ---- Emergency/Communication ----
  /** Overall satellite communication recommendation for the area */
  satelliteRecommendation: SatelliteRecommendationSchema,
  /** Simplified cell coverage summary (optional - prefer using accessPoints for detailed coverage) */
  cellCoverage: z.object({
    overall: z.enum(['none', 'weak', 'moderate', 'strong']),
    carriers: z.array(z.string()).optional(),
    notes: z.string().optional(),
    nearestSignal: z.string().optional(),
  }).optional(),
  /** Nearest emergency services */
  nearestEmergencyServices: z.string().optional(),
  /** SAR (Search and Rescue) jurisdiction */
  sarJurisdiction: z.string().optional(),
  /** Emergency frequency if applicable (e.g., "WV DNR dispatch: xxx-xxx-xxxx") */
  emergencyFrequency: z.string().optional(),
});

export type BackcountryNavigation = z.infer<typeof BackcountryNavigationSchema>;

// ============================================================================
// DISPLAY CONSTANTS
// ============================================================================

/**
 * Human-readable labels for cell coverage status.
 */
export const CELL_COVERAGE_LABELS: Record<CellSignalStrength, string> = {
  none: 'No Coverage',
  weak: 'Weak Signal',
  moderate: 'Moderate Signal',
  strong: 'Strong Signal',
};

/**
 * Tailwind color classes for cell coverage status badges.
 */
export const CELL_COVERAGE_COLORS: Record<CellSignalStrength, string> = {
  none: 'bg-red-800 text-white',
  weak: 'bg-brand-orange text-brand-brown',
  moderate: 'bg-yellow-600 text-black',
  strong: 'bg-sign-green text-white',
};

/**
 * Icon indicators for cell coverage (signal bars representation).
 */
export const CELL_COVERAGE_ICONS: Record<CellSignalStrength, string> = {
  none: '○○○○',
  weak: '●○○○',
  moderate: '●●○○',
  strong: '●●●●',
};

/**
 * Human-readable labels for blazing reliability.
 */
export const BLAZING_RELIABILITY_LABELS: Record<BlazingReliability, string> = {
  'well-maintained': 'Well Maintained',
  moderate: 'Moderate Condition',
  faded: 'Faded Blazes',
  intermittent: 'Intermittent Marking',
  unmarked: 'Unmarked Trail',
};

/**
 * Tailwind color classes for blazing reliability badges.
 */
export const BLAZING_RELIABILITY_COLORS: Record<BlazingReliability, string> = {
  'well-maintained': 'bg-sign-green text-white',
  moderate: 'bg-yellow-600 text-black',
  faded: 'bg-brand-orange text-brand-brown',
  intermittent: 'bg-red-700 text-white',
  unmarked: 'bg-red-900 text-white',
};

/**
 * Human-readable labels for navigation difficulty.
 */
export const NAVIGATION_DIFFICULTY_LABELS: Record<string, string> = {
  easy: 'Easy Navigation',
  moderate: 'Moderate Navigation',
  challenging: 'Challenging Navigation',
  expert: 'Expert Navigation Required',
};

/**
 * Human-readable labels for GPS reliability.
 */
export const GPS_RELIABILITY_LABELS: Record<string, string> = {
  reliable: 'GPS Reliable',
  intermittent: 'GPS Intermittent',
  unreliable: 'GPS Unreliable',
  blocked: 'GPS Blocked',
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Format decimal coordinates to DMS (degrees, minutes, seconds).
 *
 * @param lat - Latitude in decimal degrees
 * @param lng - Longitude in decimal degrees
 * @returns Formatted DMS string (e.g., "38°55'24.2\"N 79°32'35.5\"W")
 */
export function formatDecimalToDMS(lat: number, lng: number): string {
  const formatComponent = (value: number, isLat: boolean): string => {
    const absValue = Math.abs(value);
    const degrees = Math.floor(absValue);
    const minutesFloat = (absValue - degrees) * 60;
    const minutes = Math.floor(minutesFloat);
    const seconds = ((minutesFloat - minutes) * 60).toFixed(1);

    let direction: string;
    if (isLat) {
      direction = value >= 0 ? 'N' : 'S';
    } else {
      direction = value >= 0 ? 'E' : 'W';
    }

    return `${degrees}°${minutes}'${seconds}"${direction}`;
  };

  return `${formatComponent(lat, true)} ${formatComponent(lng, false)}`;
}

/**
 * Format UTM coordinates for display.
 *
 * @param utm - UTM coordinate object
 * @returns Formatted UTM string (e.g., "17S 0612345 4312345")
 */
export function formatUTMDisplay(utm: UTMCoordinate): string {
  const easting = utm.easting.toString().padStart(7, '0');
  const northing = utm.northing.toString().padStart(7, '0');
  return `${utm.zone}${utm.band} ${easting} ${northing}`;
}

/**
 * Get cell coverage badge classes.
 *
 * @param status - Cell signal strength
 * @returns Tailwind color classes string
 */
export function getCellCoverageColor(status: CellSignalStrength): string {
  return CELL_COVERAGE_COLORS[status];
}

/**
 * Get cell coverage label.
 *
 * @param status - Cell signal strength
 * @returns Human-readable label
 */
export function getCellCoverageLabel(status: CellSignalStrength): string {
  return CELL_COVERAGE_LABELS[status];
}

/**
 * Get blazing reliability badge classes.
 *
 * @param reliability - Blazing reliability level
 * @returns Tailwind color classes string
 */
export function getBlazingReliabilityColor(reliability: BlazingReliability): string {
  return BLAZING_RELIABILITY_COLORS[reliability];
}

/**
 * Get blazing reliability label.
 *
 * @param reliability - Blazing reliability level
 * @returns Human-readable label
 */
export function getBlazingReliabilityLabel(reliability: BlazingReliability): string {
  return BLAZING_RELIABILITY_LABELS[reliability];
}

/**
 * Determine if satellite communication is critical for an area.
 * Returns true if any access point has no cell coverage.
 *
 * @param accessPoints - Array of backcountry access points
 * @returns Boolean indicating if satellite is critical
 */
export function isSatelliteCritical(accessPoints: BackcountryAccessPoint[]): boolean {
  return accessPoints.some(
    (point) => point.cellCoverage.status === 'none' || point.satelliteRequired
  );
}

/**
 * Get the worst cell coverage status from a set of access points.
 * Useful for displaying overall area coverage warning.
 *
 * @param accessPoints - Array of backcountry access points
 * @returns Worst cell signal strength across all points
 */
export function getWorstCellCoverage(accessPoints: BackcountryAccessPoint[]): CellSignalStrength {
  const statusPriority: CellSignalStrength[] = ['none', 'weak', 'moderate', 'strong'];

  let worstIndex = 3; // Start with 'strong'
  for (const point of accessPoints) {
    const index = statusPriority.indexOf(point.cellCoverage.status);
    if (index < worstIndex) {
      worstIndex = index;
    }
  }

  return statusPriority[worstIndex];
}
