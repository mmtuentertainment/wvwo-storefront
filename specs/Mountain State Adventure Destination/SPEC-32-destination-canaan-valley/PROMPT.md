# SPEC-32: Canaan Valley Destination Page - Swarm Implementation Prompt

## Objective
Create `/destinations/canaan-valley` page using hierarchical swarm coordination with WebSearch research, AgentDB pattern learning, and hybrid template implementation (combines ski resort + state park patterns).

## Swarm Architecture

**Topology**: Hierarchical (1 queen → 3 scouts → 2 planners → 1 coder)

### Queen Agent (Coordinator)
**Role**: Orchestrate research → planning → implementation for hybrid ski/state park destination
**Responsibilities**:
- Initialize swarm memory namespace `swarm/canaan-valley`
- Assign tasks to scouts (state park info, ski resort info, summer activities/wildlife)
- Synthesize scout findings for planners (hybrid template integration)
- Approve final implementation from coder
- Store success patterns in AgentDB

### Scout Agents (3 Parallel Researchers)

#### Scout 1: State Park Official Information
**Research targets**:

```bash
WebSearch("Canaan Valley State Park official site WV 2025")
WebSearch("Canaan Valley State Park camping trails amenities")
WebSearch("Canaan Valley State Park fees hours regulations")

```

**AgentDB retrieval**:

```bash
npx agentdb@latest reflexion retrieve "state park official information" --k 10 --synthesize-context
npx agentdb@latest skill search "state park facilities camping" 5

```

**Deliverables**:
- Official WV State Parks URLs
- Park amenities (campground, lodge, trails)
- Entry/camping fees
- Operating hours (year-round)
- Regulations (pets, fires, backcountry)

#### Scout 2: Ski Resort Information
**Research targets**:

```bash
WebSearch("Canaan Valley Resort ski conditions trails 2025")
WebSearch("Canaan Valley ski resort lift tickets terrain")
WebSearch("Canaan Valley Resort vs Timberline comparison")

```

**AgentDB retrieval**:

```bash
npx agentdb@latest reflexion retrieve "ski resort smaller regional" --k 10 --filters '{"success":true}'
npx agentdb@latest recall with-certificate "family ski destination" 12

```

**Deliverables**:
- Ski terrain (47 slopes/trails, 4 lifts)
- Difficulty breakdown (beginner 40%, intermediate 40%, advanced 20%)
- Season dates (Dec-Mar typically)
- Lift ticket prices (more affordable than Snowshoe)
- Tubing park (family-friendly winter activity)

#### Scout 3: Summer Activities & Wildlife
**Research targets**:

```bash
WebSearch("Canaan Valley State Park hiking trails Bald Knob")
WebSearch("Canaan Valley wildlife viewing birding wetlands")
WebSearch("Canaan Valley National Wildlife Refuge")

```

**AgentDB retrieval**:

```bash
npx agentdb@latest reflexion retrieve "wildlife viewing ecotourism" --k 10
npx agentdb@latest skill search "wetlands birding nature" 5

```

**Deliverables**:
- Summer hiking trails (Bald Knob, Blackwater River Trail)
- Wildlife viewing (wetlands, birding hotspot)
- Canaan Valley National Wildlife Refuge (adjacent)
- Mountain biking trails
- Unique ecology (high-elevation valley, rare species)

### Planner Agents (2 Sequential Architects)

#### Planner 1: Content Architecture (Hybrid Template)
**Input**: Synthesized scout findings from queen
**Template**: Hybrid (ski resort + state park patterns)

**AgentDB retrieval**:

```bash
npx agentdb@latest reflexion retrieve "hybrid ski park template" --k 10 --synthesize-context
npx agentdb@latest reflexion retrieve "WVWO voice Kim authentic" --k 10 --only-successes

```

**Responsibilities**:
1. Map scout data to hybrid template sections
2. Design hero content (valley landscape, winter/summer dual appeal)
3. Plan winter/summer content split (ski resort vs nature/wildlife)
4. Structure unique ecology messaging (high-elevation valley, wetlands)
5. Voice design: Family-friendly, nature-appreciative, affordable alternative to Snowshoe

