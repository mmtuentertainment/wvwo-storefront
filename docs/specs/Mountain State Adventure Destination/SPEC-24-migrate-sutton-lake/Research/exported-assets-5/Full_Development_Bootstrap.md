# WV Wild Outdoors: Full Development Bootstrap (No CMS Until 250 Destinations)
## Comprehensive Build Until You Hit the CMS Threshold—Not Sacrificing Quality

**Philosophy:** Build the site RIGHT with full features, comprehensive data, proper architecture—just skip paying for CMS until you've earned it through proof. Quality first. CMS when needed. Not before.

---

## THE REAL PLAY

**Weeks 1-12:** Build comprehensive WV adventure site with:
- ✅ Full TypeScript architecture (types, interfaces, validation)
- ✅ All cross-linking logic implemented
- ✅ Schema.org markup auto-generated correctly
- ✅ Image optimization + responsive design
- ✅ Proper error handling + edge cases
- ✅ 250+ verified, quality destinations
- ✅ Internal linking that makes sense
- ✅ SEO infrastructure ready
- ✅ Performance monitoring in place
- ✅ Sitemap + robots.txt + canonical tags

**NOT cutting:** Quality, features, architecture completeness  
**CUTTING:** Only the $489/month CMS service (until you need it)

---

## WEEK 1: FULL ARCHITECTURE SETUP

### Part 1: Core Type System (TypeScript)

File: `src/types/destination.ts` - **Full, production-grade**

