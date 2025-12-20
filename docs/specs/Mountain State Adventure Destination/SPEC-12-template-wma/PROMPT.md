# SPEC-12: WMA (Wildlife Management Area) Template

**Agent**: base-template-generator
**Coordinator**: hierarchical-coordinator (research → architect → generate)
**Reference Example**: elk-river.astro (400+ lines)
**Output**: `src/components/templates/WMATemplate.astro`

---

## MISSION

Create a reusable Astro template for West Virginia Wildlife Management Areas that matches the structure and depth of elk-river.astro (~400 lines) with hunting-specific content organization, facility details, and fishing water information.

---

## MULTI-AGENT ORCHESTRATION

### Phase 1: Pattern Research (researcher + scout-explorer)

**researcher WebSearch queries**:
```
"West Virginia WMA hunting guide structure"
"wildlife management area website layout best practices"
"DNR WMA facility information display"
```

**scout-explorer analysis**:
```bash
# Analyze existing WMA page structure
npx agentdb@latest skill search "WMA hunting facilities" 10
```

**Deliverable**: Research findings on WMA content patterns, hunting season presentation, facility amenities

---

### Phase 2: Architecture Design (code-architect)

**Input**: Research findings + elk-river.astro structure
**Output**: Component architecture specification

**Required Sections**:
1. **Hero**: WMA name, acreage, location, quick stats
2. **What to Hunt**: Species by season with regulations
3. **Fishing Waters**: Named streams/ponds with species
4. **Facilities**: Parking, boat ramps, camping, accessibility
5. **Access Points**: Trailheads, gates, GPS coordinates
6. **Regulations**: Hunting zones, special restrictions
7. **Season Highlights**: Best times for each species

**Props Interface**:
```typescript
interface WMATemplateProps {
  name: string;
  acreage: number;
  county: string;
  species: { name: string; season: string; notes?: string }[];
  fishingWaters: { name: string; species: string[]; access: string }[];
  facilities: { type: string; count?: number; description: string }[];
  accessPoints: { name: string; coords?: string; features: string[] }[];
  regulations: { zone?: string; restrictions: string[] };
  seasonHighlights: { season: string; target: string; tips: string }[];
  mapUrl?: string;
  heroImage: string;
}
```

---

### Phase 3: Template Generation (base-template-generator)

**Input**: Architecture spec + elk-river.astro reference
**Output**: `src/components/templates/WMATemplate.astro`

**Implementation Rules**:
1. **Length**: Target ~400 lines (matches elk-river.astro)
2. **Typography**:
   - Hero: `font-display text-4xl md:text-5xl font-bold`
   - Section headers: `font-display text-2xl md:text-3xl`
   - Species names: `font-display font-bold text-brand-brown`
3. **Colors**:
   - Species cards: `border-l-4 border-l-sign-green`
   - Facilities: `bg-brand-cream`
   - Regulations: `border-l-4 border-l-brand-orange` (safety emphasis)
4. **Layout**:
   - Desktop: 2-column grid for species/facilities
   - Mobile: Full-width stacked cards
5. **Voice**:
   - Kim's tone: "The elk here are the real deal - 700+ pounds of patience required"
   - Regulation clarity: "Check zone boundaries before you set up - DNR enforces strictly"

**Sections to Build**:

#### Hero Section
```astro
<section class="relative h-[60vh] min-h-[400px]">
  <img src={heroImage} class="absolute inset-0 w-full h-full object-cover" />
  <div class="absolute inset-0 bg-brand-brown/60">
    <div class="container mx-auto px-4 h-full flex flex-col justify-end pb-12">
      <h1 class="font-display text-4xl md:text-5xl font-bold text-white mb-4">
        {name}
      </h1>
      <div class="flex gap-6 text-brand-cream font-body">
        <span>{acreage.toLocaleString()} acres</span>
        <span>{county} County</span>
      </div>
    </div>
  </div>
</section>
```

