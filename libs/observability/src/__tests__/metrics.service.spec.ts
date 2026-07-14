import { MetricsService } from '../metrics.service';
import { ConfigService } from '@app/config';

describe('MetricsService', () => {
  it('should be defined', () => {
    const configService = {} as ConfigService;
    const service = new MetricsService(configService);
    expect(service).toBeDefined();
  });
});
