import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  check(): { service: string; status: string; timestamp: string } {
    return {
      service: 'push-service',
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}
