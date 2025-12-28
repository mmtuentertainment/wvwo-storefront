# SPEC-12: Component Integration Flow Diagram

**Created**: 2025-12-27
**Companion Document**: SPEC-12-INTEGRATION-ARCHITECTURE.md

---

## 1. High-Level Component Stack

```
┌─────────────────────────────────────────────────────────────────┐
│                         Layout.astro                             │
│  (Global: SEO, fonts, global styles, dark mode toggle)          │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                       Header.astro                          │ │
│  │             (Navigation, logo, shop cart)                   │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                    Breadcrumb.astro                         │ │
│  │          (Home → Hunt Near Us → Elk River WMA)              │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                  <main> WMA Template                        │ │
│  │                                                              │ │
│  │  ┌──────────────────────────────────────────────────────┐  │ │
│  │  │ 1. AdventureHero           (SPEC-09) │ bg-brown     │  │ │
│  │  │    - Title, description, badges, image               │  │ │
│  │  │    - Slots: default, cta, badge-extra, aside         │  │ │
│  │  └──────────────────────────────────────────────────────┘  │ │
│  │                                                              │ │
│  │  ┌──────────────────────────────────────────────────────┐  │ │
│  │  │ 2. AdventureQuickStats     (SPEC-10) │ bg-white     │  │ │
│  │  │    - 4-column stats grid (acreage, drive time, etc)  │  │ │
│  │  │    - Icons from STAT_ICON_PATHS                      │  │ │
│  │  └──────────────────────────────────────────────────────┘  │ │
│  │                                                              │ │
│  │  ┌──────────────────────────────────────────────────────┐  │ │
│  │  │ 3. WMASpeciesGrid          (SPEC-12) │ bg-cream     │  │ │
│  │  │    - Huntable species cards                          │  │ │
│  │  │    - Slots: intro, footer                            │  │ │
│  │  │    - Conditional: hide if species.length === 0       │  │ │
│  │  └──────────────────────────────────────────────────────┘  │ │
│  │                                                              │ │
│  │  ┌──────────────────────────────────────────────────────┐  │ │
│  │  │ 4. WMAFishingWaters        (SPEC-12) │ bg-white     │  │ │
│  │  │    - Named water bodies with species                 │  │ │
│  │  │    - Conditional: hide if waters.length === 0        │  │ │
│  │  └──────────────────────────────────────────────────────┘  │ │
│  │                                                              │ │
│  │  ┌──────────────────────────────────────────────────────┐  │ │
│  │  │ 5. AdventureGettingThere   (SPEC-11) │ bg-cream     │  │ │
│  │  │    - Multi-route directions                          │  │ │
│  │  │    - Route variants: green, orange                   │  │ │
│  │  └──────────────────────────────────────────────────────┘  │ │
│  │                                                              │ │
│  │  ┌──────────────────────────────────────────────────────┐  │ │
│  │  │ 6. WMAFacilitiesGrid       (SPEC-12) │ bg-white     │  │ │
│  │  │    - Parking, boat ramps, ranges, accessibility      │  │ │
│  │  │    - Slots: footer (for accessibility notes)         │  │ │
│  │  │    - Conditional: hide if all counts === 0           │  │ │
│  │  └──────────────────────────────────────────────────────┘  │ │
│  │                                                              │ │
│  │  ┌──────────────────────────────────────────────────────┐  │ │
│  │  │ 7. WMACampingList          (SPEC-12) │ bg-cream     │  │ │
│  │  │    - Campsite types, counts, amenities               │  │ │
│  │  │    - Conditional: hide if sites === 0                │  │ │
│  │  └──────────────────────────────────────────────────────┘  │ │
│  │                                                              │ │
│  │  ┌──────────────────────────────────────────────────────┐  │ │
│  │  │ 8. AdventureGearChecklist  (SPEC-11) │ bg-white     │  │ │
│  │  │    - Gear by category with checkmarks                │  │ │
│  │  │    - Slots: intro, cta (shop cross-sell)             │  │ │
│  │  └──────────────────────────────────────────────────────┘  │ │
│  │                                                              │ │
│  │  ┌──────────────────────────────────────────────────────┐  │ │
│  │  │ 9. WMARegulations          (SPEC-12) │ bg-cream     │  │ │
│  │  │    - Zone, restrictions, safety notes                │  │ │
│  │  │    - Orange left border for emphasis                 │  │ │
│  │  │    - Slots: footer (DNR regulation links)            │  │ │
│  │  └──────────────────────────────────────────────────────┘  │ │
│  │                                                              │ │
│  │  ┌──────────────────────────────────────────────────────┐  │ │
│  │  │ 10. AdventureRelatedShop   (SPEC-11) │ bg-white     │  │ │
│  │  │     - Shop category cards with links                 │  │ │
│  │  │     - Conversion funnel optimization                 │  │ │
│  │  └──────────────────────────────────────────────────────┘  │ │
│  │                                                              │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                      Footer.astro                           │ │
│  │         (Contact info, hours, social links)                 │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Data Flow Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                    elk-river.astro                               │
│                 (WMA Page Component)                             │
│                                                                   │
│  const wmaData = {                                               │
│    hero: { title, description, difficulty, season, ... },       │
│    stats: [{ value, label, icon }, ...],                        │
│    hunting: { species: [...] },                                 │
│    fishing: { waters: [...] },                                  │
│    facilities: [...],                                            │
│    camping: { sites, types, season },                           │
│    regulations: { zone, restrictions, ... },                    │
│    gettingThere: { routes: [...] },                             │
│    gear: [{ category, items }, ...],                            │
│    relatedShop: { categories: [...] }                           │
│  };                                                              │
│                                                                   │
└─────────────────────┬────────────────────────────────────────────┘
                      │
                      │ Props destructured and passed to components
                      │
          ┌───────────┴──────────────────────────────┐
          │                                           │
          ▼                                           ▼
┌─────────────────────┐                    ┌──────────────────────┐
│  AdventureHero      │                    │ WMASpeciesGrid       │
│                     │                    │                      │
│  Props:             │                    │  Props:              │
│  - title            │                    │  - species[]         │
│  - description      │                    │  - variant           │
│  - difficulty       │                    │                      │
│  - season           │                    │  Conditional:        │
│  - driveTime        │                    │  if (species.length) │
│  - image            │                    │    render cards      │
│  - coordinates      │                    │  else               │
│                     │                    │    return null       │
│  Renders:           │                    │                      │
│  - Hero section     │                    │  Slots:              │
│  - Badges           │                    │  - intro             │
│  - CTA buttons      │                    │  - footer            │
│                     │                    │                      │
│  Slots:             │                    │  Renders:            │
│  - default          │                    │  - Species cards     │
│  - cta              │                    │  - Season dates      │
│  - badge-extra      │                    │  - Kim's tips        │
│  - aside            │                    │                      │
└─────────────────────┘                    └──────────────────────┘
```

