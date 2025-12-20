# SPEC-35: Blackwater Falls State Park Destination Page - Swarm Implementation Prompt

## Objective
Create `/destinations/blackwater-falls` page using hierarchical swarm coordination with WebSearch research, AgentDB pattern learning, and state park template implementation (waterfall + hiking + seasonal activities).

## Swarm Architecture

**Topology**: Hierarchical (1 queen → 3 scouts → 2 planners → 1 coder)

### Queen Agent (Coordinator)
**Role**: Orchestrate research → planning → implementation for WV's most-visited state park
**Responsibilities**:
- Initialize swarm memory namespace `swarm/blackwater-falls`
- Assign tasks to scouts (state park official info, waterfall/trails, seasonal activities/winter sports)
- Synthesize scout findings for planners
- Approve final implementation from coder
- Store success patterns in AgentDB

### Scout Agents (3 Parallel Researchers)

#### Scout 1: State Park Official Information
**Research targets**:
```bash
WebSearch("Blackwater Falls State Park official WV 2025")
WebSearch("Blackwater Falls State Park amenities camping lodge")
WebSearch("Blackwater Falls State Park fees hours regulations")
```

**AgentDB retrieval**:
```bash
npx agentdb@latest reflexion retrieve "state park official information amenities" --k 10 --synthesize-context
npx agentdb@latest skill search "WV state park lodging camping" 5
```

**Deliverables**:
- Official WV State Parks URLs
- Park amenities (lodge, cabins, campground, pool, nature center)
- Entry fees (day-use, camping)
- Operating hours (year-round)
- Regulations (pets, backcountry, fires)

#### Scout 2: Waterfall & Trail System
**Research targets**:
```bash
WebSearch("Blackwater Falls waterfall 62 feet amber water tannins")
WebSearch("Blackwater Falls hiking trails Elakala Falls Lindy Point")
WebSearch("Blackwater Falls accessible boardwalk overlook")
```

**AgentDB retrieval**:
```bash
npx agentdb@latest reflexion retrieve "waterfall destination trails viewpoints" --k 10 --filters '{"success":true}'
npx agentdb@latest recall with-certificate "family-friendly hiking" 12
```

**Deliverables**:
- Blackwater Falls details (62 ft drop, amber water from tannins, Blackwater River)
- Accessible boardwalk (short walk to overlook)
- Staircase to base (214 steps down, 376 steps total loop)
- Other waterfalls (Elakala Falls series, Pendleton Falls)
- Trail system (Lindy Point Trail 0.8 mi, Balanced Rock Trail, Canyon Rim Trail)

#### Scout 3: Seasonal Activities & Winter Sports
**Research targets**:
```bash
WebSearch("Blackwater Falls State Park cross-country skiing snowshoeing")
WebSearch("Blackwater Falls frozen waterfall winter photography")
WebSearch("Blackwater Falls fall foliage peak colors")
```

**AgentDB retrieval**:
```bash
npx agentdb@latest reflexion retrieve "seasonal state park activities" --k 10
npx agentdb@latest skill search "winter sports cross-country skiing" 5
```

**Deliverables**:
- Winter activities (cross-country skiing, snowshoeing, sled run)
- Frozen waterfall (winter highlight for photographers)
- Fall foliage (peak mid-October, high elevation early color)
- Summer activities (swimming pool, hiking, mountain biking)

### Planner Agents (2 Sequential Architects)

#### Planner 1: Content Architecture
**Input**: Synthesized scout findings from queen
**Template**: State park template (`docs/templates/destination-state-park.md`)

**AgentDB retrieval**:
```bash
npx agentdb@latest reflexion retrieve "state park waterfall template" --k 10 --synthesize-context
npx agentdb@latest reflexion retrieve "WVWO voice Kim authentic" --k 10 --only-successes
```

**Responsibilities**:
1. Map scout data to state park template sections
2. Design hero content (waterfall imagery, amber water highlight)
3. Plan seasonal content (winter frozen falls, fall foliage, summer hiking)
4. Structure trail/waterfall details (accessible + staircase options)
5. Voice design: Family-friendly, accessible for all ages

**Deliverables**:
- Content outline with state park template headers
- Hero messaging ("Blackwater Falls: West Virginia's Amber Cascade")
- Waterfall details (62 ft, tannin-amber water, accessible overlook)
- Seasonal highlights (frozen falls winter, foliage fall)
- Kim's voice snippets (family accessibility, winter beauty)
- Gear callout placements (hiking summer, cross-country skiing winter)

#### Planner 2: Technical Architecture
**Input**: Content architecture from Planner 1

