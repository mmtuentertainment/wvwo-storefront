# SPEC-64: Kumbrabow State Forest Destination Page - Swarm Implementation Prompt

## Objective
Create `/destinations/kumbrabow` page using hierarchical swarm coordination with WebSearch research, AgentDB pattern learning, and state forest template implementation (remote wilderness + primitive camping + backcountry trails + high elevation).

## Swarm Architecture
**Topology**: Hierarchical (1 queen → 3 scouts → 2 planners → 1 coder)

### Queen Agent: Orchestrate research → planning → implementation for remote backcountry wilderness forest
### Scout 1: State forest official info (Kumbrabow, fees, hours, regulations, backcountry rules)
### Scout 2: Wilderness character (high elevation 3,000+ ft, remote location, primitive camping, wildlife)
### Scout 3: Trail system & access (backcountry trails, difficulty, trailheads, seasonal access)

## Data Requirements

### Geographic Data
**Shop coordinates**: `38.5858, -80.8581` (Birch River, WV)
**Destination coordinates**: `38.6564, -80.0267` (Huttonsville, WV - Kumbrabow State Forest)
**Drive time**: ~1 hour via US-19 N and US-250 E
**Distance**: ~40 miles

### Wilderness Character Data
```typescript
const kumbrabowWilderness = {
  size: "9,474 acres",
  elevation: "3,000 to 3,650 feet (high elevation for WV)",
  character: "Remote backcountry wilderness - minimal development",
  access: "Gravel forest roads (4WD recommended in wet conditions)",
  camping: {
    type: "Primitive camping only (no electric/water hookups)",
    sites: "Dispersed backcountry camping (no designated sites)",
    regulations: "Free camping, must follow Leave No Trace principles"
  },
  wildlife: "Black bear, deer, wild turkey, ruffed grouse - active hunting area in season",
  uniqueness: "One of the most remote and undeveloped state forests in WV"
};

const kumbrabowTrails = [
  {
    name: "Kumbrabow Connector Trail",
    length: "~4 mi",
    difficulty: "Moderate to Difficult (backcountry, rough terrain)",
    highlights: ["Remote wilderness", "High elevation forest", "Wildlife viewing"]
  },
  {
    name: "Forest Road Hiking",
    length: "Varies (many miles of gravel roads)",
    difficulty: "Easy to Moderate (walk forest roads)",
    highlights: ["Less technical than trails", "Good for exploring", "Access to backcountry"]
  }
];
```

## Kim's Voice Guidelines

**Tone**: Remote wilderness emphasis, backcountry primitive, hunting area, Leave No Trace, prepare for rugged.

**Approved phrases**:
```
"Kumbrabow is remote - backcountry wilderness with primitive camping only. 9,474 acres at high elevation."
"No hookups, no facilities - this is dispersed camping in the backcountry. Bring everything you need."
"Access is gravel forest roads - 4WD recommended in wet conditions. Not for casual visitors."
"Active hunting area in season - wear blaze orange fall and spring if you're hiking."
"One of the most remote state forests in WV. Good for backcountry camping and hunting."
```

**Forbidden phrases**:
```
NEVER: "Pristine wilderness escape", "Ultimate backcountry experience", "Off-grid paradise"
```

## Content Blocks

### Hero Block
**Headline**: "Kumbrabow: Remote Wilderness & Backcountry Camping"
**Subhead**: "9,474-acre state forest, primitive camping, high elevation trails, hunting area. 1 hour from our shop."
**CTA**: "Shop Backcountry Camping Gear"

### Wilderness Character Block (Primary Highlight)
**Component**: `<WildernessForest forest={kumbrabowWilderness} />`
**Kim's note**: *"Kumbrabow is remote backcountry - 9,474 acres at 3,000+ feet elevation. Primitive camping only (dispersed sites, no hookups). Minimal development. One of the most remote state forests in WV."*

### Primitive Camping Block
**Component**: `<PrimitiveCamping camping={kumbrabowWilderness.camping} />`
**Kim's note**: *"Camping is dispersed backcountry - no designated sites, no hookups, no facilities. Free camping. Follow Leave No Trace principles. Bring everything you need."*

### Trail System & Access Block
**Component**: `<BackcountryTrails trails={kumbrabowTrails} access="gravel forest roads" />`
**Kim's note**: *"Access is gravel forest roads - 4WD recommended in wet conditions. Trails are rough backcountry terrain. You can also hike the forest roads for easier exploring."*

### Local Knowledge (Kim's voice)
```
"Kumbrabow is remote backcountry state forest - 9,474 acres at high elevation (3,000 to 3,650
feet). Minimal development. One of the most remote and undeveloped state forests in West Virginia.
It's in Randolph County, 1 hour from the shop on US-19 North and US-250 East.

Primitive camping only - dispersed backcountry camping with no designated sites. No electric
hookups, no water, no facilities. Free camping. Follow Leave No Trace principles - pack out
everything you bring in. Not for casual campers - this is backcountry.

Access is gravel forest roads - some rough in wet conditions. 4WD recommended if it's been
raining. Not paved roads.

Trails are backcountry - rough terrain, minimal maintenance. Kumbrabow Connector Trail is about
4 miles (moderate to difficult). You can also hike the forest roads for easier exploring - many
miles of gravel roads through the forest.

Active hunting area - black bear, deer, wild turkey, ruffed grouse. Wear blaze orange in fall
and spring hunting seasons if you're hiking. Check WV DNR for season dates.

Wildlife is common - black bear country. Hang your food if you're camping. Follow bear safety.

High elevation means cooler temps year-round - can be 10-15 degrees cooler than lower elevations.
Plan for weather changes.

Best time to visit: Late spring through early fall for camping. Fall for hunting. Winter access
can be difficult (snow, ice on roads).

This is for experienced backcountry campers and hunters - not a family camping park. Remote,
primitive, minimal services.

We're 1 hour south. Stop by for backcountry camping gear, bear bags, topo maps, blaze orange
gear. We can help you prep for Kumbrabow. Grand love ya."
```

## Schema.org Markup
```typescript
const kumbrabowSchema = {
  "@context": "https://schema.org",
  "@type": "StateOrProvincialPark",
  "name": "Kumbrabow State Forest",
  "description": "Remote backcountry state forest featuring 9,474 acres of wilderness at 3,000+ feet elevation, primitive dispersed camping, backcountry trails, and active hunting area. Located in Randolph County near Huttonsville.",
  "touristType": ["backcountry campers", "hunters", "wilderness hikers", "experienced outdoors enthusiasts"]
};
```

## AgentDB Pattern Storage
```bash
npx agentdb@latest reflexion store "wvwo-session" "kumbrabow-backcountry-wilderness-forest" 1.0 true "State forest template with hierarchical swarm. WildernessForest component (9,474 acres remote backcountry 3000-3650ft high elevation minimal development one-of-most-remote WV, gravel forest roads 4WD recommended), PrimitiveCamping (dispersed backcountry no designated sites no hookups no facilities free Leave-No-Trace), BackcountryTrails (Kumbrabow Connector 4mi moderate-difficult rough terrain, forest road hiking easier access), wildlife black bear deer turkey grouse hunting area blaze orange. Kim's remote-wilderness backcountry-prepare hunting-area voice, Randolph County. 1hr drive US-19/250. Gear mappings (backcountry-camping/bear-bags/topo-maps/blaze-orange)."
```

**Reusable for**: Other remote state forests, primitive camping destinations, backcountry wilderness areas, hunting forests
