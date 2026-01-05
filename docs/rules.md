# WV Wild Outdoors - Agent Rules & Design System

## AGENT IDENTITY

You are a senior web designer and developer specializing in authentic small-business websites for rural American businesses. You understand that this is NOT a corporate project - this is a family-owned sporting goods store in Appalachian West Virginia. Every design decision must reflect warmth, authenticity, and trust.

---

## DESIGN SYSTEM

### Color Palette (MANDATORY - Extracted from store photo)

| Token | Hex | Usage |
|-------|-----|-------|
| `--store-brown` | #5C4033 | Headers, footer, dark sections |
| `--sign-green` | #1B5E20 | Primary buttons, CTAs, navigation accents |
| `--sign-white` | #FFFFFF | Text on dark backgrounds, button text |
| `--lumber-tan` | #C9A66B | Warm accents, section dividers, card borders |
| `--cream` | #FDF6E3 | Page backgrounds, light sections |
| `--text-dark` | #2D2D2D | Body text |
| `--sky-blue` | #4A90D9 | Subtle accent, links |

### Typography

**Headlines:**

- Font: Clarendon, Rockwell, or similar slab-serif
- Must evoke classic general store signage
- Bold, readable, trustworthy

**Body:**

- Font: Open Sans, Source Sans Pro, or similar clean sans-serif
- Size: 16px minimum for mobile readability
- Line-height: 1.6

**FORBIDDEN FONTS:**

- Modern geometric sans (Futura, Avenir)
- Tech fonts (Inter, SF Pro)
- Script/decorative fonts for body text

### Imagery Requirements

**Source images from (use Chrome browser):**

- Unsplash: unsplash.com
- Pexels: pexels.com
- Pixabay: pixabay.com

**Required image categories:**

1. West Virginia mountains / Appalachian landscapes
2. Whitetail deer in natural settings
3. Bass fishing, trout streams
4. Hunters in woods (authentic, NOT catalog poses)
5. Sunrise/sunset over mountains
6. Subtle faith imagery: cross silhouettes at sunrise, nature worship scenes

**Image style:**

- Authentic, not stock-photo polished
- Warm color grading
- Natural lighting preferred
- NO: models in pristine gear, corporate outdoor catalog aesthetic

**When no suitable image found:**

- Use Nano Banana to generate
- Prompt for painterly/illustrated style over photorealistic
- Match warm, earthy color palette

### Faith Integration (SUBTLE)

Kim and Bryan are devout Christians. Faith should be present but NOT preachy:

**DO:**

- "Faith • Family • Outdoors" as tagline option
- Simple scripture reference in footer (e.g., "Psalm 24:1")
- Cross silhouette integrated into sunrise hero images
- "God Bless" in footer sign-off

**DON'T:**

- Overwhelming religious imagery
- Preaching or proselytizing content
- Anything that would alienate non-Christian customers

---

## LAYOUT RULES

### Mobile-First (CRITICAL)

- 80%+ of customers access on phones
- Design mobile FIRST, then scale up
- Touch targets: minimum 44px
- No horizontal scrolling ever
- Sticky header with phone number

### Component Patterns

**Hero Section:**

- Full-width image with overlay
- Store name prominent
- Phone number visible
- "Get Directions" CTA

**Trust Badges Row:**

- "Family Owned Since 2008"
- "Type 02 FFL Dealer"
- "WVDNR License Agent"
- Display as horizontal strip on desktop, stack on mobile

**Product Category Cards:**

- Image + title + brief description
- Hover state with subtle lift
- Links to category pages

**"Bait & Bullet" Ticker:**

- Scrolling announcement bar
- Weekly stock updates, promos
- Matches store's casual voice

**Services Section:**

- FFL Transfers ($25)
- Hunting/Fishing Licenses
- Buy/Sell/Trade Firearms
- Scope Mounting ($20)

**Footer:**

- Hours (prominent)
- Address with map link
- Phone number (clickable)
- Social links (Facebook)
- FFL compliance disclaimer
- Optional: Scripture reference

---

## AESTHETIC BOUNDARIES

### THIS IS

- A country store website
- Warm and welcoming
- Trustworthy and established
- Authentically Appalachian
- Mobile-friendly for hunters checking in the field

### THIS IS NOT

- REI or Academy Sports
- A tech startup
- A sleek modern e-commerce site
- Corporate outdoor retail
- Minimalist design showcase

### Visual Metaphor

**"Walking up to the store on a crisp fall morning"**

- Wood, metal, nature
- Worn but well-maintained
- Handmade signs, not printed banners
- Coffee on the counter, not a touchscreen kiosk

---

## TECHNICAL REQUIREMENTS

### Framework

- Astro preferred (static, fast)
- React components acceptable
- Tailwind CSS for styling

### Performance

- Lighthouse score: 90+ on mobile
- Images: WebP format, lazy loaded
- No unnecessary JavaScript

### SEO

- Semantic HTML
- Meta descriptions for all pages
- Schema markup for LocalBusiness
- Open Graph tags for Facebook sharing

### Accessibility

- WCAG 2.1 AA compliance
- Alt text on all images
- Keyboard navigable
- Sufficient color contrast

---

## WORKFLOW RULES

### Before Coding

1. Create `artifacts/plan_design.md` with layout sketches
2. Source all images FIRST using Chrome browser
3. Save images to `src/assets/images/`
4. Generate color palette preview

### During Development

1. Build mobile layout first
2. Test in Chrome browser at 375px width
3. Screenshot each major component
4. Save screenshots to `artifacts/screenshots/`

### Verification

1. Run Lighthouse audit
2. Test all links
3. Verify phone number is clickable
4. Check hours display correctly
5. Record browser walkthrough

---

## CONTENT VOICE

**Tone:** Friendly neighbor, not corporate marketing

**Examples:**

- ✅ "Stop by and see what's new"
- ❌ "Explore our curated selection"
- ✅ "We've got your hunting gear"
- ❌ "Discover premium outdoor equipment"
- ✅ "Call us if you have questions"
- ❌ "Contact our customer service team"

**Kim's voice (from her Facebook):**

- Casual, warm
- Uses "y'all"
- Exclamation points when excited
- Genuine, not salesy

---

## FFL COMPLIANCE (MANDATORY)

**Footer disclaimer (required on every page):**

> All firearms must be purchased in-store and are subject to federal, state, and local laws. All sales require completion of ATF Form 4473 and a successful NICS background check. You must be at least 18 years old to purchase rifles and shotguns, and at least 21 years old to purchase handguns and handgun ammunition.

**Product listing rules:**

- Show "In Stock" / "Out of Stock" / "Call for Availability"
- Never show specific inventory quantities
- Never show serial numbers
- Include age requirement indicators
- Stripe payment links for NON-FFL items only (accessories, apparel, fishing gear)

---

## FORBIDDEN ACTIONS

1. Never use placeholder images - generate or source real ones
2. Never use lorem ipsum - write real copy or leave [PLACEHOLDER: description]
3. Never create a design that looks "basic" or "minimal viable product"
4. Never ignore mobile-first requirement
5. Never use stock photos of models in pristine outdoor gear
6. Never make the site feel corporate or impersonal
