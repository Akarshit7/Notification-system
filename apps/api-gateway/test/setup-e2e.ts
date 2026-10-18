process.env.NODE_ENV = process.env.NODE_ENV ?? 'test';
process.env.DATABASE_URL =
  process.env.DATABASE_URL ?? 'postgresql://notification:notification@localhost:5432/notification';
process.env.REDIS_URL = process.env.REDIS_URL ?? 'redis://localhost:6379';
process.env.RABBITMQ_URL = process.env.RABBITMQ_URL ?? 'amqp://guest:guest@localhost:5672';
process.env.AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY ?? 'test';
process.env.AWS_SECRET_KEY = process.env.AWS_SECRET_KEY ?? 'test';
