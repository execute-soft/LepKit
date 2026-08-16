import { Logger, VersioningType, RequestMethod } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';

import { AppModule } from './app/app.module';
import { securityConfig } from './config/security.config';
import { rateLimitConfig } from './config/rate-limit.config';
import { corsConfig } from './config/cors.config';
import { validationConfig } from './config/validation.config';
import { setupSwagger } from './config/swagger.config';
import { setupGracefulShutdown } from './config/shutdown.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Security
  app.use(securityConfig());
  app.use(cookieParser());
  app.use(rateLimitConfig());

  // API
  app.setGlobalPrefix('api', {
    exclude: [{ path: '/', method: RequestMethod.GET }],
  });
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });
  app.enableCors(corsConfig);

  // Global
  app.useGlobalPipes(validationConfig());

  // Docs
  setupSwagger(app);

  // Server
  app.enableShutdownHooks();

  const port = process.env.PORT || 8090;
  const server = await app.listen(port);
  setupGracefulShutdown(server);

  Logger.log(`API running on port ${port}`);
}

bootstrap();
