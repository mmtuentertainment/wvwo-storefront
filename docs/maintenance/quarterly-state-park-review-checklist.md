
# Quarterly State Park Content Review Checklist

**Schedule:** January, April, July, October
**Estimated Time:** ~8 hours per quarter
**Responsibility:** Kim (WVWO Content Manager)

## Overview

This checklist ensures WVWO State Park content remains accurate and up-to-date. WV State Parks frequently update hours, fees, programs, and facilities. Regular quarterly reviews prevent customer disappointment and maintain WVWO's reputation for reliable information.

## Review Process

### 1. Seasonal Hours Verification (2 hours)

- [ ] Visit wvstateparks.com for each park
- [ ] Verify general park hours (day-use)
- [ ] Check facility-specific hours (visitor center, nature center, pool, restaurant)
- [ ] Update seasonal variations (summer extended, winter reduced)
- [ ] Confirm holiday closures

### 2. Fee Updates (1.5 hours)

- [ ] Verify day-use entry fees
- [ ] Check camping rates by site type
- [ ] Confirm cabin/lodge rates
- [ ] Update equipment rental fees
- [ ] Verify golf fees (if applicable)
- [ ] Check for WV resident discount changes
- [ ] Note any fee increases with effective dates

### 3. Program Schedule Changes (2 hours)

- [ ] Review ranger program calendar
- [ ] Update educational workshop schedules
- [ ] Verify Junior Ranger program availability
- [ ] Check seasonal event dates
- [ ] Update special event calendar
- [ ] Verify registration requirements

### 4. Facility Status (1.5 hours)

- [ ] Check for new facilities added
- [ ] Note temporary closures or renovations
- [ ] Update cabin/campground inventory if changed
- [ ] Verify pool operation status
- [ ] Check restaurant hours/seasonal operation
- [ ] Update amenity availability

### 5. Emergency Contact Validation (1 hour)

- [ ] Test park ranger emergency number
- [ ] Verify park office phone
- [ ] Check managing agency contact info
- [ ] Verify nearest hospital hasn't changed
- [ ] Update county sheriff contact if needed
- [ ] Test all phone numbers for accuracy

## Data Sources

- Primary: <https://wvstateparks.com>
- Reservations: <https://reservations.wvstateparks.com>
- WV DNR: Fishing/hunting regulations
- Google Maps: Distance/direction verification

## Update Process

1. Update data files in src/data/state-parks/
2. Validate against Zod schemas
3. Run tests to ensure no breakage
4. Commit changes: `git commit -m "chore: Quarterly state park data update (Q1 2026)"`
5. Deploy updates

## Notes

- Document any major changes in commit message
- Flag significant fee increases for review
- Note new facilities for potential template enhancements

---

**Last Updated:** 2026-01-03
**Document Version:** 1.0
