import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { RedisProvider } from './redis.provider';
import { RedisService } from './redis.service';

@Global()
@Module({
  providers: [PrismaService, RedisProvider],
  exports: [PrismaService, RedisService],
})
export class DatabaseModule {}