**Deliverables**:
- Content outline with hybrid section headers
- Hero messaging ("Canaan Valley: Where Mountains Meet Wetlands")
- Winter ski vs summer nature content blocks
- Kim's voice snippets emphasizing family affordability
- Gear callout placements (ski winter, hiking/birding summer)

#### Planner 2: Technical Architecture
**Input**: Content architecture from Planner 1

**AgentDB retrieval**:

```bash
npx agentdb@latest reflexion retrieve "seasonal content toggle implementation" --k 10 --filters '{"success":true}'
npx agentdb@latest skill search "dual attraction hybrid page" 5

```

**Responsibilities**:
1. Component selection (SeasonalToggle, TrailList, WildlifeGallery, SkiTerrainBreakdown)
2. Data structure design (ski trails, hiking trails, wildlife species, seasonal activities)
3. Schema.org markup (SkiResort + StateOrProvincialPark types)
4. Drive time calculation (from 38.5858, -80.8581 to Canaan Valley ~2 hours)
5. Responsive layout (mobile nature photography emphasis)

**Deliverables**:
- Component tree with seasonal state management
- JSON data structure (ski terrain, hiking trails, wildlife, amenities)
- Schema markup template (dual types)
- Performance budget (nature photography lazy loading)

### Coder Agent (Implementation)
**Input**: Content + technical architecture from planners

**AgentDB retrieval**:

```bash
npx agentdb@latest reflexion retrieve "hybrid destination implementation" --k 15 --synthesize-context
npx agentdb@latest reflexion retrieve "WVWO aesthetic nature photography" --k 10 --only-successes

```

**Responsibilities**:
1. Implement `/wv-wild-web/src/pages/destinations/canaan-valley.astro`
2. Create seasonal toggle component (Winter Ski / Summer Nature tabs)
3. Apply WVWO aesthetic (earthy palette, sign-green for nature, brand-brown for ski)
4. Implement dual schema markup (SkiResort + StateOrProvincialPark)
5. Optimize images (snowy slopes, wetlands, wildlife, WebP)
6. Add gear category links (winter ski, summer hiking/birding)

**Quality gates**:
- Pass WVWO aesthetic checklist
- Kim's voice authentic (family-friendly, nature-appreciative, affordable)
- Mobile-responsive toggle (375px width)
- Schema.org dual-type validation
- Load time <2s on 3G

**Deliverables**:
- Complete `.astro` page file
- SeasonalToggle component
- WildlifeGallery component (if needed)
- Image optimization report

## Data Requirements

### Geographic Data
**Shop coordinates**: `38.5858, -80.8581` (Birch River, WV)
**Destination coordinates**: `39.1213, -79.4354` (Canaan Valley, WV)
**Drive time**: ~2 hours via US-219 N
**Distance**: ~85 miles

### Ski Resort Data (Winter)

```typescript
interface SkiResort {
  name: string;
  trails: number;
  lifts: number;
  difficulty: { beginner: number; intermediate: number; advanced: number; };
  features: string[];
}

const canaanValleyResort: SkiResort = {
  name: "Canaan Valley Resort",
  trails: 47,
  lifts: 4,
  difficulty: { beginner: 40, intermediate: 40, advanced: 20 },
  features: ["Tubing park", "Terrain park", "Night skiing", "Snowmaking 100%"]
};

```

### State Park Data (Year-Round)

```typescript
interface StatePark {
  name: string;
  acres: number;
  amenities: string[];
  trails: Trail[];
  wildlife: string[];
}

const canaanValleyPark: StatePark = {
  name: "Canaan Valley State Park",
  acres: 6015,
  amenities: ["Campground (34 sites)", "Lodge (250 rooms)", "Golf course", "Nature center"],
  trails: [
    { name: "Bald Knob Trail", length: "2.8 mi", difficulty: "moderate", highlights: ["Summit views", "4,308 ft elevation"] },
    { name: "Blackwater River Trail", length: "1 mi", difficulty: "easy", highlights: ["Wetlands", "Birding"] },
    { name: "Club Run Trail", length: "3 mi", difficulty: "moderate", highlights: ["Forest loop", "Wildlife viewing"] }
  ],
  wildlife: ["White-tailed deer", "Black bear", "Snowshoe hare", "200+ bird species", "Rare wetland plants"]
};

```

