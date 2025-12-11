# WV Wild Outdoors - Website

Static website for WV Wild Outdoors, a family-owned sporting goods store in Birch River, WV.

## Tech Stack

- **Astro 5.x** - Static site generation
- **Tailwind CSS 4.x** - Styling with custom brand tokens
- **Vanilla JavaScript** - Minimal interactivity (no frameworks)
- **Cloudflare Pages** - Hosting

## Commands

All commands run from this directory (`wv-wild-web/`):

| Command | Action |
| :--- | :--- |
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview build locally |
| `npm run optimize-images` | Compress product/category images |

## Image Optimization

The shop displays product and category images that need to stay fast-loading for rural WV internet connections.

### Why
Sharp-based compression keeps images small without manual resizing. The optimizer:
- Resizes products to max 800x800px
- Resizes category banners to max 1200x800px
- Compresses at 85% quality (preserves original format: JPG, PNG, WebP)
- Only overwrites if the new file is smaller

### When to Run
Before deploying new product or category images:
1. Add images to `public/images/products/` or `public/images/categories/`
2. Run `npm run optimize-images`
3. Commit the optimized images

### Example Output
```
📁 Optimizing products images...
   Max: 800x800, Quality: 85%

   hornady-precision-hunter.jpg: 245KB → 89KB ✅ -64%
   mossberg-500.jpg: 1823KB → 187KB ✅ -90%

   Total: 1.20MB → 0.44MB (-64%)
```

## Project Structure

```text
wv-wild-web/
├── public/
│   └── images/
│       ├── categories/   # Category hero images
│       └── products/     # Product photos
├── scripts/
│   └── optimize-images.mjs
├── src/
│   ├── components/       # Astro components
│   ├── config/           # Site config (contact info, etc.)
│   ├── data/             # store.json (products/categories)
│   ├── layouts/          # Page layouts
│   └── pages/            # Routes
│       └── shop/         # Shop pages
└── package.json
```

## Brand Colors (Tailwind)

- `brand-brown` - Primary text/headers
- `brand-orange` - Accents, CTAs
- `brand-cream` - Backgrounds
- `sign-green` - Success states, in-stock badges
