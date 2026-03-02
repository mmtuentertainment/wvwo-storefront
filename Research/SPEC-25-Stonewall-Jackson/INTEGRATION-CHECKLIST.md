# SPEC-25 Integration Checklist - Dual Data System Coverage
**Stonewall Jackson Lake Multi-Hub Migration**
**Generated**: 2026-01-10
**Queen Coordinator**: Complete implementation roadmap

---

## Pre-Implementation Verification

### 1. Check Existing Files
```bash
# Check if any Stonewall Jackson pages already exist
ls src/data/lakes/ | grep -i stonewall
ls src/data/wma/ | grep -i stonewall
ls src/data/campgrounds/ | grep -i briar
ls src/data/state-parks/ | grep -i stonewall
ls src/content/adventures/ | grep -i stonewall
ls src/content/adventures/ | grep -i briar
```

**Expected Result**: No files found (all new content)

### 2. Verify Dynamic Routes Exist
```bash
# Confirm these dynamic route files exist:
ls src/pages/near/lake/[slug].astro
ls src/pages/near/wma/[slug].astro
ls src/pages/near/campground/[slug].astro
ls src/pages/near/state-park/[slug].astro
ls src/pages/near/historic/[slug].astro
```

**Expected Result**: All 5 route files found

### 3. Verify Type System Support
```bash
# Check content.config.ts for required types
grep "'lake'" src/content.config.ts
grep "'wma'" src/content.config.ts
grep "'campground'" src/content.config.ts
grep "'state-park'" src/content.config.ts
```

**Expected Result**: All types present in z.enum()

---

## Phase 1: Data Files (System 1)

### Lake Data File: `src/data/lakes/stonewall-jackson.ts`

#### Required Props (LakeTemplateProps):
```typescript
✅ name: "Stonewall Jackson Lake"
✅ slug: "stonewall-jackson"
✅ location: "Lewis County, WV"
✅ coordinates: { lat: 39.0, lng: -80.5 } // REFINE BEFORE PRODUCTION
✅ description: "The #1 bass fishing lake in West Virginia..."
✅ surfaceArea: "2,650 acres"
✅ shoreline: "82 miles"
✅ maxDepth: "Data not available" // OR contact USACE
✅ fishingSpecies: ["Largemouth Bass", "Smallmouth Bass", "Muskellunge", "Walleye", "Channel Catfish", "Crappie", "Bluegill"]
✅ boatRamps: [
    { name: "Ramp 1", coordinates: {...}, description: "...", fees: "Free" },
    // ... 4 more ramps (GET LOCATIONS FROM USACE)
  ]
✅ facilities: ["5 boat ramps", "374-slip marina", "Visitor center", "Picnic areas"]
✅ kimHook: "Stonewall Jackson Lake is the #1 bass fishing lake in West Virginia..."
✅ nearbyWMA: ["stonewall-jackson"]
✅ nearbyCampground: ["briar-point"]
✅ nearbyStatePark: ["stonewall-resort"]
✅ nearbyHistoric: ["jacksons-mill"]
✅ image: "/images/lakes/stonewall-jackson-lake-hero.webp"
```

**Data Source**: Agent 01 (Lake Physical Specs) + Agent 02 (Fishing Data)

---

### WMA Data File: `src/data/wma/stonewall-jackson.ts`

#### Required Props (WMATemplateProps):
```typescript
✅ name: "Stonewall Jackson Wildlife Management Area"
✅ slug: "stonewall-jackson"
✅ location: "Lewis County, WV"
✅ coordinates: { lat: 39.0, lng: -80.5 } // Same as lake (surrounds it)
✅ description: "Class-Q hunting for deer, turkey, and waterfowl..."
✅ acreage: "Contact WV DNR for acreage" // OR call 304-924-6211
✅ species: ["White-tailed Deer", "Wild Turkey", "Waterfowl"]
✅ huntingType: "Class-Q"
✅ facilities: ["300-yard rifle range", "5 boat ramps (lake access)"]
✅ regulations: "No camping in WMA. Follow WV DNR hunting regulations."
✅ contact: "WV DNR District 3: 304-924-6211"
✅ kimHook: "The Stonewall Jackson WMA surrounds the lake with 82 miles of deer and turkey habitat..."
✅ nearbyLake: "stonewall-jackson"
✅ nearbyCampground: ["briar-point"]
✅ nearbyStatePark: ["stonewall-resort"]
✅ nearbyWMA: ["smoke-camp", "stonecoal"]
✅ image: "/images/wma/stonewall-jackson-wma-hero.webp"
```

