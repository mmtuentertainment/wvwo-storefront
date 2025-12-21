# SPEC-33: ACE Adventure Resort Destination Page - Swarm Implementation Prompt

## Objective
Create `/destinations/ace-adventure-resort` page using hierarchical swarm coordination with WebSearch research, AgentDB pattern learning, and resort template implementation (commercial adventure resort, distinct from state parks).

## Swarm Architecture

**Topology**: Hierarchical (1 queen → 3 scouts → 2 planners → 1 coder)

### Queen Agent (Coordinator)
**Role**: Orchestrate research → planning → implementation for commercial adventure resort
**Responsibilities**:
- Initialize swarm memory namespace `swarm/ace-adventure`
- Assign tasks to scouts (resort official info, activity packages, logistics/booking)
- Synthesize scout findings for planners
- Approve final implementation from coder
- Store success patterns in AgentDB

### Scout Agents (3 Parallel Researchers)

#### Scout 1: Resort Official Information
**Research targets**:

```bash
WebSearch("ACE Adventure Resort official site Oak Hill WV 2025")
WebSearch("ACE Adventure Resort rafting climbing zip line activities")
WebSearch("ACE Adventure Resort pricing packages deals")

```

**AgentDB retrieval**:

```bash
npx agentdb@latest reflexion retrieve "commercial adventure resort" --k 10 --synthesize-context
npx agentdb@latest skill search "guided tours activity packages" 5

```

**Deliverables**:
- Official resort URLs (aceraft.com)
- Activity menu (rafting, zip lines, rock climbing, ATV tours, fishing, paintball)
- Package deals (multi-activity combos)
- Pricing tiers (varies by season, activity)
- Operating season (year-round with seasonal activities)

#### Scout 2: Activity Details & Difficulty Levels
**Research targets**:

```bash
WebSearch("ACE Adventure Resort New River rafting trips")
WebSearch("ACE Adventure Resort zip line canopy tour")
WebSearch("ACE Adventure Resort rock climbing guided trips")

```

**AgentDB retrieval**:

```bash
npx agentdb@latest reflexion retrieve "activity difficulty levels guided" --k 10 --filters '{"success":true}'
npx agentdb@latest recall with-certificate "family vs adventure activities" 12

```

**Deliverables**:
- Rafting trips (New River, Gauley River guided trips)
- Zip line tours (canopy tour, adventure course)
- Rock climbing (guided trips to New River Gorge)
- ATV tours (trails on resort property)
- Family-friendly vs. adventure activities breakdown

#### Scout 3: Lodging, Dining & Logistics
**Research targets**:

```bash
WebSearch("ACE Adventure Resort lodging cabins camping")
WebSearch("ACE Adventure Resort restaurant dining options")
WebSearch("ACE Adventure Resort booking reservations")

```

**AgentDB retrieval**:

```bash
npx agentdb@latest reflexion retrieve "resort logistics booking systems" --k 10
npx agentdb@latest skill search "lodging camping resort amenities" 5

```

**Deliverables**:
- Lodging options (cabins, lodge rooms, camping, yurts)
- Dining (on-site restaurant, meal packages)
- Booking system (online reservations required)
- Shuttle services (to put-in/take-out locations)
- Group packages (corporate, bachelor/bachelorette parties)

### Planner Agents (2 Sequential Architects)

#### Planner 1: Content Architecture
**Input**: Synthesized scout findings from queen
**Template**: Resort template (`docs/templates/destination-resort.md`)

**AgentDB retrieval**:

```bash
npx agentdb@latest reflexion retrieve "commercial resort template" --k 10 --synthesize-context
npx agentdb@latest reflexion retrieve "WVWO voice Kim authentic" --k 10 --only-successes

```

**Responsibilities**:
1. Map scout data to resort template sections
2. Design hero content (action-packed imagery, "adventure resort" positioning)
3. Plan activity categorization (water, aerial, land, family-friendly)
4. Structure package/combo messaging (multi-activity deals)
5. Voice design: Informative but not pushy (WVWO sells gear, not trips)

**Deliverables**:
- Content outline with resort template headers
- Hero messaging ("ACE Adventure Resort: New River Gorge's Activity Hub")
- Activity categories (water, aerial, land, family)
- Kim's voice snippets (neutral tone, focus on gear needs)
- Gear callout placements (rafting, zip line, climbing, ATV)

