"""
SPEC-15 Ski Resort Template Visual Testing
Tests both Snowshoe Mountain and Canaan Valley pages
"""
from playwright.sync_api import sync_playwright
import os

# Create screenshots directory
os.makedirs('tests/screenshots/spec-15', exist_ok=True)

PAGES = [
    ('snowshoe-mountain', 'http://localhost:4321/near/snowshoe-mountain'),
    ('canaan-valley', 'http://localhost:4321/near/canaan-valley'),
]

VIEWPORTS = [
    ('mobile', 320, 568),
    ('tablet', 768, 1024),
    ('desktop', 1280, 800),
]

def test_ski_pages():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        results = []

        for page_name, url in PAGES:
            print(f"\n{'='*60}")
            print(f"Testing: {page_name}")
            print(f"{'='*60}")

            for viewport_name, width, height in VIEWPORTS:
                context = browser.new_context(viewport={'width': width, 'height': height})
                page = context.new_page()

                try:
                    # Navigate and wait for content
                    page.goto(url, timeout=30000)
                    page.wait_for_load_state('networkidle')

                    # Take full page screenshot
                    screenshot_path = f'tests/screenshots/spec-15/{page_name}-{viewport_name}.png'
                    page.screenshot(path=screenshot_path, full_page=True)
                    print(f"  [{viewport_name}] Screenshot saved: {screenshot_path}")

                    # Test 1: Hero Section
                    hero = page.locator('section').first
                    hero_visible = hero.is_visible()
                    print(f"  [{viewport_name}] Hero section visible: {hero_visible}")

                    # Test 2: Check for elevation stats (should contain "ft" or "feet")
                    elevation_text = page.locator('text=/\\d+.*ft|vertical|summit|base/i').first
                    has_elevation = elevation_text.is_visible() if elevation_text.count() > 0 else False
                    print(f"  [{viewport_name}] Elevation stats visible: {has_elevation}")

                    # Test 3: Trail difficulty colors - look for trail breakdown section
                    # Check for green (beginner), blue (intermediate), black/brown (advanced)
                    trail_section = page.locator('text=/beginner|intermediate|advanced|expert/i').first
                    has_trails = trail_section.is_visible() if trail_section.count() > 0 else False
                    print(f"  [{viewport_name}] Trail breakdown visible: {has_trails}")

                    # Test 4: Kim's Tips section (should have font-hand class)
                    kims_tips = page.locator('text=/Kim.*Insider|Kim.*Tips/i')
                    has_kims_tips = kims_tips.count() > 0 and kims_tips.first.is_visible()
                    print(f"  [{viewport_name}] Kim's Tips visible: {has_kims_tips}")

                    # Test 5: Check for required sections
                    sections_to_check = [
                        ('Lifts', 'text=/lifts?|chair/i'),
                        ('Snow Conditions', 'text=/snow|conditions|snowfall/i'),
                        ('Pricing', 'text=/pricing|ticket|pass/i'),
                        ('Lodging', 'text=/lodging|stay|hotel/i'),
                    ]

                    for section_name, selector in sections_to_check:
                        el = page.locator(selector).first
                        visible = el.is_visible() if el.count() > 0 else False
                        print(f"  [{viewport_name}] {section_name} section: {visible}")

                    # Test 6: Check blue color for intermediate trails (bg-blue-700)
                    blue_elements = page.locator('.bg-blue-700')
                    has_blue = blue_elements.count() > 0
                    print(f"  [{viewport_name}] Blue trail color (bg-blue-700): {has_blue}")

                    # Test 7: Check WVWO aesthetic - no rounded-md/lg/xl in class attributes
                    # Note: These patterns exist in Tailwind CSS definitions, but we check actual usage
                    forbidden_classes = ['rounded-md', 'rounded-lg', 'rounded-xl', 'rounded-2xl', 'rounded-3xl']
                    has_forbidden_rounded = False
                    for fc in forbidden_classes:
                        elements = page.locator(f'.{fc}')
                        if elements.count() > 0:
                            has_forbidden_rounded = True
                            print(f"    Found {elements.count()} elements with {fc}")
                    print(f"  [{viewport_name}] Forbidden rounded classes: {has_forbidden_rounded} (should be False)")

                    results.append({
                        'page': page_name,
                        'viewport': viewport_name,
                        'hero': hero_visible,
                        'elevation': has_elevation,
                        'trails': has_trails,
                        'kims_tips': has_kims_tips,
                        'blue_color': has_blue,
                        'forbidden_rounded': has_forbidden_rounded,
                    })

                except Exception as e:
                    print(f"  [{viewport_name}] ERROR: {e}")
                    results.append({
                        'page': page_name,
                        'viewport': viewport_name,
                        'error': str(e),
                    })
                finally:
                    context.close()

        browser.close()

        # Summary
        print(f"\n{'='*60}")
        print("TEST SUMMARY")
        print(f"{'='*60}")

        passed = 0
        failed = 0

        for r in results:
            if 'error' in r:
                failed += 1
                print(f"FAIL: {r['page']} @ {r['viewport']} - {r['error']}")
            else:
                checks = [
                    r.get('hero', False),
                    r.get('elevation', False),
                    r.get('trails', False),
                    r.get('kims_tips', False),
                    r.get('blue_color', False),
                    not r.get('forbidden_rounded', True),  # Should be False
                ]
                if all(checks):
                    passed += 1
                    print(f"PASS: {r['page']} @ {r['viewport']}")
                else:
                    failed += 1
                    failed_checks = []
                    if not r.get('hero'): failed_checks.append('hero')
                    if not r.get('elevation'): failed_checks.append('elevation')
                    if not r.get('trails'): failed_checks.append('trails')
                    if not r.get('kims_tips'): failed_checks.append('kims_tips')
                    if not r.get('blue_color'): failed_checks.append('blue_color')
                    if r.get('forbidden_rounded'): failed_checks.append('forbidden_rounded')
                    print(f"FAIL: {r['page']} @ {r['viewport']} - Missing: {', '.join(failed_checks)}")

        print(f"\nTotal: {passed} passed, {failed} failed")
        return passed, failed

if __name__ == '__main__':
    passed, failed = test_ski_pages()
    exit(0 if failed == 0 else 1)
