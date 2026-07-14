import { Injectable } from '@nestjs/common';
import { Environment, EnvironmentSchema } from './config.schema';

@Injectable()
export class ConfigService {
  private readonly environment: Environment;

  constructor() {
    const result = EnvironmentSchema.safeParse(process.env);
    if (!result.success) {
      throw new Error(
        `Environment validation failed: ${JSON.stringify(result.error.flatten().fieldErrors, null, 2)}`,
      );
    }
    this.environment = result.data;
  }

  get<T extends keyof Environment>(key: T): Environment[T] {
    return this.environment[key];
  }

  getAll(): Environment {
    return { ...this.environment };
  }

  get isDevelopment(): boolean {
    return this.environment.NODE_ENV === 'development';
  }

  get isProduction(): boolean {
    return this.environment.NODE_ENV === 'production';
  }

  get isStaging(): boolean {
    return this.environment.NODE_ENV === 'staging';
  }
}