#### Planner 2: Technical Architecture
**Input**: Content architecture from Planner 1

**AgentDB retrieval**:

```bash
npx agentdb@latest reflexion retrieve "resort activity grid layout" --k 10 --filters '{"success":true}'
npx agentdb@latest skill search "external booking link integration" 5

```

**Responsibilities**:
1. Component selection (ActivityGrid, PackageCards, LodgingOptions, ExternalBookingCTA)
2. Data structure design (activities by category, packages, lodging types)
3. Schema.org markup (TouristAttraction + LodgingBusiness)
4. Drive time calculation (from 38.5858, -80.8581 to Oak Hill ~55 min)
5. Responsive layout (mobile activity cards, desktop grid)
6. External links (ACE booking site, clear "not affiliated" disclaimer)

**Deliverables**:
- Component tree with activity categorization
- JSON data structure (activities, packages, lodging)
- Schema markup template (TouristAttraction + LodgingBusiness)
- Performance budget (activity images lazy load)

### Coder Agent (Implementation)
**Input**: Content + technical architecture from planners

**AgentDB retrieval**:

```bash
npx agentdb@latest reflexion retrieve "resort destination implementation" --k 15 --synthesize-context
npx agentdb@latest reflexion retrieve "WVWO aesthetic activity cards" --k 10 --only-successes

```

**Responsibilities**:
1. Implement `/wv-wild-web/src/pages/destinations/ace-adventure-resort.astro`
2. Create ActivityGrid component (categorized activities)
3. Apply WVWO aesthetic (brand-brown, sign-green, blaze-orange for adventure activities)
4. Implement schema markup (dual types)
5. Optimize images (rafting action shots, zip line, WebP)
6. Add gear category links per activity (WVWO products, not ACE bookings)
7. Include disclaimer: "ACE Adventure Resort is a separate business. We provide gear - book trips directly with them."

**Quality gates**:
- Pass WVWO aesthetic checklist
- Kim's voice authentic (informative, neutral on bookings, gear-focused)
- Mobile-responsive activity grid (375px width)
- Schema.org validation (dual types)
- Load time <2s on 3G
- Clear disclaimer on WVWO/ACE separation

**Deliverables**:
- Complete `.astro` page file
- ActivityGrid component
- ExternalBookingCTA component with disclaimer
- Image optimization report

## Data Requirements

### Geographic Data
**Shop coordinates**: `38.5858, -80.8581` (Birch River, WV)
**Destination coordinates**: `38.0573, -81.1381` (Oak Hill, WV - ACE Resort)
**Drive time**: ~55 minutes via US-19 S
**Distance**: ~38 miles

### Resort Activities Data

```typescript
interface Activity {
  name: string;
  category: "water" | "aerial" | "land" | "family";
  difficulty: string;
  duration: string;
  ageMin: number;
  description: string;
  wvwoGear: string[];
}

const aceActivities: Activity[] = [
  {
    name: "New River Rafting (Lower New)",
    category: "water",
    difficulty: "Class III-IV (moderate)",
    duration: "Half-day or full-day trips",
    ageMin: 12,
    description: "Guided rafting trips on the Lower New River. Most popular activity.",
    wvwoGear: ["water-sports", "clothing-water"]
  },
  {
    name: "Gauley River Rafting",
    category: "water",
    difficulty: "Class V (advanced)",
    duration: "Full-day trips (Sept-Oct only)",
    ageMin: 16,
    description: "Guided Gauley Season trips. Expert-level whitewater.",
    wvwoGear: ["water-sports", "clothing-water", "safety"]
  },
  {
    name: "Zip Line Canopy Tour",
    category: "aerial",
    difficulty: "Easy (no experience needed)",
    duration: "2-3 hours",
    ageMin: 10,
    description: "7-line canopy tour through New River Gorge forest.",
    wvwoGear: ["gloves", "closed-toe-shoes"]
  },
  {
    name: "Guided Rock Climbing",
    category: "land",
    difficulty: "Beginner to Advanced",
    duration: "Half-day or full-day",
    ageMin: 8,
    description: "Guided climbing trips to New River Gorge crags. Gear provided.",
    wvwoGear: ["climbing-shoes", "chalk-bag", "gloves"]
  },
  {
    name: "ATV Tours",
    category: "land",
    difficulty: "Easy to Moderate",
    duration: "1-2 hours",
    ageMin: 16 (driver), 6 (passenger),
    description: "Guided ATV tours on resort trails.",
    wvwoGear: ["gloves", "eye-protection"]
  },
  {
    name: "Paintball",
    category: "family",
    difficulty: "All levels",
    duration: "2 hours",
    ageMin: 10,
    description: "Paintball fields with rental equipment.",
    wvwoGear: ["protective-gloves", "layers"]
  },
  {
    name: "Fishing",
    category: "family",
    difficulty: "All levels",
    duration: "Self-guided",
    ageMin: "All ages",
    description: "Fishing on resort ponds and New River access.",
    wvwoGear: ["fishing"]
  }
];

```

