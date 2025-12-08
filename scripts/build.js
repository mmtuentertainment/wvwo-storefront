const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const WEB_DIR = 'wv-wild-web';
const DIST_DIR = 'dist';
const WEB_DIST = path.join(WEB_DIR, 'dist');

console.log('🚀 Starting cross-platform build process...');

try {
    // 1. Install and Build Web Project
    console.log(`\n📦 Installing and building in ${WEB_DIR}...`);
    execSync('npm install && npm run build', {
        cwd: WEB_DIR,
        stdio: 'inherit'
    });

    // 2. Clean Root Dist Directory
    console.log(`\n🧹 Cleaning ${DIST_DIR} directory...`);
    if (fs.existsSync(DIST_DIR)) {
        fs.rmSync(DIST_DIR, { recursive: true, force: true });
    }

    // 3. Copy Build Output
    console.log(`\n📋 Copying build artifacts from ${WEB_DIST} to ${DIST_DIR}...`);

    // Ensure parent directory exists (though cpSync with recursive creates it usually, good to be safe)
    if (!fs.existsSync(WEB_DIST)) {
        throw new Error(`Build output not found at ${WEB_DIST}. Did the build fail?`);
    }

    fs.cpSync(WEB_DIST, DIST_DIR, { recursive: true });

    console.log('\n✅ Build completed successfully!');

} catch (error) {
    console.error('\n❌ Build failed:', error.message);
    process.exit(1);
}
