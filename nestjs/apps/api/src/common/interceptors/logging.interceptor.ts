import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Request, Response } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest<Request>();
    const { method, originalUrl } = req;
    const start = Date.now();
    const requestId = req.requestId || '-';

    return next.handle().pipe(
      tap({
        next: () => {
          const res = ctx.getResponse<Response>();
          const duration = Date.now() - start;
          this.logger.log(`[${requestId}] ${method} ${originalUrl} ${res.statusCode} ${duration}ms`);
        },
        error: (err: Error & { status?: number }) => {
          const duration = Date.now() - start;
          this.logger.error(`[${requestId}] ${method} ${originalUrl} ${err.status || 500} ${duration}ms - ${err.message}`);
        },
      }),
    );
  }
}