**Data Source**: Agent 05 (WMA Hunting Data)

---

### Campground Data File: `src/data/campgrounds/briar-point.ts`

#### Required Props (CampgroundTemplateProps):
```typescript
✅ name: "Briar Point Campground"
✅ slug: "briar-point"
✅ location: "Stonewall Resort State Park, Lewis County, WV"
✅ coordinates: { lat: 39.0, lng: -80.5 } // REFINE (resort location)
✅ description: "179 lakeside RV and tent sites at Stonewall Resort..."
✅ sites: 179
✅ siteTypes: ["RV sites with full hook-ups", "Tent sites", "Lakeside sites"]
✅ season: "Year-round"
✅ fees: {
    peak: "$63/night (Memorial Day - End of October)",
    holiday: "$75/night (Holiday weekends)",
    offSeason: "Call for rates: 304-269-8889"
  }
✅ amenities: [
    "Full hook-ups (electric, water, sewer)",
    "Modern restrooms/showers",
    "Dump station",
    "Lakeside access",
    "Boat launch nearby"
  ]
✅ reservations: "Call 304-269-8889 or book at Recreation.gov"
✅ kimHook: "Briar Point Campground is where we send customers who want to camp right on the lake..."
✅ nearbyLake: "stonewall-jackson"
✅ nearbyWMA: ["stonewall-jackson"]
✅ nearbyStatePark: ["stonewall-resort"]
✅ image: "/images/campgrounds/briar-point-campground-hero.webp"
```

**Data Source**: Agent 04 (USACE Campgrounds)

---

### State Park/Resort Data File: `src/data/state-parks/stonewall-resort.ts`

#### Required Props (StateParkTemplateProps):
```typescript
✅ name: "Stonewall Resort State Park"
✅ slug: "stonewall-resort"
✅ location: "940 Resort Drive, Roanoke, WV 26447"
✅ coordinates: { lat: 39.0, lng: -80.5 } // REFINE (resort address)
✅ description: "Full-service resort on Stonewall Jackson Lake with lodge, golf, marina..."
✅ acreage: "1,736 acres"
✅ activities: [
    "18-hole Arnold Palmer Signature Golf Course",
    "374-slip marina with boat rentals",
    "Fishing on Stonewall Jackson Lake",
    "Camping at Briar Point (179 sites)",
    "Hiking trails",
    "Swimming (lake access)"
  ]
✅ facilities: [
    "Lodge with dining",
    "Golf course",
    "Marina (opens April 2, 2026)",
    "Campground (year-round)",
    "Recreation center (kayak/canoe/SUP rentals)",
    "Picnic areas"
  ]
✅ hours: "Resort open year-round, marina seasonal (April-October)"
✅ fees: "Call 304-269-7400 for lodging and golf rates"
✅ contact: {
    main: "304-269-7400",
    campground: "304-269-8889",
    marina: "304-269-8895"
  }
✅ directions: "I-79 Exit 91, travel 3 miles to resort"
✅ kimHook: "Stonewall Resort is the big destination on the lake - lodge, golf course, marina..."
✅ nearbyLake: "stonewall-jackson"
✅ nearbyWMA: ["stonewall-jackson"]
✅ nearbyCampground: ["briar-point"]
✅ nearbyHistoric: ["jacksons-mill", "trans-allegheny-asylum"]
✅ image: "/images/state-parks/stonewall-resort-hero.webp"
```

**Data Source**: Agent 04 (USACE Campgrounds) + Agent 08 (Visitor Info)

---

## Phase 2: Content Collection Files (System 2)

### Lake Content: `src/content/adventures/stonewall-jackson-lake.md`

