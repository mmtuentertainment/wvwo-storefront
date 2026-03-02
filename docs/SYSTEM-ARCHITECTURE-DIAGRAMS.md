# WVWO System Architecture Diagrams
**Visual Reference for Adventure Routing System**

---

## 1. High-Level System Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         WVWO STOREFRONT SYSTEM                          │
└─────────────────────────────────────────────────────────────────────────┘

                              USER ENTRY POINTS
                                    │
                    ┌───────────────┼───────────────┐
                    │               │               │
            ┌──────▼────────┐  ┌───▼─────┐  ┌─────▼──────────┐
            │  /adventures/ │  │  /near/  │  │ Direct URL Link│
            │    Hub Page   │  │Listing   │  │ (e.g., /near/  │
            │  (Card Grid)  │  │ Page     │  │  lake/sutton)  │
            └──────┬────────┘  └───┬─────┘  └─────┬──────────┘
                   │               │              │
                   └───────────────┼──────────────┘
                                   │
                    ┌──────────────▼──────────────┐
                    │   AdventureCard Component   │
                    │   (getAdventureUrl logic)   │
                    └──────────────┬──────────────┘
                                   │
                ┌──────────────────┼──────────────────┐
                │                  │                  │
        ┌───────▼──────┐   ┌──────▼────┐   ┌────────▼────┐
        │ Type Check   │   │Slug Strip  │   │Route Pattern│
        │ (13 types)   │   │(13 suffixes)   │Generation   │
        └───────┬──────┘   └──────┬────┘   └────────┬────┘
                │                  │                │
                └──────────────────┼────────────────┘
                                   │
        ┌──────────────────────────▼──────────────────────────┐
        │              Generated URL                          │
        │  /near/lake/{slug}/ or /near/wma/{slug}/ etc       │
        │           (13 route patterns total)                 │
        └──────────────────────────┬──────────────────────────┘
                                   │
                ┌──────────────────▼──────────────────┐
                │  Dynamic Route File                 │
                │  src/pages/near/{type}/[slug].astro │
                └──────────────────┬──────────────────┘
                                   │
        ┌──────────────────────────▼──────────────────────────┐
        │              Data Discovery                         │
        │  import.meta.glob('../../../data/{type}/*.ts')     │
        │              (Build-time, eager)                    │
        └──────────────────────────┬──────────────────────────┘
                                   │
        ┌──────────────────────────▼──────────────────────────┐
        │          Static Page Generation                     │
        │  Renders HTML with Template components              │
        │  Includes cross-links and SEO schemas               │
        │  Pre-computed at build time (zero runtime cost)    │
        └──────────────────────────┬──────────────────────────┘
                                   │
                    ┌──────────────▼──────────────┐
                    │   Static HTML Output        │
                    │  /near/lake/burnsville/    │
                    │  /near/wma/burnsville/     │
                    │  /near/campground/bulltown/ │
                    │         (etc.)              │
                    └─────────────────────────────┘
```

---

## 2. Data Flow: User Clicks Adventure Card

```
USER CLICKS CARD ON /adventures/
    │
    ├─ Card Data (from content collection):
    │  ├─ id: "burnsville-lake"
    │  ├─ type: "lake"
    │  └─ [title, location, description, image, etc.]
    │
    ▼
AdventureCard Component Renders
    │
    ├─ Props: adventure.id = "burnsville-lake"
    │                type = "lake"
    │
    ▼
getAdventureUrl() Function Executes
    │
    ├─ Input: id = "burnsville-lake", type = "lake"
    │
    ├─ Step 1: Extract slug
    │  ├─ Check id.endsWith('-lake-wma'): NO
    │  ├─ Check id.endsWith('-wma'): NO
    │  ├─ Check id.endsWith('-lake'): YES
    │  ├─ Strip '-lake' suffix
    │  └─ slug = "burnsville"
    │
    ├─ Step 2: Switch on type
    │  ├─ type = 'lake'
    │  └─ Match found
    │
    ├─ Step 3: Return route
    │  └─ return `/near/lake/${slug}/`
    │
    ▼ Result: "/near/lake/burnsville/"
    │
    ▼
<a href="/near/lake/burnsville/">
    │
    ▼
USER NAVIGATES TO /near/lake/burnsville/
    │
    ├─ Browser requests static HTML
    │  └─ Page was pre-rendered at build time
    │
    ▼
