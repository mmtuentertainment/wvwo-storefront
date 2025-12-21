# SPEC-40: Dolly Sods Wilderness Destination Page - Swarm Implementation Prompt

## Objective

Create `/destinations/dolly-sods` page using hierarchical swarm coordination with WebSearch research, AgentDB pattern learning, and backcountry template implementation (designated wilderness, alpine plateau, backcountry camping/hiking).

## Swarm Architecture

**Topology**: Hierarchical (1 queen → 3 scouts → 2 planners → 1 coder)

### Queen Agent (Coordinator)

**Role**: Orchestrate research → planning → implementation for WV's premier wilderness backcountry destination
**Responsibilities**:

- Initialize swarm memory namespace `swarm/dolly-sods`
- Assign tasks to scouts (NFS wilderness official, unique ecosystem/plateau, trail system/backcountry camping)
- Synthesize scout findings for planners
- Approve final implementation from coder
- Store success patterns in AgentDB

### Scout Agents (3 Parallel Researchers)

#### Scout 1: Wilderness Official Information

**Research targets**:

```bash
WebSearch("Dolly Sods Wilderness National Forest Service 2025")
WebSearch("Dolly Sods Wilderness permits regulations Monongahela")
WebSearch("Dolly Sods designated wilderness rules Leave No Trace")

```

**AgentDB retrieval**:

```bash
npx agentdb@latest reflexion retrieve "designated wilderness NFS regulations" --k 10 --synthesize-context
npx agentdb@latest skill search "wilderness permit backcountry rules" 5

```

**Deliverables**:

- Official NFS URLs (Monongahela National Forest, Dolly Sods Wilderness)
- Wilderness designation (federally protected, no motorized vehicles/bikes)
- Permits/fees (free access, no permits required for day use or camping)
- Regulations (Leave No Trace, no fires in some areas, pack it in/pack it out)
- Access roads (gravel Forest Service roads, 4WD recommended)

#### Scout 2: Unique Ecosystem & Plateau Landscape

**Research targets**:

```bash
WebSearch("Dolly Sods alpine plateau ecosystem unique plants")
WebSearch("Dolly Sods boulder fields red spruce bogs")
WebSearch("Dolly Sods autumn foliage blueberries huckleberries")

```

**AgentDB retrieval**:

```bash
npx agentdb@latest reflexion retrieve "unique ecosystem alpine plateau" --k 10 --filters '{"success":true}'
npx agentdb@latest recall with-certificate "wilderness landscape content" 12

```

**Deliverables**:

- High-elevation plateau (4,000 ft average, feels like Canada)
- Unique ecosystem (alpine meadows, red spruce bogs, boulder fields)
- Rare plants (alpine species, northern latitude plants at southern range)
- Seasonal highlights (blueberry/huckleberry picking summer, foliage fall, wildflowers spring)
- Weather extremes (cold, windy, fog, rapid changes)

#### Scout 3: Trail System & Backcountry Camping

**Research targets**:

```bash
WebSearch("Dolly Sods hiking trails Bear Rocks Red Creek")
WebSearch("Dolly Sods backcountry camping dispersed sites")
WebSearch("Dolly Sods trail navigation cairns fog conditions")

```

**AgentDB retrieval**:

```bash
npx agentdb@latest reflexion retrieve "wilderness backcountry camping trails" --k 10
npx agentdb@latest skill search "navigation cairns fog wilderness" 5

```

**Deliverables**:

- Trail system (extensive network, loops, point-to-point)
- Popular trails (Bear Rocks Trail, Red Creek Trail, Dobbin Grade)
- Navigation challenges (cairns, fog common, map/compass essential)
- Dispersed backcountry camping (no designated sites, Leave No Trace)
- Water sources (Red Creek, tributaries, filter required)
- Access trailheads (Bear Rocks, Red Creek, Dobbin Grade, others)

### Planner Agents (2 Sequential Architects)

#### Planner 1: Content Architecture

**Input**: Synthesized scout findings from queen
**Template**: Backcountry template (`docs/templates/destination-backcountry.md`)

**AgentDB retrieval**:

```bash
npx agentdb@latest reflexion retrieve "wilderness backcountry template" --k 10 --synthesize-context
npx agentdb@latest reflexion retrieve "WVWO voice Kim authentic" --k 10 --only-successes
npx agentdb@latest reflexion retrieve "Leave No Trace wilderness ethics" --k 10

```

