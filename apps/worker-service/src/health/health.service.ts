import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  check(): { service: string; status: string; timestamp: string } {
    return {
      service: 'worker-service',
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}
