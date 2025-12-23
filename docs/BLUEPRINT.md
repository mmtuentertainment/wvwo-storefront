# WV Wild Outdoors LLC – Complete Digital Footprint Blueprint

**A Stealth Build Gift for Growing a Family Business**

**Version 2.0 (Pivot Edition)** | Built with love for Kim & Bryan | Birch River, WV | December 2025

---

## EXECUTIVE SUMMARY

You're building the **Mountain State Adventure Destination Hub**—an integrated digital ecosystem that does FOUR things simultaneously:

1. **Honors their business** – The **Physical Retail Store** is the core foundation. This digital strategy serves to drive neighbors and US-19 travelers to the shop in Birch River.
2. **Solves their problem** – Kim can update products and adventure knowledge from her phone; you handle the technical architecture.
3. **Pivots for the Future** – Shifting the *online focus* from e-commerce to a professional **Destination Hub** that serves as a multi-modal income stream for Matt while funneling massive traffic and "eyes" to the physical storefront.
4. **Validates Economics** – Research proves shipping costs ($488-768 per kayak) make online fulfillment impossible for heavy items (erases 2-4.3% net margins). Content-first strategy mirrors Huckberry ($158M revenue) webrooming model: 74% research online, buy in-store. BOPIS drives 85% additional purchase rate.

**Your role after launch:** You manage all systems. Kim only:

- Updates the "Bait & Bullet" line for store status.
- Manages the product showroom via simple JSON/forms.
- Coordinates with Matt on new "Adventure Guides" for local spots.
- Reviews monthly newsletter draft.

**Timeline:** COMPLETED base site (Dec 2025). NOW: Phase 3 adventure content buildout (4-6 weeks for 66 destination specs)

---

## PHASE 0: PRE-BUILD CONTEXT GATHERING (Week 1)

### What You Need From Kim (Stealth Messenger Conversations)

**Goal:** Gather intel naturally, don't tip off the surprise.

**Conversation 1: Store Opening**

```
"Hey! Quick question for a research project — 
what year did WV Wild start, and what was 
the first product you remember selling?"

Goal: Exact founding date, memorable first sale, 
brand story details
```

**Conversation 2: Flood & Resilience**

```
"I was researching Braxton County history and 
saw there was a major flood in 2016. Did that 
affect any local businesses you knew about?"

Goal: Specific details about what happened, 
how they recovered, community support, current 
inventory value/location, FEMA outcome
```

**Conversation 3: Current Products & Suppliers**

```
"What brands do you guys stock that locals 
really trust? Like, what do hunters come 
asking for by name?"

Goal: Danner/LaCrosse/Muck boot models, 
Vortex scope availability, ammunition 
selection, fishing gear brands, accessories
```

**Conversation 4: Customer Personas**

```
"I'm curious — on a typical Saturday, who walks 
in? Locals, travelers, both? What are they 
usually buying?"

Goal: Customer mix, peak times, purchase patterns, 
what drives repeat visits (used guns? licenses?)
```

**Conversation 5: Store Logistics**

```
"What time do you guys open/close? Holiday hours? 
And for customers who call ahead — what are the 
most common questions?"

Goal: Operating hours (all seasons), holiday 
schedule, most common questions (to answer on FAQ)
```

**Conversation 6: Photos & Imagery**

```
"I'm putting together a family history thing — 
could you send me a few photos of the store 
interior and exterior? Any with you/Bryan 
in them? And a few shots of product shelves?"

Goal: 15-20 photos minimum, mix of empty store, 
products, people, exterior, counter
```

**Conversation 7: Story Elements**

```
(Later, after she's comfortable)
"I've been thinking about that flood you 
mentioned — how did the church/community show 
up for you? I want to write about resilience 
and I think your story matters."

Goal: Specific anecdotes (casserole delivery, 
helping hands, Bryan's determination, 
faith perspective)
```

**What NOT to ask directly:**

- ❌ "Can I see your financials?"
- ❌ "What's your exact inventory value?"
- ❌ "Can I see your website?" (drop breadcrumbs instead)

**What to gather from public sources:**

- Google their current Google Business Profile
- Screenshot their Facebook page (follower count, recent posts)
- Take a photo of their store exterior yourself
- Call the store and listen to voicemail/hours
- Visit WVDNR website for licensing requirements

---

## ⚠️ DEPRECATION NOTICE

**Phase 1-2 below describe the ORIGINAL architecture** (Docker, Directus, Ghost, PostgreSQL, Redis, Listmonk, Mixpost).

**Constitution v2.0.0 (2025-12-09) REMOVED these technologies.**

**Current architecture** (as of December 2025):
- Astro 5.x + Tailwind CSS 4.x (static site generation)
- Cloudflare Pages (hosting)
- Web3Forms (contact forms)
- Buttondown (newsletter)
- Content Collections (geographic/adventure content)
- React + shadcn/ui (interactive components)

**E-commerce status** (as of December 2025):
- PUBLIC_COMMERCE_ENABLED=false (SPEC-05 - disabled by feature flag)
- Product catalog browsable with "Call to Order" CTAs
- Cart/checkout UI hidden (preserved for future re-enablement)

**SKIP TO**: Phase 3 (line 908+) for current build plan and active specifications.

---

## SECTION 1: COMPLETE BUILD CHECKLIST (OBSOLETE - Historical Reference Only)

### PHASE 1: INFRASTRUCTURE & LOCAL SETUP (Weeks 1-2) - DEPRECATED

**All done locally on your machine; nothing touches production yet.**

#### 1.1 Local Development Environment

- [ ] Create `/wv-wild-outdoors` project directory
- [ ] Initialize Git repo: `git init`
- [ ] Create `.env.local` file (never commit):

  ```
  # Database
  DIRECTUS_DB_HOST=localhost
  DIRECTUS_DB_PORT=5432
  DIRECTUS_DB_USER=directus_dev
  DIRECTUS_DB_PASSWORD=[generate strong password]
  DIRECTUS_DB_NAME=wv_wild_dev
  
  # Directus
  DIRECTUS_KEY=[openssl rand -base64 32]
  DIRECTUS_SECRET=[openssl rand -base64 32]
  DIRECTUS_ADMIN_EMAIL=you@example.com
  DIRECTUS_ADMIN_PASSWORD=[temp password]
  
  # Ghost Blog
  GHOST_DB_HOST=localhost
  GHOST_DB_NAME=wv_wild_ghost_dev
  GHOST_DB_USER=ghost_dev
  GHOST_DB_PASSWORD=[generate strong password]
  
  # Listmonk
  LISTMONK_DB_HOST=localhost
  LISTMONK_DB_NAME=wv_wild_listmonk_dev
  LISTMONK_DB_USER=listmonk_dev
  LISTMONK_DB_PASSWORD=[generate strong password]
  
  # Mixpost
  MIXPOST_DB_HOST=localhost
  MIXPOST_DB_NAME=wv_wild_mixpost_dev
  MIXPOST_DB_USER=mixpost_dev
  MIXPOST_DB_PASSWORD=[generate strong password]
  
  # Domain (placeholder during build)
  DOMAIN=localhost:3000
  SITE_NAME=WV Wild Outdoors
  ```

- [ ] Create `docker-compose.yml` for local stack (Postgres, Redis, containers below)
- [ ] Spin up PostgreSQL 15 container with 3 databases (Directus, Ghost, Listmonk)
- [ ] Spin up Redis container for caching
- [ ] Test connectivity to all databases

#### 1.2 Directus Setup (Product Catalog Backend)

- [ ] Install Directus in Docker container
- [ ] Access <http://localhost:8055/admin>
- [ ] Create database collections:

  ```
  - Products
    - id (primary key)
    - name (text)
    - description (long text)
    - category (single select: firearms, ammo, boots, optics, gear, licenses)
    - price (decimal)
    - stock_quantity (integer)
    - status (published/draft)
    - images (many-to-many)
    - brand (text)
    - sku (text)
    - created_at (timestamp)
    - updated_at (timestamp)
  
  - Categories
    - id (primary key)
    - name (text)
    - slug (text)
  
  - ProductImages
    - id (primary key)
    - product_id (foreign key)
    - image (file upload)
    - alt_text (text)
    - display_order (integer)
  
  - Services
    - id (primary key)
    - name (text)
    - description (text)
    - status (published/draft)
  
  - FAQs
    - id (primary key)
    - question (text)
    - answer (long text)
    - category (single select)
    - order (integer)
  
  - Newsletter Subscribers
    - id (primary key)
    - email (email)
    - name (text)
    - interests (many-to-many to categories)
    - subscription_status (active/unsubscribed)
    - created_at (timestamp)
  
  - Reviews
    - id (primary key)
    - product_id (foreign key)
    - reviewer_name (text)
    - rating (single select: 1-5)
    - review_text (long text)
    - approved (boolean)
    - created_at (timestamp)
  
  - StoreInfo
    - id (primary key)
    - store_name (text)
    - address (text)
    - phone (text)
    - email (text)
    - hours_monday_friday (text)
    - hours_saturday (text)
    - hours_sunday (text)
    - holiday_hours (text)
    - story_content (markdown)
    - mission_statement (text)
  ```

