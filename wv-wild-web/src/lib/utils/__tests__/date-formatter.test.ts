import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  formatAdventureDate,
  formatSchemaDate,
  getRelativeTime,
  ADVENTURE_DATE_FORMAT,
} from '../date-formatter';

describe('date-formatter', () => {
  describe('ADVENTURE_DATE_FORMAT', () => {
    it('has correct default options', () => {
      expect(ADVENTURE_DATE_FORMAT).toEqual({
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    });
  });

  describe('formatAdventureDate', () => {
    it('formats ISO date string correctly', () => {
      // Use explicit time to avoid timezone issues
      const result = formatAdventureDate('2025-12-26T12:00:00');
      expect(result).toBe('December 26, 2025');
    });

    it('formats Date object correctly', () => {
      // Create date in local timezone
      const date = new Date(2025, 6, 4, 12, 0, 0); // July 4, 2025 at noon local time
      const result = formatAdventureDate(date);
      expect(result).toBe('July 4, 2025');
    });

    it('accepts custom format options', () => {
      const shortFormat: Intl.DateTimeFormatOptions = {
        year: '2-digit',
        month: 'short',
        day: 'numeric',
      };
      const result = formatAdventureDate('2025-12-26T12:00:00', shortFormat);
      expect(result).toBe('Dec 26, 25');
    });

    it('handles edge case dates', () => {
      // Use explicit times to avoid timezone edge cases
      expect(formatAdventureDate('2025-01-01T12:00:00')).toBe('January 1, 2025');
      expect(formatAdventureDate('2025-12-31T12:00:00')).toBe('December 31, 2025');
    });
  });

  describe('formatSchemaDate', () => {
    it('returns ISO 8601 format from string', () => {
      const result = formatSchemaDate('2025-12-26T15:30:00Z');
      expect(result).toBe('2025-12-26');
    });

    it('returns ISO 8601 format from Date object', () => {
      // Use UTC to avoid timezone issues
      const date = new Date(Date.UTC(2025, 6, 4, 12, 0, 0)); // July 4, 2025
      const result = formatSchemaDate(date);
      expect(result).toBe('2025-07-04');
    });

    it('handles start of year', () => {
      const result = formatSchemaDate('2025-01-01T00:00:00Z');
      expect(result).toBe('2025-01-01');
    });

    it('handles end of year', () => {
      const result = formatSchemaDate('2025-12-31T23:59:59Z');
      expect(result).toBe('2025-12-31');
    });
  });

  describe('getRelativeTime', () => {
    beforeEach(() => {
      // Mock current date to December 26, 2025
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2025-12-26T12:00:00Z'));
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('returns "today" for current date', () => {
      const result = getRelativeTime('2025-12-26T10:00:00Z');
      expect(result).toBe('today');
    });

    it('returns "yesterday" for previous day', () => {
      const result = getRelativeTime('2025-12-25T10:00:00Z');
      expect(result).toBe('yesterday');
    });

    it('returns "X days ago" for recent dates', () => {
      expect(getRelativeTime('2025-12-24T10:00:00Z')).toBe('2 days ago');
      expect(getRelativeTime('2025-12-21T10:00:00Z')).toBe('5 days ago');
    });

    it('returns "X weeks ago" for dates within a month', () => {
      expect(getRelativeTime('2025-12-12T10:00:00Z')).toBe('2 weeks ago');
      expect(getRelativeTime('2025-12-05T10:00:00Z')).toBe('3 weeks ago');
    });

    it('returns "X months ago" for dates within a year', () => {
      expect(getRelativeTime('2025-10-26T10:00:00Z')).toBe('2 months ago');
      expect(getRelativeTime('2025-06-26T10:00:00Z')).toBe('6 months ago');
    });

    it('returns "X years ago" for older dates', () => {
      expect(getRelativeTime('2024-12-26T10:00:00Z')).toBe('1 years ago');
      expect(getRelativeTime('2023-12-26T10:00:00Z')).toBe('2 years ago');
    });

    it('accepts Date objects', () => {
      const date = new Date('2025-12-25T10:00:00Z');
      expect(getRelativeTime(date)).toBe('yesterday');
    });
  });
});
