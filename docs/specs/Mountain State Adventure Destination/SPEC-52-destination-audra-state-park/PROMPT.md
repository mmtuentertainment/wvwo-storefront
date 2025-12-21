# SPEC-52: Audra State Park Destination Page

**Type**: State park (river swimming + camping)
**Template**: State park pattern
**Assigned Swarm**: 5-agent hierarchical coordination

---

## Agent Selection

| Agent | Role | Why Selected |
|-------|------|--------------|
| `hierarchical-coordinator` | **Leader** | Orchestrates state park page |
| `researcher` | **Scout** | Researches Audra swimming holes, Middle Fork River, trails |
| `architect` | **Designer** | Designs content for family summer recreation |
| `coder` | **Builder** | Implements `/wv-wild-web/src/content/adventures/audra-state-park.md` |
| `tester` | **Validator** | Reviews swimming safety info, campground details |

**Execution**: `npx claude-flow@alpha swarm hierarchical "<this prompt>"`

---

## AgentDB Context Loading

```bash
npx agentdb@latest reflexion retrieve "state park swimming WV" --k 10 --synthesize-context
npx agentdb@latest reflexion retrieve "family camping destinations" --k 10 --synthesize-context
npx agentdb@latest skill search "state park pattern river" 5
npx agentdb@latest reflexion critique-summary "WVWO"

```

---

## Research Focus (Researcher Agent)

**Key Queries**:

- "Audra State Park Middle Fork River swimming"
- "Audra State Park camping reservations"
- "Audra State Park trails boardwalk"
- "Audra State Park distance from I-79"

**Data Priorities**:

- River: Middle Fork River (swimming, wading, tubing)
- Unique feature: Natural swimming holes, sandy beaches
- Camping: 65 campsites (electric hookups available)
- Trails: Boardwalk along river, short hikes
- Season: Summer (swimming), year-round (camping)
- Distance: 50 miles from shop (I-79 Exit 99)

---

## Content Structure (Architect Agent)

**Frontmatter**:

```yaml
name: "Audra State Park"
type: "State Park"
slug: "audra-state-park"
featured: false
coordinates: [38.93, -80.06]
description: "Family-friendly state park on Middle Fork River with natural swimming holes, sandy beaches, and riverside camping. 50 minutes from the shop."
amenities: ["Campground", "Swimming", "Picnic Areas", "Restrooms"]
activities: ["Swimming", "Tubing", "Camping", "Hiking"]
difficulty: "Easy"
season: "Year-round (Swimming: Summer)"
distanceFromShop: "50 miles"
drivingTime: "50 minutes"

```

**Voice Guidelines**:

```
✅ "Audra is the closest state park to the shop with good river swimming. Middle Fork River has natural pools and sandy beaches."

❌ "Discover refreshing aquatic adventures at Audra's pristine riverside paradise!"

```

---

## Implementation (Coder Agent)

**File Path**: `./wv-wild-web\src\content\adventures\audra-state-park.md`

**Content Sample**:

```markdown
Audra State Park sits on the Middle Fork River with natural swimming holes, sandy beaches, and riverside camping. It's the closest state park to the shop with good summer swimming - about 50 minutes up I-79.

## Swimming

Middle Fork River has several natural pools deep enough for swimming. Sandy beaches along the river make it family-friendly. Water's cold even in summer (spring-fed).

**Best Time**: June-August (warmest water temps)
**Depth**: Varies - check before diving
**Current**: Moderate (not whitewater, but respect the river)

## Camping

**Sites**: 65 campsites (some with electric hookups)
**Reservations**: Recommended for summer weekends
**Facilities**: Restrooms, showers, playground

Riverside sites are popular - book early if you want one.

## Hiking

Short trails along the river with boardwalk sections. Nothing strenuous - mostly flat riverside walking.

## Kim's Take

*Audra is our go-to state park recommendation for families with kids. The swimming is safe, the campground is well-maintained, and it's close enough for a weekend trip without a long drive.*

*If you're camping and need anything (bug spray, firewood, fishing tackle for the river), stop by the shop on your way - we're right off I-79 at Exit 57.*

## Getting There from the Shop

North on I-79 to Exit 99 (Buckhannon). Follow Route 119 south to park entrance. About 50 miles, 50 minutes.

**Closest State Park to WVWO**: Makes Audra an easy recommendation for our customers.

Grand love ya.

```

---

## Validation (Tester Agent)

**Checklist**:

- [ ] Swimming safety info (cold water, check depth)
- [ ] Campground reservation tip (summer weekends)
- [ ] Distance accuracy (50 miles, closest to shop)
- [ ] Shop tie-in natural (on the way, easy stop)

---

## Success Criteria

✅ State park page emphasizes proximity to shop (closest park)
✅ Family-friendly swimming highlighted
✅ Shop crossover natural (stop by on the way)
✅ Pattern stored for nearby state park pages
