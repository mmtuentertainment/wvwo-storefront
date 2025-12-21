# SPEC-36: Seneca Caverns Destination Page - Swarm Implementation Prompt

## Objective
Create `/destinations/seneca-caverns` page using hierarchical swarm coordination with WebSearch research, AgentDB pattern learning, and cave template implementation (commercial cave tours, family attraction).

## Swarm Architecture

**Topology**: Hierarchical (1 queen → 3 scouts → 2 planners → 1 coder)

### Queen Agent (Coordinator)
**Role**: Orchestrate research → planning → implementation for commercial cave attraction
**Responsibilities**:
- Initialize swarm memory namespace `swarm/seneca-caverns`
- Assign tasks to scouts (cavern official info, tour details, regional context/nearby attractions)
- Synthesize scout findings for planners
- Approve final implementation from coder
- Store success patterns in AgentDB

### Scout Agents (3 Parallel Researchers)

#### Scout 1: Cavern Official Information
**Research targets**:

```bash
WebSearch("Seneca Caverns official site Riverton WV 2025")
WebSearch("Seneca Caverns tour times admission prices")
WebSearch("Seneca Caverns formations stalactites history")

```

**AgentDB retrieval**:

```bash
npx agentdb@latest reflexion retrieve "commercial cave attraction official" --k 10 --synthesize-context
npx agentdb@latest skill search "cave tour guided attraction" 5

```

**Deliverables**:
- Official cavern URLs (senecacaverns.com)
- Tour details (guided tours, duration ~60 min, depth 165 ft)
- Admission prices (adults, children, groups)
- Operating season (typically Apr-Oct, check hours)
- Cave formations (stalactites, stalagmites, flowstone, mirror lake)

#### Scout 2: Tour Experience & Details
**Research targets**:

```bash
WebSearch("Seneca Caverns tour route cave temperature what to expect")
WebSearch("Seneca Caverns vs Smoke Hole Caverns comparison")
WebSearch("Seneca Caverns discovery history 1742")

```

**AgentDB retrieval**:

```bash
npx agentdb@latest reflexion retrieve "cave tour experience family-friendly" --k 10 --filters '{"success":true}'
npx agentdb@latest recall with-certificate "guided tour logistics" 12

```

**Deliverables**:
- Tour logistics (stairs ~250, cave temp 54°F year-round, humidity)
- Accessibility (not wheelchair accessible, moderate fitness required)
- Historical context (discovered 1742, one of oldest show caves in WV)
- Formation highlights (mirror lake, massive flowstone)
- Photography policy (allowed/not allowed on tours)

#### Scout 3: Regional Context & Nearby Attractions
**Research targets**:

```bash
WebSearch("Seneca Caverns nearby attractions Seneca Rocks Germany Valley")
WebSearch("Riverton WV outdoor activities Seneca Caverns location")

```

**AgentDB retrieval**:

```bash
npx agentdb@latest reflexion retrieve "destination regional context combinations" --k 10
npx agentdb@latest skill search "cave attraction nearby outdoor" 5

```

**Deliverables**:
- Proximity to Seneca Rocks (30 min drive)
- Germany Valley scenic drive
- Nearby outdoor activities (hiking, fishing, climbing)
- Lodging options (nearby towns, campgrounds)
- Trip combination suggestions (cave + Seneca Rocks day trip)

### Planner Agents (2 Sequential Architects)

#### Planner 1: Content Architecture
**Input**: Synthesized scout findings from queen
**Template**: Cave template (`docs/templates/destination-cave.md`)

**AgentDB retrieval**:

```bash
npx agentdb@latest reflexion retrieve "cave attraction template" --k 10 --synthesize-context
npx agentdb@latest reflexion retrieve "WVWO voice Kim authentic" --k 10 --only-successes

```

**Responsibilities**:
1. Map scout data to cave template sections
2. Design hero content (cave entrance or formation imagery)
3. Plan tour logistics messaging (stairs, temp, duration)
4. Structure formation highlights (mirror lake, flowstone)
5. Voice design: Informative, family-friendly, realistic about stairs/accessibility