```typescript
// Strict, validated types for all destinations
export interface GeoCoordinates {
  lat: number; // -90 to 90
  lng: number; // -180 to 180
  accuracy?: "exact" | "approximate"; // track data quality
}

export interface ImageAsset {
  src: string; // /public path
  alt: string; // descriptive alt text
  attribution?: string; // photo credit
  width: number;
  height: number;
}

// Base interface - all destinations inherit
export interface BaseDestination {
  // Identity
  name: string; // Official name
  slug: string; // URL-safe slug (unique per type)
  type: DestinationType;
  
  // Location
  county: WVCounty; // Type-safe county enum
  coordinates: GeoCoordinates;
  address?: string; // Physical address if applicable
  
  // Content
  description: string; // 50-200 words, no markdown
  longDescription?: string; // Extended narrative (optional)
  highlights: string[]; // 3-5 key features
  bestSeason: Season[]; // When to visit
  
  // Media
  heroImage: ImageAsset;
  gallery?: ImageAsset[]; // Additional photos
  
  // SEO
  metaTitle: string; // <60 chars
  metaDescription: string; // ~155 chars
  keywords?: string[]; // 5-10 relevant terms
  
  // Data Management
  publishedAt: ISO8601DateTime;
  updatedAt: ISO8601DateTime;
  isVerified: boolean; // Has source been verified?
  verificationSource?: string; // Where we got this data
  dataQuality: "high" | "medium" | "needs-verification"; // Track confidence
}

// WV County enum - type-safe
export enum WVCounty {
  Barbour = "Barbour",
  Berkeley = "Berkeley",
  Boone = "Boone",
  Braxton = "Braxton",
  Brooke = "Brooke",
  Cabell = "Cabell",
  Calhoun = "Calhoun",
  Clay = "Clay",
  Doddridge = "Doddridge",
  Fayette = "Fayette",
  Gilmer = "Gilmer",
  Grant = "Grant",
  Greenbrier = "Greenbrier",
  Hampshire = "Hampshire",
  Hancock = "Hancock",
  Hardy = "Hardy",
  Harrison = "Harrison",
  Jackson = "Jackson",
  Jefferson = "Jefferson",
  Kanawha = "Kanawha",
  Lewis = "Lewis",
  Lincoln = "Lincoln",
  Logan = "Logan",
  Marion = "Marion",
  Marshall = "Marshall",
  Mason = "Mason",
  Mercer = "Mercer",
  Mineral = "Mineral",
  Mingo = "Mingo",
  Monongalia = "Monongalia",
  Monroe = "Monroe",
  Morgan = "Morgan",
  Nicholas = "Nicholas",
  Ohio = "Ohio",
  Pendleton = "Pendleton",
  Pleasant = "Pleasant",
  Pocahontas = "Pocahontas",
  Preston = "Preston",
  Putnam = "Putnam",
  Raleigh = "Raleigh",
  Randolph = "Randolph",
  Ritchie = "Ritchie",
  Roane = "Roane",
  Summers = "Summers",
  Taylor = "Taylor",
  Tucker = "Tucker",
  Tyler = "Tyler",
  Upshur = "Upshur",
  Wayne = "Wayne",
  Webster = "Webster",
  Wetzel = "Wetzel",
  Wirt = "Wirt",
  Wood = "Wood",
  Wyoming = "Wyoming",
}

export type Season = "spring" | "summer" | "fall" | "winter";
export type ISO8601DateTime = string; // YYYY-MM-DDTHH:mm:ssZ

// TYPE-SPECIFIC INTERFACES (Strict schemas)

export interface Lake extends BaseDestination {
  type: "lake";
  acreage: number; // Total surface area
  maxDepth: number; // In feet
  publicAccessPoints: AccessPoint[];
  boatRamps: BoatRamp[];
  fishingSpecies: FishSpecies[];
  waterActivities: WaterActivity[];
  nearbyTrails: RelatedDestination[]; // Cross-links
  nearbyCampgrounds: RelatedDestination[];
  nearbyHistoricSites?: RelatedDestination[];
  hazards?: string[]; // e.g., "strong currents", "algae blooms"
}

export interface AccessPoint {
  name: string;
  type: "parking" | "boat-launch" | "fishing-access";
  coordinates?: GeoCoordinates;
}

export interface BoatRamp {
  name: string;
  type: "public" | "fee-required" | "permit-required";
  coordinates?: GeoCoordinates;
  condition?: "excellent" | "good" | "fair" | "poor";
}

export interface FishSpecies {
  name: string; // "largemouth bass"
  season: Season[]; // When it's good to fish
  regulationsUrl?: string; // Link to WV DNR regs
}

export type WaterActivity = 
  | "fishing"
  | "boating"
  | "kayaking"
  | "jet-skiing"
  | "swimming"
  | "diving";

export interface Trail extends BaseDestination {
  type: "trail";
  distance: number; // miles
  elevationGain: number; // feet
  difficulty: Difficulty;
  trailheadLocation: string;
  trailheadCoordinates: GeoCoordinates;
  surface: "dirt" | "gravel" | "asphalt" | "rock" | "mixed";
  loopType: "out-and-back" | "loop" | "point-to-point";
  hazards: string[]; // "cliffs", "water-crossings", "exposure"
  dogFriendly: boolean;
  childrenFriendly: boolean;
  accessibilityNotes?: string;
  nearbyLakes: RelatedDestination[];
  nearbyCampgrounds: RelatedDestination[];
  gpxDownloadUrl?: string; // Optional GPX file
  allTrailsUrl?: string; // Link to AllTrails if verified
}

export type Difficulty = "easy" | "moderate" | "hard" | "expert";

export interface Campground extends BaseDestination {
  type: "campground";
  operator: "state" | "private" | "federal" | "tribal";
  totalSites: number;
  amenities: CampgroundAmenity[];
  hasWater: boolean;
  hasElectric: boolean;
  hasShowers: boolean;
  petFriendly: boolean;
  reservationSystem: {
    name: string; // "ReserveUSA", "Recreation.gov", etc
    url: string;
    acceptsOnlineReservations: boolean;
  };
  season: {
    opens: string; // "May 1"
    closes: string; // "October 31"
    yearRound: boolean;
  };
  nearbyLakes: RelatedDestination[];
  nearbyTrails: RelatedDestination[];
  nearbyStatePark?: RelatedDestination;
  pricePerNight?: {
    min: number;
    max: number;
  };
}

export type CampgroundAmenity = 
  | "tent-sites"
  | "rv-sites"
  | "cabins"
  | "glamping"
  | "fire-rings"
  | "picnic-tables"
  | "restrooms"
  | "dump-station"
  | "playground"
  | "wifi"
  | "laundry";

export interface HistoricSite extends BaseDestination {
  type: "historic-site";
  historicalPeriod: string; // "Civil War Era", "1800-1850", etc
  yearsActive?: [number, number]; // [start, end]
  significance: string; // Why it matters (100-200 words)
  admissionFee?: number;
  hoursOfOperation?: {
    monday: [string, string] | "closed";
    tuesday: [string, string] | "closed";
    // ... etc
    sunday: [string, string] | "closed";
  };
  guidedToursAvailable: boolean;
  accessibility: {
    wheelchairAccessible: boolean;
    audioTours: boolean;
    brailleAvailable: boolean;
  };
  nearbyTrails: RelatedDestination[];
  nearbyLodging: RelatedDestination[];
  relatedHistoricSites?: RelatedDestination[];
}

export interface River extends BaseDestination {
  type: "river";
  riverName: string; // "New River", "Gauley River"
  section: string; // "Upper", "Lower", "Gorge"
  difficulty: RiverDifficulty;
  length: number; // miles
  estimatedDuration: string; // "2-3 hours", "5-6 hours"
  waterFlow: {
    currentClassification: string; // "Class II", "Class III", etc
    seasonalVariation: "high" | "moderate" | "low";
    minFlowForNavigation?: number; // CFS
  };
  accessPoints: RiverAccessPoint[];
  outfitters: RelatedDestination[]; // Link to rafting companies
  hazards: string[];
  scenicRating: 1 | 2 | 3 | 4 | 5;
}

export type RiverDifficulty = "Class I" | "Class II" | "Class III" | "Class IV" | "Class V";

export interface RiverAccessPoint {
  name: string;
  type: "put-in" | "take-out" | "parking";
  coordinates: GeoCoordinates;
  parking?: boolean;
  facilities?: string;
}

// Cross-link reference (lightweight link to related destinations)
export interface RelatedDestination {
  slug: string;
  type: DestinationType;
  name: string;
  distance?: number; // miles away (for sorting)
}

export type DestinationType = 
  | "lake"
  | "trail"
  | "campground"
  | "historic-site"
  | "river"
  | "cave"
  | "climbing-area"
  | "state-park"
  | "adventure-resort"
  | "wma"
  | "ski-resort"
  | "scenic-drive"
  | "backcountry";

// Union type for all destinations
export type AnyDestination =
  | Lake
  | Trail
  | Campground
  | HistoricSite
  | River;
  // ... extend as you add types
```