**Responsibilities**:

1. Map scout data to backcountry template sections
2. Design hero content (alpine plateau, boulder fields, dramatic landscape)
3. Plan unique ecosystem messaging (alpine meadows, bogs, rare plants)
4. Structure trail/navigation content (cairns, fog, map/compass essential)
5. Voice design: Respectful of wilderness, navigation realism, Leave No Trace emphasis

**Deliverables**:

- Content outline with backcountry template headers
- Hero messaging ("Dolly Sods: West Virginia's Alpine Wilderness")
- Ecosystem highlights (plateau, boulder fields, bogs, seasonal berries)
- Trail/navigation content (cairns, fog, map/compass essential)
- Kim's voice snippets (wilderness respect, navigation prep, Leave No Trace)
- Gear callout placements (navigation, layers, backpacking, water filter)

#### Planner 2: Technical Architecture

**Input**: Content architecture from Planner 1

**AgentDB retrieval**:

```bash
npx agentdb@latest reflexion retrieve "wilderness backcountry page complex" --k 10 --filters '{"success":true}'
npx agentdb@latest skill search "navigation warning component" 5

```

**Responsibilities**:

1. Component selection (WildernessDetails, EcosystemHighlights, NavigationWarning, TrailList, LNTGuidelines)
2. Data structure design (wilderness rules, ecosystem, trails, navigation, LNT)
3. Schema.org markup (TouristAttraction + NaturalFeature types)
4. Drive time calculation (from 38.5858, -80.8581 to Dolly Sods ~3 hours)
5. Responsive layout (mobile plateau/boulder field photos)
6. Image strategy (alpine meadows, boulder fields, red spruce, fog)

**Deliverables**:

- Component tree with wilderness/navigation emphasis
- JSON data structure (wilderness, ecosystem, trails, navigation, LNT)
- Schema markup template (TouristAttraction + NaturalFeature)
- Performance budget (landscape photos lazy load)

### Coder Agent (Implementation)

**Input**: Content + technical architecture from planners

**AgentDB retrieval**:

```bash
npx agentdb@latest reflexion retrieve "wilderness backcountry implementation" --k 15 --synthesize-context
npx agentdb@latest reflexion retrieve "WVWO aesthetic wilderness landscape" --k 10 --only-successes

```

**Responsibilities**:

1. Implement `/wv-wild-web/src/pages/destinations/dolly-sods.astro`
2. Create WildernessDetails component (designation, regulations, access)
3. Create EcosystemHighlights component (plateau, bogs, boulder fields, seasonal)
4. Create NavigationWarning component (cairns, fog, map/compass essential)
5. Create LNTGuidelines component (pack it in/out, no fires, dispersed camping)
6. Apply WVWO aesthetic (alpine palette, sign-green for meadows, brand-brown for wilderness)
7. Implement dual schema markup (TouristAttraction + NaturalFeature)
8. Optimize images (plateau, boulder fields, bogs, fog, WebP)
9. Add gear category links (navigation, layers, backpacking, water filter)

**Quality gates**:

- Pass WVWO aesthetic checklist
- Kim's voice authentic (wilderness respect, navigation realism, LNT emphasis)
- Mobile-responsive (375px width)
- Schema.org dual-type validation
- Load time <2.5s on 3G (complex wilderness page tolerance)

**Deliverables**:

- Complete `.astro` page file
- WildernessDetails component
- EcosystemHighlights component
- NavigationWarning component (prominent)
- LNTGuidelines component
- Image optimization report

## Data Requirements

### Geographic Data

**Shop coordinates**: `38.5858, -80.8581` (Birch River, WV)
**Destination coordinates**: `39.1100, -79.3300` (Dolly Sods Wilderness, WV)
**Elevation**: ~4,000 ft average (plateau)
**Drive time**: ~3 hours via US-33 E + Forest Service roads
**Distance**: ~105 miles

### Wilderness Designation Data

