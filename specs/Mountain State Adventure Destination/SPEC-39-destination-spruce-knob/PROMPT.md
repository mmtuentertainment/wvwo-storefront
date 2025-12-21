# SPEC-39: Spruce Knob Destination Page - Swarm Implementation Prompt

## Objective
Create `/destinations/spruce-knob` page using hierarchical swarm coordination with WebSearch research, AgentDB pattern learning, and backcountry template implementation (highest point in WV, observation tower, backcountry hiking).

## Swarm Architecture

**Topology**: Hierarchical (1 queen → 3 scouts → 2 planners → 1 coder)

### Queen Agent (Coordinator)
**Role**: Orchestrate research → planning → implementation for WV's highest point + backcountry destination
**Responsibilities**:
- Initialize swarm memory namespace `swarm/spruce-knob`
- Assign tasks to scouts (NFS official info, observation tower/summit, trail system/backcountry)
- Synthesize scout findings for planners
- Approve final implementation from coder
- Store success patterns in AgentDB

### Scout Agents (3 Parallel Researchers)

#### Scout 1: National Forest Official Information
**Research targets**:

```bash
WebSearch("Spruce Knob National Forest Service WV 2025")
WebSearch("Spruce Knob highest point West Virginia elevation")
WebSearch("Spruce Knob permits fees Monongahela National Forest")

```

**AgentDB retrieval**:

```bash
npx agentdb@latest reflexion retrieve "national forest backcountry NFS official" --k 10 --synthesize-context
npx agentdb@latest skill search "highest point summit destination" 5

```

**Deliverables**:
- Official NFS URLs (fs.usda.gov, Monongahela National Forest)
- Elevation (4,863 ft - highest point in WV)
- Permits/fees (free access, backcountry camping dispersed)
- Regulations (Leave No Trace, fire restrictions, weather awareness)
- Access road (paved to parking, gravel final section)

#### Scout 2: Observation Tower & Summit Experience
**Research targets**:

```bash
WebSearch("Spruce Knob observation tower views 360 degree")
WebSearch("Spruce Knob summit weather conditions wind cold")
WebSearch("Spruce Knob summit trail wheelchair accessible")

```

**AgentDB retrieval**:

```bash
npx agentdb@latest reflexion retrieve "observation tower summit experience" --k 10 --filters '{"success":true}'
npx agentdb@latest recall with-certificate "alpine summit conditions" 12

```

**Deliverables**:
- Observation tower (stone tower, 360° views)
- Summit trail (0.5 mi paved, wheelchair accessible to tower base)
- Views (on clear days: Shenandoah Valley, Allegheny Mountains)
- Weather conditions (windy, cold year-round, rapid changes)
- Summit vegetation (red spruce, alpine tundra-like conditions)

#### Scout 3: Trail System & Backcountry
**Research targets**:

```bash
WebSearch("Spruce Knob hiking trails Huckleberry Trail Seneca Creek")
WebSearch("Spruce Knob backcountry camping dispersed sites")
WebSearch("Spruce Knob Lake trail loop")

```

**AgentDB retrieval**:

```bash
npx agentdb@latest reflexion retrieve "backcountry trail system dispersed camping" --k 10
npx agentdb@latest skill search "alpine hiking high-elevation trails" 5

```

**Deliverables**:
- Summit loop trail (0.5 mi paved)
- Huckleberry Trail (longer backcountry option)
- Spruce Knob Lake (nearby, short trail around lake)
- Seneca Creek Trail (backcountry access from Spruce Knob area)
- Dispersed backcountry camping (no facilities, Leave No Trace)

### Planner Agents (2 Sequential Architects)

#### Planner 1: Content Architecture
**Input**: Synthesized scout findings from queen
**Template**: Backcountry template (`docs/templates/destination-backcountry.md`)

**AgentDB retrieval**:

```bash
npx agentdb@latest reflexion retrieve "backcountry summit template" --k 10 --synthesize-context
npx agentdb@latest reflexion retrieve "WVWO voice Kim authentic" --k 10 --only-successes
npx agentdb@latest reflexion retrieve "WV pride highest point" --k 10

```

**Responsibilities**:
1. Map scout data to backcountry template sections
2. Design hero content (observation tower, summit views)
3. Plan summit experience (tower, paved trail, weather prep)
4. Structure trail system (summit loop, backcountry options)
5. Voice design: WV pride (highest point), weather realism (cold, windy), accessible summit

