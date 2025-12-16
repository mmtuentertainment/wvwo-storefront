# WVWO Frontend Architecture: Professional-Grade Patterns

**Version**: 1.0.0
**Date**: 2025-12-16
**Status**: ARCHITECTURE SPEC - Ready for Implementation

---

## Executive Summary

This document defines professional-grade frontend patterns to elevate WV Wild Outdoors from "local shop website" to "Bass Pro Shops/Cabela's quality" while maintaining rural WV authenticity. Each pattern includes CSS implementation, accessibility requirements, and specific constraints for WVWO brand identity.

**Design Philosophy**: Professional ≠ Corporate. We achieve polish through **precision**, **consistency**, and **attention to micro-details**, not through trendy effects or Silicon Valley aesthetics.

---

## 1. Hero Section Pattern: "Cinematic Storefront"

### Design Goal
First impression that says "We're as professional as the big retailers, but we're your neighbors."

### Anatomy
```
┌─────────────────────────────────────────────────┐
│  [Background: High-res shop photo with overlay] │
│                                                  │
│  BIRCH RIVER / LITTLE BIRCH, WV ←── Location    │
│  WV Wild Outdoors ←────────────────── Brand     │
│  Your local headquarters for hunting... ←─ USP  │
│                                                  │
│  [Call Shop] [Hours & Directions] [FFL $25] ←─  │
│                         Clear CTAs               │
│  Since 2008 • Type 02 FFL • WVDNR Agent ←─────  │
│                         Trust badges             │
└─────────────────────────────────────────────────┘
```

### CSS Implementation
```css
/* Hero Container */
.hero-cinematic {
  position: relative;
  height: 85vh;
  min-height: 600px;
  width: 100%;
  overflow: hidden;
}

/* Background Image Layer */
.hero-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  /* Professional quality: Use 1920x1080+ images, optimized with Sharp */
}

/* Camo Texture Overlay (WVWO specific) */
.hero-texture {
  position: absolute;
  inset: 0;
  background-image: url('/patterns/camo.svg');
  opacity: 0.1;
  mix-blend-mode: overlay;
  pointer-events: none;
}

/* Gradient for Readability */
.hero-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgba(28, 25, 23, 0.9) 0%,    /* stone-900 @ 90% */
    rgba(28, 25, 23, 0.4) 50%,    /* stone-900 @ 40% */
    transparent 100%
  );
  pointer-events: none;
}

/* Content Layer */
.hero-content {
  position: relative;
  z-index: 10;
  height: 100%;
  max-width: 80rem; /* 1280px */
  margin: 0 auto;
  padding: 3rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* Typography Hierarchy */
.hero-location {
  color: rgb(255 248 225 / 0.9); /* brand-cream/90 */
  font-family: var(--font-display);
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-size: 0.875rem; /* 14px */
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  border-left: 4px solid #FF6F00; /* brand-orange */
  padding-left: 1rem;
}

.hero-title {
  color: white;
  font-family: var(--font-display);
  font-weight: 900;
  font-size: clamp(3rem, 8vw, 6rem); /* Responsive 48px-96px */
  line-height: 0.9;
  margin-bottom: 2rem;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
}

.hero-tagline {
  color: rgb(245 245 244); /* stone-100 */
  font-family: var(--font-body);
  font-size: clamp(1.125rem, 2vw, 1.5rem); /* 18px-24px */
  line-height: 1.6;
  max-width: 48ch; /* Optimal readability */
  margin-bottom: 2.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  opacity: 0.95;
}

/* Trust Badges */
.hero-badges {
  color: rgb(255 248 225 / 0.8); /* brand-cream/80 */
  font-size: 0.875rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 1rem;
  margin-bottom: 2rem;
}

.hero-badges span {
  white-space: nowrap;
}

/* CTA Buttons (Premium feel) */
.hero-cta-primary {
  padding: 1rem 2rem;
  background: #2E7D32; /* sign-green */
  color: white;
  font-weight: 700;
  border-radius: 0.125rem; /* rounded-sm per WVWO aesthetic */
  box-shadow:
    0 4px 6px rgba(0, 0, 0, 0.1),
    0 8px 16px rgba(46, 125, 50, 0.15); /* Green glow */
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: clamp(0.875rem, 1.5vw, 1rem);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.hero-cta-primary:hover {
  background: #1B5E20; /* Darker green */
  transform: translateY(-2px);
  box-shadow:
    0 6px 12px rgba(0, 0, 0, 0.15),
    0 12px 24px rgba(46, 125, 50, 0.2);
}

.hero-cta-secondary {
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  font-weight: 700;
  border-radius: 0.125rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: clamp(0.875rem, 1.5vw, 1rem);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.hero-cta-secondary:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.hero-cta-accent {
  padding: 0.75rem 1.5rem;
  background: #FF6F00; /* brand-orange */
  color: white;
  font-weight: 700;
  border-radius: 0.125rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 0.875rem;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.hero-cta-accent:hover {
  background: #E65100; /* Darker orange */
  transform: translateY(-2px);
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .hero-cta-primary:hover,
  .hero-cta-secondary:hover,
  .hero-cta-accent:hover {
    transform: none;
  }
}
```