### Part 2: Destination Repository (Data Access Layer)

File: `src/lib/destinations.ts` - **Full data management**

```typescript
import { AnyDestination, RelatedDestination } from "../types/destination";

// Load all destinations from data files
async function loadAllDestinations(): Promise<AnyDestination[]> {
  const modules = import.meta.glob<{ data: AnyDestination }>(
    "/src/data/**/*.ts",
    { eager: true }
  );

  return Object.values(modules).map((m) => m.data);
}

// Query operations
export async function getDestinationBySlug(
  type: string,
  slug: string
): Promise<AnyDestination | null> {
  const destinations = await loadAllDestinations();
  return (
    destinations.find((d) => d.type === type && d.slug === slug) || null
  );
}

export async function getDestinationsByType(
  type: string
): Promise<AnyDestination[]> {
  const destinations = await loadAllDestinations();
  return destinations.filter((d) => d.type === type);
}

// Resolve cross-links (turn slugs into full objects)
export async function resolveRelatedDestinations(
  related: RelatedDestination[]
): Promise<AnyDestination[]> {
  const destinations = await loadAllDestinations();
  return related
    .map((rel) => 
      destinations.find((d) => d.type === rel.type && d.slug === rel.slug)
    )
    .filter(Boolean) as AnyDestination[];
}

// Find nearby destinations (geographic distance)
export async function findNearbyDestinations(
  destination: AnyDestination,
  radiusMiles: number = 15,
  type?: string
): Promise<AnyDestination[]> {
  const destinations = await loadAllDestinations();

  const nearby = destinations.filter((d) => {
    if (d.slug === destination.slug) return false; // Don't include self
    if (type && d.type !== type) return false; // Filter by type if specified

    const distance = calculateDistance(
      destination.coordinates,
      d.coordinates
    );
    return distance <= radiusMiles;
  });

  return nearby.sort((a, b) => 
    calculateDistance(destination.coordinates, a.coordinates) -
    calculateDistance(destination.coordinates, b.coordinates)
  );
}

// Haversine formula for distance calculation
function calculateDistance(
  from: { lat: number; lng: number },
  to: { lat: number; lng: number }
): number {
  const R = 3959; // Earth's radius in miles
  const dLat = toRad(to.lat - from.lat);
  const dLng = toRad(to.lng - from.lng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(from.lat)) *
      Math.cos(toRad(to.lat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}

// Search functionality
export async function searchDestinations(
  query: string
): Promise<AnyDestination[]> {
  const destinations = await loadAllDestinations();
  const q = query.toLowerCase();

  return destinations.filter(
    (d) =>
      d.name.toLowerCase().includes(q) ||
      d.description.toLowerCase().includes(q) ||
      d.county.toLowerCase().includes(q)
  );
}

// Validate destination data before publishing
export function validateDestination(dest: AnyDestination): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!dest.name || dest.name.length < 3)
    errors.push("Name must be at least 3 characters");
  if (!dest.slug || !/^[a-z0-9-]+$/.test(dest.slug))
    errors.push("Slug must contain only lowercase letters, numbers, and hyphens");
  if (!dest.county) errors.push("County is required");
  if (!dest.coordinates || !dest.coordinates.lat || !dest.coordinates.lng)
    errors.push("Coordinates required");
  if (!dest.description || dest.description.length < 50)
    errors.push("Description must be at least 50 characters");
  if (!dest.metaTitle || dest.metaTitle.length > 60)
    errors.push("Meta title must be <60 characters");
  if (!dest.metaDescription || dest.metaDescription.length > 160)
    errors.push("Meta description must be <160 characters");
  if (!dest.heroImage || !dest.heroImage.src)
    errors.push("Hero image required");

  return {
    isValid: errors.length === 0,
    errors,
  };
}
```

