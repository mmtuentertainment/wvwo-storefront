# SPEC-44: Greenbrier River Trail Destination Page

**Type**: Rails-to-trails bike path (family-friendly)
**Template**: State park pattern (adapted for trail)
**Assigned Swarm**: 5-agent hierarchical coordination

---

## Agent Selection

| Agent | Role | Why Selected |
|-------|------|--------------|
| `hierarchical-coordinator` | **Leader** | Orchestrates trail page creation |
| `researcher` | **Scout** | Researches Greenbrier Trail access points, camping, bike rentals |
| `architect` | **Designer** | Designs content for family-friendly rail-trail |
| `coder` | **Builder** | Implements `/wv-wild-web/src/content/adventures/greenbrier-trail.md` |
| `tester` | **Validator** | Reviews family-friendly tone, accessibility info |

**Execution**: `npx claude-flow@alpha swarm hierarchical "<this prompt>"`

---

## AgentDB Context Loading

```bash
npx agentdb@latest reflexion retrieve "bike trails family-friendly" --k 10 --synthesize-context
npx agentdb@latest reflexion retrieve "rails-to-trails WV" --k 10 --synthesize-context
npx agentdb@latest skill search "state park pattern trail" 5
npx agentdb@latest reflexion critique-summary "WVWO"
```

---

## Research Focus (Researcher Agent)

**Key Queries**:
- "Greenbrier River Trail trailheads parking"
- "Greenbrier River Trail camping Watoga Seneca State Forest"
- "Greenbrier Trail bike rentals Marlinton"
- "Greenbrier Trail distance from I-79"

**Data Priorities**:
- Length: 78 miles (Cass to Caldwell)
- Grade: <1% (rail-trail flat, family-friendly)
- Access points: Marlinton, Cass, Watoga State Park
- Camping: Watoga, Seneca State Forest along trail
- Season: Spring-fall (snow/ice winter)
- Bike rentals: Free Spirit Adventures (Marlinton)

---

## Content Structure (Architect Agent)

**Frontmatter**:
```yaml
name: "Greenbrier River Trail"
type: "Rail-Trail"
slug: "greenbrier-trail"
featured: false
coordinates: [38.22, -80.08] # Marlinton trailhead
description: "78-mile rail-trail along Greenbrier River - flat, family-friendly biking and hiking through WV backcountry. Connects Cass Scenic Railroad to Caldwell."
amenities: ["Trailhead Parking", "Camping Nearby", "Bike Rentals (Marlinton)"]
activities: ["Biking", "Hiking", "Camping", "Fishing (Greenbrier River)"]
difficulty: "Easy" (flat rail-trail)
season: "Spring-Fall"
distanceFromShop: "95 miles"
drivingTime: "2 hours"
```

**Voice Guidelines**:
```
✅ "The Greenbrier Trail is one of the easiest long bike rides in West Virginia - old railroad bed means flat, gravel path for 78 miles."

❌ "Experience the ultimate rails-to-trails adventure on West Virginia's premier cycling destination!"
```

---

## Implementation (Coder Agent)

**File Path**: `c:\Users\matth\Desktop\wvwo-storefront\wv-wild-web\src\content\adventures\greenbrier-trail.md`

**Content Sample**:
```markdown
The Greenbrier River Trail is 78 miles of flat, gravel biking and hiking along the Greenbrier River. It's an old railroad bed, so there's almost no elevation gain - good for families and folks who want a long ride without the climbs.

## Trail Details

**Length**: 78 miles (Cass to Caldwell)
**Surface**: Crushed limestone gravel
**Grade**: <1% (flat rail-trail)
**Access Points**: Marlinton, Cass, Watoga, Caldwell

You don't have to ride the whole thing. Most people do a section - Marlinton to Watoga is about 15 miles one-way, good for a half-day trip.

## What to Know

**Bike Rentals**
Free Spirit Adventures in Marlinton rents bikes and does shuttle services if you want to ride one-way.

**Camping**
Watoga State Park and Seneca State Forest are right on the trail. You can bike in, camp, and continue the next day.

**Fishing**
Greenbrier River runs alongside the trail. Trout fishing is good in spring and fall. Smallmouth bass in summer.

## Kim's Take

*This is one of the few long bike trails in West Virginia that doesn't beat you up with hills. Good for families with kids or anyone who wants to cover distance without the climb.*

*If you're camping at Watoga and biking, stop by before you head out. We carry bike repair kits, water bottles, and fishing tackle if you want to wet a line along the river.*

## Getting There from the Shop

East on Route 39/55 through Richwood to Marlinton. About 95 miles, 2 hours. Marlinton is the best starting point - parking, bike rentals, food.

Grand love ya.
```

---

## Validation (Tester Agent)

**Checklist**:
- [ ] Family-friendly tone (not hardcore cycling jargon)
- [ ] Grade/difficulty accurate (flat = beginner-friendly)
- [ ] Camping connections clear (Watoga/Seneca)
- [ ] Shop tie-in natural (bike repair kits, fishing tackle)

---

## Success Criteria

✅ Trail page emphasizes accessibility (flat, family-friendly)
✅ Camping and multi-day trip options detailed
✅ Fishing along river mentioned (shop crossover)
✅ Pattern stored for future trail pages
