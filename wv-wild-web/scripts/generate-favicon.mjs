/**
 * Generate favicon.ico from favicon.svg
 * Uses sharp for SVG→PNG conversion and to-ico for ICO generation
 */
import sharp from 'sharp';
import toIco from 'to-ico';
import { writeFileSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

async function generateFavicon() {
  console.log('Generating favicon.ico from favicon.svg...');

  const svgPath = join(publicDir, 'favicon.svg');
  const icoPath = join(publicDir, 'favicon.ico');

  // Read SVG and set fill to black (ICO doesn't support CSS media queries)
  let svgContent = readFileSync(svgPath, 'utf8');
  // Remove the style block and set explicit fill
  svgContent = svgContent.replace(/<style>[\s\S]*?<\/style>/, '');
  svgContent = svgContent.replace('fill="none"', 'fill="none"');
  svgContent = svgContent.replace('<path d=', '<path fill="#3E2723" d=');

  const svgBuffer = Buffer.from(svgContent);

  // Generate PNG at multiple sizes for ICO
  const sizes = [16, 32, 48];
  const pngBuffers = await Promise.all(
    sizes.map(size =>
      sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toBuffer()
    )
  );

  // Convert to ICO
  const icoBuffer = await toIco(pngBuffers);
  writeFileSync(icoPath, icoBuffer);

  console.log(`✓ Generated ${icoPath}`);
}

generateFavicon().catch(console.error);
