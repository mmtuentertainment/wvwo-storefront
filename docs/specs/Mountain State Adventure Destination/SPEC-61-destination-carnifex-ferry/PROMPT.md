# SPEC-61: Carnifex Ferry Battlefield State Park Destination Page - Swarm Implementation Prompt

## Objective
Create `/destinations/carnifex-ferry` page using hierarchical swarm coordination with WebSearch research, AgentDB pattern learning, and state park template implementation (Civil War battlefield + Patterson House Museum + Gauley River overlook).

## Swarm Architecture
**Topology**: Hierarchical (1 queen → 3 scouts → 2 planners → 1 coder)

### Queen Agent: Orchestrate research → planning → implementation for Civil War battlefield with river overlook
### Scout 1: State park official info (battlefield, fees, hours, regulations)
### Scout 2: Civil War history (Battle of Carnifex Ferry 1861, Patterson House, museum exhibits)
### Scout 3: Gauley River overlook & trails (scenic overlook, hiking trails, picnic areas)

## Data Requirements

### Geographic Data
**Shop coordinates**: `38.5858, -80.8581` (Birch River, WV)
**Destination coordinates**: `38.2108, -80.8656` (Summersville, WV - Carnifex Ferry Battlefield)
**Drive time**: ~30 minutes via US-19 S
**Distance**: ~20 miles

### Civil War Battlefield Data
```typescript
const carnifexFerryBattlefield = {
  battle: "Battle of Carnifex Ferry (September 10, 1861)",
  significance: "Early Civil War battle - Union victory securing western Virginia for Union control",
  casualties: "Confederate retreat after fierce fighting",
  interpretation: "Walking trails with battle markers and interpretive signs",
  pattersonHouse: {
    name: "Patterson House Museum",
    built: "1830s farmhouse (served as Confederate headquarters)",
    museum: "Civil War exhibits, battle artifacts, period furnishings",
    hours: "Seasonal (Memorial Day - Labor Day, weekends)",
    admission: "Free"
  }
};
```

### Gauley River Overlook Data
```typescript
const gauleyRiverOverlook = {
  view: "Scenic overlook of Gauley River gorge",
  elevation: "~800 feet above river level",
  photography: "Excellent views of river and gorge",
  accessibility: "Short walk from parking area",
  picnic: "Picnic shelters with gorge views"
};

const carnifexTrails = [
  {
    name: "Battlefield Walking Trail",
    length: "1 mi loop",
    difficulty: "Easy",
    highlights: ["Battle markers", "Interpretive signs", "Patterson House", "Earthworks"]
  },
  {
    name: "Gauley River Overlook Trail",
    length: "0.5 mi",
    difficulty: "Easy",
    highlights: ["River gorge views", "Scenic overlook", "Photography spot"]
  }
];
```

## Kim's Voice Guidelines

**Tone**: Civil War history respectful, Gauley River overlook scenic, local Nicholas County connection.

**Approved phrases**:
```
"Carnifex Ferry is a Civil War battlefield - 1861 battle that helped keep western Virginia in the Union."
"Patterson House is the 1830s farmhouse that served as Confederate headquarters. Museum has battle artifacts."
"Gauley River overlook is worth the stop - 800 feet above the river. Good views of the gorge."
"Battlefield walking trail is easy - 1 mile loop with battle markers and interpretive signs."
"Close to the shop - 30 minutes south on US-19. Easy day trip or quick stop."
```

**Forbidden phrases**:
```
NEVER: "Epic Civil War experience", "Relive the battle", "Ultimate battlefield destination"
```

## Content Blocks

### Hero Block
**Headline**: "Carnifex Ferry: Civil War Battlefield & Gauley River Overlook"
**Subhead**: "1861 battlefield, Patterson House Museum, scenic river gorge views. 30 minutes from our shop."
**CTA**: "Shop Hiking Gear"

### Civil War Battlefield Block (Primary Highlight)
**Component**: `<CivilWarBattlefield battlefield={carnifexFerryBattlefield} />`
**Kim's note**: *"Battle of Carnifex Ferry (September 1861) was early Union victory that secured western Virginia for the Union. Walking trail has battle markers and interpretive signs."*

### Patterson House Museum Block
**Component**: `<PattersonHouse museum={carnifexFerryBattlefield.pattersonHouse} />`
**Kim's note**: *"Patterson House is the 1830s farmhouse that served as Confederate headquarters during the battle. Museum has Civil War exhibits and artifacts. Free admission, open weekends Memorial Day through Labor Day."*

### Gauley River Overlook Block
**Component**: `<GauleyOverlook overlook={gauleyRiverOverlook} />`
**Kim's note**: *"Gauley River overlook is scenic - 800 feet above the river. Good views of the gorge. Short walk from parking. Picnic shelters."*

### Local Knowledge (Kim's voice)
```
"Carnifex Ferry is a Civil War battlefield state park - Battle of Carnifex Ferry (September 10,
1861). Early Civil War battle where Union forces defeated Confederates, securing western Virginia
for Union control. It's in Nicholas County, 30 minutes south on US-19. Close to the shop.

Patterson House is the 1830s farmhouse that served as Confederate General Floyd's headquarters
during the battle. Museum inside has Civil War exhibits, battle artifacts, period furnishings.
Free admission. Open weekends Memorial Day through Labor Day. Rest of year, you can walk the
battlefield but museum's closed.

Battlefield walking trail is easy - 1-mile loop with battle markers and interpretive signs.
Shows where fighting happened, Confederate earthworks. Good for Civil War history buffs.

Gauley River overlook is worth the stop - scenic view about 800 feet above the river. Short walk
from parking area. Good spot for photos of the gorge. Picnic shelters with river views.

Park is day-use only - no camping or lodging. Picnic areas, restrooms, battlefield trails.

Best time to visit: Spring and fall for comfortable walking temps. Summer weekends for Patterson
House museum access. Civil War reenactments occasionally (check wvstateparks.com for events).

We're 30 minutes north on US-19. Easy day trip or quick stop on your way to Summersville Lake
or Gauley River. Stop by before you go if you need hiking boots or a day pack. Grand love ya."
```

## Schema.org Markup
```typescript
const carnifexFerrySchema = {
  "@context": "https://schema.org",
  "@type": "StateOrProvincialPark",
  "name": "Carnifex Ferry Battlefield State Park",
  "description": "Civil War battlefield state park featuring Battle of Carnifex Ferry (1861), Patterson House Museum, Gauley River scenic overlook, and battlefield walking trails. Located in Nicholas County near Summersville.",
  "touristType": ["history buffs", "Civil War enthusiasts", "hikers", "scenic viewers"]
};
```

## AgentDB Pattern Storage
```bash
npx agentdb@latest reflexion store "wvwo-session" "carnifex-ferry-battlefield-overlook-park" 1.0 true "State park template with hierarchical swarm. CivilWarBattlefield component (Battle of Carnifex Ferry Sept-10-1861 Union victory western-VA, battlefield walking trail 1mi easy loop battle markers interpretive signs earthworks), PattersonHouse (1830s farmhouse Confederate HQ museum Civil War exhibits artifacts free admission seasonal Memorial-Labor weekends), GauleyOverlook (scenic overlook 800ft above Gauley River gorge views photography picnic shelters). Kim's Civil-War-respectful Gauley-scenic voice, Nicholas County. 30min drive US-19. Gear mappings (hiking)."
```

**Reusable for**: Other Civil War battlefield parks, historic overlook destinations, museum state parks
