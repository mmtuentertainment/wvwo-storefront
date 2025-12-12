"""
WVWO Manual Visual Tests
Run with: python tests/manual-visual-test.py

Tests implemented features from git history:
- Frontend aesthetics (fonts, colors, layout)
- Accessibility (aria-hidden, focus states)
- Shop/Inventory display
- FFL Transfer form
- Contact form
- Responsive layouts
- Navigation
"""

from playwright.sync_api import sync_playwright
import json
import os
from datetime import datetime
from pathlib import Path

# Output directory - in the repo
SCRIPT_DIR = Path(__file__).parent
OUTPUT_DIR = SCRIPT_DIR / "output"
OUTPUT_DIR.mkdir(exist_ok=True)

# Test results storage
RESULTS = {
    "timestamp": datetime.now().isoformat(),
    "tests": [],
    "summary": {"passed": 0, "failed": 0, "warnings": 0}
}

def log_result(name, status, details=""):
    """Log test result"""
    RESULTS["tests"].append({
        "name": name,
        "status": status,
        "details": details
    })
    if status == "PASS":
        RESULTS["summary"]["passed"] += 1
    elif status == "FAIL":
        RESULTS["summary"]["failed"] += 1
    else:
        RESULTS["summary"]["warnings"] += 1
    print(f"[{status}] {name}: {details}")


def test_homepage_aesthetics(page):
    """Test homepage visual aesthetics match WVWO guidelines"""
    print("\n=== Testing Homepage Aesthetics ===")

    # Check page loads
    page.goto('http://localhost:4321')
    page.wait_for_load_state('networkidle')

    # Screenshot for visual verification
    page.screenshot(path=str(OUTPUT_DIR / 'homepage.png'), full_page=True)
    log_result("Homepage loads", "PASS", "Page loaded successfully")

    # Check title
    title = page.title()
    if "WV Wild" in title or "Wild Outdoors" in title:
        log_result("Page title", "PASS", f"Title: {title}")
    else:
        log_result("Page title", "WARN", f"Title may need update: {title}")

    # Check hero section exists
    hero = page.locator('section').first
    if hero.count() > 0:
        log_result("Hero section", "PASS", "Hero section found")
    else:
        log_result("Hero section", "FAIL", "Hero section missing")

    # Check h1 exists and has proper text
    h1 = page.locator('h1').first
    if h1.count() > 0:
        h1_text = h1.text_content()
        log_result("H1 heading", "PASS", f"H1: {h1_text[:50]}...")
    else:
        log_result("H1 heading", "FAIL", "No H1 found")


def test_navigation(page):
    """Test navigation links work"""
    print("\n=== Testing Navigation ===")

    page.goto('http://localhost:4321')
    page.wait_for_load_state('networkidle')

    # Check nav links exist
    nav_links = page.locator('nav a').all()
    log_result("Navigation links", "PASS" if len(nav_links) > 0 else "FAIL",
               f"Found {len(nav_links)} nav links")

    # Test internal anchor links
    anchor_links = page.locator('a[href^="#"]').all()
    log_result("Anchor links", "PASS" if len(anchor_links) > 0 else "WARN",
               f"Found {len(anchor_links)} anchor links")


def test_shop_section(page):
    """Test shop/inventory display"""
    print("\n=== Testing Shop Section ===")

    page.goto('http://localhost:4321')
    page.wait_for_load_state('networkidle')

    # Look for shop section
    shop = page.locator('#shop')
    if shop.count() > 0:
        log_result("Shop section exists", "PASS", "Shop section found")
        try:
            shop.scroll_into_view_if_needed()
            page.screenshot(path=str(OUTPUT_DIR / 'shop.png'))
        except Exception:
            pass  # Screenshot optional
    else:
        # Try alternative selectors
        shop_alt = page.locator('section:has-text("Shop"), section:has-text("Products")')
        if shop_alt.count() > 0:
            log_result("Shop section exists", "PASS", "Shop section found (alt selector)")
        else:
            log_result("Shop section exists", "WARN", "Shop section not found with expected ID")

    # Check for product images
    product_images = page.locator('img[src*="shop"], img[src*="product"], img[alt*="product"]').all()
    log_result("Product images", "PASS" if len(product_images) > 0 else "WARN",
               f"Found {len(product_images)} product-related images")


def test_contact_section(page):
    """Test contact section and form"""
    print("\n=== Testing Contact Section ===")

    page.goto('http://localhost:4321')
    page.wait_for_load_state('networkidle')

    # Check for contact section
    contact = page.locator('#contact')
    if contact.count() > 0:
        log_result("Contact section", "PASS", "Contact section found")
    else:
        log_result("Contact section", "WARN", "Contact section ID not found")

    # Check for phone link
    phone_link = page.locator('a[href^="tel:"]')
    if phone_link.count() > 0:
        log_result("Phone link", "PASS", f"Phone link found: {phone_link.first.get_attribute('href')}")
    else:
        log_result("Phone link", "WARN", "No tel: link found")


