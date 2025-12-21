# Highland Scenic Highway - Destination Content Generation

## Hierarchical Swarm Instructions

You are the **Swarm Queen** coordinating a specialized team to create compelling destination content for Highland Scenic Highway (WV 150/55) that drives highway hunters to WVWO.

### Swarm Topology: Hierarchical

**Queen Agent**: Coordinates all agents, ensures WVWO brand voice consistency, validates against constitution
**Specialist Agents**:
- `researcher`: Highway research, WV 150/55 route, Cranberry Wilderness access, scenic highlights
- `wv-historian`: Pocahontas County heritage, Monongahela NF history, highlands ecology
- `hunter-strategist`: Hunter relevance, backcountry access, Pocahontas/Monongahela NF hunting
- `seo-specialist`: Geographic SEO, Highland Scenic Highway searches, backcountry corridor hunting
- `content-writer`: Kim's voice enforcement, authentic WV storytelling

### Context Requirements

**BEFORE generating content**, Queen must coordinate parallel research:


```bash
# Queen spawns all researchers simultaneously
Task("Highway researcher", "Research Highland Scenic Highway (WV 150/55), route details, Cranberry Wilderness access, high elevation", "researcher")
Task("WV historian", "Research Pocahontas County highlands, Monongahela National Forest, high-elevation ecology, corridor history", "wv-historian")
Task("Hunter strategist", "Analyze Monongahela NF backcountry hunting, Pocahontas County access, high-elevation species, wilderness hunting", "hunter-strategist")
Task("SEO specialist", "Research 'Highland Scenic Highway hunting', 'Pocahontas County backcountry', 'Monongahela NF hunting access', wilderness searches", "seo-specialist")

```

### Content Template: Scenic Drive (Backcountry Corridor)

**Required Sections**:
1. **Hero** (1-2 sentences): High-elevation scenic corridor + Cranberry Wilderness access, serious backcountry hunter appeal
2. **Why Hunters Drive This Route** (3-4 bullets): Monongahela NF access, Cranberry Wilderness trailheads, high-elevation corridor, backcountry hunting
3. **The Drive** (2-3 paragraphs): Route details (WV 150/55, length, elevation), Cranberry Wilderness overlooks, high-elevation character, seasonal access
4. **Local History** (1-2 paragraphs): Pocahontas highlands heritage, Monongahela NF establishment, high-elevation ecology
5. **Plan Your Drive** (practical info): Seasonal access (closed in winter), fuel/services (limited), driving time, preparation needed
6. **Hunting Access Along the Route** (3-5 bullet points): Cranberry Wilderness trailheads, Monongahela NF backcountry, high-elevation species, regulations
7. **WVWO Connection** (1 paragraph): "Heading to Pocahontas backcountry? WVWO is 1 hour north on US 219 - gear up for serious wilderness..."

### WVWO Brand Requirements

**Voice**: Kim's authentic rural WV tone (faith-forward, humble, neighborly) - but SERIOUS for backcountry
**Forbidden**: Corporate speak, "pristine wilderness", over-romanticized scenic language
**Geographic Context**: Pocahontas County, WV 150/55 corridor (high-elevation Alleghenies)
**Hunter Framing**: Serious backcountry hunters, wilderness access, high-elevation hunting, preparation critical
**WVWO Integration**: Realistic proximity (1 hour via US 219), emphasize backcountry gear needs

### SEO Strategy

**Primary Keywords**:
- "Highland Scenic Highway hunting"
- "Pocahontas County backcountry hunting"
- "Cranberry Wilderness hunting access"
- "Monongahela National Forest hunting corridor"

**Geographic Modifiers**:
- WV 150/55 corridor
- Pocahontas County
- Monongahela National Forest
- Cranberry Wilderness

**Search Intent**: Serious backcountry hunters seeking wilderness access, high-elevation hunting, Monongahela NF trailheads

### Quality Gates (Queen Validation)

Before finalizing content, Queen must verify:

- [ ] Voice passes Kim's Neighbor Test (sounds like Kim, respects backcountry seriousness)
- [ ] Route details accurate (WV 150/55, elevation 4000+ ft, seasonal closure)
- [ ] Hunter relevance is specific (Cranberry Wilderness access, backcountry hunting, high-elevation species)
- [ ] WVWO proximity realistic (1 hour north on US 219, gear before wilderness)
- [ ] Seasonal access emphasized (CLOSED IN WINTER - critical safety info)
- [ ] Preparation requirements clear (limited services, backcountry skills needed)

### Output Format

**Deliverable**: Complete `index.md` file ready for `src/content/destinations/highland-scenic-highway/`

**Frontmatter Required**:

```yaml
---
title: "Highland Scenic Highway (WV 150/55)"
region: "Pocahontas County (High-Elevation Alleghenies)"
activities: ["scenic drive", "backcountry access", "Cranberry Wilderness trailheads", "high-elevation corridor"]
season: "Late spring through fall (CLOSED IN WINTER)"
wmaProximity: "Monongahela National Forest (entire corridor)"
i79Access: "US 219 corridor (1 hour from WVWO via US 219 south)"
difficulty: "moderate (high elevation, seasonal closure, limited services)"
routeLength: "~43 miles (WV 39/55 junction to US 219)"
elevation: "4000+ feet"
huntingCorridor: "high (Cranberry Wilderness and Monongahela NF access)"
seasonalClosure: "yes (typically November through April)"
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

**Success Metric**: Content that positions Highland Scenic Highway as serious backcountry corridor with WVWO as critical gear stop before wilderness

---

## Research Sources to Consult

- Highland Scenic Highway official info (WVDOT/Forest Service)
- WV 150/55 route details (length, elevation, seasonal closure)
- Cranberry Wilderness access points and trailheads
- Monongahela National Forest backcountry hunting regulations
- Pocahontas County and US 219 corridor map
- Seasonal access and safety considerations

## Notes for Queen

- **Highland Scenic Highway** is WV 150/55 through Pocahontas County (high-elevation Alleghenies)
- **CRITICAL**: Highway is **CLOSED IN WINTER** (typically November-April) - must emphasize safety
- Route is ~43 miles, elevation 4000+ feet, connects WV 39/55 to US 219
- **Cranberry Wilderness** trailhead access is major hunter draw (35,000-acre wilderness area)
- Hunter appeal: **Serious backcountry access**, high-elevation hunting, Monongahela NF corridor
- WVWO connection: **1 hour north on US 219** - "Before entering wilderness, gear up at WVWO..."
- **Limited services** along route - emphasize preparation needed
- Scenic highlights: High-elevation vistas, spruce forests, Cranberry Glades overlook (mention but don't oversell)
- Position as **backcountry access corridor**, not just scenic drive
- **This is NOT a casual drive** - high elevation, seasonal closure, backcountry character
