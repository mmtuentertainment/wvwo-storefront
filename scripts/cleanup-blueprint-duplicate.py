import re

# Read the file
with open('docs/BLUEPRINT.md', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find the duplicate section starting at line 971 (0-indexed: 970)
# The duplicate starts with the old Phase 3 content
# We need to remove from line 972 to where the next proper section starts

# Let's find where the duplicate section ends
# It should be before "1. The Best Boots for Deer Hunting" or similar old content

output_lines = []
skip_mode = False
for i, line in enumerate(lines):
    line_num = i + 1
    
    # Start skipping from line 972 (the duplicate "The core pivot" line)
    if line_num == 972 and "The core pivot" in line:
        skip_mode = True
        continue
    
    # Look for the old orphaned content that starts with numbered list
    if skip_mode and (line.strip().startswith('1. "The Best Boots') or line.strip().startswith('**HUNTING (4 posts):**')):
        skip_mode = False
        # We've reached the old content that should be preserved
    
    if not skip_mode:
        output_lines.append(line)

# Write back
with open('docs/BLUEPRINT.md', 'w', encoding='utf-8') as f:
    f.writelines(output_lines)

print(f"Removed duplicate content. Original lines: {len(lines)}, New lines: {len(output_lines)}")
