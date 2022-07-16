import { DataSource } from 'typeorm';
import { MetricEntity } from './metric.entity';

export const metricsProvider = [
  {
    provide: 'METRICS_PROVIDED',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(MetricEntity),
    inject: ['DATA_SOURCE'],
  },
];