---

## 3. Background Alternation State Machine

```
                       START: Hero (bg-brown)
                                │
                                ▼
                    ┌───────────────────────┐
                    │  Section Index: 0     │
                    │  Variant: BROWN       │
                    │  (Hero always dark)   │
                    └───────────┬───────────┘
                                │
                                ▼
                    ┌───────────────────────┐
                    │  Section Index: 1     │
                    │  Variant: WHITE       │
                    │  (Max contrast after  │
                    │   dark hero)          │
                    └───────────┬───────────┘
                                │
                                ▼
                    ┌───────────────────────┐
                    │  Section Index: 2     │
                    │  Variant: CREAM       │
                    │  (Alternation begins) │
                    └───────────┬───────────┘
                                │
                                ▼
                    ┌───────────────────────┐
                    │  Section Index: 3     │
                    │  Variant: WHITE       │
                    └───────────┬───────────┘
                                │
                                ▼
                    ┌───────────────────────┐
                    │  Section Index: 4     │
                    │  Variant: CREAM       │
                    └───────────┬───────────┘
                                │
                        (continues alternating...)
                                │
                                ▼
                    ┌───────────────────────┐
                    │  Section Index: N     │
                    │  Variant: N % 2 === 0 │
                    │           ? white     │
                    │           : cream     │
                    └───────────────────────┘

Algorithm:
─────────
function calculateVariant(index: number, heroFirst: boolean): Variant {
  if (index === 0 && heroFirst) return 'brown';

  const adjusted = heroFirst ? index - 1 : index;
  return adjusted % 2 === 0 ? 'white' : 'cream';
}

Edge Case: Conditional Rendering
─────────────────────────────────
If section 4 is hidden (e.g., no fishing data):

  Section 2: cream
  Section 3: white
  [Section 4 SKIPPED]
  Section 5: white  ← WRONG: Two whites adjacent

Solution: Recalculate variants for visible sections only
  visibleSections = sections.filter(s => shouldRender(s.data))
  visibleSections.map((s, i) => ({ ...s, variant: calculateVariant(i) }))
```

