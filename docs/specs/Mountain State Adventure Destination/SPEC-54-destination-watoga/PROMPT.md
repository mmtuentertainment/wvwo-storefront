# SPEC-54: Watoga State Park Destination Page

**Type**: State park (large, multi-use)
**Template**: State park pattern
**Assigned Swarm**: 5-agent hierarchical coordination

---

## Agent Selection

| Agent | Role | Why Selected |
|-------|------|--------------|
| `hierarchical-coordinator` | **Leader** | Orchestrates state park page |
| `researcher` | **Scout** | Researches Watoga size, trails, lake, Greenbrier Trail connection |
| `architect` | **Designer** | Designs content for WV's largest state park |
| `coder` | **Builder** | Implements `/wv-wild-web/src/content/adventures/watoga.md` |
| `tester` | **Validator** | Reviews park size, trail network, lake fishing |

**Execution**: `npx claude-flow@alpha swarm hierarchical "<this prompt>"`

---

## AgentDB Context Loading

```bash
npx agentdb@latest reflexion retrieve "large state parks WV" --k 10 --synthesize-context
npx agentdb@latest reflexion retrieve "Watoga State Park" --k 10 --synthesize-context
npx agentdb@latest skill search "state park pattern large" 5
npx agentdb@latest reflexion critique-summary "WVWO"
```

---

## Research Focus (Researcher Agent)

**Key Queries**:
- "Watoga State Park size acres trails"
- "Watoga State Park lake fishing camping"
- "Watoga State Park Greenbrier River Trail connection"
- "Watoga State Park distance from I-79"

**Data Priorities**:
- Size: 10,100 acres (largest state park in WV)
- Lake: 11-acre Watoga Lake (bass, trout)
- Trails: 40+ miles hiking, mountain biking
- Greenbrier Trail: Direct access to 78-mile rail-trail
- Camping: 88 campsites, cabins
- Distance: 95 miles from shop (via Route 39/55)
- Deer/turkey hunting: Designated areas

---

## Content Structure (Architect Agent)

**Frontmatter**:
```yaml
name: "Watoga State Park"
type: "State Park"
slug: "watoga"
featured: false
coordinates: [38.12, -80.14]
description: "West Virginia's largest state park at 10,100 acres. 40+ miles of trails, 11-acre lake, Greenbrier River Trail access, and primitive backcountry camping."
amenities: ["Campground", "Cabins", "Lake", "Restaurant"]
activities: ["Hiking", "Mountain Biking", "Fishing", "Camping", "Hunting (Designated Areas)"]
difficulty: "Easy to Moderate"
season: "Year-round"
distanceFromShop: "95 miles"
drivingTime: "2 hours"
```

**Voice Guidelines**:
```
✅ "Watoga is West Virginia's biggest state park - 10,100 acres with enough trails and backcountry to spend a full week exploring."

❌ "Discover endless adventure opportunities in Watoga's vast wilderness playground!"
```

---

## Implementation (Coder Agent)

**File Path**: `c:\Users\matth\Desktop\wvwo-storefront\wv-wild-web\src\content\adventures\watoga.md`

**Content Sample**:
```markdown
Watoga State Park is West Virginia's largest state park at 10,100 acres. There's enough here for a week-long trip - 40+ miles of trails, an 11-acre lake, direct access to the Greenbrier River Trail, and primitive backcountry camping areas.

## What's There

**Trails**: 40+ miles of hiking and mountain biking trails through mountain forest
**Watoga Lake**: 11-acre lake (bass, stocked trout)
**Greenbrier Trail Access**: Connects to 78-mile rail-trail for long bike trips
**Camping**: 88 campsites, cabins, primitive backcountry sites

## Fishing

**Watoga Lake** (11 acres): Largemouth bass, stocked trout (spring)
**Greenbrier River**: Trout and smallmouth bass (trail access)

Small lake, good for kids learning to fish or bank fishing.

## Hunting

Designated hunting areas for deer and turkey (WV state park hunting regulations). Not the whole park - check maps for legal areas.

## Greenbrier River Trail

Watoga is on the 78-mile Greenbrier Rail-Trail. You can bike in, camp, and continue the trail. Good for multi-day bike-camping trips.

## Kim's Take

*Watoga is big enough that you won't feel crowded even on busy weekends. If you want backcountry camping without leaving the state park system, this is your spot.*

*The Greenbrier Trail connection makes it good for bike-camping trips. Ride in, set up camp, explore the park, ride out the next day.*

*It's a haul from the shop (2 hours), but worth it if you're planning a long weekend or full week.*

## Getting There from the Shop

East on Route 39/55 through Richwood to Marlinton area. Follow signs for Watoga. About 95 miles, 2 hours.

Grand love ya.
```

---

## Validation (Tester Agent)

**Checklist**:
- [ ] Park size accurate (10,100 acres, largest in WV)
- [ ] Trail mileage verified (40+ miles)
- [ ] Greenbrier Trail connection detailed
- [ ] Hunting areas clarified (designated, not whole park)

---

## Success Criteria

✅ State park page emphasizes size (largest in WV)
✅ Greenbrier Trail bike-camping connection highlighted
✅ Backcountry camping option for primitive campers
✅ Pattern stored for large multi-use state park pages
