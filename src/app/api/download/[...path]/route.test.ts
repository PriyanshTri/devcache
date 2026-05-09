import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { GET } from './route';

vi.mock('@/auth', () => ({
  auth: vi.fn().mockResolvedValue({ user: { id: 'test-user-id' } }),
}));

describe('Download API Route', () => {
  const originalEnv = process.env;
  const originalFetch = global.fetch;

  beforeEach(() => {
    process.env = { ...originalEnv, R2_PUBLIC_URL: 'https://example.com' };
    vi.clearAllMocks();
  });

  afterEach(() => {
    process.env = originalEnv;
    global.fetch = originalFetch;
  });

  it('rejects paths containing ".." to prevent path traversal', async () => {
    const request = new Request('http://localhost');
    const params = Promise.resolve({ path: ['test-user-id', '..', 'secret.txt'] });

    const response = await GET(request, { params });

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toBe('Invalid path');
  });

  it('rejects paths containing "." to prevent path traversal', async () => {
    const request = new Request('http://localhost');
    const params = Promise.resolve({ path: ['.', 'test-user-id', 'secret.txt'] });

    const response = await GET(request, { params });

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toBe('Invalid path');
  });

  it('rejects paths containing "/" to prevent path traversal', async () => {
    const request = new Request('http://localhost');
    const params = Promise.resolve({ path: ['test-user-id', 'subdir/secret.txt'] });

    const response = await GET(request, { params });

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toBe('Invalid path');
  });

  it('allows valid paths', async () => {
    global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        arrayBuffer: vi.fn().mockResolvedValue(new ArrayBuffer(8)),
        headers: new Headers({'content-type': 'text/plain'})
    });

    const request = new Request('http://localhost');
    const params = Promise.resolve({ path: ['test-user-id', 'secret.txt'] });

    const response = await GET(request, { params });

    expect(response.status).toBe(200);
  });
});