### Package Deals Data

```typescript
interface Package {
  name: string;
  activities: string[];
  duration: string;
  targetAudience: string;
}

const acePackages: Package[] = [
  {
    name: "Adventure Combo",
    activities: ["Rafting", "Zip line", "Climbing"],
    duration: "2 days",
    targetAudience: "Thrill-seekers"
  },
  {
    name: "Family Fun Package",
    activities: ["Rafting (easy trip)", "Zip line", "Paintball"],
    duration: "1-2 days",
    targetAudience: "Families with kids 10+"
  },
  {
    name: "Weekend Warrior",
    activities: ["Rafting", "ATV tour", "Climbing"],
    duration: "2-3 days",
    targetAudience: "Weekend adventurers"
  }
];

```

### Lodging Options Data

```typescript
interface Lodging {
  type: string;
  capacity: string;
  amenities: string[];
  priceRange: string;
}

const aceLodging: Lodging[] = [
  {
    type: "Cabins",
    capacity: "4-8 people",
    amenities: ["Full kitchen", "Bathrooms", "Porch"],
    priceRange: "$$ (moderate)"
  },
  {
    type: "Lodge Rooms",
    capacity: "2-4 people",
    amenities: ["Beds", "Shared bathrooms", "Common area"],
    priceRange: "$ (budget)"
  },
  {
    type: "Camping (tent sites)",
    capacity: "Varies",
    amenities: ["Fire pits", "Bathhouse", "Picnic tables"],
    priceRange: "$ (budget)"
  },
  {
    type: "Yurts",
    capacity: "4-6 people",
    amenities: ["Beds", "Electricity", "Nearby bathhouse"],
    priceRange: "$$ (moderate)"
  }
];

```

### Gear Category Mappings

```typescript
const gearMappingsByActivity = {
  rafting: [
    { category: "water-sports", products: ["pfd", "wetsuit", "splash-jacket", "river-shoes"] },
    { category: "gear", products: ["drybag"] }
  ],
  "zip-line": [
    { category: "clothing", products: ["gloves", "closed-toe-shoes"] }
  ],
  climbing: [
    { category: "climbing", products: ["climbing-shoes", "chalk-bag", "gloves"] }
  ],
  atv: [
    { category: "protective-gear", products: ["gloves", "goggles", "bandana"] }
  ],
  fishing: [
    { category: "fishing", products: ["wv-fishing-license", "tackle", "rod-reel"] }
  ]
};

```

## Kim's Voice Guidelines for ACE Adventure Resort

**Tone**: Informative and neutral. WVWO sells gear, not trips - no pushy sales language.

**Approved phrases**:

```
"ACE is Oak Hill's big adventure resort. They run guided trips on the New and Gauley."
"If you're booking with ACE, come see us first for gear. Wetsuits, drybags, PFDs - we've got you covered."
"ACE does the guiding. We do the outfitting. Stop by on your way - we're 30 minutes north."
"They've got everything from family rafting to Gauley Class V trips. Know your limits."
"ACE provides rafts and guides. Bring your own gear or rent from them - your call. We stock the basics."

```

**Forbidden phrases**:

```
NEVER: "Book your ultimate adventure!", "Experience the thrill of a lifetime!", "Don't miss out!", "Limited availability!"

```

**Disclaimer messaging**:

```
"ACE Adventure Resort is a separate business. We provide outdoor gear - book activities directly with them at aceraft.com."

```

## Content Blocks (Resort Template Sections)

