# SPEC-29: Gauley River Destination Page - Swarm Implementation Prompt

## Objective
Create `/destinations/gauley-river` page using hierarchical swarm coordination with WebSearch research, AgentDB pattern learning, and river template implementation.

## Swarm Architecture

**Topology**: Hierarchical (1 queen → 3 scouts → 2 planners → 1 coder)

### Queen Agent (Coordinator)
**Role**: Orchestrate research → planning → implementation pipeline
**Responsibilities**:
- Initialize swarm memory namespace `swarm/gauley-river`
- Assign tasks to scouts (official info, seasonal patterns, gear requirements)
- Synthesize scout findings for planners
- Approve final implementation from coder
- Store success patterns in AgentDB

### Scout Agents (3 Parallel Researchers)

#### Scout 1: Official Information
**Research targets**:
```bash
# WebSearch queries (run in parallel)
WebSearch("Gauley River National Recreation Area official site 2025")
WebSearch("Gauley River rafting season dates West Virginia")
WebSearch("Gauley River put-in take-out locations")
```

**AgentDB retrieval**:
```bash
npx agentdb@latest reflexion retrieve "rafting destination official info" --k 10 --synthesize-context
npx agentdb@latest skill search "river recreation whitewater" 5
```

**Deliverables**:
- Official NPS/state URLs
- Season dates (Gauley Season: Sept-Oct, Lower Gauley year-round)
- River sections (Upper Gauley Class V, Lower Gauley Class III-IV)
- Access points and regulations

#### Scout 2: Seasonal & Activity Patterns
**Research targets**:
```bash
WebSearch("Gauley River fall dam release schedule 2025")
WebSearch("Upper Gauley vs Lower Gauley rafting difficulty")
WebSearch("Gauley River fishing seasons West Virginia")
```

**AgentDB retrieval**:
```bash
npx agentdb@latest reflexion retrieve "seasonal destination patterns" --k 10 --filters '{"success":true}'
npx agentdb@latest recall with-certificate "seasonal content structure" 12
```

**Deliverables**:
- Peak seasons (Gauley Season Sept-Oct, shoulder seasons)
- Activity timing (rafting, fishing, kayaking)
- Weather patterns and water levels
- Crowd expectations (heavy during Gauley Season)

#### Scout 3: Gear & Safety Requirements
**Research targets**:
```bash
WebSearch("Gauley River rafting gear requirements")
WebSearch("West Virginia whitewater safety regulations")
WebSearch("Gauley River Class V equipment checklist")
```

**AgentDB retrieval**:
```bash
npx agentdb@latest reflexion retrieve "gear category mapping outdoor" --k 10
npx agentdb@latest skill search "safety requirements equipment" 5
```

**Deliverables**:
- Required gear (PFD, helmet for Upper Gauley, wetsuit in cold months)
- Recommended gear from WVWO inventory
- Safety certifications and guide requirements
- Gear category mappings for product links

### Planner Agents (2 Sequential Architects)

#### Planner 1: Content Architecture
**Input**: Synthesized scout findings from queen
**Template**: River template (`docs/templates/destination-river.md`)

**AgentDB retrieval**:
```bash
npx agentdb@latest reflexion retrieve "river template content structure" --k 10 --synthesize-context
npx agentdb@latest reflexion retrieve "WVWO voice Kim authentic" --k 10 --only-successes
```

**Responsibilities**:
1. Map scout data to river template sections
2. Design hero content (dramatic Upper Gauley imagery, intensity messaging)
3. Plan seasonal content blocks (Gauley Season focus, shoulder season alternatives)
4. Structure difficulty comparison (Upper vs Lower Gauley)
5. Voice design: Respectful of Class V danger, not glamorizing risk

**Deliverables**:
- Content outline with section headers
- Hero messaging ("The Gauley: East Coast's Wildest Whitewater")
- Kim's voice snippets for each section
- Gear callout placements

#### Planner 2: Technical Architecture
**Input**: Content architecture from Planner 1

**AgentDB retrieval**:
```bash
npx agentdb@latest reflexion retrieve "Astro page implementation patterns" --k 10 --filters '{"success":true}'
npx agentdb@latest skill search "React component interactive" 5
```