```markdown
---
title: "Stonewall Jackson Lake - #1 Bass Fishing in West Virginia"
description: "2,650-acre USACE lake in Lewis County with largemouth bass, muskie, walleye, and 5 boat ramps. 374-slip marina with rentals."
season:
  - spring
  - summer
  - fall
  - winter
difficulty: easy
location: "Lewis County, WV"
coordinates:
  lat: 39.0
  lng: -80.5
drive_time: "45 min from Morgantown, 1.5 hrs from Charleston"
suitability:
  - kid-friendly
  - dog-friendly
gear:
  - WV fishing license (required)
  - Boat or kayak
  - Fishing tackle (bass, muskie, walleye rigs)
type: lake
images:
  - src: /images/lakes/stonewall-jackson-lake-hero.webp
    alt: Stonewall Jackson Lake with boats on water and forested shoreline
    caption: "2,650 acres of premier bass fishing in Lewis County"
kim_hook: "Stonewall Jackson Lake is the #1 bass fishing lake in West Virginia - and we're not just saying that because it's close to us. The WV DNR actually ranked it #1."
---

# Body content (imported from data file automatically by template)
```

**CRITICAL**:
- Filename: `stonewall-jackson-lake.md`
- Type: `lake` (triggers `/near/lake/stonewall-jackson/` routing)
- Slug: Auto-stripped to `stonewall-jackson-lake` (no suffix)

---

### WMA Content: `src/content/adventures/stonewall-jackson-wma.md`

```markdown
---
title: "Stonewall Jackson Wildlife Management Area - Deer & Turkey Hunting"
description: "Class-Q hunting for deer, turkey, waterfowl surrounding Stonewall Jackson Lake. 300-yard rifle range, 82 miles of lake shoreline habitat."
season:
  - spring
  - fall
  - winter
difficulty: moderate
location: "Lewis County, WV"
coordinates:
  lat: 39.0
  lng: -80.5
drive_time: "45 min from Morgantown, 1.5 hrs from Charleston"
suitability:
  - experienced-hunters
gear:
  - WV hunting license (required)
  - Deer tags or turkey permit
  - Firearms or archery equipment
  - Hunter orange (firearms season)
type: wma
images:
  - src: /images/wma/stonewall-jackson-wma-hero.webp
    alt: Forested wildlife habitat at Stonewall Jackson WMA
    caption: "Class-Q hunting for deer, turkey, and waterfowl"
kim_hook: "The Stonewall Jackson WMA surrounds the lake with 82 miles of deer and turkey habitat. Matt's had good luck here during archery season."
---

# Body content (imported from data file automatically by template)
```

**CRITICAL**:
- Filename: `stonewall-jackson-wma.md`
- Type: `wma` (triggers `/near/wma/stonewall-jackson/` routing)
- Slug: AdventureCard strips `-wma` → `stonewall-jackson`

---

### Campground Content: `src/content/adventures/briar-point-campground.md`

```markdown
---
title: "Briar Point Campground - Lakeside Camping at Stonewall Resort"
description: "179 RV and tent sites on Stonewall Jackson Lake. Year-round camping with full amenities, boat launch access, and resort facilities."
season:
  - spring
  - summer
  - fall
  - winter
difficulty: easy
location: "Stonewall Resort State Park, Lewis County, WV"
coordinates:
  lat: 39.0
  lng: -80.5
drive_time: "45 min from Morgantown, 1.5 hrs from Charleston"
suitability:
  - kid-friendly
  - dog-friendly
  - wheelchair-accessible
gear:
  - Camping gear (tent or RV)
  - WV fishing license (optional - lake access)
  - Boat (optional - launch nearby)
type: campground
images:
  - src: /images/campgrounds/briar-point-campground-hero.webp
    alt: RV campsites with lake views at Briar Point Campground
    caption: "179 lakeside sites open year-round at Stonewall Resort"
kim_hook: "Briar Point Campground is where we send customers who want to camp right on the lake. 179 sites, open year-round, and you can back your boat right down to the water."
---

# Body content (imported from data file automatically by template)
```

**CRITICAL**:
- Filename: `briar-point-campground.md`
- Type: `campground` (triggers `/near/campground/briar-point/` routing)
- Slug: AdventureCard strips `-campground` → `briar-point`

---

### Resort Content: `src/content/adventures/stonewall-resort.md`

