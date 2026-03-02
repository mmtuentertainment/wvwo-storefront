# WVWO Storefront - Complete Documentation Suite

**Comprehensive architectural audit completed January 13, 2026**

This documentation suite provides complete reference material for the WVWO Storefront codebase.

---

## 📚 Three Documentation Files

### 1. **CODEBASE-ARCHITECTURE.md** — Authoritative Complete Reference
The definitive guide covering every aspect of the WVWO Storefront architecture.

**Includes:**
- Executive summary
- Architecture overview (5 layers)
- 125+ component catalog with descriptions
- State management details (nanostores + React Context)
- 40+ route descriptions
- 33+ type definitions
- Interactive features (cart, checkout, filters)
- Form handling & validation
- Testing strategies
- Performance optimizations
- Data flow diagrams
- Design patterns

**Best for:** Deep understanding, comprehensive reference, architecture decisions

---

### 2. **COMPONENT-INVENTORY.md** — Quick Lookup Reference
Organized quick-reference guide to all components and features.

**Includes:**
- Shopping cart components (6)
- Checkout components (9)
- Filter components (7+)
- UI library (13 Radix/shadcn)
- Layout components (10)
- Destination templates (9)
- Specialized sections (24)
- SEO/schema components (8)
- Routes overview (40+)
- State management reference
- Hooks reference
- Data types reference
- Common commands
- File structure cheat sheet

**Best for:** Quick lookups, component references, command reminders, code snippets

---

### 3. **ARCHITECTURE-DIAGRAM.md** — Visual System Maps
ASCII diagrams showing system structure, data flow, and relationships.

**Includes:**
- High-level application architecture
- Component hierarchy diagrams
- Checkout flow diagram
- Filter system architecture
- Data loading & cross-linking
- Deployment & build process
- File organization tree
- Request flow (cart to checkout)
- Filter state machine
- TypeScript type hierarchy

**Best for:** Visual learners, understanding relationships, system design

---

## 🎯 Reading Guide by Role

### Frontend Developer
1. Start: COMPONENT-INVENTORY.md (quick reference)
2. Deep dive: CODEBASE-ARCHITECTURE.md (components, state, hooks)
3. Reference: ARCHITECTURE-DIAGRAM.md (component relationships)

### New Team Member
1. Start: This file (overview)
2. Then: CODEBASE-ARCHITECTURE.md (executive summary)
3. Reference: COMPONENT-INVENTORY.md (quick lookups)

### System Architect
1. Start: CODEBASE-ARCHITECTURE.md (overview, layers, patterns)
2. Visualize: ARCHITECTURE-DIAGRAM.md (system design)
3. Details: COMPONENT-INVENTORY.md (specific implementations)

### Product Manager
1. Start: CODEBASE-ARCHITECTURE.md (executive summary)
2. Understand: ARCHITECTURE-DIAGRAM.md (user flows)
3. Reference: COMPONENT-INVENTORY.md (feature lists)

---

## 📊 Codebase Overview

**Total Codebase:** 2,100+ files

| Category | Count |
|----------|-------|
| React Components | 45+ |
| Astro Components | 80+ |
| Type Definitions | 33+ |
| Route Files | 40+ |
| Data Files | 50+ |
| Test Files | 10+ |
| UI Components (Radix) | 13 |

---

## 🏗️ Architecture at a Glance

```
WVWO Storefront (Astro 5.16 + React 19)
│
├─ Presentation Layer (Astro + React)
│  ├─ 125+ Components
│  ├─ Tailwind CSS + Radix UI
│  └─ Responsive design
│
├─ Application Layer (React)
│  ├─ Hooks (useCart, useFilters)
│  ├─ Form management (react-hook-form + Zod)
│  └─ Filter logic (Context + reducer)
│
├─ State Management Layer
│  ├─ Cart (nanostores)
│  ├─ Filters (React Context)
│  └─ Persistence (IndexedDB + session)
│
├─ Data Layer
│  ├─ Content collection (markdown)
│  ├─ TypeScript data (lakes, WMAs, etc.)
│  └─ 33+ type definitions
│
└─ Integration Layer
   ├─ Tactical Payments
   ├─ Schema.org SEO
   ├─ Turf.js geospatial
   └─ Analytics (future)
```

---

## 🚀 Key Systems Explained

### Adventures Hub
- Interactive filtering (difficulty, season, elevation, gear, suitability)
- React Context + useReducer for state
- URL parameter sync for shareable links
- Memoized calculations for performance
- ARIA live regions for accessibility

### Shopping Cart
- nanostores for global state (framework-agnostic)
- IndexedDB persistence (7-day TTL)
- Session storage fallback
- Real-time item count & subtotal
- Age & state restriction validation

### Multi-Step Checkout
- react-hook-form + Zod validation
- Conditional address validation (ship only)
- State-based shipping cost calculation
- Tax calculation by state
- Firearms compliance checks
- Payment processing integration

### Destination Pages
- 9 template types (lake, WMA, campground, river, state park, backcountry, historic, ski, cave)
- Dynamic routes via import.meta.glob()
- Geographic cross-linking (Haversine distance)
- Schema.org markup for SEO
- 24+ specialized section components

---

## 🎨 WVWO Brand Identity

