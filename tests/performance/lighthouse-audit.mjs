#!/usr/bin/env node
/**
 * Lighthouse Performance Audit for WMA Pages
 * Target: T-032 - Lighthouse Audits
 *
 * Goals:
 * - Run Lighthouse on all 5 WMA pages
 * - Target: ≥95/100 Performance score
 * - Generate comprehensive performance reports
 * - Identify optimization bottlenecks
 */

import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

const LIGHTHOUSE_CONFIG = {
  // WMA pages to audit
  pages: [
    { name: 'Elk River', url: 'http://localhost:4321/near/elk-river' },
    { name: 'Burnsville Lake', url: 'http://localhost:4321/near/burnsville-lake' },
    { name: 'Summersville Lake', url: 'http://localhost:4321/near/summersville-lake' },
    { name: 'Holly River', url: 'http://localhost:4321/near/holly-river' },
    { name: 'Cranberry', url: 'http://localhost:4321/near/cranberry' }
  ],

  // Lighthouse options
  options: {
    logLevel: 'info',
    output: 'html',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    formFactor: 'desktop',
    throttling: {
      rttMs: 40,
      throughputKbps: 10 * 1024,
      cpuSlowdownMultiplier: 1
    }
  },

  // Mobile 3G throttling (for separate test)
  mobile3GOptions: {
    formFactor: 'mobile',
    throttling: {
      rttMs: 150,
      throughputKbps: 1.6 * 1024, // 3G speed
      cpuSlowdownMultiplier: 4
    }
  },

  // Performance targets from SPEC-12
  targets: {
    performance: 95,
    lcp: 2500, // ms
    fid: 100, // ms
    cls: 0.1,
    fcp: 1800, // ms
    loadTime3G: 2000 // ms
  },

  outputDir: 'tests/performance/reports'
};

/**
 * Run Lighthouse audit on a single page
 */
async function auditPage(chrome, page, options) {
  console.log(`\n🔍 Auditing: ${page.name}`);
  console.log(`   URL: ${page.url}`);

  try {
    const runnerResult = await lighthouse(page.url, {
      ...options,
      port: chrome.port
    });

    const { lhr, report } = runnerResult;

    // Extract key metrics
    const metrics = {
      pageName: page.name,
      url: page.url,
      scores: {
        performance: Math.round(lhr.categories.performance.score * 100),
        accessibility: Math.round(lhr.categories.accessibility.score * 100),
        bestPractices: Math.round(lhr.categories['best-practices'].score * 100),
        seo: Math.round(lhr.categories.seo.score * 100)
      },
      vitals: {
        fcp: lhr.audits['first-contentful-paint'].numericValue,
        lcp: lhr.audits['largest-contentful-paint'].numericValue,
        cls: lhr.audits['cumulative-layout-shift'].numericValue,
        tbt: lhr.audits['total-blocking-time'].numericValue,
        tti: lhr.audits['interactive'].numericValue,
        speedIndex: lhr.audits['speed-index'].numericValue
      },
      opportunities: lhr.audits['diagnostics'] ?
        Object.keys(lhr.audits)
          .filter(key => lhr.audits[key].score !== null && lhr.audits[key].score < 1)
          .map(key => ({
            id: key,
            title: lhr.audits[key].title,
            score: lhr.audits[key].score,
            numericValue: lhr.audits[key].numericValue
          }))
        : []
    };

    // Print results
    console.log(`\n   📊 Scores:`);
    console.log(`      Performance: ${metrics.scores.performance}/100 ${metrics.scores.performance >= LIGHTHOUSE_CONFIG.targets.performance ? '✅' : '❌'}`);
    console.log(`      Accessibility: ${metrics.scores.accessibility}/100`);
    console.log(`      Best Practices: ${metrics.scores.bestPractices}/100`);
    console.log(`      SEO: ${metrics.scores.seo}/100`);

    console.log(`\n   ⚡ Core Web Vitals:`);
    console.log(`      FCP: ${Math.round(metrics.vitals.fcp)}ms ${metrics.vitals.fcp <= LIGHTHOUSE_CONFIG.targets.fcp ? '✅' : '⚠️'}`);
    console.log(`      LCP: ${Math.round(metrics.vitals.lcp)}ms ${metrics.vitals.lcp <= LIGHTHOUSE_CONFIG.targets.lcp ? '✅' : '⚠️'}`);
    console.log(`      CLS: ${metrics.vitals.cls.toFixed(3)} ${metrics.vitals.cls <= LIGHTHOUSE_CONFIG.targets.cls ? '✅' : '⚠️'}`);
    console.log(`      TBT: ${Math.round(metrics.vitals.tbt)}ms`);
    console.log(`      TTI: ${Math.round(metrics.vitals.tti)}ms`);

    return { metrics, report };

  } catch (error) {
    console.error(`   ❌ Error auditing ${page.name}:`, error.message);
    return null;
  }
}

/**
 * Generate comprehensive report
 */
