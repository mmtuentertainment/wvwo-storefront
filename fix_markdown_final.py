#!/usr/bin/env python3
"""
Final comprehensive fix for all markdown linting issues in PR #88
"""

import re

def fix_file(filepath, fixes):
    """Apply fixes to a file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        original = content
        for old, new in fixes:
            content = content.replace(old, new)

        if content != original:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"OK Fixed: {filepath}")
        else:
            print(f"  No changes: {filepath}")
    except Exception as e:
        print(f"ERROR fixing {filepath}: {e}")

# Fix COMMIT-STRATEGY.md - Add language to code blocks (lines 57, 84, 110, 127)
fix_file(r'c:\Users\matth\Desktop\wvwo-storefront\docs\COMMIT-STRATEGY.md', [
    ('### Commit 1: Documentation Cleanup\n\n```\nchore(SPEC-12): clean up archived documentation after PR #70 merge\n```',
     '### Commit 1: Documentation Cleanup\n\n```text\nchore(SPEC-12): clean up archived documentation after PR #70 merge\n```'),
    ('### Commit 2: Compliance Testing Infrastructure\n\n```\nfeat(WVWO): add automated compliance testing infrastructure\n```',
     '### Commit 2: Compliance Testing Infrastructure\n\n```text\nfeat(WVWO): add automated compliance testing infrastructure\n```'),
    ('### Commit 3: Compliance Documentation\n\n```\ndocs(WVWO): add compliance quick reference and PR checklist\n```',
     '### Commit 3: Compliance Documentation\n\n```text\ndocs(WVWO): add compliance quick reference and PR checklist\n```'),
    ('### Commit 4: Dependency Updates\n\n```\nchore(deps): update package.json dependencies\n```',
     '### Commit 4: Dependency Updates\n\n```text\nchore(deps): update package.json dependencies\n```'),
])

# Fix architecture/SPEC-12-SCHEMA-ARCHITECTURE.md
fix_file(r'c:\Users\matth\Desktop\wvwo-storefront\docs\architecture\SPEC-12-SCHEMA-ARCHITECTURE.md', [
    # Line 454 - Add language to code block
    ('**Bad Error (Generic)**:\n\n```\nValidation error in elk-river.md:',
     '**Bad Error (Generic)**:\n\n```text\nValidation error in elk-river.md:'),
    # Line 461 - Add language to code block
    ('**Good Error (Descriptive)**:\n\n```\nValidation error in elk-river.md:',
     '**Good Error (Descriptive)**:\n\n```text\nValidation error in elk-river.md:'),
    # Line 878 - Fix table formatting
    ('| Decision | Rationale |\n|----------|-----------|',
     '| Decision | Rationale |\n| -------- | --------- |'),
    # Line 1049 - Convert emphasis to heading
    ('**End of Schema Architecture Design Document**',
     '## End of Schema Architecture Design Document'),
])

# Fix ERROR_HANDLING_AUDIT_PR16.md - Table formatting (lines 706, 777)
error_handling_content = None
try:
    with open(r'c:\Users\matth\Desktop\wvwo-storefront\docs\ERROR_HANDLING_AUDIT_PR16.md', 'r', encoding='utf-8') as f:
        error_handling_content = f.read()

    # Fix line 706 table (Component|Line|Issue|Severity|Status|Recommendation)
    error_handling_content = error_handling_content.replace(
        '|Component|Line|Issue|Severity|Status|Recommendation|',
        '| Component | Line | Issue | Severity | Status | Recommendation |'
    )
    # Fix line 777 table (Category|Current|Required)
    error_handling_content = error_handling_content.replace(
        '|Category|Current|Required|',
        '| Category | Current | Required |'
    )

    with open(r'c:\Users\matth\Desktop\wvwo-storefront\docs\ERROR_HANDLING_AUDIT_PR16.md', 'w', encoding='utf-8') as f:
        f.write(error_handling_content)
    print("OK Fixed: ERROR_HANDLING_AUDIT_PR16.md")
except Exception as e:
    print(f"ERROR: {e}")

# Fix HUNTING_TOURISM_MARKET_ANALYSIS.md - More table formatting
hunting_content = None
try:
    with open(r'c:\Users\matth\Desktop\wvwo-storefront\docs\HUNTING_TOURISM_MARKET_ANALYSIS.md', 'r', encoding='utf-8') as f:
        hunting_content = f.read()

    # Fix all compact table headers
    patterns = [
        (r'\|Category\|Revenue\|Employment\|', '| Category | Revenue | Employment |'),
        (r'\|State\|Hunters\|Revenue\|Days\|Trips\|Spend\|', '| State | Hunters | Revenue | Days | Trips | Spend |'),
        (r'\|Category\|Spending\|Notes\|', '| Category | Spending | Notes |'),
        (r'\|Recommendation\|Priority\|Effort\|Impact\|Implementation\|', '| Recommendation | Priority | Effort | Impact | Implementation |'),
    ]

    for old_pattern, new_pattern in patterns:
        hunting_content = re.sub(old_pattern, new_pattern, hunting_content)

    with open(r'c:\Users\matth\Desktop\wvwo-storefront\docs\HUNTING_TOURISM_MARKET_ANALYSIS.md', 'w', encoding='utf-8') as f:
        f.write(hunting_content)
    print("OK Fixed: HUNTING_TOURISM_MARKET_ANALYSIS.md")
except Exception as e:
    print(f"ERROR: {e}")

# Fix ROLLBACK-SCRIPT-SPEC-45.md
fix_file(r'c:\Users\matth\Desktop\wvwo-storefront\docs\ROLLBACK-SCRIPT-SPEC-45.md', [
    ('|Action|Command|Rollback|Notes|', '| Action | Command | Rollback | Notes |'),
])

# Fix SEO_STRATEGY_HUNTING_SHOP.md
fix_file(r'c:\Users\matth\Desktop\wvwo-storefront\docs\SEO_STRATEGY_HUNTING_SHOP.md', [
    ('|Season|Dates|Content Opportunities|', '| Season | Dates | Content Opportunities |'),
])

# Fix SECURITY_AUDIT_CHECKOUT.md
fix_file(r'c:\Users\matth\Desktop\wvwo-storefront\docs\SECURITY_AUDIT_CHECKOUT.md', [
    ('|#|Issue|Priority|Effort|Impact|', '| # | Issue | Priority | Effort | Impact |'),
])

# Fix IMPORT-PATH-AUDIT-REPORT.md
fix_file(r'c:\Users\matth\Desktop\wvwo-storefront\docs\IMPORT-PATH-AUDIT-REPORT.md', [
    ('|Documentation Reference|Actual File|Status|', '| Documentation Reference | Actual File | Status |'),
])

# Fix phase2-rivertemplate-task-breakdown.md
fix_file(r'c:\Users\matth\Desktop\wvwo-storefront\docs\phase2-rivertemplate-task-breakdown.md', [
    ('|Category|Tasks|Time|Lines|', '| Category | Tasks | Time | Lines |'),
])

# Fix specifications/SPEC-12-INTEGRATION-ARCHITECTURE.md
fix_file(r'c:\Users\matth\Desktop\wvwo-storefront\docs\specifications\SPEC-12-INTEGRATION-ARCHITECTURE.md', [
    ('|Section|Component|Variant|Props|Layout|Conditional|', '| Section | Component | Variant | Props | Layout | Conditional |'),
])

print("\n=================================")
print("ALL MARKDOWN FIXES COMPLETE!")
print("=================================")
print("\nVerify with:")
print("  npx markdownlint-cli2 'docs/**/*.md' 2>&1 | grep -v MD013 | grep -E '(MD040|MD060|MD036)'")
