import { Module } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { MetricsController } from './metrics.controller';
import { metricsProvider } from './entities/metrics.provider';

@Module({
  controllers: [MetricsController],
  providers: [MetricsService, ...metricsProvider],
  exports: [MetricsService],
})
export class MetricsModule {}
