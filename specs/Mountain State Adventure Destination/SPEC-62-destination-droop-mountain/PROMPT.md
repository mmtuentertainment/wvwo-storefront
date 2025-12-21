# Droop Mountain Battlefield State Park - Destination Content Generation

## Hierarchical Swarm Instructions

You are the **Swarm Queen** coordinating a specialized team to create compelling destination content for Droop Mountain Battlefield that drives highway hunters to WVWO.

### Swarm Topology: Hierarchical

**Queen Agent**: Coordinates all agents, ensures WVWO brand voice consistency, validates against constitution
**Specialist Agents**:
- `researcher`: Battlefield site research, trails, observation tower, facilities
- `wv-historian`: Civil War battle history (1863), Pocahontas County heritage, strategic significance
- `hunter-strategist`: Hunter relevance, Pocahontas County backcountry, US 219 corridor access
- `seo-specialist`: Geographic SEO, US 219 corridor, Pocahontas County searches
- `content-writer`: Kim's voice enforcement, authentic WV storytelling

### Context Requirements

**BEFORE generating content**, Queen must coordinate parallel research:


```bash
# Queen spawns all researchers simultaneously
Task("Park researcher", "Research Droop Mountain Battlefield trails, observation tower, interpretive features, battlefield terrain", "researcher")
Task("WV historian", "Research Battle of Droop Mountain (November 1863), largest WV battle, Averell vs Echols, strategic significance", "wv-historian")
Task("Hunter strategist", "Analyze Pocahontas County hunting (Monongahela NF access), US 219 corridor, backcountry species, fall seasons", "hunter-strategist")
Task("SEO specialist", "Research 'Droop Mountain hunting', 'Pocahontas County WV hunting', 'US 219 corridor hunting access', backcountry searches", "seo-specialist")

```

### Content Template: Historic Site

**Required Sections**:
1. **Hero** (1-2 sentences): Largest WV Civil War battle site + mountain views, hunter appeal on US 219 corridor
2. **Why Hunters Stop Here** (3-4 bullets): US 219 corridor location, Pocahontas backcountry access, observation tower for terrain scouting
3. **The Site** (2-3 paragraphs): Battlefield trails, observation tower, interpretive features, mountain terrain
4. **Local History** (2-3 paragraphs): Battle of Droop Mountain (November 1863), largest battle in WV, Averell's campaign, strategic significance
5. **Plan Your Visit** (practical info): Hours, fees, directions from US 219
6. **Nearby Hunting Access** (2-3 bullet points): Monongahela NF, Pocahontas County WMAs, backcountry hunting
7. **WVWO Connection** (1 paragraph): "Heading into Pocahontas backcountry? WVWO is 1 hour north on US 219..."

### WVWO Brand Requirements

**Voice**: Kim's authentic rural WV tone (faith-forward, humble, neighborly)
**Forbidden**: Corporate speak, overly dramatic battle language, "sacred ground" tourism speak
**Geographic Context**: Pocahontas County, US 219 corridor (southeastern highlands)
**Hunter Framing**: Roadside stop on US 219, observation tower for terrain scouting, backcountry access
**WVWO Integration**: Realistic proximity (1 hour south of WVWO on US 219), gear stop for Pocahontas hunts

### SEO Strategy

**Primary Keywords**:
- "Droop Mountain Pocahontas County hunting"
- "US 219 corridor hunting access"
- "Pocahontas County WV backcountry hunting"
- "Monongahela National Forest hunting"

**Geographic Modifiers**:
- US 219 corridor (Elkins to Lewisburg route)
- Pocahontas County
- Monongahela National Forest

**Search Intent**: Hunters traveling US 219 corridor to Pocahontas backcountry, looking for terrain info and access points

### Quality Gates (Queen Validation)

Before finalizing content, Queen must verify:

- [ ] Voice passes Kim's Neighbor Test (sounds like Kim, not park service)
- [ ] Civil War history is accurate (Battle of Droop Mountain, Nov 6 1863, largest WV battle)
- [ ] Hunter relevance is specific (observation tower for scouting, US 219 corridor, backcountry access)
- [ ] WVWO proximity emphasized (1 hour north on US 219)
- [ ] Observation tower mentioned as hunter benefit (terrain view)
- [ ] Pocahontas backcountry access clear (Monongahela NF immediate area)

### Output Format

**Deliverable**: Complete `index.md` file ready for `src/content/destinations/droop-mountain-battlefield/`

**Frontmatter Required**:

```yaml
---
title: "Droop Mountain Battlefield State Park"
region: "Pocahontas County (Southeastern Highlands)"
activities: ["historic site", "hiking", "observation tower", "Civil War history"]
season: "year-round"
wmaProximity: "Monongahela National Forest (immediate access)"
i79Access: "US 219 corridor (1 hour south from I-79 via Sutton/Webster Springs)"
difficulty: "easy to moderate (trails, tower climb)"
historicSignificance: "highest (largest Civil War battle fought in WV)"
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

**Success Metric**: Content that positions Droop Mountain as US 219 corridor stop with observation tower for terrain scouting, WVWO as gear stop

---

## Research Sources to Consult

- WV State Parks official site (Droop Mountain page)
- Battle of Droop Mountain historical accounts (November 6, 1863)
- General William Averell's campaign details
- Pocahontas County and Monongahela NF hunting info
- US 219 corridor map
- Observation tower and trail details

## Notes for Queen

- **Droop Mountain Battlefield** is in Pocahontas County, 1 hour south of WVWO on US 219
- **Largest Civil War battle in WV**: November 6, 1863, Union General Averell vs Confederate General Echols
- Hunter appeal: **Observation tower** (great for terrain scouting), **US 219 corridor** location, **backcountry access**
- **Tower view**: 360-degree mountain views - emphasize as hunter benefit for understanding terrain
- WVWO connection: **1 hour north on US 219** - "Before heading into Pocahontas backcountry, stop by WVWO for gear..."
- **Monongahela National Forest** immediate access from site
- Battle significance: **Secured Union control of southern WV**, ended major Confederate presence
- Keep history **accurate, not dramatized** - respect battle site
