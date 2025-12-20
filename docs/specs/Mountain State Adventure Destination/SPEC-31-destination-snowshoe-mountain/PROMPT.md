# SPEC-31: Snowshoe Mountain Destination Page - Swarm Implementation Prompt

## Objective
Create `/destinations/snowshoe-mountain` page using hierarchical swarm coordination with WebSearch research, AgentDB pattern learning, and ski resort template implementation.

## Swarm Architecture

**Topology**: Hierarchical (1 queen → 3 scouts → 2 planners → 1 coder)

### Queen Agent (Coordinator)
**Role**: Orchestrate research → planning → implementation for premier ski resort destination
**Responsibilities**:
- Initialize swarm memory namespace `swarm/snowshoe-mountain`
- Assign tasks to scouts (resort info, ski conditions, summer activities)
- Synthesize scout findings for planners
- Approve final implementation from coder
- Store success patterns in AgentDB

### Scout Agents (3 Parallel Researchers)

#### Scout 1: Resort Official Information
**Research targets**:
```bash
WebSearch("Snowshoe Mountain Resort official site 2025")
WebSearch("Snowshoe Mountain lift tickets season pass prices")
WebSearch("Snowshoe Mountain trail map terrain breakdown")
```

**AgentDB retrieval**:
```bash
npx agentdb@latest reflexion retrieve "ski resort official information" --k 10 --synthesize-context
npx agentdb@latest skill search "resort amenities pricing" 5
```

**Deliverables**:
- Official resort URLs (snowshoemtn.com)
- Lift ticket prices (day passes, season passes)
- Terrain breakdown (244 acres, 60 trails, 14 lifts)
- Difficulty distribution (beginner 20%, intermediate 40%, advanced 30%, expert 10%)
- Operating season (Nov-Apr typically)

#### Scout 2: Winter Ski Conditions & Terrain
**Research targets**:
```bash
WebSearch("Snowshoe Mountain snowfall average WV ski conditions")
WebSearch("Snowshoe Mountain terrain parks advanced trails")
WebSearch("Snowshoe Mountain snowmaking system capacity")
```

**AgentDB retrieval**:
```bash
npx agentdb@latest reflexion retrieve "ski seasonal patterns conditions" --k 10 --filters '{"success":true}'
npx agentdb@latest recall with-certificate "winter sports content" 12
```

**Deliverables**:
- Average snowfall (180 inches/year)
- Snowmaking coverage (100% of trails)
- Terrain parks (progressive features)
- Advanced terrain (Western Territory, Cupp Run - 1.5 mi)
- Base elevation (4,848 ft - highest in Mid-Atlantic)

#### Scout 3: Summer & Off-Season Activities
**Research targets**:
```bash
WebSearch("Snowshoe Mountain summer activities mountain biking")
WebSearch("Snowshoe Mountain golf courses disc golf")
WebSearch("Snowshoe Mountain hiking trails scenic chairlift")
```

**AgentDB retrieval**:
```bash
npx agentdb@latest reflexion retrieve "resort summer off-season content" --k 10
npx agentdb@latest skill search "seasonal transition shoulder season" 5
```

**Deliverables**:
- Summer activities (mountain biking, hiking, golf, scenic chairlift rides)
- Bike park terrain (downhill trails, lift-accessed)
- Disc golf courses (Raven Golf Club)
- Event schedule (summer music festivals, races)

### Planner Agents (2 Sequential Architects)

#### Planner 1: Content Architecture
**Input**: Synthesized scout findings from queen
**Template**: Ski resort template (`docs/templates/destination-ski.md`)

**AgentDB retrieval**:
```bash
npx agentdb@latest reflexion retrieve "ski resort template structure" --k 10 --synthesize-context
npx agentdb@latest reflexion retrieve "WVWO voice Kim authentic" --k 10 --only-successes
```

**Responsibilities**:
1. Map scout data to ski template sections
2. Design hero content (snowy mountain imagery, "WV's premier ski resort")
3. Plan winter/summer content toggle (seasonal switcher component)
4. Structure terrain breakdown (beginner-friendly emphasis for families)
5. Voice design: Accessible but realistic about conditions

