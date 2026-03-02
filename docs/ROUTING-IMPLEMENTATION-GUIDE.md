# WVWO Routing Implementation Guide
**Quick Reference for Adventure Routing System**

---

## Quick Start: Add a New Lake Destination

### 1. Create Data File
Create `src/data/lakes/{lake-slug}.ts`:

```typescript
import type { LakeTemplateProps } from '../../types/adventure';

export const lakeData: LakeTemplateProps = {
  name: "Burnsville Lake",
  tagline: "Prime smallmouth and largemouth fishing",
  description: "Burnsville Lake is a premier 330-acre impoundment offering excellent year-round fishing opportunities...",
  image: "/images/lakes/burnsville-hero.webp",
  imageAlt: "Burnsville Lake showing boats and shoreline",

  // Required sections
  stats: {
    acreage: 330,
    depth: 75,
    boatRamps: 2,
    publicMarinas: 1,
    facilities: ["Restrooms", "Picnic Areas", "Parking"]
  },

  fishingSpots: [
    {
      name: "North Cove Marina Area",
      description: "Best for largemouth around structure",
      targetSpecies: ["Largemouth Bass", "Catfish"],
      difficulty: "Intermediate",
      accessType: "Boat Launch"
    },
    // ... more fishing spots
  ],

  marinas: [
    {
      name: "North Cove Marina",
      phone: "(304) 555-0100",
      services: ["Boat Rentals", "Gas", "Tackle Shop"],
      amenities: ["Launch", "Parking", "Restrooms"]
    },
    // ... more marinas
  ],

  activities: [
    { name: "Largemouth Bass Fishing", season: ["Spring", "Summer", "Fall"] },
    { name: "Smallmouth Bass Fishing", season: ["Spring", "Summer", "Fall", "Winter"] },
    { name: "Catfish Fishing", season: ["Summer", "Fall"] },
    { name: "Boat Launch", season: ["Spring", "Summer", "Fall"] },
    { name: "Picnicking", season: ["Spring", "Summer", "Fall"] },
    { name: "Paddling", season: ["Spring", "Summer", "Fall"] }
  ],

  seasonalGuide: {
    spring: "Spring is excellent for both largemouth and smallmouth...",
    summer: "Summer brings the heat and slower fishing during midday...",
    fall: "Fall is prime time with active feeding periods...",
    winter: "Winter offers steady smallmouth fishing..."
  },

  regulations: {
    licenseRequired: true,
    licenseType: "WV Fishing License",
    bassBagLimit: 5,
    bassLengthLimit: "12 inches",
    catfishBagLimit: "No limit",
    seasonClosures: []
  },

  gearList: [
    "WV Fishing License (required)",
    "Medium spinning rod (6-7 ft)",
    "Medium spinning reel (2500-3000 size)",
    "6-10 lb monofilament line",
    "Crankbaits (square bill, lipless)",
    "Soft plastics (worms, creature baits)",
    "Jigs (1/4 - 1/2 oz)",
    "Live bait (shiners, crawfish) optional"
  ],

  relatedShop: {
    name: "WV Wild Outdoors",
    description: "Local tackle shop with Burnsville Lake expertise",
    link: "/"
  },

  // Optional: Coordinates for map
  coordinates: {
    lat: 38.4050,
    lng: -80.5800
  },

  // Optional: Links to related content
  nearbyWMA: "Burnsville",  // Links to /near/wma/burnsville/ if that WMA exists
  nearbyHistoric: ["Burnsville Courthouse"],
  nearbyCampgrounds: ["Bee Run Campground"]
};

export default lakeData;
```

### 2. Create Content Collection Entry
Create `src/content/adventures/burnsville-lake.md`:

```markdown
---
title: "Burnsville Lake - Smallmouth & Largemouth Fishing"
description: "Explore premier 330-acre Burnsville Lake for year-round bass and catfish fishing in north-central West Virginia."
season:
  - spring
  - summer
  - fall
  - winter
difficulty: easy
location: "Braxton County, WV"
coordinates:
  lat: 38.4050
  lng: -80.5800
drive_time: "2 hrs from shop"
suitability:
  - kid-friendly
  - dog-friendly
  - wheelchair-accessible
gear:
  - WV fishing license (required)
  - Medium spinning rod
  - Crankbaits and soft plastics
type: lake
images:
  - src: /images/lakes/burnsville-hero.webp
    alt: "Burnsville Lake shoreline with boats"
    caption: "North Cove Marina area offers excellent access"
kim_hook: "Burnsville is my go-to for consistent bass fishing. The structure around the marina holds fish year-round."
---

# Burnsville Lake Fishing Guide

## Overview
Burnsville Lake is a 330-acre impoundment in Braxton County that offers excellent fishing opportunities throughout the year...

## [Rest of markdown content...]
```

### 3. Verify Files Exist
The build process will automatically:
- ✅ Discover `src/data/lakes/burnsville.ts`
- ✅ Extract slug: `"burnsville"`
- ✅ Generate static path: `/near/lake/burnsville/`
- ✅ Render page from `src/pages/near/lake/[slug].astro`

### 4. Test
```bash
npm run build
npm run preview
# Visit: http://localhost:3000/near/lake/burnsville/
```

---

## Complete Type Mapping

### Route to File Type Mapping
```typescript
// In AdventureCard.tsx getAdventureUrl() function:

'lake'           → /near/lake/{slug}/          (data: src/data/lakes/)
'wma'            → /near/wma/{slug}/           (data: src/data/wma/)
'campground'     → /near/campground/{slug}/    (data: src/data/campgrounds/)
'river'          → /near/river/{slug}/         (data: src/data/rivers/)
'historic'       → /historic/{slug}/           (data: src/data/historic/)
'state-park'     → /near/state-park/{slug}/    (data: src/data/state-parks/)
'backcountry'    → /backcountry/{slug}/        (data: src/data/backcountry/)
'ski'            → /near/ski/{slug}/           (data: src/data/ski/)
'cave'           → /near/cave/{slug}/          (data: src/data/caves/)
'trail'          → /near/trail/{slug}/         (data: src/data/trails/)
'climbing'       → /near/climbing/{slug}/      (data: src/data/climbing/)
'national-park'  → /near/national-park/{slug}/ (data: src/data/national-parks/)
'resort'         → /near/resort/{slug}/        (data: src/data/resorts/)
(none/unknown)   → /adventures/{id}/           (FALLBACK - causes 404s)
```

---

## Content Collection Frontmatter Reference

**Required Fields:**
```yaml
title: "Display name for adventure"
description: "Short SEO description (155 chars)"
season: [spring, summer, fall, winter]
difficulty: easy | moderate | difficult
location: "City/Area, County"
type: lake | wma | campground | river | historic | state-park | backcountry | ski | cave | trail | climbing | national-park | resort
```

**Recommended Fields:**
```yaml
coordinates:
  lat: 38.0000
  lng: -80.0000
drive_time: "45 min from shop"
suitability: [kid-friendly, dog-friendly, wheelchair-accessible]
gear:
  - "WV fishing license (required)"
  - "Specific gear needed"
images:
  - src: /images/{type}/{slug}-hero.webp
    alt: "Descriptive alt text"
    caption: "Optional caption"
kim_hook: "Kim's personal recommendation in her voice"
```

---

## Filename Conventions

### Markdown Filenames
These conventions allow AdventureCard to automatically derive the slug:

| Adventure Type | Filename Format | Example | Derived Slug |
|---|---|---|---|
| Lake | `{name}-lake.md` | `burnsville-lake.md` | `burnsville` |
| WMA | `{name}-wma.md` | `burnsville-wma.md` | `burnsville` |
| Both | `{name}-lake-wma.md` | `burnsville-lake-wma.md` | `burnsville` |
| Campground | `{name}-campground.md` | `bulltown-campground.md` | `bulltown` |
| Historic | `{name}-historic-area.md` | `bulltown-historic-area.md` | `bulltown` |
| Historic | `{name}-battlefield.md` | `carnifex-ferry-battlefield.md` | `carnifex-ferry` |
| State Park | `{name}-state-park.md` | `babcock-state-park.md` | `babcock` |
| Backcountry | `{name}-wilderness.md` | `cranberry-wilderness.md` | `cranberry` |
| River | `{name}-river.md` | `new-river.md` | `new` |
| Ski | `{name}-mountain.md` | `snowshoe-mountain.md` | `snowshoe` |
| Cave | `{name}-cave.md` | `seneca-cave.md` | `seneca` |
| Trail | `{name}-trail.md` | `appalachian-trail.md` | `appalachian` |
| Resort | `{name}-resort.md` | `mountain-gateway-resort.md` | `mountain-gateway` |

