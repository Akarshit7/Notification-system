import { z } from 'zod';

export const EnvironmentSchema = z.object({
  NODE_ENV: z.enum(['development', 'staging', 'production', 'test']).default('development'),
  PORT: z.coerce.number().positive().default(3000),
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url(),
  RABBITMQ_URL: z.string().url(),
  AWS_ACCESS_KEY: z.string().min(1),
  AWS_SECRET_KEY: z.string().min(1),
  AWS_REGION: z.string().default('us-east-1'),
  SNS_ENDPOINT: z.string().url().optional(),
  SQS_ENDPOINT: z.string().url().optional(),
  LOG_LEVEL: z.enum(['trace', 'debug', 'info', 'warn', 'error', 'fatal']).default('info'),
  OTEL_EXPORTER_OTLP_ENDPOINT: z.string().url().default('http://localhost:4318'),
  OTEL_SERVICE_NAME: z.string().default('notification-platform'),
  PROMETHEUS_METRICS_PATH: z.string().default('/metrics'),
});

export type Environment = z.infer<typeof EnvironmentSchema>;
