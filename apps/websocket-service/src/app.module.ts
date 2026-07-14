import { Module } from '@nestjs/common';
import { ConfigModule } from '@app/config';
import { LoggerModule } from '@app/logger';
import { DatabaseModule } from '@app/database';
import { EventsModule } from '@app/events';
import { ObservabilityModule } from '@app/observability';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    DatabaseModule,
    EventsModule,
    ObservabilityModule,
    HealthModule,
  ],
})
export class AppModule {}
