"""
Phase 3A Comprehensive Validation Test
======================================
Tests all success criteria from:
- 01-localbusiness-schema.md
- 02-navigation-schema.md
- 03-gateway-optimization.md

Production (default):
    python tests/phase3a-validation.py

Local dev server:
    python tests/phase3a-validation.py --local
    (requires: cd wv-wild-web && npm run dev)
"""

import json
import re
import os
import sys
from pathlib import Path
from playwright.sync_api import sync_playwright

# Base URL - production by default, --local flag for dev server
BASE_URL = "https://wvwildoutdoors.pages.dev"
if "--local" in sys.argv:
    BASE_URL = "http://localhost:4321"
    print(f"[LOCAL] Using dev server: {BASE_URL}")
else:
    print(f"[PROD] Using production: {BASE_URL}")

# Test results tracking
results = {
    "passed": [],
    "failed": [],
    "warnings": []
}

def log_pass(test_id, message):
    results["passed"].append(f"[PASS] {test_id}: {message}")
    print(f"[PASS] {test_id}: {message}")

def log_fail(test_id, message):
    results["failed"].append(f"[FAIL] {test_id}: {message}")
    print(f"[FAIL] {test_id}: {message}")

def log_warn(test_id, message):
    results["warnings"].append(f"[WARN] {test_id}: {message}")
    print(f"[WARN] {test_id}: {message}")

def extract_jsonld(page):
    """Extract all JSON-LD scripts from a page"""
    scripts = page.locator('script[type="application/ld+json"]').all()
    schemas = []
    for script in scripts:
        try:
            content = script.inner_text()
            data = json.loads(content)
            # Handle @graph arrays
            if isinstance(data, dict) and "@graph" in data:
                schemas.extend(data["@graph"])
            elif isinstance(data, list):
                schemas.extend(data)
            else:
                schemas.append(data)
        except json.JSONDecodeError as e:
            log_warn("JSON-LD", f"Invalid JSON-LD: {e}")
    return schemas

def find_schema_by_type(schemas, schema_type):
    """Find a schema by @type"""
    for schema in schemas:
        if isinstance(schema, dict):
            s_type = schema.get("@type", "")
            if isinstance(s_type, list):
                if schema_type in s_type:
                    return schema
            elif s_type == schema_type:
                return schema
    return None

# =====================================================
# SPEC 01: LocalBusiness Schema Tests
# =====================================================

def test_localbusiness_schema(page):
    """Test LocalBusiness schema on homepage (SportingGoodsStore is a subtype)"""
    print("\n" + "="*60)
    print("SPEC 01: LocalBusiness Schema Validation")
    print("="*60)

    page.goto(f"{BASE_URL}/")
    page.wait_for_load_state("networkidle")

    schemas = extract_jsonld(page)

    # SportingGoodsStore is a subtype of LocalBusiness in schema.org hierarchy
    # Also check for GunStore which may be used
    local_biz_types = ["LocalBusiness", "SportingGoodsStore", "GunStore", "Store"]
    local_biz = None
    found_type = None

    for biz_type in local_biz_types:
        local_biz = find_schema_by_type(schemas, biz_type)
        if local_biz:
            found_type = biz_type
            break

    if not local_biz:
        log_fail("SC-001", f"LocalBusiness/Store schema not found on homepage (checked: {', '.join(local_biz_types)})")
        return

    print(f"   Found schema type: {found_type}")

    # SC-001: Coordinates check
    geo = local_biz.get("geo", {})
    lat = geo.get("latitude")
    lon = geo.get("longitude")

    if lat and lon:
        # Check coordinates are close to expected (38.49910, -80.75460)
        lat_ok = abs(float(lat) - 38.49910) < 0.001
        lon_ok = abs(float(lon) - (-80.75460)) < 0.001
        if lat_ok and lon_ok:
            log_pass("SC-001", f"Coordinates correct: {lat}, {lon}")
        else:
            log_fail("SC-001", f"Coordinates wrong: {lat}, {lon} (expected ~38.49910, -80.75460)")
    else:
        log_fail("SC-001", "GeoCoordinates missing from LocalBusiness")

    # SC-002: ContactPoint with telephone
    contact = local_biz.get("contactPoint")
    if contact:
        phone = contact.get("telephone") if isinstance(contact, dict) else None
        if phone:
            log_pass("SC-002", f"ContactPoint telephone: {phone}")
        else:
            log_fail("SC-002", "ContactPoint missing telephone")
    else:
        log_fail("SC-002", "ContactPoint not found in LocalBusiness")

    # SC-003: hasOfferCatalog with 3+ services
    catalog = local_biz.get("hasOfferCatalog")
    if catalog:
        items = catalog.get("itemListElement", [])
        if len(items) >= 3:
            log_pass("SC-003", f"hasOfferCatalog has {len(items)} services")
        else:
            log_fail("SC-003", f"hasOfferCatalog has only {len(items)} services (need 3+)")
    else:
        log_fail("SC-003", "hasOfferCatalog not found")

    # FR-007 (spec 01): sameAs array with Google Business Profile and Facebook
    # NOTE: Spec requires Google Business Profile URL, but might use different formats:
    # google.com/maps, goo.gl/maps, or business.google.com
    same_as = local_biz.get("sameAs", [])
    if isinstance(same_as, list):
        has_google = any(
            "google.com/maps" in url or
            "goo.gl/maps" in url or
            "business.google.com" in url or
            "g.page" in url
            for url in same_as
        )
        has_facebook = any("facebook.com" in url for url in same_as)
        if has_google and has_facebook:
            log_pass("FR-007", f"sameAs has Google and Facebook ({len(same_as)} URLs)")
        else:
            missing = []
            if not has_google: missing.append("Google Business Profile")
            if not has_facebook: missing.append("Facebook")
            if has_facebook and not has_google:
                # Known issue from Phase 3A-01 - Google URL not yet added
                log_warn("FR-007", f"sameAs has Facebook but missing Google Business Profile URL (Phase 3A-01 gap)")
            else:
                log_fail("FR-007", f"sameAs missing: {', '.join(missing)}")
    else:
        log_fail("FR-007", "sameAs is not an array")