**AgentDB retrieval**:
```bash
npx agentdb@latest reflexion retrieve "state park page seasonal content" --k 10 --filters '{"success":true}'
npx agentdb@latest skill search "waterfall photo gallery component" 5
```

**Responsibilities**:
1. Component selection (WaterfallDetails, TrailList, SeasonalActivities, PhotoGallery)
2. Data structure design (waterfall details, trails, amenities, seasonal activities)
3. Schema.org markup (StateOrProvincialPark + Waterfall types)
4. Drive time calculation (from 38.5858, -80.8581 to Blackwater Falls ~2.25 hours)
5. Responsive layout (mobile waterfall photos emphasis)
6. Image strategy (amber water closeups, frozen falls winter, foliage fall)

**Deliverables**:
- Component tree with seasonal categorization
- JSON data structure (waterfall, trails, amenities, activities)
- Schema markup template (dual types)
- Performance budget (high-res waterfall photos lazy load)

### Coder Agent (Implementation)
**Input**: Content + technical architecture from planners

**AgentDB retrieval**:
```bash
npx agentdb@latest reflexion retrieve "state park waterfall implementation" --k 15 --synthesize-context
npx agentdb@latest reflexion retrieve "WVWO aesthetic photo gallery" --k 10 --only-successes
```

**Responsibilities**:
1. Implement `/wv-wild-web/src/pages/destinations/blackwater-falls.astro`
2. Create WaterfallDetails component (62 ft drop, amber water explanation)
3. Apply WVWO aesthetic (earthy tones, sign-green for trails, brand-brown for falls)
4. Implement dual schema markup (StateOrProvincialPark + Waterfall)
5. Optimize images (amber water, frozen falls, foliage, WebP)
6. Add gear category links (hiking gear, cross-country skiing gear)

**Quality gates**:
- Pass WVWO aesthetic checklist
- Kim's voice authentic (family-friendly, accessible emphasis)
- Mobile-responsive (375px width)
- Schema.org dual-type validation
- Load time <2s on 3G

**Deliverables**:
- Complete `.astro` page file
- WaterfallDetails component
- SeasonalActivities component
- Image optimization report

## Data Requirements

### Geographic Data
**Shop coordinates**: `38.5858, -80.8581` (Birch River, WV)
**Destination coordinates**: `39.1151, -79.4876` (Blackwater Falls State Park, WV)
**Drive time**: ~2.25 hours via US-33 E
**Distance**: ~90 miles

### Waterfall Data
```typescript
interface Waterfall {
  name: string;
  height: number;
  river: string;
  uniqueFeature: string;
  accessibility: string;
  stairs: { down: number; totalLoop: number; };
}

const blackwaterFalls: Waterfall = {
  name: "Blackwater Falls",
  height: 62, // feet
  river: "Blackwater River",
  uniqueFeature: "Amber-colored water from tannic acid (hemlock/spruce needles)",
  accessibility: "Paved boardwalk to overlook (wheelchair accessible)",
  stairs: { down: 214, totalLoop: 376 }
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

const blackwaterTrails: Trail[] = [
  {
    name: "Gentle Trail (to overlook)",
    length: "0.25 mi",
    difficulty: "Easy (paved, accessible)",
    highlights: ["Blackwater Falls overlook", "Wheelchair accessible", "Family-friendly"]
  },
  {
    name: "Boardwalk to Falls Base",
    length: "0.5 mi loop",
    difficulty: "Moderate (214 stairs down, 376 total)",
    highlights: ["Base of falls", "Close-up view", "Mist in summer"]
  },
  {
    name: "Lindy Point Trail",
    length: "0.8 mi",
    difficulty: "Easy to Moderate",
    highlights: ["Sunrise viewpoint", "Blackwater Canyon overlook", "Photography hotspot"]
  },
  {
    name: "Elakala Falls Trail",
    length: "0.5 mi",
    difficulty: "Moderate to Difficult",
    highlights: ["Series of 4 waterfalls", "First falls easiest access", "Rocky terrain"]
  },
  {
    name: "Canyon Rim Trail",
    length: "1 mi",
    difficulty: "Easy",
    highlights: ["Blackwater Canyon views", "Relatively flat", "Scenic overlooks"]
  }
];
```