Static Page Rendered
    │
    ├─ src/pages/near/lake/[slug].astro loaded params: { slug: "burnsville" }
    │
    ├─ Props from build time:
    │  ├─ lakeData: { name: "Burnsville Lake", ... }
    │  ├─ slug: "burnsville"
    │  ├─ hasRelatedWMA: true
    │  └─ relatedCampgrounds: [ { slug: "bee-run", name: "Bee Run" } ]
    │
    ├─ Render LakeTemplate with lakeData
    │
    ├─ Render cross-links section:
    │  ├─ "Burnsville WMA" → /near/wma/burnsville/
    │  ├─ "Bee Run Campground" → /near/campground/bee-run/
    │  └─ "Bulltown Historic Area" → /historic/bulltown/
    │
    ▼
COMPLETE PAGE LOADED IN BROWSER
```

---

## 3. Build-Time Data Discovery

```
npm run build
    │
    ▼
Astro executes getStaticPaths() for each dynamic route
    │
    ├─ Route: src/pages/near/lake/[slug].astro
    │
    ├─ Discovers data files:
    │  │
    │  └─ import.meta.glob('../../../data/lakes/*.ts', { eager: true })
    │     │
    │     ├─ Finds: burnsville.ts
    │     ├─ Finds: sutton-jackson.ts
    │     ├─ Finds: summersville.ts
    │     ├─ Finds: bluefield.ts
    │     └─ (etc.)
    │
    ├─ For each file:
    │  │
    │  ├─ Extract slug from filename: "burnsville.ts" → slug: "burnsville"
    │  │
    │  ├─ Import module and extract LakeTemplateProps
    │  │
    │  ├─ Validate required fields:
    │  │  ├─ name? ✅
    │  │  ├─ description? ✅
    │  │  ├─ fishingSpots? ✅
    │  │  ├─ marinas? ✅
    │  │  └─ (etc.)
    │  │
    │  ├─ Log warnings for missing fields (if any)
    │  │
    │  ├─ Discover cross-linking data:
    │  │  ├─ WMA slug set: { "burnsville", "ansted", ... }
    │  │  ├─ hasRelatedWMA = wmaSlugSet.has("burnsville") = true
    │  │  │
    │  │  ├─ Campground data: { nearbyLake: "Burnsville Lake" }
    │  │  ├─ relatedCampgrounds = [{ slug: "bee-run", name: "Bee Run" }]
    │  │  └─ (etc.)
    │  │
    │  └─ Push path object:
    │     {
    │       params: { slug: "burnsville" },
    │       props: {
    │         lakeData: { /* complete LakeTemplateProps */ },
    │         slug: "burnsville",
    │         hasRelatedWMA: true,
    │         relatedCampgrounds: [{ slug: "bee-run", name: "Bee Run" }]
    │       }
    │     }
    │
    ▼
Astro receives array of all paths
    │
    ├─ [
    │  │ { params: { slug: "burnsville" }, props: {...} },
    │  │ { params: { slug: "sutton-jackson" }, props: {...} },
    │  │ { params: { slug: "summersville" }, props: {...} },
    │  │ (etc.)
    │  ]
    │
    ▼
Astro renders static HTML for each path
    │
    ├─ /near/lake/burnsville/index.html (with all props)
    ├─ /near/lake/sutton-jackson/index.html (with all props)
    ├─ /near/lake/summersville/index.html (with all props)
    └─ (etc.)
    │
    ▼
Build completes successfully
    │
    └─ Zero 404 errors
    └─ All cross-links pre-computed
    └─ All URLs generated correctly
```

---

## 4. Content Collection to Route Mapping

```
src/content/adventures/
    │
    ├─ burnsville-lake.md
    │  └─ --- YAML Frontmatter ---
    │     title: "Burnsville Lake"
    │     type: "lake"
    │     season: [spring, summer, fall, winter]
    │     location: "Braxton County"
    │     drive_time: "2 hrs"
    │     images: [...]
    │     ---
    │     [Markdown content...]
    │
    ├─ burnsville-wma.md
    │  └─ --- YAML Frontmatter ---
    │     title: "Burnsville WMA"
    │     type: "wma"
    │     [etc.]
    │     ---
    │
    ├─ bee-run-campground.md
    │  └─ --- YAML Frontmatter ---
    │     title: "Bee Run Campground"
    │     type: "campground"
    │     [etc.]
    │     ---
    │
    └─ [40+ more files...]
    │
    ▼
