import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { TracingService } from './tracing.service';
import { MetricsService } from './metrics.service';
import { HealthController } from './health.controller';

@Module({
  imports: [TerminusModule],
  controllers: [HealthController],
  providers: [TracingService, MetricsService],
  exports: [TracingService, MetricsService],
})
export class ObservabilityModule {}
