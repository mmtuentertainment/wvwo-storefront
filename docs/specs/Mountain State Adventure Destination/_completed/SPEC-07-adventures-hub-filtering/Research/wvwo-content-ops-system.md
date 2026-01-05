# WVWO Content Operations System (Async, Remote-Friendly)

## Matt's Actual Constraint

- **Matt:** Ohio (5+ hour drive from shop)
- **Kim:** Rural WV, no cell service at shop, computer + internet available
- **Communication:** Facebook Messenger (async, batched)
- **Reality:** Matt does 90% of research + writing. Kim does 10% review + truth-check.

---

## Core Premise: "Async Pass System"

Instead of interviews, Matt is doing a **structured, repeatable async review loop**:

1. **Matt prepares** (research + draft skeleton) — NO KIM TIME NEEDED YET
2. **Matt sends Kim a Messenger prompt** (structured, easy to answer)
3. **Kim responds with edits/truth-check** (when she's at the computer)
4. **Matt integrates and publishes**

This means Kim can review **5-10 adventures in one sitting** without talking to Matt live. Matt writes **asynchronously** in Matt's own time.

---

## Step 1: The Markdown Template (What Matt Writes Every Time)

Matt will create **one markdown file per adventure** following this exact structure:

```markdown
---
title: "Elk River WMA: Spring Gobbler Hunting"
slug: "elk-river-wma-spring-gobbler"
category: "hunting"
season: ["spring"]
difficulty: "moderate"
location: "Braxton County, WV"
coordinates:
  lat: 38.5234
  lng: -80.8456
elevation_gain: null  # Leave null, Matt fills via script
suitability: ["turkey-hunting", "beginner-advanced"]
gear: ["turkey-vest", "box-call", "shotgun", "decoys"]
images: []  # Leave empty for now, add later if available
---

## Overview
[1-2 sentences describing what this place is and why someone would go]

**Best Time to Visit:** Spring (April-May)
**Drive Time from Shop:** 15 minutes
**Expected Duration:** 4-6 hours
**Difficulty:** Moderate

## The Basics
[3-4 sentences of neutral facts Matt researched: location, access, what to do]

**What Matt Will Find:**
- Eastern Wild Turkey population
- Spring gobbler season (April 1 - May 31)
- 2,847-acre Wildlife Management Area
- Mix of oak forest and open meadow

## Local Tips (NEEDS KIM EDITS)
[Placeholder section - Kim adds her knowledge here]

🔔 **[KIM: Can you add 2-3 sentences about:**
- **What makes this spot special to you?**
- **What should people know that's not in the guidebooks?**
- **What do most hunters get wrong here?**

*Example: "I've hunted here since 1995. The birds roost along the ridges on the north side. Most people don't realize if you overcall, they spook. The key is sitting quiet."*

**]**

## Gear Checklist
- Turkey vest (vest or safety orange for visibility)
- Box call or slate call
- Decoys (optional but helpful)
- Shotgun (12 or 20 gauge)
- Class Q hunting license (we can help Matt get it at the shop)
- Binoculars

## Parking & Access
[Neutral facts from Matt's research: Where to park, permits needed, etc.]

## Regulations
[Copy from WVDNR website]
- Hunting allowed: April 1 - May 31 (spring season)
- Bag limit: 1 bearded bird per day
- Class Q license required

## Stop By Before Matt Heads Out
We've got everything Matt needs:
- Turkey vests and calls
- Hunting licenses (we handle the paperwork)
- Local tips from Kim on what's been working this week

📍 15 minutes from Elk River (I-79 Exit 57)

---

## Step 2: The Messenger Review Template (What Matt Sends Kim)

**On Facebook Messenger, Matt pastes this for EVERY adventure:**

```

Hi Kim! New adventure draft ready for review:

🎯 DESTINATION: [Name]
📍 TYPE: [hunting/fishing/hiking]
⏱️ LOCATION: [Where it is]

I've written a draft with basic facts from research.
Can you please answer these questions so I can add your local knowledge?

1️⃣ WHAT MAKES THIS SPOT SPECIAL TO YOU?
(Even just 1-2 sentences. Why do you like it? What's the draw?)

Example: "I've hunted here since 1990. The birds are thick in spring."

2️⃣ WHAT DO PEOPLE GET WRONG?
(What mistakes do you see visitors make?)

Example: "They overcall. If you quiet down, birds come closer."

3️⃣ GEAR/TIMING TIPS
(Anything critical they should know?)

Example: "Parking fills by 9am. Go early."

4️⃣ ACCURACY CHECK
(Read through the draft — does it sound right? Any corrections?)

Draft link: [URL or paste draft text here]

---

⏰ NO RUSH - Whenever you have time to read through and respond,
just type out answers to these questions. I'll do the rest.

Thanks!

```

**Why this template works:**
- ✅ Very specific questions (not vague)
- ✅ Short answers OK (not essays needed)
- ✅ Kim can answer while doing other things
- ✅ Matt gets structured data to plug in

---

## Step 3: Matt's Research Workflow (The Heavy Lifting)

**For each destination, Matt does this (takes ~2–3 hours):**

### Phase 1: Gather Data (45 minutes)
1. **Google Maps**
   - Search destination name
   - Get coordinates (copy lat/lng)
   - Screenshot parking area if visible
   - Note drive time from shop address (121 WV-82, Birch River)

2. **WVDNR Website** (wvdnr.gov)
   - Find WMA/state park page
   - Copy regulations, seasons, bag limits
   - Note any permits required

3. **AllTrails / Local Hiking Sites**
   - If it's a hiking/outdoor spot, check reviews for:
     - Typical visit duration
     - Difficulty reality
     - Crowd levels
   - Screenshot 1-2 key comments

4. **Google Search**
   - "Elk River WMA turkey hunting"
   - "Best time to visit [spot]"
   - Scan 3-5 results for practical tips
   - Note any seasonal closures

### Phase 2: Write Neutral Draft (90 minutes)
1. **Create the markdown file** (copy template above)
2. **Fill in the sections:**
   - Title, slug, location, coordinates, season, difficulty
   - Overview (what is this?)
   - The Basics (facts from Matt's research)
   - Gear Checklist (what does Matt need?)
   - Parking & Access (neutral facts)
   - Regulations (from WVDNR)
3. **Leave "Local Tips" section empty** — this is where Kim goes
4. **Keep conversational tone**, but don't fake local knowledge

### Phase 3: Create Messenger Prompt (15 minutes)
- Copy the template above
- Paste draft text or link
- Send to Kim

**Total Matt time per adventure: ~2–2.5 hours**
**Kim time per adventure: ~10–15 minutes** (spread across multiple adventures)

---

## Step 4: Integration Workflow (What Matt Does After Kim Responds)

**After Kim replies with answers, on Matt's end:**

1. **Copy her answers into the "Local Tips" section** of the markdown
2. **Add context headers** ("From Kim" or "Local Tips")
3. **Run elevation script** (automated via Google Maps API)
4. **Add internal links** (to shop products that match gear list)
5. **Commit to Git**
6. **Site auto-builds** (Cloudflare Pages)

**Time: ~30 minutes per adventure** (once all Kim feedback is in)

---

## Batch Schedule (Realistic for Matt's Constraints)

Instead of thinking "1 adventure per week," think **"batch of 5 every 2-3 weeks":**

### Batch 1: Dec 24 - Jan 7 (Week 1-2)
- **Matt's work (20 hours total):**
  - Research + draft 10 destinations
  - Send all 10 to Kim in **ONE Messenger conversation**
- **Kim's work (1 hour total):**
  - Review 10 when she has time
  - Answer same 4 questions for each
- **Matt's integration (3 hours):**
  - Merge her feedback into all 10
  - Commit to Git

**Result:** 10 adventures live by Jan 7 ✅

### Batch 2: Jan 8 - Jan 21 (Week 3-4)
- **Matt's work (18 hours):**
  - Research + draft 9 more destinations
  - Send batch to Kim
- **Kim's work (1 hour):**
  - Review batch, answer questions
- **Matt's integration (2.5 hours):**
  - Merge feedback

**Result:** 19 adventures live by Jan 21 ✅

### Batch 3: Jan 22 - Feb 4 (Week 5-6)
- **Matt's work (18 hours):**
  - Research + draft 7 more
  - Send batch
- **Kim's work (45 min):**
  - Review, answer questions
- **Matt's integration (2 hours):**
  - Merge feedback

**Result:** 26 adventures live by Feb 4 ✅

### Batch 4: Feb 5 - Feb 11 (Week 7)
- **Polish + testing**
- **Kim final review** of all 26

**Result:** Launch-ready by Feb 11 ✅

---

## Why This Works Better Than Interviews

| Aspect | Live Interview | Async Pass System |
|--------|----------------|-------------------|
| **Distance burden** | 5-hour drive needed | No drive needed |
| **Kim's time** | Scheduled, fixed, blocking | Whenever she wants (1-2 hours total) |
| **Flexibility** | Both must be available same time | Kim responds when convenient |
| **Quality** | Stories ramble, hard to extract | Structured questions = focused answers |
| **Scalability** | 5-7 per interview = slow | Batch 10 at a time = faster |
| **Revision** | Have to re-interview if wrong | Easy to ask follow-up via Messenger |

---

## Tools Matt Will Actually Use

### Research Tools
- **Google Maps** (free) — coordinates, drive time
- **WVDNR.gov** (free) — regulations, seasons
- **AllTrails** (free tier) — hiking/outdoor reviews
- **Google Search** (free) — local tips, seasonal info

### Writing Tools
- **VS Code** (free) — edit markdown files
- **Git** (free) — version control
- **Facebook Messenger** (free) — communication with Kim

### Automation
- **Google Maps Elevation API** (free tier: 2,500/day) — auto-fill elevation
- **Cloudflare Pages** (Matt's current $20-25/month) — auto-deploy

**Total new cost: $0**

---

## What a Completed Adventure Looks Like (Example)

```markdown
---
title: "Elk River WMA: Spring Gobbler Hunting"
slug: "elk-river-wma-spring-gobbler"
category: "hunting"
season: ["spring"]
difficulty: "moderate"
location: "Braxton County, WV"
coordinates:
  lat: 38.5234
  lng: -80.8456
elevation_gain: 850  # AUTO-FILLED by script
suitability: ["turkey-hunting", "beginner-to-advanced"]
gear: ["turkey-vest", "box-call", "shotgun", "hunting-license"]
---

## Overview
Elk River WMA is a 2,847-acre hunting area in Braxton County, 
perfect for spring turkey hunting. It's 15 minutes from the shop, 
and we've got all the gear Matt needs.

**Best Time:** April-May (Spring Gobbler Season)
**Drive Time from Shop:** 15 min
**Duration:** 4-6 hours
**Difficulty:** Moderate

## The Basics
Elk River WMA features mixed hardwood forests and open meadows. 
The area is home to a healthy Eastern Wild Turkey population. 
Spring season runs April 1 - May 31, with a 1-bird daily bag limit.

## Local Tips from Kim
I've hunted here since 1995, and it's one of my favorite spots in spring. 
The birds roost along the ridges on the north side — you'll hear them 
gobbling at first light. Here's what most people get wrong: they overcall. 
The key is sitting quiet and letting them come to you. If you call too much, 
they spook and move to the next ridge. 

Parking fills up fast on weekends — get there by 7 AM if Matt can. 
And don't bother with decoys here unless Matt is advanced. Just calls and patience.

## Gear Checklist
- Turkey vest or safety orange
- Box call or slate call
- Shotgun (12 or 20 gauge)
- Binoculars
- Class Q hunting license (we can help at the shop)

## Parking & Access
Park at the main lot on WV-19, north of Sutton. Vault toilets available. 
No day-use fee.

## Regulations
- **Season:** April 1 - May 31
- **Bag Limit:** 1 bearded bird per day
- **License Required:** Class Q (Resident Hunting License)
- **Hunting Hours:** 30 min before sunrise to noon

## Stop By Before Matt Heads Out
Grab a turkey vest, box call, and Matt's Class Q license at the shop. 
Kim can give Matt up-to-the-week tips on where the birds are hitting. 
We're 15 minutes away at Exit 57 on I-79.
```

---

## Weekly Commitment (Realistic)

**Matt:**

- Week 1-2: 20 hours (research + write 10)
- Week 3-4: 18 hours (research + write 9)
- Week 5-6: 18 hours (research + write 7)
- Week 7: 10 hours (polish + testing)
- **Total: 66 hours over 7 weeks = ~10 hours/week**

**Kim:**

- Week 1-2: 1 hour (review 10 via Messenger)
- Week 3-4: 1 hour (review 9)
- Week 5-6: 45 min (review 7)
- Week 7: 1 hour (final polish review)
- **Total: ~4 hours over 7 weeks**

---

## Risk Mitigation (Realistic)

### Risk: Kim Never Responds to Messenger

**Mitigation:** Matt sends Messenger prompt, gives 5-7 day window. If no response, publish with "Local tips coming soon" placeholder.
**Backup:** Matt can always add Kim's voice later with a simple update.

### Risk: Matt Gets Stuck on Research

**Mitigation:** Matt sets a timer. 45 min research max per destination, then move on. 90% research beats 0% published.
**Backup:** Skip detailed elevation/regulations if needed. Core content (what/where/when) is enough for v1.

### Risk: WVDNR Website Down or Out of Date

**Mitigation:** Cross-reference with AllTrails, state park websites, and local blogs.
**Backup:** Use last year's regulations if current unavailable (seasonality rarely changes).

### Risk: Matt Burns Out Writing 26 Destinations in 6 Weeks

**Mitigation:** Batch write (do 5 in one day, take 2 days off). Matt is not writing novel prose — formulaic, structured content is faster.
**Backup:** If pace is killing Matt, extend to 8 weeks (7 batches instead of 4). Launch is Feb 28, not a hard deadline.

---

## Quality Checkpoints

**Before sending to Kim:**

- [ ] Title and slug are descriptive (searchable)
- [ ] Coordinates are accurate (test on Google Maps)
- [ ] Regulations are current (checked WVDNR)
- [ ] Basic facts are correct (Matt verified them)
- [ ] Gear list makes sense for the activity
- [ ] Tone is clear, not marketing-y

**After Kim responds:**

- [ ] Her edits are integrated (don't edit her voice)
- [ ] Local Tips section now has her perspective
- [ ] Internal links added (to relevant shop products)
- [ ] SEO title tag is keyword-targeted
- [ ] Meta description is compelling

---

## Matt's Next Action (Right Now)

1. **Copy the Markdown template** (above) into a file: `elk-river-wma.md`
2. **Spend 2 hours researching** Elk River WMA
3. **Fill in all sections except "Local Tips"**
4. **Copy the Messenger template** (above) and paste into Facebook Messenger
5. **Send to Kim with the draft**
6. **Move on to next destination**

By the time Kim responds, Matt has already started destination #2.

This is how Matt ships 26 adventures in 6 weeks without burning out.

---

## The Mindset Shift

**Old way:** "I need to interview Kim for every adventure" → Slow, requires coordination
**New way:** "Matt researches + drafts, Kim adds truth-check + voice" → Fast, async, scalable

Matt is the **engine**. Kim is the **quality filter**. Not the other way around.
