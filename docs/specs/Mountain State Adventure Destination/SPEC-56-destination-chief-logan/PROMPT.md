# SPEC-56: Chief Logan State Park Destination Page - Swarm Implementation Prompt

## Objective
Create `/destinations/chief-logan` page using hierarchical swarm coordination with WebSearch research, AgentDB pattern learning, and state park template implementation (wildlife exhibits + amphitheater + Logan County history).

## Swarm Architecture

**Topology**: Hierarchical (1 queen → 3 scouts → 2 planners → 1 coder)

### Queen Agent (Coordinator)
**Role**: Orchestrate research → planning → implementation for family park with wildlife exhibits and cultural amphitheater
**Responsibilities**:
- Initialize swarm memory namespace `swarm/chief-logan`
- Assign tasks to scouts (state park official, wildlife exhibits/nature center, amphitheater/trails)
- Synthesize scout findings for planners
- Approve final implementation from coder
- Store success patterns in AgentDB

### Scout Agents (3 Parallel Researchers)

#### Scout 1: State Park Official Information
**Research targets**:
```bash
WebSearch("Chief Logan State Park official WV 2025")
WebSearch("Chief Logan State Park Logan County camping lodge")
WebSearch("Chief Logan State Park fees hours regulations")
```

**AgentDB retrieval**:
```bash
npx agentdb@latest reflexion retrieve "state park official information" --k 10 --synthesize-context
npx agentdb@latest skill search "state park family amenities" 5
```

**Deliverables**:
- Official WV State Parks URLs
- Park amenities (camping, cabins, lodge, pool)
- Entry fees (day-use free for WV residents)
- Operating hours (year-round park)
- Regulations (pets, camping, trails)

#### Scout 2: Wildlife Exhibits & Nature Center
**Research targets**:
```bash
WebSearch("Chief Logan State Park wildlife exhibits museum")
WebSearch("Chief Logan nature center animal exhibits educational")
WebSearch("Chief Logan State Park buffalo white-tailed deer")
```

**AgentDB retrieval**:
```bash
npx agentdb@latest reflexion retrieve "wildlife exhibits nature center educational" --k 10 --filters '{"success":true}'
npx agentdb@latest recall with-certificate "family educational attraction" 12
```

**Deliverables**:
- Wildlife exhibits (buffalo, white-tailed deer, native animals)
- Nature center details (educational programs, exhibits)
- Family-friendly educational emphasis
- Photography opportunities (wildlife viewing)

#### Scout 3: Amphitheater, Trails & Logan County History
**Research targets**:
```bash
WebSearch("Chief Logan State Park amphitheater outdoor theater events")
WebSearch("Chief Logan State Park hiking trails Guyandotte Beauty Trail")
WebSearch("Chief Logan history Logan County WV cultural significance")
```

**AgentDB retrieval**:
```bash
npx agentdb@latest reflexion retrieve "amphitheater trails cultural history" --k 10
npx agentdb@latest skill search "hiking trails state park" 5
```

**Deliverables**:
- Amphitheater (outdoor theater, events, Hatfield-McCoy drama)
- Hiking trails (Guyandotte Beauty Trail, nature trails)
- Logan County history (coal heritage, Chief Logan namesake)
- Cultural events and programming

### Planner Agents (2 Sequential Architects)

#### Planner 1: Content Architecture
**Input**: Synthesized scout findings from queen
**Template**: State park template (`docs/templates/destination-state-park.md`)

**AgentDB retrieval**:
```bash
npx agentdb@latest reflexion retrieve "state park family wildlife template" --k 10 --synthesize-context
npx agentdb@latest reflexion retrieve "WVWO voice Kim authentic" --k 10 --only-successes
```

**Responsibilities**:
1. Map scout data to state park template sections
2. Design hero content (wildlife exhibits or family camping imagery)
3. Plan wildlife/nature center as primary draw, amphitheater as secondary
4. Structure trail system (family-friendly nature walks)
5. Voice design: Family-friendly, educational emphasis, Logan County pride

**Deliverables**:
- Content outline with state park template headers
- Hero messaging ("Chief Logan: Wildlife, Camping & Logan County History")
- Wildlife exhibits details (buffalo, deer, native animals)
- Amphitheater content (outdoor theater, events)
- Kim's voice snippets (family camping, educational, local pride)
- Gear callout placements (camping gear, hiking gear)

#### Planner 2: Technical Architecture
**Input**: Content architecture from Planner 1

**AgentDB retrieval**:
```bash
npx agentdb@latest reflexion retrieve "state park wildlife exhibits page" --k 10 --filters '{"success":true}'
npx agentdb@latest skill search "wildlife nature center photo gallery" 5
```