### Seasonal Patterns

```typescript
interface Season {
  name: string;
  months: string;
  activities: string[];
  crowds: "light" | "moderate" | "heavy";
  wvwoGear: string[];
}

const canaanSeasons: Season[] = [
  {
    name: "Ski Season",
    months: "Dec-Mar",
    activities: ["Downhill skiing", "Snowboarding", "Tubing", "Cross-country skiing"],
    crowds: "moderate",
    wvwoGear: ["ski-gear", "winter-layers", "goggles", "gloves"]
  },
  {
    name: "Spring Birding",
    months: "Apr-May",
    activities: ["Birding", "Hiking", "Wildlife viewing", "Wildflowers"],
    crowds: "light",
    wvwoGear: ["binoculars", "hiking-boots", "field-guides"]
  },
  {
    name: "Summer Nature",
    months: "Jun-Aug",
    activities: ["Hiking", "Wildlife viewing", "Golf", "Mountain biking"],
    crowds: "moderate",
    wvwoGear: ["hiking-gear", "day-packs", "bug-spray"]
  },
  {
    name: "Fall Foliage",
    months: "Sep-Nov",
    activities: ["Hiking", "Wildlife viewing", "Photography", "Golf"],
    crowds: "moderate",
    wvwoGear: ["hiking-gear", "layers", "camera-gear"]
  }
];

```

### Gear Category Mappings

```typescript
const gearMappings = {
  winter: [
    { category: "ski-snowboard", products: ["ski-boots", "poles", "goggles", "helmet"] },
    { category: "winter-clothing", products: ["base-layers", "gloves", "balaclava"] }
  ],
  summer: [
    { category: "hiking", products: ["hiking-boots", "day-pack", "trekking-poles"] },
    { category: "wildlife-viewing", products: ["binoculars", "field-guide", "camera-bag"] }
  ]
};

```

## Kim's Voice Guidelines for Canaan Valley

**Tone**: Family-friendly, nature-appreciative, affordable alternative messaging.

**Approved phrases**:

```
"Canaan Valley is our go-to for families. Smaller than Snowshoe, way less crowded, easier on the wallet."
"The valley's a birding hotspot. 200+ species, rare wetland plants. Bring binoculars."
"Winter skiing's solid - not extreme, but perfect for learning or cruising with the kids."
"Summer hiking here is different. High-elevation valley means cooler temps, unique ecosystems."
"We stock everything from ski goggles to field guides. Stop by on your way north."

```

**Forbidden phrases**:

```
NEVER: "Premier destination", "Luxury resort", "World-class slopes", "Ultimate escape"

```

**Affordability emphasis**:

```
"Canaan's lift tickets are cheaper than Snowshoe. Same WV snow, less sticker shock."
"State park camping is $20-30/night. Lodge is reasonable too. Family trip that won't break the bank."

```

## Content Blocks (Hybrid Template Sections)

### Hero Block
**Image**: Valley landscape (winter: snowy slopes, summer: wetlands)
**Headline**: "Canaan Valley: Where Mountains Meet Wetlands"
**Subhead**: "Family skiing in winter, rare wildlife in summer. State park + ski resort. 2 hours from our shop."
**CTA**: "Shop Winter Gear" (winter) / "Shop Hiking Gear" (summer toggle)

### Seasonal Toggle Block
**Component**: `<SeasonalToggle seasons={["Winter Ski", "Summer Nature"]} client:visible />`
**Winter content**: Ski resort terrain, tubing park, cross-country trails
**Summer content**: Hiking trails, wildlife viewing, birding, golf

