# SPEC-68: Pinnacle Rock State Park Destination Page - Swarm Implementation Prompt

## Objective
Create `/destinations/pinnacle-rock` page using hierarchical swarm coordination with WebSearch research, AgentDB pattern learning, and state park template implementation (unique sandstone rock formation + short accessible trail + geological landmark).

## Swarm Architecture
**Topology**: Hierarchical (1 queen → 3 scouts → 2 planners → 1 coder)

### Queen Agent: Orchestrate research → planning → implementation for unique rock formation landmark park
### Scout 1: State park official info (Pinnacle Rock, fees, hours, regulations)
### Scout 2: Pinnacle Rock geology (sandstone formation, height, erosion process, uniqueness)
### Scout 3: Trail & access (short trail, overlook platform, accessibility, photography)

## Data Requirements

### Geographic Data
**Shop coordinates**: `38.5858, -80.8581` (Birch River, WV)
**Destination coordinates**: `37.5406, -81.2511` (Bramwell, WV - Pinnacle Rock State Park)
**Drive time**: ~2 hours via I-77 S
**Distance**: ~85 miles

### Pinnacle Rock Formation Data
```typescript
const pinnacleRockFormation = {
  name: "Pinnacle Rock",
  type: "Sandstone pinnacle (erosion remnant)",
  height: "~50 feet tall sandstone spire",
  formation: "Erosion carved this rock pinnacle from surrounding softer rock layers",
  uniqueness: "Distinctive vertical sandstone formation - geological oddity in southern WV",
  location: "Flat Top Mountain area (McDowell County)",
  visibility: "Visible from overlook platform (short trail from parking)"
};

const pinnacleRockTrail = {
  name: "Pinnacle Rock Trail",
  length: "0.25 mi roundtrip",
  difficulty: "Easy (paved/gravel, accessible)",
  features: [
    "Short walk from parking to overlook platform",
    "Viewing platform at base of rock formation",
    "Interpretive signs (geology, formation process)",
    "Photography spot (unique rock formation)"
  ],
  accessibility: "Mostly accessible (gentle grade to platform)"
};

const pinnacleRockPark = {
  size: "Small day-use park (~10 acres)",
  amenities: ["Picnic area", "Restrooms", "Parking", "Interpretive signs"],
  lodging: "None (day-use only)",
  nearby: "Near Bramwell and Bluefield (southern WV coal towns)"
};
```

## Kim's Voice Guidelines

**Tone**: Geological curiosity emphasis, quick stop appeal, unique southern WV feature, short accessible trail.

**Approved phrases**:
```
"Pinnacle Rock is a 50-foot sandstone spire - erosion carved it from surrounding rock. Geological oddity."
"Trail is 0.25 miles - short walk from parking to overlook platform at the base of the rock."
"Small day-use park - picnic area, restrooms, short trail. Good quick stop in southern WV."
"Flat Top Mountain area near Bramwell. Coal country southern West Virginia."
"Unique rock formation - worth a photo stop if you're driving through McDowell County."
```

**Forbidden phrases**:
```
NEVER: "Majestic stone sentinel", "Nature's sculpture", "Awe-inspiring geological wonder"
```

## Content Blocks

### Hero Block
**Headline**: "Pinnacle Rock: 50-Foot Sandstone Spire"
**Subhead**: "Unique rock formation, 0.25-mile accessible trail, quick stop. 2 hours from our shop."
**CTA**: "Shop Camera Gear for Geology Photos"

### Pinnacle Rock Formation Block (Primary Highlight)
**Component**: `<RockFormation formation={pinnacleRockFormation} />`
**Kim's note**: *"Pinnacle Rock is a 50-foot sandstone spire - erosion carved it from surrounding softer rock. Geological oddity. Distinctive vertical formation in Flat Top Mountain area."*

### Trail & Access Block
**Component**: `<ShortTrail trail={pinnacleRockTrail} />`
**Kim's note**: *"Trail is short - 0.25 miles from parking to overlook platform at the base of the rock. Paved/gravel, mostly accessible. Quick walk."*

### Photography & Geology Block
**Component**: `<GeologyPhoto formation="Pinnacle Rock" />`
**Kim's note**: *"Good spot for unique geology photos. Interpretive signs explain how erosion created the pinnacle. Worth a photo stop."*

### Local Knowledge (Kim's voice)
```
"Pinnacle Rock is a small state park with a big rock - 50-foot sandstone spire that erosion
carved from surrounding softer rock layers. Geological oddity. It's in McDowell County near
Bramwell, southern WV coal country. 2 hours from the shop on I-77 South.

Pinnacle Rock trail is short - 0.25 miles from parking lot to overlook platform at the base
of the rock formation. Paved/gravel path, mostly accessible. Gentle grade. Quick walk.

Viewing platform at the base gives you a good look at the vertical sandstone formation.
Interpretive signs explain how erosion created the pinnacle - softer rock around it wore
away, leaving the harder sandstone spire standing.

Small day-use park - about 10 acres. Picnic area, restrooms, parking, interpretive signs.
No camping or lodging. This is a quick stop, not an all-day destination.

Flat Top Mountain area - Bramwell and Bluefield are nearby towns (southern WV coal heritage).

Photography is good - unique rock formation, vertical sandstone, interesting geology. Bring
a camera for a few shots.

Best time to visit: Spring through fall. Winter access can be icy (southern WV gets snow).
Any time of year works for a quick stop.

You can see Pinnacle Rock in 30 minutes - walk to platform, read interpretive signs, take
photos, walk back. Good stretch-your-legs stop on a road trip through southern WV.

We're 2 hours north. Stop by for camera gear or just to talk about WV geology. Grand love ya."
```

## Schema.org Markup
```typescript
const pinnacleRockSchema = {
  "@context": "https://schema.org",
  "@type": "StateOrProvincialPark",
  "name": "Pinnacle Rock State Park",
  "description": "Small day-use state park featuring Pinnacle Rock (50-foot sandstone spire erosion remnant), 0.25-mile accessible trail to overlook platform, and geological interpretive displays. Located in McDowell County near Bramwell.",
  "touristType": ["geologists", "photographers", "road trippers", "geology enthusiasts"]
};
```

## AgentDB Pattern Storage
```bash
npx agentdb@latest reflexion store "wvwo-session" "pinnacle-rock-formation-park" 1.0 true "State park template with hierarchical swarm. RockFormation component (Pinnacle Rock 50ft sandstone spire erosion remnant carved from softer rock, geological oddity distinctive vertical formation Flat Top Mountain), ShortTrail (0.25mi roundtrip easy paved/gravel accessible parking to overlook platform, viewing platform at base interpretive signs geology), GeologyPhoto (unique formation photography spot). Small day-use park 10 acres picnic restrooms no camping quick stop. Kim's geological-curiosity quick-stop southern-WV voice, McDowell County Bramwell coal country. 2hr drive I-77. Gear mappings (camera)."
```

**Reusable for**: Other small geological parks, quick-stop rock formations, accessible short trail destinations
