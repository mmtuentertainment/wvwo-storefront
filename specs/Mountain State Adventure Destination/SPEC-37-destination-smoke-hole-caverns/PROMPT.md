# SPEC-37: Smoke Hole Caverns Destination Page - Swarm Implementation Prompt

## Objective

Create `/destinations/smoke-hole-caverns` page using hierarchical swarm coordination with WebSearch research, AgentDB pattern learning, and cave template implementation (commercial cave tours with unique Smoke Hole Canyon context).

**Pattern Reuse**: Leverage SPEC-36 Seneca Caverns template and adapt for Smoke Hole's unique features (canyon location, log cabin museum, gift shop emphasis).

## Swarm Architecture

**Topology**: Hierarchical (1 queen → 3 scouts → 2 planners → 1 coder)

### Queen Agent (Coordinator)

**Role**: Orchestrate research → planning → implementation for commercial cave in scenic canyon
**Responsibilities**:

- Initialize swarm memory namespace `swarm/smoke-hole-caverns`
- Assign tasks to scouts (cavern official info, tour/formations, canyon context/nearby)
- Synthesize scout findings for planners
- Leverage Seneca Caverns template (SPEC-36) for structure
- Approve final implementation from coder
- Store success patterns in AgentDB

### Scout Agents (3 Parallel Researchers)

#### Scout 1: Cavern Official Information

**Research targets**:

```bash
WebSearch("Smoke Hole Caverns official site Seneca Rocks WV 2025")
WebSearch("Smoke Hole Caverns tour times admission prices")
WebSearch("Smoke Hole Caverns gift shop log cabin museum")

```

**AgentDB retrieval**:

```bash
npx agentdb@latest reflexion retrieve "commercial cave attraction Seneca Caverns" --k 10 --synthesize-context
npx agentdb@latest skill search "cave tour commercial family" 5

```

**Deliverables**:

- Official cavern URLs (smokeholecaverns.com)
- Tour details (guided tours, duration ~45 min, easier than Seneca Caverns)
- Admission prices (adults, children, groups)
- Operating season (seasonal, check hours)
- On-site amenities (log cabin museum, gift shop, gem mining for kids)

#### Scout 2: Tour Experience & Formations

**Research targets**:

```bash
WebSearch("Smoke Hole Caverns tour route formations coral reef")
WebSearch("Smoke Hole Caverns vs Seneca Caverns comparison")
WebSearch("Smoke Hole Caverns worlds only cave ribbon")

```

**AgentDB retrieval**:

```bash
npx agentdb@latest reflexion retrieve "cave tour formations unique features" --k 10 --filters '{"success":true}'
npx agentdb@latest recall with-certificate "commercial cave logistics" 12

```

**Deliverables**:

- Tour logistics (fewer stairs than Seneca, 45 min, temp ~56°F year-round)
- Accessibility (easier tour than Seneca Caverns, still stairs)
- Unique formations ("World's Only Cave Ribbon", coral reef fossils)
- Formation highlights (ribbon formation, stalactites, flowstone)
- Photography policy (allowed on tours)

#### Scout 3: Smoke Hole Canyon Context & Nearby

**Research targets**:

```bash
WebSearch("Smoke Hole Canyon WV scenic drive fishing")
WebSearch("Smoke Hole Caverns Seneca Rocks distance nearby")
WebSearch("South Branch Potomac River Smoke Hole trout fishing")

```

**AgentDB retrieval**:

```bash
npx agentdb@latest reflexion retrieve "cave canyon regional context" --k 10
npx agentdb@latest skill search "scenic canyon fishing destination" 5

```

**Deliverables**:

- Smoke Hole Canyon (scenic gorge, South Branch Potomac River)
- Fishing opportunities (trout in South Branch)
- Proximity to Seneca Rocks (20 min drive)
- Scenic drive (canyon road, rural WV beauty)
- Trip combination (cave + Seneca Rocks + fishing)

