# Midland Trail Byway - Destination Content Generation

## Hierarchical Swarm Instructions

You are the **Swarm Queen** coordinating a specialized team to create compelling destination content for Midland Trail Byway (US 60) that drives highway hunters to WVWO.

### Swarm Topology: Hierarchical

**Queen Agent**: Coordinates all agents, ensures WVWO brand voice consistency, validates against constitution
**Specialist Agents**:

- `researcher`: Byway research, US 60 corridor, scenic highlights, access points
- `wv-historian`: Midland Trail history, corridor heritage, counties along route
- `hunter-strategist`: Hunter relevance, corridor WMA access, multi-county hunting opportunities
- `seo-specialist`: Geographic SEO, US 60 corridor, scenic byway + hunting searches
- `content-writer`: Kim's voice enforcement, authentic WV storytelling

### Context Requirements

**BEFORE generating content**, Queen must coordinate parallel research:

```bash
# Queen spawns all researchers simultaneously
Task("Byway researcher", "Research Midland Trail Byway (US 60), scenic highlights, counties, route length, key stops", "researcher")
Task("WV historian", "Research Midland Trail history (historic route), New River Gorge region, corridor heritage", "wv-historian")
Task("Hunter strategist", "Analyze WMAs along US 60 corridor (Fayette, Greenbrier, Nicholas counties), hunting access from byway", "hunter-strategist")
Task("SEO specialist", "Research 'Midland Trail hunting', 'US 60 corridor WV hunting', 'scenic byway hunting access', corridor searches", "seo-specialist")

```

### Content Template: Scenic Drive

**Required Sections**:

1. **Hero** (1-2 sentences): Historic US 60 corridor + scenic highlights, hunter appeal as multi-county access route
2. **Why Hunters Drive This Route** (3-4 bullets): Multi-county WMA access, scenic corridor, connects hunting areas, lodging options
3. **The Drive** (2-3 paragraphs): Route details (length, counties), scenic highlights, key stops, road character
4. **Local History** (1-2 paragraphs): Midland Trail history (historic route), corridor significance, regional heritage
5. **Plan Your Drive** (practical info): Route map, seasonal considerations, fuel/services, driving time
6. **Hunting Access Along the Route** (3-5 bullet points): WMAs by county, access points, multi-day trip planning
7. **WVWO Connection** (1 paragraph): "US 60 intersects I-79 near Birch River - WVWO is your corridor gear stop..."

### WVWO Brand Requirements

**Voice**: Kim's authentic rural WV tone (faith-forward, humble, neighborly)
**Forbidden**: Corporate speak, "scenic journey", over-romanticized byway language
**Geographic Context**: US 60 corridor (east-west route through south-central WV)
**Hunter Framing**: Multi-county hunting access route, corridor connects hunting areas, WVWO at I-79 intersection
**WVWO Integration**: Emphasize I-79/US 60 intersection proximity - WVWO is natural corridor stop

### SEO Strategy

**Primary Keywords**:

- "Midland Trail Byway hunting"
- "US 60 corridor WV hunting access"
- "scenic byway hunting WV"
- "multi-county hunting route WV"

**Geographic Modifiers**:

- US 60 corridor
- Fayette, Greenbrier, Nicholas counties
- I-79 intersection (Birch River area)

**Search Intent**: Hunters planning multi-day corridor trips, seeking WMA access along scenic routes, route planning

### Quality Gates (Queen Validation)

Before finalizing content, Queen must verify:

- [ ] Voice passes Kim's Neighbor Test (sounds like Kim, not tourism marketing)
- [ ] Route details accurate (US 60, counties, length, key intersections)
- [ ] Hunter relevance is specific (WMAs along corridor, multi-county access)
- [ ] WVWO intersection emphasized (I-79/US 60 near Birch River)
- [ ] Scenic highlights mentioned but not over-dramatized
- [ ] Multi-day trip planning info included (lodging, fuel, services)

### Output Format

**Deliverable**: Complete `index.md` file ready for `src/content/destinations/midland-trail-byway/`

**Frontmatter Required**:

```yaml
---
title: "Midland Trail Byway (US 60)"
region: "South-Central WV Corridor"
activities: ["scenic drive", "multi-county hunting access", "historic route", "corridor travel"]
season: "year-round (fall color peak September-October)"
wmaProximity: "Multiple WMAs along corridor (Fayette, Greenbrier, Nicholas counties)"
i79Access: "Intersects I-79 near Birch River (WVWO location)"
difficulty: "easy (paved highway, all-weather)"
routeLength: "~150 miles (White Sulphur Springs to Charleston)"
huntingCorridor: "high (connects multiple counties and WMAs)"
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

**Success Metric**: Content that positions Midland Trail as hunter corridor route with WVWO at strategic I-79 intersection

---

## Research Sources to Consult

- Midland Trail Scenic Highway Association
- US 60 corridor map (counties, length, key intersections)
- WMAs along US 60 (Fayette, Greenbrier, Nicholas, Kanawha counties)
- Historic Midland Trail context
- I-79/US 60 intersection details (Birch River area)
- Lodging and services along corridor

## Notes for Queen

- **Midland Trail Byway** follows US 60 through south-central WV (east-west corridor)
- **WVWO strategic location**: I-79/US 60 intersection near Birch River - **natural corridor stop**
- Route runs ~150 miles from White Sulphur Springs (east) to Charleston (west)
- Counties along route: **Greenbrier, Fayette, Nicholas, Kanawha** (all have WMAs)
- Hunter appeal: **Multi-county corridor** connects hunting areas, WVWO at midpoint
- Scenic highlights: New River Gorge, Kanawha Falls, mountain views (mention but don't oversell)
- **Historic route**: Original cross-state highway (pre-interstate era)
- WVWO connection: **"US 60 intersects I-79 at Exit 57 - WVWO is your corridor gear stop for multi-county hunts"**
- Position as **hunting access corridor**, not just scenic drive
