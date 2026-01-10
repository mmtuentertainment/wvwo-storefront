# WV Wild Outdoors: Architecture Implementation Guide
## From Theory to Code (Astro + Contentful Hybrid Model)

**Quick Reference:** 3 files you need to modify/create to enable Contentful integration

---

## PART 1: CONTENTFUL SETUP (No Code - Point & Click)

### Step 1: Schema Design in Contentful

Log into Contentful and create these content types:

#### Content Type: `Lake`

```
Fields:
  name (Text, required)
  slug (Text, required, unique)
  county (Text, required)
  description (Rich Text)
  coordinates (JSON - { lat: number, lng: number })
  acreage (Number)
  maxDepth (Number)
  publicAccessPoints (Text, array)
  boatRamps (Number)
  fishingSpecies (Text, array)
  bestSeason (Text, array)
  heroImage (Asset)
  gallery (Asset, array)
  nearbyTrails (Reference to Trail, many)
  nearbyCampgrounds (Reference to Campground, many)
  nearbyLodging (Reference to Lodging, many)
  metaTitle (Text)
  metaDescription (Text)
  isDraft (Boolean)
  publishedAt (Date)
```

#### Content Type: `Trail`

```
Fields:
  name (Text, required)
  slug (Text, required, unique)
  county (Text, required)
  description (Rich Text)
  coordinates (JSON)
  distance (Number) // miles
  difficulty (Text) // easy, moderate, hard, expert
  elevationGain (Number)
  trailheadLocation (Text)
  bestSeason (Text, array)
  hazards (Text, array)
  nearbyLakes (Reference to Lake, many)
  nearbyCampgrounds (Reference to Campground, many)
  nearbyHistoricSites (Reference to HistoricSite, many)
  heroImage (Asset)
  gallery (Asset, array)
  gpxUrl (Text) // link to GPX file
  metaTitle (Text)
  metaDescription (Text)
```

#### Content Type: `Campground`

```
Fields:
  name (Text, required)
  slug (Text, required, unique)
  county (Text, required)
  description (Rich Text)
  coordinates (JSON)
  totalSites (Number)
  hasWater (Boolean)
  hasElectric (Boolean)
  hasShowers (Boolean)
  petFriendly (Boolean)
  reservationUrl (Text)
  nearbyLakes (Reference to Lake, many)
  nearbyTrails (Reference to Trail, many)
  nearbyState Parks (Reference to StatePark, many)
  heroImage (Asset)
  metaTitle (Text)
  metaDescription (Text)
```

**Repeat this pattern for other types: HistoricSite, River, Campground, Climbing Area, Cave, etc.**

---

## PART 2: ASTRO INTEGRATION (Code)

### File 1: `src/lib/contentful.ts`

