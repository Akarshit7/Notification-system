import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const logger = new Logger('UserPreferenceService');
  const port = process.env.PORT || 3009;
  await app.listen(port);
  logger.log(`User preference service running on port ${port}`);
}

void bootstrap();
