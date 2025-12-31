/**
 * Type Barrel Export
 * Central re-export point for all shared types
 *
 * @module types
 */

// Breadcrumb types
export type { BreadcrumbItem } from './breadcrumb';

// Adventure types - Zod schemas
export {
  DifficultySchema,
  SeasonSchema,
  ImagePositionSchema,
  SchemaTypeSchema,
  BadgeTypeSchema,
  CoordinatesSchema,
} from './adventure';

// Adventure types - TypeScript types
export type {
  Difficulty,
  Season,
  ImagePosition,
  SchemaType,
  BadgeType,
  Coordinates,
} from './adventure';

// Adventure types - Display constants
export {
  DIFFICULTY_LABELS,
  DIFFICULTY_SHAPES,
  DIFFICULTY_COLORS,
  BADGE_SR_LABELS,
} from './adventure';

// SPEC-10: Quick Stats types
export { StatIconSchema, StatItemSchema } from './adventure';
export type { StatIcon, StatItem, StatColumns } from './adventure';
export { STAT_ICON_PATHS } from './adventure';

// SPEC-11: Shared Component types
export { GearItemSchema, RelatedCategorySchema } from './adventure';
export type { GearItem, GearColumns, RelatedCategory } from './adventure';

// Nearby Attractions (used across cave/lake/river templates)
export { NearbyAttractionSchema } from './adventure';
export type { NearbyAttraction } from './adventure';

// SPEC-12: WMA Template types
export { CampingFacilitySchema, FeatureItemSchema } from './adventure';
export type { CampingFacility, FeatureItem, AccentColor } from './adventure';
export { isWMAAdventure } from './adventure';

// SPEC-13: Lake Template types
export {
  FishingSpotSchema,
  MarinaSchema,
  ActivitySchema,
  SeasonalGuideSchema,
  RegulationSchema,
} from './adventure';
export type {
  FishingSpot,
  Marina,
  Activity,
  SeasonalGuide,
  Regulation,
  LakeTemplateProps,
} from './adventure';

// SPEC-16: Cave Template types
export {
  FormationTypeSchema,
  TourDifficultySchema,
  CaveTourSchema,
  CaveFormationSchema,
  CaveConditionsSchema,
  CaveAccessibilitySchema,
  CavePricingSchema,
  CaveHoursSchema,
  CaveSafetySchema,
  CaveHistorySchema,
  CaveTemplatePropsSchema,
  FORMATION_TYPE_LABELS,
  FORMATION_TYPE_DESCRIPTIONS,
  TOUR_DIFFICULTY_COLORS,
  TOUR_DIFFICULTY_BADGES,
  TOUR_DIFFICULTY_LABELS,
  getTourDifficultyColor,
  getTourDifficultyBadge,
  getFormationTypeLabel,
  getFormationTypeDescription,
  isCaveAdventure,
} from './cave-types';
export type {
  FormationType,
  TourDifficulty,
  CaveTour,
  CaveFormation,
  CaveConditions,
  CaveAccessibility,
  CavePricing,
  CaveHours,
  CaveSafety,
  CaveHistory,
  CaveTemplateProps,
} from './cave-types';

// SPEC-17: Backcountry Template types
export {
  MobilityRatingSchema,
  FitnessLevelSchema,
  CompanionRequirementSchema,
  AgeRequirementSchema,
  TrailAccessibilitySchema,
  ServiceAnimalStatusSchema,
  ServiceAnimalPolicySchema,
  MedicalConditionSchema,
  BackcountryAccessibilitySchema,
  MOBILITY_RATING_LABELS,
  MOBILITY_RATING_DESCRIPTIONS,
  MOBILITY_RATING_COLORS,
  MOBILITY_RATING_SHAPES,
  FITNESS_LEVEL_LABELS,
  FITNESS_LEVEL_EXAMPLES,
  COMPANION_REQUIREMENT_LABELS,
  COMPANION_REQUIREMENT_DESCRIPTIONS,
  getMobilityRatingLabel,
  getMobilityRatingDescription,
  getMobilityRatingColor,
  getMobilityRatingShape,
  getFitnessLevelLabel,
  getFitnessLevelExample,
  getCompanionRequirementLabel,
  getCompanionRequirementDescription,
  isBackcountryAdventure,
  BACKCOUNTRY_ACCESSIBILITY_EXAMPLE,
} from './backcountry-types';
export type {
  MobilityRating,
  FitnessLevel,
  CompanionRequirement,
  AgeRequirement,
  TrailAccessibility,
  ServiceAnimalStatus,
  ServiceAnimalPolicy,
  MedicalCondition,
  BackcountryAccessibility,
} from './backcountry-types';