### Part 3: Dynamic Route (Astro Page)

File: `src/pages/near/[type]/[slug].astro` - **Production-grade**

```astro
---
import { 
  getDestinationBySlug, 
  resolveRelatedDestinations,
  validateDestination 
} from "../../../lib/destinations";
import DestinationLayout from "../../../layouts/DestinationLayout.astro";
import RelatedDestinationCard from "../../../components/RelatedDestinationCard.astro";

// Generate static paths for all destinations
export async function getStaticPaths() {
  const modules = import.meta.glob<{ data: any }>(
    "/src/data/**/*.ts",
    { eager: true }
  );

  const paths = Object.entries(modules).map(([_path, module]) => ({
    params: {
      type: module.data.type,
      slug: module.data.slug,
    },
    props: { destination: module.data },
  }));

  return paths;
}

interface Props {
  destination: any;
}

const { destination } = Astro.props;

// Validate data
const validation = validateDestination(destination);
if (!validation.isValid) {
  return new Response(
    `Destination validation failed:\n${validation.errors.join("\n")}`,
    { status: 500 }
  );
}

// Resolve cross-linked destinations
const nearbyTrails = destination.nearbyTrails
  ? await resolveRelatedDestinations(destination.nearbyTrails)
  : [];

const nearbyCampgrounds = destination.nearbyCampgrounds
  ? await resolveRelatedDestinations(destination.nearbyCampgrounds)
  : [];

const nearbyLakes = destination.nearbyLakes
  ? await resolveRelatedDestinations(destination.nearbyLakes)
  : [];

// Generate SEO schema
const generateSchema = () => {
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": destination.type === "lake" ? "TouristAttraction" : "Place",
    name: destination.name,
    description: destination.description,
    url: Astro.url.href,
    image: {
      "@type": "ImageObject",
      url: `${Astro.site}${destination.heroImage.src}`,
      width: destination.heroImage.width,
      height: destination.heroImage.height,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: destination.coordinates.lat,
      longitude: destination.coordinates.lng,
    },
  };

  // Type-specific schema enrichment
  if (destination.type === "trail") {
    return {
      ...baseSchema,
      "@type": "HikingTrail",
      distance: {
        "@type": "Distance",
        value: destination.distance,
        unitCode: "SMI",
      },
      difficulty: destination.difficulty.toUpperCase(),
    };
  }

  if (destination.type === "lake") {
    return {
      ...baseSchema,
      "@type": "BodyOfWater",
      areaServed: destination.county,
    };
  }

  return baseSchema;
};

const schema = generateSchema();
---

<DestinationLayout
  title={destination.metaTitle}
  description={destination.metaDescription}
  image={destination.heroImage.src}
>
  <script type="application/ld+json" set:html={JSON.stringify(schema)} />

  <article class="destination">
    {/* Hero Image */}
    <header class="hero">
      <img
        src={destination.heroImage.src}
        alt={destination.heroImage.alt}
        width={1200}
        height={600}
        loading="eager"
        class="hero-image"
      />
      {destination.heroImage.attribution && (
        <p class="attribution">Photo: {destination.heroImage.attribution}</p>
      )}
    </header>

    {/* Main Content */}
    <main class="content">
      <h1>{destination.name}</h1>
      
      {destination.county && (
        <p class="meta">{destination.county} County, West Virginia</p>
      )}

      {destination.highlights && (
        <ul class="highlights">
          {destination.highlights.map((h: string) => (
            <li>{h}</li>
          ))}
        </ul>
      )}

      <div class="description">
        <p>{destination.description}</p>
        {destination.longDescription && (
          <p>{destination.longDescription}</p>
        )}
      </div>

      {destination.bestSeason && (
        <div class="best-season">
          <strong>Best Season:</strong> {destination.bestSeason.join(", ")}
        </div>
      )}

      {/* Type-specific info */}
      {destination.type === "trail" && (
        <div class="trail-stats">
          <div class="stat">
            <strong>Distance:</strong> {destination.distance} miles
          </div>
          <div class="stat">
            <strong>Difficulty:</strong> {destination.difficulty}
          </div>
          <div class="stat">
            <strong>Elevation Gain:</strong> {destination.elevationGain} feet
          </div>
        </div>
      )}

      {/* Related Destinations */}
      {nearbyTrails.length > 0 && (
        <section class="related-section">
          <h2>Nearby Trails</h2>
          <div class="related-grid">
            {nearbyTrails.map((trail: any) => (
              <RelatedDestinationCard destination={trail} />
            ))}
          </div>
        </section>
      )}

      {nearbyCampgrounds.length > 0 && (
        <section class="related-section">
          <h2>Nearby Campgrounds</h2>
          <div class="related-grid">
            {nearbyCampgrounds.map((camp: any) => (
              <RelatedDestinationCard destination={camp} />
            ))}
          </div>
        </section>
      )}

      {nearbyLakes.length > 0 && (
        <section class="related-section">
          <h2>Nearby Lakes</h2>
          <div class="related-grid">
            {nearbyLakes.map((lake: any) => (
              <RelatedDestinationCard destination={lake} />
            ))}
          </div>
        </section>
      )}
    </main>
  </article>
</DestinationLayout>

<style>
  .destination {
    max-width: 900px;
    margin: 0 auto;
  }

  .hero {
    position: relative;
    width: 100%;
    height: 400px;
    overflow: hidden;
    margin-bottom: 2rem;
    border-radius: 12px;
  }

  .hero-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .attribution {
    position: absolute;
    bottom: 8px;
    right: 8px;
    background: rgba(0, 0, 0, 0.6);
    color: white;
    padding: 4px 8px;
    font-size: 0.75rem;
    border-radius: 4px;
  }

  .content {
    padding: 0 1rem;
  }

  h1 {
    font-size: 2.5rem;
    margin: 1.5rem 0 0.5rem;
    color: var(--color-text);
  }

  .meta {
    color: var(--color-text-secondary);
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }

  .highlights {
    list-style: none;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .highlights li {
    padding: 0.75rem;
    background: var(--color-secondary);
    border-radius: 8px;
  }

  .description {
    font-size: 1.1rem;
    line-height: 1.8;
    color: var(--color-text-secondary);
    margin: 2rem 0;
  }

  .description p {
    margin-bottom: 1rem;
  }

  .trail-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
    margin: 2rem 0;
    padding: 1.5rem;
    background: var(--color-secondary);
    border-radius: 8px;
  }

  .stat {
    text-align: center;
  }

  .stat strong {
    display: block;
    margin-bottom: 0.5rem;
    color: var(--color-primary);
  }

  .related-section {
    margin: 3rem 0;
  }

  .related-section h2 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .related-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 1.75rem;
    }

    .hero {
      height: 250px;
    }

    .related-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
```

