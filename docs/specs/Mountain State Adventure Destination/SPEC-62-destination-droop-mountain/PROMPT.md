# SPEC-62: Droop Mountain Battlefield State Park Destination Page - Swarm Implementation Prompt

## Objective
Create `/destinations/droop-mountain` page using hierarchical swarm coordination with WebSearch research, AgentDB pattern learning, and state park template implementation (largest Civil War battle in WV + observation tower + battlefield trails + museum).

## Swarm Architecture
**Topology**: Hierarchical (1 queen → 3 scouts → 2 planners → 1 coder)

### Queen Agent: Orchestrate research → planning → implementation for WV's largest Civil War battlefield
### Scout 1: State park official info (battlefield, fees, hours, regulations)
### Scout 2: Civil War history (Battle of Droop Mountain Nov 1863, museum exhibits, historical significance)
### Scout 3: Observation tower & trails (lookout tower views, battlefield trails, scenic overlooks)

## Data Requirements

### Geographic Data
**Shop coordinates**: `38.5858, -80.8581` (Birch River, WV)
**Destination coordinates**: `38.1097, -80.2589` (Hillsboro, WV - Droop Mountain Battlefield)
**Drive time**: ~45 minutes via US-19 S and US-219 S
**Distance**: ~30 miles

### Civil War Battlefield Data
```typescript
const droopMountainBattlefield = {
  battle: "Battle of Droop Mountain (November 6, 1863)",
  significance: "Largest Civil War battle fought in West Virginia - over 6,000 troops engaged",
  outcome: "Union victory - ended major Confederate presence in WV",
  battlefield: "161-acre preserved battlefield with original earthworks",
  museum: {
    name: "Droop Mountain Battlefield Museum",
    exhibits: "Battle artifacts, weapons, uniforms, photographs, interpretive displays",
    hours: "Seasonal (Memorial Day - Labor Day, weekends)",
    admission: "Free"
  },
  cemetery: "Confederate cemetery on battlefield grounds"
};
```

### Observation Tower & Trails Data
```typescript
const droopMountainTower = {
  name: "Lookout Tower",
  height: "~30 feet",
  views: "360-degree views of battlefield and surrounding mountains",
  accessibility: "Climb stairs to observation deck",
  photography: "Excellent panoramic views"
};

const droopMountainTrails = [
  {
    name: "Battlefield Trail",
    length: "1.5 mi loop",
    difficulty: "Easy to Moderate",
    highlights: ["Battle markers", "Earthworks", "Troop positions", "Interpretive signs"]
  },
  {
    name: "Tower Trail",
    length: "0.25 mi",
    difficulty: "Easy",
    highlights: ["Lookout tower", "Panoramic views", "Battlefield overview"]
  }
];
```

## Kim's Voice Guidelines

**Tone**: Civil War history respectful, largest WV battle emphasis, observation tower views, Pocahontas County pride.

**Approved phrases**:
```
"Droop Mountain was the largest Civil War battle in West Virginia - over 6,000 troops fought here in November 1863."
"Union victory at Droop Mountain ended major Confederate operations in WV. Preserved battlefield has original earthworks."
"Lookout tower gives you 360-degree views of the battlefield and mountains. Good spot to understand the terrain."
"Battlefield trail is 1.5 miles - easy to moderate loop with battle markers and interpretive signs."
"Museum has battle artifacts and exhibits. Free admission, open weekends Memorial Day through Labor Day."
```

**Forbidden phrases**:
```
NEVER: "Epic battle experience", "Relive the conflict", "Ultimate Civil War destination"
```

## Content Blocks

### Hero Block
**Headline**: "Droop Mountain: West Virginia's Largest Civil War Battlefield"
**Subhead**: "1863 battle, observation tower, preserved earthworks, museum. 45 minutes from our shop."
**CTA**: "Shop Hiking Gear"

