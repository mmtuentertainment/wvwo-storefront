/**
 * Image Optimization Script
 * Resizes and compresses shop images for faster loading
 *
 * Usage: node scripts/optimize-images.mjs
 */
import sharp from 'sharp';
import { readdir, stat, mkdir, writeFile, unlink, rename } from 'fs/promises';
import { join, extname, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const CONFIG = {
  products: {
    dir: join(__dirname, '../public/images/products'),
    maxWidth: 800,
    maxHeight: 800,
    quality: 85
  },
  categories: {
    dir: join(__dirname, '../public/images/categories'),
    maxWidth: 1200,
    maxHeight: 800,
    quality: 85
  }
};

async function optimizeImage(filePath, maxWidth, maxHeight, quality) {
  const ext = extname(filePath).toLowerCase();
  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
    return null;
  }

  const originalStats = await stat(filePath);
  const originalSize = originalStats.size;

  // Read and resize image
  const image = sharp(filePath);
  const metadata = await image.metadata();

  // Only resize if larger than max dimensions
  let resized = image;
  if (metadata.width > maxWidth || metadata.height > maxHeight) {
    resized = image.resize(maxWidth, maxHeight, {
      fit: 'inside',
      withoutEnlargement: true
    });
  }

  // Convert to JPEG with compression
  const buffer = await resized
    .jpeg({ quality, mozjpeg: true })
    .toBuffer();

  // Only save if smaller than original
  if (buffer.length < originalSize) {
    // Write to temp file first to avoid Windows lock issues
    const tempPath = filePath + '.tmp';
    await writeFile(tempPath, buffer);
    await unlink(filePath);
    await rename(tempPath, filePath);
    return {
      file: basename(filePath),
      originalSize,
      newSize: buffer.length,
      savings: Math.round((1 - buffer.length / originalSize) * 100)
    };
  }

  return {
    file: basename(filePath),
    originalSize,
    newSize: originalSize,
    savings: 0,
    skipped: true
  };
}

async function optimizeDirectory(name, config) {
  console.log(`\n📁 Optimizing ${name} images...`);
  console.log(`   Max: ${config.maxWidth}x${config.maxHeight}, Quality: ${config.quality}%\n`);

  try {
    const files = await readdir(config.dir);
    const results = [];

    for (const file of files) {
      const filePath = join(config.dir, file);
      const fileStat = await stat(filePath);

      if (fileStat.isFile()) {
        const result = await optimizeImage(
          filePath,
          config.maxWidth,
          config.maxHeight,
          config.quality
        );

        if (result) {
          results.push(result);
          const sizeStr = `${(result.originalSize / 1024).toFixed(0)}KB → ${(result.newSize / 1024).toFixed(0)}KB`;
          const status = result.skipped ? '⏭️  (already small)' : `✅ -${result.savings}%`;
          console.log(`   ${result.file}: ${sizeStr} ${status}`);
        }
      }
    }

    const totalOriginal = results.reduce((sum, r) => sum + r.originalSize, 0);
    const totalNew = results.reduce((sum, r) => sum + r.newSize, 0);
    const totalSavings = Math.round((1 - totalNew / totalOriginal) * 100);

    console.log(`\n   Total: ${(totalOriginal / 1024 / 1024).toFixed(2)}MB → ${(totalNew / 1024 / 1024).toFixed(2)}MB (-${totalSavings}%)`);

    return results;
  } catch (err) {
    console.error(`   Error: ${err.message}`);
    return [];
  }
}

async function main() {
  console.log('🖼️  WV Wild Outdoors Image Optimizer\n');
  console.log('=' .repeat(50));

  const productResults = await optimizeDirectory('products', CONFIG.products);
  const categoryResults = await optimizeDirectory('categories', CONFIG.categories);

  console.log('\n' + '='.repeat(50));
  console.log('✨ Optimization complete!');
  console.log(`   ${productResults.length} product images processed`);
  console.log(`   ${categoryResults.length} category images processed`);
}

main().catch(console.error);
