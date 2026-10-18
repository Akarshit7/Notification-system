import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@app/config';
import { LoggerModule, LoggingInterceptor } from '@app/logger';
import { DatabaseModule } from '@app/database';
import { EventsModule } from '@app/events';
import { ObservabilityModule } from '@app/observability';
import { CommonModule } from '@app/common';
import { UtilsModule } from '@app/utils';
import { DtoModule } from '@app/dto';
import { MetricsController } from './metrics/metrics.controller';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    DatabaseModule,
    EventsModule,
    ObservabilityModule,
    CommonModule,
    UtilsModule,
    DtoModule,
  ],
  controllers: [AppController, MetricsController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