**Responsibilities**:
1. Component selection (WildlifeExhibits, TrailList, Amphitheater, FamilyCamping)
2. Data structure design (wildlife info, trails, events, amenities)
3. Schema.org markup (StateOrProvincialPark type)
4. Drive time calculation (from 38.5858, -80.8581 to Logan ~2 hours)
5. Responsive layout (mobile wildlife photos emphasis)
6. Image strategy (buffalo, deer, amphitheater, trails)

**Deliverables**:
- Component tree with wildlife/family focus
- JSON data structure (wildlife, trails, amphitheater, camping)
- Schema markup template (StateOrProvincialPark)
- Performance budget (wildlife photos lazy load)

### Coder Agent (Implementation)
**Input**: Content + technical architecture from planners

**AgentDB retrieval**:
```bash
npx agentdb@latest reflexion retrieve "state park wildlife implementation" --k 15 --synthesize-context
npx agentdb@latest reflexion retrieve "WVWO aesthetic family educational" --k 10 --only-successes
```

**Responsibilities**:
1. Implement `/wv-wild-web/src/pages/destinations/chief-logan.astro`
2. Create WildlifeExhibits component (buffalo, deer, nature center)
3. Apply WVWO aesthetic (earthy tones, sign-green for trails, brand-brown for wildlife)
4. Implement schema markup
5. Optimize images (wildlife, amphitheater, trails, WebP)
6. Add gear category links (camping gear, hiking gear, binoculars)

**Quality gates**:
- Pass WVWO aesthetic checklist
- Kim's voice authentic (family camping, educational, Logan County pride)
- Mobile-responsive (375px width)
- Schema.org validation
- Load time <2s on 3G

**Deliverables**:
- Complete `.astro` page file
- WildlifeExhibits component
- Amphitheater component
- Image optimization report

## Data Requirements

### Geographic Data
**Shop coordinates**: `38.5858, -80.8581` (Birch River, WV)
**Destination coordinates**: `37.8506, -81.9945` (Logan, WV - Chief Logan State Park)
**Drive time**: ~2 hours via US-119 S
**Distance**: ~90 miles

### Wildlife Exhibits Data
```typescript
interface WildlifeExhibit {
  name: string;
  species: string[];
  viewingInfo: string;
  educational: boolean;
}

const chiefLoganWildlife: WildlifeExhibit = {
  name: "Chief Logan Wildlife Exhibits",
  species: ["American bison (buffalo)", "White-tailed deer", "Native WV wildlife"],
  viewingInfo: "Viewing areas near nature center, free with park entry",
  educational: true
};
```

### State Park Amenities Data
```typescript
const chiefLoganAmenities = {
  lodging: [
    { type: "Camping", sites: "25 campsites", features: ["Electric hookups", "Bathhouse", "Picnic tables"] },
    { type: "Cabins", count: "4 standard cabins", features: ["Full kitchen", "Bathroom", "Air conditioning"] },
    { type: "Logan Lodge", rooms: "Restaurant", features: ["Meeting space", "Gift shop"] }
  ],
  recreation: [
    { type: "Pool", season: "Memorial Day - Labor Day" },
    { type: "Amphitheater", capacity: "1,500 seats", events: "Hatfield-McCoy drama, concerts" },
    { type: "Game courts", activities: ["Tennis", "Basketball", "Volleyball"] }
  ],
  natureCenter: "Wildlife exhibits, educational programs, nature trails"
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

const chiefLoganTrails: Trail[] = [
  {
    name: "Guyandotte Beauty Trail",
    length: "3 mi loop",
    difficulty: "Moderate",
    highlights: ["Scenic views", "Forest trail", "Wildlife viewing"]
  },
  {
    name: "Nature Center Loop",
    length: "0.5 mi",
    difficulty: "Easy (family-friendly)",
    highlights: ["Wildlife exhibits", "Educational signs", "Paved sections"]
  }
];
```

### Gear Category Mappings
```typescript
const gearMappings = {
  camping: [
    { category: "camping", products: ["tent", "sleeping-bag", "camp-stove"] }
  ],
  hiking: [
    { category: "hiking", products: ["day-pack", "trekking-poles", "hiking-boots"] }
  ],
  wildlife: [
    { category: "gear", products: ["binoculars", "camera", "field-guide"] }
  ]
};
```

## Kim's Voice Guidelines for Chief Logan

**Tone**: Family-friendly, educational emphasis, Logan County pride.

**Approved phrases**:
```
"Chief Logan is a great family park - camping, wildlife exhibits, pool for the kids. Logan County treasure."
"Buffalo and deer exhibits by the nature center. Kids love seeing the buffalo up close. Educational programs too."
"Guyandotte Beauty Trail is a nice 3-mile loop. Moderate hike, forest views, wildlife watching."
"Amphitheater hosts the Hatfield-McCoy drama in summer. Outdoor theater under the stars."
"Cabins sleep 4-6, camping sites have electric. Good base camp for exploring Logan County."
```