**Deliverables**:
- Content outline with backcountry template headers
- Hero messaging ("Spruce Knob: West Virginia's Rooftop at 4,863 Feet")
- Summit details (observation tower, paved accessible trail, weather prep)
- Trail system (summit loop, Huckleberry Trail, Spruce Knob Lake)
- Kim's voice snippets (WV pride, weather prep emphasis)
- Gear callout placements (layers, wind protection, hiking gear)

#### Planner 2: Technical Architecture
**Input**: Content architecture from Planner 1

**AgentDB retrieval**:

```bash
npx agentdb@latest reflexion retrieve "backcountry summit page layout" --k 10 --filters '{"success":true}'
npx agentdb@latest skill search "observation tower component" 5

```

**Responsibilities**:
1. Component selection (SummitDetails, ObservationTower, TrailList, WeatherWarning)
2. Data structure design (summit info, tower, trails, weather conditions)
3. Schema.org markup (TouristAttraction + Mountain types)
4. Drive time calculation (from 38.5858, -80.8581 to Spruce Knob ~2.75 hours)
5. Responsive layout (mobile summit photos emphasis)
6. Image strategy (observation tower, 360° views, red spruce forest)

**Deliverables**:
- Component tree with summit/weather focus
- JSON data structure (summit, tower, trails, weather)
- Schema markup template (TouristAttraction + Mountain)
- Performance budget (summit view photos lazy load)

### Coder Agent (Implementation)
**Input**: Content + technical architecture from planners

**AgentDB retrieval**:

```bash
npx agentdb@latest reflexion retrieve "backcountry summit implementation" --k 15 --synthesize-context
npx agentdb@latest reflexion retrieve "WVWO aesthetic alpine summit" --k 10 --only-successes

```

**Responsibilities**:
1. Implement `/wv-wild-web/src/pages/destinations/spruce-knob.astro`
2. Create SummitDetails component (elevation, tower, accessible trail)
3. Create WeatherWarning component (cold/windy conditions, layers emphasis)
4. Apply WVWO aesthetic (alpine palette, sign-green for trails, brand-brown for tower)
5. Implement dual schema markup (TouristAttraction + Mountain)
6. Optimize images (tower, views, red spruce, WebP)
7. Add gear category links (layers, wind protection, hiking gear)

**Quality gates**:
- Pass WVWO aesthetic checklist
- Kim's voice authentic (WV pride, weather realism)
- Mobile-responsive (375px width)
- Schema.org dual-type validation
- Load time <2s on 3G

**Deliverables**:
- Complete `.astro` page file
- SummitDetails component
- WeatherWarning component
- TrailList component
- Image optimization report

## Data Requirements

### Geographic Data
**Shop coordinates**: `38.5858, -80.8581` (Birch River, WV)
**Destination coordinates**: `38.7000, -79.5333` (Spruce Knob, WV)
**Elevation**: 4,863 ft (highest point in West Virginia)
**Drive time**: ~2.75 hours via US-33 E
**Distance**: ~100 miles

### Summit Data

```typescript
interface Summit {
  name: string;
  elevation: number;
  state: string;
  rank: string;
  observationTower: {
    type: string;
    height: string;
    access: string;
    views: string[];
  };
  summitTrail: {
    length: string;
    difficulty: string;
    accessible: boolean;
  };
}

const spruceKnobSummit: Summit = {
  name: "Spruce Knob",
  elevation: 4863,
  state: "West Virginia",
  rank: "Highest point in WV",
  observationTower: {
    type: "Stone observation tower",
    height: "~20 ft above summit",
    access: "Short stairs (not wheelchair accessible to top)",
    views: ["360° views", "Shenandoah Valley (clear days)", "Allegheny Mountains", "Red spruce forest"]
  },
  summitTrail: {
    length: "0.5 mi paved loop",
    difficulty: "Easy (paved, wheelchair accessible to tower base)",
    accessible: true
  }
};

```

### Weather Conditions Data