```markdown
---
title: "Stonewall Resort State Park - Full-Service Lake Resort"
description: "1,736-acre resort on Stonewall Jackson Lake with lodge, Arnold Palmer golf, marina, and 179-site campground. Year-round recreation."
season:
  - spring
  - summer
  - fall
  - winter
difficulty: easy
location: "940 Resort Drive, Roanoke, WV 26447"
coordinates:
  lat: 39.0
  lng: -80.5
drive_time: "45 min from Morgantown, 1.5 hrs from Charleston"
suitability:
  - kid-friendly
  - dog-friendly
  - wheelchair-accessible
gear:
  - Golf clubs (18-hole course)
  - WV fishing license (lake access)
  - Boat or rent from marina
type: state-park
images:
  - src: /images/state-parks/stonewall-resort-hero.webp
    alt: Stonewall Resort lodge and golf course on lake
    caption: "Full-service resort with lodge, golf, and marina"
kim_hook: "Stonewall Resort is the big destination on the lake - lodge, golf course, marina, the whole package. It's where city folks stay when they come out to fish or hunt."
---

# Body content (imported from data file automatically by template)
```

**CRITICAL**:
- Filename: `stonewall-resort.md`
- Type: `state-park` (triggers `/near/state-park/stonewall-resort/` routing)
- Slug: Auto-stripped to `stonewall-resort` (no suffix)

---

## Phase 3: Integration Updates

### 3.1 Update `src/content.config.ts`

#### Verify Type Enum:
```typescript
type: z.enum([
  'adventure',
  'wma',
  'lake',
  'river',
  'ski',
  'campground',  // ✅ Verify exists
  'historic',
  'state-park',  // ✅ Verify exists
  'backcountry',
  'cave',
  'trail',
  'climbing',
  'national-park',
  'resort'       // ⚠️ Add if missing (OR use state-park)
])
```

**Action**: If `campground` or `state-park` missing, add to enum.

---

### 3.2 Update `src/components/adventures/AdventureCard.tsx`

#### Verify Route Cases:
```typescript
function getAdventureUrl(type: string, id: string): string {
  // Strip suffixes for proper slug matching
  const slug = id
    .replace(/-lake-wma$/, '')      // ✅ Existing
    .replace(/-wma$/, '')           // ✅ Existing
    .replace(/-lake$/, '')          // ✅ Existing
    .replace(/-campground$/, '')    // ✅ Verify exists
    .replace(/-state-park$/, '')    // ✅ Verify exists
    .replace(/-resort$/, '');       // ⚠️ Add if missing

  switch (type) {
    case 'wma':          return `/near/wma/${slug}/`;          // ✅
    case 'lake':         return `/near/lake/${slug}/`;         // ✅
    case 'campground':   return `/near/campground/${slug}/`;   // ✅ Verify exists
    case 'state-park':   return `/near/state-park/${slug}/`;   // ✅ Verify exists
    case 'resort':       return `/near/resort/${slug}/`;       // ⚠️ OR use state-park
    case 'historic':     return `/near/historic/${slug}/`;     // ✅
    default:             return `/adventures/${id}/`;          // Fallback (404s!)
  }
}
```

**Action**:
1. Verify `campground` and `state-park` cases exist
2. Add `-campground`, `-state-park`, `-resort` suffix stripping if missing
3. Test that all 4 content collection files route correctly

---

### 3.3 Update `src/pages/near/index.astro`

#### Add to Destinations Array:
```typescript
// Find the Lewis County section and add:

{
  name: "Stonewall Jackson Lake",
  slug: "lake/stonewall-jackson",              // NEW: type/slug format
  type: "Lake",
  description: "#1 bass fishing lake in West Virginia - 2,650 acres with muskie, walleye, crappie",
  county: "Lewis"
},
{
  name: "Stonewall Jackson Wildlife Management Area",
  slug: "wma/stonewall-jackson",
  type: "WMA",
  description: "Class-Q hunting for deer, turkey, waterfowl surrounding lake with 300-yard rifle range",
  county: "Lewis"
},
{
  name: "Briar Point Campground",
  slug: "campground/briar-point",
  type: "Campground",
  description: "179 lakeside RV/tent sites at Stonewall Resort - year-round camping with full amenities",
  county: "Lewis"
},
{
  name: "Stonewall Resort State Park",
  slug: "state-park/stonewall-resort",
  type: "State Park",
  description: "Full-service resort on lake with golf, marina, lodge - 1,736 acres of recreation",
  county: "Lewis"
},
```

**CRITICAL**: The `slug` field MUST use `type/slug` format (e.g., `lake/stonewall-jackson`) to match new dynamic route structure.

