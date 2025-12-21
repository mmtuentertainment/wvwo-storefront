import re

# Read the BLUEPRINT.md file
with open('docs/BLUEPRINT.md', 'r', encoding='utf-8') as f:
    content = f.read()

# Define the new Phase 3 content
new_phase3 = """### PHASE 3: MOUNTAIN STATE ADVENTURE DESTINATION (Weeks 4-6)

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

"""

# Find and replace Phase 3 section
# Pattern: Start with "### PHASE 3" and go until "### PHASE 4" or similar
pattern = r'### PHASE 3: MOUNTAIN STATE ADVENTURE DESTINATION.*?(?=### PHASE 4|^[^\#])'
match = re.search(pattern, content, re.DOTALL | re.MULTILINE)

if match:
    # Replace the matched section
    content = content[:match.start()] + new_phase3 + content[match.end():]
    print(f"Replaced Phase 3 section (found at position {match.start()})")
else:
    print("Could not find Phase 3 section to replace")
    # Try alternative pattern
    pattern2 = r'### PHASE 3.*?(?=\n1\. "The Best Boots)'
    match2 = re.search(pattern2, content, re.DOTALL | re.MULTILINE)
    if match2:
        content = content[:match2.start()] + new_phase3 + content[match2.end():]
        print(f"Replaced Phase 3 section using alternative pattern")

# Write back
with open('docs/BLUEPRINT.md', 'w', encoding='utf-8') as f:
    f.write(content)

print("BLUEPRINT.md Phase 3 expansion complete")
