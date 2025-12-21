// Bulk markdown linter script for CodeRabbit Round 2 fixes
// Fixes MD022, MD031, MD040 across all SPEC files

import { execSync } from 'child_process';
import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const specsDir = './docs/specs/Mountain State Adventure Destination';
const files = readdirSync(specsDir, { recursive: true })
    .filter(f => f.endsWith('.md') || f.endsWith('.MD'))
    .map(f => join(specsDir, f));

console.log(`Found ${files.length} markdown files to process`);

// Add BLUEPRINT.md and constitution.md
files.push('./docs/BLUEPRINT.md');
files.push('./docs/constitution.md');

// Run markdownlint-cli2 --fix on each file
for (const file of files) {
    try {
        console.log(`Fixing: ${file}`);
        execSync(`npx markdownlint-cli2 --fix "${file}"`, { stdio: 'inherit' });
    } catch (error) {
        console.error(`Error fixing ${file}:`, error.message);
    }
}

console.log('Bulk markdown fixes complete.');
console.log('Manual step required: Add language identifiers to code blocks (MD040)');
