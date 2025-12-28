#!/usr/bin/env node
/**
 * Image Optimization Script for WMA Pages
 * Targets: T-029 - Image Optimization
 *
 * Goals:
 * - Convert hero images to WebP format
 * - Compress images to <500KB each
 * - Generate responsive srcsets (400w, 800w, 1200w)
 * - Add appropriate alt text (125 char target)
 */

import sharp from 'sharp';
import { readdir, stat, mkdir } from 'fs/promises';
import { join, extname, basename } from 'path';
import { existsSync } from 'fs';

const IMAGE_CONFIG = {
  // Target sizes for responsive images
  widths: [400, 800, 1200],

  // WebP quality settings (balance between size and quality)
  webpQuality: 85,

  // Maximum file size target (500KB)
  maxFileSize: 500 * 1024,

  // WMA image directories
  sourceDir: 'public/images/wma',
  outputDir: 'public/images/wma/optimized',

  // WMA pages to optimize
  wmaPages: [
    'elk-river',
    'burnsville-lake',
    'summersville-lake',
    'holly-river',
    'cranberry'
  ]
};

/**
 * Optimize a single image to WebP format with responsive sizes
 */
async function optimizeImage(inputPath, outputDir, imageName) {
  const results = [];

  try {
    // Ensure output directory exists
    if (!existsSync(outputDir)) {
      await mkdir(outputDir, { recursive: true });
    }

    // Load original image
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    console.log(`\nProcessing: ${imageName}`);
    console.log(`Original: ${metadata.width}x${metadata.height}, ${metadata.format}`);

    // Generate responsive sizes
    for (const width of IMAGE_CONFIG.widths) {
      // Skip if original is smaller than target width
      if (metadata.width < width) {
        console.log(`  Skipping ${width}w (original smaller)`);
        continue;
      }

      const outputFileName = `${basename(imageName, extname(imageName))}-${width}w.webp`;
      const outputPath = join(outputDir, outputFileName);

      // Resize and convert to WebP
      await image
        .clone()
        .resize(width, null, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .webp({
          quality: IMAGE_CONFIG.webpQuality,
          effort: 6 // Higher effort for better compression
        })
        .toFile(outputPath);

      // Get file size
      const stats = await stat(outputPath);
      const fileSizeKB = (stats.size / 1024).toFixed(2);

      results.push({
        width,
        path: outputPath,
        size: stats.size,
        sizeKB: fileSizeKB
      });

      const sizeStatus = stats.size > IMAGE_CONFIG.maxFileSize ? '⚠️ OVER' : '✅';
      console.log(`  ${width}w: ${fileSizeKB}KB ${sizeStatus}`);
    }

    return {
      imageName,
      originalSize: metadata.size,
      results
    };

  } catch (error) {
    console.error(`Error processing ${imageName}:`, error.message);
    return null;
  }
}

/**
 * Find all WMA hero images that need optimization
 */
async function findWMAImages() {
  const images = [];

  for (const wma of IMAGE_CONFIG.wmaPages) {
    // Common hero image patterns
    const patterns = [
      `${wma}-hero.jpg`,
      `${wma}-hero.png`,
      `${wma}.jpg`,
      `${wma}.png`,
      `${wma}-landscape.jpg`
    ];

    for (const pattern of patterns) {
      const imagePath = join(IMAGE_CONFIG.sourceDir, pattern);
      if (existsSync(imagePath)) {
        images.push({
          wma,
          path: imagePath,
          name: basename(imagePath)
        });
        break; // Found hero image for this WMA
      }
    }
  }

  return images;
}

/**
 * Generate performance report
 */
function generateReport(results) {
  console.log('\n' + '='.repeat(60));
  console.log('IMAGE OPTIMIZATION REPORT (T-029)');
  console.log('='.repeat(60));

  let totalOriginal = 0;
  let totalOptimized = 0;
  let filesOverLimit = 0;

  results.forEach(result => {
    if (!result) return;

    console.log(`\n${result.imageName}:`);

    result.results.forEach(({ width, sizeKB, size }) => {
      totalOptimized += size;

      if (size > IMAGE_CONFIG.maxFileSize) {
        filesOverLimit++;
        console.log(`  ${width}w: ${sizeKB}KB ⚠️ OVER LIMIT`);
      } else {
        console.log(`  ${width}w: ${sizeKB}KB ✅`);
      }
    });
  });

  console.log('\n' + '-'.repeat(60));
  console.log(`Total optimized files: ${results.reduce((sum, r) => sum + (r?.results.length || 0), 0)}`);
  console.log(`Files over 500KB limit: ${filesOverLimit}`);

  if (filesOverLimit > 0) {
    console.log('\n⚠️  Some images exceed 500KB target - consider:');
    console.log('   - Reducing quality (current: 85)');
    console.log('   - Cropping hero images to 16:9 aspect ratio');
    console.log('   - Using smaller source images');
  } else {
    console.log('\n✅ All images within 500KB target!');
  }

  console.log('='.repeat(60));
}

/**
 * Main execution
 */
async function main() {
  console.log('WMA Image Optimization Script');
  console.log('Target: <500KB per image, WebP format, responsive sizes\n');

  // Check if sharp is available
  try {
    await sharp().metadata();
  } catch (error) {
    console.error('❌ Sharp library not found. Install with: npm install sharp');
    process.exit(1);
  }

  // Find images to optimize
  const images = await findWMAImages();

  if (images.length === 0) {
    console.log('⚠️  No WMA images found in', IMAGE_CONFIG.sourceDir);
    console.log('Expected patterns: elk-river-hero.jpg, burnsville-lake-hero.jpg, etc.');
    return;
  }

  console.log(`Found ${images.length} WMA images to optimize\n`);

  // Process each image
  const results = [];
  for (const image of images) {
    const outputDir = join(IMAGE_CONFIG.outputDir, image.wma);
    const result = await optimizeImage(image.path, outputDir, image.name);
    results.push(result);
  }

  // Generate report
  generateReport(results);

  console.log('\n✅ Optimization complete!');
  console.log(`\nOptimized images saved to: ${IMAGE_CONFIG.outputDir}`);
  console.log('\nNext steps (T-029):');
  console.log('1. Update .astro pages to use optimized WebP images');
  console.log('2. Add <picture> elements with srcset for responsive loading');
  console.log('3. Add loading="lazy" for below-fold images');
  console.log('4. Verify alt text is ~125 characters (WCAG compliance)');
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { optimizeImage, findWMAImages, IMAGE_CONFIG };