**Forbidden phrases**:
```
NEVER: "Immersive wildlife experience", "Premier family destination", "Unforgettable outdoor theater"
```

**Logan County integration**:
```
"Chief Logan is named for the Mingo leader. Park celebrates Logan County history and heritage."
```

## Content Blocks (State Park Template Sections)

### Hero Block
**Image**: Buffalo at wildlife exhibit or family camping scene
**Headline**: "Chief Logan: Wildlife, Camping & Logan County History"
**Subhead**: "Buffalo and deer exhibits, amphitheater, family camping. 2 hours from our shop."
**CTA**: "Shop Camping Gear"

### Wildlife Exhibits Block (Primary Highlight)
**Component**: `<WildlifeExhibits wildlife={chiefLoganWildlife} />`
**Content**:
- American bison (buffalo) viewing
- White-tailed deer exhibits
- Nature center educational programs
- Native WV wildlife
- Free with park entry
**Kim's note**: *"Buffalo exhibits are the highlight. Kids can see American bison up close. Nature center has good educational programs."*

### Amphitheater Block
**Component**: `<Amphitheater info={chiefLoganAmphitheater} />`
**Content**:
- 1,500-seat outdoor theater
- Hatfield-McCoy drama (seasonal)
- Summer concerts and events
- Under-the-stars performances
**Kim's note**: *"Amphitheater hosts the Hatfield-McCoy drama in summer. Good outdoor theater. Check wvstateparks.com for schedule."*

### Trail System Block
**Component**: `<TrailList trails={chiefLoganTrails} />`
**Content**: Guyandotte Beauty Trail (3 mi moderate loop), Nature Center Loop (0.5 mi easy)
**Kim's note**: *"Guyandotte Beauty Trail is a solid 3-mile hike. Moderate difficulty, forest views, wildlife watching."*

### Family Camping & Amenities Block
**Content**:
- Camping: 25 sites with electric hookups
- Cabins: 4 standard cabins (sleep 4-6)
- Logan Lodge restaurant
- Pool (Memorial Day - Labor Day)
- Game courts (tennis, basketball, volleyball)
**Gear callouts**: Camping gear (tents, sleeping bags, camp stoves)
**Kim's note**: *"Chief Logan is a great family camping park. Electric sites, bathhouse, pool for the kids. Cabins if you prefer beds."*

### Access & Logistics Block
**Content**:
- Drive time from WVWO shop: 2 hours via US-119 S
- Location: Logan County (southern WV)
- Entry fees: Day-use free (WV residents), camping/cabin fees apply
- Lodging: Reserve via wvstateparks.com
- Cell service: Good (near Logan)
**CTA**: "Stop by for camping gear and Logan County hiking tips"

### Local Knowledge Block
**Kim's voice**:
```
"Chief Logan is Logan County's state park - family camping, wildlife exhibits, amphitheater.
It's a 2-hour drive south on US-119. Good weekend destination if you're camping with kids.

Buffalo and deer exhibits are near the nature center. Kids love the buffalo - you can get
close to the fence and watch them graze. Nature center has educational programs and exhibits
about WV wildlife. Free with park entry.

Camping has 25 sites with electric hookups. Bathhouse, picnic tables, fire rings. Not fancy,
but clean and family-friendly. If you want a roof, 4 cabins sleep 4-6 people. Full kitchen,
bathroom, air conditioning. Book ahead for summer weekends.

Pool is open Memorial Day through Labor Day. Game courts for tennis, basketball, volleyball.
Good for kids to burn energy after a hike.

Amphitheater seats 1,500 people. Hosts the Hatfield-McCoy drama in summer - outdoor theater
about the famous feud. Check wvstateparks.com for show schedule. Also summer concerts.

Guyandotte Beauty Trail is the main hiking loop - 3 miles, moderate difficulty. Forest trail,
scenic views, wildlife watching. Nature Center Loop is shorter and easier (0.5 mi) if you've
got little ones.

Logan Lodge has a restaurant and gift shop. Decent food, meeting space for groups.

Chief Logan is named for the Mingo leader who lived in the area. Park celebrates Logan County
history and heritage. Good family park - camping, wildlife, outdoor theater.

We're 2 hours north. Stop by before you head down for camping gear, hiking gear, or just to
grab a WV topo map. Grand love ya."
```

## Schema.org Markup

