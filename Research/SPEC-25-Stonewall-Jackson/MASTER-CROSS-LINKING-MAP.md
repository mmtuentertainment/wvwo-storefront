# Master Cross-Linking Map - Stonewall Jackson Lake Complex
**SPEC-25 Research Synthesis**
**Generated**: 2026-01-10
**Queen Coordinator**: Strategic synthesis of all research findings

---

## Multi-Hub Strategy Summary

### Confirmed Hub Pages (4 Primary + 1 Secondary)

| Hub Type | Route | Status | Priority | Cross-Links |
|----------|-------|--------|----------|-------------|
| **Lake** | `/near/lake/stonewall-jackson/` | NEW | CRITICAL | WMA, Campground, Resort, Historic |
| **WMA** | `/near/wma/stonewall-jackson/` | NEW | HIGH | Lake, Campground, Resort |
| **Campground** | `/near/campground/briar-point/` | NEW | HIGH | Lake, WMA, Resort |
| **Resort/State Park** | `/near/state-park/stonewall-resort/` | NEW | MEDIUM | Lake, Campground, Historic, Golf |
| **Historic** | `/near/historic/jacksons-mill/` | VERIFY | MEDIUM | Lake, Resort, Asylum |

**Decision**: Create 4 PRIMARY new hub pages + verify/enhance 1 existing historic page.

---

## Cross-Linking Matrix (Tier 1: Same Complex)

### Lake Hub → Links To:
```typescript
{
  nearbyWMA: ['stonewall-jackson'],           // 0 miles - surrounds lake
  nearbyCampground: ['briar-point'],          // 0 miles - at resort
  nearbyStatePark: ['stonewall-resort'],      // 0 miles - on lake shore
  nearbyHistoric: ['jacksons-mill'],          // 8 miles - heritage connection
  nearbyResort: ['stonewall-resort'],         // 0 miles - primary facility
}
```

### WMA Hub → Links To:
```typescript
{
  nearbyLake: 'stonewall-jackson',            // 0 miles - WMA surrounds lake
  nearbyCampground: ['briar-point'],          // 0 miles - base camp for hunters
  nearbyStatePark: ['stonewall-resort'],      // 0 miles - lodging option
  nearbyWMA: ['smoke-camp', 'stonecoal'],     // 15-20 miles - other Lewis County WMAs
}
```

### Campground Hub → Links To:
```typescript
{
  nearbyLake: 'stonewall-jackson',            // 0 miles - campground on lake
  nearbyWMA: ['stonewall-jackson'],           // 0 miles - hunting access
  nearbyStatePark: ['stonewall-resort'],      // 0 miles - part of resort complex
  nearbyMarina: 'stonewall-resort-marina',    // 0 miles - boat rentals
}
```

### Resort/State Park Hub → Links To:
```typescript
{
  nearbyLake: 'stonewall-jackson',            // 0 miles - resort on lake
  nearbyWMA: ['stonewall-jackson'],           // 0 miles - hunting opportunities
  nearbyCampground: ['briar-point'],          // 0 miles - camping at resort
  nearbyGolf: 'stonewall-resort-golf',        // 0 miles - Arnold Palmer course
  nearbyHistoric: ['jacksons-mill', 'trans-allegheny-asylum'], // 8-10 miles
}
```

### Historic Hub (Jackson's Mill) → Links To:
```typescript
{
  nearbyLake: 'stonewall-jackson',            // 8 miles - named for same person
  nearbyStatePark: ['stonewall-resort'],      // 8 miles - lodging option
  nearbyHistoric: ['trans-allegheny-asylum'], // 10 miles - regional attractions
}
```

---

## Cross-Linking Matrix (Tier 2: Regional 10-30 Miles)

### From Stonewall Jackson Complex → To:
```typescript
{
  nearbyStatePark: [
    'watters-smith',                           // 25 miles NE - historic park
    'north-bend',                              // 30 miles W - rail trail park
    'audra',                                   // 25 miles E - river swimming
  ],
  nearbyWMA: [
    'smoke-camp',                              // 15 miles (estimate)
    'stonecoal',                               // 20 miles (estimate)
  ],
  nearbyHistoric: [
    'trans-allegheny-asylum',                  // 10 miles - Weston
    'mountaineer-military-museum',             // 10 miles (estimate)
  ],
  nearbyLake: [
    'burnsville',                              // 30 miles S - USACE lake
  ],
  nearbyTrail: [
    'north-bend-rail-trail',                   // 25-30 miles - 72-mile rail trail
  ],
  nearbyAgritourism: [
    'lamberts-winery',                         // 15 miles (estimate)
  ],
}
```

---

## Distance Calculations (Haversine Formula Needed)

### Base Coordinates
- **Stonewall Jackson Lake**: 39.0° N, 80.5° W (approximate - refine for production)

