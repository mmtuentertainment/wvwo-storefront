#!/usr/bin/env node
/**
 * Bundle Analysis for WMA Pages
 * Target: T-033 - Bundle Analysis
 *
 * Goals:
 * - Analyze per-component bundle sizes
 * - Validate total page weight <500KB
 * - Identify optimization opportunities
 * - Verify Tailwind tree-shaking (3MB → 15KB)
 */

import { readdir, stat } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

const BUNDLE_CONFIG = {
  // Directories to analyze
  distDir: 'dist',

  // WMA pages
  pages: [
    'near/elk-river',
    'near/burnsville-lake',
    'near/summersville-lake',
    'near/holly-river',
    'near/cranberry'
  ],

  // Target limits from SPEC-12
  targets: {
    totalPageWeight: 500 * 1024, // 500KB
    jsBundle: 150 * 1024, // 150KB
    cssBundle: 15 * 1024, // 15KB (after Tailwind tree-shaking)
    htmlSize: 50 * 1024, // 50KB
    images: 500 * 1024 // 500KB total for hero images
  },

  // File patterns
  patterns: {
    js: /\.js$/,
    css: /\.css$/,
    html: /\.html$/,
    images: /\.(jpg|jpeg|png|webp|avif|gif|svg)$/i,
    fonts: /\.(woff|woff2|ttf|otf|eot)$/i
  }
};

/**
 * Get file size recursively
 */
async function getDirectorySize(dirPath, pattern = null) {
  let totalSize = 0;
  const files = [];

  if (!existsSync(dirPath)) {
    return { totalSize: 0, files: [] };
  }

  const entries = await readdir(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dirPath, entry.name);

    if (entry.isDirectory()) {
      const subResult = await getDirectorySize(fullPath, pattern);
      totalSize += subResult.totalSize;
      files.push(...subResult.files);
    } else if (entry.isFile()) {
      if (!pattern || pattern.test(entry.name)) {
        const stats = await stat(fullPath);
        totalSize += stats.size;
        files.push({
          path: fullPath,
          name: entry.name,
          size: stats.size
        });
      }
    }
  }

  return { totalSize, files };
}

/**
 * Analyze a single WMA page bundle
 */
async function analyzePageBundle(pagePath) {
  console.log(`\n📦 Analyzing: ${pagePath}`);

  const pageDistPath = join(BUNDLE_CONFIG.distDir, pagePath);

  if (!existsSync(pageDistPath)) {
    console.log(`   ⚠️  Not found in dist: ${pageDistPath}`);
    return null;
  }

  // Analyze different asset types
  const jsResult = await getDirectorySize(pageDistPath, BUNDLE_CONFIG.patterns.js);
  const cssResult = await getDirectorySize(pageDistPath, BUNDLE_CONFIG.patterns.css);
  const htmlResult = await getDirectorySize(pageDistPath, BUNDLE_CONFIG.patterns.html);
  const imageResult = await getDirectorySize(pageDistPath, BUNDLE_CONFIG.patterns.images);
  const fontResult = await getDirectorySize(pageDistPath, BUNDLE_CONFIG.patterns.fonts);

  const totalSize = jsResult.totalSize + cssResult.totalSize +
                    htmlResult.totalSize + imageResult.totalSize +
                    fontResult.totalSize;

  const analysis = {
    page: pagePath,
    totalSize,
    totalSizeKB: (totalSize / 1024).toFixed(2),
    breakdown: {
      js: {
        size: jsResult.totalSize,
        sizeKB: (jsResult.totalSize / 1024).toFixed(2),
        files: jsResult.files.length,
        target: BUNDLE_CONFIG.targets.jsBundle,
        status: jsResult.totalSize <= BUNDLE_CONFIG.targets.jsBundle ? '✅' : '⚠️'
      },
      css: {
        size: cssResult.totalSize,
        sizeKB: (cssResult.totalSize / 1024).toFixed(2),
        files: cssResult.files.length,
        target: BUNDLE_CONFIG.targets.cssBundle,
        status: cssResult.totalSize <= BUNDLE_CONFIG.targets.cssBundle ? '✅' : '⚠️'
      },
      html: {
        size: htmlResult.totalSize,
        sizeKB: (htmlResult.totalSize / 1024).toFixed(2),
        files: htmlResult.files.length,
        target: BUNDLE_CONFIG.targets.htmlSize,
        status: htmlResult.totalSize <= BUNDLE_CONFIG.targets.htmlSize ? '✅' : '⚠️'
      },
      images: {
        size: imageResult.totalSize,
        sizeKB: (imageResult.totalSize / 1024).toFixed(2),
        files: imageResult.files.length,
        target: BUNDLE_CONFIG.targets.images,
        status: imageResult.totalSize <= BUNDLE_CONFIG.targets.images ? '✅' : '⚠️'
      },
      fonts: {
        size: fontResult.totalSize,
        sizeKB: (fontResult.totalSize / 1024).toFixed(2),
        files: fontResult.files.length
      }
    },
    meetsTarget: totalSize <= BUNDLE_CONFIG.targets.totalPageWeight
  };

  // Print results
  console.log(`   Total: ${analysis.totalSizeKB}KB ${analysis.meetsTarget ? '✅' : '⚠️ OVER'} (target: ${BUNDLE_CONFIG.targets.totalPageWeight / 1024}KB)`);
  console.log(`   Breakdown:`);
  console.log(`     JS:     ${analysis.breakdown.js.sizeKB}KB (${analysis.breakdown.js.files} files) ${analysis.breakdown.js.status}`);
  console.log(`     CSS:    ${analysis.breakdown.css.sizeKB}KB (${analysis.breakdown.css.files} files) ${analysis.breakdown.css.status}`);
  console.log(`     HTML:   ${analysis.breakdown.html.sizeKB}KB (${analysis.breakdown.html.files} files) ${analysis.breakdown.html.status}`);
  console.log(`     Images: ${analysis.breakdown.images.sizeKB}KB (${analysis.breakdown.images.files} files) ${analysis.breakdown.images.status}`);
  console.log(`     Fonts:  ${analysis.breakdown.fonts.sizeKB}KB (${analysis.breakdown.fonts.files} files)`);

  return analysis;
}