---

## Phase 4: Image Acquisition

### Required Hero Images (Priority Order):
```
public/images/lakes/stonewall-jackson-lake-hero.webp           (1200x800, optimized)
public/images/wma/stonewall-jackson-wma-hero.webp              (1200x800, optimized)
public/images/campgrounds/briar-point-campground-hero.webp     (1200x800, optimized)
public/images/state-parks/stonewall-resort-hero.webp           (1200x800, optimized)
```

### Image Sources (Attribution Strategy):
1. **USACE Digital Library** (public domain):
   - Search: "Stonewall Jackson Lake"
   - URL: https://www.bing.com/images/ + filter:public domain
   - Good for: Dam, lake aerial, infrastructure photos

2. **WV State Parks Media Kit**:
   - Contact: WV State Parks Communications
   - Email: parks@wv.gov
   - Request: Press kit images for Stonewall Resort

3. **WV Tourism Media Library**:
   - URL: https://wvtourism.com/media/
   - Request access for media/bloggers
   - Good for: Resort, golf course, aerial shots

4. **Stonewall Resort Website** (requires permission):
   - Contact resort for usage rights
   - Phone: 304-269-7400
   - Good for: Lodge, marina, campground photos

### Image Optimization:
```bash
# Resize and convert to WebP (use ImageMagick or similar)
convert source.jpg -resize 1200x800^ -gravity center -extent 1200x800 -quality 85 output.webp
```

---

## Phase 5: Cross-Linking Integration

### 5.1 Calculate Precise Distances

#### Use Haversine Formula:
```typescript
import { haversineDistance } from '@/utils/cross-links';

// Get precise coordinates for each destination:
const stonewallLake = { lat: 39.0, lng: -80.5 };      // REFINE
const jacksonsMill = { lat: 39.XXX, lng: -80.XXX };   // GET COORDS
const asylum = { lat: 39.055, lng: -80.465 };         // REFINE

const distanceToJacksonsMill = haversineDistance(
  stonewallLake.lat, stonewallLake.lng,
  jacksonsMill.lat, jacksonsMill.lng
);
// Result: "8.2 miles" (example)
```

**Action**:
1. Get precise lat/lng for Stonewall Jackson Lake dam
2. Get precise lat/lng for all nearby destinations
3. Calculate and document distances
4. Add to data files as `distance: "8.2 miles"`

---

### 5.2 Test Cross-Linking Matrix

#### From Lake Hub:
```
Visit /near/lake/stonewall-jackson/
Scroll to "Nearby Adventures"
Verify links to:
  - Stonewall Jackson WMA (0 miles)
  - Briar Point Campground (0 miles)
  - Stonewall Resort State Park (0 miles)
  - Jackson's Mill Historic Area (~8 miles)
```

#### From WMA Hub:
```
Visit /near/wma/stonewall-jackson/
Verify links to:
  - Stonewall Jackson Lake (0 miles)
  - Briar Point Campground (0 miles)
  - Stonewall Resort State Park (0 miles)
```

**Expected Result**: All cross-links resolve to 200 status (no 404s)

---

## Phase 6: SEO & Schema.org

### 6.1 Verify Schema.org Types

#### Lake Page Schema:
```typescript
{
  "@context": "https://schema.org",
  "@type": ["Place", "TouristAttraction", "BodyOfWater"],
  "name": "Stonewall Jackson Lake",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Lewis County",
    "addressRegion": "WV"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 39.0,
    "longitude": -80.5
  }
}
```

#### WMA Page Schema:
```typescript
{
  "@context": "https://schema.org",
  "@type": ["Place", "Park"],
  "name": "Stonewall Jackson Wildlife Management Area",
  "description": "Class-Q hunting for deer, turkey, waterfowl"
}
```

#### Campground Page Schema:
```typescript
{
  "@context": "https://schema.org",
  "@type": "Campground",
  "name": "Briar Point Campground",
  "numberOfRooms": 179,
  "priceRange": "$63-$75 per night"
}
```

#### Resort Page Schema:
```typescript
{
  "@context": "https://schema.org",
  "@type": ["Resort", "TouristAttraction", "Park"],
  "name": "Stonewall Resort State Park",
  "amenityFeature": [
    {"@type": "LocationFeatureSpecification", "name": "Golf Course"},
    {"@type": "LocationFeatureSpecification", "name": "Marina"}
  ]
}
```