// SPEC-17: Backcountry Navigation types (GPS/Cell coverage for remote areas)
export {
  // Coordinate schemas
  LatLongSchema,
  UTMCoordinateSchema,
  CoordinateFormatSchema,
  // Map & compass schemas
  USGSQuadSchema,
  CompassDeclinationSchema,
  // Trail marking schemas
  BlazingReliabilitySchema,
  TrailBlazingSchema,
  // Cell coverage schemas
  CellSignalStrengthSchema,
  CellCoverageSchema,
  // Satellite communication schemas
  SatelliteDeviceSchema,
  SatelliteRecommendationSchema,
  // Offline maps schemas
  OfflineMapAppSchema,
  OfflineMapRecommendationSchema,
  // Access point schema
  BackcountryAccessPointSchema,
  // Main navigation schema
  BackcountryNavigationSchema,
  // Display constants
  CELL_COVERAGE_LABELS,
  CELL_COVERAGE_COLORS,
  CELL_COVERAGE_ICONS,
  BLAZING_RELIABILITY_LABELS,
  BLAZING_RELIABILITY_COLORS,
  NAVIGATION_DIFFICULTY_LABELS,
  GPS_RELIABILITY_LABELS,
  // Helper functions
  formatDecimalToDMS,
  formatUTMDisplay,
  getCellCoverageColor,
  getCellCoverageLabel,
  getBlazingReliabilityColor,
  getBlazingReliabilityLabel,
  isSatelliteCritical,
  getWorstCellCoverage,
} from './navigation-types';

export type {
  LatLong,
  UTMCoordinate,
  CoordinateFormat,
  USGSQuad,
  CompassDeclination,
  BlazingReliability,
  TrailBlazing,
  CellSignalStrength,
  CellCoverage,
  SatelliteDevice,
  SatelliteRecommendation,
  OfflineMapApp,
  OfflineMapRecommendation,
  BackcountryAccessPoint,
  BackcountryNavigation,
} from './navigation-types';

// SPEC-17: Water Safety types (backcountry water sources and camping)
export {
  WaterStatusSchema,
  WaterReliabilitySchema,
  WaterTreatmentSchema,
  ContaminantTypeSchema,
  AMDWarningSchema,
  WaterSourceSchema,
  BackcountryCampingSchema,
  WATER_STATUS_CONFIG,
  WATER_RELIABILITY_LABELS,
  WATER_TREATMENT_LABELS,
  CONTAMINANT_INFO,
  AMD_EDUCATION,
  getWaterStatusConfig,
  getContaminantInfo,
  hasAMDWarning,
  filterWaterSourcesByStatus,
  getWaterSourceCounts,
  hasDoNotUseSources,
  isUsableWaterSource,
  isPotableWaterSource,
  isToxicWaterSource,
} from './water-safety';

export type {
  WaterStatus,
  WaterReliability,
  WaterTreatment,
  ContaminantType,
  AMDWarning,
  WaterSource,
  BackcountryCamping,
} from './water-safety';

// SPEC-17: Weather Hazards types (seasonal conditions and risk assessment)
export {
  WVSeasonSchema,
  HazardSeveritySchema,
  FlashFloodHazardSchema,
  LightningHazardSchema,
  TemperatureByElevationSchema,
  WindChillHazardSchema,
  HypothermiaRiskSchema,
  RapidOnsetEventSchema,
  WeatherHazardsSchema,
  SeasonalConditionsSchema,
  AdventureWeatherSchema,
  AvalancheDangerLevelSchema,
  AvalancheHazardSchema,
  FireDangerLevelSchema,
  FireDangerHazardSchema,
  HAZARD_SEVERITY_COLORS,
  HAZARD_SEVERITY_LABELS,
  AVALANCHE_DANGER_COLORS,
  AVALANCHE_DANGER_LABELS,
  FIRE_DANGER_COLORS,
  FIRE_DANGER_LABELS,
  getHazardSeverityColor,
  getHazardSeverityLabel,
  getAvalancheDangerColor,
  getFireDangerColor,
  validateQuantifiedData,
} from './weather-hazards';

export type {
  WVSeason,
  HazardSeverity,
  FlashFloodHazard,
  LightningHazard,
  TemperatureByElevation,
  WindChillHazard,
  HypothermiaRisk,
  RapidOnsetEvent,
  WeatherHazards,
  SeasonalConditions,
  AdventureWeather,
  AvalancheDangerLevel,
  AvalancheHazard,
  FireDangerLevel,
  FireDangerHazard,
} from './weather-hazards';

// SPEC-17: Backcountry Template composition types (emergency contacts, agencies, regulations)
export {
  // Emergency schemas
  EmergencyContactSchema,
  EmergencyTierSchema,
  TieredEmergencyContactSchema,
  // Agency schemas
  AgencyTypeSchema,
  ManagingAgencySchema,
  RegulationsSchema,
  // Display constants
  EMERGENCY_TIER_COLORS,
  EMERGENCY_TIER_LABELS,
  AGENCY_TYPE_LABELS,
  // Helper functions
  getEmergencyTierColor,
  getEmergencyTierLabel,
  getAgencyTypeLabel,
  sortEmergencyContactsByTier,
  filterEmergencyContactsByTier,
  has24x7EmergencyContact,
} from './backcountry-template-types';

export type {
  EmergencyContact,
  EmergencyTier,
  TieredEmergencyContact,
  AgencyType,
  ManagingAgency,
  Regulations,
} from './backcountry-template-types';
