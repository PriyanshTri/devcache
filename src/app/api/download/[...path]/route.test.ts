import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { GET } from './route';

// Mock dependencies
vi.mock('@/auth', () => ({
  auth: vi.fn(),
}));

import { auth } from '@/auth';

describe('Download API Route', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    process.env.R2_PUBLIC_URL = 'https://r2.example.com';
  });

  afterEach(() => {
    delete process.env.R2_PUBLIC_URL;
  });

  it('should return 401 if unauthorized', async () => {
    vi.mocked(auth).mockResolvedValueOnce(null);

    const request = new Request('http://localhost:3000/api/download/file.txt');
    const params = Promise.resolve({ path: ['file.txt'] });

    const response = await GET(request, { params });

    expect(response.status).toBe(401);
  });

  it('should return 400 for path traversal with ..', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.mocked(auth).mockResolvedValueOnce({ user: { id: 'user123' } } as any);

    const request = new Request('http://localhost:3000/api/download/../file.txt');
    const params = Promise.resolve({ path: ['..', 'file.txt'] });

    const response = await GET(request, { params });

    expect(response.status).toBe(400);
  });

  it('should return 400 for path traversal with /', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.mocked(auth).mockResolvedValueOnce({ user: { id: 'user123' } } as any);

    const request = new Request('http://localhost:3000/api/download/foo/bar');
    const params = Promise.resolve({ path: ['foo/bar'] }); // A segment shouldn't contain /

    const response = await GET(request, { params });

    expect(response.status).toBe(400);
  });

  it('should return 400 for path traversal with .', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.mocked(auth).mockResolvedValueOnce({ user: { id: 'user123' } } as any);

    const request = new Request('http://localhost:3000/api/download/./file.txt');
    const params = Promise.resolve({ path: ['.', 'file.txt'] });

    const response = await GET(request, { params });

    expect(response.status).toBe(400);
  });

  it('should return 403 if path does not start with userId', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.mocked(auth).mockResolvedValueOnce({ user: { id: 'user123' } } as any);

    const request = new Request('http://localhost:3000/api/download/otheruser/file.txt');
    const params = Promise.resolve({ path: ['otheruser', 'file.txt'] });

    const response = await GET(request, { params });

    expect(response.status).toBe(403);
  });
});