**Action**: Templates already include Schema.org - verify correct types rendered.

---

### 6.2 Meta Tags & SEO

#### Each Hub Page Must Have:
```html
<title>Stonewall Jackson Lake - #1 Bass Fishing in West Virginia | WVWO</title>
<meta name="description" content="2,650-acre lake in Lewis County with largemouth bass, muskie, walleye. 5 boat ramps, 374-slip marina. USACE flood control lake." />
<meta name="keywords" content="Stonewall Jackson Lake, WV bass fishing, Lewis County lake, muskie fishing" />
<link rel="canonical" href="https://wvwo.com/near/lake/stonewall-jackson/" />
```

**Action**: Templates auto-generate meta tags from data file props.

---

## Phase 7: Testing & Validation

### 7.1 Build Test
```bash
npm run build
```

**Expected Result**:
- ✅ No TypeScript errors
- ✅ No missing image warnings
- ✅ All 4 hub pages generate successfully
- ✅ Build completes in <2 minutes

---

### 7.2 Route Testing
```bash
# Start dev server
npm run dev

# Test all routes return 200:
curl -I http://localhost:4321/near/lake/stonewall-jackson/
curl -I http://localhost:4321/near/wma/stonewall-jackson/
curl -I http://localhost:4321/near/campground/briar-point/
curl -I http://localhost:4321/near/state-park/stonewall-resort/
```

**Expected Result**: All return `HTTP/1.1 200 OK`

---

### 7.3 Adventures Hub Test
```bash
# Visit Adventures hub
open http://localhost:4321/adventures/

# Verify 4 new cards appear:
- Stonewall Jackson Lake (with lake icon)
- Stonewall Jackson WMA (with deer icon)
- Briar Point Campground (with tent icon)
- Stonewall Resort State Park (with mountain icon)

# Click each card, verify routes to correct hub page
```

**Expected Result**: All cards visible, all links functional

---

### 7.4 Hunt Near Us Test
```bash
# Visit Hunt Near Us listing
open http://localhost:4321/near/

# Scroll to Lewis County section
# Verify 4 new destinations listed with correct slugs:
- Stonewall Jackson Lake → /near/lake/stonewall-jackson/
- Stonewall Jackson WMA → /near/wma/stonewall-jackson/
- Briar Point Campground → /near/campground/briar-point/
- Stonewall Resort State Park → /near/state-park/stonewall-resort/
```

**Expected Result**: All 4 destinations appear in Lewis County section

---

### 7.5 Cross-Link Test
```bash
# Visit lake hub
open http://localhost:4321/near/lake/stonewall-jackson/

# Scroll to "Nearby Adventures" section
# Verify links to:
- WMA (click → verifies route)
- Campground (click → verifies route)
- Resort (click → verifies route)
- Historic sites (if coordinates available)

# Repeat from WMA, Campground, Resort hubs
```

**Expected Result**: All cross-links resolve (no 404s)

---

### 7.6 Lighthouse Test
```bash
# Run Lighthouse audit on each hub page
npx lighthouse http://localhost:4321/near/lake/stonewall-jackson/ --view
npx lighthouse http://localhost:4321/near/wma/stonewall-jackson/ --view
npx lighthouse http://localhost:4321/near/campground/briar-point/ --view
npx lighthouse http://localhost:4321/near/state-park/stonewall-resort/ --view
```

**Expected Result**:
- Performance: 90+ (optimize images if <90)
- SEO: 90+
- Accessibility: 90+
- Best Practices: 90+

---

## Phase 8: Brand Compliance Check

### WVWO Frontend Aesthetics Checklist

