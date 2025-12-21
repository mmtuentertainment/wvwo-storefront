# SPEC-45: Timberline Resort Destination Page

**Type**: Ski resort (winter) + summer recreation
**Template**: Resort pattern
**Assigned Swarm**: 5-agent hierarchical coordination

---

## Agent Selection

| Agent | Role | Why Selected |
|-------|------|--------------|
| `hierarchical-coordinator` | **Leader** | Orchestrates resort page creation |
| `researcher` | **Scout** | Researches Timberline ski season, summer activities, lodging |
| `architect` | **Designer** | Designs dual-season content (winter ski, summer mountain bike) |
| `coder` | **Builder** | Implements `/wv-wild-web/src/content/adventures/timberline-resort.md` |
| `tester` | **Validator** | Reviews seasonal accuracy, resort partnership tone |

**Execution**: `npx claude-flow@alpha swarm hierarchical "<this prompt>"`

---

## AgentDB Context Loading

```bash
npx agentdb@latest reflexion retrieve "ski resort WV" --k 10 --synthesize-context
npx agentdb@latest reflexion retrieve "dual-season resort content" --k 10 --synthesize-context
npx agentdb@latest skill search "resort pattern seasonal" 5
npx agentdb@latest reflexion critique-summary "WVWO"

```

---

## Research Focus (Researcher Agent)

**Key Queries**:

- "Timberline Resort Canaan Valley ski season"
- "Timberline Resort mountain biking summer"
- "Timberline Four Seasons Resort lodging"
- "Timberline Resort distance from I-79"

**Data Priorities**:

- Location: Canaan Valley, WV (high elevation skiing)
- Winter: Skiing, snowboarding (Dec-March)
- Summer: Mountain biking, hiking, golf
- Lodging: Slope-side condos, hotel rooms
- Distance from shop: 120 miles (2.5 hours via I-79 north)
- Hunting angle: Canaan Valley NWR nearby (waterfowl)

---

## Content Structure (Architect Agent)

**Frontmatter**:

```yaml
name: "Timberline Resort"
type: "Ski Resort"
slug: "timberline-resort"
featured: false
coordinates: [39.06, -79.40]
description: "Canaan Valley's highest ski resort with 42 trails, slope-side lodging, and summer mountain biking. 2.5 hours north via I-79."
amenities: ["Lodging", "Restaurant", "Ski Rentals", "Bike Rentals"]
activities: ["Skiing", "Snowboarding", "Mountain Biking", "Hiking"]
difficulty: "Beginner to Advanced"
season: "Year-round (Ski: Dec-March, Bike: May-Oct)"
distanceFromShop: "120 miles"
drivingTime: "2 hours 30 minutes"

```

**Voice Guidelines**:

```
✅ "Timberline is the highest ski area in West Virginia - good snow, long season, and you can stay slope-side."

❌ "Elevate your winter adventure at Timberline's world-class alpine resort!"

```

---

## Implementation (Coder Agent)

**File Path**: `./wv-wild-web\src\content\adventures\timberline-resort.md`

**Content Sample**:

```markdown
Timberline Resort is Canaan Valley's highest ski area - 42 trails, slope-side lodging, and enough elevation to get reliable snow. In summer, the ski runs turn into mountain bike trails.

## Winter (Skiing & Snowboarding)

**Season**: December-March (snow-dependent)
**Trails**: 42 trails (beginner to expert)
**Elevation**: 4,268 feet summit (highest in WV)
**Lifts**: 3 chairs, 2 surface lifts

Good for families - plenty of beginner terrain and ski school programs.

## Summer (Mountain Biking & Hiking)

The ski runs become downhill mountain bike trails. Lift-served biking saves the climb. Also hiking trails through Canaan Valley.

## Kim's Take

*If you're heading to Canaan Valley for skiing, Timberline is convenient - you can walk from your room to the lifts. In summer, Canaan Valley National Wildlife Refuge is nearby if you're into waterfowl hunting or birding.*

*It's a haul from the shop (2.5 hours), but if you're making a weekend of it, worth the drive for the snow quality.*

## Getting There from the Shop

North on I-79 to Route 48 east through Davis. Timberline is just past Canaan Valley Resort. 120 miles, 2.5 hours.

Grand love ya.

```

---

## Validation (Tester Agent)

**Checklist**:

- [ ] Dual-season content balanced (winter + summer)
- [ ] Elevation/snow quality emphasized (highest in WV)
- [ ] Canaan Valley NWR connection (waterfowl hunting tie-in)
- [ ] Distance realistic (long drive acknowledged)

---

## Success Criteria

✅ Resort page covers both ski season and summer activities
✅ Hunting tie-in (Canaan Valley NWR waterfowl)
✅ Distance from shop honest (long but doable weekend)
✅ Pattern stored for dual-season resort pages