```typescript
import { createClient } from "contentful";

interface ContentfulLink {
  sys: {
    id: string;
    type: "Link";
    linkType: "Entry" | "Asset";
  };
}

interface ContentfulAsset {
  sys: { id: string };
  fields: {
    title: string;
    file: {
      url: string;
      fileName: string;
      contentType: string;
      details: {
        size: number;
        image?: {
          width: number;
          height: number;
        };
      };
    };
  };
}

interface DestinationBase {
  sys: { id: string };
  fields: {
    name: string;
    slug: string;
    county: string;
    description: string;
    coordinates: { lat: number; lng: number };
    heroImage: ContentfulAsset;
    metaTitle: string;
    metaDescription: string;
    isDraft?: boolean;
  };
}

export const contentfulClient = createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.CONTENTFUL_ACCESS_TOKEN,
});

// Query all lakes with relationships
export async function getAllLakes() {
  const response = await contentfulClient.getEntries({
    content_type: "lake",
    order: "fields.name",
    limit: 1000,
    "fields.isDraft[ne]": true, // Exclude drafts
  });

  return response.items as unknown as (DestinationBase & {
    fields: {
      acreage: number;
      boatRamps: number;
      fishingSpecies: string[];
      nearbyTrails: ContentfulLink[];
      nearbyCampgrounds: ContentfulLink[];
    };
  })[];
}

// Query all trails
export async function getAllTrails() {
  const response = await contentfulClient.getEntries({
    content_type: "trail",
    order: "fields.name",
    limit: 1000,
    "fields.isDraft[ne]": true,
  });

  return response.items as unknown as (DestinationBase & {
    fields: {
      distance: number;
      difficulty: "easy" | "moderate" | "hard" | "expert";
      elevationGain: number;
      hazards: string[];
      nearbyLakes: ContentfulLink[];
      nearbyCampgrounds: ContentfulLink[];
    };
  })[];
}

// Query single destination by slug
export async function getDestinationBySlug(
  contentType: string,
  slug: string
) {
  const response = await contentfulClient.getEntries({
    content_type: contentType,
    "fields.slug": slug,
  });

  return response.items[0] as unknown as DestinationBase;
}

// Resolve linked references (lake.nearbyTrails returns IDs, we need full objects)
export async function resolveReferences(
  destination: any,
  referenceField: string
) {
  const linkIds = destination.fields[referenceField]?.map(
    (link: ContentfulLink) => link.sys.id
  ) || [];

  if (!linkIds.length) return [];

  const response = await contentfulClient.getEntries({
    "sys.id[in]": linkIds.join(","),
  });

  return response.items;
}

// Build internal links (lake -> nearby trails, campgrounds, lodging)
export async function buildCrossLinks(destination: any, destinationType: string) {
  const trails = await resolveReferences(destination, "nearbyTrails");
  const campgrounds = await resolveReferences(destination, "nearbyCampgrounds");
  const lodging = await resolveReferences(destination, "nearbyLodging");

  return {
    trails: trails.map((t: any) => ({
      name: t.fields.name,
      slug: t.fields.slug,
      type: t.sys.contentType.sys.id,
    })),
    campgrounds: campgrounds.map((c: any) => ({
      name: c.fields.name,
      slug: c.fields.slug,
      type: "campground",
    })),
    lodging: lodging.map((l: any) => ({
      name: l.fields.name,
      slug: l.fields.slug,
      type: "lodging",
    })),
  };
}
```

### File 2: `src/pages/near/[type]/[slug].astro`

```astro
---
import { contentfulClient } from "../../../lib/contentful";
import DestinationLayout from "../../../layouts/DestinationLayout.astro";

export async function getStaticPaths() {
  // Get all destination types
  const types = ["lake", "trail", "campground", "cave", "climbing-area"];

  const paths: any[] = [];

  for (const type of types) {
    try {
      const response = await contentfulClient.getEntries({
        content_type: type,
        limit: 1000,
        "fields.isDraft[ne]": true,
      });

      response.items.forEach((item: any) => {
        paths.push({
          params: {
            type,
            slug: item.fields.slug,
          },
          props: { item },
        });
      });
    } catch (error) {
      console.warn(`Could not fetch ${type}:`, error);
    }
  }

  return paths;
}

interface Props {
  item: any;
}

const { item } = Astro.props;
const { name, description, coordinates, heroImage, metaTitle, metaDescription } =
  item.fields;

// Build cross-links
const trails =
  item.fields.nearbyTrails?.map((link: any) => ({
    name: link.fields.name,
    slug: link.fields.slug,
  })) || [];

const campgrounds =
  item.fields.nearbyCampgrounds?.map((link: any) => ({
    name: link.fields.name,
    slug: link.fields.slug,
  })) || [];

// Generate schema.org markup
const schemaMarkup = {
  "@context": "https://schema.org",
  "@type": item.sys.contentType.sys.id === "lake" ? "TouristAttraction" : "Place",
  name,
  description,
  url: Astro.url.href,
  image: `https:${heroImage?.fields.file.url}`,
  geo: {
    "@type": "GeoCoordinates",
    latitude: coordinates.lat,
    longitude: coordinates.lng,
  },
};
---

<DestinationLayout
  title={metaTitle || name}
  description={metaDescription || description}
  schema={schemaMarkup}
>
  <div class="destination-hero">
    <img
      src={`https:${heroImage?.fields.file.url}?w=1200&h=600&fit=fill`}
      alt={name}
      class="hero-image"
    />
  </div>

  <article class="destination-content">
    <h1>{name}</h1>

    <div class="description" set:html={description} />

    <!-- Cross-links -->
    {
      trails.length > 0 && (
        <section class="related-section">
          <h2>Nearby Trails</h2>
          <ul class="link-list">
            {trails.map((trail: any) => (
              <li>
                <a href={`/near/trail/${trail.slug}`}>{trail.name}</a>
              </li>
            ))}
          </ul>
        </section>
      )
    }

    {
      campgrounds.length > 0 && (
        <section class="related-section">
          <h2>Nearby Campgrounds</h2>
          <ul class="link-list">
            {campgrounds.map((camp: any) => (
              <li>
                <a href={`/near/campground/${camp.slug}`}>{camp.name}</a>
              </li>
            ))}
          </ul>
        </section>
      )
    }
  </article>
</DestinationLayout>

<style>
  .destination-hero {
    width: 100%;
    height: 400px;
    overflow: hidden;
    margin-bottom: 2rem;
    border-radius: 8px;
  }

  .hero-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .destination-content {
    max-width: 800px;
    margin: 0 auto;
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: var(--color-text);
  }

  .description {
    font-size: 1.1rem;
    line-height: 1.8;
    color: var(--color-text-secondary);
    margin-bottom: 2rem;
  }

  .related-section {
    background: var(--color-secondary);
    padding: 1.5rem;
    border-radius: 8px;
    margin-bottom: 2rem;
  }

  .related-section h2 {
    font-size: 1.3rem;
    margin-bottom: 1rem;
  }

  .link-list {
    list-style: none;
    padding: 0;
  }

  .link-list li {
    padding: 0.5rem 0;
  }

  .link-list a {
    color: var(--color-primary);
    text-decoration: none;
    font-weight: 500;
  }

  .link-list a:hover {
    text-decoration: underline;
  }
</style>
```