```typescript
const chiefLoganSchema = {
  "@context": "https://schema.org",
  "@type": "StateOrProvincialPark",
  "name": "Chief Logan State Park",
  "description": "West Virginia state park featuring wildlife exhibits (buffalo, deer), amphitheater (Hatfield-McCoy drama), family camping, nature trails, and Logan County cultural heritage. Located in Logan.",
  "image": "https://wvwildoutdoors.com/images/destinations/chief-logan-hero.jpg",
  "url": "https://wvwildoutdoors.com/destinations/chief-logan",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Logan",
    "addressRegion": "WV",
    "postalCode": "25601"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 37.8506,
    "longitude": -81.9945
  },
  "isAccessibleForFree": true, // Day-use free, camping/cabins have fees
  "publicAccess": true,
  "touristType": ["families", "campers", "wildlife enthusiasts", "theater-goers"]
};
```

## Swarm Coordination Hooks

### Pre-Task (All Agents)
```bash
npx claude-flow@alpha hooks pre-task --description "SPEC-56 Chief Logan: [agent-role] [task-name]"
npx claude-flow@alpha hooks session-restore --session-id "swarm-chief-logan"
```

### Scout Memory Storage
```bash
npx claude-flow@alpha hooks post-edit --memory-key "swarm/chief-logan/scout1-park" --file "park-data.json"
npx claude-flow@alpha hooks post-edit --memory-key "swarm/chief-logan/scout2-wildlife" --file "wildlife-exhibits.json"
npx claude-flow@alpha hooks post-edit --memory-key "swarm/chief-logan/scout3-trails" --file "amphitheater-trails.json"
```

### Planner Memory Storage
```bash
npx claude-flow@alpha hooks post-edit --memory-key "swarm/chief-logan/plan-content" --file "wildlife-park-outline.md"
npx claude-flow@alpha hooks post-edit --memory-key "swarm/chief-logan/plan-technical" --file "wildlife-component-design.json"
```

### Coder Implementation
```bash
npx agentdb@latest reflexion store "wvwo-session" "chief-logan-page" 1.0 true "State park template with WildlifeExhibits (buffalo, deer, nature center), Amphitheater (1,500 seats, Hatfield-McCoy drama), TrailList (Guyandotte Beauty 3mi, Nature Center 0.5mi), FamilyCamping (25 sites, 4 cabins, pool), Kim's family educational voice, Logan County pride, camping/hiking gear callouts"
```

## Success Criteria

### Content Quality
- [ ] Kim's voice authentic (family camping, educational, Logan County pride)
- [ ] Zero AI slop ("immersive wildlife", "premier destination", etc.)
- [ ] Wildlife exhibits accurate (buffalo, deer, nature center)
- [ ] Amphitheater content clear (Hatfield-McCoy drama, events)
- [ ] Gear recommendations match WVWO inventory (camping, hiking, binoculars)

### Technical Quality
- [ ] Passes WVWO aesthetic checklist
- [ ] Mobile-responsive (375px width)
- [ ] Schema.org validation (StateOrProvincialPark)
- [ ] Drive time accurate (2 hours from shop)
- [ ] Images optimized (wildlife, amphitheater, trails, WebP, <200KB each)
- [ ] Load time <2s on 3G

### Swarm Coordination
- [ ] All scouts completed research in parallel
- [ ] Queen successfully synthesized findings
- [ ] Planners built on scout data
- [ ] Coder implemented wildlife exhibits component
- [ ] Success pattern stored in AgentDB

## Implementation Order

1. **Queen**: Initialize swarm, assign scout tasks (single message with 3 Task calls)
2. **Scouts 1-3**: Execute research in parallel (WebSearch + AgentDB retrieval)
3. **Queen**: Retrieve scout findings, synthesize for planners
4. **Planner 1**: Design state park content architecture (wildlife/family focus)
5. **Planner 2**: Design technical architecture (WildlifeExhibits, Amphitheater components)
6. **Coder**: Implement page with wildlife component (read both planner outputs)
7. **Queen**: Review implementation, store success pattern

**Total messages**: ~8-10

## AgentDB Pattern Storage

After successful implementation:
```bash
npx agentdb@latest reflexion store "wvwo-session" "chief-logan-wildlife-family-park" 1.0 true "State park template with hierarchical swarm. WildlifeExhibits component (buffalo/deer viewing, nature center educational programs), Amphitheater (1,500-seat outdoor theater, Hatfield-McCoy drama seasonal), TrailList (Guyandotte Beauty 3mi moderate, Nature Center 0.5mi easy family), FamilyCamping (25 electric sites, 4 cabins, pool Memorial-Labor Day, game courts). Kim's family-friendly educational voice, Logan County cultural pride emphasis. 2hr drive from shop. Gear mappings (camping/hiking/binoculars)."
```

**Reusable for**: Other state parks with wildlife exhibits, family camping parks, amphitheater/cultural attractions