/**
 * Analyze Tailwind CSS tree-shaking effectiveness
 */
async function analyzeTailwindTreeShaking() {
  console.log('\n🌲 Tailwind Tree-Shaking Analysis:');

  const cssFiles = await getDirectorySize(BUNDLE_CONFIG.distDir, BUNDLE_CONFIG.patterns.css);

  if (cssFiles.files.length === 0) {
    console.log('   ⚠️  No CSS files found in dist');
    return null;
  }

  const largestCSS = cssFiles.files.sort((a, b) => b.size - a.size)[0];

  console.log(`   Main CSS bundle: ${(largestCSS.size / 1024).toFixed(2)}KB`);
  console.log(`   Original Tailwind: ~3MB`);
  console.log(`   Target after tree-shaking: ~15KB`);

  const reductionPercent = ((1 - largestCSS.size / (3 * 1024 * 1024)) * 100).toFixed(1);
  console.log(`   Reduction: ${reductionPercent}%`);

  if (largestCSS.size <= BUNDLE_CONFIG.targets.cssBundle) {
    console.log(`   ✅ Tree-shaking effective! Under 15KB target`);
  } else {
    console.log(`   ⚠️  CSS still large - check for unused utilities`);
    console.log(`   Consider: purge in tailwind.config, remove unused components`);
  }

  return {
    size: largestCSS.size,
    sizeKB: (largestCSS.size / 1024).toFixed(2),
    reduction: reductionPercent,
    effective: largestCSS.size <= BUNDLE_CONFIG.targets.cssBundle
  };
}

/**
 * Generate optimization recommendations
 */
function generateRecommendations(analyses) {
  const recommendations = [];

  analyses.forEach(analysis => {
    if (!analysis) return;

    // Check each category
    if (analysis.breakdown.js.size > BUNDLE_CONFIG.targets.jsBundle) {
      recommendations.push({
        page: analysis.page,
        category: 'JavaScript',
        issue: `JS bundle ${analysis.breakdown.js.sizeKB}KB exceeds ${BUNDLE_CONFIG.targets.jsBundle / 1024}KB target`,
        actions: [
          'Code split large components',
          'Lazy load below-fold features',
          'Remove unused dependencies',
          'Minify and compress JS bundles'
        ]
      });
    }

    if (analysis.breakdown.css.size > BUNDLE_CONFIG.targets.cssBundle) {
      recommendations.push({
        page: analysis.page,
        category: 'CSS',
        issue: `CSS bundle ${analysis.breakdown.css.sizeKB}KB exceeds ${BUNDLE_CONFIG.targets.cssBundle / 1024}KB target`,
        actions: [
          'Verify Tailwind purge is working',
          'Remove unused CSS utilities',
          'Check for duplicate styles',
          'Use critical CSS extraction (T-030)'
        ]
      });
    }

    if (analysis.breakdown.images.size > BUNDLE_CONFIG.targets.images) {
      recommendations.push({
        page: analysis.page,
        category: 'Images',
        issue: `Image size ${analysis.breakdown.images.sizeKB}KB exceeds ${BUNDLE_CONFIG.targets.images / 1024}KB target`,
        actions: [
          'Run image optimizer (T-029)',
          'Convert to WebP format',
          'Compress hero images',
          'Implement responsive srcsets'
        ]
      });
    }
  });

  return recommendations;
}

