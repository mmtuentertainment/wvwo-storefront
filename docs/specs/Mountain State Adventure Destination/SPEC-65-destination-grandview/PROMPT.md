# SPEC-65: Grandview State Park (New River Gorge) Destination Page - Swarm Implementation Prompt

## Objective
Create `/destinations/grandview` page using hierarchical swarm coordination with WebSearch research, AgentDB pattern learning, and state park template implementation (New River Gorge overlook + trails + part of New River Gorge National Park).

## Swarm Architecture
**Topology**: Hierarchical (1 queen → 3 scouts → 2 planners → 1 coder)

### Queen Agent: Orchestrate research → planning → implementation for premier New River Gorge overlook park
### Scout 1: State park official info (Grandview, connection to NRG National Park, fees, hours)
### Scout 2: Grandview overlook & Main Overlook Trail (iconic gorge views, Main Overlook, photography)
### Scout 3: Trail system (Turkey Spur, Castle Rock, Tunnel Trail, difficulty, highlights)

## Data Requirements

### Geographic Data
**Shop coordinates**: `38.5858, -80.8581` (Birch River, WV)
**Destination coordinates**: `37.8336, -81.0606` (Beckley, WV - Grandview area)
**Drive time**: ~45 minutes via I-77 S
**Distance**: ~35 miles

### Grandview Overlook Data
```typescript
const grandviewOverlook = {
  name: "Grandview Main Overlook",
  elevation: "~2,500 feet above sea level (1,400 ft above river)",
  view: "Iconic views of New River Gorge horseshoe bend",
  features: [
    "Most famous overlook of New River Gorge",
    "Horseshoe bend of New River visible",
    "Endless Wall opposite rim visible",
    "Photography spot (sunrise, sunset, fall foliage)"
  ],
  accessibility: "Short paved walk from parking (0.1 mi)",
  note: "Now part of New River Gorge National Park and Preserve (managed cooperatively with WV State Parks)"
};

const grandviewTrails = [
  {
    name: "Main Overlook Trail",
    length: "0.2 mi roundtrip",
    difficulty: "Easy (paved)",
    highlights: ["Grandview Main Overlook", "Wheelchair accessible", "Iconic gorge views"]
  },
  {
    name: "Castle Rock Trail",
    length: "1 mi roundtrip",
    difficulty: "Moderate",
    highlights: ["Castle Rock overlook", "Forest trail", "Less crowded than Main Overlook"]
  },
  {
    name: "Turkey Spur Trail",
    length: "2.2 mi roundtrip",
    difficulty: "Moderate to Difficult (steep sections)",
    highlights: ["Turkey Spur Rock overlook", "Rhododendron thickets", "Backcountry feel"]
  },
  {
    name: "Tunnel Trail",
    length: "0.3 mi one-way to Castle Rock",
    difficulty: "Easy to Moderate",
    highlights: ["Connects parking to Castle Rock", "Forest walk"]
  }
];
```

## Kim's Voice Guidelines

**Tone**: Iconic New River Gorge overlook, photography emphasis, Main Overlook centerpiece, trail options for different abilities.

**Approved phrases**:
```
"Grandview is the iconic New River Gorge overlook - horseshoe bend views from 1,400 feet above the river."
"Main Overlook is paved and accessible - 0.1 mile from parking. Best views of the gorge."
"Castle Rock and Turkey Spur are less crowded if you want to hike beyond Main Overlook."
"Part of New River Gorge National Park now - cooperatively managed with WV State Parks."
"Best photography spot for New River Gorge - sunrise, sunset, fall foliage. Bring your camera."
```

**Forbidden phrases**:
```
NEVER: "Breathtaking vistas", "Nature's masterpiece", "Ultimate gorge experience"
```

## Content Blocks

### Hero Block
**Headline**: "Grandview: Iconic New River Gorge Overlook"
**Subhead**: "Famous horseshoe bend views, Main Overlook accessible, trails to Castle Rock and Turkey Spur. 45 minutes from our shop."
**CTA**: "Shop Camera Gear for Gorge Photography"

