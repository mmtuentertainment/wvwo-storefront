/**
 * SPEC-19: Historic Site Template Props Interface
 * Appalachian heritage aesthetic with C→B→D→A narrative arc
 */

export interface HistoricTemplateProps {
  // Hero Section
  name: string;
  location: string;
  era: string; // e.g., "Civil War Era (1861-1865)"
  significance: string; // Brief summary (2-3 sentences)
  nationalRegister: boolean;
  quickHighlights: string[]; // 3-5 key facts
  heroImage: string;
  heroImageAlt: string;
  heroImageCredit?: string; // "Library of Congress, LC-DIG-cwpb-12345"

  // Historical Context
  historicalContext: {
    timeline?: { year: string; event: string }[]; // Optional
    events: {
      date: string; // "September 10, 1861"
      title: string;
      description: string;
    }[];
    keyFigures?: {
      name: string;
      role: string; // "Confederate General"
      bio: string; // 2-3 sentences
    }[];
    significance: string; // Deeper context paragraph
  };

  // Preserved Structures
  structures: {
    name: string;
    type: string; // "Original Structure", "Reconstruction", "Monument"
    year?: string; // "1862"
    description: string;
    condition: "Restored" | "Ruins" | "Preserved" | "Reconstructed";
    accessible: boolean; // ADA wheelchair icon
    image?: string;
    imageCredit?: string; // Attribution for structure photo
  }[];
  siteMapUrl?: string;

  // Tours & Interpretation
  tours: {
    type: string; // "Self-Guided", "Ranger-Led", "Audio Tour"
    name: string; // "Civil War Walking Tour"
    duration?: string; // "45 minutes"
    description: string;
    schedule?: string; // "Daily 10am-4pm"
    cost?: string; // "Free" or "$5 per person"
    reservationUrl?: string; // External booking link (Eventbrite, State Parks, etc.)
  }[];

  // Exhibits
  exhibits?: {
    title: string;
    location: string; // "Visitor Center", "On-Site"
    description: string;
    interactive?: boolean; // Shows "Interactive" badge
    artifacts?: string[]; // Featured artifacts list
  }[];

  // Educational Programs
  education: {
    programs: {
      name: string;
      type?: string; // "School Groups", "Adults", "Families"
      audience: string;
      description: string;
      duration?: string;
      cost?: string;
      booking?: string; // Contact info
      contactEmail?: string;
    }[];
    resources?: {
      title: string;
      type: string; // "Brochure", "Lesson Plan", "Video"
      url?: string;
    }[];
  };

  // Visitor Information
  visitorInfo: {
    hours: { season: string; times: string }[]; // "Summer: 9am-5pm"
    fees: { type: string; amount: string }[]; // "Adults: $5", "Children: Free"
    facilities: string[]; // ["Restrooms", "Parking", "Picnic Area"]
    accessibility: string[]; // ["Wheelchair accessible paths", "Audio guides available"]
    contact: { phone: string; email?: string };
  };

  // Nearby History
  nearbyHistory?: {
    name: string;
    type?: string; // Site type for trail blaze badge
    distance: string; // "5 miles north"
    direction?: string; // Cardinal direction
    relation: string; // "Part of the same campaign"
    url?: string;
    briefDescription?: string;
  }[];
}
