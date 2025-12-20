# SPEC-30: New River Gorge Destination Page - Swarm Implementation Prompt

## Objective
Create `/destinations/new-river-gorge` page using hierarchical swarm coordination with WebSearch research, AgentDB pattern learning, and hybrid template implementation (combines river + backcountry + state park patterns).

## Swarm Architecture

**Topology**: Hierarchical (1 queen → 4 scouts → 2 planners → 1 coder)
**Note**: 4 scouts (not 3) due to multi-activity complexity

### Queen Agent (Coordinator)
**Role**: Orchestrate research → planning → implementation for flagship multi-activity destination
**Responsibilities**:
- Initialize swarm memory namespace `swarm/new-river-gorge`
- Assign tasks to 4 scouts (official NPS info, activity diversity, access/trails, cultural/historical)
- Synthesize scout findings for planners (hybrid template requires more integration)
- Approve final implementation from coder
- Store success patterns in AgentDB

### Scout Agents (4 Parallel Researchers)

#### Scout 1: Official NPS Information
**Research targets**:
```bash
# WebSearch queries (run in parallel)
WebSearch("New River Gorge National Park official site 2025")
WebSearch("New River Gorge visitor center hours fees")
WebSearch("New River Gorge National Park Service regulations")
```

**AgentDB retrieval**:
```bash
npx agentdb@latest reflexion retrieve "NPS national park official info" --k 10 --synthesize-context
npx agentdb@latest skill search "national park visitor information" 5
```

**Deliverables**:
- Official NPS URLs (nps.gov/neri)
- Visitor center locations (Canyon Rim, Sandstone)
- Entry fees ($0 - free entry)
- Park regulations (backcountry permits, fire restrictions)
- Operating hours (year-round, daylight hours)

#### Scout 2: Activity Diversity
**Research targets**:
```bash
WebSearch("New River Gorge rafting climbing hiking fishing 2025")
WebSearch("New River Gorge Bridge Day base jumping")
WebSearch("New River Gorge mountain biking Arrowhead Trails")
```

**AgentDB retrieval**:
```bash
npx agentdb@latest reflexion retrieve "multi-activity destination patterns" --k 10 --filters '{"success":true}'
npx agentdb@latest recall with-certificate "activity categorization content" 12
```