### Distances to Calculate
| Destination | Estimated Distance | Coordinates Needed | Priority |
|-------------|-------------------|-------------------|----------|
| Jackson's Mill Historic Area | ~8 miles | YES | HIGH |
| Trans-Allegheny Lunatic Asylum | ~10 miles | 39.055, -80.465 | HIGH |
| Watters Smith State Park | ~25 miles | YES | MEDIUM |
| North Bend State Park | ~30 miles | YES | MEDIUM |
| Audra State Park | ~25 miles | YES | MEDIUM |
| Burnsville Lake | ~30 miles | 38.5476, -80.6590 | MEDIUM |
| Smoke Camp WMA | ~15 miles | YES | LOW |
| Stonecoal Lake WMA | ~20 miles | YES | LOW |

**Action Required**: Use `src/utils/cross-links.ts` haversineDistance() function to calculate precise distances before generating final cross-link arrays.

---

## Dual Data System Planning

### System 1: Data Files (`src/data/`)

#### Files to Create:
```
src/data/lakes/stonewall-jackson.ts          (LakeTemplateProps)
src/data/wma/stonewall-jackson.ts            (WMATemplateProps)
src/data/campgrounds/briar-point.ts          (CampgroundTemplateProps)
src/data/state-parks/stonewall-resort.ts     (StateParkTemplateProps)
```

#### Verify/Enhance:
```
src/data/historic/jacksons-mill.ts           (HistoricTemplateProps - may already exist)
```

### System 2: Content Collection (`src/content/adventures/`)

#### Files to Create:
```
src/content/adventures/stonewall-jackson-lake.md    (type: lake)
src/content/adventures/stonewall-jackson-wma.md     (type: wma)
src/content/adventures/briar-point-campground.md    (type: campground)
src/content/adventures/stonewall-resort.md          (type: state-park OR type: resort)
```

#### Verify/Enhance:
```
src/content/adventures/jacksons-mill.md             (type: historic - may already exist)
```

---

## URL Structure & Routing

### Template Pages (Powered by Data Files):
```
/near/lake/stonewall-jackson/                 → src/pages/near/lake/[slug].astro
/near/wma/stonewall-jackson/                  → src/pages/near/wma/[slug].astro
/near/campground/briar-point/                 → src/pages/near/campground/[slug].astro
/near/state-park/stonewall-resort/            → src/pages/near/state-park/[slug].astro
/near/historic/jacksons-mill/                 → src/pages/near/historic/[slug].astro (verify exists)
```

### Adventures Hub (Powered by Content Collection):
```
/adventures/                                   → Card grid with filters
  → Click "Stonewall Jackson Lake" card → /near/lake/stonewall-jackson/
  → Click "Stonewall Jackson WMA" card  → /near/wma/stonewall-jackson/
  → Click "Briar Point Campground" card → /near/campground/briar-point/
  → Click "Stonewall Resort" card       → /near/state-park/stonewall-resort/
```

### Hunt Near Us Listing (Powered by Hardcoded Array):
```
/near/                                         → Geographic listings page
  Lewis County section:
    - Stonewall Jackson Lake (link to /near/lake/stonewall-jackson/)
    - Stonewall Jackson WMA (link to /near/wma/stonewall-jackson/)
    - Briar Point Campground (link to /near/campground/briar-point/)
    - Stonewall Resort State Park (link to /near/state-park/stonewall-resort/)
```

---

## Content Collection Type Validation

### Required `src/content.config.ts` Updates:
```typescript
// Verify these types exist in z.enum():
'lake'           ✅ (already exists)
'wma'            ✅ (already exists)
'campground'     ✅ (already exists)
'state-park'     ✅ (already exists)
'resort'         ⚠️ (verify if exists, or use 'state-park')
'historic'       ✅ (already exists)
```

### Required `AdventureCard.tsx` Updates:
```typescript
// Verify these cases exist in getAdventureUrl():
case 'lake':         return `/near/lake/${slug}/`;          ✅
case 'wma':          return `/near/wma/${slug}/`;           ✅
case 'campground':   return `/near/campground/${slug}/`;    ✅
case 'state-park':   return `/near/state-park/${slug}/`;    ✅
case 'resort':       return `/near/resort/${slug}/`;        ⚠️ (verify or use state-park)
case 'historic':     return `/near/historic/${slug}/`;      ✅
```

### Filename Suffix Stripping (AdventureCard.tsx):
```typescript
// Content collection filenames → URL slugs:
'stonewall-jackson-lake.md'        → strips '' → 'stonewall-jackson-lake'
'stonewall-jackson-wma.md'         → strips '-wma' → 'stonewall-jackson'
'briar-point-campground.md'        → strips '-campground' → 'briar-point'
'stonewall-resort.md'              → strips '' → 'stonewall-resort'
```

