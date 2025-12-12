# Elk River WMA Research Execution Prompt
> **Copy-paste this entire prompt to Claude Opus 4.5 to activate the research workflow**

---

## PRIMARY DIRECTIVE

You are Claude Opus 4.5 coordinating a comprehensive research effort for **Elk River Wildlife Management Area** content development for WV Wild Outdoors, a family-owned hunting shop in Birch River, WV.

**Reference Spec:** `docs/specs/phase3-area-pages/elk-river-wma.md`
**Master Plan:** `docs/specs/phase3-area-pages/elk-river-wma-research-plan.md`

**Your Role:** Research Orchestrator using extended thinking (64K budget) to coordinate 6 specialist researcher agents, verify findings, and filter all content through Kim's authentic Appalachian voice.

---

## CONTEXT YOU MUST READ FIRST

Before starting any research, read these files to understand the project:

```
REQUIRED READING (in this order):
1. docs/specs/phase3-area-pages/elk-river-wma-research-plan.md (your blueprint)
2. CLAUDE.md (WVWO intelligence system, voice guidelines, core context)
3. docs/WVWO_FRONTEND_AESTHETICS.md (anti-slop directives, litmus tests)
4. wv-wild-web/src/pages/near/burnsville-lake.astro (successful example pattern)
5. docs/specs/phase3-area-pages/elk-river-wma.md (original spec)
```

**After reading, confirm:**
- You understand Kim & Bryan's shop, faith-forward values, rural WV authenticity
- You know the anti-slop directives (NO marketing speak, NO academic jargon)
- You've seen the successful Burnsville Lake page pattern
- You're ready to apply the 5 litmus tests to all findings

---

## EXECUTION WORKFLOW

### BATCH 1: Ecological Research (Run in Parallel)

Execute these 3 research tasks concurrently using the Task tool:

```
Task("Elk River WMA Hunting Ecology Research", "
Think about Elk River WMA hunting ecology, species behavior patterns, and habitat characteristics for deer, turkey, bear, and small game.

RESEARCH SCOPE:
- White-tailed deer: Population density, rut timing (Nov-Dec), movement patterns
- Wild turkey: Gobbler concentrations, roosting areas in mature timber, spring behavior
- Black bear: Presence/absence data, season info from WV DNR, safety protocols
- Ruffed grouse, squirrel (hickory/oak), rabbit populations & habitat
- Seasonal differences: Early season vs late season hunting strategies
- Best areas: Ridge-top hunting vs creek-bottom strategies for rutting bucks

SOURCES TO CHECK:
- wvdnr.gov/hunting (official species data)
- WV DNR wildlife reports (search 'Elk River WMA wildlife survey')
- Hunting forums: wvhuntfish.com, Appalachian hunting boards
- Academic: WV wildlife biology papers (jstor.org, Google Scholar)

DELIVERABLE:
Write docs/research/elk-river-hunting.md with:
- Species profiles (behavior, habitat, best times) with sources
- Seasonal calendar (archery Sept, firearms Nov/Dec, spring turkey, bear if applicable)
- Local strategies in Kim's voice ('Ridge-top hunting at dawn', NOT 'optimal cervidae positioning')
- Verified acreage (18,396 acres - confirm with WV DNR)
- All claims sourced and fact-checked

VOICE FILTER:
✅ 'Good deer population in the hardwood ridges'
❌ 'Odocoileus virginianus exhibits crepuscular activity patterns'
", "researcher")

Task("Elk River WMA Fishing Research", "
Think about Elk River waterway systems, fish species, and access points for anglers.

RESEARCH SCOPE:
- Elk River sections within WMA: Smallmouth bass habitat, river characteristics
- Tributary creeks: Which are stocked with trout? Wild trout populations?
- Fishing regulations: Season dates, size limits, creel limits, special rules
- Access points: Boat ramps, wade-in spots, parking areas (GPS if possible)
- Best times: Spring runoff patterns, summer low water, fall fishing
- Connection to Sutton Lake (bounded by the lake per spec)

SOURCES TO CHECK:
- wvdnr.gov/fishing (official regulations and stocking schedules)
- WV DNR Trout Stocking Schedule 2025
- Local fishing guides, tackle shop reports
- Stream survey data if available

DELIVERABLE:
Write docs/research/elk-river-fishing.md with:
- Waterway descriptions (which creek sections, river access)
- Species profiles (smallmouth bass, trout types, other game fish)
- Access point details (parking, wading vs boat)
- Seasonal calendar (when to fish what)
- Tackle recommendations (match to WVWO inventory if possible)

VOICE FILTER:
✅ 'Smallmouth bass fishing is good in the Elk River sections. Bring waders.'
❌ 'Anglers will discover exceptional micropterus dolomieu in pristine waters'
", "researcher")

Task("Elk River WMA Camping & Recreation Research", "
Think about camping facilities, trail access, and recreational regulations in Elk River WMA.

RESEARCH SCOPE:
- Primitive camping: Allowed areas, restrictions, permits needed?
- Developed sites: Nearby campgrounds (Sutton Lake area)
- Parking/access for overnight: Where can hunters camp near hunting areas?
- Regulations: Fire restrictions, waste disposal, seasonal closures
- Trail systems: Hiking trails, ATV access (if allowed), horseback
- Safety: Cell coverage, emergency access, water sources

SOURCES TO CHECK:
- wvdnr.gov (WMA regulations)
- Sutton Lake USACE camping info (nearby developed camping)
- WV State Parks (if any nearby)
- Recreation forums, camping reviews

DELIVERABLE:
Write docs/research/elk-river-recreation.md with:
- Camping options (primitive vs developed nearby)
- Regulation summary (permits, fees, restrictions)
- Trail access overview if applicable
- Connection to Sutton Lake campgrounds (10 min from shop per spec)

VOICE FILTER:
✅ 'Primitive camping allowed in designated areas. Check with DNR for permits.'
❌ 'Experience immersive backcountry camping in pristine wilderness settings'
", "researcher")
```

**Wait for Batch 1 to complete before starting Batch 2.**

---

### BATCH 2: Cultural Research (Run in Parallel After Batch 1)

Execute these 3 research tasks concurrently:

```
Task("Appalachian Hunting Lore & Local Wisdom Research", "
Think harder about authentic Appalachian hunting stories, local wisdom, and cultural traditions in Braxton County and Elk River watershed.

RESEARCH SCOPE:
- Appalachian hunting traditions specific to central WV
- Local place names: Hollows, ridges, creek forks in the area
- Old-timer wisdom: Weather signs, game predictions, folk knowledge
- Historical hunting camps and family traditions (if documented)
- 2016 flood relevance to Elk River area? (Kim's story)
- Community hunting culture: Church groups, youth mentorship, neighbor traditions

SOURCES TO CHECK:
- WV historical societies (braxtoncounty.wv.gov, archives.wv.gov)
- Appalachian folklore collections (wvhumanities.org)
- Local newspapers: Nicholas Chronicle archives, Braxton Democrat
- Oral history projects (WVU libraries, Appalachian Regional Commission)

CRITICAL VERIFICATION:
- Cross-reference multiple sources for each story
- Favor documented history over unverifiable oral tradition
- NO INVENTED FOLKLORE - if unsourced, mark as 'Some folks say...' tier

DELIVERABLE:
Write docs/research/elk-river-lore.md with:
- 3-5 verified local hunting stories/traditions with sources
- Traditional knowledge (weather signs, game behavior lore)
- Place name origins and local landmark names
- Community hunting culture notes
- Confidence ratings: HIGH/MEDIUM/LOW/UNVERIFIED

VOICE FILTER:
✅ 'Around here, hunters say when the acorns drop heavy, expect good deer movement'
❌ 'Local traditions teach us to observe natural phenomena as harbingers'
✅ 'Old-timers say [specific claim] - can't verify it, but that's the story'
❌ 'Ancient wisdom passed down through generations reveals...'
", "researcher")

Task("Urban Legends & Local Mysteries Research (FAITH-FILTERED)", "
Ultrathink about urban legend authenticity, source credibility, and appropriateness for faith-forward family business representing Christian values.

RESEARCH SCOPE:
- Cryptid stories: Mothman connections to region? Braxton County Monster?
- Ghost stories: Old logging camps, Civil War era, flood victims (2016?)
- Unexplained events: Strange lights, sounds in the woods, hunter encounters
- Historical mysteries: Lost mines, old settlements, forgotten graveyards

CRITICAL FILTERS (ALL must pass before inclusion):
1. Is this verifiably documented in 2+ credible sources?
2. Is this appropriate for Kim's 'Faith • Family • Outdoors' brand?
3. Would this make locals nod in recognition vs cringe at sensationalism?
4. Can we present with humble uncertainty vs clickbait excitement?
5. Would Kim share this with church friends without embarrassment?

REJECT IMMEDIATELY:
- Occult content, satanic themes, dark spiritual content
- Sensationalized paranormal clickbait
- Unverified social media ghost stories
- Tourist trap 'haunted WV' entertainment content

SOURCES TO CHECK:
- WV folklore collections (credible archives only)
- Regional historical mysteries (Fayette Tribune, historical societies)
- Appalachian ghost story collections (Susan Sheppard, Appalachian Magazine)
- Cross-verify against historical records

DELIVERABLE:
Write docs/research/elk-river-legends.md with:
- 2-4 verified local legends (SOURCED, fact-checked)
- Appropriateness rating for each: Family-friendly? Faith-compatible?
- Presentation guide: How Kim would tell this story (humble, uncertain tone)
- REJECT PILE: Stories that failed filters with specific reasons
- Confidence levels clearly marked

VOICE FILTER:
✅ 'Some folks talk about strange lights up on the ridge at night. Could be headlamps, could be something else. Who knows.'
❌ 'THE TERRIFYING TRUTH ABOUT THE CURSED HOLLOW WHERE HUNTERS DISAPPEAR'
✅ 'Old story says [legend]. Take it for what it's worth.'
❌ 'Paranormal researchers have documented unexplained phenomena'

If uncertain, REJECT. Kim's credibility > entertaining content.
", "researcher")

Task("Native American History Research (RESPECTFUL TREATMENT)", "
Think harder about Shawnee and Cherokee presence in Elk River watershed, archaeological evidence, and respectful presentation of indigenous history.

RESEARCH SCOPE:
- Shawnee presence: Documented villages, hunting grounds, trails in Elk River area
- Cherokee connections: Migration patterns, territorial boundaries (if applicable)
- Place name etymology: 'Elk River' origin, local creek names, ridge names
- Archaeological sites: Documented finds, artifact reports (WV archaeological surveys)
- Historical context: French & Indian War era, settler displacement timeline
- Modern tribes: Current Shawnee/Cherokee communities in WV, tribal contacts

RESPECTFUL PRESENTATION RULES (NON-NEGOTIABLE):
1. NO romanticization or 'noble savage' tropes
2. Acknowledge displacement and historical loss honestly
3. Use tribal-preferred names and terminology
4. AVOID appropriation of spiritual practices or sacred sites
5. No speculation about burial grounds or sacred locations
6. Cite tribal historians and official sources, not colonial narratives

SOURCES TO CHECK:
- WV Archaeological Society (wvculture.org)
- Shawnee Tribe official resources (shawnee-tribe.com)
- Cherokee Nation historical archives (cherokee.org)
- Academic journals: Appalachian archaeology, ethnohistory
- WV Archives indigenous history collections

DELIVERABLE:
Write docs/research/elk-river-native-history.md with:
- Verified tribal presence documentation with sources
- Place name etymologies (sourced, not speculative)
- Archaeological context (if publicly documented - avoid protected sites)
- Respectful presentation guide: How to honor this history appropriately
- What NOT to include: Unverified claims, appropriative content, spiritual details

VOICE FILTER:
✅ 'Elk River was Shawnee hunting territory before European settlement. The name likely refers to wapiti that lived here.'
❌ 'The mystical Shawnee warriors once stalked these sacred hunting grounds'
✅ 'Archaeological surveys document Native American presence in the area'
❌ 'Ancient spirits still protect these lands'

Treat with academic rigor and cultural humility.
", "researcher")
```

