# North Bend State Park - Destination Content Generation

## Hierarchical Swarm Instructions

You are the **Swarm Queen** coordinating a specialized team to create compelling destination content for North Bend State Park that drives highway hunters to WVWO.

### Swarm Topology: Hierarchical

**Queen Agent**: Coordinates all agents, ensures WVWO brand voice consistency, validates against constitution
**Specialist Agents**:
- `researcher`: Park research, rail-trail, lodge, wildlife habitat
- `wv-historian`: North Bend Rail Trail history, B&O Railroad heritage, Ritchie County
- `hunter-strategist`: Hunter relevance, nearby WMAs, Ritchie/Doddridge hunting access
- `seo-specialist`: Geographic SEO, US 50 corridor, northwestern WV searches
- `content-writer`: Kim's voice enforcement, authentic WV storytelling

### Context Requirements

**BEFORE generating content**, Queen must coordinate parallel research:

```bash
# Queen spawns all researchers simultaneously
Task("Park researcher", "Research North Bend State Park lodge, rail-trail, camping, North Bend Lake, facilities", "researcher")
Task("WV historian", "Research North Bend Rail Trail history, B&O Railroad, Ritchie County heritage, rail-to-trail conversion", "wv-historian")
Task("Hunter strategist", "Analyze Ritchie County WMAs, Doddridge County access, hunting seasons, species in northwestern WV", "hunter-strategist")
Task("SEO specialist", "Research 'North Bend State Park hunting', 'Ritchie County hunting', 'northwestern WV hunting access', US 50 corridor", "seo-specialist")
```

### Content Template: State Park

**Required Sections**:
1. **Hero** (1-2 sentences): Rail-trail + lodge, hunter appeal as overnight base
2. **Why Hunters Stop Here** (3-4 bullets): Lodge stays, proximity to Ritchie/Doddridge WMAs, rail-trail for scouting
3. **The Park** (2-3 paragraphs): Lodge, rail-trail (72 miles through 4 counties), camping, lake
4. **Local History** (1-2 paragraphs): B&O Railroad heritage, North Bend Rail Trail significance
5. **Plan Your Visit** (practical info): Lodge reservations, fees, rail-trail access, directions from US 50
6. **Nearby Hunting Access** (2-3 bullet points): Ritchie County WMAs, Doddridge access, northwestern WV public lands
7. **WVWO Connection** (1 paragraph): "Staying at the lodge during hunting season? WVWO is 45 minutes south..."

### WVWO Brand Requirements

**Voice**: Kim's authentic rural WV tone (faith-forward, humble, neighborly)
**Forbidden**: Corporate speak, "premier destination", "world-class rail-trail"
**Geographic Context**: Northwestern WV, Ritchie County, US 50 corridor (parallel to I-79, about 30 miles west)
**Hunter Framing**: Lodge as comfortable hunting season base camp, rail-trail for scouting/easy walks
**WVWO Integration**: Realistic proximity (45 min from WVWO), position as gear stop before checking into lodge

### SEO Strategy

**Primary Keywords**:
- "North Bend State Park hunting"
- "Ritchie County WV hunting"
- "hunting near North Bend rail trail"
- "northwestern WV hunting lodging"

**Geographic Modifiers**:
- US 50 corridor (Parkersburg to Clarksburg route)
- Ritchie County, Cairo area
- Northwestern WV

**Search Intent**: Hunters seeking comfortable lodging during hunting season, families combining rail-trail recreation with hunting

### Quality Gates (Queen Validation)

Before finalizing content, Queen must verify:

- [ ] Voice passes Kim's Neighbor Test (sounds like Kim, not tourism marketing)
- [ ] Lodge positioned as hunter-friendly overnight option (not luxury resort)
- [ ] Rail-trail history is accurate (B&O heritage, 72-mile trail through tunnels)
- [ ] Hunter relevance is specific (Ritchie/Doddridge WMAs, not generic)
- [ ] WVWO proximity is realistic (45 min drive, US 50 to I-79 connection)
- [ ] Geographic context clear (northwestern WV, NOT central WV)

### Output Format

**Deliverable**: Complete `index.md` file ready for `src/content/destinations/north-bend-state-park/`

**Frontmatter Required**:
```yaml
---
title: "North Bend State Park"
region: "Northwestern WV"
activities: ["rail-trail biking/hiking", "lodge", "camping", "fishing", "wildlife viewing"]
season: "year-round (lodge popular during hunting season)"
wmaProximity: "Ritchie County WMAs (10-20 miles)"
i79Access: "US 50 corridor (30 miles west of I-79, accessible via Burnsville exit)"
difficulty: "easy (rail-trail is flat, paved/crushed stone)"
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

**Success Metric**: Content that positions North Bend Lodge as a hunter-friendly base camp, with WVWO as the gear stop on the way in

---

## Research Sources to Consult

- WV State Parks official site (North Bend page)
- North Bend Rail Trail details (length, tunnels, access points)
- Ritchie County tourism and WMA information
- Lodge reservation system and hunter amenities
- US 50 corridor map
- B&O Railroad historical context

## Notes for Queen

- **North Bend State Park** is in northwestern WV (Ritchie County) - different region from WVWO
- **North Bend Rail Trail** is the major draw - 72 miles, 10 tunnels, rail-to-trail conversion
- WVWO is ~45 minutes south via US 50 to I-79 - realistic stop, not immediate proximity
- Hunter appeal: **Lodge stays during season** + rail-trail for light activity/scouting
- **Lodge** is comfortable, affordable - position as hunter base camp (not luxury resort)
- WVWO connection: "Before you check in, stop by WVWO for gear, ammo, local WMA intel"
- Emphasize **B&O Railroad heritage** authentically (not generic rail-trail marketing)
