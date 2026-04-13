import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getClientIP } from './rate-limit'

// Mock the dependencies
vi.mock('next/headers', () => ({
  headers: vi.fn(),
}))

import { headers } from 'next/headers'

describe('getClientIP', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('returns IP from x-real-ip header when available', async () => {
    const mockHeaders = new Headers({ 'x-real-ip': '5.6.7.8' })
    vi.mocked(headers).mockResolvedValue(mockHeaders)

    const ip = await getClientIP()

    expect(headers).toHaveBeenCalled()
    expect(ip).toBe('5.6.7.8')
  })

  it('falls back to 127.0.0.1 and ignores easily spoofable x-forwarded-for header', async () => {
    // Testing spoofing mitigation by ensuring x-forwarded-for is safely ignored
    const mockHeaders = new Headers({ 'x-forwarded-for': '9.9.9.9' })
    vi.mocked(headers).mockResolvedValue(mockHeaders)

    const ip = await getClientIP()

    expect(headers).toHaveBeenCalled()
    expect(ip).toBe('127.0.0.1')
  })
})