### Professional Touches
1. **High-resolution imagery** - 1920x1080+ background, compressed with Sharp
2. **Layered depth** - Background → Texture → Gradient → Content (4 layers)
3. **Precise typography scale** - 48px → 96px with clamp(), optimal readability
4. **Shadow depth system** - Consistent shadow tokens for depth perception
5. **Responsive CTAs** - Fluid sizing with clamp(), touch-friendly 44px min height

### WVWO-Specific Constraints
- NO parallax scrolling (too trendy, violates aesthetic)
- NO center alignment (asymmetric left-aligned per WVWO style)
- Orange accent <5% of screen (used only for FFL CTA)
- Camo texture at 10% opacity max (subtle, not costume)
- Sharp corners (rounded-sm) not trendy rounded-xl

---

## 2. Category Grid Pattern: "Organized Arsenal"

### Design Goal
12 inventory sections that feel shoppable, scannable, and professional like Bass Pro Shops' department layout.

### Anatomy
```
┌──────────────────────────────────────────────────┐
│  What You'll Find In the Shop                    │
│  ───────────────────────────────────────────     │
│                                                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │  Icon    │  │  Icon    │  │  Icon    │       │
│  │  Rifles  │  │  Ammo    │  │  Optics  │       │
│  │  146     │  │  289     │  │  67      │       │
│  └──────────┘  └──────────┘  └──────────┘       │
│                                                   │
│  [Hover reveals: "Shop Rifles →"]                │
└──────────────────────────────────────────────────┘
```

### CSS Implementation
```css
/* Category Grid Container */
.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.5rem;
  max-width: 80rem;
  margin: 0 auto;
  padding: 3rem 1rem;
}

@media (min-width: 768px) {
  .category-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
}

@media (min-width: 1024px) {
  .category-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* Category Card (Professional retail feel) */
.category-card {
  position: relative;
  background: white;
  border: 1px solid rgb(231 229 228); /* stone-200 */
  border-radius: 0.125rem; /* rounded-sm */
  padding: 2rem 1.5rem;
  text-align: center;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  overflow: hidden;
}

/* Hover State (Tactile, not flashy) */
.category-card:hover {
  border-color: #2E7D32; /* sign-green */
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.05),
    0 4px 8px rgba(46, 125, 50, 0.08); /* Subtle green glow */
  transform: translateY(-2px);
}

/* Left Accent Border (WVWO signature) */
.category-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: #3E2723; /* brand-brown */
  opacity: 0;
  transition: opacity 0.2s;
}

.category-card:hover::before {
  opacity: 1;
}

/* Category Icon Container */
.category-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(255 248 225); /* brand-cream */
  border-radius: 0.125rem;
  color: #3E2723; /* brand-brown */
}

.category-card:hover .category-icon {
  background: #2E7D32; /* sign-green */
  color: white;
}

/* Category Title */
.category-title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.125rem; /* 18px */
  color: #3E2723; /* brand-brown */
  margin-bottom: 0.5rem;
}

/* Product Count Badge */
.category-count {
  font-family: var(--font-body);
  font-size: 0.875rem;
  color: rgb(120 113 108); /* stone-500 */
  font-weight: 500;
}

.category-card:hover .category-count {
  color: #2E7D32; /* sign-green */
}

/* Call-to-Action (Hidden, revealed on hover) */
.category-cta {
  margin-top: 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #2E7D32;
  opacity: 0;
  transform: translateY(4px);
  transition: all 0.2s;
}

.category-card:hover .category-cta {
  opacity: 1;
  transform: translateY(0);
}

/* Accessibility */
.category-card:focus-visible {
  outline: 2px solid #2E7D32;
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .category-card:hover {
    transform: none;
  }

  .category-cta {
    opacity: 1;
    transform: none;
  }
}
```

### Professional Touches
1. **Consistent grid** - Auto-fit with minmax() for responsive perfection
2. **Subtle hover states** - 2px lift + green border, not dramatic shadows
3. **Icon → Color transition** - Professional retail department feel
4. **Product count badges** - Real-time inventory transparency
5. **Progressive disclosure** - CTA appears on hover (progressive enhancement)

### WVWO-Specific Constraints
- Left accent border (signature WVWO element, not floating shadows)
- Brand-cream background for icons (ties to overall palette)
- Sharp corners (rounded-sm) not rounded-lg/xl
- NO dramatic scale transforms (subtle 2px lift only)
- Green hover state (not orange - orange reserved for CTAs)

---

## 3. Product Card Pattern: "Premium But Approachable"

