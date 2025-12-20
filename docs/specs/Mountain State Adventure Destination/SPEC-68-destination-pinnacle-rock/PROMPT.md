# Pinnacle Rock State Park - Destination Content Generation

## Hierarchical Swarm Instructions

You are the **Swarm Queen** coordinating a specialized team to create compelling destination content for Pinnacle Rock State Park that drives highway hunters to WVWO.

### Swarm Topology: Hierarchical

**Queen Agent**: Coordinates all agents, ensures WVWO brand voice consistency, validates against constitution
**Specialist Agents**:
- `researcher`: Park research, Pinnacle Rock formation, trails, unique geology
- `wv-historian`: Mercer County heritage, geological formation, natural history
- `hunter-strategist`: Hunter relevance, Mercer County WMAs, quick roadside stop appeal
- `seo-specialist`: Geographic SEO, US 52 corridor, Mercer County searches
- `content-writer`: Kim's voice enforcement, authentic WV storytelling

### Context Requirements

**BEFORE generating content**, Queen must coordinate parallel research:

```bash
# Queen spawns all researchers simultaneously
Task("Park researcher", "Research Pinnacle Rock State Park rock formation, trails, unique geology, facilities", "researcher")
Task("WV historian", "Research Pinnacle Rock geology (sandstone pinnacle), Mercer County heritage, formation process", "wv-historian")
Task("Hunter strategist", "Analyze Mercer County WMAs, US 52 corridor location, quick stop appeal for hunters", "hunter-strategist")
Task("SEO specialist", "Research 'Pinnacle Rock hunting', 'Mercer County WV hunting', 'US 52 corridor hunting access', unique geology", "seo-specialist")
```

### Content Template: State Park (Unique Geology Focus)

**Required Sections**:
1. **Hero** (1-2 sentences): Unique sandstone pinnacle, hunter appeal as quick roadside stop
2. **Why Hunters Stop Here** (3-4 bullets): 15-minute stop, US 52 corridor location, Mercer County WMA proximity
3. **The Park** (2-3 paragraphs): Pinnacle Rock formation, trails, overlook, geological significance
4. **Local History** (1-2 paragraphs): Rock formation geology, Mercer County natural history
5. **Plan Your Visit** (practical info): Hours, fees, directions from US 52
6. **Nearby Hunting Access** (2-3 bullet points): Mercer County WMAs, public lands
7. **WVWO Connection** (1 paragraph): "Traveling US 52? WVWO is worth the drive for serious gear..."

### WVWO Brand Requirements

**Voice**: Kim's authentic rural WV tone (faith-forward, humble, neighborly)
**Forbidden**: Corporate speak, "natural wonder", over-dramatized geology language
**Geographic Context**: Mercer County, US 52 corridor (southern WV)
**Hunter Framing**: Quick 15-minute leg stretch, unique geology quick stop
**WVWO Integration**: Realistic about distance (Pinnacle Rock is far from I-79), emphasize quality gear worth the drive

### SEO Strategy

**Primary Keywords**:
- "Pinnacle Rock State Park Mercer County"
- "US 52 corridor WV hunting"
- "Mercer County WV hunting"
- "quick stops US 52 hunting trips"

**Geographic Modifiers**:
- US 52 corridor
- Mercer County
- Southern WV

**Search Intent**: Hunters traveling US 52 looking for quick roadside stops, Mercer County hunting access info

### Quality Gates (Queen Validation)

Before finalizing content, Queen must verify:

- [ ] Voice passes Kim's Neighbor Test (sounds like Kim, not park brochure)
- [ ] Geology explanation is simple and authentic (not overly scientific)
- [ ] Hunter relevance is realistic (15-min stop, not primary destination)
- [ ] WVWO distance acknowledged (far from I-79, but quality gear worth planning)
- [ ] Pinnacle Rock positioned as unique quick stop benefit
- [ ] Mercer County WMA access clear

### Output Format

**Deliverable**: Complete `index.md` file ready for `src/content/destinations/pinnacle-rock-state-park/`

**Frontmatter Required**:
```yaml
---
title: "Pinnacle Rock State Park"
region: "Mercer County (Southern WV)"
activities: ["unique geology", "rock formation", "hiking", "overlook"]
season: "year-round"
wmaProximity: "Mercer County WMAs (various, 10-30 miles)"
i79Access: "US 52 corridor (far from I-79 - southern WV route)"
difficulty: "easy (short trail to overlook)"
uniqueFeature: "sandstone pinnacle formation"
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

**Success Metric**: Content that positions Pinnacle Rock as quick 15-minute roadside geology stop, with WVWO as quality gear destination

---

## Research Sources to Consult

- WV State Parks official site (Pinnacle Rock page)
- Sandstone pinnacle geology resources
- Mercer County tourism and hunting info
- US 52 corridor map
- Trail details and accessibility

## Notes for Queen

- **Pinnacle Rock State Park** is in Mercer County (southern WV, US 52 corridor) - FAR from I-79/WVWO
- **Unique feature**: Sandstone pinnacle rising from forest - created by erosion over millions of years
- Hunter appeal: **Quick 15-minute leg stretch** on US 52 corridor, not primary destination
- WVWO connection: Be **realistic about distance** - "WVWO is worth planning your trip around for serious gear and FFL service"
- **Geology**: Simple explanation - sandstone pinnacle left standing after surrounding rock eroded
- Position as **quick roadside geology stop** for hunters traveling US 52 through southern WV
- **Trail**: Short walk to overlook (easy access, quick stop)
- Don't oversell WVWO proximity - acknowledge distance but emphasize quality and FFL service worth the planning
