// @vitest-environment node
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { GET } from './route';
import { auth } from '@/auth';

// Mock NextAuth
vi.mock('@/auth', () => ({
  auth: vi.fn(),
}));

describe('Download API Route', () => {
  let originalFetch: typeof global.fetch;

  beforeEach(() => {
    // Save original fetch
    originalFetch = global.fetch;

    // Set up default env
    process.env.R2_PUBLIC_URL = 'https://example-r2-url.com';

    // Set up auth mock by default
    vi.mocked(auth).mockResolvedValue({
      user: { id: 'user123' },
      expires: '9999-12-31T23:59:59.999Z'
    });
  });

  afterEach(() => {
    // Restore original fetch
    global.fetch = originalFetch;
    vi.clearAllMocks();
  });

  it('rejects path traversing up (..)', async () => {
    const request = new Request('https://example.com/api/download/user123/../other/file.txt');
    const response = await GET(request, { params: Promise.resolve({ path: ['user123', '..', 'other', 'file.txt'] }) });

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toBe('Invalid path');
  });

  it('rejects path with segment containing /', async () => {
    const request = new Request('https://example.com/api/download/user123/folder%2Ffile.txt');
    const response = await GET(request, { params: Promise.resolve({ path: ['user123', 'folder/file.txt'] }) });

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toBe('Invalid path');
  });

  it('rejects path traversing with current dir (.)', async () => {
    const request = new Request('https://example.com/api/download/user123/./file.txt');
    const response = await GET(request, { params: Promise.resolve({ path: ['user123', '.', 'file.txt'] }) });

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toBe('Invalid path');
  });

  it('allows valid paths', async () => {
    // Mock fetch for this specific test
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      headers: new Map([['content-type', 'text/plain']]),
      arrayBuffer: () => Promise.resolve(new ArrayBuffer(8)),
    } as unknown as Response);

    const request = new Request('https://example.com/api/download/user123/folder/file.txt');
    const response = await GET(request, { params: Promise.resolve({ path: ['user123', 'folder', 'file.txt'] }) });

    expect(response.status).toBe(200);
  });
});