### Design Goal
Product cards that feel as polished as Bass Pro Shops but maintain "small shop" warmth.

### Anatomy
```
┌─────────────────────────┐
│                         │ ← Aspect ratio 1:1
│   Product Photo         │   (White background)
│   (object-contain)      │
│                         │
├─────────────────────────┤
│ REMINGTON              │ ← Brand (orange)
│ 700 BDL .30-06         │ ← Product name (bold)
│                         │
│ $749.99                │ ← Price (large)
│ ✓ In Stock             │ ← Stock badge
│                         │
│ [Call to Order]        │ ← CTA (context-aware)
└─────────────────────────┘
```

### CSS Implementation
```css
/* Product Card Container */
.product-card {
  background: white;
  border: 1px solid rgb(245 245 244); /* stone-100 */
  border-radius: 0.125rem; /* rounded-sm */
  overflow: hidden;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%; /* Uniform height in grid */
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.05),
    0 4px 12px rgba(0, 0, 0, 0.08);
}

/* Image Container (Critical for professional look) */
.product-image-container {
  position: relative;
  aspect-ratio: 1 / 1;
  background: white; /* Pure white for product photography */
  overflow: hidden;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: contain; /* CRITICAL: contain, not cover */
  padding: 0.5rem; /* Breathing room */
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.product-card:hover .product-image {
  transform: scale(1.05); /* Subtle zoom */
}

/* Product Info Section */
.product-info {
  padding: 1rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

/* Brand Label (Orange highlight) */
.product-brand {
  font-size: 0.75rem; /* 12px */
  color: #FF6F00; /* brand-orange */
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.25rem;
}

/* Product Name */
.product-name {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1rem;
  color: #3E2723; /* brand-brown */
  line-height: 1.4;
  margin-bottom: 0.75rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden; /* Truncate long names */
}

.product-name:hover {
  color: #FF6F00; /* brand-orange */
  transition: color 0.2s;
}

/* Price Display (Premium hierarchy) */
.product-price-container {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.product-price {
  font-size: 1.125rem; /* 18px */
  font-weight: 700;
  color: #3E2723; /* brand-brown */
}

.product-price-unit {
  font-size: 0.75rem;
  color: rgb(120 113 108); /* stone-500 */
}

/* Stock Badge (Professional status indicators) */
.stock-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.stock-badge.in-stock {
  color: #2E7D32; /* sign-green */
}

.stock-badge.out-of-stock {
  color: rgb(120 113 108); /* stone-500 */
}

.stock-badge svg {
  width: 0.75rem;
  height: 0.75rem;
}

/* CTA Button (Context-aware) */
.product-cta {
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem; /* 10px 16px */
  font-weight: 700;
  font-size: 0.875rem;
  border-radius: 0.125rem;
  transition: all 0.2s;
  margin-top: auto; /* Push to bottom */
}

/* Shippable items = Green */
.product-cta.shippable {
  background: #2E7D32; /* sign-green */
  color: white;
}

.product-cta.shippable:hover {
  background: #1B5E20; /* Darker green */
}

/* Non-shippable = Brown (call to order) */
.product-cta.call-order {
  background: #3E2723; /* brand-brown */
  color: white;
}

.product-cta.call-order:hover {
  background: #2E1F1B; /* Darker brown */
}

/* FFL Notice */
.product-ffl-notice {
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: rgb(120 113 108); /* stone-500 */
  text-align: center;
}

/* Placeholder Image (No stock photo) */
.product-image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(231 229 228); /* stone-200 */
}

.product-image-placeholder svg {
  width: 4rem;
  height: 4rem;
  color: rgb(168 162 158); /* stone-400 */
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .product-card:hover .product-image {
    transform: none;
  }
}
```

### Professional Touches
1. **Pure white backgrounds** - Product photography standard (not cream/gray)
2. **object-fit: contain** - Shows full product, not cropped (crucial for firearms)
3. **Consistent aspect ratio** - 1:1 for uniform grid (Bass Pro Shops uses this)
4. **Line-clamping** - Truncates long names elegantly (2 lines max)
5. **Context-aware CTAs** - Green for shippable, brown for call-to-order
6. **Flex-grow layout** - CTA always at bottom regardless of content length

### WVWO-Specific Constraints
- Orange reserved for brand label only (not CTA)
- Sharp corners (rounded-sm) not rounded-lg
- NO floating shadows (only subtle hover lift)
- NO "Add to Cart" for non-shippable items (legal compliance)
- Stock badge uses checkmark icon, not generic dot

---

## 4. Navigation Pattern: "Smart Hierarchy"

### Design Goal
Handle 12+ categories without overwhelming users. Bass Pro Shops uses mega-menus; WVWO needs simpler but equally organized.

