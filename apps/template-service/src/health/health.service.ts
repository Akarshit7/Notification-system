import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  check(): { service: string; status: string; timestamp: string } {
    return {
      service: 'template-service',
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}
