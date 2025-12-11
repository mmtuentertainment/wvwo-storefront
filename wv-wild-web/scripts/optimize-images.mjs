/**
 * Image Optimization Script
 * Resizes and compresses shop images for faster loading
 *
 * Usage: node scripts/optimize-images.mjs
 */
import sharp from 'sharp';
import { readdir, stat, mkdir, writeFile, rename } from 'fs/promises';
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

  // Re-encode using the existing format so file contents match extension
  let pipeline = resized;
  if (ext === '.jpg' || ext === '.jpeg') {
    pipeline = pipeline.jpeg({ quality, mozjpeg: true });
  } else if (ext === '.png') {
    pipeline = pipeline.png({ quality, compressionLevel: 9 });
  } else if (ext === '.webp') {
    pipeline = pipeline.webp({ quality });
  }

  const buffer = await pipeline.toBuffer();

  // Only save if smaller than original
  if (buffer.length < originalSize) {
    // Write to temp file, then atomic rename (overwrites original)
    const tempPath = filePath + '.tmp';
    await writeFile(tempPath, buffer);
    await rename(tempPath, filePath);
    const savings = originalSize > 0
      ? Math.round((1 - buffer.length / originalSize) * 100)
      : 0;

    return {
      file: basename(filePath),
      originalSize,
      newSize: buffer.length,
      savings
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
        try {
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
        } catch (err) {
          console.error(`   ❌ ${file}: ${err.message}`);
        }
      }
    }

    const totalOriginal = results.reduce((sum, r) => sum + r.originalSize, 0);
    const totalNew = results.reduce((sum, r) => sum + r.newSize, 0);

    if (totalOriginal > 0) {
      const totalSavings = Math.round((1 - totalNew / totalOriginal) * 100);
      console.log(
        `\n   Total: ${(totalOriginal / 1024 / 1024).toFixed(2)}MB → ${(totalNew / 1024 / 1024).toFixed(2)}MB (-${totalSavings}%)`
      );
    } else {
      console.log('\n   Total: 0.00MB → 0.00MB (-0%)');
    }

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

main().catch(err => {
  console.error(err);
  process.exit(1);
});
