# SPEC-17: Backcountry/Wilderness Template

**Agent**: base-template-generator
**Coordinator**: hierarchical-coordinator (research → architect → generate)
**Reference Example**: monongahela.astro (existing backcountry content)
**Output**: `src/components/templates/BackcountryTemplate.astro`

---

## MISSION

Create a reusable Astro template for West Virginia backcountry and wilderness areas focused on primitive camping, trail systems, wilderness regulations, and Leave No Trace principles. Target ~500-550 lines with safety-first emphasis and self-sufficiency requirements.

---

## MULTI-AGENT ORCHESTRATION

### Phase 1: Pattern Research (researcher + scout-explorer)

**researcher WebSearch queries**:

```
"Monongahela National Forest wilderness area guide structure"
"backcountry camping website design best practices"
"wilderness area regulations display"
"Leave No Trace principles layout"

```

**scout-explorer analysis**:

```bash
# Analyze existing backcountry content
npx agentdb@latest skill search "monongahela wilderness camping trails" 10

# Load wilderness/safety patterns
npx agentdb@latest reflexion retrieve "wilderness safety regulations" --k 10 --synthesize-context

```

**Deliverable**: Research findings on wilderness content patterns, backcountry regulations, safety emphasis, primitive camping information

---

### Phase 2: Architecture Design (code-architect)

**Input**: Research findings + monongahela.astro structure
**Output**: Component architecture specification

**Required Sections**:
1. **Hero**: Area name, acreage, designation type, remoteness stats
2. **Wilderness Areas**: Named zones with terrain, access, difficulty
3. **Backcountry Camping**: Regulations, permitted sites, water sources
4. **Trail System**: Major trails with distance, elevation, difficulty
5. **Required Skills & Gear**: Self-sufficiency requirements, emergency prep
6. **Safety & Leave No Trace**: Wilderness ethics, hazards, wildlife
7. **Access Points**: Trailheads, parking, permits required
8. **Seasonal Considerations**: Best times, weather patterns, closures

**Props Interface**:

```typescript
interface BackcountryTemplateProps {
  name: string;
  acreage: number;
  designation: string; // "National Forest", "Wilderness Area", etc.
  location: string;
  remoteness: string; // e.g., "10+ miles from nearest road"
  quickHighlights: string[];
  wildernessAreas: {
    name: string;
    acreage: number;
    terrain: string;
    difficulty: string; // "Moderate", "Difficult", "Expert Only"
    access: string;
    highlights: string[];
  }[];
  camping: {
    regulations: string[];
    permittedSites: string; // "Dispersed camping allowed", "Designated sites only"
    waterSources: { name: string; reliability: string; treatment: string }[];
    restrictions: string[];
  };
  trails: {
    name: string;
    distance: string; // e.g., "12 miles loop"
    elevationGain: string;
    difficulty: string;
    highlights: string[];
    waterAvailability?: string;
  }[];
  requiredSkills: {
    navigation: string[];
    survival: string[];
    firstAid: string[];
  };
  requiredGear: {
    category: string; // "Ten Essentials", "Overnight Gear", etc.
    items: string[];
  }[];
  safety: {
    hazards: { type: string; description: string; mitigation: string }[];
    wildlife: { animal: string; safety: string[] }[];
    emergencyContact: { service: string; contact: string }[];
  };
  leaveNoTrace: {
    principle: string;
    guidelines: string[];
  }[];
  accessPoints: {
    name: string;
    coords?: string;
    facilities: string[];
    permitsRequired: boolean;
    seasonalAccess?: string;
  }[];
  seasonal: {
    season: string;
    conditions: string;
    bestFor: string[];
    challenges: string[];
  }[];
  heroImage: string;
  mapUrl?: string;
}

```

---

### Phase 3: Template Generation (base-template-generator)

**Input**: Architecture spec + monongahela.astro reference
**Output**: `src/components/templates/BackcountryTemplate.astro`

**Implementation Rules**:
1. **Length**: Target ~525 lines
2. **Typography**:
   - Hero: `font-display text-4xl md:text-5xl lg:text-6xl font-bold`
   - Section headers: `font-display text-3xl md:text-4xl`
   - Wilderness names: `font-display font-bold text-brand-brown`
3. **Colors**:
   - Wilderness areas: `border-l-4 border-l-sign-green`
   - Safety/hazards: `border-l-4 border-l-brand-orange` (high visibility)
   - Leave No Trace: `bg-brand-cream`
   - Required gear: `bg-white border-l-4 border-l-brand-brown`