### Hero Block
**Image**: Action shot (rafting, zip line, or climbing at ACE)
**Headline**: "ACE Adventure Resort: New River Gorge's Activity Hub"
**Subhead**: "Guided rafting, zip lines, climbing, ATVs, and more. 55 minutes from our shop."
**CTA**: "Shop Gear for Your Trip" (links to WVWO categories, NOT ACE booking)

### Activity Grid Block
**Component**: `<ActivityGrid activities={aceActivities} categories={["Water", "Aerial", "Land", "Family"]} />`
**Content**: Cards for each activity with difficulty, duration, age minimum, gear needs
**Gear callouts**: Each card links to relevant WVWO gear categories
**Kim's note per category**:
- Water: *"Rafting season is March-November. Wetsuit recommended spring/fall."*
- Aerial: *"Zip line's the easiest adventure - no experience needed."*
- Land: *"Climbing trips are guided. Bring your own shoes or rent theirs."*

### Package Deals Block
**Component**: `<PackageCards packages={acePackages} />`
**Content**: Pre-built combo packages (Adventure Combo, Family Fun, Weekend Warrior)
**Note**: "Packages booked through ACE. Gear available at WVWO."

### Lodging Options Block
**Component**: `<LodgingGrid options={aceLodging} />`
**Content**: Cabins, lodge rooms, camping, yurts
**Kim's note**: *"ACE has lodging on-site. Book direct with them. We're 30 min north if you need last-minute gear."*

### Gear Recommendations Block
**Component**: `<GearListByActivity activities={["Rafting", "Zip Line", "Climbing", "ATV", "Fishing"]} />`
**Content**: Activity-specific gear with WVWO product links
**Kim's note**: *"ACE provides rafts, ropes, and guides. You bring personal gear - PFDs, wetsuits, shoes, drybags. We stock all of it."*

### Access & Logistics Block
**Content**:
- Drive time from WVWO shop: 55 min via US-19 S
- ACE location: Oak Hill, WV (near New River Gorge Bridge)
- Booking: Online reservations required (aceraft.com)
- Season: Year-round (some activities seasonal)
**CTA**: "Stop by WVWO on your way - we're on US-19"

### Local Knowledge Block
**Kim's voice**:

```
"ACE is the big name in Oak Hill for guided adventures. They've been running trips
on the New and Gauley for decades. Solid outfit, good guides.

If you're booking with ACE, come see us first. We're 30 minutes north on US-19 -
you'll drive right past us. Wetsuit, drybag, PFD, river shoes - we stock everything
you'd want to bring on a trip.

ACE provides rafts, guides, helmets, and PFDs for their trips. But a lot of folks
prefer their own wetsuit (better fit), drybag (keep phones/wallets dry), and shoes
(rental shoes are hit-or-miss). That's where we come in.

Their Lower New rafting trip is perfect for first-timers - Class III-IV, half-day
or full-day options. Gauley trips (Sept-Oct only) are serious Class V. Don't book
Gauley unless you're confident on Class III-IV first.

Zip line tour is the easiest adventure - no experience needed, ages 10+. Great for
families or folks who want views without the whitewater intensity.

Climbing trips are guided to New River Gorge crags. They provide ropes and harnesses.
Bring your own shoes if you have them - better fit, better climbing.

ACE has on-site lodging (cabins, lodge, camping, yurts). Book lodging and activities
direct with them at aceraft.com. We're just here for gear. Grand love ya."

```

### Disclaimer Block (Prominent)
**Content**:

```
**Not Affiliated**: ACE Adventure Resort is a separate business. WV Wild Outdoors provides
outdoor gear and equipment. To book activities or lodging, visit aceraft.com or call ACE directly.
We're happy to outfit you with gear for your trip - stop by the shop on your way!

```

## Schema.org Markup (Dual Types)


```typescript
const aceSchema = {
  "@context": "https://schema.org",
  "@type": ["TouristAttraction", "LodgingBusiness"],
  "name": "ACE Adventure Resort",
  "description": "Commercial adventure resort in Oak Hill, WV offering guided rafting, zip lines, rock climbing, ATV tours, paintball, fishing, and on-site lodging.",
  "image": "https://wvwildoutdoors.com/images/destinations/ace-adventure-resort-hero.jpg",
  "url": "https://wvwildoutdoors.com/destinations/ace-adventure-resort",
  "sameAs": "https://aceraft.com", // Link to official ACE site
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Oak Hill",
    "addressRegion": "WV",
    "postalCode": "25901"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 38.0573,
    "longitude": -81.1381
  },
  "isAccessibleForFree": false,
  "publicAccess": true,
  "touristType": ["adventure seekers", "families", "groups", "rafters", "climbers"]
};

```