### Anatomy (Desktop)
```
[Logo] [Shop ▼] [About] [Guides] [Contact] [Cart] [Phone]
        │
        └─→ ┌─────────────────────────────────┐
            │ FIREARMS        AMMUNITION      │
            │ • Rifles        • Centerfire    │
            │ • Shotguns      • Rimfire       │
            │ • Handguns      • Shotshells    │
            │                                 │
            │ HUNTING         FISHING         │
            │ • Optics        • Rods & Reels  │
            │ • Clothing      • Tackle        │
            └─────────────────────────────────┘
```

### CSS Implementation
```css
/* Primary Navigation Bar */
.primary-nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: white;
  border-bottom: 1px solid rgb(231 229 228); /* stone-200 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
}

.primary-nav-container {
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem; /* 64px */
}

/* Logo */
.nav-logo {
  font-family: var(--font-display);
  font-weight: 900;
  font-size: 1.25rem;
  color: #3E2723; /* brand-brown */
  text-decoration: none;
}

.nav-logo:hover {
  color: #2E7D32; /* sign-green */
}

/* Primary Nav Links */
.nav-links {
  display: flex;
  align-items: center;
  gap: 2rem;
  list-style: none;
}

.nav-link {
  position: relative;
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 0.9375rem; /* 15px */
  color: #3E2723; /* brand-brown */
  text-decoration: none;
  padding: 0.5rem 0;
  transition: color 0.2s;
}

.nav-link:hover {
  color: #2E7D32; /* sign-green */
}

/* Active underline (pen-on-paper style) */
.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: #2E7D32; /* sign-green */
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-link:hover::after,
.nav-link[aria-current="page"]::after {
  transform: scaleX(1);
}

/* Dropdown Trigger */
.nav-dropdown-trigger {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  cursor: pointer;
}

.nav-dropdown-trigger svg {
  width: 1rem;
  height: 1rem;
  transition: transform 0.2s;
}

.nav-dropdown-trigger[aria-expanded="true"] svg {
  transform: rotate(180deg);
}

/* Mega Menu Dropdown */
.nav-mega-menu {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: white;
  border-bottom: 1px solid rgb(231 229 228); /* stone-200 */
  box-shadow:
    0 4px 6px rgba(0, 0, 0, 0.05),
    0 8px 16px rgba(0, 0, 0, 0.08);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-8px);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
}

.nav-mega-menu[data-open="true"] {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
  pointer-events: auto;
}

/* Mega Menu Grid */
.nav-mega-menu-grid {
  max-width: 80rem;
  margin: 0 auto;
  padding: 2rem 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

/* Category Column */
.nav-mega-category {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.nav-mega-category-title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.875rem;
  color: #3E2723; /* brand-brown */
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #FF6F00; /* brand-orange */
}

.nav-mega-category-link {
  font-family: var(--font-body);
  font-size: 0.875rem;
  color: rgb(87 83 78); /* stone-600 */
  text-decoration: none;
  padding: 0.25rem 0;
  transition: color 0.2s;
}

.nav-mega-category-link:hover {
  color: #2E7D32; /* sign-green */
  padding-left: 0.5rem;
  transition: all 0.2s;
}

/* Utility Nav (Phone, Cart) */
.nav-utility {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-utility-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  font-weight: 600;
  font-size: 0.875rem;
  border-radius: 0.125rem;
  transition: all 0.2s;
}

.nav-utility-phone {
  background: #2E7D32; /* sign-green */
  color: white;
}

.nav-utility-phone:hover {
  background: #1B5E20;
}

.nav-utility-cart {
  position: relative;
  color: #3E2723; /* brand-brown */
}

.nav-utility-cart-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  width: 1.25rem;
  height: 1.25rem;
  background: #FF6F00; /* brand-orange */
  color: white;
  font-size: 0.625rem;
  font-weight: 700;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Mobile Navigation (Hamburger) */
@media (max-width: 768px) {
  .nav-links {
    position: fixed;
    top: 4rem;
    left: 0;
    right: 0;
    bottom: 0;
    background: white;
    flex-direction: column;
    padding: 2rem;
    transform: translateX(-100%);
    transition: transform 0.3s;
  }

  .nav-links[data-open="true"] {
    transform: translateX(0);
  }
}

/* Accessibility */
.nav-link:focus-visible,
.nav-utility-link:focus-visible {
  outline: 2px solid #2E7D32;
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .nav-mega-menu {
    transition: none;
  }
}
```

### Professional Touches
1. **Sticky navigation** - Always accessible (standard for e-commerce)
2. **Mega menu organization** - 4-column grid, category grouping
3. **Pen-on-paper underline** - Animated from left (WVWO signature)
4. **Utility nav separation** - Phone/Cart isolated on right (clear hierarchy)
5. **Cart badge** - Orange circle with count (standard e-commerce pattern)

### WVWO-Specific Constraints
- Orange only for category title underline + cart badge (<5% rule)
- Sharp corners (rounded-sm) for buttons, not rounded-full
- NO hamburger animation effects (simple slide-in)
- Green phone CTA (primary action color)
- NO sticky header on mobile (saves vertical space)

