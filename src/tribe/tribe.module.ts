import { Module } from '@nestjs/common';
import { TribeService } from './tribe.service';
import { TribeController } from './tribe.controller';
import { tribeProviders } from './entities/tribe.provider';
import { RepositoriesModule } from '../repositories/repositories.module';
import { HttpModule } from '@nestjs/axios';
import { MetricsModule } from '../metrics/metrics.module';
@Module({
  imports: [RepositoriesModule, HttpModule, MetricsModule],
  controllers: [TribeController],
  providers: [TribeService, ...tribeProviders],
})
export class TribeModule {}
