export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class AuthError extends AppError {
  constructor(message: string = 'Authentication failed') {
    super(message, 401, 'AUTH_ERROR');
  }
}

export class RateLimitError extends AppError {
  constructor(resetAt: number) {
    super('Rate limit exceeded', 429, 'RATE_LIMIT_EXCEEDED');
  }
}

export class ValidationError extends AppError {
  constructor(message: string = 'Invalid input') {
    super(message, 400, 'VALIDATION_ERROR');
  }
}

export function handleApiError(error: unknown): Response {
  if (error instanceof AppError) {
    return new Response(
      JSON.stringify({ error: error.message, code: error.code }),
      { status: error.statusCode }
    );
  }

  if (process.env.NODE_ENV === 'development') {
    console.error('Unhandled error:', error);
  }

  return new Response(
    JSON.stringify({ error: 'Internal server error' }),
    { status: 500 }
  );
}
