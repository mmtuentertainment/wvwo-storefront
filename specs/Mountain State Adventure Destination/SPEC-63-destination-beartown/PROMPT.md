# Beartown State Park - Destination Content Generation

## Hierarchical Swarm Instructions

You are the **Swarm Queen** coordinating a specialized team to create compelling destination content for Beartown State Park that drives highway hunters to WVWO.

### Swarm Topology: Hierarchical

**Queen Agent**: Coordinates all agents, ensures WVWO brand voice consistency, validates against constitution
**Specialist Agents**:
- `researcher`: Park research, rock formations, boardwalk trail, unique geology
- `wv-historian`: Pocahontas County heritage, Allegheny highlands geology, natural history
- `hunter-strategist`: Hunter relevance, Pocahontas backcountry, quick roadside stop appeal
- `seo-specialist`: Geographic SEO, US 219 corridor, Pocahontas County searches
- `content-writer`: Kim's voice enforcement, authentic WV storytelling

### Context Requirements

**BEFORE generating content**, Queen must coordinate parallel research:


```bash
# Queen spawns all researchers simultaneously
Task("Park researcher", "Research Beartown State Park rock formations, boardwalk trail, geology, moss-covered boulders, crevices", "researcher")
Task("WV historian", "Research Allegheny highlands geology, Pocahontas County natural history, rock formation process", "wv-historian")
Task("Hunter strategist", "Analyze Pocahontas County hunting access, US 219 corridor location, quick stop appeal for hunters", "hunter-strategist")
Task("SEO specialist", "Research 'Beartown State Park hunting', 'Pocahontas County WV hunting', 'US 219 corridor', unique geology searches", "seo-specialist")

```

### Content Template: State Park (Unique Geology Focus)

**Required Sections**:
1. **Hero** (1-2 sentences): Unique rock formations + boardwalk, hunter appeal as quick roadside stop
2. **Why Hunters Stop Here** (3-4 bullets): 20-minute boardwalk stretch, US 219 corridor location, Pocahontas backcountry proximity
3. **The Park** (2-3 paragraphs): Rock formations, boardwalk trail, moss-covered boulders, crevices and passages
4. **Local History** (1-2 paragraphs): Allegheny highlands geology, how rock formations developed, natural history
5. **Plan Your Visit** (practical info): Hours, fees (if any), directions from US 219
6. **Nearby Hunting Access** (2-3 bullet points): Monongahela NF, Pocahontas WMAs, backcountry hunting
7. **WVWO Connection** (1 paragraph): "Quick stop on US 219? WVWO is 1 hour north - gear up before Pocahontas backcountry..."

### WVWO Brand Requirements

**Voice**: Kim's authentic rural WV tone (faith-forward, humble, neighborly)
**Forbidden**: Corporate speak, "hidden gem", "mystical rock formations" tourism language
**Geographic Context**: Pocahontas County, US 219 corridor (southeastern highlands)
**Hunter Framing**: 20-minute leg stretch on way to backcountry hunts, unique geology quick stop
**WVWO Integration**: Realistic proximity (1 hour north on US 219), gear stop for Pocahontas hunts

### SEO Strategy

**Primary Keywords**:
- "Beartown State Park Pocahontas County"
- "US 219 corridor WV hunting"
- "Pocahontas County backcountry hunting"
- "quick stops US 219 hunting trips"

**Geographic Modifiers**:
- US 219 corridor
- Pocahontas County
- Allegheny highlands

**Search Intent**: Hunters traveling US 219 looking for quick roadside stops, Pocahontas backcountry access info

### Quality Gates (Queen Validation)

Before finalizing content, Queen must verify:

- [ ] Voice passes Kim's Neighbor Test (sounds like Kim, not park brochure)
- [ ] Geology explanation is simple and authentic (not overly scientific)
- [ ] Hunter relevance is realistic (20-min stop, not primary destination)
- [ ] WVWO proximity emphasized (1 hour north on US 219)
- [ ] Boardwalk trail positioned as quick leg stretch benefit
- [ ] Pocahontas backcountry access clear

### Output Format

**Deliverable**: Complete `index.md` file ready for `src/content/destinations/beartown-state-park/`

**Frontmatter Required**:

```yaml
---
title: "Beartown State Park"
region: "Pocahontas County (Southeastern Highlands)"
activities: ["boardwalk trail", "unique geology", "rock formations", "nature viewing"]
season: "year-round (best spring-fall for boardwalk conditions)"
wmaProximity: "Monongahela National Forest (immediate area)"
i79Access: "US 219 corridor (1 hour south from I-79 via Sutton/Webster Springs)"
difficulty: "easy (accessible boardwalk, 0.5 mile loop)"
uniqueFeature: "moss-covered boulder formations and rock crevices"
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

**Success Metric**: Content that positions Beartown as quick 20-minute roadside stop for hunters on US 219, with WVWO as gear stop

---

## Research Sources to Consult

- WV State Parks official site (Beartown page)
- Allegheny highlands geology resources
- Pocahontas County tourism and hunting info
- US 219 corridor map
- Boardwalk trail details and accessibility

## Notes for Queen

- **Beartown State Park** is in Pocahontas County, 1 hour south of WVWO on US 219
- **Unique feature**: Moss-covered rock formations with crevices and passages - created by weathering
- **Boardwalk trail**: 0.5-mile accessible loop (20-30 minutes) - perfect **quick leg stretch** for hunters
- Hunter appeal: **Quick roadside stop** on US 219 corridor, not primary destination
- WVWO connection: **1 hour north on US 219** - "Before heading into Pocahontas backcountry, gear up at WVWO..."
- **Geology**: Rock formations created by freeze/thaw weathering over thousands of years - keep explanation simple
- Park name origin: Rock passages resemble bear dens
- Position as **leg stretch benefit** for long hunting trips through US 219 corridor