4. **Layout**:
   - Desktop: 2-3 column grids for wilderness areas/trails/gear
   - Mobile: Full-width stacked cards
5. **Voice**:
   - Serious safety: "This is true wilderness - no cell service, no bailouts"
   - Self-sufficiency: "Bring everything you need - there are no stores out here"
   - Respect: "Leave it better than you found it"
   - Kim's wisdom: "Tell someone your route and when you'll be back"

**Sections to Build**:

#### Hero Section

```astro
<section class="relative h-[70vh] min-h-[500px]">
  <img src={heroImage} class="absolute inset-0 w-full h-full object-cover" />
  <div class="absolute inset-0 bg-brand-brown/60">
    <div class="container mx-auto px-4 h-full flex flex-col justify-end pb-16">
      <h1 class="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
        {name}
      </h1>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4 text-brand-cream mb-6">
        <div class="font-body">
          <span class="text-sm uppercase tracking-wide opacity-80">Acreage</span>
          <p class="font-display text-2xl font-bold">{acreage.toLocaleString()}</p>
        </div>
        <div class="font-body">
          <span class="text-sm uppercase tracking-wide opacity-80">Type</span>
          <p class="font-display text-2xl font-bold">{designation}</p>
        </div>
        <div class="font-body">
          <span class="text-sm uppercase tracking-wide opacity-80">Remoteness</span>
          <p class="font-display text-xl font-bold">{remoteness}</p>
        </div>
      </div>
      <div class="flex flex-wrap gap-3 mb-6">
        {quickHighlights.map(highlight => (
          <span class="bg-sign-green text-white px-4 py-2 rounded-sm font-body text-sm">
            {highlight}
          </span>
        ))}
      </div>
      <div class="border-l-4 border-l-brand-orange bg-brand-brown/40 p-4 max-w-2xl">
        <p class="font-display font-bold text-white text-lg">
          Backcountry Wilderness Area
        </p>
        <p class="font-body text-brand-cream text-sm mt-2">
          Advanced skills required. No facilities, no cell service. Self-rescue only.
        </p>
      </div>
    </div>
  </div>
</section>

```

#### Wilderness Areas Section

```astro
<section class="py-16 bg-white">
  <div class="container mx-auto px-4">
    <h2 class="font-display text-3xl md:text-4xl font-bold text-brand-brown mb-12">
      Wilderness Areas
    </h2>
    <div class="grid md:grid-cols-2 gap-8">
      {wildernessAreas.map(area => (
        <div class="border-l-4 border-l-sign-green pl-6 py-4">
          <h3 class="font-display text-2xl font-bold text-brand-brown mb-3">
            {area.name}
          </h3>
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p class="font-body text-sm text-brand-mud/80">Acreage</p>
              <p class="font-body font-bold text-brand-brown">
                {area.acreage.toLocaleString()}
              </p>
            </div>
            <div>
              <p class="font-body text-sm text-brand-mud/80">Difficulty</p>
              <p class="font-body font-bold text-brand-brown">{area.difficulty}</p>
            </div>
          </div>
          <p class="font-body text-brand-mud mb-3">
            <span class="font-bold">Terrain:</span> {area.terrain}
          </p>
          <p class="font-body text-brand-mud mb-4">
            <span class="font-bold">Access:</span> {area.access}
          </p>
          <div>
            <p class="font-body text-sm font-bold text-brand-brown mb-2">
              Highlights:
            </p>
            <ul class="space-y-1">
              {area.highlights.map(highlight => (
                <li class="font-body text-sm text-brand-mud flex items-start gap-2">
                  <span class="text-sign-green mt-1">•</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

```

#### Backcountry Camping Section