### Planner Agents (2 Sequential Architects)

#### Planner 1: Content Architecture

**Input**: Synthesized scout findings from queen
**Template**: Cave template (SPEC-36 Seneca Caverns adapted)

**AgentDB retrieval**:

```bash
npx agentdb@latest reflexion retrieve "cave attraction template Seneca" --k 10 --synthesize-context
npx agentdb@latest reflexion retrieve "WVWO voice Kim authentic" --k 10 --only-successes

```

**Responsibilities**:

1. Map scout data to cave template sections (from SPEC-36)
2. Design hero content (cave entrance in canyon setting)
3. Plan tour logistics messaging (easier than Seneca, 45 min, fewer stairs)
4. Structure unique features ("World's Only Cave Ribbon", coral fossils)
5. Voice design: Family-friendly, easier cave for kids/seniors

**Deliverables**:

- Content outline (cave template from SPEC-36)
- Hero messaging ("Smoke Hole Caverns: Canyon Cave with Coral Fossils")
- Tour logistics (45 min, easier than Seneca, 56°F, jacket recommended)
- Unique formations (ribbon, coral reef fossils)
- Kim's voice snippets (easier cave, good for families)
- Gear callout placements (light jacket, sturdy shoes, fishing gear for canyon)

#### Planner 2: Technical Architecture

**Input**: Content architecture from Planner 1

**AgentDB retrieval**:

```bash
npx agentdb@latest reflexion retrieve "cave page implementation Seneca template" --k 10 --filters '{"success":true}'
npx agentdb@latest skill search "canyon context scenic drive component" 5

```

**Responsibilities**:

1. Component selection (TourDetails, FormationGallery, CanyonContext, NearbyAttractions)
2. Data structure design (tour info, formations, canyon features, nearby sites)
3. Schema.org markup (TouristAttraction type)
4. Drive time calculation (from 38.5858, -80.8581 to Smoke Hole ~2.5 hours)
5. Responsive layout (mobile canyon/cave photos)
6. External links (Smoke Hole Caverns booking, disclaimer)

**Deliverables**:

- Component tree (reuse SPEC-36 components)
- JSON data structure (tour, formations, canyon, nearby)
- Schema markup template (TouristAttraction)
- Performance budget (cave + canyon photos lazy load)

### Coder Agent (Implementation)

**Input**: Content + technical architecture from planners

**AgentDB retrieval**:

```bash
npx agentdb@latest reflexion retrieve "cave page Seneca Caverns implementation" --k 15 --synthesize-context
npx agentdb@latest reflexion retrieve "WVWO aesthetic cave commercial" --k 10 --only-successes

```

**Responsibilities**:

1. Implement `/wv-wild-web/src/pages/destinations/smoke-hole-caverns.astro`
2. Reuse TourDetails component from SPEC-36 (adapt for Smoke Hole data)
3. Apply WVWO aesthetic (earthy tones, brand-brown, sign-green for canyon)
4. Implement schema markup
5. Optimize images (cave formations, canyon views, WebP)
6. Add gear suggestions (jacket, shoes, fishing gear for canyon)
7. Include disclaimer: "Smoke Hole Caverns is a separate business. Visit smokeholecaverns.com to book."

**Quality gates**:

- Pass WVWO aesthetic checklist
- Kim's voice authentic (easier cave, family-friendly, canyon context)
- Mobile-responsive (375px width)
- Schema.org validation
- Load time <2s on 3G
- Clear disclaimer on WVWO/Caverns separation

**Deliverables**:

- Complete `.astro` page file (based on SPEC-36 template)
- Adapted TourDetails component
- CanyonContext component (new)
- ExternalBookingCTA with disclaimer
- Image optimization report

## Data Requirements

### Geographic Data

**Shop coordinates**: `38.5858, -80.8581` (Birch River, WV)
**Destination coordinates**: `38.7939, -79.3156` (near Seneca Rocks, WV - Smoke Hole Caverns)
**Drive time**: ~2.5 hours via US-33 E
**Distance**: ~95 miles