```typescript
interface WeatherConditions {
  temperature: {
    summer: string;
    winter: string;
    note: string;
  };
  wind: string;
  visibility: string;
  seasonalConsiderations: string[];
}

const spruceKnobWeather: WeatherConditions = {
  temperature: {
    summer: "60s-70s°F (daytime), 40s-50s°F (night)",
    winter: "Below freezing common, wind chill extreme",
    note: "10-20°F cooler than valleys"
  },
  wind: "Windy year-round (exposed summit, bring wind layers)",
  visibility: "Variable (fog common, clear days offer 50+ mile views)",
  seasonalConsiderations: [
    "Summer: Cool temps, bring layers even in July",
    "Fall: Windy, rapid weather changes",
    "Winter: Snow/ice on road, cold temps, wind chill",
    "Spring: Mud season, unpredictable weather"
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
}

const spruceKnobTrails: Trail[] = [
  {
    name: "Summit Loop Trail",
    length: "0.5 mi paved",
    difficulty: "Easy (wheelchair accessible to tower base)",
    highlights: ["Observation tower", "360° views", "Red spruce forest", "Alpine vegetation"]
  },
  {
    name: "Huckleberry Trail",
    length: "3.5 mi",
    difficulty: "Moderate",
    highlights: ["Backcountry loop", "Red spruce/huckleberry", "Quieter than summit"]
  },
  {
    name: "Spruce Knob Lake Trail",
    length: "1 mi loop",
    difficulty: "Easy",
    highlights: ["Lake loop (nearby)", "Picnic area", "Family-friendly"]
  },
  {
    name: "Seneca Creek Trail (access)",
    length: "Varies (backcountry)",
    difficulty: "Difficult (backcountry)",
    highlights: ["Backcountry access from Spruce Knob area", "Dispersed camping", "Experienced hikers"]
  }
];

```

### Gear Category Mappings

```typescript
const gearMappings = {
  summit: [
    { category: "clothing", products: ["wind-jacket", "insulated-layer", "base-layers", "warm-hat", "gloves"] },
    { category: "hiking", products: ["day-pack", "trekking-poles"] }
  ],
  backcountry: [
    { category: "hiking", products: ["backpack-multiday", "tent", "sleeping-bag", "camp-stove"] },
    { category: "navigation", products: ["map", "compass", "gps"] }
  ]
};

```

## Kim's Voice Guidelines for Spruce Knob

**Tone**: WV pride (highest point), weather realism (cold/windy), accessible summit emphasis.

**Approved phrases**:

```
"Spruce Knob is West Virginia's rooftop - 4,863 feet, highest point in the state."
"Observation tower gives you 360-degree views. On clear days, you can see Virginia."
"Summit trail is paved and wheelchair accessible to the tower base. Easy walk."
"Bring layers. It's 10-20 degrees cooler than the valleys, and the wind is no joke."
"Even in summer, I've seen 50-degree temps and heavy wind at the summit. Pack accordingly."

```

**Forbidden phrases**:

```
NEVER: "Conquer WV's peak", "Summit the ultimate challenge", "Alpine paradise", "Majestic mountain throne"

```

**Weather prep emphasis**:

```
"Weather changes fast up here. Blue sky can turn to fog in 20 minutes. Bring wind layers and rain gear."
"Winter access depends on road conditions. Gravel section can ice up. Call ahead if driving in winter."

```

## Content Blocks (Backcountry Template Sections)

### Hero Block
**Image**: Observation tower at summit or 360° view
**Headline**: "Spruce Knob: West Virginia's Rooftop at 4,863 Feet"
**Subhead**: "Highest point in WV. Paved accessible summit trail, observation tower, 360° views. 2.75 hours from our shop."
**CTA**: "Shop Layers & Wind Gear"

### Summit Overview Block
**Content**:
- Elevation: 4,863 ft (highest point in West Virginia)
- Observation tower: Stone tower with 360° views
- Summit trail: 0.5 mi paved loop (wheelchair accessible to tower base)
- Views (clear days): Shenandoah Valley, Allegheny Mountains, 50+ miles
- Vegetation: Red spruce forest, alpine-like conditions
**Kim's note**: *"Spruce Knob is our state's high point. Summit trail is paved and easy - anyone can get up here."*

### Observation Tower Block
**Component**: `<ObservationTower tower={spruceKnobSummit.observationTower} />`
**Content**:
- Stone tower (~20 ft above summit)
- 360° panoramic views
- Short stairs to top (not wheelchair accessible to tower top, but tower base offers views)
- Best on clear days (fog is common)
**Kim's note**: *"Tower gives you views in every direction. Bring binoculars - on clear days you can see Virginia."*

