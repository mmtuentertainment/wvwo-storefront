# SPEC-58: North Bend State Park Destination Page

**Type**: State park (rail-trail + lodge + tunnel)
**Template**: State park pattern
**Assigned Swarm**: 5-agent hierarchical coordination

---

## Agent Selection

| Agent | Role | Why Selected |
|-------|------|--------------|
| `hierarchical-coordinator` | **Leader** | Orchestrates state park page |
| `researcher` | **Scout** | Researches North Bend Rail Trail, tunnel, lodge, activities |
| `architect` | **Designer** | Designs content for rail-trail recreation destination |
| `coder` | **Builder** | Implements `/wv-wild-web/src/content/adventures/north-bend-state-park.md` |
| `tester` | **Validator** | Reviews rail-trail details, lodge info, tunnel safety |

**Execution**: `npx claude-flow@alpha swarm hierarchical "<this prompt>"`

---

## AgentDB Context Loading

```bash
npx agentdb@latest reflexion retrieve "rail trail biking WV" --k 10 --synthesize-context
npx agentdb@latest reflexion retrieve "state park lodge camping" --k 10 --synthesize-context
npx agentdb@latest skill search "state park pattern rail trail" 5
npx agentdb@latest reflexion critique-summary "WVWO"
```

---

## Research Focus (Researcher Agent)

**Key Queries**:
- "North Bend Rail Trail tunnel biking"
- "North Bend State Park lodge cabins"
- "North Bend State Park activities fishing"
- "North Bend State Park distance from I-79"

**Data Priorities**:
- Rail Trail: 72-mile North Bend Rail Trail (park is midpoint)
- Unique feature: Silver Run Tunnel (3,295 feet, bring flashlight)
- Lodge: Modern lodge with restaurant, conference center
- Activities: Biking, hiking, fishing, horseback riding
- Season: Year-round (rail trail best spring-fall)
- Distance: ~100 minutes from shop (Ritchie County, north)

---

## Content Structure (Architect Agent)

**Frontmatter**:
```yaml
name: "North Bend State Park"
type: "State Park"
slug: "north-bend-state-park"
featured: false
coordinates: [39.22, -80.88]
description: "State park on the 72-mile North Bend Rail Trail with historic tunnel, modern lodge, and multi-use trails. About 100 minutes north from the shop."
amenities: ["Lodge & Restaurant", "Campground", "Marina", "Restrooms", "Conference Center"]
activities: ["Rail Trail Biking", "Hiking", "Fishing", "Horseback Riding", "Camping"]
difficulty: "Easy to Moderate"
season: "Year-round (Best: Spring-Fall)"
distanceFromShop: "80 miles"
drivingTime: "100 minutes"
```

**Voice Guidelines**:
```
✅ "North Bend sits on the 72-mile Rail Trail with a historic tunnel you can bike through. Lodge has a restaurant if you don't want to camp. About 100 minutes north from the shop."

❌ "Embark on an epic rail-trail adventure through mountainous terrain and historic engineering marvels!"
```

---

## Implementation (Coder Agent)

**File Path**: `c:\Users\matth\Desktop\wvwo-storefront\wv-wild-web\src\content\adventures\north-bend-state-park.md`

**Content Sample**:
```markdown
North Bend State Park is built around the North Bend Rail Trail, a 72-mile converted railroad route. The park sits at the midpoint of the trail and features a historic 3,295-foot tunnel you can bike or hike through. Modern lodge, camping, and fishing. About 100 minutes north from the shop.

## North Bend Rail Trail

The rail trail follows an old Baltimore & Ohio Railroad route. Mostly flat (rail grades are gentle), crushed limestone surface, great for biking or walking.

**Total Length**: 72 miles (park is midpoint)
**Surface**: Crushed limestone, some paved sections
**Difficulty**: Easy (gentle grades, no steep hills)
**Best For**: Cycling, walking, horseback riding

## Silver Run Tunnel

Historic railroad tunnel (3,295 feet long) you can bike or walk through. It's dark inside - bring a flashlight or headlamp. Cool even in summer.

**Length**: 3,295 feet (over half a mile)
**Warning**: Pitch black inside - lights required
**Temperature**: Cool year-round (50-60°F even in summer)
**Surface**: Gravel, some water pooling

## Lodge & Accommodations

North Bend has a modern lodge with restaurant, making it a good option if you want amenities.

**Lodge**: Rooms with standard hotel amenities
**Restaurant**: Open for breakfast, lunch, dinner
**Cabins**: Also available for families
**Campground**: Traditional campsites with hookups

## Fishing

North Bend Lake (park lake) is stocked with bass, catfish, bluegill.

**Species**: Largemouth bass, channel catfish, bluegill
**Access**: Bank fishing, small boats (electric motors only)
**License**: WV fishing license required

## Kim's Take

*North Bend is unique because of the rail trail and tunnel. If you're planning to bike the trail, stop by the shop for bike lights (you'll need them for the tunnel), water bottles, and snacks. The tunnel stays cool even in summer - bring a jacket.*

*The lodge restaurant is convenient if you're not camping. Good food, reasonable prices.*

## Getting There from the Shop

North on I-79 to Weston, then Route 50 west to Harrisville area. About 80 miles, 100 minutes. Ritchie County.

**Rail Trail Access**: Park is midpoint - you can start here and bike either direction.

Grand love ya.
```

---

## Validation (Tester Agent)

**Checklist**:
- [ ] Rail trail details (72 miles, gentle grades, crushed limestone)
- [ ] Tunnel safety info (3,295 feet, pitch black, lights required)
- [ ] Lodge amenities (restaurant, rooms, conference center)
- [ ] Distance accuracy (~100 minutes north, Ritchie County)
- [ ] Shop tie-in natural (bike lights for tunnel, water bottles)

---

## Success Criteria

✅ Rail trail focus with tunnel as unique feature
✅ Tunnel safety emphasized (lights required, cool temps)
✅ Lodge option for non-campers
✅ Shop crossover natural (bike lights, jacket, supplies)
✅ Pattern stored for rail-trail state park pages
