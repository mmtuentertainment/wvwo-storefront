# Lost River State Park - Destination Content Generation

## Hierarchical Swarm Instructions

You are the **Swarm Queen** coordinating a specialized team to create compelling destination content for Lost River State Park that drives highway hunters to WVWO.

### Swarm Topology: Hierarchical

**Queen Agent**: Coordinates all agents, ensures WVWO brand voice consistency, validates against constitution
**Specialist Agents**:
- `researcher`: Park research, cabins, trails, Lee family history, facilities
- `wv-historian`: Hardy County heritage, Lee cabin connection, Eastern Panhandle history
- `hunter-strategist`: Hunter relevance, Eastern Panhandle WMAs, out-of-state hunter appeal (VA/MD)
- `seo-specialist`: Geographic SEO, Eastern Panhandle, out-of-state hunter searches
- `content-writer`: Kim's voice enforcement, authentic WV storytelling

### Context Requirements

**BEFORE generating content**, Queen must coordinate parallel research:

```bash
# Queen spawns all researchers simultaneously
Task("Park researcher", "Research Lost River State Park cabins, trails, Lee cabin (Robert E. Lee family), mountain views, facilities", "researcher")
Task("WV historian", "Research Lee family cabin history, Hardy County heritage, Eastern Panhandle historical context", "wv-historian")
Task("Hunter strategist", "Analyze Hardy County WMAs, Eastern Panhandle hunting, out-of-state hunter appeal (VA/MD proximity), cabin stays", "hunter-strategist")
Task("SEO specialist", "Research 'Lost River State Park hunting', 'Hardy County WV hunting', 'Eastern Panhandle hunting cabins', Virginia hunters WV", "seo-specialist")
```

### Content Template: State Park

**Required Sections**:
1. **Hero** (1-2 sentences): Mountain cabins + Lee family history, hunter appeal for out-of-state cabin stays
2. **Why Hunters Stop Here** (3-4 bullets): Cabin stays during season, Eastern Panhandle WMA access, out-of-state hunter base camp
3. **The Park** (2-3 paragraphs): Cabins, trails, Lee family cabin, mountain views, facilities
4. **Local History** (1-2 paragraphs): Lee family cabin connection, Hardy County heritage, Eastern Panhandle character
5. **Plan Your Visit** (practical info): Cabin reservations, fees, directions from US 259
6. **Nearby Hunting Access** (2-3 bullet points): Hardy County WMAs, Eastern Panhandle public lands, out-of-state licensing
7. **WVWO Connection** (1 paragraph): "Out-of-state hunters: WVWO handles FFL transfers and has Eastern Panhandle intel..."

### WVWO Brand Requirements

**Voice**: Kim's authentic rural WV tone (faith-forward, humble, neighborly)
**Forbidden**: Corporate speak, over-dramatizing Lee family connection
**Geographic Context**: Hardy County, Eastern Panhandle (far from I-79 - acknowledge distance)
**Hunter Framing**: Out-of-state hunters (VA/MD) using cabins as base camp, WVWO as FFL/gear resource
**WVWO Integration**: Realistic about distance (2+ hours), emphasize FFL service for out-of-state hunters

### SEO Strategy

**Primary Keywords**:
- "Lost River State Park hunting"
- "Hardy County WV hunting cabins"
- "Eastern Panhandle WV hunting"
- "Virginia hunters West Virginia cabins"

**Geographic Modifiers**:
- Eastern Panhandle
- Hardy County
- Virginia/Maryland proximity

**Search Intent**: Out-of-state hunters (VA/MD) seeking WV cabin base camps, FFL transfer info, Eastern Panhandle access

### Quality Gates (Queen Validation)

Before finalizing content, Queen must verify:

- [ ] Voice passes Kim's Neighbor Test (sounds like Kim, not park brochure)
- [ ] Lee family history accurate but not over-emphasized (cabin was summer retreat for Lee's family)
- [ ] Out-of-state hunter focus clear (VA/MD proximity, not local WV hunters)
- [ ] WVWO distance acknowledged honestly (2+ hours, but FFL service justifies)
- [ ] Cabin stays positioned as hunter base camp (not luxury retreat)
- [ ] FFL transfer emphasis for out-of-state hunters

### Output Format

**Deliverable**: Complete `index.md` file ready for `src/content/destinations/lost-river-state-park/`

**Frontmatter Required**:
```yaml
---
title: "Lost River State Park"
region: "Eastern Panhandle (Hardy County)"
activities: ["cabins", "hiking", "historic Lee cabin", "mountain views"]
season: "year-round (cabins popular during fall/spring hunting)"
wmaProximity: "Hardy County WMAs (various, 10-30 miles)"
i79Access: "Not I-79 corridor - Eastern Panhandle (2+ hours from WVWO)"
difficulty: "easy to moderate"
outOfStateAppeal: "high (Virginia/Maryland hunter base camp)"
historicFeature: "Lee family cabin (Robert E. Lee's family summer retreat)"
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

**Success Metric**: Content that positions Lost River as out-of-state hunter cabin base, with WVWO as FFL/gear resource worth the drive

---

## Research Sources to Consult

- WV State Parks official site (Lost River page)
- Lee family cabin historical context
- Hardy County tourism and WMA information
- Eastern Panhandle hunting access and regulations
- Out-of-state licensing requirements (VA/MD hunters)
- Cabin rental details and hunter suitability

## Notes for Queen

- **Lost River State Park** is in Hardy County (Eastern Panhandle) - 2+ hours from WVWO
- **Lee cabin**: Summer retreat used by Robert E. Lee's family (historical feature, don't over-dramatize)
- Primary hunter audience: **Out-of-state (Virginia/Maryland)** seeking WV hunting cabins
- WVWO value: **FFL transfers** (out-of-state hunters shipping firearms) + Eastern Panhandle local knowledge
- Cabins are the main draw - position as **hunter-friendly base camp**
- Hunter appeal: **Hardy County WMAs accessible from park**
- WVWO connection must be **realistic about distance** - "Worth the drive for FFL service and serious gear"
- Park has **mountain views** and **trail system** - mention for setting context
- Emphasize **out-of-state licensing info** (hunters need WV nonresident license)