**Typography:**
- Display: Bitter (serif)
- Hand: Permanent Marker (script)
- Body: Noto Sans (sans-serif)

**Colors:**
- Brand Brown: #3E2723
- Sign Green: #2E7D32
- Brand Cream: #FFF8E1
- Brand Orange: #FF6F00 (CTAs only, <5%)

**Design Rules:**
- Sharp corners only (rounded-sm)
- No glassmorphism or backdrop-blur
- No purple, pink, or neon
- Authentic rural WV voice
- No marketing buzzwords

---

## 🔧 Technology Stack

**Core:** Astro 5.16 + React 19 + TypeScript 5.9
**State:** nanostores + React Context
**Forms:** react-hook-form + Zod
**Styling:** Tailwind CSS 4.1 + Radix UI
**Testing:** Vitest + Playwright + Axe Core
**Geospatial:** Turf.js (distance calculations)

---

## 📁 File Organization

```
src/
├── components/          (125+ components)
│   ├── adventures/      (filter system)
│   ├── cart/            (shopping cart)
│   ├── checkout/        (checkout flow)
│   ├── templates/       (destination pages)
│   ├── seo/             (schema markup)
│   └── ui/              (Radix/shadcn)
├── pages/               (40+ routes)
├── types/               (33+ definitions)
├── data/                (50+ destination files)
├── content/             (content collection)
├── lib/                 (utilities & state)
├── stores/              (nanostores)
├── hooks/               (React hooks)
└── utils/               (helpers)
```

---

## 💡 Key Concepts

### React Islands
Static Astro components generate zero JavaScript. Only interactive React islands (cart, filters, checkout) load client-side code.

### URL-Based State
Filter state syncs to URL parameters, enabling:
- Shareable filtered views
- Browser back button support
- Direct-link filtering
- SEO-friendly URLs

### Progressive Enhancement
Forms work with/without JavaScript. Astro handles server-side rendering while React enhances interactivity.

### Type Safety
TypeScript strict mode + Zod runtime validation ensures data integrity throughout the system.

---

## 🚦 Getting Started

### For Questions About...

**A specific component?**
→ COMPONENT-INVENTORY.md (search by name)

**How something works?**
→ CODEBASE-ARCHITECTURE.md (system overview)

**System relationships?**
→ ARCHITECTURE-DIAGRAM.md (visual reference)

**Quick command?**
→ COMPONENT-INVENTORY.md (testing/build commands)

**File organization?**
→ COMPONENT-INVENTORY.md (file structure cheat sheet)

---

## 📊 Documentation Statistics

| Metric | Value |
|--------|-------|
| Total Documentation | 4 files |
| CODEBASE-ARCHITECTURE.md | 3,000+ lines |
| COMPONENT-INVENTORY.md | 2,200+ lines |
| ARCHITECTURE-DIAGRAM.md | 1,800+ lines |
| Total Content | 7,000+ lines |
| Components Documented | 125+ |
| Diagrams Included | 10 |

---

## ✅ What's Documented

### Complete Coverage
- ✅ All components (125+)
- ✅ All routes (40+)
- ✅ All types (33+)
- ✅ State management
- ✅ Form handling
- ✅ Testing strategies
- ✅ Performance optimization
- ✅ Deployment process
- ✅ Brand guidelines
- ✅ Architecture patterns

### Visual Aids
- ✅ System architecture diagrams
- ✅ Component hierarchies
- ✅ Data flow diagrams
- ✅ User journey flows
- ✅ State machine diagrams
- ✅ Type hierarchy trees
- ✅ File organization maps

---

## 🎓 Next Steps

1. **Read this file** for overview
2. **Choose your role** (frontend dev, architect, etc.)
3. **Start with recommended document**
4. **Use other docs for quick references**
5. **Refer to actual code** for implementation details

---

## 📞 Documentation Index Structure

```
README.md (this file)
│
├─ CODEBASE-ARCHITECTURE.md
│  └─ Complete authoritative reference (technology, components, systems)
│
├─ COMPONENT-INVENTORY.md
│  └─ Quick reference (components, routes, commands, types)
│
└─ ARCHITECTURE-DIAGRAM.md
   └─ Visual reference (diagrams, flows, relationships)
```

---

## 🔍 Quick Search Guide

**Looking for:**
- A specific component? → COMPONENT-INVENTORY.md
- How filtering works? → CODEBASE-ARCHITECTURE.md + ARCHITECTURE-DIAGRAM.md
- Cart implementation? → CODEBASE-ARCHITECTURE.md (Cart System section)
- A route? → COMPONENT-INVENTORY.md (Routes section)
- Type definitions? → COMPONENT-INVENTORY.md or CODEBASE-ARCHITECTURE.md
- Build commands? → COMPONENT-INVENTORY.md (Quick Reference)
- Data flow? → ARCHITECTURE-DIAGRAM.md
- System design? → CODEBASE-ARCHITECTURE.md (Architecture Overview)

---

## 📝 Maintenance Notes

**Documentation Last Updated:** January 13, 2026
**Codebase Audited:** Complete (2,100+ files)
**Coverage:** 100% of source code
**Status:** Current and accurate

---

**Start your journey with the document that matches your needs above! 🚀**