### Grandview Main Overlook Block (Primary Highlight)
**Component**: `<GrandviewOverlook overlook={grandviewOverlook} />`
**Kim's note**: *"Grandview Main Overlook is the iconic view of New River Gorge - horseshoe bend from 1,400 feet above the river. Paved walk (0.1 mi) from parking. Accessible. Best gorge views."*

### Trail System Block
**Component**: `<TrailList trails={grandviewTrails} />`
**Kim's note**: *"Main Overlook is paved and easy. Castle Rock Trail (1 mi) and Turkey Spur Trail (2.2 mi) are less crowded if you want to hike. Moderate to difficult terrain."*

### Photography & National Park Block
**Component**: `<PhotographyNPS connection="New River Gorge National Park and Preserve" />`
**Kim's note**: *"Best photography spot for New River Gorge. Sunrise and sunset have great light. Fall foliage is stunning. Now part of New River Gorge National Park."*

### Local Knowledge (Kim's voice)
```
"Grandview is the iconic overlook for New River Gorge - most famous view of the gorge. Horseshoe
bend of the New River from 1,400 feet above the water. It's near Beckley, 45 minutes from the
shop on I-77 South.

Main Overlook is the centerpiece - paved accessible trail (0.1 mile from parking lot). Wheelchair
accessible. Views of the gorge horseshoe bend, Endless Wall on the opposite rim. This is the
view you see in photos of New River Gorge.

Photography is excellent - sunrise and sunset have great light. Fall foliage is stunning from
the overlook. Bring a camera and tripod.

Grandview is now part of New River Gorge National Park and Preserve (established 2020) -
cooperatively managed with WV State Parks. No entrance fee.

Castle Rock Trail is 1 mile roundtrip (moderate difficulty) - forest trail to Castle Rock
overlook. Less crowded than Main Overlook. Good option if Main is busy.

Turkey Spur Trail is 2.2 miles roundtrip (moderate to difficult, steep sections) - backcountry
feel, rhododendron thickets, Turkey Spur Rock overlook. More remote.

Tunnel Trail connects parking area to Castle Rock (0.3 mi one-way, easy to moderate forest walk).

Park has picnic areas, restrooms, visitor contact station. No camping (day-use only).

Best time to visit: Fall for foliage (mid-October peak). Spring for wildflowers. Summer for
green gorge. Winter for clear views (fewer leaves, farther sight lines).

Crowds: Main Overlook is popular - visit early morning or weekday to avoid crowds. Castle Rock
and Turkey Spur are quieter.

We're 45 minutes north. Stop by for camera gear, tripods, or just to talk about Grandview
overlook. Grand love ya."
```

## Schema.org Markup
```typescript
const grandviewSchema = {
  "@context": "https://schema.org",
  "@type": "StateOrProvincialPark",
  "name": "Grandview State Park (New River Gorge National Park)",
  "description": "Iconic New River Gorge overlook featuring Grandview Main Overlook with horseshoe bend views (1,400 ft above river), accessible paved trail, Castle Rock and Turkey Spur hiking trails. Part of New River Gorge National Park and Preserve. Located near Beckley.",
  "touristType": ["photographers", "sightseers", "hikers", "families", "national park visitors"]
};
```

## AgentDB Pattern Storage
```bash
npx agentdb@latest reflexion store "wvwo-session" "grandview-nrg-overlook-park" 1.0 true "State park template with hierarchical swarm. GrandviewOverlook component (Main Overlook iconic NRG horseshoe bend 1400ft above river paved 0.1mi accessible best gorge views, photography sunrise sunset fall foliage), TrailList (Main Overlook 0.2mi easy paved, Castle Rock 1mi moderate less crowded, Turkey Spur 2.2mi moderate-difficult steep rhododendron backcountry), PhotographyNPS (part of New River Gorge National Park and Preserve 2020 cooperatively managed no entrance fee). Kim's iconic-overlook photography-emphasis national-park voice, near Beckley. 45min drive I-77. Gear mappings (camera/tripod)."
```

**Reusable for**: Other national park overlooks, iconic scenic viewpoints, accessible overlook trails, photography destinations