#### Fonts (FORBIDDEN):
- ❌ Inter, DM Sans, Space Grotesk, Poppins, Outfit, Montserrat
- ✅ ONLY use: Bitter (display), Permanent Marker (Kim's voice), Noto Sans (body)

#### Colors (FORBIDDEN):
- ❌ Purple gradients, hot pink, neon, corporate blue
- ✅ ONLY use: Brand brown (#3E2723), Sign green (#2E7D32), Brand cream (#FFF8E1), Blaze orange (#FF6F00, <5% CTAs)

#### Styles (FORBIDDEN):
- ❌ Glassmorphism, backdrop-blur, rounded-md/lg/xl, parallax, bouncy animations
- ✅ ONLY use: rounded-sm (sharp corners), bold weights 700-900

#### Copy (FORBIDDEN):
- ❌ "Unlock potential", "Seamless experience", "Revolutionize", "Next-level"
- ✅ ONLY use: Kim's authentic rural WV voice (direct, humble, faith-forward)

**Action**: Review all 4 hub pages for compliance with WVWO brand guidelines.

---

## Phase 9: Deployment Readiness

### Pre-Deployment Checklist

#### Data Completeness:
- ✅ All 4 data files created with verified data
- ✅ All 4 content collection files created
- ✅ All nearbyX cross-links populated
- ✅ All kim_hook fields written in authentic voice
- ⚠️ Image files acquired (or placeholders documented)
- ⚠️ Precise coordinates obtained (or noted as "approximate")

#### Technical Validation:
- ✅ `npm run build` succeeds
- ✅ `npm run typecheck` passes
- ✅ All routes return 200 status
- ✅ No console errors in browser
- ✅ Lighthouse scores 90+

#### Integration Verification:
- ✅ Adventures hub displays all 4 cards
- ✅ Hunt Near Us lists all 4 destinations
- ✅ All cross-links functional
- ✅ Schema.org validates (Google Rich Results Test)
- ✅ Meta tags present on all pages

#### Content Quality:
- ✅ 87%+ data accuracy (Agent 9 verified)
- ✅ Kim's voice consistent across all pages
- ✅ WVWO brand compliance 100%
- ✅ No forbidden fonts/colors/styles
- ✅ Practical visitor info complete (hours, fees, contact)

---

## Post-Deployment Follow-Up

### Week 1: Monitoring
- Check Google Search Console for crawl errors
- Monitor Analytics for traffic to new hub pages
- Verify sitemap.xml includes all 4 new pages
- Test cross-linking from existing WVWO pages

### Week 2: Data Gap Resolution
- Call USACE (304-269-4588) for:
  - Maximum lake depth
  - Specific boat ramp locations and coordinates
  - Visitor center hours

- Call WV DNR (304-924-6211) for:
  - WMA acreage
  - Detailed boundary maps

- Call Stonewall Resort for:
  - Off-season camping rates
  - Marina rental rates
  - Golf course fees

### Week 3: Enhancement
- Add user reviews/testimonials (if collected)
- Add seasonal fishing/hunting reports
- Add photo gallery (if additional images acquired)
- Consider adding "Best Times to Visit" seasonal calendar

---

## Integration Confidence Score

| Component | Status | Confidence | Blocker? |
|-----------|--------|------------|----------|
| Data Files | Ready | 87% | NO |
| Content Collection | Ready | 95% | NO |
| Dynamic Routes | Existing | 100% | NO |
| Type System | Verify | 90% | NO |
| AdventureCard Routing | Verify | 85% | NO |
| Hunt Near Us Listing | Ready | 100% | NO |
| Cross-Linking | Ready | 80% | NO |
| Images | Pending | 60% | NO (placeholders OK) |
| SEO/Schema | Auto-Generated | 95% | NO |
| Brand Compliance | Review | 90% | NO |

**Overall Readiness**: 88% - **CLEARED FOR PHASE 1 IMPLEMENTATION**

---

## Critical Path Summary

### Must-Do Before Deployment:
1. ✅ Create 4 data files with verified data
2. ✅ Create 4 content collection files
3. ✅ Update AdventureCard.tsx routing (verify cases exist)
4. ✅ Update /near/index.astro with 4 new destinations
5. ⚠️ Acquire hero images (or use placeholders)
6. ✅ Test all routes return 200
7. ✅ Verify cross-links functional
8. ✅ Brand compliance review

### Nice-to-Have Before Deployment:
- Precise coordinates (can use approximations initially)
- Maximum lake depth (can note "data not available")
- WMA acreage (can note "contact DNR for details")
- Rental rates (can note "call for rates")

### Post-Deployment Follow-Up:
- Fill data gaps with phone calls
- Acquire professional photos
- Add seasonal content
- Monitor performance metrics

---

**Integration Checklist Complete**
**Status**: Ready for implementation
**Next Action**: Begin Phase 1 (Data File Creation)
