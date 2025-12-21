# SPEC-41: Cheat River Destination Page

**Type**: River destination (whitewater rafting + fishing)
**Template**: River pattern
**Assigned Swarm**: 5-agent hierarchical coordination

---

## Agent Selection

**Topology**: Hierarchical (coordinator → researcher + architect → coder + tester)

| Agent | Role | Why Selected |
|-------|------|--------------|
| `hierarchical-coordinator` | **Leader** | Orchestrates destination page creation from research to implementation |
| `researcher` | **Scout** | Researches Cheat River access, rafting outfitters, fishing regulations, I-79 connection |
| `architect` | **Designer** | Designs content structure, schema.org markup, Kim's voice narrative |
| `coder` | **Builder** | Implements `/wv-wild-web/src/content/adventures/cheat-river.md` |
| `tester` | **Validator** | Reviews WVWO voice compliance, schema validation, local accuracy |

**Execution**: `npx claude-flow@alpha swarm hierarchical "<this prompt>"`

---

## AgentDB Context Loading (BEFORE Starting)


```bash
# Parallel context retrieval
npx agentdb@latest reflexion retrieve "river destinations" --k 10 --synthesize-context
npx agentdb@latest reflexion retrieve "whitewater rafting" --k 10 --synthesize-context
npx agentdb@latest reflexion retrieve "I-79 highway hunters" --k 10 --synthesize-context
npx agentdb@latest skill search "river page pattern" 5
npx agentdb@latest reflexion critique-summary "WVWO"
npx agentdb@latest db stats

```

---

## WVWO Context (Critical Constraints)

**From CLAUDE.md**:
- **Location**: 121 WV-82, Birch River, WV (I-79 Exit 57 access)
- **Voice**: Kim's authentic, faith-forward, humble (NO marketing speak)
- **Audience**: Out-of-state hunters on I-79 + local outdoorsmen
- **Phase**: Phase 3B - Highway Hunter Capture (geographic SEO)