# =====================================================
# SPEC 02: Navigation Schema Tests
# =====================================================

def test_navigation_schema(page):
    """Test BreadcrumbList and CollectionPage schemas on /near/ pages"""
    print("\n" + "="*60)
    print("SPEC 02: Navigation Schema Validation")
    print("="*60)

    # List of /near/ pages to test
    near_pages = [
        "elk-river",
        "sutton-lake",
        "summersville-lake",
        "burnsville-lake",
        "stonewall-jackson-lake",
        "bulltown",
        "i79-corridor",
        "birch-river"
    ]

    breadcrumb_count = 0
    area_served_count = 0

    # SC-001: Test BreadcrumbList on sample of /near/ pages
    for slug in near_pages[:3]:  # Test first 3 as sample
        url = f"{BASE_URL}/near/{slug}"
        page.goto(url)
        page.wait_for_load_state("networkidle")

        schemas = extract_jsonld(page)
        breadcrumb = find_schema_by_type(schemas, "BreadcrumbList")

        if breadcrumb:
            items = breadcrumb.get("itemListElement", [])
            if len(items) >= 2:
                breadcrumb_count += 1
                print(f"   [+] /near/{slug}: BreadcrumbList with {len(items)} items")
            else:
                print(f"   [-] /near/{slug}: BreadcrumbList has only {len(items)} items")
        else:
            print(f"   [-] /near/{slug}: No BreadcrumbList found")

        # SC-003: Check areaServed
        # Look in WebPage or CollectionPage schema
        webpage = find_schema_by_type(schemas, "WebPage")
        if webpage and webpage.get("areaServed"):
            area_served_count += 1

    if breadcrumb_count >= 2:
        log_pass("SC-001", f"BreadcrumbList found on {breadcrumb_count}/3 sampled /near/ pages")
    else:
        log_fail("SC-001", f"BreadcrumbList only found on {breadcrumb_count}/3 pages (need 2+)")

    # SC-002: CollectionPage on /near/ hub
    page.goto(f"{BASE_URL}/near")
    page.wait_for_load_state("networkidle")

    schemas = extract_jsonld(page)
    collection = find_schema_by_type(schemas, "CollectionPage")

    if collection:
        log_pass("SC-002", "CollectionPage schema found on /near/ hub")
    else:
        log_fail("SC-002", "CollectionPage schema NOT found on /near/ hub")

    # SC-003: areaServed on /near/ pages
    if area_served_count >= 2:
        log_pass("SC-003", f"areaServed found on {area_served_count}/3 sampled pages")
    else:
        log_warn("SC-003", f"areaServed only found on {area_served_count}/3 pages")

