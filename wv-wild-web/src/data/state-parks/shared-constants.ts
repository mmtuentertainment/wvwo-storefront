/**
 * Shared Constants for WV State Park Data Files
 *
 * Common values used across multiple state park data files to maintain
 * consistency and follow DRY principle.
 *
 * @module data/state-parks/shared-constants
 */

/**
 * WV State Parks central reservation system URL
 */
export const WV_STATE_PARKS_RESERVATION_URL = 'https://wvstateparks.com/reservations';

/**
 * WV State Parks central reservation phone number
 */
export const WV_STATE_PARKS_PHONE = '1-833-982-7275';

/**
 * WV State Parks phone display format (with parentheses)
 */
export const WV_STATE_PARKS_PHONE_DISPLAY = '1-833-WV-PARKS';

/**
 * Managing agency information (consistent across all WV state parks)
 */
export const WV_STATE_PARKS_MANAGING_AGENCY = {
  name: 'West Virginia Division of Natural Resources - State Parks',
  jurisdiction: 'State of West Virginia',
  phone: '1-833-982-7275 (1-833-WV-PARKS)',
  email: 'parks@wv.gov',
  website: 'https://wvstateparks.com',
  address: '324 4th Avenue, South Charleston, WV 25303',
} as const;
