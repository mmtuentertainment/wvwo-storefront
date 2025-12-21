# SPEC-48: Coopers Rock State Forest Destination Page

**Type**: State forest (overlook + rock climbing)
**Template**: State park pattern
**Assigned Swarm**: 5-agent hierarchical coordination

---

## Agent Selection

| Agent | Role | Why Selected |
|-------|------|--------------|
| `hierarchical-coordinator` | **Leader** | Orchestrates state forest page creation |
| `researcher` | **Scout** | Researches Coopers Rock overlook, climbing routes, Cheat River proximity |
| `architect` | **Designer** | Designs content for dual-use park (scenic + climbing) |
| `coder` | **Builder** | Implements `/wv-wild-web/src/content/adventures/coopers-rock.md` |
| `tester` | **Validator** | Reviews climbing info accuracy, overlook accessibility |

**Execution**: `npx claude-flow@alpha swarm hierarchical "<this prompt>"`

---

## AgentDB Context Loading

```bash
npx agentdb@latest reflexion retrieve "rock climbing WV" --k 10 --synthesize-context
npx agentdb@latest reflexion retrieve "scenic overlooks state parks" --k 10 --synthesize-context
npx agentdb@latest skill search "state park pattern climbing" 5
npx agentdb@latest reflexion critique-summary "WVWO"

```

---

## Research Focus (Researcher Agent)

**Key Queries**:

- "Coopers Rock State Forest overlook Cheat River Gorge"
- "Coopers Rock climbing routes grades"
- "Coopers Rock hiking trails mountain biking"
- "Coopers Rock distance from I-79"

**Data Priorities**:

- Overlook: 1,200-foot view of Cheat River Gorge
- Rock climbing: 100+ trad routes (5.5 to 5.12)
- Trails: 50+ miles hiking, mountain biking allowed
- Hunting: Deer, turkey (state forest hunting regulations)
- Distance: 70 miles from shop (I-79 Exit 15 near Morgantown)
- Season: Year-round (climbing best spring/fall)

---

## Content Structure (Architect Agent)

**Frontmatter**:

```yaml
name: "Coopers Rock State Forest"
type: "State Forest"
slug: "coopers-rock"
featured: false
coordinates: [39.65, -79.78]
description: "12,747-acre state forest with iconic Cheat River Gorge overlook and 100+ rock climbing routes. I-79 Exit 15 near Morgantown."
amenities: ["Picnic Area", "Overlook", "Camping", "Restrooms"]
activities: ["Rock Climbing", "Hiking", "Mountain Biking", "Hunting (Deer, Turkey)"]
difficulty: "Easy to Advanced" (depending on activity)
season: "Year-round"
distanceFromShop: "70 miles"
drivingTime: "1 hour 20 minutes"

```

**Voice Guidelines**:

```
✅ "Coopers Rock is famous for the overlook - 1,200 feet above the Cheat River Gorge. Rock climbers know it for the trad routes."

❌ "Discover breathtaking vistas and world-class climbing at Coopers Rock's legendary crags!"

```

---

## Implementation (Coder Agent)

**File Path**: `./wv-wild-web\src\content\adventures\coopers-rock.md`

**Content Sample**:

```markdown
Coopers Rock State Forest has the most famous overlook in northern West Virginia - a 1,200-foot view straight down into the Cheat River Gorge. Rock climbers know it for 100+ traditional climbing routes, and hikers have 50+ miles of trails to explore.

## What's There

**The Overlook**
Paved, accessible platform overlooking Cheat River Gorge. Popular spot for photos and picnics. Can get crowded on fall weekends.

**Rock Climbing**
100+ traditional climbing routes (5.5 to 5.12 grades). Sandstone with solid cracks. Climbers need rack and rope - no sport climbing bolts.

**Hiking & Mountain Biking**
50+ miles of trails through hardwood forest. Mountain bikes allowed on most trails. Some steep sections.

**Hunting**
Deer and turkey hunting allowed (WV state forest hunting regulations). Good deer population.

## Kim's Take

*If you're passing through on I-79, Coopers Rock is worth the detour for the overlook. It's right off Exit 15 near Morgantown - easy stop.*

*For climbers: This is trad climbing, not sport. Bring a full rack and rope. If you're new to outdoor climbing, hire a guide or go with experienced friends.*

## Getting There from the Shop

North on I-79 to Exit 15 (Coopers Rock/Cheat Lake). Well-signed from exit. About 70 miles, 1 hour 20 minutes.

Grand love ya.

```

---

## Validation (Tester Agent)

**Checklist**:

- [ ] Climbing grades accurate (5.5 to 5.12 range)
- [ ] Trad vs sport climbing clarified (rack required)
- [ ] Overlook accessibility noted (paved platform)
- [ ] Hunting regulations mentioned (state forest rules)

---

## Success Criteria

✅ State forest page balances scenic overlook with climbing/hunting
✅ Trad climbing requirements clear (not beginner-friendly without guide)
✅ I-79 proximity emphasized (easy detour)
✅ Pattern stored for dual-use state forest pages