/adventures/ Hub Page
    │
    ├─ Queries content collection for all adventure entries
    │
    ├─ Renders FilteredGrid component
    │  │
    │  ├─ Filters by: season, difficulty, location, suitability
    │  │
    │  └─ For each adventure, render AdventureCard:
    │     │
    │     ├─ Card(adventure.id = "burnsville-lake", adventure.type = "lake")
    │     │
    │     ├─ getAdventureUrl("burnsville-lake", "lake")
    │     │  └─ Returns: "/near/lake/burnsville/"
    │     │
    │     ├─ <a href="/near/lake/burnsville/">
    │     │   [Image]
    │     │   Burnsville Lake
    │     │   [Metadata badges]
    │     │ </a>
    │     │
    │     └─ (User clicks card)
    │
    ▼
Navigation to /near/lake/burnsville/
    │
    └─ [See Data Flow diagram above]
```

---

## 5. Route Pattern Matrix

```
Adventure Type     │ Filename Pattern       │ Data Location    │ Route Pattern          │ Example URL
───────────────────┼────────────────────────┼──────────────────┼────────────────────────┼──────────────────────
lake               │ {name}-lake.md         │ data/lakes/      │ /near/lake/{slug}/     │ /near/lake/burnsville/
wma                │ {name}-wma.md          │ data/wma/        │ /near/wma/{slug}/      │ /near/wma/burnsville/
(both)             │ {name}-lake-wma.md     │ data/            │ /near/[type]/{slug}/   │ (see above)
campground         │ {name}-campground.md   │ data/campgrounds/│ /near/campground/{slug}│ /near/campground/bee-run/
river              │ {name}-river.md        │ data/rivers/     │ /near/river/{slug}/    │ /near/river/new-river/
historic           │ {name}-historic-area.md│ data/historic/   │ /historic/{slug}/      │ /historic/bulltown/
state-park         │ {name}-state-park.md   │ data/state-parks/│ /near/state-park/{slug}│ /near/state-park/babcock/
backcountry        │ {name}-wilderness.md   │ data/backcountry/│ /backcountry/{slug}/   │ /backcountry/dolly-sods/
ski                │ {name}-mountain.md     │ data/ski/        │ /near/ski/{slug}/      │ /near/ski/snowshoe/
cave               │ {name}-cave.md         │ data/caves/      │ /near/cave/{slug}/     │ /near/cave/seneca/
trail              │ {name}-trail.md        │ data/trails/     │ /near/trail/{slug}/    │ /near/trail/appalachian/
climbing           │ {name}-climbing.md     │ data/climbing/   │ /near/climbing/{slug}/ │ /near/climbing/seneca/
national-park      │ {name}-national-pk.md  │ data/national-   │ /near/national-park/   │ /near/national-park/
                   │                        │ parks/           │ {slug}/                │ new-river-gorge/
resort             │ {name}-resort.md       │ data/resorts/    │ /near/resort/{slug}/   │ /near/resort/mountain-gate/
```

---

## 6. Cross-Linking Discovery Process

```
BUILD TIME: Lake Page Generation
────────────────────────────────

src/pages/near/lake/[slug].astro getStaticPaths()
    │
    ├─ Discover all WMA data files
    │  │
    │  └─ wmaSlugSet = { "burnsville", "ansted", "elk-river", ... }
    │
    ├─ For slug = "burnsville":
    │  │
    │  ├─ hasRelatedWMA = wmaSlugSet.has("burnsville")
    │  │                = true ✅
    │  │
    │  └─ props.hasRelatedWMA = true
    │
    ├─ Discover all campground data files
    │  │
    │  └─ For each campground:
    │     ├─ campground.nearbyLake = "Burnsville Lake"
    │     └─ campgroundsByLake.set("burnsville", [campsites])
    │
    ├─ For slug = "burnsville":
    │  │
    │  ├─ relatedCampgrounds = campgroundsByLake.get("burnsville")
    │  │                      = [{ slug: "bee-run", name: "Bee Run" }]
    │  │
    │  └─ props.relatedCampgrounds = [...]
    │
    └─ Render HTML with cross-link section
       │
       ├─ {hasRelatedWMA && (
       │  │  <a href="/near/wma/burnsville/">
       │  │    Burnsville WMA Hunting Guide
       │  │  </a>
       │  )}
       │
       └─ {relatedCampgrounds.map(camp => (
          │  <a href={`/near/campground/${camp.slug}/`}>
          │    {camp.name}
          │  </a>
          │))}