---

## WEEKS 2-12: COMPREHENSIVE DATA COLLECTION

### What "Full Development" Means (Not Cutting These):

**Data Quality:**
- ✅ Verify every coordinate (satellite imagery)
- ✅ Verify every phone number (call it)
- ✅ Verify every website (load it live)
- ✅ Use only official sources (no scraping)
- ✅ Document data provenance (where it came from)
- ✅ Flag data quality (high/medium/needs-verification)

**Content Completeness:**
- ✅ 50-200 word descriptions (not placeholder)
- ✅ Highlights identified (3-5 key features)
- ✅ Hazards documented (safety matters)
- ✅ Cross-links meaningful (only relevant nearby places)
- ✅ Best season identified (when should people go)

**Technical Completeness:**
- ✅ 1200x600px+ hero images (quality matters)
- ✅ Image alt-text descriptive (accessibility)
- ✅ Schema.org markup valid (test it)
- ✅ Internal links working (no broken links)
- ✅ Meta titles/descriptions optimized (SEO)

**Cross-Linking Architecture:**
- ✅ Lake → nearby trails (3-5)
- ✅ Trail → nearby lakes + campgrounds (2-3 each)
- ✅ Campground → nearby everything (4-6 links)
- ✅ Logic makes sense (not just "nearby" but "relevant")

