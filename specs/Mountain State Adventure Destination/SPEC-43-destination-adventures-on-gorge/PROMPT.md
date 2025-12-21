# SPEC-43: Adventures on the Gorge Destination Page

**Type**: Commercial resort/outfitter (rafting + lodging)
**Template**: Resort pattern
**Assigned Swarm**: 5-agent hierarchical coordination

---

## Agent Selection

| Agent | Role | Why Selected |
|-------|------|--------------|
| `hierarchical-coordinator` | **Leader** | Orchestrates resort page creation |
| `researcher` | **Scout** | Researches Adventures on the Gorge offerings, pricing, I-79 access |
| `architect` | **Designer** | Designs content structure for commercial outfitter partnership |
| `coder` | **Builder** | Implements `/wv-wild-web/src/content/adventures/adventures-on-the-gorge.md` |
| `tester` | **Validator** | Reviews partnership tone, pricing accuracy, WVWO voice |

**Execution**: `npx claude-flow@alpha swarm hierarchical "<this prompt>"`

---

## AgentDB Context Loading


```bash
npx agentdb@latest reflexion retrieve "resort outfitter partnerships" --k 10 --synthesize-context
npx agentdb@latest reflexion retrieve "New River Gorge" --k 10 --synthesize-context
npx agentdb@latest skill search "resort pattern commercial" 5
npx agentdb@latest reflexion critique-summary "WVWO"

```

---

## Research Focus (Researcher Agent)

**Key Queries**:
- "Adventures on the Gorge New River rafting packages"
- "Adventures on the Gorge distance from I-79"
- "New River Gorge Bridge Day proximity"
- "Adventures on the Gorge cabin lodging pricing"

**Data Priorities**:
- Distance from shop (I-79 to Lansing, WV)
- Rafting trips: Upper New (Class III-IV), Lower New (Class III), Gauley (Class V)
- Lodging: Cabins, camping, bunkhouses
- Season: April-October (rafting), year-round (lodging)
- Partnership angle: "Stop at WVWO for gear before your trip"

---

## Content Structure (Architect Agent)

**Frontmatter**:

```yaml
name: "Adventures on the Gorge"
type: "Resort & Outfitter"
slug: "adventures-on-the-gorge"
featured: false
coordinates: [37.99, -81.05]
description: "New River Gorge's premier rafting outfitter with lodging, ziplines, and adventure packages. 90 minutes from the shop."
amenities: ["Lodging", "Restaurant", "Outfitter", "Zipline", "Rock Climbing"]
activities: ["Whitewater Rafting", "Zipline Tours", "Rock Climbing", "Mountain Biking"]
difficulty: "Beginner to Advanced"
season: "Year-round (Rafting: April-Oct)"
distanceFromShop: "85 miles"
drivingTime: "1 hour 30 minutes"

```

**Voice Guidelines**:

```
✅ "If you're planning a New River Gorge trip, Adventures on the Gorge has everything - rafting, lodging, food. Stop by the shop on your way for any gear you forgot."

❌ "Partner with Adventures on the Gorge for an unforgettable outdoor experience!"

```

---

## Implementation (Coder Agent)

**File Path**: `./wv-wild-web\src\content\adventures\adventures-on-the-gorge.md`

**Content Sample**:

```markdown
Adventures on the Gorge is the biggest outfitter in the New River Gorge - rafting, ziplines, lodging, food, the whole package. If you're coming from out of state and want everything in one place, this is it.

## What They Offer

**Whitewater Rafting**
- Upper New River (Class III-IV) - Full day trips
- Lower New River (Class III) - Family-friendly half-day
- Gauley River (Class V) - Fall release weekends (expert only)

**Lodging**
- Cabins (2-12 people)
- Campground (RV + tent sites)
- Bunkhouse (group lodging)

**Other Adventures**
- Zipline canopy tours
- Rock climbing lessons
- Mountain bike rentals
- Aerial adventure park

## Kim's Take

*If you're planning a weekend on the New River, Adventures on the Gorge makes it easy - you can raft, eat, and sleep all in one place. They're professional and handle big groups well.*

*Stop by the shop on your way down I-79. If you need rain gear, waterproof bags, or fishing tackle for after your rafting trip, we've got you covered.*

## Getting There from the Shop

South on I-79 to Route 19 toward Beckley. Exit at Lansing (New River Gorge Bridge area). Well-signed from Route 19. About 85 miles, 1.5 hours.

Grand love ya.

```

---

## Validation (Tester Agent)

**Checklist**:
- [ ] Partnership tone (helpful, not promotional)
- [ ] Pricing NOT listed (changes frequently, link to their site)
- [ ] Kim's voice maintains humble shop perspective
- [ ] Distance from shop accurate
- [ ] "Stop by for gear" tie-in natural

---

## Success Criteria

✅ Resort page balances commercial partnership with WVWO authentic voice
✅ No over-promotion (helpful info, not sales pitch)
✅ Shop tie-in natural ("stop by for gear you forgot")
✅ Pattern stored for future resort/outfitter pages