### File 3: `astro.config.mjs`

```javascript
import { defineConfig } from "astro/config";

export default defineConfig({
  // Existing config...
  env: {
    schema: {
      CONTENTFUL_SPACE_ID: z.string(),
      CONTENTFUL_ACCESS_TOKEN: z.string(),
    }
  },
  // Enable static generation (pre-build all pages)
  output: "static",
  // Or use hybrid for on-demand pages
  // output: "hybrid",
});
```

### File 4: `.env.local`

```
CONTENTFUL_SPACE_ID=your_space_id_here
CONTENTFUL_ACCESS_TOKEN=your_access_token_here
```

---

## PART 3: SCHEMA.ORG AUTO-GENERATION

### File: `src/lib/schema.ts`

```typescript
export function generateLakeSchema(destination: any, siteUrl: string) {
  const { name, description, coordinates, county, acreage, heroImage } =
    destination.fields;

  return {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name,
    description,
    image: {
      "@type": "ImageObject",
      url: `https:${heroImage.fields.file.url}`,
      width: heroImage.fields.file.details.image?.width || 1200,
      height: heroImage.fields.file.details.image?.height || 600,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: coordinates.lat,
      longitude: coordinates.lng,
    },
    areaServed: {
      "@type": "Place",
      name: `${county} County, West Virginia`,
    },
    url: siteUrl,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Tourist Information",
      url: "https://wvwildoutdoors.com/contact",
    },
  };
}

export function generateTrailSchema(destination: any, siteUrl: string) {
  const {
    name,
    description,
    coordinates,
    distance,
    difficulty,
    elevationGain,
    heroImage,
  } = destination.fields;

  return {
    "@context": "https://schema.org",
    "@type": "HikingTrail",
    name,
    description,
    image: `https:${heroImage.fields.file.url}`,
    geo: {
      "@type": "GeoCoordinates",
      latitude: coordinates.lat,
      longitude: coordinates.lng,
    },
    url: siteUrl,
    distance: {
      "@type": "Distance",
      value: distance,
      unitCode: "SMI", // statute miles
    },
    difficultLevel: difficulty.toUpperCase(),
    elevationGain: {
      "@type": "Distance",
      value: elevationGain,
      unitCode: "FOT", // feet
    },
  };
}
```

---

## PART 4: AUTOMATED BUILD & DEPLOY

### File: `.github/workflows/contentful-webhook.yml`

```yaml
name: Contentful Webhook Deployment

on:
  repository_dispatch:
    types: [contentful-publish]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - run: npm install
      - run: npm run build
      
      - name: Deploy to Vercel
        uses: vercel/action@main
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

### Contentful Webhook Setup (Manual - Point & Click)

1. Go to Contentful Dashboard → Settings → Webhooks
2. Click "Add Webhook"
3. URL: `https://api.github.com/repos/{OWNER}/{REPO}/dispatches`
4. Method: POST
5. Headers:
   - Authorization: `token {GITHUB_PERSONAL_ACCESS_TOKEN}`
   - Content-Type: application/json
6. Payload: 
   ```json
   {
     "event_type": "contentful-publish"
   }
   ```
7. Trigger on: Publish, Unpublish, and Save (draft)

