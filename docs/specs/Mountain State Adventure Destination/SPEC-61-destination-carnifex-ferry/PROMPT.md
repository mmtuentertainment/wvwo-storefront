# Carnifex Ferry Battlefield State Park - Destination Content Generation

## Hierarchical Swarm Instructions

You are the **Swarm Queen** coordinating a specialized team to create compelling destination content for Carnifex Ferry Battlefield that drives highway hunters to WVWO.

### Swarm Topology: Hierarchical

**Queen Agent**: Coordinates all agents, ensures WVWO brand voice consistency, validates against constitution
**Specialist Agents**:
- `researcher`: Battlefield site research, trails, Gauley River overlook, facilities
- `wv-historian`: Civil War battle history, Nicholas County heritage, strategic significance
- `hunter-strategist`: Hunter relevance, Nicholas County WMAs, Gauley River corridor hunting
- `seo-specialist`: Geographic SEO, US 19 corridor, Nicholas County searches
- `content-writer`: Kim's voice enforcement, authentic WV storytelling

### Context Requirements

**BEFORE generating content**, Queen must coordinate parallel research:

```bash
# Queen spawns all researchers simultaneously
Task("Park researcher", "Research Carnifex Ferry Battlefield trails, Gauley River overlook, Civil War interpretive features, Patterson house", "researcher")
Task("WV historian", "Research Battle of Carnifex Ferry (September 1861), General Floyd vs Rosecrans, strategic significance, Nicholas County Civil War", "wv-historian")
Task("Hunter strategist", "Analyze Nicholas County WMAs, Gauley River corridor hunting, fall seasons, proximity to Summersville Lake area", "hunter-strategist")
Task("SEO specialist", "Research 'Carnifex Ferry hunting', 'Nicholas County WV hunting', 'US 19 corridor hunting access', Gauley River area", "seo-specialist")
```

### Content Template: Historic Site

**Required Sections**:
1. **Hero** (1-2 sentences): Civil War battlefield + Gauley River gorge views, hunter appeal as quick stop on US 19
2. **Why Hunters Stop Here** (3-4 bullets): US 19 corridor location, Nicholas County WMA access, Gauley River overlook
3. **The Site** (2-3 paragraphs): Battlefield trails, Patterson house, Gauley River overlook, interpretive features
4. **Local History** (2-3 paragraphs): Battle of Carnifex Ferry (1861), strategic significance, Floyd's retreat, West Virginia formation context
5. **Plan Your Visit** (practical info): Hours, fees, directions from US 19
6. **Nearby Hunting Access** (2-3 bullet points): Nicholas County WMAs, Gauley River corridor, Summersville Lake area access
7. **WVWO Connection** (1 paragraph): "Heading down US 19? WVWO is 30 minutes north - stop for gear before your hunt..."

### WVWO Brand Requirements

**Voice**: Kim's authentic rural WV tone (faith-forward, humble, neighborly)
**Forbidden**: Corporate speak, overly dramatic battle language, "hallowed ground" tourism clichés
**Geographic Context**: Nicholas County, US 19 corridor (30 min south of WVWO)
**Hunter Framing**: Quick roadside stop on way to Nicholas County hunts, Gauley overlook as scouting view
**WVWO Integration**: Natural stop on US 19 corridor (30 min north), gear before heading to WMAs

### SEO Strategy

**Primary Keywords**:
- "Carnifex Ferry hunting access"
- "Nicholas County WV hunting"
- "US 19 corridor hunting"
- "Gauley River hunting"

**Geographic Modifiers**:
- US 19 corridor (Summersville area)
- Nicholas County
- Gauley River corridor

**Search Intent**: Hunters traveling US 19 looking for quick stops and nearby WMA access

### Quality Gates (Queen Validation)

Before finalizing content, Queen must verify:

- [ ] Voice passes Kim's Neighbor Test (sounds like Kim, not park service brochure)
- [ ] Civil War history is accurate (Battle of Carnifex Ferry, Sept 1861, Floyd vs Rosecrans)
- [ ] Hunter relevance is specific (Nicholas WMAs, US 19 corridor location, not generic)
- [ ] WVWO proximity emphasized (30 min north on US 19 - natural stop)
- [ ] Gauley River overlook as scouting benefit mentioned
- [ ] West Virginia formation context included (1861 battle during state creation period)

### Output Format

**Deliverable**: Complete `index.md` file ready for `src/content/destinations/carnifex-ferry-battlefield/`

**Frontmatter Required**:
```yaml
---
title: "Carnifex Ferry Battlefield State Park"
region: "Nicholas County (South-Central WV)"
activities: ["historic site", "hiking", "Gauley River overlook", "Civil War history"]
season: "year-round"
wmaProximity: "Nicholas County WMAs (10-20 miles)"
i79Access: "US 19 corridor (30 minutes south of I-79 Exit 57/WVWO)"
difficulty: "easy (short trails, roadside access)"
historicSignificance: "high (Civil War battle site, September 1861)"
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

**Success Metric**: Content that positions Carnifex Ferry as quick US 19 roadside stop for hunters heading to Nicholas County WMAs, with WVWO as gear stop

---

## Research Sources to Consult

- WV State Parks official site (Carnifex Ferry page)
- Battle of Carnifex Ferry historical accounts (September 10, 1861)
- Nicholas County tourism and WMA information
- US 19 corridor map (Summersville area)
- Gauley River geography and hunting corridor
- Civil War in West Virginia context (state formation period)

## Notes for Queen

- **Carnifex Ferry Battlefield** is in Nicholas County, 30 min south of WVWO on US 19
- **Battle significance**: September 1861, Confederate General Floyd vs Union General Rosecrans, early West Virginia formation period
- Hunter appeal: **Quick roadside stop** on US 19 corridor + **Gauley River overlook** for scouting
- **Gauley River gorge** views from battlefield rim - mention as geographic feature
- WVWO connection: Natural stop **30 min north on US 19** - "Before heading south, stop by WVWO for..."
- Emphasize **US 19 corridor location** (major north-south route through central WV)
- **Patterson house** (Floyd's headquarters) is historic feature on site
- Keep Civil War history **authentic, not dramatized** - respect site, avoid tourism clichés
