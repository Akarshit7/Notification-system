import { Injectable, OnModuleInit } from '@nestjs/common';
import client from 'prom-client';
import { ConfigService } from '@app/config';

@Injectable()
export class MetricsService implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {}

  onModuleInit(): void {
    client.collectDefaultMetrics();
  }

  getMetrics(): Promise<string> {
    return client.register.metrics();
  }

  getContentType(): string {
    return client.register.contentType;
  }
}