### Cave Tour Data

```typescript
interface CaveTour {
  name: string;
  duration: string;
  temperature: number; // Fahrenheit
  stairs: string; // "Fewer than Seneca Caverns"
  difficulty: string;
  ageRecommendation: string;
  seasonalOperation: string;
}

const smokeHoleTour: CaveTour = {
  name: "Smoke Hole Caverns Guided Tour",
  duration: "45 minutes",
  temperature: 56, // year-round constant
  stairs: "Fewer stairs than Seneca Caverns (easier tour)",
  difficulty: "Easy to Moderate (good for families, seniors)",
  ageRecommendation: "All ages",
  seasonalOperation: "Seasonal (check smokeholecaverns.com for current hours)"
};

```

### Cave Formations Data

```typescript
interface Formation {
  name: string;
  type: string;
  description: string;
  highlight: boolean;
}

const smokeHoleFormations: Formation[] = [
  {
    name: "World's Only Cave Ribbon",
    type: "Unique formation",
    description: "Ribbon-like formation claimed to be the world's only cave ribbon.",
    highlight: true
  },
  {
    name: "Coral Reef Fossils",
    type: "Fossils",
    description: "Ancient coral reef fossils in cave walls (WV was underwater 300M years ago).",
    highlight: true
  },
  {
    name: "Stalactites & Stalagmites",
    type: "Formations",
    description: "Classic cave formations throughout the tour.",
    highlight: false
  },
  {
    name: "Flowstone",
    type: "Drapery formation",
    description: "Colorful flowstone curtains on cave walls.",
    highlight: false
  }
];

```

### On-Site Amenities Data

```typescript
const smokeHoleAmenities = {
  museum: "Log cabin museum with historical artifacts",
  giftShop: "On-site gift shop with WV souvenirs, gemstones",
  gemMining: "Gem mining activity for kids (sluice box)",
  parking: "Free parking on-site"
};

```

### Smoke Hole Canyon Context

```typescript
interface CanyonContext {
  name: string;
  features: string[];
  activities: string[];
  scenicDrive: string;
}

const smokeHoleCanyon: CanyonContext = {
  name: "Smoke Hole Canyon",
  features: ["Scenic gorge", "South Branch Potomac River", "Rural WV beauty"],
  activities: ["Trout fishing (South Branch)", "Scenic driving", "Photography"],
  scenicDrive: "Smoke Hole Road - winding canyon road with river views"
};

```

### Nearby Attractions Data

```typescript
const nearby = [
  {
    name: "Seneca Rocks",
    distance: "20 min drive",
    activities: ["Rock climbing", "Hiking", "West Face Trail"]
  },
  {
    name: "Seneca Caverns",
    distance: "25 min drive",
    activities: ["Cave tours (deeper, more stairs)"]
  },
  {
    name: "South Branch Potomac River",
    distance: "Adjacent",
    activities: ["Trout fishing", "Scenic drive"]
  }
];

```

### Gear Suggestions

```typescript
const gearSuggestions = {
  caveTour: ["Light jacket (56°F)", "Sturdy closed-toe shoes", "Camera"],
  fishing: ["WV fishing license", "Trout tackle", "Waders (spring/fall)"],
  scenicDrive: ["Camera", "Comfortable layers"]
};

```

## Kim's Voice Guidelines for Smoke Hole Caverns

**Tone**: Family-friendly, easier alternative to Seneca Caverns, canyon beauty emphasis.

**Approved phrases**:

```
"Smoke Hole Caverns is easier than Seneca Caverns - fewer stairs, shorter tour. Good for families with young kids or seniors."
"The 'World's Only Cave Ribbon' is their claim to fame. Unique formation worth seeing."
"Smoke Hole Canyon is beautiful - scenic drive along the South Branch Potomac. Bring your camera."
"If you're fishing the South Branch (trout), the caverns are right there. Easy combo trip."
"Bring a light jacket (56°F inside) and good shoes. Tour's 45 minutes - quick and family-friendly."

```