```astro
<section class="py-16 bg-brand-cream">
  <div class="container mx-auto px-4">
    <h2 class="font-display text-3xl md:text-4xl font-bold text-brand-brown mb-12">
      Backcountry Camping
    </h2>
    <div class="grid md:grid-cols-2 gap-8 mb-8">
      <div class="bg-white border-l-4 border-l-sign-green p-6 rounded-sm">
        <h3 class="font-display text-xl font-bold text-brand-brown mb-4">
          Camping Regulations
        </h3>
        <p class="font-body font-bold text-brand-brown mb-3">
          {camping.permittedSites}
        </p>
        <ul class="space-y-2">
          {camping.regulations.map(reg => (
            <li class="font-body text-sm text-brand-mud flex items-start gap-2">
              <span class="text-sign-green mt-1">•</span>
              <span>{reg}</span>
            </li>
          ))}
        </ul>
      </div>
      <div class="bg-white border-l-4 border-l-brand-brown p-6 rounded-sm">
        <h3 class="font-display text-xl font-bold text-brand-brown mb-4">
          Restrictions
        </h3>
        <ul class="space-y-2">
          {camping.restrictions.map(restriction => (
            <li class="font-body text-sm text-brand-mud flex items-start gap-2">
              <span class="text-brand-orange mt-1">⚠</span>
              <span>{restriction}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
    <div>
      <h3 class="font-display text-2xl font-bold text-brand-brown mb-6">
        Water Sources
      </h3>
      <div class="grid md:grid-cols-3 gap-6">
        {camping.waterSources.map(source => (
          <div class="bg-white border-l-4 border-l-brand-mud p-4 rounded-sm">
            <h4 class="font-display font-bold text-brand-brown mb-2">
              {source.name}
            </h4>
            <p class="font-body text-xs text-brand-mud mb-1">
              <span class="font-bold">Reliability:</span> {source.reliability}
            </p>
            <p class="font-body text-xs text-brand-orange">
              {source.treatment}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

```

#### Required Skills & Gear Section

```astro
<section class="py-16 bg-white">
  <div class="container mx-auto px-4">
    <h2 class="font-display text-3xl md:text-4xl font-bold text-brand-brown mb-12">
      Required Skills & Gear
    </h2>

    {/* Skills */}
    <div class="mb-12">
      <h3 class="font-display text-2xl font-bold text-brand-brown mb-6">
        Essential Skills
      </h3>
      <div class="grid md:grid-cols-3 gap-6">
        <div class="border-l-4 border-l-brand-orange pl-6 py-4">
          <h4 class="font-display font-bold text-brand-brown mb-3">
            Navigation
          </h4>
          <ul class="space-y-1">
            {requiredSkills.navigation.map(skill => (
              <li class="font-body text-sm text-brand-mud flex items-start gap-2">
                <span class="text-brand-orange mt-1">•</span>
                <span>{skill}</span>
              </li>
            ))}
          </ul>
        </div>
        <div class="border-l-4 border-l-brand-orange pl-6 py-4">
          <h4 class="font-display font-bold text-brand-brown mb-3">
            Survival
          </h4>
          <ul class="space-y-1">
            {requiredSkills.survival.map(skill => (
              <li class="font-body text-sm text-brand-mud flex items-start gap-2">
                <span class="text-brand-orange mt-1">•</span>
                <span>{skill}</span>
              </li>
            ))}
          </ul>
        </div>
        <div class="border-l-4 border-l-brand-orange pl-6 py-4">
          <h4 class="font-display font-bold text-brand-brown mb-3">
            First Aid
          </h4>
          <ul class="space-y-1">
            {requiredSkills.firstAid.map(skill => (
              <li class="font-body text-sm text-brand-mud flex items-start gap-2">
                <span class="text-brand-orange mt-1">•</span>
                <span>{skill}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>

    {/* Gear */}
    <div>
      <h3 class="font-display text-2xl font-bold text-brand-brown mb-6">
        Required Gear
      </h3>
      <div class="grid md:grid-cols-2 gap-6">
        {requiredGear.map(category => (
          <div class="bg-brand-cream border-l-4 border-l-sign-green p-6 rounded-sm">
            <h4 class="font-display text-lg font-bold text-brand-brown mb-4">
              {category.category}
            </h4>
            <ul class="space-y-2">
              {category.items.map(item => (
                <li class="font-body text-sm text-brand-mud flex items-start gap-2">
                  <span class="text-sign-green mt-1">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p class="font-hand text-brand-brown mt-6 text-center">
        Kim says: "We stock backcountry essentials at the shop. Stop by before you head out - we'll make sure you're prepared."
      </p>
    </div>
  </div>
</section>

```

#### Leave No Trace Section

