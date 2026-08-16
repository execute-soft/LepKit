import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { CustomThrottlerGuard } from '../common/guards/custom-throttler.guard';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';
import { RequestIdMiddleware } from '../common/middleware/request-id.middleware';
import { CsrfMiddleware } from '../common/middleware/csrf.middleware';
import { getDatabaseConfig } from '../config/database.config';
import { validate } from '../config/env.validation';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { OrgsModule } from '../orgs/orgs.module';
import { EmailModule } from '../email/email.module';
import { HealthModule } from '../health/health.module';
import { RootController } from './root.controller';

// Lite version: Auth + Users + Email only.
// Full version adds Payments, Organizations, Jobs, Files, Health,
// Webhooks, GDPR, Audit, API Keys, and more.
// Get it at: https://demo.cloudrix.io

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'production' ? ['.env'] : ['.env', '.env.example'],
      validate,
    }),
    TypeOrmModule.forRoot(getDatabaseConfig()),
    ThrottlerModule.forRoot([
      { name: 'short', ttl: 1000, limit: 3 },
      { name: 'medium', ttl: 10000, limit: 20 },
      { name: 'long', ttl: 60000, limit: 100 },
    ]),
    AuthModule,
    UsersModule,
    OrgsModule,
    EmailModule,
    HealthModule,
  ],
  controllers: [RootController],
  providers: [
    { provide: APP_GUARD, useClass: CustomThrottlerGuard },
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdMiddleware).forRoutes('*');
    consumer.apply(CsrfMiddleware).forRoutes('*');
  }
}
