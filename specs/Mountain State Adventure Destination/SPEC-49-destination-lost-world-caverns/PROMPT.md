# SPEC-49: Lost World Caverns Destination Page

**Type**: Commercial cave attraction
**Template**: Cave pattern
**Assigned Swarm**: 5-agent hierarchical coordination

---

## Agent Selection

| Agent | Role | Why Selected |
|-------|------|--------------|
| `hierarchical-coordinator` | **Leader** | Orchestrates cave destination page |
| `researcher` | **Scout** | Researches Lost World tour options, hours, pricing, accessibility |
| `architect` | **Designer** | Designs content for commercial attraction (family-friendly) |
| `coder` | **Builder** | Implements `/wv-wild-web/src/content/adventures/lost-world-caverns.md` |
| `tester` | **Validator** | Reviews tour info accuracy, pricing current |

**Execution**: `npx claude-flow@alpha swarm hierarchical "<this prompt>"`

---

## AgentDB Context Loading


```bash
npx agentdb@latest reflexion retrieve "cave attractions WV" --k 10 --synthesize-context
npx agentdb@latest reflexion retrieve "family-friendly tourist stops" --k 10 --synthesize-context
npx agentdb@latest skill search "cave pattern commercial" 5
npx agentdb@latest reflexion critique-summary "WVWO"

```

---

## Research Focus (Researcher Agent)

**Key Queries**:
- "Lost World Caverns Lewisburg WV tours"
- "Lost World Caverns admission prices hours"
- "Lost World Caverns wild cave tour"
- "Lost World Caverns distance from I-64"

**Data Priorities**:
- Location: Lewisburg, WV (I-64 Exit 169)
- Tour options: Self-guided walkway, wild cave tour
- Features: War Club stalactite, 40+ feet formations
- Accessibility: Self-guided tour has stairs (not wheelchair-accessible)
- Season: Year-round, closed major holidays
- Distance from shop: 100 miles south
- Admission: ~$15-20 per adult (verify current pricing)

---

## Content Structure (Architect Agent)

**Frontmatter**:

```yaml
name: "Lost World Caverns"
type: "Cave Attraction"
slug: "lost-world-caverns"
featured: false
coordinates: [37.79, -80.38]
description: "Self-guided cave tour near Lewisburg with 40-foot stalactites and wild cave adventure option. I-64 Exit 169, year-round attraction."
amenities: ["Gift Shop", "Restrooms", "Parking"]
activities: ["Cave Tour (Self-Guided)", "Wild Cave Tour (Advanced)", "Gemstone Mining"]
difficulty: "Easy (Self-Guided), Advanced (Wild Cave)"
season: "Year-round"
distanceFromShop: "100 miles"
drivingTime: "2 hours"

```

**Voice Guidelines**:

```
✅ "Lost World Caverns is a good rainy-day stop if you're heading to or from New River Gorge. Self-guided tour means you go at your own pace."

❌ "Embark on an unforgettable journey through subterranean wonders!"

```

---

## Implementation (Coder Agent)

**File Path**: `./wv-wild-web\src\content\adventures\lost-world-caverns.md`

**Content Sample**:

```markdown
Lost World Caverns is a commercial cave tour near Lewisburg - self-guided walkway through large rooms with 40-foot stalactites. Good rainy-day stop if you're heading to or from New River Gorge.

## What to Expect

**Self-Guided Tour** (standard admission)
- Walk at your own pace on paved/metal walkways
- Stairs (120 steps down, 120 back up) - not wheelchair-accessible
- 30-45 minutes depending on your pace
- War Club stalactite (40+ feet long)

**Wild Cave Tour** (reservations required)
- 4-hour crawling, climbing, squeezing adventure
- Helmet, light, coveralls provided
- Ages 12+ only, good physical condition required

**Other**: Gemstone mining for kids (outdoor sluice)

## Kim's Take

*Not a wilderness destination, but a decent tourist stop if you've got kids or weather's bad. The self-guided setup is nice - you're not rushed through by a tour guide.*

*Close to Lewisburg (cute town, good restaurants). I-64 Exit 169, easy to find.*

## Getting There from the Shop

South on I-79 to I-64 east near Beckley. Exit 169 for Lewisburg. Follow signs to Lost World Caverns (about 5 miles from interstate). 100 miles, 2 hours.

**Hours**: Year-round, typically 9am-5pm (check website for current hours)
**Admission**: Around $15-20 per adult (check website for current pricing)

Grand love ya.

```

---

## Validation (Tester Agent)

**Checklist**:
- [ ] Accessibility info clear (stairs, not wheelchair-accessible)
- [ ] Wild cave tour requirements noted (age, fitness level)
- [ ] Pricing caveat (check website for current)
- [ ] Voice realistic (tourist stop, not epic adventure)

---

## Success Criteria

✅ Cave page balances tourist attraction with practical info
✅ Self-guided vs wild cave tours differentiated
✅ Honest positioning (rainy-day stop, not primary destination)
✅ Pattern stored for commercial cave attraction pages