### Weekly Breakdown: 250 Destinations at Full Quality

| Week | Count | Type Focus | Quality Checklist |
|------|-------|-----------|------------------|
| 2 | 20 | State Parks (8), Lakes (8), Trails (4) | Official sources verified, coordinates checked, images found/taken |
| 3 | 40 | Lakes (10), Trails (10), Campgrounds (5) | Full descriptions, hazards identified, cross-links mapped |
| 4 | 60 | Campgrounds (12), WMAs (8) | Amenities cataloged, reservation systems documented |
| 5 | 80 | Trails (15), Historic Sites (5) | Difficulty rated, hazards documented, significance narratives |
| 6 | 100 | Rivers (8), Caves (6), Trails (6) | Class ratings verified, difficulty assessed |
| 7 | 120 | Trails (20) | Trail conditions, GPX links, elevation profiles |
| 8 | 140 | Adventure Resorts (8), Climbing (6), Trails (6) | Pricing verified, activities listed, guides identified |
| 9 | 160 | Backcountry (10), Scenic Drives (8), Trails (7) | Permit requirements, leave-no-trace guidelines |
| 10 | 180 | Trails (15), Fills (5) | 90% of core inventory complete |
| 11 | 215 | Cross-link polish, final gaps | Verify all cross-links, ensure no orphaned pages |
| 12 | 250 | QA pass, schema validation | Final checks: links, images, metadata, schema |

### Daily Quality Checklist (Per Destination)