---

## Dynamic Route File Template

All dynamic routes follow this pattern:

```typescript
// src/pages/near/{type}/[slug].astro
---
import type { GetStaticPaths } from 'astro';
import Layout from '../../../layouts/Layout.astro';
import Template from '../../../components/templates/{Type}Template.astro';
import type { {Type}TemplateProps } from '../../../types/adventure';

type DataModule = { [key: string]: {Type}TemplateProps };

interface Props {
  data: {Type}TemplateProps;
  slug: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  // 1. AUTO-DISCOVER data files
  const dataModules = import.meta.glob<DataModule>(
    '../../../data/{type}/*.ts',
    { eager: true }
  );

  const paths = [];

  // 2. ITERATE over discovered files
  for (const [path, module] of Object.entries(dataModules)) {
    const filename = path.split('/').pop() ?? '';
    if (filename.startsWith('_')) continue; // Skip templates

    const slug = filename.replace('.ts', '');

    // 3. EXTRACT data from export
    const exportedData = Object.values(module).find(
      (value): value is {Type}TemplateProps =>
        typeof value === 'object' &&
        value !== null &&
        'name' in value
    );

    if (exportedData) {
      // 4. VALIDATE required fields (build-time warnings)
      const requiredFields = ['name', 'description', ...] as const;
      const missingFields = requiredFields.filter(f => !(f in exportedData));
      if (missingFields.length > 0) {
        console.warn(`[${type} ${slug}] Missing: ${missingFields.join(', ')}`);
      }

      // 5. PUSH path for static generation
      paths.push({
        params: { slug },
        props: { data: exportedData, slug }
      });
    }
  }

  return paths;
};

const { data, slug } = Astro.props;
---

<Layout title={data.name}>
  <Template {...data} />
</Layout>
```

---

## Cross-Linking Pattern

### In Data Files
```typescript
export const lakeData: LakeTemplateProps = {
  name: "Burnsville Lake",

  // Optional: Link to related WMA with same slug
  nearbyWMA: "Burnsville",  // Links to /near/wma/burnsville/ if it exists

  // Optional: Link to specific historic sites
  nearbyHistoric: ["Burnsville Courthouse"],

  // Optional: Link to campgrounds nearby
  nearbyCampgrounds: ["Bee Run Campground"],

  // ... rest of data
};
```

### In Dynamic Routes (src/pages/near/lake/[slug].astro)
```typescript
// 1. Discover related data at build time
const wmaSlugSet = new Set(/* WMA slugs */);
const hasRelatedWMA = wmaSlugSet.has(slug);

const campgroundsByLake = new Map<string, CampgroundInfo[]>();
// ... populate from campground data

// 2. Pass to template
return {
  params: { slug },
  props: {
    lakeData: exportedData,
    slug,
    hasRelatedWMA,
    relatedCampgrounds: campgroundsByLake.get(slug) || []
  }
};

// 3. Render cross-links in template
{hasRelatedWMA && (
  <a href={`/near/wma/${slug}/`}>View WMA Hunting Guide</a>
)}

{relatedCampgrounds.map(camp => (
  <a href={`/near/campground/${camp.slug}/`}>{camp.name}</a>
))}
```

---

## Build Process Flow

```
1. npm run build
   ↓
2. Vite discovers all .ts files in src/data/{type}/
   ↓
3. For each dynamic route src/pages/near/{type}/[slug].astro:
   a. Execute getStaticPaths()
   b. Import all data files for that type
   c. Extract slugs and validate data
   d. Return array of { params, props }
   ↓
4. Astro renders each path as static HTML:
   /near/lake/burnsville/
   /near/lake/sutton-jackson/
   /near/wma/burnsville/
   /near/campground/bulltown/
   ↓
5. Build succeeds with all 404 routes eliminated
```

---