---

## 4. Conditional Rendering Decision Tree

```
                    Component Receives Props
                            │
                            ▼
                ┌─────────────────────────┐
                │  Is data undefined?     │
                │  OR null?               │
                └──┬───────────────────┬──┘
                   │ YES               │ NO
                   ▼                   ▼
          ┌────────────────┐   ┌────────────────────┐
          │  Return null   │   │  Is data an array? │
          │  (hide section)│   └──┬──────────────┬──┘
          └────────────────┘      │ YES          │ NO
                                  ▼              ▼
                    ┌──────────────────────┐   ┌──────────────────┐
                    │ data.length >= min?  │   │ Is data object?  │
                    │ (min default: 1)     │   └──┬───────────┬───┘
                    └──┬────────────────┬──┘      │ YES       │ NO
                       │ YES            │ NO      ▼           ▼
                       ▼                ▼    ┌────────┐  ┌────────┐
                  ┌─────────┐     ┌─────────┐│Has req││Render  │
                  │ Render  │     │ Return  ││fields?││section │
                  │ section │     │  null   │└───┬────┘└────────┘
                  └─────────┘     └─────────┘    │
                                              ┌──┴──┐
                                              │ YES │ NO
                                              ▼     ▼
                                        ┌────────┐ ┌────────┐
                                        │Render  │ │Return  │
                                        │section │ │ null   │
                                        └────────┘ └────────┘

Examples:
─────────
WMASpeciesGrid:
  data = undefined           → Return null
  data = []                  → Return null (length < 1)
  data = [{ species1 }]      → Render section (length >= 1)

WMACampingList:
  data = undefined           → Return null
  data = { sites: 0 }        → Return null (sites === 0)
  data = { sites: 10 }       → Render section

AdventureGearChecklist:
  data = undefined           → Return null
  data = [item1, item2]      → Return null (length < 3 minimum)
  data = [i1, i2, i3]        → Render section (length >= 3)
```

---

## 5. Slot Injection Points