async function generateReport(results) {
  console.log('\n' + '='.repeat(70));
  console.log('LIGHTHOUSE PERFORMANCE AUDIT REPORT (T-032)');
  console.log('='.repeat(70));

  const allPassed = [];
  const needsWork = [];

  results.forEach(result => {
    if (!result) return;

    const { metrics } = result;
    const passed = metrics.scores.performance >= LIGHTHOUSE_CONFIG.targets.performance &&
                   metrics.vitals.lcp <= LIGHTHOUSE_CONFIG.targets.lcp &&
                   metrics.vitals.cls <= LIGHTHOUSE_CONFIG.targets.cls;

    if (passed) {
      allPassed.push(metrics.pageName);
    } else {
      needsWork.push(metrics);
    }
  });

  console.log(`\n✅ Pages meeting targets (≥95, LCP<2.5s, CLS<0.1): ${allPassed.length}/5`);
  if (allPassed.length > 0) {
    allPassed.forEach(name => console.log(`   - ${name}`));
  }

  if (needsWork.length > 0) {
    console.log(`\n⚠️  Pages needing optimization: ${needsWork.length}/5`);
    needsWork.forEach(metrics => {
      console.log(`\n   ${metrics.pageName}:`);
      console.log(`     Performance: ${metrics.scores.performance}/100 (target: ≥95)`);
      console.log(`     LCP: ${Math.round(metrics.vitals.lcp)}ms (target: <2500ms)`);
      console.log(`     CLS: ${metrics.vitals.cls.toFixed(3)} (target: <0.1)`);

      // Top opportunities
      if (metrics.opportunities.length > 0) {
        console.log(`     Top opportunities:`);
        metrics.opportunities
          .slice(0, 3)
          .forEach(opp => {
            console.log(`       - ${opp.title}`);
          });
      }
    });
  }

  // Calculate averages
  const validResults = results.filter(r => r !== null);
  const avgPerformance = validResults.length > 0 ? validResults.reduce((sum, r) => sum + r.metrics.scores.performance, 0) / validResults.length : 0;
  const avgLCP = validResults.length > 0 ? validResults.reduce((sum, r) => sum + r.metrics.vitals.lcp, 0) / validResults.length : 0;
  const avgCLS = validResults.length > 0 ? validResults.reduce((sum, r) => sum + r.metrics.vitals.cls, 0) / validResults.length : 0;

  console.log('\n📈 Average Metrics:');
  console.log(`   Performance Score: ${Math.round(avgPerformance)}/100`);
  console.log(`   LCP: ${Math.round(avgLCP)}ms`);
  console.log(`   CLS: ${avgCLS.toFixed(3)}`);

  console.log('\n🎯 SPEC-12 Target Compliance:');
  console.log(`   ✓ Lighthouse ≥95:     ${avgPerformance >= 95 ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`   ✓ LCP <2.5s:          ${avgLCP <= 2500 ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`   ✓ CLS <0.1:           ${avgCLS <= 0.1 ? '✅ PASS' : '❌ FAIL'}`);

  console.log('\n📋 Next Actions:');
  if (avgPerformance < 95) {
    console.log('   1. Review T-029: Image optimization (WebP, compression)');
    console.log('   2. Review T-030: Critical CSS inlining');
    console.log('   3. Review T-031: Font optimization and preloading');
  }
  if (avgLCP > 2500) {
    console.log('   - Optimize hero image loading (largest contentful paint)');
    console.log('   - Implement image lazy loading for below-fold content');
  }
  if (avgCLS > 0.1) {
    console.log('   - Set explicit width/height on images');
    console.log('   - Reserve space for dynamic content');
  }

  console.log('='.repeat(70));
}

/**
 * Main execution
 */
async function main() {
  console.log('Lighthouse Performance Audit - WMA Pages');
  console.log('Targets: Performance ≥95, LCP <2.5s, CLS <0.1\n');

  // Ensure output directory exists
  if (!existsSync(LIGHTHOUSE_CONFIG.outputDir)) {
    await mkdir(LIGHTHOUSE_CONFIG.outputDir, { recursive: true });
  }

  console.log('⚠️  Make sure dev server is running on http://localhost:4321');
  console.log('   Run: npm run dev');
  console.log('   Then run this audit script\n');

  // Launch Chrome
  console.log('🚀 Launching Chrome...');
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });

  try {
    const results = [];

    // Audit each page
    for (const page of LIGHTHOUSE_CONFIG.pages) {
      const result = await auditPage(chrome, page, LIGHTHOUSE_CONFIG.options);

      if (result) {
        results.push(result);

        // Save HTML report
        const reportPath = join(
          LIGHTHOUSE_CONFIG.outputDir,
          `${page.name.toLowerCase().replace(/\s+/g, '-')}-lighthouse.html`
        );
        await writeFile(reportPath, result.report);
        console.log(`   💾 Report saved: ${reportPath}`);
      }
    }

    // Generate summary report
    await generateReport(results);

    console.log(`\n✅ Audit complete! Reports saved to: ${LIGHTHOUSE_CONFIG.outputDir}`);

  } finally {
    await chrome.kill();
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { auditPage, LIGHTHOUSE_CONFIG };
