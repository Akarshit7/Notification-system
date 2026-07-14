import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService extends Redis implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);

  constructor(url: string) {
    super(url, {
      lazyConnect: true,
      retryStrategy: (times) => Math.min(times * 50, 2000),
    });
  }

  async onModuleInit(): Promise<void> {
    try {
      await this.connect();
      this.logger.log('Connected to Redis');
    } catch (error) {
      this.logger.error('Failed to connect to Redis', (error as Error).message);
    }
  }

  async onModuleDestroy(): Promise<void> {
    await this.quit();
  }

  async verifyConnection(): Promise<boolean> {
    try {
      const result = await this.ping();
      return result === 'PONG';
    } catch {
      return false;
    }
  }
}