```typescript
interface Wilderness {
  name: string;
  designation: string;
  established: number;
  acres: number;
  managedBy: string;
  regulations: string[];
}

const dollySodsWilderness: Wilderness = {
  name: "Dolly Sods Wilderness",
  designation: "Federal Wilderness Area",
  established: 1975,
  acres: 10215,
  managedBy: "Monongahela National Forest (USDA Forest Service)",
  regulations: [
    "No motorized vehicles or mountain bikes",
    "Leave No Trace principles mandatory",
    "Pack it in, pack it out (no trash facilities)",
    "No fires in some areas (check current regulations)",
    "Dispersed camping only (no designated sites)",
    "No permits required for day use or camping"
  ]
};

```

### Ecosystem Data

```typescript
interface Ecosystem {
  type: string;
  elevation: number;
  features: string[];
  uniquePlants: string[];
  seasonalHighlights: { season: string; highlights: string[]; }[];
}

const dollySodsEcosystem: Ecosystem = {
  type: "High-elevation alpine plateau",
  elevation: 4000, // average
  features: [
    "Alpine meadows (rare in WV)",
    "Red spruce bogs",
    "Boulder fields (ancient periglacial features)",
    "Open grasslands",
    "Sphagnum moss bogs"
  ],
  uniquePlants: [
    "Northern latitude plants at southern range",
    "Alpine species typically found in Canada/New England",
    "Blueberries and huckleberries (summer)",
    "Wildflowers (spring)",
    "Red spruce (high-elevation conifer)"
  ],
  seasonalHighlights: [
    {
      season: "Spring (Apr-May)",
      highlights: ["Wildflowers", "Bogs awakening", "Snow lingering", "Mud season"]
    },
    {
      season: "Summer (Jun-Aug)",
      highlights: ["Blueberry/huckleberry picking", "Alpine meadows", "Cooler temps", "Thunderstorms"]
    },
    {
      season: "Fall (Sep-Nov)",
      highlights: ["Peak foliage (early Oct)", "Blueberry bushes turn red", "Crisp weather", "Crowds for leaves"]
    },
    {
      season: "Winter (Dec-Mar)",
      highlights: ["Snow-covered plateau", "Extreme cold", "Ice formations", "Expert-only (navigation hard)"]
    }
  ]
};

```

### Trail System Data

```typescript
interface Trail {
  name: string;
  length: string;
  difficulty: string;
  highlights: string[];
  navigationNotes: string;
}

const dollySodsTrails: Trail[] = [
  {
    name: "Bear Rocks Trail",
    length: "3 mi out-and-back",
    difficulty: "Easy to Moderate",
    highlights: ["Boulder fields", "Scenic overlook", "Popular day hike", "Accessible from Bear Rocks trailhead"],
    navigationNotes: "Well-cairned, but fog can disorient. Bring map."
  },
  {
    name: "Red Creek Trail",
    length: "Varies (part of longer loops)",
    difficulty: "Moderate",
    highlights: ["Red Creek canyon", "Water source", "Backcountry access", "Wildflowers"],
    navigationNotes: "Follow creek, cairns in open areas. Compass recommended."
  },
  {
    name: "Dobbin Grade Trail",
    length: "~5 mi (one-way to Red Creek)",
    difficulty: "Moderate",
    highlights: ["Plateau traverse", "Alpine meadows", "Boulder fields", "Loop options"],
    navigationNotes: "Cairns only in open areas. Map and compass essential."
  },
  {
    name: "Breathed Mountain Loop",
    length: "~12 mi loop",
    difficulty: "Difficult (backcountry)",
    highlights: ["Multi-day loop", "Backcountry camping", "Red spruce forest", "Solitude"],
    navigationNotes: "Advanced navigation required. Cairns sparse, fog common."
  }
];

```

### Navigation Challenges Data

```typescript
const navigationChallenges = {
  fog: "Fog is common year-round. Visibility can drop to <50 ft. Cairns disappear.",
  cairns: "Trails marked by rock cairns (rock piles) in open areas. Not always obvious.",
  maps: "USGS topo map (Blackbird Knob quad) and compass ESSENTIAL. GPS helpful but bring batteries.",
  weather: "Rapid weather changes. Blue sky to fog/rain in 20 minutes.",
  winter: "Snow covers cairns and trails. Expert-only navigation in winter."
};

```

### Backcountry Camping Data