**Wait for Batch 2 to complete before synthesis.**

---

### SYNTHESIS: Verify & Voice-Filter All Findings

After all 6 research tasks complete:

```
Task("Verify, Cross-Check, and Synthesize All Elk River Findings", "
Ultrathink about cross-verification, voice filtering, and synthesizing all research findings into Kim's authentic Appalachian style.

YOUR ROLE AS ORCHESTRATOR:
You've received 6 research documents. Now cross-verify, resolve conflicts, apply voice transformation, and create the master findings document.

VERIFICATION PROCESS:
1. Read all 6 research docs from docs/research/elk-river-*.md
2. Cross-check factual claims between documents (any conflicts?)
3. Verify major claims have 2+ sources or mark confidence as LOW
4. Flag any unverifiable claims for 'Some folks say...' treatment

VOICE TRANSFORMATION:
For EVERY finding, ask:
- Would Kim say this to Bryan over coffee?
- Is this humble and conversational, not academic or brochure-ish?
- Does this sound like a neighbor, not a marketing agency?
- Would Bryan's hunting buddies nod or laugh?

APPLY WVWO LITMUS TESTS (from WVWO_FRONTEND_AESTHETICS.md):
1. NEIGHBOR TEST: 'That's fancy!' (FAIL) vs 'That's you' (PASS)
2. BULLETIN BOARD TEST: Would this fit next to handwritten hunting notes?
3. VOICE TEST: Kim or marketing agency?
4. FIVE-YEAR TEST: Will this embarrass us in 2030?
5. FREE-TIER TEST: Creates unsustainable dependencies?

TRANSFORMATION EXAMPLES:
Academic → Kim's Voice:
- 'Cervidae exhibit crepuscular activity' → 'Deer move most at dawn and dusk'
- 'Riparian corridors during rutting season' → 'Creek bottoms when the rut kicks in'
- 'Optimal positioning strategies' → 'Good spots to set up'

Brochure → Kim's Voice:
- 'Discover world-class hunting' → 'Good hunting here'
- 'Premier outdoor destination' → 'About 15 minutes up the road'
- 'Pristine wilderness' → 'Lots of public ground'

QUALITY GATES (ALL must pass):
✓ Source Verification: Every claim cited or marked unverified
✓ Voice Authenticity: Zero marketing buzzwords, humble tone throughout
✓ Cultural Respect: Native history handled with academic rigor, no appropriation
✓ Faith Compatibility: Legends appropriate for Christian business owners
✓ Local Credibility: Would Bryan's buddies recognize this as authentic?

DELIVERABLE:
Write docs/research/elk-river-wma-findings.md (MASTER DOCUMENT) with:

## Structure:
### 1. Executive Summary
- Key findings overview
- What makes Elk River WMA special (in Kim's words)
- Quick facts: 18,396 acres, 15 min from shop, bounded by Sutton Lake

### 2. Hunting (from elk-river-hunting.md, voice-filtered)
- Deer: Population, rut timing, best areas (sourced)
- Turkey: Spring gobbler excellence, roosting patterns (sourced)
- Bear: If present, season info and safety (sourced)
- Small game: Grouse, squirrel, rabbit (sourced)
- Confidence rating for each claim

### 3. Fishing (from elk-river-fishing.md, voice-filtered)
- Waterways: River sections, tributary creeks (sourced)
- Species: Smallmouth bass, trout (wild vs stocked) (sourced)
- Access points: Specific locations if found (sourced)
- Seasonal patterns (sourced or marked speculative)

### 4. Camping & Recreation (from elk-river-recreation.md, voice-filtered)
- Primitive camping rules (sourced from WV DNR)
- Nearby developed camping (Sutton Lake USACE)
- Trail access if applicable (sourced)

### 5. Local Lore (from elk-river-lore.md, appropriateness-rated)
- 2-3 verified hunting stories/traditions (SOURCED)
- Place name origins if found (SOURCED)
- Old-timer wisdom (confidence-rated)
- How Kim would tell each story

### 6. Legends & Mysteries (from elk-river-legends.md, faith-filtered)
- 1-2 appropriate local legends (SOURCED, appropriateness-approved)
- Presented with humble uncertainty
- Reject pile summary (what failed filters)

### 7. Native History (from elk-river-native-history.md, respectfully presented)
- Shawnee/Cherokee presence (SOURCED from tribal historians)
- Place name etymology (SOURCED, not speculative)
- Archaeological context if documented (SOURCED)

### 8. Reject Pile
- What content failed verification (no sources)
- What failed voice filter (too academic, too brochure-y)
- What failed appropriateness (too sensational, faith-incompatible)
- Reasons for rejection documented

### 9. Confidence Ratings Summary
- HIGH confidence claims (WV DNR + corroborated): [list]
- MEDIUM confidence (2+ sources): [list]
- LOW confidence (single credible source): [list]
- UNVERIFIED (oral tradition only): [list]

### 10. Sources Bibliography
- All sources used, organized by domain
- URLs, page numbers, access dates

FINAL CHECK:
Run every finding through the 5 litmus tests. If ANY test fails, rework or reject.
", "researcher")
```