```
┌─────────────────────────────────────────────────────────────────┐
│                      AdventureHero                              │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  Badge Container                                           │ │
│  │  ┌──────────────────────────────────────────────────────┐ │ │
│  │  │ [Difficulty Badge] [Season Badge] [Drive Time Badge] │ │ │
│  │  │ <slot name="badge-extra" />  ← Custom badges         │ │ │
│  │  └──────────────────────────────────────────────────────┘ │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  <h1>Elk River WMA</h1>                                         │
│  <p>Description text...</p>                                     │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  <slot />  ← Default slot (Kim's personal notes)          │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  <slot name="cta" />  ← CTA buttons                        │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  [Image Section]                                                │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  <slot name="aside" />  ← Image overlay content            │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────┐
│                      WMASpeciesGrid                             │
│                                                                  │
│  <h2>What to Hunt</h2>                                          │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  <slot name="intro" />  ← Zone context, licensing notes   │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  [Species Cards Grid]                                           │
│  ┌─────────────────┐  ┌─────────────────┐                     │
│  │ White-tailed    │  │ Wild Turkey     │                     │
│  │ Deer            │  │                 │                     │
│  └─────────────────┘  └─────────────────┘                     │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  <slot name="footer" />  ← DNR regulation links            │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────┐
│                   WMAFacilitiesGrid                             │
│                                                                  │
│  <h2>Facilities & Access</h2>                                   │
│                                                                  │
│  [Facilities Grid]                                              │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐               │
│  │ Parking    │  │ Boat Ramps │  │ Shooting   │               │
│  │ (6 areas)  │  │ (2 ramps)  │  │ Ranges (2) │               │
│  └────────────┘  └────────────┘  └────────────┘               │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  <slot name="footer" />  ← Accessibility notes             │ │
│  │  Example: "♿ ADA parking at main entrance"                │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────┐
│                   AdventureGearChecklist                        │
│                                                                  │
│  <h2>What to Bring</h2>                                         │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  <slot name="intro" />  ← Intro text / warnings            │ │
│  │  Example: "We've got this in stock. Stop by before you go."│ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  [Gear Grid]                                                    │
│  ┌─────────────────┐  ┌─────────────────┐                     │
│  │ Deer Hunting    │  │ Turkey Hunting  │                     │
│  │ ☑ Rifle + ammo  │  │ ☑ Shotgun       │                     │
│  │ ☑ Blaze orange  │  │ ☑ Camo          │                     │
│  └─────────────────┘  └─────────────────┘                     │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  <slot name="cta" />  ← Shop cross-sell button             │ │
│  │  Example: <a href="/shop">Browse Our Gear →</a>            │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────┐
│                      WMARegulations                             │
│                                                                  │
│  <h2>Regulations & Safety</h2>                                  │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  Zone 3                                                    │ │
│  │  • Blaze orange required (500 sq in)                       │ │
│  │  • Check DNR calendar for closure dates                    │ │
│  │  • No hunting within 200 yards of boat ramps               │ │
│  │                                                              │ │
│  │  Contact DNR: (304) 924-6211                               │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  <slot name="footer" />  ← External regulation links       │ │
│  │  Example: <a href="...">View Full DNR Regulations →</a>    │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

## 6. Migration Path Visualization

```
BEFORE (elk-river.astro - 533 lines):
═══════════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────────┐
│ import Layout, Header, Footer, EmailCapture, Breadcrumb, ...   │ (10 lines)
│                                                                  │
│ const placeSchema = { /* JSON-LD */ };                          │ (20 lines)
│                                                                  │
│ <Layout>                                                         │
│   <Header />                                                     │
│   <Breadcrumb />                                                 │
│                                                                  │
│   <main>                                                         │
│     <!-- HARDCODED HERO SECTION -->                             │ (26 lines)
│     <section class="bg-brand-brown...">                         │
│       <div class="container...">                                │
│         <h1>Elk River WMA</h1>                                  │
│         <p>Description...</p>                                   │
│       </div>                                                     │
│     </section>                                                   │
│                                                                  │
│     <!-- HARDCODED QUICK INFO -->                               │ (22 lines)
│     <section class="py-8 bg-white...">                          │
│       <div class="grid grid-cols-2 md:grid-cols-4...">          │
│         <div>19,646 Acres</div>                                 │
│         <div>15 min From Shop</div>                             │
│       </div>                                                     │
│     </section>                                                   │
│                                                                  │
│     <!-- HARDCODED WHAT TO HUNT -->                             │ (68 lines)
│     <section class="py-12...">                                  │
│       <h2>What to Hunt</h2>                                     │
│       <div class="space-y-6">                                   │
│         <div class="bg-white p-6...">                           │
│           <h3>White-tailed Deer</h3>                            │
│           <p>Brushlands and mixed timber...</p>                 │
│         </div>                                                   │
│         <!-- Repeat for 5 species -->                           │
│       </div>                                                     │
│     </section>                                                   │
│                                                                  │
│     <!-- HARDCODED FISHING WATERS -->                           │ (34 lines)
│     <!-- HARDCODED GETTING THERE -->                            │ (34 lines)
│     <!-- HARDCODED FACILITIES -->                               │ (79 lines)
│     <!-- HARDCODED WHAT TO BRING -->                            │ (82 lines)
│     <!-- HARDCODED CTA -->                                      │ (32 lines)
│     <!-- HARDCODED NEWSLETTER -->                               │ (10 lines)
│   </main>                                                        │
│                                                                  │
│   <Footer />                                                     │
│ </Layout>                                                        │
└─────────────────────────────────────────────────────────────────┘

