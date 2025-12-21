# SPEC-34: Seneca Rocks Destination Page - Swarm Implementation Prompt

## Objective
Create `/destinations/seneca-rocks` page using hierarchical swarm coordination with WebSearch research, AgentDB pattern learning, and backcountry template implementation (iconic climbing + hiking destination).

## Swarm Architecture

**Topology**: Hierarchical (1 queen → 3 scouts → 2 planners → 1 coder)

### Queen Agent (Coordinator)
**Role**: Orchestrate research → planning → implementation for iconic WV climbing destination
**Responsibilities**:
- Initialize swarm memory namespace `swarm/seneca-rocks`
- Assign tasks to scouts (NFS official info, climbing routes/grades, hiking trails)
- Synthesize scout findings for planners
- Approve final implementation from coder
- Store success patterns in AgentDB

### Scout Agents (3 Parallel Researchers)

#### Scout 1: National Forest Official Information
**Research targets**:

```bash
WebSearch("Seneca Rocks National Forest Service WV 2025")
WebSearch("Seneca Rocks Discovery Center visitor information")
WebSearch("Seneca Rocks permits fees regulations climbing")

```

**AgentDB retrieval**:

```bash
npx agentdb@latest reflexion retrieve "national forest official info NFS" --k 10 --synthesize-context
npx agentdb@latest skill search "federal land climbing regulations" 5

```

**Deliverables**:
- Official NFS URLs (fs.usda.gov)
- Seneca Rocks Discovery Center details
- Permits/fees (free entry, no climbing permits for day use)
- Regulations (backcountry camping, fire restrictions, Leave No Trace)
- Operating hours (Discovery Center hours, trails 24/7)

#### Scout 2: Climbing Routes & Grades
**Research targets**:

```bash
WebSearch("Seneca Rocks climbing routes grades trad sport")
WebSearch("Seneca Rocks classic climbs Old Ladies Route Old Man's Route")
WebSearch("Seneca Rocks climbing guidebook Mountain Project")

```

**AgentDB retrieval**:

```bash
npx agentdb@latest reflexion retrieve "climbing destination route grades" --k 10 --filters '{"success":true}'
npx agentdb@latest recall with-certificate "trad climbing content" 12

```