```
Research Phase:
  ☐ Official source identified
  ☐ Coordinates verified (satellite view + address match)
  ☐ Phone number tested (call it)
  ☐ Website verified live
  ☐ Hours/seasonality current
  ☐ All required fields documented

Content Phase:
  ☐ Description 50-200 words (not placeholder)
  ☐ Highlights identified (3-5)
  ☐ Best season selected
  ☐ Hazards/warnings listed
  ☐ Difficulty/type appropriate to destination

Media Phase:
  ☐ Hero image found/taken (1200x600px+)
  ☐ Image shows actual destination (not generic)
  ☐ Image rights verified (own photo or CC)
  ☐ Alt-text descriptive
  ☐ Gallery images (2-3 additional) if available

SEO Phase:
  ☐ Meta title <60 chars, keyword-rich
  ☐ Meta description ~155 chars, compelling
  ☐ Keywords identified (5-10)
  ☐ Schema.org type correct

Cross-link Phase:
  ☐ Nearby destinations identified (3-5)
  ☐ Distance makes sense (<15 miles)
  ☐ Same audience
  ☐ Destinations already exist in system

TypeScript Phase:
  ☐ File compiles without errors
  ☐ All required fields populated
  ☐ Enums/types used correctly
  ☐ Coordinate accuracy marked

Testing Phase:
  ☐ Page renders without errors
  ☐ Hero image displays correctly
  ☐ Cross-links work (click them)
  ☐ Mobile view looks good
  ☐ Schema.org valid (test 10 pages/week)

Commit Phase:
  ☐ Meaningful commit message
  ☐ Related image file committed
  ☐ Pushed to production
```

---

## INFRASTRUCTURE (Still Zero-Cost)

**You're Using:**
- Git (version control, backup)
- Vercel (hosting, auto-deploy)
- VS Code (editor)
- Astro (static generation)
- TypeScript (type safety)

**You're NOT Using:**
- Contentful ($489/mo) — **Only when you need non-technical content updates**
- Database ($20-100+/mo) — **Static files are your DB**
- CDN ($$$) — **Vercel includes CDN**
- Monitoring service ($$) — **Vercel provides free analytics**

---

## MEASUREMENT AT WEEK 12

**Site Metrics:**
```
✓ 250 destinations live
✓ 250 static HTML pages pre-generated
✓ Build time <3 minutes
✓ Site speed: Lighthouse >90
✓ Zero broken links (automated checks)
✓ Schema.org: 100% valid on sampled pages
✓ Total images: 250+ at full resolution
✓ Git history: 250+ commits tracking each destination
```

**SEO Metrics:**
```
✓ Google Search Console: 250 pages indexed
✓ Impressions: 5,000+ (from search)
✓ CTR: Tracking click-through rate
✓ Rankings: Appearing for "West Virginia [activity]" terms
✓ Sitemap: Auto-generated, submitted
✓ Robots.txt: Verified crawlable
✓ Canonical tags: All correct (no duplicate content)
```

**Quality Metrics:**
```
✓ Data quality: 90%+ marked "high" or "medium"
✓ Cross-link accuracy: 95%+ of links are relevant
✓ Description length: All in 50-200 word range
✓ Images: 100% of destinations have hero image
✓ Metadata: All meta titles <60, descriptions ~155
✓ Accessibility: All images have alt-text
```

**User Experience Metrics:**
```
✓ Navigation: Can go lake → nearby trails → campgrounds
✓ Discovery: Users can explore for >5 minutes
✓ Mobile: Responsive, fast on all devices
✓ Search: Can find destinations by name/county
```

If ALL metrics green → **Ready for Contentful phase**

---

## WHY THIS APPROACH WORKS

**You're not sacrificing quality to save money.** You're:
1. Building fully featured, comprehensive, quality site
2. Deferring CMS expense until you've proven the model works
3. Learning your data structure before designing CMS schema
4. Using free tools (Git + Vercel) that scale

**At Week 12:** You have a real, complete, quality site. 250 verified destinations. Internal linking that makes sense. SEO infrastructure ready. Now you EARN the right to hire someone + add CMS.

**Not a hack. Not an MVP that makes you cringe. A real product that just happens to skip the infrastructure cost until needed.**

---

## THE SCHEDULE

**Week 1:** Architecture setup (4 hours)  
**Weeks 2-12:** 20 destinations/week at full quality (10 hours/week)  
**Total time:** ~130 hours  

**Cost:** $0 until you hit 250 destinations + decide to hire

**Outcome:** 250 verified WV adventure destinations, SEO authority, proven model

Then: Add Contentful + hire content person. Scale to 500+ in next 9 months.

---

**Ready to build the real thing (not an MVP)?**

Start Week 1 with the full TypeScript architecture above. No corners cut. Full development. Just no CMS bill yet.

You've got the code. You know the data sources. You have 12 weeks.

Go ship it.
