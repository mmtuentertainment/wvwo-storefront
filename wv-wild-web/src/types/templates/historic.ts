/**
 * SPEC-19: Historic Site Template Props Interface
 * Complete TypeScript interface for HistoricTemplate.astro component
 * Target: ~150 lines with full property definitions
 */

export interface HistoricTemplateProps {
  // ======================================================================
  // Hero Section
  // ======================================================================

  /** Site name (e.g., "Carnifex Ferry Battlefield") */
  name: string;

  /** Geographic location (e.g., "Summersville, WV") */
  location: string;

  /** Era/date range (e.g., "Civil War Era (1861-1865)") */
  era: string;

  /** Brief significance summary (2-3 sentences) */
  significance: string;

  /** Is site listed on National Register of Historic Places? */
  nationalRegister: boolean;

  /** Quick highlights (3-5 key facts for hero cards) */
  quickHighlights: string[];

  /** Hero background image URL */
  heroImage: string;

  /** Alt text for hero image */
  heroImageAlt: string;

  /** Optional image credit (e.g., "Library of Congress, LC-DIG-cwpb-12345") */
  heroImageCredit?: string;

  // ======================================================================
  // Historical Context Section
  // ======================================================================

  historicalContext: {
    /** Optional timeline for sidebar display */
    timeline?: {
      year: string;
      event: string;
    }[];

    /** Major historical events (required) */
    events: {
      /** Event date (e.g., "September 10, 1861") */
      date: string;
      /** Event title */
      title: string;
      /** Event description (2-3 sentences) */
      description: string;
    }[];

    /** Key historical figures */
    keyFigures?: {
      name: string;
      /** Role (e.g., "Confederate General") */
      role: string;
      /** Biography (2-3 sentences) */
      bio: string;
    }[];

    /** Broader historical significance (detailed context paragraph) */
    significance: string;
  };

  // ======================================================================
  // Preserved Structures Section
  // ======================================================================

  structures: {
    /** Structure name (e.g., "Patterson House") */
    name: string;

    /** Type (e.g., "Original Structure", "Reconstruction", "Monument") */
    type: string;

    /** Year built (optional, e.g., "1862") */
    year?: string;

    /** Structure description */
    description: string;

    /** Current condition */
    condition: "Restored" | "Ruins" | "Preserved" | "Reconstructed";

    /** ADA wheelchair accessible? */
    accessible: boolean;

    /** Optional structure image URL */
    image?: string;

    /** Optional image credit for structure photo */
    imageCredit?: string;
  }[];

  /** Optional site map download URL */
  siteMapUrl?: string;

  // ======================================================================
  // Tours & Interpretation Section
  // ======================================================================

  tours: {
    /** Tour type (e.g., "Self-Guided", "Ranger-Led", "Audio Tour") */
    type: string;

    /** Tour name (e.g., "Civil War Walking Tour") */
    name: string;

    /** Duration (optional, e.g., "45 minutes") */
    duration?: string;

    /** Tour description */
    description: string;

    /** Schedule (optional, e.g., "Daily 10am-4pm") */
    schedule?: string;

    /** Cost (optional, e.g., "Free" or "$5 per person") */
    cost?: string;

    /** External booking URL (Eventbrite, WV State Parks, etc.) */
    reservationUrl?: string;
  }[];

  // ======================================================================
  // Exhibits Section (Optional)
  // ======================================================================

  exhibits?: {
    /** Exhibit title */
    title: string;

    /** Location (e.g., "Visitor Center", "On-Site") */
    location: string;

    /** Exhibit description */
    description: string;

    /** Is exhibit interactive? Shows "Interactive" badge */
    interactive?: boolean;

    /** Exhibit dates (e.g., "May 2024 - August 2024") */
    dates?: string;

    /** Featured artifacts in this exhibit */
    featuredArtifacts?: string[];
  }[];

  // ======================================================================
  // Educational Programs Section
  // ======================================================================

  education: {
    programs: {
      /** Program name */
      name: string;

      /** Program type (e.g., "Workshop", "Tour", "Living History") */
      type?: string;

      /** Target audience (e.g., "School Groups", "Adults", "Families") */
      audience: string;

      /** Program description */
      description: string;

      /** Duration (e.g., "2 hours") */
      duration?: string;

      /** Cost (e.g., "Free", "$10 per person") */
      cost?: string;

      /** Contact email for inquiries */
      contactForInquiry?: string;
    }[];

    /** Optional educational resources */
    resources?: {
      /** Resource title */
      title: string;

      /** Type (e.g., "Brochure", "Lesson Plan", "Video") */
      type: string;

      /** Download URL (optional) */
      downloadUrl?: string;
    }[];
  };

  // ======================================================================
  // Visitor Information Section
  // ======================================================================

  visitorInfo: {
    /** Operating hours by season */
    hours: {
      season: string;
      /** Hours of operation (e.g., "9am - 5pm") */
      hours: string;
    }[];

    /** Admission fees */
    fees: {
      type: string;
      amount: string;
    }[];

    /** Parking information */
    parking?: string;

    /** Available facilities (e.g., ["Restrooms", "Picnic Area"]) */
    facilities?: string[];

    /** Accessibility features (e.g., ["Wheelchair accessible paths", "Audio guides available"]) */
    accessibility: string[];

    /** Phone number (direct, not nested) */
    phone: string;

    /** Email address (optional, direct) */
    email?: string;
  };

  // ======================================================================
  // Nearby History Section (Optional)
  // ======================================================================

  nearbyHistory?: {
    /** Nearby site name */
    name: string;

    /** Distance and direction (e.g., "5 miles north") */
    distance: string;

    /** Historical relation (e.g., "Part of the same campaign") */
    relation: string;

    /** Link to nearby site page (optional) */
    url?: string;

    /** Site type (e.g., "Battlefield", "Museum") */
    type?: string;

    /** Direction (e.g., "north", "south") */
    direction?: string;
  }[];
}
