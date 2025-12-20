# SPEC-63: Beartown State Park Destination Page - Swarm Implementation Prompt

## Objective
Create `/destinations/beartown` page using hierarchical swarm coordination with WebSearch research, AgentDB pattern learning, and state park template implementation (unique rock formation maze + boardwalk trail + sandstone crevices).

## Swarm Architecture
**Topology**: Hierarchical (1 queen → 3 scouts → 2 planners → 1 coder)

### Queen Agent: Orchestrate research → planning → implementation for unique geological rock maze park
### Scout 1: State park official info (Beartown, fees, hours, regulations)
### Scout 2: Rock formation geology (sandstone maze, crevices, formation process, unique features)
### Scout 3: Boardwalk trail & access (0.5 mi boardwalk, accessibility, photography, seasonal)

## Data Requirements

### Geographic Data
**Shop coordinates**: `38.5858, -80.8581` (Birch River, WV)
**Destination coordinates**: `37.9714, -80.2156` (Droop, WV - Beartown State Park)
**Drive time**: ~50 minutes via US-19 S and US-219 S
**Distance**: ~35 miles

### Rock Formation Data
```typescript
const beartownFormations = {
  type: "Droop Mountain Sandstone formations",
  description: "Unique maze of vertical sandstone slabs and deep crevices",
  formation: "Erosion created narrow passageways between rock walls (10-30 feet tall)",
  features: [
    "Labyrinth of rock crevices",
    "Vertical sandstone slabs (narrow gaps - some <2 feet wide)",
    "Cool temperatures in crevices (year-round)",
    "Moss and fern growth on rocks"
  ],
  uniqueness: "One of the most unusual geological formations in West Virginia",
  nickname: "Called Beartown because crevices resemble dens (early settlers thought bears used them)"
};

const beartownBoardwalk = {
  trail: "Beartown Boardwalk",
  length: "0.5 mi loop",
  surface: "Elevated wooden boardwalk",
  difficulty: "Easy (accessible)",
  highlights: [
    "Winds through rock maze",
    "Views into deep crevices",
    "Interpretive signs (geology, ecology)",
    "Photography opportunities (unique rock formations)"
  ],
  accessibility: "Wheelchair accessible boardwalk",
  season: "Year-round, but best spring-fall (icy in winter)"
};
```

## Kim's Voice Guidelines

**Tone**: Geological wonder emphasis, unique WV feature, short accessible trail, photography appeal.

**Approved phrases**:
```
"Beartown is a maze of sandstone rocks - vertical slabs with narrow crevices between them. Unique geology."
"Boardwalk trail is 0.5 miles - winds through the rock maze. Wheelchair accessible. Easy walk."
"Crevices are narrow - some less than 2 feet wide. 10 to 30 feet deep. Cool temperatures in the gaps."
"Called Beartown because early settlers thought bears used the crevices as dens. Good name."
"One of the most unusual geological formations in West Virginia. Worth the stop for photos."
```

**Forbidden phrases**:
```
NEVER: "Mystical rock labyrinth", "Otherworldly geological experience", "Nature's cathedral"
```

## Content Blocks

### Hero Block
**Headline**: "Beartown: Sandstone Rock Maze & Boardwalk Trail"
**Subhead**: "Unique vertical rock formations, 0.5-mile boardwalk through crevices, accessible trail. 50 minutes from our shop."
**CTA**: "Shop Camera Gear for Rock Photography"

### Rock Formation Geology Block (Primary Highlight)
**Component**: `<RockFormations formations={beartownFormations} />`
**Kim's note**: *"Beartown is a sandstone maze - vertical rock slabs with narrow crevices between them. Erosion created passageways (some <2 feet wide, 10-30 feet deep). One of the most unusual geological formations in WV."*

### Boardwalk Trail Block
**Component**: `<BoardwalkTrail trail={beartownBoardwalk} />`
**Kim's note**: *"Boardwalk is 0.5 miles - elevated wooden walkway winds through the rock maze. Wheelchair accessible. Easy walk with views into the crevices."*

### Photography & Geology Block
**Component**: `<GeologyPhoto features={beartownFormations.features} />`
**Kim's note**: *"Good spot for photography - unique rock formations, moss and ferns on rocks, light filtering into crevices. Interpretive signs explain how the formations were created."*

### Local Knowledge (Kim's voice)
```
"Beartown is a unique rock maze - vertical sandstone slabs with narrow crevices between them.
Droop Mountain Sandstone formation. Erosion created the labyrinth - some crevices are less than
2 feet wide but 10 to 30 feet deep. One of the most unusual geological sites in West Virginia.
It's in Pocahontas County, 50 minutes from the shop on US-19 and US-219 South.

Called Beartown because early settlers thought bears used the crevices as dens. Good name -
crevices do look like dens.

Boardwalk trail is 0.5 miles - elevated wooden walkway winds through the rock maze. Wheelchair
accessible. Easy walk. You get views into the deep crevices from the boardwalk. Interpretive
signs explain the geology and ecology.

Cool temperatures in the crevices year-round - rock walls block sunlight. Moss and ferns grow
on the rocks. Feels different from the surrounding forest.

Good spot for photography - unique rock formations, light filtering into narrow gaps, moss and
lichen textures. Bring a camera.

Park is day-use only. Boardwalk, picnic area, restrooms. No camping or lodging.

Best time to visit: Spring and fall for comfortable temps. Summer is cooler in the crevices.
Winter can be icy on boardwalk - use caution or visit when dry.

Short visit - you can walk the boardwalk in 30-45 minutes. Good stop if you're driving through
Pocahontas County.

We're 50 minutes north. Stop by for camera gear or just to talk about Beartown geology.
Grand love ya."
```

## Schema.org Markup
```typescript
const beartownSchema = {
  "@context": "https://schema.org",
  "@type": "StateOrProvincialPark",
  "name": "Beartown State Park",
  "description": "Unique sandstone rock maze state park featuring vertical rock formations with narrow crevices, 0.5-mile accessible boardwalk trail, and geological interpretive displays. Located in Pocahontas County near Droop.",
  "touristType": ["geologists", "photographers", "nature lovers", "families", "accessible trail users"]
};
```

## AgentDB Pattern Storage
```bash
npx agentdb@latest reflexion store "wvwo-session" "beartown-rock-maze-boardwalk-park" 1.0 true "State park template with hierarchical swarm. RockFormations component (Droop Mountain Sandstone maze vertical slabs narrow crevices <2ft wide 10-30ft deep, erosion-created labyrinth cool temps moss ferns, unique WV geology, called Beartown settlers thought bears used dens), BoardwalkTrail (0.5mi elevated wooden loop wheelchair accessible winds through maze views into crevices interpretive signs), GeologyPhoto (photography opportunity unique formations light filtering). Kim's geological-wonder accessible-trail voice, Pocahontas County. 50min drive US-19/219. Gear mappings (camera)."
```

**Reusable for**: Other unique geological parks, boardwalk trail destinations, rock formation sites, accessible nature trails
