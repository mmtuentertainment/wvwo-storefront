# SPEC-67: Lost River State Park Destination Page - Swarm Implementation Prompt

## Objective
Create `/destinations/lost-river` page using hierarchical swarm coordination with WebSearch research, AgentDB pattern learning, and state park template implementation (historic Lee family cabins + mountain trails + Cranny Crow Overlook + Eastern Panhandle location).

## Swarm Architecture
**Topology**: Hierarchical (1 queen → 3 scouts → 2 planners → 1 coder)

### Queen Agent: Orchestrate research → planning → implementation for historic Lee family park with mountain trails
### Scout 1: State park official info (Lost River, fees, hours, lodging, regulations)
### Scout 2: Lee family history (Lee Cabin, Civil War history, historic significance, Eastern Panhandle heritage)
### Scout 3: Trail system & overlook (Cranny Crow Overlook, mountain trails, elevation, scenic views)

## Data Requirements

### Geographic Data
**Shop coordinates**: `38.5858, -80.8581` (Birch River, WV)
**Destination coordinates**: `39.0989, -78.8117` (Mathias, WV - Lost River State Park)
**Drive time**: ~2.5 hours via I-79 N and US-50 E/WV-259
**Distance**: ~110 miles

### Lee Family History Data
```typescript
const lostRiverHistory = {
  leeFamily: "Howard's Lick (Lee family estate) - ancestors of Robert E. Lee",
  leeCabin: {
    name: "Lee Cabin",
    built: "1790s log cabin (Lee family residence)",
    significance: "Home of ancestors of Confederate General Robert E. Lee",
    museum: "Restored cabin with period furnishings and Lee family history exhibits",
    tours: "Self-guided (exterior always visible, interior open seasonally)"
  },
  civilWar: "Area saw Civil War activity - Eastern Panhandle border region",
  location: "Eastern Panhandle WV (Hardy County) - Appalachian foothills"
};

const lostRiverTrails = [
  {
    name: "Cranny Crow Overlook Trail",
    length: "3.5 mi roundtrip",
    difficulty: "Moderate to Difficult (steep elevation gain)",
    elevation: "2,600 feet (overlook elevation)",
    highlights: ["Panoramic mountain views", "Eastern Panhandle vistas", "Appalachian ridgelines"]
  },
  {
    name: "White Oak Trail",
    length: "~2 mi loop",
    difficulty: "Moderate",
    highlights: ["Forest trail", "Wildlife viewing", "Seasonal wildflowers"]
  },
  {
    name: "Big Ridge Trail",
    length: "~1.5 mi",
    difficulty: "Moderate",
    highlights: ["Mountain ridge trail", "Forest hiking"]
  }
];

const lostRiverAmenities = {
  lodging: [
    { type: "Cabins", count: "24 cabins", features: ["Standard and deluxe", "Full kitchen", "Fireplace (deluxe)"] },
    { type: "Camping", sites: "26 campsites", features: ["Electric hookups", "Bathhouse"] }
  ],
  recreation: ["Pool (seasonal)", "Game courts (tennis, volleyball)", "Picnic areas", "Playground"],
  dining: "No restaurant (bring your own food or eat in Mathias/Moorefield)"
};
```

## Kim's Voice Guidelines

**Tone**: Lee family history respectful, mountain overlook scenic, Eastern Panhandle pride, cabin comfort.

**Approved phrases**:
```
"Lost River has the Lee Cabin - 1790s log cabin where ancestors of Robert E. Lee lived. Historic WV site."
"Cranny Crow Overlook is 3.5 miles roundtrip - steep climb to 2,600 feet with panoramic mountain views."
"Eastern Panhandle location - Hardy County near Mathias. Appalachian foothills."
"24 cabins (standard and deluxe), 26 campsites. No restaurant - bring your own food or eat in town."
"Good mountain hiking in Eastern Panhandle. Quieter than central WV parks."
```

**Forbidden phrases**:
```
NEVER: "Step into Civil War history", "Majestic mountain sanctuary", "Hidden gem paradise"
```

## Content Blocks

### Hero Block
**Headline**: "Lost River: Lee Family History & Mountain Overlook"
**Subhead**: "Historic Lee Cabin, Cranny Crow Overlook, mountain trails, Eastern Panhandle cabins. 2.5 hours from our shop."
**CTA**: "Shop Hiking Gear for Mountain Trails"