/**
 * Generate comprehensive report
 */
function generateReport(analyses, tailwindAnalysis, recommendations) {
  console.log('\n' + '='.repeat(70));
  console.log('BUNDLE ANALYSIS REPORT (T-033)');
  console.log('='.repeat(70));

  const validAnalyses = analyses.filter(a => a !== null);

  if (validAnalyses.length === 0) {
    console.log('\n⚠️  No bundle data found. Run `npm run build` first.');
    console.log('='.repeat(70));
    return;
  }

  // Summary statistics
  const avgTotalSize = validAnalyses.reduce((sum, a) => sum + a.totalSize, 0) / validAnalyses.length;
  const pagesMeetingTarget = validAnalyses.filter(a => a.meetsTarget).length;

  console.log(`\n📊 Summary:`);
  console.log(`   Pages analyzed: ${validAnalyses.length}/5`);
  console.log(`   Meeting <500KB target: ${pagesMeetingTarget}/${validAnalyses.length}`);
  console.log(`   Average page weight: ${(avgTotalSize / 1024).toFixed(2)}KB`);

  // Tailwind results
  if (tailwindAnalysis) {
    console.log(`\n🌲 Tailwind CSS:`);
    console.log(`   Bundle size: ${tailwindAnalysis.sizeKB}KB`);
    console.log(`   Size reduction: ${tailwindAnalysis.reduction}%`);
    console.log(`   Status: ${tailwindAnalysis.effective ? '✅ Effective tree-shaking' : '⚠️ Needs optimization'}`);
  }

  // Recommendations
  if (recommendations.length > 0) {
    console.log(`\n⚠️  Optimization Opportunities (${recommendations.length}):`);
    recommendations.forEach((rec, i) => {
      console.log(`\n   ${i + 1}. ${rec.page} - ${rec.category}`);
      console.log(`      Issue: ${rec.issue}`);
      console.log(`      Actions:`);
      rec.actions.forEach(action => {
        console.log(`        - ${action}`);
      });
    });
  } else {
    console.log(`\n✅ All pages optimized! No issues found.`);
  }

  console.log('\n🎯 SPEC-12 Compliance:');
  console.log(`   ✓ Page weight <500KB:  ${pagesMeetingTarget === validAnalyses.length ? '✅ PASS' : '⚠️ NEEDS WORK'}`);
  console.log(`   ✓ CSS <15KB:           ${tailwindAnalysis?.effective ? '✅ PASS' : '⚠️ NEEDS WORK'}`);

  console.log('='.repeat(70));
}

/**
 * Main execution
 */
async function main() {
  console.log('Bundle Analysis for WMA Pages');
  console.log('Target: <500KB total page weight\n');

  if (!existsSync(BUNDLE_CONFIG.distDir)) {
    console.error('❌ dist directory not found. Run `npm run build` first.');
    process.exit(1);
  }

  const analyses = [];

  // Analyze each WMA page
  for (const page of BUNDLE_CONFIG.pages) {
    const analysis = await analyzePageBundle(page);
    analyses.push(analysis);
  }

  // Analyze Tailwind tree-shaking
  const tailwindAnalysis = await analyzeTailwindTreeShaking();

  // Generate recommendations
  const recommendations = generateRecommendations(analyses);

  // Generate comprehensive report
  generateReport(analyses, tailwindAnalysis, recommendations);

  console.log('\n✅ Bundle analysis complete!');
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { analyzePageBundle, analyzeTailwindTreeShaking, BUNDLE_CONFIG };
