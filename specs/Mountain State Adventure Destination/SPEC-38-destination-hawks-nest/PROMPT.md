# SPEC-38: Hawks Nest State Park Destination Page - Swarm Implementation Prompt

## Objective
Create `/destinations/hawks-nest` page using hierarchical swarm coordination with WebSearch research, AgentDB pattern learning, and state park template implementation (scenic overlook + aerial tramway + New River access).

## Swarm Architecture

**Topology**: Hierarchical (1 queen → 3 scouts → 2 planners → 1 coder)

### Queen Agent (Coordinator)
**Role**: Orchestrate research → planning → implementation for scenic overlook park with unique aerial tramway
**Responsibilities**:
- Initialize swarm memory namespace `swarm/hawks-nest`
- Assign tasks to scouts (state park official, aerial tramway/overlook, New River access/activities)
- Synthesize scout findings for planners
- Approve final implementation from coder
- Store success patterns in AgentDB

### Scout Agents (3 Parallel Researchers)

#### Scout 1: State Park Official Information
**Research targets**:

```bash
WebSearch("Hawks Nest State Park official WV 2025")
WebSearch("Hawks Nest State Park lodge amenities camping")
WebSearch("Hawks Nest State Park fees hours regulations")

```

**AgentDB retrieval**:

```bash
npx agentdb@latest reflexion retrieve "state park official information" --k 10 --synthesize-context
npx agentdb@latest skill search "state park lodge overlook" 5

```

**Deliverables**:
- Official WV State Parks URLs
- Park amenities (Hawks Nest Lodge, overlook, aerial tramway, museum)
- Entry fees (day-use free for WV residents)
- Operating hours (year-round park, seasonal tramway)
- Regulations (pets, trails, New River access)

#### Scout 2: Aerial Tramway & Scenic Overlook
**Research targets**:

```bash
WebSearch("Hawks Nest aerial tramway New River Gorge")
WebSearch("Hawks Nest overlook scenic views photography")
WebSearch("Hawks Nest aerial tramway operating hours fees")

```

**AgentDB retrieval**:

```bash
npx agentdb@latest reflexion retrieve "scenic overlook aerial tramway unique" --k 10 --filters '{"success":true}'
npx agentdb@latest recall with-certificate "family attraction viewpoint" 12

```

**Deliverables**:
- Aerial tramway details (600 ft descent to New River, seasonal operation)
- Tramway logistics (fees, hours, capacity)
- Overlook viewpoint (New River Gorge views, accessible)
- Photography opportunities (sunrise/sunset, gorge views)
- Museum (coal mining history, New River Gorge Bridge)

#### Scout 3: New River Access & Activities
**Research targets**:

```bash
WebSearch("Hawks Nest State Park New River access fishing jet boat tours")
WebSearch("Hawks Nest hiking trails Cliffside Trail Overlook Trail")
WebSearch("Hawks Nest State Park water activities rafting")

```

**AgentDB retrieval**:

```bash
npx agentdb@latest reflexion retrieve "river access fishing trails" --k 10
npx agentdb@latest skill search "jet boat tours water activities" 5

```