### Seasonal Activities Data
```typescript
interface Season {
  name: string;
  months: string;
  activities: string[];
  highlights: string;
  crowds: "light" | "moderate" | "heavy";
  wvwoGear: string[];
}

const blackwaterSeasons: Season[] = [
  {
    name: "Winter Wonderland",
    months: "Dec-Feb",
    activities: ["Frozen waterfall viewing", "Cross-country skiing", "Snowshoeing", "Sled run"],
    highlights: "Frozen falls are photographer's dream. High elevation = reliable snow.",
    crowds: "light",
    wvwoGear: ["cross-country-skis", "snowshoes", "winter-layers", "crampons"]
  },
  {
    name: "Spring Thaw",
    months: "Mar-May",
    activities: ["Waterfall viewing (high flow)", "Hiking", "Wildflowers"],
    highlights: "Falls at peak flow from snowmelt. Trails muddy but beautiful.",
    crowds: "moderate",
    wvwoGear: ["hiking-boots", "rain-gear", "trekking-poles"]
  },
  {
    name: "Summer Family Fun",
    months: "Jun-Aug",
    activities: ["Hiking", "Swimming pool", "Mountain biking", "Nature programs"],
    highlights: "Lodge pool open. Cooler temps (high elevation). Mist at falls base.",
    crowds: "heavy",
    wvwoGear: ["hiking-gear", "swimwear", "day-packs"]
  },
  {
    name: "Fall Foliage",
    months: "Sep-Nov",
    activities: ["Leaf peeping", "Hiking", "Photography", "Wildlife viewing"],
    highlights: "Peak foliage mid-October. High elevation = early color. Crowds for leaves.",
    crowds: "heavy",
    wvwoGear: ["hiking-gear", "layers", "camera-gear"]
  }
];
```

### Park Amenities Data
```typescript
const amenities = {
  lodging: [
    { type: "Blackwater Falls Lodge", capacity: "54 rooms", features: ["Restaurant", "Indoor pool", "Gift shop"] },
    { type: "Cabins", capacity: "25 cabins (sleep 4-8)", features: ["Full kitchens", "Fireplaces", "Porches"] }
  ],
  camping: { sites: 65, features: ["Electric hookups", "Bathhouse", "Dump station"] },
  other: ["Nature center", "Sled run", "Volleyball courts", "Playground", "Cross-country ski trails"]
};
```

### Gear Category Mappings
```typescript
const gearMappings = {
  summer: [
    { category: "hiking", products: ["hiking-boots", "day-pack", "trekking-poles", "water-filter"] },
    { category: "gear", products: ["camera-gear", "binoculars"] }
  ],
  winter: [
    { category: "winter-sports", products: ["cross-country-skis", "snowshoes", "ski-poles"] },
    { category: "winter-clothing", products: ["base-layers", "gloves", "balaclava", "crampons"] }
  ]
};
```

## Kim's Voice Guidelines for Blackwater Falls

**Tone**: Family-friendly, accessible for all ages, celebrating unique amber water.

**Approved phrases**:
```
"Blackwater Falls is WV's most-visited state park. The amber water is what makes it unique."
"The boardwalk to the overlook is paved and wheelchair accessible. Everyone can see the falls."
"If you're up for stairs (214 down, 376 total loop), the base view is worth it. Mist in summer, icicles in winter."
"Frozen falls in winter are stunning. Bring crampons for the stairs - they ice up."
"Fall foliage peaks mid-October. High elevation means early color and heavy crowds."
```

**Forbidden phrases**:
```
NEVER: "Ultimate family destination", "Nature's masterpiece", "Breathtaking experience", "Must-see wonder"
```

**Amber water explanation (educational, not flowery)**:
```
"The water's amber color comes from tannins - tannic acid from hemlock and red spruce needles.
It's not dirty, just tea-colored. Natural and beautiful."
```

## Content Blocks (State Park Template Sections)

### Hero Block
**Image**: Blackwater Falls (amber water cascading 62 ft)
**Headline**: "Blackwater Falls: West Virginia's Amber Cascade"
**Subhead**: "62-foot waterfall with tea-colored water. Accessible boardwalk + base trail. 2.25 hours from our shop."
**CTA**: "Shop Hiking Gear" (summer) / "Shop Winter Gear" (winter toggle)

### Waterfall Details Block
**Component**: `<WaterfallDetails waterfall={blackwaterFalls} />`
**Content**:
- 62 ft drop into Blackwater Canyon
- Amber water (tannic acid from hemlock/spruce needles)
- Accessible boardwalk (0.25 mi, paved, wheelchair accessible)
- Staircase option (214 steps down to base, 376 steps total loop)
**Kim's note**: *"The boardwalk is easy - anyone can see the falls. If you can handle stairs, the base view is worth it. Mist in summer, icicles in winter."*

