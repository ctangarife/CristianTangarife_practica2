import { Module } from '@nestjs/common';
import { TribeService } from './tribe.service';
import { TribeController } from './tribe.controller';
import { tribeProviders } from './entities/tribe.provider';

@Module({
  controllers: [TribeController],
  providers: [TribeService, ...tribeProviders],
})
export class TribeModule {}