**Result:** Every time content team publishes in Contentful → site rebuilds automatically

---

## PART 5: DATA IMPORT SCRIPT (Bootstrap Phase)

### File: `scripts/import-lakes.mjs`

Use this to bulk-import your initial 250 destinations from CSV/JSON:

```javascript
import { createClient } from "contentful-management";
import fs from "fs";

const client = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
});

const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID);
const environment = await space.getEnvironment("master");

// Read your CSV or JSON data
const lakesData = JSON.parse(fs.readFileSync("./data/lakes.json", "utf-8"));

for (const lake of lakesData) {
  // Create entry in Contentful
  const entry = await environment.createEntry("lake", {
    fields: {
      name: { "en-US": lake.name },
      slug: { "en-US": lake.slug },
      county: { "en-US": lake.county },
      description: { "en-US": lake.description },
      coordinates: {
        "en-US": {
          lat: lake.latitude,
          lng: lake.longitude,
        },
      },
      acreage: { "en-US": lake.acres },
      boatRamps: { "en-US": lake.boatRamps || 0 },
      fishingSpecies: {
        "en-US": lake.fishingSpecies || [],
      },
      metaTitle: { "en-US": `${lake.name} - WV Wild Outdoors` },
      metaDescription: {
        "en-US": `Discover ${lake.name} in ${lake.county} County, WV. Find camping, trails, and fishing info.`,
      },
      isDraft: { "en-US": false },
    },
  });

  // Publish entry
  await entry.publish();
  console.log(`✓ Published: ${lake.name}`);
}

console.log("Import complete!");
```

Run: `node scripts/import-lakes.mjs`

---

## PART 6: TESTING CHECKLIST

Before going live with Contentful:

```bash
# 1. Test Contentful connection
npm run test:contentful

# 2. Generate all static pages
npm run build

# 3. Check for broken links
npx broken-link-checker http://localhost:3000

# 4. Validate schema.org
npm run test:schema

# 5. Test site speed
npx lighthouse http://localhost:3000

# 6. Deploy preview
npm run preview

# 7. Final deploy
npm run deploy
```

---

## PART 7: CONTENT TEAM WORKFLOW

### Step 1: Train Content Person (30 min)
- Show Contentful dashboard
- Create 3 test destinations together
- Verify workflow (create → publish → appears on site)

### Step 2: Establish Checklist
```
New Destination Checklist:
☐ Official source verified (state park website, official database, etc.)
☐ Coordinates checked (Google Maps satellite view)
☐ Contact info tested (called or website verified live)
☐ Hero image uploaded (at least 1200x600px, shows actual destination)
☐ Description written (50-100 words, SEO keywords included)
☐ Cross-links identified (what nearby destinations should we link?)
☐ Preview reviewed (website → open page → looks good)
☐ Published (click Publish button)
```

### Step 3: Track Progress
```
Week 1: 10 destinations
Week 2: 15 destinations
Week 3: 20 destinations
Month 2: 30+ destinations per week
```

At 30/week, you hit 250 by month 4, 500 by month 9.

---

## COST SUMMARY

| Item | Cost | Notes |
|------|------|-------|
| Contentful | $489/month | Scale plan, supports unlimited entries |
| Vercel | $20/month | Pro plan, auto-deploys |
| Mapbox | $50/month | Basic usage, higher if visualizing all 500 trails |
| **Total** | **$559/month** | Scales infinitely with destinations |

**Breakeven:** At $10K/month revenue (conservative), you hit profitability in month 18-24.

---

## DEBUGGING TIPS

**Problem: Content not appearing**
- Check: Contentful → Entry is published (not draft)
- Check: Environment variables in `.env.local`
- Check: Content type name matches in Astro (case-sensitive!)
- Fix: Rebuild with `npm run build`

**Problem: Slow builds (>2 min)**
- You have too many entries
- Split content types into separate batch queries
- Use content preview API (faster, lower bandwidth)

**Problem: SEO schema validation fails**
- Use: https://validator.schema.org/
- Paste your generated JSON
- Fix: Missing required fields, wrong type names

---

## NEXT STEPS

1. **This week:** Set up Contentful account + schema
2. **Next week:** Integrate GraphQL queries in Astro
3. **Week 3:** Import 50 state parks test data
4. **Week 4:** Soft launch, verify everything works
5. **Week 5-12:** Bulk import 200+ lakes, trails, campgrounds

You've got this. The architecture is sound, the tooling is proven, and the market is ready.