## Debugging: 404s on Adventure Cards

### Symptom
Clicking an adventure card on `/adventures/` results in 404

### Diagnosis
1. Check content file: `src/content/adventures/{name}.md`
2. Verify `type:` field in frontmatter
3. Run: `grep "type:" wv-wild-web/src/content/adventures/{name}.md`

### Solutions

**Solution 1: Type mismatch**
```yaml
# WRONG:
type: lak  # Typo

# CORRECT:
type: lake
```

**Solution 2: Unsupported type**
```yaml
# WRONG:
type: fishing-spot  # Not in switch statement

# CORRECT (one of these):
type: lake | wma | campground | river | historic | state-park | backcountry | ski | cave | trail | climbing | national-park | resort
```

**Solution 3: Missing data file**
```
Content says: type: lake
But no file: src/data/lakes/{slug}.ts
→ Create the data file
```

**Solution 4: Filename suffix mismatch**
```
Filename: burnsville.md
Content says: type: lake
→ AdventureCard can't strip "-lake" → derives wrong slug
→ Rename to: burnsville-lake.md
```

### Verification Script
```bash
#!/bin/bash
# Check if all content adventures have corresponding data files

for file in wv-wild-web/src/content/adventures/*.md; do
  type=$(grep "^type:" "$file" | cut -d' ' -f2)
  basename=$(basename "$file" .md)

  # Strip known suffixes
  slug=$(echo "$basename" | sed \
    -e 's/-lake$//' \
    -e 's/-wma$//' \
    -e 's/-campground$//' \
    -e 's/-historic-area$//' \
    -e 's/-state-park$//' \
    -e 's/-wilderness$//' \
    -e 's/-river$//' \
    -e 's/-mountain$//')

  # Check if data file exists
  datafile="wv-wild-web/src/data/${type}/${slug}.ts"

  if [ ! -f "$datafile" ]; then
    echo "❌ MISSING: $datafile (from $basename)"
  else
    echo "✅ OK: $basename → $type/$slug"
  fi
done
```

---

## Image Organization

**Recommended structure:**
```
public/images/
├── lakes/
│   ├── burnsville-hero.webp
│   ├── sutton-jackson-hero.webp
│   └── ...
├── wma/
│   ├── burnsville-hero.webp
│   └── ...
├── campgrounds/
│   ├── bulltown-hero.webp
│   └── ...
├── historic/
│   ├── bulltown-historic-hero.webp
│   └── ...
└── ...
```

**In content frontmatter:**
```yaml
images:
  - src: /images/{type}/{slug}-hero.webp
    alt: "Descriptive alt text"
    caption: "Optional caption"
```

---

## Common Patterns

### Adding Lake + WMA + Campground (Trinity)
```
1. Create src/data/lakes/burnsville.ts
   └─ nearbyWMA: "Burnsville"
   └─ nearbyCampgrounds: ["Bee Run"]

2. Create src/data/wma/burnsville.ts
   └─ nearbyLake: "Burnsville Lake"
   └─ nearbyCampgrounds: ["Bee Run"]

3. Create src/data/campgrounds/bee-run.ts
   └─ nearbyLake: "Burnsville Lake"
   └─ nearbyWMA: "Burnsville"

4. Create markdown files:
   src/content/adventures/burnsville-lake.md (type: lake)
   src/content/adventures/burnsville-wma.md (type: wma)
   src/content/adventures/bee-run-campground.md (type: campground)

5. Build generates:
   /near/lake/burnsville/
   /near/wma/burnsville/
   /near/campground/bee-run/

   With automatic cross-links between all three!
```

---

## Performance Checklist

- [ ] All data files export correct TypeScript type
- [ ] All required fields present (no console warnings at build time)
- [ ] All markdown files have matching data files
- [ ] All markdown files have `type:` field set correctly
- [ ] Images optimized to WebP format
- [ ] Image alt text is descriptive
- [ ] Coordinates included for geographic SEO
- [ ] Build completes with zero errors
- [ ] No 404 errors on adventure cards
- [ ] Cross-links render correctly
- [ ] Lighthouse scores maintained

---

**Last updated:** January 10, 2026
**For questions:** See ARCHITECTURE-VERIFICATION-REPORT.md
