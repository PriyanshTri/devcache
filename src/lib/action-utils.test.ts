import { describe, expect, it, vi } from 'vitest';
import { requirePro } from './action-utils';

// Mock the auth module since action-utils imports it
vi.mock('@/auth', () => ({
  auth: vi.fn(),
}));

// Mock the rate-limit module since action-utils imports it
vi.mock('@/lib/rate-limit', () => ({
  checkRateLimit: vi.fn(),
  formatRetryTime: vi.fn(),
}));

describe('requirePro', () => {
  it('returns null if isPro is true', () => {
    const result = requirePro(true);
    expect(result).toBeNull();
  });

  it('returns error if isPro is false', () => {
    const result = requirePro(false);
    expect(result).toEqual({ success: false, error: 'AI features require a Pro subscription' });
  });

  it('returns error if isPro is undefined', () => {
    const result = requirePro(undefined);
    expect(result).toEqual({ success: false, error: 'AI features require a Pro subscription' });
  });
});
