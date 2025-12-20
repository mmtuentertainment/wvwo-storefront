# SPEC-66: Babcock State Park Destination Page - Swarm Implementation Prompt

## Objective
Create `/destinations/babcock` page using hierarchical swarm coordination with WebSearch research, AgentDB pattern learning, and state park template implementation (Glade Creek Grist Mill + Manns Creek Gorge trails + cabins + New River Gorge area).

## Swarm Architecture
**Topology**: Hierarchical (1 queen → 3 scouts → 2 planners → 1 coder)

### Queen Agent: Orchestrate research → planning → implementation for iconic grist mill park with gorge trails
### Scout 1: State park official info (Babcock, fees, hours, lodging, regulations)
### Scout 2: Glade Creek Grist Mill (iconic WV landmark, photography, history, creek setting)
### Scout 3: Trail system & gorge (Manns Creek Gorge, Island in the Sky, Narrow Gauge Trail, waterfalls)

## Data Requirements

### Geographic Data
**Shop coordinates**: `38.5858, -80.8581` (Birch River, WV)
**Destination coordinates**: `37.9717, -80.9336` (Clifftop, WV - Babcock State Park)
**Drive time**: ~50 minutes via US-60 W
**Distance**: ~35 miles

### Glade Creek Grist Mill Data
```typescript
const gladeCreekGristMill = {
  name: "Glade Creek Grist Mill",
  built: "1976 (replica of historic WV grist mills)",
  significance: "Most photographed site in West Virginia",
  location: "Glade Creek in scenic gorge setting",
  features: [
    "Working water-powered grist mill (grinds cornmeal seasonally)",
    "Photogenic covered bridge and mill pond",
    "Historic mill demonstrations",
    "Cornmeal available for purchase (seasonal)"
  ],
  access: "Short walk from parking area (0.2 mi)",
  photography: "Best light: morning and fall foliage season"
};

const babcockTrails = [
  {
    name: "Glade Creek Trail",
    length: "0.3 mi to grist mill",
    difficulty: "Easy (paved/gravel)",
    highlights: ["Glade Creek Grist Mill", "Creek views", "Photography spot"]
  },
  {
    name: "Manns Creek Gorge Trail",
    length: "~5 mi",
    difficulty: "Moderate to Difficult (rocky, stream crossings)",
    highlights: ["Creek gorge", "Small waterfalls", "Rhododendron thickets", "Backcountry feel"]
  },
  {
    name: "Island in the Sky Trail",
    length: "2 mi roundtrip",
    difficulty: "Moderate",
    highlights: ["Scenic overlook", "Forest trail", "Seasonal wildflowers"]
  },
  {
    name: "Narrow Gauge Trail",
    length: "1.5 mi one-way",
    difficulty: "Moderate",
    highlights: ["Old railroad grade", "Connects campsites to mill area"]
  }
];

const babcockAmenities = {
  lodging: [
    { type: "Cabins", count: "26 cabins", features: ["Full kitchen", "Fireplace", "Porch"] },
    { type: "Camping", sites: "51 campsites", features: ["Electric hookups", "Bathhouse", "Dump station"] }
  ],
  recreation: ["Fishing (Glade Creek, stocked trout)", "Horseback riding trails", "Picnic areas", "Playground"]
};
```

## Kim's Voice Guidelines

**Tone**: Glade Creek Grist Mill iconic landmark, photography emphasis, gorge trails, family cabins.

**Approved phrases**:
```
"Glade Creek Grist Mill is the most photographed site in West Virginia. Iconic water-powered mill on Glade Creek."
"Mill is a 1976 replica but it works - grinds cornmeal seasonally. Photogenic covered bridge and mill pond."
"Manns Creek Gorge Trail is 5 miles of rocky backcountry - stream crossings, small waterfalls, rhododendron."
"Babcock has 26 cabins with full kitchens and fireplaces. Good base camp for New River Gorge area."
"Best photography: morning light at the mill, fall foliage season. Bring your camera."
```

**Forbidden phrases**:
```
NEVER: "Timeless pastoral beauty", "Idyllic mountain retreat", "Photographer's paradise"
```

## Content Blocks

### Hero Block
**Headline**: "Babcock: Glade Creek Grist Mill & Gorge Trails"
**Subhead**: "WV's most photographed site, Manns Creek Gorge, 26 cabins, New River Gorge access. 50 minutes from our shop."
**CTA**: "Shop Camera Gear for Mill Photography"

