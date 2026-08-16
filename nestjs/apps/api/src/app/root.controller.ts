import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Root')
@Controller({ version: VERSION_NEUTRAL })
export class RootController {
  @Get()
  @ApiOperation({ summary: 'Welcome endpoint' })
  root() {
    return {
      name: 'executesoft apis',
      version: '1.0.0',
      endpoints: {
        health: '/api/v1/health',
        docs: '/api/docs',
        auth: {
          register: 'POST /api/v1/auth/register',
          login: 'POST /api/v1/auth/login',
          refresh: 'POST /api/v1/auth/refresh',
          me: 'GET /api/v1/auth/me',
          google: 'GET /api/v1/auth/google',
        },
      },
    };
  }
}
