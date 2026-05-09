// @vitest-environment jsdom
import { renderHook, act } from '@testing-library/react';
import { useClipboard } from './use-clipboard';
import { toast } from 'sonner';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe('useClipboard', () => {
  const writeTextMock = vi.fn();

  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should copy text successfully and reset copied state after 2 seconds', async () => {
    writeTextMock.mockResolvedValueOnce(undefined);

    const { result } = renderHook(() => useClipboard());

    expect(result.current.copied).toBe(false);

    await act(async () => {
      await result.current.copy('test text');
    });

    expect(writeTextMock).toHaveBeenCalledWith('test text');
    expect(result.current.copied).toBe(true);
    expect(toast.success).toHaveBeenCalledWith('Copied to clipboard');

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(result.current.copied).toBe(false);
  });

  it('should handle copy failure', async () => {
    writeTextMock.mockRejectedValueOnce(new Error('Failed to copy'));

    const { result } = renderHook(() => useClipboard());

    await act(async () => {
      await result.current.copy('test text');
    });

    expect(writeTextMock).toHaveBeenCalledWith('test text');
    expect(result.current.copied).toBe(false);
    expect(toast.error).toHaveBeenCalledWith('Failed to copy');
  });
});