**Deliverables**:
- Content outline with ski template headers
- Hero messaging ("Snowshoe: West Virginia's Sky-High Winter Playground")
- Winter vs summer content blocks
- Kim's voice snippets for terrain and conditions
- Gear callout placements (ski/snowboard, summer biking)

#### Planner 2: Technical Architecture
**Input**: Content architecture from Planner 1

**AgentDB retrieval**:
```bash
npx agentdb@latest reflexion retrieve "React component seasonal toggle" --k 10 --filters '{"success":true}'
npx agentdb@latest skill search "terrain map interactive" 5
```

**Responsibilities**:
1. Component selection (SeasonalToggle, TerrainBreakdown, LiftStatus, GearList)
2. Data structure design (winter trails, summer trails, lift info, conditions)
3. Schema.org markup (SkiResort type)
4. Drive time calculation (from 38.5858, -80.8581 to Snowshoe ~90 min)
5. Responsive layout (mobile trail list, desktop interactive map idea)

**Deliverables**:
- Component tree with seasonal state management
- JSON data structure (trails by difficulty, lifts, summer activities)
- Schema markup template (SkiResort)
- Performance budget (trail map images, lazy load summer content)

### Coder Agent (Implementation)
**Input**: Content + technical architecture from planners

**AgentDB retrieval**:
```bash
npx agentdb@latest reflexion retrieve "ski resort page implementation" --k 15 --synthesize-context
npx agentdb@latest reflexion retrieve "WVWO aesthetic shadcn toggle" --k 10 --only-successes
```

**Responsibilities**:
1. Implement `/wv-wild-web/src/pages/destinations/snowshoe-mountain.astro`
2. Create seasonal toggle component (Winter/Summer tabs)
3. Apply WVWO aesthetic (brand-brown, sign-green, blaze-orange for advanced terrain)
4. Implement schema markup (SkiResort)
5. Optimize images (snowy trails, summer biking, WebP)
6. Add gear category links (winter: ski/snowboard, summer: biking)

**Quality gates**:
- Pass WVWO aesthetic checklist
- Kim's voice authenticity (accessible, family-friendly tone)
- Mobile-responsive toggle (375px width)
- Schema.org SkiResort validation
- Load time <2s on 3G

**Deliverables**:
- Complete `.astro` page file
- SeasonalToggle component
- TerrainBreakdown component
- Image optimization report

## Data Requirements

### Geographic Data
**Shop coordinates**: `38.5858, -80.8581` (Birch River, WV)
**Destination coordinates**: `38.4098, -79.9937` (Snowshoe, WV)
**Drive time**: ~90 minutes via US-219 S
**Distance**: ~60 miles

### Resort Data (Winter Season)
```typescript
interface SkiResort {
  name: string;
  elevation: { base: number; summit: number; };
  terrain: {
    acres: number;
    trails: number;
    lifts: number;
    difficulty: { beginner: number; intermediate: number; advanced: number; expert: number; };
  };
  snowfall: { average: number; snowmaking: string; };
  season: { open: string; close: string; };
}

const snowshoeResort: SkiResort = {
  name: "Snowshoe Mountain Resort",
  elevation: { base: 4848, summit: 4848 }, // Highest base in Mid-Atlantic
  terrain: {
    acres: 244,
    trails: 60,
    lifts: 14,
    difficulty: { beginner: 20, intermediate: 40, advanced: 30, expert: 10 }
  },
  snowfall: { average: 180, snowmaking: "100% coverage" },
  season: { open: "Late November", close: "Early April" }
};
```

### Trail Highlights (Winter)
```typescript
interface Trail {
  name: string;
  difficulty: "beginner" | "intermediate" | "advanced" | "expert";
  length: string;
  features: string[];
}

const notableTrails: Trail[] = [
  {
    name: "Cupp Run",
    difficulty: "advanced",
    length: "1.5 miles",
    features: ["Longest trail", "Western Territory", "1,500 ft vertical"]
  },
  {
    name: "Shay's Revenge",
    difficulty: "expert",
    length: "1 mile",
    features: ["Steepest in Mid-Atlantic", "Moguls", "Expert only"]
  },
  {
    name: "Sawmill Slope",
    difficulty: "beginner",
    length: "0.5 miles",
    features: ["Wide open", "Perfect for learning", "Gentle grade"]
  }
];
```