RENDER RESULT: Burnsville Lake Page
────────────────────────────────────

/near/lake/burnsville/
    │
    ├─ [Hero Image]
    ├─ [Lake Stats]
    ├─ [Fishing Spots]
    ├─ [Marinas]
    ├─ [Activities]
    ├─ [Seasonal Guide]
    ├─ [Regulations]
    ├─ [Gear List]
    │
    ├─ ─────────────────────────────────
    │  CROSS-LINKS SECTION
    │  ─────────────────────────────────
    │
    ├─ "Looking for hunting information?"
    │  └─ [Green Link] → Burnsville WMA Hunting Guide
    │                   (/near/wma/burnsville/)
    │
    ├─ "Need a place to camp?"
    │  ├─ [Green Link] → Bee Run Campground
    │  │                 (/near/campground/bee-run/)
    │  ├─ [Green Link] → Battle Run Campground
    │  │                 (/near/campground/battle-run/)
    │  └─ [etc.]
    │
    ├─ ─────────────────────────────────
    │  EMAIL CAPTURE SECTION
    │  ─────────────────────────────────
    │
    └─ [Footer]
```

---

## 7. Error Prevention & Fallback Flow

```
USER ACCESSES ADVENTURE CARD
    │
    ├─ Card has: id = "burnsville-lake", type = "lake"
    │
    ▼
getAdventureUrl() Executes
    │
    ├─ CASE 1: Type is supported ✅
    │  │
    │  ├─ Switch matches one of 13 cases
    │  ├─ Slug correctly derived
    │  ├─ Correct route returned
    │  │
    │  └─ URL: /near/lake/burnsville/ ✅
    │     (Data file exists, page renders)
    │
    ├─ CASE 2: Type is unsupported ❌
    │  │
    │  ├─ Switch has no matching case
    │  ├─ Falls through to default case
    │  │
    │  └─ URL: /adventures/{id}/ (fallback)
    │     (Graceful fallback, no 404)
    │
    ├─ CASE 3: Type mismatch ❌
    │  │
    │  ├─ Markdown says: type: "lak" (typo)
    │  ├─ Switch doesn't match "lak"
    │  ├─ Falls through to default case
    │  │
    │  └─ URL: /adventures/burnsville-lake/ (fallback)
    │     (Graceful fallback, no 404)
    │
    └─ CASE 4: Data file missing ⚠️
       │
       ├─ Markdown exists with type: "lake"
       ├─ But src/data/lakes/burnsville.ts doesn't exist
       │
       ├─ At build time:
       │  └─ getStaticPaths() for lake route doesn't find it
       │  └─ /near/lake/burnsville/ is NOT generated
       │
       ├─ But AdventureCard still has correct URL
       │  └─ Clicking card goes to: /near/lake/burnsville/ (404)
       │
       └─ Mitigation:
           └─ PR checklist ensures both files created together