```typescript
const backcountryCamping = {
  type: "Dispersed (no designated sites)",
  regulations: [
    "Camp at least 200 ft from water sources",
    "Leave No Trace (pack out all trash)",
    "No fires in some areas (check current rules, use camp stove)",
    "No permits required"
  ],
  waterSources: ["Red Creek (filter required)", "Tributaries (seasonal, filter required)"],
  gearEssentials: ["Backpack", "Tent", "Sleeping bag (cold nights)", "Camp stove (no fires)", "Water filter", "Map/compass", "Layers (cold/windy)"]
};

```

### Gear Category Mappings

```typescript
const gearMappings = {
  navigation: [
    { category: "navigation", products: ["topo-map", "compass", "gps", "headlamp"] }
  ],
  backpacking: [
    { category: "backpacking", products: ["backpack-multiday", "tent", "sleeping-bag-cold", "camp-stove", "water-filter"] }
  ],
  layers: [
    { category: "clothing", products: ["base-layers", "insulated-jacket", "rain-shell", "warm-hat", "gloves"] }
  ]
};

```

## Kim's Voice Guidelines for Dolly Sods

**Tone**: Wilderness respect, navigation realism, Leave No Trace emphasis, honest about challenges.

**Approved phrases**:

```
"Dolly Sods is West Virginia's wildest wilderness. High-elevation plateau that feels like Canada."
"Navigation is serious here. Cairns, fog, and open meadows - bring map, compass, and know how to use them."
"Leave No Trace isn't optional. Pack it in, pack it out. No trash cans, no trail signs, no fires in some areas."
"Fall foliage is stunning, but crowds get heavy. Go midweek if you can."
"Blueberry picking in summer is a highlight. Bring containers and pick responsibly."

```

**Forbidden phrases**:

```
NEVER: "Conquer the wilderness", "Ultimate backcountry challenge", "Untouched paradise", "Nature's hidden gem"

```

**Navigation emphasis**:

```
"Fog is common. Cairns disappear in <50 ft visibility. If you can't navigate by map and compass, stay on Bear Rocks Trail or hire a guide."
"Winter Dolly Sods is expert-only. Snow covers cairns, trails vanish. Don't go unless you're experienced in winter navigation."

```

**Leave No Trace**:

```
"This is designated wilderness. Pack out your trash. All of it. Camp 200+ feet from water. Use a camp stove (fires banned in some areas). Leave it better than you found it."

```

## Content Blocks (Backcountry Template Sections)

### Hero Block

**Image**: Alpine plateau, boulder fields, or red spruce bog
**Headline**: "Dolly Sods: West Virginia's Alpine Wilderness"
**Subhead**: "10,215-acre federally designated wilderness. Alpine plateau, boulder fields, backcountry camping. 3 hours from our shop."
**CTA**: "Shop Backpacking & Navigation Gear"

### Wilderness Overview Block

**Component**: `<WildernessDetails wilderness={dollySodsWilderness} />`
**Content**:

- Designated Wilderness (1975, federally protected)
- 10,215 acres, Monongahela National Forest
- No motorized vehicles or bikes
- Leave No Trace mandatory
- No permits required (free access)
- Dispersed camping only
**Kim's note**: *"Dolly Sods is designated wilderness - federally protected. No motors, no bikes, pack it in/pack it out."*

### Unique Ecosystem Block

**Component**: `<EcosystemHighlights ecosystem={dollySodsEcosystem} />`
**Content**:

- High-elevation plateau (~4,000 ft)
- Alpine meadows, red spruce bogs, boulder fields
- Unique northern plants (rare in WV, typically found in Canada/New England)
- Seasonal highlights (blueberries summer, foliage fall, wildflowers spring)
**Kim's note**: *"Dolly Sods feels like Canada - high-elevation plateau with alpine meadows and boulder fields. Unique ecosystem for WV."*

### Navigation Warning Block (Prominent)

**Component**: `<NavigationWarning challenges={navigationChallenges} />`
**Content**:

- Cairns only (rock piles mark trails in open areas)
- Fog common (visibility <50 ft, cairns disappear)
- Map and compass ESSENTIAL (USGS Blackbird Knob quad)
- GPS helpful (bring extra batteries)
- Winter expert-only (snow covers cairns/trails)
**What to bring**: USGS topo map, compass, GPS (backup), headlamp
**Kim's note**: *"Navigation is serious. Fog is common, cairns vanish, trails aren't obvious. Bring map and compass. Know how to use them."*

