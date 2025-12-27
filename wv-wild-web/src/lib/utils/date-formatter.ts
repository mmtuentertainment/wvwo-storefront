/**
 * Date Formatting Utilities
 * SPEC-09: Adventure Hero Component
 *
 * Centralized date formatting for consistent display across adventure pages.
 */

/**
 * Default date format options for adventure content
 */
export const ADVENTURE_DATE_FORMAT: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

/**
 * Format a date string for display in adventure content.
 * Handles ISO date strings and Date objects.
 *
 * @param date - ISO date string or Date object
 * @param options - Optional Intl.DateTimeFormatOptions override
 * @returns Formatted date string (e.g., "December 26, 2025")
 *
 * @example
 * formatAdventureDate('2025-12-26') // "December 26, 2025"
 * formatAdventureDate(new Date())   // Today's date formatted
 */
export function formatAdventureDate(
  date: string | Date,
  options: Intl.DateTimeFormatOptions = ADVENTURE_DATE_FORMAT
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-US', options);
}

/**
 * Format a date for Schema.org datePublished/dateModified.
 * Returns ISO 8601 format (YYYY-MM-DD).
 *
 * @param date - Date object or ISO string
 * @returns ISO date string (e.g., "2025-12-26")
 */
export function formatSchemaDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Get relative time description (e.g., "2 days ago", "just now").
 * Useful for "Last updated" displays.
 *
 * @param date - Date to compare against now
 * @returns Relative time string
 */
export function getRelativeTime(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - dateObj.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'today';
  if (diffDays === 1) return 'yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  const weeks = Math.floor(diffDays / 7);
  if (diffDays < 30) return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`;
  const months = Math.floor(diffDays / 30);
  if (diffDays < 365) return months === 1 ? '1 month ago' : `${months} months ago`;
  const years = Math.floor(diffDays / 365);
  return years === 1 ? '1 year ago' : `${years} years ago`;
}
