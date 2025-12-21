# Grandview State Park - Destination Content Generation

## Hierarchical Swarm Instructions

You are the **Swarm Queen** coordinating a specialized team to create compelling destination content for Grandview State Park that drives highway hunters to WVWO.

### Swarm Topology: Hierarchical

**Queen Agent**: Coordinates all agents, ensures WVWO brand voice consistency, validates against constitution
**Specialist Agents**:
- `researcher`: Park research, New River Gorge overlook, trails, facilities
- `wv-historian`: Raleigh County heritage, New River Gorge history, coal mining context
- `hunter-strategist`: Hunter relevance, Raleigh County WMAs, I-64 corridor access
- `seo-specialist`: Geographic SEO, I-64 corridor, Beckley area, New River Gorge searches
- `content-writer`: Kim's voice enforcement, authentic WV storytelling

### Context Requirements

**BEFORE generating content**, Queen must coordinate parallel research:


```bash
# Queen spawns all researchers simultaneously
Task("Park researcher", "Research Grandview State Park New River Gorge overlook, trails, facilities, scenic views", "researcher")
Task("WV historian", "Research New River Gorge history, Raleigh County coal heritage, gorge formation, regional significance", "wv-historian")
Task("Hunter strategist", "Analyze Raleigh County WMAs, I-64 corridor hunting access, fall color + hunting season overlap", "hunter-strategist")
Task("SEO specialist", "Research 'Grandview hunting', 'Raleigh County WV hunting', 'I-64 corridor hunting', New River Gorge area searches", "seo-specialist")

```

### Content Template: State Park

**Required Sections**:
1. **Hero** (1-2 sentences): New River Gorge overlook + scenic vistas, hunter appeal as I-64 corridor stop
2. **Why Hunters Stop Here** (3-4 bullets): I-64 corridor location, Raleigh County WMA access, fall color overlaps hunting
3. **The Park** (2-3 paragraphs): Overlook views, trails, New River Gorge rim, facilities
4. **Local History** (1-2 paragraphs): New River Gorge formation, Raleigh County coal heritage, gorge significance
5. **Plan Your Visit** (practical info): Hours, fees, directions from I-64
6. **Nearby Hunting Access** (2-3 bullet points): Raleigh County WMAs, public lands, season timing
7. **WVWO Connection** (1 paragraph): "Traveling I-64? WVWO is 1 hour north via I-77 and I-79..."

### WVWO Brand Requirements

**Voice**: Kim's authentic rural WV tone (faith-forward, humble, neighborly)
**Forbidden**: Corporate speak, "breathtaking vistas", over-the-top scenic language
**Geographic Context**: Raleigh County, I-64 corridor (southern WV, near Beckley)
**Hunter Framing**: I-64 corridor stop for gorge views, fall color + hunting combo trips
**WVWO Integration**: Realistic about distance (1 hour via I-77 to I-79), but emphasize FFL and serious gear

### SEO Strategy

**Primary Keywords**:
- "Grandview State Park hunting"
- "Raleigh County WV hunting"
- "I-64 corridor hunting access"
- "New River Gorge hunting"

**Geographic Modifiers**:
- I-64 corridor (Beckley area)
- Raleigh County
- New River Gorge region

**Search Intent**: Hunters traveling I-64 looking for scenic stops and nearby hunting access, fall color + hunting trips

### Quality Gates (Queen Validation)

Before finalizing content, Queen must verify:

- [ ] Voice passes Kim's Neighbor Test (sounds like Kim, not tourism board)
- [ ] New River Gorge views emphasized but not over-dramatized
- [ ] Hunter relevance is specific (I-64 corridor location, Raleigh WMAs)
- [ ] WVWO distance acknowledged (1 hour via I-77/I-79 connection)
- [ ] Fall color + hunting season overlap mentioned
- [ ] Coal heritage context included authentically

### Output Format

**Deliverable**: Complete `index.md` file ready for `src/content/destinations/grandview-state-park/`

**Frontmatter Required**:

```yaml
---
title: "Grandview State Park"
region: "Raleigh County (Southern WV)"
activities: ["New River Gorge overlook", "hiking", "scenic views", "fall color"]
season: "year-round (peak fall color September-October)"
wmaProximity: "Raleigh County WMAs (various, 10-30 miles)"
i79Access: "I-64 corridor (1 hour from WVWO via I-77 north to I-79)"
difficulty: "easy (short overlook walk, some trails moderate)"
scenicHighlight: "New River Gorge rim overlook"
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

**Success Metric**: Content that positions Grandview as I-64 corridor scenic stop, with WVWO as gear destination via I-77/I-79

---

## Research Sources to Consult

- WV State Parks official site (Grandview page)
- New River Gorge National Park context
- Raleigh County tourism and WMA information
- I-64 corridor map (Beckley area)
- Fall foliage timing in New River Gorge region
- Coal mining heritage in Raleigh County

## Notes for Queen

- **Grandview State Park** is in Raleigh County (I-64 corridor, Beckley area) - 1 hour from WVWO
- **New River Gorge overlook** is the defining feature - iconic WV views
- Hunter appeal: **I-64 corridor location** + **fall color overlaps hunting season**
- WVWO connection: **1 hour north via I-77 to I-79** - "Worth the drive for FFL service and serious gear"
- Emphasize **Raleigh County WMA access** for hunting opportunities
- **Coal heritage** context (Raleigh County coalfields) - mention authentically
- Park was **CCC-built** (Civilian Conservation Corps, 1930s) - historical note
- Position as **scenic overlook stop** for hunters traveling I-64 through southern WV
