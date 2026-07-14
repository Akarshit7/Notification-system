import { Global, Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { ConfigService } from '@app/config';

@Global()
@Module({
  providers: [
    {
      provide: EventsService,
      useFactory: (configService: ConfigService) => {
        return new EventsService(configService.get('RABBITMQ_URL'));
      },
      inject: [ConfigService],
    },
  ],
  exports: [EventsService],
})
export class EventsModule {}