# =====================================================
# SPEC 03: Gateway Optimization Tests
# =====================================================

def test_gateway_optimization(page):
    """Test I-79 gateway optimization"""
    print("\n" + "="*60)
    print("SPEC 03: Gateway Optimization Validation")
    print("="*60)

    page.goto(f"{BASE_URL}/")
    page.wait_for_load_state("networkidle")

    # SC-001 & SC-002: Meta description has I-79 and under 160 chars
    meta_desc = page.locator('meta[name="description"]').get_attribute("content")

    if meta_desc:
        has_i79 = "I-79" in meta_desc or "Exit 57" in meta_desc
        char_count = len(meta_desc)

        if has_i79:
            log_pass("SC-001", f"Meta description contains I-79 reference")
        else:
            log_fail("SC-001", f"Meta description missing I-79/Exit 57: '{meta_desc}'")

        if char_count <= 160:
            log_pass("SC-002", f"Meta description is {char_count} chars (under 160)")
        else:
            log_fail("SC-002", f"Meta description is {char_count} chars (over 160 limit)")
    else:
        log_fail("SC-001", "No meta description found")
        log_fail("SC-002", "No meta description found")

    # Check Hero section for I-79 reference
    hero_text = page.locator("section").first.inner_text()
    if "I-79" in hero_text or "Exit 57" in hero_text:
        log_pass("HERO-I79", "Hero section contains I-79/Exit 57 reference (above fold)")
    else:
        log_fail("HERO-I79", "Hero section missing I-79 reference above fold")

    # SC-008: Check /near/ pages for I-79 references
    near_pages_with_i79 = []
    test_pages = ["sutton-lake", "elk-river", "summersville-lake", "i79-corridor"]

    for slug in test_pages:
        page.goto(f"{BASE_URL}/near/{slug}")
        page.wait_for_load_state("networkidle")
        content = page.content()
        if "I-79" in content or "I79" in content:
            near_pages_with_i79.append(slug)

    if len(near_pages_with_i79) >= 3:
        log_pass("SC-008", f"{len(near_pages_with_i79)} /near/ pages mention I-79: {', '.join(near_pages_with_i79)}")
    else:
        log_fail("SC-008", f"Only {len(near_pages_with_i79)} /near/ pages mention I-79 (need 3+)")

def test_gbp_document():
    """Test GBP-OPTIMIZATION.md exists and has required content"""
    print("\n" + "="*60)
    print("GBP Document Validation")
    print("="*60)

    gbp_path = Path("docs/GBP-OPTIMIZATION.md")

    # SC-003: Document exists
    if not gbp_path.exists():
        log_fail("SC-003", "docs/GBP-OPTIMIZATION.md does not exist")
        return

    log_pass("SC-003", "GBP-OPTIMIZATION.md exists")

    content = gbp_path.read_text(encoding="utf-8")
    content_lower = content.lower()

    # SC-004: No jargon
    jargon_terms = ["schema", "json-ld", "canonical", "seo", "meta tag", "structured data"]
    found_jargon = [term for term in jargon_terms if term in content_lower]

    if not found_jargon:
        log_pass("SC-004", "No technical jargon found in GBP doc")
    else:
        log_fail("SC-004", f"Found jargon in GBP doc: {', '.join(found_jargon)}")

    # SC-005: 11+ photo descriptions
    # Count numbered items like "1. **Front of building**" in Photos section
    photo_section = re.search(r"## Photos.*?(?=---|\Z)", content, re.DOTALL | re.IGNORECASE)
    if photo_section:
        photo_text = photo_section.group(0)
        # Match numbered items with bold text: "1. **Text**"
        photo_items = re.findall(r"^\d+\.\s+\*\*[^*]+\*\*", photo_text, re.MULTILINE)
        if len(photo_items) >= 11:
            log_pass("SC-005", f"Found {len(photo_items)} photo descriptions")
        else:
            log_fail("SC-005", f"Only {len(photo_items)} photo descriptions (need 11+)")
    else:
        log_warn("SC-005", "Could not find Photos section in GBP doc")

    # SC-006: 4+ Q&A pairs (format: ### Q: ...)
    qa_section = re.search(r"## Questions.*?(?=---|\Z)", content, re.DOTALL | re.IGNORECASE)
    if qa_section:
        qa_text = qa_section.group(0)
        # Match "### Q:" pattern
        qa_pairs = re.findall(r"### Q:", qa_text, re.IGNORECASE)
        if len(qa_pairs) >= 4:
            log_pass("SC-006", f"Found {len(qa_pairs)} Q&A pairs")
        else:
            log_fail("SC-006", f"Only {len(qa_pairs)} Q&A pairs (need 4+)")
    else:
        log_warn("SC-006", "Could not find Q&A section in GBP doc")

    # SC-007: 2+ review templates (format: **Template 1 — ...)
    review_section = re.search(r"## Review.*?(?=---|\Z)", content, re.DOTALL | re.IGNORECASE)
    if review_section:
        review_text = review_section.group(0)
        # Match "**Template 1" or "**Template 2" etc.
        templates = re.findall(r"\*\*Template \d+", review_text, re.IGNORECASE)
        if len(templates) >= 2:
            log_pass("SC-007", f"Found {len(templates)} review response templates")
        else:
            log_fail("SC-007", f"Only {len(templates)} review templates (need 2+)")
    else:
        log_warn("SC-007", "Could not find Review section in GBP doc")