**Responsibilities**:
1. Component selection (RiverHero, SeasonalBlocks, DifficultyComparison)
2. Data structure design (sections, activities, gear categories)
3. Schema.org markup (TouristAttraction, WaterfallsTrail for river)
4. Drive time calculation (from 38.5858, -80.8581 to Summersville ~45 min)
5. Responsive layout plan (mobile-first, image-heavy)

**Deliverables**:
- Component tree
- JSON data structure
- Schema markup template
- Performance budget (image optimization plan)

### Coder Agent (Implementation)
**Input**: Content + technical architecture from planners

**AgentDB retrieval**:
```bash
npx agentdb@latest reflexion retrieve "destination page implementation" --k 15 --synthesize-context
npx agentdb@latest reflexion retrieve "WVWO aesthetic shadcn" --k 10 --only-successes
```

**Responsibilities**:
1. Implement `/wv-wild-web/src/pages/destinations/gauley-river.astro`
2. Create river-specific components if needed
3. Apply WVWO aesthetic (Bitter font, brand-brown, sign-green, rounded-sm)
4. Implement schema markup
5. Optimize images (WebP, lazy load, 1200px max width)
6. Add gear category links to WVWO products

**Quality gates**:
- Pass WVWO aesthetic checklist
- Kim's voice authenticity (no "experience epic adventure" slop)
- Mobile-responsive (test 375px width)
- Schema.org validation
- Load time <2s on 3G

**Deliverables**:
- Complete `.astro` page file
- Any new components in `src/components/destinations/`
- Image optimization report

## Data Requirements

### Geographic Data
**Shop coordinates**: `38.5858, -80.8581` (Birch River, WV)
**Destination coordinates**: `38.1667, -80.9167` (Summersville Dam area)
**Drive time**: ~45 minutes via US-19 S
**Distance**: ~28 miles

### River Sections Data
```typescript
interface RiverSection {
  name: string;
  difficulty: string; // "Class III-IV" | "Class V"
  season: string;
  length: string;
  dropPerMile: number;
  features: string[];
}

const gauleySections: RiverSection[] = [
  {
    name: "Upper Gauley",
    difficulty: "Class V",
    season: "Sept-Oct (dam releases)",
    length: "12 miles",
    dropPerMile: 28,
    features: ["Pillow Rock", "Lost Paddle", "Sweet's Falls", "Iron Ring"]
  },
  {
    name: "Lower Gauley",
    difficulty: "Class III-IV",
    season: "Year-round (water dependent)",
    length: "10 miles",
    dropPerMile: 15,
    features: ["Mash", "Diagonal Ledges", "Heaven's Gate"]
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

const gauleySeasons: Season[] = [
  {
    name: "Gauley Season",
    months: "Sept-Oct",
    activities: ["Upper Gauley rafting", "Lower Gauley rafting", "kayaking"],
    crowds: "heavy",
    wvwoGear: ["wetsuits", "drybags", "pfds", "helmets", "river-shoes"]
  },
  {
    name: "Spring Runoff",
    months: "Mar-May",
    activities: ["Lower Gauley rafting", "fishing", "hiking"],
    crowds: "moderate",
    wvwoGear: ["rain-gear", "waders", "fishing-tackle"]
  },
  {
    name: "Summer Low Water",
    months: "Jun-Aug",
    activities: ["fishing", "swimming", "hiking"],
    crowds: "light",
    wvwoGear: ["fishing-gear", "hiking-boots", "day-packs"]
  }
];
```

### Gear Category Mappings
```typescript
const gearMappings = {
  "Upper Gauley (Class V)": [
    { category: "water-sports", products: ["advanced-pfd", "whitewater-helmet"] },
    { category: "clothing", products: ["wetsuit-5mm", "neoprene-gloves", "river-shoes"] },
    { category: "gear", products: ["drybag-waterproof", "throw-rope"] }
  ],
  "Lower Gauley (Class III-IV)": [
    { category: "water-sports", products: ["standard-pfd", "splash-jacket"] },
    { category: "clothing", products: ["wetsuit-3mm", "water-sandals"] },
    { category: "gear", products: ["drybag-small"] }
  ],
  "Fishing": [
    { category: "fishing", products: ["wv-fishing-license", "trout-tackle", "waders"] }
  ]
};
```

