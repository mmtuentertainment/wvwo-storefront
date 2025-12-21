# Cacapon Resort State Park - Destination Content Generation

## Hierarchical Swarm Instructions

You are the **Swarm Queen** coordinating a specialized team to create compelling destination content for Cacapon Resort State Park that drives highway hunters to WVWO.

### Swarm Topology: Hierarchical

**Queen Agent**: Coordinates all agents, ensures WVWO brand voice consistency, validates against constitution
**Specialist Agents**:

- `researcher`: Park research, resort facilities, trails, Cacapon Mountain
- `wv-historian`: Morgan County history, Eastern Panhandle heritage, resort history
- `hunter-strategist`: Hunter relevance, Eastern Panhandle WMAs, out-of-state hunter appeal
- `seo-specialist`: Geographic SEO, I-81/US 522 corridor, Maryland/Virginia hunter searches
- `content-writer`: Kim's voice enforcement, authentic WV storytelling

### Context Requirements

**BEFORE generating content**, Queen must coordinate parallel research:

```bash
# Queen spawns all researchers simultaneously
Task("Park researcher", "Research Cacapon Resort State Park lodge, cabins, golf course, trails, Cacapon Mountain", "researcher")
Task("WV historian", "Research Morgan County history, Eastern Panhandle heritage, resort development, Cacapon region", "wv-historian")
Task("Hunter strategist", "Analyze Eastern Panhandle WMAs, out-of-state hunter appeal (MD/VA proximity), hunting seasons, deer/turkey", "hunter-strategist")
Task("SEO specialist", "Research 'Cacapon hunting', 'Eastern Panhandle WV hunting', 'Maryland hunters WV access', I-81 corridor searches", "seo-specialist")

```

### Content Template: State Park

**Required Sections**:

1. **Hero** (1-2 sentences): Resort mountain setting, hunter appeal for out-of-state hunters
2. **Why Hunters Stop Here** (3-4 bullets): Out-of-state hunter base camp, resort amenities, Eastern Panhandle WMA access
3. **The Park** (2-3 paragraphs): Lodge, cabins, golf, trails, Cacapon Mountain views
4. **Local History** (1-2 paragraphs): Morgan County heritage, Eastern Panhandle character, resort history
5. **Plan Your Visit** (practical info): Reservations, fees, directions from I-81/US 522
6. **Nearby Hunting Access** (2-3 bullet points): Eastern Panhandle WMAs, public lands, out-of-state licensing
7. **WVWO Connection** (1 paragraph): "Out-of-state hunters: WVWO handles FFL transfers and has local WMA knowledge..."

### WVWO Brand Requirements

**Voice**: Kim's authentic rural WV tone (faith-forward, humble, neighborly)
**Forbidden**: Corporate speak, "luxury resort", "destination getaway"
**Geographic Context**: Eastern Panhandle, Morgan County, I-81/US 522 corridor (FAR from I-79 - acknowledge distance)
**Hunter Framing**: Out-of-state hunters (MD/VA) using resort as base camp, WVWO as WV-local resource for FFL/gear
**WVWO Integration**: Realistic about distance (2+ hours) - position as "worth the drive for serious gear and FFL services"

### SEO Strategy

**Primary Keywords**:

- "Cacapon hunting"
- "Eastern Panhandle WV hunting"
- "Maryland hunters West Virginia"
- "out-of-state hunting WV lodging"

**Geographic Modifiers**:

- I-81 corridor (Virginia border)
- Morgan County, Berkeley Springs area
- Eastern Panhandle
- Maryland/Virginia proximity

**Search Intent**: Out-of-state hunters (MD/VA) looking for WV hunting access + resort lodging, need FFL transfer info

### Quality Gates (Queen Validation)

Before finalizing content, Queen must verify:

- [ ] Voice passes Kim's Neighbor Test (sounds like Kim, not resort marketing)
- [ ] Out-of-state hunter focus is clear (MD/VA hunters, not local WV hunters)
- [ ] WVWO distance is acknowledged honestly (2+ hours, but FFL service justifies drive)
- [ ] Resort amenities positioned as hunter-friendly (not luxury vacation)
- [ ] FFL transfer emphasis (out-of-state hunters need this service)
- [ ] Geographic context accurate (Eastern Panhandle, NOT central WV)

### Output Format

**Deliverable**: Complete `index.md` file ready for `src/content/destinations/cacapon-resort-state-park/`

**Frontmatter Required**:

```yaml
---
title: "Cacapon Resort State Park"
region: "Eastern Panhandle"
activities: ["resort lodging", "hiking", "golf", "cabins", "mountain views"]
season: "year-round (popular during fall/spring hunting seasons)"
wmaProximity: "Eastern Panhandle WMAs (various, 10-30 miles)"
i79Access: "Not I-79 corridor - I-81/US 522 access (2+ hours from WVWO)"
difficulty: "easy to moderate"
outOfStateAppeal: "high (Maryland/Virginia hunter base camp)"
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

**Success Metric**: Content that positions Cacapon as out-of-state hunter base camp, with WVWO as WV-local FFL/gear resource worth the drive

---

## Research Sources to Consult

- WV State Parks official site (Cacapon Resort page)
- Morgan County and Eastern Panhandle tourism
- Eastern Panhandle WMA details (WVDNR)
- Out-of-state hunting license requirements (MD/VA hunters)
- I-81/US 522 corridor map
- Resort amenities and hunter suitability

## Notes for Queen

- **Cacapon Resort** is in Eastern Panhandle (Morgan County) - FAR from WVWO (2+ hours)
- Primary hunter audience: **Out-of-state (Maryland/Virginia)** using WV as hunting destination
- WVWO value proposition: **FFL transfers** (out-of-state hunters shipping firearms) + local WMA knowledge
- Resort has **lodge, cabins, golf** - position as comfortable base camp, not luxury resort
- Hunter appeal: **Eastern Panhandle WMAs accessible from resort**
- WVWO connection must be **realistic about distance** - "worth the drive for FFL service and serious gear"
- Emphasize **out-of-state licensing info** (hunters need WV nonresident license)
- **Cacapon Mountain** backdrop is scenic draw - mention for resort setting context
