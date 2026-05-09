import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { headers } from 'next/headers'

// Create Redis client (lazy initialization)
let redis: Redis | null = null

function getRedis(): Redis | null {
  if (redis) return redis

  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN

  if (!url || !token) {
    console.warn('Upstash Redis not configured - rate limiting disabled')
    return null
  }

  redis = new Redis({ url, token })
  return redis
}

// Rate limit configurations for different endpoints
export const rateLimitConfigs = {
  // Login: 5 attempts per 15 minutes (keyed by IP + email)
  login: {
    limiter: Ratelimit.slidingWindow(5, '15 m'),
    prefix: 'ratelimit:login',
  },
  // Register: 3 attempts per hour (keyed by IP)
  register: {
    limiter: Ratelimit.slidingWindow(3, '1 h'),
    prefix: 'ratelimit:register',
  },
  // Forgot password: 3 attempts per hour (keyed by IP)
  forgotPassword: {
    limiter: Ratelimit.slidingWindow(3, '1 h'),
    prefix: 'ratelimit:forgot-password',
  },
  // Reset password: 5 attempts per 15 minutes (keyed by IP)
  resetPassword: {
    limiter: Ratelimit.slidingWindow(5, '15 m'),
    prefix: 'ratelimit:reset-password',
  },
  // Resend verification: 3 attempts per 15 minutes (keyed by IP + email)
  resendVerification: {
    limiter: Ratelimit.slidingWindow(3, '15 m'),
    prefix: 'ratelimit:resend-verification',
  },
  // File upload: 10 uploads per hour (keyed by user ID)
  upload: {
    limiter: Ratelimit.slidingWindow(10, '1 h'),
    prefix: 'ratelimit:upload',
  },
  // AI requests: 20 per hour (keyed by user ID)
  ai: {
    limiter: Ratelimit.slidingWindow(20, '1 h'),
    prefix: 'ratelimit:ai',
  },
  // Delete account: 5 attempts per hour (keyed by IP + user ID)
  deleteAccount: {
    limiter: Ratelimit.slidingWindow(5, '1 h'),
    prefix: 'ratelimit:delete-account',
  },
  // Change password: 5 attempts per hour (keyed by IP + user ID)
  changePassword: {
    limiter: Ratelimit.slidingWindow(5, '1 h'),
    prefix: 'ratelimit:change-password',
  },
} as const

export type RateLimitType = keyof typeof rateLimitConfigs

interface RateLimitResult {
  success: boolean
  remaining: number
  reset: number // Unix timestamp when the rate limit resets
  retryAfter: number // Seconds until can retry
}

const FAIL_OPEN_RESULT: RateLimitResult = {
  success: true,
  remaining: -1,
  reset: 0,
  retryAfter: 0,
}

/**
 * Get the client IP address from headers
 */
export async function getClientIP(): Promise<string> {
  const headersList = await headers()

  // 🛡️ Sentinel: Avoiding x-forwarded-for due to IP spoofing risk
  // x-forwarded-for is easily spoofed by clients unless strictly sanitized by a trusted proxy.
  // We use x-real-ip instead, which is typically set securely by the edge/proxy.
  const realIP = headersList.get('x-real-ip')
  if (realIP) {
    return realIP
  }

  // Fallback to x-forwarded-for if x-real-ip is not available
  // We take the right-most IP to prevent spoofing
  const forwardedFor = headersList.get('x-forwarded-for')
  if (forwardedFor) {
    const ips = forwardedFor.split(',')
    return ips[ips.length - 1].trim()
  }

  // Development fallback
  return '127.0.0.1'
}

/**
 * Check rate limit for a given type and identifier
 * @param type - The type of rate limit to check
 * @param identifier - Additional identifier (e.g., email) to combine with IP
 * @returns Rate limit result with success status and metadata
 */
export async function checkRateLimit(
  type: RateLimitType,
  identifier?: string
): Promise<RateLimitResult> {
  const redisClient = getRedis()

  // Fail open if Redis is not configured
  if (!redisClient) {
    return FAIL_OPEN_RESULT
  }

  const config = rateLimitConfigs[type]
  const ip = await getClientIP()

  // Build the key: prefix:ip or prefix:ip:identifier
  const key = identifier ? `${ip}:${identifier}` : ip

  try {
    const ratelimit = new Ratelimit({
      redis: redisClient,
      limiter: config.limiter,
      prefix: config.prefix,
    })

    const result = await ratelimit.limit(key)

    return {
      success: result.success,
      remaining: result.remaining,
      reset: result.reset,
      retryAfter: result.success ? 0 : Math.ceil((result.reset - Date.now()) / 1000),
    }
  } catch (error) {
    // Fail open on errors
    console.error('Rate limit check failed:', error)
    return FAIL_OPEN_RESULT
  }
}

/**
 * Format retry time for user-friendly message
 */
export function formatRetryTime(seconds: number): string {
  if (seconds < 60) {
    return `${seconds} second${seconds !== 1 ? 's' : ''}`
  }
  const minutes = Math.ceil(seconds / 60)
  return `${minutes} minute${minutes !== 1 ? 's' : ''}`
}

/**
 * Create a rate limit error response
 */
export function rateLimitResponse(retryAfter: number) {
  const retryTime = formatRetryTime(retryAfter)
  return new Response(
    JSON.stringify({
      error: `Too many attempts. Please try again in ${retryTime}.`,
    }),
    {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'Retry-After': String(retryAfter),
      },
    }
  )
}