## Kim's Voice Guidelines for Gauley River

**Tone**: Respectful of danger, not glamorizing. Honest about Class V intensity.

**Approved phrases**:
```
"The Upper Gauley isn't for beginners. If you're asking if you're ready, you're not."
"Gauley Season is electric - the whole state shows up. Book guides early."
"Lower Gauley's still exciting, but you won't be praying through every rapid."
"We outfit rafters all September. Wetsuits, helmets, drybags - come in before you go."
```

**Forbidden phrases**:
```
NEVER: "Conquer the Gauley", "Ultimate adventure", "Extreme thrill-seekers", "Unleash your wild side"
```

**Safety-first messaging**:
```
"Hire a guide. Seriously. Class V will humble you fast."
"Even experienced paddlers swim on the Upper Gauley. Wear your helmet."
```

## Content Blocks (River Template Sections)

### Hero Block
**Image**: Upper Gauley rapids (dramatic whitewater, kayaker or raft)
**Headline**: "The Gauley: East Coast's Wildest Whitewater"
**Subhead**: "Class V intensity every September. Lower Gauley year-round fun. 45 minutes from our shop."
**CTA**: "Shop Rafting Gear" (link to water-sports category)

### River Sections Block
**Component**: `<DifficultyComparison sections={gauleySections} />`
**Content**: Side-by-side Upper vs Lower Gauley with difficulty, season, features
**Kim's note**: *"Upper Gauley is no joke. If you want big water without the terror, stick to the Lower."*

### Seasonal Guide Block
**Component**: `<SeasonalBlocks seasons={gauleySeasons} />`
**Content**: Gauley Season (Sept-Oct) highlighted, shoulder seasons listed
**Gear callouts**: Links to wetsuits (fall), waders (spring), fishing gear (summer)