**Deliverables**:
- Route count (~375 routes)
- Grade range (5.2 to 5.13+)
- Climbing style (trad-dominant, some sport routes)
- Classic routes (Old Ladies Route 5.2, Old Man's Route 5.7, Gunsight Notch 5.6)
- Difficulty breakdown (beginner-friendly to expert)
- Approach details (short approach, base of formation)

#### Scout 3: Hiking Trails & Backcountry
**Research targets**:

```bash
WebSearch("Seneca Rocks hiking trail summit West Face Trail")
WebSearch("Seneca Rocks backcountry camping permits")
WebSearch("Seneca Rocks photography viewpoints sunrise sunset")

```

**AgentDB retrieval**:

```bash
npx agentdb@latest reflexion retrieve "backcountry hiking trails" --k 10
npx agentdb@latest skill search "summit trail viewpoints" 5

```

**Deliverables**:
- West Face Trail (1.3 mi to summit observation platform)
- Summit elevation (900 ft vertical gain)
- Trail difficulty (moderate, rocky)
- Backcountry camping (dispersed camping nearby)
- Photography spots (sunrise/sunset views)

### Planner Agents (2 Sequential Architects)

#### Planner 1: Content Architecture
**Input**: Synthesized scout findings from queen
**Template**: Backcountry template (`docs/templates/destination-backcountry.md`)

**AgentDB retrieval**:

```bash
npx agentdb@latest reflexion retrieve "backcountry climbing template" --k 10 --synthesize-context
npx agentdb@latest reflexion retrieve "WVWO voice Kim authentic" --k 10 --only-successes
npx agentdb@latest reflexion retrieve "WV pride iconic landmark" --k 10

```

**Responsibilities**:
1. Map scout data to backcountry template sections
2. Design hero content (dramatic Seneca Rocks fin formation imagery)
3. Plan climbing vs hiking content split (primary: climbing, secondary: hiking)
4. Structure route highlights (classic beginner to expert routes)
5. Voice design: Respectful of technical difficulty, WV pride for iconic landmark

**Deliverables**:
- Content outline with backcountry template headers
- Hero messaging ("Seneca Rocks: West Virginia's Iconic Climbing Spire")
- Climbing route highlights (Old Ladies, Old Man's, Gunsight Notch)
- Hiking trail content (West Face Trail to summit)
- Kim's voice snippets (proud but realistic about trad climbing difficulty)
- Gear callout placements (climbing gear, hiking gear)

#### Planner 2: Technical Architecture
**Input**: Content architecture from Planner 1

**AgentDB retrieval**:

```bash
npx agentdb@latest reflexion retrieve "climbing route list component" --k 10 --filters '{"success":true}'
npx agentdb@latest skill search "route grade visualization" 5

```

**Responsibilities**:
1. Component selection (ClimbingRouteList, TrailDetails, GearChecklist, PhotoGallery)
2. Data structure design (routes by grade, trails, gear categories)
3. Schema.org markup (TouristAttraction + climbing-specific properties)
4. Drive time calculation (from 38.5858, -80.8581 to Seneca Rocks ~2.5 hours)
5. Responsive layout (mobile route list, desktop grid)
6. Image strategy (dramatic formation photos, climbers on routes)

**Deliverables**:
- Component tree with route categorization
- JSON data structure (routes, trails, gear)
- Schema markup template (TouristAttraction)
- Performance budget (high-res formation photos lazy load)

### Coder Agent (Implementation)
**Input**: Content + technical architecture from planners

**AgentDB retrieval**:

```bash
npx agentdb@latest reflexion retrieve "backcountry climbing page implementation" --k 15 --synthesize-context
npx agentdb@latest reflexion retrieve "WVWO aesthetic route tables" --k 10 --only-successes

```

**Responsibilities**:
1. Implement `/wv-wild-web/src/pages/destinations/seneca-rocks.astro`
2. Create ClimbingRouteList component (sortable by grade, beginner-friendly emphasis)
3. Apply WVWO aesthetic (brand-brown, sign-green, serious tone for technical content)
4. Implement schema markup
5. Optimize images (formation photos, climbing action shots, WebP)
6. Add gear category links (climbing gear, hiking gear for West Face Trail)

**Quality gates**:
- Pass WVWO aesthetic checklist
- Kim's voice authentic (WV pride, realistic about trad difficulty)
- Mobile-responsive route list (375px width)
- Schema.org validation
- Load time <2.5s on 3G (image-heavy tolerance)

**Deliverables**:
- Complete `.astro` page file
- ClimbingRouteList component
- TrailDetails component
- Image optimization report

## Data Requirements

### Geographic Data
**Shop coordinates**: `38.5858, -80.8581` (Birch River, WV)
**Destination coordinates**: `38.8344, -79.3773` (Seneca Rocks, WV)
**Drive time**: ~2.5 hours via US-33 E
**Distance**: ~95 miles

### Climbing Routes Data

```typescript
interface ClimbingRoute {
  name: string;
  grade: string;
  pitches: number;
  style: "trad" | "sport" | "mixed";
  description: string;
  classic: boolean;
}

const senecaRoutes: ClimbingRoute[] = [
  {
    name: "Old Ladies Route",
    grade: "5.2",
    pitches: 3,
    style: "trad",
    description: "Classic beginner multi-pitch. Easiest route to summit.",
    classic: true
  },
  {
    name: "Gunsight Notch Direct",
    grade: "5.6",
    pitches: 2,
    style: "trad",
    description: "Iconic notch splitting the formation. Moderate trad.",
    classic: true
  },
  {
    name: "Old Man's Route",
    grade: "5.7",
    pitches: 3,
    style: "trad",
    description: "West Face classic. Varied climbing on solid rock.",
    classic: true
  },
  {
    name: "Skyline Traverse",
    grade: "5.4",
    pitches: 4,
    style: "trad",
    description: "Exposed ridge traverse. Stunning views, easier grade.",
    classic: true
  },
  {
    name: "Conn's West Direct",
    grade: "5.8",
    pitches: 3,
    style: "trad",
    description: "Sustained 5.8 climbing. Popular intermediate route.",
    classic: false
  },
  {
    name: "Castor",
    grade: "5.9",
    pitches: 2,
    style: "trad",
    description: "Thin gear placements. Advanced trad skills required.",
    classic: false
  },
  {
    name: "Pollux",
    grade: "5.10a",
    pitches: 2,
    style: "trad",
    description: "Technical finger cracks. Expert trad climbing.",
    classic: false
  }
];

```

### Hiking Trail Data

```typescript
interface Trail {
  name: string;
  length: string;
  elevationGain: number;
  difficulty: string;
  features: string[];
}

const senecaTrails: Trail[] = [
  {
    name: "West Face Trail (to summit platform)",
    length: "1.3 mi one-way",
    elevationGain: 900,
    difficulty: "Moderate (steep, rocky)",
    features: ["Summit observation platform", "Views of formation", "No climbing required", "Family-friendly (fit hikers)"]
  },
  {
    name: "North Peak Trail",
    length: "0.5 mi from West Face Trail",
    elevationGain: 200,
    difficulty: "Moderate",
    features: ["Less crowded", "Forest loop", "Backcountry feel"]
  }
];

```

### Seasonal Patterns

```typescript
interface Season {
  name: string;
  months: string;
  climbingConditions: string;
  crowds: "light" | "moderate" | "heavy";
  wvwoGear: string[];
}

const senecaSeasons: Season[] = [
  {
    name: "Spring",
    months: "Mar-May",
    climbingConditions: "Cool temps, occasional rain. Good climbing.",
    crowds: "moderate",
    wvwoGear: ["climbing-gear", "rain-shell", "approach-shoes"]
  },
  {
    name: "Summer",
    months: "Jun-Aug",
    climbingConditions: "Hot and humid. Early morning or evening climbing.",
    crowds: "heavy",
    wvwoGear: ["climbing-gear", "sunscreen", "hydration"]
  },
  {
    name: "Fall (Prime)",
    months: "Sep-Nov",
    climbingConditions: "Perfect temps, dry rock. Peak season.",
    crowds: "heavy",
    wvwoGear: ["climbing-gear", "layers", "approach-shoes"]
  },
  {
    name: "Winter",
    months: "Dec-Feb",
    climbingConditions: "Cold, icy. Expert-only ice climbing.",
    crowds: "light",
    wvwoGear: ["ice-climbing-gear", "winter-layers", "crampons"]
  }
];

```

### Gear Category Mappings

```typescript
const gearMappings = {
  climbing: [
    { category: "climbing", products: ["trad-rack", "rope", "harness", "helmet", "belay-device", "quickdraws"] },
    { category: "footwear", products: ["approach-shoes", "climbing-shoes"] },
    { category: "safety", products: ["first-aid", "headlamp"] }
  ],
  hiking: [
    { category: "hiking", products: ["day-pack", "trekking-poles", "water-filter"] },
    { category: "footwear", products: ["hiking-boots"] }
  ]
};

```

## Kim's Voice Guidelines for Seneca Rocks

**Tone**: Proud WV landmark, respectful of technical difficulty, honest about trad climbing commitment.

**Approved phrases**:

```
"Seneca Rocks is West Virginia's most iconic climb. If you've seen a photo of WV climbing, it's probably Seneca."
"Old Ladies Route is the beginner classic - 5.2, three pitches. Your first multi-pitch trad climb."
"Seneca is trad-dominant. If you're used to sport climbing, expect runout sections and gear placements."
"West Face Trail gets you to the summit without ropes. 1.3 miles, steep and rocky, but worth it for the views."
"We stock trad racks, cams, nuts, slings. Build your rack here before you drive east."

```

**Forbidden phrases**:

```
NEVER: "Conquer Seneca", "Ultimate climbing challenge", "Test your limits", "Extreme adventure"

```

**Trad climbing realism**:

```
"Seneca's not a sport crag. You'll place your own gear, and it's often spaced out. Know your trad skills."
"Old Man's Route is classic 5.7, but it's multi-pitch trad. Different beast than gym 5.7."

```

## Content Blocks (Backcountry Template Sections)

### Hero Block
**Image**: Seneca Rocks fin formation (dramatic profile shot)
**Headline**: "Seneca Rocks: West Virginia's Iconic Climbing Spire"
**Subhead**: "375 routes, 5.2 to 5.13+. Trad-dominant multi-pitch climbing. 2.5 hours from our shop."
**CTA**: "Shop Climbing Gear"

### Climbing Overview Block
**Content**:
- 375+ routes on Tuscarora quartzite
- Grade range: 5.2 (Old Ladies) to 5.13+ (expert)
- Style: Trad-dominant (some sport routes)
- Formation height: 900 ft vertical
- Approach: Short (10-15 min from parking)
**Kim's note**: *"Seneca is trad country. If you're new to trad, hire a guide or stick to Old Ladies Route with experienced partners."*

### Classic Routes Block
**Component**: `<ClimbingRouteList routes={senecaRoutes.filter(r => r.classic)} sortBy="grade" />`
**Content**: Table of classic routes (Old Ladies 5.2, Gunsight Notch 5.6, Old Man's 5.7, Skyline Traverse 5.4)
**Columns**: Route Name | Grade | Pitches | Style | Description
**Kim's note**: *"Old Ladies is the beginner multi-pitch. Old Man's is the West Face classic. Both are must-climbs."*

### Advanced Routes Block
**Component**: `<ClimbingRouteList routes={senecaRoutes.filter(r => r.grade >= "5.8")} />`
**Content**: Intermediate/advanced routes (Conn's West Direct 5.8, Castor 5.9, Pollux 5.10a)
**Kim's note**: *"Once you're comfortable on 5.7 trad, Conn's West Direct is the next step. Pollux is thin and technical - expert only."*

### West Face Trail (Non-Climbers) Block
**Component**: `<TrailDetails trail={senecaTrails[0]} />`
**Content**:
- 1.3 mi to summit observation platform
- 900 ft elevation gain (steep but doable)
- No climbing gear needed
- Views of formation and Potomac Highlands
**Kim's note**: *"If you're not climbing, the West Face Trail gets you to the top. Steep and rocky, but families do it. Bring water."*

### Seasonal Conditions Block
**Content**: Spring (cool, occasional rain), Summer (hot, early/late climbing), Fall (PRIME), Winter (expert ice)
**Kim's note**: *"Fall is peak season - perfect temps, dry rock, and the whole East Coast shows up. Book lodging early."*

### Gear Requirements Block
**Component**: `<GearChecklist activities={["Trad Climbing", "Sport Climbing", "Hiking"]} />`
**Content**:
- Trad climbing: Full rack (cams, nuts, slings, quickdraws), rope, harness, helmet, belay device
- Sport climbing: Quickdraws, rope, harness, helmet (limited sport routes)
- Hiking: Sturdy boots, water, layers (summit platform trail)
**Kim's note**: *"We stock trad racks and build custom sets. Come in and we'll set you up for Seneca's gear placements."*

### Access & Logistics Block
**Content**:
- Drive time from WVWO shop: 2.5 hours via US-33 E
- Parking: Seneca Rocks Discovery Center lot (free)
- Permits: None for day climbing, backcountry permit for overnight camping
- Lodging: Nearby campgrounds, motels in Seneca Rocks village
- Cell service: Limited (Verizon works, others spotty)
**CTA**: "Stock up at WVWO before you head east - we're the last major shop"

### Local Knowledge Block
**Kim's voice**:

```
"Seneca Rocks is the WV climb. If you climb in the Mid-Atlantic, you've heard of it.
If you haven't climbed it yet, put it on your list.

The formation is Tuscarora quartzite - solid, sharp, and beautiful. It's not Yosemite,
but it's ours, and it's world-class for East Coast trad climbing.

Old Ladies Route (5.2) is the classic beginner multi-pitch. Three pitches, easy grade,
but it's still trad - you'll place gear, build anchors, manage rope. If it's your first
multi-pitch, hire a guide or climb with experienced partners.

Old Man's Route (5.7) is the West Face icon. Varied climbing, good gear, stunning views.
It's 5.7, but it's runout in spots - different than gym 5.7.

Gunsight Notch (5.6) is the formation's signature feature. You climb through the notch
that splits the rocks. Moderate grade, but exposed. Worth the hype.

Skyline Traverse (5.4) is easier grade but long and exposed. Four pitches along the ridge.
Not for folks afraid of heights.

If you're climbing 5.9+, Castor and Pollux are the next level. Thin gear placements,
technical face climbing. Expert trad skills required.

Fall (Sept-Nov) is prime season. Perfect temps, dry rock, leaves changing. It's crowded -
popular routes can have 2-3 parties queued. Go midweek if you can.

Summer is hot and humid. Climb early morning or evening. Afternoon thunderstorms are common.

Winter is expert-only. Ice forms on routes, and it's cold. Some folks ice climb, but it's
serious business.

If you're not climbing, hike the West Face Trail. 1.3 miles, 900 ft gain, steep and rocky.
Summit platform has views of the formation and Potomac Highlands. Families do it, but bring
water and take your time.

We stock trad racks - cams, nuts, slings, quickdraws. Build your rack here before you
drive to Seneca. We'll help you pick the right sizes for Seneca's cracks and gear placements.

Seneca Rocks Discovery Center (at the parking lot) has maps, beta, and ranger info. Stop
there first if it's your first visit. Grand love ya."

```

## Schema.org Markup


```typescript
const senecaSchema = {
  "@context": "https://schema.org",
  "@type": "TouristAttraction",
  "name": "Seneca Rocks",
  "description": "West Virginia's iconic climbing destination with 375+ trad routes (5.2 to 5.13+) on Tuscarora quartzite. National Forest Service land with free access.",
  "image": "https://wvwildoutdoors.com/images/destinations/seneca-rocks-hero.jpg",
  "url": "https://wvwildoutdoors.com/destinations/seneca-rocks",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Seneca Rocks",
    "addressRegion": "WV",
    "postalCode": "26884"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 38.8344,
    "longitude": -79.3773
  },
  "isAccessibleForFree": true,
  "publicAccess": true,
  "touristType": ["rock climbers", "trad climbers", "hikers", "photographers"]
};

```

## Swarm Coordination Hooks

### Pre-Task (All Agents)

```bash
npx claude-flow@alpha hooks pre-task --description "SPEC-34 Seneca Rocks: [agent-role] [task-name]"
npx claude-flow@alpha hooks session-restore --session-id "swarm-seneca-rocks"

```

### Scout Memory Storage

```bash
# Scout 1 stores NFS official info
npx claude-flow@alpha hooks post-edit --memory-key "swarm/seneca/scout1-nfs" --file "nfs-data.json"

# Scout 2 stores climbing routes
npx claude-flow@alpha hooks post-edit --memory-key "swarm/seneca/scout2-routes" --file "climbing-routes.json"

# Scout 3 stores hiking trails
npx claude-flow@alpha hooks post-edit --memory-key "swarm/seneca/scout3-trails" --file "hiking-trails.json"

```

### Queen Synthesis

```bash
npx claude-flow@alpha hooks session-restore --session-id "swarm-seneca-rocks"

```

### Planner Memory Storage

```bash
# Planner 1 stores content architecture
npx claude-flow@alpha hooks post-edit --memory-key "swarm/seneca/plan-content" --file "climbing-content-outline.md"

# Planner 2 stores technical architecture
npx claude-flow@alpha hooks post-edit --memory-key "swarm/seneca/plan-technical" --file "route-list-design.json"

```

### Coder Implementation

```bash
npx claude-flow@alpha hooks session-restore --session-id "swarm-seneca-rocks"
npx agentdb@latest reflexion store "wvwo-session" "seneca-rocks-page" 1.0 true "Backcountry climbing template with ClimbingRouteList (classic routes highlighted), TrailDetails (West Face Trail non-climber option), GearChecklist (trad rack emphasis), Kim's proud-but-realistic voice (trad difficulty honesty), WV landmark identity, gear category mappings (climbing/hiking)"

```

### Post-Task (All Agents)

```bash
npx claude-flow@alpha hooks post-task --task-id "spec-34-seneca-[agent-role]"
npx claude-flow@alpha hooks session-end --export-metrics true

```

## Success Criteria

### Content Quality
- [ ] Kim's voice authentic (WV pride, trad climbing realism, honest difficulty)
- [ ] Zero AI slop ("conquer", "ultimate challenge", etc.)
- [ ] Route information accurate (grades, pitches, styles)
- [ ] Classic routes highlighted (Old Ladies, Old Man's, Gunsight Notch)
- [ ] Gear recommendations match WVWO inventory (trad racks, approach shoes)

### Technical Quality
- [ ] Passes WVWO aesthetic checklist
- [ ] Mobile-responsive route list (375px width)
- [ ] Schema.org validation (TouristAttraction)
- [ ] Drive time accurate (2.5 hours from shop)
- [ ] Images optimized (formation photos, WebP, <250KB each)
- [ ] Load time <2.5s on 3G

### Swarm Coordination
- [ ] All scouts completed research in parallel
- [ ] Queen successfully synthesized findings
- [ ] Planners built on scout data
- [ ] Coder implemented route list component
- [ ] Success pattern stored in AgentDB

## Implementation Order

1. **Queen**: Initialize swarm, assign scout tasks (single message with 3 Task calls)
2. **Scouts 1-3**: Execute research in parallel (WebSearch + AgentDB retrieval)
3. **Queen**: Retrieve scout findings, synthesize for planners
4. **Planner 1**: Design climbing content architecture (route highlights)
5. **Planner 2**: Design technical architecture (ClimbingRouteList component)
6. **Coder**: Implement page with route list (read both planner outputs)
7. **Queen**: Review implementation, store success pattern

**Total messages**: ~8-10

## AgentDB Pattern Storage

After successful implementation:

```bash
npx agentdb@latest reflexion store "wvwo-session" "seneca-rocks-climbing" 1.0 true "Backcountry climbing template with hierarchical swarm. ClimbingRouteList component (375+ routes, sortable by grade, classic routes highlighted), TrailDetails (West Face Trail 1.3mi for non-climbers), GearChecklist (trad rack emphasis: cams/nuts/slings). Kim's proud WV landmark voice, trad difficulty realism (runout sections, gear placements), honest about skill requirements. Seasonal conditions (fall prime season). Schema.org TouristAttraction. 2.5hr drive from shop. Gear category mappings (climbing/hiking)."

```

**Reusable for**: Other climbing destinations (Coopers Rock, Summersville Lake cliffs), trad-dominant areas, iconic WV landmarks
