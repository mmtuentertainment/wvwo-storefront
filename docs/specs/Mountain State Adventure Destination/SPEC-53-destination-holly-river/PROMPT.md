# SPEC-53: Holly River State Park Destination Page

**Type**: State park (camping + trails)
**Template**: State park pattern
**Assigned Swarm**: 5-agent hierarchical coordination

---

## Agent Selection

| Agent | Role | Why Selected |
|-------|------|--------------|
| `hierarchical-coordinator` | **Leader** | Orchestrates state park page |
| `researcher` | **Scout** | Researches Holly River trails, cabins, fishing creek |
| `architect` | **Designer** | Designs content for rustic mountain park |
| `coder` | **Builder** | Implements `/wv-wild-web/src/content/adventures/holly-river.md` |
| `tester` | **Validator** | Reviews trail info, cabin details, fishing regulations |

**Execution**: `npx claude-flow@alpha swarm hierarchical "<this prompt>"`

---

## AgentDB Context Loading

```bash
npx agentdb@latest reflexion retrieve "state park mountain trails" --k 10 --synthesize-context
npx agentdb@latest reflexion retrieve "rustic cabins camping WV" --k 10 --synthesize-context
npx agentdb@latest skill search "state park pattern trails" 5
npx agentdb@latest reflexion critique-summary "WVWO"
```

---

## Research Focus (Researcher Agent)

**Key Queries**:
- "Holly River State Park trails hiking"
- "Holly River State Park cabins camping"
- "Holly River State Park trout fishing creek"
- "Holly River State Park distance from I-79"

**Data Priorities**:
- Trails: 30+ miles (some steep, elevation changes)
- Cabins: Rustic 1930s CCC-built cabins
- Camping: Tent sites, no RV hookups (primitive)
- Fishing: Holly River (native brook trout, stocked trout)
- Remoteness: Mountain park, limited cell service
- Distance: 35 miles from shop (closest major state park)

---

## Content Structure (Architect Agent)

**Frontmatter**:
```yaml
name: "Holly River State Park"
type: "State Park"
slug: "holly-river"
featured: false
coordinates: [38.69, -80.40]
description: "Mountain state park with 30+ miles of trails, rustic CCC cabins, and native brook trout fishing. 35 miles from the shop."
amenities: ["Cabins", "Campground", "Restaurant", "Picnic Areas"]
activities: ["Hiking", "Trout Fishing", "Camping", "Birdwatching"]
difficulty: "Moderate" (hilly terrain)
season: "Year-round"
distanceFromShop: "35 miles"
drivingTime: "45 minutes"
```

**Voice Guidelines**:
```
✅ "Holly River is the closest full-service state park to the shop - 45 minutes east. Good trails and rustic cabins built by the CCC in the 1930s."

❌ "Escape to Holly River's tranquil mountain sanctuary and reconnect with nature!"
```

---

## Implementation (Coder Agent)

**File Path**: `c:\Users\matth\Desktop\wvwo-storefront\wv-wild-web\src\content\adventures\holly-river.md`

**Content Sample**:
```markdown
Holly River State Park is 35 miles from the shop - the closest full-service state park. It's a mountain park with 30+ miles of trails, rustic CCC cabins from the 1930s, and native brook trout in Holly River.

## Trails

**30+ miles** of hiking trails through hardwood forest. Some steep climbs - this is mountain terrain, not flat riverside walking.

**Popular Trails**:
- Potato Knob Trail (3 miles round trip, overlook)
- Tecumseh Trail (7 miles, backcountry loop)
- Reverie Trail (short, easy near cabins)

## Cabins & Camping

**Cabins**: 1930s Civilian Conservation Corps cabins (wood heat, rustic)
**Campground**: Tent sites (no RV hookups)
**Restaurant**: Open seasonally (check before visiting)

Cabins book up fast for fall foliage season - reserve early.

## Fishing

Holly River has native brook trout plus stocked rainbows and browns. Small stream fishing - light tackle, dry flies work well.

**Season**: Trout stocking spring (March-May)
**Regulations**: WV fishing license + trout stamp required

## Kim's Take

*Holly River is our neighborhood state park - closest one with cabins and a full trail system. Good for a weekend if you don't want to drive 2+ hours to the bigger parks.*

*The brook trout fishing is underrated. Small stream, but native brookies are in there if you're willing to hike upstream.*

*Stop by the shop before you head out - we're right on the way. We carry trout tackle, hiking supplies, and can give you current conditions.*

## Getting There from the Shop

East on Route 20 through Hacker Valley. Park entrance is well-signed. About 35 miles, 45 minutes.

**Closest Full-Service State Park**: Makes Holly River our default recommendation for local weekend trips.

Grand love ya.
```

---

## Validation (Tester Agent)

**Checklist**:
- [ ] Trail distances accurate (Potato Knob, Tecumseh)
- [ ] CCC cabin history noted (1930s rustic charm)
- [ ] Brook trout native vs stocked clarified
- [ ] Proximity to shop emphasized (closest park)

---

## Success Criteria

✅ State park page emphasizes proximity (closest full-service park)
✅ Native brook trout fishing highlighted (unique feature)
✅ Rustic CCC cabin appeal for fall foliage bookings
✅ Shop tie-in natural (on the way, stop for supplies)