### Summer Activities Data
```typescript
interface SummerActivity {
  name: string;
  description: string;
  difficulty: string;
  gearCategories: string[];
}

const summerActivities: SummerActivity[] = [
  {
    name: "Mountain Biking (Bike Park)",
    description: "Lift-accessed downhill trails, flow trails, jump lines",
    difficulty: "Beginner to Expert",
    gearCategories: ["biking", "protective-gear"]
  },
  {
    name: "Hiking & Scenic Chairlift",
    description: "Summit trails, scenic chairlift rides to 4,848 ft",
    difficulty: "Easy to Moderate",
    gearCategories: ["hiking", "footwear"]
  },
  {
    name: "Disc Golf",
    description: "Raven Golf Club courses, mountain views",
    difficulty: "All levels",
    gearCategories: []
  },
  {
    name: "Festivals & Events",
    description: "Summer concert series, mountain races, food festivals",
    difficulty: "Spectator",
    gearCategories: []
  }
];
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

const snowshoeSeasons: Season[] = [
  {
    name: "Ski Season (Peak)",
    months: "Dec-Feb",
    activities: ["Downhill skiing", "Snowboarding", "Terrain parks", "Night skiing"],
    crowds: "heavy",
    wvwoGear: ["ski-gear", "snowboard", "winter-layers", "goggles", "gloves"]
  },
  {
    name: "Spring Skiing",
    months: "Mar-Apr",
    activities: ["Spring skiing", "Slushy conditions", "Sunny days"],
    crowds: "moderate",
    wvwoGear: ["ski-gear", "sunglasses", "lighter-layers"]
  },
  {
    name: "Summer Adventure",
    months: "Jun-Aug",
    activities: ["Mountain biking", "Hiking", "Disc golf", "Scenic chairlift"],
    crowds: "moderate",
    wvwoGear: ["biking-gear", "hiking-boots", "hydration-packs"]
  },
  {
    name: "Fall (Off-Season)",
    months: "Sep-Nov",
    activities: ["Hiking", "Fall foliage tours", "Pre-season prep"],
    crowds: "light",
    wvwoGear: ["hiking-gear", "layers"]
  }
];
```

### Gear Category Mappings
```typescript
const gearMappings = {
  winter: [
    { category: "ski-snowboard", products: ["ski-boots", "poles", "goggles", "helmet"] },
    { category: "winter-clothing", products: ["base-layers", "ski-jacket", "gloves", "balaclava"] },
    { category: "safety", products: ["avalanche-beacon", "first-aid"] }
  ],
  summer: [
    { category: "biking", products: ["mountain-bike-helmet", "gloves", "protective-pads"] },
    { category: "hiking", products: ["hiking-boots", "day-pack", "trekking-poles"] }
  ]
};
```

## Kim's Voice Guidelines for Snowshoe Mountain

**Tone**: Accessible and family-friendly. Honest about distance and conditions.

**Approved phrases**:
```
"Snowshoe's a haul from the shop (90 minutes), but it's worth it. Highest skiing in the Mid-Atlantic."
"Cupp Run is legit - 1.5 miles of thigh-burning intermediate terrain. Don't skip leg day."
"If you're learning to ski, Snowshoe's beginner area is forgiving. Wide slopes, patient instructors."
"Summer biking at Snowshoe is underrated. Lift-accessed downhill without the Colorado prices."
"We stock base layers, gloves, goggles - grab what you need before you head up the mountain."
```

**Forbidden phrases**:
```
NEVER: "Premier destination", "World-class slopes", "Luxury mountain experience", "Ultimate winter getaway"
```

**Conditions honesty**:
```
"Snowshoe gets 180 inches a year, but they blow snow on everything. You'll ski even in lean winters."
"Shay's Revenge is steep. Like, 'do I really want to do this?' steep. Expert only."
```

## Content Blocks (Ski Resort Template Sections)