- [ ] Set API permissions to PUBLIC for: Products, Categories, Services, FAQs, Reviews, StoreInfo
- [ ] Set API permissions to AUTHENTICATED for: Newsletter Subscribers
- [ ] Create Directus role "Editor" (can create/edit products, FAQs, StoreInfo; cannot touch users)
- [ ] Create demo Directus user (Kim's eventual account) with Editor role
- [ ] Test API endpoints locally: `http://localhost:8055/api/items/products`

#### 1.3 Ghost Blog Setup (Content Publishing)

- [ ] Install Ghost in Docker container (SQLite for local, will migrate to PostgreSQL for production)
- [ ] Access <http://localhost:2368/admin>
- [ ] Create Ghost staff account for Kim (Editor role)
- [ ] Configure blog:
  - [ ] Site title: "WV Wild Outdoors Blog"
  - [ ] Tagline: "Local hunting, fishing, and shooting knowledge from Braxton County"
  - [ ] Logo (placeholder until she provides)
  - [ ] Cover image (placeholder)
  
- [ ] Create blog categories:
  - [ ] Hunting (evergreen tips, season prep, local regs)
  - [ ] Fishing (gear reviews, spots, tips)
  - [ ] Gear (boot reviews, scope reviews, how-tos)
  - [ ] Licenses & Regulations (legal stuff, WV-specific)
  - [ ] Stories (local community, customer features, resilience)
  
- [ ] Create 2-3 placeholder posts in each category (see Content Seeding below)
- [ ] Enable RSS feed (will feed into newsletter)
- [ ] Install Zapier or IFTTT webhook to trigger Listmonk on new posts

#### 1.4 Astro Storefront Setup (Public Website)

- [ ] Create Astro project: `npm create astro@latest wv-wild-web`
- [ ] Install dependencies:

  ```
  npm install @astrojs/node @astrojs/image dotenv axios
  ```

- [ ] Create project structure:

  ```
  src/
  ├── components/
  │   ├── Header.astro
  │   ├── Footer.astro
  │   ├── ProductCard.astro
  │   ├── ProductGrid.astro
  │   ├── ServiceCard.astro
  │   ├── StatusBar.astro
  │   ├── FFL_Disclaimer.astro
  │   ├── CallToAction.astro
  │   └── SocialProof.astro
  ├── layouts/
  │   ├── BaseLayout.astro
  │   ├── ProductLayout.astro
  │   └── BlogLayout.astro
  ├── pages/
  │   ├── index.astro (homepage)
  │   ├── about.astro (story page)
  │   ├── products/index.astro (catalog)
  │   ├── products/[category].astro (category pages)
  │   ├── services.astro (FFL transfers, license agent)
  │   ├── faq.astro (FAQ)
  │   ├── contact.astro (contact form)
  │   ├── blog/index.astro (blog archive)
  │   ├── blog/[slug].astro (individual blog posts)
  │   └── privacy.astro
  ├── styles/
  │   ├── design-system.css (colors, typography, spacing)
  │   ├── components.css
  │   └── layout.css
  └── lib/
      ├── directus.ts (API client for Directus)
      └── ghost.ts (API client for Ghost)
  ```

- [ ] Configure Astro for Static Site Generation (SSG) + On-Demand ISR:

  ```
  // astro.config.mjs
  export default defineConfig({
    output: 'hybrid',  // Allows both static and server-rendered
    adapter: node({ mode: 'middleware' }),
  });
  ```

- [ ] Create design system CSS with your color variables:

  ```css
  :root {
    --color-forest-green: #2d5016;
    --color-rust-brown: #8b5a2b;
    --color-warm-orange: #d97635;
    --color-cream: #f5f5dc;
    --color-charcoal: #2c2c2c;
    
    --font-serif: 'Merriweather', serif;
    --font-sans: 'Open Sans', sans-serif;
    
    --spacing-xs: 0.5rem;
    --spacing-sm: 1rem;
    --spacing-md: 1.5rem;
    --spacing-lg: 2rem;
    --spacing-xl: 3rem;
  }
  ```

- [ ] Build core layouts (Header with status bar, Footer with legal)
- [ ] Test Directus API integration locally
- [ ] Build product catalog pages (list + detail)

#### 1.5 Listmonk Email Setup (Newsletter Engine)

- [ ] Install Listmonk in Docker container
- [ ] Access <http://localhost:9000>
- [ ] Create lists:
  - [ ] "Main Newsletter" (all subscribers)
  - [ ] "Hunters" (hunting content)
  - [ ] "Fishermen" (fishing content)
  - [ ] "Boot Buyers" (gear content)
  
- [ ] Create subscriber table in Directus to sync with Listmonk (via API)
- [ ] Configure template:

  ```
  Subject line: [Newsletter Title]
  
  Header: WV Wild Outdoors Newsletter
  Logo: [placeholder]
  
  Content sections:
  - Featured blog post of the month
  - Product spotlight (manually selected)
  - Local tip (hunting/fishing)
  - Call to action: "Visit us in Birch River"
  - Unsubscribe link
  ```

- [ ] Test email sending locally (Mailhog or similar for local SMTP)

#### 1.6 Mixpost Social Scheduler Setup

- [ ] Install Mixpost Lite in Docker container
- [ ] Access <http://localhost:8000>
- [ ] Connect Facebook page (will do in training session with Kim)
- [ ] Create content templates:

  ```
  - The Caliber Call: "This week: [product/topic]"
  - The Season Countdown: "[Weeks] until [season]"
  - The Tuesday Drop: "Just in: [inventory update]"
  - The Local Intel: "[Local fishing/hunting tip]"
  - The Customer Win: "[Success story]"
  ```

- [ ] Set up scheduling calendar
- [ ] Load placeholder posts (will replace with real content in training)

#### 1.7 Traefik Reverse Proxy (Local)

- [ ] Create Traefik config for local development
- [ ] Route subdomains:
  - [ ] `localhost:80` → Astro (public website)
  - [ ] `localhost:8055` → Directus admin
  - [ ] `localhost:2368` → Ghost admin
  - [ ] `localhost:9000` → Listmonk admin
  - [ ] `localhost:8000` → Mixpost admin

---

### PHASE 2: WEBSITE ARCHITECTURE & PAGES (Weeks 2-3)

#### 2.1 Homepage (`/index.astro`)

**Purpose:** Prove they're real, local, and trustworthy. 30-second impression.

**Content structure:**

```
1. STATUS BAR (sticky header)
   ├─ Phone: [CLICK TO CALL]
   ├─ Hours: "Open today 9am–5pm" (dynamic)
   └─ Button: "Get Directions"

2. HERO SECTION
   ├─ Background: Hero photo (store exterior or hunting scene)
   ├─ Headline: "Family Owned. Built to Last."
   ├─ Subheading: "Hunting, fishing, and gear for Braxton County"
   ├─ CTA Button: "Browse Products" OR "Visit Us"

3. TRUST SIGNALS ROW
   ├─ "Established 2008" + icon
   ├─ "WVDNR License Agent" + icon
   ├─ "Type 02 FFL" + icon
   ├─ "Authorized Vortex Dealer" + badge

4. "WE BUY GUNS" BANNER (Type 02 advantage)
   ├─ Headline: "We Buy Used Firearms"
   ├─ Subtext: "Fair prices. Fast turnaround."
   ├─ CTA: "Get a Quote"

5. FEATURED CATEGORIES (3-4 cards)
   ├─ Firearms
   │  └─ "Browse Rifles, Shotguns, Handguns"
   ├─ Ammunition
   │  └─ "In-stock ammo for Braxton County hunters"
   ├─ Boots & Gear
   │  └─ "Danner, LaCrosse, Muck, and more"
   └─ Optics
      └─ "Vortex Scopes & Rangefinders"

6. "BAIT & BULLET" TICKER (manual update line)
   ├─ Headline: "This Week's Stock Update"
   ├─ Content: "Danner Pronghorn boots back in stock. 
                Vortex Viper scopes in 4-12x44. 
                .308 Winchester $0.78/rd."

7. SERVICE HIGHLIGHTS (3 cards)
   ├─ FFL Transfers
   │  └─ "Transfer a firearm from out of state. $25 transfer fee."
   ├─ License Sales
   │  └─ "Buy hunting/fishing licenses right here. No wait."
   └─ Buy/Sell Guns
      └─ "Type 02 FFL. Fair prices. Call for quote."

8. BLOG SECTION (Latest 3 posts)
   ├─ Title: "Local Knowledge"
   ├─ Posts: [Blog post cards with featured image, excerpt, read more]

9. NEWSLETTER SIGNUP
   ├─ Headline: "Monthly Newsletter"
   ├─ Subtext: "Local hunting tips, stock updates, and seasonal deals"
   ├─ Input: Email + Interest checkboxes (Hunting/Fishing/Boots/General)
   ├─ Button: "Subscribe"

10. FOOTER
    ├─ Store info (hours, phone, address, directions)
    ├─ Quick links
    ├─ Social links
    └─ Legal (FFL disclaimer, privacy, terms)
```

**Design notes:**

- Hero image: Real store or local hunting scene (not stock photo)
- Color scheme: Forest green + rust brown + warm accents on cream background
- Typography: Merriweather for headings, Open Sans for body
- Responsive: Mobile-first (81% of rural visitors on phone)
- Accessibility: Alt text on all images, sufficient color contrast

#### 2.2 About/Story Page (`/about.astro`)

**Purpose:** Tell the resilience story. Build emotional connection.

**Structure (800–1,200 words):**

```
[HERO SECTION]
Hero Image: Photo of Kim & Bryan or store front
Headline: "Built by Hand. Built to Last."

[MAIN STORY (Narrative format, 2-3 sentence paragraphs)]

Section 1: Before the Flood (Present Day as Anchor)
- Open with: "On a Saturday morning in Birch River, 
  you'll find Kim and Bryan stocking shelves, 
  answering customer calls, and remembering 
  why they do this."
- Thread back: "It wasn't always this stable."
- Describe: Store opening in 2008, early years, 
  building a reputation, learning the business

Section 2: The 2016 Flood (Specific Details, Not Trauma)
- NOT: "We lost everything and were devastated"
- YES: "The water came up through the front door 
  and took most of the inventory on the lower shelves. 
  We stood in the parking lot watching mud swirl past 
  the windows. Bryan said, 'We'll rebuild this.'"
- Include: Community response (church casserole line, 
  volunteers, specific names if Kim shares)
- Include: Specific physical details (water line on wall, 
  salvaged items, decisions made)
- Limit to 3 paragraphs max (show resilience, don't dwell)

Section 3: Rebuild & Growth
- Include: Federal parks cleaning contracts, side work, 
  specific milestones (becoming debt-free, owning building outright)
- Include: Why they do it (love of community, serving hunters/fishermen, 
  pride in the work)
- Include: Bryan's role (nested within Kim's voice)

Section 4: Now (Present & Future)
- Return to Saturday morning
- Close with: Their vision for the next chapter, 
  what they want the store to represent
- Call to action: "Come by. We're here for you."

[PHOTO INTEGRATION]
- 2-3 photos integrated at natural breaks
  (store interior, Kim & Bryan together, product shelf, 
   community moment if available)
- All photos: Real, authentic, no stock images
- Captions: Simple, personal ("The rebuild, 2017" 
  or "Saturday morning, as usual")

[SIDEBAR OR CALLOUT]
"We're a Type 02 FFL and WVDNR License Agent 
serving Braxton County since 2008. Family owned. 
Always here."

[FOOTER CTA]
Button: "Browse Our Products"
Button: "Visit Us"
```

**Writing approach:**

- Voice: Kim's voice (captured through conversations)
- Structure: "We Were Already Here" — open with present, show depth
- Faith: Show through action, not declaration
  - Good: "The church ladies' casserole delivery schedule told us
    the community needed us here"
  - Not: "God blessed our business"
- Length: Exactly 900–1,100 words (readable in 5–7 minutes)
- Format: 2–3 sentence paragraphs with generous whitespace

#### 2.3 Products Page (`/products/index.astro`)

**Purpose:** Searchable catalog. Prove inventory. Drive engagement.

**Layout:**

```
[HERO]
Headline: "What We Stock"
Filters (left sidebar, sticky on mobile):
├─ Category (checkboxes)
├─ Price range (slider)
├─ Brand (Vortex, Danner, LaCrosse, Muck, etc.)
├─ Stock status (In Stock / Pre-order)

[PRODUCT GRID]
- 6 products per page (desktop), 3 (mobile)
- Each card:
  ├─ Product image (gallery on click)
  ├─ Name
  ├─ Brand
  ├─ Price
  ├─ Stock indicator (In Stock / Limited / Pre-order)
  ├─ Category badge
  ├─ "View Details" link
  └─ Star rating (if reviews exist)

[PAGINATION]
Prev / 1 2 3 4 / Next

[NO CART/CHECKOUT]
(This is a showroom + online inquiry, not e-commerce)
Detail pages have "Call for pricing" or "Email for availability"
```

**Technical:**

- Fetch from Directus API at build time
- Regenerate daily (or on-demand when inventory updates)
- Search via JavaScript (client-side filtering)
- No authentication required

#### 2.4 Product Detail Pages (`/products/[slug].astro`)

**Dynamic route generated from Directus product collection**

```
[IMAGES]
Gallery view (featured image + thumbnails)

[PRODUCT INFO]
├─ Name
├─ Brand
├─ SKU
├─ Price
├─ Category
├─ In stock? Yes / Quantity
├─ Description (rich text from Directus)

[SPECS TABLE]
(If applicable — caliber, barrel length, boot size, scope magnification)

[REVIEWS SECTION]
(Pull from Directus Reviews collection)
├─ Average rating (1-5 stars)
├─ Individual reviews (name, rating, text, date)
├─ "Submit a Review" form (local only, moderated by Kim)

[LEGAL DISCLAIMERS]
(Conditional based on product type)

IF FIREARM:
┌─────────────────────────────────────────────┐
│ FEDERAL FIREARMS DISCLAIMER                 │
│ This firearm can only be shipped to a       │
│ licensed Federal Firearms Licensee (FFL).   │
│ You will need to complete Form 4473 and     │
│ undergo a NICS background check. Call us    │
│ for details.                                │
│ Type 02 FFL Licensed Dealer                 │
│ License #: [from Directus]                  │
│ License Expiration: [from Directus]         │
└─────────────────────────────────────────────┘

IF HANDGUN:
"You must be 21+ to purchase. Valid ID required."

IF LONG GUN:
"You must be 18+ to purchase. Valid ID required."

IF AMMUNITION:
"You must be 18+ to purchase ammunition."

[CALL-TO-ACTION]
Button: "Call for Availability: [phone]"
Button: "Email Inquiry"
Text: "Not available online? We can order it for you."

[RELATED PRODUCTS]
(Same category, different items)

[BREADCRUMB]
Home > Products > [Category] > [Product Name]
```

#### 2.5 FFL Transfers Page (`/services/ffl-transfers.astro`)

**Purpose:** Explain why they should use your FFL. Clear pricing. Legal compliance.

```
[HERO]
Headline: "Transfer Firearms to WV Wild Outdoors"
Subheading: "Licensed Type 02 FFL. Fast turnaround."

[PROCESS STEPS]
├─ Step 1: Order online or find gun locally
├─ Step 2: Ship to us or arrange transfer
├─ Step 3: Complete Form 4473
├─ Step 4: NICS background check (~15 min)
├─ Step 5: Take home your firearm

[PRICING TABLE]
├─ Rifle transfer: $25
├─ Handgun transfer: $25
├─ Shotgun transfer: $25
└─ (Keep it simple)

[LEGAL REQUIREMENTS]
├─ You must be 18+ for rifles/shotguns, 21+ for handguns
├─ Valid photo ID required
├─ You must be legally allowed to own firearms 
│  (no felonies, domestic violence, etc.)
├─ WV residency required (unless licensed out-of-state dealer)
└─ Form 4473 is federal law (we handle it)

[FAQ]
Q: How long does a transfer take?
A: 15-20 minutes for the background check. 
   We hold the gun while we wait for approval (usually instant).

Q: Can you transfer from out-of-state retailers?
A: Yes, but the retailer must ship to an FFL 
   (that's us). Call for shipping instructions.

Q: What if my background check is delayed?
A: We'll call you. WV law allows a 3-day hold 
   while the check processes.

[CONTACT]
Button: "Call to arrange transfer: [phone]"
Text: "Questions? Ask when you call or email."

[FOOTER CTA]
"Also check out: We Buy Guns (link to buying page)"
```

#### 2.6 License Sales Page (`/services/licenses.astro`)

**Purpose:** Position them as convenient licensing agent. Drive foot traffic.

```
[HERO]
Headline: "Buy Your Hunting & Fishing License Here"
Subheading: "WVDNR Authorized License Agent"

[WHAT WE SELL]
├─ Hunting Licenses (resident, non-resident)
├─ Hunting Stamps (bonus endorsements)
├─ Fishing Licenses (resident, non-resident)
├─ Trout Stamps
└─ Special licenses (apprentice, senior, youth)

[WHY BUY HERE]
├─ No wait (buy while you shop)
├─ Our staff knows WV regs (we'll answer questions)
├─ Support local (stay in Braxton County)
└─ Buy gear while you're here (licenses = anchor transaction)

[HOW TO BUY]
└─ Come in or call, we process while you wait

[LINK TO STATE REQUIREMENTS]
"Need to know hunting season dates? 
→ Visit WVhunt.com (official state site)
Our staff can answer questions about WV regulations."

[LEGAL NOTE]
"We're an authorized WVDNR agent. All licenses 
sold comply with WV Department of Natural Resources 
regulations."

[FOOTER CTA]
Button: "Call to buy a license: [phone]"
```

#### 2.7 Blog Archive Page (`/blog/index.astro`)

```
[HERO]
Headline: "Local Knowledge"
Subheading: "Hunting, fishing, and gear tips from Braxton County"

[FEATURED POST]
(Latest blog post, full featured image + excerpt)

[CATEGORY FILTER]
Tabs: All / Hunting / Fishing / Gear / Licenses & Regs / Stories

[BLOG LIST]
Sorted by date (newest first), 10 per page

Each post card:
├─ Featured image
├─ Category badge
├─ Title (link to post)
├─ Excerpt (150 words)
├─ Author: "WV Wild Staff"
├─ Date
├─ Read time ("5 min read")
└─ "Read More" link

[SIDEBAR]
├─ Newsletter signup
├─ Recent posts (top 5)
├─ Popular categories
```

#### 2.8 FAQ Page (`/faq.astro`)

```
[HERO]
Headline: "Frequently Asked Questions"

[CATEGORIES (ACCORDION)]

CATEGORY: Firearms & FFL
├─ Q: Do you do FFL transfers?
├─ Q: What forms do I need to fill out?
├─ Q: Can I buy a handgun if I'm 18?
├─ Q: Do you offer financing?
└─ Q: How do I sell you a used gun?

CATEGORY: Licenses & Regulations
├─ Q: When does hunting season start?
├─ Q: Can I buy a license online from you?
├─ Q: What's the difference between resident 
│     and non-resident licenses?
└─ Q: Can I hunt on private land?

CATEGORY: Boots & Gear
├─ Q: Do you carry my boot size?
├─ Q: What's the difference between Danner 
│     and LaCrosse?
├─ Q: Can you special order?
└─ Q: Do you have a boot fitting service?

CATEGORY: Hours & Location
├─ Q: What are your hours?
├─ Q: Where are you located?
├─ Q: Do you ship?
└─ Q: Can I call with questions?

CATEGORY: About Us
├─ Q: How long have you been in business?
├─ Q: Are you locally owned?
└─ Q: Do you buy used firearms?

[NOTE AT BOTTOM]
"Don't see your answer? Call us: [phone]"
```

#### 2.9 Contact Page (`/contact.astro`)

```
[CONTACT FORM]
├─ Name (required)
├─ Email (required)
├─ Phone (optional)
├─ Subject (dropdown: Product inquiry / FFL transfer / 
            License question / General question)
├─ Message (required)
└─ Button: "Send"

(Form submits to Directus via API, stored in 
Contact Messages collection for Kim to review)

[STORE INFO]
├─ Hours (all seasons)
├─ Phone (clickable)
├─ Address (with Google Maps embed)
├─ Get Directions button

[SOCIAL LINKS]
├─ Facebook
└─ (Instagram/YouTube if they expand later)
```

#### 2.10 Privacy Policy & Terms (`/privacy.astro`, `/terms.astro`)

```
PRIVACY POLICY
├─ What data we collect
├─ How we use it
├─ Newsletter opt-out
├─ GDPR / CCPA compliance
└─ Contact for questions

TERMS OF SERVICE
├─ Firearm sales disclaimer
├─ Age verification
├─ 4473/NICS compliance
├─ Shipping disclaimers
├─ Limitation of liability
└─ Contact for disputes
```

---

### PHASE 3: MOUNTAIN STATE ADVENTURE DESTINATION (Weeks 4-6)

**The core pivot: Moving from a retail store to a geographic destination resource.**

#### 3.1 Adventure Content Collections (SPEC-06/12)

**Data Schema Setup**:

- [ ] Implement `src/content/adventures/` schema with frontmatter fields (name, type, slug, coordinates, amenities, activities, difficulty, season, distanceFromShop, regulations, safety)
- [ ] Create TypeScript interface for Adventure type
- [ ] Seed base data: Elk River WMA, Sutton Lake, Birch River, Canaan Valley, Cranberry Wilderness

**Content Blocks Standardization**:

- [ ] Hero block (image + headline + subhead + waypoint badge)
- [ ] Activity/Feature grid (categorized by season/type)
- [ ] Regulations & Safety (Kim's voice, WV-specific)
- [ ] Access & Logistics (drive time from shop, parking, nearest town)
- [ ] Local Knowledge (Kim's insights + "ask us" CTA)
- [ ] Gear recommendations (linked to product catalog)

**Destination Page Templates**:

- [ ] Collection setup for WMAs, Lakes, State Parks
- [ ] SEO/schema.org markup (TouristAttraction, Place)
- [ ] Waypoint badges ("X miles from WV Wild Outdoors")
- [ ] Mobile PWA/PageSpeed checks (90+ score)

**Build & Deploy**:

- [ ] Test SSG with 20+ adventure pages
- [ ] Verify image optimization (WebP, lazy load, srcsets)
- [ ] Schema.org validation (Google Rich Results Test)
- [ ] Cross-link verification (adventures ↔ products ↔ services)

#### 3.2 Product Showcase (SPEC-05)

- [ ] Preserve product catalog but disable e-commerce UI
- [ ] Implement "Call to Order" logic for all items
- [ ] Add FFL inquiry forms for firearms categories
- [ ] Maintain latent Stripe/Cart infrastructure (hidden by flag for future reactivation)

#### 3.3 Highway SEO & Launch Readiness

- [ ] Implement "near me" + waypoint SEO for US-19 travelers
  - [ ] "hunting near I-79 exit 57"
  - [ ] "fishing near Sutton WV"
  - [ ] "WMA near Braxton County"
- [ ] Verify mobile PageSpeed (90+) for rural connectivity
- [ ] Final voice audit (Kim's authentic WV tone across all adventure content)
- [ ] Local Business Schema updated with adventure links
- [ ] Google Business Profile integration (link to adventure pages from GBP posts)

---

### PHASE 4: CONTENT SEEDING & LEGACY CLEANUP (Week 7)

#### 4.1 Blog Posts (Ghost/Content Seeding)

**Create 12 placeholder posts (4 per main category):**

**HUNTING (4 posts):**


1. "The Best Boots for Deer Hunting"
   - Excerpt: "Worn-out boots can ruin a hunt. Here's why we stock Danner and LaCrosse, and how to pick the right pair for Braxton County terrain."
   - Tags: hunting, boots, gear

2. "Safety First: Firearm Handling 101"
   - Excerpt: "Before you head to the woods, know the rules. We break down the four rules of firearm safety every hunter should follow."
   - Tags: hunting, safety, firearms

3. "Local Hotspots: Where to Hunt in Braxton County"
   - Excerpt: "[PLACEHOLDER: Kim can add local knowledge here] — public land, private land partnerships, and spots for out-of-state visitors."
   - Tags: hunting, local, braxton-county

**FISHING (4 posts):**

1. "Spring Trout Season Starts April 1"
   - Excerpt: "Trout season is coming. Get your license, stock up on flies, and prepare for opening day on WV streams."
   - Tags: fishing, seasons, trout

2. "Bass Fishing Tips for Summer"
   - Excerpt: "Summer bass fishing in WV requires patience and the right gear. Here's what works in our local lakes."
   - Tags: fishing, bass, summer

3. "Choosing Your First Fishing Rod"
   - Excerpt: "Overwhelmed by rod choices? We walk through spinning rods, fly rods, and what to buy if you're just starting out."
   - Tags: fishing, gear, beginner

4. "Local Fishing Spots Worth Visiting"
   - Excerpt: "[PLACEHOLDER: Kim adds local knowledge] — streams, lakes, and secret spots accessible from Braxton County."
   - Tags: fishing, local, braxton-county

**GEAR REVIEWS (4 posts):**

1. "Danner Pronghorn vs. LaCrosse Alpha: Boot Showdown"
   - Excerpt: "Both are rugged hunting boots. We've worn both. Here's what we found after 100+ hours in the field."
   - Tags: boots, gear, review

2. "Vortex Viper Scopes: Why We Stock Them"
   - Excerpt: "Vortex scopes are a favorite in Braxton County. Here's what makes them worth the investment, from entry-level to premium."
   - Tags: optics, firearms, review

3. "The Perfect Hunting Backpack"
   - Excerpt: "You need hands free for your rifle. Here's what to look for in a hunting pack that doesn't compromise."
   - Tags: gear, hunting, accessories

4. "Ammunition Choices: Federal vs. Winchester"
   - Excerpt: "Both are reliable. Here's how to choose the right round for your hunt, based on your rifle and target."
   - Tags: ammunition, firearms, guide

**LICENSES & REGULATIONS:**
(These are less content marketing, more reference. Keep to 2-3 major posts.)

1. "WV Hunting License Guide 2024"
   - Excerpt: "All the license types, prices, and where to buy them. We sell licenses here, so stop by to pick one up."
   - Tags: licenses, regulations, wv

2. "Understanding Hunting Stamps & Endorsements"
   - Excerpt: "Bonus endorsements unlock more hunting opportunities. Here's what each one costs and what access it gives you."
   - Tags: licenses, regulations, wv

**STORIES (Community & Resilience):**
(These are updated by Kim or you after conversations. Placeholder draft here.)

1. "[PLACEHOLDER] From the Flood to the Future"
   - Excerpt: "[PLACEHOLDER: This will become a full blog post version of the About page story]"
   - Tags: stories, community, braxton-county

**All posts:**

- Status: "Draft" (not published yet)
- Author: Admin (you create them, Kim reviews)
- Featured image: Placeholder (real photos in training)
- CTA at end: "Questions? Call us: [phone]"

#### 3.3 FAQ Seeding (Directus)

**Create 15-20 FAQ entries across all categories (pre-filled, Kim can edit):**

```json
[
  {
    "question": "Do you do FFL transfers?",
    "answer": "Yes! We're a Type 02 FFL. Transfers are $25 and take 15-20 minutes.",
    "category": "firearms",
    "order": 1
  },
  {
    "question": "What time do you open?",
    "answer": "[PLACEHOLDER: confirm with Kim] — Mon-Fri 9am-5pm, Sat 8am-4pm, Sun closed",
    "category": "hours",
    "order": 1
  },
  ...
]
```

#### 3.4 Store Info (Directus StoreInfo Collection)

```json
{
  "store_name": "WV Wild Outdoors LLC",
  "address": "[Get exact address from Kim]",
  "phone": "[Get exact phone from Kim]",
  "email": "[Create business email, confirm with Kim]",
  "hours_monday_friday": "[From Kim]",
  "hours_saturday": "[From Kim]",
  "hours_sunday": "[From Kim]",
  "holiday_hours": "[Ask Kim about holidays]",
  "story_content": "[PLACEHOLDER: full about page markdown]",
  "mission_statement": "Family-owned shop serving Braxton County hunters, fishermen, and gear enthusiasts."
}
```

---

### PHASE 4: DEPLOYMENT INFRASTRUCTURE (Week 4)

#### 4.1 DigitalOcean VPS Setup

- [ ] Create 2GB VPS in us-east-1
- [ ] Configure SSH key access (no password)
- [ ] Set up UFW firewall:

  ```bash
  ufw allow 22/tcp  # SSH
  ufw allow 80/tcp  # HTTP
  ufw allow 443/tcp # HTTPS
  ufw enable
  ```

- [ ] Install base packages:

  ```bash
  apt update && apt upgrade -y
  apt install -y docker.io docker-compose curl git
  usermod -aG docker $(whoami)
  ```

- [ ] Add non-root deploy user:

  ```bash
  useradd -m -s /bin/bash deploy
  usermod -aG docker deploy
  ```

#### 4.2 Domain Setup (Cloudflare)

- [ ] Register domain: `wvwildoutdoors.com` (or similar)
- [ ] Point nameservers to Cloudflare
- [ ] Create DNS records:

  ```
  @ (root)          → A record → VPS IP
  www               → CNAME → @ (root)
  blog              → CNAME → @ (root)  [optional Ghost subdomain]
  admin             → CNAME → @ (root)  [optional Directus subdomain]
  ```

- [ ] Set SSL/TLS to "Full" (Traefik will handle certificate)
- [ ] Enable HTTP to HTTPS redirect at Cloudflare

#### 4.3 Traefik Reverse Proxy (Production)

Deploy Traefik in Docker to handle all traffic and SSL certificates:

```yaml
# traefik-docker-compose.yml
version: '3.8'

services:
  traefik:
    image: traefik:v2.10
    command:
      - "--api.insecure=false"
      - "--api.dashboard=true"
      - "--entrypoints.web.address=:80"
      - "--entrypoints.websecure.address=:443"
      - "--providers.docker=true"
      - "--providers.docker.exposedbydefault=false"
      - "--certificatesresolvers.letsencrypt.acme.httpchallenge=true"
      - "--certificatesresolvers.letsencrypt.acme.httpchallenge.entrypoint=web"
      - "--certificatesresolvers.letsencrypt.acme.email=you@example.com"
      - "--certificatesresolvers.letsencrypt.acme.storage=/letsencrypt/acme.json"
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - ./letsencrypt:/letsencrypt
    networks:
      - traefik-network

  # Directus
  directus:
    image: directus/directus:11.7.2
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.directus.rule=Host(`admin.wvwildoutdoors.com`)"
      - "traefik.http.routers.directus.entrypoints=websecure"
      - "traefik.http.routers.directus.tls.certresolver=letsencrypt"
      - "traefik.http.services.directus.loadbalancer.server.port=8055"
    # env vars...
    networks:
      - traefik-network

  # Ghost
  ghost:
    image: ghost:6-alpine
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.ghost.rule=Host(`blog.wvwildoutdoors.com`)"
      - "traefik.http.routers.ghost.entrypoints=websecure"
      - "traefik.http.routers.ghost.tls.certresolver=letsencrypt"
      - "traefik.http.services.ghost.loadbalancer.server.port=2368"
    # env vars...
    networks:
      - traefik-network

  # Listmonk
  listmonk:
    image: listmonk/listmonk:latest
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.listmonk.rule=Host(`email.wvwildoutdoors.com`)"
      - "traefik.http.routers.listmonk.entrypoints=websecure"
      - "traefik.http.routers.listmonk.tls.certresolver=letsencrypt"
      - "traefik.http.services.listmonk.loadbalancer.server.port=9000"
    # env vars...
    networks:
      - traefik-network

  # Astro Frontend
  astro:
    build: ./wv-wild-web  # Your Astro project
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.astro.rule=Host(`wvwildoutdoors.com`,`www.wvwildoutdoors.com`)"
      - "traefik.http.routers.astro.entrypoints=websecure"
      - "traefik.http.routers.astro.tls.certresolver=letsencrypt"
      - "traefik.http.services.astro.loadbalancer.server.port=3000"
    # env vars...
    networks:
      - traefik-network

  # Mixpost
  mixpost:
    image: mixpostapp/mixpost:latest
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.mixpost.rule=Host(`social.wvwildoutdoors.com`)"
      - "traefik.http.routers.mixpost.entrypoints=websecure"
      - "traefik.http.routers.mixpost.tls.certresolver=letsencrypt"
      - "traefik.http.services.mixpost.loadbalancer.server.port=8000"
    # env vars...
    networks:
      - traefik-network

networks:
  traefik-network:
    driver: bridge
```

#### 4.4 Database Migration

- [ ] PostgreSQL databases on production VPS
- [ ] Restore Directus schema from local backup
- [ ] Migrate Ghost from SQLite to PostgreSQL
- [ ] Migrate Listmonk database
- [ ] Migrate Mixpost database
- [ ] Verify all data integrity

#### 4.5 Email Configuration (Amazon SES)

- [ ] Set up Amazon SES account
- [ ] Verify sender domain: `noreply@wvwildoutdoors.com`
- [ ] Configure DKIM, SPF, DMARC records in Cloudflare
- [ ] Request production access (increase sending limits)
- [ ] Configure Listmonk to use SES SMTP
- [ ] Test email delivery (send to yourself)
- [ ] Set up bounce processing via SNS

#### 4.6 Backups to Backblaze B2

- [ ] Create Backblaze B2 account
- [ ] Create bucket: `wv-wild-outdoors-backups`
- [ ] Set up daily backup script:

  ```bash
  #!/bin/bash
  # Backup all databases + uploads to B2
  # Run daily via cron
  
  BACKUP_DATE=$(date +%Y-%m-%d)
  
  # Backup PostgreSQL
  docker exec wv-wild-db pg_dump \
    -U directus_user wv_wild_db | \
    gzip > /tmp/wv-wild-$BACKUP_DATE.sql.gz
  
  # Upload to B2
  b2 file upload \
    wv-wild-outdoors-backups \
    /tmp/wv-wild-$BACKUP_DATE.sql.gz \
    wv-wild-$BACKUP_DATE.sql.gz
  
  # Clean up local backups older than 7 days
  find /tmp -name "wv-wild-*.sql.gz" -mtime +7 -delete
  ```

- [ ] Test backup restoration

#### 4.7 CDN for Media (Backblaze B2 + Cloudflare)

- [ ] Configure B2 as origin for `/media/` requests
- [ ] Set Cloudflare to cache media files (long TTL)
- [ ] Configure Directus to upload files to B2 via S3 API

---

### PHASE 5: FINAL INTEGRATION & QA (Week 5)

#### 5.1 Astro + Directus Integration

- [ ] API client in Astro fetches products at build time
- [ ] Dynamic product pages generate correctly
- [ ] Images load from CDN
- [ ] Test all product filters
- [ ] Verify responsive design on mobile

#### 5.2 Astro + Ghost Integration

- [ ] Blog feed pulls from Ghost API
- [ ] Latest 3 blog posts appear on homepage
- [ ] Blog archive page works
- [ ] Categories filter correctly
- [ ] Author and date display correctly

#### 5.3 Newsletter Signup Integration

- [ ] Homepage email form submits to Directus
- [ ] Directus webhook triggers Listmonk
- [ ] Confirmation email sent
- [ ] Subscriber appears in Listmonk list
- [ ] Unsubscribe link works

#### 5.4 FFL Compliance

- [ ] Firearm product pages show disclaimer
- [ ] Age restrictions display correctly
- [ ] FFL license number visible in footer
- [ ] Terms of Service updated with firearm policies
- [ ] Privacy Policy addresses NICS compliance

#### 5.5 Mobile Responsiveness

- [ ] Test all pages on iPhone 12 (typical rural customer)
- [ ] Touch targets are 44x44px minimum
- [ ] Status bar works on mobile
- [ ] Forms are mobile-friendly
- [ ] Images scale correctly

#### 5.6 Performance Testing

- [ ] Lighthouse score: 85+
- [ ] Load time: <3s on 4G (rural broadband)
- [ ] Core Web Vitals: all green
- [ ] Test with <https://webpagetest.org>

#### 5.7 Security Audit

- [ ] HTTPS enforced
- [ ] CSP headers configured
- [ ] No sensitive data in frontend code
- [ ] API keys stored in env vars only
- [ ] Admin pages require authentication

#### 5.8 Accessibility Audit

- [ ] WCAG 2.1 AA compliant
- [ ] Color contrast: 4.5:1 minimum
- [ ] All images have alt text
- [ ] Form labels accessible
- [ ] Keyboard navigation works

#### 5.9 SEO Setup

- [ ] robots.txt and sitemap.xml generated
- [ ] Meta titles and descriptions on all pages
- [ ] Open Graph tags for social sharing
- [ ] Structured data (schema.org) for local business
- [ ] Google Search Console setup
- [ ] Bing Webmaster Tools setup

#### 5.10 Analytics Setup

- [ ] Umami (self-hosted) deployed
- [ ] Tracking code on all pages
- [ ] Goals configured: newsletter signup, product views, contact form
- [ ] Dashboard accessible to Kim (read-only)

---

## SECTION 2: CONTENT GATHERING PLAN

### Messenger Conversations (Stealth Intel)

**Timeline: Weeks 1-2 (during local build)**

**Conv 1: Business History**

```
You: "Hey! Quick question for a research 
project I'm working on — what year did 
WV Wild start, and what was one of the 
first customers you remember?"

Kim's Answer Will Give You:
- Founding year (for website)
- Early memory (for About page)
- First products carried
- Initial vision
```

**Conv 2: Survivor Story (Gentle Approach)**

```
You: "I was reading about Braxton County 
history and saw there was a major flood 
in 2016. Did that affect any local 
businesses you remember?"

Kim's Answer Will Give You:
- What happened to the store
- Specific damage details
- Community response
- Recovery timeline
- Current inventory location/security
```

**Conv 3: Current Product Mix**

```
You: "What brands do hunters in Braxton 
County ask for the most? Like boots, 
optics, anything people come in 
specifically looking for?"

Kim's Answer Will Give You:
- Top brands to feature
- Which products drive foot traffic
- Which are consistent sellers
- Seasonal shifts
```

**Conv 4: Customer Mix**

```
You: "I'm curious about your typical 
Saturday. Who usually comes in? Locals 
mostly, or do you get travelers too?"

Kim's Answer Will Give You:
- Day-of-week patterns
- Local vs. traveler split
- Repeat customer base
- Peak seasons
```

**Conv 5: Operations**

```
You: "What time do you guys open 
and close? Do your hours change 
for holidays? And what's the most 
common question people call with?"

Kim's Answer Will Give You:
- Operating hours (all seasons)
- Holiday schedule
- FAQ items
- Most common pain points
```

**Conv 6: Photos**

```
You: "Hey, I'm putting together a 
family history thing and would love 
a few photos of the store — inside, 
outside, maybe with you or Bryan? 
Also product shots if you have them."

Kim's Answer Will Give You:
- Hero image for website
- About page photos
- Product showcase images
- Team/people shots (for credibility)
- Behind-scenes photos
```

**Conv 7: Story Deep Dive (Later)**

```
You: "I've been reading about resilience 
in small businesses, and I think your 
story matters. Can you tell me about 
that flood recovery? Not the sad parts 
— the community part. How did people 
show up for you?"

Kim's Answer Will Give You:
- Specific anecdotes (casserole line, volunteer help)
- Names of people who helped (if Kim wants to mention)
- What Bryan said/did during recovery
- Timeline (6 months? 1 year?)
- How the community connection shaped them
- What this taught them about their place in Braxton County
```

**Conversation Tips:**

- Ask via Messenger (feels casual, Kim not in work mode)
- Space out questions (don't dump them all at once)
- Ask follow-ups ("And then what?" / "What was that like?")
- Record voice memos if Kim is willing (you transcribe later)
- Don't say "for your website" — say "for a project" (preserve surprise)

---

### What You Gather From Public/Direct Sources

**Week 1: Before You Ask Kim Anything**

- [ ] Call the store, listen to voicemail message (exact hours)
- [ ] Visit in person or via Google Street View (photos of exterior)
- [ ] Screenshot their current Facebook page (how many followers, what tone)
- [ ] Visit WVhunt.com and WVDNR site (regulations for FAQ)
- [ ] Search "Braxton County hunting" and "Braxton County fishing" (local knowledge)
- [ ] Look up gun shop websites (pattern research)
- [ ] Verify their FFL license number online (ATF database)
- [ ] Check Google Business Profile status (reviews? photos?)

**Week 2-3: As You Build**

- [ ] Research Vortex optics specs (for product pages)
- [ ] Research Danner boot models (for gear reviews)
- [ ] Look up ammunition pricing (for blog content)
- [ ] Check fishing regulations (for blog posts)
- [ ] Review WV hunting seasons (for blog content)

---

### What You Build Without Kim's Input

**Can build immediately (use placeholders):**

- ✅ Website structure and pages
- ✅ Blog template with placeholder posts
- ✅ Product catalog with sample products
- ✅ Design system and styling
- ✅ Contact forms and submissions
- ✅ Newsletter signup plumbing
- ✅ Social media scheduler (empty posts)
- ✅ FFL compliance boilerplate text
- ✅ FAQ template with common questions
- ✅ Legal pages (Privacy, Terms)

**Cannot build without Kim (needs placeholders, then update in training):**

- ❌ Real product photos
- ❌ Exact inventory (stock quantities, prices)
- ❌ Store hours (confirm exact times)
- ❌ About page story (needs her voice)
- ❌ Real testimonials (need customer permission)
- ❌ Email templates (need her tone/style)
- ❌ Facebook OAuth setup (needs her account)
- ❌ First blog posts (need her input on topics)

---

## SECTION 3: WEBSITE ARCHITECTURE (Technical Deep Dive)

### URL Structure & Routing

```
Root Domain: wvwildoutdoors.com

PUBLIC ROUTES (no auth)
├─ /                              → Homepage
├─ /about                          → Story/About page
├─ /products                       → Product listing
├─ /products/[category]            → Category-filtered products
├─ /products/[category]/[id]       → Product detail page
├─ /services
│  ├─ /services/ffl-transfers      → FFL transfer info + process
│  ├─ /services/licenses           → License sales info
│  └─ /services/buy-sell-guns      → Firearm buying/selling
├─ /blog                           → Blog archive
├─ /blog/[slug]                    → Individual blog post
├─ /faq                            → FAQ page
├─ /contact                        → Contact form
├─ /privacy                        → Privacy policy
├─ /terms                          → Terms of service
└─ /sitemap.xml                    → XML sitemap for SEO

ADMIN ROUTES (authentication required)
├─ admin.wvwildoutdoors.com        → Directus CMS (products, FAQs, store info)
├─ blog.wvwildoutdoors.com         → Ghost CMS (blog authoring)
├─ email.wvwildoutdoors.com        → Listmonk (newsletter management)
├─ social.wvwildoutdoors.com       → Mixpost (social media scheduling)
└─ api.wvwildoutdoors.com/api/     → REST API endpoints (for form submissions)
```

### API Endpoints (Directus)

```
GET  /api/items/products
     → Returns paginated list of products
     Filters: category, brand, price range, stock status
     Used by: Homepage product widget, category pages

GET  /api/items/products/[id]
     → Returns single product details
     Used by: Product detail pages

GET  /api/items/products?category=firearms&status=published
     → Returns products in specific category
     Used by: Category filter pages

POST /api/items/newsletter-subscribers
     → Subscribe to newsletter
     Body: { email, name, interests[] }
     Used by: Homepage signup form

GET  /api/items/faqs?category=[category]
     → Returns FAQs filtered by category
     Used by: FAQ page

GET  /api/items/store-info
     → Returns store hours, address, phone, story
     Used by: Status bar, footer, About page

POST /api/items/contact-messages
     → Submit contact form
     Body: { name, email, subject, message }
     Used by: Contact form page

GET  /api/items/services
     → Returns list of services
     Used by: Services pages
```

### Ghost API Integration

```
GET https://blog.wvwildoutdoors.com/ghost/api/v3/content/posts/
    ?key=[public_api_key]
    &include=authors,tags
    &fields=title,slug,excerpt,feature_image,published_at,
            authors,tags,html
    &limit=10

Response: Array of blog posts used by:
- Homepage: Latest 3 posts
- Blog archive: All posts, paginated
- Category filter: Posts with matching tag
```

### Directus Schema (Database Collections)

```sql
-- Products (for e-shop)
CREATE TABLE products (
  id UUID PRIMARY KEY,
  name VARCHAR NOT NULL,
  slug VARCHAR UNIQUE,
  description TEXT,
  category_id UUID REFERENCES categories(id),
  brand VARCHAR,
  sku VARCHAR,
  price DECIMAL(10,2),
  stock_quantity INT DEFAULT 0,
  images JSON [],  -- Array of image IDs
  status ENUM('published', 'draft'),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

-- Categories
CREATE TABLE categories (
  id UUID PRIMARY KEY,
  name VARCHAR NOT NULL,
  slug VARCHAR UNIQUE
);

-- FAQs
CREATE TABLE faqs (
  id UUID PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category VARCHAR,
  sort_order INT,
  status ENUM('published', 'draft')
);

-- Store Info (singleton-like collection)
CREATE TABLE store_info (
  id UUID PRIMARY KEY,
  store_name VARCHAR,
  address TEXT,
  phone VARCHAR,
  email VARCHAR,
  hours_monday_friday VARCHAR,
  hours_saturday VARCHAR,
  hours_sunday VARCHAR,
  holiday_hours TEXT,
  story_content TEXT (markdown),
  mission_statement TEXT,
  updated_at TIMESTAMP
);

-- Newsletter Subscribers
CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  name VARCHAR,
  interests JSON [],  -- Array: ["hunting", "fishing", "boots"]
  status ENUM('active', 'unsubscribed'),
  created_at TIMESTAMP,
  subscribed_via VARCHAR  -- 'homepage', 'checkout', etc.
);

-- Contact Messages
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY,
  name VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  subject VARCHAR NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  responded BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP
);

-- Reviews
CREATE TABLE reviews (
  id UUID PRIMARY KEY,
  product_id UUID REFERENCES products(id),
  reviewer_name VARCHAR NOT NULL,
  rating INT (1-5),
  review_text TEXT,
  approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP
);

-- Services (FFL, License sales, etc.)
CREATE TABLE services (
  id UUID PRIMARY KEY,
  name VARCHAR NOT NULL,
  description TEXT,
  price DECIMAL(10,2),
  status ENUM('published', 'draft')
);
```

### Astro Component Architecture

```
src/components/
├─ Layout/
│  ├─ Header.astro
│  │  └─ StatusBar (phone, hours, directions)
│  ├─ Footer.astro
│  │  └─ Legal info, contact, social
│  └─ BaseLayout.astro (wrapper for all pages)
│
├─ Product/
│  ├─ ProductCard.astro (grid item)
│  ├─ ProductGrid.astro (handles filtering)
│  ├─ ProductDetail.astro (full product page)
│  ├─ ProductGallery.astro (image carousel)
│  └─ FFL_Disclaimer.astro (conditional disclaimer)
│
├─ Blog/
│  ├─ BlogCard.astro (list item)
│  ├─ BlogGrid.astro (archive view)
│  └─ BlogPost.astro (single post)
│
├─ Forms/
│  ├─ Newsletter.astro (homepage signup)
│  ├─ Contact.astro (contact form)
│  └─ Review.astro (product review submission)
│
├─ CTA/
│  ├─ CallButton.astro (phone CTA)
│  ├─ EmailCTA.astro (inquiry button)
│  └─ DirectionsCTA.astro (map/directions)
│
└─ Utility/
   ├─ SocialProof.astro (trust badges)
   ├─ Newsletter.astro (hero section)
   └─ ErrorBoundary.astro (error handling)
```

### SEO Structure

```html
<!-- Every page gets: -->
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  
  <!-- Page-specific -->
  <title>{page_title}</title>
  <meta name="description" content="{page_description}">
  
  <!-- Open Graph (social sharing) -->
  <meta property="og:title" content="{page_title}">
  <meta property="og:description" content="{page_description}">
  <meta property="og:image" content="{featured_image}">
  <meta property="og:url" content="{current_url}">
  
  <!-- Local business schema -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "WV Wild Outdoors LLC",
    "url": "https://wvwildoutdoors.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "[ADDRESS]",
      "addressLocality": "Birch River",
      "addressRegion": "WV",
      "postalCode": "26610"
    },
    "telephone": "[PHONE]",
    "image": "[LOGO/HERO]",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "17:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "08:00",
        "closes": "16:00"
      }
    ]
  }
  </script>
</head>
```

---

## SECTION 4: KIM'S WORKFLOW (Keep It Simple)

### Kim's Tools & What She Actually Does

**Kim touches these systems ONLY:**

#### 1. Directus (Product & FAQ Management)

**Kim's dashboard:**

- Admin username: <kim@wvwildoutdoors.com>
- Login: admin.wvwildoutdoors.com
- Permissions: "Editor" role (can create/edit products; cannot delete users)

**What Kim does:**

**Task: Update Product Stock**

1. Log in to Directus
2. Click "Products" in left sidebar
3. Find product in list
4. Click product name
5. Change "Stock Quantity" number
6. Click "Save"
7. Done (site updates automatically within 1 hour)

**Task: Add New Product**

1. Click "Products" in left sidebar
2. Click blue "+" button (top right)
3. Fill in form:
   - Name: "Danner Pronghorn Boots Size 10"
   - Category: Select "Boots"
   - Brand: "Danner"
   - Price: "189.99"
   - Stock: "3"
   - Description: (can copy from Danner website or leave blank)
4. Click "Save"
5. Product appears on website automatically

**Task: Update Store Hours (Seasonal)**

1. Click "Store Info" in left sidebar
2. Find hours field
3. Update times (e.g., "Mon-Fri 9am-6pm winter, 9am-5pm summer")
4. Click "Save"

**Task: Update FAQ**

1. Click "FAQs" in left sidebar
2. Find question
3. Update answer
4. Click "Save"

**Task: Edit About Page Story**

1. Click "Store Info"
2. Scroll to "Story Content" field
3. Edit markdown (formatted text)
4. Click "Save"

**Kim's Directus Role Restrictions:**

- ✅ Can create/edit/delete products
- ✅ Can create/edit FAQs
- ✅ Can edit store hours, address, info
- ✅ Can edit About page story
- ❌ Cannot add/delete users
- ❌ Cannot delete account
- ❌ Cannot access raw database
- ❌ Cannot change permissions

#### 2. Ghost Blog (Publishing)

**Kim's dashboard:**

- Login: blog.wvwildoutdoors.com
- Credentials: you create in advance

**What Kim does:**

**Task: Write & Publish Blog Post**

1. Log in to Ghost
2. Click "Create Story" (green button, top left)
3. Write post:
   - Title: "Best Boots for Turkey Hunting Season"
   - Content: Write in editor (or paste from Word)
   - Add images: Click image button, upload from computer
   - Add featured image: Click "Featured image" button
   - Add tags: Select from dropdown (Hunting, Boots, Gear, etc.)
4. Click "Publish" (blue button, top right)
5. Post appears on blog immediately

**Task: Edit Existing Post**

1. Click "Stories" (left menu)
2. Find post in list
3. Click to open
4. Edit content
5. Click "Update"

**Task: Schedule Future Post**

1. Create post as above
2. Click "Publish" dropdown (not the button, the arrow next to it)
3. Select "Schedule for later"
4. Choose date/time
5. Post automatically publishes at that time

**Kim's Ghost Role:**

- ✅ Can write and publish posts
- ✅ Can edit own posts
- ✅ Can add images
- ✅ Can add tags
- ❌ Cannot edit other users' posts
- ❌ Cannot change settings
- ❌ Cannot delete account

#### 3. Facebook (Social Media Engagement)

**Kim's weekly workflow:**

**Monday (15 min prep):**

- Log into Facebook as page manager
- Check messages and comments
- Reply to customer questions
- Screenshot any questions for you to handle in social strategy

**Tuesday 6pm (post goes live):**

- You pre-schedule a post (via Mixpost, but Kim doesn't see that)
- Post appears on Kim's Facebook page
- Kim checks it, verifies it looks good
- (Mixpost is your tool, Kim just manages Facebook engagement)

**Saturday 9am (second post goes live):**

- Same as above

**Throughout week:**

- Kim checks comments and messages
- Kim forwards interesting customer questions to you
- (You might write a blog post or social answer based on Kim's intel)

**Kim does NOT manage Mixpost.** You set up the schedule, Kim just sees the posts appear.

#### 4. Email Newsletter (1x per month)

**Kim's workflow:**

**Step 1: (Week 1 of month) Provide Content**

- You send Kim a Google Doc with draft newsletter
- Newsletter has sections:
  - Feature: "This Month's Product Spotlight"
  - Blog: "Latest Blog Post"
  - Local Tip: "[Seasonal hunting/fishing tip]"
  - Call to Action: "Visit us"
- Kim reviews and suggests edits
- You finalize

**Step 2: (Week 2 of month) Preview & Approve**

- You show Kim the newsletter as it will appear
- Kim approves or suggests changes
- You make final edits

**Step 3: (Week 3 of month) Send**

- You send newsletter via Listmonk
- Kim watches for bounces/issues
- Subscribers receive newsletter

**Kim does NOT manage Listmonk directly.** You handle sending, Kim just provides content.

---

### Dashboard Kim Actually Sees (Simple)

You create a simple dashboard (Directus or separate app) with read-only access:

```
KIM'S DASHBOARD
[Simple view, no admin complexity]

📊 This Month's Stats
├─ Newsletter subscribers: 127 (↑3 from last month)
├─ Blog readers: 2,341 (↑18%)
├─ Facebook followers: 781
├─ Store visits from website: 89

📦 Inventory Reminders
├─ 🔴 Low stock: Danner size 10 boots (2 left)
├─ 🟡 Medium stock: .308 ammo (8 boxes)
├─ 🟢 Good: Vortex scopes (5 in stock)

📝 Recent Activity
├─ 3 newsletter signups this week
├─ 2 product reviews pending approval
├─ 12 contact form messages

💬 Latest Reviews
├─ ⭐⭐⭐⭐⭐ "Great boots! Worn them for 6 hunts." — Mike
├─ ⭐⭐⭐⭐ "Helpful staff, fair prices" — Sarah

🔄 What's Happening Behind the Scenes
├─ Website is backed up daily to B2
├─ Newsletter goes out 1st of month
├─ Social media posts every Tue/Sat
├─ You maintain everything (Kim doesn't touch this)
```

---

### What Kim NEVER Touches

```
❌ Server/VPS management
❌ Docker containers
❌ Database administration
❌ Email configuration (SMTP, SES)
❌ DNS settings
❌ SSL certificates
❌ Backups and recovery
❌ Code repositories
❌ Analytics configuration
❌ User management (adding other staff)
❌ Payment processing (none currently)
❌ Compliance audits
```

**Kim's mental model:**

- Directus = "Where I manage products and store info"
- Ghost = "Where I write blog posts"
- Facebook = "Where I chat with customers"
- Everything else = "You handle it, tell me if there's a problem"

---

## SECTION 5: YOUR MAINTENANCE WORKFLOW

### Daily Tasks (5 min)

```
✓ Monitor uptime (https://status.wvwildoutdoors.com)
✓ Check email alerting for errors
✓ Spot-check website (homepage loads quickly)
```

### Weekly Tasks (Monday morning, 30 min)

```
✓ Review contact form submissions in Directus
  → Follow up on product inquiries
  → Flag serious questions for Kim to call about
  
✓ Check analytics (Umami dashboard)
  → Are people viewing products?
  → Are newsletter signups working?
  
✓ Monitor email deliverability
  → Check bounce rates in Listmonk
  → Any SES issues?
  
✓ Review blog comments/reviews in Ghost
  → Approve new reviews
  → Flag spam
  
✓ Weekly backup verification
  → Test that Backblaze B2 has latest backup
```

### Monthly Tasks (1st of month, 1 hour)

```
✓ Send newsletter (after Kim approves)
  → Compose in Listmonk
  → Preview
  → Send to subscribers
  
✓ Update Google Business Profile
  → Add new photos
  → Respond to reviews
  → Update any changes to hours/services
  
✓ Review website analytics
  → Traffic trends
  → Top pages
  → Top referral sources
  → Create summary for Kim
  
✓ Check product prices/stock accuracy
  → Did Kim update Directus with latest stock?
  → Are prices current?
  
✓ Newsletter followup
  → Monitor open rates
  → Check bounces
  → Adjust subject line strategy if needed
```

### Seasonal Tasks (3x per year: Oct, March, June)

```
✓ OCTOBER (Pre-hunting season)
  → Batch-create hunting season blog posts
  → Update "Bait & Bullet" ticker with season specials
  → Schedule 3-4 social posts about season prep
  → Increase newsletter frequency to 2x/month
  
✓ MARCH (Spring fishing season)
  → Write fishing blog posts
  → Update product availability (trout season gear)
  → Schedule fishing-focused posts
  
✓ JUNE (Summer lull planning)
  → Plan blog topics for slower season
  → Prepare end-of-summer sale posts
  → Consider YouTube content or deeper blog content
```

### Quarterly Tasks (Jan/Apr/Jul/Oct, 2 hours)

```
✓ Security audit
  → Review user permissions
  → Check API logs for suspicious activity
  → Update passwords if needed
  
✓ SEO check
  → Google Search Console for crawl errors
  → Check ranking for target keywords
  → Identify content gaps
  
✓ Performance optimization
  → Lighthouse audit of homepage
  → Image optimization (sizes, compression)
  → Database cleanup (old data)
  
✓ Content calendar planning
  → Map out 12 blog topics for next quarter
  → Plan seasonal posts
  → Schedule batch creation day
  
✓ Team meeting with Kim
  → Review analytics
  → Discuss upcoming seasons/promotions
  → Gather new product/story ideas
```

### Annual Tasks (January, 4 hours)

```
✓ Full website audit
  → Links broken?
  → Content outdated?
  → Design refreshed?
  
✓ Compliance review
  → FFL license expires? (renew before)
  → Privacy Policy updated? (CCPA/GDPR check)
  → Terms of Service current?
  → NICS compliance still correct?
  
✓ Infrastructure review
  → Upgrade stack components (Docker images, OS)
  → Test disaster recovery (restore from backup)
  → Review costs (hosting, services, domains)
  → Plan budget for next year
  
✓ Content strategy refresh
  → What worked well? What didn't?
  → New blog topics for year?
  → New products to feature?
  → New social strategy?
```

---

### Seasonal Content Calendar (Example)

**JANUARY-MARCH (Winter/Spring)**

- Blog: "New Year Hunting Tips" "Ice Fishing Season" "Spring Turkey Prep"
- Social: Early season discounts, new stock arrivals, licensing reminders
- Newsletter: 1x/month (slow season)
- Facebook: 2x/week

**APRIL-JUNE (Spring Fishing)**

- Blog: "Trout Openers" "Bass Season Guide" "Summer Gear Reviews"
- Social: Fishing season content, license reminders, gear spotlights
- Newsletter: 1x/month
- Facebook: 2x/week

**JULY-SEPTEMBER (Summer Lull)**

- Blog: Deep dives, gear reviews, maintenance tips, local stories
- Social: Slow updates, mostly customer stories, boots/gear focus
- Newsletter: 1x/month (or skip if slow)
- Facebook: 1x/week (Kim is busier with other work)

**OCTOBER-DECEMBER (Peak Season)**

- Blog: "Buck Season 2024" "Gift Guides" "Black Friday Deals"
- Social: HEAVY posting (3-4x/week), season updates, in-stock alerts
- Newsletter: 2x/month (October-November)
- Facebook: 4x/week

---

## SECTION 6: THE REVEAL PLAN (5-Hour Training Visit)

### Timeline

```
Saturday 10am — Arrive in Birch River
             — Set up laptop at store
             — Verify internet connection

10:00am-10:30am  → REVEAL (show the website, React to feedback)
10:30am-12:30pm  → TOUR (explain how everything works)
12:30pm-1:30pm   → LUNCH (local diner, celebrate)
1:30pm-3:00pm    → HANDS-ON (Kim practices Directus + Ghost)
3:00pm-4:00pm    → SETUP (Facebook OAuth, email config)
4:00pm-5:00pm    → LAUNCH PREP (final checks, go-live)
```

### What to Bring

```
✓ Laptop (fully charged)
✓ Backup power bank
✓ Hotspot (backup internet)
✓ Printed cheat sheets (Directus, Ghost, Facebook)
✓ Backup USB with database/code
✓ Camera (document the reveal)
✓ Snacks (for energy)
```

### The Reveal (10:00am-10:30am)

**Strategy:** Show first, explain later. Let her see the store through her own eyes.

```
You: "Hey, I have something to show you. I've been working 
     on a surprise for the last few weeks."

(Open laptop, go to wvwildoutdoors.com)

[HOMEPAGE LOADS]

Kim's likely reaction: "Wait, that's our store!"

You: "Yeah. I built a website for WV Wild Outdoors. It's 
     not live yet — we need to do that together today — 
     but I wanted you to see it first."

[LET HER SCROLL THROUGH PAGES]

She'll notice:
- Store photos (real images from her store)
- Her story (from your Messenger conversations)
- Products (placeholder products, she'll fill in real ones)
- Blog section (empty but ready for her to write)
- Newsletter signup (she can collect emails finally)
- About page (the resilience story, told right)
- FFL compliance (all the legal stuff, done right)
- Her hours and phone number (immediately visible)

Kim will likely say:
"This is... you did this?"
"How long have you been working on this?"
"Is this going to be our actual website?"
"What do I have to do?"

Your response:
"I wanted to prove I could be valuable to the business.
Everything here — the design, the structure, the content — 
I built it to look like your store and sound like your voice.
You don't have to do much. I'm going to maintain all of it.
Today, I'm going to show you how to update products, write 
blog posts, and manage the newsletter. That's it.

Everything else — the technical stuff, the backups, the 
security, the analytics — that's my job. I'm claiming that 
as my role in the family business."
```

### Tour (10:30am-12:30pm)

**Format:** Walk through each section, show how it works, explain why.

**Page 1: Homepage**

```
"This is what someone sees when they type in 
your domain. We have:

1. Status bar (phone, hours, directions)
   → People on their phone, rural area, need to know 
     if you're open RIGHT NOW. This answers in 3 seconds.

2. Trust badges (Family Owned, FFL, etc.)
   → Hunters search for FFL dealers. Google shows 
     this. Tells them they're in the right place.

3. Featured categories
   → Links to your products. People coming to you 
     KNOWING what they want (boots, ammo, guns).

4. 'Bait & Bullet' ticker
   → This is your weekly inventory highlight. 
     Once a week, you tell me what's new 
     (Danner boots arrived, .308 in stock, etc.)
     and I update this ONE LINE. That's it.

5. Services (FFL transfers, licenses)
   → Explains why people should come to YOU 
     instead of ordering online.

6. Blog section
   → Shows you're active, you know local knowledge, 
     you're human (not a corporate page).

7. Newsletter signup
   → The goal. After a year of this, you have 
     email addresses. You own that list.

All of this updates automatically when you 
change things in the backend."
```

**Page 2: About Page**

```
"This is the story page. This is where you tell 
people who you are.

I wrote a draft from what you told me in our 
conversations. You're going to read this and 
probably want to edit it. That's fine.

The structure is:
- Open with: 'This is how we are now'
- Thread back: 'We got here because...'
- The flood (the hard part) but not too dark
- The community that showed up
- How you rebuilt
- Why you're here
- Close with: 'Come see us'

This is 1,000 words. It takes about 8 minutes 
to read. Someone visits this page because 
they want to know: Can I trust this business?

Your answer to that: We survived hard things, 
community cares about us, we're here to serve 
you too."
```

**Page 3: Products**

```
"This is your catalog. It pulls directly from 
the database you manage.

When you add a product to Directus (which I'll 
show you), it appears here automatically.

You can:
- Filter by category (firearms, ammo, boots, etc.)
- Filter by brand (Danner, Vortex, etc.)
- See pictures and prices
- Click to see details

On the detail page:
- Full description
- Reviews (if customers leave them)
- Price
- Stock status
- Call to action: 'Call for availability'

Why not add to cart? Because firearms have 
legal restrictions. This isn't an e-commerce site. 
It's a SHOWROOM. People browse here, then call you."
```

**Page 4: FFL Transfers**

```
"This page explains your FFL service.

It has:
- What is an FFL transfer
- The process (step by step)
- Your price ($25)
- Legal requirements (age, ID, background check)
- FAQ

Why? Because someone in California wants to 
buy a gun and ship it to you. They Google 
'FFL transfer WV' and find you.

This page explains exactly what happens next. 
No mystery. Legal compliance built in."
```

**Page 5: Blog**

```
"This is your content engine.

I've set up templates for posts you'll write. 
Eventually, you'll have 20-50 posts about:
- Local fishing spots
- Turkey hunting prep
- Boot reviews (Danner vs. LaCrosse)
- Gear guides
- Local regulations
- Stories about hunts, customers, community

Why does this matter?
- Google finds you (people search 'WV trout fishing')
- You show expertise (you know the area)
- People trust you more (real content beats ads)
- You own the relationship (email from blog readers)

You don't have to write all of it. But 1-2 posts 
per month, quarterly batches... over a year, 
you have a library. That's traffic. That's trust."
```

**Page 6: Legal/FFL Compliance**

```
"Firearms have special legal requirements.

Every firearm product page has:
- Age restriction (18+ for rifles, 21+ for handguns)
- Transfer disclaimer (ships to FFL only)
- Background check notification
- Your FFL license number visible
- 4473 form compliance

Privacy Policy covers:
- You collect emails (newsletter)
- You don't sell them
- Unsubscribe anytime

Terms of Service covers:
- Firearm sales policy
- Background check process
- State compliance

Why? Because you need to be legal and clear. 
No surprises for customers. No risk for you."
```

### Hands-On Training (1:30pm-3:00pm)

**Format:** Step-by-step, you do it first, she does it second.

**Exercise 1: Update Product Stock**

```
You: "Okay, let's say you just got in 5 new 
     pairs of Danner boots, size 10. 
     Change the stock number."

Steps:
1. "Go to admin.wvwildoutdoors.com"
2. "Click 'Products' on the left"
3. "Find 'Danner Pronghorn Boots Size 10'"
4. "Click it"
5. "Change stock from 3 to 8"
6. "Click Save (blue button)"
7. "Wait for green checkmark"
8. "Refresh the public website and watch the number 
    update in 30 seconds"

Kim does it next with you watching.
```

**Exercise 2: Write a Blog Post**

```
You: "Write a blog post about your best fishing tip."

Steps:
1. "Go to blog.wvwildoutdoors.com"
2. "Click 'Create Story' (green button, top left)"
3. "Title: 'My Best Trout Fishing Tip for Spring'"
4. "Write in the text area (or paste from Word)"
5. "Click 'Publish' (blue button)"
6. "Watch it appear on the website"

Kim writes a post with you guiding.
This is scary but important. She needs to feel 
like she CAN do this."
```

**Exercise 3: Update Store Hours**

```
You: "Holiday update — you're closed Dec 24-26. 
     Update store info."

Steps:
1. "Go to admin.wvwildoutdoors.com"
2. "Click 'Store Info'"
3. "Update 'Holiday Hours' field"
4. "Type: 'Closed Dec 24-26, Regular hours resume Dec 27'"
5. "Click Save"

Simple, visible win.
```

**Exercise 4: Add a Product**

```
You: "A new Vortex scope just came in. Add it."

Steps:
1. "Products"
2. Click "+"
3. Fill in:
   - Name: "Vortex Viper PST Gen II 4-12x44"
   - Category: "Optics"
   - Brand: "Vortex"
   - Price: "899.99"
   - Stock: "2"
   - Description: (optional, can add later)
4. Click "Save"
5. Goes live immediately

She watches it appear on the website.
```

### Setup (3:00pm-4:00pm)

**What you do TOGETHER (need her passwords/accounts):**

#### 1. Facebook OAuth Setup

```
You: "Let me connect your Facebook page to the 
     social scheduler."

Steps:
1. Go to Mixpost admin (social.wvwildoutdoors.com)
2. Click "Facebook" in integrations
3. Kim logs into her Facebook account (you watch)
4. Approves Mixpost access to WV Wild page
5. Done

Purpose: Now you can schedule posts for Tuesday 
6pm and Saturday 9am automatically. Kim sees 
them appear on her page (she doesn't manage Mixpost).
```

#### 2. Email Account Verification (Amazon SES)

```
You: "Let's verify that your email actually works 
     from the newsletter system."

Steps:
1. Go to Listmonk (email.wvwildoutdoors.com)
2. Send test email from noreply@wvwildoutdoors.com
3. Check email arrives (usually instant)
4. If it goes to spam, click "not spam"

Purpose: Confirms deliverability is working. 
Next newsletter will actually reach people."
```

#### 3. Google Business Profile Update

```
You: "Let's make sure your Google Business Profile 
     is current."

Steps:
1. Go to Google Business on her phone
2. Update hours
3. Add new photo
4. Make sure phone/address correct
5. Verify it shows on maps

Purpose: When someone searches 'gun shop near 
Birch River' or 'FFL dealer WV', they find YOU."
```

### Launch Prep (4:00pm-5:00pm)

**What happens when you go live:**

```
Today you're going to:
1. Point your domain to the production server
   (You do this, not her)
2. Verify SSL certificate works
3. Test all forms (newsletter, contact, reviews)
4. Check one more time on phone
5. Announce on Facebook that website is live

Plan:
- Post on Facebook: "Check out our new website! 
  wvwildoutdoors.com — browse products, read 
  the story, sign up for tips and updates."
- Kim approves post
- You post it
- It goes live

Timing: Aim for Tuesday evening or Wednesday morning 
(not Friday when you're not there to fix issues)
```

**Final Checklist Before Live:**

```
□ All pages load without errors
□ Forms submit successfully
□ Images load from CDN
□ SSL certificate shows (green lock)
□ Mobile view looks good
□ Newsletter signup works
□ Contact form works
□ Product pages show correctly
□ Blog appears
□ Analytics tracking works
□ Backups running
□ Email forwarding works
□ Google Business Profile current
□ Facebook post scheduled
□ Tell Kim: "You're live. Call me if anything breaks."
```

---

## SECTION 7: PLACEHOLDER STRATEGY

### What Gets Seeded as Demo Content

**Products (10-15 placeholder items):**

```
1. [PLACEHOLDER] Vortex Viper PST Gen II 4-12x44
   Category: Optics
   Brand: Vortex
   Price: [ASK KIM]
   Stock: [ASK KIM]
   Image: [PLACEHOLDER - gray box]
   Description: [PLACEHOLDER - pull from Vortex specs]
   Status: Draft (not visible to public until Kim confirms)

2. [PLACEHOLDER] Danner Pronghorn Boots
   (... similar structure ...)

[Pattern: Create skeleton for every major 
product type, but mark clearly as placeholders.
Kim fills in real prices, stock, photos.]
```

**Blog Posts (12 placeholder posts):**

```
Title: "[DRAFT] Deer Hunting Season 2024: 
         WV Regulations & Tips"

Status: Draft (not published)

Excerpt: "[PLACEHOLDER: Kim will write actual content. 
         This is just a template.]"

Content: 
"This blog post will cover:
- Buck season dates in WV
- License requirements
- Local hotspots
- Gear recommendations

[KIM: Replace this with real content]"

Category: Hunting
Date: Scheduled for Nov 1

[Pattern: Create structure + prompts, Kim fills in content]
```

**FAQs (Placeholder answers):**

```
Q: When does hunting season start?
A: [PLACEHOLDER: Kim knows the exact dates. 
   Replace with current year]

Q: Do you do FFL transfers?
A: Yes! We're a Type 02 FFL. 
   [PLACEHOLDER: Ask Kim about her pricing/process]
   Transfers are [PRICE] and take [TIME].
```

**Store Info (Directus StoreInfo collection):**

```
store_name: "WV Wild Outdoors LLC"
address: "[PLACEHOLDER - Get from Kim]"
phone: "[PLACEHOLDER - Get from Kim]"
hours_monday_friday: "[PLACEHOLDER - Get from Kim]"
```

**Newsletter Template (Listmonk):**

```
Subject: "[PLACEHOLDER - Monthly Newsletter Title]"

Content:
---
Featured Product: [PLACEHOLDER - Kim picks]
Latest Blog: [PLACEHOLDER - Auto-pull latest post]
Local Tip: [PLACEHOLDER - Kim writes seasonal tip]
---

[PATTERN: Template is set up, content is optional]
```

**Social Posts (Mixpost):**

```
Post 1 (Tuesday 6pm):
"This week: [PLACEHOLDER - Stock update]
 Danner boots back in stock in sizes 10-13.
 Premium comfort boots perfect for this season."

[KIM TO APPROVE before schedule]

Post 2 (Saturday 9am):
"Local Intel: [PLACEHOLDER - Seasonal tip]"
```

### How to Mark Placeholders

**In Directus:**

```
Name field: "[PLACEHOLDER] Product Name"
Description: "[PLACEHOLDER: Replace with real description. 
              Sources: Ask Kim / Check manufacturer website]"
Status field: "draft"  (← User must change to "published")
```

**In Ghost:**

```
Title: "[DRAFT] Blog Post Title"
Status: "Draft"
Content: "=== KIM: REPLACE THIS CONTENT ===
          This post should cover [TOPICS]
          Kim's notes: [PROMPTS FOR KIM]"
```

**In Astro (frontend):**

```
<!-- Placeholder image in homepage product widget -->
<img src="/placeholder.png" alt="Product image - 
                                 will be replaced by Kim">

<!-- Visible to you during build, invisible to public 
     (products marked "draft" don't show) -->
```

**Display Logic:**

- Directus products with status="draft" → NOT shown on public website
- Ghost posts with status="draft" → NOT shown on public blog
- Only public-facing items visible to customers
- Kim's behind-the-scenes work doesn't break anything

---

## SECTION 8: YOUR FIRST 30 DAYS POST-LAUNCH

### Week 1: Stabilization

**Daily (5 min each):**

- [ ] Monitor uptime dashboard
- [ ] Check error logs (none should exist)
- [ ] Spot-check homepage loads

**Mid-week (30 min):**

- [ ] Call Kim: "Any issues? Anything feels weird?"
- [ ] Monitor analytics for first traffic

**End of week (1 hour):**

- [ ] Review first newsletter signups
- [ ] Check contact form submissions
- [ ] Verify backups are running

**What to watch for:**

- Any crashes (unlikely if built well)
- Newsletter signup failures
- Slow page loads
- Mobile responsiveness issues

### Week 2: Content

**Monday (30 min):**

- [ ] Kim writes first real blog post
- [ ] You review and publish
- [ ] Monitor traffic to new post

**Wednesday (15 min):**

- [ ] Update "Bait & Bullet" ticker with this week's inventory
- [ ] Schedule social post

**Friday (30 min):**

- [ ] Review analytics
- [ ] Call Kim with numbers: "X people viewed products,
                          X newsletter signups, X blog readers"

**Goal:** Prove the website is working through data.

### Week 3: Optimization

**Monday (1 hour):**

- [ ] Run Google Search Console test
  - Submit sitemap
  - Check for crawl errors
  - Monitor indexing
  
**Wednesday (30 min):**

- [ ] Google Business Profile full audit
  - Update photos (add 5-10 new pictures)
  - Verify all info current
  - Check reviews
  
**Friday (45 min):**

- [ ] Lightho use audit
  - Check homepage performance
  - Identify any bottlenecks
  - Optimize images if needed

### Week 4: Handoff

**Monday (1 hour call with Kim):**

- [ ] Review 4-week analytics
- [ ] Show her dashboard
- [ ] Ask: "What's working? What's not?"
- [ ] Gather feedback for improvements

**Wednesday (30 min):**

- [ ] Document any bugs
- [ ] Make minor fixes
- [ ] Write maintenance guide for Kim

**Friday (1 hour):**

- [ ] Final checklist:
  - [ ] All systems stable
  - [ ] Kim comfortable with Directus
  - [ ] Blog publishing smooth
  - [ ] Newsletter signup working
  - [ ] Backups verified
  - [ ] Analytics accurate
  - [ ] Email forwarding working
  - [ ] Social media connected

**Your summary to Kim:**
"Website is live, stable, and working.
You've updated products, written a blog post,
and started collecting emails.
I'm managing the technical side.
You manage the store and content.
We're doing this together."

---

## SECTION 9: PLACEHOLDER CONTENT (ACTUAL TEXT)

### Homepage Hero Copy

```html
<h1>Family Owned. Built to Last.</h1>
<p>Hunting, fishing, and gear for Braxton County</p>
```

### FFL Disclaimer (Product Pages)

```html
<div class="ffl-disclaimer">
  <h3>Federal Firearms Disclaimer</h3>
  <p>
    This firearm can only be shipped to a licensed 
    Federal Firearms Licensee (FFL). 
    You will need to complete ATF Form 4473 and 
    undergo a NICS background check.
  </p>
  <p>
    <strong>Type 02 FFL Licensed Dealer</strong><br>
    License #: [FROM DIRECTUS]<br>
    Expiration: [FROM DIRECTUS]
  </p>
  <p><a href="/services/ffl-transfers">Learn more about FFL transfers</a></p>
</div>
```

### Contact Form (Placeholder)

```
Name: [Input field]
Email: [Input field]
Subject: [Dropdown]
  - Product inquiry
  - FFL transfer question
  - License question
  - General question
Message: [Text area]

[Submit Button]
```

### Newsletter Signup Email (Template)

```
Subject: Welcome to WV Wild Outdoors!

Body:
---

Hey [Name],

Thanks for signing up! 

You'll now get our monthly newsletter with:
- Local hunting & fishing tips
- Seasonal gear guides
- New product arrivals
- Community stories

We don't spam. One email per month, max.

Questions? Call us: [PHONE]

See you soon,
WV Wild Outdoors team

---

[Unsubscribe Link]
```

---

## FINAL CHECKLIST (Pre-Reveal)

### Code & Infrastructure

- [ ] Astro project builds without errors
- [ ] Directus running locally, collections created
- [ ] Ghost running locally, categories created
- [ ] Listmonk running, template set up
- [ ] Mixpost running, social connected (dummy account)
- [ ] Traefik routing correctly
- [ ] Docker Compose file complete and tested
- [ ] `.env` files created and secured
- [ ] `.gitignore` configured (no secrets in repo)
- [ ] Git repo initialized and initial commit

### Content

- [ ] 12 placeholder blog posts (draft, not published)
- [ ] 15 placeholder products (with categories)
- [ ] Store info collection complete (placeholder values)
- [ ] 15 FAQs seeded
- [ ] Newsletter template created
- [ ] Social media templates ready

### Website Pages

- [ ] Homepage: complete, responsive, all sections
- [ ] About page: story written (draft), ready for edits
- [ ] Products page: grid, filters working
- [ ] Product detail: FFL disclaimer, legal text
- [ ] FFL transfers page: process + pricing
- [ ] License sales page: info + link to state
- [ ] Blog archive: page structure ready
- [ ] FAQ page: structured, searchable
- [ ] Contact form: submits to Directus
- [ ] Privacy Policy: drafted, compliant
- [ ] Terms of Service: drafted, FFL-compliant
- [ ] Footer: legal, social, contact info

### Design

- [ ] Design system CSS complete (colors, fonts, spacing)
- [ ] All pages responsive (mobile-first)
- [ ] Typography: Merriweather + Open Sans
- [ ] Color scheme: Forest green, rust brown, warm orange, cream
- [ ] Placeholder images: store exterior, product, boots
- [ ] Logo: placeholder or ready to add

### Deployment Prep

- [ ] DigitalOcean VPS provisioned and ready
- [ ] Cloudflare domain registered and configured
- [ ] DNS records ready to update
- [ ] Traefik configuration for production
- [ ] PostgreSQL migrations ready
- [ ] SSL certificate automation via Let's Encrypt
- [ ] Email domain verified (SES)
- [ ] Backup script tested
- [ ] Monitoring/alerting configured

### Documentation

- [ ] README with project overview
- [ ] Kim's workflow guide (written, simple language)
- [ ] Technical architecture doc (for you, future reference)
- [ ] Cheat sheets printed for training
- [ ] Troubleshooting guide (common issues)
- [ ] Emergency procedures (what if something breaks?)

### Training Materials

- [ ] Laptop + charger
- [ ] Power bank (backup)
- [ ] Hotspot device
- [ ] Printed cheat sheets (Directus, Ghost, Facebook)
- [ ] Phone with camera (for photos of the visit)
- [ ] List of passwords (generated, secure)
- [ ] Backup USB with all code
- [ ] Snacks for the 5-hour session

---

## SUCCESS CRITERIA: How You'll Know This Worked

**The website launches and Kim says:**

- ✅ "I understand how to update products"
- ✅ "I can write blog posts"
- ✅ "This looks like our store"
- ✅ "I'm willing to try this"

**After 30 days, Kim has:**

- ✅ Updated product stock 3+ times independently
- ✅ Written at least one blog post
- ✅ Read her first newsletter results
- ✅ Checked a customer email from the website

**After 6 months, the business has:**

- ✅ 200+ newsletter subscribers
- ✅ 50+ blog visits per month (organic traffic)
- ✅ 5-10 product inquiries per month via contact form
- ✅ 2-3 FFL transfer inquiries per month
- ✅ Social media showing consistent activity
- ✅ Positive reviews from customers about website

**Your role is established:**

- ✅ Kim trusts you with the digital systems
- ✅ Bryan sees value in online presence
- ✅ You're claimed as "digital guy" in the family
- ✅ You're invited to family meetings about business
- ✅ Talk begins about "what's next?" for growth

---

## MAINTENANCE AFTER LAUNCH (Your Long-Term Role)

### What You Own Forever

```
✓ All technical infrastructure (servers, databases, backups)
✓ System maintenance and updates
✓ Security and compliance
✓ Performance optimization
✓ Disaster recovery
✓ Analytics and reporting
✓ Email deliverability
✓ SSL certificates
✓ DNS and domain
```

### What Kim Owns

```
✓ Product catalog (add/edit)
✓ Blog content (write/publish)
✓ Store information (hours, location)
✓ FAQ content
✓ Facebook engagement
✓ Newsletter content (monthly)
```

### Monthly Meeting Topics

```
✓ Analytics: Traffic, engagement, conversions
✓ Product updates: New inventory, prices changed
✓ Blog strategy: What's working, what to write next
✓ Customer feedback: Email/contact form trends
✓ Technical health: Any issues? Improvements?
✓ Goals: What's next? Expansion? New features?
```

---

## CONCLUSION: What You're Actually Doing

This isn't just building a website. You're:

1. **Proving your value** to Kim & Bryan
2. **Creating a sustainable system** they can operate
3. **Giving them agency** (not making them dependent on you)
4. **Earning a place** in the family business
5. **Building something real** that helps real people find them
6. **Creating credibility** for yourself as a builder

**The website is the proof. Your stewardship is the gift.**

When hunters in Braxton County search "FFL dealer near me" and find WV Wild Outdoors, and they click through and see:

- Real people (Kim & Bryan)
- Real story (the flood, the rebuild)
- Real products (what's in stock)
- Real local knowledge (blog posts about WV fishing)

...they trust them. They call. They visit. They buy.

That's the work.

---

**End of Blueprint**

**Next Steps:**

1. Week 1: Gather intel via Messenger (conversation 1-3)
2. Week 2-3: Local build (infrastructure, content seeding)
3. Week 4: Deployment prep (VPS, domain, backups)
4. Week 5: Final testing and launch day
5. Training visit: 5-hour reveal + hands-on training
6. Live: Go live Tuesday evening
7. Month 1-6: Stabilization + Kim ownership

You've got this. Build it with care. She'll smile.
