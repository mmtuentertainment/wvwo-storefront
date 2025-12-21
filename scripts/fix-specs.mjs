import fs from 'fs';
import path from 'path';

const rootDir = process.argv[2] || '.';

function walk(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            walk(filePath);
        } else if (file.endsWith('.md')) {
            fixMarkdown(filePath);
        }
    });
}

function fixMarkdown(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Fix MD031: Blank lines around fences
    // Ensure blank line BEFORE opening fence
    content = content.replace(/([^\n])\n(```[a-z]*)/g, '$1\n\n$2');
    // Ensure blank line AFTER closing fence
    content = content.replace(/(```)\n([^\n])/g, '$1\n\n$2');

    // 2. Fix MD040: Missing language (add 'text' if missing)
    // We only do this if it's not already there
    content = content.replace(/```\n/g, '```text\n');

    // 3. Fix absolute paths
    const absPathPattern = /c:\\Users\\matth\\Desktop\\wvwo-storefront\\/gi;
    content = content.replace(absPathPattern, './');

    // 4. Fix backslashes in paths
    content = content.replace(/docs\\specs\\/g, 'docs/specs/');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed: ${filePath}`);
}

walk(path.join(rootDir, 'docs/specs'));