**Deliverables**:
- Content outline with cave template headers
- Hero messaging ("Seneca Caverns: West Virginia's Historic Underground Wonder")
- Tour logistics details (60 min, 250 stairs, 54°F, moderate fitness)
- Formation highlights (mirror lake, flowstone, stalactites)
- Kim's voice snippets (practical prep: jackets, good shoes)
- Gear callout placements (light jacket, sturdy shoes, camera)

#### Planner 2: Technical Architecture
**Input**: Content architecture from Planner 1

**AgentDB retrieval**:

```bash
npx agentdb@latest reflexion retrieve "commercial attraction page layout" --k 10 --filters '{"success":true}'
npx agentdb@latest skill search "tour booking external link" 5

```

**Responsibilities**:
1. Component selection (TourDetails, FormationGallery, ExternalBookingCTA, NearbyAttractions)
2. Data structure design (tour info, formations, logistics, nearby sites)
3. Schema.org markup (TouristAttraction type)
4. Drive time calculation (from 38.5858, -80.8581 to Riverton ~2.5 hours)
5. Responsive layout (mobile formation photos emphasis)
6. External links (Seneca Caverns booking site, clear disclaimer)

**Deliverables**:
- Component tree with tour logistics focus
- JSON data structure (tour details, formations, nearby attractions)
- Schema markup template (TouristAttraction)
- Performance budget (formation photos lazy load)

### Coder Agent (Implementation)
**Input**: Content + technical architecture from planners

**AgentDB retrieval**:

```bash
npx agentdb@latest reflexion retrieve "cave attraction page implementation" --k 15 --synthesize-context
npx agentdb@latest reflexion retrieve "WVWO aesthetic commercial attraction" --k 10 --only-successes

```

**Responsibilities**:
1. Implement `/wv-wild-web/src/pages/destinations/seneca-caverns.astro`
2. Create TourDetails component (duration, stairs, temp, what to bring)
3. Apply WVWO aesthetic (earthy tones, brand-brown for cave imagery)
4. Implement schema markup
5. Optimize images (cave formations, stalactites, mirror lake, WebP)
6. Add gear suggestions (light jacket, sturdy shoes, camera)
7. Include disclaimer: "Seneca Caverns is a separate business. Visit senecacaverns.com to book tours."

**Quality gates**:
- Pass WVWO aesthetic checklist
- Kim's voice authentic (practical, informative, family-friendly)
- Mobile-responsive (375px width)
- Schema.org validation
- Load time <2s on 3G
- Clear disclaimer on WVWO/Caverns separation

**Deliverables**:
- Complete `.astro` page file
- TourDetails component
- FormationGallery component
- ExternalBookingCTA with disclaimer
- Image optimization report

## Data Requirements

### Geographic Data
**Shop coordinates**: `38.5858, -80.8581` (Birch River, WV)
**Destination coordinates**: `38.7656, -79.3373` (Riverton, WV - Seneca Caverns)
**Drive time**: ~2.5 hours via US-33 E
**Distance**: ~95 miles

### Cave Tour Data

```typescript
interface CaveTour {
  name: string;
  duration: string;
  depth: number; // feet
  temperature: number; // Fahrenheit
  stairs: number;
  difficulty: string;
  ageRecommendation: string;
  seasonalOperation: string;
}

const senecaTour: CaveTour = {
  name: "Seneca Caverns Guided Tour",
  duration: "60 minutes",
  depth: 165, // feet below surface
  temperature: 54, // year-round constant
  stairs: 250, // approximate
  difficulty: "Moderate (stairs, uneven surfaces)",
  ageRecommendation: "All ages (able to navigate stairs)",
  seasonalOperation: "Apr-Oct (check current hours)"
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

const senecaFormations: Formation[] = [
  {
    name: "Mirror Lake",
    type: "Underground pool",
    description: "Still water pool that reflects ceiling formations like a mirror. Tour highlight.",
    highlight: true
  },
  {
    name: "Grand Ballroom",
    type: "Large chamber",
    description: "Massive room with flowstone and stalactites. Largest chamber in the cavern.",
    highlight: true
  },
  {
    name: "Stalactites & Stalagmites",
    type: "Formations",
    description: "Classic cave formations growing from ceiling (stalactites) and floor (stalagmites).",
    highlight: false
  },
  {
    name: "Flowstone",
    type: "Drapery formation",
    description: "Massive flowstone curtains covering cave walls.",
    highlight: true
  }
];

```