### Hero Block
**Image**: Snowy slopes with skiers, Snowshoe summit
**Headline**: "Snowshoe: West Virginia's Sky-High Winter Playground"
**Subhead**: "60 trails, 180 inches of snow, 4,848 ft elevation. Summer bike park too. 90 minutes from our shop."
**CTA**: "Shop Winter Gear" (winter) / "Shop Biking Gear" (summer toggle)

### Seasonal Toggle Block
**Component**: `<SeasonalToggle seasons={["Winter", "Summer"]} client:visible />`
**Winter content**: Ski trails, terrain parks, lift status
**Summer content**: Bike park, hiking, disc golf, scenic chairlift

### Terrain Breakdown Block (Winter)
**Component**: `<TerrainBreakdown resort={snowshoeResort} trails={notableTrails} />`
**Content**: Visual breakdown (20% beginner, 40% intermediate, 30% advanced, 10% expert)
**Highlights**: Cupp Run (longest), Shay's Revenge (steepest), Sawmill (beginner-friendly)
**Kim's note**: *"If you're new, stick to Snowshoe Basin (green/blue runs). Western Territory is where it gets spicy."*

### Conditions & Snowfall Block
**Content**:
- Average snowfall: 180 inches/year
- Snowmaking: 100% coverage (reliable even in lean years)
- Base elevation: 4,848 ft (highest in Mid-Atlantic)
- Season: Late Nov - Early Apr
**Kim's note**: *"Snowshoe's high enough that snow sticks. Even warm winters, they'll make enough to keep you skiing."*

### Summer Activities Block
**Component**: `<SummerActivities activities={summerActivities} />`
**Content**: Bike park (lift-accessed downhill), hiking, disc golf, scenic chairlift
**Gear callouts**: Mountain biking gear, hiking boots
**Kim's note**: *"Summer at Snowshoe is quieter. Bike park's fun, and the chairlift ride to the summit is worth it for the views alone."*

### Access & Logistics Block
**Content**:
- Drive time from WVWO shop: 90 min via US-219 S
- Lift ticket prices: (link to resort site - prices change)
- Parking: Resort lots (paid during peak season)
- Lodging: On-mountain (resort) or nearby towns (Marlinton, Cass)
**CTA**: "Stock up on gear before the drive - we're 30 min closer than Snowshoe's shops"

### Local Knowledge Block
**Kim's voice**:
```
"Snowshoe's the biggest ski resort in WV, and it shows. Holiday weekends get
packed - lift lines can hit 20+ minutes at the Village. Mid-week skiing is
where it's at if you can swing it.

Cupp Run is a bucket-list Mid-Atlantic trail - 1.5 miles, consistent pitch,
beautiful tree skiing. If you can handle blue runs, you can handle Cupp.

Shay's Revenge lives up to the name. It's the steepest in the region, and it's
usually mogul'd out by noon. Only hit it if you're confident.

Western Territory (advanced side) opens after the rest of the mountain gets
snow. Check the trail report before you drive up expecting full access.

Summer biking is slept on. Lift-accessed downhill, flow trails, jump lines -
it's a proper bike park without the Colorado resort prices. Bring pads.

Stop by the shop on your way up. We're on US-219, so you'll pass us. Base layers,
gloves, goggles, whatever you forgot - we've got it. And our coffee's better
than the resort's. Grand love ya."
```

## Schema.org Markup

```typescript
const snowshoeSchema = {
  "@context": "https://schema.org",
  "@type": "SkiResort",
  "name": "Snowshoe Mountain Resort",
  "description": "West Virginia's premier ski resort with 60 trails, 244 acres, and 180 inches of annual snowfall. Summer mountain biking and hiking.",
  "image": "https://wvwildoutdoors.com/images/destinations/snowshoe-mountain-hero.jpg",
  "url": "https://wvwildoutdoors.com/destinations/snowshoe-mountain",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Snowshoe",
    "addressRegion": "WV",
    "postalCode": "26209"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 38.4098,
    "longitude": -79.9937
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "validFrom": "2025-11-25",
      "validThrough": "2026-04-05",
      "description": "Ski season operating hours"
    }
  ]
};
```

## Swarm Coordination Hooks

