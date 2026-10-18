import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Notification Platform API')
    .setDescription(
      'Production-grade notification platform supporting email, push, SMS, and WebSocket notifications',
    )
    .setVersion('v1')
    .addTag('health', 'Health check endpoints')
    .addTag('metrics', 'Prometheus metrics endpoint')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
}
