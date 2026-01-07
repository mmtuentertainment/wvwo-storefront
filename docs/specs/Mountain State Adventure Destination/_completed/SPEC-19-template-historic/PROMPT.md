# SPEC-19: Historic Site Template

**Agent**: base-template-generator
**Coordinator**: hierarchical-coordinator (research → architect → generate)
**Reference Examples**: NEW (no existing page) - WebSearch for Carnifex Ferry, Bulltown structures
**Output**: `src/components/templates/HistoricTemplate.astro`

---

## MISSION

Create a reusable Astro template for West Virginia historic sites and battlefields focused on historical context, preserved structures, tour information, and educational value. Target ~450-500 lines with storytelling emphasis and interpretive information.

---

## MULTI-AGENT ORCHESTRATION

### Phase 1: Pattern Research (researcher + scout-explorer)

**researcher WebSearch queries**:

```text
"Carnifex Ferry Battlefield website structure"
"Bulltown Historic Area guide layout"
"historic site website design best practices"
"battlefield interpretation display"

```

**scout-explorer analysis**:

```bash
# Search for educational/historical content patterns
npx agentdb@latest skill search "historical education tour interpretation" 10

# Load similar heritage site patterns
npx agentdb@latest reflexion retrieve "educational tour visitor interpretation" --k 10 --synthesize-context

```

**Deliverable**: Research findings on historic site content patterns, interpretive information, tour structures, educational presentation

---

### Phase 2: Architecture Design (code-architect)

**Input**: Research findings + WebSearch results
**Output**: Component architecture specification

**Required Sections**:

1. **Hero**: Site name, era/date, significance, National Register status
2. **Historical Context**: Events, timeline, key figures, broader significance
3. **Preserved Structures**: Buildings, monuments, markers with descriptions
4. **Tours & Interpretation**: Self-guided, ranger-led, exhibits, programs
5. **Site Map**: Walking routes, structure locations, accessibility
6. **Educational Resources**: Living history, school programs, research
7. **Visitor Information**: Hours, fees, facilities, accessibility
8. **Nearby History**: Related sites, museums, heritage trails

**Props Interface**:

```typescript
interface HistoricTemplateProps {
  name: string;
  location: string;
  era: string; // e.g., "Civil War Era (1861-1865)"
  significance: string; // Brief summary
  nationalRegister: boolean;
  quickHighlights: string[];
  historicalContext: {
    events: {
      date: string;
      title: string;
      description: string;
    }[];
    keyFigures: {
      name: string;
      role: string;
      bio: string;
    }[];
    timeline?: {
      year: string;
      event: string;
    }[];
    significance: string; // Deeper context
  };
  structures: {
    name: string;
    type: string; // "Original Structure", "Reconstruction", "Monument", etc.
    year?: string;
    description: string;
    condition: "Restored" | "Ruins" | "Preserved" | "Reconstructed";
    accessible: boolean;
  }[];
  tours: {
    type: string; // "Self-Guided", "Ranger-Led", "Audio Tour", etc.
    duration?: string;
    description: string;
    schedule?: string;
    cost?: string;
  }[];
  exhibits: {
    title: string;
    location: string; // "Visitor Center", "On-Site", etc.
    description: string;
    interactive?: boolean;
  }[];
  education: {
    programs: {
      name: string;
      audience: string; // "School Groups", "Adults", "Families", etc.
      description: string;
      booking?: string;
    }[];
    resources?: {
      title: string;
      type: string; // "Brochure", "Lesson Plan", "Video", etc.
      url?: string;
    }[];
  };
  visitorInfo: {
    hours: { season: string; times: string }[];
    fees: { type: string; amount: string }[];
    facilities: string[];
    accessibility: string[];
    contact: { phone: string; email?: string };
  };
  nearbyHistory: {
    name: string;
    distance: string;
    relation: string; // How it connects to this site
    url?: string;
  }[];
  heroImage: string;
  siteMapUrl?: string;
}

```

---

### Phase 3: Template Generation (base-template-generator)

**Input**: Architecture spec + WebSearch research
**Output**: `src/components/templates/HistoricTemplate.astro`

**Implementation Rules**:

1. **Length**: Target ~475 lines
2. **Typography**:
   - Hero: `font-display text-4xl md:text-5xl font-bold`
   - Section headers: `font-display text-3xl md:text-4xl`
   - Historical quotes: `font-hand` (sparingly)
3. **Colors**:
   - Historical events: `border-l-4 border-l-sign-green`
   - Structures: `bg-brand-cream`
   - Educational programs: `border-l-4 border-l-brand-brown`
   - Visitor info: `border-l-4 border-l-brand-orange`
4. **Layout**:
   - Desktop: 2-column grids for events/structures
   - Mobile: Full-width stacked cards
   - Timeline: Vertical flow with date markers
