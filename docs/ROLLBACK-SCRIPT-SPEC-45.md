# Rollback Script for SPEC-45 River Migration

**Purpose**: Quickly restore original river pages if migration issues arise
**Execution Time**: < 5 minutes
**Prerequisites**: Git repository with pre-migration commits

---

## 🚨 When to Execute Rollback

### Critical Issues (Immediate Rollback)

- Page fails to render (500 error)
- Schema.org validation fails critically
- Mobile site broken
- SEO ranking drops > 30% in 24 hours
- Multiple user-reported broken links

### Warning Issues (Monitor, May Rollback)

- Page load time > 3 seconds
- Minor Schema.org warnings
- Single broken outfitter link
- SEO ranking drops 10-20%

---

## 📋 Pre-Migration Checklist

Before starting migration, create rollback checkpoint:

```bash
# 1. Tag current stable state
git tag -a river-migration-baseline -m "Pre-SPEC-45 migration baseline"
git push origin river-migration-baseline

# 2. Create rollback branch
git checkout -b rollback/river-migration
git push -u origin rollback/river-migration

# 3. Document current URLs
echo "# Pre-Migration URLs" > docs/pre-migration-urls.txt
curl -s https://wvwildoutdoors.com/near/elk-river >> docs/pre-migration-urls.txt
curl -s https://wvwildoutdoors.com/near/holly-river >> docs/pre-migration-urls.txt
git add docs/pre-migration-urls.txt
git commit -m "docs: snapshot pre-migration URLs"
```

---

## 🔄 Full Rollback Procedure

### Option 1: Git Revert (Preserves History)

```bash
#!/bin/bash
# scripts/rollback-rivers-full.sh

set -e  # Exit on error

echo "🚨 Starting full river migration rollback..."

# 1. Revert migration commits
echo "⏪ Reverting migration commits..."
git revert --no-edit HEAD~5..HEAD  # Adjust number based on commits

# 2. Restore original files
echo "📁 Restoring original page files..."
git checkout river-migration-baseline -- src/pages/near/elk-river.astro
git checkout river-migration-baseline -- src/pages/near/holly-river.astro

# 3. Remove new pages
echo "🗑️ Removing newly created pages..."
rm -f src/pages/rivers/gauley-river.astro
rm -f src/pages/rivers/cheat-river.astro

# 4. Remove data files
echo "🗑️ Removing migration data files..."
rm -rf src/data/rivers/

# 5. Restore original redirects
echo "🔀 Restoring original vercel.json..."
git checkout river-migration-baseline -- vercel.json

# 6. Restore original sitemap
echo "🗺️ Restoring original sitemap..."
git checkout river-migration-baseline -- public/sitemap.xml

# 7. Build and test
echo "🔨 Building project..."
npm run build

echo "✅ Rollback complete! Review changes before deploying."
echo "📝 Run 'git status' to see changes."
echo "🚀 Deploy with: npm run deploy"
```

**Execute**:

```bash
chmod +x scripts/rollback-rivers-full.sh
./scripts/rollback-rivers-full.sh
```

---

### Option 2: Hard Reset (Clean Slate)

**⚠️ WARNING**: This destroys all migration work. Use only if revert fails.

```bash
#!/bin/bash
# scripts/rollback-rivers-hard.sh

set -e

echo "🚨 HARD RESET: This will destroy all migration work!"
read -p "Type 'CONFIRM' to proceed: " confirm

if [ "$confirm" != "CONFIRM" ]; then
    echo "❌ Rollback cancelled."
    exit 1
fi

# 1. Reset to baseline
echo "⏪ Hard reset to baseline..."
git reset --hard river-migration-baseline

# 2. Force push (if already deployed)
echo "🚀 Force pushing to main..."
read -p "Force push to main? (y/n): " push

if [ "$push" == "y" ]; then
    git push origin main --force
fi

# 3. Rebuild
echo "🔨 Rebuilding..."
npm run build

echo "✅ Hard reset complete!"
```

---

## 🎯 Partial Rollback (Per River)

### Rollback Single River (e.g., Gauley)

```bash
#!/bin/bash
# scripts/rollback-river.sh <river-name>

RIVER=$1

if [ -z "$RIVER" ]; then
    echo "Usage: ./rollback-river.sh <elk|holly|gauley|cheat>"
    exit 1
fi

echo "🚨 Rolling back $RIVER river migration..."

case $RIVER in
    elk)
        git checkout river-migration-baseline -- src/pages/near/elk-river.astro
        rm -f src/data/rivers/elk.ts
        rm -f src/pages/rivers/elk-river.astro
        ;;
    holly)
        git checkout river-migration-baseline -- src/pages/near/holly-river.astro
        rm -f src/data/rivers/holly.ts
        rm -f src/pages/rivers/holly-river.astro
        ;;
    gauley)
        rm -f src/data/rivers/gauley.ts
        rm -f src/pages/rivers/gauley-river.astro
        # No original to restore (new page)
        ;;
    cheat)
        rm -f src/data/rivers/cheat.ts
        rm -f src/pages/rivers/cheat-river.astro
        # No original to restore (new page)
        ;;
    *)
        echo "❌ Unknown river: $RIVER"
        exit 1
        ;;
esac

# Update redirects (remove specific river)
echo "🔀 Updating redirects..."
# Manual step: Edit vercel.json to remove river-specific redirect

echo "✅ $RIVER rollback complete!"
echo "📝 Don't forget to manually update vercel.json redirects"
```