**Forbidden phrases**:

```
NEVER: "Journey into the earth", "Subterranean wonderland", "Nature's artistry", "Hidden gem beneath the canyon"

```

**Easier cave messaging**:

```
"Smoke Hole is the easier cave. Seneca Caverns is deeper and more stairs. Pick based on your group's fitness."

```

## Content Blocks (Cave Template Sections - from SPEC-36)

### Hero Block

**Image**: Cave entrance or formation with canyon context
**Headline**: "Smoke Hole Caverns: Canyon Cave with Coral Fossils"
**Subhead**: "45-minute guided tour, easier than Seneca Caverns. World's Only Cave Ribbon. 2.5 hours from our shop."
**CTA**: "What to Bring for Your Tour"

### Cave Overview Block

**Content**:

- Location: Smoke Hole Canyon, along South Branch Potomac River
- Duration: 45 minutes (shorter than Seneca Caverns)
- Temperature: 56°F year-round (bring light jacket)
- Difficulty: Easy to Moderate (fewer stairs, good for families/seniors)
- Unique: "World's Only Cave Ribbon", coral reef fossils
**Kim's note**: *"Easier cave than Seneca Caverns. Good for kids, seniors, or folks who want a shorter tour."*

### Tour Details Block

**Component**: `<TourDetails tour={smokeHoleTour} amenities={smokeHoleAmenities} />`
**Content**:

- Duration: 45 minutes
- Fewer stairs than Seneca Caverns
- Temperature: 56°F (bring jacket)
- What to bring: Light jacket, sturdy shoes, camera
- On-site: Log cabin museum, gift shop, gem mining for kids
**Kim's note**: *"Kids love the gem mining - sluice box with gemstones to find. Gift shop has WV souvenirs."*

### Formation Highlights Block

**Component**: `<FormationGallery formations={smokeHoleFormations} />`
**Content**: World's Only Cave Ribbon, Coral reef fossils, Stalactites/Stalagmites, Flowstone
**Kim's note**: *"Cave Ribbon is unique - I haven't seen it anywhere else. Coral fossils remind you WV was underwater 300 million years ago."*

### Smoke Hole Canyon Context Block (NEW)

**Component**: `<CanyonContext canyon={smokeHoleCanyon} />`
**Content**:

- Smoke Hole Canyon (scenic gorge)
- South Branch Potomac River (trout fishing)
- Scenic drive (Smoke Hole Road - winding canyon road)
- Rural WV beauty
**Gear callouts**: Fishing gear (license, tackle, waders)
**Kim's note**: *"Canyon drive is beautiful. If you fish, South Branch has trout. Stop by for WV licenses and tackle."*

### Nearby Attractions Block

**Component**: `<NearbyAttractions attractions={nearby} />`
**Content**:

- Seneca Rocks (20 min) - climbing, hiking
- Seneca Caverns (25 min) - deeper cave tours
- South Branch Potomac (adjacent) - trout fishing
**Kim's note**: *"Smoke Hole Caverns, Seneca Rocks, and fishing the South Branch - easy to do all three in a day or weekend."*

### Access & Logistics Block

**Content**:

- Drive time from WVWO shop: 2.5 hours via US-33 E
- Parking: Free on-site
- Admission: (link to smokeholecaverns.com for current prices)
- Booking: Tickets at entrance or call ahead for groups
- Season: Seasonal (check website for current hours)
**CTA**: "Stop by WVWO for fishing gear and local beta"

### Local Knowledge Block

**Kim's voice**:

```
"Smoke Hole Caverns is the easier cave tour - 45 minutes, fewer stairs than Seneca Caverns.
If you've got young kids, seniors, or folks who don't want a strenuous cave tour, this is
your pick. Seneca Caverns is deeper and more stairs - both are cool, just different.

The 'World's Only Cave Ribbon' is their big draw. It's a unique ribbon-like formation.
Whether it's truly the world's only one, I can't confirm, but it's worth seeing.

Coral reef fossils in the cave walls are wild. WV was underwater 300 million years ago -
the fossils prove it. Educational and cool.

Temperature is 56 degrees inside, so bring a light jacket or long sleeves. Sturdy shoes -
stairs are slippery even if there aren't as many as Seneca.

Kids love the gem mining sluice box - little bucket of sand/gravel, you find gemstones.
Gift shop has WV souvenirs, crystals, that kind of thing.

Smoke Hole Canyon is beautiful. Scenic drive along the South Branch Potomac River - winding
canyon road with river views. Bring your camera.

If you fish, South Branch has trout. WV license required - we sell them at the shop. Bring
waders in spring/fall (water's cold). Summer you can wet wade.

Smoke Hole Caverns is 20 minutes from Seneca Rocks. Easy to combine - cave tour in morning,
climb or hike Seneca in afternoon, fish the South Branch in evening. Full day of WV adventure.

Book tours at smokeholecaverns.com or call ahead for groups. They're seasonal, so check
hours before driving out. We're not affiliated - they're a separate business. We're just
here to help with trip planning and gear. Grand love ya."

```

### Disclaimer Block (Prominent)

**Content**:

```
**Not Affiliated**: Smoke Hole Caverns is a separate commercial business. WV Wild Outdoors
provides outdoor gear and trip information. To book cave tours, visit smokeholecaverns.com
or call them directly. We're happy to help with trip planning - stop by the shop!

```

## Schema.org Markup

```typescript
const smokeHoleCavernsSchema = {
  "@context": "https://schema.org",
  "@type": "TouristAttraction",
  "name": "Smoke Hole Caverns",
  "description": "Commercial cave tours in Smoke Hole Canyon, WV. Features World's Only Cave Ribbon and ancient coral reef fossils. 45-minute guided tours, family-friendly.",
  "image": "https://wvwildoutdoors.com/images/destinations/smoke-hole-caverns-hero.jpg",
  "url": "https://wvwildoutdoors.com/destinations/smoke-hole-caverns",
  "sameAs": "https://smokeholecaverns.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Seneca Rocks",
    "addressRegion": "WV",
    "postalCode": "26884"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 38.7939,
    "longitude": -79.3156
  },
  "isAccessibleForFree": false,
  "publicAccess": true,
  "touristType": ["families", "cave enthusiasts", "road trippers", "anglers"]
};

```

## Swarm Coordination Hooks

### Pre-Task (All Agents)

```bash
npx claude-flow@alpha hooks pre-task --description "SPEC-37 Smoke Hole Caverns: [agent-role] [task-name]"
npx claude-flow@alpha hooks session-restore --session-id "swarm-smoke-hole-caverns"

```

### Scout Memory Storage

```bash
# Scout 1 stores cavern official info
npx claude-flow@alpha hooks post-edit --memory-key "swarm/smoke-hole/scout1-official" --file "cavern-data.json"

# Scout 2 stores tour/formations
npx claude-flow@alpha hooks post-edit --memory-key "swarm/smoke-hole/scout2-tour" --file "tour-formations.json"

# Scout 3 stores canyon context
npx claude-flow@alpha hooks post-edit --memory-key "swarm/smoke-hole/scout3-canyon" --file "canyon-nearby.json"

```

### Queen Synthesis

```bash
npx claude-flow@alpha hooks session-restore --session-id "swarm-smoke-hole-caverns"

```

### Planner Memory Storage

```bash
# Planner 1 stores content architecture
npx claude-flow@alpha hooks post-edit --memory-key "swarm/smoke-hole/plan-content" --file "cave-canyon-outline.md"

# Planner 2 stores technical architecture
npx claude-flow@alpha hooks post-edit --memory-key "swarm/smoke-hole/plan-technical" --file "canyon-context-design.json"

```

