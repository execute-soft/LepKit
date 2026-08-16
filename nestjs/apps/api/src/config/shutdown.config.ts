import { Logger } from '@nestjs/common';
import type { Server } from 'http';

export function setupGracefulShutdown(server: Server): void {
  const shutdown = async (signal: string) => {
    Logger.log(`${signal} received, closing gracefully...`);
    server.close(() => {
      Logger.log('HTTP server closed');
      process.exit(0);
    });
    setTimeout(() => process.exit(1), 10000);
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}
