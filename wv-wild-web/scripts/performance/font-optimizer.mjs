#!/usr/bin/env node
/**
 * Font Optimization for WVWO Brand Fonts
 * Target: T-031 - Font Optimization
 *
 * Goals:
 * - Subset Bitter, Noto Sans, Permanent Marker fonts
 * - Target: 150KB → 75KB total
 * - Implement font preloading for critical fonts
 * - Use font-display: swap for better FCP
 */

import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

const FONT_CONFIG = {
  // WVWO Brand Fonts
  fonts: [
    {
      name: 'Bitter',
      family: 'Bitter',
      weights: [700, 900], // Display headings only
      usage: 'display-headings',
      googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Bitter:wght@700;900&display=swap',
      preload: true, // Critical for hero headings
      priority: 1
    },
    {
      name: 'Noto Sans',
      family: 'Noto Sans',
      weights: [400, 700], // Body text
      usage: 'body-text',
      googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap',
      preload: true, // Critical for body text
      priority: 2
    },
    {
      name: 'Permanent Marker',
      family: 'Permanent Marker',
      weights: [400], // Kim's personal touches
      usage: 'handwritten-accents',
      googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap',
      preload: false, // Not critical, usually below-fold
      priority: 3
    }
  ],

  // Character subset for optimization
  // Common English + hunting/outdoor terms
  subset: 'latin',
  text: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,!?-\'\"()&:;',

  outputDir: 'public/fonts'
};

/**
 * Generate optimized font loading strategy
 */
function generateFontLoadingStrategy() {
  const strategy = {
    preload: [],
    async: [],
    css: []
  };

  FONT_CONFIG.fonts.forEach(font => {
    if (font.preload) {
      // Preload critical fonts
      strategy.preload.push({
        family: font.family,
        weights: font.weights,
        url: font.googleFontsUrl
      });
    } else {
      // Async load non-critical fonts
      strategy.async.push({
        family: font.family,
        weights: font.weights,
        url: font.googleFontsUrl
      });
    }

    // CSS font-face declarations
    font.weights.forEach(weight => {
      strategy.css.push(`
.font-${font.usage.split('-')[0]} {
  font-family: '${font.family}', ${font.usage.includes('display') ? 'serif' : 'sans-serif'};
  font-weight: ${weight};
  font-display: swap;
}
      `.trim());
    });
  });

  return strategy;
}

/**
 * Generate Astro font preload component
 */
async function generateFontPreloadComponent() {
  const strategy = generateFontLoadingStrategy();

  const component = `---
/**
 * FontPreload Component - WVWO Brand Fonts
 * Optimized font loading for Bitter, Noto Sans, Permanent Marker
 *
 * Target: 150KB → 75KB total (T-031)
 *
 * Usage in Layout.astro <head>:
 * <FontPreload />
 */
---

<!-- Preload Critical Fonts (Bitter Display, Noto Sans Body) -->
${strategy.preload.map(font => `
<!-- ${font.family} - Critical -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  rel="preload"
  as="style"
  href="${font.url}"
  onload="this.onload=null;this.rel='stylesheet'"
/>
<noscript>
  <link rel="stylesheet" href="${font.url}" />
</noscript>
`).join('\n')}

<!-- Async Load Non-Critical Fonts (Permanent Marker Accents) -->
${strategy.async.map(font => `
<!-- ${font.family} - Non-Critical (async) -->
<link
  rel="stylesheet"
  href="${font.url}"
  media="print"
  onload="this.media='all'"
/>
`).join('\n')}

<!-- Fallback Inline Styles -->
<style is:inline>
  /* WVWO Brand Font Declarations */
  /* Prevents FOIT (Flash of Invisible Text) */

  .font-display {
    font-family: 'Bitter', Georgia, serif;
    font-display: swap;
  }

  .font-body {
    font-family: 'Noto Sans', Arial, sans-serif;
    font-display: swap;
  }

  .font-hand {
    font-family: 'Permanent Marker', 'Comic Sans MS', cursive;
    font-display: swap;
  }

  /* Font weight helpers */
  .font-bold { font-weight: 700; }
  .font-black { font-weight: 900; }
</style>
`;

  const componentPath = join(process.cwd(), 'src/components', 'FontPreload.astro');
  await writeFile(componentPath, component);
  console.log(`✅ Created: ${componentPath}`);

  return componentPath;
}

/**
 * Generate font optimization report
 */
function generateReport() {
  console.log('\n' + '='.repeat(60));
  console.log('FONT OPTIMIZATION REPORT (T-031)');
  console.log('='.repeat(60));

  console.log('\n📊 Font Strategy:');
  FONT_CONFIG.fonts.forEach(font => {
    const preloadStatus = font.preload ? '🚀 PRELOAD' : '⏱️  ASYNC';
    const weights = font.weights.join(', ');
    console.log(`  ${font.name}: ${preloadStatus} (weights: ${weights})`);
    console.log(`    Usage: ${font.usage}`);
    console.log(`    Priority: ${font.priority}`);
  });

  console.log('\n🎯 Optimization Targets:');
  console.log('  Current estimated: ~150KB');
  console.log('  Target: <75KB');
  console.log('  Strategy:');
  console.log('    - Subset to latin characters only');
  console.log('    - Load only 700+900 weights for Bitter (not full range)');
  console.log('    - Preload critical fonts (Bitter, Noto Sans)');
  console.log('    - Async load Permanent Marker (below-fold usage)');
  console.log('    - Use font-display: swap (prevent FOIT)');

  console.log('\n📋 Implementation Checklist:');
  console.log('  ✅ FontPreload component created');
  console.log('  ⏳ Add <FontPreload /> to Layout.astro <head>');
  console.log('  ⏳ Remove old Google Fonts links');
  console.log('  ⏳ Verify font loading in Network tab');
  console.log('  ⏳ Test with Lighthouse (Performance score)');
  console.log('  ⏳ Validate font-display: swap in DevTools');

  console.log('\n🔍 Verification Steps:');
  console.log('  1. Check Network tab: Fonts should load in priority order');
  console.log('  2. Lighthouse audit: No "Ensure text remains visible" warnings');
  console.log('  3. Total font size: Should be <75KB');
  console.log('  4. FCP improvement: Should be <1.8s on 3G');

  console.log('='.repeat(60));
}

/**
 * Main execution
 */
async function main() {
  console.log('WVWO Font Optimization');
  console.log('Fonts: Bitter (display), Noto Sans (body), Permanent Marker (accents)');
  console.log('Target: 150KB → 75KB\n');

  // Ensure output directory exists
  if (!existsSync(FONT_CONFIG.outputDir)) {
    await mkdir(FONT_CONFIG.outputDir, { recursive: true });
  }

  // Generate font preload component
  await generateFontPreloadComponent();

  // Generate optimization report
  generateReport();

  console.log('\n✅ Font optimization setup complete!');
  console.log('\n💡 Next steps:');
  console.log('  1. Import FontPreload in Layout.astro');
  console.log('  2. Replace existing Google Fonts links');
  console.log('  3. Test with npm run dev');
  console.log('  4. Verify with Lighthouse audit');
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { generateFontLoadingStrategy, FONT_CONFIG };
