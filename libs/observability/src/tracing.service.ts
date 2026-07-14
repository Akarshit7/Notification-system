import { Injectable, OnModuleInit } from '@nestjs/common';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { ConfigService } from '@app/config';

@Injectable()
export class TracingService implements OnModuleInit {
  private sdk: NodeSDK | null = null;

  constructor(private readonly configService: ConfigService) {}

  onModuleInit(): void {
    const serviceName = this.configService.get('OTEL_SERVICE_NAME');

    const traceExporter = new OTLPTraceExporter({
      url: this.configService.get('OTEL_EXPORTER_OTLP_ENDPOINT'),
    });

    this.sdk = new NodeSDK({
      resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: serviceName,
      }),
      traceExporter,
      instrumentations: [getNodeAutoInstrumentations()],
    });

    try {
      this.sdk.start();
      console.log('OpenTelemetry tracing started');
    } catch (error) {
      console.error('Failed to start OpenTelemetry', error);
    }
  }

  async shutdown(): Promise<void> {
    await this.sdk?.shutdown();
  }
}
