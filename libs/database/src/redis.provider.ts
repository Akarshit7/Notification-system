import { Provider } from '@nestjs/common';
import { RedisService } from './redis.service';
import { ConfigService } from '@app/config';

export const RedisProvider: Provider = {
  provide: RedisService,
  useFactory: (configService: ConfigService) => {
    return new RedisService(configService.get('REDIS_URL'));
  },
  inject: [ConfigService],
};