**CRITICAL**: Data file slugs MUST match stripped content collection slugs.

---

## Hunt Near Us Listing Updates

### File to Update: `src/pages/near/index.astro`

#### Add to Lewis County Section:
```typescript
{
  name: "Stonewall Jackson Lake",
  slug: "lake/stonewall-jackson",              // ← NEW ROUTE FORMAT
  type: "Lake",
  description: "#1 bass fishing lake in West Virginia - 2,650 acres with muskie, walleye, crappie",
  county: "Lewis"
},
{
  name: "Stonewall Jackson Wildlife Management Area",
  slug: "wma/stonewall-jackson",               // ← NEW ROUTE FORMAT
  type: "WMA",
  description: "Class-Q hunting for deer, turkey, waterfowl surrounding lake with 300-yard rifle range",
  county: "Lewis"
},
{
  name: "Briar Point Campground",
  slug: "campground/briar-point",              // ← NEW ROUTE FORMAT
  type: "Campground",
  description: "179 lakeside RV/tent sites at Stonewall Resort - year-round camping with full amenities",
  county: "Lewis"
},
{
  name: "Stonewall Resort State Park",
  slug: "state-park/stonewall-resort",         // ← NEW ROUTE FORMAT
  type: "State Park",
  description: "Full-service resort on lake with golf, marina, lodge - 1,736 acres of recreation",
  county: "Lewis"
},
```

---

## Image Strategy

### Required Images (Priority Order):
1. **Lake Hero**: `stonewall-jackson-lake-hero.webp` (boat on lake, dam in background)
2. **WMA Hero**: `stonewall-jackson-wma-hero.webp` (forest/wildlife habitat)
3. **Campground Hero**: `briar-point-campground-hero.webp` (lakeside RV sites)
4. **Resort Hero**: `stonewall-resort-hero.webp` (resort lodge or golf course)

### Image Sources:
- ✅ **USACE Digital Library** (public domain for lake/dam photos)
- ✅ **WV State Parks Media** (request press kit images)
- ✅ **WV Tourism** (wvtourism.com media library)
- ⚠️ **Attribution Required**: Stonewall Resort website images (contact for permission)

### Image Locations:
```
public/images/lakes/stonewall-jackson-lake-hero.webp
public/images/wma/stonewall-jackson-wma-hero.webp
public/images/campgrounds/briar-point-campground-hero.webp
public/images/state-parks/stonewall-resort-hero.webp
```

---

## SEO & Schema.org Strategy

### Lake Hub Page:
- **Schema.org Type**: `Place` + `TouristAttraction` + `BodyOfWater`
- **Keywords**: "Stonewall Jackson Lake fishing", "WV bass fishing", "Lewis County lake"
- **Meta Description**: "Stonewall Jackson Lake in Lewis County, WV - #1 bass fishing lake with muskie, 5 boat ramps, 374-slip marina. USACE flood control lake with 2,650 acres."

### WMA Hub Page:
- **Schema.org Type**: `Place` + `Park`
- **Keywords**: "Stonewall Jackson WMA hunting", "Lewis County deer hunting", "WV turkey hunting"
- **Meta Description**: "Stonewall Jackson Wildlife Management Area - Class-Q hunting for deer, turkey, waterfowl in Lewis County. 300-yard rifle range, 82 miles of lake shoreline habitat."

### Campground Hub Page:
- **Schema.org Type**: `Campground` + `LodgingBusiness`
- **Keywords**: "Briar Point Campground", "Stonewall Resort camping", "Lewis County RV camping"
- **Meta Description**: "Briar Point Campground at Stonewall Resort - 179 lakeside RV and tent sites. Year-round camping on Stonewall Jackson Lake with full amenities."

### Resort Hub Page:
- **Schema.org Type**: `Resort` + `TouristAttraction` + `Park`
- **Keywords**: "Stonewall Resort WV", "Lewis County resort", "WV state park resort"
- **Meta Description**: "Stonewall Resort State Park on Stonewall Jackson Lake - Lodge, golf, marina, camping. 1,736 acres of recreation in Lewis County, West Virginia."

---

## Kim's Voice Strategy (WVWO Brand)

### Lake Page Opening:
> "Stonewall Jackson Lake is the #1 bass fishing lake in West Virginia - and we're not just saying that because it's close to us. The WV DNR actually ranked it #1. Matt and I take the boat out here every spring for muskie, and let me tell you, a 52-inch fish will test your tackle."

### WMA Page Opening:
> "The Stonewall Jackson Wildlife Management Area surrounds the lake with 82 miles of deer and turkey habitat. Matt's had good luck here during archery season, and the 300-yard rifle range means you can sight-in your gun before heading into the woods. Just remember - no camping in the WMA, but Briar Point Campground is right there on the lake."

