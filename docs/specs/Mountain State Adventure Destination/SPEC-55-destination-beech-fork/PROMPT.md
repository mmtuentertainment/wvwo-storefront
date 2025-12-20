# SPEC-55: Beech Fork State Park Destination Page

**Type**: State park (lake + camping)
**Template**: State park pattern
**Assigned Swarm**: 5-agent hierarchical coordination

---

## Agent Selection

**Topology**: Hierarchical (coordinator → researcher + architect → coder + tester)

| Agent | Role | Why Selected |
|-------|------|--------------|
| `hierarchical-coordinator` | **Leader** | Orchestrates state park page |
| `researcher` | **Scout** | Researches Beech Fork lake, campground, I-64 proximity |
| `architect` | **Designer** | Designs content for southern WV lake park |
| `coder` | **Builder** | Implements `/wv-wild-web/src/content/adventures/beech-fork.md` |
| `tester` | **Validator** | Reviews lake fishing, campground facilities, distance |

**Execution**: `npx claude-flow@alpha swarm hierarchical "<this prompt>"`

---

## AgentDB Context Loading

```bash
npx agentdb@latest reflexion retrieve "state park lake fishing" --k 10 --synthesize-context
npx agentdb@latest reflexion retrieve "I-64 corridor destinations" --k 10 --synthesize-context
npx agentdb@latest skill search "state park pattern lake" 5
npx agentdb@latest reflexion critique-summary "WVWO"
npx agentdb@latest db stats
```

---

## WVWO Context (Critical Constraints)

**From CLAUDE.md**:
- **Audience**: I-79/I-64 corridor travelers, southern WV hunters/fishermen
- **Voice**: Kim's authentic, humble (not state tourism board speak)
- **Phase**: Phase 3B - Highway Hunter Capture (geographic SEO)

---

## Research Focus (Researcher Agent)

**Research Queries**:
```bash
WebSearch "Beech Fork State Park lake fishing bass"
WebSearch "Beech Fork State Park campground cabins"
WebSearch "Beech Fork State Park Huntington WV"
WebSearch "Beech Fork State Park distance from I-64"
```

**Data to Extract**:
- Size: 760-acre lake
- Fish species: Largemouth bass, crappie, catfish
- Campground: 275 campsites (full hookups available)
- Cabins: Available (reserve ahead)
- Location: Near Huntington, WV (I-64 access)
- Distance from shop: 125 miles south
- Season: Year-round (fishing best spring/summer)

**Deliverable**: Research findings stored in memory
```bash
npx claude-flow@alpha hooks post-task \
  --task-id "researcher-beech-fork" \
  --memory-key "swarm/spec-55/research"
```

---

## Content Structure (Architect Agent)

**Frontmatter**:
```yaml
name: "Beech Fork State Park"
type: "State Park"
slug: "beech-fork"
featured: false
coordinates: [38.38, -82.32]
description: "760-acre lake near Huntington with bass and crappie fishing, 275-site campground, and family recreation. I-64 corridor access."
amenities: ["Campground", "Cabins", "Boat Ramp", "Swimming Beach"]
activities: ["Fishing (Bass, Crappie)", "Boating", "Swimming", "Camping"]
difficulty: "Easy"
season: "Year-round"
distanceFromShop: "125 miles"
drivingTime: "2 hours 30 minutes"
```

**Voice Guidelines**:
```
✅ "Beech Fork is a good family camping spot near Huntington - 760-acre lake with decent bass fishing and a big campground."

❌ "Experience family fun and aquatic adventures at Beech Fork's scenic lakeside retreat!"
```

**Deliverable**: Content structure stored in memory
```bash
npx claude-flow@alpha hooks post-edit \
  --file "beech-fork-structure" \
  --memory-key "swarm/spec-55/architecture"
```

---

## Implementation (Coder Agent)

**File Path**: `c:\Users\matth\Desktop\wvwo-storefront\wv-wild-web\src\content\adventures\beech-fork.md`

