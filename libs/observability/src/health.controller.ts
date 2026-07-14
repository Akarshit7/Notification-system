import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, HealthCheck, HealthCheckResult } from '@nestjs/terminus';

@Controller()
export class HealthController {
  constructor(private readonly health: HealthCheckService) {}

  @Get('/health')
  @HealthCheck()
  async check(): Promise<HealthCheckResult> {
    return this.health.check([]);
  }

  @Get('/live')
  @HealthCheck()
  async live(): Promise<HealthCheckResult> {
    return this.health.check([]);
  }

  @Get('/ready')
  @HealthCheck()
  async ready(): Promise<HealthCheckResult> {
    return this.health.check([]);
  }
}
