# SPEC-59: Cacapon Resort State Park Destination Page

**Type**: State park (resort lodge + golf + lake)
**Template**: State park pattern (resort focus)
**Assigned Swarm**: 5-agent hierarchical coordination

---

## Agent Selection

| Agent | Role | Why Selected |
|-------|------|--------------|
| `hierarchical-coordinator` | **Leader** | Orchestrates state park page |
| `researcher` | **Scout** | Researches Cacapon Resort lodge, golf course, lake, trails |
| `architect` | **Designer** | Designs content for resort-style state park |
| `coder` | **Builder** | Implements `/wv-wild-web/src/content/adventures/cacapon-resort-state-park.md` |
| `tester` | **Validator** | Reviews resort details, golf course info, lake activities |

**Execution**: `npx claude-flow@alpha swarm hierarchical "<this prompt>"`

---

## AgentDB Context Loading

```bash
npx agentdb@latest reflexion retrieve "resort state park lodge WV" --k 10 --synthesize-context
npx agentdb@latest reflexion retrieve "golf course lake fishing state park" --k 10 --synthesize-context
npx agentdb@latest skill search "state park pattern resort" 5
npx agentdb@latest reflexion critique-summary "WVWO"
```

---

## Research Focus (Researcher Agent)

**Key Queries**:
- "Cacapon Resort State Park lodge cabins"
- "Cacapon Resort State Park golf course Robert Trent Jones"
- "Cacapon Resort State Park lake fishing beach"
- "Cacapon Resort State Park distance from I-79 Eastern Panhandle"

**Data Priorities**:
- Resort: Full-service lodge (largest in WV state park system)
- Golf: Robert Trent Jones Sr. designed 18-hole course
- Lake: 6-acre lake (fishing, beach, paddleboats)
- Hiking: 20+ miles of trails (Cacapon Mountain ridgeline)
- Location: Eastern Panhandle (Berkeley Springs area)
- Distance: ~120 minutes from shop (far east, but popular)

---

## Content Structure (Architect Agent)

**Frontmatter**:
```yaml
name: "Cacapon Resort State Park"
type: "State Park"
slug: "cacapon-resort-state-park"
featured: false
coordinates: [39.62, -78.27]
description: "Full-service resort state park with lodge, Robert Trent Jones golf course, lake, and Cacapon Mountain trails. Eastern Panhandle destination about 2 hours from the shop."
amenities: ["Resort Lodge", "Golf Course", "Beach", "Marina", "Restaurant", "Restrooms"]
activities: ["Golf", "Hiking", "Swimming", "Fishing", "Horseback Riding"]
difficulty: "Easy to Moderate"
season: "Year-round (Golf: Spring-Fall)"
distanceFromShop: "120 miles"
drivingTime: "2 hours"
```

**Voice Guidelines**:
```
✅ "Cacapon is the resort-style state park in the Eastern Panhandle with a Robert Trent Jones golf course and full-service lodge. About 2 hours east from the shop."

❌ "Indulge in luxury resort amenities surrounded by pristine natural beauty and championship golf!"
```

---

## Implementation (Coder Agent)

**File Path**: `c:\Users\matth\Desktop\wvwo-storefront\wv-wild-web\src\content\adventures\cacapon-resort-state-park.md`

**Content Sample**:
```markdown
Cacapon Resort State Park is WV's premier resort-style state park in the Eastern Panhandle. Full-service lodge, Robert Trent Jones Sr. designed 18-hole golf course, 6-acre lake with beach, and 20+ miles of mountain trails. About 2 hours east from the shop near Berkeley Springs.

## Lodge & Accommodations

Cacapon has the largest lodge in the WV state park system with modern rooms, restaurant, conference center, and indoor pool.

**Lodge**: 48 rooms (modern amenities)
**Cabins**: 30 cabins (various sizes, some pet-friendly)
**Restaurant**: Full-service dining (breakfast, lunch, dinner)
**Indoor Pool**: Year-round swimming

## Golf Course

18-hole championship golf course designed by Robert Trent Jones Sr. in 1974. Mountain terrain with elevation changes, scenic views.

**Designer**: Robert Trent Jones Sr.
**Holes**: 18 (par 72)
**Season**: April-October
**Pro Shop**: Club rentals, cart rentals, lessons available

## Lake & Beach

6-acre lake with sand beach, fishing, and paddle boat rentals.

**Beach**: Sandy beach with lifeguards (summer)
**Fishing**: Bass, bluegill, catfish (WV license required)
**Rentals**: Paddle boats, rowboats (seasonal)
**Swimming**: Memorial Day-Labor Day

## Hiking

20+ miles of trails on Cacapon Mountain ridgeline. Mix of easy nature trails and moderate mountain hikes.

**Difficulty**: Easy to moderate
**Highlight**: Panorama Overlook trail (views of Cacapon Valley)
**Season**: Year-round (best spring-fall)

## Horseback Riding

Cacapon offers guided horseback trail rides through the park.

**Season**: Spring-fall (weather dependent)
**Reservations**: Required
**Experience**: Beginner-friendly

## Kim's Take

*Cacapon is the fanciest state park in WV - more like a regular resort than a campground. Good for families who want hotel amenities with state park access. The golf course is well-maintained and challenging.*

*It's about 2 hours east from the shop, so not a quick trip from our area. But if you're headed to Berkeley Springs or the Eastern Panhandle, it's worth a stop. We've got golf gloves, fishing tackle, and hiking boots at the shop if you need to stock up before you go.*

## Getting There from the Shop

East on I-79 to I-68 east, then US-522 south to Berkeley Springs area. About 120 miles, 2 hours. Eastern Panhandle.

**Note**: Farther than most state parks from the shop, but a popular destination for longer trips.

Grand love ya.
```

---

## Validation (Tester Agent)

**Checklist**:
- [ ] Lodge details (48 rooms, restaurant, indoor pool)
- [ ] Golf course info (Robert Trent Jones Sr., 18 holes, championship)
- [ ] Lake activities (6 acres, beach, fishing, paddle boats)
- [ ] Distance accuracy (~2 hours, Eastern Panhandle)
- [ ] Shop tie-in natural (golf gloves, fishing tackle, hiking boots)
- [ ] Resort-style emphasis (largest lodge, amenities)

---

## Success Criteria

✅ Resort-style state park emphasized (largest lodge, full amenities)
✅ Golf course highlighted (Robert Trent Jones Sr. design)
✅ Lake and beach details for summer recreation
✅ Distance noted (farther east, but worth longer trip)
✅ Shop crossover natural (gear for golf/fishing/hiking)
✅ Pattern stored for resort-style state park pages
