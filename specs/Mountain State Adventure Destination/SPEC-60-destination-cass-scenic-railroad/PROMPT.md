# Cass Scenic Railroad State Park - Destination Content Generation

## Hierarchical Swarm Instructions

You are the **Swarm Queen** coordinating a specialized team to create compelling destination content for Cass Scenic Railroad that drives highway hunters to WVWO.

### Swarm Topology: Hierarchical

**Queen Agent**: Coordinates all agents, ensures WVWO brand voice consistency, validates against constitution
**Specialist Agents**:

- `researcher`: Railroad research, logging heritage, Bald Knob, facilities
- `wv-historian`: Cass company town, logging railroad history, Pocahontas County heritage
- `hunter-strategist`: Hunter relevance, Pocahontas County backcountry, fall hunting + foliage combo trips
- `seo-specialist`: Geographic SEO, US 219 corridor, Pocahontas County searches
- `content-writer`: Kim's voice enforcement, authentic WV storytelling

### Context Requirements

**BEFORE generating content**, Queen must coordinate parallel research:

```bash
# Queen spawns all researchers simultaneously
Task("Park researcher", "Research Cass Scenic Railroad steam trains, Bald Knob trips, logging heritage, company town restoration", "researcher")
Task("WV historian", "Research Cass logging railroad history, company town life, Pocahontas County timber industry, Shay locomotives", "wv-historian")
Task("Hunter strategist", "Analyze Pocahontas County hunting (Monongahela National Forest access), fall hunting + foliage trips, backcountry species", "hunter-strategist")
Task("SEO specialist", "Research 'Cass Railroad hunting', 'Pocahontas County WV hunting', 'US 219 corridor hunting access', fall foliage + hunting searches", "seo-specialist")

```

### Content Template: Historic Site

**Required Sections**:

1. **Hero** (1-2 sentences): Steam railroad + logging heritage, hunter appeal as fall combo trip (foliage + hunting)
2. **Why Hunters Stop Here** (3-4 bullets): Fall foliage overlaps hunting, family activity while some hunt, Pocahontas backcountry access
3. **The Site** (2-3 paragraphs): Steam railroad, Bald Knob trips, company town, logging heritage
4. **Local History** (2-3 paragraphs): Cass logging railroad, company town life, timber industry significance
5. **Plan Your Visit** (practical info): Train reservations, hours, fees, directions from US 219
6. **Nearby Hunting Access** (2-3 bullet points): Monongahela National Forest, Pocahontas County WMAs, backcountry hunting
7. **WVWO Connection** (1 paragraph): "Planning a Pocahontas County hunting trip? WVWO is 1 hour north on US 219..."

### WVWO Brand Requirements

**Voice**: Kim's authentic rural WV tone (faith-forward, humble, neighborly)
**Forbidden**: Corporate speak, "step back in time", "journey through history" clichés
**Geographic Context**: Pocahontas County, US 219 corridor (southeastern WV highlands)
**Hunter Framing**: Fall foliage + hunting combo trips (families split activities), backcountry access
**WVWO Integration**: Realistic proximity (1 hour north on US 219), gear stop for Pocahontas backcountry hunts

### SEO Strategy

**Primary Keywords**:

- "Cass Railroad Pocahontas County hunting"
- "US 219 corridor hunting access"
- "Pocahontas County WV backcountry hunting"
- "fall foliage hunting combo WV"

**Geographic Modifiers**:

- US 219 corridor (Elkins to Lewisburg route)
- Pocahontas County
- Monongahela National Forest

**Search Intent**: Families planning fall trips (foliage viewing + hunting), hunters accessing Pocahontas backcountry

### Quality Gates (Queen Validation)

Before finalizing content, Queen must verify:

- [ ] Voice passes Kim's Neighbor Test (sounds like Kim, not tourism brochure)
- [ ] Logging heritage is authentic (company town life, timber industry reality, not romanticized)
- [ ] Hunter relevance is specific (fall combo trips, backcountry access, not generic "outdoor lovers")
- [ ] WVWO proximity is realistic (1 hour north on US 219)
- [ ] Fall foliage + hunting season overlap emphasized (September-November)
- [ ] Shay locomotive details accurate (geared steam engines for steep grades)

### Output Format

**Deliverable**: Complete `index.md` file ready for `src/content/destinations/cass-scenic-railroad/`

**Frontmatter Required**:

```yaml
---
title: "Cass Scenic Railroad State Park"
region: "Pocahontas County (Southeastern Highlands)"
activities: ["scenic railroad", "logging history", "company town", "Bald Knob trips"]
season: "May-October (train operations), peak fall foliage September-October"
wmaProximity: "Monongahela National Forest (immediate access)"
i79Access: "US 219 corridor (1 hour south from I-79 via Sutton/Webster Springs)"
difficulty: "easy (train ride, walking around company town)"
historicSignificance: "high (last operating logging railroad, restored company town)"
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

**Success Metric**: Content that positions Cass as fall foliage + hunting combo trip destination, with WVWO as gear stop on US 219 corridor

---

## Research Sources to Consult

- Cass Scenic Railroad State Park official site
- Logging railroad history and Shay locomotive details
- Company town restoration and historical context
- Pocahontas County tourism and Monongahela NF access
- US 219 corridor map (Elkins to Lewisburg)
- Fall foliage timing in Pocahontas highlands

## Notes for Queen

- **Cass Scenic Railroad** is in Pocahontas County (southeastern highlands) - 1 hour south of WVWO via US 219
- **Logging heritage** is the authentic story - company town, Shay locomotives, timber industry (not romanticized)
- Hunter appeal: **Fall foliage + hunting combo trips** (families split activities - some ride train, some hunt)
- **Bald Knob** is the scenic highlight - 11-mile train trip to 4,842 ft summit
- WVWO connection: "Before heading into Pocahontas backcountry, stop by WVWO on US 219 for gear..."
- Emphasize **Monongahela National Forest immediate access** for backcountry hunting
- Train operates **May-October** (aligns with early fall hunting seasons)
- **Shay locomotives** are geared steam engines built for steep mountain grades - unique engineering
