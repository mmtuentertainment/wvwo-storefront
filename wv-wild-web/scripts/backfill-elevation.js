/**
 * SPEC-07: Elevation Backfill Script
 * Uses Google Maps Elevation API to populate elevation_gain for adventures
 *
 * Usage: GOOGLE_MAPS_API_KEY=your_key node scripts/backfill-elevation.js
 *
 * Free Tier: 2,500 requests/day (covers 70 destinations easily)
 * API: https://developers.google.com/maps/documentation/elevation
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const ADVENTURES_DIR = path.join(__dirname, '../src/content/adventures');

if (!GOOGLE_MAPS_API_KEY) {
  console.error('❌ GOOGLE_MAPS_API_KEY environment variable required');
  console.error('Get key: https://console.cloud.google.com/google/maps-apis/credentials');
  console.error('Usage: GOOGLE_MAPS_API_KEY=your_key node scripts/backfill-elevation.js');
  process.exit(1);
}

/**
 * Fetch elevation for coordinates using Google Maps Elevation API
 */
async function getElevation(lat, lng) {
  const url = `https://maps.googleapis.com/maps/api/elevation/json?locations=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== 'OK') {
      throw new Error(`API error: ${data.status} - ${data.error_message || 'Unknown error'}`);
    }

    // Convert meters to feet
    const elevationMeters = data.results[0].elevation;
    const elevationFeet = Math.round(elevationMeters * 3.28084);

    return elevationFeet;
  } catch (error) {
    console.error(`Error fetching elevation for ${lat}, ${lng}:`, error.message);
    return null;
  }
}

/**
 * Parse frontmatter from markdown file
 */
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;

  const frontmatter = match[1];
  const body = content.slice(match[0].length);

  return { frontmatter, body, fullMatch: match[0] };
}

/**
 * Extract coordinates from frontmatter
 */
function extractCoordinates(frontmatter) {
  const latMatch = frontmatter.match(/lat:\s*([-\d.]+)/);
  const lngMatch = frontmatter.match(/lng:\s*([-\d.]+)/);

  if (!latMatch || !lngMatch) return null;

  return {
    lat: parseFloat(latMatch[1]),
    lng: parseFloat(lngMatch[1])
  };
}

/**
 * Check if frontmatter already has elevation_gain
 */
function hasElevation(frontmatter) {
  return /elevation_gain:\s*\d+/.test(frontmatter);
}

/**
 * Add elevation_gain to frontmatter (after coordinates section)
 */
function addElevationToFrontmatter(frontmatter, elevation) {
  // Find coordinates section and add elevation_gain after it
  const coordinatesEnd = frontmatter.indexOf('  lng:');
  if (coordinatesEnd === -1) {
    // No coordinates section, add at end of frontmatter
    return frontmatter + `elevation_gain: ${elevation}\n`;
  }

  const lngLineEnd = frontmatter.indexOf('\n', coordinatesEnd);
  const before = frontmatter.slice(0, lngLineEnd + 1);
  const after = frontmatter.slice(lngLineEnd + 1);

  return before + `elevation_gain: ${elevation}\n` + after;
}

/**
 * Process single adventure file
 */
async function processAdventure(filename) {
  const filepath = path.join(ADVENTURES_DIR, filename);
  const content = await fs.readFile(filepath, 'utf-8');

  const parsed = parseFrontmatter(content);
  if (!parsed) {
    console.log(`⚠️  ${filename}: No frontmatter found, skipping`);
    return { processed: false, reason: 'no-frontmatter' };
  }

  // Check if already has elevation
  if (hasElevation(parsed.frontmatter)) {
    console.log(`✅ ${filename}: Already has elevation_gain, skipping`);
    return { processed: false, reason: 'already-has-elevation' };
  }

  // Extract coordinates
  const coords = extractCoordinates(parsed.frontmatter);
  if (!coords) {
    console.log(`⚠️  ${filename}: No coordinates found, skipping`);
    return { processed: false, reason: 'no-coordinates' };
  }

  // Fetch elevation from Google Maps API
  console.log(`🌍 ${filename}: Fetching elevation for ${coords.lat}, ${coords.lng}...`);
  const elevation = await getElevation(coords.lat, coords.lng);

  if (elevation === null) {
    console.log(`❌ ${filename}: Failed to fetch elevation`);
    return { processed: false, reason: 'api-error' };
  }

  // Add elevation to frontmatter
  const updatedFrontmatter = addElevationToFrontmatter(parsed.frontmatter, elevation);
  const updatedContent = `---\n${updatedFrontmatter}---${parsed.body}`;

  // Write back to file
  await fs.writeFile(filepath, updatedContent, 'utf-8');

  console.log(`✅ ${filename}: Added elevation_gain: ${elevation} ft`);
  return { processed: true, elevation };
}

/**
 * Main execution
 */
async function main() {
  console.log('🚀 SPEC-07: Elevation Backfill Script');
  console.log('=====================================\n');

  // Read all adventure files
  const files = await fs.readdir(ADVENTURES_DIR);
  const markdownFiles = files.filter(f => f.endsWith('.md'));

  console.log(`Found ${markdownFiles.length} adventure(s) in ${ADVENTURES_DIR}\n`);

  const results = {
    processed: 0,
    skipped: 0,
    errors: 0,
  };

  // Process each file (with small delay to respect API rate limits)
  for (const file of markdownFiles) {
    const result = await processAdventure(file);

    if (result.processed) {
      results.processed++;
    } else {
      results.skipped++;
      if (result.reason === 'api-error') results.errors++;
    }

    // Small delay to be nice to Google's API (not required for free tier, but good practice)
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log('\n=====================================');
  console.log('📊 Summary:');
  console.log(`   Processed: ${results.processed}`);
  console.log(`   Skipped: ${results.skipped}`);
  console.log(`   Errors: ${results.errors}`);
  console.log('\n✅ Elevation backfill complete!');
  console.log('\nNext steps:');
  console.log('1. Manually add suitability flags (dog-friendly, kid-friendly, etc.)');
  console.log('2. Run: npm run build (test Astro build with new schema)');
  console.log('3. Verify: Check .astro/content.d.ts for updated types');
}

main().catch(console.error);