### Civil War Battlefield Block (Primary Highlight)
**Component**: `<CivilWarBattlefield battlefield={droopMountainBattlefield} />`
**Kim's note**: *"Battle of Droop Mountain (November 6, 1863) was the largest Civil War battle in West Virginia - over 6,000 troops. Union victory ended major Confederate presence in WV."*

### Observation Tower Block
**Component**: `<ObservationTower tower={droopMountainTower} />`
**Kim's note**: *"Lookout tower is about 30 feet tall - climb stairs to observation deck for 360-degree views of the battlefield and surrounding mountains. Helps you understand the battle terrain."*

### Museum & Cemetery Block
**Component**: `<BattlefieldMuseum museum={droopMountainBattlefield.museum} cemetery={true} />`
**Kim's note**: *"Museum has battle artifacts, weapons, uniforms, photographs. Free admission. Open weekends Memorial Day through Labor Day. Confederate cemetery is on battlefield grounds."*

### Local Knowledge (Kim's voice)
```
"Droop Mountain is West Virginia's largest Civil War battlefield - Battle of Droop Mountain
(November 6, 1863). Over 6,000 troops fought here. Union victory that ended major Confederate
operations in West Virginia. It's in Pocahontas County, 45 minutes from the shop on US-19 and
US-219 South.

Battlefield is 161 acres - preserved with original earthworks (Confederate defensive positions).
Battlefield Trail is 1.5-mile loop (easy to moderate) with battle markers showing troop positions
and interpretive signs explaining what happened. You can see where the fighting occurred.

Lookout tower is about 30 feet tall - observation deck at the top gives you 360-degree views of
the battlefield and surrounding mountains. Good spot to understand why Confederates chose this
position and how Union forces attacked. Climb the stairs for panoramic views.

Museum has battle artifacts - weapons, uniforms, photographs, interpretive displays. Free
admission. Open weekends Memorial Day through Labor Day. Rest of year, you can walk the
battlefield but museum's closed.

Confederate cemetery is on the battlefield grounds - soldiers who died in the battle are buried
here. Respectful memorial.

Park is day-use only - picnic areas, restrooms, battlefield trails. No camping or lodging.

Reenactments happen occasionally - check wvstateparks.com for event schedule. Usually on battle
anniversary in November.

Best time to visit: Fall for leaf color and comfortable walking temps. Spring for wildflowers.
Summer weekends for museum access.

We're 45 minutes north. Stop by for hiking boots or a day pack if you're walking the battlefield.
Grand love ya."
```

## Schema.org Markup
```typescript
const droopMountainSchema = {
  "@context": "https://schema.org",
  "@type": "StateOrProvincialPark",
  "name": "Droop Mountain Battlefield State Park",
  "description": "West Virginia's largest Civil War battlefield featuring Battle of Droop Mountain (1863), observation tower with 360-degree views, preserved earthworks, museum, and Confederate cemetery. Located in Pocahontas County near Hillsboro.",
  "touristType": ["history buffs", "Civil War enthusiasts", "hikers", "scenic viewers"]
};
```

## AgentDB Pattern Storage
```bash
npx agentdb@latest reflexion store "wvwo-session" "droop-mountain-battlefield-tower-park" 1.0 true "State park template with hierarchical swarm. CivilWarBattlefield component (Battle of Droop Mountain Nov-6-1863 largest-WV-battle 6000-troops Union victory ended Confederate presence, 161-acre preserved battlefield original earthworks, Battlefield Trail 1.5mi loop battle markers troop positions), ObservationTower (30ft lookout tower 360-degree views battlefield mountains observation deck stairs), BattlefieldMuseum (artifacts weapons uniforms photos free admission seasonal Memorial-Labor weekends, Confederate cemetery). Kim's Civil-War-respectful largest-battle emphasis Pocahontas County. 45min drive US-19/219. Gear mappings (hiking)."
```

**Reusable for**: Other Civil War battlefield parks, observation tower destinations, historic earthworks sites