**Execute**:

```bash
chmod +x scripts/rollback-river.sh
./scripts/rollback-river.sh gauley
```

---

## 🔍 Post-Rollback Validation

After executing rollback, verify:

### 1. Pages Load Correctly

```bash
# Test original URLs
curl -I https://wvwildoutdoors.com/near/elk-river
curl -I https://wvwildoutdoors.com/near/holly-river

# Should return 200 OK (not 301 or 404)
```

### 2. Build Succeeds

```bash
npm run build
# Should complete without errors
```

### 3. No TypeScript Errors

```bash
npm run typecheck
# Should show 0 errors
```

### 4. Sitemap Valid

```bash
curl https://wvwildoutdoors.com/sitemap.xml | xmllint --format -
# Should parse without errors
```

### 5. Google Search Console

- Check "Coverage" report for 404 errors
- Verify old URLs still indexed
- No sudden index drops

---

## 📊 Rollback Decision Matrix

| Issue | Severity | Action | Script |
|-------|----------|--------|--------|
| Single page 500 error | High | Rollback that river | `rollback-river.sh` |
| All pages 500 error | Critical | Full rollback | `rollback-rivers-full.sh` |
| Schema.org warnings | Low | Monitor, may fix forward | Manual fix |
| Schema.org errors | Medium | Rollback affected rivers | `rollback-river.sh` |
| Broken outfitter link | Low | Fix forward | Manual update data file |
| 5+ broken links | Medium | Rollback affected river | `rollback-river.sh` |
| SEO drop 10-20% | Low | Monitor 48 hours | None (wait) |
| SEO drop > 30% | High | Full rollback | `rollback-rivers-full.sh` |
| Mobile rendering broken | High | Rollback affected river | `rollback-river.sh` |
| Site-wide mobile issue | Critical | Full rollback | `rollback-rivers-full.sh` |

---

## 🛠️ Manual Rollback Steps (If Scripts Fail)

### 1. Restore Original Files

```bash
# Copy from baseline tag
git show river-migration-baseline:src/pages/near/elk-river.astro > src/pages/near/elk-river.astro
git show river-migration-baseline:src/pages/near/holly-river.astro > src/pages/near/holly-river.astro
git show river-migration-baseline:vercel.json > vercel.json
git show river-migration-baseline:public/sitemap.xml > public/sitemap.xml
```

### 2. Remove Migration Files

```bash
rm -rf src/pages/rivers/
rm -rf src/data/rivers/
```

### 3. Commit Rollback

```bash
git add .
git commit -m "revert: rollback SPEC-45 river migration"
git push origin main
```

### 4. Deploy

```bash
npm run build
vercel deploy --prod
# or npm run deploy
```

---

## 📞 Emergency Contacts

If rollback fails or issues persist:

1. **Technical Lead**: [Contact info]
2. **DevOps**: [Contact info]
3. **Hosting Support**: Vercel support (<https://vercel.com/support>)
4. **Google Search Console**: [GSC login link]

---

## 📝 Post-Rollback Report Template

```markdown
# Rollback Report: SPEC-45 River Migration

**Date**: YYYY-MM-DD
**Time**: HH:MM (timezone)
**Executed By**: [Name]

## Issue That Triggered Rollback
[Describe the critical issue]

## Rollback Scope
- [ ] Full rollback (all rivers)
- [ ] Partial rollback (specify rivers): ___________

## Script Used
- [ ] `rollback-rivers-full.sh`
- [ ] `rollback-rivers-hard.sh`
- [ ] `rollback-river.sh <river>`
- [ ] Manual rollback

## Validation Results
- [ ] Original pages load (200 OK)
- [ ] Build succeeds
- [ ] No TypeScript errors
- [ ] Sitemap valid
- [ ] GSC status checked

## Root Cause Analysis
[What went wrong? How to prevent in future?]

## Next Steps
1. [Fix underlying issue]
2. [Re-test in staging]
3. [Schedule re-migration]

**Status**: Rollback Complete ✅
```

---

## ✅ Rollback Success Criteria

Rollback is successful when:

- [ ] All original URLs return 200 OK
- [ ] No 404 errors in GSC
- [ ] Build and deploy successful
- [ ] No console errors in browser
- [ ] Mobile site functional
- [ ] Lighthouse scores restored
- [ ] SEO rankings stable

---

**Document Version**: 1.0
**Last Updated**: 2025-12-30
**Maintained By**: Strategic Planning Agent