## Swarm Coordination Hooks

### Pre-Task (All Agents)

```bash
npx claude-flow@alpha hooks pre-task --description "SPEC-33 ACE Adventure Resort: [agent-role] [task-name]"
npx claude-flow@alpha hooks session-restore --session-id "swarm-ace-adventure"

```

### Scout Memory Storage

```bash
# Scout 1 stores resort official info
npx claude-flow@alpha hooks post-edit --memory-key "swarm/ace/scout1-official" --file "resort-data.json"

# Scout 2 stores activity details
npx claude-flow@alpha hooks post-edit --memory-key "swarm/ace/scout2-activities" --file "activities-breakdown.json"

# Scout 3 stores lodging/logistics
npx claude-flow@alpha hooks post-edit --memory-key "swarm/ace/scout3-logistics" --file "lodging-booking.json"

```

### Queen Synthesis

```bash
npx claude-flow@alpha hooks session-restore --session-id "swarm-ace-adventure"

```

### Planner Memory Storage

```bash
# Planner 1 stores content architecture
npx claude-flow@alpha hooks post-edit --memory-key "swarm/ace/plan-content" --file "resort-content-outline.md"

# Planner 2 stores technical architecture
npx claude-flow@alpha hooks post-edit --memory-key "swarm/ace/plan-technical" --file "activity-grid-design.json"

```

### Coder Implementation

```bash
npx claude-flow@alpha hooks session-restore --session-id "swarm-ace-adventure"
npx agentdb@latest reflexion store "wvwo-session" "ace-adventure-resort-page" 1.0 true "Resort template with ActivityGrid (4 categories: water/aerial/land/family), PackageCards, LodgingGrid, ExternalBookingCTA with disclaimer, Kim's neutral informative voice (gear-focused, not trip-selling), dual schema types, gear category mappings per activity"

```

### Post-Task (All Agents)

```bash
npx claude-flow@alpha hooks post-task --task-id "spec-33-ace-[agent-role]"
npx claude-flow@alpha hooks session-end --export-metrics true

```

## Success Criteria

### Content Quality
- [ ] Kim's voice authentic (informative, neutral, gear-focused)
- [ ] Zero AI slop ("ultimate adventure", "thrill of a lifetime", etc.)
- [ ] Clear WVWO/ACE separation (disclaimer prominent)
- [ ] Activity breakdown accurate (difficulty, age, duration)
- [ ] Gear recommendations match WVWO inventory (not ACE rentals)

### Technical Quality
- [ ] Passes WVWO aesthetic checklist
- [ ] Mobile-responsive activity grid (375px width)
- [ ] Schema.org dual-type validation (TouristAttraction + LodgingBusiness)
- [ ] Drive time accurate (55 min from shop)
- [ ] Images optimized (WebP, lazy load, <200KB each)
- [ ] Load time <2s on 3G
- [ ] External links to ACE site (clear, not pushy)

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
4. **Planner 1**: Design resort content architecture (activity categorization)
5. **Planner 2**: Design technical architecture (ActivityGrid, ExternalBookingCTA)
6. **Coder**: Implement page with disclaimer (read both planner outputs)
7. **Queen**: Review implementation, store success pattern

**Total messages**: ~8-10

## AgentDB Pattern Storage

After successful implementation:

```bash
npx agentdb@latest reflexion store "wvwo-session" "ace-resort-commercial" 1.0 true "Commercial adventure resort template with hierarchical swarm. ActivityGrid component (4 categories: water/aerial/land/family, 7 activities total), PackageCards for combo deals, LodgingGrid (cabins/lodge/camping/yurts), ExternalBookingCTA with prominent disclaimer (WVWO sells gear, not trips). Kim's neutral informative voice, gear-focused messaging, no pushy sales language. Dual schema.org types (TouristAttraction + LodgingBusiness). Gear category mappings per activity (rafting, zip line, climbing, ATV, fishing). 55min drive from shop."

```

**Reusable for**: Other commercial resorts/outfitters, guided tour operators, adventure businesses where WVWO is gear provider (not trip seller)
