import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export const corsConfig: CorsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? (process.env.FRONTEND_URL || '').split(',').map(s => s.trim()).filter(Boolean)
    : true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-XSRF-TOKEN'],
};