5. **Voice**:
   - Respectful: "This battlefield saw 244 casualties in a single afternoon"
   - Educational: "The Civil War divided West Virginia families - neighbor against neighbor"
   - Storytelling: "General Floyd's retreat marked the beginning of Confederate losses in WV"

**Quality Gate (Kim's Voice)**:

- [ ] Run the "Counter Test": Does this sound like Kim explaining it?
- [ ] Blacklisted phrases: "unlock potential", "seamless experience", "user journey", "curated", "bespoke"
- [ ] Rule: Plain, conversational, locally rooted phrasing only.

**Sections to Build**:

#### Hero Section

```astro
<section class="relative h-[60vh] min-h-[400px]">
  <img src={heroImage} class="absolute inset-0 w-full h-full object-cover grayscale" />
  <div class="absolute inset-0 bg-brand-brown/70">
    <div class="container mx-auto px-4 h-full flex flex-col justify-end pb-16">
      <h1 class="font-display text-4xl md:text-5xl font-bold text-white mb-6">
        {name}
      </h1>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4 text-brand-cream mb-6">
        <div class="font-body col-span-2">
          <span class="text-sm uppercase tracking-wide opacity-80">Era</span>
          <p class="font-display text-xl font-bold">{era}</p>
        </div>
        {nationalRegister && (
          <div class="font-body">
            <span class="text-sm uppercase tracking-wide opacity-80">Status</span>
            <p class="font-display text-sm font-bold">National Register</p>
          </div>
        )}
      </div>
      <p class="font-body text-brand-cream max-w-3xl mb-6">
        {significance}
      </p>
      <div class="flex flex-wrap gap-3">
        {quickHighlights.map(highlight => (
          <span class="bg-sign-green text-white px-4 py-2 rounded-sm font-body text-sm">
            {highlight}
          </span>
        ))}
      </div>
    </div>
  </div>
</section>

```

#### Historical Context Section

```astro
<section class="py-16 bg-white">
  <div class="container mx-auto px-4">
    <h2 class="font-display text-3xl md:text-4xl font-bold text-brand-brown mb-12">
      Historical Context
    </h2>

    {/* Timeline (if provided) */}
    {historicalContext.timeline && historicalContext.timeline.length > 0 && (
      <div class="mb-12">
        <h3 class="font-display text-2xl font-bold text-brand-brown mb-6">
          Timeline
        </h3>
        <div class="border-l-4 border-l-sign-green pl-8 space-y-6">
          {historicalContext.timeline.map(item => (
            <div>
              <p class="font-display text-lg font-bold text-sign-green">
                {item.year}
              </p>
              <p class="font-body text-brand-mud">
                {item.event}
              </p>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Major Events */}
    <div class="mb-12">
      <h3 class="font-display text-2xl font-bold text-brand-brown mb-6">
        Major Events
      </h3>
      <div class="space-y-6">
        {historicalContext.events.map(event => (
          <div class="border-l-4 border-l-sign-green pl-6 py-4">
            <div class="mb-2">
              <span class="font-display text-sm font-bold text-sign-green">
                {event.date}
              </span>
            </div>
            <h4 class="font-display text-xl font-bold text-brand-brown mb-3">
              {event.title}
            </h4>
            <p class="font-body text-brand-mud">
              {event.description}
            </p>
          </div>
        ))}
      </div>
    </div>

    {/* Key Figures */}
    {historicalContext.keyFigures && historicalContext.keyFigures.length > 0 && (
      <div class="mb-12">
        <h3 class="font-display text-2xl font-bold text-brand-brown mb-6">
          Key Figures
        </h3>
        <div class="grid md:grid-cols-2 gap-6">
          {historicalContext.keyFigures.map(figure => (
            <div class="bg-brand-cream border-l-4 border-l-brand-brown p-6 rounded-sm">
              <h4 class="font-display text-lg font-bold text-brand-brown mb-1">
                {figure.name}
              </h4>
              <p class="font-body text-sm text-sign-green mb-3">
                {figure.role}
              </p>
              <p class="font-body text-sm text-brand-mud">
                {figure.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Broader Significance */}
    <div class="bg-brand-cream border-l-4 border-l-brand-orange p-8 rounded-sm">
      <h3 class="font-display text-xl font-bold text-brand-brown mb-4">
        Historical Significance
      </h3>
      <p class="font-body text-brand-mud leading-relaxed">
        {historicalContext.significance}
      </p>
    </div>
  </div>
</section>

```

#### Preserved Structures Section

```astro
<section class="py-16 bg-brand-cream">
  <div class="container mx-auto px-4">
    <h2 class="font-display text-3xl md:text-4xl font-bold text-brand-brown mb-12">
      Preserved Structures
    </h2>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {structures.map(structure => (
        <div class="bg-white border-l-4 border-l-sign-green p-6 rounded-sm">
          <div class="flex items-start justify-between mb-3">
            <div>
              <h3 class="font-display text-lg font-bold text-brand-brown mb-1">
                {structure.name}
              </h3>
              <p class="font-body text-sm text-sign-green">
                {structure.type}
              </p>
            </div>
            {structure.accessible && (
              <span class="text-brand-orange text-xl" aria-label="Wheelchair accessible">♿</span>
            )}
          </div>
          {structure.year && (
            <p class="font-body text-xs text-brand-mud/80 mb-2">
              Built: {structure.year}
            </p>
          )}
          <p class="font-body text-sm text-brand-mud mb-3">
            {structure.description}
          </p>
          <p class="font-body text-xs text-brand-brown">
            <span class="font-bold">Condition:</span> {structure.condition}
          </p>
        </div>
      ))}
    </div>
    {siteMapUrl && (
      <div class="mt-8 text-center">
        <a
          href={siteMapUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="inline-block bg-sign-green text-white px-6 py-3 rounded-sm font-display text-lg font-bold hover:bg-sign-green/90"
        >
          Download Site Map
        </a>
      </div>
    )}
  </div>
</section>

```

#### Tours & Interpretation Section

```astro
<section class="py-16 bg-white">
  <div class="container mx-auto px-4">
    <h2 class="font-display text-3xl md:text-4xl font-bold text-brand-brown mb-12">
      Tours & Interpretation
    </h2>

    {/* Tours */}
    <div class="mb-12">
      <h3 class="font-display text-2xl font-bold text-brand-brown mb-6">
        Available Tours
      </h3>
      <div class="grid md:grid-cols-2 gap-6">
        {tours.map(tour => (
          <div class="border-l-4 border-l-sign-green pl-6 py-4">
            <h4 class="font-display text-xl font-bold text-brand-brown mb-2">
              {tour.type}
            </h4>
            {tour.duration && (
              <p class="font-body text-sm text-brand-mud mb-2">
                <span class="font-bold">Duration:</span> {tour.duration}
              </p>
            )}
            <p class="font-body text-brand-mud mb-3">
              {tour.description}
            </p>
            {tour.schedule && (
              <p class="font-body text-xs text-brand-mud/80 mb-1">
                <span class="font-bold">Schedule:</span> {tour.schedule}
              </p>
            )}
            {tour.cost && (
              <p class="font-body text-xs text-sign-green">
                {tour.cost}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>

    {/* Exhibits */}
    {exhibits && exhibits.length > 0 && (
      <div>
        <h3 class="font-display text-2xl font-bold text-brand-brown mb-6">
          Exhibits
        </h3>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exhibits.map(exhibit => (
            <div class="bg-brand-cream border-l-4 border-l-brand-brown p-6 rounded-sm">
              <h4 class="font-display font-bold text-brand-brown mb-2">
                {exhibit.title}
              </h4>
              <p class="font-body text-sm text-sign-green mb-3">
                {exhibit.location}
              </p>
              <p class="font-body text-sm text-brand-mud mb-2">
                {exhibit.description}
              </p>
              {exhibit.interactive && (
                <span class="inline-block bg-brand-orange text-white px-2 py-1 rounded-sm text-xs font-bold">
                  Interactive
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
</section>

```

#### Educational Programs Section

```astro
<section class="py-16 bg-brand-cream">
  <div class="container mx-auto px-4">
    <h2 class="font-display text-3xl md:text-4xl font-bold text-brand-brown mb-12">
      Educational Programs
    </h2>
    <div class="grid md:grid-cols-2 gap-8 mb-8">
      {education.programs.map(program => (
        <div class="bg-white border-l-4 border-l-sign-green p-6 rounded-sm">
          <h3 class="font-display text-xl font-bold text-brand-brown mb-2">
            {program.name}
          </h3>
          <p class="font-body text-sm text-sign-green mb-3">
            {program.audience}
          </p>
          <p class="font-body text-brand-mud mb-3">
            {program.description}
          </p>
          {program.booking && (
            <p class="font-body text-xs text-brand-mud/80">
              <span class="font-bold">Booking:</span> {program.booking}
            </p>
          )}
        </div>
      ))}
    </div>

    {/* Resources */}
    {education.resources && education.resources.length > 0 && (
      <div>
        <h3 class="font-display text-2xl font-bold text-brand-brown mb-6">
          Educational Resources
        </h3>
        <div class="grid md:grid-cols-3 gap-6">
          {education.resources.map(resource => (
            <div class="bg-white border-l-4 border-l-brand-brown p-4 rounded-sm">
              <p class="font-body text-xs text-brand-mud/80 mb-1">
                {resource.type}
              </p>
              <h4 class="font-display font-bold text-brand-brown mb-2">
                {resource.title}
              </h4>
              {resource.url && (
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="font-body text-sm text-sign-green hover:underline"
                >
                  Download →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
</section>

```

#### Visitor Information Section

```astro
<section class="py-16 bg-white">
  <div class="container mx-auto px-4">
    <h2 class="font-display text-3xl md:text-4xl font-bold text-brand-brown mb-12">
      Visitor Information
    </h2>
    <div class="grid md:grid-cols-2 gap-8 mb-8">
      {/* Hours */}
      <div class="border-l-4 border-l-sign-green pl-6 py-4">
        <h3 class="font-display text-xl font-bold text-brand-brown mb-4">
          Hours
        </h3>
        <div class="space-y-3">
          {visitorInfo.hours.map(schedule => (
            <div>
              <p class="font-display font-bold text-brand-brown">
                {schedule.season}
              </p>
              <p class="font-body text-brand-mud">
                {schedule.times}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Fees */}
      <div class="border-l-4 border-l-brand-brown pl-6 py-4">
        <h3 class="font-display text-xl font-bold text-brand-brown mb-4">
          Admission
        </h3>
        <div class="space-y-2">
          {visitorInfo.fees.map(fee => (
            <div class="flex items-center justify-between">
              <p class="font-body text-brand-mud">{fee.type}</p>
              <p class="font-display font-bold text-sign-green">{fee.amount}</p>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Facilities & Accessibility */}
    <div class="grid md:grid-cols-2 gap-8">
      <div class="bg-brand-cream border-l-4 border-l-brand-orange p-6 rounded-sm">
        <h3 class="font-display text-lg font-bold text-brand-brown mb-4">
          Facilities
        </h3>
        <ul class="space-y-2">
          {visitorInfo.facilities.map(facility => (
            <li class="font-body text-sm text-brand-mud flex items-start gap-2">
              <span class="text-sign-green mt-1">•</span>
              <span>{facility}</span>
            </li>
          ))}
        </ul>
      </div>
      <div class="bg-brand-cream border-l-4 border-l-brand-orange p-6 rounded-sm">
        <h3 class="font-display text-lg font-bold text-brand-brown mb-4">
          Accessibility
        </h3>
        <ul class="space-y-2">
          {visitorInfo.accessibility.map(item => (
            <li class="font-body text-sm text-brand-mud flex items-start gap-2">
              <span class="text-sign-green mt-1" aria-label="Accessible">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>

    {/* Contact */}
    <div class="mt-8 text-center">
      <p class="font-body text-brand-mud mb-2">
        <span class="font-bold">Phone:</span> <a href={`tel:${visitorInfo.contact.phone}`} class="font-body text-sign-green hover:underline">{visitorInfo.contact.phone}</a>
      </p>
      {visitorInfo.contact.email && (
        <a
          href={`mailto:${visitorInfo.contact.email}`}
          class="font-body text-sign-green hover:underline"
        >
          {visitorInfo.contact.email}
        </a>
      )}
    </div>
  </div>
</section>

```

---

## VALIDATION CRITERIA

**Completeness**:

- [ ] ~475 lines
- [ ] All 8 sections implemented
- [ ] TypeScript props interface complete
- [ ] Responsive grid layouts (mobile-first)

**WVWO Aesthetic**:

- [ ] `rounded-sm` enforced
- [ ] Border-left accents (green for events, brown for structures)
- [ ] Grayscale hero image (respectful tone)
- [ ] Storytelling voice

**Educational Focus**:

- [ ] Historical context with depth
- [ ] Timeline visualization
- [ ] Interpretive programs featured
- [ ] Educational resources accessible

---

## COORDINATION PROTOCOL

**hierarchical-coordinator** manages:

1. **researcher** (WebSearch Carnifex Ferry/Bulltown) → Pattern research
2. **code-architect** → Architecture design
3. **base-template-generator** → Template implementation

**Memory keys**:

- `swarm/researcher/historic-patterns` - Research findings
- `swarm/architect/historic-structure` - Component architecture
- `swarm/generator/historic-template` - Final template path

**Hooks**:

```bash
npx claude-flow@alpha hooks pre-task --description "Historic site template generation"
npx claude-flow@alpha hooks post-edit --file "src/components/templates/HistoricTemplate.astro"
npx claude-flow@alpha hooks post-task --task-id "SPEC-19"

```

---

## SUCCESS METRICS

- Template ~475 lines with educational emphasis
- Props interface supports all historic site content
- Timeline and events clearly presented
- WVWO aesthetic fully enforced
- Ready for Phase 4 content population
