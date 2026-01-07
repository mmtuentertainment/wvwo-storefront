/**
 * SPEC-20: Adventure Resort Template Props Interface
 * Action-oriented multi-activity resort with external booking links
 */

/**
 * Difficulty level for activities - standardized across resort offerings
 */
export type ActivityDifficulty = "Beginner" | "Intermediate" | "Advanced" | "All Levels";

/**
 * Season information for the resort
 */
export interface ResortSeason {
  /** Opening date or "Year-round" */
  open: string;
  /** Closing date or "Year-round" */
  close: string;
}

/**
 * Individual activity within a category
 */
export interface ResortActivity {
  /** Activity name (e.g., "Whitewater Rafting") */
  name: string;
  /** Skill level required */
  difficulty: ActivityDifficulty;
  /** Duration of activity (e.g., "3-4 hours") */
  duration: string;
  /** Minimum age requirement */
  minAge?: number;
  /** Brief description of the activity */
  description: string;
  /** Key highlights or features of this activity */
  highlights: string[];
  /** Seasonal availability (e.g., "May - October") */
  season?: string;
  /** Price range (e.g., "$99-149/person") */
  priceRange?: string;
}

/**
 * Category grouping for activities
 */
export interface ResortActivityCategory {
  /** Category name (e.g., "Water Adventures", "Land Activities", "Air Sports", "Winter") */
  category: string;
  /** Activities within this category */
  activities: ResortActivity[];
}

/**
 * Pricing tier for guided trips
 */
export interface TripPricing {
  /** Pricing type (e.g., "Adults", "Children", "Group of 6+") */
  type: string;
  /** Price amount (e.g., "$89/person") */
  price: string;
}

/**
 * Guided trip or adventure offering
 */
export interface ResortGuidedTrip {
  /** Trip name (e.g., "Upper Gauley Full Day") */
  name: string;
  /** Category (e.g., "Water", "Land", "Air") */
  category: string;
  /** Difficulty level description */
  difficulty: string;
  /** Trip duration (e.g., "Full Day", "Half Day") */
  duration: string;
  /** Group size range (e.g., "4-12 people") */
  groupSize: string;
  /** What is included in the trip */
  includes: string[];
  /** Pricing options */
  pricing: TripPricing[];
  /** Minimum age requirement */
  minAge?: number;
  /** Notes about seasonal availability or conditions */
  seasonalNotes?: string;
}

/**
 * Lodging option at the resort
 */
export interface ResortLodging {
  /** Lodging type (e.g., "Cabins", "Camping", "Glamping", "Bunkhouse") */
  type: string;
  /** Capacity description (e.g., "Sleeps 4-6") */
  capacity: string;
  /** Available amenities */
  amenities: string[];
  /** Price range (e.g., "$150-250/night") */
  priceRange: string;
  /** Photo URLs */
  photos?: string[];
  /** External booking URL */
  bookingUrl?: string;
}

/**
 * Adventure package offering
 */
export interface ResortPackage {
  /** Package name (e.g., "Ultimate Adventure Weekend") */
  name: string;
  /** Duration (e.g., "3 days / 2 nights") */
  duration: string;
  /** What is included in the package */
  includes: string[];
  /** Package price (e.g., "$599/person") */
  price: string;
  /** Target audience (e.g., "Families", "Groups", "Couples") */
  audience?: string;
  /** When the package is available */
  seasonalAvailability?: string;
}

/**
 * Individual service offered by the outfitter
 */
export interface OutfitterService {
  /** Service name (e.g., "Kayak Rental") */
  name: string;
  /** Service description */
  description: string;
  /** Pricing information */
  pricing?: string;
  /** Booking information or contact */
  booking?: string;
}

/**
 * Category of outfitter services
 */
export interface OutfitterServiceCategory {
  /** Category name (e.g., "Rentals", "Shuttles", "Instruction", "Guides") */
  category: string;
  /** Services within this category */
  services: OutfitterService[];
}