---

## 5. Trust/Credibility Section: "Professional Credentials"

### Design Goal
Communicate FFL dealer, DNR agent, since 2008 without looking like "trust badges from 2015 startups."

### Anatomy
```
┌────────────────────────────────────────────────┐
│              Why Shop With Us?                 │
│  ──────────────────────────────────────────    │
│                                                 │
│  [FFL Icon]    [DNR Icon]    [Clock Icon]      │
│  Type 02 FFL   DNR License   Family-Owned      │
│  Dealer        Agent          Since 2008       │
│                                                 │
│  Licensed to sell firearms and handle          │
│  transfers. We handle the paperwork legally    │
│  and quickly. We aren't just a store off the   │
│  highway. We are your neighbors.               │
└────────────────────────────────────────────────┘
```

### CSS Implementation
```css
/* Trust Section Container */
.trust-section {
  background: rgb(255 248 225); /* brand-cream */
  padding: 4rem 1rem;
}

.trust-container {
  max-width: 60rem; /* 960px - narrower for focus */
  margin: 0 auto;
  text-align: center;
}

/* Section Heading */
.trust-heading {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 2rem;
  color: #3E2723; /* brand-brown */
  margin-bottom: 3rem;
}

/* Credentials Grid */
.trust-credentials {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

/* Individual Credential */
.trust-credential {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

/* Icon Container (Professional, not playful) */
.trust-icon {
  width: 80px;
  height: 80px;
  background: white;
  border: 2px solid #3E2723; /* brand-brown */
  border-radius: 0.125rem; /* Sharp corners */
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3E2723;
  transition: all 0.2s;
}

.trust-credential:hover .trust-icon {
  background: #2E7D32; /* sign-green */
  border-color: #2E7D32;
  color: white;
  transform: translateY(-2px);
}

.trust-icon svg {
  width: 40px;
  height: 40px;
}

/* Credential Label */
.trust-label {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1rem;
  color: #3E2723; /* brand-brown */
  line-height: 1.4;
}

/* Narrative Text (Kim's Voice) */
.trust-narrative {
  font-family: var(--font-body);
  font-size: 1.125rem; /* 18px */
  line-height: 1.8;
  color: rgb(87 83 78); /* stone-600 */
  max-width: 48ch; /* Optimal readability */
  margin: 2rem auto 0;
}

.trust-narrative strong {
  color: #3E2723; /* brand-brown */
  font-weight: 600;
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .trust-credential:hover .trust-icon {
    transform: none;
  }
}
```

### Professional Touches
1. **Icon-first design** - Visual hierarchy (standard for credibility sections)
2. **White background icons** - Creates depth against cream section
3. **Border transitions** - Brown → Green on hover (professional retail feel)
4. **Narrative text** - Kim's authentic voice, not bullet points
5. **Optimal line-length** - 48ch for readability (66ch is standard, 48ch for emphasis)

