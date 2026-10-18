import { Module } from '@nestjs/common';
import { ConfigModule } from '@app/config';
import { LoggerModule } from '@app/logger';
import { DatabaseModule } from '@app/database';
import { EventsModule } from '@app/events';
import { ObservabilityModule } from '@app/observability';

@Module({
  imports: [ConfigModule, LoggerModule, DatabaseModule, EventsModule, ObservabilityModule],
})
export class AppModule {}