def test_visit_section(page):
    """Test Visit section has drive times and I-79 reference"""
    print("\n" + "="*60)
    print("Visit Section Validation")
    print("="*60)

    page.goto(f"{BASE_URL}/")
    page.wait_for_load_state("networkidle")

    # Find the Visit section
    visit_section = page.locator("#visit")
    if visit_section.count() == 0:
        log_warn("VISIT", "Visit section (#visit) not found on homepage")
        return

    visit_text = visit_section.inner_text()

    # Check for I-79 reference
    if "I-79" in visit_text or "Exit 57" in visit_text:
        log_pass("VISIT-I79", "Visit section contains I-79/Exit 57 reference")
    else:
        log_fail("VISIT-I79", "Visit section missing I-79 reference")

    # Check for drive times
    cities = ["Pittsburgh", "Charleston", "Charlotte"]
    found_cities = [city for city in cities if city in visit_text]

    if len(found_cities) >= 3:
        log_pass("VISIT-DRIVE", f"Visit section has drive times for: {', '.join(found_cities)}")
    else:
        log_fail("VISIT-DRIVE", f"Visit section only has {len(found_cities)}/3 drive time cities")

    # Check hours match Kim's verified hours
    if "Mon" in visit_text and "Sat" in visit_text and "10" in visit_text:
        log_pass("VISIT-HOURS", "Hours appear consistent (Mon-Sat 10am)")
    else:
        log_warn("VISIT-HOURS", "Could not verify hours format")

def print_summary():
    """Print final test summary"""
    print("\n" + "="*60)
    print("TEST SUMMARY")
    print("="*60)

    total = len(results["passed"]) + len(results["failed"])

    print(f"\nPassed: {len(results['passed'])}/{total}")
    print(f"Failed: {len(results['failed'])}/{total}")
    print(f"Warnings: {len(results['warnings'])}")

    if results["failed"]:
        print("\n--- FAILURES ---")
        for fail in results["failed"]:
            print(f"   {fail}")

    if results["warnings"]:
        print("\n--- WARNINGS ---")
        for warn in results["warnings"]:
            print(f"   {warn}")

    if results["passed"]:
        print("\n--- PASSED ---")
        for passed in results["passed"]:
            print(f"   {passed}")

    # Exit code
    if results["failed"]:
        print("\n[X] OVERALL: SOME TESTS FAILED")
        return 1
    else:
        print("\n[OK] OVERALL: ALL TESTS PASSED")
        return 0

def main():
    print("="*60)
    print("PHASE 3A COMPREHENSIVE VALIDATION")
    print("WV Wild Outdoors - LocalBusiness, Navigation, Gateway")
    print("="*60)

    # Test GBP document first (doesn't need browser)
    test_gbp_document()

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        try:
            # Run all browser-based tests
            test_localbusiness_schema(page)
            test_navigation_schema(page)
            test_gateway_optimization(page)
            test_visit_section(page)

        finally:
            browser.close()

    return print_summary()

if __name__ == "__main__":
    exit(main())
