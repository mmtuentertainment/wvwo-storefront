# SPEC-47: Cathedral State Park Destination Page

**Type**: Old-growth forest state park
**Template**: State park pattern
**Assigned Swarm**: 5-agent hierarchical coordination

---

## Agent Selection

| Agent | Role | Why Selected |
|-------|------|--------------|
| `hierarchical-coordinator` | **Leader** | Orchestrates state park page creation |
| `researcher` | **Scout** | Researches Cathedral old-growth hemlock forest, trails, accessibility |
| `architect` | **Designer** | Designs content for unique old-growth forest angle |
| `coder` | **Builder** | Implements `/wv-wild-web/src/content/adventures/cathedral-state-park.md` |
| `tester` | **Validator** | Reviews ecological accuracy, accessibility info |

**Execution**: `npx claude-flow@alpha swarm hierarchical "<this prompt>"`

---

## AgentDB Context Loading

```bash
npx agentdb@latest reflexion retrieve "state park WV" --k 10 --synthesize-context
npx agentdb@latest reflexion retrieve "old-growth forest trails" --k 10 --synthesize-context
npx agentdb@latest skill search "state park pattern" 5
npx agentdb@latest reflexion critique-summary "WVWO"

```

---

## Research Focus (Researcher Agent)

**Key Queries**:

- "Cathedral State Park old-growth hemlock forest"
- "Cathedral State Park hiking trails accessibility"
- "Cathedral State Park distance from I-79"
- "Cathedral State Park Aurora WV"

**Data Priorities**:

- Size: 133 acres (small park, big trees)
- Old-growth: 350+ year-old hemlocks
- Trails: 3 miles easy walking (loop trails)
- Accessibility: Boardwalks, paved sections
- Season: Year-round (especially pretty spring/fall)
- Distance: 140 miles from shop (far north)
- Unique angle: "Cathedral-like" canopy

---

## Content Structure (Architect Agent)

**Frontmatter**:

```yaml
name: "Cathedral State Park"
type: "State Park"
slug: "cathedral-state-park"
featured: false
coordinates: [39.38, -79.54]
description: "133-acre virgin hemlock forest with 350-year-old trees and easy walking trails. WV's only old-growth state park."
amenities: ["Picnic Area", "Restrooms", "Boardwalk Trails"]
activities: ["Hiking", "Nature Photography", "Birdwatching"]
difficulty: "Easy"
season: "Year-round"
distanceFromShop: "140 miles"
drivingTime: "2 hours 45 minutes"

```

**Voice Guidelines**:

```
✅ "Cathedral State Park is the only place in West Virginia where you can walk through virgin forest - trees that were here before settlers came."

❌ "Experience the awe-inspiring majesty of ancient woodland sanctuaries!"

```

---

## Implementation (Coder Agent)

**File Path**: `./wv-wild-web\src\content\adventures\cathedral-state-park.md`

**Content Sample**:

```markdown
Cathedral State Park is 133 acres of old-growth hemlock forest - trees that are 350+ years old, some over 90 feet tall. It's the only virgin forest state park in West Virginia, and the canopy feels like walking through a cathedral.

## What Makes It Special

These hemlocks were here before European settlement. The canopy is so thick, it stays cool and dim even on summer days. The forest floor is mostly ferns and moss - not much underbrush.

**Trails**: 3 miles of easy loop trails (boardwalks and packed earth)
**Accessibility**: Boardwalk sections make parts wheelchair-accessible

## Kim's Take

*This isn't a hunting or fishing destination - it's just a quiet walk through some of the oldest trees in the state. Good spot to stretch your legs if you're heading north toward Deep Creek Lake or passing through on Route 50.*

*It's a haul from the shop (2 hours 45 minutes), so most folks won't make a special trip. But if you're in the area, worth the stop.*

## Getting There from the Shop

North on I-79 to Route 50 east near Grafton. Follow Route 50 through Aurora. Park entrance is off Route 50. 140 miles, 2 hours 45 minutes.

Grand love ya.

```

---

## Validation (Tester Agent)

**Checklist**:

- [ ] Old-growth age accurate (350+ years verified)
- [ ] Accessibility info clear (boardwalk sections)
- [ ] Honest about distance (far from shop, not primary destination)
- [ ] Voice humble (quiet walk, not "awe-inspiring experience")

---

## Success Criteria

✅ State park page emphasizes unique old-growth forest
✅ Accessibility features noted (boardwalks)
✅ Honest about distance and appeal (scenic detour, not main destination)
✅ Pattern stored for specialty state park pages