#### What to Hunt Section
```astro
<section class="py-12 bg-white">
  <div class="container mx-auto px-4">
    <h2 class="font-display text-3xl font-bold text-brand-brown mb-8">
      What to Hunt
    </h2>
    <div class="grid md:grid-cols-2 gap-6">
      {species.map(s => (
        <div class="border-l-4 border-l-sign-green pl-6 py-4">
          <h3 class="font-display text-xl font-bold text-brand-brown mb-2">
            {s.name}
          </h3>
          <p class="font-body text-brand-mud mb-2">Season: {s.season}</p>
          {s.notes && (
            <p class="font-hand text-sm text-brand-brown mt-2">
              Kim says: "{s.notes}"
            </p>
          )}
        </div>
      ))}
    </div>
  </div>
</section>
```

#### Fishing Waters Section
```astro
<section class="py-12 bg-brand-cream">
  <div class="container mx-auto px-4">
    <h2 class="font-display text-3xl font-bold text-brand-brown mb-8">
      Fishing Waters
    </h2>
    <div class="space-y-6">
      {fishingWaters.map(water => (
        <div class="bg-white border-l-4 border-l-sign-green p-6 rounded-sm">
          <h3 class="font-display text-xl font-bold text-brand-brown mb-3">
            {water.name}
          </h3>
          <p class="font-body text-brand-mud mb-2">
            Species: {water.species.join(', ')}
          </p>
          <p class="font-body text-sm text-brand-mud/80">
            Access: {water.access}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>
```

#### Facilities Section
```astro
<section class="py-12 bg-white">
  <div class="container mx-auto px-4">
    <h2 class="font-display text-3xl font-bold text-brand-brown mb-8">
      Facilities & Access
    </h2>
    <div class="grid md:grid-cols-3 gap-6">
      {facilities.map(facility => (
        <div class="border-l-4 border-l-brand-mud pl-6 py-4">
          <h3 class="font-display font-bold text-brand-brown mb-2">
            {facility.type}
            {facility.count && <span class="text-sign-green ml-2">({facility.count})</span>}
          </h3>
          <p class="font-body text-sm text-brand-mud">
            {facility.description}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>
```

#### Regulations Section
```astro
<section class="py-12 bg-brand-cream">
  <div class="container mx-auto px-4">
    <h2 class="font-display text-3xl font-bold text-brand-brown mb-8">
      Regulations & Safety
    </h2>
    <div class="border-l-4 border-l-brand-orange bg-white p-6 rounded-sm">
      {regulations.zone && (
        <p class="font-display font-bold text-brand-brown mb-4">
          Zone: {regulations.zone}
        </p>
      )}
      <ul class="space-y-2 font-body text-brand-mud">
        {regulations.restrictions.map(rule => (
          <li class="flex items-start gap-3">
            <span class="text-brand-orange mt-1">•</span>
            <span>{rule}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
</section>
```

---

## VALIDATION CRITERIA

**Completeness**:
- [ ] ~400 lines (matches elk-river.astro depth)
- [ ] All 7 sections implemented
- [ ] TypeScript props interface complete
- [ ] Responsive grid layouts (mobile-first)

**WVWO Aesthetic**:
- [ ] `rounded-sm` enforced (not md/lg)
- [ ] Border-left accents (green for species, orange for regulations)
- [ ] Kim's voice in notes/tips
- [ ] `font-display`, `font-body`, `font-hand` hierarchy

**Functionality**:
- [ ] Props drive all content (no hardcoded data)
- [ ] Conditional rendering (mapUrl, facility counts, notes)
- [ ] Accessible markup (semantic HTML, alt text)

---

## COORDINATION PROTOCOL

**hierarchical-coordinator** manages:
1. **researcher** + **scout-explorer** → Pattern research (parallel)
2. **code-architect** → Architecture design
3. **base-template-generator** → Template implementation

**Memory keys**:
- `swarm/researcher/wma-patterns` - Research findings
- `swarm/architect/wma-structure` - Component architecture
- `swarm/generator/wma-template` - Final template path

**Hooks**:
```bash
npx claude-flow@alpha hooks pre-task --description "WMA template generation"
npx claude-flow@alpha hooks post-edit --file "src/components/templates/WMATemplate.astro"
npx claude-flow@alpha hooks post-task --task-id "SPEC-12"
```

---

## SUCCESS METRICS

- Template matches elk-river.astro depth (~400 lines)
- Props interface supports all WMA content needs
- WVWO aesthetic fully enforced
- Ready for Phase 4 content population
