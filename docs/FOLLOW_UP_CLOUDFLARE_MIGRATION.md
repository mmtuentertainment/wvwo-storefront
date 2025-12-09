# Follow-up PR: Cloudflare Pages Migration

**Status**: Pending (after PR #9 merges)
**Branch**: `004-cloudflare-hosting`
**Created**: December 8, 2025

---

## Context

After PR #9 (design system enhancements) merges, migrate hosting from Netlify to Cloudflare Pages.

### Why Cloudflare over Netlify

- Unlimited bandwidth (Netlify caps at 100GB)
- No overage charges ever
- Fastest global CDN (300+ edge locations)
- Commercial use fully allowed
- Zero lock-in for static sites

### User Decisions (Confirmed)

- User has Cloudflare account
- Use Web3Forms for contact forms (250 free submissions/month)

---

## Implementation Checklist

### 1. Update `.github/workflows/deploy.yml`

Replace Netlify action with:

```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches: [main]
    paths:
      - 'wv-wild-web/**'
      - '.github/workflows/deploy.yml'
  workflow_dispatch:

jobs:
  deploy:
    name: Build & Deploy
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: wv-wild-web

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: wv-wild-web/package-lock.json

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to Cloudflare Pages
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          command: pages deploy dist --project-name=wv-wild-outdoors
```

### 2. Delete `netlify.toml`

No longer needed - Cloudflare auto-detects Astro.

### 3. Update `docs/README.md`

Replace Netlify section with:

```markdown
## CI/CD Pipeline

Hosted on **Cloudflare Pages** with GitHub Actions for validation.

### Why Cloudflare?

- **Unlimited bandwidth** - No overage charges ever
- **300+ edge locations** - Fastest global CDN
- **Deploy previews** - Test PRs before merging
- **Zero lock-in** - Static `dist/` folder works on any host
- **Commercial use allowed** - Unlike GitHub Pages

### Setup Requirements

1. Create a Cloudflare Pages project "wv-wild-outdoors"
2. Add repository secrets in GitHub:
   - `CLOUDFLARE_API_TOKEN` - Personal access token
   - `CLOUDFLARE_ACCOUNT_ID` - Your account ID

### Getting Cloudflare Credentials

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. **Account ID**:
   - Found in URL: `dash.cloudflare.com/ACCOUNT_ID/...`
   - Or: Overview page, right sidebar
3. **API Token**:
   - My Profile → API Tokens → Create Token
   - Use "Edit Cloudflare Workers" template
   - Or create custom with Pages:Edit permission

### Form Handling

Using Web3Forms for contact forms:

```html
<form action="https://api.web3forms.com/submit" method="POST">
  <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY">
  <input type="text" name="name" required />
  <input type="email" name="email" required />
  <textarea name="message" required></textarea>
  <button type="submit">Send</button>
</form>
```

Get access key at: https://web3forms.com (250 free submissions/month)
```

### 4. User Setup Tasks (Manual)

1. **GitHub Repository Settings**:
   - Add `CLOUDFLARE_API_TOKEN` secret
   - Add `CLOUDFLARE_ACCOUNT_ID` secret

2. **Cloudflare Dashboard**:
   - Create Pages project "wv-wild-outdoors"
   - Note: GitHub Actions handles deployment, no need to connect repo directly

3. **Web3Forms**:
   - Register at https://web3forms.com
   - Get access key
   - Add to contact form

---

## Technical Context

### Project Structure

```text
wvwo-storefront/
├── wv-wild-web/           # Astro site (monorepo subfolder)
│   ├── src/
│   │   ├── components/    # Astro components
│   │   ├── layouts/       # Page layouts
│   │   ├── pages/         # Routes
│   │   └── styles/        # global.css with @theme tokens
│   ├── public/            # Static assets
│   └── dist/              # Build output
├── docs/                  # Documentation
├── .github/workflows/     # CI/CD
└── netlify.toml          # To be deleted
```

### Design System Tokens

```css
--color-brand-brown: #3E2723  /* Primary background */
--color-sign-green: #2E7D32   /* CTAs, accents */
--color-brand-cream: #FFF8E1  /* Light backgrounds */
--color-brand-mud: #5D4037    /* Body text */
--color-brand-orange: #FF6F00 /* Highlights */
```

### Key Patterns

**ViewTransitions Idempotency**:
```javascript
if (btn.dataset.menuInit === 'true') return;
btn.dataset.menuInit = 'true';
document.addEventListener('astro:before-swap', cleanup, { once: true });
```

**Accessibility**:
- WCAG 2.1 AA compliance
- `focus-visible:ring-2 focus-visible:ring-brand-orange`
- `prefers-reduced-motion` respected

---

## Cost Summary

| Service | Cost |
|---------|------|
| Cloudflare Pages | $0/mo |
| Web3Forms (250 submissions) | $0/mo |
| **Total** | **$0/mo** |

---

## Future Phase: CMS Integration

When ready for content management:

**Option A: Railway + Directus (~$5-7/mo)**
- One-click Directus deploy
- PostgreSQL included
- Connect to Cloudflare frontend via API

**Option B: Hetzner + Coolify (~€5-10/mo)**
- Full control, one server
- Site + CMS + Database in one place
- Best long-term value
