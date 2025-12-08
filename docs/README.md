# WV Wild Outdoors - Development Documentation

Technical documentation for the WV Wild Outdoors storefront website.

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Astro | 5.x | Static site framework |
| Tailwind CSS | 4.x | Utility-first styling |
| ViewTransitions | - | Page transition animations |

## Design System

### Brand Colors

Extracted from the store's physical signage for authentic representation.

| Token | Hex | Usage |
|-------|-----|-------|
| `brand-brown` | `#3E2723` | Primary background, headers |
| `sign-green` | `#2E7D32` | CTAs, accents, signage style |
| `brand-cream` | `#FFF8E1` | Light backgrounds, cards |
| `brand-mud` | `#5D4037` | Body text, secondary elements |
| `brand-orange` | `#FF6F00` | Hunter safety, highlights |

### Typography

| Token | Font | Usage |
|-------|------|-------|
| `font-display` | Roboto Slab | Headlines, signage |
| `font-hand` | Caveat | Handwritten accents ("Since 2008") |
| `font-body` | Archivo | Body text, navigation |

### Usage in Classes

```html
<!-- Colors -->
<div class="bg-brand-brown text-brand-cream">
<span class="text-brand-orange">

<!-- Typography -->
<h1 class="font-display font-bold">
<span class="font-hand -rotate-2">
<p class="font-body">
```

## Component Architecture

```
src/
├── layouts/
│   └── Layout.astro        # Base HTML wrapper
├── components/
│   ├── Header.astro        # Sticky nav + mobile menu
│   ├── Footer.astro        # Contact info + FFL disclaimer
│   ├── Hero.astro          # Landing hero section
│   ├── InventoryGrid.astro # Product category cards
│   ├── Services.astro      # Service offerings
│   ├── Visit.astro         # Location & hours
│   ├── StorySection.astro  # About preview
│   ├── ContactStrip.astro  # Quick contact CTA
│   └── Ticker.astro        # Scrolling announcements
├── pages/
│   ├── index.astro         # Homepage
│   └── story.astro         # Our Story page
├── config/
│   └── siteContact.ts      # Centralized contact info
└── styles/
    └── global.css          # Tailwind theme config
```

## Development

```bash
cd wv-wild-web

# Install dependencies
npm install

# Start dev server (http://localhost:4321)
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## Accessibility Standards

This project targets **WCAG 2.1 AA** compliance:

### Implemented

- **Focus indicators**: All interactive elements use `focus-visible:ring-2 focus-visible:ring-brand-orange`
- **Keyboard navigation**: Escape key closes mobile menu, returns focus to trigger
- **Reduced motion**: Animations respect `prefers-reduced-motion`
- **ARIA attributes**: Proper `aria-expanded`, `aria-controls`, `aria-label` on interactive elements
- **Color contrast**: All text meets 4.5:1 minimum ratio
- **Semantic HTML**: Proper heading hierarchy, landmark regions

### Testing

- Lighthouse accessibility audit
- Manual keyboard-only navigation
- Screen reader testing (VoiceOver/NVDA)

## ViewTransitions

The site uses Astro's ViewTransitions for smooth page navigation:

```astro
<!-- Layout.astro -->
<ViewTransitions />

<!-- Components re-initialize on navigation -->
document.addEventListener('astro:page-load', initMobileMenu);
document.addEventListener('astro:before-swap', cleanup);
```

### Idempotency Pattern

Event listeners use data attributes to prevent stacking:

```javascript
if (btn.dataset.menuInit === 'true') return;
btn.dataset.menuInit = 'true';
```

## File Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| Components | PascalCase.astro | `Header.astro` |
| Pages | lowercase.astro | `story.astro` |
| Config | camelCase.ts | `siteContact.ts` |
| Images | kebab-case.jpg | `story-old-shop-flood.jpg` |

## Related Documentation

- [mission.md](./mission.md) - Project requirements and business context
- [plan_design.md](./plan_design.md) - Design planning and component specs
- [rules.md](./rules.md) - Development guidelines
- [BLUEPRINT.md](./BLUEPRINT.md) - Full project blueprint