### Weather Warning Block (Prominent)
**Component**: `<WeatherWarning conditions={spruceKnobWeather} />`
**Content**:
- 10-20°F cooler than valleys
- Windy year-round (exposed summit)
- Rapid weather changes (fog, rain, wind)
- Summer: 60s-70s daytime, 40s-50s night
- Winter: Below freezing, wind chill extreme
**What to bring**: Wind jacket, insulated layer, base layers, warm hat, gloves (even summer)
**Kim's note**: *"Even in July, I've seen 50-degree temps and heavy wind. Bring layers. Seriously."*

### Trail System Block
**Component**: `<TrailList trails={spruceKnobTrails} />`
**Content**: Summit Loop (paved, accessible), Huckleberry Trail (backcountry), Spruce Knob Lake (nearby easy loop), Seneca Creek access (backcountry)
**Kim's note**: *"Summit Loop is the main draw - paved and easy. Huckleberry Trail if you want backcountry solitude."*

### Backcountry Camping Block
**Content**:
- Dispersed backcountry camping (free, no facilities)
- Leave No Trace principles
- Permits: None required for dispersed camping
- Access: Seneca Creek Trail, Huckleberry Trail area
- Water: Bring filter (no reliable sources near summit)
**Gear callouts**: Backpack, tent, sleeping bag, camp stove, water filter
**Kim's note**: *"Backcountry camping is dispersed - no designated sites. Pack it in, pack it out."*

### Access & Logistics Block
**Content**:
- Drive time from WVWO shop: 2.75 hours via US-33 E
- Road: Paved to parking area, gravel final section (passable for cars, rough in winter)
- Parking: Free lot at trailhead
- Cell service: Limited to none
- Winter access: Road can ice up, call NFS for conditions
**CTA**: "Stock up on layers and wind gear before you drive east"

### Local Knowledge Block
**Kim's voice**:

```
"Spruce Knob is West Virginia's highest point - 4,863 feet. It's a point of pride for us.
On clear days, you can see forever from the observation tower.

The summit trail is paved and wheelchair accessible to the tower base. 0.5-mile loop, easy
walk. Tower itself has stairs (not accessible), but you get great views from the base.

Weather is the wildcard. It's 10-20 degrees cooler than the valleys, and the wind is constant.
Even in summer, bring layers. I've seen 50-degree temps in July with heavy wind. Rain gear,
wind jacket, warm hat, gloves - pack for fall conditions even if it's summer in the valleys.

Winter access depends on road conditions. Last section is gravel, and it ices up. Call
Monongahela National Forest ranger station for road updates before driving in winter.

Huckleberry Trail is the backcountry option - 3.5-mile loop through red spruce and huckleberry
patches. Quieter than the summit, moderate difficulty.

Spruce Knob Lake is nearby - easy 1-mile loop around a small lake. Family-friendly, picnic area.

Backcountry camping is dispersed - no designated sites, no facilities. Seneca Creek Trail
connects from the Spruce Knob area if you're doing multi-day backcountry. Bring water filter -
no reliable water sources near summit.

Fog is common. Blue sky can turn to zero visibility in 20 minutes. If you're up there for
sunrise photos, bring layers and patience. Weather changes fast.

We stock wind layers, insulated jackets, base layers, warm hats, gloves. Stop by before you
head east - Spruce Knob weather is no joke, even in summer. Grand love ya."

```

## Schema.org Markup (Dual Types)


```typescript
const spruceKnobSchema = {
  "@context": "https://schema.org",
  "@type": ["TouristAttraction", "Mountain"],
  "name": "Spruce Knob",
  "description": "Highest point in West Virginia at 4,863 ft. Features stone observation tower with 360° views, paved wheelchair-accessible summit trail, red spruce forest. Monongahela National Forest.",
  "image": "https://wvwildoutdoors.com/images/destinations/spruce-knob-hero.jpg",
  "url": "https://wvwildoutdoors.com/destinations/spruce-knob",
  "address": {
    "@type": "PostalAddress",
    "addressRegion": "WV"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 38.7000,
    "longitude": -79.5333,
    "elevation": 4863
  },
  "isAccessibleForFree": true,
  "publicAccess": true,
  "touristType": ["hikers", "photographers", "backcountry campers", "scenic drive tourists"]
};

```

## Swarm Coordination Hooks

### Pre-Task (All Agents)

```bash
npx claude-flow@alpha hooks pre-task --description "SPEC-39 Spruce Knob: [agent-role] [task-name]"
npx claude-flow@alpha hooks session-restore --session-id "swarm-spruce-knob"

```

### Scout Memory Storage