/**
 * Dining facility at the resort
 */
export interface ResortDining {
  /** Restaurant or dining area name */
  name: string;
  /** Type of dining (e.g., "Restaurant", "Cafe", "Cookout") */
  type: string;
  /** Hours of operation */
  hours: string;
  /** Additional notes (e.g., "Reservations recommended") */
  notes?: string;
}

/**
 * Retail facility at the resort
 */
export interface ResortRetail {
  /** Store name */
  name: string;
  /** Products or services offered */
  offerings: string[];
  /** Hours of operation */
  hours: string;
}

/**
 * Event space at the resort
 */
export interface ResortEventSpace {
  /** Space name */
  name: string;
  /** Capacity (e.g., "Up to 200 guests") */
  capacity: string;
  /** Intended use (e.g., "Weddings", "Corporate Retreats") */
  use: string;
}

/**
 * Other facility at the resort
 */
export interface ResortOtherFacility {
  /** Facility type (e.g., "Swimming Pool", "Hot Tub") */
  type: string;
  /** Description of the facility */
  description: string;
}

/**
 * All facilities at the resort
 */
export interface ResortFacilities {
  /** Dining options */
  dining?: ResortDining[];
  /** Retail/shops */
  retail?: ResortRetail[];
  /** Event and meeting spaces */
  eventSpaces?: ResortEventSpace[];
  /** Other amenities */
  other?: ResortOtherFacility[];
}

/**
 * Booking policy details
 */
export interface BookingPolicy {
  /** Policy category (e.g., "Cancellation", "Weather", "Age Requirements") */
  category: string;
  /** Policy details as list items */
  details: string[];
}

/**
 * Booking and contact information
 */
export interface ResortBooking {
  /** External reservation URL */
  reservationUrl?: string;
  /** Phone number for reservations */
  phone: string;
  /** Email address for inquiries */
  email?: string;
  /** Resort policies */
  policies: BookingPolicy[];
}

/**
 * Main props interface for the Resort Template
 * Action-oriented multi-activity resort with external booking links
 */
export interface ResortTemplateProps {
  // ============================================
  // Hero Section
  // ============================================

  /** Resort name */
  name: string;
  /** Location description (e.g., "New River Gorge, West Virginia") */
  location: string;
  /** Resort size in acres */
  acreage?: number;
  /** Operating season dates */
  season: ResortSeason;
  /** Signature activities featured prominently (e.g., ["Whitewater Rafting", "Zip Lines", "Rock Climbing"]) */
  signatureActivities: string[];
  /** Quick highlight facts (e.g., ["50+ years of adventure", "Class V rapids"]) */
  quickHighlights: string[];
  /** Hero image URL */
  heroImage: string;
  /** Hero image alt text for accessibility */
  heroImageAlt: string;

  // ============================================
  // Activity Categories
  // ============================================

  /** Activities organized by category (Water Adventures, Land Activities, Air Sports, Winter) */
  activityCategories: ResortActivityCategory[];

  // ============================================
  // Guided Trips
  // ============================================

  /** Outfitter-led guided adventures */
  guidedTrips: ResortGuidedTrip[];

  // ============================================
  // Lodging Options
  // ============================================

  /** Available lodging options */
  lodging: ResortLodging[];

  // ============================================
  // Packages
  // ============================================

  /** Multi-day adventure packages */
  packages: ResortPackage[];

  // ============================================
  // Outfitter Services
  // ============================================

  /** Rentals, shuttles, instruction, and guide services */
  outfitterServices: OutfitterServiceCategory[];

  // ============================================
  // Facilities
  // ============================================

  /** On-site facilities (dining, retail, event spaces) */
  facilities: ResortFacilities;

  // ============================================
  // Booking & Policies
  // ============================================

  /** Reservation information and policies (all external links) */
  booking: ResortBooking;

  // ============================================
  // Optional
  // ============================================

  /** URL to activity/trail map image */
  activityMapUrl?: string;
}