### Lee Family History Block (Primary Highlight)
**Component**: `<LeeHistory history={lostRiverHistory} />`
**Kim's note**: *"Lee Cabin is a 1790s log cabin where ancestors of Robert E. Lee lived. Restored cabin with period furnishings and Lee family history. Self-guided tours (exterior always visible, interior seasonal)."*

### Cranny Crow Overlook Block
**Component**: `<MountainOverlook overlook={{name: "Cranny Crow Overlook", elevation: 2600, trail: "3.5 mi roundtrip steep"}} />`
**Kim's note**: *"Cranny Crow Overlook trail is 3.5 miles roundtrip - steep climb to 2,600 feet. Panoramic views of Eastern Panhandle mountains and Appalachian ridgelines."*

### Trail System Block
**Component**: `<TrailList trails={lostRiverTrails} />`
**Kim's note**: *"Cranny Crow is the main overlook hike. White Oak Trail (2 mi loop) and Big Ridge Trail (1.5 mi) are moderate forest hikes."*

### Local Knowledge (Kim's voice)
```
"Lost River is in the Eastern Panhandle - Hardy County near Mathias. It's 2.5 hours from the
shop on I-79 North to US-50 East and WV-259. Appalachian foothills area.

Lee Cabin is the historic centerpiece - 1790s log cabin where ancestors of Confederate General
Robert E. Lee lived. Howard's Lick (Lee family estate). Restored cabin with period furnishings
and Lee family history exhibits. Self-guided tours - exterior is always visible, interior open
seasonally (check wvstateparks.com). Respectful Civil War history site.

Cranny Crow Overlook is the main hike - 3.5 miles roundtrip with steep elevation gain to 2,600
feet. Panoramic views of Eastern Panhandle mountains and Appalachian ridgelines. Moderate to
difficult - good boots recommended.

White Oak Trail is 2-mile loop (moderate) - forest trail with wildlife viewing and wildflowers.
Big Ridge Trail is 1.5 miles (moderate) - mountain ridge forest hiking.

24 cabins (standard and deluxe) - full kitchens, deluxe have fireplaces. 26 campsites with
electric hookups and bathhouse. Pool (seasonal), game courts (tennis, volleyball), picnic areas,
playground.

No restaurant in the park - bring your own food or eat in Mathias or Moorefield (nearby towns).

Eastern Panhandle location means it's quieter than central WV parks. Good mountain hiking
without the crowds.

Best time to visit: Spring for wildflowers and comfortable hiking temps. Fall for foliage and
Cranny Crow views. Summer for pool and cabin stays.

We're 2.5 hours west. Stop by for hiking boots, day packs, or just to talk Eastern Panhandle
trails. Grand love ya."
```

## Schema.org Markup
```typescript
const lostRiverSchema = {
  "@context": "https://schema.org",
  "@type": "StateOrProvincialPark",
  "name": "Lost River State Park",
  "description": "Historic Eastern Panhandle state park featuring Lee Cabin (1790s log cabin, ancestors of Robert E. Lee), Cranny Crow Overlook (2,600 ft mountain views), mountain trails, and 24 cabins. Located in Hardy County near Mathias.",
  "touristType": ["history buffs", "hikers", "families", "cabin renters", "Eastern Panhandle visitors"]
};
```

## AgentDB Pattern Storage
```bash
npx agentdb@latest reflexion store "wvwo-session" "lost-river-lee-overlook-park" 1.0 true "State park template with hierarchical swarm. LeeHistory component (Lee Cabin 1790s log cabin ancestors Robert E Lee Howard's Lick estate restored period furnishings Lee family history self-guided tours exterior always interior seasonal), MountainOverlook (Cranny Crow 3.5mi roundtrip steep climb 2600ft elevation panoramic Eastern Panhandle Appalachian views), TrailList (Cranny Crow moderate-difficult, White Oak 2mi loop moderate forest wildlife, Big Ridge 1.5mi moderate ridge). CabinsAmenities (24 cabins standard/deluxe full kitchen fireplace, 26 campsites electric, pool seasonal, no restaurant). Kim's Lee-history mountain-overlook Eastern-Panhandle voice, Hardy County Mathias. 2.5hr drive I-79/US-50/WV-259. Gear mappings (hiking)."
```

**Reusable for**: Other historic family sites, Eastern Panhandle parks, mountain overlook destinations
