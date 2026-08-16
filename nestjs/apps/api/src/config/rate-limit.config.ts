import rateLimit from 'express-rate-limit';

export const rateLimitConfig = () =>
  rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: { statusCode: 429, message: 'Too many requests, please try again later' },
  });
