/**
 * SPEC-23: Lake Enrichment Type System
 * Standalone type for enriched lake pages with detailed specifications.
 *
 * This file provides a flexible type for comprehensive lake data
 * like Summersville Lake that goes beyond the base LakeTemplateProps.
 *
 * NOTE: This is a standalone type, not extending LakeTemplateProps,
 * because enriched data includes additional fields on nested objects
 * (tips on fishingSpots, address on marinas, etc.) that would cause
 * type conflicts with the stricter base interface.
 *
 * TODO: When LakeTemplate component is updated to consume enrichment fields,
 * consider unifying these types or using a more flexible base interface.
 */

/** Stat item icon types */
type StatIcon = 'location' | 'distance' | 'time' | 'calendar' | 'check' | 'info' | 'area' | 'circle' | 'elevation' | 'none' | 'depth' | 'visibility';

/** Difficulty levels */
type Difficulty = 'easy' | 'moderate' | 'difficult' | 'expert';

/** Season types */
type Season = 'spring' | 'summer' | 'fall' | 'winter';

/** Geographic coordinates */
interface Coordinates {
  lat: number;
  lng: number;
}

/** Stat item for hero section */
interface StatItem {
  value: string;
  label: string;
  icon?: StatIcon;
}

/** Gear item */
interface GearItem {
  name: string;
  optional: boolean;
}

/** Related shop category */
interface RelatedCategory {
  name: string;
  description: string;
  href: string;
}

/** Regulation entry */
interface Regulation {
  category: string;
  details: string;
  link?: string;
  important?: boolean;
}

/** Seasonal guide entry */
interface SeasonalGuide {
  period: string;
  targetSpecies: string[];
  techniques: string;
  conditions: string;
  kimNote?: string;
}

/** Activity entry */
interface Activity {
  name: string;
  description: string;
  difficulty?: string;
  season?: string;
  icon?: StatIcon;
  // Enrichment fields
  provider?: string;
  fees?: string;
  rentalRates?: string;
  note?: string;
}

/** Fishing spot with enrichment */
interface FishingSpot {
  name: string;
  depth: string;
  structure: string;
  species: string[];
  access: string;
  tips?: string;
}

/** Marina with enrichment */
interface Marina {
  name: string;
  type: string;
  services: string[];
  contact?: string;
  hours?: string;
  fees?: string;
  // Enrichment fields
  address?: string;
  website?: string;
  notes?: string;
  rentalDetails?: {
    deposit?: string;
    checkIn?: string;
    returnBy?: string;
    operatorAge?: number;
    boaterSafetyCard?: string;
    restrictions?: string;
  };
}

/** Lake specifications */
interface LakeSpecs {
  surfaceAcres: number;
  maxDepth: number;
  shorelineMiles: number;
  visibility: string;
  summerPoolElevation: number;
  winterPoolElevation: number;
  waterType: string;
  nickname?: string;
}

/** Fish species information */
interface FishSpecies {
  name: string;
  bestSeason?: string;
  regulations?: string;
  stateRecord?: string;
  consumptionAdvisory?: string;
  tips?: string;
  notes?: string;
}

/** Dive site */
interface DiveSite {
  name: string;
  description: string;
  difficulty: string;
}

/** Dive shop */
interface DiveShop {
  name: string;
  location: string;
  services: string[];
  website?: string;
}

/** Scuba diving section */
interface ScubaDiving {
  overview: string;
  visibility: string;
  waterTemperature: string;
  bestMonths: string;
  certificationRequired: boolean;
  diveSites: DiveSite[];
  diveShop?: DiveShop;
}

/** Swimming beach */
interface SwimmingBeach {
  name: string;
  length: string;
  season: string;
  lifeguards: boolean;
  fees: string;
  amenities: string[];
  rules: string[];
  waterTemperature?: string;
}

/** Swimming section */
interface Swimming {
  primaryBeach: SwimmingBeach;
  passInfo?: string;
}

/** Cliff jumping prohibition */
interface CliffJumping {
  status: string;
  since?: number;
  enforcement?: string;
  reason?: string;
  details?: string;
  climbingNote?: string;
}

/** Lake campground */
interface LakeCampground {
  name: string;
  slug: string;
  operator: string;
  sites: number;
  siteTypes: string[];
  amenities: string[];
  fees?: string;
  season?: string;
  reservations?: string;
  policies?: string[];
  contact?: string;
}

/** Contact information */
interface LakeContact {
  usaceOffice?: {
    name: string;
    address: string;
    phone: string;
    email?: string;
    hours?: string;
  };
  marina?: {
    name: string;
    phone: string;
    website?: string;
  };
  diveShop?: {
    name: string;
    website?: string;
  };
  campground?: {
    name: string;
    phone: string;
    reservations?: string;
  };
}

/** Official link */
interface OfficialLink {
  name: string;
  url: string;
}

/**
 * Enriched Lake Template Props
 * Complete type for comprehensive lake data files like summersville.ts.
 */
export interface LakeTemplatePropsEnriched {
  // Basic Info
  name: string;
  slug?: string;
  image: string;
  imageAlt: string;
  tagline: string;
  description: string;

  // Core sections
  stats: StatItem[];
  fishingSpots: FishingSpot[];
  marinas: Marina[];
  activities: Activity[];
  seasonalGuide: SeasonalGuide[];
  regulations: Regulation[];
  gearList: GearItem[];
  relatedShop: RelatedCategory[];

  // Optional base fields
  difficulty?: Difficulty;
  bestSeason?: Season;
  coordinates?: Coordinates;

  // SPEC-23 Enrichment fields
  lakeSpecs?: LakeSpecs;
  fishSpecies?: FishSpecies[];
  scubaDiving?: ScubaDiving;
  swimming?: Swimming;
  cliffJumping?: CliffJumping;
  campgrounds?: LakeCampground[];
  contact?: LakeContact;
  officialLinks?: OfficialLink[];

  // Cross-linking for Adventure Hub
  nearbyWMA?: string;
  nearbyCampgrounds?: string[];
  nearbyStateParks?: string[];
  nearbyRivers?: string[];
}
