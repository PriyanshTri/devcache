import { describe, it, expect } from 'vitest';
import { validateId } from './validation';

describe('validateId', () => {
  it('returns null for a valid ID', () => {
    const result = validateId('valid-id-123', 'Item ID');
    expect(result).toBeNull();
  });

  it('returns an error result for an empty ID', () => {
    const result = validateId('', 'Item ID');
    expect(result).toEqual({ success: false, error: 'Invalid Item ID' });
  });

  it('returns an error result for a whitespace-only ID', () => {
    const result = validateId('   ', 'User ID');
    expect(result).toEqual({ success: false, error: 'Invalid User ID' });
  });

  it('handles null/undefined inputs safely', () => {
    // @ts-expect-error Testing invalid runtime inputs
    expect(validateId(null, 'ID')).toEqual({ success: false, error: 'Invalid ID' });

    // @ts-expect-error Testing invalid runtime inputs
    expect(validateId(undefined, 'ID')).toEqual({ success: false, error: 'Invalid ID' });
  });
});
