#!/bin/bash

# Fix all markdown linting issues for PR #88

cd "c:\Users\matth\Desktop\wvwo-storefront"

# Fix IMPORT-PATH-AUDIT-REPORT.md - Add language identifiers
sed -i 's/^```$/```bash/g' "docs/IMPORT-PATH-AUDIT-REPORT.md"

# Fix SEO_STRATEGY_HUNTING_SHOP.md - Add language identifiers
sed -i '344s/^```$/```json/' "docs/SEO_STRATEGY_HUNTING_SHOP.md"
sed -i '364s/^```$/```json/' "docs/SEO_STRATEGY_HUNTING_SHOP.md"
sed -i '418s/^```$/```text/' "docs/SEO_STRATEGY_HUNTING_SHOP.md"
sed -i '761s/^```$/```bash/' "docs/SEO_STRATEGY_HUNTING_SHOP.md"
sed -i '951s/^```$/```text/' "docs/SEO_STRATEGY_HUNTING_SHOP.md"
sed -i '960s/^```$/```text/' "docs/SEO_STRATEGY_HUNTING_SHOP.md"

# Fix SECURITY_AUDIT_CHECKOUT.md - Add language identifiers
sed -i '173s/^```$/```typescript/' "docs/SECURITY_AUDIT_CHECKOUT.md"
sed -i '194s/^```$/```typescript/' "docs/SECURITY_AUDIT_CHECKOUT.md"

# Fix phase2-rivertemplate-task-breakdown.md - Add language identifier
sed -i '1042s/^```$/```text/' "docs/phase2-rivertemplate-task-breakdown.md"

# Fix architecture/SPEC-12-SCHEMA-ARCHITECTURE.md - Add language identifiers
sed -i '454s/^```$/```text/' "docs/architecture/SPEC-12-SCHEMA-ARCHITECTURE.md"
sed -i '461s/^```$/```text/' "docs/architecture/SPEC-12-SCHEMA-ARCHITECTURE.md"

echo "Markdown linting fixes applied successfully"