### Pre-Task (All Agents)
```bash
npx claude-flow@alpha hooks pre-task --description "SPEC-31 Snowshoe Mountain: [agent-role] [task-name]"
npx claude-flow@alpha hooks session-restore --session-id "swarm-snowshoe-mountain"
```

### Scout Memory Storage
```bash
# Scout 1 stores resort official info
npx claude-flow@alpha hooks post-edit --memory-key "swarm/snowshoe/scout1-resort" --file "resort-data.json"

# Scout 2 stores winter ski conditions
npx claude-flow@alpha hooks post-edit --memory-key "swarm/snowshoe/scout2-winter" --file "ski-conditions.json"

# Scout 3 stores summer activities
npx claude-flow@alpha hooks post-edit --memory-key "swarm/snowshoe/scout3-summer" --file "summer-activities.json"
```

### Queen Synthesis
```bash
npx claude-flow@alpha hooks session-restore --session-id "swarm-snowshoe-mountain"
```

### Planner Memory Storage
```bash
# Planner 1 stores content architecture
npx claude-flow@alpha hooks post-edit --memory-key "swarm/snowshoe/plan-content" --file "ski-content-outline.md"

# Planner 2 stores technical architecture
npx claude-flow@alpha hooks post-edit --memory-key "swarm/snowshoe/plan-technical" --file "seasonal-toggle-design.json"
```

### Coder Implementation
```bash
npx claude-flow@alpha hooks session-restore --session-id "swarm-snowshoe-mountain"
npx agentdb@latest reflexion store "wvwo-session" "snowshoe-mountain-page" 1.0 true "Ski resort template with SeasonalToggle (winter/summer), TerrainBreakdown, conditions block, Kim's accessible family-friendly voice, gear mappings for ski and bike"
```

### Post-Task (All Agents)
```bash
npx claude-flow@alpha hooks post-task --task-id "spec-31-snowshoe-[agent-role]"
npx claude-flow@alpha hooks session-end --export-metrics true
```

## Success Criteria

### Content Quality
- [ ] Kim's voice authentic (accessible, family-friendly, honest about conditions)
- [ ] Zero AI slop ("premier destination", "luxury experience", etc.)
- [ ] Seasonal toggle clear (winter vs summer content)
- [ ] Terrain breakdown accurate (beginner-friendly emphasis)
- [ ] Gear recommendations match WVWO inventory

### Technical Quality
- [ ] Passes WVWO aesthetic checklist
- [ ] Mobile-responsive toggle (375px width)
- [ ] Schema.org SkiResort validation
- [ ] Drive time accurate (90 min from shop)
- [ ] Images optimized (WebP, lazy load, <200KB each)
- [ ] Load time <2s on 3G

### Swarm Coordination
- [ ] All scouts completed research in parallel
- [ ] Queen successfully synthesized findings
- [ ] Planners built on scout data
- [ ] Coder implemented seasonal toggle
- [ ] Success pattern stored in AgentDB

## Implementation Order

1. **Queen**: Initialize swarm, assign scout tasks (single message with 3 Task calls)
2. **Scouts 1-3**: Execute research in parallel (WebSearch + AgentDB retrieval)
3. **Queen**: Retrieve scout findings, synthesize for planners
4. **Planner 1**: Design ski content architecture (winter/summer split)
5. **Planner 2**: Design technical architecture (SeasonalToggle component)
6. **Coder**: Implement page with toggle (read both planner outputs)
7. **Queen**: Review implementation, store success pattern

**Total messages**: ~8-10

## AgentDB Pattern Storage

After successful implementation:
```bash
npx agentdb@latest reflexion store "wvwo-session" "snowshoe-ski-resort" 1.0 true "Ski resort template with hierarchical swarm. SeasonalToggle component (winter ski/summer bike park), TerrainBreakdown (60 trails, 4 difficulty levels), conditions block (180in snow, 100% snowmaking), Kim's accessible voice (family-friendly, honest about expert terrain), gear category mappings (ski/snowboard winter, biking summer). Schema.org SkiResort markup. 90min drive time from shop."
```

**Reusable for**: Canaan Valley (ski resort), Timberline (smaller ski resort), other seasonal resorts