### Trail System Block

**Component**: `<TrailList trails={dollySodsTrails} />`
**Content**: Bear Rocks (easy day hike, boulder fields), Red Creek (water access), Dobbin Grade (plateau traverse), Breathed Mountain Loop (multi-day backcountry)
**Kim's note**: *"Bear Rocks is the easiest - still requires map, but well-cairned. Breathed Mountain Loop is backcountry - advanced navigation only."*

### Backcountry Camping Block

**Component**: `<LNTGuidelines camping={backcountryCamping} />`
**Content**:

- Dispersed camping (no designated sites)
- Camp 200+ ft from water
- Pack it in, pack it out (no trash facilities)
- No fires in some areas (use camp stove)
- Water: Red Creek + tributaries (filter required)
**Gear essentials**: Backpack, tent, sleeping bag (cold nights), camp stove, water filter, map/compass
**Kim's note**: *"Dispersed camping - pick a spot, set up, leave no trace. Camp stove, not fires. Pack out ALL trash."*

### Seasonal Highlights Block

**Content**:

- Spring: Wildflowers, mud season, snow lingering
- Summer: Blueberry/huckleberry picking, alpine meadows, thunderstorms
- Fall: Peak foliage early Oct, blueberry bushes red, crowds
- Winter: Snow-covered plateau, extreme cold, expert-only
**Kim's note**: *"Fall foliage is stunning - blueberry bushes turn crimson, meadows golden. Peak early Oct. Crowds get heavy - go midweek."*

### Access & Logistics Block

**Content**:

- Drive time from WVWO shop: 3 hours via US-33 E + Forest Service roads
- Access roads: Gravel Forest Service roads (4WD recommended, passable for careful 2WD in dry conditions)
- Trailheads: Bear Rocks, Red Creek, Dobbin Grade (multiple access points)
- Cell service: None (plan accordingly)
- Fees: Free (no permits required)
**CTA**: "Stock up on navigation gear, backpacking essentials, and layers before you drive east"

### Local Knowledge Block

**Kim's voice**:

```
"Dolly Sods is West Virginia's wildest wilderness. 10,215 acres of high-elevation plateau
that feels more like Canada than WV. Alpine meadows, red spruce bogs, boulder fields -
unique ecosystem you won't find elsewhere in the state.

It's federally designated wilderness. No motorized vehicles, no mountain bikes, no trail
signs, no trash cans. You're on your own out there. Pack it in, pack it out.

Navigation is the biggest challenge. Trails are marked by cairns - rock piles - in open
areas. But fog is common, and when visibility drops to 50 feet, cairns disappear. Bring
a USGS topo map (Blackbird Knob quad), compass, and know how to use them. GPS helps, but
batteries die. Paper map and compass don't.

Bear Rocks Trail is the easiest - 3 miles out-and-back to boulder fields and a scenic
overlook. Well-cairned, but still bring a map. Fog can disorient you even on short trails.

Breathed Mountain Loop is the backcountry classic - 12-mile loop with dispersed camping.
Advanced navigation required. Cairns are sparse, fog is common, and you'll be relying on
map and compass the whole time.

Backcountry camping is dispersed - no designated sites. Pick a spot at least 200 feet from
water, set up your tent, use a camp stove (fires banned in some areas), and leave no trace.
Pack out ALL your trash. This is wilderness - treat it with respect.

Water sources are Red Creek and tributaries. Filter all water - giardia and bacteria are real.

Summer blueberry and huckleberry picking is a highlight. Berries are everywhere in July/August.
Bring containers, pick responsibly, and leave plenty for wildlife.

Fall foliage peaks early October. Blueberry bushes turn crimson, meadows go golden, red spruce
stays green - it's stunning. But crowds get heavy on fall weekends. Go midweek if you can.

Winter Dolly Sods is expert-only. Snow covers cairns and trails, temperatures drop below zero,
wind is brutal. Don't go unless you're experienced in winter backcountry navigation.

Weather changes fast year-round. Blue sky to fog and rain in 20 minutes. Bring layers, rain gear,
warm hat, gloves - even in summer. High elevation means cold temps and wind.

We stock backpacking gear - packs, tents, sleeping bags, camp stoves, water filters. Navigation
gear - topo maps, compasses, GPS units. Layers and rain gear. Stop by before you head to Dolly
Sods - it's serious backcountry, and you need to be prepared. Grand love ya."

```