### Tour Logistics Data

```typescript
const tourLogistics = {
  whatToBring: ["Light jacket or sweater (54°F inside)", "Sturdy closed-toe shoes (slippery stairs)", "Camera (photography allowed on tour)"],
  notAllowed: ["Pets", "Tripods (narrow passages)", "Touching formations"],
  accessibility: "Not wheelchair accessible. Moderate fitness required (250 stairs).",
  parking: "Free parking on-site",
  booking: "Tickets at entrance or online (recommended for groups)"
};

```

### Nearby Attractions Data

```typescript
interface NearbyAttraction {
  name: string;
  distance: string;
  activities: string[];
}

const nearby: NearbyAttraction[] = [
  {
    name: "Seneca Rocks",
    distance: "30 min drive",
    activities: ["Rock climbing", "Hiking", "West Face Trail"]
  },
  {
    name: "Germany Valley",
    distance: "15 min drive",
    activities: ["Scenic drive", "Photography", "Rural WV landscapes"]
  },
  {
    name: "Smoke Hole Caverns",
    distance: "45 min drive",
    activities: ["Cave tours", "Another commercial cave option"]
  }
];

```

### Gear Suggestions (Not Product Sales Focus)

```typescript
const gearSuggestions = {
  required: ["Sturdy closed-toe shoes (hiking boots or sneakers)", "Light jacket or long sleeves (54°F)"],
  recommended: ["Camera (photography allowed)", "Small backpack for jackets", "Water bottle (hydration)"],
  notNeeded: ["Flashlights (cave is lit)", "Climbing gear", "Heavy winter layers"]
};

```

## Kim's Voice Guidelines for Seneca Caverns

**Tone**: Informative and practical. Family attraction, not outdoor adventure. Focus on prep (jacket, shoes).

**Approved phrases**:

```
"Seneca Caverns is a cool stop if you're heading to Seneca Rocks. Literally cool - 54°F inside."
"Bring a jacket. It's 54 degrees year-round in the cave, and you'll be underground for an hour."
"Tours are guided - about 250 stairs, some steep. Wear good shoes (not flip-flops)."
"Mirror Lake is the highlight - still water that reflects the ceiling. Worth the tour."
"Seneca Caverns is 30 minutes from Seneca Rocks. Easy to combine both in one trip."

```

**Forbidden phrases**:

```
NEVER: "Journey into the earth's depths", "Underground wonderland", "Nature's cathedral", "Mystical subterranean realm"

```

**Practical focus**:

```
"It's not a wild cave - it's a guided tour. Lights, stairs, walkways. Family-friendly if you can handle stairs."
"Book tours at senecacaverns.com. We're just here to tell you what to bring: jacket and good shoes."

```

## Content Blocks (Cave Template Sections)

### Hero Block
**Image**: Cave formation (mirror lake or stalactites)
**Headline**: "Seneca Caverns: West Virginia's Historic Underground Wonder"
**Subhead**: "Guided tours 165 ft below ground. 54°F year-round, 60-minute tour. 2.5 hours from our shop."
**CTA**: "What to Bring for Your Tour"