Total: 533 lines
Issues:
  ❌ Layout code duplicated across 8 WMA pages
  ❌ Navigation changes require editing 8+ files
  ❌ Inconsistent styling between pages
  ❌ Hard to maintain Kim's content updates
  ❌ No type safety for content structure


AFTER (elk-river.astro - 150 lines):
═══════════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────────┐
│ import Layout, Header, Footer, Breadcrumb                       │ (5 lines)
│ import AdventureHero, AdventureQuickStats, ...                  │ (10 lines)
│ import WMASpeciesGrid, WMAFishingWaters, ...                    │
│                                                                  │
│ const heroImage = await import('../../assets/...');             │ (2 lines)
│                                                                  │
│ // PURE DATA CONFIGURATION (no layout logic)                    │
│ const wmaData = {                                               │ (100 lines)
│   hero: {                                                        │
│     title: "Elk River WMA",                                     │
│     description: "West Virginia's oldest...",                   │
│     difficulty: "moderate",                                     │
│     season: "Fall, Spring",                                     │
│     driveTime: "15 min from shop",                              │
│     image: heroImage,                                           │
│     coordinates: { lat: 38.6833, lng: -80.5833 }               │
│   },                                                             │
│   stats: [                                                       │
│     { value: '19,646', label: 'Acres', icon: 'area' },         │
│     { value: '15 min', label: 'From Shop', icon: 'time' }      │
│   ],                                                             │
│   hunting: {                                                     │
│     species: [                                                   │
│       {                                                          │
│         name: 'White-tailed Deer',                              │
│         category: 'big-game',                                   │
│         season: 'Nov - Dec (firearms)',                         │
│         description: 'Brushlands and mixed timber...',          │
│         tips: 'Creek bottoms when rut kicks in.',               │
│         kimNote: 'Wind can be tricky in steep terrain.'         │
│       },                                                         │
│       // ... more species (data only, no HTML)                  │
│     ]                                                            │
│   },                                                             │
│   fishing: { waters: [...] },                                   │
│   facilities: [...],                                             │
│   camping: { sites: 252, types: [...] },                       │
│   regulations: { zone: 'Zone 3', restrictions: [...] },        │
│   gettingThere: { routes: [...] },                             │
│   gear: [{ category: 'Deer Hunting', items: [...] }],          │
│   relatedShop: { categories: [...] }                           │
│ };                                                               │
│                                                                  │
│ <Layout>                                                         │ (30 lines)
│   <Header />                                                     │
│   <Breadcrumb items={breadcrumbItems} />                        │
│                                                                  │
│   <main class="bg-brand-cream min-h-screen">                    │
│     <!-- COMPONENT ORCHESTRATION -->                            │
│     <AdventureHero {...wmaData.hero} />                         │
│     <AdventureQuickStats {...wmaData.stats} variant="white" />  │
│     <WMASpeciesGrid {...wmaData.hunting} variant="cream" />     │
│     <WMAFishingWaters {...wmaData.fishing} variant="white" />   │
│     <AdventureGettingThere {...wmaData.gettingThere} />         │
│     <WMAFacilitiesGrid {...wmaData.facilities} variant="white" />│
│     <WMACampingList {...wmaData.camping} variant="cream" />     │
│     <AdventureGearChecklist {...wmaData.gear} variant="white">  │
│       <p slot="intro">Stop by before you head out.</p>          │
│     </AdventureGearChecklist>                                    │
│     <WMARegulations {...wmaData.regulations} variant="cream" /> │
│     <AdventureRelatedShop {...wmaData.relatedShop} />           │
│   </main>                                                        │
│                                                                  │
│   <Footer />                                                     │
│ </Layout>                                                        │
└─────────────────────────────────────────────────────────────────┘