**Deliverables**:
- Primary activities (rafting, rock climbing, hiking, mountain biking, fishing)
- Seasonal activity matrix (what's available when)
- Difficulty ranges (Class I-V rafting, 5.4-5.14 climbing, easy-strenuous hiking)
- Unique events (Bridge Day in October)

#### Scout 3: Access & Trail Systems
**Research targets**:
```bash
WebSearch("New River Gorge hiking trails map 2025")
WebSearch("New River Gorge climbing areas Endless Wall Kaymoor")
WebSearch("New River Gorge river access points put-in take-out")
```

**AgentDB retrieval**:
```bash
npx agentdb@latest reflexion retrieve "trail system access points" --k 10
npx agentdb@latest skill search "trailhead parking logistics" 5
```

**Deliverables**:
- Major trail systems (Endless Wall, Long Point, Kaymoor)
- Climbing areas (Endless Wall, Junkyard, Beauty Mountain, Kaymoor)
- River access points (Cunard to Thurmond section)
- Parking and trailhead locations

#### Scout 4: Cultural & Historical Context
**Research targets**:
```bash
WebSearch("New River Gorge coal mining history Thurmond ghost town")
WebSearch("New River Gorge Bridge construction history")
WebSearch("New River Gorge National Park designation 2020")
```

**AgentDB retrieval**:
```bash
npx agentdb@latest reflexion retrieve "cultural historical storytelling" --k 10 --only-successes
npx agentdb@latest skill search "WV coal history authentic voice" 5
```

**Deliverables**:
- Coal mining heritage (Thurmond, Kaymoor)
- Bridge history (1977 construction, longest single-span arch for 26 years)
- National Park designation (2020, upgraded from National River)
- Cultural significance for WV identity

### Planner Agents (2 Sequential Architects)

#### Planner 1: Content Architecture (Hybrid Template)
**Input**: Synthesized findings from all 4 scouts
**Template**: Hybrid (river + backcountry + state park patterns)

**AgentDB retrieval**:
```bash
npx agentdb@latest reflexion retrieve "hybrid template multi-activity" --k 10 --synthesize-context
npx agentdb@latest reflexion retrieve "WVWO voice Kim authentic" --k 10 --only-successes
npx agentdb@latest reflexion retrieve "cultural storytelling WV pride" --k 10
```

**Responsibilities**:
1. Map scout data to hybrid template sections
2. Design hero content (New River Gorge Bridge iconic imagery)
3. Plan activity categorization (tabbed interface: Rafting, Climbing, Hiking, Biking, Fishing)
4. Structure seasonal content (year-round activities, Bridge Day in October)
5. Integrate cultural storytelling (coal heritage, WV identity)
6. Voice design: Proud but not boastful, "our backyard" energy

**Deliverables**:
- Content outline with hybrid section headers
- Hero messaging ("The Gorge: Where the New River Carved West Virginia's Playground")
- Activity-specific subsections (5 activities × 3-4 blocks each)
- Kim's voice snippets for each activity
- Cultural heritage callouts
- Gear callout placements per activity

#### Planner 2: Technical Architecture (Complex State Management)
**Input**: Content architecture from Planner 1

**AgentDB retrieval**:
```bash
npx agentdb@latest reflexion retrieve "React component tabbed interface" --k 10 --filters '{"success":true}'
npx agentdb@latest skill search "activity filtering state management" 5
```

**Responsibilities**:
1. Component selection (ActivityTabs, SeasonalMatrix, TrailMap, GearRecommendations)
2. Data structure design (activities array with nested seasons, trails, gear)
3. Schema.org markup (TouristAttraction + multi-activity types)
4. Drive time calculation (from 38.5858, -80.8581 to Fayetteville ~50 min)
5. Responsive layout (mobile tabs collapse to accordion)
6. Image strategy (hero bridge, activity-specific imagery)

**Deliverables**:
- Component tree with React state management
- JSON data structure (activities, seasons, trails, gear mappings)
- Schema markup template (complex multi-type)
- Performance budget (image lazy loading, tab content hydration)

### Coder Agent (Implementation)
**Input**: Content + technical architecture from planners

**AgentDB retrieval**:
```bash
npx agentdb@latest reflexion retrieve "destination page hybrid implementation" --k 15 --synthesize-context
npx agentdb@latest reflexion retrieve "WVWO aesthetic shadcn tabs" --k 10 --only-successes
npx agentdb@latest reflexion retrieve "React Tabs component customization" --k 10
```

**Responsibilities**:
1. Implement `/wv-wild-web/src/pages/destinations/new-river-gorge.astro`
2. Create hybrid-specific components (ActivityTabs, SeasonalMatrix)
3. Apply WVWO aesthetic to shadcn Tabs (rounded-sm, brand-brown, sign-green)
4. Implement schema markup (multi-activity types)
5. Optimize images (WebP, lazy load, 1200px max width)
6. Add gear category links per activity (rafting gear, climbing gear, etc.)

**Quality gates**:
- Pass WVWO aesthetic checklist
- Kim's voice authenticity (proud but humble WV tone)
- Mobile-responsive tabs (375px width)
- Schema.org validation (multi-activity types)
- Load time <2.5s on 3G (complex page, image-heavy)

**Deliverables**:
- Complete `.astro` page file
- New components in `src/components/destinations/`
- Image optimization report
- Activity-specific gear mappings

## Data Requirements

### Geographic Data
**Shop coordinates**: `38.5858, -80.8581` (Birch River, WV)
**Destination coordinates**: `38.0673, -81.0784` (Fayetteville, WV - central Gorge)
**Drive time**: ~50 minutes via US-19 S
**Distance**: ~35 miles

### Activity Data (Multi-Dimensional)
```typescript
interface Activity {
  name: string;
  category: "water" | "climbing" | "trails" | "biking" | "fishing";
  seasons: Season[];
  difficulties: string[];
  locations: Location[];
  gearCategories: string[];
  kimsNote: string;
}

const newRiverActivities: Activity[] = [
  {
    name: "Whitewater Rafting",
    category: "water",
    seasons: [
      { name: "Spring High Water", months: "Mar-May", difficulty: "Class III-IV", crowds: "heavy" },
      { name: "Summer Fun", months: "Jun-Aug", difficulty: "Class I-III", crowds: "heavy" },
      { name: "Fall Colors", months: "Sep-Nov", difficulty: "Class II-III", crowds: "moderate" }
    ],
    difficulties: ["Class I (family floats)", "Class III-IV (Lower New)", "Class V (Upper New)"],
    locations: ["Thurmond to Fayette Station (Lower New)", "Hinton to Thurmond (Upper New)"],
    gearCategories: ["water-sports", "clothing-water"],
    kimsNote: "Lower New is perfect for first-timers. Upper New is serious - hire a guide."
  },
  {
    name: "Rock Climbing",
    category: "climbing",
    seasons: [
      { name: "Spring", months: "Mar-May", conditions: "Variable, can be wet", crowds: "moderate" },
      { name: "Fall (Prime)", months: "Sep-Nov", conditions: "Dry, perfect temps", crowds: "heavy" },
      { name: "Winter", months: "Dec-Feb", conditions: "Cold but climbable", crowds: "light" }
    ],
    difficulties: ["5.4 (beginner)", "5.8-5.10 (sport)", "5.11-5.14 (advanced)"],
    locations: ["Endless Wall (1400+ routes)", "Kaymoor (200+ routes)", "Junkyard", "Beauty Mountain"],
    gearCategories: ["climbing", "safety"],
    kimsNote: "Endless Wall has routes for everyone. Bring more quickdraws than you think you need."
  },
  {
    name: "Hiking",
    category: "trails",
    seasons: [
      { name: "Year-Round", months: "Jan-Dec", conditions: "Variable by season", crowds: "moderate" }
    ],
    difficulties: ["Easy (Boardwalk Trail 0.4 mi)", "Moderate (Long Point 3.2 mi)", "Strenuous (Kaymoor Miners 5 mi)"],
    locations: ["Long Point Trail (iconic bridge view)", "Endless Wall Trail (2.4 mi)", "Kaymoor Miners Trail (800 stairs)"],
    gearCategories: ["hiking", "footwear"],
    kimsNote: "Long Point for the bridge view. Kaymoor if you want to earn your post-hike beer."
  },
  {
    name: "Mountain Biking",
    category: "biking",
    seasons: [
      { name: "Spring-Fall", months: "Apr-Nov", conditions: "Best riding weather", crowds: "moderate" }
    ],
    difficulties: ["Beginner (Thurmond-Minden Trail)", "Intermediate (Arrowhead Trails)", "Advanced (technical singletrack)"],
    locations: ["Arrowhead Trails (23 mi system)", "Thurmond-Minden Trail (paved rail-trail)"],
    gearCategories: ["biking", "protective-gear"],
    kimsNote: "Arrowhead is world-class. Start easy - those hills are no joke."
  },
  {
    name: "Fishing",
    category: "fishing",
    seasons: [
      { name: "Spring Muskie", months: "Apr-May", species: ["Muskie", "Smallmouth Bass"], crowds: "light" },
      { name: "Summer Bass", months: "Jun-Aug", species: ["Smallmouth Bass", "Catfish"], crowds: "moderate" }
    ],
    difficulties: ["Shore fishing", "Wade fishing", "Kayak fishing"],
    locations: ["Sandstone Falls area", "Thurmond access"],
    gearCategories: ["fishing"],
    kimsNote: "Smallmouth fight harder than anything else in WV. Bring your WV license."
  }
];
```

### Seasonal Matrix (All Activities)
```typescript
interface SeasonalMatrix {
  season: string;
  months: string;
  rafting: string;
  climbing: string;
  hiking: string;
  biking: string;
  fishing: string;
}

const seasonalMatrix: SeasonalMatrix[] = [
  {
    season: "Spring (Mar-May)",
    months: "Mar-May",
    rafting: "High water (Class III-IV)",
    climbing: "Variable (wet)",
    hiking: "Wildflowers, muddy",
    biking: "Trail conditions vary",
    fishing: "Muskie, smallmouth"
  },
  {
    season: "Summer (Jun-Aug)",
    months: "Jun-Aug",
    rafting: "Family floats (Class I-III)",
    climbing: "Hot, avoid midday",
    hiking: "Green, humid",
    biking: "Prime riding",
    fishing: "Bass, catfish"
  },
  {
    season: "Fall (Sep-Nov)",
    months: "Sep-Nov",
    rafting: "Fall colors (Class II-III)",
    climbing: "PRIME SEASON",
    hiking: "Peak foliage",
    biking: "Perfect temps",
    fishing: "Smallmouth active"
  },
  {
    season: "Winter (Dec-Feb)",
    months: "Dec-Feb",
    rafting: "Limited (low water)",
    climbing: "Cold but climbable",
    hiking: "Icy trails, views clear",
    biking: "Limited",
    fishing: "Slow season"
  }
];
```

### Gear Category Mappings (Per Activity)
```typescript
const gearMappingsByActivity = {
  rafting: [
    { category: "water-sports", products: ["pfd", "wetsuit", "splash-jacket", "river-shoes"] },
    { category: "gear", products: ["drybag"] }
  ],
  climbing: [
    { category: "climbing", products: ["harness", "helmet", "quickdraws", "rope", "belay-device"] },
    { category: "footwear", products: ["climbing-shoes"] }
  ],
  hiking: [
    { category: "hiking", products: ["day-pack", "trekking-poles", "water-filter"] },
    { category: "footwear", products: ["hiking-boots"] }
  ],
  biking: [
    { category: "biking", products: ["mountain-bike-helmet", "gloves", "repair-kit"] },
    { category: "protective-gear", products: ["knee-pads"] }
  ],
  fishing: [
    { category: "fishing", products: ["wv-fishing-license", "bass-tackle", "fishing-rod"] }
  ]
};
```

## Kim's Voice Guidelines for New River Gorge

**Tone**: Proud but not boastful. "Our backyard" energy. WV identity pride.

**Approved phrases**:
```
"The Gorge is our backyard playground. World-class climbing, rafting, biking - all within an hour."
"Bridge Day in October is when the whole state shows up. Plan ahead or stay home."
"The New River is ancient - geologists say it's one of the oldest rivers on Earth. We're just lucky to raft it."
"Endless Wall has 1400 routes. You could climb here every weekend for years and not repeat."
"This isn't Disney. The Gorge will humble you if you're not prepared. Come see us for gear first."
```

**Forbidden phrases**:
```
NEVER: "Ultimate adventure playground", "Extreme destination", "Adrenaline junkie paradise", "World-renowned hotspot"
```

**Cultural heritage integration**:
```
"The Gorge wasn't always a park. Our grandparents mined coal in Thurmond and Kaymoor.
Those ghost towns are part of our story. Respect that when you visit."
```

## Content Blocks (Hybrid Template Sections)

### Hero Block
**Image**: New River Gorge Bridge from Long Point Trail (iconic WV imagery)
**Headline**: "The Gorge: Where the New River Carved West Virginia's Playground"
**Subhead**: "Rafting, climbing, hiking, biking, fishing. National Park since 2020. 50 minutes from our shop."
**CTA**: "Shop by Activity" (anchor to tabs)

### Activity Tabs Block
**Component**: `<ActivityTabs activities={newRiverActivities} client:visible />`
**Tabs**: Rafting | Climbing | Hiking | Biking | Fishing
**Each tab contains**:
- Difficulty breakdown
- Seasonal guide
- Top locations
- Gear recommendations (linked to WVWO products)
- Kim's note

**Mobile**: Tabs collapse to accordion (shadcn Accordion component)

### Seasonal Matrix Block
**Component**: `<SeasonalMatrix data={seasonalMatrix} />`
**Content**: Grid showing all 5 activities across 4 seasons
**Purpose**: Quick reference for trip planning
**Kim's note**: *"Fall's the best. Climbing weather is perfect, rafting's still fun, leaves are changing. Book early."*

### Cultural Heritage Block
**Content**:
```
The Gorge wasn't always a playground. Coal towns like Thurmond and Kaymoor
built West Virginia's backbone. Kaymoor Miners Trail takes you down 800 stairs
to the old mine - same route our grandparents walked daily.

The New River Gorge Bridge was the world's longest single-span arch bridge
when it opened in 1977. Every October on Bridge Day, we close it down and
let BASE jumpers fly. It's chaos. It's glorious. It's very West Virginia.

In 2020, the Gorge became America's newest National Park. We've been climbing,
rafting, and fishing here for generations. The designation just made it official.
```
**Images**: Historic Thurmond, Kaymoor tipple, Bridge Day BASE jumpers

### Access & Logistics Block
**Content**:
- Visitor centers (Canyon Rim, Sandstone)
- Entry fees ($0 - free)
- Drive time from WVWO shop (50 min via US-19 S)
- Parking areas by activity
- Cell service (spotty in canyon)
**CTA**: "Stop by for maps and local beta - we live here"

### Local Knowledge Block
**Kim's voice**:
```
"The Gorge is massive - you can't do it all in a day. Pick an activity and commit.

If it's your first time, hit Long Point Trail for the bridge view (easy 3.2 mi),
then raft the Lower New with a guide. That's the sampler platter.

Climbers: Endless Wall is the crown jewel. 1400 routes, mostly sport, 5.4 to 5.14.
Junkyard and Kaymoor are quieter if you hate crowds.

Bikers: Arrowhead Trails will wreck you (in a good way). 23 miles of flow and pain.

Bridge Day (3rd Saturday in October) is our Super Bowl. Half a million people show up.
If you're not into crowds, visit any other weekend.

And for the love of all that's holy, bring more water than you think you need.
The Gorge is humid in summer, and those trails are steep."
```

## Schema.org Markup (Multi-Activity)

```typescript
const newRiverGorgeSchema = {
  "@context": "https://schema.org",
  "@type": ["TouristAttraction", "NationalPark"],
  "name": "New River Gorge National Park",
  "description": "America's newest National Park (2020). World-class whitewater rafting, rock climbing, hiking, mountain biking, and fishing in West Virginia's iconic river gorge.",
  "image": "https://wvwildoutdoors.com/images/destinations/new-river-gorge-bridge.jpg",
  "url": "https://wvwildoutdoors.com/destinations/new-river-gorge",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Fayetteville",
    "addressRegion": "WV",
    "postalCode": "25840"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 38.0673,
    "longitude": -81.0784
  },
  "isAccessibleForFree": true,
  "publicAccess": true,
  "touristType": ["rock climbers", "whitewater rafters", "hikers", "mountain bikers", "anglers"],
  "availableLanguage": "en",
  "makesOffer": [
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Product",
        "name": "Whitewater Rafting",
        "category": "Adventure Sport"
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Product",
        "name": "Rock Climbing",
        "category": "Adventure Sport"
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Product",
        "name": "Hiking Trails",
        "category": "Outdoor Recreation"
      }
    }
  ]
};
```

## Swarm Coordination Hooks

### Pre-Task (All Agents)
```bash
npx claude-flow@alpha hooks pre-task --description "SPEC-30 New River Gorge: [agent-role] [task-name]"
npx claude-flow@alpha hooks session-restore --session-id "swarm-new-river-gorge"
```

### Scout Memory Storage (4 Scouts)
```bash
# Scout 1 stores NPS official info
npx claude-flow@alpha hooks post-edit --memory-key "swarm/new-river-gorge/scout1-nps" --file "nps-data.json"

# Scout 2 stores activity diversity
npx claude-flow@alpha hooks post-edit --memory-key "swarm/new-river-gorge/scout2-activities" --file "activities-matrix.json"

# Scout 3 stores access/trails
npx claude-flow@alpha hooks post-edit --memory-key "swarm/new-river-gorge/scout3-access" --file "access-trails.json"

# Scout 4 stores cultural/historical
npx claude-flow@alpha hooks post-edit --memory-key "swarm/new-river-gorge/scout4-culture" --file "cultural-heritage.md"
```

### Queen Synthesis
```bash
# Retrieve all 4 scout findings
npx claude-flow@alpha hooks session-restore --session-id "swarm-new-river-gorge"
# Synthesize for planners (manual integration of 4 data streams)
```

### Planner Memory Storage
```bash
# Planner 1 stores hybrid content architecture
npx claude-flow@alpha hooks post-edit --memory-key "swarm/new-river-gorge/plan-content" --file "hybrid-content-outline.md"

# Planner 2 stores complex technical architecture
npx claude-flow@alpha hooks post-edit --memory-key "swarm/new-river-gorge/plan-technical" --file "activity-tabs-architecture.json"
```

### Coder Implementation
```bash
# Before coding, retrieve planner decisions
npx claude-flow@alpha hooks session-restore --session-id "swarm-new-river-gorge"

# After implementation, store success pattern
npx agentdb@latest reflexion store "wvwo-session" "new-river-gorge-page" 1.0 true "Hybrid multi-activity destination with ActivityTabs component, seasonal matrix, cultural heritage storytelling, 5 activity subsections with gear mappings, Kim's proud-but-humble WV voice, shadcn Tabs customized to WVWO aesthetic"
```

### Post-Task (All Agents)
```bash
npx claude-flow@alpha hooks post-task --task-id "spec-30-new-river-gorge-[agent-role]"
npx claude-flow@alpha hooks session-end --export-metrics true
```

## Success Criteria

### Content Quality
- [ ] Kim's voice authentic (proud WV identity, not boastful)
- [ ] Cultural heritage integrated (coal history, Bridge Day, National Park designation)
- [ ] Zero AI slop ("ultimate playground", "adrenaline paradise", etc.)
- [ ] Activity diversity clear (5 activities with distinct seasonal patterns)
- [ ] Gear recommendations match WVWO inventory per activity

### Technical Quality
- [ ] Passes WVWO aesthetic checklist (shadcn Tabs customized: rounded-sm, brand colors)
- [ ] Mobile-responsive tabs (collapse to accordion on mobile)
- [ ] Schema.org validation (multi-activity TouristAttraction + NationalPark)
- [ ] Drive time accurate (50 min from shop)
- [ ] Images optimized (WebP, lazy load per tab, <200KB each)
- [ ] Load time <2.5s on 3G (complex page tolerance)

### Swarm Coordination
- [ ] All 4 scouts completed research in parallel
- [ ] Queen successfully synthesized 4 data streams
- [ ] Planners built on scout data (no duplicate research)
- [ ] Coder implemented hybrid template (no missing activities)
- [ ] Success pattern stored in AgentDB

## Implementation Order

1. **Queen**: Initialize swarm, assign 4 scout tasks (single message with 4 Task calls)
2. **Scouts 1-4**: Execute research in parallel (WebSearch + AgentDB retrieval)
3. **Queen**: Retrieve all scout findings, synthesize for planners (integration work)
4. **Planner 1**: Design hybrid content architecture (map 5 activities to template)
5. **Planner 2**: Design technical architecture (ActivityTabs state management)
6. **Coder**: Implement page with tabs (read both planner outputs)
7. **Queen**: Review implementation, store success pattern

**Total messages**: ~10-12 (queen assigns, scouts report, queen synthesizes, planners deliver, coder implements, queen closes)

## AgentDB Pattern Storage

After successful implementation:
```bash
npx agentdb@latest reflexion store "wvwo-session" "new-river-gorge-hybrid" 1.0 true "Flagship multi-activity destination with hierarchical swarm (1 queen + 4 scouts + 2 planners + 1 coder). Hybrid template combining river/backcountry/park patterns. ActivityTabs component (Rafting, Climbing, Hiking, Biking, Fishing) with seasonal matrix and cultural heritage storytelling. Kim's proud WV voice, coal history integration, Bridge Day callout. 5 activity subsections with gear category mappings. shadcn Tabs customized (rounded-sm, brand colors). Schema.org multi-activity types. Delivered in ~12 swarm messages with integrated data from 4 scouts."
```

**Reusable for**: Seneca Rocks (climbing + hiking), Canaan Valley (skiing + hiking), any multi-activity hybrid destination