### Winter Ski Content
**Component**: `<SkiTerrainBreakdown resort={canaanValleyResort} />`
**Content**:
- 47 trails, 4 lifts (beginner-friendly 40%/40%/20% split)
- Tubing park (family favorite)
- Night skiing available
- More affordable than Snowshoe (link to resort for pricing)
**Kim's note**: *"Canaan's perfect for learning or family skiing. Not as big as Snowshoe, but way less intimidating."*

### Summer Nature Content
**Component**: `<TrailList trails={canaanValleyPark.trails} />`
**Content**:
- Hiking trails (Bald Knob summit, Blackwater wetlands)
- Wildlife viewing (200+ bird species, snowshoe hare, black bear)
- Canaan Valley National Wildlife Refuge (adjacent)
- Unique ecology (high-elevation valley, rare wetlands)
**Kim's note**: *"Birders love Canaan - rare species you won't see elsewhere in WV. Bring field guides."*

### Wildlife Gallery Block
**Content**: Photography showcase (birds, wetlands, deer, rare plants)
**Caption examples**: "Snowshoe hare (winter coat)", "High-elevation wetlands", "Swainson's thrush (spring migrant)"
**CTA**: "Shop Binoculars & Field Guides"

### State Park Amenities Block
**Content**:
- Campground (34 sites, electric hookups)
- Lodge (250 rooms, on-site dining)
- Golf course (18-hole)
- Nature center (educational programs)
**Kim's note**: *"State park camping is cheap ($20-30/night). Lodge is reasonable if you want a bed and hot shower."*

### Access & Logistics Block
**Content**:
- Drive time from WVWO shop: 2 hours via US-219 N
- Entry fees: (state park day-use free, camping $20-30)
- Ski lift tickets: (link to resort - cheaper than Snowshoe)
- Lodging: State park lodge, campground, nearby towns
**CTA**: "We're halfway there - stop by for gear and local beta"

### Local Knowledge Block
**Kim's voice**:

```
"Canaan Valley is underrated. Most folks head to Snowshoe and miss this gem.

Winter skiing is family-friendly. 40% beginner terrain, tubing park for kids,
night skiing if you want to maximize daylight. Lift tickets are $20-30 cheaper
than Snowshoe - same WV snow, less sticker shock.

Summer is where Canaan really shines. It's a high-elevation valley (3,200 ft),
so it's cooler than the rest of WV in July. Wetlands are rare this far south -
you'll see bird species that normally hang out in Canada.

Bald Knob Trail is a must. 2.8 miles to a 4,308 ft summit. Views for days.

Blackwater River Trail is easy (1 mile) and perfect for wildlife viewing. Early
morning is prime time for deer, bear, and songbirds.

The state park campground is clean and cheap. $20-30/night with electric hookups.
Lodge is nice if you want a real bed and on-site restaurant.

We're halfway between the shop and Canaan - stop in for gear. Ski goggles, hiking
boots, binoculars, field guides, bug spray - we've got you covered. Grand love ya."

```

## Schema.org Markup (Dual Types)


```typescript
const canaanValleySchema = {
  "@context": "https://schema.org",
  "@type": ["SkiResort", "StateOrProvincialPark"],
  "name": "Canaan Valley State Park & Resort",
  "description": "West Virginia state park with ski resort (47 trails, 4 lifts) and rare high-elevation wetlands. Year-round activities: skiing, hiking, wildlife viewing, birding.",
  "image": "https://wvwildoutdoors.com/images/destinations/canaan-valley-hero.jpg",
  "url": "https://wvwildoutdoors.com/destinations/canaan-valley",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Davis",
    "addressRegion": "WV",
    "postalCode": "26260"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 39.1213,
    "longitude": -79.4354
  },
  "isAccessibleForFree": false,
  "publicAccess": true,
  "touristType": ["families", "skiers", "hikers", "birders", "nature photographers"]
};

```

## Swarm Coordination Hooks

### Pre-Task (All Agents)

```bash
npx claude-flow@alpha hooks pre-task --description "SPEC-32 Canaan Valley: [agent-role] [task-name]"
npx claude-flow@alpha hooks session-restore --session-id "swarm-canaan-valley"

```