### Trail System Block
**Component**: `<TrailList trails={blackwaterTrails} />`
**Content**: Gentle Trail (overlook), Boardwalk (falls base), Lindy Point (sunrise), Elakala Falls (series), Canyon Rim
**Kim's note**: *"Lindy Point for sunrise. Elakala Falls if you want a waterfall hike (4 falls in 0.5 mi). Canyon Rim for easy views."*

### Seasonal Highlights Block
**Component**: `<SeasonalActivities seasons={blackwaterSeasons} />`
**Content**:
- Winter: Frozen falls, cross-country skiing, snowshoeing
- Spring: High-flow falls, wildflowers
- Summer: Hiking, lodge pool, nature programs
- Fall: Peak foliage mid-October (heavy crowds)
**Kim's note**: *"Winter frozen falls are a photographer's dream. Fall foliage is peak mid-Oct - book lodging months ahead."*

### Winter Sports Block (Seasonal)
**Content**:
- Cross-country ski trails (groomed)
- Snowshoe trails
- Sled run (family-friendly)
- Frozen waterfall (ice climbing not permitted, viewing only)
**Gear callouts**: Cross-country skis, snowshoes, crampons (for stairs)
**Kim's note**: *"Bring crampons for the falls stairs in winter - they ice up fast. We stock microspikes and crampons."*

### Park Amenities Block
**Content**:
- Lodging: Blackwater Falls Lodge (54 rooms, restaurant, pool), Cabins (25 cabins)
- Camping: 65 sites with electric hookups
- Other: Nature center, playground, volleyball courts
**Kim's note**: *"Lodge is nice if you want a bed and restaurant. Cabins if you want a kitchen. Camping is cheap and solid."*

### Access & Logistics Block
**Content**:
- Drive time from WVWO shop: 2.25 hours via US-33 E
- Entry fees: Day-use free (WV residents), $3 (non-residents), Camping $20-30
- Lodging reservations: wvstateparks.com (book early for fall foliage)
- Cell service: Limited (Verizon works, others spotty)
**CTA**: "Stop by WVWO for gear - we're on your route"

### Local Knowledge Block
**Kim's voice**:
```
"Blackwater Falls is WV's most popular state park. The amber water is what makes it special -
tannic acid from hemlock and red spruce needles. It's not dirty, just tea-colored. Beautiful.

The falls are 62 feet tall. The paved boardwalk to the overlook is easy - wheelchair accessible,
0.25 miles. Anyone can do it. If you want to get to the base, that's 214 steps down and 376
steps total for the loop. Worth it for the close-up view, but your quads will feel it.

Winter is underrated. The falls freeze into icicle curtains - photographers love it. Cross-country
ski trails are groomed, and the sled run is fun for kids. Bring crampons for the falls stairs -
they ice up and it's sketchy without traction.

Fall foliage peaks mid-October. High elevation means early color, and the whole state shows up.
Book lodge or cabins months ahead if you're visiting for leaves.

Lindy Point Trail (0.8 mi) is the sunrise spot. Photographers camp out there in fall. Overlook
of Blackwater Canyon with fog in the valleys - stunning.

Elakala Falls is a bonus waterfall hike. Series of 4 falls in 0.5 miles. First one is easy access,
rest require scrambling. Rocky and steep - bring good boots.

Canyon Rim Trail is flat and easy - good for families or folks who don't want elevation gain.
Views of Blackwater Canyon the whole way.

Summer: Lodge pool is open (great for kids after hiking). Cooler temps than the rest of WV
(high elevation). Mist at the base of the falls feels good in July heat.

We stock hiking boots, trekking poles, day packs, cross-country skis, snowshoes, crampons.
Stop by on your way - we're 30 minutes south of the park. Grand love ya."
```

## Schema.org Markup (Dual Types)

```typescript
const blackwaterFallsSchema = {
  "@context": "https://schema.org",
  "@type": ["StateOrProvincialPark", "Waterfall"],
  "name": "Blackwater Falls State Park",
  "description": "West Virginia's most-visited state park featuring 62-foot Blackwater Falls with distinctive amber-colored water. Year-round activities: hiking, cross-country skiing, camping, lodging.",
  "image": "https://wvwildoutdoors.com/images/destinations/blackwater-falls-hero.jpg",
  "url": "https://wvwildoutdoors.com/destinations/blackwater-falls",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Davis",
    "addressRegion": "WV",
    "postalCode": "26260"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 39.1151,
    "longitude": -79.4876
  },
  "isAccessibleForFree": false,
  "publicAccess": true,
  "touristType": ["families", "hikers", "photographers", "cross-country skiers"]
};
```

## Swarm Coordination Hooks

