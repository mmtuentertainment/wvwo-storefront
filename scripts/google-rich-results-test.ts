/**
 * Google Rich Results Test Automation
 * SPEC-14 Phase 6: SEO Validation
 *
 * Builds test page, extracts JSON-LD, and validates with Google Rich Results Test
 */

import * as fs from 'fs';
import * as path from 'path';
import { JSDOM } from 'jsdom';

interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  schema: any;
}

async function extractJsonLd(htmlPath: string): Promise<any> {
  const html = fs.readFileSync(htmlPath, 'utf-8');
  const dom = new JSDOM(html);
  const document = dom.window.document;

  const jsonLdScript = document.querySelector('script[type="application/ld+json"]');

  if (!jsonLdScript) {
    throw new Error('No JSON-LD script found in HTML');
  }

  const jsonLdContent = jsonLdScript.textContent;
  if (!jsonLdContent) {
    throw new Error('JSON-LD script is empty');
  }

  return JSON.parse(jsonLdContent);
}

function validatePlaceEntity(placeEntity: any): string[] {
  const errors: string[] = [];

  // Required fields for Place
  if (!placeEntity.name) {
    errors.push('Place entity missing required field: name');
  }

  if (!placeEntity.geo) {
    errors.push('Place entity missing required field: geo');
  } else {
    if (placeEntity.geo['@type'] !== 'GeoCoordinates') {
      errors.push('geo must be of type GeoCoordinates');
    }
    if (!placeEntity.geo.latitude) {
      errors.push('GeoCoordinates missing latitude');
    }
    if (!placeEntity.geo.longitude) {
      errors.push('GeoCoordinates missing longitude');
    }
  }

  if (!placeEntity.address) {
    errors.push('Place entity missing recommended field: address');
  }

  return errors;
}

function validateTouristAttraction(attraction: any): string[] {
  const errors: string[] = [];

  // Required fields for TouristAttraction
  if (!attraction.name) {
    errors.push('TouristAttraction missing required field: name');
  }

  if (!attraction.description) {
    errors.push('TouristAttraction missing required field: description');
  }

  if (!attraction.touristType) {
    errors.push('TouristAttraction missing recommended field: touristType');
  }

  if (!attraction.geo && !attraction.address) {
    errors.push('TouristAttraction should have either geo or address');
  }

  return errors;
}

function validateBodyOfWater(bodyOfWater: any): string[] {
  const errors: string[] = [];

  if (!bodyOfWater.name) {
    errors.push('BodyOfWater missing required field: name');
  }

  if (!bodyOfWater.geo) {
    errors.push('BodyOfWater missing recommended field: geo');
  }

  return errors;
}

function validateSchema(schema: any): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Validate @context
  if (schema['@context'] !== 'https://schema.org') {
    errors.push('Invalid @context. Must be "https://schema.org"');
  }

  // Validate @graph exists
  if (!schema['@graph']) {
    errors.push('Missing @graph array');
    return { valid: false, errors, warnings, schema };
  }

  if (!Array.isArray(schema['@graph'])) {
    errors.push('@graph must be an array');
    return { valid: false, errors, warnings, schema };
  }

  // Find and validate Place entity
  const placeEntity = schema['@graph'].find((item: any) => item['@type'] === 'Place');
  if (!placeEntity) {
    errors.push('No Place entity found in @graph');
  } else {
    errors.push(...validatePlaceEntity(placeEntity));
  }

  // Find and validate TouristAttraction
  const attractionEntity = schema['@graph'].find((item: any) =>
    item['@type'] === 'TouristAttraction'
  );
  if (!attractionEntity) {
    warnings.push('No TouristAttraction entity found (recommended for rivers)');
  } else {
    errors.push(...validateTouristAttraction(attractionEntity));
  }

  // Find and validate BodyOfWater
  const bodyOfWaterEntity = schema['@graph'].find((item: any) =>
    item['@type'] === 'BodyOfWater'
  );
  if (!bodyOfWaterEntity) {
    warnings.push('No BodyOfWater entity found (optional but recommended)');
  } else {
    errors.push(...validateBodyOfWater(bodyOfWaterEntity));
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    schema
  };
}

async function generateReport(result: ValidationResult, outputPath: string): Promise<void> {
  const report = `
Google Rich Results Test - Validation Report
=============================================
Generated: ${new Date().toISOString()}

Status: ${result.valid ? '✓ PASSED' : '✗ FAILED'}

${result.errors.length > 0 ? `
Errors:
${result.errors.map((e, i) => `  ${i + 1}. ${e}`).join('\n')}
` : 'No errors found.'}

${result.warnings.length > 0 ? `
Warnings:
${result.warnings.map((w, i) => `  ${i + 1}. ${w}`).join('\n')}
` : 'No warnings.'}

Extracted Schema:
${JSON.stringify(result.schema, null, 2)}

Google Rich Results Test URL:
https://search.google.com/test/rich-results

Instructions:
1. Copy the JSON-LD schema above
2. Paste into Google Rich Results Test
3. Verify all entities are recognized
4. Check for any additional warnings
`;

  fs.writeFileSync(outputPath, report);
  console.log(`Report saved to: ${outputPath}`);
}

async function main() {
  console.log('Google Rich Results Test - Schema Validation');
  console.log('=============================================\n');

  // Path to built HTML page
  const htmlPath = path.join(__dirname, '../dist/test/river-template-example/index.html');

  if (!fs.existsSync(htmlPath)) {
    console.error('ERROR: Test page not found at:', htmlPath);
    console.error('Please build the site first: npm run build');
    process.exit(1);
  }

  console.log('Extracting JSON-LD from test page...');
  const schema = await extractJsonLd(htmlPath);

  console.log('Validating schema...\n');
  const result = validateSchema(schema);

  // Generate report
  const reportDir = path.join(__dirname, '../reports/phase6');
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }

  const timestamp = new Date().toISOString().replace(/:/g, '-').split('.')[0];
  const reportPath = path.join(reportDir, `google-rich-results-${timestamp}.txt`);

  await generateReport(result, reportPath);

  // Print summary
  console.log('\nValidation Summary:');
  console.log('==================');
  console.log(`Status: ${result.valid ? '✓ PASSED' : '✗ FAILED'}`);
  console.log(`Errors: ${result.errors.length}`);
  console.log(`Warnings: ${result.warnings.length}`);

  if (!result.valid) {
    console.log('\nErrors:');
    result.errors.forEach((error, i) => {
      console.log(`  ${i + 1}. ${error}`);
    });
  }

  if (result.warnings.length > 0) {
    console.log('\nWarnings:');
    result.warnings.forEach((warning, i) => {
      console.log(`  ${i + 1}. ${warning}`);
    });
  }

  console.log(`\nFull report: ${reportPath}\n`);

  process.exit(result.valid ? 0 : 1);
}

main().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