### Coder Implementation

```bash
npx claude-flow@alpha hooks session-restore --session-id "swarm-smoke-hole-caverns"
npx agentdb@latest reflexion store "wvwo-session" "smoke-hole-caverns-page" 1.0 true "Cave template (SPEC-36 adapted) with TourDetails (45min, easier than Seneca, 56°F), FormationGallery (cave ribbon, coral fossils), CanyonContext (Smoke Hole Canyon, South Branch fishing), NearbyAttractions (Seneca Rocks combo), ExternalBookingCTA, Kim's family-friendly easier-cave voice, fishing gear callouts"

```

### Post-Task (All Agents)

```bash
npx claude-flow@alpha hooks post-task --task-id "spec-37-smoke-hole-[agent-role]"
npx claude-flow@alpha hooks session-end --export-metrics true

```

## Success Criteria

### Content Quality

- [ ] Kim's voice authentic (easier cave, family-friendly, canyon context, fishing tie-in)
- [ ] Zero AI slop ("subterranean wonderland", "nature's artistry", etc.)
- [ ] Tour logistics accurate (45 min, fewer stairs, 56°F, easier than Seneca)
- [ ] Unique formations highlighted (cave ribbon, coral fossils)
- [ ] Canyon context integrated (scenic drive, South Branch fishing)
- [ ] Clear WVWO/Caverns separation (disclaimer prominent)

### Technical Quality

- [ ] Passes WVWO aesthetic checklist
- [ ] Mobile-responsive (375px width)
- [ ] Schema.org validation (TouristAttraction)
- [ ] Drive time accurate (2.5 hours from shop)
- [ ] Images optimized (cave + canyon photos, WebP, <200KB each)
- [ ] Load time <2s on 3G
- [ ] External links to Smoke Hole Caverns site (clear, not pushy)

### Swarm Coordination

- [ ] All scouts completed research in parallel
- [ ] Queen successfully leveraged SPEC-36 template
- [ ] Planners adapted Seneca Caverns structure for Smoke Hole
- [ ] Coder reused components from SPEC-36
- [ ] Success pattern stored in AgentDB

## Implementation Order

1. **Queen**: Initialize swarm, assign scout tasks, reference SPEC-36 template (single message with 3 Task calls)
2. **Scouts 1-3**: Execute research in parallel (WebSearch + AgentDB retrieval)
3. **Queen**: Retrieve scout findings, synthesize for planners (adapt SPEC-36 structure)
4. **Planner 1**: Adapt SPEC-36 content architecture for Smoke Hole (easier cave, canyon context)
5. **Planner 2**: Adapt SPEC-36 technical architecture (add CanyonContext component)
6. **Coder**: Implement page reusing SPEC-36 components (TourDetails, FormationGallery, ExternalBookingCTA)
7. **Queen**: Review implementation, store success pattern

**Total messages**: ~8-10 (efficient reuse of SPEC-36 template)

## AgentDB Pattern Storage

After successful implementation:

```bash
npx agentdb@latest reflexion store "wvwo-session" "smoke-hole-caverns-canyon-cave" 1.0 true "Cave template (SPEC-36 Seneca Caverns adapted) with hierarchical swarm. TourDetails reused (45min, 56°F, easier tour, fewer stairs), FormationGallery (world's only cave ribbon, coral reef fossils), CanyonContext NEW component (Smoke Hole Canyon scenic drive, South Branch Potomac trout fishing), NearbyAttractions (Seneca Rocks 20min combo), ExternalBookingCTA with disclaimer. Kim's family-friendly easier-cave voice, fishing gear callouts (WV license, tackle, waders). On-site amenities (log cabin museum, gem mining for kids). Schema.org TouristAttraction. 2.5hr drive from shop. Efficient SPEC-36 component reuse."

```

**Reusable for**: Other commercial caves, canyon-based attractions, scenic drive + attraction combinations