```bash
# Scout 1 stores NFS official info
npx claude-flow@alpha hooks post-edit --memory-key "swarm/spruce-knob/scout1-nfs" --file "nfs-data.json"

# Scout 2 stores tower/summit
npx claude-flow@alpha hooks post-edit --memory-key "swarm/spruce-knob/scout2-summit" --file "tower-summit.json"

# Scout 3 stores trails/backcountry
npx claude-flow@alpha hooks post-edit --memory-key "swarm/spruce-knob/scout3-trails" --file "trails-backcountry.json"

```

### Queen Synthesis

```bash
npx claude-flow@alpha hooks session-restore --session-id "swarm-spruce-knob"

```

### Planner Memory Storage

```bash
# Planner 1 stores content architecture
npx claude-flow@alpha hooks post-edit --memory-key "swarm/spruce-knob/plan-content" --file "summit-content-outline.md"

# Planner 2 stores technical architecture
npx claude-flow@alpha hooks post-edit --memory-key "swarm/spruce-knob/plan-technical" --file "summit-component-design.json"

```

### Coder Implementation

```bash
npx claude-flow@alpha hooks session-restore --session-id "swarm-spruce-knob"
npx agentdb@latest reflexion store "wvwo-session" "spruce-knob-page" 1.0 true "Backcountry summit template with SummitDetails (4863ft highest in WV, observation tower 360° views), WeatherWarning (cold/windy year-round, layers emphasis), TrailList (summit paved accessible, Huckleberry backcountry), Kim's WV-pride weather-realism voice, dual schema types, gear mappings (layers/wind/hiking)"

```

### Post-Task (All Agents)

```bash
npx claude-flow@alpha hooks post-task --task-id "spec-39-spruce-knob-[agent-role]"
npx claude-flow@alpha hooks session-end --export-metrics true

```

## Success Criteria

### Content Quality
- [ ] Kim's voice authentic (WV pride, weather realism, layers emphasis)
- [ ] Zero AI slop ("conquer peak", "alpine paradise", etc.)
- [ ] Summit details accurate (4,863 ft, tower, paved accessible trail)
- [ ] Weather warning prominent (cold/windy, rapid changes, layer up)
- [ ] Gear recommendations match WVWO inventory (wind layers, insulation, hiking)

### Technical Quality
- [ ] Passes WVWO aesthetic checklist
- [ ] Mobile-responsive (375px width)
- [ ] Schema.org dual-type validation (TouristAttraction + Mountain)
- [ ] Drive time accurate (2.75 hours from shop)
- [ ] Images optimized (tower, views, red spruce, WebP, <200KB each)
- [ ] Load time <2s on 3G

### Swarm Coordination
- [ ] All scouts completed research in parallel
- [ ] Queen successfully synthesized findings
- [ ] Planners built on scout data
- [ ] Coder implemented summit + weather components
- [ ] Success pattern stored in AgentDB

## Implementation Order

1. **Queen**: Initialize swarm, assign scout tasks (single message with 3 Task calls)
2. **Scouts 1-3**: Execute research in parallel (WebSearch + AgentDB retrieval)
3. **Queen**: Retrieve scout findings, synthesize for planners
4. **Planner 1**: Design summit content architecture (tower, weather emphasis)
5. **Planner 2**: Design technical architecture (SummitDetails, WeatherWarning components)
6. **Coder**: Implement page with components (read both planner outputs)
7. **Queen**: Review implementation, store success pattern

**Total messages**: ~8-10

## AgentDB Pattern Storage

After successful implementation:

```bash
npx agentdb@latest reflexion store "wvwo-session" "spruce-knob-highest-point" 1.0 true "Backcountry summit template with hierarchical swarm. SummitDetails component (4,863ft highest in WV, stone observation tower 360° views, paved 0.5mi accessible summit trail), WeatherWarning component (10-20°F cooler, windy year-round, rapid changes, layers/wind gear emphasis), TrailList (Summit Loop paved/accessible, Huckleberry 3.5mi backcountry, Spruce Knob Lake nearby, Seneca Creek backcountry access). Kim's WV-pride weather-realism voice (highest point pride, honest weather prep). Dual schema.org types (TouristAttraction + Mountain). Backcountry dispersed camping (Leave No Trace). 2.75hr drive from shop. Gear mappings (wind layers, insulation, hiking, backcountry)."

```

**Reusable for**: Other summit destinations, high-elevation backcountry, observation tower locations, alpine/tundra conditions
