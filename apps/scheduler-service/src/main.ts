import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const logger = new Logger('SchedulerService');
  const port = process.env.PORT || 3006;
  await app.listen(port);
  logger.log(`Scheduler service running on port ${port}`);
}

void bootstrap();