```astro
<section class="py-16 bg-brand-cream">
  <div class="container mx-auto px-4">
    <h2 class="font-display text-3xl md:text-4xl font-bold text-brand-brown mb-12">
      Leave No Trace Principles
    </h2>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {leaveNoTrace.map((principle, index) => (
        <div class="bg-white border-l-4 border-l-sign-green p-6 rounded-sm">
          <div class="flex items-start gap-3 mb-3">
            <span class="font-display text-2xl font-bold text-sign-green">
              {index + 1}
            </span>
            <h3 class="font-display text-lg font-bold text-brand-brown">
              {principle.principle}
            </h3>
          </div>
          <ul class="space-y-2">
            {principle.guidelines.map(guideline => (
              <li class="font-body text-sm text-brand-mud flex items-start gap-2">
                <span class="text-sign-green mt-1">•</span>
                <span>{guideline}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
</section>

```

#### Safety & Hazards Section

```astro
<section class="py-16 bg-white">
  <div class="container mx-auto px-4">
    <h2 class="font-display text-3xl md:text-4xl font-bold text-brand-brown mb-12">
      Safety & Hazards
    </h2>

    {/* Hazards */}
    <div class="mb-12">
      <h3 class="font-display text-2xl font-bold text-brand-brown mb-6">
        Common Hazards
      </h3>
      <div class="space-y-6">
        {safety.hazards.map(hazard => (
          <div class="border-l-4 border-l-brand-orange bg-brand-cream p-6 rounded-sm">
            <h4 class="font-display text-lg font-bold text-brand-brown mb-2">
              {hazard.type}
            </h4>
            <p class="font-body text-brand-mud mb-3">
              {hazard.description}
            </p>
            <p class="font-body text-sm text-brand-brown">
              <span class="font-bold">Mitigation:</span> {hazard.mitigation}
            </p>
          </div>
        ))}
      </div>
    </div>

    {/* Wildlife */}
    <div class="mb-12">
      <h3 class="font-display text-2xl font-bold text-brand-brown mb-6">
        Wildlife Safety
      </h3>
      <div class="grid md:grid-cols-2 gap-6">
        {safety.wildlife.map(animal => (
          <div class="bg-brand-cream border-l-4 border-l-brand-brown p-6 rounded-sm">
            <h4 class="font-display text-lg font-bold text-brand-brown mb-3">
              {animal.animal}
            </h4>
            <ul class="space-y-2">
              {animal.safety.map(tip => (
                <li class="font-body text-sm text-brand-mud flex items-start gap-2">
                  <span class="text-sign-green mt-1">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>

    {/* Emergency Contact */}
    <div class="border-l-4 border-l-brand-orange bg-brand-cream p-8 rounded-sm">
      <h3 class="font-display text-xl font-bold text-brand-brown mb-4">
        Emergency Contacts
      </h3>
      <div class="grid md:grid-cols-2 gap-6">
        {safety.emergencyContact.map(contact => (
          <div>
            <p class="font-body font-bold text-brand-brown mb-1">
              {contact.service}
            </p>
            <p class="font-display text-xl text-sign-green">
              {contact.contact}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

```

---

## VALIDATION CRITERIA

**Completeness**:
- [ ] ~525 lines
- [ ] All 8 sections implemented
- [ ] TypeScript props interface complete
- [ ] Responsive grid layouts (mobile-first)

**WVWO Aesthetic**:
- [ ] `rounded-sm` enforced
- [ ] Border-left accents (green for wilderness, orange for safety)
- [ ] Kim's voice for practical advice
- [ ] Serious safety emphasis throughout

**Safety Emphasis**:
- [ ] Required skills clearly detailed
- [ ] Hazards prominently displayed
- [ ] Leave No Trace principles integrated
- [ ] Emergency contacts visible

---

## COORDINATION PROTOCOL

**hierarchical-coordinator** manages:
1. **researcher** + **scout-explorer** → Pattern research (parallel)
2. **code-architect** → Architecture design
3. **base-template-generator** → Template implementation

**Memory keys**:
- `swarm/researcher/backcountry-patterns` - Research findings
- `swarm/architect/backcountry-structure` - Component architecture
- `swarm/generator/backcountry-template` - Final template path

**Hooks**:

```bash
npx claude-flow@alpha hooks pre-task --description "Backcountry template generation"
npx claude-flow@alpha hooks post-edit --file "src/components/templates/BackcountryTemplate.astro"
npx claude-flow@alpha hooks post-task --task-id "SPEC-17"

```

---

## SUCCESS METRICS

- Template ~525 lines with safety-first organization
- Props interface supports all wilderness content
- Required skills and gear clearly presented
- WVWO aesthetic fully enforced
- Ready for Phase 4 content population
