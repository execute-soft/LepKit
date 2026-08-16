import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CsrfMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
      if (!req.cookies?.['csrf-token']) {
        const token = uuidv4();
        res.cookie('csrf-token', token, {
          httpOnly: false,
          sameSite: 'lax',
          secure: process.env.NODE_ENV === 'production',
          path: '/',
        });
      }
      return next();
    }

    const cookieToken = req.cookies?.['csrf-token'];
    const headerToken = req.headers['x-xsrf-token'] as string;

    if (!cookieToken || cookieToken !== headerToken) {
      res.status(403).json({ message: 'CSRF token mismatch', error: 'Forbidden' });
      return;
    }

    next();
  }
}