### Scout Memory Storage

```bash
# Scout 1 stores state park info
npx claude-flow@alpha hooks post-edit --memory-key "swarm/canaan/scout1-park" --file "state-park-data.json"

# Scout 2 stores ski resort info
npx claude-flow@alpha hooks post-edit --memory-key "swarm/canaan/scout2-ski" --file "ski-resort-data.json"

# Scout 3 stores summer/wildlife info
npx claude-flow@alpha hooks post-edit --memory-key "swarm/canaan/scout3-nature" --file "wildlife-trails.json"

```

### Queen Synthesis

```bash
npx claude-flow@alpha hooks session-restore --session-id "swarm-canaan-valley"

```

### Planner Memory Storage

```bash
# Planner 1 stores hybrid content architecture
npx claude-flow@alpha hooks post-edit --memory-key "swarm/canaan/plan-content" --file "hybrid-outline.md"

# Planner 2 stores technical architecture
npx claude-flow@alpha hooks post-edit --memory-key "swarm/canaan/plan-technical" --file "dual-schema-design.json"

```

### Coder Implementation

```bash
npx claude-flow@alpha hooks session-restore --session-id "swarm-canaan-valley"
npx agentdb@latest reflexion store "wvwo-session" "canaan-valley-page" 1.0 true "Hybrid ski+park template with SeasonalToggle, dual schema (SkiResort + StateOrProvincialPark), wildlife gallery, Kim's family-affordable voice, gear mappings for ski/hiking/birding"

```

### Post-Task (All Agents)

```bash
npx claude-flow@alpha hooks post-task --task-id "spec-32-canaan-[agent-role]"
npx claude-flow@alpha hooks session-end --export-metrics true

```

## Success Criteria

### Content Quality
- [ ] Kim's voice authentic (family-friendly, affordable alternative, nature-appreciative)
- [ ] Zero AI slop ("premier", "luxury", etc.)
- [ ] Seasonal toggle clear (winter ski vs summer nature)
- [ ] Wildlife/ecology messaging unique (high-elevation valley, rare species)
- [ ] Gear recommendations match WVWO inventory

### Technical Quality
- [ ] Passes WVWO aesthetic checklist
- [ ] Mobile-responsive toggle (375px width)
- [ ] Schema.org dual-type validation (SkiResort + StateOrProvincialPark)
- [ ] Drive time accurate (2 hours from shop)
- [ ] Images optimized (WebP, lazy load, <200KB each)
- [ ] Load time <2s on 3G

### Swarm Coordination
- [ ] All scouts completed research in parallel
- [ ] Queen successfully synthesized hybrid data
- [ ] Planners built on scout data
- [ ] Coder implemented dual-template pattern
- [ ] Success pattern stored in AgentDB

## Implementation Order

1. **Queen**: Initialize swarm, assign scout tasks (single message with 3 Task calls)
2. **Scouts 1-3**: Execute research in parallel (WebSearch + AgentDB retrieval)
3. **Queen**: Retrieve scout findings, synthesize for planners (hybrid integration)
4. **Planner 1**: Design hybrid content architecture (ski + nature)
5. **Planner 2**: Design technical architecture (dual schema, seasonal toggle)
6. **Coder**: Implement page with toggle (read both planner outputs)
7. **Queen**: Review implementation, store success pattern

**Total messages**: ~8-10

## AgentDB Pattern Storage

After successful implementation:

```bash
npx agentdb@latest reflexion store "wvwo-session" "canaan-valley-hybrid" 1.0 true "Hybrid ski resort + state park template with hierarchical swarm. SeasonalToggle (Winter Ski / Summer Nature), dual schema.org types (SkiResort + StateOrProvincialPark), wildlife gallery (birding, rare wetlands), Kim's family-affordable voice emphasizing budget alternative to Snowshoe, gear mappings for ski/hiking/birding. 47 ski trails (beginner-friendly), high-elevation valley ecology messaging. 2hr drive from shop."

```

**Reusable for**: Other hybrid ski/nature destinations, state parks with winter sports