**Content**:
```markdown
---
name: "Beech Fork State Park"
type: "State Park"
slug: "beech-fork"
featured: false
coordinates:
  latitude: 38.38
  longitude: -82.32
address: "5601 Long Branch Rd, Barboursville, WV 25504"
description: "760-acre lake near Huntington with bass and crappie fishing, 275-site campground, and family recreation. Easy I-64 corridor access."

amenities:
  - "Campground (275 sites)"
  - "Cabins"
  - "Boat Ramp"
  - "Swimming Beach"
  - "Playground"

activities:
  - "Fishing (Bass, Crappie, Catfish)"
  - "Boating"
  - "Swimming"
  - "Camping"

difficulty: "Easy"
season: "Year-round"
distanceFromShop: "125 miles"
drivingTime: "2 hours 30 minutes"

regulations:
  - "WV fishing license required"
  - "No-wake zones near swimming area"
  - "Campground reservations recommended (summer weekends)"

safety:
  - "Life jackets required for children under 13"
  - "Swimming area supervised (summer season)"
  - "Boating speed limits enforced"

website: "https://wvstateparks.com/park/beech-fork-state-park/"
phoneNumber: "(304) 528-5794"
---

Beech Fork State Park sits near Huntington with a 760-acre lake, 275-site campground, and family recreation. It's southern West Virginia's biggest state park campground - good for weekend camping trips without driving deep into the mountains.

## Fishing

**Species**: Largemouth bass, crappie, catfish, bluegill
**Best Times**: Spring (crappie spawn), summer (bass topwater)
**Access**: Boat ramp at park, bank fishing along shoreline

The lake's decent for bass fishing - not a trophy fishery, but consistent action. Crappie fishing picks up in spring around brush piles.

## Camping

**275 campsites** (some with full hookups)
**Cabins** available (reserve ahead for summer)
**Swimming beach** (supervised in summer)
**Playground** and picnic areas

Big campground means you'll have neighbors, but facilities are well-maintained.

## Kim's Take

*Beech Fork is a solid family camping destination if you're in southern West Virginia. The campground is huge, so it can handle crowds, but that also means it's not a quiet wilderness experience.*

*Bass fishing is consistent, not spectacular. Good for kids learning to fish or a relaxing day on the water.*

*It's a long drive from the shop (2.5 hours), so this isn't a regular recommendation for our customers. But if you're near Huntington or coming up I-64, it's a good stop.*

## Getting There from the Shop

South on I-79 to I-64 east toward Huntington. Exit 11 for Barboursville. Follow signs to Beech Fork. About 125 miles, 2 hours 30 minutes.

**I-64 Corridor**: Easy access for out-of-state travelers on I-64.

Grand love ya.
```

**Code Quality Checks**:
- [ ] Frontmatter matches schema.org PlaceSchema
- [ ] Lake size accurate (760 acres)
- [ ] Campground capacity correct (275 sites)
- [ ] Distance from shop verified (125 miles)
- [ ] Kim's voice realistic (honest about distance, not overselling)
- [ ] I-64 corridor positioning clear
- [ ] Fishing species and seasons accurate

**Deliverable**: Working content file + memory update
```bash
npx claude-flow@alpha hooks post-edit \
  --file "wv-wild-web/src/content/adventures/beech-fork.md" \
  --memory-key "swarm/spec-55/implementation"
```

---

## Validation (Tester Agent)

**Validation Checklist**:

**WVWO Voice Audit**:
- [ ] NO state tourism marketing ("scenic lakeside retreat")
- [ ] YES Kim's honest assessment ("solid family spot, not wilderness")
- [ ] Distance acknowledged (long drive, not primary recommendation)
- [ ] Humble, realistic tone

**Geographic Accuracy**:
- [ ] Distance from shop verified (125 miles)
- [ ] I-64 corridor positioning clear
- [ ] Huntington proximity noted
- [ ] Directions from I-79/I-64 accurate

**Lake & Campground Info**:
- [ ] Lake size accurate (760 acres)
- [ ] Fish species verified (bass, crappie, catfish)
- [ ] Campground capacity correct (275 sites)
- [ ] Cabin availability mentioned

**Schema Compliance**:
```bash
# Validate frontmatter structure
npx agentdb@latest skill search "state park schema validation" 5
```

**Deliverable**: Test results stored in memory
```bash
npx claude-flow@alpha hooks post-task \
  --task-id "tester-validation" \
  --memory-key "swarm/spec-55/test-results"
```

---

## Session End Protocol

**Coordinator runs**:
```bash
# Store success pattern
npx agentdb@latest reflexion store "wvwo-session" "SPEC-55-beech-fork" 1.0 true "State park lake page: hierarchical swarm created content with honest distance assessment, I-64 corridor positioning, family camping focus, and Kim's realistic fishing expectations"

# Export session metrics
npx claude-flow@alpha hooks session-end --export-metrics true

# Summary to user
echo "SPEC-55 Complete: Beech Fork State Park destination page ready at wv-wild-web/src/content/adventures/beech-fork.md"
```

---

## Success Criteria

✅ **Content Complete**:
- Beech Fork page created with state park + lake template
- Lake fishing (bass, crappie) detailed
- Large campground capacity noted (275 sites)
- I-64 corridor positioning clear

✅ **WVWO Compliance**:
- Kim's voice honest about distance (long drive, not primary rec)
- Family camping focus (not wilderness solitude)
- Realistic fishing expectations (consistent, not trophy)
- Faith-forward, humble tone

✅ **Quality Checks**:
- Schema.org markup validated
- Lake size and species accurate
- Campground details verified
- Pattern stored in AgentDB for southern WV state park pages

---

**Coordinator**: Execute this prompt via hierarchical swarm, coordinate agents through memory, store learnings in AgentDB.
