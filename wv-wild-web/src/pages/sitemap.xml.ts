import type { APIRoute } from 'astro';

// Static pages for the sitemap
const pages = [
  { url: '/', priority: 1.0, changefreq: 'weekly' },
  { url: '/products', priority: 0.9, changefreq: 'weekly' },
  { url: '/ffl-transfers', priority: 0.8, changefreq: 'monthly' },
  { url: '/contact', priority: 0.8, changefreq: 'monthly' },
  { url: '/story', priority: 0.7, changefreq: 'monthly' },
  { url: '/buck-season', priority: 0.8, changefreq: 'monthly' },
  { url: '/subscribe', priority: 0.6, changefreq: 'monthly' },
  { url: '/privacy', priority: 0.3, changefreq: 'yearly' },
  { url: '/terms', priority: 0.3, changefreq: 'yearly' },
];

const site = 'https://wvwildoutdoors.com';

export const GET: APIRoute = () => {
  const lastmod = new Date().toISOString().split('T')[0];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${site}${page.url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
