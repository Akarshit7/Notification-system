import { ConfigService } from '../config.service';

describe('ConfigService', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should create instance with valid environment', () => {
    process.env.NODE_ENV = 'development';
    process.env.DATABASE_URL = 'postgresql://localhost:5432/test';
    process.env.REDIS_URL = 'redis://localhost:6379';
    process.env.RABBITMQ_URL = 'amqp://localhost:5672';
    process.env.AWS_ACCESS_KEY = 'test';
    process.env.AWS_SECRET_KEY = 'test';

    const service = new ConfigService();
    expect(service.get('DATABASE_URL')).toBe('postgresql://localhost:5432/test');
    expect(service.get('NODE_ENV')).toBe('development');
    expect(service.isDevelopment).toBe(true);
  });

  it('should throw with invalid environment', () => {
    process.env.DATABASE_URL = '';
    process.env.REDIS_URL = '';
    process.env.RABBITMQ_URL = '';
    process.env.AWS_ACCESS_KEY = '';
    process.env.AWS_SECRET_KEY = '';

    expect(() => new ConfigService()).toThrow('Environment validation failed');
  });
});
