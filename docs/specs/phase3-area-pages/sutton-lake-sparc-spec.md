# SPARC Task Specification: Sutton Lake Recreation Area Page

## META
- **Version**: 2.0
- **Generated**: 2025-12-12
- **Methodology**: Lean + Verified + Authentic Local
- **Pattern Source**: elk-river.astro (416 lines), burnsville-lake.astro (307 lines)

---

## 1. SPECIFICATION

### 1.1 Objective
Build a lean, verified Sutton Lake detail page that drives anglers and campers to WVWO shop. Focus on fishing and camping (not hunting - it's an Army Corps lake, not WMA).

### 1.2 Context
| Field | Value |
|-------|-------|
| **Target File** | `wv-wild-web/src/pages/near/sutton-lake.astro` |
| **Priority** | HIGH - Closest recreational area to shop (10 min) |
| **Managing Agency** | US Army Corps of Engineers |
| **Lake Size** | 1,440 acres |
| **I-79 Exit** | Exit 62 (Sutton) - 5 exits north of shop |
| **Primary Activities** | Fishing, Camping, Swimming, Boating |
| **SEO Target** | "fishing near I-79 WV", "camping near Birch River", "Sutton Lake fishing" |

### 1.3 Success Criteria
- [ ] Page builds without errors (`npm run build`)
- [ ] All facts verified with official sources (USACE, WV DNR)
- [ ] Place schema validates (schema.org/Place)
- [ ] Mobile responsive (test at 375px, 768px, 1024px)
- [ ] Kim's voice passes authenticity check (no marketing speak)
- [ ] Links to shop work correctly
- [ ] `near/index.astro` updated with `hasDetailPage: true`

### 1.4 Constraints
| Constraint | Reason |
|------------|--------|
| Astro + Tailwind only | Tech stack - no React/Vue |
| ~300-400 lines max | Lean principle - match pattern |
| Vanilla JS only | No framework bloat |
| Free-tier sources | USACE/WV DNR (no paywalls) |
| Kim's voice | Authentic, not corporate |

---

## 2. PSEUDOCODE (Research Plan)

### 2.1 Source Hierarchy
```
PRIMARY (Official - Required):
├── US Army Corps of Engineers - Sutton Lake
│   ├── Facilities list (boat ramps, campgrounds)
│   ├── Regulations and access hours
│   └── Maps and GPS coordinates
├── WV DNR Fishing
│   ├── Species present (stocking reports)
│   ├── Size/creel limits
│   └── License requirements
└── wvstateparks.com (if relevant facilities)

SECONDARY (Verify Local Wisdom):
├── wvhuntfish.com forums - fishing reports
├── Reddit r/WestVirginia - local discussions
├── bassresource.com - bass fishing tips
└── TripAdvisor/Google reviews - camper insights

TERTIARY (Historical Context):
├── Braxton County CVB
└── Local news archives
```

### 2.2 Data Collection Checklist
```
HARD FACTS (Must Source):
[ ] Acreage - verify 1,440 acres (USACE)
[ ] GPS coordinates for schema.org
[ ] Fish species present (WV DNR stocking reports)
    - Largemouth Bass
    - Smallmouth Bass
    - Channel Catfish
    - Crappie
    - Walleye
    - Musky (verify)
[ ] Campground names and details
    - Bee Run Campground (?)
    - Gerald R. Freeman Campground (?)
[ ] Boat ramp locations
[ ] Swimming areas
[ ] Dam/spillway info
[ ] Year-round vs seasonal access
[ ] Directions from shop (14 Candy St via I-79)

SOFT FACTS (Attempt to Source):
[ ] Best fishing spots (if in public forums)
[ ] Seasonal patterns (spring bass, fall crappie)
[ ] Local tips from fishing forums
[ ] Campground recommendations

IF NOT SOURCEABLE:
- Skip or use "Some folks say..."
- Document what was searched but not found
```

### 2.3 Research Workflow
```python
def research_sutton_lake():
    # Step 1: USACE Official Data
    usace_data = web_search("Sutton Lake Army Corps of Engineers West Virginia")
    usace_data += web_fetch("https://www.lrh.usace.army.mil/Missions/Civil-Works/Recreation/Sutton-Lake/")

    # Step 2: WV DNR Fishing Data
    fishing_data = web_search("Sutton Lake WV fishing species stocking report")
    fishing_data += web_search("Sutton Lake WV DNR fishing regulations")

    # Step 3: Facilities Verification
    facilities = web_search("Sutton Lake campgrounds boat ramps WV")

    # Step 4: Local Wisdom Search (attempt)
    local_wisdom = web_search("Sutton Lake WV fishing tips forum")
    local_wisdom += web_search("Sutton Lake bass fishing best spots")

    # Step 5: Compile Verified Data
    return compile_with_sources(usace_data, fishing_data, facilities, local_wisdom)
```

---

## 3. ARCHITECTURE (Page Structure)

### 3.1 Component Layout
```
sutton-lake.astro (~350 lines)
├── IMPORTS
│   ├── Layout, Header, Footer
│   ├── EmailCapture
│   └── SITE_CONTACT
│
├── FRONTMATTER DATA
│   ├── placeSchema (Schema.org Place)
│   ├── fishSpecies[] array
│   ├── facilities[] array
│   └── directions object
│
├── HERO SECTION
│   ├── "10 min from shop" badge
│   ├── "1,440 Acres" badge
│   ├── H1: "Sutton Lake"
│   ├── Tagline: closest lake context
│   └── Location subtext
│
├── QUICK INFO BAR (4-column grid)
│   ├── Acres: 1,440
│   ├── Distance: 10 min
│   ├── County: Braxton
│   └── Access: Year-round (verify)
│
├── WHAT TO FISH (Primary Section)
│   ├── Fish species cards (4-6)
│   │   ├── Species name
│   │   ├── Best season
│   │   └── Quick tip (if sourced)
│   └── License CTA: "We sell licenses"
│
├── FACILITIES SECTION
│   ├── Campgrounds (with names)
│   ├── Boat ramps (count/locations)
│   ├── Swimming areas
│   └── Picnic/day use
│
├── GETTING THERE
│   ├── From shop directions
│   ├── I-79 Exit info
│   └── Google Maps embed/link
│
├── WHAT TO BRING
│   ├── Fishing tackle checklist
│   ├── Camping gear checklist
│   └── Shop CTA: "We stock it"
│
├── CTA SECTION
│   ├── "Stop by before you head out"
│   ├── Directions button
│   └── Phone button
│
├── NEWSLETTER
│   └── EmailCapture component
│
└── FOOTER
```

### 3.2 Schema.org Markup
```json
{
  "@context": "https://schema.org",
  "@type": "Place",
  "name": "Sutton Lake",
  "description": "1,440-acre Army Corps lake with fishing, camping, and swimming. 10 minutes from WV Wild Outdoors.",
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "TBD - verify with USACE",
    "longitude": "TBD - verify with USACE"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Sutton",
    "addressRegion": "WV",
    "postalCode": "TBD",
    "addressCountry": "US"
  },
  "amenityFeature": [
    {"@type": "LocationFeatureSpecification", "name": "Boat Ramps", "value": true},
    {"@type": "LocationFeatureSpecification", "name": "Campgrounds", "value": true},
    {"@type": "LocationFeatureSpecification", "name": "Swimming", "value": true}
  ]
}
```

---

## 4. REFINEMENT (Voice & Content)

### 4.1 Voice Guidelines

**DO (Kim's Voice)**:
```
"Sutton Lake's just up the road - about 10 minutes north on I-79."
"The bass fishing is solid and we can get you set up with the right tackle."
"Stop by the shop on your way - we'll point you to the best ramps."
"If you're camping for the weekend, swing by first for licenses and supplies."
```

**DON'T (Corporate Speak)**:
```
❌ "Experience premier angling at this convenient recreational destination."
❌ "Unlock your outdoor adventure at Sutton Lake."
❌ "World-class fishing awaits you."
❌ "Seamless camping experience with modern amenities."
```

### 4.2 Content Differentiation
Sutton Lake is different from WMA pages:
- Focus: FISHING + CAMPING (not hunting)
- Agency: USACE (not WV DNR land)
- Vibe: Family recreation (not hardcore hunters)
- CTAs: Tackle + camping supplies + licenses

### 4.3 Local Wisdom Handling
```
IF found + verified (2+ sources):
  → Include as fact

IF found + single source:
  → "Anglers report that..." / "Some folks say..."

IF not found:
  → Skip entirely (no invention)
  → Document in research notes what was searched
```

---

## 5. COMPLETION (Implementation)

### 5.1 File Changes
| File | Action | Details |
|------|--------|---------|
| `src/pages/near/sutton-lake.astro` | CREATE | New page (~350 lines) |
| `src/pages/near/index.astro` | EDIT | Set `hasDetailPage: true` for Sutton Lake |

### 5.2 Build Verification
```bash
cd wv-wild-web
npm run build      # Must pass
npm run preview    # Visual check
```

### 5.3 Testing Checklist
- [ ] Page renders at `/near/sutton-lake`
- [ ] All internal links work
- [ ] Schema validates (Google Rich Results Test)
- [ ] Mobile responsive (Chrome DevTools)
- [ ] Images load (if any added)
- [ ] EmailCapture component works
- [ ] Shop CTAs link correctly

### 5.4 Commit Format
```
feat(near): add Sutton Lake recreation area page

- Add detail page for Sutton Lake (closest to shop - 10 min)
- Include verified fish species and facilities from USACE/WV DNR
- Add Schema.org Place markup for SEO
- Update index.astro with hasDetailPage: true

Sources:
- US Army Corps of Engineers Sutton Lake
- WV DNR fishing regulations
- [additional sources used]
```

---

## 6. EXECUTION PROMPT

Use this prompt to execute the research and build:

```
## TASK: Build Sutton Lake Recreation Area Page

### METHODOLOGY: Lean + Verified + Authentic Local

### RESEARCH PHASE

1. **USACE Official Data**
   Search: "Sutton Lake Army Corps of Engineers West Virginia"
   Fetch: USACE Sutton Lake recreation page
   Extract: Acreage, facilities, GPS coordinates, regulations

2. **WV DNR Fishing Data**
   Search: "Sutton Lake WV DNR fishing species"
   Search: "Sutton Lake WV stocking report"
   Extract: Fish species, seasons, regulations

3. **Facilities Verification**
   Search: "Sutton Lake WV campgrounds"
   Search: "Sutton Lake boat ramps"
   Extract: Campground names, ramp locations, amenities

4. **Local Wisdom (Attempt)**
   Search: "Sutton Lake WV fishing tips forum"
   Search: "best bass fishing Sutton Lake"
   Note: If not found, document and skip

### BUILD PHASE

5. **Create Page**
   Pattern: Copy structure from elk-river.astro
   Adapt: Focus on fishing/camping (not hunting)
   Voice: Kim's authentic style

6. **Update Index**
   File: near/index.astro
   Change: hasDetailPage: true for Sutton Lake

7. **Verify Build**
   Run: npm run build
   Check: Schema validation

### QUALITY GATES

Before completing:
- [ ] All facts have source citations
- [ ] No invented "local wisdom"
- [ ] Voice passes Kim authenticity check
- [ ] Schema validates
- [ ] Build passes
```

---

## 7. SOURCE DOCUMENTATION TEMPLATE

After research, document sources here:

### Official Sources Used
| Data Point | Value | Source | URL |
|------------|-------|--------|-----|
| Acreage | | USACE | |
| GPS Coordinates | | | |
| Fish Species | | WV DNR | |
| Campground Names | | USACE | |
| Boat Ramps | | USACE | |

### Local Wisdom Found
| Tip | Source | Confidence |
|-----|--------|------------|
| | | |

### Searched But Not Found
| Search Query | Result |
|--------------|--------|
| | No relevant results |

---

## 8. NOTES

- Sutton Lake is CLOSEST to shop - emphasize this in copy
- Focus shift: Fishing + Camping (vs hunting for WMAs)
- Family-friendly vibe (USACE lakes attract different crowd than WMAs)
- Dam/spillway area may have specific regulations - verify
- Bulltown Historical Area nearby - potential mention but verify relevance
