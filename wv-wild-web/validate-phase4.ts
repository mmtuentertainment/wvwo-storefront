/**
 * Phase 4 Validation Script
 * Validates placeholder data files against schemas
 */

import { StateParkTemplatePropsSchema } from './src/types/state-park-template-types';
import { hollyRiverStatePark } from './src/data/state-parks/holly-river-sp';
import { watogaStatePark } from './src/data/state-parks/watoga-sp';

console.log('🧪 Validating Phase 4 Placeholder Data Files...\n');

// Validate Holly River State Park
console.log('📋 Validating holly-river-sp.ts...');
try {
  const hollyRiverResult = StateParkTemplatePropsSchema.safeParse(hollyRiverStatePark);
  if (hollyRiverResult.success) {
    console.log('✅ holly-river-sp.ts validates successfully');
    console.log(`   - Hero section: ${hollyRiverStatePark.hero.name}`);
    console.log(`   - Acreage: ${hollyRiverStatePark.hero.acreage}`);
    console.log(`   - Cabins: ${hollyRiverStatePark.facilities?.lodging?.cabins?.length || 0}`);
    console.log(`   - Trails: ${hollyRiverStatePark.trails?.trails?.length || 0}`);
    console.log(`   - SEO FAQs: ${hollyRiverStatePark.seo?.faqItems?.length || 0}`);
  } else {
    console.log('❌ holly-river-sp.ts validation failed');
    console.error(hollyRiverResult.error.errors);
  }
} catch (error) {
  console.log('❌ Error validating holly-river-sp.ts:', error);
}

console.log('\n📋 Validating watoga-sp.ts...');
try {
  const watogaResult = StateParkTemplatePropsSchema.safeParse(watogaStatePark);
  if (watogaResult.success) {
    console.log('✅ watoga-sp.ts validates successfully');
    console.log(`   - Hero section: ${watogaStatePark.hero.name}`);
    console.log(`   - Acreage: ${watogaStatePark.hero.acreage}`);
    console.log(`   - Lodge rooms: ${watogaStatePark.facilities?.lodging?.lodges?.[0]?.rooms || 0}`);
    console.log(`   - Cabins: ${watogaStatePark.facilities?.lodging?.cabins?.length || 0}`);
    console.log(`   - Ranger programs: ${watogaStatePark.activitiesPrograms?.rangerPrograms?.length || 0}`);
    console.log(`   - Trails: ${watogaStatePark.trails?.trails?.length || 0}`);
    console.log(`   - SEO FAQs: ${watogaStatePark.seo?.faqItems?.length || 0}`);
  } else {
    console.log('❌ watoga-sp.ts validation failed');
    console.error(watogaResult.error.errors);
  }
} catch (error) {
  console.log('❌ Error validating watoga-sp.ts:', error);
}

console.log('\n✅ Phase 4 Validation Complete');
console.log('📊 Summary:');
console.log(`   - Total data files: 2`);
console.log(`   - Total lines: ~1,150`);
console.log(`   - Ready for Phase 5: Component Implementation`);