## Schema.org Markup (Dual Types)

```typescript
const dollySodsSchema = {
  "@context": "https://schema.org",
  "@type": ["TouristAttraction", "NaturalFeature"],
  "name": "Dolly Sods Wilderness",
  "description": "Federally designated wilderness area (10,215 acres) in Monongahela National Forest. High-elevation alpine plateau with unique ecosystem: boulder fields, red spruce bogs, alpine meadows. Backcountry hiking and dispersed camping.",
  "image": "https://wvwildoutdoors.com/images/destinations/dolly-sods-hero.jpg",
  "url": "https://wvwildoutdoors.com/destinations/dolly-sods",
  "address": {
    "@type": "PostalAddress",
    "addressRegion": "WV"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 39.1100,
    "longitude": -79.3300,
    "elevation": 4000
  },
  "isAccessibleForFree": true,
  "publicAccess": true,
  "touristType": ["backcountry hikers", "wilderness campers", "photographers", "experienced navigators"]
};

```

## Swarm Coordination Hooks

### Pre-Task (All Agents)

```bash
npx claude-flow@alpha hooks pre-task --description "SPEC-40 Dolly Sods: [agent-role] [task-name]"
npx claude-flow@alpha hooks session-restore --session-id "swarm-dolly-sods"

```

### Scout Memory Storage

```bash
# Scout 1 stores wilderness official info
npx claude-flow@alpha hooks post-edit --memory-key "swarm/dolly-sods/scout1-wilderness" --file "wilderness-data.json"

# Scout 2 stores ecosystem
npx claude-flow@alpha hooks post-edit --memory-key "swarm/dolly-sods/scout2-ecosystem" --file "plateau-ecosystem.json"

# Scout 3 stores trails/camping
npx claude-flow@alpha hooks post-edit --memory-key "swarm/dolly-sods/scout3-trails" --file "trails-camping.json"

```

### Queen Synthesis

```bash
npx claude-flow@alpha hooks session-restore --session-id "swarm-dolly-sods"

```

### Planner Memory Storage

```bash
# Planner 1 stores content architecture
npx claude-flow@alpha hooks post-edit --memory-key "swarm/dolly-sods/plan-content" --file "wilderness-content-outline.md"

# Planner 2 stores technical architecture
npx claude-flow@alpha hooks post-edit --memory-key "swarm/dolly-sods/plan-technical" --file "wilderness-component-design.json"

```

### Coder Implementation

```bash
npx claude-flow@alpha hooks session-restore --session-id "swarm-dolly-sods"
npx agentdb@latest reflexion store "wvwo-session" "dolly-sods-page" 1.0 true "Wilderness backcountry template with WildernessDetails (10,215 acres designated 1975), EcosystemHighlights (alpine plateau, bogs, boulder fields, seasonal berries/foliage), NavigationWarning PROMINENT (cairns, fog, map/compass essential), TrailList (Bear Rocks easy, Breathed Mountain advanced), LNTGuidelines (dispersed camping, pack it out), Kim's wilderness-respect navigation-realism voice, dual schema types, gear mappings (navigation/backpacking/layers)"

```

### Post-Task (All Agents)

```bash
npx claude-flow@alpha hooks post-task --task-id "spec-40-dolly-sods-[agent-role]"
npx claude-flow@alpha hooks session-end --export-metrics true

```

## Success Criteria

### Content Quality

- [ ] Kim's voice authentic (wilderness respect, navigation realism, Leave No Trace emphasis)
- [ ] Zero AI slop ("conquer wilderness", "untouched paradise", etc.)
- [ ] Wilderness regulations clear (designated, no motors, pack it out)
- [ ] Ecosystem details accurate (alpine plateau, bogs, boulder fields, unique plants)
- [ ] Navigation warning prominent (cairns, fog, map/compass essential)
- [ ] Leave No Trace emphasized (dispersed camping, no fires, pack out trash)
- [ ] Gear recommendations match WVWO inventory (navigation, backpacking, layers)

### Technical Quality

