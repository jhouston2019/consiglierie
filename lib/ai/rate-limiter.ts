interface RateLimitStore {
  [key: string]: {
    count: number;
    resetAt: number;
  };
}

const store: RateLimitStore = {};

const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 20;

export function checkRateLimit(identifier: string): {
  allowed: boolean;
  remaining: number;
  resetAt: number;
} {
  const now = Date.now();
  const record = store[identifier];

  if (!record || now > record.resetAt) {
    store[identifier] = {
      count: 1,
      resetAt: now + WINDOW_MS,
    };
    return {
      allowed: true,
      remaining: MAX_REQUESTS - 1,
      resetAt: now + WINDOW_MS,
    };
  }

  if (record.count >= MAX_REQUESTS) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: record.resetAt,
    };
  }

  record.count++;
  return {
    allowed: true,
    remaining: MAX_REQUESTS - record.count,
    resetAt: record.resetAt,
  };
}
