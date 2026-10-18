import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import pino, { Logger as PinoLogger, LoggerOptions } from 'pino';

@Injectable()
export class LoggerService implements NestLoggerService {
  private readonly logger: PinoLogger;

  constructor(options?: LoggerOptions) {
    this.logger = pino({
      transport:
        process.env.NODE_ENV !== 'production'
          ? { target: 'pino-pretty', options: { colorize: true } }
          : undefined,
      level: process.env.LOG_LEVEL || 'info',
      ...options,
    });
  }

  private formatMessage(message: unknown, context?: string): Record<string, unknown> {
    const base = context ? { context } : {};
    if (typeof message === 'object' && message !== null) {
      return { ...base, ...(message as Record<string, unknown>) };
    }
    return { ...base, msg: String(message) };
  }

  log(message: unknown, context?: string): void {
    this.logger.info(this.formatMessage(message, context));
  }

  error(message: unknown, trace?: string, context?: string): void {
    this.logger.error({ ...this.formatMessage(message, context), trace });
  }

  warn(message: unknown, context?: string): void {
    this.logger.warn(this.formatMessage(message, context));
  }

  debug(message: unknown, context?: string): void {
    this.logger.debug(this.formatMessage(message, context));
  }

  verbose(message: unknown, context?: string): void {
    this.logger.trace(this.formatMessage(message, context));
  }

  getPinoLogger(): PinoLogger {
    return this.logger;
  }
}