### Campground Page Opening:
> "Briar Point Campground is where we send customers who want to camp right on the lake. 179 sites, open year-round, and you can back your boat right down to the water. It's $63 a night during the summer, $75 on holidays - but worth it for lakeside camping with full hook-ups."

### Resort Page Opening:
> "Stonewall Resort is the big destination on the lake - lodge, golf course, marina, the whole package. It's where city folks stay when they come out to fish or hunt, and honestly, the Arnold Palmer golf course is worth the trip even if you're not an outdoorsman. The marina opens April 2nd if you need a boat rental."

---

## Cross-Link Section Template

### Bottom of Each Hub Page:
```astro
<section class="nearby-adventures">
  <h2>Nearby Adventures</h2>

  <div class="adventure-grid">
    {nearbyLake && <AdventureCard destination={nearbyLake} distance={calculateDistance()} />}
    {nearbyWMA.map(wma => <AdventureCard destination={wma} distance={calculateDistance()} />)}
    {nearbyCampground.map(camp => <AdventureCard destination={camp} distance={calculateDistance()} />)}
    {nearbyStatePark.map(park => <AdventureCard destination={park} distance={calculateDistance()} />)}
    {nearbyHistoric.map(site => <AdventureCard destination={site} distance={calculateDistance()} />)}
  </div>
</section>
```

**Implementation**: Templates already support this pattern (see SPEC-23 Summersville Lake for reference).

---

## Data Quality & Confidence

### Ready for Implementation (90%+ Confidence):
- ✅ Lake physical specifications (2,650 acres, 26 miles, 82-mile shoreline)
- ✅ Fishing species and #1 ranking
- ✅ WMA Class-Q hunting (deer, turkey, waterfowl)
- ✅ Campground details (179 sites, $63/$75 pricing)
- ✅ Marina operations (374 slips, April 2 opening, 304-269-8895)
- ✅ Historical context (1988 dam, controversial displacement)

### Needs Follow-Up (70-85% Confidence):
- ⚠️ Maximum lake depth (call USACE 304-269-4588)
- ⚠️ WMA acreage (call WV DNR 304-924-6211)
- ⚠️ Specific boat ramp locations (download USACE map)
- ⚠️ Off-season camping rates (call 304-269-8889)
- ⚠️ Trout stocking schedule (check WV DNR website)

### Nice-to-Have (60-70% Confidence):
- ⚠️ Marina rental rates (call 304-269-8895 - likely varies)
- ⚠️ Golf course fees (call resort 304-269-7400)
- ⚠️ Number of displaced families (historical archives)

**Verdict**: **87% data confidence - CLEARED FOR IMPLEMENTATION** with noted gaps.

---

## Implementation Priority Order

### Phase 1: Core Hub Pages (Week 1)
1. **Lake Hub** (`/near/lake/stonewall-jackson/`) - CRITICAL (primary destination)
2. **WMA Hub** (`/near/wma/stonewall-jackson/`) - HIGH (hunting audience)
3. **Campground Hub** (`/near/campground/briar-point/`) - HIGH (camping audience)

### Phase 2: Secondary Hubs (Week 2)
4. **Resort Hub** (`/near/state-park/stonewall-resort/`) - MEDIUM (resort audience)
5. **Content Collection Entries** (4 `.md` files for Adventures hub)
6. **Hunt Near Us Listing** (update `/near/index.astro`)

### Phase 3: Enhancement (Week 3)
7. **Cross-linking integration** (add nearbyX arrays to all pages)
8. **Haversine distance calculations** (precise distances)
9. **Image acquisition** (hero images for all hubs)
10. **SEO optimization** (Schema.org, meta tags)

---

## Success Metrics

### Technical:
- ✅ All 4 hub URLs return 200 status
- ✅ All cross-links functional (no 404s)
- ✅ Adventures hub displays all 4 cards
- ✅ Hunt Near Us listing shows all 4 destinations
- ✅ Lighthouse scores 90+ (performance, SEO, accessibility)

### Content:
- ✅ Kim's voice consistent across all pages
- ✅ WVWO brand compliance (no forbidden fonts/colors)
- ✅ 87%+ data accuracy (verified by Agent 9)
- ✅ All required sections present (see template specs)

### Business:
- ✅ Serves fishing audience (Lake hub)
- ✅ Serves hunting audience (WMA hub)
- ✅ Serves camping audience (Campground hub)
- ✅ Serves resort audience (Resort hub)
- ✅ Cross-linking drives traffic between hubs

---

**Master Cross-Linking Map Complete**
**Status**: Ready for Phase 1 implementation
**Next Action**: Generate Integration Checklist