### Glade Creek Grist Mill Block (Primary Highlight)
**Component**: `<GladeCreekMill mill={gladeCreekGristMill} />`
**Kim's note**: *"Glade Creek Grist Mill is the most photographed site in West Virginia. Working water-powered mill built in 1976 (replica). Grinds cornmeal seasonally. Covered bridge and mill pond. 0.2-mile walk from parking."*

### Trail System Block
**Component**: `<TrailList trails={babcockTrails} />`
**Kim's note**: *"Glade Creek Trail is easy walk to the mill. Manns Creek Gorge is 5 miles of rocky backcountry - stream crossings, waterfalls. Island in the Sky has scenic overlook (2 mi)."*

### Cabins & Amenities Block
**Component**: `<CabinsAmenities lodging={babcockAmenities.lodging} recreation={babcockAmenities.recreation} />`
**Kim's note**: *"26 cabins with full kitchens and fireplaces. 51 campsites with electric. Glade Creek fishing (stocked trout). Good base camp for New River Gorge area."*

### Local Knowledge (Kim's voice)
```
"Babcock is home to Glade Creek Grist Mill - most photographed site in West Virginia. Iconic
water-powered mill on Glade Creek. It's near Clifftop, 50 minutes from the shop on US-60 West.

Grist mill is a 1976 replica of historic WV grist mills, but it works - water-powered turbine
grinds cornmeal seasonally. Covered bridge and mill pond make it photogenic. Short walk from
parking area (0.2 miles, paved/gravel).

Photography is best in morning light and during fall foliage season (mid-October). Bring a
camera and tripod. This is THE spot for WV mill photos.

Mill demonstrations happen seasonally - check wvstateparks.com for schedule. Cornmeal available
for purchase when mill is operating.

Manns Creek Gorge Trail is 5 miles of rocky backcountry hiking - stream crossings, small
waterfalls, rhododendron thickets. Moderate to difficult. Wet feet likely (stream crossings).
Good boots recommended.

Island in the Sky Trail is 2 miles roundtrip (moderate) - forest trail to scenic overlook.
Seasonal wildflowers.

Narrow Gauge Trail follows old railroad grade - 1.5 miles one-way connecting campsites to mill
area. Moderate difficulty.

Glade Creek has stocked trout fishing - WV fishing license required (we sell them at the shop).

26 cabins sleep 4-8 people - full kitchens, fireplaces, porches. Nice lodging. 51 campsites
with electric hookups. Bathhouse and dump station.

Horseback riding trails, picnic areas, playground for kids.

Good base camp for exploring New River Gorge area - Babcock is near the gorge rim.

Best time to visit: Fall for foliage and mill photography. Spring for wildflowers and trout
fishing. Summer for family cabin stays.

We're 50 minutes east. Stop by for camera gear, fishing licenses, or hiking boots. Grand love ya."
```

## Schema.org Markup
```typescript
const babcockSchema = {
  "@context": "https://schema.org",
  "@type": "StateOrProvincialPark",
  "name": "Babcock State Park",
  "description": "West Virginia state park featuring Glade Creek Grist Mill (most photographed site in WV), Manns Creek Gorge trails, 26 cabins, stocked trout fishing, and horseback riding. Located near Clifftop in New River Gorge area.",
  "touristType": ["photographers", "hikers", "families", "cabin renters", "anglers"]
};
```

## AgentDB Pattern Storage
```bash
npx agentdb@latest reflexion store "wvwo-session" "babcock-grist-mill-gorge-park" 1.0 true "State park template with hierarchical swarm. GladeCreekMill component (most photographed site WV, working water-powered mill 1976 replica grinds cornmeal seasonal, covered bridge mill pond photogenic, 0.2mi walk parking, best light morning fall foliage), TrailList (Glade Creek 0.3mi easy to mill, Manns Creek Gorge 5mi moderate-difficult rocky stream crossings waterfalls rhododendron, Island in the Sky 2mi moderate overlook, Narrow Gauge 1.5mi old railroad grade), CabinsAmenities (26 cabins full kitchen fireplace, 51 campsites electric, Glade Creek stocked trout fishing). Kim's iconic-mill photography-emphasis gorge-trails voice, New River Gorge area Clifftop. 50min drive US-60. Gear mappings (camera/tripod/fishing/hiking)."
```

**Reusable for**: Other historic mill parks, photography landmark destinations, gorge trail systems, cabin state parks