Total: 150 lines
Benefits:
  ✅ Layout code maintained in components (DRY principle)
  ✅ Navigation changes update all WMAs instantly
  ✅ Consistent styling enforced by components
  ✅ Kim updates data only, can't break layout
  ✅ TypeScript validates content structure
  ✅ 73% reduction in lines per WMA page
```

---

## 7. Component Dependency Graph

```
                        Layout.astro
                             │
                ┌────────────┴────────────┐
                │                         │
            Header.astro            Footer.astro
                                         │
                                  (global imports)
                                         │
        ┌────────────────────────────────┴────────────────────────┐
        │                                                           │
   AdventureHero                                          WMASpeciesGrid
   (SPEC-09)                                              (SPEC-12)
        │                                                           │
        ├─ AdventureHeroBadge (SPEC-09)                           │
        ├─ Image (astro:assets)                                   │
        ├─ DIFFICULTY_LABELS (types/adventure.ts)                 │
        └─ camoPattern (assets/patterns/)                         │
                                                                    │
   AdventureQuickStats                                   WMAFishingWaters
   (SPEC-10)                                              (SPEC-12)
        │                                                           │
        └─ STAT_ICON_PATHS (types/adventure.ts)                   │
                                                                    │
   AdventureGettingThere                                WMAFacilitiesGrid
   (SPEC-11)                                              (SPEC-12)
        │                                                           │
        └─ (self-contained)                                        │
                                                                    │
   AdventureGearChecklist                                WMACampingList
   (SPEC-11)                                              (SPEC-12)
        │                                                           │
        └─ (self-contained)                                        │
                                                                    │
   AdventureRelatedShop                                 WMARegulations
   (SPEC-11)                                              (SPEC-12)
        │                                                           │
        └─ (self-contained)                                        │
                                                                    │
                    SHARED DEPENDENCIES                            │
        ┌─────────────────────────────────────┐                   │
        │  types/adventure.ts                  │◄──────────────────┘
        │  - Difficulty, Season, StatIcon      │
        │  - DIFFICULTY_LABELS                 │
        │  - STAT_ICON_PATHS                   │
        │  - Zod schemas                       │
        └──────────────────────────────────────┘
                         │
                         ▼
        ┌─────────────────────────────────────┐
        │  styles/global.css                   │
        │  - Brand colors (--brand-brown, etc) │
        │  - Typography (font-display, etc)    │
        │  - Spacing utilities                 │
        └──────────────────────────────────────┘
```

---

## 8. Accessibility Flow

```
Page Load
    │
    ▼
┌──────────────────────────────────────────────────────────────┐
│  Screen Reader Announces:                                    │
│  "Elk River WMA Hunting & Fishing Guide, West Virginia      │
│   Wild Outdoors, page title"                                 │
└──────────────────────────────────────────────────────────────┘
    │
    ▼
┌──────────────────────────────────────────────────────────────┐
│  Skip to Content Link (keyboard users)                       │
│  <a href="#main-content">Skip to main content</a>            │
└──────────────────────────────────────────────────────────────┘
    │
    ▼
┌──────────────────────────────────────────────────────────────┐
│  Header Navigation                                            │
│  - Focusable links with visible focus indicators             │
│  - ARIA labels for interactive elements                      │
└──────────────────────────────────────────────────────────────┘
    │
    ▼
┌──────────────────────────────────────────────────────────────┐
│  Breadcrumb Navigation                                        │
│  - Semantic <nav aria-label="Breadcrumb">                    │
│  - Proper list structure with separators                     │
└──────────────────────────────────────────────────────────────┘
    │
    ▼