### Access & Logistics Block
**Content**:
- Put-in/take-out locations (Summersville Dam, Swiss/Mason's Branch for Upper)
- Parking info
- Permit requirements (none for commercial trips)
- Drive time from WVWO shop (45 min via US-19 S)
**CTA**: "Stop by for last-minute gear - we're on your way"

### Local Knowledge Block
**Kim's voice**:
```
"Gauley Season is our Super Bowl. Every hotel from Summersville to Fayetteville
books up months ahead. The Upper Gauley earns its reputation - I've seen grown
men cry at the takeout. Lower Gauley's a blast without the hospital risk.

If you're new to whitewater, start on the New River. Get your Class III legs
before you think about the Gauley. And for the love of all that's holy, wear
a helmet on the Upper. Pillow Rock doesn't care how tough you think you are."
```

### Gear Recommendations Block
**Component**: `<GearList activities={["Upper Gauley", "Lower Gauley", "Fishing"]} />`
**Content**: Activity-specific gear with WVWO product links
**Kim's note**: *"We stock everything except the raft. Wetsuit, helmet, drybag, river shoes - rent or buy before you head down."*

## Schema.org Markup

```typescript
const gauleySchema = {
  "@context": "https://schema.org",
  "@type": "TouristAttraction",
  "name": "Gauley River",
  "description": "East Coast's most challenging whitewater rafting destination. Class V Upper Gauley (Sept-Oct), Class III-IV Lower Gauley (year-round).",
  "image": "https://wvwildoutdoors.com/images/destinations/gauley-river-hero.jpg",
  "url": "https://wvwildoutdoors.com/destinations/gauley-river",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Summersville",
    "addressRegion": "WV",
    "postalCode": "26651"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 38.1667,
    "longitude": -80.9167
  },
  "isAccessibleForFree": true,
  "touristType": ["whitewater rafters", "kayakers", "anglers"],
  "availableLanguage": "en",
  "publicAccess": true
};
```

## Swarm Coordination Hooks

### Pre-Task (All Agents)
```bash
npx claude-flow@alpha hooks pre-task --description "SPEC-29 Gauley River: [agent-role] [task-name]"
npx claude-flow@alpha hooks session-restore --session-id "swarm-gauley-river"
```

### Scout Memory Storage
```bash
# Scout 1 stores official findings
npx claude-flow@alpha hooks post-edit --memory-key "swarm/gauley-river/scout1-official" --file "research-notes.md"

# Scout 2 stores seasonal patterns
npx claude-flow@alpha hooks post-edit --memory-key "swarm/gauley-river/scout2-seasonal" --file "seasonal-data.json"

# Scout 3 stores gear mappings
npx claude-flow@alpha hooks post-edit --memory-key "swarm/gauley-river/scout3-gear" --file "gear-mappings.json"
```

### Queen Synthesis
```bash
# Retrieve all scout findings
npx claude-flow@alpha hooks session-restore --session-id "swarm-gauley-river"
# Synthesize for planners (manual step, queen agent combines findings)
```

### Planner Memory Storage
```bash
# Planner 1 stores content architecture
npx claude-flow@alpha hooks post-edit --memory-key "swarm/gauley-river/plan-content" --file "content-outline.md"

# Planner 2 stores technical architecture
npx claude-flow@alpha hooks post-edit --memory-key "swarm/gauley-river/plan-technical" --file "component-tree.json"
```

### Coder Implementation
```bash
# Before coding, retrieve planner decisions
npx claude-flow@alpha hooks session-restore --session-id "swarm-gauley-river"

# After implementation, store success pattern
npx agentdb@latest reflexion store "wvwo-session" "gauley-river-page" 1.0 true "River template with difficulty comparison, seasonal blocks, Kim's safety-first voice"
```

### Post-Task (All Agents)
```bash
npx claude-flow@alpha hooks post-task --task-id "spec-29-gauley-river-[agent-role]"
npx claude-flow@alpha hooks session-end --export-metrics true
```

## Success Criteria

### Content Quality
- [ ] Kim's voice authentic (safety-first, not glamorizing Class V)
- [ ] Zero AI slop ("epic adventure", "unleash", etc.)
- [ ] Honest difficulty assessment (Upper Gauley = dangerous)
- [ ] Seasonal accuracy (Gauley Season Sept-Oct verified)
- [ ] Gear recommendations match WVWO inventory

### Technical Quality
- [ ] Passes WVWO aesthetic checklist (Bitter font, rounded-sm, brand colors)
- [ ] Mobile-responsive (tested 375px width)
- [ ] Schema.org validation (TouristAttraction)
- [ ] Drive time accurate (45 min from shop)
- [ ] Images optimized (WebP, lazy load, <200KB each)
- [ ] Load time <2s on 3G

### Swarm Coordination
- [ ] All scouts completed research in parallel
- [ ] Queen successfully synthesized findings
- [ ] Planners built on scout data (no duplicate research)
- [ ] Coder implemented planner decisions (no rework)
- [ ] Success pattern stored in AgentDB

## Implementation Order

1. **Queen**: Initialize swarm, assign scout tasks (single message with 3 Task calls)
2. **Scouts 1-3**: Execute research in parallel (WebSearch + AgentDB retrieval)
3. **Queen**: Retrieve scout findings, synthesize for planners
4. **Planner 1**: Design content architecture (read scout synthesis)
5. **Planner 2**: Design technical architecture (read Planner 1 output)
6. **Coder**: Implement page (read both planner outputs)
7. **Queen**: Review implementation, store success pattern

**Total messages**: ~8-10 (queen assigns, scouts report, queen synthesizes, planners deliver, coder implements, queen closes)

## AgentDB Pattern Storage

After successful implementation:
```bash
npx agentdb@latest reflexion store "wvwo-session" "gauley-river-destination" 1.0 true "Hierarchical swarm (1 queen + 3 scouts + 2 planners + 1 coder) for destination page. River template with difficulty comparison (Upper Class V vs Lower Class III-IV), seasonal content (Gauley Season Sept-Oct), Kim's safety-first voice (no glamorizing danger), gear category mappings to WVWO products. WebSearch for official info + AgentDB for pattern reuse. Drive time calculation from shop coordinates. Schema.org TouristAttraction markup. WVWO aesthetic enforcement (Bitter, rounded-sm, brand colors). Delivered in ~10 swarm messages with no rework."
```

**Reusable for**: New River Gorge (multi-activity hybrid), Cheat River (Class III-IV), Tygart River (milder whitewater)
