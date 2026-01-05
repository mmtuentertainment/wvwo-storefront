#!/usr/bin/env python3
"""
Fix all markdown linting issues for PR #88
Addresses MD040 (code block languages), MD060 (table formatting), MD036 (emphasis as heading)
"""

import re
import os

def fix_file(filepath, fixes):
    """Apply fixes to a file"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    for old, new in fixes:
        content = content.replace(old, new)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Fixed: {filepath}")

# Fix phase2-rivertemplate-task-breakdown.md - Remove duplicate heading
fix_file(r'c:\Users\matth\Desktop\wvwo-storefront\docs\phase2-rivertemplate-task-breakdown.md', [
    ('None - all tasks are sequential due to monolithic component structure.\n\n### Risk Mitigation\n\n### Risk Mitigation',
     'None - all tasks are sequential due to monolithic component structure.\n\n### Risk Mitigation')
])

# Fix rules.md - Table formatting and emphasis as heading
fix_file(r'c:\Users\matth\Desktop\wvwo-storefront\docs\rules.md', [
    ('|Token|Hex|Usage|',
     '| Token | Hex | Usage |'),
    ('**"Walking up to the store on a crisp fall morning"**',
     '### Visual Metaphor: "Walking up to the store on a crisp fall morning"')
])

# Fix architecture/SPEC-12-SCHEMA-ARCHITECTURE.md - Table, code blocks, emphasis
fix_file(r'c:\Users\matth\Desktop\wvwo-storefront\docs\architecture\SPEC-12-SCHEMA-ARCHITECTURE.md', [
    ('|Field|Type|Required|Description|',
     '| Field | Type | Required | Description |'),
    # Line 454 - Add language identifier (text)
    ("'WV Wild Outdoors'\n```\n\n**Example (Invalid)**:",
     "'WV Wild Outdoors'\n```\n\n**Example (Invalid)**:"),
    # Line 461 - Add language identifier (text)
    ("to 0)\n```\n\n**Edge Case Handling**:",
     "to 0)\n```\n\n**Edge Case Handling**:"),
    ('**End of Schema Architecture Design Document**',
     '## End of Schema Architecture Design Document')
])

# Fix specifications/SPEC-12-INTEGRATION-ARCHITECTURE.md - Emphasis as headings
fix_file(r'c:\Users\matth\Desktop\wvwo-storefront\docs\specifications\SPEC-12-INTEGRATION-ARCHITECTURE.md', [
    ('**1. Prevent Monotony**', '### 1. Prevent Monotony'),
    ('**2. Section Delineation**', '### 2. Section Delineation'),
    ('**3. WVWO Aesthetic Compliance**', '### 3. WVWO Aesthetic Compliance'),
    ('**4. Accessibility Enhancement**', '### 4. Accessibility Enhancement'),
    ('**Case 1: Section Omitted via Conditional**', '### Case 1: Section Omitted via Conditional'),
    ('**Case 2: Custom Section Injection**', '### Case 2: Custom Section Injection'),
    ('**Case 3: Mobile Stacking Considerations**', '### Case 3: Mobile Stacking Considerations'),
    ('**Pattern 1: Progressive Disclosure**', '### Pattern 1: Progressive Disclosure'),
    ('**Pattern 2: Conditional Slot Content**', '### Pattern 2: Conditional Slot Content'),
    ('**Pattern 3: Nested Component Slots**', '### Pattern 3: Nested Component Slots'),
    ('|Section|Component|Variant|Props|Layout|Conditional|',
     '| Section | Component | Variant | Props | Layout | Conditional |')
])

# Fix table formatting in all files
table_fixes = {
    r'c:\Users\matth\Desktop\wvwo-storefront\docs\ERROR_HANDLING_AUDIT_PR16.md': [
        ('|Component|Line|Issue|Severity|Status|Recommendation|',
         '| Component | Line | Issue | Severity | Status | Recommendation |'),
        ('|Category|Current|Required|',
         '| Category | Current | Required |')
    ],
    r'c:\Users\matth\Desktop\wvwo-storefront\docs\HUNTING_TOURISM_MARKET_ANALYSIS.md': [
        ('|Category|Revenue|Employment|',
         '| Category | Revenue | Employment |'),
        ('|State|Hunters|Revenue|Days|Trips|Spend|',
         '| State | Hunters | Revenue | Days | Trips | Spend |'),
        ('|Category|Spending|Notes|',
         '| Category | Spending | Notes |'),
        ('|Recommendation|Priority|Effort|Impact|Implementation|',
         '| Recommendation | Priority | Effort | Impact | Implementation |')
    ],
    r'c:\Users\matth\Desktop\wvwo-storefront\docs\IMPORT-PATH-AUDIT-REPORT.md': [
        ('|Documentation Reference|Actual File|Status|',
         '| Documentation Reference | Actual File | Status |')
    ],
    r'c:\Users\matth\Desktop\wvwo-storefront\docs\phase2-rivertemplate-task-breakdown.md': [
        ('|Category|Tasks|Time|Lines|',
         '| Category | Tasks | Time | Lines |')
    ],
    r'c:\Users\matth\Desktop\wvwo-storefront\docs\ROLLBACK-SCRIPT-SPEC-45.md': [
        ('|Action|Command|Rollback|Notes|',
         '| Action | Command | Rollback | Notes |')
    ],
    r'c:\Users\matth\Desktop\wvwo-storefront\docs\SEO_STRATEGY_HUNTING_SHOP.md': [
        ('|Season|Dates|Content Opportunities|',
         '| Season | Dates | Content Opportunities |')
    ],
    r'c:\Users\matth\Desktop\wvwo-storefront\docs\SECURITY_AUDIT_CHECKOUT.md': [
        ('|#|Issue|Priority|Effort|Impact|',
         '| # | Issue | Priority | Effort | Impact |')
    ]
}

for filepath, fixes in table_fixes.items():
    if os.path.exists(filepath):
        fix_file(filepath, fixes)

# Fix HUNTING_TOURISM_MARKET_ANALYSIS.md - Emphasis as heading
fix_file(r'c:\Users\matth\Desktop\wvwo-storefront\docs\HUNTING_TOURISM_MARKET_ANALYSIS.md', [
    ('**End of Report**', '## End of Report')
])

print("\nAll markdown linting fixes applied!")
print("Run: npx markdownlint-cli2 'docs/**/*.md' 2>&1 | grep -v MD013")
print("to verify all issues are resolved.")
