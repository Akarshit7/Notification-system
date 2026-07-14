import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  check(): { service: string; status: string; timestamp: string } {
    return {
      service: 'user-preference-service',
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}
