import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.enableCors();
  app.setGlobalPrefix('api/v1', { exclude: ['/health', '/live', '/ready', '/metrics'] });

  setupSwagger(app);

  const port = process.env.PORT || 3000;
  const logger = new Logger('Bootstrap');
  logger.log(`Application starting on port ${port}`);

  await app.listen(port);
  logger.log(`Application running on http://localhost:${port}`);
  logger.log(`Swagger docs at http://localhost:${port}/api/docs`);
}

void bootstrap();