### Cave Overview Block
**Content**:
- Discovered 1742 (one of WV's oldest show caves)
- Depth: 165 ft below surface
- Temperature: 54°F year-round (bring jacket)
- Guided tours: ~60 minutes, ~250 stairs
- Operating season: Apr-Oct (check senecacaverns.com for current hours)
**Kim's note**: *"It's 54 degrees down there, even in summer. Bring a light jacket or long sleeves."*

### Tour Details Block
**Component**: `<TourDetails tour={senecaTour} logistics={tourLogistics} />`
**Content**:
- Duration: 60 minutes
- Stairs: ~250 (moderate fitness required)
- Temperature: 54°F constant
- What to bring: Jacket, sturdy shoes, camera
- Not wheelchair accessible
**Kim's note**: *"Wear good shoes - stairs are steep and slippery. Hiking boots or sneakers. Skip the flip-flops."*

### Formation Highlights Block
**Component**: `<FormationGallery formations={senecaFormations} />`
**Content**: Mirror Lake (reflecting pool), Grand Ballroom (massive chamber), Flowstone curtains, Stalactites/Stalagmites
**Kim's note**: *"Mirror Lake is the tour highlight - still water that reflects the ceiling like a mirror. Stunning."*

### What to Bring Block
**Content**:
- Required: Sturdy closed-toe shoes, Light jacket/sweater
- Recommended: Camera (photography allowed), Water bottle
- Not needed: Flashlight (cave is lit), Heavy layers
**Kim's note**: *"Camera's allowed on the tour. Cave is lit, so no flashlight needed. Just jacket and good shoes."*

### Nearby Attractions Block
**Component**: `<NearbyAttractions attractions={nearby} />`
**Content**:
- Seneca Rocks (30 min) - climbing, hiking
- Germany Valley (15 min) - scenic drive
- Smoke Hole Caverns (45 min) - another cave option
**Kim's note**: *"Seneca Caverns is 30 min from Seneca Rocks. Easy to do both in one day - cave in morning, climb or hike afternoon."*

### Access & Logistics Block
**Content**:
- Drive time from WVWO shop: 2.5 hours via US-33 E
- Parking: Free on-site
- Admission: (link to senecacaverns.com for current prices)
- Booking: Tickets at entrance or online (groups book ahead)
- Season: Apr-Oct (call ahead off-season)
**CTA**: "Stop by WVWO for directions and local beta - we're on your route"

### Local Knowledge Block
**Kim's voice**:

```
"Seneca Caverns is a solid family attraction if you're in the area. It's a guided tour -
about 60 minutes underground, 165 feet below the surface. Constant 54 degrees year-round,
so bring a jacket even if it's July.

The tour is about 250 stairs - some steep, some slippery. Wear sturdy shoes. Hiking boots
or sneakers are fine. Don't wear flip-flops or sandals - you'll regret it.

Mirror Lake is the highlight - a still underground pool that reflects the ceiling formations
like a mirror. It's stunning. The Grand Ballroom is massive - big chamber with flowstone
curtains and stalactites.

Photography is allowed on the tour, so bring your camera. Cave is lit, so you don't need
a flashlight. Just jacket, good shoes, and camera.

Seneca Caverns is 30 minutes from Seneca Rocks. Easy to combine both in one trip - cave
tour in the morning, then drive to Seneca for climbing or hiking in the afternoon.

Tours run April through October. Check senecacaverns.com for current hours and prices.
They sometimes close for maintenance or weather, so call ahead if you're making a special trip.

Germany Valley is 15 minutes away - beautiful scenic drive through rural WV farmland.
Worth the detour for photos.

We're not affiliated with Seneca Caverns - they're a separate business. Book tours directly
with them. We're just here to tell you what to bring: jacket and good shoes. Grand love ya."

```

### Disclaimer Block (Prominent)
**Content**:

```
**Not Affiliated**: Seneca Caverns is a separate commercial business. WV Wild Outdoors provides
outdoor gear information. To book cave tours, visit senecacaverns.com or call them directly.
We're happy to offer trip planning advice - stop by the shop!

```

## Schema.org Markup


```typescript
const senecaCavernsSchema = {
  "@context": "https://schema.org",
  "@type": "TouristAttraction",
  "name": "Seneca Caverns",
  "description": "Historic West Virginia show cave discovered in 1742. Guided tours 165 ft underground featuring Mirror Lake, stalactites, flowstone formations. 54°F year-round.",
  "image": "https://wvwildoutdoors.com/images/destinations/seneca-caverns-hero.jpg",
  "url": "https://wvwildoutdoors.com/destinations/seneca-caverns",
  "sameAs": "https://senecacaverns.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Riverton",
    "addressRegion": "WV",
    "postalCode": "26814"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 38.7656,
    "longitude": -79.3373
  },
  "isAccessibleForFree": false,
  "publicAccess": true,
  "touristType": ["families", "cave enthusiasts", "photographers", "road trippers"]
};

```

## Swarm Coordination Hooks

### Pre-Task (All Agents)

```bash
npx claude-flow@alpha hooks pre-task --description "SPEC-36 Seneca Caverns: [agent-role] [task-name]"
npx claude-flow@alpha hooks session-restore --session-id "swarm-seneca-caverns"

```

### Scout Memory Storage

```bash
# Scout 1 stores cavern official info
npx claude-flow@alpha hooks post-edit --memory-key "swarm/seneca-caverns/scout1-official" --file "cavern-data.json"

# Scout 2 stores tour experience
npx claude-flow@alpha hooks post-edit --memory-key "swarm/seneca-caverns/scout2-tour" --file "tour-details.json"

# Scout 3 stores regional context
npx claude-flow@alpha hooks post-edit --memory-key "swarm/seneca-caverns/scout3-nearby" --file "nearby-attractions.json"

```

### Queen Synthesis

```bash
npx claude-flow@alpha hooks session-restore --session-id "swarm-seneca-caverns"

```

### Planner Memory Storage

```bash
# Planner 1 stores content architecture
npx claude-flow@alpha hooks post-edit --memory-key "swarm/seneca-caverns/plan-content" --file "cave-content-outline.md"

# Planner 2 stores technical architecture
npx claude-flow@alpha hooks post-edit --memory-key "swarm/seneca-caverns/plan-technical" --file "tour-component-design.json"

```

### Coder Implementation

```bash
npx claude-flow@alpha hooks session-restore --session-id "swarm-seneca-caverns"
npx agentdb@latest reflexion store "wvwo-session" "seneca-caverns-page" 1.0 true "Cave attraction template with TourDetails (60min, 250 stairs, 54°F), FormationGallery (mirror lake, flowstone), NearbyAttractions (Seneca Rocks combo trip), ExternalBookingCTA with disclaimer, Kim's practical voice (jacket + good shoes emphasis), gear suggestions (not product sales)"

```

### Post-Task (All Agents)

```bash
npx claude-flow@alpha hooks post-task --task-id "spec-36-seneca-caverns-[agent-role]"
npx claude-flow@alpha hooks session-end --export-metrics true

```

## Success Criteria

### Content Quality
- [ ] Kim's voice authentic (practical, informative, family-friendly, prep-focused)
- [ ] Zero AI slop ("journey into earth's depths", "mystical realm", etc.)
- [ ] Tour logistics accurate (60 min, 250 stairs, 54°F, jacket + shoes)
- [ ] Formation highlights clear (mirror lake, flowstone, stalactites)
- [ ] Nearby attractions mentioned (Seneca Rocks combo trip)
- [ ] Clear WVWO/Caverns separation (disclaimer prominent)

### Technical Quality
- [ ] Passes WVWO aesthetic checklist
- [ ] Mobile-responsive (375px width)
- [ ] Schema.org validation (TouristAttraction)
- [ ] Drive time accurate (2.5 hours from shop)
- [ ] Images optimized (cave formations, WebP, <200KB each)
- [ ] Load time <2s on 3G
- [ ] External links to Seneca Caverns site (clear, not pushy)

### Swarm Coordination
- [ ] All scouts completed research in parallel
- [ ] Queen successfully synthesized findings
- [ ] Planners built on scout data
- [ ] Coder implemented disclaimer prominently
- [ ] Success pattern stored in AgentDB

## Implementation Order

1. **Queen**: Initialize swarm, assign scout tasks (single message with 3 Task calls)
2. **Scouts 1-3**: Execute research in parallel (WebSearch + AgentDB retrieval)
3. **Queen**: Retrieve scout findings, synthesize for planners
4. **Planner 1**: Design cave content architecture (tour logistics focus)
5. **Planner 2**: Design technical architecture (TourDetails, FormationGallery)
6. **Coder**: Implement page with disclaimer (read both planner outputs)
7. **Queen**: Review implementation, store success pattern

**Total messages**: ~8-10

## AgentDB Pattern Storage

After successful implementation:

```bash
npx agentdb@latest reflexion store "wvwo-session" "seneca-caverns-commercial-cave" 1.0 true "Commercial cave attraction template with hierarchical swarm. TourDetails component (60min, 165ft depth, 54°F constant, 250 stairs), FormationGallery (mirror lake, grand ballroom, flowstone), NearbyAttractions (Seneca Rocks 30min combo trip), ExternalBookingCTA with prominent disclaimer (WVWO not affiliated). Kim's practical prep-focused voice (jacket + sturdy shoes emphasis), family-friendly tone. Gear suggestions (jacket/shoes, not product sales). Schema.org TouristAttraction. 2.5hr drive from shop."

```

**Reusable for**: Smoke Hole Caverns (SPEC-37), other commercial cave attractions, guided tour destinations
