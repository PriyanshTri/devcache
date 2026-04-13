import { describe, expect, it } from 'vitest';
import { z } from 'zod';
import {
  parseZodErrors,
  isValidUrlProtocol,
  safeUrlSchema,
  validateId,
} from './validation';

describe('validation utilities', () => {
  describe('parseZodErrors', () => {
    it('returns empty object when there are no issues', () => {
      const error = new z.ZodError([]);
      expect(parseZodErrors(error)).toEqual({});
    });

    it('maps single issue to the correct field', () => {
      const error = new z.ZodError([
        {
          code: 'invalid_type',
          expected: 'string',
          received: 'undefined',
          path: ['name'],
          message: 'Required',
        },
      ]);

      const errors = parseZodErrors(error);
      expect(errors).toEqual({
        name: ['Required'],
      });
    });

    it('groups multiple issues for the same field', () => {
      const error = new z.ZodError([
        {
          code: 'custom',
          path: ['password'],
          message: 'Password is too short',
        },
        {
          code: 'custom',
          path: ['password'],
          message: 'Password must contain a number',
        },
      ]);

      const errors = parseZodErrors(error);
      expect(errors).toEqual({
        password: ['Password is too short', 'Password must contain a number'],
      });
    });

    it('handles issues across multiple fields', () => {
      const error = new z.ZodError([
        {
          code: 'custom',
          path: ['username'],
          message: 'Username taken',
        },
        {
          code: 'custom',
          path: ['email'],
          message: 'Invalid email',
        },
      ]);

      const errors = parseZodErrors(error);
      expect(errors).toEqual({
        username: ['Username taken'],
        email: ['Invalid email'],
      });
    });

    it('uses "unknown" when path is empty or undefined', () => {
      const error = new z.ZodError([
        {
          code: 'custom',
          path: [],
          message: 'Root level error',
        },
      ]);

      const errors = parseZodErrors(error);
      expect(errors).toEqual({
        unknown: ['Root level error'],
      });
    });
  });

  describe('isValidUrlProtocol', () => {
    it('returns true for http and https URLs', () => {
      expect(isValidUrlProtocol('https://example.com')).toBe(true);
      expect(isValidUrlProtocol('http://example.com')).toBe(true);
      expect(isValidUrlProtocol('https://example.com/path?query=1')).toBe(true);
    });

    it('returns false for non-http/https protocols', () => {
      expect(isValidUrlProtocol('ftp://example.com')).toBe(false);
      expect(isValidUrlProtocol('javascript:alert(1)')).toBe(false);
      expect(isValidUrlProtocol('data:text/plain;base64,SGVsbG8sIFdvcmxkIQ%3D%3D')).toBe(false);
      expect(isValidUrlProtocol('file:///etc/passwd')).toBe(false);
      expect(isValidUrlProtocol('mailto:test@example.com')).toBe(false);
    });

    it('returns false for invalid URLs', () => {
      expect(isValidUrlProtocol('not-a-url')).toBe(false);
      expect(isValidUrlProtocol('')).toBe(false);
      expect(isValidUrlProtocol('http://')).toBe(false);
    });
  });

  describe('safeUrlSchema', () => {
    it('accepts valid http/https URLs', () => {
      expect(safeUrlSchema.parse('https://example.com')).toBe('https://example.com');
      expect(safeUrlSchema.parse('http://example.com')).toBe('http://example.com');
    });

    it('accepts null and undefined', () => {
      expect(safeUrlSchema.parse(null)).toBe(null);
      expect(safeUrlSchema.parse(undefined)).toBe(null);
    });

    it('rejects non-http/https protocols', () => {
      const result = safeUrlSchema.safeParse('javascript:alert(1)');
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe('URL must use http or https protocol');
      }
    });

    it('rejects malformed URLs', () => {
      const result = safeUrlSchema.safeParse('not-a-url');
      expect(result.success).toBe(false);
    });
  });

  describe('validateId', () => {
    it('returns null for valid non-empty strings', () => {
      expect(validateId('123', 'User ID')).toBe(null);
      expect(validateId('abc-def', 'Post ID')).toBe(null);
    });

    it('returns error object for empty or whitespace-only strings', () => {
      expect(validateId('', 'User ID')).toEqual({ success: false, error: 'Invalid User ID' });
      expect(validateId('   ', 'Post ID')).toEqual({ success: false, error: 'Invalid Post ID' });
    });
  });
});
