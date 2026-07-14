import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('app')
@Controller()
export class AppController {
  @Get()
  @ApiOperation({ summary: 'Root endpoint' })
  getRoot(): { service: string; version: string } {
    return {
      service: 'notification-platform',
      version: '0.1.0',
    };
  }
}