**Deliverables**:
- New River access (bottom of tramway, boat launch)
- Jet boat tours (seasonal, high-speed tours through gorge)
- Fishing (smallmouth bass, New River)
- Hiking trails (Overlook Trail, Cliffside Trail, Fisherman's Trail)
- Rafting access (nearby outfitters)

### Planner Agents (2 Sequential Architects)

#### Planner 1: Content Architecture
**Input**: Synthesized scout findings from queen
**Template**: State park template (`docs/templates/destination-state-park.md`)

**AgentDB retrieval**:

```bash
npx agentdb@latest reflexion retrieve "state park scenic overlook template" --k 10 --synthesize-context
npx agentdb@latest reflexion retrieve "WVWO voice Kim authentic" --k 10 --only-successes

```

**Responsibilities**:
1. Map scout data to state park template sections
2. Design hero content (aerial tramway or overlook imagery)
3. Plan tramway/overlook as primary draw, river access as secondary
4. Structure trail system (short easy trails to overlook)
5. Voice design: Family-friendly, scenic drive emphasis, unique tramway highlight

**Deliverables**:
- Content outline with state park template headers
- Hero messaging ("Hawks Nest: Aerial Tramway to the New River Gorge")
- Tramway/overlook details (600 ft descent, scenic views)
- River access content (jet boats, fishing)
- Kim's voice snippets (scenic drive, family-friendly tramway)
- Gear callout placements (fishing gear, camera gear)

#### Planner 2: Technical Architecture
**Input**: Content architecture from Planner 1

**AgentDB retrieval**:

```bash
npx agentdb@latest reflexion retrieve "state park page aerial tramway" --k 10 --filters '{"success":true}'
npx agentdb@latest skill search "scenic overlook photo gallery" 5

```

**Responsibilities**:
1. Component selection (AerialTramwayDetails, ScenicOverlook, TrailList, RiverAccess)
2. Data structure design (tramway info, trails, river activities, amenities)
3. Schema.org markup (StateOrProvincialPark type)
4. Drive time calculation (from 38.5858, -80.8581 to Ansted ~40 min)
5. Responsive layout (mobile overlook photos emphasis)
6. Image strategy (tramway, gorge overlook, New River from above)

**Deliverables**:
- Component tree with tramway/overlook focus
- JSON data structure (tramway, overlook, trails, river access)
- Schema markup template (StateOrProvincialPark)
- Performance budget (overlook photos lazy load)

### Coder Agent (Implementation)
**Input**: Content + technical architecture from planners

**AgentDB retrieval**:

```bash
npx agentdb@latest reflexion retrieve "state park overlook implementation" --k 15 --synthesize-context
npx agentdb@latest reflexion retrieve "WVWO aesthetic scenic photography" --k 10 --only-successes

```

**Responsibilities**:
1. Implement `/wv-wild-web/src/pages/destinations/hawks-nest.astro`
2. Create AerialTramwayDetails component (unique to Hawks Nest)
3. Apply WVWO aesthetic (earthy tones, sign-green for trails, brand-brown for overlook)
4. Implement schema markup
5. Optimize images (tramway, overlook views, New River, WebP)
6. Add gear category links (fishing gear, camera gear, hiking gear)

**Quality gates**:
- Pass WVWO aesthetic checklist
- Kim's voice authentic (family-friendly, scenic drive emphasis)
- Mobile-responsive (375px width)
- Schema.org validation
- Load time <2s on 3G

**Deliverables**:
- Complete `.astro` page file
- AerialTramwayDetails component
- ScenicOverlook component
- Image optimization report

## Data Requirements

### Geographic Data
**Shop coordinates**: `38.5858, -80.8581` (Birch River, WV)
**Destination coordinates**: `38.1256, -81.1014` (Ansted, WV - Hawks Nest State Park)
**Drive time**: ~40 minutes via US-60 W
**Distance**: ~30 miles

### Aerial Tramway Data

```typescript
interface AerialTramway {
  name: string;
  descent: number; // feet
  duration: string;
  capacity: number; // passengers per car
  fees: string;
  season: string;
  features: string[];
}

const hawksNestTramway: AerialTramway = {
  name: "Hawks Nest Aerial Tramway",
  descent: 600, // feet to New River
  duration: "3-4 minutes each way",
  capacity: 16, // passengers per tramway car
  fees: "Nominal fee (check wvstateparks.com for current pricing)",
  season: "Seasonal (typically spring-fall, weather dependent)",
  features: ["Only aerial tramway in WV state parks", "Scenic descent to New River", "Access to jet boat tours and fishing"]
};

```

### State Park Amenities Data

```typescript
const hawksNestAmenities = {
  lodging: [
    { type: "Hawks Nest Lodge", rooms: "31 rooms", features: ["Restaurant", "Scenic overlook views", "Gift shop"] }
  ],
  museum: "Hawks Nest Museum (coal mining history, New River Gorge Bridge)",
  overlook: "Scenic overlook (accessible, free, gorge views)",
  tramway: "Aerial tramway (seasonal, fee-based)",
  other: ["Picnic areas", "Playground", "Gift shop"]
};

```

### Trail System Data

```typescript
interface Trail {
  name: string;
  length: string;
  difficulty: string;
  highlights: string[];
}

const hawksNestTrails: Trail[] = [
  {
    name: "Overlook Trail",
    length: "0.5 mi",
    difficulty: "Easy (paved, accessible)",
    highlights: ["Scenic overlook", "New River Gorge views", "Photography spot"]
  },
  {
    name: "Cliffside Trail",
    length: "1 mi",
    difficulty: "Moderate",
    highlights: ["Gorge rim views", "Forest trail", "Less crowded"]
  },
  {
    name: "Fisherman's Trail",
    length: "0.75 mi",
    difficulty: "Moderate to Difficult (steep descent)",
    highlights: ["New River access", "Fishing spots", "Tramway alternative (foot path)"]
  }
];

```

### New River Activities Data

```typescript
interface RiverActivity {
  name: string;
  access: string;
  season: string;
  gearCategories: string[];
}

const hawksNestRiverActivities: RiverActivity[] = [
  {
    name: "Jet Boat Tours",
    access: "Bottom of aerial tramway",
    season: "Spring-fall (seasonal)",
    gearCategories: [] // Tour operator provides
  },
  {
    name: "Fishing (Smallmouth Bass)",
    access: "Bottom of tramway or Fisherman's Trail",
    season: "Year-round (best spring/fall)",
    gearCategories: ["fishing"]
  },
  {
    name: "Rafting (nearby outfitters)",
    access: "Nearby put-ins (not direct park access)",
    season: "Spring-fall",
    gearCategories: ["water-sports"]
  }
];

```

### Gear Category Mappings

```typescript
const gearMappings = {
  fishing: [
    { category: "fishing", products: ["wv-fishing-license", "bass-tackle", "fishing-rod"] }
  ],
  photography: [
    { category: "gear", products: ["camera-bag", "tripod", "binoculars"] }
  ],
  hiking: [
    { category: "hiking", products: ["day-pack", "trekking-poles", "hiking-boots"] }
  ]
};

```

## Kim's Voice Guidelines for Hawks Nest

**Tone**: Family-friendly, scenic drive emphasis, unique tramway highlight.

**Approved phrases**:

```
"Hawks Nest is a scenic drive stop - overlook's free, tramway's a few bucks. Worth it for the views."
"Aerial tramway is the only one in WV state parks. 600-foot descent to the New River. Kids love it."
"Overlook Trail is easy - paved, accessible, quick walk to gorge views. Great for photos."
"If you fish, tramway takes you down to the New River. Smallmouth bass fishing is solid."
"Hawks Nest Lodge restaurant has good food and overlook views. Stop for lunch on a scenic drive."

```

**Forbidden phrases**:

```
NEVER: "Soaring adventure", "Breathtaking aerial journey", "Ultimate scenic experience", "Nature's grandeur"

```

**Scenic drive integration**:

```
"Hawks Nest is on US-60 - Midland Trail Scenic Highway. Easy stop between Charleston and New River Gorge Bridge."

```

## Content Blocks (State Park Template Sections)

### Hero Block
**Image**: Aerial tramway descending to New River or scenic overlook view
**Headline**: "Hawks Nest: Aerial Tramway to the New River Gorge"
**Subhead**: "600-foot tramway descent, scenic overlook, New River fishing. 40 minutes from our shop."
**CTA**: "Shop Fishing Gear"

### Aerial Tramway Block (Primary Highlight)
**Component**: `<AerialTramwayDetails tramway={hawksNestTramway} />`
**Content**:
- 600 ft descent to New River
- 3-4 minute ride each way
- Only aerial tramway in WV state parks
- Seasonal operation (spring-fall, weather dependent)
- Access to jet boat tours, fishing, river level
**Kim's note**: *"Kids love the tramway. It's the only one in WV state parks. Takes you down to the river level in 4 minutes."*

### Scenic Overlook Block
**Component**: `<ScenicOverlook trails={hawksNestTrails.filter(t => t.name === "Overlook Trail")} />`
**Content**:
- Paved accessible overlook (0.5 mi trail)
- New River Gorge views
- Free (no tramway fee required)
- Photography spot (sunrise/sunset)
**Kim's note**: *"Overlook's free and easy. Paved trail, wheelchair accessible. Quick stop for gorge views."*

### Trail System Block
**Component**: `<TrailList trails={hawksNestTrails} />`
**Content**: Overlook Trail (easy, paved), Cliffside Trail (moderate, forest), Fisherman's Trail (steep descent to river)
**Kim's note**: *"Fisherman's Trail is steep - foot path alternative to tramway if you're hiking down to fish."*

### New River Access & Activities Block
**Component**: `<RiverActivities activities={hawksNestRiverActivities} />`
**Content**:
- Jet boat tours (bottom of tramway, seasonal)
- Fishing (smallmouth bass, tramway or Fisherman's Trail access)
- Rafting (nearby outfitters, not direct park access)
**Gear callouts**: Fishing gear (WV license, bass tackle)
**Kim's note**: *"Tramway gets you to the river for fishing. Smallmouth bass fight hard. Bring your WV license."*

### Park Amenities Block
**Content**:
- Hawks Nest Lodge (31 rooms, restaurant, overlook views)
- Museum (coal mining history, New River Gorge Bridge exhibit)
- Scenic overlook (free, accessible)
- Aerial tramway (seasonal, fee-based)
- Picnic areas, playground, gift shop
**Kim's note**: *"Lodge restaurant has solid food and gorge views. Good lunch stop on a scenic drive."*

### Access & Logistics Block
**Content**:
- Drive time from WVWO shop: 40 min via US-60 W
- Location: Midland Trail Scenic Highway (US-60)
- Entry fees: Day-use free (WV residents), Tramway fee (check wvstateparks.com)
- Lodging: Hawks Nest Lodge (book via wvstateparks.com)
- Cell service: Good (near US-60)
**CTA**: "We're on your route - stop by for fishing gear and local tips"

### Local Knowledge Block
**Kim's voice**:

```
"Hawks Nest is a great scenic drive stop. It's on US-60 - the Midland Trail Scenic Highway
that runs between Charleston and the New River Gorge Bridge. Easy to hit on a road trip.

The scenic overlook is free and worth the stop. Paved Overlook Trail (0.5 mi) to gorge
views. Wheelchair accessible. Great spot for photos, especially sunrise or sunset.

Aerial tramway is the main draw - only one in WV state parks. 600-foot descent to the
New River in 3-4 minutes. Kids love it. Small fee (check wvstateparks.com), seasonal
operation (spring-fall, weather dependent). At the bottom, you can catch jet boat tours
(high-speed gorge tours) or fish the New River.

Fishing from the tramway bottom is solid - smallmouth bass. Bring your WV license and
bass tackle. We sell licenses at the shop. Fisherman's Trail is the foot path alternative
to the tramway - steep descent, but free if you don't mind the hike.

Hawks Nest Lodge restaurant has good food and views of the gorge. Decent lunch stop if
you're driving through. Lodge has 31 rooms - book ahead for weekends.

Museum is small but interesting - coal mining history and New River Gorge Bridge exhibit.
Worth 20 minutes if you're into local history.

Cliffside Trail is quieter if you want a forest walk with gorge rim views. Moderate
difficulty, 1 mile.

We're 40 minutes north on US-60. Stop by on your way for fishing gear, local tips, or
just to say hi. Grand love ya."

```

## Schema.org Markup


```typescript
const hawksNestSchema = {
  "@context": "https://schema.org",
  "@type": "StateOrProvincialPark",
  "name": "Hawks Nest State Park",
  "description": "West Virginia state park featuring aerial tramway (600 ft descent to New River), scenic overlook, museum, and New River fishing/jet boat access. Located on Midland Trail Scenic Highway.",
  "image": "https://wvwildoutdoors.com/images/destinations/hawks-nest-hero.jpg",
  "url": "https://wvwildoutdoors.com/destinations/hawks-nest",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Ansted",
    "addressRegion": "WV",
    "postalCode": "25812"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 38.1256,
    "longitude": -81.1014
  },
  "isAccessibleForFree": true, // Overlook free, tramway has fee
  "publicAccess": true,
  "touristType": ["families", "scenic drive tourists", "photographers", "anglers"]
};

```

## Swarm Coordination Hooks

### Pre-Task (All Agents)

```bash
npx claude-flow@alpha hooks pre-task --description "SPEC-38 Hawks Nest: [agent-role] [task-name]"
npx claude-flow@alpha hooks session-restore --session-id "swarm-hawks-nest"

```

### Scout Memory Storage

```bash
# Scout 1 stores state park official info
npx claude-flow@alpha hooks post-edit --memory-key "swarm/hawks-nest/scout1-park" --file "park-data.json"

# Scout 2 stores tramway/overlook
npx claude-flow@alpha hooks post-edit --memory-key "swarm/hawks-nest/scout2-tramway" --file "tramway-overlook.json"

# Scout 3 stores river access
npx claude-flow@alpha hooks post-edit --memory-key "swarm/hawks-nest/scout3-river" --file "river-activities.json"

```

### Queen Synthesis

```bash
npx claude-flow@alpha hooks session-restore --session-id "swarm-hawks-nest"

```

### Planner Memory Storage

```bash
# Planner 1 stores content architecture
npx claude-flow@alpha hooks post-edit --memory-key "swarm/hawks-nest/plan-content" --file "tramway-park-outline.md"

# Planner 2 stores technical architecture
npx claude-flow@alpha hooks post-edit --memory-key "swarm/hawks-nest/plan-technical" --file "tramway-component-design.json"

```

### Coder Implementation

```bash
npx claude-flow@alpha hooks session-restore --session-id "swarm-hawks-nest"
npx agentdb@latest reflexion store "wvwo-session" "hawks-nest-page" 1.0 true "State park template with AerialTramwayDetails (600ft, only in WV, seasonal), ScenicOverlook (free accessible overlook), TrailList (3 trails), RiverActivities (jet boats, fishing), Kim's family scenic-drive voice, fishing gear callouts"

```

### Post-Task (All Agents)

```bash
npx claude-flow@alpha hooks post-task --task-id "spec-38-hawks-nest-[agent-role]"
npx claude-flow@alpha hooks session-end --export-metrics true

```

## Success Criteria

### Content Quality
- [ ] Kim's voice authentic (family-friendly, scenic drive stop, tramway unique highlight)
- [ ] Zero AI slop ("soaring adventure", "nature's grandeur", etc.)
- [ ] Tramway details accurate (600 ft, seasonal, fee-based)
- [ ] Overlook content clear (free, accessible, paved trail)
- [ ] River access explained (tramway bottom, Fisherman's Trail)
- [ ] Gear recommendations match WVWO inventory (fishing, camera)

### Technical Quality
- [ ] Passes WVWO aesthetic checklist
- [ ] Mobile-responsive (375px width)
- [ ] Schema.org validation (StateOrProvincialPark)
- [ ] Drive time accurate (40 min from shop)
- [ ] Images optimized (tramway, overlook, river, WebP, <200KB each)
- [ ] Load time <2s on 3G

### Swarm Coordination
- [ ] All scouts completed research in parallel
- [ ] Queen successfully synthesized findings
- [ ] Planners built on scout data
- [ ] Coder implemented tramway component
- [ ] Success pattern stored in AgentDB

## Implementation Order

1. **Queen**: Initialize swarm, assign scout tasks (single message with 3 Task calls)
2. **Scouts 1-3**: Execute research in parallel (WebSearch + AgentDB retrieval)
3. **Queen**: Retrieve scout findings, synthesize for planners
4. **Planner 1**: Design state park content architecture (tramway/overlook focus)
5. **Planner 2**: Design technical architecture (AerialTramwayDetails, ScenicOverlook components)
6. **Coder**: Implement page with tramway component (read both planner outputs)
7. **Queen**: Review implementation, store success pattern

**Total messages**: ~8-10

## AgentDB Pattern Storage

After successful implementation:

```bash
npx agentdb@latest reflexion store "wvwo-session" "hawks-nest-aerial-tramway-park" 1.0 true "State park template with hierarchical swarm. AerialTramwayDetails component (600ft descent, only WV state park tramway, seasonal operation, access to jet boats/fishing), ScenicOverlook (free accessible overlook, gorge views, photography), TrailList (3 trails: Overlook easy/paved, Cliffside moderate, Fisherman's steep river access), RiverActivities (jet boat tours, smallmouth bass fishing). Kim's family-friendly scenic-drive voice, Midland Trail (US-60) location emphasis. Hawks Nest Lodge amenities, museum. 40min drive from shop. Gear mappings (fishing/camera/hiking)."

```

**Reusable for**: Other state parks with unique attractions, scenic overlook destinations, aerial tramway/gondola attractions