```

---

## 8. Type System Hierarchy

```
TypeScript Definitions
    │
    ├─ /src/types/adventure.ts
    │  │
    │  ├─ export interface LakeTemplateProps {
    │  │  ├─ name: string
    │  │  ├─ tagline: string
    │  │  ├─ description: string
    │  │  ├─ stats: { acreage, depth, boatRamps, ... }
    │  │  ├─ fishingSpots: Array<{...}>
    │  │  ├─ marinas: Array<{...}>
    │  │  ├─ activities: Array<{...}>
    │  │  ├─ seasonalGuide: { spring, summer, fall, winter }
    │  │  ├─ regulations: {...}
    │  │  ├─ gearList: string[]
    │  │  ├─ relatedShop: {...}
    │  │  ├─ coordinates?: { lat, lng }
    │  │  ├─ nearbyWMA?: string (optional slug)
    │  │  └─ nearbyCampgrounds?: string[] (optional slugs)
    │  │
    │  ├─ export interface WMATemplateProps { ... }
    │  ├─ export interface CampgroundTemplateProps { ... }
    │  ├─ export interface RiverTemplateProps { ... }
    │  └─ [etc. for other types]
    │
    ├─ Data Files Implement These Types
    │  │
    │  ├─ src/data/lakes/burnsville.ts
    │  │  └─ export const lakeData: LakeTemplateProps = { ... }
    │  │
    │  ├─ src/data/wma/burnsville.ts
    │  │  └─ export const wmaData: WMATemplateProps = { ... }
    │  │
    │  └─ [etc.]
    │
    ├─ Dynamic Routes Use These Types
    │  │
    │  ├─ src/pages/near/lake/[slug].astro
    │  │  ├─ type LakeDataModule = { [key: string]: LakeTemplateProps }
    │  │  ├─ const dataModules = import.meta.glob<LakeDataModule>('...')
    │  │  ├─ exportedData: LakeTemplateProps (validated)
    │  │  └─ const validLakeData = Object.values(module).find(...)
    │  │
    │  └─ [etc.]
    │
    └─ Build-Time Type Safety
       │
       ├─ If data doesn't implement LakeTemplateProps:
       │  └─ TypeScript error during build
       │
       ├─ If required field missing:
       │  └─ Console.warn() logged at build time
       │
       └─ All discovered by Astro getStaticPaths()
```

---

## 9. Performance & Caching Model

```
FIRST DEPLOYMENT
    │
    ├─ npm run build
    │  │
    │  ├─ Discover all 50 data files ✅
    │  ├─ Generate all 50 static pages ✅
    │  ├─ Pre-compute all cross-links ✅
    │  ├─ Include all SEO schemas ✅
    │  │
    │  └─ Build output: 50 .html files + assets
    │
    └─ npm run preview
       │
       └─ All pages are 100% static
          └─ Zero runtime overhead
          └─ Zero database queries
          └─ Zero server-side processing


USER ACCESSES PAGE
    │
    ├─ Browser requests: /near/lake/burnsville/
    │  │
    │  └─ CDN/Server returns: burnsville/index.html
    │     (cached, zero computation)
    │
    ├─ Page Load Time: <100ms (static HTML)
    ├─ Time to First Paint: <200ms
    ├─ Lighthouse Score: 100/100
    │
    └─ All cross-links are <a> tags:
       ├─ No fetch() calls
       ├─ No API roundtrips
       ├─ No waiting for data
       └─ Instant navigation


CONTENT UPDATE
    │
    ├─ Edit: src/data/lakes/burnsville.ts
    │  │
    │  └─ Rebuild required
    │     └─ Entire site rebuilds (Astro 4.0+ supports incremental)
    │
    ├─ Rebuild takes: ~30 seconds (for 50 pages)
    │  │
    │  └─ All cross-links re-computed
    │  └─ All SEO schemas updated
    │  └─ All HTML regenerated
    │
    └─ Deploy new HTML
       │
       └─ Users see updates immediately


SCALING
    │
    ├─ 50 destinations: ~30 second build ✅
    ├─ 100 destinations: ~45 second build ✅
    ├─ 200 destinations: ~90 second build ✅ (still acceptable)
    ├─ 500+ destinations: Consider
    │  │
    │  └─ Astro 4.0 incremental builds
    │  └─ Monorepo with separate sections
    │  └─ Database-driven content (server-rendered)
    │
    └─ Current model: Perfect for 50-200 destinations
```

---

## 10. Development vs. Production Flow

```
DEVELOPMENT: npm run dev
    │
    ├─ Astro runs in dev server mode
    │  │
    │  ├─ Discovers data files on page request (no build)
    │  ├─ Renders pages on-the-fly
    │  ├─ Hot reload on file changes
    │  │
    │  └─ /near/lake/[slug] → Server renders with current data
    │
    ├─ Benefits:
    │  ├─ Instant feedback
    │  ├─ No build step needed
    │  └─ Easy testing of changes
    │
    └─ Trade-off:
       └─ Slower initial page load (render on request)


PRODUCTION: npm run build && npm run preview
    │
    ├─ Astro runs getStaticPaths() for all routes
    │  │
    │  ├─ Discovers all data files at build time
    │  ├─ Pre-renders all pages to static HTML
    │  ├─ Pre-computes all cross-links
    │  │
    │  └─ Output: 50 .html files (no JavaScript execution)
    │
    ├─ Benefits:
    │  ├─ Lightning-fast page loads
    │  ├─ Zero server resources
    │  ├─ SEO-friendly (full HTML)
    │  ├─ Cacheable (static files)
    │  │
    │  └─ Costs: Build time, requires rebuild for updates
    │
    └─ Perfect for: Mostly-static content with occasional updates
```

---

**Last Updated**: January 10, 2026
**Diagrams rendered in**: ASCII art (plaintext for version control)
**For Mermaid/visual versions**: Contact architecture team