┌──────────────────────────────────────────────────────────────┐
│  Main Content Landmark                                        │
│  <main id="main-content" class="...">                        │
│                                                                │
│    ┌────────────────────────────────────────────────────┐   │
│    │  AdventureHero Section                             │   │
│    │  <section aria-labelledby="adventure-hero-elk">    │   │
│    │    <h1 id="adventure-hero-elk">Elk River WMA</h1>  │   │
│    │    - Badge group: role="group"                     │   │
│    │    - External links: "(opens in new tab)" sr-only  │   │
│    │  </section>                                         │   │
│    └────────────────────────────────────────────────────┘   │
│    │                                                          │
│    ▼                                                          │
│    ┌────────────────────────────────────────────────────┐   │
│    │  AdventureQuickStats Section                       │   │
│    │  <section aria-label="Quick statistics">           │   │
│    │    <dl> (description list for stats)               │   │
│    │      <dt>19,646</dt>                                │   │
│    │      <dd>Acres</dd>                                 │   │
│    │    </dl>                                            │   │
│    │  </section>                                         │   │
│    └────────────────────────────────────────────────────┘   │
│    │                                                          │
│    ▼                                                          │
│    ┌────────────────────────────────────────────────────┐   │
│    │  WMASpeciesGrid Section                            │   │
│    │  <section aria-labelledby="species-heading">       │   │
│    │    <h2 id="species-heading">What to Hunt</h2>      │   │
│    │    - Proper heading hierarchy (h1 → h2)            │   │
│    │    - Species cards with semantic structure         │   │
│    │  </section>                                         │   │
│    └────────────────────────────────────────────────────┘   │
│    │                                                          │
│    (continues for all sections...)                           │
│                                                                │
└──────────────────────────────────────────────────────────────┘
    │
    ▼
┌──────────────────────────────────────────────────────────────┐
│  Footer Landmark                                              │
│  - Contact info with proper address markup                   │
│  - Social links with aria-labels                             │
└──────────────────────────────────────────────────────────────┘

Keyboard Navigation Flow:
─────────────────────────
Tab Key Sequence:
  1. Skip to content link
  2. Header navigation links
  3. Breadcrumb links
  4. Hero CTA buttons (if present)
  5. Quick stats (focusable if interactive)
  6. Species cards (if links)
  7. Getting There map links
  8. Facilities grid (if interactive)
  9. Gear checklist shop links
  10. Regulations DNR links
  11. Related shop category cards
  12. Footer links

Focus Indicators:
  - 2px solid outline
  - 3:1 contrast minimum
  - Visible on all interactive elements
  - No keyboard traps
```

---

## Legend

```
┌─────────────────────────────────────────────────────────────┐
│  Component Types                                            │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐   Layout Component                         │
│  │  Layout     │   (global structure)                       │
│  └─────────────┘                                             │
│                                                               │
│  ┌─────────────┐   SPEC-09/10/11 Component                  │
│  │  Adventure  │   (reusable across all adventure pages)    │
│  └─────────────┘                                             │
│                                                               │
│  ┌─────────────┐   SPEC-12 WMA Component                    │
│  │  WMA        │   (WMA-specific sections)                  │
│  └─────────────┘                                             │
├─────────────────────────────────────────────────────────────┤
│  Data Flow                                                   │
├─────────────────────────────────────────────────────────────┤
│  ──────▶  Props passed to component                         │
│  ══════▶  Shared dependency import                          │
│  - - - ▶  Conditional rendering path                        │
├─────────────────────────────────────────────────────────────┤
│  Background Variants                                         │
├─────────────────────────────────────────────────────────────┤
│  │ bg-brown     │   Dark hero (brand-brown #3E2723)         │
│  │ bg-white     │   Clean section (white #FFFFFF)           │
│  │ bg-cream     │   Warm section (brand-cream #FFF8E1)      │
└─────────────────────────────────────────────────────────────┘
```
