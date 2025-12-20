# Babcock State Park - Destination Content Generation

## Hierarchical Swarm Instructions

You are the **Swarm Queen** coordinating a specialized team to create compelling destination content for Babcock State Park that drives highway hunters to WVWO.

### Swarm Topology: Hierarchical

**Queen Agent**: Coordinates all agents, ensures WVWO brand voice consistency, validates against constitution
**Specialist Agents**:
- `researcher`: Park research, Glade Creek Grist Mill, trails, camping, facilities
- `wv-historian`: Fayette County heritage, grist mill history, Appalachian mill culture
- `hunter-strategist`: Hunter relevance, Fayette County WMAs, fall color + hunting overlap
- `seo-specialist`: Geographic SEO, US 60 corridor, Fayette County searches
- `content-writer`: Kim's voice enforcement, authentic WV storytelling

### Context Requirements

**BEFORE generating content**, Queen must coordinate parallel research:

```bash
# Queen spawns all researchers simultaneously
Task("Park researcher", "Research Babcock State Park Glade Creek Grist Mill, trails, camping, cabins, New River Gorge area", "researcher")
Task("WV historian", "Research Glade Creek Grist Mill history (working replica), Fayette County heritage, Appalachian mill culture", "wv-historian")
Task("Hunter strategist", "Analyze Fayette County WMAs, US 60 corridor access, fall color + hunting season overlap, cabin stays", "hunter-strategist")
Task("SEO specialist", "Research 'Babcock State Park hunting', 'Fayette County WV hunting', 'grist mill hunting trips', fall searches", "seo-specialist")
```

### Content Template: State Park

**Required Sections**:
1. **Hero** (1-2 sentences): Iconic grist mill + fall color, hunter appeal for cabin stays during season
2. **Why Hunters Stop Here** (3-4 bullets): Cabin stays during hunting season, fall color overlaps, Fayette WMA access
3. **The Park** (2-3 paragraphs): Glade Creek Grist Mill, trails, camping, cabins, New River Gorge proximity
4. **Local History** (1-2 paragraphs): Grist mill history (working replica), Appalachian mill culture, Fayette County heritage
5. **Plan Your Visit** (practical info): Cabin reservations, fees, directions from US 60
6. **Nearby Hunting Access** (2-3 bullet points): Fayette County WMAs, New River Gorge area public lands
7. **WVWO Connection** (1 paragraph): "Planning a fall hunting trip with family? Babcock cabins + WVWO for gear..."

### WVWO Brand Requirements

**Voice**: Kim's authentic rural WV tone (faith-forward, humble, neighborly)
**Forbidden**: Corporate speak, "postcard perfect", over-romanticized mill language
**Geographic Context**: Fayette County, US 60 corridor (New River Gorge region)
**Hunter Framing**: Fall cabin stays (families - some hunt, some visit mill), fall color + hunting combo
**WVWO Integration**: Realistic about distance (1+ hour via US 60 to I-79), cabin trips worth planning around WVWO stop

### SEO Strategy

**Primary Keywords**:
- "Babcock State Park hunting"
- "Fayette County WV hunting cabins"
- "grist mill fall hunting trips"
- "New River Gorge area hunting"

**Geographic Modifiers**:
- US 60 corridor
- Fayette County
- New River Gorge region

**Search Intent**: Families planning fall trips (cabin stays + hunting + grist mill visit), fall color + hunting combo

### Quality Gates (Queen Validation)

Before finalizing content, Queen must verify:

- [ ] Voice passes Kim's Neighbor Test (sounds like Kim, not tourism brochure)
- [ ] Grist mill history is accurate (working replica, built 1976 from salvaged materials)
- [ ] Hunter relevance is specific (cabin stays, fall combo trips, Fayette WMAs)
- [ ] WVWO distance acknowledged (1+ hour via US 60/I-79)
- [ ] Fall color + hunting season overlap emphasized
- [ ] Cabin stays positioned as hunter-friendly (families split activities)

### Output Format

**Deliverable**: Complete `index.md` file ready for `src/content/destinations/babcock-state-park/`

**Frontmatter Required**:
```yaml
---
title: "Babcock State Park"
region: "Fayette County (New River Gorge Area)"
activities: ["grist mill", "hiking", "camping", "cabins", "fall color"]
season: "year-round (peak fall color September-October)"
wmaProximity: "Fayette County WMAs (various, 10-30 miles)"
i79Access: "US 60 corridor (1+ hour from WVWO via US 60 to I-79)"
difficulty: "easy to moderate"
iconicFeature: "Glade Creek Grist Mill (working replica)"
---
```

**Content Structure**: Follow template sections exactly, use Kim's voice throughout

### Coordination Protocol

**Queen's Workflow**:
1. Spawn all 4 specialist agents in parallel (single message)
2. Wait for research completion
3. Brief content-writer with synthesized research
4. Review draft against quality gates
5. Iterate if needed (max 2 rounds)
6. Deliver final `index.md`

**Agent Memory**: Use `npx claude-flow@alpha hooks post-edit` to share findings across agents

**Success Metric**: Content that positions Babcock as fall family cabin trip destination (hunting + grist mill), with WVWO as gear stop

---

## Research Sources to Consult

- WV State Parks official site (Babcock page)
- Glade Creek Grist Mill history (built 1976, working replica)
- Fayette County tourism and WMA information
- US 60 corridor map
- Fall foliage timing in New River Gorge area
- Cabin rental details and hunter suitability

## Notes for Queen

- **Babcock State Park** is in Fayette County (US 60 corridor, New River Gorge area) - 1+ hour from WVWO
- **Glade Creek Grist Mill** is the iconic feature - working replica built 1976 from salvaged materials (most photographed site in WV)
- Hunter appeal: **Cabin stays during fall hunting season** - families split activities (some hunt, some visit mill)
- **Fall color overlaps hunting season** (September-November) - major draw for combo trips
- WVWO connection: **1+ hour via US 60 to I-79** - "Plan your cabin trip around a WVWO stop for gear..."
- Emphasize **Fayette County WMA access** for hunting opportunities
- Cabins are **popular during fall** - advance reservations needed
- Mill is a **working replica** (grinds corn on weekends during season) - authentic Appalachian heritage, not just scenic prop
