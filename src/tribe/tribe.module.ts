import { Module } from '@nestjs/common';
import { TribeService } from './tribe.service';
import { TribeController } from './tribe.controller';
import { tribeProviders } from './entities/tribe.provider';
import { RepositoriesModule } from '../repositories/repositories.module';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [RepositoriesModule, HttpModule],
  controllers: [TribeController],
  providers: [TribeService, ...tribeProviders],
})
export class TribeModule {}
