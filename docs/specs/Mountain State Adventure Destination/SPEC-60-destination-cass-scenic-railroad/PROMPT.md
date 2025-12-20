# SPEC-60: Cass Scenic Railroad State Park Destination Page - Swarm Implementation Prompt

## Objective
Create `/destinations/cass-scenic-railroad` page using hierarchical swarm coordination with WebSearch research, AgentDB pattern learning, and state park template implementation (historic steam railroad + Bald Knob summit + company town + railroad museum).

## Swarm Architecture
**Topology**: Hierarchical (1 queen → 3 scouts → 2 planners → 1 coder)

### Queen Agent: Orchestrate research → planning → implementation for historic steam railroad mountain experience
### Scout 1: State park official info (Cass Railroad, fees, hours, reservations)
### Scout 2: Steam railroad & excursions (Bald Knob summit ride, Whittaker Station, historic Shay locomotives)
### Scout 3: Company town & museum (historic logging town, railroad museum, company houses lodging)

## Data Requirements

### Geographic Data
**Shop coordinates**: `38.5858, -80.8581` (Birch River, WV)
**Destination coordinates**: `38.3714, -79.9192` (Cass, WV)
**Drive time**: ~1 hour via US-219 S
**Distance**: ~45 miles

### Railroad Excursion Data
```typescript
const cassRailroadExcursions = [
  {
    name: "Bald Knob Summit Trip",
    duration: "4.5 hours roundtrip",
    destination: "Bald Knob (4,842 ft elevation - second highest point in WV)",
    features: ["Historic Shay steam locomotive", "11-mile climb", "Mountain summit views", "Picnic at summit"],
    season: "Late May - October",
    reservations: "Required (wvstateparks.com)"
  },
  {
    name: "Whittaker Station Trip",
    duration: "2 hours roundtrip",
    destination: "Whittaker Station (halfway to Bald Knob)",
    features: ["Shorter excursion", "Family-friendly", "Historic logging camp site"],
    season: "Late May - October"
  }
];

const cassLocomotives = {
  type: "Shay steam locomotives",
  history: "Geared steam engines designed for steep mountain logging railroads",
  count: "Multiple operational Shays (largest fleet in North America)",
  unique: "Rare operational logging locomotives"
};
```

### Company Town & Lodging Data
```typescript
const cassCompanyTown = {
  history: "Preserved 1900s lumber company town",
  lodging: {
    companyHouses: "24 restored company houses (sleep 4-10)",
    features: ["Full kitchens", "Period furnishings", "Modern bathrooms", "Porches"],
    reservations: "Book via wvstateparks.com (popular - book early)"
  },
  museum: "Cass Railroad Museum (logging history, equipment exhibits)",
  companyStore: "Restored company store (gifts, railroad memorabilia)",
  walkableTown: "Entire town is walkable historic district"
};
```

## Kim's Voice Guidelines

**Tone**: Historic railroad experience, mountain summit adventure, unique logging heritage.

**Approved phrases**:
```
"Cass is a working steam railroad - rides to Bald Knob summit on historic Shay locomotives. Unique WV experience."
"Bald Knob trip is 4.5 hours - 11-mile climb to second highest point in WV. Steam engine chugs up the mountain."
"Cass town is preserved 1900s lumber company town. Stay in restored company houses - full kitchens, period charm."
"Shay locomotives are geared steam engines designed for steep mountain logging. Cass has the largest fleet in North America."
"Whittaker Station trip is shorter (2 hours) if you've got young kids. Still gets you the steam railroad experience."
```

**Forbidden phrases**:
```
NEVER: "Magical train journey", "Ultimate steam railroad adventure", "Step back in time experience"
```

## Content Blocks

### Hero Block
**Headline**: "Cass Scenic Railroad: Steam Train to Bald Knob Summit"
**Subhead**: "Historic Shay locomotives, 4,842 ft mountain summit, preserved logging town. 1 hour from our shop."
**CTA**: "Shop Hiking Gear for Summit Picnic"

### Railroad Excursions Block (Primary Highlight)
**Component**: `<RailroadExcursions excursions={cassRailroadExcursions} locomotives={cassLocomotives} />`
**Kim's note**: *"Bald Knob trip is the highlight - 4.5-hour roundtrip to the second highest point in WV. Shay locomotive chugs up 11 miles of steep grade. Picnic at the summit. Reservations required."*

### Company Town & Lodging Block
**Component**: `<CompanyTown town={cassCompanyTown} />`
**Kim's note**: *"Stay in restored company houses - 1900s lumber town. Full kitchens, period furnishings, modern bathrooms. Book early - they fill up fast."*

### Railroad Museum Block
**Component**: `<RailroadMuseum museum={cassCompanyTown.museum} />`
**Kim's note**: *"Railroad museum has logging history and equipment exhibits. Company store sells railroad memorabilia and gifts."*

### Local Knowledge (Kim's voice)
```
"Cass is a working steam railroad and preserved lumber company town. It's 1 hour south on US-219.

Bald Knob summit trip is the main draw - 4.5-hour roundtrip ride to 4,842 feet elevation (second
highest point in West Virginia). Historic Shay steam locomotive pulls you up 11 miles of steep
mountain grade. Slow climb - you can hear the engine working. Picnic stop at the summit with
views. Late May through October season. Reservations required (wvstateparks.com) - book early.

Whittaker Station trip is shorter - 2 hours roundtrip, halfway to Bald Knob. Good if you've got
young kids or less time. Still gets you the steam railroad experience.

Shay locomotives are rare - geared steam engines designed for steep logging railroads. Cass has
the largest operational Shay fleet in North America. Living railroad history.

Cass town is a preserved 1900s lumber company town. Stay in 24 restored company houses (sleep
4-10 people). Full kitchens, period furnishings, modern bathrooms, porches. Book via
wvstateparks.com - popular lodging, reserve early.

Railroad museum has logging history exhibits and equipment. Company store sells gifts and
railroad memorabilia. Entire town is walkable historic district.

Pack layers for summit trip - temperature drops at 4,800 feet. Bring picnic lunch for summit stop.

We're 1 hour north. Stop by for layers, day packs, or just to talk about the Cass railroad.
Grand love ya."
```

## Schema.org Markup
```typescript
const cassSchema = {
  "@context": "https://schema.org",
  "@type": "StateOrProvincialPark",
  "name": "Cass Scenic Railroad State Park",
  "description": "Historic steam railroad with Shay locomotives, Bald Knob summit excursions (4,842 ft), preserved 1900s lumber company town, railroad museum. Located in Cass, Pocahontas County.",
  "touristType": ["railroad enthusiasts", "families", "history buffs", "mountain summit seekers"]
};
```

## AgentDB Pattern Storage
```bash
npx agentdb@latest reflexion store "wvwo-session" "cass-scenic-railroad-summit-park" 1.0 true "State park template with hierarchical swarm. RailroadExcursions component (Bald Knob 4.5hr summit trip 4842ft second-highest-WV, Shay steam locomotives largest operational fleet North America, Whittaker Station 2hr shorter trip, reservations required late-May-Oct), CompanyTown (24 restored 1900s lumber company houses sleep 4-10 full kitchens period furnishings), RailroadMuseum (logging history equipment exhibits, company store). Kim's historic-railroad mountain-summit voice, Pocahontas County. 1hr drive US-219. Gear mappings (layers/picnic/day-packs)."
```

**Reusable for**: Other historic railroad destinations, mountain summit excursions, company town historic sites