- [ ] Passes WVWO aesthetic checklist
- [ ] Mobile-responsive (375px width)
- [ ] Schema.org dual-type validation (TouristAttraction + NaturalFeature)
- [ ] Drive time accurate (3 hours from shop)
- [ ] Images optimized (plateau, boulder fields, bogs, WebP, <200KB each)
- [ ] Load time <2.5s on 3G (complex wilderness page tolerance)

### Swarm Coordination

- [ ] All scouts completed research in parallel
- [ ] Queen successfully synthesized findings
- [ ] Planners built on scout data
- [ ] Coder implemented wilderness + navigation + LNT components
- [ ] Success pattern stored in AgentDB

## Implementation Order

1. **Queen**: Initialize swarm, assign scout tasks (single message with 3 Task calls)
2. **Scouts 1-3**: Execute research in parallel (WebSearch + AgentDB retrieval)
3. **Queen**: Retrieve scout findings, synthesize for planners
4. **Planner 1**: Design wilderness content architecture (ecosystem, navigation, LNT emphasis)
5. **Planner 2**: Design technical architecture (WildernessDetails, EcosystemHighlights, NavigationWarning, LNTGuidelines components)
6. **Coder**: Implement page with all components (read both planner outputs)
7. **Queen**: Review implementation, store success pattern

**Total messages**: ~8-10

## AgentDB Pattern Storage

After successful implementation:

```bash
npx agentdb@latest reflexion store "wvwo-session" "dolly-sods-wilderness-backcountry" 1.0 true "Wilderness backcountry template with hierarchical swarm. WildernessDetails component (10,215 acres designated 1975, no motors/bikes, free access), EcosystemHighlights (4,000ft alpine plateau, boulder fields, red spruce bogs, northern plants rare in WV, seasonal blueberries/foliage/wildflowers), NavigationWarning PROMINENT (cairns only, fog common <50ft visibility, map/compass ESSENTIAL, winter expert-only), TrailList (Bear Rocks easy 3mi, Red Creek moderate, Breathed Mountain 12mi advanced), LNTGuidelines (dispersed camping 200ft+ from water, pack it in/out, camp stove not fires). Kim's wilderness-respect navigation-realism Leave-No-Trace voice. Dual schema.org types (TouristAttraction + NaturalFeature). Backcountry gear mappings (navigation/backpacking/layers/water-filter). 3hr drive from shop. Complex wilderness page (5 major components)."

```

**Reusable for**: Other wilderness areas, backcountry destinations requiring navigation skills, alpine/plateau ecosystems, Leave No Trace emphasis destinations

---

## Summary: 12 Priority-1 Destination Prompts Complete

All 12 SPEC-29 through SPEC-40 destination prompts have been created with:

✅ **Hierarchical swarm architecture** (queen → scouts → planners → coder)
✅ **WebSearch integration** for official information
✅ **AgentDB pattern learning** and retrieval
✅ **Template matching** (river, hybrid, ski, state park, cave, backcountry)
✅ **Drive time calculations** from WVWO shop (38.5858, -80.8581)
✅ **Kim's voice guidelines** customized per destination
✅ **Gear category mappings** to WVWO products
✅ **Schema.org markup** for SEO
✅ **Swarm coordination hooks** for memory/session management
✅ **Success criteria** and implementation orders

**Prompts created**:

1. SPEC-29: Gauley River (river, Class V whitewater)
2. SPEC-30: New River Gorge (hybrid multi-activity, 4 scouts)
3. SPEC-31: Snowshoe Mountain (ski resort, seasonal toggle)
4. SPEC-32: Canaan Valley (hybrid ski + state park)
5. SPEC-33: ACE Adventure Resort (commercial resort, disclaimer emphasis)
6. SPEC-34: Seneca Rocks (backcountry climbing, trad routes)
7. SPEC-35: Blackwater Falls (state park waterfall, seasonal)
8. SPEC-36: Seneca Caverns (cave, tour logistics)
9. SPEC-37: Smoke Hole Caverns (cave, SPEC-36 template reuse)
10. SPEC-38: Hawks Nest (state park, aerial tramway unique)
11. SPEC-39: Spruce Knob (backcountry summit, highest point, weather warning)
12. SPEC-40: Dolly Sods (wilderness, navigation warning, Leave No Trace)

Each prompt is ready for hierarchical swarm execution with 8-12 message efficiency.
