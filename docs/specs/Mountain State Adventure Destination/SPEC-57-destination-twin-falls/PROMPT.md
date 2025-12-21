# Twin Falls State Park - Destination Content Generation

## Hierarchical Swarm Instructions

You are the **Swarm Queen** coordinating a specialized team to create compelling destination content for Twin Falls State Park that drives highway hunters to WVWO.

### Swarm Topology: Hierarchical

**Queen Agent**: Coordinates all agents, ensures WVWO brand voice consistency, validates against constitution
**Specialist Agents**:

- `researcher`: Park research, waterfall trails, facilities, wildlife habitat
- `wv-historian`: Wyoming County history, coal heritage, natural history
- `hunter-strategist`: Hunter relevance, nearby WMAs, fall color + hunting season overlap
- `seo-specialist`: Geographic SEO, southern WV searches, Beckley area optimization
- `content-writer`: Kim's voice enforcement, authentic WV storytelling

### Context Requirements

**BEFORE generating content**, Queen must coordinate parallel research:

```bash
# Queen spawns all researchers simultaneously
Task("Park researcher", "Research Twin Falls State Park trails, waterfall access, cabins, golf course, natural features", "researcher")
Task("WV historian", "Research Wyoming County history, coal camps, gorge geology, Appalachian forest ecology", "wv-historian")
Task("Hunter strategist", "Analyze nearby WMAs, fall hunting seasons, species, access from Mullens/Wyoming County", "hunter-strategist")
Task("SEO specialist", "Research 'Twin Falls WV hunting', 'Wyoming County hunting', 'Mullens WV hunting access', southern WV searches", "seo-specialist")

```

### Content Template: State Park

**Required Sections**:

1. **Hero** (1-2 sentences): Twin waterfalls + gorge beauty, hunter appeal during fall color season
2. **Why Hunters Stop Here** (3-4 bullets): Fall color overlaps hunting season, cabin stays, proximity to backcountry WMAs
3. **The Park** (2-3 paragraphs): Waterfalls, trails, gorge, cabins, facilities
4. **Local History** (1-2 paragraphs): Wyoming County coal heritage, natural history of gorge
5. **Plan Your Visit** (practical info): Hours, fees, cabin reservations, directions from US 19/I-77
6. **Nearby Hunting Access** (2-3 bullet points): WMAs within 30 miles, public lands, season timing
7. **WVWO Connection** (1 paragraph): "Planning a fall hunting trip with family? Twin Falls cabins + WVWO for gear..."

### WVWO Brand Requirements

**Voice**: Kim's authentic rural WV tone (faith-forward, humble, neighborly)
**Forbidden**: Corporate speak, buzzwords, "escape to nature", "hidden gem"
**Geographic Context**: Wyoming County, southern coalfields, US 19/I-77 corridor (not I-79 - note different region)
**Hunter Framing**: Fall color hiking + hunting combo trips, family cabin stays during season
**WVWO Integration**: Gear for both hiking and hunting, FFL transfers for out-of-state hunters staying in cabins

### SEO Strategy

**Primary Keywords**:

- "Twin Falls State Park hunting"
- "Wyoming County WV hunting"
- "hunting near Twin Falls WV"
- "southern WV fall hunting"

**Geographic Modifiers**:

- US 19 corridor (Beckley to Princeton route)
- Wyoming County, Mullens area
- Southern coalfields region

**Search Intent**: Hunters combining fall foliage trips with hunting, families staying in park cabins during season

### Quality Gates (Queen Validation)

Before finalizing content, Queen must verify:

- [ ] Voice passes Kim's Neighbor Test (sounds like her, not tourism board)
- [ ] Hunter relevance acknowledges distance from I-79 (WVWO is 1+ hour away, but worth the stop for serious gear)
- [ ] Fall color + hunting season overlap is emphasized (September-November)
- [ ] WVWO mention is realistic (hunters might visit WVWO on drive to park, not as day trip from park)
- [ ] Cabin stays positioned as hunter base camp option
- [ ] Geographic context is accurate (southern WV, US 19 corridor, NOT I-79)

### Output Format

**Deliverable**: Complete `index.md` file ready for `src/content/destinations/twin-falls-state-park/`

**Frontmatter Required**:

```yaml
---
title: "Twin Falls State Park"
region: "Southern WV"
activities: ["hiking", "waterfall viewing", "camping", "cabins", "fall color"]
season: "year-round (peak fall color September-October)"
wmaProximity: "Various WMAs within 30 miles (Wyoming/Mercer counties)"
i79Access: "Not direct I-79 access - US 19/I-77 corridor (1+ hour from WVWO)"
difficulty: "moderate"
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

**Success Metric**: Content that positions Twin Falls as a fall hunting + family trip destination, with WVWO as the gear stop on the drive in

---

## Research Sources to Consult

- WV State Parks official site (Twin Falls page)
- Wyoming County tourism resources
- Fall foliage timing in southern WV
- Nearby WMA details (Wyoming/Mercer/McDowell counties - WVDNR)
- US 19 corridor map
- Cabin rental info and hunter suitability

## Notes for Queen

- **Twin Falls** is in Wyoming County, southern coalfields - NOT near I-79
- WVWO is in Braxton County (central WV) - 1+ hour drive from Twin Falls
- Hunter appeal is **fall color season overlaps hunting season** (September-November)
- Position as **family cabin stay during hunting season** - some hunt, some hike waterfalls
- WVWO connection should be **realistic**: "On your drive down US 19, stop by WVWO in Birch River for..."
- Emphasize **gorge beauty, twin waterfalls, fall colors** as the unique draw
- Don't oversell WVWO proximity - acknowledge distance but emphasize quality gear worth the stop
