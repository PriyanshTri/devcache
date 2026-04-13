import { describe, it, expect } from 'vitest';
import { formatRetryTime } from './rate-limit';

describe('formatRetryTime', () => {
  describe('seconds formatting', () => {
    it('formats 0 seconds correctly', () => {
      expect(formatRetryTime(0)).toBe('0 seconds');
    });

    it('formats 1 second correctly (singular)', () => {
      expect(formatRetryTime(1)).toBe('1 second');
    });

    it('formats 59 seconds correctly', () => {
      expect(formatRetryTime(59)).toBe('59 seconds');
    });
  });

  describe('minutes formatting', () => {
    it('formats 60 seconds as 1 minute (singular)', () => {
      expect(formatRetryTime(60)).toBe('1 minute');
    });

    it('rounds up 61 seconds to 2 minutes', () => {
      expect(formatRetryTime(61)).toBe('2 minutes');
    });

    it('rounds up 119 seconds to 2 minutes', () => {
      expect(formatRetryTime(119)).toBe('2 minutes');
    });

    it('formats 120 seconds as 2 minutes', () => {
      expect(formatRetryTime(120)).toBe('2 minutes');
    });

    it('rounds up 121 seconds to 3 minutes', () => {
      expect(formatRetryTime(121)).toBe('3 minutes');
    });
  });
});