### Pre-Task (All Agents)
```bash
npx claude-flow@alpha hooks pre-task --description "SPEC-35 Blackwater Falls: [agent-role] [task-name]"
npx claude-flow@alpha hooks session-restore --session-id "swarm-blackwater-falls"
```

### Scout Memory Storage
```bash
# Scout 1 stores state park official info
npx claude-flow@alpha hooks post-edit --memory-key "swarm/blackwater/scout1-park" --file "park-data.json"

# Scout 2 stores waterfall/trails
npx claude-flow@alpha hooks post-edit --memory-key "swarm/blackwater/scout2-falls-trails" --file "waterfall-trails.json"

# Scout 3 stores seasonal activities
npx claude-flow@alpha hooks post-edit --memory-key "swarm/blackwater/scout3-seasonal" --file "seasonal-activities.json"
```

### Queen Synthesis
```bash
npx claude-flow@alpha hooks session-restore --session-id "swarm-blackwater-falls"
```

### Planner Memory Storage
```bash
# Planner 1 stores content architecture
npx claude-flow@alpha hooks post-edit --memory-key "swarm/blackwater/plan-content" --file "waterfall-park-outline.md"

# Planner 2 stores technical architecture
npx claude-flow@alpha hooks post-edit --memory-key "swarm/blackwater/plan-technical" --file "seasonal-component-design.json"
```

### Coder Implementation
```bash
npx claude-flow@alpha hooks session-restore --session-id "swarm-blackwater-falls"
npx agentdb@latest reflexion store "wvwo-session" "blackwater-falls-page" 1.0 true "State park waterfall template with WaterfallDetails (62ft, amber water tannin explanation), TrailList (5 trails, accessible + staircase options), SeasonalActivities (frozen falls winter, foliage fall), dual schema types, Kim's family-friendly accessible voice, gear mappings (hiking/winter sports)"
```

### Post-Task (All Agents)
```bash
npx claude-flow@alpha hooks post-task --task-id "spec-35-blackwater-[agent-role]"
npx claude-flow@alpha hooks session-end --export-metrics true
```

## Success Criteria

### Content Quality
- [ ] Kim's voice authentic (family-friendly, accessible emphasis, amber water education)
- [ ] Zero AI slop ("nature's masterpiece", "breathtaking", etc.)
- [ ] Waterfall details accurate (62 ft, amber tannins, stairs count)
- [ ] Seasonal highlights clear (frozen falls winter, foliage fall)
- [ ] Gear recommendations match WVWO inventory (hiking/winter sports)

### Technical Quality
- [ ] Passes WVWO aesthetic checklist
- [ ] Mobile-responsive (375px width)
- [ ] Schema.org dual-type validation (StateOrProvincialPark + Waterfall)
- [ ] Drive time accurate (2.25 hours from shop)
- [ ] Images optimized (amber water, frozen falls, foliage, WebP, <200KB each)
- [ ] Load time <2s on 3G

### Swarm Coordination
- [ ] All scouts completed research in parallel
- [ ] Queen successfully synthesized findings
- [ ] Planners built on scout data
- [ ] Coder implemented waterfall + seasonal components
- [ ] Success pattern stored in AgentDB

## Implementation Order

1. **Queen**: Initialize swarm, assign scout tasks (single message with 3 Task calls)
2. **Scouts 1-3**: Execute research in parallel (WebSearch + AgentDB retrieval)
3. **Queen**: Retrieve scout findings, synthesize for planners
4. **Planner 1**: Design state park content architecture (waterfall focus)
5. **Planner 2**: Design technical architecture (WaterfallDetails, SeasonalActivities)
6. **Coder**: Implement page with components (read both planner outputs)
7. **Queen**: Review implementation, store success pattern

**Total messages**: ~8-10

## AgentDB Pattern Storage

After successful implementation:
```bash
npx agentdb@latest reflexion store "wvwo-session" "blackwater-falls-state-park" 1.0 true "State park waterfall template with hierarchical swarm. WaterfallDetails component (62ft drop, amber water tannin science), TrailList (5 trails including accessible boardwalk and 214-step base option), SeasonalActivities (winter frozen falls + cross-country skiing, fall foliage peak mid-Oct). Kim's family-friendly accessible voice, educational amber water explanation. Dual schema.org types (StateOrProvincialPark + Waterfall). Amenities (lodge/cabins/camping). 2.25hr drive from shop. Gear mappings (hiking summer, winter sports winter)."
```

**Reusable for**: Other state park waterfall destinations (Cathedral Falls, Hawks Nest), accessible family parks with seasonal highlights