**River Page Priorities**:
- Driving distance from shop (I-79 corridor appeal)
- Whitewater rafting difficulty levels (beginner vs advanced)
- Fishing access points and species
- Seasonal flow patterns (spring high water vs summer low water)
- Outfitter recommendations (Kim's trusted partners)

---

## Task Breakdown (Coordinator → Agents)

### 1️⃣ Researcher: Gather Cheat River Intel

**Research Queries**:

```bash
# Geographic positioning
WebSearch "Cheat River access from I-79 exit 57"
WebSearch "Cheat River distance from Birch River WV"

# Whitewater rafting
WebSearch "Cheat River rafting difficulty class III IV V"
WebSearch "Cheat River Canyon whitewater outfitters"
WebSearch "Cheat River Narrows vs Big Sandy"

# Fishing access
WebSearch "Cheat River trout fishing access points"
WebSearch "Cheat River smallmouth bass fishing"

# Regulations and safety
WebSearch "Cheat River WV DNR regulations"
WebSearch "Cheat River release schedule rafting season"

```

**Data to Extract**:
- Distance from WVWO shop (minutes via I-79)
- Rafting sections: Cheat Canyon (Class III-IV), Cheat Narrows (Class V), Big Sandy (Class III)
- Season: September release schedule (dam-controlled)
- Fishing: Trout (stocked), smallmouth bass, muskie
- Access points: Albright (put-in), Jenkinsburg (take-out)
- Outfitters: Cheat River Outfitters, USA Raft, etc.
- Gear needs: Wetsuit for spring, life jacket required

**Deliverable**: Research findings stored in memory

```bash
npx claude-flow@alpha hooks post-task \
  --task-id "researcher-cheat-river" \
  --memory-key "swarm/spec-41/research"

```

---

### 2️⃣ Architect: Design Content Structure

**Content Outline**:


```markdown
# Frontmatter (schema.org compliant)
- name: "Cheat River"
- type: "River"
- slug: "cheat-river"
- featured: false
- coordinates: [39.47, -79.65] # Albright put-in
- description: "West Virginia's wildest whitewater - Class V Cheat Narrows and fall trout fishing"
- amenities: ["Parking", "Outfitters Nearby", "River Access"]
- activities: ["Whitewater Rafting", "Trout Fishing", "Kayaking"]
- difficulty: "Advanced" (Class V Narrows)
- season: "Spring-Fall" (dam release schedule)
- distanceFromShop: "75 miles" (via I-79 North)
- drivingTime: "1 hour 30 minutes"

# Body Structure (Kim's Voice)
1. **Opening Hook** (2-3 sentences)
   - What makes Cheat River unique (Class V whitewater, fall releases)
   - Who it's for (experienced rafters, adventurous fishermen)

2. **Whitewater Sections** (bullets)
   - Cheat Canyon (Class III-IV, beginner-friendly)
   - Cheat Narrows (Class V, expert only)
   - Big Sandy (Class III, scenic float)
   - September release schedule (dam-controlled flows)

3. **Fishing Access** (bullets)
   - Trout stocking schedule (spring)
   - Smallmouth bass (summer)
   - Access points: Albright, Jenkinsburg
   - Regulations: WV DNR trout stamp required

4. **Kim's Take** (handwritten energy)
   - "Bryan's tackled the Narrows twice - says it's the wildest ride in the state."
   - Personal recommendation for outfitters
   - Gear advice from shop perspective

5. **Getting There** (practical)
   - I-79 North to Exit 23 (Coopers Rock)
   - Distance from shop: 75 miles, 1.5 hours
   - Nearest town: Albright, WV
   - Cell service: Spotty in canyon

6. **Before You Go** (safety/regulations)
   - Outfitter requirement for Narrows (no solo runs)
   - Life jacket law (mandatory)
   - Wetsuit recommended (spring water temps)
   - WV fishing license + trout stamp

```

**Schema.org Markup**:
- PlaceSchema: River with GeoCoordinates
- sportsActivityLocation: Rafting, Kayaking, Fishing
- touristType: Adventure seekers, experienced paddlers

**Voice Guidelines**:

```
✅ CORRECT (Kim's Voice):
"The Cheat Narrows is no joke - Class V rapids that'll test even expert paddlers."
"If you're new to rafting, stick with the Canyon section. Save the Narrows for when you've got experience."
"Bryan's caught some nice smallmouth here in summer. Access off Route 26 near Jenkinsburg."

❌ WRONG (Corporate Speak):
"Experience the ultimate adrenaline rush on West Virginia's premier whitewater destination!"
"Unlock your adventurous spirit with world-class rapids!"
"Transform your outdoor experience with cutting-edge rafting technology!"

```

**Deliverable**: Content structure stored in memory

```bash
npx claude-flow@alpha hooks post-edit \
  --file "cheat-river-structure" \
  --memory-key "swarm/spec-41/architecture"

```

---

### 3️⃣ Coder: Implement Destination Page

**File Path**: `./wv-wild-web\src\content\adventures\cheat-river.md`

**Implementation Requirements**:


```markdown
---
name: "Cheat River"
type: "River"
slug: "cheat-river"
featured: false
coordinates:
  latitude: 39.47
  longitude: -79.65
address: "Cheat River Canyon, Albright, WV 26519"
description: "West Virginia's wildest whitewater with Class V Cheat Narrows, Class III-IV Canyon, and fall trout fishing. Dam-controlled releases September-October."

amenities:
  - "River Access Points"
  - "Outfitters Nearby (Albright)"
  - "Parking at Put-Ins"
  - "Trout Stocking (Spring)"

activities:
  - "Whitewater Rafting (Class III-V)"
  - "Kayaking"
  - "Trout Fishing"
  - "Smallmouth Bass Fishing"

difficulty: "Advanced"
season: "Spring-Fall"
distanceFromShop: "75 miles"
drivingTime: "1 hour 30 minutes"

regulations:
  - "Life jacket required (WV boating law)"
  - "Outfitter recommended for Narrows (Class V)"
  - "WV fishing license + trout stamp required"
  - "Check dam release schedule before trip"

safety:
  - "Class V rapids - expert paddlers only for Narrows"
  - "Cold water temps spring/fall - wetsuit recommended"
  - "Spotty cell service in canyon"
  - "Weather changes fast - check forecasts"

website: "https://wvdnr.gov/fishing/cheat-river/"
phoneNumber: "(304) 637-0245" # Cheat River Outfitters
---

The Cheat River isn't for beginners, but if you're looking for West Virginia's wildest whitewater, this is it. The Cheat Narrows runs Class V rapids that'll test even expert rafters, while the Canyon section offers Class III-IV runs for folks with some experience. Come fall, the dam releases bring high water and the trout stocking brings fishermen.

## Whitewater Sections

**Cheat Canyon** (Class III-IV)
- 11 miles, 3-4 hour trip
- Good for intermediate rafters
- Continuous rapids, big waves
- Spring runoff (April-May) brings high water

**Cheat Narrows** (Class V)
- 6 miles of expert-only rapids
- Outfitter required (no solo runs)
- High Splat, Even Nastier falls
- September dam releases (controlled flows)

**Big Sandy** (Class III)
- Mellower section, scenic float
- Good for kayakers
- Summer low water option

## Fishing the Cheat

The Cheat gets trout stockings in spring, and the smallmouth bass fishing picks up in summer. Access points at Albright and Jenkinsburg off Route 26. You'll need a WV fishing license and trout stamp.

Bryan's caught some nice smallmouth here in July - says the river mouth at Jenkinsburg is productive. Stick with crawfish patterns and topwater early morning.

## Kim's Take

*Bryan's run the Narrows twice - says it's the wildest ride in the state. Not something to take lightly. If you're planning a trip, talk to the outfitters in Albright first. They know the release schedule and current conditions.*

*For fishing, spring trout season is your best bet. The stocking happens March through May, and the access at Jenkinsburg is easy to find.*

## Getting There from the Shop

Head north on I-79 about 75 miles (1.5 hours). Take Exit 23 toward Coopers Rock, then follow Route 26 west to Albright. The put-in for Cheat Canyon is off Cheat Lake Road. Outfitters in Albright run shuttles.

**Nearest town**: Albright, WV (gas, food, outfitters)
**Cell service**: Spotty in canyon - download maps offline
**Road conditions**: Paved to Albright, gravel access roads

## Before You Go

- **Life jacket required** by WV law (all ages, all craft)
- **Outfitter recommended** for Narrows section (Class V is serious)
- **Check release schedule** - dam-controlled flows (September-October best)
- **Wetsuit in spring** - water temps in 40s-50s until June
- **WV fishing license** + trout stamp if fishing

The Cheat River is no joke. If you're experienced and looking for a challenge, it's some of the best whitewater in the East. If you're new to rafting, start with the New River Gorge or Gauley (easier sections) and work your way up.

Grand love ya.

```

**Code Quality Checks**:
- [ ] Frontmatter matches schema.org PlaceSchema
- [ ] Coordinates accurate (Albright put-in)
- [ ] Distance/driving time verified from shop
- [ ] Kim's voice throughout (no marketing speak)
- [ ] Safety warnings prominent (Class V danger)
- [ ] Regulations clearly listed
- [ ] Fishing details accurate (DNR trout schedule)
- [ ] Getting There directions from I-79 Exit 57

**Deliverable**: Working content file + memory update

```bash
npx claude-flow@alpha hooks post-edit \
  --file "wv-wild-web/src/content/adventures/cheat-river.md" \
  --memory-key "swarm/spec-41/implementation"

```

---

### 4️⃣ Tester: Validate Content

**Validation Checklist**:

**WVWO Voice Audit**:
- [ ] NO corporate marketing ("unlock", "experience", "world-class")
- [ ] YES Kim's authentic voice ("no joke", "Grand love ya")
- [ ] Personal anecdotes included (Bryan's Narrows runs)
- [ ] Humble, helpful tone (not salesy)

**Geographic Accuracy**:
- [ ] Distance from shop verified (75 miles via I-79)
- [ ] Driving directions from Exit 57 clear
- [ ] Coordinates accurate (Albright put-in)
- [ ] Nearest town/services mentioned

**Safety & Regulations**:
- [ ] Class V danger warnings prominent
- [ ] Outfitter recommendation clear
- [ ] Life jacket law mentioned
- [ ] Fishing license requirements listed
- [ ] Dam release schedule noted

**Schema Compliance**:

```bash
# Validate frontmatter structure
npx agentdb@latest skill search "PlaceSchema validation" 5

```

**Content Quality**:
- [ ] Opening hook engaging (Class V whitewater angle)
- [ ] Sections well-organized (whitewater, fishing, access)
- [ ] Practical details complete (hours, fees, regulations)
- [ ] Kim's Take section adds personal touch
- [ ] Getting There directions actionable

**Deliverable**: Test results stored in memory

```bash
npx claude-flow@alpha hooks post-task \
  --task-id "tester-validation" \
  --memory-key "swarm/spec-41/test-results"

```

---

## Session End Protocol

**Coordinator runs**:

```bash
# Store success pattern
npx agentdb@latest reflexion store "wvwo-session" "SPEC-41-cheat-river" 1.0 true "River destination page: hierarchical swarm (researcher + architect + coder + tester) created Class V whitewater content with Kim's authentic safety warnings and I-79 positioning"

# Export session metrics
npx claude-flow@alpha hooks session-end --export-metrics true

# Summary to user
echo "SPEC-41 Complete: Cheat River destination page ready at wv-wild-web/src/content/adventures/cheat-river.md"

```

---

## Success Criteria

✅ **Content Complete**:
- Cheat River page created with river template pattern
- Whitewater sections documented (Canyon, Narrows, Big Sandy)
- Fishing access and species detailed
- I-79 highway hunter positioning clear

✅ **WVWO Compliance**:
- Kim's voice throughout (no SaaS speak)
- Safety warnings prominent (Class V danger)
- Personal touch (Bryan's experiences)
- Faith-forward, humble tone

✅ **Quality Checks**:
- Schema.org markup validated
- Geographic accuracy verified
- Regulations current (WV DNR sourced)
- Pattern stored in AgentDB for future river pages

---

**Coordinator**: Execute this prompt via hierarchical swarm, coordinate agents through memory, store learnings in AgentDB.
