# Mission: WV Wild Outdoors Website

## Objective

Build a complete, production-ready website for **WV Wild Outdoors**, a family-owned sporting goods store in Birch River, West Virginia. The website must authentically represent the store's rural Appalachian character, Christian family values, and decades of community trust.

---

## Business Context

| Field | Value |
|-------|-------|
| **Business Name** | WV Wild Outdoors LLC |
| **Owners** | Kim and Bryan Utt |
| **Location** | Birch River, Braxton County, West Virginia |
| **Operating Since** | 2008 |
| **License** | Type 02 FFL (Pawnbroker dealing in firearms) |
| **Hours** | Tue-Fri 10am-5pm, Sat 9am-2pm, Closed Sun-Mon |
| **Phone** | (obtain from store_info) |

### What They Sell
- Firearms (rifles, shotguns, handguns)
- Ammunition
- Hunting gear and apparel
- Fishing tackle and equipment
- Boots and outdoor footwear
- Optics (scopes, binoculars)
- Knives and tools
- Country store items
- Live bait (seasonal)

### Services Offered
- FFL Transfers ($25 per transfer)
- WVDNR Hunting/Fishing Licenses
- Buy/Sell/Trade Firearms
- Scope Mounting & Bore Sighting ($20)

### Unique Story
The store survived the devastating June 2016 flood that destroyed much of Braxton County. They lost substantial inventory, faced theft during recovery, and were denied FEMA assistance. They rebuilt through federal parks cleaning contracts and community support. This resilience is central to their identity.

---

## Design Reference

**PRIMARY REFERENCE:** Store front photo showing:
- Dark chocolate brown vertical metal siding
- Hunter green "SPORTING GOODS" sign with white block serif text
- Hunter green metal roof
- Natural unpainted lumber porch
- Vintage Pflueger fishing sign ("Quality Since 1881")
- Rural, working building aesthetic

**Extract exact colors from this image and use throughout the site.**

---

## Pages to Build

### 1. Homepage
**Sections (in order):**
1. Sticky header: Logo, phone number, hours, hamburger menu (mobile)
2. Hero: Mountain/hunting scene with store name overlay, "Get Directions" CTA
3. Trust badges: "Family Owned Since 2008" • "Type 02 FFL" • "WVDNR License Agent"
4. "Bait & Bullet" ticker: Scrolling announcements
5. Product category grid: 6-8 cards with images
6. Services highlight: 4 service cards
7. "We Buy Guns" banner: Highlight Type 02 FFL advantage
8. About preview: Brief story + link to full page
9. Newsletter signup: Simple email capture
10. Footer: Hours, address, phone, social, FFL disclaimer

### 2. Products Page (Category Listing)
- Filter by category
- Grid of product cards
- Stock status indicators
- "Call for Price" on firearms

### 3. Single Product Page
- Large image
- Name, description, price (or "Call for Price")
- Stock status
- "Call to Order" button (not e-commerce cart)
- Related products

### 4. Services Page
- FFL Transfers (with process explanation)
- Licenses (types available)
- Buy/Sell/Trade
- Scope Mounting
- Each with pricing and what to expect

### 5. About Page
- The Utt family story
- 2016 flood survival narrative
- Community involvement
- Stump Chapel Baptist Church connection
- Photo gallery

### 6. Contact Page
- Hours (prominent)
- Address with embedded map
- Phone (clickable)
- Simple contact form
- Directions from major routes

---

## Image Sourcing Tasks

**Use Chrome browser to find and download:**

1. **Hero images (3-4 options):**
   - Search: "West Virginia mountains sunrise" on Unsplash
   - Search: "Appalachian forest fall colors" on Pexels
   - Search: "hunting morning mist forest" on Pixabay

2. **Category images:**
   - Firearms: Search "hunting rifle wooden stock"
   - Fishing: Search "bass fishing lure"
   - Boots: Search "hiking boots outdoor"
   - Ammo: Search "ammunition boxes"
   - Hunting gear: Search "hunter orange vest camo"
   - Optics: Search "rifle scope"

3. **Faith accent images:**
   - Search: "cross silhouette sunrise mountains"
   - Search: "nature worship morning light"

4. **Lifestyle images:**
   - Search: "whitetail deer forest"
   - Search: "trout stream fishing"
   - Search: "father son hunting"

**If suitable images not found:** Use Nano Banana to generate with prompts specifying warm, authentic, painterly style.

---

## Technical Stack

```yaml
Framework: Astro
Styling: Tailwind CSS
Components: Astro components (no heavy JS framework needed)
Images: Optimized WebP, lazy loaded
Hosting: Cloudflare Pages (static)
CMS: Directus (headless, for owner content updates)
```

---

## Success Criteria

### Visual
- [ ] Colors match store signage exactly
- [ ] Typography evokes classic general store signs
- [ ] Images feel authentic, not stock-photo corporate
- [ ] Mobile experience is primary, not afterthought
- [ ] Faith elements present but subtle

### Functional
- [ ] Phone number clickable on mobile
- [ ] Hours clearly visible on every page
- [ ] Directions link opens maps app
- [ ] All links work
- [ ] Forms submit correctly

### Performance
- [ ] Lighthouse mobile score: 90+
- [ ] First contentful paint: <1.5s
- [ ] No layout shift

### Compliance
- [ ] FFL disclaimer on every page footer
- [ ] No specific inventory quantities shown
- [ ] Age requirements indicated where needed

---

## Artifact Outputs Expected

1. `artifacts/plan_design.md` - Initial design plan with component sketches
2. `artifacts/color_palette.png` - Visual color swatch extracted from store photo
3. `artifacts/screenshots/` - Screenshots of each page at mobile and desktop widths
4. `artifacts/image_sources.md` - List of all sourced images with attribution
5. `artifacts/walkthrough.md` - Final verification walkthrough
6. Browser recording of working site

---

## Reference Files

- `reference/store-front.jpg` - Store exterior photo (PRIMARY DESIGN REFERENCE)
- `reference/store-info.json` - Business details from Directus
- `reference/brand-colors.md` - Extracted color palette

---

## Agent Instructions

1. **START** by analyzing the store front photo and extracting exact hex colors
2. **SEARCH** for all required images using Chrome before writing any code
3. **BUILD** mobile-first, test at 375px width continuously
4. **VERIFY** each page in Chrome browser before moving to next
5. **RECORD** final walkthrough showing all pages and interactions

**Remember:** This website should feel like the digital version of walking up to that store. Warm. Trusted. Real.