def test_ffl_transfer_page(page):
    """Test FFL transfer page"""
    print("\n=== Testing FFL Transfer Page ===")

    page.goto('http://localhost:4321/ffl-transfers')
    page.wait_for_load_state('networkidle')

    # Check page loads
    if page.url.endswith('/ffl-transfers') or page.url.endswith('/ffl-transfers/'):
        log_result("FFL page loads", "PASS", "FFL transfer page accessible")
        page.screenshot(path=str(OUTPUT_DIR / 'ffl-transfer.png'), full_page=True)
    else:
        log_result("FFL page loads", "WARN", f"Redirected to: {page.url}")

    # Check for form elements
    form = page.locator('form')
    if form.count() > 0:
        log_result("FFL form exists", "PASS", "Form found on FFL page")

        # Check for required fields
        name_field = page.locator('input[name*="name"], input[placeholder*="name" i]')
        email_field = page.locator('input[type="email"], input[name*="email"]')

        log_result("Name field", "PASS" if name_field.count() > 0 else "WARN",
                   f"Found {name_field.count()} name fields")
        log_result("Email field", "PASS" if email_field.count() > 0 else "WARN",
                   f"Found {email_field.count()} email fields")
    else:
        log_result("FFL form exists", "WARN", "No form found on FFL page")


def test_accessibility(page):
    """Test basic accessibility features"""
    print("\n=== Testing Accessibility ===")

    page.goto('http://localhost:4321')
    page.wait_for_load_state('networkidle')

    # Check for aria-hidden on decorative elements
    aria_hidden = page.locator('[aria-hidden="true"]').all()
    log_result("Aria-hidden usage", "PASS" if len(aria_hidden) > 0 else "WARN",
               f"Found {len(aria_hidden)} elements with aria-hidden")

    # Check images have alt text
    images = page.locator('img').all()
    images_without_alt = page.locator('img:not([alt])').all()
    if len(images_without_alt) == 0:
        log_result("Image alt text", "PASS", f"All {len(images)} images have alt text")
    else:
        log_result("Image alt text", "WARN",
                   f"{len(images_without_alt)}/{len(images)} images missing alt text")

    # Check for focus-visible styles (buttons/links should be focusable)
    buttons = page.locator('button, a').all()
    log_result("Interactive elements", "PASS" if len(buttons) > 0 else "WARN",
               f"Found {len(buttons)} interactive elements")


def test_responsive_layout(page, browser):
    """Test responsive layout at different breakpoints"""
    print("\n=== Testing Responsive Layouts ===")

    viewports = [
        {"name": "Mobile", "width": 375, "height": 812},
        {"name": "Tablet", "width": 768, "height": 1024},
        {"name": "Desktop", "width": 1280, "height": 800}
    ]

    for vp in viewports:
        # Create new context with viewport
        context = browser.new_context(viewport={"width": vp["width"], "height": vp["height"]})
        test_page = context.new_page()
        test_page.goto('http://localhost:4321')
        test_page.wait_for_load_state('networkidle')

        # Screenshot at this viewport
        test_page.screenshot(path=str(OUTPUT_DIR / f'responsive-{vp["name"].lower()}.png'), full_page=True)
        log_result(f"Viewport {vp['name']}", "PASS", f"{vp['width']}x{vp['height']} rendered")

        context.close()


def test_footer(page):
    """Test footer content"""
    print("\n=== Testing Footer ===")

    page.goto('http://localhost:4321')
    page.wait_for_load_state('networkidle')

    footer = page.locator('footer')
    if footer.count() > 0:
        log_result("Footer exists", "PASS", "Footer found")

        # Check for required legal content
        ffl_text = footer.filter(has_text="FFL").filter(has_text="firearm")
        if ffl_text.count() > 0:
            log_result("FFL disclaimer", "PASS", "FFL disclaimer in footer")
        else:
            log_result("FFL disclaimer", "WARN", "FFL disclaimer not found in footer")

        # Check for address
        address = footer.locator('address, :has-text("Candy")')
        log_result("Address in footer", "PASS" if address.count() > 0 else "WARN",
                   f"Address elements found: {address.count()}")
    else:
        log_result("Footer exists", "FAIL", "No footer element found")


def run_all_tests():
    """Run all manual tests"""
    print("=" * 60)
    print("WVWO Manual Visual Tests")
    print("=" * 60)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1280, "height": 800})

        try:
            # Run all test suites
            test_homepage_aesthetics(page)
            test_navigation(page)
            test_shop_section(page)
            test_contact_section(page)
            test_ffl_transfer_page(page)
            test_accessibility(page)
            test_responsive_layout(page, browser)
            test_footer(page)

        except Exception as e:
            log_result("Test execution", "FAIL", str(e))

        finally:
            browser.close()

    # Print summary
    print("\n" + "=" * 60)
    print("TEST SUMMARY")
    print("=" * 60)
    print(f"Passed:   {RESULTS['summary']['passed']}")
    print(f"Failed:   {RESULTS['summary']['failed']}")
    print(f"Warnings: {RESULTS['summary']['warnings']}")
    print("=" * 60)

    # Save results
    results_file = OUTPUT_DIR / 'test-results.json'
    with open(results_file, 'w') as f:
        json.dump(RESULTS, f, indent=2)
    print(f"\nResults saved to {results_file}")
    print(f"Screenshots saved to {OUTPUT_DIR}/")

    return RESULTS


if __name__ == "__main__":
    run_all_tests()