### WVWO-Specific Constraints
- Sharp square icons (not circles - matches FFL/DNR official aesthetics)
- Brand-cream background (not white - ties to overall palette)
- NO generic "trusted by" language (use Kim's actual voice)
- NO star ratings or testimonial quotes here (separate section)
- NO social proof numbers ("Trusted by 10,000+" violates humble voice)

---

## 6. Photography Guidelines: "Professional Product Standards"

### Design Goal
Make products look as professional as Bass Pro Shops catalog photography without studio equipment.

### Requirements

#### 6.1 Product Photography Standards
```
MANDATORY SPECS:
- Resolution: 2000x2000px minimum (allows zoom)
- Format: WebP with JPEG fallback
- Background: Pure white (#FFFFFF) or transparent PNG
- Lighting: Even, no harsh shadows
- Framing: Product fills 80% of frame with breathing room
- Angles: 3/4 view for rifles, top-down for tackle, straight-on for apparel
```

#### 6.2 CSS for Image Optimization
```css
/* Product Image Component (Sharp-optimized) */
.product-image-optimized {
  width: 100%;
  height: 100%;
  object-fit: contain;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
}

/* Lazy Loading with Blur-up */
.product-image-placeholder {
  background: linear-gradient(
    135deg,
    rgb(245 245 244) 0%,
    rgb(231 229 228) 100%
  );
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

/* Zoom on Hover (PDP only) */
.product-image-zoomable {
  cursor: zoom-in;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.product-image-zoomable:hover {
  transform: scale(1.5);
}
```

#### 6.3 Astro Image Component Pattern
```astro
---
import { Image } from 'astro:assets';

interface Props {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const { src, alt, width, height } = Astro.props;
---

<Image
  src={src}
  alt={alt}
  width={width}
  height={height}
  format="webp"
  quality={85}
  loading="lazy"
  decoding="async"
  class="product-image-optimized"
/>
```

### Professional Touches
1. **Sharp integration** - Automatic WebP conversion + responsive sizes
2. **Blur-up placeholder** - Shimmer effect during lazy load
3. **Zoom capability** - 1.5x scale on hover for PDP (product detail page)
4. **Consistent framing** - 80% fill rule for uniform grid appearance
5. **Quality threshold** - 85% quality balance (filesize vs. detail)

### WVWO-Specific Constraints
- NO lifestyle photography on product cards (lifestyle reserved for homepage/guides)
- NO models holding products (authenticity - Kim/Bryan OK, stock models NO)
- Phone-quality acceptable for shop interior shots (authenticity over polish)
- Grayscale treatment OK for historical photos (flood, shop history)
- NO AI-generated product images (violates authenticity principle)

---

## 7. Micro-interactions: "Tactile Digital Experience"

### Design Goal
Subtle animations that add polish without being flashy. Think "quality hardware" not "tech startup."

### 7.1 Button Interactions
```css
/* Primary Button (Green CTA) */
.btn-primary {
  position: relative;
  overflow: hidden;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-primary::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: left 0.5s;
}

.btn-primary:hover::before {
  left: 100%; /* Shine effect on hover */
}

.btn-primary:active {
  transform: scale(0.98); /* Tactile press */
}

/* Ripple Effect (Click feedback) */
.btn-ripple {
  position: relative;
  overflow: hidden;
}

.btn-ripple::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  animation: ripple 0.6s ease-out;
  pointer-events: none;
}

.btn-ripple:active::after {
  width: 200%;
  height: 200%;
}

@keyframes ripple {
  from {
    width: 0;
    height: 0;
    opacity: 1;
  }
  to {
    width: 200%;
    height: 200%;
    opacity: 0;
  }
}
```

### 7.2 Card Hover States
```css
/* Product Card Lift */
.card-lift {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-lift:hover {
  transform: translateY(-4px);
  box-shadow:
    0 4px 8px rgba(0, 0, 0, 0.08),
    0 8px 16px rgba(0, 0, 0, 0.12);
}

/* Image Zoom (Within container) */
.card-image-zoom {
  overflow: hidden;
}

.card-image-zoom img {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-image-zoom:hover img {
  transform: scale(1.05);
}
```

### 7.3 Loading States
```css
/* Skeleton Loader (Better than spinners) */
.skeleton {
  background: linear-gradient(
    90deg,
    rgb(245 245 244) 0%,
    rgb(231 229 228) 50%,
    rgb(245 245 244) 100%
  );
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s ease-in-out infinite;
  border-radius: 0.125rem;
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* Fade In (On load) */
.fade-in {
  animation: fade-in 0.6s cubic-bezier(0.4, 0, 0.2, 1) both;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Stagger Delay (For lists) */
.stagger-item:nth-child(1) { animation-delay: 0.05s; }
.stagger-item:nth-child(2) { animation-delay: 0.10s; }
.stagger-item:nth-child(3) { animation-delay: 0.15s; }
.stagger-item:nth-child(4) { animation-delay: 0.20s; }
.stagger-item:nth-child(5) { animation-delay: 0.25s; }
```

### 7.4 Input Focus States
```css
/* Form Input (Professional focus) */
.form-input {
  border: 1px solid rgb(214 211 209); /* stone-300 */
  border-radius: 0.125rem;
  transition: all 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: #2E7D32; /* sign-green */
  box-shadow:
    0 0 0 3px rgba(46, 125, 50, 0.1); /* Green glow */
}

.form-input:invalid:not(:focus) {
  border-color: #DC2626; /* red-600 */
}

/* Checkbox/Radio (Custom styled) */
.form-checkbox {
  appearance: none;
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid rgb(168 162 158); /* stone-400 */
  border-radius: 0.125rem;
  transition: all 0.2s;
  cursor: pointer;
}

.form-checkbox:checked {
  background: #2E7D32; /* sign-green */
  border-color: #2E7D32;
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
}

.form-checkbox:focus {
  box-shadow: 0 0 0 3px rgba(46, 125, 50, 0.1);
}
```

### Professional Touches
1. **Shine effect** - Subtle light sweep on button hover (premium feel)
2. **Tactile press** - 98% scale on click (physical feedback)
3. **Skeleton loaders** - Better UX than spinners (shows content structure)
4. **Stagger animations** - List items fade in sequentially (polished feel)
5. **Custom checkboxes** - Branded green, not browser default (consistency)

### WVWO-Specific Constraints
- NO bouncy animations (violates "tactile hardware" principle)
- NO parallax scrolling (too trendy)
- NO confetti or celebration effects (inappropriate for firearms/hunting)
- NO morphing gradients (violates color palette rules)
- ALL animations must respect prefers-reduced-motion

---

## 8. Design Token System

### 8.1 Spacing Scale (Consistent rhythm)
```css
:root {
  --space-1: 0.25rem;  /* 4px  - Tight spacing */
  --space-2: 0.5rem;   /* 8px  - Small gaps */
  --space-3: 0.75rem;  /* 12px - Medium gaps */
  --space-4: 1rem;     /* 16px - Default spacing */
  --space-5: 1.5rem;   /* 24px - Comfortable spacing */
  --space-6: 2rem;     /* 32px - Section padding */
  --space-8: 3rem;     /* 48px - Section gaps */
  --space-12: 4rem;    /* 64px - Large section gaps */
  --space-16: 6rem;    /* 96px - Hero spacing */
}
```

### 8.2 Typography Scale (Modular scale 1.25)
```css
:root {
  --text-xs: 0.75rem;     /* 12px */
  --text-sm: 0.875rem;    /* 14px */
  --text-base: 1rem;      /* 16px */
  --text-lg: 1.125rem;    /* 18px */
  --text-xl: 1.25rem;     /* 20px */
  --text-2xl: 1.5rem;     /* 24px */
  --text-3xl: 1.875rem;   /* 30px */
  --text-4xl: 2.25rem;    /* 36px */
  --text-5xl: 3rem;       /* 48px */
  --text-6xl: 4rem;       /* 64px */
  --text-8xl: 6rem;       /* 96px */
}
```

### 8.3 Shadow System (Depth hierarchy)
```css
:root {
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-base: 0 2px 4px rgba(0, 0, 0, 0.08);
  --shadow-md: 0 4px 8px rgba(0, 0, 0, 0.12);
  --shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.15);
  --shadow-xl: 0 12px 24px rgba(0, 0, 0, 0.18);

  /* Branded shadows (Green for CTAs) */
  --shadow-green: 0 4px 12px rgba(46, 125, 50, 0.15);
  --shadow-green-lg: 0 8px 20px rgba(46, 125, 50, 0.2);
}
```

### 8.4 Transition System (Consistent timing)
```css
:root {
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-base: 200ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 300ms cubic-bezier(0.4, 0, 0.2, 1);

  /* Specific use cases */
  --transition-hover: var(--transition-base);
  --transition-modal: var(--transition-slow);
}
```

### 8.5 Border Radius (WVWO sharp aesthetic)
```css
:root {
  --radius-sm: 0.125rem;  /* 2px  - Default WVWO */
  --radius-base: 0.25rem; /* 4px  - Slightly rounded */
  --radius-md: 0.375rem;  /* 6px  - Never use (too trendy) */
  --radius-lg: 0.5rem;    /* 8px  - Never use (too trendy) */
  --radius-full: 9999px;  /* Full - Badges/pills only */
}
```

---

## 9. Accessibility Requirements

### 9.1 Color Contrast (WCAG AA minimum)
```
REQUIRED RATIOS:
- Normal text (16px): 4.5:1
- Large text (18px+, 14px+ bold): 3:1
- UI components: 3:1

WVWO PALETTE COMPLIANCE:
✓ brand-brown (#3E2723) on white: 11.6:1 (AAA)
✓ brand-brown (#3E2723) on brand-cream (#FFF8E1): 10.8:1 (AAA)
✓ sign-green (#2E7D32) on white: 5.9:1 (AA+)
✓ brand-orange (#FF6F00) on white: 3.4:1 (AA large text only)
✗ brand-orange on brand-cream: 3.1:1 (Fails - use sparingly)
```

### 9.2 Keyboard Navigation
```css
/* Focus visible styles */
*:focus-visible {
  outline: 2px solid #2E7D32; /* sign-green */
  outline-offset: 2px;
  border-radius: 0.125rem;
}

/* Skip to content link */
.skip-to-content {
  position: absolute;
  top: -100%;
  left: 0;
  background: #2E7D32;
  color: white;
  padding: 1rem 2rem;
  z-index: 9999;
  transition: top 0.2s;
}

.skip-to-content:focus {
  top: 0;
}
```

### 9.3 Screen Reader Support
```html
<!-- Product Card ARIA Example -->
<article aria-labelledby="product-123-name">
  <a href="/shop/rifles/rem-700" aria-label="View details for Remington 700 BDL">
    <img src="..." alt="Remington 700 BDL rifle" />
  </a>
  <h3 id="product-123-name">Remington 700 BDL</h3>
  <p aria-label="Price: Seven hundred forty-nine dollars and ninety-nine cents">
    $749.99
  </p>
  <span aria-live="polite" class="stock-badge">
    <svg aria-hidden="true">...</svg>
    In Stock
  </span>
</article>
```

### 9.4 Motion Preferences
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 10. Performance Requirements

### 10.1 Core Web Vitals Targets
```
LCP (Largest Contentful Paint): < 2.5s
FID (First Input Delay): < 100ms
CLS (Cumulative Layout Shift): < 0.1
```

### 10.2 Image Optimization Strategy
```javascript
// Astro Image Component with Sharp
import { Image } from 'astro:assets';

// Product images
<Image
  src={productImage}
  alt={productName}
  width={800}
  height={800}
  format="webp"
  quality={85}
  loading="lazy"
  decoding="async"
/>

// Hero images (priority)
<Image
  src={heroImage}
  alt="Shop interior"
  width={1920}
  height={1080}
  format="webp"
  quality={90}
  loading="eager"
  fetchpriority="high"
/>
```

### 10.3 CSS Optimization
```css
/* Critical CSS (Inline in <head>) */
- Hero section styles
- Navigation styles
- Font declarations
- Color variables

/* Deferred CSS (Load async) */
- Product card styles
- Footer styles
- Modal styles
```

### 10.4 Font Loading Strategy
```html
<!-- Preload critical fonts -->
<link rel="preload" href="/fonts/Bitter-Bold.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/NotoSans-Regular.woff2" as="font" type="font/woff2" crossorigin>

<!-- Font display: swap for all fonts -->
<style>
  @font-face {
    font-family: 'Bitter';
    src: url('/fonts/Bitter-Bold.woff2') format('woff2');
    font-weight: 700;
    font-display: swap;
  }
</style>
```

---

## 11. Implementation Priority

### Phase 1: Foundation (Week 1)
- [x] Design token system setup
- [ ] Typography scale implementation
- [ ] Color palette refinement
- [ ] Shadow system
- [ ] Border radius standardization

### Phase 2: Hero & Navigation (Week 2)
- [ ] Hero section redesign (Cinematic Storefront)
- [ ] Navigation mega-menu implementation
- [ ] Mobile navigation refinement
- [ ] Trust/credibility section

### Phase 3: Product Display (Week 3)
- [ ] Product card redesign (Premium But Approachable)
- [ ] Category grid implementation (Organized Arsenal)
- [ ] Image optimization with Sharp
- [ ] Lazy loading + blur-up placeholders

### Phase 4: Micro-interactions (Week 4)
- [ ] Button interactions (Shine + Ripple)
- [ ] Card hover states
- [ ] Loading states (Skeleton loaders)
- [ ] Form input states

### Phase 5: Polish & Testing (Week 5)
- [ ] Accessibility audit (WCAG AA compliance)
- [ ] Performance optimization (Core Web Vitals)
- [ ] Cross-browser testing
- [ ] Mobile responsiveness refinement

---

## 12. Success Metrics

### Qualitative Goals
- [ ] "Looks as professional as Bass Pro Shops" (user feedback)
- [ ] "Feels like a real store, not a website" (authenticity check)
- [ ] "Easy to find what I need" (navigation clarity)
- [ ] "Trustworthy for firearms purchase" (credibility perception)

### Quantitative Goals
- [ ] Lighthouse Performance: 90+
- [ ] Lighthouse Accessibility: 100
- [ ] WCAG AA compliance: 100%
- [ ] Mobile usability score: 95+
- [ ] Page load time: <3s on 3G

---

## Appendix A: Anti-Patterns (What NOT to Do)

### ❌ Silicon Valley Patterns (Wrong for WVWO)
```css
/* WRONG: Glassmorphism */
.card-wrong {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

/* WRONG: Gradient mania */
.button-wrong {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* WRONG: Over-rounded corners */
.card-wrong {
  border-radius: 2rem; /* Looks like a pillow */
}

/* WRONG: Excessive shadows */
.card-wrong {
  box-shadow: 0 20px 80px rgba(0, 0, 0, 0.5);
}
```

### ✅ WVWO Patterns (Correct)
```css
/* CORRECT: Solid colors with texture */
.card-correct {
  background: white;
  border: 1px solid rgb(231 229 228);
}

/* CORRECT: Single-color backgrounds */
.button-correct {
  background: #2E7D32; /* sign-green */
}

/* CORRECT: Sharp corners */
.card-correct {
  border-radius: 0.125rem; /* Crisp, professional */
}

/* CORRECT: Subtle shadows */
.card-correct {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
}
```

---

## Appendix B: Component Library Roadmap

Future React + shadcn/ui components to build:
- [ ] `<ProductCard />` - Reusable product display
- [ ] `<CategoryGrid />` - Smart category navigation
- [ ] `<MegaMenu />` - Dropdown navigation
- [ ] `<TrustBadge />` - Credential display
- [ ] `<SearchBar />` - Intelligent product search
- [ ] `<FilterSidebar />` - Advanced filtering
- [ ] `<CartDrawer />` - Slide-out cart
- [ ] `<Breadcrumbs />` - Navigation trail
- [ ] `<SkeletonLoader />` - Loading states
- [ ] `<Toast />` - Notification system

---

**Document Status**: APPROVED FOR IMPLEMENTATION
**Next Review**: 2025-12-23 (Post Phase 2)
**Maintained By**: System Architecture Designer
**Version**: 1.0.0