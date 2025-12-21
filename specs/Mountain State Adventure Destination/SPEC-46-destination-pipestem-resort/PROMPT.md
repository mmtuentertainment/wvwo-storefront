# SPEC-46: Pipestem Resort State Park Destination Page

**Type**: WV State Park Resort (lodging + recreation)
**Template**: Resort pattern
**Assigned Swarm**: 5-agent hierarchical coordination

---

## Agent Selection

| Agent | Role | Why Selected |
|-------|------|--------------|
| `hierarchical-coordinator` | **Leader** | Orchestrates state park resort page |
| `researcher` | **Scout** | Researches Pipestem lodge, trails, Bluestone River access |
| `architect` | **Designer** | Designs content for state-run resort park |
| `coder` | **Builder** | Implements `/wv-wild-web/src/content/adventures/pipestem-resort.md` |
| `tester` | **Validator** | Reviews pricing accuracy, state park regulations |

**Execution**: `npx claude-flow@alpha swarm hierarchical "<this prompt>"`

---

## AgentDB Context Loading


```bash
npx agentdb@latest reflexion retrieve "WV state park resorts" --k 10 --synthesize-context
npx agentdb@latest reflexion retrieve "Bluestone River fishing" --k 10 --synthesize-context
npx agentdb@latest skill search "resort pattern state park" 5
npx agentdb@latest reflexion critique-summary "WVWO"

```

---

## Research Focus (Researcher Agent)

**Key Queries**:
- "Pipestem Resort State Park lodging cabins"
- "Pipestem Resort aerial tram canyon"
- "Bluestone River fishing Pipestem"
- "Pipestem Resort distance from I-79"

**Data Priorities**:
- Lodging: McKeever Lodge (rim), Mountain Creek Lodge (canyon via tram)
- Bluestone River: Smallmouth bass, muskie fishing
- Aerial tram: 3,600 feet to canyon floor
- Trails: 30+ miles hiking, horseback riding
- Distance from shop: 110 miles south
- Deer/turkey hunting: Pipestem backcountry

---

## Content Structure (Architect Agent)

**Frontmatter**:

```yaml
name: "Pipestem Resort State Park"
type: "State Park Resort"
slug: "pipestem-resort"
featured: false
coordinates: [37.53, -80.96]
description: "WV's canyon resort with aerial tram, Bluestone River fishing, and 4,000-acre backcountry. Lodging, trails, and family recreation."
amenities: ["Lodge", "Cabins", "Restaurant", "Aerial Tram", "Campground"]
activities: ["Hiking", "Fishing (Bluestone River)", "Horseback Riding", "Hunting (Backcountry)"]
difficulty: "Easy to Moderate"
season: "Year-round"
distanceFromShop: "110 miles"
drivingTime: "2 hours 15 minutes"

```

**Voice Guidelines**:

```
✅ "Pipestem has two lodges - one on the canyon rim, one at the bottom you reach by aerial tram. The canyon lodge sits right on the Bluestone River."

❌ "Experience breathtaking views and world-class amenities at Pipestem's award-winning resort!"

```

---

## Implementation (Coder Agent)

**File Path**: `./wv-wild-web\src\content\adventures\pipestem-resort.md`

**Content Sample**:

```markdown
Pipestem Resort is a state park with two lodges, an aerial tram down a 1,000-foot gorge, and the Bluestone River for fishing. If you want WV state park lodging with more amenities than most, this is it.

## What's There

**Lodging**
- McKeever Lodge (canyon rim) - Standard state park lodge
- Mountain Creek Lodge (canyon floor) - Access by aerial tram only
- Cabins (various sizes)
- Campground (RV + tent sites)

**Aerial Tram**
3,600-foot tram ride down to the canyon floor. Mountain Creek Lodge is tram-access only - no road in.

**Bluestone River**
Fishing for smallmouth bass and muskie. River access from Mountain Creek Lodge and hiking trails.

## Hunting & Fishing

**Fishing**: Bluestone River (smallmouth bass, muskie, catfish)
**Hunting**: Deer and turkey in designated backcountry areas (WV state park hunting regulations apply)

## Kim's Take

*Pipestem is a good family destination - lodge, restaurant, tram ride for the kids, and fishing if you want it. The Bluestone River fishing is underrated - Bryan's caught nice smallmouth here in summer.*

*If you're staying at Mountain Creek Lodge (the one at the bottom of the tram), bring everything you need - it's tram-access only. We can set you up with fishing gear before you go.*

## Getting There from the Shop

South on I-79, then Route 20 south near Hinton. Well-signed for Pipestem Resort. About 110 miles, 2 hours 15 minutes.

Grand love ya.

```

---

## Validation (Tester Agent)

**Checklist**:
- [ ] Aerial tram unique feature emphasized
- [ ] Bluestone River fishing detailed
- [ ] State park hunting regulations noted
- [ ] Lodge accessibility (tram-only) clearly explained

---

## Success Criteria

✅ State park resort balances family recreation with fishing/hunting
✅ Unique feature (aerial tram) highlighted
✅ Bluestone River fishing crossover to shop gear
✅ Pattern stored for WV state park resort pages