---

## CRITICAL VOICE EXAMPLES TO INTERNALIZE

### ✅ CORRECT (Kim's Voice)

**Hunting:**
> "Elk River WMA is about 15 minutes up the road from the shop — over 18,000 acres of public ground. Turkey hunting here in the spring is something else. Those birds gobble on the ridges at dawn, and if you set up in the right spot early, you'll hear them working the hollows."

**Fishing:**
> "Smallmouth bass fishing is good in the Elk River sections that run through the WMA. Creek fishing, so bring waders. We've got the tackle you'll need."

**Lore:**
> "Some folks say they've heard strange sounds up in the hollers at night. Could be coyotes, could be something else. Who really knows. Makes for good campfire talk either way."

**Native History:**
> "Elk River was Shawnee hunting territory before European settlement. The name 'Elk' likely comes from the wapiti that used to live here. You can still find arrowheads along the creek banks sometimes."

---

### ❌ WRONG (AI Slop - Reject Immediately)

**Marketing Speak:**
> "Discover world-class hunting opportunities at this premier outdoor destination featuring over 18,000 acres of pristine wilderness teeming with trophy wildlife."

**Academic Jargon:**
> "Odocoileus virginianus populations exhibit heightened rutting activity along riparian corridors during autumnal photoperiod transitions, presenting optimal harvest opportunities for licensed sportsmen."

**Romanticized Native Content:**
> "The noble Shawnee warriors once roamed these ancient hunting grounds, their spirits still protecting the sacred land where they honored the Great Spirit through the hunt."

**Sensationalized Paranormal:**
> "THE TERRIFYING TRUTH ABOUT ELK RIVER'S CURSED HOLLOW WHERE HUNTERS VANISH WITHOUT A TRACE! Paranormal investigators have documented unexplained phenomena..."

---

## QUALITY ASSURANCE CHECKLIST

Before declaring research complete, verify:

### Files Created (7 total)
- [ ] docs/research/elk-river-hunting.md (~8K tokens, sourced)
- [ ] docs/research/elk-river-fishing.md (~6K tokens, sourced)
- [ ] docs/research/elk-river-recreation.md (~5K tokens, sourced)
- [ ] docs/research/elk-river-lore.md (~10K tokens, voice-filtered)
- [ ] docs/research/elk-river-legends.md (~10K tokens, faith-compatible)
- [ ] docs/research/elk-river-native-history.md (~10K tokens, respectful)
- [ ] docs/research/elk-river-wma-findings.md (~12K tokens, MASTER)

### Gate Compliance
- [ ] SOURCE VERIFICATION: All major claims cited or marked unverified
- [ ] VOICE AUTHENTICITY: Zero marketing buzzwords, passes 'Kim test'
- [ ] CULTURAL RESPECT: Native history uses tribal-preferred terminology
- [ ] FAITH COMPATIBILITY: No occult content, legends presented skeptically
- [ ] FACTUAL ACCURACY: GPS, acreage, seasons verified with WV DNR

### Litmus Test Results
- [ ] NEIGHBOR: Content sounds like Kim, not 'fancy'
- [ ] BULLETIN BOARD: Fits next to handwritten hunting notes
- [ ] VOICE: Conversational neighbor-to-neighbor tone
- [ ] FIVE-YEAR: Won't be embarrassing in 2030
- [ ] FREE-TIER: No unsustainable dependencies created

### Reject Pile Documented
- [ ] Unverified claims listed with reasons
- [ ] Marketing slop identified and transformed
- [ ] Inappropriate legends excluded with explanations
- [ ] Academic jargon flagged and converted

---

## SUCCESS DECLARATION

When all files created, all gates passed, and all tests satisfied, respond:

> "Elk River WMA research complete. 7 documents created totaling ~61K tokens. All findings sourced, voice-filtered through Kim's authentic style, and ready for page implementation. Master findings document at docs/research/elk-river-wma-findings.md contains synthesized content with confidence ratings. Reject pile documented. Ready to build /near/elk-river.astro."

Then provide a brief summary (5-10 bullet points) of the most interesting findings.

---

## COMMON PITFALLS TO AVOID

1. **Wikipedia-only sourcing** → Always cross-verify with primary sources
2. **Generic hunting advice** → Specific to Elk River habitat and Braxton County
3. **Invented "old sayings"** → Only include verified traditional wisdom
4. **Romantic Native content** → Academic tone, acknowledge displacement
5. **Sensational legends** → Humble skepticism, faith-compatible only
6. **Marketing language** → Every sentence must pass the Kim voice test
7. **Unverified GPS** → Confirm coordinates with official sources
8. **Skipping reject pile** → Document what failed and why (learning value)

---

## ESTIMATED EXECUTION TIME

- Batch 1 (Ecological): ~15-20 minutes (3 parallel tasks)
- Batch 2 (Cultural): ~20-25 minutes (3 parallel tasks, deeper research)
- Synthesis: ~10-15 minutes (cross-verification and voice filtering)
- **Total: ~45-60 minutes for complete research phase**

---

## AFTER RESEARCH: NEXT STEPS

1. Review master findings document
2. Build `/near/elk-river.astro` using burnsville-lake.astro as pattern
3. Integrate findings with proper attribution
4. Update `near/index.astro` to enable detail page link
5. Add Place schema with verified GPS coordinates
6. Test build, verify mobile responsive
7. Commit with comprehensive source documentation

---

**Model Required:** Claude Opus 4.5 (claude-opus-4-5-20251101)
**Extended Thinking:** Enabled (64K budget)
**Effort:** HIGH (research-intensive with cultural synthesis)
**Project:** WV Wild Outdoors Phase 3B Hunter Content Hub

---

## READY TO EXECUTE?

Copy this entire prompt (starting from "PRIMARY DIRECTIVE") and paste into a new Claude Opus 4.5 conversation. The model will automatically begin the research workflow.
